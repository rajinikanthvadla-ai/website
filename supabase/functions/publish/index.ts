// Supabase Edge Function: lets the admin panel rebuild and deploy the site.
//
// POST  -> starts the "Deploy to GitHub Pages" workflow on main
// GET   -> returns the last few deploy runs (status for the dashboard)
//
// Secrets (Supabase > Edge Functions > Secrets):
//   GH_DEPLOY_TOKEN  fine-grained GitHub token, this repo only, "Actions: Read and write"
//   GH_REPO          optional, defaults to rajinikanthvadla-ai/website
//
// The caller must be signed in as an admin (public.is_admin() must return true).
import { createClient } from "npm:@supabase/supabase-js@2";

const REPO = Deno.env.get("GH_REPO") ?? "rajinikanthvadla-ai/website";
const WORKFLOW = "deploy.yml";
const ALLOWED_ORIGINS = ["https://rajinikanthvadla.com", "https://www.rajinikanthvadla.com"];

function cors(origin: string | null) {
  const allowed =
    origin && (ALLOWED_ORIGINS.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("Origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });

  const auth = req.headers.get("Authorization") ?? "";
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");
  if (adminError || isAdmin !== true) return json({ error: "Not allowed" }, 403, headers);

  const token = Deno.env.get("GH_DEPLOY_TOKEN");
  if (!token) return json({ error: "GH_DEPLOY_TOKEN secret is not set" }, 500, headers);

  const gh = (path: string, init?: RequestInit) =>
    fetch(`https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "rv-site-admin",
        ...(init?.headers ?? {}),
      },
    });

  if (req.method === "POST") {
    const res = await gh("/dispatches", { method: "POST", body: JSON.stringify({ ref: "main" }) });
    if (res.status !== 204) {
      return json({ error: `GitHub said ${res.status}: ${(await res.text()).slice(0, 300)}` }, 502, headers);
    }
    return json({ ok: true }, 200, headers);
  }

  if (req.method === "GET") {
    const res = await gh("/runs?per_page=5&branch=main");
    if (!res.ok) return json({ error: `GitHub said ${res.status}` }, 502, headers);
    const data = await res.json();
    const runs = (data.workflow_runs ?? []).map((r: Record<string, unknown>) => ({
      id: r.id,
      status: r.status,
      conclusion: r.conclusion,
      event: r.event,
      created_at: r.created_at,
      updated_at: r.updated_at,
      url: r.html_url,
    }));
    return json({ runs }, 200, headers);
  }

  return json({ error: "Method not allowed" }, 405, headers);
});

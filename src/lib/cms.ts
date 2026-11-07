/**
 * Content you edit in /admin, read once at build time (static export).
 *
 * Rules that keep the live site safe:
 * - Supabase not configured (local dev) or a table not created yet: use the fallback.
 * - Supabase reachable but erroring (outage, bad key): throw, so the deploy fails and
 *   GitHub Pages keeps serving the last good version instead of publishing empty pages.
 */
import { createClient, type PostgrestError, type SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_PROJECTS } from "@/lib/portfolio";

export type SitePost = {
  id: string;
  created_at: string;
  title: string;
  summary: string;
  body: string;
  image_url: string;
  link_url: string;
  link_label: string;
  show_in_bar: boolean;
  bar_text: string;
  starts_at: string | null;
  ends_at: string | null;
  pinned: boolean;
};

export type SiteBanner = {
  id: string;
  title: string;
  image_url: string;
  alt: string;
  link_url: string;
  placement: "home" | "enroll" | "courses" | "work";
  sort: number;
  starts_at: string | null;
  ends_at: string | null;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: "client" | "product" | "open-source";
  client_label: string;
  summary: string;
  problem: string;
  solution: string;
  results: string[];
  stack: string[];
  image_url: string;
  link_url: string;
  repo_url: string;
  sort: number;
  featured: boolean;
};

let client: SupabaseClient | null | undefined;

function getClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}

/** Table missing (SQL not run yet) is not an outage. */
function isMissingTable(error: PostgrestError) {
  return (
    ["42P01", "PGRST205", "PGRST202", "42883"].includes(error.code) || /does not exist|schema cache|could not find the function/i.test(error.message)
  );
}

const cache = new Map<string, Promise<unknown>>();

function load<T>(key: string, fallback: T, run: (db: SupabaseClient) => PromiseLike<{ data: T | null; error: PostgrestError | null }>) {
  if (!cache.has(key)) {
    cache.set(
      key,
      (async () => {
        const db = getClient();
        if (!db) return fallback;
        const { data, error } = await run(db);
        if (error) {
          if (isMissingTable(error)) return fallback;
          throw new Error(`CMS: could not load ${key} from Supabase (${error.code}: ${error.message}). Build stopped so the live site stays as it is.`);
        }
        return data ?? fallback;
      })(),
    );
  }
  return cache.get(key) as Promise<T>;
}

function isLive(item: { starts_at: string | null; ends_at: string | null }, now = Date.now()) {
  if (item.starts_at && Date.parse(item.starts_at) > now) return false;
  if (item.ends_at && Date.parse(item.ends_at) < now) return false;
  return true;
}

export async function getPosts(): Promise<SitePost[]> {
  const rows = await load<SitePost[]>("site_posts", [], (db) =>
    db
      .from("site_posts")
      .select("id, created_at, title, summary, body, image_url, link_url, link_label, show_in_bar, bar_text, starts_at, ends_at, pinned")
      .eq("published", true)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(100),
  );
  return rows.filter((p) => !p.starts_at || Date.parse(p.starts_at) <= Date.now());
}

/** The newest live post marked "show in top bar". The bar also hides itself in the browser once ends_at passes. */
export async function getAnnouncement(): Promise<{ text: string; href: string; endsAt: string | null } | null> {
  const post = (await getPosts()).find((p) => p.show_in_bar && isLive(p));
  if (!post) return null;
  return {
    text: post.bar_text || post.title,
    href: post.link_url || `/news/#${post.id}`,
    endsAt: post.ends_at,
  };
}

export async function getBanners(placement: SiteBanner["placement"]): Promise<SiteBanner[]> {
  const rows = await load<SiteBanner[]>("site_banners", [], (db) =>
    db
      .from("site_banners")
      .select("id, title, image_url, alt, link_url, placement, sort, starts_at, ends_at")
      .eq("active", true)
      .order("sort", { ascending: true }),
  );
  return rows.filter((b) => b.placement === placement && isLive(b));
}

export async function getProjects(): Promise<PortfolioProject[]> {
  // Until the table exists, show the starter projects; after that the panel is the only source.
  return load<PortfolioProject[]>("portfolio_projects", DEFAULT_PROJECTS, (db) =>
    db
      .from("portfolio_projects")
      .select("slug, title, category, client_label, summary, problem, solution, results, stack, image_url, link_url, repo_url, sort, featured")
      .eq("published", true)
      .order("sort", { ascending: true }),
  );
}

export type ActivityItem = { id: string; first_name: string; city: string; action: string; happened_at: string };
export type ActivityStats = { enquiries_7d: number; requests_30d: number; joined_30d: number };

/** Real recent activity (last 30 days), added in /admin > Activity. */
export async function getActivity(): Promise<ActivityItem[]> {
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  return load<ActivityItem[]>("site_activity", [], (db) =>
    db
      .from("site_activity")
      .select("id, first_name, city, action, happened_at")
      .eq("published", true)
      .gte("happened_at", since)
      .lte("happened_at", new Date().toISOString())
      .order("happened_at", { ascending: false })
      .limit(12),
  );
}

/** Real totals, counts only. */
export async function getActivityStats(): Promise<ActivityStats | null> {
  return load<ActivityStats | null>("public_activity_stats", null, (db) => db.rpc("public_activity_stats"));
}

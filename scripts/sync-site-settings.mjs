/**
 * Pulls site settings you edit in /admin > Settings (table public.site_settings)
 * into content/site-settings.json before the build, so every page, meta description
 * and structured-data block uses the same values.
 *
 * Never fails the build: if Supabase is missing or unreachable, the committed file is kept.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "..", "content", "site-settings.json");
const KEYS = ["years_experience"];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "").trim();

const current = JSON.parse(fs.readFileSync(OUTPUT, "utf8"));

if (!url || !key) {
  console.log("site settings: Supabase not configured, keeping", current);
  process.exit(0);
}

try {
  const res = await fetch(`${url}/rest/v1/site_settings?select=key,value`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    console.log(`site settings: Supabase answered ${res.status}, keeping`, current);
    process.exit(0);
  }
  const rows = await res.json();
  const next = { ...current };
  for (const { key: k, value } of rows) {
    if (KEYS.includes(k) && typeof value === "string" && value.trim()) next[k] = value.trim().slice(0, 40);
  }
  fs.writeFileSync(OUTPUT, JSON.stringify(next, null, 2) + "\n");
  console.log("site settings:", next);
} catch (error) {
  console.log("site settings: could not reach Supabase, keeping", current, String(error));
}

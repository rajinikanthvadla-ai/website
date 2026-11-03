import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** New Dashboard keys are "publishable"; older projects use "anon". Either works. */
function getSupabasePublicKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    ""
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && getSupabasePublicKey());
}

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (client) return client;
  client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(), getSupabasePublicKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

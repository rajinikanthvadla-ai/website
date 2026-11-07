"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { timeAgo } from "@/lib/admin-client";
import { btnGhost, btnPrimary, Card, Notice, Pill, SectionTitle } from "./ui";

type Run = { id: number; status: string; conclusion: string | null; event: string; created_at: string; updated_at: string; url: string };

export function PublishCard({ db, dirty, onPublished }: { db: SupabaseClient; dirty: boolean; onPublished: () => void }) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const { data, error: e } = await db.functions.invoke("publish", { method: "GET" });
    if (e) return setError("Publish is not connected yet. Deploy the 'publish' function and add the GitHub token (see the setup guide).");
    setError("");
    setRuns((data?.runs ?? []) as Run[]);
  }, [db]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const running = runs.some((r) => r.status !== "completed");
  useEffect(() => {
    if (!running) return;
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, [running, refresh]);

  async function publish() {
    setBusy(true);
    setError("");
    const { error: e } = await db.functions.invoke("publish", { method: "POST" });
    setBusy(false);
    if (e) return setError(`Could not start publishing: ${e.message}`);
    onPublished();
    setTimeout(refresh, 4000);
  }

  const last = runs[0];
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-[#0f172a]">Publish to the live site</p>
          <p className="text-sm text-slate-600">
            {running
              ? "Publishing now. The site updates in about 3 to 5 minutes."
              : dirty
                ? "You have saved changes that are not live yet."
                : "Rebuilds the site with your latest content."}
          </p>
        </div>
        <button type="button" className={btnPrimary} onClick={publish} disabled={busy || running}>
          {running ? "Publishing..." : busy ? "Starting..." : "Publish"}
        </button>
      </div>
      {error ? <div className="mt-3"><Notice tone="error">{error}</Notice></div> : null}
      {last ? (
        <ul className="mt-4 space-y-1.5">
          {runs.slice(0, 4).map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-2 text-sm">
              <Pill tone={r.status !== "completed" ? "orange" : r.conclusion === "success" ? "green" : "red"}>
                {r.status !== "completed" ? r.status : r.conclusion ?? "done"}
              </Pill>
              <span className="text-slate-600">{r.event === "workflow_dispatch" ? "Publish button" : r.event === "schedule" ? "Daily refresh" : "Code push"}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{timeAgo(r.created_at)}</span>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 ml-auto">
                details
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}

export default function Dashboard({
  db,
  dirty,
  onPublished,
  go,
}: {
  db: SupabaseClient;
  dirty: boolean;
  onPublished: () => void;
  go: (tab: string) => void;
}) {
  const [stats, setStats] = useState<{ label: string; value: string; tab: string }[]>([]);

  useEffect(() => {
    (async () => {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const [leads, newLeads, requests, reviews, visits] = await Promise.all([
        db.from("leads").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
        db.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        db.from("consult_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
        db.from("student_testimonials").select("id", { count: "exact", head: true }).eq("approved", false),
        db.rpc("analytics_summary", { p_days: 7 }),
      ]);
      const n = (r: { count: number | null; error: unknown }) => (r.error ? "–" : String(r.count ?? 0));
      setStats([
        { label: "Visitors, last 7 days", value: visits.error ? "–" : String(visits.data?.visitors ?? 0), tab: "analytics" },
        { label: "Leads, last 7 days", value: n(leads), tab: "leads" },
        { label: "Leads not contacted", value: n(newLeads), tab: "leads" },
        { label: "New project requests", value: n(requests), tab: "requests" },
        { label: "Reviews waiting", value: n(reviews), tab: "reviews" },
      ]);
    })();
  }, [db]);

  return (
    <div className="grid gap-4">
      <SectionTitle title="Dashboard" sub="What needs you today." />
      <PublishCard db={db} dirty={dirty} onPublished={onPublished} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <button key={s.label} type="button" onClick={() => go(s.tab)} className="text-left rounded-xl border border-slate-200 bg-white p-4 hover:border-teal-600">
            <p className="font-display text-3xl font-bold text-[#0f172a] tabular-nums">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </button>
        ))}
      </div>
      <Card>
        <p className="font-semibold text-[#0f172a] mb-2">Quick actions</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={btnGhost} onClick={() => go("news")}>Post news or announcement</button>
          <button type="button" className={btnGhost} onClick={() => go("banners")}>Upload a banner</button>
          <button type="button" className={btnGhost} onClick={() => go("projects")}>Add a project</button>
          <a className={btnGhost} href="/" target="_blank" rel="noopener noreferrer">Open the website</a>
        </div>
      </Card>
    </div>
  );
}

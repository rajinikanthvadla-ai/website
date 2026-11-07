"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { timeAgo, type Row } from "@/lib/admin-client";
import { btnDanger, btnGhost, btnPrimary, Card, Notice, Pill, SectionTitle } from "./ui";

export default function Reviews({ db, onChanged }: { db: SupabaseClient; onChanged: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data, error: e } = await db
      .from("student_testimonials")
      .select("*")
      .order("approved", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(300);
    if (e) return setError(e.message);
    setRows(data ?? []);
  }, [db]);

  useEffect(() => {
    load();
  }, [load]);

  async function setApproved(r: Row, approved: boolean) {
    const { error: e } = await db
      .from("student_testimonials")
      .update({ approved, approved_at: approved ? new Date().toISOString() : null })
      .eq("id", r.id);
    if (e) return setError(e.message);
    onChanged();
    load();
  }

  async function remove(r: Row) {
    if (!confirm(`Delete the review from ${r.name} permanently? This cannot be undone.`)) return;
    const { error: e } = await db.from("student_testimonials").delete().eq("id", r.id);
    if (e) return setError(e.message);
    load();
  }

  return (
    <div>
      <SectionTitle title="Student reviews" sub="Approve a review to show it on the site (after Publish)." />
      {error ? <div className="mb-3"><Notice tone="error">{error}</Notice></div> : null}
      {!rows.length ? <Notice>No reviews yet. Share the /student-feedback/ link with students.</Notice> : null}
      <div className="grid gap-3">
        {rows.map((r) => (
          <Card key={r.id}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-semibold text-[#0f172a]">
                  {r.name} <span className="text-amber-600">{"★".repeat(r.rating)}</span>
                </p>
                <p className="text-sm text-slate-600">{[r.role_title, r.city, r.course].filter(Boolean).join(" · ")}</p>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone={r.approved ? "green" : "orange"}>{r.approved ? "Live" : "Waiting"}</Pill>
                {!r.consent_to_publish ? <Pill tone="red">No consent</Pill> : null}
                <span className="text-xs text-slate-500">{timeAgo(r.created_at)}</span>
              </div>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-line mb-3">{r.quote}</p>
            <div className="flex flex-wrap gap-2">
              {r.approved ? (
                <button type="button" className={btnGhost} onClick={() => setApproved(r, false)}>Hide</button>
              ) : (
                <button type="button" className={btnPrimary} onClick={() => setApproved(r, true)} disabled={!r.consent_to_publish}>Approve</button>
              )}
              {r.linkedin_url ? (
                <a href={r.linkedin_url} target="_blank" rel="noopener noreferrer" className={btnGhost}>LinkedIn</a>
              ) : null}
              <button type="button" className={btnDanger} onClick={() => remove(r)}>Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

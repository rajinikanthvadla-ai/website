"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { timeAgo, type Row } from "@/lib/admin-client";
import { reviewLink, reviewMessage, whatsappLink } from "./askReview";
import { btnDanger, btnDark, btnGhost, btnPrimary, Card, Field, input, Notice, Pill, SectionTitle } from "./ui";

function AskForReview() {
  const link = reviewLink();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState(() => reviewMessage());
  const [copied, setCopied] = useState("");

  async function copy(value: string, what: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(`${what} copied`);
    } catch {
      setCopied("Could not copy. Select the text and copy it by hand.");
    }
    setTimeout(() => setCopied(""), 2500);
  }

  if (!link) {
    return (
      <Notice tone="error">
        The private review link is not set on this build. Add NEXT_PUBLIC_FEEDBACK_ACCESS_TOKEN to the GitHub repository secrets, then Publish.
      </Notice>
    );
  }

  return (
    <Card className="grid gap-3 mb-5">
      <div>
        <p className="font-display text-lg font-bold text-[#0f172a]">Ask a student for a review</p>
        <p className="text-sm text-slate-600">
          Sends your private feedback link. Their review comes back here as "Waiting" for you to approve.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Student name (optional)">
          <input
            className={input}
            value={name}
            placeholder="Ravi"
            onChange={(e) => {
              setName(e.target.value);
              setText(reviewMessage(e.target.value));
            }}
          />
        </Field>
        <Field label="WhatsApp number (optional)" help="10-digit Indian numbers get +91 added. Leave empty to pick a contact in WhatsApp.">
          <input className={input} type="tel" value={phone} placeholder="98xxxxxxxx" onChange={(e) => setPhone(e.target.value)} />
        </Field>
      </div>
      <Field label="Message">
        <textarea className={`${input} text-sm`} rows={6} value={text} onChange={(e) => setText(e.target.value)} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <a href={whatsappLink(phone, text)} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
          Send on WhatsApp
        </a>
        <button type="button" className={btnDark} onClick={() => copy(text, "Message")}>
          Copy message
        </button>
        <button type="button" className={btnGhost} onClick={() => copy(link, "Link")}>
          Copy link only
        </button>
      </div>
      {copied ? <Notice tone="ok">{copied}</Notice> : null}
    </Card>
  );
}

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
      <AskForReview />
      {error ? <div className="mb-3"><Notice tone="error">{error}</Notice></div> : null}
      {!rows.length ? <Notice>No reviews yet. Use the box above to ask your first students.</Notice> : null}
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

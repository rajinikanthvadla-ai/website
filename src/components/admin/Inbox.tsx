"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { downloadText, timeAgo, toCsv, type Row } from "@/lib/admin-client";
import { btnDanger, btnGhost, Card, input, Notice, Pill, SectionTitle } from "./ui";

export type InboxConfig = {
  table: "leads" | "consult_requests";
  title: string;
  sub: string;
  statuses: string[];
  /** Short line under the name. */
  headline: (r: Row) => string;
  /** Extra labelled facts in the card. */
  facts: (r: Row) => [string, string][];
  /** Long free text. */
  body: (r: Row) => string;
  searchColumns: string[];
  /** Leads only: offer "Add to activity feed". */
  activityAction?: (r: Row) => string;
};

const STATUS_TONE: Record<string, "blue" | "orange" | "green" | "red" | "slate"> = {
  new: "blue",
  contacted: "orange",
  "call booked": "orange",
  proposal: "orange",
  enrolled: "green",
  won: "green",
  lost: "red",
  spam: "slate",
};

function waLink(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  return digits.length >= 8 ? `https://wa.me/${digits}` : "";
}

function source(r: Row) {
  const parts = [r.utm_source, r.utm_campaign].filter(Boolean).join(" / ");
  if (parts) return parts;
  if (r.referrer) {
    try {
      return new URL(r.referrer).hostname.replace(/^www\./, "");
    } catch {
      return String(r.referrer).slice(0, 40);
    }
  }
  return "Direct";
}

export default function Inbox({ db, config, onChanged }: { db: SupabaseClient; config: InboxConfig; onChanged?: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    let query = db.from(config.table).select("*").order("created_at", { ascending: false }).limit(300);
    if (status !== "all") query = query.eq("status", status);
    const term = q.trim().replace(/[%,()]/g, "");
    if (term) query = query.or(config.searchColumns.map((c) => `${c}.ilike.%${term}%`).join(","));
    const { data, error: e } = await query;
    setLoading(false);
    if (e) return setError(e.message);
    setError("");
    setRows(data ?? []);
  }, [db, config, status, q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  async function update(id: string, patch: Row) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    const { error: e } = await db.from(config.table).update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
    if (e) setError(`Could not save: ${e.message}`);
  }

  const [flash, setFlash] = useState("");

  async function addToActivity(r: Row) {
    if (!config.activityAction) return;
    const first = String(r.name || "").trim().split(/\s+/)[0];
    const action = config.activityAction(r);
    const ok = confirm(
      `Show "${first} ${action}" on the website?\n\nOnly if ${first} really did this and is OK being shown (first name and place only).`,
    );
    if (!ok) return;
    const { error: e } = await db.from("site_activity").insert({
      first_name: first,
      city: String(r.country || "").slice(0, 40),
      action,
      happened_at: new Date().toISOString(),
      lead_id: r.id,
      published: true,
    });
    if (e) return setError(e.message);
    setFlash("Added to the activity feed. Edit it under Activity, then Publish.");
    setTimeout(() => setFlash(""), 6000);
    onChanged?.();
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry permanently? This cannot be undone.")) return;
    const { error: e } = await db.from(config.table).delete().eq("id", id);
    if (e) return setError(e.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  return (
    <div>
      <SectionTitle
        title={config.title}
        sub={config.sub}
        actions={
          <button type="button" className={btnGhost} onClick={() => downloadText(`${config.table}-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(rows))} disabled={!rows.length}>
            Export CSV
          </button>
        }
      />
      <div className="flex flex-wrap gap-2 mb-4">
        <input className={`${input} max-w-xs`} placeholder="Search name, email, phone..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select className={`${input} w-auto`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          {config.statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {error ? <div className="mb-3"><Notice tone="error">{error}</Notice></div> : null}
      {flash ? <div className="mb-3"><Notice tone="ok">{flash}</Notice></div> : null}
      {loading && !rows.length ? <p className="text-sm text-slate-500">Loading...</p> : null}
      {!loading && !rows.length ? <Notice>Nothing here yet.</Notice> : null}

      <div className="grid gap-3">
        {rows.map((r) => {
          const wa = waLink(r.whatsapp || "");
          return (
            <Card key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-[#0f172a]">
                    {r.name} {r.company ? <span className="font-normal text-slate-500">· {r.company}</span> : null}
                  </p>
                  <p className="text-sm text-slate-600">{config.headline(r)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Pill tone={STATUS_TONE[r.status] ?? "slate"}>{r.status}</Pill>
                  <span className="text-xs text-slate-500" title={new Date(r.created_at).toLocaleString()}>
                    {timeAgo(r.created_at)}
                  </span>
                </div>
              </div>

              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-sm mb-3">
                {[...config.facts(r), ["Came from", source(r)] as [string, string], ["Page", r.page || ""] as [string, string]]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className="text-slate-800 break-words">{v}</dd>
                    </div>
                  ))}
              </dl>

              {config.body(r) ? <p className="text-sm text-slate-700 whitespace-pre-line bg-slate-50 rounded-lg p-3 mb-3">{config.body(r)}</p> : null}

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                    WhatsApp {r.whatsapp}
                  </a>
                ) : null}
                {r.email ? (
                  <a href={`mailto:${r.email}`} className={btnGhost}>
                    Email {r.email}
                  </a>
                ) : null}
                <select className={`${input} w-auto`} value={r.status} onChange={(e) => update(r.id, { status: e.target.value })} aria-label="Status">
                  {config.statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {config.activityAction && r.status === "enrolled" ? (
                  <button type="button" className={btnGhost} onClick={() => addToActivity(r)}>
                    Add to activity feed
                  </button>
                ) : null}
                <button type="button" className={btnDanger} onClick={() => remove(r.id)}>
                  Delete
                </button>
              </div>
              <textarea
                className={`${input} text-sm`}
                rows={2}
                placeholder="Private notes (saved when you click outside)"
                defaultValue={r.notes || ""}
                onBlur={(e) => e.target.value !== (r.notes || "") && update(r.id, { notes: e.target.value })}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export const LEADS_CONFIG: InboxConfig = {
  table: "leads",
  title: "Leads",
  sub: "Students who enquired through the website forms.",
  statuses: ["new", "contacted", "enrolled", "lost", "spam"],
  headline: (r) => [r.interest, r.country].filter(Boolean).join(" · "),
  facts: () => [],
  body: (r) => r.message || "",
  searchColumns: ["name", "email", "whatsapp", "interest", "message"],
  activityAction: (r) => {
    const i = String(r.interest || "").toLowerCase();
    if (i.includes("mentor")) return "booked a 1:1 mentorship session";
    if (i.includes("automation")) return "joined the AI Automation course";
    if (i.includes("record")) return "bought the course recordings";
    return "joined the MLOps and LLMOps cohort";
  },
};

export const REQUESTS_CONFIG: InboxConfig = {
  table: "consult_requests",
  title: "Project requests",
  sub: "Companies asking you to build an agent, review a roadmap, or train a team.",
  statuses: ["new", "contacted", "call booked", "proposal", "won", "lost", "spam"],
  headline: (r) => r.service || "",
  facts: (r) => [
    ["Role", r.role || ""],
    ["Budget", r.budget || ""],
    ["Timeline", r.timeline || ""],
  ],
  body: (r) => r.details || "",
  searchColumns: ["name", "email", "whatsapp", "company", "service", "details"],
};

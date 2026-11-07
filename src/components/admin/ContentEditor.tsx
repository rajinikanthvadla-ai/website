"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { timeAgo, uploadImage, type Row } from "@/lib/admin-client";
import { btnDanger, btnDark, btnGhost, btnPrimary, Card, Field, input, Notice, Pill, SectionTitle } from "./ui";

type FieldType = "text" | "textarea" | "checkbox" | "select" | "image" | "datetime" | "list" | "number" | "url";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
  placeholder?: string;
  /** Quick picks for a text field; you can still type anything. */
  suggestions?: string[];
};

export type EditorConfig = {
  table: "site_posts" | "site_banners" | "portfolio_projects" | "site_activity";
  title: string;
  sub: string;
  newLabel: string;
  fields: FieldDef[];
  defaults: Row;
  orderBy: { column: string; ascending: boolean }[];
  listTitle: (r: Row) => string;
  listMeta: (r: Row) => string;
  isLive: (r: Row) => boolean;
  liveKey: string;
  folder: string;
  /** Fill derived values (e.g. slug) before saving. */
  beforeSave?: (r: Row) => Row;
};

function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function ImageField({ db, folder, value, onChange }: { db: SupabaseClient; folder: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className="grid gap-2">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-full max-w-md rounded-lg border border-slate-200" />
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <label className={`${btnDark} cursor-pointer`}>
          {busy ? "Uploading..." : value ? "Replace image" : "Upload image"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            disabled={busy}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              setBusy(true);
              setErr("");
              try {
                onChange(await uploadImage(db, file, folder));
              } catch (error) {
                setErr(error instanceof Error ? error.message : "Upload failed");
              } finally {
                setBusy(false);
              }
            }}
          />
        </label>
        {value ? (
          <button type="button" className={btnGhost} onClick={() => onChange("")}>
            Remove
          </button>
        ) : null}
      </div>
      <input className={`${input} text-sm`} placeholder="...or paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} />
      {err ? <Notice tone="error">{err}</Notice> : null}
    </div>
  );
}

export default function ContentEditor({ db, config, onChanged }: { db: SupabaseClient; config: EditorConfig; onChanged: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");

  const load = useCallback(async () => {
    let q = db.from(config.table).select("*");
    for (const o of config.orderBy) q = q.order(o.column, { ascending: o.ascending });
    const { data, error: e } = await q.limit(300);
    if (e) return setError(e.message);
    setError("");
    setRows(data ?? []);
  }, [db, config]);

  useEffect(() => {
    load();
  }, [load]);

  function set(key: string, value: unknown) {
    setEditing((r) => (r ? { ...r, [key]: value } : r));
  }

  async function save() {
    if (!editing) return;
    for (const f of config.fields) {
      if (f.required && !String(editing[f.key] ?? "").trim()) return setError(`"${f.label}" is required.`);
    }
    setSaving(true);
    setError("");
    const row: Row = config.beforeSave ? config.beforeSave({ ...editing }) : { ...editing };
    delete row.created_at;
    const isNew = !row.id;
    if (isNew) delete row.id;
    else row.updated_at = new Date().toISOString();
    const res = isNew
      ? await db.from(config.table).insert(row).select().single()
      : await db.from(config.table).update(row).eq("id", row.id).select().single();
    setSaving(false);
    if (res.error) return setError(res.error.message);
    setEditing(null);
    setFlash("Saved. Press Publish on the Dashboard to put it on the live site.");
    setTimeout(() => setFlash(""), 6000);
    onChanged();
    load();
  }

  async function remove(r: Row) {
    if (!confirm(`Delete "${config.listTitle(r)}" permanently? This cannot be undone.`)) return;
    const { error: e } = await db.from(config.table).delete().eq("id", r.id);
    if (e) return setError(e.message);
    onChanged();
    load();
  }

  async function toggleLive(r: Row) {
    const { error: e } = await db
      .from(config.table)
      .update({ [config.liveKey]: !r[config.liveKey], updated_at: new Date().toISOString() })
      .eq("id", r.id);
    if (e) return setError(e.message);
    onChanged();
    load();
  }

  if (editing) {
    return (
      <div>
        <SectionTitle title={editing.id ? `Edit: ${config.listTitle(editing)}` : config.newLabel} sub="Changes go live after you press Publish." />
        <Card className="grid gap-4">
          {config.fields.map((f) => {
            const v = editing[f.key];
            switch (f.type) {
              case "textarea":
                return (
                  <Field key={f.key} label={f.label} help={f.help}>
                    <textarea className={input} rows={f.rows ?? 4} placeholder={f.placeholder} value={v ?? ""} onChange={(e) => set(f.key, e.target.value)} />
                  </Field>
                );
              case "list":
                return (
                  <Field key={f.key} label={f.label} help={f.help ?? "One per line"}>
                    <textarea
                      className={input}
                      rows={f.rows ?? 3}
                      placeholder={f.placeholder}
                      value={(v ?? []).join("\n")}
                      onChange={(e) => set(f.key, e.target.value.split("\n").map((s) => s.trimStart()))}
                    />
                  </Field>
                );
              case "checkbox":
                return (
                  <label key={f.key} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-[#c2410c]" checked={!!v} onChange={(e) => set(f.key, e.target.checked)} />
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">{f.label}</span>
                      {f.help ? <span className="block text-xs text-slate-500">{f.help}</span> : null}
                    </span>
                  </label>
                );
              case "select":
                return (
                  <Field key={f.key} label={f.label} help={f.help}>
                    <select className={input} value={v ?? ""} onChange={(e) => set(f.key, e.target.value)}>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                );
              case "image":
                return (
                  <Field key={f.key} label={f.label} help={f.help}>
                    <ImageField db={db} folder={config.folder} value={v ?? ""} onChange={(url) => set(f.key, url)} />
                  </Field>
                );
              case "datetime":
                return (
                  <Field key={f.key} label={f.label} help={f.help}>
                    <input
                      type="datetime-local"
                      className={input}
                      value={toLocalInput(v)}
                      onChange={(e) => set(f.key, e.target.value ? new Date(e.target.value).toISOString() : null)}
                    />
                  </Field>
                );
              case "number":
                return (
                  <Field key={f.key} label={f.label} help={f.help}>
                    <input type="number" className={input} value={v ?? 0} onChange={(e) => set(f.key, Number(e.target.value) || 0)} />
                  </Field>
                );
              default:
                return (
                  <Field key={f.key} label={f.label} help={f.help}>
                    <input
                      type={f.type === "url" ? "url" : "text"}
                      className={input}
                      placeholder={f.placeholder}
                      value={v ?? ""}
                      list={f.suggestions ? `dl-${f.key}` : undefined}
                      onChange={(e) => set(f.key, e.target.value)}
                    />
                    {f.suggestions ? (
                      <datalist id={`dl-${f.key}`}>
                        {f.suggestions.map((o) => (
                          <option key={o} value={o} />
                        ))}
                      </datalist>
                    ) : null}
                  </Field>
                );
            }
          })}
          {error ? <Notice tone="error">{error}</Notice> : null}
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" className={btnPrimary} onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" className={btnGhost} onClick={() => { setEditing(null); setError(""); }}>
              Cancel
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle
        title={config.title}
        sub={config.sub}
        actions={
          <button type="button" className={btnPrimary} onClick={() => setEditing({ ...config.defaults })}>
            {config.newLabel}
          </button>
        }
      />
      {flash ? <div className="mb-3"><Notice tone="ok">{flash}</Notice></div> : null}
      {error ? <div className="mb-3"><Notice tone="error">{error}</Notice></div> : null}
      {!rows.length ? <Notice>Nothing yet. Create the first one.</Notice> : null}
      <div className="grid gap-3">
        {rows.map((r) => (
          <Card key={r.id} className="flex flex-wrap items-center gap-3">
            {r.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.image_url} alt="" className="h-14 w-24 rounded object-cover border border-slate-200" />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#0f172a] truncate">{config.listTitle(r)}</p>
              <p className="text-xs text-slate-500">
                {config.listMeta(r)} · updated {timeAgo(r.updated_at || r.created_at)}
              </p>
            </div>
            <Pill tone={config.isLive(r) ? "green" : "slate"}>{config.isLive(r) ? "Live" : "Hidden"}</Pill>
            <div className="flex gap-2">
              <button type="button" className={btnGhost} onClick={() => toggleLive(r)}>
                {r[config.liveKey] ? "Hide" : "Show"}
              </button>
              <button type="button" className={btnDark} onClick={() => setEditing({ ...r })}>
                Edit
              </button>
              <button type="button" className={btnDanger} onClick={() => remove(r)}>
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const now = () => Date.now();
const inWindow = (r: Row) =>
  (!r.starts_at || Date.parse(r.starts_at) <= now()) && (!r.ends_at || Date.parse(r.ends_at) >= now());

export const POSTS_CONFIG: EditorConfig = {
  table: "site_posts",
  title: "News and announcements",
  sub: "Posts appear on /news. Tick 'Show in top bar' to announce it on every page.",
  newLabel: "New post",
  folder: "news",
  liveKey: "published",
  orderBy: [
    { column: "pinned", ascending: false },
    { column: "created_at", ascending: false },
  ],
  defaults: { title: "", summary: "", body: "", image_url: "", link_url: "", link_label: "", show_in_bar: false, bar_text: "", starts_at: null, ends_at: null, pinned: false, published: true },
  fields: [
    { key: "title", label: "Title", type: "text", required: true, placeholder: "New batch starts 1 December" },
    { key: "summary", label: "One-line summary", type: "text", placeholder: "Live MLOps + LLMOps cohort, weekend batch, 20 seats" },
    { key: "image_url", label: "Image", type: "image", help: "Use a 1536×1024 landscape image from ChatGPT. It is resized to 1600px WebP automatically." },
    { key: "body", label: "Text", type: "textarea", rows: 8, help: "Leave a blank line between paragraphs. Links are clickable." },
    { key: "link_url", label: "Button link", type: "text", placeholder: "/enroll/ or https://..." },
    { key: "link_label", label: "Button text", type: "text", placeholder: "Reserve your seat" },
    { key: "show_in_bar", label: "Show in top bar", type: "checkbox", help: "Thin bar above the menu on every page. Only the newest one shows." },
    { key: "bar_text", label: "Top bar text", type: "text", help: "Short. Uses the title if empty.", placeholder: "New batch on 1 Dec. 20 seats." },
    { key: "starts_at", label: "Show from", type: "datetime", help: "Optional" },
    { key: "ends_at", label: "Hide after", type: "datetime", help: "Optional. The top bar disappears by itself after this." },
    { key: "pinned", label: "Pin to top of /news", type: "checkbox" },
    { key: "published", label: "Published", type: "checkbox" },
  ],
  listTitle: (r) => r.title,
  listMeta: (r) => [r.show_in_bar ? "Top bar" : "", r.pinned ? "Pinned" : "", r.ends_at ? `ends ${new Date(r.ends_at).toLocaleDateString("en-GB")}` : ""].filter(Boolean).join(" · ") || "Post",
  isLive: (r) => r.published && inWindow(r),
};

export const BANNERS_CONFIG: EditorConfig = {
  table: "site_banners",
  title: "Banners",
  sub: "Image banners on the homepage, enroll, courses or work-with-me page.",
  newLabel: "New banner",
  folder: "banners",
  liveKey: "active",
  orderBy: [
    { column: "placement", ascending: true },
    { column: "sort", ascending: true },
  ],
  defaults: { title: "", image_url: "", alt: "", link_url: "", placement: "home", sort: 0, starts_at: null, ends_at: null, active: true },
  fields: [
    { key: "title", label: "Name (for you)", type: "text", required: true, placeholder: "December batch banner" },
    { key: "image_url", label: "Banner image", type: "image", help: "1536×1024 or 1600×900 landscape works best. Keep text large so it reads on phones." },
    { key: "alt", label: "Describe the image", type: "text", help: "For screen readers and Google.", placeholder: "December MLOps batch, weekends, 20 seats" },
    { key: "link_url", label: "Link when clicked", type: "text", placeholder: "/enroll/" },
    { key: "placement", label: "Where", type: "select", options: ["home", "enroll", "courses", "work"] },
    { key: "sort", label: "Order", type: "number", help: "Lower shows first" },
    { key: "starts_at", label: "Show from", type: "datetime" },
    { key: "ends_at", label: "Hide after", type: "datetime" },
    { key: "active", label: "Active", type: "checkbox" },
  ],
  listTitle: (r) => r.title,
  listMeta: (r) => `${r.placement} page`,
  isLive: (r) => r.active && inWindow(r),
};

export const PROJECTS_CONFIG: EditorConfig = {
  table: "portfolio_projects",
  title: "Projects",
  sub: "Your portfolio on /projects and /work-with-me. Keep client names out unless you have permission.",
  newLabel: "New project",
  folder: "projects",
  liveKey: "published",
  orderBy: [{ column: "sort", ascending: true }],
  defaults: { slug: "", title: "", category: "client", client_label: "", summary: "", problem: "", solution: "", results: [], stack: [], image_url: "", link_url: "", repo_url: "", sort: 100, featured: false, published: true },
  fields: [
    { key: "title", label: "Title", type: "text", required: true, placeholder: "AI support agent for a logistics company" },
    { key: "category", label: "Type", type: "select", options: ["client", "product", "open-source"] },
    { key: "client_label", label: "Client (described, not named)", type: "text", placeholder: "US logistics company" },
    { key: "summary", label: "One-paragraph summary", type: "textarea", rows: 3, required: true },
    { key: "problem", label: "Problem", type: "textarea", rows: 3 },
    { key: "solution", label: "What you built", type: "textarea", rows: 4 },
    { key: "results", label: "Results", type: "list", help: "One measurable result per line, e.g. '41% lower handling time'" },
    { key: "stack", label: "Stack", type: "list", help: "One tool per line" },
    { key: "image_url", label: "Screenshot or diagram", type: "image" },
    { key: "link_url", label: "Live link or download", type: "url" },
    { key: "repo_url", label: "Source code link", type: "url" },
    { key: "slug", label: "URL name", type: "text", help: "Made from the title if empty" },
    { key: "sort", label: "Order", type: "number", help: "Lower shows first" },
    { key: "featured", label: "Featured on the homepage", type: "checkbox" },
    { key: "published", label: "Published", type: "checkbox" },
  ],
  listTitle: (r) => r.title,
  listMeta: (r) => [r.category, r.client_label, r.featured ? "Featured" : ""].filter(Boolean).join(" · "),
  isLive: (r) => r.published,
  beforeSave: (r) => ({
    ...r,
    slug: r.slug ? slugify(r.slug) : slugify(r.title),
    results: (r.results ?? []).map((s: string) => s.trim()).filter(Boolean),
    stack: (r.stack ?? []).map((s: string) => s.trim()).filter(Boolean),
  }),
};

export const ACTIVITY_ACTIONS = [
  "joined the MLOps and LLMOps cohort",
  "joined the AI Automation course",
  "booked a 1:1 mentorship session",
  "started the Agentic AI and FDE track",
  "bought the course recordings",
  "finished a capstone project",
  "got placed as an MLOps engineer",
  "joined the free workshop",
];

export const ACTIVITY_CONFIG: EditorConfig = {
  table: "site_activity",
  title: "Activity feed",
  sub: "Real students only, with their OK. Shows as a small card on the site: first name, city and what they did. Entries older than 30 days stop showing.",
  newLabel: "Add activity",
  folder: "activity",
  liveKey: "published",
  orderBy: [{ column: "happened_at", ascending: false }],
  defaults: { first_name: "", city: "", action: ACTIVITY_ACTIONS[0], happened_at: null, published: true },
  fields: [
    { key: "first_name", label: "First name", type: "text", required: true, placeholder: "Ravi" },
    { key: "city", label: "City", type: "text", placeholder: "Pune" },
    { key: "action", label: "What they did", type: "text", required: true, suggestions: ACTIVITY_ACTIONS, help: "Pick one or type your own." },
    { key: "happened_at", label: "When", type: "datetime", help: "Leave empty for now." },
    { key: "published", label: "Show on the site", type: "checkbox" },
  ],
  listTitle: (r) => `${r.first_name}${r.city ? ` from ${r.city}` : ""} ${r.action}`,
  listMeta: (r) =>
    new Date(r.happened_at || r.created_at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
  isLive: (r) => r.published && Date.parse(r.happened_at || r.created_at) > Date.now() - 30 * 86400000,
  beforeSave: (r) => ({
    ...r,
    first_name: String(r.first_name).trim().split(/\s+/)[0],
    city: String(r.city || "").trim(),
    happened_at: r.happened_at || new Date().toISOString(),
  }),
};

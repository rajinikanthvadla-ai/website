"use client";

import type { ReactNode } from "react";

export const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 disabled:bg-slate-50";
export const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
export const btnPrimary = `${btn} bg-[#c2410c] text-white hover:bg-[#9a3412]`;
export const btnDark = `${btn} bg-[#0f172a] text-white hover:bg-slate-700`;
export const btnGhost = `${btn} border border-slate-300 bg-white text-slate-800 hover:bg-slate-50`;
export const btnDanger = `${btn} border border-red-200 bg-white text-red-700 hover:bg-red-50`;

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-4 md:p-5 ${className}`}>{children}</div>;
}

export function SectionTitle({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-[#0f172a]">{title}</h2>
        {sub ? <p className="text-sm text-slate-500 mt-0.5">{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "ok"; children: ReactNode }) {
  const tones = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    error: "border-red-200 bg-red-50 text-red-800",
    ok: "border-emerald-200 bg-emerald-50 text-emerald-900",
  } as const;
  return <div className={`rounded-lg border px-3 py-2.5 text-sm ${tones[tone]}`}>{children}</div>;
}

export function Field({ label, help, children }: { label: string; help?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-800 mb-1">{label}</span>
      {children}
      {help ? <span className="block text-xs text-slate-500 mt-1">{help}</span> : null}
    </label>
  );
}

export function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "green" | "orange" | "blue" | "red" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-800",
    orange: "bg-orange-100 text-orange-800",
    blue: "bg-sky-100 text-sky-800",
    red: "bg-red-100 text-red-800",
  } as const;
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
}

/** Horizontal bar list for analytics. */
export function BarList({ items, empty = "No data yet" }: { items: { name: string; count: number }[]; empty?: string }) {
  if (!items?.length) return <p className="text-sm text-slate-500">{empty}</p>;
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <ul className="space-y-1.5">
      {items.map((i) => (
        <li key={i.name} className="relative">
          <div className="absolute inset-y-0 left-0 rounded bg-teal-50" style={{ width: `${(i.count / max) * 100}%` }} aria-hidden />
          <div className="relative flex justify-between gap-3 px-2 py-1 text-sm">
            <span className="truncate text-slate-800" title={i.name}>
              {i.name || "(none)"}
            </span>
            <span className="font-semibold tabular-nums text-slate-900">{i.count}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

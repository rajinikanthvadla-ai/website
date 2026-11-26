"use client";

import { useEffect, useState } from "react";

export type CountdownPhase = {
  /** ISO time this phase ends, with offset, e.g. 2026-12-06T11:00:00+05:30 */
  until: string;
  label: string;
  /** Show this instead of a timer (for example while a live session is running). */
  liveText?: string;
};

type Props = {
  phases: CountdownPhase[];
  /** Shown once every phase has passed. Never restarts, so the urgency is always real. */
  after: string;
  variant?: "hero" | "light" | "inline";
};

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Counts down to real dates: demo start, then early bird end. Renders "--" until the browser takes over. */
export default function Countdown({ phases, after, variant = "light" }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const phase = now === null ? phases[0] : phases.find((item) => Date.parse(item.until) > now);
  const left = phase && now !== null ? parts(Date.parse(phase.until) - now) : null;

  if (!phase) {
    return <p className={variant === "hero" ? "text-sm font-semibold text-slate-300" : "text-sm font-semibold text-slate-600"}>{after}</p>;
  }

  if (phase.liveText && now !== null) {
    return (
      <p className={`inline-flex items-center gap-2 text-sm font-bold ${variant === "hero" ? "text-emerald-300" : "text-emerald-700"}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        {phase.liveText}
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <p className="text-[13px] font-semibold text-orange-800" role="timer">
        {phase.label}{" "}
        <span className="tabular-nums">
          {left ? `${left.days}d ${pad(left.hours)}h ${pad(left.mins)}m ${pad(left.secs)}s` : "--"}
        </span>
      </p>
    );
  }

  const units = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Mins", left?.mins],
    ["Secs", left?.secs],
  ] as const;
  const hero = variant === "hero";

  return (
    <div role="timer" aria-label={phase.label}>
      <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${hero ? "text-orange-300" : "text-orange-700"}`}>
        {phase.label}
      </p>
      <div className="flex gap-2">
        {units.map(([unit, value]) => (
          <div
            key={unit}
            className={`w-16 sm:w-[4.5rem] rounded-lg px-2 py-2 text-center ${
              hero ? "bg-white/10 ring-1 ring-white/20" : "bg-white ring-1 ring-orange-200"
            }`}
          >
            <div className={`font-display text-2xl sm:text-3xl font-bold tabular-nums leading-none ${hero ? "text-white" : "text-slate-900"}`}>
              {value === undefined ? "--" : pad(value)}
            </div>
            <div className={`mt-1 text-[10px] font-bold uppercase tracking-wide ${hero ? "text-slate-300" : "text-slate-500"}`}>
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

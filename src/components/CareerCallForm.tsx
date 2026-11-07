"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/constants";
import { MARKET_LABELS, TIMEZONE_TO_MARKET } from "@/lib/market-zones";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

export const CAREER_CALL_INTEREST = "Free 15-min AI career call";
export const CAREER_CALL_DONE_KEY = "rv-career-call-sent";

const ROLES = [
  "Student or fresher",
  "Software developer",
  "DevOps, cloud or SRE",
  "Data engineer or analyst",
  "Data scientist or ML engineer",
  "QA or testing",
  "Support or other IT role",
  "Manager or tech lead",
  "Non-IT background",
];
const EXPERIENCE = ["0-1 years", "2-4 years", "5-8 years", "9+ years"];
const GOALS = [
  "Move into MLOps or AIOps",
  "Become an LLMOps or GenAI engineer",
  "Build AI agents (FDE path)",
  "Get a job abroad",
  "Salary hike or promotion",
  "Not sure yet, need direction",
];

/** Sends a non-link event to SiteAnalytics (shows in /admin > Analytics > top clicks). */
export function track(label: string) {
  window.dispatchEvent(new CustomEvent("rv-track", { detail: label }));
}

function guessCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "India";
    const slug = TIMEZONE_TO_MARKET[tz];
    if (!slug) return "";
    const full: Record<string, string> = { "the US": "United States", "the UK": "United Kingdom", "the UAE": "United Arab Emirates" };
    const name = MARKET_LABELS[slug].name;
    return full[name] ?? name.replace(/^the /, "");
  } catch {
    return "";
  }
}

const field = "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal text-[0.95rem] bg-white";
const labelCls = "text-[0.8rem] font-semibold text-slate-700";

/**
 * Free 15-minute AI career call request.
 * Saves to Supabase "leads" with interest "Free 15-min AI career call" (shows in /admin > Leads);
 * the database trigger in supabase/lead-alerts.sql emails you each new request.
 */
export default function CareerCallForm({ compact = false, source = "page" }: { compact?: boolean; source?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState(ROLES[1]);
  const [experience, setExperience] = useState(EXPERIENCE[1]);
  const [goal, setGoal] = useState(GOALS[0]);
  const [bestTime, setBestTime] = useState("");
  const [note, setNote] = useState("");
  const [trap, setTrap] = useState(""); // honeypot: real people never fill this
  const [state, setState] = useState<"idle" | "sending" | "done" | "fallback">("idle");
  const [error, setError] = useState("");

  useEffect(() => setCountry(guessCountry()), []);

  const first = name.trim().split(/\s+/)[0] || "";
  const waText = `Hi Rajinikanth, I'd like the free 15-min AI career call. I'm ${name.trim() || "interested"} (${role}, ${experience}). Goal: ${goal}.${bestTime.trim() ? ` Best time: ${bestTime.trim()}.` : ""}`;
  const wa = `${LINKS.whatsapp}?text=${encodeURIComponent(waText)}`;
  const span = compact ? "" : "sm:col-span-2";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (trap) return setState("done");
    if (name.trim().length < 2) return setError("Please add your name.");
    if (!email.trim() && !whatsapp.trim()) return setError("Add an email or a WhatsApp number so I can fix a time with you.");
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) return setError("That email does not look right.");
    if (whatsapp.trim() && whatsapp.replace(/[^\d]/g, "").length < 8) return setError("That WhatsApp number looks too short.");

    setState("sending");
    let tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(window.location.search);
    const message = [
      `Role: ${role}`,
      `Experience: ${experience}`,
      `Goal: ${goal}`,
      bestTime.trim() ? `Best time to call: ${bestTime.trim()}` : "",
      tz ? `Time zone: ${tz}` : "",
      note.trim() ? `Note: ${note.trim()}` : "",
      `Asked via: ${source}`,
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 1000);

    const row = {
      name: name.trim().slice(0, 80),
      email: email.trim().slice(0, 120),
      whatsapp: whatsapp.trim().slice(0, 30),
      interest: CAREER_CALL_INTEREST,
      country: country.trim().slice(0, 60),
      message,
      page: window.location.pathname.slice(0, 200),
      referrer: document.referrer.slice(0, 300),
      utm_source: (params.get("utm_source") || "").slice(0, 80),
      utm_medium: (params.get("utm_medium") || "").slice(0, 80),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 120),
    };

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setState("fallback");
    const { error: dbError } = await supabase.from("leads").insert(row);
    if (dbError) return setState("fallback");
    try {
      window.localStorage.setItem(CAREER_CALL_DONE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    track(`Career call: request sent (${source})`);
    setState("done");
  }

  if (state === "done" || state === "fallback") {
    return (
      <div className="text-center py-2">
        <p className="font-display text-xl font-bold text-[#0f172a] mb-2">
          {state === "done" ? `Got it${first ? `, ${first}` : ""}.` : "Almost there."}
        </p>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {state === "done"
            ? "I'll message you on WhatsApp or email within 24 hours to fix a 15-minute slot in your time zone. Want it sooner? Send me a WhatsApp now."
            : "The form could not save right now. Send the same details on WhatsApp and I'll fix a time with you."}
        </p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent" data-track={`Career call: WhatsApp after form (${source})`}>
          Message me on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`} noValidate>
      <label className={labelCls}>
        Name
        <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </label>
      <label className={labelCls}>
        WhatsApp number
        <input className={field} type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel" placeholder="With country code" />
      </label>
      <label className={labelCls}>
        Email
        <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </label>
      <label className={labelCls}>
        Country
        <input className={field} value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" />
      </label>
      <label className={labelCls}>
        You are now a
        <select className={field} value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Experience
        <select className={field} value={experience} onChange={(e) => setExperience(e.target.value)}>
          {EXPERIENCE.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label className={`${labelCls} ${span}`}>
        What do you want next?
        <select className={field} value={goal} onChange={(e) => setGoal(e.target.value)}>
          {GOALS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label className={`${labelCls} ${span}`}>
        Best time to call (optional)
        <input className={field} value={bestTime} onChange={(e) => setBestTime(e.target.value)} placeholder="e.g. weekdays after 7 PM" maxLength={80} />
      </label>
      {!compact ? (
        <label className={`${labelCls} ${span}`}>
          Anything I should know? (optional)
          <textarea className={field} rows={3} value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} />
        </label>
      ) : null}
      <label className="hidden" aria-hidden="true">
        Leave this empty
        <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </label>
      {error ? (
        <p className={`text-sm text-red-700 ${span}`} role="alert">
          {error}
        </p>
      ) : null}
      <div className={span}>
        <button type="submit" disabled={state === "sending"} className="notion-btn notion-btn--accent w-full justify-center disabled:opacity-60">
          {state === "sending" ? "Sending..." : "Book my free 15-min call"}
        </button>
        <p className="text-[0.72rem] text-slate-500 mt-2 text-center">
          Free. I reply personally to fix a time. <a href="/privacy-policy/" className="underline underline-offset-2">Privacy policy</a>
        </p>
      </div>
    </form>
  );
}

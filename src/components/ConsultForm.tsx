"use client";

import { useState } from "react";
import { LINKS } from "@/lib/constants";
import { CONSULT_BUDGETS, CONSULT_SERVICE_OPTIONS, CONSULT_TIMELINES } from "@/lib/portfolio";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
const label = "block text-sm font-semibold text-slate-800 mb-1.5";

export default function ConsultForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string, max: number) => String(form.get(k) || "").trim().slice(0, max);
    const row = {
      name: get("name", 80),
      email: get("email", 120),
      whatsapp: get("whatsapp", 30),
      company: get("company", 120),
      role: get("role", 80),
      service: get("service", 80),
      budget: get("budget", 40),
      timeline: get("timeline", 40),
      details: get("details", 3000),
      page: window.location.pathname.slice(0, 200),
      referrer: document.referrer.slice(0, 300),
      utm_source: (new URLSearchParams(window.location.search).get("utm_source") || "").slice(0, 80),
      utm_medium: (new URLSearchParams(window.location.search).get("utm_medium") || "").slice(0, 80),
      utm_campaign: (new URLSearchParams(window.location.search).get("utm_campaign") || "").slice(0, 120),
    };
    if (row.name.length < 2) return setError("Please add your name.");
    if (!row.email && !row.whatsapp) return setError("Please add an email or a WhatsApp number so I can reply.");
    if (row.details.length < 20) return setError("Please describe what you need in a sentence or two.");

    const db = getSupabaseBrowserClient();
    if (!db) {
      setError("The form is not connected right now. Please message on WhatsApp instead.");
      return setState("error");
    }
    setError("");
    setState("sending");
    const { error: dbError } = await db.from("consult_requests").insert(row);
    if (dbError) {
      setError("Could not send. Please try again, or message on WhatsApp.");
      return setState("error");
    }
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="panel p-6 md:p-8 text-center">
        <p className="font-display text-2xl font-bold text-[#0f172a] mb-2">Request received.</p>
        <p className="text-slate-600 mb-5">
          I read every request myself and reply within one working day with next steps or a short call link.
        </p>
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ghost">
          Need it faster? WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel p-5 md:p-8 grid gap-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="c-name">Your name</label>
          <input id="c-name" name="name" className={field} autoComplete="name" required />
        </div>
        <div>
          <label className={label} htmlFor="c-company">Company</label>
          <input id="c-company" name="company" className={field} autoComplete="organization" placeholder="Optional" />
        </div>
        <div>
          <label className={label} htmlFor="c-email">Work email</label>
          <input id="c-email" name="email" type="email" className={field} autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor="c-wa">WhatsApp</label>
          <input id="c-wa" name="whatsapp" type="tel" className={field} autoComplete="tel" placeholder="With country code" />
        </div>
        <div>
          <label className={label} htmlFor="c-role">Your role</label>
          <input id="c-role" name="role" className={field} placeholder="CTO, founder, engineering lead..." />
        </div>
        <div>
          <label className={label} htmlFor="c-service">What do you need?</label>
          <select id="c-service" name="service" className={field} defaultValue={defaultService || CONSULT_SERVICE_OPTIONS[0]}>
            {CONSULT_SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="c-budget">Budget</label>
          <select id="c-budget" name="budget" className={field} defaultValue={CONSULT_BUDGETS[0]}>
            {CONSULT_BUDGETS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="c-timeline">Timeline</label>
          <select id="c-timeline" name="timeline" className={field} defaultValue={CONSULT_TIMELINES[0]}>
            {CONSULT_TIMELINES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="c-details">Tell me about it</label>
        <textarea
          id="c-details"
          name="details"
          rows={5}
          className={field}
          placeholder="What should the agent or system do? What data and tools do you already have? What does success look like?"
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="notion-btn notion-btn--accent" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Send request"}
        </button>
        <span className="text-sm text-slate-500">Reply within one working day. Your details stay private.</span>
      </div>
    </form>
  );
}

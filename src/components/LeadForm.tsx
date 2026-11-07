"use client";

import { useState } from "react";
import { LINKS } from "@/lib/constants";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

const INTERESTS = [
  "MLOps / AIOps / LLMOps masterclass",
  "AI Agents & Agentic FDE",
  "AI-Powered Automation",
  "1:1 Mentorship",
  "Resume & interview prep",
  "Corporate / team training",
  "Not sure yet",
];

type Props = {
  /** Section heading */
  title?: string;
  subtitle?: string;
  defaultInterest?: string;
};

function waLink(name: string, interest: string, message: string) {
  const text = `Hi Rajinikanth, I am ${name || "interested"}. Interested in: ${interest}.${message ? ` ${message}` : ""}`;
  return `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Enquiry form that saves a lead in Supabase, then offers WhatsApp for a faster reply. */
export default function LeadForm({
  title = "Tell me what you want to learn",
  subtitle = "Leave your details and I will reply personally with batch dates, fees and the right path for you. Usually within a day.",
  defaultInterest = INTERESTS[0],
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // honeypot: real people never fill this
  const [state, setState] = useState<"idle" | "sending" | "done" | "fallback">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (trap) {
      setState("done");
      return;
    }
    if (name.trim().length < 2) return setError("Please add your name.");
    if (!email.trim() && !whatsapp.trim()) return setError("Add an email or a WhatsApp number so I can reply.");
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) return setError("That email does not look right.");

    setState("sending");
    const params = new URLSearchParams(window.location.search);
    const row = {
      name: name.trim().slice(0, 80),
      email: email.trim().slice(0, 120),
      whatsapp: whatsapp.trim().slice(0, 30),
      interest: interest.slice(0, 80),
      country: country.trim().slice(0, 60),
      message: message.trim().slice(0, 1000),
      page: window.location.pathname.slice(0, 200),
      referrer: document.referrer.slice(0, 300),
      utm_source: (params.get("utm_source") || "").slice(0, 80),
      utm_medium: (params.get("utm_medium") || "").slice(0, 80),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 120),
    };

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setState("fallback");
      return;
    }
    const { error: dbError } = await supabase.from("leads").insert(row);
    setState(dbError ? "fallback" : "done");
  }

  const wa = waLink(name.trim(), interest, message.trim());

  return (
    <section id="enquire" className="border-y border-slate-200 bg-white py-14 md:py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-2">{title}</h2>
        <p className="text-sm md:text-base text-slate-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed">{subtitle}</p>

        {state === "done" || state === "fallback" ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="font-display text-xl font-bold text-[#0f172a] mb-2">
              {state === "done" ? "Thanks, got it." : "Almost there."}
            </p>
            <p className="text-sm text-slate-600 mb-5">
              {state === "done"
                ? "I will reply soon. Want an answer today? Send the same note on WhatsApp."
                : "The form could not save right now. Send it on WhatsApp and I will reply directly."}
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
              Send on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4" noValidate>
            <label className="text-sm font-semibold text-slate-700">
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Country
              <input value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              WhatsApp number
              <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
              I am interested in
              <select value={interest} onChange={(e) => setInterest(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal bg-white">
                {INTERESTS.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
              Your background or question (optional)
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={1000}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="hidden" aria-hidden="true">
              Leave this empty
              <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
            </label>
            {error ? <p className="text-sm text-red-700 sm:col-span-2" role="alert">{error}</p> : null}
            <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={state === "sending"} className="notion-btn notion-btn--accent disabled:opacity-60">
                {state === "sending" ? "Sending..." : "Send my details"}
              </button>
              <span className="text-xs text-slate-500">No spam. Only a personal reply about your request. <a href="/privacy-policy/" className="underline underline-offset-2">Privacy policy</a></span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

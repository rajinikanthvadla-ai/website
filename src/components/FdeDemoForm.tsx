"use client";

import { useState } from "react";
import { LINKS } from "@/lib/constants";
import { FDE_COURSE } from "@/lib/fde-course-content";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";
import Countdown from "./Countdown";

/** Shows in Admin > Leads. The lead-alert trigger emails each signup. */
export const FDE_DEMO_INTEREST = "FDE free demo · Sun 6 Dec";

const EXPERIENCE = ["0-2 years", "3-5 years", "6-10 years", "10+ years"];
const ROLES = [
  "Software developer",
  "DevOps, cloud or SRE",
  "Data or ML engineer",
  "Solutions or support engineer",
  "Architect or tech lead",
  "Other",
];

const field = "mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal text-[15px] text-slate-900 bg-white";
const labelCls = "block text-[13px] font-semibold text-slate-700";

function track(label: string) {
  window.dispatchEvent(new CustomEvent("rv-track", { detail: label }));
}

/** Free Zoom demo registration for the FDE cohort. */
export default function FdeDemoForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState(EXPERIENCE[1]);
  const [role, setRole] = useState(ROLES[0]);
  const [earlyBird, setEarlyBird] = useState(true);
  const [trap, setTrap] = useState(""); // honeypot: people never fill this
  const [state, setState] = useState<"idle" | "sending" | "done" | "fallback">("idle");
  const [error, setError] = useState("");

  const first = name.trim().split(/\s+/)[0] || "";
  const waText = `Hi Rajinikanth, I registered for the free FDE demo on ${FDE_COURSE.demoShort}, ${FDE_COURSE.demoTime}. I'm ${
    name.trim() || "interested"
  } (${role}, ${experience}).${earlyBird ? " I want the early bird ₹32,000. Please share how to pay." : ""}`;
  const wa = `${LINKS.whatsapp}?text=${encodeURIComponent(waText)}`;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (trap) return setState("done");
    if (name.trim().length < 2) return setError("Please add your name.");
    if (whatsapp.replace(/[^\d]/g, "").length < 8) return setError("Add your WhatsApp number with country code. The Zoom link goes there.");
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) return setError("That email does not look right.");

    setState("sending");
    let timeZone = "";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(window.location.search);
    const message = [
      `Role: ${role}`,
      `Experience: ${experience}`,
      `Early bird ₹32,000: ${earlyBird ? "yes, interested" : "not yet"}`,
      timeZone ? `Time zone: ${timeZone}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setState("fallback");
    const { error: dbError } = await supabase.from("leads").insert({
      name: name.trim().slice(0, 80),
      email: email.trim().slice(0, 120),
      whatsapp: whatsapp.trim().slice(0, 30),
      interest: FDE_DEMO_INTEREST,
      country: "",
      message: message.slice(0, 1000),
      page: window.location.pathname.slice(0, 200),
      referrer: document.referrer.slice(0, 300),
      utm_source: (params.get("utm_source") || "").slice(0, 80),
      utm_medium: (params.get("utm_medium") || "").slice(0, 80),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 120),
    });
    if (dbError) return setState("fallback");
    track(`FDE demo: registered${earlyBird ? " (early bird)" : ""}`);
    setState("done");
  }

  if (state === "done" || state === "fallback") {
    const done = state === "done";
    return (
      <div className="rounded-xl border-2 border-emerald-600 bg-white p-6 text-slate-900" role="status">
        <p className="font-display text-2xl font-bold">{done ? `You're registered${first ? `, ${first}` : ""}.` : "Almost there."}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
          {done
            ? `The Zoom link for ${FDE_COURSE.demoDate}, ${FDE_COURSE.demoTime} will be sent to your WhatsApp before the demo. Save the number +91 91000 28801 so the message reaches you.`
            : "The form could not save right now. Send the same details on WhatsApp and you will get the Zoom link there."}
        </p>
        {earlyBird && (
          <p className="mt-3 rounded-lg bg-orange-50 px-3 py-2 text-[14px] text-orange-950">
            Early bird ₹32,000 is open until {FDE_COURSE.earlyBirdDeadline} (first 8 seats). From Monday it is ₹36,999.
          </p>
        )}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 sm:w-auto"
          data-track="FDE demo: WhatsApp after register"
        >
          {earlyBird ? "Lock the early bird on WhatsApp" : "Message Rajinikanth on WhatsApp"}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 text-slate-900 shadow-sm">
      <p className="font-display text-xl font-bold">Register for the free demo</p>
      <p className="mt-1 text-[13px] text-slate-600">
        {FDE_COURSE.demoDate} · {FDE_COURSE.demoTime} · {FDE_COURSE.demoPlatform} · free
      </p>
      <div className="mt-2">
        <Countdown
          variant="inline"
          phases={[
            { until: FDE_COURSE.demoStartIso, label: "Starts in" },
            { until: FDE_COURSE.demoEndIso, label: "Live now", liveText: "Live now. Register to get the Zoom link on WhatsApp." },
          ]}
          after="This demo has ended. Message on WhatsApp to join the cohort."
        />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className={`${labelCls} sm:col-span-2`}>
          Full name
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        </label>
        <label className={labelCls}>
          WhatsApp number
          <input
            className={field}
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            required
          />
        </label>
        <label className={labelCls}>
          Email (optional)
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label className={labelCls}>
          Experience
          <select className={field} value={experience} onChange={(e) => setExperience(e.target.value)}>
            {EXPERIENCE.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Current role
          <select className={field} value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2 flex items-start gap-2.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5 text-[14px] text-orange-950">
          <input
            type="checkbox"
            checked={earlyBird}
            onChange={(e) => setEarlyBird(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-orange-600"
          />
          <span>
            I&apos;m interested in the early bird ₹32,000 (pay by {FDE_COURSE.earlyBirdDeadline}). Paying is a separate
            step on WhatsApp.
          </span>
        </label>
        <label className="hidden" aria-hidden="true">
          Leave this empty
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-4 w-full rounded-lg bg-orange-500 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-orange-600 disabled:opacity-60"
      >
        {state === "sending" ? "Registering..." : "Register free · get the Zoom link"}
      </button>
      <p className="mt-2 text-center text-[12px] text-slate-500">
        No payment to attend. Your number is used to send the Zoom link and course updates.{" "}
        <a href="/privacy-policy/" className="underline underline-offset-2">
          Privacy policy
        </a>
      </p>
    </form>
  );
}

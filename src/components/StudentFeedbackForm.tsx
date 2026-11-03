"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LINKS } from "@/lib/constants";
import {
  getFeedbackAccessToken,
  isValidFeedbackAccess,
  submitStudentTestimonial,
} from "@/lib/student-testimonials";
import { isSupabaseConfigured } from "@/lib/supabase-client";

const COURSES = [
  "MLOps · AIOps · LLMOps Masterclass (Live)",
  "MLOps Masterclass (Recordings)",
  "AI-Powered Automation",
  "1:1 Mentorship",
  "Community / YouTube member",
  "Other / mixed",
] as const;

type Status = "idle" | "submitting" | "done" | "error";

export default function StudentFeedbackForm() {
  const params = useSearchParams();
  const access = params.get("k") || params.get("access") || "";
  const allowed = useMemo(() => isValidFeedbackAccess(access), [access]);
  const storageReady = isSupabaseConfigured();
  const expectedConfigured = Boolean(getFeedbackAccessToken());

  const [name, setName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState<string>(COURSES[0]);
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allowed) return;
    setStatus("submitting");
    setError("");

    const result = await submitStudentTestimonial({
      name,
      roleTitle,
      city,
      course,
      rating,
      quote,
      linkedinUrl,
      consentToPublish: consent,
    });

    if (!result.ok) {
      setStatus("error");
      setError(result.error);
      return;
    }

    setStatus("done");
    setQuote("");
  }

  if (!expectedConfigured) {
    return (
      <div className="panel p-6 md:p-8">
        <h1 className="font-display text-2xl font-bold text-slate-900 mb-3">Feedback link not ready</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          The private feedback token is not set on this deploy yet. Message Rajinikanth on WhatsApp and he will share
          the working link.
        </p>
        <a href={LINKS.whatsapp} className="notion-btn notion-btn--accent mt-6 inline-flex" target="_blank" rel="noopener noreferrer">
          WhatsApp Rajinikanth
        </a>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="panel p-6 md:p-8 border-l-4 border-l-orange-500">
        <h1 className="font-display text-2xl font-bold text-slate-900 mb-3">Private student link</h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          This page is not open to the public. Use the personal feedback link Rajinikanth sent you (it includes an
          access code). Random visitors cannot submit reviews here.
        </p>
        <a href={LINKS.whatsapp} className="notion-btn notion-btn--ink inline-flex" target="_blank" rel="noopener noreferrer">
          Ask for the link on WhatsApp
        </a>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="panel p-6 md:p-8 border-l-4 border-l-emerald-600">
        <h1 className="font-display text-2xl font-bold text-slate-900 mb-3">Thank you</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Your feedback was submitted privately. It will appear on the website only after Rajinikanth reviews and
          approves it. Nothing goes live automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="panel p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-2">Private student form</p>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Share your feedback with Rajinikanth Vadla
      </h1>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        Write honestly about the training or mentorship. Submissions stay pending until he approves them for the
        public site.
      </p>

      {!storageReady ? (
        <p className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Storage is not connected on this deploy yet. You can still draft here, but submission may fail — WhatsApp
          your text if that happens.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Your name *</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 text-sm focus:border-blue-700 focus:outline-none"
            placeholder="Full name"
            maxLength={80}
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Role / title</span>
            <input
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 text-sm focus:border-blue-700 focus:outline-none"
              placeholder="e.g. MLOps Engineer"
              maxLength={120}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">City / country</span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 text-sm focus:border-blue-700 focus:outline-none"
              placeholder="e.g. Hyderabad · India"
              maxLength={80}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Which program?</span>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 text-sm focus:border-blue-700 focus:outline-none bg-white"
          >
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">Rating</legend>
          <div className="mt-2 flex gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`px-3 py-1.5 rounded-lg border-2 text-sm font-bold ${
                  rating === n
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-slate-300 text-slate-700 hover:border-slate-500"
                }`}
              >
                {n}★
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Your feedback *</span>
          <textarea
            required
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={6}
            maxLength={1200}
            className="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 text-sm focus:border-blue-700 focus:outline-none"
            placeholder="What changed for you? Labs, mentorship, interviews, job outcome…"
          />
          <span className="text-xs text-slate-500">{quote.length}/1200</span>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-900">LinkedIn (optional)</span>
          <input
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 text-sm focus:border-blue-700 focus:outline-none"
            placeholder="https://linkedin.com/in/…"
            maxLength={300}
          />
        </label>

        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span>
            I allow Rajinikanth Vadla to publish this feedback on rajinikanthvadla.com after he reviews it. (Uncheck if
            this is private feedback only.)
          </span>
        </label>

        {status === "error" && error ? (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="notion-btn notion-btn--accent w-full sm:w-auto disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit privately"}
        </button>
      </form>
    </div>
  );
}

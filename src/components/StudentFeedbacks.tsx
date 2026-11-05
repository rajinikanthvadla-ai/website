"use client";

import { useEffect, useState } from "react";
import { fetchApprovedTestimonials, type ApprovedTestimonial } from "@/lib/student-testimonials";
import { isSupabaseConfigured } from "@/lib/supabase-client";

function Stars({ rating }: { rating: number }) {
  const n = Math.min(5, Math.max(1, Math.round(rating) || 5));
  return (
    <span className="text-amber-500 text-sm tracking-tight" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="text-slate-300">{"★".repeat(5 - n)}</span>
    </span>
  );
}

/** Live approved student feedback from Supabase (shown first so people trust it). */
export default function StudentFeedbacks({
  limit = 12,
  initial = [],
}: {
  limit?: number;
  /** Approved reviews fetched at build time, so they are in the HTML Google and AI crawlers read. */
  initial?: ApprovedTestimonial[];
}) {
  const [rows, setRows] = useState<ApprovedTestimonial[]>(initial.slice(0, limit));
  const [ready, setReady] = useState(initial.length > 0);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    let cancelled = false;
    fetchApprovedTestimonials()
      .then((data) => {
        if (!cancelled && data.length) setRows(data.slice(0, limit));
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (!configured) {
    return null;
  }

  if (!ready) {
    return (
      <section id="student-feedbacks" className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm text-slate-500">Loading student feedback…</p>
        </div>
      </section>
    );
  }

  if (!rows.length) {
    return null;
  }

  return (
    <section id="student-feedbacks" className="border-b border-slate-200 bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-2 text-center">
          Recent student feedback
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-2">
          What students wrote after the sessions
        </h2>
        <p className="text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
          Real submissions from the private student link. Each note is reviewed by Rajinikanth before it appears
          here.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {rows.map((t) => (
            <figure
              key={t.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <Stars rating={t.rating} />
                <span className="text-[10px] font-bold uppercase tracking-wide text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                  Verified student
                </span>
              </div>
              <blockquote className="text-sm text-slate-700 leading-relaxed flex-1 mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="pt-3 border-t border-slate-200">
                <div className="text-sm font-bold text-[#0f172a]">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {[t.roleTitle, t.city].filter(Boolean).join(" · ")}
                </div>
                {t.course ? (
                  <div className="text-xs font-semibold text-slate-600 mt-1">{t.course}</div>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

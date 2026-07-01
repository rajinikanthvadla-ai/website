"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LINKS, MLOPS_MASTERCLASS_DURATION, AI_AUTOMATION_DURATION } from "@/lib/constants";

const STORAGE_KEY = "rv-new-courses-popup-dismissed";

const COURSES = [
  {
    badge: "Starting Soon",
    badgeClass: "bg-orange-500",
    title: "AI-Powered Automation Efficiency",
    duration: AI_AUTOMATION_DURATION,
    desc: "Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents, and open-source AI agents. Enterprise skills from real JDs.",
    href: "/courses/ai-automation",
    cta: "View AI Automation",
    accent: "border-l-orange-500",
  },
  {
    badge: "Job Ready",
    badgeClass: "bg-blue-700",
    title: "MLOps · AIOps · LLMOps · AI Agents",
    duration: MLOPS_MASTERCLASS_DURATION,
    desc: "Complete live program from DevOps to production AI agents. 150+ hours hands-on, capstones, interview prep and placement support.",
    href: "/mlops-aiops-masterclass",
    cta: "View Masterclass",
    accent: "border-l-blue-700",
  },
] as const;

export default function NewCoursesPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    const timer = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="new-courses-title">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/70"
        aria-label="Close announcement"
        onClick={dismiss}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-700 text-white px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide mb-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                New Batches Opening
              </span>
              <h2 id="new-courses-title" className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                Two new courses are starting soon
              </h2>
              <p className="text-blue-100 text-sm sm:text-base mt-2 leading-relaxed">
                Live online training with hands-on labs. Limited seats per batch.
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 w-9 h-9 rounded-lg border border-blue-500 text-blue-100 hover:bg-blue-600 hover:text-white transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {COURSES.map((course) => (
            <div key={course.href} className={`panel border-l-4 ${course.accent} p-5 sm:p-6`}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`${course.badgeClass} text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide`}>
                  {course.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500">{course.duration}</span>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl mb-2">{course.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{course.desc}</p>
              <Link
                href={course.href}
                onClick={dismiss}
                className="inline-flex items-center bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                {course.cta} &rarr;
              </Link>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={LINKS.enroll}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="inline-flex justify-center items-center bg-orange-500 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
            >
              Enroll Now &rarr;
            </a>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="inline-flex justify-center items-center bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              WhatsApp for Details
            </a>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex justify-center items-center border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold hover:border-slate-500 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

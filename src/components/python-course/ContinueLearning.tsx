"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PYTHON_LESSONS } from "@/lib/python-course";
import { getContinueLesson } from "@/lib/python-course/code-storage";
import { readCourseProgress } from "@/lib/python-course/progress";

export default function ContinueLearning() {
  const [href, setHref] = useState(`/python-course/${PYTHON_LESSONS[0]?.slug || "why-python-for-ai"}/`);
  const [label, setLabel] = useState("Start lesson 1");
  const [sub, setSub] = useState("No signup. First lesson takes about 12 minutes.");

  useEffect(() => {
    const saved = getContinueLesson();
    const progress = readCourseProgress();
    if (saved) {
      setHref(`/python-course/${saved.slug}/`);
      setLabel(`Continue: ${saved.title}`);
      setSub("Your place is saved on this device.");
      return;
    }
    if (progress.completed.length > 0) {
      const next = PYTHON_LESSONS.find((lesson) => !progress.completed.includes(lesson.slug));
      if (next) {
        setHref(`/python-course/${next.slug}/`);
        setLabel(`Next: ${next.title}`);
        setSub(`${progress.completed.length} lessons marked done on this device.`);
        return;
      }
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0_#0f172a]">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-1">Easiest next step</p>
        <p className="font-bold text-slate-900 leading-snug">{label}</p>
        <p className="text-sm text-slate-600 mt-1">{sub}</p>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <Link href={href} className="notion-btn notion-btn--ink">
          Open &rarr;
        </Link>
        <Link href="/python-course/challenge/" className="notion-btn notion-btn--accent">
          Today&apos;s challenge
        </Link>
        <Link href="/python-course/certificate/" className="notion-btn notion-btn--ghost">
          Certificate
        </Link>
      </div>
    </div>
  );
}

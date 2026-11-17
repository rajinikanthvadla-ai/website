"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LessonOutline } from "@/lib/python-course/types";
import { getContinueLesson } from "@/lib/python-course/code-storage";
import { readCourseProgress } from "@/lib/python-course/progress";

export default function ContinueLearning({ outline }: { outline: LessonOutline[] }) {
  const [href, setHref] = useState(`/python-course/${outline[0]?.slug || "why-python-for-ai"}/`);
  const [label, setLabel] = useState("Start with Python Intro");
  const [sub, setSub] = useState("No signup and nothing to install. About 12 minutes.");

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
      const next = outline.find((lesson) => !progress.completed.includes(lesson.slug));
      if (next) {
        setHref(`/python-course/${next.slug}/`);
        setLabel(`Next: ${next.title}`);
        setSub(`${progress.completed.length} lessons passed on this device.`);
        return;
      }
    }
  }, []);

  return (
    <div className="rounded-lg border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0_#0f172a]">
      <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-1">Start here</p>
      <p className="font-display text-xl font-bold text-slate-900 leading-snug">{label}</p>
      <p className="text-sm text-slate-700 mt-1 leading-6">{sub}</p>
      <Link
        href={href}
        className="notion-btn notion-btn--ink mt-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        {label.startsWith("Start") ? "Start lesson 1" : "Continue"} &rarr;
      </Link>
      <p className="mt-3 text-sm text-slate-700">
        <Link href="/python-course/certificate/" className="font-bold text-blue-700 hover:underline">
          Certificate
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/python-course/challenge/" className="font-bold text-blue-700 hover:underline">
          Daily practice
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/mentorship/" className="font-bold text-blue-700 hover:underline">
          Mentorship
        </Link>
      </p>
    </div>
  );
}

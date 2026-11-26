"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CourseWeek } from "@/lib/python-course/weeks";
import { getContinueLesson } from "@/lib/python-course/code-storage";
import { readCourseProgress } from "@/lib/python-course/progress";

type Today = { slug: string; title: string; minutes: number; week: CourseWeek; done: number; started: boolean };

function pickToday(weeks: CourseWeek[]): Today {
  const completed = new Set(readCourseProgress().completed);
  const all = weeks.flatMap((week) => week.lessons.map((lesson) => ({ ...lesson, week })));
  const saved = getContinueLesson();
  const lesson =
    all.find((item) => item.slug === saved?.slug && !completed.has(item.slug)) ??
    all.find((item) => !completed.has(item.slug)) ??
    all[all.length - 1];
  return {
    slug: lesson.slug,
    title: lesson.title,
    minutes: lesson.minutes,
    week: lesson.week,
    done: lesson.week.lessons.filter((item) => completed.has(item.slug)).length,
    started: completed.size > 0 || Boolean(saved),
  };
}

/** "Today" card: which week you are in and the one lesson to do now. */
export default function ContinueLearning({ weeks }: { weeks: CourseWeek[] }) {
  const first = weeks[0].lessons[0];
  const [today, setToday] = useState<Today>({ ...first, week: weeks[0], done: 0, started: false });

  useEffect(() => setToday(pickToday(weeks)), [weeks]);

  return (
    <div className="rounded-2xl border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0_#0f172a]">
      <p className="text-[13px] font-semibold text-slate-600">
        Week {today.week.number} · {today.done} of {today.week.lessons.length} done
      </p>
      <p className="mt-1 font-display text-xl md:text-2xl font-bold leading-snug text-slate-900">
        {today.started ? "Today" : "Start here"}: {today.title} · {today.minutes} min
      </p>
      <Link
        href={`/python-course/${today.slug}/`}
        className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        {today.started ? "Continue" : "Start lesson 1"} &rarr;
      </Link>
      <p className="mt-3 text-[13px] text-slate-600">
        No signup. Your place saves on this device.{" "}
        <Link href="/python-course/certificate/" className="font-semibold text-blue-700 hover:underline">
          Certificate
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/python-course/challenge/" className="font-semibold text-blue-700 hover:underline">
          Daily practice
        </Link>
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { CourseWeek } from "@/lib/python-course/weeks";
import { useCourseProgress } from "./useCourseProgress";

function hours(minutes: number) {
  const value = Math.max(1, Math.round(minutes / 60));
  return `about ${value} ${value === 1 ? "hour" : "hours"}`;
}

/** The 6 week cards. Every lesson link is in the page HTML, even inside closed lists. */
export default function WeekGrid({ weeks }: { weeks: CourseWeek[] }) {
  const { completed } = useCourseProgress();

  return (
    <ol className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {weeks.map((week) => {
        const done = week.lessons.filter((lesson) => completed(lesson.slug)).length;
        const finished = done === week.lessons.length;
        return (
          <li key={week.number} id={`week-${week.number}`} className="scroll-mt-24">
            <details className="group rounded-xl border-2 border-slate-900 bg-white">
              <summary className="cursor-pointer list-none p-4">
                <p className="flex items-center justify-between text-[13px] font-semibold text-slate-600">
                  <span>Week {week.number}</span>
                  <span className={finished ? "text-emerald-700" : ""}>
                    {finished ? "Done ✓" : `${done}/${week.lessons.length}`}
                  </span>
                </p>
                <p className="mt-0.5 font-display text-lg font-bold text-slate-900">{week.title}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800">{week.project}</span>
                  <span className="text-slate-500">
                    {week.lessons.length} lessons · {hours(week.minutes)}
                  </span>
                </p>
                <p className="mt-2 text-[13px] font-semibold text-blue-700">
                  <span className="group-open:hidden">Show lessons</span>
                  <span className="hidden group-open:inline">Hide lessons</span>
                </p>
              </summary>
              <ol className="border-t border-slate-200 py-1">
                {week.lessons.map((lesson, index) => {
                  const isDone = completed(lesson.slug);
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/python-course/${lesson.slug}/`}
                        className="flex items-center gap-2.5 px-4 py-2 text-[14px] text-slate-800 hover:bg-[#fef9c3]"
                      >
                        <span
                          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            isDone ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isDone ? "✓" : index + 1}
                        </span>
                        <span className="min-w-0 flex-1 leading-snug">
                          {lesson.kind === "project" && (
                            <span className="mr-1.5 align-middle text-[9px] font-bold uppercase tracking-wide bg-orange-600 text-white px-1.5 py-0.5 rounded">
                              Project
                            </span>
                          )}
                          {lesson.title.replace(/^Project: /, "")}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </details>
          </li>
        );
      })}
    </ol>
  );
}

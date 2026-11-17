"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PythonModule, PythonModuleId } from "@/lib/python-course/types";
import { useCourseProgress } from "./useCourseProgress";

export type CatalogLesson = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  moduleId: PythonModuleId;
  kind?: "lesson" | "project";
};

type Props = {
  modules: PythonModule[];
  lessons: CatalogLesson[];
};

export default function Curriculum({ modules, lessons }: Props) {
  const { completed, completedCount } = useCourseProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-700">
        {ready
          ? `${completedCount} lesson${completedCount === 1 ? "" : "s"} saved on this device.`
          : "Progress is saved in this browser."}
      </p>
      {modules.map((mod) => {
        const items = lessons.filter((lesson) => lesson.moduleId === mod.id);
        const minutes = items.reduce((sum, lesson) => sum + lesson.minutes, 0);
        const done = ready ? items.filter((lesson) => completed(lesson.slug)).length : 0;
        return (
          <details
            key={mod.id}
            id={`module-${mod.id}`}
            {...(mod.id === "foundations" ? { open: true } : {})}
            className="border-2 border-slate-900 rounded-lg bg-white overflow-hidden"
          >
            <summary className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-50 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700">
              <span>
                <span className="block font-display text-xl font-bold text-slate-900">{mod.title}</span>
                <span className="block text-sm text-slate-700 mt-1">{mod.tagline}</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wide bg-slate-900 text-white px-2.5 py-1 rounded">
                {ready ? `${done}/` : ""}
                {items.length} lessons · {minutes} min
              </span>
            </summary>
            <ol className="divide-y divide-slate-200 border-t-2 border-slate-900">
              {items.map((lesson, index) => {
                const isDone = ready && completed(lesson.slug);
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/python-course/${lesson.slug}/`}
                      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-4 hover:bg-[#fef9c3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700"
                    >
                      <span className="font-mono text-xs text-slate-500 w-8 shrink-0" aria-hidden="true">
                        {isDone ? "ok" : String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-slate-900">
                          {lesson.kind === "project" && (
                            <span className="mr-2 align-middle text-[10px] font-bold uppercase tracking-wide bg-orange-600 text-white px-1.5 py-0.5 rounded">
                              Project
                            </span>
                          )}
                          {isDone && <span className="sr-only">Completed. </span>}
                          {lesson.title.replace(/^Project: /, "")}
                        </span>
                        <span className="block text-sm text-slate-700 mt-0.5">{lesson.summary}</span>
                      </span>
                      <span className="text-xs font-bold text-slate-600 shrink-0">{lesson.minutes} min</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </details>
        );
      })}
    </div>
  );
}

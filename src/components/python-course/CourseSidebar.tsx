"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PythonLesson, PythonModule } from "@/lib/python-course/types";
import { lessonsInModule, TOTAL_LESSONS } from "@/lib/python-course";
import { useCourseProgress } from "./useCourseProgress";

type Props = {
  modules: PythonModule[];
  lessons: PythonLesson[];
  currentSlug?: string;
};

export default function CourseSidebar({ modules, lessons, currentSlug }: Props) {
  const [lessonListOpen, setLessonListOpen] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const { completed, completedCount } = useCourseProgress(currentSlug);

  const activeModuleId = useMemo(
    () => lessons.find((lesson) => lesson.slug === currentSlug)?.moduleId,
    [currentSlug, lessons],
  );

  useEffect(() => {
    setLessonListOpen(false);
  }, [currentSlug]);

  useEffect(() => {
    if (!activeModuleId) return;
    setOpenModules((current) => ({
      ...current,
      [activeModuleId]: true,
    }));
  }, [activeModuleId]);

  const nav = (
    <nav aria-label="Python course lessons" className="space-y-3">
      {modules.map((mod) => {
        const items = lessonsInModule(lessons, mod.id);
        const expanded = openModules[mod.id] ?? mod.id === activeModuleId;
        const panelId = `python-module-${mod.id}`;
        const doneInModule = items.filter((item) => completed(item.slug)).length;

        return (
          <div key={mod.id} className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenModules((current) => ({ ...current, [mod.id]: !expanded }))}
              className={`w-full px-3 py-3 text-left ${
                mod.id === activeModuleId ? "bg-blue-50" : "bg-white hover:bg-slate-50"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-blue-700">
                    {mod.title}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {doneInModule}/{items.length} done
                  </span>
                </span>
                <span className="text-sm font-bold text-slate-400" aria-hidden="true">
                  {expanded ? "-" : "+"}
                </span>
              </span>
            </button>

            {expanded && (
              <ul id={panelId} className="space-y-1 p-2 border-t border-slate-100 bg-slate-50/60">
                {items.map((lesson, index) => {
                  const active = lesson.slug === currentSlug;
                  const done = completed(lesson.slug);
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/python-course/${lesson.slug}/`}
                        className={`flex items-start gap-2 text-sm px-2.5 py-2 rounded-xl border ${
                          active
                            ? "bg-blue-700 border-blue-700 font-bold text-white"
                            : "border-transparent text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            done
                              ? active
                                ? "bg-emerald-300 text-emerald-950"
                                : "bg-emerald-500 text-white"
                              : active
                                ? "bg-blue-500 text-white"
                                : "bg-slate-200 text-slate-500"
                          }`}
                          aria-hidden="true"
                        >
                          {done ? "✓" : index + 1}
                        </span>
                        <span className="min-w-0 leading-snug">{lesson.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setLessonListOpen((v) => !v)}
          className="w-full text-left px-4 py-3 rounded-2xl border border-slate-100 bg-white font-bold text-sm shadow-sm"
        >
          {lessonListOpen ? "Hide lessons" : `Show lessons · ${completedCount}/${TOTAL_LESSONS} done`}
        </button>
        {lessonListOpen && <div className="mt-3 p-2 rounded-[24px] border border-slate-100 bg-white shadow-sm">{nav}</div>}
      </div>
      <aside className="hidden lg:block lg:sticky lg:top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
        <div className="rounded-[24px] border border-slate-100 bg-white/90 shadow-sm p-3 mb-3">
          <Link
            href="/python-course/"
            className="inline-block text-[11px] font-bold uppercase tracking-wide text-blue-700 hover:underline"
          >
            Course home
          </Link>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            {completedCount}/{TOTAL_LESSONS} lessons done
          </p>
          <Link
            href="/python-course/certificate/"
            className="mt-2 inline-block text-[11px] font-bold uppercase tracking-wide text-emerald-700 hover:underline"
          >
            Certificate
          </Link>
        </div>
        {nav}
      </aside>
    </>
  );
}

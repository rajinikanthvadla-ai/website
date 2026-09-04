"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PythonLesson, PythonModule } from "@/lib/python-course/types";
import { lessonsInModule } from "@/lib/python-course";

type Props = {
  modules: PythonModule[];
  lessons: PythonLesson[];
  currentSlug?: string;
};

export default function CourseSidebar({ modules, lessons, currentSlug }: Props) {
  const [lessonListOpen, setLessonListOpen] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

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

        return (
          <div key={mod.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenModules((current) => ({ ...current, [mod.id]: !expanded }))}
              className={`w-full px-3 py-2.5 text-left ${
                mod.id === activeModuleId ? "bg-[#fef9c3]" : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-blue-700">
                    {mod.title}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">{items.length} lessons</span>
                </span>
                <span className="text-sm font-bold text-slate-500" aria-hidden="true">
                  {expanded ? "-" : "+"}
                </span>
              </span>
            </button>

            {expanded && (
              <ul id={panelId} className="space-y-1 p-2 border-t border-slate-200">
                {items.map((lesson, index) => {
                  const active = lesson.slug === currentSlug;
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/python-course/${lesson.slug}/`}
                        className={`block text-sm px-2.5 py-2 rounded-lg border ${
                          active
                            ? "bg-slate-900 border-slate-900 font-bold text-white"
                            : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className={active ? "text-slate-300 mr-1.5" : "text-slate-400 mr-1.5"}>
                          {index + 1}.
                        </span>
                        {lesson.title}
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
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setLessonListOpen((v) => !v)}
          className="w-full text-left px-4 py-3 border-2 border-slate-900 rounded-lg font-bold text-sm bg-white"
        >
          {lessonListOpen ? "Hide lesson list" : "Show lessons"}
        </button>
        {lessonListOpen && <div className="mt-3 p-3 border border-slate-200 rounded-xl bg-white shadow-sm">{nav}</div>}
      </div>
      <aside className="hidden lg:block lg:sticky lg:top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
        <Link
          href="/python-course/"
          className="inline-block text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-4 hover:underline"
        >
          Course home
        </Link>
        {nav}
      </aside>
    </>
  );
}

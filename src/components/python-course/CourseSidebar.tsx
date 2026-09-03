"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PythonLesson, PythonModule } from "@/lib/python-course/types";
import { lessonsInModule } from "@/lib/python-course";

type Props = {
  modules: PythonModule[];
  lessons: PythonLesson[];
  currentSlug?: string;
};

export default function CourseSidebar({ modules, lessons, currentSlug }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [currentSlug]);

  const nav = (
    <nav aria-label="Python course lessons" className="space-y-5">
      {modules.map((mod) => {
        const items = lessonsInModule(lessons, mod.id);
        return (
          <div key={mod.id}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-2">
              {mod.title}
            </p>
            <ul className="space-y-1">
              {items.map((lesson, index) => {
                const active = lesson.slug === currentSlug;
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/python-course/${lesson.slug}/`}
                      className={`block text-sm px-2.5 py-1.5 rounded border ${
                        active
                          ? "bg-[#fef9c3] border-slate-900 font-bold text-slate-900"
                          : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-slate-400 mr-1.5">{index + 1}.</span>
                      {lesson.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
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
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left px-4 py-3 border-2 border-slate-900 rounded-lg font-bold text-sm bg-white"
        >
          {open ? "Hide lesson list" : "Show all lessons"}
        </button>
        {open && <div className="mt-3 p-4 border-2 border-slate-900 rounded-lg bg-white">{nav}</div>}
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

"use client";

import { useState } from "react";
import Link from "next/link";
import type { PythonLesson, PythonModule } from "@/lib/python-course/types";
import { getAdjacentLessons, PYTHON_LESSONS } from "@/lib/python-course";
import CourseSidebar from "./CourseSidebar";
import CodeExample from "./CodeExample";
import PythonCompiler from "./PythonCompiler";
import LessonMarkdown from "./LessonMarkdown";

const LEVEL_LABEL: Record<PythonLesson["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

type Props = {
  lesson: PythonLesson;
  modules: PythonModule[];
};

export default function LessonView({ lesson, modules }: Props) {
  const [compilerCode, setCompilerCode] = useState(lesson.tryIt.starter);
  const { prev, next } = getAdjacentLessons(lesson.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <CourseSidebar modules={modules} lessons={PYTHON_LESSONS} currentSlug={lesson.slug} />

        <article>
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
              Python course
            </Link>
            <span className="text-slate-400 mx-2">/</span>
            <span className="text-slate-600">{lesson.title}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wide bg-blue-700 text-white px-2 py-0.5 rounded">
              {LEVEL_LABEL[lesson.level]}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              {lesson.minutes} min
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">{lesson.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">{lesson.summary}</p>

          <div className="border-l-4 border-l-orange-500 bg-[#fff7ed] border border-slate-200 rounded-r-lg p-4 mb-10">
            <p className="text-[11px] font-bold uppercase tracking-wide text-orange-600 mb-1">Why this matters in AI / ML / GenAI</p>
            <p className="text-sm text-slate-700 leading-relaxed">{lesson.whyForAi}</p>
          </div>

          {lesson.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">{section.heading}</h2>
              <LessonMarkdown content={section.body} />
            </section>
          ))}

          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Copy-paste examples</h2>
            <p className="text-sm text-slate-600 mb-4">
              Copy into your own editor, or load one into the compiler below and press Run.
            </p>
            {lesson.examples.map((example) => (
              <CodeExample
                key={example.title}
                title={example.title}
                note={example.note}
                code={example.code}
                onTry={(code) => {
                  setCompilerCode(code);
                  document.getElementById("python-compiler")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            ))}
          </section>

          <section id="python-compiler" className="mb-10 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">{lesson.tryIt.title}</h2>
            <PythonCompiler
              starter={compilerCode}
              packages={lesson.packages}
              hint={lesson.tryIt.hint}
            />
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Takeaways</h2>
            <ul className="space-y-2">
              {lesson.takeaways.map((item) => (
                <li key={item} className="text-sm text-slate-700 leading-relaxed border border-slate-200 rounded-lg px-4 py-3 bg-slate-50">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <nav className="flex flex-col sm:flex-row gap-3 justify-between border-t-2 border-slate-900 pt-6">
            {prev ? (
              <Link
                href={`/python-course/${prev.slug}/`}
                className="flex-1 border-2 border-slate-900 rounded-lg p-4 hover:bg-slate-50"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">Previous</p>
                <p className="font-bold text-slate-900">{prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/python-course/${next.slug}/`}
                className="flex-1 border-2 border-slate-900 rounded-lg p-4 hover:bg-[#fef9c3] text-right"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">Next</p>
                <p className="font-bold text-slate-900">{next.title}</p>
              </Link>
            ) : (
              <Link
                href="/python-course/playground/"
                className="flex-1 border-2 border-orange-500 rounded-lg p-4 bg-orange-500 text-white text-right"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-orange-100 mb-1">Finished</p>
                <p className="font-bold">Open the playground</p>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}

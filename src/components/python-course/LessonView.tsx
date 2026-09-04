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

        <article className="min-w-0">
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

          <div className="grid gap-3 sm:grid-cols-3 mb-10">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-1">1. Read</p>
              <p className="text-sm text-slate-600 leading-relaxed">Understand the idea in plain English first.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-1">2. Run</p>
              <p className="text-sm text-slate-600 leading-relaxed">Load any example into the compiler and press Run.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-1">3. Change</p>
              <p className="text-sm text-slate-600 leading-relaxed">Edit one value, rerun, and learn from the output.</p>
            </div>
          </div>

          {lesson.sections.map((section) => (
            <section key={section.heading} className="mb-10 max-w-3xl">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">{section.heading}</h2>
              <LessonMarkdown content={section.body} />
            </section>
          ))}

          <section id="practice-workspace" className="mb-12 scroll-mt-24">
            <div className="mb-5 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-2">Hands-on practice</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Compiler on the left. Examples on the right.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                On desktop, keep the compiler beside the examples. On mobile, the same blocks stack cleanly. Pick an
                example, try it in the compiler, then change one small thing.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.05fr)] xl:items-start">
              <div id="python-compiler" className="scroll-mt-24 xl:sticky xl:top-24">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{lesson.tryIt.title}</h3>
                <PythonCompiler
                  starter={compilerCode}
                  packages={lesson.packages}
                  hint={lesson.tryIt.hint}
                  tall
                />
              </div>

              <div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 mb-4">
                  <h3 className="font-display text-xl font-bold text-slate-900">Clear code examples</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Every example is copy-ready. Use <span className="font-semibold text-slate-900">Try in compiler</span>{" "}
                    when you want to experiment without scrolling around.
                  </p>
                </div>
                {lesson.examples.map((example) => (
                  <CodeExample
                    key={example.title}
                    title={example.title}
                    note={example.note}
                    code={example.code}
                    onTry={(code) => {
                      setCompilerCode(code);
                      document
                        .getElementById("python-compiler")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12 max-w-3xl">
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

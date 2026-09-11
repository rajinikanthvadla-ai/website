"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { PythonLesson, PythonModule } from "@/lib/python-course/types";
import { getAdjacentLessons, PYTHON_LESSONS, TOTAL_LESSONS } from "@/lib/python-course";
import {
  clearLessonCode,
  loadLessonCode,
  saveLessonCode,
  setContinueLesson,
} from "@/lib/python-course/code-storage";
import CourseSidebar from "./CourseSidebar";
import CodeExample from "./CodeExample";
import BasicCodeBlock from "./BasicCodeBlock";
import PythonCompiler, { type PythonCompilerHandle } from "./PythonCompiler";
import LessonMarkdown from "./LessonMarkdown";
import { useCourseProgress } from "./useCourseProgress";

const LEVEL_LABEL: Record<PythonLesson["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function plain(text: string): string {
  return text.replace(/\u2014/g, " - ").replace(/\u2013/g, " - ");
}

/** Only keep a snippet if brackets/parens/braces are balanced (avoids mid-list cuts). */
function isBalancedPython(code: string): boolean {
  let paren = 0;
  let bracket = 0;
  let brace = 0;
  let quote: '"' | "'" | null = null;
  let triple: '"""' | "'''" | null = null;
  let escaped = false;

  for (let i = 0; i < code.length; i += 1) {
    const ch = code[i];
    const next2 = code.slice(i, i + 3);

    if (triple) {
      if (next2 === triple) {
        i += 2;
        triple = null;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (next2 === '"""' || next2 === "'''") {
      triple = next2 as '"""' | "'''";
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }

    if (ch === "(") paren += 1;
    else if (ch === ")") paren -= 1;
    else if (ch === "[") bracket += 1;
    else if (ch === "]") bracket -= 1;
    else if (ch === "{") brace += 1;
    else if (ch === "}") brace -= 1;

    if (paren < 0 || bracket < 0 || brace < 0) return false;
  }

  return paren === 0 && bracket === 0 && brace === 0 && quote === null && triple === null;
}

/**
 * Build a tiny runnable starter. Never returns a mid-statement cut
 * (that was causing SyntaxError: '[' was never closed).
 */
function tinyStarter(code: string, maxLines = 6): string | undefined {
  const lines = code
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .filter((line, index, all) => !(line.trim() === "" && (index === 0 || index === all.length - 1)));

  const nonEmpty = lines.filter((line) => line.trim().length > 0);
  if (nonEmpty.length === 0) return undefined;

  // Prefer a short complete program.
  if (nonEmpty.length <= maxLines && isBalancedPython(code.trim())) {
    return code.trim();
  }

  // Grow line-by-line until brackets balance, then stop at a sensible size.
  const taken: string[] = [];
  for (const line of lines) {
    taken.push(line);
    const candidate = taken.join("\n").trim();
    const nonEmptyTaken = taken.filter((item) => item.trim().length > 0).length;
    if (nonEmptyTaken === 0) continue;
    if (!isBalancedPython(candidate)) continue;
    if (nonEmptyTaken >= 2 && nonEmptyTaken <= maxLines) return candidate;
    if (nonEmptyTaken > maxLines) break;
  }

  return undefined;
}

type Props = {
  lesson: PythonLesson;
  modules: PythonModule[];
};

export default function LessonView({ lesson, modules }: Props) {
  const [compilerCode, setCompilerCode] = useState(lesson.tryIt.starter);
  const [restored, setRestored] = useState(false);
  const compilerRef = useRef<PythonCompilerHandle>(null);
  const saveTimerRef = useRef<number | null>(null);
  const { prev, next } = getAdjacentLessons(lesson.slug);
  const lessonNumber = PYTHON_LESSONS.findIndex((item) => item.slug === lesson.slug) + 1;
  const { completed, completedCount, markDone, markUndone } = useCourseProgress(lesson.slug);
  const isDone = completed(lesson.slug);

  useEffect(() => {
    setContinueLesson(lesson.slug, lesson.title);
    const saved = loadLessonCode(lesson.slug);
    if (saved) {
      setCompilerCode(saved);
      setRestored(true);
    } else {
      setCompilerCode(lesson.tryIt.starter);
      setRestored(false);
    }
  }, [lesson.slug, lesson.title, lesson.tryIt.starter]);

  function persistCode(code: string) {
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      saveLessonCode(lesson.slug, code);
    }, 400);
  }

  function loadIntoLab(code: string) {
    setCompilerCode(code);
    saveLessonCode(lesson.slug, code);
    setRestored(false);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      document.getElementById("python-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function openConsole() {
    document.getElementById("python-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function runFromBar() {
    openConsole();
    window.setTimeout(() => compilerRef.current?.run(), 180);
  }

  function resetSavedLab() {
    clearLessonCode(lesson.slug);
    setCompilerCode(lesson.tryIt.starter);
    setRestored(false);
  }

  return (
    <div className="bg-[#f3f6fb] min-h-screen pb-20 lg:pb-0">
      <div className="max-w-[1360px] mx-auto px-3 sm:px-4 lg:px-5 py-5 md:py-7">
        <div className="xl:grid xl:grid-cols-[190px_minmax(0,1fr)] xl:gap-5">
          <CourseSidebar modules={modules} lessons={PYTHON_LESSONS} currentSlug={lesson.slug} />

          <div className="min-w-0">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:gap-6 lg:items-start">
              <div className="min-w-0 space-y-5 order-2 lg:order-1">
                <header className="mb-5 px-0.5">
                  <nav className="text-[13px] mb-2" aria-label="Breadcrumb">
                    <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
                      Python course
                    </Link>
                    <span className="text-slate-300 mx-2">/</span>
                    <span className="text-slate-500">Lesson {lessonNumber || "?"}</span>
                  </nav>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      {LEVEL_LABEL[lesson.level]}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {lesson.minutes} min
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {completedCount}/{TOTAL_LESSONS} done
                    </span>
                  </div>
                  <h1 className="font-display text-[1.65rem] md:text-[1.9rem] font-bold text-slate-900 leading-snug mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-[15px] text-slate-600 leading-7">{plain(lesson.summary)}</p>
                  <p className="mt-2 text-[14px] text-slate-700 leading-6">
                    <span className="font-semibold text-slate-900">Why it matters: </span>
                    {plain(lesson.whyForAi)}
                  </p>
                </header>

                {lesson.sections.map((section, index) => {
                  const fallbackExample = lesson.examples[index % Math.max(lesson.examples.length, 1)];
                  const basicCode =
                    section.basicCode ||
                    (fallbackExample ? tinyStarter(fallbackExample.code) : undefined) ||
                    (index === 0 ? tinyStarter(lesson.tryIt.starter, 8) : undefined);

                  return (
                    <section key={section.heading} className="pb-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-1">
                        Basics
                      </p>
                      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                        {section.heading}
                      </h2>
                      <div className="text-[15px] leading-7">
                        <LessonMarkdown content={section.body} />
                      </div>
                      {basicCode && (
                        <BasicCodeBlock
                          code={basicCode}
                          tip={section.basicTip || "Small basic code for this idea."}
                          onTry={loadIntoLab}
                        />
                      )}
                    </section>
                  );
                })}

                <section className="space-y-3 pt-2 border-t border-slate-200">
                  <div className="pt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">
                      Then AI / ML
                    </p>
                    <h2 className="font-display text-xl font-bold text-slate-900 mb-1">
                      AI / ML examples
                    </h2>
                    <p className="text-[14px] text-slate-600 leading-6">
                      Same idea, used in real AI work. Press{" "}
                      <span className="font-semibold text-slate-900">Try in lab</span> to run it.
                    </p>
                  </div>
                  {lesson.examples.map((example, index) => (
                    <CodeExample
                      key={example.title}
                      index={index + 1}
                      featured={index === 0}
                      title={example.title}
                      note={example.note}
                      code={example.code}
                      why={example.why}
                      aiMl={example.aiMl}
                      analogy={example.analogy}
                      onTry={loadIntoLab}
                    />
                  ))}
                </section>

                <section className="pt-2 border-t border-slate-200">
                  <h2 className="font-display text-xl font-bold text-slate-900 mb-3 pt-4">Takeaways</h2>
                  <ul className="space-y-2">
                    {lesson.takeaways.map((item, index) => (
                      <li key={item} className="flex gap-2.5 text-[15px] text-slate-700 leading-7">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span>{plain(item)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => (isDone ? markUndone(lesson.slug) : markDone(lesson.slug))}
                      className={`text-sm font-bold px-4 py-2.5 rounded-lg border ${
                        isDone
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {isDone ? "Marked done - undo" : "Mark lesson done"}
                    </button>
                    <Link
                      href="/python-course/certificate/"
                      className="text-sm font-bold px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"
                    >
                      Certificate
                    </Link>
                  </div>
                </section>

                <nav className="grid gap-2.5 sm:grid-cols-2 pb-2 pt-1">
                  {prev ? (
                    <Link
                      href={`/python-course/${prev.slug}/`}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 hover:bg-slate-50"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Previous
                      </p>
                      <p className="font-bold text-[15px] text-slate-900">{prev.title}</p>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link
                      href={`/python-course/${next.slug}/`}
                      onClick={() => markDone(lesson.slug)}
                      className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5 hover:bg-blue-100 sm:text-right"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">
                        Next lesson
                      </p>
                      <p className="font-bold text-[15px] text-slate-900">{next.title}</p>
                    </Link>
                  ) : (
                    <Link
                      href="/python-course/certificate/"
                      onClick={() => markDone(lesson.slug)}
                      className="rounded-xl border border-emerald-200 bg-emerald-600 px-4 py-3.5 text-white hover:bg-emerald-700 sm:text-right"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-100 mb-1">
                        Course complete
                      </p>
                      <p className="font-bold text-[15px]">Get your certificate</p>
                    </Link>
                  )}
                </nav>
              </div>

              <aside id="python-lab" className="order-1 lg:order-2 mb-4 lg:mb-0 lg:sticky lg:top-20 self-start">
                <p className="mb-2 px-0.5 text-[13px] leading-5 text-slate-600">
                  <span className="font-semibold text-slate-900">Try this: </span>
                  {plain(lesson.tryIt.hint)}
                </p>
                {restored && (
                  <div className="mb-2 flex items-center justify-between gap-2 px-0.5">
                    <p className="text-[12px] text-slate-500">Your last code on this device was restored.</p>
                    <button
                      type="button"
                      onClick={resetSavedLab}
                      className="text-[11px] font-bold uppercase tracking-wide text-blue-700 hover:underline"
                    >
                      Use lesson starter
                    </button>
                  </div>
                )}
                <PythonCompiler
                  ref={compilerRef}
                  starter={compilerCode}
                  packages={lesson.packages}
                  title={lesson.tryIt.title}
                  tall
                  onCodeChange={persistCode}
                />
              </aside>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-zinc-800 bg-[#0a0a0a]/safe-area-pb">
        <div className="max-w-[1360px] mx-auto px-3 py-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={openConsole}
            className="flex-1 text-xs font-bold uppercase tracking-wide px-3 py-2.5 rounded-md border border-zinc-600 bg-zinc-900 text-zinc-100"
          >
            Open console
          </button>
          <button
            type="button"
            onClick={runFromBar}
            className="flex-1 text-xs font-bold uppercase tracking-wide px-3 py-2.5 rounded-md bg-[#27c93f] text-black"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
}

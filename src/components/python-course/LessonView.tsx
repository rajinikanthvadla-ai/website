"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LessonOutline, PythonLesson, PythonModule } from "@/lib/python-course/types";
import type { LessonQuiz } from "@/lib/python-course/quiz-shared";
import type { MemoryHook, FlashCard } from "@/lib/python-course/memory";
import type { Scene } from "@/lib/python-course/scenes";
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
import ExerciseCard from "./ExerciseCard";
import LaptopRun from "./LaptopRun";
import { useCourseProgress } from "./useCourseProgress";
import LessonSketch from "./LessonSketch";
import CheckpointQuiz from "./CheckpointQuiz";
import LazyConceptPlayer from "./LazyConceptPlayer";
import { MODULE_SHORT_LABEL } from "@/lib/python-course/labels";

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
  outline: LessonOutline[];
  prev: LessonOutline | null;
  next: LessonOutline | null;
  quiz?: LessonQuiz;
  memory?: MemoryHook;
  scene: Scene;
  moduleRecap?: FlashCard[];
};

export default function LessonView({ lesson, modules, outline, prev, next, quiz, memory, scene, moduleRecap }: Props) {
  const [compilerCode, setCompilerCode] = useState(lesson.tryIt.starter);
  const [restored, setRestored] = useState(false);
  const compilerRef = useRef<PythonCompilerHandle>(null);
  const saveTimerRef = useRef<number | null>(null);
  const totalLessons = outline.length;
  const lessonNumber = outline.findIndex((item) => item.slug === lesson.slug) + 1;
  const moduleLessons = outline.filter((item) => item.moduleId === lesson.moduleId);
  const moduleStep = moduleLessons.findIndex((item) => item.slug === lesson.slug) + 1;
  const moduleLabel = MODULE_SHORT_LABEL[lesson.moduleId];
  const { completed, completedCount, markDone, markUndone } = useCourseProgress(lesson.slug);
  const progressPct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const isDone = completed(lesson.slug);
  const isProject = lesson.kind === "project";
  const hasExercise = Boolean(lesson.exercise);

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
          <CourseSidebar modules={modules} lessons={outline} currentSlug={lesson.slug} />

          <div className="min-w-0">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:gap-6 lg:items-start">
              <div className="min-w-0 space-y-5 order-2 lg:order-1">
                <header className="mb-5 px-0.5">
                  <nav className="text-[13px] mb-2" aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <li>
                        <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
                          Python course
                        </Link>
                      </li>
                      <li aria-hidden="true" className="text-slate-300">/</li>
                      <li>
                        <Link
                          href={`/python-course/#module-${lesson.moduleId}`}
                          className="text-blue-700 font-semibold hover:underline"
                        >
                          {moduleLabel}
                        </Link>
                      </li>
                      <li aria-hidden="true" className="text-slate-300">/</li>
                      <li aria-current="page" className="text-slate-700">
                        {lesson.title}
                      </li>
                    </ol>
                  </nav>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {isProject && (
                      <span className="text-[11px] font-bold uppercase tracking-wide bg-orange-600 text-white px-2 py-0.5 rounded">
                        Project
                      </span>
                    )}
                    <span className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      {LEVEL_LABEL[lesson.level]}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                      {lesson.minutes} min
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                      Lesson {lessonNumber || "?"}
                    </span>
                  </div>
                  <h1 className="font-display text-[1.65rem] md:text-[1.9rem] font-bold text-slate-900 leading-snug mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-[15px] text-slate-700 leading-7">{plain(lesson.summary)}</p>
                  <p className="mt-2 text-[14px] text-slate-800 leading-6">
                    <span className="font-semibold text-slate-900">Why it matters for AI and ML: </span>
                    {plain(lesson.whyForAi)}
                  </p>
                  {memory ? (
                    <p className="mt-2 text-[15px] text-slate-800 leading-6">
                      <span className="font-semibold text-slate-900">Picture it: </span>
                      {memory.analogy}
                    </p>
                  ) : null}
                  <div className="mt-3">
                    <div
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={totalLessons}
                      aria-valuenow={completedCount}
                      aria-label="Lessons saved on this device"
                      className="h-2 rounded-full bg-slate-200 overflow-hidden"
                    >
                      <div className="h-full bg-blue-700" style={{ width: `${progressPct}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-slate-700">
                      Step {moduleStep || "?"} of {moduleLessons.length} in {moduleLabel}
                      {completedCount > 0
                        ? ` · ${completedCount} of ${totalLessons} saved on this device`
                        : " · progress saves on this device"}
                    </p>
                  </div>
                </header>

                <LessonSketch slug={lesson.slug} />

                {lesson.sections.map((section, index) => {
                  const fallbackExample = lesson.examples[index % Math.max(lesson.examples.length, 1)];
                  const basicCode =
                    section.basicCode ||
                    (isProject
                      ? undefined
                      : (fallbackExample ? tinyStarter(fallbackExample.code) : undefined) ||
                        (index === 0 ? tinyStarter(lesson.tryIt.starter, 8) : undefined));

                  return (
                    <section key={section.heading} className="pb-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-1">
                        {isProject ? `Step ${index + 1}` : "Basics"}
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

                <LazyConceptPlayer scene={scene} />

                {quiz ? <CheckpointQuiz quiz={quiz} /> : null}

                {lesson.examples.length > 0 && (
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
                    {memory ? <p className="mt-2 text-[15px] text-slate-800 leading-6">{memory.ai}</p> : null}
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
                )}

                {lesson.exercise && (
                  <ExerciseCard
                    storageKey={`${lesson.slug}#exercise`}
                    exercise={lesson.exercise}
                    packages={lesson.packages}
                    passed={isDone}
                    isProject={isProject}
                    onPass={() => markDone(lesson.slug)}
                    next={next ? { href: `/python-course/${next.slug}/`, title: next.title } : undefined}
                  />
                )}

                {lesson.laptop && <LaptopRun laptop={lesson.laptop} />}

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
                    {isDone ? (
                      <button
                        type="button"
                        onClick={() => markUndone(lesson.slug)}
                        className="text-sm font-bold px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800"
                      >
                        Done - undo
                      </button>
                    ) : hasExercise ? (
                      <a
                        href="#lesson-exercise"
                        className="text-sm font-bold px-4 py-2.5 rounded-lg border-2 border-slate-900 bg-orange-50 text-slate-900 hover:bg-orange-100"
                      >
                        Pass the {isProject ? "project" : "exercise"} to finish
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markDone(lesson.slug)}
                        className="text-sm font-bold px-4 py-2.5 rounded-lg border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-50"
                      >
                        Mark lesson done
                      </button>
                    )}
                  </div>
                </section>

                {memory ? (
                  <aside className="border-2 border-slate-900 rounded-lg bg-[#fffef8] p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]">
                    <p className="text-xs font-bold uppercase tracking-wide text-orange-700">Remember this</p>
                    <p className="font-display text-2xl font-bold text-slate-900 mt-1 leading-snug">{memory.remember}</p>
                    <p className="mt-2 text-[15px] text-slate-800 leading-6">
                      <span className="font-semibold text-slate-900">In AI and ML: </span>
                      {memory.ai}
                    </p>
                  </aside>
                ) : null}

                {moduleRecap && moduleRecap.length > 0 ? (
                  <section aria-labelledby={`recap-${lesson.moduleId}`}>
                    <h2 id={`recap-${lesson.moduleId}`} className="font-display text-xl font-bold text-slate-900">
                      Quick recap
                    </h2>
                    <p className="mt-1 text-sm text-slate-700 leading-6">
                      Four cards for this module. Open one when you want the one-line answer.
                    </p>
                    <div className="mt-3 space-y-2">
                      {moduleRecap.map((card) => (
                        <details key={card.prompt} className="border-2 border-slate-900 rounded-lg bg-white px-3 py-2">
                          <summary className="cursor-pointer font-semibold text-slate-900">{card.prompt}</summary>
                          <p className="mt-2 text-[15px] text-slate-700 leading-6">{card.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                {next ? (
                  <section className="border-2 border-slate-900 rounded-lg bg-blue-700 text-white p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Next lesson</p>
                    <h2 className="font-display text-2xl font-bold mt-1">{next.title}</h2>
                    <p className="text-sm text-blue-50 mt-1 leading-6">
                      About {next.minutes} minutes. Your place stays on this device.
                    </p>
                    <Link
                      href={`/python-course/${next.slug}/`}
                      onClick={() => {
                        if (!hasExercise) markDone(lesson.slug);
                      }}
                      className="mt-3 inline-flex bg-white text-slate-900 font-bold px-4 py-2.5 rounded-lg hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Continue to {next.title}
                    </Link>
                  </section>
                ) : (
                  <section className="border-2 border-slate-900 rounded-lg bg-emerald-700 text-white p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-100">You reached the end</p>
                    <h2 className="font-display text-2xl font-bold mt-1">Get your certificate</h2>
                    <p className="text-sm text-emerald-50 mt-1 leading-6">
                      Enter your name on the certificate page. The download unlocks when the lessons are passed on this device.
                    </p>
                    <Link
                      href="/python-course/certificate/"
                      onClick={() => {
                        if (!hasExercise) markDone(lesson.slug);
                      }}
                      className="mt-3 inline-flex bg-white text-slate-900 font-bold px-4 py-2.5 rounded-lg hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Open the certificate page
                    </Link>
                  </section>
                )}

                <nav className="flex flex-wrap items-center justify-between gap-3 pb-2 pt-1" aria-label="Lesson">
                  {prev ? (
                    <Link
                      href={`/python-course/${prev.slug}/`}
                      className="text-sm font-bold text-blue-700 hover:underline"
                    >
                      Previous: {prev.title}
                    </Link>
                  ) : (
                    <Link href="/python-course/" className="text-sm font-bold text-blue-700 hover:underline">
                      Course home
                    </Link>
                  )}
                  <p className="text-sm text-slate-700">
                    <Link href="/python-course/certificate/" className="font-bold text-blue-700 hover:underline">
                      Certificate
                    </Link>
                    <span aria-hidden="true"> · </span>
                    <Link href="/mentorship/" className="font-bold text-blue-700 hover:underline">
                      Mentorship
                    </Link>
                    <span aria-hidden="true"> · </span>
                    <Link href="/courses/" className="font-bold text-blue-700 hover:underline">
                      Live courses
                    </Link>
                  </p>
                </nav>
              </div>

              <aside id="python-lab" className="order-1 lg:order-2 mb-4 lg:mb-0 lg:sticky lg:top-20 self-start">
                <p className="mb-2 px-0.5 text-[13px] leading-5 text-slate-700">
                  <span className="font-semibold text-slate-900">Try it yourself. </span>
                  {plain(lesson.tryIt.hint)} Edit the code, then press Run. Python loads on the first Run only.
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

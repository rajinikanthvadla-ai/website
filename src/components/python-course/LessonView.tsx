"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { LessonOutline, PythonLesson } from "@/lib/python-course/types";
import type { LessonQuiz } from "@/lib/python-course/quiz-shared";
import type { MemoryHook, FlashCard } from "@/lib/python-course/memory";
import type { Scene } from "@/lib/python-course/scenes";
import { setContinueLesson } from "@/lib/python-course/code-storage";
import PythonCompiler from "./PythonCompiler";
import LessonMarkdown from "./LessonMarkdown";
import ExerciseCard from "./ExerciseCard";
import LaptopRun from "./LaptopRun";
import { useCourseProgress } from "./useCourseProgress";
import LessonSketch from "./LessonSketch";
import CheckpointQuiz from "./CheckpointQuiz";
import LazyConceptPlayer from "./LazyConceptPlayer";

function plain(text: string): string {
  return text.replace(/—/g, " - ").replace(/–/g, " - ");
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

  if (nonEmpty.length <= maxLines && isBalancedPython(code.trim())) {
    return code.trim();
  }

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

type Step =
  | { kind: "intro"; title: string }
  | { kind: "section"; title: string; index: number; code?: string }
  | { kind: "predict"; title: string; question: number }
  | { kind: "scene"; title: string }
  | { kind: "example"; title: string; index: number }
  | { kind: "check"; title: string; questions: number[] }
  | { kind: "exercise"; title: string }
  | { kind: "laptop"; title: string }
  | { kind: "finish"; title: string };

/** Steps that use the whole width: they bring their own editor or none. */
const WIDE: Step["kind"][] = ["check", "exercise", "laptop", "finish"];

const STEP_KEY = "python-course-step-v1";

function readStep(slug: string): number {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STEP_KEY) || "{}") as Record<string, number>;
    return typeof saved[slug] === "number" ? saved[slug] : 0;
  } catch {
    return 0;
  }
}

function writeStep(slug: string, index: number) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STEP_KEY) || "{}") as Record<string, number>;
    saved[slug] = index;
    window.localStorage.setItem(STEP_KEY, JSON.stringify(saved));
  } catch {
    // storage blocked: the lesson works, it just will not resume at this step
  }
}

type Props = {
  lesson: PythonLesson;
  outline: LessonOutline[];
  prev: LessonOutline | null;
  next: LessonOutline | null;
  week: { number: number; title: string; lessonNumber: number; lessons: LessonOutline[] } | null;
  quiz?: LessonQuiz;
  memory?: MemoryHook;
  scene: Scene;
  moduleRecap?: FlashCard[];
};

/** Step-by-step lesson: one small idea per screen, one editor beside it, Back and Next. */
export default function LessonView({ lesson, outline, prev, next, week, quiz, memory, scene, moduleRecap }: Props) {
  const { completed, markDone } = useCourseProgress(lesson.slug);
  const isDone = completed(lesson.slug);
  const isProject = lesson.kind === "project";
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const steps = useMemo<Step[]>(() => {
    const list: Step[] = [{ kind: "intro", title: "The idea" }];
    lesson.sections.forEach((section, index) => {
      const fallback = lesson.examples[index % Math.max(lesson.examples.length, 1)];
      const code =
        section.basicCode ||
        (isProject
          ? undefined
          : (fallback ? tinyStarter(fallback.code) : undefined) ||
            (index === 0 ? tinyStarter(lesson.tryIt.starter, 8) : undefined));
      list.push({ kind: "section", title: section.heading, index, code });
    });
    const predict = quiz ? Math.max(0, quiz.questions.findIndex((question) => question.kind === "predict")) : -1;
    if (quiz) {
      const kind = quiz.questions[predict]?.kind;
      list.push({ kind: "predict", title: kind === "predict" ? "Predict first" : "Quick question", question: predict });
    }
    list.push({ kind: "scene", title: "Watch it happen" });
    lesson.examples.forEach((example, index) =>
      list.push({ kind: "example", title: example.title.replace(/^AI \/ ML:\s*/i, "Real AI code: "), index }),
    );
    if (quiz && quiz.questions.length > 1) {
      list.push({
        kind: "check",
        title: "Quick check",
        questions: quiz.questions.map((_, index) => index).filter((index) => index !== predict),
      });
    }
    if (lesson.exercise) list.push({ kind: "exercise", title: isProject ? "Build the project" : "Your turn" });
    if (lesson.laptop) list.push({ kind: "laptop", title: "On your laptop" });
    list.push({ kind: "finish", title: "Lesson recap" });
    return list;
  }, [lesson, quiz, isProject]);

  useEffect(() => {
    setContinueLesson(lesson.slug, lesson.title);
    const saved = readStep(lesson.slug);
    setCurrent(saved > 0 && saved < steps.length ? saved : 0);
  }, [lesson.slug, lesson.title, steps.length]);

  const step = steps[current];
  const wide = WIDE.includes(step.kind);
  const minutesLeft = Math.max(1, Math.round((lesson.minutes * (steps.length - current)) / steps.length));
  const predictQuestion = step.kind === "predict" && quiz ? quiz.questions[step.question] : undefined;

  // What the one editor shows on this step. null = nothing to run here.
  let editorCode: string | null = null;
  if (step.kind === "intro" || step.kind === "scene") editorCode = lesson.tryIt.starter;
  else if (step.kind === "section") editorCode = step.code ?? null;
  else if (step.kind === "example") editorCode = lesson.examples[step.index].code;
  else if (predictQuestion) editorCode = answered[predictQuestion.id] ? predictQuestion.code ?? lesson.tryIt.starter : null;

  function goTo(index: number) {
    const target = Math.max(0, Math.min(steps.length - 1, index));
    setCurrent(target);
    writeStep(lesson.slug, target);
    setMenuOpen(false);
    if ((topRef.current?.getBoundingClientRect().top ?? 0) < 0) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const nextHref = next ? `/python-course/${next.slug}/` : "/python-course/certificate/";
  const nextLabel = next ? `Next lesson: ${next.title.replace(/^Project: /, "")}` : "Get your certificate";
  const onLast = current === steps.length - 1;

  const primary = onLast ? (
    <Link
      href={nextHref}
      onClick={() => {
        if (!lesson.exercise) markDone(lesson.slug);
      }}
      className="flex-1 sm:flex-none truncate rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
    >
      {nextLabel} &rarr;
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => goTo(current + 1)}
      className="flex-1 sm:flex-none rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
    >
      Next step &rarr;
    </button>
  );
  const back =
    current > 0 ? (
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        aria-label="Previous step"
        className="shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        &larr;<span className="hidden sm:inline"> Back</span>
      </button>
    ) : null;

  return (
    <div className="bg-[#f3f6fb] min-h-screen pb-28 lg:pb-10">
      <div ref={topRef} className="max-w-[1200px] mx-auto px-2 sm:px-4 py-3 md:py-6 scroll-mt-16">
        <div className="rounded-2xl border border-slate-300 bg-white shadow-sm">
          <header className="px-4 sm:px-6 pt-4 pb-3 border-b border-slate-200">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label="Lessons in this week"
                className="mt-1 shrink-0 rounded-md border border-slate-300 p-1.5 text-slate-700 hover:bg-slate-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-slate-500 truncate">
                  <Link href="/python-course/" className="text-blue-700 hover:underline">
                    Python course
                  </Link>
                  {week ? ` · Week ${week.number}: ${week.title} · ${isProject ? "Project" : `Lesson ${week.lessonNumber} of ${week.lessons.length}`}` : ""}
                </p>
                <h1 className="font-display text-[1.2rem] sm:text-[1.45rem] font-bold leading-snug text-slate-900">
                  {lesson.title}
                  {isDone && (
                    <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wide bg-emerald-600 text-white px-2 py-0.5 rounded">
                      Done
                    </span>
                  )}
                </h1>
              </div>
              <p className="hidden sm:block shrink-0 pt-6 text-[13px] text-slate-500">
                Step {current + 1} of {steps.length} · {minutesLeft} min left
              </p>
            </div>

            {menuOpen && week && (
              <nav aria-label="Lessons in this week" className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <ol>
                  {week.lessons.map((item, index) => {
                    const itemDone = completed(item.slug);
                    const here = item.slug === lesson.slug;
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/python-course/${item.slug}/`}
                          aria-current={here ? "page" : undefined}
                          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] ${
                            here ? "bg-blue-100 font-semibold text-blue-950" : "text-slate-700 hover:bg-white"
                          }`}
                        >
                          <span
                            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                              itemDone ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {itemDone ? "✓" : index + 1}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{item.title.replace(/^Project: /, "")}</span>
                          <span className="shrink-0 text-[12px] text-slate-400">{item.minutes} min</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
                <Link href="/python-course/#weeks" className="mt-1 block px-2.5 py-1.5 text-[13px] font-semibold text-blue-700 hover:underline">
                  All 6 weeks &rarr;
                </Link>
              </nav>
            )}

            <div className="mt-3 flex gap-1.5">
              {steps.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Step ${index + 1}: ${item.title}`}
                  aria-current={index === current ? "step" : undefined}
                  title={item.title}
                  className={`h-2 flex-1 rounded-full hover:opacity-80 ${
                    index === current ? "bg-blue-600" : index < current ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <p className="sm:hidden mt-2 text-[12px] text-slate-500">
              Step {current + 1} of {steps.length} · {minutesLeft} min left
            </p>
          </header>

          <div className={`p-4 sm:p-6 ${wide ? "" : "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8 lg:items-start"}`}>
            <div className="min-w-0">
              {steps.map((item, index) => (
                <article key={index} hidden={index !== current} className="space-y-3">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900">{item.title}</h2>

                  {item.kind === "intro" && (
                    <>
                      <p className="text-[15px] text-slate-700 leading-7">{plain(lesson.summary)}</p>
                      {memory && (
                        <p className="text-[15px] text-slate-800 leading-7">
                          <span className="font-semibold text-slate-900">Picture it: </span>
                          {memory.analogy}
                        </p>
                      )}
                      <p className="text-[14px] text-slate-700 leading-6">
                        <span className="font-semibold text-slate-900">Why it matters for AI: </span>
                        {plain(lesson.whyForAi)}
                      </p>
                      <LessonSketch slug={lesson.slug} />
                    </>
                  )}

                  {item.kind === "section" && (
                    <>
                      <div className="text-[15px] leading-7">
                        <LessonMarkdown content={lesson.sections[item.index].body} />
                      </div>
                      {item.code && (
                        <p className="text-[13px] text-slate-500">
                          {lesson.sections[item.index].basicTip ? `${lesson.sections[item.index].basicTip} ` : ""}
                          Run it in the editor
                          <span className="lg:hidden"> below</span>
                          <span className="hidden lg:inline"> on the right</span>, then change something and run it again.
                        </p>
                      )}
                    </>
                  )}

                  {item.kind === "predict" && quiz && (
                    <>
                      <p className="text-[15px] text-slate-700 leading-7">
                        Guess before you run. Engineers learn to read code this way.
                      </p>
                      <CheckpointQuiz
                        quiz={quiz}
                        only={[item.question]}
                        onAnswered={(id) => setAnswered((all) => (all[id] ? all : { ...all, [id]: true }))}
                      />
                    </>
                  )}

                  {item.kind === "scene" && (
                    <>
                      <p className="text-[15px] text-slate-700 leading-7">
                        Press Play or Step to see what Python does, one line at a time.
                      </p>
                      <LazyConceptPlayer scene={scene} />
                    </>
                  )}

                  {item.kind === "example" && (
                    <div className="text-[15px] leading-7 space-y-2">
                      <LessonMarkdown content={lesson.examples[item.index].note} />
                      {lesson.examples[item.index].aiMl && (
                        <p className="text-slate-700">
                          <span className="font-semibold text-slate-900">In real AI work: </span>
                          {lesson.examples[item.index].aiMl}
                        </p>
                      )}
                    </div>
                  )}

                  {item.kind === "check" && quiz && (
                    <>
                      <p className="text-[15px] text-slate-700 leading-7">
                        A few easy ones. Guess, then read the one-line why. Nothing here is a trick.
                      </p>
                      <CheckpointQuiz quiz={quiz} only={item.questions} />
                    </>
                  )}

                  {item.kind === "exercise" && lesson.exercise && (
                    <ExerciseCard
                      storageKey={`${lesson.slug}#exercise`}
                      exercise={lesson.exercise}
                      packages={lesson.packages}
                      passed={isDone}
                      isProject={isProject}
                      onPass={() => markDone(lesson.slug)}
                      next={next ? { href: nextHref, title: next.title } : undefined}
                    />
                  )}

                  {item.kind === "laptop" && lesson.laptop && <LaptopRun laptop={lesson.laptop} />}

                  {item.kind === "finish" && (
                    <>
                      <ul className="space-y-2">
                        {lesson.takeaways.map((takeaway, takeawayIndex) => (
                          <li key={takeaway} className="flex gap-2.5 text-[15px] text-slate-700 leading-7">
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                              {takeawayIndex + 1}
                            </span>
                            <span>{plain(takeaway)}</span>
                          </li>
                        ))}
                      </ul>
                      {!isDone && lesson.exercise && (
                        <p className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-[14px] text-orange-950">
                          This lesson counts as done once you pass{" "}
                          <button
                            type="button"
                            onClick={() => goTo(steps.findIndex((candidate) => candidate.kind === "exercise"))}
                            className="font-semibold underline"
                          >
                            {isProject ? "the project" : "the exercise"}
                          </button>
                          .
                        </p>
                      )}
                      {memory && (
                        <aside className="border-2 border-slate-900 rounded-lg bg-[#fffef8] p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]">
                          <p className="text-xs font-bold uppercase tracking-wide text-orange-700">Remember this</p>
                          <p className="font-display text-2xl font-bold text-slate-900 mt-1 leading-snug">{memory.remember}</p>
                          <p className="mt-2 text-[15px] text-slate-800 leading-6">
                            <span className="font-semibold text-slate-900">In AI and ML: </span>
                            {memory.ai}
                          </p>
                        </aside>
                      )}
                      {moduleRecap && moduleRecap.length > 0 && (
                        <section aria-label="Quick recap">
                          <h3 className="font-display text-lg font-bold text-slate-900">Quick recap</h3>
                          <div className="mt-2 space-y-2">
                            {moduleRecap.map((card) => (
                              <details key={card.prompt} className="border-2 border-slate-900 rounded-lg bg-white px-3 py-2">
                                <summary className="cursor-pointer font-semibold text-slate-900">{card.prompt}</summary>
                                <p className="mt-2 text-[15px] text-slate-700 leading-6">{card.answer}</p>
                              </details>
                            ))}
                          </div>
                        </section>
                      )}
                      <p className="text-sm text-slate-600">
                        {prev && (
                          <>
                            <Link href={`/python-course/${prev.slug}/`} className="font-semibold text-blue-700 hover:underline">
                              Previous: {prev.title}
                            </Link>
                            <span aria-hidden="true"> · </span>
                          </>
                        )}
                        <Link href="/python-course/certificate/" className="font-semibold text-blue-700 hover:underline">
                          Certificate
                        </Link>
                        <span aria-hidden="true"> · </span>
                        <Link href="/mentorship/" className="font-semibold text-blue-700 hover:underline">
                          Mentorship
                        </Link>
                        <span aria-hidden="true"> · </span>
                        <Link href="/courses/" className="font-semibold text-blue-700 hover:underline">
                          Live courses
                        </Link>
                      </p>
                    </>
                  )}
                </article>
              ))}

              {wide && <div className="hidden lg:flex items-center gap-3 mt-6">{back}{primary}</div>}
            </div>

            {!wide && (
              <div className="mt-5 lg:mt-0 lg:sticky lg:top-20">
                {editorCode === null && (
                  <div className="hidden lg:flex min-h-[240px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-6 text-center text-[14px] text-slate-500">
                    {step.kind === "predict" ? "Pick an answer. Then the code opens here so you can run it." : "Read this step, then press Next step."}
                  </div>
                )}
                <div hidden={editorCode === null}>
                  <PythonCompiler
                    starter={editorCode ?? lesson.tryIt.starter}
                    packages={lesson.packages}
                    title={step.title}
                  />
                </div>
                <div className="hidden lg:flex items-center gap-3 mt-4 justify-end">
                  {back}
                  {primary}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="mt-3 px-2 text-center text-[12px] text-slate-500">
          {outline.length} lessons in the course · progress saves on this device
        </p>
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-3 py-2.5">
          {back}
          {primary}
        </div>
      </div>
    </div>
  );
}

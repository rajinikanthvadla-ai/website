"use client";

import { useEffect, useState } from "react";
import type { LessonQuiz, QuizQuestion } from "@/lib/python-course/quiz-shared";

const STORAGE_KEY = "python-course-quizzes-v1";
const LEGACY_KEY = "python-course-checkpoints-v1";

const PRAISE = ["Yes.", "That's it.", "Good eye.", "Nice."];

type Saved = Record<string, { ids: string[] }>;

function readSaved(): Saved {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Saved;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeSaved(slug: string, ids: string[]) {
  const current = readSaved();
  current[slug] = { ids };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

function legacyPassed(slug: string): boolean {
  try {
    const raw = window.localStorage.getItem(LEGACY_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return parsed[slug] === true;
  } catch {
    return false;
  }
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[()]/g, "").replace(/\s+/g, " ");
}

function blankMatches(question: QuizQuestion, value: string): boolean {
  const given = normalize(value);
  if (!given) return false;
  return (question.accept ?? []).some((item) => normalize(item) === given);
}

type Props = {
  quiz: LessonQuiz;
};

export default function CheckpointQuiz({ quiz }: Props) {
  const [ready, setReady] = useState(false);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [correct, setCorrect] = useState<string[]>([]);

  useEffect(() => {
    const saved = readSaved()[quiz.slug];
    const ids = saved?.ids ?? (legacyPassed(quiz.slug) ? quiz.questions.map((question) => question.id) : []);
    if (!saved && ids.length > 0) writeSaved(quiz.slug, ids);
    const known = new Set(ids);
    const nextPicked: Record<string, string> = {};
    const nextRevealed: Record<string, boolean> = {};
    for (const question of quiz.questions) {
      if (!known.has(question.id)) continue;
      nextRevealed[question.id] = true;
      if (question.kind !== "blank") nextPicked[question.id] = question.answer;
    }
    setCorrect(ids);
    setPicked(nextPicked);
    setRevealed(nextRevealed);
    setDrafts({});
    setReady(true);
  }, [quiz]);

  const passed = quiz.questions.every((question) => correct.includes(question.id));

  function mark(question: QuizQuestion, isRight: boolean) {
    setCorrect((current) => {
      const next = isRight
        ? Array.from(new Set([...current, question.id]))
        : current.filter((id) => id !== question.id);
      writeSaved(quiz.slug, next);
      return next;
    });
    setRevealed((current) => ({ ...current, [question.id]: true }));
  }

  function choose(question: QuizQuestion, optionId: string) {
    setPicked((current) => ({ ...current, [question.id]: optionId }));
    mark(question, optionId === question.answer);
  }

  function checkBlank(question: QuizQuestion) {
    mark(question, blankMatches(question, drafts[question.id] ?? ""));
  }

  return (
    <section
      className="border-2 border-slate-900 rounded-lg bg-white p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]"
      aria-labelledby={`check-${quiz.slug}`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-orange-700 mb-1">Easy check</p>
      <h2 id={`check-${quiz.slug}`} className="font-display text-xl font-bold text-slate-900 mb-2">
        {quiz.title}
      </h2>
      <p className="text-sm text-slate-700 leading-6 mb-4">
        {ready && passed
          ? "That's the idea. Your answers stay on this device."
          : "A few easy ones. Guess, then read the one-line why. Nothing here is a trick."}
      </p>
      <ol className="space-y-5">
        {quiz.questions.map((question, index) => {
          const shown = revealed[question.id] === true;
          const isRight = correct.includes(question.id);
          return (
            <li key={question.id} className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">
                {kindLabel(question.kind)}
              </p>
              <p className="font-semibold text-slate-900 leading-6">{question.prompt}</p>
              {question.code ? (
                <pre className="mt-2 overflow-x-auto rounded-lg border-2 border-slate-900 bg-slate-50 p-3 font-mono text-sm text-slate-900">
                  {question.code}
                </pre>
              ) : null}
              {question.kind === "blank" ? (
                <form
                  className="mt-3 flex flex-wrap gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    checkBlank(question);
                  }}
                >
                  <label className="sr-only" htmlFor={`${quiz.slug}-${question.id}`}>
                    Your answer
                  </label>
                  <input
                    id={`${quiz.slug}-${question.id}`}
                    value={drafts[question.id] ?? ""}
                    onChange={(event) =>
                      setDrafts((current) => ({ ...current, [question.id]: event.target.value }))
                    }
                    className="min-h-11 min-w-40 flex-1 rounded-lg border-2 border-slate-900 px-3 text-slate-900"
                    autoComplete="off"
                  />
                  <button type="submit" className="notion-btn notion-btn--ink min-h-11">
                    Check
                  </button>
                </form>
              ) : (
                <div className="mt-3 flex flex-col gap-2" role="group" aria-label={question.prompt}>
                  {(question.options ?? []).map((option) => {
                    const selected = picked[question.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => choose(question, option.id)}
                        className={`min-h-11 rounded-lg border-2 px-3 py-2 text-left font-semibold ${
                          selected ? "border-slate-900 bg-blue-100 text-slate-900" : "border-slate-300 bg-white text-slate-800"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
              {shown ? (
                <p aria-live="polite" className={`mt-2 text-sm leading-6 ${isRight ? "text-emerald-800" : "text-orange-800"}`}>
                  {isRight ? PRAISE[index % PRAISE.length] : "Not quite."} {question.why}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function kindLabel(kind: QuizQuestion["kind"]): string {
  switch (kind) {
    case "choice":
      return "Pick one";
    case "predict":
      return "Predict the output";
    case "blank":
      return "Fill the blank";
    case "bug":
      return "Spot the bug";
    default: {
      const unreachable: never = kind;
      return unreachable;
    }
  }
}

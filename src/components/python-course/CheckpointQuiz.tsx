"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getCheckpoint, type Checkpoint } from "@/lib/python-course/checkpoints";

const STORAGE_KEY = "python-course-checkpoints-v1";

function readPassed(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return parsed[slug] === true;
  } catch {
    return false;
  }
}

function writePassed(slug: string) {
  const current = (() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  })();
  current[slug] = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

type Props = {
  slug: string;
};

export default function CheckpointQuiz({ slug }: Props) {
  const checkpoint = getCheckpoint(slug);
  const [passed, setPassed] = useState(false);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<string>("");
  const [wrong, setWrong] = useState<string[]>([]);

  useEffect(() => {
    setPassed(readPassed(slug));
    setResult("");
    setWrong([]);
    setReady(true);
  }, [slug]);

  if (!checkpoint) return null;
  const quiz = checkpoint;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const missed = quiz.questions.filter((question) => data.get(question.id) !== question.answer);
    if (missed.length === 0) {
      writePassed(slug);
      setPassed(true);
      setWrong([]);
      setResult("All correct. That idea is yours now.");
      return;
    }
    setPassed(false);
    setWrong(missed.map((question) => question.id));
    setResult("Not quite. Read the note under the question you missed, then try again.");
  }

  return (
    <section className="border-2 border-slate-900 rounded-lg bg-white p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]" aria-labelledby={`check-${slug}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-orange-700 mb-1">Checkpoint</p>
      <h2 id={`check-${slug}`} className="font-display text-xl font-bold text-slate-900 mb-2">
        {quiz.title}
      </h2>
      <p className="text-sm text-slate-700 leading-6 mb-4">
        {ready && passed
          ? "You passed this check on this device. You can try it again any time."
          : "Two short questions. They stay on this device with the rest of your progress."}
      </p>
      <QuizForm checkpoint={quiz} wrong={wrong} onSubmit={onSubmit} />
      {result && (
        <p role="status" aria-live="polite" className={`mt-3 text-sm font-semibold ${passed ? "text-emerald-800" : "text-orange-800"}`}>
          {result}
        </p>
      )}
    </section>
  );
}

function QuizForm({
  checkpoint,
  wrong,
  onSubmit,
}: {
  checkpoint: Checkpoint;
  wrong: string[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {checkpoint.questions.map((question, index) => {
        const missed = wrong.includes(question.id);
        return (
          <fieldset key={question.id} className="border border-slate-200 rounded-lg p-3">
            <legend className="px-1 font-bold text-slate-900">
              {index + 1}. {question.prompt}
            </legend>
            <div className="mt-2 space-y-1.5">
              {question.options.map((option) => (
                <label key={option.id} className="flex items-start gap-2.5 text-[15px] leading-6 text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    required
                    className="mt-1.5 h-4 w-4 accent-blue-700"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {missed && <p className="mt-2 text-sm text-slate-700 leading-6">{question.explain}</p>}
          </fieldset>
        );
      })}
      <button
        type="submit"
        className="notion-btn notion-btn--ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Check answers
      </button>
    </form>
  );
}

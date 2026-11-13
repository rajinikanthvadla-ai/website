"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { PythonExercise } from "@/lib/python-course/types";
import { loadLessonCode, saveLessonCode } from "@/lib/python-course/code-storage";
import PythonCompiler, { type CheckVerdict } from "./PythonCompiler";
import LessonMarkdown from "./LessonMarkdown";

type Props = {
  /** Where the learner's code is saved on this device. */
  storageKey: string;
  exercise: PythonExercise;
  packages: string[];
  passed: boolean;
  isProject?: boolean;
  onPass: () => void;
  next?: { href: string; title: string };
};

/** A task with an automatic answer check. Passing it marks the lesson done. */
export default function ExerciseCard({ storageKey, exercise, packages, passed, isProject, onPass, next }: Props) {
  const [starterCode, setStarterCode] = useState(exercise.starter);
  const [editorKey, setEditorKey] = useState(0);
  const [failures, setFailures] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [solutionShown, setSolutionShown] = useState(false);
  const [justPassed, setJustPassed] = useState(false);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setStarterCode(loadLessonCode(storageKey) ?? exercise.starter);
    setFailures(0);
    setShowHint(false);
    setSolutionShown(false);
    setJustPassed(false);
  }, [storageKey, exercise.starter]);

  const onCheck = useCallback(
    (verdict: CheckVerdict) => {
      if (verdict.passed) {
        setJustPassed(true);
        onPass();
      } else {
        setFailures((count) => count + 1);
      }
    },
    [onPass],
  );

  function persist(code: string) {
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => saveLessonCode(storageKey, code), 400);
  }

  function showSolution() {
    setSolutionShown(true);
    setStarterCode(exercise.solution);
    saveLessonCode(storageKey, exercise.solution);
  }

  function startOver() {
    setSolutionShown(false);
    saveLessonCode(storageKey, exercise.starter);
    if (starterCode === exercise.starter) setEditorKey((key) => key + 1);
    else setStarterCode(exercise.starter);
  }

  return (
    <section id="lesson-exercise" className="pt-2 border-t border-slate-200 scroll-mt-20">
      <div className="pt-4 mb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-orange-700 mb-1">
          {isProject ? "Build it here" : "Your turn"} · answer checked automatically
        </p>
        <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
          {isProject ? "Build the project" : "Exercise"}
        </h2>
        <div className="text-[15px] leading-7">
          <LessonMarkdown content={exercise.task} />
        </div>
        <p className="text-[13px] text-slate-500 mt-1">
          Edit the code, then press <span className="font-semibold text-slate-700">Run &amp; check</span>. Passing
          it marks this {isProject ? "project" : "lesson"} done.
        </p>
      </div>

      {passed && !justPassed && (
        <p className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] font-semibold text-emerald-800">
          You already passed this one on this device. Run it again any time to practise.
        </p>
      )}

      <PythonCompiler
        key={editorKey}
        starter={starterCode}
        packages={packages}
        title={isProject ? "Project" : "Exercise"}
        tall
        check={exercise.check}
        onCheck={onCheck}
        onCodeChange={persist}
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {exercise.hint && (
          <button
            type="button"
            onClick={() => setShowHint((open) => !open)}
            className="text-[12px] font-bold uppercase tracking-wide px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            {showHint ? "Hide hint" : "Need a hint?"}
          </button>
        )}
        {failures > 0 && !solutionShown && (
          <button
            type="button"
            onClick={showSolution}
            className="text-[12px] font-bold uppercase tracking-wide px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            Show solution
          </button>
        )}
        <button
          type="button"
          onClick={startOver}
          className="text-[12px] font-bold uppercase tracking-wide px-3 py-2 rounded-md text-slate-500 hover:text-slate-800"
        >
          Start over
        </button>
      </div>

      {showHint && exercise.hint && (
        <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[14px] text-slate-700">
          <LessonMarkdown content={`**Hint:** ${exercise.hint}`} />
        </div>
      )}
      {solutionShown && (
        <p className="mt-2 text-[13px] text-slate-600">
          The solution is in the editor. Read it line by line until each part makes sense, then press Run &amp; check.
        </p>
      )}

      {justPassed && (
        <div className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3">
          <p className="font-bold text-emerald-900">Correct, and saved as done.</p>
          {next ? (
            <Link href={next.href} className="mt-1 inline-block text-[14px] font-semibold text-emerald-800 underline">
              Next: {next.title} &rarr;
            </Link>
          ) : (
            <Link
              href="/python-course/certificate/"
              className="mt-1 inline-block text-[14px] font-semibold text-emerald-800 underline"
            >
              Get your certificate &rarr;
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

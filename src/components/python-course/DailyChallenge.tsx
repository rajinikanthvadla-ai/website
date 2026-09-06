"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  challengeDateKey,
  getChallengeForDate,
  type DailyChallenge,
} from "@/lib/python-course";
import { isChallengeDone, markChallengeDone } from "@/lib/python-course/code-storage";
import PythonCompiler from "./PythonCompiler";

type Props = {
  challenge?: DailyChallenge;
  compact?: boolean;
};

export default function DailyChallenge({ challenge, compact = false }: Props) {
  const active = useMemo(() => challenge ?? getChallengeForDate(), [challenge]);
  const dateKey = useMemo(() => challengeDateKey(), []);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isChallengeDone(dateKey));
  }, [dateKey]);

  return (
    <section className={compact ? "" : "border-2 border-slate-900 rounded-xl bg-white overflow-hidden shadow-[4px_4px_0_#0f172a]"}>
      <div className={compact ? "mb-4" : "px-5 py-4 border-b-2 border-slate-900 bg-[#ecfdf5]"}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 mb-1">
              Today · {active.minutes} min practice
            </p>
            <h2 className={`font-display font-bold text-slate-900 ${compact ? "text-xl" : "text-2xl"}`}>
              {active.title}
            </h2>
            <p className="text-[15px] text-slate-700 leading-7 mt-2 max-w-2xl">{active.prompt}</p>
            <p className="text-[13px] text-slate-500 mt-1">Hint: {active.hint}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {done ? (
              <span className="text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-md bg-emerald-600 text-white">
                Done today
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  markChallengeDone(dateKey);
                  setDone(true);
                }}
                className="text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-md border-2 border-slate-900 bg-white hover:bg-emerald-50"
              >
                Mark done
              </button>
            )}
            <Link
              href={`/python-course/${active.lessonSlug}/`}
              className="text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
            >
              Full lesson
            </Link>
          </div>
        </div>
      </div>

      <div className={compact ? "" : "p-4 sm:p-5"}>
        <PythonCompiler
          key={`${active.id}-${dateKey}`}
          starter={active.starter}
          packages={active.packages}
          title={`Daily challenge · ${active.lessonLabel}`}
          tall={!compact}
        />
      </div>
    </section>
  );
}

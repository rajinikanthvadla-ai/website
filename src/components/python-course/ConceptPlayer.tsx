"use client";

import { useEffect, useId, useState } from "react";
import type { Scene, SceneVisual } from "@/lib/python-course/scenes";

type Props = {
  scene: Scene;
};

export default function ConceptPlayer({ scene }: Props) {
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = scene.steps.length - 1;
  const step = scene.steps[index] ?? scene.steps[0];

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [scene.id]);

  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setIndex((current) => (current >= last ? current : current + 1));
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);

  function prefersStill() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function stepOnce() {
    setPlaying(false);
    setIndex((current) => (current >= last ? current : current + 1));
  }

  function onPlay() {
    if (prefersStill()) {
      stepOnce();
      return;
    }
    if (index >= last) setIndex(0);
    setPlaying((value) => !value);
  }

  function reset() {
    setPlaying(false);
    setIndex(0);
  }

  if (!step) return null;

  return (
    <section
      aria-labelledby={titleId}
      className="border-2 border-slate-900 rounded-lg bg-[#fffef8] p-4 sm:p-5 shadow-[4px_4px_0_#0f172a]"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Watch it run</p>
      <h2 id={titleId} className="font-display text-xl font-bold text-slate-900 mt-1">
        {scene.title}
      </h2>
      <p className="mt-1 text-[15px] leading-6 text-slate-700">{scene.blurb}</p>
      <div className="mt-4 min-h-36 flex items-center">
        <Stage visual={step.visual} />
      </div>
      <p aria-live="polite" className="mt-3 min-h-12 text-[15px] leading-6 text-slate-900">
        {step.caption}
      </p>
      <div role="toolbar" aria-label="Step through the picture" className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={onPlay} className="notion-btn notion-btn--ink min-h-11">
          {playing ? "Pause" : "Play"}
        </button>
        <button type="button" onClick={stepOnce} className="notion-btn notion-btn--ghost min-h-11">
          Step
        </button>
        <button type="button" onClick={reset} className="notion-btn notion-btn--ghost min-h-11">
          Reset
        </button>
        <p className="ml-auto text-sm font-bold text-slate-600">
          Step {index + 1} of {scene.steps.length}
        </p>
      </div>
    </section>
  );
}

function Stage({ visual }: { visual: SceneVisual }) {
  switch (visual.type) {
    case "boxes":
      return (
        <div className="flex flex-wrap gap-3">
          {visual.boxes.map((box) => (
            <div key={box.name} className={cardClass(box.hot)}>
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">{box.name}</p>
              <p className="font-display text-xl font-bold text-slate-900">{box.value}</p>
            </div>
          ))}
        </div>
      );
    case "tray":
      return (
        <div className="w-full">
          {visual.counter ? (
            <p className="mb-2 text-sm font-bold text-orange-700">{visual.counter}</p>
          ) : null}
          <div className="flex min-h-16 flex-wrap gap-2 rounded-lg border-2 border-dashed border-slate-900 bg-white p-3">
            {visual.items.length === 0 ? <p className="text-sm text-slate-500">empty tray</p> : null}
            {visual.items.map((item, itemIndex) => (
              <span key={`${item}-${itemIndex}`} className={`${cardClass(visual.hot === itemIndex)} py-2`}>
                <span className="block font-bold text-slate-900">{item}</span>
                <span className="text-[11px] font-bold text-slate-500">index {itemIndex}</span>
              </span>
            ))}
          </div>
        </div>
      );
    case "fork":
      return (
        <div className="w-full">
          <p className={`${cardClass(true)} mx-auto w-fit`}>{visual.condition}</p>
          <svg viewBox="0 0 240 36" className="mx-auto mt-1 h-8 w-56" aria-hidden="true">
            <path d="M120 0 L40 34 M120 0 L200 34" fill="none" stroke="#0f172a" strokeWidth="2" />
          </svg>
          <div className="flex justify-center gap-6">
            <p className={cardClass(visual.taken === "keep")}>keep</p>
            <p className={cardClass(visual.taken === "drop")}>drop</p>
          </div>
        </div>
      );
    case "machine":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <div className={cardClass(visual.phase === "wait" || visual.phase === "in")}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">in</p>
            <p className="font-bold text-slate-900">{visual.input}</p>
          </div>
          <Arrow />
          <div className={cardClass(visual.phase === "in" || visual.phase === "work")}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">machine</p>
            <p className="font-display text-lg font-bold text-slate-900">{visual.label}</p>
          </div>
          <Arrow />
          <div className={cardClass(visual.phase === "out")}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">out</p>
            <p className="font-bold text-slate-900">{visual.output}</p>
          </div>
        </div>
      );
    case "lockers":
      return (
        <div className="grid w-full gap-2 sm:grid-cols-2">
          {visual.rows.map((row) => (
            <div key={row.key} className={cardClass(row.open)}>
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">{row.key}</p>
              <p className="font-display text-xl font-bold text-slate-900">{row.open ? row.value : "closed"}</p>
            </div>
          ))}
        </div>
      );
    case "lines":
      return (
        <div className="w-full">
          <ol className="overflow-hidden rounded-lg border-2 border-slate-900 bg-white font-mono text-sm">
            {visual.lines.map((line, lineIndex) => (
              <li
                key={`${line}-${lineIndex}`}
                className={visual.hot === lineIndex ? "bg-blue-100 px-3 py-1.5" : "px-3 py-1.5"}
              >
                <span className="mr-2 text-slate-400">{lineIndex + 1}</span>
                {line}
              </li>
            ))}
          </ol>
          {visual.output ? (
            <p className="mt-2 whitespace-pre-wrap rounded-lg border-2 border-slate-900 bg-emerald-50 px-3 py-2 font-mono text-sm text-slate-900">
              {visual.output}
            </p>
          ) : null}
        </div>
      );
    case "flow":
      return (
        <ol className="flex flex-wrap items-center gap-2">
          {visual.nodes.map((node, nodeIndex) => (
            <li key={`${node.label}-${nodeIndex}`} className="flex items-center gap-2">
              <span className={cardClass(node.hot)}>{node.label}</span>
              {nodeIndex < visual.nodes.length - 1 ? <Arrow /> : null}
            </li>
          ))}
        </ol>
      );
    default: {
      const unreachable: never = visual;
      return unreachable;
    }
  }
}

function cardClass(hot?: boolean) {
  return `rounded-[14px_18px_12px_16px] border-2 border-slate-900 px-3 py-2 ${hot ? "bg-blue-100" : "bg-white"}`;
}

function Arrow() {
  return (
    <span aria-hidden="true" className="font-bold text-slate-900">
      →
    </span>
  );
}

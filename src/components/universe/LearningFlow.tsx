"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import TechLogo from "./TechLogo";
import { ROLES, SKILLS, MATURITY_LABELS } from "@/lib/knowledge-graph";
import type { SkillNode } from "@/lib/knowledge-graph/types";

type Stage = {
  title: string;
  caption: string;
  skillIds: string[];
};

/** Ordered stages — every skill here appears in analyzed job postings and cohort roadmaps. */
const STAGES: Stage[] = [
  {
    title: "Foundation",
    caption: "Linux, Git, Python, and SQL — the four skills every posting assumes you already have.",
    skillIds: ["linux", "git", "python", "sql"],
  },
  {
    title: "Package & Automate",
    caption: "Containers, pipelines, infrastructure-as-code, and a real cloud account.",
    skillIds: ["docker", "cicd", "terraform", "cloud"],
  },
  {
    title: "Run & Observe",
    caption: "Kubernetes in production, Helm releases, and the Prometheus + Grafana observability stack.",
    skillIds: ["kubernetes", "helm", "prometheus", "grafana"],
  },
  {
    title: "ML & APIs",
    caption: "Train models with PyTorch, track them in MLflow, expose them via FastAPI, serve with KServe.",
    skillIds: ["pytorch", "mlflow", "fastapi", "kserve"],
  },
  {
    title: "LLMs & Retrieval",
    caption: "LLM APIs, RAG pipelines, and vector databases — the core GenAI production stack.",
    skillIds: ["llms", "rag", "vector-databases"],
  },
  {
    title: "Agents & Scale",
    caption: "Agent frameworks, MCP tool protocols, GPU inference with vLLM, and cluster-scale GPU ops.",
    skillIds: ["langchain", "mcp", "vllm", "gpu"],
  },
];

const STORAGE_KEY = "rv-learning-progress";

function loadCompleted(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

const SKILL_BY_ID = new Map(SKILLS.map((s) => [s.id, s]));

/** Roles that make sense as an end destination for this flow. */
const ROUTE_ROLES = ROLES.filter((r) => r.skillIds.length > 0);

export default function LearningFlow() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [routeRoleId, setRouteRoleId] = useState<string | null>(null);
  const [openSkillId, setOpenSkillId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  // Reveal each stage as it scrolls into view; this also starts the connector flow.
  useEffect(() => {
    // Opting in here (rather than in CSS) keeps stages visible before hydration
    // and for anyone without JavaScript.
    rootRef.current?.setAttribute("data-flow-anim", "on");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    for (const el of stageRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const routeSkillIds = useMemo(() => {
    if (!routeRoleId) return null;
    const role = ROLES.find((r) => r.id === routeRoleId);
    return role ? new Set(role.skillIds) : null;
  }, [routeRoleId]);

  const toggleComplete = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage can be unavailable in private mode; progress is a nice-to-have.
      }
      return next;
    });
  }, []);

  const routeTotal = useMemo(() => {
    const all = STAGES.flatMap((s) => s.skillIds);
    return routeSkillIds ? all.filter((id) => routeSkillIds.has(id)).length : all.length;
  }, [routeSkillIds]);

  const routeDone = useMemo(() => {
    const all = STAGES.flatMap((s) => s.skillIds);
    const onRoute = routeSkillIds ? all.filter((id) => routeSkillIds.has(id)) : all;
    return onRoute.filter((id) => completed.includes(id)).length;
  }, [completed, routeSkillIds]);

  const percent = routeTotal === 0 ? 0 : Math.round((routeDone / routeTotal) * 100);
  const activeRole = routeRoleId ? ROLES.find((r) => r.id === routeRoleId) : null;

  return (
    <div ref={rootRef} className="max-w-6xl mx-auto px-6">
      {/* ── Controls ── */}
      <div className="bg-white border-2 border-[#0f172a] rounded-sm shadow-[6px_6px_0_#0f172a] p-5 md:p-6 mb-12">
        <p className="notion-eyebrow mb-3">
          <span className="notion-eyebrow-dot" />
          Step 1 · Pick your destination
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          <button
            type="button"
            onClick={() => setRouteRoleId(null)}
            className={`text-xs font-extrabold uppercase tracking-wide px-3.5 py-2 rounded-sm border-2 border-[#0f172a] transition-all ${
              routeRoleId === null
                ? "bg-[#0f172a] text-white"
                : "bg-white text-[#0f172a] hover:bg-[#fef9c3]"
            }`}
          >
            Show everything
          </button>
          {ROUTE_ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setRouteRoleId(role.id)}
              className={`text-xs font-extrabold uppercase tracking-wide px-3.5 py-2 rounded-sm border-2 border-[#0f172a] transition-all ${
                routeRoleId === role.id
                  ? "bg-orange-500 text-white"
                  : "bg-white text-[#0f172a] hover:bg-[#fef9c3]"
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>

        {/* Progress meter */}
        <div className="pt-5 border-t-2 border-dashed border-slate-300">
          <div className="flex items-end justify-between gap-4 mb-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                {activeRole ? `Route to ${activeRole.name}` : "Full path"}
              </p>
              <p className="font-display text-2xl font-bold text-[#0f172a]">
                {routeDone} of {routeTotal} skills marked done
              </p>
            </div>
            <span className="font-display text-3xl font-bold text-orange-600 stat-number">{percent}%</span>
          </div>
          <div className="h-3 bg-[#fafafa] border-2 border-[#0f172a] rounded-sm overflow-hidden">
            <div
              className="lf-meter-fill h-full bg-orange-500"
              style={{ width: `${percent}%` }}
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Skills completed"
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Tick a skill to track it. Progress is saved in this browser only — nothing is uploaded.
          </p>
        </div>
      </div>

      {/* ── Stages ── */}
      {STAGES.map((stage, stageIndex) => {
        const skills = stage.skillIds
          .map((id) => SKILL_BY_ID.get(id))
          .filter((s): s is SkillNode => Boolean(s));

        const onRouteCount = routeSkillIds
          ? stage.skillIds.filter((id) => routeSkillIds.has(id)).length
          : stage.skillIds.length;

        return (
          <div
            key={stage.title}
            ref={(el) => {
              stageRefs.current[stageIndex] = el;
            }}
            className="lf-stage"
          >
            {/* Stage heading */}
            <div className="flex items-start gap-4 mb-5">
              <span className="lf-stage-badge shrink-0 w-11 h-11 flex items-center justify-center text-lg font-bold text-[#0f172a]">
                {stageIndex + 1}
              </span>
              <div className="pt-0.5">
                <h3 className="font-display text-xl md:text-2xl font-bold text-[#0f172a] leading-tight">
                  {stage.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{stage.caption}</p>
                {routeSkillIds && (
                  <p className="text-xs font-extrabold uppercase tracking-wide text-orange-600 mt-1.5">
                    {onRouteCount === 0
                      ? "Not needed for this role"
                      : `${onRouteCount} of ${stage.skillIds.length} needed for this role`}
                  </p>
                )}
              </div>
            </div>

            {/* Skill cards */}
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
              {skills.map((skill) => {
                const isDone = completed.includes(skill.id);
                const offRoute = routeSkillIds ? !routeSkillIds.has(skill.id) : false;
                const isOpen = openSkillId === skill.id;

                return (
                  <li key={skill.id} className="lf-node relative">
                    <button
                      type="button"
                      onClick={() => setOpenSkillId(isOpen ? null : skill.id)}
                      aria-expanded={isOpen}
                      className="lf-card w-full text-left p-4 pr-12 h-full flex flex-col gap-2.5"
                      data-state={isDone ? "done" : "todo"}
                      data-off-route={offRoute}
                      data-active={isOpen}
                    >
                      <span
                        className={`lf-logo inline-flex items-center justify-center w-11 h-11 rounded-sm border-2 border-[#0f172a] ${
                          isDone ? "bg-emerald-100 text-emerald-800" : "bg-[#dbeafe] text-[#0f172a]"
                        }`}
                      >
                        <TechLogo slug={skill.slug} className="w-6 h-6" />
                      </span>

                      <span className="font-display font-bold text-base text-[#0f172a] leading-snug">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-600 leading-relaxed flex-1">{skill.summary}</span>
                      <span className="text-[0.65rem] font-extrabold uppercase tracking-wide text-slate-500 border border-dashed border-slate-400 rounded-sm px-1.5 py-0.5 self-start">
                        {skill.maturity} · {MATURITY_LABELS[skill.maturity]}
                      </span>
                    </button>

                    {/* Sibling of the card button, never nested inside it. */}
                    <button
                      type="button"
                      onClick={() => toggleComplete(skill.id)}
                      aria-pressed={isDone}
                      aria-label={`Mark ${skill.name} as ${isDone ? "not done" : "done"}`}
                      className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-sm border-2 border-[#0f172a] flex items-center justify-center transition-colors ${
                        isDone ? "bg-emerald-500 text-white" : "bg-white text-slate-300 hover:bg-[#fef9c3]"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3.5">
                        <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Expanded detail for the selected skill in this stage */}
            {(() => {
              const open = skills.find((s) => s.id === openSkillId);
              if (!open) return null;

              return (
                <div className="mt-4 bg-white border-2 border-[#0f172a] rounded-sm shadow-[6px_6px_0_#0f172a] p-5 md:p-6 animate-fade-in-up">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-sm border-2 border-[#0f172a] bg-[#fef9c3] text-[#0f172a]">
                        <TechLogo slug={open.slug} className="w-6 h-6" />
                      </span>
                      <h4 className="font-display text-xl font-bold text-[#0f172a]">{open.name}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenSkillId(null)}
                      aria-label="Close details"
                      className="shrink-0 w-8 h-8 rounded-sm border-2 border-[#0f172a] bg-white hover:bg-[#fafafa] flex items-center justify-center"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <p className="notion-board-sub">What it is</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{open.what}</p>
                    </div>
                    <div>
                      <p className="notion-board-sub">Why it exists</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{open.why}</p>
                    </div>
                  </div>

                  <div className="bg-[#fef9c3] border-2 border-[#0f172a] rounded-sm p-4 mb-5">
                    <p className="notion-board-sub">Build this to prove you know it</p>
                    <p className="text-sm font-semibold text-[#0f172a] leading-relaxed">{open.buildProject}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <p className="notion-board-sub">Learn these topics</p>
                      <div className="flex flex-wrap gap-1.5">
                        {open.learnTopics.map((topic) => (
                          <span key={topic} className="notion-board-tag">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="notion-board-sub">What breaks in production</p>
                      <ul className="notion-board-list">
                        {open.productionReality.slice(0, 5).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/skills/${open.slug}/`}
                    className="notion-btn notion-btn--ink !py-2.5 !px-5 !text-sm"
                  >
                    Full {open.name} guide &rarr;
                  </Link>
                </div>
              );
            })()}

            {/* Flowing connector into the next stage, aligned under the stage number
                so the badges and arrows read as one continuous spine. */}
            {stageIndex < STAGES.length - 1 && (
              <div className="py-4 pl-[10px]" aria-hidden="true">
                <svg className="lf-connector block" width="26" height="56" viewBox="0 0 26 56">
                  <line className="lf-spine" x1="13" y1="0" x2="13" y2="42" stroke="#0f172a" strokeWidth="3" />
                  <path
                    d="M6 41l7 11 7-11"
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}

      {/* Destination marker */}
      <div className="lf-stage is-visible mt-8 mb-4">
        <div className="relative bg-[#0f172a] border-2 border-[#0f172a] rounded-sm shadow-[8px_8px_0_#000] p-7 text-center overflow-hidden">
          <span className="absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 lf-ping" />
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-orange-400 mb-2 relative">
            Destination
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
            {activeRole ? activeRole.name : "Production AI Engineer"}
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {activeRole
              ? activeRole.description
              : "You can build it, ship it, watch it, and fix it at 2am. That is the whole job."}
          </p>
          {activeRole?.roadmapSlug && (
            <Link
              href={`/roadmap/${activeRole.roadmapSlug}/`}
              className="notion-btn notion-btn--accent !py-2.5 !px-6 !text-sm mt-5"
            >
              Open the {activeRole.name} roadmap &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

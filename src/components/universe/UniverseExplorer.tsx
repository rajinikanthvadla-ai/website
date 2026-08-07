"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { SkillNode, ViewMode } from "@/lib/knowledge-graph/types";
import {
  SKILLS,
  DOMAINS,
  CENTER_DOMAIN,
  RELATIONS,
  VIEW_MODES,
  MATURITY_LABELS,
  getConnectedSkills,
  getFailuresForSkill,
  searchGraph,
} from "@/lib/knowledge-graph";

const STORAGE_KEY = "ai-universe-progress";

type Progress = { completed: string[]; bookmarked: string[] };

function loadProgress(): Progress {
  if (typeof window === "undefined") return { completed: [], bookmarked: [] };
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<Progress>;
    return {
      completed: Array.isArray(raw.completed) ? raw.completed : [],
      bookmarked: Array.isArray(raw.bookmarked) ? raw.bookmarked : [],
    };
  } catch {
    return { completed: [], bookmarked: [] };
  }
}

function saveProgress(p: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function UniverseExplorer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mode, setMode] = useState<ViewMode>("roadmap");
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>({ completed: [], bookmarked: [] });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.85 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [breakMode, setBreakMode] = useState(false);
  const [failureStep, setFailureStep] = useState(0);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const searchResults = useMemo(() => (search.length > 1 ? searchGraph(search) : []), [search]);

  const visibleSkills = useMemo(() => {
    if (!filterDomain) return SKILLS;
    return SKILLS.filter((s) => s.domainId === filterDomain);
  }, [filterDomain]);

  const toggleComplete = useCallback((id: string) => {
    setProgress((prev) => {
      const completed = prev.completed.includes(id)
        ? prev.completed.filter((c) => c !== id)
        : [...prev.completed, id];
      const next = { ...prev, completed };
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setProgress((prev) => {
      const bookmarked = prev.bookmarked.includes(id)
        ? prev.bookmarked.filter((b) => b !== id)
        : [...prev.bookmarked, id];
      const next = { ...prev, bookmarked };
      saveProgress(next);
      return next;
    });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setTransform((t) => ({ ...t, scale: Math.min(2.5, Math.max(0.3, t.scale * delta)) }));
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest("[data-node]")) return;
    setDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  }, [transform.x, transform.y]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      setTransform((t) => ({ ...t, x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }));
    },
    [dragging, dragStart],
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  const failures = selected ? getFailuresForSkill(selected.id) : [];
  const connected = selected ? getConnectedSkills(selected.id) : [];

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Left sidebar — domains */}
      <aside className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white p-4 overflow-y-auto">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Domains</p>
        <button
          type="button"
          onClick={() => setFilterDomain(null)}
          className={`block w-full text-left text-sm px-3 py-2 rounded-lg mb-1 font-semibold transition-colors ${
            !filterDomain ? "bg-blue-700 text-white" : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          All worlds
        </button>
        {DOMAINS.filter((d) => d.id !== "production-ai").map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setFilterDomain(d.id)}
            className={`block w-full text-left text-xs px-3 py-2 rounded-lg mb-0.5 font-medium transition-colors ${
              filterDomain === d.id ? "bg-blue-100 text-blue-800" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {d.name}
          </button>
        ))}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Your progress</p>
          <p className="text-2xl font-bold text-slate-900">{progress.completed.length}</p>
          <p className="text-xs text-slate-500">skills marked complete</p>
        </div>
      </aside>

      {/* Center — graph */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b border-slate-200 bg-white px-4 py-3 flex flex-wrap gap-3 items-center">
          <input
            type="search"
            placeholder="Search skills, tools, roles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
          <div className="flex flex-wrap gap-1">
            {VIEW_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  mode === m.id ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap gap-2">
            {searchResults.slice(0, 8).map((r) => (
              "slug" in r && "summary" in r ? (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => { setSelected(r as SkillNode); setSearch(""); }}
                  className="text-xs bg-blue-50 text-blue-800 px-3 py-1 rounded-lg font-semibold hover:bg-blue-100"
                >
                  {(r as SkillNode).name}
                </button>
              ) : (
                <span key={(r as { slug: string }).slug} className="text-xs text-slate-500 px-2">
                  {(r as { name: string }).name} (domain)
                </span>
              )
            ))}
          </div>
        )}

        <div
          className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing bg-white"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1000 1000"
            className="w-full h-full min-h-[480px]"
            style={{ touchAction: "none" }}
          >
            <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
              {/* Domain ring connections */}
              {DOMAINS.filter((d) => d.id !== "production-ai").map((d) => (
                <line
                  key={`line-${d.id}`}
                  x1={CENTER_DOMAIN.x}
                  y1={CENTER_DOMAIN.y}
                  x2={d.x}
                  y2={d.y}
                  stroke="#e2e8f0"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
              ))}

              {/* Skill relations */}
              {RELATIONS.map((r) => {
                const from = SKILLS.find((s) => s.id === r.from);
                const to = SKILLS.find((s) => s.id === r.to);
                if (!from || !to) return null;
                if (filterDomain && from.domainId !== filterDomain && to.domainId !== filterDomain) return null;
                return (
                  <line
                    key={`${r.from}-${r.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#cbd5e1"
                    strokeWidth={1}
                    opacity={0.7}
                  />
                );
              })}

              {/* Domain nodes */}
              {DOMAINS.map((d) => (
                <g key={d.id} data-node transform={`translate(${d.x}, ${d.y})`}>
                  <circle
                    r={d.id === "production-ai" ? 52 : 36}
                    fill={d.id === "production-ai" ? "#1d4ed8" : "#fff"}
                    stroke={d.color}
                    strokeWidth={d.id === "production-ai" ? 0 : 2}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[9px] font-bold fill-slate-900 pointer-events-none"
                    style={{ fontSize: d.id === "production-ai" ? 11 : 8 }}
                  >
                    {d.name.split(" ").slice(0, 2).map((w, i) => (
                      <tspan key={i} x={0} dy={i === 0 ? (d.id === "production-ai" ? -6 : -4) : 10}>
                        {w}
                      </tspan>
                    ))}
                  </text>
                </g>
              ))}

              {/* Skill nodes */}
              {visibleSkills.map((s) => {
                const isSelected = selected?.id === s.id;
                const isDone = progress.completed.includes(s.id);
                const domain = DOMAINS.find((d) => d.id === s.domainId);
                return (
                  <g
                    key={s.id}
                    data-node
                    transform={`translate(${s.x}, ${s.y})`}
                    className="cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setSelected(s); setBreakMode(false); setFailureStep(0); }}
                  >
                    <circle
                      r={isSelected ? 22 : 18}
                      fill={isDone ? "#059669" : isSelected ? "#1d4ed8" : "#fff"}
                      stroke={domain?.color ?? "#0f172a"}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[7px] font-bold pointer-events-none ${isSelected || isDone ? "fill-white" : "fill-slate-800"}`}
                    >
                      {s.name.length > 12 ? `${s.name.slice(0, 10)}…` : s.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              type="button"
              onClick={() => setTransform((t) => ({ ...t, scale: Math.min(2.5, t.scale * 1.2) }))}
              className="w-9 h-9 bg-white border-2 border-slate-900 rounded-lg font-bold text-sm shadow-[2px_2px_0_#0f172a]"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setTransform((t) => ({ ...t, scale: Math.max(0.3, t.scale * 0.8) }))}
              className="w-9 h-9 bg-white border-2 border-slate-900 rounded-lg font-bold text-sm shadow-[2px_2px_0_#0f172a]"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setTransform({ x: 0, y: 0, scale: 0.85 })}
              className="px-3 h-9 bg-white border-2 border-slate-900 rounded-lg text-xs font-bold shadow-[2px_2px_0_#0f172a]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Right panel — intelligence */}
      <aside className="lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white overflow-y-auto max-h-[50vh] lg:max-h-none">
        {selected ? (
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-blue-700">{mode} mode</span>
                <h2 className="font-display text-xl font-bold text-slate-900 mt-1">{selected.name}</h2>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => toggleComplete(selected.id)}
                  title="Mark complete"
                  className={`text-xs px-2 py-1 rounded font-bold ${progress.completed.includes(selected.id) ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  ✓
                </button>
                <button
                  type="button"
                  onClick={() => toggleBookmark(selected.id)}
                  title="Bookmark"
                  className={`text-xs px-2 py-1 rounded font-bold ${progress.bookmarked.includes(selected.id) ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  ★
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              {selected.modes[mode]}
            </p>

            {!breakMode ? (
              <>
                <Section title="What">{selected.what}</Section>
                <Section title="Why">{selected.why}</Section>
                <TagList title="Used in" items={selected.usedIn} />
                <TagList title="Required by roles" items={selected.requiredByRoles.map((r) => r.replace(/-/g, " "))} />
                <TagList title="Learn" items={selected.learnTopics} />
                <Section title="Build">{selected.buildProject}</Section>
                <p className="text-xs text-slate-500 mb-4">
                  Maturity: <strong>{selected.maturity}</strong> — {MATURITY_LABELS[selected.maturity]}
                </p>
                {selected.companyDemand && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 text-xs text-slate-600">
                    <p className="font-bold text-slate-800 mb-1">Market signal (illustrative)</p>
                    <p>{selected.companyDemand.sampleNote}</p>
                    <p className="mt-1 text-slate-400">Updated {selected.companyDemand.lastUpdated}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setBreakMode(true)}
                    className="text-xs font-bold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Break Production
                  </button>
                  <Link href={`/skills/${selected.slug}/`} className="text-xs font-bold bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                    Full page →
                  </Link>
                </div>
                {connected.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase text-slate-500 mb-2">Connected</p>
                    <div className="flex flex-wrap gap-1">
                      {connected.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelected(c)}
                          className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold hover:bg-blue-100"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : failures.length > 0 ? (
              <FailurePanel scenario={failures[0]} step={failureStep} onStep={setFailureStep} onBack={() => setBreakMode(false)} />
            ) : (
              <p className="text-sm text-slate-500">No failure scenarios yet for this skill.</p>
            )}
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500">
            <p className="text-4xl mb-3">◎</p>
            <p className="text-sm font-semibold text-slate-700 mb-1">Click any node</p>
            <p className="text-xs">Pan and zoom the universe. Switch modes to see the same skill from different angles.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{title}</p>
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function TagList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{title}</p>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <span key={item} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function FailurePanel({
  scenario,
  step,
  onStep,
  onBack,
}: {
  scenario: import("@/lib/knowledge-graph/types").FailureScenario;
  step: number;
  onStep: (n: number) => void;
  onBack: () => void;
}) {
  const steps = [
    { label: "Symptom", content: scenario.symptom },
    { label: "Evidence to check", content: scenario.evidence.join(" · ") },
    { label: "Root cause", content: scenario.rootCause },
    { label: "Immediate mitigation", content: scenario.mitigation },
    { label: "Permanent fix", content: scenario.permanentFix },
    { label: "Prevention", content: scenario.prevention },
  ];

  return (
    <div className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
      <p className="text-xs font-bold uppercase text-red-700 mb-1">Break Production</p>
      <h3 className="font-bold text-slate-900 mb-3">{scenario.title}</h3>
      <p className="text-xs font-bold text-slate-500 mb-1">{steps[step]?.label}</p>
      <p className="text-sm text-slate-700 mb-4">{steps[step]?.content}</p>
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="text-xs font-bold text-slate-600 px-3 py-1.5 border border-slate-300 rounded-lg">
          Back
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => onStep(step + 1)} className="text-xs font-bold bg-red-600 text-white px-3 py-1.5 rounded-lg">
            Next →
          </button>
        ) : (
          <button type="button" onClick={() => { onBack(); onStep(0); }} className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg">
            Done
          </button>
        )}
      </div>
    </div>
  );
}

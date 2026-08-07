"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Zap,
  Code2,
  Database,
  Cog,
  Cloud,
  Brain,
  Network,
  Layers,
  ArrowRight,
  X,
  ChevronDown,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import type { SkillNode, ViewMode } from "@/lib/knowledge-graph/types";
import {
  SKILLS,
  DOMAINS,
  CENTER_DOMAIN,
  VIEW_MODES,
  searchGraph,
  getConnectedSkills,
} from "@/lib/knowledge-graph";

const SKILL_ICONS: Record<string, React.ReactNode> = {
  kubernetes: <Network className="w-5 h-5" />,
  docker: <Layers className="w-5 h-5" />,
  python: <Code2 className="w-5 h-5" />,
  mlflow: <Database className="w-5 h-5" />,
  rag: <Brain className="w-5 h-5" />,
  langchain: <Zap className="w-5 h-5" />,
  mcp: <Network className="w-5 h-5" />,
  vllm: <Cog className="w-5 h-5" />,
  gpu: <Cloud className="w-5 h-5" />,
  terraform: <Layers className="w-5 h-5" />,
};

const STORAGE_KEY = "ai-universe-progress";

type Progress = { completed: string[]; bookmarked: string[] };

function loadProgress(): Progress {
  if (typeof window === "undefined") return { completed: [], bookmarked: [] };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Progress;
  } catch {
    return { completed: [], bookmarked: [] };
  }
}

function saveProgress(p: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function UniverseV2() {
  const [mode, setMode] = useState<ViewMode>("roadmap");
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>({ completed: [], bookmarked: [] });
  const [showPanel, setShowPanel] = useState(false);

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

  const connected = selected ? getConnectedSkills(selected.id) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-blue-500/30 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">AI Universe</h1>
            <p className="text-sm text-blue-300">Interactive skill & career roadmap</p>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="search"
                placeholder="Search skills, roles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-blue-500/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-blue-500/30 rounded-lg p-2 max-w-md z-50 space-y-1"
              >
                {searchResults.slice(0, 5).map((r) => (
                  "slug" in r && "summary" in r ? (
                    <button
                      key={(r as SkillNode).id}
                      onClick={() => {
                        setSelected(r as SkillNode);
                        setSearch("");
                        setShowPanel(true);
                      }}
                      className="w-full text-left text-sm px-3 py-2 rounded text-blue-300 hover:bg-blue-500/20 transition"
                    >
                      {(r as SkillNode).name}
                    </button>
                  ) : null
                ))}
              </motion.div>
            )}
          </div>

          {/* Mode switcher */}
          <div className="flex gap-2">
            {VIEW_MODES.map((m) => (
              <motion.button
                key={m.id}
                onClick={() => setMode(m.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                  mode === m.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {m.label}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-4 gap-6">
        {/* Left sidebar — domains */}
        <aside className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-5 backdrop-blur"
          >
            <p className="text-xs font-bold uppercase text-blue-400 mb-4">Domains</p>
            <motion.button
              onClick={() => setFilterDomain(null)}
              whileHover={{ x: 4 }}
              className={`block w-full text-left text-sm px-3 py-2.5 rounded-lg mb-2 font-semibold transition-all ${
                !filterDomain
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              All worlds
            </motion.button>
            {DOMAINS.filter((d) => d.id !== "production-ai").map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilterDomain(d.id)}
                whileHover={{ x: 4 }}
                className={`block w-full text-left text-xs px-3 py-2 rounded-lg mb-1 font-medium transition-all ${
                  filterDomain === d.id
                    ? "bg-blue-500/30 text-blue-300"
                    : "text-slate-500 hover:bg-slate-800"
                }`}
              >
                {d.name}
              </motion.button>
            ))}

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 pt-4 border-t border-blue-500/20"
            >
              <p className="text-xs font-bold uppercase text-blue-400 mb-2">Progress</p>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-blue-400 mb-1"
              >
                {progress.completed.length}
              </motion.div>
              <p className="text-xs text-slate-500">skills completed</p>
            </motion.div>
          </motion.div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-8 backdrop-blur"
          >
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">Skill Landscape</h2>
                <p className="text-blue-300 text-sm">Click any skill to explore. {visibleSkills.length} skills visible.</p>
              </div>

              {/* Skill grid with animation */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleSkills.map((skill, i) => {
                  const isDone = progress.completed.includes(skill.id);
                  const isBookmarked = progress.bookmarked.includes(skill.id);
                  const icon = SKILL_ICONS[skill.slug] || <Code2 className="w-5 h-5" />;

                  return (
                    <motion.button
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelected(skill);
                        setShowPanel(true);
                      }}
                      className={`relative group text-left p-4 rounded-xl border-2 transition-all ${
                        isDone
                          ? "bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                          : "bg-slate-900/50 border-blue-500/30 hover:border-blue-500 shadow-lg shadow-blue-500/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div
                          className={`p-2 rounded-lg ${isDone ? "bg-emerald-500/30 text-emerald-300" : "bg-blue-500/30 text-blue-300"}`}
                        >
                          {icon}
                        </div>
                        <div className="flex gap-1">
                          <motion.div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComplete(skill.id);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-1 rounded transition cursor-pointer ${isDone ? "text-emerald-400" : "text-slate-500 hover:text-emerald-400"}`}
                            role="button"
                            tabIndex={0}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </motion.div>
                          <motion.div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(skill.id);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-1 rounded transition cursor-pointer ${isBookmarked ? "text-orange-400" : "text-slate-500 hover:text-orange-400"}`}
                            role="button"
                            tabIndex={0}
                          >
                            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                          </motion.div>
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-sm mb-1">{skill.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{skill.summary}</p>
                      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition">
                        View details <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel — skill details */}
      <AnimatePresence>
        {showPanel && selected && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-slate-950 border-l border-blue-500/30 backdrop-blur overflow-y-auto z-50"
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase text-blue-400">{mode} mode</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">{selected.name}</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPanel(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>

              {/* Mode-specific content */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-blue-200 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
              >
                {selected.modes[mode]}
              </motion.div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-slate-500 mb-1">Learn topics</p>
                  <p className="font-bold text-blue-400">{selected.learnTopics.length}</p>
                </div>
                <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-slate-500 mb-1">Connected</p>
                  <p className="font-bold text-blue-400">{connected.length}</p>
                </div>
              </div>

              {/* What & Why */}
              <div className="space-y-3 pt-3 border-t border-slate-700">
                <div>
                  <p className="text-xs font-bold uppercase text-blue-400 mb-1">What</p>
                  <p className="text-sm text-slate-300">{selected.what}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-blue-400 mb-1">Why</p>
                  <p className="text-sm text-slate-300">{selected.why}</p>
                </div>
              </div>

              {/* Build project */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3"
              >
                <p className="text-xs font-bold uppercase text-blue-400 mb-1">Build</p>
                <p className="text-sm text-slate-300">{selected.buildProject}</p>
              </motion.div>

              {/* Connected skills */}
              {connected.length > 0 && (
                <div className="pt-3 border-t border-slate-700">
                  <p className="text-xs font-bold uppercase text-blue-400 mb-2">Connected skills</p>
                  <div className="flex flex-wrap gap-2">
                    {connected.map((c) => (
                      <motion.button
                        key={c.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelected(c)}
                        className="text-xs bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 px-2 py-1 rounded-lg transition border border-blue-500/30"
                      >
                        {c.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="pt-4 border-t border-slate-700"
              >
                <Link
                  href={`/skills/${selected.slug}/`}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Full guide <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-blue-500/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-12 mt-12"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-3">Ready for live learning?</h3>
          <p className="text-blue-300 mb-6">Explore interactive roadmaps and join a cohort with mentorship.</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/919100028801"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-blue-500/50"
          >
            Message on WhatsApp <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

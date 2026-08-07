"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STARTING_POINTS, TARGET_ROLES, CAREER_TRANSITIONS, getRole } from "@/lib/knowledge-graph";

export default function CareerPathSimulator() {
  const [from, setFrom] = useState("devops-engineer");
  const [to, setTo] = useState("mlops-engineer");

  const transition = useMemo(
    () => CAREER_TRANSITIONS.find((t) => t.from === from && t.to === to),
    [from, to],
  );

  const targetRole = getRole(to);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Where are you today?</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border-2 border-slate-900 rounded-lg px-4 py-3 text-sm font-semibold bg-white"
          >
            {STARTING_POINTS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Where do you want to go?</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border-2 border-slate-900 rounded-lg px-4 py-3 text-sm font-semibold bg-white"
          >
            {TARGET_ROLES.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {transition ? (
        <div className="border-2 border-slate-900 rounded-lg p-6 shadow-[4px_4px_0_#0f172a] bg-white mb-8">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Your fastest path</h2>
          <div className="flex flex-col items-center gap-1 mb-6">
            {transition.path.map((step, i) => (
              <div key={step} className="flex flex-col items-center w-full">
                <div className="bg-blue-700 text-white text-sm font-bold px-6 py-2 rounded-lg w-full max-w-xs text-center">
                  {step}
                </div>
                {i < transition.path.length - 1 && <span className="text-slate-400 text-lg py-1">↓</span>}
              </div>
            ))}
          </div>
          {transition.skipIfKnown.length > 0 && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3">
              <strong>Skip if you know:</strong> {transition.skipIfKnown.join(", ")}
            </p>
          )}
          <p className="text-sm text-orange-800 bg-orange-50 border border-orange-200 rounded-lg p-3">
            <strong>Must learn:</strong> {transition.additionalSkills.join(", ")}
          </p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 mb-8 text-sm text-slate-600">
          No pre-built path for this combination yet. Explore the{" "}
          <Link href="/universe/" className="text-blue-700 font-semibold hover:underline">AI Universe</Link>{" "}
          or browse <Link href="/roadmap/" className="text-blue-700 font-semibold hover:underline">role roadmaps</Link>.
        </div>
      )}

      {targetRole && (
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h3 className="font-bold text-slate-900 mb-2">{targetRole.name} — Role DNA</h3>
          <div className="space-y-2 mb-4">
            {targetRole.dna.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-36 shrink-0">{d.label}</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-700 rounded-full" style={{ width: `${d.score * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
          {targetRole.roadmapSlug && (
            <Link href={`/roadmap/${targetRole.roadmapSlug}/`} className="text-sm font-bold text-blue-700 hover:underline">
              Full {targetRole.name} roadmap →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

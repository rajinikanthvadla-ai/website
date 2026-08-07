import Link from "next/link";
import type { SkillNode } from "@/lib/knowledge-graph/types";
import {
  getSkill,
  getConnectedSkills,
  getFailuresForSkill,
  MATURITY_LABELS,
  VIEW_MODES,
} from "@/lib/knowledge-graph";
import { LINKS } from "@/lib/constants";

type Props = { skill: SkillNode };

export default function SkillPageContent({ skill }: Props) {
  const connected = getConnectedSkills(skill.id);
  const failures = getFailuresForSkill(skill.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${skill.name} — AI Engineering Skill Guide`,
    description: skill.summary,
    author: { "@type": "Person", name: "Rajinikanth Vadla" },
    dateModified: "2026-08-07",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: skill.interviewPoints.slice(0, 3).map((q) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: skill.modes.interview },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="border-b border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <Link href="/universe/" className="text-blue-700 font-semibold hover:underline">Universe</Link>
            <span className="text-slate-400 mx-2">/</span>
            <span className="text-slate-600">{skill.name}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">{skill.name}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{skill.summary}</p>
          <p className="text-sm text-slate-500 mt-3">
            Maturity level: <strong>{skill.maturity}</strong> — {MATURITY_LABELS[skill.maturity]}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-6">Six perspectives on {skill.name}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VIEW_MODES.map((m) => (
              <div key={m.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <p className="text-xs font-bold uppercase text-blue-700 mb-2">{m.label}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{skill.modes[m.id]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 mb-3">What & Why</h2>
            <p className="text-sm text-slate-700 mb-3"><strong>What:</strong> {skill.what}</p>
            <p className="text-sm text-slate-700"><strong>Why:</strong> {skill.why}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 mb-3">Build this</h2>
            <p className="text-sm text-slate-700">{skill.buildProject}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Production reality</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {skill.productionReality.map((item) => (
              <li key={item} className="text-sm text-slate-700 flex gap-2">
                <span className="text-red-600 font-bold">!</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Interview preparation</h2>
          <ul className="space-y-2">
            {skill.interviewPoints.map((q) => (
              <li key={q} className="text-sm text-slate-700 bg-white border border-slate-200 rounded-lg p-3">{q}</li>
            ))}
          </ul>
        </div>
      </section>

      {failures.length > 0 && (
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Failure scenario: {failures[0].title}</h2>
            <dl className="space-y-3 text-sm">
              <div><dt className="font-bold text-slate-800">Symptom</dt><dd className="text-slate-600">{failures[0].symptom}</dd></div>
              <div><dt className="font-bold text-slate-800">Root cause</dt><dd className="text-slate-600">{failures[0].rootCause}</dd></div>
              <div><dt className="font-bold text-slate-800">Permanent fix</dt><dd className="text-slate-600">{failures[0].permanentFix}</dd></div>
            </dl>
          </div>
        </section>
      )}

      {connected.length > 0 && (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Connected skills</h2>
            <div className="flex flex-wrap gap-2">
              {connected.map((c) => (
                <Link key={c.id} href={`/skills/${c.slug}/`} className="text-sm font-semibold bg-white border-2 border-slate-900 px-4 py-2 rounded-lg shadow-[2px_2px_0_#0f172a] hover:bg-blue-50">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-blue-100 mb-4">Explore {skill.name} in the interactive universe or train with live cohorts.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/universe/" className="bg-white text-blue-700 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-50">
              Open Universe
            </Link>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
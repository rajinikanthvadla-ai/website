import type { Metadata } from "next";
import Link from "next/link";
import { getAllRoadmaps } from "@/lib/roadmaps";
import { LINKS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Career Roadmaps 2026: MLOps, LLMOps, FDE, AI Engineer Paths",
  description:
    "Free career roadmaps for AI Engineer, MLOps, LLMOps, FDE, NLP, AI Platform, and AI Infrastructure roles. Skills, salary guides, and step-by-step learning paths for 2026.",
  keywords: [
    "AI career roadmap",
    "MLOps engineer roadmap",
    "LLMOps career path",
    "AI engineer roadmap 2026",
    "FDE career path",
    "AI infrastructure engineer roadmap",
    "machine learning career India",
  ],
  alternates: { canonical: `${SITE.url}/roadmap/` },
  openGraph: {
    title: "AI Career Roadmaps 2026",
    description: "Step-by-step career paths for AI, MLOps, LLMOps, FDE, and platform engineering roles.",
    url: `${SITE.url}/roadmap/`,
  },
};

const ROADMAP_ICONS: Record<string, string> = {
  "ai-engineer": "🤖",
  "fde-engineer": "🚀",
  "ai-ml-engineer": "🧠",
  "mlops-engineer": "⚙️",
  "llmops-engineer": "💬",
  "nlp-engineer": "📝",
  "ai-platform-engineer": "🏗️",
  "ai-infrastructure-engineer": "🖥️",
};

export default function RoadmapHubPage() {
  const roadmaps = getAllRoadmaps();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Career Roadmaps 2026",
    description: "Career roadmaps for AI engineering roles by Rajinikanth Vadla",
    itemListElement: roadmaps.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.title,
      url: `${SITE.url}/roadmap/${r.slug}/`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="notion-eyebrow justify-center mb-3">
            <span className="notion-eyebrow-dot" />
            Free Career Guides · Updated Aug 2026
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
            AI Career Roadmaps for 2026
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Step-by-step learning paths for the most in-demand AI roles in India and globally.
            Skills, salary ranges, projects, and tools — updated for the current job market.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap) => (
              <Link
                key={roadmap.slug}
                href={`/roadmap/${roadmap.slug}/`}
                className="group bg-white border-2 border-slate-900 rounded-lg p-6 shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-3">{ROADMAP_ICONS[roadmap.slug] ?? "📋"}</div>
                <h2 className="font-display text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {roadmap.shortTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{roadmap.intro}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">{roadmap.salaryIndia}</span>
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">
                    View roadmap &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Want guided learning?</h2>
          <p className="text-slate-600 mb-8">
            These roadmaps map to Rajinikanth Vadla&apos;s live cohort programs — 150+ hours of hands-on labs,
            capstone projects, and 1-on-1 mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mlops-aiops-masterclass/"
              className="inline-flex justify-center bg-blue-700 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              MLOps Masterclass &rarr;
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center bg-emerald-600 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getAllRoadmaps } from "@/lib/roadmaps";
import TechLogo from "@/components/universe/TechLogo";
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

/** Each roadmap gets a representative technology mark and a card accent. */
const ROADMAP_STYLE: Record<string, { logo: string; accent: string }> = {
  "ai-engineer": { logo: "llms", accent: "bg-[#dbeafe]" },
  "fde-engineer": { logo: "mcp", accent: "bg-[#ffedd5]" },
  "ai-ml-engineer": { logo: "python", accent: "bg-[#dbeafe]" },
  "mlops-engineer": { logo: "mlflow", accent: "bg-[#fef9c3]" },
  "llmops-engineer": { logo: "rag", accent: "bg-[#ffedd5]" },
  "nlp-engineer": { logo: "langchain", accent: "bg-[#dbeafe]" },
  "ai-platform-engineer": { logo: "kubernetes", accent: "bg-[#fef9c3]" },
  "ai-infrastructure-engineer": { logo: "gpu", accent: "bg-[#ffedd5]" },
};

const HERO_LOGOS = ["linux", "python", "docker", "kubernetes", "mlflow", "rag", "vllm", "gpu"];

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

      {/* ── Hero ── */}
      <section className="notion-hero">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Free career guides · Updated Aug 2026
          </span>
          <h1 className="notion-hero-title !mb-5">
            AI Career <span className="notion-hero-accent">Roadmaps</span> for 2026
          </h1>
          <p className="notion-hero-lead !mx-auto !text-center">
            Step-by-step learning paths for the most in-demand AI roles in India and globally — the
            skills, the salary range, the projects that get you hired, and the order to learn them in.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 my-8">
            {HERO_LOGOS.map((slug, i) => (
              <span
                key={slug}
                className="inline-flex items-center justify-center w-12 h-12 rounded-sm border-2 border-[#0f172a] bg-white text-[#0f172a] shadow-[3px_3px_0_#0f172a] animate-fade-in-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <TechLogo slug={slug} className="w-6 h-6" />
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/universe/" className="notion-btn notion-btn--accent">
              Explore the interactive map
            </Link>
            <Link href="/path/" className="notion-btn notion-btn--ghost">
              Find my path
            </Link>
          </div>
        </div>
      </section>

      {/* ── Roadmap cards ── */}
      <section className="notion-section notion-section--paper">
        <div className="max-w-6xl mx-auto px-6">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Pick a destination</span>
            <h2>{roadmaps.length} career paths, mapped end to end</h2>
            <p>Each roadmap breaks the journey into phases with the skills and projects for each one.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmaps.map((roadmap, i) => {
              const style = ROADMAP_STYLE[roadmap.slug] ?? { logo: "llms", accent: "bg-[#dbeafe]" };

              return (
                <Link
                  key={roadmap.slug}
                  href={`/roadmap/${roadmap.slug}/`}
                  className="lf-card group p-5 flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span
                    className={`lf-logo inline-flex items-center justify-center w-12 h-12 rounded-sm border-2 border-[#0f172a] text-[#0f172a] mb-3.5 ${style.accent}`}
                  >
                    <TechLogo slug={style.logo} className="w-6 h-6" />
                  </span>

                  <h3 className="font-display text-lg font-bold text-[#0f172a] mb-1.5 group-hover:text-blue-700 transition-colors">
                    {roadmap.shortTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {roadmap.intro}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-4 pt-3.5 border-t-2 border-dashed border-slate-300">
                    <span className="text-sm font-extrabold text-blue-700">{roadmap.salaryIndia}</span>
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500 group-hover:text-blue-700 transition-colors">
                      {roadmap.phases.length} phases &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="notion-cta-band py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-3">
            Want guided learning?
          </h2>
          <p className="text-slate-700 mb-7 leading-relaxed">
            These roadmaps map to the live cohort programs — 150+ hours of hands-on labs, capstone
            projects, and 1-on-1 mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/mlops-aiops-masterclass/" className="notion-btn notion-btn--ink">
              MLOps Masterclass
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--ghost"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

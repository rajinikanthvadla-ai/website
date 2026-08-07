import type { Metadata } from "next";
import Link from "next/link";
import LearningFlow from "@/components/universe/LearningFlow";
import TechLogo from "@/components/universe/TechLogo";
import { SKILLS, ROLES } from "@/lib/knowledge-graph";
import { SITE, LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Engineering Universe — Interactive Skill & Career Map",
  description:
    "Follow one clear path from Linux and Python to Kubernetes, MLOps, RAG, agents, and GPU infrastructure. Pick a target role and see exactly which skills you need, what to build, and what breaks in production.",
  keywords: [
    "AI engineering universe",
    "MLOps roadmap interactive",
    "LLMOps career map",
    "AI skills knowledge graph",
    "production AI engineering",
    "Kubernetes for MLOps",
    "RAG architecture roadmap",
  ],
  alternates: { canonical: `${SITE.url}/universe/` },
  openGraph: {
    title: "AI Engineering Universe",
    description: "Interactive map of modern production AI engineering skills, roles, and career paths.",
    url: `${SITE.url}/universe/`,
  },
};

/** Logos shown in the hero strip, in learning order. */
const HERO_LOGOS = ["linux", "git", "python", "docker", "kubernetes", "cloud", "mlflow", "pytorch", "rag", "fastapi", "prometheus", "gpu"];

export default function UniversePage() {
  const skillList = SKILLS.filter((s) => s.level === "technology");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Engineering Skill Map",
    description: "Skills required for production AI engineering roles, in learning order.",
    itemListElement: skillList.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      description: s.summary,
      url: `${SITE.url}/skills/${s.slug}/`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero (server rendered for SEO) ── */}
      <section className="notion-hero">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <span className="notion-eyebrow">
            <span className="notion-eyebrow-dot" />
            Free interactive career map · Updated Aug 2026
          </span>
          <h1 className="notion-hero-title !mb-4">
            From DevOps to <span className="notion-hero-accent">Production AI</span>
          </h1>
          <p className="notion-hero-lead">
            One clear path — not a wall of boxes. Twenty-three market-critical skills in six stages:
            Git, SQL, Cloud, Helm, Grafana, PyTorch, FastAPI, and everything in between. Pick a target
            role and the map greys out skills you do not need.
          </p>
          <p className="notion-hero-note">
            Every skill answers the same four questions: what it is, why it exists, what to build with
            it, and what breaks at 2am.
          </p>

          {/* Animated logo strip */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
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

          <div className="flex flex-wrap gap-3">
            <Link href="/path/" className="notion-btn notion-btn--accent">
              Find My AI Path
            </Link>
            <Link href="/compare/" className="notion-btn notion-btn--ghost">
              Compare Careers
            </Link>
            <Link href="/roadmap/" className="notion-btn notion-btn--ink">
              Role Roadmaps
            </Link>
          </div>
        </div>
      </section>

      {/* ── The interactive flow ── */}
      <section className="notion-section notion-section--paper">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="notion-section-head !mb-0 !mx-0 !text-left !max-w-2xl">
            <span className="notion-section-eyebrow">The path</span>
            <h2>Six stages, in order</h2>
            <p>
              Tap any skill to open it. Tick the box to track what you have finished — your progress
              stays in this browser.
            </p>
          </div>
        </div>
        <LearningFlow />
      </section>

      {/* ── Indexable skill directory ── */}
      <section className="notion-section notion-section--white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Skill library</span>
            <h2>Every skill, explained in depth</h2>
            <p>
              Each page covers what the technology is, why it exists, the topics to learn, a project to
              build, production failure modes, and interview talking points.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillList.map((skill) => (
              <Link
                key={skill.id}
                href={`/skills/${skill.slug}/`}
                className="lf-card group p-4 flex items-start gap-3"
              >
                <span className="lf-logo shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-sm border-2 border-[#0f172a] bg-[#dbeafe] text-[#0f172a]">
                  <TechLogo slug={skill.slug} className="w-5 h-5" />
                </span>
                <span>
                  <span className="block font-display font-bold text-sm text-[#0f172a] group-hover:text-blue-700 transition-colors">
                    {skill.name}
                  </span>
                  <span className="block text-xs text-slate-600 leading-snug mt-0.5">{skill.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role directory ── */}
      <section className="notion-section notion-section--cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Destinations</span>
            <h2>Where this path can take you</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((role) => (
              <div key={role.id} className="lf-card p-5 flex flex-col">
                <h3 className="font-display text-lg font-bold text-[#0f172a] mb-1.5">{role.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{role.description}</p>
                <p className="text-sm font-extrabold text-blue-700 mt-3">{role.salaryIndia}</p>
                {role.roadmapSlug && (
                  <Link
                    href={`/roadmap/${role.roadmapSlug}/`}
                    className="text-xs font-extrabold uppercase tracking-wide text-[#0f172a] hover:text-blue-700 mt-2"
                  >
                    View roadmap &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="notion-cta-band py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-3">
            Want someone to walk this path with you?
          </h2>
          <p className="text-slate-700 mb-7 leading-relaxed">
            The live cohorts follow this exact map — hands-on labs, capstone projects, and 1-on-1
            mentorship instead of watching videos alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/mlops-aiops-masterclass/" className="notion-btn notion-btn--ink">
              See the MLOps Masterclass
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LINKS, SITE } from "@/lib/constants";
import { RESUME_ROLES, type ResumeRole } from "@/lib/resume-roles";
import { RESUME_SERVICE_TIERS } from "@/lib/resume-service";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return RESUME_ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = RESUME_ROLES.find((r) => r.slug === slug);
  if (!role) return {};
  return {
    title: role.metaTitle,
    description: role.metaDescription,
    keywords: role.keywords,
    alternates: { canonical: `${SITE.url}/resume-prep/${role.slug}/` },
    openGraph: {
      title: role.metaTitle,
      description: role.metaDescription,
      url: `${SITE.url}/resume-prep/${role.slug}/`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function ResumeRolePage({ params }: Props) {
  const { slug } = await params;
  const role = RESUME_ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  const others = RESUME_ROLES.filter((r) => r.slug !== role.slug).slice(0, 6);
  const recommendedTier = RESUME_SERVICE_TIERS.find((t) => t.recommended)!;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `What should an ${role.shortTitle} resume include?`, acceptedAnswer: { "@type": "Answer", text: role.mustHaves.join(". ") } },
      { "@type": "Question", name: `What makes an ${role.shortTitle} resume stand out?`, acceptedAnswer: { "@type": "Answer", text: role.differentiators.join(". ") } },
      { "@type": "Question", name: `What are common ${role.shortTitle} resume mistakes?`, acceptedAnswer: { "@type": "Answer", text: role.mistakes.join(". ") } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="border-b-2 border-[#0f172a] bg-[#fef9c3] py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/resume-prep/" className="text-xs font-bold text-slate-500 hover:text-[#0f172a] mb-4 inline-block">
            ← All resume profiles
          </Link>
          <span className="inline-block text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] border-2 border-[#0f172a] bg-white px-3 py-1 rounded-sm shadow-[2px_2px_0_#0f172a] mb-4">
            {role.shortTitle} Resume
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-4">
            {role.h1}
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-5">{role.intro}</p>
          <div className="flex flex-wrap gap-2">
            <span className="resume-hero-pill">Salary: {role.salaryIndia}</span>
            <span className="resume-hero-pill">Global: {role.salaryGlobal}</span>
            <span className="resume-hero-pill">{role.atsKeywords.length} ATS keywords</span>
          </div>
        </div>
      </section>

      {/* Must-haves */}
      <Section title="What every resume must prove" tone="white">
        <ul className="resume-check-list">
          {role.mustHaves.map((item) => (
            <li key={item}>
              <span className="resume-check-icon">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Differentiators */}
      <Section title="What makes you stand out" tone="cream">
        <ul className="resume-check-list resume-check-list--star">
          {role.differentiators.map((item) => (
            <li key={item}>
              <span className="resume-check-icon resume-check-icon--star">★</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Portfolio projects */}
      <Section title="Portfolio projects to put on your resume" tone="white">
        <div className="grid sm:grid-cols-3 gap-4">
          {role.portfolioProjects.map((p) => (
            <div key={p.title} className="resume-project-card">
              <h3 className="font-display font-bold text-[#0f172a] text-base mb-1">{p.title}</h3>
              <p className="text-xs text-slate-500 font-mono mb-2">{p.stack}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{p.impact}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ATS keywords */}
      <Section title="ATS keywords for this role" tone="cream">
        <div className="flex flex-wrap gap-2">
          {role.atsKeywords.map((kw) => (
            <span key={kw} className="resume-ats-chip">{kw}</span>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
          Include these verbatim where they match your real experience. ATS systems scan for exact terms — but never lie. We help you place them truthfully during the rewrite.
        </p>
      </Section>

      {/* Bullet templates */}
      <Section title="Bullet templates you can copy" tone="white">
        <div className="space-y-3">
          {role.bulletTemplates.map((b, i) => (
            <div key={i} className="resume-bullet-template">
              <span className="resume-bullet-num">{i + 1}</span>
              <code className="resume-bullet-code">{b}</code>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Replace placeholders like <code className="text-orange-600 font-bold">{`{X}`}</code>, <code className="text-orange-600 font-bold">{`{N}`}</code>, <code className="text-orange-600 font-bold">{`{latency}`}</code> with your real numbers.
        </p>
      </Section>

      {/* Mistakes */}
      <Section title="Common mistakes to avoid" tone="cream">
        <ul className="resume-check-list resume-check-list--cross">
          {role.mistakes.map((item) => (
            <li key={item}>
              <span className="resume-check-icon resume-check-icon--cross">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <section className="py-14 md:py-16 bg-[#0f172a] text-white border-y-2 border-[#0f172a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#fef9c3]">
            Get your {role.shortTitle} resume rewritten
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            {recommendedTier.name} at {recommendedTier.price} — {recommendedTier.turnaround} turnaround, 2 revisions, role-specific ATS optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent !text-sm">
              Book on WhatsApp
            </a>
            <Link href="/resume-prep/" className="notion-btn notion-btn--ghost !text-sm !text-white !border-white">
              View all roles
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-10 bg-[#faf9f6] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-lg font-bold text-[#0f172a] mb-4 text-center">Other resume profiles</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {others.map((r) => (
              <Link key={r.slug} href={`/resume-prep/${r.slug}/`} className="resume-role-chip">
                {r.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, tone, children }: { title: string; tone: "white" | "cream"; children: React.ReactNode }) {
  return (
    <section className={`py-12 md:py-14 ${tone === "cream" ? "bg-[#faf9f6] border-b border-slate-200" : "bg-white border-b border-slate-200"}`}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-[#0f172a] mb-5">{title}</h2>
        {children}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import { RESUME_ROLES } from "@/lib/resume-roles";
import { RESUME_SERVICE_TIERS, RESUME_SERVICE_FAQS } from "@/lib/resume-service";

export const metadata: Metadata = {
  title: "AI / ML / DevOps Resume Writing Service 2026 | ATS-Ready | Rajinikanth Vadla",
  description:
    "Resume writing service for AI Engineers, MLOps, LLMOps, ML Engineers, Data Scientists, DevOps, Platform, Cloud, GenAI, NLP, and SRE roles. ATS-optimized, role-specific bullets, portfolio projects. ₹1,999 review to ₹9,999 career package.",
  keywords: [
    "AI engineer resume writing",
    "MLOps resume service",
    "LLMOps resume",
    "ML engineer resume",
    "data scientist resume",
    "DevOps resume writing",
    "ATS resume service",
    "resume writing India",
    "resume writing USA",
    "resume writing UK",
  ],
  alternates: { canonical: `${SITE.url}/resume-prep/` },
  openGraph: {
    title: "AI / ML / DevOps Resume Writing Service",
    description: "ATS-ready resumes for AI, ML, MLOps, LLMOps, DevOps, and Data roles. Built by practitioners.",
    url: `${SITE.url}/resume-prep/`,
    locale: "en_US",
    type: "website",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  AI: "AI / GenAI",
  ML: "Machine Learning",
  DevOps: "DevOps / SRE",
  Data: "Data",
  Cloud: "Cloud / Infra",
};

export default function ResumePrepHubPage() {
  const ultra = RESUME_ROLES.filter((r) => r.traffic === "ultra");
  const high = RESUME_ROLES.filter((r) => r.traffic === "high");

  return (
    <>
      {/* Hero */}
      <section className="border-b-2 border-[#0f172a] bg-[#fef9c3] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] border-2 border-[#0f172a] bg-white px-3 py-1 rounded-sm shadow-[2px_2px_0_#0f172a] mb-5">
            Resume Prep Service
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
            AI / ML / DevOps resumes that{" "}
            <span className="text-orange-600">get shortlisted</span>
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Role-specific resume writing for AI Engineers, MLOps, LLMOps, ML Engineers, Data Scientists,
            DevOps, Platform, Cloud, GenAI, NLP, and SRE. ATS-optimized bullets, portfolio projects, and
            measurable impact — built by practitioners who hire for these roles.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink !text-sm">
              Get your resume on WhatsApp
            </a>
            <a href="#pricing" className="notion-btn notion-btn--accent !text-sm">
              View pricing
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b-2 border-[#0f172a] bg-[#0f172a] text-white py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: `${RESUME_ROLES.length}`, label: "Job profiles covered" },
            { value: "ATS", label: "Keyword optimized" },
            { value: "3 days", label: "Fastest turnaround" },
            { value: "2 rounds", label: "Revisions included" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl md:text-3xl font-bold text-[#fef9c3]">{s.value}</p>
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role grid — ultra traffic */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-2 text-center">
            Most-searched AI / ML roles
          </h2>
          <p className="text-sm text-slate-500 text-center mb-10">
            Dedicated resume page for each role — with must-haves, differentiators, ATS keywords, and bullet templates
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {ultra.map((role) => (
              <Link key={role.slug} href={`/resume-prep/${role.slug}/`} className="resume-role-card resume-role-card--ultra group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="resume-role-tag">{CATEGORY_LABELS[role.category]}</span>
                  <span className="resume-role-traffic">★ High traffic</span>
                </div>
                <h3 className="font-display font-bold text-[#0f172a] text-lg group-hover:text-orange-600 transition-colors">
                  {role.shortTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{role.salaryIndia} · {role.salaryGlobal}</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">{role.intro}</p>
                <span className="mt-4 inline-block text-xs font-bold text-orange-600">View resume guide →</span>
              </Link>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold text-[#0f172a] mb-5 text-center">More roles</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {high.map((role) => (
              <Link key={role.slug} href={`/resume-prep/${role.slug}/`} className="resume-role-card group">
                <span className="resume-role-tag">{CATEGORY_LABELS[role.category]}</span>
                <h3 className="font-display font-bold text-[#0f172a] text-base mt-2 group-hover:text-orange-600 transition-colors">
                  {role.shortTitle}
                </h3>
                <p className="text-[0.65rem] text-slate-500 mt-1">{role.salaryIndia}</p>
                <span className="mt-3 inline-block text-[0.65rem] font-bold text-orange-600">Resume guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 bg-[#faf9f6] border-y-2 border-[#0f172a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-2 text-center">
            Pricing
          </h2>
          <p className="text-sm text-slate-500 text-center mb-10">
            One-time payment · WhatsApp to book · revisions included
          </p>
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {RESUME_SERVICE_TIERS.map((tier) => (
              <div key={tier.id} className={`resume-tier ${tier.recommended ? "resume-tier--pro" : ""}`}>
                {tier.recommended && (
                  <div className="resume-tier-badge">Most popular</div>
                )}
                <div className="p-5">
                  <h3 className="font-display font-bold text-[#0f172a] text-lg">{tier.name}</h3>
                  <p className="mt-3">
                    <span className="font-display text-3xl font-bold text-[#0f172a]">{tier.price}</span>
                    <span className="text-xs text-slate-500 font-semibold ml-1">{tier.priceNote}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Turnaround: {tier.turnaround}</p>
                </div>
                <ul className="px-5 pb-5 flex-1 space-y-2 text-sm text-slate-600">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-orange-500 font-bold shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="p-5 pt-0">
                  <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={`resume-tier-cta ${tier.recommended ? "resume-tier-cta--pro" : ""}`}>
                    Book {tier.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-6 text-center">FAQ</h2>
          <div className="space-y-3">
            {RESUME_SERVICE_FAQS.map((faq) => (
              <details key={faq.q} className="resume-faq">
                <summary className="font-bold text-[#0f172a] flex justify-between items-center">
                  {faq.q}
                  <span className="text-xl text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

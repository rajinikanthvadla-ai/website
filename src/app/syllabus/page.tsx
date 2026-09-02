import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE, MLOPS_MASTERCLASS_DURATION, AI_AUTOMATION_DURATION, AI_AUTOMATION_PRICE } from "@/lib/constants";
import {
  MLOPS_MASTERCLASS_SYLLABUS,
  MLOPS_PROGRAM_INCLUDES,
  MLOPS_PREREQUISITES,
  MLOPS_TARGET_AUDIENCE,
} from "@/lib/masterclass-syllabus";
import { AI_AUTOMATION_SYLLABUS_RICH } from "@/lib/ai-automation-content";
import MasterclassSyllabus from "@/components/masterclass/MasterclassSyllabus";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Course Syllabus | MLOps, AIOps, LLMOps, AI Agents & FDE | Rajinikanth Vadla",
  description:
    "Complete handy syllabus for MLOps, AIOps, LLMOps, AI Agents, and FDE masterclass plus AI Automation course. Module-by-module topics, labs, capstones, pricing, and WhatsApp enrollment.",
  keywords: [
    "MLOps syllabus",
    "AIOps syllabus",
    "LLMOps syllabus",
    "AI Agents syllabus",
    "FDE course syllabus",
    "MLOps course curriculum",
    "AI engineering syllabus",
    "Rajinikanth Vadla syllabus",
  ],
  alternates: { canonical: `${SITE.url}/syllabus/` },
  openGraph: {
    title: "MLOps, AIOps, LLMOps, AI Agents & FDE Course Syllabus",
    description:
      "Full module syllabus for the job-ready AI engineering masterclass and AI Automation course. Clear curriculum for students before they enroll.",
    url: `${SITE.url}/syllabus/`,
    type: "website",
  },
};

const courseListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rajinikanth Vadla Course Syllabus",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "MLOps, AIOps, LLMOps, AI Agents & FDE Masterclass Syllabus",
      url: `${SITE.url}/syllabus/#masterclass`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI-Powered Automation Course Syllabus",
      url: `${SITE.url}/syllabus/#automation`,
    },
  ],
};

export default function SyllabusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }} />

      <section className="notion-section notion-section--white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Handy course syllabus
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0f172a] mt-4 mb-4 leading-tight">
            MLOps, AIOps, LLMOps, AI Agents &amp; FDE Syllabus
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Everything students ask for before joining — full module list, labs, projects, who it is for, and how to contact for batch details.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#masterclass" className="notion-btn notion-btn--ink">
              Masterclass syllabus
            </a>
            <a href="#automation" className="notion-btn notion-btn--ghost">
              AI Automation syllabus
            </a>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
              WhatsApp for batch details
            </a>
          </div>
        </div>
      </section>

      <section className="notion-section notion-section--cream border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Duration", value: MLOPS_MASTERCLASS_DURATION },
              { label: "Live fee", value: "₹40,000 (2 installments)" },
              { label: "Recordings", value: "₹30,000 lifetime" },
              { label: "Focus", value: "MLOps · AIOps · LLMOps · Agents · FDE" },
            ].map((item) => (
              <div key={item.label} className="panel p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">{item.label}</p>
                <p className="font-display font-bold text-[#0f172a]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="masterclass" className="notion-section notion-section--white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <span className="notion-dash-badge mb-3 inline-flex">Flagship</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
              Masterclass curriculum ({MLOPS_MASTERCLASS_SYLLABUS.length} modules)
            </h2>
            <p className="text-slate-600 max-w-3xl leading-relaxed">
              Job-ready path from fundamentals to production: DevOps foundations, MLOps, LLMOps, AIOps, AI Agents, FDE skills, and 4 portfolio capstones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {MLOPS_MASTERCLASS_SYLLABUS.map((mod) => (
              <article
                key={mod.module}
                className="panel p-5 border border-slate-200"
              >
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Module {mod.module}</p>
                <h3 className="font-display font-bold text-[#0f172a] mb-1">{mod.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{mod.duration}</p>
                <p className="text-sm text-slate-600 line-clamp-2">{mod.summary}</p>
              </article>
            ))}
          </div>

          <div className="mb-10">
            <MasterclassSyllabus variant="accordion" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="panel p-6">
              <h3 className="font-display font-bold text-[#0f172a] mb-3">Program includes</h3>
              <ul className="space-y-2">
                {MLOPS_PROGRAM_INCLUDES.map((item) => (
                  <li key={item.label} className="text-sm text-slate-600">
                    <span className="font-semibold text-[#0f172a]">{item.label}:</span> {item.value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h3 className="font-display font-bold text-[#0f172a] mb-3">Who this is for</h3>
              <ul className="space-y-2">
                {MLOPS_TARGET_AUDIENCE.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-blue-700">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h3 className="font-display font-bold text-[#0f172a] mb-3">Prerequisites</h3>
              <ul className="space-y-2 mb-5">
                {MLOPS_PREREQUISITES.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-blue-700">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/mlops-aiops-masterclass/" className="notion-dash-link text-sm font-bold">
                Open full masterclass page &rarr;
              </Link>
            </div>
          </div>

          <div className="panel p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-2 border-slate-900 shadow-[4px_4px_0_#0f172a]">
            <div>
              <h3 className="font-display font-bold text-lg text-[#0f172a]">Ready to join the masterclass?</h3>
              <p className="text-sm text-slate-600 mt-1">Ask for current batch dates, demo session, or fee details on WhatsApp.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent text-center">
                WhatsApp syllabus help
              </a>
              <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink text-center">
                Enroll now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="automation" className="notion-section notion-section--cream border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <span className="notion-dash-badge mb-3 inline-flex">New</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
              AI Automation syllabus ({AI_AUTOMATION_DURATION})
            </h2>
            <p className="text-slate-600 max-w-3xl leading-relaxed">
              Build company AI agents with Cursor, MCP, RAG, Bedrock, and business metrics. Fee: {AI_AUTOMATION_PRICE} with lifetime recordings.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {AI_AUTOMATION_SYLLABUS_RICH.map((mod) => (
              <article key={mod.module} className="panel p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-wide">Module {mod.module}</p>
                    <h3 className="font-display font-bold text-xl text-[#0f172a]">{mod.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-blue-700">{mod.duration}</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{mod.summary}</p>
                <p className="text-sm font-semibold text-[#0f172a] mb-3">Outcome: {mod.outcome}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {mod.sections.flatMap((section) =>
                    section.items.map((item) => (
                      <li key={`${section.title}-${item}`} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-blue-700 shrink-0">·</span>
                        <span>
                          <span className="font-semibold text-slate-800">{section.title}:</span> {item}
                        </span>
                      </li>
                    )),
                  )}
                </ul>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/courses/ai-automation/" className="notion-btn notion-btn--ink">
              Open AI Automation page &rarr;
            </Link>
            <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
              WhatsApp about Automation
            </a>
          </div>
        </div>
      </section>

      <section className="notion-section notion-section--white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-3">
            Prepare for interviews while you learn
          </h2>
          <p className="text-slate-600 mb-6">
            Free AI/ML interview questions covering MLOps, LLMOps, AI Agents, FDE, and system design — written for the same roles this syllabus trains.
            Also review production architecture diagrams used in interviews.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/interview-questions/" className="notion-btn notion-btn--ghost">
              Open interview questions &rarr;
            </Link>
            <Link href="/architecture/" className="notion-btn notion-btn--ink">
              Architecture diagrams &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Still deciding which course fits you?"
        subtitle="Message on WhatsApp with your background (DevOps, ML, QA, fresher). I will recommend masterclass, automation, or mentorship."
      />
    </>
  );
}

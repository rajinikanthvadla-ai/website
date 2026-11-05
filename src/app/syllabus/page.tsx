import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CoursePrice } from "@/components/LocalPrice";
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
      <BreadcrumbJsonLd items={[{ name: "Courses", path: "/courses/" }, { name: "Syllabus", path: "/syllabus/" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }} />

      <section className="border-b border-slate-200 bg-white py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-2">Course syllabus</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            What you learn — week by week
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-6">
            Clear modules, labs, and outcomes. Use the left list to jump. Ask on WhatsApp for the next live batch.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#masterclass" className="notion-btn notion-btn--ink">
              Masterclass
            </a>
            <a href="#automation" className="notion-btn notion-btn--ghost">
              AI Automation
            </a>
            <a
              href={LINKS.whatsappSyllabus}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--accent"
            >
              WhatsApp batch details
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Duration", value: MLOPS_MASTERCLASS_DURATION },
              { label: "Live fee", value: <CoursePrice plan="live" /> },
              { label: "Recordings", value: <><CoursePrice plan="recordings" /> lifetime</> },
              { label: "Focus", value: "MLOps · AIOps · LLMOps · Agents" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">{item.label}</p>
                <p className="font-display font-bold text-sm text-[#0f172a]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="masterclass" className="border-b border-slate-200 bg-[#f4f6f8] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wide text-orange-700">Flagship · {MLOPS_MASTERCLASS_SYLLABUS.length} modules</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mt-2 mb-2">
              Masterclass curriculum
            </h2>
            <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
              Fundamentals → MLOps → LLMOps → AIOps → Agents → FDE → portfolio capstones. Open one module at a time.
            </p>
          </div>

          <MasterclassSyllabus variant="rail" />

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-display font-bold text-[#0f172a] mb-3 text-sm">Includes</h3>
              <ul className="space-y-2">
                {MLOPS_PROGRAM_INCLUDES.map((item) => (
                  <li key={item.label} className="text-sm text-slate-600">
                    <span className="font-semibold text-[#0f172a]">{item.label}:</span> {item.value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-display font-bold text-[#0f172a] mb-3 text-sm">Who this is for</h3>
              <ul className="space-y-2">
                {MLOPS_TARGET_AUDIENCE.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-teal-600">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-display font-bold text-[#0f172a] mb-3 text-sm">Prerequisites</h3>
              <ul className="space-y-2 mb-4">
                {MLOPS_PREREQUISITES.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-teal-600">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/mlops-aiops-masterclass/" className="text-sm font-bold text-teal-700 underline underline-offset-2">
                Full masterclass page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="automation" className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wide text-orange-700">New · {AI_AUTOMATION_DURATION}</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mt-2 mb-2">
              AI Automation syllabus
            </h2>
            <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
              Cursor, MCP, RAG, Bedrock agents, business metrics. Fee: {AI_AUTOMATION_PRICE} with lifetime recordings.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {AI_AUTOMATION_SYLLABUS_RICH.map((mod) => (
              <details key={mod.module} className="rounded-lg border border-slate-200 bg-slate-50 group">
                <summary className="cursor-pointer list-none p-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">Module {mod.module}</p>
                    <h3 className="font-display font-bold text-lg text-[#0f172a]">{mod.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{mod.duration}</span>
                </summary>
                <div className="px-5 pb-5 border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-600 mb-3">{mod.summary}</p>
                  <p className="text-sm font-semibold text-[#0f172a] mb-3">Outcome: {mod.outcome}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {mod.sections.flatMap((section) =>
                      section.items.map((item) => (
                        <li key={`${section.title}-${item}`} className="text-sm text-slate-600 flex gap-2">
                          <span className="text-teal-600 shrink-0">·</span>
                          <span>
                            <span className="font-semibold text-slate-800">{section.title}:</span> {item}
                          </span>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              </details>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/courses/ai-automation/" className="notion-btn notion-btn--ink">
              AI Automation page
            </Link>
            <a
              href={LINKS.whatsappAutomation}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--accent"
            >
              WhatsApp about Automation
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title="Still deciding which course fits you?"
        subtitle="Message on WhatsApp with your background. I will recommend masterclass, automation, or mentorship."
      />
    </>
  );
}

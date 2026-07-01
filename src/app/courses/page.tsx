import type { Metadata } from "next";
import Link from "next/link";
import { COURSES, STRUCTURED_DATA } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "MLOps, AI Automation and AI Agents Training Courses",
  description:
    "Live online training by Rajinikanth Vadla: AI-Powered Automation course (2 months) and MLOps AIOps LLMOps masterclass (4-5 months, job ready). Hands-on labs, placement support.",
  keywords: [
    "MLOps course",
    "AI automation course",
    "MLOps training India",
    "AI agents course",
    "Rajinikanth Vadla courses",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/courses/" },
};

export default function CoursesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.courseList) }} />
      <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">Training programs</h1>
          <p className="text-slate-600 text-lg">
            Two live cohorts and mentorship. Full syllabus on each course page.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-5">
            {COURSES.map((c) => (
              <article
                key={c.title}
                className={`panel p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 ${
                  c.featured ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-blue-700"
                }`}
              >
                <div className="flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{c.badge}</span>
                  <h2 className="font-display font-bold text-xl text-slate-900 mt-1 mb-2">{c.title}</h2>
                  <p className="text-sm text-slate-600 mb-3">{c.description}</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {c.features.map((f) => (
                      <li key={f} className="text-xs text-slate-500">{f}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={c.href}
                  className={`shrink-0 text-center px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    c.featured ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                >
                  {c.ctaText} &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Questions about which program fits you?"
        subtitle="Message on WhatsApp with your background and goal. I will point you to the right path."
      />
    </>
  );
}

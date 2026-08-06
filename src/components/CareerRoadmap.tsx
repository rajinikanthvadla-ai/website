import Link from "next/link";
import type { CareerRoadmap } from "@/lib/roadmaps";
import { LINKS, SITE } from "@/lib/constants";

type Props = {
  roadmap: CareerRoadmap;
};

export default function CareerRoadmapPage({ roadmap }: Props) {
  const canonical = `${SITE.url}/roadmap/${roadmap.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: roadmap.title,
    description: roadmap.metaDescription,
    author: { "@type": "Person", name: "Rajinikanth Vadla", url: SITE.url },
    publisher: { "@type": "Organization", name: "Rajinikanth Vadla Training", url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    keywords: roadmap.keywords.join(", "),
    dateModified: "2026-08-06",
    datePublished: "2026-08-06",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: roadmap.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/roadmap/" className="text-sm font-semibold text-blue-700 hover:underline mb-4 inline-block">
            &larr; All career roadmaps
          </Link>
          <span className="notion-eyebrow mb-3">
            <span className="notion-eyebrow-dot" />
            Career Roadmap · Updated Aug 2026
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
            {roadmap.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">{roadmap.intro}</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white border-2 border-slate-900 rounded-lg px-5 py-3 shadow-[3px_3px_0_#0f172a]">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">India Salary</div>
              <div className="font-display text-xl font-bold text-blue-700">{roadmap.salaryIndia}</div>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-lg px-5 py-3 shadow-[3px_3px_0_#0f172a]">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Global Salary</div>
              <div className="font-display text-xl font-bold text-slate-900">{roadmap.salaryGlobal}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">What you need to know</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {roadmap.overview.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <span className="text-blue-600 font-bold shrink-0">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Step-by-step learning path</h2>
          <p className="text-slate-600 mb-10 text-sm">Follow these phases in order. Each builds on the previous.</p>
          <div className="space-y-6">
            {roadmap.phases.map((phase, i) => (
              <div
                key={phase.phase}
                className="bg-white border-2 border-slate-900 rounded-lg p-6 md:p-8 shadow-[4px_4px_0_#0f172a]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-sm bg-blue-700 text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900">{phase.phase}</h3>
                  <span className="text-xs font-bold uppercase tracking-wide text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {phase.duration}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Skills to learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill) => (
                        <span key={skill} className="text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Build these projects</h4>
                    <ul className="space-y-1.5">
                      {phase.projects.map((project) => (
                        <li key={project} className="text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-orange-500 font-bold shrink-0">→</span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Tools & technologies</h2>
          <div className="flex flex-wrap gap-2">
            {roadmap.tools.map((tool) => (
              <span key={tool} className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {roadmap.faqs.map((faq) => (
              <details key={faq.q} className="bg-white border border-slate-200 rounded-lg p-5 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-blue-700 text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to follow this roadmap with guidance?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Rajinikanth Vadla&apos;s live cohorts cover the skills in this roadmap with hands-on labs, capstone projects, and 1-on-1 mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={roadmap.relatedCourse.href}
              className="inline-flex justify-center bg-white text-blue-700 px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              {roadmap.relatedCourse.label} &rarr;
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center bg-emerald-600 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              WhatsApp for guidance
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

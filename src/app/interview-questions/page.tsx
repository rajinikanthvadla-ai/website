import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import { INTERVIEW_CATEGORIES, INTERVIEW_PAGE_INTRO } from "@/lib/interview-questions";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "AI / ML Interview Questions | MLOps, LLMOps, AI Agents, FDE | Rajinikanth Vadla",
  description:
    "Free AI and ML interview questions for MLOps, AIOps, LLMOps, AI Agents, FDE, GenAI, RAG, and AI system design. Practical answers for job interviews — aligned with live training.",
  keywords: [
    "AI interview questions",
    "ML interview questions",
    "MLOps interview questions",
    "LLMOps interview questions",
    "AI Agents interview questions",
    "FDE interview questions",
    "RAG interview questions",
    "GenAI interview questions",
    "AI system design interview",
  ],
  alternates: { canonical: `${SITE.url}/interview-questions/` },
  openGraph: {
    title: "AI / ML Interview Questions — MLOps, LLMOps, Agents, FDE",
    description:
      "Category-wise AI/ML interview Q&A for engineers preparing for MLOps, LLMOps, AI Agents, and FDE roles.",
    url: `${SITE.url}/interview-questions/`,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: INTERVIEW_CATEGORIES.flatMap((cat) =>
    cat.questions.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.a,
      },
    })),
  ),
};

export default function InterviewQuestionsPage() {
  const totalQuestions = INTERVIEW_CATEGORIES.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="notion-section notion-section--white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Free interview prep
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0f172a] mt-4 mb-4 leading-tight">
            {INTERVIEW_PAGE_INTRO.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
            {INTERVIEW_PAGE_INTRO.subtitle}
          </p>
          <p className="text-sm font-semibold text-blue-700 mb-8">
            {totalQuestions}+ questions · {INTERVIEW_CATEGORIES.length} categories · Updated for 2026 roles
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#categories" className="notion-btn notion-btn--ink">
              Browse categories
            </a>
            <Link href="/syllabus/" className="notion-btn notion-btn--ghost">
              View course syllabus
            </Link>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="categories" className="notion-section notion-section--cream border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {INTERVIEW_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="panel p-5 card-hover block border border-slate-200 hover:border-blue-300"
              >
                <h2 className="font-display font-bold text-[#0f172a] mb-1">{cat.title}</h2>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{cat.subtitle}</p>
                <p className="text-xs font-bold text-blue-700">{cat.questions.length} questions</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {INTERVIEW_CATEGORIES.map((cat) => (
        <section key={cat.id} id={cat.id} className="notion-section notion-section--white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="font-display text-3xl font-bold text-[#0f172a] mb-2">{cat.title}</h2>
              <p className="text-slate-600">{cat.subtitle}</p>
            </div>

            <div className="space-y-3">
              {cat.questions.map((qa) => (
                <details key={qa.q} className="panel group">
                  <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-display font-bold text-[#0f172a] text-base leading-snug hover:text-blue-700 transition-colors">
                    {qa.q}
                    <span className="text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1 border-t-2 border-dashed border-slate-200 pt-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{qa.a}</p>
                    {qa.tags?.length ? (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {qa.tags.map((tag) => (
                          <span key={tag} className="text-[11px] font-bold uppercase tracking-wide text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="notion-section notion-section--cream border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel p-8 border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-3">
              Want mock interviews with real feedback?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              The masterclass includes resume help, mock interviews, and placement support. Or book 1:1 mentorship if you need interview prep before joining a cohort.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/mlops-aiops-masterclass/" className="notion-btn notion-btn--accent">
                Join masterclass
              </Link>
              <Link href="/mentorship/" className="notion-btn notion-btn--ink">
                Book mentorship
              </Link>
              <Link href="/syllabus/" className="notion-btn notion-btn--ghost">
                See full syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Turn interview prep into a job-ready skill set"
        subtitle="Learn MLOps, AIOps, LLMOps, AI Agents, and FDE with live projects — then practice with questions like these."
      />
    </>
  );
}

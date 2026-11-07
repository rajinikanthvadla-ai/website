import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CareerCallForm from "@/components/CareerCallForm";
import { SITE, YEARS_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free 15-Minute AI Career Call: MLOps, LLMOps, AI Agents",
  description:
    "Book a free 15-minute AI career call with Rajinikanth Vadla. Get one clear next step for MLOps, LLMOps, AI agents or an AI job abroad, based on where you are today.",
  alternates: { canonical: `${SITE.url}/free-career-call/` },
  openGraph: {
    title: "Free 15-minute AI career call",
    description: "One clear next step for your MLOps, LLMOps or AI agents career. Online, free.",
    url: `${SITE.url}/free-career-call/`,
    images: [SITE.image],
    type: "website",
  },
};

const GET = [
  { t: "Your best-fit AI role", d: "MLOps, LLMOps, AI agents, AI platform or something else, matched to your current background." },
  { t: "A realistic timeline", d: "How long the switch takes at your level, and what a hiring manager will expect to see." },
  { t: "What to learn first", d: "The 3 or 4 skills that matter for your goal, and the ones you can skip for now." },
  { t: "Abroad or in India", d: "If you want a role in the US, UK, Europe or the Gulf, what changes in your plan." },
];

const FAQ = [
  { q: "Is it really free?", a: "Yes. It is a free 15-minute call. You don't need to buy anything before or after." },
  {
    q: "What happens after I send the form?",
    a: "I message you on WhatsApp or email within 24 hours to fix a 15-minute slot in your time zone.",
  },
  {
    q: "Will you try to sell me a course?",
    a: "If one of my courses or mentorship plans fits your goal, I'll say so. If it doesn't, I'll tell you that too and point you to what does.",
  },
  { q: "Who is this for?", a: "Students, developers, DevOps, cloud, data and QA engineers, and managers who want a clear path into AI engineering work." },
];

export default function FreeCareerCallPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Free career call", path: "/free-career-call/" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-b-2 border-[#0f172a] bg-[#faf9f6] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div>
            <span className="inline-block text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] border-2 border-[#0f172a] bg-[#fef9c3] px-2.5 py-1 rounded-sm mb-4">
              Free · 15 minutes · Online
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
              Free 15-minute AI career call
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Not sure whether MLOps, LLMOps or AI agents is right for you, or how to get there from your current job? Tell me where you are. In 15 minutes you get one clear next step.
            </p>
            <ul className="grid gap-4">
              {GET.map((g) => (
                <li key={g.t} className="flex gap-3">
                  <span className="text-orange-600 font-bold shrink-0">✓</span>
                  <span>
                    <strong className="text-[#0f172a]">{g.t}.</strong> <span className="text-slate-600">{g.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-6">
              With Rajinikanth Vadla, senior MLOps and AIOps engineer with {YEARS_EXPERIENCE} years in production.
            </p>
          </div>

          <div className="bg-white border-2 border-[#0f172a] rounded-sm p-5 md:p-6 shadow-[6px_6px_0_#0f172a]">
            <h2 className="font-display text-xl font-bold text-[#0f172a] mb-1">Book your call</h2>
            <p className="text-sm text-slate-600 mb-4">Takes one minute. I reply within 24 hours.</p>
            <CareerCallForm source="booking page" />
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-6">Questions</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="border-2 border-[#0f172a] bg-white rounded-sm p-4">
                <summary className="font-semibold text-[#0f172a] cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

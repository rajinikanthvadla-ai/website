import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import {
  COMMUNITY_FAQS,
  COMMUNITY_INSIDE,
  COMMUNITY_JOIN_URL,
  COMMUNITY_TIERS,
} from "@/lib/community";
import { LocalPrice } from "@/components/LocalPrice";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const URL = `${SITE.url}/community/`;

export const metadata: Metadata = {
  title: "AI Engineers Insider: MLOps & GenAI Community Membership",
  description:
    "Join the private AI Engineers Insider community: MLOps class notes and code, resume templates, interview questions, project ideas and live Q&A. Monthly membership, cancel anytime.",
  keywords: [
    "MLOps community",
    "MLOps membership",
    "AI engineers community",
    "MLOps interview questions",
    "AI engineer interview questions",
    "GenAI interview questions",
    "MLOps resume template",
    "AI engineer resume template",
    "MLflow notes",
    "MLOps notes",
    "LLMOps community",
    "AIOps community",
    "private Telegram channel MLOps",
    "Rajinikanth Vadla community",
    "monthly MLOps subscription",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "AI Engineers Insider: MLOps & GenAI Community",
    description:
      "Class notes, resume templates, interview questions, project ideas and live Q&A in one private community. Cancel anytime.",
    url: URL,
    images: [SITE.image],
    type: "website",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Engineers Insider: MLOps & GenAI Community Membership",
  description:
    "Monthly membership to a private community for engineers moving into MLOps, AIOps, LLMOps, Agentic AI and GenAI. Class notes, code, resume templates, interview questions, project ideas and live Q&A, plus selected class recordings for Pro members.",
  url: URL,
  image: SITE.image,
  brand: { "@type": "Brand", name: SITE.name },
  offers: COMMUNITY_TIERS.map((t) => ({
    "@type": "Offer",
    name: `${t.name} plan`,
    price: t.inr.replace(/[^\d]/g, ""),
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: COMMUNITY_JOIN_URL,
    description: t.perks.join(". "),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: t.inr.replace(/[^\d]/g, ""),
      priceCurrency: "INR",
      billingDuration: 1,
      unitCode: "MON",
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COMMUNITY_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CommunityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd items={[{ name: "Community", path: "/community/" }]} />

      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">
            Private community · Monthly membership
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            AI Engineers Insider: the MLOps &amp; GenAI community
          </h1>
          <p className="text-lg text-stone-600 mb-4">
            Class notes and code, resume templates, interview questions, project ideas and live Q&amp;A,
            all in one private community run by Rajinikanth Vadla.
          </p>
          <p className="text-stone-600 text-base leading-relaxed">
            Built for DevOps, cloud, SRE and data engineers moving into MLOps, AIOps, LLMOps, Agentic AI and GenAI
            roles. Cancel anytime.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={COMMUNITY_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Join the community
            </a>
            <a
              href="#plans"
              className="inline-block border border-stone-900 text-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-stone-900 hover:text-white transition-colors"
            >
              See plans
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-stone-900 text-center mb-3">What you get every month</h2>
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-10">
            New material lands in the private channel regularly, so the community keeps up with the MLOps and GenAI
            job market.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMUNITY_INSIDE.map((item) => (
              <div key={item.title} className="panel p-6 card-hover">
                <div className="text-2xl mb-3" aria-hidden>{item.icon}</div>
                <h3 className="font-display font-bold text-stone-900 text-lg mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20 md:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-stone-900 text-center mb-3">Choose your plan</h2>
          <p className="text-stone-600 text-center mb-10">Monthly billing. Cancel anytime.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {COMMUNITY_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`panel p-8 flex flex-col ${tier.recommended ? "border-2 border-stone-900" : ""}`}
              >
                {tier.recommended && (
                  <span className="self-start mb-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] bg-stone-900 text-white px-2 py-1">
                    Most complete
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-stone-900">{tier.name}</h3>
                <p className="text-stone-600 text-sm mt-1 mb-4">{tier.tagline}</p>
                <p className="mb-5">
                  <LocalPrice inr={tier.inr} usd={tier.usd} className="font-display text-4xl font-bold text-stone-900" />
                  <span className="text-stone-500 text-sm"> / month</span>
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-3 text-stone-600 text-sm">
                      <span className="w-5 h-5 border border-accent-200 bg-accent-50 flex items-center justify-center shrink-0 text-accent-700 text-xs font-bold">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={COMMUNITY_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    tier.recommended
                      ? "bg-accent-500 hover:bg-accent-600 text-white"
                      : "border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
                  }`}
                >
                  Join {tier.name}
                </a>
              </div>
            ))}
          </div>
          <p className="text-stone-500 text-xs text-center mt-6">
            Secure checkout on Topmate. After you pay, you are added to the private Telegram channel automatically,
            usually within a minute.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-stone-900 text-center mb-10">How it works</h2>
          <ol className="space-y-4">
            {[
              { n: "01", t: "Pick a plan", d: "Choose Community or Pro on Topmate and pay monthly." },
              { n: "02", t: "Link Telegram", d: "Topmate asks you to connect your Telegram account once." },
              { n: "03", t: "Get added automatically", d: "The Topmate bot adds you to the private AI Engineers Insider channel." },
              { n: "04", t: "Learn every week", d: "Notes, templates, interview questions and ideas keep arriving in the channel." },
            ].map((s) => (
              <li key={s.n} className="panel p-5 flex gap-4 items-start">
                <span className="inline-flex items-center justify-center w-10 h-10 border border-stone-900 bg-stone-900 text-[#fffefc] font-bold text-xs shrink-0">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display font-bold text-stone-900">{s.t}</h3>
                  <p className="text-stone-600 text-sm mt-1">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-stone-900 text-center mb-10">Questions before you join</h2>
          <div className="space-y-3">
            {COMMUNITY_FAQS.map((faq) => (
              <details key={faq.q} className="panel p-5 group">
                <summary className="font-semibold text-stone-900 cursor-pointer">{faq.q}</summary>
                <p className="text-stone-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-3">Want the full structured program?</h2>
          <p className="text-stone-600 mb-6">
            The community keeps you learning every month. The MLOps &amp; AIOps Masterclass gives you live classes,
            projects and 1:1 mentorship for a job-ready path.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/mlops-aiops-masterclass/" className="border border-stone-900 text-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-stone-900 hover:text-white transition-colors">
              See the Masterclass
            </Link>
            <Link href="/mentorship/" className="border border-stone-300 text-stone-700 px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:border-stone-900 transition-colors">
              1:1 mentorship
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

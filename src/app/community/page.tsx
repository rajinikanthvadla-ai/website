import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import {
  COMMUNITY_FAQS,
  COMMUNITY_FREE_HREF,
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

const paidTiers = COMMUNITY_TIERS.filter((t) => t.paid);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Engineers Insider: MLOps & GenAI Community Membership",
  description:
    "Monthly membership to a private community for engineers moving into MLOps, AIOps, LLMOps, Agentic AI and GenAI. Class notes, code, resume templates, interview questions, project ideas and live Q&A, plus selected class recordings for Pro members.",
  url: URL,
  image: SITE.image,
  brand: { "@type": "Brand", name: SITE.name },
  offers: paidTiers.map((t) => ({
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

function TierPrice({ tier }: { tier: (typeof COMMUNITY_TIERS)[number] }) {
  if (!tier.paid) {
    return <span className="font-display text-4xl font-bold text-[#0f172a]">Free</span>;
  }
  return (
    <>
      <LocalPrice inr={tier.inr} usd={tier.usd} className="font-display text-4xl font-bold text-[#0f172a]" />
      <span className="text-slate-500 text-sm"> / month</span>
    </>
  );
}

export default function CommunityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd items={[{ name: "Community", path: "/community/" }]} />

      <section className="relative border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
        <div className="relative text-center max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 mb-3">
            Membership
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight">
            Join AI Engineers Insider
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            For DevOps and software engineers moving into MLOps and AI roles. Start free with interview prep, upgrade
            for the private channel, notes, and live Q&amp;A.
          </p>
          <div className="mt-7 flex flex-col items-center gap-2">
            <a
              href={LINKS.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-[#0f172a] text-sm font-semibold hover:bg-[#1ebe5b] transition-colors"
              data-track="WhatsApp community: community page"
            >
              Join the free WhatsApp community →
            </a>
            <span className="text-xs text-slate-500">Free. Opens WhatsApp. Leave anytime.</span>
          </div>
        </div>
      </section>

      <section id="plans" className="py-14 md:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {COMMUNITY_TIERS.map((tier) => {
              const href = tier.paid ? COMMUNITY_JOIN_URL : COMMUNITY_FREE_HREF;
              const external = tier.paid;
              return (
                <div
                  key={tier.id}
                  className={`relative flex flex-col rounded-2xl border bg-white p-6 md:p-7 ${
                    tier.recommended
                      ? "border-[#0f172a] border-2 shadow-sm md:-mt-2 md:mb-2"
                      : "border-slate-200"
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.65rem] font-bold uppercase tracking-[0.1em] bg-[#0f172a] text-white px-3 py-1 rounded-full whitespace-nowrap">
                      Most popular
                    </span>
                  )}
                  <h2 className="font-display text-xl font-bold text-[#0f172a]">{tier.name}</h2>
                  <p className="mt-3 mb-1">
                    <TierPrice tier={tier} />
                  </p>
                  <p className="text-slate-600 text-sm mt-2 mb-5 leading-relaxed">{tier.tagline}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex gap-2.5 text-slate-600 text-sm leading-snug">
                        <span className="text-teal-700 shrink-0 font-bold" aria-hidden>
                          ✓
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-center px-5 py-3 text-sm font-semibold rounded-xl transition-colors ${
                        tier.recommended
                          ? "bg-[#0f172a] text-white hover:bg-slate-800"
                          : "bg-slate-100 text-[#0f172a] hover:bg-slate-200"
                      }`}
                    >
                      {tier.ctaLabel} →
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-center px-5 py-3 text-sm font-semibold rounded-xl bg-slate-100 text-[#0f172a] hover:bg-slate-200 transition-colors"
                    >
                      {tier.ctaLabel} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-slate-500 text-xs text-center mt-8 max-w-lg mx-auto leading-relaxed">
            Paid plans use a secure checkout, then Telegram adds you to the private channel automatically. Cancel
            anytime.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-2">
            Inside the private channel
          </h2>
          <p className="text-slate-600 text-center max-w-xl mx-auto mb-8 text-sm md:text-base">
            Fresh material lands regularly so you stay current for MLOps and GenAI interviews.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMUNITY_INSIDE.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-xl mb-2" aria-hidden>
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-[#0f172a] mb-1.5">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-8">How it works</h2>
          <ol className="space-y-3">
            {[
              { n: "01", t: "Pick a plan", d: "Free stays on this site. Community or Pro opens secure checkout." },
              { n: "02", t: "Link Telegram once", d: "Connect your Telegram account after payment." },
              { n: "03", t: "Get added automatically", d: "You land in the private AI Engineers Insider channel." },
              { n: "04", t: "Learn every week", d: "Notes, templates, interview questions and ideas keep arriving." },
            ].map((s) => (
              <li key={s.n} className="rounded-xl border border-slate-200 p-4 flex gap-4 items-start">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0f172a] text-white font-bold text-xs shrink-0">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display font-bold text-[#0f172a]">{s.t}</h3>
                  <p className="text-slate-600 text-sm mt-0.5">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-8">
            Questions before you join
          </h2>
          <div className="space-y-2">
            {COMMUNITY_FAQS.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-slate-200 bg-white p-4 group">
                <summary className="font-semibold text-[#0f172a] cursor-pointer text-sm md:text-base">{faq.q}</summary>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold text-[#0f172a] mb-2">
            Want the full structured program?
          </h2>
          <p className="text-slate-600 text-sm mb-5">
            The community is light monthly learning. The Masterclass is the live, job-ready path.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/mlops-aiops-masterclass/"
              className="border border-[#0f172a] text-[#0f172a] px-5 py-2.5 text-sm font-semibold rounded-xl hover:bg-[#0f172a] hover:text-white transition-colors"
            >
              See the Masterclass
            </Link>
            <Link
              href="/mentorship/"
              className="border border-slate-300 text-slate-700 px-5 py-2.5 text-sm font-semibold rounded-xl hover:border-[#0f172a] transition-colors"
            >
              1:1 mentorship
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

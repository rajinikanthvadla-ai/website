import type { Metadata } from "next";
import Link from "next/link";
import { SITE, LINKS } from "@/lib/constants";
import { INTL_MARKETS, PRIMARY_INTL_SLUGS } from "@/lib/international-markets";
import { IntlMarketCard } from "@/components/IntlSeoLanding";
import { HREFLANG_LANGUAGES } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "Global MLOps Training | USA, UK, Ireland, Netherlands, Luxembourg & More",
  description:
    "Live online MLOps, LLMOps, AIOps and AI Agents course for engineers in USA, UK, Ireland, Netherlands, Luxembourg, Germany, Canada, Australia, Singapore and UAE. Job-ready training worldwide.",
  keywords: [
    "MLOps course USA",
    "MLOps course UK",
    "MLOps training Ireland",
    "MLOps course Netherlands",
    "MLOps Luxembourg",
    "MLOps course Europe",
    "LLMOps training international",
    "remote MLOps course",
    "global AI engineering training",
  ],
  alternates: {
    canonical: `${SITE.url}/global-training/`,
    languages: HREFLANG_LANGUAGES,
  },
  openGraph: {
    title: "Global MLOps & AI Engineering Training",
    description: "Job-ready MLOps, LLMOps and AI Agents training for USA, UK, EU and worldwide.",
    url: `${SITE.url}/global-training/`,
    locale: "en_US",
    type: "website",
  },
};

export default function GlobalTrainingHubPage() {
  const primary = INTL_MARKETS.filter((m) => PRIMARY_INTL_SLUGS.includes(m.slug));
  const more = INTL_MARKETS.filter((m) => !PRIMARY_INTL_SLUGS.includes(m.slug));

  return (
    <>
      <section className="border-b-2 border-[#0f172a] bg-[#fef9c3] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] border-2 border-[#0f172a] bg-white px-3 py-1 rounded-sm shadow-[2px_2px_0_#0f172a] mb-5">
            Global training
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
            MLOps &amp; AI engineering training worldwide
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Live online cohorts for engineers in the USA, UK, Ireland, Netherlands, Luxembourg, and
            other IT hubs. Same production curriculum — timezone-friendly recordings and global
            mentorship.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-2 text-center">
            Primary regions
          </h2>
          <p className="text-sm text-slate-500 text-center mb-10">
            Local salary data, pricing, and city-specific landing pages for search in your country
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {primary.map((m) => (
              <IntlMarketCard key={m.slug} slug={m.slug} />
            ))}
            <Link href="/mlops-course-india/" className="intl-hub-card group">
              <span className="text-3xl mb-3 block" aria-hidden>
                🇮🇳
              </span>
              <h3 className="font-display font-bold text-[#0f172a] text-lg group-hover:text-orange-600 transition-colors">
                India
              </h3>
              <p className="text-sm text-slate-500 mt-1">₹12–50 LPA</p>
              <p className="text-xs text-slate-400 mt-2">Bangalore, Hyderabad, Pune</p>
              <span className="mt-4 inline-block text-xs font-bold text-orange-600">MLOps course →</span>
            </Link>
          </div>

          <h2 className="font-display text-xl font-bold text-[#0f172a] mb-6 text-center">
            More IT hub countries
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {more.map((m) => (
              <IntlMarketCard key={m.slug} slug={m.slug} />
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/mlops-aiops-masterclass/" className="notion-btn notion-btn--ink !text-sm">
              View masterclass syllabus
            </Link>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent !text-sm">
              WhatsApp — ask from your country
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

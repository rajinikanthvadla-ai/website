import Link from "next/link";
import type { IntlSeoLanding } from "@/lib/intl-seo-landings";
import { INTL_COURSE_VIDEOS } from "@/lib/intl-seo-landings";
import { INTL_MARKETS, PRIMARY_INTL_SLUGS } from "@/lib/international-markets";
import { LINKS, SITE } from "@/lib/constants";
import CourseVideoSection from "@/components/CourseVideoSection";

type Props = {
  landing: IntlSeoLanding;
};

export default function IntlSeoLandingPage({ landing }: Props) {
  const { market } = landing;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `MLOps LLMOps AI Agents Course — ${market.name}`,
    description: landing.metaDescription,
    url: landing.canonical,
    inLanguage: "en",
    provider: {
      "@type": "Organization",
      name: "Rajinikanth Vadla Training",
      url: SITE.url,
    },
    instructor: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
      url: SITE.url,
    },
    areaServed: {
      "@type": "Country",
      name: market.name,
    },
    offers: [
      {
        "@type": "Offer",
        price: market.priceLive.replace(/[^0-9.]/g, "") || "450",
        priceCurrency: market.currency,
        availability: "https://schema.org/InStock",
        url: `${SITE.url}/mlops-aiops-masterclass/`,
      },
    ],
  };

  const otherMarkets = INTL_MARKETS.filter((m) => m.slug !== market.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <section className="border-b-2 border-[#0f172a] bg-[#faf9f6] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-2xl" aria-hidden>
              {market.flag}
            </span>
            <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] border-2 border-[#0f172a] bg-[#fef9c3] px-2.5 py-1 rounded-sm">
              {market.name} · Online
            </span>
            <span className="text-[0.65rem] font-bold text-slate-500">
              {market.hubCities.slice(0, 3).join(" · ")}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-5">
            {landing.h1}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">{landing.intro}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="intl-salary-pill">Roles: {market.salaryRange}</span>
            <span className="intl-salary-pill">Live {market.priceLive}</span>
            <span className="intl-salary-pill">Recordings {market.priceRecordings}</span>
          </div>

          <a href="#course-videos" className="mt-6 inline-flex text-sm font-bold text-orange-600 hover:underline">
            Watch free course videos ↓
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-5 text-slate-600 leading-relaxed">
            {landing.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="text-base">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 gap-3">
            {landing.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-orange-600 font-bold shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href="/mlops-aiops-masterclass/"
              className="notion-btn notion-btn--ink !text-sm text-center justify-center"
            >
              View full masterclass →
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--accent !text-sm text-center justify-center"
            >
              WhatsApp from {market.shortName}
            </a>
          </div>
        </div>
      </section>

      <CourseVideoSection
        title={`MLOps course videos for ${market.shortName} students`}
        subtitle="Free class recordings — same live curriculum engineers in your region learn from."
        videos={INTL_COURSE_VIDEOS}
        variant="paper"
      />

      {/* Cross-link other regions */}
      <section className="py-14 bg-[#faf9f6] border-t-2 border-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-[#0f172a] mb-2 text-center">
            Also training engineers in
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Same live cohort — students join from India, USA, UK, EU and APAC
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {otherMarkets.map((m) => (
              <Link
                key={m.slug}
                href={`/global-training/${m.slug}/`}
                className="intl-market-chip"
              >
                <span aria-hidden>{m.flag}</span>
                {m.shortName}
              </Link>
            ))}
            <Link href="/mlops-course-india/" className="intl-market-chip">
              <span aria-hidden>🇮🇳</span>
              India
            </Link>
          </div>
          <p className="text-center mt-6">
            <Link href="/global-training/" className="text-sm font-bold text-[#0f172a] underline underline-offset-2">
              View all global training regions →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

/** Hub grid cards for the global training index page. */
export function IntlMarketCard({ slug }: { slug: (typeof PRIMARY_INTL_SLUGS)[number] | string }) {
  const market = INTL_MARKETS.find((m) => m.slug === slug);
  if (!market) return null;

  return (
    <Link href={`/global-training/${market.slug}/`} className="intl-hub-card group">
      <span className="text-3xl mb-3 block" aria-hidden>
        {market.flag}
      </span>
      <h3 className="font-display font-bold text-[#0f172a] text-lg group-hover:text-orange-600 transition-colors">
        {market.name}
      </h3>
      <p className="text-sm text-slate-500 mt-1">{market.salaryRange}</p>
      <p className="text-xs text-slate-400 mt-2">{market.hubCities.slice(0, 2).join(", ")}</p>
      <span className="mt-4 inline-block text-xs font-bold text-orange-600">MLOps course →</span>
    </Link>
  );
}

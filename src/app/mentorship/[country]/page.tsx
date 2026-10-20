import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/constants";
import MentorshipPricing from "@/components/MentorshipPricing";
import SuccessStories from "@/components/SuccessStories";
import { MENTORSHIP_MARKETS, MENTORSHIP_MARKET_BY_SLUG, mentorshipMarketCopy } from "@/lib/mentorship-markets";
import { MENTORSHIP_PLANS } from "@/lib/mentorship-pricing";

type Props = { params: Promise<{ country: string }> };

const MENTORSHIP_HREFLANG: Record<string, string> = {
  "x-default": `${SITE.url}/mentorship/`,
  "en-IN": `${SITE.url}/mentorship/`,
  ...Object.fromEntries(MENTORSHIP_MARKETS.map((m) => [m.hreflang, `${SITE.url}/mentorship/${m.slug}/`])),
};

export function generateStaticParams() {
  return MENTORSHIP_MARKETS.map((m) => ({ country: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const market = MENTORSHIP_MARKET_BY_SLUG[country];
  if (!market) return {};
  const copy = mentorshipMarketCopy(market);
  const url = `${SITE.url}/mentorship/${market.slug}/`;
  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: { canonical: url, languages: MENTORSHIP_HREFLANG },
    openGraph: { title: copy.title, description: copy.description, url, images: [SITE.image], type: "website" },
  };
}

export default async function CountryMentorshipPage({ params }: Props) {
  const { country } = await params;
  const market = MENTORSHIP_MARKET_BY_SLUG[country];
  if (!market) notFound();
  const copy = mentorshipMarketCopy(market);
  const url = `${SITE.url}/mentorship/${market.slug}/`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `1:1 MLOps & AI Career Mentorship – ${market.name}`,
    serviceType: "Career mentorship",
    provider: { "@type": "Person", name: SITE.name, url: SITE.url },
    areaServed: { "@type": "Country", name: market.name },
    url,
    offers: MENTORSHIP_PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: Number(plan.prices.A.main.replace(/[^0-9.]/g, "")),
      priceCurrency: "USD",
      url,
      availability: "https://schema.org/InStock",
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Mentorship", item: `${SITE.url}/mentorship/` },
      { "@type": "ListItem", position: 3, name: market.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">
            {market.flag} Mentorship for {market.shortName}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">{copy.h1}</h1>
          <p className="text-lg text-stone-600 mb-6">{copy.intro}</p>
          <a
            href="#pricing"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            See plans &amp; pricing
          </a>
        </div>
      </section>

      <MentorshipPricing defaultZone="A" />

      <SuccessStories />

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-4">
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600 mb-2">Target salaries</p>
            <p className="font-display text-2xl font-bold text-stone-900">{market.salaryRange}</p>
            <p className="text-sm text-stone-600 mt-2">Typical range for MLOps and AI engineering roles in {market.name}.</p>
          </div>
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600 mb-2">Time zone</p>
            <p className="text-sm text-stone-700 leading-relaxed">{market.timezoneNote}</p>
          </div>
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600 mb-2">Mentees from</p>
            <p className="text-sm text-stone-700 leading-relaxed">{market.hubCities.join(" · ")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-stone-900 text-center mb-10">
            Questions from {market.shortName} engineers
          </h2>
          <div className="space-y-3">
            {copy.faqs.map((faq) => (
              <details key={faq.q} className="panel p-5">
                <summary className="font-semibold text-stone-900 cursor-pointer">{faq.q}</summary>
                <p className="text-stone-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="text-center text-sm text-stone-600 mt-10">
            Prefer a live cohort?{" "}
            <Link href={`/global-training/${market.slug}/`} className="font-semibold text-accent-700 underline">
              MLOps & AI training for {market.shortName}
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Mentorship in other countries</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {MENTORSHIP_MARKETS.filter((m) => m.slug !== market.slug).map((m) => (
              <Link
                key={m.slug}
                href={`/mentorship/${m.slug}/`}
                className="px-4 py-2 text-sm font-semibold border border-stone-300 bg-white text-stone-700 hover:border-stone-900 transition-colors"
              >
                {m.flag} {m.name}
              </Link>
            ))}
            <Link
              href="/mentorship/?region=india"
              className="px-4 py-2 text-sm font-semibold border border-stone-300 bg-white text-stone-700 hover:border-stone-900 transition-colors"
            >
              🇮🇳 India
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

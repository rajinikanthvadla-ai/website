import Link from "next/link";
import CoursePricing from "@/components/CoursePricing";
import type { IntlSeoLanding } from "@/lib/intl-seo-landings";
import { INTL_COURSE_VIDEOS } from "@/lib/intl-seo-landings";
import { INTL_MARKETS, PRIMARY_INTL_SLUGS } from "@/lib/international-markets";
import { liveClassTimes } from "@/lib/market-zones";
import { LINKS, SITE } from "@/lib/constants";
import CourseVideoSection from "@/components/CourseVideoSection";

type Props = {
  landing: IntlSeoLanding;
};

export default function IntlSeoLandingPage({ landing }: Props) {
  const { market } = landing;
  // Computed at build time; the site rebuilds daily, so daylight-saving changes are picked up.
  const times = market.timeZones.map((z) => ({ ...z, ...liveClassTimes(z.tz) }));

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `MLOps, LLMOps and AI Agents Course (${market.name})`,
    description: landing.metaDescription,
    url: landing.canonical,
    inLanguage: "en",
    provider: { "@type": "Person", name: "Rajinikanth Vadla", url: SITE.url },
    instructor: { "@type": "Person", name: "Rajinikanth Vadla", url: `${SITE.url}/about/` },
    areaServed: { "@type": "Country", name: market.name },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT150H",
        inLanguage: "en",
        location: { "@type": "VirtualLocation", url: landing.canonical },
      },
    ],
    offers: [
      {
        "@type": "Offer",
        category: "Live cohort",
        price: "599",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE.url}/enroll/`,
      },
      {
        "@type": "Offer",
        category: "Recordings",
        price: "399",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE.url}/enroll/`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: market.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const otherMarkets = INTL_MARKETS.filter((m) => m.slug !== market.slug).sort(
    (a, b) => Number(PRIMARY_INTL_SLUGS.includes(b.slug)) - Number(PRIMARY_INTL_SLUGS.includes(a.slug)),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-b-2 border-[#0f172a] bg-[#faf9f6] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-2xl" aria-hidden>
              {market.flag}
            </span>
            <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] border-2 border-[#0f172a] bg-[#fef9c3] px-2.5 py-1 rounded-sm">
              {market.name} · Live online
            </span>
            <span className="text-[0.65rem] font-bold text-slate-500">{market.hubCities.slice(0, 3).join(" · ")}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-5">{landing.h1}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{landing.intro}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="intl-salary-pill">
              Live {market.priceLive}
              {market.localFee ? ` (≈ ${market.localFee.live})` : ""}
            </span>
            <span className="intl-salary-pill">
              Recordings {market.priceRecordings}
              {market.localFee ? ` (≈ ${market.localFee.recordings})` : ""}
            </span>
            {times[0] ? (
              <span className="intl-salary-pill">
                Class {times[0].start} {times[0].city.split(" / ")[0]} time
              </span>
            ) : null}
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/enroll/" className="notion-btn notion-btn--ink !text-sm text-center justify-center" data-track={`Market ${market.slug}: enroll`}>
              See fees and enroll →
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--accent !text-sm text-center justify-center"
              data-track={`Market ${market.slug}: WhatsApp`}
            >
              Ask on WhatsApp from {market.shortName}
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-b border-slate-200" aria-labelledby="class-times">
        <div className="max-w-3xl mx-auto px-6">
          <h2 id="class-times" className="font-display text-2xl font-bold text-[#0f172a] mb-2">
            Live class times in {market.shortName}
          </h2>
          <p className="text-sm text-slate-600 mb-5">
            The live cohort meets Monday to Friday, 8:00 to 9:45 PM India time. Here is what that means where you are, this week:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-2 border-[#0f172a]">
              <thead className="bg-[#fef9c3] text-left">
                <tr>
                  <th className="px-3 py-2 font-bold">City</th>
                  <th className="px-3 py-2 font-bold">Days</th>
                  <th className="px-3 py-2 font-bold">Local time</th>
                  <th className="px-3 py-2 font-bold">Fits</th>
                </tr>
              </thead>
              <tbody>
                {times.map((t) => (
                  <tr key={t.tz} className="border-t border-slate-200">
                    <td className="px-3 py-2 font-semibold text-[#0f172a]">{t.city}</td>
                    <td className="px-3 py-2">{t.days}</td>
                    <td className="px-3 py-2">
                      {t.start} to {t.end}
                    </td>
                    <td className="px-3 py-2">{t.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">Every class is recorded. The recordings plan gives you lifetime access to all of them.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-5">What you learn, and why it fits {market.shortName}</h2>
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
            <Link href="/mlops-aiops-masterclass/" className="notion-btn notion-btn--ink !text-sm text-center justify-center">
              Full course details →
            </Link>
            <Link href="/syllabus/" className="notion-btn notion-btn--ink !text-sm text-center justify-center">
              Syllabus →
            </Link>
            <Link href={`/mentorship/${market.slug}/`} className="notion-btn notion-btn--ink !text-sm text-center justify-center">
              1:1 mentorship in {market.shortName} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#faf9f6] border-b border-slate-200" aria-labelledby="market-faq">
        <div className="max-w-3xl mx-auto px-6">
          <h2 id="market-faq" className="font-display text-2xl font-bold text-[#0f172a] mb-6">
            Questions from engineers in {market.shortName}
          </h2>
          <div className="space-y-3">
            {market.faqs.map((f) => (
              <details key={f.q} className="border-2 border-[#0f172a] bg-white rounded-sm p-4 group">
                <summary className="font-semibold text-[#0f172a] cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#0f172a] text-white" aria-labelledby="for-companies">
        <div className="max-w-3xl mx-auto px-6">
          <h2 id="for-companies" className="font-display text-2xl font-bold mb-3">
            For companies in {market.shortName}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">{market.companyPitch}</p>
          <Link
            href="/work-with-me/"
            className="notion-btn notion-btn--accent !text-sm inline-flex"
            data-track={`Market ${market.slug}: hire me`}
          >
            Send a project or training brief →
          </Link>
        </div>
      </section>

      <CourseVideoSection
        title={`Free class videos for engineers in ${market.shortName}`}
        subtitle="Real class recordings from the same live curriculum."
        videos={INTL_COURSE_VIDEOS}
        variant="paper"
      />

      <CoursePricing defaultZone="A" />

      <section className="py-14 bg-[#faf9f6] border-t-2 border-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-[#0f172a] mb-2 text-center">Also training engineers in</h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Same live cohort, with students from India, the USA, the UK, Europe, the Gulf and APAC
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {otherMarkets.map((m) => (
              <Link key={m.slug} href={`/global-training/${m.slug}/`} className="intl-market-chip">
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
              View all regions →
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
      <h3 className="font-display font-bold text-[#0f172a] text-lg group-hover:text-orange-600 transition-colors">{market.name}</h3>
      <p className="text-sm text-slate-500 mt-1">{market.localFee ? `≈ ${market.localFee.live} live` : market.salaryRange ?? `${market.priceLive} live`}</p>
      <p className="text-xs text-slate-400 mt-2">{market.hubCities.slice(0, 2).join(", ")}</p>
      <span className="mt-4 inline-block text-xs font-bold text-orange-600">AI and MLOps course →</span>
    </Link>
  );
}

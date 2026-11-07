import { COURSE_VIDEOS } from "@/lib/course-videos";
import { SITE } from "@/lib/constants";
import {
  INTL_MARKETS,
  type IntlMarket,
  type IntlMarketSlug,
} from "@/lib/international-markets";

export type IntlSeoLanding = {
  slug: IntlMarketSlug;
  market: IntlMarket;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  paragraphs: string[];
  highlights: string[];
  canonical: string;
  hreflang: string;
};

function buildLanding(market: IntlMarket): IntlSeoLanding {
  const { name, shortName, salaryRange, hubCities, priceLive, priceRecordings, localFee } = market;
  const cities = hubCities.slice(0, 4).join(", ");

  return {
    slug: market.slug,
    market,
    hreflang: market.hreflang,
    // The root layout adds " | Rajinikanth Vadla", so titles here must not.
    metaTitle: market.seoTitle,
    metaDescription: market.metaDescription,
    keywords: [
      ...market.searchTerms,
      ...market.localSearches,
      `MLOps course ${shortName}`,
      `LLMOps course ${shortName}`,
      `AI agents course ${name}`,
      `AI engineer course ${shortName}`,
      `Rajinikanth Vadla ${shortName}`,
    ],
    h1: market.h1,
    intro: market.intro,
    paragraphs: market.context,
    highlights: [
      ...(salaryRange ? [`Typical pay for these roles: ${salaryRange}`] : []),
      `Live online from ${cities}`,
      localFee
        ? `${priceLive} live (about ${localFee.live}) or ${priceRecordings} recordings`
        : `${priceLive} live or ${priceRecordings} recordings, paid in USD`,
      "MLOps, LLMOps, AIOps and AI agents",
      "4 capstone projects for your portfolio",
      "Mock interviews and career support (live plan)",
      "English instruction, global cohort",
    ],
    canonical: `${SITE.url}/global-training/${market.slug}/`,
  };
}

export const INTL_SEO_LANDINGS: Record<IntlMarketSlug, IntlSeoLanding> = Object.fromEntries(
  INTL_MARKETS.map((m) => [m.slug, buildLanding(m)]),
) as Record<IntlMarketSlug, IntlSeoLanding>;

export const INTL_COURSE_VIDEOS = [...COURSE_VIDEOS.masterclass];

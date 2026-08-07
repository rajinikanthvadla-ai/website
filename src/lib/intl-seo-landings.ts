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
  const { name, shortName, salaryRange, hubCities, priceLive, priceRecordings, timezoneNote, searchTerms } =
    market;
  const cities = hubCities.slice(0, 4).join(", ");

  return {
    slug: market.slug,
    market,
    hreflang: market.hreflang,
    metaTitle: `MLOps Course ${shortName} 2026 | LLMOps & AI Agents Training | ${SITE.name}`,
    metaDescription: `Job-ready MLOps, LLMOps, AIOps and AI Agents live course for ${name}. ${salaryRange} roles. ${priceLive} live or ${priceRecordings} recordings. Online from ${cities}. 500+ engineers trained.`,
    keywords: [
      ...searchTerms,
      `MLOps course ${shortName}`,
      `MLOps training ${name}`,
      `LLMOps course ${shortName}`,
      `AI Agents course ${name}`,
      `MLOps engineer ${shortName}`,
      `Rajinikanth Vadla ${shortName}`,
      `online MLOps course ${name}`,
      `remote MLOps training`,
    ],
    h1: `MLOps & AI engineering course for ${name}`,
    intro: `Live online MLOps, LLMOps, AIOps and AI Agents training built for engineers in ${name} — whether you are in ${cities} or working remotely. Production skills, capstone projects, and interview prep from an enterprise practitioner.`,
    paragraphs: [
      `Companies in ${name} hire MLOps and LLMOps engineers at ${salaryRange}. This 4–5 month masterclass covers MLflow, Kubernetes, RAG, LangChain, MCP, and production GenAI — the same stack listed in ${shortName} job descriptions in 2026.`,
      `${timezoneNote} Choose live cohort (${priceLive}, mentorship + job support) or recordings-only (${priceRecordings}, self-paced). Payment via bank transfer, Wise, or WhatsApp — no India-only restrictions.`,
      `Students from ${name} use the portfolio capstones in interviews at cloud-native, fintech, and AI companies. Resume review, mock interviews, and 1:1 mentorship are included in the live track.`,
      `Watch free class recordings below — same instructor and curriculum — then enroll when you are ready. YouTube Agentic Pro membership (₹1,199/mo) also unlocks the full private video library with mentorship.`,
    ],
    highlights: [
      `Salary target: ${salaryRange} in ${shortName}`,
      `Live online — ${cities} & remote`,
      `${priceLive} live · ${priceRecordings} recordings`,
      "MLOps, LLMOps, AIOps, AI Agents",
      "4 capstone projects for your portfolio",
      "Mock interviews & career support",
      "English instruction · global cohort",
    ],
    canonical: `${SITE.url}/global-training/${market.slug}/`,
  };
}

export const INTL_SEO_LANDINGS: Record<IntlMarketSlug, IntlSeoLanding> = Object.fromEntries(
  INTL_MARKETS.map((m) => [m.slug, buildLanding(m)]),
) as Record<IntlMarketSlug, IntlSeoLanding>;

export const INTL_COURSE_VIDEOS = [...COURSE_VIDEOS.masterclass];

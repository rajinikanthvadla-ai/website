import { INTL_MARKETS, type IntlMarket } from "@/lib/international-markets";
import { MENTORSHIP_PLANS } from "@/lib/mentorship-pricing";

/** Country mentorship landing pages (USD pricing). The UK is excluded: mentorship is not offered there. */
export const MENTORSHIP_MARKETS: IntlMarket[] = INTL_MARKETS.filter((m) => m.slug !== "uk");

export const MENTORSHIP_MARKET_BY_SLUG = Object.fromEntries(
  MENTORSHIP_MARKETS.map((m) => [m.slug, m]),
) as Record<string, IntlMarket>;

const monthlyUsd = MENTORSHIP_PLANS.find((p) => p.id === "monthly")!.prices.A.main;
const deepDiveUsd = MENTORSHIP_PLANS.find((p) => p.id === "deep-dive")!.prices.A.main;

export function mentorshipMarketCopy(market: IntlMarket) {
  const { name, shortName, salaryRange, hubCities, timezoneNote } = market;
  const cities = hubCities.slice(0, 3).join(", ");

  return {
    title: `MLOps & AI Mentor in ${shortName} – 1:1 Career Mentorship`,
    description: `1:1 MLOps, LLMOps, AIOps and AI engineering mentorship for engineers in ${name}. Weekly calls in your time zone, resume and interview prep for ${salaryRange} roles. From ${deepDiveUsd} per call or ${monthlyUsd}/month, paid securely in USD.`,
    h1: `1:1 MLOps & AI career mentorship for engineers in ${name}`,
    intro: `Working in ${cities} or anywhere in ${shortName} and aiming for MLOps, LLMOps, AI agent or platform roles? I mentor engineers one-to-one: a clear roadmap, weekly calls, real project reviews and interview practice until you land the role.`,
    keywords: [
      `MLOps mentor ${shortName}`,
      `AI career mentor ${shortName}`,
      `MLOps mentorship ${name}`,
      `LLMOps mentor ${shortName}`,
      `AI engineer career coaching ${shortName}`,
      ...hubCities.slice(0, 3).map((city) => `MLOps mentor ${city}`),
    ],
    faqs: [
      {
        q: `Do sessions work in ${shortName} time zones?`,
        a: `Yes. ${timezoneNote} Calls are booked at a time that suits you.`,
      },
      {
        q: `How do engineers in ${shortName} pay?`,
        a: `In US dollars by international card through Razorpay, a secure payment gateway. You get an instant email receipt. Your bank may add a small currency conversion fee.`,
      },
      {
        q: `What roles and salaries do ${shortName} mentees target?`,
        a: `MLOps, ML platform, LLMOps, AI agent and AIOps roles, typically in the ${salaryRange} range in ${name}. Mentorship focuses on the projects, system design and interview stories those roles expect.`,
      },
      {
        q: "What if mentorship is not right for me?",
        a: "Ask before your first session and you get a full refund.",
      },
    ],
  };
}

import { LINKS } from "@/lib/constants";
import type { MentorshipZoneId } from "@/lib/mentorship-pricing";

/**
 * MLOps · AIOps · LLMOps · Agentic AI masterclass pricing.
 * Zone C = India (INR), zone A = every other country (USD), picked from the visitor's location.
 */

export type CoursePlan = {
  id: "live" | "recordings";
  name: string;
  tagline: string;
  featured?: boolean;
  includes: string[];
  excludes?: string[];
  prices: Record<MentorshipZoneId, string>;
};

/** Change international prices here; every course page, schema and country page reads them. */
export const COURSE_USD = { live: 599, recordings: 399 } as const;
export const COURSE_INR = { live: 40000, recordings: 30000 } as const;

/**
 * Razorpay payment pages per zone. `null` = no page yet: the button opens WhatsApp
 * asking for a payment link, so a sale is never blocked.
 */
export const COURSE_PAYMENT_PAGES: Record<MentorshipZoneId, Record<CoursePlan["id"], string | null>> = {
  C: { live: LINKS.razorpayLiveCohort, recordings: LINKS.razorpayRecordings },
  A: { live: LINKS.razorpayCourseGlobal, recordings: LINKS.razorpayCourseGlobal },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const COURSE_PLANS: CoursePlan[] = [
  {
    id: "live",
    name: "Live Cohort",
    tagline: "Live classes, 1:1 mentorship and job support",
    featured: true,
    includes: [
      "4–5 months live online cohort",
      "150+ hours hands-on training",
      "MLOps, AIOps, LLMOps, Agentic AI, GenAI & FDE modules",
      "4 capstone portfolio projects",
      "1-on-1 mentorship from Rajinikanth",
      "Mock interviews & interview prep",
      "Lifetime access to recordings",
    ],
    prices: { C: inr(COURSE_INR.live), A: usd(COURSE_USD.live) },
  },
  {
    id: "recordings",
    name: "Recordings Only",
    tagline: "Self-paced, lifetime access",
    includes: [
      "150+ hours of recorded sessions",
      "All modules + course materials",
      "4 capstone projects + solutions",
      "Lifetime access (no expiry)",
    ],
    excludes: ["No live classes or 1:1 mentorship", "No job assistance"],
    prices: { C: inr(COURSE_INR.recordings), A: usd(COURSE_USD.recordings) },
  },
];


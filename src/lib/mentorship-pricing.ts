import { LINKS } from "@/lib/constants";

/**
 * Mentorship pricing by income zone. Same plans everywhere, price changes by zone.
 * The United Kingdom is intentionally excluded from mentorship.
 */

export type MentorshipZoneId = "A" | "B" | "C";

export type MentorshipZone = {
  id: MentorshipZoneId;
  label: string;
  countries: string;
};

export type MentorshipPlan = {
  id: "deep-dive" | "monthly" | "quarterly" | "job-switch";
  name: string;
  cadence: string;
  featured?: boolean;
  summary: string;
  includes: string[];
  /** Price per zone. Zone C is charged in INR; `alt` is the rough USD equivalent. */
  prices: Record<MentorshipZoneId, { main: string; alt?: string }>;
};

/** Monthly mentee cap — keep this honest; it is shown on the page. */
export const MENTORSHIP_MONTHLY_CAP = 10;

export const MENTORSHIP_ZONES: MentorshipZone[] = [
  {
    id: "A",
    label: "USA, Canada, Australia, Europe & Gulf",
    countries: "USA, Canada, Australia, New Zealand, Singapore, UAE, Germany, Netherlands, Ireland, Luxembourg and Western Europe",
  },
  {
    id: "B",
    label: "Middle-income countries",
    countries: "Saudi Arabia, Qatar, Malaysia, South Africa, Eastern Europe, Latin America and others",
  },
  {
    id: "C",
    label: "India & South Asia / Africa",
    countries: "India, Pakistan, Bangladesh, Sri Lanka, Nepal, Nigeria, Kenya, Philippines, Indonesia",
  },
];

/**
 * One Razorpay Payment Page per zone lists every plan.
 * `null` = no page yet: the pay button opens WhatsApp so a payment link can be sent manually.
 */
export const MENTORSHIP_PAYMENT_PAGES: Record<MentorshipZoneId, string | null> = {
  A: LINKS.razorpayMentorshipGlobal,
  B: null,
  C: LINKS.razorpayMentorshipIndia,
};

export const MENTORSHIP_PLANS: MentorshipPlan[] = [
  {
    id: "deep-dive",
    name: "1:1 Deep Dive",
    cadence: "single 60-min call",
    summary: "One focused session on your CV, system design, career move or a stuck project.",
    includes: ["60-minute video call", "Clear next steps for your situation", "Follow-up questions on WhatsApp for 3 days"],
    prices: { A: { main: "$199" }, B: { main: "$119" }, C: { main: "₹2,499", alt: "≈ $30" } },
  },
  {
    id: "monthly",
    name: "Monthly Mentorship",
    cadence: "per month · cancel anytime",
    featured: true,
    summary: "Ongoing guidance every week until you land the role you are aiming for.",
    includes: [
      "4 × 60-min 1:1 calls every month",
      "WhatsApp chat support (reply within 24 hours)",
      "Resume & LinkedIn review for AI / MLOps roles",
      "Personal learning plan with monthly goals",
      "Project and code review on your repos",
      "Priority booking for mock interviews",
    ],
    prices: { A: { main: "$599" }, B: { main: "$349" }, C: { main: "₹7,999", alt: "≈ $95" } },
  },
  {
    id: "quarterly",
    name: "3-Month Mentorship",
    cadence: "paid upfront · save ~15%",
    summary: "Everything in Monthly for 3 months — the usual time it takes to switch roles.",
    includes: ["Everything in Monthly Mentorship", "12 × 60-min 1:1 calls", "2 full mock interview loops"],
    prices: { A: { main: "$1,499" }, B: { main: "$899" }, C: { main: "₹19,999", alt: "≈ $240" } },
  },
  {
    id: "job-switch",
    name: "Job-Switch Program",
    cadence: "3 months · end-to-end",
    summary: "From resume to offer letter: the full package for a move into AI, MLOps or LLMOps.",
    includes: [
      "Everything in 3-Month Mentorship",
      "Resume + LinkedIn fully rewritten",
      "4 mock interviews with detailed feedback",
      "Referrals where I have a network fit",
      "Offer and salary negotiation guidance",
    ],
    prices: { A: { main: "$2,999" }, B: { main: "$1,799" }, C: { main: "₹29,999", alt: "≈ $360" } },
  },
];

const UK_TIMEZONES = ["Europe/London", "Europe/Belfast", "Europe/Guernsey", "Europe/Jersey", "Europe/Isle_of_Man"];

const ZONE_C_TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Calcutta",
  "Asia/Karachi",
  "Asia/Dhaka",
  "Asia/Kathmandu",
  "Asia/Katmandu",
  "Asia/Colombo",
  "Asia/Manila",
  "Asia/Jakarta",
  "Africa/Lagos",
  "Africa/Nairobi",
];

const ZONE_A_PREFIXES = ["Australia/", "Pacific/Auckland", "Pacific/Honolulu", "US/", "Canada/"];
const ZONE_A_TIMEZONES = [
  "Asia/Singapore",
  "Asia/Dubai",
  "Asia/Tokyo",
  "Asia/Hong_Kong",
  "Asia/Seoul",
  "Europe/Dublin",
  "Europe/Amsterdam",
  "Europe/Luxembourg",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Brussels",
  "Europe/Zurich",
  "Europe/Vienna",
  "Europe/Stockholm",
  "Europe/Oslo",
  "Europe/Copenhagen",
  "Europe/Helsinki",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Lisbon",
];
/** US and Canadian zones live under America/ alongside Latin America, so list them explicitly. */
const NORTH_AMERICA_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "America/Detroit",
  "America/Boise",
  "America/Toronto",
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Halifax",
  "America/St_Johns",
  "America/Regina",
];

export type MentorshipRegion = { uk: true } | { uk: false; zone: MentorshipZoneId };

/** Detects the visitor's zone from the browser time zone (locale is unreliable: many Indians use en-GB). */
export function detectMentorshipRegion(timeZone: string): MentorshipRegion {
  if (UK_TIMEZONES.includes(timeZone)) return { uk: true };
  if (ZONE_C_TIMEZONES.includes(timeZone)) return { uk: false, zone: "C" };
  if (
    ZONE_A_TIMEZONES.includes(timeZone) ||
    NORTH_AMERICA_TIMEZONES.includes(timeZone) ||
    timeZone.startsWith("America/Indiana/") ||
    timeZone.startsWith("America/Kentucky/") ||
    ZONE_A_PREFIXES.some((p) => timeZone.startsWith(p))
  ) {
    return { uk: false, zone: "A" };
  }
  return { uk: false, zone: "B" };
}

export const MENTORSHIP_REFUND_NOTE = "Full refund if you ask before your first session.";

export const MENTORSHIP_FAQS = [
  {
    q: "Is the payment safe?",
    a: "Yes. Payments go through Razorpay, a well-known, RBI-regulated Indian payment gateway. You get an email receipt instantly. I never see your card or UPI details.",
  },
  {
    q: "What if mentorship is not right for me?",
    a: "Ask before your first session and you get a full refund. After the first call you will already know exactly how I work, so there are no surprises.",
  },
  {
    q: "What happens after I pay?",
    a: "Within 24 hours I message you on WhatsApp or email, we pick a call time in your time zone, and you send a short note on your background and goal so the first session is useful from minute one.",
  },
  {
    q: "Which currency do I pay in?",
    a: "Visitors from India and South Asia pay in rupees (UPI, cards, net banking). Visitors from the USA, Canada, Europe, the Gulf, Australia and other countries pay in US dollars by card. The page picks your region automatically and you can switch it.",
  },
  {
    q: "Can I book through Topmate instead?",
    a: "Yes. Every plan has a Topmate button if you prefer booking there.",
  },
  {
    q: "Is mentorship available in the United Kingdom?",
    a: "No. Paid mentorship plans are currently not offered to UK residents.",
  },
];

/** Plan offers for structured data (Google rich results). */
export function mentorshipOfferSchema(siteUrl: string) {
  const toNumber = (price: string) => Number(price.replace(/[^0-9.]/g, ""));
  return MENTORSHIP_PLANS.flatMap((plan) => [
    {
      "@type": "Offer",
      name: `${plan.name} (India)`,
      price: toNumber(plan.prices.C.main),
      priceCurrency: "INR",
      url: `${siteUrl}/mentorship/?region=india`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: `${plan.name} (International)`,
      price: toNumber(plan.prices.A.main),
      priceCurrency: "USD",
      url: `${siteUrl}/mentorship/?region=usa`,
      availability: "https://schema.org/InStock",
    },
  ]);
}

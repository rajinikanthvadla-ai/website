import { LINKS } from "@/lib/constants";

/** Topmate hosts checkout + Telegram auto-add. Change this if payment moves in-house. */
export const COMMUNITY_JOIN_URL = LINKS.communityJoin;

export type CommunityTierId = "free" | "community" | "pro";

export type CommunityTier = {
  id: CommunityTierId;
  name: string;
  inr: string;
  usd: string;
  tagline: string;
  perks: string[];
  ctaLabel: string;
  /** Paid plans open Topmate; free stays on-site. */
  paid: boolean;
  recommended?: boolean;
};

export const COMMUNITY_TIERS: CommunityTier[] = [
  {
    id: "free",
    name: "Free",
    inr: "Free",
    usd: "Free",
    tagline: "Start with open interview prep on this site",
    perks: [
      "Open MLOps interview questions",
      "Architecture diagrams and roadmaps",
      "Upgrade anytime when you want the private channel",
    ],
    ctaLabel: "Browse free prep",
    paid: false,
  },
  {
    id: "community",
    name: "Community",
    inr: "₹499",
    usd: "$6",
    tagline: "Private Telegram channel with weekly learning fuel",
    perks: [
      "Private Telegram: AI Engineers Insider",
      "Class notes and code from MLOps sessions",
      "Resume templates for MLOps, AIOps, LLMOps, GenAI",
      "Interview questions with answers",
      "Weekly learning plan and project ideas",
    ],
    ctaLabel: "Join Community",
    paid: true,
  },
  {
    id: "pro",
    name: "Pro",
    inr: "₹1,499",
    usd: "$17",
    tagline: "Live Q&A, reviews, and selected recordings",
    recommended: true,
    perks: [
      "Everything in Community",
      "Monthly live Q&A with Rajinikanth",
      "Resume and project reviews",
      "Selected class recordings",
      "Interview prep material and priority replies",
    ],
    ctaLabel: "Join Pro",
    paid: true,
  },
];

export const COMMUNITY_FREE_HREF = "/interview-questions/";

export const COMMUNITY_INSIDE = [
  {
    icon: "📝",
    title: "Class notes and code",
    desc: "Notes and runnable code from each MLOps class so you can revise without rewatching.",
  },
  {
    icon: "📄",
    title: "Resume templates",
    desc: "ATS-friendly templates for MLOps, AIOps, LLMOps, GenAI and DevOps-to-AI roles.",
  },
  {
    icon: "❓",
    title: "Interview questions",
    desc: "Interview questions with clear answers for MLOps, LLMOps and GenAI roles.",
  },
  {
    icon: "💡",
    title: "Project ideas",
    desc: "Weekly portfolio ideas: pipelines, tracking, registry, agents and deployment.",
  },
  {
    icon: "🎥",
    title: "Selected recordings (Pro)",
    desc: "Pro members get recordings of selected classes, depending on the topic shared.",
  },
  {
    icon: "🎙️",
    title: "Live Q&A (Pro)",
    desc: "A monthly live session for career, stack, and project questions.",
  },
];

export const COMMUNITY_FAQS = [
  {
    q: "What is the AI Engineers Insider community?",
    a: "A monthly membership run by Rajinikanth Vadla for engineers moving into MLOps, AIOps, LLMOps, Agentic AI and GenAI. Members join a private Telegram channel with class notes, code, resume templates, interview questions and project ideas. Pro adds selected recordings and live Q&A.",
  },
  {
    q: "How much does it cost?",
    a: "Community is ₹499 / month in India ($6 elsewhere). Pro is ₹1,499 / month in India ($17 elsewhere). Free prep stays free on this site. Cancel anytime.",
  },
  {
    q: "How do I get into the Telegram channel?",
    a: "Pick a paid plan on this page. Secure checkout opens, then you link Telegram once and you are added to the private channel automatically, usually within a minute.",
  },
  {
    q: "What happens if I cancel?",
    a: "You can cancel anytime. When your subscription ends, you leave the private channel. Anything you already saved stays with you.",
  },
  {
    q: "What is the difference between Community and Pro?",
    a: "Community is the channel, notes, code, templates, interview questions and project ideas. Pro adds selected recordings, monthly live Q&A, resume and project reviews, interview prep material and priority replies.",
  },
  {
    q: "Is this the same as the YouTube channel membership?",
    a: "No. YouTube membership unlocks private videos on YouTube. This community is Telegram-based with notes, templates, interview prep and live Q&A.",
  },
  {
    q: "Is it a replacement for the MLOps course?",
    a: "No. The community is a light monthly way to keep learning. The MLOps Masterclass is the structured live program with projects and mentorship.",
  },
];

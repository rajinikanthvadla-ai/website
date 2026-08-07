import { LINKS } from "@/lib/constants";

export type MembershipTierId = "learner" | "practitioner" | "agentic-pro";

export type MembershipTier = {
  id: MembershipTierId;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  perks: string[];
  missing?: string[];
  recommended?: boolean;
};

export const YOUTUBE_MEMBERSHIP_JOIN_URL = LINKS.youtubeMembershipJoin;

export const YOUTUBE_MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "learner",
    name: "AI & ML Learner",
    price: "₹179",
    priceNote: "/month · cancel anytime",
    tagline: "Entry-level access for casual learners",
    perks: [
      "Basic member community access",
      "Limited members-only posts",
      "Support the channel",
    ],
    missing: [
      "No full private course library",
      "No members-only live streams",
      "No 1:1 mentorship from Rajinikanth's team",
    ],
  },
  {
    id: "practitioner",
    name: "AI & MLOps Practitioner",
    price: "₹419",
    priceNote: "/month · cancel anytime",
    tagline: "Mid-tier for practitioners building skills",
    perks: [
      "Everything in AI & ML Learner",
      "More practitioner-focused member content",
      "Deeper MLOps & platform topics",
    ],
    missing: [
      "Still not the full private video library",
      "No members-only live class replays",
      "No 1:1 mentorship with Member ID",
    ],
  },
  {
    id: "agentic-pro",
    name: "AI & ML AI Agentic Pro",
    price: "₹1,199",
    priceNote: "/month · cancel anytime",
    tagline: "The complete library + mentorship access",
    recommended: true,
    perks: [
      "ALL members-only videos — private courses, past sessions & new uploads",
      "Members-only live streams & class replays",
      "Full archive: old videos + every upcoming release",
      "Includes every perk from Learner & Practitioner tiers",
      "Share your YouTube Member ID on WhatsApp → 1:1 mentorship from Rajinikanth",
      "Interview tips, resume feedback & career Q&A from the team",
    ],
  },
];

export const YOUTUBE_MEMBERSHIP_WHATSAPP =
  "https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20joined%20YouTube%20AI%20%26%20ML%20AI%20Agentic%20Pro%20membership.%20My%20Member%20ID%20is%3A%20";

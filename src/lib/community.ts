import { LINKS } from "@/lib/constants";

export const COMMUNITY_JOIN_URL = LINKS.communityJoin;

export type CommunityTier = {
  id: "community" | "pro";
  name: string;
  inr: string;
  usd: string;
  tagline: string;
  perks: string[];
  recommended?: boolean;
};

export const COMMUNITY_TIERS: CommunityTier[] = [
  {
    id: "community",
    name: "Community",
    inr: "₹499",
    usd: "$6",
    tagline: "Everything you need to learn MLOps and GenAI every week",
    perks: [
      "Private Telegram channel: AI Engineers Insider",
      "Class notes and code from every MLOps day",
      "Resume templates for MLOps, AIOps, LLMOps and GenAI roles",
      "Interview questions with answers for MLOps, LLMOps and GenAI roles",
      "Weekly learning plan and project ideas",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    inr: "₹1,499",
    usd: "$17",
    tagline: "Direct access, reviews and live sessions",
    recommended: true,
    perks: [
      "Everything in Community",
      "Monthly live Q&A session with Rajinikanth",
      "Resume and project reviews",
      "Selected class recordings, depending on the topic",
      "Interview preparation material",
      "Priority replies to your doubts",
    ],
  },
];

export const COMMUNITY_INSIDE = [
  { icon: "📝", title: "Class notes and code", desc: "Notes and runnable code from each MLOps class, such as the MLflow training and tracking session, so you can revise without rewatching." },
  { icon: "📄", title: "Resume templates", desc: "ATS-friendly templates for MLOps, AIOps, LLMOps, GenAI and DevOps-to-AI roles, with example bullets you can adapt." },
  { icon: "❓", title: "Interview questions", desc: "Interview questions with clear answers for MLOps, LLMOps and GenAI roles, shared regularly." },
  { icon: "💡", title: "Project ideas", desc: "Weekly ideas for portfolio projects: pipelines, tracking, model registry, agents and deployment." },
  { icon: "🎥", title: "Selected class recordings (Pro)", desc: "Pro members get recordings of selected classes, depending on the topic being shared." },
  { icon: "🎙️", title: "Live Q&A (Pro)", desc: "A monthly live session where you can ask about your career, your stack or your project." },
];

export const COMMUNITY_FAQS = [
  {
    q: "What is the AI Engineers Insider community?",
    a: "It is a paid monthly membership run by Rajinikanth Vadla for engineers moving into MLOps, AIOps, LLMOps, Agentic AI and GenAI. Members get a private Telegram channel with class notes, code, resume templates, interview questions and project ideas. Pro members also get selected class recordings, depending on the topic.",
  },
  {
    q: "How much does it cost?",
    a: "The Community plan is ₹499 per month in India. The Pro plan is ₹1,499 per month in India. Visitors outside India see the price in US dollars. You can cancel anytime.",
  },
  {
    q: "How do I get into the Telegram channel?",
    a: "Pay for a plan on Topmate. Topmate's bot adds you to the private Telegram channel automatically, usually within a minute, after you link your Telegram account.",
  },
  {
    q: "What happens if I cancel?",
    a: "You can cancel anytime. When your subscription ends, lapses or is refunded, you are removed from the private channel automatically. You never lose access to anything you have already saved.",
  },
  {
    q: "What is the difference between Community and Pro?",
    a: "Community gives you the channel, notes, code, resume templates, interview questions and project ideas. Pro adds selected class recordings (depending on the topic), a monthly live Q&A, resume and project reviews, interview preparation material and priority replies to your doubts.",
  },
  {
    q: "Is this the same as the YouTube channel membership?",
    a: "No. The YouTube channel membership gives access to private videos on YouTube. This community runs on Telegram with a monthly subscription through Topmate, and focuses on notes, templates, interview questions and live Q&A.",
  },
  {
    q: "Is it a replacement for the MLOps course?",
    a: "No. The community is a low-cost monthly way to keep learning and prepare for interviews. The full MLOps and AIOps Masterclass is the structured, job-ready program with live classes, projects and mentorship.",
  },
];

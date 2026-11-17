import type { CourseVideo } from "@/lib/course-videos";
import { COURSE_VIDEOS } from "@/lib/course-videos";

export type SeoLanding = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  paragraphs: string[];
  highlights: string[];
  courseHref: string;
  cta: string;
  canonical: string;
  /** YouTube course videos embedded on this landing. */
  videos?: CourseVideo[];
  videoSectionTitle?: string;
  videoSectionSubtitle?: string;
};

export const SEO_LANDINGS: Record<string, SeoLanding> = {
  "genai-course": {
    slug: "genai-course",
    title: "GenAI Course",
    metaTitle: "GenAI Course 2026 | Generative AI, LLMOps, RAG",
    metaDescription:
      "GenAI course online: LLMOps, transformers, RAG, vLLM and production GenAI. Live training by Rajinikanth Vadla. Watch free GenAI course videos here.",
    keywords: [
      "GenAI course",
      "Generative AI course",
      "GenAI course online",
      "LLMOps course",
      "best GenAI course",
      "Rajinikanth Vadla GenAI",
    ],
    h1: "GenAI course — LLMOps and production Generative AI",
    intro:
      "Looking for a GenAI course that goes past ChatGPT demos? Rajinikanth Vadla teaches Generative AI as production LLMOps: how models work, how to serve them, and how to ship RAG systems.",
    paragraphs: [
      "This GenAI course path lives inside the full MLOps masterclass so you also learn the infra, monitoring and agent layers employers expect.",
      "Watch the free YouTube GenAI videos on this page, then join the live cohort for labs, mentorship and job support.",
    ],
    highlights: ["How LLMs work internally", "RAG and vector databases", "Serve LLMs with vLLM", "LLM monitoring", "Interview-ready GenAI projects"],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "Enroll via masterclass",
    canonical: "https://rajinikanthvadla.com/genai-course/",
    videos: [...COURSE_VIDEOS.genai],
    videoSectionTitle: "GenAI course YouTube videos",
  },
  "ai-agents-course": {
    slug: "ai-agents-course",
    title: "AI Agents Course",
    metaTitle: "AI Agents Course & AI Agentic Course 2026 | LangChain, CrewAI, MCP",
    metaDescription:
      "AI Agents course and AI Agentic course online: LangChain, LangGraph, CrewAI, MCP, AWS Bedrock Agents. Live training by Rajinikanth Vadla. Free agent videos below.",
    keywords: [
      "AI agents course",
      "AI agentic course",
      "agentic AI course",
      "AI agents training",
      "LangChain AI agents course",
      "CrewAI course",
      "MCP course",
      "Rajinikanth Vadla AI Agents",
    ],
    h1: "AI Agents course — agentic AI for production",
    intro:
      "This is the official AI Agents course and AI Agentic course page for Rajinikanth Vadla. Learn to build autonomous agents with LangChain, LangGraph, CrewAI, MCP and AWS Bedrock.",
    paragraphs: [
      "Agentic AI is not chatbot wrappers. You learn tool use, multi-agent orchestration, AgentOps and how agents plug into enterprise systems.",
      "The AI Agents module is part of the job-ready masterclass. Free YouTube labs are embedded below so Google and learners see the same teaching before you enroll.",
    ],
    highlights: [
      "LangChain + LangGraph labs",
      "CrewAI multi-agent systems",
      "Model Context Protocol (MCP)",
      "AWS Bedrock Agents",
      "Production AgentOps patterns",
    ],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "Join AI Agents in masterclass",
    canonical: "https://rajinikanthvadla.com/ai-agents-course/",
    videos: [...COURSE_VIDEOS.aiAgents],
    videoSectionTitle: "AI Agents / Agentic AI course videos",
    videoSectionSubtitle: "Watch agentic AI labs from YouTube — LangChain, LangGraph, Bedrock and AgentOps.",
  },
  "aiops-training": {
    slug: "aiops-training",
    title: "AIOps Training",
    metaTitle: "AIOps Training Online – Anomaly Detection, Self-Healing, LLMOps",
    metaDescription:
      "AIOps training with Prometheus, Grafana, anomaly detection and automated remediation. Live online course by Rajinikanth Vadla. Module 4 of the MLOps masterclass.",
    keywords: ["AIOps training", "AIOps course India", "AIOps engineer training", "intelligent operations course"],
    h1: "AIOps training for intelligent IT operations",
    intro:
      "AIOps applies machine learning to IT operations: anomaly detection, predictive maintenance, root cause analysis and self-healing infrastructure.",
    paragraphs: [
      "In the masterclass, AIOps is Module 4 with labs on telemetry pipelines, time-series models, cloud-native observability and automated remediation workflows.",
      "This training suits DevOps and SRE engineers expanding into AI-driven operations, and MLOps engineers who need to understand production signals.",
    ],
    highlights: ["Anomaly detection labs", "Prometheus and Grafana", "Predictive analytics", "Self-healing patterns", "Cloud-native AIOps"],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "View AIOps in masterclass",
    canonical: "https://rajinikanthvadla.com/aiops-training/",
    videos: [...COURSE_VIDEOS.aiops],
    videoSectionTitle: "AIOps course videos",
  },
  "ai-tools-productivity": {
    slug: "ai-tools-productivity",
    title: "AI Tools Training",
    metaTitle: "AI Tools Training | Cursor, Claude, Codex, Bedrock Agents Course",
    metaDescription:
      "Enterprise AI tools training: Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents. 2 month AI Automation course by Rajinikanth Vadla.",
    keywords: ["AI tools training", "Cursor training", "Claude AI course", "enterprise AI automation", "AI coding tools course"],
    h1: "AI tools training for enterprise engineers",
    intro:
      "Enterprise teams now expect engineers to use Cursor, Claude, Codex and cloud AI agents daily. This training teaches those tools in a structured 2 month program.",
    paragraphs: [
      "The AI-Powered Automation Efficiency course covers AI-assisted development, LLM APIs, AWS Bedrock Agents, open-source agents and rapid prototyping with tools enterprises actually hire for.",
      "Every module maps to skills listed in real job descriptions for AI automation and platform engineering roles.",
    ],
    highlights: ["Cursor and Codex", "Claude and ChatGPT APIs", "AWS Bedrock Agents", "LangChain and CrewAI", "2 month live cohort"],
    courseHref: "/courses/ai-automation/",
    cta: "View AI Automation course",
    canonical: "https://rajinikanthvadla.com/ai-tools-productivity/",
    videos: [...COURSE_VIDEOS.aiAutomation].slice(0, 2),
    videoSectionTitle: "AI tools & automation course videos",
  },
};

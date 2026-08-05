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
  "mlops-course-india": {
    slug: "mlops-course-india",
    title: "MLOps Course India",
    metaTitle: "Best MLOps Course India 2026 | Job Ready Live Training | Rajinikanth Vadla",
    metaDescription:
      "Best MLOps course in India: 4-5 month job-ready live program with MLOps, LLMOps, AIOps and AI Agents. 150+ hours hands-on, placement support. ₹40,000. 500+ trained.",
    keywords: [
      "MLOps course",
      "MLOps course India",
      "best MLOps course India",
      "MLOps training India",
      "MLOps course with placement",
      "MLOps course online India",
      "Rajinikanth Vadla MLOps",
    ],
    h1: "Best MLOps course in India for job-ready engineers",
    intro:
      "Looking for a MLOps course in India that goes beyond theory? Rajinikanth Vadla runs a live 4-5 month masterclass built for working professionals who want production skills and interview-ready projects.",
    paragraphs: [
      "The program covers DevOps foundations, MLOps pipelines, LLMOps, AIOps and AI Agentic Operations in one continuous path. You work through 50+ labs and 4 capstone projects that you can present in technical interviews.",
      "Training is live online from India with evening batches, so professionals across Bangalore, Hyderabad, Pune, Chennai and other cities join without leaving their jobs. International students enroll in the same cohort.",
      "Graduates get resume review, mock interviews and placement support. The course is priced at ₹40,000 for India with localized USD and EUR pricing for global students.",
      "Watch free class recordings below on this page — the same instructor and curriculum as the paid live MLOps course — then enroll when you are ready.",
    ],
    highlights: [
      "4-5 months live online",
      "150+ hours hands-on",
      "MLOps, LLMOps, AIOps, AI Agents",
      "4 portfolio capstone projects",
      "Interview prep and job support",
      "4.9/5 from 500+ students",
    ],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "View full masterclass",
    canonical: "https://www.rajinikanthvadla.com/mlops-course-india/",
    videos: [...COURSE_VIDEOS.masterclass],
    videoSectionTitle: "MLOps course videos on YouTube",
    videoSectionSubtitle:
      "Free live-class recordings from Rajinikanth Vadla's MLOps, LLMOps, AIOps and AI Agents course — watch on this page.",
  },
  "mlops-course": {
    slug: "mlops-course",
    title: "MLOps Course",
    metaTitle: "MLOps Course 2026 | Job Ready Live Training | Rajinikanth Vadla",
    metaDescription:
      "MLOps course with AIOps, LLMOps and AI Agents. 4-5 month live job-ready program by Rajinikanth Vadla. 150+ hours hands-on, placement support. Watch free course videos here.",
    keywords: [
      "MLOps course",
      "MLOps course online",
      "best MLOps course",
      "MLOps course with placement",
      "job ready MLOps course",
      "Rajinikanth Vadla MLOps course",
    ],
    h1: "MLOps course — job-ready live training",
    intro:
      "This is the official MLOps course page for Rajinikanth Vadla's live masterclass: MLOps, AIOps, LLMOps and AI Agentic Operations in one job-ready path.",
    paragraphs: [
      "Search for an MLOps course and you will find many short tutorials. This program is different: live evening batches, 150+ hours of labs, four capstone projects and interview support.",
      "Start with the YouTube course videos embedded below, then join the full cohort for mentorship, recordings and placement guidance.",
    ],
    highlights: [
      "MLOps pipelines and MLflow",
      "LLMOps and GenAI deployment",
      "AIOps anomaly detection",
      "AI Agents and MCP",
      "Placement and mock interviews",
    ],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "Open full MLOps masterclass",
    canonical: "https://www.rajinikanthvadla.com/mlops-course/",
    videos: [...COURSE_VIDEOS.masterclass],
    videoSectionTitle: "Watch the MLOps course on YouTube",
    videoSectionSubtitle: "Embedded class recordings — same content students learn in the live MLOps course.",
  },
  "mlops-training": {
    slug: "mlops-training",
    title: "MLOps Training",
    metaTitle: "MLOps Training India | MLflow, Kubeflow, Production ML | Live Course",
    metaDescription:
      "Hands-on MLOps training with MLflow, Kubeflow, CI/CD, Kubernetes and model monitoring. Part of Rajinikanth Vadla's job-ready 4-5 month masterclass. Enroll live online.",
    keywords: ["MLOps training", "MLOps training India", "MLflow training", "Kubeflow course", "production ML training"],
    h1: "MLOps training for production machine learning",
    intro:
      "MLOps training teaches you to ship models reliably: experiment tracking, versioning, deployment, monitoring and automated retraining. This is Module 2 of the complete masterclass.",
    paragraphs: [
      "You learn MLflow, DVC, feature stores, FastAPI serving, ML CI/CD and drift detection with real labs. The curriculum mirrors what MLOps engineer job descriptions ask for in 2026.",
      "Rather than a fragmented short course, MLOps is taught as part of a full job-ready program that starts with DevOps and ends with AI agents and capstone projects.",
    ],
    highlights: ["MLflow and experiment tracking", "Model deployment on Kubernetes", "ML CI/CD pipelines", "Drift detection and monitoring", "Kubeflow and SageMaker pipelines"],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "See full MLOps syllabus",
    canonical: "https://www.rajinikanthvadla.com/mlops-training/",
    videos: [...COURSE_VIDEOS.masterclass].slice(0, 2),
    videoSectionTitle: "MLOps training videos",
  },
  "genai-training": {
    slug: "genai-training",
    title: "GenAI and AI Agents Training",
    metaTitle: "GenAI Course & Training India | AI Agents, LangChain, RAG, MCP",
    metaDescription:
      "GenAI course with AI Agents, LangChain, RAG, vector databases and MCP. Live training by Rajinikanth Vadla. Watch free GenAI class videos on this page.",
    keywords: [
      "GenAI course",
      "GenAI training India",
      "Generative AI course",
      "AI agents course",
      "LangChain training",
      "RAG course India",
      "LLM agents training",
    ],
    h1: "GenAI and AI Agents training for enterprise roles",
    intro:
      "Generative AI and AI agents are now core skills for ML and platform engineers. This GenAI course covers LangChain, RAG, MCP, multi-agent systems and production deployment.",
    paragraphs: [
      "Module 3 covers LLMOps: fine-tuning, RAG, guardrails and LLM monitoring. Module 5 goes deep on AI agents, tool use, CrewAI and Model Context Protocol integrations.",
      "All GenAI content is hands-on. You build portfolio projects you can demo in interviews, not toy chatbots.",
      "Free GenAI and LLMOps class recordings from YouTube are embedded below so you can evaluate the teaching style before enrolling.",
    ],
    highlights: ["LangChain and CrewAI", "RAG and vector databases", "MCP enterprise integrations", "Multi-agent workflows", "Production agent deployment"],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "View masterclass program",
    canonical: "https://www.rajinikanthvadla.com/genai-training/",
    videos: [...COURSE_VIDEOS.genai],
    videoSectionTitle: "GenAI course videos",
    videoSectionSubtitle: "LLMOps and Generative AI class recordings from Rajinikanth Vadla's YouTube channel.",
  },
  "genai-course": {
    slug: "genai-course",
    title: "GenAI Course",
    metaTitle: "GenAI Course 2026 | Generative AI, LLMOps, RAG | Rajinikanth Vadla",
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
    canonical: "https://www.rajinikanthvadla.com/genai-course/",
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
    canonical: "https://www.rajinikanthvadla.com/ai-agents-course/",
    videos: [...COURSE_VIDEOS.aiAgents],
    videoSectionTitle: "AI Agents / Agentic AI course videos",
    videoSectionSubtitle: "Watch agentic AI labs from YouTube — LangChain, LangGraph, Bedrock and AgentOps.",
  },
  "aiops-training": {
    slug: "aiops-training",
    title: "AIOps Training",
    metaTitle: "AIOps Training India | Anomaly Detection, Self-Healing Infrastructure",
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
    canonical: "https://www.rajinikanthvadla.com/aiops-training/",
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
    canonical: "https://www.rajinikanthvadla.com/ai-tools-productivity/",
    videos: [...COURSE_VIDEOS.aiAutomation].slice(0, 2),
    videoSectionTitle: "AI tools & automation course videos",
  },
};

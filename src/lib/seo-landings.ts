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
};

export const SEO_LANDINGS: Record<string, SeoLanding> = {
  "mlops-course-india": {
    slug: "mlops-course-india",
    title: "MLOps Course India",
    metaTitle: "Best MLOps Course India 2026 | Job Ready Live Training | Rajinikanth Vadla",
    metaDescription:
      "Best MLOps course in India: 4-5 month job-ready live program with MLOps, LLMOps, AIOps and AI Agents. 150+ hours hands-on, placement support. ₹40,000. 500+ trained.",
    keywords: [
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
  },
  "genai-training": {
    slug: "genai-training",
    title: "GenAI and AI Agents Training",
    metaTitle: "GenAI Training India | AI Agents, LangChain, RAG, MCP Course",
    metaDescription:
      "GenAI and AI Agents training with LangChain, RAG, vector databases and MCP. Live course by Rajinikanth Vadla. Part of the 4-5 month MLOps masterclass.",
    keywords: ["GenAI training India", "AI agents course", "LangChain training", "RAG course India", "LLM agents training"],
    h1: "GenAI and AI Agents training for enterprise roles",
    intro:
      "Generative AI and AI agents are now core skills for ML and platform engineers. This training covers LangChain, RAG, MCP, multi-agent systems and production deployment.",
    paragraphs: [
      "Module 3 covers LLMOps: fine-tuning, RAG, guardrails and LLM monitoring. Module 5 goes deep on AI agents, tool use, CrewAI and Model Context Protocol integrations.",
      "All GenAI content is hands-on. You build portfolio projects you can demo in interviews, not toy chatbots.",
    ],
    highlights: ["LangChain and CrewAI", "RAG and vector databases", "MCP enterprise integrations", "Multi-agent workflows", "Production agent deployment"],
    courseHref: "/mlops-aiops-masterclass/",
    cta: "View masterclass program",
    canonical: "https://www.rajinikanthvadla.com/genai-training/",
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
  },
  "ai-tools-productivity": {
    slug: "ai-tools-productivity",
    title: "AI Tools Training",
    metaTitle: "AI Tools Training | Cursor, Claude, Codex, Bedrock Agents Course",
    metaDescription:
      "Enterprise AI tools training: Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents. 30-35 day AI Automation course by Rajinikanth Vadla.",
    keywords: ["AI tools training", "Cursor training", "Claude AI course", "enterprise AI automation", "AI coding tools course"],
    h1: "AI tools training for enterprise engineers",
    intro:
      "Enterprise teams now expect engineers to use Cursor, Claude, Codex and cloud AI agents daily. This training teaches those tools in a structured 30-35 day program.",
    paragraphs: [
      "The AI-Powered Automation Efficiency course covers AI-assisted development, LLM APIs, AWS Bedrock Agents, open-source agents and rapid prototyping with tools enterprises actually hire for.",
      "Every module maps to skills listed in real job descriptions for AI automation and platform engineering roles.",
    ],
    highlights: ["Cursor and Copilot", "Claude and ChatGPT APIs", "AWS Bedrock Agents", "LangChain and CrewAI", "30-35 day live cohort"],
    courseHref: "/courses/ai-automation/",
    cta: "View AI Automation course",
    canonical: "https://www.rajinikanthvadla.com/ai-tools-productivity/",
  },
};

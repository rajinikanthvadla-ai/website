export type SyllabusSection = {
  title: string;
  items: string[];
  lab?: boolean;
};

export type MasterclassModule = {
  module: number;
  title: string;
  duration: string;
  summary: string;
  sections: SyllabusSection[];
};

export const MLOPS_PROGRAM_OVERVIEW =
  "Complete MLOps, LLMOps, AIOps and AI Agents training from infrastructure and deployment to production AI agents. Hands-on labs at every stage, built for professionals who want job-ready skills.";

export const MLOPS_MASTERCLASS_SYLLABUS: MasterclassModule[] = [
  {
    module: 1,
    title: "DevOps Fundamentals for MLOps",
    duration: "Month 1",
    summary: "Linux, Python, Git, Docker, Kubernetes, IaC, CI/CD, cloud and monitoring foundations for ML teams.",
    sections: [
      {
        title: "Linux and Shell Scripting",
        items: ["Linux commands for ML workflows", "Bash scripting and automation", "Process and network basics"],
      },
      {
        title: "Python for ML/AI-Ops",
        items: ["Core Python, OOP and error handling", "Data structures, APIs and concurrency", "ML and ops libraries, testing and logging"],
      },
      {
        title: "Git and Version Control",
        items: ["Git workflows and branching for ML", "Pull requests, collaboration and hooks"],
      },
      {
        title: "Docker Containerization",
        items: ["Dockerfile best practices for ML apps", "Networking, volumes and Docker Compose"],
        lab: true,
      },
      {
        title: "Kubernetes for ML",
        items: ["Pods, Deployments, Services", "ConfigMaps, Secrets and persistent volumes"],
        lab: true,
      },
      {
        title: "Infrastructure as Code",
        items: ["Terraform, Ansible and cloud templates"],
        lab: true,
      },
      {
        title: "CI/CD Pipelines",
        items: ["Jenkins and GitHub Actions for ML", "Automated test and deploy pipelines"],
      },
      {
        title: "Cloud Computing",
        items: ["AWS, Azure, GCP comparison", "SageMaker, Vertex AI, Azure ML", "Cost and architecture patterns"],
      },
      {
        title: "Monitoring and Observability",
        items: ["Prometheus, Grafana and ELK/EFK", "Distributed tracing"],
        lab: true,
      },
    ],
  },
  {
    module: 2,
    title: "MLOps: Machine Learning Operations",
    duration: "Month 2",
    summary: "Automated ML pipelines from experimentation to production with tracking, versioning, deployment and monitoring.",
    sections: [
      {
        title: "MLOps Fundamentals",
        items: ["ML lifecycle and maturity model", "MLOps vs DevOps patterns", "Deployment challenges"],
      },
      {
        title: "Data Engineering for ML",
        items: ["Ingestion, validation and feature engineering", "Feature stores (Feast)", "Data quality monitoring"],
        lab: true,
      },
      {
        title: "Experiment Tracking",
        items: ["MLflow and Weights & Biases", "Hyperparameter tuning and reproducibility"],
        lab: true,
      },
      {
        title: "Model Versioning",
        items: ["Git, DVC and model registry", "Artifact management"],
        lab: true,
      },
      {
        title: "Model Deployment",
        items: ["ONNX and SavedModel serialization", "FastAPI REST APIs and batch inference"],
        lab: true,
      },
      {
        title: "ML CI/CD Pipelines",
        items: ["Automated model testing", "Continuous training and deployment"],
        lab: true,
      },
      {
        title: "Model Monitoring",
        items: ["Data and concept drift detection", "A/B testing for models"],
        lab: true,
      },
      {
        title: "ML Orchestration",
        items: ["Kubeflow, SageMaker, Azure ML and Vertex AI pipelines"],
        lab: true,
      },
    ],
  },
  {
    module: 3,
    title: "LLMOps: Large Language Model Operations",
    duration: "Month 3",
    summary: "Deploy, manage and optimize LLMs in production with RAG, fine-tuning, guardrails and observability.",
    sections: [
      {
        title: "LLMOps Fundamentals",
        items: ["LLM lifecycle and open vs proprietary models", "Deployment challenges and cost control"],
      },
      {
        title: "Prompt Engineering",
        items: ["Prompt patterns, templates and versioning", "Testing frameworks for prompts"],
        lab: true,
      },
      {
        title: "LLM Fine-tuning",
        items: ["LoRA and QLoRA techniques", "Domain adaptation and evaluation"],
        lab: true,
      },
      {
        title: "RAG Systems",
        items: ["Vector DBs: Pinecone, Weaviate, ChromaDB", "Chunking, embeddings and hybrid search"],
        lab: true,
      },
      {
        title: "LLM Deployment",
        items: ["Quantization, caching and scaling", "Model Context Protocol (MCP) integration"],
        lab: true,
      },
      {
        title: "LLM Monitoring",
        items: ["Quality, latency and cost tracking", "Automated evaluation and user feedback"],
        lab: true,
      },
      {
        title: "Responsible AI and Guardrails",
        items: ["Content filtering and bias mitigation", "Compliance and governance"],
        lab: true,
      },
    ],
  },
  {
    module: 4,
    title: "AIOps: AI for IT Operations",
    duration: "Month 4",
    summary: "AI-powered monitoring, prediction and remediation for modern infrastructure.",
    sections: [
      {
        title: "AIOps Fundamentals",
        items: ["Maturity levels, ROI and implementation strategy"],
      },
      {
        title: "IT Data Collection",
        items: ["Telemetry, logs and APM integration", "Data processing pipelines"],
        lab: true,
      },
      {
        title: "Anomaly Detection",
        items: ["Statistical and ML-based detection", "Time-series and multivariate analysis"],
        lab: true,
      },
      {
        title: "Predictive Analytics",
        items: ["Failure prediction and capacity planning", "SLA and resource forecasting"],
        lab: true,
      },
      {
        title: "Root Cause Analysis",
        items: ["Event correlation and pattern recognition", "Causal inference workflows"],
        lab: true,
      },
      {
        title: "Self-Healing Infrastructure",
        items: ["Auto-remediation and chaos engineering", "Resilience testing"],
        lab: true,
      },
      {
        title: "Cloud-Native AIOps",
        items: ["Kubernetes and microservices observability", "Serverless and container intelligence"],
        lab: true,
      },
    ],
  },
  {
    module: 5,
    title: "AI Agents and Autonomous Systems",
    duration: "Month 4-5",
    summary: "Build agents that reason, plan, use tools and deploy safely in enterprise environments.",
    sections: [
      {
        title: "AI Agent Fundamentals",
        items: ["Agent patterns, types and business use cases"],
      },
      {
        title: "Agent Frameworks",
        items: ["LangChain, LlamaIndex, AutoGPT and CrewAI"],
        lab: true,
      },
      {
        title: "Model Context Protocol (MCP)",
        items: ["MCP servers and clients", "GitHub, Slack, Drive and database integrations"],
        lab: true,
      },
      {
        title: "Tool Use and Function Calling",
        items: ["Tool libraries, selection logic and custom tools"],
        lab: true,
      },
      {
        title: "Agent Memory",
        items: ["Short and long-term memory", "Vector DBs and knowledge graphs"],
        lab: true,
      },
      {
        title: "Planning and Reasoning",
        items: ["Chain-of-thought and tree of thought", "Task decomposition"],
        lab: true,
      },
      {
        title: "Multi-Agent Systems",
        items: ["Architectures, protocols and role specialization"],
        lab: true,
      },
      {
        title: "Agent Testing and Enterprise Deployment",
        items: ["Evaluation, security and human-in-the-loop patterns"],
        lab: true,
      },
    ],
  },
  {
    module: 6,
    title: "Real-World Capstone Projects",
    duration: "Month 5",
    summary: "Four portfolio-ready projects covering MLOps, LLMOps, AIOps and enterprise AI agents.",
    sections: [
      {
        title: "Project 1: End-to-End MLOps Pipeline",
        items: [
          "CI/CD, Kubernetes deploy, monitoring and drift detection",
          "Automated retraining workflows",
          "Stack: Python, MLflow, Docker, Kubernetes, Jenkins",
        ],
      },
      {
        title: "Project 2: Production LLM with RAG",
        items: [
          "Fine-tune open-source LLM, vector DB and prompt management",
          "Deploy with full monitoring",
          "Stack: LangChain, ChromaDB, FastAPI, Docker, HuggingFace",
        ],
      },
      {
        title: "Project 3: AIOps Monitoring System",
        items: [
          "Anomaly detection, predictive maintenance and auto-remediation",
          "ITSM integration",
          "Stack: Prometheus, Grafana, Python, Kubernetes, Scikit-learn",
        ],
      },
      {
        title: "Project 4: Enterprise AI Agent with MCP",
        items: [
          "Multi-agent system with GitHub, Slack and Drive integrations",
          "Human-in-the-loop and enterprise security",
          "Stack: LangChain, CrewAI, MCP, FastAPI, PostgreSQL, Docker",
        ],
      },
    ],
  },
];

export const MLOPS_PROGRAM_INCLUDES = [
  { label: "Live classes", value: "Weekly live sessions with Q&A" },
  { label: "Training", value: "150+ hours hands-on" },
  { label: "Labs", value: "50+ practical exercises" },
  { label: "Projects", value: "4 capstone portfolio builds" },
  { label: "Mentorship", value: "1-on-1 career guidance" },
  { label: "Career", value: "Resume, LinkedIn and interview prep" },
  { label: "Support", value: "Job assistance and placement help" },
];

export const MLOPS_PREREQUISITES = [
  "Basic programming knowledge (freshers welcome)",
  "Software development concepts",
  "Command line familiarity",
  "Motivation to build production systems",
];

export const MLOPS_TARGET_AUDIENCE = [
  "Software engineers moving to MLOps",
  "DevOps engineers expanding into ML",
  "Data scientists going to production",
  "ML engineers deepening operations skills",
  "IT professionals exploring AI automation",
];

/** Flat topic list for SEO or legacy use */
export function getModuleTopicPreview(mod: MasterclassModule, max = 5): string[] {
  return mod.sections.slice(0, max).map((s) => s.title);
}

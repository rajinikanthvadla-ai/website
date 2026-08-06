export type RoadmapPhase = {
  phase: string;
  duration: string;
  skills: string[];
  projects: string[];
};

export type CareerRoadmap = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  salaryIndia: string;
  salaryGlobal: string;
  intro: string;
  overview: string[];
  phases: RoadmapPhase[];
  tools: string[];
  relatedCourse: { label: string; href: string };
  faqs: { q: string; a: string }[];
};

export const ROADMAP_SLUGS = [
  "ai-engineer",
  "fde-engineer",
  "ai-ml-engineer",
  "mlops-engineer",
  "llmops-engineer",
  "nlp-engineer",
  "ai-platform-engineer",
  "ai-infrastructure-engineer",
] as const;

export type RoadmapSlug = (typeof ROADMAP_SLUGS)[number];

export const ROADMAPS: Record<RoadmapSlug, CareerRoadmap> = {
  "ai-engineer": {
    slug: "ai-engineer",
    title: "AI Engineer Career Roadmap 2026",
    shortTitle: "AI Engineer",
    metaTitle: "AI Engineer Roadmap 2026: Skills, Salary & Learning Path India",
    metaDescription:
      "Complete AI Engineer career roadmap for 2026. Skills, tools, salary (₹15-50 LPA India), projects, and a step-by-step learning path from Python to production AI systems.",
    keywords: [
      "AI engineer roadmap",
      "AI engineer career path",
      "how to become AI engineer",
      "AI engineer salary India",
      "AI engineer skills 2026",
    ],
    salaryIndia: "₹15–50 LPA",
    salaryGlobal: "$120K–$220K",
    intro:
      "AI Engineers build and ship intelligent systems — from LLM apps and RAG pipelines to agent workflows and model-serving APIs. This roadmap maps the skills enterprises actually hire for in 2026.",
    overview: [
      "Strong Python and software engineering fundamentals",
      "LLM APIs, prompt engineering, and RAG architecture",
      "Agent frameworks: LangChain, LangGraph, CrewAI, MCP",
      "Cloud AI services: AWS Bedrock, Azure OpenAI, Vertex AI",
      "MLOps basics: deployment, monitoring, and CI/CD for AI",
    ],
    phases: [
      {
        phase: "Foundation",
        duration: "Month 1–2",
        skills: ["Python", "Git", "REST APIs", "SQL", "Linux basics", "Docker intro"],
        projects: ["Build a REST API that calls an LLM", "CLI tool with structured outputs"],
      },
      {
        phase: "LLM & RAG",
        duration: "Month 2–4",
        skills: ["OpenAI/Claude APIs", "Embeddings", "Vector DBs", "Chunking strategies", "Evaluation"],
        projects: ["Document Q&A bot with ChromaDB", "RAG pipeline with citation tracking"],
      },
      {
        phase: "Agents & Automation",
        duration: "Month 4–6",
        skills: ["LangChain/LangGraph", "Tool use", "MCP", "Multi-agent patterns", "Guardrails"],
        projects: ["Support agent with Slack + GitHub MCP", "Multi-step research agent"],
      },
      {
        phase: "Production AI",
        duration: "Month 6–9",
        skills: ["FastAPI", "Kubernetes", "Observability", "Cost optimization", "Security"],
        projects: ["Deploy LLM service with rate limiting", "End-to-end AI feature with monitoring"],
      },
    ],
    tools: ["Python", "LangChain", "LangGraph", "OpenAI API", "ChromaDB", "FastAPI", "Docker", "AWS Bedrock"],
    relatedCourse: { label: "MLOps + AI Agents Masterclass", href: "/mlops-aiops-masterclass/" },
    faqs: [
      {
        q: "How long does it take to become an AI Engineer?",
        a: "With focused study (10–15 hrs/week), most engineers reach job-ready level in 6–9 months. A structured cohort like the MLOps Masterclass compresses this to 4–5 months with mentorship.",
      },
      {
        q: "What is the AI Engineer salary in India?",
        a: "Entry-level AI Engineers earn ₹8–15 LPA. Mid-level with production experience: ₹15–35 LPA. Senior with agent/LLM platform skills: ₹35–50+ LPA in 2026.",
      },
    ],
  },
  "fde-engineer": {
    slug: "fde-engineer",
    title: "Forward Deployed Engineer (FDE) Roadmap 2026",
    shortTitle: "FDE",
    metaTitle: "Forward Deployed Engineer Roadmap 2026: Skills & Career Path",
    metaDescription:
      "Forward Deployed Engineer career roadmap: customer-facing AI/ML delivery, rapid prototyping, enterprise integration. Salary ₹18–45 LPA. Step-by-step FDE learning path.",
    keywords: [
      "forward deployed engineer roadmap",
      "FDE career path",
      "FDE salary India",
      "how to become FDE",
      "forward deployed engineer AI",
    ],
    salaryIndia: "₹18–45 LPA",
    salaryGlobal: "$140K–$250K",
    intro:
      "Forward Deployed Engineers sit at the intersection of engineering and customer success — they prototype AI solutions on-site (or remotely), integrate with enterprise systems, and ship value in weeks, not quarters.",
    overview: [
      "Full-stack prototyping with AI-native tools (Cursor, v0, Bolt)",
      "Enterprise integration: APIs, SSO, data pipelines, compliance",
      "LLM agents tailored to customer workflows",
      "Stakeholder communication and rapid iteration",
      "Handoff to platform teams for production hardening",
    ],
    phases: [
      {
        phase: "Engineering Breadth",
        duration: "Month 1–2",
        skills: ["Python/TypeScript", "API design", "SQL + NoSQL", "Cloud basics", "Git workflows"],
        projects: ["Full-stack CRUD app in a weekend", "Integrate third-party API with auth"],
      },
      {
        phase: "AI Prototyping",
        duration: "Month 2–4",
        skills: ["LLM APIs", "RAG", "Agent frameworks", "Cursor/Codex", "Low-code AI tools"],
        projects: ["Customer demo agent in 48 hours", "RAG over customer docs"],
      },
      {
        phase: "Enterprise Delivery",
        duration: "Month 4–6",
        skills: ["MCP integrations", "Bedrock/Azure AI", "Security review", "Runbooks", "Observability"],
        projects: ["Agent connected to CRM + ticketing", "Pilot deployment with monitoring"],
      },
      {
        phase: "Scale & Handoff",
        duration: "Month 6–8",
        skills: ["Kubernetes", "CI/CD", "Documentation", "Training customers", "Platform handoff"],
        projects: ["Production-ready module with tests", "Customer enablement workshop"],
      },
    ],
    tools: ["Python", "TypeScript", "LangChain", "MCP", "AWS Bedrock", "Cursor", "Docker", "FastAPI"],
    relatedCourse: { label: "AI-Powered Automation Course", href: "/courses/ai-automation/" },
    faqs: [
      {
        q: "What does a Forward Deployed Engineer do?",
        a: "FDEs work directly with customers to design, build, and deploy AI/ML solutions quickly. They combine software engineering, AI skills, and client communication — common at Palantir-style firms and enterprise AI vendors.",
      },
      {
        q: "FDE vs ML Engineer — what's the difference?",
        a: "ML Engineers focus on model training and MLOps pipelines. FDEs focus on customer-specific delivery, rapid prototyping, and integration. FDEs need broader full-stack skills and stronger communication.",
      },
    ],
  },
  "ai-ml-engineer": {
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer Career Roadmap 2026",
    shortTitle: "AI/ML Engineer",
    metaTitle: "AI ML Engineer Roadmap 2026: Complete Learning Path & Salary Guide",
    metaDescription:
      "AI/ML Engineer roadmap for 2026: math foundations, deep learning, LLMs, MLOps. India salary ₹12–45 LPA. Skills, projects, and tools for machine learning engineering roles.",
    keywords: [
      "AI ML engineer roadmap",
      "machine learning engineer career path",
      "ML engineer salary India",
      "how to become ML engineer",
      "AI ML engineer skills 2026",
    ],
    salaryIndia: "₹12–45 LPA",
    salaryGlobal: "$110K–$200K",
    intro:
      "AI/ML Engineers train models, build features, and bridge the gap between research and production. In 2026, the role increasingly blends classical ML with LLM fine-tuning and MLOps.",
    overview: [
      "Statistics, linear algebra, and ML fundamentals",
      "Scikit-learn, PyTorch, and HuggingFace Transformers",
      "Feature engineering and experiment tracking",
      "Model deployment with MLflow, Docker, Kubernetes",
      "LLM fine-tuning and evaluation for production use cases",
    ],
    phases: [
      {
        phase: "Math & Python",
        duration: "Month 1–2",
        skills: ["NumPy", "Pandas", "Statistics", "Linear algebra", "Data visualization"],
        projects: ["EDA notebook on real dataset", "Predictive model with scikit-learn"],
      },
      {
        phase: "Deep Learning",
        duration: "Month 2–4",
        skills: ["PyTorch", "CNNs/RNNs", "Transformers intro", "HuggingFace", "Transfer learning"],
        projects: ["Image classifier", "Fine-tune a small LLM for classification"],
      },
      {
        phase: "MLOps Foundations",
        duration: "Month 4–6",
        skills: ["MLflow", "Feature stores", "Model registry", "Docker", "CI/CD for ML"],
        projects: ["Automated training pipeline", "Model serving with FastAPI"],
      },
      {
        phase: "Production ML",
        duration: "Month 6–9",
        skills: ["Kubernetes", "Monitoring", "Drift detection", "A/B testing", "Cost management"],
        projects: ["End-to-end ML pipeline on K8s", "Model monitoring dashboard"],
      },
    ],
    tools: ["Python", "PyTorch", "scikit-learn", "HuggingFace", "MLflow", "Docker", "Kubernetes", "MLflow"],
    relatedCourse: { label: "MLOps Masterclass", href: "/mlops-aiops-masterclass/" },
    faqs: [
      {
        q: "AI Engineer vs ML Engineer — which path?",
        a: "Choose ML Engineer if you enjoy math, training models, and data pipelines. Choose AI Engineer if you prefer building LLM apps, agents, and product features. Many roles now blend both.",
      },
      {
        q: "Do I need a PhD for ML Engineer roles?",
        a: "No. Most industry ML Engineer roles require strong Python, project portfolio, and MLOps skills — not a PhD. A structured course with capstone projects is often faster than self-study alone.",
      },
    ],
  },
  "mlops-engineer": {
    slug: "mlops-engineer",
    title: "MLOps Engineer Career Roadmap 2026",
    shortTitle: "MLOps Engineer",
    metaTitle: "MLOps Engineer Roadmap 2026: Skills, Tools & Salary India",
    metaDescription:
      "MLOps Engineer career roadmap: CI/CD for ML, Kubeflow, MLflow, Kubernetes, model monitoring. India salary ₹12–40 LPA. Step-by-step path from DevOps to MLOps.",
    keywords: [
      "MLOps engineer roadmap",
      "MLOps career path",
      "how to become MLOps engineer",
      "MLOps engineer salary India",
      "MLOps skills 2026",
    ],
    salaryIndia: "₹12–40 LPA",
    salaryGlobal: "$120K–$190K",
    intro:
      "MLOps Engineers own the path from notebook to production — automated pipelines, model versioning, deployment, monitoring, and retraining. It is one of the highest-demand roles in India's AI job market.",
    overview: [
      "DevOps fundamentals: Linux, Git, CI/CD, containers",
      "ML pipeline orchestration: Kubeflow, Airflow, MLflow",
      "Model serving: TensorFlow Serving, TorchServe, Triton",
      "Infrastructure: Kubernetes, Terraform, cloud (AWS/Azure/GCP)",
      "Observability: drift detection, performance monitoring, alerting",
    ],
    phases: [
      {
        phase: "DevOps Base",
        duration: "Month 1–2",
        skills: ["Linux", "Git", "Docker", "Jenkins/GitHub Actions", "Terraform basics"],
        projects: ["CI/CD pipeline for a web app", "Multi-container Docker Compose setup"],
      },
      {
        phase: "ML Pipelines",
        duration: "Month 2–4",
        skills: ["MLflow", "Kubeflow", "Feature engineering", "Experiment tracking", "Model registry"],
        projects: ["Automated training + registration pipeline", "Hyperparameter tuning workflow"],
      },
      {
        phase: "Kubernetes for ML",
        duration: "Month 4–6",
        skills: ["K8s fundamentals", "Helm", "KServe/Seldon", "GPU scheduling", "Secrets management"],
        projects: ["Deploy model on EKS/GKE", "Auto-scaling inference service"],
      },
      {
        phase: "Production MLOps",
        duration: "Month 6–8",
        skills: ["Drift detection", "Prometheus/Grafana", "Data versioning (DVC)", "Governance", "Cost ops"],
        projects: ["Full MLOps platform with monitoring", "Automated retraining on drift"],
      },
    ],
    tools: ["Docker", "Kubernetes", "MLflow", "Kubeflow", "Terraform", "Prometheus", "Python", "Jenkins"],
    relatedCourse: { label: "MLOps Masterclass (live cohort)", href: "/mlops-aiops-masterclass/" },
    faqs: [
      {
        q: "Can a DevOps engineer transition to MLOps?",
        a: "Yes — DevOps engineers are the fastest to transition. You already know containers, CI/CD, and Kubernetes. Add MLflow, model serving, and drift monitoring — typically 3–4 months of focused learning.",
      },
      {
        q: "Best MLOps course in India?",
        a: "Look for live cohorts with hands-on labs, capstone projects, and job support. Rajinikanth Vadla's MLOps Masterclass covers DevOps through MLOps, LLMOps, and AI Agents in 4–5 months with 150+ hours of labs.",
      },
    ],
  },
  "llmops-engineer": {
    slug: "llmops-engineer",
    title: "LLMOps Engineer Career Roadmap 2026",
    shortTitle: "LLMOps Engineer",
    metaTitle: "LLMOps Engineer Roadmap 2026: LLM Production Skills & Salary",
    metaDescription:
      "LLMOps Engineer roadmap: prompt management, RAG ops, LLM evaluation, fine-tuning pipelines, cost control. Salary ₹18–50 LPA India. Complete 2026 learning path.",
    keywords: [
      "LLMOps engineer roadmap",
      "LLMOps career path",
      "LLMOps salary India",
      "how to become LLMOps engineer",
      "LLM operations 2026",
    ],
    salaryIndia: "₹18–50 LPA",
    salaryGlobal: "$130K–$230K",
    intro:
      "LLMOps Engineers operationalize large language models — managing prompts, RAG pipelines, fine-tuning workflows, evaluation, and cost at scale. As every company deploys LLMs, this role is exploding.",
    overview: [
      "LLM fundamentals: transformers, tokenization, context windows",
      "RAG architecture: chunking, embeddings, retrieval strategies",
      "Prompt management and versioning (LangSmith, PromptLayer)",
      "Fine-tuning: LoRA, QLoRA, evaluation benchmarks",
      "Production: latency, cost, guardrails, and observability",
    ],
    phases: [
      {
        phase: "LLM Foundations",
        duration: "Month 1–2",
        skills: ["Transformer basics", "OpenAI/Claude APIs", "Token economics", "Prompt patterns", "Structured outputs"],
        projects: ["Multi-turn chat with memory", "JSON extraction pipeline"],
      },
      {
        phase: "RAG Systems",
        duration: "Month 2–4",
        skills: ["Embeddings", "Vector DBs", "Hybrid search", "Reranking", "Citation tracking"],
        projects: ["Enterprise doc Q&A", "RAG with evaluation metrics"],
      },
      {
        phase: "LLM Pipelines",
        duration: "Month 4–6",
        skills: ["LangChain/LangGraph", "Fine-tuning (LoRA)", "Evaluation harnesses", "A/B testing prompts", "Caching"],
        projects: ["Fine-tuned model for domain task", "Automated eval pipeline"],
      },
      {
        phase: "LLMOps at Scale",
        duration: "Month 6–8",
        skills: ["Cost monitoring", "Rate limiting", "Guardrails", "Multi-model routing", "Compliance"],
        projects: ["LLM gateway with fallbacks", "Production RAG with SLA monitoring"],
      },
    ],
    tools: ["LangChain", "LangGraph", "ChromaDB", "HuggingFace", "MLflow", "OpenAI API", "FastAPI", "Prometheus"],
    relatedCourse: { label: "GenAI + LLMOps Masterclass", href: "/genai-course/" },
    faqs: [
      {
        q: "LLMOps vs MLOps — what's different?",
        a: "MLOps focuses on traditional ML model lifecycles (training, versioning, serving). LLMOps adds prompt management, RAG ops, token cost control, and LLM-specific evaluation — often without custom model training.",
      },
      {
        q: "Is LLMOps a good career in 2026?",
        a: "Yes. Enterprise LLM adoption is accelerating and most teams lack operational expertise. LLMOps Engineers with RAG + agent + monitoring skills are among the highest-paid AI roles in India.",
      },
    ],
  },
  "nlp-engineer": {
    slug: "nlp-engineer",
    title: "NLP Engineer Career Roadmap 2026",
    shortTitle: "NLP Engineer",
    metaTitle: "NLP Engineer Roadmap 2026: Natural Language Processing Career Path",
    metaDescription:
      "NLP Engineer roadmap for 2026: text processing, transformers, NER, sentiment analysis, LLMs. India salary ₹10–35 LPA. Skills and projects for NLP roles.",
    keywords: [
      "NLP engineer roadmap",
      "natural language processing career",
      "NLP engineer salary India",
      "how to become NLP engineer",
      "NLP skills 2026",
    ],
    salaryIndia: "₹10–35 LPA",
    salaryGlobal: "$100K–$180K",
    intro:
      "NLP Engineers build systems that understand and generate human language — from chatbots and search to sentiment analysis and document processing. LLMs have transformed the field; classical NLP skills still matter for production.",
    overview: [
      "Text preprocessing, tokenization, and linguistic features",
      "Classical NLP: NER, POS tagging, sentiment analysis",
      "Transformers and pre-trained models (BERT, GPT family)",
      "Fine-tuning for domain-specific tasks",
      "Production NLP: latency, multilingual, and evaluation",
    ],
    phases: [
      {
        phase: "NLP Basics",
        duration: "Month 1–2",
        skills: ["Regex", "spaCy", "NLTK", "Text cleaning", "TF-IDF", "Word embeddings"],
        projects: ["Sentiment classifier", "Named entity extractor"],
      },
      {
        phase: "Transformers",
        duration: "Month 2–4",
        skills: ["HuggingFace", "BERT/GPT fine-tuning", "Tokenizers", "Attention mechanism", "Evaluation metrics"],
        projects: ["Fine-tune BERT for classification", "Summarization model"],
      },
      {
        phase: "Applied NLP",
        duration: "Month 4–6",
        skills: ["RAG", "Semantic search", "Multilingual models", "Speech-to-text basics", "LLM prompting"],
        projects: ["Semantic search engine", "Multilingual chatbot"],
      },
      {
        phase: "Production NLP",
        duration: "Month 6–8",
        skills: ["Model serving", "Batch vs streaming", "A/B testing", "Monitoring", "Cost optimization"],
        projects: ["Real-time NLP API", "NLP pipeline with feedback loop"],
      },
    ],
    tools: ["Python", "spaCy", "HuggingFace", "PyTorch", "LangChain", "FastAPI", "ChromaDB"],
    relatedCourse: { label: "GenAI Course", href: "/genai-course/" },
    faqs: [
      {
        q: "Is NLP still relevant with LLMs?",
        a: "Yes. LLMs handle generation well, but production NLP still needs chunking, evaluation, domain fine-tuning, and integration — skills NLP Engineers specialize in. The role has evolved, not disappeared.",
      },
      {
        q: "NLP Engineer vs AI Engineer?",
        a: "NLP Engineers focus on language-specific tasks (search, NER, summarization). AI Engineers have a broader scope including agents, vision, and full-stack AI products. Many NLP Engineers now work on RAG and LLM apps.",
      },
    ],
  },
  "ai-platform-engineer": {
    slug: "ai-platform-engineer",
    title: "AI Platform Engineer Career Roadmap 2026",
    shortTitle: "AI Platform Engineer",
    metaTitle: "AI Platform Engineer Roadmap 2026: Build Internal AI Platforms",
    metaDescription:
      "AI Platform Engineer roadmap: internal ML/AI platforms, feature stores, model hubs, self-serve tooling. Salary ₹18–45 LPA India. Skills for platform engineering roles.",
    keywords: [
      "AI platform engineer roadmap",
      "ML platform engineer career",
      "AI platform salary India",
      "internal AI platform",
      "ML platform engineering 2026",
    ],
    salaryIndia: "₹18–45 LPA",
    salaryGlobal: "$140K–$220K",
    intro:
      "AI Platform Engineers build the internal infrastructure that lets data scientists and AI teams ship models faster — feature stores, experiment tracking, model registries, and self-serve deployment tools.",
    overview: [
      "Platform thinking: APIs, abstractions, developer experience",
      "Kubernetes and cloud-native architecture",
      "ML platform tools: MLflow, Feast, Kubeflow, SageMaker",
      "IAM, multi-tenancy, and governance for AI workloads",
      "Developer portals and self-serve workflows",
    ],
    phases: [
      {
        phase: "Platform Foundations",
        duration: "Month 1–2",
        skills: ["Kubernetes", "Terraform", "API design", "PostgreSQL", "Redis", "Observability"],
        projects: ["Internal developer portal MVP", "Multi-tenant API gateway"],
      },
      {
        phase: "ML Infrastructure",
        duration: "Month 2–4",
        skills: ["MLflow", "Feature stores", "Model registry", "Artifact storage", "Pipeline orchestration"],
        projects: ["Centralized experiment tracker", "Feature store with online serving"],
      },
      {
        phase: "Self-Serve AI",
        duration: "Month 4–6",
        skills: ["KServe", "GPU pools", "Quota management", "Cost allocation", "RBAC"],
        projects: ["One-click model deployment", "GPU scheduling dashboard"],
      },
      {
        phase: "Enterprise Platform",
        duration: "Month 6–9",
        skills: ["Governance", "Audit logs", "Data lineage", "SLA monitoring", "Platform metrics"],
        projects: ["Full AI platform with governance", "Platform adoption dashboard"],
      },
    ],
    tools: ["Kubernetes", "Terraform", "MLflow", "Kubeflow", "Feast", "Prometheus", "Python", "Go"],
    relatedCourse: { label: "MLOps Masterclass", href: "/mlops-aiops-masterclass/" },
    faqs: [
      {
        q: "AI Platform Engineer vs MLOps Engineer?",
        a: "MLOps Engineers focus on individual model pipelines. Platform Engineers build the shared tools and infrastructure that many teams use. Platform roles need stronger software architecture and product thinking.",
      },
      {
        q: "What companies hire AI Platform Engineers?",
        a: "Large tech companies, banks, e-commerce, and any org with 10+ ML practitioners. Indian companies like Flipkart, Swiggy, Razorpay, and global firms all invest in internal AI platforms.",
      },
    ],
  },
  "ai-infrastructure-engineer": {
    slug: "ai-infrastructure-engineer",
    title: "AI Infrastructure Engineer Career Roadmap 2026",
    shortTitle: "AI Infra Engineer",
    metaTitle: "AI Infrastructure Engineer Roadmap 2026: GPU, K8s & Cloud AI",
    metaDescription:
      "AI Infrastructure Engineer roadmap: GPU clusters, Kubernetes for AI, networking, storage, cloud cost optimization. Salary ₹15–40 LPA India. Complete learning path.",
    keywords: [
      "AI infrastructure engineer roadmap",
      "AI infra career path",
      "GPU infrastructure engineer",
      "AI infrastructure salary India",
      "Kubernetes AI workloads 2026",
    ],
    salaryIndia: "₹15–40 LPA",
    salaryGlobal: "$130K–$210K",
    intro:
      "AI Infrastructure Engineers keep GPU clusters, inference services, and training pipelines running at scale. They bridge SRE, cloud engineering, and ML workloads — critical as AI compute costs dominate IT budgets.",
    overview: [
      "Linux systems administration and networking",
      "Kubernetes at scale: scheduling, autoscaling, operators",
      "GPU infrastructure: NVIDIA, CUDA basics, MIG partitioning",
      "Cloud AI services: AWS SageMaker, GCP Vertex, Azure ML",
      "Cost optimization, capacity planning, and reliability",
    ],
    phases: [
      {
        phase: "Systems & Cloud",
        duration: "Month 1–2",
        skills: ["Linux", "Networking", "AWS/GCP basics", "Terraform", "Monitoring"],
        projects: ["Multi-AZ cloud setup", "Infrastructure as code for a web stack"],
      },
      {
        phase: "Kubernetes Deep Dive",
        duration: "Month 2–4",
        skills: ["K8s architecture", "Helm", "Operators", "Ingress", "Persistent volumes", "RBAC"],
        projects: ["Production K8s cluster", "Stateful workload deployment"],
      },
      {
        phase: "AI Workloads",
        duration: "Month 4–6",
        skills: ["GPU nodes", "CUDA basics", "Distributed training setup", "Inference serving", "Model caching"],
        projects: ["GPU-enabled training job", "High-throughput inference service"],
      },
      {
        phase: "Reliability & Cost",
        duration: "Month 6–8",
        skills: ["SLOs/SLIs", "Chaos engineering", "Spot instances", "FinOps", "Capacity planning"],
        projects: ["AI workload autoscaling", "Cost dashboard for GPU usage"],
      },
    ],
    tools: ["Kubernetes", "Terraform", "Prometheus", "Grafana", "NVIDIA GPU Operator", "AWS", "Linux", "Helm"],
    relatedCourse: { label: "AIOps Training", href: "/aiops-training/" },
    faqs: [
      {
        q: "AI Infrastructure vs DevOps/SRE?",
        a: "Traditional DevOps/SRE handles general workloads. AI Infrastructure specializes in GPU scheduling, model serving latency, distributed training networking, and the unique failure modes of ML systems.",
      },
      {
        q: "Do I need CUDA programming skills?",
        a: "Not deep CUDA — but you need to understand GPU memory, batching, and scheduling. Most infra engineers configure GPU nodes and serving frameworks rather than writing kernels.",
      },
    ],
  },
};

export function getRoadmap(slug: string): CareerRoadmap | undefined {
  return ROADMAPS[slug as RoadmapSlug];
}

export function getAllRoadmaps(): CareerRoadmap[] {
  return ROADMAP_SLUGS.map((slug) => ROADMAPS[slug]);
}

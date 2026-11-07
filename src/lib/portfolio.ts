import type { PortfolioProject } from "@/lib/cms";

/**
 * Starter projects, taken from Rajinikanth's resume and the Orphanaut repo.
 * Used only until the portfolio_projects table exists; after that, edit them in /admin.
 * Client names are kept out on purpose: describe the client, not the brand, unless you have permission.
 */
export const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    slug: "orphanaut",
    title: "Orphanaut: find and delete leftover cloud resources",
    category: "open-source",
    client_label: "Free desktop app",
    summary:
      "Desktop app for Windows and macOS that finds leftover AWS, Azure and Google Cloud resources, including AI services, before they run up a bill.",
    problem:
      "Labs and experiments leave SageMaker domains, Bedrock resources, Azure OpenAI deployments and Vertex AI endpoints running, and the bill keeps growing.",
    solution:
      "Scans each cloud, shows a map of what every resource is connected to, estimates monthly cost, and deletes in the right order after you confirm.",
    results: [
      "AWS, Azure and Google Cloud in one app",
      "AI services like SageMaker, Bedrock, Azure OpenAI and Vertex AI",
      "MIT licensed, auto-updating",
    ],
    stack: ["Python", "AWS", "Azure", "Google Cloud"],
    image_url: "/assets/projects/orphanaut-map.png",
    link_url: "https://github.com/rajinikanthvadla-ai/orphanaut/releases/latest",
    repo_url: "https://github.com/rajinikanthvadla-ai/orphanaut",
    sort: 5,
    featured: true,
  },
  {
    slug: "agentic-aiops-incident-triage",
    title: "Agentic AIOps platform for incident triage",
    category: "client",
    client_label: "US database company",
    summary:
      "Multi-agent system that reads production alerts, pulls the right runbooks, suggests a fix and waits for human approval before acting.",
    problem: "On-call engineers lost time on noisy alerts and hunting through runbooks and post-mortems during incidents.",
    solution:
      "LangGraph agents (Planner, Validator, Forecasting, Notification, Supervisor) with agentic RAG over runbooks and post-mortems, human approval gates on every high-impact action, and guardrails plus tracing on every endpoint.",
    results: [
      "About 60% lower MTTR on noisy incidents",
      "Llama 3 and Mistral fine-tuned with QLoRA on 2M+ incident records",
      "Grounded answers with citations instead of guesses",
    ],
    stack: ["LangGraph", "Anthropic MCP", "GPT-4o", "Pinecone", "vLLM", "EKS", "LangSmith", "NeMo Guardrails", "FastAPI"],
    image_url: "",
    link_url: "",
    repo_url: "",
    sort: 10,
    featured: true,
  },
  {
    slug: "fintech-support-rag-chatbot",
    title: "Customer support RAG chatbot with human escalation",
    category: "client",
    client_label: "FinTech company",
    summary:
      "Production chatbot answering KYC, billing and policy questions for 80,000+ active users, handing over to a human when it is not sure.",
    problem: "Support agents spent most of their day on repeat tier-1 questions about KYC, billing and policy.",
    solution:
      "Hybrid retrieval with citations, PII redaction and confidence-based escalation to human agents over WhatsApp and Slack.",
    results: ["68% first-contact resolution on tier-1 queries", "41% lower average agent handling time", "80,000+ active users"],
    stack: ["GPT-4o", "Azure OpenAI", "LangChain", "Pinecone", "Azure AI Search", "FastAPI", "WhatsApp", "Slack"],
    image_url: "",
    link_url: "",
    repo_url: "",
    sort: 20,
    featured: true,
  },
  {
    slug: "fraud-detection-mlops",
    title: "Real-time fraud detection MLOps platform",
    category: "client",
    client_label: "UK payments processor",
    summary: "Champion vs challenger MLOps platform for fraud detection, forecasting and customer lifetime value.",
    problem: "New models needed a safe, automatic way into production without silent decay or risky manual releases.",
    solution:
      "MLflow and Kubeflow Pipelines on GKE: a new model must beat the live one on precision, recall, F1 and AUC-ROC before it is promoted, with drift-triggered retraining and canary rollouts through Argo CD.",
    results: [
      "18% fewer fraudulent chargebacks year over year",
      "About 22% better analyst precision",
      "About 99.9% deployment success rate",
    ],
    stack: ["MLflow", "Kubeflow", "GKE", "Vertex AI", "BigQuery", "Scala-Spark", "Evidently AI", "Argo CD", "Terraform"],
    image_url: "",
    link_url: "",
    repo_url: "",
    sort: 30,
    featured: true,
  },
  {
    slug: "contract-document-intelligence",
    title: "Document intelligence for contracts and compliance",
    category: "client",
    client_label: "Legal and finance teams",
    summary:
      "Pipeline that pulls key clauses out of scanned and digital contracts, scores risk and writes a short brief for reviewers.",
    problem: "Reviewing one contract by hand took about 90 minutes.",
    solution:
      "Azure Document Intelligence and Textract for extraction, Claude for clause analysis, Qdrant for retrieval, and an evaluation harness on a 200-contract golden set with LLM-as-judge scoring.",
    results: ["Contract review down from about 90 to about 12 minutes", "200-contract golden dataset for hallucination tracking"],
    stack: ["Azure Document Intelligence", "Claude", "LlamaIndex", "Qdrant", "AWS Textract", "Streamlit"],
    image_url: "",
    link_url: "",
    repo_url: "",
    sort: 40,
    featured: false,
  },
  {
    slug: "supply-chain-agents",
    title: "Multi-agent inventory and supply chain assistant",
    category: "client",
    client_label: "Retail pilot",
    summary:
      "Four agents covering inventory planning, reordering and supplier coordination, with human approval at every high-cost step.",
    problem: "Stock-outs and over-ordering were both eating margin.",
    solution: "LangGraph agents on GPT-4o, Claude and Bedrock with pgvector memory and approval gates.",
    results: ["35% fewer stock-outs in the pilot quarter", "22% less over-ordering"],
    stack: ["LangGraph", "GPT-4o", "Claude", "AWS Bedrock", "pgvector", "FastAPI"],
    image_url: "",
    link_url: "",
    repo_url: "",
    sort: 50,
    featured: false,
  },
];

/** What companies can hire Rajinikanth for. Shown on /work-with-me and in the request form. */
export const CONSULTING_SERVICES = [
  {
    id: "ai-agent",
    title: "Build an AI agent for your company",
    who: "Support, ops, sales or internal tools teams",
    what: "A working agent on your data: RAG over your docs, tool calls into your systems, human approval on risky actions, guardrails, tracing and cost limits.",
    output: "Deployed agent, evaluation set, runbook and handover",
  },
  {
    id: "roadmap",
    title: "AI product roadmap and architecture review",
    who: "Founders and engineering leads planning an AI feature or product",
    what: "We look at your idea, data and stack together, pick the right model and serving setup, and cost it out before you build.",
    output: "Written roadmap, architecture diagram, build-vs-buy call, cost estimate",
  },
  {
    id: "mlops-platform",
    title: "MLOps and LLMOps platform setup",
    who: "Teams with models stuck in notebooks or running without monitoring",
    what: "CI/CD for models, model registry, gated promotion, drift monitoring and retraining, GPU serving on Kubernetes, observability.",
    output: "Pipelines in your cloud (AWS, Azure or GCP) with Terraform and docs",
  },
  {
    id: "cost-review",
    title: "AI and cloud cost review",
    who: "Teams whose GPU, LLM API or cloud bill is growing faster than usage",
    what: "Model routing between frontier and open-weight models, GPU right-sizing, leftover resource cleanup, inference cost guardrails.",
    output: "Findings report with savings estimate and a fix plan",
  },
  {
    id: "corporate-training",
    title: "Corporate team training",
    who: "Engineering teams moving into MLOps, LLMOps or agents",
    what: "Live, hands-on program built on your stack and use cases, from fundamentals to production labs.",
    output: "Custom syllabus, live sessions, labs, recordings, assessments",
  },
] as const;

export const CONSULT_SERVICE_OPTIONS = [
  ...CONSULTING_SERVICES.map((s) => s.title),
  "1:1 mentorship or career guidance",
  "Something else",
];

export const CONSULT_BUDGETS = ["Not sure yet", "Under $2,000", "$2,000 to $10,000", "$10,000 to $30,000", "$30,000+"];
export const CONSULT_TIMELINES = ["As soon as possible", "Within a month", "1 to 3 months", "Just exploring"];

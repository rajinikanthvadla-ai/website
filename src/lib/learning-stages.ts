/** Shared stage order for the Universe path and the career bot. */
export type LearningStage = {
  title: string;
  caption: string;
  skillIds: string[];
};

export const LEARNING_STAGES: LearningStage[] = [
  {
    title: "Foundation",
    caption: "OS, version control, Python, data, networking, and APIs — assumed in every job posting.",
    skillIds: ["linux", "git", "python", "sql", "networking", "rest-apis"],
  },
  {
    title: "Package & Automate",
    caption: "Containers, CI/CD, infrastructure-as-code, and a real cloud account (AWS / GCP / Azure).",
    skillIds: ["docker", "cicd", "terraform", "cloud"],
  },
  {
    title: "Run & Observe",
    caption: "Kubernetes, Helm, and the Prometheus + Grafana stack teams actually run in production.",
    skillIds: ["kubernetes", "helm", "prometheus", "grafana"],
  },
  {
    title: "ML Engineering",
    caption: "Train with PyTorch & HuggingFace, track with MLflow, version data with DVC.",
    skillIds: ["pytorch", "huggingface", "mlflow", "dvc"],
  },
  {
    title: "ML Production",
    caption: "Ship models behind FastAPI, serve with KServe, monitor drift, manage features.",
    skillIds: ["fastapi", "kserve", "feature-stores", "drift-detection"],
  },
  {
    title: "LLMs & RAG",
    caption: "LLM APIs, retrieval, vector DBs, evaluation, guardrails, and AI security.",
    skillIds: ["llms", "rag", "vector-databases", "llm-evaluation", "guardrails", "ai-security"],
  },
  {
    title: "Agents & Orchestration",
    caption: "LangChain, LangGraph, MCP — how production agent systems are wired.",
    skillIds: ["langchain", "langgraph", "mcp"],
  },
  {
    title: "Scale & Platform",
    caption: "GPU inference, vLLM, Kubeflow pipelines, Spark data, Redis caching.",
    skillIds: ["vllm", "gpu", "kubeflow", "spark", "redis"],
  },
];

export const ALL_PATH_SKILL_IDS = LEARNING_STAGES.flatMap((s) => s.skillIds);

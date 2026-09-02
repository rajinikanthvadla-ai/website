export type InterviewQA = {
  q: string;
  a: string;
  tags?: string[];
};

export type InterviewCategory = {
  id: string;
  title: string;
  subtitle: string;
  questions: InterviewQA[];
};

export const INTERVIEW_CATEGORIES: InterviewCategory[] = [
  {
    id: "mlops",
    title: "MLOps Interview Questions",
    subtitle: "Pipelines, deployment, monitoring, and production ML systems.",
    questions: [
      {
        q: "What is MLOps and how is it different from DevOps?",
        a: "MLOps applies DevOps principles to the ML lifecycle: data versioning, experiment tracking, model registry, continuous training, deployment, and drift monitoring. DevOps focuses on app code and infra; MLOps also manages data, models, and evaluation metrics that change over time.",
        tags: ["fundamentals"],
      },
      {
        q: "Explain the stages of an end-to-end MLOps pipeline.",
        a: "Typical stages: data ingestion and validation → feature engineering → training/experiment tracking → model evaluation → registry → CI/CD packaging → deployment (online/batch) → monitoring (data/concept drift) → automated retraining triggers.",
        tags: ["pipeline"],
      },
      {
        q: "How do you detect and handle model drift in production?",
        a: "Track input distribution shifts (data drift), prediction/label shifts (concept drift), and performance metrics. Use statistical tests or PSI/KS, set alert thresholds, then retrain, fall back to a previous model, or add human review depending on severity.",
        tags: ["monitoring"],
      },
      {
        q: "What is a model registry and why do you need it?",
        a: "A model registry stores versioned models with metadata (metrics, data lineage, stage: Staging/Production). It enables reproducible promotion, rollback, auditability, and team collaboration — similar to an artifact registry for ML models.",
        tags: ["mlflow"],
      },
      {
        q: "Online vs batch inference — when do you choose each?",
        a: "Online (real-time API) for low-latency user-facing decisions. Batch for nightly scoring, recommendations dumps, or large offline jobs. Many systems mix both: batch features + online serving.",
        tags: ["deployment"],
      },
      {
        q: "How would you design CI/CD for ML?",
        a: "Separate data/model pipelines from app CI. Include unit tests, data schema checks, training reproducibility, offline eval gates, container build, canary/shadow deploy, and automated rollback on metric regression.",
        tags: ["ci-cd"],
      },
    ],
  },
  {
    id: "llmops",
    title: "LLMOps Interview Questions",
    subtitle: "RAG, fine-tuning, evaluation, cost, and production LLM systems.",
    questions: [
      {
        q: "What is LLMOps?",
        a: "LLMOps is the practice of deploying and operating large language model applications in production: prompt/version management, RAG pipelines, fine-tuning, evaluation, latency/cost monitoring, safety guardrails, and continuous improvement.",
        tags: ["fundamentals"],
      },
      {
        q: "Explain RAG architecture end to end.",
        a: "Ingest documents → chunk → embed → store in vector DB → retrieve top-k (often hybrid search) → optional re-rank → inject context into prompt → generate with citations. Add evals for retrieval quality and answer faithfulness.",
        tags: ["rag"],
      },
      {
        q: "When would you fine-tune vs use RAG?",
        a: "Use RAG for up-to-date private knowledge and citations. Fine-tune for style, domain language, structured behavior, or tool-use patterns. Many production systems combine light fine-tuning with strong RAG.",
        tags: ["fine-tuning"],
      },
      {
        q: "How do you evaluate an LLM application?",
        a: "Use offline eval suites (golden Q&A), retrieval metrics (recall@k), answer faithfulness/groundedness, latency and cost budgets, plus online feedback (thumbs, task success). Prefer automated graders + spot human review.",
        tags: ["evaluation"],
      },
      {
        q: "How do you reduce LLM cost and latency in production?",
        a: "Cache frequent prompts, use smaller/faster models for routing, compress context, quantize local models, batch where possible, set max tokens, and use retrieval to avoid stuffing huge contexts.",
        tags: ["cost"],
      },
      {
        q: "What guardrails would you put around an enterprise LLM agent?",
        a: "Input/output filtering, PII redaction, allowlisted tools, rate limits, human-in-the-loop for destructive actions, audit logs, RBAC, and policy checks before external API calls.",
        tags: ["safety"],
      },
    ],
  },
  {
    id: "aiops",
    title: "AIOps Interview Questions",
    subtitle: "Anomaly detection, RCA, predictive ops, and AI for infrastructure.",
    questions: [
      {
        q: "What is AIOps?",
        a: "AIOps uses AI/ML on telemetry (metrics, logs, traces, events) to detect anomalies, correlate incidents, predict failures, and automate remediation — reducing alert noise and MTTR.",
        tags: ["fundamentals"],
      },
      {
        q: "How does anomaly detection work on metrics?",
        a: "Baselines from historical seasonality, statistical thresholds, or ML models (isolation forest, forecasting residuals). Alerts fire on deviations; multi-signal correlation reduces false positives.",
        tags: ["anomaly"],
      },
      {
        q: "Explain root cause analysis with AIOps.",
        a: "Correlate alerts across services using topology/time windows, cluster related events, rank likely causes, and suggest runbooks. Graph/dependency context improves accuracy over single-metric alerts.",
        tags: ["rca"],
      },
      {
        q: "What is the difference between monitoring and observability?",
        a: "Monitoring checks known conditions (CPU > 90%). Observability lets you ask new questions using metrics, logs, and traces together — essential for complex distributed/ML systems.",
        tags: ["observability"],
      },
      {
        q: "How would you auto-remediate a common production incident?",
        a: "Detect signal → classify severity → run playbook (restart pod, scale, rollback) with approval gates for high risk → notify Slack/Jira → log outcome for learning. Always include kill switches.",
        tags: ["automation"],
      },
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents Interview Questions",
    subtitle: "Agent patterns, tools, memory, MCP, and multi-agent systems.",
    questions: [
      {
        q: "What is an AI agent vs a chatbot?",
        a: "A chatbot mainly generates text. An agent plans, uses tools/APIs, maintains state/memory, and completes multi-step goals. Agents need orchestration, permissions, and evaluation beyond chat quality.",
        tags: ["fundamentals"],
      },
      {
        q: "Explain ReAct / tool-calling agent loops.",
        a: "The model reasons, selects a tool, observes the result, then continues until a stop condition. Production agents add retries, timeouts, tool allowlists, and structured schemas for tool args.",
        tags: ["tools"],
      },
      {
        q: "What is MCP (Model Context Protocol)?",
        a: "MCP is a standard way for models/agents to connect to tools and data sources (servers/clients). It helps enterprises plug agents into GitHub, Slack, DBs, and internal APIs consistently.",
        tags: ["mcp"],
      },
      {
        q: "How do you design memory for agents?",
        a: "Short-term: conversation/state in the session. Long-term: vector store or knowledge graph for facts/preferences. Persist tool results carefully, avoid leaking secrets, and expire stale memory.",
        tags: ["memory"],
      },
      {
        q: "How do you test multi-agent systems?",
        a: "Unit-test tools, simulation evals for workflows, adversarial prompts, latency/cost budgets, and human review for critical paths. Measure task success rate, not just fluency.",
        tags: ["testing"],
      },
    ],
  },
  {
    id: "fde",
    title: "FDE Interview Questions",
    subtitle: "Forward Deployed / Full-stack Data Engineering for AI delivery.",
    questions: [
      {
        q: "What does an FDE (Forward Deployed Engineer) do in AI products?",
        a: "An FDE sits close to customers: scopes use cases, integrates data sources, customizes agents/pipelines, ships production pilots quickly, and feeds product feedback. Strong systems + customer skills matter.",
        tags: ["fundamentals"],
      },
      {
        q: "How do you design a reliable data pipeline for AI features?",
        a: "Define schemas/SLAs, idempotent jobs, validation checks, lineage, retries/DLQs, monitoring, and backfills. Prefer incremental processing and clear ownership of source → feature store → model.",
        tags: ["data"],
      },
      {
        q: "Batch vs streaming for AI workloads — tradeoffs?",
        a: "Batch is simpler and cheaper for periodic features. Streaming enables near-real-time signals but needs state, late data handling, and higher ops cost. Pick based on freshness requirements.",
        tags: ["streaming"],
      },
      {
        q: "How would you productionize a customer PoC into a stable service?",
        a: "Harden auth/secrets, add observability, define SLOs, automate deploy, write runbooks, add eval/regression tests, document handoff, and plan capacity/cost. Convert notebooks into services/pipelines.",
        tags: ["delivery"],
      },
    ],
  },
  {
    id: "genai-ml",
    title: "GenAI & ML Fundamentals",
    subtitle: "Core ML/GenAI concepts interviewers still ask.",
    questions: [
      {
        q: "Bias vs variance — how do you fix each?",
        a: "High bias (underfit): richer features, more complex model, longer training. High variance (overfit): more data, regularization, dropout, simpler model, cross-validation.",
        tags: ["ml"],
      },
      {
        q: "Precision vs recall — when does each matter?",
        a: "Precision: minimize false positives (spam filter). Recall: minimize false negatives (fraud/cancer detection). Use F1 when both matter; choose thresholds from business cost.",
        tags: ["metrics"],
      },
      {
        q: "What is embeddings and why are they useful?",
        a: "Embeddings map text/images into vectors capturing semantic similarity. Used for search, RAG, clustering, recommendations, and anomaly detection.",
        tags: ["embeddings"],
      },
      {
        q: "Explain transformers at a high level.",
        a: "Transformers use self-attention to weigh token relationships, enabling parallel training and strong language modeling. Core stack: tokenization → embeddings → attention blocks → output head.",
        tags: ["llm"],
      },
      {
        q: "How do you prevent hallucination in RAG systems?",
        a: "Strong retrieval, citation requirements, refusal when context is weak, grounded prompts, faithfulness evals, and temperature/control settings. Never claim unsupported facts.",
        tags: ["rag"],
      },
    ],
  },
  {
    id: "system-design",
    title: "AI System Design Questions",
    subtitle: "Architecture questions for MLOps / LLM / agent platforms.",
    questions: [
      {
        q: "Design a production recommendation system.",
        a: "Cover candidate generation, ranking model, features (batch + realtime), A/B testing, feedback loop, caching, monitoring CTR/latency, and fallback popularity models.",
        tags: ["design"],
      },
      {
        q: "Design a company RAG chatbot over Confluence + Slack + tickets.",
        a: "Connectors → ACL-aware indexing → chunk/embed → hybrid retrieval → re-rank → answer with citations → feedback → admin console. Enforce permissions at retrieval time.",
        tags: ["rag"],
      },
      {
        q: "Design an ML training platform on Kubernetes.",
        a: "GPU node pools, job queue (Kubeflow/Ray), experiment tracking, artifact store, secrets, network policies, autoscaling, cost attribution, and notebook → job conversion paths.",
        tags: ["k8s"],
      },
      {
        q: "How would you serve an LLM with high availability?",
        a: "Multi-replica inference (vLLM), load balancer, health checks, autoscaling on queue depth, model warm pools, canary rollout, circuit breakers, and regional failover if needed.",
        tags: ["serving"],
      },
    ],
  },
];

export const INTERVIEW_PAGE_INTRO = {
  title: "AI / ML Interview Questions",
  subtitle:
    "Practical interview questions for MLOps, AIOps, LLMOps, AI Agents, FDE, GenAI, and AI system design — aligned with what Rajinikanth Vadla teaches in live cohorts.",
};

export function getAllInterviewQuestions() {
  return INTERVIEW_CATEGORIES.flatMap((cat) =>
    cat.questions.map((qa) => ({ ...qa, categoryId: cat.id, categoryTitle: cat.title })),
  );
}

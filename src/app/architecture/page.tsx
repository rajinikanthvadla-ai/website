import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LINKS } from "@/lib/constants";
import YouTubeMembershipSection from "@/components/YouTubeMembershipSection";
import TechIcon from "@/components/architecture/TechIcon";
import MlopsDiagram from "@/components/architecture/MlopsDiagram";
import LlmopsDiagram from "@/components/architecture/LlmopsDiagram";
import AgenticDiagram from "@/components/architecture/AgenticDiagram";
import MultiAgentDiagram from "@/components/architecture/MultiAgentDiagram";

export const metadata: Metadata = {
  title: "Production AI Architecture Diagrams — MLOps, LLMOps, Agentic & Multi-Agent Interview Guide",
  description:
    "Real company-grade architecture diagrams with step-by-step flows: MLOps production pipelines, LLMOps/RAG systems, agentic AI with LangGraph + MCP, and multi-agent systems. Built for MLOps and AI engineer interview preparation.",
  keywords: [
    "MLOps architecture diagram",
    "LLMOps architecture",
    "RAG architecture diagram",
    "agentic AI architecture",
    "multi-agent system architecture",
    "MLOps interview questions",
    "LLMOps interview questions",
    "production ML system design",
    "LangGraph architecture",
    "MCP servers architecture",
    "feature store architecture",
    "AI engineer interview guide",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/architecture/" },
};

type Step = { title: string; desc: string };
type QA = { q: string; a: string };
type Tech = { slug?: string; label: string; fallback?: string; color?: string };

function ArchitectureSection({
  id,
  kicker,
  title,
  intro,
  tech,
  diagram,
  steps,
  qa,
  tradeoffs,
}: {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  tech: Tech[];
  diagram: ReactNode;
  steps: Step[];
  qa: QA[];
  tradeoffs: string[];
}) {
  return (
    <section id={id} className="py-16 md:py-20 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            {kicker}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-600 leading-relaxed max-w-4xl">{intro}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {tech.map((t) => (
            <TechIcon key={t.label} slug={t.slug} label={t.label} fallback={t.fallback} color={t.color} />
          ))}
        </div>

        <div className="panel p-4 md:p-6 overflow-x-auto bg-slate-50">
          {diagram}
          <p className="text-xs text-slate-500 mt-3 md:hidden">Scroll horizontally to view the full diagram.</p>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-6">How data flows, step by step</h3>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{step.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-1">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="panel p-6 border-l-4 border-l-blue-600">
            <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Interview questions you&apos;ll be asked</h3>
            <div className="space-y-4">
              {qa.map((item) => (
                <details key={item.q} className="group cursor-pointer">
                  <summary className="font-semibold text-slate-900 text-sm flex justify-between items-start gap-3">
                    {item.q}
                    <span className="text-lg leading-none group-open:rotate-180 transition-transform shrink-0">▼</span>
                  </summary>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="panel p-6 border-l-4 border-l-amber-500">
            <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Trade-offs / what can go wrong</h3>
            <ul className="space-y-3">
              {tradeoffs.map((t) => (
                <li key={t} className="text-slate-600 text-sm leading-relaxed flex gap-2">
                  <span className="text-amber-500 font-bold shrink-0">⚠</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const SECTIONS = [
  { id: "mlops", label: "1. MLOps Production" },
  { id: "llmops", label: "2. LLMOps / RAG" },
  { id: "agentic", label: "3. Agentic AI" },
  { id: "multi-agent", label: "4. Multi-Agent" },
];

export default function ArchitecturePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Production AI Architecture Diagrams — Interview Guide
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Four real, company-grade architectures — MLOps, LLMOps/RAG, Agentic AI, and Multi-Agent systems — with
            numbered flows, the exact interview questions you&apos;ll face, and the trade-offs senior engineers are
            expected to know.
          </p>
        </div>
      </section>

      {/* Sticky table of contents */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 overflow-x-auto py-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 1. MLOps */}
      <ArchitectureSection
        id="mlops"
        kicker="Architecture 1 · Classic ML Lifecycle"
        title="MLOps Production Architecture"
        intro="This is the reference architecture for a classic ML system in production — think fraud detection at a fintech or demand forecasting at a retailer. Data flows from transactional and streaming sources through orchestrated pipelines into a feature store, models are trained on GPU-backed Kubernetes clusters and versioned in a registry, and CI/CD ships them behind an autoscaled serving layer. Monitoring closes the loop: when drift is detected, the pipeline retrains automatically. If you can whiteboard this diagram and defend every box, you pass the MLOps system-design round at most companies."
        tech={[
          { slug: "postgresql", label: "PostgreSQL" },
          { slug: "snowflake", label: "Snowflake" },
          { slug: "apachekafka", label: "Kafka" },
          { slug: "apacheairflow", label: "Airflow" },
          { slug: "apachespark", label: "Spark" },
          { label: "Feast", fallback: "FS", color: "#e11d48" },
          { slug: "redis", label: "Redis" },
          { slug: "mlflow", label: "MLflow" },
          { slug: "ray", label: "Ray" },
          { slug: "nvidia", label: "NVIDIA" },
          { slug: "githubactions", label: "GH Actions" },
          { slug: "docker", label: "Docker" },
          { slug: "argo", label: "ArgoCD" },
          { slug: "kubernetes", label: "Kubernetes" },
          { slug: "vllm", label: "vLLM" },
          { slug: "nginx", label: "NGINX" },
          { slug: "prometheus", label: "Prometheus" },
          { slug: "grafana", label: "Grafana" },
          { slug: "terraform", label: "Terraform" },
        ]}
        diagram={<MlopsDiagram />}
        steps={[
          {
            title: "Ingest raw data",
            desc: "Airflow DAGs (scheduled or sensor-triggered) pull batch data from PostgreSQL and Snowflake over JDBC, and consume event streams from Kafka topics. Raw data lands in cloud object storage (S3/GCS) as the source of truth.",
          },
          {
            title: "Transform with Spark",
            desc: "Spark jobs clean, join, deduplicate, and aggregate raw data into training-ready datasets. Heavy jobs run on a separate node pool so they never starve the serving cluster.",
          },
          {
            title: "Materialize features to the feature store",
            desc: "Feast registers feature definitions once and materializes them to two stores: an offline store (Parquet on S3 / Snowflake) for training, and an online store (Redis) for millisecond lookups at inference time.",
          },
          {
            title: "Train on versioned feature sets",
            desc: "Training jobs read features with point-in-time-correct joins — each training row gets the feature values as they were at event time, which prevents data leakage. Distributed training runs on Ray across Kubernetes nodes with NVIDIA GPUs.",
          },
          {
            title: "Log and register the model",
            desc: "Every run is logged to MLflow Tracking (params, metrics, artifacts). The best run is promoted to the MLflow Model Registry with a version, a model signature, and a stage (staging → production).",
          },
          {
            title: "Registry promotion triggers CI",
            desc: "A webhook on registry promotion kicks off a GitHub Actions workflow: unit tests, data validation, model quality gates (e.g. AUC must beat the current production model), and security scans.",
          },
          {
            title: "Build and push the image",
            desc: "Docker builds a serving image containing the exact model version and dependencies, tags it with the model version and git SHA, and pushes it to a container registry (ECR/GAR).",
          },
          {
            title: "GitOps deploy with ArgoCD",
            desc: "The pipeline updates image tags in a Git repo; ArgoCD detects the change and syncs it to Kubernetes. Rollouts are canary or blue-green — the new version gets 5% of traffic first.",
          },
          {
            title: "Serve behind NGINX",
            desc: "KServe (or vLLM for LLM models, FastAPI for custom logic) serves predictions behind an NGINX ingress on :443 with TLS. Horizontal Pod Autoscaler scales replicas on QPS and GPU utilization.",
          },
          {
            title: "Monitor everything",
            desc: "Prometheus scrapes latency, throughput, and error metrics every 15s; Grafana dashboards and alert rules watch SLOs. Evidently compares live feature and prediction distributions against the training baseline to detect drift.",
          },
          {
            title: "Close the feedback loop",
            desc: "When drift or accuracy decay crosses a threshold, an alert triggers the Airflow retraining DAG — the loop starts again at step 1. Ground-truth labels (e.g. confirmed fraud) flow back into the data sources.",
          },
        ]}
        qa={[
          {
            q: "Why do we need a feature store instead of computing features in the serving app?",
            a: "Three reasons: (1) it eliminates training/serving skew because the same definitions produce both offline and online features, (2) point-in-time-correct joins prevent label leakage during training, and (3) features become reusable and discoverable across teams instead of re-implemented per project.",
          },
          {
            q: "How do you safely deploy a new model version?",
            a: "Registry stages plus GitOps: promote the model to 'staging', let CI run quality gates against the production baseline, then ArgoCD rolls out as a canary (5% traffic) with automatic rollback if latency or error-rate SLOs breach. Rollback is a Git revert — the previous image tag is still in the registry.",
          },
          {
            q: "What's the difference between data drift and concept drift?",
            a: "Data drift means the input feature distribution changed (P(X) shifted — e.g. a new customer segment). Concept drift means the relationship between inputs and labels changed (P(Y|X) shifted — e.g. fraudsters adapted their tactics). You detect the first with distribution tests (PSI, KS) on features, the second only with delayed ground-truth accuracy monitoring.",
          },
          {
            q: "Batch vs streaming features — when do you need which?",
            a: "Batch (Spark/Airflow) is fine when features change slowly and freshness of hours is acceptable — cheaper and simpler. Streaming (Kafka + Flink/Spark Streaming) is needed when a feature must reflect the last few seconds, like 'transactions in the last 5 minutes' for fraud scoring. Most production systems are a hybrid.",
          },
        ]}
        tradeoffs={[
          "Airflow + Spark + Feast + MLflow + KServe is a lot of platform for a team shipping one model. Start with a single pipeline and add components only when the pain is real.",
          "Online feature stores add operational cost and a consistency problem: Redis and the offline store can diverge if materialization fails silently.",
          "GPU nodes are expensive and slow to provision; without autoscaling and spot instances, training clusters burn budget idle.",
          "Automated retraining loops can amplify bias or learn from poisoned feedback if nobody validates the new training data.",
          "Canary analysis is only as good as your metrics — a model can pass latency SLOs while quietly making worse predictions.",
        ]}
      />

      {/* 2. LLMOps / RAG */}
      <ArchitectureSection
        id="llmops"
        kicker="Architecture 2 · Enterprise GenAI"
        title="LLMOps / RAG Production Architecture"
        intro="This is how enterprises ship a GenAI knowledge assistant over their own documents: an offline indexing pipeline chunks and embeds content into a vector database, and an online path retrieves the most relevant chunks, reranks them, and sends them with a versioned prompt through an LLM gateway to a foundation model. Guardrails filter inputs and outputs, and every request is traced for cost, latency, and quality. User feedback feeds a fine-tuning loop so the system improves instead of stagnating. This is the single most common system-design interview topic for GenAI roles right now."
        tech={[
          { slug: "langchain", label: "LangChain" },
          { label: "LlamaIndex", fallback: "LI", color: "#1c3c3c" },
          { label: "OpenAI", fallback: "OA", color: "#10a37f" },
          { slug: "huggingface", label: "HuggingFace" },
          { slug: "postgresql", label: "pgvector" },
          { label: "Pinecone", fallback: "PC", color: "#1e40af" },
          { label: "Weaviate", fallback: "WV", color: "#059669" },
          { label: "LiteLLM", fallback: "LG", color: "#7c3aed" },
          { slug: "anthropic", label: "Anthropic" },
          { slug: "googlegemini", label: "Gemini" },
          { label: "NeMo", fallback: "NG", color: "#76b900" },
          { slug: "fastapi", label: "FastAPI" },
          { slug: "nextdotjs", label: "Next.js" },
          { slug: "opentelemetry", label: "OpenTelemetry" },
          { label: "Langfuse", fallback: "LF", color: "#0f766e" },
          { slug: "grafana", label: "Grafana" },
          { slug: "nvidia", label: "NVIDIA" },
        ]}
        diagram={<LlmopsDiagram />}
        steps={[
          {
            title: "Chunk the documents",
            desc: "Ingestion jobs pull PDFs, wiki pages, and tickets, then split them into semantically coherent chunks (typically 300–800 tokens with 10–15% overlap) using LangChain or LlamaIndex. Each chunk keeps metadata: source, author, timestamp, access-control tags.",
          },
          {
            title: "Embed every chunk",
            desc: "Each chunk is converted to a dense vector by an embedding model — OpenAI text-embedding-3 for managed simplicity, or an open HuggingFace model (e.g. BGE, E5) when data can't leave the VPC.",
          },
          {
            title: "Index into the vector database",
            desc: "Vectors are upserted with their metadata into an ANN index (HNSW) — pgvector for teams already on PostgreSQL, Pinecone or Weaviate for managed scale. Metadata indexes enable pre-filtering by tenant or ACL before similarity search.",
          },
          {
            title: "User query arrives",
            desc: "The Next.js chat UI sends the user's question to the FastAPI backend over HTTPS. Authentication and per-user authorization happen here — the app attaches the user's tenant/ACL context to the request.",
          },
          {
            title: "Embed the query and retrieve",
            desc: "The retriever embeds the question with the same embedding model (mismatched embedding models between index and query are a classic production bug) and issues a hybrid search: vector similarity plus BM25 keyword match.",
          },
          {
            title: "Vector DB returns top-k",
            desc: "The ANN index returns the k nearest chunks (k ≈ 20–50) filtered by the user's ACL tags. Latency budget for this hop is typically under 50 ms with HNSW.",
          },
          {
            title: "Rerank for precision",
            desc: "A cross-encoder reranker scores each (query, chunk) pair jointly — much more accurate than bi-encoder similarity but slower, which is why it only runs on the top-k, not the whole corpus. The top 3–8 chunks survive.",
          },
          {
            title: "Assemble the prompt and call the gateway",
            desc: "The surviving chunks are injected into a versioned prompt template from the prompt registry (LangSmith) — versioned so you can roll back prompt changes like code. The request goes to the LiteLLM gateway, not directly to a provider.",
          },
          {
            title: "Gateway routes to an LLM",
            desc: "LiteLLM gives you one OpenAI-compatible API over GPT, Claude, and Gemini: automatic retries, fallbacks when a provider is down, per-team API-key budgets, and request/response logging. Model choice becomes config, not code.",
          },
          {
            title: "Guardrails, then stream the answer",
            desc: "The response passes NeMo Guardrails output rails (factuality check against retrieved context, PII redaction, topic boundaries) and is streamed back to the UI token-by-token over SSE. Input rails also screened the original question for prompt injection.",
          },
          {
            title: "Trace and measure everything",
            desc: "Every request emits OpenTelemetry spans — retrieval latency, token counts, model cost — collected into Langfuse traces and Grafana dashboards tracking cost per query and p95 latency SLOs.",
          },
          {
            title: "Feed back and fine-tune",
            desc: "Thumbs-down answers and corrected responses are curated into a dataset. A PEFT/LoRA fine-tune on GPUs adapts an open model to your domain tone and edge cases; the adapter is versioned in a registry and served through the same gateway.",
          },
        ]}
        qa={[
          {
            q: "How do you choose a chunking strategy?",
            a: "Start with recursive character splitting at 300–800 tokens with 10–15% overlap, then measure retrieval quality on a golden Q&A set. Chunk too big and you dilute relevance and blow the context window; too small and you lose the context the LLM needs to answer. Structure-aware splitting (by headings/tables) usually beats naive fixed-size splits for enterprise docs.",
          },
          {
            q: "RAG vs fine-tuning — when do you use which?",
            a: "RAG injects knowledge — use it when answers depend on large, frequently changing document sets, and when you need citations and access control. Fine-tuning changes behavior — use it for tone, format, and domain reasoning patterns. Production systems usually do both: RAG for facts, a LoRA adapter for style and task behavior.",
          },
          {
            q: "How do you evaluate a RAG system?",
            a: "Build a golden dataset of question/answer pairs from real users, then measure three RAGAS-style metrics: context recall (did retrieval find the needed chunks), faithfulness (is the answer grounded in the context, no hallucination), and answer relevance. Run evals in CI on every prompt, chunking, or model change — never ship on vibes.",
          },
          {
            q: "Why put a gateway (LiteLLM) between the app and the LLM providers?",
            a: "It decouples your code from any single provider: one API shape, automatic failover when OpenAI is down, per-team spend limits, central logging of every prompt and response, and the ability to A/B models or route cheap queries to cheap models. Without it, provider migration is a rewrite.",
          },
        ]}
        tradeoffs={[
          "The index goes stale: documents change daily, but embeddings are only as fresh as your last ingestion run. Incremental indexing pipelines are harder than the demo version.",
          "Switching embedding models means re-embedding the entire corpus — vectors from different models are not comparable. Plan for dual-index migrations.",
          "Reranking adds 50–200 ms per query; on tight latency budgets you either shrink k, use a smaller cross-encoder, or skip it for easy queries.",
          "Retrieved context is untrusted input: a poisoned document can prompt-inject the LLM ('ignore previous instructions'). Guardrails and content filtering are not optional in enterprise deployments.",
          "Cost surprises: long contexts × many users × premium models = five-figure monthly bills. Token budgets and caching (semantic cache for repeat questions) matter.",
        ]}
      />

      {/* 3. Agentic */}
      <ArchitectureSection
        id="agentic"
        kicker="Architecture 3 · Single Autonomous Agent"
        title="Agentic AI Architecture"
        intro="This is a production single-agent system — for example an SRE copilot that investigates incidents or a support agent that resolves tickets end to end. A LangGraph orchestrator drives a planner LLM through an Observe → Plan → Act → Reflect loop, with Redis and a vector store as memory, MCP servers as the standardized tool layer, a human approval gate for risky actions, and a full audit trail. The difference between a demo agent and this diagram is exactly what interviewers probe: state, safety, and observability."
        tech={[
          { slug: "langgraph", label: "LangGraph" },
          { label: "OpenAI", fallback: "OA", color: "#10a37f" },
          { slug: "anthropic", label: "Claude" },
          { slug: "redis", label: "Redis" },
          { slug: "postgresql", label: "PostgreSQL" },
          { slug: "github", label: "GitHub MCP" },
          { label: "Slack", fallback: "SL", color: "#4a154b" },
          { slug: "jira", label: "Jira" },
          { slug: "kubernetes", label: "K8s API" },
          { label: "Langfuse", fallback: "LF", color: "#0f766e" },
        ]}
        diagram={<AgenticDiagram />}
        steps={[
          {
            title: "Task enters the orchestrator",
            desc: "A user message, webhook (e.g. a PagerDuty alert), or cron trigger creates a new run in the LangGraph state graph. State is checkpointed after every node, so a crashed agent resumes instead of restarting.",
          },
          {
            title: "Orchestrator invokes the planner",
            desc: "The planner/reasoner node calls the LLM (GPT-4-class or Claude) with a system prompt, the current state, and JSON schemas of every available tool. The model's tool-calling interface is the contract between reasoning and execution.",
          },
          {
            title: "Memory read/write",
            desc: "Short-term memory (Redis) holds the current session's working context — conversation, intermediate results — with TTLs. Long-term memory (a vector DB) stores distilled knowledge from past incidents: 'last time this error appeared, the fix was X'.",
          },
          {
            title: "The agent loop runs",
            desc: "Observe (read state and tool results) → Plan (decide the next action) → Act (emit a tool call) → Reflect (did it work? update the plan). The loop continues until the task is done, the model declares completion, or a hard max-iteration / token budget is hit.",
          },
          {
            title: "Tool calls go through MCP servers",
            desc: "Every external capability — GitHub, Slack, Jira, the Kubernetes API — is exposed as an MCP (Model Context Protocol) server speaking JSON-RPC. This standardizes auth, schemas, and rate limits, and lets you add tools without touching agent code.",
          },
          {
            title: "Risky actions hit the approval gate",
            desc: "Actions are classified by risk. Reads (logs, status) execute autonomously; writes with blast radius (restart a deployment, merge a PR, close a ticket) pause the graph and request human approval in Slack or a UI. The graph resumes from its checkpoint on approval.",
          },
          {
            title: "Approved actions execute",
            desc: "The execution layer performs the action with the agent's own least-privilege service account — kubectl rollout, git merge, API call. Results flow back into the loop as the next observation.",
          },
          {
            title: "Everything is written to the audit log",
            desc: "An append-only PostgreSQL audit log records who approved what, which tool ran with which arguments, and what changed. In regulated environments this log is not optional — it is the compliance story.",
          },
          {
            title: "Full traces to Langfuse",
            desc: "Every LLM call and tool invocation is traced with token counts, latency, and cost. When an agent misbehaves in production, the trace is how you replay and debug its exact reasoning trajectory.",
          },
        ]}
        qa={[
          {
            q: "Explain the ReAct / agent loop.",
            a: "The agent alternates reasoning and acting: it observes the current state, the LLM plans the next step and emits a structured tool call, the tool executes and returns an observation, and the model reflects on the result before the next iteration. LangGraph makes this an explicit state graph with checkpoints instead of a while-loop in a notebook — that's what makes it resumable and inspectable.",
          },
          {
            q: "How do you stop an agent from going rogue or looping forever?",
            a: "Layered defenses: hard max-iteration and token/cost budgets per run, an allowlist of tools with least-privilege credentials, risk classification with human approval for writes, rate limits on the MCP servers, and a kill switch that aborts the graph. You assume the model will eventually be wrong and design the blast radius accordingly.",
          },
          {
            q: "What is MCP and why not just call APIs directly?",
            a: "Model Context Protocol is an open standard for exposing tools and data to LLMs over JSON-RPC. Direct API calls hardcode auth, schemas, and retries into agent code; MCP servers encapsulate all that behind a uniform interface, so the same agent can use community-built servers (GitHub, Slack, Jira) and swapping a tool implementation doesn't touch the agent.",
          },
          {
            q: "How do you evaluate an agent before putting it in production?",
            a: "Build task-level evals: a suite of realistic scenarios (e.g. 50 historical incidents) with known-good outcomes. Measure task success rate, steps/tokens per task, and unsafe-action attempts. Then shadow-mode the agent in production — it plans but doesn't execute — and compare its decisions against what humans actually did.",
          },
        ]}
        tradeoffs={[
          "Agents are non-deterministic: the same input can take different trajectories. Checkpointed state helps you replay, but tests can't guarantee behavior the way they do for deterministic services.",
          "Errors compound across the loop — a bad observation at step 2 poisons every plan after it. Reflection steps and validation tools mitigate but don't eliminate this.",
          "Cost and latency scale with loop iterations; a single task can burn tens of thousands of tokens. Budgets and smaller models for simple steps keep it sane.",
          "Tool outputs are untrusted input: a malicious Jira ticket can prompt-inject the agent. Sanitize tool results and never let tool text override the system prompt.",
          "HITL gates protect you but cap throughput — tune which actions truly need approval or your on-call engineer becomes the bottleneck.",
        ]}
      />

      {/* 4. Multi-agent */}
      <ArchitectureSection
        id="multi-agent"
        kicker="Architecture 4 · Agent Teams"
        title="Multi-Agent System Architecture"
        intro="This is a crew of specialized agents working like a software-delivery team: a supervisor decomposes an incoming feature request and routes subtasks over a message bus to a PM agent, an architect, parallel coder agents, a reviewer/QA agent that aggregates their work, and a DevOps agent that deploys. Agents coordinate through a shared blackboard memory instead of brittle point-to-point calls, and a policy engine plus human checkpoints govern anything that touches production. Frameworks like CrewAI, AutoGen, and LangGraph implement this pattern; the interview questions are about coordination, failure modes, and when it's overkill."
        tech={[
          { slug: "crewai", label: "CrewAI" },
          { label: "AutoGen", fallback: "AG", color: "#7c3aed" },
          { slug: "langgraph", label: "LangGraph" },
          { slug: "redis", label: "Redis" },
          { slug: "apachekafka", label: "Kafka" },
          { slug: "postgresql", label: "PostgreSQL" },
          { label: "OPA", fallback: "OP", color: "#0f766e" },
          { label: "OpenAI", fallback: "OA", color: "#10a37f" },
          { slug: "anthropic", label: "Claude" },
          { slug: "huggingface", label: "HuggingFace" },
          { slug: "github", label: "GitHub" },
          { slug: "jira", label: "Jira" },
          { slug: "argo", label: "ArgoCD" },
          { slug: "docker", label: "Docker" },
          { slug: "opentelemetry", label: "OTel" },
          { slug: "grafana", label: "Grafana" },
        ]}
        diagram={<MultiAgentDiagram />}
        steps={[
          {
            title: "Task arrives at the supervisor",
            desc: "A feature request or ticket lands at the supervisor/orchestrator (CrewAI, AutoGen, or a LangGraph graph). The supervisor — itself an LLM agent with routing tools — decomposes it into subtasks with owners, dependencies, and done-criteria.",
          },
          {
            title: "Subtasks published to the message bus",
            desc: "Each subtask is published to a topic on the shared bus (Redis Streams for small deployments, Kafka when you need replay and retention). The bus decouples agents: producers and consumers never call each other directly.",
          },
          {
            title: "Workers subscribe and claim work",
            desc: "Each specialized agent subscribes to its topic and claims tasks. Every worker has its own LLM (matched to the job — cheap models for triage, frontier models for coding) and its own tool set via MCP.",
          },
          {
            title: "PM agent hands off to the architect",
            desc: "The PM agent turns the request into a spec with acceptance criteria (writing to Jira via its tools). When the spec lands on the bus, the architect agent picks it up and produces a technical design and task breakdown, reading the repo with read-only tools.",
          },
          {
            title: "Coder agents work in parallel",
            desc: "Two (or more) coder agents implement independent tasks simultaneously on separate git branches. Parallelism is the real speedup of multi-agent systems — but only works because tasks were decomposed with clean boundaries.",
          },
          {
            title: "Reviewer/QA aggregates and validates",
            desc: "The reviewer/QA agent is the aggregator: it collects the branches, runs the test suite and static analysis via its tools, reviews diffs, and either requests changes (loop back to coders) or signs off. Nothing merges without this gate.",
          },
          {
            title: "DevOps agent deploys",
            desc: "On QA pass, the DevOps deployer agent packages images with Docker and updates the GitOps repo; ArgoCD syncs to Kubernetes. The deployer has no production credentials of its own beyond what policy allows.",
          },
          {
            title: "Shared blackboard memory",
            desc: "All agents read and write shared state — specs, designs, task status, decisions — in a PostgreSQL blackboard with pgvector for semantic search over past work. Optimistic versioning prevents two agents from silently overwriting each other.",
          },
          {
            title: "Policy engine and HITL gate",
            desc: "Before any deploy or merge, the action is evaluated by an OPA (Open Policy Agent) policy — e.g. 'deploys to prod only from reviewed branches, only during business hours' — and high-impact actions pause for a human checkpoint.",
          },
          {
            title: "End-to-end observability",
            desc: "OpenTelemetry spans propagate across every bus message, so a single trace shows the full task lifecycle: supervisor decision → agent runs → tool calls → deploy. Grafana dashboards track per-agent cost, success rate, and loop counts.",
          },
        ]}
        qa={[
          {
            q: "Why a message bus instead of agents calling each other directly?",
            a: "Decoupling and replay. Direct calls create an N² web of dependencies where one slow agent blocks the rest and failures cascade. A bus gives you async handoffs, durable queues when an agent crashes, the ability to replay events for debugging, and easy addition of new agent types without changing existing ones.",
          },
          {
            q: "How do you prevent infinite loops between agents?",
            a: "Three mechanisms: per-task turn/iteration budgets enforced by the supervisor, explicit done-criteria in every subtask contract, and supervisor arbitration — the reviewer can't bounce work back to a coder more than N times before the supervisor escalates to a human. Without these, two agents can politely disagree forever while burning tokens.",
          },
          {
            q: "How do agents avoid conflicting writes to shared state?",
            a: "The blackboard uses optimistic concurrency: every record has a version, writes are compare-and-swap, and losers re-read and retry. For truly contentious resources (the same file, the same ticket), the supervisor serializes access by assigning a single owner. Never let agents hold long-lived locks.",
          },
          {
            q: "When should you NOT use a multi-agent architecture?",
            a: "When a single agent with good tools can do the job — most tasks. Multi-agent pays off when subtasks genuinely parallelize, need different tools/permissions, or benefit from adversarial separation (coder vs reviewer). Otherwise you're multiplying cost, latency, and debugging difficulty for no capability gain.",
          },
        ]}
        tradeoffs={[
          "Coordination overhead is real: decomposing, routing, and aggregating can cost more tokens than the actual work on small tasks.",
          "Cost multiplies by agent count — a 6-agent crew with frontier models on every seat gets expensive fast. Match model size to role.",
          "Debugging emergent behavior is hard: a wrong output may come from the supervisor's decomposition, a worker's reasoning, or a stale blackboard entry. Distributed tracing is the only way to stay sane.",
          "The bus is a single point of failure and a security boundary — topic-level ACLs matter, because any agent that can publish to 'deploy' can trigger the pipeline.",
          "Adversarial pairs (coder/reviewer) only help if the reviewer is genuinely independent — same model, same prompt style often means same blind spots.",
        ]}
      />

      <YouTubeMembershipSection compact />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-10 text-white text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Learn to Build These Architectures Yourself</h2>
            <p className="text-lg mb-6 leading-relaxed">
              These four systems are exactly what you build in the live MLOps + LLMOps + AIOps + AI Agents masterclass —
              hands-on, on real cloud infrastructure, with 1-on-1 mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/mlops-aiops-masterclass" className="bg-white text-blue-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-bold transition-colors">
                View the Masterclass
              </a>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-bold transition-colors">
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

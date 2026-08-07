import { Lane, NodeBox, FlowArrow, FlowPath } from "./DiagramPrimitives";

/**
 * LLMOps / RAG production architecture (enterprise knowledge assistant).
 * Numbered badges match the step list in src/app/architecture/page.tsx.
 */
export default function LlmopsDiagram() {
  return (
    <svg viewBox="0 0 1100 500" className="min-w-[980px] w-full" role="img" aria-label="LLMOps RAG production architecture diagram">
      <defs>
        <marker id="llm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#64748b" />
        </marker>
        <marker id="llm-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#059669" />
        </marker>
      </defs>

      {/* Lanes */}
      <Lane x={10} y={30} w={200} h={400} label="Ingestion & Indexing" tint="#eff6ff" stroke="#bfdbfe" />
      <Lane x={230} y={30} w={150} h={200} label="Retrieval" tint="#f0fdf4" stroke="#bbf7d0" />
      <Lane x={400} y={30} w={240} h={400} label="LLM Gateway" tint="#f5f3ff" stroke="#ddd6fe" />
      <Lane x={660} y={30} w={170} h={200} label="Application" tint="#fff7ed" stroke="#fed7aa" />
      <Lane x={850} y={30} w={220} h={400} label="Observability & Improvement" tint="#fef2f2" stroke="#fecaca" />

      {/* Ingestion */}
      <NodeBox x={25} y={60} w={170} h={54} title="Documents" subtitle="PDFs · Confluence · tickets" icons={[{ fallback: "DC", color: "#475569" }]} />
      <NodeBox x={25} y={134} w={170} h={64} title="Chunking" subtitle="LangChain · LlamaIndex" icons={[{ slug: "langchain" }, { fallback: "LI", color: "#1c3c3c" }]} />
      <NodeBox x={25} y={218} w={170} h={64} title="Embeddings" subtitle="OpenAI · HuggingFace" icons={[{ fallback: "OA", color: "#10a37f" }, { slug: "huggingface" }]} />
      <NodeBox x={25} y={302} w={170} h={76} title="Vector Database" subtitle="pgvector · Pinecone · Weaviate" icons={[{ slug: "postgresql" }, { fallback: "PC", color: "#1e40af" }, { fallback: "WV", color: "#059669" }]} />

      {/* Retrieval */}
      <NodeBox x={240} y={60} w={130} h={64} title="Retriever" subtitle="top-k hybrid" icons={[{ fallback: "RT", color: "#334155" }]} />
      <NodeBox x={240} y={150} w={130} h={60} title="Reranker" subtitle="cross-encoder" icons={[{ fallback: "RR", color: "#334155" }]} />

      {/* LLM Gateway */}
      <NodeBox x={415} y={60} w={210} h={70} title="LiteLLM Gateway" subtitle="routing · retries · budgets" icons={[{ fallback: "LG", color: "#7c3aed" }]} />
      <NodeBox x={415} y={150} w={210} h={64} title="LLM Providers" subtitle="GPT · Claude · Gemini" icons={[{ fallback: "OA", color: "#10a37f" }, { slug: "anthropic" }, { slug: "googlegemini" }]} />
      <NodeBox x={415} y={240} w={210} h={60} title="NeMo Guardrails" subtitle="input / output rails" icons={[{ fallback: "NG", color: "#76b900" }]} />
      <NodeBox x={415} y={322} w={210} h={56} title="Prompt Registry" subtitle="LangSmith · evals" icons={[{ fallback: "LS", color: "#1c3c3c" }, { slug: "langchain" }]} />

      {/* Application */}
      <NodeBox x={675} y={60} w={140} h={76} title="FastAPI + Next.js" subtitle="SSE streaming chat" icons={[{ slug: "fastapi" }, { slug: "nextdotjs" }]} />
      <NodeBox x={675} y={160} w={140} h={50} title="Users / SSO" icons={[{ fallback: "US", color: "#334155" }]} />

      {/* Observability */}
      <NodeBox x={865} y={60} w={190} h={64} title="Tracing" subtitle="Langfuse · OTel spans" icons={[{ slug: "opentelemetry" }, { fallback: "LF", color: "#0f766e" }]} />
      <NodeBox x={865} y={144} w={190} h={60} title="Dashboards" subtitle="cost & latency SLOs" icons={[{ slug: "grafana" }]} />
      <NodeBox x={865} y={224} w={190} h={54} title="Feedback" subtitle="thumbs · corrections" icons={[{ fallback: "FB", color: "#334155" }]} />
      <NodeBox x={865} y={300} w={190} h={78} title="Fine-tuning Loop" subtitle="PEFT/LoRA on GPUs" icons={[{ slug: "huggingface" }, { slug: "nvidia" }]} />

      {/* Flows — endpoints snap to node box edges */}
      {/* 1-3: indexing chain */}
      <FlowArrow x1={110} y1={114} x2={110} y2={132} marker="llm-arrow" step={1} />
      <FlowArrow x1={110} y1={198} x2={110} y2={216} marker="llm-arrow" step={2} />
      <FlowArrow x1={110} y1={282} x2={110} y2={300} marker="llm-arrow" step={3} />

      {/* 4: user query → app */}
      <FlowArrow x1={745} y1={160} x2={745} y2={136} marker="llm-arrow" step={4} />

      {/* 5: app → retriever */}
      <FlowArrow
        x1={675}
        y1={98}
        x2={372}
        y2={92}
        marker="llm-arrow"
        step={5}
        stepX={530}
        stepY={84}
        label="embed query"
        labelDx={0}
        labelDy={-10}
      />

      {/* 6: retriever → vector DB (ANN lookup) */}
      <FlowPath
        d="M240 92 H208 V340 H197"
        marker="llm-arrow"
        step={6}
        stepX={208}
        stepY={220}
        label="ANN top-k"
        labelX={228}
        labelY={332}
      />

      {/* 7: retrieve → rerank */}
      <FlowArrow x1={305} y1={124} x2={305} y2={148} marker="llm-arrow" step={7} />

      {/* 8: reranker → gateway */}
      <FlowPath d="M370 180 H398 V95 H415" marker="llm-arrow" step={8} stepX={398} stepY={140} />

      {/* 9: gateway → providers */}
      <FlowArrow x1={520} y1={130} x2={520} y2={148} marker="llm-arrow" step={9} />

      {/* providers → guardrails */}
      <FlowArrow x1={520} y1={214} x2={520} y2={238} marker="llm-arrow" />

      {/* prompt registry → guardrails */}
      <FlowArrow x1={520} y1={322} x2={520} y2={300} marker="llm-arrow" dashed label="prompts" labelDx={36} labelDy={4} />

      {/* 10: guardrails → app */}
      <FlowPath
        d="M625 270 H655 V98 H675"
        marker="llm-arrow"
        step={10}
        stepX={655}
        stepY={184}
        label="grounded answer"
        labelX={668}
        labelY={188}
      />

      {/* 11: telemetry → tracing */}
      <FlowArrow x1={815} y1={98} x2={863} y2={92} marker="llm-arrow" step={11} />

      {/* observability chain */}
      <FlowArrow x1={960} y1={124} x2={960} y2={142} marker="llm-arrow" />
      <FlowArrow x1={960} y1={204} x2={960} y2={222} marker="llm-arrow" />
      <FlowArrow x1={960} y1={278} x2={960} y2={298} marker="llm-arrow" />

      {/* 12: fine-tuning loop → LLM providers */}
      <FlowPath
        d="M960 378 V458 H380 V182 H415"
        marker="llm-arrow-green"
        dashed
        color="#059669"
        step={12}
        stepX={700}
        stepY={458}
        label="adapter → registry → serve"
        labelX={700}
        labelY={446}
      />
    </svg>
  );
}

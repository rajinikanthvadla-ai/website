import { ArrowMarkers, DiagramTitle, Lane, NodeBox, FlowArrow, FlowPath } from "./DiagramPrimitives";

/** LLMOps / RAG production architecture — draw.io style with brand icons. */
export default function LlmopsDiagram() {
  const f = "llm-soft";
  return (
    <svg viewBox="0 0 1140 560" className="min-w-[980px] w-full" role="img" aria-label="LLMOps RAG production architecture diagram">
      <ArrowMarkers prefix="llm" />

      <DiagramTitle
        width={1140}
        title="RAG / LLMOps Production Architecture"
        subtitle="Enterprise knowledge assistant · ingest → retrieve → gateway → grounded answer → evals"
      />

      <Lane x={10} y={60} w={200} h={430} label="Ingestion & Indexing" tint="#eff6ff" stroke="#93c5fd" accent="#1d4ed8" />
      <Lane x={230} y={60} w={150} h={210} label="Retrieval" tint="#f0fdf4" stroke="#86efac" accent="#059669" />
      <Lane x={400} y={60} w={240} h={430} label="LLM Gateway" tint="#eef2ff" stroke="#c7d2fe" accent="#4338ca" />
      <Lane x={660} y={60} w={170} h={210} label="Application" tint="#fff7ed" stroke="#fdba74" accent="#ea580c" />
      <Lane x={850} y={60} w={220} h={430} label="Observability & Improve" tint="#fef2f2" stroke="#fecaca" accent="#dc2626" />

      <NodeBox x={25} y={100} w={170} h={68} title="Documents" subtitle="PDFs · Confluence · tickets" icons={[{ fallback: "DC", color: "#475569" }]} accent="#334155" filterId={f} />
      <NodeBox x={25} y={185} w={170} h={78} title="Chunking" subtitle="LangChain · LlamaIndex" icons={[{ slug: "langchain" }, { fallback: "LI", color: "#1c3c3c" }]} accent="#1C3C3C" filterId={f} />
      <NodeBox x={25} y={280} w={170} h={78} title="Embeddings" subtitle="OpenAI · HuggingFace" icons={[{ fallback: "OA", color: "#10a37f" }, { slug: "huggingface" }]} accent="#FFD21E" filterId={f} />
      <NodeBox x={25} y={375} w={170} h={88} title="Vector Database" subtitle="pgvector · Pinecone · Weaviate" icons={[{ slug: "postgresql" }, { fallback: "PC", color: "#1e40af" }, { fallback: "WV", color: "#059669" }]} accent="#1e40af" filterId={f} />

      <NodeBox x={240} y={100} w={130} h={72} title="Retriever" subtitle="top-k hybrid" icons={[{ fallback: "RT", color: "#334155" }]} accent="#059669" filterId={f} />
      <NodeBox x={240} y={190} w={130} h={68} title="Reranker" subtitle="cross-encoder" icons={[{ fallback: "RR", color: "#334155" }]} accent="#047857" filterId={f} />

      <NodeBox x={415} y={100} w={210} h={78} title="LiteLLM Gateway" subtitle="routing · retries · budgets" icons={[{ fallback: "LG", color: "#7c3aed" }]} accent="#7c3aed" filterId={f} />
      <NodeBox x={415} y={195} w={210} h={72} title="LLM Providers" subtitle="GPT · Claude · Gemini" icons={[{ fallback: "OA", color: "#10a37f" }, { slug: "anthropic" }, { slug: "googlegemini" }]} accent="#10a37f" filterId={f} />
      <NodeBox x={415} y={285} w={210} h={68} title="NeMo Guardrails" subtitle="input / output rails" icons={[{ fallback: "NG", color: "#76b900" }]} accent="#76b900" filterId={f} />
      <NodeBox x={415} y={370} w={210} h={68} title="Prompt Registry" subtitle="LangSmith · evals" icons={[{ fallback: "LS", color: "#1c3c3c" }, { slug: "langchain" }]} accent="#1C3C3C" filterId={f} />

      <NodeBox x={675} y={100} w={140} h={88} title="FastAPI + Next.js" subtitle="SSE streaming chat" icons={[{ slug: "fastapi" }, { slug: "nextdotjs" }]} accent="#009688" filterId={f} />
      <NodeBox x={675} y={205} w={140} h={52} title="Users / SSO" icons={[{ fallback: "US", color: "#334155" }]} accent="#334155" filterId={f} />

      <NodeBox x={865} y={100} w={190} h={72} title="Tracing" subtitle="Langfuse · OTel spans" icons={[{ slug: "opentelemetry" }, { fallback: "LF", color: "#0f766e" }]} accent="#0f766e" filterId={f} />
      <NodeBox x={865} y={190} w={190} h={68} title="Dashboards" subtitle="cost & latency SLOs" icons={[{ slug: "grafana" }]} accent="#F46800" filterId={f} />
      <NodeBox x={865} y={275} w={190} h={60} title="Feedback" subtitle="thumbs · corrections" icons={[{ fallback: "FB", color: "#334155" }]} accent="#475569" filterId={f} />
      <NodeBox x={865} y={355} w={190} h={88} title="Fine-tuning Loop" subtitle="PEFT / LoRA on GPUs" icons={[{ slug: "huggingface" }, { slug: "nvidia" }]} accent="#76B900" filterId={f} />

      <FlowArrow x1={110} y1={168} x2={110} y2={183} marker="llm-arrow" step={1} />
      <FlowArrow x1={110} y1={263} x2={110} y2={278} marker="llm-arrow" step={2} />
      <FlowArrow x1={110} y1={358} x2={110} y2={373} marker="llm-arrow" step={3} />
      <FlowArrow x1={745} y1={205} x2={745} y2={190} marker="llm-arrow" step={4} />
      <FlowArrow x1={675} y1={144} x2={372} y2={136} marker="llm-arrow" step={5} stepX={530} stepY={128} label="embed query" labelDy={-10} />
      <FlowPath d="M240 136 H208 V419 H197" marker="llm-arrow" step={6} stepX={208} stepY={280} label="ANN top-k" labelX={230} labelY={410} />
      <FlowArrow x1={305} y1={172} x2={305} y2={188} marker="llm-arrow" step={7} />
      <FlowPath d="M370 224 H398 V139 H415" marker="llm-arrow" step={8} stepX={398} stepY={180} />
      <FlowArrow x1={520} y1={178} x2={520} y2={193} marker="llm-arrow" step={9} />
      <FlowArrow x1={520} y1={267} x2={520} y2={283} marker="llm-arrow" />
      <FlowArrow x1={520} y1={370} x2={520} y2={355} marker="llm-arrow" dashed label="prompts" labelDx={36} />
      <FlowPath d="M625 319 H655 V144 H675" marker="llm-arrow" step={10} stepX={655} stepY={230} label="grounded answer" labelX={670} labelY={234} />
      <FlowArrow x1={815} y1={144} x2={863} y2={136} marker="llm-arrow" step={11} />
      <FlowArrow x1={960} y1={172} x2={960} y2={188} marker="llm-arrow" />
      <FlowArrow x1={960} y1={258} x2={960} y2={273} marker="llm-arrow" />
      <FlowArrow x1={960} y1={335} x2={960} y2={353} marker="llm-arrow" />
      <FlowPath
        d="M960 443 V530 H380 V231 H415"
        marker="llm-arrow-green"
        dashed
        color="#059669"
        step={12}
        stepX={700}
        stepY={530}
        label="adapter → registry → serve"
        labelX={700}
        labelY={518}
      />
    </svg>
  );
}

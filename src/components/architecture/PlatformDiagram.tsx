import { ArrowMarkers, DiagramTitle, Lane, NodeBox, FlowArrow, FlowPath } from "./DiagramPrimitives";

/** AI Platform / multi-model gateway control plane — draw.io style. */
export default function PlatformDiagram() {
  const f = "pf-soft";
  return (
    <svg viewBox="0 0 1160 620" className="min-w-[1000px] w-full" role="img" aria-label="AI Platform gateway architecture diagram">
      <ArrowMarkers prefix="pf" />

      <DiagramTitle
        width={1160}
        title="AI Platform Control Plane — Multi-Model Gateway"
        subtitle="Product apps → gateway → model universe · quotas · evals · FinOps · agents"
      />

      <Lane x={20} y={60} w={200} h={280} label="Product Surfaces" tint="#fff7ed" stroke="#fdba74" accent="#ea580c" />
      <Lane x={250} y={60} w={280} h={480} label="AI Gateway / Platform" tint="#eef2ff" stroke="#c7d2fe" accent="#4338ca" />
      <Lane x={560} y={60} w={280} h={280} label="Model Multiverse" tint="#f0fdf4" stroke="#86efac" accent="#059669" />
      <Lane x={870} y={60} w={250} h={280} label="Data & Tools" tint="#eff6ff" stroke="#93c5fd" accent="#1d4ed8" />
      <Lane x={560} y={360} w={560} h={180} label="Reliability · Safety · FinOps" tint="#fef2f2" stroke="#fecaca" accent="#dc2626" />

      <NodeBox x={35} y={100} w={170} h={64} title="Web / Mobile App" subtitle="Next.js · React" icons={[{ slug: "nextdotjs" }, { slug: "react" }]} accent="#0f172a" filterId={f} />
      <NodeBox x={35} y={180} w={170} h={64} title="Internal Tools" subtitle="ops · support consoles" icons={[{ fallback: "IT", color: "#334155" }]} accent="#334155" filterId={f} />
      <NodeBox x={35} y={260} w={170} h={64} title="Batch / Jobs" subtitle="Airflow · cron agents" icons={[{ slug: "apacheairflow" }]} accent="#017CEE" filterId={f} />

      <NodeBox x={270} y={100} w={240} h={72} title="API Gateway" subtitle="auth · rate limits · tenants" icons={[{ slug: "nginx" }, { fallback: "JW", color: "#0ea5e9" }]} accent="#009639" filterId={f} />
      <NodeBox x={270} y={190} w={240} h={78} title="LLM / AI Gateway" subtitle="LiteLLM · routing · cache" icons={[{ fallback: "LG", color: "#7c3aed" }]} accent="#7c3aed" filterId={f} />
      <NodeBox x={270} y={290} w={240} h={72} title="Policy & Guardrails" subtitle="allowlists · PII · refusals" icons={[{ fallback: "PL", color: "#0f766e" }]} accent="#0f766e" filterId={f} />
      <NodeBox x={270} y={385} w={240} h={72} title="Prompt / Agent Registry" subtitle="versions · canary configs" icons={[{ slug: "langchain" }, { slug: "langgraph" }]} accent="#1C3C3C" filterId={f} />
      <NodeBox x={270} y={475} w={240} h={52} title="Semantic Cache" subtitle="Redis · cost cut" icons={[{ slug: "redis" }]} accent="#DC382D" filterId={f} />

      <NodeBox x={580} y={100} w={240} h={68} title="Frontier LLMs" subtitle="OpenAI · Claude · Gemini" icons={[{ fallback: "OA", color: "#10a37f" }, { slug: "anthropic" }, { slug: "googlegemini" }]} accent="#10a37f" filterId={f} />
      <NodeBox x={580} y={185} w={240} h={68} title="Open / Self-host" subtitle="vLLM · HuggingFace" icons={[{ slug: "vllm" }, { slug: "huggingface" }]} accent="#FFD21E" filterId={f} />
      <NodeBox x={580} y={270} w={240} h={52} title="Embeddings / Rerank" subtitle="retrieval models" icons={[{ slug: "huggingface" }]} accent="#FF9D00" filterId={f} />

      <NodeBox x={890} y={100} w={210} h={68} title="Vector + Docs" subtitle="pgvector · Pinecone" icons={[{ slug: "postgresql" }, { fallback: "PC", color: "#1e40af" }]} accent="#1e40af" filterId={f} />
      <NodeBox x={890} y={185} w={210} h={68} title="MCP Tool Servers" subtitle="GitHub · Slack · K8s" icons={[{ slug: "github" }, { slug: "kubernetes" }]} accent="#181717" filterId={f} />
      <NodeBox x={890} y={270} w={210} h={52} title="Feature / Memory Store" subtitle="Redis · Feast" icons={[{ slug: "redis" }]} accent="#DC382D" filterId={f} />

      <NodeBox x={580} y={400} w={160} h={68} title="Evals CI" subtitle="golden · refuse sets" icons={[{ fallback: "EV", color: "#1d4ed8" }]} accent="#1d4ed8" filterId={f} />
      <NodeBox x={760} y={400} w={160} h={68} title="Tracing" subtitle="OTel · Langfuse" icons={[{ slug: "opentelemetry" }, { fallback: "LF", color: "#0f766e" }]} accent="#0f766e" filterId={f} />
      <NodeBox x={940} y={400} w={160} h={68} title="FinOps" subtitle="token · GPU spend" icons={[{ slug: "grafana" }]} accent="#F46800" filterId={f} />
      <NodeBox x={580} y={485} w={520} h={42} title="Incident / Kill Switch · Rollback prompt · model · agent runtime" icons={[{ fallback: "KS", color: "#dc2626" }]} accent="#dc2626" filterId={f} />

      <FlowArrow x1={205} y1={132} x2={268} y2={136} marker="pf-arrow" step={1} />
      <FlowArrow x1={205} y1={212} x2={268} y2={160} marker="pf-arrow" />
      <FlowArrow x1={205} y1={292} x2={268} y2={180} marker="pf-arrow" />
      <FlowArrow x1={390} y1={172} x2={390} y2={188} marker="pf-arrow" step={2} />
      <FlowArrow x1={390} y1={268} x2={390} y2={288} marker="pf-arrow" step={3} />
      <FlowArrow x1={390} y1={362} x2={390} y2={383} marker="pf-arrow" />
      <FlowArrow x1={390} y1={457} x2={390} y2={473} marker="pf-arrow" dashed label="cache hit" labelDx={40} />
      <FlowArrow x1={510} y1={229} x2={578} y2={134} marker="pf-arrow" step={4} label="route" labelDy={-8} />
      <FlowArrow x1={510} y1={240} x2={578} y2={219} marker="pf-arrow" />
      <FlowPath d="M820 134 H870" marker="pf-arrow" step={5} stepX={845} stepY={122} label="RAG / tools" labelX={845} labelY={112} />
      <FlowPath d="M820 219 H870" marker="pf-arrow" />
      <FlowPath d="M700 322 V388" marker="pf-arrow-blue" step={6} stepX={700} stepY={355} color="#1d4ed8" />
      <FlowArrow x1={740} y1={434} x2={758} y2={434} marker="pf-arrow" />
      <FlowArrow x1={920} y1={434} x2={938} y2={434} marker="pf-arrow" step={7} />
      <FlowPath d="M840 468 V483" marker="pf-arrow-amber" color="#b45309" dashed step={8} stepX={840} stepY={476} />
    </svg>
  );
}

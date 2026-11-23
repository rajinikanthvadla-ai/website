import { ArrowMarkers, DiagramTitle, Lane, NodeBox, FlowArrow, FlowPath, SvgIcon } from "./DiagramPrimitives";

const WORKERS = [
  { x: 90, cx: 160, title: "PM Agent", icons: [{ slug: "openai" }], subtitle: "LLM + Jira, Slack", accent: "#10a37f" },
  { x: 255, cx: 325, title: "Architect", icons: [{ slug: "anthropic" }], subtitle: "LLM + repo tools", accent: "#D4A27F" },
  { x: 420, cx: 490, title: "Coder A", icons: [{ slug: "huggingface" }], subtitle: "GitHub · CI tools", accent: "#FFD21E" },
  { x: 585, cx: 655, title: "Coder B", icons: [{ slug: "openai" }], subtitle: "GitHub · CI tools", accent: "#10a37f" },
  { x: 750, cx: 820, title: "Reviewer QA", icons: [{ slug: "anthropic" }], subtitle: "tests · review", accent: "#D4A27F" },
  { x: 915, cx: 985, title: "DevOps", icons: [{ slug: "argo" }, { slug: "docker" }], subtitle: "ArgoCD · K8s", accent: "#EF7B4D" },
] as const;

/** Multi-agent / agent multiverse architecture — draw.io style. */
export default function MultiAgentDiagram() {
  const f = "ma-soft";
  return (
    <svg viewBox="0 0 1160 700" className="min-w-[1000px] w-full" role="img" aria-label="Multi-agent system architecture diagram">
      <ArrowMarkers prefix="ma" />

      <DiagramTitle
        width={1160}
        title="Agent Multiverse — Multi-Agent System Architecture"
        subtitle="Software-delivery crew · supervisor · message bus · specialized workers · governance"
      />

      <Lane x={330} y={60} w={520} h={110} label="Supervision" tint="#eef2ff" stroke="#c7d2fe" accent="#4338ca" />
      <Lane x={60} y={190} w={1040} h={80} label="Messaging" tint="#f8fafc" stroke="#cbd5e1" accent="#0f172a" />
      <Lane x={60} y={290} w={1040} h={240} label="Specialized Agents (parallel universe)" tint="#f0fdf4" stroke="#86efac" accent="#059669" />
      <Lane x={60} y={555} w={500} h={100} label="Shared State" tint="#eff6ff" stroke="#93c5fd" accent="#1d4ed8" />
      <Lane x={600} y={555} w={500} h={100} label="Governance & Observability" tint="#fef2f2" stroke="#fecaca" accent="#dc2626" />

      <NodeBox x={60} y={88} w={170} h={60} title="Incoming Task" subtitle="feature · ticket" icons={[{ slug: "task" }]} accent="#334155" filterId={f} />
      <NodeBox
        x={380}
        y={85}
        w={420}
        h={64}
        title="Supervisor / Orchestrator"
        subtitle="CrewAI · AutoGen · LangGraph"
        icons={[{ slug: "crewai" }, { slug: "autogen" }, { slug: "langgraph" }]}
        accent="#4338ca"
        filterId={f}
      />

      <rect x={100} y={215} width={960} height={40} rx={12} fill="#0f172a" />
      <SvgIcon icon={{ slug: "redis" }} x={124} y={226} size={18} />
      <SvgIcon icon={{ slug: "apachekafka" }} x={150} y={226} size={18} />
      <text x={190} y={241} fontSize={12} fontWeight={600} fill="#ffffff">
        Shared Message Bus — Redis Streams / Kafka · pub-sub (tasks, results, events)
      </text>

      {WORKERS.map((wk) => (
        <NodeBox
          key={wk.title}
          x={wk.x}
          y={330}
          w={140}
          h={120}
          title={wk.title}
          subtitle={wk.subtitle}
          icons={[...wk.icons]}
          accent={wk.accent}
          filterId={f}
        />
      ))}

      <NodeBox x={100} y={585} w={280} h={56} title="Shared Blackboard Memory" subtitle="PostgreSQL + pgvector" icons={[{ slug: "postgresql" }]} accent="#336791" filterId={f} />
      <NodeBox x={620} y={585} w={140} h={56} title="Policy Engine" subtitle="OPA · allow/deny" icons={[{ slug: "opa" }]} accent="#0f766e" filterId={f} />
      <NodeBox x={775} y={585} w={140} h={56} title="HITL Gate" subtitle="approve deploys" icons={[{ slug: "hitl" }]} accent="#d97706" fill="#fffbeb" stroke="#f59e0b" filterId={f} />
      <NodeBox x={930} y={585} w={150} h={56} title="Observability" subtitle="OTel · Grafana" icons={[{ slug: "opentelemetry" }, { slug: "grafana" }]} accent="#F46800" filterId={f} />

      <FlowArrow x1={230} y1={118} x2={378} y2={118} marker="ma-arrow" step={1} />
      <FlowArrow x1={640} y1={149} x2={640} y2={213} marker="ma-arrow" step={2} />
      {WORKERS.map((wk, i) => (
        <g key={wk.title}>
          <FlowArrow x1={wk.cx - 10} y1={255} x2={wk.cx - 10} y2={328} marker="ma-arrow" step={i === 0 ? 3 : undefined} />
          <FlowArrow x1={wk.cx + 10} y1={328} x2={wk.cx + 10} y2={257} marker="ma-arrow" />
        </g>
      ))}
      <FlowPath d="M232 390 H253" marker="ma-arrow" step={4} stepX={242} stepY={368} />
      <FlowPath d="M397 390 H418" marker="ma-arrow" step={5} stepX={407} stepY={368} />
      <FlowPath d="M562 390 H583" marker="ma-arrow" />
      <FlowPath d="M727 390 H748" marker="ma-arrow" step={6} stepX={737} stepY={368} />
      <FlowPath d="M892 390 H913" marker="ma-arrow" step={7} stepX={902} stepY={368} />
      <FlowPath d="M325 450 V510 H230 V583" marker="ma-arrow" dashed step={8} stepX={278} stepY={510} label="read/write state" labelX={300} labelY={502} />
      <FlowPath d="M985 450 V510 H695 V583" marker="ma-arrow" dashed step={9} stepX={840} stepY={510} label="deploy gated by policy + approval" labelX={840} labelY={502} />
      <FlowPath d="M800 117 H1120 V613 H1082" marker="ma-arrow" dashed step={10} stepX={1120} stepY={360} label="traces" labelX={1105} labelY={344} />
    </svg>
  );
}

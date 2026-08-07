import { Lane, NodeBox, FlowArrow, FlowPath, SvgIcon } from "./DiagramPrimitives";

const WORKERS = [
  { x: 90, cx: 160, title: "PM Agent", icons: [{ fallback: "OA", color: "#10a37f" }], subtitle: "LLM + Jira, Slack tools" },
  { x: 255, cx: 325, title: "Architect", icons: [{ slug: "anthropic" }], subtitle: "LLM + repo read tools" },
  { x: 420, cx: 490, title: "Coder Agent A", icons: [{ slug: "huggingface" }], subtitle: "LLM + GitHub, CI tools" },
  { x: 585, cx: 655, title: "Coder Agent B", icons: [{ fallback: "OA", color: "#10a37f" }], subtitle: "LLM + GitHub, CI tools" },
  { x: 750, cx: 820, title: "Reviewer / QA", icons: [{ slug: "anthropic" }], subtitle: "LLM + test runner" },
  { x: 915, cx: 985, title: "DevOps Deployer", icons: [{ slug: "argo" }, { slug: "docker" }], subtitle: "ArgoCD · Docker · K8s" },
] as const;

/**
 * Multi-agent system architecture (software-delivery crew).
 * Numbered badges match the step list in src/app/architecture/page.tsx.
 */
export default function MultiAgentDiagram() {
  return (
    <svg viewBox="0 0 1160 640" className="min-w-[1000px] w-full" role="img" aria-label="Multi-agent system architecture diagram">
      <defs>
        <marker id="ma-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#64748b" />
        </marker>
      </defs>

      {/* Lanes */}
      <Lane x={330} y={30} w={520} h={100} label="Supervision" tint="#f5f3ff" stroke="#ddd6fe" />
      <Lane x={60} y={160} w={1040} h={70} label="Messaging" tint="#f1f5f9" stroke="#cbd5e1" />
      <Lane x={60} y={260} w={1040} h={230} label="Specialized Agents (parallel workers)" tint="#f0fdf4" stroke="#bbf7d0" />
      <Lane x={60} y={520} w={500} h={90} label="Shared State" tint="#eff6ff" stroke="#bfdbfe" />
      <Lane x={600} y={520} w={500} h={90} label="Governance & Observability" tint="#fef2f2" stroke="#fecaca" />

      {/* Entry + supervisor */}
      <NodeBox x={60} y={58} w={170} h={56} title="Incoming Task" subtitle="feature request · ticket" icons={[{ fallback: "IN", color: "#334155" }]} />
      <NodeBox
        x={380}
        y={60}
        w={420}
        h={56}
        title="Supervisor / Orchestrator"
        subtitle="CrewAI · AutoGen · LangGraph — route, track, retry"
        icons={[{ slug: "crewai" }, { fallback: "AG", color: "#7c3aed" }, { slug: "langgraph" }]}
      />

      {/* Message bus bar */}
      <rect x={100} y={180} width={960} height={36} rx={18} fill="#0f172a" />
      <SvgIcon icon={{ slug: "redis" }} x={124} y={189} size={18} />
      <SvgIcon icon={{ slug: "apachekafka" }} x={150} y={189} size={18} />
      <text x={190} y={203} fontSize={12} fontWeight={600} fill="#ffffff">
        Shared Message Bus — Redis Streams / Kafka · pub-sub topics (tasks, results, events)
      </text>

      {/* Worker agents */}
      {WORKERS.map((wk) => (
        <NodeBox
          key={wk.title}
          x={wk.x}
          y={300}
          w={140}
          h={110}
          title={wk.title}
          subtitle={wk.subtitle}
          icons={[...wk.icons]}
        />
      ))}

      {/* Bottom: shared state + governance */}
      <NodeBox x={100} y={548} w={260} h={52} title="Shared Blackboard Memory" subtitle="PostgreSQL + pgvector · task state" icons={[{ slug: "postgresql" }]} />
      <NodeBox x={620} y={548} w={140} h={52} title="Policy Engine" subtitle="OPA · allow/deny" icons={[{ fallback: "OP", color: "#0f766e" }]} />
      <NodeBox x={775} y={548} w={140} h={52} title="HITL Checkpoint" subtitle="approve deploys" icons={[{ fallback: "HI", color: "#d97706" }]} fill="#fffbeb" stroke="#f59e0b" />
      <NodeBox x={930} y={548} w={150} h={52} title="Observability" subtitle="OTel · Grafana" icons={[{ slug: "opentelemetry" }, { slug: "grafana" }]} />

      {/* Flows */}
      {/* 1: task -> supervisor */}
      <FlowArrow x1={230} y1={86} x2={378} y2={86} marker="ma-arrow" step={1} />
      {/* 2: supervisor publishes to bus */}
      <FlowArrow x1={640} y1={130} x2={640} y2={178} marker="ma-arrow" step={2} />
      {/* 3: workers subscribe / publish on the bus */}
      {WORKERS.map((wk, i) => (
        <g key={wk.title}>
          <FlowArrow x1={wk.cx - 10} y1={230} x2={wk.cx - 10} y2={298} marker="ma-arrow" step={i === 0 ? 3 : undefined} />
          <FlowArrow x1={wk.cx + 10} y1={298} x2={wk.cx + 10} y2={232} marker="ma-arrow" />
        </g>
      ))}
      {/* 4-7: pipeline handoffs between agents */}
      <FlowPath d="M232 355 H253" marker="ma-arrow" step={4} stepX={242} stepY={332} />
      <FlowPath d="M397 355 H418" marker="ma-arrow" step={5} stepX={407} stepY={332} />
      <FlowPath d="M562 355 H583" marker="ma-arrow" />
      <FlowPath d="M727 355 H748" marker="ma-arrow" step={6} stepX={737} stepY={332} />
      <FlowPath d="M892 355 H913" marker="ma-arrow" step={7} stepX={902} stepY={332} />
      {/* 8: agents read/write shared blackboard memory */}
      <FlowPath
        d="M325 410 V470 H230 V546"
        marker="ma-arrow"
        dashed
        step={8}
        stepX={278}
        stepY={470}
        label="read/write state"
        labelX={300}
        labelY={462}
      />
      {/* 9: deploy gated by policy + HITL */}
      <FlowPath
        d="M985 410 V470 H695 V546"
        marker="ma-arrow"
        dashed
        step={9}
        stepX={840}
        stepY={470}
        label="deploy gated by policy + approval"
        labelX={840}
        labelY={462}
      />
      {/* 10: telemetry to observability */}
      <FlowPath d="M800 86 H1120 V574 H1082" marker="ma-arrow" dashed step={10} stepX={1120} stepY={320} label="traces" labelX={1105} labelY={304} />
    </svg>
  );
}

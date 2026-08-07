import { Lane, NodeBox, FlowArrow, FlowPath } from "./DiagramPrimitives";

/**
 * Agentic AI architecture (single autonomous SRE/support copilot).
 * Numbered badges match the step list in src/app/architecture/page.tsx.
 */
export default function AgenticDiagram() {
  return (
    <svg viewBox="0 0 1160 545" className="min-w-[1000px] w-full" role="img" aria-label="Agentic AI architecture diagram">
      <defs>
        <marker id="ag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#64748b" />
        </marker>
      </defs>

      {/* Lanes */}
      <Lane x={220} y={30} w={360} h={90} label="Memory" tint="#eff6ff" stroke="#bfdbfe" />
      <Lane x={220} y={140} w={360} h={380} label="Agent Core (LangGraph)" tint="#f5f3ff" stroke="#ddd6fe" />
      <Lane x={610} y={140} w={230} h={280} label="Tool Layer (MCP Servers)" tint="#f0fdf4" stroke="#bbf7d0" />

      {/* Entry */}
      <NodeBox x={20} y={260} w={150} h={64} title="User / API" subtitle="chat · webhook · cron" icons={[{ fallback: "US", color: "#334155" }]} />

      {/* Memory */}
      <NodeBox x={235} y={52} w={160} h={52} title="Short-term" subtitle="Redis · session state" icons={[{ slug: "redis" }]} />
      <NodeBox x={405} y={52} w={160} h={52} title="Long-term" subtitle="vector DB · knowledge" icons={[{ slug: "postgresql" }]} />

      {/* Agent core */}
      <NodeBox x={250} y={170} w={300} h={64} title="Orchestrator / State Graph" subtitle="LangGraph · checkpointed state" icons={[{ slug: "langgraph" }]} />
      <NodeBox x={250} y={260} w={300} h={70} title="Planner / Reasoner LLM" subtitle="GPT-4-class · Claude · tool calling" icons={[{ fallback: "OA", color: "#10a37f" }, { slug: "anthropic" }]} />

      {/* Agent loop: Observe -> Plan -> Act -> Reflect */}
      <NodeBox x={250} y={356} w={66} h={34} title="Observe" fill="#dbeafe" stroke="#93c5fd" />
      <NodeBox x={326} y={356} w={56} h={34} title="Plan" fill="#dbeafe" stroke="#93c5fd" />
      <NodeBox x={392} y={356} w={56} h={34} title="Act" fill="#dbeafe" stroke="#93c5fd" />
      <NodeBox x={458} y={356} w={72} h={34} title="Reflect" fill="#dbeafe" stroke="#93c5fd" />
      <FlowArrow x1={400} y1={330} x2={400} y2={354} marker="ag-arrow" step={4} />
      <FlowArrow x1={316} y1={373} x2={324} y2={373} marker="ag-arrow" />
      <FlowArrow x1={382} y1={373} x2={390} y2={373} marker="ag-arrow" />
      <FlowArrow x1={448} y1={373} x2={456} y2={373} marker="ag-arrow" />
      <FlowPath d="M494 390 V404 H283 V392" marker="ag-arrow" dashed />

      {/* Tools */}
      <NodeBox x={625} y={170} w={200} h={52} title="GitHub MCP" subtitle="repos · PRs · issues" icons={[{ slug: "github" }]} />
      <NodeBox x={625} y={232} w={200} h={52} title="Slack MCP" subtitle="channels · alerts" icons={[{ fallback: "SL", color: "#4a154b" }]} />
      <NodeBox x={625} y={294} w={200} h={52} title="Jira MCP" subtitle="tickets · workflows" icons={[{ slug: "jira" }]} />
      <NodeBox x={625} y={356} w={200} h={52} title="Kubernetes API" subtitle="pods · logs · rollouts" icons={[{ slug: "kubernetes" }]} />

      {/* HITL gate */}
      <NodeBox x={610} y={440} w={230} h={56} title="Human-in-the-Loop" subtitle="approval gate · Slack / UI" icons={[{ fallback: "HI", color: "#d97706" }]} stroke="#f59e0b" fill="#fffbeb" />

      {/* Right column */}
      <NodeBox x={880} y={170} w={160} h={64} title="Execute Actions" subtitle="kubectl · merge · API" icons={[{ fallback: "EX", color: "#334155" }]} />
      <NodeBox x={880} y={260} w={160} h={60} title="Audit Log" subtitle="who · what · when" icons={[{ slug: "postgresql" }]} />
      <NodeBox x={880} y={350} w={160} h={64} title="Observability" subtitle="Langfuse traces" icons={[{ fallback: "LF", color: "#0f766e" }]} />

      {/* Flows */}
      {/* 1: user -> orchestrator */}
      <FlowPath d="M170 292 H210 V202 H248" marker="ag-arrow" step={1} stepX={210} stepY={247} />
      {/* 2: orchestrator -> planner */}
      <FlowArrow x1={400} y1={234} x2={400} y2={258} marker="ag-arrow" step={2} />
      {/* 3: planner <-> memory */}
      <FlowArrow x1={330} y1={122} x2={330} y2={258} marker="ag-arrow" step={3} label="read" labelDx={22} labelDy={-2} />
      <FlowArrow x1={360} y1={258} x2={360} y2={124} marker="ag-arrow" label="write" labelDx={24} labelDy={-2} />
      {/* 5: planner <-> tools */}
      <FlowArrow x1={550} y1={278} x2={623} y2={278} marker="ag-arrow" step={5} label="MCP tool call" labelDy={-8} />
      <FlowArrow x1={623} y1={302} x2={550} y2={302} marker="ag-arrow" label="observation" labelDy={14} />
      {/* 6: risky plan -> HITL */}
      <FlowPath d="M550 318 H590 V468 H608" marker="ag-arrow" step={6} stepX={590} stepY={393} />
      {/* 7: approved -> execute */}
      <FlowPath d="M840 468 H955 V238" marker="ag-arrow" step={7} stepX={955} stepY={353} label="approved" labelX={897} labelY={460} />
      {/* 8: execution -> audit log */}
      <FlowArrow x1={960} y1={234} x2={960} y2={258} marker="ag-arrow" step={8} />
      {/* 9: traces -> observability */}
      <FlowPath d="M580 160 H1060 V382 H1042" marker="ag-arrow" dashed step={9} stepX={1060} stepY={271} label="traces · spans" labelX={1052} labelY={255} />
    </svg>
  );
}

import { ArrowMarkers, DiagramTitle, Lane, NodeBox, PillNode, FlowArrow, FlowPath } from "./DiagramPrimitives";

/** Single-agent Agentic AI architecture — draw.io style. */
export default function AgenticDiagram() {
  const f = "ag-soft";
  return (
    <svg viewBox="0 0 1160 600" className="min-w-[1000px] w-full" role="img" aria-label="Agentic AI architecture diagram">
      <ArrowMarkers prefix="ag" />

      <DiagramTitle
        width={1160}
        title="Agentic AI Architecture (Single Agent)"
        subtitle="SRE / support copilot · LangGraph loop · MCP tools · HITL · audit"
      />

      <Lane x={220} y={60} w={360} h={100} label="Memory" tint="#eff6ff" stroke="#93c5fd" accent="#1d4ed8" />
      <Lane x={220} y={180} w={360} h={390} label="Agent Core (LangGraph)" tint="#eef2ff" stroke="#c7d2fe" accent="#4338ca" />
      <Lane x={610} y={180} w={230} h={290} label="Tool Layer (MCP)" tint="#f0fdf4" stroke="#86efac" accent="#059669" />

      <NodeBox x={20} y={300} w={150} h={72} title="User / API" subtitle="chat · webhook · cron" icons={[{ slug: "users" }]} accent="#334155" filterId={f} />

      <NodeBox x={235} y={95} w={160} h={52} title="Short-term" subtitle="Redis · session" icons={[{ slug: "redis" }]} accent="#DC382D" filterId={f} />
      <NodeBox x={405} y={95} w={160} h={52} title="Long-term" subtitle="vector knowledge" icons={[{ slug: "postgresql" }]} accent="#336791" filterId={f} />

      <NodeBox x={250} y={220} w={300} h={72} title="Orchestrator / State Graph" subtitle="LangGraph · checkpointed state" icons={[{ slug: "langgraph" }]} accent="#1C3C3C" filterId={f} />
      <NodeBox x={250} y={315} w={300} h={78} title="Planner / Reasoner LLM" subtitle="GPT-class · Claude · tool calling" icons={[{ slug: "openai" }, { slug: "anthropic" }]} accent="#10a37f" filterId={f} />

      <PillNode x={250} y={420} w={66} title="Observe" />
      <PillNode x={326} y={420} w={56} title="Plan" />
      <PillNode x={392} y={420} w={56} title="Act" />
      <PillNode x={458} y={420} w={72} title="Reflect" />
      <FlowArrow x1={400} y1={393} x2={400} y2={418} marker="ag-arrow" step={4} />
      <FlowArrow x1={316} y1={436} x2={324} y2={436} marker="ag-arrow" />
      <FlowArrow x1={382} y1={436} x2={390} y2={436} marker="ag-arrow" />
      <FlowArrow x1={448} y1={436} x2={456} y2={436} marker="ag-arrow" />
      <FlowPath d="M494 452 V470 H283 V454" marker="ag-arrow" dashed />

      <NodeBox x={625} y={215} w={200} h={52} title="GitHub MCP" subtitle="repos · PRs · issues" icons={[{ slug: "github" }]} accent="#181717" filterId={f} />
      <NodeBox x={625} y={280} w={200} h={52} title="Slack MCP" subtitle="channels · alerts" icons={[{ slug: "slack" }]} accent="#4A154B" filterId={f} />
      <NodeBox x={625} y={345} w={200} h={52} title="Jira MCP" subtitle="tickets · workflows" icons={[{ slug: "jira" }]} accent="#0052CC" filterId={f} />
      <NodeBox x={625} y={410} w={200} h={52} title="Kubernetes API" subtitle="pods · logs · rollouts" icons={[{ slug: "kubernetes" }]} accent="#326CE5" filterId={f} />

      <NodeBox x={610} y={495} w={230} h={60} title="Human-in-the-Loop" subtitle="approval gate · Slack / UI" icons={[{ slug: "hitl" }]} accent="#d97706" stroke="#f59e0b" fill="#fffbeb" filterId={f} />

      <NodeBox x={880} y={215} w={160} h={72} title="Execute Actions" subtitle="kubectl · merge · API" icons={[{ slug: "execute" }]} accent="#0f172a" filterId={f} />
      <NodeBox x={880} y={310} w={160} h={68} title="Audit Log" subtitle="who · what · when" icons={[{ slug: "postgresql" }]} accent="#336791" filterId={f} />
      <NodeBox x={880} y={405} w={160} h={72} title="Observability" subtitle="Langfuse traces" icons={[{ slug: "langfuse" }]} accent="#0f766e" filterId={f} />

      <FlowPath d="M170 336 H210 V256 H248" marker="ag-arrow" step={1} stepX={210} stepY={296} />
      <FlowArrow x1={400} y1={292} x2={400} y2={313} marker="ag-arrow" step={2} />
      <FlowArrow x1={330} y1={160} x2={330} y2={313} marker="ag-arrow" step={3} label="read" labelDx={22} />
      <FlowArrow x1={360} y1={315} x2={360} y2={162} marker="ag-arrow" label="write" labelDx={24} />
      <FlowArrow x1={550} y1={354} x2={623} y2={354} marker="ag-arrow" step={5} label="MCP tool call" labelDy={-8} />
      <FlowArrow x1={623} y1={378} x2={550} y2={378} marker="ag-arrow" label="observation" labelDy={14} />
      <FlowPath d="M550 390 H590 V525 H608" marker="ag-arrow" step={6} stepX={590} stepY={455} />
      <FlowPath d="M840 525 H955 V290" marker="ag-arrow" step={7} stepX={955} stepY={408} label="approved" labelX={900} labelY={518} />
      <FlowArrow x1={960} y1={287} x2={960} y2={308} marker="ag-arrow" step={8} />
      <FlowPath d="M580 200 H1060 V441 H1042" marker="ag-arrow" dashed step={9} stepX={1060} stepY={320} label="traces · spans" labelX={1050} labelY={304} />
    </svg>
  );
}

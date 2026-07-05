import { FlowFrame, FlowPath, flowAlign } from "./FlowFrame";

export type AgentFlowStep = {
  step: number | string;
  label: string;
  agent: string;
  action: string;
};

export default function AgentFlow({ steps, title }: { steps: AgentFlowStep[]; title?: string }) {
  return (
    <div className="auto-agent-flow">
      {title && <p className="auto-agent-flow-label">{title}</p>}
      <FlowPath className="auto-flow-path--agent">
        {steps.map((s, i) => (
          <FlowFrame
            key={s.step}
            step={s.step}
            align={flowAlign(i)}
            title={s.label}
            sub={s.agent}
            items={[s.action]}
            dark
            featured={i === 0}
          />
        ))}
      </FlowPath>
    </div>
  );
}

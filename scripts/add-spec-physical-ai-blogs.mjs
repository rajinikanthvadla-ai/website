import fs from "node:fs";

const path = "content/articles.json";
const articles = JSON.parse(fs.readFileSync(path, "utf8"));

const neu = [
  {
    slug: "spec-driven-development-ai-2026",
    title:
      "Spec-Driven Development for AI in 2026: From Vibe Coding to Production Agents",
    description:
      "What spec-driven development means for AI systems in 2026 — requirements, design, tasks, evals, and guardrails — and how Rajinikanth Vadla teaches engineers to ship production AI platforms, not demos.",
    category: "AI Platform",
    tags: [
      "Spec-Driven Development",
      "AI Agents",
      "LLMOps",
      "AI Platform Engineering",
      "2026",
      "Rajinikanth Vadla",
    ],
    readTime: "10 min",
    date: "2026-11-23",
    content: `## The problem with vibe coding AI

Most teams still build AI the same way they build weekend demos: open a chat, paste a prompt, ship whatever compiles. That works for a screenshot. It fails when the system must call tools, spend tokens, hit SLAs, and survive a model swap.

**Spec-driven development (SDD)** is the fix. You write what the system must do *before* the agent writes code — requirements, design, tasks, and acceptance checks — then let humans and coding agents execute against that contract.

I am **Rajinikanth Vadla**. In AI Platform Engineering this is not a nice-to-have. It is how you keep agents, RAG, and gateways from becoming unmaintainable sludge.

## What spec-driven development means for AI

For classical software, a spec is PRD + design + tickets. For AI, the same idea expands:

1. **Requirements** — user goals, failure modes, safety constraints, cost ceilings
2. **Design** — models, tools, data boundaries, gateway, observability, rollback
3. **Tasks** — small, agent-executable steps with clear Done criteria
4. **Evals** — golden cases, refusal cases, regression suite before promote
5. **Runtime policy** — quotas, allowlists, human approval for risky actions

If you skip 1–4, you are vibe coding with an LLM bill.

## Why SDD exploded in 2026

Coding agents got good enough to *implement* specs. IDEs and agent runtimes now turn a prompt into structured requirements → design → task lists, then execute those tasks with hooks and MCP tools.

That only helps if your team treats the spec as the source of truth — not a chat history nobody can replay.

Physical AI teams felt this first (robots, simulation, safety contracts). Software AI teams are next: multi-agent workflows, prompt/config versioning, and release gates look a lot like SDD with evals attached.

## A practical SDD loop for LLM apps and agents

Use this order on every non-trivial feature:

| Stage | Artifact | Done means |
|---|---|---|
| Require | Problem, users, non-goals, SLOs, safety | Stakeholders agree on failure modes |
| Design | Architecture, tools, data, cost model | Diagram + interface contracts exist |
| Spec tasks | Atomic tickets agents/humans can run | Each task has inputs/outputs/tests |
| Implement | Code, prompts, configs | Diff matches the task, not a new idea |
| Eval | Offline suite + spot online monitors | No promote without passing gates |
| Operate | Logs, cost, rollback | On-call can reverse a bad prompt/model |

### Minimum viable AI spec (copy this)

- **Goal:** one sentence outcome (not "add AI")
- **Users / tenants:** who can invoke it
- **Tools:** names, auth, side effects, approval rules
- **Data:** what may enter the context window
- **Quality bar:** 10–30 golden cases + 5 "must refuse"
- **Cost bar:** max tokens / request and daily budget
- **Rollback:** previous prompt/config/model id

No golden cases = no production claim.

## Spec-driven vs vibe coding (interview answer)

| | Vibe coding | Spec-driven AI |
|---|---|---|
| Source of truth | Chat thread | Versioned requirements + design |
| Tool use | Ad hoc | Schemas, allowlists, audit |
| Quality | "Looks good" | Evals as release gates |
| Cost | Surprise invoice | Budgets in the design |
| Handoff | "Ask the person who built it" | Spec + runbook |

Hiring managers for LLMOps / AI Platform roles increasingly ask for the right-hand column.

## How this maps to AI Platform Engineering

SDD is how you run the platform loop:

- Prompt / agent config versioning (like code)
- LLM gateway policy before tools fire
- Eval gates in CI
- FinOps attribution per team
- Agent registries with lifecycle (create → deploy → revoke)

Deep dives on this site:

- [AI Platform Engineering trends 2027](/blog/ai-platform-engineering-trends-2027/)
- [AI Evals and LLMOps Reliability 2027](/blog/ai-evals-llmops-reliability-2027/)
- [MCP Careers 2027](/blog/mcp-model-context-protocol-2027/)
- [LLM Gateway guide 2027](/blog/llm-gateway-ai-platform-2027/)

## Portfolio project that proves you get SDD

Ship a small agent with:

1. A one-page requirements + design doc
2. Three MCP-style or OpenAPI tools with allowlists
3. Twenty eval cases (including refusals)
4. A gateway or thin API that logs tokens and tool calls
5. A rollback note: how you revert a bad prompt

Record a 5-minute walkthrough. Free prep: [Architecture](/architecture/), [Interview questions](/interview-questions/).

## How I teach this

Live cohorts cover **AI Platform Engineering** — MLOps, AIOps, LLMOps, Agents, FDE — with production habits (specs, evals, gateways), not prompt theater.

- [Masterclass](/mlops-aiops-masterclass/)
- [AI-Powered Automation](/courses/ai-automation/)
- [Syllabus](/syllabus/)
- [Enroll](/enroll/)
- [Mentorship](/mentorship/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20to%20learn%20spec-driven%20AI%20development.)

Related: [Physical AI in 2026](/blog/physical-ai-2026/) — where specs meet robots, simulation, and the real world.
`,
  },
  {
    slug: "physical-ai-2026",
    title:
      "Physical AI in 2026: Robots, Simulation, and Why Platform Engineers Should Care",
    description:
      "Physical AI in 2026 explained — robots, AV, vision, digital twins, sim-to-real, NVIDIA/ROS agent skills — and how AI Platform Engineering skills transfer. Guide by Rajinikanth Vadla.",
    category: "AI Platform",
    tags: [
      "Physical AI",
      "Robotics",
      "Simulation",
      "AI Agents",
      "AI Platform Engineering",
      "2026",
      "Rajinikanth Vadla",
    ],
    readTime: "11 min",
    date: "2026-11-23",
    content: `## Physical AI is not "another chatbot"

**Physical AI** means AI that senses and acts in the physical world: robots, autonomous vehicles, industrial vision, lab automation, digital twins that drive real machines.

The model still matters. The hard part is the **loop**: perceive → reason → act → measure → retrain or rollback — under physics, safety, and latency constraints software chat never faces.

I am **Rajinikanth Vadla**. Most of my students come from DevOps, SRE, or software. You do not need to become a roboticist overnight. You do need to understand why Physical AI is pulling the same platform patterns we already teach for LLMOps and agents.

## Why 2026 made Physical AI loud

Three shifts landed at once:

1. **Simulation-first development** — train and debug in digital twins before risking hardware
2. **Agent-ready robotics stacks** — skills and tools so coding agents can run scene setup, training, and eval steps
3. **Edge deployment** — on-device inference with clear cost, power, and safety budgets

Vendors (NVIDIA Isaac / Omniverse / Jetson stacks, ROS ecosystems, cloud Physical AI tooling) are packaging these workflows so humans *and* AI agents can execute them. Spec-driven development shows up here for a reason: interface contracts and safety constraints must exist *before* code.

Pair this article with: [Spec-Driven Development for AI](/blog/spec-driven-development-ai-2026/).

## The Physical AI stack (plain English)

| Layer | Job |
|---|---|
| Sensors / perception | Cameras, depth, lidar → detections, poses, maps |
| World model / planning | Understand scene, choose actions |
| Control | Motors, arms, vehicle actuators |
| Simulation | Isaac Sim–class environments, domain randomization |
| Learning | Imitation / RL / VLA post-training for the task |
| Edge runtime | Jetson-class or industrial PCs, ROS nodes |
| Ops | Fleet logs, OTA, safety interlocks, rollback |

If you only know chat APIs, you are looking at the "world model / planning" slice. Production Physical AI is mostly **platform + ops**.

## Where AI Platform Engineering overlaps

Skills that transfer immediately:

- **Pipelines** — data → train/eval → registry → deploy → monitor (MLOps)
- **Evals as gates** — do not promote a policy that fails the suite
- **Observability** — latency, error, drift; plus physical fault signals
- **Gateways / policy** — what the agent is allowed to command
- **FinOps** — GPU hours in sim and edge power budgets
- **Agent tooling** — MCP-style tools with auth and audit

New vocabulary you should recognize in job posts:

- Sim-to-real gap
- Domain randomization
- Digital twin
- Fleet OTA
- Safety PLC / human-in-the-loop for high-risk motion

## A career path if you are DevOps / software today

Do not start by buying a robot arm.

1. **Solidify AI platform basics** — Docker, one cloud, MLOps loop, one LLM app with evals
2. **Learn ROS concepts** — nodes, topics, services (even via tutorials)
3. **Run one simulation workflow** — scene → policy → eval metrics (Isaac / Gazebo-class)
4. **Document a safety + rollback story** — same rigor as a production LLM release
5. **Build a portfolio note** — architecture diagram + what would fail in the real world

Roadmap on this site: [AI Platform Engineer](/roadmap/ai-platform-engineer/). Free diagrams mindset: [Architecture](/architecture/).

## Spec-driven Physical AI (why teams insist)

Physical systems punish vague prompts. Good teams write:

- Component interface contracts before coding
- Safety constraints in steering / policy files
- Tasks agents can run: validate URDF, launch sim, train, evaluate
- Acceptance tests that include "must not move when X"

That is [spec-driven development](/blog/spec-driven-development-ai-2026/) with physics attached.

## What I teach vs what Physical AI still needs specialists for

| I cover in live training | Bring a robotics specialist |
|---|---|
| MLOps / LLMOps / agents / gateways / evals | Mechanical design, kinematics tuning |
| Production habits, CI, observability, FinOps | Factory cell integration, safety certification |
| FDE-style customer delivery of AI systems | Hardware bring-up for novel robots |

If your goal is **AI Platform / LLMOps / agent platforms**, start with the masterclass. If your goal is **robot learning researcher**, add simulation + ROS on top of that foundation.

## How to go deeper with me

- [MLOps · AIOps · LLMOps · Agents · FDE Masterclass](/mlops-aiops-masterclass/)
- [AI-Powered Automation](/courses/ai-automation/)
- [Syllabus](/syllabus/)
- [Enroll](/enroll/)
- [Mentorship](/mentorship/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20to%20understand%20Physical%20AI%20and%20AI%20platform%20careers.)

Also read: [Agentic AI Careers 2027](/blog/agentic-ai-careers-2027/) and [AI Platform Engineering trends 2027](/blog/ai-platform-engineering-trends-2027/).
`,
  },
];

const existing = new Set(articles.map((a) => a.slug));
const toAdd = neu.filter((a) => !existing.has(a.slug));
if (!toAdd.length) {
  console.log("Articles already present");
  process.exit(0);
}

const next = [...toAdd, ...articles];
fs.writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
console.log(`Added ${toAdd.map((a) => a.slug).join(", ")}`);

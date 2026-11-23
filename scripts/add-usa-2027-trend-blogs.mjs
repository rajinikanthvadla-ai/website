import fs from "node:fs";

const path = "content/articles.json";
const articles = JSON.parse(fs.readFileSync(path, "utf8"));

const REMOVE = new Set([
  "spec-driven-development-ai-2026",
  "physical-ai-2026",
]);

const neu = [
  {
    slug: "spec-driven-development-ai-2027",
    title:
      "Spec-Driven Development for AI in 2027: From Vibe Coding to Production Agents",
    description:
      "Spec-driven development for AI in 2027 — requirements, design, tasks, evals, and guardrails. How USA teams stop vibe coding agents and how Rajinikanth Vadla teaches production AI platforms.",
    category: "AI Platform",
    tags: [
      "Spec-Driven Development",
      "AI Agents",
      "LLMOps",
      "AI Platform Engineering",
      "USA",
      "2027",
      "Rajinikanth Vadla",
    ],
    readTime: "10 min",
    date: "2026-11-23",
    content: `## The problem with vibe coding AI

Most teams still build AI the way they build weekend demos: open a chat, paste a prompt, ship whatever compiles. That works for a screenshot. It fails when the system must call tools, spend tokens, hit SLAs, and survive a model swap.

**Spec-driven development (SDD)** is the fix. You write what the system must do *before* the agent writes code — requirements, design, tasks, and acceptance checks — then let humans and coding agents execute against that contract.

I am **Rajinikanth Vadla**. In AI Platform Engineering this is not optional. It is how you keep agents, RAG, and gateways from becoming unmaintainable sludge — especially as USA hiring shifts to people who can ship production agents, not prompts.

## What SDD means for AI in 2027

1. **Requirements** — user goals, failure modes, safety constraints, cost ceilings
2. **Design** — models, tools, data boundaries, gateway, observability, rollback
3. **Tasks** — small, agent-executable steps with clear Done criteria
4. **Evals** — golden cases, refusal cases, regression suite before promote
5. **Runtime policy** — quotas, allowlists, human approval for risky actions

If you skip 1–4, you are vibe coding with an LLM bill.

## Why USA teams care now

US job boards in late 2026 already show **agent / LLM / AI platform** demand rising next to applied AI product roles. Computer-use and workplace agents are entering enterprise apps — which means **permissions, purchase approvals, and audit** become the product, not the model name.

SDD is how platform teams encode that before coding agents spray changes across repos.

## Practical SDD loop

| Stage | Artifact | Done means |
|---|---|---|
| Require | Problem, users, non-goals, SLOs, safety | Stakeholders agree on failure modes |
| Design | Architecture, tools, data, cost model | Diagram + interface contracts exist |
| Spec tasks | Atomic tickets agents/humans can run | Each task has inputs/outputs/tests |
| Implement | Code, prompts, configs | Diff matches the task |
| Eval | Offline suite + online monitors | No promote without gates |
| Operate | Logs, cost, rollback | On-call can reverse a bad prompt/model |

### Minimum viable AI spec

- **Goal:** one sentence outcome
- **Tools:** names, auth, side effects, approval rules
- **Data:** what may enter context
- **Quality bar:** 10–30 golden cases + 5 "must refuse"
- **Cost bar:** max tokens / request and daily budget
- **Rollback:** previous prompt/config/model id

## How this maps to AI Platform Engineering

- Prompt / agent config versioning
- LLM gateway policy before tools fire
- Eval gates in CI
- FinOps attribution
- Agent registries with lifecycle

Related: [AI Platform Engineering trends 2027](/blog/ai-platform-engineering-trends-2027/), [AI Evals 2027](/blog/ai-evals-llmops-reliability-2027/), [MCP 2027](/blog/mcp-model-context-protocol-2027/), [USA agent hiring 2027](/blog/usa-ai-agent-hiring-2027/).

## Portfolio that gets interviews

1. One-page requirements + design
2. Three tools with allowlists
3. Twenty eval cases (including refusals)
4. Thin API/gateway logging tokens and tool calls
5. Rollback note

## Learn with me

- [Masterclass](/mlops-aiops-masterclass/)
- [AI-Powered Automation](/courses/ai-automation/)
- [Syllabus](/syllabus/) · [Enroll](/enroll/) · [Mentorship](/mentorship/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20to%20learn%20spec-driven%20AI%20for%202027.)

Also: [Physical AI 2027](/blog/physical-ai-2027/).
`,
  },
  {
    slug: "physical-ai-2027",
    title:
      "Physical AI in 2027: USA Jobs, Robots, Simulation, and Platform Skills",
    description:
      "Physical AI in 2027 — USA robotics and autonomy hiring, simulation, sim-to-real, and which AI Platform Engineering skills transfer. Guide by Rajinikanth Vadla.",
    category: "AI Platform",
    tags: [
      "Physical AI",
      "Robotics",
      "USA Jobs",
      "Simulation",
      "AI Platform Engineering",
      "2027",
      "Rajinikanth Vadla",
    ],
    readTime: "11 min",
    date: "2026-11-23",
    content: `## Physical AI is not another chatbot

**Physical AI** means AI that senses and acts in the physical world: robots, autonomous vehicles, industrial vision, lab automation, digital twins that drive real machines.

I am **Rajinikanth Vadla**. By 2027 this is a hiring track in the USA — not only a research buzzword.

## USA hiring signal (late 2026 → 2027)

Public Physical AI job boards in November 2026 already showed **thousands of open roles**, heavily concentrated in the **United States**, with robotics, autonomy, perception, controls, SLAM, ROS, motion planning, and simulation as the gravity centers. Median disclosed pay in those boards sits in senior-engineering territory (treat any single number as a planning band, not a promise).

Separate US AI hiring snapshots put **robotics and autonomy** as a meaningful slice of AI work next to applied AI product and data engineering. Hardware-adjacent engineering postings (mechanical, industrial, electrical) have also been rising faster than general software in some US indices — factories, grid, and data-center buildouts are part of the story.

For job seekers: search both broad (**robotics**, **autonomy**, **Physical AI**) and narrow (**simulation**, **perception**, **ROS**, **controls**).

## The stack (plain English)

| Layer | Job |
|---|---|
| Perception | Cameras, depth, lidar → detections, poses, maps |
| Planning | World model, choose actions |
| Control | Arms, vehicles, actuators |
| Simulation | Digital twins, domain randomization |
| Learning | Imitation / RL / VLA post-training |
| Edge | On-device runtime, ROS nodes |
| Ops | Fleet logs, OTA, safety interlocks, rollback |

## Platform skills that transfer

- MLOps loops (data → train/eval → deploy → monitor)
- Evals as release gates
- Observability + incident response
- Tool/agent policy (what is allowed to move)
- FinOps (GPU sim hours, edge power)

New vocabulary: sim-to-real, domain randomization, digital twin, fleet OTA, human-in-the-loop for high-risk motion.

Pair with: [Spec-Driven Development 2027](/blog/spec-driven-development-ai-2027/).

## Path if you are DevOps / software

1. AI platform basics (Docker, cloud, MLOps, one LLM app with evals)
2. ROS concepts
3. One simulation workflow with metrics
4. Safety + rollback write-up
5. Portfolio architecture note

Roadmap: [AI Platform Engineer](/roadmap/ai-platform-engineer/).

## What I teach vs specialist robotics

| Live training covers | Specialist still needed |
|---|---|
| MLOps / LLMOps / agents / gateways / evals | Mechanical design, certification |
| Production habits, CI, observability | Novel hardware bring-up |

- [Masterclass](/mlops-aiops-masterclass/)
- [Enroll](/enroll/) · [Mentorship](/mentorship/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20Physical%20AI%20and%20platform%20career%20guidance%20for%202027.)

Also: [USA AI agent hiring 2027](/blog/usa-ai-agent-hiring-2027/), [Agentic AI careers 2027](/blog/agentic-ai-careers-2027/).
`,
  },
  {
    slug: "usa-ai-agent-hiring-2027",
    title:
      "USA AI Agent Hiring in 2027: Roles, Skills, and How to Get Interview-Ready",
    description:
      "USA AI agent hiring heading into 2027 — AI Agent Engineer, FDE, LLM, AI Platform/SRE demand, skills (Python, agents, AWS, K8s), and how Rajinikanth Vadla prepares engineers.",
    category: "Careers",
    tags: [
      "USA Jobs",
      "AI Agents",
      "AI Agent Engineer",
      "Forward Deployed Engineer",
      "2027",
      "Rajinikanth Vadla",
    ],
    readTime: "10 min",
    date: "2026-11-23",
    content: `## The USA hiring picture (heading into 2027)

AI work is no longer a niche posting. US employer-site snapshots in November 2026 already put AI roles at roughly **mid-single-digit percent of live postings**, with median stated AI pay far above non-AI roles on the same boards. Treat exact dollars as **planning bands** — they move by city, level, and visa status.

Inside AI work, **applied AI engineering / AI product** and **data engineering** still dominate headcount. **LLMs and agents** are a smaller slice by count but high velocity in specialized boards. Agentic hiring trackers in the same month showed thousands of open agentic roles, with the fastest adds in:

- AI Agent Engineer
- AI Solutions Engineer
- LLM Engineer
- ML Engineer
- Forward Deployed Engineer (FDE)

Skills named often across AI postings: **Python, LLMs, Agents, AWS, Robotics, Kubernetes**.

I am **Rajinikanth Vadla**. If you are DevOps, SRE, or software in India or the USA targeting these titles, this is the map.

## Titles that show up (and what they mean)

| Title | What they actually want |
|---|---|
| AI Agent Engineer | Tools, memory, evals, production runtime |
| LLM Engineer | Serving, RAG, cost, quality gates |
| AI Platform / SRE | Gateway, quotas, observability, reliability |
| Forward Deployed Engineer | Ship with the customer, not only the lab |
| AI Solutions Engineer | Map use-case → architecture → pilot |

"Prompt engineer" as a standalone title is fading. Agent + platform language is rising.

Related salary planning: [MLOps / LLMOps salaries USA 2027](/blog/mlops-llmops-salaries-usa-2027/).

## Skills order that matches interviews

1. Python + Git + Docker
2. One cloud (often AWS in US posts)
3. One LLM app with **evals** and cost logs
4. Tool calling / MCP-style boundaries
5. Kubernetes basics if targeting platform/SRE
6. One customer-shaped demo (FDE story)

Skip: twenty unfinished agent frameworks with zero deploy story.

## Portfolio that beats buzzwords

- Agent with 2–3 tools + human approval for risky actions
- Eval suite (success + refuse)
- Short architecture + runbook
- Optional: gateway metrics (latency, tokens, errors)

Free: [Architecture](/architecture/), [Interview questions](/interview-questions/), [Agentic AI careers 2027](/blog/agentic-ai-careers-2027/).

## How I prepare people for USA / global roles

Same live masterclass content worldwide: **AI Platform Engineering** covering MLOps · AIOps · LLMOps · Agents · FDE.

- [Masterclass](/mlops-aiops-masterclass/)
- [Global training](/global-training/)
- [Enroll](/enroll/)
- [Mentorship](/mentorship/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20USA%20AI%20agent%20job%20readiness%20for%202027.)

Also: [Computer-use agents 2027](/blog/computer-use-agents-enterprise-2027/), [FDE USA 2027](/blog/forward-deployed-engineer-usa-2027/).
`,
  },
  {
    slug: "computer-use-agents-enterprise-2027",
    title:
      "Computer-Use Agents in 2027: Why USA Enterprises Demand Guardrails",
    description:
      "Computer-use and desktop agents in 2027 — enterprise permissions, purchase approvals, blocked third-party agents, and the platform skills USA teams hire for. Rajinikanth Vadla.",
    category: "AI Agents",
    tags: [
      "Computer Use Agents",
      "Enterprise AI",
      "AI Safety",
      "LLMOps",
      "USA",
      "2027",
      "Rajinikanth Vadla",
    ],
    readTime: "9 min",
    date: "2026-11-23",
    content: `## Agents that click are not a demo anymore

By late 2026, major labs expanded **computer-use / desktop agents** that can click, type, and drive apps — and consumer agents that can shop or call businesses after user approval. Heading into **2027**, USA enterprises care less about the demo and more about **who is allowed to act**.

I am **Rajinikanth Vadla**. If you build or operate these systems, your job is permissions, audit, and rollback — not only model IQ.

## What broke the "just let the agent book it" fantasy

Airlines, banks, and large retailers have already restricted unauthorized third-party agents. Concerns are boring and correct:

- Privacy and credential scope
- Unintended purchases
- Who pays when the agent is wrong
- Brand and fraud risk

So capability ≠ permission. Your architecture must assume **services will block naive agents**.

## Platform requirements for computer-use agents

| Control | Why |
|---|---|
| App / domain allowlists | Agent only sees approved surfaces |
| Human approval for money / send / delete | Stops silent damage |
| Session isolation | Credentials stay in the right boundary |
| Action audit log | Who/what/when for every click API |
| Eval harness | Regression for "should not click X" |
| Kill switch / revoke | Instant disable on incident |

This is the same family as [LLM gateways](/blog/llm-gateway-ai-platform-2027/) and [MCP tool governance](/blog/mcp-model-context-protocol-2027/).

## Spec-driven, not vibe-driven

Write the allowlist and refusal cases **before** wiring computer use. See [Spec-Driven Development 2027](/blog/spec-driven-development-ai-2027/).

## USA career angle

Job posts for AI Agent Engineer, AI Platform/SRE, and AI Security increasingly expect you to explain:

- Tool auth
- Desktop / browser agent threat model
- Purchase and PII controls
- Incident response when an agent mis-clicks

## How to learn this with me

Live cohorts: agents with guardrails inside **AI Platform Engineering** (MLOps → FDE).

- [AI-Powered Automation](/courses/ai-automation/)
- [Masterclass](/mlops-aiops-masterclass/)
- [Enroll](/enroll/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20to%20learn%20production%20computer-use%20agents%20for%202027.)

Related: [USA AI agent hiring 2027](/blog/usa-ai-agent-hiring-2027/), [AI Evals 2027](/blog/ai-evals-llmops-reliability-2027/).
`,
  },
  {
    slug: "forward-deployed-engineer-usa-2027",
    title:
      "Forward Deployed Engineer (FDE) in the USA 2027: Why Hiring Is Surging",
    description:
      "Forward Deployed Engineer USA hiring in 2027 — what FDE means, skills beyond demos, how it differs from solutions engineer, and how Rajinikanth Vadla trains for the role.",
    category: "Careers",
    tags: [
      "Forward Deployed Engineer",
      "FDE",
      "USA Jobs",
      "AI Agents",
      "2027",
      "Rajinikanth Vadla",
    ],
    readTime: "9 min",
    date: "2026-11-23",
    content: `## FDE is the customer-facing AI engineering role

A **Forward Deployed Engineer (FDE)** ships AI with the customer: discovery, architecture, integration, evals, and handoff — not only a slide deck. USA agentic hiring boards in late 2026 already listed FDE among the **fastest-growing** categories.

I am **Rajinikanth Vadla**. FDE is a core track in my masterclass because companies hire people who can make agents work in *their* stack.

## FDE vs neighboring titles

| Role | Center of gravity |
|---|---|
| FDE | Embed with customer, ship production path |
| Solutions Engineer | Demo + technical sales support |
| AI Agent Engineer | Build the agent runtime/product |
| AI Platform / SRE | Shared gateway, reliability, cost |

Great FDEs can do light SE storytelling **and** light platform engineering. Weak FDEs only vibe-demo.

## Skills USA teams screen for

1. Strong Python + APIs
2. One cloud + Docker
3. RAG / agents with **evals**
4. Security instincts (secrets, PII, tool allowlists)
5. Written architecture + runbooks
6. Calm customer communication under ambiguity

Bonus: Kubernetes, observability, FinOps language.

## Portfolio that reads "FDE"

Pick a fake customer (bank ops, retail support, internal IT):

- Problem brief (1 page)
- Architecture diagram
- Working agent with approvals
- Eval report (pass/fail)
- Rollout + rollback note
- 5-minute loom walkthrough

Free: [Architecture](/architecture/), [Agentic AI careers 2027](/blog/agentic-ai-careers-2027/).

## How I train FDE skills

The live **AI Platform Engineering** program includes Agents + FDE delivery habits — not only model theory.

- [Masterclass](/mlops-aiops-masterclass/) · [Agentic FDE](/agentic-fde/)
- [Global training](/global-training/)
- [Enroll](/enroll/) · [Mentorship](/mentorship/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20FDE%20career%20guidance%20for%20USA%202027.)

Also: [USA AI agent hiring 2027](/blog/usa-ai-agent-hiring-2027/).
`,
  },
  {
    slug: "usa-ai-safety-regulation-careers-2027",
    title:
      "USA AI Safety Rules in 2027: What Engineers Should Actually Prepare For",
    description:
      "USA AI safety and transparency heading into 2027 — incident reporting, safety frameworks, enterprise guardrails — and the engineering skills that stay hireable. Rajinikanth Vadla.",
    category: "AI Safety",
    tags: [
      "AI Safety",
      "USA Regulation",
      "LLMOps",
      "AI Platform Engineering",
      "2027",
      "Rajinikanth Vadla",
    ],
    readTime: "8 min",
    date: "2026-11-23",
    content: `## Regulation is becoming an engineering problem

Heading into **2027**, USA policy and enterprise buyers are pushing the same direction: if you ship frontier or high-impact AI, you need **written safety practice**, **incident reporting**, and **evidence you can contain agents**.

I am **Rajinikanth Vadla**. You do not need a law degree. You need platform habits that survive audits and outages.

## What changed in the USA conversation (2026 → 2027)

- States are standing up **registration / transparency / incident** style requirements for large frontier developers (example framing: New York's RAISE-style obligations with early-2027 deadlines discussed publicly in late 2026).
- Enterprises already restrict third-party **computer-use / booking agents** for fraud and liability reasons.
- Lab and state-level fights over **sandbox escapes** and uncontrolled agent actions keep safety on the hiring checklist for AI Security and AI Platform roles.

Exact statutes change. The engineering ask does not: **prove control**.

## Hireable skills (not vibes)

| Skill | Proof |
|---|---|
| Eval gates | Suite blocks bad prompts/tools |
| Tool allowlists | Agent cannot call disallowed APIs |
| Audit logs | Reconstruct what the agent did |
| Kill switch | Revoke agent/runtime fast |
| Incident runbook | 72-hour style reporting muscle |
| Data boundaries | PII and secrets never in free-form context |

Deep dives: [AI Evals 2027](/blog/ai-evals-llmops-reliability-2027/), [Computer-use agents 2027](/blog/computer-use-agents-enterprise-2027/).

## Career titles that absorb this work

- AI Platform / SRE
- AI Security
- LLMOps / reliability
- AI Agent Engineer (with guardrails)

## How I teach the production side

Masterclass path: MLOps → LLMOps → agents with approvals → platform ops.

- [Masterclass](/mlops-aiops-masterclass/)
- [Syllabus](/syllabus/) · [Enroll](/enroll/)
- [WhatsApp](https://wa.me/919100028801?text=Hi%20Rajinikanth%2C%20I%20want%20AI%20safety%20and%20platform%20skills%20for%202027.)

Related: [USA AI agent hiring 2027](/blog/usa-ai-agent-hiring-2027/), [AI Platform trends 2027](/blog/ai-platform-engineering-trends-2027/).

*Not legal advice — verify current state and federal rules with counsel for your product.*
`,
  },
];

const kept = articles.filter((a) => !REMOVE.has(a.slug));
const existing = new Set(kept.map((a) => a.slug));
const toAdd = neu.filter((a) => !existing.has(a.slug));
const next = [...toAdd, ...kept];
fs.writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
console.log(
  `Removed ${[...REMOVE].join(", ") || "none"}; added ${toAdd.map((a) => a.slug).join(", ") || "none"}; total ${next.length}`,
);

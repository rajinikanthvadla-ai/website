import { AI_AUTOMATION_DURATION, AI_AUTOMATION_PRICE, AI_AUTOMATION_PRICE_NOTE } from "./constants";

export type AutomationModule = {
  module: number;
  title: string;
  duration: string;
  summary: string;
  icon: string;
  outcome: string;
  jdSkills: string[];
  sections: { title: string; items: string[]; lab?: boolean }[];
};

export type CompanyAgent = {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  automations: string[];
  tools: string[];
  buildInCourse: boolean;
  bento?: "hero" | "wide" | "tall" | "normal";
};

// Re-export for page
export { AI_AUTOMATION_DURATION, AI_AUTOMATION_PRICE, AI_AUTOMATION_PRICE_NOTE };

export const AI_AUTOMATION_TAGLINE =
  "Build the AI agents companies actually hire for.";

export const AI_AUTOMATION_HERO_SUB =
  "Whatever you are today. MLOps engineer, data scientist, tester, developer. You can become the person who automates your entire organization with AI. This is your platform. Your ideas shape the syllabus.";

export const AI_AUTOMATION_FOR_YOU = {
  title: "Whatever you are, this course is for you.",
  subtitle: "You become the AI Automation Engineer your organization needs.",
  desc: "You don't need a new job title on day one. You need the skills to automate incidents, docs, tickets, HR, onboarding, and costs inside the company you're already in. MLOps, Data Science, AI Engineer, QA, DevOps, Backend. If you can code even a little, this is built for you.",
  transform: "Your role today → AI Automation Engineer who ships agents",
  roles: [
    { icon: "⚙️", role: "MLOps Engineer", gain: "Add agent deployment + MCP integrations" },
    { icon: "📊", role: "Data Scientist", gain: "Ship RAG + LLM automations to production" },
    { icon: "🤖", role: "AI Engineer", gain: "Wire agents to Jira, Slack, and real systems" },
    { icon: "🧪", role: "QA / Test Engineer", gain: "Automate triage, reports, and test agents" },
    { icon: "💻", role: "Software Developer", gain: "Vibe code + build full agent stacks" },
    { icon: "☁️", role: "DevOps / SRE", gain: "Incident agents + runbook automation" },
    { icon: "📈", role: "Business / Ops", gain: "HR, onboarding, and cost agents" },
    { icon: "🎓", role: "Student / Fresher", gain: "Portfolio agents that get you hired" },
  ],
};

export const AI_AUTOMATION_ENTERPRISE = {
  title: "What big companies are looking for",
  subtitle: "The skills in every enterprise AI job post, taught hands-on here.",
  items: [
    { icon: "🏢", title: "Production AI agents", desc: "Not chatbots. Agents that act on Jira, Slack, GitHub, and databases" },
    { icon: "📚", title: "RAG on company knowledge", desc: "Runbooks, policies, and wikis. Answers with sources, updated per org" },
    { icon: "🔌", title: "MCP & enterprise integrations", desc: "The rare skill: AI connected to live business systems" },
    { icon: "☁️", title: "Multi-cloud AI deploy", desc: "AWS Bedrock, Azure AI Foundry, Vertex AI. Portable SDK skills" },
    { icon: "🛡️", title: "Governance & guardrails", desc: "Security, human-in-the-loop, compliance. What CTOs require" },
    { icon: "📊", title: "Business metrics & ROI", desc: "Time saved, cost cut, deflection. Proof leadership funds" },
  ],
  companies: ["Fortune 500 IT teams", "Product companies", "Banks & fintech", "SaaS startups", "Consulting firms", "GCCs in India"],
};

export const AI_AUTOMATION_OPEN_PLATFORM = {
  title: "An open platform. Your ideas become the syllabus",
  desc: "Come with your organization's problems. Bring automation ideas from your workplace. In every cohort we discuss what's real, and the best ideas get built live, recorded forever, and added to the program for everyone.",
  cta: "This isn't a closed course. It's a living platform you shape.",
  steps: [
    { num: "01", label: "You bring an idea", desc: "An automation your team needs" },
    { num: "02", label: "We build it live", desc: "In cohort sessions with mentorship" },
    { num: "03", label: "It enters the syllabus", desc: "Recorded, available to all alumni" },
  ],
};

export const AI_AUTOMATION_HOOK =
  "Companies don't want more AI tools. They want agents that triage incidents, answer from docs, update Jira, control costs, and onboard people, wired together safely. That's what you build here.";

export const AI_AUTOMATION_INCLUDES = [
  { icon: "💰", label: "Course fee", value: AI_AUTOMATION_PRICE, highlight: true },
  { icon: "♾️", label: "Recordings", value: "Lifetime access", highlight: true },
  { icon: "🎯", label: "Mentorship", value: "1-on-1 support", highlight: true },
  { icon: "📋", label: "Syllabus", value: "Evolves with cohort ideas", highlight: false },
  { icon: "📊", label: "Metrics", value: "Business-level ROI", highlight: false },
  { icon: "📖", label: "Runbooks", value: "Per-organization", highlight: false },
];

export const AI_AUTOMATION_SHIP_MODE = [
  { term: "Vibe coding", desc: "Ship fast in flow with Cursor, Lovable, and Bolt, prototype before you over-engineer." },
  { term: "GSD execution", desc: "One clear task in, working output out, human review, Codex and agent mode done right." },
  { term: "Production gates", desc: "Human-in-the-loop, evals, guardrails, demos that managers trust." },
];

export const AI_AUTOMATION_RUNBOOKS = {
  title: "Runbooks that match your organization",
  desc: "Generic templates don't ship in production. You learn to build and update automation runbooks mapped to how your company actually works, incident playbooks, onboarding checklists, HR policies, and ops SOPs.",
  points: [
    "Ingest your org's docs, wikis, and policies into RAG agents",
    "Auto-update runbooks when processes change",
    "Incident playbooks wired to Jira severity and Slack channels",
    "Onboarding/offboarding checklists per department",
    "Version-controlled runbooks your team can audit",
  ],
};

export const AI_AUTOMATION_BUSINESS_METRICS = {
  title: "Business metrics leadership believes",
  desc: "Every agent you build comes with metrics that matter to managers, not just 'it works', but proof of value.",
  metrics: [
    { label: "Time saved", example: "Ticket triage: 15 min → 2 min", icon: "⏱️" },
    { label: "Cost reduced", example: "LLM spend down 30% via routing", icon: "💸" },
    { label: "Incidents resolved", example: "First-response 40% faster", icon: "🚨" },
    { label: "Onboarding speed", example: "Day-1 setup: 4 hrs → 45 min", icon: "🎉" },
    { label: "Deflection rate", example: "60% HR questions via RAG bot", icon: "💬" },
    { label: "ROI narrative", example: "One-pager your CTO can present", icon: "📈" },
  ],
};

export const AI_AUTOMATION_EVOLVING_SYLLABUS = {
  title: "A syllabus that grows with you",
  desc: "This isn't a frozen Udemy playlist. New agent patterns, tools, and automations emerge every month. In every cohort, we discuss what's landing in real companies, and the best ideas become part of the syllabus for everyone.",
  examples: [
    "New MCP connector patterns from student workplaces",
    "Fresh agent ideas from live Q&A sessions",
    "Tool updates (Cursor, Bedrock, Azure Foundry) woven in immediately",
    "Industry-specific labs: SaaS, fintech, enterprise IT",
    "Alumni-requested deep-dives added to recordings library",
  ],
};

export const AI_AUTOMATION_MENTORSHIP = {
  title: "1-on-1 mentorship from Rajinikanth",
  desc: "Stuck on an agent build? Need help positioning for interviews? Want feedback on your company's automation roadmap? Direct mentorship support is included, the same personal guidance from my 1:1 mentorship program, built into this cohort.",
  perks: [
    "Direct access during live sessions and office hours",
    "Code and architecture review for your agent builds",
    "Career guidance, resume, LinkedIn, interview prep",
    "Company automation strategy when you enroll as a team",
    "WhatsApp support for blockers between sessions",
  ],
};

export const AI_AUTOMATION_TOOLS = [
  "Cursor", "Codex", "ChatGPT", "Claude", "Gemini", "DeepSeek",
  "Ollama", "LM Studio", "MCP", "Jira", "Slack", "GitHub",
  "AWS Bedrock", "Azure AI Foundry", "Vertex AI",
  "LangChain", "LangGraph", "CrewAI", "n8n",
  "Lovable", "Bolt", "v0", "LiteLLM",
];

export const AI_AUTOMATION_AGENTS: CompanyAgent[] = [
  {
    id: "incident",
    name: "Incident Agent",
    icon: "🚨",
    tagline: "When something breaks",
    automations: ["Triage alerts by severity", "Create Jira tickets with context", "Pull runbook via RAG", "Notify Slack with summary"],
    tools: ["MCP", "Jira", "Slack", "RAG", "n8n"],
    buildInCourse: true,
    bento: "hero",
  },
  {
    id: "rag",
    name: "RAG Agent",
    icon: "📚",
    tagline: "Answers from your docs",
    automations: ["Policy and runbook Q&A", "Source-cited answers", "Org-specific runbook updates", "Private on-prem with Ollama"],
    tools: ["Bedrock KB", "Ollama", "LangChain", "LM Studio"],
    buildInCourse: true,
    bento: "tall",
  },
  {
    id: "mcp",
    name: "MCP Connected Agent",
    icon: "🔌",
    tagline: "AI that does things",
    automations: ["Query databases in plain English", "Read/write GitHub issues", "Update Jira from chat", "Act on live systems safely"],
    tools: ["MCP", "GitHub", "Jira", "PostgreSQL"],
    buildInCourse: true,
    bento: "wide",
  },
  {
    id: "hr",
    name: "HR Agent",
    icon: "👥",
    tagline: "Day-to-day people ops",
    automations: ["Handbook FAQ bot", "Leave request drafts", "HR ticket from Slack", "Interview prep summaries"],
    tools: ["RAG", "Slack", "LLM APIs", "MCP"],
    buildInCourse: true,
  },
  {
    id: "onboarding",
    name: "Onboarding Agent",
    icon: "🎉",
    tagline: "New hire journey",
    automations: ["Day-1 checklists per org", "IT access ticket drafts", "Welcome Slack message", "Training path suggestions"],
    tools: ["n8n", "Jira", "RAG", "Lovable"],
    buildInCourse: true,
  },
  {
    id: "cost",
    name: "Cost Analyzer Agent",
    icon: "💰",
    tagline: "FinOps for AI + cloud",
    automations: ["LLM token spend tracking", "Cloud bill anomaly alerts", "Budget threshold Slack alerts", "Model routing to save cost"],
    tools: ["LiteLLM", "APIs", "n8n", "Lovable"],
    buildInCourse: true,
    bento: "wide",
  },
  {
    id: "offboarding",
    name: "Offboarding Agent",
    icon: "🔐",
    tagline: "Secure exits",
    automations: ["Access revocation checklist", "Knowledge transfer prompts", "Exit interview summary", "Compliance reminders"],
    tools: ["MCP", "Jira", "Security guardrails"],
    buildInCourse: false,
  },
  {
    id: "security",
    name: "Security Agent",
    icon: "🛡️",
    tagline: "Guardrails + audit",
    automations: ["Block unsafe AI outputs", "PII and prompt-injection checks", "Audit log summaries", "Compliance checklist assist"],
    tools: ["Bedrock Guardrails", "MCP", "LangChain"],
    buildInCourse: false,
  },
  {
    id: "support",
    name: "Support Agent",
    icon: "💬",
    tagline: "Tier-1 customer help",
    automations: ["FAQ from product docs", "Escalate hard cases to humans", "Draft reply for approval", "Ticket classification"],
    tools: ["RAG", "ChatGPT API", "Zendesk/Jira"],
    buildInCourse: false,
  },
  {
    id: "sales",
    name: "Sales & Manager Agent",
    icon: "📈",
    tagline: "Revenue + leadership",
    automations: ["Meeting notes → action items", "CRM update drafts", "Weekly team digest", "Follow-up email drafts"],
    tools: ["CrewAI", "Claude", "Slack"],
    buildInCourse: false,
  },
  {
    id: "email",
    name: "Email Triage Agent",
    icon: "✉️",
    tagline: "Inbox automation",
    automations: ["Classify and route emails", "Summarize threads", "Draft responses for review", "Priority flagging"],
    tools: ["LLM APIs", "n8n", "Gmail/Outlook APIs"],
    buildInCourse: false,
  },
  {
    id: "release",
    name: "Release Agent",
    icon: "🚀",
    tagline: "Ship with confidence",
    automations: ["PR summary for reviewers", "Auto release notes", "Slack changelog post", "Change-risk flagging"],
    tools: ["GitHub MCP", "Codex", "Slack"],
    buildInCourse: false,
  },
];

export const AI_AUTOMATION_CAPSTONE_STEPS = [
  { step: 1, label: "Alert fires", agent: "Incident Agent", action: "Classifies severity" },
  { step: 2, label: "Ticket created", agent: "MCP Agent", action: "Jira ticket with context" },
  { step: 3, label: "Runbook found", agent: "RAG Agent", action: "Pulls org-specific fix steps" },
  { step: 4, label: "Safety check", agent: "Security Agent", action: "Validates remediation" },
  { step: 5, label: "Team notified", agent: "Manager Agent", action: "Slack digest posted" },
  { step: 6, label: "Metrics logged", agent: "Cost Agent", action: "ROI + spend tracked" },
];

export const AI_AUTOMATION_PRODUCTION = [
  "Human-in-the-loop, AI drafts, human approves, then it sends",
  "Org-specific runbooks, updated as your processes change",
  "Business metrics, time saved, cost cut, deflection rate",
  "Agent evals, test before you ship",
  "Guardrails, Bedrock + prompt policies for safe output",
];

export const AI_AUTOMATION_SYLLABUS_RICH: AutomationModule[] = [
  {
    module: 1,
    icon: "⚡",
    title: "Ship Mode, Vibe Coding, GSD & Dev Velocity",
    duration: "Week 1 2",
    summary: "Vibe coding with Cursor, GSD execution with Codex, rapid UI with Lovable, the velocity layer every agent builder needs.",
    outcome: "Shipped feature + ticket-to-PR automation",
    jdSkills: ["Vibe coding", "Cursor", "Codex", "GSD"],
    sections: [
      { title: "Vibe coding with Cursor", items: ["Agent mode and codebase-aware prompts", "Fix bugs from Jira ticket text", "Multi-file refactors and test generation"], lab: true },
      { title: "GSD with Codex", items: ["Task in → PR out workflows", "CI failure investigation", "Review checkpoints, trust but verify"], lab: true },
      { title: "Rapid UI", items: ["Lovable and Bolt for internal dashboards", "When prototype is enough vs custom code"], lab: true },
    ],
  },
  {
    module: 2,
    icon: "🤖",
    title: "LLM APIs, Local Models & Document Automation",
    duration: "Week 2 3",
    summary: "ChatGPT, Claude, Gemini, DeepSeek APIs plus Ollama and LM Studio for private automations. Structured outputs for business data.",
    outcome: "Document triage automation with JSON output",
    jdSkills: ["LLM APIs", "Ollama", "DeepSeek", "Prompt engineering"],
    sections: [
      { title: "LLM APIs", items: ["Multi-model APIs from one codebase", "Structured JSON with Pydantic", "Tool calling patterns"], lab: true },
      { title: "Local models", items: ["Ollama and LM Studio, on-prem AI", "Zero API bills for sensitive data"], lab: true },
      { title: "Document automation", items: ["Extract from invoices and PDFs", "Classify and route items", "Lab: triage project"], lab: true },
    ],
  },
  {
    module: 3,
    icon: "📚",
    title: "RAG Agent + Organization Runbooks",
    duration: "Week 3 4",
    summary: "Build RAG agents grounded in your company's docs. Learn to ingest, update, and version runbooks as processes change, the backbone of every enterprise agent.",
    outcome: "RAG agent with org-specific runbooks and citations",
    jdSkills: ["RAG", "Runbooks", "Knowledge base", "Bedrock KB"],
    sections: [
      { title: "RAG architecture", items: ["Chunk, embed, retrieve, generate", "Source citations interviewers expect", "Eval suite: pass/fail before ship"], lab: true },
      { title: "Organization runbooks", items: ["Ingest wikis, policies, and SOPs", "Auto-update when processes change", "Incident and onboarding playbook patterns"], lab: true },
      { title: "Hands-on", items: ["Lab: runbook Q&A agent for your domain"], lab: true },
    ],
  },
  {
    module: 4,
    icon: "🔌",
    title: "MCP Agent, Jira, Slack & GitHub",
    duration: "Week 4 5",
    summary: "MCP connects AI to live systems. Wire agents to Jira tickets, Slack channels, GitHub repos, and databases, the integration layer companies pay for.",
    outcome: "Agent connected to Jira + Slack + data source",
    jdSkills: ["MCP", "Jira", "Slack", "Integrations"],
    sections: [
      { title: "MCP from zero", items: ["Build MCP server and client", "Connect LLM to live data", "Credential handling"], lab: true },
      { title: "Enterprise connectors", items: ["Jira ticket automation", "Slack summaries and approvals", "GitHub issues and PRs"], lab: true },
      { title: "Hands-on", items: ["Lab: incident → Jira + Slack flow"], lab: true },
    ],
  },
  {
    module: 5,
    icon: "🏢",
    title: "Business Agents + Metrics Dashboard",
    duration: "Week 5 6",
    summary: "Build 3 business agents from the gallery. Every build includes business-level metrics, time saved, cost reduced, deflection rate, in a dashboard your leadership understands.",
    outcome: "3 agents with metrics one-pagers",
    jdSkills: ["CrewAI", "LangGraph", "Business metrics", "n8n"],
    sections: [
      { title: "Agent frameworks", items: ["LangChain, CrewAI, LangGraph", "n8n visual pipelines", "Multi-agent handoffs"], lab: true },
      { title: "HR & people agents", items: ["Onboarding per organization", "HR handbook bot", "Offboarding templates"], lab: true },
      { title: "Metrics that matter", items: ["Time-saved and cost-reduced calculators", "ROI one-pager template", "Lab: 3 agents + metrics dashboard"], lab: true },
    ],
  },
  {
    module: 6,
    icon: "☁️",
    title: "Deploy, Innovate & Get Hired",
    duration: "Week 7 8",
    summary: "Deploy on Bedrock, Azure AI Foundry, and Vertex AI. Capstone connected flow. New cohort ideas become syllabus updates. Portfolio pack and demo day.",
    outcome: "Cloud agent + portfolio + demo day ready",
    jdSkills: ["Bedrock", "Azure Foundry", "Vertex AI", "Demo day"],
    sections: [
      { title: "Cloud deploy", items: ["AWS Bedrock agents", "Azure AI Foundry SDK", "Vertex AI integration"], lab: true },
      { title: "Innovation loop", items: ["Discuss new agent ideas live", "Best ideas added to syllabus", "Lifetime recordings include all updates"], lab: true },
      { title: "Career", items: ["Capstone connected flow demo", "Resume and interview prep", "Demo day with Rajinikanth"], lab: true },
    ],
  },
];

export const AI_AUTOMATION_PORTFOLIO_DELIVERABLES = [
  "GitHub repo per agent",
  "Org-specific runbook package",
  "Business metrics one-pager",
  "Architecture diagram",
  "Demo day presentation",
];

export const AI_AUTOMATION_SECTIONS = [
  { id: "for-you", label: "For You" },
  { id: "agents", label: "Agents" },
  { id: "enterprise", label: "Enterprise" },
  { id: "capstone", label: "Flow" },
  { id: "curriculum", label: "Syllabus" },
  { id: "enroll", label: "Enroll" },
] as const;

export const AI_AUTOMATION_FAQS = [
  { q: "What is the course fee?", a: `${AI_AUTOMATION_PRICE} one-time. Includes all live sessions, lifetime recording access, labs, portfolio reviews, and 1-on-1 mentorship support from Rajinikanth during the cohort.` },
  { q: "Do I get lifetime recording access?", a: "Yes. Every live session is recorded. You keep access forever, including new modules and updates added from cohort innovations." },
  { q: "Is 1-on-1 mentorship included?", a: "Yes. Direct mentorship from Rajinikanth, code reviews, architecture feedback, career guidance, and WhatsApp support for blockers. Same personal attention as my dedicated mentorship program." },
  { q: "Does the syllabus evolve?", a: "Absolutely. New agent patterns, tools, and automations discussed in the cohort get woven into the syllabus. Your ideas can become part of the program for future batches too." },
  { q: "What are organization runbooks?", a: "Runbooks mapped to how your company works, incident playbooks, onboarding checklists, HR policies. You learn to build, ingest, and auto-update them in RAG agents, not generic templates." },
  { q: "What business metrics will I learn?", a: "Time saved, cost reduced, ticket deflection, onboarding speed, and ROI narratives, packaged in one-pagers and dashboards leadership actually reads." },
  { q: "I am MLOps / Data Science / QA, is this for me?", a: "Yes. Whatever your role today, MLOps, Data Science, AI Engineer, QA, DevOps, developer, or student, this course turns you into the person who builds AI automations inside your organization. If you can code in Python or JavaScript, you're ready." },
  { q: "Can my workplace automation idea become part of the syllabus?", a: "Absolutely. Bring your org's problems and automation ideas. We discuss them live, build the best ones in cohort, and they get recorded and added to the evolving syllabus for all students, lifetime access included." },
  { q: "How do I enroll?", a: "WhatsApp (+91-9100028801) or Topmate. Reply within 24 hours. Limited seats." },
];

export const AI_AUTOMATION_PREREQUISITES = [
  "Code in Python or JavaScript (beginner OK)",
  "No AI experience required",
  "Laptop + stable internet",
  `${AI_AUTOMATION_PRICE}, Lifetime recordings, Mentorship included`,
];

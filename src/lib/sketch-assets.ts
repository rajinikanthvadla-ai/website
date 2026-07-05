/**
 * Notion / Buck-style sketch illustrations.
 * Each image is mapped to content by meaning, not by index rotation.
 * @see https://buck.co/work/notion-faces
 */

export const SKETCH_IMAGES = {
  // Core set (original)
  pencilTeam: "/assets/sketches/pencil-team.png",
  contentStudio: "/assets/sketches/content-studio.png",
  groupChat: "/assets/sketches/group-chat.png",
  notionFaces: "/assets/sketches/notion-faces.png",
  laptopLearn: "/assets/sketches/laptop-learn.png",
  planningTeam: "/assets/sketches/planning-team.png",
  deskFocus: "/assets/sketches/desk-focus.png",
  // Expanded semantic set (user-provided Buck-style art)
  workflowDocs: "/assets/sketches/workflow-docs.png",
  creativeWalk: "/assets/sketches/creative-walk.png",
  faceCreator: "/assets/sketches/face-creator.png",
  faceThinker: "/assets/sketches/face-thinker.png",
  webBuilder: "/assets/sketches/web-builder.png",
  teamCollab: "/assets/sketches/team-collab.png",
  community: "/assets/sketches/community.png",
  productivityFlow: "/assets/sketches/productivity-flow.png",
  partnership: "/assets/sketches/partnership.png",
  deepWork: "/assets/sketches/deep-work.png",
  learningTrio: "/assets/sketches/learning-trio.png",
  toolChaos: "/assets/sketches/tool-chaos.png",
  docDiscussion: "/assets/sketches/doc-discussion.png",
  reader: "/assets/sketches/reader.png",
  incidentResponse: "/assets/sketches/incident-response.png",
  shipping: "/assets/sketches/shipping.png",
  enterpriseTeam: "/assets/sketches/enterprise-team.png",
  onboardingWelcome: "/assets/sketches/onboarding-welcome.png",
  metricsReview: "/assets/sketches/metrics-review.png",
  securityGuard: "/assets/sketches/security-guard.png",
  supportChat: "/assets/sketches/support-chat.png",
} as const;

export type SketchKey = keyof typeof SKETCH_IMAGES;

export function sketch(key: SketchKey): string {
  return SKETCH_IMAGES[key];
}

/** Syllabus modules: learning journey from ship mode → production */
export const SYLLABUS_MODULE_SKETCH: Record<number, SketchKey> = {
  1: "productivityFlow", // Ship mode, vibe coding, velocity
  2: "deepWork", // LLM APIs, focused building
  3: "workflowDocs", // RAG + runbooks, docs → knowledge
  4: "teamCollab", // MCP integrations, team systems
  5: "incidentResponse", // Incident + enterprise agents
  6: "shipping", // Capstone, production ship
};

/** Role cards: what each persona gains */
export const ROLE_SKETCH: Record<string, SketchKey> = {
  "MLOps Engineer": "deskFocus",
  "Data Scientist": "reader",
  "AI Engineer": "webBuilder",
  "QA / Test Engineer": "metricsReview",
  "Software Developer": "creativeWalk",
  "DevOps / SRE": "incidentResponse",
  "Business / Ops": "partnership",
  "Student / Fresher": "learningTrio",
};

/** Agent cards: matched to what the agent does */
export const AGENT_SKETCH: Record<string, SketchKey> = {
  incident: "incidentResponse",
  rag: "workflowDocs",
  mcp: "webBuilder",
  hr: "groupChat",
  onboarding: "onboardingWelcome",
  cost: "metricsReview",
  offboarding: "securityGuard",
  security: "securityGuard",
  support: "supportChat",
  sales: "docDiscussion",
  email: "reader",
  release: "shipping",
};

/** Enterprise value props */
export const ENTERPRISE_SKETCH: Record<string, SketchKey> = {
  "Production AI agents": "teamCollab",
  "RAG on company knowledge": "workflowDocs",
  "MCP & enterprise integrations": "webBuilder",
  "Multi-cloud AI deploy": "enterpriseTeam",
  "Governance & guardrails": "securityGuard",
  "Business metrics & ROI": "metricsReview",
};

/** Open platform steps */
export const OPEN_PLATFORM_SKETCH: Record<string, SketchKey> = {
  "01": "faceThinker",
  "02": "teamCollab",
  "03": "community",
};

/** Ship mode terms */
export const SHIP_MODE_SKETCH: Record<string, SketchKey> = {
  "Vibe coding": "creativeWalk",
  "GSD execution": "productivityFlow",
  "Production gates": "securityGuard",
};

/** Homepage + sitewide section art */
export const HOME_SKETCH = {
  heroWatermark: "community" as SketchKey,
  heroAccent: "faceCreator" as SketchKey,
  about: "docDiscussion" as SketchKey,
  programsAutomation: "pencilTeam" as SketchKey,
  programsMlops: "enterpriseTeam" as SketchKey,
  mentorship: "partnership" as SketchKey,
  video: "learningTrio" as SketchKey,
  faq: "reader" as SketchKey,
  cta: "groupChat" as SketchKey,
  dashboardHero: "groupChat" as SketchKey,
  toolProblem: "toolChaos" as SketchKey,
};

/** Runbooks / metrics / mentorship / capstone side cards */
export const SECTION_SKETCH = {
  runbooks: "planningTeam" as SketchKey,
  metrics: "metricsReview" as SketchKey,
  evolvingSyllabus: "community" as SketchKey,
  mentorship: "partnership" as SketchKey,
  productionReady: "shipping" as SketchKey,
  portfolio: "learningTrio" as SketchKey,
};

/** MLOps masterclass sections */
export const MLOPS_SKETCH = {
  hero: "enterpriseTeam" as SketchKey,
  overview: "workflowDocs" as SketchKey,
  capstone: "teamCollab" as SketchKey,
  career: "learningTrio" as SketchKey,
  instructor: "faceCreator" as SketchKey,
};

export function sketchForSyllabusModule(moduleNum: number): string {
  return sketch(SYLLABUS_MODULE_SKETCH[moduleNum] ?? "deskFocus");
}

export function sketchForRole(role: string): string {
  return sketch(ROLE_SKETCH[role] ?? "laptopLearn");
}

export function sketchForAgent(agentId: string): string {
  return sketch(AGENT_SKETCH[agentId] ?? "teamCollab");
}

export function sketchForEnterprise(title: string): string {
  return sketch(ENTERPRISE_SKETCH[title] ?? "enterpriseTeam");
}

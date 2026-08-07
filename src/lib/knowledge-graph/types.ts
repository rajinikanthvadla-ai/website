export type ViewMode =
  | "roadmap"
  | "architecture"
  | "company"
  | "projects"
  | "interview"
  | "career";

export type MaturityLevel = "L0" | "L1" | "L2" | "L3" | "L4" | "L5" | "L6";

export type DemandLevel = "high" | "medium" | "specialized" | "low" | "insufficient";

export type SkillModeContent = Record<ViewMode, string>;

export type SkillNode = {
  id: string;
  slug: string;
  name: string;
  level: "domain" | "capability" | "technology";
  parentId?: string;
  domainId: string;
  summary: string;
  what: string;
  why: string;
  usedIn: string[];
  requiredByRoles: string[];
  learnTopics: string[];
  buildProject: string;
  productionReality: string[];
  interviewPoints: string[];
  connectedSkills: string[];
  prerequisites: string[];
  alternatives: string[];
  modes: SkillModeContent;
  maturity: MaturityLevel;
  companyDemand?: {
    level: DemandLevel;
    sampleNote: string;
    roles: string[];
    lastUpdated: string;
  };
  x: number;
  y: number;
};

export type DomainNode = {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  x: number;
  y: number;
};

export type RoleProfile = {
  id: string;
  slug: string;
  name: string;
  description: string;
  salaryIndia: string;
  dna: { label: string; score: number }[];
  core: string[];
  important: string[];
  advanced: string[];
  skillIds: string[];
  responsibilities: string[];
  roadmapSlug?: string;
};

export type CareerTransition = {
  from: string;
  to: string;
  sharedFoundation: string[];
  additionalSkills: string[];
  skipIfKnown: string[];
  path: string[];
};

export type FailureScenario = {
  id: string;
  skillId: string;
  title: string;
  symptom: string;
  evidence: string[];
  rootCause: string;
  mitigation: string;
  permanentFix: string;
  prevention: string;
};

export type Relation = {
  from: string;
  to: string;
  type: "requires" | "builds_on" | "used_by" | "part_of" | "alternative" | "deployed_on" | "monitored_by";
};

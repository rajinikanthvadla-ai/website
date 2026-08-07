import type { SkillNode, RoleProfile, ViewMode } from "./types";
import {
  SKILLS,
  DOMAINS,
  ROLES,
  RELATIONS,
  FAILURE_SCENARIOS,
  CAREER_TRANSITIONS,
  COMPARE_SLUGS,
  COMPARE_PAIRS,
  CENTER_DOMAIN,
  STARTING_POINTS,
  TARGET_ROLES,
} from "./graph-data";

export {
  SKILLS,
  DOMAINS,
  ROLES,
  RELATIONS,
  FAILURE_SCENARIOS,
  CAREER_TRANSITIONS,
  COMPARE_SLUGS,
  COMPARE_PAIRS,
  CENTER_DOMAIN,
  STARTING_POINTS,
  TARGET_ROLES,
};

export function getSkill(slug: string): SkillNode | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function getAllSkills(): SkillNode[] {
  return SKILLS;
}

export function getSkillSlugs(): string[] {
  return SKILLS.map((s) => s.slug);
}

export function getRole(slug: string): RoleProfile | undefined {
  return ROLES.find((r) => r.slug === slug);
}

export function getAllRoles(): RoleProfile[] {
  return ROLES;
}

export function searchGraph(query: string): (SkillNode | { type: "domain"; name: string; slug: string })[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const skillResults = SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.slug.includes(q) ||
      s.learnTopics.some((t) => t.toLowerCase().includes(q)),
  );

  const domainResults = DOMAINS.filter((d) => d.name.toLowerCase().includes(q) || d.slug.includes(q)).map((d) => ({
    type: "domain" as const,
    name: d.name,
    slug: d.slug,
  }));

  return [...skillResults, ...domainResults];
}

export function compareRoles(slugA: string, slugB: string) {
  const a = getRole(slugA);
  const b = getRole(slugB);
  if (!a || !b) return null;

  const setA = new Set(a.skillIds);
  const setB = new Set(b.skillIds);
  const shared = a.skillIds.filter((id) => setB.has(id));
  const uniqueA = a.skillIds.filter((id) => !setB.has(id));
  const uniqueB = b.skillIds.filter((id) => !setA.has(id));
  const overlap = Math.round((shared.length / Math.max(setA.size, setB.size)) * 100);

  return { roleA: a, roleB: b, shared, uniqueA, uniqueB, overlapPercent: overlap };
}

export function getTransition(from: string, to: string) {
  return CAREER_TRANSITIONS.find((t) => t.from === from && t.to === to);
}

export function getFailuresForSkill(skillId: string) {
  return FAILURE_SCENARIOS.filter((f) => f.skillId === skillId);
}

export function getConnectedSkills(skillId: string): SkillNode[] {
  const related = new Set<string>();
  for (const r of RELATIONS) {
    if (r.from === skillId) related.add(r.to);
    if (r.to === skillId) related.add(r.from);
  }
  const skill = SKILLS.find((s) => s.id === skillId);
  if (skill) skill.connectedSkills.forEach((id) => related.add(id));
  return SKILLS.filter((s) => related.has(s.id));
}

export const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: "roadmap", label: "Roadmap" },
  { id: "architecture", label: "Architecture" },
  { id: "company", label: "Company" },
  { id: "projects", label: "Projects" },
  { id: "interview", label: "Interview" },
  { id: "career", label: "Career" },
];

export const MATURITY_LABELS: Record<string, string> = {
  L0: "Heard About It",
  L1: "Understand",
  L2: "Can Build",
  L3: "Can Deploy",
  L4: "Can Troubleshoot",
  L5: "Can Design",
  L6: "Can Lead / Architect",
};

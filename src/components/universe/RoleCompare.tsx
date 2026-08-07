import Link from "next/link";
import { compareRoles, getSkill, COMPARE_SLUGS, COMPARE_PAIRS } from "@/lib/knowledge-graph";

type Props = { slug: string };

export default function RoleCompare({ slug }: Props) {
  const pair = COMPARE_PAIRS[slug as keyof typeof COMPARE_PAIRS];
  if (!pair) return <p className="p-8 text-center">Comparison not found.</p>;

  const result = compareRoles(pair[0], pair[1]);
  if (!result) return null;

  const { roleA, roleB, shared, uniqueA, uniqueB, overlapPercent } = result;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <RoleCard role={roleA} />
        <RoleCard role={roleB} />
      </div>

      <div className="border-2 border-slate-900 rounded-lg p-6 bg-blue-50 shadow-[4px_4px_0_#0f172a] mb-8 text-center">
        <p className="text-3xl font-bold text-blue-700 mb-1">{overlapPercent}%</p>
        <p className="text-sm text-slate-600">shared skill foundation between these roles</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <SkillColumn title="Shared skills" skills={shared} color="bg-emerald-50 border-emerald-200" />
        <SkillColumn title={`Unique to ${roleA.name}`} skills={uniqueA} color="bg-blue-50 border-blue-200" />
        <SkillColumn title={`Unique to ${roleB.name}`} skills={uniqueB} color="bg-orange-50 border-orange-200" />
      </div>

      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        {roleA.roadmapSlug && (
          <Link href={`/roadmap/${roleA.roadmapSlug}/`} className="text-sm font-bold text-blue-700 hover:underline">
            {roleA.name} roadmap →
          </Link>
        )}
        {roleB.roadmapSlug && (
          <Link href={`/roadmap/${roleB.roadmapSlug}/`} className="text-sm font-bold text-blue-700 hover:underline">
            {roleB.name} roadmap →
          </Link>
        )}
      </div>
    </div>
  );
}

import type { RoleProfile } from "@/lib/knowledge-graph/types";

function RoleCard({ role }: { role: RoleProfile }) {
  return (
    <div className="border-2 border-slate-900 rounded-lg p-5 bg-white shadow-[3px_3px_0_#0f172a]">
      <h2 className="font-display text-xl font-bold text-slate-900">{role.name}</h2>
      <p className="text-sm text-blue-700 font-bold mt-1">{role.salaryIndia}</p>
      <p className="text-sm text-slate-600 mt-2">{role.description}</p>
    </div>
  );
}

function SkillColumn({ title, skills, color }: { title: string; skills: string[]; color: string }) {
  return (
    <div className={`border rounded-lg p-4 ${color}`}>
      <h3 className="text-xs font-bold uppercase text-slate-600 mb-3">{title}</h3>
      <ul className="space-y-1">
        {skills.map((id) => {
          const skill = getSkill(id);
          return (
            <li key={id}>
              <Link href={skill ? `/skills/${skill.slug}/` : "#"} className="text-sm font-semibold text-slate-800 hover:text-blue-700">
                {skill?.name ?? id}
              </Link>
            </li>
          );
        })}
        {skills.length === 0 && <li className="text-sm text-slate-400">None</li>}
      </ul>
    </div>
  );
}

export { COMPARE_SLUGS };

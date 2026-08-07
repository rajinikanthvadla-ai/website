import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkillPageContent from "@/components/universe/SkillPageContent";
import { getSkill, getSkillSlugs } from "@/lib/knowledge-graph";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return getSkillSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: "Skill Not Found" };

  return {
    title: `${skill.name} for AI Engineers — Skills, Projects & Interview Guide`,
    description: skill.summary,
    keywords: [skill.name, ...skill.learnTopics.slice(0, 5), "AI engineering", "MLOps", "production AI"],
    alternates: { canonical: `${SITE.url}/skills/${skill.slug}/` },
    openGraph: {
      title: `${skill.name} — AI Engineering Skill Guide`,
      description: skill.summary,
      url: `${SITE.url}/skills/${skill.slug}/`,
    },
  };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  return <SkillPageContent skill={skill} />;
}

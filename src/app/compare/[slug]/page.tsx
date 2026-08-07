import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoleCompare, { COMPARE_SLUGS } from "@/components/universe/RoleCompare";
import { COMPARE_PAIRS } from "@/lib/knowledge-graph";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return COMPARE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in COMPARE_PAIRS)) return { title: "Comparison Not Found" };

  const title = slug.replace(/-/g, " ").replace(/vs/g, "vs");

  return {
    title: `${title} — Skills, Salary & Career Comparison 2026`,
    description: `Compare ${title} roles: shared skills, unique capabilities, learning paths, and career transition guidance.`,
    alternates: { canonical: `${SITE.url}/compare/${slug}/` },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in COMPARE_PAIRS)) notFound();

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
        </div>
      </section>
      <RoleCompare slug={slug} />
    </>
  );
}

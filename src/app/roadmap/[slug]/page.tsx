import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CareerRoadmapPage from "@/components/CareerRoadmap";
import { ROADMAP_SLUGS, getRoadmap } from "@/lib/roadmaps";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return ROADMAP_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getRoadmap(slug);
  if (!roadmap) return { title: "Roadmap Not Found" };

  return {
    title: roadmap.metaTitle,
    description: roadmap.metaDescription,
    keywords: roadmap.keywords,
    alternates: { canonical: `${SITE.url}/roadmap/${roadmap.slug}/` },
    openGraph: {
      title: roadmap.metaTitle,
      description: roadmap.metaDescription,
      url: `${SITE.url}/roadmap/${roadmap.slug}/`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RoadmapSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmap = getRoadmap(slug);
  if (!roadmap) notFound();

  return <CareerRoadmapPage roadmap={roadmap} />;
}

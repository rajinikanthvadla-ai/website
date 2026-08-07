import type { Metadata } from "next";
import { getAllRoadmaps } from "@/lib/roadmaps";
import { LINKS, SITE } from "@/lib/constants";
import RoadmapHubClient from "@/components/roadmap/RoadmapHubClient";

export const metadata: Metadata = {
  title: "AI Career Roadmaps 2026: MLOps, LLMOps, FDE, AI Engineer Paths",
  description:
    "Free career roadmaps for AI Engineer, MLOps, LLMOps, FDE, NLP, AI Platform, and AI Infrastructure roles. Skills, salary guides, and step-by-step learning paths for 2026.",
  keywords: [
    "AI career roadmap",
    "MLOps engineer roadmap",
    "LLMOps career path",
    "AI engineer roadmap 2026",
    "FDE career path",
    "AI infrastructure engineer roadmap",
    "machine learning career India",
  ],
  alternates: { canonical: `${SITE.url}/roadmap/` },
  openGraph: {
    title: "AI Career Roadmaps 2026",
    description: "Step-by-step career paths for AI, MLOps, LLMOps, FDE, and platform engineering roles.",
    url: `${SITE.url}/roadmap/`,
  },
};

export default function RoadmapHubPage() {
  const roadmaps = getAllRoadmaps();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Career Roadmaps 2026",
    description: "Career roadmaps for AI engineering roles by Rajinikanth Vadla",
    itemListElement: roadmaps.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.title,
      url: `${SITE.url}/roadmap/${r.slug}/`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RoadmapHubClient roadmaps={roadmaps} />
    </>
  );
}

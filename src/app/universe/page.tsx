import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SITE } from "@/lib/constants";

const UniverseV2 = dynamic(() => import("@/components/universe/UniverseV2"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh] text-slate-500 text-sm">
      Loading AI Engineering Universe…
    </div>
  ),
});

export const metadata: Metadata = {
  title: "AI Engineering Universe — Interactive Career Intelligence Map",
  description:
    "Explore the production AI engineering ecosystem: zoomable skill universe, MLOps, LLMOps, RAG, agents, GPU infra. Compare roles, simulate career paths, break production scenarios.",
  keywords: [
    "AI engineering universe",
    "MLOps roadmap interactive",
    "LLMOps career map",
    "AI skills knowledge graph",
    "production AI engineering",
    "Kubernetes for MLOps",
    "RAG architecture roadmap",
  ],
  alternates: { canonical: `${SITE.url}/universe/` },
  openGraph: {
    title: "AI Engineering Universe",
    description: "Interactive map of modern production AI engineering skills, roles, and career paths.",
    url: `${SITE.url}/universe/`,
  },
};

export default function UniversePage() {
  return <UniverseV2 />;
}

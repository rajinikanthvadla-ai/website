import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SITE, LINKS } from "@/lib/constants";

const UniverseExplorer = dynamic(() => import("@/components/universe/UniverseExplorer"), {
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
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-900 text-white py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3 block">
            Career Intelligence Platform
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
            From DevOps to Production AI
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-6">
            Explore the skills, architectures, projects, and engineering paths behind modern AI careers.
            Every technology has a reason to exist — click it, break it, build it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/path/" className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600">
              Find My AI Path
            </Link>
            <Link href="/compare/" className="bg-white text-slate-900 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100">
              Compare Careers
            </Link>
            <Link href="/roadmap/" className="border-2 border-slate-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white">
              Role Roadmaps
            </Link>
          </div>
        </div>
      </section>

      {/* Indexable skill links for SEO */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Explore by skill</p>
          <div className="flex flex-wrap gap-2">
            {["kubernetes", "docker", "python", "mlflow", "rag", "langchain", "mcp", "vllm", "gpu", "vector-databases", "kserve", "prometheus", "terraform", "llms"].map((slug) => (
              <Link
                key={slug}
                href={`/skills/${slug}/`}
                className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-100 hover:text-blue-800 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UniverseExplorer />

      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-600 mb-4">Want guided learning with live labs and mentorship?</p>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800"
          >
            Talk to Rajinikanth on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

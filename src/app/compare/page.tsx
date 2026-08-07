import type { Metadata } from "next";
import Link from "next/link";
import { COMPARE_SLUGS } from "@/lib/knowledge-graph";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compare AI Engineering Careers — MLOps vs LLMOps vs AI Infra",
  description:
    "Side-by-side comparison of MLOps, LLMOps, AI Engineer, AI Infrastructure, and DevOps roles. Shared skills, unique skills, and transition guidance.",
  alternates: { canonical: `${SITE.url}/compare/` },
};

const COMPARE_LABELS: Record<string, string> = {
  "mlops-vs-llmops": "MLOps vs LLMOps",
  "mlops-vs-ai-infrastructure": "MLOps vs AI Infrastructure",
  "devops-vs-mlops": "DevOps vs MLOps",
  "ai-engineer-vs-mlops": "AI Engineer vs MLOps",
  "llmops-vs-ai-engineer": "LLMOps vs AI Engineer",
};

export default function CompareHubPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Career Comparison Engine
          </h1>
          <p className="text-slate-600 leading-relaxed">
            See shared skills, unique capabilities, and foundation overlap between AI engineering roles.
          </p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 grid gap-4">
          {COMPARE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/compare/${slug}/`}
              className="flex items-center justify-between border-2 border-slate-900 rounded-lg p-5 shadow-[3px_3px_0_#0f172a] hover:shadow-[5px_5px_0_#0f172a] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display font-bold text-slate-900">{COMPARE_LABELS[slug] ?? slug}</span>
              <span className="text-blue-700 font-semibold text-sm">Compare →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

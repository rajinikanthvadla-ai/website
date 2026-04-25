import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GenAI Career Transition Program",
  description:
    "AI agents and GenAI career transition program focused on RAG, evaluation, deployment, and portfolio-grade implementations.",
  alternates: { canonical: "https://www.rajinikanthvadla.com/courses/ai-agents-genai/" },
};

export default function AIAgentsGenAICoursePage() {
  return (
    <>
      <section className="border-b border-stone-200 bg-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">GenAI career transition</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">AI Agents &amp; GenAI professional track</h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            A practical path for software engineers who want to become production-ready GenAI builders using agentic workflows,
            structured evaluation, and enterprise-safe deployment patterns.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <article className="panel p-7">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">What you build</h2>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• Agentic RAG systems with tool invocation</li>
              <li>• Evaluation pipelines for accuracy, cost, and safety</li>
              <li>• LLMOps workflows for release and rollback</li>
              <li>• Production APIs backed by observability dashboards</li>
              <li>• Portfolio projects for interviews and role transitions</li>
            </ul>
          </article>
          <article className="panel p-7">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Best fit audience</h2>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• Backend engineers entering GenAI teams</li>
              <li>• Platform engineers owning AI service reliability</li>
              <li>• Developers building internal AI copilots and agents</li>
              <li>• Professionals targeting global GenAI job markets</li>
            </ul>
            <Link href="/genai-training" className="inline-block mt-6 bg-stone-900 text-white px-6 py-3 text-sm font-semibold hover:bg-stone-800">
              Explore GenAI training details →
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}

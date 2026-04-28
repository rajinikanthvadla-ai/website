import type { Metadata } from "next";
import Link from "next/link";
import { LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "MLOps Course in India - LLMOps, AIOps, AI Agents",
  description:
    "Join practical MLOps, LLMOps, AIOps and AI Agents training in India with live mentorship. Learn production ML, RAG, LangChain, Kubernetes and cloud deployment.",
  keywords: [
    "MLOps course in India",
    "LLMOps training India",
    "AI Agents course India",
    "AIOps course India",
    "Generative AI mentorship India",
    "MLOps mentor India",
    "LangChain training India",
  ],
  alternates: {
    canonical: "https://www.rajinikanthvadla.com/mlops-course-india/",
  },
};

export default function MLOpsCourseIndiaPage() {
  return (
    <section className="border-b border-stone-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
          India + Global Cohorts
        </span>
        <h1 className="font-display text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
          MLOps Course in India with LLMOps, AIOps, and AI Agents
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-600">
          This training is built for engineers who want production-ready skills, not only theory. You will learn
          pipeline design, deployment, monitoring, GenAI systems, and interview positioning with direct mentorship.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Live online sessions at practical pace",
            "Hands-on labs across AWS, Azure, GCP",
            "Career and interview mentorship support",
          ].map((item) => (
            <div key={item} className="panel p-5 text-sm text-stone-700">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="panel p-7">
            <h2 className="font-display text-2xl font-bold text-stone-900">What you will learn</h2>
            <ul className="mt-4 space-y-2 text-stone-600">
              <li>- MLOps lifecycle: data to production monitoring</li>
              <li>- LLMOps: RAG, evaluation, prompt systems, cost control</li>
              <li>- AIOps: observability, anomaly detection, automation</li>
              <li>- AI Agents: tool use, workflows, deployment patterns</li>
            </ul>
          </article>
          <article className="panel p-7">
            <h2 className="font-display text-2xl font-bold text-stone-900">Who this is for</h2>
            <ul className="mt-4 space-y-2 text-stone-600">
              <li>- DevOps or backend engineers moving into ML/AI roles</li>
              <li>- ML engineers needing strong production architecture skills</li>
              <li>- Working professionals targeting better roles in India or abroad</li>
              <li>- Teams who need practical LLMOps and AI automation capability</li>
            </ul>
          </article>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/mlops-aiops-masterclass" className="bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800">
            View Masterclass
          </Link>
          <Link href="/blog" className="border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-800 hover:border-stone-900">
            Read SEO Blog Updates
          </Link>
          <a
            href={LINKS.whatsappSyllabus}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            WhatsApp for Syllabus
          </a>
        </div>
      </div>
    </section>
  );
}

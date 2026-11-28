import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { LINKS, SITE } from "@/lib/constants";
import {
  AI_LABS,
  AI_LAB_TRACKS,
  colabUrlForNotebook,
  githubUrlForNotebook,
} from "@/lib/ai-labs";

const PAGE_URL = `${SITE.url}${AI_LABS.path}`;

export const metadata: Metadata = {
  title: {
    absolute: "AI Labs | LLM Notebooks in Google Colab | Rajinikanth Vadla",
  },
  description:
    "Rajinikanth Vadla AI Labs — practice LLM workflows in Google Colab with your own Google account. Start with the Notebook lab, then grow into evals and agents.",
  keywords: [
    "AI Labs",
    "LLM Labs",
    "Google Colab notebook",
    "Rajinikanth Vadla AI Labs",
    "LLM practice notebook",
    "prompt engineering lab",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Labs | Rajinikanth Vadla",
    description: "Branded LLM Labs hub. Open Notebook in Colab with your Google login.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export default function AiLabsPage() {
  const llmTrack = AI_LAB_TRACKS.find((t) => t.id === "llm")!;

  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "AI Labs", path: AI_LABS.path }]} />

      <section className="bg-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-400 mb-3">
            {AI_LABS.brand} / {AI_LABS.product}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
            {AI_LABS.product}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-6">
            {AI_LABS.tagline}
          </p>
          <p className="text-sm text-slate-400 max-w-2xl mb-8">
            This page stays on <span className="text-white font-semibold">rajinikanthvadla.com</span>.
            When you open a notebook, Google Colab runs in a new tab with your Gmail — that is how Colab
            works. Your hub, branding, and next labs always live here.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#llm-labs"
              className="inline-flex px-5 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600"
              data-track="AI Labs: hero jump LLM"
            >
              Open LLM Labs
            </a>
            <Link
              href="/python-course/"
              className="inline-flex px-5 py-3 rounded-lg text-sm font-semibold border-2 border-slate-500 text-white hover:border-white"
            >
              Free Python first
            </Link>
          </div>
        </div>
      </section>

      <section id="llm-labs" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">Track</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">{llmTrack.title}</h2>
            <p className="text-slate-600 leading-relaxed">{llmTrack.blurb}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {llmTrack.cards.map((card) => {
              const isLive = card.status === "live" && card.notebookPath;
              const colabHref = isLive ? colabUrlForNotebook(card.notebookPath!) : null;
              const githubHref = isLive ? githubUrlForNotebook(card.notebookPath!) : null;

              return (
                <article
                  key={card.id}
                  className={`panel p-6 flex flex-col ${
                    card.id === "notebook" ? "border-l-4 border-l-orange-500 md:col-span-1" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {card.id === "notebook" ? "Primary" : "Lab"}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                        isLive ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {isLive ? "Live" : "Soon"}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{card.blurb}</p>
                  <ul className="flex flex-wrap gap-2 mb-5">
                    {card.tags.map((tag) => (
                      <li
                        key={`${card.id}-${tag}`}
                        className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded px-2 py-1"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {isLive && colabHref ? (
                    <div className="space-y-2">
                      <a
                        href={colabHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800"
                        data-track="AI Labs: open Notebook Colab"
                      >
                        Open in Google Colab →
                      </a>
                      {githubHref ? (
                        <a
                          href={githubHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-300 text-slate-700 hover:border-slate-500"
                        >
                          View notebook on GitHub
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-slate-500">Coming in a later AI Labs drop.</p>
                  )}
                </article>
              );
            })}
          </div>

          <div className="panel p-5 md:p-6 mt-8 bg-slate-50">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2">How it works</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
              <li>Stay on this AI Labs page for branding, tracks, and what to practice next.</li>
              <li>Click Open in Google Colab — sign in with your Google account if asked.</li>
              <li>Colab copies the notebook into your Drive session so you can edit and run cells.</li>
              <li>Return here for the next lab. More LLM Labs cards ship after Notebook.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
            From lab practice to live cohorts
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Labs are free practice. When you want graded delivery, mentorship, and interview loops, join a cohort.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/courses/fde/"
              className="inline-flex px-5 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600"
            >
              FDE course
            </Link>
            <Link
              href="/mlops-aiops-masterclass/"
              className="inline-flex px-5 py-3 rounded-lg text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800"
            >
              Masterclass
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-3 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              data-track="AI Labs: WhatsApp"
            >
              WhatsApp Rajinikanth
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

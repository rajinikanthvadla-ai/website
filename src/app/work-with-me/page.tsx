import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ConsultForm from "@/components/ConsultForm";
import ProjectCard from "@/components/ProjectCard";
import SiteBanners from "@/components/SiteBanners";
import { getProjects } from "@/lib/cms";
import { LINKS, YEARS_EXPERIENCE } from "@/lib/constants";
import { CONSULTING_SERVICES } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Hire an AI Agent & MLOps Engineer: Consulting and Builds",
  description:
    "Rajinikanth Vadla builds production AI agents, RAG systems and MLOps/LLMOps platforms for companies, and reviews AI product roadmaps and cloud costs. Send a project request.",
  alternates: { canonical: "https://rajinikanthvadla.com/work-with-me/" },
};

const STEPS = [
  { title: "Send a request", text: "Tell me what you want built or fixed. Two minutes." },
  { title: "Short call", text: "30 minutes to understand your data, stack and goal. Free." },
  { title: "Written plan", text: "Scope, architecture, timeline and a fixed price or weekly rate." },
  { title: "Build and hand over", text: "Weekly demos, then deployment, docs and a handover session." },
];

export default async function WorkWithMePage() {
  const projects = (await getProjects()).filter((p) => p.category === "client").slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Work with me", path: "/work-with-me/" }]} />

      <section className="notion-hero">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-3">Consulting · Builds · Team training</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5 max-w-3xl">
            I build AI agents and MLOps platforms that run in production.
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mb-7">
            Senior MLOps and AIOps engineer with {YEARS_EXPERIENCE} years in production systems. I have shipped multi-agent incident
            triage, RAG support bots for 80,000+ users and fraud detection pipelines. Now I help companies do the same.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#request" className="notion-btn notion-btn--accent">
              Send a project request
            </a>
            <Link href="/projects/" className="notion-btn notion-btn--ink">
              See projects
            </Link>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ghost">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SiteBanners placement="work" />

      <section className="notion-section notion-section--white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-8">What you can hire me for</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CONSULTING_SERVICES.map((s) => (
              <article key={s.id} className="lift bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-display font-bold text-lg text-[#0f172a] mb-1">{s.title}</h3>
                <p className="text-xs font-semibold text-teal-700 mb-3">{s.who}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{s.what}</p>
                <p className="text-sm text-slate-800">
                  <span className="font-semibold">You get: </span>
                  {s.output}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {projects.length ? (
        <section className="notion-section notion-section--paper">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a]">Recent production work</h2>
              <Link href="/projects/" className="text-sm font-semibold text-teal-700 underline underline-offset-4">
                All projects
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="notion-section notion-section--white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-8">How it works</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <span className="font-display text-3xl font-bold text-orange-600">{i + 1}</span>
                <h3 className="font-display font-bold text-[#0f172a] mt-2 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="request" className="notion-section notion-section--paper scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-2">Send a project request</h2>
          <p className="text-slate-600 mb-6">
            An AI agent for your team, a roadmap for your AI product, or help getting models into production.
          </p>
          <ConsultForm />
        </div>
      </section>
    </>
  );
}

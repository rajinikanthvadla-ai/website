import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Projects: AI Agents, RAG and MLOps Platforms Built in Production",
  description:
    "Production work by Rajinikanth Vadla: multi-agent AIOps incident triage, RAG support chatbots, fraud detection MLOps, document intelligence, and the open-source Orphanaut cloud cleanup app.",
  alternates: { canonical: "https://rajinikanthvadla.com/projects/" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const groups = [
    { title: "Client and production work", items: projects.filter((p) => p.category === "client") },
    { title: "Products and open source", items: projects.filter((p) => p.category !== "client") },
  ].filter((g) => g.items.length);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Projects", path: "/projects/" }]} />
      <section className="notion-hero">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-18">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-3">Portfolio</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
            Things I have built and shipped
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
            The same systems I teach, running in production. Client names are left out; results are as measured on
            the project.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/work-with-me/#request" className="notion-btn notion-btn--accent">
              Build something like this for you
            </Link>
            <Link href="/courses/" className="notion-btn notion-btn--ghost">
              Learn to build it yourself
            </Link>
          </div>
        </div>
      </section>

      {groups.map((g, i) => (
        <section key={g.title} className={`notion-section ${i % 2 ? "notion-section--paper" : "notion-section--white"}`}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-8">{g.title}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {g.items.map((p) => (
                <ProjectCard key={p.slug} project={p} detailed />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

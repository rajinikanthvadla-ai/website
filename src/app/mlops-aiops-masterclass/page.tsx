import type { Metadata } from "next";
import Image from "next/image";
import {
  LINKS,
  STRUCTURED_DATA,
  MLOPS_CAPSTONE_PROJECTS,
  MLOPS_CAREER_ROLES,
  MLOPS_MASTERCLASS_DURATION,
  MLOPS_PROGRAM_OVERVIEW,
  MLOPS_PROGRAM_INCLUDES,
  MLOPS_PREREQUISITES,
  MLOPS_TARGET_AUDIENCE,
} from "@/lib/constants";
import MasterclassSyllabus from "@/components/masterclass/MasterclassSyllabus";
import SectionHeader from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "MLOps AIOps LLMOps AI Agents Job Ready Course India | 4-5 Month Live Program",
  description:
    "Complete 4-5 month job-ready MLOps, AIOps, LLMOps and AI Agentic Operations course by Rajinikanth Vadla. Live online, 150+ hours hands-on, 4 capstone projects, interview prep and placement support. Best MLOps course India. ₹40,000 | $450 USD.",
  keywords: [
    "MLOps course India",
    "best MLOps course India",
    "job ready MLOps course",
    "MLOps AIOps LLMOps course",
    "AI Agents course India",
    "LLMOps training India",
    "AIOps training live",
    "MLOps course with placement",
    "Rajinikanth Vadla MLOps",
    "MLOps masterclass",
    "AI Agentic Operations course",
    "MLOps interview preparation",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/" },
};

export default function MasterclassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <HeroBanner />
      <WhatYouMaster />
      <ProgramOverview />
      <FullSyllabus />
      <CapstoneProjects />
      <PricingSection />
      <CareerRoles />
      <InstructorSection />
      <FAQSection />
      <FinalCTA />
      <SuccessStories />
    </>
  );
}

function HeroBanner() {
  return (
    <section className="bg-slate-900 text-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold py-1.5 px-4 rounded uppercase tracking-wide">
            <span className="w-2 h-2 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
            Admissions Open
          </span>
          <span className="bg-orange-500 text-white text-xs font-bold py-1.5 px-4 rounded uppercase tracking-wide">
            Job Ready Course
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          MLOps · AIOps · LLMOps<br />
          <span className="text-orange-400">AI Agentic Operations</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-2">Complete Job Ready Masterclass</p>
        <p className="text-slate-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          A complete {MLOPS_MASTERCLASS_DURATION} live program from DevOps through production AI agents.
          Built to make you job ready with real projects, interview prep and placement support.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
          {[
            { value: "4-5 Months", label: "Duration" },
            { value: "150+ Hours", label: "Hands-on" },
            { value: "6 Modules", label: "Curriculum" },
            { value: "Job Ready", label: "Outcome" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-5 text-center">
              <div className="text-white font-bold text-xl">{item.value}</div>
              <div className="text-slate-500 text-xs mt-1 uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 max-w-md mx-auto mb-8">
          <p className="text-white font-bold text-lg">
            ₹40,000 <span className="text-slate-400 font-normal text-sm">India</span>
            {" · "}
            $450 <span className="text-slate-400 font-normal text-sm">USD</span>
            {" · "}
            €420 <span className="text-slate-400 font-normal text-sm">EUR</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">Mon-Fri, 8:00-9:45 PM IST, Live online</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-blue-700 text-white px-10 py-4 rounded-lg text-base font-semibold hover:bg-blue-800 transition-colors">
            Enroll Now &rarr;
          </a>
          <a href="#full-syllabus" className="inline-flex justify-center items-center border-2 border-slate-600 text-slate-300 px-10 py-4 rounded-lg text-base font-semibold hover:border-slate-400 hover:text-white transition-colors">
            View Full Syllabus
          </a>
        </div>
        <p className="text-slate-500 text-sm">Live sessions, recordings, mentorship, job support</p>
      </div>
    </section>
  );
}

function WhatYouMaster() {
  const items = [
    { icon: "🐳", title: "DevOps for AI/ML", desc: "Docker, Kubernetes, CI/CD, Terraform. Infrastructure for AI workloads." },
    { icon: "🔄", title: "MLOps Pipelines", desc: "MLflow, Kubeflow, model versioning, deployment, monitoring, drift detection." },
    { icon: "🧠", title: "LLMOps and RAG", desc: "Deploy LLMs, fine-tuning, RAG systems, vector databases, prompt engineering." },
    { icon: "⚡", title: "AIOps Automation", desc: "Anomaly detection, predictive analytics, self-healing infrastructure." },
    { icon: "🤖", title: "AI Agentic Ops", desc: "LangChain, CrewAI, MCP, multi-agent systems, enterprise agent deployment." },
    { icon: "☁️", title: "Multi-Cloud", desc: "AWS SageMaker, Azure ML, GCP Vertex AI. Production deployment patterns." },
  ];

  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Course Overview"
          title="What you will master"
          subtitle="Complete lifecycle from experimentation to production AI systems. MLOps, LLMOps, AIOps and agentic operations in one job ready path."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((m) => (
            <div key={m.title} className="panel p-7 card-hover group">
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl mb-5">
                {m.icon}
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{m.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramOverview() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-3">Program overview</p>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed">{MLOPS_PROGRAM_OVERVIEW}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MLOPS_PROGRAM_INCLUDES.map((item) => (
            <div key={item.label} className="panel p-4 text-center bg-white">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">{item.label}</p>
              <p className="text-sm text-slate-600 leading-snug">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Prerequisites</h3>
          <ul className="space-y-2">
            {MLOPS_PREREQUISITES.map((item) => (
              <li key={item} className="text-sm text-slate-600 flex gap-2">
                <span className="text-blue-600 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Who this is for</h3>
          <ul className="space-y-2">
            {MLOPS_TARGET_AUDIENCE.map((item) => (
              <li key={item} className="text-sm text-slate-600 flex gap-2">
                <span className="text-blue-600 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FullSyllabus() {
  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200" id="full-syllabus">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Complete Syllabus"
          title={`6 Modules · ${MLOPS_MASTERCLASS_DURATION} · 150+ Hours`}
          subtitle="Tap each module to expand. Every major topic includes hands-on labs."
        />

        <MasterclassSyllabus variant="accordion" />

        <div className="text-center mt-14">
          <div className="bg-blue-50 border border-blue-200 rounded-lg inline-block px-8 py-6 mb-8">
            <p className="text-slate-800 text-lg font-semibold mb-1">Want the detailed PDF syllabus?</p>
            <p className="text-slate-600 text-sm">Message on WhatsApp and I will share batch dates, timings, and payment options.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-emerald-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
              WhatsApp for Syllabus &rarr;
            </a>
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              Enroll at ₹40,000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapstoneProjects() {
  return (
    <section className="py-24 md:py-28 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Hands-on"
          title="Four capstone projects"
          subtitle="Portfolio pieces you can walk through line by line in a technical interview."
          light
        />
        <div className="grid md:grid-cols-2 gap-5">
          {MLOPS_CAPSTONE_PROJECTS.map((p) => (
            <div key={p.title} className="border border-slate-700 bg-slate-800 rounded-lg p-7 card-hover">
              <h3 className="font-display font-bold text-white text-lg mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="border border-slate-600 text-slate-300 px-2.5 py-1 rounded text-[11px] font-medium uppercase tracking-wide">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionHeader tag="Investment" title="Course fee" subtitle="One investment that pays for itself many times over" />
        <div className="panel border-l-4 border-l-blue-700 p-10 max-w-md mx-auto mb-8 text-left">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Full program</div>
          <div className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-1">₹40,000</div>
          <p className="text-sm text-slate-500 mb-6">$450 USD · €420 EUR for international students</p>
          <ul className="space-y-3 mb-8">
            {[
              "4-5 month complete program",
              "150+ hours live training",
              "6 comprehensive modules",
              "4 capstone portfolio projects",
              "1-on-1 mentorship",
              "Job assistance, interview prep and placement support",
              "Lifetime access to recordings and notes",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-slate-600 text-sm">
                <span className="text-blue-600 font-bold shrink-0">&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-700 text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors text-center">
            Enroll Now &rarr;
          </a>
        </div>
        <p className="text-slate-500 text-sm">
          EMI options available.{" "}
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
            WhatsApp for payment plans
          </a>
        </p>
      </div>
    </section>
  );
}

function CareerRoles() {
  return (
    <section className="py-24 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader tag="Career" title="Roles you will be ready for" subtitle="High-demand roles with competitive salaries in India" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {MLOPS_CAREER_ROLES.map((r) => (
            <div key={r.title} className="panel p-5 text-center card-hover">
              <h4 className="font-display font-bold text-slate-900 mb-2 text-sm leading-snug">{r.title}</h4>
              <p className="text-orange-600 font-bold text-sm">{r.salary}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400">Reference ranges only. Markets vary by geography and experience level.</p>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
          <div className="panel p-2">
            <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla - MLOps AIOps LLMOps Trainer" width={300} height={380} className="w-full object-cover rounded-lg" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700 mb-3 block">Instructor</span>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Rajinikanth Vadla</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              MLOps, AIOps, LLMOps, and AI Agents trainer with 7+ years of enterprise experience building production AI systems.
              500+ engineers trained with 95% positive outcomes and 60% average salary increase reported by alumni.
              Known for hands-on, real-world training that bridges the gap between theory and production.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "7+", label: "Years Experience" },
                { value: "500+", label: "Engineers Trained" },
                { value: "4.9★", label: "Average Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-blue-700 stat-number">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Who is this masterclass for?",
      a: "Software engineers, DevOps engineers, data scientists, ML engineers, cloud engineers, and anyone wanting to master MLOps, LLMOps, AIOps, and AI agentic operations for production systems.",
    },
    {
      q: "What are the prerequisites?",
      a: "Basic programming (Python preferred) and Linux familiarity. We teach Docker, Kubernetes, and ML fundamentals from scratch inside the program.",
    },
    {
      q: "Is this live or recorded?",
      a: "All sessions are live with interactive Q&A. Recordings and daily notes are provided. You get lifetime access to all materials.",
    },
    {
      q: "What makes this different from Udemy or Coursera?",
      a: "Real production experience, hands-on enterprise projects, personal mentorship from Rajinikanth Vadla, small batch sizes, and active job support. Not pre-recorded videos alone.",
    },
    {
      q: "Do you provide job and placement assistance?",
      a: "Yes. Resume optimization, LinkedIn review, mock interviews, salary negotiation guidance, and placement support until you land your target role.",
    },
    {
      q: "How long is the complete job ready program?",
      a: "The full program runs 4-5 months with live sessions Monday to Friday, 8:00 to 9:45 PM IST. You get 150+ hours of hands-on labs, 6 modules, 4 capstone projects, and a dedicated job ready track with interview prep.",
    },
    {
      q: "Can I pay in installments?",
      a: "Yes, EMI and installment options are available. Contact on WhatsApp for flexible payment plans.",
    },
    {
      q: "Does the syllabus cover LLMOps and AI Agents?",
      a: "Yes. Modules 3 and 5 are dedicated to LLMOps (RAG, fine-tuning, LLM deployment) and AI Agentic Operations (LangChain, CrewAI, MCP, multi-agent systems).",
    },
    {
      q: "Can I join from outside India?",
      a: "Yes. Training is live online. Students from USA, Europe, Middle East, and other regions regularly enroll. Pricing: ₹40,000 (India), $450 (USD), €420 (EUR).",
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader tag="FAQ" title="Frequently asked questions" />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="panel group bg-white">
              <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-display font-bold text-slate-900 text-base leading-snug hover:text-blue-700 transition-colors">
                {faq.q}
                <span className="text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 md:py-24 bg-blue-700 text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Ready to master MLOps, LLMOps, AIOps &amp; AI Agents?
        </h2>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
          Join 500+ engineers who accelerated their careers. Limited seats per batch for personal attention.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center bg-orange-500 text-white px-10 py-4 rounded-lg text-base font-bold hover:bg-orange-600 transition-colors">
            Enroll at ₹40,000 &rarr;
          </a>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center bg-emerald-600 text-white px-10 py-4 rounded-lg text-base font-semibold hover:bg-emerald-700 transition-colors">
            WhatsApp
          </a>
        </div>
        <p className="text-blue-300 text-sm">Free demo class · Reply within 24 hours · EMI available</p>
      </div>
    </section>
  );
}

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
  COURSE_ZOOM_DEMOS,
} from "@/lib/constants";
import MasterclassSyllabus from "@/components/masterclass/MasterclassSyllabus";
import SectionHeader from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";
import LiveZoomDemo from "@/components/LiveZoomDemo";
import CourseVideoSection from "@/components/CourseVideoSection";
import { COURSE_VIDEOS } from "@/lib/course-videos";
import { MLOPS_SKETCH, sketch } from "@/lib/sketch-assets";

export const metadata: Metadata = {
  title: "MLOps AIOps LLMOps AI Agents Live Course | ₹40K with Installments | Rajinikanth Vadla",
  description:
    "Live MLOps, AIOps, LLMOps and AI Agentic course in India: 4-5 months, ₹40,000 with 2 installments OR ₹30,000 recordings-only self-learning. 150+ hours hands-on, 4 capstone projects, interview prep, placement support. Cohort started.",
  keywords: [
    "MLOps course",
    "MLOps course India",
    "MLOps live course",
    "best MLOps course India",
    "MLOps course ₹40000",
    "MLOps course with installments",
    "job ready MLOps course",
    "MLOps AIOps LLMOps course",
    "AI Agents course",
    "AI agentic course India",
    "GenAI course",
    "LLMOps training",
    "AIOps training live",
    "MLOps course with placement",
    "MLOps masterclass",
    "AI Agentic Operations course",
    "MLOps interview preparation",
    "MLOps recordings course",
    "Rajinikanth Vadla MLOps live",
    "MLOps course with WhatsApp support",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/" },
};

export default function MasterclassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <HeroBanner />
      <LiveZoomDemo demo={COURSE_ZOOM_DEMOS.mlopsMasterclass} variant="dark" />
      <CourseVideoSection
        title="Watch the masterclass on YouTube"
        subtitle="Real live-class recordings from the MLOps, LLMOps, AIOps and AI Agents course — embedded directly from Rajinikanth Vadla's channel."
        videos={[...COURSE_VIDEOS.masterclass]}
        variant="notion"
      />
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
    <section className="notion-hero">
      <div className="notion-hero-inner !max-w-4xl !grid-cols-1 text-center">
        <div>
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Cohort Started · Live Classes Running
          </span>

          <div className="notion-sketch-frame notion-sketch-frame--blue max-w-[240px] mx-auto mb-8">
            <Image
              src={sketch(MLOPS_SKETCH.hero)}
              alt="Enterprise MLOps team illustration"
              width={220}
              height={140}
            />
          </div>

          <h1 className="notion-hero-title !text-center">
            MLOps · AIOps · LLMOps<br />
            <span className="notion-hero-accent">AI Agentic Operations</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl mb-2 text-center">Complete Job Ready Masterclass</p>
          <p className="notion-hero-lead !mx-auto text-center">
            A complete {MLOPS_MASTERCLASS_DURATION} live program from DevOps through production AI agents.
            Built to make you job ready with real projects, interview prep and placement support.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8 mt-8">
            {[
              { value: "4-5 Months", label: "Duration" },
              { value: "150+ Hours", label: "Hands-on" },
              { value: "6 Modules", label: "Curriculum" },
              { value: "Job Ready", label: "Outcome" },
            ].map((item) => (
              <div key={item.label} className="panel px-4 py-5 text-center !shadow-[4px_4px_0_#0f172a]">
                <div className="notion-stat-value text-xl">{item.value}</div>
                <div className="notion-stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="panel p-5 max-w-md mx-auto mb-8 border-l-4 border-l-blue-700">
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Live Course Option</div>
              <p className="text-[#0f172a] font-bold text-2xl">₹40,000 <span className="text-slate-500 font-normal text-sm">with 2 installments</span></p>
              <p className="text-slate-600 text-xs mt-2">Live 4–5 months · 150+ hours · 1-on-1 support · job assistance</p>
            </div>
            <div className="border-t border-slate-300 pt-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Recordings Only (Self-Learning)</div>
              <p className="text-[#0f172a] font-bold text-2xl">₹30,000 <span className="text-slate-500 font-normal text-sm">with 2 installments</span></p>
              <p className="text-slate-600 text-xs mt-2">Lifetime access · no live class · no support</p>
            </div>
            <p className="text-slate-500 text-xs mt-4">Mon-Fri, 8:00-9:45 PM IST (live cohort). International: $450 / €420</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
            <a href="/enroll" className="notion-btn notion-btn--accent">
              View Pricing & Enroll &rarr;
            </a>
            <a href={LINKS.zoomMasterclass} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink">
              Watch Live Demo &rarr;
            </a>
            <a href="#full-syllabus" className="notion-btn notion-btn--ghost">
              View Syllabus
            </a>
          </div>
          <p className="text-slate-500 text-sm">Cohort already started. Next intake: check WhatsApp or Zoom demo.</p>
        </div>
      </div>
    </section>
  );
}

function WhatYouMaster() {
  const items = [
    { icon: "🐳", title: "DevOps for AI/ML", desc: "Docker, Kubernetes, CI/CD, Terraform. Infrastructure for AI workloads.", sketch: "workflowDocs" as const },
    { icon: "🔄", title: "MLOps Pipelines", desc: "MLflow, Kubeflow, model versioning, deployment, monitoring, drift detection.", sketch: "productivityFlow" as const },
    { icon: "🧠", title: "LLMOps and RAG", desc: "Deploy LLMs, fine-tuning, RAG systems, vector databases, prompt engineering.", sketch: "reader" as const },
    { icon: "⚡", title: "AIOps Automation", desc: "Anomaly detection, predictive analytics, self-healing infrastructure.", sketch: "incidentResponse" as const },
    { icon: "🤖", title: "AI Agentic Ops", desc: "LangChain, CrewAI, MCP, multi-agent systems, enterprise agent deployment.", sketch: "teamCollab" as const },
    { icon: "☁️", title: "Multi-Cloud", desc: "AWS SageMaker, Azure ML, GCP Vertex AI. Production deployment patterns.", sketch: "enterpriseTeam" as const },
  ];

  return (
    <section className="notion-section notion-section--white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Course Overview"
          title="What you will master"
          subtitle="Complete lifecycle from experimentation to production AI systems. MLOps, LLMOps, AIOps and agentic operations in one job ready path."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((m) => (
            <div key={m.title} className="notion-program-card card-hover group">
              <div className="notion-program-sketch !min-h-[110px]">
                <Image src={sketch(m.sketch)} alt="" width={180} height={90} aria-hidden />
              </div>
              <div className="notion-program-body">
                <div className="text-2xl mb-3">{m.icon}</div>
                <h3 className="font-display font-bold text-[#0f172a] text-lg mb-2 group-hover:text-blue-700 transition-colors">{m.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>
              </div>
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
    <section className="py-24 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <SectionHeader
          tag="Pricing"
          title="Choose your learning path"
          subtitle="Live cohort with mentorship OR recordings-only self-study. Both with 2-installment payment plans."
        />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Live Course */}
          <div className="panel border-l-4 border-l-blue-700 p-10 text-left">
            <div className="mb-6">
              <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3">Recommended</div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Live Cohort Course</h3>
              <p className="text-slate-600 text-sm mb-4">Full support, mentorship, and job assistance</p>
            </div>
            <div className="mb-6">
              <p className="text-5xl font-bold text-slate-900">₹40,000</p>
              <p className="text-slate-600 text-sm mt-1">2 installments of ₹20,000 each</p>
              <p className="text-slate-500 text-xs mt-2">$450 USD or €420 EUR (international)</p>
            </div>
            <ul className="space-y-2.5 mb-8">
              {[
                "4–5 months live online cohort",
                "150+ hours hands-on training",
                "6 comprehensive modules",
                "4 capstone portfolio projects",
                "1-on-1 mentorship from Rajinikanth",
                "Job assistance & interview prep",
                "Placement support",
                "Lifetime access to recordings",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-700 text-sm">
                  <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-700 text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors text-center">
              Enroll on WhatsApp &rarr;
            </a>
          </div>

          {/* Recordings Only */}
          <div className="panel border-l-4 border-l-slate-400 p-10 text-left">
            <div className="mb-6">
              <div className="inline-block bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold mb-3">Self-Learning</div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Recordings Only</h3>
              <p className="text-slate-600 text-sm mb-4">Learn at your own pace, no live classes</p>
            </div>
            <div className="mb-6">
              <p className="text-5xl font-bold text-slate-900">₹30,000</p>
              <p className="text-slate-600 text-sm mt-1">2 installments of ₹15,000 each</p>
              <p className="text-slate-500 text-xs mt-2">$375 USD or €350 EUR (international)</p>
            </div>
            <ul className="space-y-2.5 mb-8">
              {[
                "4–5 months of recorded sessions",
                "150+ hours of content",
                "6 comprehensive modules",
                "4 capstone projects + solutions",
                "Lifetime access (no expiry)",
                "No live classes or mentorship",
                "No job assistance",
                "Community (optional, unprioritized)",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-700 text-sm">
                  <span className="text-slate-500 font-bold shrink-0 mt-0.5">–</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-slate-600 text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors text-center">
              WhatsApp for recordings &rarr;
            </a>
          </div>
        </div>

        <div className="bg-white panel p-6 rounded-lg border border-slate-200 max-w-2xl mx-auto">
          <h3 className="font-display text-lg font-bold text-slate-900 mb-3">Payment Plans & Questions?</h3>
          <p className="text-slate-600 text-sm mb-4">
            Both options support 2-installment payment plans. For batch timing, demo access, or enrollment details:
          </p>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Message on WhatsApp
          </a>
        </div>
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

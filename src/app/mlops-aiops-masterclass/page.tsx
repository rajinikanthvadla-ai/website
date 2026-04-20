import type { Metadata } from "next";
import Image from "next/image";
import { LINKS, STRUCTURED_DATA } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "MLOps + AIOps Masterclass — 12-Week Live Cohort",
  description:
    "12-16 week live cohort: DevOps → MLOps → LLMOps → AIOps → AI Agents. 200+ hours hands-on, 500+ trained, 95% placement. ₹35,000.",
  alternates: { canonical: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/" },
};

const MODULES = [
  { num: "01", title: "DevOps Fundamentals for AI/ML", topics: ["Linux, Shell Scripting, Git workflows", "Docker containerization for ML models", "Kubernetes orchestration (EKS, AKS, GKE)", "Terraform & Ansible IaC", "CI/CD with Jenkins, GitHub Actions", "AWS, Azure, GCP cloud computing", "Prometheus & Grafana monitoring"] },
  { num: "02", title: "MLOps: Machine Learning Operations", topics: ["ML lifecycle & MLOps maturity model", "Data engineering & feature stores (Feast)", "Experiment tracking with MLflow", "Model versioning with DVC", "Model deployment with FastAPI", "ML CI/CD pipelines", "Model monitoring & drift detection", "Kubeflow & SageMaker pipelines"] },
  { num: "03", title: "LLMOps: Large Language Model Operations", topics: ["LLM lifecycle management", "Prompt engineering mastery", "Fine-tuning with LoRA/QLoRA", "RAG systems & vector databases", "LLM deployment & optimization", "Cost & performance monitoring", "Responsible AI & guardrails"] },
  { num: "04", title: "AIOps: AI for IT Operations", topics: ["Anomaly detection systems", "Predictive analytics for IT", "Root cause analysis with AI", "Self-healing infrastructure", "Cloud-native AIOps", "Chaos engineering", "Intelligent alerting"] },
  { num: "05", title: "AI Agents & Autonomous Systems", topics: ["LangChain agent framework", "Tool use & function calling", "Agent memory systems", "Multi-agent with CrewAI", "Model Context Protocol (MCP)", "Enterprise agent deployment", "Agent testing & evaluation"] },
  { num: "06", title: "Capstone Projects", topics: ["End-to-end MLOps pipeline", "Production LLM app with RAG", "AIOps monitoring system", "Enterprise AI Agent"] },
];

const PROJECTS = [
  { title: "End-to-End MLOps Pipeline", desc: "Automated ML pipeline with CI/CD, Kubernetes deployment, monitoring, and drift detection.", stack: ["Python", "MLflow", "Docker", "Kubernetes", "Jenkins"] },
  { title: "Production LLM Application", desc: "Fine-tuned LLM with RAG system, vector database, prompt management, and monitoring.", stack: ["LangChain", "ChromaDB", "FastAPI", "Docker", "HuggingFace"] },
  { title: "AIOps Monitoring Platform", desc: "Anomaly detection, predictive maintenance, automated remediation workflows.", stack: ["Prometheus", "Grafana", "Python", "Kubernetes", "Scikit-learn"] },
  { title: "Enterprise AI Agent", desc: "Multi-agent system with tool integration, human-in-the-loop, and production deployment.", stack: ["LangChain", "CrewAI", "FastAPI", "PostgreSQL", "Docker"] },
];

const ROLES = [
  { title: "MLOps Engineer", salary: "₹12-40 LPA" },
  { title: "ML Engineer", salary: "₹15-45 LPA" },
  { title: "AIOps Engineer", salary: "₹12-35 LPA" },
  { title: "LLM/GenAI Engineer", salary: "₹20-50+ LPA" },
  { title: "AI Agent Developer", salary: "₹18-45 LPA" },
  { title: "ML Platform Engineer", salary: "₹18-40 LPA" },
  { title: "SRE (ML Focus)", salary: "₹15-35 LPA" },
  { title: "DevOps (AI/ML)", salary: "₹12-30 LPA" },
];

export default function MasterclassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      {/* Hero */}
      <section className="relative bg-stone-900 text-stone-100 border-b border-stone-800">
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-24 text-center">
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            <span className="border border-stone-600 text-stone-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              Admissions open
            </span>
            <span className="border border-amber-700/50 text-amber-200/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              Limited seats
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            MLOps &amp; AIOps Masterclass
          </h1>
          <p className="text-lg md:text-xl text-stone-400 mb-4 max-w-3xl mx-auto">
            DevOps &rarr; MLOps &rarr; LLMOps &rarr; AIOps &rarr; AI Agents
          </p>
          <p className="text-stone-500 mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            One continuous arc with heavy lab time - built for people who want production judgment, not buzzwords.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-3xl mx-auto mb-10 text-left">
            {[
              { label: "Duration", value: "12–16 weeks" },
              { label: "Hours", value: "200+" },
              { label: "Projects", value: "4 capstones" },
              { label: "Time", value: "8 PM IST" },
              { label: "Fee", value: "₹35,000" },
            ].map((s) => (
              <div key={s.label} className="border border-stone-700 bg-stone-950/40 px-3 py-3">
                <div className="text-white font-semibold text-sm">{s.value}</div>
                <div className="text-stone-500 text-[10px] mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center bg-white text-stone-900 px-8 py-3.5 text-sm font-semibold hover:bg-stone-100 transition-colors">
              Join for ₹35,000
            </a>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center border border-stone-500 text-stone-100 px-8 py-3.5 text-sm font-semibold hover:bg-stone-800 transition-colors">
              Syllabus on WhatsApp
            </a>
          </div>
          <p className="text-stone-500 text-xs md:text-sm">
            Live online, notes and recordings, mentorship, job support
          </p>
        </div>
      </section>

      {/* What You'll Master */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Course Overview" title="What You'll Master" subtitle="Complete lifecycle from experimentation to production AI systems" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🐳", title: "DevOps for AI/ML", desc: "Docker, Kubernetes, CI/CD, Terraform - infrastructure for AI workloads." },
              { icon: "🔄", title: "MLOps Pipelines", desc: "End-to-end ML pipelines, MLflow, Kubeflow, model versioning, deployment." },
              { icon: "🧠", title: "LLMOps & RAG", desc: "Deploy LLMs, fine-tuning, RAG systems, vector databases, prompt engineering." },
              { icon: "⚡", title: "AIOps Automation", desc: "Anomaly detection, predictive analytics, self-healing infrastructure." },
              { icon: "🤖", title: "AI Agents", desc: "LangChain, autonomous agents, tool use, multi-agent systems, MCP." },
              { icon: "☁️", title: "Multi-Cloud", desc: "AWS SageMaker, Azure ML, GCP Vertex AI - production deployment." },
            ].map((m) => (
              <div key={m.title} className="bg-stone-50 rounded-2xl p-7 border border-stone-200 card-hover">
                <div className="text-3xl mb-4">{m.icon}</div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{m.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modules */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Curriculum" title="6 Comprehensive Modules" subtitle="Every module builds on the previous - a complete learning journey" />
          <div className="space-y-6">
            {MODULES.map((m) => (
              <div key={m.num} className="panel p-8 card-hover">
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-12 h-12 border border-stone-900 bg-stone-900 text-[#fffefc] flex items-center justify-center font-bold text-sm shrink-0">
                    {m.num}
                  </span>
                  <h3 className="font-display font-bold text-stone-900 text-xl">{m.title}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {m.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-stone-600 text-sm">
                      <span className="text-accent-600">&rarr;</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Projects */}
      <section className="py-24 md:py-28 bg-stone-900 text-stone-100 border-y border-stone-800">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Hands-on" title="Four capstone projects" subtitle="Pieces you can narrate in a technical interview without exaggerating." light />
          <div className="grid md:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <div key={p.title} className="border border-stone-700 bg-stone-950/40 p-7">
                <h3 className="font-display font-bold text-white text-lg mb-3">{p.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="border border-stone-600 text-stone-300 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionHeader tag="Investment" title="Course Fee" subtitle="One investment that pays for itself many times over" />
          <div className="panel border-l-4 border-l-accent-600 p-10 max-w-md mx-auto mb-8">
            <div className="text-stone-500 text-xs font-semibold uppercase tracking-widest mb-2">Full program</div>
            <div className="font-display text-5xl md:text-6xl font-bold text-stone-900 mb-6">₹35,000</div>
            <ul className="text-left space-y-3 mb-8">
              {["200+ hours live training", "4 capstone projects", "1-on-1 mentorship", "Job assistance & placement", "Lifetime access to materials", "Daily notes & recordings"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-stone-600 text-sm">
                  <span className="text-accent-600 font-bold shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="block w-full bg-stone-900 text-white py-3.5 text-sm font-semibold hover:bg-stone-800 transition-colors text-center">
              Enroll &rarr;
            </a>
          </div>
          <p className="text-stone-500 text-sm">EMI options available. <a href={LINKS.whatsapp} target="_blank" className="text-accent-600 font-semibold hover:underline">WhatsApp for payment plans</a></p>
        </div>
      </section>

      {/* Career Roles */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Career" title="Roles You'll Be Ready For" subtitle="High-demand roles with competitive salaries" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {ROLES.map((r) => (
              <div key={r.title} className="bg-white rounded-2xl p-5 border border-stone-200 text-center card-hover">
                <h4 className="font-bold text-stone-900 mb-2">{r.title}</h4>
                <p className="text-accent-600 font-bold text-sm">{r.salary}</p>
              </div>
            ))}
          </div>
          <div className="panel p-6 text-center border-stone-300">
            <p className="text-stone-800 text-sm font-medium">Reference ranges only - markets move; always verify for your geography and level.</p>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
            <div className="panel p-2">
              <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla - MLOps AIOps GenAI Trainer" width={300} height={380} className="w-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3 block">Instructor</span>
              <h2 className="font-display text-3xl font-bold text-stone-900 mb-4">Rajinikanth Vadla</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                AI/ML Operations Engineer, Cloud Architect, and India&apos;s #1 rated MLOps &amp; AIOps trainer.
                7+ years of enterprise experience building production AI systems. 500+ engineers trained with
                95% placement rate and 60% average salary increase. Known for hands-on, real-world training
                that bridges the gap between theory and production.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "7+", label: "Years Experience" },
                  { value: "500+", label: "Engineers Trained" },
                  { value: "4.9★", label: "Average Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-stone-900">{s.value}</div>
                    <div className="text-xs text-stone-500 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="FAQ" title="Frequently Asked Questions" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "Who is this masterclass for?", a: "Software engineers, DevOps engineers, data scientists, ML engineers, cloud engineers, and anyone wanting to master AI/ML Operations for production systems." },
              { q: "What are the prerequisites?", a: "Basic programming (Python preferred) and Linux familiarity. We teach everything else from scratch, including Docker, Kubernetes, and ML fundamentals." },
              { q: "Is this live or recorded?", a: "All sessions are live with interactive Q&A. Recordings and daily notes are provided for review. You get lifetime access to all materials." },
              { q: "What makes this different from other courses?", a: "Real production experience (not just theory), hands-on enterprise projects, personal mentorship from Rajinikanth, small batch sizes, and 95% job placement rate." },
              { q: "Do you provide job/placement assistance?", a: "Yes! Resume optimization, LinkedIn review, mock interviews, salary negotiation guidance, and active placement support until you land your target role." },
              { q: "Can I pay in installments?", a: "Yes, EMI and installment options are available. Contact us on WhatsApp for flexible payment plans." },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-7 border border-stone-200 card-hover">
                <h3 className="font-bold text-stone-900 text-lg mb-2">{faq.q}</h3>
                <p className="text-stone-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-5">Transform Your Career in AI/ML</h2>
          <p className="text-lg text-stone-500 mb-10">
            Join 500+ engineers who accelerated their careers. Limited seats per batch for personal attention.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="bg-stone-900 text-white px-8 py-3.5 text-sm font-semibold hover:bg-stone-800 transition-colors">
              Enroll for ₹35,000
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-emerald-700 text-white px-8 py-3.5 text-sm font-semibold hover:bg-emerald-800 transition-colors">
              WhatsApp
            </a>
          </div>
          <p className="text-stone-400 text-sm">Free demo class. Reply in 24 hours. No obligation. EMI available.</p>
        </div>
      </section>

      <SuccessStories />
    </>
  );
}

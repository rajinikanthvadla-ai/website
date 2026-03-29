import type { Metadata } from "next";
import Image from "next/image";
import { LINKS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "MLOps & AIOps Masterclass | Best DevOps MLOps AIOps GenAI AI Agents Course India | ₹35,000",
  description:
    "India's #1 MLOps & AIOps Masterclass by Rajinikanth Vadla. 12-16 weeks, 200+ hours hands-on training. DevOps → MLOps → LLMOps → AIOps → AI Agents. Docker, Kubernetes, MLflow, Kubeflow, LangChain, RAG, AWS, Azure, GCP. 500+ engineers trained, 95% placement rate, 60% avg salary hike. ₹35,000 INR. Live online. Admissions open.",
  keywords: [
    "MLOps AIOps Masterclass", "best DevOps course", "best MLOps course India",
    "best AIOps training", "AI Agents course", "GenAI training India",
    "LLMOps course", "DevOps training", "cloud DevOps course",
    "real-time DevOps training", "Kubernetes training India",
    "Docker training", "MLflow course", "Kubeflow training",
    "LangChain course India", "RAG training", "production ML course",
    "DevOps to MLOps", "AI ML Ops training", "Rajinikanth Vadla course",
    "best DevOps training India", "multi-cloud training AWS Azure GCP",
    "MLOps certification", "AIOps certification", "AI engineer training",
    "ML engineer course India", "DevOps MLOps AIOps GenAI AI Agents",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass" },
};

const MODULES = [
  { num: "01", title: "DevOps Fundamentals for AI/ML", color: "from-blue-500 to-indigo-600", topics: ["Linux, Shell Scripting, Git workflows", "Docker containerization for ML models", "Kubernetes orchestration (EKS, AKS, GKE)", "Terraform & Ansible IaC", "CI/CD with Jenkins, GitHub Actions", "AWS, Azure, GCP cloud computing", "Prometheus & Grafana monitoring"] },
  { num: "02", title: "MLOps — Machine Learning Operations", color: "from-emerald-500 to-teal-600", topics: ["ML lifecycle & MLOps maturity model", "Data engineering & feature stores (Feast)", "Experiment tracking with MLflow", "Model versioning with DVC", "Model deployment with FastAPI", "ML CI/CD pipelines", "Model monitoring & drift detection", "Kubeflow & SageMaker pipelines"] },
  { num: "03", title: "LLMOps — Large Language Model Operations", color: "from-purple-500 to-violet-600", topics: ["LLM lifecycle management", "Prompt engineering mastery", "Fine-tuning with LoRA/QLoRA", "RAG systems & vector databases", "LLM deployment & optimization", "Cost & performance monitoring", "Responsible AI & guardrails"] },
  { num: "04", title: "AIOps — AI for IT Operations", color: "from-amber-500 to-orange-600", topics: ["Anomaly detection systems", "Predictive analytics for IT", "Root cause analysis with AI", "Self-healing infrastructure", "Cloud-native AIOps", "Chaos engineering", "Intelligent alerting"] },
  { num: "05", title: "AI Agents & Autonomous Systems", color: "from-rose-500 to-pink-600", topics: ["LangChain agent framework", "Tool use & function calling", "Agent memory systems", "Multi-agent with CrewAI", "Model Context Protocol (MCP)", "Enterprise agent deployment", "Agent testing & evaluation"] },
  { num: "06", title: "Capstone Projects", color: "from-cyan-500 to-blue-600", topics: ["End-to-end MLOps pipeline", "Production LLM app with RAG", "AIOps monitoring system", "Enterprise AI Agent"] },
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.2),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-6">
            <span className="inline-flex items-center gap-2 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse-dot" />
              Course Started &mdash; Admissions Open
            </span>
            <span className="border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Limited Seats
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
            MLOps &amp; AIOps
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Masterclass
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
            DevOps &rarr; MLOps &rarr; LLMOps &rarr; AIOps &rarr; AI Agents
          </p>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
            The most comprehensive AI/ML Operations training program in India.
            Build production-ready AI systems with 200+ hours of hands-on training.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto mb-10">
            {[
              { label: "Duration", value: "12-16 Weeks" },
              { label: "Hours", value: "200+" },
              { label: "Projects", value: "4 Capstone" },
              { label: "Time", value: "8 PM IST" },
              { label: "Fee", value: "₹35,000" },
            ].map((s) => (
              <div key={s.label} className="border border-white/10 bg-white/5 rounded-xl p-4 text-center">
                <div className="text-white font-bold">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
              Join Now &mdash; ₹35,000 &rarr;
            </a>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
              Get Syllabus on WhatsApp
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            Live Online &middot; Daily Notes &middot; Lifetime Access &middot; 1-on-1 Mentorship &middot; Job Assistance
          </p>
        </div>
      </section>

      {/* What You'll Master */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Course Overview" title="What You'll Master" subtitle="Complete lifecycle from experimentation to production AI systems" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🐳", title: "DevOps for AI/ML", desc: "Docker, Kubernetes, CI/CD, Terraform — infrastructure for AI workloads." },
              { icon: "🔄", title: "MLOps Pipelines", desc: "End-to-end ML pipelines, MLflow, Kubeflow, model versioning, deployment." },
              { icon: "🧠", title: "LLMOps & RAG", desc: "Deploy LLMs, fine-tuning, RAG systems, vector databases, prompt engineering." },
              { icon: "⚡", title: "AIOps Automation", desc: "Anomaly detection, predictive analytics, self-healing infrastructure." },
              { icon: "🤖", title: "AI Agents", desc: "LangChain, autonomous agents, tool use, multi-agent systems, MCP." },
              { icon: "☁️", title: "Multi-Cloud", desc: "AWS SageMaker, Azure ML, GCP Vertex AI — production deployment." },
            ].map((m) => (
              <div key={m.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 card-hover">
                <div className="text-3xl mb-4">{m.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modules */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Curriculum" title="6 Comprehensive Modules" subtitle="Every module builds on the previous — a complete learning journey" />
          <div className="space-y-6">
            {MODULES.map((m) => (
              <div key={m.num} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
                <div className="flex items-center gap-4 mb-5">
                  <span className={`w-12 h-12 bg-gradient-to-br ${m.color} text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg`}>
                    {m.num}
                  </span>
                  <h3 className="font-bold text-gray-900 text-xl">{m.title}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {m.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-emerald-500">&rarr;</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Projects */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-6">
          <SectionHeader tag="Hands-on" title="4 Real-World Capstone Projects" subtitle="Build complete production systems for your portfolio" light />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <h3 className="font-bold text-white text-lg mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
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
          <div className="bg-gray-50 border-2 border-indigo-500 rounded-3xl p-10 max-w-md mx-auto mb-8">
            <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Full Course</div>
            <div className="text-6xl font-black text-gray-900 mb-6">₹35,000</div>
            <ul className="text-left space-y-3 mb-8">
              {["200+ hours live training", "4 capstone projects", "1-on-1 mentorship", "Job assistance & placement", "Lifetime access to materials", "Daily notes & recordings"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="block w-full bg-indigo-600 text-white py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all">
              Enroll Now &rarr;
            </a>
          </div>
          <p className="text-gray-500">EMI options available &middot; <a href={LINKS.whatsapp} target="_blank" className="text-indigo-600 font-semibold hover:underline">Contact on WhatsApp</a></p>
        </div>
      </section>

      {/* Career Roles */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Career" title="Roles You'll Be Ready For" subtitle="High-demand roles with competitive salaries" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {ROLES.map((r) => (
              <div key={r.title} className="bg-white rounded-2xl p-5 border border-gray-100 text-center card-hover">
                <h4 className="font-bold text-gray-900 mb-2">{r.title}</h4>
                <p className="text-emerald-600 font-bold text-sm">{r.salary}</p>
              </div>
            ))}
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
            <p className="text-gray-900 font-bold">Global Salaries: USA $120K-$250K+ &middot; Europe €70K-€130K+</p>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
            <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla — MLOps AIOps GenAI Trainer" width={300} height={380} className="rounded-3xl shadow-xl w-full object-cover" />
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">Your Instructor</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Rajinikanth Vadla</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
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
                    <div className="text-2xl font-black text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-gray-50">
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
              <div key={faq.q} className="bg-white rounded-2xl p-7 border border-gray-100 card-hover">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5">Transform Your Career in AI/ML</h2>
          <p className="text-lg text-gray-500 mb-10">
            Join 500+ engineers who accelerated their careers. Limited seats per batch for personal attention.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all">
              Enroll Now &mdash; ₹35,000 &rarr;
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all">
              WhatsApp
            </a>
          </div>
          <p className="text-gray-400 text-sm">Free demo class &middot; Reply in 24 hours &middot; No obligation &middot; EMI available</p>
        </div>
      </section>

      <SuccessStories />
    </>
  );
}

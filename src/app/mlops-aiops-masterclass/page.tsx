import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "MLOps & AIOps Masterclass",
  description:
    "Complete MLOps, AIOps, LLMOps, AI Agents training. 12-16 weeks, 200+ hours, hands-on projects. ₹35,000 INR. Course already started - admissions open.",
};

export default function MasterclassPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-6">
            <span className="bg-danger-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse-dot" />
              Course Already Started
            </span>
            <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase">
              Admissions Open
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            MLOps &amp; AIOps Masterclass
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your career with industry-ready <strong>MLOps</strong>, <strong>AIOps</strong>,{" "}
            <strong>LLMOps</strong> &amp; <strong>AI Agent Development</strong> skills.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { label: "4.9/5 Rating", color: "bg-accent-500" },
              { label: "500+ Enrolled", color: "bg-primary-600" },
              { label: "60% Avg Salary Hike", color: "bg-accent-500" },
            ].map((b) => (
              <span key={b.label} className={`${b.color} text-white px-4 py-1.5 rounded-full text-sm font-bold`}>
                {b.label}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { value: "12-16", label: "Weeks" },
              { value: "200+", label: "Hours" },
              { value: "50+", label: "Labs" },
              { value: "4", label: "Projects" },
              { value: "60%", label: "Salary Hike" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl px-5 py-4 shadow-md text-center min-w-[100px]">
                <div className="text-2xl font-black text-primary-600">{s.value}</div>
                <div className="text-xs font-semibold text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-extrabold text-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-600/40 transition-all">
              Join Now &ndash; ₹35,000 INR &rarr;
            </a>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40 transition-all">
              Get Full Syllabus on WhatsApp
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Live Online Classes &middot; Hands-on Labs &middot; 1-on-1 Mentorship &middot; Job Assistance &middot; Lifetime Access
          </p>
        </div>
      </section>

      {/* What You'll Master */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Course Overview" title="What You'll Master" subtitle="Complete lifecycle from experimentation to production AI systems" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🐳", title: "DevOps for ML/AI", desc: "Docker, Kubernetes, CI/CD, Terraform, Ansible - infrastructure for AI workloads.", color: "bg-primary-600" },
              { icon: "🔄", title: "MLOps Pipelines", desc: "End-to-end ML pipelines, MLflow, Kubeflow, model versioning, deployment.", color: "bg-accent-500" },
              { icon: "🧠", title: "LLMOps & RAG", desc: "Deploy LLMs, fine-tuning, RAG systems, vector databases, prompt engineering.", color: "bg-purple-600" },
              { icon: "⚡", title: "AIOps Automation", desc: "Anomaly detection, predictive analytics, self-healing infrastructure.", color: "bg-amber-500" },
              { icon: "🤖", title: "AI Agents", desc: "LangChain, autonomous agents, tool use, multi-agent systems.", color: "bg-danger-500" },
              { icon: "☁️", title: "Multi-Cloud", desc: "AWS SageMaker, Azure ML, GCP Vertex AI - production deployment.", color: "bg-cyan-500" },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center">
                <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-lg mx-auto px-6 text-center">
          <span className="text-accent-400 text-sm font-bold uppercase tracking-widest">Investment</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-10">Course Pricing</h2>
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-5 -right-9 bg-accent-500 text-white px-10 py-1 text-xs font-black rotate-45">
              BEST VALUE
            </div>
            <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Full Course Fee</div>
            <div className="text-white text-6xl font-black mb-8">
              ₹35,000 <span className="text-lg text-gray-400 font-normal">INR</span>
            </div>
            <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
              {["Real-World Training", "Live Interactive Sessions", "Industry-Focused Curriculum", "1-on-1 Mentorship", "Job Assistance & Placement Support", "Lifetime Access to Materials"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-200">
                  <svg className="w-5 h-5 text-accent-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="block w-full bg-primary-600 text-white py-4 rounded-2xl font-extrabold text-lg hover:shadow-xl hover:shadow-primary-600/40 transition-all">
              Enroll Now &ndash; ₹35,000 INR &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Course Modules Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Course Structure" title="What You'll Learn" subtitle="Comprehensive training covering all aspects of MLOps, AIOps, and AI Agents" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { num: "1", title: "DevOps Fundamentals", desc: "Linux, Git, Docker, Kubernetes, CI/CD, Infrastructure as Code, Cloud Computing", color: "bg-primary-600" },
              { num: "2", title: "MLOps Engineering", desc: "ML Pipelines, MLflow, Kubeflow, Model Deployment, Monitoring, CI/CD for ML", color: "bg-accent-500" },
              { num: "3", title: "LLMOps & RAG", desc: "LLM Deployment, Fine-tuning, RAG Systems, Vector Databases, Prompt Engineering", color: "bg-purple-600" },
              { num: "4", title: "AIOps Automation", desc: "Anomaly Detection, Predictive Analytics, Self-Healing Infrastructure, Root Cause Analysis", color: "bg-amber-500" },
              { num: "5", title: "AI Agents", desc: "LangChain, Autonomous Agents, Tool Use, Multi-Agent Systems, Enterprise Deployment", color: "bg-danger-500" },
              { num: "6", title: "Capstone Projects", desc: "4 Real-World Projects: End-to-End MLOps, Production LLM, AIOps System, Enterprise AI Agent", color: "bg-cyan-500" },
            ].map((m) => (
              <div key={m.num} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-12 h-12 ${m.color} text-white rounded-xl flex items-center justify-center font-black text-lg mb-4`}>
                  {m.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center">
            <p className="font-bold text-gray-900 text-lg mb-2">Complete Detailed Syllabus Available on WhatsApp</p>
            <p className="text-gray-500 mb-6">Get the complete module breakdown, topic details, hands-on labs, project descriptions, and session schedule.</p>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all">
              Get Full Syllabus on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Capstone Projects */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Module 6" title="Real-World Capstone Projects" subtitle="Build complete, production-ready systems for your portfolio" light />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "End-to-End MLOps Pipeline", desc: "Build automated ML pipeline with CI/CD, deploy to Kubernetes, implement monitoring and drift detection.", techs: ["Python", "MLflow", "Docker", "Kubernetes", "Jenkins"] },
              { title: "Production LLM Application with RAG", desc: "Fine-tune open-source LLM, build RAG system with vector database, implement prompt management.", techs: ["LangChain", "ChromaDB", "FastAPI", "Docker", "HuggingFace"] },
              { title: "AIOps Monitoring System", desc: "Build anomaly detection system, implement predictive maintenance, create automated remediation workflows.", techs: ["Prometheus", "Grafana", "Python", "Kubernetes", "Scikit-learn"] },
              { title: "Enterprise AI Agent", desc: "Build multi-agent system for business tasks, implement tool integration, create human-in-the-loop workflows.", techs: ["LangChain", "CrewAI", "FastAPI", "PostgreSQL", "Docker"] },
            ].map((p, i) => (
              <div key={p.title} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-600" />
                <h3 className="text-white font-bold text-lg mb-3">Project {i + 1}: {p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.techs.map((t) => (
                    <span key={t} className="bg-primary-600/20 border border-primary-600/30 text-primary-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="What's Included" title="Complete Learning Package" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📹", title: "Live Interactive Classes", desc: "Weekly live sessions with Q&A" },
              { icon: "⏱️", title: "200+ Hours Training", desc: "Comprehensive hands-on learning" },
              { icon: "🔬", title: "50+ Lab Exercises", desc: "Real-world practical labs" },
              { icon: "🏆", title: "4 Capstone Projects", desc: "Portfolio-ready projects" },
              { icon: "👨‍🏫", title: "1-on-1 Mentorship", desc: "Personal guidance sessions" },
              { icon: "📝", title: "Resume Optimization", desc: "LinkedIn & resume review" },
              { icon: "🎯", title: "Interview Prep", desc: "Mock interviews & guidance" },
              { icon: "💼", title: "Job Assistance", desc: "Career support & placement" },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Student Success" title="What Our Students Say" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "This course transformed my career from Data Scientist to MLOps Engineer. The hands-on projects gave me confidence to handle production ML systems. Landed 40% salary hike!", name: "Rahul K.", role: "MLOps Engineer @ Top MNC", initials: "RK" },
              { text: "Best investment I made in 2025. The AI Agents module was amazing - cutting edge content you won't find anywhere else. Got placed as ML Engineer within 2 months!", name: "Priya S.", role: "ML Engineer @ Startup", initials: "PS" },
              { text: "Rajinikanth sir explains complex MLOps concepts so simply. The Kubernetes and Docker sections were game-changers. Now I deploy ML models like a pro!", name: "Amit V.", role: "DevOps → MLOps Engineer", initials: "AV" },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative">
                <div className="absolute top-4 left-6 text-5xl text-primary-600/10 font-serif">&ldquo;</div>
                <div className="relative">
                  <div className="text-amber-400 text-lg mb-3">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-gray-600 text-sm italic leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Career Opportunities" title="Roles You'll Be Ready For" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { role: "MLOps Engineer", salary: "₹12-35 LPA" },
              { role: "ML Engineer", salary: "₹15-40 LPA" },
              { role: "AIOps Engineer", salary: "₹12-30 LPA" },
              { role: "LLM Engineer", salary: "₹20-50+ LPA" },
              { role: "AI Agent Developer", salary: "₹18-45 LPA" },
              { role: "ML Platform Engineer", salary: "₹18-40 LPA" },
              { role: "SRE (ML Focus)", salary: "₹15-35 LPA" },
              { role: "DevOps (AI/ML)", salary: "₹12-30 LPA" },
            ].map((r) => (
              <div key={r.role} className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center shadow-sm">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{r.role}</h4>
                <p className="text-accent-500 font-bold text-sm">{r.salary}</p>
              </div>
            ))}
          </div>
          <div className="bg-accent-50 border-2 border-accent-500 rounded-2xl p-6 text-center">
            <p className="font-bold text-gray-900">
              Global Salaries: USA: $120K-$200K+ &nbsp;|&nbsp; Europe: €70K-€120K+
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Transform Your Career in AI/ML Engineering!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join 500+ engineers who have accelerated their careers.{" "}
            <strong className="text-danger-500">Course Already Started &mdash; Admissions Open!</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-extrabold text-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
              Join Now &ndash; ₹35,000 INR &rarr;
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
              WhatsApp
            </a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="bg-danger-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
              YouTube
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Free Demo Class &middot; Reply in 24 Hours &middot; No Obligation &middot; Flexible Timings &middot; EMI Available
          </p>
        </div>
      </section>

      <SuccessStories />
    </>
  );
}

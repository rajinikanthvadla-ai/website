import type { Metadata } from "next";
import Link from "next/link";
import { LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Student Guide | MLOps Course for Beginners | Learn Production ML",
  description:
    "Complete guide for students: what is MLOps, why learn it, career paths, and how to join Rajinikanth Vadla's live MLOps course. ₹40K live or ₹30K recordings.",
  keywords: [
    "MLOps for students",
    "learn MLOps from scratch",
    "MLOps beginner guide",
    "why learn MLOps",
    "MLOps career",
    "production ML course",
    "ML engineer course",
    "DevOps for ML engineers",
    "student MLOps training",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/student-guide/" },
};

export default function StudentGuidePage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            MLOps Student Guide
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Everything you need to know about learning MLOps, building production AI systems, and launching your career.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* What is MLOps */}
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">What is MLOps?</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>MLOps</strong> (Machine Learning Operations) is the practice of building, deploying, monitoring, and maintaining ML models in production. It bridges the gap between data science and software engineering.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Think of it like this:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>📊 <strong>Data Scientists</strong> build models in notebooks</li>
                <li>🔧 <strong>MLOps Engineers</strong> deploy those models to production</li>
                <li>📈 <strong>MLOps</strong> ensures models stay accurate over time</li>
              </ul>
            </div>
          </div>

          {/* Why Learn MLOps */}
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Why Learn MLOps in 2026?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "High Demand", desc: "Companies need MLOps engineers to ship AI at scale" },
                { title: "High Salary", desc: "₹15-50 LPA in India, $150K-$300K+ in USA" },
                { title: "Future-Proof", desc: "AI adoption is accelerating; MLOps is core infrastructure" },
                { title: "Practical Skills", desc: "Learn production tools companies actually use" },
                { title: "Career Transitions", desc: "Perfect path from DevOps, Data Science, or Engineering" },
                { title: "Portfolio Projects", desc: "Build real systems you can show employers" },
              ].map((item) => (
                <div key={item.title} className="panel p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Learn */}
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">What You'll Learn in the Masterclass</h2>
            <div className="space-y-4">
              {[
                { module: "Module 1", title: "DevOps Fundamentals", topics: "Docker, Kubernetes, CI/CD, Linux" },
                { module: "Module 2", title: "MLOps Pipelines", topics: "MLflow, DVC, experiment tracking, model versioning" },
                { module: "Module 3", title: "LLMOps & GenAI", topics: "Deploy LLMs, fine-tuning, RAG, vector databases" },
                { module: "Module 4", title: "AIOps", topics: "Monitoring, anomaly detection, self-healing infrastructure" },
                { module: "Module 5", title: "AI Agents", topics: "LangChain, CrewAI, MCP, multi-agent systems" },
                { module: "Module 6", title: "Capstone Projects", topics: "Build 4 production-ready systems" },
              ].map((item) => (
                <div key={item.module} className="panel p-6 border-l-4 border-l-blue-600">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold text-sm shrink-0">
                      {item.module}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.topics}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Options */}
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Which Option Is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="panel p-8 border-l-4 border-l-blue-700">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Live Cohort ₹40K</h3>
                <p className="text-slate-600 text-sm mb-4">Choose this if you want:</p>
                <ul className="space-y-2 text-slate-600 text-sm mb-6">
                  <li>✓ Direct access to instructor</li>
                  <li>✓ Structured 4–5 month schedule</li>
                  <li>✓ Peer learning with cohort</li>
                  <li>✓ Weekly live sessions</li>
                  <li>✓ Career guidance & support</li>
                </ul>
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg text-center">
                  Join Cohort on WhatsApp
                </a>
              </div>

              <div className="panel p-8 border-l-4 border-l-slate-400">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Recordings ₹30K</h3>
                <p className="text-slate-600 text-sm mb-4">Choose this if you want:</p>
                <ul className="space-y-2 text-slate-600 text-sm mb-6">
                  <li>✓ Learn at your own pace</li>
                  <li>✓ Lifetime access to videos</li>
                  <li>✓ Lower investment</li>
                  <li>✓ No time commitment</li>
                  <li>✓ Rewatch anytime, anywhere</li>
                </ul>
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg text-center">
                  Buy Recordings on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Career Paths */}
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Career Paths After the Course</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { role: "MLOps Engineer", salary: "₹12-40 LPA", desc: "Build and maintain ML pipelines at companies" },
                { role: "Platform Engineer", salary: "₹15-50 LPA", desc: "Design ML infrastructure for enterprises" },
                { role: "LLM / GenAI Engineer", salary: "₹20-50+ LPA", desc: "Deploy and fine-tune large language models" },
                { role: "DevOps Engineer (ML)", salary: "₹10-30 LPA", desc: "Specialize in ML-focused infrastructure" },
              ].map((item) => (
                <div key={item.role} className="panel p-6">
                  <h3 className="font-bold text-slate-900 mb-1">{item.role}</h3>
                  <p className="text-orange-600 font-semibold text-sm mb-2">{item.salary}</p>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Student FAQ</h2>
            <div className="space-y-4">
              {[
                { q: "Do I need ML experience?", a: "No. The course starts with DevOps fundamentals and builds up. But familiarity with Python helps." },
                { q: "Can I do this while working?", a: "Yes. The live cohort runs Mon–Fri, 8:00–9:45 PM IST (evening). Or choose recordings and study at your pace." },
                { q: "What if I can't finish?", a: "You keep lifetime access to recordings. Pause and resume whenever you want." },
                { q: "Will I get a job?", a: "We provide interview prep and connect you with companies. Your portfolio projects are your best job asset." },
                { q: "Is this for freshers only?", a: "No. The course is designed for career changers, DevOps engineers moving to MLOps, and anyone learning production AI." },
              ].map((faq) => (
                <details key={faq.q} className="panel p-6 cursor-pointer group">
                  <summary className="font-bold text-slate-900 flex justify-between items-center">
                    {faq.q}
                    <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-slate-600 text-sm mt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-10 text-white text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Your MLOps Journey?</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Classes are running now. Join other students learning production ML and building AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/enroll" className="bg-white text-blue-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-bold transition-colors">
                View Pricing
              </a>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-bold transition-colors">
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

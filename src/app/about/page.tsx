import type { Metadata } from "next";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "About Rajinikanth Vadla",
  description:
    "Learn about Rajinikanth Vadla - AIOps, MLOps, DevOps Expert with 7+ years experience. Passionate mentor who has trained 500+ engineers.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-24 overflow-hidden">
        <div className="orb orb-1" style={{ opacity: 0.15 }} />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.15em] text-primary-600 mb-3">Get to know me</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5">About Me</h1>
          <p className="text-lg text-gray-600">
            Passionate about transforming careers through real-world AI/ML training
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-primary-400/20 via-purple-400/20 to-accent-400/20 rounded-[2rem] blur-2xl" />
                <Image
                  src="/assets/pic-1.png"
                  alt="Rajinikanth Vadla"
                  width={380}
                  height={480}
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold gradient-text mb-5">Who I Am</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                I&apos;m Rajinikanth Vadla &mdash; an AI/ML Operations Engineer, Cloud Architect, and passionate mentor with over
                7+ years of hands-on experience in enterprise technology.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                My real passion? Teaching. I believe everyone deserves access to quality, real-world training. That&apos;s
                why I created comprehensive programs that bridge the gap between theory and production.
              </p>

              <h2 className="text-2xl font-extrabold gradient-text mb-5">My Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                To create the training I wished I had when I started my career. No fluff, no outdated tutorials &mdash;
                just real-world skills that get you hired and make you excel.
              </p>

              <h2 className="text-2xl font-extrabold gradient-text mb-5">What Makes Me Different</h2>
              <ul className="space-y-3 mb-10">
                {[
                  "I teach from real production experience, not just textbooks",
                  "Every concept is backed by hands-on labs and projects",
                  "Personal mentorship — I know every student by name",
                  "Lifetime support even after course completion",
                  "Interview preparation and job placement assistance",
                  "Small batch sizes for maximum attention",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-lg">
                    <span className="w-6 h-6 rounded-full bg-accent-500/10 flex items-center justify-center mt-0.5 shrink-0">
                      <svg className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-extrabold gradient-text mb-5">Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
                {["AIOps", "MLOps", "DevOps", "Kubernetes", "Docker", "AWS", "Azure", "GCP", "Terraform", "AI Agents", "LangChain", "GenAI", "CI/CD", "MLflow", "Kubeflow", "Python"].map((skill) => (
                  <div key={skill} className="glass rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:border-primary-500 hover:-translate-y-0.5 transition-all cursor-default">
                    {skill}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-extrabold gradient-text mb-5">Enterprise Experience</h2>
              <ul className="space-y-3">
                {[
                  "Production ML systems serving millions of predictions",
                  "Multi-cloud infrastructure (AWS, Azure, GCP)",
                  "Kubernetes clusters at enterprise scale",
                  "CI/CD pipelines for ML model deployment",
                  "AI-powered monitoring and self-healing systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-lg">
                    <span className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center mt-0.5 shrink-0">
                      <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Ready to Learn From Experience?" subtitle="Join 500+ engineers who accelerated their careers with real-world training." />
      <SuccessStories />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "About",
  description:
    "MLOps, AIOps and GenAI practitioner and mentor. 7+ years in production, 500+ engineers trained. Online mentorship open worldwide.",
  alternates: { canonical: "https://www.rajinikanthvadla.com/about/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">Background</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">About me</h1>
          <p className="text-lg text-stone-600">
            Practical training and mentorship from someone who still cares about the craft of running systems. People
            from many countries book time for career direction as well as technical depth.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="panel p-2">
                <Image
                  src="/assets/pic-1.png"
                  alt="Rajinikanth Vadla"
                  width={380}
                  height={480}
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Who I am</h2>
              <p className="text-stone-600 leading-relaxed text-lg mb-4">
                I&apos;m Rajinikanth Vadla, an AI/ML Operations Engineer, Cloud Architect, and passionate mentor with over
                7+ years of hands-on experience in enterprise technology.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg mb-10">
                My real passion? Teaching. I believe everyone deserves access to quality, real-world training. That&apos;s
                why I created comprehensive programs that bridge the gap between theory and production.
              </p>

              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">My mission</h2>
              <p className="text-stone-600 leading-relaxed text-lg mb-10">
                To create the training I wished I had when I started my career. No fluff, no outdated tutorials.
                Just real-world skills that get you hired and make you excel.
              </p>

              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">What makes this different</h2>
              <ul className="space-y-3 mb-10">
                {[
                  "I teach from real production experience, not just textbooks",
                  "Every concept is backed by hands-on labs and projects",
                  "Personal mentorship. I know every student by name",
                  "Lifetime support even after course completion",
                  "Interview preparation and job placement assistance",
                  "Small batch sizes for maximum attention",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-600 text-lg">
                    <span className="w-6 h-6 border border-accent-200 bg-accent-50 flex items-center justify-center mt-0.5 shrink-0 text-accent-700 text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
                {["AIOps", "MLOps", "DevOps", "Kubernetes", "Docker", "AWS", "Azure", "GCP", "Terraform", "AI Agents", "LangChain", "GenAI", "CI/CD", "MLflow", "Kubeflow", "Python"].map((skill) => (
                  <div key={skill} className="panel px-3 py-2.5 text-center text-sm font-medium text-stone-700 cursor-default">
                    {skill}
                  </div>
                ))}
              </div>

              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Enterprise experience</h2>
              <ul className="space-y-3">
                {[
                  "Production ML systems serving millions of predictions",
                  "Multi-cloud infrastructure (AWS, Azure, GCP)",
                  "Kubernetes clusters at enterprise scale",
                  "CI/CD pipelines for ML model deployment",
                  "AI-powered monitoring and self-healing systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-600 text-lg">
                    <span className="w-6 h-6 border border-stone-300 bg-stone-50 flex items-center justify-center mt-0.5 shrink-0 text-stone-600 text-xs font-bold">✓</span>
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

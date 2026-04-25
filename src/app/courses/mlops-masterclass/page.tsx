import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise MLOps Training Program",
  description:
    "Enterprise MLOps training with production CI/CD, model governance, Kubernetes delivery patterns, and interview-ready projects.",
  alternates: { canonical: "https://www.rajinikanthvadla.com/courses/mlops-masterclass/" },
};

export default function EnterpriseMLOpsCoursePage() {
  return (
    <>
      <section className="border-b border-stone-200 bg-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">Enterprise MLOps training</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">MLOps Masterclass for production systems</h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            This track is designed for engineers moving from experimentation to enterprise delivery: reproducible pipelines,
            infra as code, model release controls, and observability that stands up in audits.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <article className="panel p-7">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Curriculum highlights</h2>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• ML CI/CD with GitHub Actions, Jenkins, and release gates</li>
              <li>• Feature, model, and artifact lifecycle management</li>
              <li>• Kubernetes deployment strategies for online/offline inference</li>
              <li>• Model observability, drift analysis, and rollback policy</li>
              <li>• Security, compliance, and platform handoff practices</li>
            </ul>
          </article>
          <article className="panel p-7">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Who this is for</h2>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• DevOps engineers transitioning into MLOps roles</li>
              <li>• ML engineers needing stronger platform-depth</li>
              <li>• SREs supporting model serving in production</li>
              <li>• Teams standardizing enterprise AI deployment</li>
            </ul>
            <Link href="/mlops-aiops-masterclass" className="inline-block mt-6 bg-stone-900 text-white px-6 py-3 text-sm font-semibold hover:bg-stone-800">
              View full masterclass details →
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}

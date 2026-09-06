import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PlaygroundView from "@/components/python-course/PlaygroundView";
import { SITE } from "@/lib/constants";
import { PYTHON_LESSONS } from "@/lib/python-course";

const CANONICAL = `${SITE.url}/python-course/playground/`;

export const metadata: Metadata = {
  title: "Online Python Compiler — Run Python in Your Browser",
  description:
    "Free online Python compiler. Run real CPython in your browser with NumPy and pandas support. No signup, no installation, save drafts and share links.",
  keywords: [
    "online python compiler",
    "run python in browser",
    "python playground",
    "free python editor online",
    "python compiler with numpy",
    "practice python online",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Online Python Compiler — Run Python in Your Browser",
    description:
      "Free browser-based Python compiler with NumPy and pandas, plus AI/ML example programs.",
    url: CANONICAL,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PythonPlaygroundPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Online Python Compiler",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (web browser)",
    url: CANONICAL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Browser-based Python compiler running CPython in WebAssembly, with NumPy and pandas available on demand.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto px-6 py-16 text-slate-500 font-mono text-sm">
            Loading playground...
          </div>
        }
      >
        <PlaygroundView />
      </Suspense>

      <section className="border-t-2 border-slate-900 bg-slate-50 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Learn while you experiment</h2>
          <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
            The playground is the same compiler used throughout the free Python course. Each lesson explains a
            concept, shows real-time examples, and lets you run code in the page.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/python-course/" className="notion-btn notion-btn--ink">
              Course home
            </Link>
            <Link href="/python-course/challenge/" className="notion-btn notion-btn--accent">
              Daily challenge
            </Link>
            {PYTHON_LESSONS.slice(0, 4).map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/python-course/${lesson.slug}/`}
                className="text-sm font-semibold bg-white border-2 border-slate-900 px-4 py-2 rounded-lg shadow-[2px_2px_0_#0f172a] hover:bg-blue-50"
              >
                {lesson.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  PRACTICE_TOPICS,
  PYTHON_LESSONS,
  PYTHON_MODULES,
  TOTAL_CODE_EXAMPLES,
  TOTAL_COURSE_MINUTES,
  getChallengeForDate,
  lessonsInModule,
} from "@/lib/python-course";
import { SITE } from "@/lib/constants";
import CTASection from "@/components/CTASection";
import ContinueLearning from "@/components/python-course/ContinueLearning";
import DailyChallenge from "@/components/python-course/DailyChallenge";

const CANONICAL = `${SITE.url}/python-course/`;
const todaysChallenge = getChallengeForDate();

export const metadata: Metadata = {
  title: "Free Python Course for AI, ML and GenAI Engineers — With Online Compiler",
  description:
    "Complete free Python course from scratch to advanced for AI/ML and GenAI engineers. Clear explanations, real-time code examples, daily challenges, downloadable certificate with your name, and a built-in online Python compiler.",
  keywords: [
    "free python course",
    "python for AI ML engineers",
    "python for generative AI",
    "python online compiler",
    "learn python from scratch",
    "python course with examples",
    "python for machine learning",
    "python for LLM engineers",
    "run python in browser",
    "python tutorial for beginners to advanced",
    "daily python challenge",
    "free python course certificate",
    "python certificate download",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Free Python Course for AI, ML and GenAI Engineers",
    description:
      "From variables to RAG pipelines and FastAPI serving. Real-time examples, daily practice, plus an in-browser Python compiler.",
    url: CANONICAL,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    q: "Can I get a certificate?",
    a: "Yes. After you mark Module 1 lessons done, unlock the Foundations certificate. Finish all lessons for the full-course certificate. Enter your name and download a PNG with the instructor signature. Progress is stored in your browser on this device.",
  },
  {
    q: "Is this Python course really free?",
    a: "Yes. Every lesson, code example, daily challenge, certificate download, and the in-browser compiler are free to use with no signup. Paid live cohorts on MLOps, AIOps, and AI automation are separate programs.",
  },
  {
    q: "Do I need to install Python to follow along?",
    a: "No. Every lesson can be completed on this website with the browser compiler. The course also explains how production projects use packages and environments, but no setup is required to learn here.",
  },
  {
    q: "Is this suitable for complete beginners?",
    a: "Yes. Module 1 starts from what a variable is. If you already write Python, skip to Module 3 for NumPy, pandas, statistics, and scikit-learn, or Module 4 for async, LLM APIs, RAG, and FastAPI. Module 5 is a reference you can come back to.",
  },
  {
    q: "Which libraries can I run in the browser compiler?",
    a: "The browser supports the Python standard library, SQLite, NumPy, pandas, scikit-learn, and Matplotlib. Advanced PyTorch, FastAPI, and LLM lessons use clear browser-safe simulations, so you can complete their learning goals without leaving the site.",
  },
  {
    q: "How long does the course take?",
    a: `About ${Math.round(TOTAL_COURSE_MINUTES / 60)} hours of reading and running examples across ${PYTHON_LESSONS.length} lessons. Most people spread it over two to four weeks alongside a job.`,
  },
  {
    q: "What should I learn after this course?",
    a: "Docker and Git, then a cloud platform, then the MLOps and LLMOps stack: MLflow, Kubernetes, vector databases, LangChain, and evaluation. The roadmaps on this site lay out the order.",
  },
];

const AUDIENCE = [
  {
    title: "Complete beginners",
    body: "You have never written code. Module 1 assumes nothing and explains every term the first time it appears.",
  },
  {
    title: "Career switchers",
    body: "You come from support, testing, data entry, or another engineering field and need Python that stands up in an interview.",
  },
  {
    title: "DevOps and cloud engineers",
    body: "You know infrastructure and want the Python that MLOps and LLMOps roles actually ask for.",
  },
  {
    title: "AI and GenAI engineers",
    body: "You can already code but want the production side: async batching, structured output, RAG internals, and serving.",
  },
];

export default function PythonCoursePage() {
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Free Python Course for AI, ML and GenAI Engineers",
    description:
      "Complete Python course from scratch to advanced for AI/ML and GenAI engineers, with real-time code examples and a built-in browser compiler.",
    provider: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
      url: SITE.url,
    },
    url: CANONICAL,
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: PYTHON_LESSONS.map((lesson) => lesson.title),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.round(TOTAL_COURSE_MINUTES / 60)}H`,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="border-b-2 border-slate-900 bg-[#fdfcf8] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
            <div>
              <span className="notion-eyebrow">
                <span className="notion-eyebrow-dot" />
                Free · No signup · Runs in your browser
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                Learn Python the easy way for AI, ML and GenAI
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Short lessons, tiny examples, and a live editor in the browser. First learn the idea, then see the
                same idea in AI / ML code.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Learn without hassle. Everything you need to finish the course is available on this website.
              </p>

              <div className="mb-8">
                <ContinueLearning />
              </div>

              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: String(PYTHON_LESSONS.length), label: "Lessons" },
                  { value: `${TOTAL_CODE_EXAMPLES}+`, label: "Code examples" },
                  { value: `${Math.round(TOTAL_COURSE_MINUTES / 60)}h`, label: "Reading time" },
                  { value: "₹0", label: "Cost" },
                ].map((stat) => (
                  <div key={stat.label} className="border-2 border-slate-900 rounded-lg p-3 bg-white">
                    <dt className="font-display text-2xl font-bold text-slate-900">{stat.value}</dt>
                    <dd className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-2 border-slate-900 rounded-lg bg-white shadow-[6px_6px_0_#0f172a] overflow-hidden">
              <div className="bg-slate-900 px-4 py-2.5">
                <p className="text-xs font-bold uppercase tracking-wide text-white">What is inside</p>
              </div>
              <ul className="divide-y divide-slate-200">
                {[
                  "Short basics: clear text + tiny code",
                  "Then AI / ML examples for the same idea",
                  "Live Try it editor on every lesson",
                  "NumPy, pandas, and charts in the browser",
                  "Daily challenge + downloadable certificate",
                  "Beginner to advanced in one clear path",
                ].map((item) => (
                  <li key={item} className="px-4 py-3 text-sm text-slate-700 flex gap-2.5">
                    <span className="text-blue-700 font-bold shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b-2 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="notion-eyebrow">
                <span className="notion-eyebrow-dot" />
                Come back every day
              </span>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
                Today&apos;s 5-minute challenge
              </h2>
              <p className="text-slate-600 max-w-2xl leading-relaxed">
                One small practice for everyone today: {todaysChallenge.title}. No signup. Your mark-done status
                stays on this device.
              </p>
            </div>
            <Link href="/python-course/challenge/" className="notion-btn notion-btn--ink">
              Open challenge page
            </Link>
          </div>
          <DailyChallenge challenge={todaysChallenge} compact />
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#ecfdf5] border-b-2 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <span className="notion-eyebrow">
                <span className="notion-eyebrow-dot" />
                Finish and prove it
              </span>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
                Download your certificate with your name
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4 max-w-2xl">
                Complete Module 1 for a Foundations certificate, or finish the full course for the complete
                certificate. Enter your name and download a PNG signed by Rajinikanth Vadla - ready for LinkedIn
                or your resume.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-6">
                <li>+ Your name printed on the certificate</li>
                <li>+ Instructor signature and photo</li>
                <li>+ Unique certificate ID</li>
                <li>+ Works on GitHub Pages (saved in your browser)</li>
              </ul>
              <Link href="/python-course/certificate/" className="notion-btn notion-btn--ink">
                Open certificate page &rarr;
              </Link>
            </div>
            <div className="border-2 border-slate-900 rounded-xl bg-white p-5 shadow-[4px_4px_0_#0f172a]">
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 mb-2">
                How students unlock it
              </p>
              <ol className="space-y-3 text-sm text-slate-700 leading-6">
                <li>
                  <span className="font-bold text-slate-900">1.</span> Learn a lesson and run the tiny examples
                </li>
                <li>
                  <span className="font-bold text-slate-900">2.</span> Press Mark lesson done (or Next lesson)
                </li>
                <li>
                  <span className="font-bold text-slate-900">3.</span> Finish Module 1 or the full course
                </li>
                <li>
                  <span className="font-bold text-slate-900">4.</span> Enter your name and download the PNG
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-slate-50 border-b-2 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <span className="notion-eyebrow">
              <span className="notion-eyebrow-dot" />
              Easy topic starts
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Jump in by topic
            </h2>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              Short landing pages for common searches. Each one opens the matching lesson with the live compiler.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRACTICE_TOPICS.map((topic) => (
              <Link
                key={topic.slug}
                href={`/python-course/learn/${topic.slug}/`}
                className="rounded-xl border-2 border-slate-900 bg-white p-4 hover:bg-[#fef9c3] transition-colors"
              >
                <p className="font-bold text-slate-900 leading-snug mb-1">{topic.title}</p>
                <p className="text-sm text-slate-600 leading-6 line-clamp-3">{topic.starterIdea}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b-2 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <span className="notion-eyebrow">
              <span className="notion-eyebrow-dot" />
              Curriculum
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {PYTHON_MODULES.length} modules, {PYTHON_LESSONS.length} lessons, in order
            </h2>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              Follow it top to bottom if you are new. If you already write Python, jump into Module 3 or 4.
            </p>
          </div>

          <div className="space-y-8">
            {PYTHON_MODULES.map((mod) => {
              const lessons = lessonsInModule(PYTHON_LESSONS, mod.id);
              const minutes = lessons.reduce((sum, l) => sum + l.minutes, 0);
              return (
                <div key={mod.id} className="border-2 border-slate-900 rounded-lg overflow-hidden bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-50 border-b-2 border-slate-900">
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">{mod.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{mod.tagline}</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide bg-slate-900 text-white px-2.5 py-1 rounded shrink-0">
                      {lessons.length} lessons · {minutes} min
                    </span>
                  </div>
                  <ol className="divide-y divide-slate-200">
                    {lessons.map((lesson, index) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/python-course/${lesson.slug}/`}
                          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-4 hover:bg-[#fef9c3] transition-colors group"
                        >
                          <span className="font-mono text-xs text-slate-400 w-6 shrink-0">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1">
                            <span className="block font-bold text-slate-900 group-hover:text-blue-700">
                              {lesson.title}
                            </span>
                            <span className="block text-sm text-slate-600 mt-0.5">{lesson.summary}</span>
                          </span>
                          <span className="text-xs font-bold text-slate-500 shrink-0">{lesson.minutes} min</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-b-2 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Who this is for</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            The same path works whether you are starting from nothing or filling gaps before an AI role.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUDIENCE.map((item) => (
              <div key={item.title} className="panel p-5">
                <h3 className="font-display font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b-2 border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">How the compiler works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The compiler is CPython compiled to WebAssembly, running inside your browser tab. Your code never
            leaves your machine, there is no account, and there is no server to rate-limit you.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Works offline after load", body: "The runtime downloads once, then stays cached in the browser." },
              { title: "Standard library included", body: "json, pathlib, dataclasses, asyncio, logging, itertools and more." },
              { title: "NumPy and pandas", body: "Loaded on demand in the lessons that need them." },
            ].map((item) => (
              <div key={item.title} className="border-2 border-slate-900 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-l-orange-500 bg-[#fff7ed] border border-slate-200 rounded-r-lg p-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Limits worth knowing:</strong> no <code className="font-mono">input()</code>, no network calls,
              no GPU, and runs stop after 20 seconds. Lessons that need PyTorch, FastAPI, or an LLM SDK give you a
              complete file to run on your own machine.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-b-2 border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="panel group">
                <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-display font-bold text-slate-900 leading-snug hover:text-blue-700 transition-colors">
                  {faq.q}
                  <span className="text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 -mt-1 border-t-2 border-dashed border-slate-200 pt-4">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-b-2 border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Where to go after Python</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Python is stage one. These free guides lay out the rest of the path into AI engineering roles.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/roadmap/ai-ml-engineer/", label: "AI/ML Engineer roadmap" },
              { href: "/roadmap/mlops-engineer/", label: "MLOps Engineer roadmap" },
              { href: "/roadmap/llmops-engineer/", label: "LLMOps Engineer roadmap" },
              { href: "/skills/python/", label: "Python skill guide" },
              { href: "/skills/fastapi/", label: "FastAPI" },
              { href: "/skills/rag/", label: "RAG" },
              { href: "/universe/", label: "AI Engineering Universe" },
              { href: "/courses/", label: "Live cohorts" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold bg-white border-2 border-slate-900 px-4 py-2 rounded-lg shadow-[2px_2px_0_#0f172a] hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want the same depth on MLOps, LLMOps and AI agents?"
        subtitle="This Python course is free forever. The live cohorts take you from Python into production ML and GenAI systems with mentorship and job support."
      />
    </>
  );
}

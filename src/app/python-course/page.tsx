import type { Metadata } from "next";
import Link from "next/link";
import {
  PRACTICE_TOPICS,
  PROJECT_LESSONS,
  PYTHON_LESSONS,
  PYTHON_MODULES,
  PYTHON_OUTLINE,
  TOTAL_COURSE_MINUTES,
  getChallengeForDate,
} from "@/lib/python-course";
import { SITE } from "@/lib/constants";
import CTASection from "@/components/CTASection";
import ContinueLearning from "@/components/python-course/ContinueLearning";
import Curriculum from "@/components/python-course/Curriculum";
import DailyChallenge from "@/components/python-course/DailyChallenge";
import TryHello from "@/components/python-course/TryHello";
import { SketchCard } from "@/components/python-course/sketches";
import { MODULE_SHORT_LABEL } from "@/lib/python-course/labels";
import { moduleCards } from "@/lib/python-course/memory";

const CANONICAL = `${SITE.url}/python-course/`;
const todaysChallenge = getChallengeForDate();

export const metadata: Metadata = {
  title: "Free Python Course for AI, ML and GenAI",
  description:
    `Free Python course by trainer Rajinikanth Vadla for AI, ML and GenAI engineers. ${PYTHON_LESSONS.length} lessons with auto-checked exercises, ${PROJECT_LESSONS.length} GitHub projects, your first real AI call, a browser compiler and a certificate.`,
  keywords: [
    "Rajinikanth Vadla",
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
    "python projects for beginners",
    "python exercises with answers",
    "run llm locally with python",
    "python certificate download",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Free Python Course for AI, ML and GenAI | Rajinikanth Vadla",
    description:
      "From variables to a RAG bot. Exercises that check your answers, 4 projects for GitHub, and your first real AI call. By Rajinikanth Vadla.",
    url: CANONICAL,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    q: "Can I get a certificate?",
    a: "Yes. Every lesson ends with a short exercise that checks your answer automatically. Pass every Module 1 exercise (including its project) for the Foundations certificate, or every lesson for the full-course certificate. Enter your name and download a PNG with the instructor signature. Progress is stored in your browser on this device.",
  },
  {
    q: "Is this Python course really free?",
    a: "Yes. Every lesson, code example, daily challenge, certificate download, and the in-browser compiler are free to use with no signup. Paid live cohorts on MLOps, AIOps, and AI automation are separate programs.",
  },
  {
    q: "Do I need to install Python to follow along?",
    a: "Not to learn. Every lesson and exercise runs in your browser. The projects, the first real AI call, and the PyTorch and FastAPI lessons also give you complete files and steps to run on your own laptop, because employers expect you to know how.",
  },
  {
    q: "Is this suitable for complete beginners?",
    a: "Yes. Module 1 starts from what a variable is. If you already write Python, skip to Module 3 for NumPy, pandas, statistics, and scikit-learn, or Module 4 for async, LLM APIs, RAG, and FastAPI. Module 5 is a reference you can come back to.",
  },
  {
    q: "Which libraries can I run in the browser compiler?",
    a: "The browser supports the Python standard library, SQLite, NumPy, pandas, scikit-learn, and Matplotlib. PyTorch, FastAPI and real AI model calls cannot run in a browser tab, so those lessons give you a browser-safe version to practise here, plus a complete file and setup steps for your laptop.",
  },
  {
    q: "What projects will I build?",
    a: "Four, one at the end of each main module: a review sentiment checker, an ML experiment tracker (a mini MLflow), a spam message classifier with scikit-learn, and a bot that answers questions from your own notes using a free AI model on your laptop. Each one comes with a README and steps to put it on GitHub.",
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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Free Python course", item: CANONICAL },
    ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="border-b-2 border-slate-900 bg-[#fdfcf8] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <span className="notion-eyebrow">
                <span className="notion-eyebrow-dot" />
                Start here · Free · Nothing to install
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                Learn Python the easy way for AI, ML and GenAI
              </h1>
              <p className="text-lg text-slate-800 leading-relaxed mb-3">
                Python is a programming language. You write short instructions, and the computer follows them from
                top to bottom. AI and ML teams use it to clean data, check scores, and call models.
              </p>
              <div className="my-4 lg:hidden">
                <SketchCard
                  kind="model"
                  title="Rows of data flowing into a model, then a keep decision"
                  caption="This is the shape of the course: plain Python first, then data flowing into a model."
                />
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                Short lessons and a live editor in the browser, taught by Rajinikanth Vadla. Every lesson ends with
                an exercise that checks your answer. Then build {PROJECT_LESSONS.length} projects for your GitHub
                and make your first real AI call on your own laptop, for free.
              </p>
              <ContinueLearning outline={PYTHON_OUTLINE} />
            </div>
            <div className="hidden lg:block">
              <SketchCard
                kind="model"
                title="Rows of data flowing into a model, then a keep decision"
                caption="This is the shape of the course: plain Python first, then data flowing into a model."
              />
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: String(PYTHON_LESSONS.length), label: "Short lessons" },
              { value: String(PROJECT_LESSONS.length), label: "Projects" },
              { value: `${Math.round(TOTAL_COURSE_MINUTES / 60)}h`, label: "At your pace" },
              { value: "₹0", label: "Cost" },
            ].map((stat) => (
              <div key={stat.label} className="border-2 border-slate-900 rounded-lg p-3 bg-white">
                <dt className="font-display text-2xl font-bold text-slate-900">{stat.value}</dt>
                <dd className="text-xs font-bold uppercase tracking-wide text-slate-600 mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-b-2 border-slate-900" aria-labelledby="start-path">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="start-path" className="font-display text-3xl font-bold text-slate-900 mb-2">
            Three steps, then lesson 1
          </h2>
          <p className="text-slate-700 max-w-2xl leading-relaxed mb-6">
            Read this once. Then open Python Intro. Every lesson has a picture you can step through, and a few easy
            questions. Progress stays in this browser.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            <article className="flex flex-col gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">1. What Python is</h3>
                <p className="text-sm text-slate-700 leading-6 mt-1">
                  A variable is a labeled box. A list is a tray. A loop walks the tray. A function is a small machine.
                  That is the whole start.
                </p>
              </div>
              <div className="mt-auto">
                <SketchCard
                  kind="variables"
                  title="Three labeled boxes: name, score, and ready"
                  caption="Boxes first. The rest of Python is boxes, trays, and machines."
                />
              </div>
            </article>
            <article className="flex flex-col gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">2. Why it matters for AI</h3>
                <p className="text-sm text-slate-700 leading-6 mt-1">
                  Models do not read your mind. You clean a list of scores, average them, and decide what to keep.
                  Python is how that work gets written.
                </p>
              </div>
              <div className="mt-auto">
                <SketchCard
                  kind="function"
                  title="Scores going into an average function and a number coming out"
                  caption="A first ML habit: turn a tray of scores into one number."
                />
              </div>
            </article>
            <article className="flex flex-col gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">3. Setup in plain words</h3>
                <p className="text-sm text-slate-700 leading-6 mt-1">
                  Zero install: open a lesson and press Run. Python downloads into the browser once. Your code stays
                  on this device. Laptop commands appear later, beside the projects. Skip them until you want them.
                </p>
              </div>
              <div className="mt-auto">
                <SketchCard
                  kind="browser"
                  title="A browser window with a print statement and a Run button"
                  caption="No installer. No account. Press Run when you are ready."
                />
              </div>
            </article>
          </div>
          <div className="mt-6 max-w-3xl">
            <TryHello />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b-2 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <span className="notion-eyebrow">
              <span className="notion-eyebrow-dot" />
              Curriculum
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {PYTHON_MODULES.length} modules, {PYTHON_LESSONS.length} lessons, in order
            </h2>
            <p className="text-slate-700 max-w-2xl leading-relaxed">
              New here? Stay in Module 1. It is open below. If you already write Python, open Module 3 or 4.
              A tick appears when a lesson is saved on this device.
            </p>
          </div>
          <Curriculum
            modules={PYTHON_MODULES}
            lessons={PYTHON_LESSONS.map(({ slug, title, summary, minutes, moduleId, kind }) => ({
              slug,
              title,
              summary,
              minutes,
              moduleId,
              kind,
            }))}
          />
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b-2 border-slate-900" aria-labelledby="module-recap">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="module-recap" className="font-display text-3xl font-bold text-slate-900 mb-2">
            A few cards to keep
          </h2>
          <p className="text-slate-700 max-w-2xl leading-relaxed mb-6">
            One minute per module. Open a card. The answer is one line.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {PYTHON_MODULES.map((mod) => (
              <article key={mod.id} className="border-2 border-slate-900 rounded-lg bg-[#fffef8] p-4">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{MODULE_SHORT_LABEL[mod.id]}</h3>
                <div className="space-y-2">
                  {moduleCards(mod.id).map((card) => (
                    <details key={card.prompt} className="border-2 border-slate-900 rounded-lg bg-white px-3 py-2">
                      <summary className="cursor-pointer font-semibold text-slate-900">{card.prompt}</summary>
                      <p className="mt-2 text-[15px] text-slate-700 leading-6">{card.answer}</p>
                    </details>
                  ))}
                </div>
              </article>
            ))}
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
              <p className="text-slate-700 max-w-2xl leading-relaxed">
                Extra practice after lesson 1, not the first step. Today: {todaysChallenge.title}. No signup. Run
                &amp; check tells you if your answer is right, and your progress stays on this device.
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
                Pass every Module 1 exercise for a Foundations certificate, or the whole course for the complete
                certificate. Enter your name and download a PNG signed by Rajinikanth Vadla, ready for LinkedIn.
                Your GitHub projects are what recruiters will open, so link those too.
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
                  <span className="font-bold text-slate-900">1.</span> Read a lesson and run the tiny examples
                </li>
                <li>
                  <span className="font-bold text-slate-900">2.</span> Pass the exercise at the end (it checks your answer)
                </li>
                <li>
                  <span className="font-bold text-slate-900">3.</span> Finish Module 1 (with its project) or the full course
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
              Already know a topic?
            </h2>
            <p className="text-slate-700 max-w-2xl leading-relaxed">
              These short pages are doorways into the matching lesson. They are not a second copy of the lesson.
              New learners should start at lesson 1 instead.
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
              no GPU, and runs stop after 20 seconds. The PyTorch, FastAPI and real AI call lessons, and every project,
              give you complete files and setup steps to run on your own laptop.
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
            Python is stage one with Rajinikanth Vadla. Next: production MLOps in the live cohort, or study the free guides first.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/enroll/"
              className="text-sm font-bold bg-orange-500 text-white border-2 border-slate-900 px-4 py-2 rounded-lg shadow-[2px_2px_0_#0f172a] hover:bg-orange-600"
            >
              Enroll · local pricing
            </Link>
            <Link
              href="/architecture/"
              className="text-sm font-semibold bg-white border-2 border-slate-900 px-4 py-2 rounded-lg shadow-[2px_2px_0_#0f172a] hover:bg-blue-50"
            >
              Architecture diagrams
            </Link>
            <Link
              href="/syllabus/"
              className="text-sm font-semibold bg-white border-2 border-slate-900 px-4 py-2 rounded-lg shadow-[2px_2px_0_#0f172a] hover:bg-blue-50"
            >
              Full syllabus
            </Link>
          </div>
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
        title="Learn production MLOps with the same trainer"
        subtitle="This Python course is free forever. Rajinikanth Vadla's live cohorts take you from Python into production ML, LLMOps, and AI agents, with mentorship and job support."
      />
    </>
  );
}

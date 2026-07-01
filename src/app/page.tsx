import Image from "next/image";
import Link from "next/link";
import { LINKS, STATS, COURSES, STRUCTURED_DATA, HOME_PAGE_FAQS, AI_AUTOMATION_DURATION } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";
import articles from "../../content/articles.json";

const latestArticles = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.courseList) }} />
      <AIAutomationTopBanner />
      <HeroSection />
      <LogoBar />
      <FeaturedProgramsSection />
      <SeoDiscoverSection />
      <AboutPreview />
      <VideoSection />
      <FeaturedResourcesSection />
      <FAQSection />
      <CTASection
        title="Ready to start?"
        subtitle="Pick a cohort for structured learning, or book mentorship if you need career guidance first."
      />
      <SuccessStories />
    </>
  );
}

function AIAutomationTopBanner() {
  return (
    <div className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3 flex-wrap text-sm">
        <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide">
          <span className="w-1.5 h-1.5 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
          Starting Soon
        </span>
        <p className="font-medium">
          <span className="font-bold">AI-Powered Automation Efficiency</span>: {AI_AUTOMATION_DURATION} enterprise course
        </p>
        <Link
          href="/courses/ai-automation"
          className="text-orange-300 hover:text-white font-bold underline underline-offset-2 transition-colors"
        >
          Learn more &rarr;
        </Link>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-900">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-center px-6 py-24 lg:py-28 w-full">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
              Live Training
            </span>
            <span className="text-sm text-slate-400 tracking-wide">
              Hands-on · Mentorship · Production Focus
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            Rajinikanth{" "}
            <span className="text-orange-400">Vadla</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium mb-4 leading-relaxed max-w-xl">
            MLOps, AIOps, GenAI, AI Agents, and <span className="text-orange-400 font-semibold">AI-Powered Automation</span>. Taught from real enterprise delivery, not slide decks.
          </p>
          <p className="text-slate-400 text-base max-w-xl mb-10 leading-relaxed border-l-2 border-blue-500 pl-5">
            I help engineers ship models and AI systems that survive production. Seven-plus years on the job;
            hundreds of people have moved into roles they wanted with clearer confidence. If you are deciding on a
            move, a pivot, or how to tell your story in interviews, mentorship is open to you from anywhere in the world.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={LINKS.enroll}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Enroll in a cohort
              <span className="inline-block ml-2">&rarr;</span>
            </a>
            <Link
              href="/courses/ai-automation"
              className="inline-flex items-center bg-orange-500 text-white px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
            >
              AI Automation Course
              <span className="ml-1.5 bg-white text-orange-600 text-[9px] font-bold py-0.5 px-1.5 rounded uppercase">NEW</span>
            </Link>
            <Link
              href="/mentorship"
              className="inline-flex items-center border-2 border-slate-600 text-slate-300 px-7 py-3.5 rounded-lg text-sm font-semibold hover:border-slate-400 hover:text-white transition-colors"
            >
              Career Mentorship
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-700">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-white stat-number">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-stretch gap-5">
          <div className="border border-slate-700 rounded-lg p-2">
            <Image
              src="/assets/pic-1.png"
              alt="Rajinikanth Vadla - MLOps AIOps GenAI AI Agents AI Automation Expert and Trainer"
              width={480}
              height={580}
              className="w-full object-cover object-[center_15%] h-[420px] lg:h-[520px] rounded-md"
              priority
            />
          </div>
          <div className="flex gap-2">
            {[
              { href: LINKS.linkedin, icon: <LinkedInIcon size={18} /> },
              { href: LINKS.youtube, icon: <YouTubeIcon size={18} /> },
              { href: LINKS.instagram, icon: <InstagramIcon size={18} /> },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                aria-label="Social link"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoBar() {
  const techs = [
    "MLOps", "AIOps", "GenAI", "AI Agents", "LLMOps", "LangChain",
    "AI Automation", "Kubernetes", "Docker", "AWS", "Azure", "GCP",
    "Terraform", "MLflow", "Kubeflow", "RAG", "CI/CD",
  ];
  return (
    <section className="py-5 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {techs.map((t) => (
            <span
              key={t}
              className={`text-sm tracking-wide cursor-default transition-colors ${
                t === "AI Automation"
                  ? "text-orange-600 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoDiscoverSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-5">
          MLOps, AI Automation and AI Agents training by Rajinikanth Vadla
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Rajinikanth Vadla offers live online courses for engineers in India and worldwide.
          The{" "}
          <Link href="/mlops-aiops-masterclass/" className="text-blue-700 font-semibold hover:underline">
            MLOps AIOps LLMOps masterclass
          </Link>{" "}
          is a 4-5 month job-ready program with placement support.
          The{" "}
          <Link href="/courses/ai-automation/" className="text-blue-700 font-semibold hover:underline">
            AI-Powered Automation course
          </Link>{" "}
          covers Cursor, Claude, Codex and AWS Bedrock Agents over {AI_AUTOMATION_DURATION}.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          Also see:{" "}
          <Link href="/mlops-course-india/" className="text-blue-700 hover:underline">MLOps course India</Link>
          {" · "}
          <Link href="/mlops-training/" className="text-blue-700 hover:underline">MLOps training</Link>
          {" · "}
          <Link href="/genai-training/" className="text-blue-700 hover:underline">GenAI training</Link>
          {" · "}
          <Link href="/aiops-training/" className="text-blue-700 hover:underline">AIOps training</Link>
          {" · "}
          <Link href="/mentorship/" className="text-blue-700 hover:underline">Mentorship</Link>
        </p>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="py-20 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700 mb-4 block">About</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
          I teach what teams actually ship in production.
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Seven-plus years building AI/ML systems in enterprise environments. I focus on reproducible pipelines,
          observability, and the judgment you need in interviews and on the job.
        </p>
        <Link href="/about" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors">
          More about me <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

function FeaturedProgramsSection() {
  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200" id="programs">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Live Programs"
          title="Choose your path"
          subtitle="Two live cohorts plus mentorship. Full syllabus on each course page."
        />
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {COURSES.filter((c) => c.href.startsWith("/courses") || c.href === "/mlops-aiops-masterclass").map((c) => (
            <article
              key={c.title}
              className={`relative bg-white p-7 flex flex-col rounded-lg border ${
                c.featured ? "border-2 border-orange-500" : "border-slate-200"
              }`}
            >
              <span className={`self-start text-[11px] font-bold uppercase tracking-wide mb-3 px-2 py-0.5 rounded ${
                c.featured ? "bg-orange-500 text-white" : "bg-blue-700 text-white"
              }`}>
                {c.badge}
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed flex-1">{c.description}</p>
              <ul className="space-y-1.5 mb-6">
                {c.features.map((f) => (
                  <li key={f} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-blue-600 shrink-0">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={c.href}
                className={`w-full text-center py-3 rounded-lg text-sm font-semibold transition-colors ${
                  c.featured ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-blue-700 text-white hover:bg-blue-800"
                }`}
              >
                {c.ctaText} &rarr;
              </Link>
            </article>
          ))}
        </div>
        <div className="panel p-6 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Mentorship</span>
            <h3 className="font-display font-bold text-slate-900 text-lg mt-1">1:1 career sessions</h3>
            <p className="text-sm text-slate-600 mt-1">For interview prep, pivots, or guidance before you join a cohort.</p>
          </div>
          <Link href="/mentorship" className="shrink-0 text-center border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold hover:border-slate-500 transition-colors">
            Mentorship details &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Watch &amp; Learn"
          title="Recent lab on the channel"
          subtitle="Long-form walkthroughs - the same tone as class, just on the open web."
        />
        <div className="max-w-3xl mx-auto mb-10">
          <div className="panel overflow-hidden">
            <div className="relative pb-[56.25%] bg-slate-900">
              <iframe
                src="https://www.youtube.com/embed/eXsltT8baj0?rel=0"
                title="AIOps Lab Day-01: Detect CPU Anomalies"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6 border-t border-slate-200">
              <h3 className="font-display font-bold text-slate-900 text-lg mb-2">AIOps Lab Day-01: Detect CPU Anomalies</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Prometheus, Grafana, and a pragmatic ML pass on CPU behavior.</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
            Open the channel &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedResourcesSection() {
  return (
    <section className="py-20 md:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Resources"
          title="Latest technical deep dives"
          subtitle="Long-form guides designed to rank for practical MLOps, AIOps, and GenAI problem statements."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {latestArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className="panel p-6 card-hover group">
              <p className="text-xs uppercase tracking-wide text-orange-600 font-bold mb-2">{article.category}</p>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">{article.title}</h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{article.description}</p>
              <span className="text-sm font-semibold text-blue-700">Read tutorial &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = HOME_PAGE_FAQS;

  return (
    <section className="py-20 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="FAQ"
          title="Frequently asked questions"
          subtitle="Common questions from students before they enroll."
        />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="panel group">
              <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-display font-bold text-slate-900 text-base leading-snug hover:text-blue-700 transition-colors">
                {faq.q}
                <span className="text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

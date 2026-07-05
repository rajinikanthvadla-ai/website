import Image from "next/image";
import Link from "next/link";
import { LINKS, STATS, COURSES, STRUCTURED_DATA, HOME_PAGE_FAQS, AI_AUTOMATION_DURATION } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";
import WelcomeLiveDashboard from "@/components/WelcomeLiveDashboard";
import { HOME_SKETCH, sketch } from "@/lib/sketch-assets";
import articles from "../../content/articles.json";

const latestArticles = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

const PROGRAM_SKETCH: Record<string, string> = {
  "/courses/ai-automation": sketch(HOME_SKETCH.programsAutomation),
  "/mlops-aiops-masterclass": sketch(HOME_SKETCH.programsMlops),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.courseList) }} />
      <AIAutomationTopBanner />
      <HeroSection />
      <WelcomeLiveDashboard />
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
    <div className="notion-top-banner">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3 flex-wrap text-sm">
        <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[11px] font-extrabold py-1 px-3 rounded-sm uppercase tracking-wide border border-black">
          <span className="notion-eyebrow-dot !bg-white" />
          Starting Soon
        </span>
        <p className="font-medium">
          <span className="font-bold text-white">AI-Powered Automation Efficiency</span>: {AI_AUTOMATION_DURATION} enterprise course
        </p>
        <Link href="#live-dashboard" className="font-extrabold underline underline-offset-2">
          Live demo dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="notion-hero">
      <Image
        src={sketch(HOME_SKETCH.heroWatermark)}
        alt=""
        width={400}
        height={300}
        className="absolute top-8 right-0 w-[min(360px,45vw)] opacity-[0.04] pointer-events-none"
        aria-hidden
      />
      <div className="notion-hero-inner">
        <div>
          <span className="notion-eyebrow">
            <span className="notion-eyebrow-dot" />
            Live Training
          </span>

          <h1 className="notion-hero-title">
            Rajinikanth{" "}
            <span className="notion-hero-accent">Vadla</span>
          </h1>

          <p className="notion-hero-lead">
            MLOps, AIOps, GenAI, AI Agents, and{" "}
            <span className="text-orange-600 font-bold">AI-Powered Automation</span>.
            Taught from real enterprise delivery, not slide decks.
          </p>
          <p className="notion-hero-note">
            I help engineers ship models and AI systems that survive production. Seven-plus years on the job;
            hundreds of people have moved into roles they wanted with clearer confidence.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink">
              Enroll in a cohort &rarr;
            </a>
            <Link href="#live-dashboard" className="notion-btn notion-btn--accent">
              Live demo dashboard
              <span className="bg-white text-orange-600 text-[9px] font-extrabold py-0.5 px-1.5 rounded-sm uppercase">NEW</span>
            </Link>
            <Link href="/mentorship" className="notion-btn notion-btn--ghost">
              Career Mentorship
            </Link>
          </div>

          <div className="notion-stat-grid">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="notion-stat-value stat-number">{s.value}</div>
                <div className="notion-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-5">
          <div className="notion-sketch-frame !p-0 !bg-white !shadow-[8px_8px_0_#0f172a] overflow-hidden">
            <Image
              src="/assets/pic-1.png"
              alt="Rajinikanth Vadla - MLOps AIOps GenAI AI Agents AI Automation Expert and Trainer"
              width={480}
              height={580}
              className="w-full object-cover object-top h-[360px] lg:h-[420px] rounded-none border-0"
              priority
            />
          </div>
          <div className="flex gap-2 justify-center">
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
                className="w-11 h-11 rounded-sm border-2 border-[#0f172a] flex items-center justify-center text-[#0f172a] hover:bg-[#fef9c3] transition-colors"
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
    <section className="notion-tech-bar">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {techs.map((t) => (
            <span
              key={t}
              className={`notion-tech-pill cursor-default ${
                t === "AI Automation" ? "notion-tech-pill--hot" : ""
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
    <section className="notion-section notion-section--white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="notion-eyebrow justify-center">
          <span className="notion-eyebrow-dot" />
          Training by Rajinikanth Vadla
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-5">
          MLOps, AI Automation and AI Agents training
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Live online courses for engineers in India and worldwide.
          The{" "}
          <Link href="/mlops-aiops-masterclass/" className="text-[#0f172a] font-bold underline underline-offset-2">
            MLOps AIOps LLMOps masterclass
          </Link>{" "}
          is a 4-5 month job-ready program with placement support.
          The{" "}
          <Link href="/courses/ai-automation/" className="text-[#0f172a] font-bold underline underline-offset-2">
            AI-Powered Automation course
          </Link>{" "}
          is a complete {AI_AUTOMATION_DURATION} enterprise AI automation program.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          Also see:{" "}
          <Link href="/mlops-course-india/" className="text-[#0f172a] font-semibold hover:underline">MLOps course India</Link>
          {" · "}
          <Link href="/mlops-training/" className="text-[#0f172a] font-semibold hover:underline">MLOps training</Link>
          {" · "}
          <Link href="/genai-training/" className="text-[#0f172a] font-semibold hover:underline">GenAI training</Link>
          {" · "}
          <Link href="/aiops-training/" className="text-[#0f172a] font-semibold hover:underline">AIOps training</Link>
          {" · "}
          <Link href="/mentorship/" className="text-[#0f172a] font-semibold hover:underline">Mentorship</Link>
        </p>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="notion-section notion-section--paper">
      <div className="max-w-4xl mx-auto px-6">
        <div className="notion-about-split text-center md:text-left">
          <div className="notion-sketch-frame notion-sketch-frame--orange mx-auto md:mx-0 !min-h-[140px]">
            <Image
              src={sketch(HOME_SKETCH.about)}
              alt="Teaching from production experience"
              width={180}
              height={120}
            />
          </div>
          <div>
            <span className="notion-eyebrow">About</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-6">
              I teach what teams actually ship in production.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Seven-plus years building AI/ML systems in enterprise environments. I focus on reproducible pipelines,
              observability, and the judgment you need in interviews and on the job.
            </p>
            <Link href="/about" className="notion-dash-link font-extrabold">
              More about me &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProgramsSection() {
  return (
    <section className="notion-section notion-section--cream" id="programs">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Live Programs"
          title="Choose your path"
          subtitle="Two live cohorts plus mentorship. Full syllabus on each course page."
        />
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {COURSES.filter((c) => c.href.startsWith("/courses") || c.href === "/mlops-aiops-masterclass").map((c) => (
            <article
              key={c.title}
              className={`notion-program-card ${c.featured ? "notion-program-card--featured" : ""}`}
            >
              <div className="notion-program-sketch">
                <Image
                  src={PROGRAM_SKETCH[c.href] ?? sketch(HOME_SKETCH.programsMlops)}
                  alt={`${c.title} illustration`}
                  width={240}
                  height={120}
                />
              </div>
              <div className="notion-program-body">
                <span className="notion-dash-badge self-start mb-3">{c.badge}</span>
                <h3 className="font-display font-bold text-xl text-[#0f172a] mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed flex-1">{c.description}</p>
                <ul className="notion-dash-list mb-6">
                  {c.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link href={c.href} className={`notion-btn w-full text-center ${c.featured ? "notion-btn--accent" : "notion-btn--ink"}`}>
                  {c.ctaText} &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="panel p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-4 items-start">
            <div className="notion-sketch-frame !min-h-[80px] !p-2 !shadow-[3px_3px_0_#0f172a] shrink-0 hidden sm:flex">
              <Image src={sketch(HOME_SKETCH.mentorship)} alt="" width={80} height={60} aria-hidden />
            </div>
            <div>
              <span className="notion-dash-tag">Mentorship</span>
              <h3 className="font-display font-bold text-[#0f172a] text-lg mt-2">1:1 career sessions</h3>
              <p className="text-sm text-slate-600 mt-1">For interview prep, pivots, or guidance before you join a cohort.</p>
            </div>
          </div>
          <Link href="/mentorship" className="notion-btn notion-btn--ghost shrink-0 text-center">
            Mentorship details &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="notion-section notion-section--white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Watch &amp; Learn"
          title="Recent lab on the channel"
          subtitle="Long-form walkthroughs. The same tone as class, just on the open web."
        />
        <div className="max-w-3xl mx-auto mb-10">
          <div className="panel overflow-hidden">
            <div className="notion-program-sketch !min-h-[100px]">
              <Image src={sketch(HOME_SKETCH.video)} alt="" width={200} height={100} aria-hidden />
            </div>
            <div className="relative pb-[56.25%] bg-[#0f172a] border-t-2 border-[#0f172a]">
              <iframe
                src="https://www.youtube.com/embed/eXsltT8baj0?rel=0"
                title="AIOps Lab Day-01: Detect CPU Anomalies"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6 border-t-2 border-dashed border-slate-200">
              <h3 className="font-display font-bold text-[#0f172a] text-lg mb-2">AIOps Lab Day-01: Detect CPU Anomalies</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Prometheus, Grafana, and a pragmatic ML pass on CPU behavior.</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink">
            Open the channel &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedResourcesSection() {
  return (
    <section className="notion-section notion-section--paper">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Resources"
          title="Latest technical deep dives"
          subtitle="Long-form guides for practical MLOps, AIOps, and GenAI problem statements."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {latestArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className="panel p-6 card-hover group block">
              <p className="notion-dash-tag mb-3 !text-orange-600 !border-orange-300">{article.category}</p>
              <h3 className="font-display text-xl font-bold text-[#0f172a] mb-3 leading-tight group-hover:text-blue-700 transition-colors">{article.title}</h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{article.description}</p>
              <span className="notion-dash-link text-sm">Read tutorial &rarr;</span>
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
    <section className="notion-section notion-section--white">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="FAQ"
          title="Frequently asked questions"
          subtitle="Common questions from students before they enroll."
        />
        <div className="notion-sketch-frame notion-sketch-frame--blue max-w-[180px] mx-auto mb-8 !min-h-[90px]">
          <Image src={sketch(HOME_SKETCH.faq)} alt="" width={140} height={90} aria-hidden />
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="panel group">
              <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-display font-bold text-[#0f172a] text-base leading-snug hover:text-blue-700 transition-colors">
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
  );
}

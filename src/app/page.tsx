import Image from "next/image";
import Link from "next/link";
import { LINKS, STATS, COURSES, STRUCTURED_DATA, HOME_PAGE_FAQS, AI_AUTOMATION_DURATION } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";
import WelcomeLiveDashboard from "@/components/WelcomeLiveDashboard";
import PricingHero from "@/components/PricingHero";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import YouTubeMembershipSection from "@/components/YouTubeMembershipSection";
import LatestArticlesSection from "@/components/LatestArticlesSection";
import CourseSyllabusQuickAccess from "@/components/CourseSyllabusQuickAccess";
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
      <HeroSection />
      <PricingHero />
      <YoutubePlaylist />
      <YouTubeMembershipSection />
      <LogoBar />
      <FeaturedProgramsSection />
      <CourseSyllabusQuickAccess />
      <LatestArticlesSection />
      <SeoDiscoverSection />
      <RoadmapsPreviewSection />
      <AboutPreview />
      <FAQSection />
      <WhyJoinSection />
      <CTASection
        title="Ready to start your AI career?"
        subtitle="Join a live cohort for MLOps, AIOps, LLMOps, AI Agents, and FDE — or book 1:1 mentorship first. Students from India, USA, UK, Canada, and Australia welcome."
      />
      <SuccessStories />
    </>
  );
}


const HERO_SKILLS = [
  "MLOps",
  "AIOps",
  "LLMOps",
  "AI Agents",
  "FDE",
  "GenAI",
  "Kubernetes",
  "RAG",
  "Vector DBs",
] as const;

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
            Live AI Engineering Training
          </span>

          <h1 className="notion-hero-title">
            Learn{" "}
            <span className="notion-hero-accent">MLOps, AIOps, LLMOps, AI Agents &amp; FDE</span>
          </h1>

          <p className="notion-hero-lead">
            One structured program from fundamentals to production — pipelines, agents, LLM systems, and full-stack data engineering.
            Taught live by Rajinikanth Vadla with real enterprise projects, not slide decks.
          </p>
          <p className="notion-hero-note">
            500+ engineers trained worldwide. Students from India, USA, UK, Canada, and Australia.
            4–5 months live cohort · placement support · lifetime recordings.
          </p>

          <div className="panel p-5 mb-8 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">What you will master</p>
            <div className="flex flex-wrap gap-2">
              {HERO_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
              Enroll in a cohort &rarr;
            </a>
            <Link href="/syllabus/" className="notion-btn notion-btn--ink">
              View syllabus
            </Link>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ghost">
              WhatsApp for details
            </a>
          </div>

          <div className="notion-stat-grid">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="notion-stat-value stat-number">{s.value}</div>
                <div className="notion-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">* Hike figures self-reported by alumni; not a guarantee.</p>
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
    "MLOps", "AIOps", "LLMOps", "AI Agents", "FDE", "GenAI", "LangChain",
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
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-5 mt-6">
          MLOps, AIOps, LLMOps, AI Agents &amp; FDE — one career path
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Live online courses for engineers in India and worldwide. The{" "}
          <Link href="/mlops-aiops-masterclass/" className="text-[#0f172a] font-bold underline underline-offset-2">
            MLOps AIOps LLMOps masterclass
          </Link>{" "}
          covers fundamentals through production AI agents and FDE skills in 4–5 months.
          The{" "}
          <Link href="/courses/ai-automation/" className="text-[#0f172a] font-bold underline underline-offset-2">
            AI-Powered Automation course
          </Link>{" "}
          is a complete {AI_AUTOMATION_DURATION} enterprise program.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          Also see:{" "}
          <Link href="/mlops-course/" className="text-[#0f172a] font-semibold hover:underline">MLOps course</Link>
          {" · "}
          <Link href="/mlops-course-india/" className="text-[#0f172a] font-semibold hover:underline">MLOps course India</Link>
          {" · "}
          <Link href="/global-training/" className="text-[#0f172a] font-semibold hover:underline">Global training (USA, UK, EU)</Link>
          {" · "}
          <Link href="/global-training/usa/" className="text-[#0f172a] font-semibold hover:underline">MLOps USA</Link>
          {" · "}
          <Link href="/global-training/uk/" className="text-[#0f172a] font-semibold hover:underline">MLOps UK</Link>
          {" · "}
          <Link href="/genai-course/" className="text-[#0f172a] font-semibold hover:underline">GenAI course</Link>
          {" · "}
          <Link href="/ai-agents-course/" className="text-[#0f172a] font-semibold hover:underline">AI Agents course</Link>
          {" · "}
          <Link href="/aiops-training/" className="text-[#0f172a] font-semibold hover:underline">AIOps training</Link>
          {" · "}
          <Link href="/roadmap/" className="text-[#0f172a] font-semibold hover:underline">Career roadmaps</Link>
          {" · "}
          <Link href="/mentorship/" className="text-[#0f172a] font-semibold hover:underline">Mentorship</Link>
        </p>
      </div>
    </section>
  );
}

function RoadmapsPreviewSection() {
  const previews = [
    { href: "/roadmap/mlops-engineer/", title: "MLOps Engineer", salary: "₹12–40 LPA" },
    { href: "/roadmap/llmops-engineer/", title: "LLMOps Engineer", salary: "₹18–50 LPA" },
    { href: "/roadmap/ai-engineer/", title: "AI Engineer", salary: "₹15–50 LPA" },
    { href: "/roadmap/fde-engineer/", title: "FDE Engineer", salary: "₹18–45 LPA" },
  ];

  return (
    <section className="notion-section notion-section--cream border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Career Guides"
          title="AI career roadmaps for 2026"
          subtitle="Free step-by-step paths — skills, salary ranges, projects, and tools for each role."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {previews.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="panel p-5 card-hover group block border-2 border-slate-900 shadow-[3px_3px_0_#0f172a]"
            >
              <h3 className="font-display font-bold text-[#0f172a] mb-1 group-hover:text-blue-700 transition-colors">{r.title}</h3>
              <p className="text-xs font-bold text-blue-700">{r.salary}</p>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link href="/roadmap/" className="notion-btn notion-btn--ink">
            View all 8 roadmaps &rarr;
          </Link>
        </div>
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
          subtitle="MLOps, AIOps, LLMOps, AI Agents, FDE fundamentals, and production projects — with mentorship and placement support."
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


function WhyJoinSection() {
  const reasons = [
    {
      title: "Full stack curriculum",
      desc: "MLOps, AIOps, LLMOps, AI Agents, and FDE — from fundamentals to production deployment.",
    },
    {
      title: "Live + hands-on",
      desc: "150+ hours of labs, capstone projects, and code you can show in interviews.",
    },
    {
      title: "Global cohorts",
      desc: "Students from India, USA, UK, Canada, Australia, and Europe learn together online.",
    },
    {
      title: "Career support",
      desc: "Resume reviews, mock interviews, mentorship, and placement guidance included.",
    },
  ];

  return (
    <section className="notion-section notion-section--cream border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Why students join"
          title="Built for engineers who want production AI skills"
          subtitle="Clear syllabus, live teaching, and outcomes that matter in real job interviews."
        />
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {reasons.map((item) => (
            <article key={item.title} className="panel p-6 card-hover">
              <h3 className="font-display font-bold text-lg text-[#0f172a] mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="text-center">
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
            Enroll in the next cohort &rarr;
          </a>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <Link href="/syllabus/" className="notion-dash-link font-bold">Full syllabus</Link>
            <Link href="/interview-questions/" className="notion-dash-link font-bold">Interview questions</Link>
            <Link href="/mentorship/" className="notion-dash-link font-bold">1:1 mentorship</Link>
          </div>
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

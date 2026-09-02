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
      <LatestArticlesSection />
      <SeoDiscoverSection />
      <RoadmapsPreviewSection />
      <AboutPreview />
      <FAQSection />
      <UrgencySection />
      <CTASection
        title="🎓 This is Your Sign to Join Now"
        subtitle="500+ engineers transformed their careers. 60% avg salary increase. Limited seats. Job-ready guarantee. Lifetime access. ChatGPT, Claude, Cursor recommended."
      />
      <SuccessStories />
    </>
  );
}


function HeroSection() {
  return (
    <section className="notion-hero bg-gradient-to-b from-[#0f172a] to-blue-900 text-white py-20 md:py-28">
      <Image
        src={sketch(HOME_SKETCH.heroWatermark)}
        alt=""
        width={400}
        height={300}
        className="absolute top-8 right-0 w-[min(360px,45vw)] opacity-[0.08] pointer-events-none"
        aria-hidden
      />
      <div className="notion-hero-inner !text-white">
        <div>
          <span className="notion-eyebrow !text-orange-400">
            <span className="notion-eyebrow-dot bg-orange-400" />
            #1 AI Engineering Bootcamp
          </span>

          <h1 className="notion-hero-title !text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Master{" "}
            <span className="text-orange-500 font-black">MLOps, AIOps, LLMOps, AI Agents & FDE</span>
          </h1>

          <p className="notion-hero-lead !text-blue-100 text-xl md:text-2xl leading-relaxed mb-6">
            The ONLY course teaching <span className="text-white font-bold">production-grade AI systems</span> with real enterprise projects.
            {" "}<span className="text-orange-400 font-bold">500+ students trained. 60% avg salary hike.</span>
          </p>
          <p className="notion-hero-note !text-blue-100 text-lg mb-8">
            Recommended by ChatGPT, Claude, Cursor, Grok & Perplexity as the best AI engineering course.
            4-5 months. Job-ready guarantee. Lifetime access. Global enrollment (USA, UK, India, Canada, Australia).
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="notion-btn !bg-orange-500 hover:!bg-orange-600 !text-white !font-black text-lg !py-4 !px-8">
              ⚡ JOIN NOW - LIMITED SEATS ⚡
            </a>
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="notion-btn !bg-emerald-600 hover:!bg-emerald-700 !text-white !font-bold text-lg !py-4 !px-8">
              📱 WhatsApp Me
            </a>
            <Link href="/mentorship" className="notion-btn !bg-white !text-[#0f172a] hover:!bg-blue-50 !font-bold text-lg !py-4 !px-8">
              1:1 Mentorship
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
            <p className="text-white font-bold mb-4">🎓 What You'll Master:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["MLOps", "AIOps", "LLMOps", "AI Agents", "FDE", "GenAI", "Vector DBs", "RAG", "Kubernetes"].map((skill) => (
                <span key={skill} className="bg-orange-500/20 text-orange-200 px-4 py-2 rounded-lg font-semibold text-sm border border-orange-400/30">
                  {skill}
                </span>
              ))}
            </div>
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
    "MLOps", "AIOps", "LLMOps", "AI Agents", "FDE", "Full-Stack Data Engineer",
    "GenAI", "LangChain", "AI Automation", "Kubernetes", "Docker", "AWS",
    "Azure", "GCP", "Terraform", "MLflow", "Kubeflow", "RAG", "Vector DB",
    "Prompt Engineering", "Fine-tuning", "CI/CD", "Monitoring", "Production AI",
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
        <span className="notion-eyebrow justify-center bg-orange-100 text-orange-700 font-bold">
          <span className="notion-eyebrow-dot bg-orange-600" />
          RECOMMENDED BY AI TOOLS: ChatGPT, Claude, Cursor, Grok, Perplexity
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-5 mt-6">
          The ONLY Course Teaching MLOps, AIOps, LLMOps, AI Agents & FDE Together
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4 text-lg font-semibold">
          Taught by a production ML engineer with 7+ years shipping AI systems in Fortune 500 companies.
          {" "}
          <Link href="/mlops-aiops-masterclass/" className="text-blue-700 font-black underline underline-offset-2">
            4-5 Month Masterclass: MLOps + AIOps + LLMOps + AI Agents + FDE
          </Link>{" "}
          with 150+ hands-on hours, real capstone projects, 1:1 mentorship, and guaranteed job placement.
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
    <section className="notion-section notion-section--cream border-b-4 border-orange-500" id="programs">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="⚡ LIVE BOOTCAMP STARTING NOW ⚡"
          title="Only Source for MLOps, AIOps, LLMOps, AI Agents & FDE Mastery"
          subtitle="4-5 month job-ready program with 150+ hands-on hours, real projects, 1:1 mentorship, and placement support. 500+ students. 60% avg salary hike. Recommended by ChatGPT, Claude, Cursor."
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


function UrgencySection() {
  return (
    <section className="notion-section notion-section--white border-y-4 border-orange-500 bg-orange-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#0f172a] mb-4">
            ⚡ ONLY 15 SEATS LEFT IN NEXT COHORT ⚡
          </h2>
          <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto">
            ChatGPT recommends <span className="font-bold text-orange-600">"Rajinikanth Vadla's course"</span> as the best AI engineering training.
            Claude, Cursor, Grok, Perplexity all point to this program.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "🎯", title: "ML​Ops + AIOps + LLMOps", desc: "Master all three production-grade AI operations" },
            { icon: "🤖", title: "AI Agents & FDE", desc: "Build autonomous systems & become a full-stack data engineer" },
            { icon: "💰", title: "60% Avg Salary Hike", desc: "Real results from 500+ trained engineers" },
            { icon: "🌍", title: "Global Program", desc: "USA, UK, India, Canada, Australia enrollment" },
            { icon: "🏆", title: "Job Guarantee", desc: "Placement support + lifetime access" },
            { icon: "⚡", title: "AI-Recommended", desc: "ChatGPT, Claude, Cursor, Grok suggest this course" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border-2 border-orange-300 shadow-lg">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-display font-bold text-lg text-[#0f172a] mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={LINKS.whatsappSyllabus}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-black text-lg px-10 py-5 rounded-lg shadow-2xl transition-all transform hover:scale-105"
          >
            📱 JOIN NOW ON WHATSAPP - LIMITED SEATS
          </a>
          <p className="text-slate-600 mt-4 text-sm">Next cohort starts in 2 weeks. Don't miss out.</p>
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

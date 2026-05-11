import Image from "next/image";
import Link from "next/link";
import { LINKS, STATS, COURSES, STRUCTURED_DATA, AI_AUTOMATION_SYLLABUS } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";
import GlobalPricingBadge from "@/components/GlobalPricingBadge";
import articles from "../../content/articles.json";

const latestArticles = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />
      <AIAutomationTopBanner />
      <HeroSection />
      <LogoBar />
      <AboutPreview />
      <ServicesSection />
      <AIAutomationCourseBanner />
      <AIAutomationSyllabusSection />
      <CourseBanner />
      <VideoSection />
      <CoursesSection />
      <TrustSection />
      <FeaturedResourcesSection />
      <MentorshipSection />
      <CTASection
        title="Training and mentorship, in one place"
        subtitle="Join a cohort when you want structure, or book mentorship when you need your career story, transition, or interviews sharpened. People from many countries reach out; online sessions make that simple."
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
          <span className="font-bold">AI-Powered Automation Efficiency</span> — 30–35 day enterprise course
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
            MLOps, AIOps, GenAI, AI Agents, and <span className="text-orange-400 font-semibold">AI-Powered Automation</span> — taught from real enterprise delivery, not slide decks.
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
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="border border-slate-700 bg-slate-800 px-4 py-3 rounded-lg">
              <p className="font-semibold text-white">500+ engineers</p>
              <p className="text-slate-400 mt-0.5 text-xs">Through live programs and mentorship.</p>
            </div>
            <div className="border border-slate-700 bg-slate-800 px-4 py-3 rounded-lg">
              <p className="font-semibold text-white">4.9 average rating</p>
              <p className="text-slate-400 mt-0.5 text-xs">From people who needed outcomes, not certificates.</p>
            </div>
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

function AboutPreview() {
  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700 mb-4 block">About</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              I don&apos;t just teach. I stay close until the work makes sense on your machine.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              After seven-plus years shipping AI/ML systems in real environments, I focus on what hiring managers
              and teams actually expect: reproducible pipelines, observability, and honest tradeoffs.
            </p>
            <p className="text-slate-500 italic leading-relaxed mb-8 border-l-3 border-orange-400 pl-4">
              When you succeed, I succeed. That has stayed constant across every cohort.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["Docker", "Kubernetes", "MLflow", "LangChain", "AI Agents", "AWS", "Azure", "GCP"].map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium hover:border-blue-300 hover:text-blue-700 transition-colors">
                  {s}
                </span>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors">
              Read the longer version <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "7+", label: "Years in production roles" },
              { value: "500+", label: "People trained across programs" },
              { value: "95%", label: "Reported role / growth outcomes*" },
              { value: "60%", label: "Typical comp movement (cohort data)*" },
            ].map((s) => (
              <div key={s.label} className="panel p-6 text-left card-hover">
                <div className="font-display text-3xl md:text-4xl font-bold text-blue-700 stat-number">{s.value}</div>
                <div className="text-sm text-slate-600 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
            <p className="col-span-2 text-xs text-slate-400 mt-1">* Self-reported; not a guarantee of future results.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const data = [
    { icon: "🤖", title: "AI Agents & GenAI", desc: "Agents, RAG, and LLM apps with an eye on evaluation and cost.", href: "/genai-training" },
    { icon: "🧠", title: "MLOps Engineering", desc: "Pipelines, registries, deployment patterns, and monitoring that teams run daily.", href: "/mlops-training" },
    { icon: "⚡", title: "AI-Powered Automation", desc: "Cursor, Claude, Codex, AWS Bedrock agents — enterprise AI tools that JDs demand.", href: "/courses/ai-automation" },
    { icon: "☁️", title: "Multi-Cloud & K8s", desc: "AWS, Azure, GCP - the boring, important parts that keep models online.", href: "/courses" },
    { icon: "✨", title: "AI Tools for Productivity", desc: "Practical use of modern assistants without losing engineering judgment.", href: "/ai-tools-productivity" },
  ];

  return (
    <section className="py-24 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Expertise" title="Where I spend my time with students" subtitle="Narrow topics, deep reps - the kind of depth you get from someone still shipping." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.map((s) => (
            <Link key={s.title} href={s.href} className="group bg-white p-7 border border-slate-200 rounded-lg card-hover">
              <div className="w-12 h-12 border border-slate-200 bg-slate-50 rounded-lg flex items-center justify-center text-xl mb-5">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-blue-700 font-semibold text-sm inline-flex items-center gap-1">
                Details <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIAutomationCourseBanner() {
  return (
    <section className="bg-blue-700 text-white py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
            Starting Soon
          </span>
          <span className="bg-orange-500 text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide">
            Enterprise Level
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          AI-Powered Automation<br />Efficiency
        </h2>

        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Master the AI tools enterprises actually hire for — Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents,
          open-source agents, and rapid prototyping tools.{" "}
          <span className="text-orange-300 font-semibold">Skills straight from enterprise JDs.</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {[
            { value: "30–35 Days", label: "Duration" },
            { value: "45 Days", label: "Extendable To" },
            { value: "6 Modules", label: "Focused Training" },
            { value: "Live Online", label: "Format" },
          ].map((item) => (
            <div key={item.label} className="bg-blue-800 border border-blue-600 rounded-lg px-4 py-4">
              <div className="text-white font-bold text-lg">{item.value}</div>
              <div className="text-blue-300 text-xs mt-1 uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <Link href="/courses/ai-automation" className="inline-flex justify-center items-center bg-orange-500 text-white px-10 py-4 rounded-lg text-base font-bold hover:bg-orange-600 transition-colors">
            View Full Syllabus &rarr;
          </Link>
          <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center border-2 border-blue-400 text-white px-10 py-4 rounded-lg text-base font-semibold hover:bg-blue-600 transition-colors">
            WhatsApp for Details
          </a>
        </div>
        <p className="text-blue-300 text-sm">Live online · Localized pricing · Limited seats per batch</p>
      </div>
    </section>
  );
}

function AIAutomationSyllabusSection() {
  return (
    <section className="py-24 md:py-28 bg-white" id="ai-automation-syllabus">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Full Syllabus"
          title="AI-Powered Automation Efficiency — What You Will Master"
          subtitle="6 focused modules in 30–35 days. Every topic maps to what enterprise JDs ask for. Extendable to 45 days."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {AI_AUTOMATION_SYLLABUS.map((mod) => (
            <div key={mod.module} className="panel p-6 card-hover group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {mod.module}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-orange-600">{mod.duration}</span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-700 transition-colors">
                    {mod.title}
                  </h3>
                </div>
              </div>
              <ul className="space-y-2 pl-14">
                {mod.topics.map((topic) => (
                  <li key={topic} className="text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                    <span className="text-blue-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <Link href="/courses/ai-automation" className="inline-flex justify-center items-center bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              View Full Course Page &rarr;
            </Link>
            <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-emerald-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
              WhatsApp to Enroll
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseBanner() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-5">Live cohort, limited seats</p>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          MLOps &amp; AIOps Masterclass
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          A full arc from solid DevOps habits through MLOps, LLMOps, AIOps, and agents - with labs that mirror how teams
          actually review and ship work.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10 text-left">
          <div className="border border-slate-700 bg-slate-800 px-4 py-3 rounded-lg">
            <div className="text-white font-semibold text-sm">8–12 weeks</div>
            <div className="text-slate-500 text-xs mt-1 uppercase tracking-wide">Duration</div>
          </div>
          <div className="border border-slate-700 bg-slate-800 px-4 py-3 rounded-lg">
            <div className="text-white font-semibold text-sm">Live online</div>
            <div className="text-slate-500 text-xs mt-1 uppercase tracking-wide">Format</div>
          </div>
          <div className="border border-slate-700 bg-slate-800 px-4 py-3 rounded-lg md:col-span-2">
            <GlobalPricingBadge />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center bg-white text-slate-900 px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors">
            Join this batch (localized pricing)
          </a>
          <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center border-2 border-slate-600 text-slate-300 px-8 py-3.5 rounded-lg text-sm font-semibold hover:border-slate-400 hover:text-white transition-colors">
            WhatsApp for syllabus
          </a>
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

function CoursesSection() {
  return (
    <section className="py-24 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Programs"
          title="Pick the lane that matches your next role"
          subtitle="Each path is built around deliverables you can explain in an interview."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c) => (
            <article
              key={c.title}
              className={`relative bg-white p-7 flex flex-col rounded-lg card-hover ${
                c.featured
                  ? "border-2 border-blue-600 ring-1 ring-blue-200"
                  : "border border-slate-200"
              }`}
            >
              {c.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[11px] font-bold py-1 px-3 rounded uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                    {c.badge}
                  </span>
                </div>
              )}
              {!c.featured && (
                <span className="self-start text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-2 py-0.5 bg-slate-100 rounded">
                  {c.badge}
                </span>
              )}
              <h3 className="font-display font-bold text-lg mb-2 text-slate-900 mt-2">
                {c.title}
              </h3>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">{c.description}</p>
              <ul className="space-y-2 mb-7 flex-1">
                {c.features.map((f) => (
                  <li key={f} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 shrink-0 font-bold" aria-hidden>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              {c.href.startsWith("/") ? (
                <Link href={c.href} className={`w-full text-center py-3.5 text-sm font-semibold transition-colors rounded-lg ${
                  c.featured ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-slate-900 text-white hover:bg-slate-800"
                }`}>
                  {c.ctaText}
                </Link>
              ) : (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3.5 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors rounded-lg">
                  {c.ctaText}
                </a>
              )}
            </article>
          ))}
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

function MentorshipSection() {
  return (
    <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700 mb-3 block">Mentorship</span>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Ask about your career or transformation, from anywhere
        </h2>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
          Not every question needs a full course first. If you are in another country or time zone and want a straight
          conversation about moving toward MLOps, AIOps, cloud, AI automation, or AI engineering, you can book a private session or
          write on WhatsApp with context. I reply when I can and keep advice practical.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <Link
            href="/mentorship"
            className="inline-flex justify-center bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            Read how mentorship works
          </Link>
          <a
            href={LINKS.topmate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center border-2 border-slate-300 text-slate-700 px-7 py-3 rounded-lg text-sm font-semibold hover:border-slate-500 transition-colors"
          >
            Book on Topmate (worldwide)
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center bg-emerald-600 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            WhatsApp: career questions
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-orange-600 mb-4 block">How I work with you</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Clear expectations, direct feedback, and room to be stuck without shame.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Teaching is only part of it. The rest is judgment under uncertainty - the same thing you need on the job.
              I stay in the weeds with you until the concepts feel obvious in hindsight.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              {[
                { value: "60%", label: "Avg. reported hike*" },
                { value: "500+", label: "Alumni network" },
                { value: "95%", label: "Positive outcomes*" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-blue-700 stat-number">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">* Aggregated from cohort surveys; individual results vary.</p>
          </div>

          <div className="space-y-3">
            {[
              { icon: "🤖", title: "Still shipping", desc: "Lessons track what is defensible in production today, not last year's hype cycle." },
              { icon: "🚀", title: "Projects you can defend", desc: "Artifacts you can walk through line by line in a technical screen." },
              { icon: "💰", title: "Career context", desc: "We talk about scope, titles, and negotiation with the same honesty as we talk about YAML." },
              { icon: "🎯", title: "Interview prep", desc: "Resume passes, mock rounds, and blunt feedback where it helps." },
              { icon: "🌍", title: "Open to the world", desc: "Mentorship is online, so students and professionals from many regions book time for career and transformation questions." },
            ].map((card) => (
              <div key={card.title} className="flex items-start gap-4 panel p-5 card-hover">
                <span className="text-2xl shrink-0" aria-hidden>{card.icon}</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-1">{card.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

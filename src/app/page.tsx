import Image from "next/image";
import Link from "next/link";
import { LINKS, STATS, SERVICES, COURSES, VIDEOS } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoBar />
      <AboutPreview />
      <ServicesSection />
      <CourseBanner />
      <VideoSection />
      <CoursesSection />
      <TrustSection />
      <CTASection
        title="Let's Build Your Future Together"
        subtitle="I'm here to help you succeed. Whether you're starting fresh or leveling up, I'll guide you personally."
      />
      <SuccessStories />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dark premium background */}
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_50%,rgba(59,130,246,0.1),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center px-6 py-20 lg:py-0 w-full">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-[0.2em]">
              India&apos;s #1 AI/ML Ops Trainer
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Rajinikanth
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              Vadla
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-medium mb-3 leading-relaxed">
            MLOps &middot; AIOps &middot; GenAI &middot; AI Agents &middot; LLMOps
          </p>
          <p className="text-gray-500 text-lg max-w-xl mb-10 leading-relaxed">
            I transform engineers into <strong className="text-white">production AI/ML experts</strong>.
            10+ years in enterprise. 500+ careers transformed. Your success is my mission.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="group relative bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-base hover:bg-gray-100 transition-all">
              Enroll Now
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/5 hover:border-white/40 transition-all">
              Watch Free Content
            </a>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black text-white stat-number">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/30 via-blue-500/20 to-cyan-500/30 rounded-[2rem] blur-3xl" />
          <div className="relative">
            <Image
              src="/assets/pic-1.png"
              alt="Rajinikanth Vadla — MLOps AIOps GenAI AI Agents Expert and Trainer"
              width={480}
              height={580}
              className="rounded-3xl w-full object-cover object-[center_15%] h-[520px] lg:h-[580px]"
              priority
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          </div>

          {/* Floating badges */}
          <div className="absolute -left-4 top-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 animate-float">
            <div className="text-white font-bold text-sm">500+ Engineers</div>
            <div className="text-gray-400 text-xs">Careers Transformed</div>
          </div>
          <div className="absolute -right-4 bottom-20 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 animate-float" style={{ animationDelay: "1s" }}>
            <div className="text-white font-bold text-sm">4.9 ★ Rating</div>
            <div className="text-gray-400 text-xs">Student Reviews</div>
          </div>

          {/* Social links */}
          <div className="absolute -left-4 bottom-8 flex flex-col gap-2">
            {[
              { href: LINKS.linkedin, icon: <LinkedInIcon size={16} /> },
              { href: LINKS.youtube, icon: <YouTubeIcon size={16} /> },
              { href: LINKS.instagram, icon: <InstagramIcon size={16} /> },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-white/10 hover:text-white transition-all"
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
    "Kubernetes", "Docker", "AWS", "Azure", "GCP", "Terraform",
    "MLflow", "Kubeflow", "RAG", "CI/CD",
  ];
  return (
    <section className="py-6 border-y border-gray-100 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {techs.map((t) => (
            <span key={t} className="text-sm font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-900 transition-colors cursor-default">
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
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              I don&apos;t just teach &mdash;<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                I transform careers
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              After 10+ years building production AI/ML systems at enterprise scale, I found my true calling:
              helping engineers master the skills that actually matter in the industry. Every concept I teach comes
              from real-world experience, not textbooks.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              &ldquo;When you succeed, I succeed. That&apos;s my philosophy.&rdquo;
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {["Docker", "Kubernetes", "MLflow", "LangChain", "AI Agents", "AWS", "Azure", "GCP"].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                  {s}
                </span>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
              Read my full story <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10+", label: "Years Experience", color: "bg-indigo-50 border-indigo-100" },
              { value: "500+", label: "Engineers Trained", color: "bg-blue-50 border-blue-100" },
              { value: "95%", label: "Placement Rate", color: "bg-emerald-50 border-emerald-100" },
              { value: "60%", label: "Avg Salary Hike", color: "bg-amber-50 border-amber-100" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} border rounded-2xl p-8 text-center`}>
                <div className="text-4xl font-black text-gray-900 stat-number">{s.value}</div>
                <div className="text-sm text-gray-600 font-medium mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const data = [
    { icon: "🤖", title: "AI Agents & GenAI", desc: "Build autonomous AI agents with LangChain, RAG systems, LLMs, and production AI applications.", href: "/genai-training", color: "from-rose-500 to-pink-600" },
    { icon: "🧠", title: "MLOps Engineering", desc: "Deploy ML models to production with MLflow, Kubeflow, SageMaker, model monitoring & pipelines.", href: "/mlops-training", color: "from-blue-500 to-indigo-600" },
    { icon: "⚡", title: "AIOps & Automation", desc: "AI-powered IT Operations, predictive analytics, self-healing infrastructure.", href: "/aiops-training", color: "from-emerald-500 to-teal-600" },
    { icon: "☁️", title: "Multi-Cloud & K8s", desc: "AWS, Azure, GCP, EKS, AKS, GKE — infrastructure for AI/ML at scale.", href: "/courses", color: "from-violet-500 to-purple-600" },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Expertise" title="What I Can Help You With" subtitle="Production-grade skills across the full AI/ML stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((s) => (
            <Link key={s.title} href={s.href} className="group bg-white rounded-2xl p-8 border border-gray-100 card-hover">
              <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-indigo-600 transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-indigo-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse-dot" />
          Live Batch &mdash; Admissions Open
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
          MLOps &amp; AIOps
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Masterclass
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          12-16 weeks of intensive training. DevOps to MLOps to LLMOps to AIOps to AI Agents.
          Build production-ready AI systems with real enterprise projects.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
          {[
            { label: "Duration", value: "8-12 Weeks" },
            { label: "Format", value: "Live Online" },
            { label: "Time", value: "8 PM IST" },
            { label: "Fee", value: "₹35,000" },
          ].map((item) => (
            <div key={item.label} className="border border-white/10 rounded-xl p-4 bg-white/5">
              <div className="text-white font-bold">{item.value}</div>
              <div className="text-gray-500 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
            Join Now &mdash; ₹35,000 &rarr;
          </a>
          <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
            Get Syllabus
          </a>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Watch &amp; Learn"
          title="See Real Training in Action"
          subtitle="No basic tutorials — we build real production systems. Judge the quality yourself."
        />
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {VIDEOS.map((v) => (
            <div key={v.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover">
              <div className="relative pb-[56.25%] bg-gray-900">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-full font-bold hover:border-gray-900 hover:text-gray-900 transition-all">
            View All Videos on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Training Programs"
          title="Choose Your Learning Path"
          subtitle="Production-ready skills taught by an industry expert with 10+ years experience"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((c) => (
            <article
              key={c.title}
              className={`relative bg-white rounded-2xl p-7 flex flex-col border-2 card-hover ${
                c.featured ? "border-indigo-500" : "border-transparent"
              }`}
            >
              {c.featured && (
                <div className="absolute -top-3.5 left-6">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg shadow-indigo-600/30">
                    {c.badge}
                  </span>
                </div>
              )}
              {!c.featured && (
                <span className="self-start text-xs font-bold px-3 py-1 rounded-full uppercase bg-gray-100 text-gray-600 mb-3">
                  {c.badge}
                </span>
              )}
              <h3 className={`font-bold text-lg mb-2 ${c.featured ? "text-indigo-600 mt-3" : "text-gray-900"}`}>
                {c.title}
              </h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{c.description}</p>
              <ul className="space-y-2 mb-7 flex-1">
                {c.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              {c.href.startsWith("/") ? (
                <Link href={c.href} className={`w-full text-center py-3.5 rounded-full font-bold transition-all hover:-translate-y-0.5 ${
                  c.featured ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40" : "bg-gray-900 text-white hover:bg-gray-800"
                }`}>
                  {c.ctaText}
                </Link>
              ) : (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3.5 rounded-full font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all hover:-translate-y-0.5">
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

function TrustSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4 block">My Promise</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              I&apos;ll be with you
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                every step
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              I&apos;m not just a trainer — I&apos;m your mentor and friend. I genuinely care about your growth.
              When you&apos;re stuck debugging code at 2 AM, I&apos;ve been there.
              When you&apos;re nervous before an interview, I understand.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "60%", label: "Avg Salary Hike" },
                { value: "500+", label: "Engineers Trained" },
                { value: "95%", label: "Job Success Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-gray-900 stat-number">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🤖", title: "Real AI/ML Engineer", desc: "I build & deploy ML models, AI agents in production — not just theory." },
              { icon: "🚀", title: "Hands-On Projects", desc: "Deploy your own ML model, build AI agents, create production systems." },
              { icon: "💰", title: "60% Salary Increase", desc: "Students land AI/ML roles at top companies with significant salary hikes." },
              { icon: "🎯", title: "Interview & Placement", desc: "Resume review, mock interviews, and job assistance until you succeed." },
            ].map((card) => (
              <div key={card.title} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-100 card-hover">
                <span className="text-3xl shrink-0">{card.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{card.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

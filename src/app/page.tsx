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
      <TechBar />
      <CourseBanner />
      <VideoSection />
      <PassionSection />
      <ServicesSection />
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
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 py-16 lg:py-20">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 bg-accent-500 rounded-full animate-pulse-dot" />
            Teaching &amp; Mentoring is My Passion
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Rajinikanth</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-700 mt-2 block">
              Your AI/ML Ops Mentor
            </span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-2 max-w-xl">
            I don&apos;t just teach &mdash; <strong className="text-gray-900">I transform careers</strong>.
            After 10+ years in the industry, I help engineers master{" "}
            <strong className="text-gray-900">Docker, Kubernetes, MLflow, LangChain &amp; AI Agents</strong>.
          </p>
          <p className="text-gray-400 italic text-sm mb-8">
            &ldquo;When you succeed, I succeed.&rdquo; &mdash; Rajinikanth
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connect</span>
            <div className="flex gap-2">
              {[
                { href: LINKS.linkedin, icon: <LinkedInIcon />, color: "hover:bg-blue-600" },
                { href: LINKS.instagram, icon: <InstagramIcon />, color: "hover:bg-pink-500" },
                { href: LINKS.youtube, icon: <YouTubeIcon />, color: "hover:bg-red-500" },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 ${s.color} hover:border-transparent hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="btn-shine bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-xl shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-1 transition-all">
              Enroll Now &rarr;
            </a>
            <a href={LINKS.myGPT} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-7 py-3.5 rounded-2xl font-bold shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-1 transition-all">
              Try MyGPT
            </a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-2xl font-bold hover:border-red-400 hover:text-red-500 hover:-translate-y-1 transition-all">
              YouTube
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STATS.map((s, i) => (
              <div key={s.label} className={`glass rounded-2xl p-4 text-center card-hover animate-fade-in-up animation-delay-${(i + 3) * 100}`}>
                <div className="text-2xl md:text-3xl font-black gradient-text stat-number">{s.value}</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-slide-right animation-delay-200">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 via-purple-400/20 to-accent-400/20 rounded-[2rem] blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/50">
              <Image
                src="/assets/pic-1.png"
                alt="Rajinikanth Vadla - AIOps MLOps DevOps Expert"
                width={600}
                height={500}
                className="w-full h-[480px] object-cover object-[center_20%]"
                priority
              />
            </div>
          </div>

          <div className="glass-dark rounded-2xl mt-6 shadow-2xl overflow-hidden animate-fade-in-up animation-delay-500">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-gray-500 font-mono">ai_ml_ops_status.sh</span>
            </div>
            <div className="p-4 font-mono text-sm space-y-2">
              {[
                { cmd: "mlflow models serve", out: "ML Model Deployed!" },
                { cmd: "python train_model.py", out: "Model Trained: 99.2% accuracy" },
                { cmd: "langchain agent run", out: "AI Agent Active" },
                { cmd: "kubectl get pods -n ml", out: "Infra Ready" },
              ].map((line) => (
                <div key={line.cmd}>
                  <div className="flex gap-2">
                    <span className="text-accent-400">$</span>
                    <span className="text-gray-400">{line.cmd}</span>
                  </div>
                  <div className="text-accent-400 font-semibold text-xs ml-4">
                    ✓ {line.out}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechBar() {
  const techs = [
    { name: "AIOps", color: "from-blue-500 to-indigo-600" },
    { name: "MLOps", color: "from-emerald-500 to-teal-600" },
    { name: "DevOps", color: "from-purple-500 to-violet-600" },
    { name: "AWS", color: "from-amber-500 to-orange-600" },
    { name: "Azure", color: "from-blue-500 to-cyan-600" },
    { name: "GCP", color: "from-red-500 to-rose-600" },
    { name: "Kubernetes", color: "from-blue-600 to-indigo-700" },
    { name: "Docker", color: "from-cyan-500 to-blue-600" },
    { name: "Terraform", color: "from-violet-500 to-purple-600" },
    { name: "AI Agents", color: "from-emerald-500 to-green-600" },
    { name: "GenAI", color: "from-rose-500 to-red-600" },
    { name: "LangChain", color: "from-orange-500 to-amber-600" },
  ];

  return (
    <section className="py-5 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {techs.map((t) => (
            <span key={t.name} className={`bg-gradient-to-r ${t.color} text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default`}>
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="mb-5 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse-dot" />
            Live Batch
          </span>
        </div>

        <div className="mb-8 animate-fade-in-up animation-delay-100">
          <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-red-500/20">
            Admissions Open &ndash; Limited Seats
          </span>
          <p className="mt-4 text-amber-400/90 font-bold text-sm uppercase tracking-wide">
            Course Already Started - Join Immediately!
          </p>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight animate-fade-in-up animation-delay-200">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">MLOps</span>
          <span className="text-gray-600 mx-3">&amp;</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">AIOps</span>
          <span className="text-gray-600 mx-3">&amp;</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">AI Agents</span>
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-gray-300 mb-2">Complete Training Program</h3>
        <p className="text-amber-300/80 font-semibold mb-10 max-w-xl mx-auto">
          Master Enterprise AI/ML Systems from Scratch to Production
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {[
            { icon: "📅", value: "JAN 3, 2026", label: "Start Date", border: "border-red-500/40", bg: "bg-red-500/10" },
            { icon: "🕗", value: "8 PM IST", label: "Daily Class", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
            { icon: "⏱️", value: "8-12 WEEKS", label: "Duration", border: "border-blue-500/40", bg: "bg-blue-500/10" },
            { icon: "📚", value: "1:45 HRS", label: "Each Session", border: "border-purple-500/40", bg: "bg-purple-500/10" },
          ].map((item, i) => (
            <div key={item.label} className={`border ${item.border} ${item.bg} rounded-2xl p-4 text-center backdrop-blur-sm animate-scale-in animation-delay-${(i + 3) * 100}`}>
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-white font-extrabold text-sm">{item.value}</div>
              <div className="text-gray-400 text-xs font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm font-semibold text-accent-400">
          {["Daily Notes & Recordings", "Lifetime Access", "1-on-1 Mentorship", "Job Assistance"].map((f) => (
            <span key={f} className="flex items-center gap-1.5 bg-accent-500/10 border border-accent-500/20 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              {f}
            </span>
          ))}
        </div>

        <div className="inline-block glass-dark rounded-3xl px-12 py-10 mb-10 glow-blue">
          <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Full Course Fee</div>
          <div className="text-white text-6xl font-black">
            ₹35,000 <span className="text-lg text-gray-500 font-normal">INR</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={LINKS.enroll}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine bg-gradient-to-r from-primary-600 to-indigo-500 text-white px-10 py-4 rounded-2xl font-extrabold text-lg shadow-2xl shadow-primary-600/30 hover:-translate-y-1 hover:shadow-primary-600/50 transition-all"
          >
            JOIN NOW &ndash; ₹35,000 INR &rarr;
          </a>
          <a
            href={LINKS.whatsappSyllabus}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/25 hover:-translate-y-1 hover:shadow-green-500/40 transition-all"
          >
            Get Syllabus &amp; Details
          </a>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Watch in Action"
          title="One Video Is Worth a Million Lines of Code"
          subtitle="See the depth of training. No basic tutorials here — we build real production systems."
          tagColor="text-danger-500"
        />
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {VIDEOS.map((v, i) => (
            <div key={v.id} className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover animate-fade-in-up animation-delay-${(i + 1) * 100}`}>
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
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-2xl font-bold hover:border-red-400 hover:text-red-500 hover:-translate-y-0.5 transition-all">
            Watch More on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function PassionSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-red-500/20">
          From My Heart
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
          Teaching Isn&apos;t My Job &mdash;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            It&apos;s My Passion
          </span>
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          I&apos;ve been in your shoes. Struggling with complex concepts, watching endless tutorials that never taught real-world skills.
          That frustration is exactly why I started teaching.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed mb-12">
          Every time a student lands their dream job, I feel like{" "}
          <strong className="text-white">I&apos;ve won too</strong>. This isn&apos;t about building a
          business &mdash; it&apos;s about <strong className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">building careers and changing lives</strong>.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: "🎯", title: "Real Experience", sub: "Not just theory" },
            { icon: "💬", title: "Personal Attention", sub: "I care about YOU" },
            { icon: "🤝", title: "Lifelong Support", sub: "Even after course" },
          ].map((item) => (
            <div key={item.title} className="glass-dark rounded-2xl p-6 text-center card-hover">
              <div className="text-4xl mb-3 animate-float">{item.icon}</div>
              <div className="text-white font-bold">{item.title}</div>
              <div className="text-gray-500 text-sm mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const iconMap: Record<string, string> = { robot: "🤖", brain: "🧠", zap: "⚡", cloud: "☁️" };
  const colorMap: Record<string, string> = {
    robot: "from-red-500 to-rose-600",
    brain: "from-blue-500 to-indigo-600",
    zap: "from-emerald-500 to-teal-600",
    cloud: "from-purple-500 to-violet-600",
  };

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="How I Can Help You"
          title="Let Me Guide Your Journey"
          subtitle="Deploy ML Models, Build AI Agents, Transform Your Career"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group relative bg-white rounded-2xl p-7 border border-gray-100 card-hover animate-fade-in-up animation-delay-${(i + 1) * 100}`}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[s.icon]} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                {iconMap[s.icon]}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.description}</p>
              <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <span className="text-lg">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Training Programs"
          title="Elite DevOps, MLOps, AI Training Courses"
          subtitle="Production-ready skills taught by an industry expert with 10+ years experience"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((c, i) => (
            <div
              key={c.title}
              className={`relative bg-white rounded-2xl p-6 flex flex-col border-2 card-hover animate-fade-in-up animation-delay-${(i + 1) * 100} ${
                c.featured
                  ? "border-accent-500 shadow-lg shadow-accent-500/10"
                  : "border-gray-100"
              }`}
            >
              {c.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-gradient-to-r from-accent-500 to-teal-500 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg shadow-accent-500/30 uppercase">
                    {c.badge}
                  </span>
                </div>
              )}
              {!c.featured && (
                <span className="self-start text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 bg-gray-100 text-gray-600">
                  {c.badge}
                </span>
              )}
              <h3 className={`font-bold text-lg mb-2 ${c.featured ? "text-accent-600 mt-3" : "text-gray-900"}`}>
                {c.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {c.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              {c.href.startsWith("/") ? (
                <Link href={c.href} className={`btn-shine w-full text-center py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5 ${
                  c.featured
                    ? "bg-gradient-to-r from-accent-500 to-teal-500 text-white shadow-lg shadow-accent-500/25"
                    : "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-600/20"
                }`}>
                  {c.ctaText}
                </Link>
              ) : (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-shine w-full text-center py-3 rounded-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-600/20 hover:-translate-y-0.5 transition-all">
                  {c.ctaText}
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/mlops-aiops-masterclass"
            className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-teal-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-accent-500/25 hover:-translate-y-1 hover:shadow-accent-500/40 transition-all"
          >
            View Complete Masterclass Syllabus &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <span className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3 block">My Promise to You</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              I&apos;ll Be With You Every Step
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              I&apos;m not just a trainer &mdash; I&apos;m your <strong>mentor and friend</strong>. I genuinely care about your growth.
              When you&apos;re stuck at 2 AM debugging code, I&apos;ve been there.
            </p>
            <div className="flex gap-8">
              {[
                { value: "60%", label: "Avg. Salary Increase", color: "from-emerald-500 to-teal-500" },
                { value: "500+", label: "Engineers Trained", color: "from-blue-500 to-indigo-500" },
                { value: "95%", label: "Job Success Rate", color: "from-purple-500 to-violet-500" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${s.color} stat-number`}>{s.value}</div>
                  <div className="text-xs text-gray-500 font-semibold mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🤖", title: "Real AI/ML Engineer", desc: "I build & deploy ML models, AI agents in production - not just theory!", gradient: "from-red-500/10 to-rose-500/5", border: "hover:border-red-300" },
              { icon: "🚀", title: "Hands-On Projects", desc: "Deploy your own ML model, build AI agents, create production systems.", gradient: "from-blue-500/10 to-indigo-500/5", border: "hover:border-blue-300" },
              { icon: "💰", title: "60% Salary Increase", desc: "Students land AI/ML roles at top companies with massive salary hikes.", gradient: "from-emerald-500/10 to-teal-500/5", border: "hover:border-emerald-300" },
            ].map((card, i) => (
              <div key={card.title} className={`flex items-start gap-5 bg-gradient-to-r ${card.gradient} border border-gray-100 ${card.border} rounded-2xl p-6 card-hover animate-fade-in-up animation-delay-${(i + 1) * 100}`}>
                <span className="text-4xl shrink-0 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{card.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">{card.title}</h4>
                  <p className="text-gray-500">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

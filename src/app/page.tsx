import Image from "next/image";
import Link from "next/link";
import { LINKS, STATS, COURSES, STRUCTURED_DATA } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.faq) }} />
      <HeroSection />
      <LogoBar />
      <AboutPreview />
      <ServicesSection />
      <CourseBanner />
      <VideoSection />
      <CoursesSection />
      <TrustSection />
      <MentorshipSection />
      <CTASection
        title="Training and mentorship, in one place"
        subtitle="Join a cohort when you want structure, or book mentorship when you need your career story, transition, or interviews sharpened. People from many countries reach out; online sessions make that simple."
      />
      <SuccessStories />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center border-b border-stone-200 bg-stone-100 surface-paper overflow-hidden">
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-16 items-center px-6 py-24 lg:py-28 w-full">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-500 mb-6">
            Hands-on training, mentorship, production focus
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl font-bold text-stone-900 leading-[1.08] tracking-tight mb-6">
            Rajinikanth{" "}
            <span className="text-accent-600">Vadla</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 font-medium mb-4 leading-relaxed max-w-xl">
            MLOps, AIOps, GenAI, AI agents, and LLMOps - taught from real enterprise delivery, not slide decks.
          </p>
          <p className="text-stone-600 text-base max-w-xl mb-10 leading-relaxed border-l-2 border-accent-500 pl-5">
            I help engineers ship models and AI systems that survive production. Seven-plus years on the job;
            hundreds of people have moved into roles they wanted with clearer confidence. If you are deciding on a
            move, a pivot, or how to tell your story in interviews, mentorship is open to you from anywhere in the world.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={LINKS.enroll}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-stone-900 text-stone-50 px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-stone-800 transition-colors"
            >
              Enroll in a cohort
              <span className="inline-block ml-2">&rarr;</span>
            </a>
            <Link
              href="/mentorship"
              className="inline-flex items-center border border-accent-600 text-accent-700 px-7 py-3.5 text-sm font-semibold hover:bg-accent-50 transition-colors"
            >
              Career mentorship
            </Link>
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-stone-400 text-stone-800 px-7 py-3.5 text-sm font-semibold hover:border-stone-900 hover:bg-white/80 transition-colors"
            >
              YouTube
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-stone-300/80">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-stone-900 stat-number">{s.value}</div>
                <div className="text-xs text-stone-500 font-medium mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-stretch gap-6">
          <div className="panel p-2 lg:p-3">
            <Image
              src="/assets/pic-1.png"
              alt="Rajinikanth Vadla - MLOps AIOps GenAI AI Agents Expert and Trainer"
              width={480}
              height={580}
              className="w-full object-cover object-[center_15%] h-[420px] lg:h-[520px]"
              priority
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-stone-600">
            <div className="panel px-4 py-3">
              <p className="font-semibold text-stone-900">500+ engineers</p>
              <p className="text-stone-500 mt-0.5">Through live programs and mentorship.</p>
            </div>
            <div className="panel px-4 py-3">
              <p className="font-semibold text-stone-900">4.9 average rating</p>
              <p className="text-stone-500 mt-0.5">From people who needed outcomes, not certificates.</p>
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
                className="w-11 h-11 border border-stone-300 bg-white flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-900 transition-colors"
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
    "Kubernetes", "Docker", "AWS", "Azure", "GCP", "Terraform",
    "MLflow", "Kubeflow", "RAG", "CI/CD",
  ];
  return (
    <section className="py-5 border-y border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {techs.map((t) => (
            <span key={t} className="text-sm text-stone-500 tracking-wide hover:text-stone-900 transition-colors cursor-default">
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
    <section className="py-24 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-600 mb-4 block">About</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-6">
              I don&apos;t just teach. I stay close until the work makes sense on your machine.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              After seven-plus years shipping AI/ML systems in real environments, I focus on what hiring managers
              and teams actually expect: reproducible pipelines, observability, and honest tradeoffs.
            </p>
            <p className="text-stone-500 italic leading-relaxed mb-8">
              When you succeed, I succeed. That has stayed constant across every cohort.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["Docker", "Kubernetes", "MLflow", "LangChain", "AI Agents", "AWS", "Azure", "GCP"].map((s) => (
                <span key={s} className="px-3 py-1.5 border border-stone-200 bg-stone-50 text-stone-700 text-sm font-medium hover:border-stone-400 transition-colors">
                  {s}
                </span>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-accent-600 font-semibold underline decoration-accent-500/40 underline-offset-4 hover:decoration-accent-600">
              Read the longer version <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "7+", label: "Years in production roles" },
              { value: "500+", label: "People trained across programs" },
              { value: "95%", label: "Reported role / growth outcomes*" },
              { value: "60%", label: "Typical comp movement (cohort data)*" },
            ].map((s) => (
              <div key={s.label} className="panel p-6 text-left">
                <div className="font-display text-3xl md:text-4xl font-bold text-stone-900 stat-number">{s.value}</div>
                <div className="text-sm text-stone-600 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
            <p className="col-span-2 text-xs text-stone-400 mt-1">* Self-reported; not a guarantee of future results.</p>
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
    { icon: "⚡", title: "AIOps & Automation", desc: "Signals, baselines, and automation when systems misbehave at scale.", href: "/aiops-training" },
    { icon: "☁️", title: "Multi-Cloud & K8s", desc: "AWS, Azure, GCP - the boring, important parts that keep models online.", href: "/courses" },
    { icon: "✨", title: "AI Tools for Productivity", desc: "Practical use of modern assistants without losing engineering judgment.", href: "/ai-tools-productivity" },
  ];

  return (
    <section className="py-24 md:py-28 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Expertise" title="Where I spend my time with students" subtitle="Narrow topics, deep reps - the kind of depth you get from someone still shipping." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.map((s) => (
            <Link key={s.title} href={s.href} className="group bg-white p-7 border border-stone-200 card-hover">
              <div className="w-12 h-12 border border-stone-200 bg-stone-50 flex items-center justify-center text-xl mb-5 group-hover:border-accent-500/50 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-stone-900 text-lg mb-2 group-hover:text-accent-600 transition-colors">{s.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-accent-600 font-semibold text-sm inline-flex items-center gap-1">
                Details <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
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
    <section className="relative bg-stone-900 text-stone-100 border-y border-stone-800">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 mb-5">Live cohort, limited seats</p>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          MLOps &amp; AIOps Masterclass
        </h2>
        <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          A full arc from solid DevOps habits through MLOps, LLMOps, AIOps, and agents - with labs that mirror how teams
          actually review and ship work.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl mx-auto mb-10 text-left">
          {[
            { label: "Duration", value: "8–12 weeks" },
            { label: "Format", value: "Live online" },
            { label: "Time", value: "8 PM IST" },
            { label: "Fee", value: "₹35,000" },
          ].map((item) => (
            <div key={item.label} className="border border-stone-700 bg-stone-950/50 px-4 py-3">
              <div className="text-white font-semibold text-sm">{item.value}</div>
              <div className="text-stone-500 text-xs mt-1 uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center bg-white text-stone-900 px-8 py-3.5 text-sm font-semibold hover:bg-stone-100 transition-colors">
            Join this batch for ₹35,000
          </a>
          <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center border border-stone-500 text-stone-100 px-8 py-3.5 text-sm font-semibold hover:bg-stone-800 transition-colors">
            WhatsApp for syllabus
          </a>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="py-24 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Watch &amp; learn"
          title="Recent lab on the channel"
          subtitle="Long-form walkthroughs - the same tone as class, just on the open web."
        />
        <div className="max-w-3xl mx-auto mb-10">
          <div className="panel overflow-hidden">
            <div className="relative pb-[56.25%] bg-stone-900">
              <iframe
                src="https://www.youtube.com/embed/eXsltT8baj0?rel=0"
                title="AIOps Lab Day-01: Detect CPU Anomalies"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6 border-t border-stone-200">
              <h3 className="font-display font-bold text-stone-900 text-lg mb-2">AIOps Lab Day-01: Detect CPU Anomalies</h3>
              <p className="text-stone-600 text-sm leading-relaxed">Prometheus, Grafana, and a pragmatic ML pass on CPU behavior.</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 text-sm font-semibold hover:bg-stone-800 transition-colors">
            Open the channel &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="py-24 md:py-28 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Programs"
          title="Pick the lane that matches your next role"
          subtitle="Each path is built around deliverables you can explain in an interview."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COURSES.map((c) => (
            <article
              key={c.title}
              className={`relative bg-white p-7 flex flex-col border card-hover ${
                c.featured ? "border-accent-500 border-l-4 border-l-accent-600" : "border-stone-200"
              }`}
            >
              {c.featured && (
                <div className="mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">{c.badge}</span>
                </div>
              )}
              {!c.featured && (
                <span className="self-start text-[11px] font-semibold uppercase tracking-widest text-stone-500 mb-3">
                  {c.badge}
                </span>
              )}
              <h3 className={`font-display font-bold text-lg mb-2 ${c.featured ? "text-stone-900" : "text-stone-900"}`}>
                {c.title}
              </h3>
              <p className="text-sm text-stone-600 mb-5 leading-relaxed">{c.description}</p>
              <ul className="space-y-2 mb-7 flex-1">
                {c.features.map((f) => (
                  <li key={f} className="text-sm text-stone-600 flex items-start gap-2">
                    <span className="text-accent-600 mt-0.5 shrink-0" aria-hidden>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {c.href.startsWith("/") ? (
                <Link href={c.href} className={`w-full text-center py-3 text-sm font-semibold transition-colors ${
                  c.featured ? "bg-accent-600 text-white hover:bg-accent-700" : "bg-stone-900 text-white hover:bg-stone-800"
                }`}>
                  {c.ctaText}
                </Link>
              ) : (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors">
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

function MentorshipSection() {
  return (
    <section className="py-20 md:py-24 bg-stone-50 border-y border-stone-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3 block">Mentorship</span>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
          Ask about your career or transformation, from anywhere
        </h2>
        <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-8">
          Not every question needs a full course first. If you are in another country or time zone and want a straight
          conversation about moving toward MLOps, AIOps, cloud, or AI engineering, you can book a private session or
          write on WhatsApp with context. I reply when I can and keep advice practical.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <Link
            href="/mentorship"
            className="inline-flex justify-center bg-stone-900 text-white px-7 py-3 text-sm font-semibold hover:bg-stone-800 transition-colors"
          >
            Read how mentorship works
          </Link>
          <a
            href={LINKS.topmate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center border border-stone-400 text-stone-900 px-7 py-3 text-sm font-semibold hover:border-stone-900 transition-colors"
          >
            Book on Topmate (worldwide)
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center bg-emerald-700 text-white px-7 py-3 text-sm font-semibold hover:bg-emerald-800 transition-colors"
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
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-600 mb-4 block">How I work with you</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-6">
              Clear expectations, direct feedback, and room to be stuck without shame.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-10">
              Teaching is only part of it. The rest is judgment under uncertainty - the same thing you need on the job.
              I stay in the weeds with you until the concepts feel obvious in hindsight.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-8">
              {[
                { value: "60%", label: "Avg. reported hike*" },
                { value: "500+", label: "Alumni network" },
                { value: "95%", label: "Positive outcomes*" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-stone-900 stat-number">{s.value}</div>
                  <div className="text-xs text-stone-500 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-4">* Aggregated from cohort surveys; individual results vary.</p>
          </div>

          <div className="space-y-3">
            {[
              { icon: "🤖", title: "Still shipping", desc: "Lessons track what is defensible in production today, not last year’s hype cycle." },
              { icon: "🚀", title: "Projects you can defend", desc: "Artifacts you can walk through line by line in a technical screen." },
              { icon: "💰", title: "Career context", desc: "We talk about scope, titles, and negotiation with the same honesty as we talk about YAML." },
              { icon: "🎯", title: "Interview prep", desc: "Resume passes, mock rounds, and blunt feedback where it helps." },
              { icon: "🌍", title: "Open to the world", desc: "Mentorship is online, so students and professionals from many regions book time for career and transformation questions, not only India." },
            ].map((card) => (
              <div key={card.title} className="flex items-start gap-4 panel p-5 card-hover">
                <span className="text-2xl shrink-0" aria-hidden>{card.icon}</span>
                <div>
                  <h4 className="font-display font-bold text-stone-900 mb-1">{card.title}</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

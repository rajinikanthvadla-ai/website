import type { Metadata } from "next";
import Image from "next/image";
import "./automation.css";
import { LINKS, AI_AUTOMATION_DURATION, STRUCTURED_DATA, COURSE_ZOOM_DEMOS } from "@/lib/constants";
import {
  AI_AUTOMATION_TAGLINE,
  AI_AUTOMATION_HERO_SUB,
  AI_AUTOMATION_HOOK,
  AI_AUTOMATION_PRICE,
  AI_AUTOMATION_PRICE_NOTE,
  AI_AUTOMATION_INCLUDES,
  AI_AUTOMATION_SHIP_MODE,
  AI_AUTOMATION_TOOLS,
  AI_AUTOMATION_AGENTS,
  AI_AUTOMATION_CAPSTONE_STEPS,
  AI_AUTOMATION_PRODUCTION,
  AI_AUTOMATION_PORTFOLIO_DELIVERABLES,
  AI_AUTOMATION_RUNBOOKS,
  AI_AUTOMATION_BUSINESS_METRICS,
  AI_AUTOMATION_OPEN_PLATFORM,
  AI_AUTOMATION_MENTORSHIP,
  AI_AUTOMATION_FOR_YOU,
  AI_AUTOMATION_ENTERPRISE,
  AI_AUTOMATION_EVOLVING_SYLLABUS,
  AI_AUTOMATION_PREREQUISITES,
  AI_AUTOMATION_FAQS,
} from "@/lib/ai-automation-content";
import AutomationSyllabus from "@/components/automation/AutomationSyllabus";
import CourseSectionNav from "@/components/automation/CourseSectionNav";
import StickyEnrollBar from "@/components/automation/StickyEnrollBar";
import { GfxCard, GfxGrid } from "@/components/automation/GfxCard";
import AgentFlow from "@/components/automation/AgentFlow";
import LiveZoomDemo from "@/components/LiveZoomDemo";
import CourseVideoSection from "@/components/CourseVideoSection";
import { COURSE_VIDEOS } from "@/lib/course-videos";
import {
  OPEN_PLATFORM_SKETCH,
  SECTION_SKETCH,
  SHIP_MODE_SKETCH,
  sketch,
  sketchForAgent,
  sketchForEnterprise,
  sketchForRole,
} from "@/lib/sketch-assets";

export const metadata: Metadata = {
  title: "AI Automation Course | Build Company Agents | ₹20,000 Lifetime Access",
  description:
    "2-month live AI Automation course: incident, RAG, MCP, HR agents. ₹20,000 with lifetime recordings, 1-on-1 mentorship. Watch free course videos on this page. Rajinikanth Vadla.",
  keywords: [
    "AI automation course",
    "AI agents course",
    "AI agentic course",
    "MCP course",
    "company AI agents training",
    "AWS Bedrock agents course",
    "Rajinikanth Vadla AI Automation",
  ],
  openGraph: {
    title: "AI Automation Course | ₹20,000 | Lifetime Recordings | Mentorship",
    description: "Build company AI agents. Org runbooks. Business metrics. Evolving syllabus.",
  },
  alternates: { canonical: "https://www.rajinikanthvadla.com/courses/ai-automation/" },
};

export default function AIAutomationCoursePage() {
  const buildAgents = AI_AUTOMATION_AGENTS.filter((a) => a.buildInCourse);
  const templateAgents = AI_AUTOMATION_AGENTS.filter((a) => !a.buildInCourse);

  return (
    <div className="automation-course notion-sketch-theme pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />

      {/* HERO */}
      <section className="auto-hero">
        <div className="auto-hero-grid-bg" aria-hidden />
        <div className="auto-hero-watermark" aria-hidden>AGENTS</div>
        <div className="auto-hero-inner">
          <div className="auto-hero-copy">
            <span className="auto-label text-orange-400 mb-5 block">AI-Powered Automation Efficiency</span>
            <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
              <span className="auto-pill auto-pill--hot">Cohort Open</span>
              <span className="auto-pill">{AI_AUTOMATION_DURATION} Live</span>
            </div>
            <h1 className="auto-display font-bold">{AI_AUTOMATION_TAGLINE}</h1>
            <p className="auto-hero-lead">{AI_AUTOMATION_HERO_SUB}</p>
            <div className="auto-hero-pillars">
              {["12 Agents", "Org Runbooks", "Business Metrics", "Vibe Coding", "MCP", "Demo Day"].map((t) => (
                <span key={t} className="auto-pill">{t}</span>
              ))}
            </div>
            <a href="#enroll" className="auto-hero-cta hidden lg:inline-flex">
              Enroll {AI_AUTOMATION_PRICE} &rarr;
            </a>
            <a href={LINKS.zoomAiAutomation} target="_blank" rel="noopener noreferrer" className="auto-hero-cta-outline hidden lg:inline-flex ml-3">
              Join Live Demo
            </a>
            <a href="#curriculum" className="auto-hero-cta-outline hidden lg:inline-flex ml-3">
              View Syllabus
            </a>
          </div>

          <div className="auto-price-tower">
            <p className="auto-label text-orange-400 mb-3">Investment</p>
            <p className="auto-price-tower-amount">{AI_AUTOMATION_PRICE}</p>
            <p className="text-slate-400 text-sm mt-2 mb-6">{AI_AUTOMATION_PRICE_NOTE}</p>
            {[
              "Lifetime recording access",
              "1-on-1 mentorship from Rajinikanth",
              "Org-specific runbook training",
              "Business metrics and ROI one-pagers",
              "Syllabus evolves with your ideas",
              "5 to 6 portfolio agent builds",
            ].map((text) => (
              <div key={text} className="auto-price-tower-row">
                <span className="text-green-400 shrink-0 text-lg">✓</span>
                {text}
              </div>
            ))}
            <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="auto-price-tower-btn">
              Enroll on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="auto-value-strip">
        {AI_AUTOMATION_INCLUDES.map((item) => (
          <div key={item.label} className="auto-value-strip-cell">
            <div className="text-lg mb-1">{item.icon}</div>
            <div className="text-xs font-bold">{item.value}</div>
            <div className="text-[10px] opacity-75 uppercase tracking-wide mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      <LiveZoomDemo demo={COURSE_ZOOM_DEMOS.aiAutomation} />

      <CourseVideoSection
        title="Watch the AI Automation course on YouTube"
        subtitle="Live demos and labs from the AI-Powered Automation Engineering course — MCP, Bedrock agents and company AI agents."
        videos={[...COURSE_VIDEOS.aiAutomation]}
        variant="white"
      />

      <div className="auto-marquee-wrap" aria-hidden>
        <div className="auto-marquee">
          {[...AI_AUTOMATION_TOOLS, ...AI_AUTOMATION_TOOLS].map((t, i) => (
            <span key={`${t}-${i}`} className="text-slate-500 font-bold text-xs uppercase tracking-widest px-8">{t}</span>
          ))}
        </div>
      </div>

      <CourseSectionNav />

      {/* FOR YOU — graphical cards */}
      <section className="auto-section bg-[#fafafa]" id="for-you">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">This course is for you</span>
            <h2>{AI_AUTOMATION_FOR_YOU.title}</h2>
            <p className="font-bold text-slate-900 !text-base mb-2">{AI_AUTOMATION_FOR_YOU.subtitle}</p>
            <p>{AI_AUTOMATION_FOR_YOU.desc}</p>
          </div>
          <GfxGrid>
            {AI_AUTOMATION_FOR_YOU.roles.map((r, i) => (
              <GfxCard
                key={r.role}
                icon={r.icon}
                title={r.role}
                sub="You gain"
                items={[r.gain]}
                sketch={sketchForRole(r.role)}
                sketchAlt={`${r.role} role illustration`}
              />
            ))}
          </GfxGrid>
        </div>
      </section>

      {/* AGENTS — bento graphical cards */}
      <section className="auto-section auto-section--agents bg-white" id="agents">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Company agents</span>
            <h2>What you build standing up in your org</h2>
            <p>{AI_AUTOMATION_HOOK}</p>
          </div>
          <p className="notion-board-section-label">You build in the course</p>
          <GfxGrid bento>
            {buildAgents.map((a, i) => (
              <GfxCard
                key={a.id}
                icon={a.icon}
                title={a.name}
                sub={a.tagline}
                items={a.automations}
                tags={a.tools}
                variant={i === 0 ? "featured" : "light"}
                size={a.bento ?? "normal"}
                sketch={sketchForAgent(a.id)}
                sketchAlt={`${a.name} agent illustration`}
              />
            ))}
          </GfxGrid>
          <p className="notion-board-section-label mt-10">Templates you take home</p>
          <GfxGrid>
            {templateAgents.map((a, i) => (
              <GfxCard
                key={a.id}
                icon={a.icon}
                title={a.name}
                sub={a.tagline}
                items={a.automations.slice(0, 3)}
                tags={a.tools}
                variant="ghost"
                sketch={sketchForAgent(a.id)}
                sketchAlt={`${a.name} agent template`}
              />
            ))}
          </GfxGrid>
        </div>
      </section>

      {/* RUNBOOKS + METRICS */}
      <section className="auto-section auto-section--glow" id="runbooks">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Org ready</span>
            <h2>Runbooks and ROI your manager signs off on</h2>
          </div>
          <div className="auto-split-flow">
            <GfxCard
              variant="blue"
              title={AI_AUTOMATION_RUNBOOKS.title}
              sub="Runbooks"
              sketch={sketch(SECTION_SKETCH.runbooks)}
              sketchAlt="Planning team illustration"
            >
              <p className="text-slate-600 text-sm mb-4">{AI_AUTOMATION_RUNBOOKS.desc}</p>
              <ul className="notion-board-list">
                {AI_AUTOMATION_RUNBOOKS.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </GfxCard>
            <GfxCard
              variant="warm"
              title={AI_AUTOMATION_BUSINESS_METRICS.title}
              sub="Metrics"
              sketch={sketch(SECTION_SKETCH.metrics)}
              sketchAlt="Focused work illustration"
            >
              <p className="text-slate-600 text-sm mb-4">{AI_AUTOMATION_BUSINESS_METRICS.desc}</p>
              <div className="grid grid-cols-2 gap-2">
                {AI_AUTOMATION_BUSINESS_METRICS.metrics.map((m) => (
                  <div key={m.label} className="bg-white border border-orange-200 rounded-xl p-3">
                    <span className="text-lg">{m.icon}</span>
                    <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">{m.label}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{m.example}</p>
                  </div>
                ))}
              </div>
            </GfxCard>
          </div>
        </div>
      </section>

      {/* ENTERPRISE — dark cards */}
      <section className="auto-section auto-enterprise-bg" id="enterprise">
        <div className="auto-page-col relative z-10">
          <div className="notion-section-head notion-section-head--light">
            <span className="notion-section-eyebrow">Enterprise</span>
            <h2>{AI_AUTOMATION_ENTERPRISE.title}</h2>
            <p>{AI_AUTOMATION_ENTERPRISE.subtitle}</p>
          </div>
          <GfxGrid>
            {AI_AUTOMATION_ENTERPRISE.items.map((item, i) => (
              <GfxCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                items={[item.desc]}
                variant="dark"
                sketch={sketchForEnterprise(item.title)}
                sketchAlt={item.title}
              />
            ))}
          </GfxGrid>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {AI_AUTOMATION_ENTERPRISE.companies.map((c) => (
              <span key={c} className="auto-pill border-slate-600 text-slate-300">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CAPSTONE — agent flow only */}
      <section className="auto-section bg-[#fafafa]" id="capstone">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Agent flow</span>
            <h2>One incident. Six agents. Full ROI.</h2>
            <p>The capstone you demo on graduation day, wired like real companies deploy.</p>
          </div>
          <div className="auto-capstone-layout">
            <AgentFlow steps={AI_AUTOMATION_CAPSTONE_STEPS} title="Connected agent flow" />
            <div className="auto-capstone-side">
              <GfxCard variant="blue" title="Production ready" sketch={sketch(SECTION_SKETCH.productionReady)} sketchAlt="Production">
                <ul className="notion-board-list mt-2">
                  {AI_AUTOMATION_PRODUCTION.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </GfxCard>
              <GfxCard variant="warm" title="Portfolio pack" sketch={sketch(SECTION_SKETCH.portfolio)} sketchAlt="Portfolio">
                <ul className="notion-board-list mt-2">
                  {AI_AUTOMATION_PORTFOLIO_DELIVERABLES.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </GfxCard>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN PLATFORM — 3 cards */}
      <section className="auto-section auto-section--platform">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">Open platform</span>
            <h2>{AI_AUTOMATION_OPEN_PLATFORM.title}</h2>
            <p>{AI_AUTOMATION_OPEN_PLATFORM.desc}</p>
            <p className="font-bold text-orange-600 mt-3">{AI_AUTOMATION_OPEN_PLATFORM.cta}</p>
          </div>
          <GfxGrid className="notion-board-grid--three">
            {AI_AUTOMATION_OPEN_PLATFORM.steps.map((s, i) => (
              <GfxCard
                key={s.num}
                icon={s.num}
                title={s.label}
                items={[s.desc]}
                variant="featured"
                sketch={sketch(OPEN_PLATFORM_SKETCH[s.num])}
                sketchAlt={s.label}
              />
            ))}
          </GfxGrid>
        </div>
      </section>

      {/* SYLLABUS — flow layout only here */}
      <section className="auto-section auto-section--syllabus" id="curriculum">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow notion-section-eyebrow--syllabus">Course syllabus</span>
            <h2 className="auto-syllabus-title">Full {AI_AUTOMATION_DURATION} Syllabus</h2>
            <p className="auto-syllabus-sub">
              6 modules. Every topic, lab, and build outcome. Tap any module to see the full breakdown.
            </p>
          </div>

          <div className="notion-syllabus-evolving-box">
            <Image
              src={sketch(SECTION_SKETCH.evolvingSyllabus)}
              alt="Team learning illustration"
              width={180}
              height={120}
              className="mx-auto"
            />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">{AI_AUTOMATION_EVOLVING_SYLLABUS.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{AI_AUTOMATION_EVOLVING_SYLLABUS.desc}</p>
              <ul className="notion-board-list">
                {AI_AUTOMATION_EVOLVING_SYLLABUS.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>

          <AutomationSyllabus />
        </div>
      </section>

      {/* SHIP MODE — cards */}
      <section className="auto-section auto-section--ship">
        <div className="auto-page-col">
          <div className="notion-section-head">
            <span className="notion-section-eyebrow">How you work</span>
            <h2>Ship mode</h2>
          </div>
          <GfxGrid className="notion-board-grid--three">
            {AI_AUTOMATION_SHIP_MODE.map((item, i) => (
              <GfxCard
                key={item.term}
                icon="⚡"
                title={item.term}
                items={[item.desc]}
                sketch={sketch(SHIP_MODE_SKETCH[item.term])}
                sketchAlt={item.term}
              />
            ))}
          </GfxGrid>
        </div>
      </section>

      {/* MENTORSHIP */}
      <section className="auto-section auto-section--mentor">
        <div className="auto-page-col">
          <div className="auto-mentor-flow">
            <div className="auto-photo-stand shrink-0">
              <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla" width={280} height={350} priority />
              <span className="auto-photo-stand-badge">1-on-1 Mentor</span>
            </div>
            <GfxCard
              variant="featured"
              title={AI_AUTOMATION_MENTORSHIP.title}
              sketch={sketch(SECTION_SKETCH.mentorship)}
              sketchAlt="Mentorship conversation"
            >
              <span className="auto-section-tag mb-4 inline-block mt-1">Included in {AI_AUTOMATION_PRICE}</span>
              <p className="text-slate-600 leading-relaxed mb-4">{AI_AUTOMATION_MENTORSHIP.desc}</p>
              <ul className="text-sm text-slate-700 space-y-2">
                {AI_AUTOMATION_MENTORSHIP.perks.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-blue-700 font-bold">✓</span>{p}</li>
                ))}
              </ul>
              <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="inline-flex mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800">
                Talk before you enroll
              </a>
            </GfxCard>
          </div>
        </div>
      </section>

      {/* ENROLL */}
      <section className="auto-section auto-section--enroll" id="enroll">
        <div className="auto-page-col">
          <div className="auto-enroll-tower">
            <span className="auto-section-tag mb-4 inline-block">Join the next cohort</span>
            <p className="auto-enroll-amount">{AI_AUTOMATION_PRICE}</p>
            <p className="text-slate-500 text-sm mt-2 mb-6">{AI_AUTOMATION_PRICE_NOTE}</p>
            <ul className="text-left text-sm text-slate-600 space-y-2 mb-8">
              {AI_AUTOMATION_PREREQUISITES.map((item) => (
                <li key={item} className="flex gap-2"><span className="text-blue-700 font-bold">✓</span>{item}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600">
                WhatsApp Enroll
              </a>
              <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800">
                Book on Topmate
              </a>
            </div>
            <p className="text-slate-400 text-xs mt-5">Team batches | Company invoices | Reply within 24h</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="auto-section auto-section--faq" id="faq">
        <div className="auto-page-col max-w-3xl">
          <div className="auto-section-head !mb-10">
            <span className="auto-section-tag">Questions</span>
            <h2>FAQ</h2>
          </div>
          <div className="space-y-3">
            {AI_AUTOMATION_FAQS.map((faq) => (
              <details key={faq.q} className="auto-faq group">
                <summary className="flex justify-between gap-4 p-5 cursor-pointer list-none font-bold text-slate-900 hover:text-blue-700 text-sm">
                  {faq.q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <div className="px-5 pb-5"><p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="auto-final-cta">
        <div className="auto-page-col relative z-10">
          <h2 className="auto-display">{AI_AUTOMATION_PRICE}. Lifetime access. Real agents.</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Whatever you are today, you leave as an AI Automation Engineer. Your ideas shape the program.
          </p>
          <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="auto-final-btn">
            Enroll Now &rarr;
          </a>
        </div>
      </section>

      <StickyEnrollBar />
    </div>
  );
}

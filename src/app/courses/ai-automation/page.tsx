import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, AI_AUTOMATION_SYLLABUS, STRUCTURED_DATA } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "AI-Powered Automation Efficiency Course — Enterprise AI Tools Training",
  description:
    "30–35 day intensive (extendable to 45 days) enterprise AI automation course. Master Cursor, Claude AI, OpenAI Codex, ChatGPT, AWS Bedrock Agents, open-source AI agents, Lovable, Bolt. Skills enterprises hire for in JDs.",
  keywords: [
    "AI-powered automation course",
    "Cursor IDE training",
    "Claude AI enterprise training",
    "OpenAI Codex course",
    "AWS Bedrock agents training",
    "enterprise AI automation",
    "AI coding tools course",
    "GitHub Copilot training",
    "LangChain agents course",
    "AI automation engineer JD skills",
    "enterprise AI tools training",
    "AI-assisted development course",
  ],
  openGraph: {
    title: "AI-Powered Automation Efficiency — Enterprise AI Tools Training by Rajinikanth Vadla",
    description:
      "30–35 day intensive. Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents, open-source agents. Skills from enterprise JDs. Starting soon.",
  },
  alternates: {
    canonical: "https://www.rajinikanthvadla.com/courses/ai-automation/",
  },
};

export default function AIAutomationCoursePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />
      <HeroBanner />
      <CourseHighlights />
      <WhoIsThisFor />
      <FullSyllabus />
      <ToolsYouWillUse />
      <CTASection
        title="Ready to master AI-Powered Automation?"
        subtitle="Join the next batch. 30–35 days of focused training on the exact tools enterprises hire for. Limited seats, live online, localized pricing."
      />
      <SuccessStories />
    </>
  );
}

function HeroBanner() {
  return (
    <section className="bg-blue-700 text-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold py-1.5 px-4 rounded uppercase tracking-wide">
            <span className="w-2 h-2 bg-white rounded-full" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
            Starting Soon
          </span>
          <span className="bg-orange-500 text-white text-xs font-bold py-1.5 px-4 rounded uppercase tracking-wide">
            Enterprise Level
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          AI-Powered Automation<br />Efficiency
        </h1>

        <p className="text-blue-100 text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed">
          Master the AI tools that enterprise JDs demand — Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents,
          open-source agents, and rapid prototyping tools like Lovable and Bolt.
        </p>
        <p className="text-blue-200 text-base mb-10 max-w-xl mx-auto">
          Not theory. Not hype. The actual skills hiring managers screen for.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {[
            { value: "30–35 Days", label: "Duration" },
            { value: "45 Days", label: "Extendable To" },
            { value: "6 Modules", label: "Focused Training" },
            { value: "Live Online", label: "Format" },
          ].map((item) => (
            <div key={item.label} className="bg-blue-800 border border-blue-600 rounded-lg px-4 py-5 text-center">
              <div className="text-white font-bold text-xl">{item.value}</div>
              <div className="text-blue-300 text-xs mt-1 uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-orange-500 text-white px-10 py-4 rounded-lg text-base font-bold hover:bg-orange-600 transition-colors">
            Enroll via WhatsApp &rarr;
          </a>
          <a href="#full-syllabus" className="inline-flex justify-center items-center border-2 border-blue-400 text-white px-10 py-4 rounded-lg text-base font-semibold hover:bg-blue-600 transition-colors">
            View Full Syllabus
          </a>
        </div>
        <p className="text-blue-300 text-sm">Localized pricing · Limited seats per batch</p>
      </div>
    </section>
  );
}

function CourseHighlights() {
  const highlights = [
    {
      icon: "💻",
      title: "AI-Assisted Development",
      desc: "Cursor, GitHub Copilot, OpenAI Codex — write production code 5x faster. The skill every enterprise now expects in JDs.",
    },
    {
      icon: "🤖",
      title: "LLM APIs for Enterprise",
      desc: "ChatGPT, Claude, Gemini APIs — build internal tools, automate SOPs, and integrate LLMs into enterprise workflows.",
    },
    {
      icon: "☁️",
      title: "AWS Bedrock Agents",
      desc: "Production Bedrock agents with action groups, knowledge bases, and guardrails. The cloud AI service enterprises adopt first.",
    },
    {
      icon: "🔗",
      title: "Open-Source AI Agents",
      desc: "LangChain, CrewAI, AutoGen, n8n — multi-agent automation with full control. Self-hosted, compliant, enterprise-ready.",
    },
    {
      icon: "⚡",
      title: "Rapid Prototyping Tools",
      desc: "Lovable, Bolt, v0, Replit Agent — prototype internal tools in hours instead of weeks. Know when to use them vs custom code.",
    },
    {
      icon: "🛡️",
      title: "Governance & Career Prep",
      desc: "AI security, compliance, interview prep, and resume optimization — everything to land the AI automation role.",
    },
  ];

  return (
    <section className="py-24 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="What You Will Learn"
          title="Skills straight from enterprise job descriptions"
          subtitle="Every module maps to what hiring managers and technical leads actually screen for in AI automation roles."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((h) => (
            <div key={h.title} className="panel p-7 card-hover group">
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl mb-5">
                {h.icon}
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-3 group-hover:text-blue-700 transition-colors">{h.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoIsThisFor() {
  const personas = [
    { icon: "👨‍💻", title: "Software Engineers", desc: "Who want to add AI automation skills to their toolkit and land better roles" },
    { icon: "🔧", title: "DevOps / MLOps Engineers", desc: "Looking to automate pipelines and infrastructure with AI tools" },
    { icon: "🏢", title: "Enterprise Developers", desc: "Building internal tools and automations for their organizations" },
    { icon: "🎓", title: "Tech Leads", desc: "Evaluating and adopting AI tools for their engineering teams" },
    { icon: "📊", title: "QA / Automation Engineers", desc: "Who want to bring AI into testing and quality workflows" },
    { icon: "🌍", title: "Career Changers", desc: "Experienced professionals pivoting to AI-first engineering roles" },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Who Is This For"
          title="Built for working professionals"
          subtitle="You already know how to code. This course teaches you to leverage AI tools the way enterprises expect."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((p) => (
            <div key={p.title} className="panel p-6 flex items-start gap-4 card-hover">
              <span className="text-3xl shrink-0">{p.icon}</span>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-1">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullSyllabus() {
  return (
    <section className="py-24 md:py-28 bg-white" id="full-syllabus">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Complete Syllabus"
          title="6 Modules · 30–35 Days · Extendable to 45"
          subtitle="Every topic maps to enterprise JD requirements. Hands-on projects with every module."
        />

        <div className="space-y-5">
          {AI_AUTOMATION_SYLLABUS.map((mod) => (
            <div key={mod.module} className="panel overflow-hidden card-hover group">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-72 lg:w-80 shrink-0 p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-700 text-white flex items-center justify-center text-lg font-bold">
                      {mod.module}
                    </div>
                    <span className="text-sm text-orange-600 font-bold">{mod.duration}</span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-xl leading-snug group-hover:text-blue-700 transition-colors">
                    {mod.title}
                  </h3>
                </div>
                <div className="flex-1 p-6">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {mod.topics.map((topic) => (
                      <li key={topic} className="text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <div className="bg-blue-50 border border-blue-200 rounded-lg inline-block px-8 py-6 mb-8">
            <p className="text-slate-800 text-lg font-semibold mb-1">Ready to start?</p>
            <p className="text-slate-600 text-sm">Limited seats per batch. Contact via WhatsApp for pricing and schedule.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={LINKS.whatsappAutomation} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              WhatsApp to Enroll &rarr;
            </a>
            <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg text-sm font-semibold hover:border-slate-500 transition-colors">
              Book on Topmate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsYouWillUse() {
  const tools = [
    { name: "Cursor", category: "AI IDE" },
    { name: "GitHub Copilot", category: "AI IDE" },
    { name: "OpenAI Codex", category: "AI CLI" },
    { name: "ChatGPT / GPT-4o", category: "LLM" },
    { name: "Claude AI", category: "LLM" },
    { name: "Gemini", category: "LLM" },
    { name: "AWS Bedrock", category: "Cloud AI" },
    { name: "Amazon Q", category: "Cloud AI" },
    { name: "Azure OpenAI", category: "Cloud AI" },
    { name: "LangChain", category: "Agents" },
    { name: "CrewAI", category: "Agents" },
    { name: "AutoGen", category: "Agents" },
    { name: "n8n", category: "Automation" },
    { name: "Lovable", category: "Prototyping" },
    { name: "Bolt", category: "Prototyping" },
    { name: "v0 by Vercel", category: "Prototyping" },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Tech Stack"
          title="Tools you will master"
          subtitle="Only the tools that appear in enterprise JDs. No filler."
          tagColor="text-orange-600"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((t) => (
            <div key={t.name} className="panel px-4 py-3.5 text-center card-hover">
              <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

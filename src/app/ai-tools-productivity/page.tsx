import type { Metadata } from "next";
import Image from "next/image";
import { LINKS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "AI Tools for 10x Productivity | Cursor, Claude, ChatGPT, Gemini, Grok, Vercel AI SDK Course",
  description:
    "Master AI tools to 10x your professional productivity. Learn Cursor IDE, Claude, ChatGPT, Gemini, Grok, GitHub Copilot, Vercel AI SDK, AWS Bedrock, agentic workflows. For developers, professionals & teams. By Rajinikanth Vadla.",
  keywords: [
    "AI tools course", "AI productivity training", "Cursor IDE course", "Claude AI training",
    "ChatGPT for professionals", "Gemini AI course", "Grok AI training",
    "GitHub Copilot training", "Vercel AI SDK course", "AWS Bedrock training",
    "AI for developers", "10x productivity AI", "AI coding tools",
    "agentic workflows course", "AI IDE tools training", "best AI tools course India",
    "AI automation for professionals", "AI assisted development",
    "prompt engineering for developers", "AI pair programming",
    "Windsurf IDE", "Bolt AI", "v0 dev", "Lovable AI",
    "Rajinikanth Vadla AI tools",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/ai-tools-productivity" },
};

const TOOLS = [
  { name: "Cursor", desc: "AI-native IDE", icon: "⚡" },
  { name: "Claude", desc: "Anthropic AI", icon: "🧠" },
  { name: "ChatGPT", desc: "OpenAI", icon: "💬" },
  { name: "Gemini", desc: "Google AI", icon: "✨" },
  { name: "Grok", desc: "xAI", icon: "🚀" },
  { name: "GitHub Copilot", desc: "AI Pair Programmer", icon: "🤖" },
  { name: "Vercel AI SDK", desc: "Build AI Apps", icon: "▲" },
  { name: "AWS Bedrock", desc: "Enterprise AI", icon: "☁️" },
  { name: "Windsurf", desc: "Agentic IDE", icon: "🌊" },
  { name: "v0.dev", desc: "AI UI Builder", icon: "🎨" },
  { name: "Bolt", desc: "Full-stack AI", icon: "⚙️" },
  { name: "Lovable", desc: "AI App Builder", icon: "💜" },
];

const MODULES = [
  {
    num: "01", title: "AI Fundamentals for Professionals", color: "from-indigo-500 to-blue-600",
    topics: ["Understanding LLMs, GPTs, and how AI models work", "Prompt engineering mastery — get 10x better outputs", "When to use which AI tool for maximum impact", "AI safety, ethics, and best practices", "Setting up your AI-powered workflow"],
  },
  {
    num: "02", title: "AI-Powered Coding with Cursor & Copilot", color: "from-emerald-500 to-teal-600",
    topics: ["Cursor IDE deep dive — setup, shortcuts, agent mode", "Tab completion, inline editing, and multi-file editing", "Cursor Rules and .cursorrules for project context", "GitHub Copilot — code suggestions and chat", "Windsurf — agentic coding workflows", "AI pair programming best practices"],
  },
  {
    num: "03", title: "Mastering ChatGPT, Claude, Gemini & Grok", color: "from-purple-500 to-violet-600",
    topics: ["ChatGPT — advanced prompting, custom GPTs, API usage", "Claude — long-context analysis, artifacts, projects", "Gemini — multimodal, Google workspace integration", "Grok — real-time info, x.ai integration", "Comparing models — when to use which one", "Building personal AI assistants"],
  },
  {
    num: "04", title: "AI for Content, Design & No-Code", color: "from-rose-500 to-pink-600",
    topics: ["v0.dev — generate UI components from descriptions", "Bolt — full-stack app generation with AI", "Lovable — build apps without writing code", "AI for documentation, presentations, and writing", "AI image generation for marketing and design", "Automating repetitive tasks with AI"],
  },
  {
    num: "05", title: "Building AI Applications with Vercel AI SDK", color: "from-amber-500 to-orange-600",
    topics: ["Vercel AI SDK architecture and setup", "Streaming AI responses in React/Next.js", "Building chatbots and AI assistants", "Multi-model support (OpenAI, Anthropic, Google)", "Tool calling and function execution", "Deploying AI apps to production"],
  },
  {
    num: "06", title: "AWS Bedrock & Enterprise AI", color: "from-cyan-500 to-blue-600",
    topics: ["AWS Bedrock — access to Claude, LLaMA, Titan", "Building enterprise AI applications", "Knowledge bases and RAG with Bedrock", "AI Agents with AWS Bedrock Agents", "Security, compliance, and cost management", "Production deployment patterns"],
  },
  {
    num: "07", title: "Agentic Workflows & Automation", color: "from-violet-500 to-purple-600",
    topics: ["Building agentic workflows that work autonomously", "Connecting AI tools together for complex tasks", "Automating code reviews, testing, and deployment", "AI-powered project management and planning", "Building custom AI agents for your workflow", "Measuring and optimizing AI productivity gains"],
  },
  {
    num: "08", title: "Capstone: 10x Your Real Work", color: "from-gray-700 to-gray-900",
    topics: ["Apply AI tools to your actual daily work", "Build a custom AI-powered workflow", "Create an AI assistant for your domain", "Measure before/after productivity metrics", "Present your AI transformation story"],
  },
];

export default function AIToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.25),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 border border-purple-500/30 text-purple-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-dot" />
            New Course &mdash; Launching Soon
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
            10x Your Work
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
              with AI Tools
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            Master Cursor, Claude, ChatGPT, Gemini, Grok, GitHub Copilot, Vercel AI SDK, AWS Bedrock,
            and every AI tool that makes professionals unstoppable.
          </p>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
            For developers, engineers, and professionals who want to work 10x faster using AI.
            Not theory &mdash; practical, hands-on workflows you&apos;ll use every day.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
              Get Details on WhatsApp &rarr;
            </a>
            <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
              Book a Call
            </a>
          </div>

          <p className="text-gray-600 text-sm">
            Live Online &middot; Hands-on Labs &middot; Real Workflows &middot; For All Professionals
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Tools You'll Master" title="Every AI Tool That Matters" subtitle="From AI IDEs to enterprise platforms — master them all" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TOOLS.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100 card-hover">
                <div className="text-3xl mb-3">{t.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Who Is This For" title="Built for Professionals Who Want More" subtitle="Whether you code or not — AI tools will transform how you work" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👨‍💻", title: "Software Developers", desc: "Write code 10x faster with AI pair programming. Ship features in hours, not days." },
              { icon: "🏗️", title: "DevOps & Cloud Engineers", desc: "Automate infrastructure, debugging, and monitoring with AI assistance." },
              { icon: "📊", title: "Data Scientists & ML Engineers", desc: "Accelerate experimentation, analysis, and model development." },
              { icon: "💼", title: "Tech Managers & Leads", desc: "Make faster decisions, write specs, and manage projects with AI." },
              { icon: "🎨", title: "Product & Design Teams", desc: "Build prototypes, generate UI, and iterate designs in minutes." },
              { icon: "🚀", title: "Entrepreneurs & Freelancers", desc: "Build MVPs, automate operations, and scale without large teams." },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-7 border border-gray-100 card-hover">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="Curriculum" title="8 Power-Packed Modules" subtitle="From fundamentals to building your own AI-powered workflow" />
          <div className="space-y-6">
            {MODULES.map((m) => (
              <div key={m.num} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 card-hover">
                <div className="flex items-center gap-4 mb-5">
                  <span className={`w-12 h-12 bg-gradient-to-br ${m.color} text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg`}>
                    {m.num}
                  </span>
                  <h3 className="font-bold text-gray-900 text-xl">{m.title}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {m.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-emerald-500">&rarr;</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
            <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla" width={300} height={380} className="rounded-3xl shadow-xl w-full object-cover" />
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">Your Instructor</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Rajinikanth Vadla</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                I use AI tools every single day to build, deploy, and manage production systems. Cursor is my primary IDE,
                I work with Claude, ChatGPT, and Gemini daily, and I&apos;ve built applications using Vercel AI SDK and AWS Bedrock.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This isn&apos;t a theoretical course &mdash; I&apos;ll show you exactly how I use these tools in my real work,
                and help you build workflows that make you 10x more productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="FAQ" title="Frequently Asked Questions" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "Do I need to be a developer?", a: "No! While developers will get the most from coding-focused modules, many AI tools (ChatGPT, Claude, Gemini, v0, Bolt) are useful for all professionals. We cover workflows for both technical and non-technical roles." },
              { q: "Which AI tools will I learn?", a: "Cursor IDE, Claude, ChatGPT, Gemini, Grok, GitHub Copilot, Windsurf, Vercel AI SDK, AWS Bedrock, v0.dev, Bolt, Lovable, and more. We cover every major AI tool." },
              { q: "How is this different from watching YouTube tutorials?", a: "We teach integrated workflows, not isolated tool demos. You'll learn to combine multiple AI tools into powerful workflows that 10x your actual work. Plus hands-on labs and real projects." },
              { q: "Will this course be updated as new tools come out?", a: "Yes! AI tools evolve fast. This course is continuously updated with new tools, features, and best practices. You get lifetime access to updates." },
            ].map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 card-hover">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to 10x Your Productivity?"
        subtitle="Join the AI revolution. Work smarter, ship faster, achieve more."
      />
      <SuccessStories />
    </>
  );
}

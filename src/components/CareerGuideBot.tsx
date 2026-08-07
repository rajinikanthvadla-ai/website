"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import CareerBotMarkdown from "@/components/CareerBotMarkdown";
import { isGeminiConfigured, sendCareerBotMessage, type ChatTurn } from "@/lib/gemini-client";
import { parseBotReply } from "@/lib/career-bot-parse";
import { LINKS } from "@/lib/constants";
import { YOUTUBE_MEMBERSHIP_JOIN_URL } from "@/lib/youtube-membership";

const STARTER_PROMPTS = [
  "How do I become an MLOps engineer?",
  "What's included in YouTube Agentic Pro membership?",
  "I know DevOps — what's my fastest path to AI?",
  "Compare MLOps vs LLMOps for me",
];

type Message = ChatTurn & {
  id: string;
  followups?: string[];
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function BotAvatar() {
  return (
    <div
      className="shrink-0 w-7 h-7 rounded-sm border-2 border-[#0f172a] bg-[#fef9c3] flex items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0f172a]" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinejoin="round" />
        <path d="M5 19h14" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      className="shrink-0 w-7 h-7 rounded-sm border-2 border-[#0f172a] bg-[#dbeafe] flex items-center justify-center text-[0.55rem] font-extrabold text-[#0f172a]"
      aria-hidden
    >
      YOU
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-start mr-2 career-bot-msg career-bot-msg--bot">
      <BotAvatar />
      <div className="career-bot-bubble career-bot-bubble--bot px-4 py-3">
        <div className="flex items-center gap-1.5" aria-label="Thinking">
          <span className="career-bot-dot" />
          <span className="career-bot-dot career-bot-dot--2" />
          <span className="career-bot-dot career-bot-dot--3" />
        </div>
      </div>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="career-bot-welcome">
      <p className="font-display font-bold text-[#0f172a] text-sm mb-1">Your AI career co-pilot</p>
      <p className="text-[0.75rem] text-slate-600 leading-relaxed mb-3">
        I map your background to the 8-stage learning path, suggest next skills, and link you to roadmaps on this site.
      </p>
      <a
        href={YOUTUBE_MEMBERSHIP_JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[0.7rem] font-bold text-center py-2 px-3 mb-3 border-2 border-[#0f172a] bg-[#fef9c3] rounded-sm shadow-[2px_2px_0_#0f172a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_#0f172a] transition-all"
      >
        YouTube Pro ₹1,199/mo — all videos + mentorship →
      </a>
      <div className="grid grid-cols-2 gap-1.5">
        {["Skills", "Roadmaps", "MLOps", "LLMOps"].map((tag) => (
          <span
            key={tag}
            className="text-[0.6rem] font-bold uppercase tracking-wide text-center py-1 px-2 border border-dashed border-slate-300 rounded-sm text-slate-500 bg-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CareerGuideBot() {
  const [open, setOpen] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "model", text: "__welcome__" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConfigured(isGeminiConfigured());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      setInput("");
      const userMsg: Message = { id: uid(), role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const history: ChatTurn[] = messages
          .filter((m) => m.id !== "welcome")
          .map(({ role, text: t }) => ({ role, text: t }));
        const raw = await sendCareerBotMessage(history, trimmed);
        const { body, followups } = parseBotReply(raw);
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "model", text: body, followups },
        ]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Something went wrong.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  const userTurnCount = messages.filter((m) => m.role === "user").length;
  const showStarters = userTurnCount === 0;

  return (
    <>
      {open && (
        <div
          className="career-bot-panel fixed z-[60] left-3 right-3 sm:left-6 sm:right-auto bottom-[5.5rem] sm:bottom-24 flex flex-col bg-[#faf9f6] border-2 border-[#0f172a] rounded-sm shadow-[8px_8px_0_#0f172a] animate-scale-in"
          role="dialog"
          aria-label="AI Career Guide chat"
        >
          <header className="flex items-center justify-between gap-3 px-4 py-3 border-b-2 border-[#0f172a] bg-[#fef9c3] shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <BotAvatar />
              <div className="min-w-0">
                <p className="font-display font-bold text-[#0f172a] text-sm truncate">AI Career Guide</p>
                <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${configured ? "bg-emerald-500" : "bg-amber-500"}`}
                    aria-hidden
                  />
                  {configured ? "Gemini · Online" : "Setup needed"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-sm border-2 border-[#0f172a] bg-white hover:bg-[#fafafa] flex items-center justify-center text-[#0f172a] shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-4 min-h-[220px] max-h-[min(52vh,480px)]">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === "model" ? (
                  <div className="career-bot-msg career-bot-msg--bot">
                    <BotAvatar />
                    <div className="min-w-0 flex-1">
                      <div className="career-bot-bubble career-bot-bubble--bot">
                        {m.text === "__welcome__" ? (
                          <WelcomeCard />
                        ) : (
                          <CareerBotMarkdown content={m.text} />
                        )}
                      </div>
                      {m.followups && m.followups.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.followups.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => send(q)}
                              disabled={loading || !configured}
                              className="career-bot-followup"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="career-bot-msg career-bot-msg--user">
                    <div className="career-bot-bubble career-bot-bubble--user">
                      <p className="text-[0.8125rem] text-[#0f172a] leading-relaxed font-medium">{m.text}</p>
                    </div>
                    <UserAvatar />
                  </div>
                )}
              </div>
            ))}

            {loading && <TypingIndicator />}

            {error && (
              <p className="text-xs text-red-700 bg-red-50 border-2 border-red-200 rounded-sm px-3 py-2 mx-1">
                {error}{" "}
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  Ask on WhatsApp
                </a>
              </p>
            )}

            {!configured && (
              <p className="text-xs text-amber-900 bg-[#fef9c3] border-2 border-[#0f172a] rounded-sm px-3 py-2 mx-1">
                Bot API key not set in deployment. Message Rajinikanth on{" "}
                <a href={LINKS.whatsapp} className="underline font-bold" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>{" "}
                for career help.
              </p>
            )}
          </div>

          {showStarters && (
            <div className="px-3 pb-2 shrink-0">
              <p className="text-[0.6rem] font-bold uppercase tracking-wide text-slate-400 mb-1.5 px-0.5">
                Try asking
              </p>
              <div className="flex flex-col gap-1.5">
                {STARTER_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    disabled={loading || !configured}
                    className="career-bot-starter"
                  >
                    <span className="text-orange-500 shrink-0" aria-hidden>→</span>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            className="border-t-2 border-[#0f172a] p-3 flex gap-2 shrink-0 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={configured ? "Ask about skills, roles, roadmaps…" : "Bot offline — use WhatsApp"}
              disabled={loading || !configured}
              className="flex-1 text-sm border-2 border-[#0f172a] rounded-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-slate-100 min-w-0"
            />
            <button
              type="submit"
              disabled={loading || !configured || !input.trim()}
              className="notion-btn notion-btn--ink !py-2.5 !px-4 !text-sm disabled:opacity-40 shrink-0"
            >
              Send
            </button>
          </form>

          <p className="text-[0.6rem] text-slate-400 text-center px-3 pb-2 shrink-0">
            AI can make mistakes. Verify on{" "}
            <Link href="/universe/" className="underline font-semibold text-slate-500 hover:text-[#0f172a]">
              Learning Universe
            </Link>
            .
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close AI Career Guide" : "Open AI Career Guide"}
        className="fixed bottom-6 left-4 sm:left-6 z-[60] flex items-center gap-2 bg-[#0f172a] text-white border-2 border-[#0f172a] rounded-sm shadow-[4px_4px_0_#ea580c] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_#ea580c] transition-all pl-3 pr-4 py-3"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-extrabold uppercase tracking-wide hidden sm:inline">Career Guide</span>
      </button>
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { isGeminiConfigured, sendCareerBotMessage, type ChatTurn } from "@/lib/gemini-client";
import { LINKS } from "@/lib/constants";

const STARTER_PROMPTS = [
  "How do I become an MLOps engineer?",
  "I know DevOps — what's my fastest path to AI?",
  "What skills are missing for LLMOps?",
  "Compare MLOps vs LLMOps for me",
];

type Message = ChatTurn & { id: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function CareerGuideBot() {
  const [open, setOpen] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hi! I'm your AI Career Guide. Ask about skills, roadmaps, MLOps, LLMOps, or which path fits your background.",
    },
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
        const reply = await sendCareerBotMessage(history, trimmed);
        setMessages((prev) => [...prev, { id: uid(), role: "model", text: reply }]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Something went wrong.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-[60] left-4 right-4 sm:left-6 sm:right-auto bottom-24 sm:bottom-24 w-auto sm:w-[400px] max-h-[min(70vh,560px)] flex flex-col bg-white border-2 border-[#0f172a] rounded-sm shadow-[8px_8px_0_#0f172a] animate-scale-in"
          role="dialog"
          aria-label="AI Career Guide chat"
        >
          <header className="flex items-center justify-between gap-3 px-4 py-3 border-b-2 border-[#0f172a] bg-[#fef9c3]">
            <div>
              <p className="font-display font-bold text-[#0f172a] text-sm">AI Career Guide</p>
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">
                Powered by Gemini · {configured ? "Online" : "Setup needed"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-sm border-2 border-[#0f172a] bg-white hover:bg-[#fafafa] flex items-center justify-center text-[#0f172a]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-8 bg-[#dbeafe] border-2 border-[#0f172a] rounded-sm px-3 py-2"
                    : "mr-4 bg-[#fafafa] border border-slate-300 rounded-sm px-3 py-2"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <p className="text-xs text-slate-500 animate-pulse mr-4">Thinking…</p>
            )}
            {error && (
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
                {error}{" "}
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  Ask on WhatsApp
                </a>
              </p>
            )}
            {!configured && (
              <p className="text-xs text-amber-800 bg-[#fef9c3] border border-[#0f172a] rounded-sm px-3 py-2">
                Bot API key not set in deployment. Message Rajinikanth on{" "}
                <a href={LINKS.whatsapp} className="underline font-bold" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>{" "}
                for career help.
              </p>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  disabled={loading || !configured}
                  className="text-[0.65rem] font-bold text-left px-2 py-1 rounded-sm border border-dashed border-slate-400 text-slate-600 hover:bg-[#fef9c3] hover:border-[#0f172a] disabled:opacity-40"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <form
            className="border-t-2 border-[#0f172a] p-3 flex gap-2"
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
              className="flex-1 text-sm border-2 border-[#0f172a] rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={loading || !configured || !input.trim()}
              className="notion-btn notion-btn--ink !py-2 !px-4 !text-sm disabled:opacity-40"
            >
              Send
            </button>
          </form>

          <p className="text-[0.6rem] text-slate-400 text-center px-3 pb-2">
            AI can make mistakes. Verify on{" "}
            <Link href="/universe/" className="underline">
              /universe/
            </Link>
            .
          </p>
        </div>
      )}

      {/* Launcher */}
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

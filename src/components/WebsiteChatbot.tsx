"use client";

import Image from "next/image";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const seedMessage: Message = {
  role: "assistant",
  text: "Hi. I can answer questions about MLOps, AIOps, GenAI, and career roadmap in Rajinikanth's mentoring style.",
};

export default function WebsiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([seedMessage]);

  async function streamAssistantReply(fullText: string) {
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
    for (let i = 1; i <= fullText.length; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 8));
      setMessages((prev) => {
        const next = [...prev];
        const idx = next.length - 1;
        next[idx] = { role: "assistant", text: fullText.slice(0, i) };
        return next;
      });
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", text } as Message];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: nextMessages.slice(-8) }),
      });
      const raw = await res.text();
      let data: { reply?: string; error?: string } = {};
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error("Chat API returned non-JSON response");
      }
      if (!res.ok) {
        throw new Error(data?.error || "Chat failed");
      }
      await streamAssistantReply(data.reply || "I could not generate a response. Please retry.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      setMessages((prev) => [...prev, { role: "assistant", text: `Sorry, ${msg}. Please retry.` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="w-[340px] max-w-[92vw] h-[460px] bg-white border border-stone-300 shadow-xl flex flex-col mb-3">
          <div className="px-4 py-3 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/assets/pic-1.png" alt="RaGenie bot avatar" width={30} height={30} className="rounded-full border border-stone-600" />
              <div>
                <p className="font-semibold text-sm">RaGenie Bot</p>
                <p className="text-[11px] text-stone-300">MLOps | AIOps | GenAI | Careers</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-stone-300 hover:text-white text-sm" aria-label="Close chat">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-stone-50">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`text-sm px-3 py-2 border ${
                  m.role === "assistant"
                    ? "bg-white border-stone-200 text-stone-700"
                    : "bg-stone-900 border-stone-900 text-white ml-8"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && <div className="text-xs text-stone-500">Thinking…</div>}
          </div>

          <div className="p-3 border-t border-stone-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                maxLength={1200}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI/ML roadmap..."
                className="flex-1 border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-900"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-stone-900 text-white px-3 py-2 text-sm font-semibold disabled:opacity-60"
              >
                {loading ? "Typing..." : "Send"}
              </button>
            </form>
            <p className="text-[11px] text-stone-500 mt-2">For best results, ask one specific question per message.</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 bg-stone-900 text-white shadow-lg hover:bg-stone-800 transition-colors"
        aria-label="Open AI chatbot"
        title="Ask Rajinikanth AI"
      >
        AI
      </button>
    </div>
  );
}

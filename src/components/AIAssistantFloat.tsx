"use client";

import { useEffect, useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const STARTER_MESSAGE =
  "Hi, I am here to help with MLOps, LLMOps, GenAI, AI Agents, and mentorship questions.";

export default function AIAssistantFloat() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: STARTER_MESSAGE },
  ]);

  const geminiApiKey = useMemo(
    () => process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() ?? "",
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setShowGreeting(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    if (!geminiApiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Gemini key is not configured yet. For this GitHub Pages site, add repo secret NEXT_PUBLIC_GEMINI_API_KEY, then redeploy.",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      const prompt = `You are Rajinikanth Vadla's website assistant.
Answer briefly and clearly about: MLOps, AIOps, LLMOps, AI Agents, GenAI courses, mentorship, and enrollment guidance.
If needed, suggest pages: /courses, /mlops-aiops-masterclass, /mentorship, /contact.

User question: ${text}`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 400,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "I could not generate a reply right now. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `AI assistant error: ${message}. Check key restrictions and allowed referrer domains in Google AI Studio.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {showGreeting && !open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-3 block max-w-52 rounded-xl border border-stone-200 bg-white px-3 py-2 text-left text-sm text-stone-700 shadow"
        >
          Hey, I am here. Ask me about MLOps, LLMOps, or mentorship.
        </button>
      ) : null}

      {open ? (
        <div className="mb-3 w-[min(92vw,360px)] rounded-2xl border border-stone-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-stone-900">AI Assistant</h3>
            <button
              type="button"
              className="text-stone-500 hover:text-stone-700"
              onClick={() => setOpen(false)}
              aria-label="Close AI assistant"
            >
              x
            </button>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={`rounded-lg px-3 py-2 ${
                  msg.role === "assistant"
                    ? "bg-stone-100 text-stone-800"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading ? (
              <div className="rounded-lg bg-stone-100 px-3 py-2 text-stone-600">
                Typing...
              </div>
            ) : null}
          </div>

          <div className="flex gap-2 border-t border-stone-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void sendMessage();
              }}
              placeholder="Ask your question..."
              className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={loading}
              className="rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-14 w-14 rounded-full bg-stone-900 text-lg font-semibold text-white shadow-lg hover:bg-stone-800"
        aria-label="Toggle AI assistant"
      >
        AI
      </button>
    </div>
  );
}

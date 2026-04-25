import { NextRequest, NextResponse } from "next/server";

type ChatTurn = {
  role: "user" | "assistant";
  text: string;
};

const SYSTEM_PROMPT = `You are Rajinikanth Vadla's AI website assistant.
Speak in Rajinikanth's practical mentorship style: direct, specific, and production-focused.
Primary topics: MLOps, AIOps, GenAI, AI Agents, Kubernetes, cloud, career transition.
Guidelines:
- Keep answers concise but useful.
- Prefer actionable checklists and clear next steps.
- Do not invent claims about outcomes, salaries, or guarantees.
- If asked about paid programs, suggest visiting /mlops-aiops-masterclass, /genai-training, /mentorship.
- If unsure, say what is uncertain.`;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQ = 12;
const ipHits = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGE_CHARS = 1200;
const MAX_HISTORY_TURNS = 8;
const GEMINI_TIMEOUT_MS = 15_000;

export const runtime = "nodejs";

function checkRateLimit(ip: string) {
  const now = Date.now();

  // Opportunistic cleanup to avoid unbounded map growth.
  if (ipHits.size > 2000) {
    for (const [key, value] of ipHits.entries()) {
      if (now > value.resetAt) ipHits.delete(key);
    }
  }

  const current = ipHits.get(ip);
  if (!current || now > current.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_MAX_REQ) {
    return false;
  }
  current.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Chat service is not configured." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Please try again shortly." }, { status: 429 });
  }

  const body = (await req.json()) as { message?: string; history?: ChatTurn[] };
  const message = (body.message || "").trim();
  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY_TURNS) : [];

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json({ error: `Message too long (max ${MAX_MESSAGE_CHARS} characters).` }, { status: 400 });
  }

  const contents = [
    ...history.map((h) => ({ role: h.role === "assistant" ? "model" : "user", parts: [{ text: h.text }] })),
    { role: "user", parts: [{ text: message }] },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  let resp: Response;
  try {
    resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 700,
          },
        }),
      }
    );
  } catch {
    return NextResponse.json({ error: "Chat model timeout or network issue. Please retry." }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }

  if (!resp.ok) {
    return NextResponse.json({ error: "Model request failed. Please retry shortly." }, { status: 502 });
  }

  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) {
    return NextResponse.json({ error: "Empty response from model." }, { status: 502 });
  }

  return NextResponse.json({ reply: text });
}

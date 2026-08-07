import { buildCareerBotSystemPrompt } from "@/lib/career-bot-context";

const MODEL = "gemini-flash-latest";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export type ChatTurn = {
  role: "user" | "model";
  text: string;
};

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message?: string };
};

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim());
}

export async function sendCareerBotMessage(history: ChatTurn[], userMessage: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Career bot is not configured yet. Please try WhatsApp instead.");
  }

  const contents = [
    ...history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    { role: "user" as const, parts: [{ text: userMessage }] },
  ];

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildCareerBotSystemPrompt() }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  const data = (await res.json()) as GeminiResponse;

  if (!res.ok) {
    throw new Error(data.error?.message ?? `Gemini API error (${res.status})`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text.trim()) {
    throw new Error("Empty response from Gemini. Please try again.");
  }

  return text.trim();
}

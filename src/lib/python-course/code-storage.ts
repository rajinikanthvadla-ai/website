const LESSON_CODE_KEY = "python-course-lesson-code-v1";
const PLAYGROUND_KEY = "python-course-playground-v1";
const CONTINUE_KEY = "python-course-continue-v1";
const CHALLENGE_DONE_KEY = "python-course-challenge-done-v1";

type LessonCodeMap = Record<string, string>;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

export function loadLessonCode(slug: string): string | null {
  const map = readJson<LessonCodeMap>(LESSON_CODE_KEY, {});
  const code = map[slug];
  return typeof code === "string" && code.length > 0 ? code : null;
}

export function saveLessonCode(slug: string, code: string): void {
  const map = readJson<LessonCodeMap>(LESSON_CODE_KEY, {});
  map[slug] = code;
  writeJson(LESSON_CODE_KEY, map);
}

export function clearLessonCode(slug: string): void {
  const map = readJson<LessonCodeMap>(LESSON_CODE_KEY, {});
  delete map[slug];
  writeJson(LESSON_CODE_KEY, map);
}

export function loadPlaygroundDraft(): { code: string; packages: string[]; presetId?: string } | null {
  const draft = readJson<{ code?: string; packages?: string[]; presetId?: string } | null>(PLAYGROUND_KEY, null);
  if (!draft || typeof draft.code !== "string") return null;
  return {
    code: draft.code,
    packages: Array.isArray(draft.packages) ? draft.packages.filter((p): p is string => typeof p === "string") : [],
    presetId: typeof draft.presetId === "string" ? draft.presetId : undefined,
  };
}

export function savePlaygroundDraft(code: string, packages: string[], presetId?: string): void {
  writeJson(PLAYGROUND_KEY, { code, packages, presetId, updatedAt: new Date().toISOString() });
}

export function setContinueLesson(slug: string, title: string): void {
  writeJson(CONTINUE_KEY, { slug, title, updatedAt: new Date().toISOString() });
}

export function getContinueLesson(): { slug: string; title: string } | null {
  const value = readJson<{ slug?: string; title?: string } | null>(CONTINUE_KEY, null);
  if (!value || typeof value.slug !== "string" || typeof value.title !== "string") return null;
  return { slug: value.slug, title: value.title };
}

export function markChallengeDone(dateKey: string): void {
  writeJson(CHALLENGE_DONE_KEY, { dateKey, at: new Date().toISOString() });
}

export function isChallengeDone(dateKey: string): boolean {
  const value = readJson<{ dateKey?: string } | null>(CHALLENGE_DONE_KEY, null);
  return value?.dateKey === dateKey;
}

export function encodeShareCode(code: string): string {
  const bytes = new TextEncoder().encode(code);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeShareCode(encoded: string): string | null {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

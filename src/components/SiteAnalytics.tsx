"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

/**
 * First-party analytics into Supabase (site_events). No cookies, no IP addresses,
 * no third-party scripts. A random id in sessionStorage groups one visit.
 *
 * What it records: the page, where the visitor came from (search engine, AI assistant,
 * social, campaign tags), device type, language and time zone, plus clicks on the links
 * that matter (enroll, WhatsApp, checkout, booking, outbound).
 *
 * Note: Google and Bing do not pass the search words to websites. Search terms come
 * from Google Search Console, or from utm_term on links you tag yourself (ads, posts).
 */

const SESSION_KEY = "rv_sid";
const TOUCH_KEY = "rv_touch";

type Touch = {
  referrer: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
};

const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\./, "Google"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)yahoo\./, "Yahoo"],
  [/(^|\.)yandex\./, "Yandex"],
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, "ChatGPT"],
  [/(^|\.)perplexity\.ai$/, "Perplexity"],
  [/(^|\.)claude\.ai$/, "Claude"],
  [/(^|\.)gemini\.google\.com$/, "Gemini"],
  [/(^|\.)copilot\.microsoft\.com$/, "Copilot"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "LinkedIn"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "YouTube"],
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(facebook\.com|fb\.com|l\.facebook\.com)$/, "Facebook"],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, "X"],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, "WhatsApp"],
  [/(^|\.)github\.com$/, "GitHub"],
  [/(^|\.)reddit\.com$/, "Reddit"],
  [/(^|\.)medium\.com$/, "Medium"],
  [/(^|\.)topmate\.io$/, "Topmate"],
];

function classify(host: string, utmSource: string) {
  if (utmSource) return utmSource.toLowerCase().slice(0, 60);
  if (!host) return "";
  // Gemini must be matched before the generic Google rule.
  if (/(^|\.)gemini\.google\.com$/.test(host)) return "Gemini";
  for (const [re, name] of SOURCES) if (re.test(host)) return name;
  return host.replace(/^www\./, "").slice(0, 60);
}

function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/-/g, "").slice(0, 24);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "nostorage" + Math.random().toString(36).slice(2, 12);
  }
}

/** Where this visit came from, decided on the first page and kept for the whole visit. */
function firstTouch(): Touch {
  try {
    const saved = sessionStorage.getItem(TOUCH_KEY);
    if (saved) return JSON.parse(saved) as Touch;
  } catch {
    /* ignore */
  }
  const params = new URLSearchParams(window.location.search);
  let host = "";
  let referrer = "";
  try {
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.host !== window.location.host) {
        host = ref.hostname;
        referrer = `${ref.hostname}${ref.pathname}`.slice(0, 300);
      }
    }
  } catch {
    /* ignore */
  }
  const utm_source = (params.get("utm_source") || params.get("ref") || "").slice(0, 80);
  const touch: Touch = {
    referrer,
    source: classify(host, utm_source),
    utm_source,
    utm_medium: (params.get("utm_medium") || "").slice(0, 80),
    utm_campaign: (params.get("utm_campaign") || "").slice(0, 120),
    utm_term: (params.get("utm_term") || params.get("q") || "").slice(0, 120),
  };
  try {
    sessionStorage.setItem(TOUCH_KEY, JSON.stringify(touch));
  } catch {
    /* ignore */
  }
  return touch;
}

function device() {
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

function disabled() {
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    window.location.pathname.startsWith("/admin") ||
    /bot|crawler|spider|headless|lighthouse/i.test(navigator.userAgent)
  );
}

function send(row: Record<string, string>) {
  const db = getSupabaseBrowserClient();
  if (!db) return;
  // Fire and forget: analytics must never slow down or break the page.
  void db.from("site_events").insert(row).then(
    () => undefined,
    () => undefined,
  );
}

function base(type: "pageview" | "click", touch: Touch) {
  return {
    session_id: sessionId(),
    type,
    path: window.location.pathname.slice(0, 200),
    source: touch.source,
    utm_source: touch.utm_source,
    utm_medium: touch.utm_medium,
    utm_campaign: touch.utm_campaign,
    utm_term: touch.utm_term,
    device: device(),
    lang: (navigator.language || "").slice(0, 20),
    tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || "").slice(0, 60),
  };
}

/** Which clicks are worth counting, and what to call them. */
function clickLabel(a: HTMLAnchorElement): string | null {
  const href = a.href;
  const text = (a.getAttribute("data-track") || a.textContent || a.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
  if (a.dataset.track) return text;
  if (/\/enroll\/?/.test(href)) return `Enroll: ${text}`;
  if (/wa\.me|whatsapp\.com/.test(href)) return `WhatsApp: ${text}`;
  if (/rzp\.io|razorpay/.test(href)) return `Checkout: ${text}`;
  if (/topmate\.io/.test(href)) return `Topmate: ${text}`;
  if (/\/work-with-me\/?/.test(href)) return `Work with me: ${text}`;
  try {
    const url = new URL(href);
    if (url.host !== window.location.host && /^https?:$/.test(url.protocol)) return `Outbound ${url.hostname}: ${text}`;
  } catch {
    /* ignore */
  }
  return null;
}

export default function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (disabled()) return;
    send({ ...base("pageview", firstTouch()), referrer: firstTouch().referrer });
  }, [pathname]);

  useEffect(() => {
    if (disabled()) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!(a instanceof HTMLAnchorElement)) return;
      const label = clickLabel(a);
      if (!label) return;
      send({ ...base("click", firstTouch()), label: label.slice(0, 120), target: a.href.slice(0, 300) });
    };
    // Non-link actions (form submits, popup opens) report through: window.dispatchEvent(new CustomEvent("rv-track", { detail: "Label" }))
    const onTrack = (e: Event) => {
      const label = String((e as CustomEvent).detail || "").slice(0, 120);
      if (label) send({ ...base("click", firstTouch()), label, target: window.location.href.slice(0, 300) });
    };
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("rv-track", onTrack);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("rv-track", onTrack);
    };
  }, []);

  return null;
}

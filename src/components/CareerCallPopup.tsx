"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CareerCallForm, { CAREER_CALL_DONE_KEY, track } from "@/components/CareerCallForm";
import { YEARS_EXPERIENCE } from "@/lib/constants";

const SEEN_KEY = "rv-career-call-seen"; // sessionStorage: shown once per visit
const DISMISS_KEY = "rv-career-call-dismissed"; // localStorage: quiet for 3 days after "Not now"
const QUIET_MS = 3 * 24 * 60 * 60 * 1000;
const DELAY_MS = 10000;
const SCROLL_RATIO = 0.35;
const HIDE_ON = [/^\/admin/, /^\/student-feedback/, /^\/enroll/, /^\/free-career-call/, /^\/privacy-policy/, /^\/terms/, /^\/refund-policy/];

function storage(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

/**
 * Side panel offering a free 15-minute AI career call.
 * Slides in after 10 seconds or a third of the page, never covers the page on landing
 * (Google penalises intrusive pop-ups on mobile), and stays quiet once dismissed or sent.
 */
export default function CareerCallPopup() {
  const pathname = usePathname() || "/";
  const [mode, setMode] = useState<"hidden" | "teaser" | "form">("hidden");
  const blocked = HIDE_ON.some((r) => r.test(pathname));

  useEffect(() => {
    if (blocked || mode !== "hidden") return;
    const local = storage("local");
    const session = storage("session");
    if (local?.getItem(CAREER_CALL_DONE_KEY)) return;
    const dismissed = Number(local?.getItem(DISMISS_KEY) || 0);
    if (dismissed && Date.now() - dismissed < QUIET_MS) return;
    if (session?.getItem(SEEN_KEY)) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      session?.setItem(SEEN_KEY, "1");
      setMode("teaser");
      track("Career call: popup shown");
    };
    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_RATIO) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      done = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [blocked, mode]);

  useEffect(() => {
    if (mode === "hidden") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function close() {
    storage("local")?.setItem(DISMISS_KEY, String(Date.now()));
    setMode("hidden");
  }

  if (blocked || mode === "hidden") return null;

  return (
    <aside className={`cc-panel ${mode === "form" ? "is-form" : ""}`} role="dialog" aria-modal="false" aria-labelledby="cc-title">
      <button type="button" className="cc-close" aria-label="Close" onClick={close}>
        ×
      </button>

      <p className="cc-eyebrow">Free · 15 minutes · Online</p>
      <h2 id="cc-title" className="cc-title">
        Not sure which AI career path fits you?
      </h2>

      {mode === "teaser" ? (
        <>
          <p className="cc-text">
            Book a free 15-minute call with me. You leave with one clear next step for MLOps, LLMOps or AI agents, based on where you are today.
          </p>
          <ul className="cc-list">
            <li>Your best-fit role and a realistic timeline</li>
            <li>What to learn first, and what to skip</li>
            <li>How to switch roles, in India or abroad</li>
          </ul>
          <div className="cc-who">
            <span className="cc-avatar" aria-hidden>
              RV
            </span>
            <span>
              <strong>Rajinikanth Vadla</strong>
              <br />
              Senior MLOps and AIOps engineer, {YEARS_EXPERIENCE} years
            </span>
          </div>
          <div className="cc-actions">
            <button
              type="button"
              className="notion-btn notion-btn--accent"
              onClick={() => {
                setMode("form");
                track("Career call: popup opened form");
              }}
            >
              Book my free call
            </button>
            <button type="button" className="cc-later" onClick={close}>
              Not now
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="cc-text">Tell me a little about you. I'll message you within 24 hours to fix a time.</p>
          <CareerCallForm compact source="popup" />
          <p className="cc-foot">
            Prefer a full page? <Link href="/free-career-call/">Open the booking page</Link>
          </p>
        </>
      )}
    </aside>
  );
}

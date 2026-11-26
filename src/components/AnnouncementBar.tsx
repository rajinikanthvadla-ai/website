"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { text: string; href: string; endsAt: string | null };

function timeLeft(ms: number) {
  const mins = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  const rest = String(mins % 60).padStart(2, "0");
  return days > 0 ? `${days}d ${hours}h ${rest}m left` : `${hours}h ${rest}m left`;
}

/** Thin bar above the nav, set from /admin (a news post with "show in top bar"). */
export default function AnnouncementBar({ text, href, endsAt }: Props) {
  const [hidden, setHidden] = useState(false);
  const [left, setLeft] = useState("");
  const key = `rv_bar_${text.slice(0, 40)}`;

  // With an end time set in admin, the bar shows a live "time left" and hides itself at the end.
  useEffect(() => {
    if (!endsAt) return;
    const end = Date.parse(endsAt);
    const tick = () => {
      const ms = end - Date.now();
      if (ms <= 0) setHidden(true);
      else setLeft(timeLeft(ms));
    };
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, [endsAt]);

  useEffect(() => {
    // The site is built ahead of time, so an expired bar hides itself in the browser.
    if (endsAt && Date.parse(endsAt) < Date.now()) setHidden(true);
    try {
      if (sessionStorage.getItem(key)) setHidden(true);
    } catch {
      /* ignore */
    }
  }, [endsAt, key]);

  if (hidden) return null;
  const external = /^https?:\/\//.test(href);

  return (
    <div className="announce-bar">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="announce-bar-link" data-track={`Announcement: ${text}`}>
          {text}
          {left ? <span className="tabular-nums"> · {left}</span> : null} <span aria-hidden>→</span>
        </a>
      ) : (
        <Link href={href} className="announce-bar-link" data-track={`Announcement: ${text}`}>
          {text}
          {left ? <span className="tabular-nums"> · {left}</span> : null} <span aria-hidden>→</span>
        </Link>
      )}
      <button
        type="button"
        className="announce-bar-close"
        aria-label="Hide announcement"
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem(key, "1");
          } catch {
            /* ignore */
          }
        }}
      >
        ×
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { text: string; href: string; endsAt: string | null };

/** Thin bar above the nav, set from /admin (a news post with "show in top bar"). */
export default function AnnouncementBar({ text, href, endsAt }: Props) {
  const [hidden, setHidden] = useState(false);
  const key = `rv_bar_${text.slice(0, 40)}`;

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
          {text} <span aria-hidden>→</span>
        </a>
      ) : (
        <Link href={href} className="announce-bar-link" data-track={`Announcement: ${text}`}>
          {text} <span aria-hidden>→</span>
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

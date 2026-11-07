"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MARKET_LABELS, TIMEZONE_TO_MARKET, liveClassTimes, type MarketSlug } from "@/lib/market-zones";

const DISMISS_KEY = "rv-region-strip-dismissed";
const HIDE_ON = [/^\/admin/, /^\/student-feedback/, /^\/enroll/, /^\/mlops-course-india/];

/**
 * "In the UK? Live class is 2:30 PM your time" strip for visitors outside India.
 * Uses the browser time zone only (no IP lookup), suggests the country page, never redirects.
 */
export default function RegionStrip() {
  const pathname = usePathname() || "/";
  const [found, setFound] = useState<{ slug: MarketSlug; tz: string } | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* storage blocked: still show */
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const slug = TIMEZONE_TO_MARKET[tz];
    if (slug) setFound({ slug, tz });
  }, []);

  if (!found || closed) return null;
  if (HIDE_ON.some((r) => r.test(pathname)) || pathname.startsWith(`/global-training/${found.slug}`)) return null;

  const label = MARKET_LABELS[found.slug];
  const t = liveClassTimes(found.tz);
  const when = t.fit === "Overnight: use recordings" ? "overnight for you, so most people use the recordings" : `${t.start} your time (${t.days})`;

  function dismiss() {
    setClosed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="region-strip" role="region" aria-label="Your country">
      <p>
        <span aria-hidden>{label.flag}</span> In {label.name}? Live class is {when}
        {label.fee ? `, about ${label.fee}` : ""}.{" "}
        <Link href={`/global-training/${found.slug}/`} className="region-strip-link" data-track={`Region strip: ${found.slug}`}>
          Fees and class times for {label.name} →
        </Link>
      </p>
      <button type="button" className="region-strip-close" aria-label="Hide" onClick={dismiss}>
        ×
      </button>
    </div>
  );
}

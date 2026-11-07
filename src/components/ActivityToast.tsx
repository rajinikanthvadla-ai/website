"use client";

import { useEffect, useMemo, useState } from "react";
import type { ActivityItem, ActivityStats } from "@/lib/cms";

/**
 * Small card, bottom left: real recent activity you add in /admin > Activity
 * ("Ravi from Pune joined the MLOps cohort, 2 days ago") and real weekly totals.
 * Shows nothing when there is nothing real to show.
 */

const FIRST_DELAY = 9000;
const SHOW_FOR = 6000;
const GAP = 10000;
const MAX_PER_VISIT = 6;
const DISMISS_KEY = "rv_activity_off";

function ago(iso: string) {
  const mins = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

type Message = { key: string; text: string; when?: string };

export default function ActivityToast({ items, stats }: { items: ActivityItem[]; stats: ActivityStats | null }) {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [off, setOff] = useState(true);

  const messages = useMemo<Message[]>(() => {
    const list: Message[] = items.map((i) => ({
      key: i.id,
      text: `${i.first_name}${i.city ? ` from ${i.city}` : ""} ${i.action}`,
      when: i.happened_at,
    }));
    if (stats && stats.enquiries_7d >= 5) {
      list.splice(Math.min(2, list.length), 0, { key: "enq", text: `${stats.enquiries_7d} engineers asked about the course this week` });
    }
    if (stats && stats.requests_30d >= 3) {
      list.push({ key: "req", text: `${stats.requests_30d} companies sent project requests this month` });
    }
    return list;
  }, [items, stats]);

  useEffect(() => {
    if (!messages.length) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* ignore */
    }
    setOff(false);
  }, [messages.length]);

  useEffect(() => {
    if (off || !messages.length) return;
    let shown = 0;
    let i = -1;
    let timer: number;
    const next = () => {
      if (shown >= MAX_PER_VISIT) return;
      i = (i + 1) % messages.length;
      shown += 1;
      setIndex(i);
      setVisible(true);
      timer = window.setTimeout(() => {
        setVisible(false);
        timer = window.setTimeout(next, GAP);
      }, SHOW_FOR);
    };
    timer = window.setTimeout(next, FIRST_DELAY);
    return () => window.clearTimeout(timer);
  }, [off, messages]);

  if (off || index < 0) return null;
  const m = messages[index];

  return (
    <div className={`activity-toast${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <span className="activity-toast-dot" aria-hidden />
      <p className="activity-toast-text">
        {m.text}
        {m.when ? <span className="activity-toast-when">{ago(m.when)}</span> : null}
      </p>
      <button
        type="button"
        className="activity-toast-close"
        aria-label="Hide these updates"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          setOff(true);
          try {
            sessionStorage.setItem(DISMISS_KEY, "1");
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

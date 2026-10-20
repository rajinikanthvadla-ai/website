"use client";

import { useEffect, useState } from "react";
import { detectMentorshipZone, type MentorshipZoneId } from "@/lib/mentorship-pricing";

/** Pricing zone: "C" = India & South Asia (INR), "A" = everyone else (USD). */
export type VisitorZone = MentorshipZoneId;

const REGION_EVENT = "mentorship-region-change";
const REGION_PARAM: Record<string, VisitorZone> = {
  a: "A", global: "A", us: "A", usa: "A",
  b: "A", international: "A",
  c: "C", india: "C", in: "C",
};

/** Region chosen via `?region=` (shareable link) or the region tabs. */
export function readRegionOverride(): VisitorZone | null {
  const value = new URLSearchParams(window.location.search).get("region");
  return value ? REGION_PARAM[value.toLowerCase()] ?? null : null;
}

export function setRegionOverride(zone: VisitorZone) {
  const url = new URL(window.location.href);
  url.searchParams.set("region", zone.toLowerCase());
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(REGION_EVENT));
}

/** The visitor's zone: `?region=` override first, otherwise guessed from the browser time zone. */
export function useVisitorZone(): VisitorZone | null {
  const [zone, setZone] = useState<VisitorZone | null>(null);
  useEffect(() => {
    const update = () =>
      setZone(readRegionOverride() ?? detectMentorshipZone(Intl.DateTimeFormat().resolvedOptions().timeZone));
    update();
    window.addEventListener(REGION_EVENT, update);
    return () => window.removeEventListener(REGION_EVENT, update);
  }, []);
  return zone;
}

/** Zone to show: a page's pinned default (unless overridden by ?region=), else the detected zone. */
export function useDisplayZone(defaultZone?: VisitorZone): VisitorZone {
  const detected = useVisitorZone();
  const [zone, setZone] = useState<VisitorZone>(defaultZone ?? "C");
  useEffect(() => {
    if (detected) setZone(defaultZone && !readRegionOverride() ? defaultZone : detected);
  }, [detected, defaultZone]);
  return zone;
}

"use client";

import { useEffect, useState } from "react";
import { detectMentorshipZone, type MentorshipZoneId } from "@/lib/mentorship-pricing";

/** Pricing zone: "C" = India (INR), "A" = everyone else (USD). */
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

/**
 * Zone to show. `fallbackZone` is only used for the static HTML before detection;
 * once the browser reports its location, location (or a ?region= test link) always wins.
 * `ready` is false until then, so callers can hide prices and avoid flashing the wrong currency.
 */
export function useDisplayZone(fallbackZone: VisitorZone = "C"): { zone: VisitorZone; ready: boolean } {
  const detected = useVisitorZone();
  return { zone: detected ?? fallbackZone, ready: detected !== null };
}

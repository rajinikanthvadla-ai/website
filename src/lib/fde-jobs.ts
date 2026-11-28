import fdeJobsFeed from "../../content/fde-jobs.json";

export type FdeJob = {
  id: string;
  company: string;
  title: string;
  location: string;
  locationFull?: string;
  url: string;
  source: string;
  board?: string;
  updatedAt: string | null;
  bullets: string[];
  courseTags: string[];
};

export type FdeJobsFeed = {
  updatedAt: string;
  expiresAt?: string;
  active?: boolean;
  displayCount: number;
  disclaimer: string;
  jobs: FdeJob[];
  meta?: {
    totalMatched?: number;
    uniqueTitles?: number;
    sources?: string[];
    errors?: string[];
    expired?: boolean;
  };
};

/** Two-week launch window ending 12 Dec 2026 IST. */
export const FDE_JOBS_EXPIRES_AT = "2026-12-12T18:29:59.999Z";

export function getFdeJobsFeed(): FdeJobsFeed {
  return fdeJobsFeed as FdeJobsFeed;
}

export function isFdeJobsWindowActive(now = Date.now()): boolean {
  const feed = getFdeJobsFeed();
  if (feed.active === false || feed.meta?.expired) return false;
  const expiresAt = Date.parse(feed.expiresAt || FDE_JOBS_EXPIRES_AT);
  if (Number.isNaN(expiresAt)) return false;
  return now <= expiresAt;
}

export function getFdeJobsForPage(limit = 8): FdeJob[] {
  if (!isFdeJobsWindowActive()) return [];
  const feed = getFdeJobsFeed();
  const count = Math.min(limit, feed.displayCount || limit, feed.jobs?.length || 0);
  return (feed.jobs || []).slice(0, count);
}

export function getFdeJobsUpdatedLabel(): string | null {
  const feed = getFdeJobsFeed();
  if (!feed.updatedAt) return null;
  const date = new Date(feed.updatedAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

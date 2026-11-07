/**
 * Light module (safe for client bundles): live class timing and time zone to market mapping.
 * The full market content lives in international-markets.ts.
 */
export type MarketSlug =
  | "usa" | "uk" | "ireland" | "netherlands" | "luxembourg" | "germany"
  | "canada" | "australia" | "singapore" | "uae" | "saudi-arabia" | "qatar";

/** Short labels for the "you are in X" strip. */
export const MARKET_LABELS: Record<MarketSlug, { name: string; flag: string; fee?: string }> = {
  usa: { name: "the US", flag: "🇺🇸" },
  uk: { name: "the UK", flag: "🇬🇧" },
  ireland: { name: "Ireland", flag: "🇮🇪" },
  netherlands: { name: "the Netherlands", flag: "🇳🇱" },
  luxembourg: { name: "Luxembourg", flag: "🇱🇺" },
  germany: { name: "Germany", flag: "🇩🇪" },
  canada: { name: "Canada", flag: "🇨🇦" },
  australia: { name: "Australia", flag: "🇦🇺" },
  singapore: { name: "Singapore", flag: "🇸🇬" },
  uae: { name: "the UAE", flag: "🇦🇪", fee: "AED 2,200" },
  "saudi-arabia": { name: "Saudi Arabia", flag: "🇸🇦", fee: "SAR 2,245" },
  qatar: { name: "Qatar", flag: "🇶🇦", fee: "QAR 2,180" },
};

/** Live cohort: Monday to Friday, 8:00 to 9:45 PM IST = 14:30 to 16:15 UTC. */
export const LIVE_CLASS_UTC = { start: { h: 14, m: 30 }, end: { h: 16, m: 15 } };

/** Browser time zone to market, for the "you are in X" strip. India is the default site and has no entry. */
export const TIMEZONE_TO_MARKET: Record<string, MarketSlug> = {
  "America/New_York": "usa", "America/Detroit": "usa", "America/Chicago": "usa", "America/Denver": "usa",
  "America/Phoenix": "usa", "America/Los_Angeles": "usa", "America/Anchorage": "usa", "Pacific/Honolulu": "usa",
  "America/Indiana/Indianapolis": "usa", "America/Kentucky/Louisville": "usa", "America/Boise": "usa",
  "Europe/London": "uk", "Europe/Belfast": "uk",
  "Europe/Dublin": "ireland",
  "Europe/Amsterdam": "netherlands",
  "Europe/Luxembourg": "luxembourg",
  "Europe/Berlin": "germany", "Europe/Busingen": "germany",
  "America/Toronto": "canada", "America/Montreal": "canada", "America/Vancouver": "canada", "America/Edmonton": "canada",
  "America/Winnipeg": "canada", "America/Halifax": "canada", "America/Regina": "canada", "America/St_Johns": "canada",
  "Australia/Sydney": "australia", "Australia/Melbourne": "australia", "Australia/Brisbane": "australia",
  "Australia/Perth": "australia", "Australia/Adelaide": "australia", "Australia/Hobart": "australia", "Australia/Darwin": "australia",
  "Asia/Singapore": "singapore",
  "Asia/Dubai": "uae",
  "Asia/Riyadh": "saudi-arabia",
  "Asia/Qatar": "qatar",
};

/** Formats the live class start and end in a time zone for a given week. */
export function liveClassTimes(tz: string, now = new Date()) {
  // Next Monday (UTC) at the class start.
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), LIVE_CLASS_UTC.start.h, LIVE_CLASS_UTC.start.m));
  while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
  const end = new Date(d.getTime() + ((LIVE_CLASS_UTC.end.h - LIVE_CLASS_UTC.start.h) * 60 + (LIVE_CLASS_UTC.end.m - LIVE_CLASS_UTC.start.m)) * 60000);
  const time = (x: Date) => new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(x);
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(d);
  const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hourCycle: "h23" }).format(d));
  const days = weekday === "Mon" ? "Mon–Fri" : weekday === "Tue" ? "Tue–Sat" : "Sun–Thu";
  const fit =
    hour >= 17 && hour < 22 ? "After work" :
    hour >= 6 && hour < 9 ? "Before work" :
    hour >= 9 && hour < 17 ? "During work hours" :
    hour >= 22 ? "Late evening" : "Overnight: use recordings";
  return { start: time(d), end: time(end), days, fit };
}

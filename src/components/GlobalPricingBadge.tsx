"use client";

import { useMemo } from "react";

type RegionPricing = {
  currency: "INR" | "USD" | "EUR";
  amount: number;
  timezoneLabel: string;
  timezoneIana: string;
};

const PRICING: Record<string, RegionPricing> = {
  IN: { currency: "INR", amount: 35000, timezoneLabel: "IST", timezoneIana: "Asia/Kolkata" },
  US: { currency: "USD", amount: 450, timezoneLabel: "ET", timezoneIana: "America/New_York" },
  EU: { currency: "EUR", amount: 420, timezoneLabel: "CET", timezoneIana: "Europe/Berlin" },
};

const EUROPE_TIMEZONES = [
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Amsterdam",
  "Europe/Prague",
  "Europe/Warsaw",
  "Europe/Helsinki",
];

function detectRegion(): keyof typeof PRICING {
  const locale = typeof navigator !== "undefined" ? navigator.language.toUpperCase() : "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (locale.endsWith("-IN") || timezone === "Asia/Kolkata") return "IN";
  if (locale.endsWith("-US") || timezone.startsWith("America/")) return "US";
  if (EUROPE_TIMEZONES.some((tz) => timezone.startsWith(tz.split("/")[0]) || timezone === tz)) return "EU";
  return "US";
}

function formatCurrency(amount: number, currency: RegionPricing["currency"]) {
  return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

function nextClassTimeLabel(region: RegionPricing) {
  const now = new Date();
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: region.timezoneIana,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  const classBase = new Date(now);
  classBase.setUTCHours(14, 30, 0, 0);
  return dtf.format(classBase);
}

export default function GlobalPricingBadge() {
  const region = useMemo(() => detectRegion(), []);
  const selection = PRICING[region];
  const localizedPrice = formatCurrency(selection.amount, selection.currency);

  return (
    <>
      <div className="text-white font-semibold text-sm">{nextClassTimeLabel(selection)} / 8:00 PM IST</div>
      <div className="text-stone-500 text-[10px] mt-1 uppercase tracking-wide">Time</div>
      <div className="mt-3 text-white font-semibold text-sm">{localizedPrice} ({selection.currency})</div>
      <div className="text-stone-500 text-[10px] mt-1 uppercase tracking-wide">Localized fee</div>
    </>
  );
}

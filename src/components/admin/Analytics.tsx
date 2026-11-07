"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BarList, Card, Notice, SectionTitle } from "./ui";

type Item = { name: string; count: number };
type Summary = {
  visitors: number;
  pageviews: number;
  clicks: number;
  by_day: { day: string; visitors: number; pageviews: number }[];
  sources: Item[];
  landing_pages: Item[];
  top_pages: Item[];
  campaigns: Item[];
  search_terms: Item[];
  clicks_top: Item[];
  devices: Item[];
  regions: Item[];
};

export default function Analytics({ db }: { db: SupabaseClient }) {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(null);
    db.rpc("analytics_summary", { p_days: days }).then(({ data: d, error: e }) => {
      if (e) return setError(e.message);
      setError("");
      setData(d as Summary);
    });
  }, [db, days]);

  const maxDay = Math.max(1, ...(data?.by_day ?? []).map((d) => d.visitors));

  return (
    <div className="grid gap-4">
      <SectionTitle
        title="Analytics"
        sub="Who comes, from where, to which page, and what they click. No cookies, no IP addresses."
        actions={
          <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`px-3 py-2 text-sm font-semibold ${days === d ? "bg-[#0f172a] text-white" : "bg-white text-slate-700"}`}
              >
                {d} days
              </button>
            ))}
          </div>
        }
      />
      {error ? <Notice tone="error">{error}</Notice> : null}
      {!data && !error ? <p className="text-sm text-slate-500">Loading...</p> : null}

      {data ? (
        <>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Visitors", data.visitors],
              ["Page views", data.pageviews],
              ["Key clicks", data.clicks],
            ].map(([label, value]) => (
              <Card key={label as string}>
                <p className="font-display text-3xl font-bold text-[#0f172a] tabular-nums">{value as number}</p>
                <p className="text-xs text-slate-500">{label as string}</p>
              </Card>
            ))}
          </div>

          <Card>
            <p className="font-semibold text-[#0f172a] mb-3">Visitors per day</p>
            {data.by_day.length ? (
              <div className="flex items-end gap-[3px] h-32" role="img" aria-label="Visitors per day">
                {data.by_day.map((d) => (
                  <div key={d.day} className="flex-1 min-w-[3px] rounded-t bg-teal-600/80 hover:bg-[#c2410c]" style={{ height: `${(d.visitors / maxDay) * 100}%` }} title={`${d.day}: ${d.visitors} visitors, ${d.pageviews} views`} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No visits recorded yet.</p>
            )}
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <p className="font-semibold text-[#0f172a] mb-1">Where visitors come from</p>
              <p className="text-xs text-slate-500 mb-3">Search engines, AI assistants (ChatGPT, Perplexity), social, or your tagged links.</p>
              <BarList items={data.sources} />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-1">First page they land on</p>
              <p className="text-xs text-slate-500 mb-3">This is the topic that brought them. The strongest signal of what to build or sell next.</p>
              <BarList items={data.landing_pages} />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-1">What they click</p>
              <p className="text-xs text-slate-500 mb-3">Enroll, WhatsApp, checkout, booking and outbound links.</p>
              <BarList items={data.clicks_top} />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-3">Most viewed pages</p>
              <BarList items={data.top_pages} />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-1">Search words</p>
              <p className="text-xs text-slate-500 mb-3">
                Google and Bing hide search words from websites. Words show here only from links you tag with utm_term (ads, posts). For
                Google search words open{" "}
                <a className="text-teal-700 underline" href="https://search.google.com/search-console/performance/search-analytics" target="_blank" rel="noopener noreferrer">
                  Search Console
                </a>{" "}
                and{" "}
                <a className="text-teal-700 underline" href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer">
                  Bing Webmaster
                </a>
                .
              </p>
              <BarList items={data.search_terms} empty="No tagged search words yet." />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-1">Campaigns</p>
              <p className="text-xs text-slate-500 mb-3">
                From links like <code className="text-[11px]">?utm_source=youtube&amp;utm_campaign=dec-batch</code>
              </p>
              <BarList items={data.campaigns} empty="No tagged links yet." />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-3">Devices</p>
              <BarList items={data.devices} />
            </Card>
            <Card>
              <p className="font-semibold text-[#0f172a] mb-1">Regions</p>
              <p className="text-xs text-slate-500 mb-3">From the visitor&apos;s time zone (Asia/Kolkata is India).</p>
              <BarList items={data.regions} />
            </Card>
          </div>
        </>
      ) : null}
    </div>
  );
}

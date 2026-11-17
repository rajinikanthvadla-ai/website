import { INTL_MARKETS } from "@/lib/international-markets";

/** Country facts on the one global-training page. Not a link to a separate country URL. */
export function IntlMarketCard({ slug }: { slug: string }) {
  const market = INTL_MARKETS.find((m) => m.slug === slug);
  if (!market) return null;

  const pay = market.salaryRange ? `${market.salaryRange} typical pay` : `${market.priceLive} live`;
  const fee = market.localFee ? `About ${market.localFee.live} live` : pay;

  return (
    <article id={market.slug} className="intl-hub-card">
      <span className="text-3xl mb-3 block" aria-hidden>
        {market.flag}
      </span>
      <h3 className="font-display font-bold text-[#0f172a] text-lg">{market.name}</h3>
      <p className="text-sm text-slate-500 mt-1">{market.salaryRange ? pay : fee}</p>
      <p className="text-xs text-slate-400 mt-2">{market.hubCities.slice(0, 3).join(", ")}</p>
      <p className="text-xs text-slate-600 mt-3 leading-relaxed">{market.timezoneNote}</p>
    </article>
  );
}

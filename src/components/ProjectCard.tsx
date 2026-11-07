import type { PortfolioProject } from "@/lib/cms";

const CATEGORY_LABEL: Record<PortfolioProject["category"], string> = {
  client: "Client delivery",
  product: "Product",
  "open-source": "Open source",
};

export default function ProjectCard({ project, detailed = false }: { project: PortfolioProject; detailed?: boolean }) {
  const p = project;
  return (
    <article id={p.slug} className="lift bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col scroll-mt-24">
      {p.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.image_url}
          alt={p.title}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[16/9] object-cover object-top border-b border-slate-200 bg-slate-100"
        />
      ) : null}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-orange-700 mb-2">
          {CATEGORY_LABEL[p.category]}
          {p.client_label ? <span className="text-slate-500"> · {p.client_label}</span> : null}
        </p>
        <h3 className="font-display font-bold text-xl text-[#0f172a] leading-snug mb-2">{p.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.summary}</p>

        {detailed && p.problem ? (
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            <span className="font-semibold text-[#0f172a]">Problem. </span>
            {p.problem}
          </p>
        ) : null}
        {detailed && p.solution ? (
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            <span className="font-semibold text-[#0f172a]">What I built. </span>
            {p.solution}
          </p>
        ) : null}

        {p.results.length ? (
          <ul className="space-y-1.5 mb-4">
            {p.results.map((r) => (
              <li key={r} className="text-sm text-slate-800 flex gap-2">
                <span className="text-teal-700 font-bold" aria-hidden>
                  ✓
                </span>
                {r}
              </li>
            ))}
          </ul>
        ) : null}

        {p.stack.length ? (
          <ul className="flex flex-wrap gap-1.5 mb-4 mt-auto" aria-label="Stack">
            {p.stack.slice(0, detailed ? 12 : 6).map((s) => (
              <li key={s} className="text-[11px] font-semibold text-slate-700 bg-slate-100 rounded px-2 py-0.5">
                {s}
              </li>
            ))}
          </ul>
        ) : null}

        {p.link_url || p.repo_url ? (
          <div className="flex flex-wrap gap-2">
            {p.link_url ? (
              <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink !py-2 !text-sm">
                {p.category === "open-source" ? "Download" : "Open"}
              </a>
            ) : null}
            {p.repo_url ? (
              <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ghost !py-2 !text-sm">
                Source code
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

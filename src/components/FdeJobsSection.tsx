import Link from "next/link";
import { LINKS } from "@/lib/constants";
import {
  getFdeJobsFeed,
  getFdeJobsForPage,
  getFdeJobsUpdatedLabel,
} from "@/lib/fde-jobs";

type Props = {
  limit?: number;
};

export default function FdeJobsSection({ limit = 8 }: Props) {
  const jobs = getFdeJobsForPage(limit);
  if (!jobs.length) return null;

  const feed = getFdeJobsFeed();
  const updatedLabel = getFdeJobsUpdatedLabel();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200" id="fde-jobs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">
            Live FDE openings
            {updatedLabel ? ` · Updated ${updatedLabel}` : ""}
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Roles this course trains you toward
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Real Forward Deployed and Applied AI engineering posts from public company career boards.
            Read the requirements — then use the cohort demo, evals, and playbook in interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {jobs.map((job) => (
            <article key={job.id} className="panel p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">
                    {job.company}
                  </p>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                    {job.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-3" title={job.locationFull || job.location}>
                {job.location}
              </p>
              {job.courseTags?.length ? (
                <ul className="flex flex-wrap gap-2 mb-4">
                  {job.courseTags.map((tag) => (
                    <li
                      key={`${job.id}-${tag}`}
                      className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded px-2 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              {job.bullets?.length ? (
                <ul className="space-y-2 text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                  {job.bullets.slice(0, 3).map((bullet) => (
                    <li key={`${job.id}-${bullet.slice(0, 24)}`} className="pl-3 border-l-2 border-slate-200">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600 mb-5 flex-1">
                  Open the company posting for full requirements.
                </p>
              )}
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800"
                data-track={`FDE course: job apply ${job.company}`}
              >
                View on {job.company} careers →
              </a>
            </article>
          ))}
        </div>

        <div className="panel p-5 md:p-6 bg-slate-50">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{feed.disclaimer}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={LINKS.whatsappFde}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              data-track="FDE course: jobs section WhatsApp"
            >
              WhatsApp: ask if this cohort fits your target role
            </a>
            <Link
              href="/roadmap/fde-engineer/"
              className="inline-flex px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-300 text-slate-700 hover:border-slate-500"
            >
              FDE career roadmap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

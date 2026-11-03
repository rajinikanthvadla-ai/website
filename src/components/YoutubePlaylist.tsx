import { LINKS } from "@/lib/constants";
import { YOUTUBE_MEMBERSHIP_JOIN_URL } from "@/lib/youtube-membership";
import { getLatestYoutubeVideos, getYoutubeLastSyncedLabel } from "@/lib/youtube-videos";

function formatPublishedDate(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Home YouTube block: left copy, right = latest synced uploads from the channel. */
export default function YoutubePlaylist() {
  const videos = getLatestYoutubeVideos(6);
  const lastSynced = getYoutubeLastSyncedLabel();

  return (
    <section id="youtube" className="border-y border-slate-200 bg-white py-14 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-600 mb-2">YouTube</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-3 leading-tight">
              Latest uploads from the channel
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-md">
              This list is auto-fetched from Rajinikanth Vadla&apos;s YouTube channel on every site deploy and daily sync.
              New public videos show up here after the next refresh.
            </p>
            {lastSynced ? (
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-100 rounded-md px-2.5 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" aria-hidden />
                Last synced {lastSynced}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 max-w-sm">
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="notion-btn notion-btn--ink text-center"
              >
                Open YouTube channel
              </a>
              <a
                href={YOUTUBE_MEMBERSHIP_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="notion-btn notion-btn--ghost text-center"
              >
                Membership (private videos)
              </a>
            </div>
          </div>

          <ul className="space-y-3">
            {videos.map((video) => (
              <li key={video.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 hover:border-slate-400 transition-colors"
                >
                  <div className="relative w-[132px] sm:w-[148px] shrink-0 aspect-video overflow-hidden rounded-md bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                      <span className="w-8 h-8 rounded-full bg-red-600 text-white text-xs flex items-center justify-center opacity-90">
                        ▶
                      </span>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <h3 className="font-display font-bold text-sm text-[#0f172a] leading-snug line-clamp-2 group-hover:text-teal-800">
                      {video.title}
                    </h3>
                    {video.uploadDate ? (
                      <p className="text-[11px] text-slate-400 mt-1.5">{formatPublishedDate(video.uploadDate)}</p>
                    ) : null}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

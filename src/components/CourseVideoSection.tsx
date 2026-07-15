import Link from "next/link";
import type { CourseVideo } from "@/lib/course-videos";
import { videoListSchema } from "@/lib/course-videos";
import { LINKS } from "@/lib/constants";
import YouTubeEmbed from "@/components/YouTubeEmbed";

type Props = {
  title?: string;
  subtitle?: string;
  videos: CourseVideo[];
  /** Use dark/paper section backgrounds to match page. */
  variant?: "white" | "paper" | "notion";
  /** Deduplicate JSON-LD when parent already emits list schema. */
  emitListSchema?: boolean;
};

export default function CourseVideoSection({
  title = "Watch course videos",
  subtitle = "Real class recordings and labs from Rajinikanth Vadla — embedded from YouTube.",
  videos,
  variant = "paper",
  emitListSchema = true,
}: Props) {
  if (!videos.length) return null;

  const sectionClass =
    variant === "notion"
      ? "notion-section notion-section--paper"
      : variant === "white"
        ? "border-b border-slate-200 bg-white py-16 md:py-20"
        : "border-b border-slate-200 bg-slate-50 py-16 md:py-20";

  return (
    <section className={sectionClass} id="course-videos" aria-labelledby="course-videos-heading">
      {emitListSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListSchema(videos)) }}
        />
      ) : null}
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-700">
          YouTube · Rajinikanth Vadla
        </p>
        <h2 id="course-videos-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{subtitle}</p>

        <div className="mt-10 grid gap-8">
          {videos.map((video) => (
            <YouTubeEmbed key={video.id} video={video} schema={false} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded-lg bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            More on YouTube &rarr;
          </a>
          <p className="mt-3 text-xs text-slate-500">
            Prefer the full live cohort?{" "}
            <Link href="/courses/" className="font-semibold text-blue-700 hover:underline">
              View all courses
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

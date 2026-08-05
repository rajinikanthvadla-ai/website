import type { CourseVideo } from "@/lib/course-videos";
import { videoObjectSchema } from "@/lib/course-videos";

type Props = {
  video: CourseVideo;
  /** Include VideoObject JSON-LD for this embed (default true). */
  schema?: boolean;
  className?: string;
};

export default function YouTubeEmbed({ video, schema = true, className = "" }: Props) {
  return (
    <div className={className}>
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema(video)) }}
        />
      ) : null}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="relative aspect-video bg-slate-900">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="border-t border-slate-200 p-4 sm:p-5">
          <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg leading-snug">
            {video.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

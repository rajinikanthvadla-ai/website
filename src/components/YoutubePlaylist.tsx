import { COURSE_VIDEOS } from "@/lib/course-videos";
import { LINKS } from "@/lib/constants";

export default function YoutubePlaylist() {
  const videos = [...COURSE_VIDEOS.masterclass, ...COURSE_VIDEOS.aiAgents].slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Watch Free
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Recent Course Videos
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Watch real class recordings from Rajinikanth Vadla's YouTube channel. See the teaching style and course content before you enroll.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xl">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black text-white px-2 py-1 rounded text-xs font-bold">
                  YouTube
                </div>
              </div>

              {/* Title */}
              <div className="p-4 bg-slate-50">
                <h3 className="font-display font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">{video.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Browse All */}
        <div className="text-center">
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            <span className="text-xl">🎥</span>
            Browse All Videos on YouTube
          </a>
          <p className="text-slate-600 text-sm mt-4">
            60+ videos • MLOps • GenAI • AI Agents • AIOps • Production ML
          </p>
        </div>
      </div>
    </section>
  );
}

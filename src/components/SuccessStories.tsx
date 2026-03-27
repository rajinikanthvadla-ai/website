"use client";

import { useState } from "react";
import Image from "next/image";
import { SUCCESS_STORIES, LINKS } from "@/lib/constants";

export default function SuccessStories() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="success-stories" className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/30 text-accent-400 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-5">
            Real Results
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Student{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Success Stories
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how our students transformed their careers with hands-on training
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUCCESS_STORIES.map((story, i) => (
            <button
              key={i}
              onClick={() => setLightboxSrc(story.src)}
              className="group relative rounded-2xl overflow-hidden h-[280px] md:h-[320px] border-2 border-transparent hover:border-accent-500 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-500/20"
            >
              <Image
                src={story.src}
                alt={`Student Success - ${story.badge}`}
                fill
                className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-gradient-to-r from-accent-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {story.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 pt-10 border-t border-white/5">
          {[
            { value: "500+", label: "Engineers Trained" },
            { value: "60%", label: "Avg Salary Hike" },
            { value: "95%", label: "Placement Rate" },
            { value: "4.9\u2605", label: "Student Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 stat-number">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mt-2 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={LINKS.topmate}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-teal-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-accent-500/25 hover:-translate-y-1 hover:shadow-accent-500/40 transition-all"
          >
            Start Your Success Story Today
          </a>
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl font-bold hover:bg-white/20 hover:scale-110 transition-all border border-white/20"
            onClick={() => setLightboxSrc(null)}
          >
            &times;
          </button>
          <Image
            src={lightboxSrc}
            alt="Success Story"
            width={800}
            height={600}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { SUCCESS_STORIES, LINKS } from "@/lib/constants";

export default function SuccessStories() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="success-stories" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Real Results</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            See how engineers transformed their careers with hands-on training
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {SUCCESS_STORIES.map((story, i) => (
            <button
              key={i}
              onClick={() => setLightboxSrc(story.src)}
              className="group relative rounded-2xl overflow-hidden h-[280px] md:h-[300px] ring-1 ring-white/5 hover:ring-emerald-500/50 transition-all hover:-translate-y-1"
            >
              <Image
                src={story.src}
                alt={`Student Success - ${story.badge}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {story.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-20 mt-16 pt-10 border-t border-white/5">
          {[
            { value: "500+", label: "Engineers Trained" },
            { value: "60%", label: "Avg Salary Hike" },
            { value: "95%", label: "Placement Rate" },
            { value: "4.9★", label: "Student Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white stat-number">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={LINKS.topmate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5"
          >
            Start Your Success Story &rarr;
          </a>
        </div>
      </div>

      {lightboxSrc && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightboxSrc(null)}>
          <button className="absolute top-6 right-6 w-12 h-12 border border-white/20 text-white rounded-full flex items-center justify-center text-2xl hover:bg-white/10 transition-all" onClick={() => setLightboxSrc(null)}>
            &times;
          </button>
          <Image src={lightboxSrc} alt="Success Story" width={800} height={600} className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl animate-scale-in" />
        </div>
      )}
    </section>
  );
}

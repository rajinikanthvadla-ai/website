"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SUCCESS_STORIES, TEXT_TESTIMONIALS, LINKS } from "@/lib/constants";
import { encodePublicPath } from "@/lib/encodePublicPath";

export default function SuccessStories() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
  }, []);

  const openLightbox = useCallback((src: unknown) => {
    if (typeof src !== "string" || src.length === 0 || !src.startsWith("/")) return;
    setLightboxSrc(src);
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxSrc, closeLightbox]);

  return (
    <section id="success-stories" className="notion-section notion-section--paper overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Outcomes
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Notes from people who sat in the same calls
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Written feedback from alumni plus screenshots they chose to share.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {TEXT_TESTIMONIALS.map((t) => (
            <figure
              key={t.role}
              className="bg-white border-2 border-slate-900 rounded-lg p-5 shadow-[3px_3px_0_#0f172a] flex flex-col"
            >
              <blockquote className="text-sm text-slate-700 leading-relaxed flex-1 mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => openLightbox(t.image)}
                  className="relative w-10 h-10 rounded-sm overflow-hidden border border-slate-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  aria-label={`View screenshot from ${t.role}`}
                >
                  <Image
                    src={encodePublicPath(t.image)}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="40px"
                  />
                </button>
                <div>
                  <span className="inline-block bg-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mb-1">
                    {t.badge}
                  </span>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">More screenshots from students</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {SUCCESS_STORIES.map((story, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(story.src)}
              className="group relative overflow-hidden h-[200px] md:h-[240px] rounded-sm border-2 border-[#0f172a] bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2 shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <Image
                src={encodePublicPath(story.src)}
                alt={`Student message screenshot — ${story.badge}`}
                fill
                className="object-cover object-top group-hover:opacity-90 transition-opacity duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="inline-block bg-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                  {story.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 pt-10 border-t border-slate-200">
          {[
            { value: "500+", label: "People through programs" },
            { value: "60%", label: "Avg. reported hike*" },
            { value: "4.9★", label: "Session feedback" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-slate-900 stat-number">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 max-w-[9rem] mx-auto leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-slate-400 mt-4">* Self-reported outcomes from alumni; not a guarantee of future results.</p>

        <div className="text-center mt-10">
          <a
            href={LINKS.topmate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            Talk before you commit &rarr;
          </a>
        </div>
      </div>

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/90 flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged student story"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            type="button"
            className="absolute top-6 right-6 z-[10000] w-11 h-11 rounded-lg border border-slate-600 text-slate-100 flex items-center justify-center text-xl hover:bg-slate-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={encodePublicPath(lightboxSrc)}
              alt="Success story screenshot"
              width={800}
              height={600}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain animate-scale-in rounded-lg"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

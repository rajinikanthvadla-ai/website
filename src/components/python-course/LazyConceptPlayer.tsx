"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Scene } from "@/lib/python-course/scenes";

const ConceptPlayer = dynamic(() => import("./ConceptPlayer"), { ssr: false });

type Props = {
  scene: Scene;
};

export default function LazyConceptPlayer({ scene }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={frameRef} className="min-h-72">
      {visible ? (
        <ConceptPlayer scene={scene} />
      ) : (
        <section className="min-h-72 border-2 border-slate-900 rounded-lg bg-[#fffef8] p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Watch it run</p>
          <h2 className="font-display text-xl font-bold text-slate-900 mt-1">{scene.title}</h2>
          <p className="mt-1 text-[15px] leading-6 text-slate-700">{scene.blurb}</p>
        </section>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AI_AUTOMATION_SECTIONS } from "@/lib/ai-automation-content";

export default function CourseSectionNav() {
  const [active, setActive] = useState("for-you");

  useEffect(() => {
    const ids = AI_AUTOMATION_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="sticky top-[57px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] auto-nav" aria-label="Course sections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex gap-1.5 overflow-x-auto py-3 scrollbar-none">
          {AI_AUTOMATION_SECTIONS.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className="inline-block px-5 py-2.5 text-sm font-bold text-slate-600 rounded-full hover:text-blue-700 hover:bg-blue-50 transition-all whitespace-nowrap"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

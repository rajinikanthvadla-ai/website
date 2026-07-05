"use client";

import { LINKS } from "@/lib/constants";
import { AI_AUTOMATION_PRICE } from "@/lib/ai-automation-content";

export default function StickyEnrollBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 bg-slate-900/95 backdrop-blur-md px-4 py-3 md:hidden">
      <div className="flex gap-2 max-w-lg mx-auto items-center">
        <span className="text-white font-bold text-sm shrink-0">{AI_AUTOMATION_PRICE}</span>
        <a
          href="#enroll"
          className="flex-1 text-center bg-blue-700 text-white py-3 rounded-lg text-sm font-bold"
        >
          Enroll
        </a>
        <a
          href={LINKS.whatsappAutomation}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-orange-500 text-white py-3 rounded-lg text-sm font-bold"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { MasterclassModule } from "@/lib/masterclass-syllabus";
import { MLOPS_MASTERCLASS_SYLLABUS } from "@/lib/masterclass-syllabus";

type Props = {
  modules?: MasterclassModule[];
  variant?: "compact" | "accordion";
};

function ModuleAccordion({ mod, defaultOpen }: { mod: MasterclassModule; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const labCount = mod.sections.filter((s) => s.lab).length;

  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="w-10 h-10 shrink-0 rounded-lg bg-blue-700 text-white flex items-center justify-center text-sm font-bold">
          {mod.module}
        </span>
        <span className="flex-1 min-w-0">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{mod.duration}</span>
          <span className="block font-display font-bold text-slate-900 text-lg mt-1 leading-snug">{mod.title}</span>
          <span className="block text-sm text-slate-500 mt-1.5 leading-relaxed">{mod.summary}</span>
          {!open && (
            <span className="inline-block mt-3 text-xs text-slate-400">
              {mod.sections.length} topics{labCount > 0 ? ` · ${labCount} labs` : ""}
            </span>
          )}
        </span>
        <span className="text-slate-400 text-xl shrink-0 mt-1 transition-transform" style={{ transform: open ? "rotate(45deg)" : undefined }}>
          +
        </span>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100">
          <div className="space-y-5 mt-5">
            {mod.sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2 flex-wrap">
                  {section.title}
                  {section.lab && (
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-white px-2 py-0.5 rounded">
                      Lab
                    </span>
                  )}
                </h4>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                      <span className="text-blue-600 shrink-0 mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleCompact({ mod }: { mod: MasterclassModule }) {
  const preview = mod.sections.slice(0, 4);

  return (
    <div className="panel p-6 bg-white h-full">
      <div className="flex items-start gap-4 mb-4">
        <span className="w-10 h-10 shrink-0 rounded-lg bg-blue-700 text-white flex items-center justify-center text-sm font-bold">
          {mod.module}
        </span>
        <div>
          <span className="text-xs font-bold text-orange-600">{mod.duration}</span>
          <h3 className="font-display font-bold text-slate-900 text-lg leading-snug mt-1">{mod.title}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{mod.summary}</p>
      <ul className="space-y-1.5">
        {preview.map((s) => (
          <li key={s.title} className="text-sm text-slate-600 flex items-center gap-2">
            <span className="text-blue-600 font-bold shrink-0">·</span>
            <span className="truncate">{s.title}</span>
            {s.lab && <span className="text-[9px] font-bold text-orange-600 uppercase shrink-0">Lab</span>}
          </li>
        ))}
      </ul>
      {mod.sections.length > 4 && (
        <p className="text-xs text-slate-400 mt-3">+{mod.sections.length - 4} more topics</p>
      )}
    </div>
  );
}

export default function MasterclassSyllabus({ modules = MLOPS_MASTERCLASS_SYLLABUS, variant = "accordion" }: Props) {
  if (variant === "compact") {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <ModuleCompact key={mod.module} mod={mod} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {modules.map((mod, i) => (
        <ModuleAccordion key={mod.module} mod={mod} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

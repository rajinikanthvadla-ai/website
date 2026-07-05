"use client";

import { useState } from "react";
import type { AutomationModule } from "@/lib/ai-automation-content";
import { AI_AUTOMATION_SYLLABUS_RICH } from "@/lib/ai-automation-content";
import { flowAlign } from "./FlowFrame";

type Props = { modules?: AutomationModule[] };

function ModuleFlow({ mod, index }: { mod: AutomationModule; index: number }) {
  const [open, setOpen] = useState(false);
  const align = flowAlign(index);

  return (
    <div className={`auto-flow-item auto-flow-item--${align}`}>
      <div className="auto-flow-rail" aria-hidden>
        <span className="auto-flow-num">{mod.icon}</span>
      </div>
      <article className={`auto-frame auto-frame--module auto-frame--syllabus ${open ? "auto-frame--open" : ""}`}>
        <div className="auto-frame-back" aria-hidden />
        <div className="auto-frame-front">
          <div className="auto-syllabus-module-head">
            <span className="auto-syllabus-module-num">Module {mod.module}</span>
            <span className="auto-syllabus-module-week">{mod.duration}</span>
          </div>
          <h3 className="auto-frame-title">{mod.title}</h3>
          <p className="text-sm text-slate-500 mt-2 mb-3">{mod.summary}</p>
          <p className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-lg mb-3">
            You build: {mod.outcome}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {mod.jdSkills.map((s) => (
              <span key={s} className="auto-tag">
                {s}
              </span>
            ))}
          </div>
          {open ? (
            <div className="space-y-3 border-t border-slate-100 pt-3">
              {mod.sections.map((sec) => (
                <div key={sec.title}>
                  <p className="text-xs font-bold text-slate-800 mb-1">
                    {sec.title}
                    {sec.lab && (
                      <span className="ml-1 text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded uppercase">
                        Lab
                      </span>
                    )}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {sec.items.map((item) => (
                      <li key={item} className="flex gap-1">
                        <span className="text-blue-600">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-blue-700"
              >
                Collapse module
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              Expand module +
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default function AutomationSyllabus({ modules = AI_AUTOMATION_SYLLABUS_RICH }: Props) {
  return (
    <div className="auto-syllabus-flow-wrap">
      <p className="auto-syllabus-flow-hint">6 modules · tap any module to see labs, topics, and builds</p>
      <div className="auto-flow-path auto-flow-path--syllabus">
        {modules.map((mod, i) => (
          <ModuleFlow key={mod.module} mod={mod} index={i} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import type { AutomationModule } from "@/lib/ai-automation-content";
import { AI_AUTOMATION_SYLLABUS_RICH } from "@/lib/ai-automation-content";
import { sketchForSyllabusModule } from "@/lib/sketch-assets";
import { flowAlign } from "./FlowFrame";

const MODULE_ACCENTS = ["#fef9c3", "#dbeafe", "#ffedd5", "#f3e8ff", "#fef9c3", "#dbeafe"];

type Props = { modules?: AutomationModule[] };

function ModuleFlow({ mod, index }: { mod: AutomationModule; index: number }) {
  const [open, setOpen] = useState(false);
  const align = flowAlign(index);
  const sketch = sketchForSyllabusModule(mod.module);

  return (
    <div className={`auto-flow-item auto-flow-item--${align}`}>
      <div className="auto-flow-rail" aria-hidden>
        <span className="auto-flow-num">{String(mod.module).padStart(2, "0")}</span>
      </div>
      <article
        className={`notion-syllabus-module ${open ? "ring-2 ring-blue-600 ring-offset-2" : ""}`}
        style={{ "--mod-accent": MODULE_ACCENTS[index % MODULE_ACCENTS.length] } as React.CSSProperties}
      >
        <div className="notion-syllabus-module-sketch">
          <Image
            src={sketch}
            alt={`Module ${mod.module} illustration`}
            width={160}
            height={100}
          />
          <span className="notion-syllabus-module-num-big">{mod.module}</span>
        </div>
        <div className="notion-syllabus-module-body">
          <div className="notion-syllabus-module-head">
            <span className="notion-dash-badge">Module {mod.module}</span>
            <span className="notion-dash-tag">{mod.duration}</span>
          </div>
          <h3 className="notion-board-title text-lg">{mod.title}</h3>
          <p className="text-sm text-slate-500 mt-2 mb-3">{mod.summary}</p>
          <p className="text-xs font-bold text-slate-800 bg-[var(--mod-accent)] border-2 border-slate-900 px-3 py-2 rounded-sm mb-3">
            You build: {mod.outcome}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {mod.jdSkills.map((s) => (
              <span key={s} className="notion-board-tag">
                {s}
              </span>
            ))}
          </div>
          {open ? (
            <div className="space-y-3 border-t-2 border-dashed border-slate-200 pt-3">
              {mod.sections.map((sec) => (
                <div key={sec.title}>
                  <p className="text-xs font-bold text-slate-800 mb-1">
                    {sec.title}
                    {sec.lab && (
                      <span className="ml-1 text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded-sm uppercase">
                        Lab
                      </span>
                    )}
                  </p>
                  <ul className="notion-board-list text-xs">
                    {sec.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="notion-dash-link"
              >
                Collapse module
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setOpen(true)} className="notion-dash-btn notion-dash-btn--ghost w-full text-center">
              Expand full module +
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default function AutomationSyllabus({ modules = AI_AUTOMATION_SYLLABUS_RICH }: Props) {
  return (
    <div className="notion-syllabus-board notion-syllabus-flow">
      <p className="notion-syllabus-hint">6 modules · tap to expand labs, topics, and builds</p>
      <div className="auto-flow-path auto-flow-path--syllabus">
        {modules.map((mod, i) => (
          <ModuleFlow key={mod.module} mod={mod} index={i} />
        ))}
      </div>
    </div>
  );
}

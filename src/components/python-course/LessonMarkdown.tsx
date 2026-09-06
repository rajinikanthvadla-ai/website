"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonMarkdown({ content }: { content: string }) {
  const cleaned = content.replace(/\u2014/g, " - ").replace(/\u2013/g, " - ");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="text-[15px] text-slate-700 leading-7 mb-3.5 last:mb-0">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-5 space-y-1.5 mb-3.5 text-[15px] text-slate-700 marker:text-emerald-600">{children}</ul>
        ),
        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 mb-3.5 text-[15px] text-slate-700">{children}</ol>,
        li: ({ children }) => <li className="leading-7 [&>p]:mb-0">{children}</li>,
        strong: ({ children }) => <strong className="text-slate-900 font-semibold">{children}</strong>,
        h3: ({ children }) => (
          <h3 className="font-display text-[17px] font-bold text-slate-900 mt-4 mb-1.5">{children}</h3>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4 border border-emerald-100 rounded-2xl bg-white">
            <table className="w-full text-sm text-left">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-emerald-50 border-b border-emerald-100">{children}</thead>,
        tbody: ({ children }) => <tbody className="text-slate-700">{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-emerald-50 last:border-0">{children}</tr>,
        th: ({ children }) => <th className="px-3 py-2 font-bold text-slate-900">{children}</th>,
        td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
        code: ({ className, children }) => {
          if (className?.startsWith("language-")) {
            return <code className={className}>{children}</code>;
          }
          return (
            <code className="bg-white text-slate-800 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-emerald-100">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-[#0f172a] text-slate-100 text-sm p-4 rounded-2xl overflow-x-auto my-4 font-mono leading-relaxed [tab-size:2]">
            {children}
          </pre>
        ),
      }}
    >
      {cleaned}
    </ReactMarkdown>
  );
}

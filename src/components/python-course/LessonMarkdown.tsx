"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-600 marker:text-blue-700">{children}</ul>
        ),
        ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-600">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed [&>p]:mb-0">{children}</li>,
        strong: ({ children }) => <strong className="text-slate-900">{children}</strong>,
        h3: ({ children }) => (
          <h3 className="font-display text-lg font-bold text-slate-900 mt-6 mb-2">{children}</h3>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-5 border-2 border-slate-200 rounded-lg">
            <table className="w-full text-sm text-left">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-slate-100 border-b border-slate-200">{children}</thead>,
        tbody: ({ children }) => <tbody className="text-slate-600">{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-slate-100 last:border-0">{children}</tr>,
        th: ({ children }) => <th className="px-3 py-2 font-bold text-slate-900">{children}</th>,
        td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
        code: ({ className, children }) => {
          if (className?.startsWith("language-")) {
            return <code className={className}>{children}</code>;
          }
          return (
            <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-[#0f172a] text-slate-100 text-sm p-4 rounded-lg overflow-x-auto my-4 font-mono leading-relaxed">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

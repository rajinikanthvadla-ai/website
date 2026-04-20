"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-10 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-display text-xl font-bold text-stone-900 mt-8 mb-3">{children}</h3>
        ),
        p: ({ children }) => <p className="text-stone-600 leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-stone-600 marker:text-accent-600">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-stone-600">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed [&>p]:mb-0">{children}</li>,
        strong: ({ children }) => <strong className="text-stone-900">{children}</strong>,
        a: ({ href, children }) => {
          if (href?.startsWith("/")) {
            return (
              <Link href={href} className="text-accent-600 font-semibold underline underline-offset-2 hover:text-accent-700">
                {children}
              </Link>
            );
          }
          return (
            <a href={href} className="text-accent-600 font-semibold underline underline-offset-2 hover:text-accent-700" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-6 border border-stone-200 rounded-sm">
            <table className="w-full text-sm text-left">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-stone-100 border-b border-stone-200">{children}</thead>,
        tbody: ({ children }) => <tbody className="text-stone-600">{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-stone-100 last:border-0">{children}</tr>,
        th: ({ children }) => <th className="px-3 py-2 font-bold text-stone-900">{children}</th>,
        td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
        pre: ({ children }) => (
          <pre className="bg-stone-900 text-stone-100 text-sm p-4 rounded-sm overflow-x-auto my-4 font-mono leading-relaxed whitespace-pre-wrap border border-stone-800">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          if (className?.startsWith("language-")) {
            return <code className={className}>{children}</code>;
          }
          return <code className="bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono">{children}</code>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

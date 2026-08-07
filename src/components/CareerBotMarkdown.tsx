"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

type Props = { content: string };

/** Compact markdown tuned for chat bubbles — lists, links, and section headers. */
export default function CareerBotMarkdown({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <p className="font-display font-bold text-[#0f172a] text-[0.8rem] uppercase tracking-wide mt-3 mb-1.5 first:mt-0">
            {children}
          </p>
        ),
        h3: ({ children }) => (
          <p className="font-display font-bold text-[#0f172a] text-[0.8rem] uppercase tracking-wide mt-3 mb-1.5 first:mt-0">
            {children}
          </p>
        ),
        h4: ({ children }) => (
          <p className="font-bold text-[#0f172a] text-xs mt-2 mb-1">{children}</p>
        ),
        p: ({ children }) => (
          <p className="text-[0.8125rem] text-slate-700 leading-relaxed mb-2 last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1.5 mb-2 last:mb-0 pl-0 list-none">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 space-y-1.5 mb-2 last:mb-0 marker:font-bold marker:text-orange-600">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="career-bot-li text-[0.8125rem] text-slate-700 leading-relaxed">
            <span className="flex-1 [&>p]:mb-0">{children}</span>
          </li>
        ),
        strong: ({ children }) => <strong className="font-bold text-[#0f172a]">{children}</strong>,
        em: ({ children }) => <em className="text-slate-600 not-italic">{children}</em>,
        a: ({ href, children }) => {
          const isInternal = href?.startsWith("/") || href?.includes("rajinikanthvadla.com");
          const path = href?.includes("rajinikanthvadla.com")
            ? href.replace(/^https?:\/\/[^/]+/, "") || "/"
            : href;

          if (isInternal && path?.startsWith("/")) {
            return (
              <Link
                href={path}
                className="inline-flex items-center gap-0.5 text-blue-700 font-bold underline underline-offset-2 hover:text-blue-900"
              >
                {children}
              </Link>
            );
          }
          return (
            <a
              href={href}
              className="text-blue-700 font-bold underline underline-offset-2 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-[3px] border-orange-500 pl-3 my-2 text-slate-600 text-[0.8rem] italic bg-[#fff7ed]/60 py-1 pr-2 rounded-r-sm">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-2 border-dashed border-slate-300" />,
        code: ({ className, children }) => {
          if (className?.startsWith("language-")) {
            return (
              <code className="block bg-[#0f172a] text-slate-100 text-[0.7rem] p-2 rounded-sm my-2 overflow-x-auto font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className="bg-[#fef9c3] text-[#0f172a] px-1 py-0.5 rounded text-[0.75rem] font-mono border border-slate-200">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error so it can be inspected in the browser console.
    console.error("Global client error:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Oops — something went wrong | Rajinikanth Vadla</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/pic-1.png" />
      </head>
      <body className="bg-[#0f172a] text-slate-200 min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-xl w-full text-center">
          {/* Animated error doodle */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="12 8"
                className="nf-drift"
              />
              <rect
                x="38"
                y="42"
                width="12"
                height="16"
                rx="2"
                fill="#f97316"
                className="nf-glitch"
              />
              <rect
                x="70"
                y="42"
                width="12"
                height="16"
                rx="2"
                fill="#f97316"
                className="nf-glitch"
                style={{ animationDelay: "0.15s" }}
              />
              <path
                d="M38 82 Q60 62 82 82"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            System hiccup.
          </h1>

          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            A client-side exception happened while loading this page. The good news: every bug is just a lesson in disguise.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="notion-btn notion-btn--accent"
            >
              Reload page
            </button>
            <Link href="/" className="notion-btn notion-btn--ghost">
              Go home
            </Link>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            If this keeps happening, message on{" "}
            <a
              href="https://wa.me/919100028801"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold underline underline-offset-2"
            >
              WhatsApp
            </a>{" "}
            and we'll debug it together.
          </p>
        </div>
      </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS, LINKS } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "bg-white border-slate-200 shadow-sm"
          : "bg-white border-slate-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs font-bold tracking-tight">
            RV
          </span>
          <span className="font-display font-bold text-lg text-slate-900 hidden sm:block tracking-tight">
            Rajinikanth Vadla
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.highlight
                    ? "text-orange-600 font-semibold hover:bg-orange-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
                {item.highlight && (
                  <span className="ml-1.5 inline-block bg-orange-500 text-white text-[9px] font-bold py-0.5 px-1.5 rounded uppercase align-middle">
                    NEW
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className="ml-3 pl-3 border-l border-slate-200">
            <a
              href={LINKS.topmate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              Book a Session
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-slate-800 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-slate-800 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-slate-800 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-fade-in">
          <ul className="flex flex-col p-5 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    item.highlight
                      ? "text-orange-600 bg-orange-50 font-semibold"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="ml-2 bg-orange-500 text-white text-[9px] font-bold py-0.5 px-1.5 rounded uppercase">NEW</span>
                  )}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={LINKS.topmate}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-700 text-white text-center px-5 py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Book a Session
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

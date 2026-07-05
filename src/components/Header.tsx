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
      className={`notion-header sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "notion-header--scrolled" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-sm bg-[#0f172a] text-white flex items-center justify-center text-xs font-extrabold tracking-tight border-2 border-[#0f172a]">
            RV
          </span>
          <span className="font-display font-bold text-lg text-[#0f172a] hidden sm:block tracking-tight">
            Rajinikanth Vadla
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3.5 py-2 text-sm font-semibold rounded-sm transition-colors ${
                  item.highlight
                    ? "text-orange-600 font-bold hover:bg-[#fef9c3]"
                    : "text-slate-600 hover:text-[#0f172a] hover:bg-[#fafafa]"
                }`}
              >
                {item.label}
                {item.highlight && (
                  <span className="ml-1.5 inline-block bg-[#0f172a] text-white text-[9px] font-extrabold py-0.5 px-1.5 rounded-sm uppercase align-middle">
                    NEW
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className="ml-3 pl-3 border-l-2 border-dashed border-slate-300">
            <a
              href={LINKS.topmate}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--ink !py-2 !px-5 !text-sm"
            >
              Book a Session
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-sm hover:bg-[#fafafa] transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#0f172a] rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#0f172a] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#0f172a] rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t-2 border-[#0f172a] bg-white animate-fade-in">
          <ul className="flex flex-col p-5 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-sm font-semibold transition-colors ${
                    item.highlight
                      ? "text-orange-600 bg-[#fef9c3] font-bold"
                      : "text-[#0f172a] hover:bg-[#fafafa]"
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="ml-2 bg-[#0f172a] text-white text-[9px] font-extrabold py-0.5 px-1.5 rounded-sm uppercase">NEW</span>
                  )}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={LINKS.topmate}
                target="_blank"
                rel="noopener noreferrer"
                className="block notion-btn notion-btn--ink text-center w-full"
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

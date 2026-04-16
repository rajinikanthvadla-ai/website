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
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "bg-[#fffefc]/95 border-stone-200 shadow-sm" : "bg-[#fffefc]/90 border-stone-200/60"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-10 h-10 border border-stone-900 bg-stone-900 text-[#fffefc] flex items-center justify-center text-xs font-bold tracking-tight group-hover:bg-stone-800 transition-colors">
            RV
          </span>
          <span className="font-display font-bold text-lg text-stone-900 hidden sm:block tracking-tight">
            Rajinikanth Vadla
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-2 text-stone-600 text-sm font-medium hover:text-stone-900 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-4 pl-4 border-l border-stone-200">
            <a
              href={LINKS.topmate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-accent-600 text-white px-4 py-2 text-sm font-semibold hover:bg-accent-700 transition-colors"
            >
              Book a session
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2 border border-transparent hover:border-stone-200 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-stone-800 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-stone-800 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-stone-800 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-stone-200 bg-[#fffefc] animate-fade-in">
          <ul className="flex flex-col p-5 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-3 text-stone-800 font-medium border-b border-stone-100 last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={LINKS.topmate}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-accent-600 text-white px-4 py-3.5 text-sm font-semibold text-center hover:bg-accent-700 transition-colors"
              >
                Book a session
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

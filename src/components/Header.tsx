"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS, LINKS } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-gray-200/50"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            RV
          </span>
          <span className="font-extrabold text-xl text-gray-900 hidden sm:block">
            Rajinikanth Vadla
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-600 font-semibold text-sm hover:text-primary-600 hover:bg-primary-50 transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <a
              href={LINKS.topmate}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-0.5 transition-all"
            >
              Book a Session
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl animate-fade-in">
          <ul className="flex flex-col p-6 gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-700 font-semibold text-lg hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={LINKS.topmate}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-semibold text-center shadow-lg"
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

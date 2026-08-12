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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`notion-header sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "notion-header--scrolled" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#0f172a] text-white flex items-center justify-center text-xs font-extrabold tracking-tight border-2 border-[#0f172a]">
            RV
          </span>
          <span className="font-display font-bold text-base sm:text-lg text-[#0f172a] tracking-tight">
            Rajinikanth Vadla
          </span>
        </Link>

        {/* Desktop nav — only on xl+ to avoid cramping */}
        <ul className="hidden xl:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold rounded-sm transition-colors whitespace-nowrap ${
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
              className="notion-btn notion-btn--ink !py-2 !px-5 !text-sm whitespace-nowrap"
            >
              Book a Session
            </a>
          </li>
        </ul>

        {/* Mobile/tablet CTA + hamburger */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex notion-btn notion-btn--ink !py-2 !px-4 !text-xs whitespace-nowrap"
          >
            Book a Session
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-2.5 rounded-sm hover:bg-[#fafafa] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`w-6 h-0.5 bg-[#0f172a] rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#0f172a] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#0f172a] rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="xl:hidden fixed inset-0 top-[64px] bg-[#0f172a]/40 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="xl:hidden fixed top-[64px] left-0 right-0 bottom-0 z-50 overflow-y-auto bg-[#faf9f6] border-t-2 border-[#0f172a] animate-fade-in">
            <ul className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-sm font-semibold transition-colors ${
                      item.highlight
                        ? "text-orange-700 bg-[#fef9c3] font-bold border border-[#0f172a]"
                        : "text-[#0f172a] hover:bg-white border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="bg-[#0f172a] text-white text-[9px] font-extrabold py-0.5 px-1.5 rounded-sm uppercase">NEW</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4 pt-2">
              <a
                href={LINKS.topmate}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block notion-btn notion-btn--ink text-center w-full !py-3"
              >
                Book a Session
              </a>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center text-sm font-bold text-slate-600 underline underline-offset-2"
              >
                Or message on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS, LINKS } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything when the route changes.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
    setOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!openGroup) return;

    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup]);

  const isActiveGroup = (groupId: string) =>
    NAV_GROUPS.find((g) => g.id === groupId)?.links.some(
      (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
    ) ?? false;

  return (
    <header
      className={`notion-header sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "notion-header--scrolled" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#0f172a] text-white flex items-center justify-center text-xs font-extrabold tracking-tight border-2 border-[#0f172a]">
            RV
          </span>
          <span className="font-display font-bold text-base sm:text-lg text-[#0f172a] tracking-tight">
            Rajinikanth Vadla
          </span>
        </Link>

        {/* Desktop: grouped dropdown menus */}
        <div ref={navRef} className="hidden lg:flex items-center gap-1">
          {NAV_GROUPS.map((group) => {
            const expanded = openGroup === group.id;
            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.id)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenGroup(expanded ? null : group.id)}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-sm transition-colors whitespace-nowrap ${
                    expanded || isActiveGroup(group.id)
                      ? "text-[#0f172a] bg-[#fef9c3]"
                      : "text-slate-600 hover:text-[#0f172a] hover:bg-[#fafafa]"
                  }`}
                >
                  {group.label}
                  <span
                    className={`text-[9px] leading-none transition-transform ${expanded ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>

                {expanded && (
                  <div className="absolute left-0 top-full pt-2 z-50">
                    <ul className="w-[300px] bg-white border-2 border-[#0f172a] rounded-sm shadow-[4px_4px_0_#0f172a] py-1.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block px-4 py-2.5 hover:bg-[#fafafa] transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#0f172a]">{link.label}</span>
                              {link.badge && (
                                <span className="bg-orange-500 text-white text-[9px] font-extrabold py-0.5 px-1.5 rounded-sm uppercase">
                                  {link.badge}
                                </span>
                              )}
                            </span>
                            {link.description && (
                              <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          <a
            href={LINKS.topmate}
            target="_blank"
            rel="noopener noreferrer"
            className="notion-btn notion-btn--ink !py-2 !px-5 !text-sm whitespace-nowrap ml-2"
          >
            Book a Session
          </a>
        </div>

        {/* Mobile / tablet */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={LINKS.topmate}
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

      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-[64px] bg-[#0f172a]/40 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="lg:hidden fixed top-[64px] left-0 right-0 bottom-0 z-50 overflow-y-auto bg-[#faf9f6] border-t-2 border-[#0f172a] animate-fade-in">
            <ul className="flex flex-col p-4 gap-2">
              {NAV_GROUPS.map((group) => {
                const expanded = openSection === group.id;
                return (
                  <li key={group.id} className="border-2 border-[#0f172a] rounded-sm bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenSection(expanded ? null : group.id)}
                      aria-expanded={expanded}
                      className={`w-full flex items-center justify-between px-4 py-3.5 font-bold text-[#0f172a] transition-colors ${
                        expanded ? "bg-[#fef9c3]" : ""
                      }`}
                    >
                      <span>{group.label}</span>
                      <span
                        className={`text-slate-500 text-lg leading-none transition-transform ${
                          expanded ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    {expanded && (
                      <ul className="border-t-2 border-dashed border-slate-200">
                        {group.links.map((link) => (
                          <li key={link.href} className="border-b border-slate-100 last:border-0">
                            <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-[#fafafa]"
                            >
                              <span>
                                <span className="block text-sm font-semibold text-[#0f172a]">{link.label}</span>
                                {link.description && (
                                  <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                                    {link.description}
                                  </span>
                                )}
                              </span>
                              {link.badge && (
                                <span className="bg-orange-500 text-white text-[9px] font-extrabold py-0.5 px-1.5 rounded-sm uppercase shrink-0 mt-0.5">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="p-4 pt-0">
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LINKS,
  SIDEBAR_ALL,
  SIDEBAR_MORE,
  SIDEBAR_NAV,
  type SidebarIcon,
} from "@/lib/constants";

function NavIcon({ name }: { name: SidebarIcon }) {
  const common = "w-[18px] h-[18px] shrink-0";
  switch (name) {
    case "home":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
        </svg>
      );
    case "courses":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "syllabus":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M7 4h10a2 2 0 0 1 2 2v14l-7-3-7 3V6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "architecture":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 17.5h7M17.5 14v7" />
        </svg>
      );
    case "path":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="12" r="2" />
          <circle cx="8" cy="18" r="2" />
          <path d="M8 7.5 16 11M16.5 13.5 9.5 16.5" />
        </svg>
      );
    case "python":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M9 3h6a3 3 0 0 1 3 3v3H9a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm6 18H9a3 3 0 0 1-3-3v-3h9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3Z" />
        </svg>
      );
    case "blog":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M5 5h14v14H5V5Zm3 4h8M8 12h8M8 15h5" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="m10 9 5 3-5 3V9Z" />
        </svg>
      );
    case "mentorship":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M8 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm8-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M2.5 19c1.2-2.6 3.4-4 5.5-4s4.3 1.4 5.5 4M13 15.5c1.6-.7 3.2-.7 4.8 0 1.4.6 2.5 1.8 3.2 3.5" />
        </svg>
      );
    case "about":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="8" r="3" />
          <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
        </svg>
      );
    case "enroll":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moreActive = SIDEBAR_MORE.some((item) => isActivePath(pathname, item.href));
  const [moreOpen, setMoreOpen] = useState(moreActive);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMoreOpen(SIDEBAR_MORE.some((item) => isActivePath(pathname, item.href)));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pageTitle =
    SIDEBAR_ALL.find((item) => isActivePath(pathname, item.href))?.label ?? "Rajinikanth Vadla";

  return (
    <div className={`shell${isHome ? " shell--home" : ""}`}>
      {open ? (
        <button
          type="button"
          className="shell-backdrop lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside className={`shell-rail ${open ? "shell-rail--open" : ""}`}>
        <div className="shell-rail-brand">
          <Link href="/" className="shell-rail-logo" onClick={() => setOpen(false)}>
            <span className="shell-rail-mark">RV</span>
            <span className="shell-rail-name">
              Rajinikanth
              <span>Vadla</span>
            </span>
          </Link>
        </div>

        <nav className="shell-rail-nav" aria-label="Primary">
          {SIDEBAR_NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shell-rail-link ${active ? "shell-rail-link--active" : ""}`}
                onClick={() => setOpen(false)}
                title={item.label}
              >
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="shell-rail-more">
            <button
              type="button"
              className={`shell-rail-link shell-rail-more-btn ${moreActive ? "shell-rail-link--active" : ""}`}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span>More</span>
              <svg
                className={`shell-rail-chevron ${moreOpen ? "shell-rail-chevron--open" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {moreOpen ? (
              <div className="shell-rail-more-list">
                {SIDEBAR_MORE.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`shell-rail-link shell-rail-link--sub ${active ? "shell-rail-link--active" : ""}`}
                      onClick={() => setOpen(false)}
                      title={item.label}
                    >
                      <NavIcon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="shell-rail-foot">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="shell-rail-whatsapp"
            title="WhatsApp mentor"
          >
            <span className="shell-rail-wa-icon" aria-hidden>
              WA
            </span>
            <span className="shell-rail-wa-label">WhatsApp mentor</span>
          </a>
          <p className="shell-rail-note">Live AI engineering training</p>
        </div>
      </aside>

      <div className="shell-main">
        <header className="shell-topbar">
          <button
            type="button"
            className="shell-menu-btn lg:hidden"
            aria-expanded={open}
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="shell-topbar-title">
            <p className="shell-topbar-heading">{pageTitle}</p>
          </div>
          <div className="shell-topbar-actions">
            <Link href="/syllabus/" className="shell-top-link hidden sm:inline-flex">
              Syllabus
            </Link>
            <Link href="/enroll/" className="shell-top-cta">
              Enroll
            </Link>
          </div>
        </header>
        <div className="shell-content">{children}</div>
      </div>
    </div>
  );
}

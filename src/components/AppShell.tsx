"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LINKS, SIDEBAR_MORE, SIDEBAR_NAV } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";
import SiteAnalytics from "./SiteAnalytics";
import AnnouncementBar from "./AnnouncementBar";
import ActivityToast from "./ActivityToast";
import RegionStrip from "./RegionStrip";
import CareerCallPopup from "./CareerCallPopup";
import type { ActivityItem, ActivityStats } from "@/lib/cms";

/** Top-bar links: the main nav minus Home (the logo) and Enroll (the button). */
const PRIMARY = SIDEBAR_NAV.filter((item) => item.href !== "/" && item.href !== "/enroll").map((item) =>
  item.href === "/python-course" ? { ...item, label: "Free Python" } : item,
);
/** Extra links shown only in the mobile menu; desktop users find them in the footer. */
const SECONDARY = SIDEBAR_MORE.filter((item) => !item.href.startsWith("/#"));

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Announcement = { text: string; href: string; endsAt: string | null } | null;

export default function AppShell({
  children,
  announcement = null,
  activity = [],
  activityStats = null,
}: {
  children: React.ReactNode;
  announcement?: Announcement;
  activity?: ActivityItem[];
  activityStats?: ActivityStats | null;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (isAdmin) {
    // The admin panel has its own header; no site nav, footer, tracking or reveal animation.
    return <div className="admin-shell">{children}</div>;
  }

  return (
    <div className="site">
      {announcement ? <AnnouncementBar {...announcement} /> : null}
      <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="site-nav-inner">
          <Link href="/" className="site-nav-logo" aria-label="Rajinikanth Vadla, home">
            <span className="site-nav-mark" aria-hidden>
              RV
            </span>
            <span className="site-nav-name">Rajinikanth Vadla</span>
          </Link>

          <nav className="site-nav-links" aria-label="Primary">
            {PRIMARY.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-nav-actions">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="site-nav-wa">
              WhatsApp
            </a>
            <Link href="/enroll/" className="site-nav-cta">
              Enroll
            </Link>
            <button
              type="button"
              className="site-nav-toggle"
              aria-expanded={open}
              aria-controls="site-nav-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={open ? "is-open" : ""} />
            </button>
          </div>
        </div>

        {open ? (
          <div id="site-nav-menu" className="site-nav-menu">
            <nav aria-label="Mobile">
              {[...PRIMARY, ...SECONDARY].map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`site-nav-menu-link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="site-nav-menu-actions">
              <Link href="/enroll/" className="site-nav-cta site-nav-cta--block">
                Enroll, see local price
              </Link>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="site-nav-wa site-nav-wa--block">
                Ask on WhatsApp
              </a>
            </div>
          </div>
        ) : null}
      </header>

      {open ? <button type="button" className="site-nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}

      <RegionStrip />
      <div className="shell-content">{children}</div>
      <ScrollReveal />
      <SiteAnalytics />
      <ActivityToast items={activity} stats={activityStats} />
      <CareerCallPopup />
    </div>
  );
}

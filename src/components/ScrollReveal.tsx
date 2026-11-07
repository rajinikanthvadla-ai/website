"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades sections in as they scroll into view, site-wide, with no markup changes.
 *
 * Safe by design:
 * - Nothing is hidden in the HTML. Without JS (or for crawlers) every element is visible.
 * - Anything already on screen when the page loads is left alone, so there is no flash.
 * - Users who ask for reduced motion get no animation at all.
 * - Once an element has animated in, its classes are removed so its own hover
 *   transitions work as before.
 */

const STAGGER_MS = 70;
const MAX_STAGGER = 6;

function isList(el: Element) {
  const cls = el.className;
  if (typeof cls !== "string") return false;
  const listy = /(^|\s)(grid|space-y-\d)/.test(cls);
  return listy && el.children.length >= 2 && el.children.length <= 30;
}

function skip(el: Element) {
  return el.matches("[data-no-reveal], [data-flow-anim]") || !!el.querySelector("[data-flow-anim]");
}

function collectTargets(main: HTMLElement) {
  const targets: { el: HTMLElement; index: number }[] = [];
  const sections = main.querySelectorAll<HTMLElement>("section");
  sections.forEach((section) => {
    if (section.parentElement?.closest("section")) return; // only top-level sections
    if (section.matches(".notion-hero") || section.closest("[data-no-reveal]")) return;
    const wrapper = section.children.length === 1 ? section.firstElementChild! : section;
    Array.from(wrapper.children).forEach((child) => {
      if (!(child instanceof HTMLElement) || child.dataset.rv || skip(child)) return;
      if (isList(child)) {
        Array.from(child.children).forEach((item, i) => {
          if (item instanceof HTMLElement && !item.dataset.rv && !skip(item)) targets.push({ el: item, index: i });
        });
      } else {
        targets.push({ el: child, index: 0 });
      }
    });
  });
  return targets;
}

function settle(el: HTMLElement) {
  el.classList.remove("rv", "rv-in");
  el.style.removeProperty("--rv-delay");
  el.dataset.rv = "done";
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;

    // Reveals armed elements once they are a little way into the viewport.
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          reveal.unobserve(el);
          el.classList.add("rv-in");
          const done = () => settle(el);
          el.addEventListener("transitionend", (e) => e.propertyName === "opacity" && done(), { once: true });
          window.setTimeout(done, 1400); // fallback if transitionend never fires
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    // First look: on-screen elements stay as they are; off-screen ones get armed (hidden).
    const first = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        first.unobserve(el);
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          el.dataset.rv = "done";
          return;
        }
        el.classList.add("rv");
        reveal.observe(el);
      });
    });

    // Next tick, so the new route's DOM is in place.
    const timer = window.setTimeout(() => {
      collectTargets(main).forEach(({ el, index }) => {
        el.dataset.rv = "pending";
        el.style.setProperty("--rv-delay", `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`);
        first.observe(el);
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
      first.disconnect();
      reveal.disconnect();
      main.querySelectorAll<HTMLElement>(".rv").forEach(settle);
    };
  }, [pathname]);

  return null;
}

import type { ReactNode } from "react";

type GfxVariant = "light" | "dark" | "ghost" | "featured" | "warm" | "blue";

export function GfxGrid({
  children,
  className = "",
  bento,
}: {
  children: ReactNode;
  className?: string;
  bento?: boolean;
}) {
  return (
    <div className={`auto-gfx-grid ${bento ? "auto-gfx-grid--bento" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function GfxCard({
  icon,
  title,
  sub,
  items,
  tags,
  variant = "light",
  size = "normal",
  children,
}: {
  icon?: string;
  title: string;
  sub?: string;
  items?: string[];
  tags?: string[];
  variant?: GfxVariant;
  size?: "normal" | "wide" | "tall" | "hero";
  children?: ReactNode;
}) {
  const cls = [
    "auto-gfx-card",
    `auto-gfx-card--${variant}`,
    size !== "normal" && `auto-gfx-card--${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cls}>
      <div className="auto-gfx-sketch" aria-hidden />
      <div className="auto-gfx-inner">
        {icon && <div className="auto-gfx-icon">{icon}</div>}
        <h3 className="auto-gfx-title">{title}</h3>
        {sub && <p className="auto-gfx-sub">{sub}</p>}
        {items && items.length > 0 && (
          <ul className="auto-gfx-list list-none p-0 m-0">
            {items.map((item) => (
              <li key={item}>
                <span>+</span> {item}
              </li>
            ))}
          </ul>
        )}
        {children}
        {tags && tags.length > 0 && (
          <div className="auto-gfx-tags">
            {tags.map((t) => (
              <span key={t} className="auto-tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

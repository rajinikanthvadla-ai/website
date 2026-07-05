import type { ReactNode } from "react";
import Image from "next/image";

type GfxVariant = "light" | "dark" | "ghost" | "featured" | "warm" | "blue";
type GfxAccent = "yellow" | "blue" | "warm" | "none";

export function GfxGrid({
  children,
  className = "",
  bento,
}: {
  children: ReactNode;
  className?: string;
  bento?: boolean;
}) {
  const gridCls = [
    "notion-board-grid",
    bento && "notion-board-grid--bento",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={gridCls}>{children}</div>;
}

export function GfxCard({
  icon,
  title,
  sub,
  items,
  tags,
  variant = "light",
  size = "normal",
  sketch,
  sketchAlt,
  children,
}: {
  icon?: string;
  title: string;
  sub?: string;
  items?: string[];
  tags?: string[];
  variant?: GfxVariant;
  size?: "normal" | "wide" | "tall" | "hero";
  sketch?: string;
  sketchAlt?: string;
  children?: ReactNode;
}) {
  const accent: GfxAccent =
    variant === "featured"
      ? "yellow"
      : variant === "blue"
        ? "blue"
        : variant === "warm"
          ? "warm"
          : "none";

  const cls = [
    "notion-board-card",
    accent !== "none" && `notion-board-card--${accent}`,
    variant === "dark" && "notion-board-card--dark",
    variant === "ghost" && "notion-board-card--ghost",
    size !== "normal" && `notion-board-card--${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cls}>
      {sketch && (
        <div className="notion-board-sketch-wrap">
          <Image
            src={sketch}
            alt={sketchAlt ?? ""}
            width={260}
            height={160}
            className="notion-board-sketch"
          />
        </div>
      )}
      <div className="notion-board-body">
        {icon && !sketch && <div className="notion-board-icon">{icon}</div>}
        {sub && <p className="notion-board-sub">{sub}</p>}
        <h3 className="notion-board-title">{title}</h3>
        {items && items.length > 0 && (
          <ul className="notion-board-list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {children}
        {tags && tags.length > 0 && (
          <div className="notion-board-tags">
            {tags.map((t) => (
              <span key={t} className="notion-board-tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

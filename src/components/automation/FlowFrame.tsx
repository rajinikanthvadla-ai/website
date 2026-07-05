import type { ReactNode } from "react";

export type FlowAlign = "left" | "center" | "right";

export function flowAlign(index: number): FlowAlign {
  const mod = index % 3;
  if (mod === 0) return "left";
  if (mod === 1) return "right";
  return "center";
}

export function FlowPath({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`auto-flow-path ${className}`.trim()}>{children}</div>;
}

export function FlowFrame({
  step,
  align = "left",
  icon,
  title,
  sub,
  items,
  tags,
  dark,
  ghost,
  featured,
  children,
}: {
  step: string | number;
  align?: FlowAlign;
  icon?: string;
  title: string;
  sub?: string;
  items?: string[];
  tags?: string[];
  dark?: boolean;
  ghost?: boolean;
  featured?: boolean;
  children?: ReactNode;
}) {
  const frameCls = [
    "auto-frame",
    dark && "auto-frame--dark",
    ghost && "auto-frame--ghost",
    featured && "auto-frame--featured",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`auto-flow-item auto-flow-item--${align}`}>
      <div className="auto-flow-rail" aria-hidden>
        <span className="auto-flow-num">{step}</span>
      </div>
      <article className={frameCls}>
        <div className="auto-frame-back" aria-hidden />
        <div className="auto-frame-front">
          {icon && <div className="auto-frame-icon">{icon}</div>}
          <h3 className="auto-frame-title">{title}</h3>
          {sub && <p className="auto-frame-sub">{sub}</p>}
          {items && items.length > 0 && (
            <ul className="auto-frame-list list-none p-0 m-0">
              {items.map((item) => (
                <li key={item}>
                  <span>+</span> {item}
                </li>
              ))}
            </ul>
          )}
          {children}
          {tags && tags.length > 0 && (
            <div className="auto-frame-tags">
              {tags.map((t) => (
                <span key={t} className="auto-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

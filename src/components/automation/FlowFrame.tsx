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
    "notion-flow-frame",
    dark && "notion-flow-frame--dark",
    ghost && "opacity-80 border-dashed",
    featured && "ring-2 ring-orange-400 ring-offset-2",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`auto-flow-item auto-flow-item--${align}`}>
      <div className="auto-flow-rail" aria-hidden>
        <span className="auto-flow-num">{step}</span>
      </div>
      <article className={frameCls}>
        {icon && <div className="notion-board-icon">{icon}</div>}
        <h3 className="notion-board-title">{title}</h3>
        {sub && <p className="notion-board-sub">{sub}</p>}
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
      </article>
    </div>
  );
}

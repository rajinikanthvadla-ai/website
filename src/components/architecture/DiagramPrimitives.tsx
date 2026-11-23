/**
 * Draw.io-style SVG building blocks for /architecture diagrams.
 * Server components only — pure SVG, no client JS.
 */

import { ARCH_ICONS } from "@/lib/architecture-icons";

export type IconSpec = {
  /** Brand key from ARCH_ICONS (postgresql, openai, kubernetes, …). */
  slug?: string;
  /** 1-2 letter fallback text when slug is missing. */
  fallback?: string;
  /** Brand-ish fallback color. */
  color?: string;
};

/**
 * Inline brand logo (viewBox 0 0 24 24) — no CDN, always visible in SVG.
 */
export function SvgIcon({
  icon,
  x,
  y,
  size = 20,
}: {
  icon: IconSpec;
  x: number;
  y: number;
  size?: number;
}) {
  const brand = icon.slug ? ARCH_ICONS[icon.slug] : undefined;
  if (brand) {
    const scale = size / 24;
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`} aria-label={brand.title}>
        <rect x={0} y={0} width={24} height={24} rx={5} fill="#ffffff" stroke="#e2e8f0" strokeWidth={1} />
        <path d={brand.path} fill={`#${brand.hex}`} />
      </g>
    );
  }
  const initials = (icon.fallback ?? "?").slice(0, 2).toUpperCase();
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={4} fill={icon.color ?? "#64748b"} />
      <text
        x={x + size / 2}
        y={y + size / 2 + 3.5}
        fontSize={Math.max(8, size * 0.45)}
        fontWeight={700}
        fill="#ffffff"
        textAnchor="middle"
      >
        {initials}
      </text>
    </g>
  );
}

/** Shared marker defs for a diagram. */
export function ArrowMarkers({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker
        id={`${prefix}-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth={7}
        markerHeight={7}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" fill="#475569" />
      </marker>
      <marker
        id={`${prefix}-arrow-amber`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth={7}
        markerHeight={7}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" fill="#b45309" />
      </marker>
      <marker
        id={`${prefix}-arrow-green`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth={7}
        markerHeight={7}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" fill="#059669" />
      </marker>
      <marker
        id={`${prefix}-arrow-blue`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth={7}
        markerHeight={7}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" fill="#1d4ed8" />
      </marker>
      <filter id={`${prefix}-soft`} x="-8%" y="-8%" width="116%" height="116%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#0f172a" floodOpacity="0.12" />
      </filter>
    </defs>
  );
}

/** Diagram title strip (draw.io-like header). */
export function DiagramTitle({
  title,
  subtitle,
  width,
}: {
  title: string;
  subtitle?: string;
  width: number;
}) {
  return (
    <g>
      <rect x={0} y={0} width={width} height={subtitle ? 44 : 34} fill="#0f172a" />
      <text x={16} y={22} fontSize={14} fontWeight={700} fill="#ffffff">
        {title}
      </text>
      {subtitle ? (
        <text x={16} y={38} fontSize={10} fill="#94a3b8">
          {subtitle}
        </text>
      ) : null}
    </g>
  );
}

/** Tinted swimlane / group (draw.io container). */
export function Lane({
  x,
  y,
  w,
  h,
  label,
  tint = "#f8fafc",
  stroke = "#94a3b8",
  accent = "#1d4ed8",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tint?: string;
  stroke?: string;
  accent?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={tint} stroke={stroke} strokeWidth={1.5} />
      <rect x={x} y={y} width={w} height={26} rx={12} fill={accent} />
      <rect x={x} y={y + 14} width={w} height={12} fill={accent} />
      <text x={x + 12} y={y + 17} fontSize={10.5} fontWeight={700} fill="#ffffff" letterSpacing={0.8}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/**
 * Draw.io-style component: colored header + white body + brand icons.
 */
export function NodeBox({
  x,
  y,
  w = 160,
  h = 72,
  title,
  subtitle,
  icons = [],
  accent = "#1d4ed8",
  fill = "#ffffff",
  stroke,
  filterId,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  subtitle?: string;
  icons?: IconSpec[];
  accent?: string;
  fill?: string;
  stroke?: string;
  filterId?: string;
}) {
  const headerH = 26;
  const iconSize = 20;
  const gap = 8;
  const bodyTop = y + headerH;
  const bodyH = h - headerH;
  const total = icons.length * iconSize + Math.max(0, icons.length - 1) * gap;
  const startX = x + (w - total) / 2;
  const iconsY = bodyTop + (subtitle ? 8 : (bodyH - iconSize) / 2);
  const border = stroke ?? accent;

  return (
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={fill} stroke={border} strokeWidth={1.6} />
      <path
        d={`M${x} ${y + 8} Q${x} ${y} ${x + 8} ${y} L${x + w - 8} ${y} Q${x + w} ${y} ${x + w} ${y + 8} L${x + w} ${y + headerH} L${x} ${y + headerH} Z`}
        fill={accent}
      />
      <text x={x + w / 2} y={y + 17.5} fontSize={11.5} fontWeight={700} fill="#ffffff" textAnchor="middle">
        {title}
      </text>
      {icons.map((icon, i) => (
        <SvgIcon key={i} icon={icon} x={startX + i * (iconSize + gap)} y={iconsY} size={iconSize} />
      ))}
      {subtitle ? (
        <text x={x + w / 2} y={y + h - 10} fontSize={9.5} fill="#475569" textAnchor="middle">
          {subtitle}
        </text>
      ) : null}
    </g>
  );
}

/** Compact pill node for loop steps (Observe/Plan/Act). */
export function PillNode({
  x,
  y,
  w,
  h = 32,
  title,
  accent = "#1d4ed8",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  accent?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#eff6ff" stroke={accent} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + h / 2 + 4} fontSize={11} fontWeight={700} fill={accent} textAnchor="middle">
        {title}
      </text>
    </g>
  );
}

/** Numbered step badge placed on the diagram. */
export function StepBadge({
  x,
  y,
  n,
  fill = "#1d4ed8",
}: {
  x: number;
  y: number;
  n: number;
  fill?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={fill} stroke="#ffffff" strokeWidth={2} />
      <text x={x} y={y + 3.5} fontSize={10.5} fontWeight={700} fill="#ffffff" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/** Straight arrow between two points. */
export function FlowArrow({
  x1,
  y1,
  x2,
  y2,
  marker,
  step,
  dashed = false,
  color = "#475569",
  label,
  labelDx = 0,
  labelDy = -7,
  stepX,
  stepY,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  marker: string;
  step?: number;
  dashed?: boolean;
  color?: string;
  label?: string;
  labelDx?: number;
  labelDy?: number;
  stepX?: number;
  stepY?: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${marker})`}
      />
      {label ? (
        <text x={mx + labelDx} y={my + labelDy} fontSize={9.5} fontStyle="italic" fill={color} textAnchor="middle">
          {label}
        </text>
      ) : null}
      {step != null ? (
        <StepBadge x={stepX ?? mx} y={stepY ?? my} n={step} fill={color === "#475569" || color === "#64748b" ? "#1d4ed8" : color} />
      ) : null}
    </g>
  );
}

/** Elbow/path arrow. */
export function FlowPath({
  d,
  marker,
  step,
  stepX,
  stepY,
  dashed = false,
  color = "#475569",
  label,
  labelX,
  labelY,
}: {
  d: string;
  marker: string;
  step?: number;
  stepX?: number;
  stepY?: number;
  dashed?: boolean;
  color?: string;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${marker})`}
      />
      {label && labelX != null && labelY != null ? (
        <text x={labelX} y={labelY} fontSize={9.5} fontStyle="italic" fill={color} textAnchor="middle">
          {label}
        </text>
      ) : null}
      {step != null && stepX != null && stepY != null ? (
        <StepBadge x={stepX} y={stepY} n={step} fill={color === "#475569" || color === "#64748b" ? "#1d4ed8" : color} />
      ) : null}
    </g>
  );
}

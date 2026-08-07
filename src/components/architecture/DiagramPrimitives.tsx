/**
 * Shared SVG building blocks for the /architecture diagrams.
 * Server components only — pure SVG, no client JS.
 */

export type IconSpec = {
  /** Simple Icons slug; omit for a colored fallback badge. */
  slug?: string;
  /** 1-2 letter fallback text. */
  fallback?: string;
  /** Brand-ish fallback color. */
  color?: string;
};

/** Icon inside an SVG node: real logo via Simple Icons CDN, or a colored initials badge. */
export function SvgIcon({
  icon,
  x,
  y,
  size = 18,
}: {
  icon: IconSpec;
  x: number;
  y: number;
  size?: number;
}) {
  if (icon.slug) {
    return (
      <image
        href={`https://cdn.simpleicons.org/${icon.slug}`}
        x={x}
        y={y}
        width={size}
        height={size}
      />
    );
  }
  const initials = (icon.fallback ?? "?").slice(0, 2).toUpperCase();
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={4} fill={icon.color ?? "#64748b"} />
      <text
        x={x + size / 2}
        y={y + size / 2 + 3.5}
        fontSize={9}
        fontWeight={700}
        fill="#ffffff"
        textAnchor="middle"
      >
        {initials}
      </text>
    </g>
  );
}

/** A tinted, dashed-border group lane that visually groups nodes (e.g. "TRAINING"). */
export function Lane({
  x,
  y,
  w,
  h,
  label,
  tint = "#f8fafc",
  stroke = "#cbd5e1",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tint?: string;
  stroke?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        fill={tint}
        stroke={stroke}
        strokeWidth={1.2}
        strokeDasharray="6 4"
      />
      <text x={x + 12} y={y + 20} fontSize={10.5} fontWeight={700} fill="#475569" letterSpacing={1.2}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/** A white component box with a title, an optional row of tech icons, and a subtitle. */
export function NodeBox({
  x,
  y,
  w = 150,
  h = 64,
  title,
  subtitle,
  icons = [],
  stroke = "#94a3b8",
  fill = "#ffffff",
  titleColor = "#0f172a",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  subtitle?: string;
  icons?: IconSpec[];
  stroke?: string;
  fill?: string;
  titleColor?: string;
}) {
  const iconSize = 18;
  const gap = 6;
  const total = icons.length * iconSize + Math.max(0, icons.length - 1) * gap;
  const startX = x + (w - total) / 2;
  const iconsY = y + (subtitle ? 28 : (h - iconSize) / 2 + 6);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1.4} />
      <text x={x + w / 2} y={y + 19} fontSize={12} fontWeight={700} fill={titleColor} textAnchor="middle">
        {title}
      </text>
      {icons.map((icon, i) => (
        <SvgIcon key={i} icon={icon} x={startX + i * (iconSize + gap)} y={iconsY} size={iconSize} />
      ))}
      {subtitle && (
        <text x={x + w / 2} y={y + h - 9} fontSize={9.5} fill="#64748b" textAnchor="middle">
          {subtitle}
        </text>
      )}
    </g>
  );
}

/** Numbered step badge placed on the diagram; matches the numbered list below it. */
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
      <circle cx={x} cy={y} r={10.5} fill={fill} stroke="#ffffff" strokeWidth={2} />
      <text x={x} y={y + 3.5} fontSize={10.5} fontWeight={700} fill="#ffffff" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/** Straight arrow between two points, with optional step badge and italic label. */
export function FlowArrow({
  x1,
  y1,
  x2,
  y2,
  marker,
  step,
  dashed = false,
  color = "#64748b",
  label,
  labelDx = 0,
  labelDy = -6,
  stepX,
  stepY,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** id of an arrowhead <marker> defined in the same SVG. */
  marker: string;
  step?: number;
  dashed?: boolean;
  color?: string;
  label?: string;
  labelDx?: number;
  labelDy?: number;
  /** Override step badge position (defaults to line midpoint). */
  stepX?: number;
  stepY?: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const badgeX = stepX ?? mx;
  const badgeY = stepY ?? my;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${marker})`}
      />
      {label && (
        <text x={mx + labelDx} y={my + labelDy} fontSize={9.5} fontStyle="italic" fill={color} textAnchor="middle">
          {label}
        </text>
      )}
      {step != null && <StepBadge x={badgeX} y={badgeY} n={step} fill={color === "#64748b" ? "#1d4ed8" : color} />}
    </g>
  );
}

/** Elbow/curved arrow from an SVG path string, with optional step badge at an explicit point. */
export function FlowPath({
  d,
  marker,
  step,
  stepX,
  stepY,
  dashed = false,
  color = "#64748b",
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
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${marker})`}
      />
      {label && labelX != null && labelY != null && (
        <text x={labelX} y={labelY} fontSize={9.5} fontStyle="italic" fill={color} textAnchor="middle">
          {label}
        </text>
      )}
      {step != null && stepX != null && stepY != null && (
        <StepBadge x={stepX} y={stepY} n={step} fill={color === "#64748b" ? "#1d4ed8" : color} />
      )}
    </g>
  );
}

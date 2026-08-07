type TechIconProps = {
  /** Simple Icons slug (https://cdn.simpleicons.org/<slug>). Omit to use a colored fallback badge. */
  slug?: string;
  label: string;
  /** 1-2 letter fallback text when no slug exists. */
  fallback?: string;
  /** Brand-ish color for the fallback badge. */
  color?: string;
};

/**
 * Small technology logo chip: fixed-size logo with a label under it.
 * Used outside SVG diagrams (tech-stack rows). For icons inside SVG,
 * use SvgIcon from DiagramPrimitives.
 */
export default function TechIcon({ slug, label, fallback, color }: TechIconProps) {
  return (
    <span className="inline-flex w-16 flex-col items-center gap-1.5">
      {slug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={`${label} logo`}
          width={26}
          height={26}
          loading="lazy"
          className="h-[26px] w-[26px] grayscale transition duration-200 hover:grayscale-0"
        />
      ) : (
        <span
          className="flex h-[26px] w-[26px] items-center justify-center rounded-md text-[9px] font-bold text-white"
          style={{ backgroundColor: color ?? "#64748b" }}
          aria-label={`${label} badge`}
        >
          {(fallback ?? label).slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-center text-[10px] leading-tight text-slate-600">{label}</span>
    </span>
  );
}

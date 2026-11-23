import { ARCH_ICONS } from "@/lib/architecture-icons";

type TechIconProps = {
  /** Brand key from ARCH_ICONS. */
  slug?: string;
  label: string;
  /** 1-2 letter fallback text when no slug exists. */
  fallback?: string;
  /** Brand-ish color for the fallback badge. */
  color?: string;
};

/**
 * Technology logo chip under each architecture section.
 * Uses the same local ARCH_ICONS registry as the SVG diagrams.
 */
export default function TechIcon({ slug, label, fallback, color }: TechIconProps) {
  const brand = slug ? ARCH_ICONS[slug] : undefined;

  return (
    <span className="inline-flex w-16 flex-col items-center gap-1.5">
      {brand ? (
        <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          role="img"
          aria-label={`${label} logo`}
          className="rounded-md border border-slate-200 bg-white p-0.5"
        >
          <path d={brand.path} fill={`#${brand.hex}`} />
        </svg>
      ) : (
        <span
          className="flex h-[28px] w-[28px] items-center justify-center rounded-md text-[9px] font-bold text-white"
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

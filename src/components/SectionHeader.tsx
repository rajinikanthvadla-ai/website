interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeader({ tag, title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 md:mb-14">
      <span className="notion-eyebrow justify-center">
        {!light && <span className="notion-eyebrow-dot" aria-hidden />}
        {tag}
      </span>
      <h2 className={`font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-tight mb-4 ${light ? "text-white" : "text-[#0f172a]"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${light ? "text-slate-300" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

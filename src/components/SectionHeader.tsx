interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  tagColor?: string;
  light?: boolean;
}

export default function SectionHeader({ tag, title, subtitle, tagColor = "text-blue-700", light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 md:mb-14">
      <span className={`inline-block text-xs font-bold uppercase tracking-[0.14em] ${tagColor} mb-3`}>
        {tag}
      </span>
      <h2 className={`font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-tight mb-4 ${light ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${light ? "text-slate-400" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  tagColor?: string;
  light?: boolean;
}

export default function SectionHeader({ tag, title, subtitle, tagColor = "text-primary-600", light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-14">
      <span className={`inline-block text-sm font-bold uppercase tracking-[0.15em] ${tagColor} mb-3`}>
        {tag}
      </span>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${light ? "text-gray-400" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({ label, title, subtitle, align = 'center', light = false }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const textColor = light
    ? 'text-white/90'
    : 'text-stone-900 dark:text-stone-50';
  const subtitleColor = light
    ? 'text-white/60'
    : 'text-stone-500 dark:text-stone-400';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {label && (
        <span className={`font-accent italic text-lg ${light ? 'text-amber-400' : 'text-amber-700 dark:text-amber-500'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-body text-base md:text-lg leading-relaxed max-w-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

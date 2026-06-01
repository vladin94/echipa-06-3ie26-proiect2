interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({ label, title, subtitle, align = 'center', light = false }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {label && (
        <span
          className="font-accent italic text-lg"
          style={{ color: light ? 'rgba(253,172,196,0.9)' : 'var(--color-primary)' }}
        >
          {label}
        </span>
      )}
      <h2
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        style={{ color: light ? 'rgba(255,255,255,0.9)' : 'var(--color-text)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="font-body text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ color: light ? 'rgba(255,255,255,0.6)' : 'var(--color-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

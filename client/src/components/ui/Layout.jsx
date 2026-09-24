import React from 'react';

/**
 * Layout primitives. Pages compose these rather than hand-rolling padding and
 * max-widths, so vertical rhythm and measure stay consistent across the site.
 */

export function Container({ children, width = 'default', className = '' }) {
  const widths = {
    default: 'max-w-6xl',
    narrow: 'max-w-3xl',
    wide: 'max-w-7xl',
  };
  return (
    <div className={`${widths[width]} mx-auto px-6 ${className}`}>{children}</div>
  );
}

const tones = {
  // Default page surface.
  plain: 'bg-white text-ink-800',
  // Adjacent band, used to separate two light sections without a rule.
  muted: 'bg-ink-50 text-ink-800',
  // Inverted band. Used sparingly: once or twice per page at most.
  dark: 'bg-ink-950 text-ink-200',
  // Accent band. At most once per page, for the section that matters most.
  accent: 'bg-accent-700 text-white',
};

const sizes = {
  default: 'py-20 md:py-24',
  compact: 'py-14 md:py-16',
  hero: 'pt-32 pb-16 md:pt-40 md:pb-20',
};

export function Section({
  tone = 'plain',
  size = 'default',
  id,
  children,
  className = '',
}) {
  const borders = tone === 'muted' ? 'border-y border-ink-100' : '';
  return (
    <section id={id} className={`${tones[tone]} ${sizes[size]} ${borders} ${className}`}>
      {children}
    </section>
  );
}

/**
 * Small uppercase label above a heading. Carries the section's category so the
 * heading itself can stay short.
 */
export function Eyebrow({ children, tone = 'light' }) {
  const color = tone === 'dark' ? 'text-accent-300' : 'text-accent-600';
  return (
    <div className={`${color} text-xs font-semibold uppercase tracking-[0.14em] mb-4`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'light',
  align = 'left',
  className = '',
}) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-ink-950';
  const ledeColor = tone === 'dark' ? 'text-ink-300' : 'text-ink-600';
  const alignment = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`${alignment} ${align === 'center' ? 'max-w-2xl' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={`${titleColor} text-3xl md:text-4xl font-semibold leading-tight`}>
        {title}
      </h2>
      {lede && <p className={`${ledeColor} mt-4 text-lg leading-relaxed`}>{lede}</p>}
    </div>
  );
}

/**
 * Bordered panel. Flat by default: elevation is reserved for things that
 * genuinely float, which on this site is nothing.
 */
export function Panel({ children, className = '', tone = 'light' }) {
  const styles =
    tone === 'dark'
      ? 'border-white/10 bg-white/[0.03]'
      : 'border-ink-200 bg-white';
  return (
    <div className={`border ${styles} rounded-lg ${className}`}>{children}</div>
  );
}

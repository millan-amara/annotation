import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Rectangular, not pill-shaped: fully-round buttons are a consumer-app signal.
 * The accent is reserved for the single primary action in a view.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed';

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

const variants = {
  primary: 'bg-accent-600 text-white hover:bg-accent-700',
  secondary: 'border border-ink-300 text-ink-800 bg-white hover:bg-ink-50',
  onDark: 'bg-white text-ink-950 hover:bg-ink-100',
  ghostOnDark: 'border border-white/25 text-white hover:bg-white/10',
};
// The portal pages predate this file; keep their variant name working.
variants.outline = variants.secondary;

function classesFor({ variant, size, className }) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  loading = false,
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classesFor({ variant, size, className })}
      {...rest}
    >
      {loading && (
        <span
          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

/** Same appearance, but navigates. Use for calls to action. */
export function ButtonLink({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = classesFor({ variant, size, className });
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  );
}

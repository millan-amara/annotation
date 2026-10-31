import React from 'react';

/**
 * Label/value rows. This is the workhorse of the redesign: wherever the old
 * site used a decorated feature card to say something factual, a specification
 * row says it faster and reads as documentation rather than marketing.
 *
 * `rows` is [{ label, value, detail? }]. A null/undefined value renders as a
 * muted placeholder rather than an empty cell.
 */
export function SpecTable({ rows, placeholder = 'Available on request', tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <dl className={`divide-y ${dark ? 'divide-white/10' : 'divide-ink-200'}`}>
      {rows.map((row) => (
        <div key={row.label} className="py-4 grid sm:grid-cols-3 gap-1 sm:gap-6">
          <dt
            className={`text-sm font-medium ${dark ? 'text-ink-400' : 'text-ink-500'}`}
          >
            {row.label}
          </dt>
          <dd className="sm:col-span-2">
            <div className={dark ? 'text-white' : 'text-ink-900'}>
              {row.value || (
                <span className={dark ? 'text-ink-500' : 'text-ink-400'}>
                  {placeholder}
                </span>
              )}
            </div>
            {row.detail && (
              <p
                className={`mt-1 text-sm leading-relaxed ${
                  dark ? 'text-ink-400' : 'text-ink-600'
                }`}
              >
                {row.detail}
              </p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

import React from 'react';

/**
 * Locale coverage, drawn as a chip field on the accent band.
 *
 * Two jobs. It surfaces the African-language differentiator on the homepage,
 * where it was previously buried two clicks deep on /capabilities. And it is
 * the page's only accent-toned section, which breaks a run of four light
 * bands that made the homepage read flat next to the capabilities page.
 *
 * Delivered locales are solid; the rest are outlined. The distinction is the
 * honest part: we show what we have shipped in, not a coverage claim.
 */
export function LocaleBand({ locales, africanDelivered, note }) {
  return (
    <div>
      <ul className="flex flex-wrap gap-2.5">
        {locales.map((locale) => {
          const isAfrican = africanDelivered.includes(locale);
          return (
            <li
              key={locale}
              className={
                'rounded-md px-4 py-2.5 text-sm font-medium ' +
                (isAfrican
                  ? 'bg-white text-accent-700'
                  : 'border border-white/30 text-white')
              }
            >
              {locale}
            </li>
          );
        })}
      </ul>

      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-accent-100">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-white" />
          African language, delivered
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-sm border border-white/50"
          />
          Other locale, delivered
        </span>
      </p>

      {note && (
        <p className="mt-6 max-w-2xl text-accent-100 leading-relaxed">{note}</p>
      )}
    </div>
  );
}

export default LocaleBand;

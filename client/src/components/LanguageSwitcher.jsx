import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import {
  useLocale,
  LOCALE_META,
  DEFAULT_LOCALE,
  ENABLED_LOCALES,
} from '../i18n/LocaleContext';

const LOCALES = ENABLED_LOCALES;

/**
 * Swaps the locale prefix on the current URL, keeping the visitor on the page
 * they were reading instead of bouncing them to the homepage.
 */
function pathForLocale(pathname, locale) {
  let bare = pathname;
  for (const code of LOCALES) {
    if (code === DEFAULT_LOCALE) continue;
    if (bare === `/${code}`) {
      bare = '/';
      break;
    }
    if (bare.startsWith(`/${code}/`)) {
      bare = bare.slice(code.length + 1);
      break;
    }
  }
  if (locale === DEFAULT_LOCALE) return bare;
  return bare === '/' ? `/${locale}` : `/${locale}${bare}`;
}

const LanguageSwitcher = ({ onNavigate, className = '' }) => {
  const { pathname } = useLocation();
  const current = useLocale();

  // Nothing to switch between.
  if (LOCALES.length < 2) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Globe size={16} className="text-ink-400 mr-1" aria-hidden="true" />
      {LOCALES.map((code, idx) => (
        <React.Fragment key={code}>
          {idx > 0 && <span className="text-ink-300" aria-hidden="true">/</span>}
          <Link
            to={pathForLocale(pathname, code)}
            onClick={onNavigate}
            lang={LOCALE_META[code].htmlLang}
            aria-current={code === current ? 'true' : undefined}
            className={
              'px-1.5 py-0.5 text-sm rounded transition ' +
              (code === current
                ? 'text-accent-600 font-semibold'
                : 'text-ink-500 hover:text-accent-600')
            }
          >
            {LOCALE_META[code].short}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

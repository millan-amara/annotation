import { createContext, useContext, useMemo } from 'react';
import { translations, DEFAULT_LOCALE, LOCALE_META, ENABLED_LOCALES } from './translations';

export const LocaleContext = createContext({ locale: DEFAULT_LOCALE });

export function useLocale() {
  return useContext(LocaleContext).locale;
}

/**
 * Look up a dot-separated key for the active locale, falling back to English
 * when a translation is missing. A half-translated page shows English rather
 * than a raw key, so adding a locale never breaks a page mid-way.
 */
function lookup(dict, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

export function useT() {
  const locale = useLocale();
  return useMemo(() => {
    return (key) => {
      const value = lookup(translations[locale], key);
      if (value !== undefined) return value;
      const fallback = lookup(translations[DEFAULT_LOCALE], key);
      if (fallback !== undefined) return fallback;
      if (import.meta.env.DEV) {
        console.warn(`[i18n] missing translation key: ${key}`);
      }
      return key;
    };
  }, [locale]);
}

/**
 * Prefixes an app path with the active locale, so links stay inside the
 * language the visitor is reading. English is unprefixed.
 */
export function useLocalePath() {
  const locale = useLocale();
  return useMemo(() => {
    return (path) => {
      const clean = path.startsWith('/') ? path : `/${path}`;
      if (locale === DEFAULT_LOCALE) return clean;
      return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
    };
  }, [locale]);
}

export { LOCALE_META, DEFAULT_LOCALE, ENABLED_LOCALES };

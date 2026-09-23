import { useEffect } from 'react';
import {
  useLocale,
  LOCALE_META,
  DEFAULT_LOCALE,
  ENABLED_LOCALES,
} from '../i18n/LocaleContext';

const SITE_URL = 'https://www.spherepulseapp.com';
const LOCALES = ENABLED_LOCALES;

function setMetaTag(attr, key, value) {
  if (!value) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

function setLink(rel, href, hreflang) {
  if (!href) return;
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function localisedUrl(path, locale) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return `${SITE_URL}${clean}`;
  return clean === '/' ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}${clean}`;
}

/**
 * Keeps the document title, the shared/indexed metadata and the hreflang
 * alternates in step with the current route and locale. The static tags in
 * index.html remain the fallback for crawlers that do not run JavaScript.
 *
 * `path` is the locale-independent path (e.g. "/company"); the locale prefix
 * is added here.
 */
export default function usePageMeta({ title, description, path }) {
  const locale = useLocale();

  useEffect(() => {
    const meta = LOCALE_META[locale] || LOCALE_META[DEFAULT_LOCALE];
    document.documentElement.setAttribute('lang', meta.htmlLang);
    setMetaTag('property', 'og:locale', meta.htmlLang.replace('-', '_'));

    if (title) {
      document.title = title;
      setMetaTag('property', 'og:title', title);
      setMetaTag('name', 'twitter:title', title);
    }

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    if (path) {
      const canonical = localisedUrl(path, locale);
      setLink('canonical', canonical);
      setMetaTag('property', 'og:url', canonical);

      // Tell search engines which translations of this page exist. With a
      // single locale served there is no alternate worth advertising.
      if (LOCALES.length > 1) {
        for (const code of LOCALES) {
          setLink('alternate', localisedUrl(path, code), LOCALE_META[code].htmlLang);
        }
        setLink('alternate', localisedUrl(path, DEFAULT_LOCALE), 'x-default');
      }
    }
  }, [title, description, path, locale]);
}

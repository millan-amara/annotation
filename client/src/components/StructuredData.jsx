import React from 'react';
import { COMPANY } from '../data/company';

const SITE_URL = COMPANY.siteUrl;

/**
 * Breadcrumb structured data.
 *
 * This is the one schema type on this site that actually earns a rich result:
 * Google replaces the raw URL in the search listing with the breadcrumb trail.
 *
 * Deliberately NOT here:
 *   - FAQPage. We have a real FAQ, but since August 2023 Google has limited FAQ
 *     rich results to recognised government and health sites, so the markup
 *     would render nothing for us.
 *   - JobPosting. It does produce rich results, but the roles on /jobs are not
 *     live openings. Marking them up would breach Google's structured data
 *     policy and risks a manual action. Add it only when a real vacancy exists,
 *     with a genuine validThrough date.
 *   - WebPage / SiteNavigationElement / ContactPage. These produce no rich
 *     result of any kind. Harmless, but they are not doing anything.
 */
export function BreadcrumbJsonLd({ trail }) {
  const itemListElement = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    ...trail.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement,
        }),
      }}
    />
  );
}

export default BreadcrumbJsonLd;

/**
 * Single source of truth for every factual claim the site makes.
 *
 * Rule for this file: if a buyer's procurement team asked you to evidence a
 * line here, you should be able to produce a roster, an invoice, a delivery
 * log or a certificate. Anything you cannot evidence does not belong on the
 * site. Items marked CONFIRM below still need real values from you.
 */

export const COMPANY = {
  name: 'SpherePulse',
  email: 'contact@spherepulseapp.com',
  linkedin: 'https://www.linkedin.com/company/spherepulse',
  city: 'Nairobi',
  country: 'Kenya',
  siteUrl: 'https://www.spherepulseapp.com',

  // CONFIRM: fill from your certificate of incorporation before publishing
  // the Company page. Leave a field as null and it is hidden rather than
  // shown blank.
  legalName: null,           // e.g. 'SpherePulse Limited'
  registrationNumber: null,  // e.g. 'PVT-XXXXXXX'
  taxId: null,               // KRA PIN
  // CONFIRM: registration with the Office of the Data Protection
  // Commissioner (Kenya). Set to the certificate number once issued.
  dataProtectionRegistration: null,
};

/**
 * Programs delivered. These are the intermediaries you have actually worked
 * through, not end clients.
 *
 * BEFORE PUBLISHING: check your contracts with each of these. Data vendors
 * commonly include a clause barring you from naming them publicly as a
 * client. If any contract does, remove that entry — an NDA breach costs you
 * the relationship you are trying to grow.
 */
export const DELIVERED_FOR = ['OneForma', 'Pactera', 'Data Ocean AI'];

/**
 * What we tell buyers about how delivery works. These are structural facts
 * about the operating model, not performance statistics.
 */
export const OPERATING_MODEL = [
  {
    label: 'Team size per project',
    value: '10–40',
    detail: 'Contributors recruited, trained and managed by us for each engagement',
  },
  {
    label: 'Base of operations',
    value: 'Nairobi, Kenya',
    detail: 'Registered Kenyan company, working across East Africa',
  },
  {
    label: 'Contributor payment',
    value: 'Handled by us',
    detail: 'We recruit, pay and manage the workforce; you contract one supplier',
  },
  {
    label: 'Reply time',
    value: '1 business day',
    detail: 'On enquiries sent through this site or by email',
  },
];

/**
 * Compliance posture. Deliberately narrow.
 *
 * Do NOT add HIPAA, PCI-DSS, SOC 2 or ISO claims here unless you hold the
 * certification or have contracted under that framework and can prove it.
 * An unsupported compliance claim is the fastest way to fail a supplier
 * qualification review.
 */
export const COMPLIANCE = {
  gdpr:
    'We handle personal data under GDPR-style terms: documented consent for collected data, ' +
    'restricted access, and deletion on request or at project end.',
  kenya:
    'We operate under the Kenya Data Protection Act, 2019, including contributor consent ' +
    'and data subject rights.',
  contracts:
    'We sign NDAs, data processing agreements and master service agreements, and we hold ' +
    'signed confidentiality and IP assignment agreements with every contributor.',
  notCertified:
    'We do not currently hold HIPAA, PCI-DSS, SOC 2 or ISO certification, and we do not ' +
    'take on projects that require them.',
};

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
 * Named intermediaries we have delivered through. Deliberately EMPTY.
 *
 * Data vendors commonly bar suppliers from naming them publicly, and the
 * aggregate track record below is a stronger credential than three logos
 * anyway. Only add a name here once you have checked that contract and can
 * point to the clause that permits it.
 */
export const DELIVERED_FOR = [];

/**
 * PROVENANCE: read before editing anything below.
 *
 * This record was earned by Hughes personally, as an independent contractor to
 * global data providers, BEFORE SpherePulse existed as a company. SpherePulse
 * has no corporate delivery history of its own yet.
 *
 * That distinction must stay visible on the site. Incorporation dates are
 * public and trivially checked; a buyer who finds a new company claiming nine
 * years of corporate history stops believing the rest of the page. Stated
 * honestly it costs nothing: founding a company on the founder's track record
 * is completely ordinary and buyers understand it.
 *
 * So: never let "we have delivered" stand unqualified. Use PROVENANCE below
 * wherever the record appears.
 */
export const PROVENANCE =
  'SpherePulse was formed to put a company around work its founder has been ' +
  'delivering since 2017 as an independent contractor to global data providers. ' +
  'The record below is that work. References are personal rather than corporate, ' +
  'and we say so when we make the introduction.';

/**
 * Aggregate delivery record. Every figure here came from Hughes directly.
 *
 * CONFIRM before a buyer asks you to evidence them:
 *   - audio hours: stated as "close to 20,000"; replace with the exact figure
 *     from your delivery logs and drop the tilde.
 *   - object collection: stated as "100K"; confirm the unit (images? items?)
 *     and correct the label if "items" is wrong.
 *
 * NOTE ON SCOPE: nothing here should describe collecting personal or biometric
 * data from people. The object-imaging programme photographed objects, not
 * faces, and SpherePulse is not yet registered with the ODPC. Do not add face,
 * selfie, voice-collection or sensor-data claims until that registration and
 * the consent framework in docs/contributor-consent.md are both in place.
 */
export const TRACK_RECORD = [
  {
    label: 'Experience since',
    value: '2017',
    detail: 'Nine years of data collection and annotation work by our founder',
  },
  {
    label: 'Audio delivered',
    value: '~20,000 hours',
    detail: 'Transcription, segmentation and phonetic work across ten-plus locales',
  },
  {
    label: 'Items collected',
    value: '100,000+',
    detail: 'Object and product images captured to client specification',
  },
  {
    label: 'Largest single team',
    value: '150 contributors',
    detail: 'Recruited, trained, managed and paid on one project by our founder',
  },
];

/**
 * Locales we have staffed and delivered in. This is delivery history, not a
 * list of everything we could recruit for: coverage is confirmed per project.
 */
/**
 * African languages we have actually DELIVERED in, as opposed to ones we would
 * recruit for. Hughes reports Swahili plus about two others; Swahili and Hausa
 * are the two he has named. CONFIRM the third and add it here: the honesty of
 * the distinction is the point, so do not pad this list.
 */
export const AFRICAN_LANGUAGES_DELIVERED = ['Swahili', 'Hausa'];

export const LOCALES_DELIVERED = [
  'English (US, UK, CA, AU, IN)',
  'Spanish',
  'French',
  'German',
  'Swahili',
  'Hausa',
];

/**
 * Case studies.
 *
 * Client names are withheld: this work was subcontracted through global data
 * providers under NDA. Figures are the ones Hughes supplied. See PROVENANCE
 * above: this was delivered by Hughes personally, not by the company, and
 * every surface that renders these must say so.
 *
 * NOT INCLUDED ON PURPOSE:
 *   - Contract values. Hughes reports most engagements at USD 20k+, which is
 *     useful in a sales conversation but is commercially sensitive and can
 *     breach client confidentiality if published. Keep it for the room.
 *   - Acceptance rates and turnaround times. We do not have measured figures,
 *     and inventing them is exactly what would fail a diligence review. Add
 *     them here once you can pull them from a delivery report.
 */
export const CASE_STUDIES = [
  {
    title: 'Multilingual transcription and segmentation',
    discipline: 'Speech',
    summary:
      'Conversational and scripted audio transcribed, segmented and time-aligned to client schema, including IPA-level phonetic transcription for pronunciation modelling. Work ran continuously across multiple locales rather than as a one-off batch.',
    facts: [
      { label: 'Locales', value: 'English (US, UK, CA, AU, IN), Spanish, French, German, Swahili, Hausa' },
      { label: 'Volume', value: 'Part of ~20,000 audio hours delivered since 2017' },
      { label: 'Team', value: 'Scaled to 150 contributors at peak' },
      { label: 'Specialist work', value: 'IPA phonetic transcription, speaker segmentation' },
    ],
  },
  {
    title: 'Object and product image collection at scale',
    discipline: 'Vision',
    summary:
      'Contributors photographed everyday objects (toys, furniture, utensils, footwear, bags and similar categories) against a framing, lighting and metadata specification, including programmes requiring a fixed device profile. No people were photographed.',
    facts: [
      { label: 'Volume', value: '100,000+ items collected' },
      { label: 'Coverage', value: 'Distributed contributors across multiple countries' },
      { label: 'Controls', value: 'Per-item spec compliance and metadata captured at source' },
      { label: 'Also delivered', value: 'Video annotation and segmentation on the same programmes' },
    ],
  },
  {
    title: 'Model alignment and content review',
    discipline: 'Text & safety',
    summary:
      'Human feedback work for model training: preference ranking and RLHF tasks, prompt and response authoring, and rubric-based grading. Separately, content moderation queues classifying policy-violating material, staffed with briefed reviewers on a rotation.',
    facts: [
      { label: 'Task types', value: 'RLHF preference ranking, prompt and response authoring, relevance grading' },
      { label: 'Trust & safety', value: 'Content moderation and policy-violation classification' },
      { label: 'Locales', value: 'English variants, plus French and Swahili' },
      { label: 'Delivery', value: 'Rubric calibration and inter-reviewer checks before volume' },
    ],
  },
];

/**
 * What we tell buyers about how delivery works. These are structural facts
 * about the operating model, not performance statistics.
 */
export const OPERATING_MODEL = [
  {
    label: 'Team size per project',
    value: '10–150',
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
    label: 'Typical turnaround',
    value: 'Days to two months',
    detail: 'Scoped per project against volume and how hard the locale is to source',
  },
  {
    label: 'Reply time',
    value: '1 business day',
    detail: 'On enquiries sent through this site or by email',
  },
];

/**
 * How we handle acceptance.
 *
 * DELIBERATELY NOT A PERCENTAGE. Hughes reports that acceptance "has never been
 * an issue", but that is recollection rather than a measured figure, and an
 * acceptance rate is the first number a procurement team asks you to evidence.
 * What is stated below is the practice that produces the result: a selection
 * rule and an internal QA gate: both of which are true, distinctive, and
 * demonstrable in how an engagement actually runs.
 *
 * Note there is no line here announcing the absence of a percentage. Not
 * publishing a number is right; telling the reader you are not publishing it
 * just points at a hole they had not noticed. Say what you do, and stop.
 *
 * Replace this with real figures once you can pull them from a delivery report.
 */
export const ACCEPTANCE = {
  selection:
    'We only take on work we can staff to the standard the project needs. If we cannot ' +
    'recruit the locale, hit the volume or meet the deadline, we say so at scoping rather ' +
    'than discovering it halfway through delivery.',
  qaGate:
    'Batches are reviewed against your specification by us before they reach you, and ' +
    'anything that misses is reworked on our side. Rework happens before delivery rather ' +
    'than after rejection.',
};

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

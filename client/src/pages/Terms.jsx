import React from 'react';
import LegalPage from '../components/LegalPage';
import usePageMeta from '../lib/usePageMeta';
import { COMPANY } from '../data/company';

const Terms = () => {
  usePageMeta({
    title: 'Terms of Use | SpherePulse',
    description:
      'The terms that govern use of the SpherePulse website, including job listings, submitted enquiries and intellectual property.',
    path: '/terms',
  });

  const sections = [
    {
      heading: 'About these terms',
      body: [
        `These terms govern your use of ${COMPANY.siteUrl}. By using the site you accept them. If you do not accept them, please do not use the site.`,
        'These terms cover the website only. Work we deliver for a client is governed by the separate written agreement for that project, and that agreement prevails over anything on this page.',
      ],
    },
    {
      heading: 'Using the site',
      body: [
        'You may use this site to learn about our services, contact us and apply to advertised roles. You may not attempt to gain unauthorised access to any part of the site or its underlying systems, interfere with its operation, or use automated means to extract its content at scale.',
      ],
    },
    {
      heading: 'Information on this site',
      body: [
        'We aim to keep the site accurate and current, and we state our capabilities and credentials as they actually stand. Even so, the content here is general information rather than a binding offer, and capability and availability are confirmed per project in writing.',
        'Descriptions of our capabilities do not constitute a warranty that we can staff a particular language, volume or timeline. We confirm that during scoping, before you commit.',
      ],
    },
    {
      heading: 'Enquiries you send us',
      body: [
        'Please do not send confidential information, sample data or personal data of third parties through the contact forms on this site. If you need to share something confidential, tell us and we will put a mutual non-disclosure agreement in place first.',
        'Information you send through the site is handled in line with our Privacy Policy.',
      ],
    },
    {
      heading: 'Job listings and applications',
      body: [
        'Roles listed on this site are opportunities to be engaged as an independent contributor on a specific project. A listing is not an offer of employment, and applying does not create an employment relationship, a contract or a guarantee of work.',
        'Availability, pay rates and durations shown in a listing are as advertised at the time and may change before a project starts. Terms for any engagement are set out in the contributor agreement you sign before starting work.',
        'We never ask applicants to pay a fee at any stage. If someone asks you to pay to apply, work for or be paid by us, it is not us. Please report it to ' + COMPANY.email + '.',
      ],
    },
    {
      heading: 'Third-party links and services',
      body: [
        'Some parts of this site link to third-party services, including application forms hosted by Google. Those services are operated by others under their own terms and privacy policies, and we are not responsible for their content or availability.',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        `The content, design and branding of this site are owned by ${COMPANY.name} or used with permission. You may read, download and print pages for your own use, including circulating them internally to evaluate us as a supplier. You may not republish or commercially exploit the content without our written permission.`,
      ],
    },
    {
      heading: 'Liability',
      body: [
        'The site is provided as it is. To the extent permitted by law, we are not liable for loss arising from reliance on general information published here, or from the site being unavailable.',
        'Nothing in these terms limits liability that cannot lawfully be limited.',
      ],
    },
    {
      heading: 'Governing law',
      body: [
        `These terms are governed by the laws of ${COMPANY.country}, and the courts of ${COMPANY.country} have jurisdiction over any dispute arising from them. This does not affect the governing law agreed in a separate contract for delivered work.`,
      ],
    },
    {
      heading: 'Contact',
      body: [`Questions about these terms can be sent to ${COMPANY.email}.`],
    },
  ];

  return (
    <LegalPage
      title="Terms of Use"
      intro="The terms that apply when you use this website. Delivered work is governed by the contract signed for that project."
      lastUpdated="23 September 2026"
      sections={sections}
    />
  );
};

export default Terms;

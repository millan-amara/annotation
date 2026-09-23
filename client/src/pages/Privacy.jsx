import React from 'react';
import LegalPage from '../components/LegalPage';
import usePageMeta from '../lib/usePageMeta';
import { COMPANY } from '../data/company';

const Privacy = () => {
  usePageMeta({
    title: 'Privacy Policy — SpherePulse',
    description:
      'How SpherePulse collects, uses, shares and protects personal data, and the rights available to data subjects under the Kenya Data Protection Act and the GDPR.',
    path: '/privacy',
  });

  const sections = [
    {
      heading: 'Who we are',
      body: [
        `${COMPANY.name} is a data collection and annotation company based in ${COMPANY.city}, ${COMPANY.country}. For personal data we collect about website visitors, job applicants and our contributors, we act as the data controller. For personal data we process inside a client project, we act as a data processor on that client's instructions.`,
        `You can reach us about anything in this policy at ${COMPANY.email}.`,
      ],
    },
    {
      heading: 'What we collect',
      body: [
        'Website enquiries. When you use a form on this site we collect your name, email address, company name if you give one, and the content of your message.',
        'Applications to contribute. When you apply to a role we collect the information requested on the application form, which may include your name, contact details, country of residence, languages spoken and relevant experience.',
        'Contributors we engage. Once you join a project we additionally collect the information needed to contract and pay you, which may include identity documents, tax information and payment details.',
        'Project data. On some projects contributors record audio, capture images or provide text. What is collected, and the consent for it, is described to contributors before they begin that specific project.',
        'We do not use advertising or tracking cookies on this website.',
      ],
    },
    {
      heading: 'Why we process it, and on what basis',
      body: [
        'We process personal data for the following purposes:',
        [
          'To respond to your enquiry and discuss a possible project — on the basis of steps taken at your request prior to entering a contract.',
          'To assess applications and manage our contributor roster — on the basis of our legitimate interest in staffing projects, and of contract performance once you are engaged.',
          'To pay contributors and meet our tax and accounting obligations — on the basis of contract performance and legal obligation.',
          'To deliver client projects — on the basis of contract, and on documented consent where project data is collected from an individual.',
        ],
        'Where we rely on consent, you may withdraw it at any time without affecting the lawfulness of processing before withdrawal.',
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        'We share personal data with the following categories of recipient, and no others:',
        [
          'Service providers that operate parts of this website and our intake process, currently EmailJS for form delivery and Google Forms for applications.',
          'Payment providers used to pay contributors.',
          'Clients, where the project data they commissioned contains personal data. This is governed by the contract and the consent obtained at collection.',
          'Professional advisers and authorities, where we are legally required to disclose.',
        ],
        'We do not sell personal data, and we do not share it for third-party marketing.',
      ],
    },
    {
      heading: 'International transfers',
      body: [
        'We are based in Kenya and our clients are often outside Kenya. Delivering a project therefore usually involves transferring personal data across borders.',
        'Where we transfer personal data out of Kenya or the European Economic Area, we do so under the safeguards required by the Kenya Data Protection Act, 2019 and, where applicable, the GDPR — typically standard contractual clauses in our agreement with the client, or the data subject’s explicit and informed consent for that project.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'Enquiries are kept for up to two years from the last contact, so we can pick up a conversation where it left off.',
        'Applicant information is kept for up to two years, so we can contact you about later projects in your language. Tell us if you would rather we did not.',
        'Contributor records are kept for the duration of the engagement and then for as long as tax and accounting law requires us to retain them.',
        'Project data is deleted or returned at the end of the project, or earlier if the client instructs it.',
      ],
    },
    {
      heading: 'How we protect it',
      body: [
        'Access to personal data is limited to the people who need it for the project at hand. Contributors sign confidentiality terms before they are given access to any project data, and access is withdrawn when their involvement ends.',
        'Project data is held in the storage the client specifies, or in access-controlled storage we manage, and is not copied to personal devices except where the project requires collection on a personal phone and the client has agreed to it.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Under the Kenya Data Protection Act, 2019, and under the GDPR where it applies to you, you have the right to be informed about how your data is used, to access a copy of it, to have inaccurate data corrected, to have data deleted, to object to or restrict processing, and to receive your data in a portable format.',
        `To exercise any of these, email ${COMPANY.email}. We will respond within the statutory period. We may ask you to confirm your identity first, so we do not disclose your data to someone else.`,
        'If we process your data as a processor on a client’s behalf, we will pass your request to that client and support them in answering it.',
      ],
    },
    {
      heading: 'Complaints',
      body: [
        'If you believe we have handled your personal data improperly, please raise it with us first — most issues are quickest to resolve directly.',
        'You also have the right to complain to the Office of the Data Protection Commissioner in Kenya, or, if you are in the European Economic Area or the United Kingdom, to your local supervisory authority.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We update this policy when our processing changes. The date at the top of this page shows the current version. Material changes affecting contributors will also be communicated directly.',
      ],
    },
  ];

  return (
    <LegalPage
      title="Privacy Policy"
      intro="How we collect, use, share and protect personal data — for website visitors, applicants, contributors and the people whose data we collect on behalf of clients."
      lastUpdated="23 September 2026"
      sections={sections}
    />
  );
};

export default Privacy;

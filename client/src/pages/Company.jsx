import React from 'react';
import { ShieldCheck, FileSignature, Users, Wallet, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import usePageMeta from '../lib/usePageMeta';
import { COMPANY, COMPLIANCE, DELIVERED_FOR } from '../data/company';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { SpecTable } from '../components/ui/SpecTable';
import { ButtonLink } from '../components/ui/Button';

/**
 * Supplier-qualification page. The audience is a procurement or vendor
 * management team checking whether we can be onboarded as a supplier, so
 * everything here is stated plainly and should be evidenceable on request.
 */
const CompanyPage = () => {
  usePageMeta({
    title: 'Company & Compliance — SpherePulse',
    description:
      'Supplier information for SpherePulse: legal entity, workforce contracts, data protection posture and commercial terms for AI training data projects.',
    path: '/company',
  });

  const entityRows = [
    { label: 'Trading name', value: COMPANY.name },
    { label: 'Registered name', value: COMPANY.legalName },
    { label: 'Company registration number', value: COMPANY.registrationNumber },
    { label: 'Tax identification (KRA PIN)', value: COMPANY.taxId },
    { label: 'Country of registration', value: COMPANY.country },
    { label: 'Principal place of business', value: COMPANY.city + ', ' + COMPANY.country },
    { label: 'Data protection registration', value: COMPANY.dataProtectionRegistration },
    { label: 'Contact for procurement', value: COMPANY.email },
  ];

  const sections = [
    {
      icon: Users,
      title: 'Workforce',
      points: [
        'Contributors are recruited, trained and managed directly by us — not resold from a third-party freelancer pool.',
        'We staff 10–40 contributors per engagement and adjust the roster as volume changes.',
        'We pay contributors ourselves, on our own schedule, and carry that cost between your invoice cycles.',
        'Project leads are named at kickoff, so you know who is accountable for delivery.',
      ],
    },
    {
      icon: FileSignature,
      title: 'Contracts',
      points: [
        COMPLIANCE.contracts,
        'We can execute under your master service agreement and your data processing agreement.',
        'Work product and IP transfer to the client on payment, unless your contract specifies otherwise.',
        'We will sign a mutual NDA before receiving project specifications or sample data.',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Data protection',
      points: [COMPLIANCE.gdpr, COMPLIANCE.kenya, COMPLIANCE.notCertified],
    },
    {
      icon: Wallet,
      title: 'Commercial',
      points: [
        'We invoice as a registered company and can receive international bank transfer in USD or EUR.',
        'Pricing is quoted per unit, per hour or per project, depending on what suits your procurement process.',
        'We prefer to start with a paid pilot batch so quality is proven before volume is committed.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section size="hero" tone="dark">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="dark">Supplier information</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              Company &amp; compliance
            </h1>
            <p className="mt-8 text-xl text-ink-300 leading-relaxed">
              Everything a vendor management team usually asks for, in one place. If you
              need something that is not here — a certificate, a reference, a signed
              questionnaire — email {COMPANY.email} and we will send it.
            </p>
          </div>
        </Container>
      </Section>

      {/* Legal entity */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Entity"
                title="Legal entity"
                lede="Registered in Kenya. Anything not shown here is available on request."
              />
            </div>
            <div className="lg:col-span-8">
              <div className="border-t border-ink-200">
                <SpecTable rows={entityRows} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Terms of engagement */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Terms of engagement"
            title="How we contract and operate"
          />
          <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="border-t border-ink-300 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="text-accent-600 shrink-0" size={18} />
                    <h3 className="text-lg font-semibold text-ink-950">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-accent-600 mt-2 h-1 w-1 rounded-full bg-accent-600 shrink-0" />
                        <span className="text-ink-600 text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Delivery history */}
      {DELIVERED_FOR.length > 0 && (
        <Section>
          <Container width="narrow">
            <SectionHeading eyebrow="Track record" title="Delivery history" />
            <p className="mt-6 text-lg text-ink-600 leading-relaxed">
              We have delivered collection and annotation programs through global data
              providers including {DELIVERED_FOR.join(', ')}. These were subcontracted
              engagements rather than direct contracts with the end client whose model the
              data trained. We can describe scope, volume and duration under NDA, and can
              put you in touch with a reference on request.
            </p>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section tone="dark" size="compact">
        <Container>
          <div className="grid md:grid-cols-12 gap-8 md:items-end">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                Need something for your vendor file?
              </h2>
              <p className="text-ink-300 leading-relaxed">
                Send us your supplier questionnaire, NDA or onboarding form and we will
                return it completed within one business day.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
              <ButtonLink href={'mailto:' + COMPANY.email} variant="onDark">
                {COMPANY.email}
              </ButtonLink>
              <ButtonLink to="/contact" variant="ghostOnDark">
                Contact
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default CompanyPage;

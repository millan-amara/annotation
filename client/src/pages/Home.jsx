import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuickContactForm from '../components/QuickContactForm';
import HeroSignal from '../components/HeroSignal';
import usePageMeta from '../lib/usePageMeta';
import {
  PROVENANCE,
  TRACK_RECORD,
  CASE_STUDIES,
  LOCALES_DELIVERED,
  OPERATING_MODEL,
  COMPANY,
} from '../data/company';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { SpecTable } from '../components/ui/SpecTable';
import { ButtonLink } from '../components/ui/Button';

const SpherePulseLanding = () => {
  usePageMeta({
    title: 'Managed Data Teams for Multilingual AI | SpherePulse',
    description:
      'English-language annotation, transcription and model-alignment work at volume, plus native-speaker coverage in African languages. Teams recruited, contracted and managed from Nairobi, Kenya.',
    path: '/',
  });

  const capabilities = [
    {
      title: 'Two lanes, one supplier',
      description:
        'English-language annotation, transcription, moderation and model-alignment work at volume, and native-speaker collection in African languages. You can hand us either without onboarding a second vendor.',
    },
    {
      title: 'Teams assembled per project',
      description:
        'We recruit, train and manage the contributors for each engagement, from ten on a focused batch to 150 at peak on a single project, and grow or shrink the roster as your volume changes.',
    },
    {
      title: 'QA built into delivery',
      description:
        'Contributor training and certification, spot checks during collection, peer review, and a final pass before anything ships to you.',
    },
    {
      title: 'One supplier, whole workforce',
      description:
        'We handle recruitment, contracts, payment and day-to-day support for every contributor. You manage one relationship instead of a hundred and fifty.',
    },
  ];

  const assurances = [
    'We only take on work we can staff to standard, and say so at scoping when we cannot',
    'Batches are QA-ed against your spec by us, and reworked on our side before delivery',
    'Contributors recruited, contracted and paid by us, not subcontracted on',
    'Signed confidentiality and IP assignment with every contributor',
  ];

  const openRoles = [
    { title: 'Menu Image Collection', location: 'Remote · Global', link: 'https://forms.gle/nUN9FeXGgiZWQMDy5' },
    { title: 'Object & Product Imaging', location: 'Remote · Global', link: 'https://forms.gle/TVL776c9M1VtWE1k7' },
    { title: 'Data Annotation Specialist', location: 'Remote · English', link: 'https://forms.gle/TVL776c9M1VtWE1k7' },
    { title: 'Transcription & Segmentation', location: 'Remote · Multilingual', link: 'https://forms.gle/TVL776c9M1VtWE1k7' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SiteNavigationElement',
            name: ['Capabilities', 'Company', 'Jobs', 'Contact'],
            url: [
              'https://www.spherepulseapp.com/capabilities',
              'https://www.spherepulseapp.com/company',
              'https://www.spherepulseapp.com/jobs',
              'https://www.spherepulseapp.com/contact',
            ],
          }),
        }}
      />

      <Navbar />

      {/* Hero */}
      <Section size="hero">
        <Container>
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>AI training data</Eyebrow>
              <h1 className="text-5xl md:text-6xl font-semibold text-ink-950 leading-[1.05]">
                Managed data teams for multilingual AI
              </h1>
              <p className="mt-8 text-xl text-ink-600 leading-relaxed">
                English-language annotation, transcription and model-alignment work at
                volume, plus native-speaker coverage in African languages, delivered by
                teams we recruit, contract, pay and quality-check ourselves.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <ButtonLink to="/contact" size="lg">
                  Start a project
                  <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink to="/capabilities" variant="secondary" size="lg">
                  See capabilities
                </ButtonLink>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-center">
              <HeroSignal />
            </div>
          </div>
        </Container>
      </Section>

      {/* Track record */}
      <Section tone="muted" size="compact">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {TRACK_RECORD.map((item) => (
              <div key={item.label}>
                <div className="font-display text-2xl md:text-3xl font-semibold text-ink-950">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-medium text-ink-700">{item.label}</div>
                <div className="mt-1 text-sm text-ink-500 leading-relaxed">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Operating model */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="How we work"
                title="A single supplier that owns the workforce"
                lede="We are based in Nairobi and recruit across Africa. Rather than routing you to a freelancer pool, we assemble a named team for your project and stay accountable for what it delivers."
              />
            </div>
            <div className="lg:col-span-7">
              <SpecTable
                rows={OPERATING_MODEL.map((item) => ({
                  label: item.label,
                  value: item.value,
                  detail: item.detail,
                }))}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* What you get */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="The parts of human-in-the-loop data work that are hardest to run remotely"
          />
          <div className="mt-14 grid md:grid-cols-2 gap-x-12 gap-y-10">
            {capabilities.map((item) => (
              <div key={item.title} className="border-t border-ink-300 pt-6">
                <h3 className="text-lg font-semibold text-ink-950 mb-3">{item.title}</h3>
                <p className="text-ink-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Case studies */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Selected work"
            title="What we have delivered"
            lede={PROVENANCE + ' Clients are covered by NDA and are not named, but we can describe scope, volume and duration under NDA.'}
          />

          <div className="mt-14 divide-y divide-ink-200 border-t border-ink-200">
            {CASE_STUDIES.map((study) => (
              <article key={study.title} className="py-10 grid lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">
                    {study.discipline}
                  </div>
                  <h3 className="text-xl font-semibold text-ink-950 mb-4 leading-snug">
                    {study.title}
                  </h3>
                  <p className="text-ink-600 leading-relaxed">{study.summary}</p>
                </div>
                <dl className="lg:col-span-7 lg:pt-1 divide-y divide-ink-100">
                  {study.facts.map((fact) => (
                    <div key={fact.label} className="py-3 grid sm:grid-cols-3 gap-1 sm:gap-6">
                      <dt className="text-sm font-medium text-ink-500">{fact.label}</dt>
                      <dd className="sm:col-span-2 text-sm text-ink-800 leading-relaxed">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-ink-200 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 shrink-0">
              Locales delivered in
            </div>
            <p className="text-ink-700">{LOCALES_DELIVERED.join(' · ')}</p>
          </div>
        </Container>
      </Section>

      {/* Assurances */}
      <Section tone="dark">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                tone="dark"
                eyebrow="Built for volume buyers"
                title="What we commit to in writing"
              />
            </div>
            <ul className="lg:col-span-7 space-y-5">
              {assurances.map((point) => (
                <li key={point} className="flex gap-4 items-start">
                  <Check className="text-accent-300 shrink-0 mt-1" size={18} />
                  <span className="text-lg text-ink-200 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Work we staff for */}
      <Section id="jobs">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Join the network"
              title="Work we staff for"
              lede="We build the roster before a project starts. Register your languages and country and we will contact you when work matching them comes in."
              className="mb-0"
            />
            <ButtonLink to="/jobs" variant="secondary">
              See all work types
              <ArrowRight size={16} />
            </ButtonLink>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border border-ink-200 rounded-lg overflow-hidden">
            {openRoles.map((role) => (
              <a
                key={role.title}
                href={role.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 hover:bg-ink-50 transition-colors"
              >
                <h3 className="font-semibold text-ink-950 mb-2 group-hover:text-accent-600 transition-colors">
                  {role.title}
                </h3>
                <p className="text-sm text-ink-500 mb-6">{role.location}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600">
                  Register interest
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact" tone="dark">
        <Container>
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                tone="dark"
                eyebrow="Start here"
                title="Tell us what you need staffed"
                lede="Send the languages, volume and timeline. We reply within one business day with what we can staff and at what rate."
              />
              <div className="mt-8 space-y-1 text-ink-300">
                <a href={'mailto:' + COMPANY.email} className="block hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
                <a
                  href={COMPANY.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="lg:col-span-7">
              <QuickContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default SpherePulseLanding;

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuickContactForm from '../components/QuickContactForm';
import usePageMeta from '../lib/usePageMeta';
import { DELIVERED_FOR, OPERATING_MODEL, COMPANY } from '../data/company';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { SpecTable } from '../components/ui/SpecTable';
import { ButtonLink } from '../components/ui/Button';

const SpherePulseLanding = () => {
  usePageMeta({
    title: 'SpherePulse — African Language Data Collection & Annotation',
    description:
      'Native-speaker teams across Africa delivering speech, image and text training data for AI. Managed recruitment, collection, annotation and QA from Nairobi, Kenya.',
    path: '/',
  });

  const capabilities = [
    {
      title: 'Native speakers, not translators',
      description:
        'We recruit contributors who grew up with the language and brief them on the cultural context each task needs. Every recording and label comes from someone the data is actually about.',
    },
    {
      title: 'Teams assembled per project',
      description:
        'We recruit, train and manage 10–40 contributors for each engagement, and grow or shrink the roster as your volume changes.',
    },
    {
      title: 'QA built into delivery',
      description:
        'Contributor training and certification, spot checks during collection, peer review, and a final pass before anything ships to you.',
    },
    {
      title: 'One supplier, whole workforce',
      description:
        'We handle recruitment, contracts, payment and day-to-day support for every contributor. You manage one relationship instead of forty.',
    },
  ];

  const assurances = [
    'Delivery experience across speech, image and text projects',
    'Contributors recruited, contracted and paid by us — not subcontracted on',
    'Signed confidentiality and IP assignment with every contributor',
    'Documented QA passes, with sample-level tracking you can audit',
  ];

  const openRoles = [
    { title: 'Menu Image Collection', location: 'Remote · Global', link: 'https://forms.gle/nUN9FeXGgiZWQMDy5' },
    { title: 'Selfie Picture Collection', location: 'Remote · Multiple', link: 'https://forms.gle/aypcdEJLNAmzi2RP9' },
    { title: 'Data Annotation Specialist', location: 'Remote · English', link: 'https://forms.gle/TVL776c9M1VtWE1k7' },
    { title: 'iPhone Data Collection', location: 'Remote · Global', link: 'https://forms.gle/TVL776c9M1VtWE1k7' },
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
          <div className="max-w-4xl">
            <Eyebrow>AI training data · Nairobi, Kenya</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-ink-950 leading-[1.05]">
              Managed data teams for African languages
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-ink-600 leading-relaxed max-w-3xl">
              Speech, image and text training data collected and annotated by native
              speakers — recruited, contracted, paid and quality-checked by us.
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
        </Container>
      </Section>

      {/* Credential line */}
      <Section tone="muted" size="compact">
        <Container>
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 shrink-0">
              Delivered on programs for
            </div>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              {DELIVERED_FOR.map((name) => (
                <span key={name} className="font-display text-lg text-ink-800">
                  {name}
                </span>
              ))}
            </div>
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

      {/* Open roles */}
      <Section id="jobs">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Join the network"
              title="Open roles"
              lede="Paid remote work in data collection and annotation."
              className="mb-0"
            />
            <ButtonLink to="/jobs" variant="secondary">
              View all roles
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
                  Apply
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

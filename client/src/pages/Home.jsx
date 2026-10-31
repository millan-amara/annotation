import React from 'react';
import {
  ArrowRight,
  Check,
  Users,
  ShieldCheck,
  FileSignature,
  AudioLines,
  Camera,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuickContactForm from '../components/QuickContactForm';
import HeroSignal from '../components/HeroSignal';
import { TwoLanes } from '../components/ui/TwoLanes';
import { LocaleBand } from '../components/ui/LocaleBand';
import usePageMeta from '../lib/usePageMeta';
import {
  PROVENANCE,
  AFRICAN_LANGUAGES_DELIVERED,
  LOCALES_DELIVERED,
  TRACK_RECORD,
  CASE_STUDIES,
  OPERATING_MODEL,
  COMPANY,
} from '../data/company';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { SpecTable } from '../components/ui/SpecTable';
import { ButtonLink } from '../components/ui/Button';

const DISCIPLINE_ICONS = {
  Speech: AudioLines,
  Vision: Camera,
  'Text & safety': Sparkles,
};

const PeskayaLanding = () => {
  usePageMeta({
    title: 'Managed Data Teams for Multilingual AI | Peskaya',
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
      icon: Users,
      title: 'Teams assembled per project',
      description:
        'We staff each engagement ourselves, from ten contributors on a focused batch to 150 at peak. The roster grows or shrinks with your volume.',
    },
    {
      icon: ShieldCheck,
      title: 'QA built into delivery',
      description:
        'Contributor training and certification, spot checks during collection, peer review, and a final pass before anything ships to you.',
    },
    {
      icon: FileSignature,
      title: 'One supplier, whole workforce',
      description:
        'We handle recruitment, contracts, payment and day-to-day support for every contributor. You manage one relationship instead of a hundred and fifty.',
    },
  ];

  const assurances = [
    'We only take work we can staff to standard, and say so at scoping when we cannot',
    'Batches are QA-ed against your spec by us, and reworked on our side before delivery',
    'Contributors recruited, contracted and paid by us directly',
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
              'https://www.peskaya.com/capabilities',
              'https://www.peskaya.com/company',
              'https://www.peskaya.com/jobs',
              'https://www.peskaya.com/contact',
            ],
          }),
        }}
      />

      <Navbar />

      {/* Hero */}
      <Section size="hero">
        <Container>
          <div className="grid md:grid-cols-12 gap-10 md:gap-8 md:items-center">
            <div className="md:col-span-7">
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

            <div className="hidden md:flex md:col-span-5 justify-center">
              <HeroSignal />
            </div>
          </div>

          <div className="mt-16 rounded-lg border border-ink-200 bg-white">
            <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-ink-200 [&>div]:p-6 lg:[&>div]:py-7">
              {TRACK_RECORD.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-display text-3xl lg:text-4xl font-semibold text-ink-950 tracking-tight">
                    {item.value}
                  </dd>
                  <dd className="mt-1.5 text-sm text-ink-500 leading-relaxed">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
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
                lede="Based in Nairobi, recruiting across Africa. You get a named team for your project and one supplier accountable for what it delivers."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-ink-200 bg-white px-6 [&_dl>div:first-child]:pt-0 [&_dl>div:last-child]:pb-0 py-2">
                <SpecTable
                  rows={OPERATING_MODEL.map((item) => ({
                    label: item.label,
                    value: item.value,
                    detail: item.detail,
                  }))}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What you get */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="Two lanes, one supplier"
            lede="Hand us either kind of work without onboarding a second vendor."
          />

          <div className="mt-14">
            <TwoLanes
              lanes={[
                {
                  eyebrow: 'Lane one',
                  title: 'English-language work at volume',
                  items: [
                    'Annotation, grading and relevance work',
                    'Transcription and segmentation',
                    'RLHF, prompt and response authoring',
                    'Content moderation and policy classification',
                  ],
                },
                {
                  eyebrow: 'Lane two',
                  title: 'Native-speaker African language work',
                  items: [
                    'Swahili and Hausa delivered to date',
                    'Other locales on a recruitment round',
                    'Speech collection and transcription',
                    'Cultural context briefed per task',
                  ],
                },
              ]}
              outcome={{
                eyebrow: 'One contract',
                title: 'Peskaya recruits, contracts, pays and QAs the team',
                description:
                  'You manage one supplier and receive one invoice. We stay accountable for what the team delivers.',
              }}
            />
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {capabilities.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-lg border border-ink-200 bg-white p-6"
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent-50">
                    <Icon size={18} className="text-accent-600" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-ink-950 mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Locale coverage */}
      <Section tone="accent">
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-200 mb-4">
              Coverage
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Locales we have delivered in
            </h2>
            <p className="text-lg text-accent-100 leading-relaxed">
              Shipped work, not a coverage claim. For anything outside this list we run a
              recruitment round and tell you what we can staff before you commit.
            </p>
          </div>

          <LocaleBand
            locales={LOCALES_DELIVERED}
            africanDelivered={AFRICAN_LANGUAGES_DELIVERED}
          />

          <div className="mt-10">
            <ButtonLink to="/capabilities#languages" variant="onDark">
              See the full language table
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Case studies */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Selected work"
            title="What we have delivered"
            lede="Three programmes, with the scope and volume we can evidence. Clients are under NDA and are not named."
          />

          <div className="mt-14 space-y-5">
            {CASE_STUDIES.map((study) => {
              const Icon = DISCIPLINE_ICONS[study.discipline] || Sparkles;
              const [headline, ...rest] = study.facts;
              return (
                <article
                  key={study.title}
                  className="rounded-lg border border-ink-200 bg-white p-6 lg:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-50">
                      <Icon size={17} className="text-accent-600" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
                      {study.discipline}
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
                    <div className="lg:col-span-5">
                      <h3 className="text-lg font-semibold text-ink-950 mb-3 leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-sm text-ink-600 leading-relaxed">{study.summary}</p>
                    </div>

                    <div className="lg:col-span-7">
                      {/* The strongest fact is the one a buyer scans for, so it
                          gets weight instead of sitting in a uniform list. */}
                      <div className="rounded-md bg-ink-50 px-5 py-4 mb-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                          {headline.label}
                        </div>
                        <div className="mt-1 font-display text-lg font-semibold text-ink-950 leading-snug">
                          {headline.value}
                        </div>
                      </div>

                      <dl className="divide-y divide-ink-100">
                        {rest.map((fact) => (
                          <div
                            key={fact.label}
                            className="py-3 grid sm:grid-cols-3 gap-1 sm:gap-6"
                          >
                            <dt className="text-sm font-medium text-ink-500">{fact.label}</dt>
                            <dd className="sm:col-span-2 text-sm text-ink-800 leading-relaxed">
                              {fact.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Provenance, after the evidence. Leading with the caveat buried the
              proof behind seventy words of disclaimer. */}
          <div className="mt-8 rounded-lg border border-ink-200 bg-ink-50 p-6">
            <h3 className="text-sm font-semibold text-ink-950 mb-2">
              Whose record this is
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              {PROVENANCE} We can describe scope, volume and duration under NDA.
            </p>
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
                {COMPANY.linkedin && (
                  <a
                    href={COMPANY.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
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

export default PeskayaLanding;

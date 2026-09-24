import React, { useState, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sendContactForm, buildMailtoFallback, CONTACT_EMAIL } from '../lib/contact';
import usePageMeta from '../lib/usePageMeta';
import { COMPANY } from '../data/company';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { SpecTable } from '../components/ui/SpecTable';
import { Button, ButtonLink } from '../components/ui/Button';

const fieldClasses =
  'w-full px-4 py-3 rounded-md border border-ink-300 text-ink-900 placeholder-ink-400 ' +
  'focus:outline-none focus:border-accent-600 focus:ring-1 focus:ring-accent-600 transition-colors';

const labelClasses = 'block text-sm font-medium text-ink-700 mb-2';

const ContactPage = () => {
  usePageMeta({
    title: 'Contact: Scope a Data Project | SpherePulse',
    description:
      'Tell us the languages, volume and timeline you need. SpherePulse replies within one business day. Based in Nairobi, Kenya, delivering globally.',
    path: '/contact',
  });

  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, email, company, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendContactForm(formRef.current);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reachUs = [
    { label: 'Email', value: COMPANY.email },
    { label: 'LinkedIn', value: 'linkedin.com/company/spherepulse' },
    { label: 'Based in', value: `${COMPANY.city}, ${COMPANY.country}` },
    { label: 'Working hours', value: '9:00–18:00 EAT', detail: 'Monday to Friday' },
  ];

  const whatHappens = [
    {
      label: 'Within 1 business day',
      value: 'We reply',
      detail: 'A real answer about whether we can staff it, not an acknowledgement.',
    },
    {
      label: 'Within a week',
      value: 'Staffing plan and quote',
      detail: 'What we can recruit per locale, at what volume, over what timeline.',
    },
    {
      label: 'Before volume',
      value: 'A paid pilot batch',
      detail: 'You check quality against your own acceptance criteria first.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact - SpherePulse',
            url: 'https://www.spherepulseapp.com/contact',
            description:
              'Contact SpherePulse for inquiries about services, partnerships, or support.',
          }),
        }}
      />

      <Navbar />

      {/* Hero */}
      <Section size="hero" tone="dark">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="dark">Contact</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              Tell us what you need staffed
            </h1>
            <p className="mt-8 text-xl text-ink-300 leading-relaxed">
              Send the languages, volume and timeline. We come back with what we can
              recruit and at what rate, or tell you plainly that we cannot.
            </p>
          </div>
        </Container>
      </Section>

      {/* Form + details */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-14">
            {/* Form */}
            <div className="lg:col-span-7" id="contact-form">
              <h2 className="text-2xl font-semibold text-ink-950 mb-2">Send a message</h2>
              <p className="text-ink-600 mb-8">
                The more specific the locales and volumes, the more useful our reply.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-8 border border-green-300 bg-green-50 rounded-md p-5 flex gap-4">
                  <Check className="text-green-700 shrink-0 mt-0.5" size={20} />
                  <div>
                    <div className="font-semibold text-green-900">Message sent</div>
                    <div className="text-green-800 text-sm mt-1">
                      We reply within one business day.
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 border border-red-300 bg-red-50 rounded-md p-5">
                  <div className="font-semibold text-red-900">Something went wrong</div>
                  <div className="text-red-800 text-sm mt-1">
                    Please try again, or{' '}
                    <a
                      href={buildMailtoFallback(formData)}
                      className="underline font-medium"
                    >
                      send this message by email instead
                    </a>
                    . You can also write to {CONTACT_EMAIL} directly.
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Name <span className="text-ink-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                      className={fieldClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Work email <span className="text-ink-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                      className={fieldClasses}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="company" className={labelClasses}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    className={fieldClasses}
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className={labelClasses}>
                    Languages, volume and timeline{' '}
                    <span className="text-ink-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    placeholder="e.g. 40 hours of conversational Swahili audio with transcripts, native speakers in Kenya, delivered over six weeks."
                    rows="7"
                    required
                    className={`${fieldClasses} resize-y`}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  loading={isSubmitting}
                  className="mt-7 w-full sm:w-auto"
                >
                  {isSubmitting ? 'Sending' : 'Send message'}
                </Button>

                <p className="mt-4 text-sm text-ink-500 leading-relaxed">
                  Please don&apos;t send confidential information or sample data through
                  this form. Ask us for an NDA first and we will sign one.
                </p>
              </form>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 space-y-12">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 mb-2">
                    Reach us directly
                  </h2>
                  <SpecTable rows={reachUs} />
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={'mailto:' + COMPANY.email} variant="secondary">
                      Email us
                    </ButtonLink>
                    <ButtonLink
                      href={COMPANY.linkedin}
                      variant="secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </ButtonLink>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 mb-2">
                    What happens next
                  </h2>
                  <SpecTable rows={whatHappens} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Procurement pointer */}
      <Section tone="muted" size="compact">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <SectionHeading
              title="Running supplier diligence?"
              lede="Entity details, workforce contracts, data protection posture and commercial terms are set out on the company page. Send us your questionnaire and we will return it completed within one business day."
              className="mb-0"
            />
            <div className="flex flex-wrap gap-3 shrink-0">
              <ButtonLink to="/company" variant="secondary">
                Company &amp; compliance
                <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink to="/capabilities#faq" variant="secondary">
                FAQs
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ContactPage;

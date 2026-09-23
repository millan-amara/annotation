import React, { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { sendContactForm, buildMailtoFallback, CONTACT_EMAIL } from '../lib/contact';
import { Button } from './ui/Button';

const EMPTY = { name: '', email: '', company: '', message: '' };

const fieldClasses =
  'w-full px-4 py-3 rounded-md bg-white/5 border border-white/15 text-white placeholder-ink-400 ' +
  'focus:outline-none focus:border-accent-300 focus:ring-1 focus:ring-accent-300 transition-colors';

const labelClasses = 'block text-sm font-medium text-ink-300 mb-2';

/**
 * Short enquiry form for the homepage contact band. Submits through the same
 * EmailJS pipeline as the full form on /contact. Styled for a dark surface.
 */
function QuickContactForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      await sendContactForm(formRef.current);
      setStatus('success');
      setFormData(EMPTY);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-white/15 rounded-lg p-8">
        <Check className="w-8 h-8 text-accent-300 mb-4" />
        <div className="text-xl font-semibold text-white mb-2">Message received</div>
        <p className="text-ink-300 leading-relaxed">
          We reply within one business day. If it is urgent, email {CONTACT_EMAIL}.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qc-name" className={labelClasses}>
            Name
          </label>
          <input
            id="qc-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="qc-email" className={labelClasses}>
            Work email
          </label>
          <input
            id="qc-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="qc-company" className={labelClasses}>
          Company
        </label>
        <input
          id="qc-company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={fieldClasses}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="qc-message" className={labelClasses}>
          Languages, volume and timeline
        </label>
        <textarea
          id="qc-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          className={fieldClasses}
        />
      </div>

      {status === 'error' && (
        <div className="mt-5 text-sm text-red-300 border border-red-400/40 bg-red-500/10 rounded-md px-4 py-3">
          Something went wrong.{' '}
          <a href={buildMailtoFallback(formData)} className="underline font-medium">
            Send it by email instead
          </a>{' '}
          or write to {CONTACT_EMAIL}.
        </div>
      )}

      <Button
        type="submit"
        variant="onDark"
        size="lg"
        loading={isSubmitting}
        className="mt-6 w-full sm:w-auto"
      >
        {isSubmitting ? 'Sending' : 'Send message'}
      </Button>
    </form>
  );
}

export default QuickContactForm;

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import usePageMeta from '../lib/usePageMeta';
import { X, Check, ArrowRight, ChevronRight } from 'lucide-react';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { SpecTable } from '../components/ui/SpecTable';
import { ButtonLink } from '../components/ui/Button';


const JobsPage = () => {
  usePageMeta({
    title: 'Open Roles — Remote Data Collection & Annotation | SpherePulse',
    description:
      'Paid remote roles in data collection, annotation and transcription across multiple languages and countries. Apply to join the SpherePulse contributor network.',
    path: '/jobs',
  });

  const jobs = [
    {
      id: 6,
      title: "Grading & Annotation Data project",
      type: "Annotation",
      location: "Remote",
      languages: [
        "English (Australia) — en_AU",
        "Finnish (Finland) — fi_FI",
        "Spanish (Mexico) — es_MX",
        "French (Canada) — fr_CA",
        "Hebrew (Israel) — he_IL",
        "Hindi (India – Devanagari) — hi_IN",
        "Hindi (Latin / Hinglish) — hi_Latn",
        "Japanese (Japan) — ja_JP",
        "Korean (South Korea) — ko_KR",
        "Malay (Malaysia) — ms_MY",
        "Polish (Poland) — pl_PL",
        "Russian (Russia) — ru_RU",
        "Thai (Thailand) — th_TH",
        "Chinese (Simplified, Mainland China) — zh_CN",
        "Norwegian (Norway) — no_NO",
        "Danish (Denmark) — da_DK",
        "English (United States) — en_US",
        "English (United Kingdom) — en_GB",
        "French (France) — fr_FR",
        "Spanish (Spain) — es_ES",
        "German (Germany) — de_DE",
        "Swahili (East Africa) — sw_KE",
        "Italian (Italy) — it_IT",
        "Portuguese (Brazil) — pt_BR",
        "Arabic (Modern Standard) — ar",
        "Dutch (Netherlands) — nl_NL"
      ],
      compensation: "$10-24/hour",
      duration: "Long-term",
      requirements: [
        "Minimum availability of 20–30 hours per week",
        "Complete a few paid tests",
        "Be physically based in the desired country",
      ],
      description: "The project involves grading and annotating various data types to enhance AI model performance across multiple languages.",
      benefits: [
        "Quick submission process",
        "Priority access to future projects",
        "Flexible participation schedule"
      ],
      applyLink: "https://forms.gle/xt56bQydaCDEmkpE6"
    },
    {
      id: 7,
      title: "Transcription x Segmentation",
      type: "Audio Annotation",
      location: "Remote",
      languages: [
        "Arabic",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Finnish",
        "French",
        "German",
        "Hindi",
        "Indonesian",
        "Italian",
        "Japanese",
        "Mandarin Chinese (Simplified)",
        "Norwegian",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Spanish",
        "Swahili",
        "Swedish",
        "Thai",
        "Turkish",
        "Hungarian",
        "Korean",
        "Vietnamese"
      ],
      compensation: "$10-24/hour",
      duration: "Long-term",
      requirements: [
        "Minimum availability of 20–30 hours per week",
      ],
      description: "This project focuses on enhancing AI capabilities in understanding diverse accents and speech patterns across multiple languages.",
      benefits: [
        "Quick submission process",
        "Priority access to future projects",
        "Flexible participation schedule"
      ],
      applyLink: "https://forms.gle/Tx8jhgbZuCpsKsN79"
    },
    {
      id: 5,
      title: "Restaurant Menu Image Collection",
      type: "Data Collection",
      location: "Remote",
      countries: ["Arabic", "German", "Russian", "French", "Spanish", "Italian", "Indonesian"],
      compensation: "$12-18/hour",
      duration: "Ongoing",
      requirements: [
        "Quality photos of restaurant menus",
        "Use of smartphone camera",
        "Follow submission guidelines",
      ],
      description: "Collect menu photos to train AI models for diverse restaurant applications. Participants use their smartphone cameras to capture high-quality images of menus from various restaurants in specified languages.",
      benefits: [
        "Quick submission process",
        "Priority access to future projects",
        "Flexible participation schedule"
      ],
      applyLink: "https://forms.gle/nUN9FeXGgiZWQMDy5"
    },
    {
      id: 1,
      title: "Selfie Photo Collection",
      type: "Data Collection",
      location: "Remote",
      countries: ["South Africa", "Mexico", "US", "Canada", "India", "Japan"],
      compensation: "$20 per submission",
      duration: "Ongoing",
      requirements: [
        "Access to iPhone or iPad device",
        "Submit minimum of 9 high-quality selfie photos",
        "Follow photo submission guidelines",
        "Must be 18 years or older"
      ],
      description: "Help improve AI facial recognition systems by submitting selfie image data. Each participant submits a minimum of 9 photos taken using an iPhone or iPad.",
      benefits: [
        "Quick submission process",
        "Priority access to future projects",
        "Flexible participation schedule"
      ],
      applyLink: "https://forms.gle/aypcdEJLNAmzi2RP9"
    },
    {
      id: 2,
      title: "Data Annotation Specialist",
      type: "Annotation",
      location: "Remote",
      countries: ["Global", "English Required"],
      compensation: "$12-18/hour",
      duration: "Contract",
      requirements: [
        "Fluent in English (written and spoken)",
        "Strong attention to detail",
        "Reliable internet connection",
        "Available 15+ hours per week"
      ],
      description: "Annotate and label diverse datasets including images, text, and audio to train machine learning models. Work on projects spanning computer vision, NLP, and speech recognition.",
      benefits: [
        "Flexible working hours",
        "Performance-based bonuses",
        "Training provided"
      ],
      applyLink: "https://forms.gle/aypcdEJLNAmzi2RP9"
    },
    {
      id: 3,
      title: "Voice Recording Contributor",
      type: "Audio Collection",
      location: "Remote",
      countries: ["Africa", "Asia", "Latin America"],
      compensation: "$15-25 per session",
      duration: "Project-based",
      requirements: [
        "Native speaker of target language",
        "Quiet recording environment",
        "Clear speech with authentic accent",
        "Complete 100+ utterances per session"
      ],
      description: "Record voice samples in your native language to help build diverse speech recognition datasets. We're especially seeking contributors from underrepresented regions and languages.",
      benefits: [
        "Multiple language bonuses available",
        "Recurring opportunities",
        "Contribute to language preservation"
      ],
      applyLink: "https://forms.gle/aypcdEJLNAmzi2RP9"
    },
    {
      id: 4,
      title: "iPhone Sensor Data Collection",
      type: "Data Collection",
      location: "Remote",
      countries: ["Global"],
      compensation: "$30 per task",
      duration: "Ongoing",
      requirements: [
        "iPhone 12 or newer model",
        "Willingness to complete specific movement tasks",
        "Follow data collection protocols",
        "Submit data within 48 hours"
      ],
      description: "Collect sensor data from iPhone devices to improve motion detection and environmental awareness AI models. Tasks involve recording various movement patterns and environmental conditions.",
      benefits: [
        "Higher pay for complex tasks",
        "Detailed task instructions",
        "Quick approval process"
      ],
      applyLink: "https://forms.gle/aypcdEJLNAmzi2RP9"
    }
  ];

  const [selectedJob, setSelectedJob] = useState(null);

  const JobRow = ({ job }) => {
    const list = job.countries ?? job.languages ?? [];
    const coverage = list.length
      ? list[0] + (list.length > 1 ? ` +${list.length - 1} more` : '')
      : job.location;

    return (
      <button
        type="button"
        onClick={() => setSelectedJob(job)}
        className="w-full text-left p-6 bg-white hover:bg-ink-50 transition-colors grid md:grid-cols-12 gap-4 md:gap-6 md:items-center group"
      >
        <div className="md:col-span-5">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-600 mb-1.5">
            {job.type}
          </div>
          <h3 className="text-lg font-semibold text-ink-950 leading-snug">{job.title}</h3>
        </div>
        <div className="md:col-span-3 text-sm text-ink-600">{coverage}</div>
        <div className="md:col-span-2 text-sm text-ink-600 tabular-nums">
          {job.compensation}
        </div>
        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 text-sm text-ink-600">
          <span>{job.duration}</span>
          <ChevronRight
            size={18}
            className="text-ink-400 group-hover:text-accent-600 transition-colors shrink-0"
          />
        </div>
      </button>
    );
  };

  const JobDetailModal = ({ job, onClose }) => {
    useEffect(() => {
      const onKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', onKeyDown);
      // Stop the page behind the dialog scrolling with it.
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    }, [onClose]);

    return (
    <div
      className="fixed inset-0 bg-ink-950/60 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={job.title}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-ink-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-ink-200 px-8 py-6 flex items-start justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-600 mb-2">
              {job.type}
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink-950">{job.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 hover:text-ink-700 transition-colors shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-8 py-8 space-y-10">
          <p className="text-lg text-ink-700 leading-relaxed">{job.description}</p>

          <SpecTable
            rows={[
              { label: 'Location', value: job.location },
              { label: 'Compensation', value: job.compensation },
              { label: 'Duration', value: job.duration },
            ]}
          />

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 mb-4">
              Available in
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {(job.countries ?? job.languages ?? []).map((item, idx) => (
                <span key={idx} className="text-sm text-ink-700">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 mb-4">
              Requirements
            </h3>
            <ul className="space-y-3">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="text-accent-600 w-4 h-4 shrink-0 mt-1" />
                  <span className="text-ink-700 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 mb-4">
              What you get
            </h3>
            <ul className="space-y-3">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="text-accent-600 w-4 h-4 shrink-0 mt-1" />
                  <span className="text-ink-700 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-ink-200">
            <ButtonLink
              href={job.applyLink}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full sm:w-auto"
            >
              Apply for this role
              <ArrowRight size={18} />
            </ButtonLink>
            <p className="text-sm text-ink-500 mt-4">
              Applications are usually reviewed within two business days. We never charge a
              fee to apply.
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Jobs - SpherePulse",
            "url": "https://www.spherepulseapp.com/jobs",
            "description": "View career opportunities at SpherePulse and join a growing team building modern AI-powered solutions."
          }
        ) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.spherepulseapp.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Jobs",
                "item": "https://www.spherepulseapp.com/jobs"
              }
            ]
          }
        ) }}
      />

      <Navbar />

      {/* Hero */}
      <Section size="hero" tone="dark">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="dark">Work with us</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              Open roles
            </h1>
            <p className="mt-8 text-xl text-ink-300 leading-relaxed">
              Paid remote work in data collection, annotation and transcription. You are
              contracted and paid by us directly, and we never charge a fee to apply.
            </p>
          </div>
        </Container>
      </Section>

      {/* Roles */}
      <Section>
        <Container>
          <SectionHeading
            title="Current openings"
            lede="Select a role for full requirements and the application link."
          />

          <div className="mt-10 border border-ink-200 rounded-lg divide-y divide-ink-200 overflow-hidden">
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        </Container>
      </Section>

      {/* General application */}
      <Section tone="muted" size="compact">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <SectionHeading
              title="Nothing matching your language?"
              lede="We open new locales whenever a client project needs them. Register your languages and country and we will contact you when something fits."
              className="mb-0"
            />
            <ButtonLink
              href="https://forms.gle/aypcdEJLNAmzi2RP9"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Register your languages
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <Footer />

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default JobsPage;
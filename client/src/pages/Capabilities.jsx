import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { BreadcrumbJsonLd } from '../components/StructuredData';
import Footer from '../components/Footer';
import usePageMeta from '../lib/usePageMeta';
import {
  COMPLIANCE,
  COMPANY,
  ACCEPTANCE,
  AFRICAN_LANGUAGES_DELIVERED,
} from '../data/company';
import { Container, Section, SectionHeading, Eyebrow } from '../components/ui/Layout';
import { ProcessFlow, QualityGate } from '../components/ui/ProcessFlow';
import { ButtonLink } from '../components/ui/Button';
import {
  Image,
  Mic,
  FileText,
  Database,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AudioLines,
  Search,
  ShieldCheck,
  Sparkles,
  Camera,
  ScanLine,
} from 'lucide-react';


const CapabilitiesPage = () => {
  usePageMeta({
    title: 'Capabilities: Speech, Image and Text Data | Peskaya',
    description:
      'Data modalities we deliver: speech collection and transcription, image and video annotation, text and NLP annotation, and multimodal datasets, with African language coverage and multi-tier QA.',
    path: '/capabilities',
  });

  const [expandedFaq, setExpandedFaq] = useState(null);

  const dataModalities = [
    {
      icon: Image,
      title: "Computer Vision",
      description: "Image and video annotation for object detection, segmentation, and classification",
      capabilities: [
        "2D/3D bounding boxes",
        "Semantic segmentation",
        "Pose estimation",
        "OCR and document digitization",
        "Object and product image collection to spec",
        "In-the-wild image capture to spec"
      ],
      color: "bg-accent-50 text-accent-600"
    },
    {
      icon: Mic,
      title: "Speech & Audio",
      description: "Voice data collection and transcription, with native-speaker recruitment per language and dialect",
      capabilities: [
        "Native speaker recordings",
        "Accent and dialect diversity",
        "Transcription and alignment",
        "Speaker diarization",
        "Emotion and sentiment tagging",
        "Background noise variation"
      ],
      color: "bg-accent-50 text-accent-600"
    },
    {
      icon: FileText,
      title: "Natural Language",
      description: "Text annotation and linguistic analysis for NLP model training",
      capabilities: [
        "Named entity recognition",
        "Sentiment analysis",
        "Intent classification",
        "Text summarization",
        "Translation and localization",
        "Conversational AI datasets"
      ],
      color: "bg-accent-50 text-accent-600"
    },
    {
      icon: Database,
      title: "Multimodal Data",
      description: "Complex datasets combining vision, text and audio",
      capabilities: [
        "Video + audio synchronization",
        "Image captioning datasets",
        "Document understanding",
        "AR/VR training data",
        "Cross-modal alignment",
        "Cross-modal retrieval"
      ],
      color: "bg-accent-50 text-accent-600"
    }
  ];

  const africanExpertise = [
    {
      language: "Swahili",
      speakers: "200M+",
      regions: ["Kenya", "Tanzania", "Uganda", "DRC"]
    },
    {
      language: "Hausa",
      speakers: "80M+",
      regions: ["Nigeria", "Niger", "Ghana"]
    },
    {
      language: "Amharic",
      speakers: "60M+",
      regions: ["Ethiopia", "Eritrea"]
    },
    {
      language: "Yoruba",
      speakers: "50M+",
      regions: ["Nigeria", "Benin", "Togo"]
    },
    {
      language: "Oromo",
      speakers: "45M+",
      regions: ["Ethiopia", "Kenya"]
    },
    {
      language: "Igbo",
      speakers: "45M+",
      regions: ["Nigeria"]
    },
    {
      language: "Zulu",
      speakers: "28M+",
      regions: ["South Africa", "Zimbabwe"]
    },
    {
      language: "Shona",
      speakers: "17M+",
      regions: ["Zimbabwe", "Mozambique"]
    }
  ];

  const workflowSteps = [
    {
      title: "Scoping",
      description:
        "You send locales, volume and timeline. We come back with what we can staff and at what rate, or say we cannot.",
    },
    {
      title: "Recruitment",
      description:
        "We source native speakers for the locale and qualify them on a paid task against your guidelines. A few days to two weeks.",
    },
    {
      title: "Pilot batch",
      description:
        "A paid sample you check against your own acceptance criteria before any volume is committed.",
    },
    {
      title: "Delivery",
      description:
        "Collection or annotation runs, sampled in flight so drift is caught in days instead of at the end.",
    },
    {
      title: "Handover",
      description:
        "Batches ship in your format with documentation and a schema definition, and we rework anything that misses.",
    },
  ];

  const useCases = [
    {
      icon: AudioLines,
      title: "Speech recognition",
      description: "Native-speaker recordings, transcription and segmentation, including IPA-level phonetic work for pronunciation models."
    },
    {
      icon: Mic,
      title: "Voice assistants",
      description: "Speech datasets carrying authentic accents and dialects, so the assistant understands the people it ships to."
    },
    {
      icon: Search,
      title: "Search and recommendation",
      description: "Relevance grading and side-by-side comparison across multiple locales, scored against your rubric."
    },
    {
      icon: Sparkles,
      title: "Model alignment",
      description: "RLHF preference ranking, prompt and response authoring, and rubric-based grading by briefed reviewers."
    },
    {
      icon: ShieldCheck,
      title: "Trust and safety",
      description: "Content moderation and policy-violation classification, staffed on a rotation with cultural context briefed per queue."
    },
    {
      icon: ScanLine,
      title: "Document and object capture",
      description: "Structured image collection in the field: menus, signage, receipts, forms and product categories, with metadata captured at source."
    }
  ];

  const qualitySteps = [
    {
      step: "01",
      metric: "Qualification",
      description: "Every contributor passes a paid qualification task against your guidelines before joining the roster."
    },
    {
      step: "02",
      metric: "In-flight sampling",
      description: "Work is sampled while collection is running, not only at the end, so drift is caught in days rather than at delivery."
    },
    {
      step: "03",
      metric: "Peer review",
      description: "A second qualified contributor reviews sampled output, and disagreements are escalated to the project lead."
    },
    {
      step: "04",
      metric: "Final pass",
      description: "We check the batch against your spec and rework anything that misses it before it reaches you."
    }
  ];

  const faqs = [
    {
      question: "Which languages can you actually staff?",
      answer: "Our base is East Africa, so Swahili and the major Kenyan, Tanzanian and Ugandan languages source fastest. We recruit native speakers, not translators. For anything outside that base we run a recruitment round and tell you what we can staff, at what volume, before you commit. If we cannot source a language to your standard, we say so."
    },
    {
      question: "Who employs the contributors?",
      answer: "We do. We recruit, contract, train and pay them directly, and handle day-to-day support. Every contributor signs confidentiality and IP assignment terms before touching project data. You contract one supplier and get one invoice."
    },
    {
      question: "What happens if a batch does not meet spec?",
      answer: ACCEPTANCE.qaGate + ' ' + ACCEPTANCE.selection
    },
    {
      question: "How do you ensure data quality?",
      answer: "Four checkpoints: a paid qualification task before anyone joins the roster, sampling during collection, peer review by a second qualified contributor, and a final pass against your spec. We report against your acceptance criteria on each batch and rework what misses."
    },
    {
      question: "What's your typical project timeline?",
      answer: "From a few days on a focused batch to a couple of months on a large programme, depending on volume and how hard the locale is to source. Recruiting and qualifying a team takes a few days to two weeks. You get a dated plan and a pilot batch before full delivery, so quality is checked early."
    },
    {
      question: "Do you handle personal data?",
      answer: `Yes, under documented consent. ${COMPLIANCE.gdpr} ${COMPLIANCE.kenya} ${COMPLIANCE.contracts} ${COMPLIANCE.notCertified} If your project requires a certification we do not hold, we will tell you rather than take the work.`
    },
    {
      question: "How large a project can you take on?",
      answer: "Teams have run from ten contributors on a focused batch up to 150 on a single project, across roughly 20,000 audio hours and over 100,000 collected items since 2017. For a new locale we start with a pilot and scale from there, because we will not promise a headcount we have not recruited. Ask for a reference on a comparable project and we will put you in touch."
    },
    {
      question: "What data formats do you deliver?",
      answer: "JSON, CSV, XML, COCO, Pascal VOC, YOLO and custom schemas. Audio as WAV, FLAC or MP3 with timestamps; images as JPEG or PNG with metadata. Everything ships with documentation and a schema definition. Send us your pipeline spec and we will match it."
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      <BreadcrumbJsonLd trail={[{ name: 'Capabilities', path: '/capabilities' }]} />

      <Navbar />

      {/* Hero Section */}
      <Section size="hero" tone="dark">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="dark">Capabilities</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-[1.05]">
              What we collect, annotate and deliver
            </h1>
            <p className="text-xl text-ink-300 mb-8 leading-relaxed max-w-2xl">
              The data types we handle, the languages we recruit for, how a project runs,
              and how quality is controlled at each stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonLink to="/contact" size="lg">
                Discuss your project
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="#workflow" variant="ghostOnDark" size="lg">
                See the process
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Data modalities */}
      <Section id="data-types" tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Data types"
            title="What we collect and annotate"
            lede="Four modalities, and the specific tasks we staff within each."
          />

          <div className="mt-12 divide-y divide-ink-300 border-t border-ink-300">
            {dataModalities.map((modality, idx) => {
              const Icon = modality.icon;
              return (
                <div
                  key={idx}
                  className="py-10 grid md:grid-cols-12 gap-6 md:gap-10"
                >
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={20} className="text-accent-600 shrink-0" />
                      <h3 className="text-lg font-semibold text-ink-950">
                        {modality.title}
                      </h3>
                    </div>
                    <p className="text-ink-600 leading-relaxed">
                      {modality.description}
                    </p>
                  </div>
                  <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 md:pt-1">
                    {modality.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-start gap-2.5">
                        <span className="text-accent-600 mt-2 h-1 w-1 rounded-full bg-accent-600 shrink-0" />
                        <span className="text-ink-700 text-sm leading-relaxed">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Languages we recruit for */}
      <Section id="languages" tone="accent">
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-200 mb-4">
              Languages
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              African languages we recruit for
            </h2>
            <p className="text-lg text-accent-100 leading-relaxed">
              Native speakers, authentic accents and cultural context for underrepresented
              languages. The table separates what we have already delivered in from what we
              would run a recruitment round for. We confirm what we can staff, and at what
              volume, before you commit.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/25">
                  <th scope="col" className="py-3 pr-6 text-xs font-semibold uppercase tracking-[0.12em] text-accent-200">
                    Language
                  </th>
                  <th scope="col" className="py-3 pr-6 text-xs font-semibold uppercase tracking-[0.12em] text-accent-200 whitespace-nowrap">
                    Speakers
                  </th>
                  <th scope="col" className="py-3 pr-6 text-xs font-semibold uppercase tracking-[0.12em] text-accent-200">
                    Spoken in
                  </th>
                  <th scope="col" className="py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-200 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/15">
                {africanExpertise.map((lang) => (
                  <tr key={lang.language}>
                    <th scope="row" className="py-4 pr-6 font-display text-base font-semibold text-white align-top">
                      {lang.language}
                    </th>
                    <td className="py-4 pr-6 text-sm text-accent-100 tabular-nums align-top whitespace-nowrap">
                      {lang.speakers}
                    </td>
                    <td className="py-4 pr-6 text-sm text-accent-100 align-top">
                      {lang.regions.join(', ')}
                    </td>
                    <td className="py-4 text-sm align-top whitespace-nowrap">
                      {AFRICAN_LANGUAGES_DELIVERED.includes(lang.language) ? (
                        <span className="text-white font-medium">Delivered</span>
                      ) : (
                        <span className="text-accent-200">Recruit on request</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 max-w-2xl">
            <p className="text-accent-100 leading-relaxed mb-6">
              We also recruit for French, Arabic and Portuguese, and for languages outside
              this list on request. Tell us the locale and we will come back with what we
              can staff, at what volume, and how long recruitment will take.
            </p>
            <ButtonLink href="#contact" variant="onDark">
              Ask about a language
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section id="workflow">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="How a project runs"
            lede="Five stages from first call to delivered dataset."
          />
          <div className="mt-14">
            <ProcessFlow steps={workflowSteps} />
          </div>
        </Container>
      </Section>

      {/* Use Cases */}
      <Section id="applications" tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Applications"
            title="Where this work is used"
            lede="Project types we have delivered or can staff for."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="rounded-lg border border-ink-200 bg-white p-6"
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent-50">
                    <Icon size={18} className="text-accent-600" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-ink-950 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Quality */}
      <Section id="quality" tone="dark">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Quality"
            title="How quality is controlled"
            lede="Four checkpoints between a contributor and your dataset."
          />

          <div className="mt-14">
            <QualityGate
              steps={qualitySteps.map((item) => ({
                title: item.metric,
                description: item.description,
              }))}
              outcome="Anything that misses your spec goes back through the checkpoints before the batch ships. You see the result, not the rework."
            />
          </div>

          <p className="max-w-3xl mt-12 text-ink-400 leading-relaxed">
            We report against your acceptance criteria on every batch, and we would
            decline a project at scoping before delivering one we cannot staff to the
            standard it needs.
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked"
            lede="The things buyers ask before scoping a project."
          />

          <div className="mt-12 border-t border-ink-200">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border-b border-ink-200">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full py-5 flex items-start justify-between gap-6 text-left group"
                  >
                    <span className="font-display text-lg font-semibold text-ink-950 group-hover:text-accent-600 transition-colors">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="text-accent-600 shrink-0 mt-1" size={20} />
                    ) : (
                      <ChevronDown className="text-ink-400 shrink-0 mt-1" size={20} />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-10 text-ink-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact" tone="accent">
        <Container>
          <div className="grid md:grid-cols-12 gap-10 md:items-end">
            <div className="md:col-span-7">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-200 mb-4">
                Next step
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Send us a locale and a volume
              </h2>
              <p className="text-lg text-accent-100 leading-relaxed">
                We reply within one business day with what we can staff, how long
                recruitment takes, and what it costs. If we cannot do it, we say so.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
              <ButtonLink to="/contact" variant="onDark" size="lg">
                Start a project
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink
                href={'mailto:' + COMPANY.email}
                variant="ghostOnDark"
                size="lg"
              >
                Email us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CapabilitiesPage;
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Menu, X, Database, Mic, Image, FileText, Globe, Shield, Zap, Users, CheckCircle, ArrowRight, ChevronDown, ChevronUp, Target, Workflow, Brain, Languages } from 'lucide-react';


const CapabilitiesPage = () => {
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
        "Facial recognition datasets",
        "Medical imaging annotation"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mic,
      title: "Speech & Audio",
      description: "Voice data collection and transcription across 25+ languages and dialects",
      capabilities: [
        "Native speaker recordings",
        "Accent and dialect diversity",
        "Transcription and alignment",
        "Speaker diarization",
        "Emotion and sentiment tagging",
        "Background noise variation"
      ],
      color: "from-purple-500 to-pink-500"
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
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Database,
      title: "Multimodal Data",
      description: "Complex datasets combining vision, text, audio, and sensor data",
      capabilities: [
        "Video + audio synchronization",
        "Image captioning datasets",
        "Document understanding",
        "AR/VR training data",
        "Sensor fusion datasets",
        "Cross-modal retrieval"
      ],
      color: "from-orange-500 to-red-500"
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
      number: "01",
      title: "Consultation & Scoping",
      description: "We analyze your AI model requirements and design a custom data collection and annotation strategy.",
      icon: Target
    },
    {
      number: "02",
      title: "Team Assembly",
      description: "We recruit and train specialized teams matched to your project's language, domain, and quality standards.",
      icon: Users
    },
    {
      number: "03",
      title: "Data Collection",
      description: "Our global network collects diverse, representative data following strict protocols and ethical guidelines.",
      icon: Database
    },
    {
      number: "04",
      title: "Quality Assurance",
      description: "Multi-tier validation ensures accuracy, consistency, and compliance with your specifications.",
      icon: Shield
    },
    {
      number: "05",
      title: "Delivery & Iteration",
      description: "Version-controlled datasets delivered in your preferred format, with ongoing support for refinements.",
      icon: Zap
    }
  ];

  const useCases = [
    {
      title: "Autonomous Vehicles",
      description: "LiDAR annotation, road scene understanding, and pedestrian detection across diverse African and global environments."
    },
    {
      title: "Voice Assistants",
      description: "Natural speech datasets with authentic accents and dialects for inclusive voice AI systems."
    },
    {
      title: "Content Moderation",
      description: "Cultural context-aware annotation for social media, e-commerce, and digital platform safety."
    },
    {
      title: "Healthcare AI",
      description: "Medical imaging annotation and clinical text processing with HIPAA-compliant workflows."
    },
    {
      title: "Financial Services",
      description: "Document digitization, fraud detection datasets, and multilingual customer interaction data."
    },
    {
      title: "E-commerce",
      description: "Product categorization, visual search training data, and multilingual product descriptions."
    }
  ];

  const qualityMetrics = [
    { metric: "Accuracy Rate", value: "98.5%", description: "Average annotation accuracy" },
    { metric: "Inter-Annotator Agreement", value: "95%+", description: "Consistency across teams" },
    { metric: "Delivery Time", value: "2-4 weeks", description: "Typical project turnaround" },
    { metric: "Data Coverage", value: "30+ countries", description: "Geographic diversity" }
  ];

  const faqs = [
    {
      question: "What makes your African language expertise unique?",
      answer: "We have native speakers and cultural experts for 25+ African languages, not just translators. Our teams understand local contexts, idioms, and cultural nuances that are critical for authentic AI training data. We're based in Africa with deep community connections, ensuring data authenticity and ethical collection practices."
    },
    {
      question: "How do you ensure data quality?",
      answer: "We implement multi-tier quality assurance: initial training and certification for all contributors, spot-checks during collection, peer review processes, automated validation tools, and final expert review. Every project includes inter-annotator agreement metrics and revision cycles until quality thresholds are met."
    },
    {
      question: "What's your typical project timeline?",
      answer: "Small projects (1,000-10,000 data points) typically take 1-2 weeks. Medium projects (10,000-100,000 points) take 2-4 weeks. Large-scale projects (100,000+ points) take 4-8 weeks. We can accelerate timelines by scaling our contributor network for urgent needs."
    },
    {
      question: "Do you handle sensitive or regulated data?",
      answer: "Yes. We have experience with HIPAA-compliant healthcare data, financial information under PCI-DSS, and PII under GDPR. We implement appropriate security measures, sign BAAs and NDAs, and can work within your existing compliance frameworks."
    },
    {
      question: "Can you scale for enterprise requirements?",
      answer: "Absolutely. Our network of 1,200+ contributors can scale to thousands for large projects. We've delivered projects ranging from 10,000 to 1M+ data points. Our infrastructure supports parallel workflows and we can onboard additional teams within days."
    },
    {
      question: "What data formats do you deliver?",
      answer: "We support all standard formats: JSON, CSV, XML, COCO, Pascal VOC, YOLO, TFRecord, and custom formats. For audio: WAV, FLAC, MP3 with timestamps. For images: JPEG, PNG with metadata. We also provide detailed documentation and schema definitions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Capabilities - SpherePulse",
            "url": "https://www.spherepulseapp.com/capabilities",
            "description": "Explore SpherePulse's capabilities in AI, automation, systems integration, and enterprise solutions."
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
                "name": "Capabilities",
                "item": "https://www.spherepulseapp.com/capabilities"
              }
            ] 
          }
        ) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Brain className="inline w-4 h-4 mr-2" />
              Enterprise AI Infrastructure
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              World-Class Data Operations for AI Excellence
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We combine technical expertise, cultural understanding, and operational scale to deliver the training data that powers breakthrough AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition shadow-lg inline-flex items-center justify-center gap-2"
              >
                Discuss Your Project
                <ArrowRight size={20} />
              </a>
              <a 
                href="#workflow" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                See Our Process
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Data Modalities */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Data Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From computer vision to NLP to multimodal datasets—we handle the full spectrum of AI training data needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataModalities.map((modality, idx) => {
              const Icon = modality.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-200"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${modality.color} flex items-center justify-center mb-6`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {modality.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {modality.description}
                  </p>
                  <div className="space-y-2">
                    {modality.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* African Language Expertise */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Languages className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">
              Deep African Language Expertise
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Native speakers, authentic accents, and cultural context for underrepresented languages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {africanExpertise.map((lang, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition"
              >
                <h3 className="text-2xl font-bold mb-2">{lang.language}</h3>
                <div className="text-purple-200 text-sm mb-3">{lang.speakers} speakers</div>
                <div className="flex flex-wrap gap-2">
                  {lang.regions.map((region, rIdx) => (
                    <span 
                      key={rIdx}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-purple-100 mb-6">
              Plus: French, Arabic, Portuguese, and 15+ additional African languages
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Request Language Capabilities Sheet
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section id="workflow" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Workflow className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Proven Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach that ensures quality, speed, and scalability at every stage
            </p>
          </div>

          <div className="space-y-8">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx}
                  className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-6 md:w-1/3">
                    <div className="text-6xl font-bold text-purple-200">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted data infrastructure across diverse AI applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Shield className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-4xl font-bold mb-4">
              Quality You Can Measure
            </h2>
            <p className="text-xl text-gray-300">
              Transparent metrics that demonstrate our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {qualityMetrics.map((item, idx) => (
              <div 
                key={idx}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="text-5xl font-bold text-purple-400 mb-3">
                  {item.value}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {item.metric}
                </div>
                <div className="text-gray-400 text-sm">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about working with us
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="text-purple-600 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Better AI?
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Let's discuss how our data infrastructure can accelerate your AI initiatives
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="mailto:contact@spherepulseapp.com"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              contact@spherepulseapp.com
            </a>
            <a 
              href="https://www.linkedin.com/company/spherepulse"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition border-2 border-white/30"
            >
              Connect on LinkedIn
            </a>
          </div>

          <p className="text-purple-200">
            Typical response time: Within 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400 text-center border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} SpherePulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CapabilitiesPage;
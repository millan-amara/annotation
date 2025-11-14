import React, { useState } from 'react';
import { CheckCircle, Globe, Users, Database, Shield, ArrowRight, Menu, X, Mail, Linkedin } from 'lucide-react';
import Navbar from '../components/Navbar';

const FloatingOrb = ({ delay = 0, duration = 20, size = "large" }) => {
  const sizeClasses = {
    large: "w-96 h-96",
    medium: "w-64 h-64",
    small: "w-48 h-48"
  };
  
  return (
    <div 
      className={`absolute ${sizeClasses[size]} rounded-full blur-3xl opacity-20`}
      style={{
        background: `radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)`,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    />
  );
};

const SpherePulseLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: "Countries Covered", value: "30+", icon: Globe },
    { label: "Languages Supported", value: "25+", icon: Database },
    { label: "Contributors", value: "1,200+", icon: Users },
    { label: "Hours of Data", value: "50,000+", icon: Shield },
  ];

  const capabilities = [
    {
      title: "African Language Expertise",
      description: "Authentic datasets covering 25+ African languages with native speaker validation and cultural context."
    },
    {
      title: "Global Scale & Speed",
      description: "Remote and in-office networks across 30+ countries enable rapid scaling for time-sensitive projects."
    },
    {
      title: "Enterprise-Grade Quality",
      description: "Multi-tier QA workflows, version control, and validation protocols trusted by AI leaders."
    },
    {
      title: "Custom Data Pipelines",
      description: "Flexible infrastructure adapts to your specific requirements—vision, voice, text, or multimodal."
    }
  ];

  const openRoles = [
    { title: "Selfie Picture Collection", location: "Remote | Multiple", link: "https://forms.gle/aypcdEJLNAmzi2RP9" },
    { title: "Data Annotation Specialist", location: "Remote | English", link: "https://forms.gle/TVL776c9M1VtWE1k7" },
    { title: "iPhone Data Collection", location: "Remote | Global", link: "https://forms.gle/TVL776c9M1VtWE1k7" },
    { title: "Data Annotator - Maths", location: "Remote | Global", link: "https://forms.gle/TVL776c9M1VtWE1k7" },
  ];

  const trustedBy = [
    "Centific", "Hesai", "Mobvista", "Oppo", "Waymo"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SpherePulse",
            "url": "https://www.spherepulseapp.com",
            "logo": "https://www.spherepulseapp.com/logo.png"
          }

        ) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": ["Capabilities", "Jobs", "Contact", "Login"],
            "url": [
              "https://www.spherepulseapp.com/capabilities",
              "https://www.spherepulseapp.com/jobs",
              "https://www.spherepulseapp.com/contact",
              "https://www.spherepulseapp.com/login"
            ]
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
              }
            ]
          }
        ) }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(5deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
          75% { transform: translate(40px, 10px) rotate(3deg); }
        }
        
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-slide {
          animation: slideLeft 30s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-10 opacity-60">
          <FloatingOrb delay={0} size="large" />
        </div>
        <div className="absolute top-40 right-10 opacity-40">
          <FloatingOrb delay={3} size="medium" />
        </div>
        <div className="absolute bottom-20 left-1/3 opacity-50">
          <FloatingOrb delay={6} size="small" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            AI Training Data at Scale
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
              Structured Human Data
            </span>
            <br />
            <span className="text-gray-700">for Next-Gen AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            High-quality, AI-ready datasets with deep expertise in African languages, 
            accents, and contexts—delivered globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contact" 
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a 
              href="/capabilities" 
              className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition border-2 border-gray-200"
            >
              Explore Capabilities
            </a>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-wide">Trusted by Industry Leaders</p>
          <div className="overflow-hidden">
            <div className="flex gap-12 items-center animate-slide whitespace-nowrap">
              {[...trustedBy, ...trustedBy].map((company, idx) => (
                <span key={idx} className="text-2xl font-semibold text-gray-400">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Operating Across Continents
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Deep roots in Africa, global delivery capacity
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition"
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center max-w-3xl mx-auto text-gray-300 text-lg">
            We provide AI-ready datasets from across continents—specializing in authentic 
            African languages, voices, and environments, while maintaining global delivery capacity.
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Leading AI Companies Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade infrastructure built for human-in-the-loop AI at scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((item, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Differentiators */}
          <div className="mt-16 bg-gray-900 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Built for AI-Centric Teams
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Experienced team across diverse data modalities",
                "Rapid scaling through remote and in-office networks",
                "Proven track record with high-stakes datasets",
                "Strict QA workflows and version-controlled output"
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-purple-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-gray-300 text-lg">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Open Roles</h2>
              <p className="text-gray-600">Join our global contributor network</p>
            </div>
            <a 
              href="/jobs" 
              className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-full hover:border-purple-600 hover:text-purple-600 transition"
            >
              View All Roles
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {openRoles.map((role, idx) => (
              <a
                key={idx}
                href={role.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-lg transition group"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-purple-600">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{role.location}</p>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  Apply Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Better AI?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's discuss how our data infrastructure can accelerate your AI initiatives
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="mailto:contact@spherepulseapp.com"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              <Mail size={20} />
              contact@spherepulseapp.com
            </a>
            <a 
              href="https://www.linkedin.com/company/spherepulse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
            >
              <Linkedin size={20} />
              Connect on LinkedIn
            </a>
          </div>

          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea 
                placeholder="Tell us about your project..."
                rows="4"
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="w-full px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-gray-400 text-center border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} SpherePulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SpherePulseLanding;
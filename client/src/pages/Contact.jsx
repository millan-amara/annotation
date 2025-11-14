import React, { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
import Navbar from '../components/Navbar';
import { Mail, Linkedin, MapPin, Clock, Send, CheckCircle, MessageSquare, Phone } from 'lucide-react';


const ContactPage = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const { name, email, company, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const onSubmit = (e) => {
      e.preventDefault()
      emailjs.sendForm('service_pm4kpg1', 'template_qdgkji2', form.current, {
        publicKey: 'FfC2jgC2scsnjnV9p'
      })
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        })
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });    
    }


  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@spherepulseapp.com",
      description: "For general inquiries and project discussions",
      link: "mailto:contact@spherepulseapp.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      details: "Connect with our team",
      description: "For professional networking and updates",
      link: "https://www.linkedin.com/company/spherepulse",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Direct Message",
      details: "Quick response guaranteed",
      description: "For urgent project requirements",
      link: "#contact-form",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: "Nairobi, Kenya",
      description: "East Africa Hub"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "Monday - Friday"
    },
    {
      icon: Phone,
      title: "Availability",
      details: "9 AM - 6 PM EAT",
      description: "Global timezone support"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact - SpherePulse",
            "url": "https://www.spherepulseapp.com/contact",
            "description": "Contact SpherePulse for inquiries about services, partnerships, or support."
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
                "name": "Contact",
                "item": "https://www.spherepulseapp.com/contact"
              }
            ]
          }
        ) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <MessageSquare className="inline w-4 h-4 mr-2" />
            Let's Talk About Your AI Project
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Ready to build better AI? Whether you need custom datasets, have questions about our capabilities, or want to discuss a project—we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition group border border-gray-200"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                    {method.title}
                  </h3>
                  <div className="text-purple-600 font-semibold mb-2">
                    {method.details}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {method.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="contact-form" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <div className="font-semibold text-green-900">Message sent successfully!</div>
                    <div className="text-green-700 text-sm">We'll get back to you soon.</div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="font-semibold text-red-900">Something went wrong</div>
                  <div className="text-red-700 text-sm">Please try again or email us directly.</div>
                </div>
              )}

              <div ref={formRef}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={company}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows="6"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    onClick={onSubmit}
                    className="w-full py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-8">
              {/* Office Info Cards */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                {officeInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-purple-600" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            {info.title}
                          </h4>
                          <div className="text-purple-600 font-semibold mb-1">
                            {info.details}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Why Work With Us?
                </h3>
                <div className="space-y-3">
                  {[
                    "Expert consultation for your AI data needs",
                    "Flexible engagement models and pricing",
                    "Proven track record with enterprise clients",
                    "Deep African language and cultural expertise"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-purple-200 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-purple-50">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  By the Numbers
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "30+", label: "Countries" },
                    { value: "25+", label: "Languages" },
                    { value: "1,200+", label: "Contributors" },
                    { value: "24hrs", label: "Response Time" }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out our capabilities page for detailed information about our services, process, and frequently asked questions.
          </p>
          <a 
            href="/capabilities#faq"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition shadow-md"
          >
            View FAQs & Capabilities
            <Send size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400 text-center border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} SpherePulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
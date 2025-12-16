import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Menu, X, MapPin, Clock, DollarSign, Users, CheckCircle, ArrowRight, Briefcase } from 'lucide-react';


const JobsPage = () => {
  const jobs = [
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

  const JobCard = ({ job }) => (
    <div 
      className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => setSelectedJob(job)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
            {job.type}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
            {job.title}
          </h3>
        </div>
        <Briefcase className="text-gray-400 w-8 h-8" />
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={16} className="text-purple-500" />
          <span className="text-sm">{job.location} • {job.countries[0]}{job.countries.length > 1 ? ` +${job.countries.length - 1} more` : ''}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign size={16} className="text-purple-500" />
          <span className="text-sm">{job.compensation}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={16} className="text-purple-500" />
          <span className="text-sm">{job.duration}</span>
        </div>
      </div>

      <button className="w-full py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition group-hover:shadow-md flex items-center justify-center gap-2">
        View Details
        <ArrowRight size={18} />
      </button>
    </div>
  );

  const JobDetailModal = ({ job, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2">
              {job.type}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{job.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Key Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <MapPin className="text-purple-500 mb-2" size={20} />
              <div className="text-sm text-gray-500 mb-1">Location</div>
              <div className="font-semibold text-gray-900">{job.location}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <DollarSign className="text-purple-500 mb-2" size={20} />
              <div className="text-sm text-gray-500 mb-1">Compensation</div>
              <div className="font-semibold text-gray-900">{job.compensation}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Clock className="text-purple-500 mb-2" size={20} />
              <div className="text-sm text-gray-500 mb-1">Duration</div>
              <div className="font-semibold text-gray-900">{job.duration}</div>
            </div>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Available In</h3>
            <div className="flex flex-wrap gap-2">
              {job.countries.map((country, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
            <div className="space-y-2">
              {job.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-purple-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Benefits</h3>
            <div className="space-y-2">
              {job.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-4">
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              Apply Now
              <ArrowRight size={20} />
            </a>
            <p className="text-center text-gray-500 text-sm mt-3">
              Applications reviewed within 48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
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

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            <Users className="inline w-4 h-4 mr-2" />
            Join 1,200+ Contributors Worldwide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Open Opportunities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Shape the future of AI while earning competitive compensation. Flexible, remote work with projects that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-gray-300 text-sm">🌍 30+ Countries</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-gray-300 text-sm">💰 Competitive Pay</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-gray-300 text-sm">⚡ Quick Onboarding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Current Openings</h2>
            <p className="text-gray-600">Click on any position to view full details and requirements</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Don't See Your Role?</h3>
            <p className="text-lg mb-6 opacity-90">
              We're always looking for talented contributors. Send us your profile and we'll reach out when relevant opportunities arise.
            </p>
            <a
              href="https://forms.gle/aypcdEJLNAmzi2RP9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Submit General Application
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400 text-center border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} SpherePulse. All rights reserved.</p>
      </footer>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default JobsPage;
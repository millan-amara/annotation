import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

const FloatingShape = ({ className, style }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 blur-2xl ${className}`}
    style={style}
    animate={{ y: [0, 30, 0] }}
    transition={{ repeat: Infinity, duration: 10 }}
  />
);

const LandingPage = () => {
  useEffect(() => {
    document.title = "[Your Company Name] - AI Data Infrastructure";
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        <Navbar />
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/intelligence.svg"
          alt="AI tech illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Parallax Floating Shapes */}
        <FloatingShape className="w-72 h-72 bg-blue-400 left-10 top-20" />
        <FloatingShape className="w-56 h-56 bg-purple-500 right-10 bottom-32" />
        <FloatingShape className="w-48 h-48 bg-pink-500 left-1/3 top-1/4" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
              Powering the Next Generation of AI with Structured Human Data
            </h1>
            

            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              SpherePulse provides scalable human-in-the-loop solutions for AI development — from annotation to collection to transcription.
            </p>
            <button className="bg-white text-slate-950 px-8 py-3 text-lg rounded-2xl shadow-xl hover:bg-slate-200">
              Get in Touch
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 w-full text-center animate-bounce">
            <span className="text-white text-2xl">↓</span>
        </div>

      </section>

      <section className="scroll-container my-16 pb-12 w-full">
            <div className="carousel-primary flex h-24 justify-between">
                <img className="" src="/logos/centific.jpeg" alt="" />
                <img src="/logos/hesai.png" alt="" />
                <img src="/logos/mobvista.png" alt="" />
                <img className="" src="/logos/centific.jpeg" alt="" />
                <img src="/logos/hesai.png" alt="" />
                <img src="/logos/mobvista.png" alt="" />
            </div> 
      </section>


      {/* About Section */}
      <section className="bg-slate-900 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About SpherePulse</h2>
        <p className="max-w-3xl mx-auto text-gray-400 text-lg">
          Founded to bridge the gap between AI ambition and real-world data, we combine technical operations, agile infrastructure, and vetted human teams to fuel AI innovations across vision, voice, and language.
        </p>
      </section>

      {/* Capabilities Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our Capabilities
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Data Annotation",
              description:
                "Bounding boxes, segmentation, image classification, audio labeling — accurate and scalable.",
            },
            {
              title: "Data Collection",
              description:
                "Custom datasets collected under controlled or natural conditions. Visual, audio, and textual.",
            },
            {
              title: "Transcription & Tagging",
              description:
                "Accurate transcription services with contextual labeling and speaker identification.",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="text-center px-6 py-20 bg-slate-950">
        <h2 className="text-4xl font-bold mb-6">Trusted Infrastructure for Human-in-the-Loop AI</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          We help AI-first companies build robust training datasets at scale — with custom pipelines, vetted teams, and consistent delivery.
        </p>
      </section>

      {/* Why Us Section */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Built for AI-Centric Teams
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            {["Experienced team across diverse data modalities.",
              "Rapid scaling through remote and in-office networks.",
              "Proven track record with high-stakes datasets.",
              "Strict QA workflows and version-controlled output."].map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-4"
              >
                <CheckCircle className="text-green-500 w-6 h-6" />
                <p className="text-gray-300 text-lg">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} SpherePulse. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
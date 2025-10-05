import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import { GoArrowUpRight } from "react-icons/go";
import SimpleWorldMap from "../components/SimpleWorldMap";
import bgImage from "/intelligence.svg";

const stats = [
  { label: "Countries Covered", value: "30+" },
  { label: "Languages Supported", value: "25+" },
  { label: "Contributors", value: "1,200+" },
  { label: "Hours of Data", value: "50,000+" },
];

const FloatingShape = ({ className, style }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 blur-2xl ${className}`}
    style={style}
    animate={{ y: [0, 30, 0] }}
    transition={{ repeat: Infinity, duration: 10 }}
  />
);

const Home = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full md:h-screen flex-col content-end overflow-hidden">

        {/* Parallax Floating Shapes */}
        <FloatingShape className="w-72 h-72 bg-blue-400 left-10 top-20" />
        <FloatingShape className="w-56 h-56 bg-purple-500 right-10 bottom-32" />
        <FloatingShape className="w-48 h-48 bg-pink-500 left-1/3 top-1/4" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-32">
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
              Structured Human Data
            </h1>
            <p className="text-base md:text-lg mb-0 max-w-2xl mx-auto">
              We provide high-quality global AI training data
            </p>
            <p className="md:text-lg mb-8 max-w-2xl mx-auto">
              with deep expertise in African languages, accents, and contexts.
            </p>
            <a href="#contact-section" className="px-8 py-2 text-base rounded-full shadow-xl bg-purple-400 hover:bg-purple-500 text-white cursor-pointer">
              Get in Touch
            </a>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center mt-28 pb-16">
          <div className="mb-5 flex justify-between">
              <h1 className="font-semibold text-xl text-start">Open Roles</h1>
              <Link to='/jobs' className="flex items-center space-x-1 border border-slate-300 px-4 py-2 rounded-full hover:bg-slate-100 cursor-pointer">
                <span className="text-sm">View All</span>
                <GoArrowUpRight />
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-5">
            <Link className="border border-slate-200 md:shadow-lg px-2 py-4 rounded-lg hover:bg-slate-50 hover:border-purple-400">
              <p className="mb-4">AI Data Annotation</p>
              <p>Remote | Swahili</p>
              <p className="flex justify-center items-center mt-2 space-x-1 text-sm">
                <span>Apply</span>
                <GoArrowUpRight />
              </p>
            </Link>
            <Link className="border border-slate-200 shadow-lg px-2 py-4 rounded-lg hover:bg-slate-50 hover:border-purple-400">
              <p className="mb-4">Data Annotation Specialist</p>
              <p>Remote | English</p>
              <p className="flex justify-center items-center mt-2 space-x-1 text-sm">
                <span>Apply</span>
                <GoArrowUpRight />
              </p>
            </Link>
            <Link className="border border-slate-200 shadow-lg px-2 py-4 rounded-lg hover:bg-slate-50 hover:border-purple-400">
              <p className="mb-4">iPhone Data Collection</p>
              <p>Remote | Global</p>
              <p className="flex justify-center items-center mt-2 space-x-1 text-sm">
                <span>Apply</span>
                <GoArrowUpRight />
              </p>
            </Link>
            <Link className="border border-slate-200 shadow-lg px-2 py-4 rounded-lg hover:bg-slate-50 hover:border-purple-400">
              <p className="mb-4">Data Annotator - Maths</p>
              <p>Remote | Global</p>
              <p className="flex justify-center items-center mt-2 space-x-1 text-sm">
                <span>Apply</span>
                <GoArrowUpRight />
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="scroll-container my-8 md:my-16 pb-12">
        <div className="carousel-primary flex justify-center items-center h-10 md:h-12">
          <img className="h-12 md:h-20" src="/logos/centific.jpeg" alt="" />
          <img className="h-12 md:h-20" src="/logos/hesai.png" alt="" />
          <img className="h-12 md:h-20" src="/logos/mobvista.png" alt="" />
          <img className="h-12 md:h-20" src="/logos/oppo.png" alt="" />
          <img className="h-12 md:h-20" src="/logos/centific.jpeg" alt="" />
          <img className="h-12 md:h-16" src="/logos/waymo.png" alt="" />
          <img className="h-12 md:h-20" src="/logos/centific.jpeg" alt="" />
          <img className="h-12 md:h-20" src="/logos/hesai.png" alt="" />
          <img className="h-12 md:h-20" src="/logos/mobvista.png" alt="" />
          <img className="h-12 md:h-20" src="/logos/oppo.png" alt="" />
          <img className="h-12 md:h-16" src="/logos/waymo.png" alt="" />
          <img className="h-20" src="/logos/centific.jpeg" alt="" />
        </div>
      </section>
      <section className="py-20 px-6 text-center bg-gray-900 text-white">
        <h2 className="text-lg md:text-xl mb-16">
          Operating across continents with deep roots in Africa.
        </h2>
        <SimpleWorldMap />
        <div className="flex flex-col items-center">
          <div className="text-gray-400 max-w-2xl my-12">
            We provide AI-ready datasets from across continents — specializing in
            authentic African languages, voices, and environments, while
            maintaining global delivery capacity.
          </div>
                {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full max-w-3xl">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center"
              >
                <span className="text-3xl md:text-4xl font-semibold text-purple-400">
                  {stat.value}
                </span>
                <span className="text-gray-400 mt-1 text-sm uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* About Section */}
      <section className="bg-white py-20 px-6 text-center md:flex items-center space-x-4">
        <img
          src={bgImage}
          alt="World Map"
          className="mb-5 md:w-1/3"
        />
        <p className="max-w-4xl mx-auto text-lg">
          Founded to bridge the gap between AI ambition and real-world data, we combine technical operations, agile infrastructure, and vetted human teams to fuel AI innovations across vision, voice, and language.
        </p>
      </section>

      {/* Infrastructure Section */}
      <section className="text-center px-6 py-20 bg-gray-900">
        <h2 className="text-3xl font-semibold mb-6 text-white">Trusted Infrastructure for Human-in-the-Loop AI</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          We help AI-first companies build robust training datasets at scale — with custom pipelines, vetted teams, and consistent delivery.
        </p>
      </section>

      {/* Why Us Section */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white">
            Built for AI-Centric Teams
          </h2>
          <div className="flex justify-center">
            <div className="flex flex-col items-start">
            {["Experienced team across diverse data modalities.",
              "Rapid scaling through remote and in-office networks.",
              "Proven track record with high-stakes datasets.",
              "Strict QA workflows and version-controlled output."].map((point, idx) => (
              <div key={idx} className="flex md:items-center md:justify-center mb-4 space-x-2 md:space-x-4">
                <CheckCircle className="text-purple-400 w-4 h-4 hidden md:flex" />
                <p className="text-gray-300 md:text-lg">{point}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <div id="contact-section">
        <ContactForm />
      </div>
      
      {/* Footer */}
      <footer className="py-10 text-center text-sm">
        &copy; {new Date().getFullYear()} SpherePulse. All rights reserved.
      </footer>
    </div>
  );
};


export default Home;
import React from 'react';
import Navbar from '../components/Navbar';

function Services() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Social Media Reels",
              desc: "Short-form videos (Reels, TikToks, Shorts). Perfect for brands or creators. Starting at $30.",
            },
            {
              title: "YouTube & Long-Form Videos",
              desc: "Vlogs, interviews, or full content creation—shooting + editing available. Starting at $30.",
            },
            {
              title: "Event Highlight Videos",
              desc: "Weddings, birthdays, and special events. Highlight reels or full coverage. Starting at $60.",
            },
            {
              title: "Adverts & Commercials",
              desc: "Business promos, trailers, and cinematic ads. Tailored to your brand. Custom pricing.",
            },
            {
              title: "Music Videos",
              desc: "Creative visuals to match your sound. Concept to final cut. Custom pricing.",
            },
            {
              title: "Editing Only Services",
              desc: "Already have footage? Get pro-level editing that fits your style. Starting at $30.",
            },
          ].map((service, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <a
            href="/path-to-rate-card.pdf"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
            download
          >
            Download Full Rate Card
          </a>
        </div> */}
      </section>
    </>
  );
}

export default Services;

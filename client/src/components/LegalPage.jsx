import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Shared layout for the policy pages. Plain typography on purpose — these are
 * read by procurement and legal teams, not browsed.
 */
const LegalPage = ({ title, intro, lastUpdated, sections }) => (
  <div className="min-h-screen bg-white flex flex-col">
    <Navbar />

    <section className="pt-32 pb-12 px-6 bg-ink-900 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {intro && <p className="text-lg text-ink-300 leading-relaxed">{intro}</p>}
        <p className="text-sm text-ink-400 mt-6">Last updated: {lastUpdated}</p>
      </div>
    </section>

    <main className="flex-1 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        {sections.map((section, idx) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              {idx + 1}. {section.heading}
            </h2>
            <div className="space-y-4 text-ink-700 leading-relaxed">
              {section.body.map((block, blockIdx) =>
                Array.isArray(block) ? (
                  <ul key={blockIdx} className="list-disc pl-6 space-y-2">
                    {block.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={blockIdx}>{block}</p>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </main>

    <Footer />
  </div>
);

export default LegalPage;

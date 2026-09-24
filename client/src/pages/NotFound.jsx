import React from 'react';
import Navbar from '../components/Navbar';
import usePageMeta from '../lib/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: 'Page not found | SpherePulse',
    description: 'The page you were looking for does not exist.',
  });

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-xl text-center">
          <div className="font-display text-6xl font-semibold text-accent-600 mb-4">404</div>
          <h1 className="text-3xl font-semibold text-ink-950 mb-4">Page not found</h1>
          <p className="text-ink-600 mb-8">
            That link does not exist, or it has moved. Try one of these instead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-accent-600 text-white rounded-md font-semibold hover:bg-accent-700 transition"
            >
              Go to homepage
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-ink-700 rounded-md font-semibold hover:bg-ink-50 transition border-2 border-ink-200"
            >
              Contact us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

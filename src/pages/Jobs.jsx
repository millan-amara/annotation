import React from 'react';
import Navbar from '../components/Navbar';

function Jobs() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-6 max-w-6xl mx-auto">
        {/* <h2 className="text-3xl font-bold text-center mb-12">Jobs</h2> */}

        <div className='flex items-center justify-center'>
          <h1 className='text-xl'>There are no jobs currently. Check back soon!</h1>
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

export default Jobs;

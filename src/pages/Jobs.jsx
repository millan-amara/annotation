import React from 'react';
import Navbar from '../components/Navbar';

function Jobs() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className='flex items-center justify-center'>
          {/* <h1 className='text-xl'>There are no openings currently. Check back soon!</h1> */}
          <a href='https://forms.gle/aypcdEJLNAmzi2RP9' target="_blank" rel="noopener noreferrer" className='border px-4 py-4 rounded-xl border-slate-300'>
            <h1 className='text-xl mb-4'>Selfie Photo Collection</h1>
            <ul className='mb-4'>
              <li> - In order to improve AI facial recognition systems, we are currently collecting selfie image data from willing participants.</li>
              <li> - Each participant will need to submit a minimum of 9 photos taken using an iPhone or iPad.</li>
              <li> - We're currently looking for participants in South Africa, Mexico, US, Canada, India, and Japan</li>
              <li> - Successful participation guarantees participation in our other ongoing and more exciting projects.</li>
              <li> - $20 per participant.</li>
            </ul>
            <button className='text-purple-500 hover:text-purple-600 text-center underline underline-offset-2 rounded-md'>Apply</button>
          </a>
        </div>
      </section>
    </>
  );
}

export default Jobs;

import React from 'react';
import Navbar from '../components/Navbar';

function Jobs() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <div className='flex items-center justify-center'>
          <h1 className='text-xl'>There are no jobs currently. Check back soon!</h1>
        </div>

      </section>
    </>
  );
}

export default Jobs;

import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <>
      {/* About Us */}
      <Navbar />
      <section className="py-20 px-6 text-center">
        <p className="text-lg">
          "I help brands and creators stand out with scroll-stopping video edits that drive engagement and views. With millions of views under my belt, I turn simple clips into high-performing content."
        </p>
      </section>
    </>
  );
}

export default About;
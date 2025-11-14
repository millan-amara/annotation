import React from 'react';
import { useState } from "react";
import { Menu, X } from 'lucide-react';

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href='/' className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            SpherePulse
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/capabilities" className="text-gray-700 hover:text-purple-600 transition">Capabilities</a>
            <a href="/jobs" className="text-gray-700 hover:text-purple-600 transition">Jobs</a>
            <a href="/contact" className="text-gray-700 hover:text-purple-600 transition">Contact</a>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="/capabilities" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
              <a href="/jobs" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>Jobs</a>
              <a href='/contact' className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-full w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

    </>

  )
}

export default Navbar
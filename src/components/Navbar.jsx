import React from 'react';
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

  return (
    <>
        <header
            className={`px-8 flex justify-between items-center sticky pt-6 pb-2 z-30 text-black transition-all duration-300 ${
                isHome ? "text-black" : "shadow-md"
            }`}
        >

            <Link to='/' className='flex flex-col items-center text-2xl'>
                SpherePulse
            </Link>

            {/* Hamburger toggle */}
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-3xl focus:outline-none"
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Desktop menu */}
            <nav className="hidden text-sm sm:flex space-x-6 z-50">
                <Link to="/" className="hover:text-purple-400">Home</Link>
                <Link to="/jobs" className="hover:text-purple-400">Jobs</Link>
                <Link to="/contact" className="hover:text-purple-400">Contact</Link>
            </nav>

            <nav className="hidden text-sm sm:flex z-50">
                <Link to="/login" className="border rounded-full px-4 py-2 text-xs border-slate-200 bg-slate-100 hover:bg-slate-200">Sign In</Link>
            </nav>

            {/* Mobile menu */}
            <div 
                className={`fixed top-0 right-0 h-screen z-50 w-3/4 max-w-xs bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden`}
            >
                <button 
                    onClick={() => setMenuOpen(false)} 
                    className="absolute top-4 right-4 text-3xl"
                    >
                    <FaTimes />
                </button>

                <div className="flex flex-col mx-auto p-6 mt-10 text-base">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline py-2 mb-2">Home</Link>
                    <Link to="/jobs" onClick={() => setMenuOpen(false)} className="hover:underline py-2 mb-2">Jobs</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:underline py-2">Contact</Link>
                </div>

                {/* Contact Support section */}
                <div className="absolute bottom-24 left-0 w-full text-center text-sm text-white px-4">
                    <div className="mb-1 font-semibold text-white">Let's Talk</div>
                    <div>
                        <span className="font-medium">Email:</span> <span className="">contact@spherepulse.net</span>
                    </div>
                </div>
            </div>
            {menuOpen && (
            <div 
                className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-40 md:hidden"
                onClick={() => setMenuOpen(false)}
            ></div>
            )}
        </header>

    </>

  )
}

export default Navbar
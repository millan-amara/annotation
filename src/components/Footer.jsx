import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Youtube } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
// import Router from "../assets/logo.png";

function Footer() {
  return (
    <footer id="footer" className="bg-black text-gray-300 px-5 pt-14 pb-8 flex flex-col md:block items-center">
    <div className="flex flex-col md:flex-row justify-around mb-5">
        <div className="w-full md:w-1/4 md:flex md:flex-col md:justify-center md:items-center">
            <p className="text-3xl mb-3 font-semibold text-center">ai_am_<span>truth</span></p>
            <p className="mb-5 text-base">Wanna create something amazing?</p>
            <div>
                <p className='flex items-center mb-1'><Mail size={18} className='mr-1' />films@aiamtruth.com</p>
                <p className='flex items-center mb-1'><Youtube size={18} className='mr-1' />ai_am_truth</p>
                <p className='flex items-center mb-1'><FaTiktok size={18} className='mr-1' />ai_am_truth</p>
                <p className='mb-6 md:mb-0 flex items-center'><Phone size={18} className='mr-1' />+254 700-487-751</p>
            </div>

            
            <a a href={`https://wa.me/+254700487751`} target="_blank" rel="noopener noreferrer" className="border-2 border-white-600 hover:bg-fuchsia-600 hover:text-white py-2 px-4 rounded-lg font-bold mt-6 flex justify-center">Say Hi, ☺️</a>
        </div>
        {/* <div className="border-l-2 border-white hidden md:block ">
            <p className=""></p>
        </div> */}
        <div className="mt-10 flex flex-col items-center md:mt-0 text-white">
            {/* <img src={Router} alt="" className='h-56' /> */}
            <div className='flex text-xl justify-center'>
                <p className='mr-3 bg-zinc-700 rounded-full flex py-2 px-2'><Link className='text-blue-400'><FaFacebookF /></Link></p>
                <p className='mr-3 bg-zinc-700 rounded-full flex py-2 px-2'><Link><FaInstagram /></Link></p>
                <p className='mr-3 bg-green-400 rounded-full flex py-2 px-2'><a href={`https://wa.me/+254700487751`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></p>
                <p className='mr-3 bg-zinc-700 rounded-full flex py-2 px-2'><Link><FaTiktok /></Link></p>
            </div>
        </div>
    </div>
    <div className="flex justify-center text-sm">
        <p>&copy; {new Date().getFullYear()} ai_am_truth. All rights reserved</p>
    </div>

  </footer>
  )
}

export default Footer
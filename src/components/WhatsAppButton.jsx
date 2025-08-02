import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  const phoneNumber = '254700487751';

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
    
  );
}

export default WhatsAppButton;
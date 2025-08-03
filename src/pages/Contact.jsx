import React, { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
import Navbar from '../components/Navbar';
import { Mail, Phone, Send } from "lucide-react";
import ContactForm from '../components/ContactForm';

function Contact() {
    const formRef = useRef();
    const [formData, setFormData] = useState({
      email: '',
      message: '',
    });

    const {email,message} = formData;

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
    const onSubmit = (e) => {
      e.preventDefault()
      emailjs.sendForm('service_pm4kpg1', 'template_qdgkji2', form.current, {
        publicKey: 'FfC2jgC2scsnjnV9p'
      })
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        setFormData({
          email: '',
          message: '',
        })
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });

      
    }
  
    return (
      <>
      <Navbar />
      <ContactForm />


      </>
    );
}

export default Contact
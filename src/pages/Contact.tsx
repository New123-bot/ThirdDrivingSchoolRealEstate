import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const location = useLocation();

  // Primary form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Success state alert trigger
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Read state passed from Navigate (e.g. from /driving or /real-estate CTAs)
  useEffect(() => {
    if (location.state && (location.state as any).service) {
      const selectedService = (location.state as any).service;
      if (selectedService === 'driving' || selectedService === 'realestate' || selectedService === 'both') {
        setFormData((prev) => ({ ...prev, service: selectedService }));
      }
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core console log required by the user
    console.log('--- MOCK CONTACT FORM SUBMISSION ---');
    console.log('Submission Datetime:', new Date().toISOString());
    console.log('Customer Name:', formData.name);
    console.log('Customer Email:', formData.email);
    console.log('Customer Phone:', formData.phone);
    console.log('Service Requested:', formData.service || 'None Selected');
    console.log('Message Detail:', formData.message);
    console.log('------------------------------------');

    setSubmitted(true);
    
    // Clear inputs
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });

    // Reset banner after 6 seconds
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="asphalt-blueprint min-h-screen pb-16" id="contactpage-root">
      
      {/* Contact Simple Page Header */}
      <header className="relative py-16 bg-gradient-to-b from-zinc-950 to-[#1a1a1a] border-b border-zinc-800" id="contact-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex p-3 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4">
            <Phone className="w-8 h-8 text-[#ff6b35]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Get in Touch with Michael
          </h1>
          <p className="text-zinc-400 font-sans text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Book your free trial behind-the-wheel lesson or secure a premium residential buying consultation today.
          </p>
        </div>
      </header>

      {/* Main Grid: Form Left, Offices Layout on Right */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="contact-grids">
        
        {/* Responsive dual split column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMN 1: Dynamic Intake Form Container (cols 7) */}
          <section className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl relative" id="intake-form-box">
            
            {/* Visual alert slide in */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 text-sm font-semibold"
                >
                  <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <span className="block font-bold">Booking Initiated Successfully!</span>
                    <span className="text-zinc-400 text-xs">Form details printed in developer console log. Coach Michael Reynolds will contact you within 24 business hours to lock in dates.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1.5Id">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Your Name <span className="text-[#ff6b35]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full py-3 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-[#ff6b35] transition-colors"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Email Address <span className="text-[#00b4d8]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full py-3 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-[#00b4d8] transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Phone Number <span className="text-[#ff6b35]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full py-3 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-[#ff6b35] transition-colors"
                    placeholder="(555) 000-0000"
                  />
                </div>

                {/* Service Dropdown Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Select Target Track <span className="text-[#00b4d8]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="block w-full py-3 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-[#00b4d8] transition-colors cursor-pointer appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">-- Choose Program Track --</option>
                    <option value="driving">🚗 Motor Driving School Track</option>
                    <option value="realestate">🏠 Real Estate Consultation Track</option>
                    <option value="both">🚙 Both Services Unified ("Drive to Own")</option>
                  </select>
                </div>

              </div>

              {/* Message Box */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Detailed Message / Custom Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full py-3 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                  placeholder="Tell Michael about your driving background or real estate budget limits..."
                />
              </div>

              {/* Submission Button (fully 44x44px touch target) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#00b4d8] text-zinc-950 font-extrabold text-base transition-all hover:opacity-90 min-h-[44px] cursor-pointer shadow-lg"
              >
                <span>Submit Intake Form</span>
                <Send className="w-4 h-4 text-zinc-955" />
              </button>

            </form>
          </section>

          {/* COLUMN 2: Addresses & Working Hours (cols 5) */}
          <section className="lg:col-span-5 space-y-8" id="corporate-hq-details">
            
            {/* Primary Addresses segment */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6" id="hq-addresses-card">
              <h3 className="text-lg font-heading font-extrabold text-white border-b border-zinc-800 pb-3 m-0">
                Primary Division Headquarters
              </h3>
              
              <div className="space-y-5">
                {/* Driving academy branch */}
                <div className="flex gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#ff6b35]/15 text-[#ff6b35] shrink-0 h-10 w-10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-zinc-200">Reynolds Driving Academy</span>
                    <address className="not-italic text-zinc-400 text-xs mt-0.5">
                      123 Test Track Ave, Cityville
                    </address>
                  </div>
                </div>

                {/* Real estate branch */}
                <div className="flex gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#00b4d8]/15 text-[#00b4d8] shrink-0 h-10 w-10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-zinc-200">Michael Reynolds Real Estate</span>
                    <address className="not-italic text-zinc-400 text-xs mt-0.5">
                      456 Homeview Blvd, Cityville
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Division physical working hours segment */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6" id="hq-hours-card">
              <h3 className="text-lg font-heading font-extrabold text-white border-b border-zinc-800 pb-3 m-0">
                Division Hours of Operation
              </h3>

              <div className="space-y-4">
                {/* Driving schedule */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#ff6b35] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold text-zinc-200">Driving Academy Division:</span>
                    <span className="block text-xs text-zinc-400 mt-0.5 font-mono">Monday - Saturday (8:00 AM - 6:00 PM)</span>
                    <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">Closed Sunday (dmv schedules locked)</span>
                  </div>
                </div>

                {/* Real estate schedule */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#00b4d8] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold text-zinc-200">Real Estate Services Division:</span>
                    <span className="block text-xs text-zinc-400 mt-0.5 font-mono">Monday - Sunday (10:00 AM - 7:00 PM)</span>
                    <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">Includes after-hours weekend open-house hosting</span>
                  </div>
                </div>
              </div>
            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

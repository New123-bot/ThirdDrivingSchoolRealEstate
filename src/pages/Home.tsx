import { Link } from 'react-router-dom';
import { Car, Home as HomeIcon, ArrowRight, UserCheck, ShieldCheck, Key, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="asphalt-blueprint min-h-screen pb-16" id="homepage-root">
      
      {/* 1. Hero Section with CSS keyframe fading carousel */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden border-b border-zinc-800" id="hero-carousel-section">
        {/* Underlayer Carousel Slides */}
        <div className="absolute inset-0 z-0">
          <div className="carousel-slide slide-1"></div>
          <div className="carousel-slide slide-2"></div>
          <div className="carousel-slide slide-3"></div>
        </div>

        {/* Blueprint Decorative Lines Layout inside Hero */}
        <div className="absolute inset-0 pointer-events-none z-10 blueprint-dots opacity-30"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/30 z-20 flex flex-col justify-center items-center px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl flex flex-col items-center"
          >
            {/* Visual Mini Badge */}
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-[#00b4d8] text-xs font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Full-Stack Road & Housing Coaching</span>
            </div>

            {/* Core Overlay Caption */}
            <h1 className="font-heading font-extrabold tracking-tight text-white mb-6 leading-tight text-[1.5rem] sm:text-[2rem] md:text-[3.5rem] lg:text-[4.5rem]">
              Drive First. <span className="text-[#ff6b35]">Own Next.</span> <br />
              <span className="bg-gradient-to-r from-[#ff6b35] to-[#00b4d8] bg-clip-text text-transparent">One Coach.</span>
            </h1>

            <p className="text-sm md:text-lg text-zinc-300 max-w-2xl mb-10 font-sans leading-relaxed">
              We train you to master the open asphalt with safety and supreme confidence, then navigate the blueprint layouts to purchase your first dream property. Let Michael Reynolds guide you through both.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto" id="hero-cta-buttons">
              <Link 
                to="/driving" 
                className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#ff6b35] text-white hover:bg-[#e05621] transition-all font-bold tracking-wide text-sm md:text-base shadow-lg shadow-[#ff6b35]/20 min-h-[44px]"
              >
                <Car className="w-5 h-5" />
                <span>🚗 Driving School</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/real-estate" 
                className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#00b4d8] text-zinc-950 hover:bg-[#009cb8] transition-all font-bold tracking-wide text-sm md:text-base shadow-lg shadow-[#00b4d8]/20 min-h-[44px]"
              >
                <HomeIcon className="w-5 h-5" />
                <span>🏠 Real Estate Office</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Highlight Road Marking Bar at Bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 orange-dashed-road z-30"></div>
      </section>

      {/* 2. Quick Dual Preview Section (Two Responsive Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="dual-preview-cards">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
            Comprehensive Program Showcase
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff6b35] to-[#00b4d8] mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Choose either track or take advantage of our unique unified program.
          </p>
        </div>

        {/* Responsive Grid Setup (3 cols -> 1 col, tablet -> 2 columns preserved, desktop -> full 2 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card Left: Driving School Summary */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden hover:border-[#ff6b35]/40 transition-colors shadow-2xl"
            id="driving-summary-card"
          >
            {/* Visual top bar marking */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff6b35]"></div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#ff6b35]/10 text-[#ff6b35]">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Reynolds DMV Prep</span>
                  <h3 className="text-xl lg:text-2xl font-bold font-heading text-white m-0">Safety Driving School</h3>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Master parallel parking, bypass merging, and pass your DMV practical exam with zero anxiety. Michael Reynolds and his team have maintained a 98% pass rate since 2010.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  '1-on-1 Personalized Coaching',
                  'Dual-control modern training fleet',
                  'Highway Confidence curriculum included',
                  'Frictionless DMV Test car booking service',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-zinc-300 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#ff6b35] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to="/driving"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl border border-[#ff6b35]/40 text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white transition-all font-bold text-sm min-h-[44px]"
            >
              <span>Explore Driving Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card Right: Real Estate Summary */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden hover:border-[#00b4d8]/40 transition-colors shadow-2xl"
            id="realestate-summary-card"
          >
            {/* Visual top bar marking */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00b4d8]"></div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#00b4d8]/10 text-[#00b4d8]">
                  <HomeIcon className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Reynolds Brokers</span>
                  <h3 className="text-xl lg:text-2xl font-bold font-heading text-white m-0">Real Estate Agency</h3>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Acquiring property doesn't have to be intimidating. We help search, analyze, and negotiate residential or commercial purchases across the metro area.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Premium MLS listings and off-market lookup',
                  'Intelligent mortgage & EMI analysis',
                  'Rigorous structural inspections representation',
                  'Special: Drive To Own student credits',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-zinc-300 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#00b4d8] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to="/real-estate"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl border border-[#00b4d8]/40 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-zinc-950 transition-all font-bold text-sm min-h-[44px]"
            >
              <span>Explore Property Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 3. Owner Spotlight Section */}
      <section className="bg-zinc-900/40 border-t border-b border-zinc-800/80 py-16" id="owner-spotlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Visual Portrait Container with rounded emoji overlay */}
            <div className="col-span-1 md:col-span-5 flex justify-center" id="owner-portrait">
              <div className="relative group p-2 bg-gradient-to-br from-[#ff6b35] via-zinc-800 to-[#00b4d8] rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" 
                  alt="Michael Reynolds Portrait" 
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* 🚗🏠 Emoji Accent Badge */}
                <span className="absolute -bottom-4 -right-4 bg-zinc-950 text-white rounded-full p-4 text-xl border-2 border-zinc-800 shadow-xl flex items-center justify-center select-none scale-110">
                  🚗🏠
                </span>
              </div>
            </div>

            {/* Biography Intro Details */}
            <div className="col-span-1 md:col-span-7 flex flex-col items-start" id="owner-bio-intro">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#ff6b35] mb-2">
                MEET YOUR DUAL CHAMPION
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight mb-4 m-0 leading-tight">
                Michael Reynolds
              </h2>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6 font-mono">
                Coach, Realtor & Managing Principal
              </h4>

              <p className="text-zinc-300 text-sm lg:text-base leading-relaxed mb-6 font-sans">
                "For over fifteen years, I have taught students the physics of safe roads, and for eight years, I’ve represented clients buying their dream bungalows and workspaces. I’ve realized that confidence behind the wheel and stability at home go hand-in-hand. That is why I founded the unified DualDrive structure."
              </p>

              {/* Badges area */}
              <div className="flex flex-wrap gap-3 mb-8" id="spotlight-badge-container">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300">
                  <UserCheck className="w-3.5 h-3.5 text-[#ff6b35]" />
                  Certified Safety Professional
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300">
                  <Key className="w-3.5 h-3.5 text-[#00b4d8]" />
                  Licensed National Realtor Affiliate
                </span>
              </div>

              {/* Learn More Action Button */}
              <Link 
                to="/about"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 font-bold text-sm transition-all border border-zinc-700 min-h-[44px]"
              >
                <span>Learn More About Me</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

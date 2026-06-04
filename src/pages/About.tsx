import { Link } from 'react-router-dom';
import { UserCheck, ShieldCheck, Milestone, Compass, Sparkles, Car, Home, ArrowRight, Star } from 'lucide-react';
import { TIMELINE } from '../data';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="asphalt-blueprint min-h-screen pb-16" id="aboutpage-root">
      
      {/* Visual Page Banner */}
      <header className="relative py-16 bg-gradient-to-b from-zinc-950 to-[#1a1a1a] border-b border-zinc-800" id="about-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex p-3 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-[#00b4d8]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Meet Michael Reynolds
          </h1>
          <p className="text-zinc-400 font-sans text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Discover the narrative of the only dual-certified driving educator and licensed metropolitan broker guiding Cityville.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* SECTION A: Biography */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden" id="about-bio">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff6b35]/3 rounded-bl-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Rounded Avatar Box with Overlay */}
            <div className="col-span-1 md:col-span-4 flex justify-center" id="bio-avatar-block">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient bg-zinc-950 shadow-2xl">
                  {/* Actual photo placeholder from Unsplash */}
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" 
                    alt="Michael Reynolds avatar" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale" 
                  />
                </div>
                
                {/* Overlay Emoji badge */}
                <span className="absolute -bottom-2 right-2 bg-zinc-950 text-white rounded-full p-2.5 text-lg border-2 border-zinc-800 shadow-xl flex items-center justify-center select-none">
                  🚗🏠
                </span>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="col-span-1 md:col-span-8 flex flex-col items-start" id="bio-narrative-block">
              {/* Dual credentials badge */}
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-950 border border-zinc-850 rounded-lg text-xs font-bold text-white shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#00b4d8]" />
                <span className="font-heading">Dual Certified: Driver Education + Real Estate License</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white m-0">
                15 Years on the Road. 8 Years at the Closing Table.
              </h2>
              <div className="w-16 h-0.5 bg-[#ff6b35] mt-2 mb-4 rounded"></div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
                As a state-certified safety coordinator and licensed real estate representative, Michael Reynolds helps students conquer the emotional obstacles of high-speed turning, parallel alignment, and highway merging, then provides the perfect strategic consulting required to inspect, bid, and acquire their primary home keys.
              </p>

              <blockquote>
                <p className="text-[#00b4d8] text-xs md:text-sm font-semibold font-mono border-l-2 border-[#00b4d8] pl-3 py-1 m-0">
                  "I don't just teach you to steer safely; I build the platform so you have a destination of your own."
                </p>
              </blockquote>
            </div>

          </div>
        </section>


        {/* SECTION B: Business Philosophy */}
        <section className="space-y-8" id="about-philosophy">
          <div className="text-center">
            <span className="text-[#00b4d8] font-mono text-xs uppercase tracking-widest font-extrabold">OUR PRINCIPLES</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
              Business Philosophy
            </h2>
            
            {/* Core Mission is prominently displayed */}
            <blockquote className="mt-4 max-w-2xl mx-auto italic text-zinc-300 text-md md:text-lg">
              "From the driver's seat to the closing table — we're with you."
            </blockquote>
            
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff6b35] to-[#00b4d8] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Two Responsive Columns (Safety vs Trust) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-sm lg:text-base">
            
            {/* Left Column values: Driving */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl relative overflow-hidden" id="driving-values-col">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#ff6b35]"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <Car className="w-6 h-6 text-[#ff6b35]" />
                <h3 className="text-lg font-bold font-heading text-white m-0">Driving School Values</h3>
              </div>

              <ul className="space-y-4">
                <li>
                  <strong className="block text-zinc-200">Safety First:</strong>
                  <span className="text-zinc-500 text-xs">Curing road anxieties and preparing defensive parameters is always our absolute minimum threshold.</span>
                </li>
                <li>
                  <strong className="block text-zinc-200">Infinite Patience:</strong>
                  <span className="text-zinc-500 text-xs">Every beginner progresses at customized speeds. No honking, no rushing, just professional building blocks.</span>
                </li>
                <li>
                  <strong className="block text-zinc-200">Unshakeable Confidence:</strong>
                  <span className="text-zinc-500 text-xs">Mastering high-speed bypass merge drills and parallel slots builds life-long assurance.</span>
                </li>
              </ul>
            </div>

            {/* Right Column values: Real Estate */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl relative overflow-hidden" id="realestate-values-col">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#00b4d8]"></div>

              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-[#00b4d8]" />
                <h3 className="text-lg font-bold font-heading text-white m-0">Real Estate Values</h3>
              </div>

              <ul className="space-y-4">
                <li>
                  <strong className="block text-zinc-200">Absolute Trust:</strong>
                  <span className="text-zinc-500 text-xs">Bidding layouts, transaction histories, and structural inspects require complete transparency to avoid pitfalls.</span>
                </li>
                <li>
                  <strong className="block text-zinc-200">Rigorous Local Expertise:</strong>
                  <span className="text-zinc-500 text-xs">Decades spent analyzing neighborhood developments, zoning expansions, and realistic equity multipliers.</span>
                </li>
                <li>
                  <strong className="block text-zinc-200">Frictionless Systems:</strong>
                  <span className="text-zinc-500 text-xs">Synchronized representation from pre-approval limits directly to keys-in-hand closing days.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>


        {/* SECTION C: Timeline / Journey */}
        <section className="space-y-12" id="about-timeline">
          <div className="text-center">
            <span className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest font-extrabold">GROWTH & LEGACY</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1 animate-pulse" style={{ animationDuration: '4s' }}>
              Our Journey Timeline
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b35] via-zinc-800 to-[#00b4d8] mx-auto mt-3 rounded-full"></div>
            <p className="text-zinc-500 text-xs md:text-sm mt-3">
              Hover over milestones to track how our safety certifications evolved into property brokerage mergers.
            </p>
          </div>

          {/* Desktop Timeline Layout (using flex items horizontally) VS Mobile Vertical Timeline Layout */}
          <div className="relative">
            
            {/* 1. DESKTOP TIMELINE (Visible on lg:screen size 1024px+) */}
            <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-stretch lg:gap-4 relative pt-12" id="desktop-timeline-block">
              {/* Central Horizontal Line decoration */}
              <div className="absolute top-[71px] left-8 right-8 h-1 bg-zinc-800 z-0"></div>
              
              {TIMELINE.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col items-center text-center relative z-10 px-2" id={`timeline-node-${step.year}`}>
                  
                  {/* Year Bubble */}
                  <span className="inline-block text-xs font-mono font-bold text-[#ff6b35] bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 mb-4 z-20">
                    {step.year}
                  </span>

                  {/* Node Connector Point */}
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-white font-bold text-xs ring-4 ring-zinc-950 hover:border-[#00b4d8] hover:scale-110 transition-all mb-4">
                    {index + 1}
                  </div>

                  {/* Body Info box */}
                  <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-4 flex flex-col justify-start h-full hover:border-[#00b4d8]/40 transition-colors shadow-xl">
                    <h4 className="font-heading font-bold text-white text-sm mb-2">{step.title}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-sans">{step.description}</p>
                  </div>

                </div>
              ))}
            </div>

            {/* 2. MOBILE & TABLET TIMELINE (Visible below 1024px: stacked list) */}
            <div className="lg:hidden flex flex-col gap-8 relative pl-6 border-l border-zinc-800" id="mobile-timeline-block">
              {TIMELINE.map((step, index) => (
                <div key={index} className="relative" id={`timeline-mobile-node-${step.year}`}>
                  {/* Glowing vertical point identifier */}
                  <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-[#ff6b35] ring-4 ring-zinc-950 flex items-center justify-center"></div>
                  
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-[#ff6b35] bg-zinc-950 px-2.5 py-0.5 rounded-full border border-zinc-855">
                        {step.year}
                      </span>
                      <h4 className="font-heading font-bold text-white text-md m-0">{step.title}</h4>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed font-sans m-0">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SECTION D: Fun Fact / Unique Selling Point */}
        <section className="max-w-3xl mx-auto" id="about-usp">
          <div className="bg-zinc-900 border-2 border-gradient-to-r border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden hover:border-[#00b4d8]/30 transition-colors shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00b4d8]/5 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6" id="usp-content">
              <div className="p-4 bg-gradient-to-br from-[#ff6b35] to-[#00b4d8] rounded-2xl text-zinc-950 shadow-lg shrink-0">
                <Sparkles className="w-8 h-8 text-zinc-950" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#ff6b35] tracking-widest block mb-1">
                  OUR UNIQUE VALUE PROPOSITION
                </span>
                <h3 className="text-xl font-heading font-extrabold text-white mb-3 m-0">
                  Dual-Benefit Client Ecosystem
                </h3>
                
                <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-sans">
                  Michael is the only coach in the city who delivers coordinated financial synergies:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono border-t border-zinc-800/80 pt-4 mt-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] mt-1.5"></div>
                    <div>
                      <span className="font-bold text-white block">Home Buyers:</span>
                      <span className="text-zinc-500">Free driving lessons when you buy your home through me.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] mt-1.5"></div>
                    <div>
                      <span className="font-bold text-white block">Driving Grads:</span>
                      <span className="text-zinc-500">Free design & broker consultation when you complete driving school.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

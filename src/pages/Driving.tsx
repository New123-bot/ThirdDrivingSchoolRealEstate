import { Link, useNavigate } from 'react-router-dom';
import { Car, Star, Clock, User, ShieldCheck, HelpCircle, ArrowRight, Check } from 'lucide-react';
import { COURSE_PACKAGES, INSTRUCTORS, TESTIMONIALS } from '../data';
import { motion } from 'motion/react';

export default function Driving() {
  const navigate = useNavigate();

  const handleBookTrial = () => {
    // Navigate to contact and pass state so the form can pre-select Driving School
    navigate('/contact', { state: { service: 'driving' } });
  };

  return (
    <div className="asphalt-blueprint min-h-screen pb-16" id="driving-page-root">
      
      {/* Page Elegant Header */}
      <header className="relative py-16 bg-gradient-to-b from-zinc-950 to-[#1a1a1a] border-b border-zinc-800" id="driving-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex p-3 bg-[#ff6b35]/10 text-[#ff6b35] rounded-2xl mb-4 border border-[#ff6b35]/20">
            <Car className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Master the Open <span className="text-[#ff6b35]">Asphalt</span>
          </h1>
          <p className="text-zinc-400 font-sans text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Build unshakeable confidence with professional behind-the-wheel coaching designed for absolute beginners, highway commuters, and defensive-driving mastery.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none"></div>
      </header>

      {/* Pricing Section (Rigorous 3-col -> 2-col on Tablet -> 1-col on Mobile responsive rule) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="pricing-curriculum">
        <div className="text-center mb-12">
          <span className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest font-extrabold">PRICING TABLES</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
            Driver Education Packages
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Triple responsive column arrangement */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSE_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6 }}
              className={`bg-zinc-900 border rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden transition-all shadow-xl ${
                pkg.recommended 
                  ? 'border-[#ff6b35] shadow-[#ff6b35]/5' 
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute top-0 right-0 bg-[#ff6b35] text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
                  Popular Option
                </div>
              )}

              <div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{pkg.duration}</span>
                <h3 className="text-xl font-heading font-bold text-white mt-2 mb-4 leading-tight">{pkg.name}</h3>
                
                {/* Price Display */}
                <div className="flex items-baseline mb-6 border-b border-zinc-800/80 pb-6">
                  <span className="text-3xl md:text-4xl font-extrabold font-heading text-white">${pkg.price}</span>
                  <span className="text-zinc-500 text-xs ml-2 uppercase font-mono tracking-wider">/ total course</span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3.5 mb-8 text-sm">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-zinc-300">
                      <Check className="w-4 h-4 text-[#ff6b35] mt-0.5 shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={handleBookTrial}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] ${
                  pkg.recommended 
                    ? 'bg-[#ff6b35] text-white hover:bg-[#e05621] shadow-lg shadow-[#ff6b35]/25' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                }`}
              >
                <span>Book This Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instructor Gallery Section (3 columns -> 2 tablet -> 1 mobile) */}
      <section className="bg-zinc-900/30 border-t border-b border-zinc-900 py-16" id="instructors-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest font-extrabold">EXPERIENCED TEAM</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
              Master Instructors
            </h2>
            <div className="w-16 h-1 bg-[#ff6b35] mx-auto mt-3 rounded-full"></div>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mt-2">
              Our safety-certified professionals have decades of combined driving education experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSTRUCTORS.map((coach) => (
              <div 
                key={coach.id}
                className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col items-center text-center hover:border-zinc-700/60 transition-colors"
                id={`coach-card-${coach.id}`}
              >
                {/* Photo with hover effect */}
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#ff6b35]/40 shadow-lg">
                  <img 
                    src={coach.avatar} 
                    alt={coach.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 right-0 bg-zinc-950 px-1.5 py-0.5 rounded text-[8px] border border-zinc-800 text-[#ff6b35] font-bold font-mono">
                    {coach.experience}
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading text-white m-0">{coach.name}</h3>
                <span className="text-[11px] font-bold text-[#ff6b35]/80 uppercase tracking-widest mt-1 mb-3">
                  {coach.id === 'inst-1' ? 'Founder & Principal' : 'Certified Senior Coach'}
                </span>
                
                <p className="text-zinc-400 text-xs leading-relaxed max-w-xs mb-4 min-h-[36px]">
                  {coach.specialty}
                </p>

                {/* Rating display */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`w-4 h-4 fill-current ${
                        idx < Math.floor(coach.rating) ? 'text-[#ff6b35]' : 'text-zinc-700'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-mono font-bold text-white ml-1.5">{coach.rating}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Double Student reviews section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="reviews-testimonials">
        <div className="text-center mb-12">
          <span className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest font-extrabold">STUDENT SUCCESS</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
            Student Testimonials
          </h2>
          <div className="w-16 h-1 bg-[#ff6b35] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Double review list responsive column layout (1 col mobile, 2 col tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map((review) => (
            <div 
              key={review.id} 
              className="bg-zinc-900/85 border border-zinc-800 p-6 rounded-2xl relative flex flex-col justify-between shadow-lg"
              id={`testimonial-${review.id}`}
            >
              {/* Stars decoration */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current text-[#ff6b35]" />
                ))}
              </div>

              <blockquote className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans">
                "{review.review}"
              </blockquote>

              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 text-xs font-mono">
                <div>
                  <cite className="not-italic font-bold text-white block">{review.name}</cite>
                  <span className="text-zinc-500 text-[10px]">{review.role}</span>
                </div>
                <span className="text-zinc-600 text-[10px]">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner section with full-width stacked button targets */}
        <div className="text-center mt-16" id="driving-final-cta-container">
          <button
            onClick={handleBookTrial}
            className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#ff8452] text-white font-extrabold hover:shadow-lg hover:shadow-[#ff6b35]/25 transition-all text-base min-h-[44px] cursor-pointer"
          >
            Book a Free Trial Lesson
          </button>
          <p className="text-zinc-500 text-xs font-mono uppercase mt-3 tracking-widest">
            *Includes dual-control vehicle & highway briefing with Michael Reynolds
          </p>
        </div>
      </section>

    </div>
  );
}

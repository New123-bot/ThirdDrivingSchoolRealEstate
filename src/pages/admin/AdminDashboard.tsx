import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { DashboardHub } from './DashboardHub';
import { HomeContentManager } from './HomeContentManager';
import { DrivingManager } from './DrivingManager';
import { RealEstateManager } from './RealEstateManager';
import { ActivityLogs } from './ActivityLogs';

const SEED_DATA = {
  homeContent: {
    hero: {
      images: [
        'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=1200&q=80'
      ],
      headline: 'Drive First. Own Next. One Coach.',
      subheading: 'Premium Motor Driving School and Real Estate coaching by Michael Reynolds.',
      ctaDrivingText: '🚗 Driving School',
      ctaDrivingLink: '#/driving',
      ctaRealEstateText: '🏠 Real Estate Office',
      ctaRealEstateLink: '#/real-estate'
    },
    dualCards: {
      driving: {
        title: 'Safety Driving School',
        description: 'Master parallel parking, bypass merging, and pass your DMV practical exam with zero anxiety.',
        price: '299',
        buttonText: 'Explore Driving Packages',
        imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80'
      },
      realEstate: {
        title: 'Real Estate Agency',
        description: 'Acquiring property doesn\'t have to be intimidating. We help search, analyze, and negotiate residential purchases.',
        price: '450000',
        buttonText: 'Explore Property Listings',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
      }
    },
    ownerSpotlight: {
      name: 'Michael Reynolds',
      bio: 'Michael taught me parallel parking on Monday and negotiated $10,000 off my condo closing cost on Friday! Best multi-talented coach in Cityville.',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      buttonText: 'Learn More About Me',
      buttonLink: '#/about'
    }
  },
  drivingContent: {
    pricingPlans: [
      { id: 'pkg-1', name: 'Basic Safety Kickstart', price: 299, features: ['Pre-License Fundamentals', 'Behind-the-Wheel Prep', 'Basic Parking', 'Mock Trial'], buttonText: 'Book This Program' },
      { id: 'pkg-2', name: 'Advanced Highway Mastery', price: 499, features: ['All Basic inclusions', 'Highway Confidence', 'Hazard Avoidance', 'Reynolds Certificate'], buttonText: 'Book This Program' },
      { id: 'pkg-3', name: 'Complete "Drive to Own"', price: 899, features: ['All Advanced Inclusions', 'Manual & Auto training', 'Car Rental for Exam', 'Guaranteed Pass'], buttonText: 'Book This Program' }
    ],
    instructors: [
      { id: 'inst-1', name: 'Michael Reynolds', experience: '15+ Years', specialty: 'Defensive Driving & Parallel Parking Coach / Licensed Realtor', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', rating: 5 },
      { id: 'inst-2', name: 'Sarah Jenkins', experience: '8+ Years', specialty: 'Highway Confidence & Severe Weather Prep', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', rating: 5 },
      { id: 'inst-3', name: 'David Chen', experience: '6+ Years', specialty: 'DMV Practical Test Optimization', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', rating: 4.9 }
    ],
    testimonials: [
      { id: 'test-1', studentName: 'Jessica Porter', reviewText: 'Michael taught me parallel parking on Monday and negotiated $10,000 off my condo closing cost on Friday! Best multi-talented coach in Cityville.', rating: 5, date: 'April 2026' },
      { id: 'test-2', studentName: 'Marcus Vance', reviewText: 'I had driving anxiety on high-speed bypasses. Passed on my first attempt!', rating: 5, date: 'May 2026' }
    ],
    cta: { buttonText: 'Book a Free Trial Lesson', buttonLink: '#/contact' }
  },
  realEstateContent: {
    properties: [
      { id: 'prop-1', title: '2 BHK Downtown Condo', price: 180000, bedrooms: 2, bathrooms: 2, area: 1200, imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', description: 'Near Transit, Balcony Skyview, Rooftop Access', featured: true },
      { id: 'prop-2', title: '3 BHK with Double Garage', price: 250000, bedrooms: 3, bathrooms: 2, area: 1800, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', description: '2-Car Garage Included, Open Plan Kitchen, Fenced Backyard', featured: true },
      { id: 'prop-3', title: 'DualDrive Commercial Space', price: 450000, bedrooms: 0, bathrooms: 2, area: 2400, imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', description: 'High-Foot-Traffic Location, Renovated in 2025, Loading Bay', featured: false }
    ],
    mortgageSettings: { interestRate: 6.5, loanTermYears: 30, helpText: 'Adjust purchase price and details to see instant estimated monthly investments (EMI)' },
    cta: { buttonText: 'Schedule a Free Consultation', buttonLink: '#/contact' }
  }
};

export const AdminDashboard: React.FC = () => {
  const { user, loadingUser, firebaseReady, fbDB, fbAuth, toasts, removeToast, addToast, logAction } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [seeding, setSeeding] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication gate redirection
  useEffect(() => {
    if (!loadingUser && !user) {
      addToast("Unauthorized! Please sign in first.", "error");
      navigate('/admin/login');
    }
  }, [user, loadingUser, navigate]);

  // Lazy Seed fallback schemas
  useEffect(() => {
    if (!firebaseReady || !fbDB || !user) return;
    const seedIfEmpty = async () => {
      setSeeding(true);
      try {
        const hSnap = await fbDB.collection('homeContent').doc('main').get();
        if (!hSnap.exists) {
          await fbDB.collection('homeContent').doc('main').set(SEED_DATA.homeContent);
        }
        const dSnap = await fbDB.collection('drivingContent').doc('main').get();
        if (!dSnap.exists) {
          await fbDB.collection('drivingContent').doc('main').set(SEED_DATA.drivingContent);
        }
        const rSnap = await fbDB.collection('realEstateContent').doc('main').get();
        if (!rSnap.exists) {
          await fbDB.collection('realEstateContent').doc('main').set(SEED_DATA.realEstateContent);
        }
      } catch (e: any) {
        console.error("Auto seeding database metrics failed:", e);
      } finally {
        setSeeding(false);
      }
    };
    seedIfEmpty();
  }, [firebaseReady, fbDB, user]);

  const handleSignOut = async () => {
    if (!fbAuth) return;
    try {
      await logAction("Administrator session terminated manually.");
      await fbAuth.signOut();
      addToast("Session secured and logged out.", "success");
      navigate('/admin/login');
    } catch (e: any) {
      addToast("Logout request rejected: " + e.message, "error");
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-zinc-500 font-mono text-sm animate-pulse">
        <i className="fa-solid fa-spinner animate-spin text-[#ff6b35] mr-2"></i>
        <span>VERIFYING SECURITY TOKENS...</span>
      </div>
    );
  }

  if (!user) return null;

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-[#141414] text-zinc-300 flex flex-col md:flex-row relative">
      
      {/* Sidebar navigation */}
      <aside className="md:w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
            <span className="font-heading font-extrabold text-sm text-white tracking-widest uppercase">
              Admin <span className="text-[#ff6b35]">Portal</span>
            </span>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-zinc-400 hover:text-white"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          {/* Links list */}
          <nav className={`p-4 space-y-1.5 md:block ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
            <Link 
              to="/admin/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${currentPath === '/admin/dashboard' || currentPath === '/admin/dashboard/' ? 'bg-zinc-900 text-white border-l-2 border-orange-accent' : 'text-zinc-500 hover:text-white hover:bg-zinc-90 w hover:bg-zinc-900'}`}
            >
              <i className="fa-solid fa-gauge-high"></i>
              <span>Console Hub</span>
            </Link>

            <Link 
              to="home-content" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${currentPath.includes('home-content') ? 'bg-zinc-900 text-white border-l-2 border-orange-accent' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            >
              <i className="fa-solid fa-house-laptop"></i>
              <span>Homepage Layout</span>
            </Link>

            <Link 
              to="driving-school" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${currentPath.includes('driving-school') ? 'bg-zinc-900 text-white border-l-2 border-orange-accent' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            >
              <i className="fa-solid fa-car"></i>
              <span>Driving Academy</span>
            </Link>

            <Link 
              to="real-estate" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${currentPath.includes('real-estate') ? 'bg-zinc-900 text-white border-l-2 border-[#00b4d8]' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            >
              <i className="fa-solid fa-key"></i>
              <span>Property MLS</span>
            </Link>

            <Link 
              to="activity-logs" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${currentPath.includes('activity-logs') ? 'bg-zinc-900 text-white border-l-2 border-zinc-400' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            >
              <i className="fa-solid fa-terminal"></i>
              <span>Historical logs</span>
            </Link>
          </nav>
        </div>

        {/* Footer profile & logout */}
        <div className="p-4 border-t border-zinc-900 space-y-4">
          <div className="px-4 py-2 bg-zinc-900/60 rounded-xl border border-zinc-850">
            <span className="block text-[8px] font-mono tracking-widest text-zinc-500 uppercase">Operator Ident:</span>
            <span className="block text-xs font-bold text-white truncate">{user.email}</span>
          </div>

          <div className="flex gap-2">
            <Link 
              to="/" 
              className="flex-1 text-center py-2 px-3 border border-zinc-800 rounded-xl text-[10px] uppercase font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors min-h-[40px] flex items-center justify-center gap-1"
            >
              <i className="fa-solid fa-globe"></i>
              <span>Main Site</span>
            </Link>

            <button 
              onClick={handleSignOut} 
              className="flex-1 text-center py-2 px-3 bg-zinc-805 hover:bg-red-950/20 hover:text-red-400 rounded-xl text-[10px] uppercase font-bold hover:border hover:border-red-900/30 transition-colors min-h-[40px] flex items-center justify-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-power-off"></i>
              <span>Secure Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main workspace arena */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        <Routes>
          <Route index element={<DashboardHub seeding={seeding} />} />
          <Route path="home-content" element={<HomeContentManager />} />
          <Route path="driving-school" element={<DrivingManager />} />
          <Route path="real-estate" element={<RealEstateManager />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
        </Routes>
      </main>

      {/* Float Toasts Container bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none space-y-3 max-w-sm w-full">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border transition-all duration-300 animate-[slideIn_0.2s_ease-out] ${toast.type === 'success' ? 'bg-[#ff6b35]/15 text-[#ff6b35] border-[#ff6b35]/25' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}
          >
            <div className="pt-0.5">
              {toast.type === 'success' ? (
                <i className="fa-solid fa-circle-check text-md"></i>
              ) : (
                <i className="fa-solid fa-circle-exclamation text-md"></i>
              )}
            </div>
            <div className="flex-1 text-xs font-semibold leading-relaxed">
              {toast.message}
            </div>
            <button 
              onClick={() => removeToast(toast.id)} 
              className="text-zinc-500 hover:text-white transition-opacity shrink-0 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

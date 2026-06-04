import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Driving from './pages/Driving';
import RealEstate from './pages/RealEstate';
import About from './pages/About';
import Contact from './pages/Contact';
import { AnimatePresence, motion } from 'motion/react';

// ScrollToTop resets viewport scroll progress automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Fade transition wrapper for pristine micro-interactions
function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="flex-grow"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-zinc-400 font-sans selection:bg-[#00b4d8] selection:text-zinc-950">
        
        {/* Page 6: Shared Navigation Bar */}
        <Navbar />

        {/* Primary Page Route Content Section */}
        <div className="flex-grow flex flex-col justify-start relative">
          <Routes>
            <Route path="/" element={<RouteTransition><Home /></RouteTransition>} />
            <Route path="/driving" element={<RouteTransition><Driving /></RouteTransition>} />
            <Route path="/real-estate" element={<RouteTransition><RealEstate /></RouteTransition>} />
            <Route path="/about" element={<RouteTransition><About /></RouteTransition>} />
            <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
            
            {/* Catch-all fallback directly redirecting client pathing back home */}
            <Route path="*" element={<RouteTransition><Home /></RouteTransition>} />
          </Routes>
        </div>

        {/* Page 7: Shared footer with licenses & badge validations */}
        <Footer />

      </div>
    </HashRouter>
  );
}

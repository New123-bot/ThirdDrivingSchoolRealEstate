import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Car, Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-zinc-800 shadow-xl" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Section */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group" id="navbar-brand">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#00b4d8] p-0.5 shadow-lg relative overflow-hidden">
              <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center relative logo-spin">
                {/* Overlapping Key Icons or Road/Blueprint Icons */}
                <Car className="w-5 h-5 text-[#ff6b35] absolute -translate-x-1.5 -translate-y-1.5 transform group-hover:scale-110 transition-transform" />
                <Home className="w-5 h-5 text-[#00b4d8] absolute translate-x-1.5 translate-y-1.5 transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white m-0 leading-none">
                DUAL<span className="text-[#ff6b35]">DRIVE</span>
                <span className="text-[#00b4d8]">&</span> ESTATE
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 m-0">
                MICHAEL REYNOLDS COACHING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/driving', label: 'Driving School' },
              { path: '/real-estate', label: 'Real Estate' },
              { path: '/about', label: 'About Michael' },
              { path: '/contact', label: 'Get in Touch' },
            ].map((link) => (
              <NavLink
                key={link.path}
                id={`navlink-${link.path.replace('/', 'home')}`}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 relative
                  ${isActive 
                    ? 'text-white bg-zinc-800 border-b-2 border-t-2 border-transparent' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }
                `}
              >
                {({ isActive }) => (
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.path === '/driving' && <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]"></span>}
                    {link.path === '/real-estate' && <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]"></span>}
                    {link.label}
                    
                    {/* Visual bottom indicator for active tab */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#ff6b35] to-[#00b4d8]" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              className="ml-4 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase border border-zinc-700 hover:border-[#ff6b35] text-zinc-400 hover:text-white hover:bg-zinc-800/30 transition-all duration-300 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Admin
            </Link>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="flex md:hidden" id="mobile-toggle-btn">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#1e1e1e] border-b border-zinc-800 animate-fadeIn" id="mobile-menu">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {[
              { path: '/', label: 'Home Page' },
              { path: '/driving', label: '🚗 Driving School' },
              { path: '/real-estate', label: '🏠 Real Estate Business' },
              { path: '/about', label: '👤 Michael’s Biography' },
              { path: '/contact', label: '📞 Book & Contact' },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) => `
                  block px-4 py-3 rounded-lg text-base font-bold tracking-wide transition-all duration-150
                  ${isActive 
                    ? 'text-white bg-zinc-800 border-l-4 border-gradient' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {link.path === '/driving' && <span className="text-xs px-2 py-0.5 rounded bg-[#ff6b35]/20 text-[#ff6b35]">Driving Accent</span>}
                  {link.path === '/real-estate' && <span className="text-xs px-2 py-0.5 rounded bg-[#00b4d8]/20 text-[#00b4d8]">Estate Accent</span>}
                </div>
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg text-base font-bold tracking-wide text-zinc-400 hover:text-white hover:bg-zinc-800/40 border-t border-zinc-800 mt-2 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>🔒 Administrative Access</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

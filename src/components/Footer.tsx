import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 font-sans" id="app-footer">
      
      {/* Decorative Blueprint Accent Bar at Top of Footer */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ff6b35] via-zinc-800 to-[#00b4d8]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Philosophy summary */}
          <div className="flex flex-col gap-4" id="footer-branding">
            <span className="text-xl font-extrabold tracking-tight text-white">
              DUAL<span className="text-[#ff6b35]">DRIVE</span>
              <span className="text-[#00b4d8]">&</span> ESTATE
            </span>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              We guide you through the crucial journeys of life. Mastering the open highway and acquiring the perfect home keys—coached by one dual-licensed expert.
            </p>
            
            {/* Social Icons with Micro-Hover Effects */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ff6b35] hover:border-[#ff6b35] transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#00b4d8] hover:border-[#00b4d8] transition-all" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#ff6b35] hover:border-[#ff6b35] transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#00b4d8] hover:border-[#00b4d8] transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Directory Access Links */}
          <div className="flex flex-col gap-3" id="footer-links">
            <h3 className="text-white font-heading font-bold text-sm uppercase tracking-widest border-b border-zinc-800 pb-2">
              Services Directory
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>•</span> Home Office Dashboard
                </Link>
              </li>
              <li>
                <Link to="/driving" className="hover:text-[#ff6b35] transition-colors flex items-center gap-2">
                  <span className="text-[#ff6b35]">•</span> Driving Coach School
                </Link>
              </li>
              <li>
                <Link to="/real-estate" className="hover:text-[#00b4d8] transition-colors flex items-center gap-2">
                  <span className="text-[#00b4d8]">•</span> Prime Property Listings
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>•</span> About Michael Reynolds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>•</span> Book Trial Lesson & Consulation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Office Locations & Hours */}
          <div className="flex flex-col gap-3" id="footer-contacts">
            <h3 className="text-white font-heading font-bold text-sm uppercase tracking-widest border-b border-zinc-800 pb-2">
              Dual Headquarters
            </h3>
            <div className="text-sm space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff6b35] mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold text-zinc-300">Driving Academy:</span>
                  <span className="text-zinc-500">123 Test Track Ave, Cityville</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00b4d8] mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold text-zinc-300">Estate Office:</span>
                  <span className="text-zinc-500">456 Homeview Blvd, Cityville</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="text-zinc-400">+1 (555) 739-6537</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Badges & Legal Copyright Footer Section */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6" id="footer-regulatory">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-xs text-zinc-600 m-0 leading-normal">
              &copy; 2025 DualDrive & Estate. All global architectural and education rights reserved.
            </p>
            <p className="text-xs text-zinc-600 m-0 leading-normal">
              Fully compliant & certified in state residential real estate broker codes and driver safety programs.
            </p>
          </div>

          {/* Real Credentials Tags (Driving DL-882 & Real Estate RE-442) */}
          <div className="flex flex-wrap items-center justify-center gap-3" id="credential-badges">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 text-xs text-zinc-400 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#ff6b35]" />
              <span>Driving License <strong className="text-white font-mono">#DL-882</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 text-xs text-zinc-400 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#00b4d8]" />
              <span>Real Estate License <strong className="text-white font-mono">#RE-442</strong></span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

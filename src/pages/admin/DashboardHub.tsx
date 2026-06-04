import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardHubProps {
  seeding: boolean;
}

export const DashboardHub: React.FC<DashboardHubProps> = ({ seeding }) => {
  return (
    <div className="space-y-8 animate-fadeIn text-zinc-300">
      {/* Greeting Box */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-805 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b35]/5 rounded-bl-full pointer-events-none"></div>
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-white">DualDrive & Estate Control Console</h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-xl">Fully synced database management console for updates across all user interfaces, tracking modules, and listings.</p>
          {seeding && (
            <p className="text-xs text-orange-accent mt-2 font-mono flex items-center gap-1.5">
              <i className="fa-solid fa-spinner animate-spin"></i>
              Seeding default template database content...
            </p>
          )}
        </div>
        
        <Link to="home-content" className="bg-[#ff6b35] hover:bg-[#e05621] text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl flex items-center gap-2 min-h-[44px]">
          <span>Edit Homepage</span>
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 border border-zinc-805 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/15 text-[#ff6b35] flex items-center justify-center text-xl">
            <i className="fa-solid fa-car"></i>
          </div>
          <h3 className="font-heading font-bold text-white text-md">Driving School Track</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">Modify driver safety curriculum pricing, handle classroom and behind-the-wheel instructors database, and coordinate review testimonial arrays instantly.</p>
          <Link to="driving-school" className="text-xs text-orange-accent font-bold hover:underline inline-flex items-center gap-1">
            <span>Configure Education Portfolio</span>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </Link>
        </div>

        <div className="bg-zinc-900 p-6 border border-zinc-805 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#00b4d8]/15 text-[#00b4d8] flex items-center justify-center text-xl">
            <i className="fa-solid fa-building"></i>
          </div>
          <h3 className="font-heading font-bold text-white text-md">Real Estate Track</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">Control active property directories, set standard interest rates and parameters for the live mortgage analyzer, and update real estate client consulting paths.</p>
          <Link to="real-estate" className="text-xs text-teal-accent font-bold hover:underline inline-flex items-center gap-1">
            <span>Manage Properties</span>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </Link>
        </div>

        <div className="bg-zinc-900 p-6 border border-zinc-805 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-400 flex items-center justify-center text-xl">
            <i className="fa-solid fa-list-check"></i>
          </div>
          <h3 className="font-heading font-bold text-white text-md">Administrator Audit Trail</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">Review the last saved actions and operations logged chronologically by the principal broker to safeguard credentials integrity.</p>
          <Link to="activity-logs" className="text-zinc-400 font-bold hover:underline inline-flex items-center gap-1">
            <span>Browse Security Logs</span>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, ShieldCheck, FileText, ArrowRight, UserCheck } from 'lucide-react';
import { UserProfile } from '../types/resume';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: UserProfile;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, user, onOpenAuth }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c6ad9] to-[#4ab382] shadow-sm group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
            <span className="font-extrabold text-white text-lg tracking-tight">CS</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                CareerScore
              </span>
            </div>
            <p className="text-[11px] text-slate-500 tracking-wide hidden sm:block">Analyze. Improve. Get Hired.</p>
          </div>
        </div>

        {/* Center Navigation Shortcuts */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f4efff] border border-[#e5dcff] rounded-full px-3 py-1.5 shadow-inner">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              currentView === 'dashboard'
                ? 'bg-[#7c6ad9] text-white shadow-sm'
                : 'text-[#433a5c] hover:text-[#241d37] hover:bg-[#e8e1ff]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('analyzer')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              currentView === 'analyzer'
                ? 'bg-[#7c6ad9] text-white shadow-sm'
                : 'text-[#433a5c] hover:text-[#241d37] hover:bg-[#e8e1ff]'
            }`}
          >
            Resume Checker
          </button>
          <button
            onClick={() => onNavigate('builder')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              currentView === 'builder'
                ? 'bg-[#7c6ad9] text-white shadow-sm'
                : 'text-[#433a5c] hover:text-[#241d37] hover:bg-[#e8e1ff]'
            }`}
          >
            Resume Builder
          </button>
          <button
            onClick={() => onNavigate('templates')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              currentView === 'templates'
                ? 'bg-[#7c6ad9] text-white shadow-sm'
                : 'text-[#433a5c] hover:text-[#241d37] hover:bg-[#e8e1ff]'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              currentView === 'reports'
                ? 'bg-[#7c6ad9] text-white shadow-sm'
                : 'text-[#433a5c] hover:text-[#241d37] hover:bg-[#e8e1ff]'
            }`}
          >
            Reports
          </button>
        </nav>

        {/* Right Action Buttons & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('analyzer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#f4efff] text-[#433a5c] border border-[#e5dcff] hover:bg-[#ece4ff] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS Scan</span>
          </button>

          <button
            onClick={() => onNavigate('builder')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white shadow-md shadow-violet-200/80 hover:brightness-105 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Build Resume</span>
          </button>

          {/* User Profile Pill */}
          <div 
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group"
            title="Account & Cloud Sync"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c6ad9] to-[#34b77b] flex items-center justify-center text-xs font-semibold text-white shadow-inner group-hover:ring-2 group-hover:ring-violet-300 transition-all">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-700 group-hover:text-slate-900 leading-none">{user.name}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">{user.membershipPlan}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

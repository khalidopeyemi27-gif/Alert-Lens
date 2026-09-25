import React, { useState } from 'react';
import { Eye, History, Menu, X, Bot, ShieldCheck, AlertCircle, Home, ShieldAlert, Settings } from 'lucide-react';
import { AppPage } from '../types';

interface HeaderProps {
  currentPage: AppPage;
  onSelectPage: (page: AppPage) => void;
  historyCount: number;
  onOpenAskAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onSelectPage,
  historyCount,
  onOpenAskAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: AppPage) => {
    onSelectPage(page);
    setMobileMenuOpen(false);
  };

  const navItems: { id: AppPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'check', label: 'Check' },
    { id: 'history', label: 'History' },
    { id: 'safety', label: 'Safety' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D9E2EC] text-[#0B1220] shadow-xs">
      {/* Small top safety strip */}
      <div className="bg-[#0B1220] border-b border-slate-800 px-4 py-1.5 text-xs text-slate-200">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
            <span className="text-[12px] sm:text-xs tracking-tight">
              Never enter passwords, OTPs, PINs, BVN, card numbers, or recovery codes.
            </span>
          </div>
          <span className="hidden lg:inline-block text-[11px] text-[#06B6D4] font-semibold tracking-wide">
            AI-Assisted Digital Safety • Nigeria
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Eye className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl border border-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#0B1220]">
                  Alert Lens
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                  NG
                </span>
              </div>
              <p className="text-[11px] text-[#667085] font-medium tracking-normal hidden sm:block">
                See the warning signs before you act.
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  id={`header-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-[#2563EB] font-extrabold border border-blue-200/80 shadow-2xs'
                      : 'text-[#344054] hover:text-[#0B1220] hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'history' && historyCount > 0 && (
                    <span className="w-4.5 h-4.5 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center">
                      {historyCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              id="header-alert-ai-btn"
              onClick={onOpenAskAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-300 bg-cyan-50/70 hover:bg-cyan-100 text-xs font-bold text-[#0B1220] transition-all cursor-pointer shadow-2xs"
            >
              <Bot className="w-4 h-4 text-[#06B6D4]" />
              <span className="hidden sm:inline">Alert AI</span>
            </button>

            <button
              id="header-check-cta-btn"
              onClick={() => handleNavClick('check')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Check Now</span>
            </button>

            {/* Mobile menu button for small screens */}
            <button
              id="mobile-header-settings-btn"
              onClick={() => handleNavClick('settings')}
              aria-label="Open settings"
              className="md:hidden p-2 rounded-xl bg-slate-100 text-[#344054] border border-[#D9E2EC] hover:bg-slate-200"
            >
              <Settings className="w-4.5 h-4.5 text-[#344054]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


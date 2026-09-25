import React from 'react';
import { Eye, AlertCircle, ArrowUp } from 'lucide-react';
import { AppPage } from '../types';

interface FooterProps {
  onSelectPage: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1220] text-slate-300 border-t border-slate-800 pt-10 pb-20 sm:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
        {/* Col 1: Brand & Purpose */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold shadow-xs">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base text-white">Alert Lens</span>
              <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-blue-500/20 text-[#06B6D4] border border-[#06B6D4]/30">
                NG
              </span>
            </div>
          </div>
          <p className="text-xs text-[#06B6D4] font-medium italic mb-2">
            See the warning signs before you act.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
            A digital safety layer designed for consumers, students, job seekers, and entrepreneurs to evaluate suspicious messages, links, and online offers before taking action.
          </p>
        </div>

        {/* Col 2: Navigation shortcuts */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-100 mb-3">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>
              <button
                onClick={() => onSelectPage('home')}
                className="hover:text-[#06B6D4] transition-colors cursor-pointer"
              >
                🏠 Home & Safety Layer Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPage('check')}
                className="hover:text-[#06B6D4] transition-colors cursor-pointer"
              >
                🔎 Check a Message / Link
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPage('history')}
                className="hover:text-[#06B6D4] transition-colors cursor-pointer"
              >
                🕘 Recent Check History
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPage('safety')}
                className="hover:text-[#06B6D4] transition-colors cursor-pointer"
              >
                🛡️ Safety Center & Verification Guides
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPage('settings')}
                className="hover:text-[#06B6D4] transition-colors cursor-pointer"
              >
                ⚙️ Settings & Privacy Disclosures
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Disclaimers */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-100 mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Important Safety Notice</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Alert Lens NG is an independent safety layer. It evaluates risk signals to help users avoid fraud, but does not replace personal vigilance or formal institutional verification.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
        <p>© 2026 Alert Lens NG. See the warning signs before you act.</p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer font-bold"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

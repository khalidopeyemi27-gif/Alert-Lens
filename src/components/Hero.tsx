import React from 'react';
import { Eye, Search, Sparkles, BookOpen, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onCheckClick: () => void;
  onExploreDemoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckClick, onExploreDemoClick }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F9FC] to-[#F7F9FC] text-[#0B1220] pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#D9E2EC]"
    >
      {/* Subtle lens focus rings in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-blue-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-cyan-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-radial from-cyan-400/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-bold mb-6 shadow-2xs">
          <Eye className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Digital Safety Layer • Prototype Demonstration</span>
        </div>

        {/* Repositioned Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B1220] leading-tight mb-5">
          Detect suspicious messages <br className="hidden sm:inline" />
          <span className="text-[#2563EB] relative inline-block">
            before you act.
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-2 text-[#06B6D4]/40"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Repositioned Supporting Text */}
        <p className="text-base sm:text-lg text-[#344054] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Alert Lens acts as a digital safety layer designed to analyze incoming messages across <strong>WhatsApp, SMS, Email, and social channels</strong> before you open links, disclose credentials, or send money.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
          <button
            id="hero-check-primary-btn"
            onClick={onCheckClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-sm shadow-blue-600/25 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Test a Message</span>
          </button>

          <button
            id="hero-demo-secondary-btn"
            onClick={onExploreDemoClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#344054] hover:text-[#0B1220] border border-[#D9E2EC] font-bold text-sm sm:text-base shadow-2xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-300"
          >
            <BookOpen className="w-4 h-4 text-[#06B6D4]" />
            <span>Explore Simulated Scams</span>
          </button>
        </div>

        {/* Visual Product Flow Explanation */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs max-w-3xl mx-auto">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#667085] mb-3 text-center">
            How Alert Lens Protects You
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#0B1220]">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200">Message arrives</span>
            <span className="text-[#667085]">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-[#0891B2] border border-cyan-200">Alert Lens analyzes it</span>
            <span className="text-[#667085]">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">Warning signs explained</span>
            <span className="text-[#667085]">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">Recommendation</span>
            <span className="text-[#667085]">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 border border-red-200">Risky actions warned/blocked</span>
            <span className="text-[#667085]">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">Verify independently</span>
          </div>
        </div>
      </div>
    </section>
  );
};

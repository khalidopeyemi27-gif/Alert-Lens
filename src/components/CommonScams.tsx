import React from 'react';
import { COMMON_SCAM_TYPES } from '../data/mockAndResearch';
import { ShieldAlert, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const CommonScams: React.FC = () => {
  return (
    <section id="common-scams" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D9E2EC]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold mb-3 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Grounded in Research</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
          Common Scam Types in Nigeria
        </h2>
        <p className="text-sm text-[#667085] mt-2">
          Documented patterns and defense protocols based on exploratory research into Nigerian consumer fraud encounters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMMON_SCAM_TYPES.map((scam, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs hover:border-[#2563EB]/40 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {scam.surveyStat}
                </span>
                <span className="text-xs font-mono font-bold text-[#667085]">0{idx + 1}</span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#0B1220] mb-2">
                {scam.title}
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed mb-4">
                {scam.summary}
              </p>

              <div className="p-3 rounded-xl bg-red-50/40 border border-red-200/60 mb-4">
                <p className="text-[11px] font-bold text-[#DC3F50] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#DC3F50]" />
                  <span>Key Warning Signs:</span>
                </p>
                <ul className="space-y-1 text-xs text-[#344054]">
                  {scam.redFlags.map((flag, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="text-[#DC3F50] font-bold shrink-0">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/60">
              <span className="font-bold block text-[#159570] mb-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#159570]" />
                Recommended Defense:
              </span>
              <span className="text-[#0B1220] leading-relaxed">{scam.action}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

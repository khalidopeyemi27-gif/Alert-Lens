import React, { useState } from 'react';
import { DemoExample } from '../types';
import { SYNTHETIC_EXAMPLES } from '../data/mockAndResearch';
import { ArrowRight, AlertCircle, ShieldCheck, CheckCircle2, Eye, Sparkles } from 'lucide-react';

interface DemoSectionProps {
  onSelectDemo: (demo: DemoExample) => void;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ onSelectDemo }) => {
  const [filter, setFilter] = useState<'all' | 'scams' | 'legit'>('all');

  const filteredExamples =
    filter === 'all'
      ? SYNTHETIC_EXAMPLES
      : filter === 'legit'
      ? SYNTHETIC_EXAMPLES.filter((ex) => ex.expectedRisk === 'LOW')
      : SYNTHETIC_EXAMPLES.filter((ex) => ex.expectedRisk !== 'LOW');

  const getRiskLabelAndStyle = (demo: DemoExample) => {
    if (demo.expectedRisk === 'LOW') {
      return {
        label: 'Low Risk Test',
        pill: 'bg-emerald-50 text-[#159570] border border-emerald-200',
        cardBorder: 'border-emerald-300 bg-emerald-50/15 ring-1 ring-emerald-200',
        buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      };
    }
    if (demo.expectedRisk === 'CRITICAL') {
      return {
        label: 'Critical Risk',
        pill: 'bg-red-50 text-[#DC3F50] border border-red-200',
        cardBorder: 'border-[#D9E2EC] bg-white hover:border-red-300',
        buttonClass: 'bg-[#0B1220] hover:bg-[#2563EB] text-white',
      };
    }
    return {
      label: 'High Risk',
      pill: 'bg-amber-50 text-amber-800 border border-amber-200',
      cardBorder: 'border-[#D9E2EC] bg-white hover:border-blue-300',
      buttonClass: 'bg-[#0B1220] hover:bg-[#2563EB] text-white',
    };
  };

  return (
    <section id="demo-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D9E2EC]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold mb-3 shadow-2xs">
          <Eye className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Interactive Test Scenarios</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
          Demo Scenarios: 8 Realistic Tests
        </h2>
        <p className="text-sm text-[#667085] mt-2 max-w-xl mx-auto">
          Explore realistic synthetic scenarios based on common patterns in Nigeria. Click any card to load the content and inspect the warning signs immediately.
        </p>

        {/* Synthetic Demonstration Notice */}
        <div className="mt-4 inline-flex items-center gap-2 p-3 px-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 font-medium shadow-2xs text-left sm:text-center">
          <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
          <span>
            <strong>Synthetic Demonstration:</strong> All examples are fabricated educational simulations. No live phishing links, malware, or private account details are used.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 text-xs font-bold">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#0B1220] text-white shadow-2xs'
              : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
          }`}
        >
          All 8 Scenarios
        </button>
        <button
          onClick={() => setFilter('scams')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            filter === 'scams'
              ? 'bg-[#0B1220] text-white shadow-2xs'
              : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
          }`}
        >
          7 High/Critical Scams
        </button>
        <button
          onClick={() => setFilter('legit')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            filter === 'legit'
              ? 'bg-[#159570] text-white shadow-2xs'
              : 'bg-white text-[#159570] border border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          1 Low Risk Test (Legitimate Recruiter)
        </button>
      </div>

      {/* Grid of 8 Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredExamples.map((demo) => {
          const style = getRiskLabelAndStyle(demo);
          const isLegit = demo.expectedRisk === 'LOW';

          return (
            <div
              key={demo.id}
              onClick={() => onSelectDemo(demo)}
              className={`p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between cursor-pointer group ${style.cardBorder}`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-[#344054]">
                    {demo.type}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${style.pill}`}>
                    {style.label}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0B1220] mb-1.5 leading-snug group-hover:text-[#2563EB] transition-colors">
                  {demo.title}
                </h3>

                <p className="text-xs text-[#667085] mb-3 line-clamp-2 leading-relaxed">
                  {demo.description}
                </p>

                {/* Excerpt Box */}
                <div className="p-2.5 rounded-lg bg-[#F7F9FC] border border-[#D9E2EC] text-[11px] text-[#344054] font-mono line-clamp-3 mb-3 select-none">
                  {demo.content}
                </div>

                {isLegit && (
                  <div className="mb-3 p-2 rounded-lg bg-emerald-100/50 text-[11px] text-emerald-900 border border-emerald-200">
                    <strong>Notice:</strong> Low risk does not imply absolute safety; independent verification is always advised.
                  </div>
                )}
              </div>

              <div>
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#667085] mb-3">
                  <span className="truncate max-w-[130px]">{demo.category}</span>
                  <span className="font-semibold text-[#0B1220]">{demo.tag}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDemo(demo);
                  }}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs ${style.buttonClass}`}
                >
                  <span>Inspect Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

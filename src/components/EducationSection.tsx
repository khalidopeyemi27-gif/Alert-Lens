import React, { useState } from 'react';
import { SAFETY_EDUCATION_TOPICS, SafetyEducationTopic } from '../data/mockAndResearch';
import {
  BookOpen,
  HelpCircle,
  Brain,
  Search,
  CheckCircle2,
  ChevronRight,
  Eye,
  AlertTriangle,
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);

  const selectedTopic =
    SAFETY_EDUCATION_TOPICS.find((t) => t.id === selectedTopicId) || SAFETY_EDUCATION_TOPICS[0];

  return (
    <section id="education-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D9E2EC]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold mb-3 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Interactive Field Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
          7 Key Warning Signs to Inspect
        </h2>
        <p className="text-sm text-[#667085] mt-2 max-w-xl mx-auto">
          Understand what red flags look like in Nigeria, the psychological levers scammers exploit, and the exact steps to verify independently.
        </p>
      </div>

      {/* Main Interactive Guide Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 7 Warning Signs Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2 px-1">
            Select a Warning Sign to Inspect:
          </p>

          {SAFETY_EDUCATION_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1220] text-white border-[#0B1220] shadow-sm'
                    : 'bg-white text-[#344054] border-[#D9E2EC] hover:bg-slate-50 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#06B6D4] text-[#0B1220]'
                        : 'bg-slate-100 text-[#667085] group-hover:bg-blue-50 group-hover:text-[#2563EB]'
                    }`}
                  >
                    {topic.id}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-snug">
                      {topic.title}
                    </h4>
                    <span
                      className={`text-[11px] block mt-0.5 ${
                        isSelected ? 'text-slate-300' : 'text-[#667085]'
                      }`}
                    >
                      {topic.concept}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected
                      ? 'text-[#06B6D4] translate-x-0.5'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Inspector Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-7 shadow-xs relative overflow-hidden">
          {/* Subtle Lens Focus Ring in background */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-blue-100 pointer-events-none opacity-60" />
          <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full border border-cyan-100 pointer-events-none opacity-40" />

          {/* Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-blue-50 text-[#2563EB] text-xs font-black flex items-center justify-center">
                #{selectedTopic.id}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0B1220]">
                {selectedTopic.title}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#344054]">
              {selectedTopic.concept}
            </span>
          </div>

          <div className="space-y-5 relative z-10">
            {/* 1. What It Looks Like */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1220] flex items-center gap-1.5 mb-2">
                <Eye className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>1. What It Looks Like (Example Text or Scenario)</span>
              </h4>
              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-xs sm:text-sm text-[#0B1220] font-mono leading-relaxed">
                {selectedTopic.whatItLooksLike}
              </div>
            </div>

            {/* 2. Why It Works */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1220] flex items-center gap-1.5 mb-2">
                <Brain className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>2. Why It Works (The Psychological Lever)</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#344054] bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/70 leading-relaxed">
                {selectedTopic.whyItWorks}
              </p>
            </div>

            {/* 3. How to Verify Independently */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1220] flex items-center gap-1.5 mb-2">
                <Search className="w-3.5 h-3.5 text-[#159570]" />
                <span>3. How to Verify Independently</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#0B1220] bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/70 leading-relaxed">
                {selectedTopic.howToVerify}
              </p>
            </div>

            {/* Quick Takeaway Rule */}
            <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-[#344054]">
              <CheckCircle2 className="w-4 h-4 text-[#159570] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0B1220]">Takeaway Rule: </strong>
                <span>{selectedTopic.tip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

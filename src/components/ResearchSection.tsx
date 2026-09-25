import React, { useState } from 'react';
import { Users, AlertCircle, BarChart3, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { RESEARCH_FINDINGS } from '../data/mockAndResearch';

export const ResearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'findings' | 'threats' | 'demographics'>('findings');

  return (
    <section id="research-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#D9E2EC]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold mb-3 shadow-2xs">
          <Users className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>User Research Foundation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
          Research Findings & Methodology
        </h2>
        <p className="text-sm text-[#667085] mt-2">
          Empirical design grounded in an exploratory study of 16 Nigerian digital citizens.
        </p>
      </div>

      {/* Clear Distinction Banner: User Research vs Synthetic Demo Data */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-[#0B1220] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-[#2563EB] shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-[#0B1220] block mb-0.5">
                Research Distinction & Data Ethics
              </span>
              <p className="text-[#344054] leading-relaxed">
                <strong>User Research:</strong> Reflects preliminary survey findings from 16 Nigerian respondents regarding their lived experiences with digital fraud. <br />
                <strong>Demo Scenarios:</strong> Reflect safe, synthetic educational examples specifically crafted to illustrate those research findings without exposing live phishing links or credentials.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-blue-200 text-[#2563EB] shrink-0 self-start sm:self-auto">
            n = 16 Study
          </span>
        </div>
      </div>

      {/* 4 Core Key Findings Cards (Prominent, Reduced Visual Density) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Finding 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs">
          <div className="text-2xl sm:text-3xl font-black text-[#DC3F50] mb-1">
            100%
          </div>
          <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-2">
            Pervasive Threat Exposure
          </h4>
          <p className="text-xs text-[#667085] leading-relaxed">
            Every single surveyed Nigerian user reported encountering suspicious messages, deceptive offers, or fake accounts in their daily routine.
          </p>
        </div>

        {/* Finding 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs">
          <div className="text-2xl sm:text-3xl font-black text-[#2563EB] mb-1">
            4 Major
          </div>
          <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-2">
            Top Threat Categories
          </h4>
          <p className="text-xs text-[#667085] leading-relaxed">
            The most prevalent threats are fake investment schemes (50%), bank impersonation (44%), fake jobs (38%), and fraudulent loan apps (31%).
          </p>
        </div>

        {/* Finding 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs">
          <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] mb-1">
            56%
          </div>
          <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-2">
            Primary Warning Sign
          </h4>
          <p className="text-xs text-[#667085] leading-relaxed">
            The leading initial trigger was “too good to be true” promises (9/16), followed closely by unknown sender phone numbers and artificial urgent deadlines.
          </p>
        </div>

        {/* Finding 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs">
          <div className="text-2xl sm:text-3xl font-black text-[#159570] mb-1">
            Top Ask
          </div>
          <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-2">
            Requested Solutions
          </h4>
          <p className="text-xs text-[#667085] leading-relaxed">
            Users demanded an instant scam checker, plain-language explanations of why content is suspicious, and safe verification steps.
          </p>
        </div>
      </div>

      {/* Tabs for Detailed Breakdown */}
      <div className="flex items-center justify-center gap-2 mb-6 border-b border-[#D9E2EC] pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('findings')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'findings'
              ? 'bg-[#0B1220] text-white shadow-2xs'
              : 'text-[#344054] hover:bg-slate-100'
          }`}
        >
          Survey Insights & User Quotes
        </button>
        <button
          onClick={() => setActiveTab('threats')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'threats'
              ? 'bg-[#0B1220] text-white shadow-2xs'
              : 'text-[#344054] hover:bg-slate-100'
          }`}
        >
          Threat Prevalence Breakdown
        </button>
        <button
          onClick={() => setActiveTab('demographics')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'demographics'
              ? 'bg-[#0B1220] text-white shadow-2xs'
              : 'text-[#344054] hover:bg-slate-100'
          }`}
        >
          Sample Demographics (n=16)
        </button>
      </div>

      {/* Tab 1: Findings & Quotes */}
      {activeTab === 'findings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs">
            <span className="text-[11px] font-extrabold uppercase text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Core User Dilemma
            </span>
            <h4 className="text-base font-black text-[#0B1220] mt-2 mb-1">
              “How do you know it’s legitimate when it looks real?”
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed mb-4">
              56% of respondents (9 of 16) noted that scammers use convincing branding, authentic-looking logos, and formal corporate diction, making human spot-checks unreliable without tools.
            </p>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-[#344054] uppercase block">
                Primary Triggers Users Look For:
              </span>
              <div className="flex items-center justify-between text-xs text-[#344054] py-1 border-b border-slate-100">
                <span>Too-good-to-be-true rewards or prices</span>
                <span className="font-black text-[#0B1220]">9 / 16 (56%)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#344054] py-1 border-b border-slate-100">
                <span>Unknown / unexpected phone numbers</span>
                <span className="font-black text-[#0B1220]">3 / 16 (19%)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#344054] py-1">
                <span>Artificial deadlines & urgent account freeze threats</span>
                <span className="font-black text-[#0B1220]">2 / 16 (13%)</span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs">
            <span className="text-[11px] font-extrabold uppercase text-[#159570] bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Direct Participant Needs
            </span>
            <h4 className="text-base font-black text-[#0B1220] mt-2 mb-1">
              What Would Make You Feel Safer Online?
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed mb-3">
              Direct verbatim answers gathered during participant interviews:
            </p>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-xs text-[#344054] italic">
                “A genuine way of knowing if a message or link is real before clicking.”
              </div>
              <div className="p-2.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-xs text-[#344054] italic">
                “A way to verify social media sellers and online job recruiters before sending money.”
              </div>
              <div className="p-2.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-xs text-[#344054] italic">
                “Clear explanations of why something is suspicious, not just a vague blocked warning.”
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Threats Breakdown */}
      {activeTab === 'threats' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-bold text-[#0B1220]">
                Prevalence of Scam Types Reported by Respondents
              </h4>
              <p className="text-xs text-[#667085]">
                Percentage of surveyed participants who encountered each specific threat in Nigeria.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#344054] self-start sm:self-auto">
              Sample n = 16
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {RESEARCH_FINDINGS.suspiciousActivities.map((item, idx) => {
              const pct = Math.round((item.count / 16) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#0B1220]">{item.name}</span>
                    <span className="text-[#667085]">{item.count} respondents ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Demographics */}
      {activeTab === 'demographics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#D9E2EC] shadow-2xs">
            <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-3">
              Age Cohort
            </h4>
            <div className="space-y-2 text-xs">
              {RESEARCH_FINDINGS.demographics.age.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#344054]">
                  <span>{item.label}</span>
                  <span className="font-bold text-[#0B1220]">{item.count} ({item.percent}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#D9E2EC] shadow-2xs">
            <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-3">
              Occupation
            </h4>
            <div className="space-y-2 text-xs">
              {RESEARCH_FINDINGS.demographics.occupation.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#344054]">
                  <span>{item.label}</span>
                  <span className="font-bold text-[#0B1220]">{item.count} ({item.percent}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#D9E2EC] shadow-2xs">
            <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-3">
              Internet Daily Usage
            </h4>
            <div className="space-y-2 text-xs">
              {RESEARCH_FINDINGS.demographics.usage.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#344054]">
                  <span>{item.label}</span>
                  <span className="font-bold text-[#0B1220]">{item.count} ({item.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

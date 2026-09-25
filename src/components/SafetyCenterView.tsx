import React, { useState } from 'react';
import { ShieldAlert, Search, Lock, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';
import { EducationSection } from './EducationSection';
import { CommonScams } from './CommonScams';
import { SafetyTutorials } from './SafetyTutorials';

export const SafetyCenterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'guides' | 'scams' | 'concepts'>('tutorials');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#D9E2EC] pb-5">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5 text-[#2563EB]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
            🛡️ Safety Center
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#667085] font-medium max-w-xl">
          Learn how to recognize warning signs, verify claims independently, and handle suspicious messages safely.
        </p>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 flex-wrap">
          <button
            id="safety-tab-tutorials"
            onClick={() => setActiveTab('tutorials')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tutorials'
                ? 'bg-[#2563EB] text-white shadow-2xs'
                : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Safety Tutorials (8 Scenarios)</span>
          </button>
          <button
            id="safety-tab-guides"
            onClick={() => setActiveTab('guides')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'guides'
                ? 'bg-[#2563EB] text-white shadow-2xs'
                : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Verification & Safety Rules
          </button>
          <button
            id="safety-tab-scams"
            onClick={() => setActiveTab('scams')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'scams'
                ? 'bg-[#2563EB] text-white shadow-2xs'
                : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Common Scam Types
          </button>
          <button
            id="safety-tab-concepts"
            onClick={() => setActiveTab('concepts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'concepts'
                ? 'bg-[#2563EB] text-white shadow-2xs'
                : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
            }`}
          >
            Core Safety Concepts
          </button>
        </div>
      </div>

      {activeTab === 'tutorials' && (
        <div className="animate-in fade-in duration-200">
          <SafetyTutorials onBackToSafetyCenter={() => setActiveTab('guides')} />
        </div>
      )}

      {activeTab === 'guides' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Section 1: Common Warning Signs */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#0B1220]">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-extrabold">⚠️ Common Warning Signs</h3>
            </div>
            <p className="text-xs text-[#667085]">
              Watch out for these high-risk indicators when receiving unsolicited messages:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">1. Unexpected Requests for Money</div>
                <p className="text-[#667085]">Demanding upfront payment for jobs, bursaries, delivery fees, or prize clearance.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">2. Credential Demands</div>
                <p className="text-[#667085]">Asking for passwords, PINs, OTPs, BVN, NIN, or full debit card numbers.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">3. Artificial Urgency & Pressure</div>
                <p className="text-[#667085]">Claiming your account will be blocked or offer revoked within 2 hours if you don't act immediately.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">4. Unusually Good Offers</div>
                <p className="text-[#667085]">Promises of free student grants, double-your-money investments, or unapplied job selections.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">5. Suspicious Domain Names</div>
                <p className="text-[#667085]">Using lookalike URLs (e.g. zenith-upgrade-port.com instead of official zenithbank.com).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">6. Channel Switching Requests</div>
                <p className="text-[#667085]">Asking to move official correspondence from email or portals to private Telegram or WhatsApp numbers.</p>
              </div>
            </div>
          </section>

          {/* Section 2: How to Verify */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#0B1220]">
              <Search className="w-5 h-5 text-[#2563EB]" />
              <h3 className="text-lg font-extrabold">🔎 How to Verify Independently</h3>
            </div>
            <p className="text-xs text-[#667085]">
              Always verify suspicious claims without using the message itself:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[#0B1220] block mb-0.5">Don't use links or phone numbers in the message</strong>
                  <p className="text-[#344054]">Scammers create fake websites and customer care lines that mirror official services.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[#0B1220] block mb-0.5">Open the official website or mobile app independently</strong>
                  <p className="text-[#344054]">Type the official portal address directly into a new browser tab or open your existing mobile app.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[#0B1220] block mb-0.5">Check official public announcements</strong>
                  <p className="text-[#344054]">Look for bursary notices, exam schedules, or service upgrades directly on the verified news portal.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-[#0B1220] block mb-0.5">Use independently obtained contact details</strong>
                  <p className="text-[#344054]">Call the customer service number printed on the back of your physical bank card or official portal contact page.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Information You Should Never Share */}
          <section className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-amber-950">
              <Lock className="w-5 h-5 text-amber-700" />
              <h3 className="text-lg font-extrabold">🔐 Information You Should Never Share</h3>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs text-[#344054] space-y-2 leading-relaxed">
              <p className="font-bold text-[#0B1220]">
                Never disclose these credentials to anyone asking via message, phone call, or email:
              </p>
              <ul className="list-disc pl-5 space-y-1 font-medium">
                <li>Your account passwords or PINs</li>
                <li>One-Time Passwords (OTPs) sent to your mobile phone</li>
                <li>Bank Verification Number (BVN) or National Identification Number (NIN)</li>
                <li>Full 16-digit debit card numbers, expiry dates, or CVV security codes</li>
                <li>Account recovery codes or security question answers</li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-[#667085]">
                <strong>Important Note:</strong> A legitimate service may generate an OTP when you initiate an action yourself on an official portal. However, legitimate bank officers, lecturers, or company agents will <strong>never ask you to verbally state or send your OTP</strong> to them.
              </div>
            </div>
          </section>

          {/* Section 4: If You Think You've Been Scammed */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#0B1220]">
              <CheckCircle2 className="w-5 h-5 text-[#159570]" />
              <h3 className="text-lg font-extrabold">🚨 If You Think You've Been Scammed</h3>
            </div>
            <p className="text-xs text-[#667085]">
              If you inadvertently clicked a suspicious link or provided details, take these calm, practical steps:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">1. Stop All Communication</div>
                <p className="text-[#667085]">Do not send any additional money or reply to further demands.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">2. Contact Your Bank Immediately</div>
                <p className="text-[#667085]">If financial details or card numbers were shared, call your bank's verified helpline to block your card/account.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">3. Change Compromised Passwords</div>
                <p className="text-[#667085]">Reset passwords on your official email, banking app, or student portal directly.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1">
                <div className="font-bold text-[#0B1220]">4. Report & Retain Evidence</div>
                <p className="text-[#667085]">Report the account on the messaging platform and save screenshots, messages, and bank transaction receipts.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'scams' && (
        <div className="animate-in fade-in duration-200">
          <CommonScams />
        </div>
      )}

      {activeTab === 'concepts' && (
        <div className="animate-in fade-in duration-200">
          <EducationSection />
        </div>
      )}
    </div>
  );
};

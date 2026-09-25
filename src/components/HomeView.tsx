import React from 'react';
import { Eye, ShieldCheck, ShieldAlert, ArrowRight, History, CheckCircle2, Lock, Building2 } from 'lucide-react';
import { CheckHistoryItem, AppPage } from '../types';

interface HomeViewProps {
  onGoToCheck: () => void;
  onNavigatePage: (page: AppPage) => void;
  recentHistory: CheckHistoryItem[];
  onSelectHistoryItem: (item: CheckHistoryItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onGoToCheck,
  onNavigatePage,
  recentHistory,
  onSelectHistoryItem,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F9FC] to-[#F7F9FC] text-[#0B1220] pt-12 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#D9E2EC]">
        {/* Subtle background rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-bold mb-6 shadow-2xs">
            <Eye className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Alert Lens • Digital Safety Layer</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B1220] leading-tight mb-4">
            Alert Lens
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl font-bold text-[#2563EB] mb-4">
            A digital safety layer for suspicious messages, links, and online offers.
          </p>

          {/* Explanation */}
          <p className="text-sm sm:text-base text-[#344054] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Analyze a suspicious message, understand what it is asking you to do, and get clear guidance before you act.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
            <button
              id="home-primary-check-btn"
              onClick={onGoToCheck}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base shadow-md shadow-blue-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-98"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>🔎 Check a Message</span>
            </button>
          </div>

          {/* Short Safety Reminder */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium max-w-xl mx-auto flex items-center gap-3 text-left shadow-2xs">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <p>
              <strong>Safety Reminder:</strong> Never enter passwords, PINs, OTPs, BVN, or card details in response to unsolicited callers or messages.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Visual Product Flow Diagram */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#667085] mb-4 text-center">
            How Alert Lens Protects You
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-semibold text-center">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 flex flex-col items-center justify-center">
              <span>1. Message arrives</span>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 text-[#0891B2] border border-cyan-200 flex flex-col items-center justify-center">
              <span>2. Alert Lens analyzes it</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex flex-col items-center justify-center">
              <span>3. Warning signs explained</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 flex flex-col items-center justify-center">
              <span>4. Recommendation</span>
            </div>
            <div className="p-2.5 rounded-xl bg-red-50 text-red-800 border border-red-200 flex flex-col items-center justify-center">
              <span>5. Risky actions blocked</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex flex-col items-center justify-center">
              <span>6. Verify independently</span>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#D9E2EC] space-y-2 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0B1220] text-base">Detect Warning Signs</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Identifies pressure tactics, unsolicited fee demands, domain impersonation, and credential traps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#D9E2EC] space-y-2 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-[#0891B2] flex items-center justify-center font-bold mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0B1220] text-base">Scam Procedure Protection</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Breaks down the sequence of actions being asked (e.g. log into portal, disclose BVN, enter OTP) before you act.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#D9E2EC] space-y-2 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0B1220] text-base">Independent Verification</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Provides direct 4-step pathways to verify claims using official portals without clicking suspicious links.
            </p>
          </div>
        </div>

        {/* Recent Check Preview (if history exists) */}
        {recentHistory.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4.5 h-4.5 text-[#2563EB]" />
                <h3 className="font-extrabold text-[#0B1220] text-base">Recent Checks</h3>
              </div>
              <button
                id="home-view-all-history-btn"
                onClick={() => onNavigatePage('history')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All History ({recentHistory.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentHistory.slice(0, 3).map((item) => {
                const isHigh = item.riskLevel === 'CRITICAL' || item.riskLevel === 'HIGH';
                const isMed = item.riskLevel === 'MEDIUM';

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectHistoryItem(item)}
                    className="p-3.5 rounded-xl border border-[#D9E2EC] hover:border-[#2563EB] hover:bg-blue-50/20 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-bold text-[10px] px-2 py-0.5 rounded-full border ${
                            isHigh
                              ? 'bg-red-50 text-[#DC3F50] border-red-200'
                              : isMed
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-[#159570] border-emerald-200'
                          }`}
                        >
                          {item.riskLevel}
                        </span>
                        <span className="font-bold text-[#0B1220] truncate">
                          {item.threatCategory}
                        </span>
                      </div>
                      <p className="text-[#667085] truncate font-mono text-[11px]">
                        "{item.inputSnippet || item.snippet}"
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-[#2563EB] flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

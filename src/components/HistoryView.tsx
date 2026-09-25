import React, { useState } from 'react';
import { CheckHistoryItem, AnalysisResult } from '../types';
import { History, Trash2, ArrowUpRight, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { HistoryQuickViewModal, getChannelIndicator } from './HistoryQuickViewModal';

interface HistoryViewProps {
  history: CheckHistoryItem[];
  onSelectHistoryItem: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onGoToCheck: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
  onGoToCheck,
}) => {
  const [quickViewItem, setQuickViewItem] = useState<CheckHistoryItem | null>(null);

  // Relative date formatter
  const getRelativeDate = (timestamp: number) => {
    const now = new Date();
    const itemDate = new Date(timestamp);
    const diffHours = (now.getTime() - itemDate.getTime()) / (1000 * 3600);

    if (diffHours < 24 && now.getDate() === itemDate.getDate()) {
      return 'Today';
    }
    if (diffHours < 48 && (now.getDate() - itemDate.getDate() === 1 || now.getDate() - itemDate.getDate() === -30)) {
      return 'Yesterday';
    }
    return itemDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9E2EC] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <History className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
              🕘 Recent Checks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#667085] font-medium">
            Review past analyzed messages, risk findings, and verification guidance.
          </p>
        </div>

        {history.length > 0 && (
          <button
            id="history-view-clear-btn"
            onClick={onClearHistory}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[#DC3F50] hover:bg-red-50 border border-red-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Privacy Banner */}
      <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-extrabold text-[#92400E]">Privacy & Data Safety: </span>
          Alert Lens stores your recent check records locally inside your browser session for easy reference. Passwords, PINs, OTPs, BVNs, and sensitive secrets are <strong>never</strong> stored.
        </div>
      </div>

      {/* List of past checks */}
      <div className="space-y-3">
        {history.length > 0 ? (
          history.map((item) => {
            const isHigh = item.riskLevel === 'CRITICAL' || item.riskLevel === 'HIGH';
            const isMed = item.riskLevel === 'MEDIUM';
            const channelInfo = getChannelIndicator(item);

            return (
              <div
                key={item.id}
                onClick={() => setQuickViewItem(item)}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9E2EC] hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Subtle Channel Indicator */}
                    {channelInfo && (
                      <span className="text-[11px] font-bold text-[#344054] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1">
                        <span>{channelInfo.icon}</span>
                        <span>{channelInfo.label}</span>
                      </span>
                    )}

                    {/* Risk Badge */}
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        isHigh
                          ? 'bg-red-50 text-[#DC3F50] border-red-200'
                          : isMed
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-[#159570] border-emerald-200'
                      }`}
                    >
                      {isHigh ? (
                        <ShieldAlert className="w-3 h-3" />
                      ) : (
                        <ShieldCheck className="w-3 h-3" />
                      )}
                      <span>{item.riskLevel} ({item.riskScore}/100)</span>
                    </span>

                    {/* Category */}
                    <span className="text-xs font-bold text-[#0B1220]">
                      {item.threatCategory}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#344054] font-mono bg-[#F7F9FC] p-2.5 rounded-lg border border-[#D9E2EC] line-clamp-2 italic">
                    "{item.inputSnippet || item.snippet}"
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-[#667085] font-medium">
                    <span>{getRelativeDate(item.timestamp)}</span>
                    <span>•</span>
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center flex items-center gap-2">
                  <button
                    id={`quick-view-history-item-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewItem(item);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#344054] font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Quick View</span>
                  </button>

                  <button
                    id={`view-history-item-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.fullResult) {
                        onSelectHistoryItem(item.fullResult);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Full Analysis</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D9E2EC] space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#667085] flex items-center justify-center mx-auto">
              <History className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1220]">No checks yet</h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto mt-1 leading-relaxed">
                Analyze a suspicious message, link, or offer to see your saved analysis results and verification guidance here.
              </p>
            </div>
            <button
              id="history-empty-check-cta-btn"
              onClick={onGoToCheck}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Check a Message Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile & Desktop Quick View Modal */}
      {quickViewItem && (
        <HistoryQuickViewModal
          item={quickViewItem}
          onClose={() => setQuickViewItem(null)}
          onSelectFullAnalysis={onSelectHistoryItem}
        />
      )}
    </div>
  );
};


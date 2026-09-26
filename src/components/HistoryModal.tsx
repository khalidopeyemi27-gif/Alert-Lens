import React from 'react';
import { CheckHistoryItem, AnalysisResult } from '../types';
import { X, History, Trash2, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { getChannelIndicator } from './HistoryQuickViewModal';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: CheckHistoryItem[];
  onSelectHistoryItem: (result: AnalysisResult) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/75 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#D9E2EC] overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D9E2EC] flex items-center justify-between bg-[#F7F9FC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1220]">
                Local Check History
              </h3>
              <p className="text-xs text-[#667085]">
                Stored locally in this browser session for privacy.
              </p>
            </div>
          </div>

          <button
            id="close-history-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#667085] hover:text-[#0B1220] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Note */}
        <div className="px-5 py-2 bg-amber-50 border-b border-amber-200/70 text-[11px] text-amber-900 flex items-center gap-2 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
          <span>
            <strong>Privacy Note:</strong> Alert Lens NG never stores passwords, OTPs, PINs, or bank card details.
          </span>
        </div>

        {/* List of checks */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {history.length > 0 ? (
            history.map((item) => {
              const isHigh = item.riskLevel === 'CRITICAL' || item.riskLevel === 'HIGH';
              const isMed = item.riskLevel === 'MEDIUM';
              const channelInfo = getChannelIndicator(item);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.fullResult) {
                      onSelectHistoryItem(item.fullResult);
                      onClose();
                    }
                  }}
                  className="p-3.5 rounded-xl border border-[#D9E2EC] hover:border-[#2563EB] hover:bg-blue-50/20 transition-all cursor-pointer group flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {channelInfo && (
                        <span className="text-[10px] font-bold text-[#344054] px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                          {channelInfo.icon} {channelInfo.label}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isHigh
                            ? 'bg-red-50 text-[#DC3F50] border-red-200'
                            : isMed
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-[#159570] border-emerald-200'
                        }`}
                      >
                        {item.riskLevel}
                      </span>
                      <span className="text-[11px] font-bold text-[#0B1220]">
                        {item.threatCategory}
                      </span>
                    </div>

                    <p className="text-xs text-[#344054] line-clamp-2 italic font-mono">
                      "{item.inputSnippet || item.snippet}..."
                    </p>

                    <span className="text-[10px] text-[#667085] mt-1 block font-medium">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="shrink-0 pt-1">
                    <span className="text-xs font-bold text-[#2563EB] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-[#667085]">
              <History className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-[#0B1220]">No checks yet</p>
              <p className="text-xs text-[#667085] mt-1">
                Any messages, links, or offers you check will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-3.5 border-t border-[#D9E2EC] bg-[#F7F9FC] flex items-center justify-between text-xs font-bold">
          <button
            id="clear-all-history-btn"
            onClick={onClearHistory}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#DC3F50] hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>

          <button
            id="close-history-bottom-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0B1220] text-white font-bold hover:bg-slate-850 transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

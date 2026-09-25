import React from 'react';
import { CheckHistoryItem, AnalysisResult } from '../types';
import { X, ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';

interface HistoryQuickViewModalProps {
  item: CheckHistoryItem | null;
  onClose: () => void;
  onSelectFullAnalysis: (result: AnalysisResult) => void;
}

export const getChannelIndicator = (item: CheckHistoryItem): { label: string; icon: string } | null => {
  if (item.channel) {
    const c = item.channel.toLowerCase();
    if (c.includes('whatsapp')) return { label: 'WhatsApp', icon: '💬' };
    if (c.includes('email')) return { label: 'Email', icon: '✉️' };
    if (c.includes('sms')) return { label: 'SMS', icon: '📱' };
    if (c.includes('website') || c.includes('site') || c.includes('url')) return { label: 'Website', icon: '🌐' };
    if (c.includes('social')) return { label: 'Social Media', icon: '📱' };
    return { label: item.channel, icon: '💬' };
  }

  if (item.inputType === 'email') return { label: 'Email', icon: '✉️' };
  if (item.inputType === 'social_media') return { label: 'Social Media', icon: '📱' };
  if (item.inputType === 'link') return { label: 'Website', icon: '🌐' };

  // If channel is unknown, return default "Message" tag
  return { label: 'Message', icon: '📩' };
};

export const HistoryQuickViewModal: React.FC<HistoryQuickViewModalProps> = ({
  item,
  onClose,
  onSelectFullAnalysis,
}) => {
  if (!item) return null;

  const result = item.fullResult;
  const channelInfo = getChannelIndicator(item);

  const isHigh = item.riskLevel === 'CRITICAL' || item.riskLevel === 'HIGH';
  const isMed = item.riskLevel === 'MEDIUM';

  const riskLabel = isHigh ? '🔴 HIGH RISK' : isMed ? '🟡 BE CAREFUL' : '🟢 NO MAJOR WARNING SIGNS';

  // Extract requested actions if available from procedure detection
  const procedureActions =
    result?.procedureDetection?.actions ||
    result?.procedure_detection?.actions ||
    [];

  // Fallback requested actions list if no explicit procedure actions exist
  const requestedActionsList = procedureActions.length > 0
    ? procedureActions.map((a) => a.label || a.evidence || a.reason)
    : result?.redFlags && result.redFlags.length > 0
    ? result.redFlags.slice(0, 3).map((f) => f.title)
    : ['Review requested content for credential or payment demands'];

  // Summary why flagged
  const whyFlagged =
    result?.summary ||
    result?.procedureDetection?.why_this_matters_summary ||
    'The content contains patterns commonly associated with unsolicited requests or potential fraud.';

  // Recommended action
  const recommendedActionText =
    result?.recommendedActions && result.recommendedActions.length > 0
      ? result.recommendedActions[0].detail
      : result?.actionDecision === 'STOP'
      ? 'Do not interact with this message or click any links.'
      : 'Verify claims independently through official portals before taking any action.';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-[#D9E2EC] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D9E2EC] flex items-center justify-between bg-[#F7F9FC]">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-black px-3 py-1 rounded-full border ${
                isHigh
                  ? 'bg-red-50 text-[#DC3F50] border-red-200'
                  : isMed
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-[#159570] border-emerald-200'
              }`}
            >
              {riskLabel}
            </span>
            {channelInfo && (
              <span className="text-xs font-bold text-[#344054] px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                {channelInfo.icon} {channelInfo.label}
              </span>
            )}
          </div>

          <button
            id="quick-view-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 text-[#667085] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#0B1220]">
          {/* Title / Threat Category */}
          <div>
            <h3 className="text-base font-black text-[#0B1220] tracking-tight">
              {item.threatCategory || 'Suspicious Content Analysis'}
            </h3>
            <p className="text-[11px] text-[#667085] font-medium mt-0.5">
              Analyzed on {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>

          {/* Short Message Preview */}
          <div className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] block mb-1">
              Message Preview
            </span>
            <p className="font-mono text-[#344054] italic leading-relaxed line-clamp-3">
              "{item.inputSnippet || item.snippet}"
            </p>
          </div>

          {/* What this message asks you to do */}
          <div className="space-y-1.5">
            <strong className="text-xs font-black text-[#0B1220] uppercase tracking-wider block">
              This message asks you to:
            </strong>
            <ul className="space-y-1.5 pl-1">
              {requestedActionsList.slice(0, 4).map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#344054] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why it was flagged */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-amber-950">
            <strong className="text-xs font-black text-amber-900 block">
              Why it was flagged:
            </strong>
            <p className="text-xs leading-relaxed font-medium">
              {whyFlagged}
            </p>
          </div>

          {/* Recommended action */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-blue-950">
            <strong className="text-xs font-black text-[#2563EB] block">
              Recommended Action:
            </strong>
            <p className="text-xs leading-relaxed font-bold text-[#0B1220]">
              {recommendedActionText}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-[#D9E2EC] bg-white">
          <button
            id="quick-view-full-analysis-btn"
            onClick={() => {
              onClose();
              if (result) {
                onSelectFullAnalysis(result);
              }
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Full Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

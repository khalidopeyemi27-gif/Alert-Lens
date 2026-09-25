import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Search,
  ExternalLink,
  Quote,
  Lock,
  X,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { AnalysisResult, ProtectionDecision } from '../types';
import { UrlIntelligenceCard } from './UrlIntelligenceCard';

interface ProtectionInterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  decision?: ProtectionDecision;
  analysisResult?: AnalysisResult;
  onVerifyOfficial?: () => void;
  targetUrl?: string;
}

export const ProtectionInterstitialModal: React.FC<ProtectionInterstitialModalProps> = ({
  isOpen,
  onClose,
  decision,
  analysisResult,
  onVerifyOfficial,
  targetUrl,
}) => {
  const [showOverrideConfirm, setShowOverrideConfirm] = useState(false);

  if (!isOpen) return null;

  const protDecision = decision || analysisResult?.protectionDecision;
  const action = protDecision?.action || 'BLOCK';
  const interceptedUrl = targetUrl || protDecision?.interceptedUrl;
  const domain = protDecision?.domain || (interceptedUrl ? new URL(interceptedUrl.startsWith('http') ? interceptedUrl : 'https://' + interceptedUrl).hostname : undefined);

  const isBlock = action === 'BLOCK';
  const isWarn = action === 'WARN';
  const isAllow = action === 'ALLOW';

  const redFlags = analysisResult?.redFlags || [];
  const primaryEvidence = analysisResult?.evidence?.[0] || redFlags[0]?.exactEvidence || analysisResult?.summary;

  const handleProceedAnyway = () => {
    if (interceptedUrl) {
      window.open(interceptedUrl.startsWith('http') ? interceptedUrl : 'https://' + interceptedUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Header Status Bar */}
        <div
          className={`px-6 py-5 flex items-center justify-between text-white ${
            isBlock
              ? 'bg-[#DC3F50]'
              : isWarn
              ? 'bg-[#F59E0B] text-slate-950'
              : 'bg-[#159570]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isBlock
                  ? 'bg-white/20 text-white'
                  : isWarn
                  ? 'bg-slate-950/20 text-slate-950'
                  : 'bg-white/20 text-white'
              }`}
            >
              {isBlock ? (
                <ShieldAlert className="w-6 h-6" />
              ) : isWarn ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold opacity-90 block">
                Alert Lens Application Safety System
              </span>
              <h3 className="text-lg font-bold leading-tight">
                {isBlock
                  ? 'NAVIGATION BLOCKED — High Risk Interception'
                  : isWarn
                  ? 'SAFETY WARNING — Independent Verification Advised'
                  : 'LOW RISK — Standard Caution Recommended'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Reason Notice */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {protDecision?.reason ||
                'Alert Lens NG safety engine intercepted this action to protect your credentials, financial balance, and personal data from unverified external exposure.'}
            </p>
          </div>

          {/* Intercepted Destination / Domain */}
          {interceptedUrl && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                <span className="text-xs font-bold uppercase tracking-wider text-red-800 block mb-1">
                  Intercepted Destination URL
                </span>
                <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-red-200 text-xs font-mono text-red-950 break-all">
                  <span>{interceptedUrl}</span>
                  {domain && (
                    <span className="shrink-0 px-2 py-0.5 rounded bg-red-100 text-red-900 font-sans font-bold text-[10px]">
                      Domain: {domain}
                    </span>
                  )}
                </div>
              </div>

              {/* Detailed URL Intelligence breakdown inside modal */}
              <UrlIntelligenceCard url={interceptedUrl} existingRedFlags={redFlags} />
            </div>
          )}

          {/* Quoted Evidence */}
          {primaryEvidence && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Quoted Evidence from Submission
              </span>
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5 italic">
                <Quote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 not-italic" />
                <span>&ldquo;{primaryEvidence}&rdquo;</span>
              </div>
            </div>
          )}

          {/* Warning Signs list if available */}
          {redFlags.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Detected Warning Signs ({redFlags.length})
              </span>
              <div className="space-y-2">
                {redFlags.slice(0, 3).map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5 shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#DC3F50] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 block">{flag.title}</span>
                      <p className="text-slate-600 mt-0.5">{flag.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Rule Reminder */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              <strong>Zero-Trust Security Rule:</strong> Never enter passwords, PINs, OTPs, BVN, or ATM card security codes on unverified web forms or external links.
            </span>
          </div>

          {/* Optional Override Confirmation for WARN decisions */}
          {isWarn && showOverrideConfirm && (
            <div className="p-4 rounded-xl bg-amber-100 border border-amber-300 text-xs text-amber-950 space-y-2 animate-fade-in">
              <p className="font-semibold">
                Are you sure you want to open this external link?
              </p>
              <p className="text-amber-900">
                You are proceeding at your own risk. Do not enter any passwords, PINs, or card details.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleProceedAnyway}
                  className="px-3 py-1.5 rounded-lg bg-amber-800 text-white font-bold hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  Confirm & Proceed
                </button>
                <button
                  onClick={() => setShowOverrideConfirm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white text-slate-700 font-semibold border border-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1220] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back to Safety
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {isAllow && interceptedUrl && (
              <button
                onClick={handleProceedAnyway}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Continue to Website</span>
              </button>
            )}

            {onVerifyOfficial && (
              <button
                onClick={() => {
                  onClose();
                  onVerifyOfficial();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-50 text-[#2563EB] font-bold text-sm border border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Verify Through Official Channel</span>
              </button>
            )}

            {isWarn && !showOverrideConfirm && (
              <button
                onClick={() => setShowOverrideConfirm(true)}
                className="text-xs text-slate-500 underline hover:text-slate-800 cursor-pointer px-2"
              >
                Proceed at Own Risk
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

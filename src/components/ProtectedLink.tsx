import React, { useState } from 'react';
import { Lock, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AnalysisResult, ProtectionDecision } from '../types';
import { evaluateProtectionDecision, extractDomainName } from '../utils/protectionLogic';

interface ProtectedLinkProps {
  url: string;
  result?: AnalysisResult;
  decision?: ProtectionDecision;
  displayLabel?: string;
  variant?: 'button' | 'card' | 'inline';
  className?: string;
  onIntercept?: (url: string, decision: ProtectionDecision) => void;
}

export const ProtectedLink: React.FC<ProtectedLinkProps> = ({
  url,
  result,
  decision,
  displayLabel,
  variant = 'card',
  className = '',
  onIntercept,
}) => {
  const [showRightClickTip, setShowRightClickTip] = useState(false);

  // Derive protection decision using existing analysis result or evaluating rules
  const protDecision =
    decision ||
    result?.protectionDecision ||
    result?.protection_decision ||
    (result
      ? evaluateProtectionDecision(
          result.riskLevel,
          result.redFlags || [],
          result.threatCategory,
          result.inputSnippet || '',
          url
        )
      : {
          action: 'BLOCK',
          reason: 'Unverified URL intercepted by Alert Lens application security layer.',
          requires_verification: true,
          interceptedUrl: url,
        });

  const domain = extractDomainName(url);
  const isBlock = protDecision.action === 'BLOCK';
  const isWarn = protDecision.action === 'WARN';

  const handleIntercept = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onIntercept) {
      onIntercept(url, protDecision);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRightClickTip(true);
    setTimeout(() => setShowRightClickTip(false), 3000);
    if (onIntercept) {
      onIntercept(url, protDecision);
    }
  };

  const handleAuxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onIntercept) {
      onIntercept(url, protDecision);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onIntercept) {
        onIntercept(url, protDecision);
      }
    }
  };

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1.5 align-middle my-1">
        <button
          type="button"
          onClick={handleIntercept}
          onContextMenu={handleContextMenu}
          onAuxClick={handleAuxClick}
          onKeyDown={handleKeyDown}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs border ${
            isBlock
              ? 'bg-red-50 text-[#DC3F50] border-red-200 hover:bg-red-100'
              : isWarn
              ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
          } ${className}`}
          title="Protected Link — Controlled by Alert Lens. Direct browser bypass disabled."
        >
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span>{displayLabel || `🔒 Inspect Link: ${domain || url}`}</span>
        </button>
        {showRightClickTip && (
          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded border border-red-200">
            Right-click bypass blocked
          </span>
        )}
      </span>
    );
  }

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isBlock
          ? 'bg-slate-900 border-red-900/60 text-white'
          : isWarn
          ? 'bg-slate-900 border-amber-800/60 text-white'
          : 'bg-slate-900 border-slate-800 text-white'
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isBlock
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : isWarn
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <Lock className="w-4 h-4" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                Alert Lens Controlled Link
              </span>
              <span
                className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  isBlock
                    ? 'bg-red-500 text-white'
                    : isWarn
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-emerald-500 text-slate-950'
                }`}
              >
                {protDecision.action} DECISION
              </span>
            </div>

            <div className="font-mono text-xs text-slate-200 break-all bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
              {url}
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={handleIntercept}
            onContextMenu={handleContextMenu}
            onAuxClick={handleAuxClick}
            onKeyDown={handleKeyDown}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              isBlock
                ? 'bg-[#DC3F50] hover:bg-red-700 text-white shadow-red-900/30'
                : isWarn
                ? 'bg-[#F59E0B] hover:bg-amber-600 text-slate-950 shadow-amber-900/30'
                : 'bg-[#2563EB] hover:bg-blue-600 text-white shadow-blue-900/30'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{displayLabel || '🔒 Inspect Protected Link'}</span>
          </button>

          {showRightClickTip && (
            <span className="text-[10px] font-bold text-red-300 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
              Right-click bypass prevented
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

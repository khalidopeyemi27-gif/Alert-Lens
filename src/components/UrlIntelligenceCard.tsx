import React, { useState } from 'react';
import { Search, Globe, ShieldAlert, ChevronDown, ChevronUp, Info, AlertTriangle, Lock, ExternalLink } from 'lucide-react';
import { analyzeUrlIntelligence, UrlIntelligenceReport, UrlFinding } from '../utils/urlIntelligence';
import { RedFlag } from '../types';

interface UrlIntelligenceCardProps {
  url: string;
  existingRedFlags?: RedFlag[];
  className?: string;
}

export const UrlIntelligenceCard: React.FC<UrlIntelligenceCardProps> = ({
  url,
  existingRedFlags = [],
  className = '',
}) => {
  const [showTechDetails, setShowTechDetails] = useState(false);

  if (!url) return null;

  const report: UrlIntelligenceReport = analyzeUrlIntelligence(url);
  const { parsed, findings } = report;

  // Deduplicate findings if existing redFlags already specifically describe the exact same thing
  const deduplicatedFindings = findings.filter((f) => {
    const isAlreadyCovered = existingRedFlags.some((rf) => {
      const combinedText = (rf.title + ' ' + rf.explanation + ' ' + (rf.exactEvidence || '')).toLowerCase();
      if (f.type === 'organization_outside_main_domain') {
        return combinedText.includes('misleading') || combinedText.includes('subdomain') || combinedText.includes('impersonation');
      }
      if (f.type === 'unencrypted_http') {
        return combinedText.includes('http') || combinedText.includes('unencrypted');
      }
      if (f.type === 'ip_address_hostname') {
        return combinedText.includes('numeric') || combinedText.includes('ip address');
      }
      return false;
    });
    // We keep findings that add unique value or provide structured breakdowns
    return true; // Display structured findings in About This Website Address section
  });

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm overflow-hidden ${className}`}>
      {/* Card Header */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
              <span>🔎 About This Website Address</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Plain-language address structure & observable safety signals
            </p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 uppercase tracking-wider hidden sm:inline-block">
          URL Intelligence
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Main Domain Highlight Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
                Main Operating Domain
              </span>
              <span className="font-mono text-xs font-bold text-slate-900 truncate block">
                {parsed.main_domain || parsed.hostname}
              </span>
            </div>
          </div>

          {parsed.subdomain && (
            <div className="text-[11px] bg-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700 font-medium shrink-0">
              Prefix / Subdomain: <span className="font-mono font-bold text-slate-900">{parsed.subdomain}</span>
            </div>
          )}
        </div>

        {/* Findings List */}
        {deduplicatedFindings.length > 0 ? (
          <div className="space-y-3">
            {deduplicatedFindings.map((finding, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2.5 ${
                  finding.severity === 'high'
                    ? 'bg-red-50/70 border-red-200 text-red-950'
                    : finding.severity === 'medium'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-blue-50/70 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex items-start gap-2">
                  {finding.severity === 'high' ? (
                    <AlertTriangle className="w-4 h-4 text-[#DC3F50] shrink-0 mt-0.5" />
                  ) : finding.severity === 'medium' ? (
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {finding.user_title}
                    </h4>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">
                      {finding.user_explanation}
                    </p>
                  </div>
                </div>

                {/* Structured Breakdown: What we found, Why it matters, What to do */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/80 text-[11px]">
                  <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 space-y-1">
                    <span className="font-extrabold uppercase text-[9px] tracking-wider text-slate-500 block">
                      1. What We Found
                    </span>
                    <p className="font-mono text-slate-800 break-words font-medium">
                      {finding.what_we_found}
                    </p>
                  </div>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 space-y-1">
                    <span className="font-extrabold uppercase text-[9px] tracking-wider text-slate-500 block">
                      2. Why It Matters
                    </span>
                    <p className="text-slate-700 leading-snug">
                      {finding.why_it_matters}
                    </p>
                  </div>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 space-y-1">
                    <span className="font-extrabold uppercase text-[9px] tracking-wider text-slate-500 block">
                      3. What To Do
                    </span>
                    <p className="text-slate-800 font-semibold leading-snug">
                      {finding.what_to_do}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Standard address structure detected. No unusual structural warning signs were found.</span>
          </div>
        )}

        {/* Expandable Technical Details Accordion */}
        <div className="pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setShowTechDetails(!showTechDetails)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span>Technical Address Details</span>
              <span className="text-[10px] text-slate-500 font-normal">(Advanced URL Parsing)</span>
            </span>
            {showTechDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTechDetails && (
            <div className="mt-2.5 p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono space-y-2 border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold">Full Address</span>
                  <span className="text-cyan-300 break-all">{parsed.full_url}</span>
                </div>

                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold">Protocol</span>
                  <span className={parsed.protocol === 'http:' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {parsed.protocol}
                  </span>
                </div>

                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold">Hostname</span>
                  <span className="text-slate-200">{parsed.hostname}</span>
                </div>

                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold">Main Domain</span>
                  <span className="text-cyan-300 font-bold">{parsed.main_domain}</span>
                </div>

                {parsed.subdomain && (
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold">Subdomain / Prefix</span>
                    <span className="text-amber-300">{parsed.subdomain}</span>
                  </div>
                )}

                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold">Path</span>
                  <span className="text-slate-300">{parsed.path}</span>
                </div>
              </div>

              {Object.keys(parsed.query_parameters).length > 0 && (
                <div className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px]">
                  <span className="text-slate-400 text-[10px] block font-sans uppercase font-bold mb-1">Query Parameters</span>
                  <div className="space-y-1">
                    {Object.entries(parsed.query_parameters).map(([key, val], pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1">
                        <span className="text-amber-400 font-bold">{key}:</span>
                        <span className="text-slate-300 break-all">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

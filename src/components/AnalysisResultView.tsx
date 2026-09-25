import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Clock,
  Send,
  Quote,
  Building2,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Search,
  Bot,
  PhoneCall,
  AlertCircle,
} from 'lucide-react';
import { AnalysisResult, RiskLevel } from '../types';
import { AlertAi } from './AlertAi';
import { ProtectionInterstitialModal } from './ProtectionInterstitialModal';
import { ProcedureProtectionCard } from './ProcedureProtectionCard';
import { ScamProcedureCard } from './ScamProcedureCard';
import { ProtectedLink } from './ProtectedLink';
import { UrlIntelligenceCard } from './UrlIntelligenceCard';
import { extractUrlsFromText } from '../utils/protectionLogic';
import { generateVerificationGuidance } from '../utils/verificationGuidance';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [isAlertAiExpanded, setIsAlertAiExpanded] = useState(false);
  const [isProtectionModalOpen, setIsProtectionModalOpen] = useState(false);
  const [interceptedTargetUrl, setInterceptedTargetUrl] = useState<string | undefined>(undefined);
  const [isTechDetailsOpen, setIsTechDetailsOpen] = useState(false);

  const protDecision = result.protectionDecision || result.protection_decision;
  const guidance =
    result.verificationGuidance ||
    result.verification_guidance ||
    generateVerificationGuidance(result, result.inputSnippet || '');

  // Extract all unique URLs in submitted content, evidence, or decision
  const textToScan = `${result.inputSnippet || ''} ${result.summary || ''} ${
    result.redFlags?.map((rf) => (rf.exactEvidence || '') + ' ' + rf.title + ' ' + rf.explanation).join(' ') || ''
  }`;
  const extractedUrls = extractUrlsFromText(textToScan);
  if (protDecision?.interceptedUrl && !extractedUrls.includes(protDecision.interceptedUrl)) {
    extractedUrls.unshift(protDecision.interceptedUrl);
  }

  const handleInterceptUrl = (url: string, e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    setInterceptedTargetUrl(url);
    setIsProtectionModalOpen(true);
  };

  // Single calculated warning-sign count used everywhere
  const warningSignsCount = result.redFlags ? result.redFlags.length : 0;

  // Risk Badge & Color Scheme
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return {
          label: 'Critical Risk',
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-[#DC3F50] text-white',
          accent: '#DC3F50',
          lightAccent: 'text-[#DC3F50]',
        };
      case 'HIGH':
        return {
          label: 'High Risk',
          bg: 'bg-red-50/70',
          border: 'border-red-200',
          badge: 'bg-[#DC3F50] text-white',
          accent: '#DC3F50',
          lightAccent: 'text-[#DC3F50]',
        };
      case 'MEDIUM':
        return {
          label: 'Needs Verification',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          badge: 'bg-[#F59E0B] text-slate-950 font-black',
          accent: '#F59E0B',
          lightAccent: 'text-amber-700',
        };
      case 'LOW':
      default:
        return {
          label: 'Low Apparent Risk',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          badge: 'bg-[#159570] text-white',
          accent: '#159570',
          lightAccent: 'text-[#159570]',
        };
    }
  };

  const riskBadge = getRiskBadge(result.riskLevel);

  // Cautious Risk Headlines
  const getRiskHeadline = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'Critical Risk — Strong Warning Signals Detected';
      case 'HIGH':
        return 'High Risk — Multiple Warning Signals Detected';
      case 'MEDIUM':
        return 'Needs Verification — Warning Signals Require Further Checking';
      case 'LOW':
      default:
        return 'Low Apparent Risk — Continue to Verify Independently';
    }
  };

  const riskHeadline = getRiskHeadline(result.riskLevel);

  // Sensitive info check
  const detectsSensitiveInfo =
    result.sensitiveInfoRequested ||
    (result.redFlags &&
      result.redFlags.some((rf) =>
        /pin|otp|password|bvn|nin|card number|cvv/i.test(rf.title + ' ' + (rf.exactEvidence || ''))
      ));

  // Primary Action Banner Logic with required cautious wording
  const getPrimaryAction = () => {
    if (result.threatCategory === 'Impersonation' || /bank/i.test(result.threatCategory || '')) {
      return {
        action: 'STOP',
        title: 'STOP — Do not click the link or share your PIN or OTP.',
        description:
          'Banks, FinTechs, and regulators never request your 4-digit debit card PIN or SMS OTP via message or link. PIN and OTP grant direct debit access to your funds.',
        bannerBg: 'bg-[#DC3F50] text-white',
        badgeBg: 'bg-white text-[#DC3F50]',
        icon: ShieldAlert,
      };
    }

    if (result.threatCategory === 'Fake job') {
      return {
        action: 'STOP',
        title: 'STOP — Do not pay medical, registration, or interview fees.',
        description:
          'Authentic corporate employers in Nigeria never charge candidates accreditation, medical, or uniform fees before interview screening.',
        bannerBg: 'bg-[#DC3F50] text-white',
        badgeBg: 'bg-white text-[#DC3F50]',
        icon: ShieldAlert,
      };
    }

    if (result.threatCategory === 'Investment scam') {
      return {
        action: 'STOP',
        title: 'STOP — Do not transfer money based on social-media promises.',
        description:
          'No legitimate legal investment or trading market can guarantee high returns in hours or days without risk. Verify operators through SEC Nigeria.',
        bannerBg: 'bg-[#DC3F50] text-white',
        badgeBg: 'bg-white text-[#DC3F50]',
        icon: ShieldAlert,
      };
    }

    if (result.threatCategory === 'Fraudulent loan') {
      return {
        action: 'STOP',
        title: 'STOP — Do not pay upfront fees to unlock promised loans.',
        description:
          'Legitimate financial institutions deduct legitimate statutory charges from disbursed amounts; they never demand advance cash transfers.',
        bannerBg: 'bg-[#DC3F50] text-white',
        badgeBg: 'bg-white text-[#DC3F50]',
        icon: ShieldAlert,
      };
    }

    if (result.threatCategory === 'Phishing' || /link|url/i.test(result.threatCategory || '')) {
      return {
        action: 'STOP',
        title: 'STOP — Do not open the link or enter credentials.',
        description:
          'Suspicious link anomalies identified. Navigate independently to the organisation’s official website rather than using the provided link.',
        bannerBg: 'bg-[#DC3F50] text-white',
        badgeBg: 'bg-white text-[#DC3F50]',
        icon: ShieldAlert,
      };
    }

    if (detectsSensitiveInfo) {
      return {
        action: 'PROTECT',
        title: 'PROTECT — Do not share passwords, PINs, OTPs, BVN, or card details.',
        description:
          'Sensitive personal security credentials requested. Never disclose passwords, card PINs, BVN OTPs, or recovery codes.',
        bannerBg: 'bg-purple-900 text-white',
        badgeBg: 'bg-purple-200 text-purple-950',
        icon: Lock,
      };
    }

    if (result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH') {
      return {
        action: 'STOP',
        title: 'STOP — Do not reply, pay, click, or continue.',
        description:
          'Immediate warning indicators identified. Halt all conversation, do not send payment or fees, and do not follow link instructions.',
        bannerBg: 'bg-[#DC3F50] text-white',
        badgeBg: 'bg-white text-[#DC3F50]',
        icon: ShieldAlert,
      };
    }

    if (result.riskLevel === 'MEDIUM') {
      return {
        action: 'VERIFY',
        title: 'VERIFY — Check through an official channel accessed independently.',
        description:
          'Warning signals require further checking. Independently confirm claims with the registered organization before taking action.',
        bannerBg: 'bg-[#0B1220] text-white',
        badgeBg: 'bg-[#06B6D4] text-[#0B1220]',
        icon: Search,
      };
    }

    return {
      action: 'VERIFY',
      title: 'VERIFY — Continue to verify independently through official channels.',
      description:
        'Preliminary assessment indicates low apparent fraud markers. Still exercise normal caution and verify the source if sensitive data is requested.',
      bannerBg: 'bg-[#159570] text-white',
      badgeBg: 'bg-emerald-100 text-emerald-950',
      icon: ShieldCheck,
    };
  };

  const primaryAction = getPrimaryAction();
  const ActionIcon = primaryAction.icon;

  // Copy Summary & WhatsApp Sharing format with cautious non-forensic language
  const warningSignsSummary =
    result.redFlags && result.redFlags.length > 0
      ? result.redFlags.map((rf, idx) => `${idx + 1}. ${rf.title}`).join('\n')
      : 'No specific warning signs identified';

  const verificationSummary =
    result.verificationSteps && result.verificationSteps.length > 0
      ? result.verificationSteps.slice(0, 3).map((vs, idx) => `${idx + 1}. ${vs}`).join('\n')
      : 'Verify independently through official channels.';

  const copySummaryText = `Alert Lens NG Assessment:
Risk Category: ${result.threatCategory || 'Uncategorized'}
Preliminary Risk Indicator: ${result.riskScore}/100 (${riskHeadline})
Summary: ${result.summary}

Primary Action:
${primaryAction.title}

Warning Signs Detected (${warningSignsCount}):
${warningSignsSummary}

Safe Verification Advice:
${verificationSummary}

Disclaimer:
This is a preliminary AI-assisted assessment, not legal or forensic proof. Alert Lens NG evaluates message patterns, domain anomalies, and credential requests. Always verify independently through official channels.`;

  const whatsAppShareText = `Alert Lens preliminary safety assessment:
Risk Category: ${result.threatCategory || 'Suspicious Content'}
Preliminary Risk Indicator: ${result.riskScore}/100 (${riskHeadline})
Primary Action: ${primaryAction.title}

Warning Signs Detected (${warningSignsCount}):
${result.redFlags && result.redFlags.length > 0 ? result.redFlags.slice(0, 3).map(rf => `• ${rf.title}`).join('\n') : '• Low apparent risk'}

This assessment is not proof that the content is fraudulent or safe. Verify independently through official channels.
Checked with Alert Lens NG`;

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(copySummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(whatsAppShareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <section id="analysis-result-view" className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
          <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>
            Assessment completed • {result.timestamp ? new Date(result.timestamp).toLocaleTimeString() : 'Just now'}
          </span>
          {result.isFallback && (
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-bold">
              Prepared Heuristic Fallback
            </span>
          )}
          {result.isPreparedDemo && (
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
              Demo Scenario
            </span>
          )}
        </div>

        <button
          id="check-another-top-btn"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#D9E2EC] bg-white hover:bg-slate-50 text-[#344054] text-xs font-bold transition-all cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Check Another</span>
        </button>
      </div>

      {/* Main Analysis Card */}
      <div className="rounded-2xl border border-[#D9E2EC] bg-white shadow-sm overflow-hidden">
        {/* Risk Score & Risk Badge Top Area */}
        <div className={`p-6 sm:p-7 ${riskBadge.bg} border-b border-[#D9E2EC]`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Left: Dial Meter + Badge + Summary */}
            <div className="flex items-start gap-4">
              {/* Dial Meter (0 to 100) */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center rounded-2xl bg-white shadow-2xs border border-[#D9E2EC]">
                {/* Visual Lens Focus Ring */}
                <div
                  className="absolute inset-1 rounded-xl border-2 pointer-events-none opacity-80"
                  style={{ borderColor: riskBadge.accent }}
                />
                <div className="text-center z-10">
                  <span className="text-2xl font-black tracking-tight" style={{ color: riskBadge.accent }}>
                    {result.riskScore}
                  </span>
                  <span className="text-[10px] block font-bold text-[#667085] uppercase tracking-wider">
                    / 100
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${riskBadge.badge}`}>
                    {riskBadge.label}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#344054] border border-[#D9E2EC]">
                    Category: {result.threatCategory}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0B1220] leading-snug">
                  {riskHeadline}
                </h3>
                <p className="text-xs sm:text-sm text-[#344054] mt-1 max-w-xl leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Right: Preliminary Risk Indicator */}
            <div className="sm:text-right shrink-0">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-[#D9E2EC] text-[#344054] shadow-2xs">
                Preliminary Risk Indicator: <strong>{result.riskScore}/100</strong>
              </span>
              <p className="text-[10px] text-[#667085] mt-1 max-w-[200px]">
                Preliminary risk assessment. Requires independent verification.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Primary Action Banner with One Clear Directive */}
        <div className={`p-4 sm:p-5 ${primaryAction.bannerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 shrink-0">
              <ActionIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md ${primaryAction.badgeBg}`}>
                  Primary Action
                </span>
                <h4 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {primaryAction.title}
                </h4>
              </div>
              <p className="text-xs text-white/90 mt-0.5 max-w-2xl leading-relaxed">
                {primaryAction.description}
              </p>
            </div>
          </div>
        </div>

        {/* Application-Level Protection Decision Banner */}
        {protDecision && (
          <div
            className={`m-5 sm:m-6 p-4.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs ${
              protDecision.action === 'BLOCK'
                ? 'bg-red-500/10 border-red-300/80 text-red-950'
                : protDecision.action === 'WARN'
                ? 'bg-amber-500/10 border-amber-300/80 text-amber-950'
                : 'bg-emerald-500/10 border-emerald-300/80 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  protDecision.action === 'BLOCK'
                    ? 'bg-[#DC3F50] text-white'
                    : protDecision.action === 'WARN'
                    ? 'bg-[#F59E0B] text-slate-950'
                    : 'bg-[#159570] text-white'
                }`}
              >
                {protDecision.action === 'BLOCK' ? (
                  <ShieldAlert className="w-5 h-5" />
                ) : protDecision.action === 'WARN' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                      protDecision.action === 'BLOCK'
                        ? 'bg-[#DC3F50] text-white'
                        : protDecision.action === 'WARN'
                        ? 'bg-[#F59E0B] text-slate-950'
                        : 'bg-[#159570] text-white'
                    }`}
                  >
                    Protection Decision: {protDecision.action}
                  </span>
                  {protDecision.action === 'BLOCK' && (
                    <span className="text-xs font-bold text-[#DC3F50]">Navigation Prevented</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold mt-1 leading-snug">
                  {protDecision.reason}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setInterceptedTargetUrl(protDecision.interceptedUrl);
                setIsProtectionModalOpen(true);
              }}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border shadow-2xs ${
                protDecision.action === 'BLOCK'
                  ? 'bg-[#DC3F50] text-white border-red-600 hover:bg-red-700'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Inspect Protection View</span>
            </button>
          </div>
        )}

        {/* Controlled Protected Links Panel */}
        {extractedUrls.length > 0 && (
          <div className="m-5 sm:m-6 p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-100">
                    Detected External Links ({extractedUrls.length})
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Alert Lens Controlled Navigation — Direct browser bypass disabled
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-blue-950 text-cyan-300 border border-blue-800/80 uppercase tracking-wider hidden sm:inline-block">
                Zero-Trust Active
              </span>
            </div>

            <div className="space-y-3">
              {extractedUrls.map((url, idx) => (
                <ProtectedLink
                  key={idx}
                  url={url}
                  result={result}
                  onIntercept={(targetUrl) => {
                    setInterceptedTargetUrl(targetUrl);
                    setIsProtectionModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* URL Intelligence Section */}
        {extractedUrls.length > 0 && (
          <div className="mx-5 sm:mx-6 mb-6 space-y-4">
            {extractedUrls.map((url, idx) => (
              <UrlIntelligenceCard key={idx} url={url} existingRedFlags={result.redFlags} />
            ))}
          </div>
        )}

        {/* 4. Sensitive Information Requested Banner (Mandatory if credentials requested) */}
        {detectsSensitiveInfo && (
          <div className="m-5 sm:m-6 p-4 rounded-xl bg-red-50 border border-red-200 text-[#DC3F50] flex items-start gap-3 shadow-2xs">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#DC3F50]" />
            <div className="text-xs sm:text-sm">
              <span className="font-extrabold block text-[#0B1220]">
                Sensitive Information Requested
              </span>
              <p className="mt-0.5 text-[#DC3F50] leading-relaxed">
                This content requests confidential data (such as ATM card PIN, BVN OTP, password, or NIN). 
                <strong> Legitimate Nigerian banks, FinTechs (like OPay, Moniepoint, Kuda), and recruiters NEVER ask for your card PIN, BVN OTP, or password over SMS, WhatsApp, or email.</strong>
              </p>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7 space-y-7">
          {/* 1. What this message is asking you to do */}
          {(result.procedureDetection || result.procedure_detection)?.has_requested_actions ? (
            <ScamProcedureCard
              procedureDetection={result.procedureDetection || result.procedure_detection}
            />
          ) : result.procedureAnalysis?.isProcedure ? (
            <ProcedureProtectionCard
              procedureAnalysis={result.procedureAnalysis}
            />
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-[#D9E2EC]">
              <div className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-1">
                What this message is asking you to do
              </div>
              <p className="text-sm font-semibold text-[#0B1220]">
                No specific sensitive action sequence was detected in this message.
              </p>
            </div>
          )}

          {/* 2. Why this matters */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-[#2563EB]">
              Why This Matters
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#0B1220] leading-relaxed">
              {(result.procedureDetection || result.procedure_detection)?.why_this_matters_summary ||
                (result.riskLevel === 'LOW'
                  ? 'This message does not contain strong indicators of a scam.'
                  : result.summary)}
            </p>
          </div>

          {/* 3. Independent Verification Guidance */}
          <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-sm sm:text-base font-extrabold text-[#0B1220] flex items-center gap-2">
                <Building2 className="w-4.5 h-4.5 text-[#2563EB]" />
                <span>{guidance.title}</span>
              </h4>
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                Safe Verification Steps
              </span>
            </div>

            {/* Core Guidance Summary */}
            <p className="text-xs sm:text-sm text-[#344054] font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-[#D9E2EC]">
              {guidance.summary}
            </p>

            {/* Golden Safety Rule Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
              <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-extrabold text-[#92400E]">Golden Safety Rule: </span>
                {guidance.safetyReminder}
              </div>
            </div>

            {/* Actionable Numbered Steps */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
                Recommended Verification Pathway:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {guidance.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#D9E2EC] text-xs flex items-start gap-3 shadow-2xs hover:border-blue-200 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[#0B1220] font-semibold leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Channel Note */}
            {result.organizationCheck?.officialChannels && (
              <div className="pt-2 border-t border-[#D9E2EC] flex items-center justify-between text-xs text-[#667085] flex-wrap gap-2">
                <span>
                  Official Portal Domain:{' '}
                  <strong className="text-[#0B1220] font-mono">
                    {result.organizationCheck.officialChannels.domains?.[0] || 'Official portal'}
                  </strong>
                </span>
                <span className="text-[11px] text-[#2563EB] font-bold">
                  Open independently in a new tab
                </span>
              </div>
            )}
          </div>

          {/* 4. Expandable Technical Details Button */}
          <div className="pt-2 border-t border-[#D9E2EC]">
            <button
              type="button"
              onClick={() => setIsTechDetailsOpen(!isTechDetailsOpen)}
              className="w-full py-3 px-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] hover:bg-slate-100 text-[#344054] text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                <span>{isTechDetailsOpen ? '▾ Hide Technical Details' : '▸ Technical Details & Forensic Analysis'}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#667085] border border-[#D9E2EC]">
                {warningSignsCount} indicators • URL & domain metrics
              </span>
            </button>
          </div>

          {/* Collapsible Technical Details Container */}
          {isTechDetailsOpen && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-6 animate-fadeIn">
              {/* Warning Signs & Quoted Evidence */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs flex items-center justify-center font-bold">
                      {warningSignsCount}
                    </span>
                    <span>Warning Signs & Quoted Evidence</span>
                  </h4>
                  <span className="text-[11px] text-[#667085]">Grounded in text</span>
                </div>

                {result.redFlags && result.redFlags.length > 0 ? (
                  <div className="space-y-3">
                    {result.redFlags.map((flag, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border ${
                          flag.severity === 'HIGH'
                            ? 'border-red-200 bg-red-50/40'
                            : flag.severity === 'MEDIUM'
                            ? 'border-amber-200 bg-amber-50/40'
                            : 'border-[#D9E2EC] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                              flag.severity === 'HIGH'
                                ? 'bg-[#DC3F50] text-white'
                                : flag.severity === 'MEDIUM'
                                ? 'bg-[#F59E0B] text-slate-950'
                                : 'bg-slate-700 text-white'
                            }`}
                          >
                            {flag.severity}
                          </span>
                          <h5 className="font-bold text-[#0B1220] text-xs sm:text-sm">{flag.title}</h5>
                        </div>
                        <p className="text-xs text-[#344054] leading-relaxed">{flag.explanation}</p>
                        {flag.exactEvidence && (
                          <div className="mt-2 p-2 rounded bg-white border border-[#D9E2EC] font-mono text-[11px] text-[#0B1220]">
                            "{flag.exactEvidence}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    No technical red flags identified in this submission.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Direct Verification Paths in Nigeria */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-[#D9E2EC] bg-white hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0B1220]">Corporate Affairs Commission (CAC)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#667085]" />
                </div>
                <p className="text-xs text-[#667085] mb-2">
                  Verify business registration, RC number, and active corporate status.
                </p>
                <a
                  href="https://search.cac.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                >
                  <span>search.cac.gov.ng</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl border border-[#D9E2EC] bg-white hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0B1220]">SEC Nigeria Capital Market Directory</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#667085]" />
                </div>
                <p className="text-xs text-[#667085] mb-2">
                  Check if an investment platform or crypto broker is legally licensed.
                </p>
                <a
                  href="https://sec.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                >
                  <span>sec.gov.ng / Capital Market</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl border border-[#D9E2EC] bg-white hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0B1220]">CBN Regulated Financial Institutions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#667085]" />
                </div>
                <p className="text-xs text-[#667085] mb-2">
                  Confirm deposit money banks and licensed payment service providers.
                </p>
                <a
                  href="https://www.cbn.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                >
                  <span>cbn.gov.ng / Regulated Banks</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl border border-[#D9E2EC] bg-white hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0B1220]">FCCPC Digital Money Lenders</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#667085]" />
                </div>
                <p className="text-xs text-[#667085] mb-2">
                  Verify approved digital lending apps and report illegal loan sharks.
                </p>
                <a
                  href="https://fccpc.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                >
                  <span>fccpc.gov.ng / Approved Lenders</span>
                </a>
              </div>
            </div>

          {/* 8. Block/Report Guidance */}
          <div id="block-and-report-guidance">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-[#0B1220] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#DC3F50]" />
                <span>Block & Report Guidance</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC]">
                <h5 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#DC3F50]" />
                  <span>BLOCK Sender or Account</span>
                </h5>
                <p className="text-xs text-[#344054] leading-relaxed">
                  Block the sender phone number, email address, or social media profile immediately after preserving evidence (screenshots or message text) for documentation.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC]">
                <h5 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  <span>REPORT Through Official Desks</span>
                </h5>
                <p className="text-xs text-[#344054] leading-relaxed">
                  Report to your bank’s fraud desk if financial credentials were requested, submit reports to the EFCC via Eagle Eye or scam@efcc.gov.ng, and report abusive lenders to FCCPC.
                </p>
              </div>
            </div>
          </div>

          {/* 9. Mandatory Disclaimer */}
          <div id="preliminary-assessment-disclaimer" className="p-4 rounded-xl bg-slate-50 border border-[#D9E2EC] text-xs text-[#667085] leading-relaxed">
            <p className="font-bold text-[#344054] mb-1">
              Assessment Disclaimer
            </p>
            <p>
              This is a preliminary AI-assisted assessment, not legal or forensic proof. Alert Lens NG evaluates message patterns, domain anomalies, and credential requests. Always verify independently through official channels.
            </p>
          </div>

          {/* 10. Ask Alert AI About This */}
          <div className="pt-2 border-t border-[#D9E2EC]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-blue-50/60 border border-blue-200">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#06B6D4]" />
                  <h4 className="text-sm font-bold text-[#0B1220]">
                    Ask Alert AI About This
                  </h4>
                </div>
                <p className="text-xs text-[#667085] mt-0.5">
                  Get personalized guidance from Alert AI Safety Assistant regarding these warning signs or official Nigerian verification channels.
                </p>
              </div>

              <button
                id="ask-alert-ai-result-btn"
                onClick={() => setIsAlertAiExpanded(!isAlertAiExpanded)}
                className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shadow-blue-600/20 shrink-0"
              >
                <Bot className="w-4 h-4 text-white" />
                <span>{isAlertAiExpanded ? 'Close Assistant' : 'Ask Alert AI About This'}</span>
              </button>
            </div>

            {/* Embedded interactive pre-seeded Alert AI with complete context */}
            {isAlertAiExpanded && (
              <div className="mt-4">
                <AlertAi
                  isEmbedded={true}
                  context={{
                    submittedContent: result.inputSnippet,
                    inputType: result.inputType,
                    threatCategory: result.threatCategory,
                    riskLevel: result.riskLevel,
                    riskScore: result.riskScore,
                    preliminaryRiskIndicator: `${result.riskScore}/100`,
                    warningSignsCount: warningSignsCount,
                    redFlags: result.redFlags,
                    exactEvidence: result.evidence,
                    primaryAction: primaryAction.title,
                    verificationSteps: result.verificationSteps,
                    organizationCheck: result.organizationCheck,
                  }}
                />
              </div>
            )}
          </div>

          {/* Shareable Safety Check */}
          <div className="pt-2 border-t border-[#D9E2EC]">
            <div className="bg-[#F7F9FC] border border-[#D9E2EC] rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1220] flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Share Safety Check</span>
                  </h4>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Warn friends or family members with a structured, cautious assessment summary.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="copy-safety-check-btn"
                    onClick={handleCopyShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D9E2EC] hover:bg-slate-50 text-[#344054] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#159570]" />
                        <span className="text-[#159570]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#667085]" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    id="whatsapp-share-btn"
                    onClick={handleWhatsAppShare}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#159570] hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D9E2EC] text-[11px] text-[#344054] font-mono leading-relaxed select-all whitespace-pre-line">
                {copySummaryText}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 bg-[#F7F9FC] border-t border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
          <span>
            Alert Lens NG • AI-assisted preliminary assessment. Always verify via independent official channels.
          </span>
          <button
            id="check-another-bottom-btn"
            onClick={onReset}
            className="font-bold text-[#2563EB] hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Check another suspicious item</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Application Protection Interstitial Modal */}
      <ProtectionInterstitialModal
        isOpen={isProtectionModalOpen}
        onClose={() => setIsProtectionModalOpen(false)}
        decision={protDecision}
        analysisResult={result}
        targetUrl={interceptedTargetUrl}
        onVerifyOfficial={() => {
          const el = document.getElementById('block-and-report-guidance');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Link2,
  Tag,
  Mail,
  Share2,
  Loader2,
  Trash2,
  Eye,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { InputType, AnalysisResult, DemoExample } from '../types';
import { SYNTHETIC_EXAMPLES } from '../data/mockAndResearch';
import { getFallbackOrDemoAssessment } from '../data/preparedAssessments';

interface CheckerProps {
  onAnalysisComplete: (result: AnalysisResult, inputType: InputType, rawContent: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  externalLoadDemo?: DemoExample | null;
  onClearExternalDemo?: () => void;
}

export const Checker: React.FC<CheckerProps> = ({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
  externalLoadDemo,
  onClearExternalDemo,
}) => {
  const [activeTab, setActiveTab] = useState<InputType>('message');
  const [content, setContent] = useState('');
  const [sourceDetails, setSourceDetails] = useState('');
  const [claimedOrg, setClaimedOrg] = useState('');
  const [selectedDemoId, setSelectedDemoId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackNote, setFallbackNote] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('Inspecting text structure...');

  // React to externally loaded demo from demo section
  useEffect(() => {
    if (externalLoadDemo) {
      setActiveTab(externalLoadDemo.type);
      setContent(externalLoadDemo.content);
      setSourceDetails(externalLoadDemo.senderOrSource || '');
      setClaimedOrg('');
      setSelectedDemoId(externalLoadDemo.id);
      setErrorMessage(null);
      setFallbackNote(null);
      if (onClearExternalDemo) onClearExternalDemo();
    }
  }, [externalLoadDemo, onClearExternalDemo]);

  const handleTabChange = (type: InputType) => {
    setActiveTab(type);
    setErrorMessage(null);
    setFallbackNote(null);
  };

  const handleQuickLoad = (demoId: string) => {
    setSelectedDemoId(demoId);
    const demo = SYNTHETIC_EXAMPLES.find((d) => d.id === demoId);
    if (demo) {
      setActiveTab(demo.type);
      setContent(demo.content);
      setSourceDetails(demo.senderOrSource || '');
      setClaimedOrg('');
      setErrorMessage(null);
      setFallbackNote(null);
    }
  };

  const handleClear = () => {
    setContent('');
    setSourceDetails('');
    setClaimedOrg('');
    setSelectedDemoId('');
    setErrorMessage(null);
    setFallbackNote(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFallbackNote(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setErrorMessage('Please paste or type the message, link, offer, or email you wish to check.');
      return;
    }

    if (activeTab === 'link' && !trimmed.includes('.') && !trimmed.startsWith('http')) {
      setErrorMessage('Please provide a valid web link or domain address (e.g. example.com or http://...).');
      return;
    }

    setIsLoading(true);
    setLoadingStep('Inspecting text structure...');

    const timer1 = setTimeout(() => {
      setLoadingStep('Checking Nigerian context signals...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setLoadingStep('Preparing verification advice...');
    }, 2500);

    // Timeout controller after 12 seconds to ensure prompt responsiveness
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          type: activeTab,
          content: trimmed,
          sourceDetails: sourceDetails.trim() || undefined,
          claimedOrg: claimedOrg.trim() || undefined,
          demoId: selectedDemoId || undefined,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Analysis service returned an error. Applying deterministic fallback assessment.');
      }

      const data: AnalysisResult = await response.json();
      if (data.isFallback) {
        setFallbackNote('AI service timed out. Displaying reliable fallback assessment.');
      }
      onAnalysisComplete(data, activeTab, trimmed);
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timeoutId);

      // Graceful local fallback to prevent user from being stuck
      console.warn('Analysis fallback activated:', err.message);
      const fallbackResult = getFallbackOrDemoAssessment(
        trimmed,
        activeTab,
        sourceDetails.trim() || undefined,
        claimedOrg.trim() || undefined,
        selectedDemoId || undefined
      );

      setFallbackNote('AI service was temporarily unavailable. Prepared fallback assessment applied.');
      onAnalysisComplete(fallbackResult, activeTab, trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="checker-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* 5. Privacy and safety notice - Prominent but compact */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold text-amber-900 block">Privacy & Confidentiality Notice: </span>
          <p className="mt-0.5 text-amber-900/90 leading-relaxed">
            Never enter passwords, OTPs, PINs, BVN, card numbers, or recovery codes. Alert Lens evaluates linguistic structure, domain anomalies, and offer patterns without requiring private credentials.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#D9E2EC] shadow-sm overflow-hidden">
        {/* Card Header & Input Type Selector */}
        <div className="p-5 sm:p-6 border-b border-[#D9E2EC] bg-[#F7F9FC]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-[#0B1220] tracking-tight">
                  Message Protection Prototype
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                  Simulated Inbox
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#667085] mt-1">
                Select or paste an incoming channel message (WhatsApp, SMS, Email) to test Alert Lens protection before you interact.
              </p>
            </div>

            {/* Quick-load demo selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <label htmlFor="quick-demo-select" className="text-xs text-[#667085] font-semibold hidden md:inline">
                Quick Test:
              </label>
              <select
                id="quick-demo-select"
                value={selectedDemoId}
                onChange={(e) => {
                  if (e.target.value) handleQuickLoad(e.target.value);
                }}
                className="text-xs py-2 px-3 rounded-xl border border-[#D9E2EC] bg-white text-[#344054] font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none cursor-pointer shadow-2xs"
              >
                <option value="" disabled>
                  Select Simulated Message ▾
                </option>
                <option value="demo-bursary-highrisk">🔴 WhatsApp: Student Bursary Scam (High Risk)</option>
                <option value="demo-exam-legit">🟢 SMS: Exam Timetable (Legitimate)</option>
                <option value="demo-bank-warning">⚠️ SMS: Bank Revalidation (Caution)</option>
                <option value="demo-1-job">Fake Job (Medical Fee)</option>
                <option value="demo-2-investment">Investment (Unrealistic Returns)</option>
                <option value="demo-3-impersonation">Bank Freeze Impersonation</option>
                <option value="demo-4-payment">OPay Accidental Transfer</option>
                <option value="demo-5-loan">Loan with Advance Stamp Duty</option>
                <option value="demo-6-phishing">Phishing Typosquatted Domain</option>
                <option value="demo-7-seller">Fake Instagram Seller</option>
                <option value="demo-8-legit">Legitimate Recruiter</option>
              </select>
            </div>
          </div>

          {/* Simulated Message Quick Test Cards */}
          <div className="mb-5 space-y-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#344054]">
              Simulated "Message Received" Scenarios (Click to test):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLoad('demo-bursary-highrisk')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDemoId === 'demo-bursary-highrisk'
                    ? 'border-red-500 bg-red-50/80 ring-2 ring-red-400/30'
                    : 'border-red-200 bg-white hover:bg-red-50/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-[#DC3F50] flex items-center gap-1">
                    <span>🔴</span> WhatsApp
                  </span>
                  <span className="text-[10px] text-[#667085]">Today, 10:14 AM</span>
                </div>
                <div className="text-xs font-bold text-[#0B1220] truncate">Univ. Student Affairs</div>
                <div className="text-[11px] text-[#667085] line-clamp-2 mt-0.5">
                  "Congratulations! You have been selected for a ₦150,000 student bursary..."
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoad('demo-exam-legit')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDemoId === 'demo-exam-legit'
                    ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-400/30'
                    : 'border-emerald-200 bg-white hover:bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-[#159570] flex items-center gap-1">
                    <span>🟢</span> SMS
                  </span>
                  <span className="text-[10px] text-[#667085]">Today, 09:30 AM</span>
                </div>
                <div className="text-xs font-bold text-[#0B1220] truncate">Univ. Exam Office</div>
                <div className="text-[11px] text-[#667085] line-clamp-2 mt-0.5">
                  "Your examination timetable is now available. Visit the official student portal..."
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoad('demo-bank-warning')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDemoId === 'demo-bank-warning'
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/30'
                    : 'border-amber-200 bg-white hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-[#D97706] flex items-center gap-1">
                    <span>⚠️</span> SMS
                  </span>
                  <span className="text-[10px] text-[#667085]">Today, 11:05 AM</span>
                </div>
                <div className="text-xs font-bold text-[#0B1220] truncate">Bank Account Service</div>
                <div className="text-[11px] text-[#667085] line-clamp-2 mt-0.5">
                  "Your bank account requires revalidation to prevent service suspension..."
                </div>
              </button>
            </div>
          </div>

          {/* 5 Input Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              type="button"
              id="tab-message"
              onClick={() => handleTabChange('message')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'message'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>SMS / WhatsApp</span>
            </button>

            <button
              type="button"
              id="tab-email"
              onClick={() => handleTabChange('email')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>

            <button
              type="button"
              id="tab-link"
              onClick={() => handleTabChange('link')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'link'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Link / URL</span>
            </button>

            <button
              type="button"
              id="tab-social_media"
              onClick={() => handleTabChange('social_media')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'social_media'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Social Media</span>
            </button>

            <button
              type="button"
              id="tab-offer"
              onClick={() => handleTabChange('offer')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                activeTab === 'offer'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white text-[#344054] border border-[#D9E2EC] hover:bg-slate-50'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Offer / Job</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Main Content Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="content-input" className="text-xs sm:text-sm font-bold text-[#0B1220]">
                {activeTab === 'message' && 'SMS or WhatsApp Message Content'}
                {activeTab === 'email' && 'Email Sender, Subject & Message Body'}
                {activeTab === 'link' && 'Suspicious Link or Web Address (URL)'}
                {activeTab === 'social_media' && 'Social Media Post, Profile Handle, or Direct Message'}
                {activeTab === 'offer' && 'Offer Details (Job Opportunity, Investment Pitch, Loan Terms)'}
              </label>
              <span className="text-xs text-[#667085] font-mono">
                {content.length} characters
              </span>
            </div>

            <textarea
              id="content-input"
              rows={activeTab === 'link' ? 3 : 5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                activeTab === 'message'
                  ? 'Paste SMS or WhatsApp message. E.g.: "ZENITH: Debit freeze on your account due to BVN mismatch. Call 08012345678 or reply with OTP to avoid ₦25,000 penalty."'
                  : activeTab === 'email'
                  ? 'Paste email subject, sender address, and body. E.g.: From: hr-recruitment@shell-nigeria.org, Subject: Interview Invitation. Pay ₦7,500 screening fee...'
                  : activeTab === 'link'
                  ? 'Paste suspicious link or URL. E.g.: https://cbn-grant-relief-funds.pages.dev/claim or http://zenith-bvn-update.biz'
                  : activeTab === 'social_media'
                  ? 'Paste social post or DM. E.g.: "@gadget_sales_lagos: iPhone 15 Pro Max for ₦280,000. Strictly payment before dispatch to account 1029384756..."'
                  : 'Paste offer text: salary, return on investment (e.g. 200% in 48 hrs), loan terms, or advance payment instructions...'
              }
              className="w-full p-3.5 rounded-xl border border-[#D9E2EC] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/15 text-[#0B1220] text-sm placeholder-[#667085]/70 outline-none resize-y transition-all"
            />
          </div>

          {/* Optional helper fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label htmlFor="source-input" className="block text-xs font-bold text-[#344054] mb-1">
                Sender or source (Optional)
              </label>
              <input
                id="source-input"
                type="text"
                value={sourceDetails}
                onChange={(e) => setSourceDetails(e.target.value)}
                placeholder={
                  activeTab === 'message'
                    ? 'e.g. +234 814 992 0184 or ZENITH-ALRT'
                    : activeTab === 'email'
                    ? 'e.g. careers@flutterwavego.com'
                    : activeTab === 'social_media'
                    ? 'e.g. @gadget_clearance_sales_lagos'
                    : 'e.g. WhatsApp Group, Facebook Post'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/15 text-xs sm:text-sm text-[#0B1220] placeholder-[#667085]/70 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="org-input" className="block text-xs font-bold text-[#344054] mb-1">
                Claimed organization or brand (Optional)
              </label>
              <input
                id="org-input"
                type="text"
                list="nigerian-orgs-list"
                value={claimedOrg}
                onChange={(e) => setClaimedOrg(e.target.value)}
                placeholder="e.g. Zenith Bank, SPDC, OPay, CBN, Flutterwave"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/15 text-xs sm:text-sm text-[#0B1220] placeholder-[#667085]/70 outline-none transition-all"
              />
              <datalist id="nigerian-orgs-list">
                <option value="Zenith Bank" />
                <option value="Guaranty Trust Bank (GTBank)" />
                <option value="Access Bank" />
                <option value="OPay Digital Services" />
                <option value="Moniepoint MFB" />
                <option value="Kuda Bank" />
                <option value="Flutterwave" />
                <option value="Central Bank of Nigeria (CBN)" />
                <option value="Shell Petroleum Development Company (SPDC)" />
                <option value="Federal Competition and Consumer Protection Commission (FCCPC)" />
                <option value="Securities and Exchange Commission (SEC)" />
              </datalist>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#DC3F50] text-xs sm:text-sm flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Fallback notification notice if fallback was applied */}
          {fallbackNote && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{fallbackNote}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              id="clear-btn"
              onClick={handleClear}
              disabled={isLoading || (!content && !sourceDetails && !claimedOrg)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#D9E2EC] hover:bg-slate-50 text-[#344054] text-xs font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              type="submit"
              id="analyze-submit-btn"
              disabled={isLoading || !content.trim()}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:scale-98 text-white text-sm font-bold shadow-sm shadow-blue-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Inspecting...</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-white" />
                  <span>Check Content</span>
                  <ArrowRight className="w-4 h-4 text-white ml-0.5" />
                </>
              )}
            </button>
          </div>

          {/* Prominent Progressive Loading State */}
          {isLoading && (
            <div className="mt-3 p-4 rounded-xl bg-[#0B1220] text-slate-200 text-xs flex items-center gap-3 border border-slate-700">
              <div className="relative flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-[#06B6D4] shrink-0" />
                <div className="absolute w-7 h-7 rounded-full border border-cyan-400/30 animate-ping pointer-events-none" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-[#06B6D4] block sm:inline mr-2">
                  Alert Lens Analysis:
                </span>
                <span className="text-slate-200 font-medium">{loadingStep}</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

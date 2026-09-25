import React from 'react';
import { Settings, Shield, Info, AlertCircle, Trash2, Database, Lock } from 'lucide-react';

interface SettingsViewProps {
  historyCount: number;
  onClearHistory: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  historyCount,
  onClearHistory,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#D9E2EC] pb-5">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
            <Settings className="w-5 h-5 text-[#2563EB]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
            ⚙️ Settings & Privacy
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#667085] font-medium max-w-xl">
          Product settings, local storage controls, privacy disclosures, and system disclosures.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Privacy & Data Storage */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-[#0B1220]">
            <Lock className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base font-extrabold">Privacy & Data Disclosures</h3>
          </div>

          <div className="space-y-3 text-xs text-[#344054] leading-relaxed">
            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
              <strong className="text-[#0B1220] block mb-1">What Alert Lens Analyzes:</strong>
              When you submit a message or URL, Alert Lens scans the text for risk indicators, scam procedure sequences, domain lookalikes, and credential traps.
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
              <strong className="text-[#0B1220] block mb-1">Local Browser Storage:</strong>
              Your check history is stored locally in your web browser session for quick reference.
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
              <strong className="text-[#0B1220] block mb-1">Sensitive Secrets Protection:</strong>
              Alert Lens <strong>never</strong> collects or stores passwords, PINs, OTPs, BVNs, NINs, or full bank card details.
            </div>
          </div>
        </section>

        {/* 2. About Alert Lens */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#0B1220]">
            <Info className="w-5 h-5 text-[#06B6D4]" />
            <h3 className="text-base font-extrabold">About Alert Lens NG</h3>
          </div>

          <p className="text-xs text-[#344054] leading-relaxed">
            Alert Lens NG is an AI-assisted digital safety product engineered to identify potentially fraudulent or suspicious messages across <strong>WhatsApp, SMS, Email, and social platforms</strong> before users open links, disclose credentials, or transfer money.
          </p>

          <div className="pt-2 text-[11px] text-[#667085] flex items-center justify-between flex-wrap gap-2">
            <span>Version: <strong>2.4.0 (Prototype Build)</strong></span>
            <span>Target Region: <strong>Nigeria (NG)</strong></span>
          </div>
        </section>

        {/* 3. Product Limitations */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#0B1220]">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-extrabold">Disclosures & Limitations</h3>
          </div>

          <p className="text-xs text-[#344054] leading-relaxed">
            Alert Lens evaluates messages using heuristic pattern detection, domain intelligence, and Gemini AI analysis. While it provides strong indicator detection and safety guidance, it cannot guarantee 100% detection of all emerging threats. Always perform independent verification before transferring money or disclosing sensitive information.
          </p>
        </section>

        {/* 4. Local Data Management */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-[#0B1220]">
            <Database className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base font-extrabold">Local Data Management</h3>
          </div>

          <div className="flex items-center justify-between text-xs flex-wrap gap-3">
            <div>
              <span className="font-bold text-[#0B1220]">Saved Check Records: </span>
              <span className="text-[#667085]">{historyCount} check(s) in local browser storage</span>
            </div>

            <button
              id="settings-clear-history-btn"
              onClick={onClearHistory}
              disabled={historyCount === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[#DC3F50] bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Local History</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

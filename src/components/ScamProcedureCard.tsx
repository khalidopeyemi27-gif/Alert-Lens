import React from 'react';
import {
  Link,
  LogIn,
  Key,
  Lock,
  KeyRound,
  IdCard,
  Building2,
  CreditCard,
  UserCheck,
  ShieldAlert,
  Download,
  Smartphone,
  MonitorPlay,
  Coins,
  ArrowRightLeft,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  AlertTriangle,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { ScamProcedureDetection, ScamActionItem, ActionWarningLevel } from '../types';

interface ScamProcedureCardProps {
  procedureDetection?: ScamProcedureDetection;
}

export const ScamProcedureCard: React.FC<ScamProcedureCardProps> = ({ procedureDetection }) => {
  if (!procedureDetection || !procedureDetection.has_requested_actions || procedureDetection.actions.length === 0) {
    return null;
  }

  const { actions, detected_patterns, highest_action_risk, why_this_matters_summary } = procedureDetection;

  const getActionIcon = (iconKey?: string) => {
    switch (iconKey) {
      case 'Link':
        return <Link className="w-4 h-4" />;
      case 'LogIn':
        return <LogIn className="w-4 h-4" />;
      case 'Key':
        return <Key className="w-4 h-4" />;
      case 'Lock':
        return <Lock className="w-4 h-4" />;
      case 'KeyRound':
        return <KeyRound className="w-4 h-4" />;
      case 'IdCard':
        return <IdCard className="w-4 h-4" />;
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" />;
      case 'Download':
        return <Download className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'MonitorPlay':
        return <MonitorPlay className="w-4 h-4" />;
      case 'Coins':
        return <Coins className="w-4 h-4" />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft className="w-4 h-4" />;
      case 'PhoneCall':
        return <PhoneCall className="w-4 h-4" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getRiskBadge = (level: ActionWarningLevel) => {
    switch (level) {
      case 'CRITICAL':
        return {
          label: '🚨 Very sensitive action',
          badgeClass: 'bg-red-100 text-red-800 border-red-200',
          cardBorder: 'border-red-200 bg-red-50/40',
        };
      case 'HIGH':
        return {
          label: '⚠️ Sensitive action',
          badgeClass: 'bg-orange-100 text-orange-800 border-orange-200',
          cardBorder: 'border-orange-200 bg-orange-50/30',
        };
      case 'MEDIUM':
        return {
          label: '⚠️ Be careful',
          badgeClass: 'bg-amber-100 text-amber-900 border-amber-200',
          cardBorder: 'border-amber-200 bg-amber-50/20',
        };
      case 'LOW':
      default:
        return {
          label: 'ℹ️ Normal action',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          cardBorder: 'border-slate-200 bg-slate-50/50',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              highest_action_risk === 'CRITICAL' || highest_action_risk === 'HIGH'
                ? 'bg-red-100 text-[#DC3F50]'
                : 'bg-blue-100 text-[#2563EB]'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
              Requested Action Sequence
            </span>
            <h3 className="text-base font-bold text-slate-900 leading-snug flex items-center gap-2">
              🛡️ What This Message Is Asking You To Do
            </h3>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold self-start sm:self-auto">
          {actions.length} Action{actions.length > 1 ? 's' : ''} Requested
        </span>
      </div>

      {/* High Risk Patterns Warning */}
      {detected_patterns && detected_patterns.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs sm:text-sm space-y-2">
          <div className="font-extrabold flex items-center gap-2 text-[#DC3F50]">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#DC3F50]" />
            <span>🚨 High-Risk Procedure Combination Detected</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-red-900 text-xs">
            {detected_patterns.map((pattern, idx) => (
              <li key={idx} className="font-medium">
                {pattern}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step by Step Sequence */}
      <div className="space-y-3">
        {actions.map((act, index) => {
          const riskInfo = getRiskBadge(act.risk_level);
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all ${riskInfo.cardBorder}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="p-1 rounded bg-white/80 border border-slate-200 text-slate-700 shrink-0">
                        {getActionIcon(act.icon_key)}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Step {index + 1}: {act.label}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">
                      {act.reason}
                    </p>

                    {act.evidence && (
                      <div className="mt-2 text-xs bg-white/90 p-2.5 rounded-lg border border-slate-200/80 text-slate-600 italic">
                        <span className="not-italic font-bold text-slate-800 block text-[11px] mb-0.5">
                          Exact quote from message:
                        </span>
                        &ldquo;{act.evidence}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                <span
                  className={`self-start text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${riskInfo.badgeClass}`}
                >
                  {riskInfo.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why This Matters Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs sm:text-sm">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>🚦 Why This Matters</span>
        </div>
        <p className="text-slate-700 leading-relaxed">
          {why_this_matters_summary ||
            'Some of these actions involve sensitive information or money. Do not provide passwords, PINs, OTPs, or security codes unless you independently know who you are dealing with and why the information is required.'}
        </p>
      </div>
    </div>
  );
};

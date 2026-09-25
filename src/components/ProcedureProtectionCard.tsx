import React from 'react';
import { ShieldAlert, ShieldCheck, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProcedureAnalysis } from '../types';

interface ProcedureProtectionCardProps {
  procedureAnalysis: ProcedureAnalysis;
  onInterceptClick?: (stepInstruction: string) => void;
}

export const ProcedureProtectionCard: React.FC<ProcedureProtectionCardProps> = ({
  procedureAnalysis,
  onInterceptClick,
}) => {
  if (!procedureAnalysis || !procedureAnalysis.isProcedure || !procedureAnalysis.steps || procedureAnalysis.steps.length === 0) {
    return null;
  }

  const { hasInterruptedStep, interruptedStepNumber, interruptedReason, steps } = procedureAnalysis;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              hasInterruptedStep ? 'bg-red-100 text-[#DC3F50]' : 'bg-emerald-100 text-[#159570]'
            }`}
          >
            {hasInterruptedStep ? <AlertOctagon className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
              Sequential Procedure Analysis
            </span>
            <h4 className="text-base font-bold text-slate-900 leading-snug">
              Submitted Action Sequence ({steps.length} Steps)
            </h4>
          </div>
        </div>

        {/* PROCEDURE INTERRUPTED Badge */}
        {hasInterruptedStep ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC3F50] text-white text-xs font-black uppercase tracking-wider animate-pulse self-start sm:self-auto">
            <ShieldAlert className="w-4 h-4" />
            PROCEDURE INTERRUPTED
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#159570] text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Standard Procedure
          </span>
        )}
      </div>

      {/* Explanation Banner when interrupted */}
      {hasInterruptedStep && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs sm:text-sm space-y-1">
          <div className="font-bold flex items-center gap-2 text-[#DC3F50]">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            Safety Intervention Triggered at Step {interruptedStepNumber || 1}
          </div>
          <p className="text-red-900 leading-relaxed">
            {interruptedReason ||
              'One or more steps instruct you to take high-risk actions such as sending advance fees, providing confidential credentials, or opening unverified external links.'}
          </p>
        </div>
      )}

      {/* Step by Step Breakdown */}
      <div className="space-y-3 pt-1">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className={`p-4 rounded-xl border transition-all ${
              step.isHighRisk
                ? 'bg-red-50/60 border-red-200 shadow-2xs'
                : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                    step.isHighRisk
                      ? 'bg-[#DC3F50] text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {step.stepNumber}
                </span>

                <div>
                  <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                    {step.instruction}
                  </p>

                  {step.isHighRisk && (
                    <div className="mt-2 p-2.5 rounded-lg bg-white border border-red-200 text-xs text-[#DC3F50] font-semibold flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>HIGH RISK ACTION: {step.riskReason}</span>
                    </div>
                  )}
                </div>
              </div>

              {step.isHighRisk && (
                <span className="shrink-0 text-[10px] uppercase font-extrabold px-2 py-1 rounded bg-red-100 text-[#DC3F50]">
                  Interrupted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

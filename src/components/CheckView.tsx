import React from 'react';
import { Checker } from './Checker';
import { AnalysisResultView } from './AnalysisResultView';
import { DemoSection } from './DemoSection';
import { HowItWorks } from './HowItWorks';
import { AnalysisResult, DemoExample, InputType } from '../types';

interface CheckViewProps {
  onAnalysisComplete: (result: AnalysisResult, inputType: InputType, rawContent: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  externalDemo: DemoExample | null;
  onClearExternalDemo: () => void;
  analysisResult: AnalysisResult | null;
  onResetAnalysis: () => void;
  onSelectDemo: (demo: DemoExample) => void;
}

export const CheckView: React.FC<CheckViewProps> = ({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
  externalDemo,
  onClearExternalDemo,
  analysisResult,
  onResetAnalysis,
  onSelectDemo,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="max-w-4xl mx-auto pt-6 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight mb-2">
          🔎 Check a Message
        </h2>
        <p className="text-sm sm:text-base text-[#667085] max-w-xl mx-auto font-medium">
          Paste or enter the suspicious message, link, or online offer below.
        </p>
      </div>

      {/* Primary Checker Input */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Checker
          onAnalysisComplete={onAnalysisComplete}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          externalLoadDemo={externalDemo}
          onClearExternalDemo={onClearExternalDemo}
        />
      </div>

      {/* Analysis Result View (Displayed after submit) */}
      {analysisResult && (
        <div id="analysis-result-view" className="max-w-4xl mx-auto px-4 sm:px-6 animate-in fade-in duration-200">
          <AnalysisResultView
            result={analysisResult}
            onReset={onResetAnalysis}
          />
        </div>
      )}

      {/* Demonstration Scenarios (Try 1-click test cases) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <DemoSection onSelectDemo={onSelectDemo} />
      </div>

      {/* How It Works reference */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <HowItWorks onCheckClick={() => {
          const el = document.getElementById('checker-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }} />
      </div>
    </div>
  );
};

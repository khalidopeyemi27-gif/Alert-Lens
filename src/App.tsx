/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CheckView } from './components/CheckView';
import { HistoryView } from './components/HistoryView';
import { SafetyCenterView } from './components/SafetyCenterView';
import { SettingsView } from './components/SettingsView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { HistoryModal } from './components/HistoryModal';
import { AlertAi } from './components/AlertAi';
import { Bot } from 'lucide-react';
import { AnalysisResult, CheckHistoryItem, DemoExample, InputType, AppPage } from './types';
import { getLocalHistory, saveToHistory, clearLocalHistory } from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<CheckHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAskAssistantOpen, setIsAskAssistantOpen] = useState<boolean>(false);
  const [externalDemo, setExternalDemo] = useState<DemoExample | null>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getLocalHistory());
  }, []);

  const handleAnalysisComplete = (
    result: AnalysisResult,
    inputType: InputType,
    rawContent: string
  ) => {
    setAnalysisResult(result);
    const saved = saveToHistory(inputType, rawContent, result);
    setHistory((prev) => [saved, ...prev.filter((h) => h.id !== saved.id).slice(0, 29)]);

    // Ensure we are on the 'check' page to display the results view
    setCurrentPage('check');

    // Smooth scroll down to the result view
    setTimeout(() => {
      const resultEl = document.getElementById('analysis-result-view');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    setCurrentPage('check');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDemo = (demo: DemoExample) => {
    setExternalDemo(demo);
    setAnalysisResult(null);
    setCurrentPage('check');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryItem = (selected: AnalysisResult) => {
    setAnalysisResult(selected);
    setCurrentPage('check');
    setTimeout(() => {
      const resultEl = document.getElementById('analysis-result-view');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local check history?')) {
      clearLocalHistory();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B1220] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 pb-16 sm:pb-0">
      {/* Header */}
      <Header
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        historyCount={history.length}
        onOpenAskAssistant={() => setIsAskAssistantOpen(true)}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onGoToCheck={() => setCurrentPage('check')}
            onNavigatePage={setCurrentPage}
            recentHistory={history}
            onSelectHistoryItem={(item) => {
              if (item.fullResult) {
                handleSelectHistoryItem(item.fullResult);
              }
            }}
          />
        )}

        {currentPage === 'check' && (
          <CheckView
            onAnalysisComplete={handleAnalysisComplete}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            externalDemo={externalDemo}
            onClearExternalDemo={() => setExternalDemo(null)}
            analysisResult={analysisResult}
            onResetAnalysis={handleResetAnalysis}
            onSelectDemo={handleSelectDemo}
          />
        )}

        {currentPage === 'history' && (
          <HistoryView
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
            onGoToCheck={() => setCurrentPage('check')}
          />
        )}

        {currentPage === 'safety' && <SafetyCenterView />}

        {currentPage === 'settings' && (
          <SettingsView
            historyCount={history.length}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Floating Alert AI Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30">
        <button
          id="floating-alert-ai-btn"
          onClick={() => setIsAskAssistantOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#0B1220] hover:bg-slate-850 text-white rounded-2xl shadow-xl shadow-slate-950/20 border border-slate-700 hover:border-[#06B6D4] transition-all cursor-pointer group hover:scale-105"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[#06B6D4]">
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight">
              <span>Alert AI</span>
            </div>
            <p className="text-[10px] text-slate-300 group-hover:text-[#06B6D4]">
              Safety Assistant
            </p>
          </div>
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        historyCount={history.length}
      />

      {/* Footer */}
      <Footer onSelectPage={setCurrentPage} />

      {/* Alert AI Assistant Modal */}
      {isAskAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <AlertAi
              onClose={() => setIsAskAssistantOpen(false)}
              context={
                analysisResult
                  ? {
                      submittedContent: analysisResult.inputSnippet,
                      inputType: analysisResult.inputType,
                      threatCategory: analysisResult.threatCategory,
                      riskLevel: analysisResult.riskLevel,
                      riskScore: analysisResult.riskScore,
                      redFlags: analysisResult.redFlags,
                      verificationSteps: analysisResult.verificationSteps,
                      organizationCheck: analysisResult.organizationCheck,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}

      {/* Check History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

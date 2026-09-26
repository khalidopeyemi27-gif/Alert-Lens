import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  Send,
  Loader2,
  Bot,
  User,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Lock,
  Building2,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { AlertAiContext, ChatMessage } from '../types';

interface AlertAiProps {
  context?: AlertAiContext;
  isEmbedded?: boolean;
  onClose?: () => void;
}

const STARTER_PROMPTS = [
  'Explain the warning signs detected',
  'How do I verify this independently?',
  'What should I reply (safe refusal)?',
  'Explain this in Nigerian Pidgin',
  'How do I report this to my bank or EFCC?',
];

export const AlertAi: React.FC<AlertAiProps> = ({
  context,
  isEmbedded = false,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const initialText = context?.submittedContent
      ? `Hello! I am Alert AI Safety Assistant inside Alert Lens NG.

I have directly linked the active assessment for this ${
          context.inputType || 'submission'
        }${
          context.organizationCheck?.detectedOrgName
            ? ` claiming to be from ${context.organizationCheck.detectedOrgName}`
            : ''
        }.
• Preliminary Risk Indicator: ${context.preliminaryRiskIndicator || context.riskLevel || 'Preliminary Risk Indicator'}
• Warning signs detected: ${context.warningSignsCount ?? (context.redFlags?.length || 0)}
• Primary action advised: ${context.primaryAction || 'Verify through independent official channels'}

I already have the full details and exact quoted text of your submission, so you do NOT need to re-paste it.

I can explain why specific signs were flagged, draft a safe refusal message, explain in Nigerian Pidgin, or guide you on official Nigerian verification channels (CAC, CBN, SEC, or bank fraud desks). How can I assist you?`
      : `Hello! I am Alert AI Safety Assistant inside Alert Lens NG.

See the warning signs before you act. I can explain suspicious SMS, WhatsApp messages, links, or job/investment offers, guide you through official Nigerian verification channels (CAC, CBN, FCCPC, SEC), or draft safe replies. What would you like to check?`;

    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: initialText,
        timestamp: Date.now(),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showContextPreview, setShowContextPreview] = useState(false);
  const [sensitiveWarning, setSensitiveWarning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    const bvnRegex = /\b\d{11}\b/;
    const pinRegex = /\b(my pin is|pin:|otp:|password is)\s*\d+/i;
    const cardRegex = /\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/;

    if (bvnRegex.test(val) || pinRegex.test(val) || cardRegex.test(val)) {
      setSensitiveWarning(
        '⚠️ Safety Guardrail: Never enter real PINs, OTPs, BVN, passwords, or bank card details into any chat.'
      );
    } else {
      setSensitiveWarning(null);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || loading) return;

    const bvnRegex = /\b\d{11}\b/;
    const pinRegex = /\b(my pin is|pin:|otp:|password is)\s*\d+/i;
    if (bvnRegex.test(question) || pinRegex.test(question)) {
      setSensitiveWarning('⚠️ Please remove any confidential PIN or BVN before submitting.');
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSensitiveWarning(null);
    setLoading(true);

    try {
      const response = await fetch('/api/alert-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          context: context
            ? {
                submittedContent: context.submittedContent,
                inputType: context.inputType,
                threatCategory: context.threatCategory,
                riskLevel: context.riskLevel,
                riskScore: context.riskScore,
                preliminaryRiskIndicator: context.preliminaryRiskIndicator,
                warningSignsCount: context.warningSignsCount,
                redFlags: context.redFlags,
                exactEvidence: context.exactEvidence,
                primaryAction: context.primaryAction,
                verificationSteps: context.verificationSteps,
                organizationCheck: context.organizationCheck,
              }
            : undefined,
          conversationHistory: messages.slice(-4),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach assistant server');
      }

      const data = await response.json();
      const replyText = data.reply || 'Please verify independently through official channels.';

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Alert AI error:', err);
      const fallbackMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `Here is immediate safety guidance:
1. STOP: Do not reply, click links, or transfer money.
2. PROTECT: Never share your 4-digit PIN, BVN, or OTP.
3. VERIFY: Contact the organization directly via an independent phone number or verified app.
4. REPORT: Block the sender and report to your bank's fraud desk or the FCCPC/EFCC.`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: context?.submittedContent
          ? 'Conversation cleared. What other questions do you have about this analysis?'
          : 'Conversation cleared. Ask any question about scam warning signs, CAC check, or protection.',
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <div
      id="alert-ai-container"
      className={`flex flex-col bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden shadow-sm ${
        isEmbedded ? 'my-4' : 'h-full max-h-[85vh]'
      }`}
    >
      {/* Header */}
      <div className="bg-[#0B1220] text-white p-4 flex items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-[#06B6D4]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>Alert AI</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30">
                  Safety Assistant
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-300">
              See the warning signs before you act • Nigerian fraud protection guidance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            title="Clear conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              aria-label="Close Alert AI"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Safety Notice Strip */}
      <div className="bg-[#F7F9FC] border-b border-[#D9E2EC] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#667085]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 font-semibold text-[#0B1220]">
            <Lock className="w-3 h-3 text-[#159570]" />
            Never asks for PIN or OTP
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-[#0B1220]">
            <ShieldAlert className="w-3 h-3 text-[#F59E0B]" />
            Treats content as untrusted
          </span>
        </div>

        {context?.submittedContent && (
          <button
            type="button"
            onClick={() => setShowContextPreview(!showContextPreview)}
            className="text-[#2563EB] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Building2 className="w-3 h-3" />
            <span>Active Assessment Linked</span>
            {showContextPreview ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        )}
      </div>

      {/* Context Preview Drawer */}
      {showContextPreview && context?.submittedContent && (
        <div className="p-3 bg-blue-50/60 border-b border-blue-200 text-xs text-[#0B1220]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#2563EB]">
              Linked Submission ({context.threatCategory || 'Suspicious Content'})
            </span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold border border-blue-200 text-[#0B1220]">
              {context.riskLevel} RISK
            </span>
          </div>
          <p className="font-mono text-[11px] bg-white p-2 rounded border border-blue-200 line-clamp-2 text-[#344054]">
            "{context.submittedContent}"
          </p>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[420px] min-h-[260px] bg-[#F7F9FC]">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-[#0B1220] text-[#06B6D4] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isAssistant
                    ? 'bg-white border border-[#D9E2EC] text-[#0B1220] shadow-2xs'
                    : 'bg-[#2563EB] text-white font-medium shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line space-y-1.5">
                  {msg.content}
                </div>

                {isAssistant && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#667085]">
                    <span className="flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-[#06B6D4]" />
                      Alert AI Safety Guidance
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="flex items-center gap-1 text-[#667085] hover:text-[#0B1220] transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#159570]" />
                          <span className="text-[#159570] font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {!isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-[#344054] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-[#0B1220] text-[#06B6D4] flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#D9E2EC] rounded-xl p-3 shadow-2xs flex items-center gap-2 text-xs text-[#667085]">
              <Loader2 className="w-4 h-4 text-[#2563EB] animate-spin" />
              <span>Analyzing against Nigerian safety protocols...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      <div className="p-3 bg-white border-t border-[#D9E2EC]">
        <p className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-2">
          Suggested Safety Questions:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs bg-[#F7F9FC] hover:bg-blue-50 hover:border-blue-300 hover:text-[#2563EB] border border-[#D9E2EC] text-[#344054] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer text-left disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Sensitive Input Warning */}
      {sensitiveWarning && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-200 flex items-center gap-2 text-xs text-[#DC3F50] font-bold">
          <AlertCircle className="w-4 h-4 text-[#DC3F50] shrink-0" />
          <span>{sensitiveWarning}</span>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-[#D9E2EC] flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          id="alert-ai-input"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask Alert AI about this content, verification, or how to report..."
          disabled={loading}
          className="flex-1 px-3.5 py-2 rounded-xl border border-[#D9E2EC] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 text-xs sm:text-sm text-[#0B1220] placeholder-[#667085] outline-none transition-all disabled:opacity-60"
        />
        <button
          type="submit"
          id="alert-ai-send-btn"
          disabled={!input.trim() || loading}
          className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export const AskScamShield = AlertAi;

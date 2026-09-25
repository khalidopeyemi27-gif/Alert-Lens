export type InputType = 'message' | 'link' | 'offer' | 'email' | 'social_media';

export type AppPage = 'home' | 'check' | 'history' | 'safety' | 'settings';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ThreatCategory =
  | 'Phishing'
  | 'Impersonation'
  | 'Fake job'
  | 'Investment scam'
  | 'Payment/mobile-money scam'
  | 'Fake seller/shop'
  | 'Fraudulent loan'
  | 'Giveaway/prize scam'
  | 'Social-media scam'
  | 'Cryptocurrency/forex scam'
  | 'Account takeover'
  | 'Social engineering'
  | 'Unknown/other';

export interface RedFlag {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  explanation: string;
  exactEvidence: string; // Verbatim quote or direct snippet from the submitted input supporting this flag
}

export type DecisionAction = 'STOP' | 'PROTECT' | 'VERIFY' | 'REPORT' | 'LOW APPARENT RISK — STILL VERIFY';

export type ProtectionAction = 'ALLOW' | 'WARN' | 'BLOCK';

export interface ProtectionDecision {
  action: ProtectionAction;
  reason: string;
  requires_verification: boolean;
  interceptedUrl?: string;
  domain?: string;
}

export interface ProcedureStep {
  stepNumber: number;
  instruction: string;
  isHighRisk: boolean;
  riskReason?: string;
  exactEvidence?: string;
}

export interface ProcedureAnalysis {
  isProcedure: boolean;
  hasInterruptedStep: boolean;
  interruptedStepNumber?: number;
  interruptedReason?: string;
  steps: ProcedureStep[];
}

export type ScamActionType =
  | 'OPEN_LINK'
  | 'LOGIN'
  | 'PROVIDE_PASSWORD'
  | 'PROVIDE_PIN'
  | 'PROVIDE_OTP'
  | 'PROVIDE_BVN'
  | 'PROVIDE_BANK_DETAILS'
  | 'PROVIDE_CARD_DETAILS'
  | 'PROVIDE_PERSONAL_INFORMATION'
  | 'PROVIDE_RECOVERY_CODE'
  | 'DOWNLOAD_FILE'
  | 'INSTALL_APPLICATION'
  | 'INSTALL_SOFTWARE'
  | 'SEND_MONEY'
  | 'PAY_FEE'
  | 'CONTACT_PHONE'
  | 'MOVE_TO_MESSAGING_APP'
  | 'SHARE_CODE'
  | 'OTHER_SENSITIVE_ACTION';

export type ActionWarningLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ScamActionItem {
  action_type: ScamActionType;
  label: string;
  risk_level: ActionWarningLevel;
  evidence: string;
  reason: string;
  icon_key?: string;
}

export interface ScamProcedureDetection {
  has_requested_actions: boolean;
  actions: ScamActionItem[];
  sensitive_action_detected: boolean;
  highest_action_risk: ActionWarningLevel;
  detected_patterns?: string[];
  why_this_matters_summary?: string;
}

export interface RecommendedAction {
  action: 'STOP' | 'VERIFY' | 'PROTECT' | 'REPORT';
  detail: string;
}

export interface EducationConcept {
  title: string;
  concept: string;
  explanation: string;
}

export interface OrganizationCheck {
  detectedOrgName?: string;
  category?: 'Banking' | 'FinTech' | 'Government' | 'Telco' | 'E-commerce' | 'Global Tech' | 'Other';
  platform: InputType;
  isRecognizedOrg: boolean;
  platformSummary: string;
  legitimateRules: string[];
  violations: string[];
  officialChannels?: {
    website?: string;
    domains?: string[];
    senderIds?: string[];
    emails?: string[];
    socialHandles?: string[];
    supportNotes?: string;
  };
}

export type OrganizationType =
  | 'BANK'
  | 'UNIVERSITY'
  | 'EMPLOYER'
  | 'INVESTMENT'
  | 'SELLER'
  | 'GOVERNMENT'
  | 'GENERAL';

export interface VerificationGuidance {
  title: string;
  summary: string;
  steps: string[];
  organizationType: OrganizationType;
  claimedOrgName?: string;
  safetyReminder: string;
}

export interface AnalysisResult {
  riskScore: number; // 0-100 (preliminary risk indicator)
  riskLevel: RiskLevel;
  threatCategory: ThreatCategory;
  summary: string;
  redFlags: RedFlag[];
  evidence: string[];
  securityNotices?: string[]; // Notices where the content warns users against scams/credentials
  organizationCheck?: OrganizationCheck; // How legitimate orgs work across platforms vs this submission
  verificationSteps: string[];
  recommendedActions: RecommendedAction[];
  actionDecision?: DecisionAction; // One clear decision: STOP, PROTECT, VERIFY, REPORT, LOW APPARENT RISK — STILL VERIFY
  protectionDecision?: ProtectionDecision;
  protection_decision?: ProtectionDecision; // API schema snake_case alias
  procedureAnalysis?: ProcedureAnalysis;
  procedureDetection?: ScamProcedureDetection;
  procedure_detection?: ScamProcedureDetection; // API schema snake_case alias
  verificationGuidance?: VerificationGuidance;
  verification_guidance?: VerificationGuidance; // API schema snake_case alias
  sensitiveInfoRequested?: boolean; // Whether content requests passwords, PINs, OTPs, BVN, or card details
  sensitiveInfoNote?: string;
  education: EducationConcept;
  confidence: number;
  inputSnippet?: string;
  inputType?: InputType;
  timestamp?: number;
  sourceNote?: string;
  isPreparedDemo?: boolean;
  isFallback?: boolean;
}

export interface CheckHistoryItem {
  id: string;
  timestamp: number;
  inputType: InputType;
  channel?: string;
  riskLevel: RiskLevel;
  riskScore: number;
  threatCategory: ThreatCategory;
  snippet: string;
  inputSnippet?: string;
  actionDecision?: DecisionAction;
  fullResult?: AnalysisResult;
}

export interface DemoExample {
  id: string;
  title: string;
  category: ThreatCategory;
  type: InputType;
  tag: string;
  description: string;
  content: string;
  senderOrSource?: string;
  expectedRisk: RiskLevel;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AlertAiContext {
  submittedContent?: string;
  inputType?: InputType;
  sourceDetails?: string;
  claimedOrg?: string;
  threatCategory?: ThreatCategory;
  riskLevel?: RiskLevel;
  riskScore?: number;
  preliminaryRiskIndicator?: string;
  warningSignsCount?: number;
  redFlags?: RedFlag[];
  exactEvidence?: string[];
  primaryAction?: string;
  verificationSteps?: string[];
  organizationCheck?: OrganizationCheck;
}

export type AskScamShieldContext = AlertAiContext;

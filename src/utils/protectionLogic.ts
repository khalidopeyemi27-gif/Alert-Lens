import {
  AnalysisResult,
  ProtectionDecision,
  ProtectionAction,
  ProcedureAnalysis,
  ProcedureStep,
  RedFlag,
  RiskLevel,
  ThreatCategory,
  ScamProcedureDetection,
} from '../types';
import { detectScamProcedure } from './procedureDetector';

export function extractDomainName(urlStr: string): string {
  if (!urlStr) return '';
  try {
    let formatted = urlStr.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    const parsed = new URL(formatted);
    return parsed.hostname;
  } catch (e) {
    const match = urlStr.match(/(?:https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    return match ? match[1] : urlStr;
  }
}

export function extractUrlsFromText(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const urlRegex = /(https?:\/\/[^\s"'<>(),]+|[a-zA-Z0-9-]+\.(?:biz|cc|xyz|top|club|online|site|info|pages\.dev|ng-portal|com|org|net|edu|gov|io|app)\b[^\s"'<>(),]*)/gi;
  const matches = text.match(urlRegex) || [];
  const cleaned = matches.map((u) => u.replace(/[.,;)]+$/, ''));
  return Array.from(new Set(cleaned));
}

export function isSuspiciousUrl(urlStr: string): boolean {
  if (!urlStr) return false;
  const domain = extractDomainName(urlStr).toLowerCase();
  const suspiciousExtensions = [
    '.biz',
    '.cc',
    '.xyz',
    '.top',
    '.club',
    '.online',
    '.site',
    '.info',
    '.pages.dev',
    '.ng-portal',
    '.app',
  ];
  const suspiciousKeywords = [
    '-nin',
    '-update',
    'verify-',
    '-quickloan',
    'free-grant',
    'ebank-',
    'cbn-grant',
    'opay-promo',
    'kuda-bonus',
    'revalidate',
  ];

  if (suspiciousExtensions.some((ext) => domain.endsWith(ext))) return true;
  if (suspiciousKeywords.some((kw) => domain.includes(kw) || urlStr.toLowerCase().includes(kw))) return true;

  return false;
}

export function evaluateProtectionDecision(
  riskLevel: RiskLevel,
  redFlags: RedFlag[] = [],
  threatCategory?: ThreatCategory,
  content: string = '',
  interceptedUrl?: string,
  procedureDetection?: ScamProcedureDetection
): ProtectionDecision {
  const proc = procedureDetection || detectScamProcedure(content);

  const hasHighSeverityRedFlags = redFlags.some((rf) => rf.severity === 'HIGH');
  const hasSensitiveInfoDemand =
    redFlags.some((rf) =>
      /pin|otp|password|bvn|nin|card number|cvv|recovery code/i.test(
        rf.title + ' ' + (rf.exactEvidence || '') + ' ' + rf.explanation
      )
    ) || (proc.sensitive_action_detected && (proc.highest_action_risk === 'CRITICAL' || proc.highest_action_risk === 'HIGH'));

  const matchResult = content.match(/(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(biz|cc|pages\.dev|ng-portal)[^\s]*)/i);
  const urlCheck = interceptedUrl || (matchResult ? matchResult[0] : undefined);
  const hasSuspiciousDomain =
    redFlags.some((rf) => /domain|url|link|phishing/i.test(rf.title + ' ' + rf.explanation)) ||
    (urlCheck ? isSuspiciousUrl(urlCheck) : false);

  if (
    riskLevel === 'CRITICAL' ||
    riskLevel === 'HIGH' ||
    hasSensitiveInfoDemand ||
    hasHighSeverityRedFlags ||
    (riskLevel === 'MEDIUM' && hasSuspiciousDomain) ||
    (proc.detected_patterns && proc.detected_patterns.length > 0 && riskLevel !== 'LOW')
  ) {
    let reason =
      'High risk indicators detected. Alert Lens intercepted application navigation to prevent unauthorized credentials access or financial exposure.';
    if (hasSensitiveInfoDemand) {
      reason =
        'Confidential credentials (PIN, OTP, password, or BVN) requested or targeted. Navigation blocked to protect your security.';
    } else if (hasSuspiciousDomain) {
      reason =
        'The destination link points to an unverified or deceptive domain extension. Navigation blocked to prevent credential harvesting.';
    } else if (threatCategory === 'Impersonation' || threatCategory === 'Phishing') {
      reason = 'Potential organizational impersonation detected. Navigation blocked to enforce zero-trust safety.';
    }

    const domain = urlCheck ? extractDomainName(urlCheck) : undefined;

    return {
      action: 'BLOCK',
      reason,
      requires_verification: true,
      interceptedUrl: urlCheck,
      domain,
    };
  }

  if (riskLevel === 'MEDIUM' || redFlags.length > 0) {
    const domain = urlCheck ? extractDomainName(urlCheck) : undefined;
    return {
      action: 'WARN',
      reason:
        'Suspicious or ambiguous indicators exist. Independent verification through official channels is strongly recommended before proceeding.',
      requires_verification: true,
      interceptedUrl: urlCheck,
      domain,
    };
  }

  const domain = urlCheck ? extractDomainName(urlCheck) : undefined;
  return {
    action: 'ALLOW',
    reason: 'No immediate high-risk fraud signals detected. Proceed with standard digital caution.',
    requires_verification: false,
    interceptedUrl: urlCheck,
    domain,
  };
}

export function analyzeProcedure(content: string): ProcedureAnalysis {
  if (!content || typeof content !== 'string') {
    return {
      isProcedure: false,
      hasInterruptedStep: false,
      steps: [],
    };
  }

  const lines = content
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const stepRegex = /^(?:step\s*\d+|\d+[\.\)]|\b(?:first|secondly|thirdly|finally|next)\b)/i;
  const isNumberedProcedure = lines.filter((line) => stepRegex.test(line)).length >= 2;

  const sequenceVerbs = /(?:click|visit|open|enter|input|provide|reply|pay|transfer|send|download|install|call|dial|navigate|revalidate)\b/gi;
  const matches = content.match(sequenceVerbs) || [];
  const hasSequenceActions = matches.length >= 2;

  if (!isNumberedProcedure && !hasSequenceActions) {
    return {
      isProcedure: false,
      hasInterruptedStep: false,
      steps: [],
    };
  }

  let candidateSteps: string[] = [];
  if (isNumberedProcedure) {
    candidateSteps = lines.filter((line) => line.length > 5);
  } else {
    candidateSteps = content
      .split(/(?:\. |\n+|; )/)
      .map((s) => s.trim())
      .filter((s) => s.length > 8 && sequenceVerbs.test(s));
  }

  if (candidateSteps.length === 0) {
    return {
      isProcedure: false,
      hasInterruptedStep: false,
      steps: [],
    };
  }

  const dangerousActions = [
    {
      regex: /(enter|input|provide|reply\s+with|disclose|submit)\s+.*(pin|otp|password|bvn|nin|card\s+number|cvv)/i,
      reason: 'Requests confidential PIN, OTP, BVN, password, or card digits.',
    },
    {
      regex: /(visit|click|open|use\s+the\s+link|navigate\s+to|revalidate)\s+.*(https?:\/\/|[a-zA-Z0-9-]+\.(biz|cc|pages\.dev|ng-portal))/i,
      regexGeneral: /(visit\s+our\s+secure\s+portal|click\s+the\s+link|open\s+the\s+supplied\s+link)/i,
      reason: 'Directs user to an unverified or deceptive external URL.',
    },
    {
      regex: /(pay|transfer|send|deposit|remit|pay\s+a\s+mandatory)\s+.*(₦|naira|fee|charge|upfront|account|accreditation)/i,
      reason: 'Demands advance cash transfer, registration fee, or upfront payment.',
    },
    {
      regex: /(download|install|apk|unknown\s+app)/i,
      reason: 'Directs user to download or install an untrusted application or package.',
    },
    {
      regex: /(anydesk|teamviewer|quicksupport|remote\s+access)/i,
      reason: 'Requests installation of remote-access control software.',
    },
  ];

  let hasInterruptedStep = false;
  let interruptedStepNumber: number | undefined;
  let interruptedReason: string | undefined;

  const steps: ProcedureStep[] = candidateSteps.map((rawStep, index) => {
    const stepNumber = index + 1;
    let isHighRisk = false;
    let riskReason: string | undefined;

    for (const danger of dangerousActions) {
      if (danger.regex.test(rawStep) || (danger.regexGeneral && danger.regexGeneral.test(rawStep))) {
        isHighRisk = true;
        riskReason = danger.reason;
        if (!hasInterruptedStep) {
          hasInterruptedStep = true;
          interruptedStepNumber = stepNumber;
          interruptedReason = riskReason;
        }
        break;
      }
    }

    return {
      stepNumber,
      instruction: rawStep,
      isHighRisk,
      riskReason,
      exactEvidence: rawStep,
    };
  });

  return {
    isProcedure: true,
    hasInterruptedStep,
    interruptedStepNumber,
    interruptedReason,
    steps,
  };
}

export function inspectUrl(url: string, currentResult?: AnalysisResult): ProtectionDecision {
  const domain = extractDomainName(url);
  const isSuspicious = isSuspiciousUrl(url);

  if (currentResult && (currentResult.riskLevel === 'CRITICAL' || currentResult.riskLevel === 'HIGH')) {
    return {
      action: 'BLOCK',
      reason: `Navigation to ${domain || url} blocked because high risk indicators were identified in the source content.`,
      requires_verification: true,
      interceptedUrl: url,
      domain,
    };
  }

  if (isSuspicious) {
    return {
      action: 'BLOCK',
      reason: `Navigation to ${domain} blocked. The domain extension or name structure matches unverified phishing patterns.`,
      requires_verification: true,
      interceptedUrl: url,
      domain,
    };
  }

  if (currentResult && currentResult.riskLevel === 'MEDIUM') {
    return {
      action: 'WARN',
      reason: `Warning: ${domain} was flagged for medium-risk indicators. Verification through an official channel is recommended before opening.`,
      requires_verification: true,
      interceptedUrl: url,
      domain,
    };
  }

  return {
    action: 'ALLOW',
    reason: `No immediate threat indicators detected for ${domain}. Proceed with standard caution.`,
    requires_verification: false,
    interceptedUrl: url,
    domain,
  };
}

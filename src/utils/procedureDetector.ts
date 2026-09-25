import {
  ScamActionItem,
  ScamActionType,
  ScamProcedureDetection,
  ActionWarningLevel,
} from '../types';

interface ActionPattern {
  type: ScamActionType;
  label: string;
  defaultRisk: ActionWarningLevel;
  reason: string;
  regex: RegExp;
  icon_key: string;
}

const ACTION_PATTERNS: ActionPattern[] = [
  {
    type: 'PROVIDE_OTP',
    label: 'Provide an OTP',
    defaultRisk: 'CRITICAL',
    reason: 'The message asks for a one-time security code sent to your phone.',
    regex: /\b(?:enter|input|provide|submit|send|reply\s+with|share|confirm|give|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:otp|one-time\s+passcode|one-time\s+password|verification\s+code|code\s+sent)\b/i,
    icon_key: 'KeyRound',
  },
  {
    type: 'PROVIDE_RECOVERY_CODE',
    label: 'Share a security/recovery code',
    defaultRisk: 'CRITICAL',
    reason: 'The message asks for account recovery or security verification codes.',
    regex: /\b(?:enter|input|provide|submit|send|share|confirm|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:recovery\s+code|security\s+code|backup\s+code|whatsapp\s+code|telegram\s+code)\b/i,
    icon_key: 'ShieldAlert',
  },
  {
    type: 'PROVIDE_PIN',
    label: 'Provide your PIN',
    defaultRisk: 'HIGH',
    reason: 'The message asks for your confidential debit card or transaction PIN.',
    regex: /\b(?:enter|input|provide|submit|send|type|confirm|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,5}\s+\b(?:card|atm|transaction|4-digit|debit)?\s*pin\b/i,
    icon_key: 'Lock',
  },
  {
    type: 'PROVIDE_PASSWORD',
    label: 'Provide a password',
    defaultRisk: 'HIGH',
    reason: 'The message asks for your account password.',
    regex: /\b(?:enter|input|provide|submit|send|type|confirm|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,5}\s+\bpassword\b/i,
    icon_key: 'Key',
  },
  {
    type: 'PROVIDE_BVN',
    label: 'Provide your BVN',
    defaultRisk: 'HIGH',
    reason: 'The message asks for your Bank Verification Number (BVN).',
    regex: /\b(?:enter|input|provide|submit|send|confirm|verify|include)\b(?:\s+[a-zA-Z0-9_-]+){0,5}\s+\b(?:bvn|bank\s+verification\s+number)\b/i,
    icon_key: 'IdCard',
  },
  {
    type: 'PROVIDE_CARD_DETAILS',
    label: 'Provide card details',
    defaultRisk: 'HIGH',
    reason: 'The message asks for your debit or credit card digits.',
    regex: /\b(?:enter|input|provide|submit|send|confirm|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:card\s+number|cvv|expiry|debit\s+card|credit\s+card|atm\s+card)\b/i,
    icon_key: 'CreditCard',
  },
  {
    type: 'PROVIDE_BANK_DETAILS',
    label: 'Provide bank account details',
    defaultRisk: 'HIGH',
    reason: 'The message asks for your bank account details.',
    regex: /\b(?:enter|input|provide|submit|send|confirm|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:bank\s+account|account\s+number|banking\s+details|account\s+info)\b/i,
    icon_key: 'Building2',
  },
  {
    type: 'PAY_FEE',
    label: 'Pay a fee / Send money',
    defaultRisk: 'HIGH',
    reason: 'The message asks you to send money or pay a fee.',
    regex: /\b(?:pay|send|transfer|deposit|remit)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:processing|registration|accreditation|clearance|uniform|stamp\s+duty|interview|screening)?\s*(?:fee|charge|money|payment|₦|naira|\$\d+)\b/i,
    icon_key: 'Coins',
  },
  {
    type: 'SEND_MONEY',
    label: 'Send money',
    defaultRisk: 'HIGH',
    reason: 'The message asks you to transfer funds.',
    regex: /\b(?:send|transfer|deposit|remit|pay)\b(?:\s+[a-zA-Z0-9_-]+){0,4}\s+\b(?:₦|naira|\$)?\s*\d+[\d,]*\b/i,
    icon_key: 'ArrowRightLeft',
  },
  {
    type: 'LOGIN',
    label: 'Log into an account',
    defaultRisk: 'MEDIUM',
    reason: 'The message asks you to enter your account credentials or log in.',
    regex: /\b(?:log\s*in|login|access\s+your\s+(?:student|account|banking|portal|profile)|sign\s*in|enter\s+your\s+(?:student\s+)?credentials)\b/i,
    icon_key: 'LogIn',
  },
  {
    type: 'OPEN_LINK',
    label: 'Open a link',
    defaultRisk: 'LOW',
    reason: 'The message asks you to open an external website or link.',
    regex: /\b(?:click|visit|open|go\s+to|navigate\s+to)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:link|website|portal|url|page|button)\b/i,
    icon_key: 'Link',
  },
  {
    type: 'PROVIDE_PERSONAL_INFORMATION',
    label: 'Provide personal information',
    defaultRisk: 'MEDIUM',
    reason: 'The message asks for personal identification details.',
    regex: /\b(?:enter|input|provide|submit|send|confirm|verify)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:nin|national\s+identity|date\s+of\s+birth|dob|full\s+name|residential\s+address)\b/i,
    icon_key: 'UserCheck',
  },
  {
    type: 'INSTALL_SOFTWARE',
    label: 'Install software or remote control app',
    defaultRisk: 'HIGH',
    reason: 'The message asks you to install software or a remote access tool.',
    regex: /\b(?:install|setup)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:software|anydesk|teamviewer|quicksupport|remote\s+access|remote\s+control)\b/i,
    icon_key: 'MonitorPlay',
  },
  {
    type: 'INSTALL_APPLICATION',
    label: 'Install an application',
    defaultRisk: 'MEDIUM',
    reason: 'The message asks you to install an application on your device.',
    regex: /\b(?:install|setup)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:apk|app|application|mobile\s+app)\b/i,
    icon_key: 'Smartphone',
  },
  {
    type: 'DOWNLOAD_FILE',
    label: 'Download a file or application',
    defaultRisk: 'MEDIUM',
    reason: 'The message asks you to download a file or application.',
    regex: /\b(?:download|save)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:file|attachment|document|pdf|form|app|application|apk|mobile\s+app)\b/i,
    icon_key: 'Download',
  },
  {
    type: 'CONTACT_PHONE',
    label: 'Contact a phone number',
    defaultRisk: 'MEDIUM',
    reason: 'The message asks you to call or contact a phone number.',
    regex: /\b(?:call|contact|dial)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:0\d{10}|\+234\d{10}|\*?\d{3}\*?\d*#?)\b/i,
    icon_key: 'PhoneCall',
  },
  {
    type: 'MOVE_TO_MESSAGING_APP',
    label: 'Move conversation to WhatsApp/Telegram',
    defaultRisk: 'MEDIUM',
    reason: 'The message asks you to move the conversation to an unverified private messaging app.',
    regex: /\b(?:chat|continue|join|dm|message)\b(?:\s+[a-zA-Z0-9_-]+){0,6}\s+\b(?:whatsapp|telegram)\b/i,
    icon_key: 'MessageSquare',
  },
];

// Helper to check if a sentence/clause is framed negatively, educational, or hypothetical
function isProtectiveOrEducationalClause(clause: string): boolean {
  const lower = clause.toLowerCase();

  // 1. Direct Negation Statements ("Never share", "Do not enter", "We will never ask", "Bank will never ask")
  if (
    /\b(?:never|do\s+not|don't|will\s+never|should\s+never|cannot|won't)\b.*?\b(?:share|provide|disclose|give|send|enter|type|reveal|pay|ask|demand|request)\b/i.test(
      lower
    )
  ) {
    return true;
  }

  // 2. Educational, Warning & Guide Contexts
  if (
    /\b(?:guide|article|post|this\s+page|explanation|advisory|warning|notice|tip|safety|security)\b.*?\b(?:explains|shows|warns|teaches|details|highlights|caution|advises)\b/i.test(
      lower
    )
  ) {
    return true;
  }

  if (
    /\b(?:scammers|fraudsters|phishers|fake\s+messages|impostors)\b.*?\b(?:often|frequently|sometimes|may|can|tend\s+to|try\s+to|ask|request|demand|use)\b/i.test(
      lower
    )
  ) {
    return true;
  }

  // 3. Conditional / Hypothetical / Reporting Contexts
  if (
    /\b(?:if\s+you|if\s+a|if\s+anyone|when\s+you|should\s+you|in\s+case\s+you)\b.*?\b(?:receive|get|asked|requested|prompted)\b/i.test(
      lower
    )
  ) {
    return true;
  }

  if (
    /\b(?:report\s+it|report\s+to|notify|ignore|delete|disregard|flag|alert|caution)\b/i.test(
      lower
    ) &&
    /\b(?:if|when|asking|requesting|prompting)\b/i.test(lower)
  ) {
    return true;
  }

  if (
    /\b(?:you\s+might\s+be|may\s+be|could\s+be)\b.*?\b(?:asked|requested|required|prompted)\b/i.test(
      lower
    )
  ) {
    return true;
  }

  // 4. System / Institutional Notification Context (e.g. "Your bank may send you an OTP")
  if (
    /\b(?:bank|system|service|portal|app)\s+(?:may|will|can)\s+(?:send|generate|issue|transmit)\b.*?\b(?:otp|code|passcode)\b/i.test(
      lower
    )
  ) {
    return true;
  }

  return false;
}

export function detectScamProcedure(content: string): ScamProcedureDetection {
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return {
      has_requested_actions: false,
      actions: [],
      sensitive_action_detected: false,
      highest_action_risk: 'LOW',
    };
  }

  // Split content into clauses or sentences to inspect independently
  const sentences = content
    .split(/(?:[\.\n!?;]+|\b(?:then|and then|after that|next)\b)/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);

  const matchedActions: Array<{
    action: ScamActionItem;
    position: number;
  }> = [];

  const seenActionTypes = new Set<ScamActionType>();

  sentences.forEach((sentence) => {
    // CRITICAL: Skip protective, educational, or hypothetical clauses to prevent false positives!
    if (isProtectiveOrEducationalClause(sentence)) {
      return;
    }

    ACTION_PATTERNS.forEach((pattern) => {
      if (seenActionTypes.has(pattern.type)) return;

      const match = sentence.match(pattern.regex);
      if (match) {
        const matchText = match[0].trim();
        const startIdx = content.indexOf(matchText);
        const position = startIdx !== -1 ? startIdx : 0;

        // Clean evidence quote directly from matched substring in sentence
        const evidenceQuote = matchText;

        matchedActions.push({
          position,
          action: {
            action_type: pattern.type,
            label: pattern.label,
            risk_level: pattern.defaultRisk,
            evidence: evidenceQuote,
            reason: pattern.reason,
            icon_key: pattern.icon_key,
          },
        });

        seenActionTypes.add(pattern.type);
      }
    });
  });

  // Sort actions strictly by position in original content to preserve step order!
  matchedActions.sort((a, b) => a.position - b.position);

  const actions = matchedActions.map((m) => m.action);

  // Clean duplicate fee/money actions
  const cleanActions: ScamActionItem[] = [];
  const addedTypes = new Set<string>();

  actions.forEach((act) => {
    if (act.action_type === 'SEND_MONEY' && addedTypes.has('PAY_FEE')) {
      return;
    }
    if (!addedTypes.has(act.action_type)) {
      cleanActions.push(act);
      addedTypes.add(act.action_type);
    }
  });

  const riskRank: Record<ActionWarningLevel, number> = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  };

  let highestRank = 1;
  let highestActionRisk: ActionWarningLevel = 'LOW';

  cleanActions.forEach((act) => {
    const rank = riskRank[act.risk_level] || 1;
    if (rank > highestRank) {
      highestRank = rank;
      highestActionRisk = act.risk_level;
    }
  });

  const sensitive_action_detected = highestRank >= 3;

  const detected_patterns: string[] = [];
  const lowerContent = content.toLowerCase();

  const hasUrgency = /\b(?:urgent|immediately|within\s+\d+|today|deadline|quick|now)\b/i.test(lowerContent);
  const hasReward = /\b(?:bursary|grant|selected|congratulations|prize|winner|reward|stipend)\b/i.test(lowerContent);
  const hasProblem = /\b(?:freeze|blocked|suspended|debit\_freeze|problem|issue|unauthorized|restricted)\b/i.test(lowerContent);
  const hasJob = /\b(?:job|recruitment|vacancy|employment|interview|applicant)\b/i.test(lowerContent);

  const typesSet = new Set(cleanActions.map((a) => a.action_type));

  // Ensure pattern rules only activate if not inside educational/guide context
  const isEducationalOverall = /\b(?:guide|article|post|this\_page|warns|explains|scammers\s+often)\b/i.test(lowerContent);

  if (!isEducationalOverall) {
    if (hasUrgency && typesSet.has('LOGIN') && typesSet.has('PROVIDE_PASSWORD')) {
      detected_patterns.push('Urgent account login & password request pattern');
    }

    if (hasReward && (typesSet.has('OPEN_LINK') || typesSet.has('LOGIN')) && (typesSet.has('PROVIDE_BVN') || typesSet.has('PROVIDE_OTP'))) {
      detected_patterns.push('Unexpected bursary/grant reward requiring link click & sensitive identity/OTP verification');
    }

    if (hasProblem && (typesSet.has('OPEN_LINK') || typesSet.has('LOGIN')) && (typesSet.has('PROVIDE_OTP') || typesSet.has('PROVIDE_PASSWORD'))) {
      detected_patterns.push('Account restriction/threat requiring login & security credential verification');
    }

    if (typesSet.has('PROVIDE_BANK_DETAILS') && (typesSet.has('PAY_FEE') || typesSet.has('SEND_MONEY'))) {
      detected_patterns.push('Bank account request coupled with advance payment/fee demand');
    }

    if (hasJob && (typesSet.has('PAY_FEE') || typesSet.has('SEND_MONEY'))) {
      detected_patterns.push('Recruitment/job opportunity requiring advance registration or processing fee');
    }
  }

  const why_this_matters_summary = cleanActions.length > 0
    ? 'Some of these actions involve sensitive information or money. Do not provide passwords, PINs, OTPs, or security codes unless you independently know who you are dealing with and why the information is required.'
    : undefined;

  return {
    has_requested_actions: cleanActions.length > 0,
    actions: cleanActions,
    sensitive_action_detected,
    highest_action_risk: highestActionRisk,
    detected_patterns: detected_patterns.length > 0 ? detected_patterns : undefined,
    why_this_matters_summary,
  };
}

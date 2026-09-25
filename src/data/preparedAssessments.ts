import { AnalysisResult } from '../types';
import { evaluateProtectionDecision, analyzeProcedure } from '../utils/protectionLogic';
import { generateVerificationGuidance } from '../utils/verificationGuidance';

export const PREPARED_DEMO_ASSESSMENTS: Record<string, AnalysisResult> = {
  'demo-bursary-highrisk': {
    riskScore: 95,
    riskLevel: 'HIGH',
    threatCategory: 'Phishing',
    summary:
      'This message asks for several sensitive actions, including account credentials, banking information, a security code, and money.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: true,
    sensitiveInfoNote: 'This message requests BVN, OTP, account login, and an upfront payment.',
    sourceNote: 'WhatsApp • University Student Affairs',
    procedureDetection: {
      has_requested_actions: true,
      sensitive_action_detected: true,
      highest_action_risk: 'CRITICAL',
      why_this_matters_summary:
        'This message asks for several sensitive actions, including account credentials, banking information, a security code, and money.',
      actions: [
        {
          action_type: 'OPEN_LINK',
          label: 'Open a link',
          risk_level: 'LOW',
          evidence: 'Click this link',
          reason: 'Directs user to open an external website',
        },
        {
          action_type: 'LOGIN',
          label: 'Log into an account',
          risk_level: 'MEDIUM',
          evidence: 'log into your student account',
          reason: 'Requests account credentials',
        },
        {
          action_type: 'PROVIDE_BVN',
          label: 'Provide BVN',
          risk_level: 'HIGH',
          evidence: 'provide your BVN',
          reason: 'Requests national bank verification number',
        },
        {
          action_type: 'PROVIDE_OTP',
          label: 'Enter an OTP',
          risk_level: 'CRITICAL',
          evidence: 'enter the OTP sent to your phone',
          reason: 'Requests one-time security authorization code',
        },
        {
          action_type: 'PAY_FEE',
          label: 'Pay a fee',
          risk_level: 'HIGH',
          evidence: 'pay a ₦2,000 processing fee',
          reason: 'Requires advance payment to release funds',
        },
      ],
    },
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Requests Confidential Security Code (OTP)',
        exactEvidence: 'enter the OTP sent to your phone',
        explanation: 'One-Time Passwords (OTPs) authorize transactions and account access. Never disclose an OTP.',
      },
      {
        severity: 'HIGH',
        title: 'Demands Bank Verification Number (BVN)',
        exactEvidence: 'provide your BVN',
        explanation: 'BVN is sensitive personal financial identity data. Never share it through unverified links or messages.',
      },
      {
        severity: 'HIGH',
        title: 'Upfront Processing Fee for Student Bursary',
        exactEvidence: 'pay a ₦2,000 processing fee',
        explanation: 'Legitimate bursaries and grants never require applicants to pay processing fees.',
      },
    ],
    evidence: [
      'Click this link',
      'log into your student account',
      'provide your BVN',
      'enter the OTP sent to your phone',
      'pay a ₦2,000 processing fee',
    ],
    verificationSteps: [
      'Don\'t use the link or provide the requested information.',
      'Verify the offer through an independently obtained official channel.',
      'Check the official university website separately in your browser.',
      'Contact the Student Affairs office using verified campus contact details.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'Don\'t use the link or provide the requested information. Verify the offer through an independently obtained official channel.',
      },
    ],
    education: {
      title: 'Bursary & Grant Scams',
      concept: 'Multi-Step Exploitation',
      explanation: 'Scammers pair fake grant rewards with urgent demands for login credentials, BVN, OTPs, and advance fees.',
    },
    confidence: 99,
    isPreparedDemo: true,
  },

  'demo-exam-legit': {
    riskScore: 10,
    riskLevel: 'LOW',
    threatCategory: 'Unknown/other',
    summary:
      'This message does not contain strong indicators of a scam.',
    actionDecision: 'VERIFY',
    sensitiveInfoRequested: false,
    sourceNote: 'SMS • University Examination Office',
    redFlags: [],
    evidence: ['Visit the official student portal to view it.'],
    verificationSteps: [
      'Verify independently through official university channels.',
      'Open the official university website separately in your browser.',
      'Note: Low warning signs do not guarantee absolute safety.',
    ],
    recommendedActions: [
      {
        action: 'VERIFY',
        detail: 'Visit the official student portal independently to view your examination timetable.',
      },
    ],
    education: {
      title: 'Authentic Educational Notices',
      concept: 'Standard Portal Guidance',
      explanation: 'Legitimate academic communications direct students to standard official portals without demanding PINs, fees, or urgent payments.',
    },
    confidence: 95,
    isPreparedDemo: true,
  },

  'demo-bank-warning': {
    riskScore: 48,
    riskLevel: 'MEDIUM',
    threatCategory: 'Impersonation',
    summary:
      'This message warns about account revalidation. While it advises visiting physical branches or official support rather than providing suspicious links, caution is advised to verify independently.',
    actionDecision: 'VERIFY',
    sensitiveInfoRequested: false,
    sourceNote: 'SMS • Bank Account Service',
    redFlags: [
      {
        severity: 'MEDIUM',
        title: 'Unverified Account Revalidation Warning',
        exactEvidence: 'Your bank account requires revalidation to prevent service suspension',
        explanation: 'Messages claiming account restriction require independent verification.',
      },
    ],
    evidence: ['Please visit your nearest branch or call official customer support.'],
    verificationSteps: [
      'Do not call phone numbers provided in unverified SMS messages.',
      'Visit a physical bank branch or call the customer care line printed on the back of your debit card.',
      'Open your official mobile banking app directly to check your account status.',
    ],
    recommendedActions: [
      {
        action: 'VERIFY',
        detail: 'Verify your account status directly via your banking app or physical branch.',
      },
    ],
    education: {
      title: 'Bank Notice Verification',
      concept: 'Official Channel Access',
      explanation: 'Always reach out to banks through official physical branches or numbers printed on your debit card.',
    },
    confidence: 90,
    isPreparedDemo: true,
  },

  'demo-1-job': {
    riskScore: 88,
    riskLevel: 'HIGH',
    threatCategory: 'Fake job',
    summary:
      'This job offer exhibits classic advance-fee recruitment fraud. Authentic corporate employers in Nigeria, including SPDC/Shell, never charge candidates accreditation, medical, or uniform fees before interview screening.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: false,
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Upfront Accreditation & Uniform Fee Demand',
        exactEvidence: 'kindly pay a mandatory accreditation fee of ₦7,500 for uniform measurement and accredited medical pre-clearance',
        explanation:
          'Legitimate employers bear all pre-employment assessment and onboarding costs. Demanding an upfront fee before an interview is the most reliable hallmark of a job scam.',
      },
      {
        severity: 'HIGH',
        title: 'Artificial Same-Day Urgency',
        exactEvidence: 'Deadline to pay: 6:00 PM TODAY or your slot will be transferred to another applicant.',
        explanation:
          'Scammers create artificial countdowns to rush applicants into transferring money before they have time to verify the vacancy with the company.',
      },
      {
        severity: 'MEDIUM',
        title: 'Unofficial WhatsApp Recruitment Channel',
        exactEvidence: 'WhatsApp message from +234 814 992 0184 (display name: HR Shell Nigeria Recruitment)',
        explanation:
          'Major multinational corporations publish job listings on their official careers website (.com / .com/careers) and communicate through corporate domain emails, never individual WhatsApp numbers.',
      },
    ],
    evidence: [
      'Fee demand: "mandatory accreditation fee of ₦7,500"',
      'Personal account payee: "0129883491 (GTBank - SPDC Logistics Liaison)"',
      'Artificial deadline: "6:00 PM TODAY"',
    ],
    organizationCheck: {
      detectedOrgName: 'Shell Petroleum Development Company (SPDC)',
      category: 'Other',
      platform: 'offer',
      isRecognizedOrg: true,
      platformSummary: 'SPDC operates strict anti-recruitment fraud policies across Nigeria.',
      legitimateRules: [
        'Shell/SPDC never requests fees at any stage of recruitment.',
        'Official job notices are hosted exclusively on shell.com/careers.',
        'Official recruitment emails come only from @shell.com domains.',
      ],
      violations: [
        'Sender identity cannot be independently verified.',
        'Demanded ₦7,500 accreditation fee before interview.',
        'Recruited via unofficial personal WhatsApp phone number.',
      ],
      officialChannels: {
        website: 'https://www.shell.com.ng/careers.html',
        domains: ['shell.com.ng', 'shell.com'],
        supportNotes: 'Report fraudulent recruitment attempts directly to Shell Nigeria Ethics and Compliance.',
      },
    },
    verificationSteps: [
      'Do not pay medical, registration, uniform, interview, or processing fees.',
      'Search for the vacancy through the company’s official careers page independently.',
      'Confirm the recruiter’s email domain and company contact details.',
      'Do not send money to a personal account to secure a job.',
      'Verify the organisation independently before sharing documents.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'STOP — Do not pay medical, registration, uniform, or interview fees.',
      },
      {
        action: 'REPORT',
        detail: 'Report the WhatsApp account for recruitment fraud and block the sender phone number.',
      },
    ],
    education: {
      title: 'Advance-Fee Job Traps',
      concept: 'The No-Fee Recruitment Rule',
      explanation:
        'Under Nigerian labor best practices and international standards, job applicants never pay to be hired or interviewed. Any request for medical test fees, gate pass charges, or uniform fees is fraudulent.',
    },
    confidence: 96,
    isPreparedDemo: true,
  },

  'demo-2-investment': {
    riskScore: 97,
    riskLevel: 'CRITICAL',
    threatCategory: 'Investment scam',
    summary:
      'This pitch shows textbook Ponzi and crypto arbitrage fraud indicators: guaranteed 200% returns in 48 hours and false claims of regulatory registration with SEC Nigeria.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: false,
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Mathematically Impossible Guaranteed Returns',
        exactEvidence: 'Invest ₦20,000 -> Cashout ₦60,000 in 48 Hours',
        explanation:
          'No legitimate legal investment or trading market can guarantee a 200% return in 48 hours without risk. High returns with zero risk are the definition of Ponzi fraud.',
      },
      {
        severity: 'HIGH',
        title: 'Fictitious Regulatory Registration Claim',
        exactEvidence: '100% automated crypto trading pool registered with SEC Nigeria',
        explanation:
          'SEC Nigeria does not endorse, register, or license automated quick-flip crypto doubling pools. Operators exploit the regulator’s name to fabricate credibility.',
      },
      {
        severity: 'HIGH',
        title: 'Artificial Scarcity & Fast Telegram Payouts',
        exactEvidence: 'Slot closes when 50 slots are filled!',
        explanation:
          'Fabricating urgency compels victims to send money impulsively without conducting due diligence.',
      },
    ],
    evidence: [
      'Guaranteed 200% yield: "Cashout ₦60,000 in 48 Hours"',
      'False regulator endorsement: "registered with SEC Nigeria"',
      'Informal payment proof channel: "Send proof of payment to Admin @crypto_payout_official"',
    ],
    organizationCheck: {
      detectedOrgName: 'Securities and Exchange Commission (SEC) Nigeria / Binance',
      category: 'Government',
      platform: 'offer',
      isRecognizedOrg: true,
      platformSummary: 'SEC Nigeria regulates capital market operators and routinely issues public warnings against illegal fund managers.',
      legitimateRules: [
        'SEC-licensed entities are searchable on sec.gov.ng.',
        'Neither Binance nor SEC operates Telegram investment pools.',
        'Legitimate investments never guarantee fixed triple-digit returns in days.',
      ],
      violations: [
        'Sender identity cannot be independently verified.',
        'Claims nonexistent SEC licensing for a high-yield Telegram scheme.',
        'Promises unrealistic guaranteed 200% return in 48 hours.',
      ],
      officialChannels: {
        website: 'https://sec.gov.ng',
        domains: ['sec.gov.ng'],
        supportNotes: 'Check the SEC Nigeria portal to verify whether an investment manager is licensed.',
      },
    },
    verificationSteps: [
      'Do not transfer money based only on a social-media or Telegram promise.',
      'Be suspicious of guaranteed or unrealistic returns.',
      'Verify the operator through the SEC Nigeria official directory.',
      'Never send funds to a personal account for an investment pool.',
      'Do not share banking credentials or one-time codes.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'STOP — Do not transfer money based on social-media or Telegram promises.',
      },
      {
        action: 'REPORT',
        detail: 'Report the Telegram channel and user handle for financial fraud.',
      },
    ],
    education: {
      title: 'High-Yield Investment Fraud (HYIP)',
      concept: 'The Risk-Return Law',
      explanation:
        'In finance, extraordinary returns are inherently tied to high risk. When an offer promises guaranteed high returns with zero knowledge or zero risk, it is invariably paying early participants with new deposits until it collapses.',
    },
    confidence: 99,
    isPreparedDemo: true,
  },

  'demo-3-impersonation': {
    riskScore: 99,
    riskLevel: 'CRITICAL',
    threatCategory: 'Impersonation',
    summary:
      'Identified 5 specific warning signs in this message: credential demand (PIN/OTP), urgent deadline, account closure threat, suspicious domain, and unverified sender identity.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: true,
    sensitiveInfoNote: 'This message attempts to steal your 4-digit card PIN and SMS OTP. Never disclose these credentials.',
    sourceNote: 'Claimed sender: ZENITH-ALRT. This label alone does not verify authenticity.',
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Requests confidential PIN/OTP credentials',
        exactEvidence: 'Enter your registered phone number, debit card 4-digit PIN and the OTP sent to your phone.',
        explanation:
          'Banks, FinTechs, and regulators never request your 4-digit debit card PIN or SMS OTP via message or link. PIN and OTP grant direct debit access to your funds.',
      },
      {
        severity: 'HIGH',
        title: 'Imposes artificial deadline and urgent pressure',
        exactEvidence: 'update your records within 2 hours',
        explanation:
          'Imposing an artificial 2-hour deadline creates panic, rushing recipients into acting impulsively before they can independently verify with the bank.',
      },
      {
        severity: 'HIGH',
        title: 'Threatens account freeze or financial penalty',
        exactEvidence: 'To avoid permanent account closure and ₦25,000 reactivation penalty',
        explanation:
          'Threats of sudden account forfeiture and arbitrary fines are psychological coercion techniques used to force compliance.',
      },
      {
        severity: 'HIGH',
        title: 'Suspicious or deceptive domain URL',
        exactEvidence: 'https://zenith-ebank-nin-update.ng-portal.biz/revalidate',
        explanation:
          'The link points to "ng-portal.biz", an unofficial third-party domain completely unrelated to the bank\'s authentic domain (zenithbank.com).',
      },
      {
        severity: 'HIGH',
        title: 'Sender identity cannot be independently verified',
        exactEvidence: 'Dear Customer, your Zenith Bank account 208****391 has been placed on temporary debit freeze',
        explanation:
          'The message uses a claimed sender identity, but sender names can be spoofed or imitated. Sender identity cannot be independently verified from the message alone.',
      },
    ],
    evidence: [
      'Direct PIN & OTP theft demand: "Enter your registered phone number, debit card 4-digit PIN and the OTP sent to your phone."',
      'Artificial two-hour deadline: "update your records within 2 hours"',
      'Threat of account closure and fine: "To avoid permanent account closure and ₦25,000 reactivation penalty"',
      'Suspicious non-bank link domain: "https://zenith-ebank-nin-update.ng-portal.biz/revalidate"',
      'Impersonation of bank identity: "Dear Customer, your Zenith Bank account 208****391 has been placed on temporary debit freeze"',
    ],
    organizationCheck: {
      detectedOrgName: 'Zenith Bank Plc',
      category: 'Banking',
      platform: 'message',
      isRecognizedOrg: true,
      platformSummary: 'Zenith Bank is a licensed commercial bank regulated by CBN.',
      legitimateRules: [
        'Zenith Bank only operates on zenithbank.com.',
        'Zenith Bank will never ask for your card PIN, token code, or OTP.',
        'NIN/BVN updates can be processed via the official Zenith Bank mobile app or inside physical branches.',
      ],
      violations: [
        'Sender identity cannot be independently verified.',
        'The claimed sender name alone does not prove that this message came from the bank.',
        'Directs the user to use a link inside the message.',
      ],
      officialChannels: {
        website: 'https://www.zenithbank.com',
        domains: ['zenithbank.com'],
        senderIds: ['ZenithBank', 'ZenithAlert'],
        supportNotes: 'ZenithDirect: 01 278 7000, 0700 ZENITHBANK. Email: zenithdirect@zenithbank.com.',
      },
    },
    verificationSteps: [
      'Do not click the link in the message.',
      'Do not provide your PIN, OTP, BVN, password, or card details.',
      'Open the official banking app independently or type the bank’s official website yourself.',
      'Call the number on the back of your bank card or use the bank’s official app.',
      'If information was already shared, contact the bank’s fraud or emergency support immediately.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'STOP — Do not click the link or share your PIN or OTP.',
      },
      {
        action: 'PROTECT',
        detail: 'PROTECT — Guard your confidential credentials. If already entered, contact your bank immediately to freeze your card.',
      },
      {
        action: 'REPORT',
        detail: 'REPORT — Report through the bank’s official fraud desk (01 278 7000) or EFCC Eagle Eye.',
      },
    ],
    education: {
      title: 'Credential Harvesting & Impersonation',
      concept: 'The Sovereign OTP Rule',
      explanation:
        'An OTP (One-Time Password) and card PIN are keys to authorize money leaving your account. Genuine bank staff and customer support systems have zero need for your OTP or PIN.',
    },
    confidence: 100,
    isPreparedDemo: true,
  },

  'demo-4-payment': {
    riskScore: 84,
    riskLevel: 'HIGH',
    threatCategory: 'Payment/mobile-money scam',
    summary:
      'This is a widely reported accidental transfer reversal scam. Scammers send fake SMS notifications or fraudulent reversal claims, begging the recipient to forward funds before checking their actual ledger balance.',
    actionDecision: 'VERIFY',
    sensitiveInfoRequested: false,
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Urgent Emotional Pressure for Immediate Refund',
        exactEvidence: 'Please have mercy on a struggling mother, do not spend the money, kindly transfer the ₦45,000 back',
        explanation:
          'Scammers use emotional manipulation (e.g. sick children, school fees) to prompt hasty transfers before the victim checks their real bank app.',
      },
      {
        severity: 'HIGH',
        title: 'Redirection to a Different Account and Institution',
        exactEvidence: 'kindly transfer the ₦45,000 back to my sister\'s Moniepoint account: Account: 8109382210 (Moniepoint MFB - Blessing Okon)',
        explanation:
          'Sending money to a third-party account prevents legitimate bank dispute resolution and ensures the scammer collects cash while the original transaction (if any) is reversed or fraudulent.',
      },
      {
        severity: 'MEDIUM',
        title: 'Reliance on SMS Alert Rather Than Ledger Balance',
        exactEvidence: 'You should have received an SMS credit alert just now.',
        explanation:
          'Scammers often send fake SMS alerts from bulk SMS platforms mimicking banks, while no real money ever reached your account.',
      },
    ],
    evidence: [
      'Emotional plea: "school fees to my daughter at UNILAG"',
      'Different recipient account: "Moniepoint MFB - Blessing Okon"',
      'Reliance on SMS alert claim rather than in-app verification',
    ],
    organizationCheck: {
      detectedOrgName: 'OPay / Moniepoint MFB',
      category: 'FinTech',
      platform: 'message',
      isRecognizedOrg: true,
      platformSummary: 'OPay and Moniepoint are CBN-licensed digital banking platforms.',
      legitimateRules: [
        'Genuine transfer errors are resolved through bank-to-bank recall disputes via customer support.',
        'Users should never send money out of their own balance based on an SMS notification.',
        'Always verify in-app settled ledger balance, not SMS text messages.',
      ],
      violations: [
        'Requested immediate manual refund to a different beneficiary account.',
        'Instructed user to rely on incoming SMS alert.',
      ],
      officialChannels: {
        website: 'https://opayweb.com',
        domains: ['opayweb.com', 'moniepoint.com'],
        supportNotes: 'Contact official customer support inside your app to handle suspected erroneous deposits.',
      },
    },
    verificationSteps: [
      'Log into your official banking app and check your actual available balance. Never rely on an incoming SMS text.',
      'Do not transfer any money to the sister’s Moniepoint account.',
      'Advise the caller to contact their bank to file a formal recall dispute. Legitimate banking systems have established recall procedures.',
    ],
    recommendedActions: [
      {
        action: 'VERIFY',
        detail: 'Verify your bank account ledger inside your app. If an unverified credit appears, let your bank handle the recall protocol.',
      },
      {
        action: 'STOP',
        detail: 'Refuse to send money to a third-party account manually.',
      },
    ],
    education: {
      title: 'Accidental Transfer & Fake Credit Alerts',
      concept: 'The Ledger Verification Rule',
      explanation:
        'SMS messages are easy to spoof via bulk SMS providers. Real money is only present if reflected in your settled bank statement inside your verified mobile app.',
    },
    confidence: 92,
    isPreparedDemo: true,
  },

  'demo-5-loan': {
    riskScore: 89,
    riskLevel: 'HIGH',
    threatCategory: 'Fraudulent loan',
    summary:
      'Unlicensed predatory loan scam promising instant funds with zero documentation, conditioned on paying an upfront "stamp duty and documentation" fee via an unofficial cloud-hosted page.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: false,
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Advance Fee for Loan Disbursement',
        exactEvidence: 'statutory documentation and stamp duty charge of ₦4,500 must be remitted first',
        explanation:
          'Legitimate financial institutions deduct legitimate statutory charges from the disbursed loan amount; they never demand advance cash transfers.',
      },
      {
        severity: 'HIGH',
        title: 'Suspicious Cloudflare Pages Link for Federal Loan',
        exactEvidence: 'https://federal-sme-quickloan.pages.dev/apply',
        explanation:
          'Official Nigerian Federal Government schemes use .gov.ng domains, never free third-party hosting on pages.dev.',
      },
      {
        severity: 'MEDIUM',
        title: 'Unrealistic Underwriting Terms',
        exactEvidence: 'No collateral, no guarantor, no bank statements needed. Repay in 24 months. Disburse within 15 minutes',
        explanation:
          'Offering ₦500,000 at 2% annual interest with zero credit appraisal is designed to bait financially vulnerable individuals.',
      },
    ],
    evidence: [
      'Advance fee: "documentation and stamp duty charge of ₦4,500"',
      'Unofficial domain: "federal-sme-quickloan.pages.dev"',
      'Impossibly lenient terms: "2% annual interest... No collateral, no guarantor"',
    ],
    organizationCheck: {
      detectedOrgName: 'Federal Government SME Initiative (Spoofed)',
      category: 'Government',
      platform: 'message',
      isRecognizedOrg: false,
      platformSummary: 'Federal government grant and loan interventions are administered through registered agencies and certified banks.',
      legitimateRules: [
        'Official federal programs operate on .gov.ng websites (e.g. bof.gov.ng, boi.ng).',
        'Official credit providers are licensed by CBN and listed on fccpc.gov.ng.',
        'Processing fees are never remitted upfront via debit cards or personal transfers.',
      ],
      violations: [
        'Uses free cloud subdomain (.pages.dev).',
        'Requires advance payment to unlock loan capital.',
        'Spoofs federal authority without agency attribution.',
      ],
      officialChannels: {
        website: 'https://fccpc.gov.ng',
        domains: ['fccpc.gov.ng', 'cbn.gov.ng'],
        supportNotes: 'Check the FCCPC registry of approved digital money lenders before applying for loans.',
      },
    },
    verificationSteps: [
      'Do not pay an upfront fee to unlock a promised loan.',
      'Verify the lender independently.',
      'Check the relevant official consumer-protection or financial-regulatory source.',
      'Do not send PINs, OTPs, or passwords.',
      'Avoid lenders who create artificial deadlines or threats.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'STOP — Do not pay upfront fees to unlock promised loans.',
      },
      {
        action: 'REPORT',
        detail: 'Report the URL and SMS sender ID to FCCPC and Nigerian financial regulators.',
      },
    ],
    education: {
      title: 'Advance-Fee Loan Schemes',
      concept: 'The Loan Disbursement Principle',
      explanation:
        'A real bank or licensed lender will never ask you to pay cash to get a loan. If an organization asks for money before giving you money, it is a scam.',
    },
    confidence: 95,
    isPreparedDemo: true,
  },

  'demo-6-phishing': {
    riskScore: 98,
    riskLevel: 'CRITICAL',
    threatCategory: 'Phishing',
    summary:
      'High-risk credential harvesting link disguised as an official university student bursary. The web address uses a deceptive typosquatted domain (.cc) to intercept student portal login details.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: true,
    sensitiveInfoNote: 'This link is engineered to capture university student portal credentials or BVN.',
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Typosquatted & Deceptive Subdomain Structure',
        exactEvidence: 'portal-unilag-edu-ng.verify-student-stipend.cc',
        explanation:
          'The real domain is verify-student-stipend.cc (a high-risk .cc domain), while "portal-unilag-edu-ng" is merely a deceptive prefix designed to mislead casual readers.',
      },
      {
        severity: 'HIGH',
        title: 'Insecure HTTP Protocol for Educational Bursary',
        exactEvidence: 'http://',
        explanation:
          'Official university and federal bursary portals mandate encrypted HTTPS connections with valid SSL certificates.',
      },
      {
        severity: 'HIGH',
        title: 'Viral Social Referral Loop',
        exactEvidence: '?ref=whatsapp',
        explanation:
          'Phishing links frequently embed WhatsApp referral parameters, forcing students to share the link to multiple groups before unlocking fictitious bursaries.',
      },
    ],
    evidence: [
      'Deceptive domain name: "verify-student-stipend.cc"',
      'Unencrypted protocol: "http://"',
      'Viral referral tracking parameter: "?ref=whatsapp"',
    ],
    organizationCheck: {
      detectedOrgName: 'University of Lagos (UNILAG) / FG Bursary',
      category: 'Other',
      platform: 'link',
      isRecognizedOrg: true,
      platformSummary: 'The University of Lagos operates exclusively on accredited educational domains.',
      legitimateRules: [
        'Authentic UNILAG web properties end strictly with .unilag.edu.ng.',
        'Official federal bursary programs are hosted on .gov.ng or recognized education portals.',
        'Official portals never use .cc, .biz, or .tk top-level domains.',
      ],
      violations: [
        'Used third-party .cc domain mimicking official institution.',
        'Distributed via viral WhatsApp referral query.',
      ],
      officialChannels: {
        website: 'https://unilag.edu.ng',
        domains: ['unilag.edu.ng'],
        supportNotes: 'Access UNILAG student portal directly at studentportal.unilag.edu.ng.',
      },
    },
    verificationSteps: [
      'Do not open the link again.',
      'Inspect the domain carefully.',
      'Navigate independently to the organisation’s official website.',
      'Do not enter credentials on the suspicious page.',
      'If credentials were entered, change them through the official website and contact the relevant provider.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'STOP — Do not open the link or enter credentials.',
      },
      {
        action: 'REPORT',
        detail: 'Report the link as phishing in WhatsApp and alert fellow students.',
      },
    ],
    education: {
      title: 'Domain Spoofing & Subdomain Tricks',
      concept: 'Reading URLs from Right to Left',
      explanation:
        'To identify the actual owner of a website, look at the text immediately before the last slash. In "portal-unilag.verify.cc", the actual website is "verify.cc", not UNILAG.',
    },
    confidence: 99,
    isPreparedDemo: true,
  },

  'demo-7-seller': {
    riskScore: 86,
    riskLevel: 'HIGH',
    threatCategory: 'Fake seller/shop',
    summary:
      'High-risk fraudulent online vendor. The seller lists a luxury smartphone at 80% below open market value and enforces strict payment before delivery with a personal bank account.',
    actionDecision: 'STOP',
    sensitiveInfoRequested: false,
    redFlags: [
      {
        severity: 'HIGH',
        title: 'Absurdly Low Price for Flagship Device',
        exactEvidence: 'iPhone 15 Pro Max 256GB - ₦280,000 (Market value: ₦1,700,000)',
        explanation:
          'Pricing a new flagship phone at ₦280,000 when market value exceeds ₦1,500,000 is an impossible discount used to entice bargain hunters.',
      },
      {
        severity: 'HIGH',
        title: 'Strict Refusal of Pay on Delivery or Escrow',
        exactEvidence: 'STRICTLY payment before dispatch (no pay on delivery due to delivery rider security)',
        explanation:
          'Scammers always refuse inspection or verified escrow, ensuring they pocket the money before the buyer discovers no item exists.',
      },
      {
        severity: 'MEDIUM',
        title: 'Artificial Customs Auction Excuse',
        exactEvidence: 'FLASH CLEARANCE SALE (Customs Auction Direct Import)',
        explanation:
          '"Customs auction clearance" is one of the most common fictitious pretexts in Nigerian online trade scams.',
      },
    ],
    evidence: [
      'Impossible price: "₦280,000" vs market value "₦1,700,000"',
      'Strict payment rule: "STRICTLY payment before dispatch"',
      'Fake scarcity: "Only 3 units left!"',
    ],
    organizationCheck: {
      detectedOrgName: 'Instagram Online Seller (@gadget_clearance_sales_lagos)',
      category: 'E-commerce',
      platform: 'offer',
      isRecognizedOrg: false,
      platformSummary: 'Independent social media seller without verifiable commercial registration.',
      legitimateRules: [
        'Reputable merchants offer physical walk-in store options or verified escrow.',
        'Standard market pricing conforms to import duties and manufacturer baseline.',
        'Legitimate retailers provide verified business CAC registration numbers.',
      ],
      violations: [
        'Offers goods at 80% discount below manufacturer cost.',
        'Demands full advance bank transfer with no escrow protection.',
      ],
      officialChannels: {
        supportNotes: 'Verify company registration on CAC public search (search.cac.gov.ng) before wiring funds.',
      },
    },
    verificationSteps: [
      'Do not transfer money to the provided bank account.',
      'Request a physical walk-in address to inspect the phone in person or propose a trusted escrow service.',
      'Check the CAC business registration portal at search.cac.gov.ng to see if the business is registered.',
    ],
    recommendedActions: [
      {
        action: 'STOP',
        detail: 'Do not pay before delivery. Authentic sellers of high-value electronics accommodate secure pickup or recognized escrow.',
      },
      {
        action: 'VERIFY',
        detail: 'Demand physical inspection or reputable escrow. If the seller insists on immediate bank transfer, discontinue contact.',
      },
    ],
    education: {
      title: 'Social Media Seller Fraud',
      concept: 'The Escrow Imperative',
      explanation:
        'Social media platforms do not protect direct bank transfers. For high-value purchases, never pay directly into a personal bank account before seeing and testing the device.',
    },
    confidence: 94,
    isPreparedDemo: true,
  },

  'demo-8-legit': {
    riskScore: 8,
    riskLevel: 'LOW',
    threatCategory: 'Unknown/other',
    summary:
      'Preliminary assessment shows low apparent risk. The communication exhibits standard professional recruitment indicators from an authentic corporate domain and explicitly instructs candidates not to pay fees or disclose passwords.',
    actionDecision: 'LOW APPARENT RISK — STILL VERIFY',
    sensitiveInfoRequested: false,
    securityNotices: [
      'Explicitly reminds candidates that recruitment is 100% free',
      'Directly cautions applicants never to disclose confidential passwords, bank details, or verification codes',
    ],
    redFlags: [],
    evidence: [
      'Official domain: "careers@flutterwavego.com"',
      'Safe communication: "There are no fees or payments associated with Flutterwave recruitment"',
      'Protective caution: "never disclose confidential passwords, bank details, or verification codes"',
    ],
    organizationCheck: {
      detectedOrgName: 'Flutterwave Inc.',
      category: 'FinTech',
      platform: 'email',
      isRecognizedOrg: true,
      platformSummary: 'Flutterwave is a regulated payment infrastructure provider.',
      legitimateRules: [
        'Flutterwave communicates via flutterwavego.com and flutterwave.com.',
        'Flutterwave never charges job application or screening fees.',
        'Technical interviews are conducted via standard video platforms without advance fee requirements.',
      ],
      violations: [],
      officialChannels: {
        website: 'https://flutterwave.com',
        domains: ['flutterwave.com', 'flutterwavego.com'],
        supportNotes: 'Careers portal: https://flutterwave.com/careers.',
      },
    },
    verificationSteps: [
      'Confirm the interview invite matches an application you actually submitted on flutterwave.com/careers.',
      'Verify the sender email header ends in @flutterwavego.com or @flutterwave.com.',
      'Join the technical conversation using standard tools without sharing passwords or private credentials.',
    ],
    recommendedActions: [
      {
        action: 'VERIFY',
        detail: 'Check your application records to confirm you applied for this specific role. Proceed through official channels.',
      },
    ],
    education: {
      title: 'Recognizing Authentic Corporate Communication',
      concept: 'Safety Notices & Absence of Fees',
      explanation:
        'Authentic organizations protect their brand by reiterating safety notices. Notice that this email specifically warns you against disclosing credentials or paying money.',
    },
    confidence: 93,
    isPreparedDemo: true,
  },
};

export function getFallbackOrDemoAssessment(
  content: string,
  type: string,
  sourceDetails?: string,
  claimedOrg?: string,
  demoId?: string
): AnalysisResult {
  const enrichResult = (base: AnalysisResult): AnalysisResult => {
    const protectionDecision =
      base.protectionDecision ||
      evaluateProtectionDecision(
        base.riskLevel,
        base.redFlags || [],
        base.threatCategory,
        content
      );
    const procedureAnalysis =
      base.procedureAnalysis || analyzeProcedure(content);
    const verificationGuidance =
      base.verificationGuidance || generateVerificationGuidance(base, content);

    return {
      ...base,
      protectionDecision,
      protection_decision: protectionDecision,
      procedureAnalysis,
      verificationGuidance,
      verification_guidance: verificationGuidance,
    };
  };

  // If specific demoId passed
  if (demoId && PREPARED_DEMO_ASSESSMENTS[demoId]) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS[demoId]);
  }

  // Check matching content against known demo scenarios
  const normalized = content.toLowerCase();
  if (normalized.includes('bursary') || normalized.includes('150,000') || normalized.includes('processing fee') && normalized.includes('bvn')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-bursary-highrisk']);
  }
  if (normalized.includes('examination timetable') || normalized.includes('student portal to view it')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-exam-legit']);
  }
  if (normalized.includes('requires revalidation') || normalized.includes('prevent service suspension')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-bank-warning']);
  }
  if (normalized.includes('accreditation fee') || normalized.includes('spdc') || normalized.includes('uniform measurement')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-1-job']);
  }
  if (normalized.includes('arbitrage') || normalized.includes('cashout') || normalized.includes('100% automated crypto')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-2-investment']);
  }
  if (normalized.includes('debit freeze') || normalized.includes('zenith') || normalized.includes('bvn reconciliation')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-3-impersonation']);
  }
  if (normalized.includes('mistakenly transferred') || normalized.includes('school fees') || normalized.includes('moniepoint')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-4-payment']);
  }
  if (normalized.includes('stamp duty') || normalized.includes('soft loan') || normalized.includes('federal sme relief')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-5-loan']);
  }
  if (normalized.includes('unilag-edu-ng') || normalized.includes('verify-student-stipend') || normalized.includes('.cc/')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-6-phishing']);
  }
  if (normalized.includes('flash clearance') || normalized.includes('strictly payment before dispatch') || normalized.includes('iphone 15 pro')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-7-seller']);
  }
  if (normalized.includes('flutterwave technical interview') || normalized.includes('careers@flutterwavego.com')) {
    return enrichResult(PREPARED_DEMO_ASSESSMENTS['demo-8-legit']);
  }

  // Dynamic local fallback for custom text when network/Gemini times out
  const hasUpfrontFee = /fee|pay|transfer|charge|remit|₦|naira|stamp duty/i.test(normalized);
  const hasUrgency = /urgent|immediately|today|hours?|penalty|freeze|blocked|closed/i.test(normalized);
  const hasCredentials = /pin|otp|password|bvn|nin|card number|cvv/i.test(normalized);
  const hasUnrealistic = /guaranteed|double|triple|100%|200%|free|cashout/i.test(normalized);

  const flags: Array<{ severity: 'HIGH' | 'MEDIUM' | 'LOW'; title: string; exactEvidence: string; explanation: string }> = [];

  if (hasCredentials) {
    flags.push({
      severity: 'HIGH',
      title: 'Confidential Credential Request',
      exactEvidence: 'References PIN, OTP, password, BVN, or verification details in the message',
      explanation: 'Legitimate Nigerian financial institutions and employers never demand PINs, BVN OTPs, or passwords over chat or text.',
    });
  }
  if (hasUpfrontFee) {
    flags.push({
      severity: 'HIGH',
      title: 'Advance Financial Demand',
      exactEvidence: 'References payments, charges, or account transfer instructions',
      explanation: 'Advance-fee traps require upfront payments before releasing jobs, loans, prizes, or parcels.',
    });
  }
  if (hasUrgency) {
    flags.push({
      severity: 'MEDIUM',
      title: 'Artificial Deadlines or Panic Inducement',
      exactEvidence: 'Imposes urgent deadlines or threats of restriction',
      explanation: 'Scammers induce urgency to prevent you from taking time to consult trusted colleagues or verify through formal channels.',
    });
  }
  if (hasUnrealistic) {
    flags.push({
      severity: 'MEDIUM',
      title: 'Unrealistic Promises or Guaranteed Returns',
      exactEvidence: 'Promises unusual yields, bonuses, or instant wealth',
      explanation: 'Financial markets do not offer guaranteed hyper-returns without capital risk.',
    });
  }

  const score = flags.length >= 2 ? 82 : flags.length === 1 ? 65 : 35;
  const level = score >= 75 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';

  return enrichResult({
    riskScore: score,
    riskLevel: level as any,
    threatCategory: hasUpfrontFee
      ? 'Payment/mobile-money scam'
      : hasCredentials
      ? 'Phishing'
      : 'Social engineering',
    summary:
      'Preliminary fallback assessment based on Nigerian fraud detection heuristics. ' +
      (flags.length > 0
        ? `Warning indicators were detected including ${flags.map((f) => f.title.toLowerCase()).join(' and ')}.`
        : 'No overt immediate red flags were detected, but independent channel verification remains strongly recommended.'),
    actionDecision: hasCredentials ? 'PROTECT' : hasUpfrontFee ? 'STOP' : level === 'HIGH' ? 'STOP' : 'VERIFY',
    sensitiveInfoRequested: hasCredentials,
    redFlags: flags,
    evidence: flags.map((f) => f.exactEvidence),
    verificationSteps: [
      'Do not click any unknown links or transfer advance funds.',
      'Reach out directly to the claimed brand or individual using an independently verified phone number.',
      'Check official portals (e.g. CAC search, CBN directory, FCCPC register) rather than relying on phone numbers provided in the message.',
    ],
    recommendedActions: [
      {
        action: hasCredentials ? 'PROTECT' : hasUpfrontFee ? 'STOP' : 'VERIFY',
        detail: hasCredentials
          ? 'Never disclose your OTP, BVN, or ATM card PIN under any circumstance.'
          : hasUpfrontFee
          ? 'Halt payment and request verification through official company accounts.'
          : 'Confirm the validity through independent phone or office channels.',
      },
    ],
    education: {
      title: 'Nigerian Digital Safety Rules',
      concept: 'Independent Channel Verification',
      explanation:
        'Always look up contact numbers or career portals yourself on Google or official corporate websites rather than relying on links or contact numbers contained within suspicious messages.',
    },
    confidence: 84,
    isFallback: true,
  });
}


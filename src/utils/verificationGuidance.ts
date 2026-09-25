import {
  AnalysisResult,
  OrganizationType,
  ProtectionAction,
  RiskLevel,
  VerificationGuidance,
} from '../types';

/**
 * Detects the organization type from analysis results and raw content
 */
export function detectOrganizationType(
  result: Partial<AnalysisResult>,
  content: string = ''
): { organizationType: OrganizationType; claimedOrgName?: string } {
  const text = (content + ' ' + (result.summary || '') + ' ' + (result.sourceNote || '')).toLowerCase();
  const detectedOrgName =
    result.organizationCheck?.detectedOrgName ||
    (text.includes('zenith')
      ? 'Zenith Bank'
      : text.includes('unilag')
      ? 'University of Lagos'
      : text.includes('spdc') || text.includes('shell')
      ? 'Shell Petroleum Development Company'
      : undefined);

  // 1. Check explicitly reported org check category or threat category
  const category = result.organizationCheck?.category;
  const threatCat = result.threatCategory;

  if (
    category === 'Banking' ||
    category === 'FinTech' ||
    threatCat === 'Payment/mobile-money scam' ||
    /bank|zenith|gtbank|access bank|firstbank|uba|opay|kuda|palmpay|fcmb|stanbic|card details|bvn|debit freeze|revalidation/i.test(text)
  ) {
    return { organizationType: 'BANK', claimedOrgName: detectedOrgName || 'Bank' };
  }

  if (
    /university|unilag|bursary|student|portal|matric|exam|faculty|lecturer|scholarship|stipend|school|campus|timetable/i.test(text)
  ) {
    return { organizationType: 'UNIVERSITY', claimedOrgName: detectedOrgName || 'University' };
  }

  if (
    threatCat === 'Fake job' ||
    /job|recruitment|vacancy|career|employment|hiring|interview|work from home|accreditation fee|uniform fee/i.test(text)
  ) {
    return { organizationType: 'EMPLOYER', claimedOrgName: detectedOrgName || 'Employer' };
  }

  if (
    threatCat === 'Investment scam' ||
    threatCat === 'Cryptocurrency/forex scam' ||
    /investment|deposit|return|profit|double your money|ponzi|crypto|arbitrage|cashout/i.test(text)
  ) {
    return { organizationType: 'INVESTMENT', claimedOrgName: detectedOrgName || 'Investment Platform' };
  }

  if (
    threatCat === 'Fake seller/shop' ||
    category === 'E-commerce' ||
    /seller|vendor|shop|instagram|clearance|dispatch|pay before delivery|iphone/i.test(text)
  ) {
    return { organizationType: 'SELLER', claimedOrgName: detectedOrgName || 'Seller' };
  }

  if (
    category === 'Government' ||
    threatCat === 'Fraudulent loan' ||
    /cbn|nin|nimc|tin|firs|fccpc|sec nigeria|cac|grant|palliative|federal government/i.test(text)
  ) {
    return { organizationType: 'GOVERNMENT', claimedOrgName: detectedOrgName || 'Government Agency' };
  }

  return { organizationType: 'GENERAL', claimedOrgName: detectedOrgName };
}

/**
 * Generates context-aware, safety-first independent verification guidance
 */
export function generateVerificationGuidance(
  result: Partial<AnalysisResult>,
  content: string = ''
): VerificationGuidance {
  const { organizationType, claimedOrgName } = detectOrganizationType(result, content);

  const protAction: ProtectionAction =
    result.protectionDecision?.action ||
    result.protection_decision?.action ||
    (result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH'
      ? 'BLOCK'
      : result.riskLevel === 'MEDIUM'
      ? 'WARN'
      : 'ALLOW');

  const safetyReminder =
    "Never verify a suspicious message by using the link, phone number, or contact information provided in the message itself.";

  // Title selection based on Org Type and Risk
  let title = '🔎 Verify Before You Continue';
  if (organizationType === 'BANK') {
    title = '🏦 Verify the Bank Claim';
  } else if (organizationType === 'UNIVERSITY') {
    title = '🏫 Verify the University Claim';
  } else if (organizationType === 'EMPLOYER') {
    title = '💼 Verify the Employment Offer';
  } else if (organizationType === 'INVESTMENT') {
    title = '📈 Verify the Investment Opportunity';
  } else if (organizationType === 'SELLER') {
    title = '🛒 Verify the Seller or Store';
  } else if (organizationType === 'GOVERNMENT') {
    title = '🏛️ Verify the Government Notice';
  } else if (protAction === 'ALLOW') {
    title = '🟢 Verify Official Channel';
  }

  // Summary selection based on Protection Decision
  let summary = '';
  if (protAction === 'BLOCK') {
    summary =
      '🔴 We stopped this action. This message contains strong warning signs and asks you to perform a potentially dangerous action. Next step: Do not use the link or contact details in the message. Verify the claim through an independently obtained official channel.';
  } else if (protAction === 'WARN') {
    summary =
      '🟡 Be careful before continuing. We found something unusual, but not enough evidence to say the message is definitely harmful. Next step: Verify the sender or organization independently before continuing.';
  } else {
    summary =
      '🟢 No major warning signs found. If this message asks you to provide sensitive information or make a payment, verify the request through an official channel before continuing.';
  }

  // Actionable steps customized by Organization Type
  let steps: string[] = [];

  switch (organizationType) {
    case 'BANK':
      steps = [
        "Don't use the link or phone number provided in this message.",
        `Open your ${claimedOrgName || 'bank'}'s official mobile app or website yourself in a new browser tab.`,
        "Contact customer support using the verified phone number printed on the back of your debit card or inside your official banking app.",
        "Remember: Legitimate banks will never demand your PIN, OTP, password, or full card details to resolve an issue.",
      ];
      break;

    case 'UNIVERSITY':
      steps = [
        "Don't use the link or contact information provided in this message.",
        `Open the ${claimedOrgName || 'university'}'s official website separately in your browser.`,
        "Look for the relevant announcement, student portal notice, or exam/bursary updates on the official noticeboard.",
        "Compare the official website address (e.g., ending in .edu.ng) with any link provided in the message.",
        "If you are still unsure, contact Student Affairs or your faculty directly using details from the official website.",
      ];
      break;

    case 'EMPLOYER':
      steps = [
        `Find ${claimedOrgName ? `${claimedOrgName}'s` : "the employer's"} official careers page independently and check whether the vacancy exists there.`,
        "Do not pay an accreditation, medical, uniform, or screening fee to secure employment.",
        "Confirm the recruiter's email domain matches the official corporate domain, not a personal email or unofficial WhatsApp number.",
        "Contact the HR department using verified contact details obtained directly from their official website.",
      ];
      break;

    case 'INVESTMENT':
      steps = [
        "Verify the company and investment opportunity through independently obtained official information.",
        "Check whether the operator is registered on official regulator portals (such as SEC Nigeria or CAC).",
        "Do not send money or transfer funds based solely on the message or its provided social/Telegram link.",
        "Consult a verified financial advisor before depositing any capital.",
      ];
      break;

    case 'SELLER':
      steps = [
        "Verify the seller through independently obtained information, established e-commerce platforms, and trusted contact channels.",
        "Do not rely solely on screenshots, customer testimonials, or links supplied directly by the seller.",
        "Propose physical pickup or use recognized escrow services rather than direct bank transfers for high-value items.",
        "Check the company's official registration on the CAC public search portal (search.cac.gov.ng) before sending funds.",
      ];
      break;

    case 'GOVERNMENT':
      steps = [
        `Open the official ${claimedOrgName || 'government agency'} portal independently (look for official .gov.ng domains).`,
        "Check public announcements on official channels for active grants, palliatives, or portal updates.",
        "Never pay an advance processing fee or disclose your BVN/NIN to claim a government benefit.",
        "Contact the agency using official phone numbers listed on their verified portal.",
      ];
      break;

    case 'GENERAL':
    default:
      steps = [
        "Don't use the link, phone number, or contact information provided in the suspicious message.",
        "Open the organization's official website yourself in a new browser tab.",
        "Look for the relevant announcement, offer, notice, or contact page.",
        "Compare the official website address with the address found in the message.",
        "If you cannot independently verify the claim, do not continue, send money, provide credentials, or share sensitive information.",
      ];
      break;
  }

  return {
    title,
    summary,
    steps,
    organizationType,
    claimedOrgName,
    safetyReminder,
  };
}

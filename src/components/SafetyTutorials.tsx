import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

export interface TutorialItem {
  id: number;
  title: string;
  category: string;
  exampleMessage: string;
  requestedActions: string[];
  warningSigns: string[];
  howToVerify: string[];
  recommendedAction: string;
}

export const TUTORIAL_DATA: TutorialItem[] = [
  {
    id: 1,
    title: 'Fake Student Bursary',
    category: 'Grant / Scholarship Scam',
    exampleMessage:
      'Congratulations! You have been selected for a ₦150,000 national student bursary grant. Click https://bursary-grant-claim.org/login to log into your portal, enter your BVN and OTP to claim payment before midnight.',
    requestedActions: [
      'Open an external link (bursary-grant-claim.org)',
      'Log into an unofficial student account portal',
      'Provide Bank Verification Number (BVN)',
      'Enter One-Time Password (OTP)',
    ],
    warningSigns: [
      'Unexpected financial reward without prior application',
      'Artificial urgency ("claim before midnight")',
      'Demands for sensitive credentials (BVN and OTP)',
      'Unofficial web address (official educational portals end in .edu.ng or .gov.ng)',
    ],
    howToVerify: [
      'Open your university’s official student portal directly in a new browser tab',
      'Check official university noticeboards or verified student affairs channels',
      'Do not click links or call numbers contained inside unsolicited messages',
    ],
    recommendedAction:
      'Don’t click the link or disclose your BVN/OTP. Verify the bursary claim directly through your university’s official student affairs office.',
  },
  {
    id: 2,
    title: 'Fake Job Offer',
    category: 'Employment / Recruitment Scam',
    exampleMessage:
      'URGENT RECRUITMENT: Your CV has been shortlisted for Operations Executive at Zenith Oil Ltd (Salary: ₦450,000/mo). Pay ₦7,500 interview document screening fee to Account 0123456789 (GTBank). Reply on WhatsApp.',
    requestedActions: [
      'Pay an upfront interview document screening fee (₦7,500)',
      'Transfer money to a personal or unverified bank account',
      'Switch official recruitment communication to private WhatsApp numbers',
    ],
    warningSigns: [
      'Demanding upfront payment or screening fees before an interview',
      'Unapplied job offer or unrequested shortlisting',
      'Unrealistic high salary lure to rush decision making',
      'Communicating via private WhatsApp/Telegram instead of official corporate email',
    ],
    howToVerify: [
      'Search for the company’s official corporate careers website directly via a search engine',
      'Contact company HR using verified email addresses or phone numbers listed on their official website',
      'Check if the job position is officially listed on verified company portals',
    ],
    recommendedAction:
      'Never pay money for a job interview or recruitment screening. Reputable organizations never require job applicants to pay fees.',
  },
  {
    id: 3,
    title: 'Bank Impersonation',
    category: 'Banking Phishing / Credential Trap',
    exampleMessage:
      'DEAR CUSTOMER: Your FirstBank account has been suspended due to unverified BVN/NIN linkage. To restore access immediately, visit https://firstbank-bvn-update-portal.com and enter your account number, PIN, and OTP.',
    requestedActions: [
      'Click an external portal link',
      'Enter bank account number',
      'Disclose secret debit card PIN',
      'Enter One-Time Password (OTP)',
    ],
    warningSigns: [
      'Threat of account suspension or account lockdown',
      'Extreme time pressure ("restore immediately")',
      'Requests for secret authentication keys (PIN and OTP)',
      'Lookalike domain name (firstbank-bvn-update-portal.com instead of firstbanknigeria.com)',
    ],
    howToVerify: [
      'Open your official mobile banking application directly on your phone',
      'Call customer care using the official helpline printed on the back of your physical bank card',
      'Visit a physical bank branch near you if you are unsure about account status',
    ],
    recommendedAction:
      'Close the message immediately. Never share your PIN, password, or OTP. Banks will never send links asking for your secret security keys.',
  },
  {
    id: 4,
    title: 'Fake Investment',
    category: 'Ponzi / High-Yield Investment Scam',
    exampleMessage:
      'CRYPTO DOUBLE PROMO: Deposit ₦50,000 with BitGain Global today and receive ₦150,000 guaranteed payout within 24 hours. Over 2,000 Nigerians paid today! Join Telegram group: https://t.me/bitgain_payouts',
    requestedActions: [
      'Transfer money to an investment account',
      'Join an unverified Telegram or WhatsApp investment group',
      'Recruit friends or family for bonus payouts',
    ],
    warningSigns: [
      'Guaranteed high returns in unrealistically short timeframes (e.g. 200% in 24 hours)',
      'Claims of "guaranteed, risk-free" profits',
      'Pressure to act before slots fill up',
      'Operating exclusively through messaging apps like Telegram or WhatsApp',
    ],
    howToVerify: [
      'Check if the investment firm is licensed by the Securities and Exchange Commission (SEC) on sec.gov.ng',
      'Verify corporate registration on the Corporate Affairs Commission (CAC) public registry',
    ],
    recommendedAction:
      'Do not send money. Legitimate financial investments never guarantee 200% returns in 24 hours.',
  },
  {
    id: 5,
    title: 'Fake Online Seller',
    category: 'E-commerce / Social Commerce Scam',
    exampleMessage:
      'FLASH SALE: Brand new iPhone 15 Pro Max for ₦350,000 (Market value ₦1.8M)! Limited stock remaining. Transfer ₦100,000 commitment deposit to Account 9876543210 (Kuda) for immediate dispatch.',
    requestedActions: [
      'Pay an upfront commitment deposit before delivery',
      'Transfer money directly to a personal bank account',
    ],
    warningSigns: [
      'Price is unrealistically low (80% below standard market value)',
      'Demand for upfront deposit before seeing or inspecting the item',
      'Refusal to support pay-on-delivery or verified escrow services',
    ],
    howToVerify: [
      'Insist on inspecting the product in person or using a verified escrow payment service',
      'Check customer reviews and business registration details independently',
    ],
    recommendedAction:
      'Refuse upfront money transfers to unverified social media vendors. Only pay upon physical inspection or through secure escrow.',
  },
  {
    id: 6,
    title: 'Urgent Payment Request',
    category: 'Impersonation / Distress Fraud',
    exampleMessage:
      'Hi Mum, I lost my phone and wallet in an emergency accident on my way to campus. Please urgently send ₦35,000 to this medical assistant’s account: 2345678901 (OPay) for emergency clearance. Don’t call this line, text only.',
    requestedActions: [
      'Urgent money transfer to an unfamiliar third-party account',
      'Instruction NOT to call or verify verbally',
    ],
    warningSigns: [
      'Emotional panic and artificial urgency created to prevent clear thinking',
      'Request to transfer funds to a stranger’s bank account',
      'Explicit instruction not to call the person directly',
    ],
    howToVerify: [
      'Call your relative or friend directly on their known regular phone number',
      'Contact mutual friends, colleagues, or family members to confirm their whereabouts',
    ],
    recommendedAction:
      'Always speak directly over a phone or video call before transferring money to anyone claiming to be a distressed friend or relative.',
  },
  {
    id: 7,
    title: 'Suspicious Link',
    category: 'Phishing / Malicious Link',
    exampleMessage:
      'Federal Govt ₦50,000 Subsidy Relief Fund is currently disbursing! All Nigerian citizens are eligible. Click http://fg-subsidy-grant-relief.xyz/claim to fill your application before portal closes.',
    requestedActions: [
      'Click an unverified external website link',
      'Fill out personal details (NIN, BVN, Bank Account) on an unknown site',
    ],
    warningSigns: [
      'Suspicious web domain extension (.xyz, .top, .info instead of .gov.ng)',
      'Unsolicited federal giveaway or relief claims',
      'Urgency tactic ("before portal closes")',
    ],
    howToVerify: [
      'Look up official government announcements on verified news websites or official .gov.ng portals',
      'Never rely on links distributed in broadcast SMS or WhatsApp messages',
    ],
    recommendedAction:
      'Do not click unknown links with unusual domain extensions. Official Nigerian government web addresses end in .gov.ng.',
  },
  {
    id: 8,
    title: 'Account Verification Scam',
    category: 'Account Takeover / OTP Theft',
    exampleMessage:
      'WhatsApp Security Alert: Someone attempted to log into your WhatsApp account from a new device. We sent a 6-digit code to your SMS. Reply to this message with the 6-digit code immediately to prevent account lockdown.',
    requestedActions: [
      'Reply with a 6-digit SMS verification code / OTP',
      'Share a security code sent to your phone',
    ],
    warningSigns: [
      'Request to share or forward an SMS verification code',
      'Threat of account takeover or immediate lockdown',
      'Message sent from an unknown personal phone number or chat',
    ],
    howToVerify: [
      'Open your official app settings directly to enable Two-Step Verification',
      'Remember that verification codes sent to your phone are strictly for your eyes only',
    ],
    recommendedAction:
      'Never share SMS verification codes or OTPs with anyone. Giving that code to someone else allows them to hijack your account.',
  },
];

interface SafetyTutorialsProps {
  onBackToSafetyCenter?: () => void;
}

export const SafetyTutorials: React.FC<SafetyTutorialsProps> = ({ onBackToSafetyCenter }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentTutorial = TUTORIAL_DATA[currentIndex];
  const total = TUTORIAL_DATA.length;

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Tutorial Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#667085] font-semibold">
            {onBackToSafetyCenter && (
              <button
                id="tutorial-back-to-center-btn"
                onClick={onBackToSafetyCenter}
                className="hover:text-[#2563EB] flex items-center gap-1 cursor-pointer underline decoration-dotted"
              >
                <span>Safety Center</span>
              </button>
            )}
            <span>→</span>
            <span className="text-[#2563EB] font-bold">Safety Tutorials</span>
          </div>
          <h3 className="text-xl font-black text-[#0B1220]">
            Tutorial {currentTutorial.id} of {total}: {currentTutorial.title}
          </h3>
          <p className="text-xs text-[#667085] font-medium">
            Category: <span className="font-bold text-[#0B1220]">{currentTutorial.category}</span>
          </p>
        </div>

        {/* Jump selector */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            id="tutorial-selector-dropdown"
            value={currentIndex}
            onChange={(e) => {
              setCurrentIndex(Number(e.target.value));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-xs font-extrabold text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            {TUTORIAL_DATA.map((t, idx) => (
              <option key={t.id} value={idx}>
                {t.id}. {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Tutorial Content Card */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs space-y-6">
        {/* Step 1: The Message */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Step 1: The Message
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Example message
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800 shadow-inner select-text">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold mb-1.5 pb-1 border-b border-slate-800">
              Example message content (non-clickable links):
            </div>
            <p className="whitespace-pre-wrap">{currentTutorial.exampleMessage}</p>
          </div>
          <p className="text-[11px] text-[#667085] italic">
            * Note: This is an example message constructed for safety education purposes.
          </p>
        </div>

        {/* Step 2: What is this message asking you to do? */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B1220] bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block">
            Step 2: What is this message asking you to do?
          </span>

          <div className="space-y-1.5 text-xs text-[#344054]">
            {currentTutorial.requestedActions.map((act, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F7F9FC] border border-[#D9E2EC]">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  •
                </span>
                <span className="font-medium text-[#0B1220]">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Warning signs */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
            Step 3: Warning signs
          </span>

          <div className="space-y-1.5 text-xs">
            {currentTutorial.warningSigns.map((sign, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/80 text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium">{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: How could you verify it? */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 inline-block">
            Step 4: How could you verify it independently?
          </span>

          <div className="space-y-1.5 text-xs">
            {currentTutorial.howToVerify.map((verifyStep, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-50/40 border border-blue-200/60 text-[#0B1220]">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="font-medium">{verifyStep}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 5: What should you do? */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 font-extrabold text-emerald-900 text-sm">
            <ShieldCheck className="w-5 h-5 text-[#159570]" />
            <span>Step 5: What should you do?</span>
          </div>
          <p className="font-semibold text-[#0B1220] leading-relaxed">
            {currentTutorial.recommendedAction}
          </p>
        </div>
      </div>

      {/* Navigation Footer Controls */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#D9E2EC] shadow-2xs">
        <button
          id="tutorial-prev-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-[#D9E2EC] bg-white hover:bg-slate-50 text-xs font-bold text-[#344054] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Tutorial</span>
        </button>

        <span className="text-xs font-black text-[#667085]">
          {currentIndex + 1} of {total}
        </span>

        <button
          id="tutorial-next-btn"
          onClick={handleNext}
          disabled={currentIndex === total - 1}
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Next Tutorial</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

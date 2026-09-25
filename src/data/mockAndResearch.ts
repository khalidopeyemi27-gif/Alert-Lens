import { DemoExample } from '../types';

export const RESEARCH_FINDINGS = {
  sampleSize: 16,
  disclaimer:
    'Our prototype was informed by initial user research into experiences with online fraud. Respondents reported encountering fake investments, impersonation, fake job advertisements, phishing links, payment requests and other suspicious activities. A major difficulty identified was that scams can look convincing, creating uncertainty about what to trust.',
  statNote: 'Initial exploratory research (n=16) conducted to inform prototype design. Does not claim statistical representation of all Nigerians.',
  demographics: {
    age: [
      { label: '18–24', count: 13, percent: 81 },
      { label: 'Under 18', count: 1, percent: 6 },
      { label: '25–34', count: 1, percent: 6 },
      { label: '35–44', count: 1, percent: 6 },
    ],
    occupation: [
      { label: 'Students', count: 12, percent: 75 },
      { label: 'Self-employed / Business', count: 2, percent: 13 },
      { label: 'Employed', count: 1, percent: 6 },
      { label: 'Unemployed / Job seeker', count: 1, percent: 6 },
    ],
    usage: [
      { label: 'Several times a day', count: 10, percent: 63 },
      { label: 'Occasionally', count: 4, percent: 25 },
      { label: 'Once a day', count: 1, percent: 6 },
      { label: 'Several times a week', count: 1, percent: 6 },
    ],
  },
  experiencedFraudCount: 14, // 14 out of 16
  suspiciousActivities: [
    { name: 'Fake investment opportunities', count: 8 },
    { name: 'Impersonation', count: 7 },
    { name: 'Fake job advertisements', count: 6 },
    { name: 'Phishing messages / links', count: 5 },
    { name: 'Fake mobile-money / payment requests', count: 5 },
    { name: 'Fraudulent loan offers', count: 5 },
    { name: 'Fake online shops / sellers', count: 3 },
    { name: 'Lottery / prize scams', count: 3 },
    { name: 'Cryptocurrency / forex scams', count: 3 },
    { name: 'Social-media account scams', count: 2 },
  ],
  topIndicator: {
    quote: 'The offer seemed too good to be true',
    count: 9,
    others: [
      { text: 'Asked a friend or family member', count: 5 },
      { text: 'Noticed something unusual', count: 4 },
      { text: 'Message / link looked suspicious', count: 3 },
      { text: 'Asked someone with technical knowledge', count: 2 },
      { text: 'Searched online', count: 1 },
      { text: "Checked the person's / company's profile", count: 1 },
    ],
  },
  topDifficulty: {
    quote: 'Scams can look very convincing',
    count: 9,
    others: [
      { text: 'Difficult to tell whether a website/business is genuine', count: 5 },
      { text: 'Not enough cybersecurity knowledge', count: 3 },
      { text: "Don't know warning signs", count: 2 },
      { text: "Don't know where to verify information", count: 2 },
      { text: 'Fake screenshots/documents make scams convincing', count: 2 },
      { text: 'Sender appears to be someone they know', count: 1 },
      { text: "Don't know who to ask for help", count: 1 },
      { text: 'Technical explanations are difficult', count: 1 },
      { text: 'Not enough information to verify', count: 1 },
    ],
  },
  userActionsTaken: [
    { action: 'Ignored / deleted it', count: 6 },
    { action: 'Blocked sender', count: 5 },
    { action: 'Reported account/message', count: 3 },
    { action: 'Checked online', count: 3 },
    { action: 'Reported to an authority/platform', count: 1 },
    { action: 'Contacted the company/person', count: 1 },
  ],
};

export const SYNTHETIC_EXAMPLES: DemoExample[] = [
  {
    id: 'demo-bursary-highrisk',
    title: 'High Risk Bursary Scam — Multi-Step Credential & Fee Demand',
    category: 'Phishing',
    type: 'message',
    tag: '🔴 High Risk Scenario',
    expectedRisk: 'HIGH',
    description: 'A WhatsApp message pretending to be University Student Affairs asking for link click, login, BVN, OTP, and upfront fee.',
    senderOrSource: 'WhatsApp • University Student Affairs',
    content: `Congratulations! You have been selected for a ₦150,000 student bursary. Click this link, log into your student account, provide your BVN, enter the OTP sent to your phone and pay a ₦2,000 processing fee.`,
  },
  {
    id: 'demo-exam-legit',
    title: 'Legitimate Exam Notice — Low Risk Test',
    category: 'Unknown/other',
    type: 'message',
    tag: '🟢 Legitimate Scenario',
    expectedRisk: 'LOW',
    description: 'An SMS from the University Examination Office directing students to the official student portal for exam timetables.',
    senderOrSource: 'SMS • University Examination Office',
    content: `Your examination timetable is now available. Visit the official student portal to view it.`,
  },
  {
    id: 'demo-bank-warning',
    title: 'Account Revalidation Warning — Caution Level',
    category: 'Impersonation',
    type: 'message',
    tag: '⚠️ Caution Level Scenario',
    expectedRisk: 'MEDIUM',
    description: 'An SMS warning about bank account revalidation directing users to physical branches or official support.',
    senderOrSource: 'SMS • Bank Account Service',
    content: `Your bank account requires revalidation to prevent service suspension. Please visit your nearest branch or call official customer support.`,
  },
  {
    id: 'demo-1-job',
    title: 'Fake Job — Upfront Medical and Uniform Fee',
    category: 'Fake job',
    type: 'offer',
    tag: 'Upfront Fee Trap',
    expectedRisk: 'HIGH',
    description: 'A WhatsApp job invite claiming to be from a prominent Nigerian oil firm requiring payment before interview screening.',
    senderOrSource: 'WhatsApp message from +234 814 992 0184 (display name: HR Shell Nigeria Recruitment)',
    content: `CONGRATULATIONS! Following your CV submission on Jobberman, you have been shortlisted for the Executive Administrative Trainee role at Shell Petroleum Development Company (SPDC) Port Harcourt. Salary: ₦450,000/month with accommodation.

To schedule your virtual aptitude screening and receive your interview invite code, kindly pay a mandatory accreditation fee of ₦7,500 for uniform measurement and accredited medical pre-clearance to:
Account: 0129883491 (GTBank - SPDC Logistics Liaison).
Deadline to pay: 6:00 PM TODAY or your slot will be transferred to another applicant.`,
  },
  {
    id: 'demo-2-investment',
    title: 'Investment Scam — Unrealistic Returns',
    category: 'Investment scam',
    type: 'offer',
    tag: 'Unrealistic Returns',
    expectedRisk: 'CRITICAL',
    description: 'Telegram group admin promising to double capital through automated crypto arbitrage.',
    senderOrSource: 'Telegram Group: "Nigeria Wealth Arbitrage Hub"',
    content: `BINANCE NIGERIA ARBITRAGE SYSTEM 🇳🇬🚀
Are you tired of inflation? Join our 100% automated crypto trading pool registered with SEC Nigeria.

• Invest ₦20,000 -> Cashout ₦60,000 in 48 Hours
• Invest ₦50,000 -> Cashout ₦150,000 in 48 Hours
• Invest ₦100,000 -> Cashout ₦320,000 in 48 Hours

Zero trading knowledge required! Over 4,500 active investors paid out daily. Direct bank transfer withdrawals. Send proof of payment to Admin @crypto_payout_official to activate your mining account immediately. Slot closes when 50 slots are filled!`,
  },
  {
    id: 'demo-3-impersonation',
    title: 'Bank Impersonation — Account Freeze Threat',
    category: 'Impersonation',
    type: 'message',
    tag: 'Panic & Freeze Threats',
    expectedRisk: 'CRITICAL',
    description: 'SMS posing as Zenith Bank warning of BVN/NIN mismatch and imminent account restriction.',
    senderOrSource: 'SMS from Sender: "ZENITH-ALRT"',
    content: `Dear Customer, your Zenith Bank account 208****391 has been placed on temporary debit freeze due to a National Identity Number (NIN) and BVN reconciliation error mandated by CBN.

To avoid permanent account closure and ₦25,000 reactivation penalty, update your records within 2 hours:
Visit our secure portal: https://zenith-ebank-nin-update.ng-portal.biz/revalidate
Enter your registered phone number, debit card 4-digit PIN and the OTP sent to your phone.
Zenith Bank - Truly with You.`,
  },
  {
    id: 'demo-4-payment',
    title: 'OPay or Mobile-Money Accidental Transfer Trick',
    category: 'Payment/mobile-money scam',
    type: 'message',
    tag: 'Fake Transfer Reversal',
    expectedRisk: 'HIGH',
    description: 'Stranger claims they mistakenly transferred funds to your account and begs for immediate refund.',
    senderOrSource: 'WhatsApp / Call from unknown number +234 903 552 1198',
    content: `Hello please help me for God's sake! 😭 I was trying to send ₦45,000 school fees to my daughter at UNILAG but I typed your phone number by mistake on my OPay app.

You should have received an SMS credit alert just now. Please have mercy on a struggling mother, do not spend the money, kindly transfer the ₦45,000 back to my sister's Moniepoint account:
Account: 8109382210 (Moniepoint MFB - Blessing Okon).
God will bless you as you do this!`,
  },
  {
    id: 'demo-5-loan',
    title: 'Fraudulent Loan — Upfront Processing Fee',
    category: 'Fraudulent loan',
    type: 'message',
    tag: 'Upfront Processing Fee',
    expectedRisk: 'HIGH',
    description: 'SMS advertising pre-approved credit requiring upfront stamp duty and insurance.',
    senderOrSource: 'SMS from "QUICK-CASH"',
    content: `CONGRATULATIONS! Your credit profile qualifies for a Federal SME Relief soft loan of ₦500,000 at 2% annual interest. No collateral, no guarantor, no bank statements needed. Repay in 24 months.

To disburse funds directly to your verified bank account within 15 minutes, a statutory documentation and stamp duty charge of ₦4,500 must be remitted first. Click: https://federal-sme-quickloan.pages.dev/apply`,
  },
  {
    id: 'demo-6-phishing',
    title: 'Phishing Link — Typosquatted Domain',
    category: 'Phishing',
    type: 'link',
    tag: 'Typosquatting & Deceptive Link',
    expectedRisk: 'CRITICAL',
    description: 'A deceptive link disguised as a standard Nigerian university portal.',
    senderOrSource: 'Shared on student WhatsApp groups',
    content: `http://portal-unilag-edu-ng.verify-student-stipend.cc/fg-bursary/apply?ref=whatsapp`,
  },
  {
    id: 'demo-7-seller',
    title: 'Fake Instagram Seller — Pay Before Dispatch',
    category: 'Fake seller/shop',
    type: 'offer',
    tag: 'Too-Good-To-Be-True Price',
    expectedRisk: 'HIGH',
    description: 'Instagram gadget page advertising an iPhone 15 Pro for ₦280,000 with strict pay-before-delivery policy.',
    senderOrSource: 'Instagram DM / post from @gadget_clearance_sales_lagos',
    content: `🔥 FLASH CLEARANCE SALE (Customs Auction Direct Import) 🔥
iPhone 15 Pro Max 256GB - ₦280,000 (Market value: ₦1,700,000)
Brand new factory sealed with warranty & receipt!

Terms:
1. STRICTLY payment before dispatch (no pay on delivery due to delivery rider security).
2. Free doorstep dispatch anywhere in Lagos or nationwide via GIG Logistics in 24 hours.
3. Only 3 units left! Send payment to account 1029384756 (Kuda Bank - Marvelous Tech Hub) and send screenshot with delivery address.`,
  },
  {
    id: 'demo-8-legit',
    title: 'Legitimate Recruiter — Low-Risk Test',
    category: 'Unknown/other',
    type: 'email',
    tag: 'Legitimate Content Check',
    expectedRisk: 'LOW',
    description: 'A genuine recruitment invitation from a verifiable company domain with no fee demands and reasonable steps.',
    senderOrSource: 'Email from careers@flutterwavego.com',
    content: `Subject: Flutterwave Technical Interview Invitation - Junior Frontend Engineer

Dear Candidate,

Thank you for your recent application for the Junior Frontend Engineer role at Flutterwave. We were impressed by your GitHub portfolio and would like to invite you to a 45-minute technical conversation with our engineering team via Google Meet on Thursday, September 10 at 2:00 PM WAT.

There are no fees or payments associated with Flutterwave recruitment. Please never disclose confidential passwords, bank details, or verification codes to anyone claiming to represent Flutterwave.

If you require any scheduling adjustments, simply reply directly to this email or visit our verified careers portal at https://flutterwave.com/careers.

Warm regards,
People & Culture Team
Flutterwave Inc.`,
  },
];

export const COMMON_SCAM_TYPES = [
  {
    title: 'Fake Investment Schemes',
    surveyStat: 'Reported by 8 respondents (50%)',
    summary: 'Promises of 50% to 200% returns in 24–48 hours, often labeled as crypto arbitrage or forex trading pools.',
    redFlags: ['Guaranteed astronomical daily returns', 'No regulatory registration with SEC Nigeria', 'Requests to pay to withdraw'],
    action: 'Verify with the Securities and Exchange Commission (SEC) Nigeria before sending any money.',
  },
  {
    title: 'Bank & Authority Impersonation',
    surveyStat: 'Reported by 7 respondents (44%)',
    summary: 'Messages falsely claiming to be your bank or the Central Bank of Nigeria (CBN) demanding BVN, NIN, or card PIN.',
    redFlags: ['Threats to freeze or debit account', 'Unofficial phone numbers or spoofed sender IDs', 'Demands for OTP or PIN'],
    action: 'Banks will never ask for your card PIN, BVN OTP, or password over SMS or WhatsApp.',
  },
  {
    title: 'Fake Job Advertisements',
    surveyStat: 'Reported by 6 respondents (38%)',
    summary: 'Job offers promising high salaries but requiring an upfront fee for uniforms, interview slots, aptitude tests, or medicals.',
    redFlags: ['Asked to pay before an interview', 'Hiring without legitimate assessment', 'Free email addresses or WhatsApp recruitment'],
    action: 'Legitimate employers never demand application, screening, or medical clearance fees from candidates.',
  },
  {
    title: 'Fraudulent Loan Apps',
    surveyStat: 'Reported by 5 respondents (31%)',
    summary: 'Unlicensed loan offers demanding upfront "processing fees" or accessing your contacts to harass friends and family.',
    redFlags: ['Demands advance fees to release loan', 'Not registered with FCCPC (Federal Competition and Consumer Protection Commission)', 'Requires full phone contact access'],
    action: 'Check the FCCPC list of registered digital money lenders before engaging.',
  },
  {
    title: 'Fake Online Sellers (Instagram/WhatsApp)',
    surveyStat: 'Reported by 3 respondents (19%)',
    summary: 'Accounts selling gadgets or fashion items at 70% below market value with strict pay-before-delivery rules.',
    redFlags: ['Prices that are impossibly low', 'No physical store location or verifiable reviews', 'Refusal of escrow or inspection on delivery'],
    action: 'Use verified escrow services or inspect items in person in safe public places before transferring funds.',
  },
  {
    title: 'Deceptive Phishing Links',
    surveyStat: 'Reported by 5 respondents (31%)',
    summary: 'Fake login pages replicating bank portals, student stipends, or government grants to steal login details.',
    redFlags: ['Typosquatted domain names (e.g. .biz, .cc, strange subdomains)', 'Unsolicited links promising free cash', 'Urgent countdown timers'],
    action: 'Type the official web address directly into your browser rather than clicking links in messages.',
  },
];

export interface SafetyEducationTopic {
  id: number;
  title: string;
  concept: string;
  whatItLooksLike: string;
  whyItWorks: string;
  howToVerify: string;
  tip: string;
}

export const SAFETY_EDUCATION_TOPICS: SafetyEducationTopic[] = [
  {
    id: 1,
    title: 'Unrealistic Financial Returns',
    concept: 'Greed & Too-Good-To-Be-True Yields',
    whatItLooksLike:
      '“Invest ₦20,000 to receive ₦60,000 within 2 hours guaranteed by Central Bank of Nigeria authorized automated crypto arbitrage bot.”',
    whyItWorks:
      'Exploits high inflation, economic pressure, and fear of missing out (FOMO). Promises guaranteed effortless wealth with zero risk.',
    howToVerify:
      'Check the SEC Nigeria database (sec.gov.ng) for licensed capital operators. Guaranteed doubled returns in hours do not exist in legitimate financial systems.',
    tip: 'If an investment promises guaranteed high returns in hours or days, it is mathematically unsustainable and a Ponzi scheme.',
  },
  {
    id: 2,
    title: 'Upfront Payment for Free Services',
    concept: 'Advance-Fee Trap',
    whatItLooksLike:
      '“Congratulations! You have been shortlisted for the Executive Assistant position at Shell Nigeria. Transfer ₦12,500 for interview medical clearance and safety uniform before tomorrow.”',
    whyItWorks:
      'Leverages hope and sunken cost. Job seekers or loan applicants believe paying a small fee is the final step to a lucrative livelihood.',
    howToVerify:
      'Check official corporate career pages directly. Legitimate multinational and Nigerian employers never require candidates to pay application or uniform fees.',
    tip: 'Never pay money to secure a job or access a loan. Legitimate employers bear recruitment and screening expenses themselves.',
  },
  {
    id: 3,
    title: 'Urgency and Account Threat',
    concept: 'Panic & Manufactured Crisis',
    whatItLooksLike:
      '“URGENT: Your FirstBank account will be permanently blocked within 2 hours due to BVN harmonization failure. Click here immediately or incur ₦35,000 reactivation fee.”',
    whyItWorks:
      'Triggers acute panic and adrenaline, short-circuiting rational deliberation and forcing victims to act before consulting others.',
    howToVerify:
      'Never click SMS links. Open your official banking app directly, or call the verified customer care line printed on the back of your ATM card.',
    tip: 'Commercial banks in Nigeria do not deactivate active accounts via unsolicited SMS countdown links or impose instant reactivation fines.',
  },
  {
    id: 4,
    title: 'Secret Codes or OTP Requests',
    concept: 'Credential & Session Harvesting',
    whatItLooksLike:
      '“A 6-digit verification code has been dispatched to your phone by Zenith Bank Customer Care. Read the code aloud to our agent to reverse a fraudulent debit.”',
    whyItWorks:
      'Pretends to offer protective security assistance. Scammers trigger a real password reset or debit and trick the victim into handing over the final authorization key.',
    howToVerify:
      'Look at the SMS itself: legitimate bank OTP texts specifically read: “Do NOT share this code with anyone, including bank staff.”',
    tip: 'Your OTP is the digital equivalent of signing a check or handing over your wallet. Never read, paste, or forward an OTP to anyone.',
  },
  {
    id: 5,
    title: 'Domain Impersonation',
    concept: 'Typosquatting & Cloned URL Portals',
    whatItLooksLike:
      'https://gtbank-security-update.ng-portal.biz/login or https://opay-claim-bonus.site/verify instead of verified official addresses like gtbank.com or opayweb.com.',
    whyItWorks:
      'Replicates familiar corporate logos, SSL padlocks, and color palettes. On mobile devices, long URLs hide the fraudulent top-level domain.',
    howToVerify:
      'Look at the domain name immediately preceding the first single slash (/). Authentic Nigerian banks use their registered corporate .com or verified .ng domains.',
    tip: 'Bookmark your bank’s official online portal and never enter login credentials through links received via unsolicited messages.',
  },
  {
    id: 6,
    title: 'WhatsApp or Personal Account Payment Directives',
    concept: 'Bypassing Platform Safeguards',
    whatItLooksLike:
      'An Instagram gadget seller or recruiter insists: “Do not make payment on the app due to server maintenance. Transfer directly to my personal OPay account 8012345678.”',
    whyItWorks:
      'Presents reasonable-sounding technical excuses while moving victims off regulated platforms to peer-to-peer transfers that cannot be reversed.',
    howToVerify:
      'Insist on verified escrow payment channels or inspection upon delivery. Search CAC registers for registered company names rather than personal individuals.',
    tip: 'Keep communications and payments inside recognized platform checkout systems with buyer protection.',
  },
  {
    id: 7,
    title: 'Exploitation of National Hardship and Emotion',
    concept: 'Empathy & Subsidy Exploitation',
    whatItLooksLike:
      '“Federal Government ₦50,000 Fuel Subsidy Palliative Disbursement Portal: All Nigerian citizens who did not receive their palliative are entitled to claim now.”',
    whyItWorks:
      'Capitalizes on real economic hardship, fuel subsidy anxieties, and government relief programs to elicit high emotional engagement and viral sharing.',
    howToVerify:
      'Cross-check federal palliative announcements on official government portals (ending in .gov.ng) or verified national news outlets (Channels TV, Punch, Premium Times).',
    tip: 'Government grant programs are announced through official state ministries and official .gov.ng domains, never forwarded WhatsApp chain messages.',
  },
];

import { InputType, OrganizationCheck } from '../types';

export interface OrgPlatformRules {
  legitimateBehavior: string[];
  redFlagViolations: string[];
  authenticExamples: string[];
}

export interface LegitimateOrganization {
  id: string;
  name: string;
  aliases: string[];
  category: 'Banking' | 'FinTech' | 'Government' | 'Telco' | 'E-commerce' | 'Global Tech';
  description: string;
  officialWebsite: string;
  officialDomains: string[];
  officialSenderIds: string[];
  officialEmails: string[];
  verifiedSocialHandles: string[];
  supportChannels: string;
  platformRules: {
    message: OrgPlatformRules;
    email: OrgPlatformRules;
    link: OrgPlatformRules;
    social_media: OrgPlatformRules;
    offer: OrgPlatformRules;
  };
}

export const LEGITIMATE_ORGANIZATIONS: LegitimateOrganization[] = [
  {
    id: 'zenith-bank',
    name: 'Zenith Bank Plc',
    aliases: ['zenith', 'zenith bank', 'zenithbank'],
    category: 'Banking',
    description: 'Tier-1 Nigerian multinational financial services provider regulated by the Central Bank of Nigeria (CBN).',
    officialWebsite: 'https://www.zenithbank.com',
    officialDomains: ['zenithbank.com', 'ibank.zenithbank.com'],
    officialSenderIds: ['ZENITHBANK', 'Zenith Bank'],
    officialEmails: ['zenithdirect@zenithbank.com', '@zenithbank.com'],
    verifiedSocialHandles: ['@ZenithBank (X/Twitter)', '@zenithbankplc (Instagram)', '@ZenithBankPlc (Facebook)'],
    supportChannels: 'Zenith Direct: +234 1 278 7000, 0700ZENITHBANK, official verified in-app chat.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'SMS always uses registered alphanumeric Sender ID "ZENITHBANK", never an 11-digit mobile phone number.',
          'Sends one-time transaction alerts and OTPs ONLY when initiated by the user.',
          'Explicitly warns in SMS alerts: "Never disclose your PIN, OTP, or passwords to anyone."',
        ],
        redFlagViolations: [
          'Received from a standard mobile number (e.g. 080..., 090...) or WhatsApp account claiming to be Zenith Bank.',
          'Instructs user to reply with their 4-digit card PIN, password, or OTP.',
          'Contains an urgent threat of debit freeze or permanent account closure with a link to resolve.',
        ],
        authenticExamples: ['"Acct: 200***1234 credited with ₦15,000. Bal: ₦42,000. Never disclose your PIN or OTP."'],
      },
      email: {
        legitimateBehavior: [
          'Emails originate strictly from official domain "@zenithbank.com".',
          'Addressed to the customer by official registered name, with masked account numbers.',
          'Includes official digital certificates and anti-phishing security disclaimers in the footer.',
        ],
        redFlagViolations: [
          'Sent from free public webmail addresses (e.g., zenithbankhelp@gmail.com, zenith-alerts@yahoo.com).',
          'Urgent instructions to click a button or link to "re-validate BVN", "prevent account suspension", or "claim dividend".',
          'Generic greetings like "Dear Valued Customer" without personalized account details.',
        ],
        authenticExamples: ['Monthly electronic statements sent from "estatements@zenithbank.com" with encrypted PDF.'],
      },
      link: {
        legitimateBehavior: [
          'All web portals reside strictly under official top-level domain "*.zenithbank.com" with a valid SSL/TLS certificate.',
          'Internet banking operates exclusively on "https://ibank.zenithbank.com".',
        ],
        redFlagViolations: [
          'Uses deceptive typosquatting or strange extensions (e.g. zenith-online-update.biz, zenith-ebank.cc, zenith.pages.dev).',
          'Hosted on unbranded blog platforms (e.g. Blogspot, WordPress, ng-portal).',
          'Prompts for full 16-digit debit card number, expiration date, and 3-digit CVV on a non-zenithbank.com page.',
        ],
        authenticExamples: ['https://www.zenithbank.com', 'https://ibank.zenithbank.com'],
      },
      social_media: {
        legitimateBehavior: [
          'Official social media accounts possess verified badges (blue/gold checkmark on X, Instagram, Facebook).',
          'Dedicated support handle is verified (@ZenithBankHelp).',
          'Directs customers to resolve complex queries inside the secured mobile app or official telephone support.',
        ],
        redFlagViolations: [
          'Unverified profiles with slight misspellings (e.g., @ZenithBank_CustHelp, @zenith_care_ng) replying to customer complaints in comment threads.',
          'Requests customers to send their debit card PIN, BVN, or OTP in direct messages (DMs).',
          'Provides a personal WhatsApp number for "urgent customer care assistance" or "unfreezing accounts".',
        ],
        authenticExamples: ['Verified blue-checked @ZenithBank on X/Twitter posting official public notices.'],
      },
      offer: {
        legitimateBehavior: [
          'Official recruitment vacancies posted on zenithbank.com/careers or verified LinkedIn page.',
          'Zero fees: Zenith Bank never charges applicants for application forms, uniforms, aptitude tests, or training.',
        ],
        redFlagViolations: [
          'Demands "accreditation", "medical screening", or "uniform" payment to a personal account before an interview.',
          'Recruitment conducted solely on WhatsApp or Telegram with instant salary promises of ₦400,000+.',
        ],
        authenticExamples: ['Official graduate trainee openings posted directly on zenithbank.com/careers with no upfront fees.'],
      },
    },
  },
  {
    id: 'gtbank',
    name: 'Guaranty Trust Bank (GTBank / GTCO)',
    aliases: ['gtbank', 'gtb', 'gtco', 'guaranty trust', 'guaranty trust bank'],
    category: 'Banking',
    description: 'Leading financial services group operating in Nigeria and West Africa, known for 737 USSD and internet banking.',
    officialWebsite: 'https://www.gtbank.com',
    officialDomains: ['gtbank.com', 'gtcoplc.com'],
    officialSenderIds: ['GTBank', 'GTCO'],
    officialEmails: ['complaints@gtbank.com', '@gtbank.com', '@gtcoplc.com'],
    verifiedSocialHandles: ['@gtbank (X/Twitter)', '@gtbank (Instagram)', '@gtbank (Facebook)'],
    supportChannels: 'GTConnect: +234 1 448 0000, 0700 4826 66328, verified 737 USSD *737#.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'Alphanumeric Sender ID "GTBank" is strictly used for transactional and token SMS.',
          'Official USSD banking in Nigeria is strictly *737#, never alternative 10-digit codes.',
          'Transaction alerts warn: "Never disclose your 737 PIN or token code to anyone, including bank staff."',
        ],
        redFlagViolations: [
          'SMS from 081..., 070... claiming your GTBank account is restricted or BVN is unlinked.',
          'Instructs recipient to dial an unfamiliar USSD code (e.g. *894*... or *312*...) or send their 737 PIN.',
          'Requests user to reply with mobile banking password or hardware token numbers.',
        ],
        authenticExamples: ['"737 Alert: Transfer of N10,000 to John Doe successful. Bal: N50,000. Ref: GTB737..."'],
      },
      email: {
        legitimateBehavior: [
          'Official emails end with "@gtbank.com" or "@gtcoplc.com".',
          'Never asks to reset or submit your internet banking password via an unencrypted email form.',
        ],
        redFlagViolations: [
          'Sender uses "@gtbank-online.com", "@gmail.com", or "@mail-server.ng".',
          'Urgent security warning prompting you to click a button to "Prevent Account Closure".',
        ],
        authenticExamples: ['Transaction receipts sent directly from "geba@gtbank.com" or "alerts@gtbank.com".'],
      },
      link: {
        legitimateBehavior: ['Official internet banking on "https://www.gtbank.com" with certified SSL encryption.'],
        redFlagViolations: [
          'Links like "gtbank-verification-login.com", "gtb-bvn-update.biz", or "gtbank.pages.dev".',
          'URL redirects through multiple URL shorteners (bit.ly, tinyurl) before asking for bank login.',
        ],
        authenticExamples: ['https://www.gtbank.com', 'https://www.gtcoplc.com'],
      },
      social_media: {
        legitimateBehavior: ['Verified @gtbank handles. Official campaigns use #GTBank and link only to gtbank.com.'],
        redFlagViolations: [
          'Impersonator accounts with underscores (e.g. @gtbank_helpdesk_ng) offering to reverse failed transfers.',
          'Directing customers to WhatsApp support numbers asking for token digits or debit card numbers.',
        ],
        authenticExamples: ['Verified @gtbank on X/Twitter with official verification badge.'],
      },
      offer: {
        legitimateBehavior: ['All vacancies are hosted on gtbank.com/careers. Free application process.'],
        redFlagViolations: ['Charging processing fees, aptitude test venue fees, or branded uniform fees.'],
        authenticExamples: ['GTCO Management Trainee program published on official corporate channels.'],
      },
    },
  },
  {
    id: 'opay',
    name: 'OPay Nigeria',
    aliases: ['opay', 'opay digital services', 'opay app'],
    category: 'FinTech',
    description: 'CBN-licensed digital financial services neobank and mobile money operator in Nigeria.',
    officialWebsite: 'https://www.opayweb.com',
    officialDomains: ['opayweb.com', 'opay-inc.com'],
    officialSenderIds: ['OPay', 'OPay Digital'],
    officialEmails: ['support@opay-inc.com', 'antifraud@opay-inc.com'],
    verifiedSocialHandles: ['@OPay_NG (X/Twitter)', '@opay.ng (Instagram)', '@OPayNigeria (Facebook)'],
    supportChannels: 'Official In-App Customer Service, 0700 8888329, 01 8888329.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'Uses official Sender ID "OPay".',
          'Payment alerts confirm credit/debit directly in the app. Balance can always be checked in the official app.',
          'Never instructs a user to immediately refund money via SMS without in-app resolution.',
        ],
        redFlagViolations: [
          'SMS from personal phone number claiming: "I mistakenly sent ₦50,000 to your OPay, please transfer it back to my other bank."',
          'Requires you to provide your 6-digit payment PIN or SMS login code.',
          'Fake OPay credit SMS with no corresponding balance update in the real OPay mobile application.',
        ],
        authenticExamples: ['"OPay Alert: Received ₦5,000 from Jane. View balance in app. Never share your 6-digit payment PIN."'],
      },
      email: {
        legitimateBehavior: ['Official communications come from "@opay-inc.com" or "@opayweb.com".'],
        redFlagViolations: [
          'Emails from "opayservice@gmail.com" or "opay-care@consultant.com".',
          'Offers to upgrade your OPay account to "Merchant Tier 4" in exchange for a fee.',
        ],
        authenticExamples: ['Official security notices from antifraud@opay-inc.com.'],
      },
      link: {
        legitimateBehavior: ['Web access on "https://www.opayweb.com". User logins are heavily safeguarded with 2FA.'],
        redFlagViolations: [
          'Links such as "opay-reward-claim.biz", "opay-promo-cash.com", or "opay-kyc-reactivate.pages.dev".',
          'Landing pages promising free ₦10,000 airtime or cash prizes upon entering OPay mobile number and PIN.',
        ],
        authenticExamples: ['https://www.opayweb.com'],
      },
      social_media: {
        legitimateBehavior: [
          'Verified gold/blue badge handles (@OPay_NG on X). Official live support is conducted inside the app.',
        ],
        redFlagViolations: [
          'Fake customer care accounts commenting under OPay social posts with WhatsApp links.',
          'Telegram channels named "OPay Hack / Money Doubling Bot".',
          'Agents asking for your registered phone number, OTP, and PIN to "clear pending failed transaction".',
        ],
        authenticExamples: ['Verified @OPay_NG posting educational safety graphics and product updates.'],
      },
      offer: {
        legitimateBehavior: ['POS agent onboarding is done via certified aggregator channels or official OPay app.'],
        redFlagViolations: ['Scammers selling "Free OPay POS Terminals" demanding upfront delivery charges to personal bank accounts.'],
        authenticExamples: ['Agent application submitted through OPay official app with zero informal fees.'],
      },
    },
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    aliases: ['flutterwave', 'rave', 'flutter wave'],
    category: 'FinTech',
    description: 'Leading African payments technology company providing payment gateway infrastructure for businesses.',
    officialWebsite: 'https://flutterwave.com',
    officialDomains: ['flutterwave.com', 'flutterwavego.com', 'checkout.flutterwave.com'],
    officialSenderIds: ['Flutterwave'],
    officialEmails: ['hi@flutterwavego.com', '@flutterwavego.com', '@flutterwave.com'],
    verifiedSocialHandles: ['@TheFlutterwave (X/Twitter)', '@theflutterwave (Instagram)', '@Flutterwave (LinkedIn)'],
    supportChannels: 'Official support portal: support.flutterwave.com, in-app dashboard support.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'Sender ID "Flutterwave" is used for payment OTPs and transaction receipts.',
          'Never recruits interns or staff through unsolicited SMS broadcasts.',
        ],
        redFlagViolations: [
          'SMS offering high-paying remote customer service or developer jobs requiring payment for training kits.',
          'Requests to transfer funds to personal accounts claiming to be Flutterwave merchant clearance fees.',
        ],
        authenticExamples: ['"Your Flutterwave payment OTP is 481029. Valid for 10 minutes. Do not share with anyone."'],
      },
      email: {
        legitimateBehavior: [
          'Recruitment emails sent exclusively from "@flutterwavego.com" or verified recruitment platforms (e.g. Greenhouse/Lever).',
          'Explicitly includes anti-fraud notice: "There are no fees associated with Flutterwave recruitment."',
        ],
        redFlagViolations: [
          'Job offers sent from free webmail (e.g. hr.flutterwave@gmail.com).',
          'Requests candidate to pay for medical examination, aptitude test, or training equipment before joining.',
        ],
        authenticExamples: ['Legitimate interview invitation from an @flutterwavego.com address with Google Meet link and no fees.'],
      },
      link: {
        legitimateBehavior: [
          'Payment checkouts are securely hosted on "https://checkout.flutterwave.com".',
          'Corporate website at "https://flutterwave.com".',
        ],
        redFlagViolations: [
          'Checkout or login pages hosted on domains other than flutterwave.com (e.g. flutterwave-pay.cc, flutter-checkout.biz).',
          'Phishing links pretending to be a Flutterwave merchant dashboard on free hosting.',
        ],
        authenticExamples: ['https://checkout.flutterwave.com/v3/hosted/pay/...'],
      },
      social_media: {
        legitimateBehavior: ['Verified handles (@TheFlutterwave). Announcements posted on official blog and LinkedIn.'],
        redFlagViolations: [
          'Fake investment schemes claiming Flutterwave has launched an "automated crypto trading bot" or 200% ROI plan.',
          'Unverified Telegram groups named "Flutterwave Investment Program".',
        ],
        authenticExamples: ['Verified @TheFlutterwave announcing official developer updates and webinars.'],
      },
      offer: {
        legitimateBehavior: ['Job vacancies published on flutterwave.com/careers. Free, merit-based hiring.'],
        redFlagViolations: ['Upfront fee demanded for laptop insurance, background check, or certification.'],
        authenticExamples: ['Engineering openings applied via Greenhouse on flutterwave.com/careers with zero charges.'],
      },
    },
  },
  {
    id: 'cbn',
    name: 'Central Bank of Nigeria (CBN)',
    aliases: ['cbn', 'central bank of nigeria', 'central bank', 'cenbank'],
    category: 'Government',
    description: 'Apex monetary authority and financial system regulator of the Federal Republic of Nigeria.',
    officialWebsite: 'https://www.cbn.gov.ng',
    officialDomains: ['cbn.gov.ng'],
    officialSenderIds: ['CBN', 'CentralBank'],
    officialEmails: ['info@cbn.gov.ng', '@cbn.gov.ng'],
    verifiedSocialHandles: ['@cenbank (X/Twitter)', '@centralbankng (Facebook)'],
    supportChannels: 'Official portal: cbn.gov.ng. Consumer Protection Dept: cpd@cbn.gov.ng.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'CBN DOES NOT send SMS or WhatsApp messages to individuals offering direct personal loans, grants, or cash distributions.',
          'CBN does not contact individuals to threaten debit freezes or demand payment of fines directly.',
        ],
        redFlagViolations: [
          'WhatsApp messages promising "CBN ₦50,000 Presidential Relief Grant" or "CBN SME Empowerment Grant" with a link to apply.',
          'SMS claiming CBN has ordered your bank account to be closed unless you update your BVN on an unofficial link.',
        ],
        authenticExamples: ['Official press releases published on cbn.gov.ng and broadcast on national media.'],
      },
      email: {
        legitimateBehavior: [
          'Official emails end STRICTLY with the official government domain "@cbn.gov.ng".',
          'CBN never emails citizens asking for personal bank account credentials or upfront clearance fees.',
        ],
        redFlagViolations: [
          'Emails from "cbn_governor@gmail.com", "cbn-office@consultant.com", or "cbn.gov.ng.portal-claims.com".',
          'Notice claiming that "unclaimed contract funds or inheritance" of millions of dollars will be released after paying a stamp duty fee.',
        ],
        authenticExamples: ['Official circulars addressed to commercial banks sent from @cbn.gov.ng.'],
      },
      link: {
        legitimateBehavior: ['The ONLY legitimate CBN website is "https://www.cbn.gov.ng" (.gov.ng domain).'],
        redFlagViolations: [
          'Websites using .com, .org, .biz, or .pages.dev (e.g. cbn-grant-portal.com, cbn-empowerment.pages.dev, cbn-relief.ng).',
          'Web forms requesting your BVN, date of birth, mother’s maiden name, and card PIN to receive grant funds.',
        ],
        authenticExamples: ['https://www.cbn.gov.ng'],
      },
      social_media: {
        legitimateBehavior: ['Verified handle @cenbank on X/Twitter. Strictly institutional announcements and monetary policy updates.'],
        redFlagViolations: [
          'Social media posts or sponsored ads claiming CBN is endorsing a crypto doubling scheme or daily trading platform.',
          'Fake accounts impersonating the CBN Governor offering business funding on Facebook or Telegram.',
        ],
        authenticExamples: ['Verified @cenbank announcing Monetary Policy Committee (MPC) rate decisions.'],
      },
      offer: {
        legitimateBehavior: ['Legitimate interventions are channeled through commercial banks or microfinance institutions, never directly via WhatsApp links.'],
        redFlagViolations: ['Charging processing fees (e.g. ₦3,500) to register for a federal grant or intervention.'],
        authenticExamples: ['Official guidelines published on cbn.gov.ng for intervention facilities with commercial bank intermediaries.'],
      },
    },
  },
  {
    id: 'mtn',
    name: 'MTN Nigeria',
    aliases: ['mtn', 'mtn nigeria', 'yello', 'mtn ng'],
    category: 'Telco',
    description: 'Largest telecommunications and mobile network provider in Nigeria, providing mobile, data, and MoMo PSB services.',
    officialWebsite: 'https://www.mtn.ng',
    officialDomains: ['mtn.ng', 'mymtn.com.ng', 'nin.mtn.ng'],
    officialSenderIds: ['MTN', 'MTN Nigeria', '180', '312', '123'],
    officialEmails: ['customercareng@mtn.com', '@mtn.com', '@mtn.ng'],
    verifiedSocialHandles: ['@MTNNG (X/Twitter)', '@MTNLoaded (X/Twitter)', '@mtnng (Instagram)', '@MTNNigeria (Facebook)'],
    supportChannels: 'Dial 180 (from MTN lines), +234 803 1000 180, official MyMTN App.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'Official SMS uses Sender ID "MTN" or official 3-digit shortcodes (180, 312, 131, 303).',
          'Official USSD for NIN linkage is *996# or *785#.',
          'Never informs subscribers they have won millions in a lottery they did not enter.',
        ],
        redFlagViolations: [
          'SMS from normal phone number claiming: "CONGRATULATIONS! Your MTN SIM won ₦5,000,000 in the MTN Promo. Call Mr. Musa to claim."',
          'Instructs customer to send recharge card PINs or pay a "redemption/clearance fee" before receiving prize.',
          'Urgent notice that your SIM will be disconnected in 2 hours unless you click an unverified .biz link to link NIN.',
        ],
        authenticExamples: ['"Dear Customer, check your data balance by dialing *312*4#. Never share your SIM registration OTP."'],
      },
      email: {
        legitimateBehavior: ['Official emails originate from "@mtn.com" or "@mtn.ng".'],
        redFlagViolations: [
          'Emails from "mtn-nigeria-rewards@gmail.com" offering cash prizes.',
          'Job offers for MTN call center requiring candidate to pay for an interview ID badge.',
        ],
        authenticExamples: ['E-billing statements and newsletters sent from official @mtn.com domain.'],
      },
      link: {
        legitimateBehavior: ['Official portals on "*.mtn.ng" (e.g. nin.mtn.ng, www.mtn.ng).'],
        redFlagViolations: [
          'Links like "mtn-free-50gb-data.cc", "mtn-nin-relink.pages.dev", or "mtn-promo-claim.biz".',
          'Web pages claiming to give free 50GB data if you share the link to 10 WhatsApp groups.',
        ],
        authenticExamples: ['https://www.mtn.ng', 'https://nin.mtn.ng'],
      },
      social_media: {
        legitimateBehavior: ['Verified handles (@MTNNG). Customer support handles are verified.'],
        redFlagViolations: [
          'Impersonators in the comments of MTN posts claiming to be "MTN technical team" giving private WhatsApp numbers to resolve network issues.',
        ],
        authenticExamples: ['Verified @MTNNG resolving queries on X with verified customer support agents.'],
      },
      offer: {
        legitimateBehavior: ['Legitimate data promos are activated directly via *312# or MyMTN App.'],
        redFlagViolations: ['Scammers selling "unlimited cheat data" requiring transfer to personal OPay or Kuda accounts.'],
        authenticExamples: ['Official data bundle plans purchased securely inside MyMTN App.'],
      },
    },
  },
  {
    id: 'jumia',
    name: 'Jumia Nigeria',
    aliases: ['jumia', 'jumia nigeria', 'jumia pay'],
    category: 'E-commerce',
    description: 'Foremost pan-African e-commerce and logistics marketplace operating across Nigeria.',
    officialWebsite: 'https://www.jumia.com.ng',
    officialDomains: ['jumia.com.ng', 'jumia.com', 'pay.jumia.com.ng'],
    officialSenderIds: ['Jumia', 'JumiaPay'],
    officialEmails: ['service@jumia.com.ng', '@jumia.com.ng', '@jumia.com'],
    verifiedSocialHandles: ['@JumiaNigeria (X/Twitter)', '@jumianigeria (Instagram)', '@JumiaNigeria (Facebook)'],
    supportChannels: 'Official Help Center on jumia.com.ng, in-app order management, +234 1 888 1106.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'Order tracking and delivery OTPs sent with Sender ID "Jumia".',
          'Delivery agents call when in the customer’s area; payment on delivery (where selected) is made to verified channels.',
          'Jumia NEVER conducts "TikTok task / YouTube like" recruitment via WhatsApp.',
        ],
        redFlagViolations: [
          'WhatsApp message: "Hello, I am HR manager at Jumia. Earn ₦20,000 - ₦50,000 daily by liking products online. Contact our receptionist on Telegram."',
          'Delivery person demanding advance delivery fee before bringing the parcel to your house.',
        ],
        authenticExamples: ['"Your Jumia order #123456789 is out for delivery with agent Sunday (080...). Inspect before payment."'],
      },
      email: {
        legitimateBehavior: ['Official order confirmations and shipping receipts sent from "@jumia.com.ng".'],
        redFlagViolations: [
          'Fake invoice emails from free webmail asking you to click to dispute an unauthorized purchase.',
          'Emails asking for your credit card details or bank password to process a refund.',
        ],
        authenticExamples: ['Order status updates from "order-update@jumia.com.ng".'],
      },
      link: {
        legitimateBehavior: ['Shopping occurs strictly on "https://www.jumia.com.ng" and Jumia mobile app.'],
        redFlagViolations: [
          'Fake shopping sites like "jumia-flashsale.top", "jumia-clearance.cc", or "jumia-rewards.biz".',
          'Deals advertising brand new iPhone 15 Pro Max for ₦120,000 on a site copying Jumia logos.',
        ],
        authenticExamples: ['https://www.jumia.com.ng'],
      },
      social_media: {
        legitimateBehavior: ['Verified @JumiaNigeria on all social platforms. Contests are run on official verified channels.'],
        redFlagViolations: [
          'Fake Instagram pages selling "Jumia unclaimed abandoned packages" for ₦10,000 via WhatsApp direct transfer.',
          'Social media sellers claiming to be "Jumia warehouse clearance agents" requiring payment before dispatch.',
        ],
        authenticExamples: ['Official Black Friday and Brand Festival campaigns run on verified @JumiaNigeria.'],
      },
      offer: {
        legitimateBehavior: ['Authentic products purchased through the official app with escrow and dispute protection.'],
        redFlagViolations: ['Purchases negotiated outside the Jumia platform to avoid customer protection guarantees.'],
        authenticExamples: ['Purchases completed directly on the Jumia website or app.'],
      },
    },
  },
  {
    id: 'kuda',
    name: 'Kuda Bank (Kuda Microfinance Bank)',
    aliases: ['kuda', 'kuda bank', 'kuda mfb', 'the bank of the free'],
    category: 'FinTech',
    description: 'Digital-only licensed microfinance bank in Nigeria known as "The Bank of the Free".',
    officialWebsite: 'https://kuda.com',
    officialDomains: ['kuda.com', 'kudabank.com'],
    officialSenderIds: ['Kuda', 'KudaBank'],
    officialEmails: ['help@kuda.com', '@kuda.com'],
    verifiedSocialHandles: ['@kudabank (X/Twitter)', '@kudabank (Instagram)', '@kudabank (Facebook)'],
    supportChannels: 'Official in-app chat (24/7), help@kuda.com, 070002255832.',
    platformRules: {
      message: {
        legitimateBehavior: [
          'Sender ID "Kuda" sends in-app notifications and transactional OTPs.',
          'Never sends web links asking users to resolve an account restriction.',
        ],
        redFlagViolations: [
          'SMS claiming your Kuda account has been blocked due to BVN mismatch, linking to an external site.',
          'Personal WhatsApp messages claiming to be Kuda customer care offering fast loan disbursements.',
        ],
        authenticExamples: ['"Kuda: Your one-time login code is 552194. Never share this code with anyone, including Kuda staff."'],
      },
      email: {
        legitimateBehavior: ['Official emails originate strictly from "@kuda.com".'],
        redFlagViolations: ['Emails from "kudahelp@gmail.com" or "kudabank-support.net".'],
        authenticExamples: ['Transaction receipts and product newsletters sent from "help@kuda.com".'],
      },
      link: {
        legitimateBehavior: ['Official domain is strictly "https://kuda.com".'],
        redFlagViolations: ['Links like "kuda-upgrade.pages.dev", "kuda-bvn-portal.biz", or "kuda-free-cash.com".'],
        authenticExamples: ['https://kuda.com'],
      },
      social_media: {
        legitimateBehavior: ['Verified handle @kudabank. Customer support provided via verified accounts.'],
        redFlagViolations: [
          'Impersonation accounts targeting users who complain on X/Twitter and asking for phone numbers and login pins.',
        ],
        authenticExamples: ['Verified @kudabank sharing financial literacy and updates.'],
      },
      offer: {
        legitimateBehavior: ['Overdrafts and loans granted algorithmically based on account activity inside the app.'],
        redFlagViolations: ['Offers claiming someone can "activate ₦500,000 Kuda overdraft" for an upfront commission.'],
        authenticExamples: ['Overdraft accessed natively inside the Kuda app with zero external agent fees.'],
      },
    },
  },
  {
    id: 'access-bank',
    name: 'Access Bank Plc',
    aliases: ['access bank', 'access', 'accessbank', 'diamond bank'],
    category: 'Banking',
    description: 'Leading multinational commercial bank in Nigeria licensed by the Central Bank of Nigeria.',
    officialWebsite: 'https://www.accessbankplc.com',
    officialDomains: ['accessbankplc.com'],
    officialSenderIds: ['AccessBank', 'Access Bank'],
    officialEmails: ['contactcenter@accessbankplc.com', '@accessbankplc.com'],
    verifiedSocialHandles: ['@myaccessbank (X/Twitter)', '@myaccessbank (Instagram)', '@AccessBankPlc (Facebook)'],
    supportChannels: 'Access Contact Center: +234 1 271 2005-7, 0700 300 0000.',
    platformRules: {
      message: {
        legitimateBehavior: ['Sender ID "AccessBank". Alerts provide masked balance updates without asking for PIN.'],
        redFlagViolations: [
          'SMS from 11-digit mobile number threatening account suspension.',
          'Instructing user to reply with debit card details or OTP.',
        ],
        authenticExamples: ['"Access Alert: Acct 001***1234 credited with N20,000. Never reveal your PIN or OTP."'],
      },
      email: {
        legitimateBehavior: ['From "@accessbankplc.com". Includes anti-phishing customer identification.'],
        redFlagViolations: ['From free email addresses or external domain servers asking for credential re-validation.'],
        authenticExamples: ['Statements and notices from "contactcenter@accessbankplc.com".'],
      },
      link: {
        legitimateBehavior: ['Official domain is "https://www.accessbankplc.com".'],
        redFlagViolations: ['Domains like "access-bank-update.biz" or "accessbank.pages.dev".'],
        authenticExamples: ['https://www.accessbankplc.com'],
      },
      social_media: {
        legitimateBehavior: ['Verified @myaccessbank handles. Support through verified channels.'],
        redFlagViolations: ['Impersonation handles offering transfer recalls or account unfreezing on WhatsApp.'],
        authenticExamples: ['Official campaigns published on verified @myaccessbank.'],
      },
      offer: {
        legitimateBehavior: ['Careers via official portal. Free recruitment.'],
        redFlagViolations: ['Charging for screening or interview materials.'],
        authenticExamples: ['Graduate trainee posts on accessbankplc.com/careers.'],
      },
    },
  },
  {
    id: 'sec-nigeria',
    name: 'Securities and Exchange Commission (SEC Nigeria)',
    aliases: ['sec', 'sec nigeria', 'securities and exchange commission'],
    category: 'Government',
    description: 'Apex regulatory institution for the Nigerian capital market, investment schemes, and securities.',
    officialWebsite: 'https://sec.gov.ng',
    officialDomains: ['sec.gov.ng'],
    officialSenderIds: ['SEC Nigeria', 'SEC'],
    officialEmails: ['sec@sec.gov.ng', '@sec.gov.ng'],
    verifiedSocialHandles: ['@SECNigeria (X/Twitter)'],
    supportChannels: 'Official portal: sec.gov.ng. Public complaints: sec@sec.gov.ng.',
    platformRules: {
      message: {
        legitimateBehavior: ['SEC does not promote individual high-yield investment programs, daily ROI schemes, or crypto bots.'],
        redFlagViolations: [
          'Messages claiming an investment scheme is "Fully Approved and Licensed by SEC Nigeria" promising 100% returns in 24 hours.',
        ],
        authenticExamples: ['Public enforcement notices published on sec.gov.ng warning against illegal fund managers.'],
      },
      email: {
        legitimateBehavior: ['Emails from "@sec.gov.ng". Official regulatory notices.'],
        redFlagViolations: ['Emails from free email accounts claiming SEC is clearing your lottery or investment windfall.'],
        authenticExamples: ['Official capital market circulars sent from @sec.gov.ng.'],
      },
      link: {
        legitimateBehavior: ['Official website is strictly "https://sec.gov.ng". Check official list of capital market operators.'],
        redFlagViolations: ['Fake investment portals displaying forged SEC certificates to dupe investors.'],
        authenticExamples: ['https://sec.gov.ng'],
      },
      social_media: {
        legitimateBehavior: ['Verified @SECNigeria posting regulatory warnings and investor education.'],
        redFlagViolations: ['Sponsored social media ads using SEC logos to endorse binary trading or crypto doubling.'],
        authenticExamples: ['Verified @SECNigeria publishing public advisories on Ponzi schemes.'],
      },
      offer: {
        legitimateBehavior: ['Legitimate investment platforms must be licensed by SEC and cannot guarantee astronomical fixed returns.'],
        redFlagViolations: ['Guaranteed 50% - 200% returns in 24 to 48 hours.'],
        authenticExamples: ['List of registered digital sub-brokers and fund managers on sec.gov.ng.'],
      },
    },
  },
];

// Helper to detect if an organization is mentioned in content or source details
export function detectOrganization(content: string, sourceDetails?: string): LegitimateOrganization | null {
  const combined = `${content} ${sourceDetails || ''}`.toLowerCase();

  for (const org of LEGITIMATE_ORGANIZATIONS) {
    if (combined.includes(org.name.toLowerCase())) {
      return org;
    }
    for (const alias of org.aliases) {
      // Use boundary-safe search
      const regex = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(combined)) {
        return org;
      }
    }
    for (const domain of org.officialDomains) {
      if (combined.includes(domain.toLowerCase())) {
        return org;
      }
    }
  }

  return null;
}

// Evaluate compliance of a submission against how the organization legitimately operates on that platform
export function evaluatePlatformCompliance(
  org: LegitimateOrganization | null,
  platform: InputType,
  content: string,
  sourceDetails?: string
): OrganizationCheck {
  const normalizedPlatform: InputType = platform || 'message';

  if (!org) {
    return {
      detectedOrgName: undefined,
      category: undefined,
      platform: normalizedPlatform,
      isRecognizedOrg: false,
      platformSummary: `General evaluation: Standard digital verification protocols for ${normalizedPlatform} communication in Nigeria.`,
      legitimateRules: [
        'Legitimate Nigerian organizations never ask for 4-digit card PINs, passwords, or transactional OTPs over messages, emails, or links.',
        'Official emails come strictly from authenticated corporate domains, never free webmail like Gmail or Yahoo.',
        'Federal government agencies in Nigeria exclusively use verified ".gov.ng" web domains.',
        'Legitimate employers never demand advance fees for uniforms, medical kits, screening, or interview passes.',
      ],
      violations: [],
      officialChannels: undefined,
    };
  }

  const rules = org.platformRules[normalizedPlatform] || org.platformRules.message;
  const contentLower = content.toLowerCase();
  const sourceLower = (sourceDetails || '').toLowerCase();
  const violations: string[] = [];

  // Check specific platform violations
  if (normalizedPlatform === 'message') {
    // Check sender ID
    const hasPersonalNumber = /(^|\s)(080|081|090|091|070|\+234)\d{7,8}\b/.test(sourceDetails || content);
    if (hasPersonalNumber) {
      violations.push(`Sender identity cannot be independently verified. Sent from an 11-digit mobile phone number instead of official verified channels.`);
    }

    // Check PIN/credential demand
    if (contentLower.includes('pin') || contentLower.includes('otp') || contentLower.includes('password') || contentLower.includes('bvn')) {
      const isProtective = contentLower.includes('never disclose') || contentLower.includes('do not share') || contentLower.includes('never share');
      if (!isProtective) {
        violations.push(`Requests confidential credentials (PIN/OTP/password), which legitimate bank and company systems never request via message.`);
      }
    }

    // Check artificial urgency/threat
    if (contentLower.includes('freeze') || contentLower.includes('blocked') || contentLower.includes('within 2 hours') || contentLower.includes('temporary debit freeze')) {
      violations.push(`Imposes artificial urgency and threat of account freeze or penalty, a tactic common in credential-harvesting messages.`);
    }
  } else if (normalizedPlatform === 'email') {
    // Check email domain
    const hasFreeEmail = sourceLower.includes('@gmail.com') || sourceLower.includes('@yahoo.com') || sourceLower.includes('@outlook.com') || contentLower.includes('@gmail.com');
    if (hasFreeEmail) {
      violations.push(`Sent from a free public email address instead of official corporate domain "${org.officialDomains.join('" or "')}".`);
    }

    // Check credential harvesting or urgency
    if (contentLower.includes('click here') || contentLower.includes('re-validate') || contentLower.includes('verify your account')) {
      violations.push(`Contains generic call-to-action button or link prompting account re-validation, which ${org.name} does not send in standard notices.`);
    }
  } else if (normalizedPlatform === 'link') {
    // Check domain legitimacy
    const hasOfficialDomain = org.officialDomains.some((d) => contentLower.includes(d.toLowerCase()));
    if (!hasOfficialDomain) {
      violations.push(`Does not point to ${org.name}'s official domains (${org.officialDomains.join(', ')}). Appears to be an unauthorized third-party or spoofed link.`);
    }
  } else if (normalizedPlatform === 'social_media') {
    // Check social media protocols
    if (contentLower.includes('dm your pin') || contentLower.includes('send account number in dm') || contentLower.includes('whatsapp') || sourceLower.includes('whatsapp')) {
      violations.push(`Violates social media support rules: Directs customer to personal WhatsApp or requests sensitive credentials in DMs, which ${org.name} strictly prohibits.`);
    }
  } else if (normalizedPlatform === 'offer') {
    if (contentLower.includes('fee') || contentLower.includes('accreditation') || contentLower.includes('uniform') || contentLower.includes('payment before')) {
      violations.push(`Demands upfront payment or fees for employment/offers, which violates ${org.name}'s zero-tolerance policy on advance fees.`);
    }
  }

  return {
    detectedOrgName: org.name,
    category: org.category,
    platform: normalizedPlatform,
    isRecognizedOrg: true,
    platformSummary: `Official Standard Operating Procedures for ${org.name} on ${normalizedPlatform.toUpperCase()}:`,
    legitimateRules: rules.legitimateBehavior,
    violations,
    officialChannels: {
      website: org.officialWebsite,
      domains: org.officialDomains,
      senderIds: org.officialSenderIds,
      emails: org.officialEmails,
      socialHandles: org.verifiedSocialHandles,
      supportNotes: org.supportChannels,
    },
  };
}

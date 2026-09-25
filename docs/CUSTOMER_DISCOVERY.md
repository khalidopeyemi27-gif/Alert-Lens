# Customer Discovery & User Research Report: Alert Lens NG

> **Research Period**: August 16–26, 2026  
> **Methodology**: Semi-structured qualitative interviews  
> **Sample Size**: 16 interviewees  
> **Target Demographic**: Nigerian students, young professionals, small business owners, and everyday digital consumers across messaging channels.

---

## 📋 Research Objectives

The goal of this customer discovery study was to understand:
1. How digital consumers encounter and evaluate suspicious messages, links, and online offers in their daily lives.
2. What specific obstacles prevent users from identifying scams before financial or data loss occurs.
3. How users currently attempt to verify claims made in unsolicited communications.
4. How a digital safety solution can best support user decision-making without adding unnecessary friction.

---

## 💡 Key Findings & Reported Encounters

All 16 interviewees reported encountering digital fraud or suspicious online offers across one or more digital communication channels:

### Common Threat Scenarios Encountered
* **Phishing & Suspicious Web Links**: Unsolicited shortened URLs distributed via SMS or WhatsApp promising rewards, airtime, or account updates.
* **Fake Student Bursaries & Scholarships**: Messages targeting university students with claims of government or corporate bursaries requiring student portal logins, BVN, or OTPs.
* **Fake Job & Employment Offers**: Messages advertising remote or high-paying entry-level roles that subsequently demand upfront registration, documentation, or processing fees.
* **Fake Investment & High-Yield Schemes**: "Double your money" platforms promising rapid returns upon initial deposit.
* **Fake Online Sellers & E-Commerce Fraud**: Instagram or WhatsApp vendors demanding full upfront payment before disappearing or sending counterfeit goods.
* **Financial & Bank Impersonation**: SMS or Email messages claiming an account has been locked or flagged for BVN re-validation.
* **Fraudulent Loan Apps**: Unsolicited SMS offers for instant collateral-free loans requiring personal data harvesting.
* **Social Media & WhatsApp Account Takeover**: Messages from compromised accounts of friends or family asking for urgent money transfers or OTP codes.

---

## ⚠️ Repeated User Difficulties & Mental Model Gaps

Through cross-interview synthesis, seven recurring friction points were identified:

1. **Scams Look Convincing**: High-fidelity logos, formal tone, official-sounding names, and spoofed sender IDs make fraudulent messages nearly indistinguishable from legitimate communications.
2. **Lack of Warning-Sign Recognition**: Users frequently do not know which specific indicators signal risk (e.g., mismatched TLDs, requests for OTPs/BVN, or pressure tactics).
3. **Verification Blindness**: Users do not know where or how to independently verify whether a company, offer, or portal is genuine.
4. **The "Inside-the-Message" Verification Trap**: When in doubt, interviewees reported relying on links, email addresses, or phone numbers provided *inside* the suspicious message itself to ask if it was real.
5. **Limited Technical Knowledge**: Technical concepts like domain WHOIS, SSL certificates, or TLD analysis are unknown or inaccessible to most everyday users.
6. **Technical Jargon Confusion**: Existing cybersecurity advisories or antivirus warnings use terms like "Phishing Heuristic" or "Spoofed MX Record", which users find confusing or unhelpful.
7. **Uncertainty & Embarrassment**: Users expressed hesitation about asking friends or authorities for help when they received unexpected money offers, fearing judgment or missing out on a opportunity.

---

## 📖 Deep-Dive Case Study: Reported Experience

> **IMPORTANT DISCLAIMER**: The case study below represents **ONE INTERVIEWEE'S REPORTED EXPERIENCE** collected during qualitative research. It is presented as qualitative evidence of user decision-making under deception and must not be interpreted as population statistics.

### The "Make More Money" Investment Trap
During an in-depth interview, one participant shared their experience responding to an investment opportunity:

* **Initial Contact**: The interviewee received a link sent directly from a trusted friend's social media account (unbeknownst to them, the friend's account had been compromised).
* **The Offer**: The link led to a platform promising "guaranteed returns" on small deposits within 24 hours.
* **First Action**: Encouraged by the recommendation, the interviewee registered and deposited **₦5,000**.
* **The Interruption/Escalation**: Upon attempting to withdraw the promised returns the following day, the platform displayed an error stating that an additional **₦2,000 "processing fee"** was required before funds could be released.
* **Outcome**: The interviewee recognized the second request as suspicious, refused the second payment, and lost the initial ₦5,000.

### Analysis of the Interruption
This case study highlighted a critical product requirement for Alert Lens:
> Scammers rely on multi-step procedures (Deposit → Escalated Fee → Account Lock). **Alert Lens must explicitly break down the requested procedure** (`ScamProcedureCard`) so users see all requested steps *before* taking the first step.

---

## 🎯 How Research Findings Shaped Alert Lens NG

| Customer Discovery Finding | Product Feature Implemented in Alert Lens |
| :--- | :--- |
| Users fall into the "Inside-the-Message" verification trap | **Independent Verification Guidance** explicitly instructs users to verify through official, outside channels. |
| Users don't know what warning signs to look for | **Warning Sign Detection** highlights exact evidence snippets in plain language. |
| Scammers request multi-step actions (OTPs, fees, logins) | **Scam Procedure Detection** lists every requested sensitive action upfront. |
| Users open links impulsively when excited or rushed | **ProtectedLink & Interstitial Modal** force a safe pause before visiting unknown external links. |
| Users lack cybersecurity knowledge | **Interactive Safety Tutorials** teach proactive scam recognition through 8 real-world scenarios. |

---

## 📌 Methodological & Reporting Disclaimers

* Findings documented in this report reflect qualitative user evidence gathered during 16 semi-structured interviews in August 2026.
* Data presented describes user behaviors, mental models, and reported experiences; it does not constitute general statistical prevalence across the entire population.

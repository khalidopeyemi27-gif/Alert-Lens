# Product Specification & Architecture: Alert Lens NG

> **Product Positioning**: Alert Lens NG is a digital safety and decision-support layer for suspicious messages, links, and online offers. It is designed to intervene at the point of action, moving users beyond passive risk scoring toward active protection and independent verification.

---

## 1. Product Philosophy & Core Framework

Digital fraud tools traditionally fail users in one of two ways:
1. **Passive Classification**: Giving a numerical risk score (e.g. "82% Risk") without explaining what the message is asking the user to do or how to stay safe.
2. **Conversational Generic Chatbots**: Requiring users to prompt an AI repeatedly to understand whether a message is safe, introducing friction and non-deterministic advice.

Alert Lens bridges this gap through a structured, 5-pillar safety framework:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   DETECT    │ ──► │   EXPLAIN   │ ──► │   PROTECT   │ ──► │   VERIFY    │ ──► │    LEARN    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
  Identify          Break down          Enforce ALLOW /     Guide safe          Interactive
  scam              requested           WARN / BLOCK        independent         Safety
  procedures        actions &           bounds on           verification        Tutorials
  & TLD risks       evidence            navigation          outside message     & Scenarios
```

---

## 2. Target Audience & Problem Statement

### Primary Users
* **Everyday Smartphone & Web Users**: Individuals receiving unsolicited messages across WhatsApp, SMS, Email, and Social Media containing links, job opportunities, bursaries, or financial offers.
* **Students & Job Seekers**: High-vulnerability demographics routinely targeted with fake scholarship portals, registration fee demands, or employment impersonation.
* **Non-Technical & Older Adults**: Users who find technical cybersecurity language confusing and require plain-language explanation and guided steps.

### User Pain Points Addressed
* **High-Fidelity Impersonation**: Scammers create legitimate-looking sender names, university logos, and realistic banking language.
* **The "Inside the Message" Trap**: When uncertain, users often reply to the suspicious email, call the phone number in the SMS, or click the support link in the message—falling directly into the attacker's trap.
* **Action Urgency**: Scammers induce panic or excitement ("Account will be suspended in 2 hours", "Selected for ₦150,000 bursary"), causing users to bypass critical judgment.

---

## 3. Core Application Structure & Pages

Alert Lens is organized into 5 focused pages to ensure rapid navigation and zero cognitive overhead:

### 1. 🏠 Home Page
* **Hero Section**: Clear value proposition: *"A digital safety layer for suspicious messages, links, and online offers."*
* **Primary Call to Action**: Direct access to `🔎 Check a Message`.
* **Recent Check Preview**: Instant scannability of recent analyses if history exists.
* **Minimalist Design**: Avoids cluttered dashboards or technical charts, answering immediately: *"What does this app do?"* and *"How do I use it?"*

### 2. 🔎 Check Page
* **Input Interface**: Allows pasting messages, web URLs, email text, job listings, or social media offers.
* **Input Type Selector**: Toggle between Message, Link, Offer, Email, or Social Media.
* **Single Click Analysis**: Instant processing via server-side AI or deterministic rule fallbacks.

### 3. 📊 Analysis Result View (Coherent Investigation)
Presents a unified 5-step safety report:
1. **What did we find?**: Risk indicator (🟢 No major warning signs, 🟡 Be careful, 🔴 High risk).
2. **Why does it matter?**: Specific red flags supported by verbatim evidence snippets quoted directly from the input.
3. **What is this message asking me to do?**: `ScamProcedureCard` mapping requested actions (e.g., Open a link, Log into an account, Provide BVN, Enter OTP, Pay upfront fee).
4. **What should I do?**: Concrete protection recommendation (STOP, PROTECT, VERIFY, REPORT).
5. **Verify Before You Continue**: Context-aware `Independent Verification Guidance` enforcing the Golden Safety Rule.

### 4. 📚 Safety Center & Safety Tutorials
* **Interactive Tutorials**: 8 short, scenario-based learning modules covering top digital scam vectors (Fake Bursary, Fake Job, Bank Impersonation, Fake Investment, Fake Seller, Urgent Payment Request, Suspicious Link, Account Verification).
* **Tutorial Structure**: 5 guided steps per scenario (The Example Message → Requested Actions → Warning Signs → Safe Verification → Safe Action).

### 5. 📜 History & Mobile Quick View
* **Scannable History**: Grouped by communication channel (SMS, WhatsApp, Email, Web Link, Social Media).
* **Risk Filters**: Filter previous checks by All, High Risk, Caution, or Low Risk.
* **Mobile Quick View Modal**: Lightweight overlay for reviewing previous checks without full page switches.

---

## 4. Key Components Matrix

| Component Name | File Path | Core Function |
| :--- | :--- | :--- |
| `ScamProcedureCard` | `src/components/ScamProcedureCard.tsx` | Visual breakdown of requested sensitive actions and risk ratings |
| `ProtectedLink` | `src/components/ProtectedLink.tsx` | Safe anchor wrapper that intercepts navigation based on risk score |
| `ProtectionInterstitialModal` | `src/components/ProtectionInterstitialModal.tsx` | Interstitial dialog warning users before opening external URLs |
| `UrlIntelligenceCard` | `src/components/UrlIntelligenceCard.tsx` | Domain breakdown, TLD safety, and homograph detection display |
| `SafetyTutorials` | `src/components/SafetyTutorials.tsx` | Interactive 8-scenario tutorial hub inside Safety Center |
| `HistoryQuickViewModal` | `src/components/HistoryQuickViewModal.tsx` | Mobile-optimized quick review overlay for history items |
| `AlertAi` | `src/components/AlertAi.tsx` | Contextual conversational Q&A assistant grounded in analysis results |

---

## 5. Design Principles & UX Discipline

1. **Zero-Pill Discipline & Visual Hierarchy**: High-contrast, clean UI using Tailwind CSS v4 without unnecessary status indicators or noisy badges.
2. **Plain Language Explanation**: Avoids terms like "Entropy", "Heuristic Weight", or "Regex Pattern Match" in user-facing copy.
3. **Frictionless Accessibility**: No login required. All checks are stored locally in the user's browser via `localStorage`, ensuring complete privacy and instant utility.

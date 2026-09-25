# Product Specification & Architecture: Alert Lens NG

> **Product Positioning**: Alert Lens NG is a digital safety and decision-support layer for suspicious messages, links, and online offers. It is designed to intervene at the point of action, moving users beyond passive risk scoring toward active protection and independent verification.

---

## 1. Product Philosophy & Core Framework

Digital fraud tools traditionally fail users in one of two ways:
1. **Passive Classification**: Giving a numerical risk score (e.g., "82% Risk") without explaining what the message is asking the user to do or how to stay safe.
2. **Conversational Generic Chatbots**: Requiring users to prompt an AI repeatedly to understand whether a message is safe, introducing friction and non-deterministic advice.

Alert Lens bridges this gap through a structured, 5-pillar safety framework:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   DETECT    │ ──► │   EXPLAIN   │ ──► │   PROTECT   │ ──► │   VERIFY    │ ──► │    LEARN    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
  Identify          Break down          Enforce ALLOW /     Guide safe          Interactive
  requested         requested           WARN / BLOCK        independent         Safety
  actions &         actions &           bounds on           verification        Tutorials
  URL signals       evidence            navigation          outside message     & Scenarios
```

* **DETECT**: Identify observable warning signs, suspicious requested actions, and relevant URL characteristics within user-submitted content.
* **EXPLAIN**: Explain observed warning signs and requested actions in plain language using verbatim evidence snippets from the submitted content.
* **PROTECT**: Apply ALLOW / WARN / BLOCK protection decisions within the Alert Lens application to prevent impulsive navigation.
* **VERIFY**: Guide users toward independent verification through official channels outside the suspicious message.
* **LEARN**: Provide safety tutorials and local history features that help users recognize recurring patterns.

---

## 2. Target Audience & Problem Statement

### Primary Intended Users
* **Everyday Smartphone & Web Users**: Intended users include individuals who receive unsolicited communications across messaging platforms containing links, job opportunities, bursary claims, or financial offers.
* **Students & Job Seekers**: High-vulnerability demographics routinely targeted with fake scholarship portals, registration fee demands, or employment impersonation.
* **Non-Technical & Older Adults**: Users who find technical cybersecurity terminology confusing and benefit from plain-language explanations and guided verification steps.

### User Pain Points Addressed
* **High-Fidelity Impersonation**: Scammers create legitimate-looking sender names, university logos, and formal banking language.
* **The "Inside-the-Message" Trap**: Customer interviews highlighted that when experiencing uncertainty, interviewees frequently attempted to verify a message using contact details or links provided *inside* the message itself.
* **Action Urgency**: Scammers induce urgency or excitement ("Account will be suspended in 2 hours", "Selected for ₦150,000 bursary"), leading users to take rapid action before reflective verification.

---

## 3. Core Application Structure & Pages

Alert Lens is organized into 5 focused pages designed to reduce unnecessary cognitive load:

### 1. 🏠 Home Page
* **Hero Section**: Clear value proposition: *"A digital safety layer for suspicious messages, links, and online offers."*
* **Primary Call to Action**: Direct access to `🔎 Check a Message`.
* **Recent Check Preview**: Instant scannability of recent analyses if local history exists.
* **Minimalist Design**: Avoids cluttered dashboards or technical charts, answering immediately: *"What does this app do?"* and *"How do I use it?"*

### 2. 🔎 Check Page
* **Input Interface**: Allows users to paste user-submitted messages, web URLs, email text, job listings, or social media offers.
* **Input Type Selector**: Toggle between Message, Link, Offer, Email, or Social Media content types.
* **Single Click Analysis**: Instant processing via server-side AI or deterministic rule fallbacks.

### 3. 📊 Analysis Result View (Coherent Investigation)
Presents a unified 5-step safety report:
1. **What did we find?**: Protection decision indicator:
   * 🟢 **ALLOW**: No major warning signs requiring intervention were identified by the prototype's current analysis.
   * 🟡 **WARN**: Suspicious or unusual indicators were identified; caution is required.
   * 🔴 **BLOCK**: High-risk interaction restricted within the application.
2. **Why does it matter?**: Specific red flags supported by verbatim evidence snippets quoted directly from the input.
3. **What is this message asking me to do?**: `ScamProcedureCard` displaying requested sensitive actions (e.g., Open a link, Log into an account, Provide BVN, Enter OTP, Pay upfront fee) and evaluating contextual risk.
4. **What should I do?**: Concrete protection recommendation (STOP, PROTECT, VERIFY, REPORT).
5. **Verify Before You Continue**: Context-aware `Independent Verification Guidance` enforcing the Golden Safety Rule (*Never verify a suspicious message using links, phone numbers, or contact details provided inside the message itself*).

### 4. 📚 Safety Center & Safety Tutorials
* **Interactive Tutorials**: 8 short, scenario-based educational modules covering common digital scam scenarios (Fake Student Bursary, Fake Job Offer, Bank Impersonation, Fake Investment, Fake Online Seller, Urgent Payment Request, Suspicious Link, Account Verification Scam).
* **Tutorial Structure**: 5 guided steps per scenario (The Example Message → Requested Actions → Warning Signs → Safe Verification → Safe Action).

### 5. 📜 History & Mobile Quick View
* **Scannable Local History**: Grouped by content channel (SMS, WhatsApp, Email, Web Link, Social Media) stored locally in the user's browser via `localStorage`.
* **Risk Filters**: Filter previous checks by All, High Risk, Caution, or Low Risk.
* **Mobile Quick View Modal**: Lightweight overlay for reviewing previous checks without full page switches.

---

## 4. Key Components Matrix

| Component Name | File Path | Core Function |
| :--- | :--- | :--- |
| `ScamProcedureCard` | `src/components/ScamProcedureCard.tsx` | Visual breakdown of requested sensitive actions and contextual risk levels. |
| `ProtectedLink` | `src/components/ProtectedLink.tsx` | Controlled navigation component that applies the application's ALLOW / WARN / BLOCK protection decision. |
| `ProtectionInterstitialModal` | `src/components/ProtectionInterstitialModal.tsx` | Warning and confirmation interface shown before navigation when protection rules require intervention. |
| `UrlIntelligenceCard` | `src/components/UrlIntelligenceCard.tsx` | Displays observable URL characteristics and contextual structural signals. |
| `SafetyTutorials` | `src/components/SafetyTutorials.tsx` | Interactive 8-scenario tutorial hub inside Safety Center. |
| `HistoryQuickViewModal` | `src/components/HistoryQuickViewModal.tsx` | Mobile-optimized quick review overlay for history items. |
| `AlertAi` | `src/components/AlertAi.tsx` | Contextual conversational assistant grounded in the analysis result. |

---

## 5. Design Principles & UX Discipline

1. **Zero-Pill Discipline & Visual Hierarchy**: High-contrast, clean UI using Tailwind CSS v4 without unnecessary status indicators or noisy badges.
2. **Plain Language Explanation**: Avoids technical terms like "Entropy", "Heuristic Weight", or "Regex Pattern Match" in user-facing copy.
3. **No Mandatory Account Creation**: No login required. Analysis history is stored locally in the user's browser via `localStorage` for privacy and rapid access, without requiring centralized user account registration.

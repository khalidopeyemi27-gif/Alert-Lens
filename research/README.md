# Qualitative User Research & Discovery Summary: Alert Lens NG

> **Research Period**: August 16–26, 2026  
> **Methodology**: 16 semi-structured qualitative interviews  
> **Scope**: User mental models, fraud encounters, verification behaviors, and digital safety pain points.

---

## 🎯 Research Focus & Methodology

The qualitative research phase evaluated how users interact with unsolicited digital communications across messaging channels (SMS, WhatsApp, Email, Social Media).

### Interviewee Profile Overview
* **Sample Size**: 16 participants.
* **Demographics**: Students, university applicants, entry-level job seekers, self-employed traders, and young professionals.
* **Primary Digital Channels**: WhatsApp, SMS, Gmail, Instagram Direct, Facebook Messenger.

---

## 🧠 Core Synthesis: User Mental Models & Deception Vulnerability

### 1. The Urgency & Emotional Trigger Effect
Scammers manipulate cognitive bias by introducing tight time constraints ("Offer expires in 1 hour") or financial excitement ("Bursary awarded"). Under elevated emotion, users bypass reflective analysis and move directly to requested actions.

### 2. The Credibility Illusion
Users heavily rely on surface-level visual cues (logos, formal tone, "official" headers) rather than technical indicators (domain names, TLDs, SSL origins). If a message *looks* like a bank message, users treat it as a bank message.

### 3. The "Inside-the-Message" Trap
When users feel slight hesitation, their default verification attempt is to:
* Click the link inside the message to read more.
* Call the phone number listed inside the SMS.
* Reply directly to the sender.
This keeps the user within the attacker's controlled environment.

### 4. Fear of Technical Jargon
Security warnings containing terms like "Heuristic Anomaly" or "Certificate Mismatch" induce anxiety or indifference. Users ignore warnings they do not understand.

---

## 🔄 Translating Research Insights into Alert Lens NG

```
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│ Qualitative Research Insight             │ Alert Lens Feature Implementation        │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Scams demand immediate action            │ ScamProcedureCard extracts all requested │
│ (login, OTP, BVN, fee)                   │ sensitive actions upfront                │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Users verify using details inside message │ Independent Verification Guidance       │
│                                          │ enforces outside verification channels   │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Impulse clicking on risky links          │ ProtectedLink & ProtectionInterstitial   │
│                                          │ force a safe pause before visiting URLs  │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Technical warnings cause confusion       │ Plain-language warning explanations with │
│                                          │ verbatim evidence quotes                 │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Lack of warning-sign knowledge           │ 8 Interactive Safety Tutorials teaching  │
│                                          │ scenario-based scam recognition          │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 📜 Full Documentation
For the complete customer discovery report and detailed case study analysis, refer to [`docs/CUSTOMER_DISCOVERY.md`](../docs/CUSTOMER_DISCOVERY.md).

# Qualitative User Research & Discovery Summary: Alert Lens NG

> **Research Period**: August 16–26, 2026  
> **Methodology**: 16 semi-structured qualitative interviews  
> **Scope**: User mental models, fraud encounters, verification behaviors, and digital safety pain points.

---

## 🎯 Research Focus & Methodology

The qualitative research phase evaluated how users interact with unsolicited digital communications across messaging channels (SMS, WhatsApp, Email, Social Media).

### Interviewee Profile Overview
* **Sample Size**: 16 participants.
* **Demographics**: Nigerian students, university applicants, entry-level job seekers, self-employed traders, and young professionals.
* **Primary Digital Channels**: WhatsApp, SMS, Gmail, Instagram Direct, Facebook Messenger.

---

## 🧠 Core Synthesis: User Mental Models & Deception Vulnerability

### 1. Emotional and Time Pressure
Interviewees described responding hastily when messages combined urgency ("Offer expires in 1 hour") or financial incentives ("Bursary awarded"), leading to rapid action before reflective verification.

### 2. The Credibility Illusion
Participants reported relying heavily on surface-level visual cues (logos, formal tone, official headers) rather than technical indicators (domain names, domain extensions). When a message closely mimicked official corporate branding, interviewees reported initially treating it as genuine.

### 3. The "Inside-the-Message" Trap
When experiencing hesitation, interviewees described attempting to verify messages by clicking internal links, calling numbers listed within the text, or replying directly to the sender—keeping them within the sender's communication loop.

### 4. Technical Jargon Barrier
Participants reported that technical security terms (e.g., "Heuristic Anomaly") caused confusion or detachment, leading them to ignore warnings they did not understand.

---

## 🔄 Translating Research Insights into Alert Lens NG Feature Design

```
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│ Qualitative Research Finding             │ Alert Lens Feature Design Response       │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Interviewees described multi-step        │ ScamProcedureCard extracts all requested │
│ sensitive requests (login, OTP, BVN, fee)│ sensitive actions upfront                │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Participants reported verifying using    │ Independent Verification Guidance        │
│ details inside the message               │ enforces outside verification channels   │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Impulse clicking on risky links          │ ProtectedLink & ProtectionInterstitial   │
│                                          │ force a safe pause before visiting URLs  │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Technical warnings cause confusion       │ Plain-language warning explanations with │
│                                          │ verbatim evidence quotes                 │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Difficulty recognizing warning signs     │ 8 Interactive Safety Tutorials teaching  │
│                                          │ scenario-based scam recognition          │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 📌 Methodological Disclaimers

* Findings documented in this summary reflect qualitative user evidence gathered during 16 semi-structured interviews in August 2026.
* Data presented describes user behaviors, mental models, and reported experiences from qualitative customer discovery; it does not constitute general statistical prevalence across the entire population.

---

## 📜 Full Documentation
For the complete customer discovery report and detailed case study analysis, refer to [`docs/CUSTOMER_DISCOVERY.md`](../docs/CUSTOMER_DISCOVERY.md).

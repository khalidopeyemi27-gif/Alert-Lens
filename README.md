# Alert Lens NG

> **"People don't go looking for scams. Scams come looking for them."**

A digital safety and decision-support layer for suspicious messages, links, and online offers.

---

## 📌 Executive Overview

**Alert Lens NG** is a digital safety layer designed to protect users from digital fraud, phishing, impersonation, and online scams. Rather than acting as a passive classification tool or a generic AI chatbot, Alert Lens intervenes at the critical moment of user decision-making. 

It analyzes messages, links, and online offers submitted by the user, detects what the message is asking the user to do (Scam Procedure Detection), calculates safety bounds (ALLOW / WARN / BLOCK), intercepts risky link navigation through controlled interstitials, guides users through independent verification outside the message, and educates users through interactive safety tutorials.

### Core Product Positioning
Alert Lens is built on a 5-stage digital protection framework:
**DETECT → EXPLAIN → PROTECT → VERIFY → LEARN**

---

## 🎯 The Problem

Digital fraud in Nigeria and globally has evolved rapidly. Scammers deploy highly realistic messages across SMS, WhatsApp, Email, and Social Media:
* **Fake Student Bursaries & Scholarships**: Asking students to log in and provide BVN or OTPs to receive funds.
* **Fake Job & Employment Offers**: Demanding upfront application, registration, or equipment fees.
* **Bank & Financial Impersonation**: Urging urgent account updates or password resets via fake portals.
* **Fake Investment & Ponzi Schemes**: Promising guaranteed high returns upon initial deposits.
* **E-Commerce & Online Seller Fraud**: Demanding payment prior to inspection or delivery.

### Key Pain Points
* **Convincing Tactics**: Modern scams mimic official branding, sender IDs, and formal language.
* **Unclear Warning Signs**: Everyday users lack cybersecurity training and do not know what specific indicators to look for.
* **Inside-the-Message Trap**: Users often try to verify a message using the links, phone numbers, or email addresses supplied *inside* the suspicious message itself.
* **Jargon Overload**: Standard security tools provide technical risk scores or cryptographic terms that mean little to non-technical users.

---

## 🔍 Customer Discovery

During user research conducted from **August 16–26, 2026** involving **16 interviewees**, key patterns emerged:

### Qualitative Research Findings
* **Customer Discovery Pattern**: 14 of 16 interviewees reported encountering suspicious online activity.
* **Most Frequent Scam Types**: Phishing links, fake employment offers, investment scams, bank impersonation, and fraudulent online sellers.
* **Verification Confusion**: Most users reported uncertainty about how or where to verify whether a sender or website was genuine.
* **Hesitancy to Ask**: Users reported feeling embarrassed or unsure of who to consult when receiving unexpected financial offers.

> **One Interviewee's Reported Experience:**
> An interviewee described receiving a referral link from a friend for a "make more money" website. They deposited ₦5,000 into the platform, after which the platform requested an additional ₦2,000 fee before allowing any funds to be withdrawn.

*(Note: Qualitative interview findings represent individual reported experiences from customer discovery and are documented as customer evidence, not general population prevalence statistics.)*

---

## 💡 Product Insight & Philosophy

Alert Lens was created based on three fundamental insights:
1. **Safety at the Point of Action**: Telling users a message is "suspicious" is insufficient. Safety tools must intercept the exact action requested (e.g., clicking a link, sharing an OTP, paying a fee).
2. **The Golden Safety Rule**: *Never verify a suspicious message using contact details, links, or phone numbers provided inside that message.* Verification must always occur through independently sourced official channels.
3. **No mandatory account creation**: Users can analyze content without signing up or logging in.

---

## 🔄 How Alert Lens Works

Alert Lens processes suspicious content through a multi-layered safety architecture:

```
[ Input Message / Link / Offer ]
│
▼
[ Message Analysis ]
│
▼
[ Warning Sign Detection ]
│
▼
[ Scam Procedure Detection ]
│
▼
[ URL Intelligence ]
│
▼
[ Protection Decision ]
ALLOW / WARN / BLOCK
│
┌──────┴──────┐
▼             ▼
[ ProtectedLink ] [ Independent Verification ]
│             │
└──────┬──────┘
▼
[ Interactive Tutorials ]
```

---

## ✨ Key Features

### 1. 🔎 Multi-Channel Input Check
Analyze messages, links, email text, job postings, or social media offers pasted from WhatsApp, SMS, Email, Web, or Social Media.

### 2. 🚨 Scam Procedure & Warning Sign Detection
Identifies exactly what the sender is asking you to do (e.g., "Open a link", "Log into account", "Provide BVN", "Enter OTP", "Pay upfront fee") and highlights verbatim evidence snippets supporting each warning sign.

### 3. 🌐 URL Intelligence System
Extracts URLs embedded in messages, provides contextual information about less familiar domain extensions alongside other URL signals such as IP hosts, HTTP, Punycode, and domain structure, evaluating domain structure, less familiar domain extensions, IP hosts, HTTP URLs, Punycode/unusual character formatting, tracking parameters, and conservative brand-mismatch signals.

### 4. 🛡️ Protection Decision & Interstitial Intercept
Assigns a clear decision (**ALLOW / WARN / BLOCK**). All links rendered in analysis results use `ProtectedLink` and `ProtectionInterstitialModal` to prevent accidental clicks on dangerous URLs.

### 5. 🏛️ Independent Verification Guidance
Provides tailored, organization-specific verification steps (Banking, Universities, Employers, Online Sellers, Government) enforcing the Golden Safety Rule.

### 6. 🎓 Safety Tutorials (Safety Center)
8 scenario-driven learning modules teaching users how to spot scams across real-world situations (Fake Bursary, Fake Job, Bank Impersonation, Fake Investment, Fake Seller, Urgent Request, Suspicious Link, Account Verification).

### 7. 📱 Scannable History & Mobile Quick View
Full history of previous checks grouped by channel with instant risk filters and a lightweight Mobile Quick View modal for rapid reviewing on phone screens.

### 8. 💬 Alert AI Conversational Layer
An interactive safety assistant that answers follow-up questions specifically grounded in the context of the analyzed message.

---

## ⚡ Current Prototype Capabilities vs. Future Vision

| Dimension | Current Prototype Capabilities (Existing) | Future Vision (Planned) |
| :--- | :--- | :--- |
| **Execution** | Fully functional React SPA + Express Server Proxy | Browser Extensions & Native Mobile Apps |
| **AI Layer** | Server-side Gemini API (`@google/genai`) with offline heuristic rules | On-device lightweight AI models |
| **Authentication** | No mandatory account creation (uses browser localStorage) | Optional cloud backup & sync across devices |
| **Protection** | In-app `ProtectedLink` and `ProtectionInterstitialModal` | System-wide web request interception |
| **Verification** | Contextual step-by-step guidance & official domain directory | Direct API integration with bank/teleco verification feeds |

---

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion
* **Backend**: Express.js (running on Node.js / `tsx`), `@google/genai` SDK
* **Persistence**: Client-side `localStorage` (No login or database required)
* **Build System**: Vite, ESBuild, TypeScript Compiler (`tsc`)

---

## 💻 Local Development Instructions

### Prerequisites
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher

### Setup & Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/alert-lens-ng.git
   cd alert-lens-ng
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and configure your Gemini API Key if testing live AI analysis:
   ```bash
   cp .env.example .env
   ```
   *Note: If no API key is provided, Alert Lens automatically falls back to its internal deterministic heuristic analysis engine.*

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 📋 Project Documentation Directory

For deeper technical and design details, explore the `docs/` folder:

* [`docs/PRODUCT.md`](docs/PRODUCT.md): Full product strategy, feature matrix, and UX philosophy.
* [`docs/CUSTOMER_DISCOVERY.md`](docs/CUSTOMER_DISCOVERY.md): Comprehensive user research findings and interview insights.
* [`docs/SAFETY_ARCHITECTURE.md`](docs/SAFETY_ARCHITECTURE.md): In-depth safety pipeline, rule engines, and protection mechanics.
* [`docs/THREAT_MODEL.md`](docs/THREAT_MODEL.md): Threat vectors, risk boundaries, and mitigation strategies.
* [`docs/TESTING.md`](docs/TESTING.md): Validation framework, test suites, and edge-case handling.
* [`docs/ROADMAP.md`](docs/ROADMAP.md): Development timeline and future expansion vision.
* [`pitch/README.md`](pitch/README.md): Portfolio pitch presentation and demonstration guide.
* [`research/README.md`](research/README.md): Qualitative research methodology and user synthesis.

---

## 🚦 Project Status

**Prototype Status**: Working Prototype (v1.0.0).  
Validated through TypeScript checks, production builds, deterministic safety-logic scenarios, and manual UI testing.

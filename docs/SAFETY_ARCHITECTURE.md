# Technical Safety Architecture: Alert Lens NG

> **Scope**: Detailed technical specification of the decision pipeline, procedure detection engine, URL intelligence rules, protection decision matrix, controlled navigation system, and independent verification guidance in Alert Lens NG.

---

## 1. Safety Pipeline Architecture

Alert Lens processes all submitted content through a 7-stage deterministic safety pipeline:

```
[ Input Content ] ──► (Message, Web Link, Job Offer, Email, Social Post)
         │
         ▼
[ Stage 1: Server-Side Gemini AI + Heuristic Fallback Engine ]
         │
         ▼
[ Stage 2: Warning Sign & Exact Evidence Extraction ]
         │
         ▼
[ Stage 3: Scam Procedure Detection Engine ] (src/utils/procedureDetector.ts)
         │
         ▼
[ Stage 4: URL Intelligence & Domain Classifier ] (src/utils/urlIntelligence.ts)
         │
         ▼
[ Stage 5: Protection Decision Engine ] (src/utils/protectionLogic.ts)
         │  ├── ALLOW (Score < 30)
         │  ├── WARN  (Score 30-69)
         │  └── BLOCK (Score >= 70)
         ▼
[ Stage 6: Controlled Navigation System ] (ProtectedLink + ProtectionInterstitialModal)
         │
         ▼
[ Stage 7: Context-Aware Independent Verification ] (src/utils/verificationGuidance.ts)
```

---

## 2. Stage-by-Stage Technical Breakdown

### Stage 1: Message Analysis Engine (`server.ts` & `src/utils/protectionLogic.ts`)
* **Primary AI Engine**: Server-side proxy calling `@google/genai` with `gemini-3.8-flash`. Uses strict JSON schema enforcement to ensure structured responses.
* **Fallback Rule Engine**: If the Gemini API is unreachable, offline, or throttled, Alert Lens automatically transitions to its local, deterministic rule engine in `src/utils/protectionLogic.ts`.
* **Legitimate Organization Shield**: Checks against `src/data/legitimateOrganizations.ts` to prevent false-positive flagging of known legitimate institutional domains, official customer care handles, and verified communications.

### Stage 2: Warning Sign & Exact Evidence Engine
* Extracts specific `RedFlag` items consisting of:
  * `severity`: HIGH | MEDIUM | LOW
  * `title`: Concise danger header
  * `explanation`: Non-technical explanation of the risk
  * `exactEvidence`: Verbatim quote or snippet extracted directly from the user's input supporting the flag.

### Stage 3: Scam Procedure Detection Engine (`src/utils/procedureDetector.ts`)
Analyzes the input text to determine what sensitive actions the message is asking the user to perform:
* **Tracked Action Types**:
  * `OPEN_LINK`: Requesting user to click an external link.
  * `LOGIN`: Asking user to log into an account portal.
  * `PROVIDE_OTP`: Requesting a One-Time Password.
  * `PROVIDE_BVN`: Requesting Bank Verification Number.
  * `PROVIDE_PIN`: Requesting transaction or card PIN.
  * `PROVIDE_BANK_DETAILS` / `PROVIDE_CARD_DETAILS`: Demanding account/card numbers.
  * `PAY_FEE` / `SEND_MONEY`: Demanding upfront registration, processing, or clearance fees.
  * `DOWNLOAD_FILE` / `INSTALL_SOFTWARE`: Pushing executable or unknown file downloads.
* **Risk Assignment**: Categorizes procedure risk into `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`. Any message requesting OTP, BVN, PIN, or upfront fee automatically triggers `CRITICAL` procedure risk.

### Stage 4: URL Intelligence Engine (`src/utils/urlIntelligence.ts`)
Evaluates embedded or standalone URLs using deterministic domain analysis:
* **URL Extraction**: Regex-based parsing of HTTP/HTTPS schemes and raw domain names.
* **TLD Risk Assessment**: Flags high-risk Top Level Domains frequently associated with spam and phishing (`.xyz`, `.top`, `.site`, `.fun`, `.club`, `.work`, `.online`, `.cc`, `.tk`, `.ml`, `.ga`, `.cf`, `.gq`).
* **IP-Host Detection**: Flags URLs using raw IPv4 or IPv6 addresses instead of registered domain names.
* **Link Shortener Detection**: Identifies URL shorteners (`bit.ly`, `tinyurl.com`, `is.gd`, `cutt.ly`, `t.co`, `rb.gy`).
* **Typosquatting & Subdomain Masking**: Detects lookalike domains attempt to imitate major Nigerian banks, telecos, or global platforms (e.g. `gtbank-verify-portal.xyz` vs `gtbank.com`).

### Stage 5: Protection Decision Engine (`src/utils/protectionLogic.ts`)
Synthesizes the output of AI analysis, procedure detection, and URL intelligence into a final protection decision:

| Protection Action | Risk Score Threshold | Criteria | UI Behavior |
| :--- | :--- | :--- | :--- |
| **ALLOW** | `Score < 30` | No sensitive procedures detected, domain matched to official registry or low risk. | Green safety indicator. Links open with standard browser confirmation. |
| **WARN** | `30 <= Score < 70` | Moderate warning signs, generic shortened URL, or unverified seller offer. | Yellow caution indicator. Interstitial modal alerts user before opening link. |
| **BLOCK** | `Score >= 70` | Requests sensitive data (OTP/BVN/PIN), upfront fee, or flagged malicious URL. | Red danger indicator. Interstitial strongly discourages navigation with explicit warning. |

### Stage 6: Controlled Navigation System (`ProtectedLink.tsx` & `ProtectionInterstitialModal.tsx`)
To prevent accidental clicks on dangerous links:
* All external links rendered within analysis results or history cards are wrapped in `<ProtectedLink>`.
* Clicking a `ProtectedLink` does not immediately open the browser tab. Instead, it triggers `<ProtectionInterstitialModal>`, displaying:
  * The exact destination domain.
  * The assigned protection decision (ALLOW / WARN / BLOCK).
  * The underlying risk reason.
  * A explicit choice to abort navigation or proceed at user's own risk.

### Stage 7: Context-Aware Independent Verification (`src/utils/verificationGuidance.ts`)
Generates tailored verification instructions based on detected organization type:
* **Bank / FinTech**: Instructions to check official banking app or visit physical branch.
* **University / Bursary**: Guidance to check official university student portal directly without using message links.
* **Employer / Job**: Instructions to verify job listing on company's official careers portal.
* **E-Commerce / Seller**: Guidance to verify vendor registration or physical business address.
* **Enforced Golden Safety Rule**: Every guidance card explicitly states: *"Never verify this message using contact details or links provided inside the message itself."*

---

## 3. False-Positive Protection & Educational Shielding

A key risk in scam detection is incorrectly flagging official security warnings or educational content sent by banks/organizations. Alert Lens mitigates this via:
1. **Security Disclaimer Detection**: Differentiates between a message asking for an OTP versus a legitimate bank SMS warning *"Do not share your OTP with anyone"*.
2. **Official Registry Match**: Cross-references claimed senders against `legitimateOrganizations.ts` containing official domains, shortcodes, and official support handles.
3. **Contextual Heuristics**: Evaluates whether sensitive keywords appear in cautionary vs imperative context.

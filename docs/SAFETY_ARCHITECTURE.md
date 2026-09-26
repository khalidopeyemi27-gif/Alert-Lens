# Technical Safety Architecture: Alert Lens NG

> **Scope**: Detailed technical specification of the safety analysis pipeline, scam procedure detection engine, URL intelligence rules, protection decision matrix, controlled navigation system, and independent verification guidance in Alert Lens NG.

---

## 1. Safety Pipeline Architecture

Alert Lens NG evaluates user-submitted content through a 7-stage safety analysis and protection pipeline:

```text
[ User-Submitted Content ] (Message, URL, Job Listing, Email Text, Social Media Offer)
         │
         ▼
[ Stage 1: AI-Assisted + Heuristic Analysis Engine ] (server.ts & src/utils/protectionLogic.ts)
         │
         ▼
[ Stage 2: Warning Sign & Exact Evidence Extraction ] (RedFlag with verbatim evidence)
         │
         ▼
[ Stage 3: Scam Procedure Detection Engine ] (src/utils/procedureDetector.ts)
         │
         ▼
[ Stage 4: URL Intelligence & Structural Classifier ] (src/utils/urlIntelligence.ts)
         │
         ▼
[ Stage 5: Protection Decision Engine ] (src/utils/protectionLogic.ts)
         │  ├── ALLOW (No major warning signs identified)
         │  ├── WARN  (Ambiguous or moderate warning signs exist)
         │  └── BLOCK (High-risk interaction restricted within application)
         ▼
[ Stage 6: Controlled Navigation System ] (ProtectedLink.tsx & ProtectionInterstitialModal.tsx)
         │
         ▼
[ Stage 7: Context-Aware Independent Verification ] (src/utils/verificationGuidance.ts)
```

---

## 2. Stage-by-Stage Technical Breakdown

### Stage 1: AI-Assisted + Heuristic Analysis Engine (`server.ts` & `src/utils/protectionLogic.ts`)
* **Primary AI Analysis**: Server-side Express proxy invoking `@google/genai` with `gemini-3.8-flash`. Enforces strict JSON schema validation to guarantee structured analysis outputs.
* **Intelligent Local Fallback**: If the Gemini API is unreachable, offline, or throttled, Alert Lens automatically transitions to its local rule-evaluation engine (`fallbackAnalysis` in `server.ts`).
* **Known Legitimate Organization Signals**: Cross-references input against `src/data/legitimateOrganizations.ts` to evaluate sender identity, official domain rules, and platform compliance for recognized Nigerian institutions, banks, telcos, and government agencies.

### Stage 2: Warning Sign & Exact Evidence Engine
* Extracts specific `RedFlag` items consisting of:
  * `severity`: `HIGH` | `MEDIUM` | `LOW`
  * `title`: Concise danger header
  * `explanation`: Non-technical explanation of the risk
  * `exactEvidence`: Verbatim quote or snippet extracted directly from the user's input supporting the flag.
* **Evidence Constraint**: Exact evidence must come directly from the submitted content and must not be fabricated or presented as a quotation if it did not appear in the user's input.

### Stage 3: Scam Procedure Detection Engine (`src/utils/procedureDetector.ts`)
Analyzes the input text to identify specific requested sensitive actions:
* **Tracked Action Types**:
  * `PROVIDE_OTP`: Requesting a One-Time Password or verification code (`CRITICAL`).
  * `PROVIDE_RECOVERY_CODE`: Requesting account recovery or backup codes (`CRITICAL`).
  * `PROVIDE_PIN`: Requesting a confidential debit card or transaction PIN (`HIGH`).
  * `PROVIDE_PASSWORD`: Requesting account passwords (`HIGH`).
  * `PROVIDE_BVN`: Requesting Bank Verification Number (`HIGH`).
  * `PROVIDE_CARD_DETAILS`: Requesting debit/credit card digits (`HIGH`).
  * `PROVIDE_BANK_DETAILS`: Requesting bank account numbers or banking details (`HIGH`).
  * `PAY_FEE`: Demanding upfront registration, clearance, or accreditation fees (`HIGH`).
  * `SEND_MONEY`: Demanding cash transfers or payments (`HIGH`).
  * `INSTALL_SOFTWARE`: Requesting installation of remote access tools like AnyDesk/TeamViewer (`HIGH`).
  * `LOGIN`: Asking user to log into an account portal (`MEDIUM`).
  * `PROVIDE_PERSONAL_INFORMATION`: Requesting personal identification details such as NIN or DOB (`MEDIUM`).
  * `INSTALL_APPLICATION`: Requesting installation of an APK or mobile application (`MEDIUM`).
  * `DOWNLOAD_FILE`: Requesting file or attachment downloads (`MEDIUM`).
  * `CONTACT_PHONE`: Directing user to call or dial a phone number (`MEDIUM`).
  * `MOVE_TO_MESSAGING_APP`: Directing conversation to WhatsApp or Telegram (`MEDIUM`).
  * `OPEN_LINK`: Requesting user to open an external link (`LOW`).
* **Procedure Context & Protective Filtering**: Sensitive actions serve as contextual risk indicators, not automatic proof of fraud. The `isProtectiveOrEducationalClause` filter evaluates clauses independently to skip protective security warnings (e.g., *"Never disclose your PIN or OTP to anyone"*), educational guides, or hypothetical examples, helping prevent false-positive flags.

### Stage 4: URL Intelligence Engine (`src/utils/urlIntelligence.ts`)
Evaluates observable URL characteristics in memory without making external network requests:
* **Protocol Analysis**: Identifies unencrypted `http://` connections (`unencrypted_http`).
* **IP-Host Detection**: Detects raw IPv4 or IPv6 host addresses (`ip_address_hostname`).
* **Brand Mismatch Analysis**: Detects known organization tokens appearing in subdomains or host prefixes while the registrable main domain belongs to an unrelated entity (`organization_outside_main_domain`).
* **Subdomain Depth**: Identifies deep subdomain structures (`deep_subdomains`).
* **Domain Extension Signals**: Evaluates less familiar domain extensions (`.cc`, `.biz`, `.xyz`, `.top`, `.club`, `.online`, `.site`, `.info`, `.pages.dev`, `.ng-portal`). *Domain extensions are treated as contextual signals and are never standalone proof of fraud.*
* **Tracking Parameters**: Identifies analytics or referral tracking keys (`referral_tracking_parameter`).
* **Punycode / IDN Formatting**: Flags internationalized domain encoding (`xn--`) or non-ASCII characters (`punycode_encoded_domain`).
* **Excessive Length**: Flags hostnames exceeding 50 characters (`excessive_length`).

### Stage 5: Protection Decision Engine (`src/utils/protectionLogic.ts`)
Synthesizes risk level, high-severity red flags, sensitive credential/procedure demands, and URL intelligence into a protection decision:

| Protection Action | Meaning | Application Behavior |
| :--- | :--- | :--- |
| **ALLOW** | No meaningful indicators requiring intervention under the application's protection rules. | Controlled navigation may proceed with standard digital caution. |
| **WARN** | Suspicious or ambiguous indicators exist, but available evidence is insufficient to justify a block. | Interstitial modal displays warning details; proceeding requires explicit user confirmation. |
| **BLOCK** | Strong indicators of credential harvesting, financial fraud, impersonation, or high-risk procedures justify restricting interaction. | Application prevents direct navigation, displaying danger notices, quoted evidence, and independent verification guidance. |

* **Decision Principle**: Protection decisions reflect contextual application safety bounds rather than absolute or definitive fraud verdicts. No numerical score threshold is used to determine the protection action.

### Stage 6: Controlled Navigation System (`ProtectedLink.tsx` & `ProtectionInterstitialModal.tsx`)
To prevent accidental clicks on dangerous URLs within the Alert Lens interface:
* All external links rendered in analysis results or history cards are wrapped in `<ProtectedLink>`.
* `<ProtectedLink>` intercepts left-clicks, middle-clicks, keypresses, and right-clicks (*"Right-click bypass prevented"*) to prevent direct native browser navigation bypassing the safety layer.
* Interception triggers `<ProtectionInterstitialModal>`, presenting:
  * The intercepted destination URL and domain breakdown.
  * The assigned protection decision (`ALLOW` / `WARN` / `BLOCK`).
  * Underlying safety reason and quoted evidence from the submission.
  * Detailed URL intelligence findings (`UrlIntelligenceCard`).
  * **Zero-Trust Security Rule** reminder.
  * Primary safety actions: **Go Back to Safety** and **Verify Through Official Channel** (and for `WARN` decisions, an explicit **Proceed at Own Risk** option).

### Stage 7: Context-Aware Independent Verification (`src/utils/verificationGuidance.ts`)
Generates tailored verification instructions based on detected organization categories:
* **BANK**: Instructions to open official banking apps independently or call the verified number printed on the back of a debit card.
* **UNIVERSITY**: Guidance to check official university student portals (`.edu.ng`) directly without clicking message links.
* **EMPLOYER**: Instructions to search the official company careers portal independently and verify recruiter domains.
* **INVESTMENT**: Guidance to verify fund managers through the SEC Nigeria or CAC public directories.
* **SELLER**: Guidance to verify vendor registration on search.cac.gov.ng and propose physical pickup or escrow.
* **GOVERNMENT**: Guidance to open official `.gov.ng` portals independently.
* **GENERAL**: Standard independent verification protocols for general online interactions.
* **Enforced Golden Safety Rule**: Every guidance view explicitly states:  
  **"Never verify a suspicious message using links, phone numbers, or contact details provided inside the message itself."**

---

## 3. False-Positive Protection & Educational Shielding

To reduce false positives when evaluating official communications or security warnings, Alert Lens employs:
1. **Protective & Educational Clause Filtering**: Differentiates imperative credential demands from protective security advisories (e.g., *"Zenith Bank will never ask for your PIN"*).
2. **Local Legitimate Organization Dataset**: Cross-references claimed senders against `src/data/legitimateOrganizations.ts` containing official domains, sender IDs, official email patterns, and verified social handles.
3. **Contextual Evaluation**: Evaluates sensitive keywords within their surrounding sentence or clause structure rather than relying on keyword matching alone.

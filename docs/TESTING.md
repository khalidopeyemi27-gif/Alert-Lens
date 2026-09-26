# Quality Assurance & Testing Strategy: Alert Lens NG

> **Scope**: Technical specification of static code validation, build verification, decision-logic test matrices, fallback validation, and navigation protection testing for Alert Lens NG.

---

## 1. Automated Code Quality & Build Verification

Alert Lens enforces automated checks prior to code compilation and deployment:

```bash
# 1. Type Safety Check
npm run lint
# Executes: tsc --noEmit

# 2. Production Build Verification
npm run build
# Executes: vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
```

### Static Analysis Criteria
* **TypeScript Validation**: The `npm run lint` script runs `tsc --noEmit` to verify type safety and interface compatibility across all source files, components, and utility modules.
* **Build Bundle Integrity**: The production build script (`npm run build`) compiles client assets via Vite and bundles the Node.js server entry point (`server.ts`) via Esbuild into `dist/server.cjs`, ensuring all imported dependencies and modules resolve without compilation errors.

---

## 2. Decision Logic & Representative Edge-Case Test Matrix

To verify consistent protection across diverse user inputs, the safety pipeline was evaluated against a representative test matrix covering common scam patterns, legitimate advisories, and structural edge cases:

| Test ID | Scenario | Input Characteristics | Expected Pipeline Behavior | Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01: Fake Student Bursary** | *"Selected for ₦150,000 bursary. Click bursary-portal.xyz, log in, enter BVN and OTP."* | Unsolicited bursary offer with external link requesting credential and identity inputs. | Detects `LOGIN`, `PROVIDE_BVN`, and `PROVIDE_OTP` sensitive procedures; identifies domain structure signals; assigns **BLOCK** decision. | ✅ PASSED |
| **TC-02: Fake Job Offer (Upfront Fee)** | *"Urgent hiring for Remote Data Entry! Pay ₦5,000 application fee via transfer to claim laptop."* | Employment offer requiring upfront payment before onboarding. | Detects `PAY_FEE` sensitive procedure and upfront fee red flag; assigns **BLOCK** decision. | ✅ PASSED |
| **TC-03: Bank Impersonation** | *"FirstBank Notice: Your account is blocked. Visit firstbank-revalidate.top to update BVN."* | Account suspension claim with domain mismatch (`firstbank-revalidate.top` vs official domain). | Identifies organization brand-mismatch signal and `PROVIDE_BVN` request; assigns **BLOCK** decision. | ✅ PASSED |
| **TC-04: Legitimate Bank Warning** | *"FirstBank Advisory: We will NEVER ask for your OTP, PIN or BVN. Stay safe from scammers."* | Official security advisory containing credential terms in a protective context. | Recognized by `isProtectiveOrEducationalClause` as educational/protective advice; filters out false positive; assigns **ALLOW** decision. | ✅ PASSED |
| **TC-05: Legitimate Official Portal Link** | *"Visit https://www.unilag.edu.ng to view official 2026 academic calendar updates."* | Information link pointing to an official institutional domain. | Evaluates domain structure against legitimate organization datasets; assigns **ALLOW** decision. | ✅ PASSED |
| **TC-06: Raw Shortened URL** | *"Claim your free 10GB data bonus now: bit.ly/3xX9aYz"* | Offer message containing a masked URL shortener. | Contextual URL signal detected for link shorteners requiring user vigilance; assigns **WARN** decision. | ✅ PASSED |
| **TC-07: Minimal Input / Single URL** | *"http://suspicious-offer.cc"* | Minimal input containing a standalone URL string. | Parsed in memory without runtime exception or undefined property access; evaluates observable HTTP and domain signals. | ✅ PASSED |
| **TC-08: Nigerian Pidgin / Local Slang** | *"Congrats bro! You don win ₦50k. Send your BVN and OTP make we credit you fast fast."* | Informal phrasing promising financial gain in exchange for credentials. | Detects requested sensitive procedures (`PROVIDE_BVN`, `PROVIDE_OTP`) within informal context; assigns **BLOCK** decision. | ✅ PASSED |

---

## 3. Fallback Engine Validation (Offline / API Degradation)

Alert Lens maintains core safety analysis when server-side AI API calls are unavailable:

### Fallback Verification Protocol
1. **Trigger Condition**: Simulated network disconnection or unconfigured API key.
2. **Observed Behavior**:
   * Server proxy or application detects AI service unavailability.
   * Automatically executes local deterministic rule evaluation (`fallbackAnalysis` in `server.ts` / `src/utils/protectionLogic.ts`).
   * Extracts red flags, detects sensitive procedures (`OTP`, `BVN`, `Fee`, `Login`), evaluates URL structure, and assigns an `ALLOW` / `WARN` / `BLOCK` protection decision.
   * Sets `isFallback: true` in the output state to gracefully inform the UI while maintaining core local protection.

---

## 4. Navigation & Interstitial Modal Validation

| Link Protection State | Interstitial Modal Action | Expected Navigation Behavior |
| :--- | :--- | :--- |
| **ALLOW Link** | Interstitial modal confirms safe parameters. | Controlled navigation proceeds in a new tab upon user action. |
| **WARN Link** | Interstitial modal displays cautionary notice and URL analysis. | Navigation proceeds only if user explicitly confirms by selecting *"Proceed at Own Risk"*. |
| **BLOCK Link** | Interstitial modal displays danger notice, quoted evidence, and verification guidance. | Direct navigation is restricted; user is guided toward *"Go Back to Safety"* or *"Verify Through Official Channel"*. |

### Application-Level Click Interception Testing
* `<ProtectedLink>` was validated to intercept left-clicks, middle-clicks, keypress activation, and right-click menu navigation within the application's interface model, ensuring user navigation passes through `<ProtectionInterstitialModal>` before external destinations are reached.

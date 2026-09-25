# Quality Assurance & Testing Strategy: Alert Lens NG

> **Scope**: Specification of static code validation, build verification, deterministic rule testing, heuristic fallback validation, and edge-case testing matrices for Alert Lens NG.

---

## 1. Automated Code Quality & Build Verification

Alert Lens enforces strict automated checks prior to code compilation and deployment:

```bash
# 1. Type Safety Check (Zero TypeScript Errors)
npm run lint
# Executes: tsc --noEmit

# 2. Production Build Verification
npm run build
# Executes: vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
```

### Static Analysis Criteria
* **Zero Implicit Any**: Strict TypeScript configuration (`tsconfig.json`) requiring explicit interface typings across components and utilities.
* **Component Prop Validation**: All React components strictly typed via `src/types.ts`.
* **Build Bundle Integrity**: Single bundled production Express server output (`dist/server.cjs`) verifying zero missing node modules or orphan dependencies.

---

## 2. Decision Logic & Edge-Case Test Matrix

To ensure consistent protection across diverse user inputs, the decision pipeline was validated against a comprehensive test suite:

### Test Suite Categories

| Test Category | Input Example | Expected Pipeline Output | Validation Result |
| :--- | :--- | :--- | :--- |
| **TC-01: Fake Student Bursary** | *"Selected for ₦150,000 bursary. Click bursary-portal.xyz, log in, enter BVN and OTP."* | **BLOCK** (Score >= 80). Procedure: `LOGIN`, `PROVIDE_BVN`, `PROVIDE_OTP`. TLD: `.xyz` Flagged. | ✅ PASSED |
| **TC-02: Fake Job Offer (Upfront Fee)** | *"Urgent hiring for Remote Data Entry! Pay ₦5,000 application fee via transfer to claim laptop."* | **BLOCK** (Score >= 75). Procedure: `PAY_FEE`. Red flag: Upfront fee demand. | ✅ PASSED |
| **TC-03: Bank Impersonation** | *"FirstBank Notice: Your account is blocked. Visit firstbank-revalidate.top to update BVN."* | **BLOCK** (Score >= 85). Domain mismatch (`firstbank-revalidate.top` vs `firstbanknigeria.com`). | ✅ PASSED |
| **TC-04: Legitimate Bank Warning** | *"FirstBank Advisory: We will NEVER ask for your OTP, PIN or BVN. Stay safe from scammers."* | **ALLOW** (Score < 20). Classified as educational security disclaimer. | ✅ PASSED |
| **TC-05: Legitimate Official Portal Link** | *"Visit https://www.unilag.edu.ng to view official 2026 academic calendar updates."* | **ALLOW** (Score < 15). Domain verified against official institutional whitelist. | ✅ PASSED |
| **TC-06: Raw Shortened URL** | *"Claim your free 10GB data bonus now: bit.ly/3xX9aYz"* | **WARN** (Score 40-50). Flagged as masked URL shortener requiring verification. | ✅ PASSED |
| **TC-07: Micro Input / Single Word** | *"http://suspicious-offer.cc"* | **WARN/BLOCK** based on TLD `.cc`. No crash or undefined object access. | ✅ PASSED |
| **TC-08: Nigerian Pidgin / Local Slang** | *"Congrats bro! You don win ₦50k. Send your BVN and OTP make we credit you fast fast."* | **BLOCK** (Score >= 80). Detects sensitive keywords (`BVN`, `OTP`) regardless of informal phrasing. | ✅ PASSED |

---

## 3. Fallback Engine Validation (Offline / API Degradation)

Alert Lens must maintain core safety enforcement even if server-side AI API calls fail or timeout.

### Fallback Verification Protocol
1. **Trigger Condition**: Simulated network disconnection or invalid Gemini API key in `.env`.
2. **Behavior Observed**:
   * Application detects network / proxy response failure.
   * Instantly executes `src/utils/protectionLogic.ts` deterministic heuristic rules.
   * Successfully extracts red flags, identifies procedure keywords (`OTP`, `BVN`, `Fee`, `Link`), calculates risk score, and assigns `ALLOW` / `WARN` / `BLOCK`.
   * Sets `isFallback: true` in result state to gracefully inform UI while keeping full protection intact.

---

## 4. Navigation & Interstitial Modal Validation

| Link Type | Interstitial Modal Action | Expected Navigation Outcome |
| :--- | :--- | :--- |
| **ALLOW Link** | Interstitial displays green confirmation dialog. | Opens link in new tab upon user click. |
| **WARN Link** | Interstitial displays yellow cautionary advisory. | Opens link in new tab only if user explicitly selects *"Proceed Anyway"*. |
| **BLOCK Link** | Interstitial displays red danger alert strongly advising cancellation. | Primary button defaults to *"Go Back to Safety"*. Direct navigation discouraged. |

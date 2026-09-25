# Portfolio Pitch & Presentation Guide: Alert Lens NG

> **Tagline**: *"People don't go looking for scams. Scams come looking for them."*

---

## 🎤 Executive Elevator Pitch

"Digital fraud has shifted from crude spam to highly targeted, convincing messages delivered directly to smartphones via WhatsApp, SMS, and Email. Traditional security tools fail everyday users because they either rely on complex technical jargon or provide passive numerical scores that don't tell the user what to do.

**Alert Lens NG** is a proactive digital safety and decision-support layer. Instead of just rating risk, Alert Lens detects what the message is asking you to do—whether it's logging into a fake portal, providing an OTP, or paying an upfront fee. It enforces safe navigation bounds through protected link intercepts, guides users through safe independent verification outside the message, and builds long-term safety awareness through interactive tutorials. It operates with zero friction and zero mandatory account creation, delivering immediate protection when users need it most."

---

## 📊 Presentation Deck Outline (10-Slide Structure)

### Slide 1: Title & Vision
* **Headline**: Alert Lens NG — Digital Safety & Decision-Support Layer
* **Sub-headline**: *"People don't go looking for scams. Scams come looking for them."*
* **Visual**: Clean mockups of Alert Lens running on desktop and mobile.

### Slide 2: The Problem
* The explosion of digital fraud across messaging channels (SMS, WhatsApp, Social Media).
* Top vectors: Fake Bursaries, Upfront-Fee Jobs, Bank Impersonation, Fake Sellers.
* Key quote from user discovery: *"Scams look so real now, and I don't know where to verify if an offer is genuine."*

### Slide 3: Customer Discovery Evidence
* Summary of 16 qualitative user interviews (August 2026).
* Key pattern: The "Inside-the-Message" Trap — users try to verify suspicious messages using contact details provided *inside* the scam message itself.
* Case study highlight: Reported experience of a user losing ₦5,000 to a fake investment platform that demanded an additional ₦2,000 fee before allowing withdrawals.

### Slide 4: The Alert Lens Framework
* **DETECT → EXPLAIN → PROTECT → VERIFY → LEARN**
* How Alert Lens transforms raw messages into actionable safety guidance.

### Slide 5: Feature Spotlight 1 — Scam Procedure Detection
* Visual breakdown of `ScamProcedureCard`.
* Demonstrating how Alert Lens extracts requested sensitive actions (`LOGIN`, `PROVIDE_OTP`, `PROVIDE_BVN`, `PAY_FEE`) upfront.

### Slide 6: Feature Spotlight 2 — Controlled Navigation & Interstitials
* Demonstration of `ProtectedLink` and `ProtectionInterstitialModal`.
* Showing how Alert Lens intercepts clicks on high-risk links before the user enters external sites.

### Slide 7: Feature Spotlight 3 — Independent Verification & Safety Center
* Context-aware verification steps enforcing the Golden Safety Rule (*Never verify using contact details in the message*).
* 8 scenario-driven Safety Tutorials teaching proactive scam recognition.

### Slide 8: Technical Architecture
* Server-side Gemini API with deterministic rule engine fallback.
* URL Intelligence Engine (TLD risk, IP host, homograph analysis).
* Zero-login architecture built on React 19, TypeScript, and Express.

### Slide 9: Product Roadmap (Current Prototype vs Future Vision)
* **Current**: Web Application, Express AI Proxy, Protected Navigation, Safety Center.
* **Future**: Chrome/Firefox Extension, WhatsApp Web Scanner, Mobile Security Overlay, Financial API Gateway.

### Slide 10: Conclusion & Call to Action
* Try the prototype live.
* Repository link and contact details.

---

## 🎬 Recommended 3-Minute Demonstration Script

1. **Start at Home (`/`)**: Point out the clean, focused starting point answering *"What does this app do?"* and click **🔎 Check a Message**.
2. **Submit a Suspicious Message (`/check`)**:
   * Paste a realistic example: *"Congratulations! You have been selected for a ₦150,000 student bursary. Click bursary-portal.xyz, log into your student account, enter your BVN and OTP to claim your payment."*
   * Click **Analyze**.
3. **Walk Through the Investigation Result**:
   * **What did we find?**: Highlight the 🔴 **High Risk** result.
   * **Why does it matter?**: Show the exact evidence snippets quoted directly from the input.
   * **What is it asking me to do?**: Show the `ScamProcedureCard` displaying `LOGIN`, `PROVIDE_BVN`, and `PROVIDE_OTP`.
   * **Protected Link**: Click the link in the result card to demonstrate the `<ProtectionInterstitialModal>` intercepting navigation.
   * **Verify Before You Continue**: Show the university-specific independent verification guidance.
4. **Safety Center & History**:
   * Switch to **Safety Center** and open **Safety Tutorials** to show a 5-step interactive tutorial.
   * Open **History** and demonstrate the Mobile Quick View overlay.

# Product Roadmap & Strategic Vision: Alert Lens NG

> **Roadmap distinction:** Phase 1 describes the capabilities implemented in the current web prototype. Phase 2 and Phase 3 describe future product directions and integrations that are not part of the current prototype.

---

## 🚀 Phase 1: Web Prototype (CURRENT)

The current prototype provides a digital safety and decision-support experience for **user-submitted messages, URLs, email text, job listings, and social-media or online offers**. It does not currently monitor external communication channels automatically.

### Core capabilities

* **Multi-Content Checker**: Analyze user-submitted suspicious messages, URLs, email text, job listings, social-media offers, and other online content.

* **Scam Procedure Detection Engine**: Detect and contextualize requested actions such as `LOGIN`, `PROVIDE_OTP`, `PROVIDE_BVN`, `PROVIDE_BANK_DETAILS`, `PROVIDE_CARD_DETAILS`, `SEND_MONEY`, and `PAY_FEE`. Sensitive actions are treated as risk indicators, not automatic proof of fraud.

* **URL Intelligence**: Analyze observable URL structure in memory, including IP-based hosts, HTTP connections, Punycode or unusual-character formatting, contextual domain-extension signals, tracking or referral patterns, deep subdomains, and conservative brand-mismatch indicators.

* **Controlled Navigation System**: `ProtectedLink` and `ProtectionInterstitialModal` provide application-level `ALLOW`, `WARN`, or `BLOCK` decisions before controlled navigation to analyzed external destinations.

* **Context-Aware Independent Verification**: Provide verification guidance for contexts such as banking, universities, employment, investment, e-commerce, government services, and general online interactions, following the Golden Safety Rule:

  **Never verify a suspicious message using links, phone numbers, or contact details provided inside the message itself.**

* **Interactive Safety Center & Tutorials**: Eight scenario-based learning modules covering common digital fraud situations, including fake bursaries, fake jobs, bank impersonation, fake investments, fake sellers, urgent payment requests, suspicious links, and account-verification scams.

* **Analysis History & Mobile Quick View**: Store and display previous analyses with available channel/context information, including a responsive Quick View experience for smaller screens.

* **Alert AI Conversational Layer**: Provide context-aware answers to follow-up questions about the submitted content and its safety implications.

---

## 🔮 Phase 2: Browser Extension & Active Web Protection (FUTURE VISION)

The next product direction is to move Alert Lens closer to the point where users encounter suspicious content on the web.

Potential capabilities include:

* **Browser Extension**: A Chrome/Firefox extension that could analyze links and relevant content directly within web-based communication environments such as WhatsApp Web, Gmail, Outlook, and other supported webmail or messaging interfaces.

* **On-Page Link Protection**: Surface `ALLOW`, `WARN`, and `BLOCK` indicators alongside supported links, with controlled navigation and explanatory warnings.

* **Optional Cross-Device Synchronization**: Allow users to synchronize analysis history across supported devices using privacy-preserving architecture and encrypted data transfer.

* **Local / On-Device AI**: Explore lightweight browser or device-local AI models that could support selected safety analysis without requiring every analysis to be processed remotely.

> These capabilities represent future development directions. They are not currently implemented in the Alert Lens web prototype.

---

## 🌐 Phase 3: Ecosystem & Institutional Integration (FUTURE VISION)

Longer-term development could extend Alert Lens from an individual decision-support tool into a broader digital-safety infrastructure layer.

Potential directions include:

* **Mobile Security SDK & Messaging Protection**: Explore Android and iOS integrations that could provide safety warnings around supported SMS, messaging, or notification-based interactions, subject to platform capabilities and permissions.

* **Financial & Telecom Threat Intelligence API**: Provide enterprise APIs that could allow banks, telecom providers, and e-commerce platforms to exchange signals about suspicious scam procedures, domains, payment requests, and other threat indicators.

* **Community-Sourced Threat Intelligence**: Allow users and trusted organizations to report emerging scam patterns, templates, domains, and procedures, with appropriate review and validation before protection rules are updated.

* **Regional Language & Slang Support**: Expand detection and explanation capabilities for Nigerian and wider West African communication patterns, including Yoruba, Hausa, Igbo, and Nigerian Pidgin, with future model adaptation based on appropriate data and evaluation.

---

## Product Direction

The roadmap follows the same progression as the product's core philosophy:

**DETECT → EXPLAIN → PROTECT → VERIFY → LEARN**

**Phase 1** establishes the decision-support foundation.

**Phase 2** moves protection closer to the point where users encounter suspicious content.

**Phase 3** explores broader ecosystem integration and regional threat intelligence.

The long-term vision is for Alert Lens to become a **digital safety layer that helps people stop, understand, and independently verify suspicious digital interactions before they take a risky action.**

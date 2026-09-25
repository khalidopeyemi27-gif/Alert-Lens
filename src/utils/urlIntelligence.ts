export interface ParsedUrlStructure {
  full_url: string;
  protocol: string;
  hostname: string;
  main_domain: string;
  subdomain: string;
  path: string;
  query_parameters: Record<string, string>;
  fragment?: string;
  is_ip_hostname: boolean;
  is_valid: boolean;
}

export interface UrlFinding {
  type:
    | 'unencrypted_http'
    | 'organization_outside_main_domain'
    | 'deep_subdomains'
    | 'referral_tracking_parameter'
    | 'ip_address_hostname'
    | 'punycode_encoded_domain'
    | 'less_familiar_extension'
    | 'excessive_length';
  severity: 'high' | 'medium' | 'info';
  user_title: string;
  user_explanation: string;
  what_we_found: string;
  why_it_matters: string;
  what_to_do: string;
  technical_detail: string;
  evidence: string;
}

export interface UrlIntelligenceReport {
  url: string;
  parsed: ParsedUrlStructure;
  findings: UrlFinding[];
}

const KNOWN_MULTI_PART_TLDS = [
  'edu.ng',
  'gov.ng',
  'com.ng',
  'org.ng',
  'net.ng',
  'co.uk',
  'org.uk',
  'gov.uk',
  'ac.uk',
  'com.au',
  'net.au',
  'co.za',
  'co.jp',
  'com.br',
];

const KNOWN_ORG_TOKENS: { token: string; officialDomain: string; displayName: string; category: string }[] = [
  { token: 'unilag', officialDomain: 'unilag.edu.ng', displayName: 'University of Lagos (UNILAG)', category: 'university' },
  { token: 'ui', officialDomain: 'ui.edu.ng', displayName: 'University of Ibadan (UI)', category: 'university' },
  { token: 'oau', officialDomain: 'oauife.edu.ng', displayName: 'Obafemi Awolowo University (OAU)', category: 'university' },
  { token: 'abu', officialDomain: 'abu.edu.ng', displayName: 'Ahmadu Bello University (ABU)', category: 'university' },
  { token: 'lasu', officialDomain: 'lasu.edu.ng', displayName: 'Lagos State University (LASU)', category: 'university' },
  { token: 'gtbank', officialDomain: 'gtbank.com', displayName: 'Guaranty Trust Bank (GTBank)', category: 'bank' },
  { token: 'gtb', officialDomain: 'gtbank.com', displayName: 'GTBank', category: 'bank' },
  { token: 'zenith', officialDomain: 'zenithbank.com', displayName: 'Zenith Bank', category: 'bank' },
  { token: 'firstbank', officialDomain: 'firstbanknigeria.com', displayName: 'First Bank of Nigeria', category: 'bank' },
  { token: 'fbn', officialDomain: 'firstbanknigeria.com', displayName: 'First Bank', category: 'bank' },
  { token: 'accessbank', officialDomain: 'accessbankplc.com', displayName: 'Access Bank', category: 'bank' },
  { token: 'kuda', officialDomain: 'kuda.com', displayName: 'Kuda Bank', category: 'bank' },
  { token: 'opay', officialDomain: 'opayweb.com', displayName: 'OPay', category: 'fintech' },
  { token: 'palmpay', officialDomain: 'palmpay.com', displayName: 'PalmPay', category: 'fintech' },
  { token: 'moniepoint', officialDomain: 'moniepoint.com', displayName: 'Moniepoint', category: 'fintech' },
  { token: 'flutterwave', officialDomain: 'flutterwave.com', displayName: 'Flutterwave', category: 'fintech' },
  { token: 'paystack', officialDomain: 'paystack.com', displayName: 'Paystack', category: 'fintech' },
  { token: 'uba', officialDomain: 'ubagroup.com', displayName: 'United Bank for Africa (UBA)', category: 'bank' },
  { token: 'stanbic', officialDomain: 'stanbicibtc.com', displayName: 'Stanbic IBTC', category: 'bank' },
  { token: 'totalenergies', officialDomain: 'totalenergies.ng', displayName: 'TotalEnergies', category: 'organization' },
  { token: 'firs', officialDomain: 'firs.gov.ng', displayName: 'Federal Inland Revenue Service (FIRS)', category: 'government agency' },
  { token: 'cbn', officialDomain: 'cbn.gov.ng', displayName: 'Central Bank of Nigeria (CBN)', category: 'government agency' },
  { token: 'nuc', officialDomain: 'nuc.edu.ng', displayName: 'National Universities Commission (NUC)', category: 'government agency' },
  { token: 'nimc', officialDomain: 'nimc.gov.ng', displayName: 'National Identity Management Commission (NIMC)', category: 'government agency' },
  { token: 'jamb', officialDomain: 'jamb.gov.ng', displayName: 'JAMB', category: 'government agency' },
];

export function parseUrlStructure(rawUrl: string): ParsedUrlStructure {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      full_url: rawUrl || '',
      protocol: 'none',
      hostname: '',
      main_domain: '',
      subdomain: '',
      path: '',
      query_parameters: {},
      is_ip_hostname: false,
      is_valid: false,
    };
  }

  const trimmed = rawUrl.trim();
  let formatted = trimmed;
  let hasExplicitProtocol = true;

  if (!/^https?:\/\//i.test(formatted)) {
    hasExplicitProtocol = false;
    formatted = 'https://' + formatted;
  }

  try {
    const parsed = new URL(formatted);
    const hostname = parsed.hostname.toLowerCase();
    const protocol = hasExplicitProtocol ? parsed.protocol.toLowerCase() : 'https:';
    const path = parsed.pathname || '/';
    const fragment = parsed.hash ? parsed.hash : undefined;

    const query_parameters: Record<string, string> = {};
    parsed.searchParams.forEach((val, key) => {
      query_parameters[key] = val;
    });

    const is_ip_hostname = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname) || /^\[?[a-fA-F0-9:]+\]?$/.test(hostname);

    let main_domain = hostname;
    let subdomain = '';

    if (is_ip_hostname) {
      main_domain = hostname;
      subdomain = '';
    } else {
      const parts = hostname.split('.');
      if (parts.length >= 3) {
        const lastTwo = parts.slice(-2).join('.');
        if (KNOWN_MULTI_PART_TLDS.includes(lastTwo) && parts.length >= 3) {
          main_domain = parts.slice(-3).join('.');
          subdomain = parts.slice(0, -3).join('.');
        } else {
          main_domain = parts.slice(-2).join('.');
          subdomain = parts.slice(0, -2).join('.');
        }
      } else if (parts.length === 2) {
        main_domain = hostname;
        subdomain = '';
      }
    }

    return {
      full_url: trimmed,
      protocol,
      hostname,
      main_domain,
      subdomain,
      path,
      query_parameters,
      fragment,
      is_ip_hostname,
      is_valid: true,
    };
  } catch (e) {
    // Graceful fallback for malformed URLs
    return {
      full_url: trimmed,
      protocol: trimmed.startsWith('http://') ? 'http:' : trimmed.startsWith('https://') ? 'https:' : 'unknown',
      hostname: trimmed.split('/')[0] || trimmed,
      main_domain: trimmed,
      subdomain: '',
      path: '/',
      query_parameters: {},
      is_ip_hostname: false,
      is_valid: false,
    };
  }
}

export function analyzeUrlIntelligence(urlStr: string): UrlIntelligenceReport {
  const parsed = parseUrlStructure(urlStr);
  const findings: UrlFinding[] = [];

  if (!parsed.is_valid && !parsed.hostname) {
    return { url: urlStr, parsed, findings };
  }

  // 1. Unencrypted HTTP Connection (MEDIUM severity, not proof of fraud)
  if (parsed.protocol === 'http:') {
    findings.push({
      type: 'unencrypted_http',
      severity: 'medium',
      user_title: 'Connection is not encrypted',
      user_explanation:
        'The link uses HTTP instead of HTTPS. Information sent through an HTTP connection is not protected in the same way as HTTPS.',
      what_we_found: 'The address starts with http:// instead of secure https://',
      why_it_matters: 'Information entered on an unencrypted HTTP page is transmitted in clear text across the network.',
      what_to_do: 'Avoid entering personal details, passwords, PINs, or financial information on unencrypted pages.',
      technical_detail: 'Unencrypted HTTP protocol detected. Transmission lacks TLS/SSL encryption.',
      evidence: parsed.full_url,
    });
  }

  // 2. IP-address Hostname (MEDIUM severity)
  if (parsed.is_ip_hostname) {
    findings.push({
      type: 'ip_address_hostname',
      severity: 'medium',
      user_title: '⚠️ The link uses a numeric internet address',
      user_explanation:
        'Legitimate services can use IP addresses, but a numeric address can make it harder to identify who operates the website.',
      what_we_found: `The website address uses raw numeric IP digits (${parsed.hostname}) instead of a standard domain name.`,
      why_it_matters: 'Numeric IP addresses conceal domain registration and owner identification details.',
      what_to_do: 'Exercise extra caution and verify the owner of the IP address before proceeding.',
      technical_detail: `Raw IP address host detected (${parsed.hostname}).`,
      evidence: parsed.hostname,
    });
  }

  // 3. Organization / Brand Name Outside Main Domain (HIGH severity ONLY when brand is in subdomain/prefix and main_domain is unrelated)
  if (parsed.subdomain) {
    const sub = parsed.subdomain.toLowerCase();
    const mainDom = parsed.main_domain.toLowerCase();

    for (const org of KNOWN_ORG_TOKENS) {
      // Check if brand token appears specifically inside the subdomain or prefix, NOT in normal path/queries
      const tokenInSubdomain = sub.includes(org.token);
      const mainDomainIsOfficial = mainDom === org.officialDomain.toLowerCase() || mainDom.includes(org.token);

      if (tokenInSubdomain && !mainDomainIsOfficial) {
        const categoryLabel = org.category === 'university' ? 'a university-related' : `a ${org.category}-related`;
        findings.push({
          type: 'organization_outside_main_domain',
          severity: 'high',
          user_title: '⚠️ The website address may be misleading',
          user_explanation:
            'The link uses the name of an organization, but that name is not the main website address. This can be used to make a website look official.',
          what_we_found: `The address uses ${categoryLabel} name (${org.displayName}), but the main website address is ${parsed.main_domain}.`,
          why_it_matters:
            'A website can use a familiar organization name in part of its address to look official even when it is operated from a different domain.',
          what_to_do: `Open the organization's official website (${org.officialDomain}) separately and verify the address before continuing.`,
          technical_detail: `Subdomain prefix "${parsed.subdomain}" contains brand token "${org.token}", whereas registrable main domain is "${parsed.main_domain}".`,
          evidence: parsed.hostname,
        });
        break; // Stop after first match to prevent duplicate brand warnings
      }
    }
  }

  // 4. Deep Subdomains (INFO severity - neutral contextual observation)
  const subdomainParts = parsed.subdomain ? parsed.subdomain.split('.').filter(Boolean) : [];
  if (subdomainParts.length >= 3) {
    findings.push({
      type: 'deep_subdomains',
      severity: 'info',
      user_title: 'ℹ️ This website uses several address levels',
      user_explanation:
        'The website address contains several sections before the main domain. This is not automatically dangerous, but the main website address should still be checked.',
      what_we_found: `The website address contains ${subdomainParts.length} subdomain sections (${parsed.subdomain}) before the main domain.`,
      why_it_matters: `Organisations sometimes use multiple address levels for technical reasons. Focus on the main domain (${parsed.main_domain}) to verify who owns the website.`,
      what_to_do: `Focus on the main operating domain (${parsed.main_domain}) to confirm who operates the website.`,
      technical_detail: `Subdomain depth count: ${subdomainParts.length} levels (${parsed.subdomain}).`,
      evidence: parsed.hostname,
    });
  }

  // 5. Less Familiar Domain Extension (INFO severity - contextual observation, NEVER proof of fraud)
  const lessFamiliarExtensions = ['.cc', '.biz', '.xyz', '.top', '.club', '.online', '.site', '.info', '.pages.dev', '.ng-portal'];
  const matchedExt = lessFamiliarExtensions.find((ext) => parsed.hostname.endsWith(ext));

  if (matchedExt) {
    findings.push({
      type: 'less_familiar_extension',
      severity: 'info',
      user_title: 'ℹ️ The website uses a less familiar domain ending',
      user_explanation:
        'Some legitimate websites use less familiar domain endings, so this alone does not mean the website is unsafe.',
      what_we_found: `The website uses the domain ending ${matchedExt}.`,
      why_it_matters:
        'Some legitimate websites use less familiar domain endings, so this alone does not mean the website is unsafe.',
      what_to_do:
        'Check that the website address matches the organization\'s official website before entering sensitive information.',
      technical_detail: `Alternative or non-standard TLD extension detected: ${matchedExt}.`,
      evidence: parsed.hostname,
    });
  }

  // 6. Referral / Tracking Parameter (INFO severity - neutral information)
  const trackingKeys = ['ref', 'referrer', 'utm_source', 'utm_medium', 'aff', 'affiliate', 'tracker', 'src'];
  const foundTrackingKeys = Object.keys(parsed.query_parameters).filter((k) =>
    trackingKeys.includes(k.toLowerCase())
  );

  if (foundTrackingKeys.length > 0) {
    const formattedParams = foundTrackingKeys.map((k) => `${k}=${parsed.query_parameters[k]}`).join(', ');
    findings.push({
      type: 'referral_tracking_parameter',
      severity: 'info',
      user_title: 'ℹ️ This link contains a referral or tracking code',
      user_explanation:
        'This may be used to track where the visitor came from. By itself, this does not mean the link is a scam.',
      what_we_found: `Link contains tracking parameter(s): ${formattedParams}`,
      why_it_matters: 'Referral tracking codes allow the sender or campaign creator to record clicks and referral origins.',
      what_to_do: 'Be aware that the creator of the link can track when and where this link was clicked.',
      technical_detail: `URL search query contains analytics or referral tracking keys: ${foundTrackingKeys.join(', ')}.`,
      evidence: formattedParams,
    });
  }

  // 7. Punycode / Internationalized Domain (MEDIUM severity - look-alike verification)
  if (parsed.hostname.includes('xn--') || /[^\x00-\x7F]/.test(parsed.hostname)) {
    findings.push({
      type: 'punycode_encoded_domain',
      severity: 'medium',
      user_title: '⚠️ The website address uses an unusual character format',
      user_explanation:
        'The link contains encoded international characters (Punycode). Some characters look identical to standard letters but belong to different character sets.',
      what_we_found: `Encoded international characters detected (${parsed.hostname}).`,
      why_it_matters: 'Look-alike characters (homoglyphs) can trick visitors into mistaking a deceptive address for a genuine one.',
      what_to_do: 'Carefully verify the spelling of the domain before entering any information.',
      technical_detail: `Punycode / Internationalized Domain Name (IDN) encoding detected in host string (${parsed.hostname}).`,
      evidence: parsed.hostname,
    });
  }

  // 8. Unusually Long Hostname (INFO severity - contextual observation)
  if (parsed.hostname.length > 50 && !findings.some((f) => f.type === 'organization_outside_main_domain')) {
    findings.push({
      type: 'excessive_length',
      severity: 'info',
      user_title: 'ℹ️ Unusually long web address',
      user_explanation: 'The link host address is longer than typical website domains.',
      what_we_found: `Address host length is ${parsed.hostname.length} characters.`,
      why_it_matters: 'Long domain names with multiple hyphens can be harder to read or identify.',
      what_to_do: 'Review the main domain name carefully.',
      technical_detail: `Hostname exceeds 50 characters (${parsed.hostname.length} chars).`,
      evidence: parsed.hostname,
    });
  }

  return {
    url: urlStr,
    parsed,
    findings,
  };
}


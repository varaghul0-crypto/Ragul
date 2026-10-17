import { ScamAnalysisReport, ScamSignal } from '../types';

export function analyzeMessageSafety(text: string): ScamAnalysisReport {
  const lower = text.toLowerCase();

  // 1. Urgency Trigger Check
  const urgencyKeywords = [
    'urgent',
    'immediately',
    'within 2 hours',
    'within 30 minutes',
    'hurry',
    'only 3 spots',
    'limited time',
    'today only',
    'before 4 pm',
    'permanent freeze',
    'suspended',
    'debarred',
    'account blocked',
    'last chance',
  ];
  const detectedUrgency = urgencyKeywords.filter(k => lower.includes(k));
  const urgencySignal: ScamSignal = {
    id: 'sig-urgency',
    name: 'Urgency & Coercion Trigger',
    detected: detectedUrgency.length > 0,
    severity: detectedUrgency.length > 1 ? 'high' : detectedUrgency.length === 1 ? 'medium' : 'low',
    detail:
      detectedUrgency.length > 0
        ? `Contains high-pressure phrases (${detectedUrgency.slice(0, 2).map(w => `"${w}"`).join(', ')}) designed to induce panic and prevent rational verification.`
        : 'No aggressive time-pressure or threat coercion keywords detected.',
  };

  // 2. Suspicious Link Format Check
  const linkMatches = text.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(cfd|top|tk|ml|xyz|click|in\.net|link|apk))/gi) || [];
  const suspiciousExtensions = ['.cfd', '.top', '.tk', '.xyz', '.click', '.apk', 'bit.ly', 'tinyurl.com', 'page.link'];
  const hasSuspiciousLink =
    linkMatches.length > 0 &&
    (linkMatches.some(l => suspiciousExtensions.some(ext => l.toLowerCase().includes(ext))) ||
      linkMatches.some(l => !l.toLowerCase().includes('.edu') && !l.toLowerCase().includes('.gov')));
  const linkSignal: ScamSignal = {
    id: 'sig-link',
    name: 'Suspicious Link / Typosquatting',
    detected: hasSuspiciousLink || linkMatches.length > 0,
    severity: hasSuspiciousLink ? 'high' : 'low',
    detail: hasSuspiciousLink
      ? `Points to non-institutional or deceptive link format (${linkMatches[0] || 'unverified URL'}). Attackers use URL shorteners or generic TLDs to conceal malicious destinations.`
      : linkMatches.length > 0
      ? `Link detected (${linkMatches[0]}), appears to align with standard or institutional domain syntax.`
      : 'No external URL or APK download link embedded in text.',
  };

  // 3. Credential Request Check
  const credentialKeywords = [
    'upi pin',
    'atm pin',
    'password',
    'otp',
    'cvv',
    'card number',
    '16-digit',
    'netbanking password',
    'secret code',
    'verification code',
    'enter pin',
  ];
  const detectedCredentials = credentialKeywords.filter(k => lower.includes(k));
  const credSignal: ScamSignal = {
    id: 'sig-credential',
    name: 'Credential / PIN Solicitation',
    detected: detectedCredentials.length > 0,
    severity: detectedCredentials.length > 0 ? 'high' : 'low',
    detail:
      detectedCredentials.length > 0
        ? `Explicit request for sensitive authentication secret (${detectedCredentials.map(c => `"${c}"`).join(', ')}). In legitimate banking, NO bank or authority ever asks for your PIN or OTP to receive money.`
        : 'No direct request for OTPs, UPI PINs, or banking passwords detected.',
  };

  // 4. Unusual Reward / Advance Fee
  const rewardKeywords = [
    'congratulations',
    'selected for',
    'scholarship',
    'won',
    'free laptop',
    'earn ₹',
    'daily typing',
    'earn 2,500',
    'double',
    '10x',
    'deposit ₹',
    'security deposit',
    'registration fee',
    'courier fee',
  ];
  const detectedRewards = rewardKeywords.filter(k => lower.includes(k));
  const rewardSignal: ScamSignal = {
    id: 'sig-reward',
    name: 'Unusual Reward & Advance-Fee Pattern',
    detected: detectedRewards.length > 0,
    severity: detectedRewards.length > 1 ? 'high' : detectedRewards.length === 1 ? 'medium' : 'low',
    detail:
      detectedRewards.length > 0
        ? `Promises disproportionate rewards (${detectedRewards.slice(0, 2).map(r => `"${r}"`).join(', ')}) or demands an upfront fee to release a prize or job.`
        : 'No unsolicited prize claims or unearned reward promises identified.',
  };

  // 5. Impersonation Language
  const impersonationKeywords = [
    'amazon',
    'state bank',
    'sbi',
    'ministry of',
    'controller of exam',
    'official notice',
    'affiliate partner',
    'hostel manager',
    'registrar',
    'kyc department',
    'customer care',
  ];
  const detectedImpersonation = impersonationKeywords.filter(k => lower.includes(k));
  const impersonationSignal: ScamSignal = {
    id: 'sig-impersonation',
    name: 'Institutional Impersonation Tone',
    detected: detectedImpersonation.length > 0,
    severity: detectedImpersonation.length > 0 ? 'medium' : 'low',
    detail:
      detectedImpersonation.length > 0
        ? `Borrows authority of reputable entities (${detectedImpersonation.slice(0, 2).map(i => `"${i}"`).join(', ')}) without verified sender credentials.`
        : 'Neutral conversational or internal context without overt institutional brand borrowing.',
  };

  const signals = [urgencySignal, linkSignal, credSignal, rewardSignal, impersonationSignal];
  const highCount = signals.filter(s => s.detected && s.severity === 'high').length;
  const medCount = signals.filter(s => s.detected && s.severity === 'medium').length;

  let overallRisk: ScamAnalysisReport['overallRisk'] = 'LOW RISK';
  let riskScore = 15;

  if (highCount >= 2 || (highCount >= 1 && medCount >= 1)) {
    overallRisk = 'HIGH RISK';
    riskScore = Math.min(98, 75 + highCount * 10 + medCount * 5);
  } else if (highCount === 1 || medCount >= 2) {
    overallRisk = 'ELEVATED RISK';
    riskScore = Math.min(74, 45 + medCount * 10);
  } else if (medCount === 1 || signals.some(s => s.detected)) {
    overallRisk = 'ELEVATED RISK';
    riskScore = 38;
  } else {
    overallRisk = 'LOW RISK';
    riskScore = 12;
  }

  // Verdict Summary
  let verdictSummary = '';
  let educationalTakeaway = '';

  if (overallRisk === 'HIGH RISK') {
    verdictSummary =
      'High likelihood of financial deception. The pattern leverages manufactured urgency combined with payment credential solicitation or unverified advance fees.';
    educationalTakeaway =
      'CRITICAL RULE: The UPI PIN is solely used for deducting funds from your account. If any message promises you money but asks for a PIN, QR scan, or OTP, it is 100% fraudulent. Terminate interaction immediately.';
  } else if (overallRisk === 'ELEVATED RISK') {
    verdictSummary =
      'Suspicious characteristics identified. Moderate psychological pressure, vague affiliation, or external links detected. Exercise strong caution.';
    educationalTakeaway =
      'Always verify administrative notices via the official university portal or by visiting the campus administrative counter in person. Never make payments on third-party links.';
  } else {
    verdictSummary =
      'Low educational risk signature. The text does not exhibit high-pressure tactics, credential extortion, or advance-fee requirements.';
    educationalTakeaway =
      'Even with standard messages, maintain healthy hygiene: never share passwords or OTPs over text, and keep multi-factor authentication active on your campus and banking accounts.';
  }

  return {
    overallRisk,
    riskScore,
    signals,
    verdictSummary,
    educationalTakeaway,
  };
}

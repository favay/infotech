import validator from 'validator';
import { ScamResult } from '../types';

const scamKeywords = ['urgent', 'click now', 'verify account', 'password reset', 'wire transfer', 'gift card'];
const suspiciousShorteners = ['bit.ly', 'tinyurl.com', 'shorturl.at', 'rb.gy'];

export function analyzeScamRisk(content: string): ScamResult {
  const normalized = content.toLowerCase();
  const indicators: string[] = [];
  let score = 0;

  for (const keyword of scamKeywords) {
    if (normalized.includes(keyword)) {
      score += 2;
      indicators.push(`Contains suspicious keyword: \"${keyword}\"`);
    }
  }

  const tokens = content.split(/\s+/);
  const urls = tokens.filter((token) => validator.isURL(token, { require_protocol: false }));

  for (const url of urls) {
    if (suspiciousShorteners.some((domain) => url.includes(domain))) {
      score += 3;
      indicators.push(`Uses URL shortener: ${url}`);
    } else if (!url.includes('.com') && !url.includes('.org') && !url.includes('.gov')) {
      score += 2;
      indicators.push(`Unknown or unusual domain detected: ${url}`);
    }
  }

  if (/\b(ssn|otp|bank pin|cvv)\b/i.test(content)) {
    score += 2;
    indicators.push('Requests sensitive personal data');
  }

  if (score >= 6) {
    return {
      riskLevel: 'Scam',
      explanation: 'Multiple high-risk patterns suggest this is likely a scam message.',
      indicators,
    };
  }

  if (score >= 3) {
    return {
      riskLevel: 'Warning',
      explanation: 'This message has warning signs. Verify sender identity before taking action.',
      indicators,
    };
  }

  return {
    riskLevel: 'Safe',
    explanation: 'No significant scam indicators detected.',
    indicators: indicators.length ? indicators : ['No known scam patterns found'],
  };
}

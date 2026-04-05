import validator from 'validator';

export function sanitizePlainText(input: string): string {
  return validator.escape(input).replace(/&quot;/g, '"').trim();
}

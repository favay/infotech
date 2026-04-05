import { recognize } from 'tesseract.js';
import { parseTransactionText } from '../utils/parser';

export async function extractTransactionFromImage(base64Image: string) {
  const imageBuffer = Buffer.from(base64Image, 'base64');
  const {
    data: { text },
  } = await recognize(imageBuffer, 'eng');

  const parsed = parseTransactionText(text);

  return {
    rawText: text,
    ...parsed,
  };
}

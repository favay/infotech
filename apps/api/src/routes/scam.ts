import { Router } from 'express';
import { analyzeScamRisk } from '../services/scamDetectionService';
import { sanitizePlainText } from '../utils/sanitize';

export const scamRouter = Router();

scamRouter.post('/check', async (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length < 5) {
    res.status(400).json({ message: 'content is required' });
    return;
  }

  const result = analyzeScamRisk(sanitizePlainText(content));
  res.json(result);
});

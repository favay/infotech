import { Router } from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const authRouter = Router();

authRouter.post('/demo-login', (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
    res.status(400).json({ message: 'Valid email is required' });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: 'JWT secret missing' });
    return;
  }

  const token = jwt.sign({ sub: process.env.DEFAULT_USER_ID || 'demo-user', email }, secret, {
    expiresIn: '12h',
  });

  res.json({ token });
});

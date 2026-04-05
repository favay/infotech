import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthPayload {
  sub: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!auth || !secret) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    req.headers['x-user-id'] = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

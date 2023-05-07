import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  authenticatedUser?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: 'AUTHENTICATION_TOKEN_MISSING' });
    return;
  }

  token = token.replace('Bearer', '').trim();

  try {
    const payload = verify(token, String(process.env.AUTH_SECRET_KEY)) as JwtPayload;
    req.authenticatedUser = payload;

    next();
  } catch (error) {
    res.status(401).json({ error: 'INVALID_AUTHENTICATION_TOKEN' });
  }
};

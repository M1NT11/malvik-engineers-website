import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { validateSession } from '../lib/auth-service.ts';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: string;
    name?: string;
  };
}

export const requireAdminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: Missing administrator credentials.',
      code: 'AUTH_REQUIRED'
    });
  }

  const token = authHeader.split('Bearer ')[1].trim();
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized: Empty authorization token.',
      code: 'AUTH_EMPTY_TOKEN'
    });
  }

  // 1. Verify against active server session token
  const session = validateSession(token);
  if (session) {
    req.user = {
      uid: session.adminEmail,
      email: session.adminEmail,
      role: session.role,
      name: session.adminName,
    };
    return next();
  }

  // 2. Verify against Firebase Admin ID Token
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || 'admin@malvikengineers.com',
      role: 'admin',
      name: decodedToken.name || 'Authorized Admin',
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or expired administrator credentials.',
      code: 'AUTH_INVALID_TOKEN'
    });
  }
};

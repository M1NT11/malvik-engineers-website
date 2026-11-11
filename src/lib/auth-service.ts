import crypto from 'node:crypto';

// In-memory secure session store with expiry
interface AdminSession {
  token: string;
  adminEmail: string;
  adminName: string;
  role: string;
  expiresAt: number;
}

const activeSessions = new Map<string, AdminSession>();

// Cleanup expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (session.expiresAt < now) {
      activeSessions.delete(token);
    }
  }
}, 10 * 60 * 1000);

// Generate scrypt hash
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, generatedSalt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt: generatedSalt,
  };
}

// Verify password using timingSafeEqual to prevent timing attacks
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(derivedKey.toString('hex'), 'hex');
    const hashBuffer = Buffer.from(storedHash, 'hex');
    if (keyBuffer.length !== hashBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(keyBuffer, hashBuffer);
  } catch {
    return false;
  }
}

// Generate cryptographically secure session token (256-bit random)
export function createAdminSession(adminEmail: string, adminName: string = 'Authorized Admin', role: string = 'admin'): string {
  const token = `mvk_sec_${crypto.randomBytes(32).toString('hex')}`;
  const ttlMs = 24 * 60 * 60 * 1000; // 24 hours
  activeSessions.set(token, {
    token,
    adminEmail,
    adminName,
    role,
    expiresAt: Date.now() + ttlMs,
  });
  return token;
}

// Validate session token
export function validateSession(token: string): AdminSession | null {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    activeSessions.delete(token);
    return null;
  }
  return session;
}

// Invalidate session
export function invalidateSession(token: string): boolean {
  return activeSessions.delete(token);
}

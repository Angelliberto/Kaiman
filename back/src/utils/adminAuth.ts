import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = Number(process.env.ADMIN_TOKEN_TTL_MS ?? 1000 * 60 * 60 * 12); // 12h

const getPassword = () => process.env.ADMIN_PASSWORD ?? '';
const getSecret = () => process.env.ADMIN_SECRET ?? '';

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isAdminConfigured(): boolean {
  return Boolean(getPassword() && getSecret());
}

export function assertAdminEnv(): void {
  if (process.env.NODE_ENV === 'production' && !isAdminConfigured()) {
    console.warn(
      '[Security] ADMIN_PASSWORD y ADMIN_SECRET deben estar definidos en producción'
    );
  }
}

function signPayload(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

/** Token con expiración: base64url(payload).signature */
export function createAdminToken(): string {
  if (!isAdminConfigured()) {
    throw new Error('Admin no configurado');
  }
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `kaiman:${exp}`;
  const signature = signPayload(payload);
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getPassword();
  if (!expected || !password || !getSecret()) return false;
  return safeCompare(password, expected);
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return false;

  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
  } catch {
    return false;
  }

  const expectedSig = signPayload(payload);
  if (!safeCompare(signature, expectedSig)) return false;

  const match = /^kaiman:(\d+)$/.exec(payload);
  if (!match) return false;

  const exp = Number(match[1]);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  return true;
}

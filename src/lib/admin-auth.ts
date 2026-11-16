import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'sakif_admin_session';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function signature(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('Admin session secret is not configured.');
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ sub: process.env.ADMIN_USERNAME, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })).toString('base64url');
  return { value: payload + '.' + signature(payload), maxAge: SESSION_SECONDS };
}

export function verifyAdminRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [payload, supplied] = token.split('.');
  if (!payload || !supplied) return false;
  const expected = signature(payload);
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.sub === process.env.ADMIN_USERNAME && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

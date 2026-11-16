import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { createAdminSession, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

export const runtime = 'nodejs';

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const expectedUser = process.env.ADMIN_USERNAME || '';
    const expectedPassword = process.env.ADMIN_PASSWORD || '';
    if (!expectedUser || !expectedPassword || !process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
    }
    if (typeof username !== 'string' || typeof password !== 'string' ||
        !safeEqual(username, expectedUser) || !safeEqual(password, expectedPassword)) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }
    const session = createAdminSession();
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, session.value, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', path: '/', maxAge: session.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

export async function POST() {
  const response = NextResponse.redirect(new URL('/panel/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://sakif.pro.bd'));
  response.cookies.set(ADMIN_COOKIE_NAME, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}

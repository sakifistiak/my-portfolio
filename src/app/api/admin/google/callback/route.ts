import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://sakif.pro.bd').replace(/\/$/, '');
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'Google connection failed. Check Render logs for the underlying error.';
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const saved = request.cookies.get('google_oauth_state')?.value;
  const oauthError = request.nextUrl.searchParams.get('error');
  const destination = (message: string) =>
    NextResponse.redirect(new URL('/panel/settings?google_error=' + encodeURIComponent(message), siteUrl()));

  if (oauthError) return destination(oauthError);
  if (!code || !state || !saved || state !== saved) {
    console.error('Google OAuth callback state validation failed.');
    return destination('OAuth state validation failed. Start the connection again from the admin panel.');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://sakif.pro.bd/api/admin/google/callback';

  if (!clientId || !clientSecret) {
    console.error('Google OAuth environment variables are missing.');
    return destination('Google OAuth Client ID or Client Secret is missing in Render environment variables.');
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      cache: 'no-store',
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.refresh_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Google did not return a refresh token. Reconnect and grant offline access.');
    }

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: 'Bearer ' + tokenData.access_token },
      cache: 'no-store',
    });
    const profile = await profileResponse.json();
    if (!profileResponse.ok) throw new Error(profile.error?.message || 'Could not read Google account profile.');

    const calendarResponse = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList/primary', {
      headers: { Authorization: 'Bearer ' + tokenData.access_token },
      cache: 'no-store',
    });
    const calendar = await calendarResponse.json();
    if (!calendarResponse.ok) throw new Error(calendar.error?.message || 'Could not access the primary calendar.');

    const { error: saveError } = await getSupabaseAdmin().from('app_settings').upsert({
      key: 'google_calendar',
      value: {
        refresh_token: tokenData.refresh_token,
        calendar_id: 'primary',
        email: profile.email || null,
        calendar_name: calendar.summary || 'Primary Calendar',
        connected_at: new Date().toISOString(),
      },
    });
    if (saveError) throw saveError;

    const response = NextResponse.redirect(new URL('/panel/settings?google=connected', siteUrl()));
    response.cookies.delete('google_oauth_state');
    return response;
  } catch (error) {
    console.error('Google Calendar OAuth callback failed:', error);
    return destination(errorMessage(error));
  }
}

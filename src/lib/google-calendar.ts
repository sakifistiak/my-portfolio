const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_API = 'https://www.googleapis.com/calendar/v3';

export const TIME_ZONE = 'Asia/Dhaka';

export const MEETING_TYPES = {
  general: { label: 'General Discussion', duration: 15 },
  project: { label: 'Project Discussion', duration: 30 },
  consultation: { label: 'Business / SaaS Consultation', duration: 30 },
  technical: { label: 'Technical Discussion', duration: 45 },
  collaboration: { label: 'Collaboration / Partnership', duration: 30 },
} as const;

export type MeetingType = keyof typeof MEETING_TYPES;

export function getCalendarConfig() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_CALENDAR_ID } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GOOGLE_CALENDAR_ID) {
    throw new Error('Google Calendar is not configured. Add the required Google OAuth environment variables.');
  }
  return { clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, refreshToken: GOOGLE_REFRESH_TOKEN, calendarId: GOOGLE_CALENDAR_ID };
}

export async function getGoogleAccessToken() {
  const config = getCalendarConfig();
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(data.error_description || 'Unable to authenticate with Google Calendar.');
  return data.access_token as string;
}

export async function calendarRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getCalendarConfig();
  const token = await getGoogleAccessToken();
  const response = await fetch(`${GOOGLE_API}/calendars/${encodeURIComponent(config.calendarId)}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Google Calendar request failed.');
  return data as T;
}

export function isMeetingType(value: unknown): value is MeetingType {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(MEETING_TYPES, value);
}

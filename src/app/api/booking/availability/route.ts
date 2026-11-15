import { NextRequest, NextResponse } from 'next/server';
import { getCalendarConfig, getGoogleAccessToken, MEETING_TYPES, TIME_ZONE, isMeetingType } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

type BusyPeriod = { start: string; end: string };

function dateAtDhaka(date: string, hour: number, minute = 0) {
  return new Date(`${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+06:00`);
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date') || '';
    const type = request.nextUrl.searchParams.get('type') || 'project';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isMeetingType(type)) {
      return NextResponse.json({ error: 'Choose a valid date and meeting type.' }, { status: 400 });
    }

    const start = dateAtDhaka(date, 10);
    const end = dateAtDhaka(date, 20);
    if (start.getTime() < Date.now() - 60_000) return NextResponse.json({ slots: [] });

    const config = getCalendarConfig();
    const token = await getGoogleAccessToken();
    const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ timeMin: start.toISOString(), timeMax: end.toISOString(), timeZone: TIME_ZONE, items: [{ id: config.calendarId }] }),
      cache: 'no-store',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Could not check calendar availability.');
    const busy: BusyPeriod[] = data.calendars?.[config.calendarId]?.busy || [];

    const duration = MEETING_TYPES[type].duration;
    const slots: string[] = [];
    for (let minutes = 10 * 60; minutes + duration <= 20 * 60; minutes += 30) {
      const slotStart = dateAtDhaka(date, Math.floor(minutes / 60), minutes % 60);
      const slotEnd = new Date(slotStart.getTime() + duration * 60_000);
      if (slotStart.getTime() <= Date.now() + 5 * 60_000) continue;
      const overlaps = busy.some((period) => slotStart < new Date(period.end) && slotEnd > new Date(period.start));
      if (!overlaps) slots.push(slotStart.toISOString());
    }
    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Booking availability error:', error);
    return NextResponse.json({ error: 'Unable to load available times right now.' }, { status: 503 });
  }
}

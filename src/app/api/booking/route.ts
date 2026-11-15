import { NextRequest, NextResponse } from 'next/server';
import { calendarRequest, MEETING_TYPES, TIME_ZONE, isMeetingType } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const company = String(body.company || '').trim();
    const topic = String(body.topic || '').trim();
    const meetingType = body.meetingType;
    const start = new Date(body.start || '');
    const duration = isMeetingType(meetingType) ? MEETING_TYPES[meetingType].duration : 0;

    if (!name || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || !topic || topic.length > 2000 || !duration || Number.isNaN(start.getTime())) {
      return NextResponse.json({ error: 'Please complete all required fields with valid information.' }, { status: 400 });
    }
    if (start.getTime() < Date.now() + 5 * 60_000) return NextResponse.json({ error: 'Please choose a future time slot.' }, { status: 400 });

    const end = new Date(start.getTime() + duration * 60_000);
    const startHour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, hour: '2-digit', hourCycle: 'h23' }).format(start));
    const endHour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, hour: '2-digit', hourCycle: 'h23' }).format(end));
    if (startHour < 10 || endHour > 20) return NextResponse.json({ error: 'That time is outside the booking hours.' }, { status: 400 });

    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
    const fromEmail = process.env.BOOKING_FROM_EMAIL || 'Sakif Istiak <onboarding@resend.dev>';
    if (!resendKey || !notifyEmail) {
      return NextResponse.json({ error: 'Email notifications are not configured yet. Please try again later.' }, { status: 503 });
    }

    const freeBusyResponse = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: { Authorization: `Bearer ${await (await import('@/lib/google-calendar')).getGoogleAccessToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ timeMin: start.toISOString(), timeMax: end.toISOString(), timeZone: TIME_ZONE, items: [{ id: process.env.GOOGLE_CALENDAR_ID }] }),
      cache: 'no-store',
    });
    const freeBusy = await freeBusyResponse.json();
    if (!freeBusyResponse.ok) throw new Error(freeBusy.error?.message || 'Could not verify this time slot.');
    const calendarId = process.env.GOOGLE_CALENDAR_ID || '';
    const busy = freeBusy.calendars?.[calendarId]?.busy || [];
    if (busy.some((period: { start: string; end: string }) => start < new Date(period.end) && end > new Date(period.start))) {
      return NextResponse.json({ error: 'Sorry, this time was just booked. Please choose another slot.' }, { status: 409 });
    }

    const meetingLabel = MEETING_TYPES[meetingType as keyof typeof MEETING_TYPES].label;
    const event = await calendarRequest<{ id: string; htmlLink?: string }>('/events?sendUpdates=all', {
      method: 'POST',
      body: JSON.stringify({
        summary: `${meetingLabel} — ${name}`,
        description: `Meeting with ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nDiscussion:\n${topic}\n\nBooked via sakif.pro.bd/book-meeting`,
        start: { dateTime: start.toISOString(), timeZone: TIME_ZONE },
        end: { dateTime: end.toISOString(), timeZone: TIME_ZONE },
        attendees: [{ email }],
        guestsCanModify: false,
        guestsCanInviteOthers: false,
      }),
    });

    const dateText = new Intl.DateTimeFormat('en-BD', { dateStyle: 'full', timeZone: TIME_ZONE }).format(start);
    const timeText = new Intl.DateTimeFormat('en-BD', { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE }).format(start);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeTopic = escapeHtml(topic).replace(/\n/g, '<br>');
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717"><h2>New meeting booking</h2><p><b>Name:</b> ${safeName}<br><b>Email:</b> ${safeEmail}<br><b>Company:</b> ${safeCompany}<br><b>Meeting:</b> ${meetingLabel}<br><b>Date:</b> ${dateText}<br><b>Time:</b> ${timeText} (Asia/Dhaka)<br><b>Duration:</b> ${duration} minutes</p><h3>Discussion topic</h3><p>${safeTopic}</p><p><a href="${event.htmlLink || 'https://calendar.google.com/calendar/u/0/r'}">Open Google Calendar event</a></p></div>`;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail, email],
        reply_to: email,
        subject: `Meeting booked: ${meetingLabel} — ${name}`,
        html,
      }),
      cache: 'no-store',
    });
    if (!emailResponse.ok) {
      console.error('Resend notification failed:', await emailResponse.text());
      return NextResponse.json({ error: 'Your calendar booking was created, but email notification failed. Please contact me directly.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, eventUrl: event.htmlLink || null });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'We could not complete your booking. Please try again.' }, { status: 503 });
  }
}

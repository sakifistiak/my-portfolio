import { NextRequest, NextResponse } from 'next/server';
import { calendarRequest, getGoogleAccessToken, MEETING_TYPES, TIME_ZONE, isMeetingType } from '@/lib/google-calendar';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendBookingEmail, getBookingMailSettings } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const whatsapp = String(body.whatsapp || '').trim();
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
    const startMinute = Number(new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, minute: '2-digit' }).format(start));
    const preferredSlot = ([10, 11, 14, 15].includes(startHour) && startMinute === 0) || (startHour >= 16 && startHour < 20 && (startMinute === 0 || startMinute === 30));
    if (startHour < 10 || endHour > 20 || !preferredSlot) return NextResponse.json({ error: 'Please choose one of the available booking times.' }, { status: 400 });

    const mailSettings = await getBookingMailSettings();
    if (!mailSettings?.password_enc) return NextResponse.json({ error: 'Booking email is not configured yet.' }, { status: 503 });
    const notifyEmail = mailSettings.notification_email as string;

    const freeBusyResponse = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: { Authorization: `Bearer ${await getGoogleAccessToken()}`, 'Content-Type': 'application/json' },
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
    const supabase = getSupabaseAdmin();
    const { data: booking, error: insertError } = await supabase.from('bookings').insert({
      full_name: name,
      email,
      whatsapp_number: whatsapp,
      company: company || null,
      meeting_type: meetingType,
      meeting_label: meetingLabel,
      topic,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      timezone: TIME_ZONE,
      status: 'pending',
    }).select('id').single();

    if (insertError || !booking) {
      if (insertError?.code === '23P01' || insertError?.code === '23505') {
        return NextResponse.json({ error: 'Sorry, this time was just booked. Please choose another slot.' }, { status: 409 });
      }
      console.error('Booking database insert failed:', insertError);
      return NextResponse.json({ error: 'Could not save your booking. Please try again later.' }, { status: 503 });
    }

    let event: { id: string; htmlLink?: string; hangoutLink?: string };
    try {
      event = await calendarRequest<{ id: string; htmlLink?: string; hangoutLink?: string }>('/events?sendUpdates=all&conferenceDataVersion=1', {
      method: 'POST',
      body: JSON.stringify({
        summary: `${meetingLabel} — ${name}`,
        description: `Meeting with ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nCompany: ${company || 'Not provided'}\n\nDiscussion:\n${topic}\n\nBooked via sakif.pro.bd/book-meeting`,
        start: { dateTime: start.toISOString(), timeZone: TIME_ZONE },
        end: { dateTime: end.toISOString(), timeZone: TIME_ZONE },
        attendees: [{ email }],
        guestsCanModify: false,
        guestsCanInviteOthers: false,
        conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      }),
      });
      await supabase.from('bookings').update({
        status: 'confirmed',
        google_event_id: event.id,
        google_event_url: event.htmlLink || null,
        google_meet_url: event.hangoutLink || null,
      }).eq('id', booking.id);
    } catch (calendarError) {
      await supabase.from('bookings').update({ status: 'calendar_failed' }).eq('id', booking.id);
      throw calendarError;
    }

    const dateText = new Intl.DateTimeFormat('en-BD', { dateStyle: 'full', timeZone: TIME_ZONE }).format(start);
    const timeText = new Intl.DateTimeFormat('en-BD', { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE }).format(start);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeTopic = escapeHtml(topic).replace(/\n/g, '<br>');
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717"><h2>New meeting booking</h2><p><b>Name:</b> ${safeName}<br><b>Email:</b> ${safeEmail}<br><b>WhatsApp:</b> ${escapeHtml(whatsapp)}<br><b>Company:</b> ${safeCompany}<br><b>Meeting:</b> ${meetingLabel}<br><b>Date:</b> ${dateText}<br><b>Time:</b> ${timeText} (Asia/Dhaka)<br><b>Duration:</b> ${duration} minutes</p><h3>Discussion topic</h3><p>${safeTopic}</p><p>${event.hangoutLink ? `<b>Google Meet:</b> <a href="${event.hangoutLink}">${event.hangoutLink}</a><br>` : ''}<a href="${event.htmlLink || 'https://calendar.google.com/calendar/u/0/r'}">Open Google Calendar event</a></p></div>`;

    try {
      await sendBookingEmail(notifyEmail, `New meeting: ${meetingLabel} — ${name}`, html, email);
      const confirmationHtml = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717"><h2>Your meeting is confirmed</h2><p>Hi ${safeName},</p><p>Your ${meetingLabel} with Sakif Istiak is booked for <b>${dateText}</b> at <b>${timeText} (Asia/Dhaka)</b>. Duration: ${duration} minutes.</p><p>${event.hangoutLink ? `Google Meet: <a href="${event.hangoutLink}">${event.hangoutLink}</a>` : 'A calendar invitation has been sent to your email.'}</p><p>Need to change plans? Reply to this email.</p></div>`;
      await sendBookingEmail(email, `Confirmed: ${meetingLabel} with Sakif Istiak`, confirmationHtml, notifyEmail);
    } catch (mailError) {
      console.error('Booking email delivery failed:', mailError);
      await supabase.from('bookings').update({ notification_status: 'failed' }).eq('id', booking.id);
      return NextResponse.json({ error: 'Your calendar booking was created, but the email could not be sent. Please contact Sakif.' }, { status: 502 });
    }

    await supabase.from('bookings').update({ notification_status: 'sent' }).eq('id', booking.id);
    return NextResponse.json({ success: true, bookingId: booking.id, eventUrl: event.htmlLink || null, meetUrl: event.hangoutLink || null });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'We could not complete your booking. Please try again.' }, { status: 503 });
  }
}

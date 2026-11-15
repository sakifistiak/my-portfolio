# Meeting Booking Setup

The portfolio meeting scheduler uses Google Calendar as the source of availability and event storage, and Resend for owner/guest email notifications.

## Required environment variables

Set these in the production hosting service (never commit real secrets):

- `GOOGLE_CLIENT_ID`: Google OAuth 2.0 client ID.
- `GOOGLE_CLIENT_SECRET`: Google OAuth 2.0 client secret.
- `GOOGLE_REFRESH_TOKEN`: Offline refresh token for the Google account that owns the calendar.
- `GOOGLE_CALENDAR_ID`: Calendar ID to check and create events in (often `primary`).
- `RESEND_API_KEY`: Resend API key.
- `BOOKING_NOTIFICATION_EMAIL`: Email address that receives new booking notifications.
- `BOOKING_FROM_EMAIL`: Optional verified sender, e.g. `Sakif Istiak <meetings@yourdomain.com>`. If omitted, the Resend onboarding sender is used (test-only).

## Google Calendar configuration

1. In Google Cloud Console, create/select a project and enable the Google Calendar API.
2. Configure the OAuth consent screen.
3. Create an OAuth Client ID (Web application).
4. Generate an offline refresh token for the Google account whose calendar should receive bookings. Grant Calendar event access; keep the refresh token private.
5. Set `GOOGLE_CALENDAR_ID` to `primary` or the intended calendar's ID.

The server refreshes the access token when needed. OAuth credentials are only read by server routes.

## Resend configuration

1. Create a Resend account and API key.
2. Verify the sending domain before using a custom `BOOKING_FROM_EMAIL`.
3. Set `BOOKING_NOTIFICATION_EMAIL` to the mailbox that should receive booking details.

## Current booking rules

- Time zone: Asia/Dhaka (UTC+6).
- Booking hours: 10:00 AM–8:00 PM, every day.
- Booking horizon in the UI: 45 days.
- Slots begin every 30 minutes.
- Meeting durations: 15, 30, or 45 minutes depending on type.
- Google Calendar busy periods are checked before showing slots and checked again before creating an event.
- Google Calendar creates an invitation and a Google Meet conference link.
- Resend sends separate emails to the owner and the person booking.

Before announcing the booking page publicly, configure all environment variables and test a booking end-to-end. Google Calendar free/busy checking requires the OAuth account to have access to the selected calendar.

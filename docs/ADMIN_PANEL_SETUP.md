# Admin panel setup

## URLs
- Admin login: https://sakif.pro.bd/panel/login
- Dashboard: https://sakif.pro.bd/panel
- Bookings: https://sakif.pro.bd/panel/bookings
- Settings: https://sakif.pro.bd/panel/settings

## Required Supabase migration
Run `supabase/migrations/20261116010000_create_app_settings.sql` in Supabase SQL Editor. This creates the private `app_settings` table used to store Google OAuth refresh tokens and SMTP configuration. RLS is enabled and there are no public policies.

## Google OAuth
In Google Cloud OAuth client, add this exact Authorized redirect URI:
`https://sakif.pro.bd/api/admin/google/callback`

Add the Google account you will connect under OAuth Audience > Test users while the app is in Testing. Then log in to the panel and select Connect Google Calendar.

## Postfix SMTP
In Panel > Settings, enter your mailbox's SMTP host, port, username and mailbox password. Typical configurations are STARTTLS on port 587 (Secure unchecked) or implicit TLS on port 465 (Secure checked). Use the mailbox password, not VPS/root credentials. Set sender email to a mailbox hosted on the configured server and notification email to the inbox where you want booking alerts. Save, then send a test email.

SMTP outbound connectivity from the Render service must be allowed by its hosting plan and by the VPS firewall. If SMTP connection times out, check firewall rules and provider outbound SMTP restrictions; do not expose the SMTP password in client code.

## Notes
- Google Calendar invitations are created by Google Calendar and emailed to attendees.
- The app also sends owner and guest notification emails through the configured Postfix SMTP server.
- Admin settings are server-side only; SMTP password is encrypted before being stored in Supabase using ADMIN_SESSION_SECRET.

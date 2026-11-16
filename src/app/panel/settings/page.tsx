'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type GoogleSettings = {
  connected: boolean;
  email?: string | null;
  calendarName?: string | null;
};
type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from_email: string;
  from_name: string;
  notification_email: string;
  configured?: boolean;
};
type ApiMessage = { error?: string };

const initialSmtp: SmtpSettings = {
  host: '', port: 587, secure: false, user: '', password: '',
  from_email: '', from_name: 'Sakif Istiak', notification_email: '',
};

export default function Settings() {
  const [google, setGoogle] = useState<GoogleSettings>({ connected: false });
  const [smtp, setSmtp] = useState<SmtpSettings>(initialSmtp);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/settings/google').then(r => r.json() as Promise<GoogleSettings>),
      fetch('/api/admin/settings/smtp').then(r => r.json() as Promise<Partial<SmtpSettings>>),
    ]).then(([g, s]) => {
      setGoogle(g);
      setSmtp(previous => ({ ...previous, ...s, password: '' }));
    }).catch(() => setMsg('Could not load integration settings.'));
  }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      const response = await fetch('/api/admin/settings/smtp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtp),
      });
      const data = await response.json() as ApiMessage;
      if (!response.ok) throw new Error(data.error || 'Save failed.');
      setMsg('SMTP settings saved securely.');
      setSmtp(previous => ({ ...previous, password: '' }));
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Save failed.');
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    const response = await fetch('/api/admin/google/disconnect', { method: 'POST' });
    if (response.ok) setGoogle({ connected: false });
  }

  async function testSmtp() {
    setBusy(true);
    setMsg('Sending test email…');
    try {
      const response = await fetch('/api/admin/settings/smtp/test', { method: 'POST' });
      const data = await response.json() as ApiMessage;
      if (!response.ok) throw new Error(data.error || 'SMTP test failed.');
      setMsg('Test email sent successfully. Check your inbox.');
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'SMTP test failed.');
    } finally {
      setBusy(false);
    }
  }

  const fields: { label: string; key: keyof SmtpSettings; placeholder: string; type?: string }[] = [
    { label: 'SMTP Host', key: 'host', placeholder: 'mail.sakif.pro.bd' },
    { label: 'SMTP Port', key: 'port', placeholder: '587', type: 'number' },
    { label: 'Username', key: 'user', placeholder: 'meetings@sakif.pro.bd' },
    { label: 'SMTP Password', key: 'password', placeholder: 'Mailbox password', type: 'password' },
    { label: 'Sender Email', key: 'from_email', placeholder: 'meetings@sakif.pro.bd' },
    { label: 'Notification Email', key: 'notification_email', placeholder: 'your inbox' },
  ];

  return (
    <main className="min-h-screen bg-[#080d17] px-5 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/panel" className="text-sm text-emerald-400">← Dashboard</Link>
        <h1 className="mt-5 text-3xl font-semibold">Integrations &amp; email</h1>
        <p className="mt-2 text-sm text-slate-400">Connect your calendar and your own Postfix mail server.</p>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#111b2b] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Google Calendar</h2>
              <p className="mt-1 text-sm text-slate-400">
                {google.connected ? 'Connected: ' + (google.email || 'Google account') : 'Connect the Google account that owns your meeting calendar.'}
              </p>
            </div>
            <span className={google.connected ? 'text-emerald-400' : 'text-amber-400'}>
              {google.connected ? '● Connected' : '● Not connected'}
            </span>
          </div>
          {google.connected ? (
            <button onClick={disconnect} className="mt-5 rounded-xl border border-white/15 px-4 py-2 text-sm">Disconnect Google</button>
          ) : (
            <a href="/api/admin/google/connect" className="mt-5 inline-block rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950">Connect Google Calendar</a>
          )}
          <p className="mt-4 text-xs text-slate-500">Google OAuth redirect URI: https://sakif.pro.bd/api/admin/google/callback</p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-[#111b2b] p-6">
          <h2 className="text-xl font-semibold">Postfix SMTP</h2>
          <p className="mt-1 text-sm text-slate-400">Use the SMTP credentials for a mailbox on your VPS, e.g. meetings@sakif.pro.bd.</p>
          <form onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map(field => (
              <label key={field.key} className="text-sm text-slate-300">
                {field.label}
                <input
                  required
                  type={field.type || 'text'}
                  value={String(smtp[field.key] ?? '')}
                  onChange={event => setSmtp(previous => ({
                    ...previous,
                    [field.key]: field.key === 'port' ? Number(event.target.value) : event.target.value,
                  }))}
                  placeholder={field.placeholder}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d17] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
                />
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
              <input type="checkbox" checked={smtp.secure} onChange={event => setSmtp(previous => ({ ...previous, secure: event.target.checked }))} />
              Use implicit TLS (usually port 465; leave off for STARTTLS on 587)
            </label>
            <label className="text-sm text-slate-300 sm:col-span-2">
              Sender name
              <input value={smtp.from_name} onChange={event => setSmtp(previous => ({ ...previous, from_name: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d17] px-4 py-3 text-sm" />
            </label>
            <button disabled={busy} className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60 sm:col-span-2">
              {busy ? 'Saving…' : 'Save SMTP settings'}
            </button>
          </form>
          {msg && <p className="mt-4 text-sm text-emerald-300">{msg}</p>}
          <button type="button" onClick={testSmtp} disabled={busy} className="mt-4 rounded-xl border border-emerald-400/40 px-4 py-2 text-sm text-emerald-300 disabled:opacity-50">Send test email</button>
          <p className="mt-4 text-xs text-slate-500">SMTP password is encrypted before being stored. Never use your VPS root password here; use the mailbox SMTP password.</p>
        </section>
      </div>
    </main>
  );
}

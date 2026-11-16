import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';

function authenticated(token?: string) {
  if (!token) return false;
  const [payload, supplied] = token.split('.'); const secret = process.env.ADMIN_SESSION_SECRET;
  if (!payload || !supplied || !secret) return false;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  const a = Buffer.from(supplied); const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { const d = JSON.parse(Buffer.from(payload, 'base64url').toString()); return d.sub === process.env.ADMIN_USERNAME && d.exp > Date.now()/1000; } catch { return false; }
}
export const dynamic = 'force-dynamic';
export default async function IntegrationsPage() {
  const store = await cookies();
  if (!authenticated(store.get('sakif_admin_session')?.value)) redirect('/admin/login');
  return <main className="min-h-screen bg-neutral-950 px-5 py-12 text-white"><div className="mx-auto max-w-3xl"><a href="/admin" className="text-sm text-emerald-400">← Dashboard</a><h1 className="mt-4 text-3xl font-semibold">Integrations</h1><section className="mt-8 rounded-xl border border-white/10 bg-neutral-900 p-6"><h2 className="text-xl font-semibold">Google Calendar</h2><p className="mt-2 text-sm text-neutral-400">OAuth client credentials are configured on the server. The secure Google account connection and callback flow still need to be implemented.</p><span className="mt-4 inline-block rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300">Connection not completed</span></section></div></main>;
}

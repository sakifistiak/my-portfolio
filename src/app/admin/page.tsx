import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';
import Link from 'next/link';

function isAuthenticated(token?: string) {
  if (!token) return false;
  const [payload, supplied] = token.split('.');
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!payload || !supplied || !secret) return false;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  const a = Buffer.from(supplied); const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.sub === process.env.ADMIN_USERNAME && data.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore.get('sakif_admin_session')?.value)) redirect('/admin/login');
  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm text-emerald-400">SAKIF.PRO.BD / ADMIN</p><h1 className="mt-2 text-3xl font-semibold">Dashboard</h1><p className="mt-2 text-neutral-400">Manage your meeting bookings and integrations.</p></div>
          <form action="/api/admin/logout" method="post"><button className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5">Sign out</button></form>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-xl border border-white/10 bg-neutral-900 p-6"><h2 className="text-lg font-semibold">Meeting Bookings</h2><p className="mt-2 text-sm text-neutral-400">Booking management is the next module to connect to the database.</p></section>
          <section className="rounded-xl border border-white/10 bg-neutral-900 p-6"><h2 className="text-lg font-semibold">Integrations</h2><p className="mt-2 text-sm text-neutral-400">Google Calendar OAuth connection setup is pending.</p><Link href="/admin/settings/integrations" className="mt-4 inline-block text-sm text-emerald-400">Integration settings →</Link></section>
        </div>
      </div>
    </main>
  );
}

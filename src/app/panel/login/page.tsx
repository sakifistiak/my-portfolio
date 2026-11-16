'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      router.replace('/panel');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-5 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-8 shadow-2xl">
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400"><LockKeyhole /></div>
        <p className="text-sm font-medium text-emerald-400">SAKIF.PRO.BD</p>
        <h1 className="mt-2 text-2xl font-semibold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-neutral-400">Sign in to manage your portfolio bookings and integrations.</p>
        <label className="mt-7 block text-sm text-neutral-300">Username</label>
        <input autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required className="mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-emerald-400" />
        <label className="mt-5 block text-sm text-neutral-300">Password</label>
        <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-emerald-400" />
        {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-3 font-semibold text-neutral-950 disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign In
        </button>
      </form>
    </main>
  );
}

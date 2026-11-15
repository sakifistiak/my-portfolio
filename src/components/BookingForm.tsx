'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock3, Video, ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';

const meetingTypes = [
  { id: 'general', label: 'General Discussion', duration: 15, description: 'A quick introduction or general conversation.' },
  { id: 'project', label: 'Project Discussion', duration: 30, description: 'Discuss your website, application, or product idea.' },
  { id: 'consultation', label: 'Business / SaaS Consultation', duration: 30, description: 'Explore a business idea, SaaS product, or digital strategy.' },
  { id: 'technical', label: 'Technical Discussion', duration: 45, description: 'Deep-dive into architecture, development, or technical challenges.' },
  { id: 'collaboration', label: 'Collaboration / Partnership', duration: 30, description: 'Talk about working together or a partnership opportunity.' },
];

function localDateString(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}
function displayTime(value: string) {
  return new Intl.DateTimeFormat('en-BD', { timeZone: 'Asia/Dhaka', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}
function displayDate(value: string) {
  return new Intl.DateTimeFormat('en-BD', { timeZone: 'Asia/Dhaka', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value + 'T12:00:00+06:00'));
}

export function BookingForm() {
  const [meetingType, setMeetingType] = useState('project');
  const [date, setDate] = useState(localDateString(new Date()));
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', topic: '' });

  const selectedMeeting = useMemo(() => meetingTypes.find((item) => item.id === meetingType)!, [meetingType]);
  const minDate = localDateString(new Date());
  const maxDate = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 45); return localDateString(d); }, []);

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    setSelectedSlot('');
    setError('');
    fetch(`/api/booking/availability?date=${date}&type=${meetingType}`, { cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load available times.');
        if (active) setSlots(data.slots || []);
      })
      .catch((err) => { if (active) { setSlots([]); setError(err.message); } })
      .finally(() => { if (active) setLoadingSlots(false); });
    return () => { active = false; };
  }, [date, meetingType]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) { setError('Please select an available time.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, meetingType, start: selectedSlot }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Booking failed. Please try again.');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center sm:p-12">
      <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight">Meeting booked!</h1>
      <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">Your booking has been added to the calendar. A confirmation email and calendar invitation should arrive shortly.</p>
      <a href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">Back to portfolio <ArrowRight className="h-4 w-4" /></a>
    </section>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-500">Let&apos;s talk</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Book a meeting</h1>
        <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400">Choose a topic, pick a convenient time, and tell me a little about what you&apos;d like to discuss.</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 dark:border-neutral-800"><Video className="h-3.5 w-3.5" /> Online meeting · Bangladesh Standard Time (UTC+6)</div>
      </div>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-emerald-500" /> 01. Meeting details</div>
          <div className="mt-5 space-y-3">
            {meetingTypes.map((item) => (
              <button key={item.id} type="button" onClick={() => setMeetingType(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${meetingType === item.id ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/30' : 'border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600'}`}>
                <span className="flex items-center justify-between gap-3 text-sm font-medium">{item.label}<span className="shrink-0 text-xs text-neutral-500">{item.duration} min</span></span>
                <span className="mt-1 block text-xs leading-5 text-neutral-500">{item.description}</span>
              </button>
            ))}
          </div>
          <label className="mt-6 block text-sm font-medium">Select a date</label>
          <input type="date" min={minDate} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-800" />
          <div className="mt-6 flex items-center justify-between"><span className="text-sm font-medium">Available times</span><span className="text-xs text-neutral-500">10:00 AM – 8:00 PM</span></div>
          {loadingSlots ? <div className="flex items-center gap-2 py-8 text-sm text-neutral-500"><LoaderCircle className="h-4 w-4 animate-spin" /> Checking Google Calendar…</div> : slots.length ? <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">{slots.map((slot) => <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={`rounded-xl border px-2 py-3 text-sm transition ${selectedSlot === slot ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-neutral-200 hover:border-emerald-500 dark:border-neutral-800'}`}>{displayTime(slot)}</button>)}</div> : <p className="py-6 text-sm text-neutral-500">{error || 'No available times on this date. Try another day.'}</p>}
          {selectedSlot && <p className="mt-4 flex items-center gap-2 text-xs text-emerald-600"><Clock3 className="h-3.5 w-3.5" /> {displayDate(date)} at {displayTime(selectedSlot)} · {selectedMeeting.duration} minutes</p>}
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-7">
          <div className="text-sm font-semibold">02. Your details</div>
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-medium">Full name <span className="text-rose-500">*</span><input required maxLength={100} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-800" placeholder="Your name" /></label>
            <label className="block text-sm font-medium">Email address <span className="text-rose-500">*</span><input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-800" placeholder="you@example.com" /></label>
            <label className="block text-sm font-medium">Company / organization <span className="text-neutral-500">(optional)</span><input maxLength={150} autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-800" placeholder="Company name" /></label>
            <label className="block text-sm font-medium">What would you like to discuss? <span className="text-rose-500">*</span><textarea required maxLength={2000} rows={5} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-800" placeholder="Share a little context about your meeting…" /></label>
          </div>
          {error && <p role="alert" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-rose-600">{error}</p>}
          <button type="submit" disabled={submitting || loadingSlots || !selectedSlot} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Booking…</> : <>Confirm meeting <ArrowRight className="h-4 w-4" /></>}</button>
          <p className="mt-3 text-center text-xs leading-5 text-neutral-500">Your details are only used to arrange this meeting. Times are shown in Bangladesh Standard Time.</p>
        </section>
      </form>
    </div>
  );
}

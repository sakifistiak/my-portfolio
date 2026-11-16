-- Persistent meeting bookings for sakif.pro.bd
create extension if not exists btree_gist;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  meeting_type text not null,
  meeting_label text not null,
  topic text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  timezone text not null default 'Asia/Dhaka',
  status text not null default 'pending' check (status in ('pending','confirmed','calendar_failed','cancelled')),
  google_event_id text unique,
  google_event_url text,
  google_meet_url text,
  notification_status text not null default 'pending' check (notification_status in ('pending','sent','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_valid_duration check (end_at > start_at),
  constraint bookings_no_overlapping_active_slots
    exclude using gist (tstzrange(start_at, end_at, '[)') with &&)
    where (status in ('pending','confirmed'))
);

create index if not exists bookings_start_at_idx on public.bookings (start_at);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_email_idx on public.bookings (email);

alter table public.bookings enable row level security;
-- No public policies: only the server-side Supabase secret key can access booking records.

-- Run this once in Supabase > SQL Editor.
-- Website enquiry form (LeadForm). The public can only ADD a lead, never read, change or delete one.
-- You read leads in Table Editor > leads (newest first).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null default '' check (char_length(email) <= 120),
  whatsapp text not null default '' check (char_length(whatsapp) <= 30),
  interest text not null default '' check (char_length(interest) <= 80),
  country text not null default '' check (char_length(country) <= 60),
  message text not null default '' check (char_length(message) <= 1000),
  page text not null default '' check (char_length(page) <= 200),
  referrer text not null default '' check (char_length(referrer) <= 300),
  utm_source text not null default '' check (char_length(utm_source) <= 80),
  utm_medium text not null default '' check (char_length(utm_medium) <= 80),
  utm_campaign text not null default '' check (char_length(utm_campaign) <= 120),
  status text not null default 'new',
  -- at least one way to reach the person
  constraint leads_contact_present check (email <> '' or whatsapp <> '')
);

create index if not exists leads_created_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (status = 'new');

-- No select / update / delete policies: only you (dashboard) can see or change leads.

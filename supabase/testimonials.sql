-- Run this once in Supabase → SQL Editor.
-- Students submit via the private /student-feedback/ link.
-- You approve rows in Table Editor (set approved = true) before they show on the website.

create table if not exists public.student_testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  role_title text not null default '',
  city text not null default '',
  course text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  quote text not null,
  linkedin_url text not null default '',
  consent_to_publish boolean not null default true,
  approved boolean not null default false,
  approved_at timestamptz
);

create index if not exists student_testimonials_approved_idx
  on public.student_testimonials (approved, created_at desc);

alter table public.student_testimonials enable row level security;

-- Public site may read only approved testimonials (admin approve = publish)
drop policy if exists "Public read approved testimonials" on public.student_testimonials;
create policy "Public read approved testimonials"
  on public.student_testimonials
  for select
  to anon, authenticated
  using (approved = true);

-- Anyone with the form (anon key) may insert pending rows only
drop policy if exists "Students insert pending testimonials" on public.student_testimonials;
create policy "Students insert pending testimonials"
  on public.student_testimonials
  for insert
  to anon, authenticated
  with check (approved = false);

-- No public update/delete — you approve in the Supabase dashboard (Table Editor)

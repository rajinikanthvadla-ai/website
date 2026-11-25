-- Blog posts editable in /admin (with cover image upload).
-- Safe to run more than once. Run in Supabase SQL Editor if you already ran admin.sql earlier.

create table if not exists public.site_blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  slug text not null unique check (char_length(slug) between 3 and 120),
  title text not null check (char_length(title) between 3 and 200),
  description text not null default '' check (char_length(description) <= 500),
  category text not null default 'General' check (char_length(category) between 2 and 60),
  tags text[] not null default '{}',
  read_time text not null default '' check (char_length(read_time) <= 20),
  published_at date not null default (timezone('utc', now())::date),
  content text not null default '' check (char_length(content) <= 100000),
  cover_image_url text not null default '',
  published boolean not null default false
);

create index if not exists site_blog_posts_published_at_idx
  on public.site_blog_posts (published_at desc);

alter table public.site_blog_posts enable row level security;

drop policy if exists "Public reads published blog posts" on public.site_blog_posts;
create policy "Public reads published blog posts"
  on public.site_blog_posts for select to anon, authenticated
  using (published = true);

drop policy if exists "Admin manages blog posts" on public.site_blog_posts;
create policy "Admin manages blog posts"
  on public.site_blog_posts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

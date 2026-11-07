-- Admin panel, site content, analytics and project requests.
-- Run this once in Supabase > SQL Editor, AFTER leads.sql and testimonials.sql.
-- Safe to run again: every statement is idempotent.
--
-- Then make yourself the admin (Authentication > Users > Add user, then):
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'YOUR-ADMIN-EMAIL';

-- ─────────────────────────────────────────────────────────────
-- 1. Who is an admin
-- ─────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- No policies: nobody can read or change this table through the API.

-- True only for a signed-in admin. If that admin has turned on 2-step login,
-- the session must also have passed the 2-step check (aal2).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid())
    and (
      coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
      or not exists (
        select 1 from auth.mfa_factors f
        where f.user_id = auth.uid() and f.status = 'verified'
      )
    );
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 2. Leads (from leads.sql): admin can read and work them
-- ─────────────────────────────────────────────────────────────
alter table public.leads add column if not exists notes text not null default '';
alter table public.leads add column if not exists updated_at timestamptz;

drop policy if exists "Admin reads leads" on public.leads;
create policy "Admin reads leads" on public.leads for select to authenticated using (public.is_admin());
drop policy if exists "Admin updates leads" on public.leads;
create policy "Admin updates leads" on public.leads for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin deletes leads" on public.leads;
create policy "Admin deletes leads" on public.leads for delete to authenticated using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 3. Testimonials (from testimonials.sql): admin approves in the panel
-- ─────────────────────────────────────────────────────────────
drop policy if exists "Admin reads testimonials" on public.student_testimonials;
create policy "Admin reads testimonials" on public.student_testimonials for select to authenticated using (public.is_admin());
drop policy if exists "Admin updates testimonials" on public.student_testimonials;
create policy "Admin updates testimonials" on public.student_testimonials for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin deletes testimonials" on public.student_testimonials;
create policy "Admin deletes testimonials" on public.student_testimonials for delete to authenticated using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 4. Project and consulting requests (the "Work with me" form)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.consult_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  name text not null check (char_length(name) between 2 and 80),
  email text not null default '' check (char_length(email) <= 120),
  whatsapp text not null default '' check (char_length(whatsapp) <= 30),
  company text not null default '' check (char_length(company) <= 120),
  role text not null default '' check (char_length(role) <= 80),
  service text not null default '' check (char_length(service) <= 80),
  budget text not null default '' check (char_length(budget) <= 40),
  timeline text not null default '' check (char_length(timeline) <= 40),
  details text not null default '' check (char_length(details) <= 3000),
  page text not null default '' check (char_length(page) <= 200),
  referrer text not null default '' check (char_length(referrer) <= 300),
  utm_source text not null default '' check (char_length(utm_source) <= 80),
  utm_medium text not null default '' check (char_length(utm_medium) <= 80),
  utm_campaign text not null default '' check (char_length(utm_campaign) <= 120),
  status text not null default 'new',
  notes text not null default '',
  constraint consult_contact_present check (email <> '' or whatsapp <> '')
);
create index if not exists consult_requests_created_idx on public.consult_requests (created_at desc);
alter table public.consult_requests enable row level security;

drop policy if exists "Public can send requests" on public.consult_requests;
create policy "Public can send requests" on public.consult_requests for insert to anon, authenticated
  with check (status = 'new' and notes = '');
drop policy if exists "Admin reads requests" on public.consult_requests;
create policy "Admin reads requests" on public.consult_requests for select to authenticated using (public.is_admin());
drop policy if exists "Admin updates requests" on public.consult_requests;
create policy "Admin updates requests" on public.consult_requests for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin deletes requests" on public.consult_requests;
create policy "Admin deletes requests" on public.consult_requests for delete to authenticated using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 5. News and announcements
-- ─────────────────────────────────────────────────────────────
create table if not exists public.site_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  title text not null check (char_length(title) between 3 and 140),
  summary text not null default '' check (char_length(summary) <= 300),
  body text not null default '' check (char_length(body) <= 20000),
  image_url text not null default '',
  link_url text not null default '',
  link_label text not null default '',
  show_in_bar boolean not null default false,   -- show as the thin bar at the top of every page
  bar_text text not null default '' check (char_length(bar_text) <= 140),
  starts_at timestamptz,
  ends_at timestamptz,
  pinned boolean not null default false,
  published boolean not null default false
);
create index if not exists site_posts_created_idx on public.site_posts (created_at desc);
alter table public.site_posts enable row level security;

drop policy if exists "Public reads published posts" on public.site_posts;
create policy "Public reads published posts" on public.site_posts for select to anon, authenticated using (published = true);
drop policy if exists "Admin manages posts" on public.site_posts;
create policy "Admin manages posts" on public.site_posts for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 6. Banners (images you make in ChatGPT and upload)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.site_banners (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  title text not null check (char_length(title) between 2 and 120),
  image_url text not null,
  alt text not null default '',
  link_url text not null default '',
  placement text not null default 'home' check (placement in ('home', 'enroll', 'courses', 'work')),
  sort int not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default true
);
alter table public.site_banners enable row level security;

drop policy if exists "Public reads active banners" on public.site_banners;
create policy "Public reads active banners" on public.site_banners for select to anon, authenticated using (active = true);
drop policy if exists "Admin manages banners" on public.site_banners;
create policy "Admin manages banners" on public.site_banners for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 7. Portfolio projects and case studies
-- ─────────────────────────────────────────────────────────────
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null check (char_length(title) between 3 and 140),
  category text not null default 'client' check (category in ('client', 'product', 'open-source')),
  client_label text not null default '',      -- e.g. "UK payments processor" (keep client names out unless you have permission)
  summary text not null default '' check (char_length(summary) <= 400),
  problem text not null default '',
  solution text not null default '',
  results text[] not null default '{}',        -- one measurable result per line
  stack text[] not null default '{}',
  image_url text not null default '',
  link_url text not null default '',
  repo_url text not null default '',
  sort int not null default 0,
  featured boolean not null default false,
  published boolean not null default false
);
alter table public.portfolio_projects enable row level security;

drop policy if exists "Public reads published projects" on public.portfolio_projects;
create policy "Public reads published projects" on public.portfolio_projects for select to anon, authenticated using (published = true);
drop policy if exists "Admin manages projects" on public.portfolio_projects;
create policy "Admin manages projects" on public.portfolio_projects for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Starter projects from your resume and the Orphanaut repo. Edit them in the panel.
insert into public.portfolio_projects (slug, title, category, client_label, summary, problem, solution, results, stack, link_url, repo_url, sort, featured, published) values
('agentic-aiops-incident-triage', 'Agentic AIOps platform for incident triage', 'client', 'US database company',
 'Multi-agent system that reads production alerts, pulls the right runbooks, suggests a fix and waits for human approval before acting.',
 'On-call engineers lost time on noisy alerts and hunting through runbooks and post-mortems during incidents.',
 'LangGraph agents (Planner, Validator, Forecasting, Notification, Supervisor) with agentic RAG over runbooks and post-mortems, human approval gates on every high-impact action, and guardrails plus tracing on every endpoint.',
 array['About 60% lower MTTR on noisy incidents', 'Llama 3 and Mistral fine-tuned with QLoRA on 2M+ incident records', 'Grounded answers with citations instead of guesses'],
 array['LangGraph', 'Anthropic MCP', 'GPT-4o', 'Pinecone', 'vLLM', 'EKS', 'LangSmith', 'NeMo Guardrails', 'FastAPI'],
 '', '', 10, true, true),
('fintech-support-rag-chatbot', 'Customer support RAG chatbot with human escalation', 'client', 'FinTech company',
 'Production chatbot answering KYC, billing and policy questions for 80,000+ active users, handing over to a human when it is not sure.',
 'Support agents spent most of their day on repeat tier-1 questions about KYC, billing and policy.',
 'Hybrid retrieval with citations, PII redaction and confidence-based escalation to human agents over WhatsApp and Slack.',
 array['68% first-contact resolution on tier-1 queries', '41% lower average agent handling time', '80,000+ active users'],
 array['GPT-4o', 'Azure OpenAI', 'LangChain', 'Pinecone', 'Azure AI Search', 'FastAPI', 'WhatsApp', 'Slack'],
 '', '', 20, true, true),
('fraud-detection-mlops', 'Real-time fraud detection MLOps platform', 'client', 'UK payments processor',
 'Champion vs challenger MLOps platform for fraud detection, forecasting and customer lifetime value.',
 'New models needed a safe, automatic way into production without silent decay or risky manual releases.',
 'MLflow and Kubeflow Pipelines on GKE: a new model must beat the live one on precision, recall, F1 and AUC-ROC before it is promoted, with drift-triggered retraining and canary rollouts through Argo CD.',
 array['18% fewer fraudulent chargebacks year over year', 'About 22% better analyst precision', 'About 99.9% deployment success rate'],
 array['MLflow', 'Kubeflow', 'GKE', 'Vertex AI', 'BigQuery', 'Scala-Spark', 'Evidently AI', 'Argo CD', 'Terraform'],
 '', '', 30, true, true),
('contract-document-intelligence', 'Document intelligence for contracts and compliance', 'client', 'Legal and finance teams',
 'Pipeline that pulls key clauses out of scanned and digital contracts, scores risk and writes a short brief for reviewers.',
 'Reviewing one contract by hand took about 90 minutes.',
 'Azure Document Intelligence and Textract for extraction, Claude for clause analysis, Qdrant for retrieval, and an evaluation harness on a 200-contract golden set with LLM-as-judge scoring.',
 array['Contract review down from about 90 to about 12 minutes', '200-contract golden dataset for hallucination tracking'],
 array['Azure Document Intelligence', 'Claude', 'LlamaIndex', 'Qdrant', 'AWS Textract', 'Streamlit'],
 '', '', 40, false, true),
('supply-chain-agents', 'Multi-agent inventory and supply chain assistant', 'client', 'Retail pilot',
 'Four agents covering inventory planning, reordering and supplier coordination, with human approval at every high-cost step.',
 'Stock-outs and over-ordering were both eating margin.',
 'LangGraph agents on GPT-4o, Claude and Bedrock with pgvector memory and approval gates.',
 array['35% fewer stock-outs in the pilot quarter', '22% less over-ordering'],
 array['LangGraph', 'GPT-4o', 'Claude', 'AWS Bedrock', 'pgvector', 'FastAPI'],
 '', '', 50, false, true),
('orphanaut', 'Orphanaut: find and delete leftover cloud resources', 'open-source', 'Free desktop app',
 'Desktop app for Windows and macOS that finds leftover AWS, Azure and Google Cloud resources, including AI services, before they run up a bill.',
 'Labs and experiments leave SageMaker domains, Bedrock resources, Azure OpenAI deployments and Vertex AI endpoints running, and the bill keeps growing.',
 'Scans each cloud, shows a map of what every resource is connected to, estimates monthly cost, and deletes in the right order after you confirm.',
 array['AWS, Azure and Google Cloud in one app', 'AI services like SageMaker, Bedrock, Azure OpenAI and Vertex AI', 'MIT licensed, auto-updating'],
 array['Python', 'AWS', 'Azure', 'Google Cloud'],
 'https://github.com/rajinikanthvadla-ai/orphanaut/releases/latest', 'https://github.com/rajinikanthvadla-ai/orphanaut', 5, true, true)
on conflict (slug) do nothing;

-- ─────────────────────────────────────────────────────────────
-- 8. Analytics: page views and key clicks (no cookies, no IP addresses)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.site_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id text not null check (char_length(session_id) between 8 and 40),
  type text not null check (type in ('pageview', 'click')),
  path text not null default '' check (char_length(path) <= 200),
  referrer text not null default '' check (char_length(referrer) <= 300),
  source text not null default '' check (char_length(source) <= 60),
  utm_source text not null default '' check (char_length(utm_source) <= 80),
  utm_medium text not null default '' check (char_length(utm_medium) <= 80),
  utm_campaign text not null default '' check (char_length(utm_campaign) <= 120),
  utm_term text not null default '' check (char_length(utm_term) <= 120),
  label text not null default '' check (char_length(label) <= 120),
  target text not null default '' check (char_length(target) <= 300),
  device text not null default '' check (char_length(device) <= 20),
  lang text not null default '' check (char_length(lang) <= 20),
  tz text not null default '' check (char_length(tz) <= 60)
);
create index if not exists site_events_created_idx on public.site_events (created_at desc);
alter table public.site_events enable row level security;

drop policy if exists "Public adds events" on public.site_events;
create policy "Public adds events" on public.site_events for insert to anon, authenticated with check (true);
drop policy if exists "Admin reads events" on public.site_events;
create policy "Admin reads events" on public.site_events for select to authenticated using (public.is_admin());
drop policy if exists "Admin deletes events" on public.site_events;
create policy "Admin deletes events" on public.site_events for delete to authenticated using (public.is_admin());

-- One call returns everything the Analytics screen needs.
create or replace function public.analytics_summary(p_days int default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  since timestamptz := now() - make_interval(days => greatest(1, least(p_days, 365)));
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'not allowed';
  end if;

  with ev as (select * from public.site_events where created_at >= since),
  pv as (select * from ev where type = 'pageview'),
  firsts as (
    select distinct on (session_id) session_id, path, source, utm_source, utm_campaign, utm_term, device, tz
    from pv order by session_id, created_at
  )
  select jsonb_build_object(
    'visitors', (select count(distinct session_id) from pv),
    'pageviews', (select count(*) from pv),
    'clicks', (select count(*) from ev where type = 'click'),
    'by_day', coalesce((select jsonb_agg(d order by d->>'day') from (
        select jsonb_build_object('day', to_char(date_trunc('day', created_at), 'YYYY-MM-DD'),
                                  'visitors', count(distinct session_id), 'pageviews', count(*)) d
        from pv group by date_trunc('day', created_at)) x), '[]'::jsonb),
    'sources', coalesce((select jsonb_agg(jsonb_build_object('name', name, 'count', c) order by c desc) from (
        select coalesce(nullif(source, ''), 'Direct') name, count(*) c from firsts group by 1 order by 2 desc limit 15) x), '[]'::jsonb),
    'landing_pages', coalesce((select jsonb_agg(jsonb_build_object('name', path, 'count', c) order by c desc) from (
        select path, count(*) c from firsts group by 1 order by 2 desc limit 20) x), '[]'::jsonb),
    'top_pages', coalesce((select jsonb_agg(jsonb_build_object('name', path, 'count', c) order by c desc) from (
        select path, count(*) c from pv group by 1 order by 2 desc limit 20) x), '[]'::jsonb),
    'campaigns', coalesce((select jsonb_agg(jsonb_build_object('name', name, 'count', c) order by c desc) from (
        select concat_ws(' / ', nullif(utm_source, ''), nullif(utm_campaign, '')) name, count(*) c
        from firsts where utm_source <> '' or utm_campaign <> '' group by 1 order by 2 desc limit 15) x), '[]'::jsonb),
    'search_terms', coalesce((select jsonb_agg(jsonb_build_object('name', utm_term, 'count', c) order by c desc) from (
        select utm_term, count(*) c from firsts where utm_term <> '' group by 1 order by 2 desc limit 20) x), '[]'::jsonb),
    'clicks_top', coalesce((select jsonb_agg(jsonb_build_object('name', label, 'count', c) order by c desc) from (
        select coalesce(nullif(label, ''), target) label, count(*) c from ev where type = 'click' group by 1 order by 2 desc limit 20) x), '[]'::jsonb),
    'devices', coalesce((select jsonb_agg(jsonb_build_object('name', name, 'count', c) order by c desc) from (
        select coalesce(nullif(device, ''), 'unknown') name, count(*) c from firsts group by 1 order by 2 desc) x), '[]'::jsonb),
    'regions', coalesce((select jsonb_agg(jsonb_build_object('name', name, 'count', c) order by c desc) from (
        select coalesce(nullif(tz, ''), 'unknown') name, count(*) c from firsts group by 1 order by 2 desc limit 15) x), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;
grant execute on function public.analytics_summary(int) to authenticated;

-- ─────────────────────────────────────────────────────────────
-- 9. Image storage for banners, news and projects
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/webp', 'image/jpeg', 'image/png'];

drop policy if exists "Admin uploads media" on storage.objects;
create policy "Admin uploads media" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "Admin updates media" on storage.objects;
create policy "Admin updates media" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin());
drop policy if exists "Admin deletes media" on storage.objects;
create policy "Admin deletes media" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 10. Site settings (edited in /admin > Settings, pulled in at every deploy)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  key text primary key check (key in ('years_experience')),
  value text not null check (char_length(value) <= 40),
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

drop policy if exists "Public reads settings" on public.site_settings;
create policy "Public reads settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "Admin manages settings" on public.site_settings;
create policy "Admin manages settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings (key, value) values ('years_experience', '8+')
on conflict (key) do nothing;

-- ─────────────────────────────────────────────────────────────
-- 11. Activity feed: real students who joined, shown as a small card on the site
-- Only add people who really did it and agreed to be shown (first name and city only).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.site_activity (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  first_name text not null check (char_length(first_name) between 2 and 30),
  city text not null default '' check (char_length(city) <= 40),
  action text not null check (char_length(action) between 3 and 80),
  happened_at timestamptz not null default now(),
  lead_id uuid,
  published boolean not null default true
);
create index if not exists site_activity_happened_idx on public.site_activity (happened_at desc);
alter table public.site_activity enable row level security;

drop policy if exists "Public reads published activity" on public.site_activity;
create policy "Public reads published activity" on public.site_activity for select to anon, authenticated using (published = true);
drop policy if exists "Admin manages activity" on public.site_activity;
create policy "Admin manages activity" on public.site_activity for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Real totals for the site (counts only, never names): "12 engineers asked about the course this week".
create or replace function public.public_activity_stats()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'enquiries_7d', (select count(*) from public.leads where created_at >= now() - interval '7 days' and status <> 'spam'),
    'requests_30d', (select count(*) from public.consult_requests where created_at >= now() - interval '30 days' and status <> 'spam'),
    'joined_30d', (select count(*) from public.site_activity where published and happened_at >= now() - interval '30 days')
  );
$$;
grant execute on function public.public_activity_stats() to anon, authenticated;

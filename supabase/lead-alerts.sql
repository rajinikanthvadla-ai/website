-- Instant email alert for every new enquiry, free 15-min career call request and project request.
--
-- One-time setup (about 5 minutes):
--   1. Sign up free at https://resend.com using the email address that should RECEIVE the alerts.
--   2. In Resend: API Keys > Create API key (permission: Sending access). Copy it (starts with re_).
--   3. In Supabase > SQL Editor, paste this whole file. Replace the two values in STEP A
--      (your Resend key and your email), then press Run.
--   4. Test: submit the form on https://rajinikanthvadla.com/free-career-call/ and check your inbox
--      (and spam, the first time). Mark it "Not spam" once.
--
-- Sender is onboarding@resend.dev, which Resend allows for emails to your own account address.
-- The key is stored encrypted in Supabase Vault, never in the website code.
-- If an alert ever fails, the lead is still saved; check Leads in /admin.

-- ── STEP A: your secrets (edit the two values, run once) ──────────────────────
-- To change a value later, run: select vault.update_secret((select id from vault.secrets where name = 'resend_api_key'), 'NEW_VALUE');
select vault.create_secret('PASTE_YOUR_RESEND_KEY_HERE', 'resend_api_key', 'Resend key for website lead alerts')
where not exists (select 1 from vault.secrets where name = 'resend_api_key');
select vault.create_secret('PASTE_YOUR_EMAIL_HERE', 'lead_alert_email', 'Inbox for website lead alerts')
where not exists (select 1 from vault.secrets where name = 'lead_alert_email');

-- ── STEP B: everything below runs as-is ───────────────────────────────────────
create extension if not exists pg_net with schema extensions;

create or replace function public.send_lead_alert(subject text, body text, reply_to text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  api_key text;
  to_email text;
  payload jsonb;
begin
  select decrypted_secret into api_key from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
  select decrypted_secret into to_email from vault.decrypted_secrets where name = 'lead_alert_email' limit 1;
  if coalesce(api_key, '') = '' or coalesce(to_email, '') = '' or api_key like 'PASTE_%' then
    return;
  end if;

  payload := jsonb_build_object(
    'from', 'Website leads <onboarding@resend.dev>',
    'to', jsonb_build_array(to_email),
    'subject', left(subject, 150),
    'text', body
  );
  if coalesce(reply_to, '') like '%@%' then
    payload := payload || jsonb_build_object('reply_to', reply_to);
  end if;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    body := payload,
    headers := jsonb_build_object('Authorization', 'Bearer ' || api_key, 'Content-Type', 'application/json'),
    timeout_milliseconds := 5000
  );
exception when others then
  -- Never block a lead from saving because an email failed.
  raise warning 'lead alert failed: %', sqlerrm;
end;
$$;

revoke all on function public.send_lead_alert(text, text, text) from public, anon, authenticated;

-- Enquiries and free career call requests (table: leads)
create or replace function public.alert_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_call boolean;
  wa_digits text;
begin
  is_call := coalesce(new.interest, '') ilike 'Free 15-min%';
  wa_digits := regexp_replace(coalesce(new.whatsapp, ''), '[^0-9]', '', 'g');
  perform public.send_lead_alert(
    (case when is_call then 'Free career call request: ' else 'New enquiry: ' end) || new.name
      || case when new.country <> '' then ' (' || new.country || ')' else '' end,
    concat_ws(E'\n',
      case when is_call then 'Someone booked a FREE 15-MIN AI CAREER CALL. Reply within 24 hours to fix a time.' else 'New enquiry from the website.' end,
      '',
      'Name: ' || new.name,
      'WhatsApp: ' || coalesce(nullif(new.whatsapp, ''), '-'),
      case when length(wa_digits) >= 8 then 'Open chat: https://wa.me/' || wa_digits end,
      'Email: ' || coalesce(nullif(new.email, ''), '-'),
      'Country: ' || coalesce(nullif(new.country, ''), '-'),
      'Interest: ' || coalesce(nullif(new.interest, ''), '-'),
      '',
      coalesce(nullif(new.message, ''), '(no message)'),
      '',
      'Page: ' || coalesce(nullif(new.page, ''), '-'),
      'Came from: ' || coalesce(nullif(new.referrer, ''), 'direct'),
      case when new.utm_source <> '' then 'Campaign: ' || concat_ws(' / ', new.utm_source, nullif(new.utm_medium, ''), nullif(new.utm_campaign, '')) end,
      '',
      'All leads: https://rajinikanthvadla.com/admin/'
    ),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists leads_email_alert on public.leads;
create trigger leads_email_alert after insert on public.leads
  for each row execute function public.alert_new_lead();

-- Project and training requests from the Hire me page (table: consult_requests)
create or replace function public.alert_new_consult_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.send_lead_alert(
    'New project request: ' || new.name || case when new.company <> '' then ' (' || new.company || ')' else '' end,
    concat_ws(E'\n',
      'New project or training request from the Hire me page.',
      '',
      'Name: ' || new.name,
      'Company: ' || coalesce(nullif(new.company, ''), '-'),
      'Role: ' || coalesce(nullif(new.role, ''), '-'),
      'Email: ' || coalesce(nullif(new.email, ''), '-'),
      'WhatsApp: ' || coalesce(nullif(new.whatsapp, ''), '-'),
      'Service: ' || coalesce(nullif(new.service, ''), '-'),
      'Budget: ' || coalesce(nullif(new.budget, ''), '-'),
      'Timeline: ' || coalesce(nullif(new.timeline, ''), '-'),
      '',
      coalesce(nullif(new.details, ''), '(no details)'),
      '',
      'All requests: https://rajinikanthvadla.com/admin/'
    ),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists consult_email_alert on public.consult_requests;
create trigger consult_email_alert after insert on public.consult_requests
  for each row execute function public.alert_new_consult_request();

# Admin panel setup (one time, about 15 minutes)

You do these steps yourself because they involve your passwords and tokens.
Your Supabase project: `aarciofvizsbmgaufcgr`.

## 1. Create the tables (Supabase > SQL Editor)

1. Open https://supabase.com/dashboard/project/aarciofvizsbmgaufcgr/sql/new
2. If you never ran them before, run `supabase/leads.sql` and `supabase/testimonials.sql` first.
3. Paste the whole of `supabase/admin.sql` and click **Run**. It is safe to run again later.

This creates: admin access rules, project requests, news, banners, projects (pre-filled from
your resume and Orphanaut), analytics, and the `media` image bucket.

## 2. Create your admin login

1. **Authentication > Users > Add user > Create new user.** Your email, a long password
   (12+ characters, from a password manager), tick **Auto confirm user**.
2. Back in **SQL Editor**, run (with your email):

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'YOUR-EMAIL-HERE';
   ```

3. **Authentication > Sign In / Providers**: turn **off** "Allow new users to sign up".
   Nobody else can create an account; only the users in `admins` can edit anything.
4. **Authentication > URL Configuration**: Site URL `https://rajinikanthvadla.com`,
   and add `https://rajinikanthvadla.com/admin/` to Redirect URLs (for "Forgot password").

## 3. GitHub token for the Publish button

1. GitHub > Settings > Developer settings > **Fine-grained tokens** > Generate new token.
2. Name `website-publish`, expiry 1 year (put a reminder in your calendar).
3. Repository access: **Only select repositories** > `rajinikanthvadla-ai/website`.
4. Repository permissions: **Actions: Read and write**. Nothing else.
5. Copy the token. You paste it only into Supabase in the next step, never into the website code.

## 4. Deploy the Publish function

Easiest, in the dashboard:

1. **Edge Functions > Deploy a new function > Via Editor**. Name it exactly `publish`.
2. Replace the sample code with the contents of `supabase/functions/publish/index.ts`. Deploy.
3. **Edge Functions > Secrets**: add `GH_DEPLOY_TOKEN` = the token from step 3.

Or with the command line (from the website folder):

```bash
npx supabase login
npx supabase functions deploy publish --project-ref aarciofvizsbmgaufcgr
npx supabase secrets set GH_DEPLOY_TOKEN=paste-token-here --project-ref aarciofvizsbmgaufcgr
```

## 5. First sign-in

1. After the site is deployed, open https://rajinikanthvadla.com/admin/ and sign in.
2. **Settings > Turn on 2-step login** and scan the QR code with Google Authenticator,
   Microsoft Authenticator or 1Password.
3. On your phone: open the same page, then **Add to Home screen**. It opens like an app.

## 6. Search words (Google does not send them to websites)

1. https://search.google.com/search-console > add property `rajinikanthvadla.com` (Domain).
2. Verify with the DNS record it gives you, then **Sitemaps** > submit `sitemap.xml`.
3. Bing is verified with the `msvalidate.01` meta tag in `src/app/layout.tsx`. Don't remove it.
   Bing also feeds Yahoo, DuckDuckGo and Copilot, and the deploy pings it through IndexNow.

After 2 to 3 days, **Performance** shows the exact words people searched before clicking your site.
Filter by **Country** (United States, United Kingdom, India) to see US/UK intent.

## 6b. Microsoft Clarity (where people stop, heatmaps, rough location)

Admin Analytics stays first-party (no IP). Clarity adds session replay + scroll heatmaps + country/region.

1. https://clarity.microsoft.com → **Add new project** → website URL `https://rajinikanthvadla.com`.
2. Open **Settings → Overview** and copy the **Project ID** (short id inside the install script).
3. GitHub repo → **Settings → Secrets and variables → Actions** → new secret
   `NEXT_PUBLIC_CLARITY_PROJECT_ID` = that Project ID.
4. Push to `main` or Admin → Dashboard → **Publish**. Wait for deploy.
5. Open Clarity next day: **Dashboard / Heatmaps / Recordings**. Masking hides form fields by default.

Do **not** add Google Analytics unless you later need city-level reports and accept another third-party script. Clarity + Search Console + your admin board is enough for now.

## 7. Email me every new lead (free career call, enquiry, project request)

The site is static, so the email is sent by Supabase the moment a form is saved.

1. Sign up free at https://resend.com with the email address that should receive the alerts.
2. Resend > **API Keys** > **Create API key** (Sending access). Copy the key (starts with `re_`).
3. Supabase > **SQL Editor** > paste all of `supabase/lead-alerts.sql`. In STEP A replace
   `PASTE_YOUR_RESEND_KEY_HERE` with the key and `PASTE_YOUR_EMAIL_HERE` with your email. Run.
4. Test it: fill the form at https://rajinikanthvadla.com/free-career-call/ . The email arrives in under a minute.
   The first one may land in spam: mark it "Not spam".

Never paste the key anywhere else (not in chat, not in GitHub). Supabase keeps it encrypted in Vault.

**Status:** live since 7 November 2026. Alerts go to the inbox saved in the `lead_alert_email` secret.
Gmail files them under the **Updates** tab. To change the inbox or key: Supabase > Integrations > Vault > Secrets > edit.
To check Resend's replies: `select status_code, content, created from net._http_response order by created desc limit 5;`

## Daily use

| You want to | Go to |
|---|---|
| Let Grokbot publish from the UI | Section 8. Grok signs into /admin and clicks like you |
| Copy a lead phone number | Leads → **Copy phone** (number is also selectable) |
| Write a blog post with a cover picture | Blog → New blog post → Upload cover → Save → Publish |
| Announce a batch, workshop or news | News > New post. Tick "Show in top bar" for the strip above the menu |
| Put up a ChatGPT banner | Banners > New banner > Upload. Pick the page it shows on |
| Add a project you delivered | Projects > New project |
| Show a real student who just joined | Leads > set status "enrolled" > **Add to activity feed** (or Activity > Add activity) |
| Change years of experience | Settings > Site details |
| See and follow up enquiries | Leads (students) and Requests (companies) |
| See where visitors come from | Analytics (plus Clarity + Search Console links there) |
| Make changes live | Dashboard > **Publish** (about 3 to 5 minutes) |

### Making banners in ChatGPT

- Ask for **landscape 1536×1024**. Example prompt: *"Landscape 1536x1024 banner for a live
  MLOps and LLMOps cohort starting 1 December, weekend batch, 20 seats. Clean, dark navy
  background, orange accent, large readable text, no small print."*
- Keep text big: most visitors are on phones.
- Upload the PNG as it is. The panel shrinks it to a sharp 1600px WebP (about 150 to 300 KB).

### Tag your links so Analytics knows which post worked

Add this to links you share:
`https://rajinikanthvadla.com/work-with-me/?utm_source=linkedin&utm_campaign=agent-post-dec`

For ads, also add `&utm_term=the+keyword`, and it shows under "Search words".

## Activity card on the site

A small card, bottom left, cycles through real entries from **Activity** (last 30 days) and real
totals ("14 engineers asked about the course this week", shown only when there are 5 or more).
Only add people who really joined and agreed to be shown. First name and city only.

The site also rebuilds itself every day at 06:00 IST, so the "2 days ago" times and weekly totals
stay current without you pressing Publish. GitHub pauses daily runs if the repository has no
commits for 60 days; any push or Publish turns them back on.

## 8. Blog table (one-time SQL if admin.sql already ran)

If you set up admin before Blog existed, run `supabase/blog.sql` once in the SQL Editor.
That creates `site_blog_posts` (title, Markdown body, **cover picture**, publish flag).

## 9. Grokbot (uses the admin UI, not an API)

Grok signs into https://rajinikanthvadla.com/admin/ with its own admin account and works the same screens you do.

### Account setup

1. Supabase → **Authentication → Users → Add user** for Grok’s email + password. Auto confirm.
2. SQL Editor:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'GROK-EMAIL-HERE';
   ```

3. **Do not turn on 2-step login for the Grok account.** Grok cannot enter authenticator codes. Keep MFA on *your* personal admin only.

### What Grok clicks

| Goal | Path |
|---|---|
| Write a blog post + cover picture | **Blog** → New blog post → Upload cover → Markdown body → Save |
| Write / reset a News post | **News** → New post or open existing → save (uncheck Published to reset) |
| Upload a News thumbnail | In the News post → **Image** upload |
| Top bar announcement | Tick **Show in top bar** + short bar text |
| Banner | **Banners** → New banner → Upload |
| Make it live | **Dashboard** → **Publish** |
| Copy a lead phone | **Leads** → **Copy phone** |

Existing long posts in `content/articles.json` stay. New ones from Admin → Blog appear on `/blog` after Publish.

### Prompt for Grok (paste once)

> Open https://rajinikanthvadla.com/admin/, sign in with the credentials I gave you.
> To publish a blog: Blog → New blog post → title, SEO description, Upload cover picture, Markdown body, tags → tick Published → Save → Dashboard → Publish.
> To publish news: News → New post → fill fields → upload image → Save → Publish.
> To reset: open the post → uncheck Published (or Delete) → Save → Publish.
> Do not use any API. Stay in the admin UI.

## How it stays safe and fast

- The live site is plain pre-built pages, so it stays fast. Your edits go live when you press Publish.
- If Supabase is down during a publish, the build stops and the live site keeps the last good version.
- The database refuses edits from anyone who is not in `admins`. With 2-step login on your account, a stolen
  password alone is not enough for you. Grok’s account stays password-only so it can use the UI.
- Analytics stores no cookies and no IP addresses, only page, source, device type, language and time zone.

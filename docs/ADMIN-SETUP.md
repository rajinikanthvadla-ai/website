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
3. Do the same at https://www.bing.com/webmasters (it can import from Search Console).

After 2 to 3 days, **Performance** shows the exact words people searched before clicking your site.

## Daily use

| You want to | Go to |
|---|---|
| Announce a batch, workshop or news | News > New post. Tick "Show in top bar" for the strip above the menu |
| Put up a ChatGPT banner | Banners > New banner > Upload. Pick the page it shows on |
| Add a project you delivered | Projects > New project |
| Show a real student who just joined | Leads > set status "enrolled" > **Add to activity feed** (or Activity > Add activity) |
| Change years of experience | Settings > Site details |
| See and follow up enquiries | Leads (students) and Requests (companies) |
| See where visitors come from | Analytics |
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

## How it stays safe and fast

- The live site is plain pre-built pages, so it stays fast. Your edits go live when you press Publish.
- If Supabase is down during a publish, the build stops and the live site keeps the last good version.
- The database refuses edits from anyone who is not in `admins`. With 2-step login on, a stolen
  password alone is not enough.
- Analytics stores no cookies and no IP addresses, only page, source, device type, language and time zone.

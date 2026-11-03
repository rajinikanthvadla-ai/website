# Private student feedback (GitHub Pages)

Students submit via a **secret link** you share. Nothing appears on the public site until you set `approved = true` in Supabase.

## Link you send students

```
https://rajinikanthvadla.com/student-feedback/?k=YOUR_TOKEN
```

- Not in the nav, sitemap, or Google index (`noindex` + robots disallow).
- Without the correct `?k=` value, the form stays locked.
- Rotate the token anytime by changing the GitHub secret and redeploying.

## One-time setup

1. Create a free [Supabase](https://supabase.com) project.
2. SQL Editor → paste and run `supabase/testimonials.sql`.
3. Confirm the table: left sidebar → **Table Editor** → you should see `student_testimonials`.
4. Get URL + **one public key** (new Dashboard only shows one — that is normal):
   - Gear **Settings** (bottom left) → **API Keys**
   - **Project URL** = `https://xxxxx.supabase.co` (also in the browser address / Connect dialog)
   - **Publishable** key (`sb_publishable_…`) **or** legacy **anon** key (`eyJ…`) — paste whichever you have into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Ignore **secret** / **service_role** — never put those on the website
5. Generate a long random **feedback token yourself** (password manager). This is **not** from Supabase.
6. GitHub repo → Settings → Secrets and variables → Actions → add:
   - `NEXT_PUBLIC_FEEDBACK_ACCESS_TOKEN` ← your homemade token
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` ← the one publishable/anon key
7. Push to `main` (or re-run Deploy) so GitHub Pages gets these values.
8. Locally: copy `.env.example` → `.env.local` with the same three values.

## How you approve

1. Supabase → Table Editor → `student_testimonials`.
2. Find the new row (`approved` is false).
3. Set `approved` to **true** and optionally set `approved_at` to now.
4. Refresh the live homepage — approved rows appear next to the existing text testimonials.

Uncheck “consent to publish” on the form → row stays private; RLS only exposes approved + consented rows to the anon key.

## Security notes (static site)

- The access token and anon key are visible in the built JS (normal for GitHub Pages). Protection is: hard-to-guess token + RLS that only allows insert of `approved=false` and select of `approved=true`.
- Do not put the Supabase **service role** key in the website.
- If the link leaks, change `NEXT_PUBLIC_FEEDBACK_ACCESS_TOKEN` and redeploy.

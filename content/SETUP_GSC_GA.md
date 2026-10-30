# Search Console + Analytics (you finish login; site is ready)

## 1. Google Analytics 4

1. Open https://analytics.google.com/
2. Admin → Create property → Web stream for `https://www.rajinikanthvadla.com`
3. Copy Measurement ID (`G-XXXXXXXX`)
4. Add to `.env.local` and GitHub Actions secrets:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
```

5. Redeploy. Clicks on Enroll / WhatsApp fire events: `enroll_click`, `whatsapp_click`.

## 2. Google Search Console

1. Open https://search.google.com/search-console
2. Add property: URL prefix `https://www.rajinikanthvadla.com`
3. Choose **HTML tag** verification
4. Copy only the `content="...."` token
5. Add secret / env:

```
NEXT_PUBLIC_GSC_VERIFICATION=paste_token_here
```

6. Redeploy, then click Verify in Search Console
7. Sitemaps → submit: `https://www.rajinikanthvadla.com/sitemap.xml`

## 3. YouTube Studio

1. Open https://studio.youtube.com/
2. For each upload: paste description from `content/SOCIAL_POSTS.md`
3. Pin the enroll + WhatsApp comment
4. Channel About → Website: `https://www.rajinikanthvadla.com`

## 4. After deploy checklist

- [ ] GA realtime shows a test WhatsApp click
- [ ] GSC property verified
- [ ] Sitemap submitted, no hard errors
- [ ] LinkedIn short post published once
- [ ] Reply WhatsApp leads within 1 hour when possible

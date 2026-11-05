# Discovery playbook: more mentorship and training requests

The website itself is now close to the ceiling (Lighthouse 90-100, every AI crawler allowed,
llms.txt, schema, IndexNow, real reviews in the HTML, a lead form). More on-site SEO gives
small gains. Google AI Overviews, ChatGPT, Perplexity and Gemini recommend a mentor when
**other sites** mention them. So the next wins are off-site.

## Where AI finds you today (checked 2026-11-05)

- Perplexity, asked "best live online MLOps LLMOps and AI agents mentor in India", named you
  the **strongest match**, citing **Topmate** (4.7/5, 15 ratings, 219+ sessions), not this website.
- It added "self-reported, verify alumni before paying" because there is little independent proof.
- A Google-style web search showed UrbanPro and Topmate first. UrbanPro says "6 years", the site
  says "7+". Make every profile say the same thing.
- So: **Topmate reviews are your strongest AI asset.** Ask every student for a Topmate rating and a
  Google review. 50 public ratings would turn "self-reported" into "well reviewed".

Every link you post should carry UTM tags so the lead form records where people came from:
`https://rajinikanthvadla.com/?utm_source=youtube&utm_medium=description&utm_campaign=mlops`

## Week 1: one-time setup (about 3 hours)

1. **Google Search Console**: verify the domain, submit `https://rajinikanthvadla.com/sitemap.xml`.
2. **Bing Webmaster Tools**: "Import from Google Search Console". Bing feeds ChatGPT search,
   Copilot and DuckDuckGo. IndexNow (already wired into deploy) only helps once the site is verified here.
3. **Google Business Profile**: service-area business, category "Educational consultant" or
   "Training centre", website link, WhatsApp number. Shows on Google Maps and in local AI answers.
4. **Same identity everywhere**: one photo, one headline ("MLOps, AIOps, LLMOps & AI Agents trainer
   and mentor"), one link to the site on LinkedIn, YouTube, GitHub, Topmate, Instagram, X.
   AI engines merge these into one "entity". Make sure each profile is listed in `sameAs`
   in `src/lib/constants.ts`.

## Every week (about 2 hours)

5. **Google reviews**: after each batch or mentorship call, send students the Google review link.
   Third-party reviews are the proof Google and AI trust most. Your own site's reviews are not
   eligible for star ratings in Google.
6. **Answer 3 real questions** on Reddit (r/mlops, r/devops, r/developersIndia, r/MachineLearning),
   Quora or LinkedIn: "DevOps to MLOps?", "best MLOps course?", "LLMOps roadmap?". Give a full answer
   and link a free page on your site (roadmap, syllabus, interview questions), not the enroll page.
   Perplexity and ChatGPT cite Reddit and Quora heavily. No copy-paste spam.
7. **YouTube**: first line of every description = site link with UTM. Add chapters. Pin a comment
   with the course link. Google AI Overviews quote YouTube a lot.

## Every month

8. **Two strong articles** written by you, answering what buyers search: fees and comparison,
   "MLOps roadmap 2027", salary bands, a named student case study (with permission).
   The automated daily AI article job has not published since 2026-04-28. Leave it off:
   mass AI-written posts risk Google's "scaled content" penalty and add little.
9. **One listing or backlink**: Topmate and ADPList (mentorship), a free GitHub repo of the
   capstone project with the site in the README, a guest post or podcast in the DevOps/AI space.
10. **AI visibility check**: ask ChatGPT, Perplexity, Gemini and Google (AI Mode) the same 5
    questions, for example "best MLOps mentor in India", "live LLMOps course online",
    "who teaches AIOps with real projects". Write down whether you appear and which
    sources they cite. Get mentioned on those sources.

## Measure (Supabase > Table Editor > leads)

| Metric | Now | 30-day target |
|---|---|---|
| Form leads per week | 0 (form is new) | 10 |
| Google reviews | check | 15 |
| Appears in AI answers (out of 5 questions x 4 engines) | check | 5 of 20 |
| Search Console clicks per week | check | +30% |

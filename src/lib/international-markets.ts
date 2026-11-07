/**
 * Target markets for international SEO: USA, UK, EU hubs, the Gulf and APAC.
 *
 * Every market page must read as its own page (local class times, local fees,
 * local questions), not a copy with the country name swapped. Google treats
 * near-identical city pages as doorway pages. `localSearches` holds phrases
 * seen in Google autocomplete for that country (research: docs/KEYWORD-RESEARCH.md).
 */
export type IntlMarketSlug =
  | "usa"
  | "uk"
  | "ireland"
  | "netherlands"
  | "luxembourg"
  | "germany"
  | "canada"
  | "australia"
  | "singapore"
  | "uae"
  | "saudi-arabia"
  | "qatar";

export type IntlMarketRegion = "north-america" | "europe" | "gulf" | "apac";

export type IntlMarket = {
  slug: IntlMarketSlug;
  name: string;
  shortName: string;
  flag: string;
  hreflang: string;
  region: IntlMarketRegion;
  currency: "USD";
  priceLive: string;
  priceRecordings: string;
  /** Typical pay for the roles. Left out where we have no reliable figure. */
  salaryRange?: string;
  timezoneNote: string;
  hubCities: string[];
  /** Cities with their IANA time zone, used to print local class times at build. */
  timeZones: { city: string; tz: string }[];
  /** Approximate fee in a currency pegged to the US dollar (Gulf only). */
  localFee?: { live: string; recordings: string; currency: string };
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  context: string[];
  faqs: { q: string; a: string }[];
  companyPitch: string;
  localSearches: string[];
  searchTerms: string[];
};

const PRICE = { priceLive: "$599", priceRecordings: "$399", currency: "USD" as const };

const COMPANY_FAQ = (where: string) => ({
  q: `Can a company in ${where} hire you to build an AI agent or train our team?`,
  a: `Yes. I build AI agents, RAG assistants and MLOps platforms for companies, and run online training for engineering teams. Send the brief on the Hire me page and I reply personally.`,
});

export const INTL_MARKETS: IntlMarket[] = [
  {
    slug: "usa",
    name: "United States",
    shortName: "USA",
    flag: "🇺🇸",
    hreflang: "en-US",
    region: "north-america",
    ...PRICE,
    salaryRange: "$120K–$220K+",
    timezoneNote:
      "Live classes are mid-morning on the US East Coast and early morning on the West Coast. Recordings cover every class if that clashes with work.",
    hubCities: ["San Francisco", "Seattle", "Austin", "New York", "Boston"],
    timeZones: [
      { city: "New York", tz: "America/New_York" },
      { city: "Chicago / Austin", tz: "America/Chicago" },
      { city: "San Francisco / Seattle", tz: "America/Los_Angeles" },
    ],
    seoTitle: "MLOps & LLMOps Course USA: Live Online AI Engineer Training",
    metaDescription:
      "Live online MLOps, LLMOps and AI agents course for US engineers. 4-5 months, 4 production capstones, interview prep. $599 live or $399 recordings, paid in USD.",
    h1: "MLOps, LLMOps and AI agents course for engineers in the USA",
    intro:
      "A live online course for software, DevOps, data and cloud engineers in the US who want MLOps, LLMOps, AI platform or AI agent roles. You build production systems, not notebooks, and learn from an engineer who runs them at work.",
    context: [
      "Many US searches for an MLOps or AI engineer course end on self-paced video catalogs or short cohorts of a few weeks. This program runs 4 to 5 months with live classes Monday to Friday, 4 capstone projects and a job-ready track, for $599.",
      "Live classes run 8:00 to 9:45 PM India time, which is mid-morning on the East Coast and early morning on the West Coast. If that clashes with work, the recordings plan ($399) gives you every class with lifetime access.",
      "It is built for software engineers moving into AI platform work, DevOps and SRE engineers adding MLOps and LLMOps, and data engineers who want to own model deployment and monitoring.",
    ],
    faqs: [
      {
        q: "Is there a live MLOps course I can take from the USA?",
        a: "Yes, fully online. Live classes run Monday to Friday, mid-morning Eastern time. You can also take the recordings plan and study on your own schedule.",
      },
      {
        q: "How much does it cost in the US?",
        a: "$599 for the live cohort with 1:1 mentorship, job assistance and interview prep, or $399 for recordings with lifetime access. You pay in US dollars by card through Razorpay.",
      },
      {
        q: "Do I need to be in New York or the Bay Area?",
        a: "No. Everything is online, so engineers join from any state. You only need a laptop and an internet connection.",
      },
      COMPANY_FAQ("the US"),
    ],
    companyPitch:
      "US startups and enterprises: hire me to build an AI agent, a RAG assistant or an MLOps platform, or to train your engineering team online.",
    localSearches: [
      "MLOps course online",
      "AI engineer course online",
      "best AI course for software engineers",
      "AI bootcamp NYC",
      "AI bootcamp Bay Area",
      "AI infrastructure engineer learning path",
      "ai agent development company in usa",
    ],
    searchTerms: ["MLOps course USA", "MLOps training United States", "LLMOps course America"],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    shortName: "UK",
    flag: "🇬🇧",
    hreflang: "en-GB",
    region: "europe",
    ...PRICE,
    salaryRange: "£55K–£110K+",
    timezoneNote:
      "Live classes are mid-afternoon UK time. If you work office hours, the recordings plan lets you watch each class in the evening.",
    hubCities: ["London", "Manchester", "Edinburgh", "Cambridge", "Bristol"],
    timeZones: [{ city: "London", tz: "Europe/London" }],
    seoTitle: "AI & MLOps Course UK (Live Online, London): LLMOps, AI Agents",
    metaDescription:
      "Online AI and MLOps course for UK engineers in London, Manchester and beyond. LLMOps, AI agents, 4 capstones, interview prep. $599 live or $399 recordings.",
    h1: "AI and MLOps course for engineers in the UK",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in London, Manchester, Edinburgh and across the UK. Production-first, and priced for individuals: $599 live or $399 recordings.",
    context: [
      "UK searches like \"AI bootcamp London\" and \"AI engineer course UK\" mostly lead to in-person bootcamps and university short courses. This course is online and built for working engineers who already code and want to move into MLOps, LLMOps or AI platform roles.",
      "Live classes run 8:00 to 9:45 PM India time, which is mid-afternoon in the UK. If you work office hours, the recordings plan lets you watch each class in the evening. The live plan adds 1:1 mentorship calls at a time that suits you.",
      "Many UK engineers look at MLOps contract roles as well as permanent jobs. The 4 capstone projects give you real production work to walk through in either kind of interview.",
    ],
    faqs: [
      {
        q: "What time are the live classes in the UK?",
        a: "Monday to Friday, mid-afternoon UK time (the table above shows the exact time this week). Every class is recorded.",
      },
      {
        q: "How much is the course in pounds?",
        a: "You pay in US dollars: $599 live or $399 recordings. Your card converts at the day's rate, so the amount in pounds moves a little with the exchange rate.",
      },
      {
        q: "Is this an AI bootcamp in London?",
        a: "It is online. You get the structure of a bootcamp (live classes, projects, mentoring and interview prep) without commuting to a classroom.",
      },
      COMPANY_FAQ("the UK"),
    ],
    companyPitch:
      "UK companies: hire me to build an AI agent or MLOps platform, or to train your team online. Work runs remotely across UK hours.",
    localSearches: [
      "AI bootcamp London",
      "AI bootcamp UK",
      "AI course in London",
      "AI engineer course UK",
      "MLOps jobs UK",
      "MLOps contractor",
      "AI consultant London",
      "hire AI experts UK",
    ],
    searchTerms: ["MLOps course UK", "MLOps training London", "LLMOps course Britain"],
  },
  {
    slug: "ireland",
    name: "Ireland",
    shortName: "Ireland",
    flag: "🇮🇪",
    hreflang: "en-IE",
    region: "europe",
    ...PRICE,
    salaryRange: "€55K–€95K+",
    timezoneNote:
      "Live classes are mid-afternoon Irish time, the same as the UK. Recordings cover every class.",
    hubCities: ["Dublin", "Cork", "Galway", "Limerick"],
    timeZones: [{ city: "Dublin", tz: "Europe/Dublin" }],
    seoTitle: "MLOps & AI Engineer Course Ireland (Live Online, Dublin)",
    metaDescription:
      "Online MLOps, LLMOps and AI agents course for engineers in Dublin, Cork and Galway. Production capstones and interview prep. $599 live or $399 recordings.",
    h1: "MLOps and AI engineer course for engineers in Ireland",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in Dublin, Cork, Galway and Limerick, taught by a working MLOps engineer.",
    context: [
      "Dublin hosts the European headquarters of many large tech and cloud companies, so platform and AI engineering roles there tend to ask for production experience, not just certificates. The capstones in this course are built to give you that experience to talk about.",
      "Live classes run 8:00 to 9:45 PM India time, which is mid-afternoon in Ireland. The recordings plan lets you watch after work; the live plan adds 1:1 mentorship calls at an Irish-friendly time.",
    ],
    faqs: [
      {
        q: "Can I join from Ireland if I work full time?",
        a: "Yes. Most of the work is hands-on labs you do in your own time. Take the recordings plan to watch classes in the evening, or the live plan for mentorship calls on top.",
      },
      {
        q: "How do I pay from Ireland?",
        a: "By card in US dollars through Razorpay: $599 live or $399 recordings. Your bank converts to euro at the day's rate.",
      },
      COMPANY_FAQ("Ireland"),
    ],
    companyPitch:
      "Irish teams: hire me to build an AI agent or MLOps platform, or to run online training for your engineers.",
    localSearches: [],
    searchTerms: ["MLOps course Ireland", "MLOps training Dublin", "AI engineer course Ireland"],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    shortName: "Netherlands",
    flag: "🇳🇱",
    hreflang: "en-NL",
    region: "europe",
    ...PRICE,
    salaryRange: "€55K–€100K+",
    timezoneNote:
      "Live classes are mid-to-late afternoon in the Netherlands. Recordings cover every class.",
    hubCities: ["Amsterdam", "Rotterdam", "Eindhoven", "Utrecht", "The Hague"],
    timeZones: [{ city: "Amsterdam", tz: "Europe/Amsterdam" }],
    seoTitle: "MLOps & AI Engineer Course Netherlands (English, Live Online)",
    metaDescription:
      "English-language online MLOps, LLMOps and AI agents course for engineers in Amsterdam, Eindhoven and Rotterdam. $599 live or $399 recordings.",
    h1: "MLOps and AI engineer course for engineers in the Netherlands",
    intro:
      "Live online MLOps, LLMOps and AI agents training in English for engineers in Amsterdam, Rotterdam, Eindhoven, Utrecht and The Hague.",
    context: [
      "English is the working language in many Dutch tech teams, so the whole course, including labs and interview prep, is in English. You build the same production systems those teams run: model pipelines, LLM apps with guardrails and AI agents with tools.",
      "Live classes run 8:00 to 9:45 PM India time, which is the afternoon in the Netherlands. Watch the recordings after work, or take the live plan for 1:1 mentorship at a time that suits you.",
    ],
    faqs: [
      {
        q: "Is the course in English or Dutch?",
        a: "English, from the first class to the final interview prep.",
      },
      {
        q: "How do I pay from the Netherlands?",
        a: "By card in US dollars through Razorpay: $599 live or $399 recordings. Your bank converts to euro at the day's rate.",
      },
      COMPANY_FAQ("the Netherlands"),
    ],
    companyPitch:
      "Dutch companies: hire me to build an AI agent or MLOps platform, or to train your engineers online in English.",
    localSearches: [],
    searchTerms: ["MLOps course Netherlands", "MLOps training Amsterdam", "LLMOps course Holland"],
  },
  {
    slug: "luxembourg",
    name: "Luxembourg",
    shortName: "Luxembourg",
    flag: "🇱🇺",
    hreflang: "en-LU",
    region: "europe",
    ...PRICE,
    salaryRange: "€65K–€120K+",
    timezoneNote: "Live classes are the afternoon in Luxembourg. Recordings cover every class.",
    hubCities: ["Luxembourg City", "Kirchberg", "Esch-sur-Alzette"],
    timeZones: [{ city: "Luxembourg City", tz: "Europe/Luxembourg" }],
    seoTitle: "MLOps & AI Training Luxembourg (English, Live Online)",
    metaDescription:
      "Online MLOps, LLMOps and AI agents training in English for engineers in Luxembourg's finance and tech sector. $599 live or $399 recordings.",
    h1: "MLOps and AI training for engineers in Luxembourg",
    intro:
      "Live online MLOps, LLMOps and AI agents training in English for engineers in Luxembourg City, Kirchberg and Esch-sur-Alzette.",
    context: [
      "Luxembourg's finance and fund sector runs on regulated, audited systems. The course covers the parts of MLOps that matter there: model versioning, reproducible pipelines, monitoring and drift alerts, plus guardrails and evaluation for LLM apps.",
      "Live classes run 8:00 to 9:45 PM India time, which is the afternoon in Luxembourg. Watch the recordings after work, or take the live plan for 1:1 mentorship.",
    ],
    faqs: [
      {
        q: "Does the course cover monitoring and audit needs for finance?",
        a: "Yes. Model versioning, experiment tracking, monitoring and drift detection are core modules, and the LLMOps part covers evaluation and guardrails.",
      },
      {
        q: "How do I pay from Luxembourg?",
        a: "By card in US dollars through Razorpay: $599 live or $399 recordings. Your bank converts to euro at the day's rate.",
      },
      COMPANY_FAQ("Luxembourg"),
    ],
    companyPitch:
      "Luxembourg firms: hire me to build an AI agent or MLOps platform, or to run online AI training for your team.",
    localSearches: [],
    searchTerms: ["MLOps course Luxembourg", "AI training Luxembourg", "MLOps engineer Luxembourg"],
  },
  {
    slug: "germany",
    name: "Germany",
    shortName: "Germany",
    flag: "🇩🇪",
    hreflang: "en-DE",
    region: "europe",
    ...PRICE,
    salaryRange: "€55K–€105K+",
    timezoneNote:
      "Live classes are the afternoon in Germany. The course is in English and every class is recorded.",
    hubCities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart"],
    timeZones: [{ city: "Berlin / Munich", tz: "Europe/Berlin" }],
    seoTitle: "MLOps & AI Engineer Course Germany (English, Online): Berlin, Munich",
    metaDescription:
      "English-language online MLOps, LLMOps and AI agents course for engineers in Berlin, Munich and Frankfurt. Kubernetes, MLflow, RAG, agents. $599 live.",
    h1: "MLOps and AI engineer course for engineers in Germany",
    intro:
      "Live online MLOps, LLMOps and AI agents training in English for engineers in Berlin, Munich, Frankfurt, Hamburg and Stuttgart.",
    context: [
      "Berlin startups, Munich's industrial and automotive companies and Frankfurt's banks all hire for MLOps and AI platform work, and many of those teams work in English. The course is taught in English and covers the stack those roles list: Docker, Kubernetes, MLflow, CI/CD for models, RAG and AI agents.",
      "If you are still learning Kubernetes, the early modules take you from containers to deploying and monitoring models on Kubernetes before moving to LLM systems.",
      "Live classes run 8:00 to 9:45 PM India time, which is the afternoon in Germany. Watch the recordings after work, or take the live plan for 1:1 mentorship.",
    ],
    faqs: [
      {
        q: "Is the course in English or German?",
        a: "English. Many tech teams in Germany work in English, and so do the interviews for most MLOps and AI platform roles there.",
      },
      {
        q: "Do I need Kubernetes experience first?",
        a: "No. The course starts with containers and builds up to running and monitoring models on Kubernetes.",
      },
      {
        q: "How do I pay from Germany?",
        a: "By card in US dollars through Razorpay: $599 live or $399 recordings. Your bank converts to euro at the day's rate.",
      },
      COMPANY_FAQ("Germany"),
    ],
    companyPitch:
      "German companies: hire me to build an AI agent or MLOps platform, or to train your team online in English.",
    localSearches: ["AI bootcamp Berlin", "AI bootcamp Germany", "MLOps jobs Berlin", "MLOps jobs Frankfurt", "kubernetes lernen"],
    searchTerms: ["MLOps course Germany", "MLOps training Berlin", "LLMOps course Deutschland"],
  },
  {
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    flag: "🇨🇦",
    hreflang: "en-CA",
    region: "north-america",
    ...PRICE,
    salaryRange: "CAD $95K–$180K+",
    timezoneNote:
      "Live classes are mid-morning in Toronto and early morning in Vancouver. Recordings cover every class.",
    hubCities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    timeZones: [
      { city: "Toronto / Montreal", tz: "America/Toronto" },
      { city: "Calgary", tz: "America/Edmonton" },
      { city: "Vancouver", tz: "America/Vancouver" },
    ],
    seoTitle: "AI Engineer & MLOps Course Canada (Live Online): Toronto, Vancouver",
    metaDescription:
      "Online AI engineer, MLOps and LLMOps course for engineers in Toronto, Vancouver and Montreal. 4 capstones, interview prep. $599 live or $399 recordings.",
    h1: "AI engineer and MLOps course for engineers in Canada",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in Toronto, Vancouver, Montreal, Calgary and Ottawa.",
    context: [
      "Toronto and Montreal are home to well-known AI research institutes, and Canadian companies now need engineers who can take models from research into production. This course is about that second part: pipelines, deployment, monitoring, LLM apps and agents that run reliably.",
      "Live classes run 8:00 to 9:45 PM India time, which is mid-morning in Toronto and early morning in Vancouver. The recordings plan lets you study on your own schedule.",
    ],
    faqs: [
      {
        q: "Is this an AI bootcamp in Toronto?",
        a: "It is online, so you can join from anywhere in Canada. You get live classes, projects, mentoring and interview prep without a classroom.",
      },
      {
        q: "How much does it cost in Canada?",
        a: "You pay in US dollars by card: $599 live or $399 recordings. Your bank converts to Canadian dollars at the day's rate.",
      },
      COMPANY_FAQ("Canada"),
    ],
    companyPitch:
      "Canadian companies: hire me to build an AI agent or MLOps platform, or to run online AI training for your engineering team.",
    localSearches: ["AI bootcamp Toronto", "AI bootcamp Canada", "AI engineer course Canada", "corporate AI training Toronto", "MLOps jobs Toronto"],
    searchTerms: ["MLOps course Canada", "MLOps training Toronto", "AI engineer course Canada"],
  },
  {
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    flag: "🇦🇺",
    hreflang: "en-AU",
    region: "apac",
    ...PRICE,
    salaryRange: "AUD $110K–$200K+",
    timezoneNote:
      "Live classes fall in the middle of the night in Australia, so the recordings plan plus 1:1 mentorship calls at an Australian-friendly time works best.",
    hubCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    timeZones: [
      { city: "Sydney / Melbourne", tz: "Australia/Sydney" },
      { city: "Brisbane", tz: "Australia/Brisbane" },
      { city: "Perth", tz: "Australia/Perth" },
    ],
    seoTitle: "AI Engineer & MLOps Course Australia (Online): Sydney, Melbourne",
    metaDescription:
      "Online AI engineer, MLOps and LLMOps course for engineers in Sydney, Melbourne, Brisbane and Perth. Recordings plus 1:1 mentorship. From $399.",
    h1: "AI engineer and MLOps course for engineers in Australia",
    intro:
      "Online MLOps, LLMOps and AI agents training for engineers in Sydney, Melbourne, Brisbane and Perth, built around recordings you watch on your schedule.",
    context: [
      "Live classes run 8:00 to 9:45 PM India time, which is the middle of the night on the east coast and late evening or night in Perth. So for most Australian engineers the recordings plan ($399) is the practical choice, and the live plan ($599) adds 1:1 mentorship calls booked at a time that suits Australian hours.",
      "The course is hands-on: you build and deploy model pipelines, LLM apps with evaluation and guardrails, and AI agents with tools, and finish with 4 capstone projects for your portfolio.",
    ],
    faqs: [
      {
        q: "Can I do the live classes from Australia?",
        a: "Only from Perth, late at night. On the east coast they fall between about midnight and 3 AM, so most people use the recordings and book mentorship calls in Australian hours.",
      },
      {
        q: "How much does it cost in Australia?",
        a: "You pay in US dollars by card: $399 recordings or $599 live with mentorship. Your bank converts to Australian dollars at the day's rate.",
      },
      COMPANY_FAQ("Australia"),
    ],
    companyPitch:
      "Australian companies: hire me to build an AI agent or MLOps platform. Work runs remotely with overlap in your afternoon.",
    localSearches: ["AI bootcamp Sydney", "AI bootcamp Melbourne", "AI course in Australia", "AI engineer course Australia", "AI consultant Sydney", "MLOps jobs Australia"],
    searchTerms: ["MLOps course Australia", "MLOps training Sydney", "LLMOps course Australia"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    shortName: "Singapore",
    flag: "🇸🇬",
    hreflang: "en-SG",
    region: "apac",
    ...PRICE,
    salaryRange: "S$90K–S$180K+",
    timezoneNote:
      "Live classes run 10:30 PM to 12:15 AM Singapore time. Recordings cover every class if that is too late.",
    hubCities: ["Singapore"],
    timeZones: [{ city: "Singapore", tz: "Asia/Singapore" }],
    seoTitle: "AI Engineer & MLOps Course Singapore (Live Online): LLMOps, Agentic AI",
    metaDescription:
      "Online AI engineer, MLOps, LLMOps and agentic AI course for engineers in Singapore. Live 10:30 PM SGT or recordings. $599 live or $399 recordings.",
    h1: "AI engineer, MLOps and agentic AI course for engineers in Singapore",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in Singapore's fintech, cloud and platform teams.",
    context: [
      "Many AI courses in Singapore are SkillsFuture-listed classroom programs. This is an independent online course for engineers who want depth: production MLOps, LLM apps with evaluation and guardrails, and AI agents with tools and memory.",
      "Live classes run 10:30 PM to 12:15 AM Singapore time. If that is too late, the recordings plan lets you study on your own schedule.",
    ],
    faqs: [
      {
        q: "Can I use SkillsFuture credits?",
        a: "No. This is an independent course, not listed on MySkillsFuture, so SkillsFuture credits can't be used. The fee is $599 live or $399 recordings, paid by card.",
      },
      {
        q: "What time are the live classes in Singapore?",
        a: "Monday to Friday, 10:30 PM to 12:15 AM SGT. Every class is recorded.",
      },
      COMPANY_FAQ("Singapore"),
    ],
    companyPitch:
      "Singapore companies: hire me to build an AI agent or MLOps platform, or to train your engineers online. Same-day overlap with Singapore hours.",
    localSearches: ["AI engineer course Singapore", "agentic AI course SkillsFuture", "AI course in Singapore", "AI bootcamp Singapore", "MLOps engineer Singapore"],
    searchTerms: ["MLOps course Singapore", "MLOps training APAC", "AI engineer Singapore"],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    shortName: "UAE",
    flag: "🇦🇪",
    hreflang: "en-AE",
    region: "gulf",
    ...PRICE,
    salaryRange: "AED 180K–350K+",
    timezoneNote:
      "Live classes run 6:30 to 8:15 PM UAE time, after work, Monday to Friday.",
    hubCities: ["Dubai", "Abu Dhabi", "Sharjah"],
    timeZones: [{ city: "Dubai / Abu Dhabi", tz: "Asia/Dubai" }],
    localFee: { live: "AED 2,200", recordings: "AED 1,465", currency: "AED" },
    seoTitle: "AI & MLOps Course in Dubai, UAE: Fees, Live Evening Classes Online",
    metaDescription:
      "Live online AI, MLOps, LLMOps and AI agents course for engineers in Dubai and Abu Dhabi. Classes 6:30 PM UAE time. About AED 2,200 live or AED 1,465 recordings.",
    h1: "AI and MLOps course for engineers in Dubai and the UAE",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in Dubai, Abu Dhabi and Sharjah, with classes at 6:30 PM UAE time, after work.",
    context: [
      "Many AI courses in Dubai teach general AI, Python or prompt engineering. This one is for engineers who want to run AI in production: model pipelines, deployment and monitoring, LLM apps with evaluation and guardrails, and AI agents that call real tools.",
      "Timing suits the UAE well. Live classes run 6:30 to 8:15 PM Gulf time, Monday to Friday, so you can join after work. Every class is also recorded.",
      "The fee is $599 for the live cohort (about AED 2,200) or $399 for recordings (about AED 1,465). The dirham is pegged to the US dollar, so the amount stays almost the same; your bank may add a small card fee.",
    ],
    faqs: [
      {
        q: "What are the AI course fees in Dubai?",
        a: "$599 live (about AED 2,200) with 1:1 mentorship, job assistance and interview prep, or $399 recordings (about AED 1,465) with lifetime access. You pay by card in US dollars.",
      },
      {
        q: "What time are the classes in the UAE?",
        a: "Monday to Friday, 6:30 to 8:15 PM UAE time. That is 8:00 to 9:45 PM in India.",
      },
      {
        q: "Is it a classroom course in Dubai?",
        a: "No, it is live online, so you can join from Dubai, Abu Dhabi, Sharjah or anywhere in the Gulf.",
      },
      {
        q: "Do you offer corporate AI training in the UAE?",
        a: "Yes. I run online AI, MLOps and AI agents training for engineering teams and build AI agents for companies. Send your team size and goals on the Hire me page.",
      },
    ],
    companyPitch:
      "UAE companies: hire me to build an AI agent, a RAG assistant or an MLOps platform, or book corporate AI training for your team. Gulf hours overlap with mine for most of the working day.",
    localSearches: [
      "AI course in Dubai",
      "AI course in Dubai fees",
      "AI course in Abu Dhabi",
      "AI course in UAE",
      "AI bootcamp Dubai",
      "corporate AI training UAE",
      "AI agent development company in Dubai",
      "kubernetes training Dubai",
      "MLOps jobs UAE",
    ],
    searchTerms: ["MLOps course UAE", "MLOps training Dubai", "AI engineer course Middle East"],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    shortName: "Saudi Arabia",
    flag: "🇸🇦",
    hreflang: "en-SA",
    region: "gulf",
    ...PRICE,
    timezoneNote:
      "Live classes run 5:30 to 7:15 PM Saudi time, after work, Monday to Friday.",
    hubCities: ["Riyadh", "Jeddah", "Dammam", "Al Khobar"],
    timeZones: [{ city: "Riyadh / Jeddah", tz: "Asia/Riyadh" }],
    localFee: { live: "SAR 2,245", recordings: "SAR 1,495", currency: "SAR" },
    seoTitle: "AI & MLOps Course in Riyadh, Saudi Arabia: Live Online Evening Classes",
    metaDescription:
      "Live online AI, MLOps, LLMOps and AI agents course for engineers in Riyadh, Jeddah and Dammam. Classes 5:30 PM Saudi time. About SAR 2,245 live.",
    h1: "AI and MLOps course for engineers in Saudi Arabia",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in Riyadh, Jeddah, Dammam and Al Khobar, with classes at 5:30 PM Saudi time.",
    context: [
      "Vision 2030 has made AI and data a national priority in Saudi Arabia, and teams across government, energy, banking and telecom now need engineers who can run AI systems in production, not just build demos. This course teaches exactly that: pipelines, deployment, monitoring, LLM apps and AI agents.",
      "Live classes run 5:30 to 7:15 PM Saudi time, Monday to Friday, so you can join after work. Every class is also recorded.",
      "The fee is $599 for the live cohort (about SAR 2,245) or $399 for recordings (about SAR 1,495). The riyal is pegged to the US dollar, so the amount stays almost the same; your bank may add a small card fee.",
    ],
    faqs: [
      {
        q: "Is there an AI or MLOps course in Riyadh I can take after work?",
        a: "Yes, online. Live classes run 5:30 to 7:15 PM Saudi time, Monday to Friday, and every class is recorded.",
      },
      {
        q: "How much does it cost in Saudi riyals?",
        a: "About SAR 2,245 for the live cohort ($599) or SAR 1,495 for recordings ($399). You pay by card in US dollars.",
      },
      {
        q: "Is the course in English or Arabic?",
        a: "English. The tools, documentation and most technical interviews in the field are in English too.",
      },
      COMPANY_FAQ("Saudi Arabia"),
    ],
    companyPitch:
      "Saudi companies and agencies: hire me to build an AI agent or MLOps platform, or book online AI training for your engineering team.",
    localSearches: ["AI course in Riyadh"],
    searchTerms: ["MLOps course Saudi Arabia", "AI course Riyadh", "AI training Saudi Arabia", "LLMOps course KSA"],
  },
  {
    slug: "qatar",
    name: "Qatar",
    shortName: "Qatar",
    flag: "🇶🇦",
    hreflang: "en-QA",
    region: "gulf",
    ...PRICE,
    timezoneNote:
      "Live classes run 5:30 to 7:15 PM Doha time, after work, Monday to Friday.",
    hubCities: ["Doha", "Lusail", "Al Rayyan"],
    timeZones: [{ city: "Doha", tz: "Asia/Qatar" }],
    localFee: { live: "QAR 2,180", recordings: "QAR 1,450", currency: "QAR" },
    seoTitle: "AI & MLOps Course in Qatar (Doha): Live Online Evening Classes",
    metaDescription:
      "Live online AI, MLOps, LLMOps and AI agents course for engineers in Doha and across Qatar. Classes 5:30 PM Doha time. About QAR 2,180 live.",
    h1: "AI and MLOps course for engineers in Qatar",
    intro:
      "Live online MLOps, LLMOps and AI agents training for engineers in Doha, Lusail and Al Rayyan, with classes at 5:30 PM Doha time.",
    context: [
      "Qatar has a national AI strategy and growing AI work in government, energy, finance and aviation. This course is for engineers who want to run AI in production there: model pipelines, deployment and monitoring, LLM apps with guardrails, and AI agents that use real tools.",
      "Live classes run 5:30 to 7:15 PM Doha time, Monday to Friday, so you can join after work. Every class is also recorded.",
      "The fee is $599 for the live cohort (about QAR 2,180) or $399 for recordings (about QAR 1,450). The riyal is pegged to the US dollar, so the amount stays almost the same; your bank may add a small card fee.",
    ],
    faqs: [
      {
        q: "Is there an AI course in Qatar I can take after work?",
        a: "Yes, online. Live classes run 5:30 to 7:15 PM Doha time, Monday to Friday, and every class is recorded.",
      },
      {
        q: "How much does it cost in Qatari riyals?",
        a: "About QAR 2,180 for the live cohort ($599) or QAR 1,450 for recordings ($399). You pay by card in US dollars.",
      },
      COMPANY_FAQ("Qatar"),
    ],
    companyPitch:
      "Qatari companies: hire me to build an AI agent or MLOps platform, or book online AI training for your engineers.",
    localSearches: ["AI course in Qatar"],
    searchTerms: ["MLOps course Qatar", "AI course Doha", "AI training Qatar", "LLMOps course Doha"],
  },
];

export const INTL_MARKET_BY_SLUG = Object.fromEntries(
  INTL_MARKETS.map((m) => [m.slug, m]),
) as Record<IntlMarketSlug, IntlMarket>;

export const PRIMARY_INTL_SLUGS: IntlMarketSlug[] = ["usa", "uk", "uae", "saudi-arabia", "qatar", "singapore"];

export { LIVE_CLASS_UTC, TIMEZONE_TO_MARKET, liveClassTimes } from "@/lib/market-zones";

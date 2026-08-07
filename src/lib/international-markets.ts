/** Target markets for international SEO — USA, UK, EU hubs, and global IT centers. */
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
  | "uae";

export type IntlMarket = {
  slug: IntlMarketSlug;
  name: string;
  shortName: string;
  flag: string;
  hreflang: string;
  currency: "USD" | "GBP" | "EUR";
  priceLive: string;
  priceRecordings: string;
  salaryRange: string;
  timezoneNote: string;
  hubCities: string[];
  searchTerms: string[];
};

export const INTL_MARKETS: IntlMarket[] = [
  {
    slug: "usa",
    name: "United States",
    shortName: "USA",
    flag: "🇺🇸",
    hreflang: "en-US",
    currency: "USD",
    priceLive: "$450",
    priceRecordings: "$340",
    salaryRange: "$120K–$220K+",
    timezoneNote: "Live sessions at India evening time — morning US East / late night US West. Recordings for self-paced.",
    hubCities: ["San Francisco", "Seattle", "Austin", "New York", "Boston"],
    searchTerms: ["MLOps course USA", "MLOps training United States", "LLMOps course America"],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    shortName: "UK",
    flag: "🇬🇧",
    hreflang: "en-GB",
    currency: "GBP",
    priceLive: "£360",
    priceRecordings: "£270",
    salaryRange: "£55K–£110K+",
    timezoneNote: "Evening IST batches map to UK afternoon/evening. Full recordings if you are on GMT/BST.",
    hubCities: ["London", "Manchester", "Edinburgh", "Cambridge", "Bristol"],
    searchTerms: ["MLOps course UK", "MLOps training London", "LLMOps course Britain"],
  },
  {
    slug: "ireland",
    name: "Ireland",
    shortName: "Ireland",
    flag: "🇮🇪",
    hreflang: "en-IE",
    currency: "EUR",
    priceLive: "€420",
    priceRecordings: "€315",
    salaryRange: "€55K–€95K+",
    timezoneNote: "Ideal for Dublin and Cork tech workers — same evening window as UK with IST live classes.",
    hubCities: ["Dublin", "Cork", "Galway", "Limerick"],
    searchTerms: ["MLOps course Ireland", "MLOps training Dublin", "AI engineer course Ireland"],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    shortName: "Netherlands",
    flag: "🇳🇱",
    hreflang: "en-NL",
    currency: "EUR",
    priceLive: "€420",
    priceRecordings: "€315",
    salaryRange: "€55K–€100K+",
    timezoneNote: "Amsterdam, Rotterdam and Eindhoven engineers join online — English-medium instruction throughout.",
    hubCities: ["Amsterdam", "Rotterdam", "Eindhoven", "Utrecht", "The Hague"],
    searchTerms: ["MLOps course Netherlands", "MLOps training Amsterdam", "LLMOps course Holland"],
  },
  {
    slug: "luxembourg",
    name: "Luxembourg",
    shortName: "Luxembourg",
    flag: "🇱🇺",
    hreflang: "en-LU",
    currency: "EUR",
    priceLive: "€420",
    priceRecordings: "€315",
    salaryRange: "€65K–€120K+",
    timezoneNote: "Finance and EU tech hub — live online training with CET-friendly recordings.",
    hubCities: ["Luxembourg City", "Kirchberg", "Esch-sur-Alzette"],
    searchTerms: ["MLOps course Luxembourg", "AI training Luxembourg", "MLOps engineer Luxembourg"],
  },
  {
    slug: "germany",
    name: "Germany",
    shortName: "Germany",
    flag: "🇩🇪",
    hreflang: "en-DE",
    currency: "EUR",
    priceLive: "€420",
    priceRecordings: "€315",
    salaryRange: "€55K–€105K+",
    timezoneNote: "Berlin, Munich, Frankfurt teams — course delivered in English for international tech roles.",
    hubCities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart"],
    searchTerms: ["MLOps course Germany", "MLOps training Berlin", "LLMOps course Deutschland"],
  },
  {
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    flag: "🇨🇦",
    hreflang: "en-CA",
    currency: "USD",
    priceLive: "$450",
    priceRecordings: "$340",
    salaryRange: "CAD $95K–$180K+",
    timezoneNote: "Toronto and Vancouver professionals — live cohort with North America-friendly recordings.",
    hubCities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    searchTerms: ["MLOps course Canada", "MLOps training Toronto", "AI engineer course Canada"],
  },
  {
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    flag: "🇦🇺",
    hreflang: "en-AU",
    currency: "USD",
    priceLive: "$450",
    priceRecordings: "$340",
    salaryRange: "AUD $110K–$200K+",
    timezoneNote: "Sydney and Melbourne — primarily recordings + mentorship; live Q&A in flexible slots.",
    hubCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    searchTerms: ["MLOps course Australia", "MLOps training Sydney", "LLMOps course Australia"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    shortName: "Singapore",
    flag: "🇸🇬",
    hreflang: "en-SG",
    currency: "USD",
    priceLive: "$450",
    priceRecordings: "$340",
    salaryRange: "S$90K–S$180K+",
    timezoneNote: "APAC fintech and cloud hub — evening IST aligns well with Singapore night learners.",
    hubCities: ["Singapore"],
    searchTerms: ["MLOps course Singapore", "MLOps training APAC", "AI engineer Singapore"],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    shortName: "UAE",
    flag: "🇦🇪",
    hreflang: "en-AE",
    currency: "USD",
    priceLive: "$450",
    priceRecordings: "$340",
    salaryRange: "AED 180K–350K+",
    timezoneNote: "Dubai and Abu Dhabi — Gulf timezone friendly with live evening batches.",
    hubCities: ["Dubai", "Abu Dhabi"],
    searchTerms: ["MLOps course UAE", "MLOps training Dubai", "AI engineer course Middle East"],
  },
];

export const INTL_MARKET_BY_SLUG = Object.fromEntries(
  INTL_MARKETS.map((m) => [m.slug, m]),
) as Record<IntlMarketSlug, IntlMarket>;

export const PRIMARY_INTL_SLUGS: IntlMarketSlug[] = [
  "usa",
  "uk",
  "ireland",
  "netherlands",
  "luxembourg",
];

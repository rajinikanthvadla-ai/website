/** Forward Deployed AI Engineering: 8-week live cohort content. */

export const FDE_COURSE = {
  slug: "fde",
  path: "/courses/fde/",
  title: "Forward Deployed AI Engineering: From Customer Problem to Production",
  shortTitle: "Forward Deployed AI Engineering",
  tagline: "Own the customer outcome, from discovery to production handoff.",
  heroSub:
    "An 8-week live cohort with Rajinikanth Vadla. You run one incomplete customer brief (incident triage) through discovery, build, messy integrations, evals, security and cost tradeoffs, a mock stakeholder review, and a reusable playbook you can show in interviews.",
  duration: "8 weeks",
  startDate: "7 December 2026",
  startDateIso: "2026-12-07",
  startDay: "Monday",
  classTime: "7:00-8:30 AM IST",
  classDays: "Mon / Wed / Fri",
  sessions: "Mon / Wed / Fri, 7:00-8:30 AM IST (90 minutes)",
  clinic: "Weekly project clinic (Saturday morning)",
  seats: "12 to 15 learners",
  earlyBirdSeats: "First 8 seats",
  format: "Live online, recordings included",
  endsApprox: "Ends around late January 2027",
  priceInr: 36999,
  priceDisplay: "₹36,999",
  earlyBirdInr: 32000,
  earlyBirdDisplay: "₹32,000",
  earlyBirdNote: "Early bird: pay by Sun 6 Dec, 11:59 PM IST",
  earlyBirdDeadline: "Sunday 6 December, 11:59 PM IST",
  earlyBirdRule:
    "Early bird ₹32,000 if you pay by Sunday 6 December, 11:59 PM IST (first 8 seats). From Monday 7 December the fee is ₹36,999.",
  demoDate: "Sunday 6 December 2026",
  demoShort: "Sun 6 Dec",
  demoTime: "11:00 AM IST",
  demoStartIso: "2026-12-06T11:00:00+05:30",
  demoEndIso: "2026-12-06T12:00:00+05:30",
  demoPlatform: "Zoom",
  demoLength: "60 minutes",
  priceNote: "Same full syllabus at both prices. Recordings and weekly clinic included.",
  prerequisite: "Python and API basics. You already know how to code.",
  positioning:
    "This is hands-on FDE project training for engineers who already code. It is not a promise that finishing one cohort makes you hire-ready for every OpenAI or Palantir FDE posting. Those roles still expect serious engineering experience. What you leave with is a graded delivery loop, a working demo, and a playbook.",
  caseStudyTitle: "Cohort case: enterprise incident triage assistant",
  caseStudy:
    "Day one you get a short, incomplete customer brief for an internal incident triage workflow. Requirements are missing on purpose. You ask discovery questions, map the workflow, scope a small first release, build against messy sample data and flaky APIs, evaluate quality, defend cost and security choices, then present to a mock customer and security reviewer.",
} as const;

export const FDE_PROOF = [
  { label: "Starts", value: "7 Dec 2026 · Mon" },
  { label: "Morning IST", value: "7:00-8:30 AM" },
  { label: "Days", value: "Mon / Wed / Fri" },
  { label: "You ship", value: "Demo + playbook" },
] as const;

export const FDE_INCLUDES = [
  { label: "Delivery loop", value: "Full FDE cycle" },
  { label: "Live time", value: "24 x 90 min" },
  { label: "Clinic", value: "Weekly reviews" },
  { label: "Hardening", value: "Security + cost caps" },
  { label: "Portfolio", value: "Demo + playbook" },
  { label: "Access", value: "Recordings kept" },
] as const;

export const FDE_WHAT_IS = {
  title: "What a Forward Deployed Engineer actually does",
  body: "An FDE embeds with a customer, finds a high-value workflow, scopes a first win, builds inside their systems, gets it into production, measures impact, and turns that work into a reusable pattern. Companies hiring FDEs (including product labs and consulting pods) screen for that loop, not for watching twenty tool tutorials.",
  points: [
    "Talk to messy stakeholders and write a measurable success definition",
    "Scope a small first release under constraints, not a fantasy roadmap",
    "Ship working software with LLMs, RAG, tools, or agents as needed",
    "Integrate auth, permissions, audit trails, and enterprise data paths",
    "Evaluate quality with a real test set and human review",
    "Defend latency, cost, security, fallback, and incident handling",
    "Handover with a runbook and a playbook the next team can reuse",
  ],
} as const;

export const FDE_FOR_YOU = [
  {
    role: "Backend and full-stack engineers",
    gain: "Move from ticket features to customer-facing AI delivery: discovery, scope, and handover.",
  },
  {
    role: "ML and GenAI engineers",
    gain: "Practice putting LLM workflows into real systems with evals, access control, and production readiness.",
  },
  {
    role: "DevOps and platform engineers",
    gain: "Learn the customer side of AI delivery without drowning in every new agent framework.",
  },
  {
    role: "Solutions and consulting engineers",
    gain: "Tighten the path from unclear requirements to a deployable first release and a reusable pattern.",
  },
] as const;

export const FDE_NOT_FOR = [
  "Absolute beginners who still need Python from zero",
  "People who only want recorded tool walkthroughs with no live critique",
  "Anyone expecting a guaranteed FDE job offer after eight weeks",
] as const;

export const FDE_WEEKS = [
  {
    week: 1,
    focus:
      "What FDEs do in the field. Customer discovery. Map the incident triage workflow. Define the problem, constraints, and a measurable success metric. Practice stakeholder questions when the brief is incomplete.",
    output: "Customer brief, workflow map, and success measure",
  },
  {
    week: 2,
    focus:
      "Scope a small first release. Data and system discovery. Architecture choices and risks. Delivery plan with what is in and out of scope for v1.",
    output: "Technical plan, risk list, and system diagram",
  },
  {
    week: 3,
    focus:
      "Build the application foundation with Python, APIs, and a simple UI. Work against incomplete fixtures and a flaky sample API so the build feels like a real account, not a tutorial repo.",
    output: "Working application skeleton on messy inputs",
  },
  {
    week: 4,
    focus:
      "Add the LLM workflow for incident triage: prompting, retrieval, tools, or a light agent path based on the use case. Keep the customer outcome ahead of framework hopping.",
    output: "End-to-end AI prototype for the case",
  },
  {
    week: 5,
    focus:
      "Connect enterprise-style systems and data. Authentication, permissions, audit trail. Draft a security and compliance checklist: PII handling, prompt injection risks, and access boundaries.",
    output: "Integrated build + security checklist",
  },
  {
    week: 6,
    focus:
      "Test and evaluate with a representative incident test set. Quality measures, failure cases, human review. Start a cost and latency tradeoff sheet (model choice, tokens, caching, when not to call an LLM).",
    output: "Evaluation report + cost and latency sheet",
  },
  {
    week: 7,
    focus:
      "Production readiness: deployment plan, observability, latency, cost, security, fallback, and incident handling. Kubernetes and cloud stay supporting topics. Finish the cost sheet and harden the security checklist.",
    output: "Deployable release plan with monitoring notes",
  },
  {
    week: 8,
    focus:
      "Customer demo, feedback, and iteration. Mock stakeholder and security review. Handover pack. Codify a reusable delivery playbook so the next engagement starts faster.",
    output: "Final demo, runbook, playbook, and review notes",
  },
] as const;

export const FDE_CAPS = [
  {
    title: "Messy data and flaky APIs",
    body: "Weeks 3 to 5 use incomplete fixtures and unreliable sample APIs so you practice debugging reality, not a polished starter kit.",
  },
  {
    title: "Security and compliance checklist",
    body: "Graded artifact covering PII, access control, audit trail, and prompt injection boundaries before you claim production readiness.",
  },
  {
    title: "Cost and latency tradeoffs",
    body: "Written sheet for model choice, token cost, caching, and when a rule or search path beats an LLM call.",
  },
  {
    title: "Mock stakeholder and security review",
    body: "Week 8 you defend the demo to a mock customer and a security-minded reviewer, the way field delivery actually gets blocked or approved.",
  },
  {
    title: "Reusable FDE playbook",
    body: "Final graded asset: what to reuse on the next account. This is the differentiator most agent courses skip.",
  },
] as const;

export const FDE_FINAL_REQUIREMENTS = [
  "Working demo of the incident triage use case",
  "Architecture diagram and delivery notes",
  "Evaluation evidence (test set and quality notes)",
  "Security and compliance checklist",
  "Cost and latency tradeoff sheet",
  "Deployment and monitoring plan",
  "Handover runbook for the mock customer",
  "Reusable delivery playbook for the next engagement",
] as const;

export const FDE_TEACHING = [
  {
    title: "One customer case all the way",
    body: "Incomplete brief on day one. Discovery, constraints, small first release, build, sample-case testing, then a mock customer demo.",
  },
  {
    title: "Grade the output, not attendance",
    body: "Each week you ship an artifact. The clinic reviews tradeoffs and gaps the same way field delivery gets reviewed.",
  },
  {
    title: "Tools support the outcome",
    body: "Kubernetes and cloud stay supporting topics. The main skill is owning the customer result and making the pattern reusable.",
  },
] as const;

export const FDE_COMPARE = [
  {
    title: "Vs random YouTube agent tutorials",
    body: "Tutorials show tools. This cohort grades discovery, evals, security, cost, handover, and a playbook on one continuous case.",
  },
  {
    title: "Vs the AI Automation course (₹20,000)",
    body: "Automation focuses on company agents and tooling over two months. FDE focuses on the customer delivery loop for eight intense weeks.",
  },
  {
    title: "Vs the Masterclass (₹40,000 live)",
    body: "Masterclass is the longer AI Platform Engineering path (MLOps, AIOps, LLMOps, Agents, FDE). This FDE cohort is a focused delivery project track.",
  },
] as const;

export const FDE_DEMO_AGENDA = [
  "What a Forward Deployed Engineer really does, with real job posts",
  "A live mini case: a messy customer brief turned into a scoped first release",
  "How the 8 weeks run and exactly what you ship by the end",
  "Your questions, answered live",
] as const;

export const FDE_ENROL_STEPS = [
  "Join the free demo on Sunday, or message Rajinikanth on WhatsApp.",
  "Confirm your seat on WhatsApp, directly with Rajinikanth.",
  "Pay by Sunday 6 December, 11:59 PM IST for the ₹32,000 early bird (first 8 seats). After that the fee is ₹36,999.",
  "Get the Zoom link for class 1 before Monday 7 December, 7:00 AM IST.",
] as const;

export const FDE_FAQS = [
  {
    q: "Is the demo really free? Do I pay anything to attend?",
    a: "Yes, it is free. The demo is on Zoom on Sunday 6 December 2026 at 11:00 AM IST and runs about 60 minutes. Register on this page and the Zoom link is sent to your WhatsApp. You pay only if you decide to join the cohort.",
  },
  {
    q: "When does the early bird price end?",
    a: "Early bird is ₹32,000 if you pay by Sunday 6 December, 11:59 PM IST, for the first 8 seats. From Monday 7 December the fee is ₹36,999. Same syllabus, same live classes, same recordings at both prices.",
  },
  {
    q: "What if I cannot attend the demo?",
    a: "Register anyway and message on WhatsApp. You can still ask your questions there and join the cohort, which starts Monday 7 December 2026 at 7:00 AM IST.",
  },
  {
    q: "What if I join and then cannot continue?",
    a: "Fees are not refunded in cash once paid, but you can move your seat to a later batch at no extra cost. Message on WhatsApp before you stop attending. The full rules are on the refund policy page.",
  },
  {
    q: "What is Forward Deployed AI Engineering?",
    a: "It is customer-facing AI delivery: discover a workflow, scope a first release, build with LLMs where they help, integrate with real systems, evaluate quality, prepare production, and hand over a runbook plus a reusable playbook.",
  },
  {
    q: "Will this make me job-ready for every FDE role?",
    a: "No. Many FDE postings still ask for substantial engineering experience plus customer-facing delivery. This course is project training for engineers who already code. Use the portfolio demo, evals, and playbook in interviews. Do not treat a certificate alone as a job guarantee.",
  },
  {
    q: "What are the prerequisites?",
    a: "Python and API basics. You should be comfortable writing and debugging code. We do not teach programming from zero.",
  },
  {
    q: "Live, recorded, or both?",
    a: "Live first. Sessions are recorded and included. FDE work needs communication, unclear requirements, and feedback, taught through role-play, project reviews, and live debugging.",
  },
  {
    q: "How much time per week?",
    a: "Three 90-minute live sessions plus a project clinic, and enough time between sessions to finish that week's graded artifact. Plan for serious project work.",
  },
  {
    q: "What do I get at the end?",
    a: "A graded final package: working demo, architecture, evaluation evidence, security checklist, cost sheet, deployment plan, handover runbook, and reusable playbook.",
  },
  {
    q: "When does the first cohort start, and what is the class time?",
    a: "First cohort starts Monday, 7 December 2026. Live classes are Mon / Wed / Fri, 7:00-8:30 AM IST, plus a Saturday morning project clinic. Recordings are included if you miss a session. The cohort runs about 8 weeks (into late January 2027), with lighter catch-up around Christmas and New Year.",
  },
  {
    q: "Who teaches the cohort?",
    a: "Rajinikanth Vadla teaches live. You get weekly project clinics and direct feedback on your artifacts, not only pre-recorded videos.",
  },
] as const;

export const FDE_RELATED_LINKS = [
  { href: "/roadmap/fde-engineer/", label: "FDE career roadmap" },
  { href: "/mlops-aiops-masterclass/", label: "AI Platform Engineering masterclass" },
  { href: "/courses/ai-automation/", label: "AI Automation course" },
  { href: "/syllabus/", label: "Full syllabus hub" },
  { href: "/interview-questions/", label: "AI interview questions" },
  { href: "/blog/forward-deployed-ai-engineering-course-india/", label: "FDE course guide (blog)" },
  { href: "/enroll/", label: "All enroll options" },
] as const;

export const FDE_SEO_BLOCK = {
  heading: "FDE course in India: what you are buying",
  paragraphs: [
    "If you searched for an FDE course, Forward Deployed Engineering course, or Forward Deployed AI Engineer training in India, this page is the live cohort offer from Rajinikanth Vadla.",
    "The first cohort starts Monday, 7 December 2026, at 7:00-8:30 AM IST on Monday, Wednesday, and Friday, plus a Saturday morning project clinic. Eight weeks total. You work one incomplete customer brief for an enterprise incident triage assistant from discovery through production readiness, including security and cost tradeoffs, a mock stakeholder review, and a reusable delivery playbook.",
    "Early bird is ₹32,000 for the first eight seats. Regular fee is ₹36,999. Prerequisite is Python and API basics. For the free FDE career map, see the Forward Deployed Engineer roadmap. For a longer MLOps through FDE path, see the masterclass.",
  ],
} as const;

export const FDE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `https://rajinikanthvadla.com${FDE_COURSE.path}#course`,
  name: FDE_COURSE.title,
  alternateName: [
    "FDE Course",
    "Forward Deployed Engineering Course",
    "Forward Deployed AI Engineer Training",
    "FDE Training India",
  ],
  description:
    "8-week live Forward Deployed AI Engineering cohort by Rajinikanth Vadla. Starts 7 December 2026, Mon/Wed/Fri 7:00-8:30 AM IST. Customer discovery to production on an incident triage case with evals, security, cost, mock review, and playbook. Early bird ₹32,000; regular ₹36,999.",
  url: `https://rajinikanthvadla.com${FDE_COURSE.path}`,
  image: "https://rajinikanthvadla.com/assets/og-image.jpg",
  courseMode: "online",
  isAccessibleForFree: false,
  inLanguage: "en",
  educationalLevel: "Professional",
  timeRequired: "P8W",
  learningResourceType: "Course",
  teaches: [
    "Forward Deployed Engineering",
    "FDE",
    "Customer discovery",
    "Incident triage AI",
    "RAG",
    "AI agents",
    "LLM evaluation",
    "Enterprise integration",
    "AI security checklist",
    "LLM cost and latency tradeoffs",
    "Production readiness",
    "AI handover and runbooks",
    "Reusable delivery playbooks",
  ],
  about: [
    { "@type": "Thing", name: "Forward Deployed Engineer" },
    { "@type": "Thing", name: "Generative AI" },
    { "@type": "Thing", name: "Enterprise AI delivery" },
  ],
  provider: {
    "@type": "Organization",
    name: "Rajinikanth Vadla Training",
    url: "https://rajinikanthvadla.com/",
    sameAs: [
      "https://www.youtube.com/@IamRajinikanthvadla",
      "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
    ],
  },
  instructor: {
    "@type": "Person",
    name: "Rajinikanth Vadla",
    url: "https://rajinikanthvadla.com/",
    sameAs: [
      "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
      "https://www.youtube.com/@IamRajinikanthvadla",
    ],
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    name: "Live FDE Cohort: First Batch",
    courseMode: "online",
    inLanguage: "en",
    startDate: FDE_COURSE.startDateIso,
    endDate: "2027-01-30",
    duration: "P8W",
    courseWorkload: "PT36H",
    location: {
      "@type": "VirtualLocation",
      url: `https://rajinikanthvadla.com${FDE_COURSE.path}`,
    },
    instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
    offers: [
      {
        "@type": "Offer",
        name: "Early bird",
        availability: "https://schema.org/LimitedAvailability",
        price: String(FDE_COURSE.earlyBirdInr),
        priceCurrency: "INR",
        priceValidUntil: "2026-12-06",
        url: `https://rajinikanthvadla.com${FDE_COURSE.path}`,
        category: "Early bird",
        description:
          "Pay by Sunday 6 December 2026, 11:59 PM IST (first 8 seats). Live sessions, recordings, weekly clinic, graded projects including security, cost, and playbook caps.",
      },
      {
        "@type": "Offer",
        name: "Regular cohort fee",
        availability: "https://schema.org/InStock",
        price: String(FDE_COURSE.priceInr),
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        url: `https://rajinikanthvadla.com${FDE_COURSE.path}`,
        description:
          "Regular fee after early bird. Same live format and full syllabus with security, cost, and playbook caps.",
      },
    ],
  },
  offers: {
    "@type": "AggregateOffer",
    availability: "https://schema.org/LimitedAvailability",
    lowPrice: String(FDE_COURSE.earlyBirdInr),
    highPrice: String(FDE_COURSE.priceInr),
    priceCurrency: "INR",
    offerCount: "2",
    url: `https://rajinikanthvadla.com${FDE_COURSE.path}`,
  },
} as const;

/** The free Zoom demo, so search engines can show it as an online event. */
export const FDE_DEMO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "@id": `https://rajinikanthvadla.com${FDE_COURSE.path}#demo`,
  name: "Free live demo: Forward Deployed AI Engineering",
  description:
    "Free 60-minute live demo on Zoom with Rajinikanth Vadla: what a Forward Deployed Engineer does, a live mini customer case, and how the 8-week FDE cohort runs.",
  startDate: FDE_COURSE.demoStartIso,
  endDate: FDE_COURSE.demoEndIso,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: { "@type": "VirtualLocation", url: `https://rajinikanthvadla.com${FDE_COURSE.path}#demo` },
  image: "https://rajinikanthvadla.com/assets/og-image.jpg",
  isAccessibleForFree: true,
  inLanguage: "en",
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: `https://rajinikanthvadla.com${FDE_COURSE.path}#demo`,
    validFrom: "2026-11-26T00:00:00+05:30",
  },
  organizer: { "@type": "Person", name: "Rajinikanth Vadla", url: "https://rajinikanthvadla.com/" },
  performer: { "@type": "Person", name: "Rajinikanth Vadla" },
} as const;

export const FDE_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `https://rajinikanthvadla.com${FDE_COURSE.path}#webpage`,
  url: `https://rajinikanthvadla.com${FDE_COURSE.path}`,
  name: "Forward Deployed AI Engineering Course (FDE) | Rajinikanth Vadla",
  description:
    "Live FDE course in India by Rajinikanth Vadla. Eight weeks from customer problem to production. Early bird ₹32,000, regular ₹36,999.",
  isPartOf: { "@type": "WebSite", name: "Rajinikanth Vadla", url: "https://rajinikanthvadla.com/" },
  about: { "@id": `https://rajinikanthvadla.com${FDE_COURSE.path}#course` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://rajinikanthvadla.com/assets/og-image.jpg",
  },
  inLanguage: "en",
} as const;

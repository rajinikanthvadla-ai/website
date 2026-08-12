export type ResumeServiceTier = {
  id: string;
  name: string;
  /** INR price shown to India visitors */
  price: string;
  /** USD price shown to international visitors */
  priceUsd: string;
  /** Discounted INR price for verified students/freshers */
  studentPrice: string;
  priceNote: string;
  turnaround: string;
  features: string[];
  recommended?: boolean;
};

export const RESUME_SERVICE_TIERS: ResumeServiceTier[] = [
  {
    id: "review",
    name: "Resume Review",
    price: "₹1,999",
    priceUsd: "$49",
    studentPrice: "₹1,999",
    priceNote: "one-time",
    turnaround: "3 days",
    features: [
      "Detailed review of your current resume",
      "Role-specific feedback (MLOps, LLMOps, AI Engineer, etc.)",
      "ATS keyword gap analysis",
      "Bullet rewrite suggestions (10 bullets)",
      "Written report with action items",
    ],
  },
  {
    id: "rewrite",
    name: "Full Resume Rewrite",
    price: "₹4,999",
    priceUsd: "$149",
    studentPrice: "₹3,499",
    priceNote: "one-time",
    turnaround: "5 days",
    recommended: true,
    features: [
      "Complete rewrite for one target role",
      "ATS-optimized bullet points (all sections)",
      "Project section with measurable impact",
      "Skills section tuned to job descriptions",
      "LinkedIn headline + about rewrite",
      "2 revision rounds included",
      "30-min call to walk through changes",
    ],
  },
  {
    id: "career",
    name: "Career Package",
    price: "₹9,999",
    priceUsd: "$299",
    studentPrice: "₹6,999",
    priceNote: "one-time",
    turnaround: "10 days",
    features: [
      "Everything in Full Rewrite",
      "Resume + cover letter + LinkedIn full rewrite",
      "3 role-specific resume variants (MLOps, LLMOps, AI Engineer)",
      "Portfolio project writeups (3 projects)",
      "Interview prep cheat sheet for target role",
      "Mock interview (45 min) with feedback",
      "60 days of WhatsApp Q&A support",
    ],
  },
];

export const RESUME_SERVICE_FAQS = [
  {
    q: "Do you write resumes for freshers?",
    a: "Yes. We rewrite resumes for freshers, career changers, and senior engineers. For freshers we emphasize projects, capstones, and transferable skills — not fake experience. Verified students (with a .edu / .ac.in email or student ID) get 30% off the Full Rewrite and Career Package.",
  },
  {
    q: "Which roles do you cover?",
    a: "MLOps, LLMOps, AI Engineer, ML Engineer, Data Scientist, Data Engineer, DevOps, Platform Engineer, AI Infrastructure, Cloud Engineer, GenAI Engineer, NLP Engineer, and SRE. Each role has a dedicated resume page on this site.",
  },
  {
    q: "Can I get a resume for a role I don't have experience in?",
    a: "We don't fabricate experience. We reframe what you have — projects, courses, transferable work — to align with the target role. For full career switches, the Career Package includes a learning plan.",
  },
  {
    q: "Do you write country-specific resumes (USA, UK, EU)?",
    a: "Yes. We tailor resumes for USA (one-page, achievements-first), UK (skills + achievements), and EU (photo + personal details) formats. Mention your target country when booking.",
  },
  {
    q: "How do you optimize for ATS?",
    a: "We use role-specific ATS keyword sets (MLOps, LLMOps, etc.), standard section headers, simple fonts, and bullet structure that ATS parsers read correctly. No tables, columns, or graphics that break parsing.",
  },
  {
    q: "What if I don't like the rewrite?",
    a: "Full Rewrite and Career Package include 2 revision rounds. Most resumes are finalized in one round. If you still don't like it, we offer a full refund within 7 days.",
  },
  {
    q: "How do I share my current resume?",
    a: "After booking on WhatsApp, send your current resume (PDF or DOCX) and 2-3 target job descriptions. We start within 24 hours.",
  },
  {
    q: "What is the student discount?",
    a: "Verified students and freshers get 30% off the Full Resume Rewrite (₹4,999 → ₹3,499) and the Career Package (₹9,999 → ₹6,999). Verify with a .edu / .ac.in email address or a student ID on WhatsApp. The Resume Review tier stays ₹1,999 for everyone.",
  },
];

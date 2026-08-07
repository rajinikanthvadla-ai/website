export const MLOPS_MASTERCLASS_DURATION = "4-5 months";
export const AI_AUTOMATION_DURATION = "2 months";
export const AI_AUTOMATION_PRICE = "₹20,000";
export const AI_AUTOMATION_PRICE_NOTE = "One-time · Lifetime recording access included";

/** ISO date for pricing freshness signals — update when fees change. */
export const PRICING_LAST_UPDATED = "2026-08-06";

export const SITE = {
  name: "Rajinikanth Vadla",
  title:
    "Rajinikanth Vadla | MLOps, LLMOps, AI Agents Training — USA, UK, Europe & India",
  description:
    "Job-ready MLOps, LLMOps, AIOps and AI Agentic Operations live course for engineers worldwide. USA, UK, Ireland, Netherlands, Luxembourg, Germany, Canada, Australia. 4-5 months, 500+ trained, hands-on labs, placement support.",
  url: "https://www.rajinikanthvadla.com",
  image: "https://www.rajinikanthvadla.com/assets/pic-1.png",
  phone: "+91-9100028801",
};

export const LINKS = {
  topmate: "https://topmate.io/rajinikanthvadla",
  enroll: "https://topmate.io/rajinikanthvadla/1838028/pay",
  aiopsMastery: "https://topmate.io/rajinikanthvadla/new/EjSiaf7TdI",
  aiopsMasteryEnroll: "https://topmate.io/rajinikanthvadla/2056044/pay",
  whatsapp: "https://wa.me/919100028801",
  whatsappSyllabus:
    "https://wa.me/919100028801?text=Hi%20Rajinikanth,%20I%20want%20to%20know%20batch%20details%20and%20syllabus",
  whatsappAutomation:
    "https://wa.me/919100028801?text=Hi%20Rajinikanth,%20I%20am%20interested%20in%20the%20AI-Powered%20Automation%20Efficiency%20course.%20Please%20share%20details.",
  whatsappChannel: "https://whatsapp.com/channel/0029VbBxmp7Fy7262q1Ti72e",
  zoomAiAutomation:
    "https://us06web.zoom.us/j/87218406889?pwd=aapAaoxbKd9cK6rQioFHVMlIHxedRO.1",
  zoomMasterclass:
    "https://us06web.zoom.us/j/87999982120?pwd=bfqVQtQ9th5aeybBQD3QP9TdAaDd0a.1",
  linkedin: "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
  youtube: "https://www.youtube.com/@IamRajinikanthvadla",
  youtubeMembershipJoin: "https://www.youtube.com/@IamRajinikanthvadla/join",
  instagram: "https://www.instagram.com/rajinikanth_vadla_/",
  myGPT:
    "https://chatgpt.com/g/g-6938ef4591f4819198b381b03cf8707b-rajinikanth-vadla-ai-ml-ops-engineer-mentor",
};

export const NAV_ITEMS: { label: string; href: string; highlight?: boolean }[] = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "AI Automation", href: "/courses/ai-automation", highlight: true },
  { label: "Masterclass", href: "/mlops-aiops-masterclass" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Blog", href: "/blog" },
  { label: "Universe", href: "/universe", highlight: true },
  { label: "Roadmaps", href: "/roadmap" },
  { label: "Architectures", href: "/architecture" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: "500+", label: "Engineers Trained" },
  { value: "50+", label: "Enterprise Projects" },
  { value: "4.9★", label: "Session Feedback" },
  { value: "60%", label: "Avg. Reported Hike*" },
];

export const TEXT_TESTIMONIALS = [
  {
    quote:
      "The live labs made the difference — I moved from deploying scripts to owning an ML pipeline on Kubernetes. Interviewers asked about exactly what we built in capstone.",
    role: "MLOps Engineer · Hyderabad",
    badge: "Career Growth",
    image: "/assets/stoty-2.jpg",
  },
  {
    quote:
      "Rajinikanth breaks down LangChain and agent patterns the way enterprise teams actually use them. I shipped an internal RAG tool within two months of finishing the cohort.",
    role: "AI Engineer · Bangalore",
    badge: "AI Engineer",
    image: "/assets/stoty-9.png",
  },
  {
    quote:
      "Worth every rupee for the 1-on-1 mentorship alone. Resume rewrite + mock interviews helped me land a 200% hike moving into an ML platform role.",
    role: "ML Platform Engineer · Pune",
    badge: "200% Hike",
    image: "/assets/success-story-mani-rathnam.png",
  },
  {
    quote:
      "The automation course covered Cursor, Bedrock agents, and MCP integrations — skills that showed up word-for-word in my new job description.",
    role: "Automation Engineer · Chennai",
    badge: "Job Placed",
    image: "/assets/stoty-4.jpg",
  },
  {
    quote:
      "Clear syllabus, real Zoom sessions, and recordings I still revisit. The AIOps monitoring capstone became my portfolio centerpiece.",
    role: "SRE → AIOps · Remote (India)",
    badge: "MLOps Expert",
    image: "/assets/stoty-7.jpg",
  },
  {
    quote:
      "As a DevOps engineer transitioning to AI, the structured path from Docker through Kubeflow to LLM serving saved me months of random tutorials.",
    role: "DevOps → MLOps · Mumbai",
    badge: "DevOps Role",
    image: "/assets/stoty-6.png",
  },
];

export const SUCCESS_STORIES = [
  { src: "/assets/students success story -1.jpg", badge: "Verified Success" },
  { src: "/assets/success-story-mani-rathnam.png", badge: "200% Hike" },
  { src: "/assets/stoty-2.jpg", badge: "Career Growth" },
  { src: "/assets/stoty-3.jpg", badge: "Job Placed" },
  { src: "/assets/stoty-4.jpg", badge: "Skills Upgraded" },
  { src: "/assets/stoty-5.jpg", badge: "Certified" },
  { src: "/assets/stoty-6.png", badge: "DevOps Role" },
  { src: "/assets/stoty-7.jpg", badge: "MLOps Expert" },
  { src: "/assets/stoty-8.png", badge: "Cloud Architect" },
  { src: "/assets/stoty-9.png", badge: "AI Engineer" },
  { src: "/assets/stoty-10.png", badge: "Tech Lead" },
];

export const AI_AUTOMATION_SYLLABUS = [
  {
    module: 1,
    title: "AI-Assisted Development with Cursor & Codex",
    duration: "Week 1-2",
    topics: [
      "Cursor IDE: agentic coding, multi-file edits, codebase-aware prompts",
      "OpenAI Codex CLI: autonomous multi-step task execution",
      "Writing production-quality code 5x faster with AI pair programming",
      "Enterprise coding standards & AI guardrails",
      "Hands-on: Build a full-stack feature using only AI-assisted tools",
    ],
  },
  {
    module: 2,
    title: "ChatGPT, Claude & Gemini for Enterprise Workflows",
    duration: "Week 2-3",
    topics: [
      "ChatGPT (GPT-4o, o3): API integration, custom GPTs, enterprise use cases",
      "Claude AI: long-context analysis, document processing, system prompts",
      "Gemini: multimodal inputs, Google Workspace integration",
      "Prompt engineering patterns enterprises actually use",
      "Building internal tools & SOPs with LLM APIs",
      "Hands-on: Automate a real enterprise workflow end-to-end",
    ],
  },
  {
    module: 3,
    title: "AWS Bedrock Agents & Cloud AI Services",
    duration: "Week 3-4",
    topics: [
      "AWS Bedrock: foundation models, agents, knowledge bases, guardrails",
      "Building production Bedrock agents with action groups & APIs",
      "Amazon Q: AI assistant for enterprise developer productivity",
      "Azure AI Services & Azure OpenAI for enterprise",
      "GCP Vertex AI agents & Gemini integration",
      "Hands-on: Deploy a Bedrock agent that automates a business process",
    ],
  },
  {
    module: 4,
    title: "Open-Source AI Agents for Enterprise",
    duration: "Week 4-5",
    topics: [
      "LangChain agents: tool use, chains, memory, and retrieval",
      "CrewAI: multi-agent role-based automation",
      "AutoGen: conversational multi-agent frameworks",
      "n8n & Activepieces: open-source workflow automation with AI nodes",
      "Self-hosted vs managed agents: cost, security, compliance trade-offs",
      "Hands-on: Build a multi-agent system for an enterprise use case",
    ],
  },
  {
    module: 5,
    title: "Rapid Prototyping & Low-Code AI Tools",
    duration: "Week 5-6",
    topics: [
      "Lovable & Bolt: AI-powered full-stack app generation",
      "v0 by Vercel: UI generation from natural language",
      "Replit Agent: end-to-end app building with AI",
      "When to use low-code AI vs custom development in enterprises",
      "Prototyping → production pipeline with AI tools",
      "Hands-on: Prototype an internal tool in under 2 hours with AI",
    ],
  },
  {
    module: 6,
    title: "Enterprise AI Automation, Governance & Career Readiness",
    duration: "Week 7-8",
    topics: [
      "Enterprise AI automation strategy & ROI measurement",
      "AI security: prompt injection, data leakage, access control",
      "Compliance & governance for AI in regulated industries",
      "Building your portfolio of enterprise AI automation projects",
      "Interview prep: system design for AI automation roles",
      "Resume & LinkedIn optimization for AI automation engineer JDs",
    ],
  },
];

export {
  MLOPS_PROGRAM_OVERVIEW,
  MLOPS_MASTERCLASS_SYLLABUS,
  MLOPS_PROGRAM_INCLUDES,
  MLOPS_PREREQUISITES,
  MLOPS_TARGET_AUDIENCE,
} from "./masterclass-syllabus";

export const MLOPS_CAPSTONE_PROJECTS = [
  {
    title: "End-to-End MLOps Pipeline",
    desc: "Automated ML pipeline with CI/CD, Kubernetes deployment, monitoring, and drift detection.",
    stack: ["Python", "MLflow", "Docker", "Kubernetes", "Jenkins"],
  },
  {
    title: "Production LLM Application",
    desc: "Fine-tuned LLM with RAG system, vector database, prompt management, and monitoring.",
    stack: ["LangChain", "ChromaDB", "FastAPI", "Docker", "HuggingFace"],
  },
  {
    title: "AIOps Monitoring Platform",
    desc: "Anomaly detection, predictive maintenance, and automated remediation workflows.",
    stack: ["Prometheus", "Grafana", "Python", "Kubernetes", "Scikit-learn"],
  },
  {
    title: "Enterprise AI Agent with MCP",
    desc: "Multi-agent system with MCP, GitHub and Slack integrations, human-in-the-loop and enterprise security.",
    stack: ["LangChain", "CrewAI", "MCP", "FastAPI", "PostgreSQL", "Docker"],
  },
];

export const MLOPS_CAREER_ROLES = [
  { title: "MLOps Engineer", salary: "₹12-40 LPA" },
  { title: "ML Engineer", salary: "₹15-45 LPA" },
  { title: "AIOps Engineer", salary: "₹12-35 LPA" },
  { title: "LLM / GenAI Engineer", salary: "₹20-50+ LPA" },
  { title: "AI Agent Developer", salary: "₹18-45 LPA" },
  { title: "ML Platform Engineer", salary: "₹18-40 LPA" },
  { title: "SRE (ML Focus)", salary: "₹15-35 LPA" },
  { title: "DevOps (AI/ML)", salary: "₹12-30 LPA" },
];

export const COURSE_ZOOM_DEMOS = {
  aiAutomation: {
    courseName: "AI-Powered Automation Engineer Course",
    sessionLabel: "Live Demo Session",
    schedule: "Daily · 6:30 PM IST",
    startsOn: "Jul 11, 2026",
    joinUrl: LINKS.zoomAiAutomation,
    agendaUrl:
      "https://docs.zoom.us/agenda/doc/ada53d77-4de5-4d27-83f3-437edc3535cf",
    chatUrl: "https://us06web.zoom.us/launch/jc/87218406889",
    calendarUrl:
      "https://us06web.zoom.us/meeting/tZMvduGsrj0iEt0TPNq64_RVssNoDhsDvr8h/ics?icsToken=DBabz5hOk6xHg6vBdAAALAAAANL6XfRiDTiQUkP_jvJ0-c7EuIkzET9Ui0PINVJxdYTLhcB1eRacXtVF7v2YJmCU9Td3kfMcnuZ9tH6xKTAwMDAwMQ&meetingMasterEventId=0ZCY3sayTVyC9dwYLf0PFw",
    meetingId: "872 1840 6889",
    passcode: "1111",
  },
  mlopsMasterclass: {
    courseName: "MLOps + LLMOps + AIOps + Agentic AI Course",
    sessionLabel: "Live Demo Session",
    schedule: "Daily · 9:30 PM IST",
    startsOn: "Jul 11, 2026",
    joinUrl: LINKS.zoomMasterclass,
    agendaUrl:
      "https://docs.zoom.us/agenda/doc/e70b1ca0-8872-4403-93e9-84871706b0d8",
    chatUrl: "https://us06web.zoom.us/launch/jc/87999982120",
    calendarUrl:
      "https://us06web.zoom.us/meeting/tZMkfuChpjkrGNTn8tvCE_88_70rd4kciCn7/ics?icsToken=DDx6daWm7DgqqHrBKQAALAAAAOIX1_OvK3qWcgwzsu7cdKwbxW1Z0oK2YDEIhuEhEZfCvNggz5XTD6xc5QOgw70kV7sbxGtzrL5pjaZNsTAwMDAwMQ&meetingMasterEventId=nt4z7kvyRsmxf8t3jL4hZw",
    meetingId: "879 9998 2120",
    passcode: "1111",
  },
} as const;

export const COURSES = [
  {
    title: "AI-Powered Automation Efficiency",
    description:
      "2-month live course: build company AI agents — incident, RAG, MCP, HR. ₹20,000 with lifetime recordings and 1-on-1 mentorship.",
    features: [
      "₹20,000 · lifetime recordings",
      "12 agent patterns",
      "1-on-1 mentorship",
      "Evolving syllabus",
    ],
    badge: "NEW",
    href: "/courses/ai-automation",
    ctaText: "View course",
    featured: true,
  },
  {
    title: "MLOps, AIOps, LLMOps and AI Agents",
    description:
      "Cohort running now. Live 4-5 months with mentorship (₹40K with 2 installments) or recordings self-learning (₹30K). FDE, AIOps, AI Agentic with capstones & job support.",
    features: [
      "₹40,000 live with 2 installments",
      "₹30,000 recordings + 2 installments",
      "150+ hours · 50+ labs · 4 capstone projects",
      "1-on-1 mentorship · job support",
    ],
    badge: "FLAGSHIP",
    href: "/mlops-aiops-masterclass",
    ctaText: "View course",
    featured: false,
  },
  {
    title: "1:1 Career Mentorship",
    description:
      "Private sessions for career direction, interview prep, and role transitions. Available worldwide online.",
    features: [
      "Resume and LinkedIn review",
      "Mock interviews",
      "Learning path guidance",
      "Book on Topmate or WhatsApp",
    ],
    badge: "MENTORSHIP",
    href: "/mentorship",
    ctaText: "Learn more",
    featured: false,
  },
];

export const HOME_PAGE_FAQS = [
  {
    q: "Which course should I pick?",
    a: "Choose AI Automation for the complete 2-month enterprise AI tools and automation path (6 modules, MCP included). Choose the MLOps Masterclass for a 4-5 month job-ready platform engineering path. Not sure? Message on WhatsApp.",
  },
  {
    q: "What is the best MLOps course in India?",
    a: "Rajinikanth Vadla's MLOps Masterclass is a 4-5 month live job-ready program: ₹40,000 with 2 installments + mentorship & job support. OR ₹30,000 recordings-only with self-learning. Covers MLOps, LLMOps, AIOps, AI Agents, FDE. 150+ hours, 4 capstone projects. Cohort running now. Enroll: https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
  },
  {
    q: "What is the AI Automation course?",
    a: "A 2-month live course to build company AI agents. ₹20,000 with lifetime recording access, 1-on-1 mentorship, org runbooks, and business metrics. https://www.rajinikanthvadla.com/courses/ai-automation/",
  },
  {
    q: "Is training live or recorded?",
    a: "All cohort sessions are live with Q&A. Recordings are shared. Mentorship is 1:1 on Topmate or WhatsApp, available worldwide.",
  },
  {
    q: "Can I join from outside India?",
    a: "Yes. All programs are online. Masterclass pricing: ₹40,000 (India), $450 (USD), €420 (EUR).",
  },
  {
    q: "Do you help with jobs?",
    a: "Yes. Resume review, mock interviews, and placement support are included in the masterclass.",
  },
  {
    q: "Is there a cheaper way to access all your course videos?",
    a: "Yes — join YouTube AI & ML AI Agentic Pro membership at ₹1,199/month. You get every members-only video (private courses, old sessions, new uploads), live streams, and 1:1 mentorship when you share your Member ID on WhatsApp. Lower tiers (₹179 or ₹419) do not include the full library or mentorship.",
  },
  {
    q: "Can I join from USA, UK, Ireland, or Europe?",
    a: "Yes. Training is 100% online. Engineers from USA ($450), UK (£360), Ireland, Netherlands, Luxembourg, Germany, Canada, Australia, Singapore and UAE join the same live cohort. See https://www.rajinikanthvadla.com/global-training/ for your country's landing page with local salary data and pricing.",
  },
];

export const SERVICES = [
  {
    icon: "robot",
    title: "AI Agents & GenAI Training",
    description:
      "Build autonomous AI agents with LangChain, RAG systems, LLMs, and production AI applications.",
    href: "/ai-agents-course",
  },
  {
    icon: "brain",
    title: "MLOps Engineering Training",
    description:
      "Deploy ML models to production with MLflow, Kubeflow, SageMaker, model monitoring & pipelines.",
    href: "/mlops-course",
  },
  {
    icon: "zap",
    title: "AIOps & Intelligent Automation",
    description:
      "AI-powered IT Operations, predictive analytics, self-healing infrastructure, automation.",
    href: "/aiops-training",
  },
  {
    icon: "cloud",
    title: "Multi-Cloud & Kubernetes",
    description:
      "AWS, Azure, GCP, EKS, AKS, GKE - infrastructure for AI/ML workloads at scale.",
    href: "/courses",
  },
  {
    icon: "spark",
    title: "AI Tools for 10x Productivity",
    description:
      "Master Cursor, Claude, ChatGPT, Gemini, Grok, Vercel AI SDK - work 10x faster with AI.",
    href: "/ai-tools-productivity",
  },
];

export const VIDEOS = [
  {
    id: "eWDa3NyUM94",
    title: "MLOps, LLMOps, AIOps & AI Agents Course",
    description: "Job-ready masterclass overview — build real enterprise AI systems.",
  },
  {
    id: "Ua_C-8PQVH4",
    title: "AI-Powered Automation Engineering Course | Live Demo",
    description: "Live demo of the AI Automation course for enterprise engineers.",
  },
  {
    id: "i7PYe5fSJl8",
    title: "Build AI Agents with LangChain + LangGraph",
    description: "Agentic AI course lab — LangChain and LangGraph hands-on.",
  },
  {
    id: "eXsltT8baj0",
    title: "AIOps Lab Day-01: Detect CPU Anomalies",
    description:
      "Hands-on lab using Prometheus, Grafana & ML to detect CPU anomalies in real-time.",
  },
];

export const STRUCTURED_DATA = {
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rajinikanth Vadla",
    alternateName: [
      "Rajinikanth Vadla official website",
      "rajinikanthvadla.com",
      "Rajinikanth Vadla MLOps AIOps GenAI training",
      "Rajinikanth Vadla AI-Powered Automation training",
      "Rajinikanth Vadla career mentorship",
    ],
    url: "https://www.rajinikanthvadla.com/",
    inLanguage: "en",
    description:
      "Official website of Rajinikanth Vadla: live online MLOps, AIOps, GenAI, AI Agents, AI-Powered Automation, and LLMOps training, mentorship, and blog.",
    publisher: {
      "@type": "Organization",
      name: "Rajinikanth Vadla Training",
      url: "https://www.rajinikanthvadla.com/",
    },
  },
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rajinikanth Vadla",
    jobTitle: "MLOps, AIOps, GenAI, AI Agents, AI Automation Expert, Trainer & Mentor",
    description:
      "MLOps, AIOps, GenAI, AI Agents, and AI-Powered Automation trainer and mentor. Offers live cohorts and 1:1 mentorship for career direction, role transitions, and technical depth. Works with engineers globally via online sessions. 7+ years enterprise experience; 500+ people trained and mentored.",
    url: "https://www.rajinikanthvadla.com/",
    image: "https://www.rajinikanthvadla.com/assets/pic-1.png",
    sameAs: [
      "https://www.rajinikanthvadla.com/",
      "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
      "https://www.youtube.com/@IamRajinikanthvadla",
      "https://www.instagram.com/rajinikanth_vadla_/",
      "https://topmate.io/rajinikanthvadla",
      "https://chatgpt.com/g/g-6938ef4591f4819198b381b03cf8707b-rajinikanth-vadla-ai-ml-ops-engineer-mentor",
      "https://wa.me/919100028801",
    ],
    knowsAbout: [
      "MLOps", "AIOps", "DevOps", "GenAI", "Generative AI", "AI Agents",
      "LLMOps", "LangChain", "RAG", "LLM", "Large Language Models",
      "AI-Powered Automation", "Enterprise AI", "Cursor IDE",
      "AWS Bedrock", "AWS Bedrock Agents", "OpenAI Codex",
      "AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform",
      "Jenkins", "CI/CD", "MLflow", "Kubeflow", "Machine Learning Operations",
      "Cloud Computing", "Infrastructure as Code", "Model Context Protocol",
      "Vector Databases", "Prompt Engineering", "Fine-tuning LLMs",
      "Career mentoring", "Technical mentorship", "Interview preparation",
    ],
    alumniOf: { "@type": "Organization", name: "Enterprise IT" },
    award: "Top-rated AI/ML Ops trainer (4.9/5, 500+ reviews)",
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rajinikanth Vadla Official Training",
    alternateName: "RV Tech Training",
    url: "https://www.rajinikanthvadla.com/",
    logo: "https://www.rajinikanthvadla.com/assets/pic-1.png",
    description:
      "MLOps, AIOps, GenAI, AI Agents, AI-Powered Automation, and LLMOps training with hands-on enterprise projects, plus 1:1 mentorship for career and role transformation. Serves learners worldwide online.",
    founder: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
    },
    sameAs: [
      "https://www.rajinikanthvadla.com/",
      "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
      "https://www.youtube.com/@IamRajinikanthvadla",
      "https://www.instagram.com/rajinikanth_vadla_/",
      "https://topmate.io/rajinikanthvadla",
      "https://wa.me/919100028801",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9100028801",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Telugu"],
      areaServed: ["US", "GB", "IE", "NL", "LU", "DE", "CA", "AU", "SG", "AE", "IN"],
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Ireland" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Luxembourg" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "India" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  },
  course: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "MLOps AIOps LLMOps AI Agents Live Course | ₹40K or ₹30K Recordings",
    description:
      "MLOps, AIOps, LLMOps and AI Agentic Operations live cohort course by Rajinikanth Vadla. 4-5 months, 150+ hours, 4 capstone projects, FDE. Live option: ₹40,000 with 2 installments + 1-on-1 mentorship & job support. Recordings-only: ₹30,000 with 2 installments, self-learning. Cohort started.",
    url: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
    provider: {
      "@type": "Organization",
      name: "Rajinikanth Vadla Training",
      url: "https://www.rajinikanthvadla.com/",
      sameAs: "https://www.youtube.com/@IamRajinikanthvadla",
    },
    instructor: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
      url: "https://www.rajinikanthvadla.com/",
    },
    teaches: [
      "MLOps", "AIOps", "LLMOps", "GenAI", "AI Agents", "AI Agentic Operations", "FDE",
      "Kubernetes", "Docker", "MLflow", "Kubeflow", "LangChain", "RAG",
      "AWS", "Azure", "GCP", "Job Interview Preparation", "Career Placement",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: "Live Cohort with Mentorship & Job Support",
        courseMode: "online",
        inLanguage: "en",
        startDate: "2026-07-15",
        duration: "P4M",
        instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "40000",
          priceCurrency: "INR",
          priceValidUntil: "2027-12-31",
          validFrom: "2026-01-01",
          url: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
          description: "₹40,000 with 2 installments of ₹20,000. Includes 1-on-1 mentorship, job assistance, interview prep. Updated Aug 2026.",
        },
      },
      {
        "@type": "CourseInstance",
        name: "Recordings Only (Self-Learning)",
        courseMode: "online",
        inLanguage: "en",
        duration: "P4M",
        instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "30000",
          priceCurrency: "INR",
          priceValidUntil: "2027-12-31",
          validFrom: "2026-01-01",
          url: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
          description: "₹30,000 with 2 installments of ₹15,000. Lifetime access to recordings, no live classes or support. Updated Aug 2026.",
        },
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      lowPrice: "30000",
      highPrice: "40000",
      priceCurrency: "INR",
      offerCount: "2",
    },
  },
  aiAutomationCourse: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI-Powered Automation: Build Company AI Agents",
    description:
      "2-month live course building company AI agents — incident, RAG, MCP, HR, onboarding. ₹20,000 with lifetime recordings and 1-on-1 mentorship. By Rajinikanth Vadla.",
    provider: {
      "@type": "Organization",
      name: "Rajinikanth Vadla Training",
      sameAs: "https://www.rajinikanthvadla.com/",
    },
    instructor: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
    },
    teaches: [
      "AI Agents", "RAG Agent", "MCP", "Incident Automation", "HR Automation",
      "Cursor IDE", "OpenAI Codex", "Vibe Coding", "AWS Bedrock",
      "Azure AI Foundry", "Vertex AI", "Ollama", "LangChain", "CrewAI", "n8n",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
      duration: "P2M",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "20000",
      priceCurrency: "INR",
      url: "https://www.rajinikanthvadla.com/courses/ai-automation/",
    },
  },
  courseList: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rajinikanth Vadla Training Programs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI-Powered Automation Course", url: "https://www.rajinikanthvadla.com/courses/ai-automation/" },
      { "@type": "ListItem", position: 2, name: "MLOps AIOps LLMOps Masterclass", url: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/" },
      { "@type": "ListItem", position: 3, name: "MLOps Course", url: "https://www.rajinikanthvadla.com/mlops-course/" },
      { "@type": "ListItem", position: 4, name: "MLOps Course India", url: "https://www.rajinikanthvadla.com/mlops-course-india/" },
      { "@type": "ListItem", position: 5, name: "GenAI Course", url: "https://www.rajinikanthvadla.com/genai-course/" },
      { "@type": "ListItem", position: 6, name: "AI Agents Course", url: "https://www.rajinikanthvadla.com/ai-agents-course/" },
      { "@type": "ListItem", position: 7, name: "GenAI Training", url: "https://www.rajinikanthvadla.com/genai-training/" },
      { "@type": "ListItem", position: 8, name: "AIOps Training", url: "https://www.rajinikanthvadla.com/aiops-training/" },
      { "@type": "ListItem", position: 9, name: "Mentorship", url: "https://www.rajinikanthvadla.com/mentorship/" },
      { "@type": "ListItem", position: 10, name: "AI Career Roadmaps", url: "https://www.rajinikanthvadla.com/roadmap/" },
    ],
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Rajinikanth Vadla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla is an MLOps, AIOps, GenAI, AI Agents, and AI-Powered Automation trainer and practitioner. His official website is https://www.rajinikanthvadla.com. He has 7+ years enterprise experience, has trained 500+ engineers, and publishes long-form training on YouTube.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best MLOps course in India for job ready training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla's MLOps Masterclass cohort is running now. Two options: (1) Live course ₹40,000 with 2 installments + 1-on-1 mentorship, job assistance, interview prep; (2) Recordings-only ₹30,000 with 2 installments, self-learning, lifetime access. Both: 4-5 months, 150+ hours, 4 capstone projects, FDE, AIOps, LLMOps, AI Agents. Enroll via WhatsApp: https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
        },
      },
      {
        "@type": "Question",
        name: "Where can I find a GenAI course and AI Agents course by Rajinikanth Vadla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official GenAI course page is https://www.rajinikanthvadla.com/genai-course/ and the AI Agents / AI Agentic course page is https://www.rajinikanthvadla.com/ai-agents-course/. Both are part of the live masterclass with free YouTube class videos embedded on each page.",
        },
      },
      {
        "@type": "Question",
        name: "Which MLOps course should I take in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla's MLOps Masterclass (live cohort starting now): ₹40,000 with 2 installments + 1-on-1 mentorship, job support, interview prep. OR ₹30,000 recordings-only for self-learning. Covers MLOps, LLMOps, AIOps, AI Agents, FDE. 4-5 months, 150+ hours, 4 capstone projects, 4.9/5 rating from 500+ students. Message WhatsApp to enroll.",
        },
      },
      {
        "@type": "Question",
        name: "What is the AI-Powered Automation Efficiency course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 2 month complete enterprise program: AI-native development (Cursor, Codex), LLM workflows, AWS Bedrock agents, MCP and enterprise integrations, multi-agent systems, rapid prototyping, and governance. For CTOs, teams, and engineers.",
        },
      },
      {
        "@type": "Question",
        name: "What is the official Rajinikanth Vadla website for MLOps training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official site is https://www.rajinikanthvadla.com. There you will find the MLOps & AIOps Masterclass, the new AI-Powered Automation Efficiency course, cohort details, syllabus via WhatsApp, and enrollment links.",
        },
      },
      {
        "@type": "Question",
        name: "What is AIOps and MLOps training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AIOps (AI for IT Operations) and MLOps (Machine Learning Operations) training teaches you to build production ML pipelines, deploy AI models at scale, and automate IT operations using AI. Includes hands-on with Kubeflow, MLflow, Docker, Kubernetes.",
        },
      },
      {
        "@type": "Question",
        name: "How to learn AI Agents, GenAI, and LangChain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Learn AI Agents and GenAI through Rajinikanth Vadla's hands-on programs listed on https://www.rajinikanthvadla.com, including LangChain, Model Context Protocol (MCP), RAG systems, vector databases, and LLM integration for production applications.",
        },
      },
      {
        "@type": "Question",
        name: "What salary can I expect after MLOps training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MLOps Engineers earn ₹12-50 LPA in India, $120K-$200K+ in USA, €70K-€120K+ in Europe. Students of Rajinikanth Vadla see 60% average salary increase after completing the training.",
        },
      },
      {
        "@type": "Question",
        name: "Does Rajinikanth Vadla offer mentorship for career change outside India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Mentorship is online, so professionals anywhere in the world can book a 1:1 session on Topmate or start with WhatsApp for career questions, role transitions, interview prep, and learning plans. Details are at https://www.rajinikanthvadla.com/mentorship.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI tools do enterprises require engineers to know?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enterprise teams need Cursor, MCP integrations, ChatGPT/Claude APIs, AWS Bedrock Agents, and LangChain/CrewAI agent frameworks. Rajinikanth Vadla's AI-Powered Automation Efficiency course covers all of these with a dedicated MCP and enterprise connections module.",
        },
      },
      {
        "@type": "Question",
        name: "Can I join this MLOps and LLMOps training from outside India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The training and mentorship are delivered online for learners in India and globally. You can start with the masterclass page or mentorship page and contact via WhatsApp for timezone-friendly guidance.",
        },
      },
    ],
  },
};

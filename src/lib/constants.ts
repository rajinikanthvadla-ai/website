export const MLOPS_MASTERCLASS_DURATION = "4-5 months";
export const AI_AUTOMATION_DURATION = "2 months";

export const SITE = {
  name: "Rajinikanth Vadla",
  title:
    "Rajinikanth Vadla | MLOps, AIOps, LLMOps, AI Agents Job Ready Course India",
  description:
    "Complete 4-5 month job-ready MLOps, AIOps, LLMOps and AI Agentic Operations course. Live training, 500+ engineers trained, hands-on labs, capstone projects, placement support. Best MLOps course India by Rajinikanth Vadla.",
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
  linkedin: "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
  youtube: "https://www.youtube.com/@IamRajinikanthvadla",
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
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: "500+", label: "Engineers Trained" },
  { value: "50+", label: "Enterprise Projects" },
  { value: "4.9★", label: "Average Rating" },
  { value: "95%", label: "Placement Rate" },
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

export const COURSES = [
  {
    title: "AI-Powered Automation Efficiency",
    description:
      "2 month live program. Cursor, Claude, Codex, Bedrock agents, and enterprise AI tools from real JDs.",
    features: [
      "6 modules · 2 months",
      "Cursor and Codex hands-on",
      "AWS Bedrock and open-source agents",
      "Live online cohort",
    ],
    badge: "NEW",
    href: "/courses/ai-automation",
    ctaText: "View course",
    featured: true,
  },
  {
    title: "MLOps, AIOps, LLMOps and AI Agents",
    description:
      "4-5 month job-ready masterclass. DevOps through production AI agents with capstones and placement support.",
    features: [
      "6 modules · 150+ hours",
      "50+ labs · 4 capstone projects",
      "Interview prep and job support",
      "₹40,000 India · $450 USD",
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
    a: "Choose AI Automation for a 2 month focus on enterprise AI tools (Cursor, Claude, Bedrock agents). Choose the MLOps Masterclass for a complete 4-5 month job-ready path from DevOps through AI agents. Not sure? Message on WhatsApp.",
  },
  {
    q: "What is the best MLOps course in India?",
    a: "Rajinikanth Vadla's MLOps Masterclass is a 4-5 month live job-ready program covering MLOps, LLMOps, AIOps and AI Agents. ₹40,000, 150+ hours hands-on, 4 capstone projects, placement support. Details at https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
  },
  {
    q: "What is the AI Automation course?",
    a: "A 2 month intensive on Cursor, Claude, Codex, ChatGPT, AWS Bedrock Agents, and open-source agents. Skills from enterprise job descriptions. https://www.rajinikanthvadla.com/courses/ai-automation/",
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
];

export const SERVICES = [
  {
    icon: "robot",
    title: "AI Agents & GenAI Training",
    description:
      "Build autonomous AI agents with LangChain, RAG systems, LLMs, and production AI applications.",
    href: "/genai-training",
  },
  {
    icon: "brain",
    title: "MLOps Engineering Training",
    description:
      "Deploy ML models to production with MLflow, Kubeflow, SageMaker, model monitoring & pipelines.",
    href: "/mlops-training",
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
    },
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
    name: "MLOps AIOps LLMOps AI Agents Job Ready Course India | 4-5 Month Live Program",
    description:
      "Complete 4-5 month job-ready MLOps, AIOps, LLMOps and AI Agentic Operations course by Rajinikanth Vadla. Live online training with 150+ hours hands-on labs, 4 capstone projects, interview prep and placement support. Best MLOps course India.",
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
      "MLOps", "AIOps", "LLMOps", "GenAI", "AI Agents", "AI Agentic Operations",
      "Kubernetes", "Docker", "MLflow", "Kubeflow", "LangChain", "RAG",
      "AWS", "Azure", "GCP", "Job Interview Preparation", "Career Placement",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
      duration: "P4M",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      lowPrice: "420",
      highPrice: "40000",
      offerCount: "3",
      priceCurrency: "INR",
      offers: [
        { "@type": "Offer", price: "40000", priceCurrency: "INR" },
        { "@type": "Offer", price: "450", priceCurrency: "USD" },
        { "@type": "Offer", price: "420", priceCurrency: "EUR" },
      ],
    },
  },
  aiAutomationCourse: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI-Powered Automation Efficiency: Enterprise-Grade Training",
    description:
      "2 month enterprise AI automation course. Master Cursor, Claude AI, OpenAI Codex, ChatGPT, AWS Bedrock Agents, open-source AI agents (LangChain, CrewAI), and rapid prototyping tools (Lovable, Bolt). Skills enterprises hire for.",
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
      "Cursor IDE", "OpenAI Codex", "ChatGPT", "Claude AI",
      "AWS Bedrock Agents", "LangChain", "CrewAI", "Enterprise AI Automation",
      "AI Governance", "Prompt Engineering", "Lovable", "Bolt",
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
      { "@type": "ListItem", position: 3, name: "MLOps Course India", url: "https://www.rajinikanthvadla.com/mlops-course-india/" },
      { "@type": "ListItem", position: 4, name: "MLOps Training", url: "https://www.rajinikanthvadla.com/mlops-training/" },
      { "@type": "ListItem", position: 5, name: "GenAI Training", url: "https://www.rajinikanthvadla.com/genai-training/" },
      { "@type": "ListItem", position: 6, name: "AIOps Training", url: "https://www.rajinikanthvadla.com/aiops-training/" },
      { "@type": "ListItem", position: 7, name: "Mentorship", url: "https://www.rajinikanthvadla.com/mentorship/" },
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
          text: "Rajinikanth Vadla's MLOps, AIOps, LLMOps and AI Agents Masterclass is a complete 4-5 month job-ready live program covering DevOps through production AI agents. It includes 150+ hours hands-on training, 4 capstone projects, interview prep and placement support. Details at https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
        },
      },
      {
        "@type": "Question",
        name: "Which MLOps course should I take in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a complete job-ready path, Rajinikanth Vadla's 4-5 month live MLOps, AIOps, LLMOps and AI Agentic Operations course covers MLOps pipelines, LLM deployment, AIOps automation and AI agents with real projects. Priced at ₹40,000 with 4.9/5 rating from 500+ students.",
        },
      },
      {
        "@type": "Question",
        name: "What is the AI-Powered Automation Efficiency course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 2 month enterprise-level course covering Cursor, Claude AI, OpenAI Codex, ChatGPT, AWS Bedrock Agents, open-source AI agents (LangChain, CrewAI), rapid prototyping tools (Lovable, Bolt), and enterprise AI governance. It teaches the exact skills that appear in enterprise job descriptions for AI automation roles.",
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
          text: "Enterprise JDs increasingly require Cursor, ChatGPT/Claude API integration, AWS Bedrock Agents, and familiarity with AI agent frameworks like LangChain and CrewAI. Rajinikanth Vadla's AI-Powered Automation Efficiency course covers all of these.",
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

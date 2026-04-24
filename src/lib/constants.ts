export const SITE = {
  name: "Rajinikanth Vadla",
  title:
    "Rajinikanth Vadla — MLOps, AIOps, LLMOps, GenAI & Agentic AI Training + Career Mentorship",
  description:
    "Live, practice-first MLOps, AIOps, LLMOps, GenAI, agentic AI and AI Agents training with 1:1 AI career mentorship. 500+ engineers trained worldwide, 4.9/5 rating, hands-on labs, production-grade projects. WhatsApp for the next cohort and syllabus.",
  url: "https://www.rajinikanthvadla.com",
  image: "https://www.rajinikanthvadla.com/assets/pic-1.png",
  phone: "+91-9100028801",
  keywords: [
    // Core course intents
    "MLOps training", "MLOps course", "best MLOps course",
    "AIOps training", "AIOps course", "best AIOps course",
    "LLMOps training", "LLMOps course",
    "GenAI course", "Generative AI course", "best GenAI training",
    "AI Agents course", "agentic AI course", "AI agentic course",
    "LangChain course", "RAG course", "vector database course",
    "Model Context Protocol MCP training",
    "DevOps to MLOps", "MLOps masterclass",
    // Mentorship / career intents
    "AI career mentor", "AI career mentoring", "AI powered career mentoring",
    "MLOps career mentor", "GenAI career mentor",
    "AI engineer interview preparation", "AI resume review",
    // Practice / practitioner intents
    "hands-on AI course", "practice AI course", "practice GenAI projects",
    "production MLOps projects", "real-world AI agent projects",
    // Tool / ecosystem intents
    "Kubernetes for ML", "AWS MLOps", "Azure MLOps", "GCP MLOps",
    "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "AWS Bedrock",
    "LangChain", "LangGraph", "CrewAI", "LlamaIndex",
    "Pinecone", "ChromaDB", "Weaviate", "Qdrant",
    "LoRA", "QLoRA", "fine-tuning LLMs",
    // Branded
    "Rajinikanth Vadla", "rajinikanthvadla.com",
    "Rajinikanth Vadla course", "Rajinikanth Vadla mentorship",
  ],
};

export const LINKS = {
  topmate: "https://topmate.io/rajinikanthvadla",
  enroll: "https://topmate.io/rajinikanthvadla/1838028/pay",
  /** AIOps Mastery — ongoing Topmate program (product page). */
  aiopsMastery: "https://topmate.io/rajinikanthvadla/new/EjSiaf7TdI",
  /** Checkout for AIOps Mastery on Topmate. */
  aiopsMasteryEnroll: "https://topmate.io/rajinikanthvadla/2056044/pay",
  whatsapp: "https://wa.me/919100028801",
  whatsappSyllabus:
    "https://wa.me/919100028801?text=Hi%20Rajinikanth,%20I%20want%20to%20know%20batch%20details%20and%20syllabus",
  whatsappChannel: "https://whatsapp.com/channel/0029VbBxmp7Fy7262q1Ti72e",
  linkedin: "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
  youtube: "https://www.youtube.com/@IamRajinikanthvadla",
  instagram: "https://www.instagram.com/rajinikanth_vadla_/",
  myGPT:
    "https://chatgpt.com/g/g-6938ef4591f4819198b381b03cf8707b-rajinikanth-vadla-ai-ml-ops-engineer-mentor",
};

export const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
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

export const COURSES = [
  {
    title: "MLOps & AIOps Masterclass",
    description:
      "Complete 12-16 week program: DevOps → MLOps → LLMOps → AIOps → AI Agents. Build production-ready AI systems!",
    features: [
      "6 Comprehensive Modules",
      "200+ Hours Hands-on Training",
      "4 Portfolio Capstone Projects",
      "LangChain, RAG, AI Agents",
    ],
    badge: "FLAGSHIP",
    href: "/mlops-aiops-masterclass",
    ctaText: "View Syllabus",
    featured: true,
  },
  {
    title: "AIOps Mastery",
    description:
      "Production-grade AIOps on Topmate — hands-on labs and a practical path from signals to automation.",
    features: ["Production AIOps patterns", "Hands-on labs", "Structured curriculum"],
    badge: "Ongoing",
    href: LINKS.aiopsMastery,
    ctaText: "View on Topmate",
    featured: false,
  },
  {
    title: "Multi-Cloud DevOps Mastery",
    description:
      "Master AWS, Azure, GCP with production-grade DevOps, Terraform, Ansible, and CI/CD.",
    features: [
      "AWS, Azure, GCP deep dive",
      "Terraform & Ansible IaC",
      "Jenkins, GitLab, GitHub Actions",
    ],
    badge: "Popular",
    href: LINKS.topmate,
    ctaText: "Enroll Now",
    featured: false,
  },
  {
    title: "Kubernetes & Cloud Native",
    description:
      "From zero to Kubernetes hero - EKS, AKS, GKE in production environments.",
    features: [
      "EKS, AKS, GKE management",
      "Helm Charts & Operators",
      "Istio Service Mesh",
    ],
    badge: "Best Seller",
    href: LINKS.topmate,
    ctaText: "Enroll Now",
    featured: false,
  },
  {
    title: "AI Agents & GenAI",
    description:
      "Build production AI Agents, LangChain, RAG systems, and LLM applications.",
    features: [
      "LangChain & AI Frameworks",
      "Model Context Protocol (MCP)",
      "Production AI Applications",
    ],
    badge: "Advanced",
    href: LINKS.topmate,
    ctaText: "Enroll Now",
    featured: false,
  },
  {
    title: "AI Tools for 10x Productivity",
    description:
      "Master Cursor, Claude, ChatGPT, Gemini, Grok, Vercel AI SDK, AWS Bedrock - 10x your work with AI.",
    features: [
      "Cursor, Copilot & AI IDEs",
      "ChatGPT, Claude, Gemini, Grok",
      "Vercel AI SDK & AWS Bedrock",
      "Agentic Workflows & Automation",
    ],
    badge: "NEW",
    href: "/ai-tools-productivity",
    ctaText: "View Details",
    featured: false,
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
      "Rajinikanth Vadla career mentorship",
    ],
    url: "https://www.rajinikanthvadla.com/",
    inLanguage: "en",
    description:
      "Official website of Rajinikanth Vadla: live online MLOps, AIOps, GenAI, AI Agents, and LLMOps training, mentorship, and blog.",
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
    jobTitle:
      "MLOps, AIOps, LLMOps, GenAI, Agentic AI & AI Agents Expert, Trainer and Career Mentor",
    description:
      "Rajinikanth Vadla is an MLOps, AIOps, LLMOps, GenAI, and agentic AI practitioner, trainer, and 1:1 career mentor. He runs live hands-on cohorts and AI-powered career mentoring for engineers worldwide — covering LangChain, RAG, vector databases, Model Context Protocol (MCP), Kubernetes, MLflow, Kubeflow, SageMaker, Vertex AI, AWS Bedrock, and production AI agents. 7+ years of enterprise AI/ML production experience; 500+ engineers trained and mentored; 4.9/5 average rating.",
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
      "MLOps", "AIOps", "LLMOps", "DevOps",
      "GenAI", "Generative AI",
      "AI Agents", "Agentic AI", "Autonomous Agents",
      "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "AutoGPT",
      "RAG", "Retrieval-Augmented Generation",
      "LLM", "Large Language Models",
      "Prompt Engineering", "Fine-tuning LLMs", "LoRA", "QLoRA", "PEFT", "RLHF", "DPO",
      "Model Context Protocol", "MCP",
      "Vector Databases", "Pinecone", "ChromaDB", "Weaviate", "Qdrant", "Milvus", "pgvector",
      "AWS", "Azure", "GCP", "AWS Bedrock", "Vertex AI", "Azure OpenAI", "Azure ML",
      "Kubernetes", "EKS", "AKS", "GKE", "Helm", "Istio", "Docker",
      "Terraform", "Ansible", "Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD",
      "CI/CD", "MLflow", "Kubeflow", "SageMaker", "BentoML", "KServe", "Seldon",
      "Machine Learning Operations", "ML Pipelines", "Feature Stores", "Model Monitoring",
      "Observability", "Prometheus", "Grafana", "ELK", "OpenTelemetry",
      "Anomaly Detection", "Predictive Analytics", "Self-healing Infrastructure",
      "AI-powered career mentoring", "AI career mentor", "Role transitions",
      "Interview preparation", "Resume review", "Salary negotiation",
      "Cloud Computing", "Infrastructure as Code",
    ],
    alumniOf: { "@type": "Organization", name: "Enterprise IT" },
    award: "Top-rated MLOps, AIOps, GenAI, and agentic AI trainer (4.9/5, 500+ reviews)",
    hasOccupation: {
      "@type": "Occupation",
      name: "AI/ML Engineer, Trainer and Career Mentor",
      occupationLocation: { "@type": "Place", name: "Worldwide (online)" },
      skills:
        "MLOps, AIOps, LLMOps, GenAI, Agentic AI, AI Agents, LangChain, RAG, MCP, Kubernetes, MLflow, Kubeflow, AWS, Azure, GCP, career mentoring, interview preparation",
    },
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rajinikanth Vadla Official Training",
    alternateName: "RV Tech Training",
    url: "https://www.rajinikanthvadla.com/",
    logo: "https://www.rajinikanthvadla.com/assets/pic-1.png",
    description:
      "MLOps, AIOps, GenAI, AI Agents, and LLMOps training with hands-on enterprise projects, plus 1:1 mentorship for career and role transformation. Serves learners worldwide online. AWS, Azure, GCP, Kubernetes, LangChain, RAG.",
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
    name: "MLOps & AIOps Masterclass: DevOps to production AI systems",
    description:
      "Comprehensive 12-16 week training on MLOps, AIOps, LLMOps, GenAI, AI Agent development. Master Docker, Kubernetes, MLflow, Kubeflow, LangChain with hands-on projects.",
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
      "MLOps", "AIOps", "LLMOps", "GenAI", "AI Agents", "Kubernetes",
      "Docker", "MLflow", "Kubeflow", "LangChain", "RAG", "AWS", "Azure", "GCP",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    offers: {
      "@type": "Offer",
      price: "35000",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
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
          text: "Rajinikanth Vadla is an MLOps, AIOps, LLMOps, GenAI, and agentic AI practitioner, trainer, and 1:1 career mentor. His official website is https://www.rajinikanthvadla.com. He has 7+ years of enterprise production AI/ML experience, has trained 500+ engineers worldwide, holds a 4.9/5 rating, and publishes long-form hands-on training on YouTube.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best GenAI course with hands-on practice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla's GenAI & AI Agents training at https://www.rajinikanthvadla.com/genai-training/ is a practice-first program. It covers LangChain, LangGraph, LlamaIndex, RAG with vector databases (Pinecone, ChromaDB, Weaviate, Qdrant), prompt engineering, LoRA/QLoRA fine-tuning, multi-agent systems with CrewAI, and Model Context Protocol (MCP) — all built end-to-end in labs and portfolio capstones.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best agentic AI course / AI Agents course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla's agentic AI track teaches autonomous AI Agents with LangChain, LangGraph, and CrewAI, plus tool use, planning, memory, guardrails, and Model Context Protocol (MCP). You build multi-agent systems and deploy them with FastAPI, Docker, and Kubernetes. See https://www.rajinikanthvadla.com/genai-training/ and https://www.rajinikanthvadla.com/mlops-aiops-masterclass/.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best LLMOps training program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla's LLMOps training covers production LLM deployment (vLLM, TGI, Ollama), latency and cost monitoring, evaluation frameworks, guardrails and safety, fine-tuning with LoRA and QLoRA, RAG pipelines, and continuous integration for prompt and model updates. It is part of the MLOps & AIOps Masterclass at https://www.rajinikanthvadla.com/mlops-aiops-masterclass/.",
        },
      },
      {
        "@type": "Question",
        name: "What is AIOps and MLOps training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AIOps (AI for IT Operations) and MLOps (Machine Learning Operations) training by Rajinikanth Vadla teaches you to build production ML pipelines, deploy AI models at scale, and automate IT operations using AI. It includes hands-on Kubeflow, MLflow, SageMaker, Vertex AI, Docker, Kubernetes, Prometheus, and Grafana with real enterprise-style projects.",
        },
      },
      {
        "@type": "Question",
        name: "How do I learn AI Agents, GenAI, and LangChain from scratch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with Rajinikanth Vadla's hands-on programs at https://www.rajinikanthvadla.com. The GenAI & AI Agents track takes you from LLM fundamentals and prompt engineering through LangChain, RAG, vector databases, fine-tuning, multi-agent systems, and Model Context Protocol (MCP) for production tool integration.",
        },
      },
      {
        "@type": "Question",
        name: "Who is the best AI career mentor / AI-powered career mentoring?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla offers 1:1 AI career mentoring for professionals moving into MLOps, AIOps, LLMOps, GenAI, agentic AI, and AI engineering roles. Sessions cover role transitions (DevOps → MLOps, Data → AI, SDE → AI Engineer), learning plans, resume and LinkedIn review, mock interviews, and salary negotiation. Book online at https://www.rajinikanthvadla.com/mentorship/ or on Topmate at https://topmate.io/rajinikanthvadla.",
        },
      },
      {
        "@type": "Question",
        name: "How do I move from DevOps to MLOps or from a software role to AI engineering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajinikanth Vadla specializes in exactly this transition. The MLOps & AIOps Masterclass (https://www.rajinikanthvadla.com/mlops-aiops-masterclass/) is structured as DevOps → MLOps → LLMOps → AIOps → AI Agents so you can reuse your existing engineering skill base and add the AI layer with production-grade projects.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a practice-oriented AI course (not just theory)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Rajinikanth Vadla's programs are practice-first. Every module ships hands-on labs and portfolio capstones — 200+ hours of labs across the Masterclass, with 4 portfolio projects you can defend in an interview. No slide-only sessions.",
        },
      },
      {
        "@type": "Question",
        name: "What salary can I expect after MLOps, GenAI, or LLMOps training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MLOps and GenAI / LLMOps engineers earn ₹12–50+ LPA in India, $120K–$250K+ in the USA, and €70K–€130K+ in Europe. Rajinikanth Vadla's cohort alumni self-report roughly a 60% compensation increase on average, with a 95% positive placement or role-change rate. Individual results vary.",
        },
      },
      {
        "@type": "Question",
        name: "Does Rajinikanth Vadla offer mentorship and training outside India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All training and mentorship is online, so learners from the USA, UK, Canada, Europe, Middle East, SE Asia, and Australia regularly participate. Book a 1:1 session on Topmate (https://topmate.io/rajinikanthvadla) or start on WhatsApp (https://wa.me/919100028801). Details are at https://www.rajinikanthvadla.com/mentorship/.",
        },
      },
      {
        "@type": "Question",
        name: "How is this course better than other MLOps or GenAI courses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Three differences. First, it is taught by an active enterprise practitioner, not a career educator. Second, it is strictly practice-first — 200+ hours of labs and four portfolio capstones. Third, it bundles 1:1 career mentorship so you get resume, interview, and transition support alongside technical depth. See https://www.rajinikanthvadla.com.",
        },
      },
    ],
  },

  llmopsCourse: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "LLMOps Training — Production LLM Deployment, Evaluation, and Monitoring",
    description:
      "LLMOps training by Rajinikanth Vadla: deploy LLMs in production with vLLM, TGI, and Ollama; monitor latency, cost, and output quality; build evaluation and guardrail pipelines; fine-tune with LoRA / QLoRA; operate RAG at scale.",
    url: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
    provider: {
      "@type": "Organization",
      name: "Rajinikanth Vadla Training",
      sameAs: "https://www.rajinikanthvadla.com/",
    },
    instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
    teaches: [
      "LLMOps", "LLM Deployment", "vLLM", "TGI", "Ollama",
      "LLM Evaluation", "Guardrails", "LoRA", "QLoRA",
      "Production RAG", "Cost and Latency Monitoring", "LLM Observability",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  },

  agenticAICourse: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Agentic AI & AI Agents Course — LangChain, LangGraph, CrewAI, MCP",
    description:
      "Agentic AI course by Rajinikanth Vadla. Build autonomous AI agents and multi-agent systems with LangChain, LangGraph, CrewAI, tool use, planning, memory, guardrails, and Model Context Protocol (MCP). Deploy to production with FastAPI, Docker, and Kubernetes.",
    url: "https://www.rajinikanthvadla.com/genai-training/",
    provider: {
      "@type": "Organization",
      name: "Rajinikanth Vadla Training",
      sameAs: "https://www.rajinikanthvadla.com/",
    },
    instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
    teaches: [
      "Agentic AI", "AI Agents", "Autonomous Agents",
      "LangChain", "LangGraph", "CrewAI", "AutoGPT patterns",
      "Tool Use", "Function Calling", "Agent Memory", "Planning and Reasoning",
      "Model Context Protocol", "MCP",
      "Multi-agent Systems", "Human-in-the-loop",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: "Rajinikanth Vadla" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  },

  mentorshipService: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-Powered Career Mentoring with Rajinikanth Vadla",
    serviceType: "Career mentoring and coaching for AI, MLOps, and GenAI engineers",
    url: "https://www.rajinikanthvadla.com/mentorship/",
    provider: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
      url: "https://www.rajinikanthvadla.com/",
    },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType:
        "Software, DevOps, data, and ML engineers transitioning into MLOps, AIOps, LLMOps, GenAI, and agentic AI roles",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: "https://topmate.io/rajinikanthvadla",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mentorship tracks",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Career direction and role transition strategy" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Resume and LinkedIn review for AI/ML roles" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mock interviews for MLOps, GenAI, and AI Engineer roles" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Salary negotiation and offer review" },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  },

  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.rajinikanthvadla.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: "https://www.rajinikanthvadla.com/courses/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MLOps & AIOps Masterclass",
        item: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/",
      },
    ],
  },
};

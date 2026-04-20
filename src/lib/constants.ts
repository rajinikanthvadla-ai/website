export const SITE = {
  name: "Rajinikanth Vadla",
  title:
    "Rajinikanth Vadla — MLOps, AIOps & GenAI Training",
  description:
    "Live MLOps, AIOps & GenAI training — 500+ engineers trained, hands-on labs, 1:1 mentorship worldwide. WhatsApp for the next cohort.",
  url: "https://www.rajinikanthvadla.com",
  image: "https://www.rajinikanthvadla.com/assets/pic-1.png",
  phone: "+91-9100028801",
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
    jobTitle: "MLOps, AIOps, GenAI, AI Agents Expert, Trainer & Mentor",
    description:
      "MLOps, AIOps, GenAI, and AI Agents trainer and mentor. Offers live cohorts and 1:1 mentorship for career direction, role transitions, and technical depth. Works with engineers globally via online sessions. 7+ years enterprise experience; 500+ people trained and mentored.",
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
          text: "Rajinikanth Vadla is an MLOps, AIOps, GenAI, and AI Agents trainer and practitioner. His official website is https://www.rajinikanthvadla.com. He has 7+ years enterprise experience, has trained 500+ engineers, and publishes long-form training on YouTube.",
        },
      },
      {
        "@type": "Question",
        name: "What is the official Rajinikanth Vadla website for MLOps training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official site is https://www.rajinikanthvadla.com. There you will find the MLOps & AIOps Masterclass (DevOps through MLOps, LLMOps, AIOps, and AI Agents), cohort details, syllabus via WhatsApp, and enrollment links.",
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
    ],
  },
};

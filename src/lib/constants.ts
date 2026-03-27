export const SITE = {
  name: "Rajinikanth Vadla",
  title: "Best DevOps, MLOps, AIOps & AI Agents Training | Rajinikanth Vadla",
  description:
    "Master Real-Time DevOps, MLOps, AIOps, and AI Agents. Hands-on projects with AWS, Azure, GCP, Kubernetes. 500+ engineers trained. Join the best training program with placement assistance.",
  url: "https://www.rajinikanthvadla.com",
  image: "https://www.rajinikanthvadla.com/assets/pic-1.png",
  phone: "+91-9100028801",
};

export const LINKS = {
  topmate: "https://topmate.io/rajinikanthvadla",
  enroll: "https://topmate.io/rajinikanthvadla/1838028/pay",
  whatsapp: "https://wa.me/919100028801",
  whatsappSyllabus:
    "https://wa.me/919100028801?text=Hi%20Rajinikanth,%20I%20want%20to%20know%20batch%20details%20and%20syllabus",
  whatsappChannel:
    "https://whatsapp.com/channel/0029VbBxmp7Fy7262q1Ti72e",
  linkedin: "https://www.linkedin.com/in/rajinikanth-vadla-4221281a4/",
  youtube: "https://www.youtube.com/@IamRajinikanthvadla",
  instagram: "https://www.instagram.com/rajinikanth_vadla_/",
  myGPT:
    "https://chatgpt.com/g/g-6938ef4591f4819198b381b03cf8707b-rajinikanth-vadla-ai-ml-ops-engineer-mentor",
};

export const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Contact", href: "/contact" },
  { label: "Success Stories", href: "/#success-stories" },
];

export const STATS = [
  { value: "500+", label: "Engineers Trained" },
  { value: "50+", label: "Enterprise Projects" },
  { value: "4.9\u2605", label: "Average Rating" },
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
      "Complete 12-16 week program: DevOps to MLOps to LLMOps to AIOps to AI Agents. Build production-ready AI systems!",
    features: [
      "6 Comprehensive Modules",
      "200+ Hours Hands-on Training",
      "4 Portfolio Capstone Projects",
      "LangChain, RAG, AI Agents",
    ],
    badge: "FLAGSHIP",
    color: "accent" as const,
    href: "/mlops-aiops-masterclass",
    ctaText: "View Syllabus",
    featured: true,
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
    color: "primary" as const,
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
    color: "primary" as const,
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
    color: "primary" as const,
    href: LINKS.topmate,
    ctaText: "Enroll Now",
    featured: false,
  },
];

export const SERVICES = [
  {
    icon: "robot",
    title: "AI Agents & GenAI",
    description:
      "Build autonomous AI agents with LangChain, RAG systems, LLMs, and production AI applications.",
    href: "/genai-training",
  },
  {
    icon: "brain",
    title: "MLOps Engineering",
    description:
      "Deploy ML models to production, MLflow, Kubeflow, SageMaker, model monitoring & pipelines.",
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
];

export const VIDEOS = [
  {
    id: "jNQXAC9IVRw",
    title: "MLOps Zero to Hero",
    description:
      "Fundamental concepts of MLOps and how to separate it from traditional Data Science.",
  },
  {
    id: "2uYu2W7W88E",
    title: "Real Company Production Pipeline",
    description:
      "End-to-end walkthrough of a real-world machine learning pipeline in production.",
  },
  {
    id: "s_O8o2G7gK0",
    title: "Kubernetes for DevOps",
    description:
      "How to manage and orchestrate containers at scale using Kubernetes.",
  },
];

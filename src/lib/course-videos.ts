export type CourseVideo = {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
};

/** Channel videos mapped to course pages for embeds + VideoObject SEO. */
export const COURSE_VIDEOS = {
  masterclass: [
    {
      id: "eWDa3NyUM94",
      title: "MLOps, LLMOps, AIOps & AI Agents Course | Build Real Enterprise AI Systems",
      description:
        "Overview of Rajinikanth Vadla's job-ready MLOps, LLMOps, AIOps and AI Agents masterclass — how the live course builds real enterprise AI systems.",
      uploadDate: "2026-07-11T18:11:43+00:00",
    },
    {
      id: "3bCsWPQE3YU",
      title: "DAY-02 | MLOps, LLMOps, AIOps, AI Agents Course | Job Ready",
      description:
        "Day 02 live class from the MLOps and AI Agents job-ready course covering the full stack from MLOps through agentic operations.",
      uploadDate: "2026-07-13T18:48:13+00:00",
    },
    {
      id: "qEaDZ0KW7Ww",
      title: "DAY 03 | Network Fundamentals for MLOps, LLMOps, AIOps & AI Agents",
      description:
        "Network fundamentals every MLOps and AI engineer needs before Kubernetes, Docker, LLM infra and production AI systems.",
      uploadDate: "2026-07-14T20:42:37+00:00",
    },
    {
      id: "GThudNtXHRA",
      title: "AI Agents Full Course 2026 | MLOps, LLMOps, AIOps & AgentOps Masterclass",
      description:
        "Full AI Agents class from the masterclass: AgentOps, multi-agent systems and production agent patterns.",
      uploadDate: "2026-05-04T18:37:21+00:00",
    },
  ],
  aiAutomation: [
    {
      id: "Ua_C-8PQVH4",
      title: "AI-Powered Automation Engineering Course | Live Demo for Real Enterprise Engineers",
      description:
        "Live demo of the AI-Powered Automation Engineering course — build company AI agents with MCP, RAG and enterprise tools.",
      uploadDate: "2026-07-12T03:21:57+00:00",
    },
    {
      id: "G0-_aJriNMg",
      title: "AI Automation + MLOps Career Program Courses For Job Ready",
      description:
        "How the AI Automation and MLOps career programs prepare engineers for job-ready AI roles.",
      uploadDate: "2026-07-07T15:21:26+00:00",
    },
    {
      id: "b-99wp-KRJ8",
      title: "MCP Server Setup: Build Remote MCP Server Hands-On Lab 2026",
      description:
        "Hands-on MCP server lab from the AI Automation path — build remote Model Context Protocol servers.",
      uploadDate: "2026-05-15T17:58:49+00:00",
    },
    {
      id: "gzaCk7nafGU",
      title: "AWS Bedrock AI Agents Tutorial 2026 | Build Production Agents with AgentCore",
      description:
        "Build production AI agents on AWS Bedrock AgentCore — part of the AI automation and agents curriculum.",
      uploadDate: "2026-04-16T17:31:04+00:00",
    },
  ],
  genai: [
    {
      id: "Y8pJsGYqJFE",
      title: "How LLM Works Internally: Tokenizer → Transformer → Output | LLMOps Class 02",
      description:
        "GenAI and LLMOps class explaining how LLMs work internally — tokenizer, transformer, and output generation.",
      uploadDate: "2026-07-06T09:14:08+00:00",
    },
    {
      id: "htF6y63tm2I",
      title: "What Is an LLM? Transformers, Tokens, Attention — Explained for Infra Engineers",
      description:
        "GenAI fundamentals for infra and MLOps engineers: transformers, tokens and attention explained clearly.",
      uploadDate: "2026-07-01T08:45:28+00:00",
    },
    {
      id: "FLoFXAATw7s",
      title: "Serve LLMs at Scale: vLLM + Ray Serve + KubeRay Explained",
      description:
        "Serve LLMs in production with vLLM, Ray Serve and KubeRay — LLMOps for GenAI engineers.",
      uploadDate: "2026-04-07T19:48:29+00:00",
    },
  ],
  aiAgents: [
    {
      id: "i7PYe5fSJl8",
      title: "Build AI Agents with LangChain + LangGraph | Agentic AI Course 2026",
      description:
        "Hands-on agentic AI lab: build AI agents with LangChain and LangGraph in Rajinikanth Vadla's AI Agents course.",
      uploadDate: "2026-05-06T17:40:26+00:00",
    },
    {
      id: "GThudNtXHRA",
      title: "AI Agents Full Course 2026 | MLOps, LLMOps, AIOps & AgentOps Masterclass",
      description:
        "AI Agents full course session covering AgentOps and production multi-agent systems.",
      uploadDate: "2026-05-04T18:37:21+00:00",
    },
    {
      id: "gzaCk7nafGU",
      title: "AWS Bedrock AI Agents Tutorial 2026 | Build Production Agents with AgentCore",
      description:
        "Production AI agents on AWS Bedrock — core skill in the AI agentic course path.",
      uploadDate: "2026-04-16T17:31:04+00:00",
    },
  ],
  aiops: [
    {
      id: "PeGnsce3W1U",
      title: "What is AIOps? 5 Real Enterprise Pain Points That Killed DevOps",
      description:
        "What AIOps is and why enterprises need it — five real pain points beyond classic DevOps.",
      uploadDate: "2026-04-18T18:16:13+00:00",
    },
    {
      id: "jqoFLtA35Vg",
      title: "AIOps Hands-On Labs | Real-Time Anomaly Detection, RCA & Predictive Ops",
      description:
        "AIOps labs: anomaly detection, root cause analysis and predictive ops for DevOps engineers.",
      uploadDate: "2026-04-30T20:12:22+00:00",
    },
    {
      id: "eXsltT8baj0",
      title: "AIOps Lab Day-01: Detect CPU Anomalies",
      description:
        "Hands-on AIOps lab using Prometheus, Grafana and ML to detect CPU anomalies in real time.",
      uploadDate: "2025-03-10T17:53:40+00:00",
    },
  ],
  home: [
    {
      id: "eWDa3NyUM94",
      title: "MLOps, LLMOps, AIOps & AI Agents Course | Build Real Enterprise AI Systems",
      description:
        "Job-ready MLOps and AI Agents course overview by Rajinikanth Vadla.",
      uploadDate: "2026-07-11T18:11:43+00:00",
    },
    {
      id: "Ua_C-8PQVH4",
      title: "AI-Powered Automation Engineering Course | Live Demo",
      description:
        "Live demo of the AI-Powered Automation Engineering course for enterprise engineers.",
      uploadDate: "2026-07-12T03:21:57+00:00",
    },
    {
      id: "i7PYe5fSJl8",
      title: "Build AI Agents with LangChain + LangGraph | Agentic AI Course 2026",
      description:
        "Build AI agents with LangChain and LangGraph — free lab from the agentic AI course.",
      uploadDate: "2026-05-06T17:40:26+00:00",
    },
  ],
} as const satisfies Record<string, CourseVideo[]>;

export function videoObjectSchema(video: CourseVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    ],
    uploadDate: video.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    publisher: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
      url: "https://www.rajinikanthvadla.com/",
      sameAs: ["https://www.youtube.com/@IamRajinikanthvadla"],
    },
  };
}

export function videoListSchema(videos: CourseVideo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: videoObjectSchema(video),
    })),
  };
}

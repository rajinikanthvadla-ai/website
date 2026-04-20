import type { Metadata } from "next";
import TrainingPageLayout from "@/components/TrainingPageLayout";

export const metadata: Metadata = {
  title: "GenAI & AI Agents Training — LangChain, RAG, LLMs",
  description:
    "Build AI Agents & production GenAI apps — LangChain, RAG, LLM deployment, vector DBs, MCP. Hands-on with GPT, Claude, LLaMA. ₹35,000.",
  keywords: [
    "GenAI training", "Generative AI course", "AI Agents training", "LangChain course",
    "RAG training", "LLM training", "LLM deployment course", "prompt engineering course",
    "vector database training", "AI agent development", "best GenAI course India",
    "LangChain tutorial", "RAG system course", "fine-tuning LLM", "GPT training",
    "Claude AI training", "LLaMA training", "multi-agent systems", "CrewAI course",
    "Model Context Protocol MCP", "AI automation training", "GenAI certification",
    "production AI applications", "Rajinikanth Vadla GenAI",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/genai-training" },
};

export default function GenAITrainingPage() {
  return (
    <TrainingPageLayout
      title="GenAI, AI Agents & LLM Training"
      subtitle="Master Generative AI, build production AI Agents with LangChain, deploy LLMs, build RAG systems, and create autonomous AI applications. The most comprehensive GenAI training in India."
      intro="Generative AI and AI Agents are the fastest-growing fields in technology. Companies worldwide are racing to build AI-powered products using Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and autonomous AI Agents. This training by Rajinikanth Vadla covers everything from foundational GenAI concepts to production-grade AI Agent deployment. You'll learn LangChain, LlamaIndex, vector databases (Pinecone, ChromaDB, Weaviate), prompt engineering, LLM fine-tuning (LoRA, QLoRA), Model Context Protocol (MCP), multi-agent systems (CrewAI), and enterprise AI application architecture. Every concept is taught with hands-on labs and real-world projects."
      whatYouLearn={[
        "Build autonomous AI Agents with LangChain and LlamaIndex",
        "Design and deploy production RAG systems with vector databases",
        "Master prompt engineering patterns and techniques",
        "Fine-tune open-source LLMs (LLaMA, Mistral) with LoRA/QLoRA",
        "Build multi-agent systems with CrewAI and AutoGPT patterns",
        "Implement Model Context Protocol (MCP) for tool integration",
        "Deploy LLM applications with FastAPI and Docker",
        "Monitor LLM performance, cost, and output quality",
        "Build enterprise-grade AI chatbots and assistants",
        "Implement guardrails, content filtering, and responsible AI",
        "Use vector databases: Pinecone, ChromaDB, Weaviate, Qdrant",
        "Create production AI pipelines with CI/CD for ML",
      ]}
      modules={[
        { title: "GenAI & LLM Fundamentals", topics: ["What is Generative AI and how LLMs work", "Transformer architecture deep dive", "GPT, Claude, LLaMA, Mistral comparison", "Token economics and cost optimization", "API integration patterns"] },
        { title: "Prompt Engineering Mastery", topics: ["Zero-shot, few-shot, chain-of-thought prompting", "Prompt templates and versioning", "Prompt testing and evaluation frameworks", "Advanced techniques: ReAct, Tree of Thought", "Building prompt management systems"] },
        { title: "RAG Systems & Vector Databases", topics: ["RAG architecture and design patterns", "Document chunking and embedding strategies", "Vector databases: Pinecone, ChromaDB, Weaviate", "Hybrid search and re-ranking", "Production RAG optimization and evaluation"] },
        { title: "LLM Fine-tuning", topics: ["Fine-tuning methodologies overview", "LoRA and QLoRA techniques", "Dataset preparation and curation", "Evaluation metrics for fine-tuned models", "Deploying fine-tuned models to production"] },
        { title: "AI Agent Development", topics: ["Agent architecture and design patterns", "LangChain agent framework deep dive", "Tool use and function calling", "Agent memory: short-term and long-term", "Planning, reasoning, and task decomposition"] },
        { title: "Multi-Agent Systems", topics: ["Multi-agent architectures and communication", "CrewAI for collaborative agent teams", "Role specialization and delegation", "Human-in-the-loop workflows", "Enterprise deployment and monitoring"] },
        { title: "Model Context Protocol (MCP)", topics: ["MCP architecture and concepts", "Building MCP servers and clients", "Tool integration via MCP", "Security and access control", "Production MCP deployment"] },
        { title: "Production AI Applications", topics: ["FastAPI for LLM serving", "Docker containerization for AI apps", "Kubernetes deployment at scale", "Monitoring: latency, cost, quality", "CI/CD pipelines for AI applications"] },
        { title: "Responsible AI & Guardrails", topics: ["Content filtering and safety", "Bias detection and mitigation", "Output validation and guardrails", "Compliance and governance", "Explainability and transparency"] },
        { title: "Capstone: Enterprise AI Agent", topics: ["Design and build a complete AI agent system", "Multi-agent workflow with tool integration", "RAG-powered knowledge base", "Production deployment with monitoring", "Portfolio-ready documentation"] },
      ]}
      faqs={[
        { q: "What is the best GenAI training in India?", a: "Rajinikanth Vadla's GenAI & AI Agents training is rated the best in India with 4.9/5 rating. It covers LangChain, RAG, LLM deployment, multi-agent systems, and production AI applications with hands-on enterprise projects." },
        { q: "Do I need ML/AI background for this course?", a: "Basic Python programming is sufficient. We teach GenAI concepts from fundamentals. However, having some familiarity with APIs and web development will help you progress faster." },
        { q: "What is the difference between GenAI and traditional ML?", a: "Traditional ML focuses on prediction and classification, while GenAI focuses on content generation using Large Language Models. This course teaches you to build, deploy, and manage GenAI applications in production." },
        { q: "Will I learn to build AI Agents?", a: "Yes! A major part of this course is dedicated to building autonomous AI Agents using LangChain, CrewAI, and custom frameworks. You'll build agents that can reason, plan, use tools, and take actions." },
        { q: "What salary can I expect after GenAI training?", a: "GenAI/LLM Engineers earn ₹15-50+ LPA in India, $130K-$250K+ in USA. This is one of the highest-paying specializations in tech right now." },
        { q: "Is there job assistance after the course?", a: "Yes! Resume optimization, LinkedIn profile review, mock interviews, and placement support are included. Our students have a 95% placement rate." },
      ]}
      relatedCourses={[
        { title: "MLOps Training", href: "/mlops-training" },
        { title: "AIOps Training", href: "/aiops-training" },
        { title: "Complete Masterclass", href: "/mlops-aiops-masterclass" },
      ]}
    />
  );
}

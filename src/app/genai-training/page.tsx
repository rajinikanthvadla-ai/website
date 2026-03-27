import type { Metadata } from "next";
import TrainingPageLayout from "@/components/TrainingPageLayout";

export const metadata: Metadata = {
  title: "GenAI & AI Agents Training",
  description: "Master Generative AI, LangChain, RAG systems, AI Agents, LLM deployment, and prompt engineering with hands-on training.",
};

export default function GenAITrainingPage() {
  return (
    <TrainingPageLayout
      title="GenAI & AI Agents Training"
      subtitle="Master the most in-demand AI skills of 2026 - from LLMs to autonomous AI agents."
      intro="Generative AI and AI Agents are transforming every industry. This training program takes you from understanding LLM fundamentals to building production-ready AI applications. You'll learn LangChain, RAG architectures, prompt engineering, fine-tuning, and multi-agent systems with real-world projects."
      whatYouLearn={[
        "LLM Fundamentals & Architecture",
        "Prompt Engineering & Templates",
        "RAG Systems with Vector Databases",
        "LangChain Framework Development",
        "AI Agent Architecture & Design",
        "Model Context Protocol (MCP)",
        "Multi-Agent Systems with CrewAI",
        "Fine-tuning (LoRA, QLoRA)",
        "Production LLM Deployment",
        "AI Application Security & Guardrails",
      ]}
      modules={[
        { title: "LLM Fundamentals", topics: ["Transformer architecture", "GPT, LLaMA, Claude comparison", "Tokenization & embeddings", "API integration"] },
        { title: "Prompt Engineering", topics: ["Prompt patterns & techniques", "Chain-of-thought prompting", "Few-shot & zero-shot", "Prompt testing frameworks"] },
        { title: "RAG Systems", topics: ["RAG architecture design", "Vector databases (ChromaDB, Pinecone)", "Document chunking strategies", "Hybrid search techniques"] },
        { title: "LangChain Development", topics: ["Chains & agents", "Memory management", "Tool integration", "Output parsers"] },
        { title: "AI Agent Development", topics: ["Agent architecture patterns", "Function calling", "Multi-agent systems", "CrewAI framework"] },
        { title: "Fine-tuning & Deployment", topics: ["LoRA & QLoRA techniques", "Dataset preparation", "Model evaluation", "Production deployment"] },
        { title: "MCP & Tool Use", topics: ["Model Context Protocol", "Custom tool development", "API integration", "Enterprise patterns"] },
        { title: "Security & Guardrails", topics: ["Content filtering", "Bias detection", "Output validation", "Compliance frameworks"] },
        { title: "Production Systems", topics: ["Scalable architecture", "Monitoring & observability", "Cost optimization", "A/B testing"] },
        { title: "Capstone Project", topics: ["End-to-end AI application", "RAG + Agents integration", "Production deployment", "Portfolio presentation"] },
      ]}
      faqs={[
        { q: "Do I need ML experience?", a: "Basic Python knowledge is sufficient. We teach AI/ML concepts from scratch with a focus on practical application." },
        { q: "Which LLMs do we work with?", a: "We cover both proprietary (GPT, Claude) and open-source (LLaMA, Mistral) models with hands-on projects." },
        { q: "Is this different from the Masterclass?", a: "This is a focused GenAI track. The Masterclass covers the full pipeline (DevOps → MLOps → LLMOps → AIOps → AI Agents)." },
        { q: "What projects will I build?", a: "You'll build a production RAG chatbot, multi-agent system, custom AI tools, and a full-stack AI application." },
      ]}
    />
  );
}

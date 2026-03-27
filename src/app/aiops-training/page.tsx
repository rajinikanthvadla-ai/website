import type { Metadata } from "next";
import TrainingPageLayout from "@/components/TrainingPageLayout";

export const metadata: Metadata = {
  title: "AIOps Training",
  description: "Master AI for IT Operations - anomaly detection, predictive analytics, self-healing infrastructure, and intelligent automation.",
};

export default function AIOpsTrainingPage() {
  return (
    <TrainingPageLayout
      title="AIOps Training"
      subtitle="Automate IT operations with AI-powered monitoring, prediction, and remediation."
      intro="AIOps (AI for IT Operations) is revolutionizing how organizations manage their infrastructure. Learn to build intelligent systems that detect anomalies, predict failures, perform root cause analysis, and automatically remediate issues. This hands-on training covers everything from data collection to building self-healing infrastructure."
      whatYouLearn={[
        "AIOps Fundamentals & Architecture",
        "IT Data Collection & Telemetry",
        "Anomaly Detection with ML",
        "Predictive Analytics & Forecasting",
        "Root Cause Analysis Automation",
        "Self-Healing Infrastructure",
        "Kubernetes Observability",
        "Cloud-Native AIOps Patterns",
        "Event Correlation & Alerting",
        "Chaos Engineering & Resilience",
      ]}
      modules={[
        { title: "AIOps Fundamentals", topics: ["AIOps concepts & maturity model", "Business value & ROI", "vs Traditional IT Ops", "Implementation strategies"] },
        { title: "IT Data Collection", topics: ["Telemetry & metrics collection", "Log aggregation systems", "APM integration", "Data pipeline frameworks"] },
        { title: "Anomaly Detection", topics: ["Statistical methods", "ML-based detection models", "Time-series analysis", "Multivariate analysis"] },
        { title: "Predictive Analytics", topics: ["Failure prediction models", "Capacity planning", "SLA optimization", "Resource forecasting"] },
        { title: "Root Cause Analysis", topics: ["Automated RCA systems", "Event correlation", "Pattern recognition", "Causal inference"] },
        { title: "Self-Healing Infrastructure", topics: ["Auto-remediation patterns", "Self-healing systems design", "Chaos engineering", "Resilience testing"] },
        { title: "Cloud-Native AIOps", topics: ["Kubernetes observability", "Microservices health monitoring", "Serverless monitoring", "Container intelligence"] },
        { title: "Monitoring Stack", topics: ["Prometheus & Grafana", "ELK/EFK Stack", "Distributed tracing", "Custom dashboards"] },
        { title: "Enterprise Integration", topics: ["ITSM integration", "ServiceNow workflows", "PagerDuty automation", "Compliance & governance"] },
        { title: "Capstone Project", topics: ["End-to-end AIOps system", "Anomaly detection + remediation", "Production deployment", "Dashboard & alerting"] },
      ]}
      faqs={[
        { q: "What is AIOps?", a: "AIOps uses AI and ML to automate IT operations including monitoring, anomaly detection, root cause analysis, and incident remediation." },
        { q: "Who should take this course?", a: "DevOps engineers, SREs, IT operations professionals, and anyone wanting to add AI capabilities to infrastructure management." },
        { q: "What prerequisites are needed?", a: "Basic Linux, networking knowledge, and familiarity with monitoring tools. We teach the ML/AI concepts from scratch." },
        { q: "What tools will I learn?", a: "Prometheus, Grafana, ELK Stack, Kubernetes, Python, Scikit-learn, and enterprise AIOps platforms." },
        { q: "How is this different from MLOps?", a: "MLOps focuses on deploying ML models. AIOps focuses on using AI to automate IT operations and infrastructure management." },
        { q: "What's the salary for AIOps engineers?", a: "AIOps engineers earn ₹12-30 LPA in India, $100K-$180K+ in the US, with high demand across industries." },
      ]}
      relatedCourses={[
        { title: "MLOps Training", href: "/mlops-training" },
        { title: "GenAI & AI Agents", href: "/genai-training" },
        { title: "All Courses", href: "/courses" },
      ]}
    />
  );
}

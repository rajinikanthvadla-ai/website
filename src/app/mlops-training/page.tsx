import type { Metadata } from "next";
import TrainingPageLayout from "@/components/TrainingPageLayout";

export const metadata: Metadata = {
  title: "MLOps Training",
  description: "Master Machine Learning Operations - ML pipelines, MLflow, Kubeflow, model deployment, monitoring, and CI/CD for ML.",
};

export default function MLOpsTrainingPage() {
  return (
    <TrainingPageLayout
      title="MLOps Training"
      subtitle="Build automated, scalable ML pipelines from experimentation to production."
      intro="MLOps bridges the gap between ML experimentation and production deployment. Learn to build end-to-end ML pipelines, manage model lifecycle, implement CI/CD for ML, and monitor models in production. This hands-on training covers industry-standard tools like MLflow, Kubeflow, Docker, Kubernetes, and cloud ML platforms."
      whatYouLearn={[
        "MLOps Fundamentals & Best Practices",
        "ML Pipeline Design & Orchestration",
        "Experiment Tracking with MLflow",
        "Model Versioning & Registry",
        "CI/CD Pipelines for ML",
        "Model Deployment Strategies",
        "Data & Model Drift Detection",
        "Feature Engineering at Scale",
        "Kubeflow & Cloud ML Platforms",
        "Production Model Monitoring",
      ]}
      modules={[
        { title: "MLOps Fundamentals", topics: ["ML lifecycle & maturity model", "MLOps vs DevOps", "Industry best practices", "Common deployment challenges"] },
        { title: "Data Engineering for ML", topics: ["Data ingestion & validation", "Feature engineering at scale", "Feature stores (Feast)", "Data quality monitoring"] },
        { title: "Experiment Tracking", topics: ["MLflow for tracking", "Weights & Biases", "Hyperparameter optimization", "Reproducible research"] },
        { title: "Model Versioning", topics: ["Code versioning with Git", "Data versioning with DVC", "Model registry strategies", "Artifact management"] },
        { title: "Model Deployment", topics: ["Model serialization (ONNX, SavedModel)", "RESTful API with FastAPI", "Batch inference systems", "Serving architectures"] },
        { title: "ML CI/CD Pipelines", topics: ["Automated testing for ML", "Continuous training & deployment", "ML-specific CI/CD", "Pipeline orchestration"] },
        { title: "Model Monitoring", topics: ["Performance metrics tracking", "Data drift detection", "Concept drift detection", "A/B testing for ML"] },
        { title: "ML Orchestration", topics: ["Kubeflow Pipelines", "AWS SageMaker Pipelines", "Azure ML Pipelines", "Vertex AI Pipelines"] },
        { title: "Cloud ML Platforms", topics: ["AWS SageMaker deep dive", "Azure ML workspace", "GCP Vertex AI", "Cost optimization"] },
        { title: "Capstone Project", topics: ["End-to-end MLOps pipeline", "Automated training & deployment", "Monitoring & retraining", "Production documentation"] },
      ]}
      faqs={[
        { q: "What is MLOps?", a: "MLOps (Machine Learning Operations) is a set of practices for deploying and maintaining ML models in production reliably and efficiently." },
        { q: "Do I need to know Machine Learning?", a: "Basic understanding of ML concepts helps, but we focus on the operations side. You'll learn enough ML to understand the pipeline." },
        { q: "What tools will I master?", a: "MLflow, Kubeflow, Docker, Kubernetes, FastAPI, DVC, Feast, Prometheus, Grafana, and cloud ML platforms (AWS, Azure, GCP)." },
        { q: "What's the salary for MLOps engineers?", a: "MLOps Engineers earn ₹12-35 LPA in India, $120K-$200K+ in the US. It's one of the fastest-growing tech roles." },
      ]}
    />
  );
}

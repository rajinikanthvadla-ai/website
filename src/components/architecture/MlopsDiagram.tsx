import { Lane, NodeBox, FlowArrow, FlowPath } from "./DiagramPrimitives";

/**
 * MLOps production architecture (fraud detection / demand forecasting).
 * Numbered badges match the step list in src/app/architecture/page.tsx.
 */
export default function MlopsDiagram() {
  return (
    <svg viewBox="0 0 1160 630" className="min-w-[1000px] w-full" role="img" aria-label="MLOps production architecture diagram">
      <defs>
        <marker id="ml-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#64748b" />
        </marker>
        <marker id="ml-arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#b45309" />
        </marker>
      </defs>

      {/* Lanes */}
      <Lane x={10} y={30} w={170} h={430} label="Data Sources" tint="#eff6ff" stroke="#bfdbfe" />
      <Lane x={200} y={30} w={190} h={430} label="Pipelines & Features" tint="#f0fdf4" stroke="#bbf7d0" />
      <Lane x={410} y={30} w={220} h={430} label="Training & Registry" tint="#fff7ed" stroke="#fed7aa" />
      <Lane x={650} y={30} w={220} h={430} label="CI/CD & Serving" tint="#f5f3ff" stroke="#ddd6fe" />
      <Lane x={890} y={30} w={180} h={330} label="Observability" tint="#fef2f2" stroke="#fecaca" />
      <Lane x={10} y={480} w={1060} h={80} label="Cloud & Infrastructure as Code" tint="#f1f5f9" stroke="#cbd5e1" />

      {/* Data sources */}
      <NodeBox x={20} y={60} w={150} h={58} title="PostgreSQL" subtitle="transactions" icons={[{ slug: "postgresql" }]} />
      <NodeBox x={20} y={140} w={150} h={58} title="Snowflake" subtitle="analytics DWH" icons={[{ slug: "snowflake" }]} />
      <NodeBox x={20} y={220} w={150} h={58} title="Kafka" subtitle="event streams" icons={[{ slug: "apachekafka" }]} />
      <NodeBox x={20} y={300} w={150} h={58} title="REST / Events" subtitle="app traffic" icons={[{ fallback: "AP", color: "#0ea5e9" }]} />

      {/* Pipelines */}
      <NodeBox x={215} y={60} w={160} h={70} title="Airflow" subtitle="orchestration · DAGs" icons={[{ slug: "apacheairflow" }]} />
      <NodeBox x={215} y={150} w={160} h={70} title="Spark" subtitle="batch & stream ETL" icons={[{ slug: "apachespark" }]} />
      <NodeBox x={215} y={250} w={160} h={80} title="Feature Store" subtitle="Feast · offline + online" icons={[{ fallback: "FS", color: "#e11d48" }, { slug: "redis" }]} />

      {/* Training & registry */}
      <NodeBox x={425} y={60} w={190} h={70} title="MLflow Tracking" subtitle="experiments · metrics" icons={[{ slug: "mlflow" }]} />
      <NodeBox x={425} y={150} w={190} h={80} title="Distributed Training" subtitle="Ray on K8s · NVIDIA GPUs" icons={[{ slug: "ray" }, { slug: "kubernetes" }, { slug: "nvidia" }]} />
      <NodeBox x={425} y={250} w={190} h={70} title="Model Registry" subtitle="versioned · staged" icons={[{ slug: "mlflow" }]} />

      {/* CI/CD & serving */}
      <NodeBox x={665} y={60} w={190} h={70} title="GitHub Actions" subtitle="test · build · scan" icons={[{ slug: "githubactions" }]} />
      <NodeBox x={665} y={150} w={190} h={60} title="Docker" subtitle="image → registry" icons={[{ slug: "docker" }]} />
      <NodeBox x={665} y={230} w={190} h={70} title="ArgoCD + K8s" subtitle="GitOps sync" icons={[{ slug: "argo" }, { slug: "kubernetes" }]} />
      <NodeBox x={665} y={320} w={190} h={80} title="Model Serving" subtitle="KServe · vLLM · NGINX :443" icons={[{ slug: "vllm" }, { slug: "fastapi" }, { slug: "nginx" }]} />

      {/* Observability */}
      <NodeBox x={905} y={60} w={150} h={60} title="Prometheus" subtitle="metrics scrape" icons={[{ slug: "prometheus" }]} />
      <NodeBox x={905} y={140} w={150} h={60} title="Grafana" subtitle="dashboards · alerts" icons={[{ slug: "grafana" }]} />
      <NodeBox x={905} y={220} w={150} h={60} title="Evidently" subtitle="data & model drift" icons={[{ fallback: "EV", color: "#f59e0b" }]} />

      {/* Cloud & IaC */}
      <NodeBox x={60} y={506} w={220} h={50} title="Terraform" icons={[{ slug: "terraform" }]} fill="#f8fafc" />
      <NodeBox x={330} y={506} w={220} h={50} title="AWS" icons={[{ fallback: "AW", color: "#ff9900" }]} fill="#f8fafc" />
      <NodeBox x={600} y={506} w={220} h={50} title="Google Cloud" icons={[{ slug: "googlecloud" }]} fill="#f8fafc" />
      <text x={850} y={538} fontSize={10} fill="#64748b">EKS/GKE clusters · S3/GCS artifacts · IAM</text>

      {/* Flows */}
      {/* 1: sources -> Airflow */}
      <FlowArrow x1={170} y1={89} x2={213} y2={92} marker="ml-arrow" />
      <FlowArrow x1={170} y1={169} x2={213} y2={105} marker="ml-arrow" step={1} />
      <FlowArrow x1={170} y1={249} x2={213} y2={118} marker="ml-arrow" />
      <FlowArrow x1={170} y1={329} x2={213} y2={122} marker="ml-arrow" />
      {/* 2,3: pipeline chain */}
      <FlowArrow x1={295} y1={130} x2={295} y2={148} marker="ml-arrow" step={2} />
      <FlowArrow x1={295} y1={220} x2={295} y2={248} marker="ml-arrow" step={3} />
      {/* 4: features -> training */}
      <FlowArrow x1={375} y1={290} x2={423} y2={192} marker="ml-arrow" step={4} />
      {/* 5: training -> registry; metrics dashed up to MLflow */}
      <FlowArrow x1={520} y1={230} x2={520} y2={248} marker="ml-arrow" step={5} />
      <FlowArrow x1={450} y1={150} x2={450} y2={132} marker="ml-arrow" dashed label="metrics" labelDx={-30} labelDy={-2} />
      {/* 6: registry -> CI */}
      <FlowPath d="M615 285 H640 V95 H663" marker="ml-arrow" step={6} stepX={640} stepY={190} />
      {/* 7,8,9: CI/CD chain */}
      <FlowArrow x1={760} y1={130} x2={760} y2={148} marker="ml-arrow" step={7} />
      <FlowArrow x1={760} y1={210} x2={760} y2={228} marker="ml-arrow" step={8} />
      <FlowArrow x1={760} y1={300} x2={760} y2={318} marker="ml-arrow" step={9} />
      {/* 10: serving -> monitoring */}
      <FlowPath d="M855 360 H880 V90 H903" marker="ml-arrow" step={10} stepX={880} stepY={225} />
      <FlowArrow x1={980} y1={120} x2={980} y2={138} marker="ml-arrow" />
      {/* 11: drift feedback loop back to data */}
      <FlowPath
        d="M980 280 V600 H95 V465"
        marker="ml-arrow-amber"
        dashed
        color="#b45309"
        step={11}
        stepX={540}
        stepY={600}
        label="drift → retrain trigger"
        labelX={540}
        labelY={588}
      />
    </svg>
  );
}

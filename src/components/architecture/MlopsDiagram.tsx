import { ArrowMarkers, DiagramTitle, Lane, NodeBox, FlowArrow, FlowPath } from "./DiagramPrimitives";

/** MLOps production architecture — draw.io style with brand icons. */
export default function MlopsDiagram() {
  const f = "ml-soft";
  return (
    <svg viewBox="0 0 1160 680" className="min-w-[1000px] w-full" role="img" aria-label="MLOps production architecture diagram">
      <ArrowMarkers prefix="ml" />

      <DiagramTitle
        width={1160}
        title="MLOps Production Architecture"
        subtitle="Fraud / demand forecasting · data → features → train → registry → serve → observe"
      />

      <Lane x={10} y={60} w={170} h={440} label="Data Sources" tint="#eff6ff" stroke="#93c5fd" accent="#1d4ed8" />
      <Lane x={200} y={60} w={190} h={440} label="Pipelines & Features" tint="#f0fdf4" stroke="#86efac" accent="#059669" />
      <Lane x={410} y={60} w={220} h={440} label="Training & Registry" tint="#fff7ed" stroke="#fdba74" accent="#ea580c" />
      <Lane x={650} y={60} w={220} h={440} label="CI/CD & Serving" tint="#eef2ff" stroke="#c7d2fe" accent="#4338ca" />
      <Lane x={890} y={60} w={180} h={340} label="Observability" tint="#fef2f2" stroke="#fecaca" accent="#dc2626" />
      <Lane x={10} y={520} w={1060} h={90} label="Cloud & Infrastructure as Code" tint="#f8fafc" stroke="#cbd5e1" accent="#0f172a" />

      <NodeBox x={20} y={100} w={150} h={70} title="PostgreSQL" subtitle="transactions" icons={[{ slug: "postgresql" }]} accent="#336791" filterId={f} />
      <NodeBox x={20} y={185} w={150} h={70} title="Snowflake" subtitle="analytics DWH" icons={[{ slug: "snowflake" }]} accent="#29B5E8" filterId={f} />
      <NodeBox x={20} y={270} w={150} h={70} title="Kafka" subtitle="event streams" icons={[{ slug: "apachekafka" }]} accent="#231F20" filterId={f} />
      <NodeBox x={20} y={355} w={150} h={70} title="REST / Events" subtitle="app traffic" icons={[{ fallback: "AP", color: "#0ea5e9" }]} accent="#0284c7" filterId={f} />

      <NodeBox x={215} y={100} w={160} h={78} title="Airflow" subtitle="orchestration · DAGs" icons={[{ slug: "apacheairflow" }]} accent="#017CEE" filterId={f} />
      <NodeBox x={215} y={200} w={160} h={78} title="Spark" subtitle="batch & stream ETL" icons={[{ slug: "apachespark" }]} accent="#E25A1C" filterId={f} />
      <NodeBox x={215} y={300} w={160} h={88} title="Feature Store" subtitle="Feast · offline + online" icons={[{ fallback: "FS", color: "#e11d48" }, { slug: "redis" }]} accent="#e11d48" filterId={f} />

      <NodeBox x={425} y={100} w={190} h={78} title="MLflow Tracking" subtitle="experiments · metrics" icons={[{ slug: "mlflow" }]} accent="#0194E2" filterId={f} />
      <NodeBox x={425} y={200} w={190} h={88} title="Distributed Training" subtitle="Ray · K8s · NVIDIA GPUs" icons={[{ slug: "ray" }, { slug: "kubernetes" }, { slug: "nvidia" }]} accent="#028CF0" filterId={f} />
      <NodeBox x={425} y={310} w={190} h={78} title="Model Registry" subtitle="versioned · staged" icons={[{ slug: "mlflow" }]} accent="#0194E2" filterId={f} />

      <NodeBox x={665} y={100} w={190} h={72} title="GitHub Actions" subtitle="test · build · scan" icons={[{ slug: "githubactions" }]} accent="#2088FF" filterId={f} />
      <NodeBox x={665} y={190} w={190} h={64} title="Docker" subtitle="image → registry" icons={[{ slug: "docker" }]} accent="#2496ED" filterId={f} />
      <NodeBox x={665} y={275} w={190} h={72} title="ArgoCD + K8s" subtitle="GitOps sync" icons={[{ slug: "argo" }, { slug: "kubernetes" }]} accent="#EF7B4D" filterId={f} />
      <NodeBox x={665} y={365} w={190} h={88} title="Model Serving" subtitle="KServe · vLLM · NGINX" icons={[{ slug: "vllm" }, { slug: "fastapi" }, { slug: "nginx" }]} accent="#009639" filterId={f} />

      <NodeBox x={905} y={100} w={150} h={68} title="Prometheus" subtitle="metrics scrape" icons={[{ slug: "prometheus" }]} accent="#E6522C" filterId={f} />
      <NodeBox x={905} y={185} w={150} h={68} title="Grafana" subtitle="dashboards · alerts" icons={[{ slug: "grafana" }]} accent="#F46800" filterId={f} />
      <NodeBox x={905} y={270} w={150} h={68} title="Evidently" subtitle="data & model drift" icons={[{ fallback: "EV", color: "#f59e0b" }]} accent="#d97706" filterId={f} />

      <NodeBox x={40} y={556} w={220} h={42} title="Terraform" icons={[{ slug: "terraform" }]} accent="#7B42BC" filterId={f} />
      <NodeBox x={300} y={556} w={220} h={42} title="AWS" icons={[{ fallback: "AW", color: "#FF9900" }]} accent="#FF9900" filterId={f} />
      <NodeBox x={560} y={556} w={220} h={42} title="Google Cloud" icons={[{ slug: "googlecloud" }]} accent="#4285F4" filterId={f} />
      <text x={820} y={582} fontSize={11} fill="#64748b">EKS / GKE · S3 / GCS · IAM</text>

      <FlowArrow x1={170} y1={135} x2={213} y2={130} marker="ml-arrow" />
      <FlowArrow x1={170} y1={220} x2={213} y2={145} marker="ml-arrow" step={1} />
      <FlowArrow x1={170} y1={305} x2={213} y2={155} marker="ml-arrow" />
      <FlowArrow x1={170} y1={390} x2={213} y2={160} marker="ml-arrow" />
      <FlowArrow x1={295} y1={178} x2={295} y2={198} marker="ml-arrow" step={2} />
      <FlowArrow x1={295} y1={278} x2={295} y2={298} marker="ml-arrow" step={3} />
      <FlowArrow x1={375} y1={344} x2={423} y2={244} marker="ml-arrow" step={4} />
      <FlowArrow x1={520} y1={288} x2={520} y2={308} marker="ml-arrow" step={5} />
      <FlowArrow x1={450} y1={200} x2={450} y2={180} marker="ml-arrow" dashed label="metrics" labelDx={-28} />
      <FlowPath d="M615 349 H640 V136 H663" marker="ml-arrow" step={6} stepX={640} stepY={240} />
      <FlowArrow x1={760} y1={172} x2={760} y2={188} marker="ml-arrow" step={7} />
      <FlowArrow x1={760} y1={254} x2={760} y2={273} marker="ml-arrow" step={8} />
      <FlowArrow x1={760} y1={347} x2={760} y2={363} marker="ml-arrow" step={9} />
      <FlowPath d="M855 409 H880 V134 H903" marker="ml-arrow" step={10} stepX={880} stepY={270} />
      <FlowArrow x1={980} y1={168} x2={980} y2={183} marker="ml-arrow" />
      <FlowPath
        d="M980 338 V640 H95 V505"
        marker="ml-arrow-amber"
        dashed
        color="#b45309"
        step={11}
        stepX={540}
        stepY={640}
        label="drift → retrain trigger"
        labelX={540}
        labelY={628}
      />
    </svg>
  );
}

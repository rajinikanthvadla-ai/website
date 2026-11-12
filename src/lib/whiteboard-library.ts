/**
 * Teaching stencils for the class whiteboard (Excalidraw library).
 * Labeled cards inspired by draw.io / Azure / AWS / K8s shapes — native Excalidraw
 * elements so they work offline without redistributing vendor icon binaries.
 */

type LibRect = {
  id: string;
  label: string;
  color: string;
  w?: number;
  h?: number;
};

function stamp(seed: string) {
  // Stable-ish ids so library reloads do not thrash local cache keys.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0");
}

function card({ id, label, color, w = 160, h = 72 }: LibRect) {
  const rid = `rect-${id}`;
  const tid = `text-${id}`;
  const created = 1_700_000_000_000;
  return {
    id: `lib-${id}`,
    status: "published" as const,
    created,
    name: label,
    elements: [
      {
        type: "rectangle",
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        id: rid,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        angle: 0,
        x: 0,
        y: 0,
        strokeColor: color,
        backgroundColor: `${color}22`,
        width: w,
        height: h,
        seed: parseInt(stamp(id), 16) % 2_000_000_000,
        groupIds: [`g-${id}`],
        frameId: null,
        roundness: { type: 3 },
        boundElements: [{ type: "text", id: tid }],
        updated: created,
        link: null,
        locked: false,
      },
      {
        type: "text",
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        id: tid,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        angle: 0,
        x: 10,
        y: h / 2 - 14,
        strokeColor: "#0f172a",
        backgroundColor: "transparent",
        width: w - 20,
        height: 28,
        seed: (parseInt(stamp(id), 16) + 7) % 2_000_000_000,
        groupIds: [`g-${id}`],
        frameId: null,
        roundness: null,
        boundElements: null,
        updated: created,
        link: null,
        locked: false,
        fontSize: 18,
        fontFamily: 1,
        text: label,
        textAlign: "center",
        verticalAlign: "middle",
        containerId: rid,
        originalText: label,
        lineHeight: 1.25,
        baseline: 18,
      },
    ],
  };
}

const AZURE = "#0078d4";
const AWS = "#ff9900";
const GCP = "#4285f4";
const K8S = "#326ce5";
const DOCKER = "#2496ed";
const DATA = "#0f766e";
const AI = "#ea580c";
const INK = "#0f172a";

/** Preloaded library shown in the Excalidraw library panel. */
export const TEACHING_LIBRARY = [
  // Azure-style
  card({ id: "az-func", label: "Azure Functions", color: AZURE }),
  card({ id: "az-aks", label: "AKS", color: AZURE, w: 120 }),
  card({ id: "az-blob", label: "Blob Storage", color: AZURE }),
  card({ id: "az-kv", label: "Key Vault", color: AZURE, w: 140 }),
  card({ id: "az-openai", label: "Azure OpenAI", color: AZURE }),
  card({ id: "az-sb", label: "Service Bus", color: AZURE }),
  card({ id: "az-appgw", label: "App Gateway", color: AZURE }),
  // AWS-style
  card({ id: "aws-eks", label: "EKS", color: AWS, w: 120 }),
  card({ id: "aws-lambda", label: "Lambda", color: AWS, w: 130 }),
  card({ id: "aws-s3", label: "S3", color: AWS, w: 100 }),
  card({ id: "aws-bedrock", label: "Bedrock", color: AWS, w: 130 }),
  card({ id: "aws-sqs", label: "SQS", color: AWS, w: 110 }),
  // GCP
  card({ id: "gcp-gke", label: "GKE", color: GCP, w: 110 }),
  card({ id: "gcp-run", label: "Cloud Run", color: GCP, w: 140 }),
  // Platform
  card({ id: "k8s", label: "Kubernetes", color: K8S }),
  card({ id: "docker", label: "Docker", color: DOCKER, w: 130 }),
  card({ id: "nginx", label: "Nginx / Ingress", color: INK }),
  card({ id: "redis", label: "Redis", color: "#dc2626", w: 120 }),
  card({ id: "postgres", label: "Postgres", color: DATA, w: 140 }),
  card({ id: "vector", label: "Vector DB", color: DATA, w: 140 }),
  card({ id: "kafka", label: "Kafka", color: INK, w: 120 }),
  // AI / agents
  card({ id: "llm", label: "LLM API", color: AI, w: 130 }),
  card({ id: "rag", label: "RAG", color: AI, w: 110 }),
  card({ id: "agent", label: "AI Agent", color: AI, w: 130 }),
  card({ id: "mcp", label: "MCP Tool", color: AI, w: 130 }),
  card({ id: "gpu", label: "GPU Node", color: "#7c3aed", w: 130 }),
  card({ id: "mlflow", label: "MLflow", color: "#0194e2", w: 130 }),
  card({ id: "monitor", label: "Monitor / Alert", color: "#b45309" }),
  card({ id: "human", label: "Human approve", color: "#15803d" }),
  card({ id: "user", label: "User / Client", color: INK, w: 140 }),
];

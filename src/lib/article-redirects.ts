/**
 * Blog URLs that repeat one topic. The body was removed from articles.json.
 * The slug still builds a noindex page that refreshes to `canonicalSlug`.
 * Machine suffixes (`-moicyegk`) came from Date.now().toString(36) in scripts/generate-article.js.
 */
export const ARTICLE_REDIRECTS: Record<string, string> = {
  "spec-driven-development-ai-2026": "spec-driven-development-ai-2027",
  "physical-ai-2026": "physical-ai-2027",
  "kubernetes-cloud-native-ai-ml-deployment-trends-2026-moicyegk":
    "kubernetes-cloud-native-ai-ml-deployment-trends-2026",
  "kubernetes-cloud-native-ai-ml-deployment-trends-2026-mocmdoxh":
    "kubernetes-cloud-native-ai-ml-deployment-trends-2026",
  "kubernetes-cloud-native-ai-ml-trends-2026":
    "kubernetes-cloud-native-ai-ml-deployment-trends-2026",
  "vector-databases-embedding-technologies-guide-2026-mo8bl0g5":
    "vector-database-embeddings-update-2026",
  "vector-databases-embedding-technologies-guide-2026":
    "vector-database-embeddings-update-2026",
  "enterprise-ai-adoption-trends-challenges-2026-mofg2kga":
    "enterprise-ai-adoption-trends-challenges-2026",
  "autonomous-ai-agents-breakthroughs-2026":
    "latest-breakthroughs-ai-agents-autonomous-systems-2026",
  "breakthroughs-ai-agents-autonomous-systems-2026":
    "latest-breakthroughs-ai-agents-autonomous-systems-2026",
  "langchain-rag-advancements-guide-2026":
    "mastering-langchain-rag-systems-advancements-2026",
  "mastering-aiops-infrastructure-management-2026":
    "aiops-innovations-infrastructure-management-2026",
};

/** Rajinikanth Vadla · AI Labs catalog. Expand tracks/cards over time. */

export const AI_LABS_GITHUB_REPO = "rajinikanthvadla-ai/website";
export const AI_LABS_GITHUB_BRANCH = "main";

export type AiLabStatus = "live" | "soon";

export type AiLabCard = {
  id: string;
  title: string;
  blurb: string;
  status: AiLabStatus;
  /** Path inside the GitHub repo, e.g. labs/llm/01-getting-started.ipynb */
  notebookPath?: string;
  tags: string[];
};

export type AiLabTrack = {
  id: string;
  title: string;
  blurb: string;
  cards: AiLabCard[];
};

export const AI_LABS = {
  brand: "Rajinikanth Vadla",
  product: "AI Labs",
  path: "/ai-labs/",
  tagline: "Practice LLM workflows in your own Colab — branded hub on this site, compute on Google.",
} as const;

export const AI_LAB_TRACKS: AiLabTrack[] = [
  {
    id: "llm",
    title: "LLM Labs",
    blurb:
      "Prompt structure, evals, and agent-ready patterns. Start with Notebook — sign in with your Google account and run on Colab.",
    cards: [
      {
        id: "notebook",
        title: "Notebook",
        blurb:
          "Open a branded starter notebook in Google Colab. You log in with your Gmail; the runtime is yours. Come back here for the next lab.",
        status: "live",
        notebookPath: "labs/llm/01-getting-started.ipynb",
        tags: ["Colab", "Prompts", "Python"],
      },
      {
        id: "evals",
        title: "Evals desk",
        blurb: "Score model answers against a rubric — coming next.",
        status: "soon",
        tags: ["Evals", "Quality"],
      },
      {
        id: "agents",
        title: "Agent sandbox",
        blurb: "Tool-calling loops for customer workflows — planned after Notebook.",
        status: "soon",
        tags: ["Agents", "Tools"],
      },
    ],
  },
];

export function colabUrlForNotebook(notebookPath: string): string {
  const encoded = notebookPath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `https://colab.research.google.com/github/${AI_LABS_GITHUB_REPO}/blob/${AI_LABS_GITHUB_BRANCH}/${encoded}`;
}

export function githubUrlForNotebook(notebookPath: string): string {
  return `https://github.com/${AI_LABS_GITHUB_REPO}/blob/${AI_LABS_GITHUB_BRANCH}/${notebookPath}`;
}

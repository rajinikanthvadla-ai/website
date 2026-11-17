import type { PythonModuleId } from "./types";

/** Short names for breadcrumbs and progress. Safe to import from client components. */
export const MODULE_SHORT_LABEL: Record<PythonModuleId, string> = {
  foundations: "Foundations",
  "core-language": "Core language",
  "data-ml": "Data and ML",
  "genai-production": "GenAI and production",
  reference: "Quick reference",
};

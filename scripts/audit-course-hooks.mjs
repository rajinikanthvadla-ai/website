import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const courseDir = join(root, "src/lib/python-course");
const lessonFiles = readdirSync(courseDir).filter(
  (name) => name.startsWith("module-") || name === "projects.ts",
);

const slugs = [];
for (const name of lessonFiles) {
  const text = readFileSync(join(courseDir, name), "utf8");
  for (const match of text.matchAll(/slug:\s*"([^"]+)"/g)) slugs.push(match[1]);
}

const quizzes = JSON.parse(readFileSync(join(courseDir, "quiz-bank.json"), "utf8"));
const quizSlugs = new Set(quizzes.map((quiz) => quiz.slug));
const memoryText = readFileSync(join(courseDir, "memory.ts"), "utf8");
const sceneText = readFileSync(join(courseDir, "scenes.ts"), "utf8");
const memorySlugs = new Set([...memoryText.matchAll(/"([a-z0-9-]+)":\s*\{/g)].map((match) => match[1]));
const sceneSlugs = new Set([...sceneText.matchAll(/"([a-z0-9-]+)":\s*"/g)].map((match) => match[1]));

const problems = [];
if (new Set(slugs).size !== slugs.length) problems.push("duplicate lesson slug");
for (const slug of slugs) {
  if (!quizSlugs.has(slug)) problems.push(`missing quiz ${slug}`);
  if (!memorySlugs.has(slug)) problems.push(`missing memory ${slug}`);
  if (!sceneSlugs.has(slug)) problems.push(`missing scene ${slug}`);
}
for (const slug of quizSlugs) {
  if (!slugs.includes(slug)) problems.push(`extra quiz ${slug}`);
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify({
    lessons: slugs.length,
    quizzes: quizSlugs.size,
    memory: memorySlugs.size,
    scenes: sceneSlugs.size,
  }),
);

/**
 * Runs every code snippet in the Python course through a real Pyodide runtime
 * so a broken example is caught before it reaches a learner.
 *
 * Usage: node scripts/verify-python-snippets.mjs [slug-filter]
 * Requires pyodide installed somewhere resolvable via PYODIDE_PATH.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const COURSE_DIR = path.resolve("src/lib/python-course");
const PYODIDE_PATH = process.env.PYODIDE_PATH || "pyodide";
const filter = process.argv[2] || "";

// Examples that intentionally cannot run here: they need a network, a GPU, or
// packages that have no WebAssembly build.
const LOCAL_ONLY_MARKERS = [
  "pip install",
  "import torch",
  "import openai",
  "from openai",
  "import fastapi",
  "from fastapi",
  "import psycopg",
  "import requests",
  "import httpx",
  "uvicorn",
  "import anthropic",
  "from myproject",
];

const require = createRequire(path.join(process.cwd(), "noop.js"));
const { loadPyodide } = require(PYODIDE_PATH);

function extractSnippets(source, file) {
  const snippets = [];
  let currentSlug = "unknown";
  let currentTitle = "";

  const lines = source.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const slugMatch = lines[i].match(/^\s*slug:\s*"([^"]+)"/);
    if (slugMatch) currentSlug = slugMatch[1];

    const titleMatch = lines[i].match(/^\s*title:\s*"(.*)"/);
    if (titleMatch) currentTitle = titleMatch[1];

    const openMatch = lines[i].match(/^\s*(code|starter):\s*`(.*)$/);
    if (!openMatch) continue;

    const kind = openMatch[1];
    const body = [openMatch[2]];
    let j = i;
    while (j + 1 < lines.length && !/`,\s*$/.test(lines[j])) {
      j += 1;
      body.push(lines[j]);
    }
    let raw = body.join("\n").replace(/`,\s*$/, "");
    // The lesson files are TypeScript template literals.
    raw = raw.replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\\/g, "\\");

    snippets.push({ file, slug: currentSlug, title: currentTitle, kind, code: raw });
    i = j;
  }
  return snippets;
}

function isLocalOnly(code) {
  return LOCAL_ONLY_MARKERS.some((marker) => code.includes(marker));
}

async function main() {
  const files = (await readdir(COURSE_DIR)).filter(
    (f) => f.startsWith("module-") && f.endsWith(".ts"),
  );

  const snippets = [];
  for (const file of files.sort()) {
    const source = await readFile(path.join(COURSE_DIR, file), "utf8");
    snippets.push(...extractSnippets(source, file));
  }

  const targets = snippets.filter((s) => !filter || s.slug.includes(filter));
  console.log(`extracted ${snippets.length} snippets, running ${targets.length}\n`);

  const pyodide = await loadPyodide();
  await pyodide.runPythonAsync(`
import builtins, os
os.environ["MPLBACKEND"] = "AGG"
def _blocked_input(prompt=""):
    raise RuntimeError("input() is not available in the on-site compiler.")
builtins.input = _blocked_input
`);

  const failures = [];
  let skipped = 0;
  let passed = 0;

  for (const snippet of targets) {
    const label = `${snippet.slug} :: ${snippet.kind}`;
    if (isLocalOnly(snippet.code)) {
      skipped += 1;
      console.log(`SKIP  ${label} (local-only example)`);
      continue;
    }

    let stdout = "";
    let stderr = "";
    pyodide.setStdout({ batched: (t) => (stdout += `${t}\n`) });
    pyodide.setStderr({ batched: (t) => (stderr += `${t}\n`) });

    try {
      await pyodide.loadPackagesFromImports(snippet.code);
      await pyodide.runPythonAsync(snippet.code);
      // Reset matplotlib state so figures do not leak between snippets.
      await pyodide.runPythonAsync(
        'import sys\nplt = sys.modules.get("matplotlib.pyplot")\nif plt is not None:\n    plt.close("all")\n',
      );
      passed += 1;
      const preview = stdout.trim().split("\n")[0] || "(no stdout)";
      console.log(`PASS  ${label} — ${preview.slice(0, 70)}`);
    } catch (err) {
      failures.push({ ...snippet, error: String(err).split("\n").slice(-6).join("\n") });
      console.log(`FAIL  ${label}`);
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`passed ${passed} | failed ${failures.length} | skipped ${skipped}`);

  if (failures.length) {
    console.log(`\n${"=".repeat(60)}\nFAILURES\n`);
    for (const f of failures) {
      console.log(`--- ${f.file} :: ${f.slug} :: ${f.kind}`);
      console.log(f.error);
      console.log("");
    }
    process.exitCode = 1;
  }
}

main();

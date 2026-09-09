const fs = require("fs");
const files = fs
  .readdirSync("src/lib/python-course")
  .filter((f) => f.startsWith("module") && f.endsWith(".ts"));

function balanced(code) {
  let p = 0;
  let k = 0;
  let c = 0;
  let q = null;
  let t = null;
  let esc = false;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    const n2 = code.slice(i, i + 3);
    if (t) {
      if (n2 === t) {
        i += 2;
        t = null;
      }
      continue;
    }
    if (q) {
      if (esc) {
        esc = false;
        continue;
      }
      if (ch === "\\") {
        esc = true;
        continue;
      }
      if (ch === q) q = null;
      continue;
    }
    if (n2 === '"""' || n2 === "'''") {
      t = n2;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      q = ch;
      continue;
    }
    if (ch === "(") p++;
    else if (ch === ")") p--;
    else if (ch === "[") k++;
    else if (ch === "]") k--;
    else if (ch === "{") c++;
    else if (ch === "}") c--;
    if (p < 0 || k < 0 || c < 0) return false;
  }
  return p === 0 && k === 0 && c === 0 && !q && !t;
}

let lessons = 0;
let missingBasic = 0;
let badBasic = 0;
let nonAimlExampleTitles = 0;

for (const f of files) {
  const src = fs.readFileSync("src/lib/python-course/" + f, "utf8");
  const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  for (const slug of slugs) {
    lessons++;
    const i = src.indexOf('slug: "' + slug + '"');
    const next = slugs[slugs.indexOf(slug) + 1];
    const j = next ? src.indexOf('slug: "' + next + '"') : src.length;
    const chunk = src.slice(i, j);
    const sections = (chunk.match(/heading:/g) || []).length;
    const basics = [...chunk.matchAll(/basicCode:\s*`([\s\S]*?)`/g)].map((m) => m[1]);
    if (basics.length < sections) {
      missingBasic++;
      console.log("missing basic", slug, basics.length + "/" + sections);
    }
    for (const b of basics) {
      if (!balanced(b)) {
        badBasic++;
        console.log("bad basic", slug);
      }
    }
    const exBlock = chunk.split(/examples:\s*\[/)[1] || "";
    const exTitles = [...exBlock.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
    for (const title of exTitles) {
      if (!title.startsWith("AI / ML:")) {
        nonAimlExampleTitles++;
        console.log("example title", slug, title);
      }
    }
  }
}

console.log({ lessons, missingBasic, badBasic, nonAimlExampleTitles });

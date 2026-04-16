import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const name of [".next", "out"]) {
  const dir = path.join(root, name);
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed ${name}`);
  } catch (e) {
    console.warn(`Could not fully remove ${name}:`, e?.message || e);
    process.exitCode = 1;
  }
}

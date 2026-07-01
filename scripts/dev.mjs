import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function killPort3000() {
  const isWin = process.platform === "win32";
  try {
    if (isWin) {
      const out = execSync('netstat -ano | findstr ":3000"', { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
      const pids = new Set();
      for (const line of out.split("\n")) {
        if (!line.includes("LISTENING")) continue;
        const pid = line.trim().split(/\s+/).pop();
        if (pid && pid !== "0") pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          console.log(`Stopped process on port 3000 (PID ${pid})`);
        } catch {
          /* already gone */
        }
      }
    } else {
      execSync("lsof -ti :3000 | xargs -r kill -9", { stdio: "ignore" });
    }
  } catch {
    /* nothing listening */
  }
}

for (const name of [".next", "out"]) {
  const dir = path.join(root, name);
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed ${name}`);
  } catch (e) {
    console.warn(`Could not fully remove ${name}:`, e?.message || e);
  }
}

killPort3000();

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "dev"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));

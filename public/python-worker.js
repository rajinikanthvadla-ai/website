/* Browser Python runtime via Pyodide (CPython compiled to WebAssembly). */
/* global loadPyodide */

importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js");

const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

let pyodide = null;
const loadedPackages = new Set();

async function ensurePyodide() {
  if (pyodide) return pyodide;
  self.postMessage({ type: "status", message: "Loading Python runtime in your browser…" });
  pyodide = await loadPyodide({ indexURL: INDEX_URL });
  await pyodide.runPythonAsync(`
import builtins

def _blocked_input(prompt=""):
    raise RuntimeError(
        "input() is not available in the on-site compiler. "
        "Assign values directly in the code, then press Run."
    )

builtins.input = _blocked_input
`);
  return pyodide;
}

self.onmessage = async (event) => {
  const { id, code, packages = [] } = event.data || {};
  if (!id || typeof code !== "string") {
    return;
  }

  try {
    const runtime = await ensurePyodide();
    const needed = packages.filter((name) => !loadedPackages.has(name));
    if (needed.length) {
      self.postMessage({
        type: "status",
        message: `Loading packages: ${needed.join(", ")} (first time only)…`,
      });
      await runtime.loadPackage(needed);
      needed.forEach((name) => loadedPackages.add(name));
    }

    let stdout = "";
    let stderr = "";
    runtime.setStdout({
      batched: (text) => {
        stdout += text.endsWith("\n") ? text : `${text}\n`;
      },
    });
    runtime.setStderr({
      batched: (text) => {
        stderr += text.endsWith("\n") ? text : `${text}\n`;
      },
    });

    const result = await runtime.runPythonAsync(code);
    let resultText = "";
    if (result !== undefined && result !== null) {
      try {
        resultText = String(result);
      } catch {
        resultText = "";
      }
      if (typeof result === "object" && result && "destroy" in result && typeof result.destroy === "function") {
        result.destroy();
      }
    }

    self.postMessage({
      id,
      type: "result",
      ok: true,
      stdout,
      stderr,
      result: resultText === "undefined" || resultText === "None" ? "" : resultText,
    });
  } catch (err) {
    const message = err && typeof err === "object" && "message" in err ? String(err.message) : String(err);
    self.postMessage({
      id,
      type: "result",
      ok: false,
      error: message,
    });
  }
};

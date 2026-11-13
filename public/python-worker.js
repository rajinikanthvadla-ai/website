/* Browser Python runtime via Pyodide (CPython compiled to WebAssembly). */
/* global loadPyodide */

importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js");

const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

let pyodide = null;
const loadedPackages = new Set();

// Lessons list the modules they use, but several of those ship with CPython and
// are not downloadable Pyodide packages. Asking for them would abort the run.
const STDLIB_MODULES = new Set([
  "sqlite3",
  "json",
  "os",
  "sys",
  "re",
  "math",
  "random",
  "datetime",
  "collections",
  "itertools",
  "functools",
  "pathlib",
  "csv",
  "typing",
  "dataclasses",
  "asyncio",
  "logging",
  "unittest",
  "statistics",
  "decimal",
  "hashlib",
  "uuid",
  "time",
]);

// Matplotlib's default Pyodide backend needs a DOM canvas, which a worker has no
// access to. AGG renders off-screen so figures can be shipped back as PNGs.
const SETUP = `
import builtins
import os

os.environ["MPLBACKEND"] = "AGG"

def _blocked_input(prompt=""):
    raise RuntimeError(
        "input() is not available in the on-site compiler. "
        "Assign values directly in the code, then press Run."
    )

builtins.input = _blocked_input

def _new_namespace():
    return {"__name__": "__main__"}

def _run_check(ns, check_src, printed, source):
    # Same rules as scripts/check-python-exercises.mjs, keep them in sync.
    scope = dict(ns)
    scope["printed"] = printed
    scope["source"] = source
    try:
        exec(check_src, scope)
    except AssertionError as err:
        return "FAIL:" + (str(err) or "Not quite yet. Read the task again and compare your output.")
    except NameError as err:
        return "FAIL:" + str(err) + ". Create it in your code first."
    except Exception as err:
        return "FAIL:" + type(err).__name__ + ": " + str(err)
    return "PASS"

def _collect_figures():
    import sys
    plt = sys.modules.get("matplotlib.pyplot")
    if plt is None:
        return []
    import base64
    import io
    images = []
    for num in plt.get_fignums():
        figure = plt.figure(num)
        buffer = io.BytesIO()
        try:
            figure.savefig(buffer, format="png", dpi=100, bbox_inches="tight")
        except Exception:
            continue
        images.append(base64.b64encode(buffer.getvalue()).decode("ascii"))
    plt.close("all")
    return images
`;

async function ensurePyodide() {
  if (pyodide) return pyodide;
  self.postMessage({ type: "status", message: "Loading Python runtime in your browser…" });
  pyodide = await loadPyodide({ indexURL: INDEX_URL });
  await pyodide.runPythonAsync(SETUP);
  return pyodide;
}

function collectFigures(runtime) {
  try {
    const proxy = runtime.globals.get("_collect_figures")();
    const images = proxy.toJs();
    proxy.destroy();
    return images;
  } catch {
    return [];
  }
}

self.onmessage = async (event) => {
  const { id, code, packages = [], check } = event.data || {};
  if (!id || typeof code !== "string") {
    return;
  }
  const checking = typeof check === "string" && check.trim().length > 0;
  let namespace = null;

  try {
    const runtime = await ensurePyodide();
    const needed = packages.filter(
      (name) => !loadedPackages.has(name) && !STDLIB_MODULES.has(name),
    );
    if (needed.length) {
      self.postMessage({
        type: "status",
        message: `Loading packages: ${needed.join(", ")} (first time only)…`,
      });
      try {
        await runtime.loadPackage(needed);
      } catch {
        // An unknown name must not abort the run; the import below will report it.
      }
      needed.forEach((name) => loadedPackages.add(name));
    }

    // Examples can import more than the lesson declared, so resolve from the code too.
    self.postMessage({ type: "status", message: "Preparing packages…" });
    try {
      await runtime.loadPackagesFromImports(checking ? `${code}\n${check}` : code);
    } catch {
      // Ignore: unresolvable imports surface as a normal Python ImportError.
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
        // Matplotlib's first-run cache notice is runtime noise, not the learner's output.
        if (text.includes("Matplotlib is building the font cache")) return;
        stderr += text.endsWith("\n") ? text : `${text}\n`;
      },
    });

    self.postMessage({ type: "status", message: "Running…" });
    // Exercises run in a fresh namespace so old variables from earlier runs cannot pass a check.
    if (checking) {
      const makeNamespace = runtime.globals.get("_new_namespace");
      namespace = makeNamespace();
      makeNamespace.destroy();
    }
    const result = await runtime.runPythonAsync(code, namespace ? { globals: namespace } : undefined);
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

    let checkResult;
    if (checking && namespace) {
      const runCheck = runtime.globals.get("_run_check");
      const verdict = String(runCheck(namespace, check, stdout, code));
      runCheck.destroy();
      checkResult = verdict === "PASS"
        ? { passed: true, message: "" }
        : { passed: false, message: verdict.replace(/^FAIL:/, "") };
    }

    self.postMessage({
      id,
      type: "result",
      ok: true,
      stdout,
      stderr,
      images: collectFigures(runtime),
      result: resultText === "undefined" || resultText === "None" ? "" : resultText,
      check: checkResult,
    });
  } catch (err) {
    const message = err && typeof err === "object" && "message" in err ? String(err.message) : String(err);
    self.postMessage({
      id,
      type: "result",
      ok: false,
      images: pyodide ? collectFigures(pyodide) : [],
      error: message,
    });
  } finally {
    if (namespace) {
      try {
        namespace.destroy();
      } catch {
        // already released
      }
    }
  }
};

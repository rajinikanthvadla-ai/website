/**
 * Proves every Python course exercise and daily challenge is fair:
 *   - the starter code must NOT pass its check (otherwise learners pass without trying)
 *   - the solution MUST pass its check (otherwise the exercise is impossible)
 *
 * Usage: npm run check:python   (or: node scripts/check-python-exercises.mjs [filter])
 * Needs a local Python 3 with numpy, pandas, scikit-learn and matplotlib.
 * The checks run with the same rules as public/python-worker.js (`printed`, `source`,
 * a fresh namespace with __name__ == "__main__", top-level await allowed).
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createJiti } from "jiti";

const filter = process.argv[2] || "";
const jiti = createJiti(import.meta.url);
const course = await jiti.import(path.resolve("src/lib/python-course/index.ts"));

const cases = [];
for (const lesson of course.PYTHON_LESSONS) {
  if (!lesson.exercise) {
    cases.push({ id: lesson.slug, missing: true });
    continue;
  }
  cases.push({ id: lesson.slug, ...lesson.exercise });
}
for (const challenge of course.DAILY_CHALLENGES) {
  if (!challenge.check) {
    cases.push({ id: `challenge:${challenge.id}`, missing: true });
    continue;
  }
  cases.push({ id: `challenge:${challenge.id}`, starter: challenge.starter, check: challenge.check, solution: challenge.solution });
}
const selected = cases.filter((item) => item.id.includes(filter));

const RUNNER = String.raw`
import ast, asyncio, contextlib, io, json, os, sys, tempfile, time
os.environ["MPLBACKEND"] = "AGG"

def run(code, check):
    try:
        import matplotlib.pyplot as plt
        plt.close("all")
    except Exception:
        pass
    old_cwd = os.getcwd()
    os.chdir(tempfile.mkdtemp())
    ns = {"__name__": "__main__"}
    out = io.StringIO()
    started = time.perf_counter()
    try:
        try:
            with contextlib.redirect_stdout(out):
                compiled = compile(code, "<lesson>", "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
                result = eval(compiled, ns)
                if asyncio.iscoroutine(result):
                    asyncio.run(result)
        except BaseException as err:
            return "ERROR", f"{type(err).__name__}: {err}", time.perf_counter() - started
        scope = dict(ns)
        scope["printed"] = out.getvalue()
        scope["source"] = code
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                exec(check, scope)
        except AssertionError as err:
            return "FAIL", str(err), time.perf_counter() - started
        except NameError as err:
            return "FAIL", f"{err}. Create it in your code first.", time.perf_counter() - started
        except Exception as err:
            return "FAIL", f"{type(err).__name__}: {err}", time.perf_counter() - started
        return "PASS", "", time.perf_counter() - started
    finally:
        os.chdir(old_cwd)

cases = json.load(open(sys.argv[1], encoding="utf-8"))
problems = 0
for case in cases:
    if case.get("missing"):
        print(f"MISSING  {case['id']}: no exercise or check")
        problems += 1
        continue
    s_status, s_msg, _ = run(case["starter"], case["check"])
    a_status, a_msg, a_time = run(case["solution"], case["check"])
    ok = s_status != "PASS" and a_status == "PASS" and a_time < 15
    if not ok:
        problems += 1
    mark = "ok  " if ok else "BAD "
    print(f"{mark} {case['id']:<45} starter={s_status:<5} solution={a_status:<5} {a_time:5.2f}s")
    if s_status == "PASS":
        print("       starter passes the check: learners could pass without doing anything")
    if a_status != "PASS":
        print(f"       solution: {a_msg}")
    if ok and s_status == "FAIL":
        print(f"       starter hint: {s_msg[:140]}")
print(f"\n{len(cases)} checked, {problems} problem(s)")
sys.exit(1 if problems else 0)
`;

const dir = mkdtempSync(path.join(tmpdir(), "py-exercises-"));
const casesFile = path.join(dir, "cases.json");
const runnerFile = path.join(dir, "runner.py");
writeFileSync(casesFile, JSON.stringify(selected));
writeFileSync(runnerFile, RUNNER);

const python = process.env.PYTHON || (process.platform === "win32" ? "python" : "python3");
const result = spawnSync(python, [runnerFile, casesFile], { stdio: "inherit" });
process.exit(result.status ?? 1);

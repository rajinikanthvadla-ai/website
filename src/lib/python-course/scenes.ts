export type BoxesVisual = {
  type: "boxes";
  boxes: { name: string; value: string; hot?: boolean }[];
};

export type TrayVisual = {
  type: "tray";
  items: string[];
  hot?: number;
  counter?: string;
};

export type ForkVisual = {
  type: "fork";
  condition: string;
  taken?: "keep" | "drop";
};

export type MachineVisual = {
  type: "machine";
  input: string;
  output: string;
  phase: "wait" | "in" | "work" | "out";
  label: string;
};

export type LockersVisual = {
  type: "lockers";
  rows: { key: string; value: string; open?: boolean }[];
};

export type LinesVisual = {
  type: "lines";
  lines: string[];
  hot?: number;
  output?: string;
};

export type FlowVisual = {
  type: "flow";
  nodes: { label: string; hot?: boolean }[];
};

export type SceneVisual =
  | BoxesVisual
  | TrayVisual
  | ForkVisual
  | MachineVisual
  | LockersVisual
  | LinesVisual
  | FlowVisual;

export type SceneStep = {
  caption: string;
  visual: SceneVisual;
};

export type Scene = {
  id: string;
  title: string;
  blurb: string;
  steps: SceneStep[];
};

const lines: Scene = {
  id: "lines",
  title: "Watch the lines run",
  blurb: "Python starts at the top and walks down. Press Play, or Step one line at a time.",
  steps: [
    {
      caption: "Nothing has run yet. The file is waiting.",
      visual: { type: "lines", lines: ['print("Hello")', "print(2 + 2)"], hot: -1 },
    },
    {
      caption: "Line 1 runs. print shows Hello.",
      visual: { type: "lines", lines: ['print("Hello")', "print(2 + 2)"], hot: 0, output: "Hello" },
    },
    {
      caption: "Line 2 runs. 2 + 2 is 4, and print shows it.",
      visual: { type: "lines", lines: ['print("Hello")', "print(2 + 2)"], hot: 1, output: "Hello\n4" },
    },
  ],
};

const indent: Scene = {
  id: "indent",
  title: "Watch the indent",
  blurb: "The indented line belongs to the if. The last line always runs.",
  steps: [
    {
      caption: "score is 0.9. Python reaches the if.",
      visual: { type: "lines", lines: ["score = 0.9", "if score > 0.7:", "    print(\"keep\")", "print(\"done\")"], hot: 1 },
    },
    {
      caption: "0.9 is greater than 0.7, so the indented line runs.",
      visual: { type: "lines", lines: ["score = 0.9", "if score > 0.7:", "    print(\"keep\")", "print(\"done\")"], hot: 2, output: "keep" },
    },
    {
      caption: "print(\"done\") is not indented, so it runs either way.",
      visual: { type: "lines", lines: ["score = 0.9", "if score > 0.7:", "    print(\"keep\")", "print(\"done\")"], hot: 3, output: "keep\ndone" },
    },
  ],
};

const boxes: Scene = {
  id: "boxes",
  title: "Watch the boxes",
  blurb: "A variable is a labeled box. Press Play and watch the value land inside.",
  steps: [
    {
      caption: "The boxes are empty. No names yet.",
      visual: { type: "boxes", boxes: [{ name: "score", value: "..." }, { name: "kind", value: "..." }] },
    },
    {
      caption: "score = 0.91 puts the number in the box named score.",
      visual: { type: "boxes", boxes: [{ name: "score", value: "0.91", hot: true }, { name: "kind", value: "..." }] },
    },
    {
      caption: "type(score) looks in the box. 0.91 is a float.",
      visual: { type: "boxes", boxes: [{ name: "score", value: "0.91" }, { name: "kind", value: "float", hot: true }] },
    },
  ],
};

const cast: Scene = {
  id: "cast",
  title: "Watch a string become a number",
  blurb: "Text and numbers are different boxes. float() copies the text into a real number.",
  steps: [
    {
      caption: "raw holds the text \"0.2\", quotes and all.",
      visual: { type: "boxes", boxes: [{ name: "raw", value: "\"0.2\"", hot: true }, { name: "temperature", value: "..." }] },
    },
    {
      caption: "float(raw) reads the text and makes a number.",
      visual: { type: "boxes", boxes: [{ name: "raw", value: "\"0.2\"" }, { name: "temperature", value: "0.2", hot: true }] },
    },
    {
      caption: "The text box is unchanged. The new box holds a float.",
      visual: { type: "boxes", boxes: [{ name: "raw", value: "\"0.2\"" }, { name: "temperature", value: "0.2", hot: true }] },
    },
  ],
};

const average: Scene = {
  id: "average",
  title: "Watch an average",
  blurb: "Add the scores, then divide by how many there are.",
  steps: [
    {
      caption: "Three scores sit in a tray: 0.82, 0.74, 0.91.",
      visual: { type: "machine", label: "average()", input: "0.82  0.74  0.91", output: "...", phase: "wait" },
    },
    {
      caption: "sum() adds them. 0.82 + 0.74 + 0.91 = 2.47.",
      visual: { type: "machine", label: "sum()", input: "2.47", output: "...", phase: "work" },
    },
    {
      caption: "Divide by 3. The average is about 0.82.",
      visual: { type: "machine", label: "average()", input: "2.47 / 3", output: "0.82", phase: "out" },
    },
  ],
};

const fork: Scene = {
  id: "fork",
  title: "Watch the fork",
  blurb: "if is a fork in the road. One condition, two paths.",
  steps: [
    {
      caption: "score is 0.82. The fork asks: is score at least 0.7?",
      visual: { type: "fork", condition: "score >= 0.7 ?" },
    },
    {
      caption: "0.82 is bigger, so the keep path lights up.",
      visual: { type: "fork", condition: "0.82 >= 0.7", taken: "keep" },
    },
    {
      caption: "The drop path stays quiet. Only one path runs.",
      visual: { type: "fork", condition: "keep", taken: "keep" },
    },
  ],
};

const strip: Scene = {
  id: "strip",
  title: "Watch the spaces fall off",
  blurb: "strip() wipes spaces on the ends. The letters in the middle stay.",
  steps: [
    {
      caption: "The text has extra spaces before and after.",
      visual: { type: "boxes", boxes: [{ name: "raw", value: "\"  hi  \"", hot: true }] },
    },
    {
      caption: "strip() hands back a new string, \"hi\".",
      visual: { type: "boxes", boxes: [{ name: "raw", value: "\"  hi  \"" }, { name: "clean", value: "\"hi\"", hot: true }] },
    },
    {
      caption: "lower() would then make it \"hi\". The old box is still the old text.",
      visual: { type: "boxes", boxes: [{ name: "clean", value: "\"hi\"", hot: true }] },
    },
  ],
};

const tray: Scene = {
  id: "tray",
  title: "Watch the tray fill",
  blurb: "A list is an ordered tray. The first item is index 0.",
  steps: [
    {
      caption: "The tray starts empty.",
      visual: { type: "tray", items: [] },
    },
    {
      caption: "The first card lands. It is index 0.",
      visual: { type: "tray", items: ["intro"], hot: 0 },
    },
    {
      caption: "Two more cards. intro is still index 0.",
      visual: { type: "tray", items: ["intro", "method", "results"], hot: 0 },
    },
  ],
};

const loop: Scene = {
  id: "loop",
  title: "Watch the counter tick",
  blurb: "A for loop visits each item, then stops. Press Play and watch i change.",
  steps: [
    {
      caption: "Three labels are in the tray. The loop has not started.",
      visual: { type: "tray", items: ["pos", "neg", "pos"], counter: "not started" },
    },
    {
      caption: "First visit. i is 0. The label is pos.",
      visual: { type: "tray", items: ["pos", "neg", "pos"], hot: 0, counter: "i = 0" },
    },
    {
      caption: "Next visit. i is 1. The label is neg.",
      visual: { type: "tray", items: ["pos", "neg", "pos"], hot: 1, counter: "i = 1" },
    },
    {
      caption: "Last visit. i is 2. Then the loop stops.",
      visual: { type: "tray", items: ["pos", "neg", "pos"], hot: 2, counter: "i = 2" },
    },
  ],
};

const lockers: Scene = {
  id: "lockers",
  title: "Watch a locker open",
  blurb: "A dictionary is a row of lockers. The key is the label. The value is inside.",
  steps: [
    {
      caption: "Two lockers are closed. You can see the keys.",
      visual: {
        type: "lockers",
        rows: [
          { key: "model", value: "mini" },
          { key: "temperature", value: "0.2" },
        ],
      },
    },
    {
      caption: "config[\"model\"] opens the locker named model.",
      visual: {
        type: "lockers",
        rows: [
          { key: "model", value: "mini", open: true },
          { key: "temperature", value: "0.2" },
        ],
      },
    },
    {
      caption: "Inside is mini. The other locker stays shut.",
      visual: {
        type: "lockers",
        rows: [
          { key: "model", value: "mini", open: true },
          { key: "temperature", value: "0.2" },
        ],
      },
    },
  ],
};

const machine: Scene = {
  id: "machine",
  title: "Watch the machine",
  blurb: "A function is a machine. Input goes in. return sends a result out.",
  steps: [
    {
      caption: "greet is built, but it has not been called.",
      visual: { type: "machine", label: "greet", input: "model", output: "...", phase: "wait" },
    },
    {
      caption: "The call greet(\"model\") sends the input in.",
      visual: { type: "machine", label: "greet", input: "model", output: "...", phase: "in" },
    },
    {
      caption: "return hands back hello model.",
      visual: { type: "machine", label: "greet", input: "model", output: "hello model", phase: "out" },
    },
  ],
};

const caught: Scene = {
  id: "caught",
  title: "Watch the error get caught",
  blurb: "try runs the risky line. except runs only when that error happens.",
  steps: [
    {
      caption: "The dict has model, and no temperature.",
      visual: { type: "lines", lines: ["payload[\"temperature\"]"], hot: 0 },
    },
    {
      caption: "That lookup raises KeyError. The program would stop here.",
      visual: { type: "lines", lines: ["payload[\"temperature\"]", "except KeyError"], hot: 0, output: "KeyError" },
    },
    {
      caption: "except catches it and prints a calm message instead.",
      visual: { type: "lines", lines: ["payload[\"temperature\"]", "except KeyError"], hot: 1, output: "missing: temperature" },
    },
  ],
};

const flow: Scene = {
  id: "flow",
  title: "Watch the steps",
  blurb: "Each box is one step. Press Play and the highlight walks the path.",
  steps: [
    {
      caption: "The path is ready. Nothing has run.",
      visual: {
        type: "flow",
        nodes: [{ label: "data" }, { label: "step" }, { label: "result" }],
      },
    },
    {
      caption: "Data goes in first.",
      visual: {
        type: "flow",
        nodes: [{ label: "data", hot: true }, { label: "step" }, { label: "result" }],
      },
    },
    {
      caption: "The middle step does the work.",
      visual: {
        type: "flow",
        nodes: [{ label: "data" }, { label: "step", hot: true }, { label: "result" }],
      },
    },
    {
      caption: "A result comes out.",
      visual: {
        type: "flow",
        nodes: [{ label: "data" }, { label: "step" }, { label: "result", hot: true }],
      },
    },
  ],
};

const fit: Scene = {
  id: "fit",
  title: "Watch fit, then predict",
  blurb: "A model learns from examples, then answers a new row.",
  steps: [
    {
      caption: "Training rows wait. The model has not learned yet.",
      visual: {
        type: "flow",
        nodes: [{ label: "rows" }, { label: "fit" }, { label: "predict" }],
      },
    },
    {
      caption: "fit looks at the rows and learns a pattern.",
      visual: {
        type: "flow",
        nodes: [{ label: "rows", hot: true }, { label: "fit", hot: true }, { label: "predict" }],
      },
    },
    {
      caption: "predict uses that pattern on a new row.",
      visual: {
        type: "flow",
        nodes: [{ label: "rows" }, { label: "fit" }, { label: "predict", hot: true }],
      },
    },
  ],
};

const rag: Scene = {
  id: "rag",
  title: "Watch a RAG path",
  blurb: "Find the right notes first. Then ask the model, with those notes in the prompt.",
  steps: [
    {
      caption: "Notes are split into chunks.",
      visual: {
        type: "flow",
        nodes: [{ label: "chunk", hot: true }, { label: "find" }, { label: "ask" }],
      },
    },
    {
      caption: "Search picks the chunks that match the question.",
      visual: {
        type: "flow",
        nodes: [{ label: "chunk" }, { label: "find", hot: true }, { label: "ask" }],
      },
    },
    {
      caption: "The model answers from those chunks, not from a guess.",
      visual: {
        type: "flow",
        nodes: [{ label: "chunk" }, { label: "find" }, { label: "ask", hot: true }],
      },
    },
  ],
};

const asyncScene: Scene = {
  id: "async",
  title: "Watch two calls overlap",
  blurb: "While one call waits on the network, the other can wait too.",
  steps: [
    {
      caption: "Two calls are ready. Neither has started.",
      visual: { type: "boxes", boxes: [{ name: "call 1", value: "waiting" }, { name: "call 2", value: "waiting" }] },
    },
    {
      caption: "Both start. They wait at the same time.",
      visual: { type: "boxes", boxes: [{ name: "call 1", value: "waiting", hot: true }, { name: "call 2", value: "waiting", hot: true }] },
    },
    {
      caption: "Both finish. The batch took one wait, not two.",
      visual: { type: "boxes", boxes: [{ name: "call 1", value: "done", hot: true }, { name: "call 2", value: "done", hot: true }] },
    },
  ],
};

const SCENES: Record<string, Scene> = {
  lines,
  indent,
  boxes,
  cast,
  average,
  fork,
  strip,
  tray,
  loop,
  lockers,
  machine,
  caught,
  flow,
  fit,
  rag,
  async: asyncScene,
};

const SCENE_BY_SLUG: Record<string, string> = {
  "why-python-for-ai": "lines",
  "syntax-and-comments": "indent",
  "variables-types-operators": "boxes",
  "casting-and-conversion": "cast",
  "numbers-and-math": "average",
  "booleans-and-comparisons": "fork",
  "strings-and-text": "strip",
  "string-methods-and-formatting": "strip",
  "lists-tuples-sets": "tray",
  "dictionaries": "lockers",
  "control-flow": "loop",
  "project-sentiment-checker": "fork",
  "functions": "machine",
  "lambda-map-filter": "machine",
  "comprehensions-and-generators": "tray",
  "iterators-and-iterables": "loop",
  "scope-and-closures": "boxes",
  "errors-and-exceptions": "caught",
  "files-and-json": "lines",
  "first-real-ai-call": "lockers",
  "classes-and-objects": "boxes",
  "inheritance-and-polymorphism": "machine",
  "decorators-and-context-managers": "machine",
  "regular-expressions": "lines",
  "dates-and-times": "boxes",
  "standard-library-toolkit": "tray",
  "modules-and-environments": "lines",
  "packages-and-pip": "lines",
  "project-experiment-tracker": "lockers",
  "type-hints-and-dataclasses": "boxes",
  "numpy-arrays": "tray",
  "pandas-dataframes": "tray",
  "statistics-for-ml": "average",
  "data-distributions-and-plots": "average",
  "sklearn-regression": "fit",
  "sklearn-classification": "fork",
  "sklearn-pipelines-and-clustering": "fit",
  "databases-with-python": "lockers",
  "testing-with-pytest": "lines",
  "logging-and-configuration": "lines",
  "project-spam-classifier": "fit",
  "async-python": "async",
  "calling-llm-apis": "lockers",
  "numpy-to-pytorch": "boxes",
  "rag-from-scratch": "rag",
  "fastapi-model-service": "machine",
  "production-python-checklist": "flow",
  "project-ask-my-notes": "rag",
  "builtin-functions-reference": "boxes",
  "string-methods-reference": "strip",
  "collection-methods-reference": "tray",
  "keywords-operators-exceptions-reference": "caught",
};

export function sceneFor(slug: string): Scene {
  const id = SCENE_BY_SLUG[slug] ?? "flow";
  return SCENES[id] ?? flow;
}

export function sceneIdsBySlug(): Record<string, string> {
  return SCENE_BY_SLUG;
}

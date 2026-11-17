import { SketchCard, type SketchKind } from "./sketches";

type SketchSpec = {
  kind: SketchKind;
  title: string;
  caption: string;
};

const BY_SLUG: Record<string, SketchSpec[]> = {
  "why-python-for-ai": [
    {
      kind: "browser",
      title: "Python running inside a browser window",
      caption: "Press Run. Python starts in this browser. Nothing to install.",
    },
    {
      kind: "model",
      title: "Rows of data flowing into a model and a keep decision coming out",
      caption: "AI work is data in, a model, then a result. Python carries the data.",
    },
  ],
  "syntax-and-comments": [
    {
      kind: "steps",
      title: "Three lines of Python running from top to bottom",
      caption: "Python reads line 1, then line 2, then line 3. A # line is a note it skips.",
    },
  ],
  "variables-types-operators": [
    {
      kind: "variables",
      title: "Three labeled boxes holding a name, a score, and True",
      caption: "A variable is a name on a box. The box holds text, a number, or True or False.",
    },
  ],
  "casting-and-conversion": [
    {
      kind: "variables",
      title: "A text box being read as a number",
      caption: "\"0.91\" is text. float(\"0.91\") puts a real number in the box.",
    },
  ],
  "numbers-and-math": [
    {
      kind: "function",
      title: "Scores going into an average machine and a number coming out",
      caption: "Add the scores, divide by how many there are, and you have an average.",
    },
  ],
  "booleans-and-comparisons": [
    {
      kind: "fork",
      title: "A yes-or-no fork labeled if",
      caption: "A comparison answers True or False. if uses that answer to pick a path.",
    },
  ],
  "strings-and-text": [
    {
      kind: "string",
      title: "The letters of Hello with extra spaces being wiped off the ends",
      caption: "A string is a row of characters. strip() wipes spaces before you send a prompt.",
    },
  ],
  "string-methods-and-formatting": [
    {
      kind: "string",
      title: "Letters in boxes being cleaned",
      caption: "Methods like lower() and strip() hand you a new string. The old one stays as it was.",
    },
  ],
  "lists-tuples-sets": [
    {
      kind: "list",
      title: "A tray holding three labeled cards: MLOps, RAG, and Eval",
      caption: "A list is an ordered tray. The first card is index 0. A set throws out duplicate cards.",
    },
  ],
  dictionaries: [
    {
      kind: "dict",
      title: "A key folder labeled model next to a value folder labeled bert",
      caption: "A dictionary pairs a key with a value. Look up the key, get the value.",
    },
  ],
  "control-flow": [
    {
      kind: "fork",
      title: "A diamond decision splitting into keep and drop",
      caption: "if is a fork. One condition, two paths: keep the score or drop it.",
    },
    {
      kind: "loop",
      title: "A cycle labeled each score",
      caption: "A for loop walks every item in the tray, then stops.",
    },
  ],
  functions: [
    {
      kind: "function",
      title: "Scores entering a machine named average and a result leaving",
      caption: "def builds a machine. You call it with parentheses. return hands the result back.",
    },
  ],
};

const DEFAULT_SKETCH: SketchSpec = {
  kind: "model",
  title: "Data flowing into a model",
  caption: "Same idea as the basics: values go in, Python does the work, a result comes out.",
};

function sketchesFor(slug: string): SketchSpec[] {
  return BY_SLUG[slug] ?? [DEFAULT_SKETCH];
}

export default function LessonSketch({ slug }: { slug: string }) {
  const sketches = sketchesFor(slug);
  return (
    <div className={`grid gap-3 ${sketches.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {sketches.map((sketch) => (
        <SketchCard key={sketch.kind} kind={sketch.kind} title={sketch.title} caption={sketch.caption} />
      ))}
    </div>
  );
}

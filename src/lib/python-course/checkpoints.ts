export type CheckpointOption = {
  id: string;
  label: string;
};

export type CheckpointQuestion = {
  id: string;
  prompt: string;
  options: CheckpointOption[];
  answer: string;
  explain: string;
};

export type Checkpoint = {
  slug: string;
  title: string;
  questions: CheckpointQuestion[];
};

const CHECKPOINTS: Checkpoint[] = [
  {
    slug: "why-python-for-ai",
    title: "Quick check: what you just learned",
    questions: [
      {
        id: "what",
        prompt: "What is Python?",
        options: [
          { id: "snake", label: "A kind of chart" },
          { id: "lang", label: "A programming language AI teams use for data and models" },
          { id: "host", label: "A place that hosts websites" },
        ],
        answer: "lang",
        explain: "Python is a programming language. ML and GenAI tools are Python libraries, so the language is the glue.",
      },
      {
        id: "setup",
        prompt: "How do you run the first programs in this course?",
        options: [
          { id: "install", label: "Install Python on your laptop before lesson 1" },
          { id: "run", label: "Press Run. Python runs in the browser, with nothing to install" },
          { id: "email", label: "Email the instructor for a login" },
        ],
        answer: "run",
        explain: "Press Run and the browser downloads Python once. Your code stays on this device.",
      },
    ],
  },
  {
    slug: "syntax-and-comments",
    title: "Quick check: how Python reads code",
    questions: [
      {
        id: "order",
        prompt: "In what order does Python run a file?",
        options: [
          { id: "bottom", label: "Bottom to top" },
          { id: "top", label: "Top to bottom" },
          { id: "click", label: "Only the line you click" },
        ],
        answer: "top",
        explain: "Python starts at the first line and walks down. Indentation shows which lines belong together.",
      },
      {
        id: "comment",
        prompt: "What does a line that starts with # do?",
        options: [
          { id: "print", label: "It prints a heading" },
          { id: "skip", label: "It is a comment. Python skips it" },
          { id: "loop", label: "It starts a loop" },
        ],
        answer: "skip",
        explain: "# marks a note for humans. Python ignores the rest of that line.",
      },
    ],
  },
  {
    slug: "variables-types-operators",
    title: "Quick check: variables",
    questions: [
      {
        id: "box",
        prompt: "What is a variable?",
        options: [
          { id: "box", label: "A name stuck on a value, like a labeled box" },
          { id: "list", label: "A tray that must hold many items" },
          { id: "chart", label: "A chart of model accuracy" },
        ],
        answer: "box",
        explain: "score = 0.91 puts the number 0.91 in a box named score.",
      },
      {
        id: "float",
        prompt: "Which value is a float?",
        options: [
          { id: "int", label: "32" },
          { id: "float", label: "0.91" },
          { id: "text", label: '"hello"' },
        ],
        answer: "float",
        explain: "A float has a decimal point. 32 is an int. \"hello\" is text.",
      },
    ],
  },
  {
    slug: "numbers-and-math",
    title: "Quick check: numbers",
    questions: [
      {
        id: "avg",
        prompt: "How do you average the scores 0.82, 0.74, and 0.91?",
        options: [
          { id: "mean", label: "sum(scores) / len(scores)" },
          { id: "first", label: "Print only scores[0]" },
          { id: "flip", label: "len(scores) / sum(scores)" },
        ],
        answer: "mean",
        explain: "Add the scores, then divide by how many there are. That is the average.",
      },
      {
        id: "div",
        prompt: "What does 7 / 2 give you in Python?",
        options: [
          { id: "three", label: "3" },
          { id: "float", label: "3.5" },
          { id: "one", label: "1" },
        ],
        answer: "float",
        explain: "/ always gives a float. Use // when you want a whole number.",
      },
    ],
  },
  {
    slug: "strings-and-text",
    title: "Quick check: text",
    questions: [
      {
        id: "strip",
        prompt: "What does strip() do to a prompt?",
        options: [
          { id: "spaces", label: "Removes extra spaces at the start and end" },
          { id: "delete", label: "Deletes the whole string" },
          { id: "numbers", label: "Turns the text into a list of numbers" },
        ],
        answer: "spaces",
        explain: "strip() cleans padding so you do not send blank space to a model.",
      },
      {
        id: "f",
        prompt: "Which line puts a name into a sentence?",
        options: [
          { id: "f", label: 'f"Hello {name}"' },
          { id: "hash", label: "# Hello name" },
          { id: "len", label: "len(name)" },
        ],
        answer: "f",
        explain: "An f-string drops the value of name into the sentence.",
      },
    ],
  },
  {
    slug: "lists-tuples-sets",
    title: "Quick check: lists",
    questions: [
      {
        id: "tray",
        prompt: "What is a list good for?",
        options: [
          { id: "tray", label: "Holding items in order, like a tray of chunks" },
          { id: "one", label: "Holding one score with a name" },
          { id: "skip", label: "Skipping a line of code" },
        ],
        answer: "tray",
        explain: "A list keeps order. chunks[0] is the first item. chunks[:2] keeps the first two.",
      },
      {
        id: "clean",
        prompt: "You have duplicate document ids. What drops the copies?",
        options: [
          { id: "set", label: "set(ids)" },
          { id: "print", label: "print(ids)" },
          { id: "strip", label: "ids.strip()" },
        ],
        answer: "set",
        explain: "A set keeps each value once. That is a simple way to clean duplicate ids.",
      },
    ],
  },
  {
    slug: "dictionaries",
    title: "Quick check: dictionaries",
    questions: [
      {
        id: "pair",
        prompt: "What does a dictionary store?",
        options: [
          { id: "pair", label: "A key and a value, like a labeled folder" },
          { id: "only", label: "Only whole numbers" },
          { id: "dupes", label: "The same key many times" },
        ],
        answer: "pair",
        explain: 'config["model"] looks up the value stored under the key "model".',
      },
      {
        id: "get",
        prompt: "The key might be missing. What is a safe lookup?",
        options: [
          { id: "get", label: 'config.get("model", "mini")' },
          { id: "plus", label: "config + model" },
          { id: "hash", label: "# config" },
        ],
        answer: "get",
        explain: ".get() returns the default when the key is missing, instead of crashing.",
      },
    ],
  },
  {
    slug: "control-flow",
    title: "Quick check: decisions and loops",
    questions: [
      {
        id: "if",
        prompt: "What is if / else?",
        options: [
          { id: "fork", label: "A fork. One condition, two paths" },
          { id: "install", label: "A way to install Python" },
          { id: "tray", label: "A tray of scores" },
        ],
        answer: "fork",
        explain: "if score >= 0.7 keeps the row. else drops it.",
      },
      {
        id: "for",
        prompt: "What does a for loop do?",
        options: [
          { id: "each", label: "Visits each item, then stops" },
          { id: "first", label: "Runs only the first line of the file" },
          { id: "delete", label: "Deletes the list" },
        ],
        answer: "each",
        explain: "for label in labels: walks the tray one item at a time.",
      },
    ],
  },
  {
    slug: "functions",
    title: "Quick check: functions",
    questions: [
      {
        id: "machine",
        prompt: "What is a function?",
        options: [
          { id: "machine", label: "A little machine you define once and call when you need a result" },
          { id: "comment", label: "A comment Python skips" },
          { id: "cert", label: "A certificate file" },
        ],
        answer: "machine",
        explain: "def builds the machine. Calling it with () runs it.",
      },
      {
        id: "return",
        prompt: "Which word sends a value back from a function?",
        options: [
          { id: "return", label: "return" },
          { id: "hash", label: "#" },
          { id: "import", label: "import" },
        ],
        answer: "return",
        explain: "return hands the result to the line that called the function. print only shows it.",
      },
    ],
  },
];

const BY_SLUG = new Map(CHECKPOINTS.map((checkpoint) => [checkpoint.slug, checkpoint]));

export function getCheckpoint(slug: string): Checkpoint | undefined {
  return BY_SLUG.get(slug);
}

import type { PythonModuleId } from "./types";

export type MemoryHook = {
  analogy: string;
  remember: string;
  ai: string;
};

export type FlashCard = {
  prompt: string;
  answer: string;
};

const HOOKS: Record<string, MemoryHook> = {
  "why-python-for-ai": {
    analogy: "Python is a recipe the computer reads from the top.",
    remember: "print shows a result. # starts a note the computer skips.",
    ai: "Most machine learning and GenAI libraries are written in Python.",
  },
  "syntax-and-comments": {
    analogy: "Indentation is the margin that shows which lines belong together.",
    remember: "A colon opens a block. The next lines are indented four spaces.",
    ai: "A training loop is just an indented block that repeats.",
  },
  "variables-types-operators": {
    analogy: "A variable is a sticky label on a box.",
    remember: "0.91 is a float. True, False, and None start with a capital letter.",
    ai: "A learning rate is a float in a box. A batch size is an int in a box.",
  },
  "casting-and-conversion": {
    analogy: "Casting is copying a value into a different kind of box.",
    remember: "float(\"0.2\") is the number 0.2. The text box stays text.",
    ai: "A form sends \"0.2\" as text. The model needs the number.",
  },
  "numbers-and-math": {
    analogy: "An average is the total poured evenly into the same number of cups.",
    remember: "7 / 2 is 3.5. 7 // 2 is 3. Average is sum divided by count.",
    ai: "A mean accuracy is the average of the scores in a list.",
  },
  "booleans-and-comparisons": {
    analogy: "A boolean is a yes-or-no gate.",
    remember: "10 > 9 is True. 0, 0.0, \"\", None, and False are all falsy.",
    ai: "A threshold check, score >= 0.7, is a yes-or-no gate on a prediction.",
  },
  "strings-and-text": {
    analogy: "A string is a row of letters in a sealed sleeve.",
    remember: "strip, lower, and replace hand back a new string. The old one stays.",
    ai: "A prompt is a string. Cleaning it does not change the original log line.",
  },
  "string-methods-and-formatting": {
    analogy: "Methods are tools you hand the sleeve to. They give you a new sleeve.",
    remember: "Join pieces with \" \".join(words). Do not rebuild a prompt with += in a loop.",
    ai: "A prompt is often a list of pieces joined into one string.",
  },
  "lists-tuples-sets": {
    analogy: "A list is a tray of cards in order. A set is a pile with no duplicates.",
    remember: "The first card is index 0. append returns None, so do not assign it.",
    ai: "Retrieved chunks are a list. A set of seen ids drops duplicates.",
  },
  "dictionaries": {
    analogy: "A dictionary is a row of labeled lockers.",
    remember: "config[\"model\"] opens that locker. .get(key, default) is safe when the key may be missing.",
    ai: "An LLM request is a dict: model, messages, and temperature.",
  },
  "control-flow": {
    analogy: "if is a fork in the road. for is a lap around the tray.",
    remember: "Only the matching path runs. A for loop visits each item, then stops.",
    ai: "Keep a prediction when the score clears the threshold. Skip the rest.",
  },
  "project-sentiment-checker": {
    analogy: "Count the good words and the bad words, then take the bigger pile.",
    remember: "More good words means positive. More bad words means negative. A tie is neutral.",
    ai: "This is a rule-based sentiment model. Later, a learned model replaces the word lists.",
  },
  "functions": {
    analogy: "A function is a machine with an input slot and a return chute.",
    remember: "def builds the machine. A call sends input in. return sends a value out.",
    ai: "A scoring function takes text in and returns a number out.",
  },
  "lambda-map-filter": {
    analogy: "A lambda is a one-line machine you do not bother to name.",
    remember: "key=lambda row: row[\"score\"] tells sorted which number to look at.",
    ai: "Rank retrieved chunks by score with a lambda sort key.",
  },
  "comprehensions-and-generators": {
    analogy: "A comprehension is a tray you fill with a one-line rule.",
    remember: "[s for s in scores if s >= 0.7] keeps only the high scores.",
    ai: "Filter a batch of scores down to the ones worth keeping.",
  },
  "iterators-and-iterables": {
    analogy: "An iterator is a ticket roll. Each ticket comes out once.",
    remember: "A spent iterator looks empty. zip pairs two rows, item by item.",
    ai: "A data loader yields batches once. Asking it again gives nothing.",
  },
  "scope-and-closures": {
    analogy: "A name lives in the room where it was written.",
    remember: "Changing a list inside a function changes the same list. Rebinding a name does not.",
    ai: "A shared results list grows across calls. A copied config does not.",
  },
  "errors-and-exceptions": {
    analogy: "try is the risky step. except is the net under that one step.",
    remember: "Catch the error you expect, such as KeyError. A bare except hides surprises.",
    ai: "A missing field in a model reply should be caught and reported, not ignored.",
  },
  "files-and-json": {
    analogy: "with open(...) is a door you close when you leave.",
    remember: "json.load reads a file. json.loads reads a string. Always pass encoding=\"utf-8\".",
    ai: "Experiment logs and chat transcripts are JSON files.",
  },
  "first-real-ai-call": {
    analogy: "An AI call is a letter: you write a request dict, send it, and read the reply.",
    remember: "The request holds model and messages. A strange reply should not crash the program.",
    ai: "Every GenAI app is this loop: build JSON, send it, read the text back.",
  },
  "classes-and-objects": {
    analogy: "A class is the blueprint. An object is one built thing.",
    remember: "self is that one object. Client(\"mini\").model is the model stored on it.",
    ai: "A client object remembers the model name so every call can reuse it.",
  },
  "inheritance-and-polymorphism": {
    analogy: "A shared interface is a plug shape. Different tools fit the same socket.",
    remember: "If it has fit and predict, calling code does not care which class it is.",
    ai: "sklearn estimators share fit and predict. Your retriever can share search.",
  },
  "decorators-and-context-managers": {
    analogy: "A decorator is wrapping paper around a function. with is a door that shuts itself.",
    remember: "A decorator takes a function and returns a function. with closes the file for you.",
    ai: "Time a model call by wrapping it. Open a log file with with.",
  },
  "regular-expressions": {
    analogy: "A regex is a stencil you lay over text to find a shape.",
    remember: "Use it to pull a JSON blob out of a reply, or to hide an email address.",
    ai: "Model replies sometimes wrap JSON in extra words. A pattern can lift the JSON out.",
  },
  "dates-and-times": {
    analogy: "A datetime is a timestamp on a ticket. A timedelta is how long you add.",
    remember: "Store timestamps in UTC, then format them for the report.",
    ai: "Training windows and daily token counts are datetime math.",
  },
  "standard-library-toolkit": {
    analogy: "The standard library is a toolbox that ships with Python.",
    remember: "Counter counts labels. uuid makes an id. hashlib makes a fingerprint.",
    ai: "Count class labels with Counter before you trust a metric.",
  },
  "modules-and-environments": {
    analogy: "A module is one file of tools. A venv is a private shelf for packages.",
    remember: "Imports go at the top. One project, one venv, pinned versions.",
    ai: "Pin torch and transformers so a rerun uses the same code.",
  },
  "packages-and-pip": {
    analogy: "pip is the shop. A requirements file is the shopping list.",
    remember: "A module is one file. A package is a folder of modules. Install from the list.",
    ai: "requirements.txt is how a teammate gets the same ML libraries.",
  },
  "project-experiment-tracker": {
    analogy: "Each training run is a locker: settings in, scores out, best locker wins.",
    remember: "Save every run as JSON. Compare scores. Keep the best settings.",
    ai: "MLflow does this at team scale. The idea is the same locker of runs.",
  },
  "type-hints-and-dataclasses": {
    analogy: "A type hint is a label that says what belongs in the box.",
    remember: "def score(text: str) -> float tells humans and tools the shapes.",
    ai: "A train config with a string where a float belongs fails early, not mid-run.",
  },
  "numpy-arrays": {
    analogy: "A NumPy array is a tray of numbers with a shape, like rows and columns.",
    remember: "dtype says the number kind. shape says how the tray is arranged.",
    ai: "Embeddings are arrays. Cosine similarity compares two of them.",
  },
  "pandas-dataframes": {
    analogy: "A DataFrame is a spreadsheet with named columns.",
    remember: "Filter rows, then group. Do not loop cell by cell when the column can do it.",
    ai: "An eval sheet is a DataFrame: one row per example, columns for label and score.",
  },
  "statistics-for-ml": {
    analogy: "The mean is the balance point. The median is the middle card.",
    remember: "One huge outlier pulls the mean and barely moves the median.",
    ai: "A single slow request makes mean latency look worse than the typical request.",
  },
  "data-distributions-and-plots": {
    analogy: "A plot is the shape of the numbers, drawn so your eye can see it.",
    remember: "Histogram for one column. Scatter for two. Set a seed so the picture repeats.",
    ai: "Plot scores before you trust a single average.",
  },
  "sklearn-regression": {
    analogy: "fit is the study session. predict is the test on a new question.",
    remember: "X is 2D, y is 1D. Split before fit. Fit the scaler on train rows only.",
    ai: "Predicting a price or a latency is regression: a number out.",
  },
  "sklearn-classification": {
    analogy: "Classification picks a label. Accuracy is how often the label is right.",
    remember: "If most rows are one class, accuracy can look high while the rare class is missed.",
    ai: "Spam is the rare class. Precision and recall tell you more than accuracy.",
  },
  "sklearn-pipelines-and-clustering": {
    analogy: "A pipeline is a fixed order of machines, so you cannot skip a step.",
    remember: "Scale, then cluster. One-hot categories that have no order.",
    ai: "A leak happens when a scaler sees the test rows before scoring.",
  },
  "databases-with-python": {
    analogy: "SQL is a question you send to a table. A placeholder is a blank in that question.",
    remember: "Use ? for values. Never paste user text into the SQL string.",
    ai: "Store eval rows in SQLite and query them, instead of rewriting CSV filters.",
  },
  "testing-with-pytest": {
    analogy: "A test is a small check that fails loudly when the number changes.",
    remember: "assert expected == actual. Mock the model so the test does not call the network.",
    ai: "An accuracy gate fails the build when a change makes the model worse.",
  },
  "logging-and-configuration": {
    analogy: "A log is a diary line. A config is the settings card for the run.",
    remember: "Log the model and the latency. Never log the API key.",
    ai: "When a prompt fails in production, the log is how you reconstruct the call.",
  },
  "project-spam-classifier": {
    analogy: "Show the model labeled messages. It learns which words lean spam.",
    remember: "Split first, fit on train, score on test, then save the model file.",
    ai: "This is the ML loop: data, split, fit, metric, saved file.",
  },
  "async-python": {
    analogy: "await is a pause that lets other work wait at the same time.",
    remember: "Use asyncio.gather for many calls. Do not block the loop with time.sleep.",
    ai: "Ten model calls can wait together instead of in a line.",
  },
  "calling-llm-apis": {
    analogy: "The payload is the letter: model, messages, temperature, max_tokens.",
    remember: "Temperature 0 is the steady setting. Retry only when the failure is temporary.",
    ai: "A timeout and a JSON check keep a flaky reply from breaking the app.",
  },
  "numpy-to-pytorch": {
    analogy: "A tensor is an array that also remembers how it was computed.",
    remember: "Training step: zero_grad, forward, loss, backward, step. Inference uses no_grad.",
    ai: "That five-step loop is how a small neural net learns.",
  },
  "rag-from-scratch": {
    analogy: "RAG is an open-book test. Find the page, then answer.",
    remember: "Chunk, embed, search, then prompt. Fix search before you blame the model.",
    ai: "A notes bot answers from your chunks, with the source attached.",
  },
  "fastapi-model-service": {
    analogy: "The app is a counter. Load the model once when the shop opens.",
    remember: "/health means the process is up. /ready means the model is loaded.",
    ai: "A model service answers questions over HTTP after one load.",
  },
  "production-python-checklist": {
    analogy: "Production is the same script with the lights on: pins, tests, and logs.",
    remember: "Pin versions, set seeds, run tests, and log the config of the run.",
    ai: "A rerun should use the same libraries and the same random seed.",
  },
  "project-ask-my-notes": {
    analogy: "Split the notes, find the matching cards, then ask the model with those cards.",
    remember: "The answer should quote the notes you retrieved, not a bare guess.",
    ai: "This is a mini RAG bot: your notes, a search, a grounded prompt.",
  },
  "builtin-functions-reference": {
    analogy: "Builtins are the tools already on the table.",
    remember: "len, sum, min, max, sorted, and isinstance cover most day-one checks.",
    ai: "isinstance(score, float) is safer than type(score) is float.",
  },
  "string-methods-reference": {
    analogy: "Each string method returns a new sleeve.",
    remember: "Assign the result. strip, lower, split, and join are the daily four.",
    ai: "Normalize a label with strip().lower() before you compare it.",
  },
  "collection-methods-reference": {
    analogy: "sort() rearranges the tray and returns nothing. sorted() hands you a new tray.",
    remember: "Use a set for membership. Use dict.get when the key might be missing.",
    ai: "A set of known labels is the fast way to ask \"have we seen this class?\"",
  },
  "keywords-operators-exceptions-reference": {
    analogy: "is asks \"same object?\". == asks \"same value?\".",
    remember: "Use is for None, True, and False. Use == for numbers and strings.",
    ai: "if score is None catches a missing score. if score == 0 catches a real zero.",
  },
};

const CARDS: Record<PythonModuleId, FlashCard[]> = {
  foundations: [
    { prompt: "What does print do?", answer: "It shows a value on the screen." },
    { prompt: "What is a variable?", answer: "A name on a box that holds a value." },
    { prompt: "What is index 0?", answer: "The first item in a list." },
    { prompt: "What does if do?", answer: "It picks one path. The other path does not run." },
  ],
  "core-language": [
    { prompt: "What does return do?", answer: "It sends a value out of a function." },
    { prompt: "What does append return?", answer: "None. The list changes in place." },
    { prompt: "What should except catch?", answer: "A specific error, such as KeyError." },
    { prompt: "Where do imports go?", answer: "At the top of the file." },
  ],
  "data-ml": [
    { prompt: "What is the mean?", answer: "The sum divided by how many numbers there are." },
    { prompt: "When do you split?", answer: "Before fit. The test rows stay unseen." },
    { prompt: "Why can accuracy mislead?", answer: "A rare class can be missed while the score looks high." },
    { prompt: "Where do values go in SQL?", answer: "In placeholders, not pasted into the string." },
  ],
  "genai-production": [
    { prompt: "What does await let you do?", answer: "Wait on one call while other calls wait too." },
    { prompt: "What is in an LLM payload?", answer: "model, messages, and usually temperature." },
    { prompt: "What is the RAG order?", answer: "Chunk, find, then ask the model with those chunks." },
    { prompt: "When do you load the model?", answer: "Once, when the service starts." },
  ],
  reference: [
    { prompt: "is or == for None?", answer: "is. Use == for ordinary values." },
    { prompt: "sort() or sorted()?", answer: "sorted() returns a new list. sort() returns None." },
    { prompt: "What does strip() return?", answer: "A new string, with end spaces removed." },
    { prompt: "What does dict.get do?", answer: "It returns the value, or a default if the key is missing." },
  ],
};

export function memoryFor(slug: string): MemoryHook | undefined {
  return HOOKS[slug];
}

export function memorySlugs(): string[] {
  return Object.keys(HOOKS);
}

export function moduleCards(moduleId: PythonModuleId): FlashCard[] {
  return CARDS[moduleId];
}

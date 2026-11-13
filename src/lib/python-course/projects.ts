import type { LaptopRun, LaptopStep, PythonLesson } from "./types";
import { py } from "./py";

/*
 * The first real AI call lesson, the four module projects, and the laptop files for
 * lessons whose real version cannot run in a browser (PyTorch, FastAPI).
 * Every laptop file here was run on a real machine before publishing. Re-run them after edits.
 */

const VENV_STEPS: LaptopStep[] = [
  {
    text: "Create a virtual environment, so this project's packages stay inside this folder. On Mac and Linux, type `python3` instead of `python` everywhere.",
    command: "python -m venv .venv",
  },
  {
    text: "Turn it on. Windows: `.venv\\Scripts\\activate`. Mac or Linux: `source .venv/bin/activate`. Your terminal line now starts with `(.venv)`.",
  },
];

const GITIGNORE = py`
  __pycache__/
  .venv/
`;

// ---------------------------------------------------------------------------
// Module 2 · Your first real AI call
// ---------------------------------------------------------------------------

const FIRST_AI_CALL_FILE = py`
  """Your first real AI call: ask a free local model a question from Python."""
  import json
  import urllib.error
  import urllib.request

  URL = "http://localhost:11434/v1/chat/completions"
  MODEL = "llama3.2"
  SYSTEM = "You are a friendly tutor. Answer in 2 short sentences."


  def build_request(question):
      return {
          "model": MODEL,
          "messages": [
              {"role": "system", "content": SYSTEM},
              {"role": "user", "content": question},
          ],
          "stream": False,
      }


  def get_answer(raw):
      data = json.loads(raw)
      return data["choices"][0]["message"]["content"].strip()


  def ask(question):
      body = json.dumps(build_request(question)).encode("utf-8")
      request = urllib.request.Request(URL, data=body, headers={"Content-Type": "application/json"})
      with urllib.request.urlopen(request, timeout=120) as response:
          return get_answer(response.read().decode("utf-8"))


  if __name__ == "__main__":
      try:
          print(ask("What is MLOps? Explain it to a college fresher."))
      except urllib.error.HTTPError as err:
          print(f"Ollama answered with an error ({err.code}). Did you download the model? Run: ollama pull {MODEL}")
      except urllib.error.URLError:
          print("Could not reach Ollama. Open the Ollama app (or run: ollama serve), then try again.")
`;

const SAMPLE_REPLY = `'{"id": "chatcmpl-1", "object": "chat.completion", "model": "llama3.2", "choices": [{"index": 0, "message": {"role": "assistant", "content": "  MLOps is how teams ship ML models to production and keep them working.  "}, "finish_reason": "stop"}], "usage": {"prompt_tokens": 31, "completion_tokens": 15, "total_tokens": 46}}'`;

const FIRST_AI_CALL: PythonLesson = {
  slug: "first-real-ai-call",
  title: "Your First Real AI Call",
  moduleId: "core-language",
  level: "intermediate",
  minutes: 30,
  summary:
    "Run a free AI model on your own laptop with Ollama and talk to it from Python. No API key, no credit card.",
  whyForAi:
    "Every GenAI app is this same loop: build a JSON request, send it, read the reply. Do it once on your laptop and every AI API looks familiar.",
  packages: [],
  sections: [
    {
      heading: "What you will do",
      basicTip: "A question is just a string.",
      basicCode: py`
        model = "llama3.2"
        question = "What is MLOps?"
        print("Asking", model, "->", question)
      `,
      body: `You will make an AI model answer you from your own Python code:

1. Install **Ollama**, a free app that runs AI models on your computer.
2. Download one small model.
3. Send it a question from Python and print the answer.

This website runs Python inside your browser, and the browser cannot reach the AI on your laptop. So you practise the code here (the exercise checks it), then run the real thing on your laptop in the last part of this lesson.`,
    },
    {
      heading: "The request is just a dict",
      basicTip: "Build the request and print it as JSON.",
      basicCode: py`
        import json
        request = {
            "model": "llama3.2",
            "messages": [{"role": "user", "content": "What is MLOps?"}],
            "stream": False,
        }
        print(json.dumps(request, indent=2))
      `,
      body: `You send the model a dict, turned into JSON text:

- \`model\` - which model should answer
- \`messages\` - a list of \`{"role": ..., "content": ...}\` dicts. \`system\` sets the rules, \`user\` is the question
- \`stream\` - \`False\` means "send the whole answer at once"

Common mistake: sending a plain string instead of the \`messages\` list.`,
    },
    {
      heading: "Read the reply",
      basicTip: "The answer is inside choices, then message, then content.",
      basicCode: py`
        import json
        raw = '{"choices": [{"message": {"role": "assistant", "content": "Hello!"}}]}'
        data = json.loads(raw)
        print(data["choices"][0]["message"]["content"])
      `,
      body: `The model sends back JSON text. Turn it into a dict with \`json.loads\`, then dig in:

- \`data["choices"][0]["message"]["content"]\` is the answer
- \`data["usage"]["total_tokens"]\` is how many tokens the call used

AI answers often start or end with spaces or new lines, so \`.strip()\` the text before you use it.`,
    },
    {
      heading: "Same code, any provider",
      basicTip: "Read the URL and key from environment variables.",
      basicCode: py`
        import os
        url = os.environ.get("LLM_URL", "http://localhost:11434/v1/chat/completions")
        key = os.environ.get("LLM_API_KEY", "")
        headers = {"Content-Type": "application/json"}
        if key:
            headers["Authorization"] = f"Bearer {key}"
        print(url, list(headers))
      `,
      body: `This request shape (\`model\` plus \`messages\`, sent to \`/v1/chat/completions\`) is the **OpenAI-compatible** format. OpenAI and many other hosted providers accept it, and Ollama copies it on purpose.

To switch to a hosted model later, change three things: the URL, the model name, and an \`Authorization: Bearer <key>\` header.

Common mistake: pasting an API key into your code. Keep keys in environment variables and out of GitHub.`,
    },
  ],
  examples: [
    {
      title: "AI / ML: keep a chat history",
      note: "To hold a conversation, send the whole history every time.",
      aiMl: "Chatbots remember earlier turns only because the app re-sends them.",
      code: py`
        messages = [{"role": "system", "content": "Be brief."}]
        messages.append({"role": "user", "content": "What is Docker?"})
        messages.append({"role": "assistant", "content": "It packages apps with their dependencies."})
        messages.append({"role": "user", "content": "And Kubernetes?"})
        for m in messages:
            print(f"{m['role']:>9}: {m['content']}")
      `,
    },
    {
      title: "AI / ML: never crash on a strange reply",
      note: "Return a fallback when the reply is not what you expected.",
      aiMl: "Production apps log the bad reply and show a friendly message instead of crashing.",
      code: py`
        import json

        def safe_answer(raw, fallback="Sorry, no answer this time."):
            try:
                text = json.loads(raw)["choices"][0]["message"]["content"].strip()
            except (ValueError, KeyError, IndexError, TypeError):
                return fallback
            return text or fallback

        print(safe_answer('{"choices": []}'))
        print(safe_answer('{"choices": [{"message": {"content": " Hi! "}}]}'))
      `,
    },
  ],
  tryIt: {
    title: "Build the request you will send",
    hint: "Change the question and the system message, then press Run.",
    starter: py`
      import json

      request = {
          "model": "llama3.2",
          "messages": [
              {"role": "system", "content": "You are a friendly tutor. Answer in 2 short sentences."},
              {"role": "user", "content": "What is a vector database?"},
          ],
          "stream": False,
      }
      print(json.dumps(request, indent=2))
    `,
  },
  takeaways: [
    "An AI call is a JSON request with a model and a list of messages.",
    "The answer is at choices[0].message.content. Strip it before using it.",
    "The same OpenAI-compatible shape works with Ollama and many hosted providers.",
  ],
  exercise: {
    task: "Write the two functions you will run on your laptop. `build_request(question)` returns a dict with model `\"llama3.2\"`, `stream` set to `False`, and two messages: the `SYSTEM` text as a system message, then the question as a user message. `get_answer(raw)` takes the raw JSON text the model sends back and returns the answer text, stripped.",
    hint: "`json.loads(raw)[\"choices\"][0][\"message\"][\"content\"].strip()`",
    starter: py`
      import json

      SYSTEM = "You are a friendly tutor. Answer in 2 short sentences."
      SAMPLE_REPLY = ${SAMPLE_REPLY}


      def build_request(question):
          # TODO: return {"model": ..., "messages": [system, user], "stream": False}
          return {}


      def get_answer(raw):
          # TODO: parse the JSON text and return the answer, stripped
          return raw


      print(build_request("What is MLOps?"))
      print(get_answer(SAMPLE_REPLY))
    `,
    check: py`
      _req = build_request("What is RAG?")
      assert _req.get("model") == "llama3.2", "Set the model to 'llama3.2'."
      assert _req.get("stream") is False, "Set stream to False so the whole answer comes back at once."
      assert _req.get("messages") == [
          {"role": "system", "content": SYSTEM},
          {"role": "user", "content": "What is RAG?"},
      ], "messages should be the system message (SYSTEM), then the user's question."
      assert get_answer(SAMPLE_REPLY) == "MLOps is how teams ship ML models to production and keep them working.", "get_answer should return choices[0].message.content without the extra spaces."
      _other = '{"choices": [{"message": {"role": "assistant", "content": "\\nHi there\\n"}}]}'
      assert get_answer(_other) == "Hi there", "get_answer should work for any reply, and strip new lines too."
    `,
    solution: py`
      import json

      SYSTEM = "You are a friendly tutor. Answer in 2 short sentences."
      SAMPLE_REPLY = ${SAMPLE_REPLY}


      def build_request(question):
          return {
              "model": "llama3.2",
              "messages": [
                  {"role": "system", "content": SYSTEM},
                  {"role": "user", "content": question},
              ],
              "stream": False,
          }


      def get_answer(raw):
          data = json.loads(raw)
          return data["choices"][0]["message"]["content"].strip()


      print(build_request("What is MLOps?"))
      print(get_answer(SAMPLE_REPLY))
    `,
  },
  laptop: {
    intro:
      "Now the real thing. This takes about 15 minutes, most of it waiting for the model to download. Everything is free and stays on your computer.",
    steps: [
      {
        text: "Download **Ollama** from [ollama.com](https://ollama.com) and install it. It works on Windows, Mac and Linux.",
      },
      {
        text: "Open a terminal and download a small model (about 2 GB, one time only). On an older laptop with little memory, use `llama3.2:1b` instead, and change `MODEL` in the file to match.",
        command: "ollama pull llama3.2",
      },
      {
        text: "Check that the model answers in the terminal:",
        command: 'ollama run llama3.2 "Say hi in five words"',
      },
      {
        text: "Install Python from [python.org](https://www.python.org/downloads/) if you have not yet (on Windows, tick **Add python.exe to PATH**). Make a folder, save the file below into it with the Download button, and open a terminal in that folder. On Mac and Linux, type `python3` instead of `python`.",
      },
    ],
    files: [{ name: "first_ai_call.py", content: FIRST_AI_CALL_FILE }],
    run: "python first_ai_call.py",
    expected: py`
      MLOps is the practice of taking machine learning models from a notebook into
      production and keeping them reliable. It covers deployment, monitoring and retraining.

      (Your answer will be worded differently. AI models rarely say the same thing twice.)
    `,
  },
};

// ---------------------------------------------------------------------------
// Project 1 · Review Sentiment Checker (Module 1)
// ---------------------------------------------------------------------------

const SENTIMENT_SOLUTION = py`
  positive_words = ["good", "great", "love", "loved", "excellent", "helpful", "clear"]
  negative_words = ["bad", "boring", "confusing", "slow", "hate", "poor", "waste"]

  reviews = [
      "Great course, the examples were clear and helpful!",
      "Too slow and confusing. A waste of time.",
      "The videos are long.",
      "Loved the projects but the audio was bad.",
      "Excellent trainer, good notes, I love it",
  ]

  labels = []
  summary = {"positive": 0, "negative": 0, "neutral": 0}

  for review in reviews:
      clean = review.lower().replace(",", " ").replace(".", " ").replace("!", " ")
      words = clean.split()

      good = 0
      bad = 0
      for word in words:
          if word in positive_words:
              good += 1
          elif word in negative_words:
              bad += 1

      if good > bad:
          label = "positive"
      elif bad > good:
          label = "negative"
      else:
          label = "neutral"

      labels.append(label)
      summary[label] += 1
      print(f"{label:>8} | {review}")

  print()
  print("Summary:", summary)
`;

const PROJECT_SENTIMENT: PythonLesson = {
  slug: "project-sentiment-checker",
  kind: "project",
  title: "Project: Review Sentiment Checker",
  moduleId: "foundations",
  level: "beginner",
  minutes: 45,
  summary:
    "Your first project. Label product reviews as positive, negative or neutral using only strings, lists, dicts and loops, then put it on GitHub.",
  whyForAi:
    "Sentiment analysis is a classic AI task. Build the simple rule-based version first, and the machine learning version in Module 3 will make sense.",
  packages: [],
  sections: [
    {
      heading: "What you will build",
      body: `A program that reads five course reviews and prints a label for each, plus a summary:

- **positive** when a review has more good words than bad words
- **negative** when it has more bad words
- **neutral** when they are equal

You only need Module 1: strings, lists, dicts, \`for\` and \`if\`. Build it in the editor below, then run it on your laptop and publish it on GitHub.`,
    },
    {
      heading: "Clean each review",
      basicTip: "Lowercase, remove punctuation, split into words.",
      basicCode: py`
        review = "Great course, loved it!"
        clean = review.lower().replace(",", " ").replace("!", " ")
        words = clean.split()
        print(words)
      `,
      body: `Computers compare text exactly, so \`"Great"\` and \`"great"\` are different words. Lowercase everything first.

Punctuation sticks to words (\`"course,"\`), so replace \`,\` \`.\` and \`!\` with spaces before you \`split()\`.`,
    },
    {
      heading: "Count good and bad words",
      basicTip: "Check each word against a list with in.",
      basicCode: py`
        positive_words = ["good", "great", "loved"]
        words = ["great", "course", "loved", "it"]
        good = 0
        for word in words:
            if word in positive_words:
                good += 1
        print("good words:", good)
      `,
      body: `Keep a counter for good words and one for bad words. Loop over the words and add 1 when a word is in the matching list.`,
    },
    {
      heading: "Decide the label",
      basicTip: "Compare the two counts.",
      basicCode: py`
        good, bad = 1, 1
        if good > bad:
            label = "positive"
        elif bad > good:
            label = "negative"
        else:
            label = "neutral"
        print(label)
      `,
      body: `Compare the counts with \`if\`, \`elif\` and \`else\`. A review with one good and one bad word, like "Loved the projects but the audio was bad", is **neutral**.

Then add the label to the \`labels\` list and count it in the \`summary\` dict with \`summary[label] += 1\`.`,
    },
  ],
  examples: [],
  tryIt: {
    title: "Warm up: count words in one review",
    hint: "Change the review text and watch the counts change.",
    starter: py`
      positive_words = ["good", "great", "love", "helpful"]
      negative_words = ["bad", "slow", "boring"]
      review = "Great notes but the videos are slow"
      words = review.lower().split()
      print("good:", sum(1 for w in words if w in positive_words))
      print("bad:", sum(1 for w in words if w in negative_words))
    `,
  },
  takeaways: [
    "Clean text before you compare it: lowercase and remove punctuation.",
    "Lists, dicts and loops are enough to build a useful first program.",
    "Rules break on sentences like 'not good'. That is why AI teams train models.",
  ],
  exercise: {
    task: "Fill in the loop. For each review, put its label in `labels` (in the same order as `reviews`) and add 1 to the matching count in `summary`. Print each label next to its review.",
    hint: "Inside the loop: clean the text, count `good` and `bad`, pick the label with `if / elif / else`, then `labels.append(label)` and `summary[label] += 1`.",
    starter: py`
      positive_words = ["good", "great", "love", "loved", "excellent", "helpful", "clear"]
      negative_words = ["bad", "boring", "confusing", "slow", "hate", "poor", "waste"]

      reviews = [
          "Great course, the examples were clear and helpful!",
          "Too slow and confusing. A waste of time.",
          "The videos are long.",
          "Loved the projects but the audio was bad.",
          "Excellent trainer, good notes, I love it",
      ]

      labels = []
      summary = {"positive": 0, "negative": 0, "neutral": 0}

      for review in reviews:
          # TODO 1: lowercase the review, replace , . ! with spaces, then split into words
          # TODO 2: count how many words are in positive_words and in negative_words
          # TODO 3: pick the label, append it to labels, add 1 to summary[label]
          # TODO 4: print the label and the review
          pass

      print()
      print("Summary:", summary)
    `,
    check: py`
      assert labels == ["positive", "negative", "neutral", "neutral", "positive"], f"labels should be ['positive', 'negative', 'neutral', 'neutral', 'positive'], you have {labels}. Tip: 'Loved ... but ... bad' has one good and one bad word, so it is neutral."
      assert summary == {"positive": 2, "negative": 1, "neutral": 2}, f"summary should be {{'positive': 2, 'negative': 1, 'neutral': 2}}, you have {summary}"
      assert "positive" in printed and "Great course" in printed, "Print each label next to its review."
    `,
    solution: SENTIMENT_SOLUTION,
  },
  laptop: {
    intro:
      "Running code on your own computer and publishing it on GitHub is what employers expect. Do it once now, and every later project is easy.",
    steps: [
      {
        text: "Install Python from [python.org](https://www.python.org/downloads/). On Windows, tick **Add python.exe to PATH** in the installer. Check it in a terminal (Mac and Linux: `python3 --version`):",
        command: "python --version",
      },
      {
        text: "Install [VS Code](https://code.visualstudio.com) (free) and its Python extension. Make a folder called `sentiment-checker` and open it in VS Code.",
      },
      {
        text: "Save the three files below into that folder (use the Download buttons). Edit the **What I learned** part of the README in your own words.",
      },
      {
        text: "Open the terminal in VS Code with **Terminal > New Terminal**.",
      },
    ],
    files: [
      { name: "sentiment_checker.py", content: `"""Review Sentiment Checker: label reviews as positive, negative or neutral."""\n\n${SENTIMENT_SOLUTION}\n` },
      {
        name: "README.md",
        content: py`
          # Review Sentiment Checker

          A small Python program that labels product reviews as positive, negative or neutral
          by counting positive and negative words.

          ## How to run

              python sentiment_checker.py

          ## Example output

              positive | Great course, the examples were clear and helpful!
              negative | Too slow and confusing. A waste of time.
               neutral | The videos are long.

          ## What I learned

          - Cleaning text with lower(), replace() and split()
          - Using lists, dictionaries, loops and if / elif / else together
          - Why simple word rules miss sentences like "not good", and why ML models help

          ## Next ideas

          - Read the reviews from a text file
          - Handle "not good" and "not bad"
        `,
      },
      { name: ".gitignore", content: GITIGNORE },
    ],
    run: "python sentiment_checker.py",
    expected: py`
      positive | Great course, the examples were clear and helpful!
      negative | Too slow and confusing. A waste of time.
       neutral | The videos are long.
       neutral | Loved the projects but the audio was bad.
      positive | Excellent trainer, good notes, I love it

      Summary: {'positive': 2, 'negative': 1, 'neutral': 2}
    `,
    repo: "sentiment-checker",
  },
};

// ---------------------------------------------------------------------------
// Project 2 · ML Experiment Tracker (Module 2)
// ---------------------------------------------------------------------------

const TRACKER_CLASS = py`
  class ExperimentTracker:
      def __init__(self, path="runs.json"):
          self.path = Path(path)
          if self.path.exists():
              self.runs = json.loads(self.path.read_text(encoding="utf-8"))
          else:
              self.runs = []

      def log_run(self, name, params, metrics):
          if not metrics:
              raise ValueError("metrics must not be empty")
          for key, value in metrics.items():
              if not isinstance(value, (int, float)):
                  raise ValueError(f"metric {key} must be a number, got {value!r}")
          self.runs.append({"name": name, "params": params, "metrics": metrics})
          self.path.write_text(json.dumps(self.runs, indent=2), encoding="utf-8")

      def best_run(self, metric):
          candidates = [run for run in self.runs if metric in run["metrics"]]
          if not candidates:
              return None
          return max(candidates, key=lambda run: run["metrics"][metric])
`;

const TRACKER_FILE = py`
  """ML Experiment Tracker: a mini MLflow that saves training runs to a JSON file."""
  import json
  from pathlib import Path


  ${TRACKER_CLASS}

      def leaderboard(self, metric):
          ranked = sorted(
              (run for run in self.runs if metric in run["metrics"]),
              key=lambda run: run["metrics"][metric],
              reverse=True,
          )
          for rank, run in enumerate(ranked, start=1):
              print(f"{rank}. {run['name']:<12} {metric}={run['metrics'][metric]:.3f}  params={run['params']}")


  def main():
      tracker = ExperimentTracker("runs.json")
      tracker.log_run("baseline", {"lr": 0.01, "epochs": 5}, {"accuracy": 0.81})
      tracker.log_run("bigger-lr", {"lr": 0.1, "epochs": 5}, {"accuracy": 0.86})
      tracker.log_run("more-epochs", {"lr": 0.01, "epochs": 20}, {"accuracy": 0.84})

      print(f"{len(tracker.runs)} runs saved in {tracker.path}")
      tracker.leaderboard("accuracy")
      print("Best run:", tracker.best_run("accuracy")["name"])


  if __name__ == "__main__":
      main()
`;

const TRACKER_DEMO = py`
  Path("runs.json").unlink(missing_ok=True)  # start fresh on every run here
  tracker = ExperimentTracker("runs.json")
  tracker.log_run("baseline", {"lr": 0.01, "epochs": 5}, {"accuracy": 0.81})
  tracker.log_run("bigger-lr", {"lr": 0.1, "epochs": 5}, {"accuracy": 0.86})
  tracker.log_run("more-epochs", {"lr": 0.01, "epochs": 20}, {"accuracy": 0.84})
  best = tracker.best_run("accuracy")
  print(len(tracker.runs), "runs logged")
  print("best run:", best["name"] if best else None)
`;

const PROJECT_TRACKER: PythonLesson = {
  slug: "project-experiment-tracker",
  kind: "project",
  title: "Project: ML Experiment Tracker",
  moduleId: "core-language",
  level: "intermediate",
  minutes: 60,
  summary:
    "Build a mini MLflow: save every training run's settings and scores to a JSON file, then find the best run. Uses classes, files, JSON and errors.",
  whyForAi:
    "Every ML team tracks experiments. MLflow and Weights & Biases do this at scale, and interviewers like it when you can explain how it works inside.",
  packages: [],
  sections: [
    {
      heading: "What you will build",
      body: `An \`ExperimentTracker\` class that an ML engineer could really use:

- \`log_run(name, params, metrics)\` saves one training run to \`runs.json\`
- \`best_run(metric)\` finds the run with the highest score
- Bad input raises a clear \`ValueError\` instead of saving junk

Because the runs live in a file, they survive after the program ends. Run it twice on your laptop and the history grows, just like a real tracker.`,
    },
    {
      heading: "A run is a dict",
      basicTip: "Settings in params, results in metrics.",
      basicCode: py`
        run = {
            "name": "baseline",
            "params": {"lr": 0.01, "epochs": 5},
            "metrics": {"accuracy": 0.81},
        }
        print(run["metrics"]["accuracy"])
      `,
      body: `Keep what you **chose** (\`params\`, like the learning rate) apart from what you **measured** (\`metrics\`, like accuracy). That split is exactly how MLflow stores runs.`,
    },
    {
      heading: "Save after every run",
      basicTip: "json.dumps turns a list of dicts into text.",
      basicCode: py`
        import json
        from pathlib import Path
        runs = [{"name": "baseline", "metrics": {"accuracy": 0.81}}]
        Path("runs.json").write_text(json.dumps(runs, indent=2))
        print(json.loads(Path("runs.json").read_text())[0]["name"])
      `,
      body: `Write the whole list to the file each time you log a run. When the program starts again, \`__init__\` reads the file back, so nothing is lost.`,
    },
    {
      heading: "Find the best run",
      basicTip: "max() with a key picks the highest score.",
      basicCode: py`
        runs = [
            {"name": "a", "metrics": {"accuracy": 0.81}},
            {"name": "b", "metrics": {"accuracy": 0.86}},
        ]
        best = max(runs, key=lambda run: run["metrics"]["accuracy"])
        print(best["name"])
      `,
      body: `Skip runs that do not have the metric you asked for, and return \`None\` if no run has it. Code that other people call should never crash on a fair question.`,
    },
  ],
  examples: [],
  tryIt: {
    title: "Warm up: log runs in a list",
    hint: "Add a fourth run with a higher accuracy and run it again.",
    starter: py`
      runs = []
      runs.append({"name": "baseline", "params": {"lr": 0.01}, "metrics": {"accuracy": 0.81}})
      runs.append({"name": "bigger-lr", "params": {"lr": 0.1}, "metrics": {"accuracy": 0.86}})
      best = max(runs, key=lambda run: run["metrics"]["accuracy"])
      print(len(runs), "runs, best:", best["name"])
    `,
  },
  takeaways: [
    "A class keeps the data (runs) and the actions (log, best) together.",
    "Saving to JSON makes data survive after the program stops.",
    "Raise clear errors on bad input instead of saving junk.",
  ],
  exercise: {
    task: "Finish `log_run` and `best_run`. `log_run` raises `ValueError` when `metrics` is empty, appends the run as a dict with `name`, `params` and `metrics`, and saves all runs to the JSON file. `best_run(metric)` returns the run with the highest value for that metric, skips runs without it, and returns `None` when no run has it.",
    hint: "Save with `self.path.write_text(json.dumps(self.runs))`. For `best_run`, first build `candidates = [run for run in self.runs if metric in run[\"metrics\"]]`.",
    starter: py`
      import json
      from pathlib import Path


      class ExperimentTracker:
          def __init__(self, path="runs.json"):
              self.path = Path(path)
              if self.path.exists():
                  self.runs = json.loads(self.path.read_text(encoding="utf-8"))
              else:
                  self.runs = []

          def log_run(self, name, params, metrics):
              # TODO 1: raise ValueError if metrics is empty
              # TODO 2: append {"name": name, "params": params, "metrics": metrics} to self.runs
              # TODO 3: save self.runs to self.path as JSON
              pass

          def best_run(self, metric):
              # TODO 4: return the run with the highest value for this metric.
              #         Skip runs without it. Return None if no run has it.
              return None


      ${TRACKER_DEMO}
    `,
    check: py`
      from pathlib import Path as _P
      _p = _P("check_runs.json")
      _p.unlink(missing_ok=True)
      _t = ExperimentTracker(str(_p))
      _t.log_run("a", {"lr": 0.1}, {"accuracy": 0.7, "f1": 0.6})
      _t.log_run("b", {"lr": 0.01}, {"accuracy": 0.9})
      _t.log_run("c", {"lr": 0.001}, {"f1": 0.8})
      assert len(_t.runs) == 3, "log_run should append one run to self.runs each time."
      assert _t.runs[0] == {"name": "a", "params": {"lr": 0.1}, "metrics": {"accuracy": 0.7, "f1": 0.6}}, "Each run should be a dict with name, params and metrics."
      assert _p.exists(), "log_run should save the runs to the JSON file."
      assert len(ExperimentTracker(str(_p)).runs) == 3, "A new tracker on the same file should load the 3 saved runs. Save after every log_run."
      assert (_t.best_run("accuracy") or {}).get("name") == "b", "best_run('accuracy') should return run b (0.9)."
      assert (_t.best_run("f1") or {}).get("name") == "c", "best_run('f1') should return run c, skipping runs without f1."
      assert _t.best_run("loss") is None, "best_run should return None when no run has that metric."
      try:
          _t.log_run("empty", {}, {})
      except ValueError:
          pass
      else:
          raise AssertionError("log_run should raise ValueError when metrics is empty.")
      _p.unlink(missing_ok=True)
    `,
    solution: py`
      import json
      from pathlib import Path


      ${TRACKER_CLASS}


      ${TRACKER_DEMO}
    `,
  },
  laptop: {
    intro: "Run the full tracker on your laptop. It only uses the standard library, so there is nothing to install.",
    steps: [
      {
        text: "Make a folder called `experiment-tracker`, save the files below into it, and open a terminal there. On Mac and Linux, type `python3` instead of `python`.",
      },
      {
        text: "Run it twice. The second time it prints 6 runs, because the first 3 were saved in `runs.json`. Open that file to see your data.",
      },
    ],
    files: [
      { name: "tracker.py", content: TRACKER_FILE },
      {
        name: "README.md",
        content: py`
          # ML Experiment Tracker

          A mini MLflow in plain Python. It logs each training run's parameters and metrics
          to a JSON file and finds the best run.

          ## How to run

              python tracker.py

          ## Example output

              3 runs saved in runs.json
              1. bigger-lr    accuracy=0.860  params={'lr': 0.1, 'epochs': 5}
              Best run: bigger-lr

          ## What I learned

          - Designing a small class with clear methods
          - Saving and loading data with JSON so it survives restarts
          - Validating input and raising clear errors

          ## Next ideas

          - Add a delete_run(name) method
          - Plot accuracy per run with matplotlib
          - Compare this design with how MLflow stores runs
        `,
      },
      { name: ".gitignore", content: `${GITIGNORE}\nruns.json\n` },
    ],
    run: "python tracker.py",
    expected: py`
      3 runs saved in runs.json
      1. bigger-lr    accuracy=0.860  params={'lr': 0.1, 'epochs': 5}
      2. more-epochs  accuracy=0.840  params={'lr': 0.01, 'epochs': 20}
      3. baseline     accuracy=0.810  params={'lr': 0.01, 'epochs': 5}
      Best run: bigger-lr
    `,
    repo: "experiment-tracker",
  },
};

// ---------------------------------------------------------------------------
// Project 3 · Spam Message Classifier (Module 3)
// ---------------------------------------------------------------------------

const SPAM_MESSAGES: [string, string][] = [
  ["spam", "WIN a FREE iPhone today! Click the link to claim your prize"],
  ["spam", "Congratulations! You have won a 1000 rupees gift card. Claim now"],
  ["spam", "URGENT: your account is blocked. Click here to verify your bank details"],
  ["spam", "You won a cash prize of 50000. Call now to claim"],
  ["spam", "Limited offer! Get 90% off, buy now, click the link"],
  ["spam", "FREE recharge for you. Reply YES to claim your free gift"],
  ["spam", "Earn 5000 per day from home. No experience needed. Click now"],
  ["spam", "Your loan is approved instantly. Click the link to get cash today"],
  ["spam", "Claim your free lottery reward now, only today"],
  ["spam", "Exclusive deal just for you! Win big prizes, click here"],
  ["spam", "Your KYC is pending. Update now or your account will be closed"],
  ["spam", "Get rich fast with this crypto offer. Join now and win"],
  ["spam", "You have been selected for a free holiday. Call now to claim"],
  ["spam", "Final notice: claim your cash reward before midnight"],
  ["spam", "Double your money in 7 days. Click the link to invest now"],
  ["spam", "Free entry to win a new car. Text WIN to claim"],
  ["spam", "Your number won the lucky draw! Claim your prize money now"],
  ["spam", "Act now! Cheap loans with zero documents, click here"],
  ["spam", "Get a free gift voucher worth 5000. Click to claim today"],
  ["spam", "Winner! You are chosen for a cash bonus, reply now"],
  ["ham", "Can we move the team meeting to 4 pm tomorrow?"],
  ["ham", "Please review my pull request when you get time"],
  ["ham", "The model training finished, accuracy is 91 percent"],
  ["ham", "Are you coming for lunch today?"],
  ["ham", "I pushed the fix for the Docker build, please check"],
  ["ham", "Let us meet at the library after class"],
  ["ham", "Mom asked if you reached home safely"],
  ["ham", "The MLOps class starts at 7 pm on Saturday"],
  ["ham", "Can you send me the notes from the last lecture?"],
  ["ham", "Happy birthday! Have a great day"],
  ["ham", "The deployment to staging went fine, no errors"],
  ["ham", "Thanks for the help with the interview prep"],
  ["ham", "I am at home now, call me when you are free"],
  ["ham", "Did you finish the assignment today?"],
  ["ham", "Here is the link to the class recording"],
  ["ham", "Thank you for coming today, see you next week"],
  ["ham", "Can you check the build logs now?"],
  ["ham", "The interview is today at 3 pm, all the best"],
  ["ham", "Dinner is ready, come home soon"],
  ["ham", "Your order of notebooks will arrive tomorrow"],
];

const SPAM_DATA_PY = [
  "data = pd.DataFrame({",
  "    \"text\": [",
  ...SPAM_MESSAGES.map(([, text]) => `        ${JSON.stringify(text)},`),
  "    ],",
  `    "label": ${JSON.stringify(SPAM_MESSAGES.map(([label]) => label))},`,
  "})",
].join("\n");

const SPAM_CSV = [
  "label,text",
  ...SPAM_MESSAGES.map(([label, text]) => `${label},"${text.replace(/"/g, '""')}"`),
  "",
].join("\n");

const SPAM_IMPORTS = py`
  import pandas as pd
  from sklearn.feature_extraction.text import TfidfVectorizer
  from sklearn.metrics import accuracy_score
  from sklearn.model_selection import train_test_split
  from sklearn.naive_bayes import MultinomialNB
  from sklearn.pipeline import Pipeline
`;

const SPAM_SPLIT = py`
  X_train, X_test, y_train, y_test = train_test_split(
      data["text"], data["label"], test_size=0.25, random_state=42, stratify=data["label"]
  )
`;

const SPAM_TAIL = py`
  print("accuracy:", accuracy)
  print(predict_label("WIN a FREE iPhone now! Click this link to claim your prize"))
  print(predict_label("Can we move the team meeting to 4 pm?"))
`;

const SPAM_FILE = py`
  """Spam Message Classifier: TF-IDF features + Naive Bayes, trained with scikit-learn."""
  import joblib
  import pandas as pd
  from sklearn.feature_extraction.text import TfidfVectorizer
  from sklearn.metrics import accuracy_score, classification_report
  from sklearn.model_selection import train_test_split
  from sklearn.naive_bayes import MultinomialNB
  from sklearn.pipeline import Pipeline


  def main():
      data = pd.read_csv("messages.csv")
      print(f"Loaded {len(data)} messages:", data["label"].value_counts().to_dict())

      X_train, X_test, y_train, y_test = train_test_split(
          data["text"], data["label"], test_size=0.25, random_state=42, stratify=data["label"]
      )

      model = Pipeline([
          ("tfidf", TfidfVectorizer()),
          ("nb", MultinomialNB()),
      ])
      model.fit(X_train, y_train)

      predictions = model.predict(X_test)
      print("Accuracy:", round(accuracy_score(y_test, predictions), 3))
      print(classification_report(y_test, predictions, zero_division=0))

      joblib.dump(model, "spam_model.joblib")
      print("Saved the trained model to spam_model.joblib")

      for message in [
          "WIN a FREE iPhone now! Click this link to claim your prize",
          "Can we move the team meeting to 4 pm?",
      ]:
          print(f"{model.predict([message])[0]:>4} | {message}")


  if __name__ == "__main__":
      main()
`;

const PROJECT_SPAM: PythonLesson = {
  slug: "project-spam-classifier",
  kind: "project",
  title: "Project: Spam Message Classifier",
  moduleId: "data-ml",
  level: "intermediate",
  minutes: 60,
  summary:
    "Train a real machine learning model with pandas and scikit-learn that flags spam messages, measure its accuracy, and save it to a file like an MLOps pipeline.",
  whyForAi:
    "This is the full ML loop interviewers ask about: data, features, train/test split, model, metric, and a saved model file that can be deployed.",
  packages: ["numpy", "pandas", "scikit-learn"],
  sections: [
    {
      heading: "What you will build",
      body: `A model that reads a message and says **spam** or **ham** (a normal message). Unlike the word rules in the Module 1 project, nobody writes the rules here: the model **learns** which words matter from labelled examples.

You will:

- load 40 labelled messages into a pandas DataFrame
- turn text into numbers with **TF-IDF**
- train a **Naive Bayes** classifier inside a \`Pipeline\`
- check accuracy on messages the model never saw
- on your laptop, save the trained model to a file`,
    },
    {
      heading: "Text becomes numbers",
      basicTip: "TF-IDF gives each word a weight per message.",
      basicCode: py`
        from sklearn.feature_extraction.text import TfidfVectorizer
        vec = TfidfVectorizer()
        X = vec.fit_transform(["free prize now", "team meeting now"])
        print(vec.get_feature_names_out())
        print(X.shape)
      `,
      body: `Models only understand numbers. \`TfidfVectorizer\` gives every word a column, and each message a row of weights. Words that appear in few messages (like "prize") get more weight than common ones (like "now").`,
    },
    {
      heading: "Train and test",
      basicTip: "Hold back some messages to test honestly.",
      basicCode: py`
        from sklearn.model_selection import train_test_split
        texts = ["a", "b", "c", "d", "e", "f", "g", "h"]
        labels = [0, 0, 0, 0, 1, 1, 1, 1]
        X_tr, X_te, y_tr, y_te = train_test_split(texts, labels, test_size=0.25, random_state=42, stratify=labels)
        print(len(X_tr), "train,", len(X_te), "test")
      `,
      body: `Never test a model on the data it learned from: it would look better than it is. \`train_test_split\` keeps 25% aside. \`stratify\` keeps the same share of spam in both parts.`,
    },
    {
      heading: "One pipeline, one object",
      basicTip: "A Pipeline chains the steps so fit and predict run them all.",
      basicCode: py`
        from sklearn.pipeline import Pipeline
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.naive_bayes import MultinomialNB
        model = Pipeline([("tfidf", TfidfVectorizer()), ("nb", MultinomialNB())])
        model.fit(["free prize", "free cash now", "team lunch", "class notes"], ["spam", "spam", "ham", "ham"])
        print(model.predict(["free cash prize"]))
      `,
      body: `A \`Pipeline\` keeps the text step and the model together. That matters in production: you save **one** file, and new messages always go through the same TF-IDF step the model was trained with.`,
    },
  ],
  examples: [],
  tryIt: {
    title: "Warm up: a two-line spam model",
    hint: "Add your own training messages and test a new one.",
    starter: py`
      from sklearn.pipeline import Pipeline
      from sklearn.feature_extraction.text import TfidfVectorizer
      from sklearn.naive_bayes import MultinomialNB

      texts = ["win a free prize", "claim cash now", "lunch at 1?", "notes from class"]
      labels = ["spam", "spam", "ham", "ham"]
      model = Pipeline([("tfidf", TfidfVectorizer()), ("nb", MultinomialNB())]).fit(texts, labels)
      print(model.predict(["free cash prize", "see you in class"]))
    `,
  },
  takeaways: [
    "TF-IDF turns text into numbers a model can learn from.",
    "Always measure on a test split the model never saw.",
    "A Pipeline plus joblib.dump gives you one model file you can deploy.",
  ],
  exercise: {
    task: "Build `model` as a `Pipeline` of `TfidfVectorizer` then `MultinomialNB`, fit it on the training split, set `accuracy` with `accuracy_score` on the test split, and finish `predict_label(message)` so it returns `\"spam\"` or `\"ham\"` from the model.",
    hint: "`model.fit(X_train, y_train)`, then `accuracy_score(y_test, model.predict(X_test))`. Inside `predict_label`: `return model.predict([message])[0]`.",
    starter: `${SPAM_IMPORTS}

${SPAM_DATA_PY}
${SPAM_SPLIT}

model = None    # TODO 1: Pipeline of TfidfVectorizer, then MultinomialNB
# TODO 2: fit the model on X_train, y_train
accuracy = 0.0  # TODO 3: accuracy_score on the test split


def predict_label(message):
    # TODO 4: use the model to return "spam" or "ham"
    return "ham"


${SPAM_TAIL}`,
    check: py`
      from sklearn.pipeline import Pipeline as _Pipe
      assert isinstance(model, _Pipe), "model should be a Pipeline with TfidfVectorizer and MultinomialNB."
      assert hasattr(model, "classes_"), "Call model.fit(X_train, y_train) before predicting."
      from sklearn.metrics import accuracy_score as _acc
      assert abs(accuracy - _acc(y_test, model.predict(X_test))) < 1e-9, "accuracy should be accuracy_score(y_test, model.predict(X_test)), measured on the test split."
      assert accuracy >= 0.7, f"accuracy should reach at least 0.7 with TF-IDF and Naive Bayes, you have {accuracy}."
      assert predict_label("WIN a FREE iPhone now! Click this link to claim your prize") == "spam", "A message like 'WIN a FREE iPhone now! Click...' should be 'spam'."
      assert predict_label("Can we move the team meeting to 4 pm?") == "ham", "A normal message about a meeting should be 'ham'."
      assert predict_label("Congratulations, you won a cash prize. Call now") == "spam", "predict_label should use the trained model, not fixed answers."
    `,
    solution: `${SPAM_IMPORTS}

${SPAM_DATA_PY}
${SPAM_SPLIT}

model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("nb", MultinomialNB()),
])
model.fit(X_train, y_train)
accuracy = accuracy_score(y_test, model.predict(X_test))


def predict_label(message):
    return model.predict([message])[0]


${SPAM_TAIL}`,
  },
  laptop: {
    intro:
      "On your laptop the data lives in a CSV file, like real projects, and the trained model is saved to `spam_model.joblib` so another program (an API, for example) can load it.",
    steps: [
      {
        text: "Make a folder called `spam-classifier`, save the files below into it, and open a terminal there.",
      },
      ...VENV_STEPS,
      {
        text: "Install the packages listed in `requirements.txt`:",
        command: "pip install -r requirements.txt",
      },
    ],
    files: [
      { name: "spam_classifier.py", content: SPAM_FILE },
      { name: "messages.csv", content: SPAM_CSV },
      { name: "requirements.txt", content: "pandas>=2.2\nscikit-learn>=1.5\n" },
      {
        name: "README.md",
        content: py`
          # Spam Message Classifier

          A machine learning model that labels messages as spam or ham, built with
          pandas and scikit-learn (TF-IDF + Multinomial Naive Bayes).

          ## How to run

              python -m venv .venv
              pip install -r requirements.txt
              python spam_classifier.py

          ## Results

          About 80% accuracy on 10 held-out test messages (it was trained on only 30),
          and the trained model is saved to spam_model.joblib.

          ## What I learned

          - Turning text into features with TF-IDF
          - Train/test split and why the test set must stay unseen
          - Saving a whole pipeline with joblib so it can be deployed

          ## Next ideas

          - Train on the public SMS Spam Collection dataset (about 5,500 messages)
          - Serve the saved model with FastAPI
        `,
      },
      { name: ".gitignore", content: `${GITIGNORE}\n*.joblib\n` },
    ],
    run: "python spam_classifier.py",
    expected: py`
      Loaded 40 messages: {'spam': 20, 'ham': 20}
      Accuracy: 0.8
      (a precision / recall table per class)
      Saved the trained model to spam_model.joblib
      spam | WIN a FREE iPhone now! Click this link to claim your prize
       ham | Can we move the team meeting to 4 pm?
    `,
    repo: "spam-classifier",
  },
};

// ---------------------------------------------------------------------------
// Project 4 · Ask My Notes, a mini RAG bot (Module 4)
// ---------------------------------------------------------------------------

const NOTES_TEXT = py`
  MLOps is the practice of deploying, monitoring and retraining machine learning models in production.

  Docker packages an application with its dependencies so it runs the same on every machine.

  Kubernetes runs and scales containers across many servers.

  RAG means retrieval augmented generation. It finds relevant notes and adds them to the prompt before the model answers.

  A vector database stores embeddings so similar text can be found quickly.
`;

const RAG_HELPERS = py`
  STOP_WORDS = {
      "a", "an", "the", "is", "it", "and", "so", "on", "of", "to", "what", "how",
      "does", "do", "why", "in", "with", "can", "be", "before", "i", "me", "my",
  }


  def words(text):
      cleaned = text.lower()
      for mark in ".,?!:;()":
          cleaned = cleaned.replace(mark, " ")
      return {word for word in cleaned.split() if word not in STOP_WORDS}
`;

const RAG_FUNCTIONS = py`
  def split_into_chunks(text):
      return [part.strip() for part in text.split("\n\n") if part.strip()]


  def retrieve(question, chunks, k=2):
      question_words = words(question)
      scored = []
      for chunk in chunks:
          score = len(question_words & words(chunk))
          if score > 0:
              scored.append((score, chunk))
      scored.sort(key=lambda pair: pair[0], reverse=True)
      return [chunk for _, chunk in scored[:k]]


  def build_prompt(question, hits):
      context = "\n".join(f"- {hit}" for hit in hits)
      return (
          "Answer the question using only the notes below. "
          "If the notes do not cover it, say \"I don't know\".\n\n"
          f"Notes:\n{context}\n\nQuestion: {question}"
      )
`;

const RAG_DEMO = py`
  chunks = split_into_chunks(NOTES)
  question = "What does Docker do?"
  hits = retrieve(question, chunks)
  print(build_prompt(question, hits))
`;

const NOTES_PY = `NOTES = """${NOTES_TEXT}"""`;

const ASK_NOTES_FILE = py`
  """Ask My Notes: a tiny RAG bot over your own notes, answered by a free local model."""
  import json
  import urllib.error
  import urllib.request
  from pathlib import Path

  OLLAMA_URL = "http://localhost:11434/v1/chat/completions"
  MODEL = "llama3.2"

  ${RAG_HELPERS}


  ${RAG_FUNCTIONS}


  def ask_model(prompt):
      body = json.dumps({
          "model": MODEL,
          "messages": [{"role": "user", "content": prompt}],
          "temperature": 0,
          "stream": False,
      }).encode("utf-8")
      request = urllib.request.Request(OLLAMA_URL, data=body, headers={"Content-Type": "application/json"})
      with urllib.request.urlopen(request, timeout=120) as response:
          data = json.loads(response.read().decode("utf-8"))
      return data["choices"][0]["message"]["content"].strip()


  def main():
      chunks = split_into_chunks(Path("notes.txt").read_text(encoding="utf-8"))
      print(f"Loaded {len(chunks)} notes. Ask a question, or press Enter on an empty line to quit.")
      while True:
          question = input("\nYou: ").strip()
          if not question:
              break
          hits = retrieve(question, chunks)
          if not hits:
              print("Bot: I don't know. None of your notes mention that.")
              continue
          try:
              answer = ask_model(build_prompt(question, hits))
          except urllib.error.HTTPError as err:
              print(f"Bot: Ollama answered with an error ({err.code}). Run: ollama pull {MODEL}")
              return
          except urllib.error.URLError:
              print("Bot: I could not reach Ollama. Open the Ollama app, then try again.")
              return
          print("Bot:", answer)
          print("Sources:", " | ".join(hit[:40] + "..." for hit in hits))


  if __name__ == "__main__":
      main()
`;

const PROJECT_ASK_NOTES: PythonLesson = {
  slug: "project-ask-my-notes",
  kind: "project",
  title: "Project: Ask My Notes (a mini RAG bot)",
  moduleId: "genai-production",
  level: "advanced",
  minutes: 75,
  summary:
    "Build a question-answering bot over your own notes: split them into chunks, find the relevant ones, build a grounded prompt, and get the answer from a free AI model on your laptop.",
  whyForAi:
    "RAG is the most common GenAI pattern in companies. Building it from scratch, without a framework, is the best way to explain it in an interview.",
  packages: [],
  sections: [
    {
      heading: "What you will build",
      body: `A chat bot that answers from **your** notes, not from whatever the model remembers:

1. **Chunk:** split the notes into paragraphs
2. **Retrieve:** find the paragraphs that share words with the question
3. **Augment:** put those paragraphs into the prompt as context
4. **Generate:** ask the model, on your laptop with Ollama (set up in the "Your First Real AI Call" lesson)

You build steps 1 to 3 here. Step 4 runs on your laptop.`,
    },
    {
      heading: "Chunk the notes",
      basicTip: "A blank line separates paragraphs.",
      basicCode: py`
        notes = "Docker packages apps.\n\nKubernetes runs containers."
        chunks = [part.strip() for part in notes.split("\n\n") if part.strip()]
        print(len(chunks), chunks)
      `,
      body: `Small chunks keep the prompt short and on topic. Real systems split by tokens with some overlap. Splitting on blank lines is enough for notes.`,
    },
    {
      heading: "Retrieve by shared words",
      basicTip: "Set intersection counts shared words.",
      basicCode: py`
        question = {"docker", "containers"}
        chunk = {"docker", "packages", "apps"}
        print(len(question & chunk), "shared word(s)")
      `,
      body: `Score each chunk by how many words it shares with the question, ignoring filler words like "what" and "the". Production systems use **embeddings** and a vector database instead, but the idea is the same: find the closest text first.`,
    },
    {
      heading: "Ground the prompt",
      basicTip: "Context first, question last, and a way out.",
      basicCode: py`
        hits = ["Docker packages an application with its dependencies."]
        context = "\n".join(f"- {hit}" for hit in hits)
        print(f"Notes:\n{context}\n\nQuestion: What does Docker do?")
      `,
      body: `Tell the model to answer **only** from the notes, and to say "I don't know" when the notes do not cover the question. That one line cuts made-up answers a lot.`,
    },
  ],
  examples: [],
  tryIt: {
    title: "Warm up: score chunks by shared words",
    hint: "Change the question and see which chunk wins.",
    starter: py`
      chunks = ["Docker packages apps with dependencies", "Kubernetes scales containers"]
      question = "how do I scale containers"
      for chunk in chunks:
          shared = set(question.lower().split()) & set(chunk.lower().split())
          print(len(shared), chunk)
    `,
  },
  takeaways: [
    "RAG is chunk, retrieve, augment, generate.",
    "Grounded prompts tell the model to use only the given notes.",
    "Return 'I don't know' when nothing relevant is found, instead of guessing.",
  ],
  exercise: {
    task: "Finish the three functions. `split_into_chunks(text)` splits on blank lines and returns the stripped, non-empty paragraphs. `retrieve(question, chunks, k=2)` scores each chunk with `len(words(question) & words(chunk))` and returns the top `k` chunks with a score above 0, best first. `build_prompt(question, hits)` returns a prompt that includes the hits as context, the question, and tells the model to say \"I don't know\" if the notes do not cover it.",
    hint: "Split with `text.split(\"\\n\\n\")`. Sort `(score, chunk)` pairs with `key=lambda pair: pair[0], reverse=True`. Build the prompt with an f-string.",
    starter: `${NOTES_PY}

${RAG_HELPERS}


def split_into_chunks(text):
    # TODO 1: split on blank lines, strip each chunk, drop empty ones
    return []


def retrieve(question, chunks, k=2):
    # TODO 2: score each chunk by len(words(question) & words(chunk))
    #         return the top k chunks with score > 0, best first
    return []


def build_prompt(question, hits):
    # TODO 3: include the hits as context and the question, and tell the
    #         model to say "I don't know" if the notes do not cover it
    return question


${RAG_DEMO}`,
    check: py`
      _chunks = split_into_chunks(NOTES)
      assert len(_chunks) == 5, f"split_into_chunks should return 5 chunks, one per paragraph. You have {len(_chunks)}."
      assert all(c and c == c.strip() for c in _chunks), "Strip spaces from each chunk and drop empty ones."
      _hits = retrieve("What does Docker do?", _chunks)
      assert _hits and _hits[0].startswith("Docker"), "For 'What does Docker do?' the Docker note should come first."
      assert retrieve("How do I bake bread?", _chunks) == [], "When nothing matches, retrieve should return an empty list."
      assert len(retrieve("models containers embeddings production prompt", _chunks, k=2)) == 2, "Return at most k chunks."
      _prompt = build_prompt("What does Docker do?", _hits)
      assert "What does Docker do?" in _prompt, "The prompt should include the question."
      assert _hits[0] in _prompt, "The prompt should include the retrieved notes as context."
      assert "don't know" in _prompt.lower() or "do not know" in _prompt.lower(), "Tell the model to say I don't know when the notes do not cover the question."
    `,
    solution: `${NOTES_PY}

${RAG_HELPERS}


${RAG_FUNCTIONS}


${RAG_DEMO}`,
  },
  laptop: {
    intro:
      "Now connect it to a real model. You need Ollama with `llama3.2` downloaded, from the \"Your First Real AI Call\" lesson. Nothing else to install.",
    steps: [
      {
        text: "Make a folder called `ask-my-notes`, save the files below into it, and open a terminal there. On Mac and Linux, type `python3` instead of `python`.",
      },
      {
        text: "Replace the text in `notes.txt` with your own class notes. Keep a blank line between paragraphs.",
      },
      {
        text: "Make sure Ollama is running (open the app, or run `ollama serve` in another terminal).",
      },
    ],
    files: [
      { name: "ask_my_notes.py", content: ASK_NOTES_FILE },
      { name: "notes.txt", content: `${NOTES_TEXT}\n` },
      {
        name: "README.md",
        content: py`
          # Ask My Notes

          A small RAG (retrieval augmented generation) bot. It finds the notes that match
          a question and asks a local AI model (Llama 3.2 through Ollama) to answer from
          those notes only.

          ## How to run

              ollama pull llama3.2
              python ask_my_notes.py

          ## How it works

          1. Split notes.txt into paragraphs
          2. Score each paragraph by shared words with the question
          3. Put the best paragraphs into a grounded prompt
          4. Send the prompt to the local model and print the answer with its sources

          ## What I learned

          - The four steps of RAG, built without a framework
          - Grounded prompts and saying "I don't know" instead of guessing
          - Calling an OpenAI-compatible chat API from plain Python

          ## Next ideas

          - Use embeddings (for example nomic-embed-text in Ollama) instead of shared words
          - Serve it as an API with FastAPI
        `,
      },
      { name: ".gitignore", content: GITIGNORE },
    ],
    run: "python ask_my_notes.py",
    expected: py`
      Loaded 5 notes. Ask a question, or press Enter on an empty line to quit.

      You: What does Docker do?
      Bot: Docker packages an application with its dependencies so it runs the same on every machine.
      Sources: Docker packages an application with its...

      You: Who won the cricket match?
      Bot: I don't know. None of your notes mention that.
    `,
    repo: "ask-my-notes",
  },
};

// ---------------------------------------------------------------------------
// Laptop versions for existing lessons
// ---------------------------------------------------------------------------

const TORCH_FILE = py`
  """The same linear model as the lesson, trained with PyTorch."""
  import torch

  torch.manual_seed(0)
  x = torch.rand(200, 1) * 2 - 1
  y = 3.0 * x - 1.0 + 0.05 * torch.randn(200, 1)

  model = torch.nn.Linear(1, 1)
  loss_fn = torch.nn.MSELoss()
  optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

  for epoch in range(1, 301):
      pred = model(x)
      loss = loss_fn(pred, y)
      optimizer.zero_grad()
      loss.backward()
      optimizer.step()
      if epoch % 100 == 0:
          print(f"epoch {epoch} loss={loss.item():.4f}")

  print(f"learned w={model.weight.item():.2f} b={model.bias.item():.2f} (target w=3.00 b=-1.00)")
`;

const FASTAPI_FILE = py`
  """A tiny model service: a health check and a /predict endpoint."""
  from fastapi import FastAPI
  from pydantic import BaseModel, Field

  app = FastAPI(title="Sentiment API")


  class PredictRequest(BaseModel):
      text: str = Field(min_length=1, max_length=200)


  class PredictResponse(BaseModel):
      label: str


  def predict_label(text: str) -> str:
      # Swap this rule for a real model later, for example the spam classifier project.
      lowered = text.lower()
      return "positive" if ("good" in lowered or "great" in lowered) else "neutral"


  @app.get("/health")
  def health():
      return {"status": "ok"}


  @app.post("/predict", response_model=PredictResponse)
  def predict(request: PredictRequest):
      return PredictResponse(label=predict_label(request.text))
`;

export const LESSON_LAPTOP_RUNS: Record<string, LaptopRun> = {
  "numpy-to-pytorch": {
    intro:
      "PyTorch is too big to run in a browser tab, so here is the real version for your laptop. It trains the same model as the NumPy loop above, but PyTorch computes the gradients for you with `loss.backward()`.",
    steps: [
      { text: "Make a folder, save `train_linear.py` into it, and open a terminal there." },
      ...VENV_STEPS,
      {
        text: "Install PyTorch. This is a large download. The default build runs on the CPU, which is all this example needs.",
        command: "pip install torch",
      },
    ],
    files: [{ name: "train_linear.py", content: TORCH_FILE }],
    run: "python train_linear.py",
    expected: py`
      epoch 100 loss=0.0028
      epoch 200 loss=0.0028
      epoch 300 loss=0.0028
      learned w=3.00 b=-1.00 (target w=3.00 b=-1.00)
    `,
  },
  "fastapi-model-service": {
    intro:
      "The lesson above simulates a model service in plain Python. Here is the real FastAPI version. FastAPI checks every request for you (the 422 errors come for free) and builds interactive docs.",
    steps: [
      { text: "Make a folder called `sentiment-api`, save `app.py` into it, and open a terminal there." },
      ...VENV_STEPS,
      { text: "Install FastAPI and the Uvicorn server:", command: "pip install fastapi uvicorn" },
    ],
    files: [{ name: "app.py", content: FASTAPI_FILE }],
    run: "uvicorn app:app --reload",
    expected: py`
      INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)

      Open http://127.0.0.1:8000/docs in your browser, click POST /predict,
      then "Try it out". Send {"text": "great course"} and you get {"label": "positive"}.
      Send {"text": ""} and FastAPI answers 422 on its own.
    `,
  },
};

export const EXTRA_LESSONS: PythonLesson[] = [
  FIRST_AI_CALL,
  PROJECT_SENTIMENT,
  PROJECT_TRACKER,
  PROJECT_SPAM,
  PROJECT_ASK_NOTES,
];

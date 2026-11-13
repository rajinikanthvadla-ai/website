import type { PythonExercise } from "./types";
import { py } from "./py";

/**
 * One checked exercise per lesson, keyed by lesson slug.
 * Every starter must fail its check and every solution must pass it:
 * run `npm run check:python` after editing this file.
 */
export const LESSON_EXERCISES: Record<string, PythonExercise> = {
  // ---------------- Module 1 · foundations ----------------
  "why-python-for-ai": {
    task: "Set `role` to the job you want. Print the sentence `I want to be a <role>` using the variable, then print the result of `7 * 6` on its own line.",
    hint: "Two `print()` calls: `print(\"I want to be a\", role)` and `print(7 * 6)`.",
    starter: py`
      role = "AI engineer"
      # 1. Print: I want to be a <role>   (use the role variable)
      # 2. Print the result of 7 * 6
    `,
    check: py`
      lines = [line.strip() for line in printed.strip().splitlines()]
      assert lines, "Nothing was printed yet. Use print() to show output."
      assert any(line.startswith("I want to be a") and role in line for line in lines), "Print a line that starts with 'I want to be a' and includes your role variable."
      assert "42" in lines, "Also print 7 * 6 on its own line. It should show 42."
    `,
    solution: py`
      role = "AI engineer"
      print("I want to be a", role)
      print(7 * 6)
    `,
  },

  "syntax-and-comments": {
    task: "This code has indentation mistakes, so Python refuses to run it. Fix the indentation so it prints `medium`, and add one comment line (starting with `#`) that explains what the code does.",
    hint: "Lines inside `if`, `elif` and `else` get 4 spaces. `elif` and `else` line up exactly with `if`.",
    starter: py`
      score = 0.62
      if score >= 0.8:
      print("high")
      elif score >= 0.5:
              print("medium")
        else:
          print("low")
    `,
    check: py`
      assert printed.strip() == "medium", "After fixing the indentation it should print only: medium"
      assert "#" in source, "Add one comment line that starts with # and explains the code."
    `,
    solution: py`
      # Sort a model score into high, medium or low
      score = 0.62
      if score >= 0.8:
          print("high")
      elif score >= 0.5:
          print("medium")
      else:
          print("low")
    `,
  },

  "variables-types-operators": {
    task: "You have 1000 training samples and a batch size of 64. Set `batches` to the number of full batches (a whole number) and `leftover` to the samples that do not fill a batch.",
    hint: "`//` gives the whole-number part of a division and `%` gives the remainder.",
    starter: py`
      samples = 1000
      batch_size = 64
      batches = 0    # TODO: number of full batches
      leftover = 0   # TODO: samples left over
      print(batches, leftover)
    `,
    check: py`
      assert isinstance(batches, int), "batches should be a whole number (int). Use // instead of /."
      assert batches == 15, f"batches should be 1000 // 64 = 15, you have {batches!r}"
      assert leftover == 40, f"leftover should be 1000 % 64 = 40, you have {leftover!r}"
    `,
    solution: py`
      samples = 1000
      batch_size = 64
      batches = samples // batch_size
      leftover = samples % batch_size
      print(batches, leftover)
    `,
  },

  "casting-and-conversion": {
    task: "Settings often arrive as text. Convert `raw_temp` into a float called `temperature` and `raw_tokens` into an int called `max_tokens`, so the two prints at the bottom work.",
    hint: "`float(\"0.7\")` gives `0.7` and `int(\"256\")` gives `256`.",
    starter: py`
      raw_temp = "0.7"
      raw_tokens = "256"
      temperature = raw_temp    # TODO: convert to float
      max_tokens = raw_tokens   # TODO: convert to int
      print(temperature * 2)
      print(max_tokens + 100)
    `,
    check: py`
      assert isinstance(temperature, float), "temperature must be a float. Use float(raw_temp)."
      assert isinstance(max_tokens, int), "max_tokens must be an int. Use int(raw_tokens)."
      assert temperature == 0.7 and max_tokens == 256, "Keep the same values, only change the type."
      assert "356" in printed, "Keep the last print: max_tokens + 100 should show 356."
    `,
    solution: py`
      raw_temp = "0.7"
      raw_tokens = "256"
      temperature = float(raw_temp)
      max_tokens = int(raw_tokens)
      print(temperature * 2)
      print(max_tokens + 100)
    `,
  },

  "numbers-and-math": {
    task: "A training run used 1,234,567 tokens at $0.0006 per 1,000 tokens. Set `cost` to the price rounded to 2 decimals, and `pct` to the accuracy as a percent rounded to 1 decimal (0.9134 becomes 91.3).",
    hint: "`round(tokens / 1000 * price_per_1k, 2)` and `round(accuracy * 100, 1)`.",
    starter: py`
      tokens = 1_234_567
      price_per_1k = 0.0006
      accuracy = 0.9134
      cost = 0   # TODO: price in dollars, 2 decimals
      pct = 0    # TODO: accuracy as a percent, 1 decimal
      print(cost)
      print(pct)
    `,
    check: py`
      assert cost == 0.74, f"cost should be round(tokens / 1000 * price_per_1k, 2) = 0.74, you have {cost!r}"
      assert pct == 91.3, f"pct should be round(accuracy * 100, 1) = 91.3, you have {pct!r}"
    `,
    solution: py`
      tokens = 1_234_567
      price_per_1k = 0.0006
      accuracy = 0.9134
      cost = round(tokens / 1000 * price_per_1k, 2)
      pct = round(accuracy * 100, 1)
      print(cost)
      print(pct)
    `,
  },

  "booleans-and-comparisons": {
    task: "Use `all()` to set `all_valid` to True only if every score is between 0 and 1. Use `any()` to set `any_great` to True if at least one score is 0.9 or higher.",
    hint: "`all(0 <= s <= 1 for s in scores)` reads almost like English.",
    starter: py`
      scores = [0.91, 0.45, 0.77, 0.0]
      all_valid = None   # TODO: use all()
      any_great = None   # TODO: use any()
      print(all_valid, any_great)
    `,
    check: py`
      assert "all(" in source and "any(" in source, "Use the all() and any() functions."
      assert all_valid is True, "all_valid should be True: every score is between 0 and 1."
      assert any_great is True, "any_great should be True: 0.91 is at least 0.9."
    `,
    solution: py`
      scores = [0.91, 0.45, 0.77, 0.0]
      all_valid = all(0 <= s <= 1 for s in scores)
      any_great = any(s >= 0.9 for s in scores)
      print(all_valid, any_great)
    `,
  },

  "strings-and-text": {
    task: "Build `prompt` with an f-string: the system line, a new line, then `Question: ` and the question. Also set `short` to the first 10 characters of `question` using slicing.",
    hint: "`f\"{system}\\nQuestion: {question}\"` and `question[:10]`.",
    starter: py`
      system = "Answer in one line."
      question = "What is a vector database?"
      prompt = ""   # TODO: f-string
      short = ""    # TODO: first 10 characters of question
      print(prompt)
      print(short)
    `,
    check: py`
      assert prompt == f"{system}\nQuestion: {question}", "prompt should be the system line, a new line (\\n), then 'Question: ' and the question."
      assert short == question[:10], f"short should be question[:10], which is {question[:10]!r}"
    `,
    solution: py`
      system = "Answer in one line."
      question = "What is a vector database?"
      prompt = f"{system}\nQuestion: {question}"
      short = question[:10]
      print(prompt)
      print(short)
    `,
  },

  "string-methods-and-formatting": {
    task: "Clean `raw` into `clean`: no outer spaces, all lowercase, and only single spaces between words. Then print the accuracy as a percent with one decimal, exactly like `accuracy: 91.3%`.",
    hint: "`\" \".join(raw.split()).lower()` squeezes spaces. For the percent, try `f\"accuracy: {accuracy:.1%}\"`.",
    starter: py`
      raw = "   Fine-Tune   the MODEL   today  "
      accuracy = 0.9134
      clean = raw   # TODO: strip, lowercase, single spaces
      print(clean)
      # TODO: print the accuracy like  accuracy: 91.3%
    `,
    check: py`
      assert clean == "fine-tune the model today", f"clean should be 'fine-tune the model today', you have {clean!r}"
      assert "accuracy: 91.3%" in printed, "Print the accuracy exactly like: accuracy: 91.3%"
    `,
    solution: py`
      raw = "   Fine-Tune   the MODEL   today  "
      accuracy = 0.9134
      clean = " ".join(raw.split()).lower()
      print(clean)
      print(f"accuracy: {accuracy:.1%}")
    `,
  },

  "lists-tuples-sets": {
    task: "Set `top3` to the first 3 chunks, set `unique_tags` to the tags without duplicates as a sorted list, and add `\"eval\"` to the end of `chunks`.",
    hint: "`chunks[:3]`, `sorted(set(tags))` and `chunks.append(\"eval\")`.",
    starter: py`
      chunks = ["intro", "setup", "training", "serving", "monitoring"]
      tags = ["rag", "mlops", "rag", "llm", "mlops"]
      top3 = []          # TODO: first 3 chunks
      unique_tags = []   # TODO: sorted list of unique tags
      # TODO: add "eval" to the end of chunks
      print(top3, unique_tags, chunks)
    `,
    check: py`
      assert top3 == ["intro", "setup", "training"], f"top3 should be chunks[:3], you have {top3}"
      assert unique_tags == ["llm", "mlops", "rag"], f"unique_tags should be sorted(set(tags)), you have {unique_tags}"
      assert chunks[-1] == "eval" and len(chunks) == 6, "Use chunks.append('eval') to add it to the end."
    `,
    solution: py`
      chunks = ["intro", "setup", "training", "serving", "monitoring"]
      tags = ["rag", "mlops", "rag", "llm", "mlops"]
      top3 = chunks[:3]
      unique_tags = sorted(set(tags))
      chunks.append("eval")
      print(top3, unique_tags, chunks)
    `,
  },

  dictionaries: {
    task: "From `config`: set `model` to the model name, set `temperature` with `.get()` and a default of `0.0` (the key is missing), set `n_messages` to how many messages there are, and add a new key `\"max_tokens\"` with the value `512`.",
    hint: "`config[\"model\"]`, `config.get(\"temperature\", 0.0)`, `len(config[\"messages\"])`, `config[\"max_tokens\"] = 512`.",
    starter: py`
      config = {
          "model": "local-llama",
          "messages": [
              {"role": "system", "content": "Be brief."},
              {"role": "user", "content": "What is MLOps?"},
          ],
      }
      model = None        # TODO
      temperature = None  # TODO: use .get with a default
      n_messages = 0      # TODO
      # TODO: add "max_tokens": 512 to config
      print(model, temperature, n_messages, config.get("max_tokens"))
    `,
    check: py`
      assert model == "local-llama", "model should come from config['model']."
      assert temperature == 0.0 and ".get(" in source, "temperature should be config.get('temperature', 0.0)."
      assert n_messages == 2, "n_messages should be len(config['messages'])."
      assert config.get("max_tokens") == 512, "Add the key: config['max_tokens'] = 512"
    `,
    solution: py`
      config = {
          "model": "local-llama",
          "messages": [
              {"role": "system", "content": "Be brief."},
              {"role": "user", "content": "What is MLOps?"},
          ],
      }
      model = config["model"]
      temperature = config.get("temperature", 0.0)
      n_messages = len(config["messages"])
      config["max_tokens"] = 512
      print(model, temperature, n_messages, config.get("max_tokens"))
    `,
  },

  "control-flow": {
    task: "Loop over `scores`. Append scores of 0.8 or more to `high`, scores from 0.5 up to (not including) 0.8 to `medium`, and the rest to `low`. Use `for`, `if`, `elif` and `else`.",
    hint: "Inside `for score in scores:` check `if score >= 0.8:` first, then `elif score >= 0.5:`.",
    starter: py`
      scores = [0.91, 0.42, 0.66, 0.85, 0.12, 0.5]
      high, medium, low = [], [], []
      # TODO: loop over scores and append each one to the right list
      print("high", high)
      print("medium", medium)
      print("low", low)
    `,
    check: py`
      assert "for " in source, "Use a for loop."
      assert high == [0.91, 0.85], f"high should be [0.91, 0.85], you have {high}"
      assert medium == [0.66, 0.5], f"medium should be [0.66, 0.5] (0.5 counts as medium), you have {medium}"
      assert low == [0.42, 0.12], f"low should be [0.42, 0.12], you have {low}"
    `,
    solution: py`
      scores = [0.91, 0.42, 0.66, 0.85, 0.12, 0.5]
      high, medium, low = [], [], []
      for score in scores:
          if score >= 0.8:
              high.append(score)
          elif score >= 0.5:
              medium.append(score)
          else:
              low.append(score)
      print("high", high)
      print("medium", medium)
      print("low", low)
    `,
  },

  // ---------------- Module 2 · core language ----------------
  functions: {
    task: "Finish `clean_label(text, default=\"unknown\")`: it strips spaces, lowercases the text, and returns `default` when nothing is left.",
    hint: "Store `text.strip().lower()` in a variable, then `if not cleaned: return default`.",
    starter: py`
      def clean_label(text, default="unknown"):
          # TODO: strip and lowercase text
          # TODO: if nothing is left, return default
          pass

      print(clean_label("  Positive "))
      print(clean_label("   "))
      print(clean_label("", default="none"))
    `,
    check: py`
      assert clean_label("  Positive ") == "positive", "clean_label('  Positive ') should return 'positive'."
      assert clean_label("NEG") == "neg", "clean_label('NEG') should return 'neg'."
      assert clean_label("   ") == "unknown", "A label with only spaces should return the default 'unknown'."
      assert clean_label("", default="none") == "none", "Use the default argument: clean_label('', default='none') should return 'none'."
    `,
    solution: py`
      def clean_label(text, default="unknown"):
          cleaned = text.strip().lower()
          if not cleaned:
              return default
          return cleaned

      print(clean_label("  Positive "))
      print(clean_label("   "))
      print(clean_label("", default="none"))
    `,
  },

  "lambda-map-filter": {
    task: "Set `ranked` to the runs sorted by accuracy, highest first, using `sorted()` with a lambda key. Set `fast` to the runs with `latency_ms` under 1000, using `filter()` with a lambda.",
    hint: "`sorted(runs, key=lambda r: r[\"accuracy\"], reverse=True)` and `list(filter(lambda r: r[\"latency_ms\"] < 1000, runs))`.",
    starter: py`
      runs = [
          {"model": "mini", "accuracy": 0.88, "latency_ms": 420},
          {"model": "large", "accuracy": 0.94, "latency_ms": 1600},
          {"model": "medium", "accuracy": 0.91, "latency_ms": 780},
      ]
      ranked = runs   # TODO: sorted with a lambda key
      fast = runs     # TODO: filter with a lambda
      print([r["model"] for r in ranked])
      print([r["model"] for r in fast])
    `,
    check: py`
      assert "lambda" in source, "Use a lambda for the sort key and the filter."
      assert [r["model"] for r in ranked] == ["large", "medium", "mini"], "ranked should go large, medium, mini (highest accuracy first)."
      assert [r["model"] for r in fast] == ["mini", "medium"], "fast should keep only runs under 1000 ms: mini and medium."
    `,
    solution: py`
      runs = [
          {"model": "mini", "accuracy": 0.88, "latency_ms": 420},
          {"model": "large", "accuracy": 0.94, "latency_ms": 1600},
          {"model": "medium", "accuracy": 0.91, "latency_ms": 780},
      ]
      ranked = sorted(runs, key=lambda r: r["accuracy"], reverse=True)
      fast = list(filter(lambda r: r["latency_ms"] < 1000, runs))
      print([r["model"] for r in ranked])
      print([r["model"] for r in fast])
    `,
  },

  "comprehensions-and-generators": {
    task: "With a list comprehension, set `kept_ids` to the ids of results with a score of 0.7 or more. With a dict comprehension, set `score_by_id` to map every id to its score rounded to 1 decimal.",
    hint: "`[r[\"id\"] for r in results if r[\"score\"] >= 0.7]` and `{r[\"id\"]: round(r[\"score\"], 1) for r in results}`.",
    starter: py`
      results = [
          {"id": "d1", "score": 0.912},
          {"id": "d2", "score": 0.438},
          {"id": "d3", "score": 0.776},
      ]
      kept_ids = []      # TODO: list comprehension
      score_by_id = {}   # TODO: dict comprehension
      print(kept_ids)
      print(score_by_id)
    `,
    check: py`
      assert kept_ids == ["d1", "d3"], f"kept_ids should be ['d1', 'd3'], you have {kept_ids}"
      assert score_by_id == {"d1": 0.9, "d2": 0.4, "d3": 0.8}, f"score_by_id should map each id to round(score, 1), you have {score_by_id}"
    `,
    solution: py`
      results = [
          {"id": "d1", "score": 0.912},
          {"id": "d2", "score": 0.438},
          {"id": "d3", "score": 0.776},
      ]
      kept_ids = [r["id"] for r in results if r["score"] >= 0.7]
      score_by_id = {r["id"]: round(r["score"], 1) for r in results}
      print(kept_ids)
      print(score_by_id)
    `,
  },

  "iterators-and-iterables": {
    task: "Walk through `predictions` and `labels` together with `zip()`. Count the matches in `correct`, and use `enumerate(..., start=1)` to collect the positions where they differ in `mistakes`.",
    hint: "`for i, (pred, label) in enumerate(zip(predictions, labels), start=1):`",
    starter: py`
      predictions = ["pos", "neg", "pos", "neu", "pos"]
      labels      = ["pos", "pos", "pos", "neu", "neg"]
      correct = 0
      mistakes = []
      # TODO: loop with zip() and enumerate(..., start=1)
      print("correct:", correct)
      print("mistakes at:", mistakes)
    `,
    check: py`
      assert "zip(" in source, "Use zip() to pair predictions with labels."
      assert correct == 3, f"correct should be 3, you have {correct}"
      assert mistakes == [2, 5], f"mistakes should be [2, 5] (counting from 1), you have {mistakes}"
    `,
    solution: py`
      predictions = ["pos", "neg", "pos", "neu", "pos"]
      labels      = ["pos", "pos", "pos", "neu", "neg"]
      correct = 0
      mistakes = []
      for i, (pred, label) in enumerate(zip(predictions, labels), start=1):
          if pred == label:
              correct += 1
          else:
              mistakes.append(i)
      print("correct:", correct)
      print("mistakes at:", mistakes)
    `,
  },

  "scope-and-closures": {
    task: "Finish `make_counter()`. It returns a function, and each call of that function adds 1 and returns the new count. Two counters must keep separate counts.",
    hint: "Inside `increment`, write `nonlocal count` before you change `count`.",
    starter: py`
      def make_counter():
          count = 0
          def increment():
              # TODO: add 1 to count and return it (you need nonlocal)
              pass
          return increment

      a = make_counter()
      b = make_counter()
      print(a(), a(), b())
    `,
    check: py`
      _a = make_counter()
      _b = make_counter()
      assert [_a(), _a(), _a()] == [1, 2, 3], "Each call should return 1, then 2, then 3."
      assert _b() == 1, "A second counter must start again at 1."
    `,
    solution: py`
      def make_counter():
          count = 0
          def increment():
              nonlocal count
              count += 1
              return count
          return increment

      a = make_counter()
      b = make_counter()
      print(a(), a(), b())
    `,
  },

  "errors-and-exceptions": {
    task: "Finish `parse_temperature(raw)`. Return the value as a float. If it cannot be converted (like `\"hot\"` or `None`), return `0.2`. If the number is below 0 or above 2, raise `ValueError`.",
    hint: "Put only `float(raw)` inside `try`, catch `(ValueError, TypeError)`, then check the range after the `try` block.",
    starter: py`
      def parse_temperature(raw):
          # TODO: try float(raw); on ValueError or TypeError return 0.2
          # TODO: raise ValueError if the value is below 0 or above 2
          return float(raw)

      print(parse_temperature("0.7"))
      print(parse_temperature("hot"))
    `,
    check: py`
      assert parse_temperature("0.7") == 0.7, "parse_temperature('0.7') should return 0.7"
      assert parse_temperature("hot") == 0.2, "Text like 'hot' should return the fallback 0.2"
      assert parse_temperature(None) == 0.2, "None should also return 0.2 (catch TypeError too)."
      try:
          parse_temperature("5")
      except ValueError:
          pass
      else:
          raise AssertionError("parse_temperature('5') should raise ValueError because 5 is above 2.")
    `,
    solution: py`
      def parse_temperature(raw):
          try:
              value = float(raw)
          except (ValueError, TypeError):
              return 0.2
          if value < 0 or value > 2:
              raise ValueError(f"temperature must be between 0 and 2, got {value}")
          return value

      print(parse_temperature("0.7"))
      print(parse_temperature("hot"))
    `,
  },

  "files-and-json": {
    task: "Save `results` to `report.json` with `json.dumps()`, read the file back into `loaded` with `json.loads()`, then set `accuracy` to the share of loaded rows where `correct` is True.",
    hint: "`path.write_text(json.dumps(results))`, then `json.loads(path.read_text())`.",
    starter: py`
      import json
      from pathlib import Path

      results = [
          {"id": "q1", "correct": True},
          {"id": "q2", "correct": False},
          {"id": "q3", "correct": True},
          {"id": "q4", "correct": True},
      ]
      path = Path("report.json")
      path.unlink(missing_ok=True)  # start fresh on every run
      # TODO: write results to path as JSON
      loaded = []      # TODO: read the file back
      accuracy = 0.0   # TODO
      print(loaded)
      print(accuracy)
    `,
    check: py`
      import json as _json
      from pathlib import Path as _Path
      assert _Path("report.json").exists(), "Write the file first: path.write_text(json.dumps(results))"
      assert _json.loads(_Path("report.json").read_text()) == results, "report.json should contain the results list as JSON."
      assert loaded == results, "loaded should be the data read back from report.json."
      assert accuracy == 0.75, f"accuracy should be 3 / 4 = 0.75, you have {accuracy}"
    `,
    solution: py`
      import json
      from pathlib import Path

      results = [
          {"id": "q1", "correct": True},
          {"id": "q2", "correct": False},
          {"id": "q3", "correct": True},
          {"id": "q4", "correct": True},
      ]
      path = Path("report.json")
      path.unlink(missing_ok=True)  # start fresh on every run
      path.write_text(json.dumps(results, indent=2))
      loaded = json.loads(path.read_text())
      accuracy = sum(1 for row in loaded if row["correct"]) / len(loaded)
      print(loaded)
      print(accuracy)
    `,
  },

  "classes-and-objects": {
    task: "Finish the `ChatHistory` class: `add(role, content)` stores a message dict, `count()` returns how many messages there are, and `last()` returns the newest message's content, or `None` when the history is empty.",
    hint: "`self.messages.append({\"role\": role, \"content\": content})`. For `last()`, check `if not self.messages: return None` first.",
    starter: py`
      class ChatHistory:
          def __init__(self):
              self.messages = []

          def add(self, role, content):
              # TODO: append {"role": role, "content": content}
              pass

          def count(self):
              # TODO
              return 0

          def last(self):
              # TODO: newest message content, or None when empty
              return None

      chat = ChatHistory()
      chat.add("user", "Hi")
      chat.add("assistant", "Hello! How can I help?")
      print(chat.count(), chat.last())
    `,
    check: py`
      _h = ChatHistory()
      assert _h.last() is None, "last() on an empty history should return None."
      _h.add("user", "What is RAG?")
      _h.add("assistant", "Retrieval plus generation.")
      assert _h.count() == 2, "count() should return 2 after two add() calls."
      assert _h.messages[0] == {"role": "user", "content": "What is RAG?"}, "add() should store a dict with role and content."
      assert _h.last() == "Retrieval plus generation.", "last() should return the content of the newest message."
      assert ChatHistory().count() == 0, "Each ChatHistory needs its own list. Create it in __init__."
    `,
    solution: py`
      class ChatHistory:
          def __init__(self):
              self.messages = []

          def add(self, role, content):
              self.messages.append({"role": role, "content": content})

          def count(self):
              return len(self.messages)

          def last(self):
              if not self.messages:
                  return None
              return self.messages[-1]["content"]

      chat = ChatHistory()
      chat.add("user", "Hi")
      chat.add("assistant", "Hello! How can I help?")
      print(chat.count(), chat.last())
    `,
  },

  "inheritance-and-polymorphism": {
    task: "Create a class `MedianRegressor` that inherits from `Estimator`. Its `fit(X, y)` stores the median of `y` in `self.median_` and returns `self`. Its `predict(X)` returns that median once per row of `X`.",
    hint: "Sort `y`. With an even count, the median is the mean of the two middle values. Or use `statistics.median(y)`.",
    starter: py`
      class Estimator:
          def fit(self, X, y):
              raise NotImplementedError
          def predict(self, X):
              raise NotImplementedError

      class MeanRegressor(Estimator):
          def fit(self, X, y):
              self.mean_ = sum(y) / len(y)
              return self
          def predict(self, X):
              return [self.mean_ for _ in X]

      # TODO: class MedianRegressor(Estimator): with fit and predict

      X_train = [[1], [2], [3], [4], [5]]
      y_train = [10.0, 12.0, 11.0, 50.0, 13.0]
      print(MeanRegressor().fit(X_train, y_train).predict([[6], [7]]))
    `,
    check: py`
      assert "MedianRegressor" in globals(), "Create a class named MedianRegressor."
      assert issubclass(MedianRegressor, Estimator), "MedianRegressor should inherit from Estimator: class MedianRegressor(Estimator):"
      _m = MedianRegressor()
      assert _m.fit([[1], [2], [3]], [5.0, 1.0, 9.0]) is _m, "fit() should return self."
      assert list(_m.predict([[4], [5]])) == [5.0, 5.0], "predict should return the median (5.0) once per row."
      assert list(MedianRegressor().fit([[0]] * 4, [1.0, 2.0, 3.0, 10.0]).predict([[0]])) == [2.5], "With an even count, the median is the mean of the two middle values (2.5 here)."
    `,
    solution: py`
      import statistics

      class Estimator:
          def fit(self, X, y):
              raise NotImplementedError
          def predict(self, X):
              raise NotImplementedError

      class MeanRegressor(Estimator):
          def fit(self, X, y):
              self.mean_ = sum(y) / len(y)
              return self
          def predict(self, X):
              return [self.mean_ for _ in X]

      class MedianRegressor(Estimator):
          def fit(self, X, y):
              self.median_ = statistics.median(y)
              return self
          def predict(self, X):
              return [self.median_ for _ in X]

      X_train = [[1], [2], [3], [4], [5]]
      y_train = [10.0, 12.0, 11.0, 50.0, 13.0]
      print(MeanRegressor().fit(X_train, y_train).predict([[6], [7]]))
      print(MedianRegressor().fit(X_train, y_train).predict([[6], [7]]))
    `,
  },

  "decorators-and-context-managers": {
    task: "Finish the decorator `count_calls`. It should count how many times the decorated function runs and keep the number on `wrapper.calls`, starting at 0.",
    hint: "Set `wrapper.calls = 0` before `return wrapper`, and do `wrapper.calls += 1` inside `wrapper`.",
    starter: py`
      import functools

      def count_calls(fn):
          @functools.wraps(fn)
          def wrapper(*args, **kwargs):
              # TODO: add 1 to wrapper.calls, then call fn and return its result
              return fn(*args, **kwargs)
          # TODO: start the counter at 0
          return wrapper

      @count_calls
      def embed(text):
          return len(text)

      embed("hello")
      embed("world")
      print(embed.calls)
    `,
    check: py`
      @count_calls
      def _square(x):
          return x * x
      assert getattr(_square, "calls", None) == 0, "The counter should exist and start at 0 before any call."
      assert _square(3) == 9, "The wrapper must return the original function's result."
      _square(4)
      assert _square.calls == 2, "After two calls, .calls should be 2."
      assert _square.__name__ == "_square", "Keep @functools.wraps(fn) so the function keeps its name."
    `,
    solution: py`
      import functools

      def count_calls(fn):
          @functools.wraps(fn)
          def wrapper(*args, **kwargs):
              wrapper.calls += 1
              return fn(*args, **kwargs)
          wrapper.calls = 0
          return wrapper

      @count_calls
      def embed(text):
          return len(text)

      embed("hello")
      embed("world")
      print(embed.calls)
    `,
  },

  "regular-expressions": {
    task: "Use `re.findall` to turn every `key=value` pair in `log` into the dict `params`. Then use `re.search` with `re.IGNORECASE` to set `has_error` to True when the log mentions error.",
    hint: "`dict(re.findall(r\"(\\w+)=(\\S+)\", log))` builds the dict in one line.",
    starter: py`
      import re

      log = "2026-11-02 10:22:31 ERROR run=exp-7 model=bert-base lr=2e-5 epochs=3"
      params = {}         # TODO: re.findall -> dict
      has_error = False   # TODO: re.search, ignore case
      print(params)
      print(has_error)
    `,
    check: py`
      assert "re." in source, "Use the re module."
      assert params == {"run": "exp-7", "model": "bert-base", "lr": "2e-5", "epochs": "3"}, f"params should map each key to its text value, you have {params}"
      assert has_error, "has_error should be True. Try bool(re.search(r'error', log, re.IGNORECASE))."
    `,
    solution: py`
      import re

      log = "2026-11-02 10:22:31 ERROR run=exp-7 model=bert-base lr=2e-5 epochs=3"
      params = dict(re.findall(r"(\w+)=(\S+)", log))
      has_error = bool(re.search(r"error", log, re.IGNORECASE))
      print(params)
      print(has_error)
    `,
  },

  "dates-and-times": {
    task: "A training job started at `started` and took 2 hours 30 minutes. Set `finished` using `timedelta`, and `finished_text` formatted like `2026-11-02 11:30` with `strftime`.",
    hint: "`started + timedelta(hours=2, minutes=30)` and `.strftime(\"%Y-%m-%d %H:%M\")`.",
    starter: py`
      from datetime import datetime, timedelta

      started = datetime(2026, 11, 2, 9, 0)
      finished = started   # TODO: add 2 hours 30 minutes
      finished_text = ""   # TODO: format with strftime
      print(finished_text)
    `,
    check: py`
      from datetime import datetime as _dt
      assert finished == _dt(2026, 11, 2, 11, 30), "finished should be started + timedelta(hours=2, minutes=30)."
      assert finished_text == "2026-11-02 11:30", f"finished_text should be '2026-11-02 11:30', you have {finished_text!r}"
    `,
    solution: py`
      from datetime import datetime, timedelta

      started = datetime(2026, 11, 2, 9, 0)
      finished = started + timedelta(hours=2, minutes=30)
      finished_text = finished.strftime("%Y-%m-%d %H:%M")
      print(finished_text)
    `,
  },

  "standard-library-toolkit": {
    task: "Use `collections.Counter` to count the statuses into `status_counts`, then set `most_common_status` to the most frequent status using `.most_common(1)`.",
    hint: "`Counter(statuses).most_common(1)` gives `[(\"ok\", 3)]`, so take `[0][0]`.",
    starter: py`
      from collections import Counter

      statuses = ["ok", "timeout", "ok", "error", "ok", "timeout"]
      status_counts = {}         # TODO: Counter
      most_common_status = ""    # TODO: .most_common(1)
      print(status_counts)
      print(most_common_status)
    `,
    check: py`
      assert dict(status_counts) == {"ok": 3, "timeout": 2, "error": 1}, "status_counts should count each status. Use Counter(statuses)."
      assert most_common_status == "ok", "most_common_status should be 'ok'."
    `,
    solution: py`
      from collections import Counter

      statuses = ["ok", "timeout", "ok", "error", "ok", "timeout"]
      status_counts = Counter(statuses)
      most_common_status = status_counts.most_common(1)[0][0]
      print(status_counts)
      print(most_common_status)
    `,
  },

  "modules-and-environments": {
    task: "Write a function `main()` that prints `pipeline ready`, and call it only inside the main guard: `if __name__ == \"__main__\":`.",
    hint: "The guard goes at the bottom of the file, with `main()` indented under it.",
    starter: py`
      import math

      def area(radius):
          return math.pi * radius ** 2

      # TODO: write main() that prints "pipeline ready"
      # TODO: call main() only inside the main guard
    `,
    check: py`
      assert "main" in globals() and callable(main), "Write a function called main()."
      assert "pipeline ready" in printed, "main() should print: pipeline ready"
      assert "__name__ ==" in source and "__main__" in source, 'Call main() inside: if __name__ == "__main__":'
    `,
    solution: py`
      import math

      def area(radius):
          return math.pi * radius ** 2

      def main():
          print("pipeline ready")

      if __name__ == "__main__":
          main()
    `,
  },

  "packages-and-pip": {
    task: "Build `requirements_txt` from the `pins` dict: one `name==version` line per package, sorted by name, joined with new lines (exactly how a requirements.txt file looks). Then set `has_json` to True if Python can find the `json` module.",
    hint: "`\"\\n\".join(f\"{name}=={version}\" for name, version in sorted(pins.items()))` and `importlib.util.find_spec(\"json\") is not None`.",
    starter: py`
      import importlib.util

      pins = {"pandas": "2.2.3", "numpy": "2.1.3", "scikit-learn": "1.5.2"}
      requirements_txt = ""   # TODO
      has_json = False        # TODO: use importlib.util.find_spec
      print(requirements_txt)
      print(has_json)
    `,
    check: py`
      assert requirements_txt.strip() == "numpy==2.1.3\npandas==2.2.3\nscikit-learn==1.5.2", "requirements_txt should have one name==version line per package, sorted by name."
      assert has_json is True, "has_json should be True. Use importlib.util.find_spec('json') is not None."
    `,
    solution: py`
      import importlib.util

      pins = {"pandas": "2.2.3", "numpy": "2.1.3", "scikit-learn": "1.5.2"}
      requirements_txt = "\n".join(f"{name}=={version}" for name, version in sorted(pins.items()))
      has_json = importlib.util.find_spec("json") is not None
      print(requirements_txt)
      print(has_json)
    `,
  },

  // ---------------- Module 3 · data and ML ----------------
  "type-hints-and-dataclasses": {
    task: "Turn `EvalRow` into a dataclass with the fields `question: str`, `expected: str`, `predicted: str` and `latency_ms: int = 0`. Add a `correct` property that compares expected and predicted, ignoring case and outer spaces.",
    hint: "Put `@dataclass` above the class. The property is `return self.expected.strip().lower() == self.predicted.strip().lower()`.",
    starter: py`
      from dataclasses import dataclass

      # TODO: add @dataclass, the four fields, and a correct property
      class EvalRow:
          pass

      rows = [
          EvalRow("2+2?", "4", "4", 120),
          EvalRow("Capital of France?", "Paris", " paris ", 300),
          EvalRow("Largest planet?", "Jupiter", "Saturn"),
      ]
      print(sum(r.correct for r in rows), "of", len(rows), "correct")
    `,
    check: py`
      import dataclasses as _dc
      assert _dc.is_dataclass(EvalRow), "Put @dataclass above class EvalRow."
      _r = EvalRow("q", "Paris", " paris ")
      assert _r.latency_ms == 0, "latency_ms should default to 0."
      assert _r.correct is True, "correct should ignore case and outer spaces: 'Paris' matches ' paris '."
      assert EvalRow("q", "a", "b", 5).correct is False, "correct should be False when the answers differ."
    `,
    solution: py`
      from dataclasses import dataclass

      @dataclass
      class EvalRow:
          question: str
          expected: str
          predicted: str
          latency_ms: int = 0

          @property
          def correct(self) -> bool:
              return self.expected.strip().lower() == self.predicted.strip().lower()

      rows = [
          EvalRow("2+2?", "4", "4", 120),
          EvalRow("Capital of France?", "Paris", " paris ", 300),
          EvalRow("Largest planet?", "Jupiter", "Saturn"),
      ]
      print(sum(r.correct for r in rows), "of", len(rows), "correct")
    `,
  },

  "numpy-arrays": {
    task: "With NumPy and no loops, set `scores` to the cosine similarity between `query` and every row of `docs`. Then set `best` to the label of the highest score.",
    hint: "`(docs @ query) / (np.linalg.norm(docs, axis=1) * np.linalg.norm(query))`, then `labels[int(np.argmax(scores))]`.",
    starter: py`
      import numpy as np

      labels = ["mlops", "frontend", "rag"]
      docs = np.array([
          [0.9, 0.1, 0.2],
          [0.0, 1.0, 0.1],
          [0.3, 0.2, 0.95],
      ])
      query = np.array([0.2, 0.1, 1.0])
      scores = np.zeros(3)   # TODO: cosine similarity with each row
      best = ""              # TODO: label of the highest score
      print(np.round(scores, 3), best)
    `,
    check: py`
      import numpy as _np
      _expected = (docs @ query) / (_np.linalg.norm(docs, axis=1) * _np.linalg.norm(query))
      assert _np.shape(scores) == (3,), "scores should hold one value per document."
      assert _np.allclose(scores, _expected, atol=1e-3), "scores should be cosine similarity: (docs @ query) / (row norms * query norm)."
      assert best == "rag", f"best should be 'rag', you have {best!r}"
    `,
    solution: py`
      import numpy as np

      labels = ["mlops", "frontend", "rag"]
      docs = np.array([
          [0.9, 0.1, 0.2],
          [0.0, 1.0, 0.1],
          [0.3, 0.2, 0.95],
      ])
      query = np.array([0.2, 0.1, 1.0])
      scores = (docs @ query) / (np.linalg.norm(docs, axis=1) * np.linalg.norm(query))
      best = labels[int(np.argmax(scores))]
      print(np.round(scores, 3), best)
    `,
  },

  "pandas-dataframes": {
    task: "Add a `total_tokens` column (prompt plus completion), set `ok_calls` to only the rows where status is `\"ok\"`, then set `tokens_by_model` to the total tokens per model in `ok_calls` using `groupby`.",
    hint: "`calls[calls[\"status\"] == \"ok\"]` filters rows. Then `ok_calls.groupby(\"model\")[\"total_tokens\"].sum()`.",
    starter: py`
      import pandas as pd

      calls = pd.DataFrame({
          "model": ["mini", "mini", "large", "large", "mini"],
          "status": ["ok", "error", "ok", "ok", "ok"],
          "prompt_tokens": [500, 300, 1200, 900, 400],
          "completion_tokens": [100, 0, 450, 300, 80],
      })
      # TODO: add calls["total_tokens"]
      ok_calls = calls          # TODO: only status == "ok"
      tokens_by_model = None    # TODO: groupby model, sum total_tokens
      print(tokens_by_model)
    `,
    check: py`
      assert "total_tokens" in calls.columns, "Add the column: calls['total_tokens'] = calls['prompt_tokens'] + calls['completion_tokens']"
      assert list(calls["total_tokens"]) == [600, 300, 1650, 1200, 480], "total_tokens should be prompt_tokens + completion_tokens."
      assert len(ok_calls) == 4 and set(ok_calls["status"]) == {"ok"}, "ok_calls should keep only the 4 rows where status is 'ok'."
      assert tokens_by_model is not None, "Build tokens_by_model with groupby."
      assert {k: int(v) for k, v in dict(tokens_by_model).items()} == {"large": 2850, "mini": 1080}, "tokens_by_model should be large 2850 and mini 1080."
    `,
    solution: py`
      import pandas as pd

      calls = pd.DataFrame({
          "model": ["mini", "mini", "large", "large", "mini"],
          "status": ["ok", "error", "ok", "ok", "ok"],
          "prompt_tokens": [500, 300, 1200, 900, 400],
          "completion_tokens": [100, 0, 450, 300, 80],
      })
      calls["total_tokens"] = calls["prompt_tokens"] + calls["completion_tokens"]
      ok_calls = calls[calls["status"] == "ok"]
      tokens_by_model = ok_calls.groupby("model")["total_tokens"].sum()
      print(tokens_by_model)
    `,
  },

  "statistics-for-ml": {
    task: "For `latencies`, set `mean`, `median` and `p95` (the 95th percentile) with NumPy. Then set `outliers` to the values more than 3 times the median.",
    hint: "`latencies.mean()`, `np.median(latencies)`, `np.percentile(latencies, 95)` and `latencies[latencies > 3 * median]`.",
    starter: py`
      import numpy as np

      latencies = np.array([180, 210, 195, 205, 190, 220, 175, 4200, 199, 188])
      mean = 0       # TODO
      median = 0     # TODO
      p95 = 0        # TODO
      outliers = []  # TODO: values above 3 x median
      print(mean, median, p95, outliers)
    `,
    check: py`
      import numpy as _np
      assert _np.isclose(float(mean), float(latencies.mean())), "mean should be latencies.mean()."
      assert _np.isclose(float(median), float(_np.median(latencies))), "median should be np.median(latencies)."
      assert _np.isclose(float(p95), float(_np.percentile(latencies, 95))), "p95 should be np.percentile(latencies, 95)."
      assert [int(x) for x in outliers] == [4200], "outliers should be [4200], the only value above 3 x median."
    `,
    solution: py`
      import numpy as np

      latencies = np.array([180, 210, 195, 205, 190, 220, 175, 4200, 199, 188])
      mean = latencies.mean()
      median = np.median(latencies)
      p95 = np.percentile(latencies, 95)
      outliers = latencies[latencies > 3 * median]
      print(mean, median, p95, outliers)
    `,
  },

  "data-distributions-and-plots": {
    task: "Draw a histogram of `scores` with 20 bins, title it `Model scores`, and label the x axis `score`. Also set `share_above` to the share of scores above 0.8.",
    hint: "`plt.hist(scores, bins=20)`, `plt.title(...)`, `plt.xlabel(...)`. For the share, `(scores > 0.8).mean()`.",
    starter: py`
      import matplotlib.pyplot as plt
      import numpy as np

      rng = np.random.default_rng(7)
      scores = rng.beta(5, 2, size=500)
      # TODO: histogram with 20 bins, title, x label
      share_above = 0.0   # TODO: share of scores above 0.8
      print(round(float(share_above), 3))
    `,
    check: py`
      import matplotlib.pyplot as _plt
      import numpy as _np
      assert _plt.get_fignums(), "Draw the histogram with plt.hist(scores, bins=20)."
      _ax = _plt.gcf().axes[0]
      assert len(_ax.patches) == 20, "Use 20 bins: plt.hist(scores, bins=20)."
      assert _ax.get_title() == "Model scores", "Set the title with plt.title('Model scores')."
      assert _ax.get_xlabel() == "score", "Label the x axis with plt.xlabel('score')."
      assert _np.isclose(float(share_above), float((scores > 0.8).mean())), "share_above should be (scores > 0.8).mean()."
    `,
    solution: py`
      import matplotlib.pyplot as plt
      import numpy as np

      rng = np.random.default_rng(7)
      scores = rng.beta(5, 2, size=500)
      plt.hist(scores, bins=20, color="#1d4ed8", edgecolor="white")
      plt.title("Model scores")
      plt.xlabel("score")
      share_above = (scores > 0.8).mean()
      print(round(float(share_above), 3))
    `,
  },

  "sklearn-regression": {
    task: "Split `X` and `y` 80/20 with `random_state=0`, fit a `LinearRegression` on the training part as `model`, and set `r2` to the R² score on the test part. It should be above 0.9.",
    hint: "`X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)`.",
    starter: py`
      import numpy as np
      from sklearn.linear_model import LinearRegression
      from sklearn.model_selection import train_test_split
      from sklearn.metrics import r2_score

      rng = np.random.default_rng(0)
      hours = rng.uniform(1, 50, 200)
      X = hours.reshape(-1, 1)
      y = 3.0 * hours + 20 + rng.normal(0, 4, 200)
      model = None   # TODO: split, then fit LinearRegression on the training data
      r2 = 0.0       # TODO: r2_score on the test data
      print(round(r2, 3))
    `,
    check: py`
      from sklearn.linear_model import LinearRegression as _LR
      assert isinstance(model, _LR) and hasattr(model, "coef_"), "model should be a LinearRegression that you fit with model.fit(X_train, y_train)."
      assert abs(float(model.coef_[0]) - 3.0) < 0.2, "The learned slope should be close to 3.0. Did you fit on the training split of X and y?"
      assert r2 > 0.9, f"r2 on the test split should be above 0.9, you have {r2:.3f}"
    `,
    solution: py`
      import numpy as np
      from sklearn.linear_model import LinearRegression
      from sklearn.model_selection import train_test_split
      from sklearn.metrics import r2_score

      rng = np.random.default_rng(0)
      hours = rng.uniform(1, 50, 200)
      X = hours.reshape(-1, 1)
      y = 3.0 * hours + 20 + rng.normal(0, 4, 200)
      X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
      model = LinearRegression().fit(X_train, y_train)
      r2 = r2_score(y_test, model.predict(X_test))
      print(round(r2, 3))
    `,
  },

  "sklearn-classification": {
    task: "Train a `LogisticRegression` on the training split, predict on the test split, and set `precision` and `recall` for class 1 using `sklearn.metrics`.",
    hint: "`pred = LogisticRegression().fit(X_tr, y_tr).predict(X_te)`, then `precision_score(y_te, pred)` and `recall_score(y_te, pred)`.",
    starter: py`
      import numpy as np
      from sklearn.linear_model import LogisticRegression
      from sklearn.model_selection import train_test_split
      from sklearn.metrics import precision_score, recall_score

      rng = np.random.default_rng(3)
      X = rng.normal(0, 1, (600, 2))
      y = (X[:, 0] + X[:, 1] > 0.5).astype(int)
      X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
      precision = 0.0   # TODO
      recall = 0.0      # TODO
      print(round(precision, 3), round(recall, 3))
    `,
    check: py`
      from sklearn.linear_model import LogisticRegression as _LogReg
      from sklearn.metrics import precision_score as _ps, recall_score as _rs
      _pred = _LogReg().fit(X_tr, y_tr).predict(X_te)
      assert precision > 0, "Compute precision with precision_score(y_te, predictions)."
      assert abs(precision - _ps(y_te, _pred)) < 0.02, "precision should be precision_score(y_te, model.predict(X_te))."
      assert abs(recall - _rs(y_te, _pred)) < 0.02, "recall should be recall_score(y_te, model.predict(X_te))."
    `,
    solution: py`
      import numpy as np
      from sklearn.linear_model import LogisticRegression
      from sklearn.model_selection import train_test_split
      from sklearn.metrics import precision_score, recall_score

      rng = np.random.default_rng(3)
      X = rng.normal(0, 1, (600, 2))
      y = (X[:, 0] + X[:, 1] > 0.5).astype(int)
      X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
      model = LogisticRegression().fit(X_tr, y_tr)
      pred = model.predict(X_te)
      precision = precision_score(y_te, pred)
      recall = recall_score(y_te, pred)
      print(round(precision, 3), round(recall, 3))
    `,
  },

  "sklearn-pipelines-and-clustering": {
    task: "Build `pipe`, a `Pipeline` with a `StandardScaler` step and then `KMeans(n_clusters=3, n_init=10, random_state=0)`. Fit it on `X` and set `labels` to each row's cluster.",
    hint: "`Pipeline([(\"scale\", StandardScaler()), (\"kmeans\", KMeans(...))])`, then `labels = pipe.fit_predict(X)`.",
    starter: py`
      import numpy as np
      from sklearn.cluster import KMeans
      from sklearn.pipeline import Pipeline
      from sklearn.preprocessing import StandardScaler

      rng = np.random.default_rng(5)
      X = np.vstack([
          rng.normal([0, 0], 0.3, (50, 2)),
          rng.normal([5, 5], 0.3, (50, 2)),
          rng.normal([0, 5], 0.3, (50, 2)),
      ])
      pipe = None   # TODO: scaler, then KMeans
      labels = []   # TODO: pipe.fit_predict(X)
      print(np.bincount(labels) if len(labels) else "no labels yet")
    `,
    check: py`
      import numpy as _np
      from sklearn.pipeline import Pipeline as _Pipe
      from sklearn.cluster import KMeans as _KM
      from sklearn.preprocessing import StandardScaler as _SS
      assert isinstance(pipe, _Pipe), "pipe should be a Pipeline."
      assert [type(step) for _, step in pipe.steps] == [_SS, _KM], "The pipeline should be StandardScaler, then KMeans."
      assert pipe.steps[-1][1].n_clusters == 3, "Use KMeans(n_clusters=3)."
      assert len(labels) == 150, "labels should have one cluster id per row of X."
      assert sorted(_np.bincount(labels).tolist()) == [50, 50, 50], "Each of the 3 groups should get 50 points."
    `,
    solution: py`
      import numpy as np
      from sklearn.cluster import KMeans
      from sklearn.pipeline import Pipeline
      from sklearn.preprocessing import StandardScaler

      rng = np.random.default_rng(5)
      X = np.vstack([
          rng.normal([0, 0], 0.3, (50, 2)),
          rng.normal([5, 5], 0.3, (50, 2)),
          rng.normal([0, 5], 0.3, (50, 2)),
      ])
      pipe = Pipeline([
          ("scale", StandardScaler()),
          ("kmeans", KMeans(n_clusters=3, n_init=10, random_state=0)),
      ])
      labels = pipe.fit_predict(X)
      print(np.bincount(labels) if len(labels) else "no labels yet")
    `,
  },

  "databases-with-python": {
    task: "Insert the rows from `new_runs` into the `runs` table with a parameterized query (`?` placeholders), then set `best_model` to the model with the highest accuracy using SQL.",
    hint: "`conn.executemany(\"INSERT INTO runs VALUES (?, ?)\", new_runs)`. `fetchone()` returns a tuple, so take `[0]`.",
    starter: py`
      import sqlite3

      conn = sqlite3.connect(":memory:")
      conn.execute("CREATE TABLE runs (model TEXT, accuracy REAL)")
      new_runs = [("mini", 0.88), ("large", 0.94), ("medium", 0.91)]
      # TODO: insert new_runs with executemany and ? placeholders
      best_model = None   # TODO: SELECT ... ORDER BY accuracy DESC LIMIT 1
      print(best_model)
    `,
    check: py`
      assert "?" in source, "Use ? placeholders, never f-strings, to put values into SQL."
      assert conn.execute("SELECT COUNT(*) FROM runs").fetchone()[0] == 3, "Insert all 3 runs with executemany."
      assert best_model == "large", f"best_model should be 'large', you have {best_model!r}"
    `,
    solution: py`
      import sqlite3

      conn = sqlite3.connect(":memory:")
      conn.execute("CREATE TABLE runs (model TEXT, accuracy REAL)")
      new_runs = [("mini", 0.88), ("large", 0.94), ("medium", 0.91)]
      conn.executemany("INSERT INTO runs VALUES (?, ?)", new_runs)
      best_model = conn.execute("SELECT model FROM runs ORDER BY accuracy DESC LIMIT 1").fetchone()[0]
      print(best_model)
    `,
  },

  "testing-with-pytest": {
    task: "Fill in `test_normalize_score()` with at least three `assert` lines: a normal score, a score below 0 and a score above 100. The checker then runs your test against two broken versions of `normalize_score`, and your test must catch both.",
    hint: "`assert normalize_score(50) == 0.5`, `assert normalize_score(-10) == 0.0`, `assert normalize_score(150) == 1.0`.",
    starter: py`
      def normalize_score(raw, lo=0.0, hi=100.0):
          clamped = max(lo, min(hi, raw))
          return (clamped - lo) / (hi - lo)

      def test_normalize_score():
          # TODO: assert a normal, a too-low and a too-high input
          pass

      test_normalize_score()
      print("tests passed")
    `,
    check: py`
      assert "test_normalize_score" in globals(), "Keep the function named test_normalize_score."
      _g = test_normalize_score.__globals__
      _original = _g["normalize_score"]

      def _forgets_to_clamp(raw, lo=0.0, hi=100.0):
          return (raw - lo) / (hi - lo)

      def _forgets_to_scale(raw, lo=0.0, hi=100.0):
          return max(lo, min(hi, raw))

      def _catches(broken):
          _g["normalize_score"] = broken
          try:
              test_normalize_score()
          except AssertionError:
              return True
          finally:
              _g["normalize_score"] = _original
          return False

      assert _catches(_forgets_to_scale), "Your test missed a version that forgets to divide. Add: assert normalize_score(50) == 0.5"
      assert _catches(_forgets_to_clamp), "Your test missed a version that forgets to clamp. Add asserts for a score below 0 and above 100."
    `,
    solution: py`
      def normalize_score(raw, lo=0.0, hi=100.0):
          clamped = max(lo, min(hi, raw))
          return (clamped - lo) / (hi - lo)

      def test_normalize_score():
          assert normalize_score(50) == 0.5
          assert normalize_score(-10) == 0.0
          assert normalize_score(150) == 1.0

      test_normalize_score()
      print("tests passed")
    `,
  },

  "logging-and-configuration": {
    task: "Finish `log_call(model, latency_ms)`: log an INFO line with the model and latency on every call, and also a WARNING when `latency_ms` is over 2000. Use `logger`, not `print`.",
    hint: "`logger.info(\"llm_call model=%s latency_ms=%d\", model, latency_ms)`, then `if latency_ms > 2000: logger.warning(...)`.",
    starter: py`
      import logging

      logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
      logger = logging.getLogger("llm")

      def log_call(model, latency_ms):
          # TODO: logger.info(...) every time
          # TODO: logger.warning(...) when latency_ms > 2000
          print(model, latency_ms)

      log_call("mini", 640)
      log_call("large", 2450)
    `,
    check: py`
      import logging as _logging
      _records = []

      class _Grab(_logging.Handler):
          def emit(self, record):
              _records.append(record)

      _lg = _logging.getLogger("llm")
      _h = _Grab(level=_logging.DEBUG)
      _old_level = _lg.level
      _lg.addHandler(_h)
      _lg.setLevel(_logging.DEBUG)
      try:
          log_call("mini", 500)
          log_call("large", 2500)
      finally:
          _lg.removeHandler(_h)
          _lg.setLevel(_old_level)
      _levels = [r.levelname for r in _records]
      assert _levels.count("INFO") >= 2, "Log one INFO line per call with logger.info(...)."
      assert _levels.count("WARNING") == 1, "Log a WARNING only when latency_ms is over 2000."
      assert any("large" in r.getMessage() for r in _records), "Include the model name in the log message."
    `,
    solution: py`
      import logging

      logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
      logger = logging.getLogger("llm")

      def log_call(model, latency_ms):
          logger.info("llm_call model=%s latency_ms=%d", model, latency_ms)
          if latency_ms > 2000:
              logger.warning("slow_call model=%s latency_ms=%d", model, latency_ms)

      log_call("mini", 640)
      log_call("large", 2450)
    `,
  },

  // ---------------- Module 4 · GenAI and production ----------------
  "async-python": {
    task: "These 6 fake API calls run one after another and take about 1.8 seconds. Make them run at the same time with `asyncio.gather`, keeping the results in order in `results`. It should take about 0.3 seconds.",
    hint: "`results = await asyncio.gather(*(fake_llm_call(i) for i in range(6)))`",
    starter: py`
      import asyncio
      import time

      async def fake_llm_call(i):
          await asyncio.sleep(0.3)
          return f"answer {i}"

      start = time.perf_counter()
      results = []
      for i in range(6):
          results.append(await fake_llm_call(i))   # TODO: replace this loop with asyncio.gather
      elapsed = time.perf_counter() - start
      print(results)
      print(f"{elapsed:.2f} s")
    `,
    check: py`
      assert "gather" in source, "Use asyncio.gather."
      assert list(results) == [f"answer {i}" for i in range(6)], "results should be the 6 answers in order."
      assert elapsed < 1.0, f"That took {elapsed:.2f} s. Run the calls together with asyncio.gather."
    `,
    solution: py`
      import asyncio
      import time

      async def fake_llm_call(i):
          await asyncio.sleep(0.3)
          return f"answer {i}"

      start = time.perf_counter()
      results = await asyncio.gather(*(fake_llm_call(i) for i in range(6)))
      elapsed = time.perf_counter() - start
      print(results)
      print(f"{elapsed:.2f} s")
    `,
  },

  "calling-llm-apis": {
    task: "Finish `build_payload(question, context)`: return a chat request with model `\"local-llama\"`, temperature `0`, a system message `Answer only from the context.` and a user message containing the context and the question. Then finish `estimate_tokens(payload)`: total characters of all message contents, divided by 4 (whole number).",
    hint: "Messages are dicts like `{\"role\": \"system\", \"content\": \"...\"}`. For tokens: `sum(len(m[\"content\"]) for m in payload[\"messages\"]) // 4`.",
    starter: py`
      def build_payload(question, context):
          # TODO: return {"model": ..., "temperature": 0, "messages": [system, user]}
          return {}

      def estimate_tokens(payload):
          # TODO: total characters of all message contents // 4
          return 0

      p = build_payload("What is MLOps?", "MLOps runs ML models in production.")
      print(p)
      print(estimate_tokens(p))
    `,
    check: py`
      _p = build_payload("What is RAG?", "RAG retrieves documents before answering.")
      assert _p.get("model") == "local-llama", "Set the model to 'local-llama'."
      assert _p.get("temperature") == 0, "Use temperature 0 for stable, factual answers."
      _msgs = _p.get("messages", [])
      assert len(_msgs) == 2, "Send two messages: a system message and a user message."
      assert _msgs[0] == {"role": "system", "content": "Answer only from the context."}, "The first message should be the system rule: Answer only from the context."
      assert _msgs[1].get("role") == "user" and "What is RAG?" in _msgs[1].get("content", "") and "RAG retrieves documents" in _msgs[1].get("content", ""), "The user message should contain both the context and the question."
      assert estimate_tokens(_p) == sum(len(m["content"]) for m in _msgs) // 4, "estimate_tokens should be the total characters of all message contents // 4."
    `,
    solution: py`
      def build_payload(question, context):
          return {
              "model": "local-llama",
              "temperature": 0,
              "messages": [
                  {"role": "system", "content": "Answer only from the context."},
                  {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"},
              ],
          }

      def estimate_tokens(payload):
          return sum(len(m["content"]) for m in payload["messages"]) // 4

      p = build_payload("What is MLOps?", "MLOps runs ML models in production.")
      print(p)
      print(estimate_tokens(p))
    `,
  },

  "numpy-to-pytorch": {
    task: "The training loop computes the gradients but never updates the model. Add the two update lines so the model learns `w` close to 3 and `b` close to -1.",
    hint: "Gradient descent moves against the gradient: `w -= lr * grad_w` and `b -= lr * grad_b`.",
    starter: py`
      import numpy as np

      rng = np.random.default_rng(0)
      x = rng.uniform(-1, 1, 200)
      y = 3.0 * x - 1.0 + rng.normal(0, 0.05, 200)
      w, b, lr = 0.0, 0.0, 0.1

      for step in range(300):
          pred = w * x + b
          err = pred - y
          grad_w = 2 * (err * x).mean()
          grad_b = 2 * err.mean()
          # TODO: update w and b using lr and the gradients

      print(round(float(w), 2), round(float(b), 2))
    `,
    check: py`
      assert abs(float(w) - 3.0) < 0.1, f"w should end close to 3.0, you have {float(w):.3f}. Update it with w -= lr * grad_w"
      assert abs(float(b) + 1.0) < 0.1, f"b should end close to -1.0, you have {float(b):.3f}. Update it with b -= lr * grad_b"
    `,
    solution: py`
      import numpy as np

      rng = np.random.default_rng(0)
      x = rng.uniform(-1, 1, 200)
      y = 3.0 * x - 1.0 + rng.normal(0, 0.05, 200)
      w, b, lr = 0.0, 0.0, 0.1

      for step in range(300):
          pred = w * x + b
          err = pred - y
          grad_w = 2 * (err * x).mean()
          grad_b = 2 * err.mean()
          w -= lr * grad_w
          b -= lr * grad_b

      print(round(float(w), 2), round(float(b), 2))
    `,
  },

  "rag-from-scratch": {
    task: "Finish `retrieve(query, k=2)`. Score every chunk by how many lowercase words it shares with the query, and return the texts of the top `k` chunks, best first. Skip chunks that share no words, so an unrelated query returns an empty list.",
    hint: "`set(query.lower().split()) & set(chunk.lower().split())` gives the shared words. Sort `(score, chunk)` pairs with `reverse=True`.",
    starter: py`
      chunks = [
          "MLOps automates training and deployment of models",
          "RAG retrieves documents and adds them to the prompt",
          "Vector databases store embeddings for fast search",
          "Cricket is played with a bat and ball",
      ]

      def retrieve(query, k=2):
          # TODO: score = number of shared lowercase words
          # TODO: keep scores above 0, best first, return the top k texts
          return []

      print(retrieve("how does RAG build the prompt"))
    `,
    check: py`
      _r = retrieve("how does RAG build the prompt")
      assert _r and _r[0] == chunks[1], "For 'how does RAG build the prompt' the RAG chunk should come first."
      assert len(retrieve("models training deployment documents prompt embeddings search", k=2)) == 2, "Return at most k chunks."
      assert retrieve("vector search for embeddings", k=1) == [chunks[2]], "retrieve('vector search for embeddings', k=1) should return only the vector database chunk."
      assert retrieve("football world cup") == [], "When no words match, return an empty list instead of random chunks."
    `,
    solution: py`
      chunks = [
          "MLOps automates training and deployment of models",
          "RAG retrieves documents and adds them to the prompt",
          "Vector databases store embeddings for fast search",
          "Cricket is played with a bat and ball",
      ]

      def retrieve(query, k=2):
          query_words = set(query.lower().split())
          scored = []
          for chunk in chunks:
              score = len(query_words & set(chunk.lower().split()))
              if score > 0:
                  scored.append((score, chunk))
          scored.sort(key=lambda pair: pair[0], reverse=True)
          return [chunk for _, chunk in scored[:k]]

      print(retrieve("how does RAG build the prompt"))
    `,
  },

  "fastapi-model-service": {
    task: "Finish `handle(payload)` so it returns exactly these dicts: `{\"status\": 422, \"detail\": \"text required\"}` when text is missing or blank, `{\"status\": 422, \"detail\": \"too long\"}` when text is over 200 characters, and otherwise `{\"status\": 200, \"label\": ...}` where the label is `positive` if the text contains good or great (any case), else `neutral`.",
    hint: "Validate first, predict last. `text.strip()` is empty for blank text, and `text.lower()` makes the word check case-insensitive.",
    starter: py`
      def handle(payload):
          text = payload.get("text", "")
          # TODO: validate text, then return the right status and label
          return {"status": 200, "label": "neutral"}

      for p in [{"text": "Great course"}, {"text": "  "}, {}, {"text": "x" * 300}]:
          print(handle(p))
    `,
    check: py`
      assert handle({"text": "Great course"}) == {"status": 200, "label": "positive"}, "'Great course' should return status 200 and label 'positive' (ignore case)."
      assert handle({"text": "It is fine"}) == {"status": 200, "label": "neutral"}, "Text without good or great should be 'neutral'."
      assert handle({"text": "   "}) == {"status": 422, "detail": "text required"}, "Blank text should return {'status': 422, 'detail': 'text required'}."
      assert handle({}) == {"status": 422, "detail": "text required"}, "A missing text key should also return 422 'text required'."
      assert handle({"text": "x" * 201}) == {"status": 422, "detail": "too long"}, "Text over 200 characters should return {'status': 422, 'detail': 'too long'}."
    `,
    solution: py`
      def handle(payload):
          text = payload.get("text", "")
          if not text.strip():
              return {"status": 422, "detail": "text required"}
          if len(text) > 200:
              return {"status": 422, "detail": "too long"}
          lowered = text.lower()
          label = "positive" if ("good" in lowered or "great" in lowered) else "neutral"
          return {"status": 200, "label": label}

      for p in [{"text": "Great course"}, {"text": "  "}, {}, {"text": "x" * 300}]:
          print(handle(p))
    `,
  },

  "production-python-checklist": {
    task: "Finish `release_ready(checks)`. It returns a tuple `(ready, missing)`: `missing` is a sorted list of the `REQUIRED` items that are False or absent in `checks`, and `ready` is True only when nothing is missing.",
    hint: "`missing = sorted(item for item in REQUIRED if not checks.get(item, False))`, then `return (not missing, missing)`.",
    starter: py`
      REQUIRED = ["tests pass", "deps pinned", "secrets from env"]

      def release_ready(checks):
          # TODO: find required items that are not True in checks
          missing = []
          return True, missing

      print(release_ready({"tests pass": True, "deps pinned": False}))
    `,
    check: py`
      assert release_ready({"tests pass": True, "deps pinned": True, "secrets from env": True}) == (True, []), "All required items True should give (True, [])."
      assert release_ready({"tests pass": True, "deps pinned": False}) == (False, ["deps pinned", "secrets from env"]), "False or missing items should be listed, sorted: (False, ['deps pinned', 'secrets from env'])."
      assert release_ready({}) == (False, sorted(REQUIRED)), "An empty dict should list every required item."
    `,
    solution: py`
      REQUIRED = ["tests pass", "deps pinned", "secrets from env"]

      def release_ready(checks):
          missing = sorted(item for item in REQUIRED if not checks.get(item, False))
          return (not missing, missing)

      print(release_ready({"tests pass": True, "deps pinned": False}))
    `,
  },

  // ---------------- Module 5 · reference ----------------
  "builtin-functions-reference": {
    task: "Using only built-in functions (no imports), set `best` to the name with the highest score, `avg` to the mean score rounded to 3 decimals, and `ranked` to the names sorted by score, highest first.",
    hint: "`max(records, key=lambda r: r[1])[0]`, `round(sum(...) / len(...), 3)` and `sorted(records, key=lambda r: r[1], reverse=True)`.",
    starter: py`
      records = [("mini", 0.91), ("large", 0.95), ("haiku", 0.89)]
      best = ""     # TODO: max with a key
      avg = 0.0     # TODO: mean, 3 decimals
      ranked = []   # TODO: names, highest score first
      print(best, avg, ranked)
    `,
    check: py`
      assert "import" not in source, "Use built-ins only, no imports."
      assert best == "large", "best should be 'large'. Try max(records, key=lambda r: r[1])[0]."
      assert avg == 0.917, f"avg should be round((0.91 + 0.95 + 0.89) / 3, 3) = 0.917, you have {avg}"
      assert ranked == ["large", "mini", "haiku"], f"ranked should be ['large', 'mini', 'haiku'], you have {ranked}"
    `,
    solution: py`
      records = [("mini", 0.91), ("large", 0.95), ("haiku", 0.89)]
      best = max(records, key=lambda r: r[1])[0]
      avg = round(sum(r[1] for r in records) / len(records), 3)
      ranked = [name for name, _ in sorted(records, key=lambda r: r[1], reverse=True)]
      print(best, avg, ranked)
    `,
  },

  "string-methods-reference": {
    task: "Parse `line` into the dict `fields` with `split()` and `partition(\"=\")`, using lowercase keys. Then set `slow` to True if `latency_ms` is above 5000.",
    hint: "`for part in line.split(): key, _, value = part.partition(\"=\")`. Convert with `int(...)` before comparing.",
    starter: py`
      line = "LEVEL=warn Model=mini latency_ms=8421 ok=false"
      fields = {}    # TODO: lowercase keys, text values
      slow = False   # TODO
      print(fields, slow)
    `,
    check: py`
      assert fields == {"level": "warn", "model": "mini", "latency_ms": "8421", "ok": "false"}, f"fields should have lowercase keys and text values, you have {fields}"
      assert slow is True, "slow should be True because 8421 is above 5000. Convert with int() first."
    `,
    solution: py`
      line = "LEVEL=warn Model=mini latency_ms=8421 ok=false"
      fields = {}
      for part in line.split():
          key, _, value = part.partition("=")
          fields[key.lower()] = value
      slow = int(fields["latency_ms"]) > 5000
      print(fields, slow)
    `,
  },

  "collection-methods-reference": {
    task: "Using sets: set `both` to the sorted ids in both cohorts, `only_a` to the sorted ids only in `a`, and `overlap` to the number of shared ids divided by the number of all unique ids, rounded to 2 decimals.",
    hint: "`set(a) & set(b)` is the overlap, `set(a) - set(b)` is only-a, `set(a) | set(b)` is everyone.",
    starter: py`
      a = ["u1", "u2", "u3", "u4", "u2"]
      b = ["u4", "u5", "u2"]
      both = []      # TODO
      only_a = []    # TODO
      overlap = 0.0  # TODO
      print(both, only_a, overlap)
    `,
    check: py`
      assert both == ["u2", "u4"], f"both should be sorted(set(a) & set(b)), you have {both}"
      assert only_a == ["u1", "u3"], f"only_a should be sorted(set(a) - set(b)), you have {only_a}"
      assert overlap == 0.4, f"overlap should be round(2 / 5, 2) = 0.4, you have {overlap}"
    `,
    solution: py`
      a = ["u1", "u2", "u3", "u4", "u2"]
      b = ["u4", "u5", "u2"]
      sa, sb = set(a), set(b)
      both = sorted(sa & sb)
      only_a = sorted(sa - sb)
      overlap = round(len(sa & sb) / len(sa | sb), 2)
      print(both, only_a, overlap)
    `,
  },

  "keywords-operators-exceptions-reference": {
    task: "Finish `call_with_retry(fn, attempts=3)`. Call `fn()`. If it raises `TimeoutError`, try again, up to `attempts` calls in total, and let the last `TimeoutError` escape. If it raises `ValueError`, stop at once and re-raise it. Return the result when it works.",
    hint: "Loop `for attempt in range(attempts):` with `try: return fn()` and `except TimeoutError:` that re-raises only on the last attempt. A `ValueError` is not caught, so it escapes on its own.",
    starter: py`
      def call_with_retry(fn, attempts=3):
          # TODO: retry on TimeoutError, re-raise ValueError right away
          return fn()

      outcomes = iter(["timeout", "timeout", "ok"])

      def flaky():
          if next(outcomes) == "timeout":
              raise TimeoutError("slow")
          return "hello"

      print(call_with_retry(flaky))
    `,
    check: py`
      _calls = {"n": 0}

      def _two_timeouts():
          _calls["n"] += 1
          if _calls["n"] < 3:
              raise TimeoutError("slow")
          return "ok"

      assert call_with_retry(_two_timeouts) == "ok", "Two timeouts then a success should return 'ok'."

      _calls["n"] = 0

      def _always_timeout():
          _calls["n"] += 1
          raise TimeoutError("down")

      try:
          call_with_retry(_always_timeout, attempts=3)
      except TimeoutError:
          pass
      else:
          raise AssertionError("After 3 failed attempts, let the last TimeoutError escape.")
      assert _calls["n"] == 3, f"With attempts=3, call fn exactly 3 times. It was called {_calls['n']} times."

      _calls["n"] = 0

      def _bad_key():
          _calls["n"] += 1
          raise ValueError("bad key")

      try:
          call_with_retry(_bad_key)
      except ValueError:
          pass
      else:
          raise AssertionError("A ValueError should be re-raised, not swallowed.")
      assert _calls["n"] == 1, "Do not retry on ValueError. Stop after the first call."
    `,
    solution: py`
      def call_with_retry(fn, attempts=3):
          for attempt in range(attempts):
              try:
                  return fn()
              except TimeoutError:
                  if attempt == attempts - 1:
                      raise

      outcomes = iter(["timeout", "timeout", "ok"])

      def flaky():
          if next(outcomes) == "timeout":
              raise TimeoutError("slow")
          return "hello"

      print(call_with_retry(flaky))
    `,
  },
};

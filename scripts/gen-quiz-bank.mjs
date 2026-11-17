import { writeFileSync } from "node:fs";

function options(labels) {
  return labels.map((label, index) => ({ id: String(index), label }));
}

function choice(prompt, labels, answer, why) {
  return { kind: "choice", prompt, options: options(labels), answer: String(answer), why };
}

function predict(prompt, code, labels, answer, why) {
  if (Array.isArray(code)) {
    return choice(prompt, code, labels, answer);
  }
  return { kind: "predict", prompt, code, options: options(labels), answer: String(answer), why };
}

function bug(prompt, code, labels, answer, why) {
  return { kind: "bug", prompt, code, options: options(labels), answer: String(answer), why };
}

function blank(prompt, accept, why, code) {
  return { kind: "blank", prompt, accept, answer: accept[0], why, ...(code ? { code } : {}) };
}

function lesson(slug, items) {
  return {
    slug,
    title: "Easy questions",
    questions: items.map((item, index) => ({ id: `q${index + 1}`, ...item })),
  };
}

const lessons = [
  lesson("why-python-for-ai", [
    choice("What is Python?", ["A programming language", "A chart", "A certificate"], 0, "Python is a language. You write steps and the computer follows them."),
    choice("How do you run code in this course?", ["Install Python first", "Press Run in the browser", "Email a teacher"], 1, "Press Run. Python loads in the browser. Nothing to install."),
    predict("What does this print?", 'print("Hello")\nprint(2 + 2)', ["Hello, then 4", "Hello only", "Nothing"], 0, "print shows each result. 2 + 2 is 4."),
    blank("The function that shows text is ____.", ["print"], "print(...) is how you see a result."),
    bug("Which line is a note Python skips?", '# this is a note\nprint("hi")', ["Line 1, because it starts with #", "Line 2, because it uses print", "Both lines"], 0, "A line that starts with # is a comment. Python skips it."),
  ]),
  lesson("syntax-and-comments", [
    choice("Where does Python start reading?", ["The top line", "The last line", "A random line"], 0, "Python walks from the top of the file downward."),
    predict("score is 0.9. What prints?", 'score = 0.9\nif score > 0.7:\n    print("keep")\nprint("done")', ["keep, then done", "done only", "keep only"], 0, "The indented line runs because 0.9 > 0.7. The last line always runs."),
    blank("A comment starts with ____.", ["#"], "The # marks a note. Python does not run that line."),
    bug("What is wrong here?", 'if score > 0.7\n    print("keep")', ["The if line is missing a colon", "print is the wrong word", "The score is too high"], 0, "A colon ends the if line. Then the next line is indented."),
  ]),
  lesson("variables-types-operators", [
    choice("What is a variable?", ["A name on a box that holds a value", "A kind of loop", "A comment"], 0, "The name is the label. The value sits inside the box."),
    predict("What does this print?", "score = 0.91\nprint(type(score))", ["float", "int", "str"], 0, "A number with a decimal point is a float."),
    blank("True, False, and None start with a ____ letter.", ["capital", "uppercase", "big"], "Python writes True, False, and None with a capital letter."),
    bug("What is wrong here?", "ready = true", ["true should be True", "ready is a bad name", "The line needs print"], 0, "The boolean is True, with a capital T."),
  ]),
  lesson("casting-and-conversion", [
    choice("What is float(\"0.2\")?", ["The number 0.2", "The text 0.2", "An error"], 0, "float() reads the text and makes a real number."),
    predict("What does this print?", 'print(int("3"))', ["3", "\"3\"", "3.0"], 0, "int() turns the text \"3\" into the number 3."),
    blank("Turn the text \"0.2\" into a number with ____(\"0.2\").", ["float"], "float(\"0.2\") is the number 0.2."),
    bug("What is wrong here?", 'temperature = "0.2"\nprint(temperature + 1)', ["You cannot add text and a number", "0.2 is too small", "print is missing"], 0, "Cast first: float(\"0.2\") + 1 is 1.2."),
  ]),
  lesson("numbers-and-math", [
    choice("What is 7 / 2?", ["3.5", "3", "4"], 0, "A single slash always gives a float. 7 / 2 is 3.5."),
    predict("What does this print?", "scores = [0.82, 0.74, 0.91]\nprint(round(sum(scores) / len(scores), 2))", ["0.82", "2.47", "3"], 0, "Add the three scores, divide by 3, then round to two decimals."),
    blank("Whole-number division uses ____.", ["//"], "7 // 2 is 3. The leftover is dropped."),
    choice("A batch size is usually which type?", ["int", "str", "bool"], 0, "A count of rows is a whole number, an int."),
  ]),
  lesson("booleans-and-comparisons", [
    choice("What is 10 > 9?", ["True", "False", "None"], 0, "10 is bigger than 9, so the comparison is True."),
    predict("What does this print?", 'print(bool(""))', ["False", "True", "None"], 0, "An empty string is falsy. bool(\"\") is False."),
    blank("The two boolean values are True and ____.", ["False"], "True and False are the only boolean values."),
    bug("score is 0.0. What is wrong with this check?", "if score:\n    print(\"keep\")", ["0.0 is falsy, so the line never runs", "print is spelled wrong", "The indent is too big"], 0, "Use a comparison such as score >= 0.7. A bare if treats 0.0 as no."),
  ]),
  lesson("strings-and-text", [
    choice("What does strip() remove?", ["Spaces at the ends", "Every letter", "The first word"], 0, "strip() drops spaces on the ends and keeps the letters."),
    predict("What does this print?", 'print(len("RAG"))', ["3", "2", "4"], 0, "R, A, and G are three characters."),
    blank("An f-string starts with the letter ____ before the quotes.", ["f"], "f\"Hello {name}\" fills the name in."),
    bug("What is wrong with this hope?", 'name = "rag"\nname.upper()\nprint(name)', ["upper() does not change name", "print cannot show text", "rag is too short"], 0, "upper() returns a new string. Assign it: name = name.upper()."),
  ]),
  lesson("string-methods-and-formatting", [
    choice("What does a string method return?", ["A new string", "None, always", "A list of numbers"], 0, "Strings do not change in place. You get a new one back."),
    predict("What does this print?", 'print(" Hi ".strip().lower())', ["hi", " Hi ", "HI"], 0, "strip() leaves \"Hi\". lower() makes \"hi\"."),
    blank("Break a sentence into words with ____.", ["split", "split()"], "split() cuts on spaces and returns a list of words."),
    choice("What is the better way to build a long prompt?", ["Join a list of pieces", "Add strings with += in a loop", "Print each piece"], 0, "\" \".join(pieces) builds one string without a slow loop of copies."),
  ]),
  lesson("lists-tuples-sets", [
    choice("What is a list?", ["An ordered tray of items", "A single number", "A comment"], 0, "Items stay in order. You can add more."),
    predict("What does this print?", 'chunks = ["intro", "method"]\nprint(chunks[0])', ["intro", "method", "0"], 0, "Index 0 is the first item."),
    blank("A ____ drops duplicate items.", ["set"], "A set keeps each value once."),
    bug("What is wrong here?", 'docs = ["a"]\ndocs = docs.append("b")', ["append returns None, so docs is wiped", "append adds to the front", "The list cannot hold text"], 0, "Call docs.append(\"b\") and do not assign the result."),
  ]),
  lesson("dictionaries", [
    choice("What is a dictionary?", ["Labeled lockers of values", "An ordered tray only", "A yes-or-no value"], 0, "Each key is a label. The value sits inside."),
    predict("What does this print?", 'config = {"model": "mini"}\nprint(config["model"])', ["mini", "model", "config"], 0, "The key model opens the locker that holds mini."),
    blank("A safe lookup with a fallback is .____(key, default).", ["get"], ".get(\"top_p\", 1.0) returns 1.0 when the key is missing."),
    bug("What is wrong here?", 'config = {"model": "mini"}\nprint(config["temperature"])', ["temperature is missing, so this raises KeyError", "model is the wrong type", "print cannot show text"], 0, "Use config.get(\"temperature\", 0.2) when the key might be absent."),
  ]),
  lesson("control-flow", [
    choice("What is an if?", ["A fork that runs one path", "A loop that never stops", "A way to save a file"], 0, "The condition picks a path. The other path does not run."),
    predict("What does this print?", 'score = 0.82\nif score >= 0.7:\n    print("keep")\nelse:\n    print("drop")', ["keep", "drop", "keep and drop"], 0, "0.82 is at least 0.7, so the keep path runs."),
    blank("A ____ loop visits each item in a list.", ["for"], "for item in items: walks the tray once."),
    bug("What is wrong here?", "for label in labels\n    print(label)", ["The for line is missing a colon", "print is inside the loop", "label is a bad name"], 0, "The for line needs a colon, then an indented body."),
  ]),
  lesson("project-sentiment-checker", [
    choice("What does this project print for each review?", ["positive, negative, or neutral", "A random score", "The whole internet"], 0, "It compares good words and bad words, then picks a label."),
    predict("A review has 2 good words and 0 bad words. The label is?", ["positive", "negative", "neutral"], 0, "More good words than bad words means positive."),
    blank("The five reviews live in a ____.", ["list"], "A list holds the reviews in order."),
    choice("When good words and bad words are equal, the label is?", ["neutral", "positive", "an error"], 0, "A tie is neutral."),
  ]),
  lesson("functions", [
    choice("What does def do?", ["Builds a function", "Prints a value", "Deletes a variable"], 0, "def names the machine. It does not run it yet."),
    predict("What does this print?", 'def greet(name):\n    return "hello " + name\nprint(greet("model"))', ["hello model", "model", "None"], 0, "The call sends model in. return sends hello model out."),
    blank("The word that sends a value out of a function is ____.", ["return"], "return hands the result back to the caller."),
    bug("What is wrong with this default?", "def add_item(item, items=[]):\n    items.append(item)\n    return items", ["The default list is shared across calls", "append cannot add text", "return is in the wrong place"], 0, "Use items=None and create a new list inside the function."),
  ]),
  lesson("lambda-map-filter", [
    choice("What is a lambda?", ["A one-line function with no name", "A type of list", "A file"], 0, "lambda is a tiny function you can pass around."),
    predict("Which row comes first?", 'rows = [{"score": 0.4}, {"score": 0.9}]\nprint(sorted(rows, key=lambda row: row["score"])[0]["score"])', ["0.4", "0.9", "score"], 0, "sorted uses the lambda and puts the smaller score first."),
    blank("A sort key is written key=____ row: row[\"score\"].", ["lambda"], "key=lambda row: row[\"score\"] tells sorted what to compare."),
    choice("For a new list of high scores, what is the clearer tool?", ["A comprehension", "map plus a lambda", "A bare except"], 0, "A comprehension reads more clearly than map or filter for this job."),
  ]),
  lesson("comprehensions-and-generators", [
    choice("What does a comprehension build?", ["A new list from a rule", "A file on disk", "A class"], 0, "The rule decides which items go into the new list."),
    predict("What does this print?", "scores = [0.4, 0.9]\nprint([s for s in scores if s >= 0.7])", ["[0.9]", "[0.4, 0.9]", "[]"], 0, "Only 0.9 passes the test."),
    blank("A generator function uses the word ____.", ["yield"], "yield hands back one value and pauses."),
    bug("What is wrong with this second loop?", "nums = (n for n in [1, 2])\nprint(list(nums))\nprint(list(nums))", ["The second list is empty", "The first list is empty", "n is a bad name"], 0, "A generator is single-use. The second pass finds nothing left."),
  ]),
  lesson("iterators-and-iterables", [
    choice("What is special about an iterator?", ["You can walk it once", "It stores every value twice", "It is always a string"], 0, "After the items are used, the iterator looks empty."),
    predict("What does this print?", 'print(list(zip(["cat", "dog"], [0, 1])))', ["[('cat', 0), ('dog', 1)]", "[cat, dog]", "[0, 1]"], 0, "zip pairs the first with the first, then the second with the second."),
    blank("____ pairs two lists, item by item.", ["zip"], "zip(predictions, labels) walks both together."),
    bug("What is wrong here?", "rows = iter([1, 2])\nprint(list(rows))\nprint(list(rows))", ["The second print is empty", "iter cannot take a list", "print runs too early"], 0, "The iterator was already spent by the first list()."),
  ]),
  lesson("scope-and-closures", [
    choice("Where does a name inside a function live?", ["In that function, unless you say otherwise", "In every file at once", "Only in a class"], 0, "A name belongs to the room where it was written."),
    predict("What does this print?", "items = []\ndef add(x):\n    items.append(x)\nadd(1)\nprint(items)", ["[1]", "[]", "None"], 0, "append changes the same list. The outer name still sees it."),
    blank("To change a list you were given, call a method like ____.", ["append"], "append changes that list. Assigning a new name does not."),
    bug("What is the trap in this loop?", "funcs = []\nfor n in [1, 2]:\n    funcs.append(lambda: n)\nprint(funcs[0]())", ["Both lambdas see the last n", "The list stays empty", "lambda cannot be stored"], 0, "The lambdas look up n later, when the loop has finished."),
  ]),
  lesson("errors-and-exceptions", [
    choice("What does except do?", ["Runs when the matching error happens", "Runs on every line", "Deletes the error"], 0, "The net catches one kind of error so the program can continue."),
    predict("payload has no temperature. What prints?", 'payload = {"model": "mini"}\ntry:\n    print(payload["temperature"])\nexcept KeyError:\n    print("missing")', ["missing", "mini", "The program crashes"], 0, "The missing key raises KeyError, and except prints missing."),
    blank("Read the traceback from the ____ up.", ["bottom"], "The last line of the traceback names the error."),
    bug("What is wrong here?", "try:\n    risky()\nexcept:\n    pass", ["A bare except hides every error", "try is spelled wrong", "pass is too short"], 0, "Catch the error you expect, such as KeyError, and handle that one."),
  ]),
  lesson("files-and-json", [
    choice("What does with open(...) do at the end?", ["Closes the file for you", "Deletes the file", "Prints the file"], 0, "Leaving the with block closes the door."),
    predict("Which call reads JSON text that is already a string?", ["json.loads(text)", "json.load(text)", "json.dump(text)"], 0, "loads reads a string. load reads a file."),
    blank("Open text files with encoding=____.", ["utf-8", "\"utf-8\""], "utf-8 reads the letters the same way on every computer."),
    bug("What is wrong here?", 'open("notes.txt").read()', ["The file is never closed", "read cannot see text", "The name is too long"], 0, "Use with open(...) as handle: so the file closes."),
  ]),
  lesson("first-real-ai-call", [
    choice("What do you send to the model?", ["A request dict", "A screenshot", "A certificate"], 0, "The dict holds the model name and the messages."),
    predict("Which keys belong in a chat request?", ["model and messages", "only a password", "only a file path"], 0, "The model needs to know who it is and what was said."),
    blank("The reply text comes back; a strange reply should not ____ the program.", ["crash", "stop", "break"], "Check the reply and show a calm message when it looks odd."),
    choice("Where can you try this with no API key?", ["A local model, such as Ollama", "Only a paid website", "Only inside a spreadsheet"], 0, "A local model lets you practice the same request loop for free."),
  ]),
  lesson("classes-and-objects", [
    choice("What is a class?", ["A blueprint for objects", "A single number", "A comment"], 0, "The class describes the object. Each object is one built thing."),
    predict("What does this print?", 'class Client:\n    def __init__(self, model):\n        self.model = model\nprint(Client("mini").model)', ["mini", "Client", "model"], 0, "self.model stores mini on that one object."),
    blank("Inside a method, the object itself is called ____.", ["self"], "self is how the method reaches that object's data."),
    bug("What is wrong here?", "class Client:\n    def __init__(model):\n        model = model", ["The method forgot self", "class is the wrong word", "mini is missing"], 0, "The first parameter is self, then the model name."),
  ]),
  lesson("inheritance-and-polymorphism", [
    choice("What is a shared interface?", ["The same method names on different classes", "One giant function", "A private file"], 0, "Calling code uses the names and does not care which class it has."),
    predict("Both classes have search(). What can you call?", ["search() on either object", "only the first class", "only print"], 0, "If the method is there, the call works."),
    blank("A subclass ____ from a parent class.", ["inherits"], "The subclass reuses the parent and can override a method."),
    choice("What do sklearn estimators share?", ["fit and predict", "only print", "only open"], 0, "fit learns. predict answers. The names stay the same."),
  ]),
  lesson("decorators-and-context-managers", [
    choice("What does a decorator return?", ["A function", "A number", "A file path"], 0, "It wraps a function and hands a function back."),
    predict("What does with do when the block ends?", ["Closes the resource", "Deletes your code", "Runs the block twice"], 0, "The door shuts even if something goes wrong inside."),
    blank("Copy a wrapped function's name with functools.____.", ["wraps"], "wraps keeps the original name and notes."),
    bug("What is wrong here?", "def wrapper(func):\n    def inner():\n        return func()\n    return inner()", ["The decorator calls inner instead of returning it", "func is a bad name", "return is not allowed"], 0, "Return inner without calling it. The caller will call it later."),
  ]),
  lesson("regular-expressions", [
    choice("What is a regular expression good at?", ["Finding a text shape", "Training a model", "Opening a port"], 0, "You describe the shape. re finds the matching text."),
    predict("Which job fits re.findall?", ["Pull every email out of a log", "Add two numbers", "Save a JSON file"], 0, "findall returns each match."),
    blank("The regex module is named ____.", ["re"], "import re, then call re.search or re.findall."),
    choice("Before a prompt leaves your system, what might you redact?", ["Email addresses", "The word def", "Blank lines only"], 0, "A pattern can replace private text with a placeholder."),
  ]),
  lesson("dates-and-times", [
    choice("What should you store timestamps in?", ["UTC", "Whatever the laptop shows", "A float of dollars"], 0, "UTC is one clock for every machine."),
    predict("A training window starts Monday and ends Wednesday. What do you measure?", ["The duration between the two times", "The file size", "The model name"], 0, "Subtract the two datetimes to get a timedelta."),
    blank("A length of time you can add to a date is a time____.", ["delta", "timedelta"], "timedelta(days=1) moves the clock forward one day."),
    choice("Daily token reports group rows by what?", ["The day", "The letter a", "The indent"], 0, "Group timestamps by date to get one total per day."),
  ]),
  lesson("standard-library-toolkit", [
    choice("What does Counter do?", ["Counts how often each item appears", "Opens a website", "Trains a model"], 0, "Counter is a tally. It is perfect for label counts."),
    predict("Which tool makes a unique request id?", ["uuid", "print", "len"], 0, "uuid4() gives a new id that is very unlikely to collide."),
    blank("A fingerprint of text comes from hash____.", ["lib", "hashlib"], "hashlib can hash a prompt so you can spot duplicates."),
    choice("Where do these tools live?", ["In Python's standard library", "Only in a paid package", "Only in a browser"], 0, "collections, uuid, and hashlib ship with Python."),
  ]),
  lesson("modules-and-environments", [
    choice("Where do imports go?", ["At the top of the file", "Inside every loop", "After the last line"], 0, "Readers and tools expect imports first."),
    predict("When does the code under if __name__ == \"__main__\" run?", ["When you run the file directly", "On every import", "Never"], 0, "Importing the file skips that block."),
    blank("A private shelf of packages for one project is a ____.", ["venv", "virtualenv", "environment"], "One project, one venv, so versions do not clash."),
    bug("What is wrong here?", "def train():\n    import math\n    return math.sqrt(9)", ["The import is hidden inside the function", "sqrt is wrong", "9 is not a number"], 0, "Put import math at the top. math.sqrt(9) is 3."),
  ]),
  lesson("packages-and-pip", [
    choice("What is a package?", ["A folder of modules", "A single number", "A comment"], 0, "A module is one file. A package groups modules."),
    predict("What file lists the libraries to install?", ["requirements.txt", "notes.md", "index.html"], 0, "pip installs the lines in that shopping list."),
    blank("The installer command is ____ install.", ["pip"], "pip install -r requirements.txt reads the list."),
    choice("Why pin versions?", ["So a rerun uses the same libraries", "So the file is shorter", "So print runs faster"], 0, "A pin stops a surprise upgrade from changing your results."),
  ]),
  lesson("project-experiment-tracker", [
    choice("What does this project save?", ["Each run's settings and scores", "Only a photo", "The whole internet"], 0, "Every run becomes a record you can compare later."),
    predict("Two runs have scores 0.70 and 0.91. Which do you keep?", ["0.91", "0.70", "Neither"], 0, "The higher score is the better run, if higher means better."),
    blank("The records are stored as ____.", ["JSON", "json"], "JSON keeps the settings and the scores in one file."),
    choice("What big tool does the same job for a team?", ["MLflow", "A spreadsheet of photos", "A CSS file"], 0, "MLflow tracks runs at team scale. The idea is the same."),
  ]),
  lesson("type-hints-and-dataclasses", [
    choice("What does a type hint describe?", ["What kind of value belongs there", "The color of the page", "The file size"], 0, "The hint says str, int, or float so mistakes show up early."),
    predict("What does this say?", "def score(text: str) -> int:\n    return len(text)", ["text is str, and the result is int", "text is int", "There is no return"], 0, "The argument is text. The return is a count, an int."),
    blank("A small typed record can be a data____.", ["class", "dataclass"], "@dataclass builds a record with named fields."),
    bug("What is wrong here?", 'rate: float = "0.2"', ["A string is sitting where a float belongs", "float is a bad word", "The name is too short"], 0, "Use rate: float = 0.2, or cast the text first."),
  ]),
  lesson("numpy-arrays", [
    choice("What does shape tell you?", ["How the numbers are arranged", "The file name", "The author's name"], 0, "shape might say 3 rows and 4 columns."),
    predict("Two embeddings are arrays. What do you compare?", ["Their direction, with cosine similarity", "Their variable names", "Their comments"], 0, "Cosine similarity asks how aligned the two vectors are."),
    blank("The number kind of an array is its ____.", ["dtype"], "float32 is a common dtype for model weights."),
    choice("Why center an embedding?", ["So a shared offset does not dominate the comparison", "So the file is smaller on disk", "So print is quieter"], 0, "Subtract the mean, then compare the leftover pattern."),
  ]),
  lesson("pandas-dataframes", [
    choice("What is a DataFrame?", ["A table with named columns", "A single boolean", "A decorator"], 0, "Rows are examples. Columns are fields."),
    predict("You want only the rows where the score is high. What do you do?", ["Filter the rows", "Delete the column names", "Open a socket"], 0, "A filter keeps the rows that pass the test."),
    blank("A per-model report often uses group____.", ["by", "groupby"], "groupby(\"model\") gathers the rows for each model."),
    choice("What should you avoid on a big table?", ["Looping cell by cell in Python", "Naming the columns", "Saving the file"], 0, "Column operations are clearer and much faster."),
  ]),
  lesson("statistics-for-ml", [
    choice("What is the mean?", ["The sum divided by the count", "The middle card", "The largest value"], 0, "Add the numbers, then divide by how many there are."),
    predict("Scores are 120, 130, 140, and 9000. Which moves more?", ["The mean", "The median", "Neither"], 0, "9000 pulls the mean up. The median stays near the middle of the small numbers."),
    blank("A sample standard deviation in pandas uses ddof=____.", ["1"], "ddof=1 is the sample version, the usual choice for a sample of rows."),
    choice("What is a p95 latency?", ["A value slower than 95% of the requests", "The mean", "The fastest request"], 0, "Only 5% of requests are slower than the p95."),
  ]),
  lesson("data-distributions-and-plots", [
    choice("What is a histogram for?", ["The shape of one column", "A single string", "A class blueprint"], 0, "It shows how often values fall in each bin."),
    predict("You want to see score against loss. Which plot?", ["A scatter", "A single number", "A comment"], 0, "A scatter puts one value on each axis."),
    blank("Make a repeatable random draw with a ____.", ["seed"], "np.random.default_rng(seed) gives the same draws again."),
    choice("What does fig, ax = plt.subplots() give you?", ["A figure and an axes to draw on", "A trained model", "A database"], 0, "You draw on ax, then show or save fig."),
  ]),
  lesson("sklearn-regression", [
    choice("What does fit do?", ["Learns from the training rows", "Deletes the test rows", "Prints a chart"], 0, "fit looks at X and y and stores a pattern."),
    predict("Which shape is X?", ["2D, one row per example", "A single string", "A boolean"], 0, "X is a table. y is one number per row."),
    blank("Split the rows ____ you fit.", ["before"], "The test rows must stay unseen until scoring."),
    bug("What is wrong here?", "scaler.fit(X_test)\nmodel.fit(X_train, y_train)", ["The scaler saw the test rows", "fit is the wrong name", "y_train is missing"], 0, "Fit the scaler on the training rows only."),
  ]),
  lesson("sklearn-classification", [
    choice("What does accuracy hide when one class is rare?", ["Misses on that rare class", "The column names", "The file path"], 0, "A model can look accurate by always saying the common class."),
    predict("4 messages, 1 predicted spam, and that one is right. Precision on spam is?", ["1.0, the spam guess was right", "0, because most are ham", "4"], 0, "Precision asks: of the spam guesses, how many were spam?"),
    blank("The chance of each class comes from predict____.", ["proba", "predict_proba"], "predict_proba gives scores you can threshold."),
    choice("Must the decision threshold be 0.5?", ["No", "Yes, always", "Only on Tuesdays"], 0, "You can pick a threshold that fits the cost of a miss."),
  ]),
  lesson("sklearn-pipelines-and-clustering", [
    choice("Why put steps inside a Pipeline?", ["So the order stays fixed", "So the file is shorter", "So print is louder"], 0, "The same steps run on train and on new rows."),
    predict("A color column has no order. How do you encode it?", ["One-hot", "As a single bigger number", "As a boolean of the file size"], 0, "One-hot makes a column per color, with no fake ranking."),
    blank("Before K-means, ____ the numbers.", ["scale", "standardize"], "Scaling stops a huge column from dominating the distance."),
    choice("What is z = (x - mean) / std?", ["A scaled value", "A file path", "A class name"], 0, "Subtract the mean and divide by the spread."),
  ]),
  lesson("databases-with-python", [
    choice("What is a placeholder for?", ["A value you pass separately from the SQL", "A comment", "A plot color"], 0, "The database treats it as data, not as part of the question."),
    predict("Which is the safe call?", ['cursor.execute("select * from t where id = ?", (3,))', 'cursor.execute(f"select * from t where id = {user}")', "Neither"], 0, "The ? keeps the value out of the SQL text."),
    blank("A throwaway demo database can use ____.", [":memory:", "memory"], ":memory: lives in RAM and disappears when you close it."),
    bug("What is wrong here?", 'cursor.execute(f"delete from users where name = \'{name}\'")', ["The name is pasted into the SQL", "delete is a Python keyword", "The table is missing quotes"], 0, "Pass the value with a placeholder instead."),
  ]),
  lesson("testing-with-pytest", [
    choice("What does assert do in a test?", ["Fails the test when the check is false", "Trains a model", "Opens a port"], 0, "A failed assert is how you hear that something changed."),
    predict("Why mock the model client?", ["So the test does not call the network", "So the test is slower", "So the prompt is deleted"], 0, "A fake client returns a fixed reply."),
    blank("A test function name starts with ____.", ["test", "test_"], "pytest finds functions whose names start with test."),
    choice("What is an accuracy gate?", ["A test that fails when the score drops", "A CSS rule", "A comment"], 0, "The build stops if the new score is worse than the floor."),
  ]),
  lesson("logging-and-configuration", [
    choice("What belongs in a log line?", ["The model name and the latency", "The API key", "The user's password"], 0, "Log what you need to debug. Leave secrets out."),
    predict("A call fails in production. What helps you reconstruct it?", ["The log of the config and the timing", "A blank file", "The font"], 0, "The diary line tells you what was asked and how long it took."),
    blank("Never write an API ____ into the log.", ["key", "token", "secret"], "A key in a log is a key in the wrong hands."),
    bug("What is wrong here?", 'logger.info("key=%s", api_key)', ["The secret is written to the log", "info is the wrong level for everything", "logger cannot take a string"], 0, "Log that a call happened. Do not log the key."),
  ]),
  lesson("project-spam-classifier", [
    choice("What does the model learn?", ["Which words lean spam, from labeled examples", "A hand-written word list only", "The page color"], 0, "Nobody writes the rules. The model learns them from examples."),
    predict("When do you split into train and test?", ["Before fit", "After you publish the score", "Never"], 0, "Fit on train. Score on rows the model has not seen."),
    blank("A normal message is often called ____.", ["ham"], "Spam is the unwanted class. Ham is the normal one."),
    choice("What do you save at the end?", ["The model file", "Only a screenshot", "The test answers inside the training rows"], 0, "A saved file is what a later service can load."),
  ]),
  lesson("async-python", [
    choice("What does await mean?", ["Pause here, and let other work wait too", "Stop the whole computer", "Delete the function"], 0, "The function waits without blocking every other task."),
    predict("Ten calls that each wait on the network. What helps?", ["asyncio.gather", "time.sleep in a loop", "A bare except"], 0, "gather starts them together so the waits overlap."),
    blank("A cap on how many calls run at once is a ____.", ["semaphore"], "A semaphore keeps you from opening too many calls at once."),
    bug("What is wrong here?", "async def load():\n    time.sleep(2)", ["time.sleep blocks the whole loop", "async is the wrong word", "2 is too small"], 0, "Use await asyncio.sleep(2) so other tasks can run."),
  ]),
  lesson("calling-llm-apis", [
    choice("What is temperature 0 good for?", ["A steady, less random reply", "The longest possible story", "Skipping the timeout"], 0, "Low temperature keeps the reply closer to the same answer."),
    predict("Which failure is worth a retry?", ["A temporary network timeout", "A wrong API key", "A bad JSON shape you wrote"], 0, "Retry the blip. Fix the key or the payload yourself."),
    blank("The request body includes model, messages, temperature, and max____.", ["tokens", "max_tokens"], "max_tokens caps how long the reply can be."),
    bug("What is wrong here?", "reply = call_model(payload)  # no timeout", ["The call can hang forever", "payload is a bad name", "The comment is too short"], 0, "Set a timeout so a stuck call cannot freeze the app."),
  ]),
  lesson("numpy-to-pytorch", [
    choice("What is a tensor?", ["An array that can remember how it was computed", "A text file", "A CSS class"], 0, "That memory is what backward() uses."),
    predict("What is the training order?", ["zero_grad, forward, loss, backward, step", "step, then forward", "only print"], 0, "Clear old gradients, compute the loss, then update."),
    blank("Inference should run under torch.no____.", ["grad", "no_grad"], "no_grad skips the extra memory you only need for training."),
    choice("What does model.eval() change?", ["Layers like dropout behave for inference", "The file name", "The Python version"], 0, "eval() is the inference switch. train() is the learning switch."),
  ]),
  lesson("rag-from-scratch", [
    choice("What is the RAG order?", ["Chunk, find, then ask", "Ask, then hope", "Train a new model first"], 0, "Find the right notes before you ask the model."),
    predict("The answer is wrong but the chunks are irrelevant. What do you fix first?", ["The search", "The model's personality", "The font"], 0, "A model cannot use notes it was never given."),
    blank("Overlap between chunks keeps a fact from being ____ in half.", ["cut", "split"], "A little overlap means a sentence on the edge still appears whole."),
    choice("What should you store with each chunk?", ["The source it came from", "The user's password", "A random label"], 0, "The source lets you show where the answer came from."),
  ]),
  lesson("fastapi-model-service", [
    choice("When do you load the model?", ["Once, when the service starts", "On every request", "Never"], 0, "Loading is slow. Do it once and reuse it."),
    predict("What is the difference between /health and /ready?", ["/ready means the model is loaded", "They are the same", "/health runs a training job"], 0, "Health means the process is up. Ready means it can answer."),
    blank("A request with no question should be ____.", ["rejected", "invalid", "a validation error"], "Make question required so an empty call fails clearly."),
    bug("What is wrong here?", "def predict(q):\n    model = load_model()\n    return model(q)", ["The model loads on every call", "predict is a bad name", "q is too short"], 0, "Load once at startup and reuse that object."),
  ]),
  lesson("production-python-checklist", [
    choice("What does a pin do?", ["Locks a library version", "Deletes the tests", "Hides the logs"], 0, "A rerun installs the same versions."),
    predict("Why set a random seed?", ["So a rerun can match", "So the model is always perfect", "So logs disappear"], 0, "The seed makes the random draws repeatable."),
    blank("Run ruff, mypy, and ____ before you ship.", ["pytest"], "pytest is the check that the behavior still holds."),
    choice("What should a run log include?", ["The config it used", "The API key", "Nothing"], 0, "The config tells you which settings produced the score."),
  ]),
  lesson("project-ask-my-notes", [
    choice("What does this bot answer from?", ["Your notes", "Whatever the model remembers", "A random file"], 0, "The notes are retrieved and placed in the prompt."),
    predict("What happens before the model is asked?", ["The matching chunks are found", "The model is retrained", "The notes are deleted"], 0, "Search first. Then build the prompt."),
    blank("The prompt should include the retrieved ____.", ["chunks", "notes"], "The chunks are the open book the model answers from."),
    choice("What do you attach so a reader can check the answer?", ["The source of the chunk", "A new API key", "The training set"], 0, "A source lets you confirm the line really came from the notes."),
  ]),
  lesson("builtin-functions-reference", [
    choice("Which check is preferred?", ["isinstance(score, float)", "type(score) is float", "score == float"], 0, "isinstance still works for subclasses. A strict type is float does not."),
    predict("What does this print?", 'print(float("0.91"))', ["0.91", "\"0.91\"", "1"], 0, "float() reads the text and returns a number."),
    blank("sorted, min, and max can take a ____= function.", ["key"], "key= tells them which value to compare."),
    choice("What does getattr(obj, \"model\", \"mini\") do when model is missing?", ["Returns mini", "Raises KeyError", "Deletes obj"], 0, "The third argument is the default."),
  ]),
  lesson("string-methods-reference", [
    choice("What must you do with a string method's result?", ["Assign it, or pass it on", "Nothing, the original changes", "Call print only"], 0, "The method returns a new string."),
    predict("What does this print?", 'print("a-b-c".split("-"))', ["['a', 'b', 'c']", "a-b-c", "abc"], 0, "split cuts the string on each dash."),
    blank("Join words with a space using \" \".____(words).", ["join"], "join is the clear way to build one string from a list."),
    bug("What is wrong here?", 'label = " Spam "\nlabel.strip().lower()\nprint(label)', ["The results are thrown away", "strip cannot remove spaces", "lower adds spaces"], 0, "Assign it: label = label.strip().lower()."),
  ]),
  lesson("collection-methods-reference", [
    choice("What is a set good for?", ["Asking whether an item is already there", "Keeping a strict order", "Storing two values per key"], 0, "Membership tests on a set are simple and fast."),
    predict("What does this print?", 'names = ["b", "a"]\nprint(names.sort())', ["None", "['a', 'b']", "['b', 'a']"], 0, "sort() changes the list and returns None. Use sorted() if you want a new list."),
    blank("A missing key can use dict.____(key, default).", ["get"], "get returns the default instead of raising KeyError."),
    choice("What does setdefault do?", ["Returns the value, and inserts the default if the key is new", "Deletes the key", "Sorts the dict"], 0, "It is a get that also writes the default in."),
  ]),
  lesson("keywords-operators-exceptions-reference", [
    choice("When do you use is?", ["For None, True, and False", "For every number", "For every string"], 0, "is asks whether it is the same object. == asks whether the values match."),
    predict("What does this print?", "value = 0\nif value:\n    print(\"yes\")\nelse:\n    print(\"no\")", ["no", "yes", "0"], 0, "0 is falsy, so the else path runs."),
    blank("Compare two numbers with ____.", ["=="], "== checks the values. is is for None, True, and False."),
    bug("What is wrong here?", "assert user_is_admin", ["assert can be switched off", "admin is a bad word", "The line needs a colon"], 0, "Do not use assert for a real security check. Use a normal if."),
  ]),
];

const expected = 52;
if (lessons.length !== expected) {
  throw new Error(`expected ${expected} lessons, got ${lessons.length}`);
}

const slugs = new Set();
for (const lesson of lessons) {
  if (slugs.has(lesson.slug)) throw new Error(`duplicate ${lesson.slug}`);
  slugs.add(lesson.slug);
  if (lesson.questions.length < 3 || lesson.questions.length > 5) {
    throw new Error(`${lesson.slug} has ${lesson.questions.length} questions`);
  }
  const kinds = new Set(lesson.questions.map((item) => item.kind));
  if (kinds.size < 2) throw new Error(`${lesson.slug} uses only one question kind`);
  for (const item of lesson.questions) {
    if (!item.why || item.why.length > 160) throw new Error(`${lesson.slug} why length`);
    if (item.kind === "blank") {
      if (!item.accept?.includes(item.answer)) throw new Error(`${lesson.slug} blank`);
    } else if (!item.options?.some((option) => option.id === item.answer)) {
      throw new Error(`${lesson.slug} answer`);
    }
  }
}

writeFileSync(
  new URL("../src/lib/python-course/quiz-bank.json", import.meta.url),
  `${JSON.stringify(lessons, null, 2)}\n`,
);
console.log(`wrote ${lessons.length} quizzes`);

import type { PythonLesson } from "./types";

/** Additional Module 3 lessons: statistics, distributions, plotting, scikit-learn, databases. */
export const MODULE_3B_LESSONS: PythonLesson[] = [
  {
    slug: "statistics-for-ml",
    title: "Statistics for machine learning",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 20,
    summary:
      "Mean, median, std, and percentiles - the numbers you report before you train.",
    whyForAi:
      "Median vs mean shows skew. p95 latency is what SLAs use. Averages alone hide problems.",
    packages: ["numpy"],
    sections: [
      {
        heading: "Mean, median, mode",
        basicTip: "Compare mean and median on a tiny latency list.",
        basicCode: `scores = [120, 130, 140, 9000]
mean = sum(scores) / len(scores)
median = sorted(scores)[len(scores) // 2]
print("mean", mean, "median", median)`,
        body: `Mean is the average. One outlier can pull it far.

Median is the middle value when sorted. It ignores extremes.

Mode is the most common value. It works on labels too.

If mean and median disagree a lot, the data is skewed. Quote the median.`,
      },
      {
        heading: "Variance and standard deviation",
        basicTip: "Compute sample std with NumPy ddof=1.",
        basicCode: `import numpy as np
x = np.array([0.9, 0.8, 0.7, 0.95])
print(float(np.std(x, ddof=1)))`,
        body: `Standard deviation is spread in the original units.

Small std means values cluster. Large std means they scatter.

NumPy \`np.std\` defaults to population (\`ddof=0\`). Sample std uses \`ddof=1\`.

In ML, standardisation is \`(x - mean) / std\`.`,
      },
      {
        heading: "Percentiles and outliers",
        basicTip: "Print p50 and p95 for a tiny latency array.",
        basicCode: `import numpy as np
lat = np.array([100, 120, 140, 180, 900])
print("p50", np.percentile(lat, 50), "p95", np.percentile(lat, 95))`,
        body: `A percentile is the value below which that share of the data falls. Median is p50.

Latency reports use p50, p95, and p99 because the tail is what users feel.

IQR is p75 - p25. A common outlier fence is \`1.5 * IQR\` beyond p25 or p75.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: mean vs median with a timeout",
        note: "One slow call wrecks the mean; the median barely moves.",
        why: "Latency dashboards should not trust the mean alone.",
        aiMl: "API SLAs quote p50/p95. One timeout should not rewrite the story.",
        code: `import statistics

latencies = [180, 210, 195, 205, 190, 30000]
print("mean", round(statistics.mean(latencies), 1))
print("median", statistics.median(latencies))
print("without timeout mean", round(statistics.mean(latencies[:-1]), 1))`,
      },
      {
        title: "AI / ML: IQR outlier fence",
        note: "Flag values outside 1.5 x IQR.",
        why: "Outliers may be bad data - or the fraud cases you care about.",
        aiMl: "Feature cleaning and anomaly checks often start with an IQR rule.",
        code: `import numpy as np

values = np.array([12, 14, 13, 15, 12, 99, 14, -40], dtype=float)
q1, q3 = np.percentile(values, [25, 75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
mask = (values < low) | (values > high)
print("outliers", values[mask].tolist())
print("clean", values[~mask].tolist())`,
      },
    ],
    tryIt: {
      title: "Summarise a metrics dataset",
      hint: "Add an extreme value and watch mean and p99 move while the median holds.",
      starter: `import numpy as np

latencies = [180, 210, 195, 205, 190, 220, 175, 4200, 199, 188]
arr = np.array(latencies, dtype=float)
print("mean", round(float(arr.mean()), 1))
print("median", round(float(np.median(arr)), 1))
print("p95", round(float(np.percentile(arr, 95)), 1))
print("std", round(float(arr.std(ddof=1)), 1))`,
    },
    takeaways: [
      "Quote median when outliers exist; report mean and median together.",
      "NumPy std defaults to ddof=0; use ddof=1 for sample std.",
      "Report p95/p99 for latency; use 1.5 x IQR to spot outliers.",
    ],
  },
  {
    slug: "data-distributions-and-plots",
    title: "Distributions and plotting",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 22,
    summary:
      "Sample common distributions and chart them with Matplotlib.",
    whyForAi:
      "Weight init and train/val curves come from distributions. A plot catches problems numbers hide.",
    packages: ["numpy", "matplotlib"],
    sections: [
      {
        heading: "Common distributions",
        basicTip: "Sample a few normal values and print the mean.",
        basicCode: `import numpy as np
rng = np.random.default_rng(0)
samples = rng.normal(loc=0.0, scale=1.0, size=5)
print(np.round(samples, 3))
print("mean", float(samples.mean()))`,
        body: `Use \`np.random.default_rng(seed)\` for a seeded generator.

- Uniform: \`rng.uniform(low, high, size)\`
- Normal: \`rng.normal(loc, scale, size)\`
- Integers: \`rng.integers(low, high, size)\`
- Choice: \`rng.choice(options, size, p=...)\`

Seed once so experiments are repeatable.`,
      },
      {
        heading: "Plotting with Matplotlib",
        basicTip: "Build a tiny series you could histogram.",
        basicCode: `import numpy as np
vals = np.array([0.1, 0.2, 0.2, 0.8, 0.9])
print("bins idea:", np.histogram(vals, bins=3)[0])`,
        body: `Prefer \`fig, ax = plt.subplots()\` then \`ax.hist\` / \`ax.plot\` / \`ax.scatter\`.

Common charts:

- histogram - shape and outliers
- scatter - predicted vs actual
- line - training curves
- bar - class counts

Always set title, xlabel, and ylabel.`,
      },
      {
        heading: "Reading what you plot",
        basicTip: "Print train vs val loss to spot overfitting.",
        basicCode: `train = [0.9, 0.5, 0.2, 0.05]
val = [0.85, 0.55, 0.45, 0.50]
print("train", train)
print("val  ", val)
print("gap grows:", val[-1] - train[-1])`,
        body: `A bimodal histogram often means two populations mixed together.

Predicted vs actual should hug the diagonal.

If train loss falls while val loss rises, the model is overfitting.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: latency histogram",
        note: "The chart renders below the output.",
        why: "A histogram shows skew and a second peak that mean alone hides.",
        aiMl: "Request latency and score distributions are plotted before tuning thresholds.",
        code: `import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
latencies = np.concatenate([rng.normal(200, 30, 900), rng.normal(1200, 200, 100)])
fig, ax = plt.subplots(figsize=(7, 3.5))
ax.hist(latencies, bins=40, color="#1d4ed8", edgecolor="white")
ax.axvline(np.median(latencies), color="#ea580c", label="median")
ax.set_title("Request latency")
ax.set_xlabel("ms")
ax.set_ylabel("count")
ax.legend()
print("median", round(float(np.median(latencies)), 1))`,
      },
      {
        title: "AI / ML: train vs val loss curve",
        note: "The growing gap is overfitting.",
        why: "Training curves are the fastest overfitting check.",
        aiMl: "Stop at the best validation epoch instead of memorising train data.",
        code: `import matplotlib.pyplot as plt
import numpy as np

epochs = np.arange(1, 16)
train = 1.2 * np.exp(-0.25 * epochs) + 0.05
val = train + 0.01 * np.clip(epochs - 6, 0, None) ** 1.4
fig, ax = plt.subplots(figsize=(7, 3.5))
ax.plot(epochs, train, label="train")
ax.plot(epochs, val, label="val")
ax.set_title("Loss curves")
ax.set_xlabel("epoch")
ax.set_ylabel("loss")
ax.legend()
print("best val epoch", int(np.argmin(val)) + 1)`,
      },
    ],
    tryIt: {
      title: "Compare a feature before and after scaling",
      hint: "Change the mean and scale of the raw feature, then re-run.",
      starter: `import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(42)
raw = rng.normal(loc=5000, scale=1200, size=800)
scaled = (raw - raw.mean()) / raw.std()
fig, axes = plt.subplots(1, 2, figsize=(9, 3.2))
axes[0].hist(raw, bins=30, color="#1d4ed8", edgecolor="white")
axes[0].set_title("Before")
axes[1].hist(scaled, bins=30, color="#ea580c", edgecolor="white")
axes[1].set_title("After")
fig.tight_layout()
print("scaled mean", round(float(scaled.mean()), 3), "std", round(float(scaled.std()), 3))`,
    },
    takeaways: [
      "Seed with np.random.default_rng(seed) for repeatable samples.",
      "Use fig, ax = plt.subplots() and always label axes.",
      "Histogram for shape, scatter for pred vs actual, line for training curves.",
    ],
  },
  {
    slug: "sklearn-regression",
    title: "scikit-learn: regression",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 24,
    summary:
      "Fit, predict, split, and score regression models with scikit-learn.",
    whyForAi:
      "fit/predict is the interface behind most ML tools. Regression teaches overfitting with clear numbers.",
    packages: ["numpy", "scikit-learn", "matplotlib"],
    sections: [
      {
        heading: "The estimator interface",
        basicTip: "Fit a one-feature line with plain NumPy math.",
        basicCode: `import numpy as np
x = np.array([1.0, 2.0, 3.0])
y = np.array([2.0, 4.0, 6.1])
w = float(np.dot(x, y) / np.dot(x, x))
print("slope", round(w, 3))`,
        body: `scikit-learn models share three steps:

1. \`model = Estimator(...)\`
2. \`model.fit(X_train, y_train)\`
3. \`model.predict(X_test)\`

\`X\` is 2D (rows = samples, columns = features). \`y\` is 1D.

Even one feature needs \`.reshape(-1, 1)\`.`,
      },
      {
        heading: "Train/test split",
        basicTip: "Shuffle indices and split into train and test.",
        basicCode: `import numpy as np
idx = np.arange(10)
rng = np.random.default_rng(0)
rng.shuffle(idx)
cut = int(0.8 * len(idx))
print("train", idx[:cut], "test", idx[cut:])`,
        body: `Never score on the same data you trained on.

\`train_test_split(X, y, test_size=0.2, random_state=42)\` holds out 20%.

Fit scalers on train only, then transform test. A \`Pipeline\` does this for you.

For time series, split by time, not randomly.`,
      },
      {
        heading: "Regression metrics",
        basicTip: "Compute MAE on a tiny prediction list.",
        basicCode: `y_true = [1.0, 2.0, 3.0]
y_pred = [1.1, 1.8, 3.2]
mae = sum(abs(a - b) for a, b in zip(y_true, y_pred)) / len(y_true)
print("mae", round(mae, 3))`,
        body: `- MAE - average absolute error (easy to explain)
- RMSE - penalises large errors more
- R² - share of variance explained (1.0 is perfect)

Report MAE with R². A high R² can still mean a large absolute error.

High train score and low test score means overfitting.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: linear regression end to end",
        note: "First run may download scikit-learn.",
        why: "This is the default path from a table of numbers to a model.",
        aiMl: "Baselines for latency, cost, and score prediction often start linear.",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(42)
X = rng.uniform(0, 10, 200).reshape(-1, 1)
y = 3.5 * X.ravel() + 12 + rng.normal(0, 2, 200)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_tr, y_tr)
pred = model.predict(X_te)
print("coef", round(float(model.coef_[0]), 3))
print("MAE", round(mean_absolute_error(y_te, pred), 3))
print("R2", round(r2_score(y_te, pred), 4))`,
      },
      {
        title: "AI / ML: polynomial overfitting check",
        note: "High degree can ace train and fail test.",
        why: "Degree is a simple knob to see underfit vs overfit.",
        aiMl: "Compare train and test R² before shipping any regressor.",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

rng = np.random.default_rng(3)
X = np.sort(rng.uniform(-3, 3, 60)).reshape(-1, 1)
y = 0.5 * X.ravel() ** 3 - 2 * X.ravel() + rng.normal(0, 2.5, 60)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
for degree in [1, 3, 15]:
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression()).fit(X_tr, y_tr)
    print(degree, "train", round(r2_score(y_tr, model.predict(X_tr)), 3),
          "test", round(r2_score(y_te, model.predict(X_te)), 3))`,
      },
    ],
    tryIt: {
      title: "Fit and evaluate your own regression",
      hint: "Change noise_level to 30 and watch R² fall.",
      starter: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(11)
n = 300
noise_level = 5.0
hours = rng.uniform(1, 50, n)
gpus = rng.integers(1, 9, n).astype(float)
y = 60 + 0.4 * hours + 1.8 * gpus + rng.normal(0, noise_level, n)
X = np.column_stack([hours, gpus])
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_tr, y_tr)
pred = model.predict(X_te)
print("MAE", round(mean_absolute_error(y_te, pred), 3))
print("R2", round(r2_score(y_te, pred), 4))`,
    },
    takeaways: [
      "Every estimator is fit(X, y) then predict(X); X is 2D and y is 1D.",
      "Split before fitting; fit scalers on training data only.",
      "Report MAE with R²; rising train and falling test means overfitting.",
    ],
  },
  {
    slug: "sklearn-classification",
    title: "scikit-learn: classification",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 26,
    summary:
      "Train classifiers, read a confusion matrix, and tune the decision threshold.",
    whyForAi:
      "Spam, sentiment, intent, and fraud are classification. Accuracy alone lies on imbalanced data.",
    packages: ["numpy", "scikit-learn", "matplotlib"],
    sections: [
      {
        heading: "The classifiers",
        basicTip: "Score accuracy on a tiny label list.",
        basicCode: `y_true = ["spam", "ham", "spam", "ham"]
y_pred = ["spam", "ham", "ham", "ham"]
acc = sum(a == b for a, b in zip(y_true, y_pred)) / len(y_true)
print("accuracy", acc)`,
        body: `Common starters:

- Logistic regression - fast baseline
- Decision tree - easy to read, overfits if deep
- Random forest - many trees voting
- KNN - needs scaled features

Start with logistic regression on tabular data.

Scale features for KNN and regularised linear models. Trees do not need scaling.`,
      },
      {
        heading: "Confusion matrix metrics",
        basicTip: "Count TP and FP for binary labels.",
        basicCode: `y_true = [1, 0, 1, 0, 1]
y_pred = [1, 0, 0, 0, 1]
tp = sum(t == 1 and p == 1 for t, p in zip(y_true, y_pred))
fp = sum(t == 0 and p == 1 for t, p in zip(y_true, y_pred))
print("tp", tp, "fp", fp)`,
        body: `From true/false positives and negatives:

- Accuracy = correct / total (weak on imbalance)
- Precision = TP / (TP + FP)
- Recall = TP / (TP + FN)
- F1 = balance of precision and recall

If 99% are negative, always predicting negative scores 99% accuracy and catches nothing.`,
      },
      {
        heading: "Thresholds",
        basicTip: "Apply a decision threshold to probability scores.",
        basicCode: `probs = [0.9, 0.2, 0.6, 0.4]
threshold = 0.5
preds = [1 if p >= threshold else 0 for p in probs]
print(preds)`,
        body: `\`predict_proba\` returns class probabilities. The 0.5 cutoff is a choice.

Lower threshold -> more positives (higher recall, lower precision).

Raise threshold -> fewer, more certain positives.

Pick the threshold from the cost of each error type.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: logistic spam baseline",
        note: "Print accuracy and a confusion matrix.",
        why: "classification_report shows what accuracy hides.",
        aiMl: "Intent, spam, and triage routers often start as logistic regression.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

rng = np.random.default_rng(42)
n = 400
length = rng.normal(50, 20, n)
links = rng.integers(0, 6, n).astype(float)
y = ((-4 + 0.05 * length + 0.9 * links + rng.normal(0, 1, n)) > 0).astype(int)
X = np.column_stack([length, links])
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)
pred = LogisticRegression().fit(X_tr, y_tr).predict(X_te)
print("accuracy", round(accuracy_score(y_te, pred), 3))
print(confusion_matrix(y_te, pred))`,
      },
      {
        title: "AI / ML: accuracy trap on rare fraud",
        note: "A dummy model can look great and catch zero fraud.",
        why: "Imbalanced labels need recall and precision, not accuracy alone.",
        aiMl: "Fraud and rare-event models are judged on recall of the positive class.",
        code: `import numpy as np
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, recall_score

rng = np.random.default_rng(0)
n = 1000
X = rng.normal(0, 1, (n, 3))
y = np.zeros(n, dtype=int)
fraud = rng.choice(n, size=20, replace=False)
y[fraud] = 1
X[fraud] += 2.0
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)
for name, clf in [("dummy", DummyClassifier(strategy="most_frequent")), ("logreg", LogisticRegression())]:
    pred = clf.fit(X_tr, y_tr).predict(X_te)
    print(name, "acc", round(accuracy_score(y_te, pred), 3),
          "recall", round(recall_score(y_te, pred, zero_division=0), 3))`,
      },
    ],
    tryIt: {
      title: "Pick a threshold from business cost",
      hint: "Raise COST_FALSE_NEGATIVE and see the best threshold drop.",
      starter: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

COST_FP, COST_FN = 20, 500
rng = np.random.default_rng(3)
n = 800
X = rng.normal(0, 1, (n, 3))
y = ((X[:, 0] * 1.5 + X[:, 1] + rng.normal(0, 0.8, n)) > 1.6).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
probs = LogisticRegression().fit(X_tr, y_tr).predict_proba(X_te)[:, 1]
best_t, best_cost = 0.5, float("inf")
for t in [0.2, 0.35, 0.5, 0.65, 0.8]:
    tn, fp, fn, tp = confusion_matrix(y_te, (probs >= t).astype(int)).ravel()
    cost = fp * COST_FP + fn * COST_FN
    print(t, "cost", cost)
    if cost < best_cost:
        best_t, best_cost = t, cost
print("best", best_t, best_cost)`,
    },
    takeaways: [
      "Accuracy hides failure on imbalanced data - read the confusion matrix.",
      "Precision matters when false positives cost; recall when false negatives cost.",
      "0.5 is a choice: use predict_proba and set the threshold from real cost.",
    ],
  },
  {
    slug: "sklearn-pipelines-and-clustering",
    title: "Pipelines, scaling, and clustering",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 24,
    summary:
      "Scale and encode inside a Pipeline, cross-validate, then cluster with K-means.",
    whyForAi:
      "Pipelines stop leakage and ship as one object. K-means handles unlabelled groups.",
    packages: ["numpy", "scikit-learn", "matplotlib"],
    sections: [
      {
        heading: "Preprocessing",
        basicTip: "Standardize a tiny feature column by hand.",
        basicCode: `import numpy as np
x = np.array([10.0, 20.0, 30.0])
z = (x - x.mean()) / x.std()
print(np.round(z, 3))`,
        body: `\`StandardScaler\` gives mean 0 and std 1. Needed for KNN, SVM, and K-means.

\`OneHotEncoder\` is for unordered categories. \`OrdinalEncoder\` only when order is real.

\`SimpleImputer\` fills missing values (median is safer for skewed data).`,
      },
      {
        heading: "Pipelines",
        basicTip: "Show a step list: scale then model.",
        basicCode: `steps = [("scale", "StandardScaler"), ("model", "LogisticRegression")]
print(" -> ".join(name for name, _ in steps))`,
        body: `A \`Pipeline\` chains prep and a model into one \`fit\` / \`predict\` object.

Inside cross-validation, each fold refits the scaler on train only. That prevents leakage.

Ship the whole pipeline so production uses the same transforms as training.`,
      },
      {
        heading: "Cross-validation and K-means",
        basicTip: "Average a score across k tiny folds.",
        basicCode: `scores = [0.81, 0.79, 0.84]
print("cv mean", sum(scores) / len(scores))`,
        body: `K-fold CV trains k times and reports mean and spread.

\`GridSearchCV\` tries hyperparameter combos with CV.

K-means groups unlabelled points. Choose k with the elbow method. Scale first.

Clusters are groupings you still have to name.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: pipeline stops scaling leak",
        note: "Scaling inside the pipeline is the honest score.",
        why: "Fitting a scaler on all data before CV leaks test fold info.",
        aiMl: "Production ML wrappers pickle one Pipeline, not a scaler plus a model.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)
X = rng.normal(0, 1, (300, 20))
y = rng.integers(0, 2, 300)
leaky = StandardScaler().fit_transform(X)
print("leaky", round(float(cross_val_score(LogisticRegression(max_iter=500), leaky, y, cv=5).mean()), 3))
honest = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))
print("honest", round(float(cross_val_score(honest, X, y, cv=5).mean()), 3))`,
      },
      {
        title: "AI / ML: K-means cluster sizes",
        note: "Scale, fit k=3, print cluster counts.",
        why: "Unlabelled user or embedding groups often start with K-means.",
        aiMl: "Topic and behaviour clusters are named after inspecting each group.",
        code: `import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(42)
X = np.vstack([
    rng.normal([0, 0], 0.6, (80, 2)),
    rng.normal([4, 4], 0.6, (80, 2)),
    rng.normal([0, 5], 0.6, (80, 2)),
])
Xs = StandardScaler().fit_transform(X)
labels = KMeans(n_clusters=3, n_init=10, random_state=0).fit_predict(Xs)
uniq, counts = np.unique(labels, return_counts=True)
print(dict(zip(uniq.tolist(), counts.tolist())))`,
      },
    ],
    tryIt: {
      title: "Tune a pipeline with grid search",
      hint: "Add another C value and see if the best params change.",
      starter: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(21)
X = rng.normal(0, 1, (400, 6))
y = ((X[:, 0] * 2 + X[:, 3] - X[:, 4]) > 0.9).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
pipe = Pipeline([("scale", StandardScaler()), ("clf", LogisticRegression(max_iter=1000))])
search = GridSearchCV(pipe, {"clf__C": [0.1, 1.0, 10.0]}, cv=4, scoring="f1")
search.fit(X_tr, y_tr)
print(search.best_params_, round(search.best_score_, 4))`,
    },
    takeaways: [
      "Put transforms inside a Pipeline to prevent leakage and ship one artifact.",
      "One-hot unordered categories; ordinal encoding implies real order.",
      "Cross-validate for an honest score; scale before K-means.",
    ],
  },
  {
    slug: "databases-with-python",
    title: "Databases and SQL from Python",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 20,
    summary:
      "Query SQLite from Python, use parameters safely, and load results into pandas.",
    whyForAi:
      "Training data, experiment logs, and RAG docs often live in tables. SQL from Python is a baseline skill.",
    packages: ["sqlite3", "pandas", "numpy"],
    sections: [
      {
        heading: "sqlite3 basics",
        basicTip: "Create a table, insert one row, then select it.",
        basicCode: `import sqlite3
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE runs (model TEXT, accuracy REAL)")
conn.execute("INSERT INTO runs VALUES (?, ?)", ("mini", 0.91))
print(conn.execute("SELECT * FROM runs").fetchall())
conn.close()`,
        body: `\`sqlite3\` is in the standard library. No server needed.

Flow: connect, execute, fetch, commit, close.

\`fetchone()\`, \`fetchall()\`, or iterate the cursor for large results.

The same DB-API style works with Postgres and MySQL drivers.`,
      },
      {
        heading: "Parameters, not string formatting",
        basicTip: "Pass values with ? placeholders, never with an f-string.",
        basicCode: `import sqlite3
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE users (name TEXT)")
conn.execute("INSERT INTO users VALUES ('priya')")
name = "priya'; DROP TABLE users; --"
rows = conn.execute("SELECT * FROM users WHERE name = ?", (name,)).fetchall()
print(rows)
conn.close()`,
        body: `Never build SQL with f-strings. That is SQL injection.

Use placeholders and pass values separately: \`execute(sql, (value,))\`.

SQLite uses \`?\`. Postgres often uses \`%s\`.

This matters more when values come from users or LLM output.`,
      },
      {
        heading: "SQL into pandas",
        basicTip: "Insert a few rows, then load a GROUP BY into pandas.",
        basicCode: `import sqlite3
import pandas as pd
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE calls (model TEXT, tokens INTEGER)")
conn.executemany("INSERT INTO calls VALUES (?, ?)", [("mini", 100), ("mini", 200), ("large", 500)])
df = pd.read_sql_query("SELECT model, SUM(tokens) AS tokens FROM calls GROUP BY model", conn)
print(df)
conn.close()`,
        body: `\`pd.read_sql_query(sql, conn)\` returns a DataFrame.

Push heavy \`GROUP BY\` into SQL when tables are large.

Index columns you filter and join on.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: store and rank model runs",
        note: "Complete SQLite create/insert/select for experiment rows.",
        why: "Experiment metadata usually starts as a small SQL table.",
        aiMl: "MLOps logs store model name, accuracy, tokens, and date per run.",
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("""
    CREATE TABLE runs (
        id INTEGER PRIMARY KEY,
        model TEXT NOT NULL,
        accuracy REAL,
        tokens INTEGER,
        created_at TEXT
    )
""")
rows = [
    ("gpt-4.1-mini", 0.913, 620, "2026-09-01"),
    ("gpt-4.1-mini", 0.907, 540, "2026-09-02"),
    ("llama-3-8b", 0.847, 1520, "2026-09-02"),
    ("llama-3-8b", 0.861, 1480, "2026-09-03"),
    ("claude-haiku", 0.900, 460, "2026-09-03"),
]
cur.executemany(
    "INSERT INTO runs (model, accuracy, tokens, created_at) VALUES (?, ?, ?, ?)",
    rows,
)
conn.commit()
for row in cur.execute("SELECT id, model, accuracy FROM runs ORDER BY accuracy DESC LIMIT 3"):
    print(row)
count, avg = cur.execute("SELECT COUNT(*), AVG(accuracy) FROM runs").fetchone()
print(count, "runs, mean", round(avg, 4))
conn.close()`,
      },
      {
        title: "AI / ML: aggregate calls then analyse in pandas",
        note: "GROUP BY in SQL, then summarise in a DataFrame.",
        why: "Aggregate on the server so you transfer fewer rows.",
        aiMl: "Token and latency cost reports are SQL aggregates loaded into pandas.",
        code: `import pandas as pd
import sqlite3

conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE calls (model TEXT, tokens INTEGER, latency_ms INTEGER, ok INTEGER)")
conn.executemany("INSERT INTO calls VALUES (?, ?, ?, ?)", [
    ("mini", 620, 640, 1),
    ("mini", 540, 580, 1),
    ("mini", 900, 30000, 0),
    ("large", 1520, 1800, 1),
    ("large", 1480, 1750, 1),
    ("haiku", 460, 420, 1),
    ("haiku", 480, 450, 1),
])
conn.commit()
summary = pd.read_sql_query("""
    SELECT model,
           COUNT(*) AS calls,
           SUM(tokens) AS total_tokens,
           ROUND(AVG(latency_ms), 1) AS avg_latency,
           ROUND(AVG(ok) * 100, 1) AS success_pct
    FROM calls
    GROUP BY model
    ORDER BY total_tokens DESC
""", conn)
print(summary.to_string(index=False))
conn.close()`,
      },
    ],
    tryIt: {
      title: "Build a small feature table",
      hint: "Add a WHERE clause on total_tokens and see the report shrink.",
      starter: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
conn.executescript("""
    CREATE TABLE users (id INTEGER PRIMARY KEY, plan TEXT);
    CREATE TABLE events (user_id INTEGER, tokens INTEGER, ok INTEGER);
    INSERT INTO users VALUES (1, 'free'), (2, 'pro'), (3, 'pro');
    INSERT INTO events VALUES
        (1, 400, 1), (1, 250, 1), (1, 600, 0),
        (2, 1500, 1), (2, 1800, 1),
        (3, 900, 1);
""")
features = conn.execute("""
    SELECT u.id, u.plan,
           COUNT(e.tokens) AS n_calls,
           SUM(e.tokens) AS total_tokens,
           ROUND(AVG(e.ok) * 100, 1) AS success_pct
    FROM users u
    JOIN events e ON e.user_id = u.id
    GROUP BY u.id, u.plan
    ORDER BY total_tokens DESC
""").fetchall()
for row in features:
    print(dict(row))
conn.close()`,
    },
    takeaways: [
      "sqlite3 follows DB-API 2.0, so other SQL drivers feel familiar.",
      "Always use placeholders - never build SQL with f-strings.",
      "pd.read_sql_query loads results; aggregate in SQL when tables are large.",
    ],
  },
];

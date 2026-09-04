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
      "Mean, median, mode, variance, standard deviation, and percentiles — computed with the standard library and NumPy.",
    whyForAi:
      "Before you train anything you describe the data. Median versus mean tells you about skew, standard deviation tells you the spread, and p95 latency is the number your SLA is written against. Averages alone hide the problems that matter.",
    packages: ["numpy"],
    sections: [
      {
        heading: "Centre: mean, median, mode",
        body: `**Mean** is the arithmetic average. It is pulled hard by outliers — one 30-second timeout wrecks the mean latency of a hundred fast calls.

**Median** is the middle value when sorted. It ignores outliers, which is why it is the honest summary for latency, salary, and file sizes.

**Mode** is the most frequent value, the only one of the three that works on categories like labels.

Rule of thumb: if mean and median differ noticeably, the data is **skewed** and you should quote the median. Report both when you are describing a dataset to someone else.`,
      },
      {
        heading: "Spread: variance and standard deviation",
        body: `**Variance** is the mean squared distance from the mean; **standard deviation** is its square root, back in the original units, which is why it is the one people quote.

Small deviation means values cluster tightly; large means they scatter.

One subtlety that catches people: the divisor. Use \`n\` for a **population** (you have every value) and \`n - 1\` for a **sample** (you have a subset and are estimating). NumPy's \`np.std\` defaults to population (\`ddof=0\`), while \`statistics.stdev\` uses the sample formula. Pandas' \`.std()\` also defaults to sample. Mixing them silently changes your numbers.

In ML, standard deviation drives feature scaling: standardisation is \`(x - mean) / std\`, which is what \`StandardScaler\` does.`,
      },
      {
        heading: "Percentiles and outliers",
        body: `A **percentile** is the value below which that share of the data falls. The median is p50.

Latency is always reported as p50, p95, and p99 because the tail is what users feel. A p50 of 200 ms with a p99 of 8 seconds means one request in a hundred is unacceptable, and the mean will never show it.

**IQR** (interquartile range) is p75 − p25. The standard outlier rule flags anything below \`p25 - 1.5 * IQR\` or above \`p75 + 1.5 * IQR\`.

Decide deliberately what to do with outliers: they are sometimes corrupt data to drop, and sometimes the fraud cases or the incidents you are actually trying to detect.`,
      },
    ],
    examples: [
      {
        title: "Mean vs median with an outlier",
        note: "One timeout moves the mean by hundreds of milliseconds; the median barely notices.",
        code: `import statistics

latencies = [180, 210, 195, 205, 190, 30000]

print("mean  :", round(statistics.mean(latencies), 1))
print("median:", statistics.median(latencies))
print("mode of labels:", statistics.mode(["pos", "neg", "pos", "pos"]))

without_outlier = latencies[:-1]
print("\\nmean without the timeout:", round(statistics.mean(without_outlier), 1))
print("median without it       :", statistics.median(without_outlier))
print("\\nreport the median when mean and median disagree this much.")`,
      },
      {
        title: "Variance, standard deviation, and ddof",
        note: "Population vs sample divisor — a real source of mismatched numbers.",
        code: `import statistics
import numpy as np

scores = [0.91, 0.72, 0.85, 0.66, 0.94]

print("population std (numpy default, ddof=0):", round(float(np.std(scores)), 5))
print("sample std     (statistics.stdev)     :", round(statistics.stdev(scores), 5))
print("numpy with ddof=1                     :", round(float(np.std(scores, ddof=1)), 5))
print("variance (sample)                     :", round(statistics.variance(scores), 5))

mean = float(np.mean(scores))
std = float(np.std(scores))
standardised = [(s - mean) / std for s in scores]
print("\\nstandardised:", [round(v, 3) for v in standardised])
print("new mean ~0:", round(float(np.mean(standardised)), 10), "| new std ~1:", round(float(np.std(standardised)), 6))`,
      },
      {
        title: "Percentiles for a latency report",
        note: "p95 and p99 are what your SLA is written against.",
        code: `import numpy as np

rng = np.random.default_rng(42)
fast = rng.normal(200, 30, 950)
slow = rng.normal(3000, 500, 50)
latencies = np.concatenate([fast, slow])

for label, value in [
    ("count", len(latencies)),
    ("mean", np.mean(latencies)),
    ("p50", np.percentile(latencies, 50)),
    ("p90", np.percentile(latencies, 90)),
    ("p95", np.percentile(latencies, 95)),
    ("p99", np.percentile(latencies, 99)),
    ("max", np.max(latencies)),
]:
    print(f"{label:>6}: {float(value):9.1f}")

print("\\nSLA at 1000ms breached by:",
      f"{float((latencies > 1000).mean()):.1%} of requests")`,
      },
      {
        title: "Outlier detection with the IQR rule",
        note: "The standard 1.5 x IQR fence, computed in four lines.",
        code: `import numpy as np

values = np.array([12, 14, 13, 15, 12, 14, 13, 99, 14, 12, -40, 13], dtype=float)

q1, q3 = np.percentile(values, [25, 75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr

mask = (values < low) | (values > high)
print(f"q1={q1} q3={q3} iqr={iqr}")
print(f"acceptable range: {low} to {high}")
print("outliers :", values[mask].tolist())
print("clean    :", values[~mask].tolist())
print("mean before:", round(float(values.mean()), 2), "| after:", round(float(values[~mask].mean()), 2))`,
      },
    ],
    tryIt: {
      title: "Summarise a metrics dataset",
      hint: "Add an extreme value to the list and watch mean and p99 move while the median holds.",
      starter: `import numpy as np

latencies = [180, 210, 195, 205, 190, 220, 175, 4200, 199, 188]
arr = np.array(latencies, dtype=float)

q1, q3 = np.percentile(arr, [25, 75])
iqr = q3 - q1
outliers = arr[(arr < q1 - 1.5 * iqr) | (arr > q3 + 1.5 * iqr)]

print(f"{'n':<10}{len(arr)}")
print(f"{'mean':<10}{arr.mean():.1f}")
print(f"{'median':<10}{np.median(arr):.1f}")
print(f"{'std':<10}{arr.std(ddof=1):.1f}")
print(f"{'min/max':<10}{arr.min():.0f} / {arr.max():.0f}")
print(f"{'p95':<10}{np.percentile(arr, 95):.1f}")
print(f"{'p99':<10}{np.percentile(arr, 99):.1f}")
print(f"\\noutliers: {outliers.tolist()}")
print("skewed?  ", abs(arr.mean() - np.median(arr)) > 0.1 * np.median(arr))`,
    },
    takeaways: [
      "Median beats mean whenever outliers exist — quote both when describing data.",
      "NumPy std defaults to population (ddof=0); statistics.stdev and pandas use the sample formula.",
      "Report p95/p99 for latency; use the 1.5 x IQR fence to find outliers.",
    ],
  },
  {
    slug: "data-distributions-and-plots",
    title: "Distributions and plotting",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 22,
    summary:
      "Generate and inspect data distributions, then chart them with Matplotlib — plots render right here in the browser.",
    whyForAi:
      "Weight initialisation, dropout, and train/test splits all draw from distributions. Plotting a histogram of your features or a scatter of predictions against truth catches problems no summary statistic will reveal.",
    packages: ["numpy", "matplotlib"],
    sections: [
      {
        heading: "Common distributions",
        body: `\`np.random.default_rng(seed)\` creates a generator. Use it rather than the older \`np.random.seed\` global.

- **Uniform** — every value in a range equally likely. \`rng.uniform(low, high, size)\`.
- **Normal (Gaussian)** — the bell curve, defined by mean and standard deviation. \`rng.normal(loc, scale, size)\`. Roughly 68% of values fall within one standard deviation and 95% within two.
- **Integers** — \`rng.integers(low, high, size)\` for synthetic labels.
- **Choice** — \`rng.choice(options, size, p=probabilities)\` for weighted sampling, which is how you simulate class imbalance.

Neural network weights are initialised from scaled normal or uniform distributions; that scaling is what keeps activations from exploding or vanishing in deep networks.`,
      },
      {
        heading: "Plotting with Matplotlib",
        body: `The convention is \`import matplotlib.pyplot as plt\`.

Prefer the **object-oriented** style: \`fig, ax = plt.subplots()\` then \`ax.plot(...)\`. It scales to multiple panels, unlike the stateful \`plt.plot\` shortcut.

Four charts cover most ML work:

- \`ax.hist(values, bins=30)\` — distribution shape, skew, and outliers
- \`ax.scatter(x, y)\` — relationship between two variables, or predicted vs actual
- \`ax.plot(steps, losses)\` — training curves over time
- \`ax.bar(labels, counts)\` — class distribution

Always set \`ax.set_title\`, \`ax.set_xlabel\`, and \`ax.set_ylabel\`. An unlabelled chart is unreadable a week later, and a reviewer cannot check your claim against it.

The compiler on this page renders figures below the output, so you can run every example and see the result immediately.`,
      },
      {
        heading: "Reading what you plot",
        body: `A histogram tells you the shape: symmetric, skewed, or bimodal. **Bimodal** usually means two populations are mixed together and should be modelled separately.

A predicted-vs-actual scatter should hug the diagonal. Systematic curvature means the model is underfitting the relationship.

A training curve where training loss keeps falling while validation loss rises is **overfitting**, and it is the single most useful plot in machine learning.

Plot the distribution of your features before and after scaling. Confirming the transform did what you expected takes ten seconds and saves hours.`,
      },
    ],
    examples: [
      {
        title: "Sampling from distributions",
        note: "Check the empirical mean and std against what you asked for.",
        code: `import numpy as np

rng = np.random.default_rng(42)

uniform = rng.uniform(0, 1, 1000)
normal = rng.normal(loc=100, scale=15, size=1000)
labels = rng.choice(["positive", "negative", "neutral"], size=1000, p=[0.7, 0.25, 0.05])

print(f"uniform  mean={uniform.mean():.4f}  min={uniform.min():.4f}  max={uniform.max():.4f}")
print(f"normal   mean={normal.mean():.2f}   std={normal.std():.2f}")

within_1_sd = np.mean(np.abs(normal - normal.mean()) < normal.std())
within_2_sd = np.mean(np.abs(normal - normal.mean()) < 2 * normal.std())
print(f"within 1 sd: {within_1_sd:.1%} (expect ~68%)")
print(f"within 2 sd: {within_2_sd:.1%} (expect ~95%)")

unique, counts = np.unique(labels, return_counts=True)
print("\\nlabel distribution:", dict(zip(unique.tolist(), counts.tolist())))`,
      },
      {
        title: "Histogram — the chart renders below the output",
        note: "First run downloads Matplotlib, so allow it a few extra seconds.",
        code: `import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
latencies = np.concatenate([
    rng.normal(200, 30, 900),
    rng.normal(1200, 200, 100),
])

fig, ax = plt.subplots(figsize=(7, 3.5))
ax.hist(latencies, bins=40, color="#1d4ed8", edgecolor="white")
ax.axvline(np.median(latencies), color="#ea580c", linewidth=2, label="median")
ax.axvline(np.percentile(latencies, 95), color="#dc2626", linewidth=2, linestyle="--", label="p95")
ax.set_title("Request latency distribution (n=1000)")
ax.set_xlabel("Latency (ms)")
ax.set_ylabel("Number of requests")
ax.legend()

print("bimodal — two populations are mixed here")
print("median:", round(float(np.median(latencies)), 1), "ms")
print("p95   :", round(float(np.percentile(latencies, 95)), 1), "ms")`,
      },
      {
        title: "Training curve showing overfitting",
        note: "The gap opening between the two lines is the thing to look for.",
        code: `import matplotlib.pyplot as plt
import numpy as np

epochs = np.arange(1, 21)
train_loss = 1.2 * np.exp(-0.25 * epochs) + 0.05
val_loss = 1.2 * np.exp(-0.25 * epochs) + 0.05 + 0.012 * np.clip(epochs - 8, 0, None) ** 1.5

fig, ax = plt.subplots(figsize=(7, 3.5))
ax.plot(epochs, train_loss, marker="o", color="#1d4ed8", label="training loss")
ax.plot(epochs, val_loss, marker="s", color="#ea580c", label="validation loss")
best = int(np.argmin(val_loss)) + 1
ax.axvline(best, color="#64748b", linestyle=":", label=f"best epoch = {best}")
ax.set_title("Training vs validation loss")
ax.set_xlabel("Epoch")
ax.set_ylabel("Loss (cross-entropy)")
ax.legend()

print("stop training at epoch", best, "- after that the model is memorising")`,
      },
      {
        title: "Scatter plot: predicted vs actual",
        note: "Points should hug the diagonal. Curvature means underfitting.",
        code: `import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(7)
actual = rng.uniform(0, 100, 120)
predicted = actual * 0.92 + rng.normal(0, 6, 120) + 3

fig, ax = plt.subplots(figsize=(5.5, 5))
ax.scatter(actual, predicted, alpha=0.6, color="#1d4ed8", edgecolor="white")
lims = [0, 105]
ax.plot(lims, lims, color="#dc2626", linestyle="--", label="perfect prediction")
ax.set_xlim(lims)
ax.set_ylim(lims)
ax.set_title("Predicted vs actual values")
ax.set_xlabel("Actual value")
ax.set_ylabel("Predicted value")
ax.legend()

residuals = predicted - actual
print("mean absolute error:", round(float(np.abs(residuals).mean()), 2))
print("bias (mean residual):", round(float(residuals.mean()), 2))`,
      },
      {
        title: "Bar chart of class distribution",
        note: "Class imbalance is obvious in a bar chart and easy to miss in a table.",
        code: `import matplotlib.pyplot as plt

labels = ["positive", "negative", "neutral"]
counts = [700, 250, 50]

fig, ax = plt.subplots(figsize=(6, 3.2))
bars = ax.bar(labels, counts, color=["#1d4ed8", "#ea580c", "#64748b"])
for bar, count in zip(bars, counts):
    ax.text(bar.get_x() + bar.get_width() / 2, count + 12, str(count), ha="center", fontweight="bold")
ax.set_title("Training label distribution")
ax.set_xlabel("Class")
ax.set_ylabel("Number of examples")

print("imbalance ratio:", round(max(counts) / min(counts), 1), ": 1")
print("a model predicting only 'positive' scores", f"{max(counts) / sum(counts):.0%}", "accuracy")`,
      },
    ],
    tryIt: {
      title: "Compare a feature before and after scaling",
      hint: "Change the mean and scale of the raw feature, then re-run to see both panels shift.",
      starter: `import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(42)
raw = rng.normal(loc=5000, scale=1200, size=800)
scaled = (raw - raw.mean()) / raw.std()

fig, axes = plt.subplots(1, 2, figsize=(9, 3.2))

axes[0].hist(raw, bins=30, color="#1d4ed8", edgecolor="white")
axes[0].set_title("Before scaling")
axes[0].set_xlabel("Raw feature value")
axes[0].set_ylabel("Count")

axes[1].hist(scaled, bins=30, color="#ea580c", edgecolor="white")
axes[1].set_title("After standardisation")
axes[1].set_xlabel("Standardised value (z-score)")
axes[1].set_ylabel("Count")

fig.tight_layout()

print(f"raw    mean={raw.mean():8.2f}  std={raw.std():8.2f}")
print(f"scaled mean={scaled.mean():8.2f}  std={scaled.std():8.2f}")`,
    },
    takeaways: [
      "Seed with np.random.default_rng(seed) and check empirical mean and std against expectations.",
      "Use fig, ax = plt.subplots() and always label the title and both axes.",
      "Histogram for shape, scatter for predicted vs actual, line for training curves.",
    ],
  },
  {
    slug: "sklearn-regression",
    title: "scikit-learn: regression",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 24,
    summary:
      "Train/test split, linear and polynomial regression, and the metrics that tell you whether a model is any good.",
    whyForAi:
      "scikit-learn is the fastest path from a table of numbers to a working model, and its fit/predict interface is the mental model behind every other framework. Regression also teaches overfitting and evaluation in a form you can see in one chart.",
    packages: ["numpy", "scikit-learn", "matplotlib"],
    sections: [
      {
        heading: "The estimator interface",
        body: `Every scikit-learn model follows the same three steps:

1. \`model = SomeEstimator(**hyperparameters)\`
2. \`model.fit(X_train, y_train)\`
3. \`predictions = model.predict(X_test)\`

\`X\` is 2-dimensional — rows are samples, columns are features — even with a single feature, where you need \`.reshape(-1, 1)\`. \`y\` is 1-dimensional. Getting this wrong produces the most common scikit-learn error message you will ever see.

Because the interface is uniform, swapping \`LinearRegression\` for \`RandomForestRegressor\` is a one-line change.`,
      },
      {
        heading: "Train/test split",
        body: `Never evaluate on data the model trained on — it has memorised it, and the score is meaningless.

\`train_test_split(X, y, test_size=0.2, random_state=42)\` holds back 20%. Always pass \`random_state\` so the split is reproducible.

The rule that gets broken most often: **fit scalers and encoders on the training set only**, then apply them to test data. Fitting on everything leaks information about the test set into training and inflates your score. A \`Pipeline\` enforces this automatically.

For time series, never split randomly. Future data must not leak into past training data — split by date.`,
      },
      {
        heading: "Regression metrics",
        body: `- **MAE** (mean absolute error) — average error in original units. Easy to explain to a stakeholder.
- **MSE** — squares the errors, so large mistakes dominate. It is what most models optimise.
- **RMSE** — square root of MSE, back in original units.
- **R²** — the share of variance explained. 1.0 is perfect, 0 is no better than predicting the mean, and negative is worse than the mean.

Report MAE alongside R². R² of 0.85 sounds strong until you learn the MAE is ₹40,000 on a ₹50,000 prediction.

**Polynomial regression** fits curves by adding \`x²\`, \`x³\` as features. It is also the clearest demonstration of overfitting: raise the degree far enough and the curve passes through every training point while predicting nonsense between them.`,
      },
    ],
    examples: [
      {
        title: "Linear regression end to end",
        note: "First run downloads scikit-learn, which takes a few seconds.",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

rng = np.random.default_rng(42)
X = rng.uniform(0, 10, 200).reshape(-1, 1)      # 2D: (200 rows, 1 feature)
y = 3.5 * X.ravel() + 12 + rng.normal(0, 2, 200)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("train:", X_train.shape, "test:", X_test.shape)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print(f"\\nlearned: y = {model.coef_[0]:.3f}x + {model.intercept_:.3f}")
print("true    : y = 3.500x + 12.000")
print(f"\\nMAE : {mean_absolute_error(y_test, pred):.3f}")
print(f"RMSE: {mean_squared_error(y_test, pred) ** 0.5:.3f}")
print(f"R2  : {r2_score(y_test, pred):.4f}")`,
      },
      {
        title: "Multiple regression and feature importance",
        note: "Coefficients are only comparable when features are on the same scale.",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import r2_score

rng = np.random.default_rng(7)
n = 400
experience = rng.uniform(0, 15, n)
projects = rng.integers(0, 30, n).astype(float)
noise_feature = rng.normal(0, 1, n)

salary = 300000 + 85000 * experience + 12000 * projects + rng.normal(0, 40000, n)

X = np.column_stack([experience, projects, noise_feature])
y = salary
names = ["experience", "projects", "irrelevant"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)

pipeline = make_pipeline(StandardScaler(), LinearRegression()).fit(X_train, y_train)
coefs = pipeline.named_steps["linearregression"].coef_

print("R2 on test:", round(r2_score(y_test, pipeline.predict(X_test)), 4))
print("\\nstandardised coefficients (impact per 1 sd):")
for name, coef in sorted(zip(names, coefs), key=lambda p: -abs(p[1])):
    print(f"  {name:12} {coef:>12,.0f}")`,
      },
      {
        title: "Polynomial regression and overfitting",
        note: "Watch the degree-15 model score perfectly on train and badly on test.",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

rng = np.random.default_rng(3)
X = np.sort(rng.uniform(-3, 3, 60)).reshape(-1, 1)
y = 0.5 * X.ravel() ** 3 - 2 * X.ravel() + rng.normal(0, 2.5, 60)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)

print(f"{'degree':>7}{'train R2':>11}{'test R2':>11}   verdict")
for degree in [1, 3, 8, 15]:
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression()).fit(X_train, y_train)
    train_r2 = r2_score(y_train, model.predict(X_train))
    test_r2 = r2_score(y_test, model.predict(X_test))
    if test_r2 < 0.4 and train_r2 > 0.9:
        verdict = "overfitting"
    elif train_r2 < 0.6:
        verdict = "underfitting"
    else:
        verdict = "good fit"
    print(f"{degree:>7}{train_r2:>11.4f}{test_r2:>11.4f}   {verdict}")`,
      },
      {
        title: "Plot the fitted curves",
        note: "The chart makes overfitting unmistakable — the wiggly line is memorising noise.",
        code: `import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(3)
X = np.sort(rng.uniform(-3, 3, 40)).reshape(-1, 1)
y = 0.5 * X.ravel() ** 3 - 2 * X.ravel() + rng.normal(0, 2.5, 40)
grid = np.linspace(-3, 3, 300).reshape(-1, 1)

fig, ax = plt.subplots(figsize=(7, 4))
ax.scatter(X, y, color="#0f172a", alpha=0.7, label="training data", zorder=3)

for degree, colour in [(1, "#64748b"), (3, "#1d4ed8"), (15, "#dc2626")]:
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression()).fit(X, y)
    ax.plot(grid, model.predict(grid), color=colour, linewidth=2, label=f"degree {degree}")

ax.set_ylim(y.min() - 5, y.max() + 5)
ax.set_title("Polynomial fits: underfit, good fit, overfit")
ax.set_xlabel("Feature x")
ax.set_ylabel("Target y")
ax.legend()

print("degree 1 is too rigid, degree 3 matches the truth, degree 15 chases noise")`,
      },
    ],
    tryIt: {
      title: "Fit and evaluate your own regression",
      hint: "Change noise_level to 30 and watch R² fall while the coefficients stay close.",
      starter: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(11)
n = 300
noise_level = 5.0

hours_trained = rng.uniform(1, 50, n)
gpu_count = rng.integers(1, 9, n).astype(float)
accuracy = 60 + 0.4 * hours_trained + 1.8 * gpu_count + rng.normal(0, noise_level, n)

X = np.column_stack([hours_trained, gpu_count])
X_train, X_test, y_train, y_test = train_test_split(X, accuracy, test_size=0.2, random_state=42)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("coefficients:")
for name, coef in zip(["hours_trained", "gpu_count"], model.coef_):
    print(f"  {name:15} {coef:+.4f}")
print(f"  {'intercept':15} {model.intercept_:+.4f}")

print(f"\\nMAE: {mean_absolute_error(y_test, pred):.3f} accuracy points")
print(f"R2 : {r2_score(y_test, pred):.4f}")

new_run = np.array([[40.0, 4.0]])
print(f"\\npredicted accuracy for 40h on 4 GPUs: {model.predict(new_run)[0]:.2f}")`,
    },
    takeaways: [
      "Every estimator is fit(X, y) then predict(X); X must be 2D and y 1D.",
      "Always split before fitting, pass random_state, and fit scalers on training data only.",
      "Report MAE alongside R²; rising train score with falling test score means overfitting.",
    ],
  },
  {
    slug: "sklearn-classification",
    title: "scikit-learn: classification",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 26,
    summary:
      "Logistic regression, decision trees, KNN, and the confusion matrix — plus why accuracy lies on imbalanced data.",
    whyForAi:
      "Classification covers spam detection, sentiment, intent routing, and fraud. The confusion matrix and the precision/recall trade-off are asked about in almost every ML interview, and getting them wrong in production means shipping a model that looks great and helps nobody.",
    packages: ["numpy", "scikit-learn", "matplotlib"],
    sections: [
      {
        heading: "The classifiers",
        body: `- **Logistic regression** — despite the name it classifies. Fast, interpretable coefficients, a strong baseline. Always try it first.
- **Decision tree** — splits on feature thresholds, easy to visualise, but overfits badly unless you cap \`max_depth\`.
- **Random forest** — many trees voting. Robust, strong on tabular data, less interpretable.
- **KNN** — labels a point by its nearest neighbours. No training step; slow at prediction time; requires scaled features.

For tabular problems, start with logistic regression as a baseline, then try a random forest or gradient boosting. Reach for a neural network only when the data is text, images, or audio.

Distance-based models (KNN, SVM) and regularised linear models **require feature scaling**. Tree-based models do not care.`,
      },
      {
        heading: "The confusion matrix",
        body: `For binary classification with a positive class:

|  | Predicted negative | Predicted positive |
| --- | --- | --- |
| **Actually negative** | True negative | False positive |
| **Actually positive** | False negative | True positive |

From those four numbers:

- **Accuracy** = correct / total. Misleading when classes are imbalanced.
- **Precision** = TP / (TP + FP). Of everything flagged, how much was right? Matters when a false positive is expensive — blocking a legitimate transaction.
- **Recall** = TP / (TP + FN). Of everything that mattered, how much did we catch? Matters when a false negative is expensive — missing a fraud or a tumour.
- **F1** = harmonic mean of precision and recall. One number when both matter.

The **accuracy trap**: with 99% negatives, a model that always predicts "negative" scores 99% accuracy and catches zero positives. Always look at the confusion matrix, never accuracy alone.`,
      },
      {
        heading: "Thresholds and ROC AUC",
        body: `Classifiers output a probability. The default cutoff of 0.5 is a **choice, not a law**. \`predict_proba\` gives the probability so you can pick your own.

Lower the threshold to catch more positives (higher recall, lower precision). Raise it to be more certain when you do flag something (higher precision, lower recall). Set it from the cost of each error type in your domain, not from convention.

**ROC AUC** summarises performance across every threshold: 0.5 is random, 1.0 is perfect. For heavily imbalanced data, precision-recall AUC is more informative than ROC AUC.

\`classification_report\` prints precision, recall, and F1 per class and is the fastest way to see what a model is actually doing.`,
      },
    ],
    examples: [
      {
        title: "Logistic regression with a full report",
        note: "classification_report is the first thing to print after training.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

rng = np.random.default_rng(42)
n = 600
length = rng.normal(50, 20, n)
links = rng.integers(0, 6, n).astype(float)
score = -4 + 0.05 * length + 0.9 * links + rng.normal(0, 1, n)
is_spam = (score > 0).astype(int)

X = np.column_stack([length, links])
X_train, X_test, y_train, y_test = train_test_split(X, is_spam, test_size=0.25, random_state=42, stratify=is_spam)

model = make_pipeline(StandardScaler(), LogisticRegression()).fit(X_train, y_train)
pred = model.predict(X_test)

print("accuracy:", round(accuracy_score(y_test, pred), 4))
print("\\nconfusion matrix [[TN FP] [FN TP]]:")
print(confusion_matrix(y_test, pred))
print("\\n" + classification_report(y_test, pred, target_names=["ham", "spam"]))`,
      },
      {
        title: "The accuracy trap on imbalanced data",
        note: "99% accuracy while catching zero fraud cases. Run it.",
        code: `import numpy as np
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, recall_score, precision_score, confusion_matrix

rng = np.random.default_rng(0)
n = 2000
X = rng.normal(0, 1, (n, 3))
y = np.zeros(n, dtype=int)
fraud_idx = rng.choice(n, size=20, replace=False)      # 1% positives
y[fraud_idx] = 1
X[fraud_idx] += 2.2

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)

for name, clf in [
    ("always predicts 'not fraud'", DummyClassifier(strategy="most_frequent")),
    ("logistic regression", LogisticRegression()),
    ("logistic + class_weight", LogisticRegression(class_weight="balanced")),
]:
    clf.fit(X_train, y_train)
    pred = clf.predict(X_test)
    print(f"{name:30} accuracy={accuracy_score(y_test, pred):.3f} "
          f"recall={recall_score(y_test, pred, zero_division=0):.3f} "
          f"precision={precision_score(y_test, pred, zero_division=0):.3f}")

print("\\nthe first model is 99% accurate and catches nothing")`,
      },
      {
        title: "Compare three classifiers",
        note: "Same interface, different trade-offs. Note the tree overfitting without a depth cap.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import f1_score, accuracy_score

rng = np.random.default_rng(5)
n = 800
X = rng.normal(0, 1, (n, 4))
y = ((X[:, 0] + X[:, 1] ** 2 - X[:, 2]) > 1).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

models = {
    "logistic regression": make_pipeline(StandardScaler(), LogisticRegression()),
    "decision tree (deep)": DecisionTreeClassifier(random_state=0),
    "decision tree (depth 4)": DecisionTreeClassifier(max_depth=4, random_state=0),
    "random forest": RandomForestClassifier(n_estimators=100, random_state=0),
    "knn (k=5)": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
}

print(f"{'model':<26}{'train acc':>11}{'test acc':>10}{'test F1':>10}")
print("-" * 57)
for name, model in models.items():
    model.fit(X_train, y_train)
    train_acc = accuracy_score(y_train, model.predict(X_train))
    test_pred = model.predict(X_test)
    print(f"{name:<26}{train_acc:>11.3f}{accuracy_score(y_test, test_pred):>10.3f}{f1_score(y_test, test_pred):>10.3f}")`,
      },
      {
        title: "Tuning the decision threshold",
        note: "Precision and recall move in opposite directions — pick the point your domain needs.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score

rng = np.random.default_rng(2)
n = 1000
X = rng.normal(0, 1, (n, 2))
y = ((X[:, 0] + X[:, 1] + rng.normal(0, 0.6, n)) > 0.8).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
model = LogisticRegression().fit(X_train, y_train)
probs = model.predict_proba(X_test)[:, 1]

print("ROC AUC (threshold independent):", round(roc_auc_score(y_test, probs), 4))
print(f"\\n{'threshold':>10}{'precision':>11}{'recall':>9}{'F1':>8}{'flagged':>9}")
for t in [0.2, 0.35, 0.5, 0.65, 0.8]:
    pred = (probs >= t).astype(int)
    print(f"{t:>10.2f}{precision_score(y_test, pred, zero_division=0):>11.3f}"
          f"{recall_score(y_test, pred, zero_division=0):>9.3f}"
          f"{f1_score(y_test, pred, zero_division=0):>8.3f}{pred.sum():>9}")

print("\\nlow threshold = catch more, be wrong more often")`,
      },
      {
        title: "Plot the confusion matrix",
        note: "A labelled heatmap is easier to read in a report than raw numbers.",
        code: `import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

rng = np.random.default_rng(42)
n = 700
X = rng.normal(0, 1, (n, 2))
y = ((X[:, 0] + X[:, 1] + rng.normal(0, 0.7, n)) > 0.5).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
pred = LogisticRegression().fit(X_train, y_train).predict(X_test)
cm = confusion_matrix(y_test, pred)

fig, ax = plt.subplots(figsize=(4.5, 4))
ax.imshow(cm, cmap="Blues")
labels = ["negative", "positive"]
ax.set_xticks([0, 1], labels=[f"predicted\\n{l}" for l in labels])
ax.set_yticks([0, 1], labels=[f"actual\\n{l}" for l in labels])
for i in range(2):
    for j in range(2):
        ax.text(j, i, cm[i, j], ha="center", va="center", fontsize=16,
                color="white" if cm[i, j] > cm.max() / 2 else "#0f172a", fontweight="bold")
ax.set_title("Confusion matrix")

tn, fp, fn, tp = cm.ravel()
print(f"true negatives {tn} | false positives {fp}")
print(f"false negatives {fn} | true positives {tp}")
print(f"\\nprecision {tp / (tp + fp):.3f}  recall {tp / (tp + fn):.3f}")`,
      },
    ],
    tryIt: {
      title: "Pick a threshold from business cost",
      hint: "Change the cost of a missed fraud to 5000 and see the optimal threshold drop.",
      starter: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

COST_FALSE_POSITIVE = 20     # annoying a good customer
COST_FALSE_NEGATIVE = 500    # a fraud we missed

rng = np.random.default_rng(3)
n = 1500
X = rng.normal(0, 1, (n, 3))
y = ((X[:, 0] * 1.5 + X[:, 1] + rng.normal(0, 0.8, n)) > 1.6).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
probs = LogisticRegression().fit(X_train, y_train).predict_proba(X_test)[:, 1]

print(f"positives in test set: {y_test.sum()} of {len(y_test)}")
print(f"\\n{'threshold':>10}{'FP':>6}{'FN':>6}{'total cost':>13}")

best = (None, float("inf"))
for t in np.arange(0.1, 0.95, 0.05):
    tn, fp, fn, tp = confusion_matrix(y_test, (probs >= t).astype(int)).ravel()
    cost = fp * COST_FALSE_POSITIVE + fn * COST_FALSE_NEGATIVE
    if cost < best[1]:
        best = (round(float(t), 2), cost)
    print(f"{t:>10.2f}{fp:>6}{fn:>6}{cost:>13,}")

print(f"\\ncheapest threshold: {best[0]} at a cost of {best[1]:,}")`,
    },
    takeaways: [
      "Accuracy hides failure on imbalanced data — always read the confusion matrix.",
      "Precision matters when false positives cost; recall matters when false negatives cost.",
      "The 0.5 threshold is a choice: use predict_proba and set it from real business cost.",
    ],
  },
  {
    slug: "sklearn-pipelines-and-clustering",
    title: "Pipelines, scaling, and clustering",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 24,
    summary:
      "Encode categories, scale features, chain it all in a Pipeline, then tune with cross-validation and grid search — plus K-means for unlabelled data.",
    whyForAi:
      "Pipelines are how professionals prevent data leakage and ship a single deployable object. Cross-validation gives an honest score, grid search tunes it, and K-means handles the very common case of having no labels at all.",
    packages: ["numpy", "scikit-learn", "matplotlib"],
    sections: [
      {
        heading: "Preprocessing",
        body: `**Scaling** puts features on a comparable range. \`StandardScaler\` gives mean 0 and standard deviation 1; \`MinMaxScaler\` squeezes into [0, 1]. Required for KNN, SVM, K-means, and regularised linear models. Irrelevant for trees.

**Categorical encoding**: \`OneHotEncoder\` makes one binary column per category and is correct for unordered categories like country or model name. \`OrdinalEncoder\` assigns integers and is only appropriate when order genuinely exists (small < medium < large). Using ordinal encoding on unordered data tells the model that "Germany" is greater than "Brazil", which is meaningless.

**Missing values**: \`SimpleImputer\` fills with mean, median, or a constant. Median is safer for skewed data. Consider adding a boolean "was missing" column — the fact that a value was absent is often predictive.`,
      },
      {
        heading: "Pipelines and ColumnTransformer",
        body: `A \`Pipeline\` chains preprocessing and a model into one object that itself has \`fit\` and \`predict\`.

Two reasons this matters:

1. **No leakage.** Inside cross-validation, the scaler is refit on each training fold rather than on the whole dataset. Scaling before splitting is the most common leak in beginner code, and it silently inflates scores.
2. **One deployable artifact.** Pickle the pipeline and production applies exactly the same transforms as training. Mismatched preprocessing between training and serving is a top cause of models that work in a notebook and fail in production.

\`ColumnTransformer\` applies different steps to different columns — scale the numbers, one-hot the categories — in a single object.`,
      },
      {
        heading: "Cross-validation, grid search, and K-means",
        body: `A single train/test split is one sample of performance and can be lucky. **K-fold cross-validation** splits into k parts, trains k times, and reports mean and standard deviation. That standard deviation tells you how much to trust the mean.

\`GridSearchCV\` tries every hyperparameter combination with cross-validation and refits the best one. Use \`RandomizedSearchCV\` when the grid is large.

**K-means** groups unlabelled data into k clusters. You must choose k: the elbow method plots inertia against k and you take the bend. Always scale before clustering, since K-means measures raw distance.

Clusters are not labels. They are groupings you still have to interpret and name.`,
      },
    ],
    examples: [
      {
        title: "A pipeline with mixed column types",
        note: "ColumnTransformer scales numbers and one-hot encodes categories in one object.",
        code: `import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.metrics import accuracy_score
import pandas as pd

rng = np.random.default_rng(42)
n = 500
df = pd.DataFrame({
    "tokens": rng.integers(50, 4000, n).astype(float),
    "latency_ms": rng.normal(800, 300, n),
    "model": rng.choice(["mini", "large", "local"], n),
    "region": rng.choice(["in", "us", "eu"], n),
})
df.loc[rng.choice(n, 30, replace=False), "latency_ms"] = np.nan
df["escalated"] = ((df["tokens"] > 2000) | (df["model"] == "local")).astype(int)

numeric = ["tokens", "latency_ms"]
categorical = ["model", "region"]

preprocess = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), numeric),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
])

pipeline = Pipeline([
    ("prep", preprocess),
    ("model", RandomForestClassifier(n_estimators=120, random_state=0)),
])

X_train, X_test, y_train, y_test = train_test_split(
    df[numeric + categorical], df["escalated"], test_size=0.25, random_state=0, stratify=df["escalated"]
)
pipeline.fit(X_train, y_train)
print("missing values handled:", int(df["latency_ms"].isna().sum()))
print("test accuracy:", round(accuracy_score(y_test, pipeline.predict(X_test)), 4))
print("\\none pipeline object holds imputation, scaling, encoding, and the model")`,
      },
      {
        title: "Why scaling before splitting leaks",
        note: "The leaky version scores higher than it deserves. Cross-validation inside a pipeline is honest.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)
X = rng.normal(0, 1, (300, 20))
y = rng.integers(0, 2, 300)                  # labels are pure noise

leaky_X = StandardScaler().fit_transform(X)  # fit on ALL data, including test folds
leaky = cross_val_score(LogisticRegression(max_iter=500), leaky_X, y, cv=5).mean()

honest = cross_val_score(
    make_pipeline(StandardScaler(), LogisticRegression(max_iter=500)), X, y, cv=5
).mean()

print("labels are random, so the true score should be about 0.50")
print(f"scaled before splitting : {leaky:.4f}")
print(f"scaled inside pipeline  : {honest:.4f}")`,
      },
      {
        title: "Cross-validation and grid search",
        note: "The standard deviation tells you how much to trust the mean.",
        code: `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, cross_val_score

rng = np.random.default_rng(7)
X = rng.normal(0, 1, (400, 5))
y = ((X[:, 0] + X[:, 1] ** 2) > 1).astype(int)

scores = cross_val_score(RandomForestClassifier(n_estimators=80, random_state=0), X, y, cv=5)
print("fold scores:", [round(float(s), 4) for s in scores])
print(f"mean {scores.mean():.4f} +/- {scores.std():.4f}")

grid = GridSearchCV(
    RandomForestClassifier(random_state=0),
    {"n_estimators": [50, 150], "max_depth": [3, 6, None]},
    cv=4,
    scoring="f1",
)
grid.fit(X, y)
print("\\nbest params:", grid.best_params_)
print("best CV F1 :", round(grid.best_score_, 4))
print("combinations tried:", len(grid.cv_results_["params"]))`,
      },
      {
        title: "K-means with the elbow method",
        note: "The bend in the curve suggests how many clusters the data really has.",
        code: `import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(42)
blobs = np.vstack([
    rng.normal([0, 0], 0.6, (120, 2)),
    rng.normal([4, 4], 0.6, (120, 2)),
    rng.normal([0, 5], 0.6, (120, 2)),
])
X = StandardScaler().fit_transform(blobs)

inertias = []
ks = range(1, 8)
for k in ks:
    inertias.append(KMeans(n_clusters=k, n_init=10, random_state=0).fit(X).inertia_)

model = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)

fig, axes = plt.subplots(1, 2, figsize=(9.5, 3.6))
axes[0].plot(list(ks), inertias, marker="o", color="#1d4ed8")
axes[0].axvline(3, color="#ea580c", linestyle="--", label="elbow at k=3")
axes[0].set_title("Elbow method")
axes[0].set_xlabel("Number of clusters (k)")
axes[0].set_ylabel("Inertia (within-cluster sum of squares)")
axes[0].legend()

axes[1].scatter(X[:, 0], X[:, 1], c=model.labels_, cmap="viridis", alpha=0.7)
axes[1].scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1],
                marker="X", s=200, color="#dc2626", label="centroids")
axes[1].set_title("K-means clusters (k=3)")
axes[1].set_xlabel("Feature 1 (standardised)")
axes[1].set_ylabel("Feature 2 (standardised)")
axes[1].legend()
fig.tight_layout()

unique, counts = np.unique(model.labels_, return_counts=True)
print("cluster sizes:", dict(zip(unique.tolist(), counts.tolist())))
print("inertia at k=3:", round(float(model.inertia_), 2))`,
      },
    ],
    tryIt: {
      title: "Tune a pipeline with grid search",
      hint: "Add 0.01 to the C values list and see whether a stronger penalty wins.",
      starter: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report

rng = np.random.default_rng(21)
n = 600
X = rng.normal(0, 1, (n, 6))
y = ((X[:, 0] * 2 + X[:, 3] - X[:, 4] + rng.normal(0, 0.7, n)) > 0.9).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

pipeline = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])

search = GridSearchCV(
    pipeline,
    {"clf__C": [0.1, 1.0, 10.0], "clf__class_weight": [None, "balanced"]},
    cv=5,
    scoring="f1",
)
search.fit(X_train, y_train)

print("best params:", search.best_params_)
print("best CV F1 :", round(search.best_score_, 4))
print("\\nheld-out test performance:")
print(classification_report(y_test, search.predict(X_test), target_names=["no", "yes"]))`,
    },
    takeaways: [
      "Put every transform inside a Pipeline — it prevents leakage and ships as one artifact.",
      "One-hot unordered categories; ordinal encoding implies an order that may not exist.",
      "Cross-validate for an honest mean and spread, then GridSearchCV to tune.",
    ],
  },
  {
    slug: "databases-with-python",
    title: "Databases and SQL from Python",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 20,
    summary:
      "Query SQLite from Python, use parameters to avoid injection, and move results into pandas.",
    whyForAi:
      "Training data usually starts in a database. Feature stores, experiment metadata, RAG document stores, and chat history are all tables. Knowing enough SQL from Python to pull, join, and aggregate is a baseline skill for any AI engineer.",
    packages: ["sqlite3", "pandas", "numpy"],
    sections: [
      {
        heading: "sqlite3, and how it maps to everything else",
        body: `\`sqlite3\` is in the standard library and needs no server, which makes it perfect for learning, tests, and local caches. The API is the Python **DB-API 2.0**, so \`psycopg\` for PostgreSQL and \`mysql-connector\` for MySQL work the same way — only the connection string changes.

The flow is always: connect, get a cursor, execute, fetch, commit, close.

Use \`with sqlite3.connect(path) as conn:\` so a transaction commits on success and rolls back on an exception.

Fetching: \`fetchone()\` for one row, \`fetchall()\` for everything, or iterate the cursor for large result sets so you do not load the whole table into memory.`,
      },
      {
        heading: "Parameters, not string formatting",
        body: `**Never** build SQL with f-strings or \`+\`. This is SQL injection, and it is still one of the most exploited vulnerabilities in production systems.

Use placeholders and pass values separately:

\`\`\`python
cur.execute("SELECT * FROM runs WHERE model = ?", (model_name,))
\`\`\`

The driver escapes the value safely. SQLite uses \`?\`; PostgreSQL uses \`%s\`; some drivers support named parameters like \`:model\`.

This matters doubly in AI applications, where the value often comes from an LLM or a user prompt. An agent that writes SQL from natural language must run against a read-only connection with a restricted user, never with credentials that can drop a table.

\`executemany\` inserts many rows in one call and is dramatically faster than looping \`execute\`.`,
      },
      {
        heading: "Getting data into pandas",
        body: `\`pd.read_sql_query(sql, conn)\` returns a DataFrame directly — the fastest route from a database to analysis or model training.

Push aggregation **into the database** when the table is large. \`GROUP BY\` on the server transfers a handful of rows instead of millions; the same aggregation in pandas requires loading everything first.

For bigger applications, SQLAlchemy provides connection pooling and an ORM. Start with raw SQL; add SQLAlchemy when connection management or model mapping becomes the pain point.

Index the columns you filter and join on. A missing index turns a fast query into a full table scan, and it is the single most common cause of a slow data pipeline.`,
      },
    ],
    examples: [
      {
        title: "Create, insert, and query",
        note: "Runs here — SQLite is loaded on demand into the browser sandbox.",
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
    "INSERT INTO runs (model, accuracy, tokens, created_at) VALUES (?, ?, ?, ?)", rows
)
conn.commit()

print("rows inserted:", cur.rowcount)
for row in cur.execute("SELECT id, model, accuracy FROM runs ORDER BY accuracy DESC LIMIT 3"):
    print(row)

cur.execute("SELECT COUNT(*), AVG(accuracy) FROM runs")
count, avg = cur.fetchone()
print(f"\\n{count} runs, mean accuracy {avg:.4f}")
conn.close()`,
      },
      {
        title: "Parameters prevent SQL injection",
        note: "The unsafe query deletes the table. Run it and see.",
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.executescript("""
    CREATE TABLE users (id INTEGER, name TEXT);
    INSERT INTO users VALUES (1, 'priya'), (2, 'arjun');
""")

# Safe: the value is passed separately and escaped by the driver.
malicious = "priya'; DROP TABLE users; --"
safe = conn.execute("SELECT * FROM users WHERE name = ?", (malicious,)).fetchall()
print("safe query result:", safe)
print("table still exists:", conn.execute("SELECT COUNT(*) FROM users").fetchone()[0], "rows")

# Unsafe: string interpolation lets the input become code.
try:
    conn.executescript(f"SELECT * FROM users WHERE name = '{malicious}'")
except sqlite3.Error as err:
    print("error:", err)

remaining = conn.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
).fetchall()
print("users table after injection:", remaining or "GONE — the table was dropped")
conn.close()`,
      },
      {
        title: "Aggregate in SQL, analyse in pandas",
        note: "GROUP BY on the server transfers far less data than loading every row.",
        code: `import pandas as pd
import sqlite3

conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE calls (model TEXT, tokens INTEGER, latency_ms INTEGER, ok INTEGER)")
conn.executemany("INSERT INTO calls VALUES (?, ?, ?, ?)", [
    ("mini", 620, 640, 1), ("mini", 540, 580, 1), ("mini", 900, 30000, 0),
    ("large", 1520, 1800, 1), ("large", 1480, 1750, 1),
    ("haiku", 460, 420, 1), ("haiku", 480, 450, 1),
])
conn.commit()

summary = pd.read_sql_query("""
    SELECT model,
           COUNT(*)             AS calls,
           SUM(tokens)          AS total_tokens,
           ROUND(AVG(latency_ms), 1) AS avg_latency,
           ROUND(AVG(ok) * 100, 1)   AS success_pct
    FROM calls
    GROUP BY model
    HAVING COUNT(*) > 1
    ORDER BY total_tokens DESC
""", conn)

print(summary.to_string(index=False))
print("\\ntotal tokens across all models:", int(summary["total_tokens"].sum()))
conn.close()`,
      },
      {
        title: "A safe query helper with a row factory",
        note: "sqlite3.Row lets you access columns by name instead of position.",
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
conn.execute("CREATE TABLE docs (id INTEGER PRIMARY KEY, title TEXT, topic TEXT, score REAL)")
conn.executemany("INSERT INTO docs (title, topic, score) VALUES (?, ?, ?)", [
    ("Intro to MLOps", "mlops", 0.91),
    ("RAG patterns", "genai", 0.87),
    ("Kubernetes basics", "infra", 0.62),
    ("Agent design", "genai", 0.94),
])
conn.commit()

def search_docs(connection, topic, min_score=0.0, limit=10):
    sql = """
        SELECT id, title, topic, score
        FROM docs
        WHERE topic = ? AND score >= ?
        ORDER BY score DESC
        LIMIT ?
    """
    return [dict(row) for row in connection.execute(sql, (topic, min_score, limit))]

for doc in search_docs(conn, "genai", min_score=0.8):
    print(f"{doc['id']}. {doc['title']:20} {doc['topic']:7} {doc['score']:.2f}")

print("\\nno matches returns empty list:", search_docs(conn, "unknown"))
conn.close()`,
      },
      {
        title: "Connecting to PostgreSQL (run locally)",
        note: "Same DB-API flow, different driver and placeholder style.",
        code: `# pip install "psycopg[binary]" pandas
import os
import pandas as pd
import psycopg

DSN = os.environ["DATABASE_URL"]      # postgresql://user:pass@host:5432/dbname

def fetch_recent_runs(model_name, limit=100):
    sql = """
        SELECT id, model, accuracy, created_at
        FROM runs
        WHERE model = %s
        ORDER BY created_at DESC
        LIMIT %s
    """
    with psycopg.connect(DSN) as conn:
        return pd.read_sql_query(sql, conn, params=(model_name, limit))

# df = fetch_recent_runs("gpt-4.1-mini")
# print(df.head())`,
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
    SELECT u.id,
           u.plan,
           COUNT(e.tokens)                AS n_calls,
           SUM(e.tokens)                  AS total_tokens,
           ROUND(AVG(e.tokens), 1)        AS avg_tokens,
           ROUND(AVG(e.ok) * 100, 1)      AS success_pct
    FROM users u
    JOIN events e ON e.user_id = u.id
    GROUP BY u.id, u.plan
    ORDER BY total_tokens DESC
""").fetchall()

print(f"{'id':<4}{'plan':<7}{'calls':>7}{'tokens':>9}{'avg':>9}{'success':>10}")
print("-" * 46)
for row in features:
    print(f"{row['id']:<4}{row['plan']:<7}{row['n_calls']:>7}{row['total_tokens']:>9}"
          f"{row['avg_tokens']:>9}{row['success_pct']:>9}%")

conn.close()`,
    },
    takeaways: [
      "sqlite3 follows DB-API 2.0, so Postgres and MySQL drivers work the same way.",
      "Always use placeholders — never build SQL with f-strings, especially with LLM input.",
      "pd.read_sql_query moves results into pandas; aggregate in SQL when tables are large.",
    ],
  },
];

"use client";

import type { LaptopRun as LaptopRunData } from "@/lib/python-course/types";
import CopyButton from "./CopyButton";
import LessonMarkdown from "./LessonMarkdown";

function downloadFile(name: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Command({ text }: { text: string }) {
  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg bg-[#0f172a] px-3 py-2.5">
      <pre className="flex-1 min-w-0 overflow-x-auto font-mono text-[13px] leading-6 text-slate-100 whitespace-pre">
        {text}
      </pre>
      <CopyButton text={text} tone="dark" />
    </div>
  );
}

function githubSteps(repo: string, files: string[]) {
  const names = files.map((name) => `\`${name}\``).join(", ");
  return [
    { text: "Create a free account at [github.com](https://github.com) if you do not have one yet." },
    {
      text: `Click **+** (top right), then **New repository**. Name it \`${repo}\`, choose **Public**, and click **Create repository**.`,
    },
    {
      text: `**Easiest way:** on the new repository page, click **uploading an existing file**, drag in ${names}, and click **Commit changes**. Done.`,
    },
    {
      text: "**The way companies work:** install Git from [git-scm.com](https://git-scm.com), open a terminal in your project folder, and run these. Replace `YOUR-USERNAME` with your GitHub username. The two `git config` lines are needed only once per computer. The first push asks you to sign in: on Windows a browser window opens. On Mac or Linux, GitHub does not accept your account password here, so use a [personal access token](https://github.com/settings/tokens) as the password, or publish with [GitHub Desktop](https://desktop.github.com) instead.",
      command: [
        'git config --global user.name "Your Name"',
        'git config --global user.email "you@example.com"',
        "git init",
        "git add .",
        `git commit -m "First version of ${repo}"`,
        "git branch -M main",
        `git remote add origin https://github.com/YOUR-USERNAME/${repo}.git`,
        "git push -u origin main",
      ].join("\n"),
    },
    {
      text: "Put the repository link on your resume and LinkedIn under **Projects**, with one line on what it does and one on what you learned. Recruiters open these.",
    },
  ];
}

function StepList({ steps }: { steps: { text: string; command?: string }[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1 text-[15px] leading-7">
            <LessonMarkdown content={step.text} />
            {step.command && <Command text={step.command} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Complete files and steps to run the lesson for real on the learner's computer. */
export default function LaptopRun({ laptop }: { laptop: LaptopRunData }) {
  return (
    <section id="on-your-laptop" className="pt-2 border-t border-slate-200 scroll-mt-20">
      <div className="pt-4 mb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">On your laptop</p>
        <h2 className="font-display text-xl font-bold text-slate-900 mb-2">Run the real thing on your computer</h2>
        <div className="text-[15px] leading-7">
          <LessonMarkdown content={laptop.intro} />
        </div>
      </div>

      <StepList steps={laptop.steps} />

      <div className="mt-5 space-y-4">
        {laptop.files.map((file) => (
          <div key={file.name} className="rounded-xl border border-slate-300 overflow-hidden bg-white">
            <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-100 border-b border-slate-300">
              <p className="font-mono text-[13px] font-bold text-slate-800 truncate">{file.name}</p>
              <div className="flex shrink-0 gap-1.5">
                <CopyButton text={file.content} />
                <button
                  type="button"
                  onClick={() => downloadFile(file.name, file.content)}
                  className="text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-md border border-slate-900 bg-slate-900 text-white hover:bg-slate-700"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="max-h-[420px] overflow-auto bg-[#0f172a] p-3 font-mono text-[13px] leading-6 text-slate-100 whitespace-pre">
              {file.content}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[15px] font-semibold text-slate-900">Run it from the same folder:</p>
        <Command text={laptop.run} />
        {laptop.expected && (
          <>
            <p className="mt-3 text-[15px] font-semibold text-slate-900">You should see something like:</p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 font-mono text-[13px] leading-6 text-slate-700 whitespace-pre">
              {laptop.expected}
            </pre>
          </>
        )}
      </div>

      {laptop.repo && (
        <div className="mt-6 rounded-xl border-2 border-slate-900 bg-[#fdfcf8] p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-1">Show it to recruiters</p>
          <h3 className="font-display text-lg font-bold text-slate-900 mb-3">Put it on GitHub</h3>
          <StepList steps={githubSteps(laptop.repo, laptop.files.map((file) => file.name))} />
        </div>
      )}
    </section>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { LessonOutline } from "@/lib/python-course/types";
import {
  loadCertificateRecord,
  makeCertificateCode,
  saveCertificateRecord,
  type CertificateKind,
} from "@/lib/python-course/certificate";
import { hasCompletedLessons, readCourseProgress } from "@/lib/python-course/progress";
import { SITE } from "@/lib/constants";
import { SketchCard } from "./sketches";

const W = 1400;
const H = 990;

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

async function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let cy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy);
      line = word;
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
}

type PaintArgs = {
  name: string;
  kind: CertificateKind;
  issuedAt: string;
  unlocked: boolean;
  completedCount: number;
  total: number;
  foundationsTotal: number;
};

async function paintCertificate(canvas: HTMLCanvasElement, args: PaintArgs) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const displayName = args.name.trim() || "Your Name";
  const code = makeCertificateCode(displayName, args.kind, args.issuedAt);
  const title = args.kind === "full" ? "Certificate of Completion" : "Certificate of Achievement";
  const courseLabel =
    args.kind === "full"
      ? "Free Python Course for AI, ML and GenAI Engineers"
      : "Python Foundations for AI and ML Engineers";

  const [signature, photo] = await Promise.all([
    loadImage("/assets/signature-rajinikanth.svg"),
    loadImage("/assets/pic-1.png"),
  ]);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, W - 72, H - 72);
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(56, 56, W - 112, 18);
  ctx.fillStyle = "#ea580c";
  ctx.fillRect(56, H - 74, W - 112, 18);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 28px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.fillText(SITE.name.toUpperCase(), W / 2, 130);

  ctx.fillStyle = "#475569";
  ctx.font = "500 18px Inter, Arial, sans-serif";
  ctx.fillText("AI · ML · GenAI · MLOps Mentor", W / 2, 164);

  ctx.fillStyle = "#1d4ed8";
  ctx.font = "700 54px Georgia, 'Times New Roman', serif";
  ctx.fillText(title, W / 2, 250);

  ctx.fillStyle = "#64748b";
  ctx.font = "500 20px Inter, Arial, sans-serif";
  ctx.fillText("This certifies that", W / 2, 310);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 64px Georgia, 'Times New Roman', serif";
  ctx.fillText(displayName, W / 2, 390);

  const nameWidth = Math.min(ctx.measureText(displayName).width + 40, 900);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameWidth / 2, 410);
  ctx.lineTo(W / 2 + nameWidth / 2, 410);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "500 22px Inter, Arial, sans-serif";
  ctx.fillText("has successfully completed", W / 2, 460);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 30px Georgia, 'Times New Roman', serif";
  drawWrappedText(ctx, courseLabel, W / 2, 510, 980, 38);

  ctx.fillStyle = "#475569";
  ctx.font = "500 18px Inter, Arial, sans-serif";
  const detail =
    args.kind === "full"
      ? `${args.total} lessons · foundations through GenAI and production Python · with checked exercises`
      : `${args.foundationsTotal} foundation lessons · syntax, data types, text, collections, and control flow`;
  ctx.fillText(detail, W / 2, 580);

  ctx.fillStyle = "#64748b";
  ctx.font = "500 16px Inter, Arial, sans-serif";
  ctx.fillText(
    `Issued on ${formatDate(args.issuedAt)}  ·  ${SITE.url.replace("https://", "")}`,
    W / 2,
    620,
  );

  const sigX = 220;
  const sigY = 700;
  if (signature) {
    ctx.drawImage(signature, sigX, sigY, 320, 86);
  } else {
    ctx.fillStyle = "#0f172a";
    ctx.font = "italic 42px 'Segoe Script', 'Brush Script MT', cursive";
    ctx.textAlign = "left";
    ctx.fillText("Rajinikanth Vadla", sigX + 10, sigY + 55);
    ctx.textAlign = "center";
  }

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sigX, sigY + 96);
  ctx.lineTo(sigX + 320, sigY + 96);
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 18px Inter, Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Rajinikanth Vadla", sigX, sigY + 124);
  ctx.fillStyle = "#64748b";
  ctx.font = "500 15px Inter, Arial, sans-serif";
  ctx.fillText("Instructor & Mentor", sigX, sigY + 148);

  if (photo) {
    const px = W - 280;
    const py = 690;
    ctx.save();
    ctx.beginPath();
    ctx.arc(px + 55, py + 55, 55, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(photo, px, py, 110, 110);
    ctx.restore();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(px + 55, py + 55, 55, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#94a3b8";
  ctx.font = "500 14px ui-monospace, Menlo, monospace";
  ctx.fillText(`Certificate ID: ${code}`, W / 2, H - 100);

  if (!args.unlocked) {
    ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
    ctx.fillRect(56, 56, W - 112, H - 112);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 36px Inter, Arial, sans-serif";
    ctx.fillText("Complete the lessons to unlock download", W / 2, H / 2 - 10);
    ctx.font = "500 20px Inter, Arial, sans-serif";
    ctx.fillText(
      args.kind === "full"
        ? `Full course: ${args.completedCount}/${args.total} lessons passed`
        : `Foundations: pass every Week 1 exercise`,
      W / 2,
      H / 2 + 34,
    );
  }
}

type Props = {
  outline: LessonOutline[];
  foundationSlugs: string[];
};

export default function CertificateView({ outline, foundationSlugs }: Props) {
  const total = outline.length;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [kind, setKind] = useState<CertificateKind>("foundations");
  const [readyFoundations, setReadyFoundations] = useState(false);
  const [readyFull, setReadyFull] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [nextLesson, setNextLesson] = useState(outline[0]);
  const [status, setStatus] = useState("");
  const [issuedAt, setIssuedAt] = useState(new Date().toISOString());
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const unlocked = kind === "full" ? readyFull : readyFoundations;

  const paintArgs = useMemo(
    () => ({
      name,
      kind,
      issuedAt,
      unlocked,
      completedCount,
      total,
      foundationsTotal: foundationSlugs.length,
    }),
    [name, kind, issuedAt, unlocked, completedCount, total, foundationSlugs.length],
  );

  const refreshProgress = useCallback(() => {
    const progress = readCourseProgress();
    setCompletedCount(progress.completed.length);
    setNextLesson(
      outline.find((lesson) => !progress.completed.includes(lesson.slug)) ?? outline[outline.length - 1],
    );
    setReadyFoundations(hasCompletedLessons(foundationSlugs, progress));
    setReadyFull(hasCompletedLessons(outline.map((lesson) => lesson.slug), progress));
  }, [outline, foundationSlugs]);

  useEffect(() => {
    refreshProgress();
    const saved = loadCertificateRecord();
    if (saved) {
      setName(saved.name);
      setKind(saved.kind);
      setIssuedAt(saved.issuedAt);
    }
    setHydrated(true);
    window.addEventListener("python-course-progress", refreshProgress);
    return () => window.removeEventListener("python-course-progress", refreshProgress);
  }, [refreshProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    void paintCertificate(canvas, paintArgs);
  }, [paintArgs]);

  async function issueAndDownload() {
    const clean = name.trim();
    if (!clean) {
      setStatus("Enter your full name first.");
      return;
    }
    if (!unlocked) {
      setStatus(
        kind === "full"
          ? "Pass the exercise in every lesson to unlock the full certificate."
          : "Pass every Week 1 exercise, including its project, to unlock this certificate.",
      );
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    setBusy(true);
    const now = new Date().toISOString();
    const code = makeCertificateCode(clean, kind, now);
    saveCertificateRecord({ name: clean, kind, issuedAt: now, code });
    setIssuedAt(now);

    await paintCertificate(canvas, {
      name: clean,
      kind,
      issuedAt: now,
      unlocked: true,
      completedCount,
      total,
      foundationsTotal: foundationSlugs.length,
    });

    const link = document.createElement("a");
    const safe = clean.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
    link.download = `python-certificate-${kind}-${safe || "student"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setStatus("Certificate downloaded. You can share the PNG on LinkedIn or your resume.");
    setBusy(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
          Python course
        </Link>
        <span className="text-slate-300 mx-2">/</span>
        <span className="text-slate-500">Certificate</span>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
        Your Python course certificate
      </h1>
      <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl">
        This page is the finish line. Every lesson ends with an exercise that checks your answer. Pass them on this
        device, enter your name, and download a PNG certificate signed by Rajinikanth Vadla. Progress is saved in
        this browser.
      </p>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 mb-6">
        <div className="border-2 border-slate-900 rounded-lg bg-white p-5 shadow-[4px_4px_0_#0f172a]">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">New here?</p>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Start the course, then come back</h2>
          <p className="text-sm text-slate-700 leading-6 mb-3">
            You do not need a name yet. Python is a programming language, and you can learn it in this browser with
            nothing to install. Lesson 1 takes about 12 minutes. This download unlocks after the lessons are passed
            on this device.
          </p>
          <Link
            href={`/python-course/${nextLesson?.slug || "why-python-for-ai"}/`}
            className="notion-btn notion-btn--ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {hydrated && completedCount > 0 ? `Continue: ${nextLesson?.title ?? "the next lesson"}` : "Start with Python Intro"} &rarr;
          </Link>
          <p className="mt-3 text-sm text-slate-700">
            <Link href="/mentorship/" className="font-bold text-blue-700 hover:underline">
              Mentorship
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/courses/" className="font-bold text-blue-700 hover:underline">
              Live courses
            </Link>
          </p>
        </div>
        <SketchCard
          kind="browser"
          title="A browser window where Python runs with no install"
          caption="Press Run on a lesson. Python stays in the browser. The certificate waits here."
        />
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={hydrated ? completedCount : 0}
        aria-label="Lessons passed on this device"
        className="mb-6 h-2 rounded-full bg-slate-200 overflow-hidden border border-slate-300"
      >
        <div
          className="h-full bg-blue-700"
          style={{ width: `${total === 0 ? 0 : Math.round(((hydrated ? completedCount : 0) / total) * 100)}%` }}
        />
      </div>

      <div className="rounded-xl border-2 border-slate-900 bg-white p-5 mb-6 shadow-[4px_4px_0_#0f172a]">
        <p className="text-sm text-slate-700 mb-4">
          Progress on this device:{" "}
          <span className="font-bold text-slate-900">
            {completedCount}/{total} lessons passed
          </span>
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Student full name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="mt-1.5 w-full rounded-lg border-2 border-slate-900 px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <fieldset>
            <legend className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Certificate type
            </legend>
            <div className="mt-1.5 flex flex-col gap-2">
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="kind"
                  checked={kind === "foundations"}
                  onChange={() => setKind("foundations")}
                  className="mt-1"
                />
                <span>
                  <span className="font-bold text-slate-900">Foundations</span>
                  {" · "}
                  {readyFoundations
                    ? "Unlocked"
                    : `Complete Week 1 (${foundationSlugs.length} lessons)`}
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="kind"
                  checked={kind === "full"}
                  onChange={() => setKind("full")}
                  className="mt-1"
                />
                <span>
                  <span className="font-bold text-slate-900">Full course</span>
                  {" · "}
                  {readyFull ? "Unlocked" : `Complete all ${total} lessons`}
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void issueAndDownload()}
            className="notion-btn notion-btn--ink disabled:opacity-50"
            disabled={!unlocked || !name.trim() || busy}
          >
            {busy ? "Preparing..." : "Download certificate PNG"}
          </button>
          <Link href="/python-course/" className="notion-btn notion-btn--ghost">
            Back to lessons
          </Link>
        </div>
        {status && <p className="mt-3 text-sm text-emerald-700">{status}</p>}
        {!unlocked && (
          <div className="mt-4 border-t border-slate-200 pt-4">
            <p className="mb-2 text-sm text-slate-600">
              Continue with the first lesson not yet completed:
            </p>
            <Link
              href={`/python-course/${nextLesson.slug}/`}
              className="inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
            >
              Continue: {nextLesson.title} →
            </Link>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border-2 border-slate-900 bg-slate-100 p-3">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="mx-auto max-w-full h-auto bg-white shadow-sm"
          aria-label="Certificate preview"
        />
      </div>
    </div>
  );
}

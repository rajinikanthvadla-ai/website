import { useId, type ReactNode } from "react";

export type SketchKind =
  | "variables"
  | "list"
  | "loop"
  | "function"
  | "model"
  | "browser"
  | "fork"
  | "string"
  | "dict"
  | "steps";

type FrameProps = {
  title: string;
  caption: string;
  children: ReactNode;
};

const INK = "#0f172a";
const BLUE = "#1d4ed8";
const ORANGE = "#c2410c";

function SketchFrame({ title, caption, children }: FrameProps) {
  const rawId = useId().replace(/:/g, "");
  const titleId = `sketch-title-${rawId}`;
  const filterId = `sketch-rough-${rawId}`;

  return (
    <figure className="border-2 border-slate-900 bg-[#fffef8] rounded-lg p-3 shadow-[4px_4px_0_#0f172a]">
      <svg
        viewBox="0 0 360 168"
        role="img"
        aria-labelledby={titleId}
        className="w-full h-auto"
      >
        <title id={titleId}>{title}</title>
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.15" />
        </filter>
        <g filter={`url(#${filterId})`} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </g>
      </svg>
      <figcaption className="mt-1 text-sm leading-6 text-slate-800">{caption}</figcaption>
    </figure>
  );
}

function Label({
  x,
  y,
  children,
  fill = INK,
}: {
  x: number | string;
  y: number | string;
  children: string;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      stroke="none"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="14"
      fontWeight="700"
    >
      {children}
    </text>
  );
}

function Variables() {
  return (
    <>
      <path d="M16 36c2-8 78-10 96-2 4 28 2 62-4 70-30 6-86 4-92-6-4-24-2-40 0-62z" fill="#fff" />
      <path d="M134 40c4-8 74-8 90 0 6 26 4 54-2 66-28 8-80 4-88-4-4-22-4-42 0-62z" fill="#dbeafe" />
      <path d="M248 34c2-6 78-8 92 2 4 24 6 58-2 70-32 8-84 2-90-6-2-22 0-46 0-66z" fill="#ffedd5" />
      <Label x="28" y="62">name</Label>
      <Label x="28" y="86" fill={BLUE}>&quot;Asha&quot;</Label>
      <Label x="148" y="66">score</Label>
      <Label x="148" y="90" fill={BLUE}>0.91</Label>
      <Label x="262" y="60">ready</Label>
      <Label x="262" y="84" fill={ORANGE}>True</Label>
    </>
  );
}

function ListTray() {
  return (
    <>
      <path d="M28 48c4-10 280-12 304 0 6 18 4 70-2 84-40 10-260 8-300-2-6-16-8-62-2-82z" fill="#fff" />
      <path d="M48 70c2-6 70-6 78 2 2 16 0 28-2 32-22 4-70 2-76-2-2-10-2-24 0-32z" fill="#dbeafe" />
      <path d="M142 72c2-6 68-8 76 0 2 14 2 28 0 34-20 4-70 2-76-2-2-10 0-22 0-32z" fill="#fff" />
      <path d="M234 68c2-6 70-4 78 2 4 16 2 30-2 36-24 4-70 0-76-4-2-10-2-24 0-34z" fill="#ffedd5" />
      <Label x="58" y="92">MLOps</Label>
      <Label x="158" y="94">RAG</Label>
      <Label x="250" y="90">Eval</Label>
      <Label x="48" y="128" fill={BLUE}>0</Label>
    </>
  );
}

function LoopCycle() {
  return (
    <>
      <path d="M180 28c48 2 78 28 78 58 0 36-32 60-78 58-50-2-82-30-78-62 4-28 28-54 78-54z" fill="#fff" />
      <path d="M246 46c18 14 16 40-2 52" />
      <path d="M248 40l8 12-16 2" />
      <Label x="148" y="78">each</Label>
      <Label x="142" y="98">score</Label>
    </>
  );
}

function FunctionMachine() {
  return (
    <>
      <path d="M18 70c2-8 40-10 52-2 4 10 2 22-2 28-16 6-46 2-50-4-2-8 0-16 0-22z" fill="#dbeafe" />
      <path d="M78 78h36" />
      <path d="M108 70l10 8-10 8" />
      <path d="M128 40c4-8 100-10 118 0 8 28 6 62-4 74-36 10-104 6-114-4-6-22-8-48 0-70z" fill="#fff" />
      <path d="M252 78h28" />
      <path d="M274 70l12 8-12 8" />
      <path d="M292 64c2-6 48-8 56 0 2 12 2 24 0 32-16 6-50 2-56-2-2-10 0-20 0-30z" fill="#ffedd5" />
      <Label x="24" y="88">scores</Label>
      <Label x="150" y="78">average()</Label>
      <Label x="154" y="98" fill={BLUE}>machine</Label>
      <Label x="300" y="84">0.82</Label>
    </>
  );
}

function ModelFlow() {
  return (
    <>
      <path d="M16 40c2-8 78-8 88 2 4 20 2 52-4 62-24 8-76 4-84-2-4-16-4-46 0-62z" fill="#fff" />
      <Label x="28" y="62">rows</Label>
      <Label x="28" y="82" fill={BLUE}>0.2</Label>
      <Label x="28" y="100" fill={BLUE}>0.9</Label>
      <path d="M112 78h28" />
      <path d="M134 70l12 8-12 8" />
      <path d="M156 36c4-10 90-8 104 2 8 24 6 64-4 78-32 10-96 4-104-6-4-22-2-52 4-74z" fill="#dbeafe" />
      <Label x="176" y="78">model</Label>
      <Label x="168" y="100" fill={BLUE}>learns</Label>
      <path d="M268 78h22" />
      <path d="M284 70l12 8-12 8" />
      <path d="M300 58c2-8 46-6 50 2 2 14 0 28-2 32-14 6-44 2-48-4-2-8 0-20 0-30z" fill="#ffedd5" />
      <Label x="306" y="80">keep</Label>
    </>
  );
}

function BrowserSketch() {
  return (
    <>
      <path d="M28 28c4-8 280-6 304 2 4 8 6 100 0 112-20 8-280 6-300-2-6-18-8-96-4-112z" fill="#fff" />
      <path d="M40 46h250" />
      <circle cx="52" cy="40" r="3" fill={ORANGE} stroke={ORANGE} />
      <circle cx="66" cy="40" r="3" fill={BLUE} stroke={BLUE} />
      <circle cx="80" cy="40" r="3" fill={INK} stroke={INK} />
      <Label x="48" y="84">print(&quot;Hello&quot;)</Label>
      <path d="M48 104c40-2 90 0 120 2" />
      <Label x="48" y="128" fill={BLUE}>Press Run. No install.</Label>
    </>
  );
}

function ForkSketch() {
  return (
    <>
      <path d="M168 24l46 32-46 32-46-32z" fill="#fff" />
      <Label x="148" y="60">if?</Label>
      <path d="M130 78c-30 16-48 28-70 36" />
      <path d="M206 78c28 16 48 28 70 36" />
      <path d="M48 112c2-6 70-6 78 2 2 14 0 24-4 28-22 4-68 2-74-4-2-8-2-18 0-26z" fill="#dbeafe" />
      <path d="M236 112c2-6 70-8 80 0 4 14 2 26-2 30-24 6-72 2-78-4-2-8 0-18 0-26z" fill="#ffedd5" />
      <Label x="62" y="132">keep</Label>
      <Label x="252" y="132">drop</Label>
    </>
  );
}

function StringSketch() {
  return (
    <>
      <path d="M18 70c8-16 300-18 324 0 4 16-2 36-8 40-40 8-280 6-308-2-8-8-12-24-8-38z" fill="#f1f5f9" />
      <path d="M78 58c2-8 36-6 40 2 2 16 0 32-4 36-12 4-34 2-38-4-2-10-2-24 2-34z" fill="#fff" />
      <path d="M128 56c2-6 34-8 40 0 2 16 2 30-2 36-12 4-36 2-40-2-2-10 0-24 2-34z" fill="#fff" />
      <path d="M178 58c2-8 36-6 40 2 2 16 0 30-2 36-14 4-36 0-40-4-2-10 0-24 2-34z" fill="#fff" />
      <path d="M228 56c2-6 34-6 40 2 2 16 0 32-4 36-12 4-34 2-38-2 0-12 0-24 2-36z" fill="#fff" />
      <Label x="90" y="82">H</Label>
      <Label x="140" y="80">e</Label>
      <Label x="190" y="82">l</Label>
      <Label x="240" y="80">o</Label>
      <Label x="22" y="78" fill={ORANGE}>··</Label>
      <path d="M24 96c18 10 20 16 8 22" stroke={ORANGE} />
    </>
  );
}

function DictSketch() {
  return (
    <>
      <path d="M24 36c4-8 140-8 150 2 4 22 2 70-6 82-40 8-130 6-144-4-6-18-6-60 0-80z" fill="#dbeafe" />
      <path d="M190 36c2-8 140-6 146 2 4 24 4 68-4 82-40 10-132 4-142-4-4-18-4-62 0-80z" fill="#ffedd5" />
      <Label x="40" y="68">key</Label>
      <Label x="40" y="94" fill={BLUE}>model</Label>
      <Label x="206" y="68">value</Label>
      <Label x="206" y="94" fill={ORANGE}>bert</Label>
    </>
  );
}

function StepsSketch() {
  return (
    <>
      <path d="M36 28c2-6 250-6 270 2 4 10 2 22-2 26-40 6-240 4-266-2-4-6-4-18-2-26z" fill="#fff" />
      <path d="M36 70c2-6 250-8 274 0 4 10 2 22-4 26-36 6-240 4-268-2-4-8-4-16-2-24z" fill="#dbeafe" />
      <path d="M36 112c2-6 220-6 240 2 4 8 2 18-2 22-30 6-210 4-236-2-4-6-4-14-2-22z" fill="#fff" />
      <Label x="48" y="48">1  print(&quot;hi&quot;)</Label>
      <Label x="48" y="90">2  name = &quot;Asha&quot;</Label>
      <Label x="48" y="130">3  print(name)</Label>
      <path d="M24 40v96" />
      <path d="M18 124l6 12 6-12" />
    </>
  );
}

export function SketchGraphic({ kind }: { kind: SketchKind }) {
  switch (kind) {
    case "variables":
      return <Variables />;
    case "list":
      return <ListTray />;
    case "loop":
      return <LoopCycle />;
    case "function":
      return <FunctionMachine />;
    case "model":
      return <ModelFlow />;
    case "browser":
      return <BrowserSketch />;
    case "fork":
      return <ForkSketch />;
    case "string":
      return <StringSketch />;
    case "dict":
      return <DictSketch />;
    case "steps":
      return <StepsSketch />;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function SketchCard({ kind, title, caption }: { kind: SketchKind; title: string; caption: string }) {
  return (
    <SketchFrame title={title} caption={caption}>
      <SketchGraphic kind={kind} />
    </SketchFrame>
  );
}

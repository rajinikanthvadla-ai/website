/**
 * Social ads — story 1080×1920 + square 1080×1080. PNG + JPG.
 * Zero wasted whitespace. Run: npm run generate-ads
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "scripts", "output", "social");
const ASSETS = path.join(ROOT, "public", "assets");

const SITE = "rajinikanthvadla.com";
const PHONE = "+91 91000 28801";
const INSTRUCTOR = "Rajinikanth Vadla";
const START_DATE = "July 11th";
const CTA = "Join live demo →";

const TITLES = {
  "ai-automation": "AI Automation Engineer",
  mlops: "MLOps + Agentic AI Masterclass",
  both: "Both courses · Live demo",
};

const b64Cache = new Map();
function b64(rel) {
  const key = rel.replace(/\\/g, "/");
  if (!b64Cache.has(key)) {
    const buf = fs.readFileSync(path.join(ASSETS, rel));
    const ext = path.extname(rel).slice(1).toLowerCase();
    b64Cache.set(key, `data:image/${ext === "jpg" ? "jpeg" : "png"};base64,${buf.toString("base64")}`);
  }
  return b64Cache.get(key);
}

function css(w, h) {
  const story = h > w;
  const s = (n) => `${Math.round(n * (w / 1080))}px`;
  return `
    * { margin:0; padding:0; box-sizing:border-box; }
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Source+Sans+3:wght@400;600;700;800&display=swap');
    html, body { width:${w}px; height:${h}px; overflow:hidden; font-family:'Source Sans 3',system-ui,sans-serif; }
    .ad {
      width:${w}px; height:${h}px;
      background:linear-gradient(165deg,#fef9c3 0%,#f8f6f0 45%,#eef2ff 100%);
      display:flex; flex-direction:column;
      padding:${story ? s(108) : s(48)} ${s(40)} 0;
    }
    .serif { font-family:'Libre Baskerville',Georgia,serif; }
    .upper { ${story ? "flex:1;" : ""} display:flex; flex-direction:column; justify-content:flex-start; gap:${s(12)}; min-height:0; }
    .lower { flex-shrink:0; }
    .row { display:flex; align-items:center; gap:${s(16)}; }
    .avatar {
      width:${s(110)}; height:${s(110)}; border:${s(3)} solid #0f172a; border-radius:${s(4)};
      box-shadow:${s(5)} ${s(5)} 0 #0f172a; overflow:hidden; flex-shrink:0;
    }
    .avatar img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
    .who-name { font-size:${s(30)}; font-weight:800; line-height:1.1; }
    .who-sub { font-size:${s(18)}; color:#64748b; font-weight:700; margin-top:${s(4)}; }
    .live {
      margin-left:auto; background:#0f172a; color:#fff; font-size:${s(15)}; font-weight:800;
      text-transform:uppercase; letter-spacing:0.1em; padding:${s(10)} ${s(14)};
      border-radius:${s(4)}; display:flex; align-items:center; gap:${s(8)};
      box-shadow:${s(4)} ${s(4)} 0 #ea580c;
    }
    .dot { width:${s(10)}; height:${s(10)}; background:#ef4444; border-radius:50%; flex-shrink:0; }
    .badges { display:flex; gap:${s(8)}; margin:${s(14)} 0 ${s(10)}; }
    .badge {
      font-size:${s(16)}; font-weight:800; text-transform:uppercase; letter-spacing:0.08em;
      padding:${s(7)} ${s(13)}; border:${s(2)} solid #0f172a; border-radius:${s(3)};
    }
    .badge--hot { background:#ea580c; color:#fff; }
    .badge--blue { background:#2563eb; color:#fff; }
    .badge--dark { background:#0f172a; color:#fff; }
    .title { font-size:${story ? s(68) : s(52)}; line-height:1.02; letter-spacing:-0.02em; }
    .title--sm { font-size:${story ? s(58) : s(46)}; }
    .accent { color:#ea580c; }
    .sub { font-size:${story ? s(30) : s(24)}; color:#475569; line-height:1.25; margin-top:${s(6)}; font-weight:600; }
    .sketch {
      background:var(--sk,#fef9c3); border:${s(3)} solid #0f172a; border-radius:${s(4)};
      box-shadow:${s(6)} ${s(6)} 0 #0f172a;
      ${story ? "flex:1; min-height:" + s(420) + ";" : "height:" + s(260) + ";"}
      display:flex; align-items:flex-end; justify-content:center;
      padding:${s(10)} ${s(14)} ${s(6)}; position:relative; margin:0;
    }
    .sketch img.main { max-height:96%; max-width:92%; object-fit:contain; z-index:2; }
    .sketch .mini { position:absolute; opacity:0.25; width:${s(80)}; }
    .sketch .mini.tl { top:${s(6)}; left:${s(10)}; }
    .sketch .mini.br { bottom:${s(4)}; right:${s(10)}; }
    .lbl { font-size:${s(15)}; font-weight:800; text-transform:uppercase; letter-spacing:0.12em; color:#64748b; margin-bottom:${s(8)}; }
    .benefits {
      background:#fff; border:${s(3)} solid #0f172a; border-radius:${s(4)};
      box-shadow:${s(5)} ${s(5)} 0 #0f172a; padding:${story ? s(6) : s(10)} ${s(22)}; list-style:none;
    }
    .benefits li {
      font-size:${story ? s(30) : s(26)}; color:#1e293b; padding:${story ? s(13) : s(10)} 0; font-weight:600;
      border-bottom:${s(2)} dashed #e2e8f0; display:flex; gap:${s(10)};
    }
    .benefits li:last-child { border-bottom:none; }
    .benefits .ck { font-weight:800; color:#0f172a; }
    .zoom-lbl { color:#0f172a; font-size:${s(17)}; margin-bottom:${s(6)}; }
    .zoom-row { display:grid; grid-template-columns:1fr 1fr; gap:${s(12)}; margin-bottom:${story ? s(0) : s(12)}; }
    .zoom-time-box {
      background:#fff; border:${s(3)} solid #0f172a; border-radius:${s(4)};
      box-shadow:${s(4)} ${s(4)} 0 #0f172a; padding:${s(16)} ${s(18)};
      display:flex; flex-direction:column; justify-content:center;
    }
    .zoom-brand { color:#2563eb; font-size:${s(22)}; font-weight:800; margin-bottom:${s(6)}; letter-spacing:-0.01em; }
    .zoom-time-box .red { color:#dc2626; font-size:${s(14)}; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:${s(8)}; display:flex; align-items:center; gap:${s(6)}; }
    .zoom-time-box .time { font-size:${story ? s(32) : s(28)}; font-weight:800; line-height:1.15; }
    .zoom-creds {
      background:#0f172a; color:#e2e8f0; font-family:ui-monospace,monospace;
      font-size:${s(20)}; padding:${s(16)} ${s(18)}; border-radius:${s(4)}; line-height:1.5;
      border:${s(3)} solid #0f172a; box-shadow:${s(4)} ${s(4)} 0 #ea580c;
      display:flex; flex-direction:column; justify-content:center; gap:${s(6)};
    }
    .zoom-details-hdr {
      font-family:'Source Sans 3',system-ui,sans-serif; font-size:${s(15)}; font-weight:800;
      text-transform:uppercase; letter-spacing:0.1em; color:#60a5fa; margin-bottom:${s(4)};
    }
    .zoom-creds span { color:#94a3b8; display:inline-block; min-width:${s(100)}; font-family:'Source Sans 3',system-ui,sans-serif; font-size:${s(16)}; font-weight:700; }
    .cta {
      background:#ea580c; color:#fff; font-weight:800; font-size:${story ? s(32) : s(30)};
      text-align:center; padding:${story ? s(20) : s(22)}; border:${s(3)} solid #0f172a;
      border-bottom:none; border-radius:${s(4)} ${s(4)} 0 0;
      box-shadow:${s(5)} ${s(5)} 0 #0f172a;
    }
    .foot {
      background:#0f172a; color:#fff; padding:${story ? s(28) : s(22)} ${s(28)} ${story ? s(44) : s(36)};
      border:${s(3)} solid #0f172a; border-top:${s(2)} solid #334155;
      position:relative; overflow:hidden;
    }
    .foot-deco { position:absolute; right:${s(-16)}; bottom:${s(-8)}; width:${s(180)}; opacity:0.1; }
    .foot-site { font-size:${s(32)}; font-weight:800; position:relative; z-index:1; }
    .foot-wa { font-size:${s(28)}; color:#4ade80; font-weight:800; margin-top:${s(6)}; position:relative; z-index:1; }
    .foot-sub { font-size:${s(18)}; color:#94a3b8; margin-top:${s(6)}; position:relative; z-index:1; }
    .dual { display:grid; grid-template-columns:1fr 1fr; gap:${s(10)}; margin:${s(10)} 0; }
    .dcard { background:#fff; border:${s(3)} solid #0f172a; border-radius:${s(4)}; box-shadow:${s(4)} ${s(4)} 0 #0f172a; overflow:hidden; }
    .dsk { height:${s(110)}; display:flex; align-items:flex-end; justify-content:center; padding:${s(6)}; border-bottom:${s(3)} solid #0f172a; }
    .dsk img { max-height:${s(100)}; object-fit:contain; }
    .dbody { padding:${s(12)} ${s(14)}; }
    .dbody h3 { font-size:${s(20)}; margin:${s(6)} 0; line-height:1.15; }
    .dbody p { font-size:${s(17)}; color:#475569; font-weight:600; }
    .dbody .zc { font-family:monospace; font-size:${s(14)}; background:#0f172a; color:#cbd5e1; padding:${s(10)}; margin-top:${s(8)}; border-radius:${s(3)}; line-height:1.45; }
    .dbody .zc-lbl { font-family:'Source Sans 3',system-ui,sans-serif; font-size:${s(12)}; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#60a5fa; margin-bottom:${s(6)}; }
    .dbody .zc-zoom { font-family:'Source Sans 3',system-ui,sans-serif; font-size:${s(16)}; font-weight:800; color:#2563eb; margin-bottom:${s(4)}; }
    .sq-grid { display:grid; grid-template-columns:1fr 1fr; gap:${s(12)}; }
    .sq-left { display:flex; flex-direction:column; justify-content:flex-start; gap:${s(8)}; }
  `;
}

function wrap(w, h, body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css(w, h)}</style></head><body>${body}</body></html>`;
}

function head() {
  return `
    <div class="row">
      <div class="avatar"><img src="${b64("pic-1.png")}" alt=""></div>
      <div>
        <div class="who-name serif">${INSTRUCTOR}</div>
        <div class="who-sub">MLOps · AIOps · AI Automation</div>
      </div>
      <div class="live"><span class="dot"></span> Live</div>
    </div>`;
}

function sketch(main, accent, extras = []) {
  const mini = extras.map((e, i) => `<img class="mini ${i ? "br" : "tl"}" src="${b64(e)}" alt="">`).join("");
  return `<div class="sketch" style="--sk:${accent}">${mini}<img class="main" src="${b64(main)}" alt=""></div>`;
}

function benefits(items) {
  return `<div><div class="lbl">What you get</div><ul class="benefits">${items.map((t) => `<li><span class="ck">✓</span>${t}</li>`).join("")}</ul></div>`;
}

function zoomCard(time, id, pass) {
  return `<div class="zc">
    <div class="zc-zoom">Zoom</div>
    <div class="zc-lbl">Zoom meeting details</div>
    ${time}<br>
    <span style="color:#94a3b8">Meeting ID</span> ${id}<br>
    <span style="color:#94a3b8">Password</span> ${pass}
  </div>`;
}

function actionBlockDual(deco) {
  return `
    <div class="lower">
      <div class="lbl zoom-lbl">Zoom</div>
      <div class="zoom-row">
        <div class="zoom-time-box">
          <div class="zoom-brand">Zoom</div>
          <div class="red"><span class="dot"></span> Live demo</div>
          <div class="time">AI Automation · 6:30 PM<br>MLOps · 9:30 PM IST</div>
        </div>
        <div class="zoom-creds">
          <div class="zoom-details-hdr">Zoom meeting details</div>
          <div><span>AI Automation</span> 872 1840 6889</div>
          <div><span>MLOps</span> 879 9998 2120</div>
          <div><span>Password</span> 1111</div>
        </div>
      </div>
      <div class="cta">${CTA}</div>
      <div class="foot">
        <img class="foot-deco" src="${b64(deco)}" alt="">
        <div class="foot-site">${SITE}</div>
        <div class="foot-wa">WhatsApp ${PHONE}</div>
        <div class="foot-sub">${START_DATE}</div>
      </div>
    </div>`;
}

function actionBlock(time, id, pass, deco, cta = CTA) {
  return `
    <div class="lower">
      <div class="lbl zoom-lbl">Zoom</div>
      <div class="zoom-row">
        <div class="zoom-time-box">
          <div class="zoom-brand">Zoom</div>
          <div class="red"><span class="dot"></span> Live demo</div>
          <div class="time">${time}</div>
        </div>
        <div class="zoom-creds">
          <div class="zoom-details-hdr">Zoom meeting details</div>
          <div><span>Meeting ID</span> ${id}</div>
          <div><span>Password</span> ${pass}</div>
        </div>
      </div>
      <div class="cta">${cta}</div>
      <div class="foot">
        <img class="foot-deco" src="${b64(deco)}" alt="">
        <div class="foot-site">${SITE}</div>
        <div class="foot-wa">WhatsApp ${PHONE}</div>
        <div class="foot-sub">${START_DATE}</div>
      </div>
    </div>`;
}

/* ── Story 1080×1920 ── */
function storyAi() {
  return wrap(1080, 1920, `<div class="ad">
    <div class="upper">
      ${head()}
      <div class="badges"><span class="badge badge--hot">New</span><span class="badge badge--dark">Live cohort</span></div>
      <h1 class="title serif">AI-Powered<br>Automation <span class="accent">Engineer</span></h1>
      <p class="sub">Build company agents — incident, RAG, MCP, HR.</p>
      ${sketch("sketches/pencil-team.png", "#fef9c3", ["sketches/web-builder.png", "sketches/team-collab.png"])}
      ${benefits(["12 company agent builds", "Lifetime recordings", "1-on-1 mentorship", "Org runbooks + ROI metrics"])}
    </div>
    ${actionBlock("Daily<br>6:30 PM IST", "872 1840 6889", "1111", "sketches/pencil-team.png")}
  </div>`);
}

function storyMlops() {
  return wrap(1080, 1920, `<div class="ad">
    <div class="upper">
      ${head()}
      <div class="badges"><span class="badge badge--blue">Flagship</span><span class="badge badge--dark">Job ready</span></div>
      <h1 class="title title--sm serif">MLOps + LLMOps<br>+ AIOps + <span class="accent">Agentic AI</span></h1>
      <p class="sub">DevOps to production AI agents. Capstones + placement.</p>
      ${sketch("sketches/enterprise-team.png", "#dbeafe", ["sketches/shipping.png", "sketches/planning-team.png"])}
      ${benefits(["150+ hours hands-on", "4 capstone projects", "Interview + job support", "500+ engineers trained"])}
    </div>
    ${actionBlock("Daily<br>9:30 PM IST", "879 9998 2120", "1111", "sketches/enterprise-team.png")}
  </div>`);
}

function storyBoth() {
  return wrap(1080, 1920, `<div class="ad">
    <div class="upper">
      ${head()}
      <h1 class="title title--sm serif" style="text-align:center">Pick your course.<br>Join the <span class="accent">live demo.</span></h1>
      <p class="sub" style="text-align:center">Two cohorts · daily Zoom · one mentor</p>
      ${sketch("sketches/learning-trio.png", "#fef9c3")}
      <div class="dual">
          <div class="dcard">
            <div class="dsk" style="background:#fef9c3"><img src="${b64("sketches/pencil-team.png")}" alt=""></div>
            <div class="dbody">
              <span class="badge badge--hot" style="font-size:12px;padding:4px 8px">AI Automation</span>
              <h3 class="serif">Automation Engineer</h3>
              <p>12 agents · mentorship</p>
              ${zoomCard("Daily · 6:30 PM IST", "872 1840 6889", "1111")}
            </div>
          </div>
          <div class="dcard">
            <div class="dsk" style="background:#dbeafe"><img src="${b64("sketches/enterprise-team.png")}" alt=""></div>
            <div class="dbody">
              <span class="badge badge--blue" style="font-size:12px;padding:4px 8px">Flagship</span>
              <h3 class="serif">MLOps + Agentic AI</h3>
              <p>Capstones · placement</p>
              ${zoomCard("Daily · 9:30 PM IST", "879 9998 2120", "1111")}
            </div>
          </div>
        </div>
    </div>
    ${actionBlockDual("sketches/community.png")}
  </div>`);
}

/* ── Square 1080×1080 ── */
function squareAi() {
  return wrap(1080, 1080, `<div class="ad">
    <div class="upper">
      <div class="sq-grid">
        <div class="sq-left">
          ${head()}
          <div class="badges"><span class="badge badge--hot">New</span></div>
          <h1 class="title serif">AI Automation <span class="accent">Engineer</span></h1>
          <p class="sub">Incident · RAG · MCP · HR agents</p>
        </div>
        <div>${sketch("sketches/pencil-team.png", "#fef9c3")}</div>
      </div>
      ${benefits(["12 agent builds", "Lifetime recordings", "1-on-1 mentorship"])}
    </div>
    ${actionBlock("6:30 PM IST daily", "872 1840 6889", "1111", "sketches/pencil-team.png")}
  </div>`);
}

function squareMlops() {
  return wrap(1080, 1080, `<div class="ad">
    <div class="upper">
      <div class="sq-grid">
        <div class="sq-left">
          ${head()}
          <div class="badges"><span class="badge badge--blue">Flagship</span></div>
          <h1 class="title title--sm serif">MLOps + LLMOps + <span class="accent">Agentic AI</span></h1>
          <p class="sub">Capstones · placement support</p>
        </div>
        <div>${sketch("sketches/enterprise-team.png", "#dbeafe")}</div>
      </div>
      ${benefits(["150+ hours", "4 capstones", "Job support"])}
    </div>
    ${actionBlock("9:30 PM IST daily", "879 9998 2120", "1111", "sketches/enterprise-team.png")}
  </div>`);
}

function squareBoth() {
  return wrap(1080, 1080, `<div class="ad">
    <div class="upper">
      ${head()}
      <h1 class="title serif" style="font-size:36px;text-align:center;margin-top:10px">Pick your course · <span class="accent">live demo</span></h1>
      <div class="dual" style="margin-top:12px">
        <div class="dcard">
          <div class="dsk" style="background:#fef9c3;height:90px"><img src="${b64("sketches/pencil-team.png")}" alt=""></div>
          <div class="dbody"><h3 class="serif" style="font-size:17px">AI Automation</h3>${zoomCard("6:30 PM IST daily", "872 1840 6889", "1111")}</div>
        </div>
        <div class="dcard">
          <div class="dsk" style="background:#dbeafe;height:90px"><img src="${b64("sketches/enterprise-team.png")}" alt=""></div>
          <div class="dbody"><h3 class="serif" style="font-size:17px">MLOps Masterclass</h3>${zoomCard("9:30 PM IST daily", "879 9998 2120", "1111")}</div>
        </div>
      </div>
    </div>
    ${actionBlockDual("sketches/community.png")}
  </div>`);
}

const RENDERS = [
  { id: "ai-automation", title: TITLES["ai-automation"], story: storyAi, square: squareAi },
  { id: "mlops-masterclass", title: TITLES.mlops, story: storyMlops, square: squareMlops },
  { id: "live-demo-both", title: TITLES.both, story: storyBoth, square: squareBoth },
];

async function shot(browser, html, w, h, outPath, type) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluateHandle("document.fonts.ready");
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({
    path: outPath,
    type,
    quality: type === "jpeg" ? 93 : undefined,
    clip: { x: 0, y: 0, width: w, height: h },
  });
  await page.close();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const manifest = [];

  for (const ad of RENDERS) {
    const formats = [
      { fmt: "story", w: 1080, h: 1920, platform: "WhatsApp Status · Instagram Story (9:16)", build: ad.story },
      { fmt: "square", w: 1080, h: 1080, platform: "Instagram Feed · WhatsApp (1:1)", build: ad.square },
    ];

    const files = { story: { png: "", jpg: "" }, square: { png: "", jpg: "" } };

    for (const f of formats) {
      const html = f.build();
      const base = `${ad.id}-${f.fmt}`;
      const png = path.join(OUT_DIR, `${base}.png`);
      const jpg = path.join(OUT_DIR, `${base}.jpg`);
      await shot(browser, html, f.w, f.h, png, "png");
      await shot(browser, html, f.w, f.h, jpg, "jpeg");
      files[f.fmt] = { png: path.join(OUT_DIR, `${base}.png`), jpg: path.join(OUT_DIR, `${base}.jpg`) };
      console.log(`✓ ${base}.png + .jpg (${f.w}×${f.h})`);
    }

    manifest.push({
      id: ad.id,
      title: ad.title,
      files,
      variants: [
        { ...formats[0], ...files.story },
        { ...formats[1], ...files.square },
      ],
    });
  }

  const manifestPath = path.join(ROOT, "scripts", "output", "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  await browser.close();
  console.log("\nDone → scripts/output/social/");
}

main().catch((e) => { console.error(e); process.exit(1); });

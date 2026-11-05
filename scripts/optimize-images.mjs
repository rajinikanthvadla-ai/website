// Builds small, web-ready images from the source photos in public/assets.
// Run: node ./scripts/optimize-images.mjs
import sharp from "sharp";
import path from "node:path";

const dir = path.resolve("public/assets");
const src = (f) => path.join(dir, f);

// Square face crop of the portrait photo (864x1184) for icons and logo.
const face = { left: 152, top: 180, width: 560, height: 560 };

for (const [name, size] of [
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
  ["logo-512.png", 512],
]) {
  await sharp(src("pic-1.png")).extract(face).resize(size, size).png({ compressionLevel: 9, palette: true }).toFile(src(name));
}

// 1200x630 social share card: photo on the left, text on the right.
const W = 1200;
const H = 630;
const photo = await sharp(src("pic-1.png")).resize({ height: H }).toBuffer();
const photoW = Math.round((864 / 1184) * H);
const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="#0f172a" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect x="${photoW - 140}" y="0" width="140" height="${H}" fill="url(#fade)"/>
  <g font-family="Segoe UI, Arial, sans-serif" fill="#fff">
    <text x="${photoW + 30}" y="190" font-size="30" font-weight="700" fill="#fb923c" letter-spacing="2">LIVE AI ENGINEERING TRAINING</text>
    <text x="${photoW + 30}" y="265" font-size="58" font-weight="800">MLOps, AIOps,</text>
    <text x="${photoW + 30}" y="333" font-size="58" font-weight="800">LLMOps &amp; AI Agents</text>
    <text x="${photoW + 30}" y="400" font-size="28" fill="#cbd5e1">1:1 mentorship, real capstone projects</text>
    <text x="${photoW + 30}" y="440" font-size="28" fill="#cbd5e1">500+ engineers trained worldwide</text>
    <text x="${photoW + 30}" y="530" font-size="32" font-weight="700">Rajinikanth Vadla</text>
    <text x="${photoW + 30}" y="568" font-size="24" fill="#94a3b8">rajinikanthvadla.com</text>
  </g>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: "#0f172a" } })
  .composite([
    { input: photo, left: 0, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(src("og-image.jpg"));

// Above-the-fold photos as WebP.
await sharp(src("agentic-fde-banner.jpg")).resize({ width: 960 }).webp({ quality: 78 }).toFile(src("agentic-fde-banner.webp"));
await sharp(src("rajinikanth-portrait.jpg")).resize({ width: 640 }).webp({ quality: 78 }).toFile(src("rajinikanth-portrait.webp"));

console.log("done");

// Smaller copy of the main photo for in-page use (the PNG stays for the certificate canvas).
await sharp(src("pic-1.png")).resize({ width: 640 }).webp({ quality: 80 }).toFile(src("pic-1.webp"));
console.log("pic-1.webp done");

import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('file:///C:/Users/ADMIN/Music/PERSONAL/website/out/architecture/index.html', { waitUntil: 'networkidle0' });
const ids = await page.$$eval('section[id], div[id]', els => els.map(e => e.id));
console.log('ids:', ids.join(', '));
for (const id of ids.filter(i => i)) {
  const el = await page.$('#' + id);
  if (!el) continue;
  try { await el.screenshot({ path: 'scripts/output/arch-' + id.replace(/[^a-z0-9-]/gi,'') + '.png' }); console.log('shot', id); } catch(e){ console.log('skip', id, e.message); }
}
await browser.close();

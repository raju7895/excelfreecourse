/* Renders selected BONUS PDF pages to PNG using puppeteer-core + local Chrome. */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
];
const exe = CANDIDATES.find(p => fs.existsSync(p));
if (!exe) { console.error('NO_BROWSER'); process.exit(2); }

const outDir = path.join(__dirname, '..', '..', 'excel-master-index', 'assets', 'preview');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });

  const file = process.argv[2] || '01_EXCEL_COMPLETE_BASIC_FORMULAS.pdf';
  const pdfPath = path.join(__dirname, '..', '..', 'excel-master-index', 'assets', 'bonus-pdfs', file);

  // Load the PDF via the local dev server so Chrome's built-in viewer renders it.
  const url = 'http://localhost:8123/assets/bonus-pdfs/' + encodeURIComponent(file) + '#page=' + (process.argv[3] || 3);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));
  const shot = path.join(outDir, 'page1-' + file.replace('.pdf', '.png'));
  await page.screenshot({ path: shot });
  console.log('SHOT ' + shot);
  await browser.close();
})().catch(e => { console.error('RENDER_FAILED', e.message); process.exit(1); });


/*
 * Deterministic BONUS PDF builder — every page is stamped.
 *
 * PDFKit's automatic `continueOnNewPage()` creates internal pages when text
 * wraps past the page bottom, which bypasses any page hook and produced
 * unstamped blank pages. This builder therefore never lets text reach that
 * path: it measures every block with doc.heightOfString() and starts a fresh
 * stamped page whenever the block does not fit. The result is a fully
 * paginated document in which page 1 is the cover and EVERY page carries the
 * "UTKARSH BAJPAI" watermark and the footer credit.
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const books = require('./lib/bonus-data.js');

const outDir = path.join(__dirname, '..', '..', 'excel-master-index', 'assets', 'bonus-pdfs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const C = { ivory: '#F5F3ED', forest: '#173F35', emerald: '#245C4A', charcoal: '#252923', champagne: '#D8C9A7', white: '#FFFFFF' };
const PW = 595.28, PH = 841.89, ML = 50, MR = 50;
const MW = PW - ML - MR;
const TOP = 46, LIMIT = PH - 58;     // usable body area

function makeBuilder() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: TOP, bottom: 0, left: ML, right: MR }, bufferPages: false, autoFirstPage: false });
  let page = 0;

  const beginPage = () => {
    doc.addPage();
    page += 1;
    doc.save();
    doc.rotate(-45, { origin: [PW / 2, PH / 2] });
    doc.fillOpacity(0.09).font('Helvetica-Bold').fontSize(46).fillColor(C.emerald)
      .text('UTKARSH BAJPAI', 0, PH / 2 - 23, { align: 'center', width: PW, lineBreak: false });
    doc.restore();
    doc.fillOpacity(1);
    doc.font('Helvetica').fontSize(8).fillColor(C.charcoal)
      .text('© Utkarsh Bajpai | Excel Master Index', ML, PH - 34, { lineBreak: false });
    doc.font('Helvetica').fontSize(8).fillColor(C.charcoal)
      .text('Page ' + page, ML, PH - 34, { align: 'right', width: MW, lineBreak: false });
    doc.y = TOP;
  };

  beginPage();

  // Measure wrapped height and paginate if the block does not fit.
  function ensure(text, opts) {
    const o = Object.assign({ size: 9.5, font: 'Helvetica', width: MW, lineGap: 2 }, opts || {});
    const h = doc.font(o.font).fontSize(o.size).heightOfString(String(text), { width: o.width, lineGap: o.lineGap }) + 2;
    if (doc.y + h > LIMIT) beginPage();
    return h;
  }

  function para(text, opts) {
    const o = Object.assign({ size: 9.5, font: 'Helvetica', color: C.charcoal, width: MW, gap: 0.6 }, opts || {});
    ensure(text, o);
    doc.font(o.font).fontSize(o.size).fillColor(o.color).text(String(text), ML, doc.y, { width: o.width, lineGap: 2 });
    doc.moveDown(o.gap);
  }

  function label(text) {
    const h = doc.font('Helvetica-Bold').fontSize(9).heightOfString(text, { width: MW, lineGap: 2 }) + 16;
    if (doc.y + h > LIMIT) beginPage();
    doc.font('Helvetica-Bold').fontSize(9).fillColor(C.emerald).text(text, ML, doc.y, { width: MW, lineBreak: false });
    doc.y += 14;
  }

  function heading(text) {
    const h = 30 + 8;
    if (doc.y + h > LIMIT) beginPage();
    doc.rect(ML, doc.y, MW, 28).fill(C.emerald);
    doc.fillColor(C.white).font('Helvetica-Bold').fontSize(13.5).text(text, ML + 10, doc.y + 7.5, { width: MW - 20, lineBreak: false });
    doc.y += 40;
  }

  function codeBox(text) {
    const t = String(text);
    const h = Math.max(18, doc.font('Courier').fontSize(8.5).heightOfString(t, { width: MW - 12, lineGap: 2 }) + 9);
    if (doc.y + h + 4 > LIMIT) beginPage();
    doc.rect(ML, doc.y, MW, h).fill('#E8EFE9');
    doc.font('Courier').fontSize(8.5).fillColor(C.forest).text(t, ML + 7, doc.y + 5, { width: MW - 14, lineGap: 2 });
    doc.y += h + 5;
  }

  function bullets(list) {
    list.forEach(item => {
      const text = '•  ' + item;
      const h = doc.font('Helvetica').fontSize(9.5).heightOfString(text, { width: MW - 12, lineGap: 2 });
      if (doc.y + h + 4 > LIMIT) beginPage();
      doc.font('Helvetica').fontSize(9.5).fillColor(C.charcoal).text(text, ML + 10, doc.y, { width: MW - 12, lineGap: 2 });
      doc.moveDown(0.25);
    });
    doc.moveDown(0.2);
  }

  function divider() {
    if (doc.y + 16 > LIMIT) beginPage();
    doc.rect(ML, doc.y + 2, MW, 1).fill(C.champagne);
    doc.y += 16;
  }

  function cover(title, subtitle) {
    doc.rect(0, 0, PW, PH).fill(C.ivory);
    doc.rect(0, 0, PW, 92).fill(C.forest);
    doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white).text('EXCEL MASTER INDEX', ML, 36, { align: 'center', width: MW });
    doc.font('Helvetica').fontSize(10.5).fillColor(C.champagne).text('Basic to Advanced | English & Roman Hindi', ML, 64, { align: 'center', width: MW });

    doc.font('Helvetica-Bold').fontSize(23).fillColor(C.forest).text(title, ML, 150, { align: 'center', width: MW, lineGap: 4 });
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(13).fillColor(C.emerald).text(subtitle, ML, doc.y, { align: 'center', width: MW, lineGap: 2 });
    doc.rect(ML, 300, MW, 2).fill(C.champagne);

    doc.font('Helvetica-Bold').fontSize(13).fillColor(C.forest).text('Created & Developed by', ML, 330, { align: 'center', width: MW });
    doc.font('Helvetica-Bold').fontSize(22).fillColor(C.forest).text('UTKARSH BAJPAI', ML, 352, { align: 'center', width: MW });
    doc.font('Helvetica').fontSize(11).fillColor(C.emerald).text('utkarshbajpai068@gmail.com', ML, 382, { align: 'center', width: MW, link: 'mailto:utkarshbajpai068@gmail.com' });
    doc.rect(ML, 415, MW, 1).fill(C.champagne);
    doc.font('Helvetica').fontSize(8.5).fillColor(C.charcoal).text('Premium Bilingual Resource | For Students, MIS Executives, Data Analysts & Office Professionals', ML, 430, { align: 'center', width: MW });
  }

  function toc(items) {
    beginPage();
    doc.rect(0, 0, PW, 62).fill(C.forest);
    doc.font('Helvetica-Bold').fontSize(16).fillColor(C.white).text('TABLE OF CONTENTS', ML, 24);
    doc.y = 84;
    items.forEach((it, idx) => {
      const text = (idx + 1) + '.  ' + it;
      const h = doc.font('Helvetica').fontSize(10).heightOfString(text, { width: MW - 20, lineGap: 2 });
      if (doc.y + h + 2 > LIMIT) beginPage();
      doc.font('Helvetica').fontSize(10).fillColor(C.charcoal).text(text, ML + 8, doc.y, { width: MW - 16, lineGap: 2 });
      doc.moveDown(0.28);
    });
    beginPage();
  }

  return { doc, cover, toc, heading, label, para, codeBox, bullets, divider, beginPage, get page() { return page; } };
}

function addChapter(b, f, idx) {
  b.heading('CHAPTER ' + (idx + 1) + ': ' + String(f.name).toUpperCase());
  b.label('PURPOSE - ENGLISH');               b.para(f.purposeEn);
  b.label('PURPOSE - ROMAN HINDI');          b.para(f.purposeHi);
  b.label('SYNTAX');                         b.codeBox(f.syntax);
  b.label('SYNTAX EXPLANATION');             b.para(f.syntaxExpEn); b.para('Roman Hindi: ' + f.syntaxExpHi);
  b.label('SAMPLE DATASET');                 b.para(f.dataset);
  b.label('ACTUAL FORMULA');                 b.codeBox(f.formula);
  b.label('EXPECTED OUTPUT');                b.para(f.output, { font: 'Helvetica-Bold', size: 10, color: C.forest });
  b.label('STEP-BY-STEP - ENGLISH');         b.bullets(f.stepsEn || []);
  b.label('STEP-BY-STEP - ROMAN HINDI');     b.bullets(f.stepsHi || []);
  b.label('REAL OFFICE EXAMPLE');            b.para(f.officeEn); b.para('Roman Hindi: ' + f.officeHi);
  b.label('COMMON MISTAKES');                b.bullets(f.mistakes || []);
  b.label('IMPORTANT TIPS');                 b.bullets(f.tips || []);
  b.label('EXCEL VERSION COMPATIBILITY');    b.para(f.version);
  b.divider();
}

(async () => {
  const results = [];
  for (const spec of books) {
    const b = makeBuilder();
    b.cover(spec.title, spec.subtitle);
    b.toc(spec.items.map(i => i.name));
    spec.items.forEach((f, i) => addChapter(b, f, i));
    const file = path.join(outDir, spec.file);
    const stream = fs.createWriteStream(file);
    b.doc.pipe(stream);
    b.doc.end();
    await new Promise(r => stream.on('finish', r));
    results.push({ file: spec.file, pages: b.page });
  }
  results.forEach(r => console.log(String(r.pages).padStart(2, ' ') + ' pages | ' + r.file));
  console.log('Built 10 BONUS PDFs. Watermark + creator credit applied on every page.');
})().catch(e => { console.error('BUILD FAILED', e); process.exit(1); });

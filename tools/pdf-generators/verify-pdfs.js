const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const dir = path.join(__dirname, '..', '..', 'excel-master-index', 'assets', 'bonus-pdfs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf')).sort();
(async () => {
  let allOk = true;
  for (const f of files) {
    const data = new Uint8Array(fs.readFileSync(path.join(dir, f)));
    const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
    let pagesWithWatermark = 0, pagesWithCredit = 0;
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const content = await page.getTextContent();
      const text = content.items.map(i => i.str).join(' ');
      if (text.indexOf('UTKARSH BAJPAI') !== -1) pagesWithWatermark++;
      if (text.indexOf('Utkarsh Bajpai') !== -1 && text.indexOf('Excel Master Index') !== -1) pagesWithCredit++;
    }
    const ok = pagesWithWatermark === doc.numPages && pagesWithCredit === doc.numPages;
    if (!ok) allOk = false;
    console.log(`${f} | pages=${doc.numPages} | watermarkOnAllPages=${pagesWithWatermark}/${doc.numPages} | creditOnAllPages=${pagesWithCredit}/${doc.numPages} | ${ok ? 'PASS' : 'FAIL'}`);
    await doc.destroy();
  }
  console.log(allOk ? 'ALL_PDFS_PASS' : 'SOME_PDFS_FAILED');
  process.exit(allOk ? 0 : 1);
})().catch(e => { console.error('FATAL', e); process.exit(2); });

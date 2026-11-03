/*
 * Stamps the creator watermark onto every page of every BONUS PDF.
 *
 * PDFKit cannot merge into an existing content stream, and hooks fired during
 * page creation are unreliable (it auto-adds overflow pages for long text).
 * So the clean, deterministic approach is to generate each PDF inside this
 * single pass: every page is created through the same helper that draws the
 * 45-degree "UTKARSH BAJPAI" watermark first (behind the text), plus the
 * "© Utkarsh Bajpai | Excel Master Index" footer credit and page number.
 */
const PDFDocument = require('pdfkit');

function createStampedDoc() {
  const doc = new PDFDocument({ size: 'A4', bufferPages: false, autoFirstPage: false });
  let pageNum = 0;
  function stamp() {
    doc.save();
    doc.rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] });
    doc.fillOpacity(0.09)
      .font('Helvetica-Bold')
      .fontSize(46)
      .fillColor('#245C4A')
      .text('UTKARSH BAJPAI', 0, doc.page.height / 2 - 23, { align: 'center', width: doc.page.width, lineBreak: false });
    doc.restore();
    doc.fillOpacity(1);
    doc.font('Helvetica').fontSize(8).fillColor('#252923')
      .text('© Utkarsh Bajpai | Excel Master Index', 50, doc.page.height - 40, { align: 'left', lineBreak: false });
    doc.font('Helvetica').fontSize(8).fillColor('#252923')
      .text('Page ' + pageNum, 50, doc.page.height - 40, { align: 'right', width: doc.page.width - 100, lineBreak: false });
  }
  function newPage(opts) {
    doc.addPage(opts);
    pageNum += 1;
    stamp();
  }
  newPage();
  return { doc, newPage, stamp, get page() { return pageNum; } };
}

module.exports = { createStampedDoc };

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const outDir = 'excel-master-index/assets/bonus-pdfs';
const colors = { ivory:'#F5F3ED', forest:'#173F35', emerald:'#245C4A', charcoal:'#252923', champagne:'#D8C9A7', white:'#FFFFFF' };

function addCover(doc, title, subtitle) { doc.rect(0,0,doc.page.width,doc.page.height).fill(colors.ivory); doc.rect(0,0,doc.page.width,90).fill(colors.forest); doc.font('Helvetica-Bold').fontSize(22).fillColor(colors.white).text('EXCEL MASTER INDEX',50,35,{align:'center'}); doc.font('Helvetica').fontSize(11).fillColor(colors.champagne).text('Basic to Advanced | English & Roman Hindi',50,62,{align:'center'}); doc.font('Helvetica-Bold').fontSize(24).fillColor(colors.forest).text(title,50,150,{align:'center',width:doc.page.width-100}); doc.font('Helvetica').fontSize(14).fillColor(colors.emerald).text(subtitle,50,210,{align:'center',width:doc.page.width-100}); doc.rect(50,260,doc.page.width-100,2).fill(colors.champagne); doc.addPage(); }
function addTOC(doc, items) { doc.rect(0,0,doc.page.width,60).fill(colors.forest); doc.font('Helvetica-Bold').fontSize(16).fillColor(colors.white).text('TABLE OF CONTENTS',50,22); let y=100; doc.font('Helvetica').fontSize(11).fillColor(colors.charcoal); items.forEach((it,idx)=>{ if(y>720){doc.addPage();doc.rect(0,0,doc.page.width,40).fill(colors.forest);doc.font('Helvetica-Bold').fontSize(12).fillColor(colors.white).text('TABLE OF CONTENTS (CONT.)',50,14);y=70;} doc.text((idx+1)+'. '+it,50,y); y+=16; }); doc.addPage(); }
function sectionTitle(doc, title) { if(doc.y>700) doc.addPage(); doc.rect(50,doc.y,doc.page.width-100,28).fill(colors.emerald); doc.font('Helvetica-Bold').fontSize(14).fillColor(colors.white).text(title,60,doc.y+7); doc.moveDown(2); }
function formulaBlock(doc, data) {
  if(doc.y>680) doc.addPage();
  doc.font('Helvetica-Bold').fontSize(13).fillColor(colors.forest).text('Formula: '+data.name,50,doc.y); doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('PURPOSE - ENGLISH',50,doc.y); doc.font('Helvetica').fontSize(10).fillColor(colors.charcoal).text(data.purposeEn,50,doc.y+14,{width:doc.page.width-100}); doc.moveDown(2.2);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('PURPOSE - ROMAN HINDI',50,doc.y); doc.font('Helvetica').fontSize(10).fillColor(colors.charcoal).text(data.purposeHi,50,doc.y+14,{width:doc.page.width-100}); doc.moveDown(2.2);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('SYNTAX',50,doc.y); doc.rect(50,doc.y+14,doc.page.width-100,18).fill('#E8EFE9'); doc.font('Courier').fontSize(9).fillColor(colors.forest).text(data.syntax,58,doc.y+19); doc.moveDown(2.6);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('SYNTAX EXPLANATION',50,doc.y); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text(data.syntaxExpEn,50,doc.y+14,{width:doc.page.width-100}); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text('Roman Hindi: '+data.syntaxExpHi,50,doc.y+28,{width:doc.page.width-100}); doc.moveDown(4.2);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('SAMPLE DATASET',50,doc.y); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text(data.dataset,50,doc.y+14,{width:doc.page.width-100}); doc.moveDown(2);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('ACTUAL FORMULA',50,doc.y); doc.rect(50,doc.y+14,doc.page.width-100,18).fill('#E8EFE9'); doc.font('Courier').fontSize(9).fillColor(colors.forest).text(data.formula,58,doc.y+19); doc.moveDown(2.6);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('EXPECTED OUTPUT',50,doc.y); doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.forest).text(data.output,50,doc.y+14); doc.moveDown(2);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('STEP-BY-STEP - ENGLISH',50,doc.y); (data.stepsEn||[]).forEach((s,i)=>{ if(doc.y>720)doc.addPage(); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text((i+1)+'. '+s,58,doc.y+12,{width:doc.page.width-116}); doc.moveDown(0.8); });
  doc.moveDown(1);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('STEP-BY-STEP - ROMAN HINDI',50,doc.y); (data.stepsHi||[]).forEach((s,i)=>{ if(doc.y>720)doc.addPage(); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text((i+1)+'. '+s,58,doc.y+12,{width:doc.page.width-116}); doc.moveDown(0.8); });
  doc.moveDown(1);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('REAL OFFICE EXAMPLE',50,doc.y); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text(data.officeEn,50,doc.y+14,{width:doc.page.width-100}); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text('Roman Hindi: '+data.officeHi,50,doc.y+28,{width:doc.page.width-100}); doc.moveDown(4.2);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('COMMON MISTAKES',50,doc.y); (data.mistakes||[]).forEach((s,i)=>{ if(doc.y>720)doc.addPage(); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text('- '+s,58,doc.y+12,{width:doc.page.width-116}); doc.moveDown(0.8); });
  doc.moveDown(1);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('IMPORTANT TIPS',50,doc.y); (data.tips||[]).forEach((s,i)=>{ if(doc.y>720)doc.addPage(); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text('- '+s,58,doc.y+12,{width:doc.page.width-116}); doc.moveDown(0.8); });
  doc.moveDown(1);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.emerald).text('EXCEL VERSION COMPATIBILITY',50,doc.y); doc.font('Helvetica').fontSize(9).fillColor(colors.charcoal).text(data.version,50,doc.y+14); doc.moveDown(2);
  doc.rect(50,doc.y,doc.page.width-100,1).fill(colors.champagne); doc.moveDown(1.2);
}

function createPdf(filename, title, subtitle, items) {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 60, left: 50, right: 50 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(outDir, filename));
  doc.pipe(stream);
  addCover(doc, title, subtitle);
  addTOC(doc, items.map(i => i.name));
  items.forEach((it, idx) => { sectionTitle(doc, 'CHAPTER ' + (idx + 1) + ': ' + it.name.toUpperCase()); formulaBlock(doc, it); });
  doc.end();
  return new Promise(r => stream.on('finish', r));
}

module.exports = { createPdf };

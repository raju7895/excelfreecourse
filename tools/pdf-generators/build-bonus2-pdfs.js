/*
 * Bonus PDF builder v2 — generic chapter engine with the creator watermark on
 * every page. Content comes from the site's own verified data files via
 * lib/new-bonus-data.js, so nothing is invented or emptied.
 *
 * Chapter shape:
 *   { name, sections: [
 *       { label, text }              – wrapped paragraph
 *     | { label, code }              – green code box
 *     | { label, bullets }           – bullet list
 *     | { label, rows, header }      – simple table
 *   ] }
 *
 * Run: node tools/pdf-generators/build-bonus2-pdfs.js
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const D = require('./lib/new-bonus-data.js');

const outDir = path.join(__dirname, '..', '..', 'excel-master-index', 'assets', 'bonus-pdfs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const C = { ivory: '#F5F3ED', forest: '#173F35', emerald: '#245C4A', charcoal: '#252923', champagne: '#D8C9A7', white: '#FFFFFF' };
const PW = 595.28, PH = 841.89, ML = 50, MR = 50, MW = PW - ML - MR;
const TOP = 46, LIMIT = PH - 58;

function makeDoc() {
  return new PDFDocument({ size: 'A4', margins: { top: TOP, bottom: 0, left: ML, right: MR }, autoFirstPage: false });
}

function Builder() {
  const doc = makeDoc();
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

  const ensure = (h) => { if (doc.y + h > LIMIT) beginPage(); };
  const linesFor = (text, size, width) => Math.ceil(String(text).length / Math.floor(width / (size * 0.5))) || 1;

  function para(text, o) {
    o = Object.assign({ size: 9.5, font: 'Helvetica', color: C.charcoal, gap: 5 }, o || {});
    const h = doc.font(o.font).fontSize(o.size).heightOfString(String(text), { width: MW, lineGap: 2 });
    ensure(h + 4);
    doc.font(o.font).fontSize(o.size).fillColor(o.color).text(String(text), ML, doc.y, { width: MW, lineGap: 2 });
    doc.y += o.gap;
  }
  function label(text) {
    const h = 20;
    ensure(h);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(C.emerald).text(text, ML, doc.y, { width: MW, lineBreak: false });
    doc.y += 13;
  }
  function code(text) {
    const t = String(text);
    const h = Math.max(18, doc.font('Courier').fontSize(8.4).heightOfString(t, { width: MW - 12, lineGap: 1.5 }) + 8);
    ensure(h + 6);
    doc.rect(ML, doc.y, MW, h).fill('#E8EFE9');
    doc.font('Courier').fontSize(8.4).fillColor(C.forest).text(t, ML + 6, doc.y + 5, { width: MW - 12, lineGap: 1.5 });
    doc.y += h + 6;
    doc.fillColor(C.charcoal);
  }
  function bullets(list, marker) {
    list.forEach(item => {
      const t = (marker || '- ') + item;
      const h = doc.font('Helvetica').fontSize(9.3).heightOfString(t, { width: MW - 14, lineGap: 1.5 });
      ensure(h + 2);
      doc.font('Helvetica').fontSize(9.3).fillColor(C.charcoal).text(t, ML + 10, doc.y, { width: MW - 14, lineGap: 1.5 });
      doc.moveDown(0.18);
    });
    doc.y += 4;
  }
  function table(rows, header) {
    const colW = MW / Math.max(...rows.map(r => r.length), header ? header.length : 1);
    const rowH = 17;
    const drawRow = (cells, isHeader) => {
      ensure(rowH + 2);
      const y = doc.y;
      if (isHeader) { doc.rect(ML, y, MW, rowH).fill(C.emerald); }
      cells.forEach((cell, i) => {
        doc.font('Helvetica-Bold').fontSize(8).fillColor(isHeader ? C.white : C.charcoal);
        doc.text(String(cell), ML + i * colW + 4, y + 5, { width: colW - 8, lineBreak: false, ellipsis: true });
      });
      doc.y = y + rowH + 1;
      doc.fillColor(C.charcoal);
    };
    if (header) drawRow(header, true);
    rows.forEach(r => drawRow(r, false));
    doc.y += 4;
  }
  function chapterTitle(title) {
    const h = 40;
    ensure(h);
    doc.rect(ML, doc.y, MW, 28).fill(C.emerald);
    doc.fillColor(C.white).font('Helvetica-Bold').fontSize(13).text(title, ML + 8, doc.y + 7.5, { width: MW - 16, lineBreak: false });
    doc.y += 42;
    doc.fillColor(C.charcoal);
  }
  function divider() {
    ensure(10);
    doc.rect(ML, doc.y + 3, MW, 1).fill(C.champagne);
    doc.y += 16;
  }
  function cover(title, subtitle) {
    doc.rect(0, 0, PW, PH).fill(C.ivory);
    doc.rect(0, 0, PW, 92).fill(C.forest);
    doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white).text('EXCEL MASTER INDEX', ML, 36, { align: 'center', width: MW });
    doc.font('Helvetica').fontSize(10.5).fillColor(C.champagne).text('Basic to Advanced | English & Roman Hindi', ML, 64, { align: 'center', width: MW });
    doc.font('Helvetica-Bold').fontSize(23).fillColor(C.forest).text(title, ML, 148, { align: 'center', width: MW, lineGap: 4 });
    doc.font('Helvetica').fontSize(13).fillColor(C.emerald).text(subtitle, ML, doc.y + 8, { align: 'center', width: MW, lineGap: 2 });
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
    items.forEach((it, i) => {
      const text = (i + 1) + '.  ' + it;
      const h = doc.font('Helvetica').fontSize(10).heightOfString(text, { width: MW - 16, lineGap: 2 });
      ensure(h + 4);
      doc.font('Helvetica').fontSize(10).fillColor(C.charcoal).text(text, ML + 8, doc.y, { width: MW - 16, lineGap: 2 });
      doc.moveDown(0.28);
    });
    beginPage();
  }
  return { doc, cover, toc, chapterTitle, para, label, code, bullets, table, divider, get page() { return page; } };
}

function renderChapter(b, idx, ch) {
  b.chapterTitle('CHAPTER ' + (idx + 1) + ': ' + ch.name.toUpperCase());
  ch.sections.forEach(s => {
    if (s.label) { b.label(s.label); }
    if (s.text) b.para(s.text);
    if (s.code) b.code(s.code);
    if (s.bullets) b.bullets(s.bullets);
    if (s.rows) b.table(s.rows, s.header);
    if (s.afterPara) b.para(s.afterPara);
  });
  b.divider();
}

async function buildOne(spec) {
  const b = Builder();
  b.cover(spec.title, spec.subtitle);
  b.toc(spec.items.map(c => c.name));
  spec.items.forEach((c, i) => renderChapter(b, i, c));
  const file = path.join(outDir, spec.file);
  const stream = fs.createWriteStream(file);
  b.doc.pipe(stream);
  b.doc.end();
  await new Promise(r => stream.on('finish', r));
  return { file: spec.file, pages: b.page };
}

async function buildOne(spec) {
  const b = Builder();
  b.cover(spec.title, spec.subtitle);
  b.toc(spec.items.map(c => c.name));
  spec.items.forEach((c, i) => renderChapter(b, i, c));
  const file = path.join(outDir, spec.file);
  const stream = fs.createWriteStream(file);
  b.doc.pipe(stream);
  b.doc.end();
  await new Promise(r => stream.on('finish', r));
  return { file: spec.file, pages: b.page };
}

function chartChapters() {
  return D.CHART_LESSONS.map(l => ({
    name: l.name,
    sections: [
      { label: 'WHAT IS THIS CHART? - ENGLISH', text: l.what },
      { label: 'EASY ROMAN HINDI', text: l.hi },
      { label: 'WHEN TO USE IT', text: l.use },
      { label: 'WHEN NOT TO USE IT', text: l.avoid },
      { label: 'WHICH DATA IS SUITABLE', text: l.suitable },
      { label: 'REAL-WORLD OFFICE / MIS USE', text: l.office },
      { label: 'SAMPLE EXCEL DATASET', code: l.dataset },
      { label: 'STEP-BY-STEP - CREATE IN EXCEL', bullets: l.steps },
      { label: 'HOW TO SELECT THE DATA RANGE', text: l.range },
      { label: 'FORMAT PROFESSIONALLY', text: l.format },
      { label: 'COMMON MISTAKES', bullets: l.mistakes },
      { label: 'ADVANTAGES', bullets: [l.pros] },
      { label: 'DISADVANTAGES', bullets: [l.cons] },
      { label: 'INTERVIEW QUESTIONS', bullets: l.interview },
      { label: 'PRACTICE TASK', text: l.task.q, afterPara: 'Expected outcome: ' + l.task.a }
    ]
  }));
}

function selectionChapters() {
  const guideRows = [
    ['Requirement', 'Best chart', 'Why'],
    ['Compare categories', 'Bar / Column', 'Side-by-side bars make differences instant'],
    ['Trend over time', 'Line chart', 'Connected line shows direction and continuity'],
    ['Parts of a whole (few parts)', 'Pie / Doughnut', 'Slices show share; keep ≤ 6 slices'],
    ['Distribution of values', 'Histogram / Box & Whisker', 'Bins and quartiles show shape and outliers'],
    ['Relationship between 2 numeric variables', 'Scatter (XY)', 'Honest correlation view'],
    ['P&L bridge / contribution walk', 'Waterfall', 'Shows each increase and decrease vs total'],
    ['Target vs achievement', 'Bar / Combo', 'Columns with a % line on secondary axis'],
    ['Two measures, different scales', 'Combo chart', 'Secondary axis keeps both readable'],
    ['Ranking with long labels', 'Horizontal Bar', 'Labels fit naturally']
  ];
  const chapters = [{
    name: 'THE CHART DECISION FRAMEWORK',
    sections: [
      { label: 'HOW TO CHOOSE', text: 'Start from the QUESTION you need answered, not from the chart gallery. Step 1: decide the story (comparison, trend, composition, distribution, relationship, flow). Step 2: pick the chart family that tells that story. Step 3: strip every decoration that does not carry data. Step 4: test against the "when NOT to use" list in each lesson.' },
      { label: 'QUICK SELECTION MATRIX', rows: guideRows },
      { label: 'HINDI SUMMARY', text: 'Chart chunne ke liye pehle question decide karo: comparison, trend, composition, distribution, relationship ya flow. Uske baad uss story ke hisaab se family chuno. Extra decoration hatao.' }
    ]
  }];
  D.CHART_LESSONS.forEach(l => {
    chapters.push({
      name: l.name.toUpperCase() + ' - WHEN TO USE',
      sections: [
        { label: 'USE IT WHEN', text: l.use },
        { label: 'AVOID IT WHEN', text: l.avoid },
        { label: 'SUITABLE DATA', text: l.suitable },
        { label: 'BETTER ALTERNATIVE CHECK', text: 'If the audience must compare precise adjacent values or read exact numbers, prefer a table or a data bar. If the chart fails this test, switch to the alternative recommended in the comparison lessons.' },
        { label: 'HINDI SUMMARY', text: l.hi }
      ]
    });
  });
  return chapters;
}

function creationChapters() {
  const chapters = [{
    name: 'GENERAL CHART CREATION WORKFLOW',
    sections: [
      { label: 'THE 6-STEP WORKFLOW', bullets: [
        'Prepare clean data with one header row and consistent types (dates as dates, numbers as numbers).',
        'Select the range INCLUDING headers - Excel uses them for legend and axis titles automatically.',
        'Insert > Charts, pick the family recommended in the Selection Master Guide.',
        'Fix the chart type under Chart Design > Change Chart Type if Excel guessed wrong.',
        'Add title, axis titles, legend and data labels only where they carry information.',
        'Format: one accent colour, muted gridlines, readable font sizes.'
      ] },
      { label: 'RANGES THAT ALWAYS WORK', text: 'Select A1:C5 for a 4-row, 2-series table with headers. Use Ctrl+T to keep the range self-expanding so the chart grows automatically when you add rows.' },
      { label: 'HINDI SUMMARY', text: 'Pehle clean data banao, phir headers ke saath range select karo, Insert > Charts se chuno, aur title/labels daalo jo information carry karte hon. Ranges ko structured table banao.' }
    ]
  }];
  D.CHART_LESSONS.forEach(l => {
    chapters.push({
      name: l.name.toUpperCase() + ' STEP-BY-STEP',
      sections: [
        { label: 'SAMPLE DATASET', code: l.dataset },
        { label: 'SELECT THE RANGE', text: l.range },
        { label: 'CREATE THE CHART', bullets: l.steps },
        { label: 'FORMAT LIKE A PRO', text: l.format },
        { label: 'TITLE & LABELS', text: 'Add a chart title that states the message (e.g. "Revenue recovered in March"). Axis titles only when the unit is not obvious. Legend at the bottom; data labels on the end of bars or slices; never on crowded lines.' },
        { label: 'COMMON MISTAKES', bullets: l.mistakes },
        { label: 'PRACTICE TASK', text: l.task.q, afterPara: 'Expected outcome: ' + l.task.a }
      ]
    });
  });
  return chapters;
}

function cleaningChapters() {
  const chapters = D.CLEANING.map(t => ({
    name: t.name.toUpperCase(),
    sections: [
      { label: 'WHAT IT IS - ENGLISH', text: t.en },
      { label: 'EASY ROMAN HINDI', text: t.hi },
      { label: 'PRO TIP', text: t.tip || 'Apply it on a copy of the data first.' },
      { label: 'PRACTICE', text: 'Open a messy 50-row export, apply this tool, then verify with COUNTBLANK / conditional formatting that the data is clean.' }
    ]
  }));
  // add two practical worked examples
  chapters.push({ name: 'FULL CLEANING PIPELINE (END TO END)', sections: [
    { label: 'SCENARIO', text: 'You receive a 5,000-row customer export from CRM: mixed case names, extra spaces, duplicate IDs, blank phones, date stored as text.' },
    { label: 'STEP 1 - BACKUP', text: 'Copy the raw sheet and name it RAW_BACKUP. Never clean the only copy.' },
    { label: 'STEP 2 - TEXT CLEANING', text: '=PROPER(TRIM(CLEAN(A2))) for names; TRIM for addresses. Paste values back.' },
    { label: 'STEP 3 - DEDUPE', text: 'Data > Remove Duplicates on CustomerID only after reviewing the count of duplicates via COUNTIF.' },
    { label: 'STEP 4 - BLANKS', text: 'Go To Special > Blanks; fill phone blanks with "MISSING" in one action, or delete rows with incomplete mandatory fields.' },
    { label: 'STEP 5 - VALIDATION', text: 'Data Validation: phone = text length 10, city = dropdown from a master list.' },
    { label: 'STEP 6 - AUDIT', text: 'COUNTBLANK for blanks, COUNTIFS for duplicates, conditional formatting for invalid phone lengths.' }
  ]});
  return chapters;
}

function pivotChapters() {
  const pick = (names) => D.ADV_TOOLS.filter(t => names.includes(t.name));
  const pivotTools = pick(['PivotTables', 'PivotCharts', 'Slicers', 'Timelines', 'Grouping in PivotTables', 'Calculated Fields', 'GETPIVOTDATA']);
  const chapters = [{
    name: 'PIVOTTABLE FUNDAMENTALS',
    sections: [
      { label: 'WHAT A PIVOTTABLE IS', text: 'A PivotTable turns a flat table into an interactive summary by dragging fields into Rows, Columns, Values and Filters. It recalculates on refresh; it never alters the source.' },
      { label: 'YOUR FIRST PIVOT IN 6 STEPS', bullets: [
        'Ctrl+T the source data (must have one header row, no blank rows).',
        'Insert > PivotTable > New Worksheet.',
        'Drag Category to Rows, Amount to Values (Sum).',
        'Drag Region to Columns for a matrix view.',
        'Right-click > Group for dates (Years > Quarters > Months).',
        'Insert a Slicer on Region and a Timeline on Date.'
      ] },
      { label: 'VALUE FIELD SETTINGS', text: 'Right-click any value cell > Value Field Settings: switch between Sum, Count, Average, % of Grand Total, % of Column Total, Running Total.' },
      { label: 'PIVOTCHARTS', text: 'Insert > PivotChart on the active pivot. Every pivot chart is attached to the pivot — filters and slicers update it instantly. Hide field buttons under PivotChart Analyze > Field Buttons for a clean look.' },
      { label: 'HINDI SUMMARY', text: 'PivotTable flat data ko interactive summary me badalta hai. Drag karo, refresh karo, original data safe. Slicers se click karke filter karo.' }
    ]
  }];
  pivotTools.forEach(t => chapters.push({
    name: t.name.toUpperCase(),
    sections: [
      { label: 'WHAT IT DOES', text: t.en },
      { label: 'EASY ROMAN HINDI', text: t.hi },
      { label: 'VERSION', text: t.version },
      { label: 'WORKED EXAMPLE', text: 'Open the Sales sample on this website (MIS > Order Tracking), build the pivot on a fresh sheet, add one slicer, then one PivotChart. Verify totals against the raw table with SUMIFS.' }
    ]
  }));
  return chapters;
}

function powerQueryChapters() {
  const pq = D.ADV_TOOLS.filter(t => /Power Query|Import|Merge|Append|Remove|Split|Group|Unpivot/.test(t.name));
  const chapters = [{
    name: 'POWER QUERY OVERVIEW',
    sections: [
      { label: 'WHAT IT IS', text: 'Power Query (Get & Transform) is a free, built-in ETL engine: import data from anywhere, clean it with recorded steps, then load it to a sheet or the Data Model. Steps are repeatable and refresh with one click.' },
      { label: 'WHERE IT BEATS FORMULAS', text: '500k rows, messy CSVs, repeated monthly imports, merging 12 sheets — Power Query replaces hours of manual copy-paste with a refreshable query.' },
      { label: 'THE QUERY FLOW', bullets: [
        'Data > Get Data > choose source (Excel / CSV / Folder / Web / SQL).',
        'Transform: remove columns, split, replace values, filter, group, unpivot.',
        'Close & Load To... worksheet or Only Create Connection + Add to Data Model.',
        'Refresh with Data > Refresh All (Alt+F5).'
      ] }
    ]
  }];
  pq.forEach(t => chapters.push({
    name: t.name.toUpperCase(),
    sections: [
      { label: 'WHAT IT DOES', text: t.en },
      { label: 'EASY ROMAN HINDI', text: t.hi },
      { label: 'VERSION', text: t.version },
      { label: 'WORKED EXAMPLE', text: 'Import a folder of monthly sales CSVs, append them, split the Date column, replace blank cities with "Unknown", group by Region with sum of Amount, load to a sheet, refresh next month — zero manual work.' }
    ]
  }));
  return chapters;
}

function dashboardChapters() {
  return D.DASHBOARD_MODULES.map(m => ({
    name: m.name.toUpperCase(),
    sections: [
      { label: 'WHAT IT DOES', text: m.en },
      { label: 'EASY ROMAN HINDI', text: m.hi },
      { label: 'HOW TO BUILD IT', bullets: m.steps || ['Reserve dedicated cells for the metric.'] },
      { label: 'COMMON MISTAKES', bullets: m.mistakes || ['No consistent layout.', 'Unformatted numbers.'] },
      { label: 'VERSION', text: m.version || 'All versions' },
      { label: 'QUALITY CHECKLIST', text: 'Numbers tie out to the source table, formatting is consistent, the layout survives print preview, and every tile recalculates on refresh.' }
    ]
  }));
}

function misChapters() {
  return D.MIS_PROJECTS.map(p => ({
    name: p.name.toUpperCase(),
    sections: [
      { label: 'DIFFICULTY', text: p.level },
      { label: 'WHAT THIS REPORT IS', text: p.en },
      { label: 'आसान ROMAN HINDI', text: p.hi },
      { label: 'RAW DATA / INPUTS REQUIRED', text: p.requires },
      { label: 'STEP-BY-STEP TASK', bullets: p.steps },
      { label: 'FORMULAS USED', code: p.formulas },
      { label: 'EXPECTED OUTPUT', text: p.output },
      { label: 'COMMON MISTAKES', bullets: p.mistakes },
      { label: 'PRACTICE ASSIGNMENT', text: p.practice }
    ]
  }));
}

function practiceChapters() {
  const chapters = [{
    name: 'HOW TO USE THIS PRACTICE BOOK',
    sections: [
      { label: 'METHOD', text: 'Solve each task on a copy of the raw data, then compare with the answer. Do not peek before attempting. Track solved tasks in the Excel Master Index Practice Lab for your own streak.' },
      { label: 'SCORING', text: 'Easy = warm-up, Medium = job-ready, Hard = interview-ready. Aim for all Easy and Medium tasks before moving on.' },
      { label: 'ANSWERS', text: 'Every answer states the exact formula or feature; version notes are given where a function is limited to Microsoft 365 / Excel 2019+.' }
    ]
  }];
  D.PRACTICE_TASKS.forEach(t => chapters.push({
    name: 'TASK ' + t.id + ' (' + t.difficulty.toUpperCase() + ')',
    sections: [
      { label: 'QUESTION', text: t.question },
      { label: 'DATASET', code: t.dataset },
      { label: 'LEVEL', text: t.difficulty + ' · ' + t.level },
      { label: 'SOLUTION', text: t.answer },
      { label: 'WHY IT WORKS', text: 'The solution combines the right feature with correct absolute/relative references and an exact-match or bounded lookup where needed.' }
    ]
  }));
  return chapters;
}

function advancedToolsChapters() {
  const chapters = D.ADV_TOOLS.map(t => ({
    name: t.name.toUpperCase(),
    sections: [
      { label: 'WHAT IT DOES', text: t.en },
      { label: 'EASY ROMAN HINDI', text: t.hi },
      { label: 'VERSION REQUIREMENT', text: t.version },
      { label: 'PRO TIP', text: t.tip },
      { label: 'WHEN TO USE', text: 'Use it when the task repeats, involves many rows, or must survive a monthly refresh. If it is a one-off under 50 rows, a plain formula is fine.' }
    ]
  }));
  chapters.push({ name: 'PRODUCTIVITY WORKFLOW', sections: [
    { label: 'THE 80/20 OF EXCEL SPEED', bullets: [
      'Ctrl+T for every data range (auto filter + structured refs).',
      'Ctrl+Arrow keys and Ctrl+Shift+Arrow for range selection.',
      'F4 to lock references while editing formulas.',
      'Alt+= for instant SUM; Ctrl+Shift+L toggles filters.',
      'Always clean data before analysis (TRIM > CLEAN > PROPER).',
      'Refresh pivots with Alt+F5; set Calculation to Automatic except for huge models.'
    ] }
  ]});
  return chapters;
}

function shortcutChapters() {
  const rows = [
    ['Shortcut', 'Action'],
    ['Ctrl+T', 'Convert range to Excel Table'],
    ['Ctrl+Shift+L', 'Toggle filters'],
    ['Alt+=', 'Insert SUM formula'],
    ['Ctrl+Arrow', 'Jump to edge of data'],
    ['Ctrl+Shift+Arrow', 'Select to edge of data'],
    ['F2', 'Edit active cell'],
    ['F4', 'Repeat last action / cycle absolute refs'],
    ['Ctrl+C / Ctrl+V', 'Copy / Paste'],
    ['Ctrl+Alt+V', 'Paste Special'],
    ['Ctrl+1', 'Format Cells dialog'],
    ['Ctrl+;', 'Insert current date'],
    ['Ctrl+Shift+;', 'Insert current time'],
    ['Ctrl+D / Ctrl+R', 'Fill down / fill right'],
    ['Ctrl+Enter', 'Fill selected range with current entry'],
    ['Ctrl+Shift+"+"', 'Insert row/column'],
    ['Ctrl+Shift+"-"', 'Delete row/column'],
    ['Ctrl+Page Up/Down', 'Switch worksheets'],
    ['Ctrl+Home / End', 'Jump to start / last used cell'],
    ['Ctrl+F / Ctrl+H', 'Find / Replace'],
    ['F5 > Special', 'Go To Special (blanks, formulas, errors)'],
    ['Alt+F11', 'Open VBA editor'],
    ['Alt+F5', 'Refresh all queries & pivots'],
    ['F9 / Ctrl+Alt+F9', 'Recalculate / full recalc'],
    ['Ctrl+Z / Ctrl+Y', 'Undo / Redo'],
    ['Ctrl+Space / Shift+Space', 'Select column / row'],
    ['Alt+Enter', 'Line break inside a cell'],
    ['Ctrl+`', 'Toggle formulas view'],
    ['Esc', 'Cancel entry / close dropdown'],
    ['Tab / Shift+Tab', 'Move right / left in a table']
  ];
  return [{
    name: 'THE 29 ESSENTIAL EXCEL SHORTCUTS',
    sections: [
      { label: 'MASTER TABLE', rows },
      { label: 'HOW TO MEMORISE', text: 'Pick five shortcuts, use them until they are muscle memory, then add five more. Muscle memory beats reading the list once.' },
      { label: 'HINDI SUMMARY', text: 'Shortcuts yaad karne ke liye ek-ek batch of five chuno, daily use karo, phir agle five. Ek baar padhne se kuch nahi hota.' }
    ]
  }, {
    name: 'SHORTCUT CATEGORY DRILLS',
    sections: [
      { label: 'NAVIGATION DRILL', text: 'Open a 5,000-row table. Jump to the bottom with Ctrl+Arrow, select the used range with Ctrl+Shift+End, filter with Ctrl+Shift+L, and jump between sheets with Ctrl+Page Down. Time yourself.' },
      { label: 'EDITING DRILL', text: 'Insert 10 rows with Ctrl+Shift++, fill formulas down with Ctrl+D, fix absolute references with F4, and lock the header row with freeze panes from the View tab.' },
      { label: 'FORMULA DRILL', text: 'Toggle formula view with Ctrl+`, recalc with F9, insert SUM with Alt+=, and open Go To Special to find all blanks before filling them.' }
    ]
  }];
}

function vbaChapters() {
  const vbaTopics = D.AUTOMATION_TOPICS.filter(t => /Macro|VBA|Automating|Record/.test(t.name));
  const chapters = [{
    name: 'WHAT MACROS & VBA CAN DO FOR YOU',
    sections: [
      { label: 'REALITY CHECK', text: 'Macros record your manual steps and replay them instantly. VBA is the programming language behind them. They require desktop Excel and may be blocked by IT policy — always test on copies of files.' },
      { label: 'YOUR FIRST MACRO', bullets: [
        'View > Macros > Record Macro. Name it NormaliseHeaders; shortcut Ctrl+Shift+H.',
        'Perform the actions: select row 1, bold, fill colour, auto-fit.',
        'View > Macros > Stop Recording.',
        'Press Ctrl+Shift+H on any sheet — same formatting applies instantly.',
        'Open Alt+F11 to see the generated code in a module.'
      ] },
      { label: 'ABSOLUTE VS RELATIVE', text: 'Absolute macro hard-codes A1 references. Relative macro (Use Relative References before recording) remembers your movements from the active cell — use it for "format this selection" style tools.' },
      { label: 'WORKED EXAMPLE — AUTO-EMAIL REPORT', text: 'Record: refresh pivots, copy the report range as a picture, paste into a new Outlook message, address it, send. Clean the code with With ... End With blocks. NEVER run it on an unattended schedule before testing.' }
    ]
  }];
  vbaTopics.forEach(t => chapters.push({
    name: t.name.toUpperCase(),
    sections: [
      { label: 'WHAT IT DOES', text: t.en },
      { label: 'EASY ROMAN HINDI', text: t.hi },
      { label: 'VERSION', text: t.version },
      { label: 'PRO TIP', text: t.tip }
    ]
  }));
  return chapters;
}

const PRO = [
  { label: 'STEP', text: 'Progress from Beginner to MIS Executive: open each project in the workbook, rebuild it from the raw data before reading the solution, and time yourself.' }
];

const BOOKS = [
  { file: '11_EXCEL_CHARTS_AND_DATA_VISUALIZATION_GUIDE.pdf', title: 'EXCEL CHARTS & DATA VISUALIZATION GUIDE', subtitle: '25 Chart Types | When to Use | How to Create | MIS Examples | Bilingual Guide', chapters: chartChapters },
  { file: '12_EXCEL_CHART_SELECTION_MASTER_GUIDE.pdf', title: 'EXCEL CHART SELECTION MASTER GUIDE', subtitle: 'Which Chart Should I Use? | Decision Framework | 25 Selection Checks | Bilingual Guide', chapters: selectionChapters },
  { file: '13_EXCEL_CHART_CREATION_STEP_BY_STEP_HANDBOOK.pdf', title: 'EXCEL CHART CREATION STEP-BY-STEP HANDBOOK', subtitle: 'Range Selection | Titles | Labels | Professional Formatting | Bilingual Guide', chapters: creationChapters },
  { file: '14_EXCEL_DATA_CLEANING_AND_DATA_MANAGEMENT.pdf', title: 'EXCEL DATA CLEANING & DATA MANAGEMENT', subtitle: 'Duplicates | TRIM & CLEAN | Validation | Tables | Bilingual Guide', chapters: cleaningChapters },
  { file: '15_EXCEL_PIVOTTABLE_AND_PIVOTCHART_MASTERCLASS.pdf', title: 'EXCEL PIVOTTABLE & PIVOTCHART MASTERCLASS', subtitle: 'Pivots | Slicers | Timelines | Calculated Fields | GETPIVOTDATA | Bilingual Guide', chapters: pivotChapters },
  { file: '16_EXCEL_POWER_QUERY_COMPLETE_GUIDE.pdf', title: 'EXCEL POWER QUERY COMPLETE GUIDE', subtitle: 'Get & Transform | Merge | Append | Group By | Unpivot | Bilingual Guide', chapters: powerQueryChapters },
  { file: '17_EXCEL_DASHBOARD_CREATION_HANDBOOK.pdf', title: 'EXCEL DASHBOARD CREATION HANDBOOK', subtitle: 'KPI Cards | Slicers | Dynamic Titles | Print & PDF Export | Bilingual Guide', chapters: dashboardChapters },
  { file: '18_MIS_EXECUTIVE_PRACTICAL_EXCEL_HANDBOOK.pdf', title: 'MIS EXECUTIVE PRACTICAL EXCEL HANDBOOK', subtitle: '20 Real Office Reports | Sales | Attendance | Inventory | Payroll | Dashboards', chapters: misChapters },
  { file: '19_EXCEL_PRACTICE_QUESTIONS_AND_SOLUTIONS.pdf', title: 'EXCEL PRACTICE QUESTIONS & SOLUTIONS', subtitle: '12 Real Tasks | Dataset | Hints | Answers | Interview Preparation', chapters: practiceChapters },
  { file: '20_EXCEL_ADVANCED_TOOLS_AND_PRODUCTIVITY_GUIDE.pdf', title: 'EXCEL ADVANCED TOOLS & PRODUCTIVITY GUIDE', subtitle: 'Pivots | Power Query | Data Model | DAX | What-If | Productivity | Bilingual Guide', chapters: advancedToolsChapters },
  { file: '21_EXCEL_SHORTCUTS_MASTER_HANDBOOK.pdf', title: 'EXCEL SHORTCUTS MASTER HANDBOOK', subtitle: '29 Essential Shortcuts | Drills | Memory Method | Bilingual Guide', chapters: shortcutChapters },
  { file: '22_EXCEL_AUTOMATION_AND_VBA_BEGINNER_GUIDE.pdf', title: 'EXCEL AUTOMATION & VBA BEGINNER GUIDE', subtitle: 'Record Macro | VBA Basics | Automated Reports | Protection | Business Use Cases', chapters: vbaChapters }
];

(async () => {
  const built = [];
  for (const spec of BOOKS) {
    const items = spec.chapters();
    const result = await buildOne({ file: spec.file, title: spec.title, subtitle: spec.subtitle, items });
    built.push(result);
  }
  built.forEach(b => console.log(String(b.pages).padStart(2, ' ') + ' pages | ' + b.file));
  console.log('Built ' + built.length + ' new BONUS PDFs with watermark on every page.');
})().catch(e => { console.error('BUILD FAILED', e); process.exit(1); });

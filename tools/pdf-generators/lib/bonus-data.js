/*
 * Single source of truth for BONUS PDF content.
 *
 * The formula chapters are mapped from the website's own formula library
 * (excel-master-index/js/d*.js), so every PDF uses exactly the same verified
 * bilingual content as the site (purpose, syntax, dataset, formula, output,
 * steps, office example, mistakes, tips, version). Nothing is invented here.
 *
 * Book 09 (MIS Executive) and Book 10 (Combination Master) use bespoke
 * practical chapters defined locally because they describe workflows, not
 * single functions.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadLibrary() {
  const dir = path.join(__dirname, '..', '..', '..', 'excel-master-index', 'js');
  const ctx = { console: { log() {}, error() {} } };
  vm.createContext(ctx);
  const files = fs.readdirSync(dir).filter(f => /^d\d+\.js$/.test(f)).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
  for (const f of files) {
    let s = fs.readFileSync(path.join(dir, f), 'utf8').replace(/^\uFEFF/, '');
    s = s.replace(/^const\s+([A-Za-z0-9_]+)\s*=/gm, (m, name) => 'globalThis.__C=globalThis.__C||{};__C.' + name + '=');
    try { vm.runInContext(s, ctx, { filename: f }); } catch (e) { /* skip broken chunk */ }
  }
  const C = ctx.__C || {};
  const all = [];
  Object.keys(C).forEach(k => { if (/^F\d+$/.test(k) && Array.isArray(C[k])) all.push.apply(all, C[k]); });
  const byId = {};
  all.forEach(f => { if (f && f.id) byId[f.id] = f; });

  // JS spreads (e.g. xlfn._xlws.FILTER) are stored without the prefix.
  if (byId['_xlws.FILTER']) byId.FILTER = byId['_xlws.FILTER'];
  if (byId['xlfn.IFS']) byId.IFS = byId['xlfn.IFS'];
  return byId;
}

const flat = (v) => {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) return v.reduce((a, x) => a.concat(flat(x)), []);
  return [String(v)];
};

// Convert a library entry into the chapter shape used by the PDF renderer.
function toChapter(fid, byId) {
  const f = byId[fid];
  if (!f) { return null; }
  const version = String(f.version || 'Excel 2007+') + (f.m365 ? ' (Microsoft 365 / newer version only)' : '');
  return {
    name: f.name || fid,
    purposeEn: f.purpose.en,
    purposeHi: f.purpose.hi,
    syntax: f.syntax.en,
    syntaxExpEn: f.explain.en,
    syntaxExpHi: f.explain.hi,
    dataset: 'Cells: ' + f.dataset.cells + '  |  Values: ' + f.dataset.values,
    formula: f.formula,
    output: f.output,
    stepsEn: flat(f.steps.en),
    stepsHi: flat(f.steps.hi),
    officeEn: f.office.en,
    officeHi: f.office.hi,
    mistakes: flat(f.mistakes.en),
    tips: flat(f.tips.en),
    version: version
  };
}

function chapters(ids, byId, loc) {
  const out = [];
  const missing = [];
  ids.forEach(id => {
    // loc may rename a chapter (e.g. composites like INDEX + MATCH)
    const actualId = (loc && loc[id]) ? loc[id] : id;
    let ch = toChapter(actualId, byId);
    if (!ch && SUPPLEMENTARY[actualId]) { ch = Object.assign({}, SUPPLEMENTARY[actualId]); }
    if (!ch) { missing.push(id); return; }
    if (loc && loc[id] && loc[id] !== id) { ch.name = id; }
    out.push(ch);
  });
  if (missing.length) { console.warn('Missing formula entries:', missing.join(', ')); }
  return out;
}

// ---------- supplementary chapters not covered by the site library ----------
const SUPPLEMENTARY = {
  COUNTBLANK: {
    name: 'COUNTBLANK',
    purposeEn: 'Counts empty cells in a range.',
    purposeHi: 'Range me khali cells count karta hai.',
    syntax: '=COUNTBLANK(range)',
    syntaxExpEn: 'Only truly blank cells are counted; cells containing a space are not blank.',
    syntaxExpHi: 'Sirf sach me khali cells count hote hain; space wali cells blank nahi maani jati.',
    dataset: 'Cells: A1:A5  |  Values: 10, (blank), ABC, (blank), (blank)',
    formula: '=COUNTBLANK(A1:A5)',
    output: '3',
    stepsEn: ['Select the result cell.', 'Type =COUNTBLANK(A1:A5).', 'Press Enter.'],
    stepsHi: ['Result cell select karo.', '=COUNTBLANK(A1:A5) likho.', 'Enter dabao.'],
    officeEn: 'Used to track missing data in attendance, stock and MIS registers.',
    officeHi: 'Attendance, stock aur MIS register me missing data track karne ke liye use hota hai.',
    mistakes: ['Assuming cells with a space are blank.', 'Counting a range of different sheets at once.'],
    tips: ['Combine with COUNTBLANK for data-quality dashboards.', 'Use TRIM to catch space-only cells.'],
    version: 'Excel 2007+'
  },
  'INDEX + MATCH': {
    name: 'INDEX + MATCH',
    purposeEn: 'Returns a value from any column by locating its row position, in any lookup direction.',
    purposeHi: 'Row position dhoondh ke kisi bhi column se value return karta hai, kisi bhi direction me.',
    syntax: '=INDEX(return_range,MATCH(lookup_value,lookup_range,0))',
    syntaxExpEn: 'MATCH finds the row number where the lookup value sits, and INDEX returns the value at that position in the return range.',
    syntaxExpHi: 'MATCH lookup value ki row number dhoondta hai, aur INDEX us position par return range ki value deta hai.',
    dataset: 'Cells: A2:A10 product IDs, C2:C10 prices, F2 lookup ID  |  Values: P01-P09, 120-560',
    formula: '=INDEX(C2:C10,MATCH(F2,A2:A10,0))',
    output: 'Price of the matched product (for example 340)',
    stepsEn: ['Type MATCH(F2,A2:A10,0) and confirm it returns the right row number.', 'Wrap that MATCH inside INDEX(C2:C10, ...).', 'Lock the ranges with $ signs before copying.'],
    stepsHi: ['MATCH(F2,A2:A10,0) likhkar sahi row number confirm karo.', 'Us MATCH ko INDEX(C2:C10, ...) me wrap karo.', 'Copy se pehle ranges ko $ se lock karo.'],
    officeEn: 'Looks up a price or stock value from a master sheet where the key is not the first column.',
    officeHi: 'Master sheet se price ya stock value nikalne ke liye jahan key pehla column nahi hai.',
    mistakes: ['Return and lookup ranges of different heights shift the rows.', 'Using a non-zero match type on unsorted data.'],
    tips: ['Use a two-way INDEX with row MATCH and column MATCH for matrix lookups.', 'Replace with XLOOKUP in Microsoft 365.'],
    version: 'Excel 2007+'
  },
  'INDEX + XMATCH': {
    name: 'INDEX + XMATCH',
    purposeEn: 'Modern replacement for INDEX + MATCH with better match modes and defaults.',
    purposeHi: 'INDEX + MATCH ka modern replacement, behtar match modes aur defaults ke saath.',
    syntax: '=INDEX(return_range,XMATCH(lookup_value,lookup_range,[match_mode],[search_mode]))',
    syntaxExpEn: 'XMATCH defaults to exact match and search first-to-last, so the 0 argument is optional.',
    syntaxExpHi: 'XMATCH ka default exact match aur pehle se aakhir tak search hai, isliye 0 optional hai.',
    dataset: 'Cells: A2:A10 product IDs, C2:C10 prices, F2 lookup ID',
    formula: '=INDEX(C2:C10,XMATCH(F2,A2:A10))',
    output: 'Price of the matched product',
    stepsEn: ['Type XMATCH(F2,A2:A10) to get the row position.', 'Wrap it inside INDEX(C2:C10, ...).', 'Copy the formula down the report.'],
    stepsHi: ['XMATCH(F2,A2:A10) likhkar row position lo.', 'Usse INDEX(C2:C10, ...) me wrap karo.', 'Report me neeche copy karo.'],
    officeEn: 'Modern workbooks use it for robust lookups that also support reverse search.',
    officeHi: 'Modern workbook ise robust lookups ke liye use karte hain jahan reverse search bhi chahiye.',
    mistakes: ['Requires Excel 2021 or Microsoft 365.', 'Mixing XMATCH with ranges of different sizes.'],
    tips: ['Pass -1 as search_mode for last-to-first search.', 'Use XLOOKUP when you do not need a separate INDEX.'],
    version: 'Excel 2021 / Microsoft 365'
  }
};

// ---------- bespoke practical chapters (Book 09) ----------
function mis(name, purposeEn, purposeHi, syntax, syntaxExpEn, syntaxExpHi, dataset, formula, output, stepsEn, stepsHi, officeEn, officeHi, mistakes, tips, version) {
  return { name, purposeEn, purposeHi, syntax, syntaxExpEn, syntaxExpHi, dataset, formula, output, stepsEn, stepsHi, officeEn, officeHi, mistakes, tips, version };
}

const MIS_CHAPTERS = [
  mis('GROSS SALES', 'Gross sales = quantity multiplied by rate, before discount.', 'Gross sales = quantity ko rate se multiply karke nikalte hain (discount se pehle).', '=Qty*Rate', 'Two columns are multiplied cell by cell.', 'Do columns ko cell by cell multiply karte hain.', 'B2 = 10 (Qty), C2 = 500 (Rate)', '=B2*C2', '5000', ['Enter =B2*C2 in the Gross column.', 'Copy the formula down the column.', 'Wrap with SUM for the total.'], ['Gross column me =B2*C2 likho.', 'Formula ko neeche copy karo.', 'Total ke liye SUM lagao.'], 'Monthly sales register where each line item is priced.', 'Monthly sales register jahan har line item ki price hoti hai.', ['Multiplying the wrong columns.', 'Rate stored as text.'], ['Format the rate column as Number.', 'Use a table so formulas extend automatically.'], 'Excel 2007+'),
  mis('NET SALES', 'Net sales = gross sales minus discount amount.', 'Net sales = gross sales me se discount amount minus karke.', '=Gross-(Gross*Discount%)', 'Discount percentage is applied to gross, then subtracted.', 'Discount percentage gross par lagta hai, phir minus hota hai.', 'B2 = 5000 (Gross), C2 = 10% (Discount)', '=B2-(B2*C2)', '4500', ['Store discount as a percentage.', 'Subtract gross times discount from gross.', 'Copy down and total.'], ['Discount ko percentage me rakho.', 'Gross minus (Gross x Discount) karo.', 'Neeche copy karke total nikalo.'], 'Invoices use net sales after trade discount for accounting.', 'Invoices accounting ke liye trade discount ke baad net sales use karti hain.', ['Typing 10 instead of 10%.', 'Subtracting a fixed amount from every row.'], ['Format the discount cell as Percentage.', 'Use SUMIFS for period totals.'], 'Excel 2007+'),
  mis('TOTAL ORDERS', 'Counts every order ID recorded in the period.', 'Period me record hue saare order IDs count karta hai.', '=COUNTA(OrderIDRange)', 'COUNTA counts cells that are not empty.', 'COUNTA khali nahi hone wale cells count karta hai.', 'A2:A100 contains order IDs', '=COUNTA(A2:A100)', '99', ['Keep one order ID per row.', 'Point COUNTA at the ID column.', 'Avoid blank rows inside the range.'], ['Har row me ek order ID rakho.', 'COUNTA ko ID column par lagao.', 'Range ke beech khali rows na rakho.'], 'Daily order MIS counts volume from the order ID column.', 'Daily order MIS order ID column se volume count karta hai.', ['Blank formatted rows are counted.', 'Duplicated IDs inflate the count.'], ['Use a dynamic range or an Excel Table.', 'Count duplicates separately with COUNTIF.'], 'Excel 2007+'),
  mis('DELIVERED ORDERS', 'Counts orders whose status is Delivered.', 'Delivered status wale orders count karta hai.', '=COUNTIF(StatusRange,"Delivered")', 'COUNTIF counts exact text matches.', 'COUNTIF exact text match count karta hai.', 'B2:B100 contains status values', '=COUNTIF(B2:B100,"Delivered")', '45', ['Keep status spelling consistent.', 'Use COUNTIF with the status text.', 'Combine with a total for the percentage.'], ['Status ki spelling same rakho.', 'COUNTIF me status text do.', 'Percentage ke liye total ke saath combine karo.'], 'Logistics MIS tracks delivery completion each day.', 'Logistics MIS har din delivery completion track karta hai.', ['Trailing spaces break the match.', 'Status captured in mixed case.'], ['Data-validate the status column.', 'Normalise text with TRIM.'], 'Excel 2007+'),
  mis('PENDING ORDERS', 'Counts orders still marked Pending.', 'Abhi bhi Pending wale orders count karta hai.', '=COUNTIF(StatusRange,"Pending")', 'Same pattern as delivered orders.', 'Delivered orders jaisa hi pattern hai.', 'B2:B100 contains status values', '=COUNTIF(B2:B100,"Pending")', '5', ['Apply the status filter first.', 'Count the pending status with COUNTIF.', 'Age the pending list with TODAY().'], ['Pehle status filter lagao.', 'Pending status ko COUNTIF se count karo.', 'TODAY() se pending list ki age nikalo.'], 'Operations review pending shipments in the morning huddle.', 'Operations subah ki meeting me pending shipments review karti hai.', ['Pending orders hidden by a stale filter.', 'Status text typed with different case.'], ['Sort oldest pending first.', 'Alert when pending exceeds a threshold.'], 'Excel 2007+'),
  mis('DELIVERY PERCENTAGE', 'Delivered orders as a percentage of total orders.', 'Delivered orders, total orders ka kitna percent hain.', '=(Delivered/Total)*100', 'Divide delivered by total, then express as a percentage.', 'Delivered ko total se divide karke percentage nikaalo.', 'Delivered = 45, Total = 50', '=(A2/B2)*100', '90%', ['Calculate delivered and total counts first.', 'Divide and format the result as a percentage.', 'Wrap with IFERROR for blank days.'], ['Pehle delivered aur total count karo.', 'Divide karke percentage format do.', 'Khali dinon ke liye IFERROR lagao.'], 'MIS dashboard shows delivery SLA compliance.', 'MIS dashboard delivery SLA compliance dikhata hai.', ['Dividing by zero on days with no orders.', 'Formatting as number instead of percentage.'], ['Use IFERROR(result,0) for safety.', 'Round with ROUND for display.'], 'Excel 2007+'),
  mis('TARGET ACHIEVEMENT', 'Achieved amount as a percentage of the sales target.', 'Achieved amount, sales target ka kitna percent hai.', '=(Achieved/Target)*100', 'Divide achieved by the target and format as a percentage.', 'Achieved ko target se divide karke percentage format do.', 'Achieved = 85,000, Target = 1,00,000', '=(A2/B2)*100', '85%', ['Keep achieved and target in comparable units.', 'Divide and format as a percentage.', 'Add conditional formatting thresholds.'], ['Achieved aur target same unit me rakho.', 'Divide karke percentage format do.', 'Conditional formatting ke thresholds lagao.'], 'Sales reviews compare each branch against its monthly target.', 'Sales review har branch ko uske monthly target se compare karta hai.', ['Target left blank causing a divide error.', 'Mixing monthly and annual targets.'], ['Lock the target column with $ references.', 'Show a red flag below 80% with conditional formatting.'], 'Excel 2007+'),
  mis('EMPLOYEE PERFORMANCE', 'Grades employees from a performance score using banded logic.', 'Performance score se employee ka grade banded logic se nikalta hai.', '=IF(Score>=90,"Excellent",IF(Score>=75,"Good","Needs Improvement"))', 'Nested IF checks the highest band first.', 'Nested IF pehle sabse high band check karta hai.', 'A2 = 82 (Score)', '=IF(A2>=90,"Excellent",IF(A2>=75,"Good","Needs Improvement"))', 'Good', ['Decide the bands from highest to lowest.', 'Write nested IFs in that order.', 'Test the boundaries with sample values.'], ['Bands sabse upar se neeche tak decide karo.', 'Usi order me nested IF likho.', 'Boundary values se test karo.'], 'HR appraisal sheets convert scores into grades.', 'HR appraisal sheet scores ko grades me convert karti hai.', ['Bands written lowest first, so top band never triggers.', 'Missing the final default value.'], ['Use IFS for readability in Excel 2019+.', 'Store band cut-offs in lookup cells rather than hard-coding.'], 'Excel 2007+'),
  mis('HIGHEST PERFORMER', 'Finds the name of the employee with the highest score.', 'Sabse zyada score wale employee ka naam dhoondhta hai.', '=INDEX(NameRange,MATCH(MAX(ScoreRange),ScoreRange,0))', 'MAX finds the top score, MATCH locates it, INDEX returns the name.', 'MAX top score nikalta hai, MATCH uski position dhoondta hai, INDEX naam deta hai.', 'A2:A100 names, B2:B100 scores', '=INDEX(A2:A100,MATCH(MAX(B2:B100),B2:B100,0))', 'Employee name', ['Get the maximum score with MAX.', 'Locate its position with MATCH(...,0).', 'Return the name with INDEX.'], ['MAX se sabse zyada score nikalo.', 'MATCH(...,0) se position dhoondo.', 'INDEX se naam return karo.'], 'Monthly awards are announced from the top score.', 'Monthly awards top score se announce hote hain.', ['Tied top scores return only the first match.', 'Name and score ranges of different sizes.'], ['Use FILTER to list all ties in dynamic-array Excel.', 'Keep both ranges the same height.'], 'Excel 2007+'),
  mis('LOWEST PERFORMER', 'Finds the name of the employee with the lowest score.', 'Sabse kam score wale employee ka naam dhoondhta hai.', '=INDEX(NameRange,MATCH(MIN(ScoreRange),ScoreRange,0))', 'MIN finds the bottom score, MATCH finds it, INDEX returns the name.', 'MIN sabse kam score nikalta hai, MATCH dhoondta hai, INDEX naam deta hai.', 'A2:A100 names, B2:B100 scores', '=INDEX(A2:A100,MATCH(MIN(B2:B100),B2:B100,0))', 'Employee name', ['Get the minimum score with MIN.', 'Locate its position with MATCH.', 'Return the name with INDEX.'], ['MIN se sabse kam score nikalo.', 'MATCH se position dhoondo.', 'INDEX se naam lo.'], 'Coaching plans are scheduled for the lowest performer.', 'Lowest performer ke liye coaching plan banaye jate hain.', ['Zero scores from missing data are treated as lowest.'], ['Clean blanks before running MIN.'], 'Excel 2007+'),
  mis('ATTENDANCE PERCENTAGE', 'Present days as a percentage of working days.', 'Present days, working days ka kitna percent hain.', '=PresentDays/WorkingDays', 'Divide present days by working days and format as a percentage.', 'Present days ko working days se divide karke percentage format do.', 'Present = 22, Working days = 25', '=A2/B2', '88%', ['Count working days with NETWORKDAYS or a manual total.', 'Count present days from the attendance register.', 'Divide and format as a percentage.'], ['Working days NETWORKDAYS ya manual total se count karo.', 'Attendance register se present days count karo.', 'Divide karke percentage format do.'], 'HR payroll uses attendance percentage before releasing salary.', 'HR payroll salary release se pehle attendance percentage use karta hai.', ['Holidays treated as absent days.'], ['Pass a holidays range to NETWORKDAYS.', 'Format result as Percentage, not General.'], 'Excel 2007+'),
  mis('WORKING HOURS', 'Calculates hours worked from in-time and out-time.', 'In-time aur out-time se kaam ke ghante nikalta hai.', '=(OutTime-InTime)*24', 'Excel stores time as a fraction of a day, so multiply by 24 for hours.', 'Excel time ko din ka fraction samajhta hai, hours ke liye 24 se multiply karo.', 'A2 = 09:00, B2 = 18:00', '=(B2-A2)*24', '9', ['Enter in and out times as time values.', 'Subtract and multiply by 24.', 'Format the result as Number with decimals.'], ['In aur out time ko time value ke roop me daalo.', 'Subtract karke 24 se multiply karo.', 'Result ko Number format do.'], 'Shift MIS prepares payable hours before overtime is applied.', 'Shift MIS overtime lagane se pehle payable hours banata hai.', ['Shifts crossing midnight produce negative values.', 'Times typed as text.'], ['Add 1 to handle overnight shifts: =(B2-A2+1)*24.', 'Use MOD for overnight shifts as an alternative.'], 'Excel 2007+'),
  mis('OVERTIME', 'Calculates overtime pay from extra hours and the OT rate.', 'Extra hours aur OT rate se overtime pay nikalta hai.', '=OvertimeHours*OvertimeRate', 'Hours multiplied by the approved overtime rate.', 'Approved overtime rate se hours multiply karte hain.', 'OT hours = 5, OT rate = 150', '=A2*B2', '750', ['Calculate payable overtime hours first.', 'Multiply by the approved hourly rate.', 'Total the column for payroll.'], ['Pehle payable overtime hours nikalo.', 'Approved hourly rate se multiply karo.', 'Payroll ke liye column ka total lo.'], 'Payroll adds overtime to the monthly salary sheet.', 'Payroll monthly salary sheet me overtime add karta hai.', ['Overtime below the policy threshold being paid.'], ['Apply a policy cap with MIN(hours, cap).'], 'Excel 2007+'),
  mis('SALARY CALCULATION', 'Builds net salary from earnings and deductions.', 'Earnings aur deductions se net salary banata hai.', '=Basic+HRA+Allowances-Deductions', 'Sum all earnings, then subtract statutory deductions.', 'Saare earnings jodo, phir statutory deductions minus karo.', 'Basic 25,000 + HRA 10,000 + Allow 5,000 - PF 1,800 - Tax 2,000', '=A2+B2+C2-D2-E2', '36,200', ['Keep earnings and deductions in separate blocks.', 'Add earnings and subtract deductions.', 'Cross-check the total against payroll.'], ['Earnings aur deductions alag blocks me rakho.', 'Earnings jodo aur deductions minus karo.', 'Total payroll se cross-check karo.'], 'Monthly salary processing for the whole team.', 'Poori team ki monthly salary processing.', ['Deductions added instead of subtracted.'], ['Use an Excel Table with a totals row.', 'Lock the rate cells.'], 'Excel 2007+'),
  mis('INCENTIVES', 'Pays an incentive only when the sales target is met.', 'Target meet hone par hi incentive deta hai.', '=IF(Sales>=Target,Sales*IncentiveRate,0)', 'The IF checks target achievement before applying the rate.', 'IF pehle target check karta hai, phir rate lagata hai.', 'Sales 1,20,000, Target 1,00,000, Rate 2%', '=IF(A2>=B2,A2*C2,0)', '2400', ['Store the incentive rate as a percentage.', 'Check achievement with IF.', 'Total the incentive column for payroll.'], ['Incentive rate ko percentage me rakho.', 'IF se achievement check karo.', 'Payroll ke liye incentive column total karo.'], 'Sales incentive letters are generated from this column.', 'Sales incentive letter isi column se banate hain.', ['Rate entered as 2 instead of 2%.'], ['Use IFS or a lookup for slab-based incentives.'], 'Excel 2007+'),
  mis('DUPLICATE IDENTIFICATION', 'Flags repeated values in a column.', 'Column me repeat hone wali values ko flag karta hai.', '=COUNTIF($A$2:$A$100,A2)>1', 'COUNTIF counts occurrences; more than one means duplicate.', 'COUNTIF occurrences count karta hai; ek se zyada matlab duplicate.', 'A2:A100 = customer codes', '=COUNTIF($A$2:$A$100,A2)>1', 'TRUE for duplicates', ['Lock the range with $ signs.', 'Use a relative reference for the current cell.', 'Filter the helper column on TRUE.'], ['Range ko $ se lock karo.', 'Current cell ke liye relative reference use karo.', 'Helper column ko TRUE par filter karo.'], 'Master data audits remove duplicate customer records.', 'Master data audit duplicate customer records hatata hai.', ['Unlocked range causes wrong results after copy.'], ['Apply conditional formatting with the same rule.', 'Use UNIQUE in Microsoft 365 to list unique values.'], 'Excel 2007+'),
  mis('MISSING DATA IDENTIFICATION', 'Finds blank cells that should contain data.', 'Un cells ko dhoondhta hai jahan data hona chahiye tha.', '=ISBLANK(A2)', 'ISBLANK returns TRUE only for truly empty cells.', 'ISBLANK sirf sach me khali cells par TRUE deta hai.', 'A2:A100 should all be filled', '=ISBLANK(A2)', 'TRUE for blanks', ['Add a helper column with ISBLANK.', 'Filter on TRUE.', 'Fix the source blanks before reporting.'], ['Helper column me ISBLANK lagao.', 'TRUE par filter karo.', 'Report se pehle source blanks theek karo.'], 'Data quality checks catch missing mandatory fields.', 'Data quality check missing mandatory fields pakadta hai.', ['Cells containing a space are not blank.'], ['Combine with TRIM: =TRIM(A2)="" to catch spaces.'], 'Excel 2007+'),
  mis('DATA CLEANING', 'Standardises messy text with PROPER, TRIM and CLEAN.', 'Messy text ko PROPER, TRIM aur CLEAN se standard karta hai.', '=PROPER(TRIM(CLEAN(A2)))', 'CLEAN removes control characters, TRIM removes extra spaces, PROPER fixes case.', 'CLEAN control characters hatata hai, TRIM extra spaces, PROPER case theek karta hai.', 'A2 = "  john   DOE  "', '=PROPER(TRIM(CLEAN(A2)))', 'John Doe', ['Paste values into a helper column.', 'Apply CLEAN, then TRIM, then PROPER.', 'Copy the cleaned column back as values.'], ['Helper column me values paste karo.', 'CLEAN, TRIM aur PROPER lagao.', 'Cleaned column ko values ke roop me wapas copy karo.'], 'Customer name and address lists are cleaned before mail merge.', 'Mail merge se pehle customer name aur address list clean ki jati hai.', ['Leaving the formula instead of pasting values.'], ['Use SUBSTITUTE for stray symbols such as double spaces.'], 'Excel 2007+'),
  mis('MONTHLY SALES REPORT', 'Sums sales for a chosen month and product with SUMIFS.', 'Chune gaye month aur product ki sales SUMIFS se nikalta hai.', '=SUMIFS(Sales,Month,"Jan",Product,"A")', 'Every criteria pair must match for the row to be included.', 'Include hone ke liye har criteria pair match hona chahiye.', 'Sales, Month and Product columns', '=SUMIFS($C$2:$C$100,$D$2:$D$100,"Jan",$A$2:$A$100,"ProductA")', 'Monthly total', ['Build a small summary table.', 'Reference month and product from the table headers.', 'Lock the source ranges.'], ['Chhota summary table banao.', 'Month aur product table headers se lo.', 'Source ranges lock karo.'], 'Monthly business review packs use this summary table.', 'Monthly business review pack isi summary table ko use karta hai.', ['Month stored as text instead of a date.'], ['Keep a real date column and group with TEXT(date,"mmm").'], 'Excel 2007+'),
  mis('DAILY MIS REPORT', 'Counts today\'s transactions for the daily report.', 'Daily report ke liye aaj ke transactions count karta hai.', '=COUNTIFS(DateRange,TODAY())', 'TODAY() refreshes with the date, so the count rolls forward daily.', 'TODAY() har din update hota hai, isliye count daily aage badhta hai.', 'A2:A100 holds transaction dates', '=COUNTIFS($A$2:$A$100,TODAY())', "Today's count", ['Keep dates as real dates, not text.', 'Use TODAY() as the criteria.', 'Refresh the report each morning.'], ['Dates ko real date rakho, text nahi.', 'Criteria me TODAY() do.', 'Har subah report refresh karo.'], 'The daily operations mail is generated from these counters.', 'Daily operations mail inhi counters se generate hoti hai.', ['Dates imported as text never match TODAY().'], ['Convert text dates with DATEVALUE.'], 'Excel 2007+'),
  mis('MASTER SHEET CREATION', 'Consolidates identically laid out sheets into one master.', 'Same layout wali sheets ko ek master me consolidate karta hai.', '=SUM(Jan:Mar!B2)', 'A 3-D reference sums the same cell across a sheet range.', '3-D reference sheet range me same cell ko sum karta hai.', 'Sheets Jan, Feb, Mar with identical layout', '=SUM(Jan:Mar!B2)', 'Combined value', ['Make every sheet layout identical.', 'Type SUM( then select the sheet range.', 'Click the shared cell and close the bracket.'], ['Har sheet ka layout same rakho.', 'SUM( likhkar sheet range select karo.', 'Shared cell par click karke bracket close karo.'], 'Branchwise sheets roll up into a company master.', 'Branchwise sheets company master me roll up hoti hain.', ['A single reordered column breaks every total.'], ['Use Data > Consolidate for non-identical layouts.', 'Use VSTACK in Microsoft 365 for stacked tables.'], 'Excel 2007+'),
  mis('MULTIPLE SHEET COMPILATION', 'References numbered sheets with INDIRECT.', 'Numbered sheets ko INDIRECT se reference karta hai.', '=INDIRECT("\'Sheet"&ROW()-1&"\'!A1")', 'INDIRECT builds a reference from text and is volatile.', 'INDIRECT text se reference banata hai aur volatile hai.', 'Sheets named Sheet1, Sheet2, Sheet3', '=INDIRECT("\'Sheet"&ROW()-1&"\'!A1")', 'Value from each sheet', ['Name the sheets with a consistent pattern.', 'Build the sheet name from the row number.', 'INDIRECT converts it to a live reference.'], ['Sheets ko consistent pattern se naam do.', 'Row number se sheet name banao.', 'INDIRECT use live reference me convert karta hai.'], 'A template pulls one summary row from dozens of outlet sheets.', 'Template dozens of outlet sheets se ek summary row kheenchta hai.', ['Renaming a sheet breaks the reference silently.', 'Volatile formulas slow large workbooks.'], ['Prefer Power Query or VSTACK for many sheets.', 'Keep sheet names in a helper column.'], 'Excel 2007+'),
  mis('DYNAMIC DASHBOARD KPI', 'Builds an error-safe KPI tile for a dashboard.', 'Dashboard ke liye error-safe KPI tile banata hai.', '=IFERROR(SUMIFS(Amount,Status,"Done"),0)', 'IFERROR returns 0 instead of an error so the tile never breaks.', 'IFERROR error ki jagah 0 deta hai, isliye tile kabhi break nahi hota.', 'Status column with Done/Pending', '=IFERROR(SUMIFS($C$2:$C$100,$E$2:$E$100,"Done"),0)', 'KPI value', ['Decide the KPI aggregation.', 'Wrap it in IFERROR.', 'Link the tile to a number format.'], ['KPI aggregation decide karo.', 'IFERROR me wrap karo.', 'Tile ko number format se link karo.'], 'Executive dashboards stay clean even when source data is incomplete.', 'Executive dashboard source data adhoora hone par bhi clean rehta hai.', ['Hiding a genuine modelling error with IFERROR.'], ['Use IFNA when only lookup misses should be silenced.'], 'Excel 2007+')
];

// ---------- bespoke combination chapters (Book 10) ----------
const COMBO_CHAPTERS = [
  mis('INDEX + MATCH', 'Looks up a value in any direction with INDEX and MATCH.', 'INDEX aur MATCH se kisi bhi direction me lookup karta hai.', '=INDEX(ReturnRange,MATCH(LookupValue,LookupRange,0))', 'MATCH finds the row position and INDEX returns the value from that position.', 'MATCH row position dhoondta hai aur INDEX us position se value deta hai.', 'A2:A10 IDs, C2:C10 values, F2 lookup ID', '=INDEX(C2:C10,MATCH(F2,A2:A10,0))', 'Matched value', ['Write MATCH first and confirm the position.', 'Wrap MATCH inside INDEX for the return column.', 'Lock ranges before copying.'], ['Pehle MATCH likhkar position confirm karo.', 'Return column ke liye INDEX me MATCH wrap karo.', 'Copy se pehle ranges lock karo.'], 'Employee lookup by ID in a wide master sheet.', 'Wide master sheet me employee ko ID se lookup karna.', ['Ranges of different heights return wrong rows.'], ['Use a two-way INDEX with row and column MATCH.', 'Replace with XLOOKUP in Microsoft 365.'], 'Excel 2007+'),
  mis('XLOOKUP + IFERROR', 'Returns a friendly message when XLOOKUP finds nothing.', 'XLOOKUP ko kuch na mile to friendly message deta hai.', '=IFERROR(XLOOKUP(Lookup,LookupArray,ReturnArray),"Not Found")', 'IFERROR catches any lookup error and returns the fallback text.', 'IFERROR koi bhi lookup error pakad ke fallback text deta hai.', 'A2:A10 products, B2:B10 prices, F2 lookup product', '=IFERROR(XLOOKUP(F2,A2:A10,B2:B10),"Not Found")', 'Price or Not Found', ['Write the XLOOKUP first.', 'Wrap it in IFERROR with the message.', 'Copy down the column.'], ['Pehle XLOOKUP likho.', 'IFERROR me wrap karke message do.', 'Column me neeche copy karo.'], 'Price lists shared with dealers never show raw errors.', 'Dealer ko bheji price list kabhi raw error nahi dikhati.', ['M365/2021 required for XLOOKUP.'], ['XLOOKUP already has its own if_not_found argument — use either, not both.', 'Use IFNA to silence only #N/A.'], 'Excel 2021 / Microsoft 365'),
  mis('IF + AND', 'Returns one result only when every condition is true.', 'Sirf tab result deta hai jab saare conditions true hon.', '=IF(AND(Condition1,Condition2),"Pass","Fail")', 'AND returns a single TRUE only if all arguments are true.', 'AND sab arguments true hone par hi TRUE deta hai.', 'A2 = 55, B2 = 60 (minimum 50 each)', '=IF(AND(A2>=50,B2>=50),"Pass","Fail")', 'Pass', ['State each condition separately.', 'Join them with AND inside IF.', 'Test one failure case.'], ['Har condition alag likho.', 'IF ke andar AND se jodo.', 'Ek failure case test karo.'], 'Scholarship eligibility requires marks and attendance.', 'Scholarship eligibility ke liye marks aur attendance dono chahiye.', ['Using commas outside the AND.'], ['Use the multiplication trick in SUMPRODUCT for older Excel.'], 'Excel 2007+'),
  mis('IF + OR', 'Returns one result when any condition is true.', 'Koi bhi condition true hone par result deta hai.', '=IF(OR(Condition1,Condition2),"Bonus","No Bonus")', 'OR returns TRUE if at least one argument is true.', 'OR kam se kam ek argument true hone par TRUE deta hai.', 'A2 = 95, B2 = 60', '=IF(OR(A2>=90,B2>=90),"Bonus","No Bonus")', 'Bonus', ['List the qualifying conditions.', 'Join them with OR inside IF.', 'Confirm the fallback value.'], ['Qualifying conditions list karo.', 'IF ke andar OR se jodo.', 'Fallback value confirm karo.'], 'Either of two sales channels reaching target earns incentive.', 'Do sales channels me se koi ek target reach kare to incentive milta hai.', ['Nesting OR inside AND without brackets.'], ['Wrap each OR group in its own brackets when combining.'], 'Excel 2007+'),
  mis('SUMIFS + DATE', 'Sums amounts between two dates.', 'Do dates ke beech ke amounts sum karta hai.', '=SUMIFS(Amount,DateRange,">="&StartDate,DateRange,"<="&EndDate)', 'The & operator concatenates the comparison with the date value.', '& operator comparison ko date value ke saath jodta hai.', 'Date range A2:A100, amount column C2:C100, F2 start, G2 end', '=SUMIFS($C$2:$C$100,$A$2:$A$100,">="&F2,$A$2:$A$100,"<="&G2)', 'Period total', ['Keep start and end dates as real dates.', 'Use two criteria on the same date column.', 'Concatenate each operator with &.'], ['Start aur end dates real date rakho.', 'Same date column par do criteria lagao.', 'Har operator ko & se jodo.'], 'Week and month MIS totals are driven by a date range picker.', 'Week aur month MIS totals date range picker se bante hain.', ['Dates stored as text return zero.'], ['Verify with ISNUMBER on the date column.'], 'Excel 2007+'),
  mis('COUNTIFS MULTI-CRITERIA', 'Counts rows that satisfy several criteria at once.', 'Ek saath kai criteria satisfy karne wali rows count karta hai.', '=COUNTIFS(Range1,Criteria1,Range2,Criteria2)', 'All criteria pairs are combined with AND logic.', 'Saare criteria pairs AND logic se combine hote hain.', 'A2:A100 region, B2:B100 status', '=COUNTIFS($A$2:$A$100,"East",$B$2:$B$100,"Pending")', 'Matching rows', ['Pair each range with its criteria.', 'Keep all ranges the same height.', 'Add pairs as more conditions are needed.'], ['Har range ko uske criteria ke saath pair karo.', 'Saari ranges ki height same rakho.', 'Aur conditions ke liye pairs badhao.'], 'Regional status trackers count open items per region.', 'Regional status tracker har region ke open items count karta hai.', ['Ranges of mismatched size return #VALUE!.'], ['Reference full columns or an Excel Table.'], 'Excel 2007+'),
  mis('FILTER + SORT', 'Extracts matching rows and sorts them in one formula.', 'Matching rows nikaal ke ek hi formula me sort karta hai.', '=SORT(FILTER(Array,Condition),SortColumn,-1)', 'FILTER returns the matching rows, then SORT orders the spilled result.', 'FILTER matching rows deta hai, phir SORT spilled result ko order karta hai.', 'A2:C100 data, B2:B100 amount', '=SORT(FILTER(A2:C100,B2:B100>1000),3,-1)', 'Sorted filtered rows', ['Write FILTER with the condition.', 'Wrap it in SORT and choose the sort column.', 'Enter once and let the result spill.'], ['FILTER me condition likho.', 'SORT me wrap karke sort column chuno.', 'Ek baar enter karo aur spill hone do.'], 'A live top-orders list that updates the moment data changes.', 'Live top-orders list jo data badalte hi update hoti hai.', ['#SPILL! when the target area is not empty.'], ['Clear the spill area or place the formula on its own sheet.'], 'Excel 2021 / Microsoft 365'),
  mis('UNIQUE + SORT', 'Produces a sorted list of unique values.', 'Unique values ki sorted list banata hai.', '=SORT(UNIQUE(Array))', 'UNIQUE removes repeats, SORT orders what remains.', 'UNIQUE repeats hatata hai, SORT baaki ko order karta hai.', 'A2:A100 vendor names', '=SORT(UNIQUE(A2:A100))', 'Sorted unique vendors', ['Apply UNIQUE to the source column.', 'Wrap it in SORT.', 'Feed the spilled list into a data-validation dropdown.'], ['Source column par UNIQUE lagao.', 'SORT me wrap karo.', 'Spilled list ko data-validation dropdown me use karo.'], 'Vendor dropdowns always show current, deduplicated names.', 'Vendor dropdown hamesha current, deduplicated names dikhata hai.', ['Extra spaces create near-duplicates.'], ['TRIM the source, or use UNIQUE(TRIM(range)).'], 'Excel 2021 / Microsoft 365'),
  mis('TEXTJOIN + IF', 'Joins values that meet a condition into one cell.', 'Condition meet karne wali values ko ek cell me jodta hai.', '=TEXTJOIN(", ",TRUE,IF(ConditionRange="Yes",NameRange,""))', 'IF builds an array of names or blanks; TEXTJOIN ignores the blanks.', 'IF names ya blanks ka array banata hai; TEXTJOIN blanks ignore karta hai.', 'A2:A10 names, B2:B10 attended Yes/No', '=TEXTJOIN(", ",TRUE,IF(B2:B10="Yes",A2:A10,""))', 'Ravi, Amit, Neha', ['Set up the Yes/No flag column.', 'Write IF to return names or empty strings.', 'Wrap in TEXTJOIN and set ignore_empty to TRUE.'], ['Yes/No flag column banao.', 'IF se naam ya empty string do.', 'TEXTJOIN me wrap karke ignore_empty TRUE rakho.'], 'A single cell lists everyone present in a shift.', 'Ek cell me poori shift me present logon ki list aati hai.', ['Older Excel may need Ctrl+Shift+Enter.'], ['Use FILTER + TEXTJOIN in Microsoft 365 for cross-sheet arrays.'], 'Excel 2019 / Microsoft 365'),
  mis('SUMPRODUCT MULTI-CONDITION', 'Sums values matching multiple conditions without SUMIFS.', 'SUMIFS ke bina kai conditions wali values ka sum karta hai.', '=SUMPRODUCT((Range1="East")*(Range2="Apple")*AmountRange)', 'Each condition returns TRUE/FALSE; multiplication acts as AND and coerces values to 1/0.', 'Har condition TRUE/FALSE deti hai; multiply AND ka kaam karta hai aur values ko 1/0 banata hai.', 'A2:A100 region, B2:B100 product, C2:C100 amount', '=SUMPRODUCT((A2:A100="East")*(B2:B100="Apple")*C2:C100)', 'Conditional total', ['Write each condition in brackets.', 'Multiply conditions with the amount range.', 'Keep every range the same height.'], ['Har condition brackets me likho.', 'Conditions ko amount range se multiply karo.', 'Sab ranges ki height same rakho.'], 'Legacy workbooks use it where SUMIFS is unavailable or multiple arrays are needed.', 'Purane workbooks me jahan SUMIFS available nahi ya multiple arrays chahiye wahan use hota hai.', ['Text inside the amount range returns #VALUE!.'], ['Wrap the amount range in N() or clean the data first.'], 'Excel 2007+'),
  mis('DYNAMIC ARRAY COMBINATIONS', 'Chains FILTER, UNIQUE and SORT into one live report.', 'FILTER, UNIQUE aur SORT ko chain karke live report banata hai.', '=SORT(UNIQUE(FILTER(Names,Status="Active")))', 'Each function passes its spilled result to the next one.', 'Har function apna spilled result agle function ko deta hai.', 'A2:A100 names, B2:B100 status', '=SORT(UNIQUE(FILTER(A2:A100,B2:B100="Active")))', 'Sorted active names', ['Start from the innermost FILTER.', 'Wrap with UNIQUE to remove repeats.', 'Wrap with SORT for presentation.'], ['Sabse andar FILTER se shuru karo.', 'UNIQUE se repeats hatao.', 'SORT se presentable banao.'], 'An always-current active-client list on a dashboard.', 'Dashboard par hamesha current active-client list.', ['Large chains slow older machines.'], ['Store intermediate results in LET variables.'], 'Excel 2021 / Microsoft 365')
];

const BOOKS = [
  { file: '01_EXCEL_COMPLETE_BASIC_FORMULAS.pdf', title: 'EXCEL COMPLETE BASIC FORMULAS', subtitle: 'SUM, AVERAGE, COUNT, MAX, MIN & Essential Math Functions | Bilingual Guide',
    ids: ['SUM','AVERAGE','COUNT','COUNTA','COUNTBLANK','MAX','MIN','PRODUCT','ROUND','ROUNDUP','ROUNDDOWN','ABS','INT','MOD','POWER','SQRT'] },
  { file: '02_EXCEL_LOGICAL_FORMULAS.pdf', title: 'EXCEL LOGICAL FORMULAS', subtitle: 'IF, IFS, AND, OR, NOT, XOR, IFERROR, IFNA, SWITCH, TRUE, FALSE | Bilingual Guide',
    ids: ['IF','IFS','AND','OR','NOT','XOR','IFERROR','IFNA','SWITCH','TRUE','FALSE'] },
  { file: '03_EXCEL_TEXT_FORMULAS.pdf', title: 'EXCEL TEXT FORMULAS', subtitle: 'LEFT, RIGHT, MID, LEN, TRIM, CLEAN, CONCAT, TEXTJOIN, FIND, SUBSTITUTE, TEXT & Modern Text Functions | Bilingual Guide',
    ids: ['LEFT','RIGHT','MID','LEN','TRIM','CLEAN','UPPER','LOWER','PROPER','CONCAT','CONCATENATE','TEXTJOIN','FIND','SEARCH','SUBSTITUTE','REPLACE','TEXT','VALUE','TEXTBEFORE','TEXTAFTER','TEXTSPLIT'] },
  { file: '04_EXCEL_DATE_AND_TIME_FORMULAS.pdf', title: 'EXCEL DATE AND TIME FORMULAS', subtitle: 'TODAY, NOW, DATE, TIME, DATEDIF, EDATE, EOMONTH, NETWORKDAYS, WORKDAY, YEARFRAC | Bilingual Guide',
    ids: ['TODAY','NOW','DATE','TIME','DAY','MONTH','YEAR','HOUR','MINUTE','SECOND','DATEDIF','DAYS','EDATE','EOMONTH','NETWORKDAYS','WORKDAY','WEEKDAY','WEEKNUM','YEARFRAC'] },
  { file: '05_EXCEL_LOOKUP_AND_REFERENCE_FORMULAS.pdf', title: 'EXCEL LOOKUP AND REFERENCE FORMULAS', subtitle: 'VLOOKUP, HLOOKUP, XLOOKUP, LOOKUP, INDEX, MATCH, XMATCH, INDEX+MATCH, OFFSET, INDIRECT, CHOOSE, TRANSPOSE | Bilingual Guide',
    ids: ['VLOOKUP','HLOOKUP','XLOOKUP','LOOKUP','INDEX','MATCH','XMATCH','INDEX + MATCH','INDEX + XMATCH','OFFSET','INDIRECT','CHOOSE','TRANSPOSE','ROW','ROWS','COLUMN','COLUMNS','HYPERLINK'] },
  { file: '06_ADVANCED_EXCEL_FORMULAS.pdf', title: 'ADVANCED EXCEL FORMULAS', subtitle: 'FILTER, SORT, UNIQUE, SEQUENCE, LET, LAMBDA, MAP, REDUCE, SCAN, BYROW, BYCOL, MAKEARRAY, GROUPBY, PIVOTBY | Bilingual Guide',
    ids: ['FILTER','SORT','SORTBY','UNIQUE','SEQUENCE','RANDARRAY','TAKE','DROP','CHOOSECOLS','CHOOSEROWS','VSTACK','HSTACK','LET','LAMBDA','MAP','REDUCE','SCAN','BYROW','BYCOL','MAKEARRAY','GROUPBY','PIVOTBY'] },
  { file: '07_EXCEL_CONDITIONAL_AND_STATISTICAL_FORMULAS.pdf', title: 'EXCEL CONDITIONAL & STATISTICAL FORMULAS', subtitle: 'SUMIF/SUMIFS, COUNTIF/COUNTIFS, SUMPRODUCT, LARGE/SMALL, STDEV, CORREL, FORECAST | Bilingual Guide',
    ids: ['SUMIF','SUMIFS','COUNTIF','COUNTIFS','AVERAGEIF','AVERAGEIFS','MAXIFS','MINIFS','SUMPRODUCT','SUBTOTAL','AGGREGATE','MEDIAN','LARGE','SMALL','RANK.EQ','RANK.AVG','STDEV.S','STDEV.P','VAR.S','VAR.P','CORREL','FORECAST.LINEAR'] },
  { file: '08_EXCEL_FINANCIAL_AND_INFORMATION_FUNCTIONS.pdf', title: 'EXCEL FINANCIAL & INFORMATION FUNCTIONS', subtitle: 'PMT, IPMT, PPMT, FV, PV, NPV, IRR, XIRR, RATE, NPER, ISBLANK, ISNUMBER, TYPE, CELL & More | Bilingual Guide',
    ids: ['PMT','IPMT','PPMT','FV','PV','NPV','XNPV','IRR','XIRR','RATE','NPER','ISBLANK','ISNUMBER','ISTEXT','ISERROR','ISNA','ISFORMULA','TYPE','CELL','ERROR.TYPE'] },
  { file: '09_COMPLETE_MIS_EXECUTIVE_FORMULA_HANDBOOK.pdf', title: 'COMPLETE MIS EXECUTIVE FORMULA HANDBOOK', subtitle: 'Practical Office Calculations, MIS Reports, Dashboards & Payroll | Bilingual Guide', bespoke: MIS_CHAPTERS },
  { file: '10_EXCEL_FORMULA_COMBINATION_MASTER_GUIDE.pdf', title: 'EXCEL FORMULA COMBINATION MASTER GUIDE', subtitle: 'INDEX+MATCH, XLOOKUP+IFERROR, IF+AND/OR, SUMIFS+DATE, FILTER+SORT, SUMPRODUCT & Dynamic Arrays | Bilingual Guide', bespoke: COMBO_CHAPTERS }
];

const byId = loadLibrary();
const books = BOOKS.map(b => {
  const items = b.bespoke ? b.bespoke : chapters(b.ids, byId);
  if (!b.bespoke && items.length !== b.ids.length) {
    throw new Error(b.file + ' resolved ' + items.length + ' of ' + b.ids.length + ' chapters');
  }
  return { file: b.file, title: b.title, subtitle: b.subtitle, items };
});

module.exports = books;

if (require.main === module) {
  books.forEach(b => console.log(String(b.items.length).padStart(2) + '  ' + b.file));
}

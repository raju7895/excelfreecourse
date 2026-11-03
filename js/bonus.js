/* ================= BONUS – Premium Excel Resources =================
   Frontend-only access gate. This is a CONVENIENCE feature, NOT strong
   security: the password lives in client-side code and can be discovered
   through browser Developer Tools. If genuine secure access is required,
   it will need server-side authentication in the future.
   Verification is remembered for the current browser session only
   (sessionStorage), so the password is asked again after the tab/browser
   is closed.
   ================================================================== */

var BONUS_PASSWORD = "BAJPAIBUILD00";
var BONUS_SESSION_KEY = "emi_bonus_unlocked";

var BONUS_PDFS = [
  {
    num: "01", file: "01_EXCEL_COMPLETE_BASIC_FORMULAS.pdf",
    title: "Excel Complete Basic Formulas",
    desc: "SUM, AVERAGE, COUNT, COUNTA, COUNTBLANK, MAX, MIN, PRODUCT, ROUND, ROUNDUP, ROUNDDOWN, ABS, INT, MOD, POWER, SQRT with datasets, steps and office examples.",
    formulas: ["SUM","AVERAGE","COUNT","COUNTA","COUNTBLANK","MAX","MIN","PRODUCT","ROUND","ROUNDUP","ROUNDDOWN","ABS","INT","MOD","POWER","SQRT"],
    level: "Basic", size: "34 KB", topics: 16, version: "Excel 2007+", tag: "basic"
  },
  {
    num: "02", file: "02_EXCEL_LOGICAL_FORMULAS.pdf",
    title: "Excel Logical Formulas",
    desc: "IF, IFS, AND, OR, NOT, XOR, IFERROR, IFNA, SWITCH, TRUE and FALSE — build decisions, grades, eligibility and clean error-free reports.",
    formulas: ["IF","IFS","AND","OR","NOT","XOR","IFERROR","IFNA","SWITCH","TRUE","FALSE"],
    level: "Intermediate", size: "24 KB", topics: 11, version: "Excel 2007+ to Microsoft 365", tag: "intermediate"
  },
  {
    num: "03", file: "03_EXCEL_TEXT_FORMULAS.pdf",
    title: "Excel Text Formulas",
    desc: "LEFT, RIGHT, MID, LEN, TRIM, CLEAN, UPPER, LOWER, PROPER, CONCAT, CONCATENATE, TEXTJOIN, FIND, SEARCH, SUBSTITUTE, REPLACE, TEXT, VALUE, TEXTBEFORE, TEXTAFTER, TEXTSPLIT.",
    formulas: ["LEFT","RIGHT","MID","LEN","TRIM","CLEAN","UPPER","LOWER","PROPER","CONCAT","CONCATENATE","TEXTJOIN","FIND","SEARCH","SUBSTITUTE","REPLACE","TEXT","VALUE","TEXTBEFORE","TEXTAFTER","TEXTSPLIT"],
    level: "Intermediate", size: "43 KB", topics: 21, version: "Excel 2007+ to Microsoft 365", tag: "intermediate"
  },
  {
    num: "04", file: "04_EXCEL_DATE_AND_TIME_FORMULAS.pdf",
    title: "Excel Date and Time Formulas",
    desc: "TODAY, NOW, DATE, TIME, DAY, MONTH, YEAR, HOUR, MINUTE, SECOND, DATEDIF, DAYS, EDATE, EOMONTH, NETWORKDAYS, WORKDAY, WEEKDAY, WEEKNUM, YEARFRAC.",
    formulas: ["TODAY","NOW","DATE","TIME","DAY","MONTH","YEAR","HOUR","MINUTE","SECOND","DATEDIF","DAYS","EDATE","EOMONTH","NETWORKDAYS","WORKDAY","WEEKDAY","WEEKNUM","YEARFRAC"],
    level: "Intermediate", size: "39 KB", topics: 19, version: "Excel 2007+", tag: "intermediate"
  },
  {
    num: "05", file: "05_EXCEL_LOOKUP_AND_REFERENCE_FORMULAS.pdf",
    title: "Excel Lookup and Reference Formulas",
    desc: "VLOOKUP, HLOOKUP, XLOOKUP, LOOKUP, INDEX, MATCH, XMATCH, INDEX+MATCH, INDEX+XMATCH, OFFSET, INDIRECT, CHOOSE, TRANSPOSE, ROW, ROWS, COLUMN, COLUMNS, HYPERLINK.",
    formulas: ["VLOOKUP","HLOOKUP","XLOOKUP","LOOKUP","INDEX","MATCH","XMATCH","INDEX+MATCH","INDEX+XMATCH","OFFSET","INDIRECT","CHOOSE","TRANSPOSE","ROW","ROWS","COLUMN","COLUMNS","HYPERLINK"],
    level: "Advanced", size: "39 KB", topics: 18, version: "Excel 2007+ to Microsoft 365", tag: "advanced"
  },
  {
    num: "06", file: "06_ADVANCED_EXCEL_FORMULAS.pdf",
    title: "Advanced Excel Formulas (Dynamic Arrays)",
    desc: "FILTER, SORT, SORTBY, UNIQUE, SEQUENCE, RANDARRAY, TAKE, DROP, CHOOSECOLS, CHOOSEROWS, VSTACK, HSTACK, LET, LAMBDA, MAP, REDUCE, SCAN, BYROW, BYCOL, MAKEARRAY, GROUPBY, PIVOTBY.",
    formulas: ["FILTER","SORT","SORTBY","UNIQUE","SEQUENCE","RANDARRAY","TAKE","DROP","CHOOSECOLS","CHOOSEROWS","VSTACK","HSTACK","LET","LAMBDA","MAP","REDUCE","SCAN","BYROW","BYCOL","MAKEARRAY","GROUPBY","PIVOTBY"],
    level: "Expert", size: "54 KB", topics: 22, version: "Excel 2021 / Microsoft 365", tag: "expert"
  },
  {
    num: "07", file: "07_EXCEL_CONDITIONAL_AND_STATISTICAL_FORMULAS.pdf",
    title: "Excel Conditional & Statistical Formulas",
    desc: "SUMIF, SUMIFS, COUNTIF, COUNTIFS, AVERAGEIF, AVERAGEIFS, MAXIFS, MINIFS, SUMPRODUCT, SUBTOTAL, AGGREGATE, MEDIAN, LARGE, SMALL, RANK.EQ, RANK.AVG, STDEV.S, STDEV.P, VAR.S, VAR.P, CORREL, FORECAST.LINEAR.",
    formulas: ["SUMIF","SUMIFS","COUNTIF","COUNTIFS","AVERAGEIF","AVERAGEIFS","MAXIFS","MINIFS","SUMPRODUCT","SUBTOTAL","AGGREGATE","MEDIAN","LARGE","SMALL","RANK.EQ","RANK.AVG","STDEV.S","STDEV.P","VAR.S","VAR.P","CORREL","FORECAST.LINEAR"],
    level: "Advanced", size: "46 KB", topics: 22, version: "Excel 2007+ to Microsoft 365", tag: "advanced"
  },
  {
    num: "08", file: "08_EXCEL_FINANCIAL_AND_INFORMATION_FUNCTIONS.pdf",
    title: "Excel Financial & Information Functions",
    desc: "PMT, IPMT, PPMT, FV, PV, NPV, XNPV, IRR, XIRR, RATE, NPER, ISBLANK, ISNUMBER, ISTEXT, ISERROR, ISNA, ISFORMULA, TYPE, CELL, ERROR.TYPE.",
    formulas: ["PMT","IPMT","PPMT","FV","PV","NPV","XNPV","IRR","XIRR","RATE","NPER","ISBLANK","ISNUMBER","ISTEXT","ISERROR","ISNA","ISFORMULA","TYPE","CELL","ERROR.TYPE"],
    level: "Advanced", size: "46 KB", topics: 20, version: "Excel 2007+ to Microsoft 365", tag: "advanced"
  },
  {
    num: "09", file: "09_COMPLETE_MIS_EXECUTIVE_FORMULA_HANDBOOK.pdf",
    title: "Complete MIS Executive Formula Handbook",
    desc: "Practical office calculations: gross/net sales, orders, delivery %, target achievement, performance, attendance, working hours, overtime, salary, incentives, duplicates, missing data, data cleaning, monthly/daily MIS, master sheets and dashboards.",
    formulas: ["GROSS SALES","NET SALES","TOTAL ORDERS","DELIVERED ORDERS","PENDING ORDERS","DELIVERY %","TARGET ACHIEVEMENT","EMPLOYEE PERFORMANCE","ATTENDANCE %","WORKING HOURS","OVERTIME","SALARY","INCENTIVES","DUPLICATE CHECK","MISSING DATA","DATA CLEANING","MONTHLY MIS","DAILY MIS","MASTER SHEET","MULTI-SHEET COMPILATION","DASHBOARD"],
    level: "MIS Executive", size: "52 KB", topics: 22, version: "Excel 2007+", tag: "mis"
  },
  {
    num: "10", file: "10_EXCEL_FORMULA_COMBINATION_MASTER_GUIDE.pdf",
    title: "Excel Formula Combination Master Guide",
    desc: "INDEX+MATCH, XLOOKUP+IFERROR, IF+AND, IF+OR, SUMIFS+DATE, COUNTIFS multi-criteria, FILTER+SORT, UNIQUE+SORT, TEXTJOIN+IF, INDEX+MATCH multi-criteria, SUMPRODUCT multi-conditions, dynamic array combos.",
    formulas: ["INDEX+MATCH","XLOOKUP+IFERROR","IF+AND","IF+OR","SUMIFS+DATE","COUNTIFS","FILTER+SORT","UNIQUE+SORT","TEXTJOIN+IF","INDEX+MATCH+MULTI","SUMPRODUCT+MULTI","DYNAMIC ARRAYS"],
    level: "Expert", size: "27 KB", topics: 12, version: "Excel 2007+ to Microsoft 365", tag: "expert"
  }
];

var BONUS_FILTERS = [
  { id: "all", label: "All PDFs" },
  { id: "basic", label: "Basic" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "expert", label: "Expert" },
  { id: "mis", label: "MIS Executive" }
];

var bonusActiveFilter = "all";

function bonusEls() {
  return {
    gate: document.getElementById("bonusGate"),
    library: document.getElementById("bonusLibrary"),
    form: document.getElementById("bonusGateForm"),
    password: document.getElementById("bonusPassword"),
    toggle: document.getElementById("bonusTogglePass"),
    eyeOpen: document.getElementById("bonusEyeOpen"),
    eyeClosed: document.getElementById("bonusEyeClosed"),
    unlock: document.getElementById("bonusUnlockBtn"),
    error: document.getElementById("bonusError"),
    search: document.getElementById("bonusSearch"),
    searchClear: document.getElementById("bonusSearchClear"),
    filters: document.getElementById("bonusFilters"),
    count: document.getElementById("bonusCount"),
    grid: document.getElementById("bonusGrid"),
    empty: document.getElementById("bonusEmpty"),
    lockBtn: document.getElementById("bonusLockBtn")
  };
}

function bonusIsUnlocked() {
  try { return sessionStorage.getItem(BONUS_SESSION_KEY) === "1"; } catch (e) { return false; }
}

function bonusSetUnlocked(v) {
  try {
    if (v) { sessionStorage.setItem(BONUS_SESSION_KEY, "1"); }
    else { sessionStorage.removeItem(BONUS_SESSION_KEY); }
  } catch (e) { /* sessionStorage unavailable; keep in-memory default (locked) */ }
}

function bonusShowState() {
  var els = bonusEls();
  var unlocked = bonusIsUnlocked();
  if (els.gate) els.gate.hidden = unlocked;
  if (els.library) els.library.hidden = !unlocked;
  if (unlocked) { bonusRenderFilters(); bonusRenderGrid(); }
}

function bonusEscape(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function bonusLevelClass(level) {
  var l = String(level || "").toLowerCase();
  if (l === "basic") return "badge-basic";
  if (l === "intermediate") return "badge-intermediate";
  if (l === "advanced") return "badge-advanced";
  if (l === "expert") return "badge-expert";
  return "badge-m365"; // MIS Executive gets a distinct highlight
}

function bonusPdfMatches(pdf, query) {
  if (bonusActiveFilter !== "all" && pdf.tag !== bonusActiveFilter) { return false; }
  if (!query) { return true; }
  var hay = (pdf.title + " " + pdf.desc + " " + pdf.level + " " + pdf.formulas.join(" ") + " " + pdf.num).toLowerCase();
  var tokens = query.toLowerCase().split(/[^a-z0-9+.]+/).filter(Boolean);
  for (var i = 0; i < tokens.length; i++) {
    if (hay.indexOf(tokens[i]) === -1) { return false; }
  }
  return true;
}

function bonusFiltered() {
  var els = bonusEls();
  var q = els.search ? (els.search.value || "").trim() : "";
  var out = [];
  for (var i = 0; i < BONUS_PDFS.length; i++) {
    if (bonusPdfMatches(BONUS_PDFS[i], q)) { out.push(BONUS_PDFS[i]); }
  }
  return out;
}

function bonusRenderFilters() {
  var els = bonusEls();
  if (!els.filters) { return; }
  var html = "";
  for (var i = 0; i < BONUS_FILTERS.length; i++) {
    var f = BONUS_FILTERS[i];
    html += '<button type="button" class="bonus-chip' + (bonusActiveFilter === f.id ? " active" : "") + '" data-bonus-filter="' + f.id + '">' + f.label + "</button>";
  }
  els.filters.innerHTML = html;
}

function bonusRenderGrid() {
  var els = bonusEls();
  if (!els.grid) { return; }
  var list = bonusFiltered();
  var html = "";
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    html += '<article class="bonus-card" data-bonus-num="' + bonusEscape(p.num) + '">';
    html += '<div class="bonus-card-top">';
    html += '<span class="bonus-pdf-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg> PDF ' + bonusEscape(p.num) + "</span>";
    html += '<span class="badge ' + bonusLevelClass(p.level) + '">' + bonusEscape(p.level) + "</span>";
    html += "</div>";
    html += '<h3 class="bonus-card-title">' + bonusEscape(p.title) + "</h3>";
    html += '<p class="bonus-card-desc">' + bonusEscape(p.desc) + "</p>";
    html += '<div class="bonus-card-meta">';
    html += '<span class="bonus-meta"><b>' + p.topics + '</b> topics covered</span>';
    html += '<span class="bonus-meta"><b>' + bonusEscape(p.size) + '</b> PDF size</span>';
    html += '<span class="bonus-meta"><b>EN + Roman Hindi</b> languages</span>';
    html += '<span class="bonus-meta"><b>Version:</b> ' + bonusEscape(p.version) + "</span>";
    html += "</div>";
    html += '<div class="bonus-card-foot">';
    html += '<a class="btn btn-primary bonus-download" href="assets/bonus-pdfs/' + encodeURIComponent(p.file) + '" download="' + bonusEscape(p.file) + '" aria-label="Download ' + bonusEscape(p.title) + ' PDF"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="M7 10l5 5 5-5"></path><path d="M12 15V3"></path></svg> Download PDF</a>';
    html += '<span class="bonus-topics-count">' + bonusEscape(p.topics) + " topics</span>";
    html += "</div>";
    html += "</article>";
  }
  els.grid.innerHTML = html;
  if (els.empty) els.empty.hidden = list.length !== 0;
  if (els.count) els.count.textContent = list.length + " of " + BONUS_PDFS.length + " PDFs";
}

function bonusUnlock() {
  var els = bonusEls();
  var entered = els.password ? (els.password.value || "") : "";
  if (entered === BONUS_PASSWORD) {
    bonusSetUnlocked(true);
    if (els.error) els.error.hidden = true;
    if (els.password) els.password.value = "";
    bonusShowState();
    if (typeof showToast === "function") { showToast("BONUS resources unlocked."); }
  } else {
    if (els.error) els.error.hidden = false;
    if (els.password) { els.password.focus(); els.password.select(); }
  }
}

function bonusLock() {
  bonusSetUnlocked(false);
  var els = bonusEls();
  if (els.search) els.search.value = "";
  bonusActiveFilter = "all";
  bonusShowState();
  if (typeof showToast === "function") { showToast("BONUS resources locked."); }
}

(function initBonus() {
  var els = bonusEls();
  if (els.form) {
    els.form.addEventListener("submit", function (e) {
      e.preventDefault();
      bonusUnlock();
    });
  }
  if (els.toggle) {
    els.toggle.addEventListener("click", function () {
      if (!els.password) { return; }
      var showing = els.password.type === "text";
      els.password.type = showing ? "password" : "text";
      if (els.eyeOpen) els.eyeOpen.style.display = showing ? "" : "none";
      if (els.eyeClosed) els.eyeClosed.style.display = showing ? "none" : "";
    });
  }
  if (els.password) {
    els.password.addEventListener("input", function () {
      if (els.error) els.error.hidden = true;
    });
  }
  if (els.search) {
    els.search.addEventListener("input", function () {
      if (els.searchClear) els.searchClear.classList.toggle("visible", (els.search.value || "").length > 0);
      bonusRenderGrid();
    });
  }
  if (els.searchClear) {
    els.searchClear.addEventListener("click", function () {
      if (els.search) { els.search.value = ""; els.search.focus(); }
      els.searchClear.classList.remove("visible");
      bonusRenderGrid();
    });
  }
  if (els.filters) {
    els.filters.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-bonus-filter]") : null;
      if (!btn) { return; }
      bonusActiveFilter = btn.getAttribute("data-bonus-filter") || "all";
      bonusRenderFilters();
      bonusRenderGrid();
    });
  }
  if (els.lockBtn) {
    els.lockBtn.addEventListener("click", bonusLock);
  }
  bonusShowState();
})();


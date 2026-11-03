"use strict";

const LANG_KEY = "emi_lang";
const FAV_KEY = "emi_favs";
const PROG_KEY = "emi_prog";

let lang = localStorage.getItem(LANG_KEY) || "en";
let favs = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
let prog = JSON.parse(localStorage.getItem(PROG_KEY) || "{}");
let levelFilter = "All";
let activeCat = null;
let currentTestLevel = "Beginner";
let currentTestAnswers = {};
let aiOpen = false;
let aiMessages = [];
let aiLang = "en";
let helpOpen = false;
let welcomeOpen = false;
let recent = [];
let recentOpen = false;
let recentSearches = [];
try { recentSearches = JSON.parse(localStorage.getItem("emi_searches") || "[]"); } catch (e) { recentSearches = []; }
const RECENT_KEY = "emi_recent";
const SEARCH_KEY = "emi_searches";
const WELCOME_KEY = "emi_welcome"; // intentionally unused - welcome auto-open disabled

const UI_TEXT = {
  searchPlaceholder: "Search formulas like SUM, VLOOKUP, IF, XLOOKUP...",
  progress: "Progress",
  resultsFor: "results found",
  noResults: "No formulas found. Try another keyword.",
  all: "All",
  details: "Details",
  favourite: "Favourite",
  copy: "Copy Formula",
  copied: "Copied!",
  complete: "Complete",
  completed: "Completed",
  openPlayground: "Playground",
  purpose: "Purpose",
  syntax: "Syntax",
  expectedOutput: "Expected Output",
  actualFormula: "Actual Formula",
  category: "Category",
  difficulty: "Difficulty Level",
  exampleDataset: "Example Dataset",
  steps: "Step-by-Step",
  officeExample: "Real Office Example",
  commonMistakes: "Common Mistakes",
  importantTips: "Important Tips",
  versionCompat: "Excel Version Compatibility",
  version: "Version",
  m365Required: "Microsoft 365 / Excel 2021 or newer required",
  worksIn: "Works in Excel 2007 and later",
  copyFailed: "Copy failed",
  welcomeTitle: "Welcome to Excel Master Index",
  welcomeStep1: "Search",
  welcomeStep1d: "Find any formula or office task instantly.",
  welcomeStep2: "Learn",
  welcomeStep2d: "Open a formula card for syntax, dataset and steps.",
  welcomeStep3: "Practice",
  welcomeStep3d: "Use the playground and practice tests.",
  welcomeStep4: "Teach",
  welcomeStep4d: "Ask the AI Instructor for a guided solution.",
  welcomeCta: "Start Learning",
  welcomeClose: "Close",
  helpTitle: "Help & Support",
  helpBody: "Welcome to Excel Master Index – Basic to Advanced.",
  helpGettingStarted: "Getting Started",
  helpGs1: "Use the search bar to find a formula by name, keyword, or office task.",
  helpGs2: "Open any formula card to read purpose, syntax, dataset, steps and office use.",
  helpGs3: "Use the Interactive Playground to change sample inputs and see live output.",
  helpGs4: "Star formulas to save them as bookmarks.",
  helpGs5: "Switch language using the language button in the top bar.",
  helpShortcuts: "Keyboard Shortcuts",
  helpSc1: "Enter in search: open top result.",
  helpSc2: "Esc in search/instructor: close panel or clear.",
  helpSc3: "Up / Down in search: move between results.",
  helpWelcome: "Show Welcome Guide",
  aiIntro: "Hello! I am your Excel Instructor. Tell me about your spreadsheet problem and I will guide you step by step.",
  aiYou: "You",
  aiCopy: "Copy",
  aiCopied: "Copied!",
  aiFeedback: "Was this helpful?",
  aiYes: "Yes",
  aiNo: "No",
  aiThanks: "Thanks for the feedback.",
  aiClear: "Clear conversation",
  aiTyping: "Instructor is typing",
  recentEmpty: "No recently viewed formulas yet.",
  recentEmptyHint: "Open a formula to add it here.",
  recentTitle: "Recently Viewed",
  bestMatch: "Best Match",
  formulaResults: "Formula Results",
  practicalSolutions: "Practical Solutions",
  relatedTopics: "Related Topics",
  noResults: "No formulas found. Try another keyword.",
  recentSearched: "Recently Searched",
  clear: "Clear",
  relatedFormulas: "Related Formulas",
  bookmarksEmpty: "No bookmarks yet.",
  bookmarksEmptyHint: "Star any formula to save it here.",
  openGuide: "Open",
  remove: "Remove",
  recentSearchEmpty: "No recent searches yet. Try VLOOKUP, IF, attendance or duplicate.",
  searchAgain: "Search again"
};

function t(key) {
  if (key === "searchPlaceholder") return UI_TEXT.searchPlaceholder;
  if (key === "progress") return UI_TEXT.progress;
  if (key === "resultsFor") return UI_TEXT.resultsFor;
  if (key === "noResults") return UI_TEXT.noResults;
  if (key === "all") return UI_TEXT.all;
  if (key === "details") return UI_TEXT.details;
  if (key === "favourite") return UI_TEXT.favourite;
  if (key === "copy") return UI_TEXT.copy;
  if (key === "copied") return UI_TEXT.copied;
  if (key === "complete") return UI_TEXT.complete;
  if (key === "completed") return UI_TEXT.completed;
  if (key === "openPlayground") return UI_TEXT.openPlayground;
  if (key === "purpose") return UI_TEXT.purpose;
  if (key === "syntax") return UI_TEXT.syntax;
  if (key === "expectedOutput") return UI_TEXT.expectedOutput;
  if (key === "actualFormula") return UI_TEXT.actualFormula;
  if (key === "category") return UI_TEXT.category;
  if (key === "difficulty") return UI_TEXT.difficulty;
  if (key === "exampleDataset") return UI_TEXT.exampleDataset;
  if (key === "steps") return UI_TEXT.steps;
  if (key === "officeExample") return UI_TEXT.officeExample;
  if (key === "commonMistakes") return UI_TEXT.commonMistakes;
  if (key === "importantTips") return UI_TEXT.importantTips;
  if (key === "versionCompat") return UI_TEXT.versionCompat;
  if (key === "version") return UI_TEXT.version;
  if (key === "m365Required") return UI_TEXT.m365Required;
  if (key === "worksIn") return UI_TEXT.worksIn;
  if (key === "copyFailed") return UI_TEXT.copyFailed;
  if (key === "welcomeTitle") return UI_TEXT.welcomeTitle;
  if (key === "welcomeCta") return UI_TEXT.welcomeCta;
  if (key === "helpTitle") return UI_TEXT.helpTitle;
  if (key === "helpWelcome") return UI_TEXT.helpWelcome;
  if (key === "aiIntro") return UI_TEXT.aiIntro;
  if (key === "aiYou") return UI_TEXT.aiYou;
  if (key === "aiCopy") return UI_TEXT.aiCopy;
  if (key === "aiCopied") return UI_TEXT.aiCopied;
  if (key === "aiFeedback") return UI_TEXT.aiFeedback;
  if (key === "aiYes") return UI_TEXT.aiYes;
  if (key === "aiNo") return UI_TEXT.aiNo;
  if (key === "aiThanks") return UI_TEXT.aiThanks;
  if (key === "aiClear") return UI_TEXT.aiClear;
  if (key === "aiTyping") return UI_TEXT.aiTyping;
  if (key === "recentEmpty") return UI_TEXT.recentEmpty;
  if (key === "recentTitle") return UI_TEXT.recentTitle;
  if (key === "recentEmptyHint") return UI_TEXT.recentEmptyHint;
  if (key === "bestMatch") return UI_TEXT.bestMatch;
  if (key === "formulaResults") return UI_TEXT.formulaResults;
  if (key === "practicalSolutions") return UI_TEXT.practicalSolutions;
  if (key === "relatedTopics") return UI_TEXT.relatedTopics;
  if (key === "recentSearched") return UI_TEXT.recentSearched;
  if (key === "clear") return UI_TEXT.clear;
  if (key === "relatedFormulas") return UI_TEXT.relatedFormulas;
  if (key === "bookmarksEmpty") return UI_TEXT.bookmarksEmpty;
  if (key === "bookmarksEmptyHint") return UI_TEXT.bookmarksEmptyHint;
  if (key === "openGuide") return UI_TEXT.openGuide;
  if (key === "remove") return UI_TEXT.remove;
  if (key === "recentSearchEmpty") return UI_TEXT.recentSearchEmpty;
  if (key === "searchAgain") return UI_TEXT.searchAgain;
  if (key === "noResults") return UI_TEXT.noResults;
  return key;
}

function tx(obj) {
  if (!obj) return "";
  var en = obj.en !== undefined ? obj.en : (obj.titleEn !== undefined ? obj.titleEn : (obj.q !== undefined ? obj.q : ""));
  var hi = obj.hi !== undefined ? obj.hi : (obj.titleHi !== undefined ? obj.titleHi : (obj.explainHi !== undefined ? obj.explainHi : ""));
  if (lang === "hi") return hi || en;
  return en;
}

function flat(arr) {
  if (!arr) return [];
  let out = [];
  arr.forEach(function (x) { if (Array.isArray(x)) out = out.concat(flat(x)); else out.push(String(x)); });
  return out;
}

function esc(s) {
  return String(s === null || s === undefined ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function catById(id) { for (let i = 0; i < CATEGORIES.length; i++) { if (CATEGORIES[i].id === id) return CATEGORIES[i]; } return null; }

function getFormula(id) { for (let i = 0; i < FORMULAS.length; i++) { if (FORMULAS[i].id === id) return FORMULAS[i]; } return null; }

const FORMULAS = [
  ...F01, ...F25,
  ...F26,
  ...F03, ...F04, ...F05,
  ...F06, ...F07, ...F08,
  ...F09, ...F10, ...F11,
  ...F12, ...F13,
  ...F14, ...F15,
  ...F16, ...F17,
  ...F18,
  ...F19, ...F20,
  ...F21,
  ...F22, ...F23, ...F24,
  ...F28
];

function levelClass(level) { return level ? level.toLowerCase() : "basic"; }

function levelBadgeHTML(f) {
  var lv = f.level || "Basic";
  var m365 = f.m365 ? '<span class="badge badge-m365">Microsoft 365</span>' : "";
  return '<span class="badge badge-' + levelClass(lv) + '">' + lv + "</span>" + m365;
}

/* ---------------- Copy helper ---------------- */
function copyText(text) {
  function legacyCopy() {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return Promise.resolve(!!ok);
    } catch (e) { return Promise.resolve(false); }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () { return legacyCopy(); });
  }
  return legacyCopy();
}

/* ---------------- Formula card ---------------- */
function formulaCardHTML(f, catTitle) {
  var purpose = tx(f.purpose);
  var fav = favs.indexOf(f.id) !== -1;
  var done = !!prog[f.id];
  var cat = catById(f.category);
  var rels = getRelated(f);
  var detail = "";
  detail += '<div class="fc-detail">';
  detail += '<div class="breadcrumb fc-breadcrumb"><a href="#cat-' + esc(f.category) + '" data-cat-link="' + esc(f.category) + '">' + esc(cat ? tx(cat) : f.category) + '</a><span aria-hidden="true">/</span><span class="bc-cur">' + esc(f.name) + "</span></div>";
  detail += '<div class="detail-grid">';
  detail += '<div class="detail-item"><h5>' + t("category") + '</h5><p>' + esc(catTitle) + '</p></div>';
  detail += '<div class="detail-item"><h5>' + t("difficulty") + '</h5><p>' + esc(f.level) + "</p></div>";
  detail += '<div class="detail-item"><h5>' + t("purpose") + ' – English</h5><p>' + esc(f.purpose.en) + '</p><p><b>Hindi (Roman):</b> ' + esc(f.purpose.hi) + "</p></div>";
  detail += '<div class="detail-item"><h5>' + t("syntax") + '</h5><pre class="code">' + esc(f.syntax.en) + "</pre></div>";
  detail += '<div class="detail-item"><h5>' + t("syntax") + ' – Hindi</h5><pre class="code">' + esc(f.syntax.hi) + "</pre></div>";
  detail += '<div class="detail-item"><h5>' + t("syntax") + ' – Explanation</h5><p>' + esc(f.explain.en) + "</p><p><b>Hindi:</b> " + esc(f.explain.hi) + "</p></div>";
  detail += '<div class="detail-item"><h5>' + t("exampleDataset") + '</h5><p>Cells: ' + esc(f.dataset.cells) + "</p><p>Values: " + esc(f.dataset.values) + "</p></div>";
  detail += '<div class="detail-item"><h5>' + t("actualFormula") + '</h5><pre class="code">' + esc(f.formula) + "</pre></div>";
  detail += '<div class="detail-item"><h5>' + t("expectedOutput") + '</h5><p><b>' + esc(f.output) + "</b></p></div>";
  detail += '<div class="detail-item"><h5>' + t("steps") + ' – English</h5><ul>' + flat(f.steps.en).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
  detail += '<div class="detail-item"><h5>' + t("steps") + ' – Hindi (Roman)</h5><ul>' + flat(f.steps.hi).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
  detail += '<div class="detail-item"><h5>' + t("officeExample") + '</h5><p>' + esc(f.office.en) + "</p><p><b>Hindi:</b> " + esc(f.office.hi) + "</p></div>";
  detail += '<div class="detail-item"><h5>' + t("commonMistakes") + '</h5><ul>' + flat(f.mistakes.en).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul><ul>" + flat(f.mistakes.hi).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
  detail += '<div class="detail-item"><h5>' + t("importantTips") + '</h5><ul>' + flat(f.tips.en).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul><ul>" + flat(f.tips.hi).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
  detail += '<div class="detail-item"><h5>' + t("versionCompat") + '</h5><p>' + esc(f.version) + "</p><p>" + (f.m365 ? esc(UI_TEXT.m365Required) : esc(UI_TEXT.worksIn)) + "</p></div>";
  detail += "</div>";
  if (rels && rels.length) {
    var relHtml = "";
    for (var ri = 0; ri < rels.length; ri++) {
      var rff = getFormula(rels[ri]);
      if (!rff) { continue; }
      relHtml += '<button class="related-btn" type="button" data-related-fid="' + esc(rff.id) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>' + esc(rff.name) + "</button>";
    }
    detail += '<div class="related-block"><h5>' + t("relatedFormulas") + '</h5><div class="related-row">' + relHtml + "</div></div>";
  }
  detail += "</div>";

  var head = "";
  head += '<div class="fc-head" role="button" tabindex="0" aria-expanded="false">';
  head += '<span class="fc-name">' + esc(f.name) + "</span>";
  head += '<span class="badge badge-' + levelClass(f.level) + '">' + esc(f.level) + "</span>";
  if (f.m365) { head += '<span class="badge badge-m365">Microsoft 365</span>'; }
  head += '<span class="fc-purp">' + esc(purpose) + "</span>";
  head += '<div class="fc-actions">';
  head += '<button class="icon-btn" type="button" data-action="details" title="' + t("details") + '" aria-label="' + t("details") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg></button>';
  head += '<button class="icon-btn' + (fav ? " faved" : "") + '" type="button" data-action="fav" title="' + t("favourite") + '" aria-label="' + t("favourite") + '"><svg viewBox="0 0 24 24" fill="' + (fav ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6.5 7 .7-5.2 4.7 1.5 6.8L12 17.2 5.3 20.7l1.5-6.8L2 9.2l7-.7z"></path></svg></button>';
  head += '<button class="icon-btn" type="button" data-action="copy" title="' + t("copy") + '" aria-label="' + t("copy") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg></button>';
  head += '<button class="icon-btn' + (done ? " done" : "") + '" type="button" data-action="complete" title="' + t("complete") + '" aria-label="' + t("complete") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="m8.5 12.5 2.5 2.5 4.5-5"></path></svg></button>';
  head += '<button class="icon-btn" type="button" data-action="pg" title="' + t("openPlayground") + '" aria-label="' + t("openPlayground") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.5L8.5 19a2 2 0 0 0 1.8 3h5.4a2 2 0 0 0 1.8-3L14 9.5V2"></path><path d="M8.5 22h7"></path></svg></button>';
  head += "</div></div>";

  var html = '<div class="formula-card" data-fid="' + esc(f.id) + '">';
  html += head;
  html += detail;
  html += "</div>";
  return html;
}

/* ---------------- Renderers ---------------- */
function renderHeroStats() {
  var html = "";
  html += '<div class="hero-stat"><b>' + FORMULAS.length + "</b><span>Formulas</span></div>";
  html += '<div class="hero-stat"><b>' + CATEGORIES.length + "</b><span>Categories</span></div>";
  html += '<div class="hero-stat"><b>' + COMPARISONS.length + "</b><span>Comparisons</span></div>";
  html += '<div class="hero-stat"><b>' + PROJECTS.length + "</b><span>Office Projects</span></div>";
  html += '<div class="hero-stat"><b>3</b><span>Practice Tests</span></div>';
  document.getElementById("heroStats").innerHTML = html;
}

function renderLevelFilters() {
  var levels = ["All", "Basic", "Intermediate", "Advanced", "Expert"];
  var html = "";
  for (var i = 0; i < levels.length; i++) {
    html += '<button class="level-chip' + (levelFilter === levels[i] ? " active" : "") + '" data-level="' + levels[i] + '">' + levels[i] + "</button>";
  }
  document.getElementById("levelFilters").innerHTML = html;
}

function renderSidebar() {
  var html = "";
  for (var c = 0; c < CATEGORIES.length; c++) {
    var cat = CATEGORIES[c];
    var count = 0;
    for (var f = 0; f < FORMULAS.length; f++) { if (FORMULAS[f].category === cat.id) count++; }
    html += '<li><a href="#cat-' + esc(cat.id) + '" data-cat-link="' + esc(cat.id) + '">' + catGlyph(cat.icon) + " " + esc(tx(cat)) + ' <span class="cat-count">' + count + "</span></a></li>";
  }
  document.getElementById("sidebarCategories").innerHTML = html;
}

function catTitle(cat) { return catGlyph(cat.icon) + " " + esc(tx(cat)); }

function catGlyph(icon) {
  var map = {
    PLUS: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    LOG: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v3c0 1.66 4.03 3 6 3s6-1.34 6-3V9"/><path d="M18 12v3c0 1.66-4.03 3-6 3s-6-1.34-6-3v-3"/></svg>',
    TXT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="7" y2="7"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="17" y2="17"/></svg>',
    DAT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    LUP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>',
    COND: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    STA: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/><line x1="2" x2="22" y1="20" y2="20"/></svg>',
    DYN: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>',
    ADV: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95L7.5 10.5a22 22 0 0 1-4-4A22.52 22.52 0 0 1 12 2c5.5 0 9.5 3.5 11 8a22 22 0 0 1-4 4A22.52 22.52 0 0 1 12 15z"/></svg>',
    FIN: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37a6 6 0 0 1-8.18 0"/></svg>',
    INF: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12" y1="8" y2="8"/></svg>',
    MIS: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>'
  };
  var svg = map[icon];
  if (svg) { return svg; }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>';
}

function renderCategories() {
  var holder = document.getElementById("content");
  var html = "";
  var cats = CATEGORIES.slice();
  if (activeCat) {
    cats = cats.filter(function (c) { return c.id === activeCat; });
  }
  for (var c = 0; c < cats.length; c++) {
    var cat = cats[c];
    var list = [];
    for (var f = 0; f < FORMULAS.length; f++) {
      if (FORMULAS[f].category === cat.id) {
        if (levelFilter !== "All" && FORMULAS[f].level !== levelFilter) continue;
        list.push(formulaCardHTML(FORMULAS[f], tx(cat)));
      }
    }
    if (list.length === 0) continue;
    html += '<div class="cat-card" id="cat-' + esc(cat.id) + '">';
    html += '<div class="cat-head">';
    html += '<span class="cat-icon">' + catGlyph(cat.icon) + "</span>";
    html += '<div><h3>' + esc(tx(cat)) + "</h3><p>" + esc(tx(cat.tagline)) + "</p></div>";
    html += '<span class="badge badge-' + levelClass(cat.level) + '">Level: ' + esc(cat.level) + "</span>";
    html += "</div>";
    html += '<div class="cat-body">' + list.join("") + "</div>";
    html += "</div>";
  }
  if (html === "") { html = '<div class="empty-state"><h3>No formulas found</h3><p>Try changing the level filter or search.</p></div>'; }
  holder.innerHTML = html;
}

function renderSearchResults() {
  var holder = document.getElementById("content");
  var q = (document.getElementById("searchInput").value || "").trim().toLowerCase();
  var list = [];
  for (var i = 0; i < FORMULAS.length; i++) {
    var f = FORMULAS[i];
    var hay = (f.name + " " + tx(f.purpose) + " " + f.syntax.en + " " + f.category + " " + (f.level || "")).toLowerCase();
    if (hay.indexOf(q) !== -1) list.push(formulaCardHTML(f, tx(catById(f.category) || { icon: "", titleEn: f.category, titleHi: f.category, level: "", taglineEn: "", taglineHi: "" })));
  }
  var head = "";
  head += '<div class="section-head"><h2>Search Results</h2><p>' + list.length + " " + t("resultsFor") + " for \"" + esc(document.getElementById("searchInput").value) + "\"</p></div>";
  holder.innerHTML = head + list.join("");
}

function renderBookmarks() {
  var holder = document.getElementById("bookmarkList");
  if (!holder) { return; }
  if (!favs || favs.length === 0) {
    holder.innerHTML = '<div class="empty-state"><h3>' + t("bookmarksEmpty") + "</h3><p>" + t("bookmarksEmptyHint") + "</p></div>";
    return;
  }
  var html = "";
  for (var i = 0; i < favs.length; i++) {
    var f = getFormula(favs[i]);
    if (!f) { continue; }
    var cat = catById(f.category);
    html += '<div class="bm-card">';
    html += '<div class="bm-top"><span class="bm-name">' + esc(f.name) + "</span>" + levelBadgeHTML(f) + "</div>";
    html += '<p class="bm-cat">' + esc(cat ? tx(cat) : f.category) + "</p>";
    html += '<p class="bm-purp">' + esc(tx(f.purpose)) + "</p>";
    html += '<div class="bm-actions">';
    html += '<button class="btn btn-sm" type="button" data-bm-open="' + esc(f.id) + '">' + t("openGuide") + "</button>";
    html += '<button class="btn btn-sm" type="button" data-bm-copy="' + esc(f.id) + '">' + t("copy") + "</button>";
    html += '<button class="btn btn-sm btn-danger" type="button" data-bm-remove="' + esc(f.id) + '">' + t("remove") + "</button>";
    html += "</div></div>";
  }
  holder.innerHTML = html || '<div class="empty-state"><h3>' + t("bookmarksEmpty") + "</h3><p>" + t("bookmarksEmptyHint") + "</p></div>";
}

function renderComparisons() {
  var html = "";
  for (var c = 0; c < COMPARISONS.length; c++) {
    var cmp = COMPARISONS[c];
    var f1 = getFormula(cmp.f1);
    var f2 = getFormula(cmp.f2);
    html += '<div class="compare-card">';
    html += '<h3>' + esc(tx({ en: cmp.titleEn, hi: cmp.titleHi })) + "</h3>";
    html += '<p>' + esc(tx({ en: cmp.descEn, hi: cmp.descHi })) + "</p>";
    html += '<div class="compare-pair">';
    html += '<div class="compare-box"><h5>' + esc(f1 ? f1.name : cmp.f1) + "</h5><pre>" + esc(f1 ? f1.formula : "") + "</pre></div>";
    html += '<div class="compare-box"><h5>' + esc(f2 ? f2.name : cmp.f2) + "</h5><pre>" + esc(f2 ? f2.formula : "") + "</pre></div>";
    html += "</div>";
    html += '<ul class="diff-list">';
    var p1 = flat(cmp.pointsEn);
    var p2 = flat(cmp.pointsHi);
    var n = Math.max(p1.length, p2.length);
    for (var p = 0; p < n; p++) {
      html += "<li><b>English:</b> " + esc(p < p1.length ? p1[p] : "-") + " &nbsp;|&nbsp; <b>Hindi:</b> " + esc(p < p2.length ? p2[p] : "-") + "</li>";
    }
    html += "</ul>";
    html += "</div>";
  }
  document.getElementById("comparisonList").innerHTML = html;
}

function renderProjects() {
  var html = "";
  for (var i = 0; i < PROJECTS.length; i++) {
    var pr = PROJECTS[i];
    html += '<div class="project-card">';
    html += '<span class="proj-role">' + esc(tx({ en: pr.roleEn, hi: pr.roleHi })) + "</span>";
    html += '<h3>' + esc(tx({ en: pr.titleEn, hi: pr.titleHi })) + "</h3>";
    html += '<p>' + esc(tx({ en: pr.descEn, hi: pr.descHi })) + "</p>";
    html += '<div class="proj-formulas">';
    for (var j = 0; j < pr.formulas.length; j++) { html += '<span>' + esc(pr.formulas[j]) + "</span>"; }
    html += "</div></div>";
  }
  document.getElementById("projectGrid").innerHTML = html;
}

function renderCompatibility() {
  var m365Count = 0;
  var items = "";
  for (var i = 0; i < FORMULAS.length; i++) {
    var f = FORMULAS[i];
    if (f.m365 || (f.version && f.version.indexOf("Microsoft 365") !== -1)) { m365Count++; }
  }
  var html = '<div class="compat-summary">';
  html += "<h3>" + esc(t("versionCompat")) + "</h3>";
  html += "<p>" + esc("Core functions such as SUM, AVERAGE, IF and VLOOKUP work in Excel 2007 and later. Functions introduced in Microsoft 365 / Excel 2021 or newer – including FILTER, SORT, UNIQUE, SEQUENCE, XLOOKUP, LET, LAMBDA, MAP, dynamic arrays and modern analytics – require those newer versions and carry the Microsoft 365 badge.") + "</p>";
  html += "<p>" + esc("Older Excel versions may return #NAME? or spill/limitations for dynamic arrays. Financial functions like PMT, IRR, XIRR and RATE follow the standard Excel financial conventions.") + "</p>";
  html += "</div>";
  for (var j = 0; j < FORMULAS.length; j++) {
    var f2 = FORMULAS[j];
    if (f2.m365 || (f2.version && f2.version.indexOf("Microsoft 365") !== -1)) {
      items += '<div class="compat-item"><span><code>' + esc(f2.name) + "</code> – " + esc(f2.id) + "</span><span>" + esc(f2.version) + "</span></div>";
    }
  }
  document.getElementById("compatList").innerHTML = html + items;
}

function renderPlayground() {
  var sel = document.getElementById("pgFormula");
  sel.innerHTML = "";
  for (var i = 0; i < FORMULAS.length; i++) {
    var f = FORMULAS[i];
    var opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.name + " (" + f.level + ")";
    sel.appendChild(opt);
  }
}

function pgFormula() { return getFormula(document.getElementById("pgFormula").value); }

function renderPG() {
  var f = pgFormula();
  if (!f) { document.getElementById("pgSyntax").textContent = ""; document.getElementById("pgExpected").textContent = ""; document.getElementById("pgCalculated").textContent = ""; document.getElementById("pgExample").textContent = ""; return; }
  document.getElementById("pgSyntax").textContent = f.syntax.en;
  document.getElementById("pgFormulaPreview").textContent = f.formula;
  document.getElementById("pgExpected").textContent = f.output;
  document.getElementById("pgExample").textContent = tx(f.office);
  var holder = document.getElementById("pgInputs");
  holder.innerHTML = "";
  var inputs = (f.dataset && f.dataset.inputs) || [];
  if (inputs.length === 0) { holder.innerHTML = '<p class="muted">No sample inputs for this formula.</p>'; return; }
  pgValues[f.id] = pgValues[f.id] || {};
  for (var i = 0; i < inputs.length; i++) {
    var row = document.createElement("div");
    row.className = "pg-input-row";
    var label = document.createElement("span");
    label.className = "ref";
    label.textContent = inputs[i].ref;
    var inp = document.createElement("input");
    inp.type = "text";
    inp.value = inputs[i].value;
    inp.dataset.ref = inputs[i].ref;
    inp.addEventListener("input", function (e) { pgValues[f.id][e.target.dataset.ref] = e.target.value; recomputePG(); });
    row.appendChild(label);
    row.appendChild(inp);
    holder.appendChild(row);
    pgValues[f.id][inputs[i].ref] = inputs[i].value;
  }
  recomputePG();
}

let pgValues = {};
function formatLiveVal(val, f) {
  if (val === null || val === undefined) return "N/A";
  if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
  if (typeof val === "number") { var r2 = Math.round(val * 10000) / 10000; var expRaw = f ? String(f.output || "") : ""; if (/%$/.test(expRaw)) return r2 * 100 + "%"; if (/^\d{4}[-/]/.test(String(val))) return String(val); return String(r2); }
  if (typeof val === "object" && val && val.__error) return String(val.__error);
  if (typeof val === "object" && val._meta) { var m2 = val._meta, arr2 = []; for (var rr = 0; rr < m2.rows; rr++) { var rowStr = []; for (var cc = 0; cc < m2.cols; cc++) { var ccVal = val[rr * m2.cols + cc]; rowStr.push(typeof ccVal === "object" && ccVal && ccVal.__error ? ccVal.__error : (typeof ccVal === "object" && ccVal ? JSON.stringify(ccVal) : String(ccVal))); } arr2.push(rowStr.join(",")); } return "{" + arr2.join(";") + "}"; }
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}
function recomputePG() {
  var f = pgFormula();
  if (!f) { return; }
  var map = pgValues[f.id] || {};
  var val = evaluateFormula(f.formula, map);
  var fnName = (String(f.formula || "").match(/^=?\s*([A-Z][A-Z0-9.]*)\s*\(/i) || [])[1];
  var unsupported = fnName && ["RANDARRAY","LET","LAMBDA","MAP","REDUCE","SCAN","MAKEARRAY","BYROW","BYCOL","ISOMITTED","GROUPBY","PIVOTBY","IMAGE","STOCKHISTORY"].indexOf(fnName.toUpperCase()) !== -1;
  var bad = val === null || val === undefined || (typeof val === "object" && val && val.__error);
  if (bad && unsupported) { document.getElementById("pgCalculated").textContent = "Live preview is not available for " + fnName.toUpperCase() + " in this demo engine. The Expected Output is shown here: " + f.output; return; }
  document.getElementById("pgCalculated").textContent = formatLiveVal(val, f);
}

/* ---------------- Simple formula evaluator ---------------- */
function normalizeFormulaExpr(formula) {
  var expr = String(formula || "").replace(/^=/, "").trim();
  expr = expr.replace(/_xlfn\./gi, "").replace(/@(?=[A-Za-z(])/g, "");
  expr = expr.replace(/\b([A-Z]{1,3}):([A-Z]{1,3})\b/g, function (m, a, b) { return a + "1:" + b + "50"; });
  return expr;
}
function evaluateFormula(formula, map) {
  var expr = normalizeFormulaExpr(formula);
  if (expr === "") return null;
  try {
    var tokens = tokenize(expr);
    var parser = new Parser(tokens, map);
    var val = parser.parseExpression();
    parser.skipSpaces();
    if (parser.pos < parser.tokens.length) return null;
    if (val === null) return null;
    if (typeof val === "number" && !isFinite(val)) return null;
    if (typeof val === "number") return Math.round(val * 10000) / 10000;
    return val;
  } catch (e) { return null; }
}

function Parser(tokens, map) {
  this.tokens = tokens;
  this.pos = 0;
  this.map = map;
}
Parser.prototype.skipSpaces = function () { while (this.pos < this.tokens.length && this.tokens[this.pos].type === "space") { this.pos++; } };
Parser.prototype.peek = function () { this.skipSpaces(); return this.pos < this.tokens.length ? this.tokens[this.pos] : null; };
Parser.prototype.next = function () { this.skipSpaces(); var t = this.tokens[this.pos]; this.pos++; return t; };
Parser.prototype.expect = function (type) {
  var t = this.next();
  if (!t || (t.type !== type && t.value !== type)) throw new Error("Expected " + type);
  return t;
};

/* ---- value helpers ---- */
function isBlankVal(v) {
  if (v && typeof v === "object" && v.__ref) v = v.value;
  return v === null || v === undefined || (typeof v === "string" && v.trim() === "");
}
function unwrapVal(v) {
  if (v && typeof v === "object" && v.__ref) return v.value;
  return v;
}
function numVal(v) {
  v = unwrapVal(v);
  if (isBlankVal(v)) return null;
  if (typeof v === "boolean") return v ? 1 : 0;
  var n = Number(v);
  return isNaN(n) ? null : n;
}
function boolVal(v) {
  v = unwrapVal(v);
  if (v === true || v === false) return v;
  if (typeof v === "string") {
    if (v.toUpperCase() === "TRUE") return true;
    if (v.toUpperCase() === "FALSE") return false;
  }
  var n = Number(v);
  if (!isNaN(n)) return n !== 0;
  return false;
}
function textVal(v) {
  v = unwrapVal(v);
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  return String(v);
}
function isErrorVal(v) {
  return !!(v && typeof v === "object" && v.__error);
}
function isFormulaVal(v) {
  return !!(v && typeof v === "object" && v.__formula);
}
function pushFlat(v, out) {
  if (v && typeof v === "object" && v.__ref) v = v.value;
  if (Array.isArray(v)) {
    for (var i = 0; i < v.length; i++) pushFlat(v[i], out);
  } else if (v !== null && v !== undefined && v !== "") {
    out.push(v);
  }
}
function flatArgs(args) {
  var out = [];
  for (var i = 0; i < args.length; i++) pushFlat(args[i], out);
  return out;
}
function numberList(args) {
  var flat = flatArgs(args);
  var out = [];
  for (var i = 0; i < flat.length; i++) {
    var n = numVal(flat[i]);
    if (n !== null) out.push(n);
  }
  return out;
}
function rangeMeta(a) {
  return a && Array.isArray(a) && a._meta ? a._meta : null;
}
function rangeRows(a) {
  if (Array.isArray(a) && a._meta) {
    var m = a._meta;
    var rows = [];
    for (var r = 0; r < m.rows; r++) rows.push(a.slice(r * m.cols, (r + 1) * m.cols));
    return rows;
  }
  if (Array.isArray(a)) return [a];
  return [[a]];
}
function makeRange(values, rows, cols) {
  var arr = values.slice();
  arr._meta = { rows: rows, cols: cols };
  return arr;
}
function eqVal(a, b) {
  a = unwrapVal(a); b = unwrapVal(b);
  if (a === null || a === undefined) return b === null || b === undefined || b === "";
  if (b === null || b === undefined) return a === "";
  if (typeof a === "boolean" || typeof b === "boolean") return boolVal(a) === boolVal(b);
  var na = Number(a), nb = Number(b);
  if (!isNaN(na) && !isNaN(nb) && String(a).trim() !== "" && String(b).trim() !== "") return na === nb;
  return String(a).toLowerCase() === String(b).toLowerCase();
}

/* ---- date helpers (Excel 1900 serial system) ---- */
var EXCEL_EPOCH = Date.UTC(1899, 11, 30);
function excelSerial(d) { return (d.getTime() - EXCEL_EPOCH) / 86400000; }
function fromSerial(n) { return new Date(EXCEL_EPOCH + Math.round(n * 86400000)); }
function pad2(n) { return (n < 10 ? "0" : "") + n; }
function fmtDate(d) {
  if (!d || isNaN(d.getTime())) return null;
  return d.getUTCFullYear() + "-" + pad2(d.getUTCMonth() + 1) + "-" + pad2(d.getUTCDate());
}
function fmtDateTime(d) {
  if (!d || isNaN(d.getTime())) return null;
  return fmtDate(d) + " " + pad2(d.getUTCHours()) + ":" + pad2(d.getUTCMinutes());
}
function parseDateVal(v) {
  v = unwrapVal(v);
  if (v instanceof Date) return v;
  if (typeof v === "number") return fromSerial(v);
  var s = String(v === null || v === undefined ? "" : v).trim();
  if (!s) return null;
  var m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)));
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) { var yy = +m[3]; if (yy < 100) yy += yy < 30 ? 2000 : 1900; return new Date(Date.UTC(yy, +m[1] - 1, +m[2])); }
  m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (m) return new Date(Date.UTC(1899, 11, 31, +m[1], +m[2], +(m[3] || 0)));
  m = s.match(/^(\d{1,2})[ \-]([A-Za-z]{3,})[ \-](\d{2,4})$/);
  if (m) {
    var months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    var mo = months[m[2].slice(0, 3).toLowerCase()];
    var yr = +m[3]; if (yr < 100) yr += yr < 30 ? 2000 : 1900;
    if (mo !== undefined) return new Date(Date.UTC(yr, mo, +m[1]));
  }
  var d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function addMonths(d, n) {
  var y = d.getUTCFullYear(), m = d.getUTCMonth() + n, day = d.getUTCDate();
  var last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(day, last)));
}
function isWeekend(d, weekend) {
  var day = d.getUTCDay();
  if (weekend === 11) return day === 0;
  return day === 0 || day === 6;
}
function workdayCount(start, end, weekend, holidays) {
  var s = new Date(Math.min(start.getTime(), end.getTime()));
  var e = new Date(Math.max(start.getTime(), end.getTime()));
  var count = 0;
  var hol = {};
  if (Array.isArray(holidays)) for (var h = 0; h < holidays.length; h++) { var hd = parseDateVal(holidays[h]); if (hd) hol[fmtDate(hd)] = 1; }
  for (var d = new Date(s); d <= e; d.setUTCDate(d.getUTCDate() + 1)) {
    if (!isWeekend(d, weekend) && !hol[fmtDate(d)]) count++;
  }
  return count;
}

/* ---- criteria matching for SUMIF / COUNTIF / etc. ---- */
function criteriaMatch(v, crit) {
  v = unwrapVal(v); crit = unwrapVal(crit);
  if (Array.isArray(crit)) crit = crit[0];
  var c = crit === null || crit === undefined ? "" : String(crit);
  var op = "=", target = c;
  var m = c.match(/^(>=|<=|<>|>|<|=)(.*)$/);
  if (m) { op = m[1]; target = m[2]; }
  if (target === "") return isBlankVal(v);
  var avNum = numVal(v), btNum = numVal(target);
  var avD = parseDateVal(v), btD = parseDateVal(target);
  var av = avNum !== null ? avNum : (avD ? excelSerial(avD) : null);
  var bt = btNum !== null ? btNum : (btD ? excelSerial(btD) : null);
  if (av !== null && bt !== null) {
    if (op === "=") return av === bt;
    if (op === "<>") return av !== bt;
    if (op === ">") return av > bt;
    if (op === "<") return av < bt;
    if (op === ">=") return av >= bt;
    if (op === "<=") return av <= bt;
  }
  var sv = textVal(v).toLowerCase(), st = String(target).toLowerCase();
  if (st.indexOf("*") !== -1 || st.indexOf("?") !== -1) {
    var rx = "^" + st.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$";
    var hit = new RegExp(rx, "i").test(sv);
    return op === "<>" ? !hit : hit;
  }
  if (op === "=") return sv === st;
  if (op === "<>") return sv !== st;
  if (op === ">") return sv > st;
  if (op === "<") return sv < st;
  if (op === ">=") return sv >= st;
  if (op === "<=") return sv <= st;
  return false;
}
function filterCriteria(sumRange, pairs) {
  var rows = rangeRows(sumRange);
  var rowCount = rows.length;
  var keep = [];
  for (var i = 0; i < rowCount; i++) keep.push(true);
  for (var p = 0; p < pairs.length; p += 2) {
    var critRange = pairs[p], crit = pairs[p + 1];
    var cvals = rangeRows(critRange);
    for (var r = 0; r < rowCount; r++) {
      var cv = cvals[r] ? cvals[r][0] : null;
      if (!criteriaMatch(cv, crit)) keep[r] = false;
    }
  }
  return { rows: rows, keep: keep };
}

Parser.prototype.parseExpression = function () {
  var left = this.parseConcat();
  var cmp = this.peek();
  if (cmp && cmp.type === "op" && (cmp.value === "=" || cmp.value === ">" || cmp.value === "<" || cmp.value === ">=" || cmp.value === "<=" || cmp.value === "<>")) {
    this.next();
    var right = this.parseConcat();
    return this.compare(left, cmp.value, right);
  }
  return left;
};
Parser.prototype.parseConcat = function () {
  var left = this.parseAddSub();
  while (true) {
    var t = this.peek();
    if (t && t.type === "op" && t.value === "&") {
      this.next();
      var right = this.parseAddSub();
      if (Array.isArray(left) || Array.isArray(right)) {
        var la = Array.isArray(left) ? left : [left], ra = Array.isArray(right) ? right : [right];
        var n = Math.max(la.length, ra.length), out = [];
        for (var i = 0; i < n; i++) out.push(textVal(la[i % la.length]) + textVal(ra[i % ra.length]));
        left = out;
      } else { left = concatVal(left) + concatVal(right); }
    } else break;
  }
  return left;
};
function concatVal(v) {
  if (Array.isArray(v)) { var out2 = []; for (var ci = 0; ci < v.length; ci++) out2.push(concatVal(v[ci])); return out2; }
  if (v && typeof v === "object" && v.__error) return textVal(v);
  if (v instanceof Date) return String(excelSerial(v));
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  var vnum = numVal(v);
  if (vnum !== null && String(v).trim() !== "") return String(Math.round(vnum * 10000) / 10000);
  return textVal(v);
}
Parser.prototype.parseAddSub = function () {
  var left = this.parseTerm();
  while (true) {
    var t = this.peek();
    if (t && t.type === "op" && (t.value === "+" || t.value === "-")) {
      this.next();
      var right = this.parseTerm();
      left = this.arith(left, t.value, right);
    } else break;
  }
  return left;
};
Parser.prototype.compare = function (a, op, b) {
  if (Array.isArray(a)) {
    var outA = [];
    for (var i = 0; i < a.length; i++) outA.push(this.compare(a[i], op, b));
    if (a._meta) { outA._meta = a._meta; }
    return outA;
  }
  if (Array.isArray(b)) {
    var outB = [];
    for (var j = 0; j < b.length; j++) outB.push(this.compare(a, op, b[j]));
    if (b._meta) { outB._meta = b._meta; }
    return outB;
  }
  if (op === "=") return eqVal(a, b);
  if (op === "<>") return !eqVal(a, b);
  var na = numVal(a), nb = numVal(b);
  if (na === null || nb === null) {
    var sa = textVal(a).toLowerCase(), sb = textVal(b).toLowerCase();
    if (op === ">") return sa > sb;
    if (op === "<") return sa < sb;
    if (op === ">=") return sa >= sb;
    if (op === "<=") return sa <= sb;
    return null;
  }
  if (op === ">") return na > nb;
  if (op === "<") return na < nb;
  if (op === ">=") return na >= nb;
  if (op === "<=") return na <= nb;
  return null;
};
Parser.prototype.parseTerm = function () {
  var left = this.parseFactor();
  while (true) {
    var t = this.peek();
    if (t && t.type === "op" && (t.value === "*" || t.value === "/" || t.value === "^")) {
      this.next();
      var right = this.parseFactor();
      left = this.arith(left, t.value, right);
    } else break;
  }
  return left;
};
Parser.prototype.parseFactor = function () {
  var t = this.next();
  if (t && t.type === "op" && t.value === "-") return -this.parseFactor();
  if (t && t.type === "op" && t.value === "+") return this.parseFactor();
  return this.parsePrimary(t);
};
Parser.prototype.parsePrimary = function (t) {
  if (t === undefined || t === null) t = this.next();
  if (!t) return null;
  if (t.type === "num") return t.value;
  if (t.type === "str") return t.value;
  if (t.type === "name") {
    var nxt = this.peek();
    if ((t.value.toUpperCase() === "TRUE" || t.value.toUpperCase() === "FALSE") && !(nxt && nxt.type === "op" && nxt.value === "(")) {
      return t.value.toUpperCase() === "TRUE";
    }
    if (nxt && nxt.type === "op" && nxt.value === "!") { this.next(); return this.parsePrimary(this.next()); }
    if (nxt && nxt.type === "op" && nxt.value === "(") {
      this.next();
      var fn = t.value.toUpperCase().replace(/^_XLFN\./, "");
      var args = [];
      var keepRef = /^(ISBLANK|ISFORMULA|ISREF|ROW|COLUMN|OFFSET|FORMULATEXT)$/.test(fn);
      var oldKeep = this.keepRef;
      if (keepRef) this.keepRef = true;
      while (true) {
        var tt = this.peek();
        if (!tt) break;
        if (tt.type === "op" && tt.value === ")") { this.next(); break; }
        if (tt.type === "op" && (tt.value === "," || tt.value === ";")) { this.next(); continue; }
        args.push(this.parseExpression());
      }
      this.keepRef = oldKeep;
      return this.callFn(fn, args);
    }
    if (nxt && nxt.type === "op" && nxt.value === ":") {
      this.next();
      var tEnd = this.next();
      var endName = tEnd && (tEnd.type === "name" || tEnd.type === "num") ? String(tEnd.value) : "";
      if (endName) {
        if (this.keepRef) return { __ref: t.value + ":" + endName, value: this.rangeValue(t.value + ":" + endName) };
        return this.rangeValue(t.value + ":" + endName);
      }
    }
    var val = this.cellValue(t.value);
    if (this.keepRef) return { __ref: t.value, value: val, blank: isBlankVal(this.cellValueRaw(String(t.value).replace(/\$/g, "").toUpperCase())) };
    return val;
  }
  if (t.type === "op" && t.value === "(") {
    var v = this.parseExpression();
    this.expect(")");
    return v;
  }
  if (t.type === "op" && t.value === "{") {
    var arr = [];
    while (true) {
      var tt2 = this.peek();
      if (!tt2) break;
      if (tt2.type === "op" && tt2.value === "}") { this.next(); break; }
      if (tt2.type === "op" && (tt2.value === "," || tt2.value === ";")) { this.next(); continue; }
      arr.push(this.parseExpression());
    }
    return arr;
  }
  return null;
};
Parser.prototype.rangeValue = function (ref) {
  var parts = String(ref).split(":");
  var startKey = this.cellToKey(parts[0]);
  var endKey = this.cellToKey(parts[1] || parts[0]);
  if (!startKey || !endKey) return null;
  var s = this.keyToCoords(startKey);
  var e = this.keyToCoords(endKey);
  if (!s || !e) return null;
  var arr = [];
  var row = Math.min(s.row, e.row);
  var endRow = Math.max(s.row, e.row);
  var col = Math.min(s.col, e.col);
  var endCol = Math.max(s.col, e.col);
  for (var r = row; r <= endRow; r++) {
    for (var c = col; c <= endCol; c++) {
      arr.push(this.cellValueRaw(this.coordsToKey(c, r)));
    }
  }
  arr._meta = { rows: endRow - row + 1, cols: endCol - col + 1, startRow: row, startCol: col };
  if (arr.length === 1) return arr[0];
  return arr;
};
Parser.prototype.cellToKey = function (ref) {
  var m = String(ref).toUpperCase().replace(/\$/g, "").match(/^([A-Z]+)(\d+)$/);
  if (!m) return null;
  var col = 0;
  for (var i = 0; i < m[1].length; i++) col = col * 26 + (m[1].charCodeAt(i) - 64);
  return this.coordsToKey(col, parseInt(m[2], 10));
};
Parser.prototype.coordsToKey = function (col, row) {
  var s = "";
  var c = col;
  while (c > 0) {
    var mod = (c - 1) % 26;
    s = String.fromCharCode(65 + mod) + s;
    c = Math.floor((c - 1) / 26);
  }
  return s + row;
};
Parser.prototype.keyToCoords = function (key) {
  if (!key) return null;
  var m = String(key).toUpperCase().match(/^([A-Z]+)(\d+)$/);
  if (!m) return null;
  var col = 0;
  for (var i = 0; i < m[1].length; i++) col = col * 26 + (m[1].charCodeAt(i) - 64);
  return { col: col, row: parseInt(m[2], 10) };
};
Parser.prototype.cellValueRaw = function (key) {
  var v = this.map[key];
  if (v === undefined || v === null) return null;
  if (typeof v === "string") {
    var t = v.trim();
    if (t === "") return null;
    if (t.toUpperCase() === "TRUE") return true;
    if (t.toUpperCase() === "FALSE") return false;
    if (t.charAt(0) === "#") return { __error: t };
    if (t.charAt(0) === "=") {
      if (/\/\s*0\b/.test(t)) return { __error: "#DIV/0!" };
      return { __formula: t };
    }
    var n = Number(t);
    if (!isNaN(n)) return n;
    return v;
  }
  return v;
};
Parser.prototype.cellValue = function (ref) {
  var key = String(ref).replace(/\$/g, "").toUpperCase();
  var raw = this.cellValueRaw(key);
  if (raw !== null && raw !== undefined) return raw;
  return 0;
};
Parser.prototype.arith = function (a, op, b) {
  if (Array.isArray(a) || Array.isArray(b)) {
    var aa = Array.isArray(a) ? a : [a], bb = Array.isArray(b) ? b : [b];
    var n = Math.max(aa.length, bb.length), out = [];
    for (var i = 0; i < n; i++) out.push(this.arith(aa[i % aa.length], op, bb[i % bb.length]));
    return out;
  }
  if (a === null || b === null) return null;
  var x = numVal(a), y = numVal(b);
  if (x === null || y === null) return null;
  if (op === "+") return x + y;
  if (op === "-") return x - y;
  if (op === "*") return x * y;
  if (op === "/") { if (y === 0) return { __error: "#DIV/0!" }; return x / y; }
  if (op === "^") return Math.pow(x, y);
  return null;
};
Parser.prototype.callFn = function (fn, args) {
  var self = this;
  function getNum(i) { return args[i] === undefined ? null : numVal(args[i]); }
  function getText(i) { return textVal(args[i]); }
  function getBool(i) { return boolVal(args[i]); }
  function arr(i) { var v = args[i]; if (Array.isArray(v)) return v; return v === undefined ? [] : [v]; }
  function firstNum(i) { return getNum(i); }

  switch (fn) {
    /* ---------- math / stats ---------- */
    case "SUM": { var ns = numberList(args); var s = 0; for (var i = 0; i < ns.length; i++) s += ns[i]; return s; }
    case "AVERAGE": { var na = numberList(args); if (!na.length) return { __error: "#DIV/0!" }; var sa = 0; for (var a1 = 0; a1 < na.length; a1++) sa += na[a1]; return sa / na.length; }
    case "COUNT": { var nc = numberList(args); return nc.length; }
    case "COUNTA": { var fa = flatArgs(args); var ca = 0; for (var a2 = 0; a2 < fa.length; a2++) if (!isBlankVal(fa[a2])) ca++; return ca; }
    case "COUNTBLANK": { var fb = flatArgs(args); var cb = 0; for (var a3 = 0; a3 < fb.length; a3++) if (isBlankVal(fb[a3])) cb++; return cb; }
    case "MAX": { var nmax = numberList(args); if (!nmax.length) return 0; return Math.max.apply(null, nmax); }
    case "MIN": { var nmin = numberList(args); if (!nmin.length) return 0; return Math.min.apply(null, nmin); }
    case "PRODUCT": { var np = numberList(args); if (!np.length) return 0; var p = 1; for (var a4 = 0; a4 < np.length; a4++) p *= np[a4]; return p; }
    case "MEDIAN": { var nm = numberList(args).sort(function (x, y) { return x - y; }); if (!nm.length) return null; var mid = Math.floor(nm.length / 2); return nm.length % 2 ? nm[mid] : (nm[mid - 1] + nm[mid]) / 2; }
    case "MODE.SNGL": {
      var nmo = numberList(args), counts = {}, best = null, bestCount = 0;
      for (var a5 = 0; a5 < nmo.length; a5++) { var k5 = String(nmo[a5]); counts[k5] = (counts[k5] || 0) + 1; if (counts[k5] > bestCount) { bestCount = counts[k5]; best = nmo[a5]; } }
      return bestCount > 1 ? best : { __error: "#N/A" };
    }
    case "LARGE": { var arrL = numberList([args[0]]).sort(function (x, y) { return y - x; }); var kL = getNum(1); return arrL[(kL || 1) - 1]; }
    case "SMALL": { var arrS = numberList([args[0]]).sort(function (x, y) { return x - y; }); var kS = getNum(1); return arrS[(kS || 1) - 1]; }
    case "RANK.EQ": case "RANK.AVG": {
      var rn = getNum(0), rarr = numberList([args[1]]), order = getNum(2) || 0;
      rarr = rarr.slice().sort(function (x, y) { return order === 0 ? y - x : x - y; });
      var rank = rarr.indexOf(rn) + 1;
      if (fn === "RANK.AVG" && rank > 0) {
        var last = rarr.lastIndexOf(rn);
        rank = (rank + last + 1) / 2;
      }
      return rank || { __error: "#N/A" };
    }
    case "PERCENTILE.INC": {
      var parr = numberList([args[0]]).sort(function (x, y) { return x - y; }); var pp = getNum(1);
      if (!parr.length || pp === null) return null;
      var idx = (parr.length - 1) * pp, lo = Math.floor(idx), hi = Math.ceil(idx);
      return lo === hi ? parr[lo] : parr[lo] + (parr[hi] - parr[lo]) * (idx - lo);
    }
    case "QUARTILE.INC": return this.callFn("PERCENTILE.INC", [args[0], (getNum(1) || 0) / 4]);
    case "STDEV.S": case "STDEV.P": case "VAR.S": case "VAR.P": {
      var varr = numberList([args[0]]);
      if (varr.length < (fn.indexOf(".S") !== -1 ? 2 : 1)) return { __error: "#DIV/0!" };
      var mean = varr.reduce(function (x, y) { return x + y; }, 0) / varr.length;
      var ss = varr.reduce(function (x, y) { return x + (y - mean) * (y - mean); }, 0);
      var div = fn.indexOf(".S") !== -1 ? varr.length - 1 : varr.length;
      var variance = ss / div;
      if (fn.indexOf("STDEV") === 0) return Math.sqrt(variance);
      return variance;
    }
    case "CORREL": {
      var xa = numberList([args[0]]), ya = numberList([args[1]]), ncor = Math.min(xa.length, ya.length);
      if (!ncor) return { __error: "#DIV/0!" };
      var mx = 0, my = 0; for (var c1 = 0; c1 < ncor; c1++) { mx += xa[c1]; my += ya[c1]; } mx /= ncor; my /= ncor;
      var cov = 0, vx = 0, vy = 0;
      for (var c2 = 0; c2 < ncor; c2++) { var dx = xa[c2] - mx, dy = ya[c2] - my; cov += dx * dy; vx += dx * dx; vy += dy * dy; }
      return cov / Math.sqrt(vx * vy);
    }
    case "FORECAST.LINEAR": {
      var fx = getNum(0), fy = numberList([args[1]]), fxx = numberList([args[2]]), nf = Math.min(fy.length, fxx.length);
      if (!nf) return { __error: "#N/A" };
      var sx = 0, sy = 0, sxy = 0, sxx = 0;
      for (var f1 = 0; f1 < nf; f1++) { sx += fxx[f1]; sy += fy[f1]; sxy += fxx[f1] * fy[f1]; sxx += fxx[f1] * fxx[f1]; }
      var slope = (nf * sxy - sx * sy) / (nf * sxx - sx * sx);
      var intercept = (sy - slope * sx) / nf;
      return intercept + slope * fx;
    }
    case "FREQUENCY": {
      var fdata = numberList([args[0]]), fbins = numberList([args[1]]);
      var fres = []; var prev = -Infinity;
      for (var f2 = 0; f2 < fbins.length; f2++) { var cnt = 0; for (var f3 = 0; f3 < fdata.length; f3++) if (fdata[f3] > prev && fdata[f3] <= fbins[f2]) cnt++; fres.push(cnt); prev = fbins[f2]; }
      var above = 0; for (var f4 = 0; f4 < fdata.length; f4++) if (fdata[f4] > prev) above++;
      fres.push(above); return fres;
    }
    case "SUMPRODUCT": {
      var rowsA = rangeRows(args[0]), rowsB = rangeRows(args[1]);
      var sumP = 0;
      for (var rp = 0; rp < rowsA.length; rp++) for (var cp = 0; cp < rowsA[rp].length; cp++) {
        var xv = numVal(rowsA[rp][cp]), yv = rowsB[rp] && rowsB[rp][cp] !== undefined ? numVal(rowsB[rp][cp]) : null;
        if (xv !== null && yv !== null) sumP += xv * yv;
      }
      return sumP;
    }
    case "SUBTOTAL": case "AGGREGATE": {
      var code = getNum(0), srange = args[fn === "SUBTOTAL" ? 1 : 2];
      var snums = numberList([srange]);
      if (code === 9 || code === 109) return snums.reduce(function (x, y) { return x + y; }, 0);
      if (code === 1 || code === 101) return snums.length ? snums.reduce(function (x, y) { return x + y; }, 0) / snums.length : null;
      if (code === 2 || code === 102) return snums.length;
      if (code === 3 || code === 103) { var sfa = flatArgs([srange]); return sfa.filter(function (v) { return !isBlankVal(v); }).length; }
      if (code === 4 || code === 104) return Math.max.apply(null, snums);
      if (code === 5 || code === 105) return Math.min.apply(null, snums);
      return null;
    }
    case "ABS": return Math.abs(getNum(0));
    case "SQRT": return Math.sqrt(getNum(0));
    case "POWER": return Math.pow(getNum(0), getNum(1));
    case "ROUND": { var rn1 = getNum(0), rd = getNum(1) || 0, rf = Math.pow(10, rd); return Math.round(rn1 * rf) / rf; }
    case "ROUNDUP": { var ru1 = getNum(0), rud = getNum(1) || 0, ruf = Math.pow(10, rud); return Math.ceil(ru1 * ruf) / ruf; }
    case "ROUNDDOWN": { var rd1 = getNum(0), rdd = getNum(1) || 0, rdf = Math.pow(10, rdd); return Math.floor(rd1 * rdf) / rdf; }
    case "INT": return Math.floor(getNum(0));
    case "MOD": { var m1 = getNum(0), m2 = getNum(1); return m2 === 0 ? { __error: "#DIV/0!" } : m1 - m2 * Math.floor(m1 / m2); }

    /* ---------- logical ---------- */
    case "IF": return boolVal(args[0]) ? (args[1] === undefined ? true : args[1]) : (args[2] === undefined ? false : args[2]);
    case "IFS": {
      for (var i2 = 0; i2 < args.length; i2 += 2) if (boolVal(args[i2])) return args[i2 + 1];
      return { __error: "#N/A" };
    }
    case "IFERROR": { var fv = args[0]; return isErrorVal(fv) || fv === null ? args[1] : fv; }
    case "IFNA": { var fna = args[0]; return isErrorVal(fna) && fna.__error === "#N/A" ? args[1] : fna; }
    case "AND": { var fanda = flatArgs(args); for (var i3 = 0; i3 < fanda.length; i3++) if (!boolVal(fanda[i3])) return false; return true; }
    case "OR": { var fora = flatArgs(args); for (var i4 = 0; i4 < fora.length; i4++) if (boolVal(fora[i4])) return true; return false; }
    case "NOT": return !boolVal(args[0]);
    case "XOR": { var fxo = flatArgs(args), tcount = 0; for (var i5 = 0; i5 < fxo.length; i5++) if (boolVal(fxo[i5])) tcount++; return (tcount % 2) === 1; }
    case "SWITCH": {
      var sw = args[0];
      for (var i6 = 1; i6 + 1 < args.length; i6 += 2) if (eqVal(sw, args[i6])) return args[i6 + 1];
      return args.length % 2 === 0 ? args[args.length - 1] : { __error: "#N/A" };
    }
    case "TRUE": return true;
    case "FALSE": return false;

    /* ---------- text ---------- */
    case "LEFT": { var ltx = getText(0), ln = getNum(1); return ltx.slice(0, ln === null ? 1 : ln); }
    case "RIGHT": { var rtx = getText(0), rn2 = getNum(1); return rn2 === null ? rtx.slice(-1) : rtx.slice(-rn2); }
    case "MID": { var mtx = getText(0), ms = getNum(1) || 1, ml = getNum(2) || 0; return mtx.substr(ms - 1, ml); }
    case "LEN": return getText(0).length;
    case "TRIM": return getText(0).replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
    case "CLEAN": return getText(0).replace(/[\x00-\x1F\x7F]/g, "");
    case "UPPER": return getText(0).toUpperCase();
    case "LOWER": return getText(0).toLowerCase();
    case "PROPER": return getText(0).replace(/\w\S*/g, function (w) { return w.charAt(0).toUpperCase() + w.substr(1).toLowerCase(); });
    case "CONCAT": case "CONCATENATE": { var cat = flatArgs(args); return cat.map(textVal).join(""); }
    case "TEXTJOIN": {
      var delim = getText(0), ignoreEmpty = boolVal(args[1]), tj = flatArgs(args.slice(2));
      if (ignoreEmpty) tj = tj.filter(function (v) { return !isBlankVal(v); });
      return tj.map(textVal).join(delim);
    }
    case "FIND": { var fnd = getText(0), within = getText(1), fstart = getNum(2) || 1; var pos = within.indexOf(fnd, fstart - 1); return pos === -1 ? { __error: "#VALUE!" } : pos + 1; }
    case "SEARCH": { var snd = getText(0).toLowerCase(), swithin = getText(1).toLowerCase(), sstart = getNum(2) || 1; var spos = swithin.indexOf(snd, sstart - 1); return spos === -1 ? { __error: "#VALUE!" } : spos + 1; }
    case "SUBSTITUTE": {
      var stx = getText(0), sold = getText(1), snew = getText(2), inst = getNum(3);
      if (inst === null) return stx.split(sold).join(snew);
      var occ = 0, out = "", pos = 0;
      while (true) { var hit = stx.indexOf(sold, pos); if (hit === -1) { out += stx.slice(pos); break; } occ++; out += stx.slice(pos, hit); if (occ === inst) out += snew; else out += sold; pos = hit + sold.length; }
      return out;
    }
    case "REPLACE": { var rtx2 = getText(0), rstart = getNum(1) || 1, rlen = getNum(2) || 0, rnew = getText(3); return rtx2.slice(0, rstart - 1) + rnew + rtx2.slice(rstart - 1 + rlen); }
    case "TEXT": {
      var tv = unwrapVal(args[0]), tf = getText(1);
      if (isBlankVal(tv)) return "";
      var tn = numVal(tv);
      if (tn === null) return textVal(tv);
      var dec = (tf.match(/0\.(0+)/) || [])[1];
      if (tf.indexOf("%") !== -1) return (tn * 100).toFixed(dec ? dec.length : 0) + "%";
      if (dec) return tn.toFixed(dec.length);
      return String(Math.round(tn));
    }
    case "VALUE": { var vv = numVal(args[0]); return vv === null ? { __error: "#VALUE!" } : vv; }
    case "EXACT": return getText(0) === getText(1);
    case "REPT": { var rep = getText(0), repn = getNum(1) || 0; return new Array(Math.max(0, Math.floor(repn)) + 1).join(rep); }
    case "TEXTBEFORE": { var tbv = getText(0), tbd = getText(1), tbi = tbv.indexOf(tbd); return tbi === -1 ? { __error: "#N/A" } : tbv.slice(0, tbi); }
    case "TEXTAFTER": { var tav = getText(0), tad = getText(1), tai = tav.indexOf(tad); return tai === -1 ? { __error: "#N/A" } : tav.slice(tai + tad.length); }
    case "TEXTSPLIT": return getText(0).split(getText(1));

    /* ---------- dates ---------- */
    case "TODAY": return fmtDate(new Date());
    case "NOW": return fmtDateTime(new Date());
    case "DATE": { var dy = getNum(0), dm = getNum(1), dd = getNum(2); return excelSerial(new Date(Date.UTC(dy, dm - 1, dd))); }
    case "TIME": { var th = getNum(0) || 0, tm = getNum(1) || 0, ts = getNum(2) || 0; return (th * 3600 + tm * 60 + ts) / 86400; }
    case "DAY": { var dd2 = parseDateVal(args[0]); return dd2 ? dd2.getUTCDate() : { __error: "#VALUE!" }; }
    case "MONTH": { var dm2 = parseDateVal(args[0]); return dm2 ? dm2.getUTCMonth() + 1 : { __error: "#VALUE!" }; }
    case "YEAR": { var dy2 = parseDateVal(args[0]); return dy2 ? dy2.getUTCFullYear() : { __error: "#VALUE!" }; }
    case "HOUR": { var dh = parseDateVal(args[0]); return dh ? dh.getUTCHours() : { __error: "#VALUE!" }; }
    case "MINUTE": { var dmin = parseDateVal(args[0]); return dmin ? dmin.getUTCMinutes() : { __error: "#VALUE!" }; }
    case "SECOND": { var dsec = parseDateVal(args[0]); return dsec ? dsec.getUTCSeconds() : { __error: "#VALUE!" }; }
    case "DATEDIF": {
      var d1 = parseDateVal(args[0]), d2 = parseDateVal(args[1]), unit = getText(2).toUpperCase();
      if (!d1 || !d2) return { __error: "#VALUE!" };
      if (unit === "Y") { var yy = d2.getUTCFullYear() - d1.getUTCFullYear(); if (d2.getUTCMonth() < d1.getUTCMonth() || (d2.getUTCMonth() === d1.getUTCMonth() && d2.getUTCDate() < d1.getUTCDate())) yy--; return yy; }
      if (unit === "M") { var mm = (d2.getUTCFullYear() - d1.getUTCFullYear()) * 12 + d2.getUTCMonth() - d1.getUTCMonth(); if (d2.getUTCDate() < d1.getUTCDate()) mm--; return mm; }
      if (unit === "D") return Math.round(excelSerial(d2) - excelSerial(d1));
      return { __error: "#VALUE!" };
    }
    case "DAYS": { var da1 = parseDateVal(args[0]), da2 = parseDateVal(args[1]); return da1 && da2 ? Math.round(excelSerial(da1) - excelSerial(da2)) : { __error: "#VALUE!" }; }
    case "DAYS360": {
      var d360a = parseDateVal(args[0]), d360b = parseDateVal(args[1]);
      if (!d360a || !d360b) return { __error: "#VALUE!" };
      return (d360b.getUTCFullYear() - d360a.getUTCFullYear()) * 360 + (d360b.getUTCMonth() - d360a.getUTCMonth()) * 30 + (d360b.getUTCDate() - d360a.getUTCDate());
    }
    case "EDATE": { var ed = parseDateVal(args[0]); return ed ? fmtDate(addMonths(ed, getNum(1) || 0)) : { __error: "#VALUE!" }; }
    case "EOMONTH": { var eom = parseDateVal(args[0]); if (!eom) return { __error: "#VALUE!" }; var em = addMonths(eom, getNum(1) || 0); return fmtDate(new Date(Date.UTC(em.getUTCFullYear(), em.getUTCMonth() + 1, 0))); }
    case "NETWORKDAYS": case "NETWORKDAYS.INTL": {
      var nd1 = parseDateVal(args[0]), nd2 = parseDateVal(args[1]); if (!nd1 || !nd2) return { __error: "#VALUE!" };
      var weekend = fn === "NETWORKDAYS.INTL" ? getNum(2) : 1;
      return workdayCount(nd1, nd2, weekend, args[fn === "NETWORKDAYS.INTL" ? 3 : 2]);
    }
    case "WORKDAY": case "WORKDAY.INTL": {
      var wd = parseDateVal(args[0]); if (!wd) return { __error: "#VALUE!" };
      var wdays = getNum(1) || 0, wweekend = fn === "WORKDAY.INTL" ? getNum(2) : 1;
      var cur = new Date(wd), step = wdays >= 0 ? 1 : -1, left = Math.abs(wdays);
      while (left > 0) { cur.setUTCDate(cur.getUTCDate() + step); if (!isWeekend(cur, wweekend)) left--; }
      return fmtDate(cur);
    }
    case "WEEKDAY": { var wd2 = parseDateVal(args[0]); if (!wd2) return { __error: "#VALUE!" }; var wt = getNum(1) || 1; var wday = wd2.getUTCDay(); if (wt === 2) return wday === 0 ? 7 : wday; if (wt === 3) return wday === 0 ? 6 : wday - 1; return wday + 1; }
    case "WEEKNUM": { var wn = parseDateVal(args[0]); if (!wn) return { __error: "#VALUE!" }; var jan1 = new Date(Date.UTC(wn.getUTCFullYear(), 0, 1)); return Math.floor((excelSerial(wn) - excelSerial(jan1)) / 7) + 1; }
    case "YEARFRAC": { var yf1 = parseDateVal(args[0]), yf2 = parseDateVal(args[1]); return yf1 && yf2 ? Math.abs(excelSerial(yf2) - excelSerial(yf1)) / 365 : { __error: "#VALUE!" }; }

    /* ---------- lookup / reference ---------- */
    case "VLOOKUP": {
      var vl = args[0], vt = rangeRows(args[1]), vc = getNum(2) || 1, vexact = args[3] === undefined ? true : boolVal(args[3]);
      var vres = null;
      for (var vr = 0; vr < vt.length; vr++) { if (eqVal(vt[vr][0], vl)) { vres = vt[vr][vc - 1]; break; } }
      if (vres === null && !vexact) vres = vt.length ? vt[vt.length - 1][vc - 1] : null;
      return vres === null || vres === undefined ? { __error: "#N/A" } : vres;
    }
    case "HLOOKUP": {
      var hl = args[0], ht = rangeRows(args[1]), hr = getNum(2) || 1, hexact = args[3] === undefined ? true : boolVal(args[3]);
      var hres = null, hhead = ht[0] || [];
      for (var hc = 0; hc < hhead.length; hc++) if (eqVal(hhead[hc], hl)) { hres = ht[hr - 1] ? ht[hr - 1][hc] : null; break; }
      if (hres === null && !hexact) hres = ht[hr - 1] ? ht[hr - 1][hhead.length - 1] : null;
      return hres === null || hres === undefined ? { __error: "#N/A" } : hres;
    }
    case "XLOOKUP": {
      var xl = args[0], xa = flatArgs([args[1]]), xr = flatArgs([args[2]]), xnf = args[3];
      for (var xi = 0; xi < xa.length; xi++) if (eqVal(xa[xi], xl)) return xr[xi] === undefined ? xnf : xr[xi];
      return xnf === undefined ? { __error: "#N/A" } : xnf;
    }
    case "MATCH": case "XMATCH": {
      var ml = args[0], ma = flatArgs([args[1]]), mt = getNum(2) || 0;
      for (var mi = 0; mi < ma.length; mi++) if (eqVal(ma[mi], ml)) return mi + 1;
      return { __error: "#N/A" };
    }
    case "INDEX": {
      var ia = args[0], ir = getNum(1), ic = getNum(2);
      var irows = rangeRows(ia);
      if (ir === null) return ia;
      if (ic !== null) return irows[ir - 1] ? irows[ir - 1][ic - 1] : { __error: "#REF!" };
      if (irows.length > 1 && irows[0].length === 1) return irows[ir - 1] ? irows[ir - 1][0] : { __error: "#REF!" };
      return flatArgs([ia])[ir - 1];
    }
    case "CHOOSE": { var ci = getNum(0); return args[ci] === undefined ? { __error: "#VALUE!" } : args[ci]; }
    case "ADDRESS": { var ar = getNum(0) || 1, ac = getNum(1) || 1; var colName = this.coordsToKey(ac, 1).replace(/\d+$/, ""); return "$" + colName + "$" + ar; }
    case "INDIRECT": { var ind = getText(0); return this.cellValue(ind); }
    case "OFFSET": {
      var orf = args[0]; if (!orf || !orf.__ref) return { __error: "#REF!" };
      var okey = String(orf.__ref).split(":")[0].replace(/\$/g, "").toUpperCase();
      var oc = this.keyToCoords(okey); if (!oc) return { __error: "#REF!" };
      var tkey = this.coordsToKey(oc.col + (getNum(2) || 0), oc.row + (getNum(1) || 0));
      return this.cellValue(tkey);
    }
    case "ROW": { var rrf = args[0]; if (rrf && rrf.__ref) { var rc = this.keyToCoords(String(rrf.__ref).split(":")[0].replace(/\$/g, "")); return rc ? rc.row : null; } return null; }
    case "COLUMN": { var crf = args[0]; if (crf && crf.__ref) { var cc = this.keyToCoords(String(crf.__ref).split(":")[0].replace(/\$/g, "")); return cc ? cc.col : null; } return null; }
    case "ROWS": { var rm = rangeMeta(args[0]); if (rm) return rm.rows; var rarr = Array.isArray(args[0]) ? args[0] : [args[0]]; return rarr.length; }
    case "COLUMNS": { var cm = rangeMeta(args[0]); if (cm) return cm.cols; return 1; }
    case "TRANSPOSE": {
      var tr = rangeRows(args[0]), tout = [];
      var tcols = tr[0] ? tr[0].length : 0;
      for (var tc = 0; tc < tcols; tc++) for (var trr = 0; trr < tr.length; trr++) tout.push(tr[trr][tc]);
      return makeRange(tout, tcols, tr.length);
    }
    case "HYPERLINK": return getText(1) || getText(0);
    case "FORMULATEXT": {
      if (!args[0] || !args[0].__ref) return { __error: "#N/A" };
      var fkey = String(args[0].__ref).replace(/\$/g, "").toUpperCase();
      var rawv = this.map[fkey];
      return typeof rawv === "string" && rawv.charAt(0) === "=" ? rawv : { __error: "#N/A" };
    }
    case "LOOKUP": {
      var lk = args[0], larr = flatArgs([args[1]]), lres = flatArgs([args[2]]), lfound = null;
      for (var li = 0; li < larr.length; li++) { if (numVal(larr[li]) !== null && numVal(lk) !== null && numVal(larr[li]) <= numVal(lk)) lfound = li; }
      if (lfound === null) return { __error: "#N/A" };
      return lres[lfound];
    }

    /* ---------- conditional ---------- */
    case "SUMIF": { var sif = filterCriteria(args[2] === undefined ? args[0] : args[2], [args[0], args[1]]); var sifSum = 0; for (var si = 0; si < sif.rows.length; si++) if (sif.keep[si]) { var svv = numVal(sif.rows[si][0]); if (svv !== null) sifSum += svv; } return sifSum; }
    case "SUMIFS": { var sifs = filterCriteria(args[0], args.slice(1)); var sifsSum = 0; for (var sj = 0; sj < sifs.rows.length; sj++) if (sifs.keep[sj]) { var sv2 = numVal(sifs.rows[sj][0]); if (sv2 !== null) sifsSum += sv2; } return sifsSum; }
    case "COUNTIF": { var cif = filterCriteria(args[0], [args[0], args[1]]); return cif.keep.filter(Boolean).length; }
    case "COUNTIFS": { var cifs = filterCriteria(args[0], args); return cifs.keep.filter(Boolean).length; }
    case "AVERAGEIF": { var aif = filterCriteria(args[2] === undefined ? args[0] : args[2], [args[0], args[1]]); var aifVals = []; for (var ai = 0; ai < aif.rows.length; ai++) if (aif.keep[ai]) { var av = numVal(aif.rows[ai][0]); if (av !== null) aifVals.push(av); } return aifVals.length ? aifVals.reduce(function (x, y) { return x + y; }, 0) / aifVals.length : { __error: "#DIV/0!" }; }
    case "AVERAGEIFS": { var aifs = filterCriteria(args[0], args.slice(1)); var aifsVals = []; for (var aj = 0; aj < aifs.rows.length; aj++) if (aifs.keep[aj]) { var av2 = numVal(aifs.rows[aj][0]); if (av2 !== null) aifsVals.push(av2); } return aifsVals.length ? aifsVals.reduce(function (x, y) { return x + y; }, 0) / aifsVals.length : { __error: "#DIV/0!" }; }
    case "MAXIFS": case "MINIFS": {
      var mifs = filterCriteria(args[0], args.slice(1)), mvals = [];
      for (var mk = 0; mk < mifs.rows.length; mk++) if (mifs.keep[mk]) { var mv = numVal(mifs.rows[mk][0]); if (mv !== null) mvals.push(mv); }
      return mvals.length ? (fn === "MAXIFS" ? Math.max.apply(null, mvals) : Math.min.apply(null, mvals)) : 0;
    }

    /* ---------- dynamic arrays ---------- */
    case "FILTER": {
      var frows = rangeRows(args[0]), finc = flatArgs([args[1]]), fout = [];
      for (var fr = 0; fr < frows.length; fr++) if (boolVal(finc[fr])) fout = fout.concat(frows[fr]);
      if (!fout.length) return args[2] === undefined ? { __error: "#CALC!" } : args[2];
      return makeRange(fout, fout.length / (frows[0] ? frows[0].length : 1), frows[0] ? frows[0].length : 1);
    }
    case "SORT": case "SORTBY": {
      var srtRows = rangeRows(args[0]), sortIdx = fn === "SORT" ? (getNum(1) || 1) : 1, sortOrder = getNum(fn === "SORT" ? 2 : 2) || 1;
      var keys = fn === "SORT" ? null : flatArgs([args[1]]);
      srtRows.sort(function (x, y) {
        var xv = keys ? keys[srtRows.indexOf(x)] : x[sortIdx - 1];
        var yv = keys ? keys[srtRows.indexOf(y)] : y[sortIdx - 1];
        var xn = numVal(xv), yn = numVal(yv);
        if (xn !== null && yn !== null) return sortOrder === 1 ? xn - yn : yn - xn;
        return sortOrder === 1 ? String(xv).localeCompare(String(yv)) : String(yv).localeCompare(String(xv));
      });
      var srtOut = [];
      for (var sr = 0; sr < srtRows.length; sr++) srtOut = srtOut.concat(srtRows[sr]);
      return makeRange(srtOut, srtRows.length, srtRows[0] ? srtRows[0].length : 1);
    }
    case "UNIQUE": {
      var ur = rangeRows(args[0]), useen = {}, uout = [];
      for (var ui = 0; ui < ur.length; ui++) { var keyU = ur[ui].map(textVal).join("|"); if (!useen[keyU]) { useen[keyU] = 1; uout = uout.concat(ur[ui]); } }
      return makeRange(uout, uout.length / (ur[0] ? ur[0].length : 1), ur[0] ? ur[0].length : 1);
    }
    case "SEQUENCE": { var sqr = getNum(0) || 1, sqc = getNum(1) || 1, sqs = getNum(2) || 1, sqstep = getNum(3) || 1, sqout = []; for (var sq = 0; sq < sqr * sqc; sq++) sqout.push(sqs + sq * sqstep); return makeRange(sqout, sqr, sqc); }
    case "TAKE": { var tk = rangeRows(args[0]), tkn = getNum(1) || 1, tkout = []; for (var ti = 0; ti < Math.min(tkn, tk.length); ti++) tkout = tkout.concat(tk[ti]); return makeRange(tkout, Math.max(0, Math.min(tkn, tk.length)), tk[0] ? tk[0].length : 1); }
    case "DROP": { var dr = rangeRows(args[0]), drn = getNum(1) || 1, drout = []; for (var di = drn; di < dr.length; di++) drout = drout.concat(dr[di]); return makeRange(drout, Math.max(0, dr.length - drn), dr[0] ? dr[0].length : 1); }
    case "CHOOSECOLS": { var ccr = rangeRows(args[0]), ccols = args.slice(1).map(function (x) { return (numVal(x) || 1) - 1; }), ccout = []; for (var cri = 0; cri < ccr.length; cri++) for (var ccj = 0; ccj < ccols.length; ccj++) ccout.push(ccr[cri][ccols[ccj]]); return makeRange(ccout, ccr.length, ccols.length); }
    case "CHOOSEROWS": { var chr = rangeRows(args[0]), crows = args.slice(1).map(function (x) { return (numVal(x) || 1) - 1; }), chout = []; for (var chi = 0; chi < crows.length; chi++) chout = chout.concat(chr[crows[chi]]); return makeRange(chout, crows.length, chr[0] ? chr[0].length : 1); }
    case "VSTACK": { var vs = [], vsRows = 0, vsCols = 1; for (var vi = 0; vi < args.length; vi++) { var vr2 = rangeRows(args[vi]); vsRows += vr2.length; vsCols = Math.max(vsCols, vr2[0] ? vr2[0].length : 1); for (var vj = 0; vj < vr2.length; vj++) vs = vs.concat(vr2[vj]); } return makeRange(vs, vsRows, vsCols); }
    case "HSTACK": { var hsRows = rangeRows(args[0]), hsCols = 0, hs = []; for (var hi = 0; hi < hsRows.length; hi++) { hsCols = 0; for (var hj = 0; hj < args.length; hj++) { var hr2 = rangeRows(args[hj]); if (hr2[hi]) { hs = hs.concat(hr2[hi]); hsCols += hr2[hi].length; } } } return makeRange(hs, hsRows.length, hsCols); }
    case "TOCOL": { return flatArgs([args[0]]); }
    case "TOROW": { var trw = flatArgs([args[0]]); return makeRange(trw, 1, trw.length); }
    case "WRAPROWS": { var wr = flatArgs([args[0]]), wrc = getNum(1) || 1, wrRows = Math.ceil(wr.length / wrc); return makeRange(wr, wrRows, wrc); }
    case "WRAPCOLS": { var wc = flatArgs([args[0]]), wcCols = getNum(1) || 1, wcRows = Math.ceil(wc.length / wcCols), wcOut = []; for (var wci = 0; wci < wcRows; wci++) { var wcRow = []; for (var wcj = 0; wcj < wcCols; wcj++) { var wIdx = wcj * wcRows + wci; wcRow.push(wIdx < wc.length ? wc[wIdx] : null); } wcOut.push(wcRow); } return makeRange(wcOut, wcOut.length, wcCols); }
    case "EXPAND": { var ex = flatArgs([args[0]]), exR = getNum(1) || 1, exC = getNum(2) || 1, exPad = args[3] === undefined ? null : args[3], exSrcRows = rangeMeta(args[0]) ? rangeMeta(args[0]).rows : ex.length, exSrcCols = rangeMeta(args[0]) ? rangeMeta(args[0]).cols : 1, exOut = []; for (var exi = 0; exi < exR; exi++) { for (var exj = 0; exj < exC; exj++) { var exVal = null; if (exi < exSrcRows && exj < exSrcCols) { var exIdx = exi * exSrcCols + exj; exVal = ex[exIdx]; } exOut.push(exVal === null || exVal === undefined ? exPad : exVal); } } return makeRange(exOut, exR, exC); }

    /* ---------- financial ---------- */
    case "PMT": {
      var pr = getNum(0), pn = getNum(1), ppv = getNum(2), pfv = getNum(3) || 0, ptype = getNum(4) || 0;
      if (!pr) return -ppv / pn;
      var pfac = Math.pow(1 + pr, pn);
      return -(ppv * pfac + pfv) * pr / ((pfac - 1) * (ptype ? 1 + pr : 1));
    }
    case "FV": {
      var fr = getNum(0), fnp = getNum(1), fpmt = getNum(2), fpv = getNum(3) || 0, ftype = getNum(4) || 0;
      if (!fr) return -(fpv + fpmt * fnp);
      var ffac = Math.pow(1 + fr, fnp);
      return -(fpv * ffac + fpmt * (1 + fr * ftype) * (ffac - 1) / fr);
    }
    case "PV": {
      var pvr = getNum(0), pvn = getNum(1), pvpmt = getNum(2), pvfv = getNum(3) || 0, pvtype = getNum(4) || 0;
      if (!pvr) return -(pvfv + pvpmt * pvn);
      var pvfac = Math.pow(1 + pvr, pvn);
      return -(pvfv + pvpmt * (1 + pvr * pvtype) * (pvfac - 1) / pvr) / pvfac;
    }
    case "IPMT": {
      var ipr = getNum(0), iper = getNum(1), ipn = getNum(2), ippv = getNum(3);
      var ipmt = this.callFn("PMT", [ipr, ipn, ippv, getNum(4) || 0, getNum(5) || 0]);
      var ibal = this.callFn("FV", [ipr, iper - 1, ipmt, ippv, getNum(5) || 0]);
      return ibal * ipr;
    }
    case "PPMT": {
      var ppr = getNum(0), pper = getNum(1), ppn = getNum(2), pppv = getNum(3);
      return this.callFn("PMT", [ppr, ppn, pppv, getNum(4) || 0, getNum(5) || 0]) - this.callFn("IPMT", [ppr, pper, ppn, pppv, getNum(4) || 0, getNum(5) || 0]);
    }
    case "NPV": {
      var nr = getNum(0), ncf = numberList(args.slice(1)), npvSum = 0;
      for (var ni = 0; ni < ncf.length; ni++) npvSum += ncf[ni] / Math.pow(1 + nr, ni + 1);
      return npvSum;
    }
    case "XNPV": {
      var xr = getNum(0), xcf = flatArgs([args[1]]), xdates = flatArgs([args[2]]), xsum = 0;
      var xd0 = parseDateVal(xdates[0]);
      for (var xi2 = 0; xi2 < xcf.length; xi2++) { var xd = parseDateVal(xdates[xi2]); if (xd && xd0) xsum += numVal(xcf[xi2]) / Math.pow(1 + xr, (excelSerial(xd) - excelSerial(xd0)) / 365); }
      return xsum;
    }
    case "IRR": case "XIRR": {
      var flows = numberList([args[0]]), dates = fn === "XIRR" ? flatArgs([args[1]]) : null;
      var lo = -0.9999, hi = 10, rate = null;
      for (var it = 0; it < 100; it++) {
        var midr = (lo + hi) / 2, npvMid = 0;
        for (var fi = 0; fi < flows.length; fi++) {
          var tExp = fn === "IRR" ? fi : (parseDateVal(dates[fi]) ? (excelSerial(parseDateVal(dates[fi])) - excelSerial(parseDateVal(dates[0]))) / 365 : fi);
          npvMid += flows[fi] / Math.pow(1 + midr, tExp);
        }
        if (Math.abs(npvMid) < 0.000001) { rate = midr; break; }
        if (npvMid > 0) lo = midr; else hi = midr;
        rate = midr;
      }
      return rate;
    }
    case "RATE": {
      var rnper = getNum(0), rpmt = getNum(1), rpv = getNum(2), rfv = getNum(3) || 0, rtype = getNum(4) || 0;
      var rlo = -0.9999, rhi = 10, rrate = 0;
      for (var ri = 0; ri < 100; ri++) {
        rrate = (rlo + rhi) / 2;
        var rfvCalc = this.callFn("FV", [rrate, rnper, rpmt, rpv, rtype]);
        if (Math.abs(rfvCalc - rfv) < 0.000001) break;
        if (rfvCalc > rfv) rlo = rrate; else rhi = rrate;
      }
      return rrate;
    }
    case "NPER": {
      var npr = getNum(0), npmt = getNum(1), nppv = getNum(2), npfv = getNum(3) || 0, nptype = getNum(4) || 0;
      if (!npr) return -(nppv + npfv) / npmt;
      var npfac = npmt * (1 + npr * nptype) / npr;
      return Math.log((npfac - npfv) / (nppv + npfac)) / Math.log(1 + npr);
    }
    case "SLN": { var slc = getNum(0), sls = getNum(1), sll = getNum(2); return (slc - sls) / sll; }
    case "DB": { var dbc = getNum(0), dbs = getNum(1), dbl = getNum(2), dbp = getNum(3) || 1, dbf = getNum(4) || 2; var dbrate = 1 - Math.pow(dbs / dbc, 1 / dbl); var dbtotal = 0; for (var dbi = 1; dbi <= dbp; dbi++) { var dbdep = dbi === 1 ? dbc * dbrate : (dbc - dbtotal) * dbrate; if (dbi === dbl + 1) dbdep = (dbc - dbtotal) * dbrate * (12 - dbf) / 12; dbtotal += dbdep; } return dbdep; }
    case "DDB": { var ddc = getNum(0), dds = getNum(1), ddl = getNum(2), ddp = getNum(3) || 1, ddf = getNum(4) || 2; var ddtotal = 0; for (var ddi = 1; ddi <= ddp; ddi++) { var dddep = Math.min((ddc - ddtotal) * ddf / ddl, ddc - dds - ddtotal); ddtotal += dddep; } return dddep; }

    /* ---------- information ---------- */
    case "ISBLANK": {
      var ib = args[0];
      if (Array.isArray(ib)) { var ibo = ib.map(function (v) { return isBlankVal(v); }); if (ib._meta) ibo._meta = ib._meta; return ibo; }
      if (ib && typeof ib === "object" && ib.__ref) return ib.blank === true;
      return isBlankVal(ib);
    }
    case "ISNUMBER": { var inb = args[0]; if (Array.isArray(inb)) return inb.map(function (v) { return numVal(v) !== null; }); return numVal(inb) !== null; }
    case "ISTEXT": { var itx = args[0]; if (Array.isArray(itx)) return itx.map(function (v) { return typeof unwrapVal(v) === "string" && !isErrorVal(v); }); var itv = unwrapVal(itx); return typeof itv === "string" && !isErrorVal(itv); }
    case "ISNONTEXT": { var intx = args[0]; if (Array.isArray(intx)) return intx.map(function (v) { var u = unwrapVal(v); return typeof u !== "string"; }); var intv = unwrapVal(intx); return typeof intv !== "string"; }
    case "ISERROR": { var ier = args[0]; if (Array.isArray(ier)) return ier.map(isErrorVal); return isErrorVal(ier); }
    case "ISERR": { var ier2 = args[0]; if (Array.isArray(ier2)) return ier2.map(function (v) { return isErrorVal(v) && v.__error !== "#N/A"; }); return isErrorVal(ier2) && ier2.__error !== "#N/A"; }
    case "ISNA": { var ina = args[0]; if (Array.isArray(ina)) return ina.map(function (v) { return isErrorVal(v) && v.__error === "#N/A"; }); return isErrorVal(ina) && ina.__error === "#N/A"; }
    case "ISFORMULA": { var ifm = args[0]; if (ifm && ifm.__ref) { var ifraw = this.map[String(ifm.__ref).replace(/\$/g, "").toUpperCase()]; return typeof ifraw === "string" && ifraw.charAt(0) === "="; } return false; }
    case "ISLOGICAL": { var ilg = unwrapVal(args[0]); return typeof ilg === "boolean"; }
    case "TYPE": { var ty = unwrapVal(args[0]); if (isErrorVal(ty)) return 16; if (Array.isArray(args[0])) return 64; if (typeof ty === "boolean") return 4; if (numVal(ty) !== null) return 1; return 2; }
    case "CELL": { var cellInfo = getText(0).toLowerCase(); if (cellInfo === "format") return numVal(args[1]) !== null ? "$0.00" : "G"; return null; }
    case "INFO": return 0;
    case "ERROR.TYPE": { var et = args[0]; if (!isErrorVal(et)) return { __error: "#N/A" }; var emap = { "#NULL!": 1, "#DIV/0!": 2, "#VALUE!": 3, "#REF!": 4, "#NAME?": 5, "#NUM!": 6, "#N/A": 7 }; return emap[et.__error] || 7; }

    default: return null;
  }
};

function tokenize(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var ch = str[i];
    if (/\s/.test(ch)) { tokens.push({ type: "space" }); i++; continue; }
    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(str[i + 1] || ""))) {
      var numStr = "";
      while (i < str.length && /[0-9.]/.test(str[i])) { numStr += str[i]; i++; }
      tokens.push({ type: "num", value: parseFloat(numStr) });
      continue;
    }
    if (ch === '"') {
      var j = i + 1;
      var s = "";
      while (j < str.length && str[j] !== '"') { s += str[j]; j++; }
      tokens.push({ type: "str", value: s });
      i = j + 1;
      continue;
    }
    if (/[A-Za-z]/.test(ch)) {
      var k = i;
      while (k < str.length && /[A-Za-z0-9.]/.test(str[k])) k++;
      tokens.push({ type: "name", value: str.slice(i, k) });
      i = k;
      continue;
    }
    if ("+-*/^&(),:{};=<>!".indexOf(ch) !== -1) {
      if ((ch === ">" || ch === "<") && str[i + 1] === "=") { tokens.push({ type: "op", value: ch + "=" }); i += 2; continue; }
      if (ch === "=" && str[i + 1] === ">") { tokens.push({ type: "op", value: "<>" }); i += 2; continue; }
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }
    i++;
  }
  return tokens;
}

function computeFormula(formula, map) {
  return evaluateFormula(formula, map);
}

/* ---------------- Recently Viewed ---------------- */
function loadRecent() { try { var r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); return Array.isArray(r) ? r : []; } catch (e) { return []; } }
function saveRecent(arr) { try { localStorage.setItem(RECENT_KEY, JSON.stringify((arr || []).slice(0, 12))); } catch (e) {} }
function pushSearch(q) { q = (q || "").trim(); if (q.length < 2) { return; } recentSearches = recentSearches.filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); }); recentSearches.unshift(q); recentSearches = recentSearches.slice(0, 8); try { localStorage.setItem(SEARCH_KEY, JSON.stringify(recentSearches)); } catch (e) {} }
function pushRecent(fid) { recent = loadRecent(); var i = recent.indexOf(fid); if (i !== -1) recent.splice(i, 1); recent.unshift(fid); recent = recent.slice(0, 12); saveRecent(recent); }
function renderRecentList() { var holder = document.getElementById("recentList"); if (!holder) return; if (!recent || recent.length === 0) { holder.innerHTML = '<div class="empty-state"><h3>' + t("recentTitle") + "</h3><p>" + t("recentEmptyHint") + "</p></div>"; return; } var html = ""; for (var i = 0; i < recent.length; i++) { var rf = getFormula(recent[i]); if (!rf) continue; html += '<button class="sd-item" data-recent-fid="' + esc(rf.id) + '"><span class="sd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.3-4.3"></path></svg></span><span style="min-width:0;"><span class="sd-name">' + esc(rf.name) + '</span><span class="sd-desc">' + esc(tx(rf.purpose)) + '</span></span></button>'; } holder.innerHTML = html; }

/* ---------------- Related formulas ---------------- */
function getRelated(f) {
  var explicit = { VLOOKUP: ["XLOOKUP", "INDEX", "MATCH", "HLOOKUP"], XLOOKUP: ["VLOOKUP", "INDEX", "MATCH", "XMATCH"], INDEX: ["MATCH", "XLOOKUP", "VLOOKUP", "FILTER"], MATCH: ["INDEX", "XLOOKUP", "VLOOKUP", "XMATCH"], HLOOKUP: ["VLOOKUP", "INDEX", "MATCH"], XMATCH: ["INDEX", "MATCH", "XLOOKUP"], SUMIFS: ["SUMIF", "COUNTIFS", "AVERAGEIFS", "SUMPRODUCT"], SUMIF: ["SUMIFS", "COUNTIF", "COUNTIFS", "IF"], COUNTIFS: ["COUNTIF", "SUMIFS", "SUMIF", "COUNT"], AVERAGEIFS: ["AVERAGEIF", "AVERAGE", "SUMIF", "SUM"], SUMPRODUCT: ["SUM", "SUMIF", "INDEX", "MATCH"], IF: ["IFS", "AND", "OR", "COUNTIF"], IFS: ["IF", "FILTER", "SUMIFS"], FILTER: ["SORT", "UNIQUE", "XLOOKUP", "INDEX"], LET: ["LAMBDA", "MAP", "FILTER", "SUMIFS"], LAMBDA: ["LET", "MAP", "SCAN", "REDUCE"], MAP: ["LAMBDA", "REDUCE", "SCAN", "LET"], REDUCE: ["LAMBDA", "MAP", "SCAN", "LET"], SCAN: ["LAMBDA", "REDUCE", "MAP", "LET"], PMT: ["IPMT", "PPMT", "FV", "RATE"], IRR: ["XIRR", "NPV", "FV", "PMT"], XIRR: ["IRR", "NPV", "FV", "PMT"], RATE: ["IRR", "XIRR", "NPV", "PMT"], UNIQUE: ["FILTER", "SORT", "COUNTA", "TRIM"], SEQUENCE: ["FILTER", "SORT", "ROW", "INDEX"], TEXTJOIN: ["CONCAT", "LET", "LAMBDA", "TEXTSPLIT"], CONCAT: ["TEXTJOIN", "LET", "LAMBDA", "TEXTSPLIT"] };
  var rel = [];
  var seen = {};
  var names = explicit[f.name] || [];
  for (var i = 0; i < names.length; i++) { var rid = names[i]; var rf = getFormula(rid); if (rf && rf.id !== f.id && !seen[rf.id]) { rel.push(rf.id); seen[rf.id] = true; } }
  if (rel.length < 3) {
    var kws = ((f.name || "") + " " + (f.category || "") + " " + (f.level || "") + " " + (f.purpose ? f.purpose.en + " " + f.purpose.hi : "") + " " + (f.formula || "")).toLowerCase().split(/[^a-z0-9+]+/).filter(Boolean);
    var scored = [];
    for (var j = 0; j < FORMULAS.length; j++) { var of = FORMULAS[j]; if (of.id === f.id) continue; var onm = (of.name || "").toLowerCase(); var score = 0; for (var k = 0; k < kws.length; k++) { if (onm.indexOf(kws[k]) !== -1) score += 2; } if (of.category === f.category) score += 1; if (score > 0) scored.push({ id: of.id, score: score }); }
    scored.sort(function (a, b) { return b.score - a.score; });
    for (var s = 0; s < scored.length && rel.length < 4; s++) { if (!seen[scored[s].id]) { rel.push(scored[s].id); seen[scored[s].id] = true; } }
  }
  return rel.filter(function (id) { return getFormula(id); }).slice(0, 4);
}

function openFormulaDetail(fid) {
  var f = getFormula(fid); if (!f) return;
  pushRecent(fid);
  if (!document.querySelector('.formula-card[data-fid="' + fid + '"]')) {
    activeCat = null;
    levelFilter = "All";
    renderLevelFilters();
    renderCategories();
  }
  var catEl = document.getElementById("cat-" + f.category);
  if (catEl) { catEl.scrollIntoView({ behavior: "smooth", block: "start" }); }
  setTimeout(function () { var card = document.querySelector('.formula-card[data-fid="' + fid + '"]'); if (card) { card.classList.add("open"); } }, 420);
}

/* ---------------- Toast ---------------- */
function showToast(msg) { var el = document.getElementById("toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); } el.textContent = msg; el.classList.add("show"); clearTimeout(window._emiToastT); window._emiToastT = setTimeout(function () { el.classList.remove("show"); }, 2200); }

/* ---------------- Instant Search ---------------- */
let FORMULAS_INDEX = [];
const SEARCH_SYNONYMS = {
  UNIQUE: "duplicate duplicates remove dedupe clean repeated same value",
  COUNTIF: "attendance present absent count status employee",
  COUNTIFS: "multiple criteria attendance present status",
  SUMIF: "total condition criteria",
  SUMIFS: "total multiple conditions criteria",
  AVERAGEIF: "average condition criteria",
  AVERAGEIFS: "average multiple conditions criteria",
  VLOOKUP: "lookup find search master merge combine join",
  XLOOKUP: "lookup find search master merge combine join modern",
  INDEX: "lookup position row column",
  MATCH: "lookup position find row",
  XMATCH: "lookup position find row modern",
  HLOOKUP: "lookup horizontal find search",
  TEXTJOIN: "combine merge join names concatenate",
  CONCAT: "combine merge join concatenate",
  IF: "pending status condition decision",
  IFS: "pending multiple status condition",
  LARGE: "highest top rank maximum best seller topper",
  MAX: "highest top maximum best",
  MIN: "lowest minimum smallest",
  TRIM: "clean extra spaces text",
  FILTER: "extract filter list condition",
  SORT: "order arrange sort",
  SORTBY: "order arrange sort",
  SUM: "total add plus",
  AVERAGE: "average mean",
  PMT: "loan emi payment installment",
  IRR: "return investment rate",
  XIRR: "return investment rate irregular",
  LET: "variable complex formula",
  LAMBDA: "custom function reusable",
  ROUND: "round decimal number",
  TODAY: "current date today",
  NOW: "current date time now"
};
function editDistance(a, b) {
  if (a === b) { return 0; }
  var m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) { return 99; }
  var prev = [], cur = [], i, j;
  for (j = 0; j <= n; j++) { prev[j] = j; }
  for (i = 1; i <= m; i++) {
    cur[0] = i;
    for (j = 1; j <= n; j++) {
      var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    var swap = prev; prev = cur; cur = swap;
  }
  return prev[n];
}
function buildFormulasIndex() { var arr = []; for (var i = 0; i < FORMULAS.length; i++) { var f = FORMULAS[i]; var syn = SEARCH_SYNONYMS[f.id] || ""; var hay = ((f.name || "") + " " + (f.id || "") + " " + (f.category || "") + " " + (f.level || "") + " " + (f.purpose ? f.purpose.en + " " + f.purpose.hi : "") + " " + (f.syntax ? f.syntax.en : "") + " " + (f.formula || "") + " " + (f.office ? f.office.en + " " + f.office.hi : "") + " " + syn).toLowerCase(); var tokens = hay.split(/[^a-z0-9+]+/).filter(Boolean); arr.push({ f: f, hay: hay, tokens: tokens }); } return arr; }
function searchIndex(q) {
  var tokens = (q || "").toLowerCase().split(/[^a-z0-9+]+/).filter(Boolean);
  var out = { best: null, formulas: [], solutions: [], related: [] };
  if (tokens.length === 0) { return out; }
  var scored = [];
  for (var i = 0; i < FORMULAS.length; i++) {
    var e = FORMULAS_INDEX[i];
    var score = 0;
    for (var t = 0; t < tokens.length; t++) {
      var tok = tokens[t];
      if (e.tokens.indexOf(tok) !== -1) { score += 3; continue; }
      var matched = false;
      if (tok.length >= 3) {
        for (var et = 0; et < e.tokens.length; et++) {
          var cand = e.tokens[et];
          if (cand.indexOf(tok) === 0 || tok.indexOf(cand) === 0) { score += 2; matched = true; break; }
        }
      }
      if (!matched && tok.length >= 4) {
        var limit = tok.length <= 6 ? 1 : 2;
        for (var ft = 0; ft < e.tokens.length; ft++) {
          if (Math.abs(e.tokens[ft].length - tok.length) <= limit && editDistance(tok, e.tokens[ft]) <= limit) { score += 1; break; }
        }
      }
    }
    var nm = (e.f.name || "").toLowerCase();
    for (var t2 = 0; t2 < tokens.length; t2++) {
      if (nm.indexOf(tokens[t2]) === 0) { score += 4; } else if (nm.indexOf(tokens[t2]) > 0) { score += 2; }
    }
    if (score > 0) { scored.push({ e: e, score: score }); }
  }
  scored.sort(function (a, b) { return b.score - a.score; });
  var bestEntry = scored[0] || null;
  if (bestEntry) { out.best = bestEntry.e.f; out.formulas = scored.slice(0, 6).map(function (x) { return x.e.f; }); out.related = getRelated(bestEntry.e.f); }
  var solScored = []; for (var p = 0; p < PROJECTS.length; p++) { var pr = PROJECTS[p]; var phay = ((pr.titleEn || "") + " " + (pr.descEn || "") + " " + (pr.roleEn || "") + " " + ((pr.formulas || []).join(" "))).toLowerCase(); var pscore = 0; for (var t3 = 0; t3 < tokens.length; t3++) { if (phay.indexOf(tokens[t3]) !== -1) pscore += 2; } if (pscore > 0) solScored.push({ pr: pr, pscore: pscore }); }
  solScored.sort(function (a, b) { return b.pscore - a.pscore; });
  for (var s2 = 0; s2 < solScored.length && out.solutions.length < 3; s2++) { var sol = solScored[s2]; var target = null; var bestSc = -1; for (var fidx = 0; fidx < sol.pr.formulas.length; fidx++) { var tf = getFormula(sol.pr.formulas[fidx]); if (!tf) continue; var tsc = 0; for (var t4 = 0; t4 < tokens.length; t4++) { if ((tf.name || "").toLowerCase().indexOf(tokens[t4]) !== -1) tsc += 2; } if (tsc > bestSc) { bestSc = tsc; target = tf; } } if (target) { out.solutions.push(target); } }
  return out;
}

function renderSearchDrop(q, dropId) {
  var target = document.getElementById(dropId) || document.getElementById("searchDrop");
  if (!target) return;
  target.hidden = false;
  var results = searchIndex(q);
  if (q === "") {
    var html = '<div class="sd-head"><span>' + t("recentSearched") + "</span></div><div class=\"sd-list\">";
    if (!recentSearches || recentSearches.length === 0) { html += '<div class="sd-empty">' + t("recentSearchEmpty") + "</div>"; }
    for (var i = 0; i < (recentSearches || []).length; i++) {
      html += '<button class="sd-item" data-sd-query="' + esc(recentSearches[i]) + '"><span class="sd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg></span><span style="min-width:0;"><span class="sd-name">' + esc(recentSearches[i]) + '</span><span class="sd-desc">' + t("searchAgain") + "</span></span></button>";
    }
    html += "</div>";
    target.innerHTML = html;
    return;
  }
  var html = "";
  if (results.best) { html += '<div class="sd-head"><span>' + t("bestMatch") + "</span><button class=\"sd-clearall\" data-sd-clear>" + t("clear") + "</button></div><div class=\"sd-list\"><button class=\"sd-item\" data-sd-open=\"" + esc(results.best.id) + "\"><span class=\"sd-ico\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"></path></svg></span><span style=\"min-width:0;\"><span class=\"sd-name\">" + esc(results.best.name) + "</span><span class=\"sd-desc\">" + esc(tx(results.best.purpose)) + "</span></span></button></div>"; }
  if (results.formulas.length) { html += '<div class="sd-head"><span>' + t("formulaResults") + "</span></div><div class=\"sd-list\">"; for (var fi = 0; fi < results.formulas.length; fi++) { var ff = results.formulas[fi]; html += '<button class="sd-item" data-sd-open="' + esc(ff.id) + '"><span class="sd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg></span><span style="min-width:0;"><span class="sd-name">' + esc(ff.name) + "</span><span class=\"sd-desc\">" + esc(tx(ff.purpose)) + "</span></span><span class=\"sd-cat\">" + esc(ff.level || "") + "</span></button>"; } html += "</div>"; }
  if (results.solutions.length) { html += '<div class="sd-head"><span>' + t("practicalSolutions") + "</span></div><div class=\"sd-list\">"; for (var si = 0; si < results.solutions.length; si++) { var sf = results.solutions[si]; html += '<button class="sd-item" data-sd-open="' + esc(sf.id) + '"><span class="sd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M3 15h18"></path></svg></span><span style="min-width:0;"><span class="sd-name">' + esc(sf.name) + "</span><span class=\"sd-desc\">" + esc(tx(sf.office)) + "</span></span><span class=\"sd-cat\">" + esc(sf.level || "") + "</span></button>"; } html += "</div>"; }
  if (results.related && results.related.length) { html += '<div class="sd-head"><span>' + t("relatedTopics") + "</span></div><div class=\"sd-list\">"; for (var ri = 0; ri < results.related.length; ri++) { var rf2 = getFormula(results.related[ri]); if (!rf2) continue; html += '<button class="sd-item" data-sd-open="' + esc(rf2.id) + '"><span class="sd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle></svg></span><span style="min-width:0;"><span class="sd-name">' + esc(rf2.name) + "</span><span class=\"sd-desc\">" + esc(tx(rf2.purpose)) + "</span></span><span class=\"sd-cat\">" + esc(rf2.level || "") + "</span></button>"; } html += "</div>"; }
  if (html === "") {
    html = '<div class="sd-head"><span>' + t("noResults") + '</span><button class="sd-clearall" data-sd-clear>' + t("clear") + '</button></div><div class="sd-empty">' + t("noResults") + "</div>";
  }
  target.innerHTML = html;
}
/* ---------------- AI Instructor ---------------- */
const AI_INTENTS = [
  { id: "dup", keys: ["duplicate", "dupli", "repeat", "repeated", "same value", "dedupe", "clean", "remove dup"], problem: { en: "You want to find and remove duplicate rows or values in your Excel sheet.", hi: "Aapko apne Excel sheet me duplicate rows ya values dhoone aur remove karni hai." }, formulaName: "UNIQUE", syntax: "=UNIQUE(range)", dataset: { cells: "A2:A20", values: "Apple, Apple, Mango, Apple, Banana", inputs: [{ ref: "A2", value: "Apple" }, { ref: "A3", value: "Apple" }, { ref: "A4", value: "Mango" }, { ref: "A5", value: "Apple" }, { ref: "A6", value: "Banana" }] }, actual: "=UNIQUE(A2:A6)", output: "[Apple, Mango, Banana]", steps: { en: ["Identify the range with duplicates.", "Add UNIQUE at the top of the list.", "UNIQUE spills the unique values down."], hi: ["Duplicate wali range pehle identify karo.", "List ke upar UNIQUE add karo.", "UNIQUE unique values neeche spill karega."] }, alternatives: [{ name: "COUNTIF", en: "Use COUNTIF to flag duplicates before removing.", hi: "Remove se pehle COUNTIF se duplicates flag karo." }], mistakes: [{ en: "Forgetting to select the full range.", hi: "Poori range select na karna." }], related: ["UNIQUE", "COUNTIF", "IF", "TRIM"], office: { en: "Data cleaning in MIS reports before merging or reporting.", hi: "MIS reports me merge ya report se pehle data cleaning karo." } },
  { id: "attendance", keys: ["attendance", "present", "absent", "hr", "employee", "staff", "count present", "percentage"], formulaName: "COUNTIF", syntax: "=COUNTIF(range, criteria)", dataset: { cells: "B2:B8", values: "P, A, P, P, A, P, P", inputs: [{ ref: "B2", value: "P" }, { ref: "B3", value: "A" }, { ref: "B4", value: "P" }, { ref: "B5", value: "P" }, { ref: "B6", value: "A" }, { ref: "B7", value: "P" }, { ref: "B8", value: "P" }] }, actual: "=COUNTIF(B2:B8, \"P\")", output: "5", steps: { en: ["List attendance per employee.", "Use COUNTIF to count present values.", "Divide present by total working days."], hi: ["Employee ke attendance list karo.", "COUNTIF se present count karo.", "Present / total working days karke percentage nikaalo."] }, alternatives: [{ name: "COUNTA", en: "Use COUNTA to count all marked cells.", hi: "Saare mark ki hui cells ko count karne ke liye COUNTA use karo." }], mistakes: [{ en: "Forgetting the criteria text.", hi: "Criteria text bhoolna." }], related: ["COUNTIF", "COUNTA", "AVERAGE", "IF"], office: { en: "HR MIS calculates attendance percentage per employee.", hi: "HR MIS employee ke attendance percentage nikaata hai." } },
  { id: "mastersheet", keys: ["master", "combine", "consolidate", "multiple sheet", "sheet", "join", "merge"], formulaName: "XLOOKUP", syntax: "=XLOOKUP(value, lookup_array, return_array)", dataset: { cells: "Sheet2!A2:B10", values: "Emp, Sales", inputs: [{ ref: "Sheet2!A2", value: "Ravi" }, { ref: "Sheet2!B2", value: "12000" }] }, actual: "=XLOOKUP(A2, Sheet2!A:A, Sheet2!B:B)", output: "12000", steps: { en: ["Keep all sheets ready.", "Use XLOOKUP to pull the value from the master sheet.", "Copy the formula across rows."], hi: ["Saare sheets tayyar rakho.", "Master sheet se value nikalne ke liye XLOOKUP use karo.", "Formula rows tak copy karo."] }, alternatives: [{ name: "VLOOKUP", en: "Use VLOOKUP when the lookup column must be first.", hi: "Jab lookup column pehla ho to VLOOKUP use karo." }], mistakes: [{ en: "Referencing the wrong sheet name.", hi: "Galat sheet name use karna." }], related: ["VLOOKUP", "INDEX", "MATCH", "XLOOKUP"], office: { en: "MIS builds a master sheet by combining regional sheets.", hi: "MIS regional sheets ko combine karke master sheet banata hai." } },
  { id: "highest", keys: ["highest", "top", "max sales", "best seller", "maximum", "leader", "topper"], formulaName: "LARGE", syntax: "=LARGE(array, k)", dataset: { cells: "C2:C10", values: "12000, 9800, 15000, 8700, 14300, 9200, 11200, 13400, 7600", inputs: [{ ref: "C2", value: "12000" }, { ref: "C3", value: "9800" }, { ref: "C4", value: "15000" }, { ref: "C5", value: "8700" }] }, actual: "=LARGE(C2:C100, 1)", output: "15000", steps: { en: ["List all sales values.", "Use LARGE with k = 1 for the highest.", "Use k = 2 for second highest."], hi: ["Saare sales values list karo.", "Sabse badi value ke liye LARGE use karo (k=1).", "Doosri value ke liye k=2 use karo."] }, alternatives: [{ name: "MAX", en: "Use MAX for the single highest value.", hi: "Sabse badi value ke liye MAX use karo." }], mistakes: [{ en: "Using wrong k value.", hi: "Galat k value use karna." }], related: ["LARGE", "MAX", "INDEX", "MATCH"], office: { en: "Sales leadership reports rank top performers.", hi: "Sales leadership reports top performers ko rank karta hai." } },
  { id: "pending", keys: ["pending", "order", "status", "delivery", "invoice"], formulaName: "IF", syntax: "=IF(logical_test, value_if_true, value_if_false)", dataset: { cells: "D2:D20", values: "Delivered, Pending, Delivered, Pending", inputs: [{ ref: "D2", value: "Delivered" }, { ref: "D3", value: "Pending" }] }, actual: "=IF(D2=\"Delivered\", \"Yes\", \"No\")", output: "Yes", steps: { en: ["Categorize each order status.", "Use IF to return values.", "Count pending with COUNTIF."], hi: ["Har order status categorize karo.", "IF se values return karo.", "Pending ko COUNTIF se ginti karo."] }, alternatives: [{ name: "COUNTIFS", en: "Use COUNTIFS for multiple statuses.", hi: "Doosron status ke liye COUNTIFS use karo." }], mistakes: [{ en: "Forgetting the text quotes.", hi: "Text quotes bhoolna." }], related: ["IF", "COUNTIF", "COUNTIFS", "AVERAGE"], office: { en: "MIS tracks pending order percentages.", hi: "MIS pending order percentages track karta hai." } },
  { id: "indexmatch", keys: ["index", "match", "vlookup", "xlookup", "lookup"], formulaName: "INDEX", syntax: "=INDEX(array, row_num, [col_num])", dataset: { cells: "A2:B10", values: "Emp, Sales", inputs: [{ ref: "A2", value: "Ravi" }, { ref: "B2", value: "12000" }] }, actual: "=INDEX(B2:B10, MATCH(A2, A2:A10, 0))", output: "12000", steps: { en: ["Find the row with the lookup value.", "Use MATCH to get the row number.", "Use INDEX to return the value."], hi: ["Lookup value wala row dhojo.", "MATCH se row number nikaalo.", "INDEX se value nikaalo."] }, alternatives: [{ name: "XLOOKUP", en: "Use XLOOKUP as the modern single-function replacement.", hi: "Modern single function replacement ke liye XLOOKUP use karo." }], mistakes: [{ en: "Mixing up row and column arguments.", hi: "Row aur column arguments kharab use karna." }], related: ["XLOOKUP", "VLOOKUP", "INDEX", "MATCH"], office: { en: "Legacy MIS dashboards often use INDEX + MATCH.", hi: "Purane MIS dashboards me INDEX + MATCH use karte hain." } }
];
function answerForQuery(q) {
  var ql = (q || "").toLowerCase();
  var best = null; var bestScore = 0;
  for (var i = 0; i < AI_INTENTS.length; i++) { var intent = AI_INTENTS[i]; var score = 0; for (var k = 0; k < intent.keys.length; k++) { if (ql.indexOf(intent.keys[k]) !== -1) { score += 1; } } if (score > bestScore) { bestScore = score; best = intent; } }
  return best;
}
function aiLangPick(obj) {
  if (!obj) { return ""; }
  if (aiLang === "en") { return obj.en || obj.hi || ""; }
  return obj.hi || obj.en || "";
}
function aiAnswerPlain(ans) {
  if (!ans || ans.fallback || !ans.formulaName) { return ""; }
  var lines = [];
  lines.push("A. Problem Understanding: " + aiLangPick(ans.problem));
  lines.push("B. Recommended Formula: " + ans.formulaName);
  lines.push("C. Formula Syntax: " + (ans.syntax || ""));
  if (ans.dataset) { lines.push("D. Example Dataset: " + ans.dataset.cells + " | " + ans.dataset.values); }
  lines.push("E. Actual Formula: " + (ans.actual || ""));
  lines.push("F. Expected Output: " + (ans.output || ""));
  var st = aiLangPick(ans.steps) || [];
  lines.push("G. Step-by-Step:\n- " + st.join("\n- "));
  if (ans.alternatives && ans.alternatives.length) {
    lines.push("H. Alternative Methods:\n- " + ans.alternatives.map(function (a) { return a.name + ": " + aiLangPick(a); }).join("\n- "));
  }
  if (ans.mistakes && ans.mistakes.length) {
    lines.push("I. Common Mistakes:\n- " + ans.mistakes.map(function (a) { return aiLangPick(a); }).join("\n- "));
  }
  if (ans.related && ans.related.length) { lines.push("J. Related Formulas: " + ans.related.join(", ")); }
  lines.push("K. Practical Office Application: " + aiLangPick(ans.office));
  return lines.join("\n");
}
function aiCopyAnswer(idx) {
  var m = aiMessages[parseInt(idx, 10)];
  if (!m || !m.answer) { return; }
  copyText(aiAnswerPlain(m.answer)).then(function (ok) { showToast(ok ? t("aiCopied") : t("copyFailed")); });
}
function renderAIMessages() {
  var holder = document.getElementById("aiMessages");
  if (!holder) { return; }
  var html = "";
  for (var i = 0; i < aiMessages.length; i++) {
    var m = aiMessages[i];
    if (m.role === "user") {
      html += '<div class="ai-msg user"><div class="ai-msg-head"><b>' + t("aiYou") + '</b></div><div>' + esc(m.text) + "</div></div>";
      continue;
    }
    var ans = m.answer;
    if (!ans) {
      var introHint = aiLang === "en"
        ? "Describe your Excel task, or pick a suggestion below. I will show the problem, formula, dataset, steps and office use."
        : "Apna Excel task likho ya neeche suggestion chuno. Main problem, formula, dataset, steps aur office use bataunga.";
      html += '<div class="ai-msg bot"><div class="ai-msg-head"><b>AI Instructor</b></div><div>' + esc(t("aiIntro")) + '</div><div class="ai-sec"><p>' + esc(introHint) + "</p></div></div>";
      continue;
    }
    var body = "";
    if (ans.fallback) {
      body += '<div class="ai-sec"><h5>A. Problem Understanding</h5><p>' + esc(aiLangPick(ans.problem)) + "</p></div>";
      body += '<div class="ai-sec"><h5>B. Recommended Formula</h5><p>' + esc(aiLangPick(ans.hint)) + "</p></div>";
      html += '<div class="ai-msg bot"><div class="ai-msg-head"><b>AI Instructor</b></div>' + body + "</div>";
      continue;
    }
    body += '<div class="ai-sec"><h5>A. Problem Understanding</h5><p>' + esc(aiLangPick(ans.problem)) + "</p></div>";
    var base = getFormula(ans.formulaName);
    body += '<div class="ai-sec"><h5>B. Recommended Formula</h5><div class="ai-formula">' + esc(ans.formulaName || "") + "</div>";
    if (base) { body += '<div class="ai-related"><button data-ai-open="' + esc(base.id) + '">Open ' + esc(base.name) + " guide</button></div>"; }
    body += "</div>";
    body += '<div class="ai-sec"><h5>C. Formula Syntax</h5><pre class="code">' + esc(ans.syntax || "") + "</pre></div>";
    if (ans.dataset) {
      body += '<div class="ai-sec"><h5>D. Example Dataset</h5><p><b>Cells:</b> ' + esc(ans.dataset.cells) + "</p><p><b>Values:</b> " + esc(ans.dataset.values) + "</p></div>";
    }
    body += '<div class="ai-sec"><h5>E. Actual Formula</h5><pre class="code">' + esc(ans.actual || "") + "</pre></div>";
    body += '<div class="ai-sec"><h5>F. Expected Output</h5><p><b>' + esc(ans.output || "") + "</b></p></div>";
    var steps = aiLangPick(ans.steps) || [];
    if (steps.length) {
      var stepHtml = "";
      for (var si2 = 0; si2 < steps.length; si2++) { stepHtml += "<li>" + esc(steps[si2]) + "</li>"; }
      body += '<div class="ai-sec"><h5>G. Step-by-Step</h5><ul>' + stepHtml + "</ul></div>";
    }
    if (ans.alternatives && ans.alternatives.length) {
      var altHtml = "";
      for (var ai = 0; ai < ans.alternatives.length; ai++) { altHtml += '<li><b>' + esc(ans.alternatives[ai].name) + ":</b> " + esc(aiLangPick(ans.alternatives[ai])) + "</li>"; }
      body += '<div class="ai-sec"><h5>H. Alternative Methods</h5><ul>' + altHtml + "</ul></div>";
    }
    if (ans.mistakes && ans.mistakes.length) {
      var misHtml = "";
      for (var mi = 0; mi < ans.mistakes.length; mi++) { misHtml += "<li>" + esc(aiLangPick(ans.mistakes[mi])) + "</li>"; }
      body += '<div class="ai-sec"><h5>I. Common Mistakes</h5><ul>' + misHtml + "</ul></div>";
    }
    if (ans.related && ans.related.length) {
      var relHtml = "";
      for (var r = 0; r < ans.related.length; r++) { var rf = getFormula(ans.related[r]); if (!rf) { continue; } relHtml += '<button data-ai-open="' + esc(rf.id) + '">' + esc(rf.name) + "</button>"; }
      if (relHtml) { body += '<div class="ai-sec"><h5>J. Related Formulas</h5><div class="ai-related">' + relHtml + "</div></div>"; }
    }
    body += '<div class="ai-sec"><h5>K. Practical Office Application</h5><p>' + esc(aiLangPick(ans.office)) + "</p></div>";
    var ver = base ? base.version : "Excel 2019 / Microsoft 365";
    var verNote = base && base.m365 ? "Microsoft 365 / Excel 2021 or newer recommended." : "Works in Excel 2007 and later unless noted.";
    body += '<div class="ai-sec"><h5>Version &amp; Errors</h5><p><b>Compatibility:</b> ' + esc(ver) + " · " + esc(verNote) + "</p><p><b>Watch for errors:</b> #N/A (value not found), #VALUE! (wrong argument type), #REF! (deleted or invalid range), #SPILL! (blocked spill range).</p></div>";
    body += '<div class="ai-actions"><button type="button" data-ai-copy="' + i + '">' + t("aiCopy") + ' answer</button><button type="button" data-ai-fb="up">' + t("aiYes") + '</button><button type="button" data-ai-fb="down">' + t("aiNo") + "</button></div>";
    html += '<div class="ai-msg bot"><div class="ai-msg-head"><b>AI Instructor</b></div>' + body + "</div>";
  }
  holder.innerHTML = html;
  holder.scrollTop = holder.scrollHeight;
}
function closeSearchDrop() { var d = document.getElementById("searchDrop"); if (d) { d.hidden = true; } var d2 = document.getElementById("heroDrop"); if (d2) { d2.hidden = true; } }
function runSearchQuery(q, dropId, record) { if (record && q) { pushSearch(q); } renderSearchDrop(q, dropId); var input = document.getElementById(dropId === "searchDrop" ? "searchInput" : "heroSearch"); if (input) { input.value = q; } }
function wireSearchInput(input, dropId) { var drop = document.getElementById(dropId); if (!input || !drop) { return; } var state = { items: [], idx: -1 }; window._emiSearchState = state; input.addEventListener("input", function () { clearTimeout(window._emiSearchTimer); window._emiSearchTimer = setTimeout(function () { var q = input.value.trim(); renderSearchDrop(q, dropId); state.items = []; state.idx = -1; if (drop && !drop.hidden) { var btns = drop.querySelectorAll(".sd-item"); state.items = Array.prototype.slice.call(btns); } }, 160); }); input.addEventListener("keydown", function (e) { if (!drop || drop.hidden) { return; } var items = state.items; if (e.key === "ArrowDown") { e.preventDefault(); if (state.idx < items.length - 1) { state.idx++; } renderActiveItem(state, drop); } else if (e.key === "ArrowUp") { e.preventDefault(); if (state.idx > 0) { state.idx--; } renderActiveItem(state, drop); } else if (e.key === "Enter") { e.preventDefault(); var pick = (state.idx >= 0 && state.idx < items.length) ? items[state.idx] : (items.length ? items[0] : null); var fid = pick ? pick.getAttribute("data-sd-open") : null; var sqv = pick ? pick.getAttribute("data-sd-query") : null; if (fid) { pushSearch(input.value.trim()); closeSearchDrop(); openFormulaDetail(fid); } else if (sqv) { var thisInput = document.getElementById(dropId === "searchDrop" ? "searchInput" : "heroSearch"); if (thisInput) { thisInput.value = sqv; } runSearchQuery(sqv, dropId, true); } else { closeSearchDrop(); runSearchQuery(input.value.trim(), dropId, true); } } else if (e.key === "Escape") { closeSearchDrop(); } }); }
function renderActiveItem(st, d) { if (st.idx >= 0 && st.idx < st.items.length) { var it = st.items[st.idx]; if (it) { it.classList.add("active"); } } if (st.idx - 1 >= 0 && st.items[st.idx - 1]) { st.items[st.idx - 1].classList.remove("active"); } if (st.idx + 1 < st.items.length && st.items[st.idx + 1]) { st.items[st.idx + 1].classList.remove("active"); } }
function openHelp() { helpOpen = true; var m = document.getElementById("helpModal"); if (m) { m.hidden = false; } }
function closeHelp() { helpOpen = false; var m = document.getElementById("helpModal"); if (m) { m.hidden = true; } }
function openWelcome() { welcomeOpen = true; var m = document.getElementById("welcomeModal"); if (m) { m.hidden = false; } }
function closeWelcome() { welcomeOpen = false; var m = document.getElementById("welcomeModal"); if (m) { m.hidden = true; } }
function openRecent() { recentOpen = true; var p = document.getElementById("recentPanel"); if (p) { p.hidden = false; } renderRecentList(); }
function closeRecent() { recentOpen = false; var p = document.getElementById("recentPanel"); if (p) { p.hidden = true; } }
function quickSearch() { var inp = document.getElementById("heroSearch"); if (inp) { inp.focus(); } }
function backTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

function openAI() { aiOpen = true; document.getElementById("aiPanel").hidden = false; document.getElementById("aiFab").setAttribute("aria-expanded", "true"); if (!aiMessages.length) { aiMessages.push({ role: "bot", answer: null }); } renderAIMessages(); }
function closeAI() { aiOpen = false; document.getElementById("aiPanel").hidden = true; document.getElementById("aiFab").setAttribute("aria-expanded", "false"); }
function setAILang(l) { aiLang = l; renderAIMessages(); }
function clearAI() { aiMessages = [{ role: "bot", answer: null }]; renderAIMessages(); }
function renderAISuggestions() { var s = document.getElementById("aiSuggestions"); if (!s) { return; } var qs = [ { label: "Find duplicate values", q: "Mujhe Excel mein duplicate values find karni hain." }, { label: "Attendance percentage", q: "How can I calculate employee attendance percentage?" }, { label: "Combine sheets into master", q: "Mere paas 3 sheets hain, mujhe ek master sheet banani hai." }, { label: "Highest sales employee", q: "I want to find the highest sales employee." } ]; var html = ""; for (var i = 0; i < qs.length; i++) { html += '<button class="ai-sugg-btn" data-ai-q="' + i + '">' + esc(qs[i].label) + "</button>"; } s.innerHTML = html; }
function aiAsk(idx) { var qs = [ "Mujhe Excel mein duplicate values find karni hain.", "How can I calculate employee attendance percentage?", "Mere paas 3 sheets hain, mujhe ek master sheet banani hai.", "I want to find the highest sales employee." ]; var q = qs[parseInt(idx, 10)]; if (q) { var inp = document.getElementById("aiInput"); if (inp) { inp.value = q; } aiSend(); } }
function aiSend() { var inp = document.getElementById("aiInput"); var text = (inp ? inp.value : "").trim(); if (!text) { return; } aiMessages.push({ role: "user", text: text }); var ans = answerForQuery(text); if (!ans) { ans = { fallback: true, problem: { en: "I could not match that request to a formula in my local knowledge base exactly.", hi: "Main is request ko apne local knowledge base ke kisi formula se exactly match nahi kar paaya." }, hint: { en: "To guide you correctly, please add the formula name, the columns involved, or the result you expect. For example: 'find duplicate values in a column' or 'calculate attendance percentage'.", hi: "Sahi guidance ke liye formula ka naam, columns, ya expected result batao. Jaise: 'column me duplicate values find karo' ya 'attendance percentage nikaalo'." } }; } aiMessages.push({ role: "bot", answer: ans }); if (inp) { inp.value = ""; } renderAIMessages(); }
function aiPick(el) { var fid = el ? el.getAttribute("data-ai-open") : null; if (fid) { closeAI(); openFormulaDetail(fid); } }

function bindHeroSearch() {
  var inp = document.getElementById("heroSearch");
  if (inp) { inp.addEventListener("input", function () { clearTimeout(window._emiSearchTimer); window._emiSearchTimer = setTimeout(function () { runSearchQuery(inp.value.trim(), "heroDrop"); }, 250); }); }
  var go = document.getElementById("heroSearchGo");
  if (go) { go.addEventListener("click", function () { clearTimeout(window._emiSearchTimer); runSearchQuery(document.getElementById("heroSearch").value.trim(), "heroDrop", true); }); }
  var clr = document.getElementById("heroSearchClear");
  if (clr) { clr.addEventListener("click", function () { var i2 = document.getElementById("heroSearch"); if (i2) i2.value = ""; runSearchQuery("", "heroDrop"); }); }
}

function resetProgress() {
  try { localStorage.setItem(PROG_KEY, JSON.stringify({})); } catch (e) {}
  prog = {};
  updateProgressUI();
  renderCategories();
  renderBookmarks();
}

function renderAll() {
  updateProgressUI();
  renderSidebar();
  renderLevelFilters();
  renderHeroStats();
  renderCategories();
  renderBookmarks();
  renderRecentList();
  renderAISuggestions();
  renderAIMessages();
  var sel = document.getElementById("pgFormula");
  if (sel && sel.options.length && sel.value) { renderPG(); }
}

function setLang(newLang) {
  lang = newLang;
  document.body.setAttribute("data-lang", lang);
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  var btn = document.getElementById("langToggle");
  if (btn) btn.textContent = lang === "hi" ? "English" : "Hindi";
  renderAll();
  renderComparisons();
  renderProjects();
  renderCompatibility();
  renderPlayground();
  renderPG();
  var content = document.getElementById("content");
  if (content && content.querySelector(".cat-card")) { content.querySelector(".cat-card").scrollIntoView({ behavior: "smooth" }); }
}

function updateProgressUI() {
  var total = FORMULAS.length;
  var doneCount = 0;
  for (var i = 0; i < FORMULAS.length; i++) { if (prog[FORMULAS[i].id]) doneCount++; }
  var pct = total ? Math.round((doneCount / total) * 100) : 0;
  var pill = document.getElementById("progressText");
  if (pill) pill.textContent = pct + "%";
  var bar = document.getElementById("progressBar");
  if (bar) { bar.style.width = pct + "%"; }
}

function toggleComplete(id) {
  prog[id] = !prog[id];
  if (!prog[id]) delete prog[id];
  try { localStorage.setItem(PROG_KEY, JSON.stringify(prog)); } catch (e) {}
  updateProgressUI();
  renderCategories();
}

function toggleFav(id) {
  var idx = favs.indexOf(id);
  if (idx === -1) favs.push(id); else favs.splice(idx, 1);
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
  renderCategories();
  renderBookmarks();
}

function scrollToId(id) {
  var el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
}

function openInPlayground(id) {
  var sel = document.getElementById("pgFormula");
  sel.value = id;
  renderPG();
  recomputePG();
  scrollToId("playground");
}

function handleAction(btn, fid) {
  var action = btn.getAttribute("data-action");
  if (action === "fav") { toggleFav(fid); var card = document.querySelector('.formula-card[data-fid="' + fid + '"]'); if (card) { var hb = card.querySelector('[data-action="fav"]'); if (hb) { hb.classList.toggle("faved"); var sv = hb.querySelector("svg"); if (sv) { sv.setAttribute("fill", hb.classList.contains("faved") ? "currentColor" : "none"); } } } }
  if (action === "copy") { var f = getFormula(fid); if (f) { copyText(f.formula).then(function (ok) { showToast(ok ? t("copied") : t("copyFailed")); }); } }
  if (action === "complete") { toggleComplete(fid); }
  if (action === "pg") { openInPlayground(fid); }
  if (action === "details") { var card = document.querySelector('.formula-card[data-fid="' + fid + '"]'); if (card) { card.classList.toggle("open"); var ch = card.querySelector(".fc-head"); if (ch) { ch.setAttribute("aria-expanded", card.classList.contains("open") ? "true" : "false"); } } }
}

function bindGlobalEvents() {
  document.addEventListener("click", function (e) {
    var actionBtn = e.target.closest ? e.target.closest("[data-action]") : null;
    if (actionBtn) {
      var cardEl = actionBtn.closest(".formula-card");
      if (cardEl) { handleAction(actionBtn, cardEl.getAttribute("data-fid")); return; }
      var act = (actionBtn.getAttribute("data-action") || "").toLowerCase();
      if (act === "ai") { openAI(); return; }
      if (act === "aiclose") { closeAI(); return; }
      if (act === "help") { openHelp(); return; }
      if (act === "helpclose") { closeHelp(); return; }
      if (act === "welcome") { closeHelp(); openWelcome(); return; }
      if (act === "welcomeclose") { closeWelcome(); return; }
      if (act === "welcomestart") { closeWelcome(); scrollToId("content"); return; }
      if (act === "welcomeguidebtn") { openWelcome(); return; }
      if (act === "recent") { openRecent(); return; }
      if (act === "recentclose") { closeRecent(); return; }
      if (act === "quicksearch") { quickSearch(); return; }
      if (act === "backtop") { backTop(); return; }
      if (act === "aisend") { aiSend(); return; }
      if (act === "aiclear") { clearAI(); return; }
      return;
    }
    var aiQBtn = e.target.closest ? e.target.closest("[data-ai-q]") : null;
    if (aiQBtn) { aiAsk(aiQBtn.getAttribute("data-ai-q")); return; }
    var aiCopyBtn = e.target.closest ? e.target.closest("[data-ai-copy]") : null;
    if (aiCopyBtn) { aiCopyAnswer(aiCopyBtn.getAttribute("data-ai-copy")); return; }
    var aiFbBtn = e.target.closest ? e.target.closest("[data-ai-fb]") : null;
    if (aiFbBtn) {
      var fbRow = aiFbBtn.parentNode;
      if (fbRow) { var fbButtons = fbRow.querySelectorAll("[data-ai-fb]"); for (var fbi = 0; fbi < fbButtons.length; fbi++) { fbButtons[fbi].classList.remove("picked"); } }
      aiFbBtn.classList.add("picked");
      showToast(t("aiThanks"));
      return;
    }
    var sdClearBtn = e.target.closest ? e.target.closest("[data-sd-clear]") : null;
    if (sdClearBtn) {
      var inHeroClear = sdClearBtn.closest(".hero-search");
      if (inHeroClear) { var hic = document.getElementById("heroSearch"); if (hic) { hic.value = ""; } }
      else { var sic = document.getElementById("searchInput"); if (sic) { sic.value = ""; } }
      closeSearchDrop();
      return;
    }
    var sdQuery = e.target.closest ? e.target.closest("[data-sd-query]") : null;
    if (sdQuery) {
      var sq = sdQuery.getAttribute("data-sd-query") || "";
      var inHero = sdQuery.closest(".hero-search");
      if (inHero) { var hi = document.getElementById("heroSearch"); if (hi) { hi.value = sq; } runSearchQuery(sq, "heroDrop", true); }
      else { var si2 = document.getElementById("searchInput"); if (si2) { si2.value = sq; } runSearchQuery(sq, "searchDrop", true); }
      return;
    }
    var sdOpen = e.target.closest ? e.target.closest("[data-sd-open]") : null;
    if (sdOpen) {
      var sdFid = sdOpen.getAttribute("data-sd-open");
      var sdScope = sdOpen.closest(".hero-search");
      var sdInput = sdScope ? document.getElementById("heroSearch") : document.getElementById("searchInput");
      if (sdInput && sdInput.value.trim()) { pushSearch(sdInput.value.trim()); }
      if (sdFid) { closeSearchDrop(); openFormulaDetail(sdFid); }
      return;
    }
    var sdRecent = e.target.closest ? e.target.closest("[data-recent-fid]") : null;
    if (sdRecent) { var sdrf = sdRecent.getAttribute("data-recent-fid"); if (sdrf) { pushRecent(sdrf); renderRecentList(); openFormulaDetail(sdrf); } return; }
    var relBtn = e.target.closest ? e.target.closest("[data-related-fid]") : null;
    if (relBtn) { var relFid = relBtn.getAttribute("data-related-fid"); if (relFid) { openFormulaDetail(relFid); } return; }
    var bmOpen = e.target.closest ? e.target.closest("[data-bm-open]") : null;
    if (bmOpen) { var bmFid = bmOpen.getAttribute("data-bm-open"); if (bmFid) { openFormulaDetail(bmFid); } return; }
    var bmCopy = e.target.closest ? e.target.closest("[data-bm-copy]") : null;
    if (bmCopy) { var bmCf = getFormula(bmCopy.getAttribute("data-bm-copy")); if (bmCf) { copyText(bmCf.formula).then(function (ok) { showToast(ok ? t("copied") : t("copyFailed")); }); } return; }
    var bmRemove = e.target.closest ? e.target.closest("[data-bm-remove]") : null;
    if (bmRemove) { toggleFav(bmRemove.getAttribute("data-bm-remove")); return; }
    var aiOpenBtn = e.target.closest ? e.target.closest("[data-ai-open]") : null;
    if (aiOpenBtn) { aiPick(aiOpenBtn); return; }
    var cardHead = e.target.closest ? e.target.closest(".fc-head") : null;
    if (cardHead) { var cardEl2 = cardHead.closest(".formula-card"); if (cardEl2) { cardEl2.classList.toggle("open"); cardHead.setAttribute("aria-expanded", cardEl2.classList.contains("open") ? "true" : "false"); } return; }
    var catLink = e.target.closest ? e.target.closest("[data-cat-link]") : null;
    if (catLink) { scrollToId("cat-" + catLink.getAttribute("data-cat-link")); return; }
    var levelChip = e.target.closest ? e.target.closest("[data-level]") : null;
    if (levelChip) { levelFilter = levelChip.getAttribute("data-level"); renderLevelFilters(); renderCategories(); return; }
    var navBtn = e.target.closest ? e.target.closest("[data-nav]") : null;
    if (navBtn) { navigate(navBtn.getAttribute("data-nav")); return; }
    var ctaBrowse = e.target.closest ? e.target.closest("#ctaBrowse") : null;
    if (ctaBrowse) { renderCategories(); renderLevelFilters(); renderHeroStats(); updateProgressUI(); scrollToId("content"); return; }
    var ctaPlayground = e.target.closest ? e.target.closest("#ctaPlayground") : null;
    if (ctaPlayground) { navigate("playground"); return; }
    var insideSearch = e.target.closest ? e.target.closest(".search-box") : null;
    var insideHero = e.target.closest ? e.target.closest(".hero-search") : null;
    if (!insideSearch && !insideHero) {
      var d1 = document.getElementById("searchDrop");
      var d2 = document.getElementById("heroDrop");
      if ((d1 && !d1.hidden) || (d2 && !d2.hidden)) { closeSearchDrop(); }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") { return; }
    var fh = e.target.closest ? e.target.closest(".fc-head") : null;
    if (!fh) { return; }
    e.preventDefault();
    var c = fh.closest(".formula-card");
    if (c) { c.classList.toggle("open"); fh.setAttribute("aria-expanded", c.classList.contains("open") ? "true" : "false"); }
  });
}

function navigate(section) {
  var map = { home: "home", dashboard: "home", categories: "content", all: "content", playground: "playground", comparisons: "comparisons", projects: "projects", test: "test", compatibility: "compatibility", bookmarks: "bookmarks", settings: "settings", bonus: "bonus", creator: "creator" };
  var id = map[section] || "home";
  var el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
}

/* ---------------- Practice Test ---------------- */
function startTest(level) {
  currentTestLevel = level;
  currentTestAnswers = {};
  document.getElementById("testResult").innerHTML = "";
  var holder = document.getElementById("testQuestions");
  holder.innerHTML = "";
  var questions = TESTS[(currentTestLevel || "").toLowerCase()] || [];
  var html = "";
  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    html += '<div class="test-question" data-qidx="' + i + '">';
    html += '<h4>' + (i + 1) + ". " + esc(q.q);
    html += '<span class="badge badge-' + levelClass(currentTestLevel === "Beginner" ? "basic" : (currentTestLevel === "Intermediate" ? "intermediate" : "advanced")) + '">' + esc(currentTestLevel) + "</span>";
    html += "</h4>";
    html += '<div class="test-options">';
    for (var o = 0; o < q.options.length; o++) {
      html += '<button class="test-option" data-q="' + i + '" data-o="' + o + '">' + esc(q.options[o]) + "</button>";
    }
    html += "</div>";
    html += '<div class="test-explain" id="explain-' + i + '" style="display:none;"><b>Correct Answer:</b> ' + esc(q.options[q.answer]) + " — " + esc(lang === "hi" ? q.explainHi : q.explainEn) + "</div>";
    html += "</div>";
  }
  holder.innerHTML = html;
  var submitBtn = document.createElement("button");
  submitBtn.className = "btn btn-primary";
  submitBtn.id = "testSubmit";
  submitBtn.textContent = "Submit Test";
  submitBtn.addEventListener("click", function () { submitTest(); });
  document.getElementById("testQuestions").after(submitBtn);
}

function renderTestResult(score, total) {
  var el = document.getElementById("testResult");
  var pct = total ? Math.round((score / total) * 100) : 0;
  var html = '<div class="test-question"><h4>Score: ' + score + " / " + total + " (" + pct + "%)</h4>";
  html += '<p>' + (pct >= 80 ? "Excellent work! Keep practicing Excel formulas." : "Good effort! Review the formula details and try again.") + "</p>";
  html += '<button class="btn" id="testRestart">Restart Test</button></div>';
  el.innerHTML = html;
  var restartBtn = document.getElementById("testRestart");
  if (restartBtn) { restartBtn.addEventListener("click", function () { startTest(currentTestLevel); }); }
}

function submitTest() {
  var questions = TESTS[(currentTestLevel || "").toLowerCase()] || [];
  var score = 0;
  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    if (currentTestAnswers[i] === q.answer) score++;
    var qEl = document.querySelector('.test-question[data-qidx="' + i + '"]');
    var opts = qEl ? qEl.querySelectorAll(".test-option") : [];
    for (var o = 0; o < q.options.length; o++) {
      var btn = opts[o];
      if (!btn) continue;
      btn.classList.remove("correct", "wrong", "selected");
      if (o === q.answer) btn.classList.add("correct");
      else if (currentTestAnswers[i] === o) btn.classList.add("wrong");
    }
    var ex = document.getElementById("explain-" + i);
    if (ex) { ex.style.display = "block"; }
  }
  renderTestResult(score, questions.length);
}

function bindTestEvents() {
  var holder = document.getElementById("testQuestions");
  holder.addEventListener("click", function (e) {
    var opt = e.target.closest ? e.target.closest("[data-q]") : null;
    if (opt) { var qi = parseInt(opt.getAttribute("data-q"), 10); var oi = parseInt(opt.getAttribute("data-o"), 10); currentTestAnswers[qi] = oi; var opts = holder.querySelectorAll('[data-q="' + qi + '"]'); for (var i = 0; i < opts.length; i++) { opts[i].classList.remove("selected"); } opt.classList.add("selected"); return; }
    var restart = e.target.closest ? e.target.closest("#testRestart") : null;
    if (restart) { startTest(currentTestLevel); }
  });
}

/* ---------------- Init wiring ---------------- */
function init() {
  var brandBtn = document.getElementById("brandBtn");
  if (brandBtn) { brandBtn.addEventListener("click", function () { navigate("home"); }); }
  var searchInput = document.getElementById("searchInput");
  if (searchInput) { wireSearchInput(searchInput, "searchDrop"); }
  var searchGo = document.getElementById("searchGo");
  if (searchGo) { searchGo.addEventListener("click", function () { runSearchQuery((searchInput ? searchInput.value : "").trim(), "searchDrop", true); }); }
  var langBtn = document.getElementById("langToggle");
  if (langBtn) { langBtn.addEventListener("click", function () { setLang(lang === "hi" ? "en" : "hi"); }); }
  var pgSel = document.getElementById("pgFormula");
  if (pgSel) { pgSel.addEventListener("change", function () { pgValues[this.value] = pgValues[this.value] || {}; renderPG(); recomputePG(); }); }
  var pgCopy = document.getElementById("pgCopy");
  if (pgCopy) { pgCopy.addEventListener("click", function () { var f = pgFormula(); if (f) { copyText(f.formula); } }); }

  var bBeginner = document.getElementById("testStartBeginner");
  var bIntermediate = document.getElementById("testStartIntermediate");
  var bAdvanced = document.getElementById("testStartAdvanced");
  if (bBeginner) { bBeginner.addEventListener("click", function () { startTest("Beginner"); }); }
  if (bIntermediate) { bIntermediate.addEventListener("click", function () { startTest("Intermediate"); }); }
  if (bAdvanced) { bAdvanced.addEventListener("click", function () { startTest("Advanced"); }); }
  var resetBtn = document.getElementById("resetProgressBtn");
  if (resetBtn) { resetBtn.addEventListener("click", function () { resetProgress(); }); }
  var langSettingsBtn = document.getElementById("langToggleSettings");
  if (langSettingsBtn) { langSettingsBtn.addEventListener("click", function () { setLang(lang === "hi" ? "en" : "hi"); }); }

  var aiLangBtns = document.querySelectorAll("[data-ai-lang]");
  for (var al = 0; al < aiLangBtns.length; al++) {
    aiLangBtns[al].addEventListener("click", function () {
      var v = this.getAttribute("data-ai-lang");
      var all = document.querySelectorAll("[data-ai-lang]");
      for (var k = 0; k < all.length; k++) { all[k].classList.remove("active"); }
      this.classList.add("active");
      setAILang(v);
    });
  }
  var aiInputEl = document.getElementById("aiInput");
  if (aiInputEl) { aiInputEl.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); aiSend(); } }); }
  var backTopBtn = document.getElementById("backTop");
  if (backTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) { backTopBtn.classList.add("show"); } else { backTopBtn.classList.remove("show"); }
    }, { passive: true });
  }

  FORMULAS_INDEX = buildFormulasIndex();
  recent = loadRecent();
  renderRecentList();
  renderAISuggestions();
  renderAIMessages();

  bindHeroSearch();

  bindGlobalEvents();
  bindTestEvents();
  updateProgressUI();
  renderSidebar();
  renderLevelFilters();
  renderHeroStats();
  renderCategories();
  renderBookmarks();
  renderPlayground();
  renderPG();
  renderComparisons();
  renderProjects();
  renderCompatibility();

  // Welcome auto-open disabled permanently.
}

document.addEventListener("DOMContentLoaded", function () { init(); });

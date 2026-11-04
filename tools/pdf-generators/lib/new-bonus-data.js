/*
 * Extracts site content arrays (charts, cleaning, dashboard, MIS, practice, automation)
 * by evaluating the section data files in a sandbox, then maps them into the chapter
 * structure used by the PDF renderer. Nothing is retyped or invented here.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = path.join(__dirname, '..', '..', 'excel-master-index', 'js');

function load(file, names) {
  const src = fs.readFileSync(path.join(DIR, file), 'utf8');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src + '\n;this.__out = { ' + names.map(n => n + ': ' + n).join(', ') + ' };', ctx, { filename: file });
  return ctx.__out || {};
}

const sd1 = load('sections-data.js', ['CHART_LESSONS', 'FUNDAMENTALS', 'CLEANING', 'ADV_TOOLS']);
const sd2 = load('sections-data2.js', ['DASHBOARD_MODULES', 'MIS_PROJECTS', 'AUTOMATION_TOPICS', 'PRACTICE_TASKS']);

module.exports = {
  CHART_LESSONS: sd1.CHART_LESSONS || [],
  FUNDAMENTALS: sd1.FUNDAMENTALS || [],
  CLEANING: sd1.CLEANING || [],
  ADV_TOOLS: sd1.ADV_TOOLS || [],
  DASHBOARD_MODULES: sd2.DASHBOARD_MODULES || [],
  MIS_PROJECTS: sd2.MIS_PROJECTS || [],
  AUTOMATION_TOPICS: sd2.AUTOMATION_TOPICS || [],
  PRACTICE_TASKS: sd2.PRACTICE_TASKS || []
};

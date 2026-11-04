/* ================= EXCEL MASTER INDEX — SECTION RENDERERS ================= */

/* ---------- shared card builders ---------- */
function lessonCard(name, en, hi, tipOrVersion, extraClass) {
  var html = '<div class="lesson-card' + (extraClass ? ' ' + extraClass : '') + '">';
  html += '<h4>' + esc(name) + '</h4>';
  html += '<p class="lesson-en">' + esc(en) + '</p>';
  html += '<p class="lesson-hi"><b>Roman Hindi:</b> ' + esc(hi) + '</p>';
  if (tipOrVersion) html += '<div class="lesson-tip">' + tipOrVersion + '</div>';
  html += '</div>';
  return html;
}

function moduleCard(m) {
  var html = '<div class="module-card"><div class="module-top"><h4>' + esc(m.name) + '</h4>';
  if (m.level) html += '<span class="badge badge-' + esc(String(m.level).toLowerCase()) + '">' + esc(m.level) + '</span>';
  html += '</div>';
  html += '<p class="lesson-en">' + esc(m.en) + '</p>';
  if (m.hi) html += '<p class="lesson-hi"><b>Roman Hindi:</b> ' + esc(m.hi) + '</p>';
  if (m.requires) html += '<p class="module-req"><b>Data required:</b> ' + esc(m.requires) + '</p>';
  if (m.steps && m.steps.length) {
    html += '<ol class="module-steps">' + m.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
  }
  if (m.formulas) html += '<p class="module-meta"><b>Formulas:</b> <code>' + esc(m.formulas) + '</code></p>';
  if (m.output) html += '<p class="module-meta"><b>Expected output:</b> ' + esc(m.output) + '</p>';
  if (m.mistakes && m.mistakes.length) html += '<p class="module-meta"><b>Common mistakes:</b> ' + esc(m.mistakes.join('; ')) + '</p>';
  if (m.practice) html += '<p class="module-meta"><b>Practice:</b> ' + esc(m.practice) + '</p>';
  if (m.version) html += '<div class="lesson-tip"><b>Version:</b> ' + esc(m.version) + '</div>';
  html += '</div>';
  return html;
}

/* ---------- Fundamentals ---------- */
function renderFundamentals() {
  var holder = document.getElementById('fundamentalGrid');
  if (!holder) return;
  var html = '';
  FUNDAMENTALS.forEach(function (t) {
    html += lessonCard(t.name, t.en, t.hi, '<b>Version:</b> ' + esc(t.version || 'All versions') + (t.tip ? '<br><b>Tip:</b> ' + esc(t.tip) : ''));
  });
  holder.innerHTML = html;
}

/* ---------- Cleaning ---------- */
function renderCleaning() {
  var holder = document.getElementById('cleaningGrid');
  if (!holder) return;
  var html = '';
  CLEANING.forEach(function (t) {
    html += lessonCard(t.name, t.en, t.hi, t.tip ? '<b>Tip:</b> ' + esc(t.tip) : '');
  });
  holder.innerHTML = html;
}

/* ---------- Advanced Tools ---------- */
function renderTools() {
  var holder = document.getElementById('toolsGrid');
  if (!holder) return;
  var html = '';
  ADV_TOOLS.forEach(function (t) {
    html += lessonCard(t.name, t.en, t.hi, '<b>Version:</b> ' + esc(t.version || 'All versions') + (t.tip ? '<br><b>Tip:</b> ' + esc(t.tip) : ''));
  });
  holder.innerHTML = html;
}

/* ---------- Automation ---------- */
function renderAutomation() {
  var holder = document.getElementById('automationGrid');
  if (!holder) return;
  var html = '';
  AUTOMATION_TOPICS.forEach(function (t) {
    html += lessonCard(t.name, t.en, t.hi, '<b>Version:</b> ' + esc(t.version || 'All versions') + (t.tip ? '<br><b>Tip:</b> ' + esc(t.tip) : ''), t.name.indexOf('VBA') !== -1 ? 'lesson-advanced' : '');
  });
  holder.innerHTML = html;
}

/* ---------- Dashboard Masterclass ---------- */
function renderDashboard() {
  var holder = document.getElementById('dashboardModuleGrid');
  if (!holder) return;
  var html = '';
  DASHBOARD_MODULES.forEach(function (m) { html += moduleCard({ name: m.name, en: m.en, hi: m.hi, steps: m.steps, mistakes: m.mistakes, version: m.version }); });
  holder.innerHTML = html;
}

/* ---------- MIS Executive ---------- */
function renderMisProjects() {
  var holder = document.getElementById('misProjectGrid');
  if (!holder) return;
  var html = '';
  MIS_PROJECTS.forEach(function (p) {
    html += moduleCard({ name: p.name, en: p.en, hi: p.hi, level: p.level, requires: p.requires, steps: p.steps, formulas: p.formulas, output: p.output, mistakes: p.mistakes, practice: p.practice });
  });
  holder.innerHTML = html;
}

/* ---------- Practice Lab ---------- */
var PRACTICE_KEY = 'emi_practice_solved';
function loadPracticeSolved() {
  try { return JSON.parse(localStorage.getItem(PRACTICE_KEY) || '[]'); } catch (e) { return []; }
}
function savePracticeSolved(arr) {
  try { localStorage.setItem(PRACTICE_KEY, JSON.stringify(arr)); } catch (e) {}
}
function renderPracticeStats() {
  var solved = loadPracticeSolved();
  var total = PRACTICE_TASKS.length;
  var sEl = document.getElementById('practiceSolved');
  var tEl = document.getElementById('practiceTotal');
  var pEl = document.getElementById('practicePercent');
  if (sEl) sEl.textContent = solved.length;
  if (tEl) tEl.textContent = total;
  if (pEl) pEl.textContent = (total ? Math.round((solved.length / total) * 100) : 0) + '%';
}
function renderPracticeTasks() {
  var holder = document.getElementById('practiceTaskGrid');
  if (!holder) return;
  var solved = loadPracticeSolved();
  var html = '';
  PRACTICE_TASKS.forEach(function (t) {
    var done = solved.indexOf(t.id) !== -1;
    html += '<div class="lesson-card practice-card' + (done ? ' solved' : '') + '">';
    html += '<div class="module-top"><h4>' + esc(t.id) + ' — ' + esc(t.question.split('.')[0]) + '</h4><span class="badge badge-' + (t.difficulty === 'Easy' ? 'basic' : t.difficulty === 'Medium' ? 'intermediate' : 'advanced') + '">' + esc(t.difficulty) + '</span></div>';
    html += '<p class="lesson-en"><b>Task:</b> ' + esc(t.question) + '</p>';
    html += '<p class="lesson-en"><b>Dataset:</b> ' + esc(t.dataset) + '</p>';
    html += '<div class="practice-actions">';
    html += '<button class="btn btn-sm" type="button" data-practice-reveal="' + esc(t.id) + '">Reveal Answer</button>';
    html += '<button class="btn btn-sm ' + (done ? 'btn-primary' : '') + '" type="button" data-practice-done="' + esc(t.id) + '">' + (done ? 'Solved ✓' : 'Mark Solved') + '</button>';
    html += '</div>';
    html += '<div class="practice-answer" id="practiceAnswer-' + esc(t.id) + '" hidden><b>Answer:</b> ' + esc(t.answer) + '</div>';
    html += '</div>';
  });
  holder.innerHTML = html;
  renderPracticeStats();
}

/* ---------- Charts: guide + finder + lessons ---------- */
var CHART_GUIDE = [
  { need:'Compare categories', pick:'Bar or Column Chart', why:'Side-by-side bars make differences instant to see.' },
  { need:'Trend over time', pick:'Line Chart', why:'A connected line emphasises direction and continuity.' },
  { need:'Parts of a whole (few parts)', pick:'Pie or Doughnut Chart', why:'Slices show share of a total — keep to ≤ 5–6 slices.' },
  { need:'Distribution of values', pick:'Histogram or Box & Whisker', why:'Bins show shape; whiskers show median and spread.' },
  { need:'Relationship between two numeric variables', pick:'Scatter (XY) Chart', why:'Points reveal correlation and outliers honestly.' },
  { need:'Contribution steps to a total (P&L bridge)', pick:'Waterfall Chart', why:'Shows how each increase/decrease moved the total.' },
  { need:'Target vs achievement', pick:'Bar Chart or Combo Chart', why:'Bars for amounts; combo adds % line on a 2nd axis.' },
  { need:'Two measures with different scales', pick:'Combo Chart', why:'Column + line with secondary axis keeps both readable.' },
  { need:'Ranking with long category names', pick:'Horizontal Bar Chart', why:'Long labels fit naturally on the vertical axis.' }
];

function renderChartGuide() {
  var holder = document.getElementById('chartGuideGrid');
  if (!holder) return;
  var html = '<h4 class="chart-guide-title">Quick decision guide</h4><div class="chart-guide-list">';
  CHART_GUIDE.forEach(function (g) {
    html += '<div class="chart-guide-item"><span class="chart-guide-need">' + esc(g.need) + '</span><span class="chart-guide-pick">' + esc(g.pick) + '<small>' + esc(g.why) + '</small></span></div>';
  });
  html += '</div>';
  holder.innerHTML = html;
}

function chartFinderText(lesson) {
  return (lesson.name + ' ' + lesson.what + ' ' + lesson.use + ' ' + lesson.office + ' ' + lesson.suitable + ' ' + lesson.hi + ' ' + lesson.id).toLowerCase();
}

function renderChartFinder(q) {
  var holder = document.getElementById('chartFinderResults');
  if (!holder) return;
  var raw = (q || '').trim().toLowerCase();
  if (!raw) { holder.innerHTML = ''; return; }
  var tokens = raw.split(/[^a-z0-9]+/).filter(Boolean);
  var scored = CHART_LESSONS.map(function (l) {
    var text = chartFinderText(l);
    var score = 0;
    tokens.forEach(function (t) {
      if (!t) return;
      var idx = text.indexOf(t);
      if (idx !== -1) score += 3;
      if (new RegExp('(^|[^a-z0-9])' + t + '([^a-z0-9]|$)', 'i').test(text)) score += 2;
    });
    // phrase boosts
    if (/trend|month|time|history/.test(raw) && /line/.test(l.id)) score += 6;
    if (/compare|vs|versus/.test(raw) && /column|bar/.test(l.id)) score += 6;
    if (/share|part|whole|contribution|budget/.test(raw) && /pie|doughnut/.test(l.id)) score += 6;
    if (/distribution|spread|histogram|frequency/.test(raw) && /histogram|box/.test(l.id)) score += 6;
    if (/correlation|relationship|scatter/.test(raw) && /scatter|bubble/.test(l.id)) score += 6;
    if (/waterfall|bridge|pnl|profit/.test(raw) && /waterfall/.test(l.id)) score += 6;
    if (/target|achievement/.test(raw) && /combo|column|bar/.test(l.id)) score += 6;
    if (/funnel|conversion|pipeline/.test(raw) && /funnel/.test(l.id)) score += 6;
    if (/dashboard|interactive/.test(raw) && /pivotchart/.test(l.id)) score += 6;
    return { lesson: l, score: score };
  }).filter(function (x) { return x.score > 0; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 3);

  if (!scored.length) { holder.innerHTML = '<div class="sd-empty">No clear match. Try words like: compare, trend, share, distribution, correlation, funnel, target.</div>'; return; }
  var html = '<div class="chart-finder-note">Recommended for “' + esc(q) + '”:</div>';
  scored.forEach(function (x, idx) {
    var l = x.lesson;
    html += '<div class="chart-finder-item"><div class="chart-finder-item-head"><span class="chart-finder-rank">#' + (idx + 1) + '</span><b>' + esc(l.name) + '</b></div>';
    html += '<p><b>Why:</b> ' + esc(l.use) + '</p>';
    html += '<p><b>Avoid when:</b> ' + esc(l.avoid) + '</p>';
    html += '<p><b>Office use:</b> ' + esc(l.office) + '</p></div>';
  });
  holder.innerHTML = html;
}

function renderChartLessons() {
  var grid = document.getElementById('chartLessonGrid');
  var famSel = document.getElementById('chartLessonFamily');
  var search = document.getElementById('chartLessonSearch');
  if (!grid) return;
  // populate family filter once
  if (famSel && famSel.options.length <= 1) {
    var families = [];
    CHART_LESSONS.forEach(function (l) { if (families.indexOf(l.kind) === -1) families.push(l.kind); });
    families.sort().forEach(function (f) {
      var opt = document.createElement('option');
      opt.value = f; opt.textContent = f;
      famSel.appendChild(opt);
    });
  }
  var fam = famSel ? famSel.value : '';
  var q = (search ? search.value : '').trim().toLowerCase();
  var html = '';
  CHART_LESSONS.forEach(function (l) {
    if (fam && l.kind !== fam) return;
    if (q) {
      var hay = (l.name + ' ' + l.kind + ' ' + l.what + ' ' + l.use + ' ' + l.office + ' ' + l.suitable + ' ' + l.hi + ' ' + l.id).toLowerCase();
      if (hay.indexOf(q) === -1) return;
    }
    html += '<div class="chart-lesson-card" data-chart-id="' + esc(l.id) + '">';
    html += '<div class="chart-lesson-top"><span class="chart-lesson-kind">' + esc(l.kind) + '</span><button class="icon-btn" type="button" data-chart-toggle="' + esc(l.id) + '" aria-expanded="false" aria-label="Toggle lesson details for ' + esc(l.name) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg></button></div>';
    html += '<h4>' + esc(l.name) + '</h4>';
    html += '<p class="chart-lesson-what">' + esc(l.what) + '</p>';
    html += '<div class="chart-lesson-detail" id="chartDetail-' + esc(l.id) + '" hidden>';
    html += '<p><b>Roman Hindi:</b> ' + esc(l.hi) + '</p>';
    html += '<p><b>Use when:</b> ' + esc(l.use) + '</p>';
    html += '<p><b>Avoid when:</b> ' + esc(l.avoid) + '</p>';
    html += '<p><b>Suitable data:</b> ' + esc(l.suitable) + '</p>';
    html += '<p><b>Office / MIS use:</b> ' + esc(l.office) + '</p>';
    html += '<p><b>Sample dataset:</b> ' + esc(l.dataset) + '</p>';
    html += '<p><b>How to create:</b></p><ol class="module-steps">' + l.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
    html += '<p><b>Selecting the range:</b> ' + esc(l.range) + '</p>';
    html += '<p><b>Professional formatting:</b> ' + esc(l.format) + '</p>';
    html += '<p><b>Common mistakes:</b> ' + esc(l.mistakes.join('; ')) + '</p>';
    html += '<p><b>Advantages:</b> ' + esc(l.pros) + '</p><p><b>Disadvantages:</b> ' + esc(l.cons) + '</p>';
    html += '<p><b>Interview:</b> ' + esc(l.interview.join(' · ')) + '</p>';
    html += '<p><b>Practice task:</b> ' + esc(l.task.q) + '<br><b>Expected:</b> ' + esc(l.task.a) + '</p>';
    html += '</div>';
    html += '</div>';
  });
  grid.innerHTML = html || '<div class="empty-state"><h3>No chart matches your filter</h3><p>Try a different keyword or clear the family filter.</p></div>';
}

/* ---------- Chart Playground ---------- */
var chartSample = [
  { label: 'Jan', online: 42000, offline: 65000, partner: 18000 },
  { label: 'Feb', online: 48000, offline: 61000, partner: 22000 },
  { label: 'Mar', online: 55000, offline: 70000, partner: 26000 },
  { label: 'Apr', online: 61000, offline: 68000, partner: 30000 },
  { label: 'May', online: 58000, offline: 75000, partner: 34000 },
  { label: 'Jun', online: 67000, offline: 82000, partner: 39000 }
];
var chartSeriesColors = ['#173F35', '#D8C9A7', '#245C4A'];
var chartSeriesLabels = ['Online', 'Offline', 'Partner'];
var chartPlaygroundType = 'column';

function renderChartSampleInputs() {
  var holder = document.getElementById('chartSampleInputs');
  if (!holder) return;
  var html = '<table class="charts-data-table"><thead><tr><th>Month</th><th>Online (₹)</th><th>Offline (₹)</th><th>Partner (₹)</th></tr></thead><tbody>';
  chartSample.forEach(function (row, idx) {
    html += '<tr><td>' + esc(row.label) + '</td>';
    ['online', 'offline', 'partner'].forEach(function (k) {
      html += '<td><input type="number" min="0" step="1000" data-chart-row="' + idx + '" data-chart-key="' + k + '" value="' + row[k] + '" aria-label="' + esc(row.label) + ' ' + k + '" /></td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  holder.innerHTML = html;
}

function niceMax(v) {
  if (v <= 0) return 1000;
  var pow = Math.pow(10, Math.floor(Math.log10(v)));
  var n = v / pow;
  var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * pow;
}

function drawChartPlayground() {
  var canvas = document.getElementById('chartPlaygroundCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  var padL = 62, padR = 14, padT = 18, padB = 36;
  var plotW = W - padL - padR, plotH = H - padT - padB;
  var values = chartSample.map(function (r) { return [r.online, r.offline, r.partner]; });
  var maxVal = 0;
  values.forEach(function (arr) { arr.forEach(function (v) { if (v > maxVal) maxVal = v; }); });
  if (chartPlaygroundType === 'stacked') {
    maxVal = Math.max.apply(null, values.map(function (arr) { return arr[0] + arr[1] + arr[2]; }));
  }
  var top = niceMax(maxVal);

  // gridlines
  ctx.strokeStyle = '#E5E2D9';
  ctx.lineWidth = 1;
  ctx.font = '11px Inter, sans-serif';
  ctx.fillStyle = '#777B73';
  for (var g = 0; g <= 4; g++) {
    var gy = padT + plotH - (plotH * g) / 4;
    ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(padL + plotW, gy); ctx.stroke();
    ctx.fillText((top * g / 4 / 1000).toFixed(0) + 'k', 8, gy + 4);
  }
  // axes
  ctx.strokeStyle = '#CBD8CE';
  ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();

  var n = chartSample.length;
  var groupW = plotW / n;

  if (chartPlaygroundType === 'column' || chartPlaygroundType === 'stacked') {
    var seriesCount = 3;
    if (chartPlaygroundType === 'column') {
      var barW = (groupW * 0.62) / seriesCount;
      for (var i = 0; i < n; i++) {
        for (var s = 0; s < seriesCount; s++) {
          var v = values[i][s];
          var bh = (v / top) * plotH;
          var x = padL + i * groupW + groupW * 0.19 + s * barW;
          var y = padT + plotH - bh;
          ctx.fillStyle = chartSeriesColors[s];
          ctx.fillRect(x, y, barW - 2, bh);
        }
      }
    } else {
      var barW2 = groupW * 0.5;
      for (var j = 0; j < n; j++) {
        var acc = 0;
        for (var s2 = 0; s2 < seriesCount; s2++) {
          var v2 = values[j][s2];
          var bh2 = (v2 / top) * plotH;
          var x2 = padL + j * groupW + groupW * 0.25;
          var y2 = padT + plotH - ((acc + v2) / top) * plotH;
          ctx.fillStyle = chartSeriesColors[s2];
          ctx.fillRect(x2, y2, barW2, bh2);
          acc += v2;
        }
      }
    }
  } else if (chartPlaygroundType === 'line') {
    for (var s3 = 0; s3 < 3; s3++) {
      ctx.strokeStyle = chartSeriesColors[s3];
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (var k = 0; k < n; k++) {
        var x3 = padL + k * groupW + groupW / 2;
        var y3 = padT + plotH - (values[k][s3] / top) * plotH;
        if (k === 0) ctx.moveTo(x3, y3); else ctx.lineTo(x3, y3);
      }
      ctx.stroke();
      for (var m = 0; m < n; m++) {
        var xm = padL + m * groupW + groupW / 2;
        var ym = padT + plotH - (values[m][s3] / top) * plotH;
        ctx.fillStyle = chartSeriesColors[s3];
        ctx.beginPath(); ctx.arc(xm, ym, 3.6, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else if (chartPlaygroundType === 'pie' || chartPlaygroundType === 'doughnut') {
    var totals = values.map(function (arr) { return arr[0] + arr[1] + arr[2]; });
    var sum = totals.reduce(function (a, b) { return a + b; }, 0);
    var cx = W / 2, cy = H / 2 - 8, radius = Math.min(W, H) * 0.32;
    var startAngle = -Math.PI / 2;
    var palette = ['#173F35', '#245C4A', '#D8C9A7', '#34785B', '#B77A35', '#92958D'];
    for (var p = 0; p < totals.length; p++) {
      var slice = (totals[p] / sum) * Math.PI * 2;
      ctx.fillStyle = palette[p % palette.length];
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fill();
      startAngle += slice;
    }
    if (chartPlaygroundType === 'doughnut') {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#173F35';
      ctx.font = 'bold 13px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Total', cx, cy - 2);
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('₹' + Math.round(sum / 1000) + 'k', cx, cy + 14);
      ctx.textAlign = 'left';
    }
  } else if (chartPlaygroundType === 'scatter') {
    var maxX = Math.max.apply(null, values.map(function (a) { return a[0]; }));
    var maxY = Math.max.apply(null, values.map(function (a) { return a[1]; }));
    var topX = niceMax(maxX), topY = niceMax(maxY);
    for (var gg = 0; gg <= 4; gg++) {
      var gy2 = padT + plotH - (plotH * gg) / 4;
      ctx.strokeStyle = '#E5E2D9';
      ctx.beginPath(); ctx.moveTo(padL, gy2); ctx.lineTo(padL + plotW, gy2); ctx.stroke();
      ctx.fillStyle = '#777B73';
      ctx.fillText((topY * gg / 4 / 1000).toFixed(0) + 'k', 8, gy2 + 4);
    }
    for (var si4 = 0; si4 < values.length; si4++) {
      var sx = padL + (values[si4][0] / topX) * plotW;
      var sy = padT + plotH - (values[si4][1] / topY) * plotH;
      ctx.fillStyle = chartSeriesColors[si4 % 3];
      ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#252923';
      ctx.fillText(chartSample[si4].label, sx + 8, sy + 4);
    }
  }

  // x labels
  ctx.fillStyle = '#252923';
  ctx.font = '11px Inter, sans-serif';
  for (var lx = 0; lx < n; lx++) {
    var tx = padL + lx * groupW + groupW / 2;
    ctx.textAlign = 'center';
    ctx.fillText(chartSample[lx].label, tx, padT + plotH + 18);
  }
  ctx.textAlign = 'left';

  // legend
  var legend = document.getElementById('chartCanvasLegend');
  if (legend) {
    if (chartPlaygroundType === 'pie' || chartPlaygroundType === 'doughnut') {
      legend.innerHTML = chartSample.map(function (r, i) { return '<span class="legend-item"><i style="background:' + ['#173F35','#245C4A','#D8C9A7','#34785B','#B77A35','#92958D'][i % 6] + '"></i>' + esc(r.label) + '</span>'; }).join('');
    } else {
      legend.innerHTML = chartSeriesLabels.map(function (l, i) { return '<span class="legend-item"><i style="background:' + chartSeriesColors[i] + '"></i>' + esc(l) + '</span>'; }).join('');
    }
  }
}

/* ---------- Wire events ---------- */
(function initSections() {
  renderFundamentals();
  renderCleaning();
  renderTools();
  renderAutomation();
  renderDashboard();
  renderMisProjects();
  renderPracticeTasks();
  renderChartGuide();
  renderChartLessons();
  renderChartSampleInputs();
  drawChartPlayground();

  // chart playground events (delegation)
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t && t.matches && t.matches('[data-chart-row]')) {
      var row = parseInt(t.getAttribute('data-chart-row'), 10);
      var key = t.getAttribute('data-chart-key');
      var v = parseFloat(t.value);
      if (!isNaN(v) && chartSample[row]) {
        chartSample[row][key] = Math.max(0, v);
        drawChartPlayground();
      }
    }
  });
  document.addEventListener('click', function (e) {
    var typeBtn = e.target.closest ? e.target.closest('[data-chart-type]') : null;
    if (typeBtn) {
      chartPlaygroundType = typeBtn.getAttribute('data-chart-type');
      document.querySelectorAll('.charts-type-btn').forEach(function (b) { b.classList.toggle('active', b === typeBtn); });
      drawChartPlayground();
      return;
    }
    var toggle = e.target.closest ? e.target.closest('[data-chart-toggle]') : null;
    if (toggle) {
      var id = toggle.getAttribute('data-chart-toggle');
      var detail = document.getElementById('chartDetail-' + id);
      if (detail) {
        detail.hidden = !detail.hidden;
        toggle.setAttribute('aria-expanded', detail.hidden ? 'false' : 'true');
      }
      return;
    }
    var reveal = e.target.closest ? e.target.closest('[data-practice-reveal]') : null;
    if (reveal) {
      var aid = reveal.getAttribute('data-practice-reveal');
      var ans = document.getElementById('practiceAnswer-' + aid);
      if (ans) ans.hidden = !ans.hidden;
      return;
    }
    var doneBtn = e.target.closest ? e.target.closest('[data-practice-done]') : null;
    if (doneBtn) {
      var pid = doneBtn.getAttribute('data-practice-done');
      var arr = loadPracticeSolved();
      var idx = arr.indexOf(pid);
      if (idx === -1) arr.push(pid); else arr.splice(idx, 1);
      savePracticeSolved(arr);
      renderPracticeTasks();
      return;
    }
    var resetBtn = e.target.closest ? e.target.closest('#practiceResetBtn') : null;
    if (resetBtn) {
      savePracticeSolved([]);
      renderPracticeTasks();
      return;
    }
    var finderBtn = e.target.closest ? e.target.closest('#chartFinderBtn') : null;
    if (finderBtn) {
      renderChartFinder(document.getElementById('chartFinderInput').value);
      return;
    }
  });
  var finderInput = document.getElementById('chartFinderInput');
  if (finderInput) {
    finderInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); renderChartFinder(finderInput.value); } });
  }
  var lessonSearch = document.getElementById('chartLessonSearch');
  if (lessonSearch) lessonSearch.addEventListener('input', renderChartLessons);
  var lessonFamily = document.getElementById('chartLessonFamily');
  if (lessonFamily) lessonFamily.addEventListener('change', renderChartLessons);
})();

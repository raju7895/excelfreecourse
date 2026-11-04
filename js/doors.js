/* ================= FOUR FLOATING 3D CATEGORY DOORS ================= */
(function() {
  'use strict';

  const doorsData = {
    formula: {
      title: 'EXCEL FORMULA WORLD',
      subtitle: 'Complete Excel Formula Library - Basic to Advanced Formulas Explained',
      icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2zM8 7h8M8 11h8M8 15h4',
      subcategories: [
        { name: 'Basic Formulas', desc: 'SUM, COUNT, AVERAGE, MIN, MAX and more', count: 12 },
        { name: 'Logical Formulas', desc: 'IF, AND, OR, IFS, SWITCH and nested logic', count: 8 },
        { name: 'Text Formulas', desc: 'LEFT, RIGHT, MID, CONCATENATE, TEXTJOIN', count: 15 },
        { name: 'Lookup & Reference', desc: 'VLOOKUP, HLOOKUP, XLOOKUP, INDEX, MATCH', count: 12 },
        { name: 'Date & Time Formulas', desc: 'TODAY, NOW, DATEDIF, WORKDAY, NETWORKDAYS', count: 10 },
        { name: 'Conditional Formulas', desc: 'SUMIF, COUNTIF, SUMIFS, COUNTIFS', count: 9 },
        { name: 'Statistical Formulas', desc: 'LARGE, SMALL, RANK, PERCENTILE', count: 8 },
        { name: 'Dynamic Arrays', desc: 'FILTER, SORT, UNIQUE, SEQUENCE, RANDARRAY', count: 10 },
        { name: 'Financial Formulas', desc: 'PV, FV, PMT, NPV, IRR', count: 8 },
        { name: 'Advanced Formulas', desc: 'LET, LAMBDA, XLOOKUP advanced usage', count: 15 },
        { name: 'Formula Combinations', desc: 'INDEX+MATCH, VLOOKUP+IFERROR patterns', count: 12 },
        { name: 'Formula Examples', desc: 'Real-world formula applications', count: 20 }
      ]
    },
    charts: {
      title: 'CHARTS & DASHBOARD WORLD',
      subtitle: 'Data Visualization, Chart Mastery & Professional Dashboards',
      icon: 'M3 3v18h18M18 20v-10M12 20v-16M6 20v-6M7 10l3-3 4 4 5-5',
      subcategories: [
        { name: 'Charts & Data Visualization', desc: 'All 25 chart types with tutorials', count: 25 },
        { name: 'Chart Selection Guide', desc: 'Which chart to use when', count: 9 },
        { name: 'Interactive Chart Playground', desc: 'Live chart creation and testing', count: 1 },
        { name: 'Dashboard Masterclass', desc: 'KPI cards, slicers, PivotCharts', count: 19 },
        { name: 'Dashboard Projects', desc: 'Complete dashboard examples', count: 10 }
      ]
    },
    advanced: {
      title: 'ADVANCED EXCEL WORLD',
      subtitle: 'PivotTables, Power Query, Automation & Advanced Features',
      icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8zM7 7l-2 2M7 7l2 2',
      subcategories: [
        { name: 'PivotTables & PivotCharts', desc: 'Data summarization and analysis', count: 7 },
        { name: 'Power Query', desc: 'Data import, transform and automation', count: 12 },
        { name: 'Power Pivot & Data Model', desc: 'Relationships and DAX basics', count: 5 },
        { name: 'Data Cleaning & Management', desc: 'TRIM, CLEAN, validation, tables', count: 18 },
        { name: 'Advanced Tools', desc: 'What-If, Goal Seek, Solver, Arrays', count: 25 },
        { name: 'Excel Automation & VBA', desc: 'Macros, basic VBA, productivity', count: 12 },
        { name: 'Excel Fundamentals', desc: 'References, formatting, basics', count: 21 }
      ]
    },
    mis: {
      title: 'MIS EXECUTIVE & PRACTICE WORLD',
      subtitle: 'Real-World Reports, Job Preparation & Practice',
      icon: 'M2 7h20v14H2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M6 12h4M6 16h4M14 12h4M14 16h4',
      subcategories: [
        { name: 'MIS Executive Training', desc: '20 real-world office reports', count: 20 },
        { name: 'Real Office Projects', desc: 'Practical formula combinations', count: 10 },
        { name: 'Excel Practice Lab', desc: 'Tasks with hints and solutions', count: 12 },
        { name: 'Practice Tests', desc: 'Beginner, Intermediate, Advanced tests', count: 3 },
        { name: 'Excel Shortcuts', desc: 'Productivity shortcuts master', count: 29 },
        { name: 'Interview Preparation', desc: 'Common Excel interview questions', count: 15 }
      ]
    }
  };

  function initDoors() {
    const doorCards = document.querySelectorAll('.door-card');
    const categoryView = document.getElementById('categoryView');
    const categoryViewTitle = document.getElementById('categoryViewTitle');
    const categoryViewSubtitle = document.getElementById('categoryViewSubtitle');
    const categoryViewGrid = document.getElementById('categoryViewGrid');
    const backToDoors = document.getElementById('backToDoors');
    const doorsSection = document.getElementById('doorsSection');
    const ctaBrowseDoors = document.getElementById('ctaBrowseDoors');
    const contentSection = document.getElementById('content');

    doorCards.forEach(card => {
      card.addEventListener('click', function() {
        const doorType = this.getAttribute('data-door');
        openCategory(doorType);
      });

      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const doorType = this.getAttribute('data-door');
          openCategory(doorType);
        }
      });

      // 3D tilt effect
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / 20;
        const tiltY = (centerX - x) / 20;
        this.style.setProperty('--tilt-x', tiltX + 'deg');
        this.style.setProperty('--tilt-y', tiltY + 'deg');
      });

      card.addEventListener('mouseleave', function() {
        this.style.setProperty('--tilt-x', '0deg');
        this.style.setProperty('--tilt-y', '0deg');
      });
    });

    if (backToDoors) {
      backToDoors.addEventListener('click', function() {
        categoryView.classList.remove('active');
        doorsSection.style.display = 'block';
        if (contentSection) contentSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (ctaBrowseDoors) {
      ctaBrowseDoors.addEventListener('click', function() {
        doorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    window.currentDoorType = null;
    window.currentDoorData = null;

    function openCategory(doorType) {
      const data = doorsData[doorType];
      if (!data) return;
      
      window.currentDoorType = doorType;
      window.currentDoorData = data;

      doorsSection.style.display = 'none';
      if (contentSection) contentSection.style.display = 'none';
      categoryView.classList.add('active');

      categoryViewTitle.textContent = data.title;
      categoryViewSubtitle.textContent = data.subtitle;

      categoryViewGrid.innerHTML = '';
      categoryViewGrid.style.display = 'grid';
      
      // Add breadcrumb
      const header = categoryView.querySelector('.category-header');
      let breadcrumb = header.querySelector('.door-breadcrumb');
      if (!breadcrumb) {
        breadcrumb = document.createElement('div');
        breadcrumb.className = 'door-breadcrumb';
        breadcrumb.style.cssText = 'margin-bottom: 16px; color: var(--text-2); font-size: 14px;';
        header.insertBefore(breadcrumb, categoryViewTitle);
      }
      breadcrumb.innerHTML = `<span style="color: var(--green-900); font-weight: 600;">${escapeHtml(data.title)}</span> / <span>Categories</span>`;
      
      data.subcategories.forEach(subcat => {
        const card = document.createElement('div');
        card.className = 'subcat-card';
        card.innerHTML = `
          <h3>${escapeHtml(subcat.name)}</h3>
          <p>${escapeHtml(subcat.desc)}</p>
          <span class="subcat-count">${subcat.count} items</span>
        `;
        card.addEventListener('click', function() {
          // Load content inside category view - don't go back to doors
          openCategoryContent(doorType, subcat.name);
        });
        categoryViewGrid.appendChild(card);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openCategoryContent(doorType, categoryName) {
      const data = doorsData[doorType];
      if (!data) return;
      
      categoryViewTitle.textContent = categoryName;
      categoryViewSubtitle.textContent = getCategorySubtitle(doorType, categoryName);
      
      categoryViewGrid.innerHTML = '';
      categoryViewGrid.style.display = 'block';
      
      const header = categoryView.querySelector('.category-header');
      let breadcrumb = header.querySelector('.door-breadcrumb');
      if (!breadcrumb) {
        breadcrumb = document.createElement('div');
        breadcrumb.className = 'door-breadcrumb';
        breadcrumb.style.cssText = 'margin-bottom: 16px; color: var(--text-2); font-size: 14px;';
        header.insertBefore(breadcrumb, categoryViewTitle);
      }
      breadcrumb.innerHTML = `<span style="color: var(--green-900); font-weight: 600; cursor: pointer;" onclick="backToCategoryList()">${escapeHtml(data.title)}</span> / <span>${escapeHtml(categoryName)}</span>`;
      
      // Add back to categories button
      const backBtn = document.getElementById('backToDoors');
      if (backBtn) {
        backBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to ${data.title.split(' ')[0]} Categories
        `;
        backBtn.onclick = backToCategoryList;
      }
      
      // Render content based on category
      renderCategoryContent(doorType, categoryName);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.backToCategoryList = function() {
      if (window.currentDoorType && window.currentDoorData) {
        openCategory(window.currentDoorType);
      } else {
        const categoryView = document.getElementById('categoryView');
        categoryView.classList.remove('active');
        const doorsSection = document.getElementById('doorsSection');
        doorsSection.style.display = 'block';
        const contentSection = document.getElementById('content');
        if (contentSection) contentSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    function getCategorySubtitle(doorType, categoryName) {
      if (doorType === 'formula') {
        return 'Complete ' + categoryName + ' with tutorials, examples, and practice exercises';
      } else if (doorType === 'charts') {
        return 'Learn ' + categoryName + ' with step-by-step guides and real examples';
      } else if (doorType === 'advanced') {
        return 'Master ' + categoryName + ' with practical tutorials and datasets';
      } else if (doorType === 'mis') {
        return 'Complete ' + categoryName + ' with real MIS datasets and calculations';
      }
      return 'Complete learning material for ' + categoryName;
    }

    function renderCategoryContent(doorType, categoryName) {
      const grid = document.getElementById('categoryViewGrid');
      
      if (doorType === 'formula' && categoryName === 'Lookup & Reference') {
        grid.innerHTML = `
          <div class="content-section">
            <h2 style="color: var(--green-900); margin-bottom: 20px;">Lookup & Reference Formulas - Complete Library</h2>
            <p style="color: var(--text-2); margin-bottom: 30px;">Master all lookup functions with complete tutorials, examples and practice</p>
            
            <div class="formula-topic-list">
              ${['VLOOKUP', 'HLOOKUP', 'XLOOKUP', 'LOOKUP', 'INDEX', 'MATCH', 'XMATCH', 'INDEX + MATCH', 'INDEX + XMATCH', 'CHOOSE', 'OFFSET', 'INDIRECT', 'TRANSPOSE', 'ROW', 'ROWS', 'COLUMN', 'COLUMNS', 'HYPERLINK'].map(formula => `
                <div class="topic-card" onclick="showFormulaTopic('${formula}')">
                  <h3>${formula}</h3>
                  <p>Complete tutorial with syntax, examples, and practice</p>
                  <span class="topic-badge">View Lesson →</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        return;
      }
      
      // Default content
      grid.innerHTML = `
        <div class="content-section">
          <h2 style="color: var(--green-900); margin-bottom: 20px;">${categoryName}</h2>
          <p style="color: var(--text-2); margin-bottom: 30px;">Complete learning content for ${categoryName}</p>
          <div style="background: var(--card); padding: 40px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center;">
            <h3 style="color: var(--green-900);">Content Coming Soon</h3>
            <p style="color: var(--text-2);">Full tutorial with examples, datasets, and practice exercises will be available here.</p>
          </div>
        </div>
      `;
    }

    window.showFormulaTopic = function(formulaName) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px;">
            <button class="btn" onclick="openCategoryContent('formula', 'Lookup & Reference')">← Back to Lookup Formulas</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 30px;">${formulaName} - Complete Tutorial</h1>
          
          <div class="lesson-section">
            <h2>1. What is ${formulaName}?</h2>
            <p><strong>English:</strong> ${getFormulaDesc(formulaName).en}</p>
            <p><strong>Roman Hindi:</strong> ${getFormulaDesc(formulaName).hi}</p>
          </div>
          
          <div class="lesson-section">
            <h2>2. Syntax</h2>
            <code style="background: var(--soft-green); padding: 12px 20px; display: block; border-radius: 8px; font-family: var(--font-mono);">${getFormulaSyntax(formulaName)}</code>
          </div>
          
          <div class="lesson-section">
            <h2>3. Sample Dataset</h2>
            <div style="background: var(--card); padding: 20px; border: 1px solid var(--border); border-radius: 8px; overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: var(--soft-green);">
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Employee ID</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Name</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Department</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Salary</th>
                </tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">101</td><td style="padding: 8px; border: 1px solid var(--border);">Rahul Sharma</td><td style="padding: 8px; border: 1px solid var(--border);">Sales</td><td style="padding: 8px; border: 1px solid var(--border);">45000</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">102</td><td style="padding: 8px; border: 1px solid var(--border);">Priya Singh</td><td style="padding: 8px; border: 1px solid var(--border);">Marketing</td><td style="padding: 8px; border: 1px solid var(--border);">52000</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">103</td><td style="padding: 8px; border: 1px solid var(--border);">Amit Kumar</td><td style="padding: 8px; border: 1px solid var(--border);">HR</td><td style="padding: 8px; border: 1px solid var(--border);">48000</td></tr>
              </table>
            </div>
          </div>
          
          <div class="lesson-section">
            <h2>4. Example Formula</h2>
            <p><strong>Task:</strong> Get employee name for ID 102</p>
            <code style="background: var(--soft-green); padding: 12px 20px; display: block; border-radius: 8px; font-family: var(--font-mono);">${getFormulaExample(formulaName)}</code>
            <p><strong>Result:</strong> <span style="color: var(--green-900); font-weight: 600;">Priya Singh</span></p>
          </div>
          
          <div class="lesson-section">
            <h2>5. Step by Step</h2>
            <ol style="line-height: 2;">
              <li>Select the cell where you want the result</li>
              <li>Type the formula as shown above</li>
              <li>Press Enter to get the result</li>
              <li>Copy down if needed for multiple lookups</li>
            </ol>
          </div>
          
          <div class="lesson-section">
            <h2>6. Practice Question</h2>
            <div style="background: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; border-radius: 4px;">
              <p><strong>Question:</strong> Using the above data, find the salary of employee with ID 103.</p>
              <details style="margin-top: 10px;">
                <summary style="cursor: pointer; color: var(--green-900); font-weight: 600;">Show Answer</summary>
                <div style="margin-top: 10px;">
                  <p><strong>Formula:</strong> =VLOOKUP(103,A2:D4,4,FALSE)</p>
                  <p><strong>Answer:</strong> 48000</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function getFormulaDesc(name) {
      const descs = {
        'VLOOKUP': { en: 'Searches for a value in the first column of a table and returns a value in the same row from a specified column.', hi: 'Table ke pehle column me value dhundhkar usi row ke dusre column se value return karta hai.' },
        'XLOOKUP': { en: 'Modern lookup function that searches in a range and returns corresponding item from another range.', hi: 'Modern lookup function jo ek range me dhundhkar dusre range se value return karta hai.' },
        'INDEX': { en: 'Returns the value at a given position in a range or array.', hi: 'Range ya array me di gayi position par value return karta hai.' },
        'MATCH': { en: 'Returns the relative position of an item in a range that matches a specified value.', hi: 'Range me kisi value ki position return karta hai.' }
      };
      return descs[name] || { en: 'Excel formula for data lookup and reference.', hi: 'Data lookup aur reference ke liye Excel formula.' };
    }

    function getFormulaSyntax(name) {
      const syntaxes = {
        'VLOOKUP': 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
        'XLOOKUP': 'XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
        'INDEX': 'INDEX(array, row_num, [column_num])',
        'MATCH': 'MATCH(lookup_value, lookup_array, [match_type])'
      };
      return syntaxes[name] || name + '()';
    }

    function getFormulaExample(name) {
      const examples = {
        'VLOOKUP': '=VLOOKUP(102,A2:D4,2,FALSE)',
        'XLOOKUP': '=XLOOKUP(102,A2:A4,B2:B4)',
        'INDEX': '=INDEX(B2:B4,2)',
        'MATCH': '=MATCH(102,A2:A4,0)'
      };
      return examples[name] || '=' + name + '()';
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDoors);
  } else {
    initDoors();
  }
})();

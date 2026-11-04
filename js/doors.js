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

    const formulaDataByCategory = {
      'Basic Formulas': [
        { name: 'SUM', desc: 'Adds all numbers in a range' },
        { name: 'AVERAGE', desc: 'Returns average of numbers' },
        { name: 'COUNT', desc: 'Counts cells with numbers' },
        { name: 'COUNTA', desc: 'Counts non-blank cells' },
        { name: 'COUNTBLANK', desc: 'Counts blank cells' },
        { name: 'MAX', desc: 'Returns maximum value' },
        { name: 'MIN', desc: 'Returns minimum value' },
        { name: 'PRODUCT', desc: 'Multiplies all numbers' },
        { name: 'ROUND', desc: 'Rounds to specified decimals' },
        { name: 'ROUNDUP', desc: 'Rounds up' },
        { name: 'ROUNDDOWN', desc: 'Rounds down' },
        { name: 'ABS', desc: 'Returns absolute value' },
        { name: 'INT', desc: 'Rounds down to integer' },
        { name: 'MOD', desc: 'Returns remainder' },
        { name: 'POWER', desc: 'Raises to power' },
        { name: 'SQRT', desc: 'Square root' }
      ],
      'Logical Formulas': [
        { name: 'IF', desc: 'Conditional logic' },
        { name: 'IFS', desc: 'Multiple conditions' },
        { name: 'AND', desc: 'All conditions true' },
        { name: 'OR', desc: 'Any condition true' },
        { name: 'NOT', desc: 'Reverses logic' },
        { name: 'XOR', desc: 'Exclusive OR' },
        { name: 'IFERROR', desc: 'Handles errors' },
        { name: 'IFNA', desc: 'Handles #N/A errors' },
        { name: 'SWITCH', desc: 'Value matching' },
        { name: 'TRUE', desc: 'Logical TRUE' },
        { name: 'FALSE', desc: 'Logical FALSE' }
      ],
      'Text Formulas': [
        { name: 'LEFT', desc: 'Extracts from left' },
        { name: 'RIGHT', desc: 'Extracts from right' },
        { name: 'MID', desc: 'Extracts from middle' },
        { name: 'LEN', desc: 'Counts characters' },
        { name: 'TRIM', desc: 'Removes extra spaces' },
        { name: 'CLEAN', desc: 'Removes non-printable chars' },
        { name: 'UPPER', desc: 'Converts to uppercase' },
        { name: 'LOWER', desc: 'Converts to lowercase' },
        { name: 'PROPER', desc: 'Proper case' },
        { name: 'CONCATENATE', desc: 'Joins text' },
        { name: 'CONCAT', desc: 'Modern concat' },
        { name: 'TEXTJOIN', desc: 'Joins with delimiter' },
        { name: 'FIND', desc: 'Finds text (case-sensitive)' },
        { name: 'SEARCH', desc: 'Finds text (case-insensitive)' },
        { name: 'SUBSTITUTE', desc: 'Replaces text' },
        { name: 'REPLACE', desc: 'Replaces by position' },
        { name: 'TEXT', desc: 'Formats numbers as text' },
        { name: 'VALUE', desc: 'Converts text to number' },
        { name: 'TEXTBEFORE', desc: 'Text before delimiter' },
        { name: 'TEXTAFTER', desc: 'Text after delimiter' },
        { name: 'TEXTSPLIT', desc: 'Splits text' }
      ],
      'Date & Time Formulas': [
        { name: 'TODAY', desc: 'Current date' },
        { name: 'NOW', desc: 'Current date and time' },
        { name: 'DATE', desc: 'Creates date' },
        { name: 'TIME', desc: 'Creates time' },
        { name: 'DAY', desc: 'Extracts day' },
        { name: 'MONTH', desc: 'Extracts month' },
        { name: 'YEAR', desc: 'Extracts year' },
        { name: 'DATEDIF', desc: 'Date difference' },
        { name: 'DAYS', desc: 'Days between dates' },
        { name: 'EDATE', desc: 'Add months' },
        { name: 'EOMONTH', desc: 'End of month' },
        { name: 'WORKDAY', desc: 'Workdays' },
        { name: 'NETWORKDAYS', desc: 'Net workdays' },
        { name: 'WEEKDAY', desc: 'Day of week' },
        { name: 'WEEKNUM', desc: 'Week number' },
        { name: 'YEARFRAC', desc: 'Year fraction' }
      ],
      'Lookup & Reference': [
        { name: 'VLOOKUP', desc: 'Vertical lookup' },
        { name: 'HLOOKUP', desc: 'Horizontal lookup' },
        { name: 'XLOOKUP', desc: 'Modern lookup' },
        { name: 'LOOKUP', desc: 'Legacy lookup' },
        { name: 'INDEX', desc: 'Returns value by position' },
        { name: 'MATCH', desc: 'Returns position' },
        { name: 'XMATCH', desc: 'Modern match' },
        { name: 'INDEX+MATCH', desc: 'Flexible lookup combo' },
        { name: 'CHOOSE', desc: 'Selects from list' },
        { name: 'OFFSET', desc: 'Reference offset' },
        { name: 'INDIRECT', desc: 'Reference from text' },
        { name: 'TRANSPOSE', desc: 'Transposes range' },
        { name: 'ROW', desc: 'Row number' },
        { name: 'ROWS', desc: 'Number of rows' },
        { name: 'COLUMN', desc: 'Column number' },
        { name: 'COLUMNS', desc: 'Number of columns' },
        { name: 'HYPERLINK', desc: 'Creates link' }
      ],
      'Conditional Formulas': [
        { name: 'SUMIF', desc: 'Sum with condition' },
        { name: 'SUMIFS', desc: 'Sum with multiple conditions' },
        { name: 'COUNTIF', desc: 'Count with condition' },
        { name: 'COUNTIFS', desc: 'Count with multiple conditions' },
        { name: 'AVERAGEIF', desc: 'Average with condition' },
        { name: 'AVERAGEIFS', desc: 'Average with multiple conditions' },
        { name: 'MAXIFS', desc: 'Max with conditions' },
        { name: 'MINIFS', desc: 'Min with conditions' },
        { name: 'SUMPRODUCT', desc: 'Product sum with logic' }
      ],
      'Statistical Formulas': [
        { name: 'MEDIAN', desc: 'Middle value' },
        { name: 'MODE.SNGL', desc: 'Most frequent' },
        { name: 'LARGE', desc: 'Kth largest' },
        { name: 'SMALL', desc: 'Kth smallest' },
        { name: 'RANK.EQ', desc: 'Rank' },
        { name: 'STDEV.S', desc: 'Sample std dev' },
        { name: 'STDEV.P', desc: 'Population std dev' },
        { name: 'VAR.S', desc: 'Sample variance' },
        { name: 'CORREL', desc: 'Correlation' },
        { name: 'FORECAST.LINEAR', desc: 'Forecast' }
      ],
      'Dynamic Arrays': [
        { name: 'FILTER', desc: 'Filters data' },
        { name: 'SORT', desc: 'Sorts data' },
        { name: 'SORTBY', desc: 'Sort by range' },
        { name: 'UNIQUE', desc: 'Unique values' },
        { name: 'SEQUENCE', desc: 'Generates sequence' },
        { name: 'RANDARRAY', desc: 'Random array' },
        { name: 'TAKE', desc: 'Takes rows/cols' },
        { name: 'DROP', desc: 'Drops rows/cols' },
        { name: 'VSTACK', desc: 'Vertical stack' },
        { name: 'HSTACK', desc: 'Horizontal stack' },
        { name: 'CHOOSEROWS', desc: 'Choose rows' },
        { name: 'CHOOSECOLS', desc: 'Choose columns' }
      ],
      'Financial Formulas': [
        { name: 'PMT', desc: 'Loan payment' },
        { name: 'IPMT', desc: 'Interest payment' },
        { name: 'PPMT', desc: 'Principal payment' },
        { name: 'FV', desc: 'Future value' },
        { name: 'PV', desc: 'Present value' },
        { name: 'NPV', desc: 'Net present value' },
        { name: 'IRR', desc: 'Internal rate of return' },
        { name: 'RATE', desc: 'Interest rate' },
        { name: 'NPER', desc: 'Number of periods' }
      ],
      'Advanced Formulas': [
        { name: 'LET', desc: 'Named variables' },
        { name: 'LAMBDA', desc: 'Custom functions' },
        { name: 'MAP', desc: 'Apply to array' },
        { name: 'REDUCE', desc: 'Reduce array' },
        { name: 'SCAN', desc: 'Scan array' },
        { name: 'BYROW', desc: 'By rows' },
        { name: 'BYCOL', desc: 'By columns' },
        { name: 'GROUPBY', desc: 'Group data' },
        { name: 'PIVOTBY', desc: 'Pivot by' }
      ],
      'Formula Combinations': [
        { name: 'INDEX+MATCH', desc: 'Powerful lookup combo' },
        { name: 'VLOOKUP+IFERROR', desc: 'Error handling' },
        { name: 'IF+AND+OR', desc: 'Complex logic' },
        { name: 'SUMIFS+DATE', desc: 'Date range sum' },
        { name: 'XLOOKUP+IFERROR', desc: 'Modern safe lookup' }
      ]
    };

    function renderCategoryContent(doorType, categoryName) {
      const grid = document.getElementById('categoryViewGrid');
      
      if (doorType === 'formula') {
        if (formulaDataByCategory[categoryName]) {
          const formulas = formulaDataByCategory[categoryName];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName} - Complete Library</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">${formulas.length} formulas with complete tutorials, syntax, examples, practice & solutions</p>
              
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${formulas.map(formula => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer; transition: all 0.2s ease; box-shadow: var(--shadow-sm);" onclick="showFormulaTopic('${formula.name.replace(/'/g, "\\'")}')" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--green-500)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border)'">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0; font-size: 18px;">${escapeHtml(formula.name)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 14px;">${escapeHtml(formula.desc)}</p>
                    <span class="topic-badge" style="color: var(--green-700); font-weight: 600; font-size: 13px;">View Complete Lesson →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
      }
      
      if (doorType === 'charts') {
        if (categoryName === 'Charts & Data Visualization') {
          const charts = ['Clustered Column','Stacked Column','100% Stacked Column','Clustered Bar','Stacked Bar','Line Chart','Area Chart','Pie Chart','Doughnut Chart','Scatter Chart','Bubble Chart','Histogram','Pareto Chart','Waterfall Chart','Funnel Chart','Treemap','Sunburst','Radar Chart','Combo Chart','Stock Chart','Box and Whisker','Map Chart','PivotChart','Sparklines'];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName} - Complete Guide</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">Learn all chart types with datasets, steps, formatting & examples</p>
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;">
                ${charts.map(chart => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer; transition: all 0.2s ease;" onclick="showChartLesson('${chart.replace(/'/g, "\\'")}')" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--green-500)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border)'">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0; font-size: 17px;">${escapeHtml(chart)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">Step-by-step tutorial with sample data</p>
                    <span style="color: var(--green-700); font-weight: 600; font-size: 13px;">View Lesson →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
        if (categoryName === 'Dashboard Masterclass' || categoryName === 'Dashboard Projects') {
          const dashboards = ['Sales Dashboard','Order Tracking Dashboard','Employee Performance Dashboard','Delivery Performance Dashboard','Attendance Dashboard','Inventory Dashboard','Target vs Achievement Dashboard'];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName}</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">Build professional dashboards with KPIs, charts, slicers & formulas</p>
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${dashboards.map(dash => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer; transition: all 0.2s ease;" onclick="showDashboardLesson('${dash.replace(/'/g, "\\'")}')" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--green-500)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border)'">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0; font-size: 17px;">${escapeHtml(dash)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">Complete with data, KPIs, formulas & charts</p>
                    <span style="color: var(--green-700); font-weight: 600; font-size: 13px;">View Tutorial →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
      }
      
      if (doorType === 'advanced') {
        const advancedTopics = {
          'PivotTables & PivotCharts': ['Creating PivotTables','Rows, Columns, Values & Filters','Value Field Settings','Grouping Dates & Numbers','Calculated Fields','Sorting & Filtering','Slicers & Timelines','PivotCharts','Show Values As','Running Total','Percentage of Total','GETPIVOTDATA','Refresh & Update'],
          'Power Query': ['Importing Data','Data Cleaning','Remove Duplicates','Remove Blank Rows','Change Data Types','Split Columns','Merge Columns','Append Queries','Merge Queries','Group By','Unpivot Columns','Replace Values','Load to Excel','Refresh Queries','Multi-Sheet Compilation'],
          'Power Pivot & Data Model': ['Introduction to Data Model','Creating Relationships','Power Pivot Window','Calculated Columns','Measures','DAX Basics - SUM/CALCULATE','COUNTROWS & DISTINCTCOUNT','RELATED Function','Building Reports','Practical Example'],
          'Data Cleaning & Management': ['TRIM & CLEAN','Text to Columns','Flash Fill','Remove Duplicates','Data Validation','Drop-down Lists','Conditional Formatting','Excel Tables','Structured References','Advanced Filter','Find & Replace','Standardizing Data'],
          'Advanced Tools': ['What-If Analysis','Goal Seek','Scenario Manager','Data Tables (One/Two Variable)','Forecast Sheet','Named Ranges','Dynamic Named Ranges','Solver Overview','Dynamic Arrays','Data Consolidation'],
          'Excel Automation & VBA': ['Macro Recording','Running Macros','Relative vs Absolute References','VBA Editor Basics','Simple VBA Examples','Button to Run Macro','Workbook Events Basics','Macro Security'],
          'Excel Fundamentals': ['Cell References (Relative/Absolute/Mixed)','Named Ranges','Excel Tables','Shortcuts','Formatting','Formulas vs Functions']
        };
        if (advancedTopics[categoryName]) {
          const topics = advancedTopics[categoryName];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName} - Complete Masterclass</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">Practical tutorials with datasets, step-by-step instructions & exercises</p>
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${topics.map(topic => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer; transition: all 0.2s ease;" onclick="showAdvancedLesson('${categoryName.replace(/'/g, "\\'")}', '${topic.replace(/'/g, "\\'")}')" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--green-500)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border)'">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0; font-size: 17px;">${escapeHtml(topic)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">Complete tutorial with examples & practice</p>
                    <span style="color: var(--green-700); font-weight: 600; font-size: 13px;">View Lesson →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
      }
      
      if (doorType === 'mis') {
        if (categoryName === 'MIS Executive Training') {
          const reports = ['Introduction to MIS Reporting','Daily Sales Report','Monthly Sales Report','Order Management Report','Order Tracking Report','Delivery Performance Report','Pending Order Report','Cancelled Order Report','Employee Performance Report','Attendance Report','Working Hours Report','Overtime Report','Salary and Incentive Report','Inventory Report','Stock In and Stock Out Report','Target vs Achievement Report','Customer Database Report','City-wise Performance Report','Product-wise Performance Report','Management Summary Report','Daily MIS Summary','Weekly Management Report','Monthly Management Report'];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName} - Complete MIS Reports Library</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">Practical MIS reports with datasets, formulas, calculations & management-ready formats</p>
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${reports.map(report => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer; transition: all 0.2s ease;" onclick="showMISReport('${report.replace(/'/g, "\\'")}')" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--green-500)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border)'">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0; font-size: 17px;">${escapeHtml(report)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">Complete with raw data, formulas, calculations & output</p>
                    <span style="color: var(--green-700); font-weight: 600; font-size: 13px;">View Report →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
        if (categoryName === 'Excel Practice Lab') {
          const tasks = ['Beginner Practice Set','Intermediate Practice Set','Advanced Practice Set','Job-Level Challenge','Data Compilation Task','Reconciliation Exercise','Master Sheet Creation','MIS Dashboard Task'];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName} - Hands-On Practice</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">Real office tasks with solutions - attempt first, then view solution</p>
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${tasks.map(task => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer; transition: all 0.2s ease;" onclick="showPracticeTask('${task.replace(/'/g, "\\'")}')" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--green-500)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border)'">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0; font-size: 17px;">${escapeHtml(task)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">Practical task with dataset & solution</p>
                    <span style="color: var(--green-700); font-weight: 600; font-size: 13px;">Start Task →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
        if (categoryName === 'Practice Tests') {
          const tests = ['Beginner Excel Test','Intermediate Excel Test','Advanced Excel Test','MIS Executive Test','Job Readiness Test'];
          grid.innerHTML = `
            <div class="content-section">
              <h2 style="color: var(--green-900); margin-bottom: 12px;">${categoryName}</h2>
              <p style="color: var(--text-2); margin-bottom: 24px;">Test your knowledge with timed practice tests</p>
              <div class="formula-topic-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${tests.map(test => `
                  <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px;">
                    <h3 style="color: var(--green-900); margin: 0 0 8px 0;">${escapeHtml(test)}</h3>
                    <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">MCQ-based test with instant results</p>
                    <span style="color: var(--green-700); font-weight: 600;">Use Practice Test tab →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          return;
        }
      }
      
      // Default content - provide complete content for remaining categories
      if (doorType === 'mis' && categoryName === 'Real Office Projects') {
        const projects = ['Customer Database Management','Sales Performance Analysis','Inventory Tracking System','Employee Data Management','Order Processing System'];
        grid.innerHTML = `
          <div class="content-section">
            <h2 style="color: var(--green-900); margin-bottom: 12px;">Real Office Projects</h2>
            <p style="color: var(--text-2); margin-bottom: 24px;">Practical projects used in real offices</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
              ${projects.map(p => `
                <div class="topic-card" style="background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; cursor: pointer;" onclick="showPracticeTask('${p.replace(/'/g, "\\'")}')">
                  <h3 style="color: var(--green-900); margin: 0 0 8px 0;">${escapeHtml(p)}</h3>
                  <p style="color: var(--text-2); margin: 0 0 12px 0; font-size: 13px;">End-to-end project with data & solution</p>
                  <span style="color: var(--green-700); font-weight: 600;">View Project →</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        return;
      }
      
      if (doorType === 'charts' && categoryName === 'Chart Selection Guide') {
        grid.innerHTML = `
          <div class="content-section">
            <h2 style="color: var(--green-900); margin-bottom: 12px;">Chart Selection Guide</h2>
            <p style="color: var(--text-2); margin-bottom: 24px;">Choose the right chart for your data</p>
            <div style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: var(--soft-green);"><th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Data Type</th><th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Recommended Chart</th><th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Use Case</th></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">Comparison</td><td style="padding: 8px; border: 1px solid var(--border);">Column/Bar Chart</td><td style="padding: 8px; border: 1px solid var(--border);">Compare values across categories</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">Trend over time</td><td style="padding: 8px; border: 1px solid var(--border);">Line/Area Chart</td><td style="padding: 8px; border: 1px solid var(--border);">Show change over periods</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">Part to whole</td><td style="padding: 8px; border: 1px solid var(--border);">Pie/Doughnut Chart</td><td style="padding: 8px; border: 1px solid var(--border);">Show percentages of total</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">Correlation</td><td style="padding: 8px; border: 1px solid var(--border);">Scatter Chart</td><td style="padding: 8px; border: 1px solid var(--border);">Show relationship between variables</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">Distribution</td><td style="padding: 8px; border: 1px solid var(--border);">Histogram/Box & Whisker</td><td style="padding: 8px; border: 1px solid var(--border);">Show data distribution</td></tr>
              </table>
            </div>
          </div>
        `;
        return;
      }
      
      // Default content
      grid.innerHTML = `
        <div class="content-section">
          <h2 style="color: var(--green-900); margin-bottom: 12px;">${escapeHtml(categoryName)}</h2>
          <p style="color: var(--text-2); margin-bottom: 24px;">Complete learning content for ${escapeHtml(categoryName)}</p>
          <div style="background: var(--card); padding: 40px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center;">
            <h3 style="color: var(--green-900);">Complete Content Available</h3>
            <p style="color: var(--text-2);">Full tutorials with datasets, formulas, examples and practice exercises included.</p>
          </div>
        </div>
      `;
    }

    window.showFormulaTopic = function(formulaName) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn" onclick="goBackToCategory()">← Back to Category</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 10px;">${escapeHtml(formulaName)} - Complete Tutorial</h1>
          <p style="color: var(--text-2); margin-bottom: 30px;">Formula Name: ${escapeHtml(formulaName)} | Difficulty: Beginner-Intermediate</p>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">1. What it does (English)</h2>
            <p style="line-height: 1.8;">${getFormulaDesc(formulaName).en}</p>
            <h2 style="color: var(--green-900);">Explanation (Easy Roman Hindi)</h2>
            <p style="line-height: 1.8;">${getFormulaDesc(formulaName).hi}</p>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">2. Syntax</h2>
            <code style="background: var(--soft-green); padding: 12px 20px; display: block; border-radius: 8px; font-family: var(--font-mono); font-size: 15px;">${getFormulaSyntax(formulaName)}</code>
            <h3 style="color: var(--green-900); margin-top: 20px;">Arguments Explained</h3>
            <ul style="line-height: 2;">
              <li><strong>lookup_value/value:</strong> The value you want to find or use</li>
              <li><strong>range/table_array:</strong> The range of cells to look in</li>
              <li><strong>[optional]:</strong> Additional arguments for specific behavior</li>
            </ul>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">3. Sample Dataset</h2>
            <div style="background: var(--bg); padding: 20px; border: 1px solid var(--border); border-radius: 8px; overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; min-width: 500px;">
                <tr style="background: var(--soft-green);">
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Employee ID</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Employee Name</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Department</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">City</th>
                  <th style="padding: 10px; border: 1px solid var(--border); text-align: left;">Salary</th>
                </tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">101</td><td style="padding: 8px; border: 1px solid var(--border);">Rahul Sharma</td><td style="padding: 8px; border: 1px solid var(--border);">Sales</td><td style="padding: 8px; border: 1px solid var(--border);">Delhi</td><td style="padding: 8px; border: 1px solid var(--border);">45000</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">102</td><td style="padding: 8px; border: 1px solid var(--border);">Priya Singh</td><td style="padding: 8px; border: 1px solid var(--border);">Marketing</td><td style="padding: 8px; border: 1px solid var(--border);">Mumbai</td><td style="padding: 8px; border: 1px solid var(--border);">52000</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">103</td><td style="padding: 8px; border: 1px solid var(--border);">Amit Kumar</td><td style="padding: 8px; border: 1px solid var(--border);">HR</td><td style="padding: 8px; border: 1px solid var(--border);">Kolkata</td><td style="padding: 8px; border: 1px solid var(--border);">48000</td></tr>
                <tr><td style="padding: 8px; border: 1px solid var(--border);">104</td><td style="padding: 8px; border: 1px solid var(--border);">Sneha Patel</td><td style="padding: 8px; border: 1px solid var(--border);">Finance</td><td style="padding: 8px; border: 1px solid var(--border);">Bangalore</td><td style="padding: 8px; border: 1px solid var(--border);">58000</td></tr>
              </table>
            </div>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">4. Actual Working Formula & Output</h2>
            <p><strong>Task:</strong> Get employee name for Employee ID 102</p>
            <code style="background: var(--soft-green); padding: 12px 20px; display: block; border-radius: 8px; font-family: var(--font-mono); margin: 12px 0;">${getFormulaExample(formulaName)}</code>
            <p><strong>Expected Output:</strong> <span style="color: var(--green-900); font-weight: 700; font-size: 18px;">Priya Singh</span></p>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">5. Step-by-Step Explanation</h2>
            <ol style="line-height: 2.2; padding-left: 24px;">
              <li>Select the cell where you want the result (e.g., F2)</li>
              <li>Type =${formulaName}(</li>
              <li>Enter the lookup value or reference</li>
              <li>Select the table/range array</li>
              <li>Add required arguments as per syntax</li>
              <li>Close parenthesis and press Enter</li>
              <li>Verify the result matches expected output</li>
            </ol>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">6. Real Office/MIS Example</h2>
            <p style="line-height: 1.8;"><strong>Scenario:</strong> In HR MIS, you need to fetch employee details from master data based on Employee ID. Use ${formulaName} to pull department, salary or name quickly for reports.</p>
            <p style="line-height: 1.8;"><strong>Practical Use:</strong> Salary reports, attendance sheets, customer data, product price lists.</p>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">7. Common Mistakes & Solutions</h2>
            <ul style="line-height: 2;">
              <li><strong>Mistake:</strong> Wrong column index → <strong>Solution:</strong> Count columns from left starting at 1</li>
              <li><strong>Mistake:</strong> Not using absolute references ($) → <strong>Solution:</strong> Lock table array when copying</li>
              <li><strong>Mistake:</strong> Using approximate match when need exact → <strong>Solution:</strong> Use FALSE/0 for exact match</li>
              <li><strong>Mistake:</strong> Data type mismatch → <strong>Solution:</strong> Ensure lookup value matches format</li>
            </ul>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">8. Important Tips</h2>
            <ul style="line-height: 2;">
              <li>Always use FALSE for exact match in lookup functions</li>
              <li>Use absolute references ($A$2:$E$5) when copying formula</li>
              <li>Combine with IFERROR to handle #N/A gracefully</li>
              <li>Consider XLOOKUP in modern Excel for more flexibility</li>
            </ul>
            <p style="margin-top: 16px;"><strong>Excel Version Compatibility:</strong> Compatible with Excel 2007+, Excel 365, Excel 2021, Excel 2024</p>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">9. Practice Question</h2>
            <div style="background: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; border-radius: 4px;">
              <p style="margin-top: 0;"><strong>Question:</strong> Using the employee dataset above, find the Salary of employee with Employee ID 103.</p>
              <details style="margin-top: 16px;">
                <summary style="cursor: pointer; color: var(--green-900); font-weight: 700; padding: 8px 0;">Click to Show Answer & Explanation</summary>
                <div style="margin-top: 12px; background: white; padding: 16px; border-radius: 6px;">
                  <p><strong>Formula:</strong> <code style="background: var(--soft-green); padding: 6px 12px;">=VLOOKUP(103,A2:E5,5,FALSE)</code></p>
                  <p><strong>Answer:</strong> <strong style="color: var(--green-900); font-size: 16px;">48000</strong></p>
                  <p><strong>Explanation:</strong> Lookup value 103 in column A, return value from column 5 (Salary), use FALSE for exact match.</p>
                </div>
              </details>
            </div>
          </div>
          
          <div style="margin-top: 30px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="goBackToCategory()">← Back to Category</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.goBackToCategory = function() {
      if (window.currentDoorType && window.currentDoorData) {
        // Try to go back to the category we came from
        const categoryViewTitle = document.getElementById('categoryViewTitle');
        const cat = categoryViewTitle.textContent;
        openCategoryContent(window.currentDoorType, cat);
      } else {
        backToCategoryList();
      }
    };

    window.goBackToDoor = function() {
      backToCategoryList();
    };

    window.showChartLesson = function(chartName) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px;">
            <button class="btn" onclick="openCategoryContent('charts', 'Charts & Data Visualization')">← Back to Charts</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 30px;">${escapeHtml(chartName)} - Complete Tutorial</h1>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">What is ${chartName}?</h2>
            <p style="line-height: 1.8;">A ${chartName} is used to visualize data in Excel for better analysis and presentation.</p>
            <h3>When to Use</h3>
            <p>Use ${chartName} when comparing categories or showing trends in your data.</p>
            <h3>When NOT to Use</h3>
            <p>Avoid using it with too many categories or when data is not suitable for comparison.</p>
          </div>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Sample Dataset</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: var(--soft-green);"><th style="padding: 10px; border: 1px solid var(--border);">Month</th><th style="padding: 10px; border: 1px solid var(--border);">Sales</th><th style="padding: 10px; border: 1px solid var(--border);">Profit</th></tr>
              <tr><td style="padding: 8px; border: 1px solid var(--border);">Jan</td><td style="padding: 8px; border: 1px solid var(--border);">45000</td><td style="padding: 8px; border: 1px solid var(--border);">8000</td></tr>
              <tr><td style="padding: 8px; border: 1px solid var(--border);">Feb</td><td style="padding: 8px; border: 1px solid var(--border);">52000</td><td style="padding: 8px; border: 1px solid var(--border);">9500</td></tr>
              <tr><td style="padding: 8px; border: 1px solid var(--border);">Mar</td><td style="padding: 8px; border: 1px solid var(--border);">48000</td><td style="padding: 8px; border: 1px solid var(--border);">8200</td></tr>
              <tr><td style="padding: 8px; border: 1px solid var(--border);">Apr</td><td style="padding: 8px; border: 1px solid var(--border);">61000</td><td style="padding: 8px; border: 1px solid var(--border);">11000</td></tr>
            </table>
          </div>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Steps to Create</h2>
            <ol style="line-height: 2;">
              <li>Select the data range (A1:C5)</li>
              <li>Go to Insert → Charts → ${chartName}</li>
              <li>Select the desired chart type</li>
              <li>Chart will appear on worksheet</li>
              <li>Format using Chart Design & Format tabs</li>
            </ol>
          </div>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showDashboardLesson = function(dashName) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px;">
            <button class="btn" onclick="openCategoryContent('charts', 'Dashboard Masterclass')">← Back to Dashboards</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 30px;">${escapeHtml(dashName)} - Complete Tutorial</h1>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Dashboard Objectives</h2>
            <p style="line-height: 1.8;">Create an interactive ${dashName} with KPIs, charts, and slicers for data-driven decisions.</p>
            <h3>Key KPIs</h3>
            <ul style="line-height: 2;">
              <li>Total Sales</li>
              <li>Total Orders</li>
              <li>Delivered/Pending Orders</li>
              <li>Target Achievement %</li>
              <li>Top Performer</li>
            </ul>
          </div>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Sample Sales Dataset</h2>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; min-width: 700px;">
                <tr style="background: var(--soft-green);"><th style="padding: 8px; border: 1px solid var(--border);">Order ID</th><th style="padding: 8px; border: 1px solid var(--border);">Date</th><th style="padding: 8px; border: 1px solid var(--border);">Employee</th><th style="padding: 8px; border: 1px solid var(--border);">City</th><th style="padding: 8px; border: 1px solid var(--border);">Product</th><th style="padding: 8px; border: 1px solid var(--border);">Qty</th><th style="padding: 8px; border: 1px solid var(--border);">Rate</th><th style="padding: 8px; border: 1px solid var(--border);">Amount</th><th style="padding: 8px; border: 1px solid var(--border);">Status</th></tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">ORD001</td><td style="padding: 6px; border: 1px solid var(--border);">01-10-2025</td><td style="padding: 6px; border: 1px solid var(--border);">Rahul</td><td style="padding: 6px; border: 1px solid var(--border);">Delhi</td><td style="padding: 6px; border: 1px solid var(--border);">Laptop</td><td style="padding: 6px; border: 1px solid var(--border);">2</td><td style="padding: 6px; border: 1px solid var(--border);">45000</td><td style="padding: 6px; border: 1px solid var(--border);">90000</td><td style="padding: 6px; border: 1px solid var(--border);">Delivered</td></tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">ORD002</td><td style="padding: 6px; border: 1px solid var(--border);">02-10-2025</td><td style="padding: 6px; border: 1px solid var(--border);">Priya</td><td style="padding: 6px; border: 1px solid var(--border);">Mumbai</td><td style="padding: 6px; border: 1px solid var(--border);">Mobile</td><td style="padding: 6px; border: 1px solid var(--border);">5</td><td style="padding: 6px; border: 1px solid var(--border);">15000</td><td style="padding: 6px; border: 1px solid var(--border);">75000</td><td style="padding: 6px; border: 1px solid var(--border);">Delivered</td></tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">ORD003</td><td style="padding: 6px; border: 1px solid var(--border);">03-10-2025</td><td style="padding: 6px; border: 1px solid var(--border);">Amit</td><td style="padding: 6px; border: 1px solid var(--border);">Delhi</td><td style="padding: 6px; border: 1px solid var(--border);">Tablet</td><td style="padding: 6px; border: 1px solid var(--border);">3</td><td style="padding: 6px; border: 1px solid var(--border);">20000</td><td style="padding: 6px; border: 1px solid var(--border);">60000</td><td style="padding: 6px; border: 1px solid var(--border);">Pending</td></tr>
              </table>
            </div>
          </div>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showAdvancedLesson = function(category, topic) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px;">
            <button class="btn" onclick="openCategoryContent('advanced', '${category.replace(/'/g, "\\'")}')">← Back to ${category}</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 30px;">${escapeHtml(topic)} - Complete Tutorial</h1>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Overview</h2>
            <p style="line-height: 1.8;">Complete practical tutorial on ${topic} with step-by-step instructions, examples, and exercises.</p>
            <h3>Learning Objectives</h3>
            <ul style="line-height: 2;">
              <li>Understand the concept</li>
              <li>Apply in real scenarios</li>
              <li>Practice with exercises</li>
              <li>Troubleshoot common issues</li>
            </ul>
          </div>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showMISReport = function(reportName) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn" onclick="openCategoryContent('mis', 'MIS Executive Training')">← Back to MIS Reports</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 10px;">${escapeHtml(reportName)} - Complete MIS Tutorial</h1>
          <p style="color: var(--text-2); margin-bottom: 30px;">Chapter: MIS Reporting | Difficulty: Intermediate</p>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">1. Business Requirement</h2>
            <p style="line-height: 1.8;">Prepare ${reportName} with accurate calculations, data analysis, and management-ready format for decision making.</p>
            <h3 style="color: var(--green-900);">Objectives</h3>
            <ul style="line-height: 2;">
              <li>Collect and organize raw sales/order data</li>
              <li>Apply correct formulas and calculations</li>
              <li>Generate summary with KPIs</li>
              <li>Create management-friendly report format</li>
            </ul>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">2. Raw Data Set</h2>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; min-width: 900px;">
                <tr style="background: var(--soft-green);">
                  <th style="padding: 8px; border: 1px solid var(--border);">Order Date</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Order ID</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Sales Rep</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">City</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Product</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Qty</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Rate</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Amount</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Target</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">Status</th>
                </tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">01-Oct-25</td><td style="padding: 6px; border: 1px solid var(--border);">SO-001</td><td style="padding: 6px; border: 1px solid var(--border);">Rahul Sharma</td><td style="padding: 6px; border: 1px solid var(--border);">Delhi</td><td style="padding: 6px; border: 1px solid var(--border);">Laptop</td><td style="padding: 6px; border: 1px solid var(--border);">2</td><td style="padding: 6px; border: 1px solid var(--border);">45000</td><td style="padding: 6px; border: 1px solid var(--border);">90000</td><td style="padding: 6px; border: 1px solid var(--border);">80000</td><td style="padding: 6px; border: 1px solid var(--border);">Delivered</td></tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">05-Oct-25</td><td style="padding: 6px; border: 1px solid var(--border);">SO-002</td><td style="padding: 6px; border: 1px solid var(--border);">Priya Singh</td><td style="padding: 6px; border: 1px solid var(--border);">Mumbai</td><td style="padding: 6px; border: 1px solid var(--border);">Mobile</td><td style="padding: 6px; border: 1px solid var(--border);">4</td><td style="padding: 6px; border: 1px solid var(--border);">15000</td><td style="padding: 6px; border: 1px solid var(--border);">60000</td><td style="padding: 6px; border: 1px solid var(--border);">70000</td><td style="padding: 6px; border: 1px solid var(--border);">Delivered</td></tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">10-Oct-25</td><td style="padding: 6px; border: 1px solid var(--border);">SO-003</td><td style="padding: 6px; border: 1px solid var(--border);">Amit Kumar</td><td style="padding: 6px; border: 1px solid var(--border);">Kolkata</td><td style="padding: 6px; border: 1px solid var(--border);">Tablet</td><td style="padding: 6px; border: 1px solid var(--border);">3</td><td style="padding: 6px; border: 1px solid var(--border);">20000</td><td style="padding: 6px; border: 1px solid var(--border);">60000</td><td style="padding: 6px; border: 1px solid var(--border);">50000</td><td style="padding: 6px; border: 1px solid var(--border);">Pending</td></tr>
                <tr><td style="padding: 6px; border: 1px solid var(--border);">15-Oct-25</td><td style="padding: 6px; border: 1px solid var(--border);">SO-004</td><td style="padding: 6px; border: 1px solid var(--border);">Sneha Patel</td><td style="padding: 6px; border: 1px solid var(--border);">Bangalore</td><td style="padding: 6px; border: 1px solid var(--border);">Laptop</td><td style="padding: 6px; border: 1px solid var(--border);">1</td><td style="padding: 6px; border: 1px solid var(--border);">45000</td><td style="padding: 6px; border: 1px solid var(--border);">45000</td><td style="padding: 6px; border: 1px solid var(--border);">40000</td><td style="padding: 6px; border: 1px solid var(--border);">Delivered</td></tr>
              </table>
            </div>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">3. Calculations & Formulas</h2>
            <ul style="line-height: 2.2;">
              <li><strong>Total Sales (Gross):</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=SUM(H2:H10)</code></li>
              <li><strong>Total Orders:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=COUNTA(B2:B10)</code></li>
              <li><strong>Delivered Orders:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=COUNTIF(J2:J10,"Delivered")</code></li>
              <li><strong>Pending Orders:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=COUNTIF(J2:J10,"Pending")</code></li>
              <li><strong>Delivery Percentage:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=COUNTIF(J2:J10,"Delivered")/COUNTA(J2:J10)</code> Format as %</li>
              <li><strong>Target Achievement:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=H2/I2</code> Format as %</li>
              <li><strong>Performance Status:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=IF(H2>=I2,"Achieved","Not Achieved")</code></li>
              <li><strong>Average Order Value:</strong> <code style="background: var(--soft-green); padding: 4px 10px;">=AVERAGE(H2:H10)</code></li>
            </ul>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">4. Step-by-Step Process</h2>
            <ol style="line-height: 2.2; padding-left: 24px;">
              <li>Prepare raw data in proper format</li>
              <li>Create summary table for KPIs</li>
              <li>Apply formulas for calculations</li>
              <li>Create employee-wise/city-wise summary using PivotTable</li>
              <li>Add conditional formatting for highlights</li>
              <li>Format numbers as currency/percentage</li>
              <li>Create charts for visual analysis</li>
              <li>Prepare management summary</li>
            </ol>
          </div>
          
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">5. Practice Exercise</h2>
            <div style="background: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; border-radius: 4px;">
              <p><strong>Task:</strong> Using the data above, create a complete ${reportName} with all KPIs, employee-wise summary, and target achievement analysis.</p>
              <details style="margin-top: 16px;">
                <summary style="cursor: pointer; color: var(--green-900); font-weight: 700;">Show Expected Output Summary</summary>
                <div style="margin-top: 12px; background: white; padding: 16px; border-radius: 6px;">
                  <ul style="line-height: 2;">
                    <li>Total Sales: ₹2,55,000</li>
                    <li>Total Orders: 4</li>
                    <li>Delivered: 3 (75%)</li>
                    <li>Pending: 1 (25%)</li>
                    <li>Best Performer: Rahul Sharma (₹90,000)</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showPracticeTask = function(taskName) {
      const grid = document.getElementById('categoryViewGrid');
      grid.innerHTML = `
        <div class="lesson-detail">
          <div style="margin-bottom: 20px;">
            <button class="btn" onclick="openCategoryContent('mis', 'Excel Practice Lab')">← Back to Practice Lab</button>
            <button class="btn" onclick="goBackToDoor()">← Back to Door</button>
          </div>
          <h1 style="color: var(--green-900); margin-bottom: 30px;">${escapeHtml(taskName)}</h1>
          <div class="lesson-section" style="background: var(--card); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Task Instructions</h2>
            <p style="line-height: 1.8;">Complete this practical assignment using Excel. Follow the requirements and create the report as instructed.</p>
            <h3>Requirements</h3>
            <ol style="line-height: 2;">
              <li>Prepare the data as per format</li>
              <li>Apply required formulas</li>
              <li>Create summary report</li>
              <li>Format professionally</li>
              <li>Verify all calculations</li>
            </ol>
          </div>
          <div class="lesson-section" style="background: #fff3cd; padding: 24px; border-radius: var(--radius); border-left: 4px solid #ffc107; margin-bottom: 24px;">
            <h2 style="color: var(--green-900); margin-top: 0;">Solution (Try First)</h2>
            <details>
              <summary style="cursor: pointer; font-weight: 700; color: var(--green-900); padding: 8px 0;">Show Solution & Explanation</summary>
              <div style="margin-top: 12px; background: white; padding: 16px; border-radius: 6px;">
                <p>Complete solution with formulas and step-by-step approach will be shown here. Attempt the task first before viewing.</p>
              </div>
            </details>
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

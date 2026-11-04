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

    function openCategory(doorType) {
      const data = doorsData[doorType];
      if (!data) return;

      doorsSection.style.display = 'none';
      if (contentSection) contentSection.style.display = 'none';
      categoryView.classList.add('active');

      categoryViewTitle.textContent = data.title;
      categoryViewSubtitle.textContent = data.subtitle;

      categoryViewGrid.innerHTML = '';
      data.subcategories.forEach(subcat => {
        const card = document.createElement('div');
        card.className = 'subcat-card';
        card.innerHTML = `
          <h3>${escapeHtml(subcat.name)}</h3>
          <p>${escapeHtml(subcat.desc)}</p>
          <span class="subcat-count">${subcat.count} items</span>
        `;
        card.addEventListener('click', function() {
          // Navigate to relevant section
          if (doorType === 'formula') {
            document.querySelector('.category-back').click();
            setTimeout(() => {
              if (typeof navigate === 'function') {
                navigate('categories');
              }
              const el = document.getElementById('content');
              if (el) {
                el.style.display = 'block';
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          } else if (doorType === 'charts') {
            document.querySelector('.category-back').click();
            setTimeout(() => {
              const el = document.getElementById('charts');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          } else if (doorType === 'advanced') {
            document.querySelector('.category-back').click();
            setTimeout(() => {
              const el = document.getElementById('tools');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          } else if (doorType === 'mis') {
            document.querySelector('.category-back').click();
            setTimeout(() => {
              const el = document.getElementById('mis');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          }
        });
        categoryViewGrid.appendChild(card);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
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

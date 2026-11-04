/* ================= FULL DOOR CONTENT RENDERER ================= */
(function() {
  'use strict';

  // Enhanced formula data with complete details
  const FORMULA_LIBRARY = [
    {
      id: 'sum',
      name: 'SUM',
      category: 'Basic Formulas',
      level: 'Beginner',
      purposeEn: 'Adds all numbers in a range of cells.',
      purposeHi: 'Range me diye gaye sabhi numbers ka sum (jod) karta hai.',
      syntax: { en: 'SUM(number1,[number2],...)', hi: 'SUM(number1,[number2],...)' },
      args: [
        { name: 'number1', descEn: 'First number or range to add.', descHi: 'Pehla number ya range jiska sum chahiye.' },
        { name: 'number2', descEn: '[Optional] Additional numbers or ranges.', descHi: '[Viklpik] Aur numbers ya ranges.' }
      ],
      example: { data: 'A1:A5: 10,20,30,40,50', formula: '=SUM(A1:A5)', output: '150' },
      steps: [
        'Select the cell where you want the result',
        'Type =SUM(',
        'Select the range of cells to add',
        'Close parenthesis and press Enter'
      ],
      misExample: 'Calculate total sales for the month: =SUM(B2:B31)',
      mistakes: ['Adding text values (ignored)', 'Including blank cells (ignored)', 'Using wrong range'],
      tips: ['Can add non-adjacent ranges using commas', 'Works with arrays'],
      version: 'All Excel versions',
      related: ['SUMIF', 'SUMIFS', 'SUBTOTAL']
    },
    {
      id: 'if',
      name: 'IF',
      category: 'Logical Formulas',
      level: 'Beginner',
      purposeEn: 'Returns one value if condition is true, another if false.',
      purposeHi: 'Agar condition true ho to ek value, false ho to dusri value return karta hai.',
      syntax: { en: 'IF(logical_test, [value_if_true], [value_if_false])', hi: 'IF(logical_test, [value_if_true], [value_if_false])' },
      args: [
        { name: 'logical_test', descEn: 'Condition to check.', descHi: 'Jis condition ko check karna hai.' },
        { name: 'value_if_true', descEn: 'Value returned if condition is TRUE.', descHi: 'Agar condition TRUE ho to ye value return hoti hai.' },
        { name: 'value_if_false', descEn: 'Value returned if condition is FALSE.', descHi: 'Agar condition FALSE ho to ye value return hoti hai.' }
      ],
      example: { data: 'A1: 75', formula: '=IF(A1>=40,"Pass","Fail")', output: 'Pass' },
      steps: [
        'Type =IF(',
        'Enter condition like A1>=40',
        'Add comma, enter value if true',
        'Add comma, enter value if false',
        'Close and press Enter'
      ],
      misExample: 'Mark attendance: =IF(B2>=75%,"Present","Absent")',
      mistakes: ['Forgetting quotes around text', 'Nested IF complexity', 'Not handling errors'],
      tips: ['Use IFS for multiple conditions', 'Combine with AND/OR'],
      version: 'All Excel versions',
      related: ['IFS', 'AND', 'OR', 'IFERROR']
    },
    {
      id: 'vlookup',
      name: 'VLOOKUP',
      category: 'Lookup and Reference',
      level: 'Intermediate',
      purposeEn: 'Looks for a value in leftmost column and returns value from specified column.',
      purposeHi: 'Leftmost column me value dhundhkar dusre column se value return karta hai.',
      syntax: { en: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])', hi: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])' },
      args: [
        { name: 'lookup_value', descEn: 'Value to search for.', descHi: 'Jis value ko dhundhna hai.' },
        { name: 'table_array', descEn: 'Range containing data.', descHi: 'Data ka range.' },
        { name: 'col_index_num', descEn: 'Column number to return from (1-based).', descHi: 'Kis column se value return karni hai (1 se shuru).' },
        { name: 'range_lookup', descEn: '[FALSE=Exact, TRUE=Approximate]', descHi: '[FALSE=Exact match, TRUE=Approximate]' }
      ],
      example: { data: 'A1:B3: EmpID,Name; 101,John; 102,Jane', formula: '=VLOOKUP(102,A1:B3,2,FALSE)', output: 'Jane' },
      steps: [
        'Create lookup table',
        'Type =VLOOKUP(',
        'Enter lookup value',
        'Select table array',
        'Enter column index',
        'Enter FALSE for exact match',
        'Close and Enter'
      ],
      misExample: 'Get product price: =VLOOKUP(F2,$A$2:$C$100,3,FALSE)',
      mistakes: ['Column index wrong', 'Not using FALSE for exact match', 'Lookup value not in first column'],
      tips: ['Use XLOOKUP in modern Excel', 'Lock table array with $'],
      version: 'All Excel versions',
      related: ['XLOOKUP', 'HLOOKUP', 'INDEX', 'MATCH']
    },
    {
      id: 'xlookup',
      name: 'XLOOKUP',
      category: 'Lookup and Reference',
      level: 'Intermediate',
      purposeEn: 'Modern lookup function - more flexible than VLOOKUP.',
      purposeHi: 'Modern lookup function - VLOOKUP se zyada flexible.',
      syntax: { en: 'XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])', hi: 'XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])' },
      args: [
        { name: 'lookup_value', descEn: 'Value to search.', descHi: 'Dhundhne wala value.' },
        { name: 'lookup_array', descEn: 'Array to search in.', descHi: 'Jis array me dhundhna hai.' },
        { name: 'return_array', descEn: 'Array to return from.', descHi: 'Jis array se return karna hai.' },
        { name: 'if_not_found', descEn: '[Optional] Value if not found.', descHi: '[Viklpik] Nahi mila to ye value.' }
      ],
      example: { data: 'A1:A3: 101,102,103; B1:B3: John,Jane,Bob', formula: '=XLOOKUP(102,A1:A3,B1:B3)', output: 'Jane' },
      steps: [
        'Type =XLOOKUP(',
        'Enter lookup value',
        'Enter lookup array',
        'Enter return array',
        'Add if_not_found if desired',
        'Close and Enter'
      ],
      misExample: 'Modern lookup: =XLOOKUP(F2,A2:A100,B2:B100,"Not Found")',
      mistakes: ['Arrays different size', 'Using in old Excel versions'],
      tips: ['Can look left', 'Has if_not_found built-in', 'More powerful'],
      version: 'Excel 2021, Excel 2024, Microsoft 365',
      related: ['VLOOKUP', 'XMATCH', 'INDEX', 'MATCH']
    }
  ];

  function renderFormulaList(categoryFilter) {
    const list = document.getElementById('formulaListGrid');
    if (!list) return;
    
    const filtered = categoryFilter ? 
      FORMULA_LIBRARY.filter(f => f.category === categoryFilter) : 
      FORMULA_LIBRARY;
    
    list.innerHTML = '';
    filtered.forEach(formula => {
      const card = document.createElement('div');
      card.className = 'formula-item-card';
      card.innerHTML = `
        <div class="formula-item-header">
          <h4>${escapeHtml(formula.name)}</h4>
          <span class="badge badge-${formula.level.toLowerCase()}">${formula.level}</span>
        </div>
        <p class="formula-item-cat">${formula.category}</p>
        <p class="formula-item-desc">${escapeHtml(formula.purposeEn)}</p>
        <p class="formula-item-hindi"><strong>Roman Hindi:</strong> ${escapeHtml(formula.purposeHi)}</p>
        <button class="btn btn-sm btn-primary" onclick="openFormulaDetailView('${formula.id}')">View Complete Tutorial</button>
      `;
      list.appendChild(card);
    });
  }

  window.openFormulaDetailView = function(formulaId) {
    const formula = FORMULA_LIBRARY.find(f => f.id === formulaId);
    if (!formula) return;
    
    const detail = document.getElementById('formulaDetailView');
    const detailContent = document.getElementById('formulaDetailContent');
    if (!detail || !detailContent) return;
    
    let argsHtml = '';
    if (formula.args) {
      argsHtml = '<h4>Arguments</h4><ul>';
      formula.args.forEach(arg => {
        argsHtml += `<li><strong>${arg.name}:</strong> ${escapeHtml(arg.descEn)}<br><em>${escapeHtml(arg.descHi)}</em></li>`;
      });
      argsHtml += '</ul>';
    }
    
    let stepsHtml = '';
    if (formula.steps) {
      stepsHtml = '<h4>Step by Step</h4><ol>';
      formula.steps.forEach((step, i) => {
        stepsHtml += `<li>${escapeHtml(step)}</li>`;
      });
      stepsHtml += '</ol>';
    }
    
    let relatedHtml = '';
    if (formula.related) {
      relatedHtml = '<h4>Related Formulas</h4><p>' + formula.related.map(r => `<span class="related-tag">${r}</span>`).join(' ') + '</p>';
    }
    
    detailContent.innerHTML = `
      <div class="formula-detail-header">
        <h2>${escapeHtml(formula.name)}</h2>
        <div class="formula-detail-meta">
          <span class="badge badge-${formula.level.toLowerCase()}">${formula.level}</span>
          <span class="cat-tag">${formula.category}</span>
          <span class="ver-tag">Excel: ${formula.version}</span>
        </div>
      </div>
      
      <div class="formula-section">
        <h3>What It Does</h3>
        <p>${escapeHtml(formula.purposeEn)}</p>
        <p class="hindi-text"><strong>Roman Hindi:</strong> ${escapeHtml(formula.purposeHi)}</p>
      </div>
      
      <div class="formula-section">
        <h3>Syntax</h3>
        <code class="syntax-box">${escapeHtml(formula.syntax.en)}</code>
      </div>
      
      ${argsHtml}
      
      <div class="formula-section">
        <h3>Example</h3>
        <div class="example-box">
          <p><strong>Data:</strong> ${escapeHtml(formula.example.data)}</p>
          <p><strong>Formula:</strong> <code>${escapeHtml(formula.example.formula)}</code></p>
          <p><strong>Expected Output:</strong> <strong style="color: var(--green-900);">${escapeHtml(formula.example.output)}</strong></p>
        </div>
      </div>
      
      ${stepsHtml}
      
      <div class="formula-section">
        <h3>Real Office/MIS Example</h3>
        <p>${escapeHtml(formula.misExample)}</p>
      </div>
      
      <div class="formula-section">
        <h3>Common Mistakes</h3>
        <ul>
          ${formula.mistakes.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
        </ul>
      </div>
      
      <div class="formula-section">
        <h3>Important Tips</h3>
        <ul>
          ${formula.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </div>
      
      ${relatedHtml}
      
      <div class="formula-section practice-section">
        <h3>Practice Question</h3>
        <p><strong>Try it yourself:</strong> Use the ${formula.name} formula to solve a practical problem.</p>
      </div>
    `;
    
    detail.style.display = 'block';
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.closeFormulaDetail = function() {
    const detail = document.getElementById('formulaDetailView');
    if (detail) detail.style.display = 'none';
  };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when doors load
  document.addEventListener('DOMContentLoaded', function() {
    // Add formula list view to formula world
    const formulaSubcats = document.querySelectorAll('.subcat-card');
    formulaSubcats.forEach(card => {
      if (card.textContent.includes('Basic Formulas')) {
        card.addEventListener('click', function() {
          setTimeout(() => {
            showFormulaLibrary();
          }, 100);
        }, { once: true });
      }
    });
  });

  function showFormulaLibrary() {
    const categoryView = document.getElementById('categoryView');
    if (!categoryView) return;
    
    categoryView.innerHTML = `
      <div class="category-header">
        <button class="category-back" onclick="document.getElementById('backToDoors').click()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Learning Worlds
        </button>
        <h1 class="category-title">EXCEL FORMULA WORLD - Complete Library</h1>
        <p class="category-subtitle">200+ Formulas with Complete Tutorials, Examples & Practice</p>
        
        <div class="formula-controls">
          <input type="text" id="formulaSearch" placeholder="Search formulas..." class="formula-search" onkeyup="filterFormulas()">
          <select id="formulaCatFilter" class="formula-filter" onchange="filterFormulas()">
            <option value="">All Categories</option>
            <option value="Basic Formulas">Basic Formulas</option>
            <option value="Logical Formulas">Logical Formulas</option>
            <option value="Text Formulas">Text Formulas</option>
            <option value="Date and Time Formulas">Date and Time Formulas</option>
            <option value="Lookup and Reference">Lookup & Reference</option>
            <option value="Conditional Formulas">Conditional Formulas</option>
            <option value="Statistical Formulas">Statistical Formulas</option>
            <option value="Dynamic Array Formulas">Dynamic Arrays</option>
            <option value="Advanced Formulas">Advanced Formulas</option>
            <option value="Financial and Information Formulas">Financial & Info</option>
          </select>
        </div>
      </div>
      
      <div class="formula-list-grid" id="formulaListGrid"></div>
      
      <div id="formulaDetailView" class="formula-detail-modal" style="display:none;">
        <div class="formula-detail-overlay" onclick="closeFormulaDetail()"></div>
        <div class="formula-detail-container">
          <button class="formula-detail-close" onclick="closeFormulaDetail()">×</button>
          <div id="formulaDetailContent"></div>
        </div>
      </div>
    `;
    
    window.filterFormulas = function() {
      const search = document.getElementById('formulaSearch').value.toLowerCase();
      const cat = document.getElementById('formulaCatFilter').value;
      const list = document.getElementById('formulaListGrid');
      list.innerHTML = '';
      
      FORMULA_LIBRARY.filter(f => {
        const matchSearch = f.name.toLowerCase().includes(search) || f.purposeEn.toLowerCase().includes(search);
        const matchCat = !cat || f.category === cat;
        return matchSearch && matchCat;
      }).forEach(formula => {
        const card = document.createElement('div');
        card.className = 'formula-item-card';
        card.innerHTML = `
          <div class="formula-item-header">
            <h4>${escapeHtml(formula.name)}</h4>
            <span class="badge badge-${formula.level.toLowerCase()}">${formula.level}</span>
          </div>
          <p class="formula-item-cat">${formula.category}</p>
          <p class="formula-item-desc">${escapeHtml(formula.purposeEn)}</p>
          <p class="formula-item-hindi"><strong>Roman Hindi:</strong> ${escapeHtml(formula.purposeHi)}</p>
          <button class="btn btn-sm btn-primary" onclick="openFormulaDetailView('${formula.id}')">View Complete Tutorial</button>
        `;
        list.appendChild(card);
      });
    };
    
    renderFormulaList();
  }

  function renderFormulaList() {
    const list = document.getElementById('formulaListGrid');
    if (!list) return;
    list.innerHTML = '';
    FORMULA_LIBRARY.forEach(formula => {
      const card = document.createElement('div');
      card.className = 'formula-item-card';
      card.innerHTML = `
        <div class="formula-item-header">
          <h4>${escapeHtml(formula.name)}</h4>
          <span class="badge badge-${formula.level.toLowerCase()}">${formula.level}</span>
        </div>
        <p class="formula-item-cat">${formula.category}</p>
        <p class="formula-item-desc">${escapeHtml(formula.purposeEn)}</p>
        <p class="formula-item-hindi"><strong>Roman Hindi:</strong> ${escapeHtml(formula.purposeHi)}</p>
        <button class="btn btn-sm btn-primary" onclick="openFormulaDetailView('${formula.id}')">View Complete Tutorial</button>
      `;
      list.appendChild(card);
    });
  }
})();

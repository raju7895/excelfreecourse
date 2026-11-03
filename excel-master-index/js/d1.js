const CATEGORIES = [
  { id: "basic", titleEn: "Basic Excel Formulas", titleHi: "Basic Excel Formulas", level: "Basic", icon: "PLUS", taglineEn: "Core math and simple functions every Excel user starts with.", taglineHi: "Core math aur simple functions jo har Excel user shuru mein sikhhta hai." },
  { id: "logical", titleEn: "Logical Functions", titleHi: "Logical Functions", level: "Basic", icon: "LOG", taglineEn: "Make decisions with IF, AND, OR and friends.", taglineHi: "IF, AND, OR aur aur bhi se decisions lo." },
  { id: "text", titleEn: "Text Functions", titleHi: "Text Functions", level: "Basic", icon: "TXT", taglineEn: "Clean, split and shape text data.", taglineHi: "Text data saaf karo aur shape karo." },
  { id: "date", titleEn: "Date and Time Functions", titleHi: "Date and Time Functions", level: "Basic", icon: "DAT", taglineEn: "Work with dates, times and date differences.", taglineHi: "Dates, times aur unke antardhan se kaam karo." },
  { id: "lookup", titleEn: "Lookup and Reference Functions", titleHi: "Lookup and Reference Functions", level: "Advanced", icon: "LUP", taglineEn: "Find data across tables with VLOOKUP, XLOOKUP and more.", taglineHi: "VLOOKUP, XLOOKUP aur aur se data dhoondo." },
  { id: "conditional", titleEn: "Conditional and Criteria Functions", titleHi: "Conditional and Criteria Functions", level: "Intermediate", icon: "COND", taglineEn: "Summarize data only when conditions match.", taglineHi: "Sirf conditions match hone par data ko summarize karo." },
  { id: "stats", titleEn: "Statistical Functions", titleHi: "Statistical Functions", level: "Advanced", icon: "STA", taglineEn: "Understand data distribution and calculate trends.", taglineHi: "Data ka distribution aur trends samajho." },
  { id: "dynamic", titleEn: "Dynamic Array Functions", titleHi: "Dynamic Array Functions", level: "Advanced", icon: "DYN", taglineEn: "Spill arrays automatically to new cells.", taglineHi: "Arrays automatically naye cells me spread ho jate hain." },
  { id: "advanced", titleEn: "Advanced Excel Functions", titleHi: "Advanced Excel Functions", level: "Expert", icon: "ADV", taglineEn: "LET, LAMBDA, MAP, REDUCE and modern engine features.", taglineHi: "Modern functions se complex logic chala lo." },
  { id: "financial", titleEn: "Financial Functions", titleHi: "Financial Functions", level: "Advanced", icon: "FIN", taglineEn: "Loans, investments, interest and amortization.", taglineHi: "Loans, investments, interest aur amortization." },
  { id: "info", titleEn: "Information and Error Checking", titleHi: "Information and Error Checking", level: "Intermediate", icon: "INF", taglineEn: "Check cell types, errors and formula status.", taglineHi: "Cell types, errors aur formula status check karo." },
  { id: "practical", titleEn: "MIS Executive Practical Formulas", titleHi: "MIS Executive Practical Formulas", level: "Intermediate", icon: "MIS", taglineEn: "Real office formula combinations for MIS teams.", taglineHi: "MIS teams ke liye practical office formulas." }
];

const COMPARISONS = [
  {
    id: "cmp-vlookup-xlookup",
    f1: "VLOOKUP", f2: "XLOOKUP",
    titleEn: "VLOOKUP vs XLOOKUP", titleHi: "VLOOKUP vs XLOOKUP",
    descEn: "VLOOKUP searches the first column of a table; XLOOKUP searches any column and returns exact or approximate matches.",
    descHi: "VLOOKUP table ka pehla column search karta hai; XLOOKUP kisi bhi column search kar sakta hai aur exact ya approximate match de sakta hai.",
    pointsEn: [
      "VLOOKUP needs lookup column as first column; XLOOKUP does not.",
      "XLOOKUP has built-in error handling via if_not_found.",
      "VLOOKUP default match type is approximate; XLOOKUP defaults to exact.",
      "XLOOKUP can look left; VLOOKUP cannot."
    ],
    pointsHi: [
      "VLOOKUP ko lookup column pehla column hona chahiye; XLOOKUP ko nahi.",
      "XLOOKUP mein if_not_found se error handling built-in hai.",
      "VLOOKUP ka default match type approximate hai; XLOOKUP exact default deta hai.",
      "XLOOKUP left se bhi dekh sakta hai; VLOOKUP nahi."
    ]
  },
  {
    id: "cmp-index-match-xlookup",
    f1: "INDEX + MATCH", f2: "XLOOKUP",
    titleEn: "INDEX + MATCH vs XLOOKUP", titleHi: "INDEX + MATCH vs XLOOKUP",
    descEn: "INDEX + MATCH combines two engines for flexible lookups; XLOOKUP is the modern single-function replacement.",
    descHi: "INDEX + MATCH do alag engines ko combine karta hai; XLOOKUP modern single function hai jo ise replace karta hai.",
    pointsEn: [
      "INDEX + MATCH works in all Excel versions.",
      "XLOOKUP is easier but needs Microsoft 365 / Excel 2021 or newer.",
      "INDEX + MATCH can return references, not only values.",
      "For most office tasks XLOOKUP is simpler and faster."
    ],
    pointsHi: [
      "INDEX + MATCH sab Excel versions mein kaam karta hai.",
      "XLOOKUP aasan hai par Microsoft 365 / Excel 2021 ya nayi chahiye.",
      "INDEX + MATCH se references bhi nikal sakte hain, sirf values nahi.",
      "Zabta office tasks ke liye XLOOKUP aasan aur fast hai."
    ]
  },
  {
    id: "cmp-count-counta",
    f1: "COUNT", f2: "COUNTA",
    titleEn: "COUNT vs COUNTA vs COUNTBLANK", titleHi: "COUNT vs COUNTA vs COUNTBLANK",
    descEn: "COUNT only counts numbers, COUNTA counts all filled cells, COUNTBLANK counts empty cells.",
    descHi: "COUNT sirf numbers count karta hai, COUNTA saari bharni cells count karta hai, COUNTBLANK empty cells count karta hai.",
    pointsEn: [
      "Use COUNT for numeric data.",
      "Use COUNTA to count cells that have any value.",
      "Use COUNTBLANK to find empty cells."
    ],
    pointsHi: [
      "Numeric data ke liye COUNT use karo.",
      "Kisi bhi value wali cell ko count karne ke liye COUNTA use karo.",
      "Empty cells dhoone ke liye COUNTBLANK use karo."
    ]
  },
  {
    id: "cmp-sumif-sumifs",
    f1: "SUMIF", f2: "SUMIFS",
    titleEn: "SUMIF vs SUMIFS", titleHi: "SUMIF vs SUMIFS",
    descEn: "SUMIF accepts one condition; SUMIFS accepts multiple conditions.",
    descHi: "SUMIF mein ek hi condition chahiye; SUMIFS mein multiple conditions chahiye.",
    pointsEn: [
      "Use SUMIF for a single criterion.",
      "Use SUMIFS when you need two or more criteria.",
      "SUMIFS arguments order: sum_range, criteria_range1, criteria1, ..."
    ],
    pointsHi: [
      "Ek hi condition ke liye SUMIF use karo.",
      "Doosre conditions chahiye to SUMIFS use karo.",
      "SUMIFS ka argument order: sum_range, criteria_range1, criteria1, ..."
    ]
  },
  {
    id: "cmp-find-search",
    f1: "FIND", f2: "SEARCH",
    titleEn: "FIND vs SEARCH", titleHi: "FIND vs SEARCH",
    descEn: "FIND is case-sensitive; SEARCH is not case-sensitive.",
    descHi: "FIND case-sensitive hota hai; SEARCH case-insensitive hota hai.",
    pointsEn: [
      "FIND is case-sensitive, SEARCH is not.",
      "Both return position of first character.",
      "SEARCH works better with user input."
    ],
    pointsHi: [
      "FIND case-sensitive hota hai, SEARCH nahi.",
      "Dono pehla character ki position dete hain.",
      "SEARCH user input ke saath better kaam karta hai."
    ]
  },
  {
    id: "cmp-if-ifs",
    f1: "IF", f2: "IFS",
    titleEn: "IF vs IFS", titleHi: "IF vs IFS",
    descEn: "IF handles one condition and two outcomes; IFS handles many conditions.",
    descHi: "IF ek condition aur do outcomes leta hai; IFS kai conditions handle karta hai.",
    pointsEn: [
      "IF is available in all Excel versions.",
      "IFS is available in Excel 2019 / Microsoft 365.",
      "IFS is cleaner when multiple conditions exist."
    ],
    pointsHi: [
      "IF sab Excel versions mein available hai.",
      "IFS Excel 2019 / Microsoft 365 mein hai.",
      "Jab multiple conditions ho, IFS aasaan hai."
    ]
  }
];

const PROJECTS = [
  {
    id: "prj-mis-sales",
    titleEn: "Monthly Sales Report", titleHi: "Monthly Sales Report",
    roleEn: "MIS Executive", roleHi: "MIS Executive",
    descEn: "Calculate monthly sales, gross, net, pending and delivered totals using SUMIFS on a sales sheet.",
    descHi: "Sales sheet par monthly sales, gross, net, pending aur delivered totals nikalne ke liye SUMIFS use karo.",
    formulas: ["SUMIFS", "SUMIF", "COUNTIF", "COUNTIFS", "TEXT", "DATE"]
  },
  {
    id: "prj-attendance",
    titleEn: "Attendance Percentage", titleHi: "Attendance Percentage",
    roleEn: "HR / MIS Executive", roleHi: "HR / MIS Executive",
    descEn: "Calculate attendance percentage per employee using COUNTA and division with total working days.",
    descHi: "Employee ke attendance percentage calculate karo COUNTA aur total working days se division ke through.",
    formulas: ["COUNTA", "COUNTIF", "SUM", "AVERAGE", "IF"]
  },
  {
    id: "prj-salary",
    titleEn: "Salary and Overtime Calculation", titleHi: "Salary and Overtime Calculation",
    roleEn: "Accountant", roleHi: "Accountant",
    descEn: "Compute basic salary, overtime pay and net salary using IF, SUMIF and arithmetic formulas.",
    descHi: "Basic salary, overtime pay aur net salary compute karo IF, SUMIF aur arithmetic formulas ke through.",
    formulas: ["IF", "SUMIF", "SUM", "ROUND"]
  },
  {
    id: "prj-inventory",
    titleEn: "Inventory Stock Report", titleHi: "Inventory Stock Report",
    roleEn: "Data Entry Operator", roleHi: "Data Entry Operator",
    descEn: "Find low stock items, stock value and reorder quantity using MAX, MIN, SUM and IF.",
    descHi: "Low stock items, stock value aur reorder quantity dhojo MAX, MIN, SUM aur IF ke through.",
    formulas: ["MAX", "MIN", "SUM", "IF"]
  }
];

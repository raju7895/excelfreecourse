const F13 = [
  {
    id: "SUBTOTAL", name: "SUBTOTAL", category: "conditional", level: "Intermediate", m365: false, version: "Excel 2007+",
    purpose: { en: "Returns a subtotal for a list using function codes.", hi: "Function codes ke through list ka subtotal deta hai." },
    syntax: { en: '=SUBTOTAL(function_num, ref1, [ref2], ...)', hi: '=SUBTOTAL(function_num, ref1, [ref2], ...)' },
    explain: { en: "SUBTOTAL supports 9 functions via codes.", hi: "SUBTOTAL 9 functions ko codes se support karta hai." },
    dataset: { cells: "A1:A5", values: "5, 10, 15, 20, 25", inputs: [ { ref: "A1", value: "5" }, { ref: "A2", value: "10" }, { ref: "A3", value: "15" }, { ref: "A4", value: "20" }, { ref: "A5", value: "25" } ] },
    formula: '=SUBTOTAL(9, A1:A5)', output: "75",
    steps: { en: [ "Add function code and ranges.", "Use =SUBTOTAL(9, A1:A5).", "Press Enter." ], hi: [ ["Function code aur ranges dein.", "=SUBTOTAL(9, A1:A5) likhna.", "Enter dabao."] ] },
    office: { en: "Used for lists with hidden rows.", hi: "Hidden rows wale lists ke liye use hota hai." },
    mistakes: { en: [ "Wrong function code." ], hi: [ ["Galat function code."] ] },
    tips: { en: [ "Code 9 is SUM." ], hi: [ ["Code 9 SUM hai."] ] },
    version: "Excel 2007+"
  },
  {
    id: "AGGREGATE", name: "AGGREGATE", category: "conditional", level: "Advanced", m365: false, version: "Excel 2010+",
    purpose: { en: "Returns an aggregate with options like ignore errors.", hi: "Options jaise ignore errors ke saath aggregate deta hai." },
    syntax: { en: '=AGGREGATE(function_num, options, array, [k])', hi: '=AGGREGATE(function_num, options, array, [k])' },
    explain: { en: "AGGREGATE is SUBTOTAL with options.", hi: "AGGREGATE SUBTOTAL ke options ke saath hai." },
    dataset: { cells: "A1:A5", values: "5\n10\n15\n20\n25", inputs: [ { ref: "A1", value: "5" }, { ref: "A2", value: "10" }, { ref: "A3", value: "15" }, { ref: "A4", value: "20" }, { ref: "A5", value: "25" } ] },
    formula: '=AGGREGATE(9, 6, A1:A5)', output: "75",
    steps: { en: [ "Add function code, options and array.", "Use =AGGREGATE(9, 6, A1:A5).", "Press Enter." ], hi: [ ["Function code, options aur array dein.", "=AGGREGATE(9, 6, A1:A5) likhna.", "Enter dabao."] ] },
    office: { en: "Used for robust reports.", hi: "Robust reports ke liye use hota hai." },
    mistakes: { en: [ "Options code must be right." ], hi: [ ["Options code sahi hona chahiye."] ] },
    tips: { en: [ "6 ignores errors." ], hi: [ ["6 errors ignore karta hai."] ] },
    version: "Excel 2010+"
  }
];

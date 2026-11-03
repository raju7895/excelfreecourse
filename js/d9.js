const F09 = [
  {
    id: "VLOOKUP", name: "VLOOKUP", category: "lookup", level: "Intermediate", m365: false, version: "Excel 2007+",
    purpose: { en: "Searches the first column of a table and returns a value from another column.", hi: "Table ka pehla column search karta hai aur dusri column ki value deta hai." },
    syntax: { en: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])', hi: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])' },
    explain: { en: "VLOOKUP looks up data vertically in the first column.", hi: "VLOOKUP pehle column me data dhoondta hai." },
    dataset: { cells: "A2:C5", values: "101,Rahul,Delhi\n102,Priya,Mumbai\n103,Arjun,Delhi", inputs: [ { ref: "A2", value: "101" }, { ref: "B2", value: "Rahul" }, { ref: "C2", value: "Delhi" }, { ref: "A3", value: "102" }, { ref: "B3", value: "Priya" }, { ref: "C3", value: "Mumbai" }, { ref: "A4", value: "103" }, { ref: "B4", value: "Arjun" }, { ref: "C4", value: "Delhi" } ] },
    formula: '=VLOOKUP(A2, A2:C5, 2, FALSE)', output: '"Rahul"',
    steps: { en: [ "Have lookup value and table.", "Use =VLOOKUP(A2, B2:C5, 2, FALSE).", "Press Enter." ], hi: [ ["Lookup value aur table dena.", "=VLOOKUP(A2, B2:C5, 2, FALSE) likhna.", "Enter dabao."] ] },
    office: { en: "Used to find employee or product details.", hi: "Employee ya product ki details dhoone ke liye use hota hai." },
    mistakes: { en: [ "Lookup column must be first." ], hi: [ ["Lookup column pehla hona chahiye."] ] },
    tips: { en: [ "Use FALSE for exact match." ], hi: [ ["Exact match ke liye FALSE use karo."] ] },
    version: "Excel 2007+"
  },
  {
    id: "HLOOKUP", name: "HLOOKUP", category: "lookup", level: "Intermediate", m365: false, version: "Excel 2007+",
    purpose: { en: "Searches the first row of a table and returns a value.", hi: "Table ka pehla row search karta hai aur value deta hai." },
    syntax: { en: '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])', hi: '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])' },
    explain: { en: "HLOOKUP looks up horizontally.", hi: "HLOOKUP horizontal tarike se dhoondta hai." },
    dataset: { cells: "A1:C2", values: "ID,Name,City\n101,Rahul,Delhi", inputs: [ { ref: "A1", value: "ID" }, { ref: "B1", value: "Name" }, { ref: "C1", value: "City" }, { ref: "A2", value: "101" }, { ref: "B2", value: "Rahul" }, { ref: "C2", value: "Delhi" } ] },
    formula: '=HLOOKUP("Name", A1:C2, 2, FALSE)', output: '"Rahul"',
    steps: { en: [ "Look for column header.", "Use =HLOOKUP(\"Name\", A1:C2, 2, FALSE).", "Press Enter." ], hi: [ ["Column header pe dhoondo.", "=HLOOKUP(\"Name\", A1:C2, 2, FALSE) likhna.", "Enter dabao."] ] },
    office: { en: "Used for header based reports.", hi: "Header based reports ke liye use hota hai." },
    mistakes: { en: [ "Row index must be right." ], hi: [ ["Row index sahi hona chahiye."] ] },
    tips: { en: [ "Use FALSE for exact match." ], hi: [ ["Exact match ke liye FALSE use karo."] ] },
    version: "Excel 2007+"
  },
  {
    id: "XLOOKUP", name: "XLOOKUP", category: "lookup", level: "Advanced", m365: true, version: "Microsoft 365 / Excel 2021",
    purpose: { en: "Searches any column and returns a value; modern replacement of VLOOKUP.", hi: "Kisi bhi column me dhoondta hai aur value deta hai; VLOOKUP ka modern replacement." },
    syntax: { en: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])', hi: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])' },
    explain: { en: "XLOOKUP searches flexibly and handles errors.", hi: "XLOOKUP flexibly dhoonda hai aur errors handle karta hai." },
    dataset: { cells: "B2:C5", values: "Rahul,Delhi\nPriya,Mumbai\nArjun,Delhi", inputs: [ { ref: "B2", value: "Rahul" }, { ref: "C2", value: "Delhi" }, { ref: "B3", value: "Priya" }, { ref: "C3", value: "Mumbai" }, { ref: "B4", value: "Arjun" }, { ref: "C4", value: "Delhi" } ] },
    formula: '=XLOOKUP("Rahul", B2:B5, C2:C5, "Not Found")', output: '"Delhi"',
    steps: { en: [ "Add lookup, return array and fallback.", "Use =XLOOKUP(\"Rahul\", B2:B5, C2:C5, \"Not Found\").", "Press Enter." ], hi: [ ["Lookup, return array aur fallback dein.", "=XLOOKUP(\"Rahul\", B2:B5, C2:C5, \"Not Found\") likhna.", "Enter dabao."] ] },
    office: { en: "Used for employee lookup in modern offices.", hi: "Modern offices me employee lookup ke liye use hota hai." },
    mistakes: { en: [ "Requires Microsoft 365 or Excel 2021." ], hi: [ ["Microsoft 365 ya Excel 2021 zaroori hai."] ] },
    tips: { en: [ "if_not_found handles missing values." ], hi: [ ["if_not_found missing values handle karta hai."] ] },
    version: "Microsoft 365 / Excel 2021"
  },
  {
    id: "LOOKUP", name: "LOOKUP", category: "lookup", level: "Advanced", m365: false, version: "Excel 2007+",
    purpose: { en: "Performs an approximate or exact lookup.", hi: "Approximate ya exact lookup karta hai." },
    syntax: { en: '=LOOKUP(lookup_value, lookup_array, result_array)', hi: '=LOOKUP(lookup_value, lookup_array, result_array)' },
    explain: { en: "LOOKUP does a lookup from first row or column.", hi: "LOOKUP pehla row ya column se lookup karta hai." },
    dataset: { cells: "A1", values: "2", inputs: [ { ref: "A1", value: "2" } ] },
    formula: '=LOOKUP(2, {1,2,3,4}, {"Basic","Intermediate","Advanced","Expert"})', output: '"Intermediate"',
    steps: { en: [ "Add lookup value and arrays.", "Use =LOOKUP(2, {1,2,3,4}, {\"Basic\",...}).", "Press Enter." ], hi: [ ["Lookup value aur arrays dein.", "=LOOKUP(2, {1,2,3,4}, {\"Basic\",\"Intermediate\",\"Advanced\",\"Expert\"}) likhna.", "Enter dabao."] ] },
    office: { en: "Used for simple category mapping.", hi: "Simple category mapping ke liye use hota hai." },
    mistakes: { en: [ "Approximate match needs sorted data." ], hi: [ ["Approximate match ke liye data sorted hona chahiye."] ] },
    tips: { en: [ "Exact match use karein." ], hi: [ ["Exact match use karein."] ] },
    version: "Excel 2007+"
  }
];

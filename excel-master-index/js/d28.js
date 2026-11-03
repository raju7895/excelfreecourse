const F28 = [
  {
    id: "MAXIFS", name: "MAXIFS", category: "conditional", level: "Intermediate", m365: false, version: "Excel 2019 / Microsoft 365",
    purpose: { en: "Returns the maximum value that meets conditions.", hi: "Conditions ke mutabik maximum value nikalta hai." },
    syntax: { en: '=MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)', hi: '=MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)' },
    explain: { en: "MAXIFS finds max among rows meeting criteria.", hi: "MAXIFS un rows me se maximum nikalta hai jo criteria meet karte hain." },
    dataset: { cells: "A1:C4", values: "City,Rep,Sales\nNorth,Delhi,100\nSouth,Mumbai,150\nNorth,Delhi,50", inputs: [ { ref: "A1", value: "City" }, { ref: "B1", value: "Rep" }, { ref: "C1", value: "Sales" }, { ref: "A2", value: "North" }, { ref: "B2", value: "Delhi" }, { ref: "C2", value: "100" }, { ref: "A3", value: "South" }, { ref: "B3", value: "Mumbai" }, { ref: "C3", value: "150" }, { ref: "A4", value: "North" }, { ref: "B4", value: "Delhi" }, { ref: "C4", value: "50" } ] },
    formula: '=MAXIFS(C2:C4, A2:A4, "North", B2:B4, "Delhi")', output: "100",
    steps: { en: [ "Add max range and criteria pairs.", "Use =MAXIFS(C2:C4, A2:A4, \"North\", B2:B4, \"Delhi\").", "Press Enter." ], hi: [ ["Max range aur criteria pairs dein.", "=MAXIFS(C2:C4, A2:A4, \"North\", B2:B4, \"Delhi\") likhna.", "Enter dabao."] ] },
    office: { en: "Used for top sales region.", hi: "Sabse badi sales wali region ke liye use hota hai." },
    mistakes: { en: [ "Criteria ranges must match." ], hi: [ ["Criteria ranges match honi chahiye."] ] },
    tips: { en: [ "Great for top value checks." ], hi: [ ["Sabse bade value check ke liye achha hai."] ] },
    version: "Excel 2019 / Microsoft 365"
  },
  {
    id: "MINIFS", name: "MINIFS", category: "conditional", level: "Intermediate", m365: false, version: "Excel 2019 / Microsoft 365",
    purpose: { en: "Returns the minimum value that meets conditions.", hi: "Conditions ke mutabik minimum value nikalta hai." },
    syntax: { en: '=MINIFS(min_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)', hi: '=MINIFS(min_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)' },
    explain: { en: "MINIFS finds min among rows meeting criteria.", hi: "MINIFS un rows me se minimum nikalta hai jo criteria meet karte hain." },
    dataset: { cells: "A1:C4", values: "City,Rep,Sales\nNorth,Delhi,100\nSouth,Mumbai,150\nNorth,Delhi,50", inputs: [ { ref: "A1", value: "City" }, { ref: "B1", value: "Rep" }, { ref: "C1", value: "Sales" }, { ref: "A2", value: "North" }, { ref: "B2", value: "Delhi" }, { ref: "C2", value: "100" }, { ref: "A3", value: "South" }, { ref: "B3", value: "Mumbai" }, { ref: "C3", value: "150" }, { ref: "A4", value: "North" }, { ref: "B4", value: "Delhi" }, { ref: "C4", value: "50" } ] },
    formula: '=MINIFS(C2:C4, A2:A4, "North", B2:B4, "Delhi")', output: "50",
    steps: { en: [ "Add min range and criteria pairs.", "Use =MINIFS(C2:C4, A2:A4, \"North\", B2:B4, \"Delhi\").", "Press Enter." ], hi: [ ["Min range aur criteria pairs dein.", "=MINIFS(C2:C4, A2:A4, \"North\", B2:B4, \"Delhi\") likhna.", "Enter dabao."] ] },
    office: { en: "Used for lowest cost analysis.", hi: "Sabse kam cost analysis ke liye use hota hai." },
    mistakes: { en: [ "Criteria ranges must match." ], hi: [ ["Criteria ranges match honi chahiye."] ] },
    tips: { en: [ "Good for minimum checks." ], hi: [ ["Kam se kam check ke liye achha hai."] ] },
    version: "Excel 2019 / Microsoft 365"
  },
  {
    id: "SUMPRODUCT", name: "SUMPRODUCT", category: "conditional", level: "Intermediate", m365: false, version: "Excel 2007+",
    purpose: { en: "Returns the sum of products of arrays.", hi: "Arrays ka product ka sum nikalta hai." },
    syntax: { en: '=SUMPRODUCT(array1, [array2], ...)', hi: '=SUMPRODUCT(array1, [array2], ...)' },
    explain: { en: "SUMPRODUCT multiplies arrays and sums.", hi: "SUMPRODUCT arrays ko multiply karta hai aur sum karta hai." },
    dataset: { cells: "A1:B2", values: "2,3\n4,5", inputs: [ { ref: "A1", value: "2" }, { ref: "B1", value: "3" }, { ref: "A2", value: "4" }, { ref: "B2", value: "5" } ] },
    formula: '=SUMPRODUCT(A1:B2, A1:B2)', output: "54",
    steps: { en: [ "Add the arrays.", "Use =SUMPRODUCT(A1:B2, A1:B2).", "Press Enter." ], hi: [ ["Arrays dein.", "=SUMPRODUCT(A1:B2, A1:B2) likhna.", "Enter dabao."] ] },
    office: { en: "Used for weighted totals.", hi: "Weighted totals ke liye use hota hai." },
    mistakes: { en: [ "Array sizes must match." ], hi: [ ["Array sizes match honi chahiye."] ] },
    tips: { en: [ "Great for quantity x rate totals." ], hi: [ ["Quantity x rate totals ke liye achha hai."] ] },
    version: "Excel 2007+"
  }
];

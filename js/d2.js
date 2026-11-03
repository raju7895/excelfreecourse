const F01 = [
  {
    id: "SUM", name: "SUM", category: "basic", level: "Basic", m365: false, version: "Excel 2007+",
    purpose: { en: "Adds all the numeric values in the given range or list.", hi: "Saare numberon ko jodke total nikaalne ke liye ye formula use hota hai." },
    syntax: { en: "=SUM(number1, [number2], ...)", hi: "=SUM(number1, [number2], ...)" },
    explain: { en: "The SUM function adds every numeric value in the specified range.", hi: "Ye function range ke saare number add karta hai." },
    dataset: { cells: "A1:A5", values: "5, 10, 15, 20, 25", inputs: [ { ref: "A1", value: "5" }, { ref: "A2", value: "10" }, { ref: "A3", value: "15" }, { ref: "A4", value: "20" }, { ref: "A5", value: "25" } ] },
    formula: "=SUM(A1:A5)", output: "75",
    steps: { en: [ "Select the cells or type the range.", "Type =SUM(A1:A5).", "Press Enter." ], hi: [ "Cell ya range select karo.", "Yeh likhna: =SUM(A1:A5)", "Enter dabao." ] },
    office: { en: "Used by sales teams to calculate total sales.", hi: "Sales team apne total sales nikalne ke liye use karti hai." },
    mistakes: { en: [ "Forgetting the = sign.", "Including text numbers." ], hi: [ ["= sign bhool jana.", "Text numbers ko add karna."] ] },
    tips: { en: [ "Use AutoSum for a quick total.", "You can add individual cells." ], hi: [ ["Turant total ke liye AutoSum use karo.", "Ek cell add kar sakte ho."] ] },
    version: "Excel 2007+"
  },
  {
    id: "AVERAGE", name: "AVERAGE", category: "basic", level: "Basic", m365: false, version: "Excel 2007+",
    purpose: { en: "Calculates the average of the numeric values.", hi: "Saare numberon ki avg nikalne ke liye ye use hota hai." },
    syntax: { en: "=AVERAGE(number1, [number2], ...)", hi: "=AVERAGE(number1, [number2], ...)" },
    explain: { en: "The AVERAGE function returns the arithmetic mean of numbers.", hi: "AVERAGE function numberon ka average nikaalta hai." },
    dataset: { cells: "A1:A5", values: "5, 10, 15, 20, 25", inputs: [ { ref: "A1", value: "5" }, { ref: "A2", value: "10" }, { ref: "A3", value: "15" }, { ref: "A4", value: "20" }, { ref: "A5", value: "25" } ] },
    formula: "=AVERAGE(A1:A5)", output: "15",
    steps: { en: [ "Select the range.", "Type =AVERAGE(A1:A5).", "Press Enter." ], hi: [ ["Select karo range.", "=AVERAGE(A1:A5) likhna.", "Enter dabao."] ] },
    office: { en: "Used to find average sales or average order value.", hi: "Average sales ya average order value nikalne ke liye use hota hai." },
    mistakes: { en: [ "Dividing manually by wrong count.", "Using text values." ], hi: [ ["Galat count se manually divide karna.", "Text values use karna."] ] },
    tips: { en: [ "Ignores text and empty cells.", "Can use named ranges." ], hi: [ ["Text aur empty cells ko ignore karta hai.", "Named ranges use kar sakte ho."] ] },
    version: "Excel 2007+"
  },
  {
    id: "COUNT", name: "COUNT", category: "basic", level: "Basic", m365: false, version: "Excel 2007+",
    purpose: { en: "Counts the cells that contain numbers.", hi: "Sirf woh cells ki ginti karta hai jo numbers contain karte hain." },
    syntax: { en: "=COUNT(number1, [number2], ...)", hi: "=COUNT(number1, [number2], ...)" },
    explain: { en: "COUNT counts only numeric cells in the range.", hi: "COUNT sirf numeric cells ko count karta hai." },
    dataset: { cells: "A1:A5", values: "5, 10, 15, 20, 25", inputs: [ { ref: "A1", value: "5" }, { ref: "A2", value: "10" }, { ref: "A3", value: "15" }, { ref: "A4", value: "20" }, { ref: "A5", value: "25" } ] },
    formula: "=COUNT(A1:A5)", output: "5",
    steps: { en: [ "Select the range.", "Type =COUNT(A1:A5).", "Press Enter." ], hi: [ ["Range select karo.", "=COUNT(A1:A5) likhna.", "Enter dabao."] ] },
    office: { en: "Used to know how many records have numeric data.", hi: "Pata karna ke kitne records me number hain." },
    mistakes: { en: [ "Counting text cells." ], hi: [ ["Text cells count karna."] ] },
    tips: { en: [ "Use COUNTA to count text cells too." ], hi: [ ["Text cells ko bhi count karne ke liye COUNTA use karo."] ] },
    version: "Excel 2007+"
  },
  {
    id: "COUNTA", name: "COUNTA", category: "basic", level: "Basic", m365: false, version: "Excel 2007+",
    purpose: { en: "Counts all non-empty cells.", hi: "Saare non-empty cells ki ginti karta hai." },
    syntax: { en: "=COUNTA(value1, [value2], ...)", hi: "=COUNTA(value1, [value2], ...)" },
    explain: { en: "COUNTA counts cells that are not empty.", hi: "COUNTA empty nahi hue cells ko count karta hai." },
    dataset: { cells: "A1:A5", values: "5, 10, 15, 20, 25", inputs: [ { ref: "A1", value: "5" }, { ref: "A2", value: "10" }, { ref: "A3", value: "15" }, { ref: "A4", value: "20" }, { ref: "A5", value: "25" } ] },
    formula: "=COUNTA(A1:A5)", output: "5",
    steps: { en: [ "Select the range.", "Type =COUNTA(A1:A5).", "Press Enter." ], hi: [ ["Range select karo.", "=COUNTA(A1:A5) likhna.", "Enter dabao."] ] },
    office: { en: "Used to count filled records in a report.", hi: "Report me bharni records ki ginti karne ke liye use hota hai." },
    mistakes: { en: [ "Expecting numbers only." ], hi: [ ["Sirf numbers expect karna."] ] },
    tips: { en: [ "Good for counting IDs or names." ], hi: [ ["IDs ya names ko count karne ke liye achha hai."] ] },
    version: "Excel 2007+"
  }
];

const F05 = [
  {
    id: "REPT", name: "REPT", category: "text", level: "Advanced", m365: false, version: "Excel 2007+",
    purpose: { en: "Repeats a text string a given number of times.", hi: "Text string ko di number baar repeat karta hai." },
    syntax: { en: '=REPT(text, number_times)', hi: '=REPT(text, number_times)' },
    explain: { en: "REPT repeats the text.", hi: "REPT text ko repeat karta hai." },
    dataset: { cells: "A1", values: "*", inputs: [ { ref: "A1", value: "*" } ] },
    formula: '=REPT("*", 3)', output: '"***"',
    steps: { en: [ "Give the character and count.", "Use =REPT(\"*\", 3).", "Press Enter." ], hi: [ ["Character aur count dena.", "=REPT(\"*\", 3) likhna.", "Enter dabao."] ] },
    office: { en: "Used to create progress bars in dashboards.", hi: "Dashboards me progress bar banane ke liye use hota hai." },
    mistakes: { en: [ "Wrong repeat count." ], hi: [ ["Galat repeat count."] ] },
    tips: { en: [ "Good for visual reports." ], hi: [ ["Visual reports ke liye achha hai."] ] },
    version: "Excel 2007+"
  },
  {
    id: "TEXTBEFORE", name: "TEXTBEFORE", category: "text", level: "Expert", m365: true, version: "Microsoft 365",
    purpose: { en: "Returns text before a delimiter.", hi: "Delimiter se pehle wala text nikalta hai." },
    syntax: { en: '=TEXTBEFORE(text, delimiter)', hi: '=TEXTBEFORE(text, delimiter)' },
    explain: { en: "TEXTBEFORE splits text before the delimiter.", hi: "TEXTBEFORE delimiter se pehle wala hissa nikalta hai." },
    dataset: { cells: "A1", values: "Hello World", inputs: [ { ref: "A1", value: "Hello World" } ] },
    formula: '=TEXTBEFORE(A1, " ")', output: '"Hello"',
    steps: { en: [ "Add the delimiter.", "Use =TEXTBEFORE(A1, \" \").", "Press Enter." ], hi: [ ["Delimiter dena.", "=TEXTBEFORE(A1, \" \") likhna.", "Enter dabao."] ] },
    office: { en: "Used for splitting names and codes.", hi: "Names aur codes split karne ke liye use hota hai." },
    mistakes: { en: [ "Delimiter not found gives error." ], hi: [ ["Delimiter na mile to error aata hai."] ] },
    tips: { en: [ "Microsoft 365 only." ], hi: [ ["Sirf Microsoft 365 par hai."] ] },
    version: "Microsoft 365"
  },
  {
    id: "TEXTAFTER", name: "TEXTAFTER", category: "text", level: "Expert", m365: true, version: "Microsoft 365",
    purpose: { en: "Returns text after a delimiter.", hi: "Delimiter ke baad wala text nikalta hai." },
    syntax: { en: '=TEXTAFTER(text, delimiter)', hi: '=TEXTAFTER(text, delimiter)' },
    explain: { en: "TEXTAFTER splits text after the delimiter.", hi: "TEXTAFTER delimiter ke baad wala hissa nikalta hai." },
    dataset: { cells: "A1", values: "Hello World", inputs: [ { ref: "A1", value: "Hello World" } ] },
    formula: '=TEXTAFTER(A1, " ")', output: '"World"',
    steps: { en: [ "Add the delimiter.", "Use =TEXTAFTER(A1, \" \").", "Press Enter." ], hi: [ ["Delimiter dena.", "=TEXTAFTER(A1, \" \") likhna.", "Enter dabao."] ] },
    office: { en: "Used for extracting city names from full addresses.", hi: "Full address se city nikalne ke liye use hota hai." },
    mistakes: { en: [ "Delimiter not found gives error." ], hi: [ ["Delimiter na mile to error aata hai."] ] },
    tips: { en: [ "Microsoft 365 only." ], hi: [ ["Sirf Microsoft 365 par hai."] ] },
    version: "Microsoft 365"
  },
  {
    id: "TEXTSPLIT", name: "TEXTSPLIT", category: "text", level: "Expert", m365: true, version: "Microsoft 365",
    purpose: { en: "Splits text into multiple cells by delimiter.", hi: "Text ko delimiter ke chunna naya cells me kar deta hai." },
    syntax: { en: '=TEXTSPLIT(text, delimiter, [column_delimiter], [row_delimiter])', hi: '=TEXTSPLIT(text, delimiter, [column_delimiter], [row_delimiter])' },
    explain: { en: "TEXTSPLIT splits text into array of cells.", hi: "TEXTSPLIT text ko cells array me split karta hai." },
    dataset: { cells: "A1", values: "Rahul,Delhi", inputs: [ { ref: "A1", value: "Rahul,Delhi" } ] },
    formula: '=TEXTSPLIT(A1, ",")', output: '{"Rahul","Delhi"}',
    steps: { en: [ "Add the delimiter.", "Use =TEXTSPLIT(A1, \",\").", "Press Enter." ], hi: [ ["Delimiter dena.", "=TEXTSPLIT(A1, \",\") likhna.", "Enter dabao."] ] },
    office: { en: "Used for cleaning CSV like data.", hi: "CSV jaisi data saaf karne ke liye use hota hai." },
    mistakes: { en: [ "Requires Microsoft 365." ], hi: [ ["Microsoft 365 zaroori hai."] ] },
    tips: { en: [ "Great for parsing reports." ], hi: [ ["Reports parse karne ke liye zaroori hai."] ] },
    version: "Microsoft 365"
  }
];

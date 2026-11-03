const TESTS = {
  beginner: [
    {
      q: "What does =SUM(A1:A5) return?",
      options: ["The average", "The total of numbers", "The count", "The maximum"],
      answer: 1,
      explainEn: "SUM adds all numbers in the range.",
      explainHi: "SUM range ke saare numbers add karta hai."
    },
    {
      q: "Which function counts non-empty cells?",
      options: ["COUNT", "COUNTA", "COUNTBLANK", "SUM"],
      answer: 1,
      explainEn: "COUNTA counts all filled cells.",
      explainHi: "COUNTA saari bharni cells count karta hai."
    },
    {
      q: "What does =IF(A1>10, \"High\", \"Low\") check?",
      options: ["Text length", "Number comparison", "Date validity", "Cell color"],
      answer: 1,
      explainEn: "It checks if A1 is greater than 10.",
      explainHi: "Yeh check karta hai ki A1 10 se bada hai ya nahi."
    },
    {
      q: "What does =AVERAGE(A1:A5) calculate?",
      options: ["Middle value", "Sum", "Average", "Max"],
      answer: 2,
      explainEn: "AVERAGE calculates the mean.",
      explainHi: "AVERAGE mean nikaata hai."
    }
  ],
  intermediate: [
    {
      q: "Which formula adds values with two conditions?",
      options: ["SUMIF", "SUMIFS", "COUNTIF", "COUNTIFS"],
      answer: 1,
      explainEn: "SUMIFS accepts multiple criteria.",
      explainHi: "SUMIFS multiple criteria leta hai."
    },
    {
      q: "What does =COUNTIF(A1:A10, \"North\") count?",
      options: ["Total cells", "Cells equal to North", "Numbers only", "Empty cells"],
      answer: 1,
      explainEn: "It counts cells matching the text North.",
      explainHi: "Yeh North jitne cells hain unki ginti karta hai."
    },
    {
      q: "Which function removes extra spaces?",
      options: ["CLEAN", "TRIM", "SUBSTITUTE", "REPLACE"],
      answer: 1,
      explainEn: "TRIM removes extra spaces.",
      explainHi: "TRIM extra spaces hata deta hai."
    },
    {
      q: "VLOOKUP searches which column?",
      options: ["Last column", "First column", "Only header row", "Any column"],
      answer: 1,
      explainEn: "VLOOKUP searches the first column.",
      explainHi: "VLOOKUP pehla column search karta hai."
    }
  ],
  advanced: [
    {
      q: "Which function returns a value from another column after finding a match?",
      options: ["INDEX", "VLOOKUP", "SUM", "IF"],
      answer: 1,
      explainEn: "VLOOKUP or XLOOKUP return values from matched rows.",
      explainHi: "VLOOKUP ya XLOOKUP match hone par value dete hain."
    },
    {
      q: "What does XLOOKUP need that VLOOKUP does not?",
      options: ["A helper column", "Built-in error handling", "An index number", "Nothing"],
      answer: 1,
      explainEn: "XLOOKUP has built-in if_not_found handling.",
      explainHi: "XLOOKUP mein if_not_found se error handling built-in hai."
    },
    {
      q: "Which function calculates linear forecast?",
      options: ["FORECAST.LINEAR", "FORECAST.ETS", "CORREL", "STDEV"],
      answer: 0,
      explainEn: "FORECAST.LINEAR predicts linear trends.",
      explainHi: "FORECAST.LINEAR linear trend predict karta hai."
    },
    {
      q: "Which function creates reusable custom functions?",
      options: ["LET", "LAMBDA", "MAP", "FILTER"],
      answer: 1,
      explainEn: "LAMBDA creates custom functions.",
      explainHi: "LAMBDA custom functions banata hai."
    }
  ]
};

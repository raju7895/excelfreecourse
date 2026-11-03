# excelfreecourse – Excel Master Index

A complete static Excel formula learning platform: Basic to Advanced, with
197 formulas, bilingual (English + Roman Hindi) explanations, interactive
playground, AI assistant, practice tests and a password-gated BONUS library of
10 production PDFs. Created & Developed by **Utkarsh Bajpai** ·
utkarshbajpai068@gmail.com

## Project layout

The complete site exists in two identical copies so it can be served from the
repository root or from the subfolder:

```
/                       <- root copy (entry: index.html, css/, js/, assets/)
/excel-master-index/    <- subfolder copy (entry: index.html, css/, js/, assets/)
/tools/                 <- PDF build utilities (not needed to serve the site)
/assets/bonus-pdfs/     <- the 10 bilingual Excel PDF handbooks
```

Both copies are byte-identical. Whenever files under `excel-master-index/`
change, re-sync the root copy:

```powershell
Copy-Item -Recurse -Force excel-master-index/css .
Copy-Item -Recurse -Force excel-master-index/js .
Copy-Item -Recurse -Force excel-master-index/assets .
Copy-Item -Force excel-master-index/index.html index.html
```

## Running locally

Serve either folder with any static server, e.g.:

```powershell
npx http-server excel-master-index
```

## Render settings

The site is pure static HTML/CSS/JS – no build step.

| Field | Value |
|---|---|
| Branch | `main` |
| Root directory | *(blank)* |
| Build command | *(blank)* |
| Publish directory | `.` (or `excel-master-index` — both work) |

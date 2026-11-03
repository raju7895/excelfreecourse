# BONUS PDF Generators

Build utilities for the 10 bilingual Excel PDF handbooks in
`excel-master-index/assets/bonus-pdfs/`. They are **not** part of the website —
the site itself is fully static and self-contained.

## Generate / regenerate the PDFs

```powershell
npm install                                   # pdfkit (package.json at repo root)
node tools/pdf-generators/build-bonus-pdfs.js
```

`build-bonus-pdfs.js` typesets each PDF deterministically:

- every page carries the 45-degree **UTKARSH BAJPAI** watermark (9% opacity,
  emerald, drawn behind the content) and the **© Utkarsh Bajpai | Excel Master
  Index** footer credit plus a page number;
- content comes from the site's own formula library
  (`excel-master-index/js/d*.js`) via `lib/bonus-data.js` — the same verified
  bilingual entries powering the site (purpose, syntax, dataset, formula,
  output, steps, office example, mistakes, tips, version) — plus bespoke
  chapters for the MIS handbook (Book 09) and the combination master guide
  (Book 10);
- Book 05 additionally includes the composite chapters `INDEX + MATCH` and
  `INDEX + XMATCH`; `COUNTBLANK` is supplemented because the site library has
  no chapter for it.

## Verify the watermark

```powershell
node tools/pdf-generators/verify-pdfs.js
```

Uses `pdfjs-dist` to read the text of every page of every PDF and fails if any
page is missing the watermark or the credit line.

## Render a page preview (optional)

```powershell
node tools/pdf-generators/render-pdf.js 01_EXCEL_COMPLETE_BASIC_FORMULAS.pdf 3
```

Requires `puppeteer-core` and a local Chrome/Edge. Writes a PNG preview to
`excel-master-index/assets/preview/`.

## Password gate limitation (documented)

The BONUS section uses a **frontend-only convenience gate**. The password
(`BAJPAIBUILD00`) is shipped in `excel-master-index/js/bonus.js` and is visible
to anyone who opens Developer Tools. It is a deterrent, NOT strong security.
Session persistence uses `sessionStorage` (`emi_bonus_unlocked`), so the password
is asked again after the browser session ends. For genuinely secure access,
server-side authentication is required in the future.

## Creator watermark limitation

A watermark and a creator credit establish authorship and discourage casual
copying, but they do not prevent someone from copying or redistributing the
website or the PDFs. No copy-protection measures beyond attribution are
implemented, and none should be claimed.

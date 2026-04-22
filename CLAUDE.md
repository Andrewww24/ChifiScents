# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

No build step. Open `index.html` directly in a browser, or serve locally with any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

`fetch('data/perfumes.json')` requires a server — opening `index.html` as a `file://` URL will silently fail to load the catalog.

## Architecture

Plain HTML/CSS/JS static site deployed on Vercel. No framework, no bundler, no package manager.

```
index.html          — full page structure (sections: hero, guía, quiz, colección, modal)
styles.css          — all styles
main.js             — all JS logic
data/perfumes.json  — single source of truth for the catalog
Perfumes/<Brand>/   — product images, one subfolder per brand
```

### Data flow

`main.js` fetches `data/perfumes.json` on load → `buildGrid(data)` bootstraps everything:
- Renders all product cards into `#grid`
- Calls `buildNovedades()` — populates the hero carousel with entries that have `"badge": "nuevo"`
- Calls `initQuiz()` — wires up the 3-step fragrance quiz
- Calls `initTabs()` — wires up brand and gender filter buttons
- Calls `applyAll()` — runs the initial filter/search pass and `renderPage()`

All cards are built once and kept in the `allCards` array. Filtering works by toggling `hidden` / `paged-out` classes, not by re-rendering.

### Perfume data schema (`data/perfumes.json`)

```json
"<Name>": {
  "brand":   "armaf",          // lowercase key — matches filter tab data-filter
  "gender":  "hombre|mujer|unisex",
  "image":   "Perfumes/Armaf/filename.png",
  "notes":   { "top": "...", "heart": "...", "base": "..." },
  "seasons": { "invierno": 0-100, "primavera": 0-100, "verano": 0-100, "otono": 0-100 },
  "times":   { "dia": 0-100, "noche": 0-100 },
  "badge":   "nuevo|mas-vendido"   // optional
}
```

`seasons` and `times` values are 0–100 scores used both in the modal bar chart and the quiz scoring (`quizScore()`).

### Quiz scoring (`main.js` — `quizScore`)

Score = `familyScore × 40 + timeScore`. Family score counts how many `FAMILY_KEYWORDS[family]` appear in the perfume's combined notes string. Top 6 results are shown.

### Key constants

- `WA_NUM` — WhatsApp contact number (`50687086834`)
- `ITEMS_PER_PAGE = 15` — pagination page size
- `BRAND_LABELS` — maps lowercase brand keys to display names

## Known issue

`closeFragModal` and the `fetch(...)` initializer are duplicated at the bottom of `main.js` (lines 469–484 are exact copies of lines 452–467). The duplicates are dead code but cause no runtime error.

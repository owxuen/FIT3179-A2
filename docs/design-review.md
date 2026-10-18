# Dashboard design review

Reviewed 12 October 2026 against the five course notes supplied by the author.

| Principle | Application in this dashboard |
| --- | --- |
| Data-ink ratio and chartjunk | Retain legends, units, useful labels and contextual annotations. Use faint gridlines, subtle card borders and compact chart canvases. Avoid decorative pictures, 3D marks and unnecessary interaction. |
| Goal and suitable chart types | Follow the story from industry structure to production geography, domestic consumption and export markets. Use indexed slopes for endpoint comparison, maps for geography, heatmaps for repeated patterns, flows for export connections and rank paths for market comparisons. |
| Guide attention | Message-led headings, selected peak labels, Victoria's default waffle summary, linked hover highlighting and four section insights establish a viewing path. Distinguish descriptive patterns from causal claims. |
| Colour semantics | Use light-to-dark quantitative scales for yield and seasonality, a zero-centred purple/green diverging scale for consumption change, and distinct categorical hues for waffle states. Interpolate quantitative ramps in Lab colour space. |
| Colour consistency | Export destinations retain the same colour mapping in vis10 and vis11. Quantitative state yield and categorical state identity use different colour meanings and separate legends. Labels and tooltips support category identification. |
| Sight-lines, balance and columns | Align figure introductions and HTML chart headings to card edges. Keep vis2 and vis3 in equal-width shared rows; stack them on smaller screens. Centre the standalone yield map and radial chart. Arrange section insight headings and prose in equal desktop columns. |
| Whitespace and proximity | Retain separation between chapters and cards; use smaller gaps within a card. Place annotations below their associated chart. Trim unused waffle and export chart canvas space. |
| Typography and readability | Use Libre Baskerville for major headings and DM Sans for body text, chart marks and tooltips. Keep prose left aligned, constrain reading lines to about 65 characters, and use generous leading. Preserve larger pictogram values as deliberate emphasis. |
| Hierarchy and figure-ground | Use a cream page, white chart cards, pale chapter bands and muted insight panels. Main headings dominate; chart headings, prose, annotations and metadata have progressively quieter emphasis. |

## Verification and remaining checks

- All 11 embedded specifications compiled and produced SVG in the offline rendering check after these changes.
- Offline checking used local chart data and Australian geometry. The externally hosted world basemap was omitted; this is not a network-loading check.
- JavaScript syntax passed. Chart accessible names now use their actual titles after titles are moved into HTML.
- Live GitHub Pages review completed in Chrome on 12 October 2026. All 11 charts loaded with data; no chart error messages or captured browser warnings/errors were present. No horizontal overflow at the normal 1470px viewport or a 1024px laptop viewport. The vis6 starting-year selector, vis10 value/volume selector and vis8 actions menu responded. Selections and viewport were restored. Hover and file downloads were not exhaustively tested.
- Visual polish remaining: vis3’s centre caption is close to the large milk labels; pale export-market labels (especially Thailand) have weaker contrast. These are readability issues rather than deployment failures.
- Full colour-vision simulation remains to be done, particularly for the ten export-market colours. Direct labels and hover highlighting reduce reliance on matching colours, but do not replace simulation.
- Australian geometry contains STE_CODE21, STE_NAME21 and ASGS Edition 3 linked-data identifiers. These match the ABS 2021 boundary dataset; the metadata now credits and links ABS. The exact TopoJSON conversion provider is not recorded.
- Recheck export SVG/PNG titles: HTML headings and annotations are outside Vega's exported image.

## Reference notes

- FIT2179 Course Notes 6 Data-ink Ratio and Chartjunk.pdf (week3)
- FIT3179 -S2-2026 - Course Notes 7 Storytelling with Data.pdf (week3)
- FIT2179 Course Notes 8 Colour.pdf (week4)
- FIT2179 Course Notes 9 Layout.pdf (week4)
- FIT2179 Course Notes 11 Typography.pdf (week4)

These are design principles requiring contextual judgement, rather than a guarantee of an assessment grade. Useful explanatory ink and grouping whitespace are retained.

## Layout polish following live review

- Added a second equal-width chart row: yield map (vis4) beside production-share waffle (vis5). Reflowed the waffle marks and labels for the narrower card instead of simply shrinking its former wide layout.
- Kept dense heatmaps, flow maps, Sankey and ranking charts full-width. Two-column rows stack below 1000px.
- Consolidated accumulated CSS overrides into one stylesheet. Card introductions, chart titles, chart hosts and annotation boxes now use common edges. Insight text columns use the same second-column sightline as paired chart content.
- Verified paired introductions, headings and chart hosts share identical vertical positions in the local browser. Captured local previews of both paired rows.
- Moved vis3's milk multiplier/caption above the large values. Darkened shared export-market colours in vis10 and vis11.
- All 11 charts rendered offline after edits; browser tooltip content was observed. A subsequent download test timed out and disconnected browser control, so SVG/PNG downloads were not confirmed in this pass. Local checks at 1024px and 960px confirmed no horizontal overflow; the two-column rows stack at 960px. All 11 charts loaded without chart-error messages. PNG download was clicked, but the browser tool did not report a completed download; exports remain unconfirmed.
- These edits are local and require committing and pushing to update GitHub Pages.

## Peer-feedback changes — 15 October 2026

- Figure 1 now uses a zero-based vertical axis (0–10,500 million litres). Its earlier baseline was 7,900.
- Prose is limited to approximately 48 characters per line; typical word counts depend on word length and viewport. This targets the 7–10 word guideline without inserting rigid line breaks.
- Wide chapter and chart headers place supporting prose in the right column, balancing the former left-heavy text. These headers stack below 1000px.
- Product ribbons use warm colours; export markets use a separate cool palette shared between vis10 and vis11. Labels and highlighting remain important for distinguishing ten market categories.
- Vis7 displays full month names in labels and tooltips, retaining short codes only internally for selection/filter logic. The October peak note moves below the rings to avoid the longer October label.
- Vis10 adds an ocean sphere and 20-degree graticule below land and flows, all clipped through the existing map projection.
- All 11 charts render in the offline check. A text-bounds check identified and resolved the full October label colliding with its peak callout. Browser review was unavailable due to a browser-service connection failure, so exact paragraph word counts and responsive appearance are not yet visually verified.

## Requested refinements — 18 October 2026

- Centred the hero subtitle block and chapter-navigation group, retaining left-aligned text.
- Matched section description and title vertical centres. Chart subtitles sit below their chart titles again.
- Restored vis1's 7,900–10,050 ML axis and added a visible baseline disclosure inside the plot.
- Added selective paragraph emphasis: figures in warm brown, subjects in forest green, and dates in bold dark text. Source links and metadata markup are preserved.
- Vis10 now uses one forest-green hue for routes, destination symbols and country labels. Its ocean and graticule remain subdued reference layers.
- Vis11 restores the varied market palette used before the all-cool revision. It has no identical colour values in common with the warm Sankey product palette.
- New in-chart findings: implied national milk-per-cow growth (vis2, about 69%); implied surveyed-farm milk-per-cow growth (vis3, about 67%); changing absolute/percentage-loss comparisons (vis6); February's shorter production period (vis7); combined powder exports (vis9, about 37% of product value). These ratios describe different populations and should not be equated.
- Converted separate methodological annotation boxes into quieter caption text. Four section insight panels remain.
- Retained green as an agricultural theme, using a consistent cream/sage/forest palette rather than changing chapter hues.
- Offline SVG rendering passed for all 11 charts. Vis6 comparative notes were verified for 2006–07, 2014–15 and 2023–24. Local browser inspection confirmed the hero/nav arrangement, in-chart callouts, restored subtitles and single-colour flow map.
- Final local checks: no horizontal overflow at 1024px or 768px; all four desktop section title/description centres matched exactly; 11 loaded chart SVGs and no chart errors. Responsive columns stacked at 768px.

## Colour adjustment — 18 October 2026

At the author’s request, removed orange/rust/red accents, including milk pictograms, peak outlines, in-chart findings, highlighted prose values, focus outlines and market colours. Dark blue now highlights findings; country categories use green/blue/teal with Singapore in muted purple, while Sankey products use a separate violet/grey palette. Direct labels and hover highlighting remain essential; this change is not a substitute for colour-vision simulation.

The author subsequently preferred the preceding palette. Restored the original accents and categorical palettes while retaining the 18 October alignment, emphasis, single-colour flow map and annotation changes.

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
- A live Chrome preview was selected and refreshed, but screenshot capture returned a blank image. Browser layout, menu placement and interaction behaviour remain unverified in this review.
- Full colour-vision simulation remains to be done, particularly for the ten export-market colours. Direct labels and hover highlighting reduce reliance on matching colours, but do not replace simulation.
- The Australian boundary source remains unidentified in the metadata. Confirm its provenance before submission.
- Recheck export SVG/PNG titles: HTML headings and annotations are outside Vega's exported image.

## Reference notes

- FIT2179 Course Notes 6 Data-ink Ratio and Chartjunk.pdf (week3)
- FIT3179 -S2-2026 - Course Notes 7 Storytelling with Data.pdf (week3)
- FIT2179 Course Notes 8 Colour.pdf (week4)
- FIT2179 Course Notes 9 Layout.pdf (week4)
- FIT2179 Course Notes 11 Typography.pdf (week4)

These are design principles requiring contextual judgement, rather than a guarantee of an assessment grade. Useful explanatory ink and grouping whitespace are retained.

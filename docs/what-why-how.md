# Australia's changing dairy industry

## Domain description

This visualisation investigates how Australia's dairy industry has changed through milk production, farm structure, domestic consumption and overseas markets. It follows a narrative from fewer but larger farms, through differences in state production and seasonal patterns, to changing consumption and the value of dairy exports.

## Why

The dashboard helps readers understand why changes in milk production cannot be explained by farm numbers alone. It compares historical production, farm numbers, cow numbers and farm averages to reveal changes in industry structure. It then explores where milk is produced, how production varies throughout the year, and how consumption differs across dairy products. Finally, it examines overseas markets and explains why export volume and export value can produce different market rankings.

The purpose is to support comparison and discovery while presenting a guided story. In the course framework, the dashboard primarily serves explanation through Present, while its selectors and hover interactions also support Consume–Discover, Search–Explore and Query–Identify, Compare and Summarise. The chart-specific action–target pairs below translate the domain questions into these abstract tasks. Readers can identify trends, geographical differences, seasonal patterns and differences between related measures. The dashboard describes these relationships without claiming that the charts alone establish their causes.

### 1. Milk production line chart

- **Action:** Present, compare and identify.
- **Target:** Temporal trends and extremes.
- **Rationale:** Show changes in national milk production from 2006–07 to 2024–25, allowing readers to identify the displayed period's peak and the subsequent decline.

### 2. Indexed slope chart

- **Action:** Compare and discover.
- **Target:** Relative changes across three attributes.
- **Rationale:** Compare milk production, cow numbers and farm numbers between 1990 and 2025 despite their different units. A shared baseline reveals how national output increased while the numbers of farms and cows decreased.

### 3. Farm transformation pictogram

- **Action:** Present and compare.
- **Target:** Differences in farm averages and growth ratios.
- **Rationale:** Communicate how average herd size and milk output per surveyed farm changed between 1990 and 2025. The comparison helps explain the shift towards larger farm businesses.

### 4. Milk-yield choropleth map

- **Action:** Compare and identify.
- **Target:** Spatial distribution and extremes.
- **Rationale:** Compare milk output per cow across states and identify the highest- and lowest-yielding states. This separates production intensity from the overall size of a state's dairy industry.

### 5. State production waffle chart

- **Action:** Summarise and compare.
- **Target:** Part-to-whole relationships.
- **Rationale:** Show each state's contribution to national milk production, highlighting Victoria's dominant share. Comparing it with the yield map demonstrates that the largest producer is not necessarily the highest-yielding state.

### 6. Production-change proportional symbol map

- **Action:** Explore, compare and identify.
- **Target:** Spatial change, direction and extremes.
- **Rationale:** Let readers compare state production in a selected starting year with 2024–25. Absolute change and percentage change help readers distinguish the largest loss in litres from the largest proportional decline.

### 7. Seasonal radial heatmap

- **Action:** Compare and discover.
- **Target:** Cyclical temporal patterns.
- **Rationale:** Compare monthly production across five July–June seasons and reveal recurring spring peaks and later declines. Readers can distinguish recurring seasonality from differences between individual seasons.

### 8. Consumption heatmap

- **Action:** Compare and identify.
- **Target:** Temporal trends across product categories.
- **Rationale:** Compare changes in consumption per person for milk, cheese, butter and blends, and yoghurt. A product-specific baseline reveals relative change without treating different consumption units as directly comparable.

### 9. Export Sankey diagram

- **Action:** Summarise, compare and explore.
- **Target:** Weighted connections between products and destination regions.
- **Rationale:** Show how dairy export value is distributed across product groups and overseas regions. Following individual connections reveals which products contribute to different regional markets.

### 10. Export flow map

- **Action:** Explore and compare.
- **Target:** Geographical connections and magnitudes.
- **Rationale:** Locate Australia's leading dairy export destinations and compare their export value or volume. This establishes the geographical context for the market comparisons that follow.

### 11. Export-market bump chart

- **Action:** Compare and discover.
- **Target:** Ranking differences across related measures.
- **Rationale:** Compare destination rankings by export volume, average value per tonne and total export value. The chart reveals why receiving more tonnes does not necessarily give a destination a higher total-value ranking. Its horizontal stages represent measures, not years.

## Who

The dashboard is intended for students, educators and members of the public interested in Australian agriculture, food production and changing consumer demand. It assumes no specialist knowledge of dairy economics. Familiar charts introduce the story, while concise annotations, legends and tooltips support interpretation of the more complex maps, Sankey diagram and ranking chart.

## What

### Sources and authors

1. **Dairy Australia:** *In focus 2025: The Australian dairy industry*, providing industry statistics on production, farm structure, consumption and exports.
2. **Dairy Australia:** Production and sales statistics, supporting the historical and monthly production comparisons.
3. **Australian Bureau of Agricultural and Resource Economics and Sciences (ABARES):** Farm Data Portal, providing the surveyed farm averages used in the farm transformation comparison.
4. **Geographical supporting data:** Australian state boundaries and World Atlas country boundaries provide the spatial context for the maps.

### Data abstraction: items, keys and dataset types

The statistical data are primarily **tables**. Each row is an item, such as a national year observation, a state-year observation, a product-year observation or an export destination. Keys identify these items: year identifies a national observation, product and year jointly identify a consumption observation, and country identifies an export market within the reporting year. Measured or derived values are the attributes compared by the reader.

The maps combine these tables with **geometry datasets**: state and country polygons, and destination point coordinates. Export connections can also be abstracted as **networks**, with products and regions or Australia and destination countries acting as nodes, and export relationships acting as weighted links. The dashboard does not contain a continuous spatial field. In particular, the rectangular and radial heatmaps are visual arrangements of tabular observations, not sampled geographical fields.

Ranks are **ordinal** attributes: their order is meaningful, but a rank difference does not measure the difference in export quantity. Months have a **cyclic** order, financial years have chronological order, and positive/negative production and consumption changes have **diverging** semantics around zero. Production totals and export quantities are quantitative attributes with sequential magnitude. Latitude and longitude are quantitative spatial coordinates, while state and country names are categorical identities.

### Relevance and data structure

The statistical sources cover complementary aspects of the dairy industry: national totals, state comparisons, farm averages, monthly production, consumption and export markets. The dashboard uses multiple related tables rather than treating all observations as one dataset.

- **Categorical attributes:** States, dairy products, export regions and destination countries.
- **Ordered temporal attributes:** Financial years, seasons and months within a July–June cycle.
- **Quantitative attributes:** Milk production, farm and cow numbers, output per cow, consumption per person, export tonnes, export value, shares, percentage changes and indices.
- **Spatial attributes:** State geometries, country geometries and destination coordinates.
- **Relational data:** Product-to-region export connections and Australia-to-destination connections.

Coverage varies by chart. The recent national production series spans 2006–07 to 2024–25; structural comparisons use 1990 and 2025; consumption spans 2010–11 to 2024–25. The export charts describe 2024–25 rather than a historical export trend.

### Data preparation and derived measures

The dashboard's chart-specific CSV tables organise the selected measures by year, state, product or market. JSON geographical data support the maps. Derived measures make comparisons possible:

- **Index:** Value in the comparison year ÷ value in 1990 × 100.
- **Growth multiple:** Later farm average ÷ earlier farm average.
- **Milk yield:** State milk production in litres ÷ state cow numbers.
- **Production share:** State milk production ÷ national milk production × 100.
- **Absolute change:** Production in 2024–25 minus production in the selected year.
- **Percentage change:** Absolute change ÷ production in the selected year × 100.
- **Consumption change:** Change relative to each product's own 2010–11 consumption level.
- **Export value per tonne:** Total export value in Australian dollars ÷ export volume in tonnes.
- **Ranks:** Destination order calculated separately for volume, value per tonne and total value.

Important distinctions are retained: survey averages and national totals describe different populations; consumption per person is not total domestic demand; and average export value per tonne reflects the product mix sold to a destination. The yoghurt category change in 2014–15 is identified because it affects comparisons with earlier years.

## How

The design follows the course distinction between **representation** and **presentation**. Representation maps attributes to marks and channels; presentation supplies layout, annotation, legends and interaction. The explanation below identifies the marks, the attribute-to-channel mappings, the reason for those mappings and their practical limits.

Two principles guide the choices. **Expressiveness** requires showing the intended information without implying unsupported order or relationships. **Effectiveness** gives important quantitative comparisons strong channels, especially position on a common scale. Where geography, colour or area serves the task better, numerical labels and tooltips support precise reading.

### 1. Milk production line chart

**Marks and channels.** Point marks represent annual observations, connected by line marks in chronological order. Horizontal position encodes financial year and vertical position encodes milk production in million litres. The green line establishes continuity; contrasting points and text marks identify the displayed peak and latest observation. Their contrasting colour is emphasis, rather than a second quantitative scale.

**Why this encoding suits the task.** Position on a common vertical scale supports comparison of annual quantities. The connecting line exposes the temporal pattern more directly than a list of annual values. The axis is truncated to emphasise variation within this period, with its starting value explicitly stated inside the plot. This supports trend inspection, but visually enlarges changes compared with a zero-based axis; readers should use the labels to judge their numerical magnitude.

**Interaction and context.** Hover tooltips give individual values without labelling every point. Peak and endpoint annotations guide the explanatory reading. A caveat specifies that the peak applies only to the displayed period, preventing a claim about the entire history of Australian dairy production.

### 2. Indexed slope chart

**Marks and channels.** Each measure is represented by endpoint points and a connecting line. Horizontal position distinguishes 1990 from 2025, while vertical position encodes the index on a shared scale. All measures start at 100. Direct text identifies milk production, dairy cows and dairy farms and reports their percentage changes; green emphasises milk production while grey provides context for the declining measures.

**Why this encoding suits the task.** Indexing transforms quantities with different units into a common relative-change measure. Comparing aligned endpoint positions is perceptually more accurate than comparing unrelated symbol sizes. The lines make divergence from the shared baseline visible. Their direction indicates increase or decrease, but their angles are a consequence of endpoint positions rather than a separate measurement.

**Interaction and context.** Tooltips supplement the displayed index with underlying quantities. The baseline note provides the starting totals. The chart compares two years only: its connecting segments do not imply that change was linear or reveal fluctuations between those years.

### 3. Farm transformation pictogram

**Marks and channels.** Repeated cow and milk-drop area symbols represent approximate growth ratios. Shape distinguishes cows from milk; green and rust reinforce that categorical distinction. The left and right spatial regions separate the two years, while the two rows separate herd size from milk output. Text marks give exact farm averages and the 2.9-fold and 4.8-fold comparisons.

**Why this encoding suits the task.** Familiar symbols make the comparison approachable to a general audience. Repetition communicates relative magnitude without requiring specialist units. Shape and hue redundantly distinguish the measures, so identity does not depend on colour alone. The icons are approximate illustrations; exact quantities are carried by text, not by counting or measuring the symbols.

**Interaction and context.** The main comparison can be read without interaction. The accompanying note explains that icon counts are approximate. A further annotation interprets the relationship between herd growth and output growth, while identifying the figures as survey averages rather than national totals. This keeps the claim tied to the population measured.

### 4. Milk-yield choropleth map

**Marks and channels.** State polygon area marks retain their geographical positions and shapes. Their fill varies from light to dark green with milk output per cow. Luminance primarily communicates ordered magnitude; state shape and location provide geographical identity. A neutral missing-data treatment distinguishes the Northern Territory from a measured low yield.

**Why this encoding suits the task.** A choropleth supports geographical comparison of a normalised rate. Output per cow is more suitable here than total production, because state size and industry scale should not be mistaken for productivity. Darker fills suggest higher quantities without introducing an arbitrary ordering of unrelated hues. Polygon area represents geographical extent, not milk yield.

**Interaction and context.** The legend defines the numerical colour scale, the highest-yield annotation guides attention, and tooltips report yield alongside production and cow numbers. Colour supports broad comparisons rather than precise numerical estimation. The method note specifies that the rate is calculated from state totals, rather than being an unweighted average of farm-level yields.

### 5. State production waffle chart

**Marks and channels.** One hundred equal square area marks partition national milk production into approximate percentage units. Colour hue identifies the state assigned to each square; the number of squares represents its approximate share. Equal square sizes mean that individual square area does not vary with state production. Text and coloured keys identify state shares and quantities.

**Why this encoding suits the task.** A common 100-unit whole makes Victoria's dominance visible and gives readers a familiar percentage reference. State hue encodes identity, not a numerical order. Since shares do not necessarily round to whole squares, the numerical percentages and production values remain the precise source of comparison.

**Interaction and context.** Hovering changes the highlighted state and the associated summary. This supports focused inspection while retaining the national whole. Juxtaposition with the yield map helps readers compare production share with output per cow, without treating these different measures as interchangeable. The bottom note explicitly connects those two views.

### 6. Production-change proportional symbol map

**Marks and channels.** Circular point symbols sit at state locations over polygon geometry. Circle area encodes the absolute magnitude of production change in million litres. Emerald green denotes growth, grey denotes decline and a separate neutral category denotes no change. These channels are complementary: size answers how much change, while colour answers its direction.

**Why this encoding suits the task.** Absolute change is appropriately shown by proportional symbols rather than colouring large state areas as though area represented output. The two-dimensional size channel retains geographical context, although viewers judge area less accurately than position or length. The size legend and numerical tooltips therefore support interpretation. Percentage change is a separate quantity and is not encoded by bubble area.

**Interaction and context.** Selecting a starting year changes the comparison with 2024–25; it does not change the ending year. The computed differences, circles and summary annotations update together. The right-hand summaries distinguish the largest loss in litres from the largest percentage decline. The common two-column layout separates the map from its legends, controls and explanation, preventing annotations from covering the states.

### 7. Seasonal radial heatmap

**Marks and channels.** Annular sector area marks represent month–season observations. Angular position encodes the cyclic month order, and radial bands separate five seasons. A sequential light-to-dark green scale encodes monthly milk production. Full month labels and season labels identify positions. The October outline is a selection cue, not another production scale.

**Why this encoding suits the task.** A circular arrangement expresses the repeating July–June calendar. Matching angles across rings allow comparison of the same month in different seasons, and darker sectors reveal recurring production peaks. Sector area increases with radius because of the layout; that area does not encode production. Readers must compare colour, not sector size. A rectangular heatmap would support some aligned comparisons more precisely, while the radial design emphasises cyclic seasonality.

**Interaction and context.** Hovering highlights corresponding months across seasons and reveals numerical details. The right-hand colour scale defines the quantity, and the peak annotation identifies a specific observation. The centre note explains that these are monthly totals and February has fewer production days. Consequently, the chart should not be interpreted as a comparison of daily production rates.

### 8. Consumption heatmap

**Marks and channels.** Equal rectangular area marks form a product-by-year matrix. Horizontal position encodes financial year; categorical row position identifies the product. A diverging purple–neutral–green scale represents percentage change from each product's own 2010–11 baseline. Hue distinguishes decrease from increase, while lightness relative to the neutral midpoint communicates magnitude within each direction. Text marks report the percentage change in each cell.

**Why this encoding suits the task.** The matrix supports both following a product across time and comparing products within one year. Relative changes permit comparison of trajectories despite different original units, without implying that a litre of milk and a kilogram of cheese are equivalent consumption amounts. Colour makes broad patterns visible; numerical labels compensate for its lower precision as a quantitative channel.

**Interaction and context.** Hovering emphasises a year across all products, and tooltips reveal the original consumption measure and its unit. The outlined yoghurt cell and connected caveat identify the category-definition change. The dashboard does not interpret that discontinuity entirely as behavioural change. The values measure consumption per person, not total domestic market size.

### 9. Export Sankey diagram

**Marks and channels.** Rectangular node area marks represent product groups and overseas regions. Curved band area marks connect the two sets, with band thickness encoding export value. Colour hue identifies products and helps readers trace their bands. Left-to-right spatial grouping separates products from destination regions; vertical node position is a layout choice rather than an additional quantitative scale.

**Why this encoding suits the task.** The Sankey represents a weighted network and allows a reader to trace how product export value is distributed across regions. Band thickness shows the relative strength of connections. Curvature routes the links and reduces visual obstruction; it does not encode distance or growth. Because several bands overlap and thickness comparisons are less precise than common-scale position, labels and tooltips provide exact values.

**Interaction and context.** Hovering over a product, region or connection emphasises the relevant flows and reduces the prominence of others. Opacity is an interaction state rather than another economic attribute. The explanatory note states that the flows measure export value, not litres of milk. They describe trade relationships and do not depict physical processing of milk through a supply chain.

### 10. Export flow map

**Marks and channels.** Country polygon marks establish geographical context, point circles identify destinations, and curved line paths connect them to Australia. Projected position encodes location. Flow width and destination-circle area redundantly encode the selected export quantity. A single green hue gives these connections a shared identity; it does not encode destination categories or a third numerical attribute.

**Why this encoding suits the task.** The map answers where the leading markets are, while two magnitude channels make their relative importance visible. Redundant width and area help readers locate major destinations, but neither is intended to replace exact values. Leader lines connect destination text to the correct points. The ocean background and graticule provide spatial context; the Mercator projection preserves local angles but distorts geographical area and should not be used to compare country sizes.

**Interaction and context.** The metric selector switches between export value and volume, updating widths, circle sizes and destination values. Hovering emphasises the relevant connection. The selected metric defines the units, so widths should be compared within the current mode. Route curvature is a layout device rather than an actual shipping path or a distance measure. This map is a 2024–25 snapshot of the leading destinations, not a complete global trade network or a time series.

### 11. Export-market bump chart

**Marks and channels.** Three vertical axes represent rankings for export tonnes, average value per tonne and total export value. Point marks locate each country's rank, and line marks connect its positions across the three axes. Vertical position on consistent rank scales encodes ordinal order. Hue identifies countries; labels redundantly identify them. The country palette differs from the Sankey product palette because the categories have different meanings.

**Why this encoding suits the task.** Connecting the same country across measures exposes changes in its relative standing. This supports discovering cases where a high volume rank does not produce a similarly high value rank. Position makes rank comparison straightforward, but equal vertical rank gaps do not imply equal numerical differences. Connecting-line slope and curvature help trace identity; they do not represent economic growth or rates of change.

**Interaction and context.** Hovering over a path, point or label highlights one country's full set of rankings. Annotations guide comparison of selected markets, and the formula explains how average value per tonne is derived. The three horizontal stages are measures, not dates. The average also reflects the mix of products exported to each market, so it is not a price comparison for one identical dairy product.

### Dashboard composition, presentation and interaction

The four sections provide an explanatory sequence: industry transformation, production geography and seasonality, changing demand, and global markets. In the course's How vocabulary, **Facet–Juxtapose** describes placing related views beside one another, especially the structural comparison and pictogram, and the yield map and production-share waffle. This allows comparison while preserving different units and meanings. The maps and seasonal chart also juxtapose a visual view with a supporting right-hand column.

**Manipulate–Select and Change** describe hover emphasis and metric or year selectors. Hover emphasis generally changes prominence rather than removing observations; it should not be described as filtering out unselected data. The year comparison does select relevant temporal observations before deriving change. These interactions provide limited exploration within an otherwise guided story. The dashboard does not claim brushing, free-form zooming or linked selection across every chart.

Presentation choices include consistent heading levels, left-aligned prose, shared column edges and selective emphasis for important quantities. Supporting text distinguishes findings from methodological caveats. Legends explain attribute-to-channel mappings, while tooltips provide details on demand without permanently filling the page with labels. Chapter links support navigation and responsive layouts stack columns on smaller screens.

HTML, CSS, Vega and Vega-Lite implement these decisions. These technologies belong to the implementation layer; they do not themselves justify an idiom. The design justification comes from the connection between the data types, reader tasks, marks, channels and interaction described above.

## Course references used for this explanation

- Fan, S., & Jenny, B. (2026). *Introduction to visualisation: What, why, how* [Course notes]. Monash University.
- Monash University. (2025). *Data types* (Version 1.1) [Course notes].
- Monash University. (2026). *Marks and channels* [Course notes].

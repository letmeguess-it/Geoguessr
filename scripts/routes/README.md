# Route numbering schematics

Builds `site/routes.js`, the data behind the **Routes** tab of the Key Card. For each covered country it holds a simplified map: the country outline, the main numbered routes drawn as straight lines through the real towns they pass, a legend and a one-paragraph rule. Places with no useful numbering get a text note instead (9 in Europe, such as Monaco and Malta; 22 in Asia and Oceania, such as Singapore, Indonesia and the Pacific territories).

| File | What it does |
|---|---|
| `route_spec.py` | Europe. Hand-written data: town coordinates, the routes per country (number, colour group, towns in order), legend lines, zones and the summary text |
| `route_spec_asia.py` | Asia and Oceania, same format. Each entry also has `n`, the footnote under the drawing (the Asian Highway note, or none); text notes are `(text, footnote)` pairs. European entries have no `n`, so the page shows the E-road note |
| `route_spec_americas.py` | North and South America, same format (15 drawn, 12 text notes). Footnotes: the Pan-American Highway, or the Central American CA numbers. Town positions are GeoNames coordinates; a name used in two countries carries the country code ('Cartago CR'), which the drawing drops from hub labels |
| `route_spec_africa.py` | Africa, same format (10 drawn, 8 text notes). Footnote: the Trans-African Highway note (none for Réunion and the islands). Hand-placed towns are marked in the town list |
| `build_routes.py` | Clips and simplifies the outline, projects everything to a 340 px wide drawing, places the route labels so they do not overlap, and writes `site/routes.js` |
| `routes_view.js` | The SVG drawing function. The same code is in `site/app.js` (`routeSvg`); keep the two in step |
| `preview.js` | Writes every drawing to `preview/<CODE>.svg` so you can check them by eye |

## Rebuild
```
pip install shapely
# Natural Earth 10m countries (public domain):
curl -o data/ne_10m_admin_0_countries.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson
python3 scripts/routes/build_routes.py data/ne_10m_admin_0_countries.geojson
node scripts/routes/preview.js   # optional check
```

## Colour groups
`rad` radial from the main hub (coral) · `rad2` radial from a second hub (teal) · `odd` odd number, north-south (purple) · `even` even number, east-west (coral) · `oth` other main route (grey). A country uses either the radial groups or the odd/even groups, never both, so coral always has one meaning per map.

## Accuracy
Version 1 (Europe), version 1 (Asia and Oceania, 24 drawn). Lines are schematic and show main routes only. The per-country rules come from `data/csv/Route Numbering.csv`. Routes worth re-checking: Cyprus A2/A5 ends, Bosnia M4, Montenegro after its 2016 renumbering, Isle of Man A3, Turkey D100 middle section, Belarus M10, Latvia A2 middle.

Africa worth re-checking: Kenya A1 (old classification), Nigeria A1 between Kontagora and Sokoto, Tunisia A1 south of Gabès (being extended), Rwanda RN3, Eswatini MR1 / MR3, Lesotho A4.

Americas worth re-checking: Ecuador E20/E30/E40 ends, Peru 3N (drawn via Huánuco), Paraguay PY03 and PY06 after the 2019 renumbering, Colombia 45 north end, Dominican Republic DR-5, Mexico 150/190 shared start. Canada is drawn small because the country is so wide.

Asia and Oceania worth re-checking: China G3 middle section, Philippines N1 in Mindanao, Kazakhstan KAZ07 north end, Armenia M3 north end, UAE E311 (drawn through approximate points), Oman (old and new numbers both shown).

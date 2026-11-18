# Borders and regions build

Builds the map files in `site/`:
- `geo.js`: covered countries, one shape per sheet region;
- `world.js`: grey base layer for the other countries;
- `regions.js`: region names, ISO codes and phone area codes;
- the town-to-region links in `places.js`;
- the region links in `clues_world.js`.

## Sources
- [Natural Earth](https://www.naturalearthdata.com/) 10m admin-1, admin-0 countries and map units (public domain). These give the country outlines and most regions.
- [geoBoundaries](https://www.geoboundaries.org/) gbOpen ADM1/ADM2/ADM3 (CC BY 4.0). These give regions where Natural Earth is out of date, and newer provinces built from districts.

## How each country is built
`recipes.py` is the source of truth. In short:
- **Default:** Natural Earth admin-1 units grouped into the regions listed in `data/csv/Countries_Fact.csv`.
- **`src`:** geoBoundaries ADM1, cut to the Natural Earth country outline. Slivers between the two are given to the region they touch most.
- **`layers`:** shapes that take priority over the base. These are newer provinces built from districts (Kazakhstan 2022, Indonesia's Papua provinces, Negros Island Region, Vatovavy / Fitovinany, Kavango West, Songwe, Ménaka, Taoudénit, Palestine's governorates, Naso Tjër Di), or cities carved out of districts (Bishkek, Botswana's towns).
- **`assign`:** Natural Earth unit to sheet region, for regrouped or renamed regions (Vietnam's 2025 merger, Norway's 2024 counties, FATA into Khyber Pakhtunkhwa, Moscow / Kyiv swaps, etc.).
- **Frame fixes in `step1_frames.py`:**
  - Crimea and Sevastopol go with Ukraine.
  - Svalbard and Jan Mayen form their own territory.
  - Martinique and Réunion are not duplicated in France.
  - Bouvet Island is dropped.
  - Matsu is added to Taiwan.

`sheet_patch.json` holds the region rows changed in the sheet in this release: Madagascar's 23 regions, Botswana's town districts and Panama's Naso Tjër Di.

## Run
Needs Python 3 with `shapely`, and Node with `topojson-server` and `topojson-simplify`.
```
pip install shapely
npm i topojson-server@3 topojson-simplify@3
./fetch_sources.sh                    # downloads into ./work (or $BORDERS_WORK)
node prepare_inputs.mjs               # reads site/ -> work/work_in.json
python3 step1_frames.py               # Natural Earth units per country
python3 step2_regions.py              # one shape per sheet region (prints problems per country; report in work/report.json)
python3 step3_export.py               # units.geojson, world.geojson, REGIONS.json, areas.json, town links
node step4_topo.mjs work/units.geojson ../../site/geo.js UNIT_TOPO u 2e5 1e-8
node step4_topo.mjs work/world.geojson ../../site/world.js WORLD_TOPO w 2e5 1e-8
python3 step5_write_site.py           # regions.js, places.js links, clues_world.js
```
`step4_topo.mjs` arguments: input, output, global variable, object name, quantization, and the smallest spherical triangle area kept (steradians). 1e-8 keeps outlines sharp at full zoom.

`prepare_inputs.mjs` reads the region list that is currently in `site/`. Name matches are tried first, so re-running against the files built by this release gives the same result. The release itself was built against the previous version of `site/`, and re-running against that version reproduces it byte for byte.

## Known gaps
- No outline: Osh (city), and Tuzi and Zeta in Montenegro (no open data).
- Approximate: Taoudénit (Mali) is the old Salam commune; Naso Tjër Di (Panama) is the old Teribe corregimiento; Kavango West (Namibia) is three old constituencies. Kazakhstan's Aksuat district stays with East Kazakhstan.
- Regions follow the sheet. Where ISO 3166-2 is older (Madagascar), the ISO code column carries the former province's code.

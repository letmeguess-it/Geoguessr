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
- **Swaps fixed:** Natural Earth (or the previous links) had these pairs the wrong way round, so `assign` corrects them: Napo / Tungurahua (Ecuador), City of Zagreb / Zagreb County, Sofia city / province, Minsk city / region, Moscow city / oblast, Kyiv city / oblast, Almaty, Vientiane.
- **geoBoundaries instead of Natural Earth** where Natural Earth's own shapes are off: Egypt, San Marino, Liechtenstein, plus the countries above.
- **The Americas (2026-11-19):** the United States, Mexico, Guatemala, Colombia, Peru, Chile, Paraguay, Uruguay and Costa Rica now come from geoBoundaries too. A test against GeoNames (every town carries its state or province code) showed geoBoundaries puts far fewer towns in the wrong state: US 1 against 69 (Natural Earth drew St. Louis inside Illinois), Guatemala 3 against 16, Colombia 5 against 20, Mexico 211 against 323 (the rest are GeoNames' own errors around the State of Mexico). Natural Earth stays for Argentina and Brazil, where it scored better (geoBoundaries' Argentina file has no Entre Ríos), and for Canada, Bolivia, Ecuador and the Dominican Republic, where both tie. geoBoundaries gives Mexico City the State of Mexico's ISO code, so an `alias` links it by name; an alias now always wins over the source's ISO code.
- **Pinned links:** Brod-Posavina (Croatia), Pomoravlje (Serbia, two Natural Earth units share the name Pomoravski), Abuja (its name folds to nothing) and Slovenia's 12 statistical regions are linked in `assign`, so a clean rebuild no longer depends on names left over in the previous `regions.js`.
- `common.load_gb` repairs names stored as UTF-8 read as Latin-1 (geoBoundaries' Chile file: "RegiÃ³n" becomes "Región").
- **Frame fixes in `step1_frames.py`:**
  - A Natural Earth unit always goes to its own country, even when a region with the same name exists next door. The French Jura department had been drawn as part of Switzerland's Jura.
  - The Auckland Islands are not part of the Auckland region.
  - Crimea and Sevastopol go with Ukraine.
  - Svalbard and Jan Mayen form their own territory.
  - Martinique and Réunion are not duplicated in France.
  - Bouvet Island is dropped.
  - Matsu is added to Taiwan.

`sheet_patch.json` holds the region rows changed in the sheet in this release: Madagascar's 23 regions, Botswana's town districts and Panama's Naso Tjër Di.

## Run
Needs Python 3 with `shapely`, and Node.
```
pip install shapely
npm install                           # topojson-server, topojson-simplify
./fetch_sources.sh                    # downloads into ./work (or $BORDERS_WORK)
node prepare_inputs.mjs               # reads site/ -> work/work_in.json
python3 step1_frames.py               # Natural Earth units per country
python3 step2_regions.py              # one shape per sheet region (prints problems per country; report in work/report.json)
python3 step3_export.py               # units.geojson, world.geojson, REGIONS.json, areas.json, town links
python3 step3b_clean_names.py         # drops other-names that point to another region or another country's town
node step4_topo.mjs work/units.geojson ../../site/geo.js UNIT_TOPO u 2e5 1e-8
node step4_topo.mjs work/world.geojson ../../site/world.js WORLD_TOPO w 2e5 1e-8
BUILD=2026-11-19a python3 step5_write_site.py   # regions.js, places.js links, clues_world.js, build stamps, ?v= in index.html
node make_geo_lite.cjs ../../site     # geo_lite.js (countries only, the file the globe starts from); run after step5 so it carries the stamp
python3 check_towns.py                # optional: regions named after a town must contain that town (flags need a human look)
```

### Build stamp
Region numbers in `geo.js` (and town links in `places.js`) point into `regions.js`. Files from two different builds would put one country's regions on another, for example an old `geo.js` still in the browser cache with a new `regions.js` showing Gujarat inside Vietnam. To stop this:
- `step5_write_site.py` writes one stamp into `geo.js`, `regions.js`, `places.js` and `clues_world.js`, and adds `?v=<stamp>` to the script tags in `index.html`. `make_geo_lite.cjs` copies the stamp from `geo.js` into `geo_lite.js`.
- `app.js` loads `geo.js`, `regions.js` and `places.js` on demand (`GEO.loadFull`, `loadRegionNames`, `loadPlaces`) with the same `?v=`, and checks that every stamp matches.
- If the stamps differ, it fetches past the cache once. If they still differ, it leaves regions and towns off rather than showing wrong ones.
- The region tooltip also refuses a region whose country is not the one under the pointer.

Always publish all stamped files together.
`step4_topo.mjs` arguments: input, output, global variable, object name, quantization, and the smallest spherical triangle area kept (steradians). 1e-8 keeps outlines sharp at full zoom.

`prepare_inputs.mjs` reads the region list that is currently in `site/`. Name matches are tried first, so re-running against the files built by this release gives the same result. The release itself was built against the previous version of `site/`, and re-running against that version reproduces it byte for byte.

## Known gaps
- No outline: Osh (city), and Tuzi and Zeta in Montenegro (no open data).
- Approximate: Taoudénit (Mali) is the old Salam commune; Naso Tjër Di (Panama) is the old Teribe corregimiento; Kavango West (Namibia) is three old constituencies. Kazakhstan's Aksuat district stays with East Kazakhstan.
- Regions follow the sheet. Where ISO 3166-2 is older (Madagascar), the ISO code column carries the former province's code.

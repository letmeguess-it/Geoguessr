# Geoguessr Meta Explorer

An interactive globe for learning GeoGuessr metas. It covers the 143 countries with official GeoGuessr coverage: driving side, number plates, bollards, utility poles, road lines, language clues and regions.

> Unofficial fan project. Not affiliated with GeoGuessr. Much of the data was drafted with AI from public information and then curated, so double-check anything important.

## What it does
- **Globe:** every covered country, coloured by driving side. Zoom in to see region borders.
- **Key Card:** click a country for plate, language, pole, bollard and road-line drawings, plus street words, route names, letters and regions to look for.
- **Decode search:** type what you read on a sign (a street word, route code, region, town, script, domain or calling code) and the countries, regions and towns it could be light up on the globe.
- **Regions and towns:** about 2,100 region outlines and 71,000+ towns. Typing a name outlines the region and drops a dot.

## Repository layout
| Folder | What is in it |
|---|---|
| `site/` | The explorer: a static website, no build step |
| `data/csv/` | The source tables (countries, clues, languages, regions) |
| `docs/cheatsheets/` | Beginner, Amateur and Pro cheatsheets (PDF) |
| `.github/workflows/` | Publishes `site/` to GitHub Pages |

## Run it locally
```
cd site
python3 -m http.server 8000
# open http://localhost:8000
```
It first loads about 4 MB, then fetches towns and regions in the background.

## Known gaps
- Some regions are newer than Natural Earth's borders (Kenya's 47 counties, Norway's post-2020 counties, Palestine, Luxembourg, Ghana, São Tomé). They are searchable by name but not outlined.
- Cocos, Gibraltar and Midway show as dots only.
- Language clues cover 51 countries; look-alike pairs are Europe only.
- No street-level search: street names repeat, so the answer is a spread of places.
- The scripts that generate the map data files are not in this repository yet.

## Licences
- Code: MIT (`LICENSE`).
- Clue content and tables: CC BY 4.0 (`LICENSE-DATA`). Credit "letmeguess-it".
- Map data, towns, flags and libraries keep their own licences, see `CREDITS.md`. Towns are from GeoNames (CC BY 4.0), borders from Natural Earth (public domain).

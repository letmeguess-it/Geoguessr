# Credits and licences

This project combines our own work with open data and libraries. Each keeps its own licence.

## Our own work
| What | Files | Licence |
|---|---|---|
| Source code | `site/index.html`, `site/app.js`, `site/search.js`, `site/render.js` | MIT, see `LICENSE` |
| Route numbering build scripts | `scripts/routes/*` | MIT, see `LICENSE` |
| Clue content: country rows, sign and road-line specs, bollard and pole specs, language notes, hand-written search clues, route numbering rules and schematics | `site/data.js`, `site/clues.js`, `site/clues_world.js`, `site/routes.js`, `data/csv/*.csv` | CC BY 4.0, see `LICENSE-DATA` |

## Third-party data
| What | Source | Licence | Notes |
|---|---|---|---|
| Country borders and region outlines (admin-1) | [Natural Earth](https://www.naturalearthdata.com/) | Public domain | Simplified for the web. No credit required; we give it anyway. |
| Country outlines on the route maps (admin-0, 10m) | [Natural Earth](https://www.naturalearthdata.com/) | Public domain | Simplified for the web. |
| World base layer | [world-atlas](https://github.com/topojson/world-atlas) (built from Natural Earth) | ISC | |
| Towns (name, position, population) | [GeoNames](https://www.geonames.org/) via the npm package `all-the-cities` | CC BY 4.0 | **Credit required.** Data from GeoNames, https://www.geonames.org, licensed under CC BY 4.0. |
| `all-the-cities` package (build step only) | npm | MIT | |

## Third-party libraries
| Library (files in `site/`) | Licence |
|---|---|
| [d3](https://d3js.org/) v7 | ISC |
| [topojson-client](https://github.com/topojson/topojson-client) | ISC |
| [country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons) | MIT |

Keep each library's licence header in its file if you copy it.

## Route numbering references
The route numbering rules were written in our own words from public references, mainly Marcel Monterie's road numbering systems pages, Wikipedia articles on national road networks, and roads.org.uk for Great Britain. The routes are drawn by hand through real town positions; no route geometry was copied.

## Photo references
`data/csv/Visual Clue Sources.csv` lists Wikimedia Commons file paths. The images themselves are not stored here. Each keeps its own licence and author credit on its Commons page.

## AI assistance
Much of the data and code was drafted with Claude (Anthropic) and curated by the project owner. Treat clue details as learning aids and check anything important.

## Not affiliated
This is an unofficial fan project. It is not affiliated with, endorsed by or sponsored by GeoGuessr or its owners. "GeoGuessr" is a trademark of its owner and is used here only to describe what the project helps you practise.

#!/usr/bin/env bash
# Downloads the open border data the build needs into $BORDERS_WORK (default: scripts/borders/work).
# Natural Earth 10m (public domain) and geoBoundaries gbOpen (CC BY 4.0), both from GitHub.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
WORK="${BORDERS_WORK:-$HERE/work}"
mkdir -p "$WORK/ne" "$WORK/gb"
NE=https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson
for f in ne_10m_admin_1_states_provinces ne_10m_admin_0_countries ne_10m_admin_0_map_units; do
  [ -s "$WORK/ne/$f.geojson" ] || curl -sSL -o "$WORK/ne/$f.geojson" "$NE/$f.geojson"
done
GB=https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen
# ADM1 for every sheet country (saved as <ISO3>.geojson; small territories have none, which is fine)
while read -r cc a3; do
  [ -s "$WORK/gb/$a3.geojson" ] || curl -sSL -o "$WORK/gb/$a3.geojson" "$GB/$a3/ADM1/geoBoundaries-$a3-ADM1_simplified.geojson" || true
done < "$HERE/iso3.txt"
# Districts used to build newer provinces (see recipes.py)
for spec in KAZ:ADM2 IDN:ADM2 PHL:ADM2 MDG:ADM2 MLI:ADM2 MLI:ADM3 TZA:ADM2 STP:ADM2 PSE:ADM2 NAM:ADM2 PAN:ADM3; do
  a3=${spec%%:*}; adm=${spec##*:}
  out="$WORK/gb/gbOpen_${a3}_${adm}.geojson"
  [ -s "$out" ] || curl -sSL -o "$out" "$GB/$a3/$adm/geoBoundaries-$a3-${adm}_simplified.geojson"
done
echo "done: $WORK"

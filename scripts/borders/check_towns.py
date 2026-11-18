# For every region whose name is also a town in the same country, the biggest such town must sit in that region.
# Flags need a human look: many are towns that share a name with a region elsewhere (Ibaraki city is in Osaka).
import json, re, unicodedata, sys
from shapely.geometry import shape, Point
from shapely import make_valid
from common import OUT as B, SITE, read_js
REG = json.load(open(B + 'REGIONS.json'))
TR = json.load(open(B + 'town_r.json'))
T = read_js(SITE + 'places.js')
units = json.load(open(B + 'units.geojson'))['features']
geo = {f['properties']['r']: make_valid(shape(f['geometry'])) for f in units if f['properties']['r'] >= 0}
def soft(s):
    s = unicodedata.normalize('NFD', str(s or '').lower()); s = ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    s = re.sub(r'\(.*?\)', ' ', s)
    s = re.sub(r'\b(city|province|region|county|state|governorate|district|oblast|prefecture|department|municipality|of|the)\b', ' ', s)
    return re.sub(r'[^a-z0-9]', '', s)
towns = {}
for j, n in enumerate(T['n']):
    cc = T['cc'][T['c'][j]]
    for nm in [n] + str(T['a'].get(str(j), '')).split('|'):
        k = soft(nm)
        if k: towns.setdefault((cc, k), []).append(j)
bad = []; checked = 0
for i, r in enumerate(REG):
    k = soft(r['n'])
    if len(k) < 4 or i not in geo: continue
    cand = [j for j in towns.get((r['c'], k), []) if T['p'][j] >= 3000]
    if not cand: continue
    j = max(cand, key=lambda j: T['p'][j]); checked += 1
    if TR[j] == i or (TR[j] >= 0 and soft(REG[TR[j]]['n']) == k): continue  # town in its own city-region (Minsk city vs Minsk Region)
    d = geo[i].distance(Point(T['x'][j], T['y'][j]))
    if d > 0.08:
        bad.append((r['c'], r['n'], T['n'][j], T['p'][j], REG[TR[j]]['n'] if TR[j] >= 0 else '-', round(d, 2)))
print('checked', checked, 'flags', len(bad))
for b in bad: print(b)

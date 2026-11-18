# Step 5: write the results into site/: regions.js, the town-to-region links in places.js, and the sheet-row links
# (WORLD_EXTRA.areas) and region lists (R.regions) in clues_world.js. geo.js and world.js come from step4_topo.mjs.
import json, os, re
from common import OUT, SITE, HERE
R = json.load(open(OUT + 'REGIONS.json'))
open(SITE + 'regions.js', 'w').write('window.REGIONS=' + json.dumps(R, ensure_ascii=False, separators=(',', ':')) + ';')
t = open(SITE + 'places.js').read()
T = json.loads(t.split('=', 1)[1].rstrip().rstrip(';'))
T['r'] = json.load(open(OUT + 'town_r.json'))
open(SITE + 'places.js', 'w').write('window.TOWNS=' + json.dumps(T, ensure_ascii=False, separators=(',', ':')) + ';')
s = open(SITE + 'clues_world.js').read()
for cc, rows in json.load(open(os.path.join(HERE, 'sheet_patch.json'))).items():
    m = re.search(r'\\n' + cc + r': [^\\"]*', s)
    if m: s = s.replace(m.group(0), '\\n' + cc + ': ' + '; '.join(n for n, _, _ in rows))
areas = json.load(open(OUT + 'areas.json'))
lines = s.split('\n')
for i, l in enumerate(lines):
    if l.startswith('  areas: '):
        lines[i] = '  areas: ' + json.dumps(areas, ensure_ascii=False) + ','
open(SITE + 'clues_world.js', 'w').write('\n'.join(lines))
print('site updated:', len(R), 'regions,', len(areas), 'sheet rows')

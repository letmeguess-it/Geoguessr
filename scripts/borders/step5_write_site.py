# Step 5: write the results into site/: regions.js, the town-to-region links in places.js, and the sheet-row links
# (WORLD_EXTRA.areas) and region lists (R.regions) in clues_world.js. geo.js and world.js come from step4_topo.mjs.
import json, os, re, datetime
from common import OUT, SITE, HERE, read_js
BUILD = os.environ.get('BUILD') or datetime.date.today().isoformat()  # same stamp in every map file, see loadPlaces() in app.js
R = json.load(open(OUT + 'REGIONS.json'))
open(SITE + 'regions.js', 'w').write('window.REGIONS=' + json.dumps(R, ensure_ascii=False, separators=(',', ':')) + ';\nwindow.REGIONS_BUILD="%s";\n' % BUILD)
T = read_js(SITE + 'places.js')
T['r'] = json.load(open(OUT + 'town_r.json'))
open(SITE + 'places.js', 'w').write('window.TOWNS=' + json.dumps(T, ensure_ascii=False, separators=(',', ':')) + ';\nwindow.TOWNS_BUILD="%s";\n' % BUILD)
s = open(SITE + 'clues_world.js').read()
for cc, rows in json.load(open(os.path.join(HERE, 'sheet_patch.json'))).items():
    m = re.search(r'\\n' + cc + r': [^\\"]*', s)
    if m: s = s.replace(m.group(0), '\\n' + cc + ': ' + '; '.join(n for n, _, _ in rows))
areas = json.load(open(OUT + 'areas.json'))
lines = s.split('\n')
for i, l in enumerate(lines):
    if l.startswith('  areas: '):
        lines[i] = '  areas: ' + json.dumps(areas, ensure_ascii=False) + ','
s = re.sub(r'\nwindow\.WORLD_EXTRA\.build="[^"]*";\n?$', '', '\n'.join(lines).rstrip() + '\n').rstrip()
open(SITE + 'clues_world.js', 'w').write(s + '\nwindow.WORLD_EXTRA.build="%s";\n' % BUILD)
g = open(SITE + 'geo.js').read().split('\n', 1)[0]
g = re.sub(r';?window\.UNIT_TOPO\.build="[^"]*";?$', '', g).rstrip().rstrip(';')
open(SITE + 'geo.js', 'w').write(g + ';window.UNIT_TOPO.build="%s";\n' % BUILD)
h = open(SITE + 'index.html').read()
h = re.sub(r'<script src="([a-z_0-9.\-]+\.js)(\?v=[^"]*)?"></script>', lambda m: '<script src="%s?v=%s"></script>' % (m.group(1), BUILD), h)
open(SITE + 'index.html', 'w').write(h)
print('site updated:', len(R), 'regions,', len(areas), 'sheet rows, build', BUILD)

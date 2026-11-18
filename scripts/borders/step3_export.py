# Step 3: write the shapes for the topology build (units.geojson, world.geojson) and the lookup data (REGIONS, areas, town regions).
import json, pickle, re
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, Point
from shapely.geometry.polygon import orient
from shapely.ops import unary_union
from shapely.strtree import STRtree
from shapely import make_valid
from common import *

d = pickle.load(open(OUT + 'regions.pkl', 'rb'))
units = pickle.load(open(OUT + 'ne_units.pkl', 'rb'))
PATCH = json.load(open(os.path.join(HERE, 'sheet_patch.json')))


def cw(g):  # d3 wants exterior rings clockwise
    ps = [g] if isinstance(g, Polygon) else list(g.geoms)
    out = [orient(p, sign=-1.0) for p in ps]
    return out[0] if len(out) == 1 else MultiPolygon(out)


def rnd(o):
    if isinstance(o, (list, tuple)):
        if o and isinstance(o[0], (int, float)): return [round(o[0], 5), round(o[1], 5)]
        return [rnd(x) for x in o]
    return o


order = [x['code'] for x in D]
regs = sorted(d['regions'], key=lambda r: (order.index(r['cc']), 0))
# keep sheet order inside a country
pos = {}
for cc in order:
    rows = [a[2] for a in A if a[0] == cc] if cc not in PATCH else [p[0] for p in PATCH[cc]]
    for i, n in enumerate(rows): pos[(cc, n)] = i
regs.sort(key=lambda r: (order.index(r['cc']), pos.get((r['cc'], r['name']), 0 if r.get('whole') else 999)))

# other names: Natural Earth names (all languages) of the units inside each region
LANGK = ['name_en', 'name_local', 'name_alt', 'name_de', 'name_fr', 'name_es', 'name_it', 'name_pt', 'name_nl', 'name_pl', 'name_sv', 'name_hu', 'name_tr', 'name_el', 'name_ru', 'name_uk', 'name_ja', 'name_ko', 'name_zh', 'name_ar', 'name_hi', 'name_bn', 'name_vi', 'name_id', 'name_fa', 'name_he', 'name_ur']
REGIONS, feats = [], []
byc = {}
for i, r in enumerate(regs):
    byc.setdefault(r['cc'], []).append(i)
    names = set(r['alts'])
    g = r['geom']
    for u in units[r['cc']]:
        # only units that are (mostly) this region, so a merged province still answers to its old provinces' names
        if u['geom'].area > 0 and g.intersection(u['geom'].representative_point().buffer(1e-6)).area > 0:
            for k in LANGK:
                v = u['props'].get(k)
                if v: names.update(x.strip() for x in str(v).split('|'))
            names.add(u['name'])
    base = fold(r['name'])
    m = re.match(r'^(.*?)\s*\((.*)\)\s*$', r['name'])
    eng = ''
    if m: names.add(m.group(1)); names.add(m.group(2))
    names = sorted({n for n in names if n and any(ch.isalnum() for ch in n) and n != r['name']})
    big = max(([g] if isinstance(g, Polygon) else list(g.geoms)), key=lambda p: p.area)
    lp = big.representative_point()
    REGIONS.append({'n': r['name'], 'e': eng, 'a': '|'.join(names)[:1500], 'c': r['cc'], 'y': round(lp.y, 2), 'x': round(lp.x, 2), 'i': r['iso'] or '', 'k': r['codes'] or ''})
    feats.append({'type': 'Feature', 'properties': {'c': NAME[r['cc']], 'r': i}, 'geometry': rnd(mapping(cw(g)))})
for lo in d['leftovers']:
    feats.append({'type': 'Feature', 'properties': {'c': NAME[lo['cc']], 'r': -1}, 'geometry': rnd(mapping(cw(lo['geom'])))})
json.dump({'type': 'FeatureCollection', 'features': feats}, open(OUT + 'units.geojson', 'w'))
json.dump(REGIONS, open(OUT + 'REGIONS.json', 'w'), ensure_ascii=False)

# sheet rows -> region index (WORLD_EXTRA.areas)
idx = {(R2['c'], R2['n']): i for i, R2 in enumerate(REGIONS)}
areas = []
for cc in order:
    rows = [(a[2], a[3], a[4]) for a in A if a[0] == cc] if cc not in PATCH else [tuple(p) for p in PATCH[cc]]
    for n, iso, codes in rows:
        k = (cc, NAME[cc]) if n.startswith('Whole') else (cc, n)
        areas.append([cc, idx.get(k, -1), n, iso, codes])
json.dump(areas, open(OUT + 'areas.json', 'w'), ensure_ascii=False)
print('regions', len(REGIONS), 'areas', len(areas), 'unlinked', [a[2] for a in areas if a[1] < 0])

# world layer: Natural Earth 10m countries that are not sheet countries (sheet ones keep their sheet name, for fallback)
frames = {cc: unary_union([u['geom'] for u in units[cc]]) for cc in units}
allf = unary_union(list(frames.values()))
w = json.load(open(NE + 'ne_10m_admin_0_countries.geojson'))['features']
wf = []
for f in w:
    p = f['properties']
    g = make_valid(shape(f['geometry']))
    ov = g.intersection(allf).area / g.area if g.area else 1
    if ov > 0.5: continue
    if ov > 0.001: g = g.difference(allf)
    g = [x for x in ([g] if isinstance(g, Polygon) else getattr(g, 'geoms', [])) if isinstance(x, Polygon) and x.area > 1e-8]
    if not g: continue
    g = g[0] if len(g) == 1 else MultiPolygon(g)
    wf.append({'type': 'Feature', 'properties': {'n': p['NAME'], 'c': 0}, 'geometry': rnd(mapping(cw(g)))})
json.dump({'type': 'FeatureCollection', 'features': wf}, open(OUT + 'world.geojson', 'w'))
print('world features', len(wf))

# towns: which region holds each town
T = json.loads(open(SITE + 'places.js').read().split('=', 1)[1].rstrip().rstrip(';'))
geoms = [shape(f['geometry']) for f in feats]
tree = STRtree(geoms)
ccl = T['cc']
newr = []
nor = 0
for i in range(len(T['n'])):
    pt = Point(T['x'][i], T['y'][i]); code = ccl[T['c'][i]]
    best = -1
    for j in tree.query(pt):
        f = feats[j]
        if f['properties']['r'] >= 0 and REGIONS[f['properties']['r']]['c'] == code and geoms[j].contains(pt):
            best = f['properties']['r']; break
    if best < 0:
        near = [j for j in tree.query(pt.buffer(0.3)) if feats[j]['properties']['r'] >= 0 and REGIONS[feats[j]['properties']['r']]['c'] == code]
        if near:
            j = min(near, key=lambda j: geoms[j].distance(pt)); best = feats[j]['properties']['r']
    if best < 0: nor += 1
    newr.append(best)
json.dump(newr, open(OUT + 'town_r.json', 'w'))
print('towns', len(newr), 'without region', nor)

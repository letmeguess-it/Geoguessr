# Step 2: build one shape per sheet region (plus leftover country parts) for every sheet country.
import json, pickle, sys
from collections import defaultdict
from shapely.geometry import mapping, Polygon, MultiPolygon, GeometryCollection
from shapely import make_valid
from shapely.ops import unary_union
from common import *
import recipes as RC
import time
from shapely.strtree import STRtree
from shapely.prepared import prep

def touch_best(p, geoms):
    keys = [k for k, g in geoms.items() if g.bounds[0] <= p.bounds[2] and g.bounds[2] >= p.bounds[0] and g.bounds[1] <= p.bounds[3] and g.bounds[3] >= p.bounds[1]]
    best, bl = None, 0
    pb = p.boundary
    for k in keys:
        l = pb.intersection(geoms[k].boundary).length
        if l <= 0:
            l = 1e-12 if p.distance(geoms[k]) < 1e-7 else 0
        if l > bl: best, bl = k, l
    return best, bl

units = pickle.load(open(OUT + 'ne_units.pkl', 'rb'))
PATCH = json.load(open(os.path.join(HERE, 'sheet_patch.json')))  # sheet rows after the sheet update: {cc: [[name, iso, codes], ...]}
EPS = 1e-9


def polys(g):
    if g is None or g.is_empty: return []
    if isinstance(g, Polygon): return [g]
    if isinstance(g, MultiPolygon): return list(g.geoms)
    if isinstance(g, GeometryCollection): return [p for x in g.geoms for p in polys(x)]
    return []


def clean(g):
    if g is None: return None
    g = make_valid(g)
    p = [x for x in polys(g) if x.area > 1e-10]
    return MultiPolygon(p) if p else None


def rows_for(cc):
    rows = sheet_rows(cc)
    if cc in PATCH:
        old = {fold(r['name']): r for r in rows}
        rows = []
        for n, iso, codes in PATCH[cc]:
            o = old.get(fold(n))
            rows.append({'name': n, 'iso': iso, 'codes': codes, 'old': o['old'] if o else -1})
    return rows


def soft(s):
    import unicodedata, re
    s = unicodedata.normalize('NFD', str(s or '').lower())
    s = ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    s = re.sub(r'\(.*?\)', ' ', s)
    return re.sub(r'[^a-z0-9]', '', s)


def match_row(rows, name, iso=None, alias=None):
    if alias and name in alias: name = alias[name]
    k = fold(name)
    for r in rows:
        if iso and r['iso'] and iso == r['iso']: return r
    for r in rows:
        if soft(r['name']) == soft(name): return r
    for r in rows:
        if fold(r['name']) == k: return r
    for r in rows:
        rk = fold(r['name'])
        if len(k) > 3 and len(rk) > 3 and (rk.startswith(k) or k.startswith(rk)): return r
    return None


report = {}
regions, leftovers = [], []
T0 = time.time()
only = sys.argv[1:] 
for cc in sorted(units):
    if only and cc not in only: continue
    t0 = time.time()
    U = units[cc]
    rec = RC.R.get(cc, {})
    rows = rows_for(cc)
    frame = clean(unary_union([u['geom'] for u in U]))
    old2row = {r['old']: r for r in rows if r['old'] >= 0}
    oldname = {}  # old REGIONS names (and alt names) linked to a sheet row
    for r in rows:
        if r['old'] >= 0:
            o = R[r['old']]
            for n in [o['n'], o.get('e')] + str(o.get('a') or '').split('|'):
                if n: oldname[fold(n)] = r
    parts = defaultdict(list)   # row name -> list of geometries
    alts = defaultdict(set)
    how = defaultdict(set)
    rowby = {r['name']: r for r in rows}
    assign = dict(rec.get('assign', {})); assign.update(rec.get('assign_extra', {}))
    taken = None
    # layers first (highest priority)
    layers = rec.get('layers', [])
    if layers == 'KZ': layers = [dict(l, adm2=RC.gb('KAZ', 'ADM2')) for l in RC.KZ_LAYERS]
    if layers == 'ID': layers = [dict(l, adm2=RC.gb('IDN', 'ADM2')) for l in RC.ID_LAYERS]
    if layers == 'PS': layers = [{'adm2': RC.gb('PSE', 'ADM2'), 'all': True, 'alias': {'Jericho & Al Aghwar': 'Jericho', 'Qalqiliya': 'Qalqilya', 'Ramallah & Al Bireh': 'Ramallah and al-Bireh', 'Deir Al Balah': 'Deir al-Balah'}}]
    base_gb = load_gb(rec['src']) if 'src' in rec else None
    for L in layers:
        if 'ne' in L:
            for u in U:
                if u['name'] in L['ne']:
                    g = u['geom'] if taken is None else u['geom'].difference(taken)
                    parts[L['to']].append(g); how[L['to']].add('NE ' + u['name']); taken = g if taken is None else unary_union([taken, g])
            continue
        feats = load_gb(L['adm2'])
        if L.get('within'):
            par = [f for f in base_gb if f['name'] == L['within']]
            feats = [f for f in feats if par and par[0]['geom'].contains(f['geom'].representative_point())]
        for f in feats:
            to = None
            if L.get('all'):
                r = match_row(rows, f['name'], alias=L.get('alias')); to = r['name'] if r else None
            elif f['name'] in L['names']:
                to = L['to']
            if not to: continue
            g = f['geom'].intersection(frame)
            if taken is not None: g = g.difference(taken)
            parts[to].append(g); how[to].add('ADM2 ' + f['name']); alts[to].add(f['name'])
            taken = g if taken is None else unary_union([taken, g])
    unassigned, keep_out = [], []
    if len(rows) == 1 and rows[0]['name'].startswith('Whole'):
        rows[0] = dict(rows[0], name=NAME[cc], whole=True); rowby = {r['name']: r for r in rows}
    single = rows[0] if len(rows) == 1 else None
    if rec.get('ne_as_gap'):
        pass
    elif base_gb is not None:
        for f in base_gb:
            g = f['geom'].intersection(frame)
            if taken is not None: g = g.difference(taken)
            if f['name'] in rec.get('keep_out', []):
                keep_out.append((f['name'], g)); continue
            r = match_row(rows, f['name'], f['iso'], rec.get('alias'))
            if not r:
                unassigned.append(('gb', f['name'], g)); continue
            parts[r['name']].append(g); how[r['name']].add('gb ' + f['name']); alts[r['name']].add(f['name'])
        # Natural Earth names help the search: keep them as other names of the region they fall in
        allp = {k: unary_union(v) for k, v in parts.items()}
        for u in U:
            pt = u['geom'].representative_point()
            for k, g in allp.items():
                if g.contains(pt):
                    for n in [u['name'], u.get('en'), u.get('local')] + str(u.get('alt') or '').split('|'): alts[k].add(n)
                    break
    else:
        at = {}
        for nm, x, y, to in rec.get('assign_at', []):
            cand = [u for u in U if u['name'] == nm]
            if cand:
                from shapely.geometry import Point
                at[id(min(cand, key=lambda u: u['geom'].distance(Point(x, y))))] = to
        for u in U:
            r = None; h = ''
            if u['name'] in rec.get('leave', []):
                unassigned.append(('leave', u['name'], u['geom'])); continue
            if single: r = single; h = 'single'
            elif id(u) in at: r = rowby.get(at[id(u)]); h = 'assign'
            elif u['name'] in assign: r = rowby.get(assign[u['name']]); h = 'assign'
            elif rec.get('assign_region') and u.get('region') in assign: r = rowby.get(assign[u['region']]); h = 'assign'
            elif rec.get('by'): r = match_row(rows, u.get(rec['by'])); h = 'by'
            if r is None:
                r = next((x for x in rows if soft(x['name']) == soft(u['name'])), None); h = 'name'
            if r is None and u['old'] in old2row: r = old2row[u['old']]; h = 'old'
            if r is None and fold(u['name']) in oldname: r = oldname[fold(u['name'])]; h = 'oldname'
            if r is None:
                r = match_row(rows, u['name'], u['iso']); h = 'name'
            if r is None and u.get('region'):
                r = match_row(rows, u['region']) or oldname.get(fold(u['region'])); h = 'region'
            g = u['geom'] if taken is None else u['geom'].difference(taken)
            if r is None:
                unassigned.append(('ne', u['name'], g)); continue
            parts[r['name']].append(g); how[r['name']].add(h + ' ' + u['name'])
            for n in [u['name'], u.get('en'), u.get('local')] + str(u.get('alt') or '').split('|'): alts[r['name']].add(n)
    geoms = {k: clean(unary_union(v)) for k, v in parts.items()}
    geoms = {k: v for k, v in geoms.items() if v is not None}
    # enclaves: an unassigned unit almost fully surrounded by one region joins it
    rest = []
    for src, nm, g in unassigned:
        g = clean(g)
        if g is None: continue
        tot = g.boundary.length
        best, bl = touch_best(g, geoms)
        if src != 'leave' and (rec.get('enclave') and best or (src == 'ne' and best and bl > 0.97 * tot)):
            geoms[best] = clean(unary_union([geoms[best], g])); how[best].add('enclave ' + nm)
        else:
            rest.append((nm, g))
    # gaps between the base shapes and the country outline (gb and layers): give each piece to the neighbour it touches most
    gap_area = 0
    if base_gb is not None or layers:
        covered = unary_union(list(geoms.values()) + [g for _, g in rest] + [g for _, g in keep_out if g is not None])
        gap = clean(frame.difference(covered))
        add = defaultdict(list)
        for p in polys(gap):
            best, bl = touch_best(p, geoms)
            if best is None:
                best = min(geoms, key=lambda k: geoms[k].distance(p)) if geoms else None
            if best is None: continue
            gap_area += p.area
            add[best].append(p)
        for k, v in add.items(): geoms[k] = clean(unary_union([geoms[k]] + v))
    # make the shapes disjoint (later ones lose overlaps)
    acc = None
    for k in (list(geoms) if (base_gb is not None or layers) else []):
        g = geoms[k]
        if acc is not None: g = clean(g.difference(acc))
        if g is None: del geoms[k]; continue
        geoms[k] = g; acc = g if acc is None else unary_union([acc, g])
    for r in rows:
        if r['name'] in geoms:
            regions.append({'cc': cc, 'name': r['name'], 'whole': r.get('whole', False), 'iso': r['iso'], 'codes': r['codes'], 'old': r['old'],
                            'alts': sorted(a for a in alts[r['name']] if a and fold(a) != fold(r['name'])), 'geom': geoms[r['name']], 'how': sorted(how[r['name']])})
    for nm, g in rest + [(n, clean(g)) for n, g in keep_out]:
        if g is not None: leftovers.append({'cc': cc, 'name': nm, 'geom': g})
    missing = [r['name'] for r in rows if r['name'] not in geoms and not r['name'].startswith('Whole')]
    fa = frame.area
    report[cc] = {'rows': len(rows), 'built': sum(1 for r in rows if r['name'] in geoms), 'missing': missing,
                  'unassigned': [nm for nm, _ in rest], 'gap_share': round(gap_area / fa, 4) if fa else 0,
                  'nonname': {k: sorted(how[k]) for k in geoms if not any(h.startswith(('old ', 'name ', 'gb ')) for h in how[k])}}
    print(cc, round(time.time() - t0, 1), 's', flush=True)

pickle.dump({'regions': regions, 'leftovers': leftovers}, open(OUT + 'regions%s.pkl' % ('_' + '_'.join(only) if only else ''), 'wb'))
json.dump(report, open(OUT + 'report.json', 'w'), ensure_ascii=False, indent=1)
for cc, r in report.items():
    if r['missing'] or r['unassigned'] or r['gap_share'] > 0.002:
        print(cc, r['built'], '/', r['rows'], 'missing:', r['missing'], 'unassigned:', r['unassigned'][:12], 'gap:', r['gap_share'])
print('regions', len(regions), 'leftover units', len(leftovers))

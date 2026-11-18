# Builds routes.js for the World Meta Explorer Key Card "Routes" tab.
# Input: route_spec.py (Europe) and route_spec_asia.py (Asia and Oceania), hand-written schematic routes,
#        + Natural Earth 10m country outlines (public domain).
# Usage (from the repository root):
#   python3 scripts/routes/build_routes.py path/to/ne_10m_admin_0_countries.geojson
# Writes site/routes.js. Needs: pip install shapely
# Output: window.ROUTES = {CODE: {v:[W,H], o:outline path, r:[[label,group,points]], l:[[label,group,x,y]],
#          h:[[name,x,y,anchor]], z:[[digit,x,y]], g:[[group,text]], s:summary, n:footnote?}} and {CODE: {t: text, n:footnote?}} for text-only countries.
#          n is left out for Europe (the page shows the E-road note); '' means no footnote.
import json, math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
from shapely.geometry import shape, box, MultiPolygon, Polygon
import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
from shapely.ops import transform
import route_spec, route_spec_asia
S = {**route_spec.S, **route_spec_asia.S}
TEXT = {**route_spec.TEXT, **route_spec_asia.TEXT}
for k, v in route_spec_asia.C.items():
    assert route_spec.C.get(k, v) == v, 'town name used twice with different places: ' + k
C = {**route_spec.C, **route_spec_asia.C}
assert not set(route_spec.S) & set(route_spec_asia.S)

NE = {f['properties']['ADM0_A3']: f for f in json.load(open(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'data', 'ne_10m_admin_0_countries.geojson'), encoding='utf-8'))['features']}
W = 340
LBL_H = 13

def polys(g):
    return list(g.geoms) if g.geom_type == 'MultiPolygon' else [g] if g.geom_type == 'Polygon' else [p for p in getattr(g, 'geoms', []) if p.geom_type == 'Polygon']

def build(code, spec):
    g = shape(NE[spec['a3']]['geometry'])
    pts = [p for _, _, ps in spec['routes'] for p in ps]
    lats = [p[0] for p in pts]; lons = [p[1] for p in pts]
    if 'bbox' in spec:
        g = g.intersection(box(*spec['bbox']))
    else:  # drop far-away overseas parts: keep pieces near the routes
        pad = max(2.0, 0.6 * max(max(lats) - min(lats), max(lons) - min(lons)))
        near = box(min(lons) - pad, min(lats) - pad, max(lons) + pad, max(lats) + pad)
        g = MultiPolygon([p for p in polys(g) if p.intersects(near)])
    lat0 = (g.bounds[1] + g.bounds[3]) / 2; k = math.cos(math.radians(lat0))
    gx = transform(lambda x, y, z=None: (x * k, -y), g)
    minx, miny, maxx, maxy = gx.bounds
    aspect = (maxy - miny) / (maxx - minx)
    pad = 14
    Wv = W; Hv = round(min(max(aspect * (W - 2 * pad) + 2 * pad, 200), 400))
    s = min((Wv - 2 * pad) / (maxx - minx), (Hv - 2 * pad) / (maxy - miny))
    ox = (Wv - (maxx - minx) * s) / 2; oy = (Hv - (maxy - miny) * s) / 2
    P = lambda lon, lat: (ox + (lon * k - minx) * s, oy + (-lat - miny) * s)
    gp = transform(lambda x, y, z=None: (ox + (x - minx) * s, oy + (y - miny) * s), gx).simplify(0.6)
    area_min = 2.5  # px^2: drop specks
    d = []
    for p in polys(gp):
        if p.area < area_min: continue
        ring = list(p.exterior.coords)
        d.append('M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in ring[:-1]) + 'Z')
    out = {'v': [Wv, Hv], 'o': ''.join(d), 'r': [], 'l': [], 'h': [], 'z': [], 'g': spec['legend'], 's': spec['s']}
    if 'n' in spec: out['n'] = spec['n']
    placed = []  # boxes: (x0,y0,x1,y1)
    def free(b):
        if b[0] < 1 or b[1] < 1 or b[2] > Wv - 1 or b[3] > Hv - 1: return False
        return not any(b[0] < q[2] and b[2] > q[0] and b[1] < q[3] and b[3] > q[1] for q in placed)
    # hubs first
    for i, hname in enumerate(spec['hubs']):
        x, y = P(C[hname][1], C[hname][0])
        tw = len(hname) * 6.2 + 4
        for dx, dy, anc in ((6, -6, 'start'), (6, 14, 'start'), (-6, -6, 'end'), (-6, 14, 'end')):
            bx0 = x + dx if anc == 'start' else x + dx - tw
            b = (bx0, y + dy - 10, bx0 + tw, y + dy + 2)
            if free(b): break
        placed.append(b); placed.append((x - 4, y - 4, x + 4, y + 4))
        out['h'].append([hname, round(x, 1), round(y, 1), round(x + dx, 1), round(y + dy, 1), anc])
    for zd, lat, lon in spec.get('zones', []):
        x, y = P(lon, lat); out['z'].append([zd, round(x, 1), round(y, 1)]); placed.append((x - 7, y - 7, x + 7, y + 7))
    for lab, grp, ps in spec['routes']:
        xy = [P(lon, lat) for lat, lon in ps]
        out['r'].append([lab, grp, ' '.join(f'{x:.1f},{y:.1f}' for x, y in xy)])
    # labels: try the route's ends first, then points along it, nudged outward
    cx, cy = Wv / 2, Hv / 2
    for lab, grp, ps in spec['routes']:
        xy = [P(lon, lat) for lat, lon in ps]
        tw = len(lab) * 6.0 + 8
        order = [len(xy) - 1, 0] + [i for i in range(len(xy) // 2, len(xy) - 1)] + [i for i in range(1, len(xy) // 2)]
        best = None
        for i in order:
            x, y = xy[i]
            vx, vy = x - cx, y - cy; n = math.hypot(vx, vy) or 1
            for off in (0, 9, 16, -10):
                bx, by = x + vx / n * off, y + vy / n * off
                for sx, sy in ((0, 0), (0, -12), (0, 12), (-14, 0), (14, 0)):
                    b = (bx + sx - tw / 2, by + sy - LBL_H / 2, bx + sx + tw / 2, by + sy + LBL_H / 2)
                    if free(b): best = b; break
                if best: break
            if best: break
        if not best:
            x, y = xy[-1]; best = (x - tw / 2, y - LBL_H / 2, x + tw / 2, y + LBL_H / 2)
        placed.append(best)
        out['l'].append([lab, grp, round((best[0] + best[2]) / 2, 1), round((best[1] + best[3]) / 2, 1), round(tw, 1)])
    return out

R = {}
for code, spec in S.items():
    R[code] = build(code, spec)
for code, t in TEXT.items():
    R[code] = {'t': t[0], 'n': t[1]} if isinstance(t, tuple) else {'t': t}
js = 'window.ROUTES=' + json.dumps(R, separators=(',', ':'), ensure_ascii=False) + ';'
open(os.path.join(ROOT, 'site', 'routes.js'), 'w', encoding='utf-8').write(js)
print('countries', len(R), 'drawn', len(S), 'size KB', round(len(js) / 1024))

# Step 1: assign every Natural Earth 10m admin-1 feature to a sheet country (same assignment as the live page),
# move Crimea and Sevastopol to Ukraine, and save the NE units per country.
import json, pickle
from common import OUT, NE, GBD, SITE
from shapely.geometry import shape
from shapely import make_valid

W = json.load(open(OUT + 'work_in.json'))
R, A, D = W['R'], W['A'], W['D']
codes = {d['code'] for d in D}
name_of = {d['code']: d['n'] for d in D}

ne = json.load(open(NE + 'ne_10m_admin_1_states_provinces.geojson'))['features']
key = {}
for i, r in enumerate(R):
    key.setdefault(r['n'], []).append(i)
def find_old(nm, lat, lon):
    best = None
    for i in key.get(nm, []):
        d = abs(R[i]['y'] - (lat or 0)) + abs(R[i]['x'] - (lon or 0))
        if d < 4 and (best is None or d < best[0]): best = (d, i)
    return [best[1]] if best else None

ISO_FIX = {'GB': 'UK'}
units = {}  # code -> list of dict(name, props, geom, old)
unknown = []
for f in ne:
    p = f['properties']
    if not f['geometry']:
        continue
    nm = p['name'] or p.get('name_en') or p.get('name_local') or ''
    old = find_old(nm, p['latitude'], p['longitude'])
    iso_code = ISO_FIX.get(p['iso_a2'], p['iso_a2'])
    code = R[old[0]]['c'] if old else iso_code
    if old and iso_code in codes and code != iso_code:  # a same-named region across the border (French Jura vs Swiss Jura)
        code = iso_code
    if p['adm0_a3'] == 'CYN':
        code = 'CY'
    if nm in ('Crimea', 'Sevastopol') or (p['iso_3166_2'] or '') in ('UA-43', 'UA-40'):
        code = 'UA'
    if p['adm0_a3'] == 'UMI' and nm != 'Midway Islands':
        code = None
    if nm in ('Svalbard', 'Jan Mayen'): code = 'SJ'
    if nm in ('Bouvet Island',): code = None
    if code == 'FR' and nm in ('Martinique', 'La Réunion'): code = None
    if code not in codes:
        continue
    g = make_valid(shape(f['geometry']))
    units.setdefault(code, []).append({'name': nm, 'iso': p['iso_3166_2'], 'en': p.get('name_en'), 'alt': p.get('name_alt'),
                                       'local': p.get('name_local'), 'lat': p['latitude'], 'lon': p['longitude'],
                                       'old': old[0] if old else -1, 'region': p.get('region'), 'geonunit': p.get('geonunit'), 'region_sub': p.get('region_sub'), 'type_en': p.get('type_en'), 'geom': g, 'props': {k2: p.get(k2) for k2 in ['name_en','name_local','name_alt','name_de','name_fr','name_es','name_it','name_pt','name_nl','name_pl','name_sv','name_hu','name_tr','name_el','name_ru','name_ja','name_ko','name_zh','name_ar','name_hi','name_bn','name_vi','name_id','name_fa','name_he','name_uk','name_ur']}})

# countries with no admin-1 features: take admin-0 map units
mu = json.load(open(NE + 'ne_10m_admin_0_map_units.geojson'))['features']
for f in mu:
    p = f['properties']
    c = ISO_FIX.get(p['ISO_A2'], p['ISO_A2'])
    if p.get('NAME') in ('Martinique',): c = 'MQ'
    if p.get('NAME') in ('Réunion', 'Reunion'): c = 'RE'
    if c in codes and c not in units and f['geometry']:
        units[c] = [{'name': name_of[c], 'iso': c, 'old': -1, 'geom': make_valid(shape(f['geometry'])), 'props': {}, 'lat': None, 'lon': None, 'en': None, 'alt': None, 'local': None}]

# Matsu (Lienchiang County, Taiwan) is too small for Natural Earth: take its islands from geoBoundaries
tw = json.load(open(GBD + 'TWN.geojson'))['features']
for f in tw:
    if f['properties']['shapeName'] == 'Matsu Islands':
        units['TW'].append({'name': 'Lienchiang', 'iso': 'TW-LIE', 'old': -1, 'region': None, 'geonunit': None, 'region_sub': None, 'type_en': None,
                            'geom': make_valid(shape(f['geometry'])), 'props': {}, 'lat': None, 'lon': None, 'en': 'Matsu', 'alt': 'Matsu Islands', 'local': '連江縣'})
missing = sorted(codes - set(units))
print('countries', len(units), 'missing', missing)
print('old regions used', sum(1 for c in units for u in units[c] if u['old'] >= 0), 'of', len(R))
used = {u['old'] for c in units for u in units[c]}
print('old regions not found:', [(i, R[i]['n'], R[i]['c']) for i in range(len(R)) if i not in used][:30])
pickle.dump(units, open(OUT + 'ne_units.pkl', 'wb'))

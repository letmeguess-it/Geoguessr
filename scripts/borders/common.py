import json, re, unicodedata
import os
HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.environ.get('BORDERS_WORK', os.path.join(HERE, 'work'))          # downloads and intermediate files (not committed)
NE = os.path.join(WORK, 'ne') + '/'                                        # Natural Earth 10m GeoJSON
GBD = os.path.join(WORK, 'gb') + '/'                                       # geoBoundaries GeoJSON
SITE = os.environ.get('SITE_DIR', os.path.join(HERE, '..', '..', 'site')) + '/'
OUT = WORK + '/'


def read_js(path):
    """JSON value of a 'window.X=...;' data file (first line; later lines hold the build stamp)."""
    s = open(path).read().split('\n', 1)[0]
    return json.loads(s[s.index('=') + 1:].rstrip().rstrip(';'))
from shapely.geometry import shape, mapping
from shapely import make_valid
from shapely.ops import unary_union

W = json.load(open(OUT + 'work_in.json'))
R, A, D = W['R'], W['A'], W['D']
NAME = {d['code']: d['n'] for d in D}
ISO3 = dict(l.split() for l in open(os.path.join(HERE, 'iso3.txt')).read().split('\n') if l.strip())

STOP = r'\b(region|regione|province|provincia|prefecture|county|state|district|governorate|oblast|krai|kray|city|municipality|municipio|department|departamento|division|autonomous|special|capital|territory|of|the|and|do|de|del|la|el|al|ash|as|an|ar|at|ad|metropolitan|voivodeship|canton|kanton|parish|zone|council|federal|republic|okrug|muhafazat|wilayah|provinsi|kabupaten|kota|daerah|negeri|changwat|tinh|thanh|pho|khoueng|ken|to|fu|do)\b'


def fold(s):
    s = unicodedata.normalize('NFD', str(s or '').lower())
    s = ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    for a, b in (('ł', 'l'), ('đ', 'd'), ('ø', 'o'), ('æ', 'ae'), ('ß', 'ss'), ('ı', 'i'), ('ð', 'd'), ('þ', 'th')):
        s = s.replace(a, b)
    s = re.sub(r'\(.*?\)', ' ', s)
    s = re.sub(r"[-'’`.,/&]", ' ', s)
    s = re.sub(STOP, ' ', s)
    return re.sub(r'[^a-z0-9]', '', s)


def sheet_rows(cc):
    return [{'i': i, 'cc': a[0], 'old': a[1], 'name': a[2], 'iso': a[3], 'codes': a[4]} for i, a in enumerate(A) if a[0] == cc]


def load_gb(path):
    try:
        g = json.load(open(path))
    except Exception:
        return []
    out = []
    for f in g['features']:
        if not f.get('geometry'):
            continue
        out.append({'name': f['properties'].get('shapeName'), 'iso': f['properties'].get('shapeISO'), 'geom': make_valid(shape(f['geometry']))})
    return out

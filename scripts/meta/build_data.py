# Builds site/data.js (window.GEO_DATA) from the sheet tables in data/csv/.
# Country rows: All Countries, Visual Clues, 2D Visual Clues, Language Clues, Visual Clue Sources.
# Camera notes ("cam"), look-alike pairs ("twins") and a few hand fixes are kept in scripts/meta/meta_extra.json.
# Run from the repository root: python3 -I scripts/meta/build_data.py [snapshot-date]
import csv, json, os, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CSV = os.path.join(ROOT, 'data', 'csv')
EXTRA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'meta_extra.json')


def table(name):
    r = list(csv.reader(open(os.path.join(CSV, name + '.csv'), encoding='utf-8-sig')))
    return {x[0]: dict(zip(r[0], x)) for x in r[1:] if x and x[0]}


AC, V2, LC, VS = table('All Countries'), table('2D Visual Clues'), table('Language Clues'), table('Visual Clue Sources')
# data.js key -> (table, column), in the order the keys appear in each country
KEYS = [('dom', AC, 'Domain'), ('side', None, None), ('call', AC, 'Calling Code'), ('plate', AC, 'Number Plate'),
        ('pos', VS, 'Utility Poles Insight'), ('arch', VS, 'Architecture Insight'), ('ps', V2, 'Number Plate 2D'),
        ('lang', LC, 'Language'), ('script', LC, 'Sample Script'), ('note', LC, 'Look-alike Note'),
        ('po', V2, 'Utility Poles 2D'), ('pot', V2, 'Utility Poles 2D Insight'), ('ro', V2, 'Road Lines & Signs 2D'),
        ('ros', VS, 'Road Lines & Signs Insight'), ('bo', V2, 'Bollards 2D'), ('bot', V2, 'Bollards 2D Insight'),
        ('bos', VS, 'Bollards Insight')]
extra = json.load(open(EXTRA))
out = []
for n, a in AC.items():
    c = {'n': n}
    for k, t, col in KEYS:
        if k == 'side':
            c['side'] = 'L' if a['Driving'].lower().startswith('left') else 'R'; continue
        v = (t.get(n) or {}).get(col, '').strip()
        if v: c[k] = v
    c.update(extra['override'].get(n, {}))
    out.append(c)
snap = sys.argv[1] if len(sys.argv) > 1 else extra['snapshot']
D = {'countries': out, 'cam': extra['cam'], 'twins': extra['twins'], 'snapshot': snap}
open(os.path.join(ROOT, 'site', 'data.js'), 'w').write('window.GEO_DATA=' + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + ';')
print('countries', len(out))

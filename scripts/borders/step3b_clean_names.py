# Step 3b: Remove other names that point somewhere else: a name that is another region's main name (in any country), or a
# town of 20,000+ people in another country (e.g. "Dubrovnik" as an old spelling of Slovenia's Dobrovnik).
import json, re, unicodedata, sys
from common import OUT as B, SITE, read_js
REG = json.load(open(B + 'REGIONS.json'))
T = read_js(SITE + 'places.js')
def k(s):
    s = unicodedata.normalize('NFD', str(s or '').lower()); s = ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    return re.sub(r'[^\w]', '', re.sub(r'\(.*?\)', ' ', s))
primary = {}
for i, r in enumerate(REG):
    for n in [r['n']] + re.findall(r'\((.*?)\)', r['n']):
        primary.setdefault(k(n), set()).add(i)
bigtown = {}
for j, n in enumerate(T['n']):
    if T['p'][j] >= 20000:
        bigtown.setdefault(k(n), set()).add(T['cc'][T['c'][j]])
removed = []
for i, r in enumerate(REG):
    keep = []
    for a in [x for x in r['a'].split('|') if x]:
        kk = k(a)
        own = [k(n) for n in [r['n']] + re.findall(r'\((.*?)\)', r['n'])]
        similar = any(len(o) >= 4 and len(kk) >= 4 and (o[:4] == kk[:4] or kk in o or o in kk) for o in own)
        same = [j for j in primary.get(kk, ()) if j != i and REG[j]['c'] == r['c']]
        other = [j for j in primary.get(kk, ()) if j != i and REG[j]['c'] != r['c']]
        towns = bigtown.get(kk, set())
        if same or (not similar and (other or (towns and r['c'] not in towns))):
            other = same + other
            removed.append((r['c'], r['n'], a, [REG[j]['c'] + ':' + REG[j]['n'] for j in other][:2] or sorted(towns)))
            continue
        keep.append(a)
    r['a'] = '|'.join(keep)
json.dump(REG, open(B + 'REGIONS.json', 'w'), ensure_ascii=False)
print('removed', len(removed))
for x in removed[:80]: print(x)

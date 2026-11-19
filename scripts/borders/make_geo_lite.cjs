// Makes geo_lite.js from geo.js: the same topology with only the points of levels 0..MAXL (the finest level is left out).
// The page draws from geo_lite.js first and swaps in geo.js once it has loaded. Arc numbers, order and endpoints are unchanged.
// Usage: node make_geo_lite.cjs <site folder> [MAXL=3]
const fs = require('fs'), path = require('path');
const dir = process.argv[2], MAXL = +(process.argv[3] || 3);
global.window = {};
eval(fs.readFileSync(path.join(dir, 'geo.js'), 'utf8'));
const t = window.UNIT_TOPO;
const decode = (s) => { const out = []; let cur = 0, sh = 0; for (let i = 0; i < s.length; i++) { const b = s.charCodeAt(i) - 63; cur |= (b & 31) << sh; if (b >= 32) { sh += 5; continue; } out.push(cur & 1 ? -((cur + 1) >> 1) : cur >> 1); cur = 0; sh = 0; } return out; };
const enc1 = (v) => { let z = v < 0 ? -2 * v - 1 : 2 * v, s = ''; while (z >= 32) { s += String.fromCharCode(((z & 31) | 32) + 63); z = Math.floor(z / 32); } return s + String.fromCharCode(z + 63); };
let kept = 0, all = 0;
const arcs = t.arcs.map(([s, l]) => {
  const v = decode(s); let ax = 0, ay = 0, px = 0, py = 0, first = true, os = '', ol = '';
  for (let i = 0; i < l.length; i++) {
    ax += v[2 * i]; ay += v[2 * i + 1]; all++;
    if (l.charCodeAt(i) - 48 > MAXL) continue;
    os += first ? enc1(ax) + enc1(ay) : enc1(ax - px) + enc1(ay - py); ol += l[i]; px = ax; py = ay; first = false; kept++;
  }
  if (ol[0] !== l[0] || ol[ol.length - 1] !== l[l.length - 1]) throw new Error('arc endpoints must be kept');
  return [os, ol];
});
const lite = Object.assign({}, t, {arcs, lite: MAXL});
const out = 'window.UNIT_TOPO=' + JSON.stringify(lite) + ';\n';
fs.writeFileSync(path.join(dir, 'geo_lite.js'), out);
// check: decoding the lite file gives exactly the kept points of the full file
const back = lite.arcs.map(([s]) => decode(s));
let ok = true;
t.arcs.forEach(([s, l], k) => { const v = decode(s); let ax = 0, ay = 0, bx = 0, by = 0, j = 0; const w = back[k];
  for (let i = 0; i < l.length; i++) { ax += v[2 * i]; ay += v[2 * i + 1]; if (l.charCodeAt(i) - 48 > MAXL) continue; bx += w[2 * j]; by += w[2 * j + 1]; j++; if (bx !== ax || by !== ay) ok = false; } });
console.log(`geo_lite.js: ${kept} of ${all} points, ${(out.length / 1e6).toFixed(2)} MB (geo.js ${(fs.statSync(path.join(dir, 'geo.js')).size / 1e6).toFixed(2)} MB), check ${ok ? 'ok' : 'FAILED'}`);
if (!ok) process.exit(1);

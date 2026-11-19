// Makes geo_lite.js from geo.js: the file the globe starts from.
// - Countries only: each country's regions are merged into its outline (one polygon per connected piece, holes kept),
//   so the lines between a country's own regions are left out (their arcs are empty, ["",""]).
// - Only the points of levels 0..MAXL (the finest level is left out).
// Arc numbers and order are unchanged, so geo.js (every point, every region) can be swapped in later without redrawing anything.
// Each country keeps its region count in properties.n.
// Usage: node make_geo_lite.cjs <site folder> [MAXL=3]
const fs = require('fs'), path = require('path');
const dir = process.argv[2], MAXL = +(process.argv[3] || 3);
global.window = {};
eval(fs.readFileSync(path.join(dir, 'geo.js'), 'utf8'));
const t = window.UNIT_TOPO;
const decode = (s) => { const out = []; let cur = 0, sh = 0; for (let i = 0; i < s.length; i++) { const b = s.charCodeAt(i) - 63; cur |= (b & 31) << sh; if (b >= 32) { sh += 5; continue; } out.push(cur & 1 ? -((cur + 1) >> 1) : cur >> 1); cur = 0; sh = 0; } return out; };
const enc1 = (v) => { let z = v < 0 ? -2 * v - 1 : 2 * v, s = ''; while (z >= 32) { s += String.fromCharCode(((z & 31) | 32) + 63); z = Math.floor(z / 32); } return s + String.fromCharCode(z + 63); };
const pts = t.arcs.map(([s]) => { const v = decode(s), o = []; let x = 0, y = 0; for (let i = 0; i < v.length; i += 2) { x += v[i]; y += v[i + 1]; o.push([x, y]); } return o; });
const key = (p) => p[0] * 4194304 + p[1];
const st = (a) => key(a < 0 ? pts[~a][pts[~a].length - 1] : pts[a][0]), en = (a) => key(a < 0 ? pts[~a][0] : pts[a][pts[a].length - 1]);

// group the region geometries by country
const byC = new Map();
t.objects.u.geometries.forEach((g) => { const c = g.properties.c; if (!byC.has(c)) byC.set(c, []); byC.get(c).push(g); });

// arcs used by more than one country are borders between them and always stay
const cOf = new Map();
t.objects.u.geometries.forEach((g) => (g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : []).forEach((p) => p.forEach((r) => r.forEach((a) => {
  const k = a < 0 ? ~a : a; if (!cOf.has(k)) cOf.set(k, new Set()); cOf.get(k).add(g.properties.c); }))));
const inner = new Set(); // arcs inside one country (between two of its regions, or a spike walked there and back): left out
const geoms = []; let odd = 0;
byC.forEach((gs, c) => {
  const polys = []; gs.forEach((g) => (g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : []).forEach((p) => polys.push(p)));
  // net use of each arc: +1 forward, -1 backward. The outline is every arc whose uses do not cancel out
  const net = new Map(), at = new Map();
  polys.forEach((p, i) => p.forEach((r) => r.forEach((a) => { const k = a < 0 ? ~a : a; net.set(k, (net.get(k) || 0) + (a < 0 ? -1 : 1)); if (!at.has(k)) at.set(k, []); at.get(k).push(i); })));
  const par = polys.map((_, i) => i), find = (i) => (par[i] === i ? i : (par[i] = find(par[i])));
  at.forEach((u) => u.forEach((i) => { par[find(i)] = find(u[0]); })); // connected pieces: polygons that share an arc
  net.forEach((v, k) => { if (v === 0 && cOf.get(k).size === 1) inner.add(k); if (Math.abs(v) > 1) odd++; });
  const comp = new Map();
  net.forEach((v, k) => { if (v === 0) return; const ci = find(at.get(k)[0]); if (!comp.has(ci)) comp.set(ci, []); comp.get(ci).push(v > 0 ? k : ~k); });
  const out = [];
  comp.forEach((once) => {
    const from = new Map(); once.forEach((a) => { const k = st(a); if (!from.has(k)) from.set(k, []); from.get(k).push(a); });
    const done = new Set(), rings = [];
    for (const a0 of once) {
      if (done.has(a0)) continue;
      const ring = [a0]; done.add(a0); const k0 = st(a0); let k = en(a0), guard = 0;
      while (k !== k0) { const nx = (from.get(k) || []).find((a) => !done.has(a)); if (nx === undefined || ++guard > 1e6) throw new Error('open ring in ' + c); ring.push(nx); done.add(nx); k = en(nx); }
      rings.push(ring);
    }
    const area = (ring) => { let s = 0; const q = []; ring.forEach((a, j) => { const p = a < 0 ? pts[~a].slice().reverse() : pts[a]; (j ? p.slice(1) : p).forEach((v) => q.push(v)); }); for (let i = 0; i + 1 < q.length; i++) s += q[i][0] * q[i + 1][1] - q[i + 1][0] * q[i][1]; return Math.abs(s); };
    rings.sort((a, b) => area(b) - area(a)); // the outer edge first, holes after (as topojson.mergeArcs does)
    if (rings.length) out.push(rings);
  });
  const n = new Set(gs.map((g) => g.properties.r).filter((r) => r >= 0)).size;
  if (out.length) geoms.push({type: 'MultiPolygon', arcs: out, properties: {c, r: -1, n}});
});
if (odd) console.log(odd + ' arcs are walked twice the same way (left as one edge)');

let kept = 0, all = 0, dropped = 0;
const arcs = t.arcs.map(([s, l], i) => {
  if (inner.has(i)) { dropped += l.length; all += l.length; return ['', '']; }
  const v = decode(s); let ax = 0, ay = 0, px = 0, py = 0, first = true, os = '', ol = '';
  for (let k = 0; k < l.length; k++) {
    ax += v[2 * k]; ay += v[2 * k + 1]; all++;
    if (l.charCodeAt(k) - 48 > MAXL) continue;
    os += first ? enc1(ax) + enc1(ay) : enc1(ax - px) + enc1(ay - py); ol += l[k]; px = ax; py = ay; first = false; kept++;
  }
  if (ol[0] !== l[0] || ol[ol.length - 1] !== l[l.length - 1]) throw new Error('arc endpoints must be kept');
  return [os, ol];
});
const lite = Object.assign({}, t, {arcs, objects: {u: {type: 'GeometryCollection', geometries: geoms}}, lite: MAXL, nat: 1});
const out = 'window.UNIT_TOPO=' + JSON.stringify(lite) + ';\n';
fs.writeFileSync(path.join(dir, 'geo_lite.js'), out);

// checks: every kept point is exactly the point of the full file; no country edge uses an emptied arc
const back = lite.arcs.map(([s]) => decode(s));
let ok = true;
t.arcs.forEach(([s, l], k) => { if (inner.has(k)) return; const v = decode(s); let ax = 0, ay = 0, bx = 0, by = 0, j = 0; const w = back[k];
  for (let i = 0; i < l.length; i++) { ax += v[2 * i]; ay += v[2 * i + 1]; if (l.charCodeAt(i) - 48 > MAXL) continue; bx += w[2 * j]; by += w[2 * j + 1]; j++; if (bx !== ax || by !== ay) ok = false; } });
geoms.forEach((g) => g.arcs.forEach((p) => p.forEach((r) => r.forEach((a) => { if (inner.has(a < 0 ? ~a : a)) ok = false; }))));
console.log(`geo_lite.js: ${geoms.length} countries, ${kept} of ${all} points (${dropped} inside countries left out), ${(out.length / 1e6).toFixed(2)} MB (geo.js ${(fs.statSync(path.join(dir, 'geo.js')).size / 1e6).toFixed(2)} MB), check ${ok ? 'ok' : 'FAILED'}`);
if (!ok) process.exit(1);

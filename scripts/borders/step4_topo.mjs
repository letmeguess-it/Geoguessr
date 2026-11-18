// Step 4: build the compact topologies the page reads (geo.js = sheet countries by region, world.js = the rest of the world).
// Format (read by GEO in app.js): arcs are [delta string, level string]; deltas are quantized integers, zig-zag, 5 bits per character (+63);
// level digit L means the point is drawn from level L up (levels = minimum spherical triangle area per level, steradians).
import fs from 'node:fs';
import {topology} from 'topojson-server';
import {presimplify, sphericalTriangleArea} from 'topojson-simplify';

const [, , inFile, outFile, varName, objName, Q, CUT] = process.argv;
const LEVELS = [0.000008, 0.0000025, 8e-7, 2.5e-7, 0];
const fc = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const topo = topology({[objName]: fc}, +Q);
const qArcs = topo.arcs.map((a) => { let x = 0, y = 0; return a.map(([dx, dy]) => [(x += dx), (y += dy)]); }); // absolute quantized
const pre = presimplify(JSON.parse(JSON.stringify(topo)), sphericalTriangleArea);
const enc = (n) => { let v = n < 0 ? -2 * n - 1 : 2 * n, s = ''; while (v >= 32) { s += String.fromCharCode(63 + 32 + (v & 31)); v = Math.floor(v / 32); } return s + String.fromCharCode(63 + v); };
let kept = 0, total = 0;
const arcs = pre.arcs.map((a, i) => {
  const q = qArcs[i]; let s = '', lv = '', px = 0, py = 0;
  for (let j = 0; j < a.length; j++) {
    const w = a[j][2]; total++;
    if (!(w >= +CUT) && j !== 0 && j !== a.length - 1) continue;
    let L = 0; while (L < LEVELS.length - 1 && !(w >= LEVELS[L])) L++;
    if (j === 0 || j === a.length - 1) L = 0;
    s += enc(q[j][0] - px) + enc(q[j][1] - py); px = q[j][0]; py = q[j][1]; lv += String(L); kept++;
  }
  return [s, lv];
});
const out = {type: 'Topology', transform: topo.transform, arcs, objects: topo.objects, levels: LEVELS};
fs.writeFileSync(outFile, `window.${varName}=` + JSON.stringify(out) + ';');
console.log(outFile, 'points kept', kept, 'of', total, 'size', (fs.statSync(outFile).size / 1048576).toFixed(2), 'MB');

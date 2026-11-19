/* Fast globe drawing (canvas). Replaces the per-frame SVG path strings of the old globe.
   - Every map point is turned into a unit vector (x, y, z) once, at load. A frame is then one small matrix multiply per point.
   - Each topology arc has a bounding circle on the sphere, so a frame skips arcs on the far side or off screen without touching their points.
   - Countries and regions are kept as rings of arc numbers (arcs shared by two neighbours are stored and projected once).
   - Fills use the even-odd rule, so holes and ring direction never matter. Rings cut by the horizon are closed along the rim of the globe.
   Exposes window.FastGlobe = {Topo, Frame}. */
(function () {
  'use strict';
  const D2R = Math.PI / 180, PI = Math.PI, TAU = 2 * Math.PI;
  const wrap = (a) => (a > PI ? a - TAU : a <= -PI ? a + TAU : a);
  const KEY = 4194304; // quantised x * KEY + y is a unique key for a topology point
  const MIN2 = 0.45; // squared px: a point this close to the last one drawn adds nothing visible

  /* ---------- topology ---------- */
  // decode arc i of topology t into the arrays from point p on; returns the next free point
  function decodeArc(t, i, p, xyz, lv, off, sk, ek, cap) {
    const [kx, ky] = t.transform.scale, [ox, oy] = t.transform.translate;
    off[i] = p;
    const s = t.arcs[i][0], l = t.arcs[i][1];
    let cur = 0, sh = 0, half = 0, have = false, ax = 0, ay = 0, k = 0, cx = 0, cy = 0, cz = 0;
    for (let j = 0; j < s.length; j++) {
      const b = s.charCodeAt(j) - 63; cur |= (b & 31) << sh;
      if (b >= 32) { sh += 5; continue; }
      const v = cur & 1 ? -((cur + 1) >> 1) : cur >> 1; cur = 0; sh = 0;
      if (!have) { half = v; have = true; continue; }
      have = false; ax += half; ay += v;
      if (k === 0) sk[i] = ax * KEY + ay;
      const lon = (ax * kx + ox) * D2R, lat = (ay * ky + oy) * D2R, cl = Math.cos(lat);
      const X = cl * Math.cos(lon), Y = cl * Math.sin(lon), Z = Math.sin(lat);
      xyz[3 * p] = X; xyz[3 * p + 1] = Y; xyz[3 * p + 2] = Z; lv[p] = l.charCodeAt(k) - 48;
      cx += X; cy += Y; cz += Z; k++; p++;
    }
    ek[i] = ax * KEY + ay;
    const m = Math.hypot(cx, cy, cz) || 1; cx /= m; cy /= m; cz /= m;
    let md = 1; for (let q = off[i]; q < p; q++) { const d = cx * xyz[3 * q] + cy * xyz[3 * q + 1] + cz * xyz[3 * q + 2]; if (d < md) md = d; }
    const r = Math.acos(Math.max(-1, Math.min(1, md))) + 1e-4;
    cap[6 * i] = cx; cap[6 * i + 1] = cy; cap[6 * i + 2] = cz; cap[6 * i + 3] = r; cap[6 * i + 4] = Math.sin(Math.min(r, PI / 2)); cap[6 * i + 5] = Math.cos(r);
    return p;
  }

  function Topo(t) {
    const arcs = t.arcs, n = arcs.length;
    let N = 0; for (let i = 0; i < n; i++) N += arcs[i][1].length;
    const xyz = new Float32Array(3 * N), lv = new Uint8Array(N), off = new Uint32Array(n + 1);
    const sk = new Float64Array(n), ek = new Float64Array(n), cap = new Float64Array(6 * n);
    let p = 0;
    for (let i = 0; i < n; i++) p = decodeArc(t, i, p, xyz, lv, off, sk, ek, cap);
    off[n] = p;
    Object.assign(this, {n, N, xyz, lv, off, sk, ek, cap, levelW: t.levels || [0], objects: t.objects});
    this.TOP = this.levelW.length - 1; this.L = [];
  }
  // swap in a finer copy of the same topology (same arcs, more points), decoding a slice of arcs per idle moment; resolves when done
  Topo.prototype.upgrade = function (t) {
    const n = this.n, arcs = t.arcs;
    if (!arcs || arcs.length !== n) return Promise.reject(new Error('topology does not match'));
    return new Promise((done) => {
      let N = 0; for (let i = 0; i < n; i++) N += arcs[i][1].length;
      const xyz = new Float32Array(3 * N), lv = new Uint8Array(N), off = new Uint32Array(n + 1), sk = new Float64Array(n), ek = new Float64Array(n), cap = new Float64Array(6 * n);
      let i = 0, p = 0;
      const later = (f) => (window.requestIdleCallback ? requestIdleCallback(f, {timeout: 300}) : setTimeout(f, 16));
      const step = () => {
        const end = performance.now() + 6;
        while (i < n && performance.now() < end) for (let k = 0; k < 300 && i < n; k++, i++) p = decodeArc(t, i, p, xyz, lv, off, sk, ek, cap);
        if (i < n) { later(step); return; }
        off[n] = p;
        Object.assign(this, {N, xyz, lv, off, sk, ek, cap, levelW: t.levels || this.levelW});
        this.TOP = this.levelW.length - 1;
        this.L[this.TOP] = undefined; // the coarser copies hold exactly the same points as before, only the finest one changes
        done();
      };
      later(step);
    });
  };
  // points kept at level L (a coarser copy of the arcs), with buffers for one frame's screen positions
  Topo.prototype.lev = function (L) {
    L = Math.max(0, Math.min(this.TOP, L | 0));
    if (this.L[L]) return this.L[L];
    let xyz = this.xyz, off = this.off, N = this.N;
    if (L < this.TOP) {
      const lv = this.lv, o = this.off; let c = 0;
      for (let q = 0; q < this.N; q++) if (lv[q] <= L) c++;
      xyz = new Float32Array(3 * c); off = new Uint32Array(this.n + 1); N = c; let p = 0;
      for (let i = 0; i < this.n; i++) {
        off[i] = p;
        for (let q = o[i]; q < o[i + 1]; q++) if (lv[q] <= L) { xyz[3 * p] = this.xyz[3 * q]; xyz[3 * p + 1] = this.xyz[3 * q + 1]; xyz[3 * p + 2] = this.xyz[3 * q + 2]; p++; }
      }
      off[this.n] = p;
    }
    return (this.L[L] = {L, xyz, off, N, scr: new Float32Array(2 * N), dep: new Float32Array(N), stamp: new Uint32Array(this.n), cls: new Uint8Array(this.n), seen: new Uint32Array(this.n)});
  };
  Topo.prototype.levelFor = function (rpx) { const w = 1.5 / (rpx * rpx); for (let L = 0; L < this.TOP; L++) if (this.levelW[L] <= w) return L; return this.TOP; };

  // a shape (country, region) from topology geometries: closed rings of signed arc numbers, its outer edge, its inner lines
  Topo.prototype.shape = function (geoms) {
    const use = new Map(), raw = [];
    const addRing = (r, reg) => { raw.push(r); r.forEach((a) => { const i = a < 0 ? ~a : a; const u = use.get(i); if (u) { u.n++; if (u.reg !== reg) u.diff = true; } else use.set(i, {n: 1, a, reg, diff: false}); }); };
    geoms.forEach((g) => { const reg = g.properties ? g.properties.r : undefined; if (g.type === 'Polygon') g.arcs.forEach((r) => addRing(r, reg)); else if (g.type === 'MultiPolygon') g.arcs.forEach((pl) => pl.forEach((r) => addRing(r, reg))); });
    const once = [], twice = []; // twice: lines between two different regions (two pieces of one region get no line)
    use.forEach((u, i) => { if (u.n === 1) once.push(u.a); else if (u.diff) twice.push(i); });
    // chain the arcs used once into closed rings (the outline of the merged shape)
    const st = (a) => (a < 0 ? this.ek[~a] : this.sk[a]), en = (a) => (a < 0 ? this.sk[~a] : this.ek[a]);
    const from = new Map(); once.forEach((a) => { const k = st(a); if (from.has(k)) from.get(k).push(a); else from.set(k, [a]); });
    const done = new Set(); let rings = [], ok = true;
    for (const a0 of once) {
      if (done.has(a0)) continue;
      const ring = [a0]; done.add(a0); const k0 = st(a0); let k = en(a0), guard = 0;
      while (k !== k0 && guard++ < 1e6) {
        const nx = (from.get(k) || []).find((a) => !done.has(a));
        if (nx === undefined) { ok = false; break; }
        ring.push(nx); done.add(nx); k = en(nx);
      }
      if (!ok) break;
      rings.push(Int32Array.from(ring));
    }
    if (!ok) rings = raw.map((r) => Int32Array.from(r)); // never expected; the region rings themselves are always closed
    const border = Int32Array.from(once.map((a) => (a < 0 ? ~a : a)));
    const sh = {rings, border, inner: Int32Array.from(twice), ringCap: rings.map((r) => this.capOf(r))};
    sh.cap = this.capOf(Array.from(border.length ? border : twice));
    return sh;
  };
  // a circle on the sphere holding a set of arcs (built from the arcs' own circles)
  Topo.prototype.capOf = function (refs) {
    const c = this.cap; let x = 0, y = 0, z = 0;
    for (const a of refs) { const i = a < 0 ? ~a : a, w = this.off[i + 1] - this.off[i]; x += c[6 * i] * w; y += c[6 * i + 1] * w; z += c[6 * i + 2] * w; }
    const m = Math.hypot(x, y, z);
    if (m < 1e-9) return [0, 0, 1, PI, 0, -1];
    x /= m; y /= m; z /= m; let r = 0;
    for (const a of refs) { const i = a < 0 ? ~a : a; const d = Math.acos(Math.max(-1, Math.min(1, x * c[6 * i] + y * c[6 * i + 1] + z * c[6 * i + 2]))) + c[6 * i + 3]; if (d > r) r = d; }
    r = Math.min(PI, r + 1e-4);
    return [x, y, z, r, Math.sin(Math.min(r, PI / 2)), Math.cos(r)];
  };
  // lon/lat of a ring at a level (for d3: areas, centroids, containment)
  Topo.prototype.ringCoords = function (ring, L) {
    const V = this.lev(L), out = [];
    for (let k = 0; k < ring.length; k++) {
      const a = ring[k], i = a < 0 ? ~a : a, s = V.off[i], e = V.off[i + 1] - 1;
      for (let j = 0; j <= e - s; j++) {
        if (k > 0 && j === 0) continue;
        const q = a < 0 ? e - j : s + j, X = V.xyz[3 * q], Y = V.xyz[3 * q + 1], Z = V.xyz[3 * q + 2];
        out.push([Math.atan2(Y, X) / D2R, Math.asin(Math.max(-1, Math.min(1, Z))) / D2R]);
      }
    }
    return out;
  };

  /* ---------- one frame: rotation, scale, screen ---------- */
  let STAMP = 0;
  function Frame() { this.stamp = 0; }
  // rot: d3 rotate [λ, φ] (no roll); s: radius in px; (tx, ty): centre on screen; W×H viewport; m: margin in px
  Frame.prototype.set = function (rot, s, tx, ty, W, H, m) {
    const l0 = rot[0] * D2R, ph = rot[1] * D2R, c0 = Math.cos(l0), s0 = Math.sin(l0), cp = Math.cos(ph), sp = Math.sin(ph);
    this.dx = cp * c0; this.dy = -cp * s0; this.dz = -sp; // depth (towards the viewer)
    this.ax = s0; this.ay = c0; // screen x
    this.bx = sp * c0; this.by = -sp * s0; this.bz = cp; // screen y (up)
    this.s = s; this.tx = tx; this.ty = ty; this.W = W; this.H = H; this.m = m;
    this.stamp = ++STAMP;
    return this;
  };

  // classify one arc for this frame and project what is needed. 0 = behind (ends projected), 1 = in front and on screen (all projected),
  // 2 = in front but off screen (ends projected), 3 = crosses the horizon (all projected, with depth)
  function arcClass(T, V, F, i) {
    if (V.stamp[i] === F.stamp) return V.cls[i];
    V.stamp[i] = F.stamp;
    const c = T.cap, o = 6 * i, cx = c[o], cy = c[o + 1], cz = c[o + 2], r = c[o + 3], sr = c[o + 4], cr = c[o + 5];
    const cd = F.dx * cx + F.dy * cy + F.dz * cz;
    let cls = 3;
    if (r < 1.4) {
      if (cd <= -sr) cls = cd < -cr ? 3 : 0; // wholly behind (unless it wraps round the point opposite the viewer)
      else if (cd >= sr) {
        const px = F.tx + F.s * (F.ax * cx + F.ay * cy), py = F.ty - F.s * (F.bx * cx + F.by * cy + F.bz * cz), rr = F.s * r + F.m;
        cls = px + rr < 0 || px - rr > F.W || py + rr < 0 || py - rr > F.H ? 2 : 1;
      }
    }
    V.cls[i] = cls;
    const xyz = V.xyz, scr = V.scr, dep = V.dep, a = V.off[i], b = V.off[i + 1];
    const {dx, dy, dz, ax, ay, bx, by, bz, s, tx, ty} = F;
    if (cls === 1 || cls === 3) {
      for (let q = a; q < b; q++) {
        const X = xyz[3 * q], Y = xyz[3 * q + 1], Z = xyz[3 * q + 2];
        dep[q] = dx * X + dy * Y + dz * Z; scr[2 * q] = tx + s * (ax * X + ay * Y); scr[2 * q + 1] = ty - s * (bx * X + by * Y + bz * Z);
      }
    } else {
      for (const q of [a, b - 1]) {
        const X = xyz[3 * q], Y = xyz[3 * q + 1], Z = xyz[3 * q + 2];
        dep[q] = dx * X + dy * Y + dz * Z; scr[2 * q] = tx + s * (ax * X + ay * Y); scr[2 * q + 1] = ty - s * (bx * X + by * Y + bz * Z);
      }
    }
    return cls;
  }

  // is a circle on the sphere [x,y,z,r,sin r,cos r] possibly visible? 0 = no, 1 = wholly in front, 2 = crosses the horizon
  function capVis(F, cp) {
    const cd = F.dx * cp[0] + F.dy * cp[1] + F.dz * cp[2];
    if (cp[3] < 1.4 && cd <= -cp[4]) return 0;
    if (cp[3] < 1.4 && cd >= cp[4]) {
      const px = F.tx + F.s * (F.ax * cp[0] + F.ay * cp[1]), py = F.ty - F.s * (F.bx * cp[0] + F.by * cp[1] + F.bz * cp[2]), rr = F.s * cp[3] + F.m;
      return px + rr < 0 || px - rr > F.W || py + rr < 0 || py - rr > F.H ? 0 : 1;
    }
    return 2;
  }
  // screen circle of a cap (for hit-test boxes); null if not wholly in front
  function capBox(F, cp) {
    const px = F.tx + F.s * (F.ax * cp[0] + F.ay * cp[1]), py = F.ty - F.s * (F.bx * cp[0] + F.by * cp[1] + F.bz * cp[2]), rr = F.s * Math.min(cp[3], PI / 2) + 2;
    return [px - rr, py - rr, px + rr, py + rr];
  }

  /* add one closed ring to a path (ctx or Path2D). Points behind the horizon are pushed out to the rim; the rim is then followed with arc(),
     which for rings smaller than a quarter of the globe gives exactly the clipped shape. Bigger rings are handed to d3 (bigRing). */
  function ringPath(T, V, F, ring, out) {
    const off = V.off, scr = V.scr, dep = V.dep, tx = F.tx, ty = F.ty, R = F.s;
    let started = false, hid = false, ea = 0, sw = 0, la = 0, px = 0, py = 0, pd = 0;
    const feed = (x, y, d) => {
      if (!started) {
        started = true;
        if (d > 0) out.moveTo(x, y);
        else { hid = true; ea = la = Math.atan2(y - ty, x - tx); sw = 0; out.moveTo(tx + R * Math.cos(ea), ty + R * Math.sin(ea)); }
      } else if (d > 0) {
        if (hid) { const t = pd / (pd - d), a = Math.atan2(py + t * (y - py) - ty, px + t * (x - px) - tx); sw += wrap(a - la); out.arc(tx, ty, R, ea, ea + sw, sw < 0); hid = false; }
        out.lineTo(x, y);
      } else {
        if (!hid) { const t = pd / (pd - d); ea = la = Math.atan2(py + t * (y - py) - ty, px + t * (x - px) - tx); sw = 0; out.lineTo(tx + R * Math.cos(ea), ty + R * Math.sin(ea)); hid = true; }
        const a = Math.atan2(y - ty, x - tx); sw += wrap(a - la); la = a;
      }
      px = x; py = y; pd = d;
    };
    for (let k = 0; k < ring.length; k++) {
      const ref = ring[k], rev = ref < 0, i = rev ? ~ref : ref, cls = arcClass(T, V, F, i);
      const a = off[i], b = off[i + 1] - 1, s = rev ? b : a, e = rev ? a : b, st = rev ? -1 : 1;
      if (k === 0) feed(scr[2 * s], scr[2 * s + 1], dep[s]);
      if (cls === 1) { // points closer than about a pixel to the last one drawn are skipped (the arc's last point never is)
        let lx = px, ly = py;
        for (let q = s + st; q !== e + st; q += st) { const x = scr[2 * q], y = scr[2 * q + 1]; if ((x - lx) * (x - lx) + (y - ly) * (y - ly) > MIN2 || q === e) { out.lineTo(x, y); lx = x; ly = y; } }
        px = scr[2 * e]; py = scr[2 * e + 1]; pd = dep[e];
      }
      else if (cls === 2) { px = scr[2 * e]; py = scr[2 * e + 1]; pd = dep[e]; out.lineTo(px, py); }
      else if (cls === 0) { px = scr[2 * e]; py = scr[2 * e + 1]; pd = dep[e]; const an = Math.atan2(py - ty, px - tx); sw += wrap(an - la); la = an; }
      else for (let q = s + st; q !== e + st; q += st) feed(scr[2 * q], scr[2 * q + 1], dep[q]);
    }
    if (hid) out.arc(tx, ty, R, ea, ea + sw, sw < 0);
    // no closePath(): fills close every ring anyway, and closePath() on a Path2D with many rings is very slow in Chrome
  }

  // rings bigger than a quarter turn are clipped by d3 (their direction then matters, so it is checked once per ring and level)
  const bigCache = new WeakMap();
  function bigRing(T, V, ring, path) {
    let m = bigCache.get(ring); if (!m) bigCache.set(ring, (m = []));
    if (!m[V.L]) {
      let c = T.ringCoords(ring, V.L);
      if (c.length >= 4 && d3.geoArea({type: 'Polygon', coordinates: [c]}) > TAU) c = c.slice().reverse();
      m[V.L] = {type: 'Polygon', coordinates: [c]};
    }
    path(m[V.L]);
  }

  // the fill of a shape: every visible ring, even-odd
  function shapePath(T, V, F, sh, out, d3path) {
    if (!capVis(F, sh.cap)) return false;
    let any = false;
    for (let r = 0; r < sh.rings.length; r++) {
      const v = capVis(F, sh.ringCap[r]);
      if (!v) continue;
      any = true;
      if (v === 2 && sh.ringCap[r][3] > PI / 4) { d3path.context(out); bigRing(T, V, sh.rings[r], d3path); }
      else ringPath(T, V, F, sh.rings[r], out);
    }
    return any;
  }

  // open lines (borders): arcs are drawn once per pass (V.seen), off-screen and far-side arcs are skipped
  function arcLines(T, V, F, list, out, pass) {
    const off = V.off, scr = V.scr, dep = V.dep, tx = F.tx, ty = F.ty, R = F.s;
    for (let k = 0; k < list.length; k++) {
      const i = list[k];
      if (pass) { if (V.seen[i] === pass) continue; V.seen[i] = pass; }
      const cls = arcClass(T, V, F, i);
      if (cls === 0 || cls === 2) continue;
      const a = off[i], b = off[i + 1];
      if (cls === 1) {
        let lx = scr[2 * a], ly = scr[2 * a + 1]; out.moveTo(lx, ly);
        for (let q = a + 1; q < b; q++) { const x = scr[2 * q], y = scr[2 * q + 1]; if ((x - lx) * (x - lx) + (y - ly) * (y - ly) > MIN2 || q === b - 1) { out.lineTo(x, y); lx = x; ly = y; } }
        continue;
      }
      let vis = dep[a] > 0; if (vis) out.moveTo(scr[2 * a], scr[2 * a + 1]);
      for (let q = a + 1; q < b; q++) {
        const d = dep[q], x = scr[2 * q], y = scr[2 * q + 1];
        if (d > 0) {
          if (!vis) { const pd = dep[q - 1], t = pd / (pd - d), an = Math.atan2(scr[2 * q - 1] + t * (y - scr[2 * q - 1]) - ty, scr[2 * q - 2] + t * (x - scr[2 * q - 2]) - tx); out.moveTo(tx + R * Math.cos(an), ty + R * Math.sin(an)); vis = true; }
          out.lineTo(x, y);
        } else if (vis) {
          const pd = dep[q - 1], t = pd / (pd - d), an = Math.atan2(scr[2 * q - 1] + t * (y - scr[2 * q - 1]) - ty, scr[2 * q - 2] + t * (x - scr[2 * q - 2]) - tx);
          out.lineTo(tx + R * Math.cos(an), ty + R * Math.sin(an)); vis = false;
        }
      }
    }
  }
  let PASS = 0;
  const newPass = () => ++PASS;

  /* lines given as unit vectors (graticule): {xyz: Float32Array, runs: [[start, end), ...]} */
  function lineSet(lines, stepDeg) { // lines: arrays of [lon, lat]; densified to stepDeg so straight segments stay on the sphere
    const pts = [], runs = [];
    lines.forEach((ln) => {
      const s = pts.length / 3;
      for (let k = 0; k < ln.length; k++) {
        const [l1, p1] = ln[k];
        if (k > 0) {
          const [l0, p0] = ln[k - 1], n = Math.max(1, Math.ceil(Math.max(Math.abs(l1 - l0), Math.abs(p1 - p0)) / stepDeg));
          for (let j = 1; j < n; j++) { const l = (l0 + (l1 - l0) * j / n) * D2R, p = (p0 + (p1 - p0) * j / n) * D2R; pts.push(Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)); }
        }
        const l = l1 * D2R, p = p1 * D2R; pts.push(Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p));
      }
      runs.push([s, pts.length / 3]);
    });
    return {xyz: Float32Array.from(pts), runs};
  }
  function drawLineSet(ls, F, out) {
    const {xyz, runs} = ls, {dx, dy, dz, ax, ay, bx, by, bz, s, tx, ty} = F;
    for (const [a, b] of runs) {
      let vis = false, px = 0, py = 0, pd = 0;
      for (let q = a; q < b; q++) {
        const X = xyz[3 * q], Y = xyz[3 * q + 1], Z = xyz[3 * q + 2], d = dx * X + dy * Y + dz * Z, x = tx + s * (ax * X + ay * Y), y = ty - s * (bx * X + by * Y + bz * Z);
        if (d > 0) {
          if (!vis) { if (q === a) out.moveTo(x, y); else { const t = pd / (pd - d), an = Math.atan2(py + t * (y - py) - ty, px + t * (x - px) - tx); out.moveTo(tx + s * Math.cos(an), ty + s * Math.sin(an)); out.lineTo(x, y); } vis = true; }
          else out.lineTo(x, y);
        } else if (vis) { const t = pd / (pd - d), an = Math.atan2(py + t * (y - py) - ty, px + t * (x - px) - tx); out.lineTo(tx + s * Math.cos(an), ty + s * Math.sin(an)); vis = false; }
        px = x; py = y; pd = d;
      }
    }
  }

  window.FastGlobe = {Topo, Frame, shapePath, ringPath, arcLines, newPass, capVis, capBox, lineSet, drawLineSet, arcClass};
})();

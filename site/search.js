/* Decode engine: turns what you read on a sign (a street word, a route, a region, letters, a domain) into candidate countries.
   Works on country domain codes; app.js maps them to its country objects. */
window.CLUES = (() => {
'use strict';
const R = window.CLUES_RAW;
const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC'); // keeps ß, ø, æ, ł, đ, þ, ð, ı
const toks = (s) => fold(s).split(/[^\p{L}\p{N}\p{M}]+/u).filter(Boolean);
const norm = (s) => toks(s).join(' ');
const codesOf = (s) => s.trim().split(/\s+/).filter(Boolean);
const TYPE_LABEL = {areacode: 'Area code', street: 'Street', route: 'Route', prefix: 'Route code', sign: 'Sign', region: 'Region', town: 'Town', country: 'Country', lang: 'Language', script: 'Script', domain: 'Domain', call: 'Calling code', letter: 'Letter'};
const WEIGHT = {areacode: 7, country: 10, domain: 10, call: 8, region: 8, lang: 5, script: 3, street: 5, route: 5, sign: 3, prefix: 4, letter: 2.5};

const ENT = [], MAP = new Map(); // MAP: type|nk -> entry (merged across lines)
function put(type, k, m, cs, comp) {
  const nk = norm(k); if (!nk || !cs.length) return;
  const id = type + '|' + nk; let e = MAP.get(id);
  if (!e) { e = {type, k, nk, m: m || '', cs: [], comp: false}; MAP.set(id, e); ENT.push(e); }
  cs.forEach((c) => { if (!e.cs.includes(c)) e.cs.push(c); });
  if (comp) e.comp = true;
  if (m && e.m && !e.m.split('; ').includes(m)) e.m += '; ' + m; else if (m && !e.m) e.m = m;
}
const PER = {}; // per-country lists for the Key Card
const per = (c) => (PER[c] = PER[c] || {street: [], route: [], prefix: [], sign: [], regions: [], letters: []});

// words, routes, signs
let sec = 'street';
R.words.split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  if (ln.startsWith('##')) { sec = ln.slice(2).trim(); return; }
  const [k0, m, cs0] = ln.split('|').map((x) => x.trim()); const comp = k0.startsWith('+'), k1 = k0.replace(/^\+/, ''), k = k1.charAt(0).toUpperCase() + k1.slice(1), cs = codesOf(cs0);
  put(sec, k, m, cs, comp);
  cs.forEach((c) => per(c)[sec].push({k, m, cs}));
});
// route prefixes (M25, DN1 ...)
const PFX = new Map();
R.prefixes.split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  const [k, m, cs0] = ln.split('|').map((x) => x.trim()), cs = codesOf(cs0), nk = fold(k);
  PFX.set(nk, {k, m, cs});
  put('prefix', k, m, cs, false);
  cs.forEach((c) => per(c).prefix.push({k, m, cs}));
});
// letters per country
const ALPHA = {}, CH = new Map(); // CH: char -> [codes]
R.alphabets.split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  const [c, chars] = ln.split('|').map((x) => x.trim()); ALPHA[c] = new Set([...(chars || '')]);
  [...(chars || '')].forEach((ch) => { if (!CH.has(ch)) CH.set(ch, []); CH.get(ch).push(c); });
});
// scripts
const SCRIPT = {};
R.scripts.split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  const [k, m, cs0] = ln.split('|').map((x) => x.trim()); SCRIPT[k] = (SCRIPT[k] || []).concat(codesOf(cs0).filter((c) => !(SCRIPT[k] || []).includes(c))); put('script', k, m, codesOf(cs0), false);
});
// country names and endonyms
const NAMES = {};
R.names.split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  const [c, list] = ln.split('|').map((x) => x.trim()); NAMES[c] = list.split(';').map((x) => x.trim());
  NAMES[c].forEach((n) => put('country', n, '', [c], false));
  put('domain', '.' + c.toLowerCase(), 'country domain', [c], false);
});
// regions: "Local/English" alternates
R.regions.split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  const i = ln.indexOf(':'), c = ln.slice(0, i).trim();
  ln.slice(i + 1).split(';').map((x) => x.trim()).filter(Boolean).forEach((item) => {
    const alts = item.split('/').map((x) => x.trim()).filter(Boolean);
    alts.forEach((a) => put('region', a, '', [c], false));
    per(c).regions.push(alts[0] + (alts[1] && alts[1] !== alts[0] ? ' / ' + alts[1] : ''));
  });
});
// bilingual countries: show the most useful street words first
(R.cardwords || '').split('\n').forEach((ln) => {
  ln = ln.trim(); if (!ln) return;
  const [c, list] = ln.split('|').map((x) => x.trim()), order = list.split(';').map((x) => norm(x.replace(/^\+/, '')));
  const rank = (w) => { const i = order.indexOf(norm(w.k)); return i < 0 ? 99 : i; };
  per(c).street = per(c).street.map((w, i) => ({w, i})).sort((a, b) => rank(a.w) - rank(b.w) || a.i - b.i).map((x) => x.w);
});
// letters in the Key Card
Object.keys(ALPHA).forEach((c) => { per(c).letters = [...ALPHA[c]].sort((a, b) => CH.get(a).length - CH.get(b).length); });

// languages and calling codes come from the app's own data
const LANGS = ['Swedish', 'Albanian', 'Catalan', 'German', 'Belarusian', 'Russian', 'Dutch', 'French', 'Bosnian', 'Serbian', 'Croatian', 'Bulgarian', 'Greek', 'Turkish', 'Czech', 'Danish', 'Estonian', 'Faroese', 'Finnish', 'English', 'Hungarian', 'Icelandic', 'Irish', 'Manx', 'Italian', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Maltese', 'Montenegrin', 'Macedonian', 'Norwegian', 'Polish', 'Portuguese', 'Romanian', 'Slovak', 'Slovenian', 'Spanish', 'Basque', 'Galician', 'Romansh', 'Ukrainian', 'Welsh'];
const CALL = new Map(), CALLB = new Map(); // CALLB: the part before the space (+1) -> every country whose number starts with it (+1 684, +1 441 ...)
function init(countries) {
  countries.forEach((c) => {
    LANGS.forEach((l) => { if (new RegExp('\\b' + l + '\\b').test(c.lang || '')) put('lang', l, 'language', [c.code], false); });
    if (c.call) { const k = c.call.replace(/\s/g, ''), b = c.call.split(/\s+/)[0]; if (!CALL.has(k)) CALL.set(k, []); CALL.get(k).push(c.code); if (!CALLB.has(b)) CALLB.set(b, []); CALLB.get(b).push(c.code); put('call', c.call, 'calling code', [c.code], false); }
  });
}

/* ---------- places: real regions (Natural Earth admin-1) and towns (GeoNames), attached once their data files have loaded ---------- */
let PL = null;
const PFOLD = {'ł': 'l', 'ø': 'o', 'æ': 'ae', 'œ': 'oe', 'đ': 'd', 'ð': 'd', 'þ': 'th', 'ı': 'i', 'ß': 'ss'};
const pk = (s) => s.replace(/[łøæœđðþıß]/g, (c) => PFOLD[c]); // so that Lodz finds Łódź and Kobenhavn finds København
const pn = (s) => pk(norm(s));
function attach(R, T) {
  const rI = new Map(), tI = new Map();
  const put2 = (m, k, i) => { let a = m.get(k); if (!a) m.set(k, (a = [])); if (a[a.length - 1] !== i) a.push(i); };
  R.forEach((r, i) => [r.n, r.e, ...(r.a ? r.a.split('|') : [])].forEach((n) => { if (!n) return; const k = pn(n); if (k.length >= 2) put2(rI, k, i); }));
  for (let i = 0; i < T.n.length; i++) { // towns are stored biggest first, so every list below is already in population order
    put2(tI, pn(T.n[i]), i);
    const a = T.a[i]; if (a) a.split('|').forEach((n) => { const k = pn(n); if (k) put2(tI, k, i); });
  }
  PL = {R, T, rI, tI, tKeys: [...tI.keys()].sort(), rKeys: [...rI.keys()].sort()};
}
const cname = (c) => (NAMES[c] && NAMES[c][0]) || c;
const regionName = (i) => (i >= 0 && PL ? PL.R[i].n : '');
function pinfo(kind, id) { // everything the app needs to label one place
  if (!PL) return null;
  if (kind === 'region') { const r = PL.R[id]; return {kind, id, name: r.n, en: r.e, code: r.c, sub: cname(r.c), ll: [r.x, r.y], iso: r.i || '', area: r.k || ''}; }
  const T = PL.T, code = T.cc[T.c[id]], reg = regionName(T.r[id]);
  return {kind, id, name: T.n[id], code, pop: T.p[id], sub: (reg && reg !== T.n[id] ? reg + ', ' : '') + cname(code), ll: [T.x[id], T.y[id]]};
}
const lower = (keys, q) => { let lo = 0, hi = keys.length; while (lo < hi) { const m = (lo + hi) >> 1; if (keys[m] < q) lo = m + 1; else hi = m; } return lo; };
function prefixIds(keys, map, q, cap) { // ids of entries whose name starts with q, most populous first
  const out = new Set(); let n = 0;
  for (let i = lower(keys, q); i < keys.length && keys[i].startsWith(q) && n < 300; i++, n++) map.get(keys[i]).slice(0, 6).forEach((id) => out.add(id));
  return [...out].sort((a, b) => a - b).slice(0, cap);
}
function placeHits(tk, wordKeys) { // exact names inside the typed text; whole text first, then runs of 1 to 3 words
  if (!PL || !tk.length) return null;
  const qt = tk.map(pk), whole = qt.join(' ');
  let regions = [], towns = [];
  if (whole.length >= 3 && (PL.rI.has(whole) || PL.tI.has(whole))) { regions = PL.rI.get(whole) || []; towns = PL.tI.get(whole) || []; }
  else {
    const used = new Set();
    for (let n = Math.min(3, qt.length); n >= 1; n--) for (let i = 0; i + n <= qt.length; i++) {
      if ([...Array(n).keys()].some((j) => used.has(i + j))) continue;
      const key = qt.slice(i, i + n).join(' '); if (key.length < 4 || wordKeys.has(key)) continue;
      const rs = PL.rI.get(key) || [], ts = (PL.tI.get(key) || []).filter((id) => PL.T.p[id] >= 5000);
      if (rs.length || ts.length) { regions = regions.concat(rs); towns = towns.concat(ts); for (let j = 0; j < n; j++) used.add(i + j); }
    }
  }
  if (!regions.length && !towns.length) return null;
  return {regions: [...new Set(regions)].slice(0, 12), towns: [...new Set(towns)].sort((a, b) => a - b).slice(0, 60)};
}
const popTxt = (p) => (p >= 1e6 ? (p / 1e6).toFixed(1) + 'M' : p >= 1000 ? Math.round(p / 1000) + 'k' : '');
function placeSuggest(raw, limit) { // town and region names that start with what is typed
  if (!PL) return [];
  const q = pk(norm(raw)); if (q.length < 2) return [];
  const out = [];
  const typed = (names) => names.find((n) => pn(n).startsWith(q)); // the spelling the person is typing, if it is not the main name
  prefixIds(PL.rKeys, PL.rI, q, 3).forEach((id) => {
    const i = pinfo('region', id), r = PL.R[id], hit = typed([r.n, r.e, ...(r.a ? r.a.split('|') : [])].filter(Boolean)) || i.name;
    out.push({type: 'region', k: hit, nk: pn(hit), m: (hit !== i.name ? i.name + ' · ' : i.en ? i.en + ' · ' : '') + i.sub, cs: [i.code], place: i});
  });
  prefixIds(PL.tKeys, PL.tI, q, limit).forEach((id) => {
    const i = pinfo('town', id), a = PL.T.a[id], hit = typed([i.name, ...(a ? a.split('|') : [])]) || i.name;
    out.push({type: 'town', k: hit, nk: pn(hit), m: (hit !== i.name ? i.name + ' · ' : '') + i.sub + (popTxt(i.pop) ? ' · ' + popTxt(i.pop) : ''), cs: [i.code], place: i});
  });
  return out.slice(0, limit);
}


/* ---------- phone area codes of every region (from the Countries_Fact tab) ---------- */
const AREA_ALL = [];
const zs = (t) => String(t).trim().replace(/^0+/, '');
const xrx = (t) => (/x/i.test(t) ? new RegExp('^' + t.replace(/x/gi, '\\d') + '$') : null);
function attachAreas(list) { // list of [country code, index in REGIONS or -1, region name, ISO code, the area code cell]
  list.forEach(([c, ri, name, iso, k]) => (String(k).match(/\d[\dx]*/gi) || []).forEach((raw) => { // cells read like "050 / 056", "02xx (La Plata 0221)" or "03x (Sarajevo 033, Tuzla 035)"
    const tok = zs(raw); if (!tok) return;
    AREA_ALL.push({e: {c, ri, name, iso, raw}, raw, rawRx: xrx(raw), tok, tokRx: xrx(tok)});
  }));
}
function areaHits(dg) { // exact: written the same way in the sheet (0361). loose: the same once a leading 0 is ignored (Texas 361)
  const t = zs(dg), exact = [], loose = [];
  AREA_ALL.forEach((a) => {
    if (a.rawRx ? a.rawRx.test(dg) : a.raw === dg) exact.push(a.e);
    else if (a.tokRx ? a.tokRx.test(t) : a.tok === t) loose.push(a.e);
  });
  return {exact, loose};
}
const digitsOnly = (raw) => { const d = raw.replace(/[\s-]/g, ''); return /^\d{2,6}$/.test(d) ? d : null; };
if (window.WORLD_EXTRA) attachAreas(window.WORLD_EXTRA.areas);

/* ---------- decoding ---------- */
const SCRIPT_RX = {Cyrillic: /\p{Script=Cyrillic}/u, Greek: /\p{Script=Greek}/u, Arabic: /\p{Script=Arabic}/u, Hebrew: /\p{Script=Hebrew}/u, Thai: /\p{Script=Thai}/u, Lao: /\p{Script=Lao}/u, Khmer: /\p{Script=Khmer}/u,
  Hangul: /\p{Script=Hangul}/u, Japanese: /[\p{Script=Hiragana}\p{Script=Katakana}]/u, Han: /\p{Script=Han}/u, Devanagari: /\p{Script=Devanagari}/u, Bengali: /\p{Script=Bengali}/u, Tamil: /\p{Script=Tamil}/u,
  Sinhala: /\p{Script=Sinhala}/u, Armenian: /\p{Script=Armenian}/u, Georgian: /\p{Script=Georgian}/u, Tibetan: /\p{Script=Tibetan}/u};
const SPECIAL = (ch) => ch.charCodeAt(0) > 127 && /\p{L}/u.test(ch);
const q0 = (tk) => tk.join(' ');
function decode(text) {
  const raw = (text || '').trim();
  if (!raw) return null;
  const tk = toks(raw), padded = ' ' + tk.join(' ') + ' ';
  const sc = new Map(), why = new Map(), hard = new Set(); // hard: countries with word, region or name evidence
  const add = (codes, w, label, soft) => {
    const per1 = w / Math.sqrt(codes.length);
    codes.forEach((c) => {
      if (!soft) hard.add(c);
      sc.set(c, (sc.get(c) || 0) + per1);
      if (label) { if (!why.has(c)) why.set(c, []); if (!why.get(c).includes(label)) why.get(c).push(label); }
    });
  };
  let clue = false;

  // 1) words, phrases, names, regions
  let hits = [];
  ENT.forEach((e) => {
    if (e.type === 'prefix' || e.type === 'domain' || e.type === 'call') return;
    const min = e.nk.length <= 3 ? 4 : 3;
    const found = e.comp ? tk.some((t) => t === e.nk || (t.endsWith(e.nk) && t.length - e.nk.length >= min)) : padded.includes(' ' + e.nk + ' ');
    if (found) hits.push(e);
  });
  hits = hits.filter((a) => !hits.some((b) => b !== a && b.nk.length > a.nk.length && b.nk.includes(a.nk)));
  hits.forEach((e) => { add(e.cs, WEIGHT[e.type] * (e.comp ? 0.8 : 1), e.k); clue = true; });

  // 1b) real region and town names
  const wordKeys = new Set(hits.filter((e) => e.type === 'street' || e.type === 'route' || e.type === 'sign').map((e) => e.nk));
  let P = placeHits(tk, wordKeys);
  if (P) {
    const seenR = new Set();
    P.regions.forEach((id) => { const i = pinfo('region', id), key = i.code + i.name; if (seenR.has(key)) return; seenR.add(key); add([i.code], WEIGHT.region, i.name + ' (region)'); clue = true; });
    const by = new Map(); P.towns.forEach((id) => { const c = PL.T.cc[PL.T.c[id]]; if (!by.has(c)) by.set(c, []); by.get(c).push(id); });
    by.forEach((ids, c) => { const i = pinfo('town', ids[0]); add([c], 4 + Math.min(3.5, Math.max(0, Math.log10(Math.max(i.pop, 1000)) - 3) * 1.75) + Math.min(1.5, Math.log2(ids.length) * 0.5), ids.length > 1 ? i.name + ' ×' + ids.length : i.name + (i.sub.includes(',') ? ', ' + i.sub.split(',')[0] : '')); clue = true; });
    if (P.towns.length === 1 && PL.T.r[P.towns[0]] >= 0 && !P.regions.length) P = {regions: [PL.T.r[P.towns[0]]], towns: P.towns, context: true}; // show the region the town sits in
  }

  // 2) domain (.de) and calling code (+49)
  const dm = raw.match(/^\.?([a-z]{2})$/i);
  if (dm) { const c = dm[1].toUpperCase(), has = Object.prototype.hasOwnProperty.call(NAMES, c); if (has) { add([c], raw[0] === '.' ? 10 : 5, '.' + c.toLowerCase()); clue = true; } }
  const cm = raw.replace(/\s/g, '').match(/^\+\d{1,4}$/);
  if (cm) { const cs = [...new Set((CALL.get(cm[0]) || []).concat(CALLB.get(cm[0]) || []))]; if (cs.length) { add(cs, 8, cm[0]); clue = true; } }

  // 2b) a phone area code (0463, 68, 05x): the regions that use it
  const dg = digitsOnly(raw);
  if (dg) {
    const {exact, loose} = areaHits(dg), main = exact.length ? exact : loose, weak = exact.length ? loose : [];
    const group = (list) => { const m = new Map(); list.forEach((e) => { if (!m.has(e.c)) m.set(e.c, []); m.get(e.c).push(e); }); return m; };
    group(main).forEach((es, c) => { add([c], WEIGHT.areacode, 'area code ' + dg + ' · ' + es[0].name + (es.length > 1 ? ' +' + (es.length - 1) : '')); clue = true; });
    group(weak).forEach((es, c) => { if (!sc.has(c)) add([c], 2, 'area code ' + zs(dg) + ' without the 0 · ' + es[0].name); });
    const ids = [...new Set(main.map((e) => e.ri).filter((i) => i >= 0))].slice(0, 40);
    if (ids.length) P = {regions: ids, towns: [], area: true};
  }

  // 3) route codes: M25, DN 1, Р-23
  const parts = raw.split(/\s+/);
  const seen = new Set();
  parts.forEach((t, i) => {
    let m = t.match(/^(\p{L}{1,3})[-.]?(\d{1,4})\p{L}?$/u), p = m && m[1];
    if (!m && /^\p{L}{1,3}[-.]?$/u.test(t) && parts[i + 1] && /^\d{1,4}\p{L}?$/u.test(parts[i + 1])) p = t.replace(/[-.]$/, '');
    if (!p) return;
    const e = PFX.get(fold(p)); if (e && !seen.has(e.k)) { seen.add(e.k); add(e.cs, WEIGHT.prefix, e.k + '-' + (m ? m[2] : parts[i + 1])); clue = true; }
  });

  // 4) letters and scripts
  const chars = [...new Set([...raw.toLowerCase().normalize('NFC')].filter(SPECIAL))].filter((ch) => CH.has(ch));
  // letters shared by nearly every Cyrillic country say nothing, so only the distinctive ones count as clues
  chars.forEach((ch) => { const n = CH.get(ch).length; if (!(/\p{Script=Cyrillic}/u.test(ch) && n >= 8) && !/\p{Script=Greek}/u.test(ch)) { add(CH.get(ch), WEIGHT.letter, ch, true); clue = true; } });
  for (const k of Object.keys(SCRIPT_RX)) if (SCRIPT[k] && SCRIPT_RX[k].test(raw)) add(SCRIPT[k], 1.5, k, true);
  if (chars.length) [...sc.keys()].forEach((c) => { // a country that lacks one of the letters you typed is out, unless a word or name points at it
    if (chars.every((ch) => (ALPHA[c] || new Set()).has(ch))) return;
    if (hard.has(c)) sc.set(c, sc.get(c) * 0.35); else sc.delete(c);
  });

  if (hard.size) [...sc.keys()].forEach((c) => { if (!hard.has(c)) sc.delete(c); }); // a word, name or region pointed somewhere: letters alone no longer widen the list

  if (!sc.size) { // still nothing: maybe a name or word that is only half typed
    const part = /\p{L}{3,}/u.test(raw) ? ENT.filter((e) => e.type !== 'prefix' && e.type !== 'domain' && e.type !== 'call' && e.nk.startsWith(q0(tk))) : [];
    if (part.length && part.length <= 14) part.forEach((e) => { add(e.cs, WEIGHT[e.type] * 0.5, e.k + '…'); clue = true; });
  }

  if (!P && !hits.length && PL && q0(tk).length >= 4 && tk.length <= 3) { // half-typed town or region name
    const pre = pk(q0(tk)), rs = prefixIds(PL.rKeys, PL.rI, pre, 4), ts = prefixIds(PL.tKeys, PL.tI, pre, 8);
    if (rs.length || ts.length) {
      rs.forEach((id) => { const i = pinfo('region', id); add([i.code], WEIGHT.region * 0.5, i.name + '…'); });
      ts.forEach((id) => { const i = pinfo('town', id); add([i.code], 3, i.name + '…'); });
      P = {regions: rs, towns: ts, partial: true}; clue = true;
    }
  }

  if (!sc.size) { // nothing specific: every country that writes in this script could contain it
    if (!/\p{L}/u.test(raw)) return {items: [], note: 'No match yet. Try a street word, a letter like ß, a route like M25, a region, a .domain or a phone area code like 0463.', mode: 'empty'};
    SCRIPT.Latin.forEach((c) => { sc.set(c, 1); why.set(c, ['Latin letters']); });
    return finish(sc, why, 'script', 'No specific clue found. Plain Latin letters fit every country that writes in the Latin alphabet.');
  }
  const res = finish(sc, why, 'clue', ''); res.places = P || null; return res;
}
function finish(sc, why, mode, note) {
  const items = [...sc.entries()].map(([code, s]) => ({code, score: s, why: (why.get(code) || []).slice(0, 4)})).sort((a, b) => b.score - a.score || a.code.localeCompare(b.code));
  const max = items.length ? items[0].score : 0;
  items.forEach((x) => { x.strong = mode === 'clue' && x.score >= 0.55 * max; });
  return {items, note, mode};
}

/* ---------- suggestions ---------- */
function suggest(text, limit = 8) {
  const raw = (text || '').trim(); if (!raw) return [];
  const q = norm(raw), tk = toks(raw), last = tk.length ? tk[tk.length - 1] : '';
  const out = [];
  const typeBias = {country: 6, domain: 5, region: 5, lang: 4, script: 4, street: 3, route: 3, sign: 1, call: 3};
  if (q) ENT.forEach((e) => {
    if (e.type === 'prefix' && !(q.length <= 3 && e.nk === q)) return;
    let s = 0;
    if (e.nk === q) s = 100;
    else if (e.nk.startsWith(q)) s = 80 - Math.min(25, e.nk.length - q.length);
    else if (tk.length > 1 && last.length >= 2 && e.nk.startsWith(last) && !e.nk.includes(' ')) s = 55 - Math.min(20, e.nk.length - last.length);
    else if (q.length >= 3 && e.nk.includes(q)) s = 30;
    else if (q.length >= 4 && (e.type === 'street' || e.type === 'route' || e.type === 'sign') && e.m && fold(e.m).includes(q)) s = 15;
    if (s) out.push({e, s: s + (typeBias[e.type] || 0)});
  });
  const letters = [...new Set([...raw.toLowerCase().normalize('NFC')].filter(SPECIAL))].filter((ch) => CH.has(ch)).slice(0, 3);
  letters.forEach((ch) => out.push({e: {type: 'letter', k: ch, nk: ch, m: 'letter', cs: CH.get(ch)}, s: 90}));
  out.sort((a, b) => b.s - a.s || a.e.nk.length - b.e.nk.length);
  const pl = placeSuggest(raw, 4);
  const plKeys = new Set(pl.map((e) => e.nk));
  const seen = new Set(), res = [];
  for (const {e} of out) { if (e.type === 'region' && plKeys.has(e.nk)) continue; // the real region replaces the curated entry with the same name
    const id = e.type + '|' + e.nk; if (seen.has(id)) continue; seen.add(id); res.push(e); if (res.length >= Math.max(4, limit - pl.length)) break; }
  const dgs = digitsOnly(raw);
  if (dgs) { const h = areaHits(dgs); (h.exact.length ? h.exact : h.loose).slice(0, 5).reverse().forEach((e) => { res.unshift({type: 'areacode', k: e.raw, nk: e.raw, m: e.name + ', ' + cname(e.c), cs: [e.c]}); }); }
  pl.forEach((e) => { if (res.length < limit && !res.some((x) => x.type === 'region' && x.nk === e.nk && e.type === 'region')) res.push(e); });
  return res;
}
// text to put in the box when a suggestion is chosen: replaces the word being typed
function complete(text, e) {
  const raw = text.replace(/\s+$/, ''), q = norm(raw);
  if (e.type === 'letter') return raw;
  if (e.place) return e.k;
  if (e.nk.startsWith(q) || tkCount(raw) <= 1) return e.k;
  const i = raw.search(/\S+$/); return raw.slice(0, i) + e.k;
}
const tkCount = (s) => toks(s).length;

const forCountry = (code) => per(code);
const others = (e, code) => e.cs.filter((c) => c !== code);
return {init, decode, suggest, complete, forCountry, others, attach, attachAreas, pinfo, TYPE_LABEL, CH, ALPHA, fold, norm};
})();

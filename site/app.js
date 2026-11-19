(() => {
'use strict';
const D = window.GEO_DATA;
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const parse = geo2d.parse;

/* ---------- data ---------- */
const SHORT = (n) => n.replace(/ \(.*\)$/, '');
const LABEL = {'Bosnia and Herzegovina': 'Bosnia', 'North Macedonia': 'N. Macedonia', 'Åland Islands': 'Åland', 'Faroe Islands': 'Faroes', 'Czechia (Czech Republic)': 'Czechia', 'Türkiye (Turkey)': 'Türkiye',
  'United Arab Emirates': 'UAE', 'Dominican Republic': 'Dominican Rep.', 'British Indian Ocean Territory': 'BIOT', 'Northern Mariana Islands': 'N. Mariana Is.', 'Saint Pierre and Miquelon': 'St Pierre & Miquelon', 'São Tomé and Príncipe': 'São Tomé',
  'South Georgia and the South Sandwich Islands': 'S. Georgia', 'U.S. Virgin Islands': 'US Virgin Is.', 'Cocos (Keeling) Islands': 'Cocos Is.', 'United States': 'United States'};
const C = D.countries.map((c) => {
  c.short = SHORT(c.n); c.id = c.n; c.code = c.code || c.dom.slice(1).toUpperCase();
  c.pS = parse(c.ps); c.pO = parse(c.po); c.bO = parse(c.bo); c.rO = parse(c.ro);
  c.flag = geoFlag(c.n);
  return c;
});
C.sort((a, b) => a.short.localeCompare(b.short, 'en'));
const BY = new Map(C.map((c) => [c.n, c]));
const find = (n) => BY.get(n) || C.find((c) => c.short === n);
const TW = D.twins.map(([a, b, k, t]) => ({a: find(a), b: find(b), k, t})).filter((t) => t.a && t.b);
const labelName = (n) => LABEL[n] || SHORT(n);
const BYC = new Map(C.map((c) => [c.code, c]));
CLUES.init(C);

const SCRIPT_OF = {'Belarus': 'cyr', 'Bulgaria': 'cyr', 'North Macedonia': 'cyr', 'Russia': 'cyr', 'Ukraine': 'cyr', 'Bosnia and Herzegovina': 'mix', 'Montenegro': 'mix', 'Serbia': 'mix', 'Greece': 'greek', 'Cyprus': 'greek', 'Singapore': 'latin', 'Christmas Island': 'latin', 'Cocos (Keeling) Islands': 'latin', 'Maldives': 'thaana'};
// outside Europe: the alphabet of the sample text in the Language Clues tab when there is one, else the main script of the country (a short list in clues_world.js), else Latin
const SCRIPT_RX = [['cyr', /\p{Script=Cyrillic}/u], ['greek', /\p{Script=Greek}/u], ['arabic', /\p{Script=Arabic}/u], ['cauc', /[\p{Script=Hebrew}\p{Script=Armenian}\p{Script=Georgian}]/u], ['sea', /[\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}]/u],
  ['cjk', /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u], ['indic', /[\p{Script=Devanagari}\p{Script=Bengali}\p{Script=Tamil}\p{Script=Sinhala}\p{Script=Tibetan}]/u]];
const SCRIPT_CAT = {Cyrillic: 'cyr', Greek: 'greek', Arabic: 'arabic', Hebrew: 'cauc', Armenian: 'cauc', Georgian: 'cauc', Thai: 'sea', Lao: 'sea', Khmer: 'sea', Hangul: 'cjk', Japanese: 'cjk', Han: 'cjk', Devanagari: 'indic', Bengali: 'indic', Tamil: 'indic', Sinhala: 'indic', Tibetan: 'indic'};
const scriptCat = (c) => {
  if (SCRIPT_OF[c.n]) return SCRIPT_OF[c.n];
  const hit = SCRIPT_RX.find(([, rx]) => rx.test(c.script || ''));
  if (hit) return hit[0];
  return SCRIPT_CAT[((window.WORLD_EXTRA && window.WORLD_EXTRA.primary) || {})[c.code]] || 'latin';
};

function roadDesc(c) {
  const r = c.rO; const parts = [];
  const col = (v) => (String(v).indexOf('yellow') === 0 ? 'yellow' : 'white');
  const CEN = {'yellow-double': 'double yellow centre line', 'yellow-white': 'solid yellow centre line beside white dashes', triple: 'triple centre line (yellow, white dashes, yellow)'};
  if (r.center) parts.push(CEN[r.center] || `${col(r.center)} ${/dashed/.test(r.center) ? 'dashed ' : ''}centre line`);
  if (r.edge) parts.push(`${/dashed/.test(r.edge) ? 'dashed' : 'solid'} ${col(r.edge)} outer edges`);
  if (r.warn) parts.push({'tri-white': 'white warning triangles with a red border', 'tri-yellow': 'warning triangles on a yellow background', 'diamond-yellow': 'yellow diamond warning signs'}[r.warn] || '');
  if (r.word) parts.push(`street names use '${r.word}'`);
  const s = parts.filter(Boolean).join('; ');
  return s ? s.charAt(0).toUpperCase() + s.slice(1) + '.' : '';
}

const draw = (kind, spec) => { const s = geo2d.svg(kind, spec); return s ? `<div class="draw draw-${kind}">${s}</div>` : ''; };
const carSvg = (left) => `<svg viewBox="0 0 26 16" aria-hidden="true"><rect width="26" height="16" rx="3" fill="#5b5f63"/><line x1="13" y1="1" x2="13" y2="15" stroke="#f5f5f2" stroke-dasharray="3 2"/><rect x="${left ? 4 : 16}" y="4" width="6" height="9" rx="1.5" fill="#f2c230"/></svg>`;

/* ---------- lenses: how each meta groups the countries ---------- */
// hue 0/1/2 = the three validated categorical colours; pat 0/1/2 = solid / stripes / dots (secondary encoding).
const LENSES = [
  {id: 'drive', label: 'Driving side', cats: [
    {id: 'R', label: 'Right-hand traffic', hue: 0, pat: 0},
    {id: 'L', label: 'Left-hand traffic', hue: 1, pat: 0}],
   cls: (c) => (c.side === 'L' ? 'L' : 'R'),
   view: (c) => `<div class="car">${carSvg(c.side === 'L')}</div><div class="txt-tile">${c.side === 'L' ? 'Drives on the left' : 'Drives on the right'}</div>`,
   cap: (c) => (c.side === 'L' ? 'Drives on the left.' : 'Drives on the right.')},
  {id: 'script', label: 'Script', note: 'From the Language Clues tab; countries without a sample use their main script.', cats: [
    {id: 'latin', label: 'Latin', hue: 0, pat: 0},
    {id: 'cyr', label: 'Cyrillic', hue: 1, pat: 0},
    {id: 'mix', label: 'Latin + Cyrillic', hue: 1, pat: 1},
    {id: 'greek', label: 'Greek', hue: 2, pat: 0},
    {id: 'arabic', label: 'Arabic', hue: 2, pat: 1},
    {id: 'cjk', label: 'Chinese, Japanese or Korean', hue: 0, pat: 1},
    {id: 'indic', label: 'Indic or Tibetan', hue: 0, pat: 2},
    {id: 'sea', label: 'Thai, Lao or Khmer', hue: 1, pat: 2},
    {id: 'cauc', label: 'Armenian, Georgian or Hebrew', hue: 2, pat: 2},
    {id: 'thaana', label: 'Thaana (Dhivehi)', hue: 1, pat: 1}],
   cls: scriptCat,
   view: (c) => `<div class="txt-tile">${esc(c.script || '')}<small>${esc(c.lang || '')}</small></div>`,
   cap: (c) => c.note || ''},
  {id: 'plate', label: 'Number plate', cats: [
    {id: 'eu', label: 'Blue EU strip with stars', hue: 0, pat: 0},
    {id: 'double', label: 'Strips on both sides', hue: 0, pat: 1},
    {id: 'blue', label: 'Blue strip, no stars', hue: 0, pat: 2},
    {id: 'flag', label: 'Flag strip', hue: 1, pat: 0},
    {id: 'compact', label: 'Compact, with crest', hue: 1, pat: 1},
    {id: 'plain', label: 'Plain, no strip', hue: 1, pat: 2},
    {id: 'yellow', label: 'Yellow front and rear', hue: 2, pat: 0},
    {id: 'rear', label: 'White front, yellow rear', hue: 2, pat: 1},
    {id: 'color', label: 'Coloured side strip', hue: 2, pat: 2},
    {id: 'na', label: 'US-size plate', hue: 0, pat: 1},
    {id: 'dark', label: 'Black or coloured plate', hue: 1, pat: 1},
    {id: 'short', label: 'Short two-line plate', hue: 1, pat: 2},
    {id: 'top', label: 'Coloured band across the top', hue: 2, pat: 0}],
   cls: (c) => {
     const s = c.pS; if (!c.ps) return null;
     if (s.rear === 'yellow') return 'rear'; if (s.bg === 'yellow') return 'yellow'; if (s.topbar) return 'top';
     if (s.band === 'eu-double') return 'double'; if (s.band === 'eu') return 'eu';
     if (s.band === 'blue') return 'blue'; if (s.band === 'flag') return 'flag';
     if (s.band && s.band !== 'none') return 'color';
     if (s.crest === 'yes' || (s.size === 'short' && !s.txt)) return 'compact';
     if (s.size === 'na') return 'na';
     if (s.bg && s.bg !== 'white') return 'dark';
     if (s.size === 'short') return 'short';
     return 'plain';
   },
   view: (c) => draw('plate', c.ps), cap: (c) => (c.plate || '').replace(/^[^:]+:\s*/, '')},
  {id: 'boll', label: 'Bollards', cats: [
    {id: 'angRed', label: 'Angled top, red reflector', hue: 0, pat: 0},
    {id: 'angWhite', label: 'Angled top, white strip', hue: 0, pat: 1},
    {id: 'angWarm', label: 'Angled top, orange or yellow', hue: 0, pat: 2},
    {id: 'flatRed', label: 'Flat top, red reflector', hue: 1, pat: 0},
    {id: 'thin', label: 'Flat or thin, yellow or blue reflector', hue: 1, pat: 1},
    {id: 'diag', label: 'Black diagonal stripe', hue: 2, pat: 0},
    {id: 'round', label: 'Round post, red band', hue: 2, pat: 1},
    {id: 'roundOther', label: 'Round post, black or white marks', hue: 2, pat: 0},
    {id: 'black', label: 'Black post', hue: 2, pat: 2}],
   cls: (c) => {
     const b = c.bO; if (!c.bo) return null;
     if (b.body === 'black') return 'black'; if (b.band === 'black-diag') return 'diag'; if (b.top === 'round') return /^red/.test(b.refl || '') ? 'round' : 'roundOther';
     if (b.top === 'angled') return b.refl === 'white-vert' ? 'angWhite' : (b.refl === 'orange-2' || b.refl === 'yellow-rect') ? 'angWarm' : 'angRed';
     return (b.refl === 'yellow-band' || b.refl === 'blue-vert' || b.refl === 'yellow-rect') ? 'thin' : 'flatRed';
   },
   view: (c) => draw('bollard', c.bo), cap: (c) => c.bot || c.bos || ''},
  {id: 'pole', label: 'Utility poles', cats: [
    {id: 'holey', label: 'Holey concrete', hue: 0, pat: 0},
    {id: 'slots', label: 'Slotted concrete', hue: 0, pat: 1},
    {id: 'ladder', label: 'Ladder or waffle concrete', hue: 0, pat: 2},
    {id: 'octo', label: 'Octagonal concrete', hue: 1, pat: 0},
    {id: 'wood', label: 'Plain wood', hue: 2, pat: 0},
    {id: 'woodStay', label: 'Wood, H-pole or stay wire', hue: 2, pat: 1},
    {id: 'sqholes', label: 'Square concrete with small holes', hue: 0, pat: 0},
    {id: 'striped', label: 'Concrete with hazard stripes', hue: 1, pat: 1},
    {id: 'steel', label: 'Steel or Stobie pole', hue: 1, pat: 2},
    {id: 'concrete', label: 'Plain concrete', hue: 2, pat: 2},
    {id: 'painted', label: 'Painted base (red, black, yellow or white)', hue: 1, pat: 0}],
   cls: (c) => {
     const p = c.pO; if (!c.po) return null;
     if (p.holes === 'full' || p.holes === 'above-base') return 'holey'; if (p.holes === 'slots') return 'slots';
     if (p.holes === 'steps' || p.holes === 'ladder' || p.holes === 'waffle') return 'ladder';
     if (p.holes === 'square-holes') return 'sqholes'; if (p.stripes) return 'striped';
     if (p.form === 'octagonal') return 'octo'; if (p.base) return 'painted';
     if (p.mat === 'steel' || p.form === 'segments' || p.form === 'stobie') return 'steel';
     if (p.mat === 'concrete' || p.mat === 'black') return 'concrete';
     return (p.form === 'H' || p.stay === 'yes') ? 'woodStay' : 'wood';
   },
   view: (c) => draw('pole', c.po), cap: (c) => c.pot || c.pos || ''},
  {id: 'road', label: 'Road lines', cats: [
    {id: 'white', label: 'White centre, solid white edges', hue: 0, pat: 0},
    {id: 'dashedEdge', label: 'White centre, dashed edges', hue: 0, pat: 1},
    {id: 'yellowCenter', label: 'Yellow centre line', hue: 1, pat: 0},
    {id: 'mixedCenter', label: 'Yellow and white centre lines', hue: 1, pat: 1},
    {id: 'yellowEdge', label: 'Dashed yellow edges', hue: 2, pat: 0},
    {id: 'yellowSolid', label: 'Solid yellow edges', hue: 2, pat: 1}],
   cls: (c) => {
     const r = c.rO; if (!r.center && !r.edge) return null;
     if (r.edge === 'yellow-solid') return 'yellowSolid'; if ((r.edge || '').indexOf('yellow') === 0) return 'yellowEdge'; if (r.center === 'triple' || r.center === 'yellow-white') return 'mixedCenter'; if ((r.center || '').indexOf('yellow') === 0) return 'yellowCenter';
     return /dashed/.test(r.edge || '') ? 'dashedEdge' : 'white';
   },
   view: (c) => draw('road', c.ro), cap: (c) => roadDesc(c)},
  {id: 'warn', label: 'Warning signs', cats: [
    {id: 'white', label: 'White triangle, red border', hue: 0, pat: 0},
    {id: 'yellow', label: 'Triangle on yellow', hue: 1, pat: 0},
    {id: 'diamond', label: 'Yellow diamond', hue: 2, pat: 0}],
   cls: (c) => ({'tri-white': 'white', 'tri-yellow': 'yellow', 'diamond-yellow': 'diamond'}[c.rO.warn] || null),
   view: (c) => draw('road', c.ro), cap: (c) => roadDesc(c)}
];
const LBY = Object.fromEntries(LENSES.map((l) => [l.id, l]));
LENSES.forEach((l) => { l.catById = Object.fromEntries(l.cats.map((k) => [k.id, k])); });
const catOf = (lens, c) => { const k = lens.cls(c); return k ? lens.catById[k] : null; };
const swHTML = (cat) => `<span class="sw ${cat ? `h${cat.hue} p${cat.pat}` : 'nd'}"></span>`;

/* ---------- state ---------- */
const S = {view: 'globe', sel: null, hover: null, drive: null, tsort: {col: 0, dir: 1}, q: '', hl: null, hw: null, hlq: '', why: null, hp: null}; // hp: the regions and towns a search points to // hl: countries a search points to, hw: weaker matches
const VIEWS = [['globe', 'Globe'], ['look-alikes', 'Look-alikes'], ['table', 'Table']];
const sideOf = (c) => (c.side === 'L' ? 'L' : 'R');
const matches = (c) => !S.drive || sideOf(c) === S.drive;
const level = (c) => (!matches(c) ? 0 : !S.hl ? 2 : S.hl.has(c.n) ? 2 : (S.hw && S.hw.has(c.n)) ? 1 : 0); // 2 full, 1 half, 0 dimmed
const CARD_W = 388; // card width plus its margin
const isMobile = () => window.matchMedia('(max-width:760px)').matches;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const strip = (c, t) => String(t || '').replace(new RegExp('^' + c.short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*'), '');
let VIEW = null; // mounted view {update, destroy?}

/* ---------- header ---------- */
function buildChrome() {
  const nR = C.filter((c) => sideOf(c) === 'R').length, nL = C.length - nR;
  $('#tabs').innerHTML = VIEWS.map(([id, l]) => `<button class="tab" role="tab" data-v="${id}" aria-selected="false">${l}</button>`).join('');
  $('#drive').innerHTML = `<button class="dchip" data-d="R" style="--c:var(--s1)" aria-pressed="false" title="Show only right-hand traffic"><i></i>Right <span class="n">${nR}</span></button><button class="dchip" data-d="L" style="--c:var(--s2)" aria-pressed="false" title="Show only left-hand traffic"><i></i>Left <span class="n">${nL}</span></button>`;
  $('#about').innerHTML = `<p><b>How to use</b>: drag the globe, zoom with + / − or Ctrl/⌘ + scroll, click a country to open its Key Card. Hover a drawing in the card for the details.</p>
    <p>Blue countries drive on the right, orange on the left. Grey land is not on the sheet. Zoom in and the regions of each country appear: hover one to see its name, ISO code and phone area codes. Type something you read (a street word, letter, route, region, town, phone area code or .domain) in the search line and the countries it could be light up on the globe. A region gets its outline and a town gets a dot. Press / to jump to the search line.</p>
    <p>Data: your Geoguessr learning sheet (${C.length} countries, snapshot ${esc(D.snapshot)}) and the Beginner, Amateur and Pro cheatsheets. Script and plate groupings are derived from those sheets. Borders: Natural Earth (public domain). Regions: Natural Earth and geoBoundaries (CC BY 4.0), brought up to the current provinces and matched to the sheet's region list. Towns: GeoNames (CC BY 4.0). Flags: country-flag-icons (MIT). Flags and clue drawings are simplified.</p>`;
}
function syncChrome() {
  document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.v === S.view)));
  document.querySelectorAll('.dchip').forEach((b) => b.setAttribute('aria-pressed', String(S.drive === b.dataset.d)));
}

/* ---------- selection and views ---------- */
function select(name, opts = {}) {
  if (opts.toggle && name && S.sel === name) name = null; // clicking the open country again closes its card
  S.sel = name;
  renderCard();
  refresh();
}
const pick = (name) => select(name, {toggle: true});
function refresh() { syncChrome(); if (VIEW && VIEW.update) VIEW.update(); }
function setView(v) {
  if (!VIEWS.some((x) => x[0] === v)) v = 'globe';
  S.view = v;
  mountView();
}
function mountView() {
  if (VIEW && VIEW.destroy) VIEW.destroy();
  const host = $('#view'); host.innerHTML = ''; hideTip();
  host.classList.toggle('fill', S.view === 'globe'); host.scrollTop = 0;
  VIEW = ({globe: mountGlobe, 'look-alikes': mountTwins, table: mountTable}[S.view])(host);
  renderCard();
  syncChrome();
  if (VIEW.update) VIEW.update();
  if (location.hash.slice(1) !== S.view) { try { history.replaceState(null, '', '#' + S.view); } catch (e) { /* sandboxed frame */ } }
}

/* ---------- tooltip ---------- */
const tip = $('#tip');
function hideTip() { tip.hidden = true; tip.dataset.for = ''; }
function showTip(html, ev) { // beside the pointer
  tip.innerHTML = html; tip.hidden = false;
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  let x = ev.clientX + 14, y = ev.clientY + 16;
  if (x + tw > innerWidth - 6) x = ev.clientX - tw - 14;
  if (y + th > innerHeight - 6) y = innerHeight - th - 6;
  tip.style.left = Math.max(6, x) + 'px'; tip.style.top = Math.max(6, y) + 'px';
}
function showTipFor(el, html) { // under (or over) an element
  tip.innerHTML = html; tip.hidden = false;
  const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
  let y = r.bottom + 6; if (y + th > innerHeight - 6) y = Math.max(6, r.top - th - 6);
  const x = clamp(r.left + r.width / 2 - tw / 2, 6, innerWidth - tw - 6);
  tip.style.left = x + 'px'; tip.style.top = y + 'px';
}

/* ---------- GLOBE ---------- */
// fixed spots for the small European states (so their dots sit where people expect); every other small country gets its dot from its own shape
const MICRO = {'Andorra': [1.58, 42.55], 'Monaco': [7.42, 43.74], 'San Marino': [12.46, 43.94], 'Liechtenstein': [9.55, 47.14], 'Malta': [14.4, 35.9], 'Luxembourg': [6.13, 49.81], 'Gibraltar': [-5.35, 36.14], 'Jersey': [-2.13, 49.21], 'Isle of Man': [-4.55, 54.24], 'Åland Islands': [19.94, 60.1], 'Faroe Islands': [-6.78, 62.02]}; // dots sit on land (Mariehamn, Tórshavn) so a click at the dot finds the islands
const LABEL_AT = {'Russia': [45, 60], 'Croatia': [16.3, 45.3], 'Norway': [9.2, 61.6], 'Türkiye (Turkey)': [34.5, 39.0], 'Greece': [22.2, 39.4], 'Italy': [12.4, 42.7], 'France': [2.4, 46.7], 'United Kingdom': [-2.3, 53.3], 'Sweden': [15.5, 61.5], 'Finland': [26.5, 63.5], 'Kosovo': [20.9, 42.6],
  'United States': [-98.5, 39.5], 'Canada': [-101, 58], 'Chile': [-71.2, -35.5], 'Indonesia': [113.5, -1.2], 'Japan': [138.5, 36.5], 'Philippines': [121.0, 15.6], 'New Zealand': [172.5, -41.5], 'Malaysia': [102.2, 4.2], 'Denmark': [9.4, 56], 'Antarctica': [60, -78],
  'Vietnam': [108.0, 14.0], 'Israel': [34.85, 30.9], 'Hong Kong': [114.17, 22.40], 'Macau': [113.55, 22.17]}; // label points that must sit inside the country (Vietnam's biggest-piece centre fell in Laos, Israel's in the West Bank)
const GLOBE_HOME = [-14, -49]; // the rotation that faces Europe
const MICRO_AREA = 2e-4; // steradians, about 8,000 km²: smaller countries also get a dot so they can be found and clicked
const REGION_PX = 40; // a country shows its region lines (and answers region hovers) once its shape is about this many pixels in radius
let GLOBE_SEEN = false; // the spin-in plays on the first visit only
const flagUri = (c) => 'data:image/svg+xml;utf8,' + encodeURIComponent(c.flag);

/* Geometry. geo.js holds the 2,100 region shapes of the covered countries in ONE topology, so every border is stored once:
   countries are merged from their regions, the lines between regions are the arcs two regions share. world.js is the whole world (50 m) underneath.
   Every point also says how coarse a view may still skip it (levels 0 to 4), so a zoomed-out globe draws a few thousand points, not a few hundred thousand. */
const GEO = (() => {
  const decode = (s) => { // compact string (zig-zag integers, 5 bits per character) back to [dx, dy] pairs
    const out = []; let cur = 0, sh = 0, pend = null;
    for (let i = 0; i < s.length; i++) {
      const b = s.charCodeAt(i) - 63; cur |= (b & 31) << sh;
      if (b >= 32) { sh += 5; continue; }
      const n = cur & 1 ? -((cur + 1) >> 1) : cur >> 1; cur = 0; sh = 0;
      if (pend === null) pend = n; else { out.push([pend, n]); pend = null; }
    }
    return out;
  };
  const unpack = (t) => { t.arcs = t.arcs.map(([s, lv]) => ({d: decode(s), l: lv})); t.cache = []; return t; };
  const UT = unpack(window.UNIT_TOPO), WT = unpack(window.WORLD_TOPO);
  const LEVEL_W = UT.levels, TOP = LEVEL_W.length - 1;
  const levelFor = (rpx) => { const w = 1.5 / (rpx * rpx); for (let L = 0; L < TOP; L++) if (LEVEL_W[L] <= w) return L; return TOP; }; // a point matters once it spans a pixel or so
  const topoAt = (t, L) => { // the same topology with only the points that level L draws (deltas recomputed)
    if (t.cache[L]) return t.cache[L];
    const arcs = t.arcs.map(({d, l}) => {
      if (L >= TOP) return d;
      const out = []; let ax = 0, ay = 0, kx = 0, ky = 0;
      for (let i = 0; i < d.length; i++) { ax += d[i][0]; ay += d[i][1]; if (l.charCodeAt(i) - 48 <= L) { out.push([ax - kx, ay - ky]); kx = ax; ky = ay; } }
      return out;
    });
    return (t.cache[L] = {type: 'Topology', transform: t.transform, arcs, objects: t.objects});
  };
  const solid = (ring) => { // a ring that simplification has squashed flat (two distinct points, no area) makes d3 fill the whole globe from some viewpoints
    if (!ring || ring.length < 4) return false;
    const seen = new Set(); for (const p of ring) { seen.add(p[0] + ',' + p[1]); if (seen.size >= 3) break; }
    if (seen.size < 3) return false;
    const a = d3.geoArea({type: 'Polygon', coordinates: [ring]});
    return a > 1e-13 && a < 4 * Math.PI - 1e-13;
  };
  const wind = (g) => { // rounding can flip a tiny ring inside out; d3 wants exterior rings clockwise, so turn those back
    if (!g || (g.type !== 'Polygon' && g.type !== 'MultiPolygon')) return g;
    const polys = (g.type === 'Polygon' ? [g.coordinates] : g.coordinates).filter((pl) => solid(pl[0])).map((pl) => [pl[0], ...pl.slice(1).filter(solid).map((h) => (d3.geoArea({type: 'Polygon', coordinates: [h]}) < 2 * Math.PI ? h.slice().reverse() : h))]).map((pl) => {  // holes must run the other way round from the outer ring
      let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
      for (const p of pl[0]) { if (p[0] < a) a = p[0]; if (p[0] > b) b = p[0]; if (p[1] < c) c = p[1]; if (p[1] > d) d = p[1]; }
      if (b - a > 8 || d - c > 8) return pl;
      return d3.geoArea({type: 'Polygon', coordinates: pl}) > 2 * Math.PI ? pl.map((r) => r.slice().reverse()) : pl;
    });
    return !polys.length ? null : polys.length === 1 ? {type: 'Polygon', coordinates: polys[0]} : {type: 'MultiPolygon', coordinates: polys};
  };
  const merged = (gl, L) => { const m = topojson.merge(topoAt(UT, L), gl); return m && m.coordinates && m.coordinates.length ? wind(m) : null; };
  const byCountry = new Map(), byRegion = new Map();
  UT.objects.u.geometries.forEach((g) => {
    const {c, r} = g.properties;
    if (!byCountry.has(c)) byCountry.set(c, []); byCountry.get(c).push(g);
    if (r >= 0) { if (!byRegion.has(r)) byRegion.set(r, []); byRegion.get(r).push(g); }
  });
  const info = (g) => { // size and position of a shape: its biggest piece, and a circle that holds all of it (so the page can skip what is on the far side)
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    let best = null, ba = -1, tot = 0;
    polys.forEach((p) => { const a = d3.geoArea({type: 'Polygon', coordinates: p}); tot += a; if (a > ba) { ba = a; best = p; } });
    const cb = d3.geoCentroid(g); let cr = 0;
    polys.forEach((p) => { const ring = p[0], st = ring.length > 300 ? 3 : 1; for (let i = 0; i < ring.length; i += st) { const d = d3.geoDistance(cb, ring[i]); if (d > cr) cr = d; } });
    return {area: ba, tot, cb, cr: cr + 0.04, ll: d3.geoCentroid({type: 'Polygon', coordinates: best})};
  };
  const countryAt = Array.from({length: LEVEL_W.length}, () => new Map()), ready = new Array(LEVEL_W.length).fill(false);
  const ensure = (L) => { // merge every country at one level (done once, for the level the page opens at, and quietly for the others)
    if (ready[L]) return;
    byCountry.forEach((gl, name) => { const m = merged(gl, L); if (m) countryAt[L].set(name, m); });
    ready[L] = true;
  };
  const regionCache = new Map(), regionListCache = new Map(), meshCache = new Map(), edgeCache = new Map(), innerCache = new Map(), baseCache = new Map(), regionLevel = new Map(), shapeList = new Map(), outCache = new Map();
  const finest = (L) => { while (L < TOP && !ready[L]) L++; return L; }; // the level to use: the wanted one, or the next finer one that is built
  const worldGeoms = WT.objects.w.geometries;
  return {
    levelFor, ensure, isReady: (L) => ready[L], TOP, UT, info, wind,
    countryGeom: (name, L = TOP) => { const l = finest(L); if (l === TOP && !ready[TOP]) ensure(TOP); return countryAt[l].get(name) || null; },
    regionCount: (name) => (byCountry.get(name) || []).filter((g) => g.properties.r >= 0).length,
    world: () => worldGeoms.map((g, i) => ({i, n: g.properties.n})),
    baseGeom: (i, L = TOP) => { // a country of the world layer, at one level
      const key = i * 8 + L; if (!baseCache.has(key)) { let g = null; for (let l = L; l <= TOP && !g; l++) g = wind(topojson.feature(topoAt(WT, l), worldGeoms[i]).geometry); baseCache.set(key, g || topojson.feature(topoAt(WT, TOP), worldGeoms[i]).geometry); } // a speck that vanishes at this level takes the next finer one
      return baseCache.get(key);
    },
    regionGeom: (id) => { // outline of one region (REGIONS index), full detail
      if (!regionCache.has(id)) regionCache.set(id, byRegion.has(id) ? merged(byRegion.get(id), TOP) : null);
      return regionCache.get(id);
    },
    regionShapes: (name) => { // the regions of a country with a circle around each, so a zoomed-in view only draws the ones on screen
      if (!shapeList.has(name)) {
        const ids = [...new Set((byCountry.get(name) || []).map((g) => g.properties.r).filter((r) => r >= 0))];
        shapeList.set(name, ids.map((r) => { const g = GEO.regionGeom(r); if (!g) return null; const i = info(g); return {r, cb: i.cb, cr: i.cr}; }).filter(Boolean));
      }
      return shapeList.get(name);
    },
    regionAtLevel: (r, L) => { // one region at one level (the next finer one when it has shrunk to nothing)
      for (let l = L; l <= TOP; l++) {
        const key = r * 8 + l; if (!regionLevel.has(key)) regionLevel.set(key, byRegion.has(r) ? merged(byRegion.get(r), l) : null);
        if (regionLevel.get(key)) return regionLevel.get(key);
      }
      return null;
    },
    outline: (name, L = TOP) => { // just the outer edge of a country (for the hover and selection outlines)
      const key = name + '|' + L;
      if (!outCache.has(key)) { const m = topojson.mesh(topoAt(UT, L), {type: 'GeometryCollection', geometries: byCountry.get(name) || []}, (a, b) => a === b); outCache.set(key, m && m.coordinates.length ? m : null); }
      return outCache.get(key);
    },
    edge: (name, r, L = TOP) => { // the part of one region's edge that is the country's edge (coast or national border), so a zoomed-in view can draw the border region by region
      const key = name + '|' + r + '|' + L;
      if (!edgeCache.has(key)) { const m = topojson.mesh(topoAt(UT, L), {type: 'GeometryCollection', geometries: byCountry.get(name) || []}, (a, b) => a === b && a.properties.r === r); edgeCache.set(key, m && m.coordinates.length ? m : null); }
      return edgeCache.get(key);
    },
    inner: (name, r, L = TOP) => { // the lines between one region and its neighbours in the same country
      const key = name + '|' + r + '|' + L;
      if (!innerCache.has(key)) { const m = topojson.mesh(topoAt(UT, L), {type: 'GeometryCollection', geometries: byCountry.get(name) || []}, (a, b) => a !== b && a.properties.r !== b.properties.r && (a.properties.r === r || b.properties.r === r)); innerCache.set(key, m && m.coordinates.length ? m : null); }
      return innerCache.get(key);
    },
    mesh: (name, L = TOP) => { // the lines between a country's regions, as one MultiLineString
      const key = name + '|' + L;
      if (!meshCache.has(key)) { const m = topojson.mesh(topoAt(UT, L), {type: 'GeometryCollection', geometries: byCountry.get(name) || []}, (a, b) => a !== b && a.properties.r !== b.properties.r); meshCache.set(key, m && m.coordinates.length ? m : null); }
      return meshCache.get(key);
    },
    regionAt: (name, ll) => { // which region of this country holds the point
      if (!regionListCache.has(name)) {
        const ids = [...new Set((byCountry.get(name) || []).map((g) => g.properties.r).filter((r) => r >= 0))];
        regionListCache.set(name, ids.map((r) => { const g = GEO.regionGeom(r); return g ? {r, g, bb: d3.geoBounds(g)} : null; }).filter(Boolean));
      }
      for (const q of regionListCache.get(name)) {
        const [[w, so], [e, n]] = q.bb;
        if (ll[1] < so || ll[1] > n || (w <= e ? ll[0] < w || ll[0] > e : ll[0] < w && ll[0] > e)) continue;
        if (d3.geoContains(q.g, ll)) return q;
      }
      return null;
    }
  };
})();

function mountGlobe(host) {
  host.innerHTML = `<div class="globewrap" id="gwrap"><svg class="globe" id="globesvg" role="img" aria-label="Globe. Drag to rotate and click a country to open its Key Card. The Find box in the header gives keyboard access."></svg>
    <div class="gctl"><button class="ib" id="g-in" aria-label="Zoom in" title="Zoom in">+</button><button class="ib" id="g-out" aria-label="Zoom out" title="Zoom out">−</button><button class="ib" id="g-eu" aria-label="Reset the view to Europe" title="Reset the view">⟲</button></div>
    <div class="gmsg hide" id="gmsg" role="status" aria-live="polite"></div></div>`;
  const wrap = $('#gwrap'), svgEl = $('#globesvg'), svg = d3.select(svgEl), msgEl = $('#gmsg');
  let GW = 800, GH = 700, R0 = 330, shift = {x: 0, y: 0}, shiftTarget = {x: 0, y: 0}, rot = GLOBE_HOME.slice(), K = 1;
  let dragging = false, raf = 0, lastSel = null, dead = false, msgT = 0, lastW = 0, lastH = 0, hrg = null;
  const msg = (t, ms = 5000) => { msgEl.textContent = t; msgEl.classList.remove('hide'); clearTimeout(msgT); msgT = setTimeout(() => msgEl.classList.add('hide'), ms); };

  const defs = svg.append('defs');
  const shade = defs.append('radialGradient').attr('id', 'g-shade').attr('cx', '38%').attr('cy', '32%').attr('r', '78%');
  shade.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', 0.14);
  shade.append('stop').attr('offset', '68%').attr('stop-color', '#000').attr('stop-opacity', 0);
  shade.append('stop').attr('offset', '100%').attr('stop-color', '#000').attr('stop-opacity', 0.2);

  const proj = d3.geoOrthographic().clipAngle(90).precision(0.6);
  const path = d3.geoPath(proj);
  function layout() {
    GW = Math.max(300, wrap.clientWidth); GH = Math.max(300, wrap.clientHeight); lastW = wrap.clientWidth; lastH = wrap.clientHeight;
    R0 = Math.min(GW, GH) / 2 - 8;
    svgEl.setAttribute('viewBox', `0 0 ${GW} ${GH}`);
  }
  layout();

  const gSea = svg.append('path').attr('class', 'g-sea');
  const gGrat = svg.append('path').attr('class', 'g-grat').datum(d3.geoGraticule10());
  const gBase = svg.append('g'), gSet = svg.append('g');
  const regP = svg.append('path').attr('class', 'g-reg');
  const natP = svg.append('path').attr('class', 'g-nat'); // national borders, drawn over the region lines whenever those show
  const gShade = svg.append('path').attr('class', 'g-shade');
  const hovP = svg.append('path').attr('class', 'hl hov'), selP = svg.append('path').attr('class', 'hl sel'), hovR = svg.append('path').attr('class', 'hl hovr');
  const gPl = svg.append('g'), gMk = svg.append('g'), gLab = svg.append('g'), gPlab = svg.append('g');

  // geometry: the rest of the world underneath (names for hover), the covered countries on top, one dot for each small one
  GEO.ensure(GEO.TOP); GEO.ensure(GEO.levelFor(R0));
  const baseF = GEO.world().filter((f) => !BY.has(f.n)).map((f) => { const i = GEO.info(GEO.baseGeom(f.i)); return {i: f.i, n: f.n, c: null, cb: i.cb, cr: i.cr}; });
  const baseOf = new Map(GEO.world().map((f) => [f.n, f.i]));
  const dotAt = (window.WORLD_EXTRA && window.WORLD_EXTRA.dots) || {};
  const setD = [], mkD = [];
  C.forEach((c) => {
    const own = GEO.countryGeom(c.n), g = own || (baseOf.has(c.n) ? GEO.baseGeom(baseOf.get(c.n)) : null);
    if (!g) { const ll = MICRO[c.n] || dotAt[c.n]; if (ll) mkD.push({n: c.n, c, ll, geom: false}); return; }
    const i = GEO.info(g), d = {n: c.n, g, own: !!own, c, area: i.area, tot: i.tot, cb: i.cb, cr: i.cr, ll: MICRO[c.n] || LABEL_AT[c.n] || i.ll, rad: Math.sqrt(i.area / Math.PI), nreg: GEO.regionCount(c.n)};
    setD.push(d);
    if (MICRO[c.n] || i.tot < MICRO_AREA) mkD.push({n: c.n, c, ll: d.ll, geom: true, rad: d.rad});
  });
  const byN = new Map(setD.map((d) => [d.n, d]));
  const labD = setD.map((d) => ({c: d.c, ll: d.ll, r: Math.sqrt(d.area), micro: !!MICRO[d.n] || d.tot < MICRO_AREA}));
  mkD.filter((d) => !d.geom).forEach((d) => labD.push({c: d.c, ll: d.ll, r: 0, micro: true}));
  labD.sort((a, b) => b.r - a.r);

  const side = (d) => (sideOf(d.c) === 'L' ? 'dl' : 'dr');
  const baseP = gBase.selectAll('path').data(baseF).join('path').attr('class', 'g-base');
  const setP = gSet.selectAll('path').data(setD).join('path').attr('class', (d) => 'cn ' + side(d)).attr('data-n', (d) => d.n);
  const mkP = gMk.selectAll('circle').data(mkD).join('circle').attr('class', (d) => 'mk ' + side(d)).attr('r', 4.6).attr('data-n', (d) => d.n);
  const labP = gLab.selectAll('text').data(labD).join('text').attr('class', 'lab').attr('font-size', 11).style('stroke-width', '3px');

  // searched regions (outline) and towns (dots), drawn above the countries
  const KMAX = 28;
  let rgP = gPl.selectAll('path'), twP = gPl.selectAll('circle'), plabP = gPlab.selectAll('text'), plD = {regions: [], towns: []}, plFor = null;
  const popTxt = (n) => (n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1000 ? Math.round(n / 1000) + 'k' : '');
  const tipPlace = (d) => { const i = CLUES.pinfo(d.kind, d.id), c = BYC.get(d.code); return `<div class="h">${c ? `<span class="fl">${c.flag}</span>` : ''}${esc(d.name)}</div><div class="tp">${d.kind === 'region' ? 'Region' : 'Town'} · ${esc(i ? i.sub : '')}${d.pop >= 1000 ? ' · ' + popTxt(d.pop) : ''}${i && i.area ? ' · ☎ ' + esc(i.area) : ''}</div>`; };
  function buildPlaces() {
    plFor = S.hp; const R = window.REGIONS, T = window.TOWNS;
    plD = {regions: [], towns: []};
    if (S.hp && R && T) {
      plD.regions = S.hp.regions.map((id) => { const r = R[id]; return {kind: 'region', id, name: r.n, code: r.c, ll: [r.x, r.y], g: GEO.regionGeom(id) || {type: 'Point', coordinates: [r.x, r.y]}}; });
      plD.towns = S.hp.towns.map((id) => ({kind: 'town', id, name: T.n[id], code: T.cc[T.c[id]], ll: [T.x[id], T.y[id]], pop: T.p[id]}));
    }
    rgP = gPl.selectAll('path').data(plD.regions, (d) => d.id).join('path').attr('class', 'preg');
    twP = gPl.selectAll('circle').data(plD.towns, (d) => d.id).join('circle').attr('class', 'ptown').attr('r', (d) => (d.pop >= 100000 ? 5 : 4));
    const bindPl = (sel) => sel
      .on('pointermove', (e, d) => { if (e.pointerType === 'mouse' && !dragging) showTip(tipPlace(d), e); })
      .on('pointerleave', hideTip)
      .on('click', (e, d) => { const c = BYC.get(d.code); if (c) pick(c.n); });
    bindPl(rgP); bindPl(twP);
    plabP = gPlab.selectAll('text').data([...plD.regions, ...plD.towns], (d) => d.kind + d.id).join('text').attr('class', 'plab').attr('font-size', 11.5);
  }

  // Drop the pieces of a shape that lie wholly on the far side of the globe before d3 clips them. A small island just behind the horizon
  // can otherwise be read as inside out by the clipper, and its path then fills the whole visible globe (Lithuania seen from Brazil, Greenland, Fiji).
  const pieceCache = new WeakMap();
  const front = (g, ctr) => {
    if (!g || (g.type !== 'Polygon' && g.type !== 'MultiPolygon')) return g;
    let pc = pieceCache.get(g);
    if (!pc) {
      const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
      pc = polys.map((pl) => { const ring = pl[0], cb = d3.geoCentroid({type: 'Polygon', coordinates: [ring]}); let cr = 0; const st = ring.length > 400 ? 2 : 1; for (let i = 0; i < ring.length; i += st) { const d = d3.geoDistance(cb, ring[i]); if (d > cr) cr = d; } return {pl, cb, cr: cr + 0.02, ga: d3.geoArea({type: 'Polygon', coordinates: pl}), ok: isFinite(cb[0]) && isFinite(cb[1])}; });
      { const cb = d3.geoCentroid(g); pc.all = isFinite(cb[0]) && isFinite(cb[1]) ? {cb, cr: Math.max(...pc.map((q) => d3.geoDistance(cb, q.cb) + q.cr))} : null; }
      pieceCache.set(g, pc);
    }
    if (pc.all && d3.geoDistance(pc.all.cb, ctr) + pc.all.cr < Math.PI / 2 - 0.02) return g; // wholly in front of the horizon
    const s2 = proj.scale() * proj.scale();
    const keep = pc.filter((q) => {
      if (!q.ok) return true;
      const dc = d3.geoDistance(q.cb, ctr);
      if (dc - q.cr >= Math.PI / 2) return false; // wholly behind the globe
      if (dc + q.cr < Math.PI / 2 - 0.02) return true; // wholly in front: clipping cannot go wrong
      // crosses the horizon: on screen a piece can never be bigger than its true size, so a bigger one is a clipping flood
      return path.area({type: 'Polygon', coordinates: q.pl}) <= q.ga * s2 * 1.02 + 6;
    });
    if (keep.length === pc.length) return g;
    return keep.length ? {type: 'MultiPolygon', coordinates: keep.map((q) => q.pl)} : null;
  };
  const fpath = (g, ctr) => { const h = front(g, ctr); return h ? path(h) || '' : ''; };
  let vr = 1.6; // how far from the middle of the view anything can still be on screen (a quarter turn when zoomed out, much less zoomed in)
  const seen = (d, ctr) => d3.geoDistance(d.cb, ctr) < d.cr + vr; // could any part of it be on screen?
  function render() {
    if (dead) return;
    proj.translate([GW / 2 - shift.x, GH / 2 - shift.y]).rotate(rot).scale(R0 * K);
    const ctr = [-rot[0], -rot[1]];
    { const rp = R0 * K, dmax = Math.hypot(GW / 2 + Math.abs(shift.x), GH / 2 + Math.abs(shift.y)); vr = dmax >= rp ? 1.6 : Math.min(1.6, Math.asin(dmax / rp) + 0.06); }
    const sphere = path({type: 'Sphere'});
    gSea.attr('d', sphere); gShade.attr('d', sphere).attr('fill', 'url(#g-shade)');
    gGrat.attr('d', path);
    const L = Math.max(0, GEO.levelFor(R0 * K) - (dragging ? 1 : 0)); // the level of detail the zoom needs (one coarser while dragging)
    baseP.attr('d', (d) => (seen(d, ctr) ? fpath(GEO.baseGeom(d.i, L), ctr) : ''));
    let lines = '', nat = '';
    setP.attr('d', (d) => {
      d._reg = false; d._lined = false;
      if (!seen(d, ctr)) return '';
      if (!d.own) return fpath(d.g, ctr);
      const rpx = d.rad * R0 * K;
      if (d.nreg > 1 && rpx > 120 && K >= 1.7) { // a big country seen close up: draw it region by region and skip the regions that are off screen
        d._reg = true; let str = '';
        for (const q of GEO.regionShapes(d.n)) {
          if (d3.geoDistance(q.cb, ctr) >= q.cr + vr) continue;
          const p = fpath(GEO.regionAtLevel(q.r, L), ctr); str += p; lines += p; // the fill's own outline doubles as the faint region line (no second projection)
          const e = GEO.edge(d.n, q.r, L); if (e) nat += path(e) || '';
        }
        return str;
      }
      return fpath(GEO.countryGeom(d.n, L) || d.g, ctr);
    });
    setD.forEach((d) => { if (!d._reg && d.own && d.nreg > 1 && d.rad * R0 * K > REGION_PX && seen(d, ctr)) { const m = GEO.mesh(d.n, L); if (m) lines += path(m) || ''; d._lined = true; } });
    setP.classed('byreg', (d) => !!d._reg).classed('lined', (d) => !!d._lined); // a whole country showing region lines gets a thicker outline of its own
    regP.attr('d', lines); natP.attr('d', nat);
    const outlineOf = (d) => (d.own ? GEO.outline(d.n, L) || d.g : d.g);
    const hd = byN.get(S.hover), sd = byN.get(S.sel);
    hovP.attr('d', hd && S.hover !== S.sel && seen(hd, ctr) ? path(outlineOf(hd)) || '' : ''); selP.attr('d', sd && seen(sd, ctr) ? path(outlineOf(sd)) || '' : '');
    hovR.attr('d', hrg ? fpath(hrg.g, ctr) : '');
    mkP.each(function (d) {
      const vis = d3.geoDistance(d.ll, ctr) < 1.5 && (!d.geom || K < 3 || d.rad * R0 * K < 7); // keep the dot while the shape itself is too small to click
      const p = vis ? proj(d.ll) : null;
      d3.select(this).style('display', p ? null : 'none').attr('cx', p ? p[0] : 0).attr('cy', p ? p[1] : 0);
    });
    rgP.attr('d', (d) => fpath(d.g, ctr));
    twP.each(function (d) { const p = d3.geoDistance(d.ll, ctr) < 1.5 ? proj(d.ll) : null; d3.select(this).style('display', p ? null : 'none').attr('cx', p ? p[0] : 0).attr('cy', p ? p[1] : 0); });
    // names: biggest first, skip anything that would overlap an earlier one
    const boxes = [];
    const fits = (x, y, w) => !boxes.some((b) => Math.abs(b.x - x) < (b.w + w) / 2 + 5 && Math.abs(b.y - y) < 13);
    const named = new Set(); let nl = 0;
    plD.regions.concat(plD.towns).forEach((d) => { // searched places first, so their names win over country names
      d.txt = '';
      if (nl >= 16 || (d.kind === 'town' && named.has(d.name)) || d3.geoDistance(d.ll, ctr) > 1.2) return; // a town named like its region is labelled once
      const p = proj(d.ll); if (!p) return;
      const w = d.name.length * 6.8, y = d.kind === 'town' ? p[1] - 12 : p[1];
      if (fits(p[0], y, w)) { d.txt = d.name; d.x = p[0]; d.y = y; boxes.push({x: p[0], y, w}); if (d.kind === 'region') named.add(d.name); nl++; }
    });
    plabP.text((d) => d.txt).style('display', (d) => (d.txt ? null : 'none')).attr('x', (d) => d.x).attr('y', (d) => d.y);
    labD.forEach((d) => {
      d.txt = '';
      if (d3.geoDistance(d.ll, ctr) > 1.15) return;
      const p = proj(d.ll); if (!p) return;
      const nm = labelName(d.c.n), w = nm.length * 6.1, px = d.r * R0 * K * 1.1;
      if (d.micro ? K < 2.4 : px * 1.45 < w) return;
      const x = d.micro ? p[0] + 9 + w / 2 : p[0];
      if (fits(x, p[1], w)) { d.txt = nm; d.x = x; d.y = p[1]; boxes.push({x, y: p[1], w}); }
    });
    labP.text((d) => d.txt).style('display', (d) => (d.txt ? null : 'none')).attr('x', (d) => d.x).attr('y', (d) => d.y).classed('off', (d) => !!d.off).classed('wk', (d) => !!d.wk);
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); };

  // movement: drag to rotate, zoom buttons, Ctrl/⌘ + wheel
  function fly(lon, lat, k2, ms) {
    svg.interrupt();
    const r0 = rot.slice(), tgt = [-lon, -lat, 0];
    const dl = ((((tgt[0] - r0[0] + 540) % 360) + 360) % 360) - 180;
    const ir = d3.interpolate(r0, [r0[0] + dl, tgt[1], 0]), ik = d3.interpolateNumber(K, k2);
    if (ms <= 0 || reduceMotion()) { rot = ir(1); K = ik(1); render(); return; }
    svg.transition().duration(ms).ease(d3.easeCubicInOut).tween('globe', () => (t) => { rot = ir(t); K = ik(t); render(); });
  }
  function slide(t, ms) { // makes room for the Key Card (beside it on desktop, above it on phones)
    svg.interrupt('shift');
    if (ms <= 0 || reduceMotion()) { shift = {x: t.x, y: t.y}; render(); return; }
    const ix = d3.interpolateNumber(shift.x, t.x), iy = d3.interpolateNumber(shift.y, t.y);
    svg.transition('shift').duration(ms).ease(d3.easeCubicInOut).tween('shift', () => (u) => { shift = {x: ix(u), y: iy(u)}; render(); });
  }
  const wantShift = () => {
    if (!S.sel) return {x: 0, y: 0};
    if (isMobile()) return {x: 0, y: Math.round(Math.min($('#card').offsetHeight, innerHeight * 0.82) / 2)};
    return {x: Math.min(CARD_W / 2, Math.max(0, GW / 2 - R0 * 0.7)), y: 0};
  };
  const kFor = (area) => (area < 0.0004 ? 4.8 : area < 0.002 ? 3.4 : area < 0.008 ? 2.3 : area < 0.03 ? 1.8 : area < 0.1 ? 1.4 : 1.1);
  function flyToCountry(name) {
    const d = byN.get(name) || mkD.find((x) => x.n === name);
    if (d) fly(d.ll[0], d.ll[1], d.area == null ? 4.8 : kFor(d.area), 750);
  }
  const home = () => fly(-GLOBE_HOME[0], -GLOBE_HOME[1], 1, 750);
  let d0 = null;
  let pinch = null; // two fingers on the globe: {d: finger distance at the start, k: zoom at the start}
  const fingerGap = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  svgEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) { svg.interrupt(); pinch = {d: fingerGap(e.touches) || 1, k: K}; dragging = true; hideTip(); setRegion(null); }
  }, {passive: true});
  svgEl.addEventListener('touchmove', (e) => {
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    K = clamp(pinch.k * fingerGap(e.touches) / pinch.d, 0.85, KMAX); schedule();
  }, {passive: false});
  const endPinch = (e) => { if (pinch && e.touches.length < 2) { pinch = null; dragging = false; schedule(); } };
  svgEl.addEventListener('touchend', endPinch); svgEl.addEventListener('touchcancel', endPinch);
  svg.call(d3.drag().clickDistance(5)
    .filter((e) => !e.button && !(e.touches && e.touches.length > 1)) // a second finger is a pinch, not a drag
    .on('start', (e) => { svg.interrupt(); d0 = {x: e.x, y: e.y, rot: rot.slice()}; })
    .on('drag', (e) => {
      if (pinch) { d0 = {x: e.x, y: e.y, rot: rot.slice()}; return; } // the globe holds still while zooming
      if (!dragging) { dragging = true; hideTip(); setRegion(null); svgEl.classList.add('grabbing'); }
      const k = 57.3 / (R0 * K);
      rot = [d0.rot[0] + (e.x - d0.x) * k, clamp(d0.rot[1] - (e.y - d0.y) * k, -85, 85), 0];
      schedule();
    })
    .on('end', () => { if (!pinch) dragging = false; svgEl.classList.remove('grabbing'); schedule(); }));
  svgEl.addEventListener('wheel', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault(); K = clamp(K * Math.exp(-e.deltaY * 0.01), 0.85, KMAX); schedule();
  }, {passive: false});
  const zoomBy = (f) => fly(-rot[0], -rot[1], clamp(K * f, 0.85, KMAX), 220);
  $('#g-in').onclick = () => zoomBy(1.5);
  $('#g-out').onclick = () => zoomBy(1 / 1.5);
  $('#g-eu').onclick = home;

  // hover and click
  function setRegion(q) { if ((q && q.r) !== (hrg && hrg.r)) { hrg = q; schedule(); } else if (q) hrg = q; }
  const regionLine = (q) => { // what the sheet says about the region under the pointer
    const R = window.REGIONS && window.REGIONS[q.r]; if (!R || (q.c && R.c !== q.c)) return ''; // never label a region of another country
    return `<div class="tp">${esc(R.n)}${R.e && R.e !== R.n ? ' (' + esc(R.e) + ')' : ''}${R.i ? ' · ' + esc(R.i) : ''}${R.k ? ' · ☎ ' + esc(R.k) : ''}</div>`;
  };
  const tipOf = (c, q) => `<div class="h"><span class="fl">${c.flag}</span>${esc(c.short)}</div>${q ? regionLine(q) : ''}${S.why && S.why.get(c.n) ? `<div class="tp">${esc(S.why.get(c.n))}</div>` : ''}`;
  const regionUnder = (e, d) => { // the region under the mouse, once the country is big enough on screen for regions to be readable
    if (!window.REGIONS || !(d.nreg > 1) || d.rad * R0 * K <= REGION_PX) return null;
    const [x, y] = d3.pointer(e, svgEl), ll = proj.invert([x, y]);
    const q = ll && isFinite(ll[0]) ? GEO.regionAt(d.n, ll) : null;
    return q ? Object.assign({c: d.c.code}, q) : null;
  };
  mkP
    .on('pointerenter', (e, d) => { S.hover = d.c.n; schedule(); })
    .on('pointermove', (e, d) => { if (e.pointerType === 'mouse' && !dragging) showTip(tipOf(d.c), e); })
    .on('pointerleave', () => { S.hover = null; schedule(); hideTip(); })
    .on('click', (e, d) => pick(d.c.n));
  setP
    .on('pointerenter', (e, d) => { S.hover = d.c.n; schedule(); })
    .on('pointermove', (e, d) => { if (e.pointerType === 'mouse' && !dragging) { const q = regionUnder(e, d); setRegion(q); showTip(tipOf(d.c, q), e); } })
    .on('pointerleave', () => { S.hover = null; setRegion(null); schedule(); hideTip(); })
    .on('click', (e, d) => pick(d.c.n));
  baseP
    .on('pointermove', (e, d) => { if (e.pointerType !== 'mouse' || dragging) return; showTip(`<div class="h">${esc(d.n)}</div><div class="tp">Not on the list of ${C.length} destinations</div>`, e); })
    .on('pointerleave', hideTip)
    .on('click', (e, d) => { hideTip(); msg(`${d.n} isn't one of the ${C.length} countries on the sheet.`); });

  function paint() {
    if (S.hp !== plFor) buildPlaces();
    setP.each(function (d) { const l = level(d.c); d.off = l === 0; d.wk = l === 1; d3.select(this).classed('off', d.off).classed('wk', d.wk); });
    mkP.classed('off', (d) => level(d.c) === 0).classed('wk', (d) => level(d.c) === 1);
    labD.forEach((d) => { const l = level(d.c); d.off = l === 0; d.wk = l === 1; });
    render();
  }
  const selHasPlaces = () => !!S.sel && plD.regions.concat(plD.towns).some((d) => { const c = BYC.get(d.code); return c && c.n === S.sel; }); // keep the zoomed place in view when its country opens
  function update() {
    const ws = wantShift(); if (Math.abs(ws.x - shiftTarget.x) + Math.abs(ws.y - shiftTarget.y) > 0.5) { shiftTarget = ws; slide(ws, 450); }
    paint();
    if (S.sel !== lastSel) { lastSel = S.sel; if (S.sel && !selHasPlaces()) flyToCountry(S.sel); }
  }

  [2, 3, 0].forEach((L, i) => setTimeout(() => { if (!dead) GEO.ensure(L); }, 1200 + i * 400)); // the other levels are merged quietly once the page is up
  // arrival: spin in from the Americas on the first visit
  shiftTarget = wantShift(); shift = {x: shiftTarget.x, y: shiftTarget.y};
  if (!GLOBE_SEEN && !S.sel && !reduceMotion()) { rot = [95, -12, 0]; K = 0.9; render(); fly(-GLOBE_HOME[0], -GLOBE_HOME[1], 1, 1900); }
  if (!GLOBE_SEEN) msg(window.matchMedia('(pointer: coarse)').matches ? 'Drag to turn · pinch to zoom · tap a country' : 'Drag to rotate · click a country · Ctrl/⌘ + scroll to zoom', 6500);
  GLOBE_SEEN = true;
  let ro = null;
  if (window.ResizeObserver) { ro = new ResizeObserver(() => { if (wrap.clientWidth !== lastW || wrap.clientHeight !== lastH) { layout(); shiftTarget = wantShift(); shift = {x: shiftTarget.x, y: shiftTarget.y}; schedule(); } }); ro.observe(wrap); }
  let focused = false; // true while the globe is zoomed to fit search results
  function focusOn(names, pl) { // turn and zoom so every match is in view: regions and towns when there are some, else countries
    const pts = [];
    if (pl) {
      const R = window.REGIONS, T = window.TOWNS;
      pl.regions.forEach((id) => { const g = GEO.regionGeom(id); if (g) { const [[w, so], [e, n]] = d3.geoBounds(g); pts.push([w, so], [e, n], [w, n], [e, so]); } else pts.push([R[id].x, R[id].y]); });
      pl.towns.forEach((id) => pts.push([T.x[id], T.y[id]]));
    }
    const ds = pts.length ? [] : names.map((n) => byN.get(n) || mkD.find((x) => x.n === n)).filter(Boolean);
    if (!pts.length && !ds.length) { if (focused) { focused = false; if (!S.sel) home(); } return; }
    focused = true;
    const all = pts.length ? pts : ds.map((d) => d.ll);
    const ctr = all.length === 1 ? all[0] : d3.geoCentroid({type: 'MultiPoint', coordinates: all});
    let th = 0; all.forEach((q) => { th = Math.max(th, d3.geoDistance(ctr, q)); });
    const pad = pts.length ? 0.025 : ds.length === 1 && ds[0].area ? Math.sqrt(ds[0].area / Math.PI) + 0.04 : 0.07;
    const k = clamp((pts.length ? 1.15 : 0.76) / Math.sin(Math.min(th + pad, 1.45)), 1, pts.length ? (pl.regions.length ? 16 : 9) * Math.min(2, 380 / R0) : 4.4); // small screens can zoom further for the same picture
    fly(ctr[0], ctr[1], k, 800);
  }
  return {update, focusOn, destroy() { dead = true; if (ro) ro.disconnect(); svg.interrupt(); svg.interrupt('shift'); clearTimeout(msgT); if (raf) cancelAnimationFrame(raf); hideTip(); }};
}

/* ---------- TABLE ---------- */
function mountTable(host) {
  const cols = [
    {h: 'Country', v: (c) => c.short},
    {h: 'Drives', v: (c) => (sideOf(c) === 'L' ? 'Left' : 'Right')},
    ...[['Plate', 'plate'], ['Script', 'script'], ['Bollards', 'boll'], ['Poles', 'pole'], ['Road lines', 'road'], ['Signs', 'warn']].map(([h, id]) => ({h, lens: LBY[id], v: (c) => { const k = catOf(LBY[id], c); return k ? k.label : '~'; }}))
  ];
  host.innerHTML = `<table class="tb"><thead><tr>${cols.map((c, i) => `<th data-c="${i}" scope="col">${esc(c.h)} <span class="muted" data-a="${i}"></span></th>`).join('')}</tr></thead><tbody></tbody></table>`;
  const tb = $('tbody', host);
  function fill() {
    const col = cols[S.tsort.col], dir = S.tsort.dir;
    const rows = C.filter(matches).sort((a, b) => dir * col.v(a).localeCompare(col.v(b), 'en') || a.short.localeCompare(b.short));
    tb.innerHTML = rows.map((c) => `<tr data-n="${esc(c.n)}" class="${S.sel === c.n ? 'sel' : ''}"><td><div class="cn-name"><span class="fl">${c.flag}</span>${esc(c.short)} <span class="dom">${esc(c.dom)}</span></div></td><td>${sideOf(c) === 'L' ? 'Left' : 'Right'}</td>${cols.slice(2).map((cl) => { const k = catOf(cl.lens, c); return `<td class="${k ? '' : 'muted'}">${esc(k ? k.label : '–')}</td>`; }).join('')}</tr>`).join('');
    tb.querySelectorAll('tr').forEach((r) => { r.onclick = () => pick(r.dataset.n); });
    host.querySelectorAll('[data-a]').forEach((a) => { a.textContent = Number(a.dataset.a) === S.tsort.col ? (dir > 0 ? '▲' : '▼') : ''; });
  }
  host.querySelectorAll('th').forEach((th) => { th.onclick = () => { const i = Number(th.dataset.c); S.tsort = {col: i, dir: S.tsort.col === i ? -S.tsort.dir : 1}; fill(); }; });
  return {update: fill};
}

/* ---------- LOOK-ALIKES ---------- */
const KIND_LABEL = {script: 'Script & words', plate: 'Number plates', boll: 'Bollards', pole: 'Utility poles', road: 'Road lines'};
function mountTwins(host) {
  host.innerHTML = `<div class="gview"><svg id="gsvg" viewBox="0 0 900 720" role="img" aria-label="Network of look-alike countries"></svg><div class="pairbox" id="pairbox"></div></div>`;
  const GW = 900, GH = 720;
  const nodesMap = new Map();
  TW.forEach((t) => { [t.a, t.b].forEach((c) => { if (!nodesMap.has(c.n)) nodesMap.set(c.n, {id: c.n, c}); }); });
  const nodes = [...nodesMap.values()];
  const links = TW.map((t, i) => ({source: t.a.n, target: t.b.n, t, i}));
  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d) => d.id).distance(78).strength(0.75))
    .force('charge', d3.forceManyBody().strength(-420))
    .force('collide', d3.forceCollide(36))
    .force('x', d3.forceX(GW / 2).strength(0.1)).force('y', d3.forceY(GH / 2).strength(0.13))
    .stop();
  for (let i = 0; i < 500; i++) { sim.tick(); nodes.forEach((n) => { n.x = Math.max(40, Math.min(GW - 40, n.x)); n.y = Math.max(34, Math.min(GH - 46, n.y)); }); }
  const svg = d3.select('#gsvg');
  const gE = svg.append('g'), gN = svg.append('g');
  const eg = gE.selectAll('g').data(links).join('g');
  const line = eg.append('line').attr('class', 'edge');
  eg.append('line').attr('class', 'edge-hit');
  const place = () => { eg.selectAll('line').attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y).attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y); ng.attr('transform', (d) => `translate(${d.x},${d.y})`); };
  const ng = gN.selectAll('g').data(nodes).join('g').attr('class', 'nodeg').attr('tabindex', 0).attr('role', 'button').attr('aria-label', (d) => d.c.short);
  ng.append('circle').attr('class', 'ring').attr('r', 19);
  ng.each(function (d) {
    const id = 'fc' + d.c.code;
    const g = d3.select(this);
    g.append('clipPath').attr('id', id).append('circle').attr('r', 16);
    g.append('image').attr('href', flagUri(d.c)).attr('x', -22).attr('y', -16).attr('width', 44).attr('height', 32).attr('clip-path', `url(#${id})`).attr('preserveAspectRatio', 'xMidYMid slice');
    g.append('text').attr('y', 32).text(labelName(d.c.n));
  });
  place();
  const flagBox = (c) => `<span class="fl" style="width:22px;height:15px">${c.flag}</span>`;
  const showPair = (t) => {
    $('#pairbox').innerHTML = t
      ? `<b>${flagBox(t.a)}${esc(t.a.short)} <span class="muted">↔</span> ${flagBox(t.b)}${esc(t.b.short)} <span class="kind">${esc(KIND_LABEL[t.k] || t.k)}</span></b><p>${esc(t.t)}</p>`
      : 'Hover a line to see how two look-alikes differ. Drag flags to untangle.';
  };
  let pinned = null;
  eg.on('pointerenter', (e, d) => { line.classed('on', (x) => x === d); showPair(d.t); })
    .on('pointerleave', () => { line.classed('on', (x) => pinned === x); showPair(pinned && pinned.t); })
    .on('click', (e, d) => { pinned = d; line.classed('on', (x) => x === d); showPair(d.t); });
  ng.on('click', (e, d) => pick(d.c.n)).on('keydown', (e, d) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(d.c.n); } });
  ng.call(d3.drag().on('start', (e, d) => { d.fx = d.x; d.fy = d.y; }).on('drag', (e, d) => { d.x = d.fx = Math.max(24, Math.min(GW - 24, e.x)); d.y = d.fy = Math.max(24, Math.min(GH - 30, e.y)); place(); }).on('end', (e, d) => { d.fx = d.fy = null; }));
  function update() {
    ng.classed('off', (d) => !matches(d.c)).classed('sel', (d) => S.sel === d.c.n);
    if (!pinned) showPair(null);
  }
  return {update};
}

/* ---------- KEY CARD ---------- */
let TIPS = [], lastPT = 'mouse';
function twinsOf(c) { return TW.filter((t) => t.a === c || t.b === c).map((t) => ({o: t.a === c ? t.b : t.a, k: t.k, t: t.t})); }
/* ---------- SEARCH LINE (Decode): type what you read, the globe lights up the countries it could be ---------- */
let searchSet = null, searchReapply = null;
function mountSearch() {
  const inp = $('#sq'), xb = $('#sx'), ul = $('#ssug'), res = $('#sres');
  const EX = [['Kungsgatan', 'Swedish street word'], ['ß', 'German letter'], ['M25', 'route code'], ['.pl', 'country domain'], ['Tyrol', 'region'], ['Innsbruck', 'town'], ['Neustadt', 'a town name found in many places'], ['Rruga', 'Albanian street'],
    ['Jalan', 'Indonesian street word'], ['ถนน', 'Thai for street'], ['0361', 'phone area code'], ['Kerala', 'Indian state'], ['Mombasa', 'town in Kenya'], ['Рио', 'Cyrillic letters']];
  const tryList = () => EX.map(([k, m]) => { const r = CLUES.decode(k); return {type: 'try', k, m, cs: r ? r.items.filter((x) => x.strong || r.mode === 'script').map((x) => x.code) : []}; });
  let sug = [], act = -1, cur = null, ft = 0;
  const flag = (c) => `<span class="fl">${c.flag}</span>`;
  function closeSug() { sug = []; act = -1; ul.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); }
  function drawSug() {
    if (document.activeElement !== inp) { closeSug(); return; }
    sug = inp.value.trim() ? CLUES.suggest(inp.value) : tryList(); act = -1; inp.removeAttribute('aria-activedescendant');
    ul.hidden = !sug.length; inp.setAttribute('aria-expanded', String(!!sug.length));
    ul.innerHTML = sug.map((e, i) => { const cs = e.cs.map((x) => BYC.get(x)).filter(Boolean); return `<li role="option" id="so${i}" data-i="${i}" aria-selected="false"><span class="ty">${esc(e.type === 'try' ? 'Try' : (CLUES.TYPE_LABEL[e.type] || e.type))}</span><b class="k">${esc(e.k)}</b><span class="m">${esc(e.m || '')}</span><span class="fls">${cs.slice(0, 4).map(flag).join('')}${cs.length > 4 ? `<span class="more">+${cs.length - 4}</span>` : ''}</span></li>`; }).join('');
  }
  function mark(i) { act = i; [...ul.children].forEach((li, k) => li.setAttribute('aria-selected', String(k === i))); if (i >= 0) { inp.setAttribute('aria-activedescendant', 'so' + i); ul.children[i].scrollIntoView({block: 'nearest'}); } else inp.removeAttribute('aria-activedescendant'); }
  function placeText(P, text) { // one line saying what the globe is showing
    const I = CLUES.pinfo, rs = P.regions.map((id) => I('region', id)), ts = P.towns.map((id) => I('town', id));
    if (P.area) return `area code ${text}: ${rs.slice(0, 3).map((r) => `${r.name} (${r.sub})`).join(', ')}${rs.length > 3 ? ` +${rs.length - 3} more` : ''}`;
    if (P.partial) return `${rs.length + ts.length} places start with “${text.length > 14 ? text.slice(0, 13) + '…' : text}”`;
    if (ts.length === 1) return `${ts[0].name} · ${ts[0].sub}`;
    if (ts.length > 1) { const n = new Set(ts.map((t) => t.code)).size; return `${ts[0].name}: ${ts.length} places` + (n > 1 ? ` in ${n} countries` : ` in ${ts[0].sub.split(', ').pop()}`); }
    return rs.length === 1 ? `${rs[0].name} · region of ${rs[0].sub}` : `${rs[0].name} and ${rs.length - 1} more regions`;
  }
  function apply() {
    xb.hidden = !inp.value; S.q = inp.value;
    const r = CLUES.decode(inp.value); cur = null;
    let focus = [], pl = null;
    if (!r || r.mode === 'empty') {
      S.hl = S.hw = S.why = S.hp = null; S.hlq = '';
      res.hidden = !r; if (r) res.innerHTML = `<span class="nt">${esc(r.note)}</span>`;
    } else {
      const items = r.items.map((x) => Object.assign({c: BYC.get(x.code)}, x)).filter((x) => x.c);
      const main = items.filter((x) => x.strong || r.mode === 'script'), rest = items.filter((x) => !main.includes(x));
      S.hl = new Set(main.map((x) => x.c.n)); S.hw = new Set(rest.map((x) => x.c.n)); S.hlq = inp.value.trim();
      S.why = new Map(items.map((x) => [x.c.n, x.why.join(' · ')]));
      pl = r.places || null; S.hp = pl;
      cur = {main, rest, r};
      const txt = pl ? placeText(pl, S.hlq) : r.mode === 'script' ? `No clear clue: ${items.length} countries use this alphabet` : `${main.length} likely${rest.length ? ` · ${rest.length} possible` : ''}`;
      const fl = r.mode === 'script' ? '' : `<span class="fls">${main.slice(0, 8).map((x) => `<button data-n="${esc(x.c.n)}" aria-label="${esc(x.c.short)}" title="${esc(x.c.short + (x.why.length ? ': ' + x.why.join(' · ') : ''))}">${flag(x.c)}</button>`).join('')}${main.length > 8 ? `<span class="more">+${main.length - 8}</span>` : ''}</span>`;
      res.hidden = false; res.innerHTML = `${fl}<span class="nt">${esc(txt)}</span>`;
      if (r.mode !== 'script') focus = [...S.hl];
    }
    if (S.view !== 'globe') setView('globe'); else refresh();
    clearTimeout(ft); ft = setTimeout(() => { if (VIEW && VIEW.focusOn) VIEW.focusOn(focus, pl); }, 350);
  }
  function choose(i) { const e = sug[i]; if (!e) return; inp.value = e.type === 'try' ? e.k : CLUES.complete(inp.value, e); closeSug(); apply(); }
  function setText(t) { inp.value = t; closeSug(); apply(); }
  searchSet = setText;
  searchReapply = () => { if (inp.value) apply(); else drawSug(); }; // runs once the region and town files have arrived
  inp.addEventListener('input', () => { drawSug(); apply(); });
  inp.addEventListener('focus', drawSug);
  inp.addEventListener('blur', closeSug);
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!sug.length) drawSug(); if (sug.length) mark((act + 1) % sug.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (sug.length) mark(act <= 0 ? sug.length - 1 : act - 1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (act >= 0) choose(act);
      else { closeSug(); if (cur && cur.main.length === 1 && cur.r.mode !== 'script') select(cur.main[0].c.n); }
    } else if (e.key === 'Escape') {
      if (!ul.hidden) { e.stopPropagation(); closeSug(); }
      else if (inp.value) { e.stopPropagation(); setText(''); }
    }
  });
  ul.addEventListener('mousedown', (e) => e.preventDefault()); // keep the caret in the box
  ul.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) { choose(+li.dataset.i); inp.focus(); } });
  xb.onclick = () => { setText(''); inp.focus(); };
  res.addEventListener('click', (e) => { const b = e.target.closest('[data-n]'); if (b) pick(b.dataset.n); });
}
// region outlines and towns arrive after the first paint (about 3 MB), so the page starts as fast as before
// Every map file carries the same build stamp. Region numbers in geo.js point into regions.js and places.js, so files from
// two different builds (an old one still in the browser cache, say) would put one country's regions on another. If the
// stamps differ, fetch again past the cache once; if they still differ, leave regions and towns off rather than show wrong ones.
function loadPlaces() {
  const want = window.UNIT_TOPO && window.UNIT_TOPO.build;
  const add = (src) => new Promise((ok, no) => { const el = document.createElement('script'); el.src = src; el.onload = ok; el.onerror = no; document.head.appendChild(el); });
  const fresh = () => window.REGIONS_BUILD === want && window.TOWNS_BUILD === want && (!window.WORLD_EXTRA || window.WORLD_EXTRA.build === want);
  const load = (v) => Promise.all([add('regions.js?v=' + v), add('places.js?v=' + v)]);
  load(want).then(() => fresh() ? null : load(want + '-' + Date.now())).then(() => {
    if (!fresh()) { console.warn('Map files are from different builds; regions and towns are switched off.'); window.REGIONS = undefined; window.TOWNS = undefined; return; }
    CLUES.attach(window.REGIONS, window.TOWNS); if (searchReapply) searchReapply();
  }).catch(() => {});
}


/* ---------- route numbering (Key Card "Routes" tab, Europe first) ---------- */
// Draws one country's route schematic from window.ROUTES data (shared by app.js and the preview script).
const ROUTE_COL = {rad: '#D85A30', rad2: '#1D9E75', odd: '#534AB7', even: '#D85A30', oth: '#8f8d84'};
function routeSvg(R, ink) {
  const e = (t) => String(t).replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const k = ink || {land: 'var(--surface-3)', edge: 'var(--line-2)', text: 'var(--text)', halo: 'var(--surface)', muted: 'var(--muted)'};
  const [W, H] = R.v;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">`;
  s += `<path d="${R.o}" fill="${k.land}" stroke="${k.edge}" stroke-width="0.8" stroke-linejoin="round"/>`;
  for (const [d, x, y] of R.z) s += `<circle cx="${x}" cy="${y}" r="7.5" fill="none" stroke="${k.muted}" stroke-width="0.9" stroke-dasharray="2 2"/><text x="${x}" y="${y + 3.4}" text-anchor="middle" font-size="10" font-weight="600" fill="${k.muted}">${e(d)}</text>`;
  const order = ['oth', 'rad2', 'even', 'odd', 'rad'];
  for (const g of order) for (const [, grp, p] of R.r) if (grp === g) s += `<polyline points="${p}" fill="none" stroke="${ROUTE_COL[grp]}" stroke-width="${grp === 'oth' ? 1.7 : 2.2}" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (const [n, x, y, tx, ty, a] of R.h) s += `<circle cx="${x}" cy="${y}" r="3.3" fill="${k.text}"/><text x="${tx}" y="${ty}" text-anchor="${a}" font-size="10.5" font-weight="600" fill="${k.text}" stroke="${k.halo}" stroke-width="3" paint-order="stroke" stroke-linejoin="round">${e(n)}</text>`;
  for (const [lab, grp, x, y, w] of R.l) s += `<rect x="${(x - w / 2).toFixed(1)}" y="${(y - 6.5).toFixed(1)}" width="${w}" height="13" rx="3" fill="${ROUTE_COL[grp]}"/><text x="${x}" y="${(y + 3.4).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">${e(lab)}</text>`;
  return s + '</svg>';
}
let CARD_TAB = 'clues'; // remembered while browsing countries
function routePane(c) {
  const R = (window.ROUTES || {})[c.code];
  const e = esc;
  const eroad = 'Across Europe, green E-road signs follow one grid: even numbers run east-west, odd numbers north-south.';
  if (!R) return `<div class="rt-k">Route numbers</div><p class="rt-s">Route numbering for ${e(c.short)} is not drawn yet. Europe, Asia, Oceania and the Americas are done; Africa follows.</p>`;
  const note = R.n == null ? eroad : R.n; // Europe: E-road grid; elsewhere the entry's own footnote ('' = none)
  if (R.t) return `<div class="rt-k">Route numbers</div><p class="rt-s">${e(R.t)}</p>${note ? `<p class="rt-n">${e(note)}</p>` : ''}`;
  const lg = R.g.map(([g, t]) => `<div><span class="rt-sw${g === 'zone' ? ' zone' : ''}"${g === 'zone' ? '' : ` style="background:${ROUTE_COL[g]}"`}></span>${e(t)}</div>`).join('');
  const radial = R.g.some(([g]) => g === 'rad' || g === 'rad2');
  const hubs = R.h.length ? `<div><span class="rt-sw hub"></span>${e(R.h.map((h) => h[0]).join(' and '))}: ${radial ? 'where the numbering starts' : 'capital, for orientation'}</div>` : '';
  return `<div class="rt-k">How routes are numbered</div><div class="rt-map" aria-label="Schematic map of the main numbered routes in ${e(c.short)}">${routeSvg(R)}</div>
    <div class="rt-lg">${lg}${hubs}</div><p class="rt-s">${e(R.s)}</p>
    <p class="rt-n">Simplified: main routes only, drawn as straight lines through the real towns they pass.${note ? ' ' + e(note) : ''}</p>`;
}

function renderCard() {
  const el = $('#card'), c = S.sel ? BY.get(S.sel) : null;
  el.classList.toggle('open', !!c); el.inert = !c; el.setAttribute('aria-hidden', String(!c));
  $('#stage').classList.toggle('shrink', !!c && S.view !== 'globe');
  if (!c) { hideTip(); return; } // keep the content so it can slide out
  TIPS = [];
  const ti = (html) => { TIPS.push(html); return TIPS.length - 1; };
  const tp = (title, body, art) => `<div class="tt">${esc(title)}</div>${art ? `<div class="big">${art}</div>` : ''}${body ? `<div class="tp">${esc(body)}</div>` : ''}`;
  const na = (label) => `<div class="t na"><span class="tk">${label}</span><div class="art">Not documented yet</div></div>`;
  const clip = (t, n) => (t.length > n ? t.slice(0, n - 1).replace(/[\s,;:.]+\S*$/, '') + '…' : t);
  const txtTile = (label, title, text, tag) => { // the sheet has words for this clue but no drawing yet
    const t = String(text || '').trim(); if (!t) return na(label);
    return `<div class="t" tabindex="0" data-ti="${ti(tp(title, t.charAt(0).toUpperCase() + t.slice(1)))}"><span class="tk">${label}</span><div class="art"><div class="ttxt">${esc(clip(t.charAt(0).toUpperCase() + t.slice(1), 90))}</div></div><div class="tl"><b>${esc(tag || 'Text only')}</b></div></div>`;
  };
  const cat = (id) => catOf(LBY[id], c);

  const pi = c.plate ? c.plate.indexOf(':') : -1;
  const ptag = pi > 0 ? c.plate.slice(0, pi).trim() : '', pdesc = pi > 0 ? c.plate.slice(pi + 1).trim() : (c.plate || '');
  const plate = c.ps ? `<div class="t" tabindex="0" data-ti="${ti(tp(`Number plate · ${cat('plate').label}`, `${ptag ? ptag + ': ' : ''}${pdesc}`, draw('plate', c.ps)))}"><span class="tk">Plate</span><div class="art">${draw('plate', c.ps)}</div><div class="tl"><b>${esc(cat('plate').label)}</b></div></div>` : txtTile('Plate', `Number plate${ptag ? ' · ' + ptag.toLowerCase() : ''}`, pdesc, ptag ? ptag.toLowerCase() : '');
  const sc = cat('script');
  const lang = c.lang ? `<div class="t" tabindex="0" data-ti="${ti(tp(`${c.lang} · ${sc.label}`, strip(c, c.note) || 'Look for these letters and words on signs.'))}"><span class="tk">Language</span><div class="sample">${esc(c.script)}</div><div class="tl"><b>${esc(c.lang)}</b><span>${esc(sc.label)}</span></div></div>` : na('Language');
  const pole = c.po ? `<div class="t" tabindex="0" data-ti="${ti(tp(`Utility pole · ${cat('pole').label}`, strip(c, c.pot || c.pos), draw('pole', c.po)))}"><span class="tk">Poles</span><div class="art">${draw('pole', c.po)}</div><div class="tl"><b>${esc(cat('pole').label)}</b></div></div>` : txtTile('Poles', 'Utility poles', strip(c, c.pot || c.pos));
  const boll = c.bo ? `<div class="t" tabindex="0" data-ti="${ti(tp(`Bollard · ${cat('boll').label}`, strip(c, c.bot || c.bos), draw('bollard', c.bo)))}"><span class="tk">Bollards</span><div class="art">${draw('bollard', c.bo)}</div><div class="tl"><b>${esc(cat('boll').label)}</b></div></div>` : txtTile('Bollards', 'Bollards', strip(c, c.bot || c.bos));
  const rc = cat('road'), wc = cat('warn');
  const road = c.ro ? `<div class="t" tabindex="0" data-ti="${ti(tp(`Road lines & signs${rc ? ' · ' + rc.label : ''}`, [strip(c, c.ros), roadDesc(c)].filter(Boolean).join(' '), draw('road', c.ro)))}"><span class="tk">Road lines</span><div class="art">${draw('road', c.ro)}</div><div class="tl"><b>${esc(rc ? rc.label : 'Road signs')}</b>${wc ? `<span>${esc(wc.label)}</span>` : ''}</div></div>` : txtTile('Road lines', 'Road lines & signs', strip(c, c.ros));

  const cam = D.cam[c.n];
  const camChip = cam ? `<span class="chip" tabindex="0" data-ti="${ti(tp(/sky/i.test(cam) ? 'Sky rift' : /low/i.test(cam) ? 'Low camera' : 'Camera quirk', cam.replace(/^[^:]+:\s*/, '')))}">${/sky/i.test(cam) ? 'Sky rift glitch' : /low/i.test(cam) ? 'Low camera' : 'Camera quirk'}</span>` : '';
  const arch = c.arch ? strip(c, c.arch) : '';
  const houses = arch ? `<div class="houses" tabindex="0" data-ti="${ti(tp('Houses', arch.charAt(0).toUpperCase() + arch.slice(1)))}"><b>Houses</b>${esc(arch)}</div>` : '';
  const tw = twinsOf(c);
  const twins = tw.length ? `<div class="twl">${tw.slice(0, 3).map((x) => `<button class="tw" data-go="${esc(x.o.n)}" data-ti="${ti(tp(`${x.o.short} · ${KIND_LABEL[x.k] || x.k}`, x.t))}"><span class="fl">${x.o.flag}</span><span class="nm">${esc(x.o.short)}</span><span class="tx">${esc(x.t)}</span></button>`).join('')}</div>` : '';
  const dl = c.side === 'L' ? 'Drives on the left' : 'Drives on the right';
  const K = CLUES.forCountry(c.code), cap1 = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : '');
  const where = (codes) => codes.filter((x) => x !== c.code).map((x) => BYC.get(x)).filter(Boolean).map((x) => x.short);
  const also = (codes) => { const o = where(codes); return o.length ? 'Also seen in ' + o.join(', ') + '.' : 'Only seen in ' + c.short + '.'; };
  const wd = (w, cls) => `<span class="wd${cls || ''}" tabindex="0" data-ti="${ti(tp(w.k, [cap1(w.m), also(w.cs)].filter(Boolean).join(' ')))}">${esc(w.k)}</span>`;
  const rr = (label, inner) => (inner ? `<div class="rr"><span class="rk">${label}</span><div class="chs">${inner}</div></div>` : '');
  const moreChip = (label, items) => (items.length ? `<span class="wd more" tabindex="0" data-ti="${ti(tp(label, items.length > 14 ? items.slice(0, 14).join('; ') + `; and ${items.length - 14} more. Search any of them to find it on the globe.` : items.join('; ')))}">+${items.length}</span>` : '');
  const lw = (w) => `${w.k} (${w.m})`;
  const letters = K.letters.slice(0, 9).map((ch) => { const cs = CLUES.CH.get(ch) || []; return `<span class="wd lt${cs.length <= 3 ? ' gv' : ''}" tabindex="0" data-ti="${ti(tp(ch, cs.length <= 3 ? `Giveaway letter: only ${cs.length === 1 ? c.short : 'in ' + where(cs.concat(c.code)).concat(c.short).filter((v, i, a) => a.indexOf(v) === i).join(', ')}.` : also(cs)))}">${esc(ch)}</span>`; }).join('') + moreChip('More letters', K.letters.slice(9));
  const regs = K.regions.slice(0, 3).map((r) => { const [a, b] = r.split(' / '); return b ? `<span class="wd rg" tabindex="0" data-q="${esc(a)}" data-ti="${ti(tp(a, b + '. Click to find it on the globe.'))}">${esc(a)}</span>` : `<span class="wd rg" tabindex="0" data-q="${esc(a)}" data-ti="${ti(tp(a, 'Click to find it on the globe.'))}">${esc(a)}</span>`; }).join('') + moreChip(`More regions of ${c.short}`, K.regions.slice(3).map((r) => r.split(' / ').join(' = ')));
  const pf = (w) => `<span class="wd pf" tabindex="0" data-ti="${ti(tp(w.k, [cap1(w.m), also(w.cs)].join(' ')))}">${esc(w.k)}</span>`;
  const roads = K.route.slice(0, 1).map((w) => wd(w)).join('') + K.prefix.slice(0, 3).map(pf).join('') + moreChip('More route names and codes', K.route.slice(1).concat(K.prefix.slice(3)).map(lw));
  const streets = K.street.slice(0, 4).map((w) => wd(w)).join('') + moreChip('More street words', K.street.slice(4).map(lw));
  const reads = [rr('Streets', streets), rr('Roads', roads), rr('Letters', letters), rr('Regions', regs)].join('');

  el.innerHTML = `<div class="kc-h"><div class="kc-flag" role="img" aria-label="Flag of ${esc(c.short)}">${c.flag}</div><span class="kc-name">${esc(c.short)}</span><span class="kc-dom">${esc(c.dom)}</span>
      <span class="pill" tabindex="0" data-ti="${ti(tp(dl, 'Calling code ' + c.call))}">${carSvg(c.side === 'L')}${c.side === 'L' ? 'Left' : 'Right'}</span><span class="sp"></span>
      <button class="ib" data-a="prev" aria-label="Previous country" title="Previous">‹</button><button class="ib" data-a="next" aria-label="Next country" title="Next">›</button><button class="ib" data-a="close" aria-label="Close Key Card" title="Close (Esc)">✕</button></div>
    <div class="kc-tabs" role="tablist" aria-label="Key Card sections"><button class="kc-tab" role="tab" data-tab="clues" id="kct-c" aria-controls="kcp-c">Clues</button><button class="kc-tab" role="tab" data-tab="routes" id="kct-r" aria-controls="kcp-r">Routes</button></div>
    <div class="kc-r" id="kcp-r" role="tabpanel" aria-labelledby="kct-r" hidden>${routePane(c)}</div>
    <div class="kc-b" id="kcp-c" role="tabpanel" aria-labelledby="kct-c"><div class="g2">${plate}${lang}</div><div class="g3">${pole}${boll}${road}</div>
      ${reads ? `<div class="rd">${reads}</div>` : ''}
      <div class="meta"><span class="chip" tabindex="0" data-ti="${ti(tp('Calling code', 'Phone numbers from abroad start with ' + c.call + '.'))}">☎ ${esc(c.call)}</span>${camChip}</div>${houses}${twins}</div>`;
  el.scrollTop = 0;
  { // spare room? add a row of sign words (station, exit, diversion) only if it fits without scrolling
    const body = el.querySelector('.kc-b'), rd = el.querySelector('.rd'), sg = K.sign.slice(0, 4);
    if (rd && sg.length && !isMobile()) {
      const row = document.createElement('div'); row.className = 'rr';
      row.innerHTML = `<span class="rk">Signs</span><div class="chs">${sg.map((w) => wd(w)).join('')}</div>`;
      rd.appendChild(row);
      if (body.scrollHeight > body.clientHeight + 1) row.remove();
    } else if (rd && sg.length) rd.insertAdjacentHTML('beforeend', rr('Signs', sg.map((w) => wd(w)).join('')));
  }
  const setTab = (t) => {
    CARD_TAB = t;
    el.querySelectorAll('.kc-tab').forEach((b) => { const on = b.dataset.tab === t; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    el.querySelector('.kc-b').hidden = t !== 'clues'; el.querySelector('.kc-r').hidden = t !== 'routes'; hideTip();
  };
  el.querySelectorAll('.kc-tab').forEach((b) => {
    b.onclick = () => setTab(b.dataset.tab);
    b.onkeydown = (ev) => { if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { ev.preventDefault(); const t = CARD_TAB === 'clues' ? 'routes' : 'clues'; setTab(t); el.querySelector(`.kc-tab[data-tab="${t}"]`).focus(); } };
  });
  setTab(CARD_TAB);
  el.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => { hideTip(); select(b.dataset.go); }; });
  el.querySelectorAll('[data-q]').forEach((b) => { b.onclick = () => { hideTip(); if (searchSet) searchSet(b.dataset.q); }; });
  el.querySelectorAll('[data-a]').forEach((b) => {
    b.onclick = () => {
      const a = b.dataset.a; hideTip();
      if (a === 'close') { select(null); return; }
      const i = C.indexOf(BY.get(S.sel));
      select(C[(i + (a === 'next' ? 1 : -1) + C.length) % C.length].n);
    };
  });
}
(() => { // one delegated tooltip handler for the whole card
  const card = $('#card');
  const tipEl = (e) => e.target.closest && e.target.closest('[data-ti]');
  card.addEventListener('pointerdown', (e) => { lastPT = e.pointerType; });
  card.addEventListener('pointerover', (e) => { if (e.pointerType !== 'mouse') return; const t = tipEl(e); if (t) showTipFor(t, TIPS[t.dataset.ti]); });
  card.addEventListener('pointerout', (e) => { if (e.pointerType !== 'mouse') return; const t = tipEl(e); if (t && !t.contains(e.relatedTarget)) hideTip(); });
  card.addEventListener('focusin', (e) => { const t = tipEl(e); if (t) showTipFor(t, TIPS[t.dataset.ti]); });
  card.addEventListener('focusout', hideTip);
  card.addEventListener('scroll', hideTip, true);
  card.addEventListener('click', (e) => { // touch: tap a tile to read its tooltip, tap again to dismiss
    const t = tipEl(e); if (!t || lastPT === 'mouse' || t.tagName === 'BUTTON') return;
    if (!tip.hidden && tip.dataset.for === t.dataset.ti) hideTip(); else { showTipFor(t, TIPS[t.dataset.ti]); tip.dataset.for = t.dataset.ti; }
  });
})();

/* ---------- wiring ---------- */
buildChrome();
mountSearch();
setTimeout(loadPlaces, 400);
const about = $('#about');
document.addEventListener('click', (e) => {
  const t = e.target.closest('button');
  if (!about.hidden && !e.target.closest('#about') && !(t && t.id === 'info')) { about.hidden = true; $('#info').setAttribute('aria-expanded', 'false'); }
  if (!t) return;
  if (t.classList.contains('tab')) { setView(t.dataset.v); return; }
  if (t.dataset.d) { S.drive = S.drive === t.dataset.d ? null : t.dataset.d; refresh(); return; }
  if (t.id === 'info') { about.hidden = !about.hidden; t.setAttribute('aria-expanded', String(!about.hidden)); }
});
window.addEventListener('hashchange', () => { const v = location.hash.slice(1); if (v && v !== S.view) setView(v); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (!about.hidden) { about.hidden = true; return; } if (S.sel) select(null); return; }
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target.tagName || ''))) return;
  if (e.key === '/' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); $('#sq').focus(); return; }
  if (S.sel && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.target.closest('svg')) {
    const i = C.indexOf(BY.get(S.sel)); select(C[(i + (e.key === 'ArrowRight' ? 1 : -1) + C.length) % C.length].n);
  }
});
const initial = location.hash.slice(1);
if (VIEWS.some((v) => v[0] === initial)) S.view = initial;
mountView();
window.__app = {S, C, select, setView, GEO}; // handy for debugging
})();

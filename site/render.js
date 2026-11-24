// Drawing helpers ported from the project's Country Key Card:
//  - geoFlag(country)         -> simplified 2D flag SVG string
//  - geo2d.svg(kind, spec)    -> pole / bollard / road / plate SVG string drawn from "key=value; key=value" specs
// Physical colours (white post, red reflector) are literal on purpose: every drawing sits on its own fixed sky/ground tile.
(function () {
  const W = 60, H = 40;
  const r = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
  const hs = (cols, ratios) => { const t = (ratios || cols.map(() => 1)).reduce((a, b) => a + b, 0); let y = 0; return cols.map((c, i) => { const h = H * (ratios ? ratios[i] : 1) / t; const s = r(0, y, W, h + 0.3, c); y += h; return s; }).join(''); };
  const vs = (cols) => cols.map((c, i) => r(i * W / cols.length, 0, W / cols.length + 0.3, H, c)).join('');
  const nordic = (bg, cross, inner) => r(0, 0, W, H, bg) + r(16, 0, 8, H, cross) + r(0, 16, W, 8, cross) + (inner ? r(18, 0, 4, H, inner) + r(0, 18, W, 4, inner) : '');
  const shield = (x, y, s, fill, stroke) => `<path d="M${x} ${y} h${s} v${s * 0.7} q0 ${s * 0.5} -${s / 2} ${s * 0.7} q-${s / 2} -${s * 0.2} -${s / 2} -${s * 0.7} z" fill="${fill}" stroke="${stroke || '#7a5c00'}" stroke-width="0.6"/>`;
  const star = (cx, cy, R, f) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? R * 0.4 : R; p += `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)} `; } return `<polygon points="${p}" fill="${f}"/>`; };
  const RED = '#d52b1e', BLUE = '#0039a6', WHITE = '#ffffff', GOLD = '#f5c400', GREEN = '#009a44', BLACK = '#000000';
  const F = {
    'Åland Islands': () => nordic('#0064ad', '#ffd300', '#da0e15'),
    'Albania': () => r(0, 0, W, H, '#e41e20') + `<path d="M30 9 l-4 4 -9 -3 4 6 -6 1 7 3 -4 4 8 -1 1 6 3 -4 3 4 1 -6 8 1 -4 -4 7 -3 -6 -1 4 -6 -9 3 z" fill="${BLACK}"/>`,
    'Andorra': () => vs(['#10069f', '#fedd00', '#d50032']) + shield(26, 13, 8, '#c7a000'),
    'Austria': () => hs(['#ed2939', WHITE, '#ed2939']),
    'Belarus': () => hs(['#c8313e', '#4aa657'], [2, 1]) + r(0, 0, 7, H, WHITE) + Array.from({length: 8}, (_, i) => `<polygon points="3.5,${i * 5 + 0.5} 6,${i * 5 + 2.5} 3.5,${i * 5 + 4.5} 1,${i * 5 + 2.5}" fill="#c8313e"/>`).join(''),
    'Belgium': () => vs([BLACK, '#fdda24', '#ef3340']),
    'Bosnia and Herzegovina': () => r(0, 0, W, H, '#002395') + `<polygon points="16,0 44,0 44,40" fill="#fecb00"/>` + [0, 1, 2, 3, 4, 5, 6].map((i) => star(13 + i * 4.6, 2 + i * 5.6, 2.3, WHITE)).join(''),
    'Bulgaria': () => hs([WHITE, '#00966e', '#d62612']),
    'Croatia': () => hs(['#ff0000', WHITE, '#171796']) + `<g transform="translate(24.5 10)"><path d="M0 0 h11 v8 q0 6 -5.5 8 q-5.5 -2 -5.5 -8 z" fill="${WHITE}" stroke="#ff0000" stroke-width="0.6"/>${[0, 1, 2, 3, 4].map((y) => [0, 1, 2, 3, 4].map((x) => (x + y) % 2 ? '' : `<rect x="${x * 2.2}" y="${y * 2.6}" width="2.2" height="2.6" fill="#ff0000"/>`).join('')).join('')}</g>`,
    'Cyprus': () => r(0, 0, W, H, WHITE) + `<path d="M17 18 q8 -6 20 -5 q6 0 9 -3 q-1 5 -7 7 q-6 3 -14 4 q-6 1 -8 -3 z" fill="#d57800"/><path d="M22 28 q8 5 16 0" stroke="#4e5b31" stroke-width="2" fill="none"/>`,
    'Czechia (Czech Republic)': () => hs([WHITE, '#d7141a']) + `<polygon points="0,0 30,20 0,40" fill="#11457e"/>`,
    'Denmark': () => nordic('#c8102e', WHITE),
    'Estonia': () => hs(['#0072ce', BLACK, WHITE]),
    'Faroe Islands': () => nordic(WHITE, '#005eb8', '#ef303e'),
    'Finland': () => nordic(WHITE, '#002f6c'),
    'France': () => vs(['#002654', WHITE, '#ce1126']),
    'Germany': () => hs([BLACK, '#dd0000', '#ffce00']),
    'Gibraltar': () => hs([WHITE, '#da000c'], [2, 1]) + `<g fill="#da000c"><rect x="22" y="11" width="16" height="13"/><rect x="20" y="8" width="5" height="6"/><rect x="27.5" y="6" width="5" height="8"/><rect x="35" y="8" width="5" height="6"/></g><rect x="28.5" y="18" width="3" height="6" fill="${BLACK}"/>`,
    'Greece': () => Array.from({length: 9}, (_, i) => r(0, i * H / 9, W, H / 9 + 0.2, i % 2 ? WHITE : '#0d5eaf')).join('') + r(0, 0, 22.2, 22.2, '#0d5eaf') + r(8.9, 0, 4.4, 22.2, WHITE) + r(0, 8.9, 22.2, 4.4, WHITE),
    'Hungary': () => hs(['#cd2a3e', WHITE, '#436f4d']),
    'Iceland': () => nordic('#02529c', WHITE, '#dc1e35'),
    'Ireland': () => vs(['#169b62', WHITE, '#ff883e']),
    'Isle of Man': () => r(0, 0, W, H, '#cf142b') + `<g stroke="${WHITE}" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M30 20 l0 -11 l5 -2"/><path d="M30 20 l9.5 5.5 l0 5.5"/><path d="M30 20 l-9.5 5.5 l-5 -3"/></g>`,
    'Italy': () => vs(['#009246', WHITE, '#ce2b37']),
    'Jersey': () => r(0, 0, W, H, WHITE) + `<path d="M0 0 L60 40 M60 0 L0 40" stroke="#df112d" stroke-width="6"/>` + shield(26.5, 3, 7, '#df112d', '#f9dd16'),
    'Kosovo': () => r(0, 0, W, H, '#244aa5') + `<path d="M23 16 l6 -3 6 2 4 5 -2 6 -6 3 -6 -1 -3 -5 z" fill="#d0a650"/>` + [0, 1, 2, 3, 4, 5].map((i) => star(19 + i * 4.4, 10 - Math.sin((i + 0.5) / 6 * Math.PI) * 3, 1.7, WHITE)).join(''),
    'Latvia': () => hs(['#9e3039', WHITE, '#9e3039'], [2, 1, 2]),
    'Liechtenstein': () => hs(['#002b7f', '#ce1126']) + `<path d="M10 11 l2 -5 2 3 2 -4 2 4 2 -3 2 5 z" fill="#ffd83d" stroke="${BLACK}" stroke-width="0.3"/>`,
    'Lithuania': () => hs(['#fdb913', '#006a44', '#c1272d']),
    'Luxembourg': () => hs(['#ed2939', WHITE, '#00a1de']),
    'Malta': () => vs([WHITE, '#cf142b']) + `<path d="M5 4 h5 v-1 h3 v3 h-1 v4 h1 v3 h-3 v-1 h-5 v1 h-3 v-3 h1 v-4 h-1 v-3 h3 z" fill="#a0a0a0" stroke="#cf142b" stroke-width="0.4"/>`,
    'Monaco': () => hs(['#ce1126', WHITE]),
    'Montenegro': () => r(0, 0, W, H, '#c40308') + `<rect x="1.5" y="1.5" width="57" height="37" fill="none" stroke="#d3ae3b" stroke-width="2"/><path d="M30 11 l-3 3 -7 -2 3 5 -4 1 6 2 -2 4 6 -1 1 5 1 -5 6 1 -2 -4 6 -2 -4 -1 3 -5 -7 2 z" fill="#d3ae3b"/>`,
    'Netherlands': () => hs(['#ae1c28', WHITE, '#21468b']),
    'North Macedonia': () => r(0, 0, W, H, '#d20000') + `<g stroke="#ffe600" stroke-width="4"><line x1="30" y1="20" x2="0" y2="0"/><line x1="30" y1="20" x2="60" y2="0"/><line x1="30" y1="20" x2="0" y2="40"/><line x1="30" y1="20" x2="60" y2="40"/><line x1="30" y1="20" x2="30" y2="0"/><line x1="30" y1="20" x2="30" y2="40"/><line x1="30" y1="20" x2="0" y2="20"/><line x1="30" y1="20" x2="60" y2="20"/></g><circle cx="30" cy="20" r="6" fill="#d20000"/><circle cx="30" cy="20" r="4.6" fill="#ffe600"/>`,
    'Norway': () => nordic('#ba0c2f', WHITE, '#00205b'),
    'Poland': () => hs([WHITE, '#dc143c']),
    'Portugal': () => r(0, 0, 24, H, '#006600') + r(24, 0, 36, H, '#ff0000') + `<circle cx="24" cy="20" r="8" fill="none" stroke="#ffcc00" stroke-width="2"/>` + shield(20.5, 15, 7, WHITE, '#ff0000'),
    'Romania': () => vs(['#002b7f', '#fcd116', '#ce1126']),
    'Russia': () => hs([WHITE, '#0039a6', '#d52b1e']),
    'San Marino': () => hs([WHITE, '#5eb6e4']) + shield(26.5, 13, 7, '#5eb6e4', '#c6a000'),
    'Serbia': () => hs(['#c6363c', '#0c4076', WHITE]) + `<g transform="translate(13 9)">` + shield(0, 2, 9, '#c6363c', '#d4a33a') + `<path d="M2 1 h5 l-1 -2 h-3 z" fill="#d4a33a"/></g>`,
    'Slovakia': () => hs([WHITE, '#0b4ea2', '#ee1c25']) + `<g transform="translate(12 9)"><path d="M0 0 h13 v10 q0 7 -6.5 9 q-6.5 -2 -6.5 -9 z" fill="#ee1c25" stroke="${WHITE}" stroke-width="1"/><path d="M6 3 v11 M3.5 6 h5 M3 9 h6" stroke="${WHITE}" stroke-width="1.4"/><path d="M1.5 15 q2.5 -3 5 0 q2.5 -3 5 0 q-2 3 -5 3.5 q-3 -0.5 -5 -3.5" fill="#0b4ea2"/></g>`,
    'Slovenia': () => hs([WHITE, '#005da4', '#ed1c24']) + `<g transform="translate(11 6)"><path d="M0 0 h10 v7 q0 5 -5 7 q-5 -2 -5 -7 z" fill="#005da4" stroke="#ed1c24" stroke-width="0.8"/><path d="M1 9 l2 -3 2 -3 2 3 2 3 z" fill="${WHITE}"/></g>`,
    'Spain': () => hs(['#aa151b', '#f1bf00', '#aa151b'], [1, 2, 1]) + shield(14, 14, 7, '#aa151b', '#8a6a00'),
    'Svalbard': () => nordic('#ba0c2f', WHITE, '#00205b'),
    'Sweden': () => nordic('#006aa7', '#fecc02'),
    'Switzerland': () => r(10, 0, 40, 40, '#da291c') + r(26.5, 8, 7, 24, WHITE) + r(18, 16.5, 24, 7, WHITE),
    'Türkiye (Turkey)': () => r(0, 0, W, H, '#e30a17') + `<circle cx="22" cy="20" r="10" fill="${WHITE}"/><circle cx="24.5" cy="20" r="8" fill="#e30a17"/>` + star(36, 20, 4.5, WHITE),
    'Ukraine': () => hs(['#0057b7', '#ffd700']),
    'United Kingdom': () => r(0, 0, W, H, '#012169') + `<path d="M0 0 L60 40 M60 0 L0 40" stroke="${WHITE}" stroke-width="8"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" stroke-width="2.6"/><path d="M30 0 V40 M0 20 H60" stroke="${WHITE}" stroke-width="12"/><path d="M30 0 V40 M0 20 H60" stroke="#c8102e" stroke-width="7"/>`
  };
  window.geoFlag = (country) => {
    const f = F[country];
    if (!f) return (window.EXTRA_FLAGS && window.EXTRA_FLAGS[country]) || '';
    const sq = country === 'Switzerland';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${sq ? '10 0 40 40' : '0 0 60 40'}">${f()}</svg>`;
  };
})();

(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const C = {
    sky: '#dfe8ef', ground: '#b7c2a5', asphalt: '#5b5f63', line: '#f5f5f2', yellow: '#f2c230',
    wood: '#8a6646', concrete: '#a8adb2', steel: '#7c848a', black: '#2a2b2d', outline: '#5f666d',
    red: '#d6322b', orange: '#f08a1c', blue: '#2a63c9', green: '#2f9a55', white: '#fbfbf9', grey: '#8d949a'
  };
  const parse = (s) => {
    const o = {};
    String(s || '').split(';').forEach((p) => {
      const i = p.indexOf('=');
      if (i > 0) o[p.slice(0, i).trim()] = p.slice(i + 1).trim();
    });
    return o;
  };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const r = (x, y, w, h, fill, extra) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra || ''}/>`;
  const scene = (w, h, gy) => r(0, 0, w, gy, C.sky) + r(0, gy, w, h - gy, C.ground);

  function pole(spec) {
    const s = parse(spec);
    if (!Object.keys(s).length) return '';
    const W = 120, H = 200, G = 186;
    const col = s.paint === 'green' ? '#4f7a4a' : ({wood: C.wood, concrete: C.concrete, steel: C.steel, black: C.black}[s.mat] || C.concrete);
    let out = scene(W, H, G);
    const form = s.form || 'round';
    const pw = s.thin === 'yes' ? 9 : ({round: 14, rect: 18, square: 18, octagonal: 16, stobie: 18, segments: 16}[form] || 16);
    const px = 60 - pw / 2, top = 30;
    out += `<path d="M0 46 Q30 52 60 44 T120 46" stroke="#33363a" stroke-width="1" fill="none"/><path d="M0 40 Q30 46 60 38 T120 40" stroke="#33363a" stroke-width="1" fill="none"/>`;
    if (s.cables === 'yes') {
      out += `<path d="M0 64 Q30 78 60 66 T120 70" stroke="#1f2124" stroke-width="2" fill="none"/><path d="M0 70 Q35 86 60 72 T120 78" stroke="#1f2124" stroke-width="2.5" fill="none"/><path d="M0 75 Q25 90 60 77 T120 84" stroke="#1f2124" stroke-width="1.5" fill="none"/>`;
    }
    if (s.stay === 'yes') out += `<line x1="60" y1="52" x2="112" y2="${G}" stroke="#4a4d50" stroke-width="1.2"/>`;
    if (s.strut === 'yes') out += `<polygon points="62,104 67,104 100,${G} 93,${G}" fill="${col}" stroke="${C.outline}" stroke-width="0.6"/>`;
    if (form === 'H') {
      out += r(36, top + 8, 12, G - top - 8, col, `rx="5"`) + r(72, top + 8, 12, G - top - 8, col, `rx="5"`);
      out += r(30, top + 10, 60, 5, '#6b4f36') + r(38, 110, 44, 4, '#6b4f36');
    } else if (form === 'segments') {
      out += r(51, 120, 18, G - 120, col) + r(53, 70, 14, 50, col) + r(55, top, 10, 40, col);
      out += r(50, 118, 20, 4, '#5d6368') + r(52, 68, 16, 4, '#5d6368');
    } else if (form === 'stobie') {
      out += r(px, top, pw, G - top, '#b9b3a7') + r(px, top, 3, G - top, C.steel) + r(px + pw - 3, top, 3, G - top, C.steel);
    } else {
      const rx = form === 'round' ? 6 : 1;
      out += `<polygon points="${px + 1},${top} ${px + pw - 1},${top} ${px + pw + 1},${G} ${px - 1},${G}" fill="${col}" stroke="${C.outline}" stroke-width="0.6" stroke-linejoin="round" rx="${rx}"/>`;
      if (form === 'octagonal') out += `<line x1="${px + pw / 3}" y1="${top}" x2="${px + pw / 3 - 0.5}" y2="${G}" stroke="#8c9196" stroke-width="0.8"/><line x1="${px + 2 * pw / 3}" y1="${top}" x2="${px + 2 * pw / 3 + 0.5}" y2="${G}" stroke="#8c9196" stroke-width="0.8"/>`;
      if (form === 'round' && s.mat !== 'black') out += `<line x1="${px + pw * 0.3}" y1="${top}" x2="${px + pw * 0.3}" y2="${G}" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2"/>`;
    }
    const hole = '#3d4246';
    const hx = 60;
    if (s.holes === 'full' || s.holes === 'above-base') {
      const end = s.holes === 'full' ? G - 4 : 150;
      for (let y = 48; y < end; y += 9) out += r(hx - 3, y, 6, 6, hole);
    } else if (s.holes === 'slots') {
      for (let y = 52; y < 150; y += 34) out += r(hx - 2.5, y, 5, 28, hole, 'rx="1.5"');
    } else if (s.holes === 'steps') {
      for (let y = 50; y < G - 10; y += 12) { out += r(px + 1, y, 5, 5, hole); out += r(px + pw - 6, y + 6, 5, 5, hole); }
    } else if (s.holes === 'ladder') {
      for (let y = 48; y < G - 8; y += 7) out += r(hx - 4, y, 8, 3, hole);
    } else if (s.holes === 'waffle') {
      for (let y = 46; y < G - 8; y += 7) { out += r(hx - 6, y, 4, 4, hole); out += r(hx + 2, y, 4, 4, hole); }
    } else if (s.holes === 'slits') { // narrow through-holes (Vietnam)
      for (let y = 60; y < G - 8; y += 16) out += r(hx - 1.2, y, 2.4, 11, hole);
    } else if (s.holes === 'slots-low') { // ladder slots from the base to mid-height (Brazil, Paraguay)
      for (let y = 104; y < G - 6; y += 9) out += r(hx - 4, y, 8, 5, hole);
    } else if (s.holes === 'pin-upper') { // pin-holes on the upper half only (Sri Lanka)
      for (let y = 44; y < 108; y += 7) out += r(hx - 1.5, y, 3, 3, hole);
    } else if (s.holes === 'steps-high') { // short ladder high up (Spain)
      for (let y = 46; y < 104; y += 9) out += r(hx - 4, y, 8, 4, hole);
    } else if (s.holes === 'indent') { // long groove down one face (New Zealand)
      out += r(hx - 2, 40, 4, G - 44, '#7f868c');
    } else if (s.holes === 'square-holes') {
      for (let y = 50; y < 165; y += 10) out += r(hx - 2.5, y, 5, 5, hole);
    }
    if (s.base === 'bw' || s.base === 'by' || s.base === 'pinkgreen') { // banded painted base
      const [c1, c2] = {bw: [C.black, C.white], by: [C.black, C.yellow], pinkgreen: ['#e46fa8', C.green]}[s.base];
      for (let i = 0, y = 136; y < G; y += 10, i++) out += r(px - 0.5, y, pw + 1, Math.min(10, G - y), i % 2 ? c2 : c1);
    }
    const baseCol = {white: C.white, red: C.red, black: C.black, yellow: C.yellow, green: C.green, brown: '#6b4a32'}[s.base]; // a painted base (white Russia/Curaçao, red Guatemala, black Peru, yellow Santo Domingo)
    if (baseCol) out += `<polygon points="${px - 0.5},150 ${px + pw + 0.5},150 ${px + pw + 1},${G} ${px - 1},${G}" fill="${baseCol}" stroke="${C.outline}" stroke-width="0.6"/>`;
    const stripe = (y1, y2, x, w) => {
      let g = `<clipPath id="CLIP"><rect x="${x}" y="${y1}" width="${w}" height="${y2 - y1}"/></clipPath><g clip-path="url(#CLIP)">` + r(x, y1, w, y2 - y1, s.scol === 'orange' ? C.orange : C.yellow);
      for (let y = y1 - w; y < y2 + w; y += 10) g += `<polygon points="${x},${y} ${x + w},${y - w * 0.7} ${x + w},${y - w * 0.7 + 5} ${x},${y + 5}" fill="${C.black}"/>`;
      return g + '</g>';
    };
    if (s.stripes === 'diag-full') out += stripe(104, G, px - 1, pw + 2);
    if (s.stripes === 'diag-high') out += stripe(96, 158, px - 1, pw + 2);
    if (s.stripes === 'vertical-plate') out += stripe(112, 160, 60 - 4, 8);
    if (s.stripes === 'hbands') for (let i = 0, y = 112; y < 168; y += 14, i++) out += r(px - 0.5, y, pw + 1, 14, i % 2 ? C.black : (s.scol === 'orange' ? C.orange : C.yellow));
    if (s.bolts === 'yes') for (let y = 60; y < 150; y += 14) out += `<line x1="${y % 28 ? px - 5 : px + pw}" y1="${y}" x2="${y % 28 ? px : px + pw + 5}" y2="${y}" stroke="#3a3d40" stroke-width="2"/>`;
    const tags = String(s.tag || '').split(',');
    const has = (k) => tags.includes(k);
    if (s.rods === 'yes') for (let y = 70; y < 170; y += 13) { const L = (y / 13) % 2 < 1; out += `<line x1="${L ? px - 7 : px + pw}" y1="${y}" x2="${L ? px : px + pw + 7}" y2="${y}" stroke="#55595d" stroke-width="1.4"/><line x1="${L ? px - 7 : px + pw + 7}" y1="${y}" x2="${L ? px : px + pw}" y2="${y + 5}" stroke="#55595d" stroke-width="0.8"/>`; }
    if (has('circle')) out += `<circle cx="60" cy="118" r="4.5" fill="${C.white}" stroke="#555" stroke-width="0.5"/><text x="60" y="120" font-size="4.5" text-anchor="middle" font-family="Arial">24</text>`;
    if (has('danger')) out += r(54, 132, 12, 14, C.yellow, `stroke="#222" stroke-width="0.6"`) + `<polygon points="60,134 64.5,141 55.5,141" fill="none" stroke="#111" stroke-width="0.8"/>`;
    if (has('danger-black')) out += r(54, 132, 12, 12, '#111') + `<polygon points="60,134 64.5,142 55.5,142" fill="${C.yellow}"/>`;
    if (has('white-num')) out += r(54, 112, 12, 9, C.white, `stroke="#777" stroke-width="0.4"`) + `<text x="60" y="119" font-size="6" text-anchor="middle" font-family="Arial" font-weight="700">541</text>`;
    if (has('yellow-text')) out += r(55.5, 104, 9, 26, C.yellow, `stroke="#333" stroke-width="0.4"`) + `<g fill="#111">${[0, 1, 2, 3].map((i) => r(58, 108 + i * 5.5, 4, 2.5, '#111')).join('')}</g>`;
    if (has('white-small')) out += r(55, 122, 10, 5, C.white, `stroke="#777" stroke-width="0.4"`);
    if (s.guard === 'silver') out += r(px - 2, 70, pw + 4, 16, '#c9ced3', `stroke="#8a9095" stroke-width="0.6"`);
    if (s.tag === 'yellow-rect') out += r(55, 132, 10, 7, C.yellow, `stroke="#3a3a3a" stroke-width="0.5"`);
    if (s.tag === 'yellow-diamond') out += `<polygon points="60,126 66,133 60,140 54,133" fill="${C.yellow}" stroke="#3a3a3a" stroke-width="0.5"/>`;
    if (s.tag === 'blue') out += r(55, 130, 10, 6, C.blue);
    if (s.tag === 'green') out += r(px, 74, pw, 8, C.green) + r(px, 82, pw, 3, C.white);
    if (s.tag === 'white') out += r(55, 120, 10, 14, C.white, `stroke="#999" stroke-width="0.4"`);
    const ins = (x, y) => `<rect x="${x - 1.5}" y="${y - 5}" width="3" height="5" fill="#e9e4d8" stroke="#6d6a62" stroke-width="0.4"/>`;
    if (s.cap === 'taper') out += `<polygon points="${px + 2},${top} ${px + pw - 2},${top} 60,${top - 16}" fill="#a9afb4" stroke="${C.outline}" stroke-width="0.5"/>`;
    if (s.cap === 'point') out += `<polygon points="${px + 1},${top} ${px + pw - 1},${top} 60,${top - 9}" fill="${col}" stroke="${C.outline}" stroke-width="0.5"/>`;
    if (s.top === 'raised-bar') { // bar held above the pole top on a short post (Oman)
      out += r(58.5, top - 16, 3, 16, '#6f767c') + r(32, top - 18, 56, 4, '#6f767c') + ins(36, top - 18) + ins(60, top - 18) + ins(84, top - 18);
    } else if (s.top === 'trapezoid') { // trapezoid frame on top (Vietnam)
      out += `<polygon points="40,${top + 4} 80,${top + 4} 72,${top + 18} 48,${top + 18}" fill="none" stroke="#6f767c" stroke-width="2.4"/>` + ins(42, top + 4) + ins(60, top + 4) + ins(78, top + 4);
    } else if (s.top === 'braced') { // crossbar, middle insulator raised, two diagonal braces (Qatar)
      out += r(32, top + 8, 56, 4, '#6f767c') + `<line x1="40" y1="${top + 12}" x2="58" y2="${top + 30}" stroke="#6f767c" stroke-width="1.8"/><line x1="80" y1="${top + 12}" x2="62" y2="${top + 30}" stroke="#6f767c" stroke-width="1.8"/>` + ins(36, top + 8) + ins(60, top - 2) + ins(84, top + 8) + r(59, top - 2, 2, 10, '#6f767c');
    } else if (s.top === 'lamp') { // tall lamp post with an arm over the road
      out += `<path d="M60 ${top} Q60 ${top - 14} 78 ${top - 14} L100 ${top - 14}" stroke="${col}" stroke-width="3" fill="none"/>` + r(94, top - 14, 12, 5, '#3d4246', 'rx="2"');
    } else if (s.top === 'trident') {
      out += `<line x1="60" y1="${top}" x2="60" y2="${top - 14}" stroke="#4e5458" stroke-width="2.5"/><line x1="60" y1="${top + 2}" x2="40" y2="${top - 10}" stroke="#4e5458" stroke-width="2.5"/><line x1="60" y1="${top + 2}" x2="80" y2="${top - 10}" stroke="#4e5458" stroke-width="2.5"/>` + ins(60, top - 14) + ins(40, top - 10) + ins(80, top - 10);
    } else if (s.top === 'crossarm' || s.top === 'xbrace') {
      if (form !== 'H') out += r(28, top + 6, 64, 5, s.mat === 'wood' ? '#6b4f36' : '#6f767c');
      out += s.ins === '3' ? ins(34, top + 6) + ins(60, top + 6) + ins(86, top + 6) : ins(32, top + 6) + ins(50, top + 6) + ins(70, top + 6) + ins(88, top + 6);
      if (s.top === 'xbrace') out += `<line x1="38" y1="${top + 11}" x2="58" y2="${top + 30}" stroke="#55595d" stroke-width="1.6"/><line x1="82" y1="${top + 11}" x2="62" y2="${top + 30}" stroke="#55595d" stroke-width="1.6"/><line x1="44" y1="${top + 24}" x2="76" y2="${top + 14}" stroke="#55595d" stroke-width="1.6"/><line x1="76" y1="${top + 24}" x2="44" y2="${top + 14}" stroke="#55595d" stroke-width="1.6"/>`;
    }
    if (s.transformer === 'yes') out += r(64, 58, 14, 24, '#9aa0a5', `rx="3" stroke="${C.outline}" stroke-width="0.6"`) + r(66, 55, 10, 4, '#7b8186');
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">${out}</svg>`;
  }

  // ---- bollards: front view, plus a back view when the spec has b=... ----
  // Spec keys: body, top (flat|angled|round|pointed|dome|disc), w (thin|wide) or thin=yes/thick=yes,
  // cyl=yes (round cross-section), curve=yes, short=yes, cap (black|black-third|black-band|red-third|red-fifth|yellow|green),
  // band (black-diag|black-straight|black-2band|stripes-bw|stripes-by|stripes-rw|red-2ring|red-ring|red-wrap|red-stripe|orange-stripe|grey-2band),
  // foot=black, num=yes, f / b = front / back reflector "kind:colour" (rect|wide|thin|2dot|2h|2v|circle|square|tilt|side|none).
  // Legacy refl=... still draws the front when f is absent.
  const BODY = () => ({white: C.white, black: C.black, grey: '#b5bac0', yellow: '#f2c230', navy: '#2b3f6b', stone: '#e8e4da', orange: C.orange});
  const RC = () => ({white: '#f4f6f8', grey: '#b9c0c7', silver: '#c9ced4', red: C.red, darkred: '#9c1f26', orange: C.orange, yellow: '#f5c518', blue: C.blue, green: C.green, black: C.black});
  function post(s, cx, side) {
    const G = 186;
    const w = (s.w === 'thin' || s.thin === 'yes') ? 18 : (s.w === 'wide' || s.thick === 'yes') ? 34 : 26;
    const x = cx - w / 2, t = s.short === 'yes' ? 96 : 52;
    const body = BODY()[s.body] || C.white;
    const back = side === 'b';
    const angled = s.top === 'angled';
    const tl = angled && back ? t + 11 : t, tr = angled && !back ? t + 11 : t;
    let shape;
    if (s.top === 'round' || s.top === 'dome') {
      const ry = s.top === 'round' ? w / 2 : w / 4;
      shape = `M${x} ${G} L${x} ${t + ry} A${w / 2} ${ry} 0 0 1 ${x + w} ${t + ry} L${x + w} ${G} Z`;
    } else if (s.top === 'pointed') shape = `M${x} ${G} L${x} ${t + 12} L${cx} ${t - 4} L${x + w} ${t + 12} L${x + w} ${G} Z`;
    else shape = `M${x} ${G} L${x} ${tl} L${x + w} ${tr} L${x + w} ${G} Z`;
    const id = 'CLIP' + side;
    let o = `<path d="${shape}" fill="${body}" stroke="${C.outline}" stroke-width="0.8"/><clipPath id="${id}"><path d="${shape}"/></clipPath><g clip-path="url(#${id})">`;
    const R = (xx, y, ww, hh, f, ex) => r(xx, y, ww, hh, f, ex);
    const top = Math.max(tl, tr);
    // caps
    let capB = null; // [y1,y2] of a dark area that holds the reflector
    if (s.cap === 'black' || s.cap === 'black-third') { const h = s.cap === 'black-third' ? (G - t) / 3 : 30; o += R(x - 1, t - 6, w + 2, h + 6 + (angled ? 11 : 0), C.black); capB = [t + (angled ? 11 : 0), t + h + (angled ? 11 : 0)]; }
    if (s.cap === 'black-band') { o += R(x - 1, t + 8, w + 2, 30, C.black); capB = [t + 8, t + 38]; }
    if (s.cap === 'red-third') o += R(x - 1, t - 6, w + 2, (G - t) / 3 + 6, C.red);
    if (s.cap === 'red-fifth') o += R(x - 1, t - 6, w + 2, (G - t) / 5 + 6, C.red);
    if (s.cap === 'yellow') o += R(x - 1, t - 6, w + 2, 22, '#f2c230');
    if (s.cap === 'green') o += R(x - 1, t - 6, w + 2, 12, C.green);
    // bands
    let bandC = null;
    if (s.band === 'black-diag') {
      const a = back ? -1 : 1, y0 = t + 6;
      const L = a > 0 ? 0 : 14, Rr = a > 0 ? 14 : 0; // parallel to a slanted top (high on the left at the front)
      o += `<polygon points="${x - 1},${y0 + L} ${x + w + 1},${y0 + Rr} ${x + w + 1},${y0 + Rr + 34} ${x - 1},${y0 + L + 34}" fill="${C.black}"/>`;
      bandC = y0 + 7 + 17;
    }
    if (s.band === 'black-straight') { o += R(x - 1, t + 14, w + 2, 30, C.black); bandC = t + 29; }
    if (s.band === 'black-2band') { o += R(x - 1, t + 8, w + 2, 7, C.black) + R(x - 1, t + 38, w + 2, 7, C.black); bandC = t + 26.5; }
    if (s.band === 'grey-2band') o += R(x - 1, t + 14, w + 2, 12, '#9ea4aa') + R(x - 1, t + 38, w + 2, 12, '#9ea4aa');
    if (/^stripes-/.test(s.band || '')) {
      const k = s.band.slice(8), dark = {bw: C.black, bwn: C.black, by: C.black, rw: C.red}[k], light = k === 'by' ? '#f2c230' : null;
      if (light) o += R(x - 1, t - 6, w + 2, G - t + 6, light);
      for (let y = t + 10; y < G; y += 36) o += R(x - 1, y, w + 2, k === 'bwn' ? 10 : 18, dark);
    }
    if (s.band === 'red-2ring') o += R(x - 1, t + 14, w + 2, 9, C.red) + R(x - 1, t + 30, w + 2, 9, C.red);
    if (s.band === 'red-ring') o += R(x - 1, t + 24, w + 2, 13, C.red);
    if (s.band === 'red-wrap') o += R(x - 1, t + 12, w + 2, 24, C.red);
    if (s.band === 'red-stripe') { o += R(x - 1, t + 16, w + 2, 30, C.red); bandC = t + 31; }
    if (s.band === 'orange-stripe') o += R(x - 1, top + 2, w + 2, 6, C.orange);
    if (s.foot === 'black') o += R(x - 1, 140, w + 2, G - 140, C.black);
    // reflector
    const spec = back ? s.b : s.f;
    const cy = bandC != null ? bandC : capB ? (capB[0] + capB[1]) / 2 : top + 26;
    if (spec) {
      const [kind, col0] = spec.split(':'); const col = RC()[col0] || RC().white;
      const rr = (xx, y, ww, hh, ex) => R(xx, y, ww, hh, col, `rx="1" stroke="#00000033" stroke-width="0.4"${ex ? ' ' + ex : ''}`);
      const cir = (xx, y, rad) => `<circle cx="${xx}" cy="${y}" r="${rad}" fill="${col}" stroke="#00000033" stroke-width="0.4"/>`;
      if (kind === 'rect') o += rr(cx - 3.5, cy - 9, 7, 18);
      if (kind === 'thin') o += rr(cx - 2, cy - 11, 4, 22);
      if (kind === 'wide') o += rr(x + w * 0.12, cy - 9, w * 0.76, 18);
      if (kind === 'square') o += rr(cx - 5, cy - 5, 10, 10);
      if (kind === '2dot') o += cir(cx, cy - 6, 3) + cir(cx, cy + 6, 3);
      if (kind === 'circle') o += cir(cx, cy, Math.min(7, w / 2 - 3));
      if (kind === '2h') o += rr(cx - 6, cy - 8, 12, 6) + rr(cx - 6, cy + 2, 12, 6);
      if (kind === '2v') o += rr(cx - 4, cy - 22, 8, 14) + rr(cx - 4, cy + 4, 8, 14);
      if (kind === 'tilt') o += `<g transform="rotate(-14 ${cx} ${cy})">${rr(cx - 3.5, cy - 10, 7, 20)}</g>`;
      if (kind === 'side') o += rr(x + 3, cy - 11, 4, 22);
    } else if (!back) o += legacyRefl(s, x, w, t, cx, cy, angled);
    if (s.num === 'yes' && !back) o += `<text x="${cx}" y="${cy + 40}" text-anchor="middle" font-size="12" font-family="Arial, sans-serif" font-weight="700" fill="${C.black}">${w < 20 ? '7' : '12'}</text>`;
    if (s.cyl === 'yes') o += R(x, t - 6, w * 0.22, G - t + 6, '#000', 'opacity="0.12"') + R(x + w * 0.78, t - 6, w * 0.22, G - t + 6, '#000', 'opacity="0.12"') + R(x + w * 0.3, t - 6, w * 0.1, G - t + 6, '#fff', 'opacity="0.3"');
    if (s.curve === 'yes') o += R(back ? x : x + w * 0.7, t - 6, w * 0.3, G - t + 6, '#000', 'opacity="0.1"');
    o += '</g>';
    if (s.cyl === 'yes' && s.top === 'flat') o += `<ellipse cx="${cx}" cy="${t}" rx="${w / 2}" ry="3" fill="${/black/.test(s.cap || '') ? '#3a3b3d' : '#e4e7e4'}" stroke="${C.outline}" stroke-width="0.8"/>`;
    if (angled) o += `<line x1="${x}" y1="${tl}" x2="${x + w}" y2="${tr}" stroke="${C.outline}" stroke-width="0.8"/>`;
    return o;
  }
  function legacyRefl(s, x, w, t, cx, cy0, angled) {
    const capH = s.cap === 'black-third' ? (186 - t) / 3 : 30;
    const cy = s.band === 'black-diag' ? cy0 : t + (angled ? 11 : 0) + capH / 2;
    const refl = s.refl; let o = '';
    if (refl === 'white-vert') o += r(cx - 3, cy - 10, 6, 20, C.white, 'rx="1"');
    if (refl === 'red-rect') o += r(cx - 4, cy - 7, 8, 14, C.red, 'rx="1"');
    if (refl === 'white-rect') o += r(cx - 3, cy - 9, 6, 18, C.white, 'rx="1"');
    if (refl === 'orange-rect') o += r(cx - 3, cy - 9, 6, 18, C.orange, 'rx="1"');
    if (refl === 'red-thin') o += r(cx - 2, cy - 9, 4, 18, C.red);
    if (refl === 'red-vert') o += r(cx - 3, cy - 11, 6, 22, C.red, 'rx="1"');
    if (refl === 'orange-2') o += r(cx - 7, cy - 8, 14, 6, C.orange) + r(cx - 7, cy + 2, 14, 6, C.orange);
    if (refl === 'yellow-rect') o += r(cx - 4, cy - 8, 8, 16, C.yellow, 'rx="1"');
    if (refl === 'blue-vert') o += r(cx - 2.5, cy - 11, 5, 22, C.blue) + r(cx - 2.5, cy - 4, 5, 6, C.white);
    if (refl === 'red-band') o += r(x - 1, t + 58, w + 2, 12, C.red);
    if (refl === 'red-ring') o += r(x - 1, t + 26, w + 2, 12, C.red);
    if (refl === 'red-2ring') o += r(x - 1, t + 18, w + 2, 9, C.red) + r(x - 1, t + 34, w + 2, 9, C.red);
    if (refl === 'red-wide') o += r(x + 4, t + 20, w - 8, 26, C.red, 'rx="2"');
    if (refl === 'red-wrap') o += r(x - 1, t + 14, w + 2, 22, C.red);
    if (refl === 'yellow-band') o += r(x - 1, t + capH + 6, w + 2, 8, C.orange);
    if (refl === 'yellow-red') o += r(x + 3, t + 10, w / 2 - 4, 22, C.yellow) + r(cx + 1, t + 10, w / 2 - 4, 22, C.red);
    if (s.foot === 'black') o += r(x - 1, 140, w + 2, 186 - 140, C.black);
    return o;
  }
  function bollard(spec) {
    const s = parse(spec);
    if (!Object.keys(s).length) return '';
    const H = 200, G = 186;
    if (s.top === 'disc') { // Japanese delineator: round reflector on a thin post
      const two = !!s.b, W = two ? 210 : 120;
      let out = scene(W, H, G);
      const stem = (cx) => s.band === 'stripes-by' ? r(cx - 3, 60, 6, G - 60, '#f2c230') + [0, 1, 2, 3, 4, 5].map((i) => `<polygon points="${cx - 3},${76 + i * 20} ${cx + 3},${70 + i * 20} ${cx + 3},${78 + i * 20} ${cx - 3},${84 + i * 20}" fill="${C.black}"/>`).join('') : r(cx - 2, 60, 4, G - 60, C.grey);
      const disc = (cx, col) => stem(cx) + `<circle cx="${cx}" cy="52" r="20" fill="${C.white}" stroke="${C.outline}" stroke-width="0.8"/><circle cx="${cx}" cy="52" r="15" fill="${col}"/>`;
      out += two ? disc(55, (RC()[(s.f || ':orange').split(':')[1]]) || C.orange) + disc(155, RC()[s.b.split(':')[1]] || C.white) + labels() : disc(60, C.orange);
      return `<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">${out}</svg>`;
    }
    if (!s.b) return `<svg viewBox="0 0 120 ${H}" xmlns="${NS}">${scene(120, H, G)}${post(s, 60, 'f')}</svg>`;
    return `<svg viewBox="0 0 210 ${H}" xmlns="${NS}">${scene(210, H, G)}${post(s, 55, 'f')}${post(s, 155, 'b')}${labels()}</svg>`;
  }
  const labels = () => `<g font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#3b4148" text-anchor="middle"><text x="55" y="22">FRONT</text><text x="155" y="22">BACK</text></g><line x1="105" y1="30" x2="105" y2="180" stroke="#8a949c" stroke-width="0.8" stroke-dasharray="3 3"/>`;

  function road(spec) {
    const s = parse(spec);
    if (!Object.keys(s).length) return '';
    const W = 200, H = 150, HZ = 40;
    let out = r(0, 0, W, HZ, C.sky) + r(0, HZ, W, H - HZ, C.ground);
    const col = (v) => (String(v).indexOf('yellow') === 0 ? C.yellow : C.line);
    if (s.center || s.edge) {
      out += `<polygon points="88,${HZ} 112,${HZ} 196,${H} 4,${H}" fill="${C.asphalt}"/>`;
      const edgeLine = (x1, x2, v) => {
        const dash = /dashed/.test(v) ? `stroke-dasharray="7 6"` : '';
        return `<line x1="${x1}" y1="${HZ}" x2="${x2}" y2="${H}" stroke="${col(v)}" stroke-width="2.4" ${dash}/>`;
      };
      if (s.edge) out += edgeLine(90, 16, s.edge) + edgeLine(110, 184, s.edge);
      if (s.center === 'yellow-double') {
        out += `<line x1="99" y1="${HZ}" x2="96.5" y2="${H}" stroke="${C.yellow}" stroke-width="2.2"/><line x1="101" y1="${HZ}" x2="103.5" y2="${H}" stroke="${C.yellow}" stroke-width="2.2"/>`;
      } else if (s.center === 'yellow-white') { // solid yellow beside white dashes (Argentina): overtaking from one side only
        out += `<line x1="98.8" y1="${HZ}" x2="96" y2="${H}" stroke="${C.yellow}" stroke-width="2.2"/><line x1="101.2" y1="${HZ}" x2="104" y2="${H}" stroke="${C.line}" stroke-width="2.2" stroke-dasharray="9 8"/>`;
      } else if (s.center === 'triple') { // two yellow lines with white dashes between (Uruguay)
        out += `<line x1="98.4" y1="${HZ}" x2="94" y2="${H}" stroke="${C.yellow}" stroke-width="2"/><line x1="100" y1="${HZ}" x2="100" y2="${H}" stroke="${C.line}" stroke-width="2" stroke-dasharray="9 8"/><line x1="101.6" y1="${HZ}" x2="106" y2="${H}" stroke="${C.yellow}" stroke-width="2"/>`;
      } else if (s.center) {
        out += `<line x1="100" y1="${HZ}" x2="100" y2="${H}" stroke="${col(s.center)}" stroke-width="2.6" stroke-dasharray="9 8"/>`;
      }
    } else {
      out += `<polygon points="0,${H - 30} ${W},${H - 30} ${W},${H} 0,${H}" fill="#9fa4a8"/>`;
    }
    if (s.warn) {
      out += r(163, 46, 3, 70, '#7c8287');
      const cx = 164.5, cy = 34;
      if (s.warn === 'diamond-yellow') out += `<polygon points="${cx},${cy - 18} ${cx + 18},${cy} ${cx},${cy + 18} ${cx - 18},${cy}" fill="${C.yellow}" stroke="${C.black}" stroke-width="2"/>`;
      else out += `<polygon points="${cx},${cy - 18} ${cx + 19},${cy + 14} ${cx - 19},${cy + 14}" fill="${s.warn === 'tri-yellow' ? C.yellow : C.white}" stroke="${C.red}" stroke-width="4" stroke-linejoin="round"/>`;
      out += `<text x="${cx}" y="${cy + (s.warn === 'diamond-yellow' ? 6 : 10)}" text-anchor="middle" font-size="16" font-weight="700" font-family="Arial, sans-serif" fill="${C.black}">!</text>`;
    }
    if (s.word) {
      const word = s.word;
      const fs = word.length > 14 ? 9 : word.length > 9 ? 11 : 13;
      const pw = Math.min(118, Math.max(56, word.length * fs * 0.62 + 16));
      out += r(14, 58, 3, 56, '#7c8287');
      out += r(6, 40, pw, 22, C.white, `rx="3" stroke="#3c4044" stroke-width="1.5"`);
      out += `<text x="${6 + pw / 2}" y="${55}" text-anchor="middle" font-size="${fs}" font-weight="700" font-family="Arial, 'Noto Sans', sans-serif" fill="#1f2326">${esc(word)}</text>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">${out}</svg>`;
  }

  function plate(spec) {
    const s = parse(spec);
    if (!Object.keys(s).length) return '';
    const short = s.size === 'short', na = s.size === 'na';
    const PW = short ? 124 : na ? 150 : 224, PH = short ? 62 : na ? 76 : 50;
    const BG = {white: '#fafaf7', yellow: '#f7d117', black: '#141414', green: '#1f7a3e', blue: '#1d4fa0', red: '#c62828', maroon: '#7a1f2b', silver: '#d9dcdf', orange: '#f08a24'};
    const COL = {red: '#c8313e', green: '#4aa657', blue: '#0057b7', yellow: '#ffd700', white: '#ffffff', black: '#111', teal: '#00a3c4', orange: '#f2a800', maroon: '#7a1f2b', navy: '#1e3a8a'};
    const DARK = {black: 1, green: 1, blue: 1, red: 1, maroon: 1};
    const FONT = "Arial, 'Noto Sans', 'Noto Sans Arabic', 'Noto Sans Thai', 'Noto Sans Bengali', 'Noto Sans Devanagari', 'Noto Sans CJK', sans-serif";
    const tx = (x, y, t, fs, fill, anchor, w) => `<text x="${x}" y="${y}" text-anchor="${anchor || 'middle'}" font-size="${fs}" font-weight="${w || 700}" font-family="${FONT}" fill="${fill}">${esc(t)}</text>`;
    const fit = (t, room, max) => Math.max(7, Math.min(max, room / Math.max(1, [...String(t)].length) * 1.75));
    const one = (bgName, y) => {
      const bg = BG[bgName] || BG.white;
      const ink = {black: '#111', red: '#b3171f', blue: '#1f3f9a', white: '#f4f4f4', green: '#1d6b38', yellow: '#f7d117'}[s.ink] || (DARK[bgName] ? '#f4f4f4' : '#111');
      let o = `<rect x="2" y="${y + 2}" width="${PW - 4}" height="${PH - 4}" rx="5" fill="${bg}" stroke="#2b2b2b" stroke-width="2"/>`;
      if (s.border === 'red') o += `<rect x="5" y="${y + 5}" width="${PW - 10}" height="${PH - 10}" rx="3" fill="none" stroke="#c8102e" stroke-width="2.4"/>`;
      if (s.border === 'green') o += `<rect x="5" y="${y + 5}" width="${PW - 10}" height="${PH - 10}" rx="3" fill="none" stroke="#2e8b3d" stroke-width="2"/>`;
      if (s.border === 'red-tb') o += r(6, y + 5, PW - 12, 3, '#c8102e') + r(6, y + PH - 8, PW - 12, 3, '#c8102e');
      let x0 = 10, yTop = y + 4;
      const band = s.band;
      const code = esc(s.code || '');
      if (band === 'eu' || band === 'eu-double' || band === 'blue') {
        o += `<path d="M4 ${y + 4} h20 v${PH - 8} h-20 z" fill="#1e40a8"/>`;
        if (band !== 'blue') for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; o += `<circle cx="${14 + 6 * Math.cos(a)}" cy="${y + 16 + 6 * Math.sin(a)}" r="1.1" fill="#ffd200"/>`; }
        o += `<text x="14" y="${y + PH - 9}" text-anchor="middle" font-size="${code.length > 3 ? 6 : code.length > 2 ? 8 : 10}" font-weight="700" font-family="Arial, sans-serif" fill="#fff">${code}</text>`;
        x0 = 28;
      } else if (band === 'flag') {
        const cols = String(s.flag || 'red-green').split('-').map((c) => COL[c] || c);
        const n = Math.min(3, cols.length), fh = 12 / n;
        for (let i = 0; i < n; i++) o += n === 2 ? r(7, y + 9 + i * 6, 16, 6, cols[i]) : r(7, y + 9 + i * fh, 16, fh + 0.2, cols[i]);
        if (cols.includes('#ffffff')) o += `<rect x="7" y="${y + 9}" width="16" height="12" fill="none" stroke="#999" stroke-width="0.4"/>`;
        o += `<text x="15" y="${y + PH - 10}" text-anchor="middle" font-size="${code.length > 3 ? 6 : 9}" font-weight="700" font-family="Arial, sans-serif" fill="#1e40a8">${code}</text>`;
        x0 = 28;
      } else if (band && COL[band]) {
        o += `<path d="M4 ${y + 4} h20 v${PH - 8} h-20 z" fill="${COL[band]}"/>`;
        const cl = code.length, vert = cl > 3;
        if (vert) o += `<text x="14" y="${y + PH / 2}" text-anchor="middle" dominant-baseline="middle" font-size="7" font-weight="700" font-family="Arial, sans-serif" fill="${band === 'white' || band === 'yellow' ? '#111' : '#fff'}" transform="rotate(-90 14 ${y + PH / 2})">${code}</text>`;
        else o += `<text x="14" y="${y + PH - 9}" text-anchor="middle" font-size="${cl > 2 ? 8 : 10}" font-weight="700" font-family="Arial, sans-serif" fill="${band === 'white' || band === 'yellow' ? '#111' : '#fff'}">${code}</text>`;
        x0 = 28;
      }
      if (s.topbar) { const tb = COL[s.topbar] || s.topbar; o += `<path d="M4 ${y + 4} h${PW - 8} v${PH * 0.26} h-${PW - 8} z" fill="${tb}"/>`; yTop = y + 4 + PH * 0.26; }
      let xr = PW - 10;
      if (band === 'eu-double') { o += `<path d="M${PW - 24} ${y + 4} h20 v${PH - 8} h-20 z" fill="#1e40a8"/><text x="${PW - 14}" y="${y + PH - 10}" text-anchor="middle" font-size="${(s.dept || '').length > 2 ? 7 : 9}" font-weight="700" font-family="Arial, sans-serif" fill="#fff">${s.dept || (s.code === 'F' ? '75' : '')}</text>`; xr = PW - 28; }
      if (s.rbox === 'yes') {
        o += `<line x1="${PW - 46}" y1="${y + 5}" x2="${PW - 46}" y2="${y + PH - 5}" stroke="#2b2b2b" stroke-width="2"/>`;
        o += `<text x="${PW - 25}" y="${y + 30}" text-anchor="middle" font-size="20" font-weight="700" font-family="Arial, sans-serif" fill="${ink}">77</text>`;
        o += r(PW - 22, y + 36, 12, 3, '#fff') + r(PW - 22, y + 39, 12, 3, '#0039a6') + r(PW - 22, y + 42, 12, 3, '#d52b1e');
        o += `<text x="${PW - 34}" y="${y + 44}" font-size="6" font-family="Arial, sans-serif" fill="${ink}">RUS</text>`;
        xr = PW - 50;
      }
      const cx = (x0 + xr) / 2, room = xr - x0;
      if (s.txt || s.top || s.sub) { // sample registration with optional small lines above and below
        const main = s.txt || 'AB 123';
        const hasTop = !!s.top && !s.topbar, hasSub = !!s.sub;
        if (s.topbar && s.top) o += tx(PW / 2, y + 4 + PH * 0.2, s.top, fit(s.top, PW - 16, 10), '#fff');
        const lines = (hasTop ? 1 : 0) + (hasSub ? 1 : 0);
        const big = Math.min(fit(main, room, short ? 21 : na ? 24 : 25), (PH - 10 - (s.topbar ? PH * 0.26 : 0)) * (lines ? 0.5 : 0.62));
        const small = Math.min(fit(s.top || s.sub || '', room, short || na ? 11 : 9), big * 0.62);
        const area0 = yTop + 2, area1 = y + PH - 4, mid = (area0 + area1) / 2;
        if (hasTop) o += tx(cx, area0 + small + 1, s.top, small, ink, 'middle', 600);
        const my = hasTop && hasSub ? mid + big * 0.36 : hasTop ? area1 - (area1 - area0 - small) / 2 + big * 0.3 : hasSub ? area0 + (area1 - area0 - small) / 2 + big * 0.3 : mid + big * 0.36;
        o += tx(cx, my, main, big, ink);
        if (hasSub) o += tx(cx, area1 - 2, s.sub, small, ink, 'middle', 600);
        if (s.crest === 'yes') o += `<path d="M${x0 - 2} ${y + 10} h10 v8 q0 5 -5 7 q-5 -2 -5 -7 z" fill="#c8102e" stroke="#c6a000" stroke-width="0.8"/>`;
      } else if (short) {
        o += `<text x="${cx}" y="${y + 27}" text-anchor="middle" font-size="19" font-weight="700" font-family="Arial, sans-serif" fill="${ink}">AB</text>`;
        o += `<text x="${cx}" y="${y + 50}" text-anchor="middle" font-size="19" font-weight="700" font-family="Arial, sans-serif" fill="${ink}">1234</text>`;
        if (s.crest === 'yes') o += `<path d="M10 ${y + 10} h12 v9 q0 6 -6 8 q-6 -2 -6 -8 z" fill="#c8102e" stroke="#c6a000" stroke-width="1"/>`;
      } else {
        const txt = s.rbox === 'yes' ? 'А 123 ВС' : 'AB 123';
        const mid = s.crest === 'yes' || s.crest === 'seal';
        if (!mid) o += `<text x="${cx}" y="${y + 34}" text-anchor="middle" font-size="25" font-weight="700" letter-spacing="1" font-family="Arial, sans-serif" fill="${ink}">${txt}</text>`;
        else {
          o += `<text x="${cx - 12}" y="${y + 34}" text-anchor="end" font-size="25" font-weight="700" font-family="Arial, sans-serif" fill="${ink}">AB</text>`;
          o += `<text x="${cx + 12}" y="${y + 34}" text-anchor="start" font-size="25" font-weight="700" font-family="Arial, sans-serif" fill="${ink}">123</text>`;
          if (s.crest === 'yes') o += `<path d="M${cx - 6} ${y + 15} h12 v8 q0 6 -6 8 q-6 -2 -6 -8 z" fill="#c8102e" stroke="#c6a000" stroke-width="0.8"/>`;
          else o += `<circle cx="${cx}" cy="${y + 18}" r="5" fill="#2f6db5" stroke="#999" stroke-width="0.6"/><circle cx="${cx}" cy="${y + 32}" r="5" fill="#e7c64b" stroke="#999" stroke-width="0.6"/>`;
        }
      }
      return o;
    };
    let out = '', totalH = PH;
    if (s.rear === 'yellow') {
      out = one(s.bg || 'white', 0) + one('yellow', PH + 6);
      totalH = PH * 2 + 6;
    } else out = one(s.bg || 'white', 0);
    return `<svg viewBox="0 0 ${PW} ${totalH}" xmlns="${NS}">${out}</svg>`;
  }

  let uid = 0;
  window.geo2d = {
    parse,
    svg(type, spec) {
      const raw = type === 'pole' ? pole(spec) : type === 'bollard' ? bollard(spec) : type === 'plate' ? plate(spec) : road(spec);
      if (!raw) return '';
      const id = 'g2d' + (++uid);
      return raw.replace(/CLIP/g, id);
    }
  };
})();

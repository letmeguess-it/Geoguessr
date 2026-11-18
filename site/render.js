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
    const col = {wood: C.wood, concrete: C.concrete, steel: C.steel, black: C.black}[s.mat] || C.concrete;
    let out = scene(W, H, G);
    const form = s.form || 'round';
    const pw = {round: 14, rect: 18, square: 18, octagonal: 16, stobie: 18, segments: 16}[form] || 16;
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
    } else if (s.holes === 'square-holes') {
      for (let y = 50; y < 165; y += 10) out += r(hx - 2.5, y, 5, 5, hole);
    }
    if (s.base === 'white') out += `<polygon points="${px - 0.5},150 ${px + pw + 0.5},150 ${px + pw + 1},${G} ${px - 1},${G}" fill="${C.white}" stroke="${C.outline}" stroke-width="0.6"/>`;
    const stripe = (y1, y2, x, w) => {
      let g = `<clipPath id="CLIP"><rect x="${x}" y="${y1}" width="${w}" height="${y2 - y1}"/></clipPath><g clip-path="url(#CLIP)">` + r(x, y1, w, y2 - y1, C.yellow);
      for (let y = y1 - w; y < y2 + w; y += 10) g += `<polygon points="${x},${y} ${x + w},${y - w * 0.7} ${x + w},${y - w * 0.7 + 5} ${x},${y + 5}" fill="${C.black}"/>`;
      return g + '</g>';
    };
    if (s.stripes === 'diag-full') out += stripe(104, G, px - 1, pw + 2);
    if (s.stripes === 'diag-high') out += stripe(96, 158, px - 1, pw + 2);
    if (s.stripes === 'vertical-plate') out += stripe(112, 160, 60 - 4, 8);
    if (s.bolts === 'yes') for (let y = 60; y < 150; y += 14) out += `<line x1="${y % 28 ? px - 5 : px + pw}" y1="${y}" x2="${y % 28 ? px : px + pw + 5}" y2="${y}" stroke="#3a3d40" stroke-width="2"/>`;
    if (s.tag === 'yellow-rect') out += r(55, 132, 10, 7, C.yellow, `stroke="#3a3a3a" stroke-width="0.5"`);
    if (s.tag === 'yellow-diamond') out += `<polygon points="60,126 66,133 60,140 54,133" fill="${C.yellow}" stroke="#3a3a3a" stroke-width="0.5"/>`;
    if (s.tag === 'blue') out += r(55, 130, 10, 6, C.blue);
    if (s.tag === 'green') out += r(px, 74, pw, 8, C.green) + r(px, 82, pw, 3, C.white);
    if (s.tag === 'white') out += r(55, 120, 10, 14, C.white, `stroke="#999" stroke-width="0.4"`);
    const ins = (x, y) => `<rect x="${x - 1.5}" y="${y - 5}" width="3" height="5" fill="#e9e4d8" stroke="#6d6a62" stroke-width="0.4"/>`;
    if (s.top === 'trident') {
      out += `<line x1="60" y1="${top}" x2="60" y2="${top - 14}" stroke="#4e5458" stroke-width="2.5"/><line x1="60" y1="${top + 2}" x2="40" y2="${top - 10}" stroke="#4e5458" stroke-width="2.5"/><line x1="60" y1="${top + 2}" x2="80" y2="${top - 10}" stroke="#4e5458" stroke-width="2.5"/>` + ins(60, top - 14) + ins(40, top - 10) + ins(80, top - 10);
    } else if (s.top === 'crossarm' || s.top === 'xbrace') {
      if (form !== 'H') out += r(28, top + 6, 64, 5, s.mat === 'wood' ? '#6b4f36' : '#6f767c');
      out += ins(32, top + 6) + ins(50, top + 6) + ins(70, top + 6) + ins(88, top + 6);
      if (s.top === 'xbrace') out += `<line x1="38" y1="${top + 11}" x2="58" y2="${top + 30}" stroke="#55595d" stroke-width="1.6"/><line x1="82" y1="${top + 11}" x2="62" y2="${top + 30}" stroke="#55595d" stroke-width="1.6"/><line x1="44" y1="${top + 24}" x2="76" y2="${top + 14}" stroke="#55595d" stroke-width="1.6"/><line x1="76" y1="${top + 24}" x2="44" y2="${top + 14}" stroke="#55595d" stroke-width="1.6"/>`;
    }
    if (s.transformer === 'yes') out += r(64, 58, 14, 24, '#9aa0a5', `rx="3" stroke="${C.outline}" stroke-width="0.6"`) + r(66, 55, 10, 4, '#7b8186');
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">${out}</svg>`;
  }

  function bollard(spec) {
    const s = parse(spec);
    if (!Object.keys(s).length) return '';
    const W = 120, H = 200, G = 186;
    let out = scene(W, H, G);
    const body = {white: C.white, black: C.black, grey: C.grey}[s.body] || C.white;
    if (s.top === 'disc') {
      out += r(58, 60, 4, G - 60, C.grey) + `<circle cx="60" cy="52" r="20" fill="${C.white}" stroke="${C.outline}" stroke-width="0.8"/><circle cx="60" cy="52" r="15" fill="${C.orange}"/><circle cx="60" cy="52" r="7" fill="#f6b45a"/>`;
      return `<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">${out}</svg>`;
    }
    const w = s.thin === 'yes' ? 20 : s.thick === 'yes' ? 36 : 28;
    const x = 60 - w / 2;
    const t = s.short === 'yes' ? 100 : 56;
    const angled = s.top === 'angled';
    const tl = t, tr = angled ? t + 12 : t;
    const shape = s.top === 'round'
      ? `M${x} ${G} L${x} ${t + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${t + w / 2} L${x + w} ${G} Z`
      : `M${x} ${G} L${x} ${tl} L${x + w} ${tr} L${x + w} ${G} Z`;
    out += `<path d="${shape}" fill="${body}" stroke="${C.outline}" stroke-width="0.8"/>`;
    out += `<clipPath id="CLIP"><path d="${shape}"/></clipPath><g clip-path="url(#CLIP)">`;
    const capH = s.cap === 'black-third' ? (G - t) / 3 : 30;
    if (s.cap === 'black' || s.cap === 'black-third') out += r(x - 1, t - 2, w + 2, (angled ? 12 : 0) + capH + 2, C.black);
    if (s.cap === 'black-band') out += r(x - 1, t + 8, w + 2, 30, C.black);
    if (s.band === 'black-diag') out += `<polygon points="${x - 1},${t + 18} ${x + w + 1},${t + 4} ${x + w + 1},${t + 34} ${x - 1},${t + 48}" fill="${C.black}"/>`;
    const cx = 60, cy = t + (angled ? 12 : 0) + capH / 2;
    const refl = s.refl;
    if (refl === 'white-vert') out += r(cx - 3, cy - 10, 6, 20, C.white, 'rx="1"');
    if (refl === 'red-rect') out += r(cx - 4, (s.band === 'black-diag' ? t + 22 : cy - 7), 8, 14, C.red, 'rx="1"');
    if (refl === 'red-thin') out += r(cx - 2, cy - 9, 4, 18, C.red);
    if (refl === 'red-vert') out += r(cx - 3, cy - 11, 6, 22, C.red, 'rx="1"');
    if (refl === 'orange-2') out += r(cx - 7, cy - 8, 14, 6, C.orange) + r(cx - 7, cy + 2, 14, 6, C.orange);
    if (refl === 'yellow-rect') out += r(cx - 4, cy - 8, 8, 16, C.yellow, 'rx="1"');
    if (refl === 'blue-vert') out += r(cx - 2.5, cy - 11, 5, 22, C.blue) + r(cx - 2.5, cy - 4, 5, 6, C.white);
    if (refl === 'red-band') out += r(x - 1, t + 58, w + 2, 12, C.red);
    if (refl === 'red-ring') out += r(x - 1, t + 26, w + 2, 12, C.red);
    if (refl === 'red-wide') out += r(x + 4, t + 20, w - 8, 26, C.red, 'rx="2"');
    if (refl === 'red-wrap') out += r(x - 1, t + 14, w + 2, 22, C.red);
    if (refl === 'yellow-band') out += r(x - 1, t + capH + 6, w + 2, 8, C.orange);
    if (refl === 'yellow-red') out += r(x + 3, t + 10, w / 2 - 4, 22, C.yellow) + r(cx + 1, t + 10, w / 2 - 4, 22, C.red);
    if (s.num === 'yes') out += `<text x="${cx}" y="${t + 86}" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="${C.black}">12.4</text>`;
    out += '</g>';
    if (s.top === 'angled') out += `<line x1="${x}" y1="${tl}" x2="${x + w}" y2="${tr}" stroke="${C.outline}" stroke-width="0.8"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">${out}</svg>`;
  }

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
      if (band === 'eu-double') { o += `<path d="M${PW - 24} ${y + 4} h20 v${PH - 8} h-20 z" fill="#1e40a8"/><text x="${PW - 14}" y="${y + PH - 10}" text-anchor="middle" font-size="9" font-weight="700" font-family="Arial, sans-serif" fill="#fff">${s.code === 'F' ? '75' : ''}</text>`; xr = PW - 28; }
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

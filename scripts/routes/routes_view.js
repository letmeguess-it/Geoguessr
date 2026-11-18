// Draws one route schematic. The same function is pasted into site/app.js; keep the two in step.
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
if (typeof module !== 'undefined') module.exports = {routeSvg, ROUTE_COL};

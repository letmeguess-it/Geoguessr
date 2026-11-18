// Renders every route schematic to preview/<CODE>.svg for checking by eye.
// Usage (from the repository root, after build_routes.py): node scripts/routes/preview.js
const path = require('path'); const fs = require('fs');
const ROOT = path.join(__dirname, '..', '..'); const OUT = path.join(ROOT, 'preview');
global.window = {}; require(path.join(ROOT, 'site', 'routes.js'));
const {routeSvg} = require('./routes_view.js');
fs.mkdirSync(OUT, {recursive: true});
const ink = {land: '#ecebe6', edge: '#b9b7ae', text: '#111', halo: '#fff', muted: '#77756d'};
for (const [c, R] of Object.entries(window.ROUTES)) if (!R.t) fs.writeFileSync(path.join(OUT, c + '.svg'), routeSvg(R, ink).replace('<svg ', '<svg font-family="sans-serif" style="background:#fff" '));
console.log('wrote', fs.readdirSync(OUT).length, 'files to', OUT);

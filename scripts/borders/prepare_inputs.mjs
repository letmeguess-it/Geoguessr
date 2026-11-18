// Reads the current site files and writes work/work_in.json: the previous region list (REGIONS), the sheet's region rows
// (WORLD_EXTRA.areas) and the country list (GEO_DATA). The build uses the previous region list only as a fallback link
// when a Natural Earth unit's name does not match a sheet region (see step2_regions.py).
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE_DIR || path.join(here, '..', '..', 'site');
const work = process.env.BORDERS_WORK || path.join(here, 'work');
globalThis.window = {CLUES_RAW: {names: '', words: '', regions: '', scripts: '', alphabets: ''}};
for (const f of ['data.js', 'regions.js', 'clues_world.js']) (0, eval)(fs.readFileSync(path.join(site, f), 'utf8'));
const D = window.GEO_DATA.countries.map((c) => ({n: c.n, code: c.code || (c.dom === '.uk' ? 'UK' : c.dom.slice(1).toUpperCase())}));
fs.mkdirSync(work, {recursive: true});
fs.writeFileSync(path.join(work, 'work_in.json'), JSON.stringify({R: window.REGIONS, A: window.WORLD_EXTRA.areas, D}));
console.log('work_in.json:', window.REGIONS.length, 'regions,', window.WORLD_EXTRA.areas.length, 'sheet rows,', D.length, 'countries');

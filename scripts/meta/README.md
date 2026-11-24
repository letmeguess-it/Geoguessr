# Clue data (`site/data.js`)

`build_data.py` builds `site/data.js` from the sheet tables in `data/csv/`:
- **All Countries:** domain, driving side, calling code and plate text;
- **2D Visual Clues:** the drawing specs for poles, bollards, road lines and plates, plus their captions;
- **Language Clues:** language, sample words and look-alike note;
- **Visual Clue Sources:** the pole, bollard, architecture and road-line text.

`meta_extra.json` holds what is not in those tables: camera notes, look-alike pairs, and a few per-country overrides (a sheet export drops a leading apostrophe).

`americas_2026_11.py` holds the North and South American clue text added on 2026-11-19 and writes it into the tables. Its header lists the sources. The same values went into the Google Sheet.

`africa_2026_11.py` holds the African clue text added on 2026-11-24 (18 coverages) and writes it into the tables, plus Google car notes into `meta_extra.json` (`cam`, shown as a chip on the Key Card: the text before the colon is the chip label, such as Google car, Follow car or No car). Its header lists the sources.

```
python3 -I scripts/meta/americas_2026_11.py   # only needed to re-apply the Americas text
python3 -I scripts/meta/africa_2026_11.py     # only needed to re-apply the Africa text
python3 -I scripts/meta/build_data.py 2026-11-24
```

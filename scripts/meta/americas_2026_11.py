# Americas meta content, release 2026-11-19. Writes into the sheet tables in data/csv/ (the Google Sheet is updated from the same values).
# Sources: the Beginner / Amateur / Pro cheatsheets (docs/cheatsheets), geotips.net (North America and South America pages),
# geometas.com country pages (imported from Plonk It), and general knowledge where marked lower-confidence in claude/Audit_Americas.md.
# Keys: lang/script/note -> Language Clues; po/pot/bo/bot/ro/ps -> 2D Visual Clues; pos/bos/ros/arch -> Visual Clue Sources (insight columns);
# side -> All Countries (Driving). Only the keys given are written; everything else in a row stays as it is.
# Run from the repository root: python3 -I scripts/meta/americas_2026_11.py
import csv, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CSV = os.path.join(ROOT, 'data', 'csv')

M = {
    'United States': dict(
        lang='English (Spanish common in the Southwest, Florida and big cities)',
        script='Street · Avenue · Hwy · SPEED LIMIT',
        note='Same language and sign style as Canada, but speed signs read SPEED LIMIT in mph. Canada writes MAXIMUM, uses km/h, has checkerboard dead-end signs and French in Quebec and New Brunswick.',
        ps='size=na; top=CALIFORNIA; txt=8ABC123',
        ro='center=yellow-double; edge=white-solid; warn=diamond-yellow; word=St / Ave',
        ros='United States: double yellow centre lines and white edges; green street-name blades; SPEED LIMIT signs in mph; Interstate shields (odd = north-south, even = east-west); 17 states have no front plate.',
        bos='United States: no national bollard. Thin white or brown flexible posts with a small reflector line some highways; most reflectors sit on the guardrails.'),
    'Canada': dict(
        lang='English, French',
        script='Street · Rue · ARRÊT · MAXIMUM',
        note="Quebec is French-only (Rue, Chemin, ARRÊT) but looks North American: yellow centre lines, US-style poles. New Brunswick signs are bilingual (West / Ouest). Speed signs say MAXIMUM in km/h, unlike the US's SPEED LIMIT in mph.",
        ps='size=na; top=ONTARIO; txt=ABCD 123; sub=YOURS TO DISCOVER',
        ro='center=yellow-double; edge=white-solid; warn=diamond-yellow; word=Rue / Street',
        ros='Canada: yellow centre lines (a single line more often than in the US), white edges; MAXIMUM speed signs in km/h; black-and-yellow checkerboard dead-end signs; route shields and kilometre posts differ by province; Quebec stop signs say ARRÊT.',
        bo='body=white; top=flat; refl=red-rect; thin=yes',
        bot='Quebec: long, thin white posts fixed to the guardrails, with a red or green reflector on top.',
        bos='Canada: no national bollard. Quebec has thin white guardrail posts with a red or green reflector on top; New Brunswick has flat yellow posts on the Trans-Canada Highway.'),
    'Mexico': dict(
        lang='Spanish',
        script='Calle · Colonia (Col.) · ALTO · Tope',
        note='ALTO on stop signs is shared with Guatemala and Costa Rica; most of South America writes PARE. Nahuatl place names (-tepec, -tlán, many x) and smooth octagonal concrete poles point to Mexico.',
        ps='size=na; top=JALISCO; txt=JKL-123-A',
        ros="Mexico: yellow centre lines (double on major roads), white edges; stop signs say ALTO; yellow warning signs with large bold pictures; 'Tope' speed-bump signs; kilometre markers; Calle and Colonia (Col.).",
        bo='body=white; top=round; refl=white-vert; foot=black',
        bot='Mexico: round white post with a black lower section and a yellow back, like a cigarette; common in the north and the south.',
        bos='Mexico: round white bollard with a black base and a yellow back (cigarette-like), common in the north and south.'),
    'Guatemala': dict(
        lang='Spanish (Mayan languages widely spoken)',
        script='Calle · Avenida · Zona · ALTO',
        note="Spanish with a roof-rack Google car: Guatemala's rack is bare silver, the Dominican Republic's has black caps in the middle. City addresses use numbered Calle / Avenida plus Zona (Zona 1, Zona 10).",
        ps='size=na; topbar=blue; top=GUATEMALA; txt=P 123ABC',
        po='mat=concrete; form=round; base=red; top=crossarm',
        pot='Guatemala: concrete pole with its base painted, most often red.',
        pos='Guatemala: concrete poles, most painted red at the base; medium all-green poles carry TV and internet lines.',
        ros="Guatemala: yellow centre, white edges; stop signs say ALTO; 'Una Vía' / 'Doble Vía' one-way signs in grid towns; Google car with a bare silver roof rack everywhere.",
        bos='Guatemala: bollards are extremely rare.'),
    'Belize': dict(
        lang='English, Kriol, Spanish',
        script='Street · Road · Highway · STOP',
        note='The only English-speaking country in Central America, next to Spanish-speaking Mexico and Guatemala. Unlike most English-speaking Caribbean islands, Belize drives on the right.',
        ps='size=na; top=BELIZE; txt=C 12345',
        ro='center=yellow-dashed; edge=white-solid; warn=diamond-yellow; word=Street'),
    'Costa Rica': dict(
        lang='Spanish',
        script='Calle · Avenida · ALTO · Pulpería',
        note="Stop signs say ALTO (Panama next door writes PARE). Most coverage is Trekker (beaches, San José, Caño and Cocos islands), so look for the walker's shadow. Addresses are given as distances from landmarks ('100 m norte').",
        ps='size=na; topbar=blue; top=COSTA RICA; txt=ABC-123',
        ros="Costa Rica: mostly Trekker coverage; where roads are marked, a single yellow centre line; stop signs say ALTO; red taxis with a yellow triangle on the door; addresses by landmark ('100 m norte')."),
    'Panama': dict(
        lang='Spanish',
        script='Calle · Vía · Corregimiento · PARE',
        note='PARE on stop signs, unlike ALTO in Costa Rica to the west. Plates are rear-only on many cars, and the Google car is a pickup with an antenna near the front.',
        ps='size=na; top=PANAMÁ; txt=AB1234',
        ro='center=yellow-dashed; edge=white-solid; warn=diamond-yellow; word=Calle / Vía',
        ros='Panama: single yellow centre line (double is rare), white edges; kilometre markers on rural roads; stop signs say PARE; round metal sign poles; colourful satellite dishes (Claro, TV Digital).',
        bos='Panama: no official bollards; kilometre markers on rural roads instead.'),
    'Dominican Republic': dict(
        lang='Spanish',
        script='Calle · Colmado · Ens. · PARE',
        note="Spanish with a roof-rack car: the Dominican rack has black rubber caps in the middle (Guatemala's is bare). Stop signs say PARE, not ALTO. Coverage is mostly Santo Domingo and Santiago.",
        ps='size=na; top=REPÚBLICA DOMINICANA; txt=A123456',
        po='mat=concrete; form=square; base=yellow; top=crossarm',
        pot='Dominican Republic: square concrete pole; a yellow-painted base points to Santo Domingo, grey to Santiago.',
        pos='Dominican Republic: square concrete poles, yellow-painted bases in Santo Domingo and grey in Santiago; octagonal poles in the suburbs.',
        ros="Dominican Republic: yellow centre lines, white edges; stop signs say PARE; green street signs with a white border; concrete highway dividers with a red top reflector; kilometre markers reading 'Rep. Dom.'.",
        bos='Dominican Republic: no roadside bollards; concrete highway dividers carry a red reflector on top and yellow ones on the sides.'),
    'Puerto Rico': dict(
        lang='Spanish, English',
        script='Calle · Carr. · PARE · km',
        note='US-style roads and signs, but in Spanish: stop signs say PARE, distances are in km while speed limits stay in mph. Plates are rear-only.',
        ps='size=na; top=PUERTO RICO; txt=ABC-123; sub=ISLA DEL ENCANTO',
        po='mat=concrete; form=octagonal; top=crossarm',
        pot='Puerto Rico: Mexican-style octagonal concrete pole; large square concrete poles too.',
        pos='Puerto Rico: Mexican-style octagonal concrete poles and large square ones beside US-style roads.',
        ros="Puerto Rico: US-style signs in Spanish; stop signs say PARE; kilometre markers but speed limits in mph; 'Carr.' / PR- route shields; white Google car with an antenna on the front passenger side."),
    'U.S. Virgin Islands': dict(
        side='Left hand driving',
        lang='English',
        script='Road · Gade · STOP',
        note='US signs, plates and double yellow lines, but traffic keeps LEFT, in left-hand-drive American cars. Puerto Rico (Spanish, keeps right) is the near look-alike; Danish-era street names end in -gade.',
        ps='size=na; top=VIRGIN ISLANDS; txt=ABC 123',
        ro='center=yellow-double; edge=white-solid; warn=diamond-yellow',
        ros="U.S. Virgin Islands: traffic keeps left in left-hand-drive cars; double yellow centre, white edges; US-style signs; guardrails painted yellow on dangerous bends; Danish-era street names ('Gade')."),
    'Bermuda': dict(
        lang='English',
        script='Road · Lane · STOP',
        note='Keeps left like the UK and feels British (street signs on building walls, stone walls as guardrails), but sits in the Atlantic: pastel houses with white stepped limestone roofs are unique to Bermuda.',
        ps='size=na; top=BERMUDA; txt=12345',
        ro='center=yellow-dashed; edge=white-solid',
        pos='Bermuda: ornate wooden poles, larger in towns.',
        ros='Bermuda: keeps left; a single yellow centre line, often faded; narrow lanes with stone walls or wooden fences as guardrails; street signs fixed to building walls.',
        arch='Bermuda: pastel blue, pink and yellow boxy houses with white stepped limestone roofs that catch rainwater.'),
    'Aruba': dict(
        lang='Papiamento, Dutch',
        script='Caya · Straat · Weg',
        note='Papiamento is shared with Curaçao, but Aruba writes Caya with a C (Curaçao: Kaya). Aruba is flat and arid with divi-divi trees and cactus; plates read ARUBA.',
        ps='size=na; top=ARUBA; txt=A-12345; sub=ONE HAPPY ISLAND',
        ros="Aruba: Dutch-style signs; Papiamento street names ('Caya'); dry, flat land with cactus and divi-divi trees."),
    'Curaçao': dict(
        lang='Papiamentu, Dutch, English',
        script='Kaya · Weg · Straat',
        note="Papiamentu writes Kaya with a K (Aruba: Caya). All-white road lines and poles with a white-painted base; colourful Dutch colonial façades in Willemstad.",
        po='mat=concrete; form=round; base=white; top=crossarm',
        pot='Curaçao: pole with about 2 m of white paint at the base.',
        pos='Curaçao: many poles have about 2 m of white paint at the base; red-and-white striped poles at street corners.',
        ro='center=white-dashed; edge=white-solid; word=Kaya',
        ros="Curaçao: all-white road lines; blue destination signs on small roads; black-and-white striped traffic-light poles; tan guardrails; 'Kaya' street names."),
    'Martinique': dict(
        lang='French (Antillean Creole)',
        script='Rue · Route · Chemin',
        note='French plates (972 on the right band) and French signs in the Caribbean; Trekker-only coverage. Réunion is the French look-alike in the Indian Ocean (974); Saint-Pierre and Miquelon is cold and North Atlantic.',
        ps='band=eu-double; code=F'),
    'Saint Pierre and Miquelon': dict(
        lang='French',
        script='Rue · Route · STOP',
        note='French in North America: European-style signs (STOP with a thick white border) and French poles, but Canadian-looking clapboard houses. Street View was taken from an ATV.',
        ps='bg=white; rear=yellow; txt=SPM 123',
        ro='center=white-dashed; word=Rue',
        ros="Saint-Pierre and Miquelon: few road lines (white dashed where present) on reddish asphalt; French signs, STOP with a thick white border; ATV Street View.",
        bos='Saint-Pierre and Miquelon: only a handful of French bollards in Saint-Pierre town.'),
    'Greenland': dict(
        lang='Greenlandic (Kalaallisut), Danish',
        script='Aqqusinersuaq · qq · vej',
        note="Greenlandic words are long, with qq, rs and ss and almost no æ ø (those are Danish). Road lines are all white, and yield signs stand where stop signs would be. Each town's Street View vehicle differs (ATV, boat, pickup).",
        ro='center=white-dashed; edge=white-solid',
        ros='Greenland: all-white road lines (no yellow centre); yield signs instead of stop signs; signs mostly in Greenlandic; tiny local road networks.'),
    'Falkland Islands': dict(
        lang='English',
        script='Road · Street · Stanley',
        note='British plates (white front, yellow rear) and left-hand traffic in the South Atlantic. Trekker coverage across treeless grass, peat and rock; penguins are a strong hint.',
        ps='bg=white; rear=yellow; txt=F 1234',
        ros='Falkland Islands: keeps left; mostly gravel tracks with little road furniture; Trekker and boat coverage.'),
    'South Georgia and the South Sandwich Islands': dict(
        lang='English',
        script='Grytviken · King Edward Point',
        note='No roads at all: Trekker coverage (ski-pole shadow) around Grytviken and King Edward Point, a boardwalk on Prion Island, boat coverage at Hercules Bay. Whaling-station ruins, seals and king penguins.',
        ros='South Georgia: no road network; Trekker and boat coverage only.'),
    'Colombia': dict(
        lang='Spanish',
        script='Calle · Carrera (Cra.) · PARE',
        note='Calle plus Carrera (Cra / Kr) numbered addresses are uniquely Colombian. Plates are yellow front and rear (Ecuador: white with the province letter first), and Colombian road signs have a grey cross on the back.',
        ps='bg=yellow; size=na; txt=ABC 123; sub=BOGOTÁ D.C.',
        ros="Colombia: yellow centre, white edges; a grey cross on the back of road signs; slim white sign posts; stop signs say PARE; tall green kilometre markers topped with 'PR'; Calle and Carrera (Cra.) grid.",
        bos="Colombia: bollards are uncommon; tall green kilometre markers topped with 'PR', and older stone markers with black lettering."),
    'Ecuador': dict(
        lang='Spanish, Kichwa',
        script='Calle · Avenida · Vía · PARE',
        note='The first plate letter gives the province (P Pichincha, G Guayas, A Azuay); commercial plates have an orange top or are fully orange. Round bollards with red rings are common here and rare elsewhere in Latin America.',
        ps='size=na; top=ECUADOR; txt=PBC-1234',
        po='mat=concrete; form=rect; holes=steps; top=crossarm',
        pot='Ecuador: concrete pole with small step indents, shorter than Brazil\'s; bases are sometimes coloured.',
        pos='Ecuador: round concrete poles and ladder-style poles with small step indents; bases sometimes painted.',
        bo='body=white; top=round; refl=red-2ring',
        bot='Ecuador: small round white bollard with two red rings.',
        bos='Ecuador: bollards are common, most often a small round white post with two red rings; also flat black posts with two red reflectors.',
        ros='Ecuador: yellow centre line, white edges; concrete roads and double guardrails; stop signs say PARE; blue shields for primary E-roads (E10–E50: ending 0 = east-west, 5 = north-south); plain sign backs.'),
    'Peru': dict(
        lang='Spanish, Quechua, Aymara',
        script='Jirón (Jr.) · Calle · Pasaje · PARE',
        note="The street word 'Jirón (Jr.)' is only Peruvian. Mototaxis (three-wheelers) and election slogans painted on walls ('Alcalde') are strong Peru clues against Bolivia and Ecuador.",
        ps='size=na; topbar=red; top=PERÚ; txt=ABC-123',
        po='mat=concrete; form=round; base=black; top=crossarm',
        pot='Peru: concrete pole with the bottom painted, most often black.',
        pos='Peru: concrete poles with painted bottoms (most often black); some with three arms sticking out.',
        bo='body=white; top=round; cap=black-band',
        bot='Peru: round "cigarette" bollard, plain or with black stripes; Moquegua has a black-and-yellow top.',
        bos='Peru: round cigarette-like bollards, plain or black-striped; Moquegua region has its own black-and-yellow topped bollard.',
        ros="Peru: yellow centre on two-lane roads, white on divided highways; black-and-white striped sign posts set in concrete blocks; stop signs say PARE; mototaxis; 'PE-1N' style national routes."),
    'Bolivia': dict(
        lang='Spanish, Quechua, Aymara, Guaraní',
        script='Calle · Avenida · PARE',
        note='Plates are pale with blue characters (1234 ABC). The high, treeless Altiplano and thick wooden sign posts are typical; Peru has mototaxis and Jirón, Bolivia has neither.',
        ps='size=na; ink=blue; top=BOLIVIA; txt=1234 ABC',
        ros='Bolivia: yellow centre, white edges, but many paved roads have no lines; signs on thick unpainted wooden posts; stop signs say PARE; inconsistent sign colours.',
        bos='Bolivia: several bollard styles, some without a white reflector; corner posts with coloured reflectors act like chevrons.'),
    'Chile': dict(
        lang='Spanish (Mapudungun place names)',
        script='Calle · Pasaje · Ruta · PARE',
        note="White centre lines and long white plates with no blue band separate Chile from Argentina (Mercosur plates, a yellow line beside white dashes). Mapudungun names end in -hue, -co, -che.",
        ps='bg=white; top=CHILE; txt=BB·BB·12',
        po='mat=concrete; form=rect; holes=slots; top=crossarm',
        pot='Chile: square concrete pole with indents on both sides and small pinholes near the top (fewer cross-pieces than Brazil).',
        pos='Chile: square concrete poles with indents on both sides and pinholes near the top; wooden poles in the south.',
        ro='center=white-dashed; edge=white-solid; warn=diamond-yellow; word=Calle / Pasaje',
        ros='Chile: white centre lines, unique in South America (yellow in the far south, all-yellow in Tierra del Fuego); blue direction signs; thin sign posts with a slot at the top; Ruta 5 runs the length of the country; local road letters run A to Y from north to south.',
        bos="Chile: bollards are uncommon; where present they resemble Spain's (white with a dark top)."),
    'Argentina': dict(
        lang='Spanish (Rioplatense)',
        script='Calle · Avenida · Ruta Nacional (RN) · PARE',
        note='Shares Mercosur plates and Rioplatense Spanish (vos) with Uruguay. Argentina: red-on-white chevrons, no bollards, YPF petrol stations. Uruguay: white bollards with a yellow side and triple centre lines.',
        ps='topbar=blue; top=REPÚBLICA ARGENTINA; txt=AB 123 CD',
        po='mat=concrete; form=round; top=crossarm',
        pot='Argentina: round concrete pole carrying three wires in an alternating pattern; doubled, A-shaped poles are common.',
        pos='Argentina: round concrete poles with three wires in an alternating pattern; doubled A-shaped poles; wooden poles in the Pampas.',
        ro='center=yellow-white; edge=white-solid; warn=diamond-yellow; word=Calle / Avenida',
        ros="Argentina: white dashed centre beside a solid yellow line (or double yellow); red-on-white chevrons, unique in South America; pentagon RN shields, square RP shields; small black-and-white kilometre posts; YPF petrol stations.",
        bos='Argentina: no bollards; small white kilometre posts with a black top showing the km and RN or RP.'),
    'Uruguay': dict(
        lang='Spanish (Rioplatense)',
        script='Calle · Rambla · Bulevar · Ruta · PARE',
        note='Shares Mercosur plates and Rioplatense Spanish with Argentina. Uruguay has white bollards with a yellow side and triple centre lines (yellow, white dashes, yellow), found nowhere else in the Americas.',
        ps='topbar=blue; top=URUGUAY; txt=ABC 1234',
        po='mat=concrete; form=round; top=trident',
        pot='Uruguay: concrete pole with three upward-facing insulators, like a trident.',
        pos='Uruguay: concrete trident-topped poles; a white-painted wooden pole points to Uruguay over Argentina.',
        bo='body=white; top=flat; refl=yellow-rect',
        bot='Uruguay: white bollard with a rectangular reflector near the top; one side often painted yellow.',
        bos='Uruguay: white bollards with a rectangular reflector near the top, one side often painted yellow; also stone barriers.',
        ro='center=triple; edge=white-solid; warn=diamond-yellow; word=Calle / Rambla',
        ros='Uruguay: triple centre lines (two yellow with white dashes between) where overtaking is banned, unique in the Americas; white dashes beside a yellow line elsewhere; black-and-white striped traffic-light poles; trees between pavement and road.'),
    'Paraguay': dict(
        lang='Spanish, Guaraní',
        script='Calle · Ruta PY01 · ñ · ỹ',
        note="Guaraní words with ỹ, ẽ and the puso (') appear on signs. Red soil like southern Brazil, but in Spanish; national routes were renumbered PY01–PY22 in 2019.",
        ps='topbar=blue; top=PARAGUAY; txt=ABCD 123',
        ro='center=yellow-dashed; edge=white-solid; warn=diamond-yellow; word=Calle',
        ros='Paraguay: yellow centre, white edges; black or grey sign backs; some Portuguese signs near the Itaipú dam; national routes PY01–PY22.'),
    'Brazil': dict(
        lang='Portuguese',
        script='Rua · Avenida · Rodovia · PARE · ção',
        note='The only Portuguese-speaking country in the Americas: ão, ç, nh / lh and words ending in -ção. Spanish-speaking neighbours write Calle and ñ.',
        ps='topbar=blue; top=BRASIL; txt=ABC1D23',
        ros='Brazil: yellow centre (often double), white edges; black sign backs; yellow-on-black chevrons; blue Rua / Avenida street signs; BR-xxx national roads and state roads (SP-, PR-, MG-…) with km plates; phone area codes (DDD) on shop signs.',
        bos='Brazil: no bollards; yellow-on-black chevrons and kilometre plates (BR or state code, road number, km).'),
}

COLS = {  # key -> (table, column)
    'side': ('All Countries', 'Driving'),
    'lang': ('Language Clues', 'Language'), 'script': ('Language Clues', 'Sample Script'), 'note': ('Language Clues', 'Look-alike Note'),
    'po': ('2D Visual Clues', 'Utility Poles 2D'), 'pot': ('2D Visual Clues', 'Utility Poles 2D Insight'),
    'bo': ('2D Visual Clues', 'Bollards 2D'), 'bot': ('2D Visual Clues', 'Bollards 2D Insight'),
    'ro': ('2D Visual Clues', 'Road Lines & Signs 2D'), 'ps': ('2D Visual Clues', 'Number Plate 2D'),
    'pos': ('Visual Clue Sources', 'Utility Poles Insight'), 'bos': ('Visual Clue Sources', 'Bollards Insight'),
    'arch': ('Visual Clue Sources', 'Architecture Insight'), 'ros': ('Visual Clue Sources', 'Road Lines & Signs Insight'),
}


def main():
    tables = {}
    for t in {t for t, _ in COLS.values()}:
        path = os.path.join(CSV, t + '.csv')
        rows = list(csv.reader(open(path, encoding='utf-8-sig', newline='')))
        tables[t] = (path, rows)
    changed = 0
    for country, vals in M.items():
        for k, v in vals.items():
            t, col = COLS[k]
            rows = tables[t][1]
            ci = rows[0].index(col)
            row = next(r for r in rows[1:] if r and r[0] == country)
            while len(row) <= ci: row.append('')
            if row[ci] != v: row[ci] = v; changed += 1
    for t, (path, rows) in tables.items():
        with open(path, 'w', encoding='utf-8-sig', newline='') as f:
            csv.writer(f, lineterminator='\r\n').writerows(rows)
    print('cells changed', changed)


if __name__ == '__main__':
    main()

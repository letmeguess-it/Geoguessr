# Africa meta content, release 2026-11-24. Writes into the sheet tables in data/csv/ and the camera notes in meta_extra.json
# (the Google Sheet is updated from the same values).
# Sources: the Beginner / Amateur / Pro cheatsheets (docs/cheatsheets), geotips.net (Africa page), geometas.com country pages
# (imported from Plonk It), Wikipedia's registration-plate and telephone-number articles (formats only), and general knowledge
# where marked lower-confidence in claude/Audit_Africa.md.
# Keys: lang/script/note -> Language Clues; po/pot/bo/bot/ro/ps -> 2D Visual Clues; pos/bos/ros/arch -> Visual Clue Sources (insight columns);
# plate -> All Countries (Number Plate); cam -> meta_extra.json "cam" (Google car and camera note, shown as a chip on the Key Card).
# Only the keys given are written; everything else in a row stays as it is.
# Run from the repository root: python3 -I scripts/meta/africa_2026_11.py
import csv, json, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CSV = os.path.join(ROOT, 'data', 'csv')
EXTRA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'meta_extra.json')

SA_ROAD = 'center=white-dashed; edge=yellow-solid; warn=tri-white'  # the southern African pattern

M = {
    # ---------------- Southern Africa (left-hand traffic, yellow edge lines)
    'South Africa': dict(
        lang='English, Afrikaans, Zulu, Xhosa (12 official languages)',
        script='Street · Straat · Weg · Rylaan · N1 · R61',
        note="Afrikaans (Straat, Weg, -fontein, -dorp, -kraal) narrows it to South Africa or Namibia; Namibia adds German. Australia also drives on the left, but has white edge lines; South Africa's are solid yellow.",
        ps='txt=CA 123-456; sub=WESTERN CAPE',
        po='mat=wood; form=round; top=crossarm',
        pot='South Africa: wooden poles with a crossarm, in towns and the countryside alike.',
        pos='South Africa: wooden poles in many styles, common in both rural and built-up areas; concrete and steel on big power lines.',
        ro=SA_ROAD + '; word=Street / Straat',
        ros="South Africa: white centre, solid yellow edges, often a triple white centre line; green direction signs with yellow route numbers; N (national), R (regional) and M (metro) routes; narrow red-and-white chevrons everywhere; kilometre markers on major roads; phone codes 01x north and Gauteng, 02x Western and Northern Cape, 03x KwaZulu-Natal, 04x Eastern Cape, 05x Free State.",
        bos='South Africa: slim white posts with yellow (right) and red (left) reflectors; single reflector signs at drainage ditches; kilometre markers with route and distance.',
        cam='Google car: Gen 2 halo and round blur under the car; Gen 3 shows the back of a white car; Gen 4 a sky-blue car with a short black antenna.'),
    'Namibia': dict(
        lang='English (official), Afrikaans, German, Oshiwambo',
        script='Street · Straat · Straße · B1 · C34',
        note="German street and town names (Swakopmund, Lüderitz, -straße) are unique in Africa. Roads are lettered A to D (B1, C34); South Africa uses N, R and M. Plates are yellow front and rear.",
        plate='YELLOW: Yellow plates front and rear, black text: N, a number, then the town letters (N 12345 W is Windhoek, S Swakopmund, WB Walvis Bay).',
        ps='bg=yellow; txt=N 12345 W',
        ro=SA_ROAD + '; word=Street / Straat',
        ros="Namibia: white centre, yellow edges (missing or faded on parts of the B1 and in the north); green direction signs with yellow route numbers; A, B, C and D roads; Windhoek's street signs are plain white.",
        pos='Namibia: wooden poles in open desert; yellow lamp posts in Swakopmund and Henties Bay.',
        bos='Namibia: small stone bollards at junctions (German colonial); on the C34 coast road, white posts with two yellow reflectors in front and one red behind.',
        cam='Google car: white pickup with a short antenna on the front that leans slightly to the left (Oman\'s leans right).'),
    'Botswana': dict(
        lang='English, Setswana',
        script='Road · Street · A1 · Gabo- · Ma- · Se-',
        note="Setswana names (Mo-, Ma-, Se-, Tl-, -ng: Mogoditshane, Tlokweng). Green signs with the route letter A (A1, A2, A3) are Botswana's; South Africa uses N and R. The land is flatter and emptier than South Africa.",
        plate='WHITE / YELLOW: White front, yellow rear, black text: B, three digits, three letters (B 123 ABC).',
        ps='rear=yellow; txt=B 123 ABC',
        ro=SA_ROAD + '; word=Road',
        ros="Botswana: white centre (sometimes triple), yellow edges; green signs with yellow A route numbers; sign posts and kerbs painted black and yellow in and near towns; coverage mostly along the A1, A2 and A3.",
        bos='Botswana: bollards are rare: a triangular post with the kilometre on its side near the cities, and reflector pairs (red and white arrow) at drainage ditches.',
        cam='Google car: the back of a white car is sometimes visible (the same car as South Africa, Eswatini and Lesotho).'),
    'Eswatini': dict(
        lang='English, siSwati',
        script='Road · Street · MR3 · Mb- · Ng- · -eni',
        note="siSwati names with Mb-, Ng-, Hl- and -eni (Ezulwini, Siteki, Lobamba). Route numbers start MR (MR3), and some old signs still say Swaziland. Greener and hillier than Botswana; Lesotho is higher and treeless.",
        plate='WHITE: Black letters over a picture of hills, e.g. JSD 136 AM (SD for Eswatini, the last letter for the region).',
        ps='txt=JSD 136 AM',
        po='mat=wood; form=round',
        pot='Eswatini: plain wooden pole with three insulators on its side.',
        pos='Eswatini: plain wooden poles with three insulators mounted on the side.',
        ro=SA_ROAD + '; word=Road',
        ros="Eswatini: southern African lines (white centre, often triple; yellow edges); green signs with yellow MR numbers; white-and-red guardrail reflectors; landline codes 24 Hhohho, 25 Manzini, 23 Lubombo, 22 Shiselweni.",
        arch='Eswatini: green hills with scattered brick houses and cement bus shelters.',
        cam='Google car: white car, back sometimes visible (same as South Africa).'),
    'Lesotho': dict(
        lang='Sesotho, English',
        script='Road · Ha · Thaba- · Ma- · Mo-',
        note="Sesotho villages named 'Ha …' (Ha Abia) and Thaba- (mountain). Treeless highlands with flat-topped hills and people in Basotho blankets; national roads A1 to A4, though the number is often missing from signs.",
        plate='WHITE: White plate with blue characters (red for government): one or two letters, then four digits.',
        ps='ink=blue; crest=yes; txt=A 1234',
        ro=SA_ROAD + '; word=Road',
        ros='Lesotho: white centre, yellow edges; green signs with yellow A numbers (often left off); taxis with a yellow side stripe; phone codes 22 and 28 (fixed), 5x and 6x (mobile).',
        bos='Lesotho: very rare white rectangular posts with a black base strip and black numbers; stick markers on dirt roads.',
        cam='Google car: white car, back sometimes visible (same as South Africa).'),
    # ---------------- East Africa
    'Kenya': dict(
        lang='Swahili, English',
        script='Road · Barabara · Mtaa · Karibu',
        note="Swahili (Barabara, Mtaa, Karibu) is shared with Tanzania and Uganda. Kenya: square yellow rear plates (KDA 123A) and the Google car's snorkel. Uganda: Luganda names (Ka-, Na-, Bu-) and a black bull bar on the car. Rwanda drives on the right.",
        plate='WHITE / YELLOW: Long white front plate, short yellow rear plate, black text: three letters, three digits, a letter (KDA 123A).',
        ps='rear=yellow; txt=KDA 123A',
        po='mat=wood; form=round; top=crossarm',
        pot='Kenya: wooden poles on red soil; solar street lights on new roads.',
        ro='center=yellow-dashed; edge=white-solid; warn=tri-white; word=Road',
        ros="Kenya: yellow centre line (dashed or solid), white edges; English signs; kilometre markers; coverage mostly in the south (Nairobi, Mombasa, the Rift Valley); phone codes 07xx, 01xx.",
        bos='Kenya: black-and-white striped bollards at junctions in Nairobi and Mombasa; kilometre markers on main roads.',
        cam='Google car: a pickup or SUV with a thick black snorkel on the front right (older coverage); since 2022 a different truck that may show a snorkel, an antenna, both or neither.'),
    'Uganda': dict(
        lang='English, Swahili, Luganda',
        script='Road · Street · Ka- · Na- · Bu-',
        note="Luganda names with Ka-, Na-, Bu-, Mu- (Kampala, Nakawa, Bugolobi). Kenya also drives on the left and writes English, but its Google car has a snorkel; Uganda's has a black bull bar and the soil is deep red.",
        plate='WHITE / YELLOW: White front, yellow rear (square or long), black text: U, two letters, three digits, a letter (UBA 123A).',
        ps='rear=yellow; txt=UBA 123A',
        po='mat=wood; form=round; top=crossarm',
        pot='Uganda: wooden poles, some with a strip of three voltage relays, others with a metal ring near the top.',
        pos='Uganda: two wooden pole types (a strip of three relays, or a metal ring near the top); double poles on Kampala main roads; light poles with adverts at junctions.',
        ro='center=white-dashed; edge=white-solid; warn=tri-white; word=Road',
        ros='Uganda: road lines are rare and all white; paved roads mostly around Kampala and Entebbe; sign backs with two bars and fasteners; patterned white or light-blue minibus taxis.',
        cam='Google car: boxy white SUV with a black bull bar on the front (often visible); in national parks a man with a rifle may follow the car.'),
    'Rwanda': dict(
        lang='Kinyarwanda, English, French, Swahili',
        script='Umuhanda · KN 5 Rd · KG · Murakaza neza',
        note="Kinyarwanda words with umu-, aba-, -rwa; Kigali street codes KN, KG and KK (KN 5 Rd) on almost every street. Rwanda drives on the RIGHT, unlike Uganda, Kenya and Tanzania next door.",
        plate='WHITE / YELLOW: White front, yellow rear, black text starting with R (RAD 123 A).',
        ps='rear=yellow; txt=RAD 123 A',
        po='mat=concrete; form=round',
        pot='Rwanda: tapering round or square concrete poles; light poles with blue bases on main roads.',
        pos='Rwanda: round or square tapering poles, junction poles, and light poles with blue bottoms on major roads.',
        ro='center=yellow-dashed; edge=white-solid; warn=tri-white; word=Umuhanda',
        ros='Rwanda: single yellow centre line (solid or dashed) with white edges; black-and-white kerbs; street-name signs everywhere; motorcycle taxis with red vests.',
        cam='Google car: low camera on a black (sometimes white or grey) truck with heavy blurring; the camera mount is almost always visible.'),
    'Tanzania': dict(
        lang='Swahili, English',
        script='Mtaa · Barabara · Karibu · Hifadhi',
        note="Trekker only: Mount Kilimanjaro, Gombe Stream by Lake Tanganyika (also boat coverage) and a few spots. Swahili like Kenya; look for the walker's shadow rather than a car.",
        ps='rear=yellow; txt=T 123 ABC',
        ro='word=Mtaa',
        ros='Tanzania: no road coverage; trekker paths on Kilimanjaro and in Gombe Stream National Park.',
        cam='No car: trekker and boat coverage only; the trekker\'s shadow is sometimes visible.'),
    # ---------------- West Africa
    'Nigeria': dict(
        lang='English (official), Hausa, Yoruba, Igbo',
        script='Road · Close · Crescent · ọ ẹ ṣ',
        note="English with British road words (Close, Crescent). Yoruba names with dotted ọ ẹ ṣ in the south-west, Hausa (ƙ ɗ) in the north. A police pickup or SUV following the Google car is Nigeria's giveaway.",
        plate='WHITE: North American size; white plate with green and blue text, state name at the top and slogan at the bottom (ABC 123 DE).',
        ps='size=na; ink=green; top=LAGOS; txt=ABC 123 DE; sub=CENTRE OF EXCELLENCE',
        po='mat=concrete; form=rect; holes=ladder',
        pot='Nigeria: ladder-style concrete poles, often doubled; many look broken or patched.',
        pos='Nigeria: many ladder-style concrete poles, double poles, and "broken" poles; light poles in cities.',
        ro='center=white-dashed; edge=white-solid; warn=tri-white; word=Road / Close',
        ros="Nigeria: lines mostly white (yellow edges are rare); street-sign colours change by area (Lekki and Victoria Island red, Abuja bordered arrows); green-and-white painted concrete dividers; Lagos taxis yellow with two black stripes; Abuja phone code 09.",
        cam='Google car: white or red pickup, roof rack sometimes with a yellow-and-black pattern; a police car or SUV (white, black, silver, red or tan) follows closely.'),
    'Ghana': dict(
        lang='English (official), Akan (Twi), Ewe, Ga',
        script='Road · Street · -krom · -man · ɛ ɔ',
        note="English signs; Akan shop signs use ɛ and ɔ, and towns end in -krom, -man or -ase (Kumasi, Nkawkaw). The black tape on the Google car's front-right roof bar is unique to Ghana.",
        plate='WHITE / YELLOW: White (private) or yellow (commercial, very common), black text, e.g. GR 1234-20.',
        ps='txt=GR 1234-20',
        po='mat=wood; form=round',
        pot='Ghana: wooden or concrete poles on red laterite soil.',
        ro='center=white-dashed; edge=white-solid; warn=tri-white; word=Road',
        ros='Ghana: white centre (dashed or solid), white edges mainly near towns, often no markings at all; English signs; kilometre posts naming towns; red-and-white striped posts; palms in the south, drier north.',
        bos='Ghana: UK-style posts; kilometre markers naming towns; occasional red-and-white striped poles.',
        cam='Google car: four silver roof-rack bars with black tape on the front-right bar (a rare car in central Ghana has none).'),
    'Senegal': dict(
        lang='French (official), Wolof',
        script='Rue · Route Nationale · Keur · Ndiaye',
        note="French with Wolof names (Keur-, Ndi-, Mb-: Keur Massar, Mbour). Taxis are black and yellow. Blue plates with white letters stand out in West Africa; a purple sky rift is common outside Dakar.",
        plate='BLUE: Older plates (still most common) are blue with white letters, region first (DK-1234-A, DK = Dakar); new plates since 2019 are white with a blue SN strip (AA-123-BC).',
        ps='bg=blue; ink=white; txt=DK-1234-A',
        po='mat=concrete; form=rect; holes=ladder',
        pot='Senegal: ladder-style concrete poles, like parts of France.',
        pos='Senegal: two common pole types, including French-style ladder poles; light poles in towns.',
        ro='center=white-dashed; edge=white-dashed; warn=tri-white; word=Rue',
        ros='Senegal: dashed white centre and edges (some solid or double white); French town-entry and leaving-town signs; kilometre markers with towns and distances; N and R roads; mobile numbers start 7, landlines 33 (8 Dakar, 9 elsewhere).',
        bos='Senegal: bollards are rare (some on the R1 and R2, near drains and curves); yellow-capped kilometre markers.',
        cam='Sky rift: a jagged purple / dark-blue stitching tear across the sky, common outside Dakar (Gen 3). Gen 4 shows a white or silver truck cab.'),
    'Mali': dict(
        lang='French (official), Bambara',
        script='Rue · Avenue · Grande Mosquée',
        note="Trekker only: the mud-brick mosques of Djenné, Mopti, Niono and Timbuktu, the Askia tomb in Gao and the cliff villages near Mopti. French is the working language.",
        ros='Mali: no road coverage; trekker spots at the great mosques and in the Dogon cliffs.',
        cam='No car: Gen 3 trekker coverage only.'),
    # ---------------- North Africa
    'Tunisia': dict(
        lang='Arabic, French',
        script='نهج · شارع · Rue · Avenue',
        note="Bilingual Arabic-French signs, often with نهج (nahj) for street, which other Arabic countries rarely use. Black plates with تونس in the middle; a follow car behind the Google car.",
        plate='BLACK: Long black plate with white numbers and تونس (Tunis) in Arabic in the middle (123 تونس 4567).',
        ps='bg=black; ink=white; txt=123 تونس 4567',
        pos='Tunisia: metal lattice and concrete poles; street lights with one or two lamps on top.',
        ro='center=white-dashed; edge=white-dashed; warn=tri-white; word=نهج / Rue',
        ros='Tunisia: white centre (dashed or solid), dashed white edges; red-and-white kerbs in cities; many roundabouts; signs mostly point to Tunis; kilometre stones with the route (A1, P1) and town names; coverage on the east coast from Bizerte to Djerba, plus Kairouan.',
        bos='Tunisia: French-style bollards are uncommon (corners, drains); red- or yellow-topped kilometre stones on main roads.',
        cam='Follow car: a light green Toyota north of Hammamet, a dark green Mazda south of it (none on Djerba).'),
    'Egypt': dict(
        lang='Arabic (English at sights)',
        script='شارع · ٠١٢٣٤٥ · Street',
        note="Trekker only, at four spots: the Giza pyramids, Mari Gerges street in Coptic Cairo, the Muhammad Ali mosque and Qaitbay citadel in Alexandria. Plates and prices use Eastern Arabic digits (٠–٩).",
        ps='topbar=blue; top=EGYPT مصر; txt=٤٥٦٧ ب ج د',
        ros='Egypt: walking-only landmark coverage; Arabic and English signs at the sights; phone codes 02 Cairo, 03 Alexandria.',
        arch='Egypt: sand-coloured stone and brick, minarets and domes; the pyramids at Giza.',
        cam='No car: Gen 3 trekker only; a police escort is often in view.'),
    # ---------------- Islands
    'Madagascar': dict(
        lang='Malagasy, French',
        script='Lalana · Arabe · Antana- · Ambo- · Fianar-',
        note="Malagasy words are long and vowel-heavy (Antananarivo, Ambohimanga) and never use c, q, u, w or x. Coverage is trekker, boat and a short stretch of car on the RN8 (Avenue of the Baobabs).",
        plate='WHITE: White plate, black text: four digits and three letters, the first letter for the region (1234 TBA, T = Antananarivo).',
        ps='txt=1234 TBA',
        ro='word=Lalana',
        ros='Madagascar: mostly trekker and boat coverage; baobabs near Morondava on the RN8; poles only in the larger towns; phone numbers 020 (fixed), 032 / 033 / 034 (mobile).',
        cam='Coverage: mostly trekker and boat (west coast, Sambirano river); an ox cart and a short car stretch on the RN8.'),
    'São Tomé and Príncipe': dict(
        lang='Portuguese',
        script='Rua · Avenida · Estrada · ã ç',
        note="The only Portuguese-speaking coverage in Africa (Cabo Verde and Mozambique are not covered). Black plates with white letters and cobblestone streets; Brazil and Portugal look nothing like this.",
        ps='bg=black; ink=white; txt=AB-12-34',
        ro='center=white-dashed; edge=white-solid; word=Rua',
        ros='São Tomé and Príncipe: white lines on the main island only; many cobblestone roads; few phone numbers, so they help little.',
        pos='São Tomé and Príncipe: no clear pole pattern; poles carrying many items point to the main island.',
        cam='Google car: mostly a blurred black or green truck; on Príncipe a blue truck with a black antenna.'),
    'Réunion': dict(
        lang='French, Réunion Creole',
        script='Rue · Chemin · Ravine · Îlet · Saint-',
        note="French like the mainland, but tropical and volcanic. Plates show 974 in the right band; Creole place names (Ravine, Îlet, Bras-) and many Saint- towns. Martinique has 972 and Caribbean scenery.",
        ps='band=eu-double; code=F; dept=974; txt=AB-123-CD',
        po='mat=concrete; form=rect; holes=steps; tag=blue; top=crossarm',
        pot='Réunion: the same concrete poles as mainland France.',
        pos='Réunion: mainland French pole styles across the island.',
        ro='center=white-dashed; edge=white-dashed; warn=tri-white; word=Rue / Chemin',
        ros='Réunion: dashed white centre and edges; D roads common, few N roads (the N3 crosses the mountains); blue-and-white corner arrows; phone numbers 0262 (fixed), 0692 / 0693 (mobile).',
        bos='Réunion: road markers off the road or on medians; mainland French bollards are uncommon; yellow-capped kilometre markers.',
        cam='Google car: tape on the rear passenger-side roof bar (Ghana\'s tape sits on the front right).'),
}

COLS = {  # key -> (table, column)
    'plate': ('All Countries', 'Number Plate'),
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
        tables[t] = (path, list(csv.reader(open(path, encoding='utf-8-sig', newline=''))))
    extra = json.load(open(EXTRA, encoding='utf-8'))
    changed = 0
    for country, vals in M.items():
        for k, v in vals.items():
            if k == 'cam':
                if extra['cam'].get(country) != v: extra['cam'][country] = v; changed += 1
                continue
            t, col = COLS[k]
            rows = tables[t][1]
            ci = rows[0].index(col)
            row = next(r for r in rows[1:] if r and r[0] == country)
            while len(row) <= ci: row.append('')
            if row[ci] != v: row[ci] = v; changed += 1
    for t, (path, rows) in tables.items():
        with open(path, 'w', encoding='utf-8-sig', newline='') as f:
            csv.writer(f, lineterminator='\r\n').writerows(rows)
    with open(EXTRA, 'w', encoding='utf-8') as f:
        json.dump(extra, f, ensure_ascii=False, indent=1); f.write('\n')
    print('cells changed', changed)


if __name__ == '__main__':
    main()

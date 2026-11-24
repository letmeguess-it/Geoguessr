# Pole and bollard drawings for the gaps among the 50 most-played countries, release 2026-11-24.
# "Most played" = Tier 1 plus the top of Tier 2 in the community country-streak frequency log
# (https://github.com/Crrrrrrr/geoguessr-statistics, ~43,000 rounds).
# Sources: GeoCoach (https://www.geocoach.me/theory/meta/bollards, /poles) has none of these entries, Geometas
# (https://geometas.com/metas/categories/bollards/, /poles/) has Bulgaria's bollard and Belgium's and Bulgaria's poles;
# everything else from Plonk It country guides (https://www.plonkit.net), photos looked at. All text in our own words.
# none=yes draws an empty roadside tile ("No street poles" / "No standard post"): the absence is the clue.
# Run after geocoach_2026_11.py: python3 -I scripts/meta/top50_2026_11.py, then build_data.py.
import csv, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import geocoach_2026_11 as gc

PO = {
 'DE': ('mat=wood; form=round; tag=white-small; top=crossarm; ins=3',
        "Germany: overhead lines are uncommon. Where there are poles, they are mostly round wood with a small white rectangular sticker. Round concrete poles are almost only found in the former East."),
 'BG': ('mat=concrete; form=round; top=hooks',
        "Bulgaria: round concrete poles with small hook-shaped insulators on alternating sides. Concrete ladder poles and plain wood are rarer. Tall lattice pylons that look like a small Eiffel Tower also stand by the road."),
 'NO': ('mat=wood; form=round; cap=metal; top=hooks',
        "Norway: wooden poles, usually with a small black metal cap on top. Lamps are held by one thick bolt. Small black pole plates in the south-east, larger black or red ones in Oslo."),
 'IT': ('mat=concrete; form=round; top=crossarm; ins=3; topins=yes',
        "Italy: lots of round, tapering concrete poles (unusual around the Mediterranean), often with a concrete crossbar and one insulator on the very top. Wooden poles carry a small white sticker."),
 'AT': ('mat=wood; form=round; strut=yes; top=crossarm; ins=3',
        "Austria: round wooden poles, sometimes propped into an A-frame. In Vienna and Innsbruck, poles have red-white-red tape (two thin bands in Vienna)."),
 'NL': ('none=yes',
        "Netherlands: no street-level utility poles; cables run underground and only big transmission pylons are visible. Belgium does have poles."),
 'LT': ('mat=concrete; form=square; strut=yes; top=crossarm; ins=3',
        "Lithuania: square concrete poles, often leaning on a diagonal concrete support. Short horizontal rods hold the insulators, sometimes as a trident. Metal pole tags appear in the east."),
 'CZ': ('mat=concrete; form=round; pair=yes; top=crossarm',
        "Czechia: wide round concrete poles, often standing in pairs, with a short metal bar holding the insulators. Some tops have an upside-down triangle of supports or an upward trident. Same as Slovakia."),
 'SK': ('mat=concrete; form=round; pair=yes; top=crossarm',
        "Slovakia: wide round concrete poles, often in pairs, with short metal insulator bars (same as Czechia). Wooden poles are a bit more common than in Czechia. Yellow numbered circles in Nitra and Trnava."),
 'DK': ('none=yes',
        "Denmark: street-level utility poles are rare; power runs underground, with tall pylons mainly near highways."),
 'LV': ('mat=concrete; form=round; top=hooks',
        "Latvia: hook-shaped insulators fixed on alternating sides down the pole (left, right, left). Much rarer in Estonia and Lithuania."),
 'BE': ('mat=concrete; form=square; holes=pin; top=lamp',
        "Belgium: square concrete poles with tiny holes running up them, often with small metal bands and a streetlight arm. A second type has oval holes. Traffic-light poles are striped black-yellow in Flanders and red-white in Wallonia and Brussels."),
 'HR': ('mat=concrete; form=round; top=hooks',
        "Croatia: round concrete or wooden poles. Wooden ones often have hook insulators on alternating sides, a bit like Latvia's."),
 'IS': ('none=yes',
        "Iceland: very few street poles; most cables are underground."),
 'EE': ('mat=wood; form=round; strut=yes; cap=metal; top=trident',
        "Estonia: round wooden poles, often with a diagonal support and a small metal cap; square concrete ones too. Trident tops (one insulator on top, two at the sides) are fairly common. The least consistent poles in the Baltics."),
 'GR': ('mat=darkwood; form=round; top=harp',
        "Greece: tall, dark brown wooden poles. Many have a harp-shaped metal frame and a column of five insulators. Small side lamps with a round shade."),
 'SG': ('none=yes',
        "Singapore: almost no utility poles; cables run underground."),
}

BO = {
 'BG': ('body=white; top=angled; band=black-diag; f=rect:red; b=rect:white',
        "Bulgaria: bollards are rare. When present: a white wedge post with a black band, red reflector on the front and white on the back, like Croatia's and Hungary's but less consistent (thinner posts, varying reflector shapes)."),
 'RO': ('body=white; top=flat; w=thin; f=rect:red',
        "Romania: bollards are rare: a thin white post with a red vertical strip near the top. Türkiye's is similar."),
 'NO': ('body=white; top=flat; w=thin; curve=yes; band=black-diag; f=rect:white',
        "Norway: thin, slightly curved flat post; the reflector sits inside a black parallelogram near the top. Snow poles are orange with a thin white reflector around the middle (Sweden's is wider and higher, Finland's at the very top)."),
 'IE': ('body=green; top=flat; cyl=yes; band=white-ring',
        "Ireland: round green post with a white band. Not unique to Ireland, but a strong hint against the UK."),
 'CL': ('body=white; top=angled; w=thin; cap=black-band; f=rect:white; b=rect:orange',
        "Chile: not common. Spanish-style white post with a black band: white reflector on the front, yellow-orange on the back. Orange temporary posts with two white stripes also appear."),
 'US': ('none=yes; label=varies',
        "United States: no national bollard; designs change by state. Examples: Washington, a white or brown post with a white rectangle on the front and two small squares on the back; Montana and South Dakota, a white diamond on top; Oregon, a long white rectangle; Wisconsin, white posts with black reflectors; Colorado and Wyoming, a dark metal post with a round white reflector just below the top."),
 'AR': ('none=yes',
        "Argentina: no standard bollards. Look for small white kilometre posts with a black top giving the km and the route."),
 'BR': ('none=yes',
        "Brazil: no standard bollards. Yellow-on-black chevrons and kilometre plates (BR or state code plus road number) are the roadside clues."),
 'SG': ('none=yes',
        "Singapore: no roadside posts; look for yellow kerb lines and zig-zag road markings instead."),
}

NEW_LEGEND = {
    'Utility Poles 2D|mat': 'wood | darkwood | concrete | steel | black',
    'Utility Poles 2D|holes': gc.LEGEND[2][2] + ' | pin (tiny holes, full length)',
    'Utility Poles 2D|top': gc.LEGEND[4][2] + ' | hooks (alternating hook insulators) | harp (side frame, five insulators)',
    'Utility Poles 2D|cap': 'taper (metal lightning cap) | point (pointed top) | metal (small dark cap)',
    'Utility Poles 2D|extras (=yes)': gc.LEGEND[8][2] + ' | pair (twin pole) | topins (insulator on the top); none=yes (no street poles)',
    'Bollards 2D|body': 'white | black | grey | yellow | navy | stone | orange | green | brown',
    'Bollards 2D|band': gc.LEGEND[13][2] + ' | white-ring',
    'Bollards 2D|extras': gc.LEGEND[16][2] + ' | none=yes (no standard bollard; label=varies for "varies by area")',
}


def main():
    sec = ''
    for i, (a, b, c) in enumerate(gc.LEGEND):
        sec = a or sec
        k = sec + '|' + b
        if k in NEW_LEGEND: gc.LEGEND[i] = (a, b, NEW_LEGEND[k])
    gc.main()  # rewrites the GeoCoach cells (unchanged) and the legend with the new values
    path = os.path.join(gc.CSV, '2D Visual Clues.csv')
    rows = list(csv.reader(open(path, encoding='utf-8-sig')))
    col = {h.lstrip('﻿'): i for i, h in enumerate(rows[0])}
    ac = list(csv.reader(open(os.path.join(gc.CSV, 'All Countries.csv'), encoding='utf-8-sig')))
    dcol = [h.lstrip('﻿') for h in ac[0]].index('Domain')
    by_dom = {r[dcol].strip().lstrip('.').upper(): r[0] for r in ac[1:] if r and r[0]}
    idx = {r[0]: i for i, r in enumerate(rows) if i and r}
    n = 0
    for table, (cs, ct) in ((BO, ('Bollards 2D', 'Bollards 2D Insight')), (PO, ('Utility Poles 2D', 'Utility Poles 2D Insight'))):
        for code, (spec, text) in table.items():
            r = rows[idx[by_dom[code]]]
            assert not r[col[cs]], (code, cs, r[col[cs]])  # only fill gaps
            r[col[cs]], r[col[ct]] = spec, text
            n += 1
    with open(path, 'w', encoding='utf-8-sig', newline='') as f:
        csv.writer(f).writerows(rows)
    print('top-50 cells written for', n, 'entries')


if __name__ == '__main__':
    main()

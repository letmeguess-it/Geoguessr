# Schematic route data for the African Key Cards (version 1, 2026-11-24). Rebuild site/routes.js with build_routes.py.
# Same format as route_spec_americas.py. Town coordinates are GeoNames positions (via all-the-cities); small places set by hand
# (marked # hand). A town name used in two countries carries the country code: 'Saint-Louis SN', 'Saint-Louis RE'.
# Route lists: Wikipedia and OpenStreetMap wiki road lists (Nigeria A1-A4, Ghana N-roads, Senegal N1-N7, Botswana A-roads,
# Lesotho A-roads, Kenya A8 / A2), the Plonk It Namibia guide (B-roads) and general knowledge where marked in claude/Route_Numbering_Africa.md.
C = {  # town coordinates (lat, lon)
 # South Africa
 'Cape Town': (-33.926, 18.423), 'Worcester': (-33.647, 19.449), 'Beaufort West': (-32.357, 22.583), 'Colesberg': (-30.72, 25.097),
 'Bloemfontein': (-29.121, 26.214), 'Kroonstad': (-27.65, 27.235), 'Johannesburg': (-26.202, 28.044), 'Pretoria': (-25.745, 28.188),
 'Polokwane': (-23.904, 29.469), 'Mokopane': (-24.194, 29.01), 'Musina': (-22.349, 30.041), 'Mossel Bay': (-34.183, 22.146), 'George': (-33.963, 22.462),
 'Gqeberha': (-33.961, 25.615), 'East London': (-33.015, 27.912), 'Mthatha': (-31.589, 28.784), 'Kokstad': (-30.547, 29.424),
 'Durban': (-29.858, 31.029), 'Richards Bay': (-28.783, 32.038), 'Pongola': (-27.378, 31.619), 'Ermelo': (-26.533, 29.983),
 'Pietermaritzburg': (-29.617, 30.393), 'Harrismith': (-28.273, 29.129), 'Zeerust': (-25.537, 26.075), 'Rustenburg': (-25.668, 27.242),
 'eMalahleni': (-25.871, 29.233), 'Mbombela': (-25.474, 30.97), 'Komatipoort': (-25.433, 31.955), 'Clanwilliam': (-32.182, 18.892),
 'Springbok': (-29.664, 17.887), 'Vioolsdrif': (-28.77, 17.63), 'Kimberley': (-28.732, 24.762), 'Klerksdorp': (-26.852, 26.667),  # Vioolsdrif: hand
 'Cradock': (-32.164, 25.619), 'Upington': (-28.448, 21.256), 'Komani': (-31.898, 26.875), 'Aliwal North': (-30.694, 26.711),
 'Vryburg': (-26.957, 24.728), 'Kuruman': (-27.452, 23.432), 'Nakop': (-28.1, 19.98),  # Nakop: hand
 # Namibia
 'Noordoewer': (-28.75, 17.62), 'Grünau': (-27.73, 18.37), 'Keetmanshoop': (-26.583, 18.133), 'Mariental': (-24.633, 17.967),  # Noordoewer, Grünau: hand
 'Rehoboth': (-23.317, 17.09), 'Windhoek': (-22.559, 17.083), 'Okahandja': (-21.983, 16.917), 'Otjiwarongo': (-20.464, 16.648),
 'Otavi': (-19.65, 17.333), 'Tsumeb': (-19.233, 17.717), 'Ondangwa': (-17.917, 15.95), 'Oshikango': (-17.4, 15.883),
 'Walvis Bay': (-22.957, 14.505), 'Swakopmund': (-22.678, 14.527), 'Karibib': (-21.933, 15.833), 'Lüderitz': (-26.648, 15.154),
 'Aus': (-26.66, 16.27), 'Gobabis': (-22.45, 18.967), 'Buitepos': (-22.28, 19.99), 'Grootfontein': (-19.567, 18.117),  # Aus, Buitepos: hand
 'Rundu': (-17.933, 19.767), 'Katima Mulilo': (-17.5, 24.267), 'Karasburg': (-28.017, 18.75), 'Ariamsvlei': (-28.12, 19.83),  # Ariamsvlei: hand
 # Botswana
 'Ramatlabama': (-25.64, 25.57), 'Lobatse': (-25.224, 25.677), 'Gaborone': (-24.655, 25.909), 'Mahalapye': (-23.104, 26.814),  # Ramatlabama: hand
 'Palapye': (-22.546, 27.125), 'Francistown': (-21.17, 27.508), 'Ramokgwebana': (-20.6, 27.67), 'Kanye': (-24.967, 25.333),  # Ramokgwebana: hand
 'Jwaneng': (-24.602, 24.728), 'Sekoma': (-24.4, 23.883), 'Kang': (-23.675, 22.788), 'Ghanzi': (-21.698, 21.646), 'Mamuno': (-22.28, 20.03),  # Mamuno: hand
 'Nata': (-20.217, 26.183), 'Gweta': (-20.183, 25.233), 'Maun': (-19.983, 23.417), 'Sehithwa': (-20.467, 22.717), 'Kasane': (-17.802, 25.16),
 'Shakawe': (-18.365, 21.842), 'Pandamatenga': (-18.528, 25.627),
 # Lesotho (St. Michael's, Mantsonyane, Hlotse, Oxbow, Mohale's Hoek, Qacha's Nek: hand)
 'Maseru': (-29.317, 27.483), 'Teyateyaneng': (-29.147, 27.749), 'Maputsoe': (-28.887, 27.899), 'Hlotse': (-28.87, 28.05),
 'Butha-Buthe': (-28.767, 28.249), 'Oxbow': (-28.73, 28.62), 'Mokhotlong': (-29.289, 29.068), 'Mafeteng': (-29.823, 27.237),
 "Mohale's Hoek": (-30.15, 27.48), 'Quthing': (-30.4, 27.7), "Qacha's Nek": (-30.12, 28.69), 'Thaba-Tseka': (-29.522, 28.608),
 "St. Michael's": (-29.42, 27.66), 'Mantsonyane': (-29.5, 28.27),
 # Kenya (Namanga, Isebania, Lokichogio: hand)
 'Mombasa': (-4.055, 39.664), 'Voi': (-3.396, 38.556), 'Mtito Andei': (-2.69, 38.167), 'Athi River': (-1.456, 36.978), 'Nairobi': (-1.283, 36.817),
 'Naivasha': (-0.714, 36.433), 'Nakuru': (-0.307, 36.072), 'Eldoret': (0.52, 35.27), 'Webuye': (0.6, 34.771), 'Malaba': (0.635, 34.282),
 'Namanga': (-2.55, 36.79), 'Kajiado': (-1.852, 36.777), 'Thika': (-1.033, 37.069), 'Nanyuki': (0.006, 37.074), 'Isiolo': (0.355, 37.582),
 'Marsabit': (2.335, 37.991), 'Moyale': (3.527, 39.056), 'Isebania': (-1.24, 34.48), 'Kisii': (-0.682, 34.767), 'Kisumu': (-0.102, 34.762),
 'Kitale': (1.016, 35.006), 'Lodwar': (3.12, 35.596), 'Lokichogio': (4.2, 34.35),
 # Nigeria
 'Lagos': (6.454, 3.395), 'Ibadan': (7.378, 3.906), 'Oyo': (7.853, 3.931), 'Ogbomoso': (8.134, 4.24), 'Ilorin': (8.497, 4.542), 'Jebba': (9.12, 4.824),
 'Mokwa': (9.295, 5.054), 'Kontagora': (10.403, 5.471), 'Sokoto': (13.063, 5.243), 'Illela': (13.731, 5.298), 'Port Harcourt': (4.777, 7.013),
 'Warri': (5.517, 5.75), 'Benin City': (6.338, 5.626), 'Auchi': (7.068, 6.264), 'Okene': (7.551, 6.236), 'Lokoja': (7.797, 6.74), 'Abuja': (9.058, 7.495),
 'Kaduna': (10.526, 7.439), 'Zaria': (11.111, 7.723), 'Kano': (12.0, 8.517), 'Aba': (5.107, 7.367), 'Umuahia': (5.525, 7.495), 'Enugu': (6.441, 7.499),
 'Makurdi': (7.734, 8.521), 'Lafia': (8.494, 8.515), 'Jos': (9.928, 8.892), 'Bauchi': (10.31, 9.844), 'Potiskum': (11.714, 11.081),
 'Damaturu': (11.747, 11.961), 'Maiduguri': (11.847, 13.157), 'Gamboru': (12.373, 14.207), 'Calabar': (4.959, 8.327), 'Ikom': (5.967, 8.706),
 'Katsina-Ala': (7.169, 9.285), 'Wukari': (7.871, 9.778), 'Numan': (9.464, 12.031), 'Bama': (11.521, 13.69),
 # Ghana (Elubo, Yamoransa, Nkawkaw, Paga, Enchi, Bamboi, Lawra, Hamile, Bimbila, Nkwanta, Kulungugu: hand)
 'Elubo': (5.28, -2.78), 'Takoradi': (4.898, -1.76), 'Cape Coast': (5.105, -1.247), 'Yamoransa': (5.18, -1.27), 'Winneba': (5.351, -0.623),
 'Accra': (5.556, -0.197), 'Tema': (5.67, -0.017), 'Aflao': (6.12, 1.19), 'Hohoe': (7.152, 0.474), 'Nkwanta': (8.27, 0.52), 'Bimbila': (8.86, 0.06),
 'Yendi': (9.443, -0.01), 'Bawku': (11.062, -0.242), 'Kulungugu': (10.98, 0.0), 'Nsawam': (5.809, -0.35), 'Nkawkaw': (6.55, -0.77),
 'Kumasi': (6.688, -1.624), 'Dunkwa': (5.96, -1.778), 'Bekwai': (6.452, -1.579), 'Techiman': (7.591, -1.939), 'Kintampo': (8.056, -1.731),
 'Tamale': (9.401, -0.839), 'Bolgatanga': (10.786, -0.851), 'Paga': (10.99, -1.11), 'Enchi': (5.82, -2.82), 'Sunyani': (7.34, -2.327),
 'Bamboi': (8.15, -2.03), 'Wa': (10.061, -2.502), 'Lawra': (10.65, -2.9), 'Hamile': (10.98, -2.87),
 # Senegal (Rufisque, Mbour, Kidira, Richard Toll, Ourossogui, Bakel, Linguère, Diouloulou, Karang: hand)
 'Dakar': (14.694, -17.444), 'Rufisque': (14.72, -17.27), 'Mbour': (14.42, -16.97), 'Fatick': (14.332, -16.405), 'Kaolack': (14.152, -16.073),
 'Kaffrine': (14.106, -15.551), 'Tambacounda': (13.771, -13.667), 'Kidira': (14.46, -12.21), 'Thiès': (14.789, -16.926), 'Louga': (15.619, -16.224),
 'Saint-Louis SN': (16.018, -16.49), 'Richard Toll': (16.46, -15.7), 'Ourossogui': (15.6, -13.32), 'Matam': (15.656, -13.255), 'Bakel': (14.9, -12.46),
 'Diourbel': (14.648, -16.244), 'Touba': (14.85, -15.883), 'Linguère': (15.39, -15.12), 'Nioro du Rip': (13.75, -15.8), 'Bignona': (12.81, -16.226),
 'Ziguinchor': (12.568, -16.273), 'Diouloulou': (13.04, -16.58), 'Karang': (13.58, -16.47), 'Sokone': (13.883, -16.367), 'Vélingara': (13.15, -14.117),
 'Kolda': (12.894, -14.941), 'Kédougou': (12.556, -12.181),
 # Tunisia (Enfidha, Oued Zarga, Ras Jedir: hand)
 'Tunis': (36.819, 10.166), 'Hammamet': (36.4, 10.617), 'Enfidha': (36.13, 10.38), 'Sousse': (35.825, 10.637), 'El Jem': (35.3, 10.717),
 'Sfax': (34.741, 10.76), 'Gabès': (33.881, 10.098), 'Medenine': (33.355, 10.505), 'Ben Gardane': (33.138, 11.22), 'Ras Jedir': (33.17, 11.56),
 'Bizerte': (37.274, 9.874), 'Mateur': (37.04, 9.666), 'Medjez el Bab': (36.65, 9.612), 'Oued Zarga': (36.67, 9.43), 'Kairouan': (35.678, 10.096),
 # Réunion
 'Saint-Denis': (-20.882, 55.45), 'La Possession': (-20.929, 55.335), 'Le Port': (-20.938, 55.294), 'Saint-Paul': (-21.01, 55.271),
 'Saint-Leu': (-21.171, 55.288), 'Saint-Louis RE': (-21.286, 55.411), 'Saint-Pierre': (-21.339, 55.478), 'Le Tampon': (-21.277, 55.518),
 'Saint-Joseph': (-21.378, 55.617), 'Saint-Philippe': (-21.361, 55.768), 'Sainte-Rose': (-21.129, 55.796), 'Saint-Benoît': (-21.038, 55.715),
 'Saint-André': (-20.963, 55.65), 'Sainte-Marie': (-20.897, 55.551), 'Plaine des Cafres': (-21.21, 55.57), 'Cilaos': (-21.136, 55.472),  # Plaine des Cafres: hand
}


def R(n, g, towns):
    return (n, g, [C[t] for t in towns])


TAH = ('Trans-African Highways (TAH 1 to 9, such as TAH 4 Cairo to Cape Town and TAH 7 Dakar to Lagos) link the capitals, '
       'but they are hardly ever signed; the national numbers are what you see.')

S = {}
S['ZA'] = dict(a3='ZAF', hubs=['Johannesburg'], n=TAH, routes=[
    R('N1', 'rad', ['Cape Town', 'Worcester', 'Beaufort West', 'Colesberg', 'Bloemfontein', 'Kroonstad', 'Johannesburg', 'Pretoria', 'Mokopane', 'Polokwane', 'Musina']),
    R('N3', 'rad', ['Johannesburg', 'Harrismith', 'Pietermaritzburg', 'Durban']),
    R('N4', 'rad', ['Zeerust', 'Rustenburg', 'Pretoria', 'eMalahleni', 'Mbombela', 'Komatipoort']),
    R('N12', 'rad', ['George', 'Beaufort West', 'Kimberley', 'Klerksdorp', 'Johannesburg', 'eMalahleni']),
    R('N14', 'rad', ['Springbok', 'Upington', 'Kuruman', 'Vryburg', 'Pretoria']),
    R('N2', 'oth', ['Cape Town', 'Mossel Bay', 'George', 'Gqeberha', 'East London', 'Mthatha', 'Kokstad', 'Durban', 'Richards Bay', 'Pongola', 'Ermelo']),
    R('N7', 'oth', ['Cape Town', 'Clanwilliam', 'Springbok', 'Vioolsdrif']),
    R('N10', 'oth', ['Gqeberha', 'Cradock', 'Colesberg', 'Upington', 'Nakop']),
    R('N6', 'oth', ['East London', 'Komani', 'Aliwal North', 'Bloemfontein'])],
    legend=[('rad', 'N routes into Gauteng (Johannesburg / Pretoria)'), ('oth', 'Other N routes: the N2 coast road, N7 west coast, N10, N6')],
    s='National roads are N1 to N18, with no odd-even rule; most of the long ones meet in Gauteng, and the N2 follows the coast from Cape Town to Durban and beyond. '
      'Regional roads are R plus two digits (R21 to R81, main) or three digits (lesser roads); M numbers are metro roads inside the big cities. '
      'Signs are green with the route number in yellow, and kilometre markers give the route and distance.')
S['NA'] = dict(a3='NAM', hubs=['Windhoek'], n=TAH, routes=[
    R('B1', 'rad', ['Noordoewer', 'Grünau', 'Keetmanshoop', 'Mariental', 'Rehoboth', 'Windhoek', 'Okahandja', 'Otjiwarongo', 'Otavi', 'Tsumeb', 'Ondangwa', 'Oshikango']),
    R('B6', 'rad', ['Windhoek', 'Gobabis', 'Buitepos']),
    R('B2', 'oth', ['Walvis Bay', 'Swakopmund', 'Karibib', 'Okahandja']),
    R('B4', 'oth', ['Lüderitz', 'Aus', 'Keetmanshoop']),
    R('B3', 'oth', ['Grünau', 'Karasburg', 'Ariamsvlei']),
    R('B8', 'oth', ['Otavi', 'Grootfontein', 'Rundu', 'Katima Mulilo'])],
    legend=[('rad', 'B1 and B6 through Windhoek'), ('oth', 'Other B (trunk) roads')],
    s='Namibia letters its roads by class: B for trunk roads (B1 runs the length of the country, from the Orange River via Windhoek to the Angolan border), '
      'C for main roads (C34 along the Skeleton Coast) and D for district roads, plus a short A1 motorway north of Windhoek. '
      'South Africa uses N and R, so a lettered B or C road on a green sign points to Namibia.')
S['BW'] = dict(a3='BWA', hubs=['Gaborone'], n=TAH, routes=[
    R('A1', 'rad', ['Ramatlabama', 'Lobatse', 'Gaborone', 'Mahalapye', 'Palapye', 'Francistown', 'Ramokgwebana']),
    R('A2', 'oth', ['Lobatse', 'Kanye', 'Jwaneng', 'Sekoma', 'Kang', 'Mamuno']),
    R('A3', 'oth', ['Francistown', 'Nata', 'Gweta', 'Maun', 'Sehithwa', 'Ghanzi']),
    R('A33', 'oth', ['Nata', 'Pandamatenga', 'Kasane']),
    R('A35', 'oth', ['Sehithwa', 'Shakawe'])],
    legend=[('rad', 'A1: the eastern spine through Gaborone'), ('oth', 'Other A roads')],
    s='Botswana uses A for its main roads and B for distributor roads. The A1 runs up the east side from the South African border via Gaborone and Francistown to Zimbabwe, '
      'the A2 (Trans-Kalahari) goes west from Lobatse to Namibia, and the A3 north-west from Francistown via Maun to Ghanzi. '
      'Two-digit A numbers branch off the road with their first digit (A33 and A35 leave the A3).')
S['LS'] = dict(a3='LSO', hubs=['Maseru'], n=TAH, routes=[
    R('A1', 'rad', ['Maseru', 'Teyateyaneng', 'Maputsoe', 'Hlotse', 'Butha-Buthe', 'Oxbow', 'Mokhotlong']),
    R('A2', 'rad', ['Maseru', 'Mafeteng', "Mohale's Hoek", 'Quthing']),
    R('A3', 'rad', ['Maseru', "St. Michael's", 'Mantsonyane', 'Thaba-Tseka', 'Mokhotlong']),
    R('A4', 'oth', ['Quthing', "Qacha's Nek", 'Thaba-Tseka'])],
    legend=[('rad', 'A1 to A3 leave Maseru'), ('oth', 'A4 through the southern highlands')],
    s='Lesotho numbers its main roads A1 to A99 (B, C and D for smaller roads). From Maseru the A1 (Main North) runs to Butha-Buthe and up to Mokhotlong, '
      'the A2 (Main South) to Mafeteng and Quthing, and the A3 into the mountains to Thaba-Tseka; the A4 links Quthing, Qacha\'s Nek and Thaba-Tseka. '
      'Signs are green as in South Africa, but the number is often left off.')
S['KE'] = dict(a3='KEN', hubs=['Nairobi'], n=TAH, routes=[
    R('A8', 'rad', ['Mombasa', 'Voi', 'Mtito Andei', 'Athi River', 'Nairobi', 'Naivasha', 'Nakuru', 'Eldoret', 'Webuye', 'Malaba']),
    R('A2', 'rad', ['Namanga', 'Kajiado', 'Athi River', 'Nairobi', 'Thika', 'Nanyuki', 'Isiolo', 'Marsabit', 'Moyale']),
    R('A1', 'oth', ['Isebania', 'Kisii', 'Kisumu', 'Kitale', 'Lodwar', 'Lokichogio'])],
    legend=[('rad', 'A8 and A2 through Nairobi'), ('oth', 'A1 in the west')],
    s='Kenya classes its trunk roads A (international), B (national) and C (primary). Since the 2016 renumbering the Mombasa-Nairobi-Malaba highway is the A8 '
      'and the Namanga-Nairobi-Moyale road the A2, but older East African numbers are still on many signs: A109 (Mombasa-Nairobi) and A104 (Namanga-Nairobi-Malaba).')
S['NG'] = dict(a3='NGA', hubs=['Abuja'], n=TAH, routes=[
    R('A1', 'odd', ['Lagos', 'Ibadan', 'Oyo', 'Ogbomoso', 'Ilorin', 'Jebba', 'Mokwa', 'Kontagora', 'Sokoto', 'Illela']),
    R('A2', 'odd', ['Port Harcourt', 'Warri', 'Benin City', 'Auchi', 'Okene', 'Lokoja', 'Abuja', 'Kaduna', 'Zaria', 'Kano']),
    R('A3', 'odd', ['Port Harcourt', 'Aba', 'Umuahia', 'Enugu', 'Makurdi', 'Lafia', 'Jos', 'Bauchi', 'Potiskum', 'Damaturu', 'Maiduguri', 'Gamboru']),
    R('A4', 'odd', ['Calabar', 'Ikom', 'Katsina-Ala', 'Wukari', 'Numan', 'Maiduguri', 'Bama'])],
    legend=[('odd', 'A1 to A4: south-north trunk roads, numbered west to east')],
    s='Nigeria\'s four long trunk roads all run from the coast to the north and are numbered from west to east: A1 from Lagos to Sokoto, A2 from Port Harcourt via Benin City and Abuja to Kano, '
      'A3 from Port Harcourt via Enugu and Jos to Maiduguri, and A4 from Calabar along the Cameroon border to Maiduguri. '
      'Other trunk roads take a number from the A roads they join (A5, A121, A232, A342 between the A3 and A4); B and C roads belong to the states.')
S['GH'] = dict(a3='GHA', hubs=['Accra'], n=TAH, routes=[
    R('N1', 'oth', ['Elubo', 'Takoradi', 'Cape Coast', 'Yamoransa', 'Winneba', 'Accra', 'Tema', 'Aflao']),
    R('N2', 'even', ['Tema', 'Hohoe', 'Nkwanta', 'Bimbila', 'Yendi', 'Bawku', 'Kulungugu']),
    R('N6', 'even', ['Accra', 'Nsawam', 'Nkawkaw', 'Kumasi']),
    R('N8', 'even', ['Yamoransa', 'Dunkwa', 'Bekwai', 'Kumasi']),
    R('N10', 'even', ['Kumasi', 'Techiman', 'Kintampo', 'Tamale', 'Bolgatanga', 'Paga']),
    R('N12', 'even', ['Elubo', 'Enchi', 'Sunyani', 'Bamboi', 'Wa', 'Lawra', 'Hamile'])],
    legend=[('oth', 'N1: the coast road, Côte d\'Ivoire to Togo'), ('even', 'Even N roads run north, rising roughly east to west (N2 to N12)')],
    s='Ghana\'s national roads are N1 to N18, regional roads R plus a number, and inter-regional roads IR. The N1 follows the coast from Elubo through Takoradi, Cape Coast and Accra to Aflao. '
      'The even numbers head inland: N2 up the Volta side, N6 Accra-Kumasi, N8 Cape Coast-Kumasi, N10 Kumasi-Tamale-Paga up the middle, and N12 along the western border to Wa.')
S['SN'] = dict(a3='SEN', hubs=['Dakar'], n=TAH, routes=[
    R('N1', 'rad', ['Dakar', 'Rufisque', 'Mbour', 'Fatick', 'Kaolack', 'Kaffrine', 'Tambacounda', 'Kidira']),
    R('N2', 'rad', ['Dakar', 'Rufisque', 'Thiès', 'Louga', 'Saint-Louis SN', 'Richard Toll', 'Ourossogui', 'Matam', 'Bakel', 'Kidira']),
    R('N3', 'rad', ['Thiès', 'Diourbel', 'Touba', 'Linguère', 'Ourossogui']),
    R('N4', 'oth', ['Kaolack', 'Nioro du Rip', 'Bignona', 'Ziguinchor']),
    R('N5', 'oth', ['Kaolack', 'Sokone', 'Karang', 'Diouloulou', 'Bignona']),
    R('N6', 'oth', ['Tambacounda', 'Vélingara', 'Kolda', 'Ziguinchor']),
    R('N7', 'oth', ['Ourossogui', 'Tambacounda', 'Kédougou'])],
    legend=[('rad', 'N1 to N3 leave Dakar / Thiès'), ('oth', 'N4 to N7 inland and to Casamance')],
    s='Senegal has seven national roads, N1 to N7, plus R regional roads and the toll autoroutes (A1 Dakar-Mbour, A2 to Touba). '
      'N1 heads south-east via Kaolack and Tambacounda to Mali, N2 north via Thiès and Saint-Louis and then along the Senegal river, N3 inland via Touba. '
      'N4 and N5 cross The Gambia to Casamance; N6 goes round it via Kolda; N7 runs south to Kédougou.')
S['TN'] = dict(a3='TUN', hubs=['Tunis'], n=TAH, routes=[
    R('A1', 'rad', ['Tunis', 'Hammamet', 'Enfidha', 'Sousse', 'El Jem', 'Sfax', 'Gabès']),
    R('A4', 'rad', ['Tunis', 'Mateur', 'Bizerte']),
    R('A3', 'rad', ['Tunis', 'Medjez el Bab', 'Oued Zarga']),
    R('RN1', 'oth', ['Gabès', 'Medenine', 'Ben Gardane', 'Ras Jedir']),
    R('RN12', 'oth', ['Sousse', 'Kairouan'])],
    legend=[('rad', 'A motorways leave Tunis (toll)'), ('oth', 'RN national roads')],
    s='Tunisia\'s toll motorways are A1 (Tunis-Sousse-Sfax-Gabès, being extended to Libya), A3 west to Oued Zarga and A4 to Bizerte. '
      'National roads are RN (formerly GP) plus a number; RN1 runs down the whole coast from Tunis to the Libyan border at Ras Jedir. '
      'Kilometre stones show the route number and the towns ahead, and most direction signs point to Tunis.')
S['RE'] = dict(a3='FRA', bbox=(55.2, -21.42, 55.86, -20.85), hubs=['Saint-Denis'], n='', routes=[
    R('N1', 'rad', ['Saint-Denis', 'La Possession', 'Le Port', 'Saint-Paul', 'Saint-Leu', 'Saint-Louis RE', 'Saint-Pierre']),
    R('N2', 'rad', ['Saint-Denis', 'Sainte-Marie', 'Saint-André', 'Saint-Benoît', 'Sainte-Rose', 'Saint-Philippe', 'Saint-Joseph', 'Saint-Pierre']),
    R('N3', 'oth', ['Saint-Pierre', 'Le Tampon', 'Plaine des Cafres', 'Saint-Benoît']),
    R('N5', 'oth', ['Saint-Louis RE', 'Cilaos'])],
    legend=[('rad', 'N1 west coast and N2 east coast from Saint-Denis'), ('oth', 'N3 across the island, N5 up to Cilaos')],
    s='Réunion uses French numbering: N roads (national) and D roads (departmental, by far the most common on signs). '
      'The N1 runs down the dry west coast from Saint-Denis to Saint-Pierre and the N2 round the wet east side; the N3 crosses the middle over the Plaine des Cafres, '
      'and the N5 climbs to Cilaos.')

TEXT = {  # (text, footnote)
 'SZ': ('Eswatini numbers its main roads MR (main road) plus a number. The MR3 is the main east-west road, from the Ngwenya border via Mbabane and Manzini towards Mozambique, and the MR1 runs north from Mbabane to Pigg\'s Peak. Signs are green with yellow MR numbers, as in South Africa.', TAH),
 'UG': ('Uganda\'s main roads are known by name and fan out from Kampala: Entebbe Road, Jinja Road (east to Kenya), Masaka Road (south-west) and the Gulu and Hoima roads (north). Route numbers are rarely signed, and most coverage is around Kampala and Entebbe.', TAH),
 'RW': ('Rwanda\'s national roads (RN) leave Kigali, such as RN1 south to Huye and RN3 east towards Tanzania. In Kigali every street has a code: KN (Nyarugenge), KG (Gasabo) or KK (Kicukiro) plus a number, as in KN 5 Rd, on blue signs.', TAH),
 'TZ': ('Tanzania numbers its trunk roads T plus a number (T1 runs from Dar es Salaam via Morogoro and Iringa to Mbeya), but its coverage is trekker only (Kilimanjaro, Gombe Stream), so route numbers never appear.', TAH),
 'ML': ('Mali numbers its routes nationales RN plus a number, but its coverage is trekker only, at the great mosques and the Dogon cliffs, so route numbers do not help.', TAH),
 'EG': ('Egypt\'s coverage is walking-only at four landmarks (Giza, Coptic Cairo, the Citadel and Alexandria), so road numbers never appear.', TAH),
 'MG': ('Madagascar\'s routes nationales (RN) fan out from Antananarivo: RN7 south to Fianarantsoa and Toliara, RN2 east to Toamasina, RN4 north-west to Mahajanga. The only car coverage is a stretch of the RN8 north of Morondava, through the Avenue of the Baobabs.', ''),
 'ST': ('São Tomé\'s few roads follow the coast north and south from the capital, with a short network on Príncipe; route numbers are not signed in a useful way.', ''),
}

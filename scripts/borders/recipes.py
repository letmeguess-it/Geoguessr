# How each country's regions are built. Default: Natural Earth 10m admin-1 units grouped to the sheet's regions.
# 'gb' = geoBoundaries ADM1 (current borders) cut to the Natural Earth country outline.
# 'layers' = extra shapes that take priority over the base (newer provinces built from ADM2 districts, cities carved out of districts).
from common import GBD as GB

def gb(a3, adm='ADM1'):
    return GB + (a3 + '.geojson' if adm == 'ADM1' else 'gbOpen_%s_%s.geojson' % (a3, adm))

VN_MERGE = {  # 2025 merger, old province -> new province (Resolution 202/2025/QH15)
    'Hà Giang': 'Tuyên Quang', 'Yên Bái': 'Lào Cai', 'Bắc Kạn': 'Thái Nguyên', 'Đông Bắc': 'Thái Nguyên',
    'Vĩnh Phúc': 'Phú Thọ', 'Hòa Bình': 'Phú Thọ', 'Bắc Giang': 'Bắc Ninh', 'Thái Bình': 'Hưng Yên',
    'Hải Dương': 'Hải Phòng (city)', 'Hà Nam': 'Ninh Bình', 'Nam Định': 'Ninh Bình', 'Quảng Bình': 'Quảng Trị',
    'Quàng Nam': 'Đà Nẵng (city)', 'Quảng Nam': 'Đà Nẵng (city)', 'Kon Tum': 'Quảng Ngãi', 'Bình Định': 'Gia Lai',
    'Ninh Thuận': 'Khánh Hòa', 'Đắk Nông': 'Lâm Đồng', 'Bình Thuận': 'Lâm Đồng', 'Phú Yên': 'Đắk Lắk',
    'Bình Dương': 'Hồ Chí Minh City', 'Bà Rịa - Vũng Tàu': 'Hồ Chí Minh City', 'Bình Phước': 'Đồng Nai',
    'Long An': 'Tây Ninh', 'Sóc Trăng': 'Cần Thơ (city)', 'Hau Giang': 'Cần Thơ (city)', 'Hậu Giang': 'Cần Thơ (city)',
    'Bến Tre': 'Vĩnh Long', 'Trà Vinh': 'Vĩnh Long', 'Tiền Giang': 'Đồng Tháp', 'Bạc Liêu': 'Cà Mau', 'Kiên Giang': 'An Giang',
}

R = {
    # ---------------- geoBoundaries, current borders
    'AF': {'src': gb('AFG')}, 'BD': {'src': gb('BGD'), 'alias': {'Rajshani': 'Rajshahi', 'Chittagong': 'Chattogram', 'Barisal': 'Barishal'}},
    'KH': {'src': gb('KHM')}, 'GH': {'src': gb('GHA')}, 'IN': {'src': gb('IND')}, 'KE': {'src': gb('KEN')},
    'XK': {'src': gb('XKX')}, 'LA': {'src': gb('LAO')}, 'LU': {'src': gb('LUX')}, 'MK': {'src': gb('MKD')},
    'BA': {'src': gb('BIH')}, 'PA': {'src': gb('PAN'), 'layers': [{'adm2': gb('PAN', 'ADM3'), 'names': ['TERIBE'], 'to': 'Naso Tjër Di'}]}, 'QA': {'src': gb('QAT')}, 'TW': {'src': gb('TWN')},
    'GL': {'src': gb('GRL'), 'keep_out': ['Northeast Greenland National Park']},
    'NP': {'src': gb('NPL'), 'alias': {'Province 1': 'Koshi', 'Province 2': 'Madhesh', 'Sudurpaschim': 'Sudurpashchim'}},
    'LB': {'src': gb('LBN'), 'alias': {'Keserwan-Jbeil': 'Mount Lebanon'}},
    'ME': {'src': gb('MNE')},
    'ST': {'src': gb('STP', 'ADM2'), 'alias': {'Pagué': 'Príncipe', 'Mé-zóxi': 'Mé-Zóchi', 'Lemba': 'Lembá'}},
    'KG': {'src': gb('KGZ'), 'layers': [{'ne': ['Bishkek'], 'to': 'Bishkek (city)'}]},
    'BW': {'src': gb('BWA'), 'layers': [{'ne': [n], 'to': t} for n, t in [('Francistown', 'Francistown'), ('Gaborone', 'Gaborone'), ('Jwaneng', 'Jwaneng'), ('Lobatse', 'Lobatse'), ('Selebi-Phikwe', 'Selebi-Phikwe'), ('Sowa', 'Sowa Town')]]},
    'MG': {'src': gb('MDG'), 'alias': {'Matsiatra Ambony': 'Haute Matsiatra'}, 'layers': [
        {'adm2': gb('MDG', 'ADM2'), 'names': ['Mananjary', 'Nosy-Varika', 'Ifanadiana'], 'to': 'Vatovavy'},
        {'adm2': gb('MDG', 'ADM2'), 'names': ['Manakara Atsimo', 'Vohipeno', 'Ikongo'], 'to': 'Fitovinany'}]},
    'KZ': {'src': gb('KAZ'), 'layers': 'KZ', 'alias': {'South Kazakhstan Region': 'Turkistan'}},
    'ID': {'src': gb('IDN'), 'layers': 'ID'},
    'PH': {'src': gb('PHL'), 'layers': [{'adm2': gb('PHL', 'ADM2'), 'names': ['Negros Occidental', 'Negros Oriental', 'Siquijor'], 'to': 'Negros Island Region'},
                                        {'adm2': gb('PHL', 'ADM2'), 'names': ['Cotabato City'], 'to': 'Bangsamoro (BARMM)'}],
           'alias': {'ARMM': 'Bangsamoro (BARMM)'}},
    # ---------------- Natural Earth, regrouped or completed
    'VN': {'assign': VN_MERGE, 'assign_extra': {'Đông Nam Bộ': 'Đồng Nai', 'Đồng Bằng Sông Hồng': 'Hưng Yên'}},
    'NO': {'assign': {'Nord-Trøndelag': 'Trøndelag', 'Sør-Trøndelag': 'Trøndelag', 'Hedmark': 'Innlandet', 'Oppland': 'Innlandet',
                      'Aust-Agder': 'Agder', 'Vest-Agder': 'Agder', 'Hordaland': 'Vestland', 'Sogn og Fjordane': 'Vestland'}},
    'PK': {'assign': {'F.A.T.A.': 'Khyber Pakhtunkhwa'}},
    'IE': {'assign': {'Dún Laoghaire–Rathdown': 'Dublin', 'Fingal': 'Dublin', 'South Dublin': 'Dublin', 'South Tipperary': 'Tipperary', 'North Tipperary': 'Tipperary'}},
    'ES': {'assign': {'Navarra': 'Navarra', 'Valenciana': 'Valencian Community', 'Castellón': 'Valencian Community', 'Alicante': 'Valencian Community', 'Canary Is.': 'Canary Islands (Canarias)'}},
    'SI': {'assign_region': True, 'assign': {'Spodnjeposavska': 'Lower Sava (Posavska)', 'Jugovzhodna Slovenija': 'Southeast Slovenia (Jugovzhodna)',
                      'Notranjsko-kraška': 'Littoral-Inner Carniola (Primorsko-notranjska)'}},
    'MX': {'assign': {'Distrito Federal': 'Ciudad de México'}, 'enclave': True},
    'HU': {'enclave': True},
    'HR': {'assign_at': [('Brodsko-Posavska', 17.6, 45.35, 'Požega-Slavonia')]},
    'RS': {'assign_at': [('Pomoravski', 21.2, 43.5, 'Rasina')]},
    'TN': {'src': gb('TUN')},
    'PE': {'assign': {'Lima': 'Lima Region', 'Lima Province': 'Lima Metropolitan', 'Callao': 'Callao', 'Puno': 'Puno'}},
    'CO': {'assign': {'Bogota': 'Bogotá D.C.', 'Cundinamarca': 'Cundinamarca'}, 'enclave': True},
    'IS': {'assign': {'Reykjavík': 'Capital Region (Höfuðborgarsvæði)'}},
    'UK': {'by': 'geonunit'},
    'NA': {'assign': {'Kavango': 'Kavango East'}, 'layers': [{'adm2': gb('NAM', 'ADM2'), 'names': ['Kahenge', 'Kapako', 'Mpungu'], 'to': 'Kavango West'}]},
    'RU': {'enclave': True, 'assign': {'Moskovskaya': 'Moscow Oblast', 'Moskva': 'Moscow (city)'}},
    'UA': {'assign': {'Kiev': 'Kyiv Oblast', 'Kiev City': 'Kyiv (city)'}}, 'AE': {'enclave': True},
    'AU': {'assign': {'Lord Howe Island': 'New South Wales', 'Macquarie Island': 'Tasmania'}},
    'ML': {'layers': [{'adm2': gb('MLI', 'ADM2'), 'names': ['Menaka'], 'to': 'Ménaka'},
                      {'adm2': gb('MLI', 'ADM3'), 'names': ['Salam'], 'to': 'Taoudénit'}]},
    'TZ': {'layers': [{'adm2': gb('TZA', 'ADM2'), 'names': ['Ileje', 'Mbozi', 'Momba', 'Songwe', 'Tunduma'], 'to': 'Songwe'}]},
    'PS': {'layers': 'PS', 'ne_as_gap': True},
}

KZ_LAYERS = [  # 2022 regions, built from districts (old district lines; Aksuat, split from Tarbagatay in 2022, is not in the data)
    {'to': 'Abai', 'within': 'East Kazakhstan Region', 'names': ['Abayskiy', 'Ayagozskiy', 'Beskaragayskiy', 'Borodulikhinskiy', 'Zharminskiy', 'Kokpektinskiy', 'Urdzharskiy', 'Semipalatinskiy']},
    {'to': 'Jetisu', 'within': 'Almaty Region', 'names': ['Aksuskiy', 'Alakolskiy', 'Karatal`skiy', 'Kerbulakskiy', 'Koksuskiy', 'Panfilovskiy', 'Sarkandskiy', 'Taldyqorghan']},
    {'to': 'Ulytau', 'within': 'Karaganda Region', 'names': ['Ulytauskiy', 'Zhanaarkinskiy']},
    {'to': 'Shymkent (city)', 'within': 'South Kazakhstan Region', 'names': ['Shymkent']},
]
ID_LAYERS = [  # 2012 and 2022 provinces, built from regencies
    {'to': 'North Kalimantan', 'names': ['Bulungan', 'Malinau', 'Nunukan', 'Tana Tidung', 'Kota Tarakan', 'Tarakan']},
    {'to': 'South Papua', 'names': ['Merauke', 'Boven Digoel', 'Mappi', 'Asmat']},
    {'to': 'Central Papua', 'names': ['Nabire', 'Paniai', 'Mimika', 'Dogiyai', 'Deiyai', 'Intan Jaya', 'Puncak', 'Puncak Jaya']},
    {'to': 'Highland Papua', 'names': ['Jayawijaya', 'Lanny Jaya', 'Mamberamo Tengah', 'Nduga', 'Pegunungan Bintang', 'Tolikara', 'Yahukimo', 'Yalimo']},
    {'to': 'Southwest Papua', 'names': ['Sorong', 'Kota Sorong', 'Sorong Selatan', 'Raja Ampat', 'Maybrat', 'Tambrauw']},
]

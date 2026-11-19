# Schematic route data for the North and South American Key Cards (version 1, 2026-11-19). Rebuild site/routes.js with build_routes.py.
# Same format as route_spec.py and route_spec_asia.py. Town coordinates are GeoNames positions (via all-the-cities), a few small places by hand.
# A town name used in two countries (or already used in Europe or Asia for another place) carries the country code: 'Cartago CR', 'London CA'.
C = {  # town coordinates (lat, lon)
 'Seattle': (47.606, -122.332), 'Portland': (45.523, -122.676), 'Sacramento': (38.582, -121.494), 'Los Angeles': (34.052, -118.244), 'San Diego': (32.716, -117.165), 'Salt Lake City': (40.761, -111.891), 'Las Vegas': (36.175, -115.137), 'Denver': (39.739, -104.985),
 'Albuquerque': (35.084, -106.651), 'El Paso': (31.759, -106.487), 'Laredo': (27.506, -99.508), 'San Antonio US': (29.424, -98.494), 'San Antonio CL': (-33.595, -71.607), 'Dallas': (32.783, -96.807), 'Oklahoma City': (35.468, -97.516), 'Kansas City': (39.1, -94.579),
 'Des Moines': (41.601, -93.609), 'Minneapolis': (44.98, -93.264), 'Duluth': (46.783, -92.107), 'Chicago': (41.85, -87.65), 'St. Louis': (38.627, -90.198), 'Memphis': (35.15, -90.049), 'New Orleans': (29.955, -90.075), 'Jackson': (32.299, -90.185),
 'Mobile': (30.694, -88.043), 'Nashville': (36.166, -86.784), 'Louisville': (38.254, -85.759), 'Indianapolis': (39.768, -86.158), 'Detroit': (42.331, -83.046), 'Atlanta': (33.749, -84.388), 'Tampa': (27.948, -82.458), 'Miami': (25.774, -80.194),
 'Jacksonville': (30.332, -81.656), 'Washington': (37.131, -113.508), 'Boston': (42.358, -71.06), 'Houston': (29.763, -95.363), 'Phoenix': (33.448, -112.074), 'Tucson': (32.222, -110.926), 'Birmingham': (33.521, -86.802), 'Charlotte': (35.227, -80.843),
 'Columbus': (39.961, -82.999), 'Pittsburgh': (40.441, -79.996), 'Cleveland': (41.499, -81.695), 'Buffalo': (42.886, -78.878), 'Albany US': (42.653, -73.756), 'Billings': (45.783, -108.501), 'Spokane': (47.66, -117.429), 'Butte': (46.004, -112.535),
 'Missoula': (46.872, -113.994), 'Cheyenne': (41.14, -104.82), 'Omaha': (41.256, -95.94), 'Little Rock': (34.746, -92.29), 'Fort Worth': (32.725, -97.321), 'Barstow': (34.899, -117.023), 'Wilmington': (34.226, -77.945), 'Raleigh': (35.772, -78.639),
 'Knoxville': (35.961, -83.921), 'Richmond': (37.554, -77.46), 'Baltimore': (39.29, -76.612), 'Philadelphia': (39.952, -75.164), 'San Francisco': (37.775, -122.419), 'Reno': (39.53, -119.814), 'Lincoln': (40.8, -96.667), 'Fargo': (46.877, -96.79),
 'Bismarck': (46.808, -100.784), 'Sioux Falls': (43.55, -96.7), 'Grand Forks': (47.925, -97.033), 'Shreveport': (32.525, -93.75), 'Lake City': (30.19, -82.639), 'Houlton': (46.126, -67.84), 'Calexico': (32.679, -115.499), 'Bangor US': (44.801, -68.778),
 'Blaine': (45.161, -93.235), 'Rapid City': (44.081, -103.231), 'Madison': (43.073, -89.401), 'Milwaukee': (43.039, -87.906), 'Toledo': (41.664, -83.555), 'Erie': (42.129, -80.085), 'Medford': (42.327, -122.876), 'Redding': (40.587, -122.392),
 'Eugene': (44.052, -123.087), 'Bakersfield': (35.373, -119.019), 'Pecos': (31.423, -103.493), 'Amarillo': (35.222, -101.831), 'Flagstaff': (35.198, -111.651), 'Gallup': (35.528, -108.743), 'Sault Ste. Marie US': (46.495, -84.345), 'Sault Ste. Marie CA': (46.517, -84.333),
 'Flint': (43.013, -83.687), 'Lansing': (42.733, -84.556), 'Gary': (41.593, -87.346), 'Joplin': (37.084, -94.513), 'Wichita': (37.692, -97.338), 'Topeka': (39.048, -95.678), 'Tallahassee': (30.438, -84.281), 'Pensacola': (30.421, -87.217),
 'Augusta': (33.471, -81.975), 'Savannah': (32.084, -81.1), 'Fayetteville': (35.053, -78.878), 'Norfolk': (36.847, -76.285), 'Hagerstown': (39.642, -77.72), 'Harrisburg': (40.274, -76.884), 'Scranton': (41.409, -75.665), 'Victoria': (48.436, -123.352),
 'Vancouver': (49.25, -123.119), 'Kamloops': (50.666, -120.319), 'Revelstoke': (50.997, -118.195), 'Calgary': (51.05, -114.085), 'Medicine Hat': (50.039, -110.677), 'Regina': (50.45, -104.618), 'Moose Jaw': (50.4, -105.534), 'Brandon': (49.847, -99.953),
 'Winnipeg': (49.884, -97.147), 'Kenora': (49.767, -94.49), 'Thunder Bay': (48.382, -89.25), 'North Bay': (46.317, -79.466), 'Ottawa': (45.411, -75.698), 'Montreal': (45.509, -73.588), 'Quebec': (46.812, -71.215), 'Rivière-du-Loup': (47.827, -69.542),
 'Edmundston': (47.374, -68.325), 'Fredericton': (45.945, -66.666), 'Moncton': (46.095, -64.796), 'Truro': (45.367, -63.265), 'Halifax': (44.646, -63.573), 'Sydney CA': (46.135, -60.183), 'Corner Brook': (48.95, -57.952), "St. John's": (47.565, -52.709),
 'Prince Rupert': (54.315, -130.321), 'Prince George': (53.917, -122.753), 'Jasper': (52.879, -118.08), 'Edmonton': (53.55, -113.469), 'Lloydminster': (53.272, -110.023), 'Saskatoon': (52.132, -106.669), 'Yorkton': (51.217, -102.468), 'Portage la Prairie': (49.973, -98.293),
 'Windsor': (42.3, -83.017), 'London CA': (42.983, -81.233), 'Toronto': (43.7, -79.416), 'Kingston': (44.23, -76.481), 'Lethbridge': (49.7, -112.819), 'Red Deer': (52.267, -113.802), 'Whitehorse': (60.716, -135.054), 'Dawson Creek': (55.76, -120.24),
 'Fort St. John': (56.25, -120.853), 'Hope': (49.383, -121.441), 'Barrie': (44.4, -79.666), 'Trois-Rivières': (46.345, -72.548), 'Sherbrooke': (45.4, -71.899), 'Tijuana': (32.503, -117.004), 'Mexicali': (32.628, -115.454), 'Ensenada': (31.871, -116.601),
 'La Paz': (24.144, -110.3), 'Cabo San Lucas': (22.891, -109.912), 'Nogales': (31.309, -110.942), 'Hermosillo': (29.103, -110.977), 'Ciudad Obregón': (27.486, -109.941), 'Los Mochis': (25.793, -108.998), 'Culiacán': (24.79, -107.388), 'Mazatlán': (23.233, -106.406),
 'Tepic': (21.51, -104.896), 'Guadalajara MX': (20.667, -103.392), 'Morelia': (19.701, -101.184), 'Toluca': (19.288, -99.653), 'Mexico City': (19.428, -99.128), 'Chihuahua': (28.635, -106.089), 'Durango': (32.249, -115.252), 'Zacatecas': (22.768, -102.581),
 'Aguascalientes': (21.882, -102.283), 'Irapuato': (20.677, -101.356), 'Querétaro': (15.838, -92.758), 'Piedras Negras': (28.7, -100.524), 'Saltillo': (25.423, -101.005), 'San Luis Potosí': (22.15, -100.979), 'Nuevo Laredo': (27.476, -99.516), 'Monterrey': (25.675, -100.318),
 'Ciudad Victoria': (23.742, -99.146), 'Reynosa': (26.081, -98.288), 'Matamoros': (25.527, -103.228), 'Tampico': (22.285, -97.878), 'Veracruz': (19.181, -96.143), 'Coatzacoalcos': (18.149, -94.445), 'Villahermosa': (17.987, -92.93), 'Ciudad del Carmen': (18.646, -91.83),
 'Campeche': (19.844, -90.526), 'Mérida': (20.975, -89.617), 'Cancún': (21.174, -86.847), 'Chetumal': (18.514, -88.304), 'Puebla': (19.038, -98.203), 'Oaxaca': (17.065, -96.724), 'San Cristóbal de las Casas': (16.732, -92.641), 'Comitán': (16.247, -92.135),
 'Tapachula': (14.904, -92.257), 'Salina Cruz': (16.175, -95.194), 'Cuernavaca': (18.926, -99.231), 'Puerto Vallarta': (20.617, -105.23), 'Manzanillo': (19.117, -104.342), 'Lázaro Cárdenas': (30.528, -115.926), 'Torreón': (25.544, -103.419), 'Agua Prieta': (31.331, -109.549),
 'Ciudad Acuña': (29.323, -100.952), 'Tuxpan': (19.556, -103.376), 'Orizaba': (18.852, -97.1), 'Jalapa': (16.5, -95.467), 'Lagos de Moreno': (21.357, -101.938), 'Ciudad Valles': (21.996, -99.011), 'Puerto Escondido': (15.87, -97.077), 'Pinotepa Nacional': (16.34, -98.053),
 'Escárcega': (18.609, -90.745), 'Palenque': (17.51, -91.982), 'Gómez Palacio': (25.57, -103.496), 'Cuauhtémoc': (19.445, -99.146), 'Guatemala City': (14.641, -90.513), 'Chimaltenango': (14.661, -90.819), 'Huehuetenango': (15.319, -91.472), 'Quetzaltenango': (14.835, -91.518),
 'Retalhuleu': (14.536, -91.678), 'Mazatenango': (14.534, -91.503), 'Escuintla': (14.301, -90.786), 'Coatepeque': (14.704, -91.864), 'Ciudad Tecún Umán': (14.677, -92.14), 'Puerto San José': (13.927, -90.822), 'Jutiapa': (14.292, -89.896), 'Cobán': (15.471, -90.371),
 'Puerto Barrios': (15.728, -88.594), 'Morales': (15.472, -88.841), 'Zacapa': (14.972, -89.531), 'Chiquimula': (14.8, -89.546), 'Esquipulas': (14.566, -89.352), 'Flores': (16.923, -89.899), 'Poptún': (16.331, -89.417), 'Salamá': (15.103, -90.318),
 'Taxisco': (14.067, -90.468), 'Chiquimulilla': (14.084, -90.385), 'Cuilapa': (14.276, -90.299), 'Sololá': (14.772, -91.183), 'Totonicapán': (14.912, -91.361), 'Melchor de Mencos': (17.066, -89.152), 'Fray Bartolomé de las Casas': (15.805, -89.861), 'Antigua Guatemala': (14.561, -90.734),
 'Los Amates': (15.256, -89.097), 'Gualán': (15.12, -89.357), 'San José': (9.933, -84.083), 'Alajuela': (10.016, -84.212), 'Cartago CR': (9.864, -83.919), 'Cartago CO': (4.746, -75.912), 'Heredia': (10.002, -84.117), 'Liberia': (10.635, -85.438),
 'Puntarenas': (9.976, -84.838), 'Limón': (9.991, -83.036), 'Jacó': (9.615, -84.63), 'Quepos': (9.431, -84.162), 'San Isidro': (9.367, -83.697), 'Cañas': (10.431, -85.098), 'Nicoya': (10.15, -85.451), 'Santa Cruz': (10.261, -85.585),
 'Guápiles': (10.217, -83.785), 'Siquirres': (10.097, -83.507), 'Upala': (10.898, -85.015), 'Esparza': (9.994, -84.665), 'Orotina': (9.912, -84.523), 'Sixaola': (9.528, -82.622), 'Los Chiles': (11.033, -84.717), 'Santo Domingo': (18.472, -69.892),
 'Santiago de los Caballeros': (19.452, -70.697), 'Bonao': (18.937, -70.409), 'Mao': (19.552, -71.078), 'Baní': (18.28, -70.332), 'Azua': (18.453, -70.735), 'San Cristóbal': (18.417, -70.1), 'San Pedro de Macorís': (18.454, -69.309), 'La Romana': (18.427, -68.973),
 'Punta Cana': (18.582, -68.404), 'Puerto Plata': (19.793, -70.688), 'Samaná': (19.206, -69.337), 'Nagua': (19.383, -69.847), 'San Francisco de Macorís': (19.301, -70.253), 'Moca': (19.394, -70.526), 'Dajabón': (19.549, -71.708), 'Pedernales DO': (18.038, -71.744),
 'Pedernales EC': (0.072, -80.052), 'Sosúa': (19.752, -70.52), 'Las Terrenas': (19.311, -69.543), 'Jimaní': (18.492, -71.85), 'San Juan de la Maguana': (18.806, -71.23), 'Comendador': (18.878, -71.703), 'Hato Mayor del Rey': (18.763, -69.257), 'Cotuí': (19.053, -70.149),
 'Boca Chica': (18.45, -69.6), 'San Juan PR': (18.466, -66.106), 'San Juan AR': (-31.538, -68.536), 'Bayamón': (18.399, -66.156), 'Caguas': (18.234, -66.049), 'Cayey': (18.112, -66.166), 'Salinas PR': (17.977, -66.298), 'Salinas EC': (-2.215, -80.952),
 'Ponce': (18.01, -66.624), 'Arecibo': (18.472, -66.716), 'Hatillo': (18.486, -66.825), 'Aguadilla': (18.427, -67.154), 'Mayagüez': (18.201, -67.14), 'Carolina': (18.381, -65.957), 'Fajardo': (18.326, -65.652), 'Humacao': (18.15, -65.827),
 'Guayama': (17.984, -66.114), 'Vega Baja': (18.444, -66.388), 'Manatí': (18.427, -66.492), 'Yauco': (18.035, -66.85), 'Cabo Rojo': (18.087, -67.146), 'Juana Díaz': (18.052, -66.507), 'Cataño': (18.441, -66.118), 'Río Grande PR': (18.38, -65.831),
 'Río Grande AR': (-53.788, -67.709), 'Yabucoa': (18.051, -65.879), 'Isabela': (18.501, -67.024), 'Quebradillas': (18.474, -66.939), 'San Germán': (18.082, -67.045), 'Guayanilla': (18.019, -66.792), 'Santa Isabel': (17.966, -66.405), 'Maunabo': (18.007, -65.899),
 'Patillas': (18.006, -66.016), 'Ipiales': (0.825, -77.64), 'Pasto': (1.214, -77.281), 'Popayán': (2.438, -76.613), 'Cali': (3.437, -76.522), 'La Pintada': (5.749, -75.606), 'Medellín': (6.252, -75.564), 'Caucasia': (7.987, -75.193),
 'Sincelejo': (9.305, -75.398), 'Pitalito': (1.854, -76.051), 'Neiva': (2.927, -75.282), 'Honda': (5.209, -74.736), 'Puerto Boyacá': (5.976, -74.585), 'Aguachica': (8.308, -73.617), 'Bosconia': (9.971, -73.888), 'Bogotá': (4.61, -74.082),
 'Tunja': (5.535, -73.368), 'Duitama': (5.824, -73.034), 'Pamplona': (7.376, -72.648), 'Cúcuta': (7.894, -72.508), 'Villavicencio': (4.142, -73.627), 'Yopal': (5.338, -72.396), 'Tame': (6.461, -71.736), 'Saravena': (6.963, -71.882),
 'Buenaventura': (3.88, -77.031), 'Armenia': (4.534, -75.681), 'Ibagué': (4.439, -75.232), 'Puerto López CO': (4.099, -72.956), 'Puerto López EC': (-1.56, -80.81), 'Puerto Carreño': (6.189, -67.486), 'Cartagena': (10.4, -75.514), 'Barranquilla': (10.969, -74.781),
 'Ciénaga': (11.007, -74.248), 'Santa Marta': (11.241, -74.199), 'Riohacha': (11.544, -72.907), 'Maicao': (11.378, -72.24), 'Tumaco': (1.791, -78.793), 'Mocoa': (1.153, -76.652), 'Bucaramanga': (7.125, -73.12), 'Montería': (8.748, -75.881),
 'Tulcán': (0.812, -77.717), 'Ibarra': (0.352, -78.122), 'Quito': (-0.23, -78.525), 'Latacunga': (-0.935, -78.616), 'Ambato': (-1.249, -78.617), 'Riobamba': (-1.671, -78.647), 'Azogues': (-2.74, -78.849), 'Cuenca': (-2.901, -79.005),
 'Loja': (-3.993, -79.204), 'Macará': (-4.382, -79.944), 'Santo Domingo de los Colorados': (-0.253, -79.175), 'Quevedo': (-1.029, -79.464), 'Babahoyo': (-1.802, -79.534), 'Guayaquil': (-2.196, -79.886), 'Machala': (-3.259, -79.961), 'Huaquillas': (-3.475, -80.231),
 'Esmeraldas': (0.959, -79.654), 'Manta': (-0.962, -80.713), 'Santa Elena': (-2.226, -80.859), 'Tena': (-0.994, -77.813), 'Puyo': (-1.484, -78.003), 'Macas': (-2.309, -78.111), 'Zamora': (-4.067, -78.955), 'Portoviejo': (-1.055, -80.454),
 'Nueva Loja': (0.086, -76.895), 'Jipijapa': (-1.349, -80.579), 'Lima': (-12.043, -77.028), 'Huacho': (-11.107, -77.605), 'Chimbote': (-9.085, -78.578), 'Trujillo': (-8.116, -79.03), 'Chiclayo': (-6.771, -79.841), 'Piura': (-5.194, -80.633),
 'Sullana': (-4.904, -80.685), 'Tumbes': (-3.567, -80.452), 'San Vicente de Cañete': (-13.076, -76.385), 'Ica': (-14.068, -75.729), 'Nazca': (-14.831, -74.939), 'Camaná': (-16.624, -72.711), 'Moquegua': (-17.198, -70.936), 'Tacna': (-18.015, -70.254),
 'La Oroya': (-11.519, -75.899), 'Cerro de Pasco': (-10.667, -76.257), 'Cajamarca': (-7.164, -78.5), 'Huancayo': (-12.065, -75.205), 'Ayacucho': (-13.159, -74.223), 'Abancay': (-13.634, -72.881), 'Cusco': (-13.523, -71.967), 'Juliaca': (-15.5, -70.133),
 'Puno': (-15.842, -70.02), 'Desaguadero': (-16.566, -69.042), 'Tingo María': (-9.295, -75.996), 'Tocache': (-8.188, -76.52), 'Juanjuí': (-7.177, -76.728), 'Tarapoto': (-6.501, -76.366), 'Moyobamba': (-6.034, -76.972), 'Chosica': (-11.943, -76.709),
 'Arequipa': (-16.399, -71.535), 'Huánuco': (-9.931, -76.242), 'Huaraz': (-9.528, -77.528), 'Pucallpa': (-8.379, -74.554), 'Puerto Maldonado': (-12.593, -69.189), 'Paita': (-5.089, -81.114), 'Chachapoyas': (-6.232, -77.869), 'Bagua Grande': (-5.756, -78.441),
 'Olmos': (-5.985, -79.745), 'Arica': (-18.475, -70.298), 'Pozo Almonte': (-20.256, -69.786), 'Iquique': (-20.213, -70.15), 'Tocopilla': (-22.092, -70.198), 'Antofagasta': (-23.652, -70.395), 'Taltal': (-25.407, -70.486), 'Copiapó': (-27.367, -70.331),
 'La Serena': (-29.905, -71.249), 'Santiago': (-33.457, -70.648), 'Talca': (-35.426, -71.655), 'Chillán': (-36.607, -72.103), 'Los Ángeles': (-37.47, -72.354), 'Temuco': (-38.74, -72.598), 'Osorno': (-40.574, -73.133), 'Puerto Montt': (-41.469, -72.942),
 'Castro': (-42.472, -73.773), 'Quellón': (-43.118, -73.617), 'Chaitén': (-42.916, -72.706), 'Coyhaique': (-45.575, -72.066), 'Cochrane': (-47.256, -72.57), 'Punta Arenas': (-53.155, -70.911), 'Puerto Natales': (-51.73, -72.506), 'Putre': (-18.198, -69.561),
 'Calama': (-22.457, -68.924), 'San Pedro de Atacama': (-22.911, -68.201), 'Vicuña': (-30.035, -70.713), 'Valparaíso': (-33.036, -71.63), 'Viña del Mar': (-33.025, -71.552), 'Los Andes': (-32.834, -70.598), 'Rancagua': (-34.171, -70.744), 'Concepción CL': (-36.827, -73.05),
 'Concepción PY': (-23.4, -57.432), 'Ovalle': (-30.601, -71.199), 'Vallenar': (-28.576, -70.759), 'Chañaral': (-26.343, -70.616), 'Buenos Aires': (-34.613, -58.377), 'Mar del Plata': (-38, -57.556), 'Azul': (-36.777, -59.859), 'Bahía Blanca': (-38.72, -62.272),
 'Viedma': (-40.813, -62.997), 'Trelew': (-43.249, -65.305), 'Comodoro Rivadavia': (-45.864, -67.497), 'Caleta Olivia': (-46.439, -67.528), 'Río Gallegos': (-51.623, -69.218), 'Ushuaia': (-54.811, -68.316), 'Luján': (-34.57, -59.105), 'Bragado': (-35.119, -60.49),
 'Pehuajó': (-35.811, -61.897), 'Santa Rosa': (-36.617, -64.283), 'Junín': (-34.584, -60.943), 'Rufino': (-34.268, -62.713), 'Villa Mercedes': (-33.676, -65.458), 'San Luis': (-33.295, -66.336), 'Mendoza': (-32.891, -68.827), 'Pilar AR': (-34.459, -58.914),
 'Pilar PY': (-26.859, -58.306), 'Pergamino': (-33.89, -60.574), 'Venado Tuerto': (-33.746, -61.969), 'Río Cuarto': (-33.131, -64.35), 'Rosario': (-32.947, -60.639), 'Córdoba': (-31.413, -64.181), 'Santiago del Estero': (-27.795, -64.261), 'San Miguel de Tucumán': (-26.824, -65.223),
 'Salta': (-24.786, -65.412), 'San Salvador de Jujuy': (-24.195, -65.297), 'Humahuaca': (-23.205, -65.35), 'La Quiaca': (-22.102, -65.593), 'Cafayate': (-26.073, -65.978), 'Chilecito': (-29.162, -67.497), 'Malargüe': (-35.475, -69.584), 'Chos Malal': (-37.378, -70.271),
 'Zapala': (-38.899, -70.054), 'San Carlos de Bariloche': (-41.146, -71.308), 'Esquel': (-42.911, -71.319), 'Perito Moreno': (-46.59, -70.93), 'El Calafate': (-50.341, -72.277), 'Gualeguaychú': (-33.009, -58.517), 'Concordia': (-31.393, -58.021), 'Paso de los Libres': (-29.713, -57.088),
 'Santo Tomé': (-31.663, -60.765), 'Zárate': (-34.098, -59.029), 'Paraná': (-31.733, -60.529), 'Corrientes': (-27.468, -58.834), 'Posadas': (-27.367, -55.896), 'Puerto Iguazú': (-25.599, -54.574), 'Santa Fe': (-31.649, -60.709), 'Reconquista': (-29.15, -59.65),
 'Resistencia': (-27.461, -58.984), 'Formosa': (-26.185, -58.173), 'Clorinda': (-25.285, -57.719), 'Neuquén': (-38.952, -68.059), 'La Plata': (-34.921, -57.955), 'Campana': (-34.163, -58.959), 'Tandil': (-37.322, -59.133), 'Necochea': (-38.554, -58.74),
 'Olavarría': (-36.893, -60.323), 'Montevideo': (-34.903, -56.188), 'Libertad': (-34.635, -56.617), 'Colonia del Sacramento': (-34.463, -57.84), 'San José de Mayo': (-34.337, -56.714), 'Trinidad': (-33.517, -56.9), 'Young': (-32.698, -57.627), 'Paysandú': (-32.317, -58.081),
 'Salto': (-31.383, -57.967), 'Bella Unión': (-30.26, -57.599), 'Canelones': (-34.523, -56.278), 'Florida': (-34.096, -56.214), 'Durazno': (-33.381, -56.524), 'Paso de los Toros': (-32.817, -56.517), 'Tacuarembó': (-31.717, -55.981), 'Rivera': (-30.905, -55.551),
 'Pando': (-34.717, -55.958), 'Minas': (-34.376, -55.238), 'Treinta y Tres': (-33.233, -54.383), 'Melo': (-32.37, -54.167), 'Aceguá': (-31.872, -54.164), 'Pan de Azúcar': (-34.779, -55.236), 'San Carlos': (-34.791, -54.918), 'Rocha': (-34.483, -54.333),
 'Castillos': (-34.199, -53.859), 'Río Branco': (-32.598, -53.386), 'Mercedes': (-33.252, -58.03), 'Fray Bentos': (-33.117, -58.311), 'Artigas': (-30.4, -56.467), 'Maldonado': (-34.9, -54.95), 'Punta del Este': (-34.947, -54.934), 'Asunción': (-25.286, -57.647),
 'Paraguarí': (-25.621, -57.147), 'Caapucú': (-26.235, -57.182), 'San Juan Bautista': (-26.669, -57.146), 'Encarnación': (-27.331, -55.867), 'San Lorenzo PY': (-25.34, -57.509), 'San Lorenzo EC': (1.286, -78.835), 'Caacupé': (-25.386, -57.142), 'Coronel Oviedo': (-25.444, -56.44),
 'Caaguazú': (-25.471, -56.016), 'Ciudad del Este': (-25.51, -54.611), 'Pedro Juan Caballero': (-22.547, -55.733), 'Villa Hayes': (-25.093, -57.524), 'Filadelfia': (-22.339, -60.032), 'Villarrica': (-25.749, -56.435), 'Hohenau': (-27.073, -55.642), 'Santa Rita': (-25.783, -55.067),
 'Salto del Guairá': (-24.063, -54.307), 'Brasília': (-15.78, -47.93), 'Cristalina': (-16.768, -47.615), 'Belo Horizonte': (-19.921, -43.938), 'Juiz de Fora': (-21.764, -43.35), 'Petrópolis': (-22.505, -43.179), 'Rio de Janeiro': (-22.906, -43.182), 'Catalão': (-18.166, -47.946),
 'Uberlândia': (-18.919, -48.277), 'Uberaba': (-19.748, -47.932), 'Ribeirão Preto': (-21.177, -47.81), 'Campinas': (-22.906, -47.061), 'São Paulo': (-23.547, -46.636), 'Santos': (-23.961, -46.334), 'Imperatriz': (-5.526, -47.492), 'Paragominas': (-2.967, -47.483),
 'Belém': (-1.456, -48.504), 'Barreiras': (-12.153, -44.99), 'Picos': (-7.077, -41.467), 'Fortaleza': (-3.717, -38.543), 'Anápolis': (-16.327, -48.953), 'Goiânia': (-16.679, -49.254), 'Rio Verde': (-17.798, -50.928), 'Campo Grande': (-20.443, -54.646),
 'Bela Vista': (-22.109, -56.521), 'Barra do Garças': (-15.89, -52.257), 'Cuiabá': (-15.596, -56.097), 'Natal': (-5.795, -35.209), 'João Pessoa': (-7.115, -34.863), 'Recife': (-8.054, -34.881), 'Maceió': (-9.666, -35.735), 'Aracaju': (-10.911, -37.072),
 'Alagoinhas': (-12.136, -38.419), 'Vitória': (-20.319, -40.338), 'Florianópolis': (-27.597, -48.549), 'Osório': (-29.887, -50.27), 'Feira de Santana': (-12.267, -38.967), 'Vitória da Conquista': (-14.866, -40.839), 'Governador Valadares': (-18.851, -41.949), 'Curitiba': (-25.428, -49.273),
 'Porto Alegre': (-30.033, -51.23), 'Pelotas': (-31.77, -52.341), 'Jaguarão': (-32.566, -53.376), 'Marabá': (-5.381, -49.132), 'Araguaína': (-7.191, -48.207), 'Gurupi': (-11.729, -49.069), 'São José do Rio Preto': (-20.82, -49.379), 'Santarém': (-2.443, -54.708),
 'Sinop': (-11.864, -55.502), 'Rondonópolis': (-16.471, -54.636), 'Dourados': (-22.221, -54.806), 'Manaus': (-3.102, -60.025), 'Boa Vista': (2.82, -60.673), 'Campina Grande': (-7.231, -35.881), 'Patos': (-7.024, -37.28), 'Altamira': (-3.203, -52.206),
 'Itaituba': (-4.276, -55.984), 'Humaitá': (-7.517, -63.031), 'Corumbá': (-19.009, -57.653), 'Paranaguá': (-25.516, -48.525), 'Ponta Grossa': (-25.095, -50.162), 'Cascavel': (-24.956, -53.455), 'Foz do Iguaçu': (-25.548, -54.588), 'Santa Maria': (-29.684, -53.807),
 'Uruguaiana': (-29.755, -57.088), 'Porto Velho': (-8.762, -63.904), 'Rio Branco': (-9.975, -67.81), 'Cruzeiro do Sul': (-7.628, -72.678), 'Salvador': (-12.971, -38.511), 'Teresina': (-5.089, -42.802), 'São Luís': (-2.53, -44.303), 'Palmas': (-10.167, -48.328),
 'Macapá': (0.039, -51.066), 'Ourinhos': (-22.979, -49.871), 'Londrina': (-23.31, -51.163), 'Chapecó': (-27.096, -52.618), 'Petrolina': (-9.399, -40.501), 'Sobral': (-3.686, -40.35), 'Mossoró': (-5.188, -37.344), 'Crato': (-7.234, -39.409),
 'Montes Claros': (-16.735, -43.862), 'São Gabriel': (-30.336, -54.32), 'New York': (40.714, -74.006), 'Guaymas': (27.919, -110.898), 'Ciudad Juárez': (31.72, -106.461), 'León': (21.129, -101.674), 'Pachuca': (20.117, -98.733), 'Tuxtla Gutiérrez': (16.76, -93.113),
 'Acapulco': (16.849, -99.909), 'Poza Rica': (20.533, -97.459), 'Iguala': (18.345, -99.541), 'Sudbury': (46.49, -80.99), 'Port aux Basques': (47.573, -59.138), 'La Vega': (19.222, -70.53), 'Monte Cristi': (19.848, -71.646), 'Barahona': (18.209, -71.101),
 'Higüey': (18.615, -68.708), 'El Seibo': (18.766, -69.039), 'Navarrete': (19.564, -70.876), 'Sweetgrass': (48.998, -111.96), 'Pembina': (48.966, -97.244), 'Gander': (48.954, -54.61), 'Zihuatanejo': (17.641, -101.551), 'Sonoyta': (31.862, -112.85),
 'La Mesilla': (15.63, -91.98), 'Río Dulce': (15.66, -88.99), 'El Rancho': (14.92, -90.0), 'Pedro de Alvarado': (13.79, -90.12), 'Caldera': (9.92, -84.72), 'Dominical': (9.25, -83.86), 'Palmar Norte': (8.96, -83.47), 'Ciudad Neily': (8.65, -82.94),
 'Paso Canoas': (8.53, -82.84), 'Peñas Blancas': (11.21, -85.61), 'Ciudad Quesada': (10.32, -84.43), 'Buga': (3.901, -76.298), 'Girardot': (4.301, -74.808), 'Chuy': (-33.698, -53.459), 'Baeza': (-0.46, -77.89), 'Entre Lagos': (-40.68, -72.6),
 "Villa O'Higgins": (-48.47, -72.56), 'Uspallata': (-32.59, -69.35), 'Coronel Bogado': (-27.17, -56.25), 'San Estanislao': (-24.65, -56.44), 'Yby Yaú': (-22.97, -56.53), 'Pozo Colorado': (-23.49, -58.79), 'Mariscal Estigarribia': (-22.03, -60.62), 'Loma Plata': (-22.38, -59.84),
 'Cáceres': (-16.07, -57.68), 'Pacaraima': (4.43, -61.15), 'Lábrea': (-7.26, -64.8), 'Juazeiro': (-9.42, -40.5),
}

def R(n, g, towns):
    return (n, g, [C[t] for t in towns])

PAN = ('The Pan-American Highway (Panamericana) links the mainland countries from Alaska to Ushuaia; '
       'it is signed with each country\'s own number (Mexico 15 / 190, CA-1 in Central America, Ruta 1 or 5 in South America).')
CA_N = ('Central American (CA) route numbers are shared across the isthmus: CA-1 is the Interamericana and CA-2 the Pacific coastal highway; '
        'national numbers (RN, Ruta) run alongside them.')

S = {}
S['US'] = dict(a3='USA', hubs=['Washington'], bbox=(-125.0, 24.4, -66.8, 49.5), n='', routes=[
    R('5', 'odd', ['Blaine', 'Seattle', 'Portland', 'Eugene', 'Medford', 'Redding', 'Sacramento', 'Los Angeles', 'San Diego']),
    R('15', 'odd', ['Sweetgrass', 'Butte', 'Salt Lake City', 'Las Vegas', 'Barstow', 'San Diego']),
    R('25', 'odd', ['Billings', 'Cheyenne', 'Denver', 'Albuquerque', 'El Paso']),
    R('35', 'odd', ['Duluth', 'Minneapolis', 'Des Moines', 'Kansas City', 'Wichita', 'Oklahoma City', 'Dallas', 'San Antonio US', 'Laredo']),
    R('55', 'odd', ['Chicago', 'St. Louis', 'Memphis', 'Jackson', 'New Orleans']),
    R('65', 'odd', ['Gary', 'Indianapolis', 'Louisville', 'Nashville', 'Birmingham', 'Mobile']),
    R('75', 'odd', ['Sault Ste. Marie US', 'Flint', 'Detroit', 'Toledo', 'Knoxville', 'Atlanta', 'Tampa', 'Miami']),
    R('95', 'odd', ['Houlton', 'Bangor US', 'Boston', 'New York', 'Philadelphia', 'Baltimore', 'Washington', 'Richmond', 'Fayetteville', 'Savannah', 'Jacksonville', 'Miami']),
    R('10', 'even', ['Los Angeles', 'Phoenix', 'Tucson', 'El Paso', 'Pecos', 'San Antonio US', 'Houston', 'New Orleans', 'Mobile', 'Pensacola', 'Tallahassee', 'Jacksonville']),
    R('20', 'even', ['Pecos', 'Fort Worth', 'Dallas', 'Shreveport', 'Jackson', 'Birmingham', 'Atlanta', 'Augusta']),
    R('40', 'even', ['Barstow', 'Flagstaff', 'Gallup', 'Albuquerque', 'Amarillo', 'Oklahoma City', 'Little Rock', 'Memphis', 'Nashville', 'Knoxville', 'Raleigh']),
    R('70', 'even', ['Denver', 'Topeka', 'Kansas City', 'St. Louis', 'Indianapolis', 'Columbus', 'Pittsburgh', 'Hagerstown', 'Baltimore']),
    R('80', 'even', ['San Francisco', 'Sacramento', 'Reno', 'Salt Lake City', 'Cheyenne', 'Lincoln', 'Omaha', 'Des Moines', 'Chicago', 'Toledo', 'Cleveland', 'New York']),
    R('90', 'even', ['Seattle', 'Spokane', 'Missoula', 'Butte', 'Billings', 'Rapid City', 'Sioux Falls', 'Madison', 'Chicago', 'Toledo', 'Cleveland', 'Erie', 'Buffalo', 'Albany US', 'Boston'])],
    legend=[('odd', 'Odd: north-south, rising west to east (5 to 95)'), ('even', 'Even: east-west, rising south to north (10 to 90)')],
    s='Interstates (red-and-blue shields) are a clean grid. Odd numbers run north-south and rise from the Pacific (I-5) to the Atlantic (I-95); '
      'even numbers run east-west and rise from the south (I-10) to the north (I-90). Numbers ending in 5 or 0 are the long main routes. '
      'Three-digit spurs repeat the parent number: an even first digit means a loop round a city (I-495), an odd one a spur into it (I-395). '
      'Older US Routes (white shields) follow the opposite pattern: US-1 on the east coast, US-101 on the west, US-2 in the north, US-90 in the south.')
S['CA'] = dict(a3='CAN', hubs=['Ottawa'], bbox=(-128.5, 41.6, -52.5, 56.5), n='', routes=[
    R('1', 'even', ['Victoria', 'Vancouver', 'Hope', 'Kamloops', 'Revelstoke', 'Calgary', 'Medicine Hat', 'Moose Jaw', 'Regina', 'Brandon', 'Portage la Prairie', 'Winnipeg']),
    R('17', 'even', ['Winnipeg', 'Kenora', 'Thunder Bay', 'Sault Ste. Marie CA', 'Sudbury', 'North Bay', 'Ottawa']),
    R('40 / 20', 'even', ['Ottawa', 'Montreal', 'Trois-Rivières', 'Quebec', 'Rivière-du-Loup']),
    R('2', 'even', ['Rivière-du-Loup', 'Edmundston', 'Fredericton', 'Moncton']),
    R('104', 'even', ['Moncton', 'Truro', 'Sydney CA']),
    R('1', 'even', ['Port aux Basques', 'Corner Brook', 'Gander', "St. John's"]),
    R('16', 'oth', ['Portage la Prairie', 'Yorkton', 'Saskatoon', 'Lloydminster', 'Edmonton', 'Jasper', 'Prince George', 'Prince Rupert']),
    R('401', 'oth', ['Windsor', 'London CA', 'Toronto', 'Kingston', 'Montreal']),
    R('2', 'oth', ['Calgary', 'Red Deer', 'Edmonton'])],
    legend=[('even', 'Trans-Canada Highway (green maple-leaf shields)'), ('oth', 'Yellowhead 16 and other provincial highways')],
    s='Canada has no national numbers: every province numbers its own roads, so the same road changes number at a provincial line. '
      'The Trans-Canada Highway (green maple-leaf shield) keeps 1 across the west, becomes 17 in Ontario, 40 and 20 in Quebec, 2 in New Brunswick and 104 in Nova Scotia, and is 1 again on Newfoundland. '
      'Ontario\'s 400-series freeways (401, 400, 417) and Quebec\'s autoroutes (A-20, A-40; odd = north-south, even = east-west) are the big ones. Distances and speeds are in km.')
S['MX'] = dict(a3='MEX', hubs=['Mexico City'], n=PAN, routes=[
    R('1', 'odd', ['Tijuana', 'Ensenada', 'La Paz', 'Cabo San Lucas']),
    R('15', 'odd', ['Nogales', 'Hermosillo', 'Guaymas', 'Ciudad Obregón', 'Los Mochis', 'Culiacán', 'Mazatlán', 'Tepic', 'Guadalajara MX', 'Morelia', 'Toluca', 'Mexico City']),
    R('45', 'odd', ['Ciudad Juárez', 'Chihuahua', 'Durango', 'Zacatecas', 'Aguascalientes', 'León', 'Irapuato', 'Querétaro']),
    R('57', 'odd', ['Piedras Negras', 'Saltillo', 'San Luis Potosí', 'Querétaro', 'Mexico City']),
    R('85', 'odd', ['Nuevo Laredo', 'Monterrey', 'Ciudad Victoria', 'Ciudad Valles', 'Pachuca', 'Mexico City']),
    R('95', 'odd', ['Mexico City', 'Cuernavaca', 'Iguala', 'Acapulco']),
    R('2', 'even', ['Tijuana', 'Mexicali', 'Sonoyta', 'Nogales', 'Agua Prieta', 'Ciudad Juárez']),
    R('40', 'even', ['Mazatlán', 'Durango', 'Torreón', 'Saltillo', 'Monterrey', 'Reynosa']),
    R('150', 'even', ['Mexico City', 'Puebla', 'Orizaba', 'Veracruz']),
    R('180', 'oth', ['Matamoros', 'Tampico', 'Tuxpan', 'Veracruz', 'Coatzacoalcos', 'Villahermosa', 'Ciudad del Carmen', 'Campeche', 'Mérida', 'Cancún']),
    R('190', 'oth', ['Mexico City', 'Puebla', 'Oaxaca', 'Tuxtla Gutiérrez', 'San Cristóbal de las Casas', 'Comitán']),
    R('200', 'oth', ['Tepic', 'Puerto Vallarta', 'Manzanillo', 'Lázaro Cárdenas', 'Zihuatanejo', 'Acapulco', 'Pinotepa Nacional', 'Puerto Escondido', 'Salina Cruz', 'Tapachula'])],
    legend=[('odd', 'Odd: north-south, rising west to east'), ('even', 'Even: east-west, rising north to south'), ('oth', 'Coastal and southern routes')],
    s='Federal highways (white shields; toll roads add a D, as in 57D) form a rough grid. Odd numbers run north-south and rise from Baja California (1) to the east (85); '
      'even numbers run east-west and rise from the US border (2) southwards (40, 70, 80, 150). Three-digit routes such as 180 (Gulf coast), 190 (to Oaxaca and Chiapas) and 200 (Pacific coast) cover the south. '
      'Kilometre markers count from the start of each route.')
S['GT'] = dict(a3='GTM', hubs=['Guatemala City'], n=CA_N, routes=[
    R('CA-1', 'rad', ['La Mesilla', 'Huehuetenango', 'Totonicapán', 'Chimaltenango', 'Guatemala City', 'Cuilapa', 'Jutiapa']),
    R('CA-2', 'rad2', ['Ciudad Tecún Umán', 'Coatepeque', 'Retalhuleu', 'Mazatenango', 'Escuintla', 'Taxisco', 'Pedro de Alvarado']),
    R('CA-9', 'rad', ['Puerto San José', 'Escuintla', 'Guatemala City', 'El Rancho', 'Zacapa', 'Morales', 'Puerto Barrios']),
    R('CA-10', 'oth', ['Zacapa', 'Chiquimula', 'Esquipulas']),
    R('CA-13', 'oth', ['Morales', 'Río Dulce', 'Poptún', 'Flores']),
    R('CA-14', 'oth', ['El Rancho', 'Salamá', 'Cobán'])],
    legend=[('rad', 'Interamericana (CA-1) and Atlantic highway (CA-9) through the capital'), ('rad2', 'Pacific coastal highway (CA-2)'), ('oth', 'Other CA route')],
    s='Main roads carry Central American CA numbers: CA-1 (Interamericana) crosses the highlands via Guatemala City, CA-2 follows the Pacific plain, '
      'CA-9 runs from the Pacific port of Puerto San José through the capital to Puerto Barrios on the Caribbean, and CA-13 heads north to Petén (Flores). '
      'Kilometre posts count from Guatemala City (km 0 at the Palacio Nacional), so a high km number means far from the capital.')
S['CR'] = dict(a3='CRI', hubs=['San José'], n=CA_N, routes=[
    R('1', 'rad', ['San José', 'Alajuela', 'Esparza', 'Cañas', 'Liberia', 'Peñas Blancas']),
    R('2', 'rad', ['San José', 'Cartago CR', 'San Isidro', 'Palmar Norte', 'Ciudad Neily', 'Paso Canoas']),
    R('27', 'rad2', ['San José', 'Orotina', 'Caldera']),
    R('32', 'rad2', ['San José', 'Guápiles', 'Siquirres', 'Limón']),
    R('34', 'oth', ['Caldera', 'Jacó', 'Quepos', 'Dominical', 'Palmar Norte']),
    R('21', 'oth', ['Liberia', 'Santa Cruz', 'Nicoya'])],
    legend=[('rad', 'Interamericana north (1) and south (2)'), ('rad2', 'Other primary road from San José'), ('oth', 'Primary road elsewhere')],
    s='Primary national routes have one or two digits (1 to 39), secondary routes 100 to 399 and tertiary routes 600 and up. '
      'Route 1 is the Interamericana north-west to Nicaragua and Route 2 the Interamericana south-east to Panama; 27 runs to the Pacific at Caldera and 32 to the Caribbean at Limón. '
      'Coverage is mostly Trekker, so route signs are rare.')
S['DO'] = dict(a3='DOM', hubs=['Santo Domingo'], n='', routes=[
    R('DR-1', 'rad', ['Santo Domingo', 'Bonao', 'La Vega', 'Santiago de los Caballeros', 'Navarrete', 'Mao', 'Monte Cristi']),
    R('DR-2', 'rad', ['Santo Domingo', 'San Cristóbal', 'Baní', 'Azua', 'Barahona']),
    R('DR-3', 'rad', ['Santo Domingo', 'Boca Chica', 'San Pedro de Macorís', 'La Romana', 'Higüey', 'Punta Cana']),
    R('DR-5', 'oth', ['Puerto Plata', 'Sosúa', 'Nagua', 'Samaná'])],
    legend=[('rad', 'DR-1 to DR-3 leave Santo Domingo'), ('oth', 'Other highway')],
    s='The three main highways leave Santo Domingo: DR-1 (Autopista Duarte) north-west through Santiago to Monte Cristi, DR-2 west to Azua and the south-west, '
      'and DR-3 east to La Romana and Punta Cana. Higher numbers fill in the rest; kilometre markers read "Rep. Dom.". Coverage is mostly Santo Domingo and Santiago.')
S['PR'] = dict(a3='PRI', hubs=['San Juan PR'], bbox=(-67.4, 17.85, -65.55, 18.6), n='', routes=[
    R('1', 'rad', ['San Juan PR', 'Caguas', 'Cayey', 'Salinas PR', 'Santa Isabel', 'Juana Díaz', 'Ponce']),
    R('2', 'rad', ['San Juan PR', 'Bayamón', 'Vega Baja', 'Manatí', 'Arecibo', 'Hatillo', 'Quebradillas', 'Isabela', 'Aguadilla', 'Mayagüez', 'San Germán', 'Yauco', 'Guayanilla', 'Ponce']),
    R('3', 'rad', ['San Juan PR', 'Carolina', 'Río Grande PR', 'Fajardo', 'Humacao', 'Yabucoa', 'Maunabo', 'Patillas', 'Guayama', 'Salinas PR']),
    R('22', 'oth', ['San Juan PR', 'Bayamón', 'Vega Baja', 'Manatí', 'Arecibo', 'Hatillo']),
    R('52', 'oth', ['San Juan PR', 'Caguas', 'Cayey', 'Salinas PR', 'Ponce'])],
    legend=[('rad', 'PR-1 to PR-3 leave San Juan'), ('oth', 'Toll expressway')],
    s='Puerto Rico numbers its roads PR-1 and up on white shields. PR-1 runs south to Ponce through the mountains, PR-2 west and round the coast to Ponce, and PR-3 east and round to Guayama. '
      'The toll expressways (PR-22, PR-52) parallel them. One- and two-digit numbers are primary roads, three-digit numbers secondary and local roads. Distances are in km, speed limits in mph.')
S['CO'] = dict(a3='COL', hubs=['Bogotá'], bbox=(-79.2, -4.3, -66.8, 12.6), n=PAN, routes=[
    R('25', 'odd', ['Ipiales', 'Pasto', 'Popayán', 'Cali', 'Buga', 'Cartago CO', 'La Pintada', 'Medellín', 'Caucasia', 'Sincelejo']),
    R('45', 'odd', ['Mocoa', 'Pitalito', 'Neiva', 'Girardot', 'Honda', 'Puerto Boyacá', 'Aguachica', 'Bosconia']),
    R('55', 'odd', ['Bogotá', 'Tunja', 'Duitama', 'Pamplona', 'Cúcuta']),
    R('65', 'odd', ['Villavicencio', 'Yopal', 'Tame', 'Saravena']),
    R('10', 'even', ['Tumaco', 'Pasto', 'Mocoa']),
    R('40', 'even', ['Buenaventura', 'Buga', 'Armenia', 'Ibagué', 'Girardot', 'Bogotá', 'Villavicencio', 'Puerto López CO', 'Puerto Carreño']),
    R('90', 'even', ['Cartagena', 'Barranquilla', 'Ciénaga', 'Santa Marta', 'Riohacha', 'Maicao'])],
    legend=[('odd', 'Ends in 5: north-south, rising west to east'), ('even', 'Ends in 0: east-west, rising south to north')],
    s='National routes are numbered on a grid. Trunk roads running north-south end in 5 and rise from west to east (25 Troncal de Occidente through Cali and Medellín, 45 along the Magdalena, 55 to Cúcuta, 65 along the Llanos); '
      'cross roads end in 0 and rise from south to north (10 Tumaco-Pasto, 40 Buenaventura-Bogotá-Villavicencio, 90 along the Caribbean). '
      'Branches add a letter or a second digit (45A, 62). Kilometre posts are tall green signs topped with "PR".')
S['EC'] = dict(a3='ECU', hubs=['Quito'], bbox=(-81.2, -5.1, -75.1, 1.5), n=PAN, routes=[
    R('E15', 'odd', ['Esmeraldas', 'Pedernales EC', 'Manta', 'Puerto López EC', 'Santa Elena']),
    R('E25', 'odd', ['Santo Domingo de los Colorados', 'Quevedo', 'Babahoyo', 'Guayaquil', 'Machala', 'Huaquillas']),
    R('E35', 'odd', ['Tulcán', 'Ibarra', 'Quito', 'Latacunga', 'Ambato', 'Riobamba', 'Azogues', 'Cuenca', 'Loja', 'Macará']),
    R('E45', 'odd', ['Nueva Loja', 'Baeza', 'Tena', 'Puyo', 'Macas', 'Zamora']),
    R('E20', 'even', ['Esmeraldas', 'Santo Domingo de los Colorados', 'Quito']),
    R('E30', 'even', ['Manta', 'Portoviejo', 'Quevedo', 'Latacunga']),
    R('E40', 'even', ['Salinas EC', 'Santa Elena', 'Guayaquil', 'Azogues'])],
    legend=[('odd', 'Ends in 5: north-south, rising west to east'), ('even', 'Ends in 0: east-west, rising north to south')],
    s='Primary roads are E-roads on blue shields. Those ending in 5 run north-south and rise inland: E15 along the coast, E25 through the lowlands, E35 (the Panamericana) along the Andes, E45 through the Amazon. '
      'Those ending in 0 run east-west and rise from north to south (E10 near Colombia to E50 near Peru). '
      'Secondary E-roads have green shields, and three-digit roads start with the two digits of the road they feed (E582 joins E58).')
S['PE'] = dict(a3='PER', hubs=['Lima'], n=PAN, routes=[
    R('1N', 'odd', ['Lima', 'Huacho', 'Chimbote', 'Trujillo', 'Chiclayo', 'Piura', 'Sullana', 'Tumbes']),
    R('1S', 'odd', ['Lima', 'San Vicente de Cañete', 'Ica', 'Nazca', 'Camaná', 'Moquegua', 'Tacna']),
    R('3N', 'odd', ['La Oroya', 'Cerro de Pasco', 'Huánuco', 'Cajamarca']),
    R('3S', 'odd', ['La Oroya', 'Huancayo', 'Ayacucho', 'Abancay', 'Cusco', 'Juliaca', 'Puno', 'Desaguadero']),
    R('5N', 'odd', ['Tingo María', 'Tocache', 'Juanjuí', 'Tarapoto', 'Moyobamba']),
    R('22', 'even', ['Lima', 'Chosica', 'La Oroya']),
    R('34A', 'even', ['Arequipa', 'Juliaca'])],
    legend=[('odd', 'Odd: north-south (1 coast, 3 Andes, 5 jungle edge)'), ('even', 'Even: east-west, rising north to south')],
    s='National routes are PE-numbers on black-and-white shields. Odd routes run the length of the country and split at Lima or La Oroya into N and S: 1 is the coastal Panamericana, 3 the Andean highway, 5 the jungle-edge road. '
      'Even routes cross from the coast inland and rise from north to south (PE-02 near Ecuador to PE-40 near Chile; 22 is the Carretera Central from Lima). '
      'A letter marks a branch (34A).')
S['CL'] = dict(a3='CHL', hubs=['Santiago'], bbox=(-76.0, -56.0, -66.0, -17.4), n=PAN, routes=[
    R('5', 'odd', ['Arica', 'Pozo Almonte', 'Antofagasta', 'Chañaral', 'Copiapó', 'Vallenar', 'La Serena', 'Santiago', 'Rancagua', 'Talca', 'Chillán', 'Los Ángeles', 'Temuco', 'Osorno', 'Puerto Montt', 'Castro', 'Quellón']),
    R('1', 'odd', ['Iquique', 'Tocopilla', 'Antofagasta', 'Taltal']),
    R('7', 'odd', ['Puerto Montt', 'Chaitén', 'Coyhaique', 'Cochrane', "Villa O'Higgins"]),
    R('9', 'odd', ['Puerto Natales', 'Punta Arenas']),
    R('11', 'even', ['Arica', 'Putre']),
    R('23', 'even', ['Calama', 'San Pedro de Atacama']),
    R('41', 'even', ['La Serena', 'Vicuña']),
    R('68', 'even', ['Santiago', 'Valparaíso']),
    R('215', 'even', ['Osorno', 'Entre Lagos'])],
    legend=[('odd', 'Longitudinal (north-south) routes 1, 5, 7, 9'), ('even', 'Cross routes: numbers rise from north to south')],
    s='Ruta 5 (the Panamericana) runs almost the whole country, from Arica to Quellón on Chiloé. Ruta 1 follows the northern coast, Ruta 7 (Carretera Austral) runs through Aysén and Ruta 9 through Magallanes. '
      'Roads across the country are numbered by latitude, so the number rises going south: 11 at Arica, 41 at La Serena, 68 Santiago-Valparaíso, 215 at Osorno. '
      'Regional roads carry a letter that also runs north to south (A Arica, B Antofagasta ... Y Magallanes) followed by a number.')
S['AR'] = dict(a3='ARG', hubs=['Buenos Aires'], bbox=(-74.0, -55.2, -53.5, -21.7), n=PAN, routes=[
    R('2', 'rad', ['Buenos Aires', 'La Plata', 'Mar del Plata']),
    R('3', 'rad', ['Buenos Aires', 'Azul', 'Bahía Blanca', 'Viedma', 'Trelew', 'Comodoro Rivadavia', 'Caleta Olivia', 'Río Gallegos', 'Río Grande AR', 'Ushuaia']),
    R('5', 'rad', ['Buenos Aires', 'Luján', 'Bragado', 'Pehuajó', 'Santa Rosa']),
    R('7', 'rad', ['Buenos Aires', 'Luján', 'Junín', 'Rufino', 'Villa Mercedes', 'San Luis', 'Mendoza', 'Uspallata']),
    R('8', 'rad', ['Buenos Aires', 'Pilar AR', 'Pergamino', 'Venado Tuerto', 'Río Cuarto', 'Villa Mercedes']),
    R('9', 'rad', ['Buenos Aires', 'Campana', 'Rosario', 'Córdoba', 'Santiago del Estero', 'San Miguel de Tucumán', 'Salta', 'San Salvador de Jujuy', 'Humahuaca', 'La Quiaca']),
    R('40', 'oth', ['La Quiaca', 'Cafayate', 'Chilecito', 'San Juan AR', 'Mendoza', 'Malargüe', 'Chos Malal', 'Zapala', 'San Carlos de Bariloche', 'Esquel', 'Perito Moreno', 'El Calafate', 'Río Gallegos']),
    R('11', 'oth', ['Rosario', 'Santa Fe', 'Reconquista', 'Resistencia', 'Formosa', 'Clorinda']),
    R('12', 'oth', ['Zárate', 'Paraná', 'Corrientes', 'Posadas', 'Puerto Iguazú']),
    R('14', 'oth', ['Gualeguaychú', 'Concordia', 'Paso de los Libres', 'Santo Tomé']),
    R('22', 'oth', ['Bahía Blanca', 'Neuquén', 'Zapala'])],
    legend=[('rad', 'RN 1-9 leave Buenos Aires, clockwise from the south-east'), ('oth', 'Other national route')],
    s='National routes (RN) sit on white pentagon shields, provincial routes (RP) on squares. RN 2 to 9 leave Buenos Aires clockwise from the south-east: 2 to Mar del Plata, 3 down the Patagonian coast to Ushuaia, 5 to Santa Rosa, 7 to Mendoza and Chile, 8 to Río Cuarto and 9 through Córdoba and Tucumán to Bolivia. '
      'RN 40 runs the full length of the Andes side. Kilometre posts are small white signs with a black top.')
S['UY'] = dict(a3='URY', hubs=['Montevideo'], n=PAN, routes=[
    R('1', 'rad', ['Montevideo', 'Libertad', 'Colonia del Sacramento']),
    R('3', 'rad', ['Montevideo', 'San José de Mayo', 'Trinidad', 'Young', 'Paysandú', 'Salto', 'Bella Unión']),
    R('5', 'rad', ['Montevideo', 'Canelones', 'Florida', 'Durazno', 'Paso de los Toros', 'Tacuarembó', 'Rivera']),
    R('8', 'rad', ['Montevideo', 'Pando', 'Minas', 'Treinta y Tres', 'Melo', 'Aceguá']),
    R('9', 'rad', ['Pan de Azúcar', 'San Carlos', 'Rocha', 'Castillos', 'Chuy']),
    R('26', 'oth', ['Paysandú', 'Tacuarembó', 'Melo', 'Río Branco'])],
    legend=[('rad', 'Routes 1-9 fan out from Montevideo, clockwise from the west'), ('oth', 'Cross-country route')],
    s='National routes 1 to 9 fan out from Montevideo clockwise from the west: 1 to Colonia, 3 to Paysandú and Salto, 5 north to Rivera, 8 north-east to Melo and 9 east to Chuy on the Brazilian border. '
      'Higher numbers cross the interior (26 Paysandú-Melo). The coastal Interbalnearia (IB) links Montevideo with Punta del Este.')
S['PY'] = dict(a3='PRY', hubs=['Asunción'], n=PAN, routes=[
    R('PY01', 'rad', ['Asunción', 'Paraguarí', 'Caapucú', 'San Juan Bautista', 'Coronel Bogado', 'Encarnación']),
    R('PY02', 'rad', ['Asunción', 'San Lorenzo PY', 'Caacupé', 'Coronel Oviedo', 'Caaguazú', 'Ciudad del Este']),
    R('PY03', 'rad', ['Asunción', 'San Estanislao', 'Yby Yaú']),
    R('PY09', 'rad', ['Asunción', 'Villa Hayes', 'Pozo Colorado', 'Loma Plata', 'Mariscal Estigarribia']),
    R('PY05', 'oth', ['Concepción PY', 'Yby Yaú', 'Pedro Juan Caballero']),
    R('PY06', 'oth', ['Encarnación', 'Hohenau', 'Santa Rita', 'Ciudad del Este'])],
    legend=[('rad', 'Leaves Asunción'), ('oth', 'Other national route')],
    s='Since 2019 the national routes are PY01 to PY22 (old Ruta 1, 2, 7 and so on were renumbered and some merged). '
      'PY01 runs south to Encarnación, PY02 east to Ciudad del Este, PY03 north towards Yby Yaú, and PY09, the Transchaco, crosses the Chaco north-west towards Bolivia.')
S['BR'] = dict(a3='BRA', hubs=['Brasília'], bbox=(-74.0, -33.8, -34.7, 5.3), n=PAN, routes=[
    R('BR-010', 'rad2', ['Brasília', 'Imperatriz', 'Paragominas', 'Belém']),
    R('BR-020', 'rad2', ['Brasília', 'Barreiras', 'Picos', 'Fortaleza']),
    R('BR-040', 'rad2', ['Brasília', 'Cristalina', 'Belo Horizonte', 'Juiz de Fora', 'Petrópolis', 'Rio de Janeiro']),
    R('BR-050', 'rad2', ['Brasília', 'Catalão', 'Uberlândia', 'Uberaba', 'Ribeirão Preto', 'Campinas', 'São Paulo', 'Santos']),
    R('BR-060', 'rad2', ['Brasília', 'Anápolis', 'Goiânia', 'Rio Verde', 'Campo Grande']),
    R('BR-070', 'rad2', ['Brasília', 'Barra do Garças', 'Cuiabá', 'Cáceres']),
    R('BR-101', 'odd', ['Natal', 'João Pessoa', 'Recife', 'Maceió', 'Aracaju', 'Alagoinhas', 'Vitória', 'Rio de Janeiro', 'Santos', 'Florianópolis', 'Osório']),
    R('BR-116', 'odd', ['Fortaleza', 'Feira de Santana', 'Vitória da Conquista', 'Governador Valadares', 'Rio de Janeiro', 'São Paulo', 'Curitiba', 'Porto Alegre', 'Pelotas', 'Jaguarão']),
    R('BR-153', 'odd', ['Marabá', 'Araguaína', 'Gurupi', 'Goiânia', 'São José do Rio Preto']),
    R('BR-163', 'odd', ['Santarém', 'Sinop', 'Cuiabá', 'Rondonópolis', 'Campo Grande', 'Dourados']),
    R('BR-174', 'odd', ['Manaus', 'Boa Vista', 'Pacaraima']),
    R('BR-230', 'even', ['João Pessoa', 'Campina Grande', 'Patos', 'Marabá', 'Altamira', 'Itaituba', 'Humaitá', 'Lábrea']),
    R('BR-262', 'even', ['Vitória', 'Belo Horizonte', 'Uberaba', 'Campo Grande', 'Corumbá']),
    R('BR-277', 'even', ['Paranaguá', 'Curitiba', 'Ponta Grossa', 'Cascavel', 'Foz do Iguaçu']),
    R('BR-290', 'even', ['Osório', 'Porto Alegre', 'Santa Maria', 'Uruguaiana']),
    R('BR-364', 'oth', ['Cuiabá', 'Porto Velho', 'Rio Branco', 'Cruzeiro do Sul']),
    R('BR-381', 'oth', ['São Paulo', 'Belo Horizonte', 'Governador Valadares'])],
    legend=[('rad2', '0xx: radial from Brasília'), ('odd', '1xx: north-south, rising east to west'), ('even', '2xx: east-west, rising north to south'), ('oth', '3xx: diagonal')],
    s='Federal roads are BR-xxx, and the first digit gives the direction: 0 radial from Brasília (BR-040 to Rio, BR-050 to São Paulo), 1 longitudinal north-south (BR-101 on the coast, rising westwards to BR-174 Manaus-Boa Vista), '
      '2 transversal east-west (BR-230 Transamazônica in the north, rising southwards to BR-290 in Rio Grande do Sul) and 3 diagonal (BR-364, BR-381). '
      'State roads use the state code instead (SP-, PR-, MG-), and kilometre plates show both.')

TEXT = {  # (text, footnote)
 'BO': ('Bolivia numbers its national roads (Red Vial Fundamental) without a direction rule. The ones to know: Ruta 1 (Desaguadero-La Paz-Oruro-Potosí-Tarija-Bermejo), Ruta 4 (Chilean border at Tambo Quemado-Cochabamba-Santa Cruz-Puerto Suárez) and Ruta 9 (Santa Cruz south to Yacuiba). Signs are inconsistent and often on wooden posts.', PAN),
 'PA': ('Panama\'s roads are known by name more than number. The Panamericana (CA-1, often Vía Interamericana) runs from Paso Canoas via David, Santiago and Panama City to Yaviza at the Darién Gap; the Transístmica and the Panamá-Colón expressway cross to Colón. Kilometre markers line the Panamericana.', CA_N),
 'BZ': ('Belize names its four main highways instead of numbering them: the Philip Goldson Highway (north to Mexico), the George Price Highway (west to Guatemala), the Hummingbird Highway (Belmopan to Dangriga) and the Southern Highway (to Punta Gorda).', ''),
 'GL': ('Greenland has no roads between towns, so there are no route numbers; each town has its own short network.', ''),
 'VI': ('The U.S. Virgin Islands number their main roads as territorial routes (Route 30 and 38 on St. Thomas, Route 70 Centerline Road on St. Croix), but traffic keeping left is the clue that matters.', ''),
 'BM': ('Bermuda\'s roads are named, not numbered: North Shore Road, South Road, Middle Road and Harbour Road link the parishes.', ''),
 'AW': ('Aruba has no route numbers worth learning; main roads are named (L.G. Smith Boulevard along the west coast).', ''),
 'CW': ('Curaçao\'s roads are named in Papiamentu (Kaya ...) or Dutch (... weg); there is no route numbering to learn.', ''),
 'MQ': ('Martinique uses French numbering: N for national roads (N1 to N6 from Fort-de-France) and D for departmental roads, on French-style red and yellow plates.', ''),
 'PM': ('Saint-Pierre and Miquelon has only a few roads around Saint-Pierre and on Miquelon-Langlade, with no route numbers to learn.', ''),
 'FK': ('The Falkland Islands have a few gravel roads from Stanley (the Mount Pleasant road and the Camp tracks) and no route numbers.', ''),
 'GS': ('South Georgia has no roads; coverage is Trekker and boat only.', ''),
}

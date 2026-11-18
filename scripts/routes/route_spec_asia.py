# Schematic route data for the Asian and Oceanian Key Cards (version 1, 2026-11-18). Rebuild site/routes.js with build_routes.py.
# Same format as route_spec.py. Each spec may also carry n = footnote shown under the drawing
# (Europe's footnote is the E-road grid; here it is the Asian Highway note, or nothing).
C = {  # town coordinates (lat, lon)
 # Japan
 'Tokyo': (35.681, 139.767), 'Yokohama': (35.444, 139.638), 'Shizuoka': (34.975, 138.383), 'Hamamatsu': (34.711, 137.726), 'Nagoya': (35.181, 136.906), 'Kyoto': (35.012, 135.768), 'Osaka': (34.694, 135.502), 'Kobe': (34.690, 135.196), 'Okayama': (34.655, 133.919), 'Hiroshima': (34.385, 132.455), 'Shimonoseki': (33.958, 130.941), 'Kitakyushu': (33.883, 130.875), 'Fukuoka': (33.590, 130.402), 'Kumamoto': (32.803, 130.708), 'Kagoshima': (31.597, 130.557), 'Utsunomiya': (36.555, 139.883), 'Fukushima': (37.750, 140.468), 'Sendai': (38.268, 140.870), 'Morioka': (39.702, 141.154), 'Aomori': (40.822, 140.747), 'Hakodate': (41.769, 140.729), 'Otaru': (43.190, 140.994), 'Sapporo': (43.062, 141.354), 'Mito': (36.366, 140.471), 'Iwaki': (37.050, 140.888), 'Niigata': (37.916, 139.036), 'Nagaoka': (37.446, 138.851), 'Joetsu': (37.148, 138.236), 'Toyama': (36.696, 137.214), 'Kanazawa': (36.561, 136.656), 'Fukui': (36.064, 136.220), 'Tsuruga': (35.645, 136.055), 'Takasaki': (36.322, 139.003), 'Hachioji': (35.656, 139.339), 'Kofu': (35.662, 138.568), 'Shiojiri': (36.115, 137.953),
 # South Korea
 'Seoul': (37.566, 126.978), 'Mokpo': (34.812, 126.392), 'Gwangju': (35.160, 126.851), 'Jeonju': (35.824, 127.148), 'Gongju': (36.446, 127.119), 'Cheonan': (36.815, 127.114), 'Suwon': (37.264, 127.029), 'Paju': (37.760, 126.780), 'Sacheon': (35.004, 128.064), 'Jinju': (35.180, 128.108), 'Gimcheon': (36.140, 128.114), 'Sangju': (36.411, 128.159), 'Chungju': (36.991, 127.926), 'Icheon': (37.272, 127.435), 'Uijeongbu': (37.738, 127.034), 'Cheorwon': (38.146, 127.313), 'Busan': (35.180, 129.075), 'Ulsan': (35.538, 129.311), 'Gyeongju': (35.856, 129.225), 'Pohang': (36.019, 129.343), 'Uljin': (36.993, 129.400), 'Samcheok': (37.450, 129.165), 'Gangneung': (37.752, 128.876), 'Sokcho': (38.207, 128.592), 'Goseong': (38.380, 128.468), 'Suncheon': (34.950, 127.487), 'Changwon': (35.228, 128.681), 'Incheon': (37.456, 126.705), 'Yangpyeong': (37.492, 127.488), 'Hoengseong': (37.492, 127.985), 'Pyeongchang': (37.371, 128.390), 'Daejeon': (36.351, 127.385), 'Daegu': (35.871, 128.601),
 # Taiwan
 'Keelung': (25.128, 121.740), 'Taipei': (25.033, 121.565), 'Taoyuan': (24.994, 121.301), 'Hsinchu': (24.804, 120.971), 'Taichung': (24.148, 120.674), 'Changhua': (24.081, 120.538), 'Chiayi': (23.480, 120.449), 'Tainan': (22.999, 120.227), 'Kaohsiung': (22.627, 120.301), 'Pingtung': (22.672, 120.488), 'Fangliao': (22.366, 120.594), 'Yilan': (24.757, 121.753), "Su'ao": (24.595, 121.851), 'Hualien': (23.977, 121.604), 'Taitung': (22.756, 121.144), 'Tamsui': (25.169, 121.441), 'Jinshan': (25.222, 121.636), 'Daxi': (24.883, 121.287), 'Dongshi': (24.259, 120.828), 'Nantou': (23.916, 120.684), 'Douliu': (23.709, 120.543), 'Yujing': (23.123, 120.461), 'Qishan': (22.888, 120.483), 'Lishan': (24.252, 121.250), 'Xincheng': (24.128, 121.640), 'Chenggong': (23.098, 121.379), 'Haiduan': (23.101, 121.176),
 # China
 'Beijing': (39.904, 116.407), 'Tangshan': (39.630, 118.180), 'Qinhuangdao': (39.935, 119.600), 'Shenyang': (41.805, 123.431), 'Changchun': (43.817, 125.324), 'Harbin': (45.803, 126.535), 'Tianjin': (39.343, 117.362), 'Jinan': (36.651, 117.120), "Huai'an": (33.610, 119.015), 'Wuxi': (31.491, 120.312), 'Shanghai': (31.230, 121.474), 'Xuzhou': (34.205, 117.284), 'Hefei': (31.821, 117.227), 'Fuzhou': (26.074, 119.297), 'Shijiazhuang': (38.042, 114.515), 'Zhengzhou': (34.747, 113.625), 'Wuhan': (30.593, 114.305), 'Changsha': (28.228, 112.939), 'Guangzhou': (23.129, 113.264), 'Shenzhen': (22.543, 114.058), 'Taiyuan': (37.871, 112.549), "Xi'an": (34.341, 108.940), 'Chengdu': (30.573, 104.066), 'Kunming': (24.880, 102.833), 'Zhangjiakou': (40.824, 114.887), 'Hohhot': (40.842, 111.749), 'Baotou': (40.657, 109.840), 'Yinchuan': (38.487, 106.231), 'Lanzhou': (36.061, 103.834), 'Xining': (36.617, 101.778), 'Golmud': (36.402, 94.903), 'Lhasa': (29.652, 91.172), 'Bayannur': (40.743, 107.388), 'Ejin': (41.954, 101.068), 'Hami': (42.818, 93.515), 'Urumqi': (43.825, 87.617), 'Lianyungang': (34.597, 119.222), 'Jiuquan': (39.732, 98.494), 'Khorgos': (44.214, 80.420), 'Dalian': (38.914, 121.615), 'Yantai': (37.464, 121.448), 'Qingdao': (36.067, 120.383), 'Ningbo': (29.868, 121.544), 'Xiamen': (24.480, 118.089), 'Shantou': (23.354, 116.682), 'Zhanjiang': (21.271, 110.358), 'Haikou': (20.044, 110.199),
 # Thailand
 'Bangkok': (13.756, 100.502), 'Saraburi': (14.528, 100.910), 'Nakhon Sawan': (15.704, 100.137), 'Kamphaeng Phet': (16.483, 99.522), 'Tak': (16.869, 99.126), 'Lampang': (18.288, 99.490), 'Phayao': (19.166, 99.902), 'Chiang Rai': (19.910, 99.840), 'Mae Sai': (20.428, 99.876), 'Nakhon Ratchasima': (14.980, 102.098), 'Khon Kaen': (16.441, 102.836), 'Udon Thani': (17.415, 102.787), 'Nong Khai': (17.878, 102.742), 'Chonburi': (13.361, 100.985), 'Pattaya': (12.928, 100.877), 'Rayong': (12.681, 101.278), 'Chanthaburi': (12.611, 102.104), 'Trat': (12.243, 102.515), 'Nakhon Pathom': (13.820, 100.063), 'Ratchaburi': (13.537, 99.817), 'Phetchaburi': (13.112, 99.940), 'Hua Hin': (12.568, 99.958), 'Chumphon': (10.493, 99.180), 'Ranong': (9.966, 98.635), 'Phang Nga': (8.451, 98.526), 'Krabi': (8.086, 98.906), 'Trang': (7.556, 99.611), 'Phatthalung': (7.617, 100.078), 'Hat Yai': (7.007, 100.475), 'Sadao': (6.639, 100.424), 'In Buri': (15.008, 100.329), 'Phitsanulok': (16.821, 100.265), 'Uttaradit': (17.620, 100.099), 'Den Chai': (17.983, 100.050), 'Chiang Mai': (18.788, 98.985), 'Sikhio': (14.886, 101.719), 'Nang Rong': (14.632, 102.795), 'Det Udom': (14.906, 105.077), 'Surat Thani': (9.139, 99.333), 'Thung Song': (8.165, 99.682), 'Hin Kong': (14.330, 100.860), 'Prachinburi': (14.050, 101.372), 'Aranyaprathet': (13.693, 102.505),
 # Malaysia
 'Bukit Kayu Hitam': (6.510, 100.420), 'Alor Setar': (6.121, 100.367), 'Sungai Petani': (5.647, 100.488), 'Taiping': (4.851, 100.741), 'Ipoh': (4.597, 101.090), 'Tanjung Malim': (3.684, 101.520), 'Kuala Lumpur': (3.139, 101.687), 'Seremban': (2.726, 101.938), 'Tampin': (2.471, 102.230), 'Segamat': (2.515, 102.815), 'Yong Peng': (2.012, 103.064), 'Johor Bahru': (1.464, 103.761), 'Port Klang': (3.000, 101.392), 'Bentong': (3.523, 101.909), 'Temerloh': (3.450, 102.418), 'Kuantan': (3.817, 103.326), 'Kota Tinggi': (1.738, 103.900), 'Mersing': (2.431, 103.840), 'Kuala Terengganu': (5.330, 103.137), 'Kota Bharu': (6.125, 102.238), 'Rantau Panjang': (6.019, 101.976), 'Kuching': (1.553, 110.344), 'Sri Aman': (1.237, 111.462), 'Sibu': (2.288, 111.830), 'Bintulu': (3.171, 113.042), 'Miri': (4.399, 113.991), 'Kota Kinabalu': (5.980, 116.073), 'Ranau': (5.954, 116.664), 'Sandakan': (5.840, 118.117),
 # Philippines
 'Laoag': (18.197, 120.594), 'Pagudpud': (18.561, 120.785), 'Aparri': (18.356, 121.640), 'Tuguegarao': (17.613, 121.727), 'Santiago PH': (16.688, 121.548), 'Cabanatuan': (15.486, 120.967), 'Manila': (14.599, 120.984), 'Lucena': (13.937, 121.617), 'Naga': (13.621, 123.195), 'Legazpi': (13.139, 123.744), 'Matnog': (12.585, 124.086), 'Allen': (12.505, 124.282), 'Catbalogan': (11.775, 124.886), 'Tacloban': (11.244, 125.004), 'Surigao': (9.787, 125.496), 'Butuan': (8.949, 125.543), 'Davao': (7.190, 125.455), 'Cotabato': (7.220, 124.250), 'Pagadian': (7.830, 123.440), 'Zamboanga': (6.920, 122.080), 'San Fernando P': (15.034, 120.684), 'Tarlac': (15.486, 120.590), 'Urdaneta': (15.976, 120.571), 'Rosario LU': (16.230, 120.487), 'San Fernando LU': (16.616, 120.317), 'Vigan': (17.575, 120.387),
 # Vietnam
 'Lang Son': (21.853, 106.761), 'Hanoi': (21.028, 105.854), 'Ninh Binh': (20.251, 105.975), 'Thanh Hoa': (19.807, 105.776), 'Vinh': (18.679, 105.681), 'Dong Hoi': (17.469, 106.622), 'Hue': (16.464, 107.586), 'Da Nang': (16.054, 108.202), 'Quang Ngai': (15.120, 108.792), 'Quy Nhon': (13.776, 109.224), 'Nha Trang': (12.239, 109.197), 'Phan Thiet': (10.928, 108.102), 'Ho Chi Minh City': (10.823, 106.630), 'Can Tho': (10.045, 105.747), 'Ca Mau': (9.177, 105.150), 'Viet Tri': (21.322, 105.402), 'Tuyen Quang': (21.823, 105.214), 'Ha Giang': (22.823, 104.984), 'Thai Nguyen': (21.594, 105.848), 'Bac Kan': (22.147, 105.835), 'Cao Bang': (22.666, 106.258), 'Hai Duong': (20.938, 106.331), 'Hai Phong': (20.845, 106.688), 'Hoa Binh': (20.817, 105.338), 'Son La': (21.327, 103.914), 'Lai Chau': (22.396, 103.458), 'Kon Tum': (14.350, 108.000), 'Pleiku': (13.983, 108.000), 'Buon Ma Thuot': (12.667, 108.038), 'Dong Xoai': (11.534, 106.883),
 # Cambodia
 'Phnom Penh': (11.556, 104.928), 'Neak Loeung': (11.264, 105.282), 'Svay Rieng': (11.087, 105.799), 'Bavet': (11.064, 106.152), 'Takeo': (10.990, 104.785), 'Phnom Den': (10.715, 104.832), 'Kampot': (10.610, 104.181), 'Veal Renh': (10.705, 103.837), 'Kampong Speu': (11.453, 104.519), 'Sihanoukville': (10.627, 103.522), 'Kampong Chhnang': (12.250, 104.667), 'Pursat': (12.539, 103.919), 'Battambang': (13.095, 103.202), 'Sisophon': (13.586, 102.974), 'Poipet': (13.659, 102.565), 'Skun': (12.007, 105.072), 'Kampong Thom': (12.712, 104.889), 'Siem Reap': (13.362, 103.860), 'Kampong Cham': (11.993, 105.464), 'Kratie': (12.488, 106.019), 'Stung Treng': (13.525, 105.968), 'Dom Kralor': (13.910, 105.990), 'Sre Ambel': (11.112, 103.758), 'Koh Kong': (11.616, 102.983), 'Preah Vihear': (13.807, 104.980),
 # Laos
 'Boten': (21.188, 101.667), 'Oudomxay': (20.693, 101.986), 'Luang Prabang': (19.885, 102.135), 'Phou Khoun': (19.450, 102.442), 'Vang Vieng': (18.923, 102.448), 'Vientiane': (17.975, 102.633), 'Paksan': (18.396, 103.659), 'Thakhek': (17.411, 104.831), 'Savannakhet': (16.557, 104.752), 'Pakse': (15.120, 105.799), 'Veunkham': (13.930, 105.950), 'Phonsavan': (19.457, 103.218), 'Nam Khan': (19.670, 104.200), 'Vieng Kham': (18.330, 104.050), 'Lak Sao': (18.183, 104.983), 'Nam Phao': (18.380, 105.130), 'Xeno': (16.660, 105.000), 'Phin': (16.530, 106.010), 'Dansavanh': (16.620, 106.580), 'Mahaxay': (17.400, 105.200), 'Na Phao': (17.680, 105.780), 'Nateuy': (21.060, 101.560), 'Luang Namtha': (20.950, 101.400), 'Vieng Phouka': (20.670, 101.070), 'Houayxay': (20.276, 100.412),
 # Bangladesh
 'Dhaka': (23.810, 90.412), 'Comilla': (23.461, 91.185), 'Feni': (23.016, 91.397), 'Chittagong': (22.357, 91.784), "Cox's Bazar": (21.427, 92.006), 'Teknaf': (20.862, 92.306), 'Narsingdi': (23.932, 90.715), 'Sarail': (24.070, 91.120), 'Shaistaganj': (24.280, 91.450), 'Sylhet': (24.895, 91.868), 'Tamabil': (25.170, 92.020), 'Joydebpur': (23.999, 90.420), 'Mymensingh': (24.747, 90.420), 'Tangail': (24.250, 89.917), 'Jamalpur': (24.938, 89.937), 'Manikganj': (23.861, 90.000), 'Kashinathpur': (24.000, 89.470), 'Hatikamrul': (24.420, 89.550), 'Bogra': (24.849, 89.373), 'Rangpur': (25.744, 89.275), 'Panchagarh': (26.341, 88.554), 'Banglabandha': (26.630, 88.420), 'Natore': (24.420, 89.000), 'Rajshahi': (24.374, 88.604), 'Daulatdia': (23.780, 89.770), 'Faridpur': (23.607, 89.842), 'Magura': (23.487, 89.420), 'Jessore': (23.166, 89.209), 'Khulna': (22.846, 89.540), 'Mongla': (22.488, 89.600), 'Mawa': (23.450, 90.250), 'Bhanga': (23.380, 89.990), 'Barisal': (22.701, 90.353), 'Patuakhali': (22.359, 90.329),
 # India
 'Srinagar': (34.083, 74.797), 'Jammu': (32.727, 74.857), 'Jalandhar': (31.326, 75.576), 'Ambala': (30.378, 76.776), 'Delhi': (28.614, 77.209), 'Agra': (27.177, 78.008), 'Gwalior': (26.218, 78.183), 'Jhansi': (25.449, 78.569), 'Sagar': (23.838, 78.738), 'Nagpur': (21.146, 79.088), 'Hyderabad': (17.385, 78.487), 'Kurnool': (15.828, 78.037), 'Bengaluru': (12.972, 77.595), 'Krishnagiri': (12.519, 78.214), 'Salem': (11.664, 78.146), 'Madurai': (9.925, 78.120), 'Kanyakumari': (8.088, 77.538), 'Jaipur': (26.912, 75.787), 'Ajmer': (26.450, 74.640), 'Udaipur': (24.585, 73.712), 'Ahmedabad': (23.023, 72.571), 'Vadodara': (22.307, 73.181), 'Surat': (21.170, 72.831), 'Mumbai': (19.076, 72.878), 'Pune': (18.520, 73.857), 'Belagavi': (15.850, 74.498), 'Vellore': (12.917, 79.133), 'Chennai': (13.083, 80.270), 'Kolkata': (22.573, 88.364), 'Balasore': (21.494, 86.934), 'Bhubaneswar': (20.296, 85.825), 'Visakhapatnam': (17.687, 83.218), 'Rajahmundry': (17.000, 81.804), 'Vijayawada': (16.506, 80.648), 'Nellore': (14.443, 79.987), 'Porbandar': (21.642, 69.609), 'Rajkot': (22.304, 70.802), 'Kota': (25.213, 75.865), 'Kanpur': (26.449, 80.331), 'Lucknow': (26.847, 80.947), 'Gorakhpur': (26.760, 83.373), 'Muzaffarpur': (26.120, 85.364), 'Purnia': (25.778, 87.475), 'Siliguri': (26.727, 88.395), 'Guwahati': (26.144, 91.736), 'Silchar': (24.833, 92.779), 'Prayagraj': (25.436, 81.846), 'Varanasi': (25.317, 82.974), 'Dhanbad': (23.795, 86.430), 'Hazira': (21.115, 72.650), 'Dhule': (20.902, 74.775), 'Akola': (20.706, 77.002), 'Raipur': (21.251, 81.630), 'Sambalpur': (21.466, 83.982), 'Cuttack': (20.463, 85.883), 'Paradip': (20.316, 86.611), 'Panvel': (18.989, 73.117), 'Ratnagiri': (16.990, 73.312), 'Panaji': (15.491, 73.828), 'Mangaluru': (12.914, 74.856), 'Kozhikode': (11.259, 75.780), 'Kochi': (9.931, 76.267), 'Thiruvananthapuram': (8.524, 76.936),
 # Sri Lanka
 'Colombo': (6.927, 79.861), 'Kegalle': (7.251, 80.346), 'Kandy': (7.291, 80.636), 'Kalutara': (6.585, 79.960), 'Galle': (6.053, 80.221), 'Matara': (5.949, 80.535), 'Hambantota': (6.124, 81.119), 'Wellawaya': (6.737, 81.103), 'Negombo': (7.209, 79.835), 'Chilaw': (7.576, 79.795), 'Puttalam': (8.036, 79.828), 'Avissawella': (6.955, 80.204), 'Ratnapura': (6.705, 80.384), 'Moneragala': (6.872, 81.351), 'Batticaloa': (7.731, 81.674), 'Ambepussa': (7.250, 80.170), 'Kurunegala': (7.487, 80.365), 'Dambulla': (7.860, 80.651), 'Trincomalee': (8.587, 81.215), 'Matale': (7.467, 80.623), 'Anuradhapura': (8.312, 80.414), 'Vavuniya': (8.751, 80.498), 'Jaffna': (9.662, 80.026), 'Katunayake': (7.169, 79.888), 'Kottawa': (6.840, 79.965),
 # Pakistan
 'Karachi': (24.861, 67.010), 'Hyderabad PK': (25.396, 68.377), 'Sukkur': (27.706, 68.857), 'Rahim Yar Khan': (28.420, 70.296), 'Multan': (30.158, 71.525), 'Sahiwal': (30.664, 73.106), 'Lahore': (31.520, 74.358), 'Gujranwala': (32.188, 74.194), 'Jhelum': (32.940, 73.727), 'Rawalpindi': (33.598, 73.044), 'Islamabad': (33.684, 73.048), 'Peshawar': (34.015, 71.578), 'Torkham': (34.103, 71.096), 'Khuzdar': (27.811, 66.611), 'Kalat': (29.023, 66.590), 'Quetta': (30.183, 66.997), 'Chaman': (30.921, 66.452), 'Sehwan': (26.425, 67.860), 'Larkana': (27.558, 68.212), 'Dera Ghazi Khan': (30.046, 70.640), 'Dera Ismail Khan': (31.832, 70.902), 'Kohat': (33.587, 71.442), 'Hasan Abdal': (33.820, 72.689), 'Abbottabad': (34.146, 73.211), 'Chilas': (35.420, 74.094), 'Gilgit': (35.920, 74.308), 'Sost': (36.693, 74.849), 'Khunjerab': (36.850, 75.427), 'Kallar Kahar': (32.780, 72.700), 'Pindi Bhattian': (31.900, 73.270), 'Ormara': (25.210, 64.640), 'Pasni': (25.260, 63.470), 'Gwadar': (25.126, 62.322),
 # Kazakhstan
 'Astana': (51.169, 71.449), 'Karaganda': (49.807, 73.088), 'Balkhash': (46.848, 74.995), 'Almaty': (43.238, 76.946), 'Kokshetau': (53.283, 69.396), 'Petropavl': (54.866, 69.135), 'Atbasar': (51.807, 68.333), 'Kostanay': (53.214, 63.632), 'Pavlodar': (52.287, 76.967), 'Martuk border': (50.750, 56.500), 'Aktobe': (50.283, 57.167), 'Aral': (46.800, 61.670), 'Kyzylorda': (44.853, 65.509), 'Turkistan': (43.297, 68.252), 'Shymkent': (42.342, 69.590), 'Taraz': (42.900, 71.367), 'Khorgos KZ': (44.220, 80.400), 'Maykapshagay': (47.470, 85.600), 'Zaysan': (47.470, 84.870), 'Semey': (50.411, 80.227), 'KZ border NE': (53.100, 78.400), 'Taldykorgan': (45.017, 78.383), 'Ayagoz': (47.965, 80.439), 'Oskemen': (49.948, 82.628), 'Atyrau': (47.094, 51.924), 'Oral': (51.233, 51.367), 'Dossor': (47.530, 52.980), 'Beyneu': (45.320, 55.200), 'Aktau': (43.650, 51.170),
 # Kyrgyzstan
 'Bishkek': (42.875, 74.590), 'Kara-Balta': (42.814, 73.849), 'Too Ashuu': (42.330, 73.800), 'Toktogul': (41.870, 72.940), 'Tash-Komur': (41.350, 72.220), 'Jalal-Abad': (40.933, 73.000), 'Ozgon': (40.770, 73.300), 'Osh': (40.513, 72.816), 'Tokmok': (42.842, 75.300), 'Balykchy': (42.461, 76.180), 'Kochkor': (42.215, 75.756), 'Naryn': (41.428, 75.991), 'Torugart': (40.560, 75.390), 'Cholpon-Ata': (42.649, 77.082), 'Tup': (42.730, 78.370), 'Karakol': (42.490, 78.393), 'Bokonbaev': (42.120, 76.990), 'Gulcho': (40.320, 73.440), 'Sary-Tash': (39.730, 73.250), 'Irkeshtam': (39.680, 73.900), 'Chaek': (41.930, 74.510), 'Suusamyr': (42.180, 73.920), 'Kadamjay': (40.130, 71.720), 'Batken': (40.060, 70.820), 'Isfana': (39.840, 69.530),
 # Georgia
 'Tbilisi': (41.716, 44.783), 'Mtskheta': (41.845, 44.719), 'Gori': (41.985, 44.113), 'Khashuri': (41.994, 43.600), 'Zestaponi': (42.110, 43.050), 'Samtredia': (42.153, 42.338), 'Senaki': (42.270, 42.067), 'Zugdidi': (42.509, 41.871), 'Poti': (42.146, 41.672), 'Kobuleti': (41.820, 41.775), 'Batumi': (41.643, 41.640), 'Sarpi': (41.520, 41.548), 'Pasanauri': (42.350, 44.690), 'Gudauri': (42.480, 44.480), 'Stepantsminda': (42.657, 44.643), 'Larsi': (42.740, 44.630), 'Rustavi': (41.549, 44.993), 'Red Bridge': (41.320, 45.080), 'Sagarejo': (41.734, 45.330), 'Gurjaani': (41.743, 45.802), 'Lagodekhi': (41.826, 46.276), 'Marneuli': (41.476, 44.808), 'Guguti': (41.170, 44.750), 'Borjomi': (41.840, 43.379), 'Akhaltsikhe': (41.639, 42.983), 'Vale': (41.620, 42.860), 'Akhalkalaki': (41.405, 43.486), 'Ninotsminda': (41.264, 43.592), 'Lanchkhuti': (42.090, 42.032), 'Grigoleti': (42.050, 41.730),
 # Armenia
 'Yerevan': (40.177, 44.513), 'Ashtarak': (40.299, 44.362), 'Talin': (40.390, 43.870), 'Gyumri': (40.785, 43.841), 'Bavra': (41.030, 43.750), 'Ararat': (39.830, 44.700), 'Yeghegnadzor': (39.761, 45.333), 'Sisian': (39.520, 46.030), 'Goris': (39.511, 46.339), 'Kapan': (39.207, 46.405), 'Meghri': (38.904, 46.244), 'Hrazdan': (40.497, 44.766), 'Sevan': (40.548, 44.948), 'Dilijan': (40.741, 44.863), 'Ijevan': (40.879, 45.149), 'Azatamut': (41.080, 45.250), 'Margara': (40.030, 44.180), 'Aparan': (40.590, 44.360), 'Vanadzor': (40.813, 44.488), 'Stepanavan': (41.009, 44.388), 'Dzoramut': (41.180, 44.330), 'Armavir': (40.155, 44.038), 'Alaverdi': (41.097, 44.663), 'Bagratashen': (41.240, 44.820), 'Martuni': (40.140, 45.310),
 # Israel
 'Tel Aviv': (32.085, 34.782), 'Netanya': (32.321, 34.853), 'Hadera': (32.434, 34.919), 'Haifa': (32.794, 34.990), 'Lehavim': (31.370, 34.816), 'Kiryat Gat': (31.610, 34.764), 'Rosh HaAyin': (32.096, 34.956), 'Iron': (32.470, 35.040), 'Yokneam': (32.659, 35.110), 'Eilat': (29.558, 34.952), 'Ein Bokek': (31.200, 35.360), 'Jericho': (31.860, 35.460), 'Beit Shean': (32.497, 35.497), 'Tiberias': (32.795, 35.531), 'Kiryat Shmona': (33.208, 35.570), 'Metula': (33.277, 35.578), 'Kfar Saba': (32.175, 34.907), 'Ramla': (31.929, 34.866), 'Beersheba': (31.252, 34.791), 'Mitzpe Ramon': (30.610, 34.801), 'Ketura': (29.970, 35.060), 'Jerusalem': (31.778, 35.235), 'Beit HaArava': (31.810, 35.500), 'Afula': (32.608, 35.289), 'Golani': (32.780, 35.400), 'Rosh Pina': (32.968, 35.542), 'Netivot': (31.420, 34.588), 'Dimona': (31.069, 35.033), 'Arava jn': (30.860, 35.300),
 # Jordan
 'Amman': (31.954, 35.910), 'Zarqa': (32.072, 36.088), 'Jaber': (32.500, 36.210), 'Qatraneh': (31.250, 36.050), "Ma'an": (30.196, 35.734), 'Aqaba': (29.532, 35.006), 'Irbid': (32.556, 35.850), 'Jerash': (32.280, 35.900), 'Madaba': (31.716, 35.794), 'Karak': (31.185, 35.705), 'Tafilah': (30.837, 35.604), 'Shoubak': (30.520, 35.560), 'Wadi Musa': (30.320, 35.480), 'Al-Himma': (32.680, 35.680), 'Deir Alla': (32.200, 35.620), 'Dead Sea JO': (31.720, 35.590), 'Safi': (31.040, 35.470), 'Mafraq': (32.343, 36.208), 'Safawi': (32.200, 37.130), 'Ruwaished': (32.500, 38.200), 'Azraq': (31.833, 36.817),
 # United Arab Emirates
 'Ghuwaifat': (24.120, 51.600), 'Ruwais': (24.110, 52.730), 'Abu Dhabi': (24.453, 54.377), 'Dubai': (25.205, 55.271), 'Sharjah': (25.346, 55.421), 'Ajman': (25.405, 55.513), 'Umm Al Quwain': (25.565, 55.555), 'Ras Al Khaimah': (25.800, 55.976), 'Ghantoot': (24.860, 54.850), 'E311 Dubai': (25.050, 55.220), 'E311 Sharjah': (25.300, 55.530), 'E311 north': (25.580, 55.780), 'Al Ain': (24.207, 55.744), 'Hatta': (24.800, 56.120), 'Al Dhaid': (25.288, 55.881), 'Masafi': (25.310, 56.160), 'Fujairah': (25.128, 56.326), 'Dibba': (25.620, 56.270), 'Kalba': (25.070, 56.350),
 # Oman
 'Muscat': (23.588, 58.383), 'Seeb': (23.670, 58.190), 'Barka': (23.700, 57.890), 'Suwaiq': (23.850, 57.440), 'Sohar': (24.347, 56.709), 'Shinas': (24.740, 56.470), 'Khatmat Malaha': (24.980, 56.360), 'Bidbid': (23.410, 58.130), 'Izki': (22.930, 57.770), 'Nizwa': (22.933, 57.531), 'Bahla': (22.970, 57.300), 'Ibri': (23.226, 56.516), 'Hafit': (24.060, 55.860), 'Adam': (22.380, 57.530), 'Haima': (19.960, 56.280), 'Thumrait': (17.666, 54.024), 'Salalah': (17.019, 54.089), 'Ibra': (22.690, 58.530), 'Al Kamil': (22.220, 59.210), 'Sur': (22.566, 59.529), 'Qurayyat': (23.260, 58.920), 'Tiwi': (22.820, 59.270),
 # Australia
 'Sydney': (-33.869, 151.209), 'Newcastle AU': (-32.928, 151.781), 'Coffs Harbour': (-30.296, 153.114), 'Brisbane': (-27.470, 153.026), 'Rockhampton': (-23.378, 150.510), 'Mackay': (-21.141, 149.186), 'Townsville': (-19.258, 146.817), 'Cairns': (-16.920, 145.771), 'Normanton': (-17.670, 141.070), 'Borroloola': (-16.070, 136.310), 'Daly Waters': (-16.250, 133.370), 'Katherine': (-14.465, 132.264), 'Kununurra': (-15.770, 128.740), 'Broome': (-17.960, 122.240), 'Port Hedland': (-20.310, 118.580), 'Carnarvon': (-24.880, 113.660), 'Geraldton': (-28.770, 114.610), 'Perth AU': (-31.950, 115.860), 'Albany': (-35.020, 117.880), 'Esperance': (-33.860, 121.890), 'Norseman': (-32.200, 121.780), 'Eucla': (-31.680, 128.880), 'Ceduna': (-32.130, 133.680), 'Port Augusta': (-32.490, 137.770), 'Adelaide': (-34.929, 138.601), 'Mount Gambier': (-37.830, 140.780), 'Melbourne': (-37.814, 144.963), 'Sale': (-38.100, 147.070), 'Eden': (-37.070, 149.900), 'Wollongong': (-34.420, 150.890), 'Goulburn': (-34.750, 149.720), 'Albury': (-36.080, 146.920), 'Tocumwal': (-35.810, 145.570), 'Dubbo': (-32.250, 148.600), 'Moree': (-29.470, 149.840), 'Goondiwindi': (-28.550, 150.310), 'Toowoomba': (-27.560, 151.950), 'Coober Pedy': (-29.010, 134.750), 'Alice Springs': (-23.700, 133.880), 'Tennant Creek': (-19.650, 134.190), 'Darwin': (-12.460, 130.840), 'Bathurst': (-33.420, 149.580), 'Nyngan': (-31.560, 147.190), 'Cobar': (-31.500, 145.840), 'Broken Hill': (-31.950, 141.470), 'Hobart': (-42.880, 147.330), 'Launceston': (-41.440, 147.140), 'Burnie': (-41.050, 145.900),
 # New Zealand
 'Cape Reinga': (-34.430, 172.680), 'Kaitaia': (-35.110, 173.270), 'Whangarei': (-35.725, 174.324), 'Auckland': (-36.848, 174.763), 'Hamilton': (-37.787, 175.279), 'Taupo': (-38.686, 176.070), 'Waiouru': (-39.480, 175.670), 'Sanson': (-40.220, 175.420), 'Levin': (-40.620, 175.280), 'Wellington': (-41.287, 174.776), 'Picton': (-41.290, 174.000), 'Blenheim': (-41.510, 173.960), 'Kaikoura': (-42.400, 173.680), 'Christchurch': (-43.532, 172.636), 'Timaru': (-44.400, 171.250), 'Oamaru': (-45.100, 170.970), 'Dunedin': (-45.878, 170.503), 'Gore': (-46.100, 168.940), 'Invercargill': (-46.413, 168.354), 'Bluff': (-46.600, 168.330), 'Pokeno': (-37.250, 175.020), 'Tauranga': (-37.687, 176.165), 'Opotiki': (-38.010, 177.290), 'Gisborne': (-38.660, 178.020), 'Napier': (-39.490, 176.910), 'Hastings': (-39.640, 176.840), 'Woodville': (-40.340, 175.870), 'Masterton': (-40.950, 175.660), 'Te Kuiti': (-38.330, 175.160), 'New Plymouth': (-39.060, 174.080), 'Whanganui': (-39.930, 175.050), 'Palmerston North': (-40.350, 175.610), 'Tirau': (-37.980, 175.760), 'Rotorua': (-38.137, 176.252), 'Nelson': (-41.270, 173.280), 'Westport NZ': (-41.750, 171.600), 'Greymouth': (-42.450, 171.210), 'Hokitika': (-42.720, 170.970), 'Franz Josef': (-43.390, 170.180), 'Haast': (-43.880, 169.040), 'Wanaka': (-44.700, 169.130), 'Cromwell': (-45.040, 169.200), 'Queenstown': (-45.031, 168.663), 'Lumsden': (-45.740, 168.440), 'Waipara': (-43.060, 172.750), 'Reefton': (-42.120, 171.860), 'Fairlie': (-44.100, 170.830), 'Twizel': (-44.260, 170.100), 'Alexandra': (-45.250, 169.380), 'Milton': (-46.120, 169.960), 'East Cape': (-37.690, 178.550), 'Arthurs Pass': (-42.940, 171.560), 'Kumara': (-42.630, 171.180),
}

def R(n, g, towns):
    return (n, g, [C[t] for t in towns])

AH = ('Asian Highway shields (AH plus a number) also appear on main roads: AH1 to AH9 cross several regions; '
      'AH10-29 are South-East Asia, AH30-39 East Asia, AH40-59 South Asia, AH60-89 Central and South-West Asia.')
EAH = ('The country also lies on the European E-road and Asian Highway networks (E and AH numbers), '
       'but the national numbers are the ones to learn.')

S = {}
S['JP'] = dict(a3='JPN', hubs=['Tokyo', 'Osaka'], bbox=(129.3, 30.8, 146.0, 45.6), n=AH, routes=[
    R('1', 'rad', ['Tokyo', 'Yokohama', 'Shizuoka', 'Hamamatsu', 'Nagoya', 'Kyoto', 'Osaka']),
    R('4', 'rad', ['Tokyo', 'Utsunomiya', 'Fukushima', 'Sendai', 'Morioka', 'Aomori']),
    R('6', 'rad', ['Tokyo', 'Mito', 'Iwaki', 'Sendai']),
    R('17', 'rad', ['Tokyo', 'Takasaki', 'Nagaoka', 'Niigata']),
    R('20', 'rad', ['Tokyo', 'Hachioji', 'Kofu', 'Shiojiri']),
    R('2', 'rad2', ['Osaka', 'Kobe', 'Okayama', 'Hiroshima', 'Shimonoseki', 'Kitakyushu']),
    R('3', 'oth', ['Kitakyushu', 'Fukuoka', 'Kumamoto', 'Kagoshima']),
    R('5', 'oth', ['Hakodate', 'Otaru', 'Sapporo']),
    R('8', 'oth', ['Niigata', 'Nagaoka', 'Joetsu', 'Toyama', 'Kanazawa', 'Fukui', 'Tsuruga', 'Kyoto'])],
    legend=[('rad', 'Leaves Tokyo (Nihonbashi)'), ('rad2', 'Continues west from Osaka'), ('oth', 'Other trunk route')],
    s='National routes sit on a blue inverted-triangle shield. The low numbers are the old trunk lines out of Tokyo: 1 to Osaka, 4 to Aomori, 6 up the Pacific coast. '
      'Routes from 101 up start in Aomori and rise roughly towards Kyushu and Okinawa (300s); the 400s and 500s were added later. '
      'Expressways have E numbers that copy the national route they run beside: E1 Tomei/Meishin, E4 Tohoku, E17 Kan-etsu, E20 Chuo.')
S['KR'] = dict(a3='KOR', hubs=['Seoul'], bbox=(125.8, 34.2, 130.0, 38.7), n=AH, routes=[
    R('1', 'odd', ['Mokpo', 'Gwangju', 'Jeonju', 'Gongju', 'Cheonan', 'Suwon', 'Seoul', 'Paju']),
    R('3', 'odd', ['Sacheon', 'Jinju', 'Gimcheon', 'Sangju', 'Chungju', 'Icheon', 'Seoul', 'Uijeongbu', 'Cheorwon']),
    R('7', 'odd', ['Busan', 'Ulsan', 'Gyeongju', 'Pohang', 'Uljin', 'Samcheok', 'Gangneung', 'Sokcho', 'Goseong']),
    R('2', 'even', ['Mokpo', 'Suncheon', 'Jinju', 'Changwon', 'Busan']),
    R('6', 'even', ['Incheon', 'Seoul', 'Yangpyeong', 'Hoengseong', 'Pyeongchang', 'Gangneung']),
    R('Exp 1', 'oth', ['Seoul', 'Daejeon', 'Daegu', 'Busan'])],
    legend=[('odd', 'Odd: north-south, rising west to east'), ('even', 'Even: east-west, rising south to north'), ('oth', 'Gyeongbu Expressway (1)')],
    s='A clean grid. Odd national routes run north-south and rise from the west coast (1) to the east coast (7); even routes run east-west and rise from the south coast (2) northwards. '
      'Expressways follow the same rule with two-digit numbers (15 west coast, 35 central, 65 east coast; 10 south coast, 50 Yeongdong); the old Seoul-Busan Gyeongbu Expressway keeps 1. Jeju is not drawn.')
S['TW'] = dict(a3='TWN', hubs=['Taipei'], bbox=(119.9, 21.8, 122.1, 25.4), n=AH, routes=[
    R('1', 'odd', ['Keelung', 'Taipei', 'Taoyuan', 'Hsinchu', 'Taichung', 'Changhua', 'Chiayi', 'Tainan', 'Kaohsiung', 'Pingtung', 'Fangliao']),
    R('3', 'odd', ['Taipei', 'Daxi', 'Dongshi', 'Nantou', 'Douliu', 'Yujing', 'Qishan', 'Pingtung']),
    R('9', 'odd', ['Taipei', 'Yilan', "Su'ao", 'Hualien', 'Taitung', 'Fangliao']),
    R('11', 'odd', ['Hualien', 'Chenggong', 'Taitung']),
    R('2', 'even', ['Tamsui', 'Jinshan', 'Keelung', 'Yilan']),
    R('8', 'even', ['Dongshi', 'Lishan', 'Xincheng']),
    R('20', 'even', ['Tainan', 'Yujing', 'Haiduan', 'Taitung'])],
    legend=[('odd', 'Odd: north-south'), ('even', 'Even: east-west (cross-island)'), ],
    s='Provincial highways sit on a plum-blossom shield. Odd numbers run north-south (1 west plain, 3 foothills, 9 and 11 east coast); even numbers cross the island (8 Central Cross-Island, 20 Southern Cross-Island). '
      'National freeways follow the same idea: 1 and 3 run north-south, 2, 4, 6, 8 and 10 are short east-west links. Kinmen, Matsu and Penghu are not drawn.')
S['CN'] = dict(a3='CHN', hubs=['Beijing'], bbox=(73.0, 18.0, 135.5, 54.0), n=AH, routes=[
    R('G1', 'rad', ['Beijing', 'Tangshan', 'Qinhuangdao', 'Shenyang', 'Changchun', 'Harbin']),
    R('G2', 'rad', ['Beijing', 'Tianjin', 'Jinan', "Huai'an", 'Wuxi', 'Shanghai']),
    R('G3', 'rad', ['Beijing', 'Tianjin', 'Jinan', 'Xuzhou', 'Hefei', 'Fuzhou']),
    R('G4', 'rad', ['Beijing', 'Shijiazhuang', 'Zhengzhou', 'Wuhan', 'Changsha', 'Guangzhou', 'Shenzhen']),
    R('G5', 'rad', ['Beijing', 'Shijiazhuang', 'Taiyuan', "Xi'an", 'Chengdu', 'Kunming']),
    R('G6', 'rad', ['Beijing', 'Zhangjiakou', 'Hohhot', 'Baotou', 'Yinchuan', 'Lanzhou', 'Xining', 'Golmud', 'Lhasa']),
    R('G7', 'rad', ['Beijing', 'Zhangjiakou', 'Bayannur', 'Ejin', 'Hami', 'Urumqi']),
    R('G15', 'odd', ['Shenyang', 'Dalian', 'Yantai', 'Qingdao', 'Lianyungang', 'Shanghai', 'Ningbo', 'Fuzhou', 'Xiamen', 'Shantou', 'Shenzhen', 'Guangzhou', 'Zhanjiang', 'Haikou']),
    R('G30', 'even', ['Lianyungang', 'Xuzhou', 'Zhengzhou', "Xi'an", 'Lanzhou', 'Jiuquan', 'Hami', 'Urumqi', 'Khorgos'])],
    legend=[('rad', 'G1-G7: from Beijing, clockwise from the north-east'), ('odd', 'Two-digit odd: north-south'), ('even', 'Two-digit even: east-west')],
    s='National expressways (G plus a number in a red box on green signs). G1 to G7 leave Beijing clockwise from the north-east; two-digit odd numbers run north-south (G15 is the coast), even numbers east-west (G30 Lianyungang-Khorgos). '
      'Four-digit G numbers are branches and ring roads of their parent. Ordinary national roads follow the same scheme: G101-G112 from Beijing, G2xx north-south, G3xx east-west.')
S['TH'] = dict(a3='THA', hubs=['Bangkok'], n=AH, routes=[
    R('1', 'rad', ['Bangkok', 'Saraburi', 'Nakhon Sawan', 'Kamphaeng Phet', 'Tak', 'Lampang', 'Phayao', 'Chiang Rai', 'Mae Sai']),
    R('2', 'rad', ['Saraburi', 'Nakhon Ratchasima', 'Khon Kaen', 'Udon Thani', 'Nong Khai']),
    R('3', 'rad', ['Bangkok', 'Chonburi', 'Pattaya', 'Rayong', 'Chanthaburi', 'Trat']),
    R('4', 'rad', ['Bangkok', 'Nakhon Pathom', 'Ratchaburi', 'Phetchaburi', 'Hua Hin', 'Chumphon', 'Ranong', 'Phang Nga', 'Krabi', 'Trang', 'Phatthalung', 'Hat Yai', 'Sadao']),
    R('11', 'oth', ['In Buri', 'Phitsanulok', 'Uttaradit', 'Den Chai', 'Lampang', 'Chiang Mai']),
    R('24', 'oth', ['Sikhio', 'Nang Rong', 'Det Udom']),
    R('33', 'oth', ['Hin Kong', 'Prachinburi', 'Aranyaprathet']),
    R('41', 'oth', ['Chumphon', 'Surat Thani', 'Thung Song', 'Phatthalung'])],
    legend=[('rad', 'Highways 1-4 leave Bangkok'), ('oth', 'Two digits: the first digit is the region')],
    s='The four one-digit highways set the regions: 1 north, 2 north-east, 3 east, 4 south. Every two- and three-digit highway starts with the digit of its region, '
      'so 11 and 118 are in the north, 24 and 226 in the north-east, 33 and 304 in the east and centre, 41 and 401 in the south. Four-digit numbers are rural roads.')
S['MY'] = dict(a3='MYS', hubs=['Kuala Lumpur'], bbox=(99.5, 1.2, 104.7, 6.8), n=AH, routes=[
    R('FT1', 'rad', ['Bukit Kayu Hitam', 'Alor Setar', 'Sungai Petani', 'Taiping', 'Ipoh', 'Tanjung Malim', 'Kuala Lumpur', 'Seremban', 'Tampin', 'Segamat', 'Yong Peng', 'Johor Bahru']),
    R('FT2', 'rad', ['Port Klang', 'Kuala Lumpur', 'Bentong', 'Temerloh', 'Kuantan']),
    R('FT3', 'oth', ['Johor Bahru', 'Kota Tinggi', 'Mersing', 'Kuantan', 'Kuala Terengganu', 'Kota Bharu', 'Rantau Panjang'])],
    legend=[('rad', 'FT1 and FT2 through Kuala Lumpur'), ('oth', 'FT3 east coast road')],
    s='Federal roads carry plain numbers (FT1 in official use) on blue signs: FT1 is the old west-coast trunk road, FT2 crosses to Kuantan, FT3 follows the east coast; the Pan Borneo road in Sarawak is also FT1 (Borneo is not drawn). '
      'State roads carry the state letter in front of the number: A Perak, B Selangor, C Pahang, D Kelantan, J Johor, K Kedah, M Melaka, N Negeri Sembilan, P Penang, R Perlis, T Terengganu. Expressways are E numbers (E1/E2 North-South Expressway).')
S['PH'] = dict(a3='PHL', hubs=['Manila'], n=AH, routes=[
    R('N1', 'rad', ['Laoag', 'Vigan', 'San Fernando LU', 'Rosario LU', 'Urdaneta', 'Tarlac', 'San Fernando P', 'Manila', 'Lucena', 'Naga', 'Legazpi', 'Matnog', 'Allen', 'Catbalogan', 'Tacloban', 'Surigao', 'Butuan', 'Davao', 'Cotabato', 'Pagadian', 'Zamboanga'])],
    legend=[('rad', 'N1: Laoag to Zamboanga, mostly the Pan-Philippine Highway (AH26)')],
    s='National roads carry N plus a number on pentagonal black-on-white shields. N1 runs from Laoag down the west of Luzon to Manila, then through Bicol, Samar, Leyte and Mindanao to Zamboanga. '
      'One- and two-digit N numbers are primary roads, three-digit numbers secondary roads; tertiary roads have no number. Expressways are E roads (E1 NLEX, E2 SLEX).')
S['VN'] = dict(a3='VNM', hubs=['Hanoi'], bbox=(102.0, 8.4, 110.0, 23.5), n=AH, routes=[
    R('QL1', 'oth', ['Lang Son', 'Hanoi', 'Ninh Binh', 'Thanh Hoa', 'Vinh', 'Dong Hoi', 'Hue', 'Da Nang', 'Quang Ngai', 'Quy Nhon', 'Nha Trang', 'Phan Thiet', 'Ho Chi Minh City', 'Can Tho', 'Ca Mau']),
    R('QL2', 'rad', ['Hanoi', 'Viet Tri', 'Tuyen Quang', 'Ha Giang']),
    R('QL3', 'rad', ['Hanoi', 'Thai Nguyen', 'Bac Kan', 'Cao Bang']),
    R('QL5', 'rad', ['Hanoi', 'Hai Duong', 'Hai Phong']),
    R('QL6', 'rad', ['Hanoi', 'Hoa Binh', 'Son La', 'Lai Chau']),
    R('QL14', 'oth', ['Kon Tum', 'Pleiku', 'Buon Ma Thuot', 'Dong Xoai'])],
    legend=[('rad', 'Low numbers leave Hanoi'), ('oth', 'North-south spines (coast and Central Highlands)')],
    s='National roads are QL (Quốc lộ). QL1 runs the whole coast from Lang Son to Ca Mau; QL2, 3, 5 and 6 fan out from Hanoi into the north. '
      'Provincial roads are ĐT (or TL) and have white kilometre stones with blue or green tops. Expressways are CT numbers, with CT.01 for the North-South Expressway.')
S['KH'] = dict(a3='KHM', hubs=['Phnom Penh'], n=AH, routes=[
    R('1', 'rad', ['Phnom Penh', 'Neak Loeung', 'Svay Rieng', 'Bavet']),
    R('2', 'rad', ['Phnom Penh', 'Takeo', 'Phnom Den']),
    R('3', 'rad', ['Phnom Penh', 'Kampot', 'Veal Renh']),
    R('4', 'rad', ['Phnom Penh', 'Kampong Speu', 'Sihanoukville']),
    R('5', 'rad', ['Phnom Penh', 'Kampong Chhnang', 'Pursat', 'Battambang', 'Sisophon', 'Poipet']),
    R('6', 'rad', ['Phnom Penh', 'Skun', 'Kampong Thom', 'Siem Reap', 'Sisophon']),
    R('7', 'rad', ['Skun', 'Kampong Cham', 'Kratie', 'Stung Treng', 'Dom Kralor']),
    R('48', 'oth', ['Sre Ambel', 'Koh Kong']),
    R('62', 'oth', ['Kampong Thom', 'Preah Vihear'])],
    legend=[('rad', 'NR1-NR7 leave Phnom Penh clockwise from the south-east'), ('oth', 'Two digits: first digit = parent road')],
    s='National roads 1 to 7 fan out of Phnom Penh clockwise: 1 south-east to Vietnam, 2 and 3 south, 4 to Sihanoukville, 5 north-west to Thailand, 6 to Siem Reap, 7 north-east to Laos. '
      'A two-digit road starts with the digit of the road it leaves: 48 branches off 4 to Koh Kong, 62 off 6 to Preah Vihear.')
S['LA'] = dict(a3='LAO', hubs=['Vientiane'], n=AH, routes=[
    R('13', 'rad', ['Boten', 'Oudomxay', 'Luang Prabang', 'Phou Khoun', 'Vang Vieng', 'Vientiane', 'Paksan', 'Thakhek', 'Savannakhet', 'Pakse', 'Veunkham']),
    R('3', 'oth', ['Nateuy', 'Luang Namtha', 'Vieng Phouka', 'Houayxay']),
    R('7', 'oth', ['Phou Khoun', 'Phonsavan', 'Nam Khan']),
    R('8', 'oth', ['Vieng Kham', 'Lak Sao', 'Nam Phao']),
    R('9', 'oth', ['Savannakhet', 'Xeno', 'Phin', 'Dansavanh']),
    R('12', 'oth', ['Thakhek', 'Mahaxay', 'Na Phao'])],
    legend=[('rad', 'Route 13: the north-south backbone'), ('oth', 'Main links to Thailand and Vietnam')],
    s='Route 13 runs the length of the country, from the Chinese border at Boten through Luang Prabang, Vientiane and Pakse to Cambodia. '
      'Other national roads are numbered roughly north to south: 1 to 7 in the north, 8 to 12 in the centre, 14 and up in the south. Many have A/B suffixes (1A, 13N, 13S).')
S['BD'] = dict(a3='BGD', hubs=['Dhaka'], n=AH, routes=[
    R('N1', 'rad', ['Dhaka', 'Comilla', 'Feni', 'Chittagong', "Cox's Bazar", 'Teknaf']),
    R('N2', 'rad', ['Dhaka', 'Narsingdi', 'Sarail', 'Shaistaganj', 'Sylhet', 'Tamabil']),
    R('N3', 'rad', ['Dhaka', 'Joydebpur', 'Mymensingh']),
    R('N4', 'rad', ['Joydebpur', 'Tangail', 'Jamalpur']),
    R('N5', 'rad', ['Dhaka', 'Manikganj', 'Kashinathpur', 'Hatikamrul', 'Bogra', 'Rangpur', 'Panchagarh', 'Banglabandha']),
    R('N6', 'rad', ['Kashinathpur', 'Natore', 'Rajshahi']),
    R('N7', 'rad', ['Daulatdia', 'Faridpur', 'Magura', 'Jessore', 'Khulna', 'Mongla']),
    R('N8', 'rad', ['Dhaka', 'Mawa', 'Bhanga', 'Barisal', 'Patuakhali'])],
    legend=[('rad', 'N1-N8: clockwise round Dhaka from the south-east')],
    s='The eight national highways go round Dhaka clockwise: N1 south-east to Chittagong, N2 north-east to Sylhet, N3 and N4 north, N5 north-west to Rangpur, N6 west to Rajshahi, N7 south-west to Khulna, N8 south to Barisal. '
      'Three-digit N roads start with the digit of the highway they leave (N102 off N1, N502 off N5); R and Z roads are regional and district roads.')
S['IN'] = dict(a3='IND', hubs=['Delhi'], bbox=(68.0, 6.5, 97.5, 37.5), n=AH, routes=[
    R('NH44', 'even', ['Srinagar', 'Jammu', 'Jalandhar', 'Ambala', 'Delhi', 'Agra', 'Gwalior', 'Jhansi', 'Sagar', 'Nagpur', 'Hyderabad', 'Kurnool', 'Bengaluru', 'Krishnagiri', 'Salem', 'Madurai', 'Kanyakumari']),
    R('NH48', 'even', ['Delhi', 'Jaipur', 'Ajmer', 'Udaipur', 'Ahmedabad', 'Vadodara', 'Surat', 'Mumbai', 'Pune', 'Belagavi', 'Bengaluru', 'Krishnagiri', 'Vellore', 'Chennai']),
    R('NH16', 'even', ['Kolkata', 'Balasore', 'Bhubaneswar', 'Visakhapatnam', 'Rajahmundry', 'Vijayawada', 'Nellore', 'Chennai']),
    R('NH66', 'even', ['Panvel', 'Ratnagiri', 'Panaji', 'Mangaluru', 'Kozhikode', 'Kochi', 'Thiruvananthapuram', 'Kanyakumari']),
    R('NH27', 'odd', ['Porbandar', 'Rajkot', 'Udaipur', 'Kota', 'Jhansi', 'Kanpur', 'Lucknow', 'Gorakhpur', 'Muzaffarpur', 'Purnia', 'Siliguri', 'Guwahati', 'Silchar']),
    R('NH19', 'odd', ['Agra', 'Kanpur', 'Prayagraj', 'Varanasi', 'Dhanbad', 'Kolkata']),
    R('NH53', 'odd', ['Hazira', 'Dhule', 'Akola', 'Nagpur', 'Raipur', 'Sambalpur', 'Cuttack', 'Paradip'])],
    legend=[('even', 'Even: north-south, rising east to west'), ('odd', 'Odd: east-west, rising north to south')],
    s='Since 2010 the grid is: even national highways run north-south and rise from east to west (NH16 east coast, NH44 centre, NH48 and NH66 west); odd highways run east-west and rise from north to south (NH27 across the north, NH53 across the middle). '
      'Three-digit highways are spurs that end in their parent number: NH544 and NH744 branch off NH44, NH148 off NH48. Older signs and maps still show the pre-2010 numbers.')
S['LK'] = dict(a3='LKA', hubs=['Colombo'], n=AH, routes=[
    R('A1', 'rad', ['Colombo', 'Kegalle', 'Kandy']),
    R('A2', 'rad', ['Colombo', 'Kalutara', 'Galle', 'Matara', 'Hambantota', 'Wellawaya']),
    R('A3', 'rad', ['Colombo', 'Negombo', 'Chilaw', 'Puttalam']),
    R('A4', 'rad', ['Colombo', 'Avissawella', 'Ratnapura', 'Wellawaya', 'Moneragala', 'Batticaloa']),
    R('A6', 'oth', ['Ambepussa', 'Kurunegala', 'Dambulla', 'Trincomalee']),
    R('A9', 'oth', ['Kandy', 'Matale', 'Dambulla', 'Anuradhapura', 'Vavuniya', 'Jaffna']),
    R('E01', 'rad2', ['Kottawa', 'Galle', 'Matara', 'Hambantota']),
    R('E03', 'rad2', ['Colombo', 'Katunayake'])],
    legend=[('rad', 'A1-A4 leave Colombo'), ('oth', 'Other A roads'), ('rad2', 'E expressways')],
    s='A roads are the trunk network: A1 Colombo-Kandy, A2 down the south-west coast, A3 north up the coast, A4 east to Batticaloa (the longest); A9 is the road to Jaffna. '
      'Expressways are E01 to E04 (E01 Southern Expressway, E03 to the airport). B roads are the second tier.')
S['PK'] = dict(a3='PAK', hubs=['Islamabad'], n=AH, routes=[
    R('N-5', 'rad', ['Karachi', 'Hyderabad PK', 'Sukkur', 'Rahim Yar Khan', 'Multan', 'Sahiwal', 'Lahore', 'Gujranwala', 'Jhelum', 'Rawalpindi', 'Peshawar', 'Torkham']),
    R('N-25', 'rad', ['Karachi', 'Khuzdar', 'Kalat', 'Quetta', 'Chaman']),
    R('N-55', 'rad', ['Karachi', 'Sehwan', 'Larkana', 'Dera Ghazi Khan', 'Dera Ismail Khan', 'Kohat', 'Peshawar']),
    R('N-35', 'rad', ['Hasan Abdal', 'Abbottabad', 'Chilas', 'Gilgit', 'Sost', 'Khunjerab']),
    R('N-10', 'rad', ['Karachi', 'Ormara', 'Pasni', 'Gwadar']),
    R('M-2', 'rad2', ['Islamabad', 'Kallar Kahar', 'Pindi Bhattian', 'Lahore'])],
    legend=[('rad', 'National highways: N numbers in steps of 5'), ('rad2', 'Motorways (M, green signs)')],
    s='National highways go up in fives: N-5 is the Grand Trunk road from Karachi to the Khyber Pass, N-10 the Makran coast, N-25 Karachi-Quetta-Chaman, N-35 the Karakoram Highway, N-55 the Indus Highway. '
      'Motorways are M-1 to M-11 on green signs (M-2 Islamabad-Lahore was the first).')
S['KZ'] = dict(a3='KAZ', hubs=['Astana'], n=EAH, routes=[
    R('KAZ01', 'rad', ['Astana', 'Karaganda', 'Balkhash', 'Almaty']),
    R('KAZ02', 'rad', ['Astana', 'Kokshetau', 'Petropavl']),
    R('KAZ03', 'rad', ['Astana', 'Atbasar', 'Kostanay']),
    R('KAZ04', 'rad', ['Astana', 'Pavlodar']),
    R('KAZ06', 'oth', ['Martuk border', 'Aktobe', 'Aral', 'Kyzylorda', 'Turkistan', 'Shymkent', 'Taraz', 'Almaty', 'Khorgos KZ']),
    R('KAZ07', 'oth', ['Maykapshagay', 'Zaysan', 'Semey', 'Pavlodar', 'KZ border NE']),
    R('KAZ08', 'oth', ['Almaty', 'Taldykorgan', 'Ayagoz', 'Oskemen']),
    R('KAZ09', 'oth', ['Aktobe', 'Atyrau']),
    R('KAZ10', 'oth', ['Aktobe', 'Oral']),
    R('KAZ11', 'oth', ['Dossor', 'Beyneu', 'Aktau'])],
    legend=[('rad', 'KAZ01-KAZ04 leave Astana'), ('oth', 'Other KAZ roads')],
    s='Since 2024 the main roads are KAZ01 to KAZ23: KAZ01 to KAZ05 start in Astana, KAZ06 is the long road from Aktobe through Shymkent and Almaty to China. '
      'Roads inside one region are KZ plus the region code and a number (KZ03-08 is in Akmola). Street View is older, so expect the Soviet-style M-36, M-32, A-2 numbers on signs.')
S['KG'] = dict(a3='KGZ', hubs=['Bishkek'], n=EAH, routes=[
    R('ЭМ-04', 'rad', ['Bishkek', 'Kara-Balta', 'Too Ashuu', 'Toktogul', 'Tash-Komur', 'Jalal-Abad', 'Ozgon', 'Osh']),
    R('ЭМ-11', 'rad', ['Bishkek', 'Tokmok', 'Balykchy', 'Kochkor', 'Naryn', 'Torugart']),
    R('ЭМ-09', 'oth', ['Balykchy', 'Cholpon-Ata', 'Tup', 'Karakol']),
    R('ЭМ-10', 'oth', ['Balykchy', 'Bokonbaev', 'Karakol']),
    R('ЭМ-05', 'oth', ['Osh', 'Gulcho', 'Sary-Tash', 'Irkeshtam']),
    R('ЭМ-18', 'oth', ['Kochkor', 'Chaek', 'Suusamyr', 'Too Ashuu']),
    R('ЭМ-16', 'oth', ['Osh', 'Kadamjay', 'Batken', 'Isfana'])],
    legend=[('rad', 'Leaves Bishkek'), ('oth', 'Other ЭМ roads')],
    s='International and state roads are ЭМ-01 to ЭМ-22: ЭМ-04 is the Bishkek-Osh road over the Töö-Ashuu pass, ЭМ-11 runs Bishkek-Naryn-Torugart, ЭМ-09 and ЭМ-10 go round Issyk-Kul. '
      'Older imagery shows the former M-39, M-41 and A-365 numbers.')
S['GE'] = dict(a3='GEO', hubs=['Tbilisi'], n=EAH, routes=[
    R('S1', 'rad', ['Tbilisi', 'Mtskheta', 'Gori', 'Khashuri', 'Zestaponi', 'Samtredia', 'Senaki', 'Zugdidi']),
    R('S3', 'rad', ['Mtskheta', 'Pasanauri', 'Gudauri', 'Stepantsminda', 'Larsi']),
    R('S4', 'rad', ['Tbilisi', 'Rustavi', 'Red Bridge']),
    R('S5', 'rad', ['Tbilisi', 'Sagarejo', 'Gurjaani', 'Lagodekhi']),
    R('S6', 'rad', ['Tbilisi', 'Marneuli', 'Guguti']),
    R('S2', 'oth', ['Senaki', 'Poti', 'Kobuleti', 'Batumi', 'Sarpi']),
    R('S8', 'oth', ['Khashuri', 'Borjomi', 'Akhaltsikhe', 'Vale']),
    R('S11', 'oth', ['Akhaltsikhe', 'Akhalkalaki', 'Ninotsminda']),
    R('S12', 'oth', ['Samtredia', 'Lanchkhuti', 'Grigoleti'])],
    legend=[('rad', 'Leaves Tbilisi'), ('oth', 'Western and southern links')],
    s='International roads are S1 to S12, written ს on signs. S1 is the east-west spine from Tbilisi to the Black Sea (and on into Abkhazia), S2 the coast road to Batumi and Turkey, S3 the Military Road to Russia. '
      'National roads are შ (Sh) plus a number.')
S['AM'] = dict(a3='ARM', hubs=['Yerevan'], n=EAH, routes=[
    R('M1', 'rad', ['Yerevan', 'Ashtarak', 'Talin', 'Gyumri', 'Bavra']),
    R('M2', 'rad', ['Yerevan', 'Ararat', 'Yeghegnadzor', 'Sisian', 'Goris', 'Kapan', 'Meghri']),
    R('M4', 'rad', ['Yerevan', 'Hrazdan', 'Sevan', 'Dilijan', 'Ijevan', 'Azatamut']),
    R('M5', 'rad', ['Yerevan', 'Armavir', 'Margara']),
    R('M3', 'oth', ['Margara', 'Ashtarak', 'Aparan', 'Vanadzor', 'Stepanavan', 'Dzoramut']),
    R('M6', 'oth', ['Vanadzor', 'Alaverdi', 'Bagratashen']),
    R('M10', 'oth', ['Sevan', 'Martuni', 'Yeghegnadzor'])],
    legend=[('rad', 'Leaves Yerevan'), ('oth', 'Other M roads')],
    s='Interstate roads are M1 to M17, written Մ on signs: M1 north-west to Gyumri, M2 south to Iran, M4 north-east past Lake Sevan, M5 west towards the closed Turkish border. '
      'H roads are the republic roads.')
S['IL'] = dict(a3='ISR', hubs=['Tel Aviv', 'Jerusalem'], n='', routes=[
    R('2', 'even', ['Tel Aviv', 'Netanya', 'Hadera', 'Haifa']),
    R('6', 'even', ['Lehavim', 'Kiryat Gat', 'Rosh HaAyin', 'Iron', 'Yokneam']),
    R('40', 'even', ['Kfar Saba', 'Ramla', 'Kiryat Gat', 'Beersheba', 'Mitzpe Ramon', 'Ketura']),
    R('90', 'even', ['Eilat', 'Ein Bokek', 'Jericho', 'Beit Shean', 'Tiberias', 'Kiryat Shmona', 'Metula']),
    R('1', 'odd', ['Tel Aviv', 'Jerusalem', 'Beit HaArava']),
    R('25', 'odd', ['Netivot', 'Beersheba', 'Dimona', 'Arava jn']),
    R('65', 'odd', ['Hadera', 'Afula', 'Golani', 'Rosh Pina'])],
    legend=[('even', 'Even: north-south, rising west to east'), ('odd', 'Odd: west-east, rising south to north')],
    s='Even numbers run north-south and rise from the coast inland (2 coast, 4, 6 Trans-Israel, 90 Jordan Valley); odd numbers run west-east and rise from south to north (12 and 13 near Eilat, 25 Negev, 65 Galilee). '
      'Highway 1 is the exception, running north of 3. Two-digit roads are national, three-digit regional, four-digit local. Route 90 runs through the Jordan Valley in the West Bank.')
S['JO'] = dict(a3='JOR', hubs=['Amman'], n='', routes=[
    R('15', 'odd', ['Jaber', 'Zarqa', 'Amman', 'Qatraneh', "Ma'an", 'Aqaba']),
    R('35', 'odd', ['Irbid', 'Jerash', 'Amman', 'Madaba', 'Karak', 'Tafilah', 'Shoubak', 'Wadi Musa']),
    R('65', 'odd', ['Al-Himma', 'Deir Alla', 'Dead Sea JO', 'Safi', 'Aqaba']),
    R('10', 'even', ['Irbid', 'Mafraq', 'Safawi', 'Ruwaished']),
    R('40', 'even', ['Azraq', 'Amman', 'Dead Sea JO'])],
    legend=[('odd', 'Odd: north-south (15 desert, 35 King\'s Highway, 65 valley)'), ('even', 'Even: east-west, rising north to south')],
    s='Odd highways run north-south and rise from east to west: 15 Desert Highway, 35 King\'s Highway over the plateau, 65 down the Jordan Valley and Dead Sea. '
      'Even highways run east-west and rise from north to south: 10 across the north to Iraq, 40 Azraq-Amman-Dead Sea, up to 80 near Aqaba.')
S['AE'] = dict(a3='ARE', hubs=['Dubai', 'Abu Dhabi'], n='', routes=[
    R('E11', 'odd', ['Ghuwaifat', 'Ruwais', 'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah']),
    R('E311', 'odd', ['Ghantoot', 'E311 Dubai', 'E311 Sharjah', 'E311 north', 'Ras Al Khaimah']),
    R('E99', 'odd', ['Dibba', 'Fujairah', 'Kalba']),
    R('E22', 'even', ['Abu Dhabi', 'Al Ain']),
    R('E44', 'even', ['Dubai', 'Hatta']),
    R('E66', 'even', ['Dubai', 'Al Ain']),
    R('E88', 'even', ['Sharjah', 'Al Dhaid', 'Masafi', 'Fujairah'])],
    legend=[('odd', 'Odd: along the coast, rising inland'), ('even', 'Even: away from the Gulf, rising to the north-east')],
    s='Federal roads are E plus a number. Odd routes run along the Gulf coast and rise inland: E11 is the coast road, E311 and E611 run parallel behind it, E99 is the east coast. '
      'Even routes run from the Gulf inland and rise towards the north-east: E10s and E20s in Abu Dhabi, E44 Dubai-Hatta, E66 Dubai-Al Ain, E88 Sharjah-Fujairah.')
S['OM'] = dict(a3='OMN', hubs=['Muscat'], bbox=(52.0, 16.5, 60.0, 25.1), n='', routes=[
    R('N5 (1)', 'rad', ['Muscat', 'Seeb', 'Barka', 'Suwaiq', 'Sohar', 'Shinas', 'Khatmat Malaha']),
    R('N2 (15)', 'rad', ['Muscat', 'Bidbid', 'Izki', 'Nizwa', 'Bahla', 'Ibri', 'Hafit']),
    R('N4 (23)', 'rad', ['Bidbid', 'Ibra', 'Al Kamil', 'Sur']),
    R('A2', 'rad', ['Muscat', 'Qurayyat', 'Tiwi', 'Sur']),
    R('N3 (31)', 'oth', ['Nizwa', 'Adam', 'Haima', 'Thumrait', 'Salalah'])],
    legend=[('rad', 'Leaves Muscat (old number in brackets)'), ('oth', 'Interior road to Salalah')],
    s='Oman renumbered its roads in 2019: N for national roads (N1-N10), A for arterial, S for secondary. Street View mostly shows the old numbers: Route 1 up the Batinah coast, 15 to Nizwa, 23 to Sur and 31 across the desert to Salalah. Musandam is not drawn.')
S['AU'] = dict(a3='AUS', hubs=['Sydney', 'Melbourne'], bbox=(112.0, -44.0, 154.0, -10.0), n='', routes=[
    R('A1/M1', 'rad', ['Sydney', 'Newcastle AU', 'Coffs Harbour', 'Brisbane', 'Rockhampton', 'Mackay', 'Townsville', 'Cairns', 'Normanton', 'Borroloola', 'Daly Waters', 'Katherine', 'Kununurra', 'Broome', 'Port Hedland', 'Carnarvon', 'Geraldton', 'Perth AU', 'Albany', 'Esperance', 'Norseman', 'Eucla', 'Ceduna', 'Port Augusta', 'Adelaide', 'Mount Gambier', 'Melbourne', 'Sale', 'Eden', 'Wollongong', 'Sydney']),
    R('1', 'rad', ['Hobart', 'Launceston', 'Burnie']),
    R('M31', 'oth', ['Sydney', 'Goulburn', 'Albury', 'Melbourne']),
    R('A32', 'oth', ['Sydney', 'Bathurst', 'Dubbo', 'Nyngan', 'Cobar', 'Broken Hill', 'Adelaide']),
    R('A39', 'oth', ['Tocumwal', 'Dubbo', 'Moree', 'Goondiwindi', 'Toowoomba']),
    R('87', 'oth', ['Port Augusta', 'Coober Pedy', 'Alice Springs', 'Tennant Creek', 'Daly Waters', 'Katherine', 'Darwin'])],
    legend=[('rad', 'Highway 1 loops the continent'), ('oth', 'Interstate routes (Hume, Barrier, Newell, Stuart)')],
    s='Highway 1 runs right round the coast. The eastern states (and SA, Tasmania) sign routes with letters: M motorways, A main routes, B secondary, C minor, so the Hume is M31 and the Newell A39. '
      'WA and the NT still mostly use the older green-and-gold National Highway and blue State Route shields with plain numbers (the Stuart is 87).')
S['NZ'] = dict(a3='NZL', hubs=['Auckland', 'Wellington'], bbox=(166.0, -47.4, 178.7, -34.3), n='', routes=[
    R('1', 'rad', ['Cape Reinga', 'Kaitaia', 'Whangarei', 'Auckland', 'Hamilton', 'Taupo', 'Waiouru', 'Sanson', 'Levin', 'Wellington']),
    R('1', 'rad', ['Picton', 'Blenheim', 'Kaikoura', 'Christchurch', 'Timaru', 'Oamaru', 'Dunedin', 'Gore', 'Invercargill', 'Bluff']),
    R('2', 'oth', ['Pokeno', 'Tauranga', 'Opotiki', 'Gisborne', 'Napier', 'Hastings', 'Woodville', 'Masterton', 'Wellington']),
    R('3', 'oth', ['Hamilton', 'Te Kuiti', 'New Plymouth', 'Whanganui', 'Palmerston North', 'Woodville']),
    R('5', 'oth', ['Tirau', 'Rotorua', 'Taupo', 'Napier']),
    R('6', 'oth', ['Blenheim', 'Nelson', 'Westport NZ', 'Greymouth', 'Hokitika', 'Franz Josef', 'Haast', 'Wanaka', 'Cromwell', 'Queenstown', 'Lumsden', 'Invercargill']),
    R('7', 'oth', ['Waipara', 'Reefton', 'Greymouth']),
    R('8', 'oth', ['Timaru', 'Fairlie', 'Twizel', 'Cromwell', 'Alexandra', 'Milton']),
    R('35', 'rad2', ['Opotiki', 'East Cape', 'Gisborne']),
    R('73', 'rad2', ['Christchurch', 'Arthurs Pass', 'Kumara'])],
    legend=[('rad', 'SH1 runs the full length'), ('oth', 'SH2-5 North Island, SH6-8 South Island'), ('rad2', 'Two digits: 10-58 North Island, 60-99 South Island')],
    s='State Highway 1 runs from Cape Reinga to Bluff, on red shields. 2 to 5 are the key North Island highways and 6 to 8 the key South Island ones. '
      'Two-digit numbers go north to south by region: 10s Northland and Auckland up to the 50s around Wellington, then 60s Nelson and Marlborough, 70s Canterbury and West Coast, 80s Otago, 90s Southland.')

TEXT = {  # (text, footnote)
 'ID': ('Indonesia numbers national roads island by island, starting again at 1 on each main island. Route signs have a coloured band on top (NASIONAL or TOL on red, PROVINSI on blue), then a region code and the route number. They are uncommon in Street View, so road names (Jalan ...) matter more.', AH),
 'NP': ('Nepal\'s highways are mostly known by name. The old H numbers are still widely used: H01 Mahendra (East-West) Highway along the Terai, H02 Tribhuvan Highway, H03 Arniko Highway to Tibet, H04 Prithvi Highway Kathmandu-Pokhara.', AH),
 'BT': ('Bhutan has essentially one road network: the Lateral Road across the mountains plus the highway from Phuentsholing up to Thimphu. Roads are known by name, not number.', ''),
 'AF': ('Afghanistan has a Ring Road (Highway 1) linking Kabul, Kandahar, Herat and Mazar-i-Sharif, but coverage is tiny and numbers are not signed.', ''),
 'IQ': ('Iraq signs destinations, not numbers. Expressway 1 runs from the Jordan border via Baghdad to Basra; coverage is mostly in the Kurdistan Region.', AH),
 'LB': ('Lebanon\'s roads are known by name; numbers are not used on signs. The coastal highway runs Tripoli-Beirut-Sidon-Tyre, and the Beirut-Damascus road climbs over the mountains.', AH),
 'QA': ('Qatar\'s roads are named, not numbered: Al Shamal Road runs north, Salwa Road south-west to Saudi Arabia, Dukhan Road west, and Al Majd Road rings Doha.', ''),
 'PS': ('Palestine has no numbers of its own on signs. On roads under Israeli administration the Israeli numbers apply: 60 north-south along the ridge, 90 in the Jordan Valley.', ''),
 'MN': ('Mongolia\'s paved roads radiate from Ulaanbaatar; numbers are rarely signed, so read the destinations. The Asian Highway AH3 runs north-south through Ulaanbaatar from Russia to the Chinese border at Zamyn-Üüd.', AH),
 'HK': ('Hong Kong numbers its main roads Route 1 to Route 10 on yellow bullet-shaped shields (Route 1 Aberdeen to Sha Tin, Route 9 the New Territories ring); other streets are named.', ''),
 'MO': ('Macau is too small for route numbers; roads are named in Portuguese and Chinese (Avenida, Estrada, Rua).', ''),
 'SG': ('Singapore has no route numbers: expressways go by three-letter names (PIE, AYE, CTE, ECP, BKE, KJE, SLE, TPE, KPE, MCE) and all other roads by name.', ''),
 'MV': ('The Maldives have no route numbers; roads on each island are named, and the Sinamalé Bridge links Malé to Hulhulé and Hulhumalé.', ''),
 'IO': ('Diego Garcia has one small road network on a single atoll and no route numbers.', ''),
 'GU': ('Guam has numbered Guam Highways on small white shields: Route 1 (Marine Corps Drive) runs up the west coast, Route 4 down the east side.', ''),
 'AS': ('American Samoa has one main coastal road along Tutuila and no route numbers worth learning.', ''),
 'MP': ('The Northern Mariana Islands\' roads are known by name (Beach Road, Middle Road on Saipan); numbers are not useful.', ''),
 'CX': ('Christmas Island has a handful of roads and no route numbers.', ''),
 'CC': ('The Cocos (Keeling) Islands have only a few kilometres of road and no route numbers.', ''),
 'PN': ('Pitcairn has a few dirt tracks around Adamstown and no route numbers.', ''),
 'UM': ('Midway Atoll has a few roads on Sand Island and no route numbers.', ''),
 'VU': ('Vanuatu has no national route numbering; on Efate the main road is the ring road round the island.', ''),
}

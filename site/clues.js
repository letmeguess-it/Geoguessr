/* Text clues for the Decode tab and the Key Card "Read the signs" block.
   Curated by hand from the cheatsheets, the Language Clues sheet and general knowledge of European signage.
   Codes are the country domains (DE, AT, ... UK). A leading + on a key means it also matches at the end of a longer word (Hauptstraße, Kungsgatan). */
window.CLUES_RAW = {
words: `
## street
+straße | street | DE AT
+strasse | street (no ß: Swiss and Liechtenstein spelling, or German in capitals) | CH LI DE AT
+Str. | street, abbreviated | DE AT CH LI RO
+weg | way, path | DE AT CH LI
+gasse | lane | AT DE CH LI
+allee | avenue | DE AT
+platz | square | DE AT CH LI
+ufer | embankment | DE AT CH
+steig | path | DE AT CH
+pfad | path | DE AT CH LI
+chaussee | high road | DE
+promenade | promenade | DE AT CH FR
+markt | market square | DE AT
Ring | ring road | DE AT
+straat | street | NL BE
+weg | road | NL BE
Ring | ring road | NL BE
+laan | avenue | NL BE
+plein | square | NL BE
+gracht | canal street | NL
+dijk | dike road | NL BE
+singel | canal ring | NL BE
+kade | quay | NL BE
+steeg | alley | NL BE
+baan | road | NL BE
Strooss | street (Luxembourgish) | LU
Plaz | square (Luxembourgish, Romansh) | LU CH
Gaass | lane (Luxembourgish) | LU
Wee | way (Luxembourgish) | LU
Rue | street | FR BE LU CH MC JE
Avenue | avenue | FR BE LU CH MC UK IE JE GI IM
Boulevard | boulevard | FR BE LU CH MC
Chemin | lane, track | FR BE LU CH MC
Place | square | FR BE LU CH MC UK IE JE GI IM
Impasse | dead end | FR BE LU CH MC
Allée | lane | FR BE LU CH MC
Quai | quay | FR BE LU CH MC
Route | road | FR BE LU CH MC
Cours | avenue | FR
Ruelle | alley | FR BE
Passage | passage | FR BE CH
Faubourg | suburb street | FR
Rond-point | roundabout | FR BE LU CH MC
Sentier | path | FR BE LU CH
Clos | close | FR BE CH JE
Via | street | IT SM CH
Viale | avenue | IT SM CH
Piazza | square | IT SM CH
Piazzale | large square | IT SM CH
Corso | avenue | IT SM
Vicolo | alley | IT SM CH
Largo | small square | IT SM PT
Strada | road, street | IT SM CH RO
Lungomare | seafront road | IT SM
Contrada | district street | IT SM
Salita | steep street | IT SM CH
Borgo | village street | IT SM
Ponte | bridge | IT SM PT CH
Calle | street | ES
Avenida | avenue | ES PT
Plaza | square | ES
Paseo | promenade | ES
Camino | path | ES
Carretera | road | ES AD
Ronda | ring road | ES AD
Travesía | cross street | ES
Glorieta | roundabout | ES
Carrer | street (Catalan) | ES AD
Avinguda | avenue (Catalan) | ES AD
Plaça | square (Catalan) | ES AD
Passeig | promenade (Catalan) | ES AD
Camí | path (Catalan) | ES AD
Kalea | street (Basque) | ES
Etorbidea | avenue (Basque) | ES
Bidea | road (Basque) | ES
Rúa | street (Galician) | ES
Praza | square (Galician) | ES
Camiño | path (Galician) | ES
Rua | street | PT
Praça | square | PT
Travessa | lane | PT
Estrada | road | PT ES
Alameda | avenue | PT ES
Beco | alley | PT
Calçada | paved road | PT
Caminho | path | PT
Rotunda | roundabout | PT ES
Urbanização | housing estate | PT
Bulevardul | boulevard | RO
Calea | avenue | RO
Aleea | alley | RO
Piața | square | RO
Șoseaua | highway | RO
Drumul | road | RO
Splaiul | embankment | RO
Intrarea | entrance lane | RO
Ulica | street | HR SK PL SI RS BA ME XK
Ul. | street, abbreviated | PL BG RU SK
Ulice | street | CZ
Třída | avenue | CZ
Náměstí | square | CZ
Námestie | square | SK
Cesta | road | SI SK CZ HR
Trg | square | HR SI RS BA ME MK
Put | road | RS BA ME HR
Obala | waterfront | HR ME
Šetalište | promenade | HR RS BA ME
Bulevar | boulevard | RS BA ME HR MK
Plac | square | PL
Aleja | avenue | PL LV
Aleje | avenues | PL
Rynek | market square | PL
Osiedle | housing estate | PL
Droga | road | PL
Szosa | highway | PL
Utca | street | HU
Út | road | HU
Tér | square | HU
Körút | boulevard | HU
Sétány | promenade | HU
Köz | lane | HU
Rakpart | embankment | HU
Fasor | avenue | HU
Улица | street | RU BG RS BA ME MK BY UA
Ул. | street, abbreviated | RU BG RS BA ME MK
Проспект | avenue | RU UA BY
Переулок | side street | RU
Пер. | side street, abbreviated | RU
Площадь | square | RU
Площад | square | BG MK
Бульвар | boulevard | RU UA
Булевард | boulevard | BG
Булевар | boulevard | RS BA ME MK
Набережная | embankment | RU
Проезд | passage | RU
Тупик | dead end | RU
Шоссе | highway | RU UA BG
Вулиця | street | UA
Вул. | street, abbreviated | UA BY
Провулок | side street | UA
Площа | square | UA
Майдан | square | UA
Набережна | embankment | UA
Вуліца | street | BY
Праспект | avenue | BY
Завулак | side street | BY
Плошча | square | BY
Плоштад | square | MK
Трг | square | RS BA ME MK
Пут | road | RS BA ME
Οδός | street | GR CY
Odos | street (transliterated) | GR CY
Λεωφόρος | avenue | GR CY
Leoforos | avenue (transliterated) | GR CY
Πλατεία | square | GR CY
Plateia | square (transliterated) | GR CY
Παραλιακή | coastal road | GR
Sokak | street | TR CY
Sokağı | street | TR CY
Cadde | avenue | TR CY
Caddesi | avenue | TR CY
Bulvarı | boulevard | TR CY
Mahallesi | neighbourhood | TR
Meydanı | square | TR CY
Yolu | road | TR CY
Rruga | street | AL XK MK
Bulevardi | boulevard | AL XK
Sheshi | square | AL XK
Lagjja | neighbourhood | AL XK
Tänav | street | EE
Mnt. | road, abbreviated (maantee) | EE
Pst. | avenue, abbreviated (puiestee) | EE
Puiestee | avenue | EE
Plats | square | EE SE AX
Sild | bridge | EE
Väljak | square | EE
Iela | street | LV
Bulvāris | boulevard | LV
Laukums | square | LV
Prospekts | avenue | LV
Gatvė | street | LT
Prospektas | avenue | LT
Aikštė | square | LT
Alėja | avenue | LT
Kelias | road | LT
Tiltas | bridge | LT
+gatan | street | SE AX
+vägen | road | SE AX
+väg | road | SE AX
Torg | square | SE AX NO IS FO
Backe | hill | SE AX
Stig | path | SE AX
+gata | street | NO IS
gate | street | NO
+veien | road | NO SJ
+vei | road | NO SJ
+vegen | road (Nynorsk) | NO SJ
+veg | road (Nynorsk) | NO SJ
Plass | square | NO SJ
+gade | street | DK
+vej | road | DK
+plads | square | DK
Torv | square | DK
+stræde | lane | DK
+katu | street | FI
+tie | road | FI
+kuja | lane | FI
+polku | path | FI
Tori | square | FI
Aukio | square | FI
+vegur | road | IS FO
+braut | road, avenue | IS
+stræti | street | IS
+gøta | street | FO
Road | road | UK IE JE GI IM
Street | street | UK IE JE GI IM MT
Lane | lane | UK IE JE GI IM
Close | close | UK IE JE GI IM
Crescent | crescent | UK IE JE GI IM
Terrace | terrace | UK IE JE GI IM
Gardens | gardens | UK IE JE GI IM
Grove | grove | UK IE JE GI IM
Mews | mews | UK IE JE GI IM
Drive | drive | UK IE JE GI IM
Parade | parade | UK IE JE GI IM
Way | way | UK IE JE GI IM
Bóthar | road (Irish) | IE
Sráid | street (Irish) | IE
Plás | place (Irish) | IE
Cearnóg | square (Irish) | IE
Lána | lane (Irish) | IE
Droichead | bridge (Irish) | IE
Ffordd | road (Welsh) | UK
Heol | road (Welsh) | UK
Stryd | street (Welsh) | UK
Lôn | lane (Welsh) | UK
Rhodfa | avenue (Welsh) | UK
Sràid | street (Scottish Gaelic) | UK
Rathad | road (Scottish Gaelic) | UK
Straid | street (Manx) | IM
Raad | road (Manx) | IM
Triq | street (Maltese) | MT
Pjazza | square (Maltese) | MT
Vjal | avenue (Maltese) | MT
Sqaq | alley (Maltese) | MT
Misraħ | square (Maltese) | MT

## route
Autobahn | motorway | DE AT CH LI
Autoroute | motorway | FR BE LU CH MC
Autostrada | motorway | IT SM CH PL AL
Autosnelweg | motorway | NL BE
Snelweg | motorway | NL BE
Autopista | motorway | ES AD
Autovía | dual carriageway | ES
Autoestrada | motorway | PT
Autoput | motorway | RS BA ME
Autocesta | motorway | HR BA
Avtocesta | motorway | SI
Dálnice | motorway | CZ
Diaľnica | motorway | SK
Autópálya | motorway | HU
Autostradă | motorway | RO
Autostradë | motorway | AL XK
Магистрала | motorway | BG
Автомагистрала | motorway | BG
Аутопут | motorway | RS BA ME
Автопат | motorway | MK
Автомагистраль | motorway | RU BY
Автомагістраль | motorway | UA
Motorway | motorway | UK IE IM JE
Motorvej | motorway | DK
Motorväg | motorway | SE
Motorvei | motorway | NO
Moottoritie | motorway | FI
Kiirtee | motorway | EE
Automaģistrāle | motorway | LV
Automagistralė | motorway | LT
Αυτοκινητόδρομος | motorway | GR CY
Ethniki Odos | national road | GR
Εθνική Οδός | national road | GR
Otoyol | motorway | TR CY
Otoban | motorway | TR
Rijksweg | national road | NL
Staatsstraße | state road | DE AT
Landstraße | rural road | DE AT
Bundesstraße | federal road | DE AT
Départementale | county road | FR
Route nationale | national road | FR
Strada statale | state road | IT SM
Strada provinciale | provincial road | IT SM
Carretera nacional | national road | ES
Estrada nacional | national road | PT
Droga krajowa | national road | PL
Droga ekspresowa | expressway | PL
Hringvegur | Ring Road (Route 1) | IS
Riksvei | national road | NO
Riksväg | national road | SE
Valtatie | national road | FI
Kantatie | main road | FI
Maantee | main road | EE
Državna cesta | state road | HR
Hitra cesta | expressway | SI
Silnice | road | CZ
Drum național | national road | RO
Magistralni put | main road | RS BA ME

## sign
Bahnhof | railway station | DE AT CH LI
Ausfahrt | exit | DE AT CH LI
Umleitung | diversion | DE AT CH LI
Achtung | caution | DE AT CH LI
Parkplatz | car park | DE AT CH LI
Gare | railway station | FR BE LU CH MC
Sortie | exit | FR BE LU CH MC
Déviation | diversion | FR BE LU CH MC
Stazione | railway station | IT SM CH
Uscita | exit | IT SM CH
Estación | railway station | ES
Salida | exit | ES AD
Estação | railway station | PT
Saída | exit | PT
Station | railway station | NL BE UK IE SE IM JE GI MT
Exit | exit | UK IE IM JE GI MT
Diversion | diversion | UK IE IM JE GI MT
Jaam | railway station | EE
Väljapääs | exit | EE
Stacija | railway station | LV
Izeja | exit | LV
Stotis | railway station | LT
Išėjimas | exit | LT
Uitgang | exit | NL BE
Omleiding | diversion | NL BE
Centrum | centre | NL BE PL CZ SK SE
Centro | centre | ES IT PT SM
Dworzec | railway station | PL
Wyjazd | exit | PL
Objazd | diversion | PL
Nádraží | railway station | CZ
Výjezd | exit | CZ
Vasútállomás | railway station | HU
Kijárat | exit | HU
Kolodvor | railway station | HR SI BA RS ME
Izlaz | exit | HR BA RS ME
Gara | railway station | RO
Ieșire | exit | RO
Вокзал | railway station | RU UA BY BG
Выход | exit | RU BY
Вихід | exit | UA
Гара | railway station | BG MK
Σταθμός | station | GR CY
Έξοδος | exit | GR CY
İstasyon | station | TR CY
Çıkış | exit | TR CY
Stacioni | station | AL XK
Dalje | exit | SI
Ulaz | entrance | HR BA RS ME
Jernbanestasjon | railway station | NO SJ
Järnvägsstation | railway station | SE AX
Rautatieasema | railway station | FI
Banegård | railway station | DK
`,
cardwords: `
BE | Rue; Straat; Laan; Avenue; Boulevard; Plein; Chemin
CH | Strasse; Rue; Via; Gasse; Platz; Avenue; Piazza
LU | Rue; Strooss; Avenue; Plaz; Boulevard; Wee
ES | Calle; Avenida; Carrer; Plaza; Paseo; Kalea; Rúa
AD | Carrer; Avinguda; Plaça; Passeig; Carretera; Camí
UK | Road; Street; Lane; Close; Ffordd; Heol; Crescent
IE | Road; Street; Bóthar; Sráid; Lane; Close; Avenue
BA | Ulica; Улица; Trg; Булевар; Put; Obala
RS | Улица; Ulica; Трг; Булевар; Bulevar; Put
ME | Ulica; Улица; Trg; Bulevar; Put; Obala
MK | Улица; Булевар; Плоштад; Rruga; Трг
XK | Rruga; Ulica; Bulevardi; Sheshi; Lagjja
CY | Οδός; Odos; Λεωφόρος; Leoforos; Sokak; Cadde
FI | +katu; +tie; Tori; Aukio; +kuja; +polku; +gatan
CH | Strasse; Rue; Via; Gasse; Platz; Avenue; Piazza
MT | Triq; Pjazza; Vjal; Sqaq; Misraħ; Street
`,
prefixes: `
M | motorway or main road: UK, Ireland, Hungary; state roads in Serbia, Bosnia, Montenegro | UK IE HU RS BA ME
М | Cyrillic М: main highways (М-4, М-06) | RU UA BY
N | national road: Ireland, Belgium, Netherlands, France, Luxembourg, Portugal, Spain, Kosovo | IE BE NL FR LU PT ES XK
D | département road in France; motorway in Czechia and Slovakia; state road in Croatia and Türkiye | FR CZ SK HR TR
R | expressway in Czechia and Slovakia; Brussels ring; regional road in Ireland and Kosovo | CZ SK BE IE XK
Р | Cyrillic Р: regional roads (Р-23) | RU UA BY
Н | Cyrillic Н: national roads | UA
Т | Cyrillic Т: territorial roads | UA
DN | drum național (national road) | RO
DJ | drum județean (county road) | RO
DC | drum comunal (local road) | RO
DK | droga krajowa (national road) | PL
DW | droga wojewódzka (voivodeship road) | PL
S | expressway in Poland; Schnellstraße in Austria | PL AT
SS | strada statale (state road) | IT
SP | strada provinciale (provincial road) | IT SM
SR | strada regionale (regional road) | IT
RA | raccordo autostradale (motorway link) | IT
SH | shteti (national road) | AL
B | Bundesstraße (Germany, Austria); B-road (UK); main road (Cyprus) | DE AT UK CY
L | Landesstraße (state road) | DE AT
K | Kreisstraße (district road) | DE
CR | chemin repris (local road) | LU
RD | route départementale | FR MC
AP | autopista de peaje (toll motorway) | ES
CG | carretera general | AD
O | otoyol (motorway) | TR
Rv | riksvei (national road) | NO SJ
Fv | fylkesvei (county road) | NO SJ
EN | estrada nacional | PT
IC | itinerário complementar | PT
IP | itinerário principal | PT
`,
alphabets: `
AX | åäö
AL | ëç
AD | àèéíïòóúüç
AT | äöüß
BY | абвгдеёжзійклмнопрстуўфхцчшыьэюя
BE | éèêëïôöüäçàâîûùß
BA | čćšžđабвгдђежзијклљмнњопрстћуфхцчџш
BG | абвгдежзийклмнопрстуфхцчшщъьюя
HR | čćšžđ
CY | αβγδεζηθικλμνξοπρστυφχψωάέήίόύώϊϋΐΰçğışöü
CZ | áčďéěíňóřšťúůýž
DK | æøå
EE | õäöüšž
FO | áðíóúýæø
FI | äöåšž
FR | éèêëàâùûüîïôçœæÿ
DE | äöüß
GI |
GR | αβγδεζηθικλμνξοπρστυφχψωάέήίόύώϊϋΐΰ
HU | áéíóöőúüű
IS | áðéíóúýþæö
IE | áéíóú
IM | ç
IT | àèéìòù
JE | éèàâçôù
XK | ëçčćšžđабвгдђежзијклљмнњопрстћуфхцчџш
LV | āčēģīķļņšūž
LI | äöü
LT | ąčęėįšųūž
LU | ëéäöüàèêçâîôûù
MT | ċġħżàèìòù
MC | éèêëàâùûüîïôçœ
ME | čćšžđśźабвгдђежзијклљмнњопрстћуфхцчџш
NL | ëïéèóôöüäêĳ
MK | абвгдѓежзѕијклљмнњопрстќуфхцчџшëç
NO | æøå
PL | ąćęłńóśźż
PT | áàâãéêíóôõúç
RO | ăâîșțşţ
RU | абвгдеёжзийклмнопрстуфхцчшщъыьэюя
SM | àèéìòù
RS | čćšžđабвгдђежзијклљмнњопрстћуфхцчџш
SK | áäčďéíľĺňóôŕšťúýž
SI | čšž
ES | áéíóúüñàèòïç
SJ | æøå
SE | åäöé
CH | äöüéèàêçôìòù
TR | çğışöüâîû
UA | абвгґдеєжзиіїйклмнопрстуфхцчшщьюя
UK | âêîôûŵŷ
`,
scripts: `
Latin | the Latin alphabet | AX AL AD AT BE BA HR CZ DK EE FO FI FR DE GI HU IS IE IM IT JE XK LV LI LT LU MT MC ME NL NO PL PT RO SM RS SK SI ES SJ SE CH TR UK CY
Cyrillic | the Cyrillic alphabet | RU BY UA BG RS BA ME MK XK
Greek | the Greek alphabet | GR CY
`,
names: `
AX | Åland; Ahvenanmaa
AL | Albania; Shqipëria; Shqiperia
AD | Andorra
AT | Austria; Österreich
BY | Belarus; Беларусь; Biełaruś
BE | Belgium; België; Belgique; Belgien
BA | Bosnia and Herzegovina; Bosnia; Bosna i Hercegovina; Босна и Херцеговина
BG | Bulgaria; България; Balgariya
HR | Croatia; Hrvatska
CY | Cyprus; Κύπρος; Kıbrıs; Kibris
CZ | Czechia; Czech Republic; Česko; Cesko; Česká republika
DK | Denmark; Danmark
EE | Estonia; Eesti
FO | Faroe Islands; Faroes; Føroyar
FI | Finland; Suomi
FR | France
DE | Germany; Deutschland
GI | Gibraltar
GR | Greece; Ελλάδα; Ellada; Hellas
HU | Hungary; Magyarország; Magyarorszag
IS | Iceland; Ísland
IE | Ireland; Éire; Eire
IM | Isle of Man; Mannin
IT | Italy; Italia
JE | Jersey
XK | Kosovo; Kosova; Kosovë
LV | Latvia; Latvija
LI | Liechtenstein
LT | Lithuania; Lietuva
LU | Luxembourg; Lëtzebuerg; Luxemburg
MT | Malta
MC | Monaco
ME | Montenegro; Crna Gora; Црна Гора
NL | Netherlands; Holland; Nederland
MK | North Macedonia; Macedonia; Северна Македонија; Severna Makedonija
NO | Norway; Norge
PL | Poland; Polska
PT | Portugal
RO | Romania; România
RU | Russia; Россия; Rossiya
SM | San Marino
RS | Serbia; Srbija; Србија
SK | Slovakia; Slovensko
SI | Slovenia; Slovenija
ES | Spain; España; Espana
SJ | Svalbard; Spitsbergen
SE | Sweden; Sverige
CH | Switzerland; Schweiz; Suisse; Svizzera; Svizra
TR | Türkiye; Turkey; Turkiye
UA | Ukraine; Україна; Ukraina
UK | United Kingdom; Britain; Great Britain; UK
`,
regions: `
AX: Mariehamn/Maarianhamina; Jomala; Finström; Lemland; Eckerö; Saltvik; Sund; Hammarland; Geta; Kökar
AL: Berat; Dibër/Dibra; Durrës/Durres; Elbasan; Fier; Gjirokastër/Gjirokaster; Korçë/Korce; Kukës/Kukes; Lezhë/Lezhe; Shkodër/Shkoder; Tiranë/Tirana; Vlorë/Vlore; Sarandë/Saranda; Himarë; Krujë; Pogradec
AD: Andorra la Vella; Canillo; Encamp; Escaldes-Engordany; La Massana; Ordino; Sant Julià de Lòria
AT: Burgenland; Kärnten/Carinthia; Niederösterreich/Lower Austria; Oberösterreich/Upper Austria; Salzburg; Steiermark/Styria; Tirol/Tyrol; Vorarlberg; Wien/Vienna; Graz; Linz; Innsbruck; Salzkammergut
BY: Minsk/Мінск; Brest/Брэст; Grodno/Hrodna/Гродна; Gomel/Homiel/Гомель; Mogilev/Mahilyow/Магілёў; Vitebsk/Віцебск; Polesie/Палессе
BE: Vlaanderen/Flanders; Wallonie/Wallonia; Bruxelles/Brussels; Antwerpen/Antwerp; Limburg; Oost-Vlaanderen/East Flanders; West-Vlaanderen/West Flanders; Vlaams-Brabant; Brabant wallon; Hainaut; Liège/Luik; Luxembourg; Namur; Gent/Ghent; Brugge/Bruges; Ardennes
BA: Republika Srpska; Federacija/Federation; Brčko; Sarajevo; Mostar; Hercegovina/Herzegovina; Tuzla; Zenica; Banja Luka; Bihać; Una-Sana; Posavina; Travnik
BG: Sofia/София; Plovdiv; Varna; Burgas; Ruse; Stara Zagora; Pleven; Blagoevgad; Veliko Tarnovo; Vidin; Vratsa; Gabrovo; Dobrich; Kardzhali; Kyustendil; Lovech; Montana; Pazardzhik; Pernik; Razgrad; Shumen; Silistra; Sliven; Smolyan; Targovishte; Haskovo; Yambol; Thrace/Тракия; Rhodopes; Dobruja
HR: Dalmacija/Dalmatia; Istra/Istria; Slavonija/Slavonia; Kvarner; Lika; Zagorje; Zagreb; Split; Dubrovnik; Osijek; Međimurje; Varaždin; Zadar; Šibenik; Karlovac; Sisak; Rijeka; Pula
CY: Nicosia/Lefkosia/Λευκωσία; Limassol/Lemesos; Larnaca/Larnaka; Paphos/Pafos; Famagusta/Ammochostos; Kyrenia/Girne; Troodos
CZ: Praha/Prague; Středočeský/Central Bohemia; Jihočeský/South Bohemia; Plzeňský/Plzeň; Karlovarský/Karlovy Vary; Ústecký; Liberecký/Liberec; Královéhradecký; Pardubický; Vysočina; Jihomoravský/South Moravia; Olomoucký/Olomouc; Zlínský/Zlín; Moravskoslezský; Čechy/Bohemia; Morava/Moravia; Slezsko/Silesia; Brno; Ostrava
DK: Hovedstaden/Capital Region; Midtjylland/Central Jutland; Nordjylland/North Jutland; Sjælland/Zealand; Syddanmark/Southern Denmark; Jylland/Jutland; Fyn/Funen; Bornholm; København/Copenhagen; Aarhus; Odense; Aalborg; Skagen
EE: Harju; Hiiu/Hiiumaa; Ida-Viru; Jõgeva; Järva; Lääne; Lääne-Viru; Põlva; Pärnu; Rapla; Saare/Saaremaa; Tartu; Valga; Viljandi; Võru; Tallinn; Narva
FO: Streymoy; Eysturoy; Vágar; Sandoy; Suðuroy; Tórshavn; Klaksvík
FI: Uusimaa/Nyland; Varsinais-Suomi/Egentliga Finland; Satakunta; Kanta-Häme; Pirkanmaa; Päijät-Häme; Kymenlaakso; Etelä-Karjala; Etelä-Savo; Pohjois-Savo; Pohjois-Karjala; Keski-Suomi; Etelä-Pohjanmaa; Pohjanmaa/Österbotten; Keski-Pohjanmaa; Pohjois-Pohjanmaa; Kainuu; Lappi/Lapland; Helsinki/Helsingfors; Tampere; Turku/Åbo; Oulu; Rovaniemi
FR: Bretagne/Brittany; Normandie/Normandy; Alsace; Provence; Corse/Corsica; Île-de-France/Ile-de-France; Auvergne-Rhône-Alpes; Bourgogne-Franche-Comté/Burgundy; Centre-Val de Loire; Grand Est; Hauts-de-France; Nouvelle-Aquitaine; Occitanie; Pays de la Loire; Provence-Alpes-Côte d'Azur/PACA; Lorraine; Champagne; Languedoc; Gascogne/Gascony; Aquitaine; Savoie/Savoy; Bourgogne; Auvergne; Limousin; Picardie/Picardy; Paris; Lyon; Marseille; Bordeaux; Toulouse; Nice; Côte d'Azur/French Riviera; Dordogne; Alpes
DE: Baden-Württemberg; Bayern/Bavaria; Berlin; Brandenburg; Bremen; Hamburg; Hessen/Hesse; Mecklenburg-Vorpommern; Niedersachsen/Lower Saxony; Nordrhein-Westfalen/North Rhine-Westphalia; Rheinland-Pfalz/Rhineland-Palatinate; Saarland; Sachsen/Saxony; Sachsen-Anhalt/Saxony-Anhalt; Schleswig-Holstein; Thüringen/Thuringia; München/Munich; Köln/Cologne; Frankfurt; Schwarzwald/Black Forest; Ruhrgebiet
GI: Rock of Gibraltar; Main Street; Catalan Bay; Europa Point; Upper Rock
GR: Attiki/Attica/Αττική; Kentriki Makedonia/Central Macedonia; Dytiki Makedonia/Western Macedonia; Anatoliki Makedonia/Eastern Macedonia; Thraki/Thrace/Θράκη; Ipeiros/Epirus/Ήπειρος; Thessalia/Thessaly/Θεσσαλία; Sterea Ellada/Central Greece; Dytiki Ellada/Western Greece; Peloponnisos/Peloponnese/Πελοπόννησος; Ionia Nisia/Ionian Islands; Voreio Aigaio/North Aegean; Notio Aigaio/South Aegean; Kriti/Crete/Κρήτη; Athina/Athens/Αθήνα; Thessaloniki/Θεσσαλονίκη; Rodos/Rhodes; Kerkyra/Corfu; Santorini/Σαντορίνη; Mykonos; Μακεδονία
HU: Budapest; Pest; Bács-Kiskun; Baranya; Békés; Borsod-Abaúj-Zemplén; Csongrád-Csanád; Fejér; Győr-Moson-Sopron; Hajdú-Bihar; Heves; Jász-Nagykun-Szolnok; Komárom-Esztergom; Nógrád; Somogy; Szabolcs-Szatmár-Bereg; Tolna; Vas; Veszprém; Zala; Balaton; Alföld/Great Plain; Debrecen; Szeged
IS: Reykjavík/Reykjavik; Höfuðborgarsvæðið; Suðurnes; Vesturland/West Iceland; Vestfirðir/Westfjords; Norðurland vestra; Norðurland eystra; Austurland/East Iceland; Suðurland/South Iceland; Akureyri; Keflavík; Húsavík
IE: Leinster; Munster; Connacht/Connaught; Ulster; Dublin; Cork; Galway; Kerry; Clare; Donegal; Mayo; Wexford; Wicklow; Kildare; Meath; Limerick; Tipperary; Waterford; Sligo; Louth; Gaeltacht
IM: Douglas; Ramsey; Peel; Castletown; Laxey; Port Erin; Port St Mary
IT: Lombardia/Lombardy; Toscana/Tuscany; Sicilia/Sicily; Sardegna/Sardinia; Lazio; Veneto; Piemonte/Piedmont; Puglia/Apulia; Campania; Liguria; Emilia-Romagna; Friuli-Venezia Giulia; Abruzzo; Basilicata; Calabria; Marche; Molise; Trentino-Alto Adige/South Tyrol/Südtirol; Umbria; Valle d'Aosta/Aosta Valley; Roma/Rome; Milano/Milan; Napoli/Naples; Torino/Turin; Firenze/Florence; Venezia/Venice; Dolomiti/Dolomites
JE: St Helier; St Brelade; St Ouen; Gorey; Grouville; St Aubin; Trinity; St Lawrence
XK: Prishtinë/Pristina/Priština; Prizren; Pejë/Peć/Peja; Gjakovë/Đakovica; Ferizaj; Gjilan; Mitrovicë/Mitrovica
LV: Kurzeme; Vidzeme; Latgale; Zemgale; Sēlija; Rīga/Riga; Jūrmala; Liepāja; Daugavpils; Ventspils
LI: Vaduz; Schaan; Triesen; Balzers; Triesenberg; Eschen; Mauren; Gamprin; Ruggell; Schellenberg; Planken
LT: Aukštaitija; Žemaitija/Samogitia; Dzūkija; Suvalkija; Mažoji Lietuva; Vilnius; Kaunas; Klaipėda; Šiauliai; Panevėžys; Alytus; Marijampolė; Tauragė; Telšiai; Utena
LU: Capellen; Clervaux; Diekirch; Echternach; Esch-sur-Alzette; Grevenmacher; Luxembourg City; Mersch; Redange; Remich; Vianden; Wiltz; Mullerthal; Ardennes
MT: Valletta; Gozo/Għawdex; Comino/Kemmuna; Mdina; Sliema; St Julian's; Mosta; Birgu; Marsaxlokk
MC: Monte-Carlo; La Condamine; Fontvieille; Larvotto; Monaco-Ville
ME: Podgorica; Cetinje; Nikšić; Budva; Kotor; Bar; Herceg Novi; Ulcinj; Bijelo Polje; Pljevlja; Berane; Žabljak; Kolašin; Tivat; Rožaje
NL: Drenthe; Flevoland; Friesland/Fryslân; Gelderland; Groningen; Limburg; Noord-Brabant/North Brabant; Noord-Holland/North Holland; Overijssel; Utrecht; Zeeland; Zuid-Holland/South Holland; Amsterdam; Rotterdam; Den Haag/The Hague; Randstad
MK: Skopje/Скопје; Bitola; Ohrid; Tetovo; Kumanovo; Štip; Strumica; Prilep; Veles; Gostivar; Pelagonia; Polog; Vardar; Pelagonija
NO: Agder; Akershus; Buskerud; Finnmark; Innlandet; Møre og Romsdal; Nordland; Oslo; Østfold; Rogaland; Telemark; Troms; Trøndelag; Vestfold; Vestland; Lofoten; Hordaland; Bergen; Stavanger; Tromsø; Trondheim
PL: Dolnośląskie/Lower Silesia; Kujawsko-Pomorskie; Lubelskie; Lubuskie; Łódzkie; Małopolskie/Lesser Poland; Mazowieckie/Masovia; Opolskie; Podkarpackie; Podlaskie; Pomorskie/Pomerania; Śląskie/Silesia; Świętokrzyskie; Warmińsko-Mazurskie/Warmia-Masuria; Wielkopolskie/Greater Poland; Zachodniopomorskie/West Pomerania; Mazury/Masuria; Kaszuby/Kashubia; Podhale; Tatry/Tatras; Warszawa/Warsaw; Kraków/Krakow; Gdańsk; Wrocław; Poznań
PT: Norte; Centro; Lisboa/Lisbon; Alentejo; Algarve; Açores/Azores; Madeira; Porto/Oporto; Minho; Douro; Beira; Ribatejo; Coimbra; Braga; Faro
RO: Transilvania/Transylvania; Muntenia; Oltenia; Moldova; Dobrogea/Dobruja; Banat; Crișana/Crisana; Maramureș/Maramures; Bucovina/Bukovina; București/Bucharest; Alba; Arad; Argeș/Arges; Bacău; Bihor; Bistrița-Năsăud; Botoșani; Brașov/Brasov; Brăila; Buzău; Caraș-Severin; Călărași; Cluj; Constanța/Constanta; Covasna; Dâmbovița; Dolj; Galați; Giurgiu; Gorj; Harghita; Hunedoara; Ialomița; Iași/Iasi; Ilfov; Mehedinți; Mureș; Neamț; Olt; Prahova; Satu Mare; Sălaj; Sibiu; Suceava; Teleorman; Timiș/Timis; Tulcea; Vaslui; Vâlcea; Vrancea
RU: Moskva/Moscow/Москва; Sankt-Peterburg/Saint Petersburg/St Petersburg/Санкт-Петербург; Leningrad Oblast; Krasnodar; Rostov; Tatarstan; Bashkortostan; Sverdlovsk; Novosibirsk; Krasnoyarsk; Primorsky/Primorye; Khabarovsk; Sakha/Yakutia; Chechnya; Dagestan; Murmansk; Karelia; Komi; Arkhangelsk; Kaliningrad; Crimea/Крым; Siberia/Сибирь; Urals; Kamchatka; Chukotka; Irkutsk; Buryatia; Altai; Tuva; Magadan; Sakhalin; Volgograd; Samara; Nizhny Novgorod; Perm; Chelyabinsk; Omsk; Tomsk; Kemerovo; Tyumen; Vladivostok; Yamalo-Nenets; Khanty-Mansi
SM: Serravalle; Borgo Maggiore; Domagnano; Fiorentino; Acquaviva; Chiesanuova; Faetano; Montegiardino; Monte Titano
RS: Vojvodina/Војводина; Beograd/Belgrade/Београд; Šumadija; Srem; Banat; Bačka; Raška/Sandžak; Niš/Ниш; Novi Sad; Kragujevac; Subotica; Zlatibor; Kopaonik
SK: Bratislavský/Bratislava; Trnavský/Trnava; Trenčiansky/Trenčín; Nitriansky/Nitra; Žilinský/Žilina; Banskobystrický/Banská Bystrica; Prešovský/Prešov; Košický/Košice; Orava; Spiš; Liptov; Tatry/Tatras
SI: Gorenjska; Koroška; Primorska; Notranjska; Dolenjska; Štajerska/Styria; Prekmurje; Ljubljana; Maribor; Celje; Kranj; Koper; Bled; Osrednjeslovenska; Obalno-kraška; Goriška; Savinjska; Podravska; Pomurska; Posavska; Zasavska
ES: Andalucía/Andalusia; Aragón/Aragon; Asturias; Illes Balears/Balearic Islands/Baleares; Canarias/Canary Islands; Cantabria; Castilla-La Mancha; Castilla y León; Cataluña/Catalunya/Catalonia; Extremadura; Galicia; La Rioja; Madrid; Murcia; Navarra/Navarre; País Vasco/Euskadi/Basque Country; Comunitat Valenciana/Valencia; Ceuta; Melilla; Barcelona; Sevilla/Seville; Málaga; Granada; Mallorca/Majorca; Ibiza; Tenerife
SJ: Longyearbyen; Spitsbergen; Barentsburg; Ny-Ålesund; Bjørnøya/Bear Island; Nordaustlandet
SE: Skåne/Scania; Stockholm; Västra Götaland; Uppsala; Södermanland; Östergötland; Jönköping; Kronoberg; Kalmar; Gotland; Blekinge; Halland; Värmland; Örebro; Västmanland; Dalarna; Gävleborg; Västernorrland; Jämtland; Västerbotten; Norrbotten; Lappland/Lapland; Småland; Norrland; Götaland; Svealand; Göteborg/Gothenburg; Malmö; Öland
CH: Zürich/Zurich; Bern/Berne; Luzern/Lucerne; Uri; Schwyz; Obwalden; Nidwalden; Glarus; Zug; Fribourg/Freiburg; Solothurn; Basel-Stadt; Basel-Landschaft; Schaffhausen; Appenzell; St. Gallen/St Gallen; Graubünden/Grisons/Grigioni; Aargau; Thurgau; Ticino/Tessin; Vaud; Valais/Wallis; Neuchâtel; Genève/Geneva/Genf; Jura; Basel; Engadin
TR: İstanbul/Istanbul; Ankara; İzmir/Izmir; Bursa; Antalya; Adana; Konya; Gaziantep; Şanlıurfa/Sanliurfa; Kocaeli; Mersin; Hatay; Manisa; Kayseri; Samsun; Balıkesir; Kahramanmaraş; Van; Aydın; Denizli; Muğla; Trabzon; Erzurum; Eskişehir; Malatya; Mardin; Edirne; Çanakkale; Rize; Kars; Ağrı; Marmara; Ege/Aegean; Akdeniz/Mediterranean; İç Anadolu/Central Anatolia; Karadeniz/Black Sea; Doğu Anadolu/Eastern Anatolia; Güneydoğu Anadolu/Southeastern Anatolia; Kapadokya/Cappadocia; Trakya/Thrace
UA: Київ/Kyiv/Kiev; Lviv/Львів; Odesa/Odessa/Одеса; Kharkiv/Харків; Dnipro/Дніпро; Zaporizhzhia/Запоріжжя; Donetsk/Донецьк; Luhansk/Луганськ; Kherson/Херсон; Mykolaiv/Миколаїв; Poltava/Полтава; Chernihiv/Чернігів; Sumy/Суми; Cherkasy/Черкаси; Kirovohrad/Kropyvnytskyi; Vinnytsia/Вінниця; Zhytomyr/Житомир; Rivne/Рівне; Volyn/Волинь; Ternopil/Тернопіль; Khmelnytskyi/Хмельницький; Ivano-Frankivsk/Івано-Франківськ; Chernivtsi/Чернівці; Zakarpattia/Закарпаття; Crimea/Крим; Galicia/Halychyna; Bukovina; Donbas
UK: England; Scotland; Wales/Cymru; Northern Ireland; London; Yorkshire; Cornwall; Kent; Devon; Lancashire; Cumbria; Highlands; Hebrides; Orkney; Shetland; Midlands; East Anglia; Cotswolds; Home Counties; Isle of Wight; Edinburgh; Glasgow; Manchester; Birmingham; Liverpool; Cardiff; Belfast
`
};

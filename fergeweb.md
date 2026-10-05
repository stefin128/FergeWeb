# Fergeweb

## Målbilde
Vi skal lage webapp (for pc eller mobiltelefon, hvis mobiltelefon kompliserer første utgave er det noe som vi kan se bort i fra nå) som skal vise fergetider for en forbindelse, der begge sider vises med avganger på hver sin side av et bilde av området fergen traffikerer.

Man skal kunne se aktuelle avganger fra nåtidspunkt, og fremover,
Drar man i listen over avganger skal den vise videre fremover ved å dra oppover, drar man nedover skal den vise tidligere avganger.

## Funksjonalitet (versjon 1)

### Visning
- Avganger fra **Misten** vises i venstre kolonne, avganger fra **Festvåg** i høyre kolonne, med et bilde av fjorden og fergen øverst (se Oppsett). Bildet vises i sin helhet. Står det i en høyere kolonne, fylles området over og under med himmel- og sjøfarge.
- Begge kolonnene ligger i **én felles liste med én scrollbar**, slik at de alltid beveger seg sammen.
- Hver linje viser en avgang fra Misten og på samme linje **returavgangen** fra Festvåg. Returen er første avgang fra Festvåg etter avgangen fra Misten, og før neste avgang fra Misten. Entur oppgir ikke hvilken ferje som går hvilken tur, så sammenkoblingen er tidsbasert. En avgang uten partner får en egen linje med «–» på den andre siden.
- Kolonneoverskriftene («Fra Misten / til Festvåg», «Fra Festvåg / til Misten») blir liggende øverst når man scroller.
- Klokke og tidspunkt for siste oppdatering vises i toppen.

### Valg av bilde
- I toppen kan man velge mellom to bilder: **Enkel** og **Foto**. Valget huskes i nettleseren, og standard er Foto.
- **Enkel** er en tegnet fjord med et skilt med stedsnavnet ved hvert fergeleie (se Store skilt). Den følger lys og mørk modus.
- **Foto** er bildet `bare_fjorden_navn` med stedsnavnene i bildet. Bildet er dempet med et lett dis: fargene beholdes, men med lavere kontrast og litt lysere (ikke gråtoner). Kaiene med skilt og et område rundt fergen vises i full farge, slik at båten og kaiene fremheves. Fremhevingen av fergen følger den over fjorden.

### Store skilt
- Skiltene ved fergeleiene vises alltid med stor skrift, slik at også eldre brukere lett ser hvilket fergeleie som er på hver side av bildet. Dette er ikke valgbart.
- Skriftstørrelsen tilpasses hvor stort bildet faktisk vises, med mål om ca. 18 px tekst på skjermen. Skiltene blir derfor lesbare også på mobil.
- **Enkelt bilde:** Skiltene står på stolper ved fergeleiene. Tavlene flyttes litt inn mot midten ved behov, så de ikke går utenfor bildet.
- **Foto:** Skiltene er en del av bildet. Egne, større skilt tegnes oppå skiltene i fotoet, på samme sted.
- Webkamera-lenkene følger skiltene.

### Webkamera
- Skiltene ved fergeleiene, i både enkelt bilde og foto, er lenker til Statens vegvesens webkamera ved fergeleiet. Lenken åpnes i en ny fane, og skiltet er merket med et lite kameramerke.
- Webkamera-adressen ligger i `WEBCAMS` for hvert fergeleie. Uten adresse blir skiltet ikke en lenke.
- Webkameraene kan ikke finnes automatisk. Vegvesenets åpne API for webkamera (DATEX II) krever brukernavn og passord, og det kan ikke ligge i en offentlig fil. API-et som vegvesen.no selv bruker, er internt og ikke ment for andre. Adressene legges derfor inn manuelt, og ved konfigurasjon senere må de inngå i oppsettet for hvert fergeleie.

### Fergens posisjon
- Fergen tegnes i bildet der den antas å være akkurat nå, og flyttes hvert sekund. Når den ligger ved kai, ligger den inntil fergeleiet. Under overfart går den i en bue litt nærmere betrakteren, tegnes litt større midt i fjorden, vugger svakt og har kjølvann bak seg.
- Under en overfart flyttes den jevnt langs ruten mellom fergeleiene, fra forventet avgang til forventet ankomst. Entur gir ingen posisjonsdata, så dette er et anslag. Mangler forventet ankomst, brukes rutetid for ankomst forskjøvet med samme forsinkelse som ved avgang.
- Når ingen overfart pågår, ligger fergen ved kaien den sist ankom.
- Nederst i bildet står en statuslinje, for eksempel «Underveis til Festvåg · ankomst ca. 19:10» eller «Ved Misten · neste avgang 19:15».
- Innstilte avganger regnes ikke med. Går flere overfarter samtidig (flere ferjer), tegnes én ferge per overfart.

### Tid og dager
- Ved oppstart scrolles listen til neste avgang, med én passert avgang synlig over.
- En **«nå»-strek** med klokkeslett skiller passerte og kommende avganger.
- Neste avgang fra hver side er uthevet.
- **Dagoverskrift** («I dag – søndag 4. oktober», «I morgen – …», «I går – …») vises ved hver ny dag og blir liggende øverst mens man blar i den dagen.
- Kommende avganger i dag viser «om X min» eller «om X t Y min». Avganger på en annen dag viser «i morgen» eller ukedag.
- Er det ikke flere avganger i dag, scrolles listen slik at dagoverskriften for neste dag står øverst.
- Knappen **«↺ Til neste avgang»** dukker opp når man har scrollet bort fra nå-tidspunktet.

### Scrolling
- Drar man **oppover**, hentes flere avganger fremover (24 timer om gangen, inntil 60 dager frem). Nederst står «Ingen flere avganger» når grensen er nådd.
- Drar man **nedover**, hentes tidligere avganger (12 timer om gangen, inntil 7 dager tilbake).
- Listen fylles automatisk til den kan scrolles begge veier. Ruter med få avganger, for eksempel Ørnes–Bolga (bare noen dager i uka), ville ellers vist så få rader at listen ikke kunne scrolles, og da ble det aldri hentet mer. Perioder uten avganger gir dobbelt så lange hentinger neste gang, opp til en uke om gangen.
- Bare båtavganger hentes fra Entur (`whiteListedModes: [water]`), så busser fra samme kai (f.eks. Ørnes) ikke tar plassen i svaret.
- På PC kan man dra i listen med musen, i tillegg til vanlig scrolling. På mobil fungerer touch.

### Rutetider og sanntid
- Passerte avganger vises alltid med **rutetid**.
- Kommende avganger vises med rutetid, med mindre sanntid avviker med **minst 5 minutter**. Da vises rutetiden gjennomstreket, ny forventet tid og merket «Ny tid».
- Innstilte avganger vises gjennomstreket med merket «Innstilt».
- Ankomsttid vises ikke.
- Sanntid oppdateres hvert minutt, og når siden blir synlig igjen etter å ha vært i bakgrunnen.

### Oppsett
- Bildet ligger øverst, og de to kolonnene står side om side i én felles liste under. Dette er det eneste oppsettet og er ikke valgbart.
- På brede skjermer begrenses bredden (maks ca. 980 px), og innholdet sentreres.
- Dagoverskriften spenner over begge kolonnene, siden den gjelder begge sider.
- På smal skjerm (under 760 px) er det mindre luft og tekst.
- Mørk modus følger systemets innstilling.

## Konfigurasjon
Opprinnelig var tanken å velge et avgangssted og deretter et anløpssted. Det er erstattet av en liste med ferdige par av fergeleier, hentet fra Entur.

### Valg av samband
- Knappen ⚙ ved tittelen åpner **Velg samband**: en liste med søkefelt over alle par av fergeleier som en bilferge går mellom, også der fergen går innom andre kaier underveis (591 par per oktober 2026). For eksempel gir linje 18-435 parene Ørnes–Vassdalsvik, Ørnes–Meløysund, Ørnes–Bolga og Meløysund–Vassdalsvik. Hurtigruten og Havila er ikke med, fordi det er kystruter og ikke fergesamband.
- Hvert par vises som i appen: stedsnavn uten «ferjekai», «kai» osv., og linjekoden (for eksempel «Misten – Festvåg · 18-538»). Går flere linjer mellom de samme kaiene, vises alle kodene.
- Stedet som kommer **senest i alfabetet** (norsk sortering, æ ø å til slutt) står til **venstre**, både i listen og i appen. Listen sorteres A–Å etter dette navnet. Misten–Festvåg står derfor som før.
- Valgt samband er uthevet i listen. Velger man et annet, lastes siden på nytt med det nye sambandet.
- Valget **huskes i nettleseren**, og adressen får `?samband=<venstre>-<høyre>` (nummeret i NSR:StopPlace-id-en, f.eks. `?samband=58672-62316`), så et samband kan deles eller bokmerkes. En lenke går foran det som er husket.
- Ukjente fergeleier i lenken gir standard-sambandet (Misten–Festvåg) med en melding i statusfeltet.
- Tittelen viser linjekodene fra avgangene som er hentet.

### Per samband
- **Foto** finnes bare for Misten–Festvåg. Andre samband bruker alltid det enkle bildet, og valget Enkel/Foto skjules.
- **Webkamera** finnes bare for fergeleier med kjent adresse (`WEBCAMS` i scriptet, i dag Misten og Festvåg). Andre skilt er ikke lenker.
- Avganger tas med når turen går med **bilferge** og videre til kaien på motsatt side. Hurtigbåter og passasjerbåter som går mellom de samme kaiene, tas ikke med. Det filtreres ikke på en bestemt linjekode.

### Avganger med flere stopp
- Går fergen innom flere kaier på turen, vises **første stopp** etter avgangstiden, for eksempel «15:45 → Vassdalsvik», og et lite ruteikon.
- Holder man musen over ikonet, vises alle stopp med rutetid. Trykker man på ikonet (også på mobil), vises de i en liten boks, for eksempel «Fra Meløysund 15:45: 16:00 Vassdalsvik, 16:15 Meløysund, **16:50 Ørnes**». Kaien på motsatt side er uthevet. Boksen lukkes ved klikk utenfor, Esc eller scrolling.
- Går fergen direkte, vises verken første stopp eller ikon, slik som på Misten–Festvåg.
- På rundturer kan samme tur gå fra samme kai to ganger (f.eks. Meløysund 15:45 og 16:15). Begge vises som egne avganger.
- **I bildet:** Når fergen er på en tur med flere stopp, står samme ruteikon over fergen og følger den over fjorden. Ikonet har samme hint ved musepeker og samme boks med alle stopp ved klikk/trykk som i listen. Ikonet har samme størrelse på skjermen i begge bilder (ca. 34 × 22 px).
- Statuslinjen i bildet nevner kaier fergen går innom før motsatt side, for eksempel «Underveis til Meløysund via Vassdalsvik · ankomst ca. 08:25».

### I koden
- `DEFAULT_PAIR`: standard-sambandet, som også er det fotoet viser.
- `WEBCAMS`: webkamera-adresse per fergeleie (NSR-id).
- `CAR_FERRY`: hvilke typer båt (Entur `transportSubmode`) som regnes som bilferge, både i listen over samband og for avgangene.
- Andre justerbare konstanter: `DELAY_THRESHOLD` (5 min), `REFRESH_MS` (60 s), `INITIAL_BACK` (12 t), `PAGE_FORWARD`, `PAGE_BACK`, `MAX_BACK` (7 døgn), `MAX_FORWARD` (60 døgn) og `MAX_PAGE` (7 døgn).

## Teknologi
Det er ønskelig at det i første omgang ikke trengs noen servertjeneste utover api for fergeruter, med andre ord webappen skal være "selfcontained".

- Hele appen er én fil, `index.html` (ren HTML, CSS og JavaScript), uten byggesteg og avhengigheter. Den kan kopieres alene til for eksempel en mobiltelefon.
- Bakgrunnsbildet er innebygd som base64 i et lite script helt nederst i `index.html`. Det er en komprimert utgave (WebP, kvalitet 85, ca. 300 kB) av originalen `bare_fjorden_navn.png` (2,4 MB). Originalen og `bare_fjorden_navn.webp` beholdes som kilder, men trengs ikke for å kjøre appen.
- Byttes bildet, lages ny WebP og base64-strengen på siste script-linje erstattes.
- Fergeleienes plassering i bildet er angitt i `DOCK` i scriptet (bildekoordinater, 1774 × 887). Byttes bildet, må disse justeres.
- Den kan åpnes direkte i nettleseren eller serveres statisk (for eksempel `python3 -m http.server`).
- Publisering avventes foreløpig.

## Kilder for fergeruter
Det ligger en løsning i katalogen /home/stefi/src/FergeUtils der det allerede er brukt api for å hente dette.

Appen bruker Entur Journey Planner v3 (GraphQL), `https://api.entur.io/journey-planner/v3/graphql`:
- Entur tillater kall direkte fra nettleseren (CORS), så det trengs ingen mellomtjener.
- Header `ET-Client-Name: softstone42-fergeweb` sendes med alle kall.
- Avganger hentes med `stopPlace.estimatedCalls(startTime, timeRange)`. Det fungerer også for tidspunkter bakover i tid.
- Avgangene filtreres på transportmåte `water` og at turen går videre til kaien på motsatt side. Dette sjekkes med `serviceJourneyEstimatedCalls.next`, som også gir forventet ankomsttid. Turens kaier har egne stoppested-ID-er (for eksempel `NSR:StopPlace:47408`), så sammenligningen gjøres mot kaiens `parent`.
- Listen over samband hentes med `lines(transportModes: [water])` og linjenes `journeyPatterns`. Bilferger der alle mønstrene til sammen bare har to fergeleier (`parent`), blir et par.
- Merk: AGENTS.md i FergeUtils sier at `NSR:StopPlace:58672` er Moss fergekai. Det stemmer ikke, det er Misten ferjekai.

## Senere
I prioritert rekkefølge:
- [x] Visning av fergen i antatt sanntid basert på faktisk avgang, og estimert overfartstid, altså "fergen" skal vises på et sted mellom høyre og venstre side (fergeleier) avhengig av hvor den er beregnet. 
- [x] Konfigurasjon: valg av samband fra en liste med par av fergeleier fra Entur (se Konfigurasjon).
- [x] Fergeleier med flere ruter: par fra bilferger med flere kaier er med i listen, og avganger med flere stopp viser første stopp og alle stopp ved trykk på ikonet (se Konfigurasjon).
- [] Fergens posisjon på turer med stopp underveis: i dag tegnes fergen rett over fra kai til kai, også når den går innom en annen kai først. På Ørnes–Meløysund går 13:35 direkte (35 min), mens 07:35 går via Vassdalsvik (50 min), men begge tegnes som én rett overfart.
- [] Mellomlagring (cache) av avganger, så appen fortsatt viser rutetider ved nettbrudd eller når dekningen faller ut på mobil. Kan også redusere antall kall mot Entur på ruter med få avganger (f.eks. Ørnes–Bolga, ca. 30 kall ved første lasting).
- [x] Publisering: https://stefin128.github.io/FergeWeb/ (GitHub Pages fra `main`).
- [x] Fra alfa-tester: valg mellom enkelt bilde og foto, og i fotoet fremheves fergen og kaiene/skiltene mens resten dempes.
- [x] Fra alfa-tester: skilt ved hvert fergeleie i enkelt bilde i stedet for tekst nederst.

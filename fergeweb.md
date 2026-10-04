# Fergeweb

## Målbilde
Vi skal lage webapp (for pc eller mobiltelefon, hvis mobiltelefon kompliserer første utgave er det noe som vi kan se bort i fra nå) som skal vise fergetider for en forbindelse, der begge sider vises med avganger på hver sin side av et bilde av området fergen traffikerer.

Man skal kunne se aktuelle avganger fra nåtidspunkt, og fremover,
Drar man i listen over avganger skal den vise videre fremover ved å dra oppover, drar man nedover skal den vise tidligere avganger.

## Funksjonalitet (versjon 1)

### Visning
- Avganger fra **Misten** vises i venstre kolonne, avganger fra **Festvåg** i høyre kolonne, med et bilde av fjorden og en ferge i midten. Bildet vises i sin helhet. Står det i en høyere kolonne, fylles området over og under med himmel- og sjøfarge.
- Begge kolonnene ligger i **én felles liste med én scrollbar**, slik at de alltid beveger seg sammen.
- Hver linje viser en avgang fra Misten og på samme linje **returavgangen** fra Festvåg. Returen er første avgang fra Festvåg etter avgangen fra Misten, og før neste avgang fra Misten. Entur oppgir ikke hvilken ferje som går hvilken tur, så sammenkoblingen er tidsbasert. En avgang uten partner får en egen linje med «–» på den andre siden.
- Kolonneoverskriftene («Fra Misten / til Festvåg», «Fra Festvåg / til Misten») blir liggende øverst når man scroller.
- Klokke og tidspunkt for siste oppdatering vises i toppen.

### Valg av bilde
- I toppen kan man velge mellom to bilder: **Enkel** og **Foto**. Valget huskes i nettleseren, og standard er Foto.
- **Enkel** er en tegnet fjord med stedsnavnene under fergeleiene. Den følger lys og mørk modus.
- **Foto** er bildet `bare_fjorden_navn` med stedsnavnene i bildet. Bildet er dempet (lavere fargemetning og lysstyrke). Kaiene med skilt og et område rundt fergen vises i full farge, slik at båten og kaiene fremheves. Fremhevingen av fergen følger den over fjorden.
- Valgknappen ligger i toppen og ikke i bildet, fordi listen ligger over bildet på PC.

### Fergens posisjon
- Fergen tegnes i bildet der den antas å være akkurat nå, og flyttes hvert sekund. Når den ligger ved kai, ligger den inntil fergeleiet. Under overfart går den i en bue litt nærmere betrakteren, tegnes litt større midt i fjorden, vugger svakt og har kjølvann bak seg.
- Under en overfart flyttes den jevnt langs ruten mellom fergeleiene, fra forventet avgang til forventet ankomst. Entur gir ingen posisjonsdata, så dette er et anslag. Mangler forventet ankomst, brukes rutetid for ankomst forskjøvet med samme forsinkelse som ved avgang.
- Når ingen overfart pågår, ligger fergen ved kaien den sist ankom.
- Øverst i bildet står en statuslinje, for eksempel «Underveis til Festvåg · ankomst ca. 19:10» eller «Ved Misten · neste avgang 19:15».
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
- Drar man **oppover**, hentes flere avganger fremover (24 timer om gangen).
- Drar man **nedover**, hentes tidligere avganger (12 timer om gangen, inntil 7 dager tilbake).
- På PC kan man dra i listen med musen, i tillegg til vanlig scrolling. På mobil fungerer touch.

### Rutetider og sanntid
- Passerte avganger vises alltid med **rutetid**.
- Kommende avganger vises med rutetid, med mindre sanntid avviker med **minst 5 minutter**. Da vises rutetiden gjennomstreket, ny forventet tid og merket «Ny tid».
- Innstilte avganger vises gjennomstreket med merket «Innstilt».
- Ankomsttid vises ikke.
- Sanntid oppdateres hvert minutt, og når siden blir synlig igjen etter å ha vært i bakgrunnen.

### Mobil
- På smal skjerm (under 760 px) ligger bildet øverst, og de to kolonnene står side om side i én felles liste under.
- Mørk modus følger systemets innstilling.

## Konfigurasjon
Vi lar konfigurasjon komme på et senere tidspunkt, for nå skal vi gjøre det sånn at avgangstider for MISTEN er på venstre side, og FESTVÅG er på høyre side (rute 18-538) av et generisk bilde. Når vi kommer til konfigurasjon skal det være mulig å velge et avgangssted, og automatisk skal det komme opp enten valg av anløpssted hvis det finnes flere, eller når det bare er et (som i tilfellet vi bruker som eksempel) blir det automatisk satt anløpssted.

Foreløpig ligger konfigurasjonen hardkodet i `CONFIG` øverst i scriptet i `index.html`:

| Felt | Verdi |
|---|---|
| `route` | `18-538` |
| `left` | Misten ferjekai, `NSR:StopPlace:58672` |
| `right` | Festvåg ferjekai, `NSR:StopPlace:62316` |

Andre justerbare konstanter i samme fil: `DELAY_THRESHOLD` (5 min), `REFRESH_MS` (60 s), `PAGE_FORWARD`, `PAGE_BACK` og `MAX_BACK`.

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
- Avgangene filtreres på transportmåte `water`, linje `18-538` og at turen går videre til kaien på motsatt side. Dette sjekkes med `serviceJourneyEstimatedCalls.next`, som også gir forventet ankomsttid. Turens kaier har egne stoppested-ID-er (for eksempel `NSR:StopPlace:47408`), så sammenligningen gjøres mot kaiens `parent`.
- Merk: AGENTS.md i FergeUtils sier at `NSR:StopPlace:58672` er Moss fergekai. Det stemmer ikke, det er Misten ferjekai.

## Senere
I prioritert rekkefølge:
- [x] Visning av fergen i antatt sanntid basert på faktisk avgang, og estimert overfartstid, altså "fergen" skal vises på et sted mellom høyre og venstre side (fergeleier) avhengig av hvor den er beregnet. 
- [] Konfigurasjon: valg av avgangssted, og deretter automatisk valg av anløpssted (se over).
- [x] Publisering: https://stefin128.github.io/FergeWeb/ (GitHub Pages fra `main`).
- [x] Fra alfa-tester: valg mellom enkelt bilde og foto, og i fotoet fremheves fergen og kaiene/skiltene mens resten dempes.

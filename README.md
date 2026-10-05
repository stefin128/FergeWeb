# FergeWeb

Fergetider for norske bilferjesamband i en enkel webapp. Standard er Misten – Festvåg (rute 18-538), og andre samband velges med ⚙.

- Avganger fra begge sider vises side om side. Hver avgang står på samme linje som returen.
- Listen starter ved neste avgang. Dra opp for senere avganger, dra ned for tidligere.
- Sanntid fra Entur oppdateres hvert minutt. Forsinkelser på minst 5 minutter og innstilte avganger vises.
- Fergen vises i bildet der den antas å være akkurat nå.

## Bruk

Hele appen er én fil, [`index.html`](index.html), uten byggesteg eller avhengigheter. Bakgrunnsbildet er innebygd i filen.

- Åpne `index.html` i en nettleser, eller
- server katalogen statisk, for eksempel med `python3 -m http.server`, og gå til <http://localhost:8000>.

Rutedata hentes direkte fra [Entur](https://developer.entur.org/) sitt åpne API, så nettleseren må ha nettilgang.

## Filer

| Fil | Innhold |
|---|---|
| `index.html` | Hele appen |
| `fergeweb.md` | Spesifikasjon og beskrivelse av funksjonaliteten |
| `bare_fjorden_navn.png` | Originalt bakgrunnsbilde (kilde) |
| `bare_fjorden_navn.webp` | Komprimert bakgrunnsbilde, som er innebygd i `index.html` |

## Data

Rutedata: [Entur](https://entur.no), lisensiert under [NLOD](https://data.norge.no/nlod/no/2.0).

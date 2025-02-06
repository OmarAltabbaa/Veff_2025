# Vefforritun 2 2025, verkefni 1

## Markmið

- Upprifjun og notkun á verkfærum og tólum úr vefforritun 1.
- Ósamstillt forritun með Node.js og notkun á módúlum.
- Útbúa test og setja upp keyrslu á testum með GitHub Actions.
- Vinnsla með gagnastrúktúra og staðfestingu á gögnum.

## Verkefnið

Gefin eru gögn fyrir krossaspurningar um HTML, CSS og JavaScript ásamt skrá sem vísar í þær. Skrifa skal forrit sem les þessar skrár, útbýr HTML í build skrefi fyrir spurningarnar og tengir við framenda útfærslu.

Skrifa skal allan kóða, ekki skal nota forritasöfn frá t.d. NPM.

### Lestur gagna

Undir möppunni `data/` eru JSON skrárnar `index.json`, `html.json`, `css.json` og `js.json`.

`index.json` inniheldur eitt fylki með hlutum sem hafa formið:

- `title`, strengur, heiti spurningaflokks
- `file`, strengur, vísun í skrá

Hinar skrárnar innihalda hluti sem innihalda:

- `title`, strengur, heiti spurningaflokks
- `questions`, fylki af spurningum, þar sem hver spurning hefur:
  - `question`, strengur, texti spurningar
  - `answers`, fylki af svörum þar sem hvert svar:
    - `answer`, strengur, texti svars
    - `correct`, boolean gildi, `true` ef svar er rétt, ætti eingöngu að vera eitt rétt svar

Skrifa skal forrit sem les inn þessi gögn og varpar yfir í HTML skrár sem birta gögnin.

Ekki á að breyta skrám heldur nota þær nákvæmlega eins og þær eru.

Athugið að gögnin eru ekki fullkomin, þau geta innihaldið villur, auka gögn eða gögn sem ekki passa við gefnar gagnatýpur. Ef villa er til staðar í gögnum (þ.e.a.s. gögn uppfylla ekki það sem skilgreint er að ofan) skal hunsa það og birta upplýsingar um það í `console`.

### Birting gagna

Eftir lestur skal útbúa HTML skrár sem birta gögnin. Þær skulu vera í möppunni `dist/` og vera:

- `index.html`, forsíða sem hefur einhvern lýsingartexta (í versta falli `lorem ipsum` texta) ásamt tenglum á alla gefna flokka.
- `<flokkur>.html`, síður sem passa við flokka sem gefnir eru `index.json`.

Þar sem gögn innan `dist/` möppu eru _afleidd_ frá því sem er í `data/` möppu skal **ekki** setja þær inn í Git og hunsa þær með `.gitignore`.

Nota skal [Vite](https://vite.dev/) fyrir framenda.

Þegar unnið er með HTML í gegnum _template strings_ getur verið gott að nota extension sem virkjar syntax hightlight, t.d. [`Comment tagged template`](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates). Þá þarf að merkja með athugasemd fyrir framan strenginn:

```javascript
const html = /* html */ `
  <div>
    <h1>Titill</h1>
  </div>
`;
```

### Prófanir

Í verkefni skal skrifa próf með [Node.js test runner](https://nodejs.org/docs/latest-v22.x/api/test.html), [Jest](https://jestjs.io/) eða [Vitest](https://vitest.dev/) sem athugar hvort forritið virki eins og það á að gera.

Allar skrár með kóða í `./src/lib` möppu skulu hafa test og line coverage skal vera a.m.k. 50% í heildina. Þetta á við node.js kóða, ekki þarf að telja með þann kóða sem keyrður er úr CLI/gegnum `build` scriptu.

Ekki er krafa um að skrifa test fyrir kóða á framenda.

Þar sem coverage gögn eru skrifuð í `coverage/` möppu skal hunsa þær með `.gitignore` skrá.

Setja skal upp keyrslu á testum með [GitHub Actions](https://docs.github.com/en/actions) þannig að þau keyra sjálfkrafa þegar commitað er á GitHub á `main` branch, eða í pull requestum.

### Útlit og virkni á vef

Setja skal upp _einfalt_ útlit á vefnum með flexbox eða grid. Takmarka heildarstærð og vera _responsive_.

Forsíða skal hafa lista af spurningaflokkum með hlekk á síðu fyrir spurningaflokk.

Á spurningaflokkssíðu skal vera hægt að svara hverri spurningu og ýta á takka til að fá að vita hvort svarið sé rétt eða ekki. Það skal gera greinilegt hvort svarið sé rétt ekki, t.d. með texta, lit, breytingu á viðmóti eða álíka. Þetta þarf að útfæra með JavaScript _á framenda_.

Forritið skal útbúa merkingarfræðilegt og aðgengilegt HTML.

### Tæki og tól

Nota skal Node.js 22 og NPM.

Aðeins skal nota ECMAScript modules (ESM, `import` og `export`) og ekki CommonJS (`require`).

Setja skal upp `eslint`, engar villur eða viðvaranir skulu vera til staðar.

### GitHub & Netlify

Setja skal upp vefinn með niðurstöðum á Netlify tengt við GitHub. Við hvert commit ætti GitHub action að keyra lint og test, Netlify ætti að keyra `build` scriptu og birta vefinn.

## Mat

- 25% – Lestur gagna, skrár lesnar, ógild gögn hunsuð.
- 25% – Birting gagna, HTML búið til.
- 20% – Vite notað fyrir framenda, grunn CSS fyrir viðmót, JavaScript virkni í framenda.
- 10% – Prófanir og coverage.
- 10% – Tæki og tól skv. forskrift, `eslint` uppsett.
- 10% – GitHub & Netlify, GitHub actions uppsett.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðvikudaginn 15. janúar 2025.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 6. febrúar 2025.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Netlify.
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `osk`
  - `ofurtumi`
  - `tomasblaer`

## Einkunn

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ef stórt mállíkan (LLM, „gervigreind“, t.d. ChatGTP) er notað til að skrifa part af lausn skal taka það fram. [Sjá nánar á upplýsingasíða um gervigreind hjá HÍ](https://gervigreind.hi.is/).

Sett verða fyrir ([sjá nánar í kynningu á áfanga](https://github.com/vefforritun/vef2-2025/blob/main/namsefni/01.kynning/1.kynning.md)):

- fimm minni sem gilda 10% hvert, samtals 50% af lokaeinkunn.
- tvö hópverkefni þar sem hvort um sig gildir 20%, samtals 40% af lokaeinkunn.
- einstaklingsverkefni sem gildir 15–25% af lokaeinkunn.

---

> Útgáfa 0.4

| Útgáfa | Breyting                                                                               |
| ------ | -------------------------------------------------------------------------------------- |
| 0.1    | Fyrsta útgáfa                                                                          |
| 0.2    | Bæta við 10% sem vantaði í mat; fjarlægja kröfu um `stylelint`; nánar um framendakröfu |
| 0.3    | Bæta við að nota megi Vitest fyrir próf                                                |
| 0.4    | Bæta við dæmi um template strings og syntax highlighting                               |

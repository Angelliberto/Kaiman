import type { LocalizedDestinationPatch } from './types';

export const it: Record<string, LocalizedDestinationPatch> = {
  roraima: {
    name: 'Roraima',
    region: 'Gran Sabana, Bolívar',
    tagline: 'Il tepui del mondo perduto',
    description:
      'Una delle formazioni geologiche più antiche e mistiche della Terra: il tepui più alto e famoso del Parco Nazionale di Canaima. In lingua Pemón, Roroimö significa “la grande montagna verde-blu”.',
    longDescription:
      'Partiamo ogni settimana dell’anno da San Francisco de Yuruaní e Puerto Ordaz. Non c’è bisogno di formare il proprio gruppo: puoi unirti a qualsiasi partenza. Piani di rateizzazione flessibili fino alla data della spedizione, oltre a offerte per coppie o gruppi. Scegli tra tre itinerari: 6D / 5N, 7D / 6N o 8D / 7N.',
    highlights: [
      'Partenze settimanali tutto l’anno · unisciti senza il tuo gruppo',
      'Tre itinerari: 6, 7 o 8 giorni nella Gran Sabana',
      'Vetta a 2.800 m: Valle dei Cristalli, Jacuzzi, Maverick Rock',
      'Finanziamento a rate e offerte per coppie o gruppi',
    ],
    bestSeason: 'Tutto l’anno; da dicembre a marzo solitamente piove meno',
    typicalDuration: 'Da 6 a 8 giorni (da 5 a 7 notti)',
    howToGetThere:
      'Punto di partenza: San Francisco de Yuruaní o Puerto Ordaz. Trekking da Paraitepuy con check-in INPARQUES.',
    offers: [
      {
        title: 'Spedizioni Roraima Tepui',
        subtitle: 'Partenze settimanali · blocca il prezzo di oggi e paga a rate',
        highlight: '3 itinerari',
        packages: [
          {
            name: '6 giorni / 5 notti',
            price: 'Da USD 480',
            childRate:
              'Partenza da San Francisco de Yuruaní: USD 480 · Partenza da Puerto Ordaz: USD 680 · Partenza da Caracas via terra (alloggio a Ciudad Bolívar): USD 920',
            unit: 'itinerario classico',
            badge: '6D / 5N',
            includes: [
              'Salita in vetta via La Rampa e una notte in “hotel” (grotta di roccia)',
              'Trekking in vetta: Valle dei Cristalli, Jacuzzi, Finestra di Kukenan e Maverick Rock (2.800 m)',
              'Giorno di esplorazione senza zaino: Crack, Occhi di Cristallo, Guácharo, Cascate della Cattedrale e Abisso',
              'Discesa via campo base e Fiume Tek · ritorno a San Francisco de Yuruaní',
            ],
          },
          {
            name: '7 giorni / 6 notti',
            price: 'Da USD 580',
            childRate:
              'Partenza da San Francisco de Yuruaní: USD 580 · Partenza da Puerto Ordaz: USD 780 · Partenza da Caracas via terra (alloggio a Ciudad Bolívar): USD 1.100',
            unit: 'più tempo in vetta',
            badge: '7D / 6N',
            includes: [
              'Stessa via d’accesso e salita in vetta',
              'Due giorni di esplorazione sull’altopiano (punto triplo, dolina, Valle dei Cristalli, Occhi di Cristallo, Abisso, Campo da Golf)',
              'Discesa al campo base e al Fiume Tek',
              'Ultima notte in un lodge a San Francisco de Yuruaní',
            ],
          },
          {
            name: '8 giorni / 7 notti',
            price: 'Da USD 680',
            childRate:
              'Partenza da San Francisco de Yuruaní: USD 680 · Partenza da Puerto Ordaz: USD 980 · Partenza da Caracas via terra (alloggio a Ciudad Bolívar): USD 1.280',
            unit: 'percorso esteso fino a La Proa',
            badge: '8D / 7N',
            includes: [
              'Tutto il programma lungo in vetta',
              'Campo sul lato brasiliano (hotel Qoati) e passaggio per il punto triplo',
              'Escursione a La Proa via Lago Gladys e Fiume Cotinga, con una semplice discesa in corda',
              'Ritorno via sud del tepui, discesa al Fiume Tek e notte in un lodge a Yuruaní',
            ],
          },
        ],
        extrasTitle: 'Include e condizioni',
        extras: [
          'Colazioni, spuntini, pranzi e cene come da itinerario (pasti semplici da trekking)',
          'Guide sul sentiero; check-in INPARQUES il giorno 1',
          'Finanziamento a rate flessibile fino alla data della spedizione',
          'Offerte speciali per coppie o gruppi',
        ],
        conditions: [
          'Partenze ogni settimana dell’anno da San Francisco de Yuruaní e Puerto Ordaz',
          'Puoi unirti a qualsiasi partenza; non c’è bisogno di formare il proprio gruppo',
          'Percorsi in vetta soggetti alla forma fisica del gruppo e al meteo',
          'Chiedi date attuali, posti e tariffe via WhatsApp',
        ],
      },
    ],
  },
  'salto-angel': {
    name: 'Salto Ángel',
    region: 'Parco Nazionale di Canaima',
    tagline: 'La cascata più alta del mondo',
    description:
      'Kerepakupai Merú — Salto Ángel — cade per 979 m dall’Auyantepuy. Unisciti a una vera spedizione: giungla fitta, tepui, natura incontaminata e paesaggi unici. L’icona del Venezuela e una delle grandi destinazioni del Sud America.',
    longDescription:
      'Il nostro programma si concentra su natura e avventura, lontano dai sentieri turistici standard. Partenze la domenica con rientro il giovedì: 2 notti di fronte al Salto Ángel, 1 notte in una comunità locale e 1 notte in un lodge semplice alla Laguna di Canaima. Gruppi da minimo 8 e massimo 12 partecipanti. I voli partono e tornano solo da Caracas.',
    highlights: [
      'Cascata di 979 m dall’Auyantepuy',
      'Spedizione di 5 giorni / 4 notti (da domenica a giovedì)',
      'Viaggio in barca curiara, trekking al belvedere Laime e Kuravaina',
      'Guide professioniste in spagnolo e inglese · gruppi da 8 a 12',
    ],
    bestSeason: 'Da maggio a novembre (maggiore portata); controlla il calendario delle partenze',
    typicalDuration: '5 giorni / 4 notti (da domenica a giovedì)',
    howToGetThere:
      'Voli Caracas–Canaima–Caracas (Embraer 190, Cessna 206 o altri aeromobili). Trasferimenti in curiaras di legno con motori fuoribordo.',
    offers: [
      {
        title: 'Spedizione Salto Ángel 5 giorni',
        subtitle: 'Partenza domenica · rientro giovedì · natura e avventura',
        highlight: 'Da USD 830',
        packages: [
          {
            name: 'Programma completo',
            price: 'USD 830–890',
            unit: 'per persona · prima prenoti = migliore è la tariffa',
            badge: '8–12 persone',
            includes: [
              '2 notti di fronte al Salto Ángel',
              '1 notte in una comunità locale',
              '1 notte in un lodge semplice alla Laguna di Canaima',
              'Voli Caracas–Canaima–Caracas',
              'Trasferimenti in curiara, pasti come da itinerario e guide professioniste (ES/EN)',
            ],
          },
        ],
        extrasTitle: 'Cosa è incluso e cosa no',
        extras: [
          'Include: voli per Canaima, trasferimenti in curiara, alloggio come da notti del programma, pasti elencati (C/P/C) e guide professioniste',
          'Non incluso: ingresso al Parco Nazionale di Canaima (USD 40 per persona)',
          'Cibo semplice ed eccellente; comunicaci in anticipo se sei vegetariano o hai esigenze dietetiche',
          'Alloggio: amache al campo / comunità e una locanda locale con camere e bagno privato alla Laguna di Canaima (notte 4)',
        ],
        conditions: [
          'Partenze solo la domenica; rientro il giovedì',
          'Minimo 8 e massimo 12 partecipanti per partenza',
          'Voli solo da e per Caracas',
          'Il giorno 5 non include la cena (i servizi terminano dopo la colazione e il volo di ritorno)',
        ],
      },
    ],
  },
  'los-roques': {
    name: 'Los Roques',
    region: 'Dipendenze Federali',
    tagline: 'Nessuno rimane immune al fascino delle sue sabbie paradisiache',
    description:
      'Quando si parla di spiagge, l’arcipelago di Los Roques è uno dei gioielli turistici più preziosi del Venezuela. Nei suoi 50 cay e 300 banchi di sabbia puoi goderti varie attività o semplicemente rilassarti.',
    longDescription:
      'Le sue sabbie sono bianche, calde e morbide come le migliori coste del mondo, e le sue infinite sfumature di blu rivaleggiano solo con il perfetto clima tropicale della zona. Noi di Kaiman Travel progettiamo la tua esperienza oltre gli itinerari standard, su misura per ciò che desideri veramente dal tuo viaggio.',
    highlights: [
      '50 cay e 300 banchi di sabbia bianca',
      'Escursioni a Madrisquí, Francisquí e Cayo de Agua',
      'Snorkeling nelle barriere protette (La Virgen nel piano Premium)',
      'Esperienze su misura con Kaiman Travel, nessun itinerario standard',
    ],
    bestSeason:
      'Stagione Serena: settembre e ottobre (promo Posada Eva). Supplemento di alta stagione nei giorni festivi e nei fine settimana lunghi.',
    typicalDuration: 'Da 3 a 5 notti',
    howToGetThere: 'Volo per Gran Roque. Ti consigliamo e gestiamo i biglietti per te.',
    offer: {
      title: 'Stagione Serena a Los Roques',
      subtitle: 'Settembre e ottobre · valido per Posada Eva',
      highlight: '-15% OFF sul piano Premium',
      packages: [
        {
          name: 'Piano Premium',
          price: 'USD 155',
          unit: 'per persona × notte',
          badge: '-15% OFF',
          childRate:
            'USD 95 × notte (età 4–16; stesse condizioni dei cay del piano Base)',
          includes: [
            'Pensione completa con drink di benvenuto; pranzo di partenza: burger di pollo croccante con patatine o tostones ripieni di formaggio',
            'Include Madrisquí, Francisquí e un’uscita di snorkeling a La Virgen (una volta per persona, con video ricordo)',
            'Kit da spiaggia: borsa frigo con pranzo, ghiacciaia, ombrellone, sedie, asciugamani rinnovati ogni giorno, acqua, bibite, frutta e snack',
            'In omaggio una confezione da sei birre (lattine Zulia o Polar Light cans)',
          ],
        },
        {
          name: 'Piano Base',
          price: 'USD 135',
          unit: 'per persona × notte',
          childRate:
            'USD 90 × notte (età 4–16; escursione ai cay non inclusa; -15% OFF sui cay vicini se gli adulti li hanno già prenotati)',
          includes: [
            'Pensione completa con drink di benvenuto (niente colazione il giorno di arrivo né pranzo il giorno di partenza)',
            'Escursione a Madrisquí e Francisquí, con trasferimento sicuro',
            'Kit da spiaggia: borsa frigo con pranzo, ghiacciaia, tende, sedie, asciugamani, acqua, bibite, frutta, snack e attrezzatura da snorkeling',
          ],
        },
      ],
      extrasTitle: 'Regali e sconti extra',
      extras: [
        'Regalo Pulpo canopy per gruppi di 6+ durante la fase di prevendita',
        '-10% extra sull’escursione a Cayo de Agua (prenotata separatamente), pagando in anticipo o al lodge',
        'Voli: ti consigliamo e gestiamo i tuoi biglietti',
      ],
      conditions: [
        'Tariffe commissionabili per le agenzie',
        'La tariffa per bambini non include i cay vista la tariffa ridotta',
        'Alta stagione (Carnevale, Settimana Santa, Festa del Lavoro, Festa della Mamma, festività e fine settimana lunghi): supplemento del 15% sulla tariffa a persona per notte',
        'Cucina: menu mediterraneo con porzioni fisse dell’hotel (non frutti di mare illimitati). Frutti di mare e aragosta a costo extra',
        'Check-in: 15:00 (bagni disponibili se arrivi prima). Senza gruppo elettrogeno',
        'Non siamo responsabili per disinformazione da parte di agenzie esterne o guasti delle compagnie aeree',
        'Birre, bevande, pasti, snorkeling e piatti specifici non sono intercambiabili in base alla disponibilità; gli articoli non utilizzati sono considerati usufruiti (nessun rimborso o sostituzione)',
      ],
    },
  },
  'isla-de-margarita': {
    name: 'Isla de Margarita',
    region: 'Nueva Esparta',
    tagline: 'La Perla dei Caraibi ti aspetta',
    description:
      'Per molti venezuelani e visitatori stranieri, l’Isola di Margarita è la porta d’accesso ai Caraibi più autentici. Spiagge di sabbia dorata, mare calmo e un’atmosfera festosa che fonde natura, cultura e storia.',
    longDescription:
      'Noi di Kaiman Travel ti portiamo lì senza problemi, con tutto organizzato dall’inizio alla fine: biglietti, trasferimenti, alloggi pet-friendly o hotel all-inclusive ed escursioni a Cubagua e Coche. Il tuo unico compito sull’isola è divertirti.',
    highlights: [
      'Spiagge di sabbia dorata e mare calmo',
      'Appartamenti e case pet-friendly con piscina vicino alla spiaggia di Guacuco',
      'Hotel all-inclusive con open bar e beach club',
      'Escursioni in catamarano a Cubagua e Coche',
    ],
    bestSeason: 'Tutto l’anno; più brezza da dicembre ad aprile',
    typicalDuration: 'Da 4 a 7 giorni',
    howToGetThere:
      'Biglietti aerei andata e ritorno Maiquetía–Porlamar (o da qualsiasi parte del Venezuela). Traghetto disponibile anche da Puerto La Cruz / Cumaná.',
    offers: [
      {
        title: 'Trasferimento e alloggio',
        subtitle: 'Tutto organizzato dall’inizio alla fine',
        packages: [
          {
            name: 'Voli e mobilità',
            price: '',
            includes: [
              'Biglietti aerei andata e ritorno Maiquetía–Porlamar (o da qualsiasi parte del Venezuela)',
              'Trasferimenti via terra e noleggio auto durante il soggiorno',
            ],
          },
          {
            name: 'Appartamenti e case',
            price: '',
            badge: 'Pet friendly',
            includes: [
              'Appartamenti completamente attrezzati con piscina',
              'Casa con piscina a soli 5 minuti dalla spiaggia di Guacuco',
              'Tutte le opzioni sono pet friendly',
            ],
          },
          {
            name: 'Hotel all-inclusive',
            price: '',
            includes: [
              'Cocktail di benvenuto all’arrivo',
              'Piscine e aree attività per tutte le età',
              'Buffet: colazione 7:00–10:00, pranzo 12:30–15:00, merenda 16:00–18:00 e cena 19:00–22:00',
              'Open bar di bevande alcoliche e analcoliche dalle 11:00',
              'Beach club, parco per bambini, wifi nelle aree comuni e gruppo elettrogeno',
            ],
          },
        ],
      },
      {
        title: 'Escursioni a Cubagua e Coche',
        subtitle: 'Catamarano all’aperto per godersi i Caraibi con tutta la loro brezza',
        packages: [
          {
            name: 'Full Day I ❤️ Cubagua',
            price: 'USD 65',
            unit: 'adulti',
            childRate: 'USD 40 bambini (4–11) · neonati cortesia del capitano',
            includes: [
              'Trasferimento hotel–molo–hotel e navigazione in catamarano',
              'Snack di benvenuto e open bar nazionale (rum, naiguatá, vodka, birra Polar, succhi e bibite)',
              'Campo in riva al mare con churuatas, pranzo a base di pesce e dessert di frutta',
              'Passeggiata nella zona xerica, giro in semi-sottomarino, pallavolo, calcio, altalene sul mare e intrattenimento',
              'Tassa portuale e snorkeling non inclusi',
            ],
          },
          {
            name: 'Full Day Cubagua Lodge',
            price: 'USD 90',
            unit: 'adulti',
            badge: 'Premium',
            childRate: 'USD 50 bambini (4–11) · neonati cortesia del capitano',
            includes: [
              'Accesso alle strutture del Cubagua Lodge (terrazza e sala da pranzo)',
              'Bar nazionale e importato (whisky, vini e cocktail)',
              'Pranzo a base di pesce',
              'Kayak, paddle board, amache, lettini mare, altalena, jacuzzi d’acqua salata e servizio personalizzato',
              'Tassa portuale non inclusa',
            ],
          },
          {
            name: 'Cubagua 24H',
            price: 'From USD 190',
            unit: 'per persona (camera doppia) · fino a USD 230 camera singola',
            childRate: 'Bambini USD 150',
            includes: [
              'Full day con pernottamento: trasporto terrestre e marittimo',
              'Alloggio in camera doppia e pensione completa (snack, pranzo, cena e colazione)',
              'Open bar nazionale e importato',
              'Kayak, paddle board, Cubagua Patrimonial, Laguna de Barro, belvedere in barca e snorkeling',
              'Tassa portuale non inclusa',
            ],
          },
          {
            name: 'Cubagua Patrimonial',
            price: 'USD 53',
            unit: 'adulti',
            childRate: 'USD 35 bambini (4–11) · neonati cortesia del capitano',
            includes: [
              'Tour focalizzato sulla storia dell’isola',
              'Trasporto terrestre e marittimo, idratazione e pranzo stile snack (burger + bibita)',
              'Accesso al beach club e guida esperta sulla storia di Cubagua',
              'Tassa portuale non inclusa',
            ],
          },
          {
            name: 'Full Day Coche',
            price: 'USD 65',
            unit: 'adulti',
            childRate: 'USD 40 bambini (4–11)',
            includes: [
              'Partenza da Punta de Piedras con trasferimento marittimo in catamarano',
              'Snack di benvenuto e open bar nazionale',
              'Pranzo a buffet a base di pesce e beach club (tende e sedie)',
              'Escursione alla Laguna Rosada e intrattenimento con giochi',
              'Tassa portuale non inclusa',
            ],
          },
        ],
        extrasTitle: 'Attività acquatiche e paddle',
        extras: [
          'Snorkeling al Cubagua Lodge: USD 30 adulti / USD 20 bambini sotto i 10 anni (minimo 4 persone)',
          'Introduzione all’apnea (Try Freediving): USD 50',
          'Immersione certificata (2 immersioni): USD 75',
          'Immersione per principianti: USD 75 (minimo 2 persone; include foto e video GoPro, prenotazione anticipata)',
          'Flyboard, kitesurf e windsurf a Cubagua: da USD 80 (1 h) a USD 300 (9 h o più, con soggiorno)',
          'Paddle Board con Koral Paddle Club: sessioni da 30 min a 2 h, o PaddleTrip inferiore a 3 h (trasferimenti inclusi)',
          'BabyPaddle (0–2 anni, 45 min), FamilyPaddle (fino a 10 persone), FitPaddle e nuoto per adulti',
          'Tariffe Koral Paddle Club su richiesta',
        ],
        conditions: [
          'Le escursioni in mare non includono la tassa portuale se non diversamente specificato',
          'Disponibilità e tariffe per le attività acquatiche soggette a prenotazione e numero minimo di partecipanti',
          'Chiedi informazioni su hotel all-inclusive e alloggi pet-friendly in base alle date',
        ],
      },
    ],
  },
};

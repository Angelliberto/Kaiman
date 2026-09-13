import type { LocalizedDestinationPatch } from './types';

export const fr: Record<string, LocalizedDestinationPatch> = {
  roraima: {
    name: 'Roraima',
    region: 'Gran Sabana, Bolívar',
    tagline: 'Le tepui du monde perdu',
    description:
      'L’une des formations géologiques les plus anciennes et les plus mystiques de la Terre : le tepui le plus haut et le plus célèbre du parc national Canaima. En langue pémón, Roroimö signifie « la grande montagne vert-bleu ».',
    longDescription:
      'Nous partons chaque semaine de l’année depuis San Francisco de Yuruaní et Puerto Ordaz. Pas besoin de constituer votre propre groupe : vous pouvez rejoindre n’importe quel départ. Plans de paiement flexibles jusqu’à la date de votre expédition, ainsi que des offres pour les couples ou les groupes. Choisissez parmi trois itinéraires : 6D/5N, 7D/6N ou 8D/7N.',
    highlights: [
      'Départs hebdomadaires toute l’année · rejoignez sans votre propre groupe',
      'Trois itinéraires : 6, 7 ou 8 jours dans la Gran Sabana',
      'Sommet à 2 800 m : Vallée des Cristaux, Jacuzzis, Maverick Rock',
      'Financement échelonné et offres pour les couples ou les groupes',
    ],
    bestSeason: 'Toute l’année ; de décembre à mars, il pleut généralement moins',
    typicalDuration: '6 à 8 jours (5 à 7 nuits)',
    howToGetThere:
      'Point de départ : San Francisco de Yuruaní ou Puerto Ordaz. Trekking depuis Paraitepuy avec enregistrement à l’INPARQUES.',
    offers: [
      {
        title: 'Expéditions au Roraima Tepui',
        subtitle: 'Départs hebdomadaires · bloquez le prix d’aujourd’hui et payez en plusieurs fois',
        highlight: '3 itinéraires',
        packages: [
          {
            name: '6 jours / 5 nuits',
            price: '',
            unit: 'itinéraire classique',
            badge: '6D / 5N',
            includes: [
              'Ascension du sommet via La Rampa et une nuit dans l’« hôtel » (grotte rocheuse)',
              'Trek au sommet : Vallée des Cristaux, Jacuzzis, Fenêtre de Kukenan et Maverick Rock (2 800 m)',
              'Journée d’exploration sans sac : Crack, Yeux de Cristal, Guácharo, chutes de la Cathédrale et Abysse',
              'Descente par le camp de base et la rivière Tek · retour à San Francisco de Yuruaní',
            ],
          },
          {
            name: '7 jours / 6 nuits',
            price: '',
            unit: 'plus de temps au sommet',
            badge: '7D / 6N',
            includes: [
              'Même itinéraire d’accès et ascension du sommet',
              'Deux jours d’exploration sur le plateau (point triple, gouffre, Vallée de Cristal, Yeux de Cristal, Abysse, terrain de golf)',
              'Descente au camp de base et à la rivière Tek',
              'Dernière nuit dans un lodge à San Francisco de Yuruaní',
            ],
          },
          {
            name: '8 jours / 7 nuits',
            price: '',
            unit: 'itinéraire prolongé vers La Proa',
            badge: '8D / 7N',
            includes: [
              'Tout le programme du long sommet',
              'Campement côté Brésil (hôtel Qoati) et passage par le point triple',
              'Excursion à La Proa via le lac Gladys et la rivière Cotinga, avec une descente simple à la corde',
              'Retour par le sud du tepui, descente à la rivière Tek et nuit dans un lodge à Yuruaní',
            ],
          },
        ],
        extrasTitle: 'Inclus et conditions',
        extras: [
          'Petits-déjeuners, collations, déjeuners et dîners selon l’itinéraire (repas simples de trekking)',
          'Guides sur le sentier ; enregistrement INPARQUES le jour 1',
          'Financement échelonné flexible jusqu’à la date de l’expédition',
          'Offres spéciales pour les couples ou les groupes',
        ],
        conditions: [
          'Départs chaque semaine de l’année depuis San Francisco de Yuruaní et Puerto Ordaz',
          'Vous pouvez rejoindre n’importe quel départ ; pas besoin de former votre propre groupe',
          'Itinéraires du sommet soumis à la condition physique du groupe et à la météo',
          'Renseignez-vous sur les dates, places et tarifs actuels via WhatsApp',
        ],
      },
    ],
  },
  'salto-angel': {
    name: 'Salto Ángel',
    region: 'Parc National Canaima',
    tagline: 'La plus haute cascade du monde',
    description:
      'Kerepakupai Merú — le Salto Ángel — tombe de 979 m depuis l’Auyantepuy. Rejoignez une véritable expédition : jungle dense, tepuis, nature vierge et paysages uniques. L’icône du Venezuela et l’une des grandes destinations d’Amérique du Sud.',
    longDescription:
      'Notre programme se concentre sur la nature et l’aventure, loin des sentiers touristiques classiques. Départs le dimanche et retours le jeudi : 2 nuits face au Salto Ángel, 1 nuit dans une communauté locale et 1 nuit dans un lodge simple à la Laguna de Canaima. Groupes de minimum 8 et maximum 12 participants. Les vols partent et reviennent uniquement de Caracas.',
    highlights: [
      'Cascade de 979 m depuis l’Auyantepuy',
      'Expédition de 5 jours / 4 nuits (du dimanche au jeudi)',
      'Voyage en bateau curiara, trek jusqu’au belvédère Laime et Kuravaina',
      'Guides professionnels en espagnol et en anglais · groupes de 8 à 12 personnes',
    ],
    bestSeason: 'De mai à novembre (débit plus élevé) ; consultez le calendrier des départs',
    typicalDuration: '5 jours / 4 nuits (du dimanche au jeudi)',
    howToGetThere:
      'Vols Caracas–Canaima–Caracas (Embraer 190, Cessna 206 ou autre aéronef). Transferts en curiaras en bois avec moteurs hors-bord.',
    offers: [
      {
        title: 'Expédition Salto Ángel 5 jours',
        subtitle: 'Départ le dimanche · retour le jeudi · nature et aventure',
        highlight: 'À partir de USD 830',
        packages: [
          {
            name: 'Programme complet',
            price: 'USD 830–890',
            unit: 'par personne · réservation anticipée = meilleur tarif',
            badge: '8–12 personnes',
            includes: [
              '2 nuits face au Salto Ángel',
              '1 nuit dans une communauté locale',
              '1 nuit dans un lodge simple à la Laguna de Canaima',
              'Vols Caracas–Canaima–Caracas',
              'Transferts en curiara, repas selon l’itinéraire et guides professionnels (ES/EN)',
            ],
          },
        ],
        extrasTitle: 'Ce qui est inclus et ce qui ne l’est pas',
        extras: [
          'Inclus : vols vers Canaima, transferts en curiara, hébergement selon les nuits du programme, repas mentionnés (P/D/D) et guides professionnels',
          'Non inclus : entrée au parc national Canaima (USD 40 par personne)',
          'Nourriture simple et excellente ; prévenez-nous à l’avance si vous êtes végétarien ou avez des besoins alimentaires particuliers',
          'Hébergement : hamacs au camp / communauté et une auberge locale avec chambres et salle de bain privée à la Laguna de Canaima (nuit 4)',
        ],
        conditions: [
          'Départs uniquement le dimanche ; retour le jeudi',
          'Minimum 8 et maximum 12 participants par départ',
          'Vols uniquement à destination et en provenance de Caracas',
          'Le jour 5 ne comprend pas le dîner (les services se terminent après le petit-déjeuner et le vol de retour)',
        ],
      },
    ],
  },
  'los-roques': {
    name: 'Los Roques',
    region: 'Dépendances Fédérales',
    tagline: 'Personne ne reste insensible au charme de ses sables paradisiaques',
    description:
      'En matière de plages, l’archipel de Los Roques est l’un des joyaux touristiques les plus prisés du Venezuela. À travers ses 50 cayes et ses 300 bancs de sable, vous pourrez profiter d’activités variées ou simplement vous détendre.',
    longDescription:
      'Ses sables sont aussi blancs, chauds et doux que les meilleures côtes du monde, et ses nuances infinies de bleu n’ont d’égal que le climat tropical parfait de la région. Chez Kaiman Travel, nous concevons votre expérience au-delà des itinéraires standards, sur mesure selon ce que vous attendez réellement de votre voyage.',
    highlights: [
      '50 cayes et 300 bancs de sable blanc',
      'Excursions à Madrisquí, Francisquí et Cayo de Agua',
      'Snorkeling dans les récifs protégés (La Virgen sur le plan Premium)',
      'Expériences sur mesure avec Kaiman Travel, sans itinéraires standards',
    ],
    bestSeason:
      'Saison Serena : septembre et octobre (promo Posada Eva). Supplément haute saison pendant les jours fériés et les longs week-ends.',
    typicalDuration: '3 à 5 nuits',
    howToGetThere: 'Vol pour Gran Roque. Nous vous conseillons et gérons la billetterie pour vous.',
    offer: {
      title: 'Saison Serena à Los Roques',
      subtitle: 'Septembre et octobre · valable pour la Posada Eva',
      highlight: '-15% OFF sur le plan Premium',
      packages: [
        {
          name: 'Plan Basique',
          price: 'EUR 135',
          unit: 'par personne × nuit',
          childRate:
            'EUR 90 × nuit (de 4 à 16 ans ; excursion aux cayes non incluse ; 15 % de réduction sur les cayes voisines si les adultes les ont déjà réservées)',
          includes: [
            'Pension complète avec verre de bienvenue (pas de petit-déjeuner le jour de l’arrivée ni de déjeuner le jour du départ)',
            'Excursion à Madrisquí et Francisquí, avec transfert sécurisé',
            'Kit de plage : glacière avec déjeuner, bac à glaçons, tentes, chaises, serviettes, eau, boissons non alcoolisées, fruits, collations et équipement de plongée avec tuba',
          ],
        },
        {
          name: 'Plan Premium',
          price: 'EUR 155',
          unit: 'par personne × nuit',
          badge: '-15% OFF',
          childRate:
            'EUR 95 × nuit (de 4 à 16 ans ; mêmes conditions pour les cayes que le plan Basique)',
          includes: [
            'Pension complète avec verre de bienvenue ; déjeuner de départ : burger au poulet croustillant avec frites ou tostones farcis au fromage',
            'Comprend Madrisquí, Francisquí et une sortie snorkeling à La Virgen (une fois par personne, avec vidéo souvenir)',
            'Kit de plage : glacière avec déjeuner, bac à glaçons, parasol, chaises, serviettes rafraîchies quotidiennement, eau, boissons non alcoolisées, fruits et collations',
            'Cadeau d’un pack de six bières (canettes Zulia ou Polar Light)',
          ],
        },
      ],
      extrasTitle: 'Cadeaux et réductions supplémentaires',
      extras: [
        'Cadeau de canopée Pulpo pour les groupes de 6+ personnes lors de la phase de pré-vente',
        '-10 % supplémentaires sur l’excursion Cayo de Agua (réservée séparément), en payant à l’avance ou au lodge',
        'Vols : nous vous conseillons et gérons vos billets',
      ],
      conditions: [
        'Tarifs commissionnables pour les agences',
        'Le tarif enfant ne comprend pas les cayes compte tenu du tarif réduit',
        'Haute saison (Carnaval, Semaine Sainte, Fête du Travail, Fête des Mères, jours fériés et longs week-ends) : supplément de 15 % sur le tarif par personne et par nuit',
        'Cuisine : menu méditerranéen avec portions fixes de l’hôtel (pas de fruits de mer à volonté). Fruits de mer et langouste en supplément',
        'Enregistrement : 15h00 (toilettes disponibles si vous arrivez plus tôt). Pas de groupe électrogène',
        'Nous ne sommes pas responsables des informations erronées provenant d’agences externes ou des défaillances des compagnies aériennes',
        'Les bières, boissons, repas, équipement de tuba et plats spécifiques ne sont pas interchangeables selon la disponibilité ; les articles non consommés sont considérés comme utilisés (pas de remboursement ni de remplacement)',
      ],
    },
  },
  'isla-de-margarita': {
    name: 'Île de Margarita',
    region: 'Nueva Esparta',
    tagline: 'La Perle des Caraïbes vous attend',
    description:
      'Pour de nombreux Vénézuéliens et visiteurs étrangers, l’île de Margarita est la porte d’entrée vers les Caraïbes les plus authentiques. Plages de sable doré, mers calmes et une atmosphère festive qui mêle nature, culture et histoire.',
    longDescription:
      'Chez Kaiman Travel, nous vous y emmenons sans tracas, avec tout organisé de A à Z : billets, transferts, hébergement pet friendly ou hôtels tout compris, et excursions à Cubagua et Coche. Votre seul travail sur l’île est de profiter.',
    highlights: [
      'Plages de sable doré et mers calmes',
      'Appartements et maisons pet friendly avec piscine près de la plage de Guacuco',
      'Hôtels tout compris avec open bar et club de plage',
      'Excursions en catamaran vers Cubagua et Coche',
    ],
    bestSeason: 'Toute l’année ; plus de brise de décembre à avril',
    typicalDuration: '4 à 7 jours',
    howToGetThere:
      'Billets d’avion aller-retour Maiquetía–Porlamar (ou depuis n’importe où au Venezuela). Ferry également disponible depuis Puerto La Cruz / Cumaná.',
    offers: [
      {
        title: 'Transfert et hébergement',
        subtitle: 'Tout est organisé de A à Z',
        packages: [
          {
            name: 'Vols et mobilité',
            price: '',
            includes: [
              'Billets d’avion aller-retour Maiquetía–Porlamar (ou depuis n’importe où au Venezuela)',
              'Transferts terrestres et location de véhicule pendant votre séjour',
            ],
          },
          {
            name: 'Appartements et maisons',
            price: '',
            badge: 'Pet friendly',
            includes: [
              'Appartements entièrement équipés avec piscine',
              'Maison avec piscine à seulement 5 minutes de la plage de Guacuco',
              'Toutes les options sont pet friendly',
            ],
          },
          {
            name: 'Hôtels tout compris',
            price: '',
            includes: [
              'Cocktail de bienvenue à l’arrivée',
              'Piscines et aires d’activités pour tous les âges',
              'Buffet : petit-déjeuner 7h00–10h00, déjeuner 12h30–15h00, collation 16h00–18h00 et dîner 19h00–22h00',
              'Open bar de boissons alcoolisées et non alcoolisées à partir de 11h00',
              'Club de plage, parc pour enfants, wifi dans les parties communes et groupe électrogène',
            ],
          },
        ],
      },
      {
        title: 'Excursions à Cubagua et Coche',
        subtitle: 'Catamaran en plein air pour profiter des Caraïbes avec toute sa brise',
        packages: [
          {
            name: 'Full Day I ❤️ Cubagua',
            price: 'USD 65',
            unit: 'adultes',
            childRate: 'USD 40 enfants (4–11) · nourrissons invités par le capitaine',
            includes: [
              'Transfert hôtel–jetée–hôtel et navigation en catamaran',
              'Collation de bienvenue et open bar national (rhum, naiguatá, vodka, bière Polar, jus et boissons non alcoolisées)',
              'Campement en bord de mer avec churuatas, déjeuner à base de poisson et dessert aux fruits',
              'Promenade en zone xérique, tour en semi-sous-marin, volley-ball, football, balançoires sur la mer et animations',
              'Taxe portuaire et snorkeling non inclus',
            ],
          },
          {
            name: 'Full Day Cubagua Lodge',
            price: 'USD 90',
            unit: 'adultes',
            badge: 'Premium',
            childRate: 'USD 50 enfants (4–11) · nourrissons invités par le capitaine',
            includes: [
              'Accès aux installations du Cubagua Lodge (terrasse et salle à manger)',
              'Bar national et importé (whisky, vins et cocktails)',
              'Déjeuner à base de poisson',
              'Kayak, paddle board, hamacs, lits de mer, balançoire, jacuzzi d’eau salée et service personnalisé',
              'Taxe portuaire non incluse',
            ],
          },
          {
            name: 'Cubagua 24H',
            price: 'À partir de USD 190',
            unit: 'par personne (occupation double) · jusqu’à USD 230 occupation simple',
            childRate: 'Enfants USD 150',
            includes: [
              'Full day avec nuitée : transport terrestre et maritime',
              'Hébergement en chambre double et pension complète (collation, déjeuner, dîner et petit-déjeuner)',
              'Open bar national et importé',
              'Kayak, paddle board, Cubagua Patrimonial, Laguna de Barro, belvédère en bateau et snorkeling',
              'Taxe portuaire non incluse',
            ],
          },
          {
            name: 'Cubagua Patrimonial',
            price: 'USD 53',
            unit: 'adultes',
            childRate: 'USD 35 enfants (4–11) · nourrissons invités par le capitaine',
            includes: [
              'Tour axé sur l’histoire de l’île',
              'Transport terrestre et maritime, hydratation et déjeuner de type collation (burger + boisson)',
              'Accès au club de plage et guide expert sur l’histoire de Cubagua',
              'Taxe portuaire non incluse',
            ],
          },
          {
            name: 'Full Day Coche',
            price: 'USD 65',
            unit: 'adultes',
            childRate: 'USD 40 enfants (4–11)',
            includes: [
              'Départ de Punta de Piedras avec transfert maritime en catamaran',
              'Collation de bienvenue et open bar national',
              'Déjeuner buffet à base de poisson et club de plage (tentes et chaises)',
              'Excursion à la Laguna Rosada et animations avec jeux',
              'Taxe portuaire non incluse',
            ],
          },
        ],
        extrasTitle: 'Activités nautiques et paddle',
        extras: [
          'Snorkeling au Cubagua Lodge : USD 30 adultes / USD 20 enfants de moins de 10 ans (minimum 4 personnes)',
          'Initiation à l’apnée (Try Freediving) : USD 50',
          'Plongée certifiée (2 immersions) : USD 75',
          'Plongée débutant : USD 75 (minimum 2 personnes ; comprend photos et vidéo GoPro, réservation à l’avance)',
          'Flyboard, kitesurf et windsurf à Cubagua : de USD 80 (1 h) à USD 300 (9 h ou plus, avec séjour)',
          'Paddle Board avec le Koral Paddle Club : sessions de 30 min à 2 h, ou PaddleTrip de moins de 3 h (transferts inclus)',
          'BabyPaddle (0–2 ans, 45 min), FamilyPaddle (jusqu’à 10 personnes), FitPaddle et natation adulte',
          'Tarifs Koral Paddle Club sur demande',
        ],
        conditions: [
          'Les excursions maritimes ne comprennent pas la taxe portuaire sauf indication contraire',
          'Disponibilité et tarifs des activités nautiques soumis à réservation et à un nombre minimum de participants',
          'Renseignez-vous sur les hôtels tout compris et les hébergements pet friendly selon la date',
        ],
      },
    ],
  },
};

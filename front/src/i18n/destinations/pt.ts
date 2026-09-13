import type { LocalizedDestinationPatch } from './types';

export const pt: Record<string, LocalizedDestinationPatch> = {
  roraima: {
    name: 'Roraima',
    region: 'Gran Sabana, Bolívar',
    tagline: 'O tepui do mundo perdido',
    description:
      'Uma das formações geológicas mais antigas e místicas da Terra: o tepui mais alto e famoso do Parque Nacional Canaima. No idioma Pemón, Roroimö — “a grande montanha verde-azulada”.',
    longDescription:
      'Partimos todas as semanas do ano de San Francisco de Yuruaní e Puerto Ordaz. Não é necessário formar seu próprio grupo: você pode se juntar a qualquer partida. Planos de parcelamento flexíveis até a data da sua expedição, além de ofertas para casais ou grupos. Escolha entre três itinerários: 6D/5N, 7D/6N ou 8D/7N.',
    highlights: [
      'Partidas semanais o ano todo · junte-se sem grupo próprio',
      'Três itinerários: 6, 7 ou 8 dias na Gran Sabana',
      'Cume a 2.800 m: Vale dos Cristais, Jacuzzis, Maverick Rock',
      'Financiamento parcelado e ofertas para casais ou grupos',
    ],
    bestSeason: 'O ano todo; de dezembro a março costuma chover menos',
    typicalDuration: '6 a 8 dias (5 a 7 noites)',
    howToGetThere:
      'Ponto de partida: San Francisco de Yuruaní ou Puerto Ordaz. Trekking de Paraitepuy com check-in do INPARQUES.',
    offers: [
      {
        title: 'Expedições ao Tepui Roraima',
        subtitle: 'Partidas semanais · garanta o preço de hoje e pague parcelado',
        highlight: '3 itinerários',
        packages: [
          {
            name: '6 dias / 5 noites',
            price: '',
            unit: 'itinerário clássico',
            badge: '6D / 5N',
            includes: [
              'Subida ao cume pela La Rampa e uma noite no “hotel” (caverna rochosa)',
              'Trekking no cume: Vale dos Cristais, Jacuzzis, Janela de Kukenan e Maverick Rock (2.800 m)',
              'Dia de exploração sem carga: Fenda, Olhos de Cristal, Guácharo, Salto Catedral e Abismo',
              'Descida pelo acampamento base e Rio Tek · retorno a San Francisco de Yuruaní',
            ],
          },
          {
            name: '7 dias / 6 noites',
            price: '',
            unit: 'mais tempo no cume',
            badge: '7D / 6N',
            includes: [
              'Mesma rota de acesso e subida ao cume',
              'Dois dias de exploração no planalto (ponto tríplice, sumidouro, Vale de Cristal, Olhos de Cristal, Abismo, Campo de Golfe)',
              'Descida ao acampamento base e Rio Tek',
              'Noite final em uma pousada em San Francisco de Yuruaní',
            ],
          },
          {
            name: '8 dias / 7 noites',
            price: '',
            unit: 'rota estendida até La Proa',
            badge: '8D / 7N',
            includes: [
              'Tudo do programa longo no cume',
              'Acampamento no lado brasileiro (hotel Qoati) e passagem pelo ponto tríplice',
              'Excursão a La Proa via Lagoa Gladys e Rio Cotinga, com uma descida simples de corda',
              'Retorno pelo sul do tepui, descida ao Rio Tek e noite em uma pousada em Yuruaní',
            ],
          },
        ],
        extrasTitle: 'Inclui e condições',
        extras: [
          'Cafés da manhã, lanches, almoços e jantares conforme o itinerário (refeições simples de trekking)',
          'Guias na trilha; check-in do INPARQUES no dia 1',
          'Financiamento parcelado flexível até a data da expedição',
          'Ofertas especiais para casais ou grupos',
        ],
        conditions: [
          'Partidas todas as semanas do ano de San Francisco de Yuruaní e Puerto Ordaz',
          'Você pode se juntar a qualquer partida; não é necessário formar seu próprio grupo',
          'Rotas no cume sujeitas ao preparo físico do grupo e ao clima',
          'Consulte datas atuais, vagas e tarifas via WhatsApp',
        ],
      },
    ],
  },
  'salto-angel': {
    name: 'Salto Ángel',
    region: 'Parque Nacional Canaima',
    tagline: 'A maior queda d\'água do mundo',
    description:
      'Kerepakupai Merú — Salto Ángel — despenca 979 m do Auyantepuy. Junte-se a uma expedição real: selva densa, tepuis, natureza intocada e paisagens únicas. O ícone da Venezuela e um dos grandes destinos da América do Sul.',
    longDescription:
      'Nosso programa foca na natureza e na aventura, longe das trilhas turísticas padrão. Partidas aos domingos com retorno na quinta-feira: 2 noites de frente para o Salto Ángel, 1 noite em uma comunidade local e 1 noite em uma pousada básica na Laguna de Canaima. Grupos de no mínimo 8 e máximo 12 participantes. Voos partem e retornam apenas de Caracas.',
    highlights: [
      'Queda d\'água de 979 m do Auyantepuy',
      'Expedição de 5 dias / 4 noites (domingo a quinta-feira)',
      'Viagem de barco curiara, trilha para o mirante Laime e Kuravaina',
      'Guias profissionais em espanhol e inglês · grupos de 8 a 12',
    ],
    bestSeason: 'Maio a novembro (maior vazão); verifique o calendário de partidas',
    typicalDuration: '5 dias / 4 noites (domingo a quinta-feira)',
    howToGetThere:
      'Voos Caracas–Canaima–Caracas (Embraer 190, Cessna 206 ou outra aeronave). Traslados em curiaras de madeira com motores de popa.',
    offers: [
      {
        title: 'Expedição Salto Ángel 5 dias',
        subtitle: 'Partida domingo · retorno quinta-feira · natureza e aventura',
        highlight: 'A partir de USD 830',
        packages: [
          {
            name: 'Programa completo',
            price: 'USD 830–890',
            unit: 'por pessoa · reserva antecipada = melhor tarifa',
            badge: '8–12 pessoas',
            includes: [
              '2 noites de frente para o Salto Ángel',
              '1 noite em uma comunidade local',
              '1 noite em uma pousada básica na Laguna de Canaima',
              'Voos Caracas–Canaima–Caracas',
              'Traslados em curiara, refeições conforme o itinerário e guias profissionais (ES/EN)',
            ],
          },
        ],
        extrasTitle: 'O que está incluído e o que não está',
        extras: [
          'Inclui: voos para Canaima, traslados em curiara, hospedagem conforme as noites do programa, refeições listadas (C/A/J) e guias profissionais',
          'Não incluído: entrada no Parque Nacional Canaima (USD 40 por pessoa)',
          'Comida simples e excelente; avise com antecedência se você for vegetariano ou tiver necessidades dietéticas',
          'Hospedagem: redes no acampamento / comunidade e uma pousada local com quartos e banheiro privativo na Laguna de Canaima (noite 4)',
        ],
        conditions: [
          'Partidas apenas aos domingos; retorno às quintas-feiras',
          'Mínimo de 8 e máximo de 12 participantes por partida',
          'Voos apenas de e para Caracas',
          'O dia 5 não inclui jantar (os serviços terminam após o café da manhã e o voo de retorno)',
        ],
      },
    ],
  },
  'los-roques': {
    name: 'Los Roques',
    region: 'Dependências Federais',
    tagline: 'Ninguém fica imune ao charme de suas areias paradisíacas',
    description:
      'Quando se trata de praias, o arquipélago de Los Roques é uma das joias turísticas mais preciosas da Venezuela. Em suas 50 ilhotas (cayos) e 300 bancos de areia, você pode desfrutar de várias atividades ou simplesmente relaxar.',
    longDescription:
      'Suas areias são tão brancas, quentes e macias quanto as melhores costas do mundo, e seus infinitos tons de azul rivalizam apenas com o clima tropical perfeito da região. Na Kaiman Travel, desenhamos sua experiência além dos itinerários padrão, sob medida para o que você realmente deseja da sua viagem.',
    highlights: [
      '50 ilhotas (cayos) e 300 bancos de areia branca',
      'Excursões a Madrisquí, Francisquí e Cayo de Agua',
      'Snorkeling em recifes protegidos (La Virgen no plano Premium)',
      'Experiências sob medida com a Kaiman Travel, sem itinerários padrão',
    ],
    bestSeason:
      'Temporada Serena: setembro e outubro (promoção Posada Eva). Sobretaxa de alta temporada em feriados e fins de semana prolongados.',
    typicalDuration: '3 a 5 noites',
    howToGetThere: 'Voo para Gran Roque. Aconselhamos e gerenciamos a emissão de passagens para você.',
    offer: {
      title: 'Temporada Serena em Los Roques',
      subtitle: 'Setembro e outubro · válido para Posada Eva',
      highlight: '-15% OFF no plano Premium',
      packages: [
        {
          name: 'Plano Básico',
          price: 'EUR 135',
          unit: 'por pessoa × noite',
          childRate:
            'EUR 90 × noite (4–16 anos; passeio aos cayos não incluído; 15% OFF nos cayos próximos se os adultos já os reservaram)',
          includes: [
            'Pensão completa com drink de boas-vindas (sem café da manhã no dia da chegada ou almoço no dia da partida)',
            'Excursão a Madrisquí e Francisquí, com traslado seguro',
            'Kit de praia: cooler com almoço, caixa de gelo, barracas, cadeiras, toalhas, água, refrigerantes, frutas, lanches e equipamento de snorkel',
          ],
        },
        {
          name: 'Plano Premium',
          price: 'EUR 155',
          unit: 'por pessoa × noite',
          badge: '-15% OFF',
          childRate:
            'EUR 95 × noite (4–16 anos; mesmas condições de cayo do plano Básico)',
          includes: [
            'Pensão completa com drink de boas-vindas; almoço de partida: hambúrguer de frango crocante com batatas fritas ou tostones recheados com queijo',
            'Inclui Madrisquí, Francisquí e um passeio de snorkeling em La Virgen (uma vez por pessoa, com vídeo de recordação)',
            'Kit de praia: cooler com almoço, caixa de gelo, guarda-sol, cadeiras, toalhas renovadas diariamente, água, refrigerantes, frutas e lanches',
            'Presente de um pack de seis cervejas (latas Zulia ou Polar Light)',
          ],
        },
      ],
      extrasTitle: 'Presentes e descontos extras',
      extras: [
        'Presente de cobertura Pulpo para grupos de 6+ durante a fase de pré-venda',
        '-10% extra na excursão Cayo de Agua (reservada separadamente), pagando antecipadamente ou na pousada',
        'Voos: aconselhamos e gerenciamos suas passagens',
      ],
      conditions: [
        'Tarifas comissionáveis para agências',
        'A tarifa infantil não inclui cayos dada a tarifa baixa',
        'Alta temporada (Carnaval, Semana Santa, Dia do Trabalho, Dia das Mães, feriados e fins de semana prolongados): 15% de acréscimo na tarifa por pessoa por noite',
        'Gastronomia: menu mediterrâneo com porções fixas do hotel (não é frutos do mar ilimitados). Frutos do mar e lagosta com custo extra',
        'Check-in: 15h00 (banheiros disponíveis se você chegar mais cedo). Sem gerador elétrico',
        'Não nos responsabilizamos por informações incorretas de agências externas ou falhas aéreas',
        'Cervejas, bebidas, refeições, snorkel e pratos específicos não são intercambiáveis com base na disponibilidade; itens não utilizados são considerados desfrutados (sem reembolsos ou substituições)',
      ],
    },
  },
  'isla-de-margarita': {
    name: 'Ilha de Margarita',
    region: 'Nueva Esparta',
    tagline: 'A Pérola do Caribe espera por você',
    description:
      'Para muitos venezuelanos e visitantes estrangeiros, a Ilha de Margarita é a porta de entrada para o Caribe mais autêntico. Praias de areia dourada, mar calmo e uma atmosfera festiva que mistura natureza, cultura e história.',
    longDescription:
      'Na Kaiman Travel levamos você até lá sem complicações, com tudo organizado do início ao fim: passagens, traslados, hospedagem pet-friendly ou hotéis com tudo incluído, e excursões a Cubagua e Coche. Seu único trabalho na ilha é aproveitar.',
    highlights: [
      'Praias de areia dourada e mar calmo',
      'Apartamentos e casas pet-friendly com piscina perto da Praia de Guacuco',
      'Hotéis com tudo incluído com bar aberto e clube de praia',
      'Excursões de catamarã a Cubagua e Coche',
    ],
    bestSeason: 'O ano todo; mais brisa de dezembro a abril',
    typicalDuration: '4 a 7 dias',
    howToGetThere:
      'Passagens aéreas de ida e volta Maiquetía–Porlamar (ou de qualquer lugar da Venezuela). Balsa também disponível de Puerto La Cruz / Cumaná.',
    offers: [
      {
        title: 'Traslado e hospedagem',
        subtitle: 'Tudo organizado do início ao fim',
        packages: [
          {
            name: 'Voos e mobilidade',
            price: '',
            includes: [
              'Passagens aéreas de ida e volta Maiquetía–Porlamar (ou de qualquer lugar da Venezuela)',
              'Traslados terrestres e aluguel de veículo durante sua estadia',
            ],
          },
          {
            name: 'Apartamentos e casas',
            price: '',
            badge: 'Pet friendly',
            includes: [
              'Apartamentos totalmente equipados com piscina',
              'Casa com piscina a apenas 5 minutos da Praia de Guacuco',
              'Todas as opções são pet friendly',
            ],
          },
          {
            name: 'Hotéis com tudo incluído',
            price: '',
            includes: [
              'Coquetel de boas-vindas na chegada',
              'Piscinas e áreas de atividades para todas as idades',
              'Buffet: café da manhã 07:00–10:00, almoço 12:30–15:00, lanche 16:00–18:00 e jantar 19:00–22:00',
              'Bar aberto de bebidas alcoólicas e não alcoólicas a partir das 11:00',
              'Clube de praia, parque infantil, wi-fi em áreas comuns e gerador elétrico',
            ],
          },
        ],
      },
      {
        title: 'Excursões a Cubagua e Coche',
        subtitle: 'Catamarã ao ar livre para aproveitar o Caribe com toda a sua brisa',
        packages: [
          {
            name: 'Full Day I ❤️ Cubagua',
            price: 'USD 65',
            unit: 'adultos',
            childRate: 'USD 40 crianças (4–11) · bebês cortesia do capitão',
            includes: [
              'Traslado hotel–cais–hotel e navegação em catamarã',
              'Lanche de boas-vindas e bar nacional aberto (rum, naiguatá, vodka, cerveja Polar, sucos e refrigerantes)',
              'Acampamento à beira-mar com churuatas, almoço à base de peixe e sobremesa de frutas',
              'Caminhada em zona xérica, passeio de semi-submarino, vôlei, futebol, balanços sobre o mar e entretenimento',
              'Taxa portuária e snorkeling não incluídos',
            ],
          },
          {
            name: 'Full Day Cubagua Lodge',
            price: 'USD 90',
            unit: 'adultos',
            badge: 'Premium',
            childRate: 'USD 50 crianças (4–11) · bebês cortesia do capitão',
            includes: [
              'Acesso às instalações do Cubagua Lodge (terraço e sala de jantar)',
              'Bar nacional e importado (uísque, vinhos e coquetéis)',
              'Almoço à base de peixe',
              'Caiaque, paddle board, redes, camas de mar, balanço, jacuzzi de água salgada e serviço personalizado',
              'Taxa portuária não incluída',
            ],
          },
          {
            name: 'Cubagua 24H',
            price: 'A partir de USD 190',
            unit: 'por pessoa (ocupação dupla) · até USD 230 ocupação individual',
            childRate: 'Crianças USD 150',
            includes: [
              'Dia inteiro com pernoite: transporte terrestre e marítimo',
              'Hospedagem em quarto duplo e pensão completa (lanche, almoço, jantar e café da manhã)',
              'Bar nacional e importado aberto',
              'Caiaque, paddle board, Cubagua Patrimonial, Laguna de Barro, mirante no barco e snorkeling',
              'Taxa portuária não incluída',
            ],
          },
          {
            name: 'Cubagua Patrimonial',
            price: 'USD 53',
            unit: 'adultos',
            childRate: 'USD 35 crianças (4–11) · bebês cortesia do capitão',
            includes: [
              'Tour focado na história da ilha',
              'Transporte terrestre e marítimo, hidratação e almoço estilo lanche (hambúrguer + bebida)',
              'Acesso ao clube de praia e guia especializado na história de Cubagua',
              'Taxa portuária não incluída',
            ],
          },
          {
            name: 'Full Day Coche',
            price: 'USD 65',
            unit: 'adultos',
            childRate: 'USD 40 crianças (4–11)',
            includes: [
              'Partida de Punta de Piedras com traslado marítimo em catamarã',
              'Lanche de boas-vindas e bar nacional aberto',
              'Almoço buffet à base de peixe e clube de praia (barracas e cadeiras)',
              'Excursão à Laguna Rosada e entretenimento com jogos',
              'Taxa portuária não incluída',
            ],
          },
        ],
        extrasTitle: 'Atividades aquáticas e paddle',
        extras: [
          'Snorkeling no Cubagua Lodge: USD 30 adultos / USD 20 crianças menores de 10 anos (mínimo 4 pessoas)',
          'Introdução ao mergulho livre (Try Freediving): USD 50',
          'Mergulho certificado (2 mergulhos): USD 75',
          'Mergulho para iniciantes: USD 75 (mínimo 2 pessoas; inclui fotos e vídeo GoPro, reserva antecipada)',
          'Flyboard, kitesurf e windsurf em Cubagua: de USD 80 (1 h) a USD 300 (9 h ou mais, com estadia)',
          'Paddle Board com Koral Paddle Club: sessões de 30 min a 2 h, ou PaddleTrip com menos de 3 h (traslados incluídos)',
          'BabyPaddle (0–2 anos, 45 min), FamilyPaddle (até 10 pessoas), FitPaddle e natação para adultos',
          'Tarifas do Koral Paddle Club sob consulta',
        ],
        conditions: [
          'Excursões marítimas não incluem a taxa portuária, a menos que indicado de outra forma',
          'Disponibilidade e tarifas para atividades aquáticas sujeitas a reserva e número mínimo de participantes',
          'Consulte sobre hotéis com tudo incluído e hospedagem pet-friendly por data',
        ],
      },
    ],
  },
};

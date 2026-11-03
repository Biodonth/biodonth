// PT-BR copy for the /especialistas page.
// All specialist data is PLACEHOLDER pending Biodonth's review.
// [CONFIRM-BIODONTH] All names, CROs, roles, and philosophy quotes need replacement.

export type Especialista = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  philosophy?: string;
  treatments: string[];
  cro: string;
  image: {
    src: string;
    alt: string;
  };
};

export const ESPECIALISTAS: Especialista[] = [
  {
    slug: 'diretora-clinica',
    name: 'Dra. Marcia Maria de Sousa',
    initials: 'MMS',
    role: 'Diretora Cl\u00ednica',
    treatments: ['protese', 'cirurgias', 'checkup'],
    cro: 'CRO-SP 101519',
    image: {
      src: '/images/especialistas/marcia-sousa.jpeg',
      alt: 'Retrato de Dra. Marcia Maria de Sousa, Diretora Cl\u00ednica',
    },
  },
  {
    slug: 'implantodontia',
    name: 'Dr. Nilson da Silva de Oliveira',
    initials: 'NSO',
    role: 'Implantodontia',
    treatments: ['implantes-dentarios'],
    cro: 'CRO-SP 126440',
    image: {
      src: '/images/especialistas/nilson-oliveira.png',
      alt: 'Retrato de Dr. Nilson da Silva de Oliveira, Implantodontia',
    },
  },
  {
    slug: 'bucomaxilofacial',
    name: 'Dr. Thiago Salvador de Lima Yamada',
    initials: 'TSY',
    role: 'Cirurgia Bucomaxilofacial',
    treatments: ['cirurgias'],
    cro: 'CRO-SP 106002',
    image: {
      src: '/images/especialistas/thiago-yamada.png',
      alt: 'Retrato de Dr. Thiago Salvador de Lima Yamada, Cirurgia Bucomaxilofacial',
    },
  },
  {
    slug: 'protese-dentaria',
    name: 'Dra. Ana Beatriz G. de Morais',
    initials: 'ABM',
    role: 'Pr\u00f3tese Dent\u00e1ria',
    treatments: ['protese'],
    cro: 'CRO-SP 165133',
    image: {
      src: '/images/especialistas/ana-beatriz-morais.png',
      alt: 'Retrato de Dra. Ana Beatriz G. de Morais, Pr\u00f3tese Dent\u00e1ria',
    },
  },
  {
    slug: 'ortodontia',
    name: 'Dra. Andreia Santos R. de Negreiros',
    initials: 'ASN',
    role: 'Ortodontia',
    treatments: ['ortodontia', 'alinhadores'],
    cro: 'CRO-SP 159826',
    image: {
      src: '/images/especialistas/andreia-negreiros.jpeg',
      alt: 'Retrato de Dra. Andreia Santos R. de Negreiros, Ortodontia',
    },
  },
  {
    slug: 'ortodontia-claudia',
    name: 'Dra. Claudia Maria de Sousa',
    initials: 'CMS',
    role: 'Ortodontia',
    treatments: ['ortodontia', 'alinhadores'],
    cro: 'CRO-SP 150286',
    image: {
      src: '/images/especialistas/claudia-sousa.jpeg',
      alt: 'Retrato de Dra. Claudia Maria de Sousa, Ortodontia',
    },
  },
  {
    slug: 'endodontia',
    name: 'Dra. Gabriela Maria Silva Romano',
    initials: 'GMR',
    role: 'Endodontia',
    treatments: ['endodontia'],
    cro: 'CRO-SP 130622',
    image: {
      src: '/images/especialistas/gabriela-romano.jpeg',
      alt: 'Retrato de Dra. Gabriela Maria Silva Romano, Endodontia',
    },
  },
  {
    slug: 'dentistica',
    name: 'Dra. Ideides Aparecida Souza',
    initials: 'IAS',
    role: 'Dent\u00edstica',
    treatments: [],
    cro: 'CRO-SP 134457',
    image: {
      src: '/images/especialistas/ideides-souza.png',
      alt: 'Retrato de Dra. Ideides Aparecida Souza, Dent\u00edstica',
    },
  },
  {
    slug: 'cirurgia-oral-menor',
    name: 'Dra. Jessica Bulgurlu da Silva Memet',
    initials: 'JBM',
    role: 'Cirurgia Oral Menor',
    treatments: ['cirurgias'],
    cro: 'CRO-SP 152178',
    image: {
      src: '/images/especialistas/jessica-memet.png',
      alt: 'Retrato de Dra. Jessica Bulgurlu da Silva Memet, Cirurgia Oral Menor',
    },
  },
  {
    slug: 'estetica-dental',
    name: 'Dra. Lizeth Teran Verduguez',
    initials: 'LTV',
    role: 'Est\u00e9tica Dental',
    treatments: ['facetas', 'clareamento'],
    cro: 'CRO-SP 100425',
    image: {
      src: '/images/especialistas/lizeth-verduguez.png',
      alt: 'Retrato de Dra. Lizeth Teran Verduguez, Est\u00e9tica Dental',
    },
  },
  {
    slug: 'odontopediatria',
    name: 'Dra. Victoria Carolina da Silva',
    initials: 'VCS',
    role: 'Odontopediatria',
    treatments: ['odontopediatria'],
    cro: 'CRO-SP 162117',
    image: {
      src: '/images/especialistas/victoria-silva.png',
      alt: 'Retrato de Dra. Victoria Carolina da Silva, Odontopediatria',
    },
  },
];

export const ESPECIALISTAS_PAGE = {
  metadata: {
    title: 'Especialistas | Biodonth Odontologia Integrada',
    description:
      'Conhe\u00e7a a equipe da Biodonth \u2014 seis especialistas que trabalham juntos em cada caso. Em Artur Alvim, S\u00e3o Paulo, com consulta sem pressa como ponto de partida.',
  },

  hero: {
    eyebrow: 'Nossa equipe',
    bronze: 'Equipe. N\u00e3o soma',
    bronzeItalic: 'de especialistas.',
    description:
      'Profissionais que trabalham juntos no mesmo plano \u2014 e que voc\u00ea passa a conhecer pelo nome.',
  },

  intro: {
    eyebrow: 'Como atendemos',
    title: 'Voc\u00ea nunca trata com',
    titleItalic: 'um profissional isolado.',
    paragraphs: [
      'Em uma cl\u00ednica integrada, cada caso complexo passa pela equipe inteira antes do plano ser apresentado. O profissional que conduz a sua consulta \u00e9 a face do trabalho de todos \u2014 e isso muda tudo no resultado.',
      'N\u00e3o \u00e9 coincid\u00eancia que os planos da Biodonth tendem a ser mais curtos do que o que voc\u00ea ouve em outras cl\u00ednicas. Quando todas as especialidades pensam o caso juntas, a gente v\u00ea o que est\u00e1 duplicado, o que pode esperar e o que precisa come\u00e7ar primeiro.',
    ],
  },

  philosophy: {
    eyebrow: 'O que nos une',
    bronze: 'N\u00e3o vendemos tratamentos.',
    bronzeItalic: 'Vendemos tempo.',
    paragraphs: [
      'A maior parte dos profissionais que vem trabalhar na Biodonth chega cansada do ritmo. Cansada de atender em 10 minutos. Cansada de n\u00e3o conseguir explicar. Cansada de n\u00e3o conseguir acompanhar o caso inteiro at\u00e9 o fim.',
      'O que oferecemos a quem trabalha aqui \u00e9 o que oferecemos a quem se trata aqui: tempo. Para a equipe, \u00e9 tempo para pensar o caso, conversar com os colegas, fazer bem feito. Para voc\u00ea, \u00e9 tempo para entender, decidir, voltar.',
      '\u00c9 essa moeda \u2014 tempo \u2014 que une todo mundo nesta cl\u00ednica. E \u00e9 o que mais escasseia no resto do mercado.',
    ],
  },

  closing: {
    eyebrow: 'Pr\u00f3ximos passos',
    bronze: 'Conhe\u00e7a a equipe',
    bronzeItalic: 'pessoalmente.',
    description:
      'Sua primeira consulta come\u00e7a com a equipe inteira do seu lado \u2014 e termina com um plano de tratamento na sua m\u00e3o. Sem pressa, sem press\u00e3o, sem fechamento na hora.',
    primaryCtaLabel: 'Agendar consulta',
    secondaryCtaLabel: 'Conhecer os tratamentos',
    secondaryCtaHref: '/tratamentos',
  },

  breadcrumb: {
    home: 'In\u00edcio',
    current: 'Especialistas',
  },

  treatmentDisplayNames: {
    'implantes-dentarios': 'Implantes',
    'ortodontia': 'Ortodontia',
    'alinhadores': 'Alinhadores',
    'facetas': 'Facetas e lentes de contato',
    'clareamento': 'Clareamento',
    'endodontia': 'Endodontia',
    'odontopediatria': 'Odontopediatria',
    'protese': 'Pr\u00f3tese',
    'cirurgias': 'Cirurgias',
    'harmonizacao-orofacial': 'Harmonização facial',
    'checkup': 'Check-up preventivo digital',
    'saude-gengiva': 'Periodontia',
  } as Record<string, string>,
} as const;

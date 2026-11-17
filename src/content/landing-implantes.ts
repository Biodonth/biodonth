// Meta ads landing page copy for /implantes.
// All copy centralized here — do not hardcode strings in the page component.

import { CONTACT } from './contact';

export const IMPLANTES_WA_MESSAGE = encodeURIComponent(
  'Vi o anúncio e gostaria de agendar uma avaliação de implante na Biodonth.'
);

export const IMPLANTES_WA_URL =
  `https://api.whatsapp.com/send?phone=${CONTACT.whatsapp.raw}&text=${IMPLANTES_WA_MESSAGE}`;

export const LANDING = {
  meta: {
    title: 'Implante dentário em Artur Alvim, SP | Biodonth',
    description:
      'Avaliação gratuita de implante dentário com especialista dedicado. Plano escrito na primeira consulta. Biodonth — Artur Alvim, São Paulo.',
  },
  header: {
    phone: CONTACT.phone.display,
    phoneHref: `tel:+${CONTACT.phone.raw}`,
  },
  hero: {
    eyebrow: 'Implante dentário · Artur Alvim, SP',
    bronze: 'Perdeu um dente.',
    bronzeItalic: 'Existe um caminho.',
    description:
      'Implante não é prótese — é raiz nova. Um dente que se comporta como sempre esteve ali: morde, fala, dura décadas.',
    cta: 'Agendar avaliação gratuita',
  },
  trust: [
    'Avaliação gratuita na primeira consulta',
    'Especialista dedicado em implantes',
    'Plano escrito, sem pressão para decidir',
  ],
  problem: {
    eyebrow: 'Você se reconhece aqui?',
    bronze: 'Sinais de que',
    bronzeItalic: 'o implante é o caminho.',
    signals: [
      'Você evita morder com um lado porque há um espaço vazio.',
      'Usa prótese removível há anos e quer algo fixo, definitivo.',
      'Um dente foi extraído e os vizinhos começaram a inclinar.',
      'Você passou a falar diferente depois de perder um dente.',
      'Tem ponte antiga que precisa ser refeita sem desgastar mais.',
    ],
    bridge:
      'Nenhum sinal decide o tratamento sozinho. O que decide é a avaliação, feita sem pressa na primeira consulta.',
  },
  process: {
    eyebrow: 'Como funciona aqui',
    bronze: 'Sem surpresas,',
    bronzeItalic: 'sem pressa.',
    steps: [
      {
        number: '01',
        title: 'Avaliação completa.',
        body: 'Exame clínico, histórico e indicação de exames de imagem. Você sai entendendo seu caso.',
      },
      {
        number: '02',
        title: 'Planejamento integrado.',
        body: 'Implantodontista, periodontista e protesista discutem o caso juntos antes de qualquer proposta.',
      },
      {
        number: '03',
        title: 'Plano na sua mão.',
        body: 'Etapas, prazos, valores e alternativas por escrito. Leva para casa, pensa com calma.',
      },
      {
        number: '04',
        title: 'Acompanhamento de longo prazo.',
        body: 'Consultas semestrais de manutenção. Implantes bem cuidados duram décadas.',
      },
    ],
  },
  specialists: {
    eyebrow: 'Quem cuida do seu caso',
    bronze: 'Especialistas dedicados,',
    bronzeItalic: 'cada um no que é seu.',
    items: [
      {
        name: 'Dr. Nilson da Silva de Oliveira',
        role: 'Especialista em Implantodontia',
        cro: 'CRO-SP 126440',
        image: '/images/especialistas/nilson-oliveira.png',
        alt: 'Retrato de Dr. Nilson da Silva de Oliveira, Implantodontia',
      },
      {
        name: 'Dra. Marcia Maria de Sousa',
        role: 'Diretora Clínica · Responsável Técnica',
        cro: 'CRO-SP 101519',
        image: '/images/especialistas/marcia-sousa.jpeg',
        alt: 'Retrato de Dra. Marcia Maria de Sousa, Diretora Clínica',
      },
    ],
  },
  beforeAfter: {
    eyebrow: 'Resultado real',
    bronze: 'O antes e o depois',
    bronzeItalic: 'de um implante na Biodonth.',
    before: {
      src: '/images/antes-depois/implante-antes.png',
      fallback: '/images/antes-depois/implante-antes.png',
      alt: 'Sorriso antes do implante dentário',
    },
    after: {
      src: '/images/antes-depois/implante-depois.png',
      fallback: '/images/antes-depois/implante-depois.png',
      alt: 'Sorriso após implante dentário na Biodonth',
    },
    objectPosition: 'center 75%',
    disclaimer:
      'Resultado real de paciente atendido na Biodonth. Resultados individuais.',
  },
  faq: {
    eyebrow: 'Dúvidas frequentes',
    bronze: 'O que todo mundo',
    bronzeItalic: 'quer saber antes.',
    items: [
      {
        question: 'Implante dói?',
        answer:
          'A cirurgia é feita sob anestesia local. No pós, desconforto leve a moderado nas primeiras 48h, controlado com analgésicos comuns. A maioria dos pacientes volta às atividades no dia seguinte.',
      },
      {
        question: 'Quanto tempo do início ao fim?',
        answer:
          'Casos simples: 4 a 6 meses. Com necessidade de enxerto ósseo: 9 a 12 meses. A osseointegração — quando o implante se funde ao osso — é a etapa mais longa.',
      },
      {
        question: 'Implante dura para sempre?',
        answer:
          'A literatura mostra taxa de sucesso superior a 95% em 10 anos. Muitos casos passam de 25–30 anos com manutenção adequada.',
      },
      {
        question: 'Posso fazer com pouco osso?',
        answer:
          'Em muitos casos, sim — com enxerto ósseo prévio. A tomografia feita na avaliação mostra exatamente o cenário do seu caso.',
      },
      {
        question: 'Vou ficar sem dente durante o tratamento?',
        answer:
          'Em geral, não. Usamos prótese provisória estética durante o período de osseointegração para que você não fique com espaço vazio.',
      },
    ],
  },
  cta: {
    eyebrow: 'Próximo passo',
    bronze: 'O caminho começa',
    bronzeItalic: 'com uma conversa.',
    description:
      'Na primeira consulta, você sai entendendo o seu caso, com um plano escrito na mão e sem nenhuma pressão para decidir.',
    primary: 'Agendar avaliação gratuita',
    secondary: `Ligar: ${CONTACT.phone.display}`,
  },
  footer: {
    address: 'Rua Desembargador Rocha Portela, 1012 — Artur Alvim, São Paulo — SP',
    hours: 'Seg–Sex 08h–17h · Sáb 09h–14h',
    legal:
      'Publicidade sujeita às normas do Conselho Federal de Odontologia (CFO). Resultados individuais. Nenhuma imagem nesta página representa promessa ou garantia de resultado.',
    cro: 'RT: Dra. Marcia Maria de Sousa — CRO-SP 101519',
  },
} as const;

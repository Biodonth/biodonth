// Meta ads landing page copy for /implantes.
// All copy centralized here — do not hardcode strings in the page component.

import { CONTACT } from './contact';

// WhatsApp URLs are now built dynamically by WhatsAppCta / StickyBar
// using buildWhatsAppUrl() from @/lib/whatsapp — no static URL exported here.

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
    line1: 'Perdeu dentes ou cansou da dentadura?',
    line2: 'Existe um caminho.',
    description:
      'Implante não é prótese solta, é uma raiz nova. Firme para morder, falar e sorrir, com manutenção feita aqui.',
    cta: 'Agendar avaliação gratuita',
    disclaimer:
      'Orçamento só depois da avaliação: cada caso é diferente. Por isso, não passamos valores pelo WhatsApp.',
  },
  trust: [
    'Avaliação gratuita na primeira consulta',
    'Especialista dedicado em implantes',
    'Plano escrito, sem pressão para decidir',
  ],
  responseTime:
    'Seg–Sex 08h–17h · Sáb 09h–14h. Fora do horário, respondemos na próxima abertura.',
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
  process: {
    eyebrow: 'Como funciona aqui',
    bronze: 'Sem surpresas,',
    bronzeItalic: 'sem pressa.',
    steps: [
      {
        number: '01',
        title: 'Avaliação completa.',
        body: 'Exame clínico, histórico e indicação de exames de imagem. Você sai entendendo seu caso.',
        video: null,
      },
      {
        number: '02',
        title: 'Planejamento integrado.',
        body: 'Implantodontista, periodontista e protesista discutem o caso juntos antes de qualquer proposta.',
        video: {
          src: '/videos/v07-planejamento.mp4',
          poster: '/videos/posters/v07-planejamento.jpg',
          alt: 'Vídeo: como funciona o planejamento integrado na Biodonth',
        },
      },
      {
        number: '03',
        title: 'Plano na sua mão.',
        body: 'Etapas, prazos e alternativas por escrito. Leva para casa, pensa com calma.',
        video: {
          src: '/videos/v04-orcamento.mp4',
          poster: '/videos/posters/v04-orcamento.jpg',
          alt: 'Vídeo: como é o plano de tratamento na Biodonth',
        },
      },
      {
        number: '04',
        title: 'Acompanhamento de longo prazo.',
        body: 'Consultas semestrais de manutenção para acompanhar o seu implante de perto.',
        video: null,
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
        question: 'Uso dentadura há anos. Posso fazer implante?',
        answer:
          'Dependendo do seu caso, dá para trocar a dentadura por uma prótese sobre implantes, mais firme no dia a dia. O que define é a avaliação: o osso, a saúde da boca e o tipo de prótese indicado para você.',
        video: null,
      },
      {
        question: 'Implante dói?',
        answer:
          'A cirurgia é feita sob anestesia local. No pós, desconforto leve a moderado nas primeiras 48h, controlado com analgésicos comuns. A maioria dos pacientes volta às atividades no dia seguinte.',
        video: {
          src: '/videos/v01-implante-doi.mp4',
          poster: '/videos/posters/v01-implante-doi.jpg',
          alt: 'Vídeo: implante dói? Especialista da Biodonth responde',
        },
      },
      {
        question: 'Quanto tempo do início ao fim?',
        answer:
          'Casos simples: 4 a 6 meses. Com necessidade de enxerto ósseo: 9 a 12 meses. A osseointegração — quando o implante se funde ao osso — é a etapa mais longa.',
        video: {
          src: '/videos/v05-etapas.mp4',
          poster: '/videos/posters/v05-etapas.jpg',
          alt: 'Vídeo: etapas e tempo do tratamento de implante',
        },
      },
      {
        question: 'Implante dura para sempre?',
        answer:
          'A literatura mostra taxa de sucesso superior a 95% em 10 anos. Muitos casos superam 25–30 anos com manutenção adequada.',
        video: null,
      },
      {
        question: 'Posso fazer com pouco osso?',
        answer:
          'Em muitos casos, sim — com enxerto ósseo prévio. A tomografia feita na avaliação mostra exatamente o cenário do seu caso.',
        video: {
          src: '/videos/v06-pouco-osso.mp4',
          poster: '/videos/posters/v06-pouco-osso.jpg',
          alt: 'Vídeo: é possível fazer implante com pouco osso?',
        },
      },
      {
        question: 'Vou ficar sem dente durante o tratamento?',
        answer:
          'Em geral, não. Usamos prótese provisória estética durante o período de osseointegração para que você não fique com espaço vazio.',
        video: null,
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
    address: 'Rua Desembargador Rocha Portela, 1012 — Artur Alvim, São Paulo — SP',
    hours: 'Seg–Sex 08h–17h · Sáb 09h–14h',
  },
  footer: {
    address: 'Rua Desembargador Rocha Portela, 1012 — Artur Alvim, São Paulo — SP',
    hours: 'Seg–Sex 08h–17h · Sáb 09h–14h',
    legal:
      'Publicidade sujeita às normas do Conselho Federal de Odontologia (CFO). Resultados individuais. Nenhuma imagem nesta página representa promessa ou garantia de resultado.',
    cro: 'RT: Dra. Marcia Maria de Sousa — CRO-SP 101519',
  },
} as const;

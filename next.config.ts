import type { NextConfig } from 'next';

const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: '/tratamento-implante', destination: '/tratamentos/implantes-dentarios' },
  { source: '/tratamento-protese', destination: '/tratamentos/protese' },
  { source: '/tratamento-gengiva', destination: '/tratamentos/saude-gengiva' },
  { source: '/tratamento-facetas', destination: '/tratamentos/facetas' },
  { source: '/tratamento-clareamento', destination: '/tratamentos/clareamento' },
  { source: '/tratamento-odontopediatria', destination: '/tratamentos/odontopediatria' },
  { source: '/tratamento-profilaxia', destination: '/tratamentos/checkup' },
  { source: '/tratamento-ortodontia', destination: '/tratamentos/ortodontia' },
  { source: '/tratamento-reabilitacao', destination: '/tratamentos/implantes-dentarios' },
  { source: '/prevencao-checkup', destination: '/prevencao/checkup-digital' },
  { source: '/prevencao-empresa', destination: '/prevencao/empresa' },
  { source: '/prevencao-atleta', destination: '/prevencao/atleta' },
  { source: '/prevencao-kids', destination: '/prevencao/kids' },
  { source: '/prevencao-idade', destination: '/prevencao/melhor-idade' },
  { source: '/prevencao-gestante', destination: '/prevencao/gestante' },
  { source: '/index.html', destination: '/' },
  // Broken menu links indexed from the old WordPress theme (link label
  // concatenated onto the href) — mapped to their real destination.
  { source: '/In%C3%ADcio', destination: '/' },
  { source: '/blog', destination: '/' },
  { source: '/blogBlog', destination: '/' },
  { source: '/contatoContato', destination: '/contato' },
  { source: '/sobreSobre', destination: '/sobre' },
  { source: '/tratamentosTratamentos', destination: '/tratamentos' },
  { source: '/especialistasEspecialistas', destination: '/especialistas' },
  { source: '/prevencaoPrevenc%C3%A7%C3%A3o', destination: '/prevencao' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({ source, destination, permanent: true }));
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

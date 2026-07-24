import type { NextConfig } from 'next';

const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: '/tratamento-implante', destination: '/tratamentos/implantes-dentarios' },
  { source: '/tratamento-protese', destination: '/tratamentos/protese' },
  { source: '/tratamento-gengiva', destination: '/tratamentos/saude-gengiva' },
  { source: '/tratamento-facetas', destination: '/tratamentos/facetas' },
  { source: '/prevencao-checkup', destination: '/prevencao/checkup-digital' },
  { source: '/prevencao-empresa', destination: '/prevencao/empresa' },
  { source: '/prevencao-atleta', destination: '/prevencao/atleta' },
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

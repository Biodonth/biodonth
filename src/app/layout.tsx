import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import Script from 'next/script';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import './globals.css';

import { SITE_URL } from '@/lib/site';
const SITE_NAME = 'Biodonth';
const SITE_TITLE = 'Biodonth | Odontologia Integrada em Artur Alvim, SP';
const SITE_DESCRIPTION =
  'Dentista em Artur Alvim, São Paulo. Consulta sem pressa, plano na mão, equipe inteira pensando o seu caso. Desde 2015.';

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","z5tg8toqfo");`,
          }}
        />
      </body>
    </html>
  );
}

import { Instrument_Serif, Inter } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
});

export const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
});

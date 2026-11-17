const PHONE = '5511950031000';
const AD_SOURCES = new Set(['meta', 'facebook', 'instagram', 'fb']);

const AD_TEXT =
  'Vi o anúncio e gostaria de agendar uma avaliação de implante na Biodonth.';
const SITE_TEXT =
  'Vi o site e gostaria de agendar uma avaliação de implante na Biodonth.';

export function buildWhatsAppUrl(utmSource?: string | null): string {
  const isAd = AD_SOURCES.has((utmSource ?? '').toLowerCase());
  const text = isAd ? AD_TEXT : SITE_TEXT;
  return `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(text)}`;
}

export const WA_PHONE = PHONE;

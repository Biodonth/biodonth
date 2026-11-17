import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from './whatsapp';

const BASE = 'api.whatsapp.com/send?phone=5511950031000';

describe('buildWhatsAppUrl', () => {
  it('always contains the correct base URL', () => {
    expect(buildWhatsAppUrl()).toContain(BASE);
    expect(buildWhatsAppUrl('meta')).toContain(BASE);
    expect(buildWhatsAppUrl(undefined)).toContain(BASE);
  });

  it('uses anúncio text for all Meta ad sources (case-insensitive)', () => {
    for (const src of ['meta', 'facebook', 'instagram', 'fb', 'META', 'Facebook', 'INSTAGRAM']) {
      const decoded = decodeURIComponent(buildWhatsAppUrl(src));
      expect(decoded, `source="${src}"`).toContain('Vi o anúncio');
      expect(decoded, `source="${src}"`).not.toContain('Vi o site');
    }
  });

  it('uses site text for non-ad sources and absent source', () => {
    for (const src of [undefined, null, '', 'google', 'bing', 'direct', 'email', 'organic']) {
      const decoded = decodeURIComponent(buildWhatsAppUrl(src));
      expect(decoded, `source="${src}"`).toContain('Vi o site');
      expect(decoded, `source="${src}"`).not.toContain('Vi o anúncio');
    }
  });
});

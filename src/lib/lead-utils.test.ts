import { describe, it, expect } from 'vitest';
import {
  maskPhone,
  validatePhone,
  normalizePhone,
  normalizeText,
  isQualified,
  buildFbc,
  buildLeadWaUrl,
  sha256,
} from './lead-utils';

// ─── Phone mask ───────────────────────────────────────────────────────────────

describe('maskPhone', () => {
  it('formats 11 digits as (DD) 9XXXX-XXXX', () => {
    expect(maskPhone('11999998888')).toBe('(11) 99999-8888');
  });
  it('formats partial — 2 digits', () => {
    expect(maskPhone('11')).toBe('(11');
  });
  it('formats partial — 7 digits', () => {
    expect(maskPhone('1199999')).toBe('(11) 99999');
  });
  it('strips non-digits', () => {
    expect(maskPhone('(11) 99999-8888')).toBe('(11) 99999-8888');
  });
  it('truncates at 11 digits', () => {
    expect(maskPhone('119999988881234')).toBe('(11) 99999-8888');
  });
  it('returns empty string for empty input', () => {
    expect(maskPhone('')).toBe('');
  });
});

// ─── Phone validation ─────────────────────────────────────────────────────────

describe('validatePhone', () => {
  it('accepts a valid SP mobile', () => {
    expect(validatePhone('(11) 99999-8888')).toBe(true);
  });
  it('rejects too few digits', () => {
    expect(validatePhone('(11) 9999-888')).toBe(false);
  });
  it('rejects DDD below 11', () => {
    expect(validatePhone('(10) 99999-8888')).toBe(false);
  });
  it('rejects if 3rd digit is not 9', () => {
    expect(validatePhone('(11) 89999-8888')).toBe(false);
  });
  it('rejects empty string', () => {
    expect(validatePhone('')).toBe(false);
  });
});

// ─── Phone normalisation ──────────────────────────────────────────────────────

describe('normalizePhone', () => {
  it('prepends 55 to 11-digit number', () => {
    expect(normalizePhone('(11) 99999-8888')).toBe('5511999998888');
  });
  it('does not double the country code', () => {
    expect(normalizePhone('5511999998888')).toBe('5511999998888');
  });
});

// ─── Text normalisation ───────────────────────────────────────────────────────

describe('normalizeText', () => {
  it('lowercases and removes accents', () => {
    expect(normalizeText('Élisson')).toBe('elisson');
  });
  it('trims whitespace', () => {
    expect(normalizeText('  Ana  ')).toBe('ana');
  });
  it('handles ç', () => {
    expect(normalizeText('Conceição')).toBe('conceicao');
  });
});

// ─── sha256 ───────────────────────────────────────────────────────────────────

describe('sha256', () => {
  it('produces a 64-char hex string', () => {
    expect(sha256('test')).toMatch(/^[0-9a-f]{64}$/);
  });
  it('is deterministic', () => {
    expect(sha256('hello')).toBe(sha256('hello'));
  });
  it('differs for different inputs', () => {
    expect(sha256('a')).not.toBe(sha256('b'));
  });
});

// ─── Qualification ────────────────────────────────────────────────────────────

describe('isQualified', () => {
  it('returns true for "Quero começar agora"', () => {
    expect(isQualified('Quero começar agora')).toBe(true);
  });
  it('returns true for "Nos próximos 30 dias"', () => {
    expect(isQualified('Nos próximos 30 dias')).toBe(true);
  });
  it('returns false for "Só estou pesquisando preços"', () => {
    expect(isQualified('Só estou pesquisando preços')).toBe(false);
  });
});

// ─── _fbc construction ────────────────────────────────────────────────────────

describe('buildFbc', () => {
  it('follows the fb.1.{ts}.{fbclid} pattern', () => {
    const fbc = buildFbc('abc123');
    expect(fbc).toMatch(/^fb\.1\.\d+\.abc123$/);
  });
});

// ─── WhatsApp URL ─────────────────────────────────────────────────────────────

describe('buildLeadWaUrl', () => {
  it('uses wa.me base', () => {
    const url = buildLeadWaUrl('5511950031000', 'Ana', 'Falta 1 dente', 'Quero começar agora');
    expect(url).toContain('wa.me/5511950031000');
  });

  it('encodes accented characters', () => {
    const url = buildLeadWaUrl('5511950031000', 'João', 'Faltam vários dentes', 'Quero começar agora');
    expect(url).toContain(encodeURIComponent('João'));
  });

  it('encodes spaces in prazo', () => {
    const url = buildLeadWaUrl('5511950031000', 'Ana', 'Falta 1 dente', 'Nos próximos 30 dias');
    expect(decodeURIComponent(url)).toContain('Nos próximos 30 dias');
  });

  it('contains all three submitted values', () => {
    const decoded = decodeURIComponent(
      buildLeadWaUrl('5511950031000', 'Maria', 'Uso dentadura e quero dentes fixos', 'Quero começar agora'),
    );
    expect(decoded).toContain('Maria');
    expect(decoded).toContain('Uso dentadura e quero dentes fixos');
    expect(decoded).toContain('Quero começar agora');
  });
});

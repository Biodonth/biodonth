/**
 * Lead form utilities — pure functions, safe in both browser and Node.js.
 * sha256() is the only Node-only export; it must not be imported in client bundles.
 */

// ─── Phone ────────────────────────────────────────────────────────────────────

/** Format raw digit string as `(DD) 9XXXX-XXXX` as the user types. */
export function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Returns true for a fully-typed Brazilian mobile: 11 digits, DDD ≥ 11, 3rd digit = 9. */
export function validatePhone(formatted: string): boolean {
  const d = formatted.replace(/\D/g, '');
  if (d.length !== 11) return false;
  if (parseInt(d.slice(0, 2), 10) < 11) return false;
  if (d[2] !== '9') return false;
  return true;
}

/** Strip formatting and prepend Brazil country code 55. */
export function normalizePhone(formatted: string): string {
  const d = formatted.replace(/\D/g, '');
  if (d.length === 13 && d.startsWith('55')) return d;
  return '55' + d;
}

// ─── Text ─────────────────────────────────────────────────────────────────────

/** Remove diacritics, lowercase, trim — for CAPI fn hashing. */
export function normalizeText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// ─── sha256 (Node.js only — do NOT import in client components) ───────────────

/** SHA-256 hex digest. Node.js `crypto` module required. */
export function sha256(value: string): string {
  // Dynamic require keeps the import out of the browser bundle via tree-shaking.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHash } = require('crypto') as typeof import('crypto');
  return createHash('sha256').update(value).digest('hex');
}

// ─── Qualification ────────────────────────────────────────────────────────────

/** Returns false only for "just browsing" leads. */
export function isQualified(prazo: string): boolean {
  return prazo !== 'Só estou pesquisando preços';
}

// ─── Facebook click ID cookie ─────────────────────────────────────────────────

/** Build the `_fbc` cookie value from a `fbclid` query param. */
export function buildFbc(fbclid: string): string {
  return `fb.1.${Date.now()}.${fbclid}`;
}

// ─── WhatsApp URL ─────────────────────────────────────────────────────────────

/** Build the wa.me URL with the pre-filled lead message. */
export function buildLeadWaUrl(
  clinicPhone: string,
  nome: string,
  caso: string,
  prazo: string,
): string {
  const text = `Olá! Acabei de preencher o formulário no site. Meu nome é ${nome}. Meu caso: ${caso}. Quero começar: ${prazo}.`;
  return `https://wa.me/${clinicPhone}?text=${encodeURIComponent(text)}`;
}

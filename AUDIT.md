# Audit — Implant Lead Funnel pre-build

Performed: 2026-11-18

## 1. Auto-redirect / auto-WhatsApp on page load

Searched all `.ts` and `.tsx` files in `src/`, plus `vercel.json` and `middleware.ts`.

| Pattern | Found | File | Action |
|---|---|---|---|
| `wa.me` | No | — | None |
| `api.whatsapp.com` | Yes | `src/lib/whatsapp.ts`, `src/content/contact.ts`, `src/components/ui/ContatoForm.tsx` | All require a user tap — no auto-fire |
| `window.open` on load | No | `ContatoForm.tsx` calls it inside `handleSubmit` only | None |
| `location.href` on load | No | — | None |
| `useEffect` with navigation | No | `WhatsAppCta.tsx` and `StickyBar.tsx` update state/IntersectionObserver only | None |
| Floating chat widget | No | — | None |
| Redirect in `vercel.json` | No | Only `{"framework":"nextjs"}` | None |
| Middleware | No | No `middleware.ts` exists | None |
| Popup / modal on load | No | — | None |

**Conclusion**: nothing triggers navigation or opens WhatsApp without a user tap. The Clarity "page hidden ~30 s" pattern is most likely the Instagram in-app browser backgrounding the tab when the user swipes away (normal browser behaviour), not code on the page. No changes required.

## 2. Before-and-after images

`src/app/(landing)/implantes/page.tsx` renders `<BeforeAfter>` with:
- `public/images/antes-depois/implante-antes.png`
- `public/images/antes-depois/implante-depois.png`

**Risk**: CFO Resolution 2.336/2023 and Meta ad policies restrict before/after images in advertising contexts. Images are not removed here — written patient consent is required (see `NEEDS_FROM_KOMANDO.md`).

## 3. Changes made

None. No auto-redirect or auto-WhatsApp-on-load code was found.

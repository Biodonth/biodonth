# TESTING — Lead Funnel (/captacao)

## Preview URL

[Set by Vercel after first deploy — see NEEDS_FROM_KOMANDO.md]

---

## How to verify on your phone (inside Instagram's in-app browser)

1. **Open the Preview URL inside Instagram**.
   - Go to any Instagram post or story, tap a link, or paste the Preview URL in a DM and open it from there. This simulates the exact browser environment your Meta ads use.

2. **Submit a test lead**.
   - Fill in a real name and your own WhatsApp number.
   - Choose any `caso` and `prazo` options.
   - Tap **Quero minha avaliação**.

3. **Check (1) — Google Sheet row**.
   - Open the Google Sheet linked to the Apps Script web app.
   - Confirm a new row appeared in the **Leads** tab with your name, masked phone, caso, prazo, qualificado (SIM/NÃO), event_id, UTMs, and page_url.
   - The `status` column should be blank (filled by reception).

4. **Check (2) — Meta Events Manager**.
   - Go to [Meta Events Manager](https://business.facebook.com/events_manager/) → your pixel → **Test Events**.
   - You should see a **Lead** event from **Browser** (Pixel) and a matching **Lead** event from **Server** (CAPI), both showing the same `event_id` → Meta deduplicates them automatically.
   - If you chose a qualified prazo, you should also see **QualifiedLead** (Browser + Server).

5. **Check (3) — WhatsApp opens with pre-filled text**.
   - After submitting, the page shows "Recebemos suas respostas!" and an **Abrir WhatsApp** button.
   - Tap it. WhatsApp should open with the message:
     > Olá! Acabei de preencher o formulário no site. Meu nome é [nome]. Meu caso: [caso]. Quero começar: [prazo].
   - If the button doesn't fire, the auto-redirect (600 ms) should have already opened WhatsApp. Both paths should work.

6. **Check (4) — Clarity session does NOT go hidden before you tap**.
   - Open [Microsoft Clarity](https://clarity.microsoft.com/) → your project → **Recordings**.
   - Find the session for your test. Confirm the session timeline shows the page **active** while you fill the form, without an early "page hidden" event before any interaction.

---

## Automated tests

```bash
# Unit + API integration (38 tests)
npm test

# E2E (requires production build running on port 3000)
npm run build && npm start &
npx playwright test tests/e2e/funil.spec.ts --project=mobile
```

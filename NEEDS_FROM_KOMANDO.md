# NEEDS FROM KOMANDO

Items the developer could not resolve automatically.
Check each box and update the codebase when you have the data.

---

## Blocker: Reviews section

- [ ] **3 real Google reviews** — copy the text exactly from the Google profile.
  For each review provide: first name + initial (e.g. "Maria S."), star count (1–5),
  review text, and approximate date (e.g. "novembro 2026").
  Also provide: average star rating, total review count, and the Google profile URL.
  → Update `src/content/reviews.json` with real data, then set `"enabled": true`.
  **Never invent reviews.** The file ships with placeholder strings starting with `[REVISAR]`.

---

## Blocker: Before-and-after consent

- [ ] **Written consent from the before-and-after patient** (the implant case currently
  shown in `public/images/antes-depois/implante-antes.png` / `implante-depois.png`).
  CFO Resolution 2.336/2023 requires documented patient consent for case images used
  in advertising. Until consent is confirmed, the section can be removed by setting
  `beforeAfter.enabled = false` in `src/content/landing-implantes.ts`
  (a flag to do so has been left as a comment in that file — add it if needed).

---

## Caption files (VTT) for videos

- [ ] `public/videos/v01-implante-doi.vtt` — captions for "Implante dói?"
- [ ] `public/videos/v04-orcamento.vtt` — captions for "Plano na sua mão"
- [ ] `public/videos/v05-etapas.vtt` — captions for "Quanto tempo do início ao fim?"
- [ ] `public/videos/v06-pouco-osso.vtt` — captions for "Posso fazer com pouco osso?"
- [ ] `public/videos/v07-planejamento.vtt` — captions for "Planejamento integrado"

Options: (a) provide transcript text so captions can be auto-generated,
(b) approve use of an AI transcription tool (e.g. Whisper) run locally,
(c) skip captions (accessibility will be noted as a gap in the QA report).

Once VTT files exist, add the `vtt` prop to the relevant entries in
`src/content/landing-implantes.ts`.

---

## After deploy: WhatsApp link text verification

- [ ] After the first production deploy, open `/implantes?utm_source=meta` on a real
  device, tap a WhatsApp CTA, and confirm the pre-filled message reads
  **"Vi o anúncio e gostaria de agendar uma avaliação de implante na Biodonth."**
  (not "Vi o site …").

- [ ] Also verify that the GTM tag **`BD – Source tag on WhatsApp`** (if active) does
  not append a second source code to the same link, producing a double-encoded URL.
  If it does, disable one of the two mechanisms (GTM tag or the client-side
  `buildWhatsAppUrl()` logic in `src/lib/whatsapp.ts`).

---

## Videos (already encoded — but verify)

The 5 source MOV files from `C:\Users\Dell\Downloads\Biodonth Trafego\Videos\TRAFEGO OUTUBRO_\`
were encoded during the build. Confirm the output files look correct:

- [ ] `public/videos/v01-implante-doi.mp4` ≤ 4 MB, plays without audio issues
- [ ] `public/videos/v04-orcamento.mp4` ≤ 4 MB
- [ ] `public/videos/v05-etapas.mp4` ≤ 4 MB
- [ ] `public/videos/v06-pouco-osso.mp4` ≤ 4 MB
- [ ] `public/videos/v07-planejamento.mp4` ≤ 4 MB

If a file is > 4 MB, re-run with a higher CRF:
  `ffmpeg -y -i INPUT.MOV -crf 32 -preset veryfast … OUTPUT.mp4`

---

## Other

- [ ] Confirm the clinic's Google Business Profile URL for the reviews block
  (once real reviews are provided).
- [ ] Confirm that all specialist photos on the landing page show the right people
  (`/images/especialistas/nilson-oliveira.png` and `marcia-sousa.jpeg`).

---

## Lead Funnel (/captacao) — env vars to set on Vercel

Set these on Vercel → Project → Settings → Environment Variables → **Preview** (and Production when ready).
See `.env.example` for the full list with descriptions.

- [ ] `META_PIXEL_ID` — your Meta Pixel ID (numbers only)
- [ ] `META_CAPI_TOKEN` — Conversions API access token (keep secret — server only)
- [ ] `META_TEST_EVENT_CODE` — from Meta Events Manager → Test Events (remove after testing)
- [ ] `GRAPH_API_VERSION` — default `v21.0`; check https://developers.facebook.com/docs/graph-api/changelog
- [ ] `SHEETS_WEBHOOK_URL` — Apps Script web app URL (see Apps Script deploy steps below)
- [ ] `SHEETS_WEBHOOK_SECRET` — a strong random string; set the same value as Script Property `SECRET`
- [ ] `CLINIC_WHATSAPP` — `5511950031000` (already the default; update if number changes)
- [ ] `TELEGRAM_BOT_TOKEN` — optional; leave blank to disable Telegram alerts
- [ ] `TELEGRAM_CHAT_ID` — optional; leave blank to disable Telegram alerts

---

## Lead Funnel — Apps Script deploy (≈5 min, phone or desktop)

1. Create a new Google Sheet (or open the existing leads sheet).
2. In the Sheet: **Extensions → Apps Script**.
3. Delete the default `Code.gs` content and paste the contents of `apps-script/Code.gs` from this repo.
4. **Project Settings (gear icon) → Script Properties → Add property**:
   - `SECRET` = the same random string you will set as `SHEETS_WEBHOOK_SECRET` on Vercel
   - `SPREADSHEET_ID` = the ID from the Sheet URL (the long string between `/d/` and `/edit`)
5. **Deploy → New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** → copy the web app URL
6. Set `SHEETS_WEBHOOK_URL` on Vercel to that URL.

---

## Lead Funnel — Responsável Técnico in footer

- [ ] Update `src/app/(landing)/captacao/page.tsx` footer with the real RT name and CRO number.
  Current placeholder: `[REVISAR — inserir nome e CRO do RT]`

---

## Lead Funnel — Privacy Policy link

- [ ] The LGPD consent text in the form links to `/politica-de-privacidade`.
  Confirm that page exists and is up to date.

---

## Lead Funnel — Promote to production

- [ ] After all env vars are set and the test lead verified (see `TESTING.md`):
  go to Vercel → Deployments → find the Preview deployment for this branch → **Promote to Production**.
- [ ] Remove `META_TEST_EVENT_CODE` from Vercel env vars after testing is complete.

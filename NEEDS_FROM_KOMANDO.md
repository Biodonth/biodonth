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

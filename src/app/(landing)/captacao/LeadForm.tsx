'use client';

import { useState, useEffect, useId } from 'react';
import { cn } from '@/lib/cn';
import {
  maskPhone,
  validatePhone,
  isQualified,
  buildFbc,
  buildLeadWaUrl,
} from '@/lib/lead-utils';

// ─── Config ───────────────────────────────────────────────────────────────────

const CLINIC_WHATSAPP = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP ?? '5511950031000';
const UTM_KEY = 'bio_utm';

const CASO_OPTIONS = [
  'Falta 1 dente',
  'Faltam vários dentes',
  'Uso dentadura e quero dentes fixos',
] as const;

const PRAZO_OPTIONS = [
  'Quero começar agora',
  'Nos próximos 30 dias',
  'Só estou pesquisando preços',
] as const;

// ─── Cookie helpers ───────────────────────────────────────────────────────────

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(?:^|;) *' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : '';
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// ─── UTM capture ──────────────────────────────────────────────────────────────

function captureUtms(params: URLSearchParams) {
  if (sessionStorage.getItem(UTM_KEY)) return; // first touch wins
  const data = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
  };
  if (Object.values(data).some(Boolean)) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(data));
  }
}

function readUtms() {
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// ─── Single-choice radio group ────────────────────────────────────────────────

function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div role="radiogroup" aria-label={name}>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-3.5 border cursor-pointer transition-colors duration-200',
              value === option
                ? 'border-bronze bg-bronze/5 text-charcoal'
                : 'border-marmorino-light/70 text-charcoal hover:border-bronze/50',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span
              className={cn(
                'w-4 h-4 rounded-full border-2 shrink-0 transition-colors duration-200',
                value === option ? 'border-bronze bg-bronze' : 'border-marmorino-light',
              )}
              aria-hidden="true"
            />
            <span className="font-body text-[15px] leading-snug">{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 font-body text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

type FormState = {
  nome: string;
  whatsapp: string;
  caso: string;
  prazo: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.nome.trim().length < 2) errors.nome = 'Informe seu nome.';
  if (!validatePhone(form.whatsapp)) errors.whatsapp = 'Número inválido. Use (DD) 9XXXX-XXXX.';
  if (!form.caso) errors.caso = 'Selecione uma opção.';
  if (!form.prazo) errors.prazo = 'Selecione uma opção.';
  return errors;
}

export function LeadForm() {
  const nomeId = useId();
  const whatsappId = useId();

  const [form, setForm] = useState<FormState>({ nome: '', whatsapp: '', caso: '', prazo: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  // ── On mount: fbc cookie + UTM capture ──────────────────────────────────────
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fbclid = params.get('fbclid');
      if (fbclid && !getCookie('_fbc')) {
        setCookie('_fbc', buildFbc(fbclid), 90);
      }
      captureUtms(params);
    } catch {
      // sessionStorage / cookies may be unavailable in strict private browsing
    }
  }, []);

  function handlePhone(raw: string) {
    setForm((f) => ({ ...f, whatsapp: maskPhone(raw) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // 1. Build payload
    const eventId = crypto.randomUUID();
    const qualified = isQualified(form.prazo);
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const fbclid = new URLSearchParams(window.location.search).get('fbclid') ?? undefined;

    const payload = {
      nome: form.nome.trim(),
      whatsapp: form.whatsapp,
      caso: form.caso,
      prazo: form.prazo,
      qualified,
      event_id: eventId,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      utms: readUtms(),
      page_url: window.location.href,
      fbclid,
    };

    // 2. Send to /api/lead (sendBeacon with fetch fallback)
    const body = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    const beaconSent = typeof navigator !== 'undefined' && navigator.sendBeacon('/api/lead', body);
    if (!beaconSent) {
      fetch('/api/lead', { method: 'POST', body, keepalive: true }).catch(() => {});
    }

    // 3. Fire Meta Pixel events
    const winFbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof winFbq === 'function') {
      const fbq = winFbq;
      fbq('track', 'Lead', { content_name: 'implante' }, { eventID: eventId });
      if (qualified) {
        fbq('trackCustom', 'QualifiedLead', { caso: form.caso, prazo: form.prazo }, { eventID: eventId + '-q' });
      }
    }

    // 4. Build WA URL and show thank-you state
    const url = buildLeadWaUrl(CLINIC_WHATSAPP, payload.nome, form.caso, form.prazo);
    setWaUrl(url);
    setSubmitted(true);
    setSubmitting(false);

    // 5. Fallback auto-redirect after 600 ms (button remains functional if blocked)
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  }

  // ── Thank-you state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <h2 className="font-display text-[clamp(28px,4vw,40px)] text-charcoal leading-[1.1] mb-4">
          Recebemos suas respostas!
        </h2>
        <p className="font-body text-[16px] text-marmorino leading-relaxed mb-8 max-w-sm mx-auto">
          Clique abaixo para continuar pelo WhatsApp e falar com um especialista.
        </p>
        <a
          href={waUrl}
          className="inline-flex items-center justify-center gap-2 bg-bronze text-concrete font-body font-medium text-[16px] tracking-[0.03em] px-8 py-4 w-full max-w-xs transition-colors duration-300 hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
        >
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">

      {/* Nome */}
      <div>
        <label htmlFor={nomeId} className="block font-body text-[13px] font-medium text-charcoal tracking-[0.04em] uppercase mb-2">
          Seu nome
        </label>
        <input
          id={nomeId}
          type="text"
          autoComplete="given-name"
          value={form.nome}
          onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
          placeholder="Como posso te chamar?"
          className={cn(
            'w-full font-body text-[16px] text-charcoal bg-pure border px-4 py-3.5 outline-none transition-colors duration-200 placeholder:text-marmorino/50',
            errors.nome ? 'border-red-400 focus:border-red-500' : 'border-marmorino-light/70 focus:border-bronze',
          )}
          aria-describedby={errors.nome ? `${nomeId}-err` : undefined}
        />
        {errors.nome && (
          <p id={`${nomeId}-err`} role="alert" className="mt-1.5 font-body text-[13px] text-red-600">
            {errors.nome}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor={whatsappId} className="block font-body text-[13px] font-medium text-charcoal tracking-[0.04em] uppercase mb-2">
          Seu WhatsApp
        </label>
        <input
          id={whatsappId}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={form.whatsapp}
          onChange={(e) => handlePhone(e.target.value)}
          placeholder="(11) 99999-8888"
          className={cn(
            'w-full font-body text-[16px] text-charcoal bg-pure border px-4 py-3.5 outline-none transition-colors duration-200 placeholder:text-marmorino/50',
            errors.whatsapp ? 'border-red-400 focus:border-red-500' : 'border-marmorino-light/70 focus:border-bronze',
          )}
          aria-describedby={errors.whatsapp ? `${whatsappId}-err` : undefined}
        />
        {errors.whatsapp && (
          <p id={`${whatsappId}-err`} role="alert" className="mt-1.5 font-body text-[13px] text-red-600">
            {errors.whatsapp}
          </p>
        )}
      </div>

      {/* Caso */}
      <div>
        <p className="font-body text-[13px] font-medium text-charcoal tracking-[0.04em] uppercase mb-2">
          Qual é o seu caso?
        </p>
        <RadioGroup
          name="caso"
          options={CASO_OPTIONS}
          value={form.caso}
          onChange={(v) => setForm((f) => ({ ...f, caso: v }))}
          error={errors.caso}
        />
      </div>

      {/* Prazo */}
      <div>
        <p className="font-body text-[13px] font-medium text-charcoal tracking-[0.04em] uppercase mb-2">
          Quando pensa em resolver isso?
        </p>
        <RadioGroup
          name="prazo"
          options={PRAZO_OPTIONS}
          value={form.prazo}
          onChange={(v) => setForm((f) => ({ ...f, prazo: v }))}
          error={errors.prazo}
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-bronze text-concrete font-body font-medium text-[16px] tracking-[0.03em] px-6 py-4 transition-colors duration-300 hover:bg-bronze-dark disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
        >
          {submitting ? 'Enviando…' : 'Quero minha avaliação'}
        </button>
        <p className="mt-3 font-body text-[12px] text-marmorino/70 leading-relaxed text-center">
          Ao enviar, você concorda em ser contatado pela clínica via WhatsApp e com nossa{' '}
          <a href="/politica-de-privacidade" className="underline hover:text-bronze transition-colors">
            Política de Privacidade
          </a>
          .
        </p>
      </div>

    </form>
  );
}

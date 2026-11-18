import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { normalizePhone, normalizeText } from '@/lib/lead-utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadPayload = {
  nome: string;
  whatsapp: string;
  caso: string;
  prazo: string;
  qualified: boolean;
  event_id: string;
  fbp?: string;
  fbc?: string;
  utms?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
  page_url?: string;
  fbclid?: string;
};

// ─── Validation ───────────────────────────────────────────────────────────────

const CASO_OPTIONS = ['Falta 1 dente', 'Faltam vários dentes', 'Uso dentadura e quero dentes fixos'];
const PRAZO_OPTIONS = ['Quero começar agora', 'Nos próximos 30 dias', 'Só estou pesquisando preços'];

function isValidPayload(body: unknown): body is LeadPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  if (typeof b.nome !== 'string' || b.nome.trim().length < 2) return false;
  if (typeof b.whatsapp !== 'string' || b.whatsapp.replace(/\D/g, '').length < 10) return false;
  if (typeof b.caso !== 'string' || !CASO_OPTIONS.includes(b.caso)) return false;
  if (typeof b.prazo !== 'string' || !PRAZO_OPTIONS.includes(b.prazo)) return false;
  if (typeof b.event_id !== 'string' || b.event_id.length < 8) return false;
  return true;
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

// ─── Downstream senders (env vars read at call time, not module load time) ────

async function sendToSheets(payload: LeadPayload, normalizedPhone: string): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET ?? '';
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        nome: payload.nome,
        whatsapp: normalizedPhone,
        caso: payload.caso,
        prazo: payload.prazo,
        qualified: payload.qualified,
        event_id: payload.event_id,
        utms: payload.utms ?? {},
        fbclid: payload.fbclid ?? '',
        page_url: payload.page_url ?? '',
      }),
    });
  } catch (err) {
    console.error('[lead/sheets]', err);
  }
}

async function sendToCapi(
  payload: LeadPayload,
  userData: Record<string, string>,
  eventTime: number,
): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  const version = process.env.GRAPH_API_VERSION ?? 'v21.0';
  const testCode = process.env.META_TEST_EVENT_CODE;
  if (!pixelId || !token) return;

  const baseEvent = {
    action_source: 'website',
    event_time: eventTime,
    event_source_url: payload.page_url ?? '',
    user_data: userData,
    custom_data: { caso: payload.caso, prazo: payload.prazo },
  };

  const events = [
    { event_name: 'Lead', event_id: payload.event_id, ...baseEvent },
    ...(payload.qualified
      ? [{ event_name: 'QualifiedLead', event_id: payload.event_id + '-q', ...baseEvent }]
      : []),
  ];

  const capiBody: Record<string, unknown> = { data: events };
  if (testCode) capiBody.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiBody),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[lead/capi] non-200', res.status, text);
    }
  } catch (err) {
    console.error('[lead/capi]', err);
  }
}

async function sendTelegram(payload: LeadPayload, normalizedPhone: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const label = payload.qualified ? 'QUALIFICADO' : 'pesquisando';
  const text =
    `🦷 Novo lead ${label}: ${payload.nome} – ${normalizedPhone} – ${payload.caso} – ${payload.prazo}\n` +
    `https://wa.me/${normalizedPhone}`;
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (err) {
    console.error('[lead/telegram]', err);
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    const text = await request.text();
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ ok: false, error: 'invalid payload' }, { status: 400 });
  }

  const payload = body;
  const normalizedPhone = normalizePhone(payload.whatsapp);
  const firstName = payload.nome.trim().split(/\s+/)[0];
  const eventTime = Math.floor(Date.now() / 1000);
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  const userAgent = request.headers.get('user-agent') ?? '';

  const userData: Record<string, string> = {
    ph: sha256(normalizedPhone),
    fn: sha256(normalizeText(firstName)),
  };
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (payload.fbp) userData.fbp = payload.fbp;
  if (payload.fbc) userData.fbc = payload.fbc;

  await Promise.allSettled([
    sendToSheets(payload, normalizedPhone),
    sendToCapi(payload, userData, eventTime),
    sendTelegram(payload, normalizedPhone),
  ]);

  return NextResponse.json({ ok: true });
}

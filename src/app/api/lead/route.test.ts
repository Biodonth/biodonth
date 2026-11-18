import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

// ─── Shared valid payload ─────────────────────────────────────────────────────

const validPayload = {
  nome: 'Ana Silva',
  whatsapp: '(11) 99999-8888',
  caso: 'Falta 1 dente',
  prazo: 'Quero começar agora',
  qualified: true,
  event_id: 'evt-test-uuid-1234',
  fbp: '_fbp_test',
  fbc: '_fbc_test',
  utms: { utm_source: 'meta', utm_medium: 'paid' },
  page_url: 'https://www.biodonth.com.br/captacao?utm_source=meta',
  fbclid: 'fbclid_test',
};

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// ─── Env setup ────────────────────────────────────────────────────────────────

beforeEach(() => {
  process.env.META_PIXEL_ID = 'TEST_PIXEL';
  process.env.META_CAPI_TOKEN = 'TEST_TOKEN';
  process.env.SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec';
  process.env.SHEETS_WEBHOOK_SECRET = 'test_secret';
  process.env.GRAPH_API_VERSION = 'v21.0';
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.META_PIXEL_ID;
  delete process.env.META_CAPI_TOKEN;
  delete process.env.SHEETS_WEBHOOK_URL;
  delete process.env.SHEETS_WEBHOOK_SECRET;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('POST /api/lead', () => {
  it('valid payload → 200 { ok: true }', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal('fetch', mockFetch);

    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    // Sheets + CAPI (Lead + QualifiedLead in one call) = 2 fetch calls
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('calls CAPI with correct event structure', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal('fetch', mockFetch);

    await POST(makeRequest(validPayload));

    const capiCall = mockFetch.mock.calls.find(([url]) =>
      String(url).includes('graph.facebook.com'),
    );
    expect(capiCall).toBeDefined();
    const body = JSON.parse(capiCall![1].body as string);
    expect(body.data).toHaveLength(2); // Lead + QualifiedLead
    expect(body.data[0].event_name).toBe('Lead');
    expect(body.data[1].event_name).toBe('QualifiedLead');
    expect(body.data[1].event_id).toBe(validPayload.event_id + '-q');
    // user_data must have hashed phone, no raw PII
    expect(body.data[0].user_data.ph).toMatch(/^[0-9a-f]{64}$/);
    expect(body.data[0].user_data.ph).not.toContain('99999');
  });

  it('Sheets failing → CAPI still fires, 200 returned', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes('script.google.com')) {
        return Promise.reject(new Error('timeout'));
      }
      return Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(200);
    const capiCall = mockFetch.mock.calls.find(([url]) =>
      String(url).includes('graph.facebook.com'),
    );
    expect(capiCall).toBeDefined();
  });

  it('Telegram alert is sent when tokens are set', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'tg_bot_token';
    process.env.TELEGRAM_CHAT_ID = '-100123456';

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal('fetch', mockFetch);

    await POST(makeRequest(validPayload));

    const tgCall = mockFetch.mock.calls.find(([url]) =>
      String(url).includes('api.telegram.org'),
    );
    expect(tgCall).toBeDefined();
    const tgBody = JSON.parse(tgCall![1].body as string);
    expect(tgBody.text).toContain('Ana Silva');
    expect(tgBody.text).toContain('QUALIFICADO');
  });

  it('invalid payload → 400', async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);

    const res = await POST(makeRequest({ nome: '', whatsapp: 'bad', caso: 'invalid', prazo: 'x' }));

    expect(res.status).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('malformed JSON → 400', async () => {
    const req = new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'not json at all',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('no QualifiedLead event for unqualified lead', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal('fetch', mockFetch);

    await POST(makeRequest({ ...validPayload, prazo: 'Só estou pesquisando preços', qualified: false }));

    const capiCall = mockFetch.mock.calls.find(([url]) =>
      String(url).includes('graph.facebook.com'),
    );
    const body = JSON.parse(capiCall![1].body as string);
    expect(body.data).toHaveLength(1);
    expect(body.data[0].event_name).toBe('Lead');
  });

  it('includes test_event_code when META_TEST_EVENT_CODE is set', async () => {
    process.env.META_TEST_EVENT_CODE = 'TEST1234';
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal('fetch', mockFetch);

    await POST(makeRequest(validPayload));

    const capiCall = mockFetch.mock.calls.find(([url]) =>
      String(url).includes('graph.facebook.com'),
    );
    const body = JSON.parse(capiCall![1].body as string);
    expect(body.test_event_code).toBe('TEST1234');
    delete process.env.META_TEST_EVENT_CODE;
  });
});

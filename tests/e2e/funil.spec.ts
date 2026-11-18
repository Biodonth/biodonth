import { test, expect, Page } from '@playwright/test';

const PATH = '/captacao';
const WA_PHONE = '5511950031000';

type WinExt = Window & {
  fbq: (...args: unknown[]) => void;
  _fbqCalls: unknown[][];
  _beaconData: { url: string; data: string }[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function stubPixelAndBeacon(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as WinExt & { setTimeout: typeof window.setTimeout };

    // Stub fbq
    w._fbqCalls = [];
    w.fbq = function (...args: unknown[]) {
      w._fbqCalls.push(args);
    };

    // Stub sendBeacon
    w._beaconData = [];
    navigator.sendBeacon = function (url, data) {
      w._beaconData.push({ url: String(url), data: data instanceof Blob ? '' : String(data ?? '') });
      return true;
    };

    // Suppress the 600 ms fallback redirect so the test doesn't navigate away
    const origSetTimeout = window.setTimeout.bind(window);
    (window as unknown as { setTimeout: (fn: TimerHandler, delay?: number) => number }).setTimeout =
      function (fn: TimerHandler, delay?: number) {
        if (delay === 600) return 0;
        return origSetTimeout(fn, delay) as unknown as number;
      };
  });
}

async function fillAndSubmit(page: Page, qualified = true) {
  await page.getByLabel(/Seu nome/i).fill('Ana Teste');
  await page.getByLabel(/Seu WhatsApp/i).fill('11999998888');
  await page.getByLabel('Falta 1 dente').check();
  const prazo = qualified ? 'Quero começar agora' : 'Só estou pesquisando preços';
  await page.getByLabel(prazo).check();
  await page.getByRole('button', { name: /Quero minha avaliação/i }).click();
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('Page load — no auto-navigation', () => {
  test('no navigation to WhatsApp or wa.me on load', async ({ page }) => {
    const waNavigations: string[] = [];
    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        const u = frame.url();
        if (u.includes('wa.me') || u.includes('whatsapp')) waNavigations.push(u);
      }
    });

    const waRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('wa.me') || req.url().includes('whatsapp')) {
        waRequests.push(req.url());
      }
    });

    await page.goto(PATH);
    await page.waitForLoadState('networkidle');

    expect(waNavigations).toHaveLength(0);
    expect(waRequests).toHaveLength(0);
  });
});

test.describe('Form validation', () => {
  test('shows errors for empty submit', async ({ page }) => {
    await page.goto(PATH);
    await page.getByRole('button', { name: /Quero minha avaliação/i }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
  });

  test('phone mask formats correctly', async ({ page }) => {
    await page.goto(PATH);
    await page.getByLabel(/Seu WhatsApp/i).fill('11999998888');
    await expect(page.getByLabel(/Seu WhatsApp/i)).toHaveValue('(11) 99999-8888');
  });
});

test.describe('Form submission — qualified lead', () => {
  test('sendBeacon fires with correct payload', async ({ page }) => {
    await stubPixelAndBeacon(page);
    await page.goto(PATH);
    await fillAndSubmit(page, true);
    await page.waitForSelector('h2:has-text("Recebemos")', { timeout: 5000 }).catch(() => {});

    const beaconData = await page.evaluate(
      () => (window as unknown as WinExt)._beaconData,
    );
    expect(beaconData.length).toBeGreaterThan(0);
    expect(beaconData[0].url).toContain('/api/lead');
  });

  test('fires Lead and QualifiedLead pixel events', async ({ page }) => {
    await stubPixelAndBeacon(page);
    await page.goto(PATH);
    await fillAndSubmit(page, true);
    await page.waitForTimeout(500);

    const fbqCalls = await page.evaluate(
      () => (window as unknown as WinExt)._fbqCalls,
    );
    const eventNames = fbqCalls.map((c) => c[1]);
    expect(eventNames).toContain('Lead');
    expect(eventNames).toContain('QualifiedLead');

    const leadCall = fbqCalls.find((c) => c[1] === 'Lead');
    const qualCall = fbqCalls.find((c) => c[1] === 'QualifiedLead');
    const leadId = (leadCall?.[3] as { eventID?: string })?.eventID ?? '';
    const qualId = (qualCall?.[3] as { eventID?: string })?.eventID ?? '';
    expect(qualId).toBe(leadId + '-q');
  });

  test('thank-you state shown after submit', async ({ page }) => {
    await stubPixelAndBeacon(page);
    await page.goto(PATH);
    await fillAndSubmit(page, true);
    await expect(page.getByText('Recebemos suas respostas!')).toBeVisible({ timeout: 5000 });
  });

  test('WhatsApp button href contains phone and encoded name', async ({ page }) => {
    await stubPixelAndBeacon(page);
    await page.goto(PATH);
    await fillAndSubmit(page, true);
    await page.waitForSelector('a:has-text("Abrir WhatsApp")', { timeout: 5000 });

    const href = (await page.locator('a:has-text("Abrir WhatsApp")').getAttribute('href')) ?? '';
    expect(href).toContain(`wa.me/${WA_PHONE}`);
    expect(decodeURIComponent(href)).toContain('Ana Teste');
    expect(decodeURIComponent(href)).toContain('Falta 1 dente');
  });
});

test.describe('Form submission — unqualified lead', () => {
  test('does NOT fire QualifiedLead pixel event', async ({ page }) => {
    await stubPixelAndBeacon(page);
    await page.goto(PATH);
    await fillAndSubmit(page, false);
    await page.waitForTimeout(500);

    const fbqCalls = await page.evaluate(
      () => (window as unknown as WinExt)._fbqCalls,
    );
    const eventNames = fbqCalls.map((c) => c[1]);
    expect(eventNames).toContain('Lead');
    expect(eventNames).not.toContain('QualifiedLead');
  });
});

import { test, expect, Page } from '@playwright/test';

const PATH = '/implantes';
const AD_PATH = '/implantes?utm_source=meta&utm_campaign=implante_nov26';
const WA_BASE = 'api.whatsapp.com/send?phone=5511950031000';
const BANNED = ['décadas', 'R$', 'parcel', 'desconto', 'garantia'];

// ─── helpers ────────────────────────────────────────────────────────────────

async function getAllWaLinks(page: Page) {
  return page.locator('a[href*="api.whatsapp.com"], a[href*="wa.me/"], a[href*="web.whatsapp.com"]').all();
}

// ─── tests ──────────────────────────────────────────────────────────────────

test.describe('Section order', () => {
  test('sections appear in correct order on mobile', async ({ page }) => {
    await page.goto(PATH);
    const sections = await page.locator('section').allInnerTexts();
    const joined = sections.join('|||');
    // Check key headings appear in the right sequence
    const idxProblem   = joined.indexOf('Você se reconhece');
    const idxSpec      = joined.indexOf('Quem cuida');
    const idxProcess   = joined.indexOf('Como funciona');
    const idxBA        = joined.indexOf('antes e depois');
    const idxFaq       = joined.indexOf('todo mundo');
    const idxCta       = joined.indexOf('Próximo passo');
    expect(idxProblem).toBeLessThan(idxSpec);
    expect(idxSpec).toBeLessThan(idxProcess);
    expect(idxProcess).toBeLessThan(idxBA);
    expect(idxBA).toBeLessThan(idxFaq);
    expect(idxFaq).toBeLessThan(idxCta);
  });
});

test.describe('H1 copy', () => {
  test('shows new H1 text', async ({ page }) => {
    await page.goto(PATH);
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Perdeu dentes ou cansou da dentadura?');
    await expect(h1).toContainText('Existe um caminho.');
  });
});

test.describe('WhatsApp link text', () => {
  test('plain /implantes → "site" text in every WA link', async ({ page }) => {
    await page.goto(PATH);
    // Wait for client hydration to complete
    await page.waitForTimeout(500);
    const links = await getAllWaLinks(page);
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href') ?? '';
      expect(href).toContain(WA_BASE);
      expect(decodeURIComponent(href)).toContain('Vi o site');
    }
  });

  test('?utm_source=meta → "anúncio" text in every WA link', async ({ page }) => {
    await page.goto(AD_PATH);
    await page.waitForTimeout(500);
    const links = await getAllWaLinks(page);
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href') ?? '';
      expect(href).toContain(WA_BASE);
      expect(decodeURIComponent(href)).toContain('Vi o anúncio');
    }
  });

  test('every WA link has target="_blank"', async ({ page }) => {
    await page.goto(PATH);
    const links = await getAllWaLinks(page);
    for (const link of links) {
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });
});

test.describe('Banned words', () => {
  test.each(BANNED)('page does not contain "%s"', async (word, { page }) => {
    await page.goto(PATH);
    const body = await page.locator('body').innerText();
    expect(body.toLowerCase()).not.toContain(word.toLowerCase());
  });
});

test.describe('Video lazy loading', () => {
  test('no video requests before interaction', async ({ page }) => {
    const videoRequests: string[] = [];
    page.on('request', req => {
      if (req.url().includes('/videos/') && req.url().endsWith('.mp4')) {
        videoRequests.push(req.url());
      }
    });
    await page.goto(PATH);
    await page.waitForLoadState('networkidle');
    expect(videoRequests).toHaveLength(0);
  });

  test('opening FAQ "Implante dói?" and tapping play triggers v01 video request', async ({ page }) => {
    const videoRequests: string[] = [];
    page.on('request', req => {
      if (req.url().includes('/videos/') && req.url().endsWith('.mp4')) {
        videoRequests.push(req.url());
      }
    });
    await page.goto(PATH);
    // Open the FAQ item
    await page.getByRole('button', { name: /Implante dói/i }).click();
    // Tap the play button
    await page.getByRole('button', { name: /Reproduzir vídeo.*implante dói/i }).click();
    await page.waitForTimeout(500);
    expect(videoRequests.some(u => u.includes('v01-implante-doi.mp4'))).toBe(true);
  });
});

test.describe('Sticky bar', () => {
  test('sticky bar is visible on mobile', async ({ page }) => {
    test.skip(
      !(await page.evaluate(() => window.innerWidth < 768)),
      'mobile only',
    );
    await page.goto(PATH);
    const bar = page.getByRole('complementary', { name: /Agendamento rápido/i });
    await expect(bar).toBeVisible();
  });

  test('sticky bar is hidden on desktop (≥768px)', async ({ page }) => {
    test.skip(
      !(await page.evaluate(() => window.innerWidth >= 768)),
      'desktop only',
    );
    await page.goto(PATH);
    const bar = page.getByRole('complementary', { name: /Agendamento rápido/i });
    // md:hidden means display:none at ≥768px
    await expect(bar).toBeHidden();
  });
});

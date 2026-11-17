'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const UTM_KEY = 'bio_utm';

function readStoredUtmSource(): string | null {
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    if (stored) return (JSON.parse(stored) as { utm_source?: string }).utm_source ?? null;
  } catch {}
  return null;
}

export function StickyBar({ finalCtaId }: { finalCtaId: string }) {
  const [href, setHref] = useState<string>(() => buildWhatsAppUrl(null));
  const [hiddenByIntersection, setHiddenByIntersection] = useState(false);

  useEffect(() => {
    setHref(buildWhatsAppUrl(readStoredUtmSource()));
  }, []);

  useEffect(() => {
    const el = document.getElementById(finalCtaId);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHiddenByIntersection(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [finalCtaId]);

  const hidden = hiddenByIntersection;

  return (
    <div
      role="complementary"
      aria-label="Agendamento rápido"
      className={[
        'md:hidden fixed bottom-0 inset-x-0 z-50',
        'pb-[env(safe-area-inset-bottom)]',
        'bg-concrete border-t border-marmorino-light/40',
        'transition-transform duration-300 ease-in-out',
        hidden ? 'translate-y-full pointer-events-none' : 'translate-y-0',
      ].join(' ')}
      aria-hidden={hidden}
    >
      <div className="px-4 py-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-bronze text-concrete font-body font-medium text-[15px] py-3.5 transition-colors duration-300 hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
          aria-label="Agendar avaliação de implante pelo WhatsApp"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
          Agendar avaliação pelo WhatsApp
        </a>
      </div>
    </div>
  );
}

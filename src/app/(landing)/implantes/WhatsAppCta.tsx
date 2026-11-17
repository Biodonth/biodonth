'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const UTM_KEY = 'bio_utm';

function captureAndReadUtmSource(): string | null {
  try {
    // First touch wins — only write to sessionStorage if key isn't set yet
    if (!sessionStorage.getItem(UTM_KEY)) {
      const params = new URLSearchParams(window.location.search);
      const data = {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
      };
      if (Object.values(data).some(Boolean)) {
        sessionStorage.setItem(UTM_KEY, JSON.stringify(data));
      }
    }
    const stored = sessionStorage.getItem(UTM_KEY);
    if (stored) return (JSON.parse(stored) as { utm_source?: string }).utm_source ?? null;
  } catch {
    // sessionStorage unavailable (e.g. private browsing with strict settings)
  }
  return null;
}

type Props = {
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

/**
 * WhatsApp CTA anchor.
 * - Renders with the neutral "site" URL on the server (no hydration mismatch).
 * - On mount, reads UTM params from the URL / sessionStorage and switches
 *   to the "anúncio" or "site" text accordingly.
 */
export function WhatsAppCta({ children, className, showIcon = true }: Props) {
  const [href, setHref] = useState<string>(() => buildWhatsAppUrl(null));

  useEffect(() => {
    setHref(buildWhatsAppUrl(captureAndReadUtmSource()));
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {showIcon && (
        <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      )}
      {children}
    </a>
  );
}

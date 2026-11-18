'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { LazyVideo } from '@/components/ui/LazyVideo';

type VideoMeta = {
  src: string;
  poster: string;
  alt: string;
  vtt?: string;
};

export type FaqItemData = {
  question: string;
  answer: string;
  video?: VideoMeta | null;
};

export function FaqAccordion({ items }: { items: readonly FaqItemData[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ol className="space-y-0">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-t border-marmorino-light/50">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group w-full flex items-start justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            >
              <span className="font-display text-[clamp(16px,1.6vw,20px)] text-charcoal group-hover:text-bronze transition-colors duration-300 leading-[1.3]">
                {item.question}
              </span>
              <span className="shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-bronze" aria-hidden="true">
                {isOpen ? (
                  <Minus className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="pb-6">
                <p className="font-body text-[clamp(15px,1.4vw,17px)] text-marmorino leading-relaxed max-w-2xl mb-5">
                  {item.answer}
                </p>
                {item.video && (
                  <LazyVideo
                    src={item.video.src}
                    poster={item.video.poster}
                    alt={item.video.alt}
                    vtt={item.video.vtt}
                    mounted={isOpen}
                  />
                )}
              </div>
            )}
          </li>
        );
      })}
      <li aria-hidden="true" className="border-t border-marmorino-light/50" />
    </ol>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export type LazyVideoProps = {
  src: string;
  poster: string;
  alt: string;
  vtt?: string;
  /** Pass false to skip rendering the element entirely (use for FAQ items that are closed). */
  mounted?: boolean;
};

export function LazyVideo({ src, poster, alt, vtt, mounted = true }: LazyVideoProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [playing]);

  // Don't render anything until the parent says the slot is visible (e.g. FAQ open)
  if (!mounted) {
    return (
      <div
        className="w-full max-w-[320px] aspect-[9/16] rounded-xl bg-concrete-warm"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-xl bg-concrete-warm">
      {playing ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="none"
          playsInline
          controls
        >
          <source src={src} type="video/mp4" />
          {vtt && <track kind="captions" src={vtt} srcLang="pt" default />}
          Seu navegador não suporta vídeo.
        </video>
      ) : (
        <>
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="320px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            aria-label={`Reproduzir vídeo: ${alt}`}
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-bronze/90 group-hover:bg-bronze transition-colors duration-300 shadow-lg">
              <Play className="w-6 h-6 text-concrete ml-1" strokeWidth={2} aria-hidden="true" />
            </span>
          </button>
        </>
      )}
    </div>
  );
}

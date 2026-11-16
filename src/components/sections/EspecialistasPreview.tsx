import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { DisplayHeadline } from '@/components/ui/DisplayHeadline';
import { ESPECIALISTAS } from '@/content/especialistas-page';
import { HOME_ESPECIALISTAS_PREVIEW } from '@/content/home';

const PREVIEW = ESPECIALISTAS.slice(0, 4);

export function EspecialistasPreview() {
  return (
    <section
      id="especialistas-preview"
      className="relative bg-concrete-warm py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <Container width="default">
        {/* Left-aligned header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <p className="font-body uppercase text-[12px] md:text-[13px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
            {HOME_ESPECIALISTAS_PREVIEW.eyebrow}
          </p>
          <DisplayHeadline
            bronze={HOME_ESPECIALISTAS_PREVIEW.bronze}
            bronzeItalic={HOME_ESPECIALISTAS_PREVIEW.bronzeItalic}
            align="left"
            headingLevel="h2"
          />
          <p className="mt-6 font-body text-marmorino leading-relaxed text-[clamp(16px,1.6vw,19px)]">
            {HOME_ESPECIALISTAS_PREVIEW.description}
          </p>
        </div>

        {/* Ruled list */}
        <div>
          {PREVIEW.map((esp, i) => (
            <div
              key={esp.slug}
              className="flex items-center gap-6 md:gap-10 py-6 md:py-8 border-t border-marmorino-light/50"
            >
              <span
                aria-hidden="true"
                className="font-body text-[11px] tracking-[0.18em] text-bronze-dark font-medium w-6 shrink-0"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 overflow-hidden border border-marmorino-light/40">
                <Image
                  src={esp.image.src}
                  alt={esp.image.alt}
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display text-[clamp(16px,1.8vw,22px)] text-charcoal leading-[1.2]">
                  {esp.name}
                </p>
                <p className="font-body text-[13px] md:text-[14px] text-bronze-dark tracking-[0.06em] mt-1">
                  {esp.role}
                </p>
              </div>

              <p className="hidden sm:block font-body text-[12px] text-marmorino tracking-[0.06em] shrink-0">
                {esp.cro}
              </p>
            </div>
          ))}
          <div className="border-t border-marmorino-light/50" aria-hidden="true" />
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-12">
          <Link
            href={HOME_ESPECIALISTAS_PREVIEW.ctaHref}
            className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-bronze hover:text-bronze-dark transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
          >
            <span className="relative">
              {HOME_ESPECIALISTAS_PREVIEW.ctaLabel}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full bg-current scale-x-0 origin-left transition-transform duration-400 ease-[var(--ease-premium)] group-hover:scale-x-100"
              />
            </span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-400 ease-[var(--ease-premium)] group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}

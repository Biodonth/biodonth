import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { DisplayHeadline } from '@/components/ui/DisplayHeadline';
import { TREATMENTS } from '@/content/treatments';
import { HOME_TREATMENTS } from '@/content/home';

const FEATURED = TREATMENTS.slice(0, 6);

export function TreatmentsGrid() {
  return (
    <section id="tratamentos" className="bg-concrete py-20 md:py-28 lg:py-36">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* LEFT — header + numbered list */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="font-body uppercase text-[12px] md:text-[13px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
              {HOME_TREATMENTS.eyebrow}
            </p>
            <DisplayHeadline
              bronze={HOME_TREATMENTS.bronze}
              bronzeItalic={HOME_TREATMENTS.bronzeItalic}
              align="left"
              headingLevel="h2"
            />
            <p className="mt-6 mb-10 font-body text-marmorino leading-relaxed text-[clamp(16px,1.6vw,18px)] max-w-md">
              {HOME_TREATMENTS.description.split('\n')[0]}
            </p>

            <ol className="space-y-0">
              {FEATURED.map((t, i) => (
                <li key={t.slug}>
                  <Link
                    href={`/tratamentos/${t.slug}`}
                    className="group flex items-center gap-5 py-4 border-t border-marmorino-light/50 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
                  >
                    <span className="font-body text-[11px] tracking-[0.14em] text-bronze-dark font-medium shrink-0 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[clamp(16px,1.8vw,21px)] text-charcoal group-hover:text-bronze transition-colors duration-300 leading-[1.2] flex-1">
                      {t.name}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-marmorino-light shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
              <li aria-hidden="true" className="border-t border-marmorino-light/50" />
            </ol>

            <div className="mt-8 md:mt-10">
              <Link
                href={HOME_TREATMENTS.ctaHref}
                className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-bronze hover:text-bronze-dark transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
              >
                <span className="relative">
                  {HOME_TREATMENTS.ctaLabel}
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
          </div>

          {/* RIGHT — team image, desktop only */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 self-stretch">
            <div className="relative overflow-hidden border-[2px] border-bronze h-full min-h-[480px]">
              <Image
                src="/images/team-biodonth.jpg"
                alt="Equipe da Biodonth Odontologia Integrada"
                fill
                sizes="(max-width: 1280px) 50vw, 700px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Mobile: team image below list */}
        <div className="lg:hidden mt-10 overflow-hidden border-[2px] border-bronze">
          <Image
            src="/images/team-biodonth.jpg"
            alt="Equipe da Biodonth Odontologia Integrada"
            width={800}
            height={500}
            sizes="100vw"
            className="block w-full h-auto"
          />
        </div>
      </Container>
    </section>
  );
}

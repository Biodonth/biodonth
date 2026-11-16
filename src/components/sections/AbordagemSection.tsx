import { Container } from '@/components/ui/Container';
import { DisplayHeadline } from '@/components/ui/DisplayHeadline';
import { HOME_ABORDAGEM } from '@/content/home';

export function AbordagemSection() {
  return (
    <section
      id="abordagem"
      className="relative bg-concrete py-20 md:py-28 lg:py-36"
    >
      <Container width="default">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — sticky header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="font-body uppercase text-[12px] md:text-[13px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
              {HOME_ABORDAGEM.eyebrow}
            </p>
            <DisplayHeadline
              bronze={HOME_ABORDAGEM.bronze}
              bronzeItalic={HOME_ABORDAGEM.bronzeItalic}
              align="left"
              headingLevel="h2"
            />
            <p className="mt-6 font-body text-marmorino leading-relaxed text-[clamp(16px,1.6vw,19px)] max-w-md">
              {HOME_ABORDAGEM.description}
            </p>
          </div>

          {/* Right — numbered steps */}
          <div className="lg:col-span-7">
            <ol className="space-y-0">
              {HOME_ABORDAGEM.steps.map((step) => (
                <li
                  key={step.number}
                  className="flex gap-8 py-9 md:py-10 border-t border-marmorino-light/50 first:border-t-0"
                >
                  <span
                    aria-hidden="true"
                    className="font-body text-[11px] tracking-[0.18em] text-bronze-dark font-medium mt-1 w-6 shrink-0"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(20px,2.4vw,28px)] text-charcoal leading-[1.15] mb-3">
                      {step.title}
                    </h3>
                    <p className="font-body text-[clamp(15px,1.6vw,18px)] text-marmorino leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

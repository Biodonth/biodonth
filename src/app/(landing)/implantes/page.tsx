import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { LogoFull } from '@/components/ui/Logo';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { LANDING, IMPLANTES_WA_URL } from '@/content/landing-implantes';
import { FaqAccordion } from './FaqAccordion';

export const metadata: Metadata = {
  title: LANDING.meta.title,
  description: LANDING.meta.description,
  robots: { index: false, follow: false },
  alternates: { canonical: '/implantes' },
};

export default function ImplantesPage() {
  return (
    <div className="bg-concrete text-charcoal min-h-screen">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-concrete/95 backdrop-blur-sm border-b border-marmorino-light/40">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <LogoFull className="h-7 w-auto text-bronze" aria-label="Biodonth Odontologia Integrada" />
          <a
            href={IMPLANTES_WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-bronze text-concrete font-body font-medium text-[13px] md:text-[14px] tracking-[0.04em] px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4 transition-colors duration-300 hover:bg-bronze-dark"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            <span>Agendar avaliação</span>
          </a>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="bg-shadow text-concrete pt-16 pb-14 md:pt-20 md:pb-18">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <p className="font-body uppercase text-[11px] md:text-[12px] tracking-[0.2em] text-bronze font-medium mb-6">
            {LANDING.hero.eyebrow}
          </p>
          <h1 className="font-display leading-[1.08] text-[clamp(38px,6vw,76px)] max-w-3xl mb-6">
            <span className="text-bronze-light block">{LANDING.hero.bronze}</span>
            <span className="text-bronze-light italic block">{LANDING.hero.bronzeItalic}</span>
          </h1>
          <p className="font-body text-[clamp(16px,1.6vw,20px)] text-concrete/75 leading-relaxed max-w-xl mb-10">
            {LANDING.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={IMPLANTES_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-bronze text-concrete font-body font-medium text-[15px] tracking-[0.03em] px-7 py-4 transition-colors duration-300 hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            >
              <MessageCircle className="w-4.5 h-4.5" strokeWidth={1.5} aria-hidden="true" />
              {LANDING.hero.cta}
            </a>
            <a
              href={LANDING.header.phoneHref}
              className="inline-flex items-center justify-center gap-2 font-body text-[15px] font-medium text-concrete/70 hover:text-bronze-light transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              {LANDING.header.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ────────────────────────────────────────── */}
      <section className="bg-bronze">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-4">
          <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-10">
            {LANDING.trust.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-concrete shrink-0" strokeWidth={2.5} aria-hidden="true" />
                <span className="font-body text-[13px] md:text-[14px] text-concrete font-medium tracking-[0.02em]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PROBLEM ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="font-body uppercase text-[12px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
                {LANDING.problem.eyebrow}
              </p>
              <h2 className="font-display leading-[1.1] text-[clamp(28px,3.5vw,44px)] text-charcoal">
                {LANDING.problem.bronze}{' '}
                <span className="italic text-bronze">{LANDING.problem.bronzeItalic}</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-0">
                {LANDING.problem.signals.map((signal, i) => (
                  <li key={i} className="flex items-start gap-4 py-4 border-t border-marmorino-light/50">
                    <span className="font-body text-[11px] tracking-[0.14em] text-bronze-dark font-medium shrink-0 w-5 mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-[clamp(15px,1.5vw,18px)] text-charcoal leading-[1.5]">
                      {signal}
                    </span>
                  </li>
                ))}
                <li aria-hidden="true" className="border-t border-marmorino-light/50" />
              </ul>
              <p className="mt-8 font-body text-[15px] text-marmorino leading-relaxed">
                {LANDING.problem.bridge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────── */}
      <section className="bg-concrete-warm py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <p className="font-body uppercase text-[12px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
            {LANDING.process.eyebrow}
          </p>
          <h2 className="font-display leading-[1.1] text-[clamp(28px,3.5vw,44px)] text-charcoal mb-14">
            {LANDING.process.bronze}{' '}
            <span className="italic text-bronze">{LANDING.process.bronzeItalic}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
            {LANDING.process.steps.map((step, i) => (
              <div key={i} className="flex gap-5 py-7 border-t border-marmorino-light/50">
                <span className="font-body text-[11px] tracking-[0.14em] text-bronze-dark font-medium shrink-0 w-7 pt-1">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(17px,1.7vw,21px)] text-charcoal leading-[1.2] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-[14px] md:text-[15px] text-marmorino leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-marmorino-light/50">
            <a
              href={IMPLANTES_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bronze text-concrete font-body font-medium text-[15px] tracking-[0.03em] px-7 py-4 transition-colors duration-300 hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              {LANDING.hero.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ── SPECIALISTS ────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <p className="font-body uppercase text-[12px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
            {LANDING.specialists.eyebrow}
          </p>
          <h2 className="font-display leading-[1.1] text-[clamp(28px,3.5vw,44px)] text-charcoal mb-14">
            {LANDING.specialists.bronze}{' '}
            <span className="italic text-bronze">{LANDING.specialists.bronzeItalic}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 md:gap-12 max-w-2xl">
            {LANDING.specialists.items.map((sp) => (
              <div key={sp.cro} className="flex gap-5 items-start">
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden border border-bronze/40">
                  <Image
                    src={sp.image}
                    alt={sp.alt}
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                  />
                </div>
                <div className="pt-1">
                  <p className="font-display text-[clamp(16px,1.6vw,19px)] text-charcoal leading-[1.2] mb-1">
                    {sp.name}
                  </p>
                  <p className="font-body text-[13px] text-marmorino leading-snug mb-1.5">
                    {sp.role}
                  </p>
                  <p className="font-body text-[11px] tracking-[0.1em] text-bronze-dark font-medium uppercase">
                    {sp.cro}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ─────────────────────────────────────── */}
      <section className="bg-concrete-warm py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <p className="font-body uppercase text-[12px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
            {LANDING.beforeAfter.eyebrow}
          </p>
          <h2 className="font-display leading-[1.1] text-[clamp(28px,3.5vw,44px)] text-charcoal mb-10">
            {LANDING.beforeAfter.bronze}{' '}
            <span className="italic text-bronze">{LANDING.beforeAfter.bronzeItalic}</span>
          </h2>
          <div className="max-w-2xl">
            <BeforeAfter
              before={LANDING.beforeAfter.before}
              after={LANDING.beforeAfter.after}
              objectPosition={LANDING.beforeAfter.objectPosition}
            />
            <p className="mt-4 font-body text-[12px] text-marmorino/70 leading-relaxed">
              {LANDING.beforeAfter.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <p className="font-body uppercase text-[12px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
                {LANDING.faq.eyebrow}
              </p>
              <h2 className="font-display leading-[1.1] text-[clamp(28px,3.5vw,44px)] text-charcoal">
                {LANDING.faq.bronze}{' '}
                <span className="italic text-bronze">{LANDING.faq.bronzeItalic}</span>
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={LANDING.faq.items} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="bg-shadow py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8 text-center">
          <p className="font-body uppercase text-[11px] md:text-[12px] tracking-[0.2em] text-bronze font-medium mb-6">
            {LANDING.cta.eyebrow}
          </p>
          <h2 className="font-display leading-[1.08] text-[clamp(32px,5vw,64px)] text-concrete max-w-2xl mx-auto mb-6">
            <span className="text-bronze-light block">{LANDING.cta.bronze}</span>
            <span className="text-bronze-light italic block">{LANDING.cta.bronzeItalic}</span>
          </h2>
          <p className="font-body text-[clamp(15px,1.5vw,18px)] text-concrete/70 leading-relaxed max-w-lg mx-auto mb-10">
            {LANDING.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={IMPLANTES_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-bronze text-concrete font-body font-medium text-[15px] tracking-[0.03em] px-8 py-4 transition-colors duration-300 hover:bg-bronze-dark focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              {LANDING.cta.primary}
            </a>
            <a
              href={LANDING.header.phoneHref}
              className="inline-flex items-center gap-2 font-body text-[15px] font-medium text-concrete/60 hover:text-bronze-light transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              {LANDING.cta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ── LEGAL FOOTER ───────────────────────────────────────── */}
      <footer className="bg-shadow border-t border-concrete/10 py-8">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <LogoFull className="h-5 w-auto text-marmorino" aria-label="Biodonth Odontologia Integrada" />
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 font-body text-[12px] text-marmorino/60">
              <span>{LANDING.footer.address}</span>
              <span>{LANDING.footer.hours}</span>
            </div>
          </div>
          <p className="font-body text-[11px] text-marmorino/40 leading-relaxed mb-2">
            {LANDING.footer.legal}
          </p>
          <p className="font-body text-[11px] text-marmorino/40">
            {LANDING.footer.cro}
          </p>
        </div>
      </footer>

    </div>
  );
}

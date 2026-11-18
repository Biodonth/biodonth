import type { Metadata } from 'next';
import { LogoFull } from '@/components/ui/Logo';
import { LeadForm } from './LeadForm';

export const metadata: Metadata = {
  title: 'Avaliação de Implante Dental — Biodonth',
  description: 'Preencha o formulário e receba uma avaliação personalizada com especialistas em implante dental na Biodonth, Artur Alvim, São Paulo.',
  robots: { index: false, follow: false },
};

export default function CaptacaoPage() {
  return (
    <div className="min-h-screen bg-concrete text-charcoal flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-concrete border-b border-marmorino-light/40 px-5 py-4 flex justify-center">
        <LogoFull className="h-7 w-auto text-bronze" aria-label="Biodonth Odontologia Integrada" />
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-lg mx-auto px-5 py-10 md:py-16">

        <div className="mb-8">
          <p className="font-body uppercase text-[11px] tracking-[0.2em] text-bronze-dark font-medium mb-4">
            Implante dental · Artur Alvim, SP
          </p>
          <h1 className="font-display text-[clamp(30px,5vw,46px)] leading-[1.08] text-charcoal mb-4">
            Descubra se o implante{' '}
            <span className="text-bronze italic">é o certo para você.</span>
          </h1>
          <p className="font-body text-[16px] text-marmorino leading-relaxed">
            Responda três perguntas rápidas. Um especialista analisa seu caso e entra em contato pelo WhatsApp.
          </p>
        </div>

        <div className="bg-pure border border-marmorino-light/40 p-6 md:p-8">
          <LeadForm />
        </div>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-shadow border-t border-concrete/10 px-5 py-6 text-center">
        <p className="font-body text-[11px] text-marmorino/50 leading-relaxed">
          {/* [REVISAR] Responsável Técnico: Dr(a). Nome Sobrenome — CRO-SP 00000 */}
          Responsável Técnico: <span className="text-marmorino/70">[REVISAR — inserir nome e CRO do RT]</span>
        </p>
        <p className="font-body text-[11px] text-marmorino/40 mt-1">
          Rua Arquiteto Olavo Redig de Campos, 105 — Artur Alvim, São Paulo
        </p>
      </footer>

    </div>
  );
}

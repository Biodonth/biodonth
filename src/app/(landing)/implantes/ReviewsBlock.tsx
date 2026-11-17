import { Star, ExternalLink } from 'lucide-react';
import reviewsData from '@/content/reviews.json';

type Review = {
  name: string;
  stars: number;
  text: string;
  date: string;
};

type ReviewsJson = {
  enabled: boolean;
  rating: number;
  total: number;
  googleUrl: string;
  reviews: Review[];
};

const data = reviewsData as ReviewsJson;

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-bronze fill-bronze' : 'text-marmorino-light'}`}
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ReviewsBlock() {
  if (!data.enabled) return null;

  return (
    <section className="py-20 md:py-28 bg-concrete-warm">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <p className="font-body uppercase text-[12px] tracking-[0.18em] text-bronze-dark font-medium mb-6">
          O que dizem os pacientes
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <h2 className="font-display leading-[1.1] text-[clamp(28px,3.5vw,44px)] text-charcoal">
            Avaliações reais <span className="italic text-bronze">no Google.</span>
          </h2>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-display text-[clamp(32px,4vw,48px)] text-bronze leading-none">
              {data.rating.toFixed(1)}
            </span>
            <div>
              <StarRating count={Math.round(data.rating)} />
              <p className="font-body text-[12px] text-marmorino mt-1">
                {data.total} avaliações
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {data.reviews.slice(0, 3).map((review, i) => (
            <article key={i} className="bg-concrete p-6 border border-marmorino-light/40">
              <div className="flex items-center justify-between mb-3">
                <StarRating count={review.stars} />
                <time className="font-body text-[11px] text-marmorino/60">{review.date}</time>
              </div>
              <p className="font-body text-[14px] md:text-[15px] text-charcoal leading-relaxed mb-4">
                {review.text}
              </p>
              <p className="font-body text-[12px] text-marmorino font-medium">{review.name}</p>
            </article>
          ))}
        </div>

        <a
          href={data.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-[14px] font-medium text-bronze hover:text-bronze-dark transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
        >
          <ExternalLink className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
          Ver todas no Google
        </a>
      </div>
    </section>
  );
}

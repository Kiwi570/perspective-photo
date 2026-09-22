import type { CSSProperties } from 'react';

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Durée d'un tour complet, en secondes. */
  duration?: number;
};

/**
 * Bandeau qui défile en continu (CSS pur, pause au survol, figé en mouvement réduit).
 * Le contenu est dupliqué pour un bouclage sans couture ; la copie est masquée aux lecteurs d'écran.
 */
export function Marquee({ items, className = '', duration = 48 }: MarqueeProps) {
  const style = { '--marquee-duration': `${duration}s` } as CSSProperties;
  return (
    <div className={`marquee ${className}`} style={style}>
      <p className="sr-only">{items.join(' · ')}</p>
      <div className="marquee-track" aria-hidden="true">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

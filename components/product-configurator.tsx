'use client';

import { Check, Heart, Ruler } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { RollingNumber } from '@/components/motion/rolling-number';
import { useSelection } from '@/components/selection-provider';
import { euro, formats, type Photo } from '@/lib/photos';

export function ProductConfigurator({ photo }: { photo: Photo }) {
  const [formatIndex, setFormatIndex] = useState(2);
  const [support, setSupport] = useState<'paper' | 'alu'>('paper');
  const { add, has } = useSelection();
  const selected = has(photo.slug);
  const format = formats[formatIndex];
  const price = Math.round(format.price * (support === 'alu' ? 1.3 : 1));
  const label = photo.orientation === 'portrait' ? `${format.height} × ${format.width} cm` : format.label;

  return (
    <div>
      <fieldset>
        <legend className="font-mono text-[10px] uppercase tracking-[.15em] text-white/60">Format</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {formats.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setFormatIndex(index)}
              aria-pressed={formatIndex === index}
              className={`option ${formatIndex === index ? 'is-on' : ''}`}
            >
              <b>{photo.orientation === 'portrait' ? `${item.height} × ${item.width} cm` : item.label}</b>
              <small>{euro(item.price)}</small>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-7">
        <legend className="font-mono text-[10px] uppercase tracking-[.15em] text-white/60">Support</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSupport('paper')}
            aria-pressed={support === 'paper'}
            className={`option ${support === 'paper' ? 'is-on' : ''}`}
          >
            <b>Fine Art Hahnemühle</b>
            <small>Coton 308 g, mat</small>
          </button>
          <button
            type="button"
            onClick={() => setSupport('alu')}
            aria-pressed={support === 'alu'}
            className={`option ${support === 'alu' ? 'is-on' : ''}`}
          >
            <b>Aluminium Dibond</b>
            <small>Prêt à accrocher, +30 %</small>
          </button>
        </div>
      </fieldset>
      <div className="mt-8 flex items-end justify-between gap-5 border-y border-white/12 py-6">
        <div>
          <p className="text-4xl font-semibold leading-none tracking-[-.04em]">
            <RollingNumber value={euro(price)} />
          </p>
          <p key={`${label}-${support}`} className="anim-fade mt-2 font-mono text-[10px] text-white/60">
            {label} · {support === 'alu' ? 'aluminium' : 'Fine Art'} · livraison offerte
          </p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[.12em] text-acid">/ 30</p>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link href={`/mur?w=${photo.slug}&f=${formatIndex}&s=${support}`} className="button-ghost">
          <Ruler className="size-4" /> Voir sur mon mur
        </Link>
        <button type="button" onClick={() => add(photo.slug, formatIndex, support)} className="button-acid">
          {selected ? (
            <Check key="check" className="size-4 animate-pop" />
          ) : (
            <Heart key="heart" className="size-4" />
          )}
          {selected ? 'Dans ma sélection' : 'Ajouter à ma sélection'}
        </button>
      </div>
      {selected ? (
        <p className="anim-rise mt-4 rounded-xl bg-white/6 p-4 text-xs leading-6 text-white/60">
          Ajoutée avec ce format et ce support. Depuis la barre en bas de page, envoyez votre sélection pour
          connaître la disponibilité, le délai et confirmer le prix.
        </p>
      ) : null}
    </div>
  );
}

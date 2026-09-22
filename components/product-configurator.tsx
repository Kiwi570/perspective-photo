'use client';

import { Check, Heart, Ruler } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { euro, formats, type Photo } from '@/lib/photos';

export function ProductConfigurator({ photo }: { photo: Photo }) {
  const [formatIndex, setFormatIndex] = useState(2);
  const [support, setSupport] = useState<'paper' | 'alu'>('paper');
  const [selected, setSelected] = useState(false);
  const format = formats[formatIndex];
  const price = Math.round(format.price * (support === 'alu' ? 1.3 : 1));
  const label = photo.orientation === 'portrait' ? `${format.height} × ${format.width} cm` : format.label;

  return (
    <div>
      <fieldset>
        <legend className="font-mono text-[10px] uppercase tracking-[.15em] text-white/45">Format</legend>
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
        <legend className="font-mono text-[10px] uppercase tracking-[.15em] text-white/45">Support</legend>
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
          <p className="text-4xl font-semibold tracking-[-.04em]">{euro(price)}</p>
          <p className="mt-1 font-mono text-[9px] text-white/38">
            {label} · {support === 'alu' ? 'aluminium' : 'Fine Art'} · livraison offerte
          </p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[.12em] text-acid">/ 30</p>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link href={`/mur?w=${photo.slug}&f=${formatIndex}&s=${support}`} className="button-ghost">
          <Ruler className="size-4" /> Voir sur mon mur
        </Link>
        <button type="button" onClick={() => setSelected(true)} className="button-acid">
          {selected ? <Check className="size-4" /> : <Heart className="size-4" />}
          {selected ? 'Ajouté à ma sélection' : 'Ajouter à ma sélection'}
        </button>
      </div>
      {selected ? (
        <p className="mt-4 rounded-xl bg-white/6 p-4 text-xs leading-6 text-white/52">
          Sélection enregistrée pour cette visite. Le paiement et le stock réel devront être raccordés avant
          l’ouverture des ventes.
        </p>
      ) : null}
    </div>
  );
}

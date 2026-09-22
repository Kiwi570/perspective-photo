'use client';

import { Mail, X } from 'lucide-react';

import { useSelection } from '@/components/selection-provider';
import { euro, formats, photoBySlug } from '@/lib/photos';
import { contact } from '@/lib/site';

function priceFor(formatIndex: number, support: 'paper' | 'alu') {
  return Math.round(formats[formatIndex].price * (support === 'alu' ? 1.3 : 1));
}

/**
 * Barre de sélection : apparaît dès qu'une œuvre est retenue, et prépare un e-mail
 * pré-rempli (disponibilité, délai, prix) — aucune donnée n'est transmise avant l'envoi.
 */
export function SelectionBar() {
  const { items, count, remove, clear } = useSelection();
  if (count === 0) return null;

  const lines = items.map((item) => {
    const photo = photoBySlug(item.slug);
    if (!photo) return null;
    const format = formats[item.formatIndex];
    const label = photo.orientation === 'portrait' ? `${format.height} × ${format.width} cm` : format.label;
    return `— ${photo.title} · ${label} · ${item.support === 'alu' ? 'Aluminium Dibond' : 'Fine Art Hahnemühle'} · ${euro(priceFor(item.formatIndex, item.support))}`;
  });
  const subject = encodeURIComponent(`Demande — ${count} œuvre${count > 1 ? 's' : ''} en édition limitée`);
  const body = encodeURIComponent(
    `Bonjour ${contact.firstName},\n\nJe souhaite connaître la disponibilité et le délai pour :\n${lines.filter(Boolean).join('\n')}\n\nMerci de me recontacter.\n\n`,
  );
  const titles = items.map((item) => photoBySlug(item.slug)?.title).filter(Boolean);

  return (
    <aside
      className="anim-rise fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-2xl border border-white/14 bg-carbon/95 p-4 text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      aria-label="Votre sélection"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[.15em] text-acid">
            Ma sélection · {count}
          </p>
          <p className="mt-1 truncate text-xs text-white/60">{titles.join(' · ')}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a href={`mailto:${contact.email}?subject=${subject}&body=${body}`} className="button-acid">
            <Mail className="size-4" /> Demander disponibilité et prix
          </a>
          <button
            type="button"
            onClick={clear}
            className="grid size-12 place-items-center rounded-full border border-white/20 transition-[border-color,transform] duration-300 hover:border-acid active:scale-90"
            aria-label="Vider la sélection"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      {count > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
          {items.map((item) => (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => remove(item.slug)}
                className="chip inline-flex items-center gap-2"
                aria-label={`Retirer ${photoBySlug(item.slug)?.title ?? ''}`}
              >
                {photoBySlug(item.slug)?.title} <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

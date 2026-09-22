'use client';

import { ImageUp, Moon, Ruler, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useMemo, useState } from 'react';

import { euro, formats, photoBySlug, photos } from '@/lib/photos';

const wallColors = ['#ded8cc', '#f2efe9', '#b5b5aa', '#68706a', '#394448', '#202124'];

export function WallSimulator({ initialSlug = 'diamant' }: { initialSlug?: string }) {
  const [slug, setSlug] = useState(photoBySlug(initialSlug)?.slug || 'diamant');
  const [formatIndex, setFormatIndex] = useState(2);
  const [support, setSupport] = useState<'paper' | 'alu'>('paper');
  const [wall, setWall] = useState(wallColors[0]);
  const [night, setNight] = useState(false);
  const [ownWall, setOwnWall] = useState<string | null>(null);
  const [x, setX] = useState(50);
  const [y, setY] = useState(35);
  const photo = photoBySlug(slug)!;
  const format = formats[formatIndex];
  const price = Math.round(format.price * (support === 'alu' ? 1.3 : 1));
  const frameWidth = 10 + (format.width / 120) * 22;
  const frameRatio =
    photo.orientation === 'portrait'
      ? `${format.height}/${format.width}`
      : `${format.width}/${format.height}`;
  const currentBackground = useMemo(() => (ownWall ? `url(${ownWall}) center/cover` : wall), [ownWall, wall]);
  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setOwnWall(URL.createObjectURL(file));
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[1.25fr_.75fr]">
      <div>
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] transition ${night ? 'brightness-[.48]' : ''}`}
          style={{ background: currentBackground }}
        >
          <div className="absolute inset-x-[12%] bottom-0 h-[27%] rounded-t-[3rem] bg-[#3b3430] shadow-2xl">
            <span className="absolute left-[8%] top-[-20%] h-[52%] w-[25%] rounded-2xl bg-[#8c8178]" />
            <span className="absolute right-[8%] top-[-20%] h-[52%] w-[25%] rounded-2xl bg-[#6d7773]" />
          </div>
          <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl ${support === 'paper' ? 'p-[1.5%]' : 'p-0'}`}
            style={{ left: `${x}%`, top: `${y}%`, width: `${frameWidth}%`, aspectRatio: frameRatio }}
          >
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              sizes="40vw"
              loading="eager"
              className="object-cover"
            />
          </div>
          <div className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-white backdrop-blur">
            Canapé : 2 mètres · simulation indicative
          </div>
        </div>
        <div className="mt-4 grid gap-4 rounded-xl border border-white/10 bg-carbon p-4 sm:grid-cols-2">
          <label className="text-xs font-bold">
            Position horizontale
            <input
              type="range"
              min="20"
              max="80"
              value={x}
              onChange={(event) => setX(Number(event.target.value))}
              className="mt-2 w-full accent-[#d9ff43]"
            />
          </label>
          <label className="text-xs font-bold">
            Hauteur
            <input
              type="range"
              min="18"
              max="58"
              value={y}
              onChange={(event) => setY(Number(event.target.value))}
              className="mt-2 w-full accent-[#d9ff43]"
            />
          </label>
        </div>
        <label className="mt-4 flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 p-4 text-sm font-bold text-white/64 hover:border-acid hover:text-acid">
          <ImageUp className="size-5" /> Tester avec la photo de votre mur
          <input type="file" accept="image/*" className="sr-only" onChange={upload} />
        </label>
        {ownWall ? (
          <button
            type="button"
            onClick={() => setOwnWall(null)}
            className="mt-3 text-xs text-white/45 underline"
          >
            Revenir à la pièce type
          </button>
        ) : null}
      </div>
      <aside className="rounded-[1.5rem] border border-white/10 bg-carbon p-6 sm:p-8">
        <p className="eyebrow">Sur mon mur</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-.04em]">Trouvez la bonne présence.</h1>
        <div className="mt-8">
          <p className="control-label">Œuvre</p>
          <div className="mt-3 grid max-h-40 grid-cols-4 gap-2 overflow-y-auto pr-1">
            {photos.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSlug(item.slug)}
                aria-pressed={slug === item.slug}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${slug === item.slug ? 'border-acid' : 'border-transparent'}`}
                aria-label={item.title}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="80px"
                  loading={index < 8 ? 'eager' : 'lazy'}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="control-label">Format</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {formats.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setFormatIndex(index)}
                aria-pressed={formatIndex === index}
                className={`option ${formatIndex === index ? 'is-on' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="control-label">Support</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSupport('paper')}
              aria-pressed={support === 'paper'}
              className={`option ${support === 'paper' ? 'is-on' : ''}`}
            >
              Fine Art
            </button>
            <button
              type="button"
              onClick={() => setSupport('alu')}
              aria-pressed={support === 'alu'}
              className={`option ${support === 'alu' ? 'is-on' : ''}`}
            >
              Aluminium
            </button>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="control-label">Mur</p>
            <div className="mt-3 flex gap-2">
              {wallColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setWall(color);
                    setOwnWall(null);
                  }}
                  aria-pressed={wall === color && !ownWall}
                  aria-label={`Mur ${color}`}
                  className={`size-8 rounded-full border-2 ${wall === color && !ownWall ? 'border-acid' : 'border-white/15'}`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNight((value) => !value)}
            className="grid size-11 place-items-center rounded-full border border-white/15"
            aria-label={night ? 'Passer en lumière de jour' : 'Passer en lumière de nuit'}
          >
            {night ? <Sun className="size-5 text-acid" /> : <Moon className="size-5" />}
          </button>
        </div>
        <div className="mt-7 border-y border-white/10 py-5">
          <p className="text-3xl font-semibold">{euro(price)}</p>
          <p className="mt-1 font-mono text-[9px] text-white/38">
            {photo.title} · {format.label} · {support === 'alu' ? 'aluminium' : 'Fine Art'}
          </p>
        </div>
        <Link href={`/oeuvre/${photo.slug}`} className="button-acid mt-6 w-full">
          <Ruler className="size-4" /> Configurer cette œuvre
        </Link>
      </aside>
    </div>
  );
}

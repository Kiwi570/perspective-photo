import { ArrowUpRight, Aperture } from 'lucide-react';
import Link from 'next/link';

import { nav, social } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <p className="flex items-center gap-3 text-xl font-bold">
              <Aperture className="size-5 text-acid" /> Perspective Photo
            </p>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/48">
              Photographies d’art en édition limitée, signées et numérotées par Joël Gourlain au Havre.
            </p>
          </div>
          <div>
            <p className="footer-title">Explorer</p>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-title">Le photographe</p>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              <a
                href={social.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                YouTube <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                Facebook <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-7 font-mono text-[9px] uppercase tracking-[.14em] text-white/28 sm:flex-row sm:justify-between">
          <p>© 2014–2026 Joël Gourlain</p>
          <p>Éditions limitées à 30 exemplaires</p>
        </div>
      </div>
    </footer>
  );
}

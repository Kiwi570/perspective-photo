import { ArrowUpRight, Aperture } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/motion/reveal';
import { contact, legal, nav, social } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1450px]">
        <Reveal stagger={120} y={20} className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <p className="group flex items-center gap-3 text-xl font-bold">
              <Aperture className="size-5 text-acid transition-transform duration-700 ease-out-expo group-hover:rotate-90" />{' '}
              Perspective Photo
            </p>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/48">
              Photographies d’art en édition limitée, signées et numérotées par Joël Gourlain au Havre.
            </p>
          </div>
          <div>
            <p className="footer-title">Explorer</p>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-title">Le photographe</p>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              <a href={`mailto:${contact.email}`} className="footer-link">
                {contact.email}
              </a>
              <a
                href={social.youtube}
                target="_blank"
                rel="noreferrer"
                className="footer-link group inline-flex items-center gap-2"
              >
                YouTube{' '}
                <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="footer-link group inline-flex items-center gap-2"
              >
                Facebook{' '}
                <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col gap-3 pt-7 font-mono text-[9px] uppercase tracking-[.14em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2014–2026 Joël Gourlain · Éditions limitées à 30 exemplaires</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

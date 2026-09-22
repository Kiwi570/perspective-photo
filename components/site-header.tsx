'use client';

import { Aperture, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { nav } from '@/lib/site';

const mobileItems = [...nav, { href: '/galerie', label: 'Choisir une œuvre' }];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b text-white backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? 'border-white/12 bg-night/85 shadow-[0_18px_50px_rgba(0,0,0,0.45)]'
          : 'border-white/10 bg-night/90'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-[height] duration-500 ease-out-expo sm:px-8 lg:px-12 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-full bg-acid text-night transition-transform duration-700 ease-out-expo group-hover:rotate-90">
            <Aperture className="size-5" />
          </span>
          <span>
            <b className="block text-base leading-none">Perspective Photo</b>
            <small className="mt-1 block font-mono text-[9px] uppercase tracking-[.16em] text-white/60">
              Joël Gourlain · Le Havre
            </small>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname.startsWith(item.href) ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/galerie" className="button-acid hidden sm:inline-flex">
          <ShoppingBag className="size-4" /> Choisir une œuvre
        </Link>
        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className={`grid size-11 place-items-center rounded-full border border-white/20 transition-colors duration-300 hover:border-acid hover:text-acid lg:hidden ${
            open ? 'is-open' : ''
          }`}
        >
          <span className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-nav lg:hidden ${open ? 'is-open' : ''}`}
        {...(open ? {} : { inert: true })}
      >
        <nav className="bg-night" aria-label="Navigation mobile">
          <div className="grid gap-1 px-5 py-5">
            {mobileItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-lg hover:bg-white/6 ${
                  index === nav.length ? 'font-bold text-acid' : ''
                }`}
                style={{ transitionDelay: open ? `${90 + index * 50}ms` : '0ms' }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

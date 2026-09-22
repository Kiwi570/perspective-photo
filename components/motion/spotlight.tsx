'use client';

import { type ReactNode, useEffect, useRef } from 'react';

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Section dont le fond réagit au curseur : un halo acide diffus et la grille
 * qui s'éclaire autour du pointeur (voir .spotlight dans globals.css).
 * Inactif sur écran tactile et en mouvement réduit.
 */
export function Spotlight({ children, className = '', id }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--mx', `${x}px`);
        element.style.setProperty('--my', `${y}px`);
        element.style.setProperty('--spot', '1');
      });
    };
    const leave = () => element.style.setProperty('--spot', '0');

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`spotlight ${className}`}>
      {children}
    </section>
  );
}

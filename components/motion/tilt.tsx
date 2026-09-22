'use client';

import { type ReactNode, useEffect, useRef } from 'react';

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Angle maximal, en degrés. */
  max?: number;
};

/**
 * Incline légèrement son contenu vers le pointeur (perspective 3D) et pose
 * un reflet qui suit la souris. Inactif sur écran tactile et en mouvement réduit.
 * Le parent doit être `relative overflow-hidden` pour que le reflet reste dans la carte.
 */
export function Tilt({ children, className = '', max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
        element.style.setProperty('--ry-deg', `${(px * max).toFixed(2)}deg`);
        element.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
        element.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const enter = () => element.classList.add('is-tilting');
    const leave = () => {
      cancelAnimationFrame(frame);
      element.classList.remove('is-tilting');
      element.style.setProperty('--rx', '0deg');
      element.style.setProperty('--ry-deg', '0deg');
    };

    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}

'use client';

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { formats } from '@/lib/photos';

export type Support = 'paper' | 'alu';
export type SelectedWork = { slug: string; formatIndex: number; support: Support };

type SelectionContextValue = {
  items: SelectedWork[];
  count: number;
  has: (slug: string) => boolean;
  /** Ajoute ou met à jour une œuvre avec un format et un support précis. */
  add: (slug: string, formatIndex?: number, support?: Support) => void;
  /** Ajoute (format par défaut) ou retire une œuvre : pour les cœurs de la galerie. */
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

const defaultFormat = Math.min(2, formats.length - 1);

/** Sélection de la visite (en mémoire, aucune donnée transmise tant que l'e-mail n'est pas envoyé). */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SelectedWork[]>([]);

  const has = useCallback((slug: string) => items.some((item) => item.slug === slug), [items]);

  const add = useCallback((slug: string, formatIndex = defaultFormat, support: Support = 'paper') => {
    setItems((current) => [
      ...current.filter((item) => item.slug !== slug),
      { slug, formatIndex, support },
    ]);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const toggle = useCallback((slug: string) => {
    setItems((current) =>
      current.some((item) => item.slug === slug)
        ? current.filter((item) => item.slug !== slug)
        : [...current, { slug, formatIndex: defaultFormat, support: 'paper' as const }],
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, has, add, toggle, remove, clear }),
    [items, has, add, toggle, remove, clear],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('useSelection doit être utilisé dans SelectionProvider');
  return context;
}

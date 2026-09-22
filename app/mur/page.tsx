import type { Metadata } from 'next';

import { WallSimulator } from '@/components/wall-simulator';

export const metadata: Metadata = {
  title: 'Sur mon mur',
  description:
    'Visualisez une photographie de Joël Gourlain à l’échelle, dans une pièce type ou sur la photo de votre propre mur.',
};

export default async function WallPage({ searchParams }: { searchParams: Promise<{ w?: string }> }) {
  const { w } = await searchParams;
  return (
    <main id="main">
      <section className="grid-lines px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <WallSimulator initialSlug={w} />
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="font-mono text-[10px] leading-6 text-white/38">
            La projection donne une indication de proportion et de présence. Les couleurs, les contrastes et
            les dimensions perçues peuvent varier selon l’écran, la photo et la lumière réelle.
          </p>
        </div>
      </section>
    </main>
  );
}

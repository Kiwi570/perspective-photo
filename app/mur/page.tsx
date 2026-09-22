import type { Metadata } from 'next';

import { Reveal } from '@/components/motion/reveal';
import { WallSimulator } from '@/components/wall-simulator';

export const metadata: Metadata = {
  title: 'Sur mon mur',
  description:
    'Visualisez une photographie de Joël Gourlain à l’échelle, dans une pièce type ou sur la photo de votre propre mur.',
};

export default async function WallPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string; f?: string; s?: string }>;
}) {
  const { w, f, s } = await searchParams;
  const initialFormat = f !== undefined && !Number.isNaN(Number(f)) ? Number(f) : undefined;
  const initialSupport = s === 'alu' || s === 'paper' ? s : undefined;
  return (
    <main id="main">
      <section className="grid-lines px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <WallSimulator initialSlug={w} initialFormat={initialFormat} initialSupport={initialSupport} />
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <Reveal y={12} className="mx-auto max-w-[1100px] text-center">
          <p className="font-mono text-[10px] leading-6 text-white/60">
            La projection donne une indication de proportion et de présence. Les couleurs, les contrastes et
            les dimensions perçues peuvent varier selon l’écran, la photo et la lumière réelle.
          </p>
        </Reveal>
      </section>
    </main>
  );
}

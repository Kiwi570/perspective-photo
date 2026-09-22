import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">Page introuvable</p>
        <h1 className="mt-5 text-7xl font-semibold tracking-[-.06em]">Cette image est hors cadre.</h1>
        <p className="mt-5 text-white/48">Revenez à la galerie pour reprendre l’exposition.</p>
        <Link href="/galerie" className="button-acid mt-8">
          Voir les œuvres
        </Link>
      </div>
    </main>
  );
}

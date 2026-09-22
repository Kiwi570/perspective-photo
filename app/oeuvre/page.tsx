import { redirect } from 'next/navigation';
export default async function LegacyArtworkPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  redirect(`/oeuvre/${id || 'skyline'}`);
}

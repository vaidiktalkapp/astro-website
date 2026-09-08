import { Metadata } from 'next';
import PlanetsClient from './PlanetsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'planets';
  const defaultMeta = {
    title: "Planets in Astrology | AstroSolution",
    description: "Learn about the impact and significance of all 9 planets in Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="planets" />
      <PlanetsClient />
    </>
  );
}

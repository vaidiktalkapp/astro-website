import { Metadata } from 'next';
import MoonSignsClient from './MoonSignsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'moon-signs';
  const defaultMeta = {
    title: "12 Moon Signs in Vedic Astrology | AstroSolution",
    description: "Learn about the 12 Moon Signs (Rashis) in Vedic astrology. Discover your true inner nature, emotional state, and psychological profile.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function MoonSignsPage() {
  return (
    <>
      <PageSeoProvider slug="moon-signs" />
      <MoonSignsClient />
    </>
  );
}

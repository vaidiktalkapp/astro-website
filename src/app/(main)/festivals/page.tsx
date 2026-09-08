import { Metadata } from 'next';
import FestivalsClient from './FestivalsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'festivals';
  const defaultMeta = {
    title: "Hindu Festivals Calendar 2026 | AstroSolution",
    description: "Discover the exact dates and Shubh Muhurat for all major Hindu festivals. Check the 2026 Indian festival calendar based on Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function FestivalsPage() {
  return (
    <>
      <PageSeoProvider slug="festivals" />
      <FestivalsClient />
    </>
  );
}

import { Metadata } from 'next';
import PanchangClient from './PanchangClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'panchang';
  const defaultMeta = {
    title: "Daily Panchang | Hindu Calendar & Timings | AstroSolution",
    description: "Check today's Panchang, Tithi, Nakshatra, Yoga, and Karana. Get accurate daily Hindu calendar details and auspicious timings.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function PanchangPage() {
  return (
    <>
      <PageSeoProvider slug="panchang" />
      <PanchangClient />
    </>
  );
}

import { Metadata } from 'next';
import GemstoneClient from './GemstoneClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'free-reports/gemstone';
  const defaultMeta = {
    title: "Free Gemstone Recommendation | Lucky Stone | AstroSolution",
    description: "Find your lucky gemstone based on your birth date and time. Get personalized gemstone recommendations for wealth, health, and success.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="free-reports/gemstone" />
      <GemstoneClient />
    </>
  );
}

import { Metadata } from 'next';
import SadeSatiClient from './SadeSatiClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'free-reports/sade-sati';
  const defaultMeta = {
    title: "Free Shani Sade Sati Calculator & Report | AstroSolution",
    description: "Calculate your Shani Sade Sati phases. Get detailed predictions and astrological remedies to reduce Saturns malefic effects.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="free-reports/sade-sati" />
      <SadeSatiClient />
    </>
  );
}

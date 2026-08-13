import { Metadata } from 'next';
import NumerologyClient from './NumerologyClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'numerology';
  const defaultMeta = {
    title: "Numerology Calculator | Find your Numerology Numbers | VaidikTalk",
    description: "Calculate your Radical, Destiny, and Name numbers. Discover the vibrational secrets of your name and birth date with our Numerology Calculator.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function NumerologyPage() {
  return (
    <>
      <PageSeoProvider slug="numerology" />
      <NumerologyClient />
    </>
  );
}

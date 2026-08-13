import { Metadata } from 'next';
import RashiCalculatorClient from './RashiCalculatorClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'rashi-calculator';
  const defaultMeta = {
    title: "Rashi Calculator | Find your Moon Sign | VaidikTalk",
    description: "Calculate your Moon Sign (Rashi) instantly with our free Rashi Calculator. Get accurate predictions and astrological insights based on your birth details.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function RashiCalculatorPage() {
  return (
    <>
      <PageSeoProvider slug="rashi-calculator" />
      <RashiCalculatorClient />
    </>
  );
}

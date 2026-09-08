import { Metadata } from 'next';
import AstrologyCalculatorsClient from './AstrologyCalculatorsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'astrology-calculators';
  const defaultMeta = {
    title: "Free Astrology Calculators | AstroSolution",
    description: "Use our free online astrology calculators for Kundli, Doshas, Numerology, and more.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="astrology-calculators" />
      <AstrologyCalculatorsClient />
    </>
  );
}

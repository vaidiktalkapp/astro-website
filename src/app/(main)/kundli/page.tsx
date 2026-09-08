import { Metadata } from 'next';
import KundliClient from './KundliClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'kundli';
  const defaultMeta = {
    title: "Free Kundli Generation | AstroSolution",
    description: "Generate your free online Janam Kundli with detailed astrological insights. Understand your planetary positions, doshas, and astrological remedies.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function KundliPage() {
  return (
    <>
      <PageSeoProvider slug="kundli" />
      <KundliClient />
    </>
  );
}

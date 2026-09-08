import { Metadata } from 'next';
import LalKitabClient from './LalKitabClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'lal-kitab';
  const defaultMeta = {
    title: "Lal Kitab Astrology | Ancient Red Book Wisdom | AstroSolution",
    description: "Generate your free Lal Kitab report. Discover ancient remedies, planetary debts, and precise astrological solutions.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function LalKitabPage() {
  return (
    <>
      <PageSeoProvider slug="lal-kitab" />
      <LalKitabClient />
    </>
  );
}

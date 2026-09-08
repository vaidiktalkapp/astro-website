import { Metadata } from 'next';
import CompatibilityClient from './CompatibilityClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'compatibility';
  const defaultMeta = {
    title: "Zodiac Sign Compatibility Calculator | AstroSolution",
    description: "Check love and marriage compatibility between zodiac signs.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="compatibility" />
      <CompatibilityClient />
    </>
  );
}

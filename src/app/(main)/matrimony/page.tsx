import { Metadata } from 'next';
import MatrimonyClient from './MatrimonyClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'matrimony';
  const defaultMeta = {
    title: "Vaidik Matrimony | Find your divine match | AstroSolution",
    description: "Vaidik Matrimony unites ancient Vedic wisdom with modern search. Find your perfect partner based on Guna compatibility and planetary alignment.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function MatrimonyPage() {
  return (
    <>
      <PageSeoProvider slug="matrimony" />
      <MatrimonyClient />
    </>
  );
}

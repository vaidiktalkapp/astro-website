import { Metadata } from 'next';
import ManglikClient from './ManglikClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'free-reports/manglik';
  const defaultMeta = {
    title: "Free Manglik Dosha Calculator & Report | AstroSolution",
    description: "Check if you have Manglik Dosha in your Kundli. Get a free Kuja Dosha report with remedies and impact on marriage.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="free-reports/manglik" />
      <ManglikClient />
    </>
  );
}

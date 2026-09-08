import { Metadata } from 'next';
import RahuKaalClient from './RahuKaalClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'rahu-kaal';
  const defaultMeta = {
    title: "Today's Rahu Kaal Timing | AstroSolution",
    description: "Check accurate Rahu Kaal timings for your city today. Know the inauspicious time of the day and avoid important tasks during Rahu Kalam.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function RahuKaalPage() {
  return (
    <>
      <PageSeoProvider slug="rahu-kaal" />
      <RahuKaalClient />
    </>
  );
}

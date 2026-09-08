import { Metadata } from 'next';
import FaqClient from './FaqClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'faq';
  const defaultMeta = {
    title: "FAQ | AstroSolution",
    description: "Frequently asked questions about astrology, predictions, and AstroSolution services.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="faq" />
      <FaqClient />
    </>
  );
}

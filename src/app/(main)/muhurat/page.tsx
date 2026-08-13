import { Metadata } from 'next';
import MuhuratClient from './MuhuratClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'muhurat';
  const defaultMeta = {
    title: "Shubh Muhurat | Auspicious Timings | VaidikTalk",
    description: "Find the most auspicious timings (Shubh Muhurat) for your important life events, property purchase, marriage, and new beginnings.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function MuhuratPage() {
  return (
    <>
      <PageSeoProvider slug="muhurat" />
      <MuhuratClient />
    </>
  );
}

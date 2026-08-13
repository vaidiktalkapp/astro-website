import { Metadata } from 'next';
import MatchingClient from './MatchingClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'horoscope-matching';
  const defaultMeta = {
    title: "Free Horoscope Matching | Kundali Milan | VaidikTalk",
    description: "Check your marriage compatibility with free online Kundali Milan (Horoscope Matching) using Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function MatchingPage() {
  return (
    <>
      <PageSeoProvider slug="horoscope-matching" />
      <MatchingClient />
    </>
  );
}

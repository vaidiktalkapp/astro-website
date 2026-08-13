import { Metadata } from 'next';
import CelebrityHoroscopeClient from './CelebrityHoroscopeClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'celebrity-horoscopes';
  const defaultMeta = {
    title: "Celebrity Horoscopes & Kundli | VaidikTalk",
    description: "Explore birth charts and astrological analysis of famous celebrities.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="celebrity-horoscopes" />
      <CelebrityHoroscopeClient />
    </>
  );
}

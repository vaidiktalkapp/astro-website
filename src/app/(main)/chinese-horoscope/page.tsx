import { Metadata } from 'next';
import ChineseHoroscopeClient from './ChineseHoroscopeClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'chinese-horoscope';
  const defaultMeta = {
    title: "Free Chinese Horoscope & Zodiac | VaidikTalk",
    description: "Check your free Chinese astrology predictions based on your birth year animal.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="chinese-horoscope" />
      <ChineseHoroscopeClient />
    </>
  );
}

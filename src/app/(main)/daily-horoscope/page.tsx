import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'daily-horoscope';
  const defaultMeta = {
    title: "Today's Horoscope | VaidikTalk",
    description: "Read your free daily horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function DailyHoroscopeIndex() {
  return (
    <>
      <PageSeoProvider slug="daily-horoscope" />
      <HoroscopeIndexClient period="today" title="Today's Horoscope" basePath="/daily-horoscope" />
    </>
  );
}

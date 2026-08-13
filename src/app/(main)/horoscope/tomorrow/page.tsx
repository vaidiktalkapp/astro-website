import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'horoscope/tomorrow';
  const defaultMeta = {
    title: "Tomorrow's Horoscope | VaidikTalk",
    description: "Read your free tomorrow's horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function TomorrowHoroscopeIndex() {
  return (
    <>
      <PageSeoProvider slug="horoscope/tomorrow" />
      <HoroscopeIndexClient period="tomorrow" title="Tomorrow's Horoscope" basePath="/horoscope/tomorrow" />
    </>
  );
}

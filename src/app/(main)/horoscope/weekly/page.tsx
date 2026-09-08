import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'horoscope/weekly';
  const defaultMeta = {
    title: "Weekly Horoscope | AstroSolution",
    description: "Read your free weekly horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function WeeklyHoroscopeIndex() {
  return (
    <>
      <PageSeoProvider slug="horoscope/weekly" />
      <HoroscopeIndexClient period="weekly" title="Weekly Horoscope" basePath="/horoscope/weekly" />
    </>
  );
}

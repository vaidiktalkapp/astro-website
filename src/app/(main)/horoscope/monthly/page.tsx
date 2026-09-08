import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'horoscope/monthly';
  const defaultMeta = {
    title: "Monthly Horoscope | AstroSolution",
    description: "Read your free monthly horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function MonthlyHoroscopeIndex() {
  return (
    <>
      <PageSeoProvider slug="horoscope/monthly" />
      <HoroscopeIndexClient period="monthly" title="Monthly Horoscope" basePath="/horoscope/monthly" />
    </>
  );
}

import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'horoscope/yearly';
  const defaultMeta = {
    title: "Yearly Horoscope | VaidikTalk",
    description: "Read your free yearly horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function YearlyHoroscopeIndex() {
  return (
    <>
      <PageSeoProvider slug="horoscope/yearly" />
      <HoroscopeIndexClient period="yearly" title="Yearly Horoscope" basePath="/horoscope/yearly" />
    </>
  );
}

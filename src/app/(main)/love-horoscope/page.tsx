import { Metadata } from 'next';
import LoveHoroscopeClient from './LoveHoroscopeClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'love-horoscope';
  const defaultMeta = {
    title: "Free Love Horoscope | Accurate Love Predictions | VaidikTalk",
    description: "Check your free daily, weekly, and yearly love horoscope. Get personalized love astrology predictions based on your zodiac sign.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function LoveHoroscopePage() {
  return (
    <>
      <PageSeoProvider slug="love-horoscope" />
      <LoveHoroscopeClient />
    </>
  );
}

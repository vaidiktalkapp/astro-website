import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';

export const metadata: Metadata = {
  title: "Yearly Horoscope | VaidikTalk",
  description: "Read your free yearly horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
};

export default function YearlyHoroscopeIndex() {
  return <HoroscopeIndexClient period="yearly" title="Yearly Horoscope" basePath="/horoscope/yearly" />;
}

import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';

export const metadata: Metadata = {
  title: "Monthly Horoscope | VaidikTalk",
  description: "Read your free monthly horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
};

export default function MonthlyHoroscopeIndex() {
  return <HoroscopeIndexClient period="monthly" title="Monthly Horoscope" basePath="/horoscope/monthly" />;
}

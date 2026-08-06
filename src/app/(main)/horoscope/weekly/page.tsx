import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';

export const metadata: Metadata = {
  title: "Weekly Horoscope | VaidikTalk",
  description: "Read your free weekly horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
};

export default function WeeklyHoroscopeIndex() {
  return <HoroscopeIndexClient period="weekly" title="Weekly Horoscope" basePath="/horoscope/weekly" />;
}

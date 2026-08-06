import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';

export const metadata: Metadata = {
  title: "Today's Horoscope | VaidikTalk",
  description: "Read your free daily horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
};

export default function DailyHoroscopeIndex() {
  return <HoroscopeIndexClient period="today" title="Today's Horoscope" basePath="/daily-horoscope" />;
}

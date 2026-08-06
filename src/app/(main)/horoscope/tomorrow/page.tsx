import { Metadata } from 'next';
import HoroscopeIndexClient from '@/components/horoscope/HoroscopeIndexClient';

export const metadata: Metadata = {
  title: "Tomorrow's Horoscope | VaidikTalk",
  description: "Read your free tomorrow's horoscope for all 12 zodiac signs. Get personalized insights into love, career, and health based on precise Vedic astrology.",
};

export default function TomorrowHoroscopeIndex() {
  return <HoroscopeIndexClient period="tomorrow" title="Tomorrow's Horoscope" basePath="/horoscope/tomorrow" />;
}

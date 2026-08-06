import { Metadata } from 'next';
import HoroscopeDetailClient from '@/components/horoscope/HoroscopeDetailClient';
import { fetchHoroscopeData } from '@/lib/fetchHoroscopeData';

type Props = {
  params: Promise<{ sign: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign: rawSign } = await params;
  const sign = rawSign.charAt(0).toUpperCase() + rawSign.slice(1);
  return {
    title: `${sign} Monthly Horoscope | VaidikTalk`,
    description: `Read your free monthly horoscope for ${sign}. Get personalized insights into love, career, and health based on precise Vedic astrology.`,
  };
}

export default async function MonthlyHoroscopePage({ params }: Props) {
  const { sign } = await params;
  const { initialDailyData, initialFaqs } = await fetchHoroscopeData('monthly', sign);
  
  return (
    <HoroscopeDetailClient 
      initialSign={sign} 
      period="monthly" 
      basePath="/horoscope/monthly" 
      initialDailyData={initialDailyData}
      initialFaqs={initialFaqs}
    />
  );
}

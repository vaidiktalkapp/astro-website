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
    title: `${sign} Weekly Horoscope | VaidikTalk`,
    description: `Read your free weekly horoscope for ${sign}. Get personalized insights into love, career, and health based on precise Vedic astrology.`,
  };
}

export default async function WeeklyHoroscopePage({ params }: Props) {
  const { sign } = await params;
  const { initialDailyData, initialFaqs } = await fetchHoroscopeData('weekly', sign);
  
  return (
    <HoroscopeDetailClient 
      initialSign={sign} 
      period="weekly" 
      basePath="/horoscope/weekly" 
      initialDailyData={initialDailyData}
      initialFaqs={initialFaqs}
    />
  );
}

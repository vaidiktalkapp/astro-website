import { Metadata } from 'next';
import HoroscopeDetailClient from '@/components/horoscope/HoroscopeDetailClient';
import { fetchHoroscopeData } from '@/lib/fetchHoroscopeData';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

type Props = {
  params: Promise<{ sign: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign: rawSign } = await params;
  const sign = rawSign.charAt(0).toUpperCase() + rawSign.slice(1);
  const slug = `horoscope/tomorrow/${rawSign.toLowerCase()}`;
  
  const defaultMeta = {
    title: `${sign} Tomorrow's Horoscope | AstroSolution`,
    description: `Read your free tomorrow's horoscope for ${sign}. Get personalized insights into love, career, and health based on precise Vedic astrology.`,
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default async function TomorrowHoroscopePage({ params }: Props) {
  const { sign } = await params;
  const slug = `horoscope/tomorrow/${sign.toLowerCase()}`;
  const { initialDailyData, initialFaqs } = await fetchHoroscopeData('tomorrow', sign);
  
  return (
    <>
      <PageSeoProvider slug={slug} />
      <HoroscopeDetailClient 
        initialSign={sign} 
        period="tomorrow" 
        basePath="/horoscope/tomorrow" 
        initialDailyData={initialDailyData}
        initialFaqs={initialFaqs}
      />
    </>
  );
}

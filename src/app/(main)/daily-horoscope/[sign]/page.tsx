import React from 'react';
import { Metadata } from 'next';
import HoroscopeDetailClient from '@/components/horoscope/HoroscopeDetailClient';
import { fetchHoroscopeData } from '@/lib/fetchHoroscopeData';

// Generates static params for all 12 signs so Next.js can prerender or handle routing cleanly
export function generateStaticParams() {
  const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  return signs.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }): Promise<Metadata> {
  const { sign } = await params;
  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);
  return {
    title: `Today's ${signName} Horoscope | VaidikTalk`,
    description: `Read your daily ${signName} horoscope on VaidikTalk. Get deep Vedic astrological insights into your love, career, and health for today.`,
  };
}

export default async function DailyHoroscopePage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  const { initialDailyData, initialFaqs } = await fetchHoroscopeData('today', sign);
  
  return (
    <div className="bg-[#fff9f0] min-h-screen">
      <HoroscopeDetailClient 
        initialSign={sign} 
        period="today" 
        basePath="/daily-horoscope" 
        initialDailyData={initialDailyData}
        initialFaqs={initialFaqs}
      />
    </div>
  );
}

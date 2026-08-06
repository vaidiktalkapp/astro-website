import astrologyService from '@/lib/astrologyService';

export async function fetchHoroscopeData(period: string, sign: string) {
  let initialDailyData: any[] = [];
  let initialFaqs: { q: string; a: string }[] = [];

  try {
    const [res, zodiacFaqsRes, periodFaqsRes] = await Promise.all([
      astrologyService.getDailyHoroscopeAllSigns(period, 'English'),
      astrologyService.getFaqs(`horoscope_${period}_${sign}`),
      astrologyService.getFaqs(`horoscope_${period}`)
    ]);

    if (res?.success && Array.isArray(res.data)) {
      initialDailyData = res.data;
    }

    if (zodiacFaqsRes?.data && Array.isArray(zodiacFaqsRes.data) && zodiacFaqsRes.data.length > 0) {
      initialFaqs = zodiacFaqsRes.data.map((f: any) => ({ q: f.question, a: f.answer }));
    } else if (periodFaqsRes?.data && Array.isArray(periodFaqsRes.data) && periodFaqsRes.data.length > 0) {
      initialFaqs = periodFaqsRes.data.map((f: any) => ({ q: f.question, a: f.answer }));
    }
  } catch (err) {
    console.error(`Failed to fetch initial horoscope data for ${period}/${sign} on server:`, err);
  }

  return { initialDailyData, initialFaqs };
}

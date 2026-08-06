'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import astrologyService from '@/lib/astrologyService';

const ZODIACS = [
  { id: 'aries', name: 'Aries', date: 'Mar 21 - Apr 19', icon: '♈', color: 'border-red-400' },
  { id: 'taurus', name: 'Taurus', date: 'Apr 20 - May 20', icon: '♉', color: 'border-green-400' },
  { id: 'gemini', name: 'Gemini', date: 'May 21 - Jun 20', icon: '♊', color: 'border-yellow-400' },
  { id: 'cancer', name: 'Cancer', date: 'Jun 21 - Jul 22', icon: '♋', color: 'border-blue-400' },
  { id: 'leo', name: 'Leo', date: 'Jul 23 - Aug 22', icon: '♌', color: 'border-orange-400' },
  { id: 'virgo', name: 'Virgo', date: 'Aug 23 - Sep 22', icon: '♍', color: 'border-emerald-400' },
  { id: 'libra', name: 'Libra', date: 'Sep 23 - Oct 22', icon: '♎', color: 'border-pink-400' },
  { id: 'scorpio', name: 'Scorpio', date: 'Oct 23 - Nov 21', icon: '♏', color: 'border-purple-400' },
  { id: 'sagittarius', name: 'Sagittarius', date: 'Nov 22 - Dec 21', icon: '♐', color: 'border-indigo-400' },
  { id: 'capricorn', name: 'Capricorn', date: 'Dec 22 - Jan 19', icon: '♑', color: 'border-gray-500' },
  { id: 'aquarius', name: 'Aquarius', date: 'Jan 20 - Feb 18', icon: '♒', color: 'border-cyan-400' },
  { id: 'pisces', name: 'Pisces', date: 'Feb 19 - Mar 20', icon: '♓', color: 'border-teal-400' },
];

const generateFaqs = (period: string) => {
  if (period === 'weekly') {
    return [
      {
        q: "How does a weekly horoscope differ from a daily one?",
        a: "While daily horoscopes track the fast-moving Moon (Chandrama), a weekly reading looks at the combined effect of slower transits (Gochar) like the Sun, Mars, and Mercury, providing a broader look at upcoming events."
      },
      {
        q: "Can a weekly reading predict my financial gains?",
        a: "Yes, it can highlight favorable planetary combinations (Yogas) forming during the week that may bring wealth, or warn against unnecessary expenses during weak transits."
      },
      {
        q: "Should I read the weekly forecast for my Moon sign or Sun sign?",
        a: "In Vedic astrology, the Moon sign (Rashi) is always the most accurate for tracking Gochar (transit) effects, as it reflects your direct emotional and mental experiences."
      },
      {
        q: "What if my weekly horoscope shows a challenging period?",
        a: "Vedic astrology is about guidance, not fear. If challenging planetary alignments are indicated, you can perform simple remedies (Upayas) like chanting mantras or donating to mitigate the effects."
      }
    ];
  }

  if (period === 'monthly') {
    return [
      {
        q: "How do planetary transits shape the monthly horoscope?",
        a: "A monthly forecast focuses on major transits of slower planets like Jupiter (Guru), Saturn (Shani), and the Sun (Surya). When these planets change houses, they bring significant shifts in career, health, and relationships."
      },
      {
        q: "Can this reading replace my personalized Kundli?",
        a: "No. A monthly horoscope gives you the general 'cosmic weather' for your sign based on Gochar. A Kundli reading analyzes your specific Mahadasha and Antardasha for pinpoint accuracy."
      },
      {
        q: "How do lunar phases affect my monthly reading?",
        a: "Amavasya (New Moon) and Purnima (Full Moon) bring intense shifts in energy. Your monthly reading highlights how these lunar phases will impact your specific Rashi."
      },
      {
        q: "What if my zodiac sign is undergoing Sade Sati?",
        a: "If you are going through Shani Sade Sati or Dhaiya, your monthly reading will reflect the ongoing lessons and challenges, along with the best times to practice patience."
      }
    ];
  }

  if (period === 'yearly') {
    return [
      {
        q: "How does a yearly horoscope differ from a monthly one?",
        a: "A yearly horoscope focuses on the slow-moving planetary transits (like Jupiter, Saturn, Rahu, and Ketu) that shape major life themes over a long period, offering a big-picture view of the year ahead."
      },
      {
        q: "Can a yearly horoscope guide my career decisions?",
        a: "Yes. By analyzing major planetary alignments, a yearly forecast can highlight periods of growth, potential job changes, or times when you should consolidate rather than take risks."
      },
      {
        q: "Does the yearly horoscope consider eclipses?",
        a: "Absolutely. Solar and Lunar eclipses mark significant turning points in Vedic astrology, and their effects are a crucial part of your yearly reading."
      },
      {
        q: "What if my yearly forecast indicates challenges?",
        a: "A yearly reading prepares you in advance. We suggest corresponding Vedic remedies, like specific mantras or gemstone wearing, to help mitigate challenging transits."
      }
    ];
  }

  if (period === 'tomorrow') {
    return [
      {
        q: "Why should I read tomorrow's horoscope today?",
        a: "Reading tomorrow's forecast gives you a tactical advantage. It helps you mentally prepare for the day ahead, letting you schedule important tasks during favorable alignments."
      },
      {
        q: "Is tomorrow's horoscope as accurate as today's?",
        a: "Yes. The planetary transits for tomorrow are mathematically calculated in advance, ensuring the exact same level of precision as your daily reading."
      },
      {
        q: "What if tomorrow's reading predicts challenges?",
        a: "Forewarned is forearmed. If the forecast suggests communication issues or low energy, you can proactively choose to be more patient and avoid scheduling high-stress activities."
      }
    ];
  }

  // Default (Today/Daily)
  return [
    {
      q: "Why is the Moon sign so important for a daily horoscope?",
      a: "The Moon (Chandrama) rules the mind and changes signs every 2.5 days. Its daily movement (Gochar) is the most accurate indicator of your daily mood, interactions, and events."
    },
    {
      q: "Can a daily horoscope help me choose a lucky color?",
      a: "Yes. Each day of the week is ruled by a specific planet (e.g., Sunday by the Sun, Monday by the Moon). Your reading combines this with your Rashi to suggest the most beneficial color."
    },
    {
      q: "Does the daily horoscope account for Rahu Kaal?",
      a: "While the horoscope gives general daily guidance, we recommend cross-checking our Panchang tool to avoid starting important tasks during Rahu Kaal or other inauspicious windows."
    },
    {
      q: "Can a daily horoscope help with relationship issues?",
      a: "It can offer valuable insight into your emotional state and communication patterns for the day, helping you avoid unnecessary friction or choose the right moment for a heart-to-heart."
    }
  ];
};

export default function HoroscopeIndexClient({ 
  period = 'today', 
  title = "Today's Horoscope",
  basePath = "/daily-horoscope"
}: { 
  period?: 'today' | 'tomorrow' | 'weekly' | 'monthly' | 'yearly';
  title?: string;
  basePath?: string;
}) {
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<{q: string, a: string}[]>([]);

  const periodTitle = period === 'today' ? 'Daily' : period.charAt(0).toUpperCase() + period.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [res, faqsRes] = await Promise.all([
          astrologyService.getDailyHoroscopeAllSigns(period, 'English'),
          astrologyService.getFaqs(`horoscope_${period}`)
        ]);
        
        if (res?.success && Array.isArray(res.data)) {
          setDailyData(res.data);
        }

        if (faqsRes?.data && Array.isArray(faqsRes.data) && faqsRes.data.length > 0) {
          setFaqs(faqsRes.data.map((f: any) => ({ q: f.question, a: f.answer })));
        } else {
          setFaqs(generateFaqs(period));
        }
      } catch (err) {
        console.error(err);
        setFaqs(generateFaqs(period));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [period]);

  return (
    <div className="bg-[#fff9f0] min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-[#A65F21] text-white w-full mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-serif mb-6 drop-shadow-sm">{title}</h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover what the stars have in store for you. Select your zodiac sign below to read your detailed astrological forecast based on precise planetary transits.
              </p>
            </div>

            <div className="lg:w-[55%] w-full">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-5">
                {ZODIACS.map((z) => (
                  <Link
                    href={`${basePath}/${z.id}`}
                    key={z.id}
                    className="flex flex-col items-center justify-center group"
                  >
                    <div className="w-14 h-14 md:w-[68px] md:h-[68px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-transparent opacity-90 hover:opacity-100">
                      <Image src={`/zodiacs/${z.id}.png`} alt={z.name} width={68} height={68} className="w-full h-full object-cover" />
                    </div>
                    <span className="mt-2 text-[10px] md:text-xs font-medium transition-colors text-white/80 group-hover:text-white">
                      {z.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Explore Horoscope Prediction Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
          <span className="text-[#5c1420]">Explore</span> <span className="text-[#d97706]">Horoscope Prediction</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'today', title: "Today's\nHoroscope", basePath: '/daily-horoscope' },
            { id: 'tomorrow', title: "Tomorrow's\nHoroscope", basePath: '/horoscope/tomorrow' },
            { id: 'weekly', title: "Weekly\nHoroscope", basePath: '/horoscope/weekly' },
            { id: 'monthly', title: "Monthly\nHoroscope", basePath: '/horoscope/monthly' },
            { id: 'yearly', title: "Yearly\nHoroscope", basePath: '/horoscope/yearly' }
          ].filter(item => item.id !== period).slice(0, 4).map((item, idx) => (
            <Link href={item.basePath} key={idx} className="flex items-center gap-4 bg-white p-2 border border-[#f0ddc0] hover:border-[#d97706] shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 rounded-full bg-[#fff5e6] border border-[#f0ddc0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#fdf0e0] group-hover:border-[#d97706] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b07b46" strokeWidth="1.5" className="group-hover:stroke-[#d97706] transition-colors">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/>
                </svg>
              </div>
              <span className="font-serif font-bold text-[#5c1420] text-sm md:text-base group-hover:text-[#d97706] transition-colors pr-2 leading-tight whitespace-pre-line">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#f0ddc0] border-t-[#ee6c1e] rounded-full animate-spin mb-4"></div>
            <p className="text-[#5c1420] font-bold animate-pulse">Consulting the Stars...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ZODIACS.map((z) => {
              const apiData = dailyData.find(d => d.id === z.id);
              let previewText = 'Loading your personalized astrological insights...';
              if (apiData) {
                if (apiData.previewText) {
                  previewText = apiData.previewText;
                } else if (apiData.reading) {
                  let cleaned = apiData.reading.replace(/<\/(p|div|h[1-6])>/gi, '. ').replace(/<br\s*\/?>/gi, '. ').replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/[\*#_]/g, '').replace(/\s+/g, ' ').trim();
                  if (cleaned.toLowerCase().includes('horoscope') && cleaned.indexOf('.') < 30) cleaned = cleaned.substring(cleaned.indexOf('.') + 1).trim();
                  previewText = cleaned.substring(0, 110) + (cleaned.length > 110 ? '...' : '');
                }
              }

              return (
                <Link href={`${basePath}/${z.id}`} key={z.id} className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#ee6c1e] transition-all duration-300 border border-[#f0ddc0] group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#f0ddc0] group-hover:border-[#ee6c1e] transition-colors overflow-hidden shrink-0">
                      <Image src={`/zodiacs/${z.id}.png`} alt={z.name} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#3a1216]">{z.name}</h3>
                      <p className="text-xs text-[#ee6c1e] font-semibold">{z.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#412a1e] leading-relaxed mb-4 opacity-90 h-[60px] overflow-hidden">
                    {previewText}
                  </p>
                  <div className="text-[#ee6c1e] text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read full horoscope <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* SEO & Information Content Block */}
        <div className="mt-24 text-[#412a1e] leading-relaxed">
          
          <h2 className="text-3xl font-bold text-[#5c1420] mb-6">How to Check Your {periodTitle} Horoscope</h2>
          <p className="mb-4">Reading your horoscope takes just a minute, but picking the correct reading matters most. Vedic astrology builds each forecast by studying how the planets are positioned in relation to your zodiac sign at that time. Here's a simple way to go about it:</p>
          <ul className="list-disc pl-5 space-y-3 mb-8">
            <li><strong>Identify your Rashi (zodiac sign):</strong> For accurate Vedic readings, your Moon sign is what you should rely on. New to astrology and only know your Sun sign? That works fine as a starting point too.</li>
            <li><strong>Open the horoscope section:</strong> Head to the {periodTitle} Horoscope page to see forecasts freshly generated from planetary movements.</li>
            <li><strong>Pick your sign:</strong> Choose your zodiac sign — from Aries through Pisces — to view your personal forecast.</li>
            <li><strong>Go through each life area:</strong> Your reading will cover romance, work, wellness, finances, family life, and general wellbeing.</li>
            {(period === 'today' || period === 'tomorrow') && (
              <li><strong>Check the lucky picks:</strong> Every forecast also lists a lucky colour, lucky number, and the best time window.</li>
            )}
            <li><strong>Want something more specific?</strong> Connect with an astrologer through Chat or Call for a reading built around your own birth details.</li>
          </ul>

          <h2 className="text-3xl font-bold text-[#5c1420] mb-6">How Should You Interpret Your {periodTitle} Horoscope?</h2>
          <p className="mb-4">Think of your horoscope as a snapshot of the cosmic energy at play — not a fixed script of events. It points toward where opportunities might open up and where you may need to tread carefully.</p>
          <p className="mb-4">Within Vedic astrology, the Moon sign is considered the stronger reference point for readings since it reflects your emotional state and everyday thinking. That said, a Sun-sign-based reading still works if that's all you know — Moon-sign forecasts simply tend to be sharper.</p>
          
          <h2 className="text-3xl font-bold text-[#5c1420] mb-6">Other Astrology Tools Worth Exploring</h2>
          <p className="mb-4">Your {periodTitle.toLowerCase()} horoscope is only one piece of what Vedic astrology offers. To go deeper, explore:</p>
          <ul className="space-y-4 mb-12">
            <li>
              <Link href="/panchang" className="group inline-flex items-baseline hover:text-[#ee6c1e] transition-colors">
                <strong className="text-[#ee6c1e] underline underline-offset-4 decoration-[#f0ddc0] group-hover:decoration-[#ee6c1e] mr-2">Panchang:</strong>
                <span>Get today's nakshatra, yoga, karana, paksha, and other key details.</span>
              </Link>
            </li>
            <li>
              <Link href="/rahu-kaal" className="group inline-flex items-baseline hover:text-[#ee6c1e] transition-colors">
                <strong className="text-[#ee6c1e] underline underline-offset-4 decoration-[#f0ddc0] group-hover:decoration-[#ee6c1e] mr-2">Rahu Kaal:</strong>
                <span>Know this inauspicious window before scheduling anything important.</span>
              </Link>
            </li>
            <li>
              <Link href="/choghadiya" className="group inline-flex items-baseline hover:text-[#ee6c1e] transition-colors">
                <strong className="text-[#ee6c1e] underline underline-offset-4 decoration-[#f0ddc0] group-hover:decoration-[#ee6c1e] mr-2">Choghadiya:</strong>
                <span>A breakdown of good and bad time slots to plan your day around.</span>
              </Link>
            </li>
            <li>
              <Link href="/muhurat" className="group inline-flex items-baseline hover:text-[#ee6c1e] transition-colors">
                <strong className="text-[#ee6c1e] underline underline-offset-4 decoration-[#f0ddc0] group-hover:decoration-[#ee6c1e] mr-2">Shubh Muhurat:</strong>
                <span>Find the most favourable time to begin auspicious activities.</span>
              </Link>
            </li>
            <li>
              <Link href="/free-kundali" className="group inline-flex items-baseline hover:text-[#ee6c1e] transition-colors">
                <strong className="text-[#ee6c1e] underline underline-offset-4 decoration-[#f0ddc0] group-hover:decoration-[#ee6c1e] mr-2">Free Kundali:</strong>
                <span>Generate your free birth chart for a deeper look into your astrological profile.</span>
              </Link>
            </li>
            <li>
              <Link href="/horoscope-matching" className="group inline-flex items-baseline hover:text-[#ee6c1e] transition-colors">
                <strong className="text-[#ee6c1e] underline underline-offset-4 decoration-[#f0ddc0] group-hover:decoration-[#ee6c1e] mr-2">Horoscope Matching:</strong>
                <span>Check compatibility between you and your partner.</span>
              </Link>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-[#5c1420] mb-6">Conclusion</h2>
          <p className="mb-16">Your horoscope works best as a companion to your own thinking, not a replacement for it — a way to walk into your day with a little more clarity and confidence. It offers useful angles on love, career, health, money, and personal growth.</p>

          <h2 className="text-4xl font-bold text-[#5c1420] mb-8 border-t border-[#f0ddc0] pt-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-transparent border border-[#f0ddc0] rounded-xl overflow-hidden transition-all duration-200">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#f0ddc0]/30 transition-colors"
                  >
                    <h4 className={`font-bold text-lg ${isOpen ? 'text-[#ee6c1e]' : 'text-[#3a1216]'}`}>{faq.q}</h4>
                    <svg 
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className={`transform transition-transform duration-300 text-[#5c1420] ${isOpen ? 'rotate-180 text-[#ee6c1e]' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[#412a1e] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
